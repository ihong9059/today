'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinancialAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial-statements']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-2-financial-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-2-financial-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 재무제표 이해 (1-5)
    { id: 1, topic: 'financial-statements', question: '재무제표의 종류와 각각의 기능을 설명하시오.', answer: '재무상태표, 손익계산서, 현금흐름표, 자본변동표, 주석', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재무제표의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표의 역할\n2. 손익계산서의 역할\n3. 현금흐름표의 역할\n4. 자본변동표와 주석\n5. 연습문제 3개' },
    { id: 2, topic: 'financial-statements', question: '재무상태표 등식(자산=부채+자본)의 의미를 설명하시오.', answer: '기업의 재무상태를 나타내는 기본등식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재무상태표 등식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자산의 정의\n2. 부채의 정의\n3. 자본의 정의\n4. 등식의 의미\n5. 연습문제 3개' },
    { id: 3, topic: 'financial-statements', question: '손익계산서의 당기순이익 계산 과정을 설명하시오.', answer: '매출-매출원가=매출총이익, 영업이익, 당기순이익', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 당기순이익 계산과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출총이익 계산\n2. 영업이익 계산\n3. 법인세비용차감전순이익\n4. 당기순이익 도출\n5. 연습문제 3개' },
    { id: 4, topic: 'financial-statements', question: '재무제표 작성의 기본가정(계속기업, 발생기준)을 설명하시오.', answer: '계속기업가정: 영속, 발생기준: 현금과 무관하게 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재무제표 기본가정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계속기업 가정의 의미\n2. 발생기준 회계\n3. 현금기준과의 차이\n4. 적용 사례\n5. 연습문제 3개' },
    { id: 5, topic: 'financial-statements', question: '재무제표의 질적 특성(목적적합성, 신뢰성)을 설명하시오.', answer: '목적적합성: 의사결정 유용, 신뢰성: 충실한 표현', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재무제표 질적특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목적적합성\n2. 신뢰성\n3. 비교가능성\n4. 이해가능성\n5. 연습문제 3개' },

    // 유동자산 (6-10)
    { id: 6, topic: 'current-assets', question: '유동자산의 분류기준(1년 기준)을 설명하시오.', answer: '1년 이내 현금화 또는 영업주기 내 회수', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 유동자산 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동자산 정의\n2. 1년 기준\n3. 영업주기 기준\n4. 유동자산 종류\n5. 연습문제 3개' },
    { id: 7, topic: 'current-assets', question: '현금및현금성자산의 범위를 설명하시오.', answer: '현금, 요구불예금, 3개월 이내 만기 단기투자', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 현금및현금성자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금의 범위\n2. 현금성자산 조건\n3. 포함되지 않는 항목\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 8, topic: 'current-assets', question: '매출채권과 대손충당금의 회계처리를 설명하시오.', answer: '대손추산액 설정, 대손발생시 상계 처리', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 매출채권과 대손충당금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출채권 인식\n2. 대손충당금 설정\n3. 대손발생 처리\n4. 대손충당금 환입\n5. 연습문제 3개' },
    { id: 9, topic: 'current-assets', question: '재고자산의 종류와 평가방법을 설명하시오.', answer: '선입선출법, 평균법, 후입선출법(비허용)', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재고자산 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고자산 종류\n2. 선입선출법\n3. 평균법\n4. 저가법 평가\n5. 연습문제 3개' },
    { id: 10, topic: 'current-assets', question: '선급금과 선급비용의 차이를 설명하시오.', answer: '선급금: 재화용역 대가, 선급비용: 기간경과 비용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 선급금과 선급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선급금 정의\n2. 선급비용 정의\n3. 구분 기준\n4. 분개 예시\n5. 연습문제 3개' },

    // 비유동자산 (11-15)
    { id: 11, topic: 'non-current-assets', question: '유형자산의 취득원가 결정을 설명하시오.', answer: '매입가액 + 부대비용(취득세, 설치비 등)', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 유형자산 취득원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득원가 구성요소\n2. 포함되는 부대비용\n3. 제외되는 비용\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 12, topic: 'non-current-assets', question: '감가상각의 의미와 방법(정액법/정률법)을 설명하시오.', answer: '정액법: 균등배분, 정률법: 체감상각', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 감가상각방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각의 의의\n2. 정액법 계산\n3. 정률법 계산\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 13, topic: 'non-current-assets', question: '유형자산의 처분손익 계산을 설명하시오.', answer: '처분손익 = 처분금액 - 장부금액', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 유형자산 처분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장부금액 계산\n2. 처분손익 산출\n3. 처분이익 분개\n4. 처분손실 분개\n5. 연습문제 3개' },
    { id: 14, topic: 'non-current-assets', question: '무형자산의 종류와 상각을 설명하시오.', answer: '영업권, 특허권, 소프트웨어 등 정액법 상각', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 무형자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무형자산 종류\n2. 인식 조건\n3. 상각 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'non-current-assets', question: '자본적지출과 수익적지출의 구분을 설명하시오.', answer: '자본적지출: 자산화, 수익적지출: 당기비용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 자본적지출과 수익적지출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본적지출 조건\n2. 수익적지출 조건\n3. 판단 기준\n4. 분개 예시\n5. 연습문제 3개' },

    // 부채 (16-20)
    { id: 16, topic: 'liabilities', question: '유동부채와 비유동부채의 분류기준을 설명하시오.', answer: '1년 이내 결제의무 여부로 구분', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 부채의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동부채 정의\n2. 비유동부채 정의\n3. 분류 기준\n4. 주요 계정과목\n5. 연습문제 3개' },
    { id: 17, topic: 'liabilities', question: '미지급금과 미지급비용의 차이를 설명하시오.', answer: '미지급금: 확정채무, 미지급비용: 발생기준 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 미지급금과 미지급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미지급금 정의\n2. 미지급비용 정의\n3. 구분 기준\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 18, topic: 'liabilities', question: '선수금과 선수수익의 차이를 설명하시오.', answer: '선수금: 재화용역 대가, 선수수익: 미경과 수익', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 선수금과 선수수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선수금 정의\n2. 선수수익 정의\n3. 구분 기준\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 19, topic: 'liabilities', question: '퇴직급여충당부채의 회계처리를 설명하시오.', answer: '퇴직급여 추정액을 부채로 설정', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 퇴직급여충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직급여충당부채 정의\n2. 설정 분개\n3. 퇴직시 처리\n4. 퇴직연금 차이\n5. 연습문제 3개' },
    { id: 20, topic: 'liabilities', question: '충당부채의 인식요건을 설명하시오.', answer: '현재의무, 자원유출 가능성, 금액 신뢰성', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 충당부채 인식요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현재의무 조건\n2. 자원유출 가능성\n3. 금액의 신뢰성\n4. 우발부채와 구분\n5. 연습문제 3개' },

    // 자본 (21-25)
    { id: 21, topic: 'equity', question: '자본의 구성요소(자본금, 자본잉여금, 이익잉여금)를 설명하시오.', answer: '자본금: 액면가액, 자본잉여금: 주식초과액', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 자본의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금 정의\n2. 자본잉여금 종류\n3. 이익잉여금 구성\n4. 자본조정 항목\n5. 연습문제 3개' },
    { id: 22, topic: 'equity', question: '주식발행(액면발행, 할증발행)의 회계처리를 설명하시오.', answer: '액면발행: 자본금만, 할증발행: 주식발행초과금', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 주식발행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면발행 분개\n2. 할증발행 분개\n3. 주식발행초과금\n4. 주식발행비 처리\n5. 연습문제 3개' },
    { id: 23, topic: 'equity', question: '배당금(현금배당)의 회계처리를 설명하시오.', answer: '배당결의시 미지급배당금, 지급시 현금감소', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 배당금 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배당결의시 분개\n2. 배당지급시 분개\n3. 이익준비금 적립\n4. 주식배당과의 차이\n5. 연습문제 3개' },
    { id: 24, topic: 'equity', question: '이익잉여금처분계산서의 작성을 설명하시오.', answer: '미처분이익잉여금의 배당, 적립, 이월 내역', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 이익잉여금처분계산서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작성 목적\n2. 구성 항목\n3. 처분 순서\n4. 작성 사례\n5. 연습문제 3개' },
    { id: 25, topic: 'equity', question: '자기주식의 취득과 처분을 설명하시오.', answer: '자기주식은 자본차감 항목으로 표시', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 자기주식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주식 취득 분개\n2. 자본차감 표시\n3. 처분이익 처리\n4. 처분손실 처리\n5. 연습문제 3개' },

    // 수익인식 (26-30)
    { id: 26, topic: 'revenue-recognition', question: '수익인식의 기본원칙(실현주의)을 설명하시오.', answer: '재화인도, 용역제공 완료시 수익인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 수익인식 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실현주의 정의\n2. 수익인식 조건\n3. 재화 판매\n4. 용역 제공\n5. 연습문제 3개' },
    { id: 27, topic: 'revenue-recognition', question: '상품매출의 인식시점과 회계처리를 설명하시오.', answer: '인도시점 기준, 위험과 보상 이전', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 상품매출 인식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식 시점\n2. 위험과 보상 이전\n3. 외상매출 분개\n4. 현금매출 분개\n5. 연습문제 3개' },
    { id: 28, topic: 'revenue-recognition', question: '매출에누리와 매출환입의 회계처리를 설명하시오.', answer: '매출에누리: 할인, 매출환입: 반품', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 매출에누리와 환입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출에누리 정의\n2. 매출환입 정의\n3. 회계처리 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 29, topic: 'revenue-recognition', question: '이자수익과 배당금수익의 인식을 설명하시오.', answer: '이자: 기간경과, 배당금: 배당확정시', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 이자수익과 배당금수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자수익 인식시점\n2. 배당금수익 인식시점\n3. 미수이자 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 30, topic: 'revenue-recognition', question: '영업외수익의 종류와 인식을 설명하시오.', answer: '이자수익, 유형자산처분이익, 잡이익 등', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 영업외수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업외수익 정의\n2. 주요 계정과목\n3. 인식 시점\n4. 분개 예시\n5. 연습문제 3개' },

    // 비용인식 (31-35)
    { id: 31, topic: 'expense-recognition', question: '비용인식의 기본원칙(대응원칙)을 설명하시오.', answer: '수익과 관련된 비용을 같은 기간에 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 비용인식 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대응원칙 정의\n2. 직접대응\n3. 기간대응\n4. 즉시비용화\n5. 연습문제 3개' },
    { id: 32, topic: 'expense-recognition', question: '매출원가의 계산(기초+매입-기말=매출원가)을 설명하시오.', answer: '기초재고 + 당기매입 - 기말재고 = 매출원가', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 매출원가 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출원가 공식\n2. 계산 예시\n3. 상품재고 영향\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 33, topic: 'expense-recognition', question: '판매비와관리비의 종류를 설명하시오.', answer: '급여, 복리후생비, 접대비, 감가상각비 등', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 판매비와관리비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판매비 종류\n2. 관리비 종류\n3. 구분 기준\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 34, topic: 'expense-recognition', question: '영업외비용의 종류와 인식을 설명하시오.', answer: '이자비용, 유형자산처분손실, 기부금 등', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 영업외비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업외비용 정의\n2. 주요 계정과목\n3. 인식 시점\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'expense-recognition', question: '법인세비용의 회계처리를 설명하시오.', answer: '당기법인세와 이연법인세로 구성', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 법인세비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법인세비용 정의\n2. 당기법인세\n3. 미지급법인세\n4. 분개 예시\n5. 연습문제 3개' },

    // 결산조정 (36-40)
    { id: 36, topic: 'closing-adjustment', question: '결산정리분개의 종류와 목적을 설명하시오.', answer: '수익비용 귀속, 자산부채 평가, 미수미지급 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 결산정리분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산정리 목적\n2. 주요 분개 종류\n3. 수익비용 조정\n4. 자산부채 평가\n5. 연습문제 3개' },
    { id: 37, topic: 'closing-adjustment', question: '미수수익과 미지급비용의 결산조정을 설명하시오.', answer: '발생했으나 미수령/미지급된 금액 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 미수수익과 미지급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미수수익 인식\n2. 미지급비용 인식\n3. 결산시 분개\n4. 익기 처리\n5. 연습문제 3개' },
    { id: 38, topic: 'closing-adjustment', question: '선급비용과 선수수익의 결산조정을 설명하시오.', answer: '기간경과분 조정하여 당기 귀속분 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 선급비용과 선수수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선급비용 조정\n2. 선수수익 조정\n3. 결산시 분개\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 39, topic: 'closing-adjustment', question: '감가상각비와 대손상각비의 결산조정을 설명하시오.', answer: '당기 귀속분 비용 인식 및 충당금 설정', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 감가상각비와 대손상각비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각비 계상\n2. 대손상각비 계상\n3. 충당금 설정\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 40, topic: 'closing-adjustment', question: '재고자산평가손실의 결산조정을 설명하시오.', answer: '저가법 적용시 평가손실 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재고자산평가손실을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저가법 적용\n2. 평가손실 계산\n3. 결산시 분개\n4. 환입 처리\n5. 연습문제 3개' },

    // 회계변경 (41-45)
    { id: 41, topic: 'accounting-changes', question: '회계정책의 변경과 회계추정의 변경을 구분하시오.', answer: '회계정책: 소급적용, 회계추정: 전진적용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 회계변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계정책 변경\n2. 회계추정 변경\n3. 적용 방법 차이\n4. 구분 예시\n5. 연습문제 3개' },
    { id: 42, topic: 'accounting-changes', question: '감가상각방법 변경의 회계처리를 설명하시오.', answer: '회계추정 변경으로 전진적용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 감가상각방법 변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변경 사유\n2. 전진적용 방법\n3. 변경효과 산출\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'accounting-changes', question: '재고자산 평가방법 변경의 회계처리를 설명하시오.', answer: '회계정책 변경으로 소급적용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 재고자산 평가방법 변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변경 사유\n2. 소급적용 방법\n3. 비교재무제표 수정\n4. 처리 예시\n5. 연습문제 3개' },
    { id: 44, topic: 'accounting-changes', question: '오류수정의 회계처리를 설명하시오.', answer: '중요한 오류는 소급수정, 전기이월이익잉여금 조정', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 오류수정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오류의 종류\n2. 중요한 오류 처리\n3. 소급수정 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 45, topic: 'accounting-changes', question: '내용연수 변경의 회계처리를 설명하시오.', answer: '회계추정 변경으로 변경시점부터 적용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 내용연수 변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변경 사유\n2. 전진적용 방법\n3. 감가상각비 재계산\n4. 분개 예시\n5. 연습문제 3개' },

    // 기타 재무회계 (46-50)
    { id: 46, topic: 'other-accounting', question: '외화거래의 회계처리(환율 적용)를 설명하시오.', answer: '거래시 당일환율, 결산시 마감환율 적용', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 외화거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래시 환율적용\n2. 결산시 평가\n3. 외환차손익\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 47, topic: 'other-accounting', question: '유가증권의 종류와 분류기준을 설명하시오.', answer: '단기매매, 만기보유, 매도가능, 관계회사투자', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 유가증권 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기매매증권\n2. 만기보유증권\n3. 매도가능증권\n4. 평가방법 차이\n5. 연습문제 3개' },
    { id: 48, topic: 'other-accounting', question: '리스거래(운용리스, 금융리스)의 회계처리를 설명하시오.', answer: '운용리스: 임차료 비용, 금융리스: 자산부채 인식', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 리스거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운용리스 정의\n2. 금융리스 정의\n3. 분류 기준\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'other-accounting', question: '건설중인자산의 회계처리를 설명하시오.', answer: '완성전 투입원가 집계, 완공시 해당자산 대체', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 건설중인자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건설중인자산 정의\n2. 원가 집계\n3. 완공시 대체\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'other-accounting', question: '파생상품(선물, 옵션)의 기본개념을 설명하시오.', answer: '기초자산 가격변동에 따라 가치 결정', prompt: '전산세무 2급 재무회계 문제입니다.\n\n문제: 파생상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파생상품 정의\n2. 선물의 개념\n3. 옵션의 개념\n4. 회계처리 기본\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'financial-statements', name: '재무제표 이해', icon: '📊', count: 5 },
    { id: 'current-assets', name: '유동자산', icon: '💵', count: 5 },
    { id: 'non-current-assets', name: '비유동자산', icon: '🏭', count: 5 },
    { id: 'liabilities', name: '부채', icon: '📋', count: 5 },
    { id: 'equity', name: '자본', icon: '💰', count: 5 },
    { id: 'revenue-recognition', name: '수익인식', icon: '📈', count: 5 },
    { id: 'expense-recognition', name: '비용인식', icon: '📉', count: 5 },
    { id: 'closing-adjustment', name: '결산조정', icon: '🔧', count: 5 },
    { id: 'accounting-changes', name: '회계변경', icon: '🔄', count: 5 },
    { id: 'other-accounting', name: '기타 재무회계', icon: '📚', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-500 hover:text-gray-700">전산세무 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">재무회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">재무회계</h1>
              <p className="text-amber-100">전산세무 2급 필기 | 50문항 학습</p>
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
                    ? 'bg-amber-100 border-2 border-amber-300'
                    : 'bg-white border border-gray-200 hover:border-amber-200'
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
                <div className="bg-amber-50 px-4 py-3 border-b flex items-center justify-between">
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
                              ? 'bg-amber-500 border-amber-500 text-white'
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
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/computerized-tax-2" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 전산세무 2급 홈
          </Link>
          <Link href="/category/accounting/computerized-tax-2/study/cost-accounting" className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
            원가회계 →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 2급 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
