"""Contract: offers routes. Operation ids `offers_list`, `offers_get`, `offers_create`.

`POST /api/offers` is the company "Publicar oferta" form (Beat 03:35). The server
computes the hiring-aid note: an offer published by the company with a permanent
contract gets the Emplea-T note, so the employer sees the aid it can claim.
"""
from fastapi import APIRouter
from sqlmodel import col, select

from backend.api.core.crud import get_or_404
from backend.api.core.deps import SessionDep
from backend.api.resources.offers.models import Offer, OfferCreate, OfferRead

router = APIRouter(prefix="/api/offers", tags=["offers"])

COMPANY_SOURCE = "Publicada por la empresa"
# Same wording as the seeded IMFE offers (seed.json). Add more aids as (rule, note) pairs here.
EMPLEA_T_NOTE = (
    "Ayuda Emplea-T (Junta de Andalucía): hasta 18.000 € si una pyme o autónomo contrata "
    "de forma indefinida a una persona mayor de 45 años en paro"
)


def is_permanent(contract: str) -> bool:
    """'Indefinido', 'Indefinido a jornada completa'... but not 'Temporal, con posibilidad de indefinido'."""
    return contract.strip().lower().startswith("indefinid")


def hiring_aid_for(offer: OfferCreate) -> str:
    if offer.source == COMPANY_SOURCE and is_permanent(offer.contract):
        return EMPLEA_T_NOTE
    return ""


@router.get("", name="list")
def list_offers(session: SessionDep) -> list[OfferRead]:
    rows = session.exec(select(Offer).order_by(col(Offer.id))).all()
    return [OfferRead.model_validate(r) for r in rows]


@router.get("/{offer_id}", name="get")
def get_offer(offer_id: int, session: SessionDep) -> OfferRead:
    return OfferRead.model_validate(get_or_404(session, Offer, offer_id, detail="La oferta no existe"))


@router.post("", name="create", status_code=201)
def create_offer(body: OfferCreate, session: SessionDep) -> OfferRead:
    if not body.source and not body.code:
        body.source = COMPANY_SOURCE
    if not body.hiring_aid:
        body.hiring_aid = hiring_aid_for(body)
    row = Offer.model_validate(body)
    session.add(row)
    session.commit()
    session.refresh(row)
    return OfferRead.model_validate(row)
