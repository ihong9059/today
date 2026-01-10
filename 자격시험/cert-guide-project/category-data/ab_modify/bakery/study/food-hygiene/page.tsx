"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FoodHygieneStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["topic1"]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bakery-food-hygiene-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bakery-food-hygiene-completed", JSON.stringify(completedQuestions));
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
    // 토픽1: 식품위생 개론 (10문항)
    { id: 1, topic: "topic1", question: "식품위생의 정의에서 '식품'에 해당하지 않는 것은?", answer: "의약품 - 식품위생법에서 의약품은 식품에서 제외됩니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생의 정의에서 '식품'에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 식품위생법상 식품의 정의\n2. 식품에서 제외되는 것들\n3. 의약품과 식품의 구분 기준\n4. 관련 예시\n5. 연습문제 3개" },
    { id: 2, topic: "topic1", question: "식품위생의 3대 요소가 아닌 것은?", answer: "경제성 - 식품위생 3대 요소는 안전성, 건전성, 완전무결성입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생의 3대 요소가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 식품위생의 3대 요소 정의\n2. 안전성, 건전성, 완전무결성 각각의 의미\n3. 제빵 산업에서의 적용 예시\n4. 경제성이 포함되지 않는 이유\n5. 연습문제 3개" },
    { id: 3, topic: "topic1", question: "WHO에서 정의한 식품위생의 대상 범위는?", answer: "생산부터 섭취까지 전 과정 - 재배, 생산, 제조, 가공, 저장, 운반, 판매, 섭취 전 단계를 포함합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: WHO에서 정의한 식품위생의 대상 범위는?\n\n다음 순서로 설명해주세요:\n1. WHO 식품위생 정의\n2. 각 단계별 위생 관리 포인트\n3. 제빵 산업에서의 적용\n4. 국내 식품위생법과의 비교\n5. 연습문제 3개" },
    { id: 4, topic: "topic1", question: "식품위생법의 목적으로 가장 적합한 것은?", answer: "국민보건 향상과 증진 - 식품으로 인한 위생상의 위해를 방지하고 국민건강을 보호합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생법의 목적으로 가장 적합한 것은?\n\n다음 순서로 설명해주세요:\n1. 식품위생법의 제정 목적\n2. 법률의 주요 내용\n3. 제빵업체에 적용되는 조항\n4. 위반시 제재 내용\n5. 연습문제 3개" },
    { id: 5, topic: "topic1", question: "식품의 변질을 일으키는 주요 요인이 아닌 것은?", answer: "냉장 - 냉장은 변질을 억제하는 요인이며, 미생물, 효소, 산화가 주요 변질 요인입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 변질을 일으키는 주요 요인이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 식품 변질의 3대 요인\n2. 미생물에 의한 변질 과정\n3. 효소에 의한 변질 과정\n4. 빵류 제품의 변질 방지법\n5. 연습문제 3개" },
    { id: 6, topic: "topic1", question: "식품의 부패와 발효의 차이점은?", answer: "인체 유해 여부 - 부패는 유해물질 생성, 발효는 유익한 물질을 생성합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 부패와 발효의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 부패의 정의와 과정\n2. 발효의 정의와 과정\n3. 제빵에서 발효의 중요성\n4. 부패 방지를 위한 위생 관리\n5. 연습문제 3개" },
    { id: 7, topic: "topic1", question: "식품첨가물의 사용 목적으로 적합하지 않은 것은?", answer: "영양가 증가 - 식품첨가물은 보존, 품질개량, 기호성 향상이 주 목적입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품첨가물의 사용 목적으로 적합하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 식품첨가물의 정의\n2. 사용 목적별 분류\n3. 제빵에 사용되는 주요 첨가물\n4. 사용 기준 및 제한\n5. 연습문제 3개" },
    { id: 8, topic: "topic1", question: "식품위생 관리의 기본 원칙 중 '청결'에 해당하는 것은?", answer: "손 씻기, 작업복 착용, 작업장 청소 - 개인위생과 환경위생 모두 포함됩니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생 관리의 기본 원칙 중 '청결'에 해당하는 것은?\n\n다음 순서로 설명해주세요:\n1. 청결의 정의와 범위\n2. 개인위생 관리 방법\n3. 작업장 위생 관리 방법\n4. 제빵 작업시 청결 체크리스트\n5. 연습문제 3개" },
    { id: 9, topic: "topic1", question: "식품의 안전성 확보를 위한 기본 조건이 아닌 것은?", answer: "저렴한 가격 - 안전성은 위생적 취급, 적절한 보관, 유해물질 부재가 기본 조건입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 안전성 확보를 위한 기본 조건이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 식품 안전성의 정의\n2. 안전성 확보 조건\n3. 제빵제품의 안전성 관리\n4. 관련 법규와 기준\n5. 연습문제 3개" },
    { id: 10, topic: "topic1", question: "식품위생 교육의 주기로 올바른 것은?", answer: "매년 - 식품위생법상 식품위생 교육은 연 1회 이상 받아야 합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생 교육의 주기로 올바른 것은?\n\n다음 순서로 설명해주세요:\n1. 식품위생 교육의 법적 근거\n2. 교육 대상자와 주기\n3. 교육 내용\n4. 미이수시 제재 사항\n5. 연습문제 3개" },

    // 토픽2: 미생물과 식품위생 (10문항)
    { id: 11, topic: "topic2", question: "세균의 증식에 필요한 조건이 아닌 것은?", answer: "빛 - 세균 증식에는 영양분, 수분, 적절한 온도, pH가 필요하며 빛은 필수 조건이 아닙니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 세균의 증식에 필요한 조건이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 세균 증식의 필수 조건\n2. 각 조건별 최적 범위\n3. 빵류에서의 세균 관리\n4. 세균 억제 방법\n5. 연습문제 3개" },
    { id: 12, topic: "topic2", question: "식중독 세균 중 열에 가장 강한 것은?", answer: "보툴리누스균 - 내열성 포자를 형성하여 100°C에서도 수 시간 생존합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식중독 세균 중 열에 가장 강한 것은?\n\n다음 순서로 설명해주세요:\n1. 보툴리누스균의 특성\n2. 내열성 포자의 원리\n3. 살균 조건\n4. 제빵에서의 예방법\n5. 연습문제 3개" },
    { id: 13, topic: "topic2", question: "살모넬라 식중독의 주요 원인 식품은?", answer: "계란, 가금류 - 살모넬라균은 닭, 오리 등 가금류와 계란에서 주로 검출됩니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 살모넬라 식중독의 주요 원인 식품은?\n\n다음 순서로 설명해주세요:\n1. 살모넬라균의 특성\n2. 주요 오염 경로\n3. 제빵에서 계란 사용시 주의사항\n4. 예방 대책\n5. 연습문제 3개" },
    { id: 14, topic: "topic2", question: "황색포도상구균 식중독의 특징은?", answer: "독소형 식중독 - 균이 생산한 독소(엔테로톡신)에 의해 발생하며, 독소는 열에 강합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 황색포도상구균 식중독의 특징은?\n\n다음 순서로 설명해주세요:\n1. 황색포도상구균의 특성\n2. 엔테로톡신의 특성\n3. 주요 오염 경로 (화농성 상처)\n4. 제빵 작업시 예방법\n5. 연습문제 3개" },
    { id: 15, topic: "topic2", question: "대장균군 검사의 의미는?", answer: "분변 오염의 지표 - 대장균군은 분변 오염의 지표 세균으로 위생 상태를 판단합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 대장균군 검사의 의미는?\n\n다음 순서로 설명해주세요:\n1. 대장균군의 정의\n2. 지표 세균의 의미\n3. 검사 방법과 기준\n4. 제빵 제품의 위생 기준\n5. 연습문제 3개" },
    { id: 16, topic: "topic2", question: "곰팡이가 생산하는 독소는?", answer: "마이코톡신 - 아플라톡신, 오크라톡신 등이 대표적인 곰팡이 독소입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 곰팡이가 생산하는 독소는?\n\n다음 순서로 설명해주세요:\n1. 마이코톡신의 정의와 종류\n2. 아플라톡신의 특성과 위험성\n3. 곰팡이 오염 경로\n4. 빵류의 곰팡이 방지법\n5. 연습문제 3개" },
    { id: 17, topic: "topic2", question: "세균의 증식 곡선에서 대수기(log phase)의 특징은?", answer: "가장 빠른 증식 - 영양분이 풍부하고 조건이 최적일 때 기하급수적으로 증식합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 세균의 증식 곡선에서 대수기(log phase)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 세균 증식 곡선의 4단계\n2. 대수기의 특성\n3. 식품 보관과의 관계\n4. 빵류 제품의 유통기한 설정\n5. 연습문제 3개" },
    { id: 18, topic: "topic2", question: "저온 살균법(파스퇴르법)의 온도 조건은?", answer: "62~65°C, 30분 - 영양소 파괴를 최소화하면서 병원균을 사멸시킵니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 저온 살균법(파스퇴르법)의 온도 조건은?\n\n다음 순서로 설명해주세요:\n1. 저온 살균법의 원리\n2. 적용 식품과 효과\n3. 고온 살균법과의 비교\n4. 제빵에서의 살균 적용\n5. 연습문제 3개" },
    { id: 19, topic: "topic2", question: "식품의 수분활성도(Aw)가 낮으면?", answer: "미생물 증식 억제 - Aw 0.6 이하에서는 대부분의 미생물이 증식하지 못합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 수분활성도(Aw)가 낮으면?\n\n다음 순서로 설명해주세요:\n1. 수분활성도의 정의\n2. 미생물별 최저 Aw\n3. 빵류 제품의 Aw 관리\n4. 보존성 향상 방법\n5. 연습문제 3개" },
    { id: 20, topic: "topic2", question: "노로바이러스 식중독의 특징은?", answer: "겨울철 발생, 분변-구강 감염 - 85°C 1분 이상 가열, 손 씻기로 예방합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 노로바이러스 식중독의 특징은?\n\n다음 순서로 설명해주세요:\n1. 노로바이러스의 특성\n2. 감염 경로\n3. 증상과 잠복기\n4. 제빵 작업시 예방법\n5. 연습문제 3개" },

    // 토픽3: 식품첨가물 (10문항)
    { id: 21, topic: "topic3", question: "식품첨가물의 정의로 올바른 것은?", answer: "식품 제조·가공·보존 등에 사용되는 물질 - 식품위생법에 따라 지정된 물질만 사용 가능합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품첨가물의 정의로 올바른 것은?\n\n다음 순서로 설명해주세요:\n1. 식품첨가물의 법적 정의\n2. 지정 첨가물과 일반 첨가물\n3. 제빵용 첨가물 종류\n4. 사용 기준과 제한\n5. 연습문제 3개" },
    { id: 22, topic: "topic3", question: "제빵에 사용되는 보존료는?", answer: "프로피온산칼슘 - 빵류의 곰팡이 발생을 억제하는 데 사용됩니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 제빵에 사용되는 보존료는?\n\n다음 순서로 설명해주세요:\n1. 프로피온산칼슘의 작용 원리\n2. 사용량과 기준\n3. 다른 보존료와 비교\n4. 빵류 보존료 사용 시 주의사항\n5. 연습문제 3개" },
    { id: 23, topic: "topic3", question: "빵의 노화 방지를 위해 사용하는 첨가물은?", answer: "유화제 - 모노글리세리드, 레시틴 등이 전분의 노화를 지연시킵니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 빵의 노화 방지를 위해 사용하는 첨가물은?\n\n다음 순서로 설명해주세요:\n1. 빵 노화의 원리\n2. 유화제의 작용 기전\n3. 주요 유화제 종류\n4. 사용량과 효과\n5. 연습문제 3개" },
    { id: 24, topic: "topic3", question: "제빵 개량제(이스트푸드)의 주성분은?", answer: "황산암모늄, 인산암모늄 - 이스트의 영양원으로 발효를 촉진합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 제빵 개량제(이스트푸드)의 주성분은?\n\n다음 순서로 설명해주세요:\n1. 이스트푸드의 정의와 역할\n2. 주요 성분과 기능\n3. 사용량과 효과\n4. 사용시 주의사항\n5. 연습문제 3개" },
    { id: 25, topic: "topic3", question: "착색료 중 타르색소가 아닌 것은?", answer: "베타카로틴 - 베타카로틴은 천연 착색료이며, 식용색소 황색4호 등이 타르색소입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 착색료 중 타르색소가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 타르색소의 정의\n2. 천연 착색료 vs 합성 착색료\n3. 제빵에 사용 가능한 착색료\n4. 사용 기준과 제한\n5. 연습문제 3개" },
    { id: 26, topic: "topic3", question: "감미료 중 당알코올에 해당하는 것은?", answer: "솔비톨, 자일리톨 - 충치 예방 효과가 있고 칼로리가 낮습니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 감미료 중 당알코올에 해당하는 것은?\n\n다음 순서로 설명해주세요:\n1. 당알코올의 정의와 종류\n2. 설탕과의 비교 (감미도, 칼로리)\n3. 제빵에서의 활용\n4. 과다 섭취 시 주의점\n5. 연습문제 3개" },
    { id: 27, topic: "topic3", question: "L-아스코르브산(비타민C)의 제빵에서의 역할은?", answer: "산화제 역할 - 글루텐 강화, 반죽 개량 효과가 있습니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: L-아스코르브산(비타민C)의 제빵에서의 역할은?\n\n다음 순서로 설명해주세요:\n1. 아스코르브산의 화학적 작용\n2. 제빵에서의 효과\n3. 적정 사용량\n4. 과다 사용시 문제점\n5. 연습문제 3개" },
    { id: 28, topic: "topic3", question: "산도조절제의 사용 목적은?", answer: "pH 조절 - 제품의 산도를 조절하여 보존성과 품질을 향상시킵니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 산도조절제의 사용 목적은?\n\n다음 순서로 설명해주세요:\n1. 산도조절제의 정의\n2. 주요 종류 (구연산, 젖산 등)\n3. 제빵에서의 활용\n4. pH와 제품 품질의 관계\n5. 연습문제 3개" },
    { id: 29, topic: "topic3", question: "증점제·안정제의 역할은?", answer: "점도 증가, 조직 안정화 - 크림, 필링 등의 질감과 안정성을 향상시킵니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 증점제·안정제의 역할은?\n\n다음 순서로 설명해주세요:\n1. 증점제의 정의와 종류\n2. 안정제의 정의와 종류\n3. 제빵에서의 활용 예시\n4. 사용량과 주의사항\n5. 연습문제 3개" },
    { id: 30, topic: "topic3", question: "식품첨가물의 일일섭취허용량(ADI)이란?", answer: "평생 섭취해도 안전한 양 - 체중 1kg당 mg으로 표시합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품첨가물의 일일섭취허용량(ADI)이란?\n\n다음 순서로 설명해주세요:\n1. ADI의 정의\n2. 설정 방법 (동물실험, 안전계수)\n3. 주요 첨가물의 ADI 예시\n4. ADI 초과시 위험성\n5. 연습문제 3개" },

    // 토픽4: 식품위생법규 (10문항)
    { id: 31, topic: "topic4", question: "식품위생법에서 정하는 영업의 종류가 아닌 것은?", answer: "농산물 생산업 - 농산물 생산은 농업 관련 법률의 적용을 받습니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생법에서 정하는 영업의 종류가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 식품위생법상 영업의 종류\n2. 제빵업의 분류\n3. 영업 허가와 신고의 차이\n4. 관련 법규와 제재\n5. 연습문제 3개" },
    { id: 32, topic: "topic4", question: "식품영업자가 받아야 하는 건강진단 항목은?", answer: "장티푸스, 폐결핵 등 - 연 1회 건강진단을 받아야 합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품영업자가 받아야 하는 건강진단 항목은?\n\n다음 순서로 설명해주세요:\n1. 건강진단 대상자\n2. 진단 항목과 주기\n3. 영업 금지 질병\n4. 미실시 시 제재\n5. 연습문제 3개" },
    { id: 33, topic: "topic4", question: "HACCP의 7원칙에 해당하지 않는 것은?", answer: "시설 개선 - HACCP 7원칙: 위해분석, CCP결정, 한계기준, 모니터링, 개선조치, 검증, 기록유지입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: HACCP의 7원칙에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. HACCP의 정의와 목적\n2. 7원칙 상세 설명\n3. 제빵업체 적용 예시\n4. HACCP 인증의 이점\n5. 연습문제 3개" },
    { id: 34, topic: "topic4", question: "식품의 표시사항 중 필수 표시 항목이 아닌 것은?", answer: "제조자 연락처 - 필수항목: 제품명, 유통기한, 원재료, 영양성분, 주의사항 등입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 표시사항 중 필수 표시 항목이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 필수 표시 항목 목록\n2. 표시 방법과 기준\n3. 제빵제품의 표시 예시\n4. 허위·과대 표시 금지\n5. 연습문제 3개" },
    { id: 35, topic: "topic4", question: "식품의 유통기한 설정 기준은?", answer: "제조업체 책임 하에 과학적 근거로 설정 - 안전계수를 적용하여 설정합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의 유통기한 설정 기준은?\n\n다음 순서로 설명해주세요:\n1. 유통기한의 정의\n2. 설정 방법 (보존시험, 안전계수)\n3. 빵류의 유통기한 설정\n4. 유통기한 경과 식품의 처리\n5. 연습문제 3개" },
    { id: 36, topic: "topic4", question: "식품위생법 위반 시 행정처분의 종류가 아닌 것은?", answer: "벌금 - 벌금은 형사처분이며, 행정처분은 영업정지, 허가취소, 과징금 등입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품위생법 위반 시 행정처분의 종류가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 행정처분의 종류\n2. 위반 유형별 처분 기준\n3. 가중처분 규정\n4. 이의신청 절차\n5. 연습문제 3개" },
    { id: 37, topic: "topic4", question: "집단급식소의 정의에서 1회 급식인원 기준은?", answer: "50명 이상 - 1회 50인 이상에게 식사를 제공하는 시설입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 집단급식소의 정의에서 1회 급식인원 기준은?\n\n다음 순서로 설명해주세요:\n1. 집단급식소의 정의\n2. 신고 의무와 절차\n3. 위생관리 기준\n4. 식중독 발생 시 조치\n5. 연습문제 3개" },
    { id: 38, topic: "topic4", question: "식품의약품안전처의 주요 업무가 아닌 것은?", answer: "환경오염 감시 - 식약처는 식품, 의약품, 화장품 등의 안전 관리를 담당합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품의약품안전처의 주요 업무가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 식약처의 조직과 기능\n2. 식품 관련 주요 업무\n3. 제빵업체와의 관계\n4. 주요 정책과 제도\n5. 연습문제 3개" },
    { id: 39, topic: "topic4", question: "식품이력추적관리제도(Traceability)의 목적은?", answer: "유통 경로 추적 - 문제 발생 시 신속한 원인 규명과 회수가 가능합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품이력추적관리제도(Traceability)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 이력추적제도의 정의\n2. 등록 절차와 관리 방법\n3. 제빵업체 적용 현황\n4. 소비자 활용 방법\n5. 연습문제 3개" },
    { id: 40, topic: "topic4", question: "위해식품 회수 시 소비자 공표 기준은?", answer: "위해 등급에 따라 결정 - 1등급은 즉시 공표, 2등급은 영업자 자율회수입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 위해식품 회수 시 소비자 공표 기준은?\n\n다음 순서로 설명해주세요:\n1. 회수 등급 분류\n2. 등급별 회수 절차\n3. 공표 방법과 범위\n4. 회수 불이행 시 제재\n5. 연습문제 3개" },

    // 토픽5: 개인위생 및 작업장 위생 (10문항)
    { id: 41, topic: "topic5", question: "손 씻기의 올바른 순서는?", answer: "물→비누→거품→흐르는 물→건조 - 최소 30초 이상 씻어야 합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 손 씻기의 올바른 순서는?\n\n다음 순서로 설명해주세요:\n1. 올바른 손 씻기 6단계\n2. 손 씻기 시점\n3. 손 소독제 사용법\n4. 손 위생 관리의 중요성\n5. 연습문제 3개" },
    { id: 42, topic: "topic5", question: "식품 취급자가 착용해야 할 위생복의 조건은?", answer: "청결, 밝은 색상, 전용 - 작업장 내에서만 착용하고 외부 반출 금지입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품 취급자가 착용해야 할 위생복의 조건은?\n\n다음 순서로 설명해주세요:\n1. 위생복의 기준\n2. 착용 방법\n3. 세탁 및 관리\n4. 제빵 작업시 복장 체크리스트\n5. 연습문제 3개" },
    { id: 43, topic: "topic5", question: "제빵 작업장의 적정 조도는?", answer: "220룩스 이상 - 작업대는 540룩스 이상이 권장됩니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 제빵 작업장의 적정 조도는?\n\n다음 순서로 설명해주세요:\n1. 작업장 조도 기준\n2. 조도와 작업 효율의 관계\n3. 조명 시설 관리\n4. 기타 작업장 환경 기준\n5. 연습문제 3개" },
    { id: 44, topic: "topic5", question: "작업장 바닥의 위생 관리 방법으로 옳은 것은?", answer: "배수가 용이하고 물청소 가능한 재질 - 미끄럼 방지, 틈새 없는 바닥이 좋습니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 작업장 바닥의 위생 관리 방법으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 바닥 재질 기준\n2. 청소 방법과 주기\n3. 배수 시설 관리\n4. 바닥 위생의 중요성\n5. 연습문제 3개" },
    { id: 45, topic: "topic5", question: "냉장고의 적정 온도 범위는?", answer: "0~10°C (권장 5°C 이하) - 냉동은 -18°C 이하를 유지해야 합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 냉장고의 적정 온도 범위는?\n\n다음 순서로 설명해주세요:\n1. 냉장 온도 기준과 근거\n2. 냉동 온도 기준\n3. 온도 관리 방법\n4. 제빵 재료별 보관 온도\n5. 연습문제 3개" },
    { id: 46, topic: "topic5", question: "교차오염 방지를 위한 조치로 적합하지 않은 것은?", answer: "동일 도마 사용 - 용도별 도마 구분, 조리 순서 준수가 필요합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 교차오염 방지를 위한 조치로 적합하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 교차오염의 정의\n2. 주요 발생 원인\n3. 예방 방법\n4. 제빵 작업시 교차오염 방지 체크리스트\n5. 연습문제 3개" },
    { id: 47, topic: "topic5", question: "해충 방제를 위한 IPM(통합적 해충관리)의 원칙은?", answer: "예방-모니터링-방제 순서 - 화학적 방제는 최후 수단으로 사용합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 해충 방제를 위한 IPM(통합적 해충관리)의 원칙은?\n\n다음 순서로 설명해주세요:\n1. IPM의 정의와 원칙\n2. 물리적 방제 방법\n3. 화학적 방제 시 주의사항\n4. 제빵 작업장 해충 관리\n5. 연습문제 3개" },
    { id: 48, topic: "topic5", question: "세척과 소독의 차이점은?", answer: "세척은 이물질 제거, 소독은 미생물 사멸 - 세척 후 소독이 원칙입니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 세척과 소독의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 세척의 정의와 방법\n2. 소독의 정의와 방법\n3. 소독제의 종류\n4. 제빵 기구 세척·소독 절차\n5. 연습문제 3개" },
    { id: 49, topic: "topic5", question: "식품 보관 원칙인 FIFO란?", answer: "선입선출 - 먼저 입고된 재료를 먼저 사용하여 신선도를 유지합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 식품 보관 원칙인 FIFO란?\n\n다음 순서로 설명해주세요:\n1. FIFO의 정의\n2. 적용 방법\n3. 재고 관리와의 연계\n4. 제빵 재료 관리 실무\n5. 연습문제 3개" },
    { id: 50, topic: "topic5", question: "폐기물 관리의 기본 원칙은?", answer: "즉시 밀폐, 정기적 반출 - 작업장 내 폐기물 체류 시간을 최소화합니다.", prompt: "제빵기능사 식품위생학 문제입니다.\n\n문제: 폐기물 관리의 기본 원칙은?\n\n다음 순서로 설명해주세요:\n1. 폐기물 관리의 중요성\n2. 분리 및 보관 방법\n3. 반출 주기와 방법\n4. 제빵 작업장 폐기물 관리\n5. 연습문제 3개" },
  ];

  const topics = [
    { id: "topic1", name: "식품위생 개론", icon: "📋", count: 10 },
    { id: "topic2", name: "미생물과 식품위생", icon: "🦠", count: 10 },
    { id: "topic3", name: "식품첨가물", icon: "🧪", count: 10 },
    { id: "topic4", name: "식품위생법규", icon: "📜", count: 10 },
    { id: "topic5", name: "개인위생 및 작업장 위생", icon: "🧼", count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-red-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">식품위생학</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🦠</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">식품위생학</h1>
              <p className="text-red-100">제빵기능사 필기시험 핵심 과목</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-red-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-red-500 to-rose-500 h-4 rounded-full transition-all duration-500"
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
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
                            : "border-gray-200 hover:border-red-300"
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
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
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
            href="/category/service/bakery"
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            제빵기능사 메인
          </Link>
          <Link
            href="/category/service/bakery/study/food-science"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium"
          >
            다음: 식품학
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
