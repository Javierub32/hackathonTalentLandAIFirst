"""Contract: interview routes. Operation ids `interview_questions`, `interview_feedback`.

Both call the LLM through `ai.py`. If the call fails or takes longer than 15 s, the demo offer
(IMFE 2026/01198) answers from `stub.json` and any other offer gets generic questions or
feedback built from the offer.
"""
import json
import logging
from pathlib import Path

from fastapi import APIRouter

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.candidates.models import Candidate
from backend.api.resources.interview import ai
from backend.api.resources.interview.models import (
    FeedbackRequest,
    InterviewFeedback,
    InterviewQuestion,
    InterviewQuestions,
    QuestionsRequest,
)
from backend.api.resources.offers.models import Offer

router = APIRouter(prefix="/api/interview", tags=["interview"])
log = logging.getLogger(__name__)

STUB = json.loads((Path(__file__).parent / "stub.json").read_text(encoding="utf-8"))
DEMO_CODE = "2026/01198"


@router.post("/questions", name="questions")
def questions(body: QuestionsRequest, session: SessionDep) -> InterviewQuestions:
    offer = get_or_404(session, Offer, body.offer_id)
    candidate = get_or_404(session, Candidate, body.candidate_id)
    try:
        return ai.questions(offer, candidate)
    except Exception as exc:  # noqa: BLE001 - LLM down, timeout or quota: never break the demo
        log.warning("interview questions fallback for offer %s: %r", offer.id, exc)
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
    try:
        return ai.feedback(offer, body.question, body.answer)
    except Exception as exc:  # noqa: BLE001 - LLM down, timeout, quota or unsafe feedback
        log.warning("interview feedback fallback for offer %s: %r", offer.id, exc)
    data = STUB["feedback"]
    if offer.code == DEMO_CODE:
        return InterviewFeedback(offer_id=body.offer_id, good=data["good"], improve=data["improve"], tip=data["tip"])
    return InterviewFeedback(
        offer_id=body.offer_id,
        good=["Has respondido a la pregunta con un ejemplo."],
        improve=["Añade un resultado concreto: qué conseguiste."],
        tip="El feedback con IA no está disponible ahora mismo: prueba otra vez en un momento.",
    )
