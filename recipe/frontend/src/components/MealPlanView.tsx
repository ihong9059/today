"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mealPlansApi } from "@/lib/api";
import { useStore } from "@/store/useStore";
import {
  Calendar,
  RefreshCw,
  ShoppingCart,
  Check,
  ChefHat,
} from "lucide-react";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

interface MealData {
  name: string;
  calories: number;
  prep_time: number;
}

export function MealPlanView() {
  const { currentPlan, setCurrentPlan } = useStore();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  async function fetchCurrentPlan() {
    setLoading(true);
    try {
      const response = await mealPlansApi.getCurrent();
      if (response.data.plan) {
        setCurrentPlan(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch meal plan:", error);
    } finally {
      setLoading(false);
    }
  }

  async function generatePlan() {
    setGenerating(true);
    try {
      const response = await mealPlansApi.generate({
        use_pantry: true,
        preferences: null,
      });
      // Save the generated plan
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1);

      await mealPlansApi.save({
        week_start: monday.toISOString(),
        ...Object.fromEntries(
          DAY_KEYS.map((day) => [day, response.data[day] || {}])
        ),
      });
      await fetchCurrentPlan();
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500" />
      </div>
    );
  }

  const dayPlan = currentPlan?.plan?.[DAY_KEYS[selectedDay]] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">주간 식단</h1>
        <Button
          variant="cta"
          onClick={generatePlan}
          disabled={generating}
          className="gap-2"
        >
          {generating ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <ChefHat className="h-4 w-4" />
          )}
          AI 식단 생성
        </Button>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2">
        {DAYS.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              selectedDay === index
                ? "bg-sage-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {!currentPlan ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">아직 생성된 식단이 없습니다</p>
            <Button variant="cta" onClick={generatePlan} disabled={generating}>
              {generating ? "생성 중..." : "AI로 식단 생성하기"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Meal Cards */}
          <div className="space-y-4">
            {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
              const meal = dayPlan[mealType] as MealData | undefined;
              const labels = {
                breakfast: "아침",
                lunch: "점심",
                dinner: "저녁",
              };

              return (
                <Card key={mealType}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{labels[mealType]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {meal ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">{meal.name}</p>
                          <div className="flex gap-4 text-sm text-gray-500 mt-1">
                            <span>{meal.calories} kcal</span>
                            <span>{meal.prep_time}분</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          레시피 보기
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-400">식단 없음</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              장바구니 생성
            </Button>
            <Button variant="default" className="gap-2">
              <Check className="h-4 w-4" />
              식단 확정
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
