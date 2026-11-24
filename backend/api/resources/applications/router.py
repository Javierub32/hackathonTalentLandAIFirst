"""Contract: application routes. Operation ids `applications_list`, `applications_get`,
`applications_create`, `applications_update`.

Rules (Beat 03:20):
- A new application always starts as `borrador`; one per candidate and offer
  (posting again returns the existing one, 200).
- Status only moves forward one step: borrador -> revisada -> enviada (409 otherwise).
- An `enviada` application is final: any further change is 409.
"""
from fastapi import APIRouter, HTTPException, Response
from sqlmodel import col, select

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.applications.models import (
    Application,
    ApplicationCreate,
    ApplicationRead,
    ApplicationStatus,
    ApplicationUpdate,
)
from backend.api.resources.candidates.models import Candidate
from backend.api.resources.offers.models import Offer

router = APIRouter(prefix="/api/applications", tags=["applications"])

# The only allowed status moves. Extend here if the flow grows (e.g. "rechazada").
NEXT_STATUS: dict[ApplicationStatus, ApplicationStatus] = {
    ApplicationStatus.borrador: ApplicationStatus.revisada,
    ApplicationStatus.revisada: ApplicationStatus.enviada,
}


@router.get("", name="list")
def list_applications(
    session: SessionDep, candidate_id: int | None = None, offer_id: int | None = None
) -> list[ApplicationRead]:
    q = select(Application).order_by(col(Application.id))
    if candidate_id is not None:
        q = q.where(Application.candidate_id == candidate_id)
    if offer_id is not None:
        q = q.where(Application.offer_id == offer_id)
    return [ApplicationRead.model_validate(r) for r in session.exec(q).all()]


@router.get("/{application_id}", name="get")
def get_application(application_id: int, session: SessionDep) -> ApplicationRead:
    return ApplicationRead.model_validate(get_or_404(session, Application, application_id))


@router.post("", name="create", status_code=201)
def create_application(body: ApplicationCreate, session: SessionDep, response: Response) -> ApplicationRead:
    get_or_404(session, Offer, body.offer_id, detail="La oferta no existe")
    get_or_404(session, Candidate, body.candidate_id, detail="La candidata no existe")
    existing = session.exec(
        select(Application).where(
            Application.candidate_id == body.candidate_id, Application.offer_id == body.offer_id
        )
    ).first()
    if existing is not None:
        response.status_code = 200
        return ApplicationRead.model_validate(existing)
    row = Application.model_validate(body)
    row.status = ApplicationStatus.borrador
    session.add(row)
    session.commit()
    session.refresh(row)
    return ApplicationRead.model_validate(row)


@router.patch("/{application_id}", name="update")
def update_application(application_id: int, body: ApplicationUpdate, session: SessionDep) -> ApplicationRead:
    row = get_or_404(session, Application, application_id)
    current = ApplicationStatus(row.status)
    if current == ApplicationStatus.enviada:
        raise HTTPException(status_code=409, detail="La candidatura ya está enviada y no se puede cambiar")
    changes = body.model_dump(exclude_unset=True, exclude_none=True)
    target = changes.get("status")
    if target is not None and ApplicationStatus(target) != current and NEXT_STATUS.get(current) != target:
        raise HTTPException(
            status_code=409,
            detail=f"No se puede pasar de «{current.value}» a «{ApplicationStatus(target).value}»: "
            "el orden es borrador → revisada → enviada",
        )
    row.sqlmodel_update(changes)
    session.add(row)
    session.commit()
    session.refresh(row)
    return ApplicationRead.model_validate(row)
