"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Drumstick,
  Wheat,
  Droplet,
  Trophy,
  Calendar,
  Camera,
  Plus,
} from "lucide-react";

// 테스트용 mock 데이터
const mockUser = {
  name: "테스트 사용자",
  streak_days: 7,
  total_points: 150,
  badges: ["week_warrior"],
};

const mockSummary = {
  total_calories: 1250,
  goal_calories: 2000,
  total_protein: 45,
  goal_protein: 60,
  total_carbs: 150,
  goal_carbs: 250,
  total_fat: 40,
  goal_fat: 65,
};

const mockMeals = [
  { id: 1, meal_type: "아침", food_name: "토스트와 계란 프라이", calories: 350, ai_recognized: false },
  { id: 2, meal_type: "점심", food_name: "닭가슴살 샐러드", calories: 450, ai_recognized: true },
  { id: 3, meal_type: "간식", food_name: "그릭 요거트", calories: 150, ai_recognized: false },
];

export default function Home() {
  const user = mockUser;
  const summary = mockSummary;
  const todayMeals = mockMeals;

  return (
    <div className="space-y-6">
      {/* Welcome & Streak */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            안녕하세요, {user.name}님!
          </h1>
          <p className="text-gray-500">오늘의 영양 상태를 확인하세요</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-orange-700">
            {user.streak_days}일 연속
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="cta" className="h-16 text-lg gap-2">
          <Camera className="h-5 w-5" />
          음식 사진 촬영
        </Button>
        <Button variant="outline" className="h-16 text-lg gap-2">
          <Plus className="h-5 w-5" />
          직접 입력
        </Button>
      </div>

      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            오늘의 섭취량
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calories */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-red-500" />
                <span className="font-medium">칼로리</span>
              </div>
              <span className="text-sm text-gray-500">
                {summary.total_calories} / {summary.goal_calories} kcal
              </span>
            </div>
            <Progress
              value={(summary.total_calories / summary.goal_calories) * 100}
              className="h-3"
              indicatorClassName="bg-red-400"
            />
          </div>

          {/* Protein */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <Drumstick className="h-4 w-4 text-purple-500" />
                <span className="font-medium">단백질</span>
              </div>
              <span className="text-sm text-gray-500">
                {summary.total_protein} / {summary.goal_protein}g
              </span>
            </div>
            <Progress
              value={(summary.total_protein / summary.goal_protein) * 100}
              className="h-3"
              indicatorClassName="bg-purple-400"
            />
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wheat className="h-4 w-4 text-amber-500" />
                <span className="font-medium">탄수화물</span>
              </div>
              <span className="text-sm text-gray-500">
                {summary.total_carbs} / {summary.goal_carbs}g
              </span>
            </div>
            <Progress
              value={(summary.total_carbs / summary.goal_carbs) * 100}
              className="h-3"
              indicatorClassName="bg-amber-400"
            />
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span className="font-medium">지방</span>
              </div>
              <span className="text-sm text-gray-500">
                {summary.total_fat} / {summary.goal_fat}g
              </span>
            </div>
            <Progress
              value={(summary.total_fat / summary.goal_fat) * 100}
              className="h-3"
              indicatorClassName="bg-blue-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card>
        <CardHeader>
          <CardTitle>오늘 먹은 음식</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="text-xs text-green-600 uppercase font-medium">
                    {meal.meal_type}
                  </span>
                  <p className="font-medium">{meal.food_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-500">
                    {meal.calories} kcal
                  </p>
                  {meal.ai_recognized && (
                    <span className="text-xs text-green-500">AI 분석</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gamification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            나의 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {user.total_points}
              </p>
              <p className="text-sm text-gray-500">총 포인트</p>
            </div>
            <div className="flex gap-2">
              {user.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                >
                  {badge === "week_warrior" && "🏆 일주일 전사"}
                  {badge === "month_master" && "👑 한달 마스터"}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
