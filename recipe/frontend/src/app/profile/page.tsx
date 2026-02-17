"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import {
  User,
  Trophy,
  Flame,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useStore();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  if (!user) {
    return null;
  }

  const goalLabels: Record<string, string> = {
    weight_loss: "체중 감량",
    weight_gain: "체중 증가",
    muscle_gain: "근육 증가",
    maintenance: "현재 유지",
    health_improvement: "건강 개선",
  };

  const dietLabels: Record<string, string> = {
    none: "일반",
    vegan: "비건",
    vegetarian: "채식",
    keto: "키토",
    low_carb: "저탄수화물",
    diabetic: "당뇨식",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">프로필</h1>

      {/* User Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-sage-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">{user.streak_days}</p>
            <p className="text-sm text-gray-500">연속 기록</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">{user.total_points}</p>
            <p className="text-sm text-gray-500">포인트</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Goals */}
      <Card>
        <CardHeader>
          <CardTitle>건강 목표</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">일일 칼로리</span>
            <span className="font-medium">{user.daily_calories || "-"} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">목표</span>
            <span className="font-medium">
              {user.goal ? goalLabels[user.goal] || user.goal : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">식이 유형</span>
            <span className="font-medium">
              {user.diet_type ? dietLabels[user.diet_type] || user.diet_type : "-"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      {user.badges && user.badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>획득한 배지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full"
                >
                  {badge === "week_warrior" && "🏆 일주일 전사"}
                  {badge === "month_master" && "👑 한달 마스터"}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Menu */}
      <Card>
        <CardContent className="p-0">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-gray-400" />
              <span>설정</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-red-400" />
              <span className="text-red-500">로그아웃</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
