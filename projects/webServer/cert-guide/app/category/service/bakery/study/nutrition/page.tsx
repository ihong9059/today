"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NutritionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["topic1"]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bakery-nutrition-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bakery-nutrition-completed", JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId]
    );
  };

  const questions = [
    // 토픽1: 탄수화물 (10문항)
    { id: 1, topic: "topic1", question: "탄수화물의 1g당 열량은?", answer: "4kcal - 탄수화물, 단백질은 4kcal/g, 지방은 9kcal/g입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 탄수화물의 1g당 열량은?\n\n다음 순서로 설명해주세요:\n1. 열량 영양소의 정의\n2. 영양소별 열량가\n3. 빵의 열량 계산\n4. 저칼로리 제빵\n5. 연습문제 3개" },
    { id: 2, topic: "topic1", question: "단당류에 해당하는 것은?", answer: "포도당, 과당, 갈락토스 - 가장 작은 단위의 당류입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단당류에 해당하는 것은?\n\n다음 순서로 설명해주세요:\n1. 단당류의 정의\n2. 종류와 특성\n3. 체내 대사\n4. 제빵에서의 역할\n5. 연습문제 3개" },
    { id: 3, topic: "topic1", question: "이당류 중 설탕(자당)의 구성은?", answer: "포도당 + 과당 - 가수분해하면 전화당이 됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 이당류 중 설탕(자당)의 구성은?\n\n다음 순서로 설명해주세요:\n1. 이당류의 정의\n2. 자당의 구조\n3. 가수분해 반응\n4. 전화당의 특성\n5. 연습문제 3개" },
    { id: 4, topic: "topic1", question: "식이섬유의 기능으로 옳지 않은 것은?", answer: "열량 공급 - 식이섬유는 소화되지 않아 열량을 거의 내지 않습니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 식이섬유의 기능으로 옳지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 식이섬유의 정의\n2. 주요 기능\n3. 종류 (수용성/불용성)\n4. 건강빵에서의 활용\n5. 연습문제 3개" },
    { id: 5, topic: "topic1", question: "혈당지수(GI)가 낮은 식품은?", answer: "통밀빵, 호밀빵 - 정제된 밀가루 빵보다 혈당을 천천히 올립니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 혈당지수(GI)가 낮은 식품은?\n\n다음 순서로 설명해주세요:\n1. 혈당지수의 정의\n2. GI에 영향을 미치는 요인\n3. 저GI 빵 제조법\n4. 당뇨환자용 빵\n5. 연습문제 3개" },
    { id: 6, topic: "topic1", question: "글리코겐의 저장 장소는?", answer: "간과 근육 - 간에 약 100g, 근육에 약 300g 저장됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 글리코겐의 저장 장소는?\n\n다음 순서로 설명해주세요:\n1. 글리코겐의 정의\n2. 저장과 분해\n3. 운동과의 관계\n4. 탄수화물 섭취의 중요성\n5. 연습문제 3개" },
    { id: 7, topic: "topic1", question: "탄수화물의 주요 기능이 아닌 것은?", answer: "체온 유지 - 이는 주로 지방의 기능입니다. 탄수화물은 에너지 공급이 주 기능입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 탄수화물의 주요 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 탄수화물의 기능들\n2. 에너지 공급 메커니즘\n3. 단백질 절약 작용\n4. 케톤증 방지\n5. 연습문제 3개" },
    { id: 8, topic: "topic1", question: "올리고당의 특징은?", answer: "저칼로리, 장내 유익균 증식 - 프리바이오틱스로 작용합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 올리고당의 특징은?\n\n다음 순서로 설명해주세요:\n1. 올리고당의 정의\n2. 종류와 특성\n3. 건강 기능\n4. 기능성 빵에서의 활용\n5. 연습문제 3개" },
    { id: 9, topic: "topic1", question: "탄수화물 섭취 권장 비율은?", answer: "총 열량의 55-65% - 한국인 영양섭취기준 기준입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 탄수화물 섭취 권장 비율은?\n\n다음 순서로 설명해주세요:\n1. 영양섭취기준의 정의\n2. 열량 영양소 비율\n3. 한국인의 식생활 특성\n4. 균형 잡힌 식단\n5. 연습문제 3개" },
    { id: 10, topic: "topic1", question: "당뇨병 환자에게 적합한 당류는?", answer: "당알코올(솔비톨, 자일리톨) - 인슐린 없이 대사되고 혈당을 적게 올립니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 당뇨병 환자에게 적합한 당류는?\n\n다음 순서로 설명해주세요:\n1. 당뇨병과 혈당\n2. 당알코올의 특성\n3. 당뇨환자용 빵 제조\n4. 대체 감미료\n5. 연습문제 3개" },

    // 토픽2: 단백질 (10문항)
    { id: 11, topic: "topic2", question: "단백질의 1g당 열량은?", answer: "4kcal - 탄수화물과 동일합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단백질의 1g당 열량은?\n\n다음 순서로 설명해주세요:\n1. 단백질의 열량가\n2. 열량 공급원으로서의 역할\n3. 단백질의 주요 기능\n4. 제빵 재료의 단백질 함량\n5. 연습문제 3개" },
    { id: 12, topic: "topic2", question: "필수아미노산의 개수는?", answer: "성인 8개 (어린이 10개) - 체내 합성이 불가능하여 반드시 섭취해야 합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 필수아미노산의 개수는?\n\n다음 순서로 설명해주세요:\n1. 필수아미노산의 정의\n2. 8가지 필수아미노산\n3. 식품별 아미노산 조성\n4. 상호보완 효과\n5. 연습문제 3개" },
    { id: 13, topic: "topic2", question: "단백질의 상호보완 효과란?", answer: "부족한 아미노산을 다른 식품으로 보충 - 밀 + 콩의 조합이 대표적입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단백질의 상호보완 효과란?\n\n다음 순서로 설명해주세요:\n1. 상호보완의 원리\n2. 제한 아미노산의 개념\n3. 효과적인 식품 조합\n4. 빵의 영양 강화\n5. 연습문제 3개" },
    { id: 14, topic: "topic2", question: "밀의 제한 아미노산은?", answer: "라이신 - 밀 단백질에 부족한 필수아미노산입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 밀의 제한 아미노산은?\n\n다음 순서로 설명해주세요:\n1. 제한 아미노산의 정의\n2. 밀의 아미노산 조성\n3. 라이신 보충 방법\n4. 영양 강화 빵 제조\n5. 연습문제 3개" },
    { id: 15, topic: "topic2", question: "단백질 변성의 원인이 아닌 것은?", answer: "냉장 - 열, 산, 알칼리, 알코올 등이 변성을 일으킵니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단백질 변성의 원인이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 단백질 변성의 정의\n2. 변성 원인\n3. 변성의 긍정적 효과\n4. 제빵에서의 변성 활용\n5. 연습문제 3개" },
    { id: 16, topic: "topic2", question: "완전단백질 식품은?", answer: "계란, 우유, 육류 - 모든 필수아미노산을 적절히 함유합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 완전단백질 식품은?\n\n다음 순서로 설명해주세요:\n1. 완전단백질의 정의\n2. 대표적인 완전단백질 식품\n3. 불완전단백질 식품\n4. 빵의 단백질 보충\n5. 연습문제 3개" },
    { id: 17, topic: "topic2", question: "단백질 섭취 권장량(성인)은?", answer: "체중 1kg당 0.8-1.0g - 성인 기준 하루 약 50-60g입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단백질 섭취 권장량(성인)은?\n\n다음 순서로 설명해주세요:\n1. 단백질 필요량 산정\n2. 연령별 권장량\n3. 과잉/결핍의 문제\n4. 빵을 통한 단백질 섭취\n5. 연습문제 3개" },
    { id: 18, topic: "topic2", question: "글루텐을 구성하는 아미노산 중 가장 많은 것은?", answer: "글루탐산 - 밀 단백질의 약 40%를 차지합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 글루텐을 구성하는 아미노산 중 가장 많은 것은?\n\n다음 순서로 설명해주세요:\n1. 글루텐의 아미노산 조성\n2. 글루탐산의 특성\n3. 글루텐의 특성과 관계\n4. 글루텐 프리 제품\n5. 연습문제 3개" },
    { id: 19, topic: "topic2", question: "단백질의 질 평가 방법 중 생물가란?", answer: "체내 이용률을 측정 - 계란 단백질을 100으로 기준합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 단백질의 질 평가 방법 중 생물가란?\n\n다음 순서로 설명해주세요:\n1. 생물가의 정의\n2. 측정 방법\n3. 식품별 생물가\n4. 기타 평가 방법 (PDCAAS 등)\n5. 연습문제 3개" },
    { id: 20, topic: "topic2", question: "마이야르 반응에 관여하는 영양소는?", answer: "아미노산(단백질)과 당류 - 갈변과 풍미 형성에 관여합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 마이야르 반응에 관여하는 영양소는?\n\n다음 순서로 설명해주세요:\n1. 마이야르 반응의 정의\n2. 반응 조건\n3. 빵 굽기와의 관계\n4. 영양학적 의의\n5. 연습문제 3개" },

    // 토픽3: 지방 (10문항)
    { id: 21, topic: "topic3", question: "지방의 1g당 열량은?", answer: "9kcal - 열량 영양소 중 가장 높습니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 지방의 1g당 열량은?\n\n다음 순서로 설명해주세요:\n1. 지방의 열량가\n2. 다른 영양소와 비교\n3. 고지방 식품의 열량\n4. 저칼로리 빵 제조\n5. 연습문제 3개" },
    { id: 22, topic: "topic3", question: "포화지방산의 특징은?", answer: "상온에서 고체, 동물성에 많음 - 과잉 섭취 시 심혈관 질환 위험이 증가합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 포화지방산의 특징은?\n\n다음 순서로 설명해주세요:\n1. 포화지방산의 구조\n2. 식품 급원\n3. 건강에 미치는 영향\n4. 제빵에서의 고려사항\n5. 연습문제 3개" },
    { id: 23, topic: "topic3", question: "불포화지방산 중 필수지방산은?", answer: "리놀레산, 리놀렌산 - 체내 합성이 불가능하여 반드시 섭취해야 합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 불포화지방산 중 필수지방산은?\n\n다음 순서로 설명해주세요:\n1. 필수지방산의 정의\n2. 급원 식품\n3. 오메가-3, 오메가-6\n4. 견강빵에서의 활용\n5. 연습문제 3개" },
    { id: 24, topic: "topic3", question: "트랜스지방산의 위험성은?", answer: "LDL 콜레스테롤 증가, HDL 감소 - 심혈관 질환 위험을 높입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 트랜스지방산의 위험성은?\n\n다음 순서로 설명해주세요:\n1. 트랜스지방의 생성 원리\n2. 건강에 미치는 영향\n3. 식품 표시 기준\n4. 제빵에서 트랜스지방 저감화\n5. 연습문제 3개" },
    { id: 25, topic: "topic3", question: "콜레스테롤의 기능으로 옳은 것은?", answer: "세포막 구성, 호르몬 합성 - 비타민 D 합성의 전구체이기도 합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 콜레스테롤의 기능으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 콜레스테롤의 기능\n2. 체내 합성과 섭취\n3. LDL과 HDL의 차이\n4. 적정 섭취량\n5. 연습문제 3개" },
    { id: 26, topic: "topic3", question: "지방 섭취 권장 비율은?", answer: "총 열량의 15-30% - 포화지방은 7% 미만을 권장합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 지방 섭취 권장 비율은?\n\n다음 순서로 설명해주세요:\n1. 지방 섭취 권장량\n2. 지방산 종류별 권장 비율\n3. 한국인의 지방 섭취 현황\n4. 균형 잡힌 지방 섭취\n5. 연습문제 3개" },
    { id: 27, topic: "topic3", question: "인지질의 기능은?", answer: "세포막 구성, 유화 작용 - 레시틴이 대표적인 인지질입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 인지질의 기능은?\n\n다음 순서로 설명해주세요:\n1. 인지질의 구조\n2. 기능과 역할\n3. 식품 급원\n4. 제빵에서의 활용\n5. 연습문제 3개" },
    { id: 28, topic: "topic3", question: "지방의 소화 효소는?", answer: "리파아제 - 췌장에서 분비되어 지방을 분해합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 지방의 소화 효소는?\n\n다음 순서로 설명해주세요:\n1. 지방 소화 과정\n2. 리파아제의 역할\n3. 담즙의 역할\n4. 지방 흡수와 이동\n5. 연습문제 3개" },
    { id: 29, topic: "topic3", question: "지용성 비타민의 흡수에 필요한 것은?", answer: "지방 - 지방이 있어야 지용성 비타민 흡수가 잘 됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 지용성 비타민의 흡수에 필요한 것은?\n\n다음 순서로 설명해주세요:\n1. 지용성 비타민의 종류\n2. 흡수 메커니즘\n3. 지방 섭취의 중요성\n4. 균형 잡힌 식사\n5. 연습문제 3개" },
    { id: 30, topic: "topic3", question: "체지방의 기능이 아닌 것은?", answer: "글루코스 저장 - 글루코스는 글리코겐으로 저장됩니다. 체지방은 에너지 저장, 체온 유지 등이 기능입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 체지방의 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 체지방의 기능\n2. 에너지 저장고로서의 역할\n3. 적정 체지방률\n4. 비만과 건강\n5. 연습문제 3개" },

    // 토픽4: 비타민 (10문항)
    { id: 31, topic: "topic4", question: "수용성 비타민은?", answer: "비타민 B군, C - 물에 녹으며 체내 저장이 어렵습니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 수용성 비타민은?\n\n다음 순서로 설명해주세요:\n1. 수용성 비타민의 종류\n2. 특성과 대사\n3. 과잉과 결핍\n4. 조리 시 손실\n5. 연습문제 3개" },
    { id: 32, topic: "topic4", question: "비타민 A의 결핍 증상은?", answer: "야맹증 - 시각 기능에 중요하며, 상피세포 유지에도 필수적입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 A의 결핍 증상은?\n\n다음 순서로 설명해주세요:\n1. 비타민 A의 기능\n2. 결핍 증상\n3. 급원 식품\n4. 제빵 재료의 비타민 A\n5. 연습문제 3개" },
    { id: 33, topic: "topic4", question: "비타민 D의 주요 기능은?", answer: "칼슘 흡수 촉진 - 뼈 건강에 필수적이며 햇빛으로도 합성됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 D의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 비타민 D의 기능\n2. 합성 경로\n3. 결핍 증상 (구루병)\n4. 급원 식품\n5. 연습문제 3개" },
    { id: 34, topic: "topic4", question: "비타민 E의 기능은?", answer: "항산화 작용 - 세포막의 불포화지방산을 보호합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 E의 기능은?\n\n다음 순서로 설명해주세요:\n1. 항산화의 의미\n2. 비타민 E의 역할\n3. 급원 식품\n4. 견과류 빵의 영양\n5. 연습문제 3개" },
    { id: 35, topic: "topic4", question: "비타민 B1(티아민)의 결핍 증상은?", answer: "각기병 - 탄수화물 대사에 필수적인 조효소입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 B1(티아민)의 결핍 증상은?\n\n다음 순서로 설명해주세요:\n1. 티아민의 기능\n2. 결핍 증상\n3. 급원 식품\n4. 정백 과정에서의 손실\n5. 연습문제 3개" },
    { id: 36, topic: "topic4", question: "비타민 C의 기능이 아닌 것은?", answer: "혈액 응고 - 이는 비타민 K의 기능입니다. 비타민 C는 콜라겐 합성, 항산화가 주 기능입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 C의 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 비타민 C의 기능\n2. 콜라겐 합성\n3. 철 흡수 촉진\n4. 열에 의한 파괴\n5. 연습문제 3개" },
    { id: 37, topic: "topic4", question: "엽산의 결핍으로 나타나는 질환은?", answer: "거대적아구성 빈혈 - 임산부에게 특히 중요한 비타민입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 엽산의 결핍으로 나타나는 질환은?\n\n다음 순서로 설명해주세요:\n1. 엽산의 기능\n2. 결핍 증상\n3. 임산부와 엽산\n4. 급원 식품\n5. 연습문제 3개" },
    { id: 38, topic: "topic4", question: "비타민 B12의 결핍 원인은?", answer: "내인자 부족, 채식 - 위에서 분비되는 내인자가 있어야 흡수됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민 B12의 결핍 원인은?\n\n다음 순서로 설명해주세요:\n1. 비타민 B12의 특성\n2. 흡수 메커니즘\n3. 결핍 증상\n4. 채식주의자의 보충\n5. 연습문제 3개" },
    { id: 39, topic: "topic4", question: "비타민의 열에 대한 안정성이 가장 낮은 것은?", answer: "비타민 C - 열, 산소, 빛에 쉽게 파괴됩니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 비타민의 열에 대한 안정성이 가장 낮은 것은?\n\n다음 순서로 설명해주세요:\n1. 비타민별 열 안정성\n2. 조리 시 손실\n3. 영양소 보존법\n4. 제빵 과정에서의 비타민\n5. 연습문제 3개" },
    { id: 40, topic: "topic4", question: "강화 밀가루에 첨가되는 비타민은?", answer: "비타민 B1, B2, 니아신 - 정백 과정에서 손실된 영양소를 보충합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 강화 밀가루에 첨가되는 비타민은?\n\n다음 순서로 설명해주세요:\n1. 강화의 목적\n2. 첨가 성분\n3. 정백과 영양 손실\n4. 영양 강화 빵\n5. 연습문제 3개" },

    // 토픽5: 무기질과 물 (10문항)
    { id: 41, topic: "topic5", question: "칼슘의 주요 기능은?", answer: "뼈와 치아 형성, 근육 수축 - 체내에서 가장 많은 무기질입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 칼슘의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 칼슘의 기능\n2. 급원 식품\n3. 흡수에 영향을 미치는 요인\n4. 빵의 칼슘 강화\n5. 연습문제 3개" },
    { id: 42, topic: "topic5", question: "철분 결핍 시 나타나는 증상은?", answer: "빈혈 - 헤모글로빈 합성에 필수적입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 철분 결핍 시 나타나는 증상은?\n\n다음 순서로 설명해주세요:\n1. 철분의 기능\n2. 결핍 증상\n3. 급원 식품\n4. 흡수 촉진 요인\n5. 연습문제 3개" },
    { id: 43, topic: "topic5", question: "나트륨 과잉 섭취의 문제점은?", answer: "고혈압, 부종 - 한국인의 나트륨 섭취량은 권장량의 2배 이상입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 나트륨 과잉 섭취의 문제점은?\n\n다음 순서로 설명해주세요:\n1. 나트륨의 기능\n2. 과잉 섭취의 문제\n3. 권장 섭취량\n4. 저염 빵 제조\n5. 연습문제 3개" },
    { id: 44, topic: "topic5", question: "아연의 결핍 증상은?", answer: "미각 저하, 성장 지연 - 효소의 구성 성분으로 중요합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 아연의 결핍 증상은?\n\n다음 순서로 설명해주세요:\n1. 아연의 기능\n2. 결핍 증상\n3. 급원 식품\n4. 통곡물과 아연\n5. 연습문제 3개" },
    { id: 45, topic: "topic5", question: "요오드의 결핍으로 발생하는 질환은?", answer: "갑상선종 - 갑상선 호르몬 합성에 필수적입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 요오드의 결핍으로 발생하는 질환은?\n\n다음 순서로 설명해주세요:\n1. 요오드의 기능\n2. 결핍 증상\n3. 급원 식품\n4. 요오드 강화 소금\n5. 연습문제 3개" },
    { id: 46, topic: "topic5", question: "칼륨의 주요 기능은?", answer: "삼투압 조절, 근육 수축 - 나트륨과 균형을 이룹니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 칼륨의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 칼륨의 기능\n2. 나트륨과의 관계\n3. 급원 식품\n4. 채소·과일 빵\n5. 연습문제 3개" },
    { id: 47, topic: "topic5", question: "인의 주요 기능은?", answer: "뼈 형성, ATP 구성 - 칼슘과 함께 뼈를 구성합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 인의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 인의 기능\n2. 칼슘과의 비율\n3. 급원 식품\n4. 가공식품과 인\n5. 연습문제 3개" },
    { id: 48, topic: "topic5", question: "물의 체내 기능이 아닌 것은?", answer: "열량 공급 - 물은 열량을 내지 않습니다. 영양소 운반, 체온 조절 등이 기능입니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 물의 체내 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 물의 기능\n2. 하루 필요량\n3. 탈수의 증상\n4. 수분 섭취의 중요성\n5. 연습문제 3개" },
    { id: 49, topic: "topic5", question: "성인의 1일 물 필요량은?", answer: "약 2-2.5L - 음식을 통해 약 1L, 음료로 1-1.5L를 섭취합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 성인의 1일 물 필요량은?\n\n다음 순서로 설명해주세요:\n1. 물 필요량 산정\n2. 섭취 경로\n3. 필요량에 영향을 미치는 요인\n4. 적절한 수분 섭취\n5. 연습문제 3개" },
    { id: 50, topic: "topic5", question: "셀레늄의 기능은?", answer: "항산화 - 비타민 E와 함께 세포를 보호합니다.", prompt: "제빵기능사 영양학 문제입니다.\n\n문제: 셀레늄의 기능은?\n\n다음 순서로 설명해주세요:\n1. 셀레늄의 기능\n2. 항산화 메커니즘\n3. 급원 식품\n4. 권장 섭취량\n5. 연습문제 3개" },
  ];

  const topics = [
    { id: "topic1", name: "탄수화물", icon: "🍞", count: 10 },
    { id: "topic2", name: "단백질", icon: "🥩", count: 10 },
    { id: "topic3", name: "지방", icon: "🧈", count: 10 },
    { id: "topic4", name: "비타민", icon: "💊", count: 10 },
    { id: "topic5", name: "무기질과 물", icon: "💧", count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-orange-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">영양학</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🥗</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">영양학</h1>
              <p className="text-orange-100">제빵기능사 필기시험 핵심 과목</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-orange-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedQuestions.length} / {questions.length} 문항 완료
          </p>
        </div>

        {/* 토픽별 문제 */}
        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                    {topic.count}문항
                  </span>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    expandedTopics.includes(topic.id) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-6 space-y-4">
                  {questions
                    .filter((q) => q.topic === topic.id)
                    .map((q) => (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border-2 transition ${
                          completedQuestions.includes(q.id)
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${
                              completedQuestions.includes(q.id)
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {completedQuestions.includes(q.id) && (
                              <svg className="w-full h-full p-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">
                              {q.id}. {q.question}
                            </p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              💡 {q.answer}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setCurrentPrompt(q.prompt);
                              setShowAIModal(true);
                            }}
                            className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
                          >
                            🤖 AI
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/category/service/bakery/study/food-science"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전: 식품학
          </Link>
          <Link
            href="/category/service/bakery/study/baking-theory"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition font-medium"
          >
            다음: 제빵이론
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* AI 선택 모달 */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 UTTEC 자격시험 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
