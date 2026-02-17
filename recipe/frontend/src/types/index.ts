export interface User {
  id: number;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  diet_type?: string;
  goal?: string;
  daily_calories?: number;
  daily_protein?: number;
  daily_carbs?: number;
  daily_fat?: number;
  streak_days: number;
  total_points: number;
  badges: string[];
  created_at: string;
}

export interface MealLog {
  id: number;
  meal_type: string;
  food_name: string;
  portion_size: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  image_url?: string;
  ai_recognized: boolean;
  logged_at: string;
}

export interface NutritionSummary {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  goal_calories: number;
  goal_protein: number;
  goal_carbs: number;
  goal_fat: number;
  completion_percentage: number;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  cuisine?: string;
  tags: string[];
  nutrition: NutritionInfo;
  image_url?: string;
  estimated_cost?: number;
  rating?: number;
  created_at: string;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface PantryItem {
  id: number;
  ingredient_name: string;
  quantity?: number;
  unit?: string;
  expiry_date?: string;
  category?: string;
}

export interface MealPlan {
  id: number;
  week_start: string;
  plan: {
    [day: string]: {
      breakfast?: string;
      lunch?: string;
      dinner?: string;
      snacks?: string[];
    };
  };
  is_approved: boolean;
}

export interface Family {
  id: number;
  name: string;
  invite_code: string;
  member_count: number;
}

export interface ShoppingListItem {
  ingredient_name: string;
  total_quantity: number;
  unit: string;
  category: string;
  estimated_price?: number;
  in_pantry: boolean;
}
