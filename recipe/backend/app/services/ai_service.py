import base64
import httpx
from typing import Optional, List, Dict
from ..core.config import settings


class AIService:
    """AI service for food recognition and natural language processing"""

    def __init__(self):
        self.openai_key = settings.OPENAI_API_KEY
        self.google_key = settings.GOOGLE_AI_API_KEY

    async def analyze_food_image(self, image_data: bytes) -> Dict:
        """Analyze food image and return nutrition estimates"""
        if not self.openai_key:
            return {"error": "OpenAI API key not configured"}

        base64_image = base64.b64encode(image_data).decode("utf-8")

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4-vision-preview",
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": """Analyze this food image and provide:
1. Food name (in Korean and English)
2. Estimated portion size
3. Nutritional estimates per portion:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g)
   - Fat (g)
   - Fiber (g)

Return as JSON format:
{
    "food_name_ko": "...",
    "food_name_en": "...",
    "portion_size": "1 serving",
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0,
    "confidence": 0.0
}"""
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/jpeg;base64,{base64_image}"
                                    }
                                }
                            ]
                        }
                    ],
                    "max_tokens": 500
                },
                timeout=30.0
            )

            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                import json
                try:
                    return json.loads(content)
                except:
                    return {"raw_response": content}
            else:
                return {"error": f"API error: {response.status_code}"}

    async def parse_natural_language_meal(self, text: str) -> Dict:
        """Parse natural language meal description into structured data"""
        if not self.openai_key:
            return {"error": "OpenAI API key not configured"}

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4-turbo-preview",
                    "messages": [
                        {
                            "role": "system",
                            "content": """You are a nutrition expert. Parse meal descriptions and return structured JSON.
Always respond with valid JSON only, no markdown formatting."""
                        },
                        {
                            "role": "user",
                            "content": f"""Parse this meal description: "{text}"

Return JSON array:
[
  {{
    "food_name": "...",
    "portion_size": 1.0,
    "unit": "serving/piece/gram/ml",
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0
  }}
]"""
                        }
                    ],
                    "max_tokens": 500
                },
                timeout=30.0
            )

            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                import json
                try:
                    return {"foods": json.loads(content)}
                except:
                    return {"raw_response": content}
            else:
                return {"error": f"API error: {response.status_code}"}

    async def generate_meal_plan(
        self,
        user_profile: Dict,
        pantry_items: List[str],
        preferences: Optional[str] = None
    ) -> Dict:
        """Generate personalized weekly meal plan"""
        if not self.openai_key:
            return {"error": "OpenAI API key not configured"}

        prompt = f"""Create a 7-day meal plan for this user:

Profile:
- Daily calories target: {user_profile.get('daily_calories', 2000)} kcal
- Diet type: {user_profile.get('diet_type', 'none')}
- Goal: {user_profile.get('goal', 'maintenance')}
- Allergies: {user_profile.get('allergies', [])}
- Disliked foods: {user_profile.get('disliked_foods', [])}
- Budget per meal: {user_profile.get('budget_per_meal', 10000)} KRW

Available pantry items: {pantry_items}

Additional preferences: {preferences or 'None'}

Generate JSON with this structure:
{{
  "monday": {{
    "breakfast": {{"name": "...", "calories": 0, "prep_time": 0}},
    "lunch": {{"name": "...", "calories": 0, "prep_time": 0}},
    "dinner": {{"name": "...", "calories": 0, "prep_time": 0}}
  }},
  ... (continue for all 7 days)
}}

Prioritize using pantry items to reduce waste."""

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4-turbo-preview",
                    "messages": [
                        {"role": "system", "content": "You are a professional nutritionist and meal planner. Respond with valid JSON only."},
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 2000
                },
                timeout=60.0
            )

            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                import json
                try:
                    return json.loads(content)
                except:
                    return {"raw_response": content}
            else:
                return {"error": f"API error: {response.status_code}"}

    async def suggest_substitutes(
        self,
        ingredient: str,
        reason: str,  # "allergy", "unavailable", "preference"
        dietary_restrictions: List[str]
    ) -> List[Dict]:
        """Suggest ingredient substitutes"""
        if not self.openai_key:
            return []

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4-turbo-preview",
                    "messages": [
                        {
                            "role": "user",
                            "content": f"""Suggest 3 substitutes for "{ingredient}" (reason: {reason}).
Dietary restrictions: {dietary_restrictions}

Return JSON array:
[
  {{
    "name": "...",
    "ratio": "1:1 or specific ratio",
    "notes": "brief cooking tip",
    "nutrition_similarity": 0.0-1.0
  }}
]"""
                        }
                    ],
                    "max_tokens": 300
                },
                timeout=30.0
            )

            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                import json
                try:
                    return json.loads(content)
                except:
                    return []
            return []


ai_service = AIService()
