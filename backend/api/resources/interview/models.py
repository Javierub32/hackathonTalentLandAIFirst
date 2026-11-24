"""Contract: interview practice for one offer (Seam "Entrevista", producer Lane llm; consumer web).

Beat 02:50: the interviewer asks out loud (browser TTS), the candidate answers by voice
(`POST /api/llm/transcribe`), then gets kind, concrete feedback on the content of her answer.
Never analyses face, voice tone or emotion (R13, AI Act Art. 5(1)(f)).
"""
from pydantic import BaseModel, Field


class QuestionsRequest(BaseModel):
    offer_id: int
    candidate_id: int


class InterviewQuestion(BaseModel):
    id: int
    text: str
    checks: str = Field(description="Which requirement of the offer the question checks")


class InterviewQuestions(BaseModel):
    offer_id: int
    candidate_id: int
    intro: str = Field(description="What the interviewer says first")
    questions: list[InterviewQuestion]


class FeedbackRequest(BaseModel):
    offer_id: int
    question: str
    answer: str = Field(min_length=1, description="The transcribed answer")


class InterviewFeedback(BaseModel):
    offer_id: int
    good: list[str]
    improve: list[str]
    tip: str
