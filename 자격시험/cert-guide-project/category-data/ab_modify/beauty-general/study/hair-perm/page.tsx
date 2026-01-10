"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HairPermPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("beauty-general-hair-perm-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem("beauty-general-hair-perm-completed", JSON.stringify(updated));
  };

  const topics = [
    {
      title: "퍼머넌트 웨이브 원리",
      questions: [
        { id: 1, question: "퍼머넌트 웨이브의 기본 원리는?", answer: "환원제로 시스틴 결합 끊고, 산화제로 재결합", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 퍼머넌트 웨이브의 기본 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 화학적 과정\n4. 모발 구조 변화\n5. 연습문제 3개" },
        { id: 2, question: "펌 1제(환원제)의 역할과 주성분은?", answer: "시스틴 결합 분리, 티오글리콜산(TGA) 또는 시스테인", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 1제(환원제)의 역할과 주성분은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 성분별 특징\n4. 모발 타입별 선택\n5. 연습문제 3개" },
        { id: 3, question: "펌 2제(산화제)의 역할과 주성분은?", answer: "시스틴 결합 재결합, 브롬산나트륨 또는 과산화수소", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 2제(산화제)의 역할과 주성분은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 산화제 종류\n4. 적정 방치 시간\n5. 연습문제 3개" },
        { id: 4, question: "시스틴 결합(S-S Bond)이란?", answer: "모발 강도와 형태를 결정하는 황 결합", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 시스틴 결합(S-S Bond)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 결합 파괴 과정\n4. 결합 재형성\n5. 연습문제 3개" },
        { id: 5, question: "펌 약제의 pH가 모발에 미치는 영향은?", answer: "알칼리성이 높을수록 큐티클 팽창, 침투력 증가", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 약제의 pH가 모발에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. pH 범위별 효과\n4. 손상모 주의사항\n5. 연습문제 3개" },
        { id: 6, question: "알칼리펌과 산성펌의 차이점은?", answer: "알칼리(pH 9-10 강한 컬), 산성(pH 5-7 부드러운 컬)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 알칼리펌과 산성펌의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적합한 모발 타입\n4. 선택 기준\n5. 연습문제 3개" },
        { id: 7, question: "연화(Softening) 과정이란?", answer: "1제가 모발에 작용하여 결합이 끊어지는 단계", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 연화(Softening) 과정이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 연화 체크 방법\n4. 과연화 시 대처\n5. 연습문제 3개" },
        { id: 8, question: "펌 시술 시 적정 방치 시간 결정 방법은?", answer: "모발 상태, 약제 농도, 온도에 따라 테스트 컬로 확인", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 시술 시 적정 방치 시간 결정 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 테스트 컬 방법\n4. 시간 조절 요령\n5. 연습문제 3개" },
        { id: 9, question: "중간 린스의 목적은?", answer: "1제 제거 및 모발 팽창 완화, 2제 효과 극대화", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 중간 린스의 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 린스 방법\n4. 주의사항\n5. 연습문제 3개" },
        { id: 10, question: "오버 프로세싱(Over Processing)이란?", answer: "과도한 약제 작용으로 모발 손상, 탄력 상실", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 오버 프로세싱(Over Processing)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 증상과 원인\n4. 예방 및 대처법\n5. 연습문제 3개" },
      ],
    },
    {
      title: "펌 종류와 기법",
      questions: [
        { id: 11, question: "콜드펌(Cold Perm)의 특징과 장단점은?", answer: "상온에서 시술, 자연스러운 웨이브, 손상 적음", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 콜드펌(Cold Perm)의 특징과 장단점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 과정\n4. 적합한 모발\n5. 연습문제 3개" },
        { id: 12, question: "열펌(Hot Perm/Digital Perm)의 원리는?", answer: "열을 가해 모발 형태 변형, 굵은 컬 형성", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 열펌(Hot Perm/Digital Perm)의 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 온도 설정\n4. 주의사항\n5. 연습문제 3개" },
        { id: 13, question: "볼륨펌(Volume Perm)의 목적과 적용 부위는?", answer: "뿌리 볼륨 살리기, 정수리·탑 부분", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 볼륨펌(Volume Perm)의 목적과 적용 부위는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 유지 기간\n5. 연습문제 3개" },
        { id: 14, question: "다운펌(Down Perm)의 효과와 적합한 모발은?", answer: "곱슬기 완화, 천연 곱슬이나 뜨는 모발에 적합", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 다운펌(Down Perm)의 효과와 적합한 모발은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 과정\n4. 관리법\n5. 연습문제 3개" },
        { id: 15, question: "S컬 펌과 C컬 펌의 차이는?", answer: "S컬은 웨이브, C컬은 끝만 안쪽으로 말림", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: S컬 펌과 C컬 펌의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 로드 선택\n4. 스타일링 방법\n5. 연습문제 3개" },
        { id: 16, question: "히피펌/레게펌의 특징은?", answer: "촘촘한 작은 컬, 긴 로드 사용, 볼륨감 극대화", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 히피펌/레게펌의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 시간\n4. 관리 방법\n5. 연습문제 3개" },
        { id: 17, question: "스트레이트 펌(매직)의 원리는?", answer: "고온 아이론으로 시스틴 결합을 직선 형태로 고정", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 스트레이트 펌(매직)의 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 과정\n4. 손상 최소화 방법\n5. 연습문제 3개" },
        { id: 18, question: "셋팅펌(Setting Perm)이란?", answer: "펌 후 드라이나 아이론으로 컬 살리는 것이 필요한 펌", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 셋팅펌(Setting Perm)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 셋팅 방법\n4. 유지 관리\n5. 연습문제 3개" },
        { id: 19, question: "부분펌(Partial Perm)의 적용 부위와 효과는?", answer: "앞머리, 정수리 등 부분적 볼륨이나 컬 추가", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 부분펌(Partial Perm)의 적용 부위와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 사례\n4. 시술 포인트\n5. 연습문제 3개" },
        { id: 20, question: "펌 유지 기간과 영향을 주는 요인은?", answer: "보통 3-6개월, 모질·관리·시술 방법에 따라 다름", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 유지 기간과 영향을 주는 요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 유지 연장 방법\n4. 리터치 시기\n5. 연습문제 3개" },
      ],
    },
    {
      title: "로드와 와인딩",
      questions: [
        { id: 21, question: "펌 로드의 크기가 컬에 미치는 영향은?", answer: "큰 로드는 느슨한 웨이브, 작은 로드는 촘촘한 컬", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌 로드의 크기가 컬에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 로드 선택 가이드\n4. 부위별 로드 크기\n5. 연습문제 3개" },
        { id: 22, question: "스파이럴 와인딩(Spiral Winding)의 특징은?", answer: "로드를 세로로 감아 나선형 컬 형성", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 스파이럴 와인딩(Spiral Winding)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 감는 방법\n4. 적합한 길이\n5. 연습문제 3개" },
        { id: 23, question: "크로키뇰 와인딩(Croquignole Winding)이란?", answer: "모발 끝부터 뿌리 방향으로 감기, 일반적인 방법", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 크로키뇰 와인딩(Croquignole Winding)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 감는 순서\n4. 효과\n5. 연습문제 3개" },
        { id: 24, question: "브릭(Brick) 패턴 배열의 장점은?", answer: "벽돌 패턴으로 자연스러운 볼륨, 라인 방지", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 브릭(Brick) 패턴 배열의 장점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 배열 방법\n4. 다른 패턴과 비교\n5. 연습문제 3개" },
        { id: 25, question: "베이스 컨트롤의 종류와 효과는?", answer: "온베이스(볼륨), 하프베이스(자연), 오프베이스(플랫)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 베이스 컨트롤의 종류와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 선택 기준\n4. 시술 팁\n5. 연습문제 3개" },
        { id: 26, question: "엔드 페이퍼(End Paper) 사용 목적은?", answer: "모발 끝 보호, 균일한 와인딩", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 엔드 페이퍼(End Paper) 사용 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 사용 방법\n4. 종류\n5. 연습문제 3개" },
        { id: 27, question: "텐션(장력)이 펌 결과에 미치는 영향은?", answer: "적당한 텐션이 균일한 컬 형성, 과다 시 끊어짐", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 텐션(장력)이 펌 결과에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적정 텐션 유지법\n4. 모발 상태별 조절\n5. 연습문제 3개" },
        { id: 28, question: "베이스 섹션의 크기가 결과에 미치는 영향은?", answer: "섹션이 작을수록 촘촘한 컬, 클수록 느슨한 컬", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 베이스 섹션의 크기가 결과에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 섹션 크기 결정\n4. 로드 크기와의 관계\n5. 연습문제 3개" },
        { id: 29, question: "웨이브 방향 결정 요소는?", answer: "와인딩 방향, 로드 각도, 섹션 방향", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 웨이브 방향 결정 요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 방향 설정 팁\n4. 대칭 vs 비대칭\n5. 연습문제 3개" },
        { id: 30, question: "더블 와인딩(Double Winding)의 효과는?", answer: "2개 로드 사용으로 복합적인 웨이브 표현", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 더블 와인딩(Double Winding)의 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 적용 스타일\n5. 연습문제 3개" },
      ],
    },
    {
      title: "염색 원리와 종류",
      questions: [
        { id: 31, question: "산화염모제의 작용 원리는?", answer: "1제(색소)+2제(과산화수소)가 모발 내부에서 발색", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 산화염모제의 작용 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 화학 반응 과정\n4. 지속 시간\n5. 연습문제 3개" },
        { id: 32, question: "탈색(Bleaching)의 원리와 주의사항은?", answer: "멜라닌 색소 분해, 과탈색 시 심한 손상", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 탈색(Bleaching)의 원리와 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 탈색 레벨\n4. 손상 최소화 방법\n5. 연습문제 3개" },
        { id: 33, question: "염모제의 종류(일시적, 반영구적, 영구적)를 설명하시오.", answer: "일시적(1회 샴푸), 반영구(4-6회), 영구(성장 시까지)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 염모제의 종류(일시적, 반영구적, 영구적)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각각의 장단점\n4. 선택 가이드\n5. 연습문제 3개" },
        { id: 34, question: "과산화수소(Developer)의 농도별 용도는?", answer: "3%(어둡게), 6%(동일레벨), 9%(1-2레벨업), 12%(3레벨이상)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 과산화수소(Developer)의 농도별 용도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 농도 선택 기준\n4. 주의사항\n5. 연습문제 3개" },
        { id: 35, question: "새치 염색(Gray Coverage)의 포인트는?", answer: "100% 커버력, 뿌리 도포 정확성, 방치 시간 준수", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 새치 염색(Gray Coverage)의 포인트는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 순서\n4. 리터치 주기\n5. 연습문제 3개" },
        { id: 36, question: "컬러 휠(Color Wheel)과 보색 관계의 활용은?", answer: "보색으로 원치 않는 색조 중화(주황→파랑 등)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 컬러 휠(Color Wheel)과 보색 관계의 활용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 보색 활용 예시\n4. 색상 조합\n5. 연습문제 3개" },
        { id: 37, question: "레벨(Level)과 톤(Tone)의 차이는?", answer: "레벨은 명도(밝기), 톤은 색조(색상)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 레벨(Level)과 톤(Tone)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 레벨 시스템\n4. 톤 코드 읽기\n5. 연습문제 3개" },
        { id: 38, question: "하이라이트(Highlight)와 로우라이트(Lowlight)의 차이는?", answer: "하이라이트는 밝게, 로우라이트는 어둡게 포인트", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 하이라이트(Highlight)와 로우라이트(Lowlight)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 기법\n4. 효과\n5. 연습문제 3개" },
        { id: 39, question: "발레아쥬(Balayage) 기법의 특징은?", answer: "손으로 자유롭게 칠하는 기법, 자연스러운 그라데이션", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 발레아쥬(Balayage) 기법의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 옴브레와 차이\n5. 연습문제 3개" },
        { id: 40, question: "염색 전 패치 테스트의 중요성과 방법은?", answer: "알레르기 반응 확인, 48시간 전 귀 뒤나 팔 안쪽", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 염색 전 패치 테스트의 중요성과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 테스트 절차\n4. 이상 반응 시 대처\n5. 연습문제 3개" },
      ],
    },
    {
      title: "염색 시술과 관리",
      questions: [
        { id: 41, question: "버진 헤어(Virgin Hair) 염색 시 도포 순서는?", answer: "중간 → 모근 → 모발 끝 순서로 도포", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 버진 헤어(Virgin Hair) 염색 시 도포 순서는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 도포 이유\n4. 주의사항\n5. 연습문제 3개" },
        { id: 42, question: "리터치(Retouch) 염색의 방법과 주의점은?", answer: "새로 자란 뿌리만 도포, 기존 염색 부분 피하기", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 리터치(Retouch) 염색의 방법과 주의점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 순서\n4. 실수 방지 팁\n5. 연습문제 3개" },
        { id: 43, question: "염색 시 체온이 결과에 미치는 영향은?", answer: "두피 가까운 뿌리가 먼저 발색(체온 높아서)", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 염색 시 체온이 결과에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 균일한 발색 방법\n4. 도포 순서 조절\n5. 연습문제 3개" },
        { id: 44, question: "색소 침착(Stain) 방지 방법은?", answer: "헤어라인에 보호크림 도포, 즉시 닦아내기", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 색소 침착(Stain) 방지 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 침착 제거 방법\n4. 예방 제품\n5. 연습문제 3개" },
        { id: 45, question: "염색 후 관리(Aftercare) 방법은?", answer: "컬러 샴푸, 자외선 차단, 열 스타일링 자제", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 염색 후 관리(Aftercare) 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 제품 추천\n4. 색상 유지 팁\n5. 연습문제 3개" },
        { id: 46, question: "컬러 보정(Color Correction)이 필요한 경우는?", answer: "원치 않는 색상, 불균일한 발색, 과탈색 시", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 컬러 보정(Color Correction)이 필요한 경우는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 보정 방법\n4. 예방 방법\n5. 연습문제 3개" },
        { id: 47, question: "펌과 염색 동시 시술 시 주의사항은?", answer: "펌 먼저 후 최소 1주일 후 염색, 손상 최소화", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 펌과 염색 동시 시술 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 간격\n4. 동시 시술 가능 경우\n5. 연습문제 3개" },
        { id: 48, question: "탈색 후 토너(Toner) 사용 목적은?", answer: "원치 않는 황색이나 주황색 중화, 원하는 색조 완성", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 탈색 후 토너(Toner) 사용 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 토너 종류\n4. 사용 방법\n5. 연습문제 3개" },
        { id: 49, question: "염색 알레르기 반응의 증상과 대처법은?", answer: "가려움, 발적, 부종 / 즉시 세척, 필요시 병원", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 염색 알레르기 반응의 증상과 대처법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 응급 처치\n4. 예방법\n5. 연습문제 3개" },
        { id: 50, question: "홈 염색과 살롱 염색의 차이점은?", answer: "살롱은 맞춤 배합, 전문 기술, 균일한 결과", prompt: "미용사(일반) 헤어 펌·염색 문제입니다.\n\n문제: 홈 염색과 살롱 염색의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 장단점 비교\n4. 살롱 염색 권장 경우\n5. 연습문제 3개" },
      ],
    },
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-400">/</span>
            <Link href="/category/service" className="text-gray-500 hover:text-gray-700">서비스</Link>
            <span className="text-gray-400">/</span>
            <Link href="/category/service/beauty-general" className="text-gray-500 hover:text-gray-700">미용사(일반)</Link>
            <span className="text-gray-400">/</span>
            <span className="text-pink-600 font-medium">헤어 펌·염색</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🎨</span>
            <div>
              <h1 className="text-3xl font-bold">헤어 펌·염색</h1>
              <p className="text-pink-100">펌 원리, 염색 기법, 약제, 관리 - 50문항</p>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-4 max-w-md">
            <div className="bg-white h-4 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-2 text-pink-100">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, tidx) => (
            <div key={tidx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedTopics(expandedTopics.includes(tidx) ? expandedTopics.filter(t => t !== tidx) : [...expandedTopics, tidx])}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">{tidx + 1}</span>
                  <span className="font-bold text-gray-900">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(tidx) ? "▲" : "▼"}</span>
              </button>
              {expandedTopics.includes(tidx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? "bg-pink-50 border-pink-200" : "bg-gray-50 border-gray-200"}`}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="checkbox"
                              checked={completedQuestions.includes(q.id)}
                              onChange={() => toggleQuestion(q.id)}
                              className="w-5 h-5 rounded text-pink-500"
                            />
                            <span className="text-sm text-gray-500">Q{q.id}</span>
                          </div>
                          <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                          <p className="text-sm text-pink-600">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm hover:bg-pink-200 transition whitespace-nowrap"
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
      </div>

      {/* AI Modal */}
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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert("프롬프트가 복사되었습니다!"); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 미용사(일반) - 헤어 펌·염색</p>
        </div>
      </footer>
    </div>
  );
}
