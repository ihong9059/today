from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from datetime import datetime, timedelta
from typing import List

from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User, PantryItem
from ...schemas.user import PantryItemCreate, PantryItemResponse

router = APIRouter(prefix="/pantry", tags=["Pantry Management"])


@router.post("/", response_model=PantryItemResponse)
async def add_pantry_item(
    item_data: PantryItemCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add item to pantry"""
    item = PantryItem(
        user_id=current_user.id,
        **item_data.model_dump()
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)

    return item


@router.get("/", response_model=List[PantryItemResponse])
async def get_pantry_items(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all pantry items"""
    result = await db.execute(
        select(PantryItem)
        .where(PantryItem.user_id == current_user.id)
        .order_by(PantryItem.expiry_date.asc().nullslast())
    )
    return result.scalars().all()


@router.get("/expiring", response_model=List[PantryItemResponse])
async def get_expiring_items(
    days: int = 3,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get items expiring within N days"""
    threshold = datetime.utcnow() + timedelta(days=days)

    result = await db.execute(
        select(PantryItem)
        .where(and_(
            PantryItem.user_id == current_user.id,
            PantryItem.expiry_date <= threshold,
            PantryItem.expiry_date >= datetime.utcnow()
        ))
        .order_by(PantryItem.expiry_date.asc())
    )
    return result.scalars().all()


@router.put("/{item_id}", response_model=PantryItemResponse)
async def update_pantry_item(
    item_id: int,
    item_data: PantryItemCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update pantry item"""
    result = await db.execute(
        select(PantryItem)
        .where(and_(
            PantryItem.id == item_id,
            PantryItem.user_id == current_user.id
        ))
    )
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    for field, value in item_data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)

    await db.commit()
    await db.refresh(item)

    return item


@router.delete("/{item_id}")
async def delete_pantry_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete pantry item"""
    result = await db.execute(
        select(PantryItem)
        .where(and_(
            PantryItem.id == item_id,
            PantryItem.user_id == current_user.id
        ))
    )
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    await db.delete(item)
    await db.commit()

    return {"message": "Item deleted"}


@router.post("/use/{item_id}")
async def use_pantry_item(
    item_id: int,
    amount: float,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Reduce quantity of pantry item (after cooking)"""
    result = await db.execute(
        select(PantryItem)
        .where(and_(
            PantryItem.id == item_id,
            PantryItem.user_id == current_user.id
        ))
    )
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if item.quantity:
        item.quantity = max(0, item.quantity - amount)
        if item.quantity == 0:
            await db.delete(item)
        await db.commit()

    return {"message": "Item updated", "remaining": item.quantity if item.quantity else 0}
