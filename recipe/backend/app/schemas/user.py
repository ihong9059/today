from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from ..models.user import DietType, GoalType


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserOnboarding(BaseModel):
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    gender: Optional[str] = None
    activity_level: Optional[str] = None
    diet_type: Optional[DietType] = DietType.NONE
    goal: Optional[GoalType] = GoalType.MAINTENANCE
    allergies: Optional[List[str]] = []
    disliked_foods: Optional[List[str]] = []
    budget_per_meal: Optional[float] = None


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    age: Optional[int]
    weight: Optional[float]
    height: Optional[float]
    diet_type: Optional[DietType]
    goal: Optional[GoalType]
    daily_calories: Optional[int]
    streak_days: int
    total_points: int
    badges: List[str]
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


class MealLogCreate(BaseModel):
    meal_type: str  # breakfast, lunch, dinner, snack
    food_name: str
    portion_size: float = 1.0
    calories: Optional[float] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None


class MealLogResponse(BaseModel):
    id: int
    meal_type: str
    food_name: str
    portion_size: float
    calories: Optional[float]
    protein: Optional[float]
    carbs: Optional[float]
    fat: Optional[float]
    image_url: Optional[str]
    ai_recognized: bool
    logged_at: datetime

    class Config:
        from_attributes = True


class PantryItemCreate(BaseModel):
    ingredient_name: str
    quantity: Optional[float] = None
    unit: Optional[str] = None
    expiry_date: Optional[datetime] = None
    category: Optional[str] = None


class PantryItemResponse(BaseModel):
    id: int
    ingredient_name: str
    quantity: Optional[float]
    unit: Optional[str]
    expiry_date: Optional[datetime]
    category: Optional[str]

    class Config:
        from_attributes = True


class FamilyCreate(BaseModel):
    name: str


class FamilyResponse(BaseModel):
    id: int
    name: str
    invite_code: str
    member_count: int

    class Config:
        from_attributes = True


class NutritionSummary(BaseModel):
    date: datetime
    total_calories: float
    total_protein: float
    total_carbs: float
    total_fat: float
    goal_calories: int
    goal_protein: float
    goal_carbs: float
    goal_fat: float
    completion_percentage: float
