"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  Flame,
  Users,
  ChefHat,
  CheckCircle2,
} from "lucide-react";

// Mock 레시피 데이터
const mockRecipes: Record<string, {
  id: string;
  name: string;
  description: string;
  image: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  tips: string[];
}> = {
  "oatmeal-banana": {
    id: "oatmeal-banana",
    name: "오트밀과 바나나",
    description: "건강한 하루를 시작하는 영양 가득한 아침 식사",
    image: "🥣",
    prep_time: 5,
    cook_time: 5,
    servings: 1,
    difficulty: "쉬움",
    calories: 320,
    protein: 10,
    carbs: 55,
    fat: 8,
    ingredients: [
      { name: "오트밀", amount: "1/2컵 (40g)" },
      { name: "우유 또는 물", amount: "1컵 (240ml)" },
      { name: "바나나", amount: "1개" },
      { name: "꿀", amount: "1큰술" },
      { name: "시나몬 가루", amount: "약간" },
      { name: "호두 (선택)", amount: "2-3알" },
    ],
    instructions: [
      "냄비에 우유(또는 물)를 넣고 중불에서 끓입니다.",
      "오트밀을 넣고 저어가며 3-4분간 끓입니다.",
      "불을 끄고 그릇에 담습니다.",
      "바나나를 슬라이스하여 위에 올립니다.",
      "꿀과 시나몬 가루를 뿌립니다.",
      "기호에 따라 호두를 올려 완성합니다.",
    ],
    tips: [
      "전날 밤 오트밀을 우유에 담가두면 오버나이트 오츠로도 즐길 수 있어요.",
      "바나나 대신 딸기, 블루베리 등 다른 과일을 사용해도 좋습니다.",
    ],
  },
  "chicken-salad": {
    id: "chicken-salad",
    name: "닭가슴살 샐러드",
    description: "고단백 저칼로리 건강 샐러드",
    image: "🥗",
    prep_time: 10,
    cook_time: 15,
    servings: 1,
    difficulty: "쉬움",
    calories: 450,
    protein: 42,
    carbs: 15,
    fat: 25,
    ingredients: [
      { name: "닭가슴살", amount: "150g" },
      { name: "로메인 상추", amount: "2줌" },
      { name: "방울토마토", amount: "5개" },
      { name: "오이", amount: "1/2개" },
      { name: "아보카도", amount: "1/2개" },
      { name: "올리브오일", amount: "1큰술" },
      { name: "레몬즙", amount: "1큰술" },
      { name: "소금, 후추", amount: "약간" },
    ],
    instructions: [
      "닭가슴살에 소금, 후추로 간을 합니다.",
      "팬에 올리브오일을 두르고 닭가슴살을 앞뒤로 7-8분씩 구워줍니다.",
      "로메인 상추를 씻어 한입 크기로 뜯어둡니다.",
      "방울토마토는 반으로, 오이는 슬라이스합니다.",
      "아보카도는 껍질을 벗기고 슬라이스합니다.",
      "그릇에 채소를 담고 구운 닭가슴살을 올립니다.",
      "올리브오일과 레몬즙을 섞어 드레싱으로 뿌립니다.",
    ],
    tips: [
      "닭가슴살은 수비드나 에어프라이어로 조리하면 더욱 촉촉합니다.",
      "드레싱에 머스타드를 추가하면 풍미가 좋아집니다.",
    ],
  },
  "salmon-steak": {
    id: "salmon-steak",
    name: "연어 스테이크와 채소",
    description: "오메가3 풍부한 건강식",
    image: "🐟",
    prep_time: 10,
    cook_time: 15,
    servings: 1,
    difficulty: "보통",
    calories: 550,
    protein: 40,
    carbs: 20,
    fat: 35,
    ingredients: [
      { name: "연어 필렛", amount: "200g" },
      { name: "아스파라거스", amount: "5줄기" },
      { name: "브로콜리", amount: "1/2송이" },
      { name: "올리브오일", amount: "2큰술" },
      { name: "레몬", amount: "1/2개" },
      { name: "마늘", amount: "2쪽" },
      { name: "소금, 후추", amount: "약간" },
      { name: "딜 (선택)", amount: "약간" },
    ],
    instructions: [
      "연어는 소금, 후추로 간하고 10분간 재워둡니다.",
      "아스파라거스와 브로콜리는 한입 크기로 준비합니다.",
      "팬에 올리브오일을 두르고 다진 마늘을 볶습니다.",
      "연어를 껍질 면부터 4분, 뒤집어서 3분 굽습니다.",
      "같은 팬에 채소를 넣고 3-4분간 볶습니다.",
      "접시에 연어와 채소를 담고 레몬즙을 뿌립니다.",
      "딜을 올려 완성합니다.",
    ],
    tips: [
      "연어는 미디엄 레어로 익히면 더욱 부드럽습니다.",
      "버터를 추가하면 더욱 풍미가 좋아집니다.",
    ],
  },
  "bulgogi-rice": {
    id: "bulgogi-rice",
    name: "소고기 불고기와 현미밥",
    description: "달콤짭조름한 한식 불고기",
    image: "🥩",
    prep_time: 20,
    cook_time: 10,
    servings: 2,
    difficulty: "보통",
    calories: 580,
    protein: 35,
    carbs: 65,
    fat: 20,
    ingredients: [
      { name: "소고기 불고기감", amount: "300g" },
      { name: "양파", amount: "1개" },
      { name: "대파", amount: "1대" },
      { name: "당근", amount: "1/2개" },
      { name: "간장", amount: "4큰술" },
      { name: "설탕", amount: "2큰술" },
      { name: "다진 마늘", amount: "1큰술" },
      { name: "참기름", amount: "1큰술" },
      { name: "배 (또는 배즙)", amount: "1/4개" },
      { name: "현미밥", amount: "2공기" },
    ],
    instructions: [
      "배를 갈아서 즙을 내거나 배즙을 준비합니다.",
      "간장, 설탕, 다진 마늘, 참기름, 배즙을 섞어 양념장을 만듭니다.",
      "소고기에 양념장을 넣고 30분 이상 재워둡니다.",
      "양파는 채 썰고, 대파는 어슷 썰고, 당근은 채 썹니다.",
      "달군 팬에 재운 고기와 채소를 함께 볶습니다.",
      "중불에서 5-7분간 볶아 완성합니다.",
      "현미밥과 함께 곁들여 냅니다.",
    ],
    tips: [
      "고기를 하룻밤 재워두면 더욱 맛있습니다.",
      "불고기에 버섯을 추가해도 좋습니다.",
    ],
  },
};

// 레시피 이름으로 ID 매핑
const recipeNameToId: Record<string, string> = {
  "오트밀과 바나나": "oatmeal-banana",
  "닭가슴살 샐러드": "chicken-salad",
  "연어 스테이크와 채소": "salmon-steak",
  "소고기 불고기와 현미밥": "bulgogi-rice",
};

export default function RecipePage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  // ID 또는 이름으로 레시피 찾기
  const recipe = mockRecipes[recipeId] || mockRecipes[recipeNameToId[decodeURIComponent(recipeId)]];

  if (!recipe) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          뒤로 가기
        </Button>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">레시피를 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-900">{recipe.name}</h1>
      </div>

      {/* Hero */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <span className="text-6xl">{recipe.image}</span>
          </div>
          <p className="text-gray-600 text-center">{recipe.description}</p>

          {/* Quick Info */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-gray-500">준비</p>
              <p className="font-medium text-sm">{recipe.prep_time}분</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Flame className="h-4 w-4 mx-auto mb-1 text-orange-500" />
              <p className="text-xs text-gray-500">조리</p>
              <p className="font-medium text-sm">{recipe.cook_time}분</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Users className="h-4 w-4 mx-auto mb-1 text-green-500" />
              <p className="text-xs text-gray-500">인분</p>
              <p className="font-medium text-sm">{recipe.servings}인분</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <ChefHat className="h-4 w-4 mx-auto mb-1 text-purple-500" />
              <p className="text-xs text-gray-500">난이도</p>
              <p className="font-medium text-sm">{recipe.difficulty}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nutrition */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">영양 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{recipe.calories}</p>
              <p className="text-xs text-gray-500">칼로리</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">{recipe.protein}g</p>
              <p className="text-xs text-gray-500">단백질</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{recipe.carbs}g</p>
              <p className="text-xs text-gray-500">탄수화물</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">{recipe.fat}g</p>
              <p className="text-xs text-gray-500">지방</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">재료</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="font-medium">{ingredient.name}</span>
                <span className="text-gray-500 text-sm">{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">조리 방법</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Tips */}
      {recipe.tips.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-700">💡 요리 팁</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex gap-2 text-yellow-800">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        <Button variant="outline">
          재료 장바구니 추가
        </Button>
        <Button variant="cta">
          요리 시작하기
        </Button>
      </div>
    </div>
  );
}
