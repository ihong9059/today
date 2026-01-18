'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ElectricianPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('electrician-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('electrician-practical-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: "시험 당일 준비",
      icon: "📅",
      questions: [
        { id: 1, q: "시험 당일 준비물은?", a: "신분증, 수험표, 작업복, 안전화, 안전모", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험 당일 준비물은?\n\n다음 순서로 설명해주세요:\n1. 필수 지참물\n2. 안전장구 종류\n3. 입실 시간\n4. 복장 규정\n5. 주의사항" },
        { id: 2, q: "시험장에서 제공되는 것은?", a: "공구, 재료, 측정기, 도면 등 모두 제공", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험장에서 제공되는 것은?\n\n다음 순서로 설명해주세요:\n1. 제공되는 공구\n2. 제공되는 재료\n3. 측정기기\n4. 도면 및 지시서\n5. 개인 준비물" },
        { id: 3, q: "실기시험 시간 배분 전략은?", a: "배선작업 50%, 결선작업 30%, 확인 및 정리 20%", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 실기시험 시간 배분 전략은?\n\n다음 순서로 설명해주세요:\n1. 전체 시간 (약 4시간)\n2. 배선작업 시간\n3. 결선작업 시간\n4. 동작확인 시간\n5. 정리 시간" },
        { id: 4, q: "실기시험 감점 요인은?", a: "미완성, 동작불량, 안전수칙 위반, 시간초과 등", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 실기시험 감점 요인은?\n\n다음 순서로 설명해주세요:\n1. 치명적 감점 사항\n2. 주요 감점 사항\n3. 경미한 감점 사항\n4. 안전 관련 감점\n5. 감점 방지 전략" },
        { id: 5, q: "시험 합격 기준은?", a: "100점 만점에 60점 이상, 치명적 결함 시 실격", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험 합격 기준은?\n\n다음 순서로 설명해주세요:\n1. 합격 점수 기준\n2. 실격 사유\n3. 부분 점수 체계\n4. 동작 확인 배점\n5. 안전 점수" },
      ]
    },
    {
      title: "배선작업 기초",
      icon: "🔌",
      questions: [
        { id: 6, q: "금속관 벤딩(굽히기) 방법은?", a: "벤더 사용, 90° 굽힘 시 관경의 6배 반경", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 금속관 벤딩(굽히기) 방법은?\n\n다음 순서로 설명해주세요:\n1. 벤더 사용법\n2. 굽힘 각도 설정\n3. 반경 계산\n4. 실습 요령\n5. 주의사항" },
        { id: 7, q: "금속관과 박스 연결 방법은?", a: "커넥터 사용, 로크넛 체결, 부싱 설치", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 금속관과 박스 연결 방법은?\n\n다음 순서로 설명해주세요:\n1. 커넥터 종류\n2. 로크넛 체결법\n3. 부싱 설치\n4. 접지 연속성\n5. 시공 순서" },
        { id: 8, q: "PVC관 접착 시공 방법은?", a: "접착면 청소, 접착제 도포, 10초 내 삽입 고정", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: PVC관 접착 시공 방법은?\n\n다음 순서로 설명해주세요:\n1. 접착면 처리\n2. 접착제 종류\n3. 도포 방법\n4. 경화 시간\n5. 주의사항" },
        { id: 9, q: "전선 피복 벗기기 요령은?", a: "스트리퍼 사용, 심선 손상 금지, 적정 길이 확보", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 전선 피복 벗기기 요령은?\n\n다음 순서로 설명해주세요:\n1. 스트리퍼 사용법\n2. 적정 길이\n3. 심선 보호\n4. 단선/연선 차이\n5. 작업 시 주의점" },
        { id: 10, q: "전선 인입 요령은?", a: "와이어 사용, 윤활제 도포, 당김선 활용", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 전선 인입 요령은?\n\n다음 순서로 설명해주세요:\n1. 인입 전 준비\n2. 와이어 사용법\n3. 윤활제 적용\n4. 인입 순서\n5. 검사 방법" },
      ]
    },
    {
      title: "전선 접속",
      icon: "🔗",
      questions: [
        { id: 11, q: "직선 슬리브 접속 방법은?", a: "슬리브에 전선 삽입 후 압착기로 압착", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 직선 슬리브 접속 방법은?\n\n다음 순서로 설명해주세요:\n1. 슬리브 선택\n2. 전선 삽입\n3. 압착 방법\n4. 압착 확인\n5. 절연 처리" },
        { id: 12, q: "링 슬리브 접속(단자 압착) 방법은?", a: "단자에 전선 삽입, 압착펜치로 압착", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 링 슬리브 접속(단자 압착) 방법은?\n\n다음 순서로 설명해주세요:\n1. 단자 종류\n2. 전선 준비\n3. 압착 방법\n4. 압착 확인\n5. 접속 완료" },
        { id: 13, q: "테이프 절연 처리 방법은?", a: "전기절연테이프 2~3회 감기, 1/2 겹침", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 테이프 절연 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 테이프 종류\n2. 감기 방법\n3. 겹침 폭\n4. 마무리\n5. 주의사항" },
        { id: 14, q: "단자대 결선 방법은?", a: "전선 피복 벗김, 단자대에 삽입, 나사 체결", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 단자대 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 피복 길이\n2. 심선 정리\n3. 삽입 방향\n4. 체결 토크\n5. 확인 방법" },
        { id: 15, q: "케이블 단말 처리 방법은?", a: "외피 제거, 심선 정리, 절연 처리, 단자 접속", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 케이블 단말 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 외피 제거 길이\n2. 심선 분리\n3. 절연 테이프\n4. 단자 접속\n5. 마무리" },
      ]
    },
    {
      title: "전기기기 결선",
      icon: "⚡",
      questions: [
        { id: 16, q: "단상 전동기 결선 방법은?", a: "주권선, 보조권선, 콘덴서 연결 확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 단상 전동기 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 단자 확인\n2. 주권선 결선\n3. 보조권선 결선\n4. 콘덴서 연결\n5. 회전방향 확인" },
        { id: 17, q: "3상 유도전동기 결선 방법은?", a: "U-V-W 결선, Y 또는 Δ 결선 확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 3상 유도전동기 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 단자 확인 (U, V, W)\n2. Y결선 방법\n3. Δ결선 방법\n4. 전원 연결\n5. 회전방향 확인" },
        { id: 18, q: "변압기 결선 방법은?", a: "1차측/2차측 구분, 극성 확인, 접지 연결", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 변압기 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 1차측 연결\n2. 2차측 연결\n3. 극성 확인\n4. 접지 연결\n5. 전압 확인" },
        { id: 19, q: "MCCB 결선 방법은?", a: "상선(L) 입력단, 부하측 출력단, 접지선 연결", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: MCCB 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 전원측 연결\n2. 부하측 연결\n3. 접지 연결\n4. 조임 토크\n5. 동작 시험" },
        { id: 20, q: "ELB(누전차단기) 결선 방법은?", a: "N선 구분 중요, 접지선은 ELB 통과 안함", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: ELB(누전차단기) 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. L, N선 구분\n2. 접지선 처리\n3. 부하측 연결\n4. 테스트버튼 확인\n5. 동작 시험" },
      ]
    },
    {
      title: "시퀀스 제어 기초",
      icon: "🎛️",
      questions: [
        { id: 21, q: "MC(전자접촉기) 자기유지 회로란?", a: "MC 코일 여자 후 보조접점으로 상태 유지", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: MC(전자접촉기) 자기유지 회로란?\n\n다음 순서로 설명해주세요:\n1. 자기유지 원리\n2. 회로 구성\n3. 동작 순서\n4. 결선 방법\n5. 실습 요령" },
        { id: 22, q: "인터록(상호연동) 회로란?", a: "2개 이상의 MC가 동시 동작 방지하는 회로", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 인터록(상호연동) 회로란?\n\n다음 순서로 설명해주세요:\n1. 인터록 필요성\n2. 전기적 인터록\n3. 기계적 인터록\n4. 회로 구성\n5. 결선 방법" },
        { id: 23, q: "정역운전 회로 결선 방법은?", a: "정전용 MC, 역전용 MC, 인터록 회로 구성", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 정역운전 회로 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 정역운전 원리\n2. MC 2개 사용\n3. 인터록 구성\n4. 제어회로 결선\n5. 주회로 결선" },
        { id: 24, q: "타이머 회로 결선 방법은?", a: "ON-delay, OFF-delay 구분, 타이머 접점 활용", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 타이머 회로 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. 타이머 종류\n2. ON-delay 회로\n3. OFF-delay 회로\n4. 시간 설정\n5. 결선 예제" },
        { id: 25, q: "Y-Δ 기동회로 결선 방법은?", a: "Y기동 MC, Δ운전 MC, 타이머로 절환", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: Y-Δ 기동회로 결선 방법은?\n\n다음 순서로 설명해주세요:\n1. Y-Δ 기동 원리\n2. MC 3개 구성\n3. 타이머 설정\n4. 제어회로 결선\n5. 주회로 결선" },
      ]
    },
    {
      title: "측정 및 검사",
      icon: "📊",
      questions: [
        { id: 26, q: "절연저항 측정 방법은?", a: "메거 사용, 전원 차단 상태에서 측정", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 절연저항 측정 방법은?\n\n다음 순서로 설명해주세요:\n1. 메거 사용법\n2. 측정 전 준비\n3. 측정 위치\n4. 합격 기준값\n5. 주의사항" },
        { id: 27, q: "접지저항 측정 방법은?", a: "접지저항계 사용, 보조극 설치 후 측정", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 접지저항 측정 방법은?\n\n다음 순서로 설명해주세요:\n1. 접지저항계 사용법\n2. 보조극 설치\n3. 측정 방법\n4. 합격 기준값\n5. 주의사항" },
        { id: 28, q: "전압/전류 측정 방법은?", a: "멀티미터 사용, 전압은 병렬, 전류는 직렬 측정", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 전압/전류 측정 방법은?\n\n다음 순서로 설명해주세요:\n1. 멀티미터 설정\n2. 전압 측정법\n3. 전류 측정법\n4. 레인지 선택\n5. 안전 주의사항" },
        { id: 29, q: "통전(도통) 시험 방법은?", a: "저항 레인지 설정, 양단 측정, 0Ω 확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 통전(도통) 시험 방법은?\n\n다음 순서로 설명해주세요:\n1. 멀티미터 설정\n2. 측정 방법\n3. 판정 기준\n4. 단선 확인\n5. 결선 점검" },
        { id: 30, q: "동작 확인 절차는?", a: "전원 인가 전 점검, 순차 동작, 최종 확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 동작 확인 절차는?\n\n다음 순서로 설명해주세요:\n1. 전원 인가 전 점검\n2. 제어회로 시험\n3. 주회로 시험\n4. 보호장치 확인\n5. 최종 점검" },
      ]
    },
    {
      title: "안전수칙",
      icon: "⚠️",
      questions: [
        { id: 31, q: "작업 전 안전 점검 사항은?", a: "전원 차단 확인, 보호구 착용, 작업 환경 점검", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 작업 전 안전 점검 사항은?\n\n다음 순서로 설명해주세요:\n1. 전원 차단 확인\n2. 검전 실시\n3. 보호구 착용\n4. 작업장 정리\n5. 안전 표지" },
        { id: 32, q: "감전 방지 대책은?", a: "절연장갑, 절연매트, 활선 접근 금지", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 감전 방지 대책은?\n\n다음 순서로 설명해주세요:\n1. 절연 보호구\n2. 활선 작업 금지\n3. 접지 확인\n4. 누전차단기\n5. 응급 조치" },
        { id: 33, q: "공구 사용 안전수칙은?", a: "절연 공구 사용, 정격 사용, 파손 공구 사용 금지", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 공구 사용 안전수칙은?\n\n다음 순서로 설명해주세요:\n1. 절연 공구 확인\n2. 정격 용량 확인\n3. 공구 상태 점검\n4. 올바른 사용법\n5. 보관 방법" },
        { id: 34, q: "측정기 사용 안전수칙은?", a: "정격 범위 확인, 리드선 상태 점검, 순서 준수", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 측정기 사용 안전수칙은?\n\n다음 순서로 설명해주세요:\n1. 정격 범위 확인\n2. 리드선 점검\n3. 측정 순서\n4. 레인지 선택\n5. 주의사항" },
        { id: 35, q: "작업장 정리정돈 요령은?", a: "공구 정리, 폐자재 처리, 바닥 청소", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 작업장 정리정돈 요령은?\n\n다음 순서로 설명해주세요:\n1. 공구 정리\n2. 재료 정리\n3. 폐자재 처리\n4. 바닥 청소\n5. 평가 시 영향" },
      ]
    },
    {
      title: "자주 틀리는 실수",
      icon: "❌",
      questions: [
        { id: 36, q: "결선 실수 방지 요령은?", a: "도면 확인, 색상 구분, 단계별 점검", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 결선 실수 방지 요령은?\n\n다음 순서로 설명해주세요:\n1. 도면 꼼꼼히 확인\n2. 전선 색상 구분\n3. 단계별 점검\n4. 결선표 작성\n5. 최종 확인" },
        { id: 37, q: "전선 규격 선정 실수는?", a: "허용전류 미확인, 굵기 부족, 색상 혼동", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 전선 규격 선정 실수는?\n\n다음 순서로 설명해주세요:\n1. 허용전류 확인\n2. 전선 굵기 선정\n3. 색상 규정\n4. 단면적 계산\n5. 검증 방법" },
        { id: 38, q: "접지 결선 실수는?", a: "접지선 누락, 접지봉 미연결, 본딩 누락", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 접지 결선 실수는?\n\n다음 순서로 설명해주세요:\n1. 접지선 확인\n2. 접지 연속성\n3. 본딩 확인\n4. 접지저항 측정\n5. 주의사항" },
        { id: 39, q: "시퀀스 회로 실수는?", a: "접점 구분 오류(a/b), 코일 전압 오류, 인터록 누락", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시퀀스 회로 실수는?\n\n다음 순서로 설명해주세요:\n1. a접점/b접점 구분\n2. 코일 전압 확인\n3. 인터록 확인\n4. 자기유지 확인\n5. 동작 시험" },
        { id: 40, q: "시간 부족 방지 요령은?", a: "작업 순서 정립, 쉬운 것 먼저, 완성도 우선", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시간 부족 방지 요령은?\n\n다음 순서로 설명해주세요:\n1. 작업 순서 계획\n2. 쉬운 것 먼저\n3. 동시 진행 가능 작업\n4. 시간 체크\n5. 완성도 확보" },
      ]
    },
    {
      title: "합격 전략",
      icon: "🏆",
      questions: [
        { id: 41, q: "실기시험 합격률을 높이는 방법은?", a: "반복 실습, 시간 관리, 안전수칙 준수", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 실기시험 합격률을 높이는 방법은?\n\n다음 순서로 설명해주세요:\n1. 충분한 실습\n2. 시간 관리 훈련\n3. 안전수칙 체화\n4. 기출 유형 분석\n5. 멘탈 관리" },
        { id: 42, q: "실습 환경 구축 방법은?", a: "실습 패널 구입, 학원/직업학교 활용, 동영상 학습", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 실습 환경 구축 방법은?\n\n다음 순서로 설명해주세요:\n1. 개인 실습 장비\n2. 학원 실습\n3. 직업전문학교\n4. 온라인 강의\n5. 동호회 활용" },
        { id: 43, q: "기출문제 분석 요령은?", a: "출제 유형 파악, 자주 나오는 회로 집중, 시간 측정", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 기출문제 분석 요령은?\n\n다음 순서로 설명해주세요:\n1. 기출 유형 정리\n2. 빈출 회로 파악\n3. 시간 배분 연습\n4. 취약 부분 보완\n5. 모의 시험" },
        { id: 44, q: "시험 전날 준비사항은?", a: "준비물 점검, 시험장 위치 확인, 충분한 수면", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험 전날 준비사항은?\n\n다음 순서로 설명해주세요:\n1. 준비물 점검\n2. 시험장 위치\n3. 교통편 확인\n4. 충분한 수면\n5. 가벼운 복습" },
        { id: 45, q: "시험 중 당황했을 때 대처법은?", a: "심호흡, 쉬운 부분 먼저, 도면 재확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험 중 당황했을 때 대처법은?\n\n다음 순서로 설명해주세요:\n1. 심호흡으로 안정\n2. 쉬운 부분부터\n3. 도면 재확인\n4. 기본으로 돌아가기\n5. 포기하지 않기" },
      ]
    },
    {
      title: "마무리 체크리스트",
      icon: "✅",
      questions: [
        { id: 46, q: "결선 완료 후 점검 사항은?", a: "나사 조임, 절연 상태, 극성 확인, 접지 연결", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 결선 완료 후 점검 사항은?\n\n다음 순서로 설명해주세요:\n1. 나사 체결 확인\n2. 절연 상태 점검\n3. 극성 확인\n4. 접지 연결\n5. 외관 검사" },
        { id: 47, q: "전원 인가 전 확인 사항은?", a: "단락 여부, 절연저항, 결선 상태, 접지 연결", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 전원 인가 전 확인 사항은?\n\n다음 순서로 설명해주세요:\n1. 단락 여부 확인\n2. 절연저항 측정\n3. 결선 재확인\n4. 접지 확인\n5. 주위 안전" },
        { id: 48, q: "동작 시험 순서는?", a: "제어전원 → 동작 확인 → 주전원 → 부하 동작", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 동작 시험 순서는?\n\n다음 순서로 설명해주세요:\n1. 제어전원 인가\n2. 시퀀스 동작 확인\n3. 주전원 인가\n4. 부하 동작 확인\n5. 보호동작 확인" },
        { id: 49, q: "시험 종료 전 최종 점검은?", a: "동작 정상, 정리정돈, 공구 반납, 안전 확인", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 시험 종료 전 최종 점검은?\n\n다음 순서로 설명해주세요:\n1. 동작 재확인\n2. 정리정돈\n3. 공구 정리\n4. 폐자재 처리\n5. 안전 확인" },
        { id: 50, q: "감독관에게 보고 사항은?", a: "작업 완료 보고, 동작 시연, 특이사항 전달", prompt: "전기기능사 실기시험 관련 질문입니다.\n\n문제: 감독관에게 보고 사항은?\n\n다음 순서로 설명해주세요:\n1. 작업 완료 보고\n2. 동작 시연\n3. 특이사항 전달\n4. 질문 대응\n5. 정중한 태도" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedItems.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/mechanical/electrician-technician" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <span>←</span>
            <span>전기기능사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🔧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실기 대비</h1>
              <p className="text-gray-600">배선작업, 결선, 시퀀스, 측정</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicQuestions = topic.questions.map(q => `${topicIndex}-${q.id}`);
            const completedInTopic = topicQuestions.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const itemId = `${topicIndex}-${q.id}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() => toggleItem(itemId)}
                              className="mt-1 w-5 h-5 text-orange-600 rounded cursor-pointer"
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                Q{q.id}. {q.q}
                              </p>
                              <p className="text-sm text-red-700 mt-1 bg-red-100 px-2 py-1 rounded inline-block">
                                A: {q.a}
                              </p>
                            </div>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
                            >
                              🤖 AI
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">💡 실기시험 합격 TIP</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• 실기는 반복 연습이 핵심입니다. 최소 10회 이상 연습하세요</li>
            <li>• 시퀀스 회로는 자기유지, 인터록, 타이머가 기본입니다</li>
            <li>• 안전수칙 위반은 큰 감점 요인입니다</li>
            <li>• 시간 관리 연습도 실습만큼 중요합니다</li>
          </ul>
        </div>

        <div className="mt-4 bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">📚 실기 준비 추천 자료</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• 시대고시 전기기능사 실기 실습서</li>
            <li>• 유튜브 전기기능사 실기 강의</li>
            <li>• 직업전문학교 실습 과정 (2~3주)</li>
            <li>• 개인 실습 패널 (온라인 구매 가능)</li>
          </ul>
        </div>
      </div>

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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
