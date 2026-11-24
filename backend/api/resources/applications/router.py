"""Contract: application routes. Operation ids `applications_list`, `applications_get`,
`applications_create`, `applications_update`."""
from fastapi import APIRouter
from sqlmodel import col, select

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.applications.models import (
    Application,
    ApplicationCreate,
    ApplicationRead,
    ApplicationUpdate,
)

router = APIRouter(prefix="/api/applications", tags=["applications"])


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
def create_application(body: ApplicationCreate, session: SessionDep) -> ApplicationRead:
    row = Application.model_validate(body)
    session.add(row)
    session.commit()
    session.refresh(row)
    return ApplicationRead.model_validate(row)


@router.patch("/{application_id}", name="update")
def update_application(application_id: int, body: ApplicationUpdate, session: SessionDep) -> ApplicationRead:
    row = get_or_404(session, Application, application_id)
    row.sqlmodel_update(body.model_dump(exclude_unset=True))
    session.add(row)
    session.commit()
    session.refresh(row)
    return ApplicationRead.model_validate(row)
