"""Transparent rule filter: how an automatic filter (ATS) reads a CV for one offer.

A requirement is found when one of its patterns (the offer's words and their synonyms)
appears in a sentence of the CV; that sentence is the evidence. Matching ignores case
and accents. Extend by adding a `Rule` to `RULES`; a requirement no rule covers falls back
to sharing at least half of its key words with one sentence of the CV.

`hard` rules are facts a rewrite can never create (previous experience in a field, a
language level, a qualification): if the candidate's real facts do not meet them, they
must stay out of the adapted CV (R13.2).
"""
from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass

from backend.api.resources.prep.models import FilterReport, RequirementCheck


def norm(text: str) -> str:
    """Lowercase without accents (ñ → n), for matching only."""
    decomposed = unicodedata.normalize("NFD", text.lower())
    return "".join(c for c in decomposed if unicodedata.category(c) != "Mn")


@dataclass(frozen=True)
class Rule:
    name: str
    applies: list[str]  # every regex must match the requirement (normalized)
    patterns: list[str]  # any regex found in one CV sentence (normalized) = found
    hard: bool = False

    def matches_requirement(self, req: str) -> bool:
        return all(re.search(a, req) for a in self.applies)

    def find(self, sentences: list[tuple[str, str]]) -> str:
        """The first CV sentence where a pattern appears, or ''."""
        for pattern in self.patterns:
            rx = re.compile(pattern)
            for original, normalized in sentences:
                m = rx.search(normalized)
                if m:
                    return _snippet(original, m.start())
        return ""


# Order matters: the first rule that applies to a requirement is used.
RULES: list[Rule] = [
    Rule(
        "experiencia en perfumería",
        [r"experiencia", r"perfum|fragancia|cosmetic"],
        [r"\b(dependient\w*|vendedor\w*|trabaj\w*|experiencia|anos)\b[^.\n]{0,40}\b(perfumeria|cosmetica)"],
        hard=True,
    ),
    Rule("interés por la perfumería", [r"perfum|fragancia"], [r"perfum", r"fragancia"]),
    Rule(
        "atención al público y ventas",
        [r"atencion al (publico|cliente)"],
        [r"atencion al (publico|cliente)", r"\batendi\w* a (l[oa]s )?client"],
    ),
    Rule("comunicación", [r"comunica"], [r"comunica"]),
    Rule("orientación al cliente", [r"orientacion al cliente"], [r"orientad[oa] al cliente", r"orientacion al cliente"]),
    Rule("proactividad", [r"proactiv|iniciativa"], [r"proactiv", r"iniciativa"]),
    Rule("responsabilidad", [r"responsab"], [r"responsab"]),
    Rule("trabajo en equipo", [r"equipo"], [r"en equipo", r"companer"]),
    Rule(
        "inglés alto",
        [r"ingles"],
        [r"ingles\W+(de\W+)?(nivel\W+)?(alto|avanzado|fluido|bilingue|b2|c1|c2)\b"],
        hard=True,
    ),
    Rule(
        "titulación",
        [r"\beso\b|graduado|bachiller|titulo|titulacion"],
        [r"graduado", r"\beso\b", r"bachiller", r"formacion profesional|\bfp\b|ciclo formativo"],
        hard=True,
    ),
    Rule("asesoramiento", [r"asesor"], [r"asesor", r"aconsej"]),
    Rule(
        "reposición y stock",
        [r"reposicion|stock|mercancia|inventario"],
        [r"\brepon", r"reposicion", r"\bstock\b", r"inventario", r"mercancia", r"almacen"],
    ),
    Rule("caja y cobros", [r"\bcaja\b|cobro"], [r"\bcaja\b", r"\bcobr", r"datafono"]),
]

STOPWORDS = {"experiencia", "conocimientos", "buenas", "nivel", "equivalente", "previa", "otros"}


def rule_for(requirement: str) -> Rule | None:
    req = norm(requirement)
    return next((r for r in RULES if r.matches_requirement(req)), None)


def _sentences(text: str) -> list[tuple[str, str]]:
    parts = re.split(r"\n+|(?<=[.;])\s+", text)
    return [(p.strip(" -·\t"), norm(p)) for p in parts if p.strip(" -·\t")]


def _snippet(sentence: str, at: int, width: int = 110) -> str:
    if len(sentence) <= width:
        return sentence
    start = max(0, min(at - 20, len(sentence) - width))
    end = start + width
    return ("…" if start else "") + sentence[start:end].strip() + ("…" if end < len(sentence) else "")


def _fallback(requirement: str, sentences: list[tuple[str, str]]) -> str:
    """Half of the requirement's key words (6-letter stems) in one sentence."""
    stems = {w[:6] for w in re.findall(r"\w+", norm(requirement)) if len(w) > 4 and w not in STOPWORDS}
    if not stems:
        return ""
    best, best_hits = "", 0
    for original, normalized in sentences:
        words = {w[:6] for w in re.findall(r"\w+", normalized)}
        hits = len(stems & words)
        if hits > best_hits:
            best, best_hits = original, hits
    return _snippet(best, 0) if best_hits * 2 >= len(stems) else ""


def check(requirement: str, text: str) -> RequirementCheck:
    sentences = _sentences(text)
    rule = rule_for(requirement)
    evidence = rule.find(sentences) if rule else _fallback(requirement, sentences)
    return RequirementCheck(text=requirement, found=bool(evidence), evidence=evidence)


def run_filter(requirements: list[str], text: str, *, offer_id: int, candidate_id: int) -> FilterReport:
    checks = [check(req, text) for req in requirements]
    found = sum(c.found for c in checks)
    return FilterReport(
        offer_id=offer_id, candidate_id=candidate_id, found=found, total=len(checks),
        percent=round(100 * found / (len(checks) or 1)), requirements=checks,
    )


def hard_missing(requirements: list[str], facts: str) -> list[str]:
    """Hard requirements the candidate's real facts do not meet: never in the adapted CV."""
    return [
        req for req in requirements
        if (rule := rule_for(req)) and rule.hard and not check(req, facts).found
    ]
