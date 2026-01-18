"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HairTheoryPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("beauty-general-hair-theory-completed");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem("beauty-general-hair-theory-completed", JSON.stringify(updated));
  };

  const topics = [
    {
      title: "미용의 역사와 발전",
      questions: [
        { id: 1, question: "고대 이집트에서 사용된 대표적인 헤어 장식 기법은?", answer: "가발과 금속 장식을 이용한 스타일링", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 고대 이집트에서 사용된 대표적인 헤어 장식 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시대별 헤어 스타일 비교\n4. 현대 미용에 미친 영향\n5. 연습문제 3개" },
        { id: 2, question: "르네상스 시대 여성 헤어스타일의 특징은?", answer: "이마를 넓게 드러내고 땋은 머리와 장식을 활용", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 르네상스 시대 여성 헤어스타일의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시대별 헤어 스타일 비교\n4. 현대 미용에 미친 영향\n5. 연습문제 3개" },
        { id: 3, question: "한국 근대 미용의 시작으로 보는 시기와 그 배경은?", answer: "1920년대 일제강점기, 서양식 미용 기술 도입", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 한국 근대 미용의 시작으로 보는 시기와 그 배경은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 한국 미용 발전사\n4. 현대 K-뷰티로의 발전\n5. 연습문제 3개" },
        { id: 4, question: "바로크 시대의 대표적인 남성 헤어스타일은?", answer: "긴 가발(페리위그)과 화려한 컬", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 바로크 시대의 대표적인 남성 헤어스타일은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 바로크 시대 문화적 배경\n4. 현대 미용에 미친 영향\n5. 연습문제 3개" },
        { id: 5, question: "1920년대 '보브 컷'이 유행하게 된 사회적 배경은?", answer: "여성 해방 운동과 실용주의 추구", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 1920년대 '보브 컷'이 유행하게 된 사회적 배경은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 보브 컷의 종류\n4. 현대 보브 스타일\n5. 연습문제 3개" },
        { id: 6, question: "빅토리아 시대 여성들이 주로 사용한 헤어 도구는?", answer: "헤어 아이론(마르셀 웨이브 기구)과 핀", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 빅토리아 시대 여성들이 주로 사용한 헤어 도구는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 마르셀 웨이브 기법\n4. 현대 도구와의 비교\n5. 연습문제 3개" },
        { id: 7, question: "현대 미용의 과학화가 시작된 시기와 주요 발전 내용은?", answer: "20세기 초, 화학적 펌과 염색 기술 개발", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 현대 미용의 과학화가 시작된 시기와 주요 발전 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 미용 과학 발전 연표\n4. 최신 미용 기술 동향\n5. 연습문제 3개" },
        { id: 8, question: "파마넌트 웨이브를 최초로 개발한 인물과 연도는?", answer: "카를 네슬러(Karl Nessler), 1905년", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 파마넌트 웨이브를 최초로 개발한 인물과 연도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 펌 기술의 발전 과정\n4. 현대 펌 기술과의 비교\n5. 연습문제 3개" },
        { id: 9, question: "조선시대 여성의 전통 헤어스타일인 '얹은머리'의 특징은?", answer: "가체를 사용하여 크고 화려하게 올린 머리", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 조선시대 여성의 전통 헤어스타일인 '얹은머리'의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 신분별 머리 스타일\n4. 전통과 현대의 조화\n5. 연습문제 3개" },
        { id: 10, question: "1960년대 대표적인 헤어스타일 '비하이브'의 특징은?", answer: "머리카락을 높이 부풀려 벌집 형태로 만든 스타일", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 1960년대 대표적인 헤어스타일 '비하이브'의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 1960년대 문화적 배경\n4. 현대적 재해석\n5. 연습문제 3개" },
      ],
    },
    {
      title: "미용기기 및 도구",
      questions: [
        { id: 11, question: "헤어 드라이어의 적정 사용 온도 범위는?", answer: "60~80°C (두피에서 15cm 이상 거리 유지)", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 헤어 드라이어의 적정 사용 온도 범위는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모발 손상 방지법\n4. 드라이 기술\n5. 연습문제 3개" },
        { id: 12, question: "미용가위(시저)를 고를 때 고려해야 할 요소 3가지는?", answer: "날의 길이, 손가락 걸이 크기, 재질(코발트 합금 등)", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용가위(시저)를 고를 때 고려해야 할 요소 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 가위 종류별 특징\n4. 관리 및 보관법\n5. 연습문제 3개" },
        { id: 13, question: "틴닝가위(숱가위)와 일반가위의 차이점은?", answer: "틴닝가위는 빗살 모양 날로 머리숱을 조절", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 틴닝가위(숱가위)와 일반가위의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 사용 용도별 구분\n4. 틴닝 비율 선택법\n5. 연습문제 3개" },
        { id: 14, question: "매직기(스트레이트 아이론)의 적정 온도와 사용 시 주의사항은?", answer: "150~180°C, 한 부분에 5초 이상 유지 금지", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 매직기(스트레이트 아이론)의 적정 온도와 사용 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모발 타입별 온도 조절\n4. 열 손상 예방법\n5. 연습문제 3개" },
        { id: 15, question: "롤브러시의 종류와 각각의 용도는?", answer: "원형(볼륨), 반원형(C컬), 쿠션(두피 마사지)", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 롤브러시의 종류와 각각의 용도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 브러시 선택 가이드\n4. 브러시 관리법\n5. 연습문제 3개" },
        { id: 16, question: "클리퍼(이발기)의 날 교체 주기와 관리 방법은?", answer: "6개월~1년, 사용 후 오일 도포 및 청소", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 클리퍼(이발기)의 날 교체 주기와 관리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 클리퍼 종류\n4. 트러블 대처법\n5. 연습문제 3개" },
        { id: 17, question: "컬 아이론(고데기)을 사용할 때 열 보호제를 바르는 이유는?", answer: "고열로 인한 큐티클 손상과 단백질 변성 방지", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 컬 아이론(고데기)을 사용할 때 열 보호제를 바르는 이유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 열 보호제 성분\n4. 올바른 사용법\n5. 연습문제 3개" },
        { id: 18, question: "두피 스캐너의 기능과 활용 목적은?", answer: "두피 상태(유분, 민감도, 탈모) 진단 및 맞춤 케어 제안", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 두피 스캐너의 기능과 활용 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 두피 진단 항목\n4. 상담 활용법\n5. 연습문제 3개" },
        { id: 19, question: "세팅 로드의 크기에 따른 컬의 변화는?", answer: "큰 로드는 큰 웨이브, 작은 로드는 촘촘한 컬", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 세팅 로드의 크기에 따른 컬의 변화는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 로드 선택 가이드\n4. 와인딩 기법\n5. 연습문제 3개" },
        { id: 20, question: "스티머(찜기)를 사용하는 목적과 적정 사용 시간은?", answer: "트리트먼트 침투력 향상, 10~15분", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 스티머(찜기)를 사용하는 목적과 적정 사용 시간은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 스티머 종류\n4. 효과적인 사용법\n5. 연습문제 3개" },
      ],
    },
    {
      title: "고객 상담 및 응대",
      questions: [
        { id: 21, question: "첫 방문 고객과의 상담 시 반드시 확인해야 할 사항 3가지는?", answer: "알레르기 유무, 두피 상태, 원하는 스타일", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 첫 방문 고객과의 상담 시 반드시 확인해야 할 사항 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 상담 체크리스트\n4. 고객 유형별 응대법\n5. 연습문제 3개" },
        { id: 22, question: "고객의 얼굴형에 따른 헤어스타일 추천 시 고려할 점은?", answer: "둥근 얼굴은 볼륨 줄이고, 긴 얼굴은 옆 볼륨 추가", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 고객의 얼굴형에 따른 헤어스타일 추천 시 고려할 점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 얼굴형별 추천 스타일\n4. 상담 멘트 예시\n5. 연습문제 3개" },
        { id: 23, question: "불만을 제기하는 고객에 대한 적절한 응대 방법은?", answer: "경청, 공감 표현, 해결책 제시, 사후 관리", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 불만을 제기하는 고객에 대한 적절한 응대 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 불만 유형별 대처법\n4. 예방 방안\n5. 연습문제 3개" },
        { id: 24, question: "고객 카드(상담 기록)에 반드시 기재해야 할 항목은?", answer: "시술 내역, 사용 약제, 특이사항, 다음 예약", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 고객 카드(상담 기록)에 반드시 기재해야 할 항목은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 기록 양식 예시\n4. 디지털 관리 방법\n5. 연습문제 3개" },
        { id: 25, question: "펌이나 염색 전 패치 테스트를 하는 이유와 방법은?", answer: "알레르기 반응 확인, 귀 뒤나 팔 안쪽에 48시간 전 테스트", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 펌이나 염색 전 패치 테스트를 하는 이유와 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 테스트 절차\n4. 이상 반응 시 대처\n5. 연습문제 3개" },
        { id: 26, question: "임산부 고객에게 시술 시 주의사항은?", answer: "강한 화학제품 사용 자제, 환기, 장시간 시술 피하기", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 임산부 고객에게 시술 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시술 가능/불가 항목\n4. 안전한 시술 방법\n5. 연습문제 3개" },
        { id: 27, question: "시술 전 가운과 타월을 착용시키는 이유는?", answer: "의복 보호, 위생 관리, 전문성 표현", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 시술 전 가운과 타월을 착용시키는 이유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 착용 순서\n4. 위생 관리 방법\n5. 연습문제 3개" },
        { id: 28, question: "고객에게 홈케어 제품을 추천할 때 고려할 점은?", answer: "모발/두피 상태, 생활 패턴, 예산", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 고객에게 홈케어 제품을 추천할 때 고려할 점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 제품 추천 화법\n4. 효과적인 판매 전략\n5. 연습문제 3개" },
        { id: 29, question: "예약 고객이 노쇼(No-show) 했을 때 적절한 대응은?", answer: "리마인드 문자 발송, 노쇼 정책 안내, 재예약 유도", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 예약 고객이 노쇼(No-show) 했을 때 적절한 대응은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 노쇼 방지 시스템\n4. 고객 관계 유지 방법\n5. 연습문제 3개" },
        { id: 30, question: "VIP 고객 관리를 위한 서비스 차별화 방안은?", answer: "전담 스타일리스트, 우선 예약, 기념일 서비스", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: VIP 고객 관리를 위한 서비스 차별화 방안은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 등급별 혜택 설계\n4. 로열티 프로그램\n5. 연습문제 3개" },
      ],
    },
    {
      title: "공중위생관리법",
      questions: [
        { id: 31, question: "공중위생영업의 정의와 미용업이 해당되는 이유는?", answer: "다수인을 대상으로 위생관리 서비스를 제공하는 영업", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 공중위생영업의 정의와 미용업이 해당되는 이유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 관련 법령 조항\n4. 미용업 분류\n5. 연습문제 3개" },
        { id: 32, question: "미용사 면허 취득 조건과 결격사유는?", answer: "자격증 취득 + 결격사유 없음 (정신질환, 마약 등)", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용사 면허 취득 조건과 결격사유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 면허 신청 절차\n4. 면허 취소 사유\n5. 연습문제 3개" },
        { id: 33, question: "미용업소 개설 신고 시 필요한 서류는?", answer: "신분증, 면허증, 영업시설 개요서, 위생교육 이수증", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용업소 개설 신고 시 필요한 서류는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 신고 절차\n4. 시설 기준\n5. 연습문제 3개" },
        { id: 34, question: "미용업소의 위생관리 기준 중 조명과 환기에 관한 규정은?", answer: "작업장 75럭스 이상, 적정 환기 시설 구비", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용업소의 위생관리 기준 중 조명과 환기에 관한 규정은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시설 기준 상세\n4. 점검 체크리스트\n5. 연습문제 3개" },
        { id: 35, question: "영업 정지 또는 면허 취소 처분의 사유는?", answer: "위생기준 위반, 무면허 영업, 유해물질 사용 등", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 영업 정지 또는 면허 취소 처분의 사유는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 처분 기준표\n4. 이의신청 절차\n5. 연습문제 3개" },
        { id: 36, question: "위생교육의 주기와 이수 시간은?", answer: "매년 1회, 3시간 (온라인 또는 집합교육)", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 위생교육의 주기와 이수 시간은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 교육 내용\n4. 미이수 시 제재\n5. 연습문제 3개" },
        { id: 37, question: "미용업소에서 사용하는 기구의 소독 방법과 주기는?", answer: "자외선 소독, 약품 소독 등, 매 고객 사용 후", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용업소에서 사용하는 기구의 소독 방법과 주기는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 도구별 소독법\n4. 소독제 종류\n5. 연습문제 3개" },
        { id: 38, question: "일회용품 사용 및 폐기에 관한 규정은?", answer: "1회 사용 후 폐기, 재사용 금지, 분리수거", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 일회용품 사용 및 폐기에 관한 규정은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 일회용품 종류\n4. 환경 친화적 대안\n5. 연습문제 3개" },
        { id: 39, question: "공중위생관리법 위반 시 과태료 부과 기준은?", answer: "위반 종류와 횟수에 따라 30만원~300만원", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 공중위생관리법 위반 시 과태료 부과 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 위반 유형별 과태료\n4. 예방 방안\n5. 연습문제 3개" },
        { id: 40, question: "미용업과 이용업의 업무 범위 차이는?", answer: "미용업은 두발 이외 피부·네일·메이크업, 이용업은 남성 두발만", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용업과 이용업의 업무 범위 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 분야별 면허\n4. 복합 시술 시 주의점\n5. 연습문제 3개" },
      ],
    },
    {
      title: "안전 및 위생관리",
      questions: [
        { id: 41, question: "미용실에서 발생할 수 있는 화재의 주요 원인과 예방법은?", answer: "전열기기 과열, 콘센트 과부하 / 정기 점검, 소화기 비치", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용실에서 발생할 수 있는 화재의 주요 원인과 예방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 안전 점검 체크리스트\n4. 비상 대응 매뉴얼\n5. 연습문제 3개" },
        { id: 42, question: "시술 중 고객이 약물 알레르기 반응을 보일 때 대처 방법은?", answer: "즉시 약제 제거, 물로 세척, 상태에 따라 병원 이송", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 시술 중 고객이 약물 알레르기 반응을 보일 때 대처 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 응급처치 순서\n4. 예방 조치\n5. 연습문제 3개" },
        { id: 43, question: "미용도구의 올바른 소독 순서는?", answer: "세척 → 건조 → 소독(자외선/약품) → 보관", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용도구의 올바른 소독 순서는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 도구별 소독법\n4. 소독 기록 관리\n5. 연습문제 3개" },
        { id: 44, question: "손 소독의 올바른 방법과 시점은?", answer: "고객 시술 전후, 비누로 30초 이상 또는 손소독제 사용", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 손 소독의 올바른 방법과 시점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 손씻기 6단계\n4. 감염 예방의 중요성\n5. 연습문제 3개" },
        { id: 45, question: "가위로 인한 부상 시 응급처치 방법은?", answer: "깨끗한 거즈로 압박, 지혈 후 소독, 필요시 병원", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 가위로 인한 부상 시 응급처치 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 응급처치 키트 구성\n4. 부상 예방법\n5. 연습문제 3개" },
        { id: 46, question: "미용실 바닥과 작업대의 위생 관리 기준은?", answer: "매일 청소, 주 1회 소독, 미끄럼 방지", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용실 바닥과 작업대의 위생 관리 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 청소 체크리스트\n4. 위생 인증 기준\n5. 연습문제 3개" },
        { id: 47, question: "미용사의 개인 위생 관리 항목은?", answer: "손톱 정리, 청결한 복장, 마스크 착용, 상처 밴드 처리", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 미용사의 개인 위생 관리 항목은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 복장 규정\n4. 건강 관리\n5. 연습문제 3개" },
        { id: 48, question: "화학제품 보관 시 주의사항은?", answer: "직사광선 차단, 서늘한 곳, 밀봉, 라벨 부착", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 화학제품 보관 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 제품별 보관법\n4. MSDS 이해\n5. 연습문제 3개" },
        { id: 49, question: "전기 기구 사용 시 감전 예방을 위한 주의사항은?", answer: "젖은 손 사용 금지, 접지 확인, 정격 전압 사용", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 전기 기구 사용 시 감전 예방을 위한 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 전기 안전 수칙\n4. 점검 항목\n5. 연습문제 3개" },
        { id: 50, question: "감염병 예방을 위한 미용실의 역할은?", answer: "도구 소독 철저, 발열 고객 거부, 환기, 마스크 착용", prompt: "미용사(일반) 미용이론 문제입니다.\n\n문제: 감염병 예방을 위한 미용실의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 감염병 대응 매뉴얼\n4. 고객 안내 문구\n5. 연습문제 3개" },
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
            <span className="text-pink-600 font-medium">미용이론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">📚</span>
            <div>
              <h1 className="text-3xl font-bold">미용이론</h1>
              <p className="text-pink-100">미용의 역사, 도구, 상담, 법규, 위생 - 50문항</p>
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
          <p className="text-gray-400">© 2026 자격증 가이드. 미용사(일반) - 미용이론</p>
        </div>
      </footer>
    </div>
  );
}
