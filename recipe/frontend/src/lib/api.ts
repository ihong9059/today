import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post("/auth/register", data),
  login: (email: string, password: string) =>
    api.post("/auth/login", new URLSearchParams({ username: email, password }), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  onboarding: (data: object) => api.post("/auth/onboarding", data),
  getMe: () => api.get("/auth/me"),
};

// Meals API
export const mealsApi = {
  logMeal: (data: object) => api.post("/meals/log", data),
  logMealWithImage: (formData: FormData) =>
    api.post("/meals/log/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  logMealWithText: (text: string, mealType: string) =>
    api.post(`/meals/log/text?text=${encodeURIComponent(text)}&meal_type=${mealType}`),
  getTodayMeals: () => api.get("/meals/today"),
  getTodaySummary: () => api.get("/meals/summary/today"),
  getHistory: (days: number = 7) => api.get(`/meals/history?days=${days}`),
};

// Recipes API
export const recipesApi = {
  getAll: (params?: object) => api.get("/recipes", { params }),
  search: (query: string) => api.get(`/recipes/search?q=${query}`),
  byIngredients: (ingredients: string[]) =>
    api.get(`/recipes/by-ingredients?ingredients=${ingredients.join(",")}`),
  getOne: (id: string) => api.get(`/recipes/${id}`),
  create: (data: object) => api.post("/recipes", data),
  rate: (id: string, rating: number) =>
    api.post(`/recipes/${id}/rate?rating=${rating}`),
};

// Meal Plans API
export const mealPlansApi = {
  generate: (data: object) => api.post("/meal-plans/generate", data),
  save: (data: object) => api.post("/meal-plans/save", data),
  getCurrent: () => api.get("/meal-plans/current"),
  approve: (planId: number) => api.post(`/meal-plans/${planId}/approve`),
  getShoppingList: (planId: number) => api.get(`/meal-plans/${planId}/shopping-list`),
};

// Pantry API
export const pantryApi = {
  getAll: () => api.get("/pantry"),
  getExpiring: (days: number = 3) => api.get(`/pantry/expiring?days=${days}`),
  add: (data: object) => api.post("/pantry", data),
  update: (id: number, data: object) => api.put(`/pantry/${id}`, data),
  delete: (id: number) => api.delete(`/pantry/${id}`),
  use: (id: number, amount: number) => api.post(`/pantry/use/${id}?amount=${amount}`),
};

// Family API
export const familyApi = {
  create: (name: string) => api.post("/family/create", { name }),
  join: (code: string) => api.post(`/family/join?invite_code=${code}`),
  getMembers: () => api.get("/family/members"),
  getInfo: () => api.get("/family/info"),
  leave: () => api.post("/family/leave"),
  addToShoppingList: (item: string) =>
    api.post(`/family/shopping-list/add?item=${item}`),
  getShoppingList: () => api.get("/family/shopping-list"),
};
