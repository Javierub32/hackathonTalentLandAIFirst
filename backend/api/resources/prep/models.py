"""Contract: per-offer preparation (Seam "Preparación", producer Lane llm; consumer web).

Beat 02:05 `POST /api/prep/filter`: how an automatic filter (ATS) reads the CV for one offer.
Beat 02:25 `POST /api/prep/adapt-cv`: the CV rewritten in the offer's words, only with real
facts of the candidate (R13.2); every change says which fact it comes from.
No tables: inputs are the `offers` and `candidates` records.
"""
from pydantic import BaseModel, Field


class PrepRequest(BaseModel):
    offer_id: int
    candidate_id: int


class RequirementCheck(BaseModel):
    text: str = Field(description="One requirement of the offer, in its own words")
    label: str = Field(description="Short 1-3 word label for the requirement")
    found: bool
    evidence: str = Field(default="", description="Words of the CV where the filter finds it; empty if not found")


class FilterReport(BaseModel):
    offer_id: int
    candidate_id: int
    found: int
    total: int
    percent: int = Field(description="round(100 * found / total)")
    requirements: list[RequirementCheck]


class CvChange(BaseModel):
    requirement: str = Field(description="The offer requirement this change covers")
    text: str = Field(description="What the new CV says")
    source: str = Field(description="The real fact of the candidate it comes from")


class AdaptedCv(BaseModel):
    offer_id: int
    candidate_id: int
    cv_text: str
    changes: list[CvChange]
    report: FilterReport = Field(description="The filter run again on the adapted CV")
    not_covered: list[str] = Field(description="Requirements left out because the candidate does not meet them")
    note: str = ""
