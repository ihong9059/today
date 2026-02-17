from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
import secrets
import string

from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User, Family
from ...schemas.user import FamilyCreate, FamilyResponse, UserResponse

router = APIRouter(prefix="/family", tags=["Family Sharing"])


def generate_invite_code(length: int = 8) -> str:
    """Generate random invite code"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


@router.post("/create", response_model=FamilyResponse)
async def create_family(
    family_data: FamilyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new family group"""
    if current_user.family_id:
        raise HTTPException(status_code=400, detail="Already in a family")

    family = Family(
        name=family_data.name,
        invite_code=generate_invite_code()
    )
    db.add(family)
    await db.flush()

    current_user.family_id = family.id
    current_user.is_family_admin = True

    await db.commit()
    await db.refresh(family)

    return FamilyResponse(
        id=family.id,
        name=family.name,
        invite_code=family.invite_code,
        member_count=1
    )


@router.post("/join")
async def join_family(
    invite_code: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Join a family using invite code"""
    if current_user.family_id:
        raise HTTPException(status_code=400, detail="Already in a family")

    result = await db.execute(
        select(Family).where(Family.invite_code == invite_code)
    )
    family = result.scalar_one_or_none()

    if not family:
        raise HTTPException(status_code=404, detail="Invalid invite code")

    current_user.family_id = family.id
    current_user.is_family_admin = False

    await db.commit()

    return {"message": f"Joined family: {family.name}"}


@router.get("/members", response_model=List[UserResponse])
async def get_family_members(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all family members"""
    if not current_user.family_id:
        raise HTTPException(status_code=400, detail="Not in a family")

    result = await db.execute(
        select(User).where(User.family_id == current_user.family_id)
    )
    return result.scalars().all()


@router.get("/info", response_model=FamilyResponse)
async def get_family_info(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get family information"""
    if not current_user.family_id:
        raise HTTPException(status_code=400, detail="Not in a family")

    result = await db.execute(
        select(Family).where(Family.id == current_user.family_id)
    )
    family = result.scalar_one_or_none()

    # Count members
    member_result = await db.execute(
        select(User).where(User.family_id == current_user.family_id)
    )
    member_count = len(member_result.scalars().all())

    return FamilyResponse(
        id=family.id,
        name=family.name,
        invite_code=family.invite_code if current_user.is_family_admin else "****",
        member_count=member_count
    )


@router.post("/leave")
async def leave_family(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Leave current family"""
    if not current_user.family_id:
        raise HTTPException(status_code=400, detail="Not in a family")

    family_id = current_user.family_id

    # Check if admin and last member
    result = await db.execute(
        select(User).where(User.family_id == family_id)
    )
    members = result.scalars().all()

    if len(members) == 1:
        # Delete family
        family_result = await db.execute(
            select(Family).where(Family.id == family_id)
        )
        family = family_result.scalar_one()
        await db.delete(family)

    elif current_user.is_family_admin:
        # Transfer admin to another member
        for member in members:
            if member.id != current_user.id:
                member.is_family_admin = True
                break

    current_user.family_id = None
    current_user.is_family_admin = False

    await db.commit()

    return {"message": "Left family"}


@router.post("/shopping-list/add")
async def add_to_shared_shopping_list(
    item: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add item to shared family shopping list"""
    if not current_user.family_id:
        raise HTTPException(status_code=400, detail="Not in a family")

    result = await db.execute(
        select(Family).where(Family.id == current_user.family_id)
    )
    family = result.scalar_one()

    shopping_list = family.shared_shopping_list or []
    shopping_list.append({
        "item": item,
        "added_by": current_user.name,
        "added_at": __import__("datetime").datetime.utcnow().isoformat()
    })
    family.shared_shopping_list = shopping_list

    await db.commit()

    return {"message": "Item added", "list": shopping_list}


@router.get("/shopping-list")
async def get_shared_shopping_list(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get shared family shopping list"""
    if not current_user.family_id:
        raise HTTPException(status_code=400, detail="Not in a family")

    result = await db.execute(
        select(Family).where(Family.id == current_user.family_id)
    )
    family = result.scalar_one()

    return {"list": family.shared_shopping_list or []}
