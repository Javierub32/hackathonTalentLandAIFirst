"""Contract: the candidate profile and CV (Seam "Candidata", producer Lane api; consumers web, llm).

One seeded candidate, Pilar (fictitious persona, Beats 02:05-03:20). `cv_text` is the CV
as she wrote it: the filter and the CV rewrite start from it and from `experience`,
the only facts the AI may use (R13.2: nothing invented).
"""
from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from backend.api.core.crud import now as _now


class Job(BaseModel):
    role: str
    place: str = Field(description="Employer described, no real company name")
    start_year: int
    end_year: int | None = None
    tasks: list[str] = []


class Education(BaseModel):
    title: str
    year: int | None = None


class Candidate(SQLModel, table=True):
    """The database table. Nested lists are stored as JSON."""

    __tablename__ = "candidate"

    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=_now)
    name: str
    age: int
    city: str = ""
    months_unemployed: int = 0
    summary: str = ""
    experience: list[dict] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    education: list[dict] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    languages: list[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    skills: list[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    interests: list[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    cv_text: str = ""


class CandidateFields(SQLModel):
    name: str
    age: int
    city: str = ""
    months_unemployed: int = 0
    summary: str = ""
    experience: list[Job] = []
    education: list[Education] = []
    languages: list[str] = []
    skills: list[str] = []
    interests: list[str] = Field(default=[], description="What she says she likes or knows; usable as real facts")
    cv_text: str = Field(default="", description="The CV as she wrote it")


class CandidateRead(CandidateFields):
    """Response shape."""

    id: int
    created_at: datetime


class Read(CandidateFields):
    """Seed row shape (seed.json): no id."""

    created_at: datetime
