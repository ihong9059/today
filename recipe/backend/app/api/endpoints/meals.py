from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from datetime import datetime, timedelta
from typing import Optional, List

from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User, MealLog
from ...schemas.user import MealLogCreate, MealLogResponse, NutritionSummary
from ...services.ai_service import ai_service

router = APIRouter(prefix="/meals", tags=["Meal Tracking"])


@router.post("/log", response_model=MealLogResponse)
async def log_meal(
    meal_data: MealLogCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Log a meal manually"""
    meal_log = MealLog(
        user_id=current_user.id,
        meal_type=meal_data.meal_type,
        food_name=meal_data.food_name,
        portion_size=meal_data.portion_size,
        calories=meal_data.calories,
        protein=meal_data.protein,
        carbs=meal_data.carbs,
        fat=meal_data.fat,
        ai_recognized=False
    )
    db.add(meal_log)

    # Update streak
    await _update_streak(current_user, db)

    await db.commit()
    await db.refresh(meal_log)

    return meal_log


@router.post("/log/image", response_model=MealLogResponse)
async def log_meal_with_image(
    image: UploadFile = File(...),
    meal_type: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Log a meal using image recognition"""
    image_data = await image.read()

    # AI analysis
    analysis = await ai_service.analyze_food_image(image_data)

    if "error" in analysis:
        raise HTTPException(status_code=500, detail=analysis["error"])

    meal_log = MealLog(
        user_id=current_user.id,
        meal_type=meal_type,
        food_name=analysis.get("food_name_ko", analysis.get("food_name_en", "Unknown")),
        portion_size=1.0,
        calories=analysis.get("calories"),
        protein=analysis.get("protein"),
        carbs=analysis.get("carbs"),
        fat=analysis.get("fat"),
        ai_recognized=True
    )
    db.add(meal_log)

    # Update streak
    await _update_streak(current_user, db)

    await db.commit()
    await db.refresh(meal_log)

    return meal_log


@router.post("/log/text", response_model=List[MealLogResponse])
async def log_meal_with_text(
    text: str,
    meal_type: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Log meals using natural language description"""
    analysis = await ai_service.parse_natural_language_meal(text)

    if "error" in analysis:
        raise HTTPException(status_code=500, detail=analysis["error"])

    foods = analysis.get("foods", [])
    meal_logs = []

    for food in foods:
        meal_log = MealLog(
            user_id=current_user.id,
            meal_type=meal_type,
            food_name=food.get("food_name", "Unknown"),
            portion_size=food.get("portion_size", 1.0),
            calories=food.get("calories"),
            protein=food.get("protein"),
            carbs=food.get("carbs"),
            fat=food.get("fat"),
            ai_recognized=True
        )
        db.add(meal_log)
        meal_logs.append(meal_log)

    # Update streak
    await _update_streak(current_user, db)

    await db.commit()

    for log in meal_logs:
        await db.refresh(log)

    return meal_logs


@router.get("/today", response_model=List[MealLogResponse])
async def get_today_meals(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all meals logged today"""
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    result = await db.execute(
        select(MealLog)
        .where(and_(
            MealLog.user_id == current_user.id,
            MealLog.logged_at >= today_start,
            MealLog.logged_at < today_end
        ))
        .order_by(MealLog.logged_at)
    )
    return result.scalars().all()


@router.get("/summary/today", response_model=NutritionSummary)
async def get_today_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get nutrition summary for today"""
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    result = await db.execute(
        select(MealLog)
        .where(and_(
            MealLog.user_id == current_user.id,
            MealLog.logged_at >= today_start,
            MealLog.logged_at < today_end
        ))
    )
    meals = result.scalars().all()

    total_calories = sum(m.calories or 0 for m in meals)
    total_protein = sum(m.protein or 0 for m in meals)
    total_carbs = sum(m.carbs or 0 for m in meals)
    total_fat = sum(m.fat or 0 for m in meals)

    goal_calories = current_user.daily_calories or 2000
    completion = (total_calories / goal_calories * 100) if goal_calories > 0 else 0

    return NutritionSummary(
        date=today_start,
        total_calories=total_calories,
        total_protein=total_protein,
        total_carbs=total_carbs,
        total_fat=total_fat,
        goal_calories=goal_calories,
        goal_protein=current_user.daily_protein or 60,
        goal_carbs=current_user.daily_carbs or 250,
        goal_fat=current_user.daily_fat or 65,
        completion_percentage=min(completion, 100)
    )


@router.get("/history", response_model=List[MealLogResponse])
async def get_meal_history(
    days: int = 7,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get meal history for past N days"""
    start_date = datetime.utcnow() - timedelta(days=days)

    result = await db.execute(
        select(MealLog)
        .where(and_(
            MealLog.user_id == current_user.id,
            MealLog.logged_at >= start_date
        ))
        .order_by(MealLog.logged_at.desc())
    )
    return result.scalars().all()


async def _update_streak(user: User, db: AsyncSession):
    """Update user's logging streak"""
    yesterday = datetime.utcnow().date() - timedelta(days=1)
    today = datetime.utcnow().date()

    # Check if logged yesterday
    result = await db.execute(
        select(MealLog)
        .where(and_(
            MealLog.user_id == user.id,
            MealLog.logged_at >= datetime.combine(yesterday, datetime.min.time()),
            MealLog.logged_at < datetime.combine(today, datetime.min.time())
        ))
        .limit(1)
    )
    logged_yesterday = result.scalar_one_or_none()

    if logged_yesterday:
        user.streak_days += 1
    else:
        user.streak_days = 1

    # Award points
    user.total_points += 10

    # Check for badges
    if user.streak_days == 7 and "week_warrior" not in (user.badges or []):
        user.badges = (user.badges or []) + ["week_warrior"]
        user.total_points += 50
    elif user.streak_days == 30 and "month_master" not in (user.badges or []):
        user.badges = (user.badges or []) + ["month_master"]
        user.total_points += 200
