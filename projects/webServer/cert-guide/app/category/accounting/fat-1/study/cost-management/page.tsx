'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CostManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cost-concept']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fat-1-cost-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('fat-1-cost-management-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 원가개념 (1-5)
    { id: 1, topic: 'cost-concept', question: '원가의 정의와 비용과의 차이점을 설명하시오.', answer: '원가: 제조활동 관련 지출, 비용: 수익 창출을 위한 소멸된 원가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 원가의 정의와 비용과의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가의 정의\n2. 비용의 정의\n3. 원가와 비용의 차이점\n4. 구체적인 예시\n5. 연습문제 3개' },
    { id: 2, topic: 'cost-concept', question: '제조원가의 3요소(재료비, 노무비, 경비)를 설명하시오.', answer: '재료비: 원재료비용, 노무비: 인건비, 경비: 그 외 제조비용', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조원가의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재료비의 정의와 분류\n2. 노무비의 정의와 분류\n3. 경비의 정의와 분류\n4. 3요소간 관계\n5. 연습문제 3개' },
    { id: 3, topic: 'cost-concept', question: '직접비와 간접비의 분류 기준을 설명하시오.', answer: '직접비: 제품에 직접 추적 가능, 간접비: 배부 과정 필요', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 직접비와 간접비의 분류 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접비의 정의와 예시\n2. 간접비의 정의와 예시\n3. 분류 기준\n4. 원가계산에서의 처리 방법\n5. 연습문제 3개' },
    { id: 4, topic: 'cost-concept', question: '고정비와 변동비의 원가행태를 설명하시오.', answer: '고정비: 조업도 무관 일정, 변동비: 조업도에 비례 변동', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 고정비와 변동비의 원가행태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정비의 정의와 예시\n2. 변동비의 정의와 예시\n3. 준변동비와 준고정비\n4. 원가행태 그래프\n5. 연습문제 3개' },
    { id: 5, topic: 'cost-concept', question: '제조원가와 비제조원가의 구분을 설명하시오.', answer: '제조원가: 제품 생산 관련, 비제조원가: 판매비와관리비', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조원가와 비제조원가의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가의 범위\n2. 비제조원가의 종류\n3. 구분 기준\n4. 재무제표에서의 표시\n5. 연습문제 3개' },

    // 원가흐름 (6-10)
    { id: 6, topic: 'cost-flow', question: '원가의 흐름(원재료-재공품-제품)을 설명하시오.', answer: '원재료 투입 -> 재공품 가공 -> 제품 완성 -> 매출원가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 원가의 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원재료 계정의 흐름\n2. 재공품 계정의 흐름\n3. 제품 계정의 흐름\n4. T계정 예시\n5. 연습문제 3개' },
    { id: 7, topic: 'cost-flow', question: '제조원가명세서의 구조와 작성 방법을 설명하시오.', answer: '당기총제조비용 + 기초재공품 - 기말재공품 = 당기제품제조원가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조원가명세서의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가명세서의 목적\n2. 구성 항목\n3. 계산 과정\n4. 작성 예시\n5. 연습문제 3개' },
    { id: 8, topic: 'cost-flow', question: '매출원가의 계산 공식을 설명하시오.', answer: '기초제품 + 당기제품제조원가 - 기말제품 = 매출원가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 매출원가의 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출원가 공식\n2. 제조원가와의 관계\n3. 손익계산서와의 연결\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 9, topic: 'cost-flow', question: '재공품 계정의 차변과 대변 구성을 설명하시오.', answer: '차변: 직접재료비+직접노무비+제조간접비, 대변: 제품으로 대체', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 재공품 계정의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차변 구성 요소\n2. 대변 구성 요소\n3. 기초/기말재공품\n4. T계정 작성 예시\n5. 연습문제 3개' },
    { id: 10, topic: 'cost-flow', question: '제품원가와 기간원가의 차이를 설명하시오.', answer: '제품원가: 재고자산화, 기간원가: 발생시 즉시 비용화', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제품원가와 기간원가의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제품원가의 정의\n2. 기간원가의 정의\n3. 재고자산과의 관계\n4. 손익계산서에서의 처리\n5. 연습문제 3개' },

    // 재료비 (11-15)
    { id: 11, topic: 'material-cost', question: '재료비의 분류(직접재료비, 간접재료비)를 설명하시오.', answer: '직접재료비: 주재료, 간접재료비: 부재료/소모품', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 재료비의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접재료비의 정의와 예시\n2. 간접재료비의 정의와 예시\n3. 분류 기준\n4. 원가계산에서의 처리\n5. 연습문제 3개' },
    { id: 12, topic: 'material-cost', question: '선입선출법(FIFO)의 계산 방법을 설명하시오.', answer: '먼저 입고된 재료를 먼저 출고하는 방법', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 선입선출법(FIFO)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법의 정의\n2. 계산 방법\n3. 장단점\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 13, topic: 'material-cost', question: '이동평균법의 계산 방법을 설명하시오.', answer: '매 입고시마다 새로운 평균단가를 계산', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 이동평균법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이동평균법의 정의\n2. 평균단가 계산법\n3. 총평균법과의 차이\n4. 수치 계산 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'material-cost', question: '재료 구입원가의 결정 방법을 설명하시오.', answer: '매입가격 + 부대비용(운반비, 하역비 등)', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 재료 구입원가의 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입가격의 구성\n2. 부대비용의 종류\n3. 매입할인/환출의 처리\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'material-cost', question: '재료 감모손실의 회계처리를 설명하시오.', answer: '정상감모: 제조간접비, 비정상감모: 영업외비용', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 재료 감모손실의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상감모의 정의와 처리\n2. 비정상감모의 정의와 처리\n3. 분개 예시\n4. 재고조사와의 관계\n5. 연습문제 3개' },

    // 노무비 (16-20)
    { id: 16, topic: 'labor-cost', question: '직접노무비와 간접노무비의 구분을 설명하시오.', answer: '직접노무비: 제품 생산 직접 종사, 간접노무비: 간접 지원', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 직접노무비와 간접노무비의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접노무비의 정의와 예시\n2. 간접노무비의 정의와 예시\n3. 구분 기준\n4. 원가계산에서의 처리\n5. 연습문제 3개' },
    { id: 17, topic: 'labor-cost', question: '노무비의 구성요소를 설명하시오.', answer: '기본급 + 각종수당 + 상여금 + 퇴직급여', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 노무비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본급\n2. 각종수당(야근, 특근 등)\n3. 상여금\n4. 퇴직급여와 4대보험\n5. 연습문제 3개' },
    { id: 18, topic: 'labor-cost', question: '노무비 계산 공식(임률 x 작업시간)을 설명하시오.', answer: '노무비 = 시간당 임률 x 실제 작업시간', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 노무비 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임률의 계산 방법\n2. 작업시간의 측정\n3. 노무비 계산 예시\n4. 유휴시간의 처리\n5. 연습문제 3개' },
    { id: 19, topic: 'labor-cost', question: '유휴시간과 작업준비시간의 처리를 설명하시오.', answer: '유휴시간: 간접노무비, 작업준비시간: 직접/간접 구분', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 유휴시간과 작업준비시간의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유휴시간의 정의와 처리\n2. 작업준비시간의 정의\n3. 정상 vs 비정상 유휴시간\n4. 원가계산에서의 처리\n5. 연습문제 3개' },
    { id: 20, topic: 'labor-cost', question: '노무비의 회계처리(미지급금, 예수금)를 설명하시오.', answer: '총급여에서 4대보험/세금 예수 후 순지급액 계산', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 노무비의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 급여 지급시 분개\n2. 4대보험 예수금 처리\n3. 소득세 원천징수\n4. 분개 예시\n5. 연습문제 3개' },

    // 제조경비 (21-25)
    { id: 21, topic: 'manufacturing-expense', question: '제조경비의 종류와 분류를 설명하시오.', answer: '감가상각비, 수선비, 보험료, 임차료, 전력비 등', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조경비의 종류와 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조경비의 정의\n2. 주요 경비 항목\n3. 직접경비와 간접경비\n4. 판관비와의 구분\n5. 연습문제 3개' },
    { id: 22, topic: 'manufacturing-expense', question: '감가상각비의 원가계산 처리를 설명하시오.', answer: '제조설비: 제조간접비, 판매/관리설비: 판관비', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 감가상각비의 원가계산 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조용 자산의 감가상각\n2. 판매/관리용 자산의 감가상각\n3. 감가상각 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 23, topic: 'manufacturing-expense', question: '외주가공비의 처리 방법을 설명하시오.', answer: '직접경비 또는 제조간접비로 처리', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 외주가공비의 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외주가공비의 정의\n2. 직접경비 처리 조건\n3. 간접경비 처리 조건\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 24, topic: 'manufacturing-expense', question: '전력비/수도광열비의 원가 배분을 설명하시오.', answer: '사용량 또는 면적 기준으로 부문별 배분', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 전력비/수도광열비의 원가 배분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배분 기준 선정\n2. 제조부문 vs 판매/관리부문\n3. 배분 계산 방법\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 25, topic: 'manufacturing-expense', question: '보험료와 임차료의 원가 처리를 설명하시오.', answer: '용도에 따라 제조원가 또는 판관비로 구분', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 보험료와 임차료의 원가 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조관련 보험료/임차료\n2. 판매/관리 관련 처리\n3. 선급비용과의 관계\n4. 분개 예시\n5. 연습문제 3개' },

    // 개별원가계산 (26-30)
    { id: 26, topic: 'job-order-costing', question: '개별원가계산의 개념과 적용 업종을 설명하시오.', answer: '주문별로 원가 집계, 조선/건설/인쇄업 등 적용', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 개별원가계산의 개념과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산의 정의\n2. 적용 업종\n3. 종합원가계산과의 차이\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 27, topic: 'job-order-costing', question: '작업원가표(Job Cost Sheet)의 작성 방법을 설명하시오.', answer: '작업별로 직접재료비+직접노무비+제조간접비 집계', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 작업원가표의 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업원가표의 구성\n2. 직접재료비 기록\n3. 직접노무비 기록\n4. 제조간접비 배부 기록\n5. 연습문제 3개' },
    { id: 28, topic: 'job-order-costing', question: '제조간접비 배부율의 계산 방법을 설명하시오.', answer: '배부율 = 제조간접비 / 배부기준 총량', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 배부율의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배부율 계산 공식\n2. 배부기준의 종류\n3. 계산 예시\n4. 제품별 배부액 계산\n5. 연습문제 3개' },
    { id: 29, topic: 'job-order-costing', question: '예정배부율과 실제배부율의 차이를 설명하시오.', answer: '예정배부율: 사전 설정, 실제배부율: 사후 계산', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 예정배부율과 실제배부율의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예정배부율의 정의\n2. 실제배부율의 정의\n3. 예정배부율 사용 이유\n4. 배부차이 처리\n5. 연습문제 3개' },
    { id: 30, topic: 'job-order-costing', question: '제조간접비 과대/과소배부의 처리를 설명하시오.', answer: '매출원가 조정법 또는 비례배분법으로 처리', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 과대/과소배부의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과대배부와 과소배부의 정의\n2. 매출원가 조정법\n3. 비례배분법\n4. 분개 예시\n5. 연습문제 3개' },

    // 종합원가계산 (31-35)
    { id: 31, topic: 'process-costing', question: '종합원가계산의 개념과 적용 업종을 설명하시오.', answer: '공정별 대량생산, 석유/화학/제약업 등 적용', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 종합원가계산의 개념과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합원가계산의 정의\n2. 적용 업종\n3. 개별원가계산과의 차이\n4. 계산 절차\n5. 연습문제 3개' },
    { id: 32, topic: 'process-costing', question: '완성품환산량의 개념과 계산 방법을 설명하시오.', answer: '재공품을 완성품 기준으로 환산한 수량', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 완성품환산량의 개념과 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완성품환산량의 정의\n2. 가공진척도 적용\n3. 직접재료비 vs 가공비\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 33, topic: 'process-costing', question: '평균법에 의한 종합원가계산을 설명하시오.', answer: '기초재공품과 당기투입을 평균하여 단위원가 계산', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 평균법에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평균법의 정의\n2. 완성품환산량 계산\n3. 단위원가 계산\n4. 원가배분 예시\n5. 연습문제 3개' },
    { id: 34, topic: 'process-costing', question: '선입선출법에 의한 종합원가계산을 설명하시오.', answer: '기초재공품을 먼저 완성시키는 것으로 가정', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 선입선출법에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법의 정의\n2. 완성품환산량 계산\n3. 평균법과의 차이\n4. 원가배분 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'process-costing', question: '공손의 종류와 회계처리를 설명하시오.', answer: '정상공손: 완성품 원가에 포함, 비정상공손: 기간비용', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 공손의 종류와 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상공손의 정의와 처리\n2. 비정상공손의 정의와 처리\n3. 공손 발생시점\n4. 계산 예시\n5. 연습문제 3개' },

    // 표준원가 (36-40)
    { id: 36, topic: 'standard-costing', question: '표준원가계산의 개념과 목적을 설명하시오.', answer: '사전에 설정한 표준원가로 원가통제 및 성과평가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 표준원가계산의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가의 정의\n2. 표준원가 설정 방법\n3. 원가통제 목적\n4. 성과평가 활용\n5. 연습문제 3개' },
    { id: 37, topic: 'standard-costing', question: '표준원가의 종류(이상표준, 정상표준 등)를 설명하시오.', answer: '이상표준: 최적조건, 정상표준: 현실적 목표', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 표준원가의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이상표준원가\n2. 정상표준원가\n3. 현재표준원가\n4. 기본표준원가\n5. 연습문제 3개' },
    { id: 38, topic: 'standard-costing', question: '직접재료비 차이분석(가격차이, 수량차이)을 설명하시오.', answer: '가격차이: (실제가격-표준가격)x실제수량, 수량차이: (실제수량-표준수량)x표준가격', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 직접재료비 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가격차이의 계산\n2. 수량차이의 계산\n3. 유리/불리 차이 판단\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 39, topic: 'standard-costing', question: '직접노무비 차이분석(임률차이, 능률차이)을 설명하시오.', answer: '임률차이: (실제임률-표준임률)x실제시간, 능률차이: (실제시간-표준시간)x표준임률', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 직접노무비 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임률차이의 계산\n2. 능률차이의 계산\n3. 유리/불리 차이 판단\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 40, topic: 'standard-costing', question: '제조간접비 차이분석(예산차이, 조업도차이)을 설명하시오.', answer: '예산차이: 실제발생-변동예산, 조업도차이: 고정비 배부차이', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산차이(지출차이)의 계산\n2. 조업도차이의 계산\n3. 능률차이의 계산\n4. 계산 예시\n5. 연습문제 3개' },

    // CVP분석 (41-45)
    { id: 41, topic: 'cvp-analysis', question: 'CVP분석의 개념과 기본 가정을 설명하시오.', answer: '원가-조업도-이익의 관계 분석, 선형 관계 가정', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: CVP분석의 개념과 기본 가정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CVP분석의 정의\n2. 기본 가정\n3. 활용 분야\n4. 한계점\n5. 연습문제 3개' },
    { id: 42, topic: 'cvp-analysis', question: '손익분기점(BEP)의 계산 방법을 설명하시오.', answer: 'BEP = 고정비 / 공헌이익률 또는 고정비 / 단위당 공헌이익', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 손익분기점(BEP)의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익분기점의 정의\n2. 공헌이익 방식 계산\n3. 공헌이익률 방식 계산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'cvp-analysis', question: '공헌이익과 공헌이익률의 계산을 설명하시오.', answer: '공헌이익 = 매출액 - 변동비, 공헌이익률 = 공헌이익/매출액', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 공헌이익과 공헌이익률의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공헌이익의 정의\n2. 공헌이익률의 정의\n3. 의사결정에서의 활용\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 44, topic: 'cvp-analysis', question: '목표이익 달성을 위한 매출액 계산을 설명하시오.', answer: '필요매출액 = (고정비 + 목표이익) / 공헌이익률', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 목표이익 달성을 위한 매출액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목표이익의 설정\n2. 필요매출액 공식\n3. 필요판매량 공식\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 45, topic: 'cvp-analysis', question: '안전한계와 영업레버리지의 개념을 설명하시오.', answer: '안전한계: 현재매출-BEP매출, 영업레버리지: 공헌이익/영업이익', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 안전한계와 영업레버리지의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전한계의 정의와 계산\n2. 안전한계율의 의미\n3. 영업레버리지의 정의\n4. 경영분석에서의 활용\n5. 연습문제 3개' },

    // 예산관리 (46-50)
    { id: 46, topic: 'budgeting', question: '예산의 개념과 기능을 설명하시오.', answer: '예산: 계획의 수치적 표현, 기능: 계획/통제/조정/평가', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 예산의 개념과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산의 정의\n2. 예산의 기능\n3. 예산편성 과정\n4. 예산 종류\n5. 연습문제 3개' },
    { id: 47, topic: 'budgeting', question: '종합예산의 구성체계를 설명하시오.', answer: '영업예산(판매-생산-원가) + 재무예산(현금-재무제표)', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 종합예산의 구성체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합예산의 정의\n2. 영업예산의 구성\n3. 재무예산의 구성\n4. 예산편성 순서\n5. 연습문제 3개' },
    { id: 48, topic: 'budgeting', question: '고정예산과 변동예산의 차이를 설명하시오.', answer: '고정예산: 단일 조업도, 변동예산: 조업도별 예산', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 고정예산과 변동예산의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정예산의 정의\n2. 변동예산(신축성예산)의 정의\n3. 장단점 비교\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'budgeting', question: '현금예산의 작성 방법을 설명하시오.', answer: '현금수입 - 현금지출 = 현금과부족, 차입/상환 반영', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 현금예산의 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금예산의 목적\n2. 현금수입 예측\n3. 현금지출 예측\n4. 작성 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'budgeting', question: '예산차이분석의 방법을 설명하시오.', answer: '실제치와 예산치 비교, 유리/불리 차이 분석', prompt: 'FAT 1급 원가관리회계 문제입니다.\n\n문제: 예산차이분석의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산차이분석의 목적\n2. 유리차이와 불리차이\n3. 책임회계와의 관계\n4. 분석 예시\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'cost-concept', name: '원가개념', icon: '📊', count: 5 },
    { id: 'cost-flow', name: '원가흐름', icon: '🔄', count: 5 },
    { id: 'material-cost', name: '재료비', icon: '🧱', count: 5 },
    { id: 'labor-cost', name: '노무비', icon: '👷', count: 5 },
    { id: 'manufacturing-expense', name: '제조경비', icon: '⚙️', count: 5 },
    { id: 'job-order-costing', name: '개별원가계산', icon: '📋', count: 5 },
    { id: 'process-costing', name: '종합원가계산', icon: '🏭', count: 5 },
    { id: 'standard-costing', name: '표준원가', icon: '📐', count: 5 },
    { id: 'cvp-analysis', name: 'CVP분석', icon: '📈', count: 5 },
    { id: 'budgeting', name: '예산관리', icon: '💰', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-1" className="text-gray-500 hover:text-gray-700">FAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">원가관리회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🏭</div>
            <div>
              <h1 className="text-2xl font-bold">원가관리회계</h1>
              <p className="text-orange-100">이론시험 10문항 | 원가계산, CVP분석, 예산관리</p>
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
                    ? 'bg-orange-100 border-2 border-orange-300'
                    : 'bg-white border border-gray-200 hover:border-orange-200'
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
                <div className="bg-orange-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-orange-50/50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-orange-500 border-orange-500 text-white'
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
                              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/fat-1/study/financial-accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 재무회계
          </Link>
          <Link href="/category/accounting/fat-1/study/tax-accounting" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            세무회계 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. FAT 1급 원가관리회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
