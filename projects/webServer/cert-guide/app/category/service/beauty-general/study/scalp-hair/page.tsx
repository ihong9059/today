"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ScalpHairPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("beauty-general-scalp-hair-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem("beauty-general-scalp-hair-completed", JSON.stringify(updated));
  };

  const topics = [
    {
      title: "두피의 구조와 기능",
      questions: [
        { id: 1, question: "두피의 층 구조를 설명하시오.", answer: "표피, 진피, 피하조직의 3층 구조", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 층 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 층의 기능\n4. 두피 건강과의 관계\n5. 연습문제 3개" },
        { id: 2, question: "두피의 피지선 역할과 과다 분비 시 문제점은?", answer: "모발 윤기 부여, 과다 시 지성두피·비듬·탈모", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 피지선 역할과 과다 분비 시 문제점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 관리 방법\n4. 관련 제품 추천\n5. 연습문제 3개" },
        { id: 3, question: "두피의 혈액순환이 모발에 미치는 영향은?", answer: "영양분과 산소 공급으로 모발 성장 촉진", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 혈액순환이 모발에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 혈액순환 촉진 방법\n4. 두피 마사지 기법\n5. 연습문제 3개" },
        { id: 4, question: "두피의 pH 정상 범위와 유지의 중요성은?", answer: "pH 4.5~5.5(약산성), 세균 번식 억제 및 큐티클 보호", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 pH 정상 범위와 유지의 중요성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. pH 불균형 시 문제점\n4. pH 균형 유지 방법\n5. 연습문제 3개" },
        { id: 5, question: "두피의 표피 세포 교체 주기는?", answer: "약 28일(4주), 턴오버 사이클", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 표피 세포 교체 주기는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 턴오버 장애 시 증상\n4. 건강한 턴오버 유지법\n5. 연습문제 3개" },
        { id: 6, question: "두피의 진피층에 존재하는 주요 구조물은?", answer: "모낭, 피지선, 땀샘, 혈관, 신경", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 진피층에 존재하는 주요 구조물은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 구조물의 기능\n4. 진피 건강 관리\n5. 연습문제 3개" },
        { id: 7, question: "두피 탄력 저하의 원인과 개선 방법은?", answer: "노화, 콜라겐 감소 / 두피 마사지, 영양 공급", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피 탄력 저하의 원인과 개선 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 탄력 측정 방법\n4. 케어 제품 성분\n5. 연습문제 3개" },
        { id: 8, question: "두피 온도와 모발 건강의 관계는?", answer: "정상 두피 온도 32~34°C, 과열 시 피지 과다 분비", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피 온도와 모발 건강의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 두피 열 관리\n4. 계절별 관리법\n5. 연습문제 3개" },
        { id: 9, question: "두피의 수분 밸런스가 깨지면 나타나는 증상은?", answer: "건조, 각질, 가려움, 민감성 두피", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피의 수분 밸런스가 깨지면 나타나는 증상은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 수분 공급 방법\n4. 추천 성분\n5. 연습문제 3개" },
        { id: 10, question: "두피 유형의 종류와 특징은?", answer: "건성, 지성, 복합성, 민감성 두피", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 두피 유형의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 유형별 케어법\n4. 진단 방법\n5. 연습문제 3개" },
      ],
    },
    {
      title: "모발의 구조와 특성",
      questions: [
        { id: 11, question: "모발의 3층 구조를 설명하시오.", answer: "큐티클(표피층), 코텍스(피질층), 메듈라(수질층)", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 3층 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 층의 기능\n4. 손상 시 증상\n5. 연습문제 3개" },
        { id: 12, question: "큐티클의 역할과 손상 원인은?", answer: "모발 보호막, 열·화학처리·마찰로 손상", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 큐티클의 역할과 손상 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 큐티클 보호 방법\n4. 복원 케어\n5. 연습문제 3개" },
        { id: 13, question: "코텍스가 모발에서 담당하는 역할은?", answer: "강도, 탄력, 색상(멜라닌) 결정", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 코텍스가 모발에서 담당하는 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 코텍스 손상 원인\n4. 강화 방법\n5. 연습문제 3개" },
        { id: 14, question: "모발의 주성분인 케라틴 단백질의 특징은?", answer: "18종 아미노산으로 구성, 시스틴 결합 포함", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 주성분인 케라틴 단백질의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 케라틴과 펌의 관계\n4. 케라틴 트리트먼트\n5. 연습문제 3개" },
        { id: 15, question: "모발의 4가지 결합(bond)을 설명하시오.", answer: "시스틴결합(S-S), 염결합, 수소결합, 펩타이드결합", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 4가지 결합(bond)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 펌과 결합의 관계\n4. 결합 복원 케어\n5. 연습문제 3개" },
        { id: 16, question: "멜라닌 색소의 종류와 특징은?", answer: "유멜라닌(갈색~검정), 페오멜라닌(노랑~빨강)", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 멜라닌 색소의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 염색과의 관계\n4. 백모화 원리\n5. 연습문제 3개" },
        { id: 17, question: "모발의 굵기를 결정하는 요인은?", answer: "코텍스 두께, 유전, 인종, 연령", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 굵기를 결정하는 요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 굵기별 시술 차이\n4. 모발 강화 방법\n5. 연습문제 3개" },
        { id: 18, question: "모발의 탄성과 신장률이란?", answer: "건조 시 30% 신장, 습윤 시 50%까지 늘어남", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 탄성과 신장률이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 손상모 탄성 변화\n4. 탄력 복원 방법\n5. 연습문제 3개" },
        { id: 19, question: "모발의 흡습성과 팽윤성을 설명하시오.", answer: "물을 흡수하여 부피가 늘어나는 성질", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 흡습성과 팽윤성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술과의 관계\n4. 건강모 vs 손상모 차이\n5. 연습문제 3개" },
        { id: 20, question: "다공성 모발(Porous Hair)의 특징과 관리법은?", answer: "큐티클 손상으로 수분·색소 유출 빠름, 단백질 케어 필요", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 다공성 모발(Porous Hair)의 특징과 관리법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 다공성 테스트법\n4. 시술 시 주의점\n5. 연습문제 3개" },
      ],
    },
    {
      title: "모발의 성장 주기",
      questions: [
        { id: 21, question: "모발 성장 주기의 3단계를 설명하시오.", answer: "성장기(Anagen), 퇴행기(Catagen), 휴지기(Telogen)", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발 성장 주기의 3단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 단계의 기간\n4. 탈모와의 관계\n5. 연습문제 3개" },
        { id: 22, question: "성장기(Anagen)의 특징과 기간은?", answer: "활발한 세포 분열, 2~6년 지속", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 성장기(Anagen)의 특징과 기간은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 성장기 연장 방법\n4. 영향 요인\n5. 연습문제 3개" },
        { id: 23, question: "퇴행기(Catagen)에서 모낭의 변화는?", answer: "모낭 위축, 모유두 분리, 약 2~3주 지속", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 퇴행기(Catagen)에서 모낭의 변화는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 퇴행기 관찰법\n4. 탈모 진행 관계\n5. 연습문제 3개" },
        { id: 24, question: "휴지기(Telogen) 모발의 특징은?", answer: "성장 정지, 자연 탈락 대기, 약 3~4개월", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 휴지기(Telogen) 모발의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 휴지기 탈모\n4. 정상 탈모량 기준\n5. 연습문제 3개" },
        { id: 25, question: "하루 정상 탈모량과 비정상적 탈모의 기준은?", answer: "정상 50~100개, 100개 이상 지속 시 비정상", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 하루 정상 탈모량과 비정상적 탈모의 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 탈모 자가진단법\n4. 전문 상담 시점\n5. 연습문제 3개" },
        { id: 26, question: "모발 성장 속도와 영향을 미치는 요인은?", answer: "월 1~1.5cm, 나이·건강·영양·호르몬 영향", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발 성장 속도와 영향을 미치는 요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 성장 촉진 방법\n4. 계절별 차이\n5. 연습문제 3개" },
        { id: 27, question: "모유두(Hair Papilla)의 역할은?", answer: "혈관을 통해 영양분 공급, 모발 성장의 핵심", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모유두(Hair Papilla)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모유두 활성화 방법\n4. 탈모 치료와의 관계\n5. 연습문제 3개" },
        { id: 28, question: "인종별 모발 성장 특성의 차이는?", answer: "동양인 직모, 서양인 웨이브, 아프리카인 곱슬", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 인종별 모발 성장 특성의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모발 형태 결정 요인\n4. 시술 시 고려점\n5. 연습문제 3개" },
        { id: 29, question: "연령에 따른 모발의 변화는?", answer: "노화로 멜라닌 감소(백모), 굵기·밀도 감소", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 연령에 따른 모발의 변화는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 노화 지연 방법\n4. 연령별 케어\n5. 연습문제 3개" },
        { id: 30, question: "계절에 따른 모발 상태 변화와 관리법은?", answer: "여름 자외선·습기, 겨울 건조 / 계절별 케어 필요", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 계절에 따른 모발 상태 변화와 관리법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 계절별 제품 추천\n4. 시술 시기 조언\n5. 연습문제 3개" },
      ],
    },
    {
      title: "탈모의 원인과 종류",
      questions: [
        { id: 31, question: "안드로겐성 탈모(AGA)의 원인과 특징은?", answer: "DHT 호르몬, 남성 M자·정수리, 여성 가르마 넓어짐", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 안드로겐성 탈모(AGA)의 원인과 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 치료 방법\n4. 예방 관리\n5. 연습문제 3개" },
        { id: 32, question: "원형탈모증의 원인과 증상은?", answer: "자가면역 질환, 동전 크기의 원형 탈모반", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 원형탈모증의 원인과 증상은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 치료 방법\n4. 재발 방지\n5. 연습문제 3개" },
        { id: 33, question: "휴지기 탈모(Telogen Effluvium)의 원인은?", answer: "스트레스, 출산, 수술, 다이어트로 휴지기 동시 진입", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 휴지기 탈모(Telogen Effluvium)의 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 회복 기간\n4. 관리 방법\n5. 연습문제 3개" },
        { id: 34, question: "견인성 탈모의 원인과 예방법은?", answer: "지속적인 당김(묶은 머리), 헤어스타일 변경으로 예방", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 견인성 탈모의 원인과 예방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 고위험 스타일\n4. 복원 가능성\n5. 연습문제 3개" },
        { id: 35, question: "지루성 피부염과 탈모의 관계는?", answer: "피지 과다·염증으로 모낭 손상, 탈모 유발", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 지루성 피부염과 탈모의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 치료 방법\n4. 두피 케어\n5. 연습문제 3개" },
        { id: 36, question: "영양 결핍으로 인한 탈모와 관련 영양소는?", answer: "철분, 아연, 비타민D, 단백질 부족", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 영양 결핍으로 인한 탈모와 관련 영양소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 권장 식품\n4. 영양제 섭취법\n5. 연습문제 3개" },
        { id: 37, question: "스트레스와 탈모의 연관성은?", answer: "코르티솔 증가로 모낭 위축, 휴지기 탈모 유발", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 스트레스와 탈모의 연관성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 스트레스 관리법\n4. 회복 기간\n5. 연습문제 3개" },
        { id: 38, question: "화학 시술로 인한 탈모의 원인은?", answer: "과도한 펌·염색으로 모발·두피 손상", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 화학 시술로 인한 탈모의 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 안전한 시술 간격\n4. 손상 복원\n5. 연습문제 3개" },
        { id: 39, question: "탈모 예방을 위한 두피 관리 방법은?", answer: "정기적 세정, 마사지, 영양 공급, 자외선 차단", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 탈모 예방을 위한 두피 관리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 일일 루틴\n4. 전문 케어 주기\n5. 연습문제 3개" },
        { id: 40, question: "탈모 치료에 사용되는 대표적인 성분은?", answer: "미녹시딜(외용), 피나스테리드(내복), 비오틴", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 탈모 치료에 사용되는 대표적인 성분은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 작용 원리\n4. 부작용 및 주의사항\n5. 연습문제 3개" },
      ],
    },
    {
      title: "모발 손상과 진단",
      questions: [
        { id: 41, question: "열 손상의 원인과 증상은?", answer: "고온 기구 사용, 건조·갈라짐·탄력 저하", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 열 손상의 원인과 증상은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 예방 방법\n4. 복원 케어\n5. 연습문제 3개" },
        { id: 42, question: "화학적 손상의 원인과 특징은?", answer: "펌·염색·탈색 약제로 결합 파괴, 끊어짐 발생", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 화학적 손상의 원인과 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 손상 등급\n4. 시술 간격 권장\n5. 연습문제 3개" },
        { id: 43, question: "물리적 손상의 원인은?", answer: "빗질, 드라이, 타월 마찰, 자외선", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 물리적 손상의 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 올바른 빗질법\n4. 손상 예방 도구\n5. 연습문제 3개" },
        { id: 44, question: "모발 손상도 진단 방법(테스트)에는 무엇이 있나?", answer: "탄력 테스트, 물 흡수 테스트, 끊어짐 테스트", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발 손상도 진단 방법(테스트)에는 무엇이 있나?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 테스트 방법\n4. 결과 해석\n5. 연습문제 3개" },
        { id: 45, question: "트리트먼트의 종류와 효과는?", answer: "단백질(강화), 수분(보습), 오일(윤기)", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 트리트먼트의 종류와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모발 상태별 선택\n4. 사용 주기\n5. 연습문제 3개" },
        { id: 46, question: "정전기가 모발에 미치는 영향과 방지법은?", answer: "큐티클 손상·엉킴, 수분 공급·정전기 방지 제품 사용", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 정전기가 모발에 미치는 영향과 방지법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 계절별 관리\n4. 추천 제품\n5. 연습문제 3개" },
        { id: 47, question: "모발의 광택 저하 원인은?", answer: "큐티클 손상, 유분 부족, 건조", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발의 광택 저하 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 광택 회복 방법\n4. 홈케어 팁\n5. 연습문제 3개" },
        { id: 48, question: "끝이 갈라지는 모발(스플릿 엔드)의 원인과 관리법은?", answer: "건조·마찰·열손상, 정기적 다듬기·영양 공급", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 끝이 갈라지는 모발(스플릿 엔드)의 원인과 관리법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 예방 방법\n4. 다듬기 주기\n5. 연습문제 3개" },
        { id: 49, question: "샴푸의 올바른 선택 기준은?", answer: "두피/모발 타입, pH, 계면활성제 종류 확인", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 샴푸의 올바른 선택 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 성분 체크리스트\n4. 타입별 추천\n5. 연습문제 3개" },
        { id: 50, question: "모발 건강을 위한 생활 습관은?", answer: "균형 잡힌 식단, 충분한 수면, 스트레스 관리, 물 섭취", prompt: "미용사(일반) 두피·모발학 문제입니다.\n\n문제: 모발 건강을 위한 생활 습관은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모발에 좋은 음식\n4. 피해야 할 습관\n5. 연습문제 3개" },
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
            <span className="text-pink-600 font-medium">두피·모발학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🔬</span>
            <div>
              <h1 className="text-3xl font-bold">두피·모발학</h1>
              <p className="text-pink-100">두피 구조, 모발 특성, 성장 주기, 탈모 - 50문항</p>
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
          <p className="text-gray-400">© 2026 자격증 가이드. 미용사(일반) - 두피·모발학</p>
        </div>
      </footer>
    </div>
  );
}
