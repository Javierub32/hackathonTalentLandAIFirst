import errno
import sqlite3
import unittest
from unittest.mock import Mock, patch

from backend.llm import cache


class CacheFailureTests(unittest.TestCase):
    @patch("backend.llm.cache.cache_enabled", return_value=True)
    def test_read_only_cache_still_calls_provider(self, _enabled):
        provider = Mock(return_value={"tip": "El resultado de Groq"})
        with patch.object(cache, "_conn", side_effect=OSError(errno.EROFS, "Read-only file system")):
            with self.assertLogs(cache.log, level="WARNING"):
                self.assertEqual(cache.cached_call("interview", provider), provider.return_value)
        provider.assert_called_once_with()

    @patch("backend.llm.cache.cache_enabled", return_value=True)
    def test_cache_write_error_keeps_provider_result(self, _enabled):
        conn = sqlite3.connect(":memory:")
        conn.execute("CREATE TABLE cache (key TEXT PRIMARY KEY, value TEXT NOT NULL)")
        provider = Mock(return_value={"tip": "El resultado de Groq"})
        try:
            with patch.object(cache, "_conn", side_effect=[conn, sqlite3.OperationalError("disk is full")]):
                with self.assertLogs(cache.log, level="WARNING"):
                    self.assertEqual(cache.cached_call("interview", provider), provider.return_value)
        finally:
            conn.close()
        provider.assert_called_once_with()

    @patch("backend.llm.cache.cache_enabled", return_value=True)
    def test_provider_error_still_propagates(self, _enabled):
        provider = Mock(side_effect=RuntimeError("provider failed"))
        with patch.object(cache, "_conn", side_effect=OSError(errno.EROFS, "Read-only file system")):
            with self.assertLogs(cache.log, level="WARNING"):
                with self.assertRaisesRegex(RuntimeError, "provider failed"):
                    cache.cached_call("interview", provider)
