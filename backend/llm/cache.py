"""Response cache toggled by LLM_CACHE (SQLite, keyed by a hash of the call)."""

from __future__ import annotations

import hashlib
import json
import logging
import os
import sqlite3
import tempfile
import threading
from collections.abc import Callable, Iterable, Iterator
from pathlib import Path
from typing import Any

from backend.llm.settings import cache_enabled

log = logging.getLogger(__name__)
# Vercel mounts the deployed package read-only. The cache is per function instance.
if os.environ.get("VERCEL") == "1":
    DB_PATH = Path(tempfile.gettempdir()) / "al-curro-llm" / "llm.sqlite"
else:
    DB_PATH = Path(__file__).parent / ".cache" / "llm.sqlite"

_local = threading.local()


def _conn() -> sqlite3.Connection:
    """One connection per thread and per DB path, WAL mode."""
    conn = getattr(_local, "conn", None)
    if conn is not None and getattr(_local, "path", None) == DB_PATH:
        return conn
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=30)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT NOT NULL)")
    conn.commit()
    _local.conn, _local.path = conn, DB_PATH
    return conn


def key_for(provider: str, model: str, payload: dict[str, Any]) -> str:
    """sha256 of the canonical JSON of (provider, model, payload)."""
    canonical = json.dumps(
        [provider, model, payload], sort_keys=True, separators=(",", ":"), default=str
    )
    return hashlib.sha256(canonical.encode()).hexdigest()


def get(key: str) -> Any | None:
    """Cached value (JSON-decoded) or None; always None when LLM_CACHE=off."""
    if not cache_enabled():
        return None
    try:
        row = _conn().execute("SELECT value FROM cache WHERE key = ?", (key,)).fetchone()
        return json.loads(row[0]) if row else None
    except (OSError, sqlite3.Error, json.JSONDecodeError) as exc:
        log.warning("LLM cache read skipped: %s", exc)
        return None


def put(key: str, value: Any) -> None:
    """Store a JSON-serializable value; no-op when LLM_CACHE=off."""
    if not cache_enabled():
        return
    try:
        conn = _conn()
        with conn:
            conn.execute(
                "INSERT OR REPLACE INTO cache (key, value) VALUES (?, ?)", (key, json.dumps(value))
            )
    except (OSError, sqlite3.Error) as exc:
        log.warning("LLM cache write skipped: %s", exc)


def cached_call(key: str, fn: Callable[[], Any]) -> Any:
    """Return the cached value for key, else call fn() and store its result.

    Provider exceptions propagate and are never cached. Cache I/O is optional.
    """
    hit = get(key)
    if hit is not None:
        return hit
    value = fn()
    put(key, value)
    return value


def cached_stream(key: str, gen: Callable[[], Iterable[Any]]) -> Iterator[Any]:
    """Replay a cached chunk list, else yield live chunks while recording them.

    The chunk list is stored only when the stream completes successfully.
    """
    hit = get(key)
    if hit is not None:
        yield from hit
        return
    chunks: list[Any] = []
    for chunk in gen():
        chunks.append(chunk)
        yield chunk
    put(key, chunks)
