"""Interview practice with the LLM (Beat 02:50): questions from the offer and her CV, feedback on content.

Questions: the rule filter of `prep` picks which requirement each question checks, so the
second question always touches a requirement her CV does not cover; the model only words them.
Feedback: one cached structured call on the transcribed text, then a guard that drops any line
about voice, tone or emotions (R13, AI Act Art. 5(1)(f)): we only judge what she says.
Both raise on failure or timeout; the router falls back to the stub.
"""
from __future__ import annotations

import re
from concurrent.futures import ThreadPoolExecutor

from pydantic import BaseModel

from backend.api.resources.candidates.models import Candidate
from backend.api.resources.interview.models import (
    InterviewFeedback,
    InterviewQuestion,
    InterviewQuestions,
)
from backend.api.resources.offers.models import Offer
from backend.api.resources.prep import rules
from backend.api.resources.prep.adapt import facts_text
from backend.llm import cache, settings
from backend.llm.render import render

TIMEOUT_S = 15
MODEL_TIER = "smart"
# Long calls keep running after the timeout and fill the cache for the next request.
_pool = ThreadPoolExecutor(max_workers=2, thread_name_prefix="interview-llm")

# Requirements that are a record, not a skill she can show in an answer.
_NOT_ASKABLE = re.compile(r"^(experiencia|graduado|título|titulación|carnet|conocimientos)", re.IGNORECASE)
# Anything about how she sounds or feels, never what she says (R13).
_NOT_CONTENT = re.compile(
    r"\b(voz|tono|entonaci\w*|pronunci\w*|nervi\w*|emoci\w*|segur[ao]s?\b|seguridad|confianza|"
    r"tranquil\w*|tímid\w*|timidez|ansi\w*|calma|sonr\w*|ritmo|hablas (muy )?(despacio|rápido|alto|bajo))",
    re.IGNORECASE,
)


class LlmQuestions(BaseModel):
    intro: str
    q1: str
    q2: str


class LlmFeedback(BaseModel):
    good: list[str]
    improve: list[str]
    tip: str


class UnsafeFeedback(Exception):
    """The feedback judged voice, tone or emotions and too little content was left."""


def _cached(op: str, prompt: str, schema: type[BaseModel]) -> BaseModel:
    model = settings.model_for(MODEL_TIER)
    msgs = [{"role": "user", "content": prompt}]

    def call() -> dict:
        return settings.get_provider().complete_json(msgs, schema, model=model).model_dump(mode="json")

    key = cache.key_for(settings.provider(), model, {"op": op, "prompt": prompt, "schema": schema.model_json_schema()})
    return schema.model_validate(cache.cached_call(key, call))


def _run(op: str, prompt: str, schema: type[BaseModel]) -> BaseModel:
    return _pool.submit(_cached, op, prompt, schema).result(timeout=TIMEOUT_S)


def pick_checks(offer: Offer, candidate: Candidate) -> tuple[str, str]:
    """(covered, gap): a requirement her real facts cover, and one they do not.

    The gap prefers a hard requirement she can prepare (a language, a skill) over missing experience.
    """
    facts = facts_text(candidate)
    report = rules.run_filter(offer.requirements, facts, offer_id=offer.id or 0, candidate_id=candidate.id or 0)
    found = [r.text for r in report.requirements if r.found]
    missing = [r.text for r in report.requirements if not r.found]
    covered = next((r for r in found if not _NOT_ASKABLE.match(r)), found[0] if found else "Atención al cliente")
    hard = rules.hard_missing(offer.requirements, facts)
    gap = next((r for r in hard if not _NOT_ASKABLE.match(r)), None) or (hard or missing or ["Motivación"])[0]
    return covered, gap


def questions(offer: Offer, candidate: Candidate) -> InterviewQuestions:
    covered, gap = pick_checks(offer, candidate)
    first = candidate.name.split()[0]
    prompt = render(
        "interview_questions",
        offer_title=offer.title,
        candidate_name=candidate.name,
        first_name=first,
        covered=covered,
        gap=gap,
        functions="\n".join(f"- {f}" for f in offer.functions) or "- (no publicadas)",
        facts=facts_text(candidate),
        output_language="español",
    )
    llm = _run("interview_questions", prompt, LlmQuestions)
    return InterviewQuestions(
        offer_id=offer.id or 0, candidate_id=candidate.id or 0, intro=llm.intro.strip(),
        questions=[
            InterviewQuestion(id=1, text=llm.q1.strip(), checks=covered),
            InterviewQuestion(id=2, text=llm.q2.strip(), checks=f"{gap} (requisito que no cubre su CV)"),
        ],
    )


def content_only(lines: list[str]) -> list[str]:
    return [s.strip() for s in lines if s.strip() and not _NOT_CONTENT.search(s)]


def feedback(offer: Offer, question: str, answer: str) -> InterviewFeedback:
    prompt = render(
        "interview_feedback",
        offer_title=offer.title,
        requirements="\n".join(f"- {r}" for r in offer.requirements),
        question=question,
        answer=answer,
        output_language="español",
    )
    llm = _run("interview_feedback", prompt, LlmFeedback)
    good, improve = content_only(llm.good), content_only(llm.improve)
    if not good or not improve:
        raise UnsafeFeedback(f"feedback left without content lines: {llm!r}")
    tip = llm.tip.strip()
    if not tip or _NOT_CONTENT.search(tip):
        tip = "Repite la respuesta en voz alta una vez más añadiendo lo que te proponemos mejorar."
    return InterviewFeedback(offer_id=offer.id or 0, good=good, improve=improve, tip=tip)
