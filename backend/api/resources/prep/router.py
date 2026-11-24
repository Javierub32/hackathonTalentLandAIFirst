"""Contract: preparation routes. Operation ids `prep_filter`, `prep_adapt_cv`.

STUB: the demo offer (IMFE 2026/01198) answers from `stub.json`; any other offer gets a
naive word match. The llm Lane replaces the bodies (rule filter + LLM rewrite) and keeps
the signatures.
"""
import json
import re
from pathlib import Path

from fastapi import APIRouter

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.candidates.models import Candidate
from backend.api.resources.offers.models import Offer
from backend.api.resources.prep.models import AdaptedCv, FilterReport, PrepRequest, RequirementCheck

router = APIRouter(prefix="/api/prep", tags=["prep"])

STUB = json.loads((Path(__file__).parent / "stub.json").read_text(encoding="utf-8"))
DEMO_CODE = "2026/01198"


def _words(text: str) -> set[str]:
    return {w for w in re.findall(r"\w+", text.lower()) if len(w) > 4}


def naive_filter(offer: Offer, candidate: Candidate, cv_text: str) -> FilterReport:
    cv = _words(cv_text)
    checks = []
    for req in offer.requirements:
        hits = sorted(_words(req) & cv)
        checks.append(RequirementCheck(text=req, found=bool(hits), evidence=", ".join(hits)))
    found = sum(c.found for c in checks)
    total = len(checks) or 1
    return FilterReport(
        offer_id=offer.id or 0, candidate_id=candidate.id or 0, found=found, total=len(checks),
        percent=round(100 * found / total), requirements=checks,
    )


@router.post("/filter", name="filter")
def filter_cv(body: PrepRequest, session: SessionDep) -> FilterReport:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    if offer.code == DEMO_CODE:
        return FilterReport.model_validate({**STUB["filter"], **body.model_dump()})
    return naive_filter(offer, candidate, candidate.cv_text)


@router.post("/adapt-cv", name="adapt_cv")
def adapt_cv(body: PrepRequest, session: SessionDep) -> AdaptedCv:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    if offer.code == DEMO_CODE:
        data = STUB["adapt_cv"]
        report = {**data["report"], **body.model_dump()}
        return AdaptedCv.model_validate({**data, **body.model_dump(), "report": report})
    report = naive_filter(offer, candidate, candidate.cv_text)
    return AdaptedCv(
        offer_id=body.offer_id, candidate_id=body.candidate_id, cv_text=candidate.cv_text, changes=[],
        report=report, not_covered=[r.text for r in report.requirements if not r.found],
        note="Ejemplo: la adaptación con IA aún no está conectada para esta oferta.",
    )
