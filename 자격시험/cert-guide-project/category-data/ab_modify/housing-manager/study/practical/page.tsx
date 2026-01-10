'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('housing-practical-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('housing-practical-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '입주자 관리',
      questions: [
        { id: 1, question: '입주 전 사전점검의 절차와 내용을 설명하시오.', answer: '입주예정자에게 점검일정 통보, 하자점검표 작성, 하자접수 및 보수요청', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 입주 전 사전점검의 절차와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전점검 목적\n2. 점검 절차\n3. 하자점검 체크리스트\n4. 하자보수 요청\n5. 연습문제 3개' },
        { id: 2, question: '입주자 이사 관리 업무를 설명하시오.', answer: '이사일정 조율, 엘리베이터 보양, 공용부분 보호, 주차관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 입주자 이사 관리 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사 일정 관리\n2. 시설물 보양\n3. 공용부분 보호\n4. 이사확인서 발급\n5. 연습문제 3개' },
        { id: 3, question: '전입신고와 주민등록 관리를 설명하시오.', answer: '입주자 전입신고 안내, 세대원 현황 파악, 관리비 부과 기준일 확인', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 전입신고와 주민등록 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전입신고 안내\n2. 세대원 현황 관리\n3. 관리비 부과 기준\n4. 개인정보 보호\n5. 연습문제 3개' },
        { id: 4, question: '민원처리의 절차와 방법을 설명하시오.', answer: '민원접수→현황파악→조치→회신, 민원대장 관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 민원처리의 절차와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민원 접수 방법\n2. 처리 절차\n3. 회신 방법\n4. 민원대장 관리\n5. 연습문제 3개' },
        { id: 5, question: '층간소음 민원처리 방법을 설명하시오.', answer: '양 세대 면담, 중재 노력, 층간소음관리위원회, 분쟁조정 안내', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 층간소음 민원처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민원 접수 및 확인\n2. 중재 절차\n3. 층간소음관리위원회\n4. 외부 분쟁조정\n5. 연습문제 3개' },
        { id: 6, question: '주차관리의 방법과 운영을 설명하시오.', answer: '주차대장 관리, 주차스티커 발급, 위반차량 조치, 외부차량 관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 주차관리의 방법과 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주차등록 절차\n2. 주차구획 배정\n3. 위반차량 조치\n4. 방문차량 관리\n5. 연습문제 3개' },
        { id: 7, question: '반려동물 관리규정 운영을 설명하시오.', answer: '등록의무, 목줄착용, 배설물 수거, 공용부분 출입제한', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 반려동물 관리규정 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련 규정\n2. 등록 절차\n3. 준수사항\n4. 위반 시 조치\n5. 연습문제 3개' },
        { id: 8, question: '공동생활 질서유지 방법을 설명하시오.', answer: '안내문 게시, 방송안내, 개별 접촉, 과태료 부과 안내', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 공동생활 질서유지 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질서유지 사항\n2. 홍보 방법\n3. 위반자 조치\n4. 분쟁 예방\n5. 연습문제 3개' },
        { id: 9, question: '동호수 표시 및 게시물 관리를 설명하시오.', answer: '동호수 표시판 관리, 안내문 게시 기준, 불법 게시물 제거', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 동호수 표시 및 게시물 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표시판 관리\n2. 게시물 승인 절차\n3. 불법 게시물 처리\n4. 전자게시판 운영\n5. 연습문제 3개' },
        { id: 10, question: '커뮤니티시설 운영관리를 설명하시오.', answer: '이용규정, 예약시스템, 이용료, 안전관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 커뮤니티시설 운영관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시설 종류\n2. 이용규정\n3. 예약 관리\n4. 안전 및 위생관리\n5. 연습문제 3개' }
      ]
    },
    {
      name: '관리비 실무',
      questions: [
        { id: 11, question: '관리비 부과 절차를 설명하시오.', answer: '사용량 검침→비용 집계→세대별 배분→고지서 발송', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 관리비 부과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검침 및 집계\n2. 배분 기준\n3. 고지서 작성\n4. 발송 및 수납\n5. 연습문제 3개' },
        { id: 12, question: '세대별 관리비 배분방법을 설명하시오.', answer: '전용면적 비례, 세대수 균등, 사용량 비례 등 항목별 차등', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 세대별 관리비 배분방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면적비례 배분\n2. 균등배분\n3. 사용량 비례\n4. 항목별 배분기준\n5. 연습문제 3개' },
        { id: 13, question: '관리비 미납자 관리방법을 설명하시오.', answer: '독촉장 발송→연체료 부과→내용증명→법적조치', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 관리비 미납자 관리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미납 현황 파악\n2. 독촉 절차\n3. 연체료 기준\n4. 법적 조치\n5. 연습문제 3개' },
        { id: 14, question: '관리비 정산업무를 설명하시오.', answer: '월간 정산, 연간 결산, 이월금 처리, 정산서 작성', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 관리비 정산업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 월간 정산\n2. 연간 결산\n3. 이월금 처리\n4. 정산 공개\n5. 연습문제 3개' },
        { id: 15, question: '전기료 검침 및 부과방법을 설명하시오.', answer: '세대계량기 검침, 공용전력 배분, 기본료+사용료 구조', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 전기료 검침 및 부과방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검침 방법\n2. 요금체계\n3. 공용전력 배분\n4. 고지서 작성\n5. 연습문제 3개' },
        { id: 16, question: '수도료 검침 및 부과방법을 설명하시오.', answer: '세대계량기 검침, 공용수도 배분, 상하수도 요금', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 수도료 검침 및 부과방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검침 절차\n2. 요금 산정\n3. 공용수도 처리\n4. 누수 대응\n5. 연습문제 3개' },
        { id: 17, question: '난방비 부과방법을 설명하시오.', answer: '열량계 검침 또는 면적비례, 기본료+사용료, 정산 방법', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 난방비 부과방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열량계 검침\n2. 부과 방식\n3. 공용난방비\n4. 정산 방법\n5. 연습문제 3개' },
        { id: 18, question: '잡수입 관리방법을 설명하시오.', answer: '발생원천별 관리, 수입장 작성, 사용용도 결정', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 잡수입 관리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잡수입 종류\n2. 수입 관리\n3. 사용 절차\n4. 회계 처리\n5. 연습문제 3개' },
        { id: 19, question: '관리비 예산 편성방법을 설명하시오.', answer: '전년도 실적 분석, 물가상승률 반영, 항목별 예산안 작성', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 관리비 예산 편성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 편성 기준\n2. 항목별 산정\n3. 예산안 심의\n4. 예산 집행\n5. 연습문제 3개' },
        { id: 20, question: '관리비 고지서 발급 및 관리를 설명하시오.', answer: '고지서 항목, 발급일정, 전자고지, 재발급 절차', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 관리비 고지서 발급 및 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고지서 항목\n2. 발급 일정\n3. 전자고지\n4. 재발급 절차\n5. 연습문제 3개' }
      ]
    },
    {
      name: '장기수선계획 실무',
      questions: [
        { id: 21, question: '장기수선계획의 수립 실무를 설명하시오.', answer: '시설물 현황조사, 수선항목 선정, 수선주기 결정, 비용산정', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 장기수선계획의 수립 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현황조사\n2. 수선항목 선정\n3. 수선주기 결정\n4. 비용 산정\n5. 연습문제 3개' },
        { id: 22, question: '장기수선계획 조정 절차를 설명하시오.', answer: '3년 주기 검토, 입주자대표회의 의결, 장기수선계획서 작성', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 장기수선계획 조정 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조정 시기\n2. 검토 항목\n3. 의결 절차\n4. 공개 및 보관\n5. 연습문제 3개' },
        { id: 23, question: '장기수선충당금 적립 실무를 설명하시오.', answer: '월별 적립금 산정, 부과 및 징수, 별도계좌 관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 장기수선충당금 적립 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적립금 산정\n2. 부과 절차\n3. 계좌 관리\n4. 적립금 현황 공개\n5. 연습문제 3개' },
        { id: 24, question: '장기수선공사 시행절차를 설명하시오.', answer: '공사계획→설계→입찰→시공→준공검사', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 장기수선공사 시행절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공사계획 수립\n2. 설계 및 입찰\n3. 업체 선정\n4. 시공 및 검사\n5. 연습문제 3개' },
        { id: 25, question: '장기수선충당금 사용 승인절차를 설명하시오.', answer: '사용계획서 작성→입주자대표회의 의결→사용→정산', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 장기수선충당금 사용 승인절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용계획서 작성\n2. 의결 절차\n3. 사용 방법\n4. 정산 및 보고\n5. 연습문제 3개' },
        { id: 26, question: '소유자 변경 시 장기수선충당금 정산을 설명하시오.', answer: '매도자와 매수자 간 정산, 적립금 승계', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 소유자 변경 시 장기수선충당금 정산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산 의무\n2. 정산 기준\n3. 정산 절차\n4. 분쟁 해결\n5. 연습문제 3개' },
        { id: 27, question: '주요시설 교체공사 관리를 설명하시오.', answer: '승강기, 급수배관, 외벽, 지붕 등 대형공사 관리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 주요시설 교체공사 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교체대상 시설\n2. 공사 계획\n3. 입주자 안내\n4. 품질 관리\n5. 연습문제 3개' },
        { id: 28, question: '공사감독 업무를 설명하시오.', answer: '시공상태 확인, 자재검수, 공정관리, 하자점검', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 공사감독 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감독자의 역할\n2. 품질 확인\n3. 공정 관리\n4. 준공 검사\n5. 연습문제 3개' },
        { id: 29, question: '외주공사 계약관리를 설명하시오.', answer: '계약서 작성, 대금지급, 하자보수보증, 분쟁처리', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 외주공사 계약관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계약서 필수사항\n2. 대금지급 조건\n3. 하자보증\n4. 분쟁 해결\n5. 연습문제 3개' },
        { id: 30, question: '에너지절약 시설개선 실무를 설명하시오.', answer: 'LED 교체, 단열보강, 보일러 교체, 태양광 설치', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 에너지절약 시설개선 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에너지 진단\n2. 개선 항목\n3. 투자비 분석\n4. 정부지원 활용\n5. 연습문제 3개' }
      ]
    },
    {
      name: '하자관리 실무',
      questions: [
        { id: 31, question: '하자접수 및 처리절차를 설명하시오.', answer: '하자신고→현장확인→사업주체 통보→보수→확인', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 하자접수 및 처리절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하자 접수\n2. 현장 확인\n3. 보수 요청\n4. 보수 확인\n5. 연습문제 3개' },
        { id: 32, question: '하자담보책임기간별 관리를 설명하시오.', answer: '시설별 담보기간 관리, 만료 전 일괄점검, 기간 내 보수요청', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 하자담보책임기간별 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기간별 관리대장\n2. 만료 전 점검\n3. 보수요청 방법\n4. 기간연장 가능성\n5. 연습문제 3개' },
        { id: 33, question: '공용부분 하자점검 방법을 설명하시오.', answer: '정기점검, 계절점검, 하자유형별 체크리스트 활용', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 공용부분 하자점검 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 대상\n2. 점검 주기\n3. 체크리스트 활용\n4. 기록 관리\n5. 연습문제 3개' },
        { id: 34, question: '전유부분 하자관리 업무를 설명하시오.', answer: '세대 하자접수, 사업주체 연결, 보수일정 조율', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 전유부분 하자관리 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하자 접수\n2. 사업주체 연락\n3. 일정 조율\n4. 보수 확인\n5. 연습문제 3개' },
        { id: 35, question: '하자보수보증금 청구절차를 설명하시오.', answer: '미보수 하자확인→금액산정→보증기관 청구→수령', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 하자보수보증금 청구절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청구 요건\n2. 금액 산정\n3. 청구 서류\n4. 수령 및 사용\n5. 연습문제 3개' },
        { id: 36, question: '하자분쟁 조정절차를 설명하시오.', answer: '하자심사위원회 심사신청→하자판정→보수범위 결정', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 하자분쟁 조정절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조정신청\n2. 심사절차\n3. 하자판정\n4. 조정 효력\n5. 연습문제 3개' },
        { id: 37, question: '누수하자의 처리방법을 설명하시오.', answer: '누수원인 조사, 책임소재 판단, 보수방법 결정', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 누수하자의 처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 누수 원인 조사\n2. 책임 판단\n3. 보수 방법\n4. 분쟁 해결\n5. 연습문제 3개' },
        { id: 38, question: '균열하자의 종류와 처리를 설명하시오.', answer: '구조적 균열, 비구조적 균열 구분, 보수방법 결정', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 균열하자의 종류와 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균열 종류\n2. 원인 분석\n3. 보수 방법\n4. 하자 판정\n5. 연습문제 3개' },
        { id: 39, question: '결로하자의 원인과 대책을 설명하시오.', answer: '단열부족, 환기부족, 습도관리 문제, 개선방안', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 결로하자의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결로 원인\n2. 책임 판단\n3. 개선 방안\n4. 입주자 안내\n5. 연습문제 3개' },
        { id: 40, question: '하자관리 대장 작성방법을 설명하시오.', answer: '하자접수일, 내용, 처리경과, 완료일, 사진 등 기록', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 하자관리 대장 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기재 항목\n2. 작성 방법\n3. 사진 첨부\n4. 보관 기간\n5. 연습문제 3개' }
      ]
    },
    {
      name: '안전관리 실무',
      questions: [
        { id: 41, question: '소방안전관리자의 업무를 설명하시오.', answer: '소방계획서 작성, 자위소방대 편성, 소방훈련, 시설점검', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 소방안전관리자의 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 기준\n2. 소방계획서\n3. 소방훈련\n4. 시설 점검\n5. 연습문제 3개' },
        { id: 42, question: '화재 시 대응절차를 설명하시오.', answer: '화재감지→경보발령→대피유도→119신고→초기진화', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 화재 시 대응절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재 감지\n2. 경보 및 대피\n3. 119 신고\n4. 초기 진화\n5. 연습문제 3개' },
        { id: 43, question: '승강기 안전관리 업무를 설명하시오.', answer: '일상점검, 정기검사, 고장대응, 갇힘사고 구출', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 승강기 안전관리 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일상 점검\n2. 정기검사 관리\n3. 고장 대응\n4. 갇힘사고 구출\n5. 연습문제 3개' },
        { id: 44, question: '전기안전관리 업무를 설명하시오.', answer: '안전관리자 업무, 정기점검, 절연저항 측정, 사고예방', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 전기안전관리 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전관리자 업무\n2. 정기 점검\n3. 측정 항목\n4. 사고 예방\n5. 연습문제 3개' },
        { id: 45, question: '가스안전관리 업무를 설명하시오.', answer: '가스누출 점검, 안전점검, 비상시 대응', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 가스안전관리 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일상 점검\n2. 정기검사\n3. 가스누출 대응\n4. 안전교육\n5. 연습문제 3개' },
        { id: 46, question: '재난대비 매뉴얼 작성방법을 설명하시오.', answer: '재난유형별 대응절차, 비상연락체계, 대피계획', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 재난대비 매뉴얼 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재난 유형\n2. 대응 절차\n3. 비상연락체계\n4. 훈련 계획\n5. 연습문제 3개' },
        { id: 47, question: '사고발생 시 보고체계를 설명하시오.', answer: '사고발생→초동조치→상급기관 보고→원인조사→재발방지', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 사고발생 시 보고체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사고 보고 대상\n2. 보고 절차\n3. 원인 조사\n4. 재발 방지\n5. 연습문제 3개' },
        { id: 48, question: '어린이놀이시설 안전관리를 설명하시오.', answer: '정기안전점검(2년), 일상점검, 안전교육, 사고보험', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 어린이놀이시설 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 종류\n2. 점검 주기\n3. 안전관리자\n4. 사고 대응\n5. 연습문제 3개' },
        { id: 49, question: '지하주차장 안전관리를 설명하시오.', answer: 'CO농도 관리, 조명관리, 방범CCTV, 비상통화장치', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 지하주차장 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기 관리\n2. 조명 관리\n3. 방범 시설\n4. 비상시설\n5. 연습문제 3개' },
        { id: 50, question: '입주자대표회의 운영지원 업무를 설명하시오.', answer: '회의준비, 안건작성, 회의록 작성, 의결사항 이행', prompt: '주택관리사 공동주택관리실무 문제입니다.\n\n문제: 입주자대표회의 운영지원 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회의 준비\n2. 안건 작성\n3. 회의록 작성\n4. 의결 이행\n5. 연습문제 3개' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">공동주택관리실무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🏢 공동주택관리실무</h1>
          <p className="text-gray-600">주택관리사(보) 2차 시험 - 공동주택관리실무 학습</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">학습 진행률</span>
            <span className="text-teal-600 font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev => prev.includes(topicIdx) ? prev.filter(t => t !== topicIdx) : [...prev, topicIdx])}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topicIdx + 1}</span>
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 rounded text-teal-600 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-2">{q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                          >
                            🤖 AI에게 자세히 묻기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/category/insurance/housing-manager" className="text-teal-600 hover:text-teal-700 font-medium">
            ← 주택관리사(보) 메인으로
          </Link>
        </div>
      </main>

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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
