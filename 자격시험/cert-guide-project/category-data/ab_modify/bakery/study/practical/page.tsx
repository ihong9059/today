"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["topic1"]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bakery-practical-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bakery-practical-completed", JSON.stringify(completedQuestions));
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
    // 토픽1: 식빵류 (10문항)
    { id: 1, topic: "topic1", question: "식빵 분할 무게(1근용)는 얼마인가?", answer: "약 180-190g (3개 기준) - 굽기 손실을 고려하여 분할합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 식빵 분할 무게(1근용)는 얼마인가?\n\n다음 순서로 설명해주세요:\n1. 1근 식빵의 표준 무게\n2. 분할 무게 계산법\n3. 굽기 손실률 고려\n4. 실기 시 주의사항\n5. 연습문제 3개" },
    { id: 2, topic: "topic1", question: "식빵 반죽의 적정 온도는?", answer: "27±1°C - 이 온도에서 발효가 원활합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 식빵 반죽의 적정 온도는?\n\n다음 순서로 설명해주세요:\n1. 반죽 온도의 중요성\n2. 물 온도 계산법\n3. 계절별 조절\n4. 온도 측정 방법\n5. 연습문제 3개" },
    { id: 3, topic: "topic1", question: "식빵 1차 발효 조건은?", answer: "온도 27-30°C, 습도 75-80%, 약 60분 - 반죽이 2-2.5배 될 때까지.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 식빵 1차 발효 조건은?\n\n다음 순서로 설명해주세요:\n1. 1차 발효의 목적\n2. 적정 조건\n3. 발효 종점 판단\n4. 과발효/저발효 대처\n5. 연습문제 3개" },
    { id: 4, topic: "topic1", question: "버터톱 식빵의 토핑 올리는 시점은?", answer: "2차 발효 후 굽기 직전 - 버터를 적당히 녹여 바릅니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 버터톱 식빵의 토핑 올리는 시점은?\n\n다음 순서로 설명해주세요:\n1. 버터톱 토핑 제조법\n2. 올리는 시점\n3. 올리는 방법\n4. 주의사항\n5. 연습문제 3개" },
    { id: 5, topic: "topic1", question: "풀먼 식빵과 산형 식빵의 굽기 차이점은?", answer: "풀먼은 뚜껑 덮고 굽기 - 네모난 단면을 만듭니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 풀먼 식빵과 산형 식빵의 굽기 차이점은?\n\n다음 순서로 설명해주세요:\n1. 풀먼 식빵의 특징\n2. 산형 식빵의 특징\n3. 굽기 조건 차이\n4. 뚜껑 관리\n5. 연습문제 3개" },
    { id: 6, topic: "topic1", question: "식빵 성형 시 말기 횟수는?", answer: "3겹 접기 후 단단히 말기 - 기공이 균일해집니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 식빵 성형 시 말기 횟수는?\n\n다음 순서로 설명해주세요:\n1. 성형의 목적\n2. 3겹 접기 방법\n3. 말기 방법\n4. 이음매 처리\n5. 연습문제 3개" },
    { id: 7, topic: "topic1", question: "우유 식빵의 배합 특징은?", answer: "물 대신 우유 사용 - 부드럽고 고소한 맛이 납니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 우유 식빵의 배합 특징은?\n\n다음 순서로 설명해주세요:\n1. 우유 식빵의 정의\n2. 배합 비율\n3. 우유의 역할\n4. 믹싱 시 주의점\n5. 연습문제 3개" },
    { id: 8, topic: "topic1", question: "식빵 굽기 온도와 시간은?", answer: "상화 180-190°C, 하화 200-210°C, 약 35-40분", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 식빵 굽기 온도와 시간은?\n\n다음 순서로 설명해주세요:\n1. 적정 굽기 온도\n2. 상화/하화 조절\n3. 굽기 시간\n4. 익음 판정\n5. 연습문제 3개" },
    { id: 9, topic: "topic1", question: "옥수수 식빵에 옥수수 분말 첨가 비율은?", answer: "밀가루 대비 10-15% - 너무 많으면 글루텐 형성이 어렵습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 옥수수 식빵에 옥수수 분말 첨가 비율은?\n\n다음 순서로 설명해주세요:\n1. 옥수수 분말의 특성\n2. 적정 첨가량\n3. 글루텐에 미치는 영향\n4. 믹싱 조절\n5. 연습문제 3개" },
    { id: 10, topic: "topic1", question: "밤 식빵의 밤 첨가 시점은?", answer: "믹싱 최종 단계 - 밤이 으깨지지 않도록 가볍게 섞습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 밤 식빵의 밤 첨가 시점은?\n\n다음 순서로 설명해주세요:\n1. 밤 전처리 방법\n2. 첨가 시점\n3. 믹싱 방법\n4. 분할 시 주의점\n5. 연습문제 3개" },

    // 토픽2: 과자빵류 (10문항)
    { id: 11, topic: "topic2", question: "단과자빵의 특징적인 배합 재료는?", answer: "버터, 설탕, 계란 다량 - 리치 도우로 부드럽고 달콤합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 단과자빵의 특징적인 배합 재료는?\n\n다음 순서로 설명해주세요:\n1. 단과자빵의 정의\n2. 리치 도우 배합\n3. 다양한 충전물\n4. 성형 방법\n5. 연습문제 3개" },
    { id: 12, topic: "topic2", question: "소시지빵 성형 시 소시지 배치는?", answer: "반죽으로 감싸거나 위에 올리기 - 균형 있게 배치합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 소시지빵 성형 시 소시지 배치는?\n\n다음 순서로 설명해주세요:\n1. 소시지빵 성형 방법\n2. 소시지 전처리\n3. 반죽과의 비율\n4. 굽기 시 주의점\n5. 연습문제 3개" },
    { id: 13, topic: "topic2", question: "크림빵의 커스터드 크림 주입 시점은?", answer: "완전히 냉각 후 - 열에 의한 크림 변질을 방지합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 크림빵의 커스터드 크림 주입 시점은?\n\n다음 순서로 설명해주세요:\n1. 커스터드 크림 제조\n2. 주입 시점\n3. 주입 방법\n4. 위생 관리\n5. 연습문제 3개" },
    { id: 14, topic: "topic2", question: "소보로빵 토핑 배합 비율은?", answer: "버터:설탕:밀가루 = 1:1:2 기준 - 바삭한 식감을 만듭니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 소보로빵 토핑 배합 비율은?\n\n다음 순서로 설명해주세요:\n1. 소보로 제조법\n2. 배합 비율\n3. 토핑 올리기\n4. 굽기 시 변화\n5. 연습문제 3개" },
    { id: 15, topic: "topic2", question: "모카빵의 모카 크림 제조법은?", answer: "버터크림에 커피 첨가 - 진한 커피향이 납니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 모카빵의 모카 크림 제조법은?\n\n다음 순서로 설명해주세요:\n1. 모카 크림 재료\n2. 제조 순서\n3. 토핑 방법\n4. 데코레이션\n5. 연습문제 3개" },
    { id: 16, topic: "topic2", question: "과자빵 2차 발효 시간은?", answer: "약 30-40분 - 70-80% 정도 부풀면 적정입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 과자빵 2차 발효 시간은?\n\n다음 순서로 설명해주세요:\n1. 2차 발효의 목적\n2. 적정 발효 정도\n3. 온도와 습도\n4. 발효 판단\n5. 연습문제 3개" },
    { id: 17, topic: "topic2", question: "앙금빵의 앙금 포장량은?", answer: "반죽과 비슷하거나 약간 적게 - 보통 30-35g 정도.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 앙금빵의 앙금 포장량은?\n\n다음 순서로 설명해주세요:\n1. 앙금 종류\n2. 적정 포장량\n3. 포장 방법\n4. 이음매 처리\n5. 연습문제 3개" },
    { id: 18, topic: "topic2", question: "과자빵 굽기 온도는?", answer: "180-190°C, 15-20분 - 식빵보다 높은 온도에서 짧게 굽습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 과자빵 굽기 온도는?\n\n다음 순서로 설명해주세요:\n1. 적정 굽기 온도\n2. 굽기 시간\n3. 토핑별 조절\n4. 익음 판정\n5. 연습문제 3개" },
    { id: 19, topic: "topic2", question: "달걀물 바르기의 목적은?", answer: "광택, 색상 향상 - 굽기 전 표면에 발라 윤기를 냅니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 달걀물 바르기의 목적은?\n\n다음 순서로 설명해주세요:\n1. 달걀물의 역할\n2. 달걀물 제조\n3. 바르는 시점\n4. 바르는 방법\n5. 연습문제 3개" },
    { id: 20, topic: "topic2", question: "과자빵 분할 무게 기준은?", answer: "60-70g 기준 - 충전물 포함 시 조절합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 과자빵 분할 무게 기준은?\n\n다음 순서로 설명해주세요:\n1. 분할 무게 결정\n2. 충전물 고려\n3. 제품별 무게\n4. 균일한 분할\n5. 연습문제 3개" },

    // 토픽3: 롤류 (10문항)
    { id: 21, topic: "topic3", question: "버터롤 성형 방법은?", answer: "삼각형으로 밀어 말기 - 넓은 쪽부터 말아 끝이 아래로.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 버터롤 성형 방법은?\n\n다음 순서로 설명해주세요:\n1. 반죽 밀기\n2. 삼각형 만들기\n3. 말기 방법\n4. 팬닝\n5. 연습문제 3개" },
    { id: 22, topic: "topic3", question: "스위트롤의 시나몬 설탕 비율은?", answer: "설탕:시나몬 = 10:1 정도 - 취향에 따라 조절합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 스위트롤의 시나몬 설탕 비율은?\n\n다음 순서로 설명해주세요:\n1. 시나몬 설탕 제조\n2. 펴 바르기\n3. 말기와 자르기\n4. 팬닝과 굽기\n5. 연습문제 3개" },
    { id: 23, topic: "topic3", question: "롤빵 반죽 밀기 두께는?", answer: "약 5mm - 너무 두꺼우면 층이 적고, 얇으면 찢어집니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 롤빵 반죽 밀기 두께는?\n\n다음 순서로 설명해주세요:\n1. 밀기의 목적\n2. 적정 두께\n3. 밀대 사용법\n4. 주의사항\n5. 연습문제 3개" },
    { id: 24, topic: "topic3", question: "롤빵 벤치타임은?", answer: "10-15분 - 분할 후 글루텐 이완을 위해 휴지합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 롤빵 벤치타임은?\n\n다음 순서로 설명해주세요:\n1. 벤치타임의 목적\n2. 적정 시간\n3. 휴지 조건\n4. 성형과의 관계\n5. 연습문제 3개" },
    { id: 25, topic: "topic3", question: "버터롤 팬닝 간격은?", answer: "약 5cm - 2차 발효와 굽기 시 팽창을 고려합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 버터롤 팬닝 간격은?\n\n다음 순서로 설명해주세요:\n1. 팬닝의 원칙\n2. 간격 계산\n3. 배열 방법\n4. 열 전달 고려\n5. 연습문제 3개" },
    { id: 26, topic: "topic3", question: "롤빵 분할 무게는?", answer: "40-50g - 버터롤 기준입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 롤빵 분할 무게는?\n\n다음 순서로 설명해주세요:\n1. 롤빵 종류별 무게\n2. 분할 방법\n3. 무게 오차\n4. 균일성의 중요성\n5. 연습문제 3개" },
    { id: 27, topic: "topic3", question: "롤빵 굽기 온도와 시간은?", answer: "190-200°C, 12-15분 - 작은 크기로 빨리 굽습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 롤빵 굽기 온도와 시간은?\n\n다음 순서로 설명해주세요:\n1. 적정 온도\n2. 굽기 시간\n3. 색상 판단\n4. 오븐 특성 고려\n5. 연습문제 3개" },
    { id: 28, topic: "topic3", question: "크레센트 롤 성형은?", answer: "초승달 모양으로 구부리기 - 양쪽 끝을 안쪽으로 휩니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 크레센트 롤 성형은?\n\n다음 순서로 설명해주세요:\n1. 크레센트의 의미\n2. 성형 방법\n3. 모양 잡기\n4. 팬닝\n5. 연습문제 3개" },
    { id: 29, topic: "topic3", question: "롤빵 표면 갈라짐 방지법은?", answer: "적절한 발효, 달걀물 - 표면 건조를 막습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 롤빵 표면 갈라짐 방지법은?\n\n다음 순서로 설명해주세요:\n1. 갈라짐의 원인\n2. 발효 관리\n3. 달걀물 역할\n4. 습도 관리\n5. 연습문제 3개" },
    { id: 30, topic: "topic3", question: "파커하우스 롤 성형은?", answer: "반으로 접기 - 버터를 바르고 반으로 접어 성형합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 파커하우스 롤 성형은?\n\n다음 순서로 설명해주세요:\n1. 파커하우스 롤의 유래\n2. 성형 방법\n3. 버터 바르기\n4. 굽기 특성\n5. 연습문제 3개" },

    // 토픽4: 특수빵류 (10문항)
    { id: 31, topic: "topic4", question: "베이글 데치기 조건은?", answer: "끓는 물, 각 면 30초씩 - 쫄깃한 식감을 만듭니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 베이글 데치기 조건은?\n\n다음 순서로 설명해주세요:\n1. 데치기의 목적\n2. 물 온도와 시간\n3. 데치기 방법\n4. 굽기 전 처리\n5. 연습문제 3개" },
    { id: 32, topic: "topic4", question: "호밀빵에 사워도우 사용 이유는?", answer: "글루텐 보완, 풍미 - 호밀의 약한 글루텐을 산으로 강화합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 호밀빵에 사워도우 사용 이유는?\n\n다음 순서로 설명해주세요:\n1. 호밀가루의 특성\n2. 사워도우의 역할\n3. 제조 방법\n4. 풍미 특성\n5. 연습문제 3개" },
    { id: 33, topic: "topic4", question: "브리오슈 반죽 시 버터 첨가 시점은?", answer: "글루텐 형성 후 - 글루텐을 먼저 발달시킨 후 버터를 넣습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 브리오슈 반죽 시 버터 첨가 시점은?\n\n다음 순서로 설명해주세요:\n1. 브리오슈의 특성\n2. 버터 첨가 원리\n3. 믹싱 순서\n4. 주의사항\n5. 연습문제 3개" },
    { id: 34, topic: "topic4", question: "빵도넛 튀김 온도는?", answer: "170-175°C - 너무 높으면 겉만 타고 속이 익지 않습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 빵도넛 튀김 온도는?\n\n다음 순서로 설명해주세요:\n1. 적정 튀김 온도\n2. 온도가 높거나 낮을 때\n3. 튀기는 시간\n4. 기름 관리\n5. 연습문제 3개" },
    { id: 35, topic: "topic4", question: "그리시니의 특징은?", answer: "가늘고 길게 성형, 바삭 - 이탈리아 스틱 브레드입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 그리시니의 특징은?\n\n다음 순서로 설명해주세요:\n1. 그리시니의 정의\n2. 성형 방법\n3. 굽기 조건\n4. 식감 특성\n5. 연습문제 3개" },
    { id: 36, topic: "topic4", question: "더치빵의 토핑 특징은?", answer: "설탕+물 토핑 - 구우면 균열이 생겨 특유의 무늬가 됩니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 더치빵의 토핑 특징은?\n\n다음 순서로 설명해주세요:\n1. 더치빵의 정의\n2. 토핑 제조법\n3. 바르는 방법\n4. 균열 형성 원리\n5. 연습문제 3개" },
    { id: 37, topic: "topic4", question: "통밀빵에 통밀가루 비율은?", answer: "전체의 30-50% - 100% 사용 시 볼륨이 작아집니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 통밀빵에 통밀가루 비율은?\n\n다음 순서로 설명해주세요:\n1. 통밀가루의 특성\n2. 적정 배합 비율\n3. 믹싱 조절\n4. 건강빵 제조\n5. 연습문제 3개" },
    { id: 38, topic: "topic4", question: "포카치아의 올리브유 사용법은?", answer: "반죽에 첨가 + 표면에 바르기 - 촉촉하고 풍미가 좋습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 포카치아의 올리브유 사용법은?\n\n다음 순서로 설명해주세요:\n1. 포카치아의 특성\n2. 올리브유 첨가량\n3. 표면 처리\n4. 토핑 종류\n5. 연습문제 3개" },
    { id: 39, topic: "topic4", question: "치아바타의 수분 함량 특징은?", answer: "고가수 반죽 (70% 이상) - 큰 기공과 쫄깃한 식감이 특징입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 치아바타의 수분 함량 특징은?\n\n다음 순서로 설명해주세요:\n1. 치아바타의 정의\n2. 고가수 반죽 특성\n3. 믹싱 방법\n4. 성형 특성\n5. 연습문제 3개" },
    { id: 40, topic: "topic4", question: "바게트 쿠프 넣기 방법은?", answer: "45도 각도로 5개 정도 - 오븐 스프링과 장식 효과가 있습니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 바게트 쿠프 넣기 방법은?\n\n다음 순서로 설명해주세요:\n1. 쿠프의 역할\n2. 칼 각도와 깊이\n3. 배치 패턴\n4. 쿠프 예쁘게 나오는 조건\n5. 연습문제 3개" },

    // 토픽5: 실기 주의사항 (10문항)
    { id: 41, topic: "topic5", question: "실기시험 시간 관리 요령은?", answer: "역순으로 계획 - 굽기 시간부터 역산하여 작업합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 실기시험 시간 관리 요령은?\n\n다음 순서로 설명해주세요:\n1. 시간 배분의 중요성\n2. 역순 계획법\n3. 여유 시간 확보\n4. 돌발 상황 대처\n5. 연습문제 3개" },
    { id: 42, topic: "topic5", question: "분할 무게 오차 허용 범위는?", answer: "±5% 이내 - 균일한 분할이 평가 항목입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 분할 무게 오차 허용 범위는?\n\n다음 순서로 설명해주세요:\n1. 분할 정확도의 중요성\n2. 허용 오차\n3. 정확한 분할 요령\n4. 저울 사용법\n5. 연습문제 3개" },
    { id: 43, topic: "topic5", question: "위생복 착용 기준은?", answer: "흰색 상의, 앞치마, 위생모 - 청결한 상태로 착용합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 위생복 착용 기준은?\n\n다음 순서로 설명해주세요:\n1. 위생복의 종류\n2. 착용 방법\n3. 액세서리 제한\n4. 감점 사항\n5. 연습문제 3개" },
    { id: 44, topic: "topic5", question: "반죽 온도 측정 시점은?", answer: "믹싱 직후 - 발효 전 반죽 온도를 확인합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 반죽 온도 측정 시점은?\n\n다음 순서로 설명해주세요:\n1. 온도 측정의 중요성\n2. 측정 방법\n3. 온도 조절 대처\n4. 기록과 평가\n5. 연습문제 3개" },
    { id: 45, topic: "topic5", question: "실기시험 감점 요소는?", answer: "위생, 시간 초과, 무게 오차, 품질 불량 - 모든 영역에서 평가합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 실기시험 감점 요소는?\n\n다음 순서로 설명해주세요:\n1. 감점 항목 분류\n2. 위생 관련 감점\n3. 작업 관련 감점\n4. 품질 관련 감점\n5. 연습문제 3개" },
    { id: 46, topic: "topic5", question: "작업대 정리정돈 요령은?", answer: "사용 후 즉시 정리 - 깨끗한 작업 환경을 유지합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 작업대 정리정돈 요령은?\n\n다음 순서로 설명해주세요:\n1. 정리정돈의 중요성\n2. 작업 중 정리\n3. 도구 배치\n4. 평가 반영\n5. 연습문제 3개" },
    { id: 47, topic: "topic5", question: "발효 상태 확인 방법은?", answer: "핑거테스트 - 손가락으로 눌러 반발력을 확인합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 발효 상태 확인 방법은?\n\n다음 순서로 설명해주세요:\n1. 핑거테스트 방법\n2. 적정 발효 판단\n3. 과발효/저발효 구분\n4. 시각적 판단\n5. 연습문제 3개" },
    { id: 48, topic: "topic5", question: "완제품 제출 기준은?", answer: "지정 수량, 품질 기준 충족 - 요구 사항을 정확히 확인합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 완제품 제출 기준은?\n\n다음 순서로 설명해주세요:\n1. 제출 수량\n2. 품질 기준\n3. 진열 방법\n4. 시간 내 제출\n5. 연습문제 3개" },
    { id: 49, topic: "topic5", question: "재료 계량 순서는?", answer: "분말류 → 액체류 → 유지류 - 정확한 계량이 기본입니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 재료 계량 순서는?\n\n다음 순서로 설명해주세요:\n1. 계량의 중요성\n2. 순서별 이유\n3. 계량 도구 사용\n4. 오차 범위\n5. 연습문제 3개" },
    { id: 50, topic: "topic5", question: "최종 품질 평가 기준은?", answer: "외관, 내상, 맛, 향 - 종합적으로 평가합니다.", prompt: "제빵기능사 실기 문제입니다.\n\n문제: 최종 품질 평가 기준은?\n\n다음 순서로 설명해주세요:\n1. 외관 평가 (색상, 모양)\n2. 내상 평가 (기공, 조직)\n3. 맛과 향 평가\n4. 합격 기준\n5. 연습문제 3개" },
  ];

  const topics = [
    { id: "topic1", name: "식빵류", icon: "🍞", count: 10 },
    { id: "topic2", name: "과자빵류", icon: "🥐", count: 10 },
    { id: "topic3", name: "롤류", icon: "🥯", count: 10 },
    { id: "topic4", name: "특수빵류", icon: "🥖", count: 10 },
    { id: "topic5", name: "실기 주의사항", icon: "📋", count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-purple-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">실기</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">👨‍🍳</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">실기</h1>
              <p className="text-purple-100">제빵기능사 실기시험 대비</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-purple-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-violet-500 h-4 rounded-full transition-all duration-500"
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
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
                            : "border-gray-200 hover:border-purple-300"
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
                            className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
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
            href="/category/service/bakery/study/baking-theory"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전: 제빵이론
          </Link>
          <Link
            href="/category/service/bakery"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition font-medium"
          >
            제빵기능사 메인
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
