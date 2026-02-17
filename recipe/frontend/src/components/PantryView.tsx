"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pantryApi } from "@/lib/api";
import { useStore } from "@/store/useStore";
import {
  Plus,
  AlertTriangle,
  Trash2,
  Package,
  Search,
} from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";
import type { PantryItem } from "@/types";

export function PantryView() {
  const { pantryItems, setPantryItems, addPantryItem, removePantryItem } =
    useStore();
  const [loading, setLoading] = useState(true);
  const [expiringItems, setExpiringItems] = useState<PantryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    ingredient_name: "",
    quantity: "",
    unit: "",
    expiry_date: "",
    category: "",
  });

  useEffect(() => {
    fetchPantry();
  }, []);

  async function fetchPantry() {
    setLoading(true);
    try {
      const [itemsRes, expiringRes] = await Promise.all([
        pantryApi.getAll(),
        pantryApi.getExpiring(3),
      ]);
      setPantryItems(itemsRes.data);
      setExpiringItems(expiringRes.data);
    } catch (error) {
      console.error("Failed to fetch pantry:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem() {
    if (!newItem.ingredient_name) return;

    try {
      const response = await pantryApi.add({
        ...newItem,
        quantity: newItem.quantity ? parseFloat(newItem.quantity) : null,
        expiry_date: newItem.expiry_date || null,
      });
      addPantryItem(response.data);
      setNewItem({
        ingredient_name: "",
        quantity: "",
        unit: "",
        expiry_date: "",
        category: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  async function handleDeleteItem(id: number) {
    try {
      await pantryApi.delete(id);
      removePantryItem(id);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  const filteredItems = pantryItems.filter((item) =>
    item.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(pantryItems.map((item) => item.category || "기타"))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">냉장고 관리</h1>
        <Button variant="cta" onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          재료 추가
        </Button>
      </div>

      {/* Expiring Items Alert */}
      {expiringItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              유통기한 임박
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiringItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-2 rounded"
                >
                  <span>{item.ingredient_name}</span>
                  <span className="text-orange-600 text-sm">
                    {item.expiry_date &&
                      `D-${differenceInDays(parseISO(item.expiry_date), new Date())}`}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-2 text-orange-700">
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
            <Input
              placeholder="재료 이름"
              value={newItem.ingredient_name}
              onChange={(e) =>
                setNewItem({ ...newItem, ingredient_name: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="수량"
                type="number"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
              />
              <Input
                placeholder="단위 (개, g, ml)"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
              />
            </div>
            <Input
              type="date"
              placeholder="유통기한"
              value={newItem.expiry_date}
              onChange={(e) =>
                setNewItem({ ...newItem, expiry_date: e.target.value })
              }
            />
            <select
              className="w-full h-10 px-3 rounded-lg border border-gray-300"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            >
              <option value="">카테고리 선택</option>
              <option value="produce">채소/과일</option>
              <option value="dairy">유제품</option>
              <option value="meat">육류</option>
              <option value="seafood">해산물</option>
              <option value="grains">곡물</option>
              <option value="condiments">조미료</option>
              <option value="frozen">냉동식품</option>
              <option value="other">기타</option>
            </select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                취소
              </Button>
              <Button variant="cta" onClick={handleAddItem}>
                추가
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pantry Items by Category */}
      {categories.map((category) => {
        const items = filteredItems.filter(
          (item) => (item.category || "기타") === category
        );
        if (items.length === 0) return null;

        const categoryLabels: { [key: string]: string } = {
          produce: "채소/과일",
          dairy: "유제품",
          meat: "육류",
          seafood: "해산물",
          grains: "곡물",
          condiments: "조미료",
          frozen: "냉동식품",
          other: "기타",
          기타: "기타",
        };

        return (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-sage-500" />
                {categoryLabels[category] || category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.ingredient_name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity && `${item.quantity}${item.unit || ""}`}
                        {item.expiry_date && (
                          <span className="ml-2">
                            유통기한:{" "}
                            {format(parseISO(item.expiry_date), "M/d", {
                              locale: ko,
                            })}
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {pantryItems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">냉장고가 비어있습니다</p>
            <Button
              variant="cta"
              onClick={() => setShowAddForm(true)}
              className="mt-4"
            >
              재료 추가하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
