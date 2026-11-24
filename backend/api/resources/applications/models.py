"""Contract: applications (Seam "Candidaturas", producer Lane api; consumer web).

Beat 03:20: the candidate applies with her adapted CV; an IMFE counsellor reviews
before it is sent. Status flow: borrador -> revisada -> enviada.
"""
from datetime import datetime
from enum import Enum

from sqlalchemy import Column, String
from sqlmodel import Field, SQLModel

from backend.api.core.crud import now as _now


class ApplicationStatus(str, Enum):
    borrador = "borrador"
    revisada = "revisada"
    enviada = "enviada"


class ApplicationBase(SQLModel):
    """Fields a client may send. Shared by create and read."""

    candidate_id: int = Field(index=True)
    offer_id: int = Field(index=True)
    cv_text: str = Field(default="", description="The CV sent with the application (usually the adapted one)")
    status: ApplicationStatus = Field(default=ApplicationStatus.borrador, sa_column=Column(String, nullable=False))
    counsellor_name: str = ""
    counsellor_note: str = ""


class Application(ApplicationBase, table=True):
    __tablename__ = "application"

    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=_now)


class ApplicationCreate(ApplicationBase):
    """POST body."""


class ApplicationRead(ApplicationBase):
    id: int
    created_at: datetime


class ApplicationUpdate(SQLModel):
    """PATCH body: the counsellor approves (`revisada`), then the candidate sends (`enviada`)."""

    cv_text: str | None = None
    status: ApplicationStatus | None = None
    counsellor_name: str | None = None
    counsellor_note: str | None = None


class Read(ApplicationBase):
    """Seed row shape (seed.json): no id."""

    created_at: datetime
