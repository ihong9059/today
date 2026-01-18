"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PracticalPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("beauty-general-practical-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem("beauty-general-practical-completed", JSON.stringify(updated));
  };

  const topics = [
    {
      title: "헤어 커트 실기",
      questions: [
        { id: 1, question: "그라데이션 커트 실기 시 가장 중요한 포인트는?", answer: "45도 각도 유지, 자연스러운 층의 연결", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 그라데이션 커트 실기 시 가장 중요한 포인트는?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 2, question: "레이어 커트에서 가이드 설정 방법은?", answer: "정수리에서 첫 가이드 설정 후 방사형으로 연결", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 레이어 커트에서 가이드 설정 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 3, question: "원랭스 커트의 정확한 라인을 만드는 방법은?", answer: "수평 파팅, 자연시점에서 커트, 텐션 일정하게", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 원랭스 커트의 정확한 라인을 만드는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 4, question: "커트 시 좌우 균형을 맞추는 방법은?", answer: "크로스 체크, 거울 확인, 양쪽 동시 비교", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 커트 시 좌우 균형을 맞추는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 5, question: "네이프 라인 정리 시 주의사항은?", answer: "목선과 헤어라인 확인, 클리퍼 각도 조절", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 네이프 라인 정리 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 6, question: "숏 커트에서 볼륨 조절 방법은?", answer: "틴닝, 텍스처링, 베이스 높이 조절", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 숏 커트에서 볼륨 조절 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 7, question: "앞머리(뱅) 커트 시 정확한 라인 만들기는?", answer: "이마 중앙 기준, 좌우 대칭, 눈썹 라인 확인", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 앞머리(뱅) 커트 시 정확한 라인 만들기는?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 8, question: "커트 마무리 단계에서 체크할 사항은?", answer: "전체 균형, 끝선 정리, 잔머리 제거", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 커트 마무리 단계에서 체크할 사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 9, question: "위그(마네킹) 고정 및 준비 방법은?", answer: "클램프로 단단히 고정, 빗질로 엉킴 제거", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 위그(마네킹) 고정 및 준비 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 10, question: "섹션 분할 시 정확한 파팅 방법은?", answer: "꼬리빗 사용, 직선 유지, 클립으로 고정", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 섹션 분할 시 정확한 파팅 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
      ],
    },
    {
      title: "블로우 드라이",
      questions: [
        { id: 11, question: "C컬 드라이의 올바른 기법은?", answer: "롤브러시로 안쪽으로 말며 열 가하기", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: C컬 드라이의 올바른 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 12, question: "S컬 드라이에서 웨이브 만드는 방법은?", answer: "안쪽과 바깥쪽 번갈아 말며 S자 형태 만들기", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: S컬 드라이에서 웨이브 만드는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 13, question: "드라이 시 텐션 유지의 중요성은?", answer: "일정한 텐션으로 매끄러운 표면과 볼륨 유지", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 드라이 시 텐션 유지의 중요성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 14, question: "뿌리 볼륨 살리는 드라이 기법은?", answer: "뿌리를 들어올려 반대 방향으로 드라이", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 뿌리 볼륨 살리는 드라이 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 15, question: "드라이기와 브러시의 각도 조절 방법은?", answer: "드라이기 45도 아래 방향, 브러시와 직각 유지", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 드라이기와 브러시의 각도 조절 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 16, question: "롤브러시 크기 선택 기준은?", answer: "원하는 컬 크기에 따라 선택, 큰 롤은 큰 웨이브", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 롤브러시 크기 선택 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 17, question: "앞머리 드라이 시 주의점은?", answer: "좌우 대칭, 자연스러운 흐름, 이마에 붙지 않게", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 앞머리 드라이 시 주의점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 18, question: "드라이 완성 후 광택 내는 방법은?", answer: "쿨샷으로 마무리, 세럼이나 오일 사용", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 드라이 완성 후 광택 내는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 19, question: "드라이 시 열 손상 방지 방법은?", answer: "적정 온도 유지, 한 부분에 오래 머물지 않기", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 드라이 시 열 손상 방지 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 20, question: "시험장에서 드라이 시간 단축 방법은?", answer: "80% 건조 후 브러싱, 섹션별 체계적 진행", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 시험장에서 드라이 시간 단축 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
      ],
    },
    {
      title: "아이론 스타일링",
      questions: [
        { id: 21, question: "스트레이트 아이론으로 직모 만드는 방법은?", answer: "얇은 섹션, 뿌리부터 끝까지 천천히 통과", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 스트레이트 아이론으로 직모 만드는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 22, question: "컬 아이론으로 웨이브 만드는 기법은?", answer: "모발을 감아 3-5초 유지, 방향 일정하게", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 컬 아이론으로 웨이브 만드는 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 23, question: "아이론 온도 설정 기준은?", answer: "건강모 180°C, 손상모 150°C 이하", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론 온도 설정 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 24, question: "아이론 사용 전 열 보호 스프레이 사용 이유는?", answer: "고열로 인한 큐티클 손상과 수분 증발 방지", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론 사용 전 열 보호 스프레이 사용 이유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 25, question: "내추럴 웨이브 아이론 기법은?", answer: "안쪽과 바깥쪽 번갈아 감기, 끝은 풀어주기", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 내추럴 웨이브 아이론 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 26, question: "아이론으로 볼륨감 주는 방법은?", answer: "뿌리 쪽 살짝 들어올려 컬 형성", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론으로 볼륨감 주는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 27, question: "컬 아이론 직경 선택 기준은?", answer: "원하는 컬 크기의 2배 직경 선택", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 컬 아이론 직경 선택 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 28, question: "아이론 컬 유지 시간 연장 방법은?", answer: "컬 후 핀으로 고정하여 식히기, 스프레이 사용", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론 컬 유지 시간 연장 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 29, question: "아이론 화상 방지를 위한 주의사항은?", answer: "두피/피부 접촉 금지, 보호 장갑 사용", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론 화상 방지를 위한 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 30, question: "아이론 관리 및 청소 방법은?", answer: "사용 후 식힌 뒤 젖은 천으로 닦기, 잔여물 제거", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 아이론 관리 및 청소 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
      ],
    },
    {
      title: "업스타일",
      questions: [
        { id: 31, question: "롤셋팅 기본 기법은?", answer: "모발을 롤에 감아 핀으로 고정, 열 또는 시간으로 셋팅", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 롤셋팅 기본 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 32, question: "핀컬(Pin Curl) 만드는 방법은?", answer: "손가락에 모발 감아 두피 가까이 핀으로 고정", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 핀컬(Pin Curl) 만드는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 33, question: "업스타일에서 베이스 만드는 방법은?", answer: "백콤빙으로 볼륨 형성, 핀으로 고정", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 업스타일에서 베이스 만드는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 34, question: "업스타일 고정 시 사용하는 도구는?", answer: "U핀, 일자핀, 고무줄, 헤어스프레이", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 업스타일 고정 시 사용하는 도구는?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 35, question: "올림머리의 균형 잡는 방법은?", answer: "좌우 대칭 확인, 뒤에서 앞으로 전체 형태 체크", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 올림머리의 균형 잡는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 36, question: "웨이브가 풀리지 않게 유지하는 방법은?", answer: "핀으로 고정, 스프레이 사용, 습기 차단", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 웨이브가 풀리지 않게 유지하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 37, question: "트위스트 기법 활용 방법은?", answer: "모발을 꼬아 올려 핀으로 고정, 질감 표현", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 트위스트 기법 활용 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 38, question: "루프(Loop) 만들기 기법은?", answer: "모발 끝을 구부려 원형으로 핀 고정", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 루프(Loop) 만들기 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 39, question: "업스타일 마무리 시 잔머리 정리 방법은?", answer: "왁스나 젤로 잡고, 핀셋으로 정리", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 업스타일 마무리 시 잔머리 정리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
        { id: 40, question: "업스타일 시험에서 시간 관리 방법은?", answer: "베이스 5분, 본 스타일 10분, 마무리 5분 배분", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 업스타일 시험에서 시간 관리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 기술 포인트\n2. 시술 순서\n3. 채점 기준\n4. 실수 방지 팁\n5. 연습 방법" },
      ],
    },
    {
      title: "실기 시험 주의사항",
      questions: [
        { id: 41, question: "실기 시험장 입실 전 준비물 체크리스트는?", answer: "수험표, 신분증, 위그, 도구 일체, 복장", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 실기 시험장 입실 전 준비물 체크리스트는?\n\n다음 순서로 설명해주세요:\n1. 필수 준비물\n2. 도구 점검 사항\n3. 금지 물품\n4. 입실 절차\n5. 체크리스트 예시" },
        { id: 42, question: "시험 중 도구 배치 및 정리 방법은?", answer: "사용 순서대로 배치, 사용 후 제자리, 청결 유지", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 시험 중 도구 배치 및 정리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 포인트\n2. 배치 순서\n3. 채점 영향\n4. 정리 팁\n5. 감점 사례" },
        { id: 43, question: "시험 중 시간 초과 시 어떻게 되나?", answer: "큰 감점 또는 해당 과제 0점 처리", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 시험 중 시간 초과 시 어떻게 되나?\n\n다음 순서로 설명해주세요:\n1. 시간 초과 규정\n2. 감점 기준\n3. 시간 관리 방법\n4. 응급 대처법\n5. 연습 전략" },
        { id: 44, question: "실기 시험에서 가장 흔한 감점 사유는?", answer: "좌우 불균형, 층 연결 불량, 시간 초과", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 실기 시험에서 가장 흔한 감점 사유는?\n\n다음 순서로 설명해주세요:\n1. 감점 유형별 분류\n2. 각 유형별 점수\n3. 예방 방법\n4. 실수 체크 방법\n5. 연습 포인트" },
        { id: 45, question: "위그(마네킹) 관리 및 손질 방법은?", answer: "시험 전 샴푸, 엉킴 제거, 건조 후 보관", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 위그(마네킹) 관리 및 손질 방법은?\n\n다음 순서로 설명해주세요:\n1. 일일 관리법\n2. 세척 방법\n3. 보관 방법\n4. 시험 전 준비\n5. 위그 선택 팁" },
        { id: 46, question: "시험 당일 긴장 완화 방법은?", answer: "충분한 수면, 일찍 도착, 심호흡, 루틴 점검", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 시험 당일 긴장 완화 방법은?\n\n다음 순서로 설명해주세요:\n1. 사전 준비\n2. 당일 아침 루틴\n3. 시험장 도착 후\n4. 시험 중 마음가짐\n5. 멘탈 관리 팁" },
        { id: 47, question: "실기 시험 복장 규정은?", answer: "깔끔한 복장, 앞치마 착용, 긴 머리 묶기", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 실기 시험 복장 규정은?\n\n다음 순서로 설명해주세요:\n1. 복장 규정\n2. 권장 복장\n3. 금지 복장\n4. 액세서리 규정\n5. 복장 관련 감점" },
        { id: 48, question: "시험 중 실수 시 대처 방법은?", answer: "당황하지 않고 수정, 시간 내 최선의 결과 도출", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 시험 중 실수 시 대처 방법은?\n\n다음 순서로 설명해주세요:\n1. 흔한 실수 유형\n2. 각 유형별 대처\n3. 수정 가능 범위\n4. 포기 vs 수정 판단\n5. 마음가짐" },
        { id: 49, question: "연습 시 효과적인 피드백 받는 방법은?", answer: "사진/영상 촬영, 선생님 피드백, 채점 기준 대조", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 연습 시 효과적인 피드백 받는 방법은?\n\n다음 순서로 설명해주세요:\n1. 자가 점검 방법\n2. 피드백 포인트\n3. 개선 연습\n4. 반복 훈련\n5. 진도 체크" },
        { id: 50, question: "실기 시험 합격을 위한 연습 계획은?", answer: "최소 50회 이상 반복, 시간 단축 연습, 모의시험", prompt: "미용사(일반) 실기 문제입니다.\n\n문제: 실기 시험 합격을 위한 연습 계획은?\n\n다음 순서로 설명해주세요:\n1. 기간별 계획\n2. 일일 연습량\n3. 약점 보완\n4. 모의시험 활용\n5. 최종 점검" },
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
            <span className="text-pink-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">💇‍♀️</span>
            <div>
              <h1 className="text-3xl font-bold">실기</h1>
              <p className="text-rose-100">커트, 드라이, 아이론, 업스타일, 시험 주의사항 - 50문항</p>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-4 max-w-md">
            <div className="bg-white h-4 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-2 text-rose-100">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
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
                  <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">{tidx + 1}</span>
                  <span className="font-bold text-gray-900">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(tidx) ? "▲" : "▼"}</span>
              </button>
              {expandedTopics.includes(tidx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? "bg-rose-50 border-rose-200" : "bg-gray-50 border-gray-200"}`}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="checkbox"
                              checked={completedQuestions.includes(q.id)}
                              onChange={() => toggleQuestion(q.id)}
                              className="w-5 h-5 rounded text-rose-500"
                            />
                            <span className="text-sm text-gray-500">Q{q.id}</span>
                          </div>
                          <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                          <p className="text-sm text-rose-600">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition whitespace-nowrap"
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
          <p className="text-gray-400">© 2026 자격증 가이드. 미용사(일반) - 실기</p>
        </div>
      </footer>
    </div>
  );
}
