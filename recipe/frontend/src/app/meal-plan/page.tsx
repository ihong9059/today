"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Check,
  ChefHat,
  Clock,
  Flame,
} from "lucide-react";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

// Mock 주간 식단 데이터
const mockMealPlan = {
  monday: {
    breakfast: { name: "오트밀과 바나나", calories: 320, prep_time: 10 },
    lunch: { name: "닭가슴살 샐러드", calories: 450, prep_time: 15 },
    dinner: { name: "연어 스테이크와 채소", calories: 550, prep_time: 25 },
  },
  tuesday: {
    breakfast: { name: "그릭 요거트 파르페", calories: 280, prep_time: 5 },
    lunch: { name: "참치 김밥", calories: 420, prep_time: 20 },
    dinner: { name: "소고기 불고기와 현미밥", calories: 580, prep_time: 30 },
  },
  wednesday: {
    breakfast: { name: "아보카도 토스트", calories: 350, prep_time: 10 },
    lunch: { name: "두부 덮밥", calories: 400, prep_time: 15 },
    dinner: { name: "치킨 스테이크", calories: 520, prep_time: 25 },
  },
  thursday: {
    breakfast: { name: "스크램블 에그", calories: 300, prep_time: 10 },
    lunch: { name: "비빔밥", calories: 480, prep_time: 20 },
    dinner: { name: "고등어 구이와 된장찌개", calories: 500, prep_time: 30 },
  },
  friday: {
    breakfast: { name: "스무디 볼", calories: 290, prep_time: 10 },
    lunch: { name: "새우 볶음밥", calories: 450, prep_time: 15 },
    dinner: { name: "돼지갈비찜", calories: 600, prep_time: 40 },
  },
  saturday: {
    breakfast: { name: "팬케이크", calories: 400, prep_time: 20 },
    lunch: { name: "파스타 샐러드", calories: 480, prep_time: 15 },
    dinner: { name: "삼겹살 구이", calories: 650, prep_time: 25 },
  },
  sunday: {
    breakfast: { name: "브런치 플레이트", calories: 450, prep_time: 25 },
    lunch: { name: "칼국수", calories: 420, prep_time: 20 },
    dinner: { name: "치킨 카레", calories: 550, prep_time: 30 },
  },
};

const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

// 레시피 이름을 URL-safe ID로 변환
const recipeNameToId: Record<string, string> = {
  "오트밀과 바나나": "oatmeal-banana",
  "닭가슴살 샐러드": "chicken-salad",
  "연어 스테이크와 채소": "salmon-steak",
  "소고기 불고기와 현미밥": "bulgogi-rice",
  "그릭 요거트 파르페": "greek-yogurt",
  "참치 김밥": "tuna-kimbap",
  "아보카도 토스트": "avocado-toast",
  "두부 덮밥": "tofu-bowl",
  "치킨 스테이크": "chicken-steak",
  "스크램블 에그": "scrambled-egg",
  "비빔밥": "bibimbap",
  "고등어 구이와 된장찌개": "mackerel-doenjang",
  "스무디 볼": "smoothie-bowl",
  "새우 볶음밥": "shrimp-rice",
  "돼지갈비찜": "braised-ribs",
  "팬케이크": "pancake",
  "파스타 샐러드": "pasta-salad",
  "삼겹살 구이": "samgyupsal",
  "브런치 플레이트": "brunch-plate",
  "칼국수": "kalguksu",
  "치킨 카레": "chicken-curry",
};

export default function MealPlanPage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(0);
  const dayKey = DAY_KEYS[selectedDay];
  const dayPlan = mockMealPlan[dayKey];

  const handleRecipeClick = (recipeName: string) => {
    const recipeId = recipeNameToId[recipeName] || encodeURIComponent(recipeName);
    router.push(`/recipe/${recipeId}`);
  };

  const totalCalories = dayPlan.breakfast.calories + dayPlan.lunch.calories + dayPlan.dinner.calories;
  const totalTime = dayPlan.breakfast.prep_time + dayPlan.lunch.prep_time + dayPlan.dinner.prep_time;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">주간 식단</h1>
        <Button variant="cta" className="gap-2">
          <ChefHat className="h-4 w-4" />
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
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <Flame className="h-6 w-6 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalCalories}</p>
            <p className="text-sm text-gray-500">총 칼로리</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalTime}분</p>
            <p className="text-sm text-gray-500">총 조리시간</p>
          </CardContent>
        </Card>
      </div>

      {/* Meal Cards */}
      <div className="space-y-4">
        {/* Breakfast */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              🌅 아침
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{dayPlan.breakfast.name}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span>{dayPlan.breakfast.calories} kcal</span>
                  <span>{dayPlan.breakfast.prep_time}분</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRecipeClick(dayPlan.breakfast.name)}>
                레시피 보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lunch */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              ☀️ 점심
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{dayPlan.lunch.name}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span>{dayPlan.lunch.calories} kcal</span>
                  <span>{dayPlan.lunch.prep_time}분</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRecipeClick(dayPlan.lunch.name)}>
                레시피 보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dinner */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              🌙 저녁
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{dayPlan.dinner.name}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span>{dayPlan.dinner.calories} kcal</span>
                  <span>{dayPlan.dinner.prep_time}분</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRecipeClick(dayPlan.dinner.name)}>
                레시피 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          장바구니 생성
        </Button>
        <Button variant="cta" className="gap-2">
          <Check className="h-4 w-4" />
          식단 확정
        </Button>
      </div>
    </div>
  );
}
