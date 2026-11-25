"""Contract: interview routes. Operation ids `interview_questions`, `interview_feedback`.

Both call the LLM through `ai.py`. If it fails or times out, questions use the demo
stub or generic questions. Feedback reports the temporary unavailability.
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
        intro=f"Hola, {first}. Te haré ocho preguntas sobre el puesto de {offer.title.lower()}.",
        questions=[
            InterviewQuestion(id=1, text=f"Cuéntame una vez en la que te tocó {task}. ¿Qué hiciste?", checks=req),
            InterviewQuestion(id=2, text=f"¿Cómo organizarías tu jornada en el puesto de {offer.title.lower()}?", checks="Organización"),
            InterviewQuestion(id=3, text="Cuéntame un problema que resolviste en un trabajo anterior. ¿Qué hiciste?", checks="Resolución de problemas"),
            InterviewQuestion(id=4, text="¿Cómo te coordinas con tus compañeros cuando hay mucho trabajo?", checks="Trabajo en equipo"),
            InterviewQuestion(id=5, text=f"¿Qué experiencia tuya te ayudaría a cumplir este requisito: {req.lower()}?", checks=req),
            InterviewQuestion(id=6, text="Si te piden una tarea nueva, ¿cómo aprenderías a hacerla?", checks="Aprendizaje"),
            InterviewQuestion(id=7, text="¿Qué harías si coinciden dos tareas urgentes?", checks="Priorización"),
            InterviewQuestion(id=8, text=f"¿Por qué te interesa trabajar como {offer.title.lower()}?", checks="Motivación"),
        ],
    )


@router.post("/feedback", name="feedback")
def feedback(body: FeedbackRequest, session: SessionDep) -> InterviewFeedback:
    offer = get_or_404(session, Offer, body.offer_id)
    if ai.heard_nothing(body.answer):
        return ai.not_heard(body.offer_id)
    try:
        return ai.feedback(offer, body.question, body.answer)
    except Exception as exc:  # noqa: BLE001 - LLM down, timeout, quota or unsafe feedback
        log.warning("interview feedback fallback for offer %s: %r", offer.id, exc)
    return InterviewFeedback(
        offer_id=body.offer_id,
        good=[],
        improve=[],
        tip="Ahora mismo no podemos evaluar tu respuesta. Vuelve a pulsar «Ver mi comentario» para intentarlo de nuevo.",
    )
