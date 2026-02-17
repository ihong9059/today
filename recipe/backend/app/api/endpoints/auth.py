from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime

from ...core.database import get_db
from ...core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)
from ...models.user import User
from ...schemas.user import UserCreate, UserResponse, Token, UserOnboarding
from ...services.nutrition_service import nutrition_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    user = User(
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        name=user_data.name
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Update last login
    user.last_login = datetime.utcnow()
    await db.commit()

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/onboarding", response_model=UserResponse)
async def complete_onboarding(
    onboarding_data: UserOnboarding,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Update user profile
    for field, value in onboarding_data.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)

    # Calculate daily nutritional needs
    if all([current_user.weight, current_user.height, current_user.age, current_user.gender]):
        needs = nutrition_service.calculate_daily_needs(
            weight=current_user.weight,
            height=current_user.height,
            age=current_user.age,
            gender=current_user.gender,
            activity_level=current_user.activity_level or "moderate",
            goal=current_user.goal.value if current_user.goal else "maintenance"
        )
        current_user.daily_calories = needs["daily_calories"]
        current_user.daily_protein = needs["daily_protein"]
        current_user.daily_carbs = needs["daily_carbs"]
        current_user.daily_fat = needs["daily_fat"]

    await db.commit()
    await db.refresh(current_user)

    return current_user


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
