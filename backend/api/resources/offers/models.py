"""Contract: job offers (Seam "Ofertas", producer Lane api; consumers web, llm).

Seeded with real offers from the IMFE municipal placement agency
(https://malagaempleo.portalemp.com/), copied by hand on 2026-11-24 with the code
and link of each. Companies post new ones with `POST /api/offers` (Beat 03:35).
`requirements` is the list the filter simulator checks (Beats 02:05, 02:25).
"""
from datetime import date, datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from backend.api.core.crud import now as _now


class OfferBase(SQLModel):
    """Fields a client may send. Shared by create and read."""

    title: str
    employer: str = Field(description="Employer as the source shows it: a description, no invented name")
    location: str = ""
    contract: str = ""
    schedule: str = ""
    salary: str = ""
    requirements: list[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    functions: list[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    hiring_aid: str = Field(default="", description="Hiring-aid note for the employer (Emplea-T); empty when none applies")
    code: str = Field(default="", description="Source offer code, e.g. IMFE 2026/01198; empty for company-posted offers")
    source: str = Field(default="", description="Who published it, e.g. 'IMFE · Agencia Municipal de Colocación'")
    source_url: str = ""
    published_on: date | None = None


class Offer(OfferBase, table=True):
    """The database table. Server-owned fields (id, created_at) live here only."""

    __tablename__ = "offer"

    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=_now)


class OfferCreate(OfferBase):
    """POST body: the company "Publicar oferta" form."""


class OfferRead(OfferBase):
    """Response shape."""

    id: int
    created_at: datetime


class Read(OfferBase):
    """Seed row shape (seed.json): no id, the database assigns it in file order."""

    created_at: datetime
