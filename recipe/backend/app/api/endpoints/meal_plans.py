from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from typing import List

from ...core.database import get_db, get_mongo_db
from ...core.security import get_current_user
from ...models.user import User, MealPlan, PantryItem
from ...schemas.recipe import (
    MealPlanCreate, MealPlanGenerateRequest,
    ShoppingListItem, ShoppingListResponse
)
from ...services.ai_service import ai_service

router = APIRouter(prefix="/meal-plans", tags=["Meal Planning"])


@router.post("/generate")
async def generate_meal_plan(
    request: MealPlanGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Generate AI-powered weekly meal plan"""
    # Get pantry items if requested
    pantry_items = []
    if request.use_pantry:
        result = await db.execute(
            select(PantryItem).where(PantryItem.user_id == current_user.id)
        )
        pantry_items = [item.ingredient_name for item in result.scalars().all()]

    # Build user profile for AI
    user_profile = {
        "daily_calories": current_user.daily_calories,
        "diet_type": current_user.diet_type.value if current_user.diet_type else "none",
        "goal": current_user.goal.value if current_user.goal else "maintenance",
        "allergies": current_user.allergies or [],
        "disliked_foods": current_user.disliked_foods or [],
        "budget_per_meal": request.budget_limit or current_user.budget_per_meal or 10000
    }

    # Generate plan with AI
    plan = await ai_service.generate_meal_plan(
        user_profile=user_profile,
        pantry_items=pantry_items,
        preferences=request.preferences
    )

    if "error" in plan:
        raise HTTPException(status_code=500, detail=plan["error"])

    return plan


@router.post("/save")
async def save_meal_plan(
    plan_data: MealPlanCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Save a meal plan"""
    meal_plan = MealPlan(
        user_id=current_user.id,
        week_start=plan_data.week_start,
        plan_data={
            "monday": plan_data.monday.model_dump(),
            "tuesday": plan_data.tuesday.model_dump(),
            "wednesday": plan_data.wednesday.model_dump(),
            "thursday": plan_data.thursday.model_dump(),
            "friday": plan_data.friday.model_dump(),
            "saturday": plan_data.saturday.model_dump(),
            "sunday": plan_data.sunday.model_dump()
        },
        is_approved=False
    )
    db.add(meal_plan)
    await db.commit()
    await db.refresh(meal_plan)

    # Award points for planning
    current_user.total_points += 25
    await db.commit()

    return {"message": "Meal plan saved", "plan_id": meal_plan.id}


@router.get("/current")
async def get_current_meal_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get the current week's meal plan"""
    # Find the most recent plan
    result = await db.execute(
        select(MealPlan)
        .where(MealPlan.user_id == current_user.id)
        .order_by(MealPlan.week_start.desc())
        .limit(1)
    )
    plan = result.scalar_one_or_none()

    if not plan:
        return {"message": "No meal plan found"}

    return {
        "id": plan.id,
        "week_start": plan.week_start,
        "plan": plan.plan_data,
        "is_approved": plan.is_approved
    }


@router.post("/{plan_id}/approve")
async def approve_meal_plan(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Approve a meal plan (for family admin feature)"""
    result = await db.execute(
        select(MealPlan).where(MealPlan.id == plan_id)
    )
    plan = result.scalar_one_or_none()

    if not plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")

    # Check permissions (owner or family admin)
    if plan.user_id != current_user.id:
        if not current_user.is_family_admin or current_user.family_id != plan.user_id:
            raise HTTPException(status_code=403, detail="Not authorized")

    plan.is_approved = True
    plan.approved_by = current_user.id
    await db.commit()

    return {"message": "Meal plan approved"}


@router.get("/{plan_id}/shopping-list", response_model=ShoppingListResponse)
async def generate_shopping_list(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Generate shopping list from meal plan"""
    mongo_db = get_mongo_db()

    result = await db.execute(
        select(MealPlan).where(MealPlan.id == plan_id)
    )
    plan = result.scalar_one_or_none()

    if not plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")

    # Get pantry items
    pantry_result = await db.execute(
        select(PantryItem).where(PantryItem.user_id == current_user.id)
    )
    pantry = {item.ingredient_name.lower(): item for item in pantry_result.scalars().all()}

    # Collect all recipe IDs from plan
    recipe_ids = []
    for day_data in plan.plan_data.values():
        if isinstance(day_data, dict):
            for meal in ["breakfast", "lunch", "dinner"]:
                if day_data.get(meal):
                    recipe_ids.append(day_data[meal])
            recipe_ids.extend(day_data.get("snacks", []))

    # Get recipes and aggregate ingredients
    ingredient_totals = {}
    from bson import ObjectId

    for recipe_id in recipe_ids:
        if not recipe_id:
            continue
        try:
            recipe = await mongo_db.recipes.find_one({"_id": ObjectId(recipe_id)})
            if recipe:
                for ing in recipe.get("ingredients", []):
                    name = ing["name"].lower()
                    if name not in ingredient_totals:
                        ingredient_totals[name] = {
                            "ingredient_name": ing["name"],
                            "total_quantity": 0,
                            "unit": ing.get("unit", ""),
                            "category": _categorize_ingredient(ing["name"]),
                            "estimated_price": None,
                            "in_pantry": name in pantry
                        }
                    ingredient_totals[name]["total_quantity"] += ing.get("amount", 0)
        except:
            continue

    # Organize by aisle/category
    items = list(ingredient_totals.values())
    organized = {}
    for item in items:
        cat = item["category"]
        if cat not in organized:
            organized[cat] = []
        organized[cat].append(item)

    return ShoppingListResponse(
        items=[ShoppingListItem(**item) for item in items],
        total_estimated_cost=0,  # Would need pricing API
        organized_by_aisle=organized
    )


def _categorize_ingredient(name: str) -> str:
    """Categorize ingredient for shopping list organization"""
    name_lower = name.lower()

    categories = {
        "produce": ["lettuce", "tomato", "onion", "garlic", "pepper", "carrot", "potato", "apple", "banana", "양파", "마늘", "당근", "감자", "배추", "시금치"],
        "dairy": ["milk", "cheese", "yogurt", "butter", "cream", "우유", "치즈", "버터", "요거트"],
        "meat": ["chicken", "beef", "pork", "lamb", "turkey", "닭", "소고기", "돼지고기"],
        "seafood": ["fish", "salmon", "shrimp", "tuna", "생선", "새우", "연어"],
        "grains": ["rice", "pasta", "bread", "flour", "oats", "쌀", "밀가루", "빵"],
        "canned": ["beans", "tomato sauce", "soup", "통조림"],
        "frozen": ["frozen", "ice cream", "냉동"],
        "condiments": ["salt", "pepper", "sauce", "oil", "vinegar", "소금", "간장", "고추장", "식초"],
        "snacks": ["chips", "cookies", "crackers", "과자"],
        "beverages": ["juice", "soda", "water", "tea", "coffee", "주스", "차", "커피"]
    }

    for category, keywords in categories.items():
        if any(kw in name_lower for kw in keywords):
            return category

    return "other"
