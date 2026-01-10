"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BakingTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["topic1"]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bakery-baking-theory-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bakery-baking-theory-completed", JSON.stringify(completedQuestions));
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
    // 토픽1: 반죽법 (10문항)
    { id: 1, topic: "topic1", question: "스트레이트법(직접반죽법)의 특징은?", answer: "모든 재료를 한 번에 믹싱 - 작업 시간이 짧고 발효 시간이 길어 풍미가 좋습니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 스트레이트법(직접반죽법)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 스트레이트법의 정의\n2. 장단점\n3. 적합한 제품\n4. 다른 반죽법과 비교\n5. 연습문제 3개" },
    { id: 2, topic: "topic1", question: "스펀지-도우법의 스펀지에 들어가는 재료는?", answer: "밀가루(50-70%), 이스트, 물 - 전체 밀가루의 일부와 이스트, 물로 먼저 발효시킵니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 스펀지-도우법의 스펀지에 들어가는 재료는?\n\n다음 순서로 설명해주세요:\n1. 스펀지-도우법의 원리\n2. 스펀지 배합\n3. 장단점\n4. 적합한 제품\n5. 연습문제 3개" },
    { id: 3, topic: "topic1", question: "비상반죽법(노타임법)의 특징은?", answer: "짧은 발효 시간 - 이스트와 개량제 사용량을 늘려 빠르게 제조합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 비상반죽법(노타임법)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 비상반죽법의 정의\n2. 장단점\n3. 적합한 상황\n4. 품질 특성\n5. 연습문제 3개" },
    { id: 4, topic: "topic1", question: "액종법의 특징은?", answer: "액상 스타터 사용 - 밀가루, 물, 이스트로 액체 상태의 종을 만들어 사용합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 액종법의 특징은?\n\n다음 순서로 설명해주세요:\n1. 액종법의 원리\n2. 액종 제조 방법\n3. 장단점\n4. 활용 예시\n5. 연습문제 3개" },
    { id: 5, topic: "topic1", question: "중종법의 중종(中種) 발효 시간은?", answer: "3-5시간 - 중종을 먼저 발효시킨 후 나머지 재료와 함께 본반죽합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 중종법의 중종(中種) 발효 시간은?\n\n다음 순서로 설명해주세요:\n1. 중종법의 원리\n2. 발효 조건\n3. 장단점\n4. 스펀지-도우법과의 비교\n5. 연습문제 3개" },
    { id: 6, topic: "topic1", question: "믹싱의 6단계 중 '클린업 단계'의 특징은?", answer: "반죽이 볼에서 깨끗이 떨어짐 - 글루텐 형성이 시작되는 단계입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 믹싱의 6단계 중 '클린업 단계'의 특징은?\n\n다음 순서로 설명해주세요:\n1. 믹싱 6단계\n2. 클린업 단계의 특징\n3. 반죽 상태 판단\n4. 과믹싱의 문제\n5. 연습문제 3개" },
    { id: 7, topic: "topic1", question: "최종 단계(Final Stage) 반죽의 특징은?", answer: "최대 글루텐 발전 - 반죽이 매끄럽고 잘 늘어나며 윤기가 납니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 최종 단계(Final Stage) 반죽의 특징은?\n\n다음 순서로 설명해주세요:\n1. 최종 단계의 정의\n2. 반죽 특성\n3. 글루텐 막 테스트\n4. 적정 믹싱 종점 판단\n5. 연습문제 3개" },
    { id: 8, topic: "topic1", question: "오버믹싱(과믹싱)의 결과는?", answer: "글루텐 파괴, 끈적임 - 반죽이 끈적거리고 탄력을 잃습니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 오버믹싱(과믹싱)의 결과는?\n\n다음 순서로 설명해주세요:\n1. 오버믹싱의 정의\n2. 반죽 상태 변화\n3. 제품 품질에 미치는 영향\n4. 예방 방법\n5. 연습문제 3개" },
    { id: 9, topic: "topic1", question: "반죽 온도 계산 시 마찰열의 의미는?", answer: "믹싱 중 발생하는 열 - 반죽 온도 상승의 원인으로 계산에 포함합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 반죽 온도 계산 시 마찰열의 의미는?\n\n다음 순서로 설명해주세요:\n1. 반죽 온도의 중요성\n2. 마찰열의 발생 원리\n3. 물 온도 계산법\n4. 계절별 조절\n5. 연습문제 3개" },
    { id: 10, topic: "topic1", question: "반죽의 적정 온도는?", answer: "27±1°C (26-28°C) - 이 온도에서 발효가 가장 원활합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 반죽의 적정 온도는?\n\n다음 순서로 설명해주세요:\n1. 반죽 온도와 발효 관계\n2. 온도 조절 방법\n3. 온도가 높거나 낮을 때\n4. 계절별 대응\n5. 연습문제 3개" },

    // 토픽2: 발효 공정 (10문항)
    { id: 11, topic: "topic2", question: "1차 발효(플로어 타임)의 목적은?", answer: "글루텐 숙성, 가스 생성 - 반죽을 부풀리고 풍미를 발달시킵니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 1차 발효(플로어 타임)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 1차 발효의 정의\n2. 발효 중 변화\n3. 적정 조건\n4. 발효 종점 판단\n5. 연습문제 3개" },
    { id: 12, topic: "topic2", question: "발효 시 적정 습도는?", answer: "75-80% - 반죽 표면의 건조를 방지합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 발효 시 적정 습도는?\n\n다음 순서로 설명해주세요:\n1. 습도의 역할\n2. 적정 습도 범위\n3. 습도 부족 시 문제\n4. 습도 관리 방법\n5. 연습문제 3개" },
    { id: 13, topic: "topic2", question: "펀칭(가스빼기)의 목적은?", answer: "가스 균일화, 이스트 활성화 - 반죽 내 가스를 재분배하고 온도를 균일하게 합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 펀칭(가스빼기)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 펀칭의 정의\n2. 목적과 효과\n3. 펀칭 시점\n4. 방법과 주의사항\n5. 연습문제 3개" },
    { id: 14, topic: "topic2", question: "벤치 타임(중간 발효)의 시간은?", answer: "10-20분 - 분할·둥글리기 후 글루텐을 이완시킵니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 벤치 타임(중간 발효)의 시간은?\n\n다음 순서로 설명해주세요:\n1. 벤치 타임의 목적\n2. 적정 시간\n3. 부족/과다 시 문제\n4. 성형과의 관계\n5. 연습문제 3개" },
    { id: 15, topic: "topic2", question: "2차 발효(최종 발효) 시 온도는?", answer: "35-40°C - 1차 발효보다 높은 온도에서 진행합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 2차 발효(최종 발효) 시 온도는?\n\n다음 순서로 설명해주세요:\n1. 2차 발효의 목적\n2. 적정 조건 (온도, 습도)\n3. 발효 종점 판단\n4. 과발효/저발효의 문제\n5. 연습문제 3개" },
    { id: 16, topic: "topic2", question: "과발효된 반죽의 특징은?", answer: "신맛, 볼륨 저하 - 글루텐이 약화되어 가스 보유력이 떨어집니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 과발효된 반죽의 특징은?\n\n다음 순서로 설명해주세요:\n1. 과발효의 정의\n2. 반죽 특성 변화\n3. 제품 품질에 미치는 영향\n4. 대처 방법\n5. 연습문제 3개" },
    { id: 17, topic: "topic2", question: "저발효된 반죽의 특징은?", answer: "볼륨 부족, 조직 치밀 - 발효가 충분하지 않아 팽창이 덜 됩니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 저발효된 반죽의 특징은?\n\n다음 순서로 설명해주세요:\n1. 저발효의 원인\n2. 반죽 특성\n3. 제품 품질 문제\n4. 대처 방법\n5. 연습문제 3개" },
    { id: 18, topic: "topic2", question: "발효 중 생성되는 유기산은?", answer: "초산, 젖산 - 풍미 발달에 기여하고 pH를 낮춥니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 발효 중 생성되는 유기산은?\n\n다음 순서로 설명해주세요:\n1. 유기산 생성 원리\n2. 종류와 특성\n3. 풍미에 미치는 영향\n4. pH 변화\n5. 연습문제 3개" },
    { id: 19, topic: "topic2", question: "발효 내구성이란?", answer: "발효 허용 범위 - 최적 발효 시점 전후로 품질을 유지하는 시간입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 발효 내구성이란?\n\n다음 순서로 설명해주세요:\n1. 발효 내구성의 정의\n2. 영향 요인\n3. 작업 계획과의 관계\n4. 내구성 향상 방법\n5. 연습문제 3개" },
    { id: 20, topic: "topic2", question: "리타더(냉장발효기)의 사용 목적은?", answer: "발효 속도 조절 - 저온에서 천천히 발효시켜 작업 시간을 조절합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 리타더(냉장발효기)의 사용 목적은?\n\n다음 순서로 설명해주세요:\n1. 리타더의 원리\n2. 사용 목적\n3. 설정 조건\n4. 장점과 주의사항\n5. 연습문제 3개" },

    // 토픽3: 성형과 팬닝 (10문항)
    { id: 21, topic: "topic3", question: "분할 시 주의사항은?", answer: "정확한 무게, 신속한 작업 - 반죽 손상을 최소화합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 분할 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 분할의 목적\n2. 정확한 무게의 중요성\n3. 분할 방법\n4. 신속 작업의 이유\n5. 연습문제 3개" },
    { id: 22, topic: "topic3", question: "둥글리기(라운딩)의 목적은?", answer: "표면 매끄럽게, 가스 보유력 향상 - 반죽 표면에 피막을 형성합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 둥글리기(라운딩)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 둥글리기의 목적\n2. 올바른 방법\n3. 표면 피막의 역할\n4. 과도한 둥글리기 문제\n5. 연습문제 3개" },
    { id: 23, topic: "topic3", question: "성형 시 반죽이 찢어지는 원인은?", answer: "글루텐 과발달 또는 벤치타임 부족 - 반죽의 신장성이 부족합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 성형 시 반죽이 찢어지는 원인은?\n\n다음 순서로 설명해주세요:\n1. 찢어짐의 원인\n2. 글루텐 상태와의 관계\n3. 벤치타임의 중요성\n4. 해결 방법\n5. 연습문제 3개" },
    { id: 24, topic: "topic3", question: "식빵 성형 시 말기 방향은?", answer: "빵 결 방향과 수직 - 볼륨과 결이 균일해집니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵 성형 시 말기 방향은?\n\n다음 순서로 설명해주세요:\n1. 말기 방향의 원리\n2. 빵 결에 미치는 영향\n3. 올바른 성형 방법\n4. 3겹 접기의 목적\n5. 연습문제 3개" },
    { id: 25, topic: "topic3", question: "팬닝 시 반죽 간격을 두는 이유는?", answer: "균일한 팽창, 열 전달 - 반죽이 서로 붙지 않게 합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 팬닝 시 반죽 간격을 두는 이유는?\n\n다음 순서로 설명해주세요:\n1. 팬닝의 원칙\n2. 간격의 중요성\n3. 제품별 적정 간격\n4. 열 전달과의 관계\n5. 연습문제 3개" },
    { id: 26, topic: "topic3", question: "식빵틀에 유지를 바르는 이유는?", answer: "이형(탈형) 용이 - 구운 후 빵이 틀에서 쉽게 빠집니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵틀에 유지를 바르는 이유는?\n\n다음 순서로 설명해주세요:\n1. 이형유의 역할\n2. 적합한 유지 종류\n3. 바르는 방법\n4. 실리콘 코팅 틀\n5. 연습문제 3개" },
    { id: 27, topic: "topic3", question: "버터롤 성형 시 넓은 쪽을 위로 하는 이유는?", answer: "균일한 팽창 - 넓은 면이 펴지면서 균형 잡힌 모양이 됩니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 버터롤 성형 시 넓은 쪽을 위로 하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 버터롤 성형 방법\n2. 넓은 쪽 위의 원리\n3. 팽창 시 모양 변화\n4. 다른 롤 빵 성형\n5. 연습문제 3개" },
    { id: 28, topic: "topic3", question: "팽창 시 터짐을 방지하는 방법은?", answer: "칼집(쿠프), 달걀물 - 적절한 곳에 칼집을 내어 가스를 배출합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 팽창 시 터짐을 방지하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 터짐의 원인\n2. 쿠프의 역할\n3. 달걀물의 기능\n4. 제품별 처리 방법\n5. 연습문제 3개" },
    { id: 29, topic: "topic3", question: "크림빵 속 재료 주입 시점은?", answer: "굽기 후 냉각 후 - 열에 의한 크림 변질을 방지합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 크림빵 속 재료 주입 시점은?\n\n다음 순서로 설명해주세요:\n1. 냉각 후 주입 이유\n2. 커스터드 크림 특성\n3. 주입 방법\n4. 위생 관리\n5. 연습문제 3개" },
    { id: 30, topic: "topic3", question: "토핑(소보로) 올리는 시점은?", answer: "2차 발효 후 굽기 전 - 발효가 끝난 후 표면에 올립니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 토핑(소보로) 올리는 시점은?\n\n다음 순서로 설명해주세요:\n1. 토핑 올리기 시점\n2. 소보로 제조법\n3. 올리는 방법\n4. 다른 토핑 종류\n5. 연습문제 3개" },

    // 토픽4: 굽기와 냉각 (10문항)
    { id: 31, topic: "topic4", question: "오븐 스프링(오븐 킥)이란?", answer: "굽기 초반 급격한 팽창 - 열에 의해 이스트 활성이 최대가 되고 가스가 팽창합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 오븐 스프링(오븐 킥)이란?\n\n다음 순서로 설명해주세요:\n1. 오븐 스프링의 정의\n2. 발생 원리\n3. 영향 요인\n4. 최대화 방법\n5. 연습문제 3개" },
    { id: 32, topic: "topic4", question: "식빵 굽기 온도는?", answer: "180-200°C - 제품 크기와 배합에 따라 조절합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵 굽기 온도는?\n\n다음 순서로 설명해주세요:\n1. 식빵의 적정 굽기 온도\n2. 온도와 시간의 관계\n3. 온도 조절 원리\n4. 제품별 굽기 조건\n5. 연습문제 3개" },
    { id: 33, topic: "topic4", question: "스팀(증기) 주입의 효과는?", answer: "껍질 형성 지연, 윤기 - 표면의 전분 호화로 광택이 납니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 스팀(증기) 주입의 효과는?\n\n다음 순서로 설명해주세요:\n1. 스팀의 역할\n2. 주입 시점과 양\n3. 적합한 제품\n4. 스팀 없이 굽는 빵\n5. 연습문제 3개" },
    { id: 34, topic: "topic4", question: "마이야르 반응이 일어나는 온도는?", answer: "140-165°C - 껍질의 갈변과 풍미 형성에 관여합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 마이야르 반응이 일어나는 온도는?\n\n다음 순서로 설명해주세요:\n1. 마이야르 반응의 정의\n2. 반응 조건\n3. 색상과 풍미 형성\n4. 캐러멜화와 차이\n5. 연습문제 3개" },
    { id: 35, topic: "topic4", question: "빵이 덜 익었을 때의 특징은?", answer: "옆면 함몰, 속 끈적임 - 내부 온도가 충분히 올라가지 않았습니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 빵이 덜 익었을 때의 특징은?\n\n다음 순서로 설명해주세요:\n1. 덜 익은 빵의 특징\n2. 원인 분석\n3. 익음 판정 방법\n4. 대처 방법\n5. 연습문제 3개" },
    { id: 36, topic: "topic4", question: "빵 내부 온도가 완전히 익었을 때는?", answer: "약 95-98°C - 전분 호화와 단백질 응고가 완료됩니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 빵 내부 온도가 완전히 익었을 때는?\n\n다음 순서로 설명해주세요:\n1. 완전 익음의 기준\n2. 내부 온도 측정\n3. 전분과 단백질 변화\n4. 제품별 내부 온도\n5. 연습문제 3개" },
    { id: 37, topic: "topic4", question: "냉각의 목적은?", answer: "수분 분포 균일화, 절단 용이 - 크러스트와 크럼 사이 수분 이동이 일어납니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 냉각의 목적은?\n\n다음 순서로 설명해주세요:\n1. 냉각의 정의\n2. 냉각 중 변화\n3. 적정 냉각 조건\n4. 냉각 부족 시 문제\n5. 연습문제 3개" },
    { id: 38, topic: "topic4", question: "식빵의 적정 냉각 시간은?", answer: "1-2시간 - 내부 온도가 35°C 이하가 될 때까지 냉각합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵의 적정 냉각 시간은?\n\n다음 순서로 설명해주세요:\n1. 냉각 시간의 기준\n2. 냉각 조건\n3. 슬라이싱 시점\n4. 포장 시점\n5. 연습문제 3개" },
    { id: 39, topic: "topic4", question: "데크 오븐과 컨벡션 오븐의 차이는?", answer: "열 전달 방식 - 데크는 복사열, 컨벡션은 대류열을 사용합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 데크 오븐과 컨벡션 오븐의 차이는?\n\n다음 순서로 설명해주세요:\n1. 데크 오븐의 특성\n2. 컨벡션 오븐의 특성\n3. 제품별 적합한 오븐\n4. 온도 조절 차이\n5. 연습문제 3개" },
    { id: 40, topic: "topic4", question: "굽기 손실률이란?", answer: "굽기 전후 무게 차이 비율 - 보통 10-15%의 수분이 증발합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 굽기 손실률이란?\n\n다음 순서로 설명해주세요:\n1. 굽기 손실의 정의\n2. 계산 방법\n3. 영향 요인\n4. 제품별 손실률\n5. 연습문제 3개" },

    // 토픽5: 제품 종류와 특성 (10문항)
    { id: 41, topic: "topic5", question: "식빵(산형/풀먼)의 차이점은?", answer: "틀 덮개 유무 - 풀먼은 덮개를 씌워 네모난 단면, 산형은 덮개 없이 둥근 단면입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵(산형/풀먼)의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 산형 식빵의 특성\n2. 풀먼 식빵의 특성\n3. 제조 방법 차이\n4. 용도별 선택\n5. 연습문제 3개" },
    { id: 42, topic: "topic5", question: "바게트의 특징은?", answer: "껍질 바삭, 기공 큼 - 밀가루, 물, 소금, 이스트만으로 만드는 프랑스 빵입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 바게트의 특징은?\n\n다음 순서로 설명해주세요:\n1. 바게트의 정의\n2. 배합 특성\n3. 제조 공정 특성\n4. 쿠프의 역할\n5. 연습문제 3개" },
    { id: 43, topic: "topic5", question: "브리오슈의 특징은?", answer: "버터와 계란 다량 - 리치 도우(rich dough)의 대표적인 프랑스 빵입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 브리오슈의 특징은?\n\n다음 순서로 설명해주세요:\n1. 브리오슈의 정의\n2. 배합 특성\n3. 제조 시 주의점\n4. 변형 제품\n5. 연습문제 3개" },
    { id: 44, topic: "topic5", question: "베이글의 특징적인 공정은?", answer: "끓는 물에 데치기 - 굽기 전 데쳐서 쫄깃한 식감을 만듭니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 베이글의 특징적인 공정은?\n\n다음 순서로 설명해주세요:\n1. 베이글의 정의\n2. 데치기 공정\n3. 식감 형성 원리\n4. 배합 특성\n5. 연습문제 3개" },
    { id: 45, topic: "topic5", question: "호밀빵의 특성은?", answer: "글루텐 부족, 산미 - 사워도우를 사용하여 신맛이 나고 조직이 치밀합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 호밀빵의 특성은?\n\n다음 순서로 설명해주세요:\n1. 호밀의 특성\n2. 글루텐 형성 문제\n3. 사워도우의 역할\n4. 제조 시 주의점\n5. 연습문제 3개" },
    { id: 46, topic: "topic5", question: "도넛의 튀김 온도는?", answer: "170-180°C - 온도가 낮으면 기름을 많이 흡수합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 도넛의 튀김 온도는?\n\n다음 순서로 설명해주세요:\n1. 적정 튀김 온도\n2. 온도가 높거나 낮을 때\n3. 튀김 시간\n4. 기름 관리\n5. 연습문제 3개" },
    { id: 47, topic: "topic5", question: "크로와상의 층 형성 원리는?", answer: "버터층과 반죽층 분리 - 폴딩(접기)으로 다층 구조를 만듭니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 크로와상의 층 형성 원리는?\n\n다음 순서로 설명해주세요:\n1. 층 형성 원리\n2. 폴딩 방법\n3. 온도 관리의 중요성\n4. 층 수 계산\n5. 연습문제 3개" },
    { id: 48, topic: "topic5", question: "소보로빵의 토핑 배합 비율은?", answer: "버터:설탕:밀가루 = 1:1:2 정도 - 소보로의 기본 배합입니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 소보로빵의 토핑 배합 비율은?\n\n다음 순서로 설명해주세요:\n1. 소보로의 정의\n2. 기본 배합\n3. 제조 방법\n4. 응용 토핑\n5. 연습문제 3개" },
    { id: 49, topic: "topic5", question: "식빵의 표준 무게(1근)는?", answer: "약 400g - 틀 용량과 분할 무게 계산의 기준이 됩니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 식빵의 표준 무게(1근)는?\n\n다음 순서로 설명해주세요:\n1. 식빵 1근의 정의\n2. 분할 무게 계산\n3. 틀 용량과의 관계\n4. 굽기 손실 고려\n5. 연습문제 3개" },
    { id: 50, topic: "topic5", question: "빵의 노화 방지 방법은?", answer: "밀봉, 냉동, 유화제 사용 - 냉장은 오히려 노화를 촉진합니다.", prompt: "제빵기능사 제빵이론 문제입니다.\n\n문제: 빵의 노화 방지 방법은?\n\n다음 순서로 설명해주세요:\n1. 빵 노화의 원리\n2. 노화 방지 방법\n3. 냉장이 좋지 않은 이유\n4. 냉동 보관법\n5. 연습문제 3개" },
  ];

  const topics = [
    { id: "topic1", name: "반죽법", icon: "🥄", count: 10 },
    { id: "topic2", name: "발효 공정", icon: "🦠", count: 10 },
    { id: "topic3", name: "성형과 팬닝", icon: "👐", count: 10 },
    { id: "topic4", name: "굽기와 냉각", icon: "🔥", count: 10 },
    { id: "topic5", name: "제품 종류와 특성", icon: "🍞", count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-amber-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">제빵이론</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🍞</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">제빵이론</h1>
              <p className="text-amber-100">제빵기능사 필기시험 핵심 과목</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-amber-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-500 h-4 rounded-full transition-all duration-500"
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm">
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
                            : "border-gray-200 hover:border-amber-300"
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
                            className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
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
            href="/category/service/bakery/study/nutrition"
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전: 영양학
          </Link>
          <Link
            href="/category/service/bakery/study/practical"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition font-medium"
          >
            다음: 실기
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
