"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HairCuttingPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("beauty-general-hair-cutting-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem("beauty-general-hair-cutting-completed", JSON.stringify(updated));
  };

  const topics = [
    {
      title: "커트의 기본 원리",
      questions: [
        { id: 1, question: "커트의 4가지 기본 형태는?", answer: "원랭스, 그라데이션, 레이어, 유니폼 레이어", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 커트의 4가지 기본 형태는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 형태의 특징\n4. 적합한 얼굴형\n5. 연습문제 3개" },
        { id: 2, question: "베이스 라인(Base Line)이란 무엇인가?", answer: "커트의 기준이 되는 첫 번째 가이드 라인", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 베이스 라인(Base Line)이란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 베이스 라인 설정법\n4. 주의사항\n5. 연습문제 3개" },
        { id: 3, question: "가이드 라인(Guide Line)의 역할은?", answer: "다음 섹션 커트 시 길이 기준이 되는 선", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 가이드 라인(Guide Line)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 가이드 활용법\n4. 이동 가이드 vs 고정 가이드\n5. 연습문제 3개" },
        { id: 4, question: "커트 시 모발의 자연시점(Natural Fall)이란?", answer: "모발이 자연스럽게 떨어지는 위치", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 커트 시 모발의 자연시점(Natural Fall)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 자연시점 활용\n4. 시점에 따른 결과 차이\n5. 연습문제 3개" },
        { id: 5, question: "오버 다이렉션(Over Direction)의 의미와 효과는?", answer: "자연시점을 벗어나 모발을 당겨 길이 차이 만들기", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 오버 다이렉션(Over Direction)의 의미와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 오버 다이렉션 기법\n4. 결과물 예시\n5. 연습문제 3개" },
        { id: 6, question: "텐션(Tension)이 커트에 미치는 영향은?", answer: "당김의 강도에 따라 길이와 라인이 달라짐", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 텐션(Tension)이 커트에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적정 텐션 유지법\n4. 모발 타입별 텐션\n5. 연습문제 3개" },
        { id: 7, question: "웨트 커트와 드라이 커트의 차이점은?", answer: "웨트는 젖은 상태, 드라이는 마른 상태에서 커트", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 웨트 커트와 드라이 커트의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각각의 장단점\n4. 상황별 선택 기준\n5. 연습문제 3개" },
        { id: 8, question: "두상의 기준점(Reference Points)을 설명하시오.", answer: "정수리, 후두골, 이어포인트, 크라운 등", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 두상의 기준점(Reference Points)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 기준점별 활용\n4. 섹션 분할과의 관계\n5. 연습문제 3개" },
        { id: 9, question: "프레임(Frame) 커트란 무엇인가?", answer: "얼굴 주변을 감싸는 앞머리/옆머리 커트", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 프레임(Frame) 커트란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 얼굴형별 프레임\n4. 시술 기법\n5. 연습문제 3개" },
        { id: 10, question: "무게선(Weight Line)의 개념과 조절 방법은?", answer: "모발이 모여 두꺼워 보이는 선, 층 조절로 변경", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 무게선(Weight Line)의 개념과 조절 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 무게선 조절 기법\n4. 스타일별 무게선 위치\n5. 연습문제 3개" },
      ],
    },
    {
      title: "가위와 도구 사용법",
      questions: [
        { id: 11, question: "커트 가위의 올바른 잡는 방법은?", answer: "엄지와 약지를 링에 넣고, 검지로 안정감 유지", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 커트 가위의 올바른 잡는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 잡는 자세 교정\n4. 손 피로 방지법\n5. 연습문제 3개" },
        { id: 12, question: "슬라이드 커팅(Slide Cutting)의 기법과 효과는?", answer: "가위를 미끄러뜨리며 자르기, 자연스러운 층 표현", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 슬라이드 커팅(Slide Cutting)의 기법과 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 적합한 모발 타입\n5. 연습문제 3개" },
        { id: 13, question: "포인트 커팅(Point Cutting)의 목적과 방법은?", answer: "끝을 뾰족하게 자르기, 자연스러운 모발 끝 표현", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 포인트 커팅(Point Cutting)의 목적과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 각도\n4. 효과 비교\n5. 연습문제 3개" },
        { id: 14, question: "틴닝가위(숱가위) 사용 시 주의사항은?", answer: "뿌리 쪽 사용 금지, 비율에 맞는 가위 선택", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 틴닝가위(숱가위) 사용 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 틴닝 비율 종류\n4. 모발 타입별 사용법\n5. 연습문제 3개" },
        { id: 15, question: "레이저(Razor) 커팅의 특징과 적합한 모발은?", answer: "면도칼로 자르기, 부드러운 질감, 굵은 모발 적합", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 레이저(Razor) 커팅의 특징과 적합한 모발은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 레이저 기법\n4. 주의사항\n5. 연습문제 3개" },
        { id: 16, question: "클리퍼(Clipper) 사용 부위와 기법은?", answer: "네이프, 사이드 등 짧은 부분, 페이드 기법", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 클리퍼(Clipper) 사용 부위와 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 가드 선택법\n4. 페이드 기법\n5. 연습문제 3개" },
        { id: 17, question: "커트빗(콤)의 종류와 용도는?", answer: "자루빗(커트), 꼬리빗(섹션), 쿠션빗(스타일링)", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 커트빗(콤)의 종류와 용도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 빗 선택 가이드\n4. 관리법\n5. 연습문제 3개" },
        { id: 18, question: "스트로크 커팅(Stroke Cutting)이란?", answer: "가위를 여러 번 움직이며 자르기, 숱 조절", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 스트로크 커팅(Stroke Cutting)이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 기법 종류\n4. 효과\n5. 연습문제 3개" },
        { id: 19, question: "블런트 커팅(Blunt Cutting)의 특징은?", answer: "가위로 직선 자르기, 선명한 라인", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 블런트 커팅(Blunt Cutting)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적합한 스타일\n4. 시술 팁\n5. 연습문제 3개" },
        { id: 20, question: "가위 관리 및 보관 방법은?", answer: "사용 후 세척·건조, 오일 도포, 케이스 보관", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 가위 관리 및 보관 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 날 연마 주기\n4. 보관 환경\n5. 연습문제 3개" },
      ],
    },
    {
      title: "원랭스와 그라데이션 커트",
      questions: [
        { id: 21, question: "원랭스 커트(One Length Cut)의 정의와 특징은?", answer: "모든 모발을 같은 길이로 자르기, 0도 각도", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 원랭스 커트(One Length Cut)의 정의와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 순서\n4. 적합한 얼굴형\n5. 연습문제 3개" },
        { id: 22, question: "원랭스 커트 시 섹션 나누는 방법은?", answer: "수평 파팅, 후두부부터 시작", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 원랭스 커트 시 섹션 나누는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 파팅 기법\n4. 주의사항\n5. 연습문제 3개" },
        { id: 23, question: "원랭스 보브 스타일의 특징은?", answer: "턱선~어깨 길이, 볼륨감 있는 단발", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 원랭스 보브 스타일의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 보브 변형 스타일\n4. 관리법\n5. 연습문제 3개" },
        { id: 24, question: "그라데이션 커트(Graduation Cut)의 정의는?", answer: "안쪽이 짧고 바깥쪽이 긴 층, 45도 각도", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 그라데이션 커트(Graduation Cut)의 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각도에 따른 효과\n4. 시술 순서\n5. 연습문제 3개" },
        { id: 25, question: "로우 그라데이션과 하이 그라데이션의 차이는?", answer: "로우는 낮은 층(15-30도), 하이는 높은 층(45-60도)", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 로우 그라데이션과 하이 그라데이션의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각각의 효과\n4. 선택 기준\n5. 연습문제 3개" },
        { id: 26, question: "그라데이션 커트에서 무게선의 위치는?", answer: "가장 긴 모발이 모이는 부분, 아웃라인 근처", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 그라데이션 커트에서 무게선의 위치는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 무게선 조절\n4. 스타일별 무게선\n5. 연습문제 3개" },
        { id: 27, question: "A라인 보브 커트의 특징은?", answer: "뒤는 짧고 앞으로 갈수록 길어지는 형태", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: A라인 보브 커트의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 적합한 얼굴형\n5. 연습문제 3개" },
        { id: 28, question: "쐐기(Wedge) 커트의 특징과 시술법은?", answer: "뒤가 볼록한 삼각형 형태, 스택 쌓기 기법", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 쐐기(Wedge) 커트의 특징과 시술법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 순서\n4. 스타일링 방법\n5. 연습문제 3개" },
        { id: 29, question: "비대칭(Asymmetric) 커트의 포인트는?", answer: "좌우 길이를 다르게 하여 개성 표현", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 비대칭(Asymmetric) 커트의 포인트는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 디자인 포인트\n4. 시술 주의사항\n5. 연습문제 3개" },
        { id: 30, question: "페리미터(Perimeter)와 인테리어(Interior) 구분은?", answer: "페리미터는 외곽선, 인테리어는 내부 층", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 페리미터(Perimeter)와 인테리어(Interior) 구분은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각각의 시술법\n4. 균형 잡기\n5. 연습문제 3개" },
      ],
    },
    {
      title: "레이어 커트",
      questions: [
        { id: 31, question: "레이어 커트(Layer Cut)의 정의와 특징은?", answer: "바깥쪽이 짧고 안쪽이 긴 층, 90도 이상 각도", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 레이어 커트(Layer Cut)의 정의와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 레이어의 장점\n4. 적합한 모발\n5. 연습문제 3개" },
        { id: 32, question: "유니폼 레이어(Uniform Layer)란?", answer: "두상 전체에 같은 길이의 층을 내는 커트", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 유니폼 레이어(Uniform Layer)란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 결과물 특징\n5. 연습문제 3개" },
        { id: 33, question: "인크리스 레이어(Increase Layer)의 특징은?", answer: "뒤로 갈수록 층이 높아지는 형태", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 인크리스 레이어(Increase Layer)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 각도\n4. 효과\n5. 연습문제 3개" },
        { id: 34, question: "롱 레이어 커트의 특징과 적합한 모발은?", answer: "긴 머리에 층내기, 숱 많은 모발 적합", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 롱 레이어 커트의 특징과 적합한 모발은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 층의 시작점\n4. 얼굴형별 길이\n5. 연습문제 3개" },
        { id: 35, question: "숏 레이어 커트의 포인트는?", answer: "짧은 길이에 풍성한 볼륨, 탑에서 시작", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 숏 레이어 커트의 포인트는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 순서\n4. 스타일링 팁\n5. 연습문제 3개" },
        { id: 36, question: "레이어 커트에서 각도가 결과에 미치는 영향은?", answer: "각도가 높을수록 층이 많아지고 가벼워짐", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 레이어 커트에서 각도가 결과에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각도별 효과\n4. 선택 가이드\n5. 연습문제 3개" },
        { id: 37, question: "샤기(Shag) 커트의 특징은?", answer: "불규칙한 층과 질감, 자연스럽고 캐주얼한 느낌", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 샤기(Shag) 커트의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 기법\n4. 스타일링\n5. 연습문제 3개" },
        { id: 38, question: "울프 컷(Wolf Cut)의 특징과 시술법은?", answer: "샤기+멀렛 결합, 탑은 짧고 뒤는 긴 형태", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 울프 컷(Wolf Cut)의 특징과 시술법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 포인트\n4. 관리법\n5. 연습문제 3개" },
        { id: 39, question: "페이스 프레이밍 레이어란?", answer: "얼굴 주변만 층을 내어 윤곽 강조", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 페이스 프레이밍 레이어란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 방법\n4. 얼굴형별 적용\n5. 연습문제 3개" },
        { id: 40, question: "레이어 연결(Blend) 기법은?", answer: "층과 층 사이를 자연스럽게 연결하는 기법", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 레이어 연결(Blend) 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 블렌딩 도구\n4. 체크 방법\n5. 연습문제 3개" },
      ],
    },
    {
      title: "섹션과 시술 기법",
      questions: [
        { id: 41, question: "섹션(Section) 분할의 목적과 방법은?", answer: "체계적 커트를 위해 구역 나누기, 클립으로 고정", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 섹션(Section) 분할의 목적과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 기본 섹션 방법\n4. 스타일별 섹션\n5. 연습문제 3개" },
        { id: 42, question: "수평 파팅과 수직 파팅의 효과 차이는?", answer: "수평은 볼륨, 수직은 무게감", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 수평 파팅과 수직 파팅의 효과 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 파팅 선택 기준\n4. 혼합 사용법\n5. 연습문제 3개" },
        { id: 43, question: "대각선(Diagonal) 파팅의 용도는?", answer: "자연스러운 연결, 비대칭 효과", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 대각선(Diagonal) 파팅의 용도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 대각선 각도별 효과\n4. 적용 스타일\n5. 연습문제 3개" },
        { id: 44, question: "피봇 포인트(Pivot Point)를 활용한 커트는?", answer: "한 점을 중심으로 방사형으로 자르기", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 피봇 포인트(Pivot Point)를 활용한 커트는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 피봇 커트 기법\n4. 결과물 특징\n5. 연습문제 3개" },
        { id: 45, question: "언더커팅(Undercutting)의 목적과 방법은?", answer: "안쪽 모발 줄여 볼륨 조절, 숱 많은 모발에 적용", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 언더커팅(Undercutting)의 목적과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 부위\n4. 주의사항\n5. 연습문제 3개" },
        { id: 46, question: "텍스처링(Texturizing) 기법의 종류는?", answer: "포인팅, 슬라이싱, 틴닝 등으로 질감 표현", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 텍스처링(Texturizing) 기법의 종류는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 기법별 효과\n4. 선택 가이드\n5. 연습문제 3개" },
        { id: 47, question: "디스커넥션(Disconnection) 커트란?", answer: "층을 연결하지 않고 명확한 선 만들기", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 디스커넥션(Disconnection) 커트란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 디자인 효과\n4. 시술 팁\n5. 연습문제 3개" },
        { id: 48, question: "네이프(Nape) 부분 시술 시 주의사항은?", answer: "목선 확인, 고객 자세, 헤어라인 정리", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 네이프(Nape) 부분 시술 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 네이프 디자인\n4. 클리퍼 사용법\n5. 연습문제 3개" },
        { id: 49, question: "앞머리(Bangs) 커트의 종류와 특징은?", answer: "일자 뱅, 사이드 뱅, 시스루 뱅, 커튼 뱅 등", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 앞머리(Bangs) 커트의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 얼굴형별 선택\n4. 시술 팁\n5. 연습문제 3개" },
        { id: 50, question: "커트 후 크로스 체크(Cross Check) 방법은?", answer: "시술 방향과 반대로 빗어 균형 확인", prompt: "미용사(일반) 헤어 커팅 문제입니다.\n\n문제: 커트 후 크로스 체크(Cross Check) 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 체크 순서\n4. 수정 방법\n5. 연습문제 3개" },
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
            <span className="text-pink-600 font-medium">헤어 커팅</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">✂️</span>
            <div>
              <h1 className="text-3xl font-bold">헤어 커팅</h1>
              <p className="text-pink-100">커트 원리, 도구, 기법, 스타일 - 50문항</p>
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
                          onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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
          <p className="text-gray-400">© 2026 자격증 가이드. 미용사(일반) - 헤어 커팅</p>
        </div>
      </footer>
    </div>
  );
}
