"""CV rewrite with the LLM (Beat 02:25), guarded so it never adds what the candidate lacks.

Flow: build the candidate's real facts → render `prompts/prep_adapt_cv.md` → one cached
structured call → re-run the rule filter on the result → reject the result if a hard
requirement she does not meet shows up (R13.2). `not_covered` is what the filter still
misses on the adapted CV, so the CV and the list never disagree.
"""
from __future__ import annotations

import re
from concurrent.futures import ThreadPoolExecutor

from pydantic import BaseModel

from backend.api.resources.candidates.models import Candidate
from backend.api.resources.offers.models import Offer
from backend.api.resources.prep import rules
from backend.api.resources.prep.models import AdaptedCv, CvChange
from backend.llm import cache, settings
from backend.llm.render import render

TIMEOUT_S = 15
MODEL_TIER = "smart"
# Long calls keep running after the timeout and fill the cache for the next request.
_pool = ThreadPoolExecutor(max_workers=2, thread_name_prefix="prep-llm")


class RejectedRewrite(Exception):
    """The rewrite broke a rule (e.g. claimed a hard requirement she does not meet)."""


class LlmCv(BaseModel):
    changes: list[CvChange]  # first: the model plans what it covers, then writes the CV
    cv_text: str


def facts_text(candidate: Candidate) -> str:
    """The only facts the rewrite may use: experience, skills, interests, education, languages."""
    lines = []
    for job in candidate.experience:
        years = f"{job.get('start_year', '')}-{job.get('end_year') or 'hoy'}"
        lines.append(f"{years} · {job.get('role', '')} · {job.get('place', '')}")
        lines += [f"  - {t}" for t in job.get("tasks", [])]
    lines += [f"Formación: {e.get('title', '')} ({e.get('year', '')})" for e in candidate.education]
    lines += [f"Idioma: {lang}" for lang in candidate.languages]
    lines += [f"Habilidad: {s}" for s in candidate.skills]
    lines += [f"Interés: {i}" for i in candidate.interests]
    return "\n".join(lines)


def _call_llm(offer: Offer, candidate: Candidate, not_allowed: list[str]) -> LlmCv:
    model = settings.model_for(MODEL_TIER)
    prompt = render(
        "prep_adapt_cv",
        candidate_name=candidate.name,
        offer_title=offer.title,
        not_allowed="; ".join(not_allowed) or "ninguno",
        requirements="\n".join(f"- {r}" for r in offer.requirements if r not in not_allowed),
        facts=facts_text(candidate),
        cv_text=candidate.cv_text,
        output_language="español",
    )
    msgs = [{"role": "user", "content": prompt}]

    def call() -> dict:
        return settings.get_provider().complete_json(msgs, LlmCv, model=model).model_dump(mode="json")

    key = cache.key_for(settings.provider(), model, {"op": "prep_adapt_cv", "prompt": prompt, "schema": LlmCv.model_json_schema()})
    return LlmCv.model_validate(cache.cached_call(key, call))


def _note(candidate: Candidate, not_covered: list[str]) -> str:
    first = candidate.name.split()[0]
    if not not_covered:
        return f"Solo usa experiencia real de {first}."
    names = [re.sub(r"^se valoran?:?\s*", "", r, flags=re.IGNORECASE) for r in not_covered]
    missing = " ni ".join(n[0].lower() + n[1:] for n in names if n)
    return f"Solo usa experiencia real de {first}. No añadimos {missing} porque no lo tiene: prepáralo para la entrevista."


def _repair(requirements: list[str], llm: LlmCv, not_allowed: list[str]) -> str:
    """Add to PERFIL the change sentences the model wrote but left out of its CV.

    Only a change with a real `source` whose own text passes the filter for its
    requirement is added; a requirement she does not meet is never added.
    """
    cv = llm.cv_text
    for change in llm.changes:
        req = change.requirement
        if req not in requirements or req in not_allowed or not change.source.strip():
            continue
        if rules.check(req, cv).found or not rules.check(req, change.text).found:
            continue
        line = change.text.strip().rstrip(".") + "."
        if "PERFIL\n" in cv:
            head, _, rest = cv.partition("PERFIL\n")
            para, sep, tail = rest.partition("\n\n")
            cv = f"{head}PERFIL\n{para.rstrip()} {line}{sep}{tail}"
        else:
            cv = f"{cv.rstrip()}\n{line}"
    return cv


def adapt(offer: Offer, candidate: Candidate) -> AdaptedCv:
    """Rewrite with the LLM; raises on failure, timeout or a rejected rewrite."""
    not_allowed = rules.hard_missing(offer.requirements, facts_text(candidate))
    llm = _pool.submit(_call_llm, offer, candidate, not_allowed).result(timeout=TIMEOUT_S)
    ids = {"offer_id": offer.id or 0, "candidate_id": candidate.id or 0}
    cv_text = _repair(offer.requirements, llm, not_allowed)
    report = rules.run_filter(offer.requirements, cv_text, **ids)
    found = {c.text for c in report.requirements if c.found}
    if leaked := [r for r in not_allowed if r in found]:
        raise RejectedRewrite(f"the rewrite claims requirements she does not meet: {leaked}")
    not_covered = [c.text for c in report.requirements if not c.found]
    return AdaptedCv(
        **ids, cv_text=cv_text, report=report, not_covered=not_covered,
        changes=[c for c in llm.changes if c.requirement in found and c.source.strip()],
        note=_note(candidate, not_covered),
    )

