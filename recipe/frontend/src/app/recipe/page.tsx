"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  Flame,
  ChefHat,
  Filter,
} from "lucide-react";

// Mock 레시피 목록
const mockRecipes = [
  {
    id: "oatmeal-banana",
    name: "오트밀과 바나나",
    description: "건강한 하루를 시작하는 영양 가득한 아침 식사",
    image: "🥣",
    prep_time: 10,
    calories: 320,
    difficulty: "쉬움",
    category: "아침",
  },
  {
    id: "chicken-salad",
    name: "닭가슴살 샐러드",
    description: "고단백 저칼로리 건강 샐러드",
    image: "🥗",
    prep_time: 25,
    calories: 450,
    difficulty: "쉬움",
    category: "점심",
  },
  {
    id: "salmon-steak",
    name: "연어 스테이크와 채소",
    description: "오메가3 풍부한 건강식",
    image: "🐟",
    prep_time: 25,
    calories: 550,
    difficulty: "보통",
    category: "저녁",
  },
  {
    id: "bulgogi-rice",
    name: "소고기 불고기와 현미밥",
    description: "달콤짭조름한 한식 불고기",
    image: "🥩",
    prep_time: 30,
    calories: 580,
    difficulty: "보통",
    category: "저녁",
  },
  {
    id: "greek-yogurt",
    name: "그릭 요거트 파르페",
    description: "신선한 과일과 그래놀라를 곁들인 요거트",
    image: "🍨",
    prep_time: 5,
    calories: 280,
    difficulty: "쉬움",
    category: "아침",
  },
  {
    id: "tuna-kimbap",
    name: "참치 김밥",
    description: "간편하고 맛있는 한끼 도시락",
    image: "🍙",
    prep_time: 30,
    calories: 420,
    difficulty: "보통",
    category: "점심",
  },
  {
    id: "avocado-toast",
    name: "아보카도 토스트",
    description: "건강한 지방과 식이섬유가 풍부한 브런치",
    image: "🥑",
    prep_time: 10,
    calories: 350,
    difficulty: "쉬움",
    category: "아침",
  },
  {
    id: "bibimbap",
    name: "비빔밥",
    description: "다양한 야채와 고추장의 조화",
    image: "🍚",
    prep_time: 25,
    calories: 480,
    difficulty: "보통",
    category: "점심",
  },
  {
    id: "chicken-curry",
    name: "치킨 카레",
    description: "향신료 가득한 인도식 카레",
    image: "🍛",
    prep_time: 35,
    calories: 550,
    difficulty: "보통",
    category: "저녁",
  },
  {
    id: "smoothie-bowl",
    name: "스무디 볼",
    description: "과일과 토핑이 어우러진 건강한 아침",
    image: "🍇",
    prep_time: 10,
    calories: 290,
    difficulty: "쉬움",
    category: "아침",
  },
];

const categories = ["전체", "아침", "점심", "저녁", "간식"];

export default function RecipeListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">레시피</h1>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="레시피 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(`/recipe/${recipe.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {recipe.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{recipe.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.prep_time}분
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {recipe.calories} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3" />
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
