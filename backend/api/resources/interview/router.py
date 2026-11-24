"""Contract: interview routes. Operation ids `interview_questions`, `interview_feedback`.

STUB: the demo offer (IMFE 2026/01198) answers from `stub.json`; other offers get generic
questions built from the offer. The llm Lane replaces the bodies and keeps the signatures.
"""
import json
from pathlib import Path

from fastapi import APIRouter

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.candidates.models import Candidate
from backend.api.resources.interview.models import (
    FeedbackRequest,
    InterviewFeedback,
    InterviewQuestion,
    InterviewQuestions,
    QuestionsRequest,
)
from backend.api.resources.offers.models import Offer

router = APIRouter(prefix="/api/interview", tags=["interview"])

STUB = json.loads((Path(__file__).parent / "stub.json").read_text(encoding="utf-8"))
DEMO_CODE = "2026/01198"


@router.post("/questions", name="questions")
def questions(body: QuestionsRequest, session: SessionDep) -> InterviewQuestions:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    if offer.code == DEMO_CODE:
        return InterviewQuestions.model_validate({**STUB["questions"], **body.model_dump()})
    first = candidate.name.split()[0]
    task = offer.functions[0].lower() if offer.functions else "el trabajo diario"
    req = offer.requirements[0] if offer.requirements else "la experiencia"
    return InterviewQuestions(
        offer_id=body.offer_id, candidate_id=body.candidate_id,
        intro=f"Hola, {first}. Te haré dos preguntas sobre el puesto de {offer.title.lower()}.",
        questions=[
            InterviewQuestion(id=1, text=f"Cuéntame una vez en la que te tocó {task}. ¿Qué hiciste?", checks=req),
            InterviewQuestion(id=2, text="¿Por qué te interesa este puesto?", checks="Motivación"),
        ],
    )


@router.post("/feedback", name="feedback")
def feedback(body: FeedbackRequest, session: SessionDep) -> InterviewFeedback:
    offer = get_or_404(session, Offer, body.offer_id)
    data = STUB["feedback"]
    if offer.code == DEMO_CODE:
        return InterviewFeedback(offer_id=body.offer_id, good=data["good"], improve=data["improve"], tip=data["tip"])
    return InterviewFeedback(
        offer_id=body.offer_id,
        good=["Has respondido a la pregunta con un ejemplo."],
        improve=["Añade un resultado concreto: qué conseguiste."],
        tip="Ejemplo: el feedback con IA aún no está conectado para esta oferta.",
    )
