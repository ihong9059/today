from fastapi import APIRouter
from .endpoints import (
    auth_router,
    meals_router,
    recipes_router,
    meal_plans_router,
    pantry_router,
    family_router
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(meals_router)
api_router.include_router(recipes_router)
api_router.include_router(meal_plans_router)
api_router.include_router(pantry_router)
api_router.include_router(family_router)
