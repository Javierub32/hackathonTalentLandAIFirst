"""Contract: preparation routes. Operation ids `prep_filter`, `prep_adapt_cv`.

`filter`: the transparent rule filter in `rules.py` on the CV as she wrote it.
`adapt-cv`: the LLM rewrite in `adapt.py`, re-checked by the same filter. If the call fails,
takes longer than 15 s or breaks a rule, the demo offer (IMFE 2026/01198) answers from
`stub.json` and any other offer gets her own CV back with the filter report.
"""
import json
import logging
from pathlib import Path

from fastapi import APIRouter

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.candidates.models import Candidate
from backend.api.resources.offers.models import Offer
from backend.api.resources.prep import adapt, rules
from backend.api.resources.prep.models import AdaptedCv, FilterReport, PrepRequest

router = APIRouter(prefix="/api/prep", tags=["prep"])
log = logging.getLogger(__name__)

STUB = json.loads((Path(__file__).parent / "stub.json").read_text(encoding="utf-8"))
DEMO_CODE = "2026/01198"


def _filter(offer: Offer, candidate: Candidate, text: str) -> FilterReport:
    return rules.run_filter(offer.requirements, text, offer_id=offer.id or 0, candidate_id=candidate.id or 0)


@router.post("/filter", name="filter")
def filter_cv(body: PrepRequest, session: SessionDep) -> FilterReport:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    return _filter(offer, candidate, candidate.cv_text)


def _fallback(offer: Offer, candidate: Candidate, body: PrepRequest) -> AdaptedCv:
    if offer.code == DEMO_CODE:
        data = STUB["adapt_cv"]
        report = {**data["report"], **body.model_dump()}
        return AdaptedCv.model_validate({**data, **body.model_dump(), "report": report})
    report = _filter(offer, candidate, candidate.cv_text)
    return AdaptedCv(
        offer_id=body.offer_id, candidate_id=body.candidate_id, cv_text=candidate.cv_text, changes=[],
        report=report, not_covered=[r.text for r in report.requirements if not r.found],
        note="La adaptación con IA no está disponible ahora mismo: este es su CV original. Prueba otra vez en un momento.",
    )


@router.post("/adapt-cv", name="adapt_cv")
def adapt_cv(body: PrepRequest, session: SessionDep) -> AdaptedCv:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    try:
        result = adapt.adapt(offer, candidate)
    except Exception as exc:  # LLM down, timeout, quota or a rejected rewrite: never break the demo
        log.warning("prep adapt-cv fallback for offer %s: %r", offer.id, exc)
        return _fallback(offer, candidate, body)
    # The demo offer must keep its Wow moment: a weaker rewrite falls back to the stub.
    if offer.code == DEMO_CODE and result.report.found < STUB["adapt_cv"]["report"]["found"]:
        log.warning("prep adapt-cv: rewrite found %s, using the stub", result.report.found)
        return _fallback(offer, candidate, body)
    return result
