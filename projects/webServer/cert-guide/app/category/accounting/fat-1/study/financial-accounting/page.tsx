'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FinancialAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['current-assets']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fat-1-financial-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('fat-1-financial-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 유동자산 (1-5)
    { id: 1, topic: 'current-assets', question: '유동자산의 정의와 분류 기준을 설명하시오.', answer: '1년 내 현금화 가능한 자산, 당좌자산과 재고자산으로 분류', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 유동자산의 정의와 분류 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동자산의 정의\n2. 유동자산 분류 기준\n3. 당좌자산 vs 재고자산\n4. 회계처리 예시\n5. 연습문제 3개' },
    { id: 2, topic: 'current-assets', question: '현금및현금성자산의 회계처리를 설명하시오.', answer: '현금, 요구불예금, 3개월 내 만기 금융상품 포함', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 현금및현금성자산의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금성자산의 정의\n2. 포함 항목\n3. 제외 항목\n4. 회계처리 분개\n5. 연습문제 3개' },
    { id: 3, topic: 'current-assets', question: '매출채권과 대손충당금의 회계처리를 설명하시오.', answer: '외상매출금, 받을어음 / 대손설정 시 충당금 설정', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 매출채권과 대손충당금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출채권의 종류\n2. 대손충당금 설정\n3. 대손 발생 시 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 4, topic: 'current-assets', question: '단기투자자산의 종류와 평가방법을 설명하시오.', answer: '단기매매증권, 단기대여금 등 / 공정가치 또는 원가평가', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 단기투자자산의 종류와 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기투자자산 종류\n2. 평가방법\n3. 평가손익 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 5, topic: 'current-assets', question: '선급금과 선급비용의 차이를 설명하시오.', answer: '선급금: 재화·용역 대가 선지급 / 선급비용: 기간비용 선지급', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 선급금과 선급비용의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선급금의 정의\n2. 선급비용의 정의\n3. 차이점\n4. 분개 예시\n5. 연습문제 3개' },

    // 재고자산 (6-10)
    { id: 6, topic: 'inventory', question: '재고자산의 취득원가 구성요소를 설명하시오.', answer: '매입가격 + 매입부대비용 - 매입할인, 에누리', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 재고자산의 취득원가 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입가격\n2. 매입부대비용\n3. 매입할인·에누리 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 7, topic: 'inventory', question: '재고자산 평가방법(선입선출법, 후입선출법, 평균법)을 설명하시오.', answer: '선입선출: 먼저 매입한 것 먼저 출고 / 평균법: 가중평균 단가 적용', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 재고자산 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법\n2. 후입선출법\n3. 평균법\n4. 각 방법별 계산 예시\n5. 연습문제 3개' },
    { id: 8, topic: 'inventory', question: '저가법에 의한 재고자산 평가를 설명하시오.', answer: '취득원가와 순실현가능가치 중 낮은 금액으로 평가', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 저가법에 의한 재고자산 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저가법의 의의\n2. 순실현가능가치\n3. 재고자산평가손실\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 9, topic: 'inventory', question: '재고자산 감모손실의 회계처리를 설명하시오.', answer: '정상감모: 매출원가 / 비정상감모: 재고자산감모손실', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 재고자산 감모손실의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감모손실의 의의\n2. 정상감모 처리\n3. 비정상감모 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 10, topic: 'inventory', question: '매출원가 계산방법을 설명하시오.', answer: '기초재고 + 당기매입 - 기말재고 = 매출원가', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 매출원가 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출원가 공식\n2. 기초재고\n3. 당기매입\n4. 기말재고 결정\n5. 연습문제 3개' },

    // 유형자산 (11-15)
    { id: 11, topic: 'tangible-assets', question: '유형자산의 취득원가 결정방법을 설명하시오.', answer: '구입가격 + 취득부대비용 + 설치비용', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 유형자산의 취득원가 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득원가의 구성\n2. 취득부대비용\n3. 자본적 지출 vs 수익적 지출\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 12, topic: 'tangible-assets', question: '감가상각의 의의와 방법을 설명하시오.', answer: '자산 가치의 체계적 배분 / 정액법, 정률법, 생산량비례법', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 감가상각의 의의와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각의 의의\n2. 정액법\n3. 정률법\n4. 생산량비례법\n5. 연습문제 3개' },
    { id: 13, topic: 'tangible-assets', question: '정액법과 정률법의 감가상각비 계산을 비교 설명하시오.', answer: '정액법: (취득원가-잔존가치)/내용연수 / 정률법: 기초장부가액x상각률', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 정액법과 정률법의 감가상각비 계산을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법 계산 공식\n2. 정률법 계산 공식\n3. 각 방법의 특징\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'tangible-assets', question: '유형자산의 처분 회계처리를 설명하시오.', answer: '처분대가 - 장부가액 = 처분손익', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 유형자산의 처분 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처분손익 계산\n2. 유형자산처분이익\n3. 유형자산처분손실\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'tangible-assets', question: '자본적 지출과 수익적 지출의 구분을 설명하시오.', answer: '자본적 지출: 자산가치 증가 / 수익적 지출: 현상유지 비용', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 자본적 지출과 수익적 지출의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본적 지출의 정의\n2. 수익적 지출의 정의\n3. 구분 기준\n4. 분개 예시\n5. 연습문제 3개' },

    // 무형자산 (16-20)
    { id: 16, topic: 'intangible-assets', question: '무형자산의 정의와 인식요건을 설명하시오.', answer: '물리적 실체 없는 비화폐성 자산 / 식별가능성, 통제, 미래경제적효익', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 무형자산의 정의와 인식요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무형자산의 정의\n2. 식별가능성\n3. 통제\n4. 미래경제적효익\n5. 연습문제 3개' },
    { id: 17, topic: 'intangible-assets', question: '무형자산의 종류(영업권, 특허권, 상표권 등)를 설명하시오.', answer: '영업권, 특허권, 상표권, 개발비, 소프트웨어 등', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 무형자산의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업권\n2. 특허권\n3. 상표권\n4. 개발비\n5. 연습문제 3개' },
    { id: 18, topic: 'intangible-assets', question: '무형자산의 상각방법을 설명하시오.', answer: '내용연수에 걸쳐 정액법 등으로 상각', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 무형자산의 상각방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상각대상 무형자산\n2. 상각방법\n3. 내용연수 결정\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 19, topic: 'intangible-assets', question: '연구비와 개발비의 회계처리 차이를 설명하시오.', answer: '연구비: 비용처리 / 개발비: 요건 충족시 자산화', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 연구비와 개발비의 회계처리 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구비의 정의\n2. 개발비의 정의\n3. 자산화 요건\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 20, topic: 'intangible-assets', question: '내용연수가 비한정인 무형자산의 처리를 설명하시오.', answer: '상각하지 않고 매년 손상검사 실시', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 내용연수가 비한정인 무형자산의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비한정 내용연수의 의미\n2. 해당 자산 예시\n3. 손상검사\n4. 회계처리\n5. 연습문제 3개' },

    // 투자자산 (21-25)
    { id: 21, topic: 'investment-assets', question: '투자자산의 정의와 종류를 설명하시오.', answer: '영업 외 목적으로 장기 보유 자산 / 투자부동산, 장기투자증권 등', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 투자자산의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자자산의 정의\n2. 투자부동산\n3. 장기투자증권\n4. 장기대여금\n5. 연습문제 3개' },
    { id: 22, topic: 'investment-assets', question: '투자부동산의 회계처리를 설명하시오.', answer: '임대수익, 시세차익 목적 부동산 / 원가모형 또는 공정가치모형', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 투자부동산의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자부동산의 정의\n2. 원가모형\n3. 공정가치모형\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 23, topic: 'investment-assets', question: '장기투자증권의 분류와 평가를 설명하시오.', answer: '지분법적용투자주식, 매도가능증권 등으로 분류', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 장기투자증권의 분류와 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장기투자증권 분류\n2. 지분법\n3. 공정가치 평가\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 24, topic: 'investment-assets', question: '장기대여금의 회계처리를 설명하시오.', answer: '1년 이상 대여금, 이자수익 인식', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 장기대여금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장기대여금의 정의\n2. 이자수익 인식\n3. 대손 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 25, topic: 'investment-assets', question: '임차보증금의 회계처리를 설명하시오.', answer: '부동산 임차시 지급한 보증금, 비유동자산 분류', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 임차보증금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임차보증금의 정의\n2. 지급시 처리\n3. 회수시 처리\n4. 분개 예시\n5. 연습문제 3개' },

    // 유동부채 (26-30)
    { id: 26, topic: 'current-liabilities', question: '유동부채의 정의와 분류를 설명하시오.', answer: '1년 내 상환 의무가 있는 부채 / 매입채무, 단기차입금 등', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 유동부채의 정의와 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동부채의 정의\n2. 유동부채 분류 기준\n3. 주요 유동부채 계정\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 27, topic: 'current-liabilities', question: '매입채무(외상매입금, 지급어음)의 회계처리를 설명하시오.', answer: '상품 매입 시 발생하는 영업상 채무', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 매입채무의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외상매입금\n2. 지급어음\n3. 결제시 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 28, topic: 'current-liabilities', question: '단기차입금의 회계처리를 설명하시오.', answer: '1년 내 상환 조건의 차입금, 이자비용 인식', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 단기차입금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기차입금의 정의\n2. 차입시 처리\n3. 이자비용 인식\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 29, topic: 'current-liabilities', question: '미지급금과 미지급비용의 차이를 설명하시오.', answer: '미지급금: 영업외 채무 / 미지급비용: 기간비용 미지급액', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 미지급금과 미지급비용의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미지급금의 정의\n2. 미지급비용의 정의\n3. 차이점\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 30, topic: 'current-liabilities', question: '선수금과 선수수익의 회계처리를 설명하시오.', answer: '선수금: 재화·용역 대가 미리 수령 / 선수수익: 기간수익 선수령', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 선수금과 선수수익의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선수금의 정의\n2. 선수수익의 정의\n3. 수익 인식 시점\n4. 분개 예시\n5. 연습문제 3개' },

    // 비유동부채 (31-35)
    { id: 31, topic: 'non-current-liabilities', question: '비유동부채의 정의와 종류를 설명하시오.', answer: '1년 이상 상환기간인 부채 / 장기차입금, 사채, 퇴직급여충당부채', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 비유동부채의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비유동부채의 정의\n2. 장기차입금\n3. 사채\n4. 충당부채\n5. 연습문제 3개' },
    { id: 32, topic: 'non-current-liabilities', question: '장기차입금의 회계처리를 설명하시오.', answer: '1년 이상 상환기간 차입금, 유동성 대체 필요', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 장기차입금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장기차입금의 정의\n2. 이자비용 처리\n3. 유동성대체\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 33, topic: 'non-current-liabilities', question: '사채의 발행과 상환 회계처리를 설명하시오.', answer: '액면발행, 할인발행, 할증발행 / 상환시 사채상환손익', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 사채의 발행과 상환 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면발행\n2. 할인발행\n3. 할증발행\n4. 사채상환\n5. 연습문제 3개' },
    { id: 34, topic: 'non-current-liabilities', question: '퇴직급여충당부채의 회계처리를 설명하시오.', answer: '퇴직급여 지급을 위한 충당부채 설정', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 퇴직급여충당부채의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직급여제도\n2. 충당부채 설정\n3. 퇴직급여 지급\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'non-current-liabilities', question: '충당부채와 우발부채의 차이를 설명하시오.', answer: '충당부채: 인식요건 충족 / 우발부채: 주석 공시만', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 충당부채와 우발부채의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충당부채의 정의\n2. 우발부채의 정의\n3. 인식 요건\n4. 회계처리 차이\n5. 연습문제 3개' },

    // 자본 (36-40)
    { id: 36, topic: 'equity', question: '자본의 구성요소를 설명하시오.', answer: '자본금, 자본잉여금, 이익잉여금, 자본조정, 기타포괄손익누계액', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 자본의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금\n2. 자본잉여금\n3. 이익잉여금\n4. 자본조정\n5. 연습문제 3개' },
    { id: 37, topic: 'equity', question: '주식발행(유상증자)의 회계처리를 설명하시오.', answer: '액면초과액은 주식발행초과금으로 자본잉여금 계상', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 주식발행의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면발행\n2. 할증발행\n3. 주식발행초과금\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'equity', question: '이익잉여금 처분의 회계처리를 설명하시오.', answer: '배당금, 적립금, 차기이월이익잉여금으로 처분', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 이익잉여금 처분의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이익잉여금처분계산서\n2. 현금배당\n3. 적립금\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 39, topic: 'equity', question: '자기주식의 취득과 처분 회계처리를 설명하시오.', answer: '자기주식: 자본의 차감항목 / 처분이익은 자본잉여금', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 자기주식의 취득과 처분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주식의 정의\n2. 취득시 처리\n3. 처분시 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 40, topic: 'equity', question: '주식배당과 현금배당의 차이를 설명하시오.', answer: '주식배당: 자본금 증가 / 현금배당: 현금 유출', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 주식배당과 현금배당의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금배당의 정의\n2. 주식배당의 정의\n3. 회계처리 차이\n4. 분개 예시\n5. 연습문제 3개' },

    // 수익비용 (41-45)
    { id: 41, topic: 'revenue-expense', question: '수익의 인식기준을 설명하시오.', answer: '실현주의: 재화 인도, 용역 제공 완료시 인식', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 수익의 인식기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수익 인식 원칙\n2. 재화 판매 수익\n3. 용역 제공 수익\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 42, topic: 'revenue-expense', question: '비용의 인식기준을 설명하시오.', answer: '발생주의와 수익비용대응의 원칙', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 비용의 인식기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생주의\n2. 수익비용대응\n3. 기간비용\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'revenue-expense', question: '영업수익과 영업외수익의 구분을 설명하시오.', answer: '영업수익: 주된 영업활동 / 영업외수익: 부수적 활동', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 영업수익과 영업외수익의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업수익\n2. 영업외수익\n3. 구분 기준\n4. 계정과목 예시\n5. 연습문제 3개' },
    { id: 44, topic: 'revenue-expense', question: '판매비와관리비의 종류를 설명하시오.', answer: '급여, 복리후생비, 감가상각비, 광고선전비, 임차료 등', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 판매비와관리비의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판매비\n2. 관리비\n3. 주요 계정과목\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 45, topic: 'revenue-expense', question: '이자수익과 이자비용의 회계처리를 설명하시오.', answer: '발생주의에 따라 기간 경과분 인식', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 이자수익과 이자비용의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자수익 인식\n2. 이자비용 인식\n3. 기말 수정분개\n4. 분개 예시\n5. 연습문제 3개' },

    // 재무제표분석 (46-50)
    { id: 46, topic: 'financial-analysis', question: '재무제표의 종류와 상호관계를 설명하시오.', answer: '재무상태표, 손익계산서, 자본변동표, 현금흐름표, 주석', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 재무제표의 종류와 상호관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표\n2. 손익계산서\n3. 현금흐름표\n4. 상호관계\n5. 연습문제 3개' },
    { id: 47, topic: 'financial-analysis', question: '유동비율과 당좌비율의 계산과 의미를 설명하시오.', answer: '유동비율=유동자산/유동부채 / 당좌비율=당좌자산/유동부채', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 유동비율과 당좌비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동비율 공식\n2. 당좌비율 공식\n3. 분석 의미\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 48, topic: 'financial-analysis', question: '부채비율과 이자보상비율의 의미를 설명하시오.', answer: '부채비율=부채/자본 / 이자보상비율=영업이익/이자비용', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 부채비율과 이자보상비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부채비율 공식\n2. 이자보상비율 공식\n3. 안정성 분석\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'financial-analysis', question: '총자산이익률(ROA)과 자기자본이익률(ROE)을 설명하시오.', answer: 'ROA=당기순이익/총자산 / ROE=당기순이익/자기자본', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: ROA와 ROE를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ROA 공식\n2. ROE 공식\n3. 수익성 분석\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'financial-analysis', question: '매출채권회전율과 재고자산회전율의 의미를 설명하시오.', answer: '매출채권회전율=매출액/매출채권 / 재고자산회전율=매출원가/재고자산', prompt: 'FAT 1급 재무회계 문제입니다.\n\n문제: 매출채권회전율과 재고자산회전율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출채권회전율 공식\n2. 재고자산회전율 공식\n3. 활동성 분석\n4. 계산 예시\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'current-assets', name: '유동자산', icon: '💵', count: 5 },
    { id: 'inventory', name: '재고자산', icon: '📦', count: 5 },
    { id: 'tangible-assets', name: '유형자산', icon: '🏭', count: 5 },
    { id: 'intangible-assets', name: '무형자산', icon: '💡', count: 5 },
    { id: 'investment-assets', name: '투자자산', icon: '📈', count: 5 },
    { id: 'current-liabilities', name: '유동부채', icon: '📋', count: 5 },
    { id: 'non-current-liabilities', name: '비유동부채', icon: '📜', count: 5 },
    { id: 'equity', name: '자본', icon: '🏛️', count: 5 },
    { id: 'revenue-expense', name: '수익비용', icon: '💰', count: 5 },
    { id: 'financial-analysis', name: '재무제표분석', icon: '📊', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-1" className="text-gray-500 hover:text-gray-700">FAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">재무회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">재무회계</h1>
              <p className="text-teal-100">자산·부채·자본·수익·비용 회계처리</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-teal-100 border-2 border-teal-300'
                    : 'bg-white border border-gray-200 hover:border-teal-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0"
                            >
                              AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/fat-1/study/accounting-principle" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 회계원리
          </Link>
          <Link href="/category/accounting/fat-1/study/cost-management" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            원가관리회계 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">X</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. FAT 1급 재무회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
