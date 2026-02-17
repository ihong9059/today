from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class Ingredient(BaseModel):
    name: str
    amount: float
    unit: str
    calories: Optional[float] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None


class NutritionInfo(BaseModel):
    calories: float
    protein: float
    carbs: float
    fat: float
    fiber: Optional[float] = None
    sodium: Optional[float] = None


class RecipeCreate(BaseModel):
    name: str
    description: Optional[str] = None
    ingredients: List[Ingredient]
    instructions: List[str]
    prep_time: int  # minutes
    cook_time: int  # minutes
    servings: int
    difficulty: str  # easy, medium, hard
    cuisine: Optional[str] = None
    tags: List[str] = []
    image_url: Optional[str] = None
    estimated_cost: Optional[float] = None


class RecipeResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    ingredients: List[Ingredient]
    instructions: List[str]
    prep_time: int
    cook_time: int
    servings: int
    difficulty: str
    cuisine: Optional[str]
    tags: List[str]
    nutrition: NutritionInfo
    image_url: Optional[str]
    estimated_cost: Optional[float]
    rating: Optional[float]
    created_at: datetime


class MealPlanDay(BaseModel):
    breakfast: Optional[str] = None  # recipe_id
    lunch: Optional[str] = None
    dinner: Optional[str] = None
    snacks: List[str] = []


class MealPlanCreate(BaseModel):
    week_start: datetime
    monday: MealPlanDay
    tuesday: MealPlanDay
    wednesday: MealPlanDay
    thursday: MealPlanDay
    friday: MealPlanDay
    saturday: MealPlanDay
    sunday: MealPlanDay


class MealPlanGenerateRequest(BaseModel):
    preferences: Optional[str] = None  # "more protein", "cheaper options"
    use_pantry: bool = True
    budget_limit: Optional[float] = None


class ShoppingListItem(BaseModel):
    ingredient_name: str
    total_quantity: float
    unit: str
    category: str
    estimated_price: Optional[float] = None
    in_pantry: bool = False


class ShoppingListResponse(BaseModel):
    items: List[ShoppingListItem]
    total_estimated_cost: float
    organized_by_aisle: dict  # {produce: [...], dairy: [...]}
