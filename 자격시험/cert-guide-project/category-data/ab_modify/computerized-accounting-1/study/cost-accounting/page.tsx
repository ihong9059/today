'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CostAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cost-concept']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-accounting-1-cost-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-accounting-1-cost-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 원가개념 (1-10)
    { id: 1, topic: 'cost-concept', question: '원가의 정의와 비용의 차이점을 설명하시오.', answer: '원가: 제조활동 관련, 비용: 판매/관리활동 관련', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 원가의 정의와 비용의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가의 정의\n2. 비용의 정의\n3. 원가와 비용의 차이점\n4. 구체적인 예시\n5. 연습문제 3개' },
    { id: 2, topic: 'cost-concept', question: '제조원가와 비제조원가의 분류를 설명하시오.', answer: '제조원가: 재료비/노무비/경비, 비제조원가: 판관비', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조원가와 비제조원가의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가의 3요소\n2. 비제조원가의 종류\n3. 분류 기준과 예시\n4. 실무 적용 사례\n5. 연습문제 3개' },
    { id: 3, topic: 'cost-concept', question: '직접비와 간접비의 분류 기준을 설명하시오.', answer: '직접비: 제품에 직접 추적 가능, 간접비: 배부 필요', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 직접비와 간접비의 분류 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접비의 정의와 예시\n2. 간접비의 정의와 예시\n3. 분류 기준\n4. 원가계산에서의 중요성\n5. 연습문제 3개' },
    { id: 4, topic: 'cost-concept', question: '고정비와 변동비의 특성을 설명하시오.', answer: '고정비: 조업도 무관, 변동비: 조업도에 비례', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 고정비와 변동비의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정비의 정의와 예시\n2. 변동비의 정의와 예시\n3. 조업도와의 관계\n4. 원가행태 분석\n5. 연습문제 3개' },
    { id: 5, topic: 'cost-concept', question: '제조원가의 흐름(원재료-재공품-제품)을 설명하시오.', answer: '원재료 투입 -> 재공품 가공 -> 제품 완성', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조원가의 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원재료 계정의 흐름\n2. 재공품 계정의 흐름\n3. 제품 계정의 흐름\n4. T계정 예시\n5. 연습문제 3개' },
    { id: 6, topic: 'cost-concept', question: '제조원가명세서의 구조를 설명하시오.', answer: '당기총제조비용 + 기초재공품 - 기말재공품 = 당기제품제조원가', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조원가명세서의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가명세서의 목적\n2. 구성 항목\n3. 계산 과정\n4. 작성 예시\n5. 연습문제 3개' },
    { id: 7, topic: 'cost-concept', question: '매출원가의 계산 방법을 설명하시오.', answer: '기초제품 + 당기제품제조원가 - 기말제품 = 매출원가', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 매출원가의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출원가 공식\n2. 제조원가와의 관계\n3. 손익계산서와의 연결\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 8, topic: 'cost-concept', question: '기회원가와 매몰원가의 개념을 설명하시오.', answer: '기회원가: 포기한 대안의 가치, 매몰원가: 이미 발생한 원가', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 기회원가와 매몰원가의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기회원가의 정의와 예시\n2. 매몰원가의 정의와 예시\n3. 의사결정에서의 활용\n4. 관련원가와 비관련원가\n5. 연습문제 3개' },
    { id: 9, topic: 'cost-concept', question: '제조간접비의 구성요소를 설명하시오.', answer: '간접재료비, 간접노무비, 간접경비로 구성', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간접재료비의 예시\n2. 간접노무비의 예시\n3. 간접경비의 예시\n4. 직접비와의 구분\n5. 연습문제 3개' },
    { id: 10, topic: 'cost-concept', question: '원가계산의 목적과 종류를 설명하시오.', answer: '재무보고/가격결정/원가통제/성과평가 목적', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 원가계산의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가계산의 목적\n2. 원가계산의 종류\n3. 실제원가 vs 표준원가\n4. 전부원가 vs 변동원가\n5. 연습문제 3개' },

    // 재료비계산 (11-20)
    { id: 11, topic: 'material-cost', question: '재료비의 구성요소와 분류를 설명하시오.', answer: '직접재료비(주재료) + 간접재료비(부재료/소모품)', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 재료비의 구성요소와 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접재료비의 정의\n2. 간접재료비의 정의\n3. 재료비 분류 기준\n4. 실무 적용 예시\n5. 연습문제 3개' },
    { id: 12, topic: 'material-cost', question: '선입선출법(FIFO)으로 재료비를 계산하시오.', answer: '먼저 구입한 재료를 먼저 출고하는 방법', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 선입선출법(FIFO)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법의 정의\n2. 계산 방법\n3. 장단점\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 13, topic: 'material-cost', question: '총평균법으로 재료비를 계산하시오.', answer: '총매입액을 총수량으로 나눈 평균단가 적용', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 총평균법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총평균법의 정의\n2. 평균단가 계산법\n3. 장단점\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'material-cost', question: '이동평균법으로 재료비를 계산하시오.', answer: '매 입고시마다 새로운 평균단가 산출', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 이동평균법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이동평균법의 정의\n2. 매 입고시 단가 계산\n3. 총평균법과의 차이\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'material-cost', question: '후입선출법(LIFO)으로 재료비를 계산하시오.', answer: '나중에 구입한 재료를 먼저 출고하는 방법', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 후입선출법(LIFO)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 후입선출법의 정의\n2. 계산 방법\n3. K-IFRS에서의 금지 이유\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 16, topic: 'material-cost', question: '재료수불부의 작성 방법을 설명하시오.', answer: '입고/출고/잔고를 기록하는 보조부', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 재료수불부의 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재료수불부의 목적\n2. 기록 항목\n3. 작성 양식\n4. 작성 예시\n5. 연습문제 3개' },
    { id: 17, topic: 'material-cost', question: '재료 구입원가의 결정 방법을 설명하시오.', answer: '매입가격 + 부대비용(운반비, 하역비 등)', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 재료 구입원가의 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입가격의 구성\n2. 부대비용의 종류\n3. 매입할인/반품의 처리\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 18, topic: 'material-cost', question: '재료 감모손실의 회계처리를 설명하시오.', answer: '정상감모: 제조간접비, 비정상감모: 영업외비용', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 재료 감모손실의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상감모의 정의와 처리\n2. 비정상감모의 정의와 처리\n3. 분개 예시\n4. 재고조사와의 관계\n5. 연습문제 3개' },
    { id: 19, topic: 'material-cost', question: '재료 평가손실의 회계처리를 설명하시오.', answer: '저가법 적용시 평가손실 인식', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 재료 평가손실의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저가법의 정의\n2. 평가손실 계산\n3. 분개 예시\n4. 매출원가 vs 영업외비용 처리\n5. 연습문제 3개' },
    { id: 20, topic: 'material-cost', question: '각 재료비 계산방법의 비교를 설명하시오.', answer: '인플레이션 시: FIFO 이익 최대, LIFO 이익 최소', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 각 재료비 계산방법의 비교를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FIFO의 특징\n2. 평균법의 특징\n3. LIFO의 특징\n4. 물가변동에 따른 효과\n5. 연습문제 3개' },

    // 노무비경비 (21-30)
    { id: 21, topic: 'labor-expense', question: '직접노무비와 간접노무비의 구분을 설명하시오.', answer: '직접노무비: 제품에 직접 추적, 간접노무비: 배부 필요', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 직접노무비와 간접노무비의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접노무비의 정의와 예시\n2. 간접노무비의 정의와 예시\n3. 구분 기준\n4. 원가계산에서의 처리\n5. 연습문제 3개' },
    { id: 22, topic: 'labor-expense', question: '노무비의 구성요소를 설명하시오.', answer: '기본급 + 각종수당 + 상여금 + 퇴직급여', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 노무비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본급\n2. 각종수당(야근, 특근 등)\n3. 상여금\n4. 퇴직급여와 4대보험\n5. 연습문제 3개' },
    { id: 23, topic: 'labor-expense', question: '노무비 계산의 기본 공식을 설명하시오.', answer: '노무비 = 임률 x 작업시간', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 노무비 계산의 기본 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임률의 계산\n2. 작업시간의 측정\n3. 노무비 계산 예시\n4. 유휴시간의 처리\n5. 연습문제 3개' },
    { id: 24, topic: 'labor-expense', question: '경비의 분류와 종류를 설명하시오.', answer: '재료비/노무비 외의 제조원가 요소', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 경비의 분류와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경비의 정의\n2. 직접경비의 예시\n3. 간접경비의 예시\n4. 주요 경비 항목\n5. 연습문제 3개' },
    { id: 25, topic: 'labor-expense', question: '감가상각비의 원가계산 처리를 설명하시오.', answer: '제조설비: 제조간접비, 판매/관리설비: 판관비', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 감가상각비의 원가계산 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조용 자산의 감가상각\n2. 판매/관리용 자산의 감가상각\n3. 감가상각 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 26, topic: 'labor-expense', question: '외주가공비의 처리 방법을 설명하시오.', answer: '직접경비 또는 제조간접비로 처리', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 외주가공비의 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외주가공비의 정의\n2. 직접경비 처리 조건\n3. 간접경비 처리 조건\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 27, topic: 'labor-expense', question: '전력비/수도광열비의 원가 배분을 설명하시오.', answer: '사용량 또는 면적 기준으로 부문별 배분', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 전력비/수도광열비의 원가 배분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배분 기준 선정\n2. 제조부문 vs 판매/관리부문\n3. 배분 계산 방법\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 28, topic: 'labor-expense', question: '보험료와 임차료의 원가 처리를 설명하시오.', answer: '용도에 따라 제조원가 또는 판관비로 구분', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 보험료와 임차료의 원가 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조관련 보험료/임차료\n2. 판매/관리 관련 처리\n3. 선급비용과의 관계\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 29, topic: 'labor-expense', question: '유휴시간과 작업준비시간의 처리를 설명하시오.', answer: '유휴시간: 간접노무비, 작업준비시간: 직접/간접 구분', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 유휴시간과 작업준비시간의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유휴시간의 정의와 처리\n2. 작업준비시간의 정의\n3. 정상 vs 비정상 유휴시간\n4. 원가계산에서의 처리\n5. 연습문제 3개' },
    { id: 30, topic: 'labor-expense', question: '복리후생비의 원가 처리를 설명하시오.', answer: '제조부문: 제조간접비, 판매/관리부문: 판관비', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 복리후생비의 원가 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복리후생비의 종류\n2. 부문별 구분 기준\n3. 제조간접비 처리\n4. 분개 예시\n5. 연습문제 3개' },

    // 제조간접비배부 (31-40)
    { id: 31, topic: 'overhead-allocation', question: '제조간접비 배부의 필요성을 설명하시오.', answer: '간접비를 제품에 합리적으로 배분하기 위함', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비 배부의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조간접비의 특성\n2. 배부가 필요한 이유\n3. 배부기준 선정의 중요성\n4. 실무 적용 예시\n5. 연습문제 3개' },
    { id: 32, topic: 'overhead-allocation', question: '제조간접비 배부기준의 종류를 설명하시오.', answer: '직접노무시간, 기계시간, 직접재료비, 직접노무비 등', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비 배부기준의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접노무시간 기준\n2. 기계시간 기준\n3. 직접재료비/노무비 기준\n4. 기준 선택 방법\n5. 연습문제 3개' },
    { id: 33, topic: 'overhead-allocation', question: '제조간접비 배부율의 계산 방법을 설명하시오.', answer: '배부율 = 제조간접비 / 배부기준 총량', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비 배부율의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배부율 계산 공식\n2. 실제배부율 vs 예정배부율\n3. 계산 예시\n4. 제품별 배부액 계산\n5. 연습문제 3개' },
    { id: 34, topic: 'overhead-allocation', question: '예정배부율을 사용하는 이유를 설명하시오.', answer: '원가계산의 신속성, 계절적 변동 제거', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 예정배부율을 사용하는 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실제배부율의 문제점\n2. 예정배부율의 장점\n3. 예정배부율 계산\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'overhead-allocation', question: '제조간접비 배부차이의 발생 원인을 설명하시오.', answer: '예산차이(지출차이) + 조업도차이', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비 배부차이의 발생 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배부차이의 정의\n2. 예산차이(지출차이)\n3. 조업도차이\n4. 차이 분석 예시\n5. 연습문제 3개' },
    { id: 36, topic: 'overhead-allocation', question: '제조간접비 과대/과소배부의 처리 방법을 설명하시오.', answer: '매출원가 조정법, 비례배분법', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 제조간접비 과대/과소배부의 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과대배부와 과소배부의 정의\n2. 매출원가 조정법\n3. 비례배분법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 37, topic: 'overhead-allocation', question: '부문별 원가계산의 개념을 설명하시오.', answer: '보조부문 원가를 제조부문에 배부', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 부문별 원가계산의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가부문의 정의\n2. 제조부문과 보조부문\n3. 부문별 원가계산의 절차\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'overhead-allocation', question: '직접배부법으로 보조부문비를 배부하시오.', answer: '보조부문 상호간 용역수수 무시, 제조부문에만 배부', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 직접배부법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접배부법의 정의\n2. 배부 절차\n3. 장단점\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 39, topic: 'overhead-allocation', question: '단계배부법으로 보조부문비를 배부하시오.', answer: '보조부문간 일방향 배부 후 제조부문에 배부', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 단계배부법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단계배부법의 정의\n2. 배부 순서 결정\n3. 직접배부법과의 차이\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 40, topic: 'overhead-allocation', question: '상호배부법으로 보조부문비를 배부하시오.', answer: '보조부문 상호간 용역수수를 모두 고려하여 배부', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 상호배부법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상호배부법의 정의\n2. 연립방정식 이용\n3. 다른 방법과의 비교\n4. 계산 예시\n5. 연습문제 3개' },

    // 원가계산방법 (41-50)
    { id: 41, topic: 'cost-calculation', question: '개별원가계산의 개념과 적용을 설명하시오.', answer: '주문별로 원가 집계, 조선/건설업 등에 적용', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 개별원가계산의 개념과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산의 정의\n2. 적용 업종\n3. 작업원가표 작성\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 42, topic: 'cost-calculation', question: '종합원가계산의 개념과 적용을 설명하시오.', answer: '공정별로 원가 집계, 대량생산 업종에 적용', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 종합원가계산의 개념과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합원가계산의 정의\n2. 적용 업종\n3. 원가계산 절차\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'cost-calculation', question: '완성품환산량의 개념과 계산을 설명하시오.', answer: '재공품을 완성품 기준으로 환산한 수량', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 완성품환산량의 개념과 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완성품환산량의 정의\n2. 계산 공식\n3. 가공진척도 적용\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 44, topic: 'cost-calculation', question: '평균법에 의한 종합원가계산을 설명하시오.', answer: '기초재공품과 당기투입을 평균하여 단위원가 계산', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 평균법에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평균법의 정의\n2. 완성품환산량 계산\n3. 단위원가 계산\n4. 원가배분 예시\n5. 연습문제 3개' },
    { id: 45, topic: 'cost-calculation', question: '선입선출법에 의한 종합원가계산을 설명하시오.', answer: '기초재공품을 먼저 완성시키는 것으로 가정', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 선입선출법에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법의 정의\n2. 완성품환산량 계산\n3. 평균법과의 차이\n4. 원가배분 예시\n5. 연습문제 3개' },
    { id: 46, topic: 'cost-calculation', question: '공손의 종류와 회계처리를 설명하시오.', answer: '정상공손: 완성품 원가에 포함, 비정상공손: 기간비용', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 공손의 종류와 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상공손의 정의와 처리\n2. 비정상공손의 정의와 처리\n3. 공손 발생시점\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 47, topic: 'cost-calculation', question: '작업폐물과 부산물의 회계처리를 설명하시오.', answer: '판매가치에 따라 매출 또는 원가차감 처리', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 작업폐물과 부산물의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업폐물의 정의와 처리\n2. 부산물의 정의와 처리\n3. 평가방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 48, topic: 'cost-calculation', question: '결합원가의 배분 방법을 설명하시오.', answer: '판매가치법, 물량기준법 등으로 배분', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 결합원가의 배분 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결합원가의 정의\n2. 판매가치법\n3. 물량기준법\n4. 배분 계산 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'cost-calculation', question: '공정별 원가계산의 절차를 설명하시오.', answer: '전공정 원가를 후공정에 대체하여 누적 계산', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 공정별 원가계산의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정별 원가계산의 정의\n2. 전공정 원가의 대체\n3. 각 공정별 원가계산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'cost-calculation', question: '표준원가계산의 개념을 설명하시오.', answer: '사전에 설정한 표준원가로 원가계산 수행', prompt: '전산회계 1급 원가회계 문제입니다.\n\n문제: 표준원가계산의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가의 정의\n2. 표준원가의 설정\n3. 차이분석\n4. 실무 적용 예시\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'cost-concept', name: '원가개념', icon: '📊', count: 10 },
    { id: 'material-cost', name: '재료비계산', icon: '🧱', count: 10 },
    { id: 'labor-expense', name: '노무비경비', icon: '👷', count: 10 },
    { id: 'overhead-allocation', name: '제조간접비배부', icon: '🏭', count: 10 },
    { id: 'cost-calculation', name: '원가계산방법', icon: '🧮', count: 10 },
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
            <Link href="/category/accounting/computerized-accounting-1" className="text-gray-500 hover:text-gray-700">전산회계 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">학습</span>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">원가회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🏭</div>
            <div>
              <h1 className="text-2xl font-bold">원가회계</h1>
              <p className="text-purple-100">필기시험 10문항 | 원가개념, 재료비, 노무비, 간접비배부, 원가계산</p>
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
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-white border border-gray-200 hover:border-purple-200'
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
                              ? 'bg-purple-500 border-purple-500 text-white'
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
                              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0"
                            >
                              🤖 AI
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
          <Link href="/category/accounting/computerized-accounting-1/study/accounting-principle" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 회계원리
          </Link>
          <Link href="/category/accounting/computerized-accounting-1/study/tax-accounting" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            세무회계 →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산회계 1급 원가회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
