"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FoodScienceStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["topic1"]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bakery-food-science-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bakery-food-science-completed", JSON.stringify(completedQuestions));
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
    // 토픽1: 밀가루와 전분 (10문항)
    { id: 1, topic: "topic1", question: "밀가루의 주성분 중 가장 많은 것은?", answer: "전분(약 70-75%) - 밀가루는 전분이 주성분이고, 단백질 8-14%, 수분 12-14%를 함유합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 밀가루의 주성분 중 가장 많은 것은?\n\n다음 순서로 설명해주세요:\n1. 밀가루의 성분 구성\n2. 전분의 역할\n3. 단백질 함량에 따른 밀가루 분류\n4. 제빵에서의 중요성\n5. 연습문제 3개" },
    { id: 2, topic: "topic1", question: "강력분의 단백질 함량은?", answer: "12-14% - 글루텐 형성력이 높아 식빵, 바게트 등에 적합합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 강력분의 단백질 함량은?\n\n다음 순서로 설명해주세요:\n1. 밀가루 종류별 단백질 함량\n2. 강력분의 특성\n3. 적합한 제품 종류\n4. 중력분, 박력분과의 비교\n5. 연습문제 3개" },
    { id: 3, topic: "topic1", question: "글루텐을 형성하는 단백질은?", answer: "글리아딘과 글루테닌 - 물과 함께 믹싱하면 글루텐 네트워크가 형성됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 글루텐을 형성하는 단백질은?\n\n다음 순서로 설명해주세요:\n1. 글리아딘의 특성 (점성)\n2. 글루테닌의 특성 (탄성)\n3. 글루텐 형성 과정\n4. 제빵에서 글루텐의 역할\n5. 연습문제 3개" },
    { id: 4, topic: "topic1", question: "밀가루의 회분 함량이 높으면?", answer: "등급이 낮음 - 회분은 밀의 외피 성분으로, 함량이 높을수록 색이 어둡습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 밀가루의 회분 함량이 높으면?\n\n다음 순서로 설명해주세요:\n1. 회분의 정의\n2. 회분과 등급의 관계\n3. 제빵에 미치는 영향\n4. 용도별 적정 회분 함량\n5. 연습문제 3개" },
    { id: 5, topic: "topic1", question: "전분의 호화(gelatinization) 온도는?", answer: "55-70°C - 전분 입자가 물을 흡수하여 팽윤하고 점성이 증가합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 전분의 호화(gelatinization) 온도는?\n\n다음 순서로 설명해주세요:\n1. 호화의 정의와 과정\n2. 호화 온도에 영향을 미치는 요인\n3. 제빵에서 호화의 중요성\n4. 호화와 노화의 관계\n5. 연습문제 3개" },
    { id: 6, topic: "topic1", question: "전분의 노화(retrogradation)를 촉진하는 요인은?", answer: "저온(0-4°C), 수분 30-60% - 냉장 보관 시 빵이 빨리 굳는 이유입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 전분의 노화(retrogradation)를 촉진하는 요인은?\n\n다음 순서로 설명해주세요:\n1. 노화의 정의와 원리\n2. 노화 촉진 요인\n3. 노화 억제 방법\n4. 빵 보관 방법과의 관계\n5. 연습문제 3개" },
    { id: 7, topic: "topic1", question: "아밀로스와 아밀로펙틴의 차이점은?", answer: "구조 - 아밀로스는 직쇄상, 아밀로펙틴은 분지상 구조입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 아밀로스와 아밀로펙틴의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 아밀로스의 구조와 특성\n2. 아밀로펙틴의 구조와 특성\n3. 비율에 따른 전분의 특성\n4. 제빵에서의 영향\n5. 연습문제 3개" },
    { id: 8, topic: "topic1", question: "밀가루의 숙성 효과는?", answer: "글루텐 강화, 색상 개선 - 제분 후 2-4주 숙성하면 품질이 향상됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 밀가루의 숙성 효과는?\n\n다음 순서로 설명해주세요:\n1. 숙성의 원리\n2. 숙성에 따른 변화\n3. 인공 숙성제\n4. 제빵 품질과의 관계\n5. 연습문제 3개" },
    { id: 9, topic: "topic1", question: "밀가루의 손상전분이 많으면?", answer: "수분 흡수율 증가 - 손상전분은 물을 빨리 흡수하여 반죽 특성에 영향을 줍니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 밀가루의 손상전분이 많으면?\n\n다음 순서로 설명해주세요:\n1. 손상전분의 정의\n2. 제분 과정과 손상전분\n3. 제빵에 미치는 영향\n4. 적정 손상전분 함량\n5. 연습문제 3개" },
    { id: 10, topic: "topic1", question: "밀가루의 pH가 낮으면?", answer: "발효 촉진 - 약산성(pH 5.5-6.0)에서 이스트 활성이 좋습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 밀가루의 pH가 낮으면?\n\n다음 순서로 설명해주세요:\n1. 밀가루의 정상 pH 범위\n2. pH와 발효의 관계\n3. pH 조절 방법\n4. 제빵에서의 최적 pH\n5. 연습문제 3개" },

    // 토픽2: 이스트와 발효 (10문항)
    { id: 11, topic: "topic2", question: "제빵용 이스트의 학명은?", answer: "Saccharomyces cerevisiae - 빵효모로 알코올 발효를 수행합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 제빵용 이스트의 학명은?\n\n다음 순서로 설명해주세요:\n1. 이스트의 분류\n2. 빵효모의 특성\n3. 발효 과정\n4. 다른 효모와의 차이\n5. 연습문제 3개" },
    { id: 12, topic: "topic2", question: "이스트 발효의 최적 온도는?", answer: "27-30°C - 이 온도에서 이스트 활성이 가장 좋습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 이스트 발효의 최적 온도는?\n\n다음 순서로 설명해주세요:\n1. 이스트의 온도 민감성\n2. 온도에 따른 발효 속도\n3. 과발효와 저발효\n4. 발효실 온도 관리\n5. 연습문제 3개" },
    { id: 13, topic: "topic2", question: "이스트 발효 시 생성되는 가스는?", answer: "이산화탄소(CO₂) - 글루텐 네트워크에 포집되어 빵을 부풀립니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 이스트 발효 시 생성되는 가스는?\n\n다음 순서로 설명해주세요:\n1. 알코올 발효 반응식\n2. CO₂의 역할\n3. 발효 부산물 (에탄올 등)\n4. 가스 보유력과 빵 품질\n5. 연습문제 3개" },
    { id: 14, topic: "topic2", question: "생이스트와 인스턴트 드라이이스트의 사용량 비율은?", answer: "3:1 - 인스턴트 드라이이스트는 생이스트의 1/3 양을 사용합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 생이스트와 인스턴트 드라이이스트의 사용량 비율은?\n\n다음 순서로 설명해주세요:\n1. 이스트 종류별 특성\n2. 사용량 환산법\n3. 각 이스트의 활성화 방법\n4. 보관 방법과 유의사항\n5. 연습문제 3개" },
    { id: 15, topic: "topic2", question: "이스트가 분해하는 당의 순서는?", answer: "포도당→과당→자당→맥아당 - 단당류를 먼저 분해합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 이스트가 분해하는 당의 순서는?\n\n다음 순서로 설명해주세요:\n1. 이스트의 당 분해 효소\n2. 각 당류의 분해 속도\n3. 발효 시간과의 관계\n4. 당 사용량 조절\n5. 연습문제 3개" },
    { id: 16, topic: "topic2", question: "발효 시 pH 변화는?", answer: "점점 낮아짐 (산성화) - 유기산 생성으로 pH가 감소합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 발효 시 pH 변화는?\n\n다음 순서로 설명해주세요:\n1. 발효 중 생성되는 산\n2. pH 변화 양상\n3. pH와 풍미의 관계\n4. 과발효시 문제점\n5. 연습문제 3개" },
    { id: 17, topic: "topic2", question: "소금이 발효에 미치는 영향은?", answer: "발효 억제 - 삼투압 작용으로 이스트 활성을 억제합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 소금이 발효에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 소금의 삼투압 작용\n2. 적정 사용량\n3. 무염 반죽의 특성\n4. 소금 첨가 시점\n5. 연습문제 3개" },
    { id: 18, topic: "topic2", question: "설탕 농도가 15% 이상이면?", answer: "발효 억제 - 고농도 당은 삼투압으로 이스트를 억제합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 설탕 농도가 15% 이상이면?\n\n다음 순서로 설명해주세요:\n1. 당과 삼투압의 관계\n2. 이스트의 내당성\n3. 고당도 제품의 제조법\n4. 내당성 이스트\n5. 연습문제 3개" },
    { id: 19, topic: "topic2", question: "발효의 종점을 판단하는 방법은?", answer: "핑거테스트 - 손가락으로 눌러 들어간 자국이 천천히 돌아오면 적정 발효입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 발효의 종점을 판단하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핑거테스트 방법\n2. 시각적 판단 기준\n3. 과발효/저발효 판단\n4. 발효 시간 조절\n5. 연습문제 3개" },
    { id: 20, topic: "topic2", question: "2차 발효(벤치타임)의 목적은?", answer: "글루텐 이완 - 분할 후 손상된 글루텐 구조를 회복시킵니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 2차 발효(벤치타임)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 벤치타임의 정의\n2. 글루텐 이완의 원리\n3. 적정 시간\n4. 성형에 미치는 영향\n5. 연습문제 3개" },

    // 토픽3: 유지류 (10문항)
    { id: 21, topic: "topic3", question: "제빵에 사용되는 유지류의 주요 기능은?", answer: "쇼트닝성, 노화 지연, 풍미 부여 - 글루텐 사이에 유막을 형성합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 제빵에 사용되는 유지류의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 쇼트닝성의 정의\n2. 노화 지연 원리\n3. 유지류 종류별 특성\n4. 적정 사용량\n5. 연습문제 3개" },
    { id: 22, topic: "topic3", question: "버터의 유지방 함량은?", answer: "80% 이상 - 나머지는 수분, 유단백, 유당 등입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 버터의 유지방 함량은?\n\n다음 순서로 설명해주세요:\n1. 버터의 정의와 성분\n2. 가공버터와의 차이\n3. 제빵에서의 역할\n4. 보관 방법\n5. 연습문제 3개" },
    { id: 23, topic: "topic3", question: "쇼트닝의 특징은?", answer: "무수지방, 무미무취 - 수분이 없어 저장성이 좋고 풍미에 영향이 적습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 쇼트닝의 특징은?\n\n다음 순서로 설명해주세요:\n1. 쇼트닝의 정의\n2. 버터와의 비교\n3. 제빵에서의 용도\n4. 트랜스지방 문제\n5. 연습문제 3개" },
    { id: 24, topic: "topic3", question: "마가린의 수분 함량은?", answer: "약 16-18% - 버터를 모방하여 만든 유지 가공품입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 마가린의 수분 함량은?\n\n다음 순서로 설명해주세요:\n1. 마가린의 정의와 성분\n2. 버터와의 차이\n3. 제빵 마가린의 특성\n4. 선택 시 고려사항\n5. 연습문제 3개" },
    { id: 25, topic: "topic3", question: "유지의 산패를 촉진하는 요인이 아닌 것은?", answer: "저온 - 빛, 공기, 고온, 금속이 산패를 촉진합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 유지의 산패를 촉진하는 요인이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 산패의 정의와 종류\n2. 산패 촉진 요인\n3. 산패 방지 방법\n4. 유지 보관 조건\n5. 연습문제 3개" },
    { id: 26, topic: "topic3", question: "가소성(plasticity) 범위란?", answer: "유지가 성형 가능한 온도 범위 - 버터는 13-18°C가 적정합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 가소성(plasticity) 범위란?\n\n다음 순서로 설명해주세요:\n1. 가소성의 정의\n2. 유지별 가소성 범위\n3. 파이, 크로와상에서의 중요성\n4. 온도 관리 방법\n5. 연습문제 3개" },
    { id: 27, topic: "topic3", question: "유지의 크리밍성이란?", answer: "공기 포집 능력 - 교반 시 공기를 품어 부피가 증가하는 성질입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 유지의 크리밍성이란?\n\n다음 순서로 설명해주세요:\n1. 크리밍성의 정의\n2. 케이크 제조에서의 역할\n3. 크리밍에 영향을 미치는 요인\n4. 좋은 크리밍의 조건\n5. 연습문제 3개" },
    { id: 28, topic: "topic3", question: "롤인 유지(roll-in fat)의 용도는?", answer: "층 형성 - 크로와상, 페이스트리 등에서 층을 만드는 데 사용합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 롤인 유지(roll-in fat)의 용도는?\n\n다음 순서로 설명해주세요:\n1. 롤인 유지의 정의\n2. 층 형성 원리\n3. 필요한 특성 (가소성, 융점)\n4. 작업 시 온도 관리\n5. 연습문제 3개" },
    { id: 29, topic: "topic3", question: "유지의 발연점이란?", answer: "가열 시 연기가 발생하는 온도 - 튀김유 선택의 기준이 됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 유지의 발연점이란?\n\n다음 순서로 설명해주세요:\n1. 발연점의 정의\n2. 유지별 발연점\n3. 도넛 튀김유 선택\n4. 발연점 저하 원인\n5. 연습문제 3개" },
    { id: 30, topic: "topic3", question: "유화의 종류 중 W/O형은?", answer: "유중수적형 - 기름 속에 물이 분산된 형태로 버터, 마가린이 해당됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 유화의 종류 중 W/O형은?\n\n다음 순서로 설명해주세요:\n1. 유화의 정의\n2. W/O형과 O/W형의 차이\n3. 식품별 유화 형태\n4. 유화제의 역할\n5. 연습문제 3개" },

    // 토픽4: 당류와 유제품 (10문항)
    { id: 31, topic: "topic4", question: "제빵에서 설탕의 주요 기능이 아닌 것은?", answer: "글루텐 강화 - 설탕은 글루텐을 약화시킵니다. 이스트 영양원, 갈변, 보습 등이 주 기능입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 제빵에서 설탕의 주요 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 설탕의 기능들\n2. 이스트 영양원으로서의 역할\n3. 캐러멜화와 마이야르 반응\n4. 글루텐에 미치는 영향\n5. 연습문제 3개" },
    { id: 32, topic: "topic4", question: "물엿의 주성분은?", answer: "맥아당(말토스) - 전분을 산이나 효소로 분해하여 제조합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 물엿의 주성분은?\n\n다음 순서로 설명해주세요:\n1. 물엿의 제조법\n2. 성분 구성 (DE값)\n3. 제빵에서의 역할\n4. 설탕과의 차이\n5. 연습문제 3개" },
    { id: 33, topic: "topic4", question: "전화당이란?", answer: "설탕을 가수분해한 것 - 포도당과 과당 혼합물로 감미도가 높습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 전화당이란?\n\n다음 순서로 설명해주세요:\n1. 전화당의 정의\n2. 제조 방법\n3. 특성과 용도\n4. 결정화 방지 효과\n5. 연습문제 3개" },
    { id: 34, topic: "topic4", question: "당류 중 감미도가 가장 높은 것은?", answer: "과당 - 설탕을 100으로 할 때 과당은 173 정도입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 당류 중 감미도가 가장 높은 것은?\n\n다음 순서로 설명해주세요:\n1. 감미도의 정의\n2. 당류별 감미도 비교\n3. 과당의 특성\n4. 제빵에서의 활용\n5. 연습문제 3개" },
    { id: 35, topic: "topic4", question: "꿀의 주성분은?", answer: "포도당과 과당 - 전화당과 유사한 조성으로 결정화가 어렵습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 꿀의 주성분은?\n\n다음 순서로 설명해주세요:\n1. 꿀의 성분 구성\n2. 특성과 효능\n3. 제빵에서의 역할\n4. 보관과 결정화\n5. 연습문제 3개" },
    { id: 36, topic: "topic4", question: "우유의 유당 함량은?", answer: "약 4.5% - 유당은 유산균 발효의 기질이 됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 우유의 유당 함량은?\n\n다음 순서로 설명해주세요:\n1. 우유의 성분 구성\n2. 유당의 특성\n3. 제빵에서의 역할 (갈변)\n4. 유당불내증과 대체재\n5. 연습문제 3개" },
    { id: 37, topic: "topic4", question: "탈지분유를 사용하는 이유는?", answer: "영양 강화, 갈변, 저장성 - 지방이 제거되어 산패 위험이 낮습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 탈지분유를 사용하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 탈지분유의 제조법\n2. 전지분유와의 차이\n3. 제빵에서의 기능\n4. 사용량과 환산법\n5. 연습문제 3개" },
    { id: 38, topic: "topic4", question: "생크림의 유지방 함량은?", answer: "35% 이상 - 휘핑용 생크림은 유지방 35-40%가 적합합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 생크림의 유지방 함량은?\n\n다음 순서로 설명해주세요:\n1. 생크림의 분류\n2. 휘핑 크림의 조건\n3. 휘핑 원리\n4. 보관과 사용 팁\n5. 연습문제 3개" },
    { id: 39, topic: "topic4", question: "연유의 종류 중 가당연유의 특징은?", answer: "설탕 첨가로 보존성 향상 - 설탕이 40-45% 함유되어 있습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 연유의 종류 중 가당연유의 특징은?\n\n다음 순서로 설명해주세요:\n1. 연유의 종류\n2. 가당연유의 제조법\n3. 무당연유와의 비교\n4. 제빵에서의 활용\n5. 연습문제 3개" },
    { id: 40, topic: "topic4", question: "치즈의 숙성 중 일어나는 변화는?", answer: "단백질 분해, 풍미 발달 - 숙성 효소와 미생물에 의해 진행됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 치즈의 숙성 중 일어나는 변화는?\n\n다음 순서로 설명해주세요:\n1. 치즈 숙성의 원리\n2. 숙성에 따른 변화\n3. 치즈 종류별 특성\n4. 제빵용 치즈 선택\n5. 연습문제 3개" },

    // 토픽5: 계란과 기타 재료 (10문항)
    { id: 41, topic: "topic5", question: "계란의 기포성을 나타내는 부분은?", answer: "난백(흰자) - 오보알부민 등 단백질이 기포를 형성합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 계란의 기포성을 나타내는 부분은?\n\n다음 순서로 설명해주세요:\n1. 난백의 구성 성분\n2. 기포 형성 원리\n3. 머랭 제조와의 관계\n4. 기포성에 영향을 미치는 요인\n5. 연습문제 3개" },
    { id: 42, topic: "topic5", question: "계란의 유화성을 나타내는 성분은?", answer: "레시틴 - 난황에 함유된 인지질로 유화제 역할을 합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 계란의 유화성을 나타내는 성분은?\n\n다음 순서로 설명해주세요:\n1. 레시틴의 구조\n2. 유화 작용 원리\n3. 마요네즈, 케이크에서의 역할\n4. 난황의 기타 기능\n5. 연습문제 3개" },
    { id: 43, topic: "topic5", question: "계란의 열응고 온도는?", answer: "난백 62-65°C, 난황 65-70°C - 난백이 먼저 응고됩니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 계란의 열응고 온도는?\n\n다음 순서로 설명해주세요:\n1. 단백질 응고의 원리\n2. 난백과 난황의 응고 온도\n3. 제빵에서의 활용\n4. 응고에 영향을 미치는 요인\n5. 연습문제 3개" },
    { id: 44, topic: "topic5", question: "계란의 신선도 판정법 중 비중법의 원리는?", answer: "기실 크기 증가 - 저장 중 수분 증발로 기실이 커져 비중이 낮아집니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 계란의 신선도 판정법 중 비중법의 원리는?\n\n다음 순서로 설명해주세요:\n1. 비중법의 원리\n2. 소금물 농도별 판정\n3. 기타 신선도 판정법\n4. 신선한 계란의 특성\n5. 연습문제 3개" },
    { id: 45, topic: "topic5", question: "소금의 제빵에서의 기능이 아닌 것은?", answer: "발효 촉진 - 소금은 발효를 억제하며, 글루텐 강화, 풍미 부여, 잡균 억제가 주 기능입니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 소금의 제빵에서의 기능이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 소금의 주요 기능\n2. 글루텐에 미치는 영향\n3. 발효 억제 원리\n4. 적정 사용량\n5. 연습문제 3개" },
    { id: 46, topic: "topic5", question: "물의 경도가 제빵에 미치는 영향은?", answer: "경수는 글루텐 강화, 연수는 글루텐 약화 - 적당한 경도(50-100ppm)가 좋습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 물의 경도가 제빵에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 경도의 정의\n2. 경수와 연수의 특성\n3. 제빵에 미치는 영향\n4. 물 관리 방법\n5. 연습문제 3개" },
    { id: 47, topic: "topic5", question: "팽창제 중 베이킹파우더의 특징은?", answer: "이중반응형 - 반죽 시와 가열 시 두 번에 걸쳐 가스를 발생시킵니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 팽창제 중 베이킹파우더의 특징은?\n\n다음 순서로 설명해주세요:\n1. 베이킹파우더의 구성\n2. 반응 원리\n3. 베이킹소다와의 차이\n4. 사용량과 주의사항\n5. 연습문제 3개" },
    { id: 48, topic: "topic5", question: "코코아 파우더의 더치 프로세스란?", answer: "알칼리 처리 - pH를 높여 색상을 어둡게 하고 풍미를 부드럽게 합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 코코아 파우더의 더치 프로세스란?\n\n다음 순서로 설명해주세요:\n1. 더치 프로세스의 정의\n2. 처리 방법과 효과\n3. 천연 코코아와의 비교\n4. 용도별 선택\n5. 연습문제 3개" },
    { id: 49, topic: "topic5", question: "견과류의 산패 방지 방법은?", answer: "냉동 보관, 밀봉 - 불포화지방산이 많아 산패되기 쉽습니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 견과류의 산패 방지 방법은?\n\n다음 순서로 설명해주세요:\n1. 견과류의 지방 특성\n2. 산패의 원인\n3. 보관 방법\n4. 제빵에서의 활용\n5. 연습문제 3개" },
    { id: 50, topic: "topic5", question: "향신료의 보관 방법으로 옳은 것은?", answer: "밀폐, 냉암소 보관 - 빛, 열, 습기에 의해 향이 감소합니다.", prompt: "제빵기능사 식품학 문제입니다.\n\n문제: 향신료의 보관 방법으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 향신료의 휘발성\n2. 보관 조건\n3. 제빵용 향신료 종류\n4. 사용량 조절\n5. 연습문제 3개" },
  ];

  const topics = [
    { id: "topic1", name: "밀가루와 전분", icon: "🌾", count: 10 },
    { id: "topic2", name: "이스트와 발효", icon: "🦠", count: 10 },
    { id: "topic3", name: "유지류", icon: "🧈", count: 10 },
    { id: "topic4", name: "당류와 유제품", icon: "🥛", count: 10 },
    { id: "topic5", name: "계란과 기타 재료", icon: "🥚", count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-green-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">식품학</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🧬</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">식품학</h1>
              <p className="text-green-100">제빵기능사 필기시험 핵심 과목</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-green-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
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
                            : "border-gray-200 hover:border-green-300"
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
                            className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition"
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
            href="/category/service/bakery/study/food-hygiene"
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전: 식품위생학
          </Link>
          <Link
            href="/category/service/bakery/study/nutrition"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
          >
            다음: 영양학
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* AI 선택 모달 */}
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
