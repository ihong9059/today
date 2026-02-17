import httpx
from typing import Optional, List, Dict
from ..core.config import settings


class NutritionService:
    """Service for fetching nutrition data from external APIs"""

    def __init__(self):
        self.usda_key = settings.USDA_API_KEY
        self.spoonacular_key = settings.SPOONACULAR_API_KEY
        self.korea_key = settings.FOOD_SAFETY_KOREA_API_KEY

    async def search_food_usda(self, query: str, page_size: int = 10) -> List[Dict]:
        """Search USDA FoodData Central"""
        if not self.usda_key:
            return []

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.nal.usda.gov/fdc/v1/foods/search",
                params={
                    "api_key": self.usda_key,
                    "query": query,
                    "pageSize": page_size,
                    "dataType": ["Survey (FNDDS)", "Foundation", "SR Legacy"]
                },
                timeout=15.0
            )

            if response.status_code == 200:
                data = response.json()
                foods = []
                for food in data.get("foods", []):
                    nutrients = {n["nutrientName"]: n["value"] for n in food.get("foodNutrients", [])}
                    foods.append({
                        "fdc_id": food["fdcId"],
                        "name": food["description"],
                        "brand": food.get("brandOwner"),
                        "calories": nutrients.get("Energy", 0),
                        "protein": nutrients.get("Protein", 0),
                        "carbs": nutrients.get("Carbohydrate, by difference", 0),
                        "fat": nutrients.get("Total lipid (fat)", 0),
                        "fiber": nutrients.get("Fiber, total dietary", 0),
                        "serving_size": food.get("servingSize"),
                        "serving_unit": food.get("servingSizeUnit")
                    })
                return foods
            return []

    async def search_food_korea(self, query: str) -> List[Dict]:
        """Search Korean Food Safety API (식품안전나라)"""
        if not self.korea_key:
            return []

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://openapi.foodsafetykorea.go.kr/api",
                params={
                    "serviceKey": self.korea_key,
                    "serviceId": "I2790",
                    "dataType": "json",
                    "startIdx": "1",
                    "endIdx": "20",
                    "DESC_KOR": query
                },
                timeout=15.0
            )

            if response.status_code == 200:
                data = response.json()
                foods = []
                items = data.get("I2790", {}).get("row", [])
                for item in items:
                    foods.append({
                        "name": item.get("DESC_KOR"),
                        "food_group": item.get("GROUP_NAME"),
                        "calories": float(item.get("NUTR_CONT1", 0) or 0),
                        "carbs": float(item.get("NUTR_CONT2", 0) or 0),
                        "protein": float(item.get("NUTR_CONT3", 0) or 0),
                        "fat": float(item.get("NUTR_CONT4", 0) or 0),
                        "sodium": float(item.get("NUTR_CONT6", 0) or 0),
                        "serving_size": item.get("SERVING_SIZE"),
                        "maker": item.get("MAKER_NAME")
                    })
                return foods
            return []

    async def get_recipe_nutrition(self, ingredients: List[Dict]) -> Dict:
        """Calculate total nutrition for a recipe"""
        if not self.spoonacular_key:
            # Fallback: simple calculation from provided values
            total = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0}
            for ing in ingredients:
                total["calories"] += ing.get("calories", 0) or 0
                total["protein"] += ing.get("protein", 0) or 0
                total["carbs"] += ing.get("carbs", 0) or 0
                total["fat"] += ing.get("fat", 0) or 0
            return total

        ingredient_list = "\n".join([
            f"{ing['amount']} {ing['unit']} {ing['name']}"
            for ing in ingredients
        ])

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.spoonacular.com/recipes/parseIngredients",
                params={"apiKey": self.spoonacular_key},
                data={
                    "ingredientList": ingredient_list,
                    "servings": 1,
                    "includeNutrition": True
                },
                timeout=15.0
            )

            if response.status_code == 200:
                data = response.json()
                total = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0}
                for item in data:
                    nutrition = item.get("nutrition", {})
                    for nutrient in nutrition.get("nutrients", []):
                        name = nutrient["name"].lower()
                        if "calories" in name:
                            total["calories"] += nutrient["amount"]
                        elif name == "protein":
                            total["protein"] += nutrient["amount"]
                        elif "carbohydrate" in name:
                            total["carbs"] += nutrient["amount"]
                        elif name == "fat":
                            total["fat"] += nutrient["amount"]
                        elif "fiber" in name:
                            total["fiber"] += nutrient["amount"]
                return total
            return {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0}

    def calculate_daily_needs(
        self,
        weight: float,
        height: float,
        age: int,
        gender: str,
        activity_level: str,
        goal: str
    ) -> Dict:
        """Calculate daily nutritional needs using Mifflin-St Jeor equation"""
        # BMR calculation
        if gender.lower() == "male":
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height - 5 * age - 161

        # Activity multiplier
        activity_multipliers = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very_active": 1.9
        }
        tdee = bmr * activity_multipliers.get(activity_level, 1.55)

        # Goal adjustment
        if goal == "weight_loss":
            calories = tdee - 500
        elif goal == "weight_gain" or goal == "muscle_gain":
            calories = tdee + 300
        else:
            calories = tdee

        # Macro distribution
        protein = weight * 1.6 if goal == "muscle_gain" else weight * 1.2
        fat = calories * 0.25 / 9
        carbs = (calories - (protein * 4) - (fat * 9)) / 4

        return {
            "daily_calories": int(calories),
            "daily_protein": round(protein, 1),
            "daily_carbs": round(carbs, 1),
            "daily_fat": round(fat, 1)
        }


nutrition_service = NutritionService()
