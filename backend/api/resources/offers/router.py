"""Contract: offers routes. Operation ids `offers_list`, `offers_get`, `offers_create`."""
from fastapi import APIRouter
from sqlmodel import col, select

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.offers.models import Offer, OfferCreate, OfferRead

router = APIRouter(prefix="/api/offers", tags=["offers"])


@router.get("", name="list")
def list_offers(session: SessionDep) -> list[OfferRead]:
    rows = session.exec(select(Offer).order_by(col(Offer.id))).all()
    return [OfferRead.model_validate(r) for r in rows]


@router.get("/{offer_id}", name="get")
def get_offer(offer_id: int, session: SessionDep) -> OfferRead:
    return OfferRead.model_validate(get_or_404(session, Offer, offer_id))


@router.post("", name="create", status_code=201)
def create_offer(body: OfferCreate, session: SessionDep) -> OfferRead:
    row = Offer.model_validate(body)
    session.add(row)
    session.commit()
    session.refresh(row)
    return OfferRead.model_validate(row)
