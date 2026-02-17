"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  AlertTriangle,
  Trash2,
  Package,
  Search,
  Apple,
  Beef,
  Milk,
  Wheat,
} from "lucide-react";

// Mock 냉장고 데이터
const mockPantryItems = [
  { id: 1, ingredient_name: "닭가슴살", quantity: 500, unit: "g", expiry_date: "2026-02-20", category: "meat" },
  { id: 2, ingredient_name: "계란", quantity: 10, unit: "개", expiry_date: "2026-02-25", category: "dairy" },
  { id: 3, ingredient_name: "양파", quantity: 3, unit: "개", expiry_date: "2026-02-28", category: "produce" },
  { id: 4, ingredient_name: "당근", quantity: 2, unit: "개", expiry_date: "2026-02-22", category: "produce" },
  { id: 5, ingredient_name: "우유", quantity: 1, unit: "L", expiry_date: "2026-02-19", category: "dairy" },
  { id: 6, ingredient_name: "현미", quantity: 2, unit: "kg", expiry_date: "2026-06-01", category: "grains" },
  { id: 7, ingredient_name: "두부", quantity: 1, unit: "모", expiry_date: "2026-02-18", category: "produce" },
  { id: 8, ingredient_name: "시금치", quantity: 200, unit: "g", expiry_date: "2026-02-19", category: "produce" },
  { id: 9, ingredient_name: "연어", quantity: 300, unit: "g", expiry_date: "2026-02-19", category: "seafood" },
  { id: 10, ingredient_name: "그릭 요거트", quantity: 3, unit: "개", expiry_date: "2026-02-24", category: "dairy" },
];

const mockExpiringItems = mockPantryItems.filter(item => {
  const expiry = new Date(item.expiry_date);
  const today = new Date();
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
});

const categoryIcons: Record<string, React.ReactNode> = {
  produce: <Apple className="h-5 w-5 text-green-500" />,
  meat: <Beef className="h-5 w-5 text-red-500" />,
  seafood: <span className="text-blue-500">🐟</span>,
  dairy: <Milk className="h-5 w-5 text-blue-300" />,
  grains: <Wheat className="h-5 w-5 text-amber-500" />,
};

const categoryLabels: Record<string, string> = {
  produce: "채소/과일",
  meat: "육류",
  seafood: "해산물",
  dairy: "유제품",
  grains: "곡물",
};

export default function PantryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredItems = mockPantryItems.filter((item) =>
    item.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(mockPantryItems.map((item) => item.category))];

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">냉장고 관리</h1>
        <Button variant="cta" onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          재료 추가
        </Button>
      </div>

      {/* Expiring Items Alert */}
      {mockExpiringItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              유통기한 임박 ({mockExpiringItems.length}개)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockExpiringItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-2 rounded"
                >
                  <span className="font-medium">{item.ingredient_name}</span>
                  <span className="text-orange-600 text-sm font-medium">
                    D-{getDaysUntilExpiry(item.expiry_date)}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-2 text-orange-700 p-0">
              이 재료로 레시피 찾기 →
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="재료 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>재료 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="재료 이름" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="수량" type="number" />
              <Input placeholder="단위 (개, g, ml)" />
            </div>
            <Input type="date" />
            <select className="w-full h-10 px-3 rounded-lg border border-gray-300">
              <option value="">카테고리 선택</option>
              <option value="produce">채소/과일</option>
              <option value="dairy">유제품</option>
              <option value="meat">육류</option>
              <option value="seafood">해산물</option>
              <option value="grains">곡물</option>
            </select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                취소
              </Button>
              <Button variant="cta">추가</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pantry Items by Category */}
      {categories.map((category) => {
        const items = filteredItems.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {categoryIcons[category]}
                {categoryLabels[category] || category}
                <span className="text-sm text-gray-400 font-normal">({items.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => {
                  const daysLeft = getDaysUntilExpiry(item.expiry_date);
                  const isExpiringSoon = daysLeft <= 3;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isExpiringSoon ? "bg-orange-50" : "bg-gray-50"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{item.ingredient_name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity}{item.unit}
                          {item.expiry_date && (
                            <span className={`ml-2 ${isExpiringSoon ? "text-orange-600" : ""}`}>
                              · 유통기한: {item.expiry_date.slice(5).replace("-", "/")}
                            </span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              <span className="font-medium">총 {mockPantryItems.length}개 재료 보유</span>
            </div>
            <Button variant="outline" size="sm">
              냉장고 파먹기 레시피
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
