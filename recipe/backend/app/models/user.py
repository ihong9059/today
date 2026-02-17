from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base


class DietType(str, enum.Enum):
    NONE = "none"
    VEGAN = "vegan"
    VEGETARIAN = "vegetarian"
    KETO = "keto"
    DIABETIC = "diabetic"
    LOW_CARB = "low_carb"
    LOW_FAT = "low_fat"
    HALAL = "halal"
    KOSHER = "kosher"


class GoalType(str, enum.Enum):
    WEIGHT_LOSS = "weight_loss"
    WEIGHT_GAIN = "weight_gain"
    MUSCLE_GAIN = "muscle_gain"
    MAINTENANCE = "maintenance"
    HEALTH_IMPROVEMENT = "health_improvement"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)

    # Physical info
    age = Column(Integer)
    weight = Column(Float)  # kg
    height = Column(Float)  # cm
    gender = Column(String(20))
    activity_level = Column(String(50))  # sedentary, light, moderate, active, very_active

    # Diet preferences
    diet_type = Column(SQLEnum(DietType), default=DietType.NONE)
    goal = Column(SQLEnum(GoalType), default=GoalType.MAINTENANCE)
    allergies = Column(JSON, default=list)  # ["peanuts", "shellfish"]
    disliked_foods = Column(JSON, default=list)
    budget_per_meal = Column(Float)  # in KRW or USD

    # Calculated values
    daily_calories = Column(Integer)
    daily_protein = Column(Float)
    daily_carbs = Column(Float)
    daily_fat = Column(Float)

    # Gamification
    streak_days = Column(Integer, default=0)
    total_points = Column(Integer, default=0)
    badges = Column(JSON, default=list)

    # Family/Group
    family_id = Column(Integer, ForeignKey("families.id"), nullable=True)
    is_family_admin = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)

    # Relationships
    family = relationship("Family", back_populates="members")
    meal_logs = relationship("MealLog", back_populates="user")
    meal_plans = relationship("MealPlan", back_populates="user")
    pantry_items = relationship("PantryItem", back_populates="user")


class Family(Base):
    __tablename__ = "families"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    invite_code = Column(String(20), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    members = relationship("User", back_populates="family")
    shared_shopping_list = Column(JSON, default=list)


class MealLog(Base):
    __tablename__ = "meal_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    meal_type = Column(String(20))  # breakfast, lunch, dinner, snack
    food_name = Column(String(255), nullable=False)
    portion_size = Column(Float, default=1.0)

    # Nutrition
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    fiber = Column(Float)
    sodium = Column(Float)

    # Image
    image_url = Column(String(500))
    ai_recognized = Column(Boolean, default=False)

    # Timestamps
    logged_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="meal_logs")


class MealPlan(Base):
    __tablename__ = "meal_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    week_start = Column(DateTime, nullable=False)
    plan_data = Column(JSON)  # {mon: {breakfast: recipe_id, lunch: ...}, tue: ...}

    is_approved = Column(Boolean, default=False)
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="meal_plans", foreign_keys=[user_id])


class PantryItem(Base):
    __tablename__ = "pantry_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    ingredient_name = Column(String(100), nullable=False)
    quantity = Column(Float)
    unit = Column(String(20))
    expiry_date = Column(DateTime)
    category = Column(String(50))  # dairy, meat, vegetables, etc.

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="pantry_items")
