from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from bson import ObjectId

from ...core.database import get_mongo_db
from ...core.security import get_current_user
from ...models.user import User
from ...schemas.recipe import RecipeCreate, RecipeResponse, Ingredient, NutritionInfo
from ...services.nutrition_service import nutrition_service

router = APIRouter(prefix="/recipes", tags=["Recipes"])


@router.post("/", response_model=RecipeResponse)
async def create_recipe(
    recipe_data: RecipeCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new recipe"""
    db = get_mongo_db()

    # Calculate nutrition
    ingredients_dict = [ing.model_dump() for ing in recipe_data.ingredients]
    nutrition = await nutrition_service.get_recipe_nutrition(ingredients_dict)

    recipe_doc = {
        **recipe_data.model_dump(),
        "nutrition": nutrition,
        "created_by": current_user.id,
        "created_at": __import__("datetime").datetime.utcnow(),
        "rating": None,
        "rating_count": 0
    }

    result = await db.recipes.insert_one(recipe_doc)
    recipe_doc["id"] = str(result.inserted_id)

    return RecipeResponse(**recipe_doc)


@router.get("/", response_model=List[RecipeResponse])
async def get_recipes(
    skip: int = 0,
    limit: int = 20,
    cuisine: Optional[str] = None,
    difficulty: Optional[str] = None,
    max_prep_time: Optional[int] = None,
    tags: Optional[str] = None,  # comma-separated
    current_user: User = Depends(get_current_user)
):
    """Get recipes with filters"""
    db = get_mongo_db()

    query = {}
    if cuisine:
        query["cuisine"] = cuisine
    if difficulty:
        query["difficulty"] = difficulty
    if max_prep_time:
        query["$expr"] = {"$lte": [{"$add": ["$prep_time", "$cook_time"]}, max_prep_time]}
    if tags:
        tag_list = [t.strip() for t in tags.split(",")]
        query["tags"] = {"$in": tag_list}

    cursor = db.recipes.find(query).skip(skip).limit(limit)
    recipes = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        recipes.append(RecipeResponse(**doc))

    return recipes


@router.get("/search", response_model=List[RecipeResponse])
async def search_recipes(
    q: str = Query(..., min_length=2),
    current_user: User = Depends(get_current_user)
):
    """Search recipes by name or ingredients"""
    db = get_mongo_db()

    cursor = db.recipes.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"ingredients.name": {"$regex": q, "$options": "i"}},
            {"tags": {"$regex": q, "$options": "i"}}
        ]
    }).limit(20)

    recipes = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        recipes.append(RecipeResponse(**doc))

    return recipes


@router.get("/by-ingredients", response_model=List[RecipeResponse])
async def get_recipes_by_ingredients(
    ingredients: str = Query(..., description="Comma-separated ingredients"),
    current_user: User = Depends(get_current_user)
):
    """Find recipes that use given ingredients (pantry feature)"""
    db = get_mongo_db()

    ingredient_list = [i.strip().lower() for i in ingredients.split(",")]

    cursor = db.recipes.find({
        "ingredients.name": {
            "$regex": "|".join(ingredient_list),
            "$options": "i"
        }
    }).limit(20)

    recipes = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        # Calculate how many pantry items are used
        recipe_ingredients = [ing["name"].lower() for ing in doc.get("ingredients", [])]
        match_count = sum(1 for pi in ingredient_list if any(pi in ri for ri in recipe_ingredients))
        doc["pantry_match_count"] = match_count
        recipes.append(doc)

    # Sort by most matches
    recipes.sort(key=lambda x: x.get("pantry_match_count", 0), reverse=True)

    return [RecipeResponse(**r) for r in recipes]


@router.get("/{recipe_id}", response_model=RecipeResponse)
async def get_recipe(
    recipe_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get a specific recipe"""
    db = get_mongo_db()

    doc = await db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Recipe not found")

    doc["id"] = str(doc.pop("_id"))
    return RecipeResponse(**doc)


@router.post("/{recipe_id}/rate")
async def rate_recipe(
    recipe_id: str,
    rating: float = Query(..., ge=1, le=5),
    current_user: User = Depends(get_current_user)
):
    """Rate a recipe"""
    db = get_mongo_db()

    doc = await db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Recipe not found")

    current_rating = doc.get("rating") or 0
    rating_count = doc.get("rating_count") or 0

    # Calculate new average
    new_rating = ((current_rating * rating_count) + rating) / (rating_count + 1)

    await db.recipes.update_one(
        {"_id": ObjectId(recipe_id)},
        {"$set": {"rating": new_rating, "rating_count": rating_count + 1}}
    )

    return {"message": "Rating submitted", "new_rating": new_rating}
