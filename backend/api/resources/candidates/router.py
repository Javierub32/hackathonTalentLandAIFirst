"""Contract: candidate routes. Operation ids `candidates_list`, `candidates_get`."""
from fastapi import APIRouter
from sqlmodel import col, select

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.candidates.models import Candidate, CandidateRead

router = APIRouter(prefix="/api/candidates", tags=["candidates"])


@router.get("", name="list")
def list_candidates(session: SessionDep) -> list[CandidateRead]:
    rows = session.exec(select(Candidate).order_by(col(Candidate.id))).all()
    return [CandidateRead.model_validate(r) for r in rows]


@router.get("/{candidate_id}", name="get")
def get_candidate(candidate_id: int, session: SessionDep) -> CandidateRead:
    return CandidateRead.model_validate(get_or_404(session, Candidate, candidate_id, detail="La candidata no existe"))
