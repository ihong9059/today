'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CorporateTaxStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['income-expense']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-corporate-tax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-1-corporate-tax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 익금손금 (1-10)
    { id: 1, topic: 'income-expense', question: '익금의 정의와 범위를 설명하시오.', answer: '법인의 순자산을 증가시키는 거래로 인한 수익금액', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 익금의 정의와 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 익금의 법적 정의\n2. 익금에 포함되는 항목\n3. 익금불산입 항목\n4. 회계상 수익과의 차이\n5. 연습문제 3개' },
    { id: 2, topic: 'income-expense', question: '익금불산입 항목을 열거하시오.', answer: '자본거래로 인한 수익, 이월익금, 평가이익 등', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 익금불산입 항목을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 자본거래 관련 익금불산입\n2. 이월익금 불산입\n3. 평가이익 불산입\n4. 기타 익금불산입 항목\n5. 연습문제 3개' },
    { id: 3, topic: 'income-expense', question: '손금의 정의와 범위를 설명하시오.', answer: '법인의 순자산을 감소시키는 거래로 인한 비용 또는 손실', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 손금의 정의와 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금의 법적 정의\n2. 손금 인정 요건\n3. 손금에 포함되는 항목\n4. 회계상 비용과의 차이\n5. 연습문제 3개' },
    { id: 4, topic: 'income-expense', question: '손금불산입 항목을 열거하시오.', answer: '법인세, 벌금, 과료, 세금, 업무무관비용 등', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 손금불산입 항목을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 법인세 관련 손금불산입\n2. 벌금/과료/가산세\n3. 업무무관비용\n4. 한도초과 비용\n5. 연습문제 3개' },
    { id: 5, topic: 'income-expense', question: '수입배당금 익금불산입 제도를 설명하시오.', answer: '법인간 배당금 이중과세 방지를 위한 익금불산입 제도', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 수입배당금 익금불산입 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 취지\n2. 지분율에 따른 익금불산입률\n3. 계산 방법\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 6, topic: 'income-expense', question: '임원 상여금의 손금 처리를 설명하시오.', answer: '정관/주총/이사회 결의에 의한 지급기준 초과시 손금불산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 임원 상여금의 손금 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금 인정 요건\n2. 지급기준 초과 처리\n3. 퇴직급여와의 관계\n4. 세무조정 방법\n5. 연습문제 3개' },
    { id: 7, topic: 'income-expense', question: '복리후생비의 손금 인정 범위를 설명하시오.', answer: '사회통념상 타당한 범위 내에서 손금 인정', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 복리후생비의 손금 인정 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금 인정 복리후생비\n2. 손금불산입 복리후생비\n3. 사회통념상 인정 기준\n4. 관련 사례\n5. 연습문제 3개' },
    { id: 8, topic: 'income-expense', question: '지급이자의 손금불산입을 설명하시오.', answer: '업무무관자산 취득 관련 지급이자는 손금불산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 지급이자의 손금불산입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금불산입 대상 지급이자\n2. 업무무관자산 범위\n3. 차입금 계산 순서\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 9, topic: 'income-expense', question: '인건비의 손금 인정 요건을 설명하시오.', answer: '실제 근로 제공에 대한 정상적인 대가일 것', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 인건비의 손금 인정 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금 인정 인건비의 범위\n2. 가공인건비 처리\n3. 특수관계인 인건비\n4. 세무조정 사례\n5. 연습문제 3개' },
    { id: 10, topic: 'income-expense', question: '익금과 손금의 귀속시기를 설명하시오.', answer: '권리의무확정주의에 따른 귀속사업연도 결정', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 익금과 손금의 귀속시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권리의무확정주의\n2. 익금의 귀속시기\n3. 손금의 귀속시기\n4. 특수한 거래의 귀속시기\n5. 연습문제 3개' },

    // 세무조정 (11-20)
    { id: 11, topic: 'tax-adjustment', question: '세무조정의 의의와 종류를 설명하시오.', answer: '기업회계와 세무회계 차이를 조정하는 절차', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 세무조정의 의의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세무조정의 정의\n2. 결산조정과 신고조정\n3. 익금산입/손금불산입\n4. 익금불산입/손금산입\n5. 연습문제 3개' },
    { id: 12, topic: 'tax-adjustment', question: '결산조정과 신고조정의 차이를 설명하시오.', answer: '결산조정: 장부에 반영 필요, 신고조정: 세무조정만 가능', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 결산조정과 신고조정의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산조정의 정의와 예시\n2. 신고조정의 정의와 예시\n3. 결산조정 항목\n4. 신고조정 항목\n5. 연습문제 3개' },
    { id: 13, topic: 'tax-adjustment', question: '소득처분의 종류와 방법을 설명하시오.', answer: '사외유출(배당/상여/기타/기타사외), 사내유보, 기타', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 소득처분의 종류와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소득처분의 정의\n2. 사외유출(배당/상여/기타/기타사외)\n3. 사내유보 처분\n4. 소득처분 판단 기준\n5. 연습문제 3개' },
    { id: 14, topic: 'tax-adjustment', question: '유보의 개념과 유보추인을 설명하시오.', answer: '일시적 차이로 인한 사내유보, 추후 추인 필요', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 유보의 개념과 유보추인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유보의 정의\n2. 유보 발생 사례\n3. 유보추인의 개념\n4. 유보와 영구적 차이 비교\n5. 연습문제 3개' },
    { id: 15, topic: 'tax-adjustment', question: '세무조정계산서의 구조를 설명하시오.', answer: '각사업연도소득금액 산출을 위한 조정명세', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 세무조정계산서의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세무조정계산서의 구성\n2. 각 조정항목 기재방법\n3. 소득금액 조정합계표\n4. 작성 순서와 예시\n5. 연습문제 3개' },
    { id: 16, topic: 'tax-adjustment', question: '대손충당금의 세무조정을 설명하시오.', answer: '손금산입한도 초과액은 손금불산입(유보)', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 대손충당금의 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세법상 대손충당금 한도\n2. 한도 계산 방법\n3. 세무조정 분개\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 17, topic: 'tax-adjustment', question: '퇴직급여충당금의 세무조정을 설명하시오.', answer: '세법상 한도 초과액은 손금불산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 퇴직급여충당금의 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세법상 한도 계산\n2. 한도 초과 처리\n3. 실제 퇴직급여 지급시 처리\n4. 세무조정 예시\n5. 연습문제 3개' },
    { id: 18, topic: 'tax-adjustment', question: '재고자산 평가의 세무조정을 설명하시오.', answer: '평가방법 신고 미이행시 선입선출법 적용', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 재고자산 평가의 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세법상 평가방법\n2. 평가방법 변경 요건\n3. 저가법 적용\n4. 세무조정 사례\n5. 연습문제 3개' },
    { id: 19, topic: 'tax-adjustment', question: '외화자산부채 평가의 세무조정을 설명하시오.', answer: '화폐성 외화자산부채 평가손익 익금/손금 산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 외화자산부채 평가의 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화폐성/비화폐성 구분\n2. 평가기준환율\n3. 평가손익 처리\n4. 세무조정 예시\n5. 연습문제 3개' },
    { id: 20, topic: 'tax-adjustment', question: '자산의 취득가액 세무조정을 설명하시오.', answer: '취득부대비용 포함, 건설자금이자 등 특례 적용', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 자산의 취득가액 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세법상 취득가액 구성\n2. 부대비용의 범위\n3. 건설자금이자 처리\n4. 세무조정 방법\n5. 연습문제 3개' },

    // 감가상각 (21-30)
    { id: 21, topic: 'depreciation', question: '감가상각의 의의와 세무상 특징을 설명하시오.', answer: '고정자산 취득원가를 내용연수에 걸쳐 비용화', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 감가상각의 의의와 세무상 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각의 정의\n2. 세무회계상 특징\n3. 결산조정 요건\n4. 감가상각 대상자산\n5. 연습문제 3개' },
    { id: 22, topic: 'depreciation', question: '세법상 감가상각 방법을 설명하시오.', answer: '정액법, 정률법, 생산량비례법 등', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 세법상 감가상각 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법 계산\n2. 정률법 계산\n3. 생산량비례법\n4. 자산별 적용 방법\n5. 연습문제 3개' },
    { id: 23, topic: 'depreciation', question: '세법상 내용연수와 잔존가액을 설명하시오.', answer: '법정내용연수 적용, 잔존가액 0원', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 세법상 내용연수와 잔존가액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기준내용연수 규정\n2. 내용연수 범위\n3. 잔존가액 규정 변경\n4. 신고/무신고시 적용 방법\n5. 연습문제 3개' },
    { id: 24, topic: 'depreciation', question: '감가상각비 한도와 시인부족액을 설명하시오.', answer: '상각범위액 한도 초과 손금불산입, 시인부족액 이월', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 감가상각비 한도와 시인부족액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상각범위액 계산\n2. 한도 초과액 처리\n3. 시인부족액의 정의\n4. 시인부족액 이월 처리\n5. 연습문제 3개' },
    { id: 25, topic: 'depreciation', question: '즉시상각의제 제도를 설명하시오.', answer: '취득가액 일정액 이하 자산의 즉시 비용 처리', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 즉시상각의제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 즉시상각의제 정의\n2. 적용 대상 자산\n3. 금액 기준\n4. 세무조정 방법\n5. 연습문제 3개' },
    { id: 26, topic: 'depreciation', question: '특별상각과 가속상각을 설명하시오.', answer: '정책적 목적으로 추가 감가상각 허용', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 특별상각과 가속상각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별상각의 종류\n2. 가속상각 요건\n3. 상각액 계산 방법\n4. 적용 사례\n5. 연습문제 3개' },
    { id: 27, topic: 'depreciation', question: '무형자산의 감가상각을 설명하시오.', answer: '영업권, 개발비 등 무형자산 상각', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 무형자산의 감가상각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무형자산의 범위\n2. 무형자산별 상각기간\n3. 상각 방법\n4. 세무조정 방법\n5. 연습문제 3개' },
    { id: 28, topic: 'depreciation', question: '중고자산의 감가상각을 설명하시오.', answer: '기준내용연수의 50% 범위 내 내용연수 적용 가능', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 중고자산의 감가상각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중고자산 내용연수 특례\n2. 내용연수 계산 방법\n3. 적용 요건\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 29, topic: 'depreciation', question: '감가상각비 세무조정 사례를 설명하시오.', answer: '회사계상액과 세법한도 비교하여 조정', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 감가상각비 세무조정 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회사계상액 확인\n2. 상각범위액 계산\n3. 한도 초과/미달 처리\n4. 종합 세무조정 예시\n5. 연습문제 3개' },
    { id: 30, topic: 'depreciation', question: '자본적지출과 수익적지출의 구분을 설명하시오.', answer: '자산가치 증가: 자본적지출, 현상유지: 수익적지출', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 자본적지출과 수익적지출의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본적지출의 정의\n2. 수익적지출의 정의\n3. 구분 기준\n4. 세무조정 방법\n5. 연습문제 3개' },

    // 접대비기부금 (31-40)
    { id: 31, topic: 'entertainment-donation', question: '접대비의 정의와 범위를 설명하시오.', answer: '사업관련자에게 지출하는 사교/향응비', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 접대비의 정의와 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접대비의 세법상 정의\n2. 접대비에 해당하는 비용\n3. 접대비로 보지 않는 비용\n4. 광고선전비와의 구분\n5. 연습문제 3개' },
    { id: 32, topic: 'entertainment-donation', question: '접대비 손금불산입 한도를 설명하시오.', answer: '기본한도 + 수입금액별 추가한도', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 접대비 손금불산입 한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본한도액 계산\n2. 수입금액별 적용률\n3. 한도 초과액 처리\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 33, topic: 'entertainment-donation', question: '접대비 신용카드사용 의무를 설명하시오.', answer: '1만원 초과 접대비는 신용카드 등 사용 의무', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 접대비 신용카드사용 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적격증빙 수취 의무\n2. 신용카드 사용 대상 금액\n3. 미수취시 손금불산입\n4. 예외 규정\n5. 연습문제 3개' },
    { id: 34, topic: 'entertainment-donation', question: '기부금의 종류와 손금산입 순서를 설명하시오.', answer: '법정기부금 → 지정기부금 순으로 손금산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 기부금의 종류와 손금산입 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정기부금의 범위\n2. 지정기부금의 범위\n3. 비지정기부금(손금불산입)\n4. 손금산입 순서와 한도\n5. 연습문제 3개' },
    { id: 35, topic: 'entertainment-donation', question: '법정기부금의 범위와 한도를 설명하시오.', answer: '국가/지자체/국방헌금 등, 소득금액의 50%', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 법정기부금의 범위와 한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정기부금 항목\n2. 손금산입 한도\n3. 한도 계산 기준\n4. 세무조정 방법\n5. 연습문제 3개' },
    { id: 36, topic: 'entertainment-donation', question: '지정기부금의 범위와 한도를 설명하시오.', answer: '공익법인 등 기부금, 소득금액의 10%', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 지정기부금의 범위와 한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지정기부금 항목\n2. 손금산입 한도(10%)\n3. 종교단체 기부금 특례\n4. 한도 초과액 처리\n5. 연습문제 3개' },
    { id: 37, topic: 'entertainment-donation', question: '기부금 이월공제 제도를 설명하시오.', answer: '한도 초과액은 10년간 이월하여 손금산입', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 기부금 이월공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이월공제 대상 기부금\n2. 이월공제 기간\n3. 이월액 손금산입 순서\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'entertainment-donation', question: '비지정기부금의 처리를 설명하시오.', answer: '전액 손금불산입, 사외유출로 소득처분', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 비지정기부금의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비지정기부금의 정의\n2. 손금불산입 사유\n3. 소득처분 방법\n4. 관련 사례\n5. 연습문제 3개' },
    { id: 39, topic: 'entertainment-donation', question: '접대비와 광고선전비의 구분을 설명하시오.', answer: '특정인: 접대비, 불특정다수: 광고선전비', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 접대비와 광고선전비의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구분 기준\n2. 접대비 해당 사례\n3. 광고선전비 해당 사례\n4. 세무처리 차이\n5. 연습문제 3개' },
    { id: 40, topic: 'entertainment-donation', question: '접대비·기부금 세무조정 종합사례를 풀이하시오.', answer: '한도 계산 → 초과액 세무조정 → 소득처분', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 접대비·기부금 세무조정 종합사례를 풀이하시오.\n\n다음 순서로 설명해주세요:\n1. 접대비 한도 계산\n2. 기부금 한도 계산\n3. 세무조정 분개\n4. 소득처분 결정\n5. 연습문제 3개' },

    // 법인세계산 (41-50)
    { id: 41, topic: 'tax-calculation', question: '과세표준의 계산 구조를 설명하시오.', answer: '각사업연도소득 - 이월결손금 - 비과세소득 - 소득공제', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 과세표준의 계산 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각사업연도소득금액\n2. 이월결손금 공제\n3. 비과세소득 차감\n4. 소득공제 적용\n5. 연습문제 3개' },
    { id: 42, topic: 'tax-calculation', question: '법인세 세율 구조를 설명하시오.', answer: '과세표준 구간별 누진세율 적용(9%~24%)', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 법인세 세율 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 구간별 세율\n2. 중소기업 특례\n3. 누진세 계산 방법\n4. 산출세액 계산 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'tax-calculation', question: '이월결손금 공제 제도를 설명하시오.', answer: '15년간 이월하여 소득금액에서 공제', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 이월결손금 공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결손금의 정의\n2. 이월공제 기간\n3. 공제한도(중소기업 100%, 일반 80%)\n4. 적용 순서와 예시\n5. 연습문제 3개' },
    { id: 44, topic: 'tax-calculation', question: '세액공제의 종류와 적용을 설명하시오.', answer: '외국납부세액공제, R&D세액공제, 투자세액공제 등', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 세액공제의 종류와 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세액공제 종류\n2. 외국납부세액공제\n3. R&D 세액공제\n4. 공제 순서와 한도\n5. 연습문제 3개' },
    { id: 45, topic: 'tax-calculation', question: '중간예납 제도를 설명하시오.', answer: '사업연도 개시 6개월 경과 후 중간예납 신고·납부', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 중간예납 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중간예납의 취지\n2. 신고·납부 기한\n3. 세액 계산 방법\n4. 면제 대상\n5. 연습문제 3개' },
    { id: 46, topic: 'tax-calculation', question: '원천징수세액의 처리를 설명하시오.', answer: '기납부세액으로 산출세액에서 공제', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 원천징수세액의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수 대상 소득\n2. 원천징수세율\n3. 기납부세액 공제\n4. 환급 처리\n5. 연습문제 3개' },
    { id: 47, topic: 'tax-calculation', question: '법인세 신고·납부 절차를 설명하시오.', answer: '사업연도 종료 후 3개월 이내 신고·납부', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 법인세 신고·납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고 기한\n2. 납부 기한\n3. 제출 서류\n4. 분납 제도\n5. 연습문제 3개' },
    { id: 48, topic: 'tax-calculation', question: '가산세의 종류를 설명하시오.', answer: '무신고/과소신고/납부지연/미제출 가산세', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 가산세의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고가산세\n2. 과소신고가산세\n3. 납부지연가산세\n4. 기타 가산세\n5. 연습문제 3개' },
    { id: 49, topic: 'tax-calculation', question: '농어촌특별세와 지방소득세를 설명하시오.', answer: '법인세액에 부가되는 부가세', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 농어촌특별세와 지방소득세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 농어촌특별세 과세표준\n2. 농어촌특별세 세율\n3. 지방소득세 과세표준\n4. 지방소득세 세율\n5. 연습문제 3개' },
    { id: 50, topic: 'tax-calculation', question: '법인세 신고서 작성 종합사례를 풀이하시오.', answer: '과세표준 → 산출세액 → 공제/감면 → 납부세액', prompt: '전산세무 1급 법인세 문제입니다.\n\n문제: 법인세 신고서 작성 종합사례를 풀이하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 계산\n2. 산출세액 계산\n3. 세액공제/감면 적용\n4. 최종 납부세액 산출\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'income-expense', name: '익금손금', icon: '📊', count: 10 },
    { id: 'tax-adjustment', name: '세무조정', icon: '📝', count: 10 },
    { id: 'depreciation', name: '감가상각', icon: '🏭', count: 10 },
    { id: 'entertainment-donation', name: '접대비기부금', icon: '🎁', count: 10 },
    { id: 'tax-calculation', name: '법인세계산', icon: '🧮', count: 10 },
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
            <span className="text-red-600 font-medium">법인세</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🏢</div>
            <div>
              <h1 className="text-2xl font-bold">법인세</h1>
              <p className="text-red-100">필기시험 10문항 | 익금손금, 세무조정, 감가상각, 접대비기부금, 법인세계산</p>
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
                    ? 'bg-red-100 border-2 border-red-300'
                    : 'bg-white border border-gray-200 hover:border-red-200'
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
                              ? 'bg-red-500 border-red-500 text-white'
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
                              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/computerized-tax-1/study/cost-accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 원가회계
          </Link>
          <Link href="/category/accounting/computerized-tax-1/study/income-tax" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            소득세 →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 1급 법인세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
