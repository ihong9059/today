'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CostAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cost-calculation']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-cost-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-1-cost-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 원가계산 (1-10)
    { id: 1, topic: 'cost-calculation', question: '원가의 3요소(재료비, 노무비, 경비)의 분류 기준을 설명하시오.', answer: '제조원가는 투입요소에 따라 재료비, 노무비, 경비로 분류', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 원가의 3요소(재료비, 노무비, 경비)의 분류 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재료비의 정의와 분류\n2. 노무비의 정의와 분류\n3. 경비의 정의와 분류\n4. 직접비와 간접비의 구분\n5. 연습문제 3개' },
    { id: 2, topic: 'cost-calculation', question: '개별원가계산과 종합원가계산의 차이점을 설명하시오.', answer: '개별: 주문별 집계, 종합: 공정별 집계', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 개별원가계산과 종합원가계산의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산의 정의와 적용업종\n2. 종합원가계산의 정의와 적용업종\n3. 원가집계 단위의 차이\n4. 제조간접비 배부 방법의 차이\n5. 연습문제 3개' },
    { id: 3, topic: 'cost-calculation', question: '완성품환산량의 개념과 계산 방법을 설명하시오.', answer: '재공품을 완성품 기준으로 환산한 수량', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 완성품환산량의 개념과 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완성품환산량의 정의\n2. 직접재료비의 완성품환산량\n3. 가공비의 완성품환산량\n4. 평균법과 선입선출법의 차이\n5. 연습문제 3개' },
    { id: 4, topic: 'cost-calculation', question: '제조간접비 배부율 계산과 배부 방법을 설명하시오.', answer: '배부율 = 제조간접비 / 배부기준', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조간접비 배부율 계산과 배부 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배부율 계산 공식\n2. 배부기준의 종류\n3. 예정배부율과 실제배부율\n4. 배부차이의 처리\n5. 연습문제 3개' },
    { id: 5, topic: 'cost-calculation', question: '제조원가명세서의 구조와 작성 방법을 설명하시오.', answer: '당기총제조비용 + 기초재공품 - 기말재공품 = 당기제품제조원가', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조원가명세서의 구조와 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가명세서의 목적\n2. 당기총제조비용의 계산\n3. 재공품 조정\n4. 당기제품제조원가 산출\n5. 연습문제 3개' },
    { id: 6, topic: 'cost-calculation', question: '정상공손과 비정상공손의 회계처리를 설명하시오.', answer: '정상공손: 완성품원가, 비정상공손: 기간비용', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 정상공손과 비정상공손의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상공손의 정의와 처리\n2. 비정상공손의 정의와 처리\n3. 공손 발생점에 따른 배분\n4. 공손품 평가액의 처리\n5. 연습문제 3개' },
    { id: 7, topic: 'cost-calculation', question: '결합원가의 배분 방법(판매가치법, 물량기준법)을 설명하시오.', answer: '분리점 전 원가를 각 제품에 배분', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 결합원가의 배분 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결합원가의 정의\n2. 판매가치법(분리점 판매가치)\n3. 물량기준법\n4. 순실현가치법\n5. 연습문제 3개' },
    { id: 8, topic: 'cost-calculation', question: '공정별 원가계산의 절차를 설명하시오.', answer: '전공정 원가를 후공정에 대체하여 누적', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 공정별 원가계산의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정별 원가계산의 정의\n2. 각 공정별 원가집계\n3. 전공정비의 대체\n4. 누적원가의 계산\n5. 연습문제 3개' },
    { id: 9, topic: 'cost-calculation', question: '보조부문비 배부방법(직접배부법, 단계배부법)을 설명하시오.', answer: '보조부문 원가를 제조부문에 배부', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 보조부문비 배부방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접배부법의 정의와 절차\n2. 단계배부법의 정의와 절차\n3. 상호배부법과의 비교\n4. 배부기준 선정\n5. 연습문제 3개' },
    { id: 10, topic: 'cost-calculation', question: '활동기준원가계산(ABC)의 개념과 적용을 설명하시오.', answer: '활동별로 원가동인을 파악하여 배부', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 활동기준원가계산(ABC)의 개념과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC의 정의\n2. 원가동인의 개념\n3. 전통적 원가계산과의 차이\n4. 적용 사례\n5. 연습문제 3개' },

    // 표준원가 (11-20)
    { id: 11, topic: 'standard-cost', question: '표준원가의 의의와 설정 방법을 설명하시오.', answer: '사전에 과학적으로 설정된 목표원가', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 표준원가의 의의와 설정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가의 정의\n2. 표준원가의 종류(이상적, 정상적)\n3. 표준원가 설정 절차\n4. 표준원가의 장점\n5. 연습문제 3개' },
    { id: 12, topic: 'standard-cost', question: '직접재료비 차이분석(가격차이, 수량차이)을 설명하시오.', answer: '가격차이 = (실제가격-표준가격)×실제수량', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 직접재료비 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가격차이 계산\n2. 수량차이(능률차이) 계산\n3. 유리차이와 불리차이\n4. 차이 발생 원인 분석\n5. 연습문제 3개' },
    { id: 13, topic: 'standard-cost', question: '직접노무비 차이분석(임률차이, 능률차이)을 설명하시오.', answer: '임률차이 = (실제임률-표준임률)×실제시간', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 직접노무비 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임률차이 계산\n2. 능률차이 계산\n3. 차이 발생 원인\n4. 책임귀속 분석\n5. 연습문제 3개' },
    { id: 14, topic: 'standard-cost', question: '제조간접비 차이분석(2분법: 예산차이, 조업도차이)을 설명하시오.', answer: '예산차이 = 실제발생액 - 변동예산', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조간접비 2분법 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산차이(통제가능차이) 계산\n2. 조업도차이 계산\n3. 변동예산의 산정\n4. 차이 분석 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'standard-cost', question: '제조간접비 차이분석(3분법)을 설명하시오.', answer: '지출차이, 능률차이, 조업도차이로 분석', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조간접비 3분법 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지출차이 계산\n2. 능률차이 계산\n3. 조업도차이 계산\n4. 2분법과의 비교\n5. 연습문제 3개' },
    { id: 16, topic: 'standard-cost', question: '제조간접비 차이분석(4분법)을 설명하시오.', answer: '변동비 지출/능률차이 + 고정비 예산/조업도차이', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조간접비 4분법 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변동비 지출차이\n2. 변동비 능률차이\n3. 고정비 예산차이\n4. 고정비 조업도차이\n5. 연습문제 3개' },
    { id: 17, topic: 'standard-cost', question: '표준원가차이의 회계처리 방법을 설명하시오.', answer: '매출원가 조정법, 비례배분법', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 표준원가차이의 회계처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출원가 조정법\n2. 비례배분법\n3. 영업외손익 처리법\n4. 차이 조정 분개\n5. 연습문제 3개' },
    { id: 18, topic: 'standard-cost', question: '표준원가계산의 장단점을 설명하시오.', answer: '원가통제/성과평가 용이, 설정 어려움', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 표준원가계산의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가계산의 장점\n2. 원가통제 기능\n3. 표준원가계산의 단점\n4. 현대적 적용 한계\n5. 연습문제 3개' },
    { id: 19, topic: 'standard-cost', question: '차이분석 보고서의 작성과 활용을 설명하시오.', answer: '예외관리를 위한 차이분석 보고', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 차이분석 보고서의 작성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차이분석 보고서의 목적\n2. 보고서 구성 요소\n3. 예외관리 기준\n4. 개선조치 도출\n5. 연습문제 3개' },
    { id: 20, topic: 'standard-cost', question: '표준원가 개정 시기와 방법을 설명하시오.', answer: '환경변화 시 표준원가 재설정', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 표준원가 개정 시기와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가 개정의 필요성\n2. 개정 시기 결정 기준\n3. 개정 절차\n4. 개정 영향 분석\n5. 연습문제 3개' },

    // CVP분석 (21-30)
    { id: 21, topic: 'cvp-analysis', question: '원가행태(고정비, 변동비, 혼합비)를 설명하시오.', answer: '조업도 변화에 따른 원가의 반응 패턴', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 원가행태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정비의 특성\n2. 변동비의 특성\n3. 혼합비(준변동비, 준고정비)\n4. 원가행태 분석 방법\n5. 연습문제 3개' },
    { id: 22, topic: 'cvp-analysis', question: '손익분기점(BEP) 산출 공식을 설명하시오.', answer: 'BEP = 고정비 / 공헌이익률', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 손익분기점(BEP) 산출 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익분기점의 정의\n2. 매출액 기준 BEP\n3. 판매량 기준 BEP\n4. 손익분기도표\n5. 연습문제 3개' },
    { id: 23, topic: 'cvp-analysis', question: '공헌이익과 공헌이익률의 계산을 설명하시오.', answer: '공헌이익 = 매출액 - 변동비', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 공헌이익과 공헌이익률의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공헌이익의 정의\n2. 공헌이익률 계산\n3. 단위당 공헌이익\n4. 의사결정에서의 활용\n5. 연습문제 3개' },
    { id: 24, topic: 'cvp-analysis', question: '안전한계(Margin of Safety)를 설명하시오.', answer: '안전한계 = 실제매출 - 손익분기점매출', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 안전한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전한계의 정의\n2. 안전한계율 계산\n3. 경영안전도 평가\n4. 활용 사례\n5. 연습문제 3개' },
    { id: 25, topic: 'cvp-analysis', question: '영업레버리지(Operating Leverage)를 설명하시오.', answer: '영업레버리지 = 공헌이익 / 영업이익', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 영업레버리지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업레버리지의 정의\n2. 영업레버리지도 계산\n3. 고정비 비율과의 관계\n4. 영업위험 평가\n5. 연습문제 3개' },
    { id: 26, topic: 'cvp-analysis', question: '목표이익 달성 매출액 계산을 설명하시오.', answer: '매출액 = (고정비+목표이익) / 공헌이익률', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 목표이익 달성 매출액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목표이익 개념\n2. 목표매출액 공식\n3. 목표판매량 공식\n4. 세후이익 고려\n5. 연습문제 3개' },
    { id: 27, topic: 'cvp-analysis', question: '다품종 CVP분석(가중평균공헌이익률)을 설명하시오.', answer: '판매배합에 따른 가중평균 공헌이익률 산출', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 다품종 CVP분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다품종 기업의 BEP 분석\n2. 가중평균공헌이익률 계산\n3. 판매배합 가정\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 28, topic: 'cvp-analysis', question: 'CVP분석의 가정과 한계를 설명하시오.', answer: '선형관계 가정, 판매배합 일정 가정', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: CVP분석의 가정과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CVP분석의 기본 가정\n2. 원가행태의 선형성\n3. 현실 적용의 한계\n4. 보완 방법\n5. 연습문제 3개' },
    { id: 29, topic: 'cvp-analysis', question: '원가분해 방법(고저점법, 회귀분석법)을 설명하시오.', answer: '혼합비를 고정비와 변동비로 분리', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 원가분해 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고저점법의 정의와 절차\n2. 고저점법 계산 예시\n3. 회귀분석법의 개념\n4. 각 방법의 장단점\n5. 연습문제 3개' },
    { id: 30, topic: 'cvp-analysis', question: '민감도 분석(Sensitivity Analysis)을 설명하시오.', answer: '변수 변화가 이익에 미치는 영향 분석', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 민감도 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민감도 분석의 정의\n2. 분석 대상 변수\n3. What-if 분석\n4. 의사결정 활용\n5. 연습문제 3개' },

    // 예산관리 (31-40)
    { id: 31, topic: 'budget-management', question: '예산의 기능과 종류를 설명하시오.', answer: '계획/조정/통제/동기부여/성과평가 기능', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 예산의 기능과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산의 정의\n2. 예산의 기능\n3. 예산의 종류\n4. 예산편성 과정\n5. 연습문제 3개' },
    { id: 32, topic: 'budget-management', question: '종합예산의 구성과 편성 절차를 설명하시오.', answer: '운영예산 + 재무예산으로 구성', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 종합예산의 구성과 편성 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합예산의 정의\n2. 운영예산의 구성\n3. 재무예산의 구성\n4. 예산 연계 관계\n5. 연습문제 3개' },
    { id: 33, topic: 'budget-management', question: '판매예산과 생산예산의 관계를 설명하시오.', answer: '판매예산 → 생산예산 → 원가예산', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 판매예산과 생산예산의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판매예산 편성\n2. 생산예산 산정 공식\n3. 재고정책과의 연계\n4. 예산 조정\n5. 연습문제 3개' },
    { id: 34, topic: 'budget-management', question: '직접재료예산과 직접노무예산을 설명하시오.', answer: '생산량 기준으로 재료/노무 소요량 산정', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 직접재료예산과 직접노무예산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접재료예산 편성\n2. 재료구매예산 계산\n3. 직접노무예산 편성\n4. 예산 작성 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'budget-management', question: '제조간접비 예산의 편성을 설명하시오.', answer: '변동간접비 + 고정간접비로 구성', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제조간접비 예산의 편성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변동제조간접비 예산\n2. 고정제조간접비 예산\n3. 예정배부율 산정\n4. 예산 작성 예시\n5. 연습문제 3개' },
    { id: 36, topic: 'budget-management', question: '현금예산의 편성과 활용을 설명하시오.', answer: '현금수입 - 현금지출 = 현금과부족', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 현금예산의 편성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금예산의 목적\n2. 현금수입 예측\n3. 현금지출 예측\n4. 자금조달 계획\n5. 연습문제 3개' },
    { id: 37, topic: 'budget-management', question: '고정예산과 변동예산(유연예산)의 차이를 설명하시오.', answer: '고정예산: 단일 조업도, 변동예산: 조업도별 예산', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 고정예산과 변동예산의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정예산의 정의\n2. 변동예산(유연예산)의 정의\n3. 예산차이 분석\n4. 통제 효과 비교\n5. 연습문제 3개' },
    { id: 38, topic: 'budget-management', question: '영기준예산(ZBB)의 개념을 설명하시오.', answer: '전년도 무시하고 영(Zero)에서 출발', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 영기준예산(ZBB)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영기준예산의 정의\n2. 의사결정 패키지\n3. 증분예산과의 비교\n4. 장단점\n5. 연습문제 3개' },
    { id: 39, topic: 'budget-management', question: '활동기준예산(ABB)의 개념을 설명하시오.', answer: '활동별로 자원소비량 예측하여 예산 편성', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 활동기준예산(ABB)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 활동기준예산의 정의\n2. ABC와의 관계\n3. 편성 절차\n4. 장단점\n5. 연습문제 3개' },
    { id: 40, topic: 'budget-management', question: '예산차이분석과 책임회계를 설명하시오.', answer: '예산과 실적의 차이를 책임자별로 분석', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 예산차이분석과 책임회계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산차이분석의 목적\n2. 책임회계의 개념\n3. 책임중심점의 종류\n4. 통제가능성 원칙\n5. 연습문제 3개' },

    // 성과평가 (41-50)
    { id: 41, topic: 'performance-evaluation', question: '책임중심점(원가/수익/이익/투자중심점)을 설명하시오.', answer: '관리자의 책임 범위에 따라 구분', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 책임중심점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가중심점의 정의와 평가\n2. 수익중심점의 정의와 평가\n3. 이익중심점의 정의와 평가\n4. 투자중심점의 정의와 평가\n5. 연습문제 3개' },
    { id: 42, topic: 'performance-evaluation', question: '투자수익률(ROI)의 계산과 분석을 설명하시오.', answer: 'ROI = 이익 / 투자액 = 매출이익률 × 자본회전율', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 투자수익률(ROI)의 계산과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ROI의 정의\n2. 듀폰 공식 분해\n3. ROI 개선 방법\n4. ROI의 한계\n5. 연습문제 3개' },
    { id: 43, topic: 'performance-evaluation', question: '잔여이익(RI)의 계산과 활용을 설명하시오.', answer: 'RI = 이익 - (투자액 × 자본비용률)', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 잔여이익(RI)의 계산과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잔여이익의 정의\n2. 계산 공식\n3. ROI와의 비교\n4. 의사결정 활용\n5. 연습문제 3개' },
    { id: 44, topic: 'performance-evaluation', question: '경제적부가가치(EVA)의 개념을 설명하시오.', answer: 'EVA = 세후영업이익 - (투자자본 × WACC)', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 경제적부가가치(EVA)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EVA의 정의\n2. NOPAT 계산\n3. 투자자본과 WACC\n4. EVA 활용\n5. 연습문제 3개' },
    { id: 45, topic: 'performance-evaluation', question: '균형성과표(BSC)의 4가지 관점을 설명하시오.', answer: '재무/고객/내부프로세스/학습성장 관점', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 균형성과표(BSC)의 4가지 관점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무관점\n2. 고객관점\n3. 내부프로세스관점\n4. 학습 및 성장관점\n5. 연습문제 3개' },
    { id: 46, topic: 'performance-evaluation', question: '대체가격(이전가격)의 결정 방법을 설명하시오.', answer: '시장가격, 원가기준, 협상가격', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 대체가격(이전가격)의 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대체가격의 정의\n2. 시장가격 기준\n3. 원가기준 가격\n4. 협상가격\n5. 연습문제 3개' },
    { id: 47, topic: 'performance-evaluation', question: '관련원가분석(자가제조 vs 외부구입)을 설명하시오.', answer: '관련원가만 비교하여 의사결정', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 관련원가분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련원가의 정의\n2. 차별원가 분석\n3. 자가제조 vs 외부구입\n4. 기회원가 고려\n5. 연습문제 3개' },
    { id: 48, topic: 'performance-evaluation', question: '특별주문 수락 여부 결정을 설명하시오.', answer: '추가수익 > 추가원가이면 수락', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 특별주문 수락 여부 결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별주문의 정의\n2. 관련원가 분석\n3. 유휴능력 고려\n4. 의사결정 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'performance-evaluation', question: '제약자원이 있는 경우 제품조합 결정을 설명하시오.', answer: '제약자원 단위당 공헌이익이 높은 제품 우선', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 제약자원이 있는 경우 제품조합 결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제약자원의 개념\n2. 제약자원 단위당 공헌이익\n3. 최적 제품조합 결정\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'performance-evaluation', question: '전부원가계산과 변동원가계산의 이익 차이를 설명하시오.', answer: '고정제조간접비 재고 포함 여부에 따른 차이', prompt: '전산세무 1급 원가회계 문제입니다.\n\n문제: 전부원가계산과 변동원가계산의 이익 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전부원가계산의 정의\n2. 변동원가계산의 정의\n3. 이익 차이 발생 원인\n4. 재고 증감과 이익 관계\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'cost-calculation', name: '원가계산', icon: '🧮', count: 10 },
    { id: 'standard-cost', name: '표준원가', icon: '📐', count: 10 },
    { id: 'cvp-analysis', name: 'CVP분석', icon: '📈', count: 10 },
    { id: 'budget-management', name: '예산관리', icon: '📋', count: 10 },
    { id: 'performance-evaluation', name: '성과평가', icon: '🎯', count: 10 },
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
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">학습</span>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">원가회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🏭</div>
            <div>
              <h1 className="text-2xl font-bold">원가회계</h1>
              <p className="text-orange-100">이론시험 15문항 | 원가계산, 표준원가, CVP분석, 예산관리, 성과평가</p>
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
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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
          <Link href="/category/accounting/computerized-tax-1/study/financial-accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 재무회계
          </Link>
          <Link href="/category/accounting/computerized-tax-1/study/income-tax" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            소득세 →
          </Link>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">AI 학습 도우미</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하여 자세한 설명을 받아보세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition flex items-center justify-center gap-2"
              >
                <span>📋</span> 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 1급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
