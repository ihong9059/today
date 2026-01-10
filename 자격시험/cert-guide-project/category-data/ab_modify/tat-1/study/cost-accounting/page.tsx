'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CostAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cost-concept']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat1-cost-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tat1-cost-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 원가의 개념과 분류 (1-5)
    { id: 1, topic: 'cost-concept', question: '직접비와 간접비의 분류 기준과 예시를 설명하시오.', answer: '직접비: 추적 가능(직접재료비, 직접노무비), 간접비: 추적 불가(제조간접비)', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 직접비와 간접비의 분류 기준과 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 2, topic: 'cost-concept', question: '변동비와 고정비의 원가행태를 설명하시오.', answer: '변동비: 조업도 비례 변화, 고정비: 조업도와 무관하게 일정', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 변동비와 고정비의 원가행태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 3, topic: 'cost-concept', question: '제조원가의 3요소(재료비, 노무비, 경비)를 설명하시오.', answer: '재료비: 물품소비, 노무비: 인건비, 경비: 기타 제조비용', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제조원가의 3요소(재료비, 노무비, 경비)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 4, topic: 'cost-concept', question: '제품원가와 기간비용의 차이를 설명하시오.', answer: '제품원가: 재고자산화, 기간비용: 발생시 비용처리', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제품원가와 기간비용의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 5, topic: 'cost-concept', question: '준변동비와 준고정비(혼합원가)의 특성을 설명하시오.', answer: '준변동비: 고정+변동, 준고정비: 단계적 증가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 준변동비와 준고정비(혼합원가)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 원가 흐름 (6-10)
    { id: 6, topic: 'cost-flow', question: '원재료에서 재공품으로의 원가 흐름을 설명하시오.', answer: '원재료 투입 -> 직접재료비로 재공품 계정 대체', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 원재료에서 재공품으로의 원가 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 7, topic: 'cost-flow', question: '재공품에서 제품으로의 원가 대체를 설명하시오.', answer: '완성품 원가 = 기초재공품 + 당기투입 - 기말재공품', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 재공품에서 제품으로의 원가 대체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 8, topic: 'cost-flow', question: '제조원가명세서의 구조와 작성법을 설명하시오.', answer: '당기총제조비용 + 기초재공품 - 기말재공품 = 당기제품제조원가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제조원가명세서의 구조와 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 9, topic: 'cost-flow', question: '매출원가 계산 과정을 설명하시오.', answer: '기초제품 + 당기제품제조원가 - 기말제품 = 매출원가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 매출원가 계산 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 10, topic: 'cost-flow', question: '원가계정(T계정) 흐름도를 설명하시오.', answer: '원재료 -> 재공품 -> 제품 -> 매출원가 순으로 대체', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 원가계정(T계정) 흐름도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 개별원가계산 (11-15)
    { id: 11, topic: 'job-costing', question: '개별원가계산의 정의와 적용 업종을 설명하시오.', answer: '주문별 원가집계, 조선/건설/인쇄업 등 적용', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 개별원가계산의 정의와 적용 업종을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 12, topic: 'job-costing', question: '작업지시서(Job Order Sheet)의 기능을 설명하시오.', answer: '작업별 원가집계 문서, 직접비/간접비 기록', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 작업지시서(Job Order Sheet)의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 13, topic: 'job-costing', question: '제조간접비 배부율 계산방법을 설명하시오.', answer: '배부율 = 제조간접비 / 배부기준(직접노무시간, 기계시간 등)', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 배부율 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 14, topic: 'job-costing', question: '예정배부율과 실제배부율의 차이를 설명하시오.', answer: '예정: 사전설정, 실제: 기말산출, 배부차이 발생', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 예정배부율과 실제배부율의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 15, topic: 'job-costing', question: '제조간접비 배부차이의 처리방법을 설명하시오.', answer: '매출원가 조정법, 비례배분법', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 배부차이의 처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 종합원가계산 (16-20)
    { id: 16, topic: 'process-costing', question: '종합원가계산의 정의와 적용 업종을 설명하시오.', answer: '공정별 원가집계, 석유/화학/식품/제지업 등 적용', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 종합원가계산의 정의와 적용 업종을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 17, topic: 'process-costing', question: '완성품환산량(Equivalent Units)의 개념을 설명하시오.', answer: '재공품을 완성품 기준으로 환산한 수량', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 완성품환산량(Equivalent Units)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 18, topic: 'process-costing', question: '선입선출법(FIFO)에 의한 종합원가계산을 설명하시오.', answer: '기초재공품 원가 분리, 당기투입분만 계산', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 선입선출법(FIFO)에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 19, topic: 'process-costing', question: '평균법에 의한 종합원가계산을 설명하시오.', answer: '기초재공품 + 당기투입 합산 후 평균단가 산출', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 평균법에 의한 종합원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 20, topic: 'process-costing', question: '정상공손과 비정상공손의 회계처리를 설명하시오.', answer: '정상공손: 완성품원가 가산, 비정상공손: 기간비용 처리', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 정상공손과 비정상공손의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 활동기준원가계산 (21-25)
    { id: 21, topic: 'abc-costing', question: '활동기준원가계산(ABC)의 기본 개념을 설명하시오.', answer: '활동별 원가동인 파악, 제품에 인과관계 배부', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 활동기준원가계산(ABC)의 기본 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 22, topic: 'abc-costing', question: '원가동인(Cost Driver)의 종류를 설명하시오.', answer: '자원동인: 활동에 배부, 활동동인: 제품에 배부', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 원가동인(Cost Driver)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 23, topic: 'abc-costing', question: '전통적 원가계산과 ABC의 차이점을 설명하시오.', answer: '전통: 부문별 배부, ABC: 활동별 인과관계 배부', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 전통적 원가계산과 ABC의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 24, topic: 'abc-costing', question: '활동의 계층구조(단위/배치/제품/설비수준)를 설명하시오.', answer: '단위: 생산량비례, 배치: 작업단위, 제품: 품목별, 설비: 고정', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 활동의 계층구조(단위/배치/제품/설비수준)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 25, topic: 'abc-costing', question: 'ABC 도입의 장단점을 설명하시오.', answer: '장점: 정확한 원가배부, 단점: 구축비용/복잡성', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: ABC 도입의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 표준원가계산 (26-30)
    { id: 26, topic: 'standard-costing', question: '표준원가의 의의와 설정방법을 설명하시오.', answer: '사전 목표원가 설정, 이상적/현실적/정상적 표준', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 표준원가의 의의와 설정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 27, topic: 'standard-costing', question: '직접재료비 차이분석(가격차이, 수량차이)을 설명하시오.', answer: '가격차이=(실제가격-표준가격)x실제수량, 수량차이=(실제수량-표준수량)x표준가격', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 직접재료비 차이분석(가격차이, 수량차이)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 28, topic: 'standard-costing', question: '직접노무비 차이분석(임률차이, 능률차이)을 설명하시오.', answer: '임률차이=(실제임률-표준임률)x실제시간, 능률차이=(실제시간-표준시간)x표준임률', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 직접노무비 차이분석(임률차이, 능률차이)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 29, topic: 'standard-costing', question: '제조간접비 차이분석(2분법, 3분법)을 설명하시오.', answer: '2분법: 예산차이/조업도차이, 3분법: 지출/능률/조업도차이', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 제조간접비 차이분석(2분법, 3분법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 30, topic: 'standard-costing', question: '표준원가차이의 회계처리 방법을 설명하시오.', answer: '매출원가조정법, 비례배분법, 영업외손익처리법', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 표준원가차이의 회계처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // CVP 분석 (31-35)
    { id: 31, topic: 'cvp-analysis', question: '손익분기점(BEP)의 개념과 산출 공식을 설명하시오.', answer: 'BEP매출액 = 고정비 / 공헌이익률, BEP수량 = 고정비 / 단위공헌이익', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 손익분기점(BEP)의 개념과 산출 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 32, topic: 'cvp-analysis', question: '공헌이익과 공헌이익률의 계산을 설명하시오.', answer: '공헌이익 = 매출액 - 변동비, 공헌이익률 = 공헌이익 / 매출액', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 공헌이익과 공헌이익률의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 33, topic: 'cvp-analysis', question: '안전한계(Margin of Safety)를 설명하시오.', answer: '안전한계 = 실제매출 - BEP매출, 안전한계율 = 안전한계 / 실제매출', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 안전한계(Margin of Safety)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 34, topic: 'cvp-analysis', question: '목표이익 달성을 위한 매출액 계산을 설명하시오.', answer: '목표매출액 = (고정비 + 목표이익) / 공헌이익률', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 목표이익 달성을 위한 매출액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 35, topic: 'cvp-analysis', question: '영업레버리지도(DOL)의 개념을 설명하시오.', answer: 'DOL = 공헌이익 / 영업이익, 매출변화에 대한 이익민감도', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 영업레버리지도(DOL)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 예산관리 (36-40)
    { id: 36, topic: 'budget-management', question: '고정예산과 변동예산의 차이를 설명하시오.', answer: '고정예산: 단일조업도, 변동예산: 실제조업도 반영', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 고정예산과 변동예산의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 37, topic: 'budget-management', question: '탄력예산(유연예산)의 작성방법을 설명하시오.', answer: '변동예산액 = (단위변동비 x 실제조업도) + 고정비', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 탄력예산(유연예산)의 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 38, topic: 'budget-management', question: '종합예산의 구성과 편성절차를 설명하시오.', answer: '판매예산 -> 생산예산 -> 원가예산 -> 재무예산', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 종합예산의 구성과 편성절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 39, topic: 'budget-management', question: '예산차이분석(판매량차이, 예산차이)을 설명하시오.', answer: '총차이 = 판매량차이 + 예산차이', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 예산차이분석(판매량차이, 예산차이)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 40, topic: 'budget-management', question: '영기준예산(ZBB)의 개념을 설명하시오.', answer: '전년도 무시, 영(Zero)에서 출발하여 모든 항목 재검토', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 영기준예산(ZBB)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 책임회계 (41-45)
    { id: 41, topic: 'responsibility-accounting', question: '책임회계의 개념과 책임중심점을 설명하시오.', answer: '관리자 책임범위에 따른 성과평가 시스템', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 책임회계의 개념과 책임중심점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 42, topic: 'responsibility-accounting', question: '원가중심점의 특성과 평가방법을 설명하시오.', answer: '원가만 통제, 예산대비 원가절감으로 평가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 원가중심점의 특성과 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 43, topic: 'responsibility-accounting', question: '이익중심점의 특성과 평가방법을 설명하시오.', answer: '수익과 원가 통제, 이익으로 평가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 이익중심점의 특성과 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 44, topic: 'responsibility-accounting', question: '투자중심점의 특성과 평가방법을 설명하시오.', answer: '수익/원가/투자 통제, ROI/RI로 평가', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 투자중심점의 특성과 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 45, topic: 'responsibility-accounting', question: '대체가격(이전가격)의 결정방법을 설명하시오.', answer: '시장가격/원가기준/협상가격 방식', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 대체가격(이전가격)의 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },

    // 성과평가 (46-50)
    { id: 46, topic: 'performance-evaluation', question: '투자수익률(ROI)의 계산과 분석을 설명하시오.', answer: 'ROI = 이익/투자액 = 매출이익률 x 자산회전율', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 투자수익률(ROI)의 계산과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 47, topic: 'performance-evaluation', question: '잔여이익(RI)의 개념과 계산을 설명하시오.', answer: 'RI = 이익 - (투자액 x 최소요구수익률)', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 잔여이익(RI)의 개념과 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 48, topic: 'performance-evaluation', question: '경제적부가가치(EVA)의 개념을 설명하시오.', answer: 'EVA = 세후영업이익 - (투자자본 x WACC)', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 경제적부가가치(EVA)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 49, topic: 'performance-evaluation', question: 'ROI와 RI의 장단점 비교를 설명하시오.', answer: 'ROI: 비교용이/차선투자, RI: 목표일치/규모영향', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: ROI와 RI의 장단점 비교를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
    { id: 50, topic: 'performance-evaluation', question: '균형성과표(BSC)의 4가지 관점을 설명하시오.', answer: '재무/고객/내부프로세스/학습성장 관점', prompt: 'TAT 1급 원가관리회계 문제입니다.\n\n문제: 균형성과표(BSC)의 4가지 관점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 실무 적용\n5. 관련 문제' },
  ];

  const topics = [
    { id: 'cost-concept', name: '원가의 개념과 분류', icon: '📊', count: 5 },
    { id: 'cost-flow', name: '원가 흐름', icon: '🔄', count: 5 },
    { id: 'job-costing', name: '개별원가계산', icon: '📋', count: 5 },
    { id: 'process-costing', name: '종합원가계산', icon: '🏭', count: 5 },
    { id: 'abc-costing', name: '활동기준원가계산', icon: '🎯', count: 5 },
    { id: 'standard-costing', name: '표준원가계산', icon: '📐', count: 5 },
    { id: 'cvp-analysis', name: 'CVP 분석', icon: '📈', count: 5 },
    { id: 'budget-management', name: '예산관리', icon: '💰', count: 5 },
    { id: 'responsibility-accounting', name: '책임회계', icon: '🏢', count: 5 },
    { id: 'performance-evaluation', name: '성과평가', icon: '🏆', count: 5 },
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
            <Link href="/category/accounting/tat-1" className="text-gray-500 hover:text-gray-700">TAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">원가관리회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-rose-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🏭</div>
            <div>
              <h1 className="text-2xl font-bold">원가관리회계</h1>
              <p className="text-rose-100">TAT 1급 | 원가계산, 표준원가, CVP분석, 예산관리, 성과평가</p>
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
                    ? 'bg-rose-100 border-2 border-rose-300'
                    : 'bg-white border border-gray-200 hover:border-rose-200'
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
                              ? 'bg-rose-500 border-rose-500 text-white'
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
                              className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition flex-shrink-0"
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
      </div>

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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. TAT 1급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
