import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, NutritionSummary, MealLog, PantryItem, MealPlan } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;

  // Nutrition
  todaySummary: NutritionSummary | null;
  todayMeals: MealLog[];
  setTodaySummary: (summary: NutritionSummary) => void;
  setTodayMeals: (meals: MealLog[]) => void;
  addMeal: (meal: MealLog) => void;

  // Pantry
  pantryItems: PantryItem[];
  setPantryItems: (items: PantryItem[]) => void;
  addPantryItem: (item: PantryItem) => void;
  removePantryItem: (id: number) => void;

  // Meal Plan
  currentPlan: MealPlan | null;
  setCurrentPlan: (plan: MealPlan | null) => void;

  // UI
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => {
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      // Nutrition
      todaySummary: null,
      todayMeals: [],
      setTodaySummary: (summary) => set({ todaySummary: summary }),
      setTodayMeals: (meals) => set({ todayMeals: meals }),
      addMeal: (meal) =>
        set((state) => ({ todayMeals: [...state.todayMeals, meal] })),

      // Pantry
      pantryItems: [],
      setPantryItems: (items) => set({ pantryItems: items }),
      addPantryItem: (item) =>
        set((state) => ({ pantryItems: [...state.pantryItems, item] })),
      removePantryItem: (id) =>
        set((state) => ({
          pantryItems: state.pantryItems.filter((item) => item.id !== id),
        })),

      // Meal Plan
      currentPlan: null,
      setCurrentPlan: (plan) => set({ currentPlan: plan }),

      // UI
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "planit-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
