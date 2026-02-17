"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/store/useStore";
import { authApi } from "@/lib/api";
import { ChevronRight, ChevronLeft } from "lucide-react";

const STEPS = [
  { title: "기본 정보", fields: ["age", "gender", "weight", "height"] },
  { title: "활동 수준", fields: ["activity_level"] },
  { title: "식단 목표", fields: ["goal", "diet_type"] },
  { title: "알레르기 및 선호", fields: ["allergies", "disliked_foods", "budget_per_meal"] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity_level: "",
    goal: "",
    diet_type: "",
    allergies: [] as string[],
    disliked_foods: [] as string[],
    budget_per_meal: "",
  });

  const [allergyInput, setAllergyInput] = useState("");
  const [dislikedInput, setDislikedInput] = useState("");

  function handleChange(field: string, value: string | string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function addAllergy() {
    if (allergyInput.trim()) {
      handleChange("allergies", [...formData.allergies, allergyInput.trim()]);
      setAllergyInput("");
    }
  }

  function addDisliked() {
    if (dislikedInput.trim()) {
      handleChange("disliked_foods", [...formData.disliked_foods, dislikedInput.trim()]);
      setDislikedInput("");
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const data = {
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        gender: formData.gender || null,
        activity_level: formData.activity_level || null,
        goal: formData.goal || null,
        diet_type: formData.diet_type || null,
        allergies: formData.allergies,
        disliked_foods: formData.disliked_foods,
        budget_per_meal: formData.budget_per_meal ? parseFloat(formData.budget_per_meal) : null,
      };

      const response = await authApi.onboarding(data);
      setUser(response.data);
      router.push("/");
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setLoading(false);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">
            {step + 1} / {STEPS.length}
          </p>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{STEPS[step].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Basic Info */}
            {step === 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">나이</label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">성별</label>
                    <select
                      className="w-full h-10 px-3 rounded-lg border border-gray-300"
                      value={formData.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <option value="">선택</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">체중 (kg)</label>
                    <Input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      placeholder="65"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">키 (cm)</label>
                    <Input
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      placeholder="170"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Activity Level */}
            {step === 1 && (
              <div className="space-y-3">
                {[
                  { value: "sedentary", label: "거의 운동 안함", desc: "사무직, 재택근무" },
                  { value: "light", label: "가벼운 활동", desc: "주 1-2회 운동" },
                  { value: "moderate", label: "보통 활동", desc: "주 3-4회 운동" },
                  { value: "active", label: "활발한 활동", desc: "주 5-6회 운동" },
                  { value: "very_active", label: "매우 활발", desc: "매일 운동 또는 육체노동" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChange("activity_level", option.value)}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      formData.activity_level === option.value
                        ? "border-sage-500 bg-sage-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">목표</label>
                  <div className="space-y-2">
                    {[
                      { value: "weight_loss", label: "체중 감량" },
                      { value: "weight_gain", label: "체중 증가" },
                      { value: "muscle_gain", label: "근육 증가" },
                      { value: "maintenance", label: "현재 유지" },
                      { value: "health_improvement", label: "건강 개선" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange("goal", option.value)}
                        className={`w-full p-3 rounded-lg border text-left ${
                          formData.goal === option.value
                            ? "border-sage-500 bg-sage-50"
                            : "border-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">식이 유형</label>
                  <select
                    className="w-full h-10 px-3 rounded-lg border border-gray-300"
                    value={formData.diet_type}
                    onChange={(e) => handleChange("diet_type", e.target.value)}
                  >
                    <option value="none">일반</option>
                    <option value="vegan">비건</option>
                    <option value="vegetarian">채식</option>
                    <option value="keto">키토</option>
                    <option value="low_carb">저탄수화물</option>
                    <option value="diabetic">당뇨식</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 4: Allergies & Preferences */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">알레르기</label>
                  <div className="flex gap-2">
                    <Input
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      placeholder="예: 땅콩"
                      onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                    />
                    <Button variant="outline" onClick={addAllergy}>
                      추가
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.allergies.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">싫어하는 음식</label>
                  <div className="flex gap-2">
                    <Input
                      value={dislikedInput}
                      onChange={(e) => setDislikedInput(e.target.value)}
                      placeholder="예: 고수"
                      onKeyPress={(e) => e.key === "Enter" && addDisliked()}
                    />
                    <Button variant="outline" onClick={addDisliked}>
                      추가
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.disliked_foods.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    1끼 예산 (원)
                  </label>
                  <Input
                    type="number"
                    value={formData.budget_per_meal}
                    onChange={(e) => handleChange("budget_per_meal", e.target.value)}
                    placeholder="10000"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            이전
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="cta" onClick={() => setStep((s) => s + 1)}>
              다음
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button variant="cta" onClick={handleSubmit} disabled={loading}>
              {loading ? "저장 중..." : "시작하기"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
