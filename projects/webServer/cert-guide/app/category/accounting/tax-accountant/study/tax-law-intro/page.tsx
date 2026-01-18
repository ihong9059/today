'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TaxLawIntroStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['basic-law']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-tax-law-intro-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-tax-law-intro-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 국세기본법 (1-12)
    { id: 1, topic: 'basic-law', question: '납세의무의 성립과 확정의 차이를 설명하시오.', answer: '성립은 과세요건 충족 시 자동 발생, 확정은 세액이 구체화되는 절차이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 납세의무의 성립과 확정의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무 성립의 의의\n2. 납세의무 확정의 의의\n3. 확정 방법(신고납부, 부과과세)\n4. 세목별 성립시기\n5. 연습문제 3개' },
    { id: 2, topic: 'basic-law', question: '국세부과의 제척기간을 세목별로 설명하시오.', answer: '일반 5년, 무신고·사기 7년(10년), 상속·증여세 10년(15년)이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 국세부과의 제척기간을 세목별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제척기간의 의의\n2. 일반적 제척기간(5년)\n3. 특례 제척기간\n4. 제척기간의 기산일\n5. 연습문제 3개' },
    { id: 3, topic: 'basic-law', question: '국세징수권의 소멸시효를 설명하시오.', answer: '국세징수권은 행사할 수 있는 날로부터 5년(10년)간 행사하지 않으면 소멸한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 국세징수권의 소멸시효를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소멸시효의 의의\n2. 소멸시효 기간\n3. 시효의 중단과 정지\n4. 제척기간과의 비교\n5. 연습문제 3개' },
    { id: 4, topic: 'basic-law', question: '가산세의 종류와 계산방법을 설명하시오.', answer: '무신고·과소신고·납부불성실·원천징수불이행 가산세 등이 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 가산세의 종류와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가산세의 법적 성격\n2. 신고불성실 가산세\n3. 납부불성실 가산세\n4. 가산세 감면 규정\n5. 연습문제 3개' },
    { id: 5, topic: 'basic-law', question: '경정청구와 수정신고의 차이를 설명하시오.', answer: '경정청구는 세액 과다 시, 수정신고는 세액 과소 시 신고하는 제도이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 경정청구와 수정신고의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경정청구의 요건과 기한\n2. 수정신고의 요건과 효과\n3. 가산세와의 관계\n4. 실무상 유의점\n5. 연습문제 3개' },
    { id: 6, topic: 'basic-law', question: '조세불복제도(이의신청, 심사청구, 심판청구)를 설명하시오.', answer: '위법·부당한 처분에 대한 권리구제 절차로, 행정심판과 행정소송이 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 조세불복제도(이의신청, 심사청구, 심판청구)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불복청구의 종류\n2. 각 절차의 제기기한\n3. 심판청구의 효력\n4. 행정소송과의 관계\n5. 연습문제 3개' },
    { id: 7, topic: 'basic-law', question: '국세우선권의 원칙과 예외를 설명하시오.', answer: '국세는 다른 채권에 우선하나, 담보권 설정 전 채권 등은 예외이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 국세우선권의 원칙과 예외를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국세우선권의 의의\n2. 우선권의 범위\n3. 예외 사유\n4. 실무상 쟁점\n5. 연습문제 3개' },
    { id: 8, topic: 'basic-law', question: '제2차 납세의무자의 종류와 요건을 설명하시오.', answer: '청산인, 출자자, 법인의 재산 양수인 등이 본래 납세의무자 대신 납세의무를 진다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 제2차 납세의무자의 종류와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제2차 납세의무의 의의\n2. 청산인의 제2차 납세의무\n3. 출자자의 제2차 납세의무\n4. 사업양수인의 제2차 납세의무\n5. 연습문제 3개' },
    { id: 9, topic: 'basic-law', question: '실질과세원칙의 내용과 적용 사례를 설명하시오.', answer: '거래의 실질에 따라 과세하며, 명의신탁, 우회거래 등에 적용된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 실질과세원칙의 내용과 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실질과세원칙의 법적 근거\n2. 귀속의 실질과 거래의 실질\n3. 적용 사례\n4. 판례 경향\n5. 연습문제 3개' },
    { id: 10, topic: 'basic-law', question: '신의성실의 원칙이 조세법에 적용되는 사례를 설명하시오.', answer: '납세자의 신뢰를 보호하여 소급과세 금지, 비과세 관행 존중 등에 적용된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 신의성실의 원칙이 조세법에 적용되는 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신의성실원칙의 의의\n2. 비과세 관행의 보호\n3. 공적 견해표명과 신뢰보호\n4. 주요 판례\n5. 연습문제 3개' },
    { id: 11, topic: 'basic-law', question: '국세환급금과 환급가산금의 계산방법을 설명하시오.', answer: '과납금 또는 오납금에 대해 환급가산금을 가산하여 환급한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 국세환급금과 환급가산금의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국세환급금의 발생 사유\n2. 환급가산금 기산일\n3. 환급가산금 이율\n4. 충당과 환급의 순서\n5. 연습문제 3개' },
    { id: 12, topic: 'basic-law', question: '납세담보의 종류와 효력을 설명하시오.', answer: '금전, 유가증권, 납세보증보험증권 등으로 조세채권을 담보한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 납세담보의 종류와 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세담보의 의의\n2. 담보의 종류\n3. 담보 제공 절차\n4. 담보의 효력\n5. 연습문제 3개' },

    // 소득세법 (13-25)
    { id: 13, topic: 'income-tax', question: '종합소득세의 계산구조를 순서대로 설명하시오.', answer: '소득금액 → 종합소득금액 → 과세표준 → 산출세액 → 결정세액 순서이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 종합소득세의 계산구조를 순서대로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 소득별 소득금액 계산\n2. 종합소득금액 합산\n3. 소득공제와 과세표준\n4. 세율 적용과 세액공제\n5. 연습문제 3개' },
    { id: 14, topic: 'income-tax', question: '이자소득과 배당소득의 과세방법을 비교하시오.', answer: '원천징수(14%) 후 금융소득 2천만원 초과 시 종합과세된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 이자소득과 배당소득의 과세방법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 금융소득의 범위\n2. 원천징수세율\n3. 종합과세와 분리과세\n4. 배당세액공제\n5. 연습문제 3개' },
    { id: 15, topic: 'income-tax', question: '사업소득 필요경비의 범위와 불산입 항목을 설명하시오.', answer: '수입금액 발생에 직접 관련된 비용이며, 업무무관경비 등은 불산입된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 사업소득 필요경비의 범위와 불산입 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요경비의 범위\n2. 필요경비 불산입 항목\n3. 접대비 한도\n4. 감가상각비 계산\n5. 연습문제 3개' },
    { id: 16, topic: 'income-tax', question: '근로소득의 비과세 항목을 열거하고 설명하시오.', answer: '실비변상적 급여, 식대, 자가운전보조금, 출산·보육수당 등이 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 근로소득의 비과세 항목을 열거하고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실비변상적 급여\n2. 식대(월 20만원)\n3. 자가운전보조금\n4. 기타 비과세 항목\n5. 연습문제 3개' },
    { id: 17, topic: 'income-tax', question: '양도소득세의 과세대상과 비과세 요건을 설명하시오.', answer: '부동산, 주식 등의 양도차익에 과세하며, 1세대 1주택 등은 비과세된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 양도소득세의 과세대상과 비과세 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양도소득의 범위\n2. 1세대 1주택 비과세\n3. 비과세 보유기간 요건\n4. 고가주택의 과세\n5. 연습문제 3개' },
    { id: 18, topic: 'income-tax', question: '양도소득 과세표준 계산구조를 설명하시오.', answer: '양도가액 - 취득가액 - 필요경비 - 장기보유특별공제 = 양도소득금액', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 양도소득 과세표준 계산구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양도가액의 결정\n2. 취득가액의 계산\n3. 장기보유특별공제\n4. 양도소득기본공제\n5. 연습문제 3개' },
    { id: 19, topic: 'income-tax', question: '인적공제(기본공제, 추가공제)의 요건을 설명하시오.', answer: '기본공제는 본인·배우자·부양가족, 추가공제는 경로우대·장애인·부녀자 등이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 인적공제(기본공제, 추가공제)의 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본공제 대상자\n2. 부양가족 요건(나이, 소득)\n3. 추가공제 종류와 금액\n4. 공제 적용 순서\n5. 연습문제 3개' },
    { id: 20, topic: 'income-tax', question: '특별소득공제와 특별세액공제를 비교하시오.', answer: '특별소득공제는 과세표준에서, 특별세액공제는 산출세액에서 공제한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 특별소득공제와 특별세액공제를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 특별소득공제 항목\n2. 특별세액공제 항목\n3. 표준세액공제와의 관계\n4. 공제한도 및 이월\n5. 연습문제 3개' },
    { id: 21, topic: 'income-tax', question: '연금소득의 종류와 과세방법을 설명하시오.', answer: '공적연금과 사적연금으로 구분하며, 분리과세 또는 종합과세된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 연금소득의 종류와 과세방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공적연금소득\n2. 사적연금소득\n3. 연금소득공제\n4. 분리과세와 종합과세\n5. 연습문제 3개' },
    { id: 22, topic: 'income-tax', question: '기타소득의 범위와 필요경비율을 설명하시오.', answer: '상금, 원고료, 강연료 등이며, 필요경비 80%를 인정받는다(일부 60%).', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 기타소득의 범위와 필요경비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타소득의 종류\n2. 필요경비율 적용\n3. 원천징수와 종합과세\n4. 분리과세 선택\n5. 연습문제 3개' },
    { id: 23, topic: 'income-tax', question: '퇴직소득세의 계산구조를 설명하시오.', answer: '퇴직급여 → 퇴직소득금액 → 환산급여 → 세율 적용 → 연분연승법 적용', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 퇴직소득세의 계산구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직소득의 범위\n2. 퇴직소득공제\n3. 환산급여 계산\n4. 연분연승법\n5. 연습문제 3개' },
    { id: 24, topic: 'income-tax', question: '원천징수의 의의와 종류를 설명하시오.', answer: '소득 지급 시 세금을 징수·납부하는 제도로, 완납적·예납적 원천징수가 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 원천징수의 의의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수의 법적 성격\n2. 완납적 원천징수\n3. 예납적 원천징수\n4. 원천징수세율\n5. 연습문제 3개' },
    { id: 25, topic: 'income-tax', question: '종합소득세 확정신고 대상자와 신고기한을 설명하시오.', answer: '종합소득이 있는 거주자는 다음 해 5월 31일까지 확정신고해야 한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 종합소득세 확정신고 대상자와 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정신고 의무자\n2. 확정신고 제외 대상\n3. 신고기한과 납부기한\n4. 성실신고확인제도\n5. 연습문제 3개' },

    // 법인세법 (26-37)
    { id: 26, topic: 'corporate-tax', question: '법인세 과세표준의 계산구조를 설명하시오.', answer: '기업회계이익 ± 세무조정 = 각 사업연도 소득 → 과세표준', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 법인세 과세표준의 계산구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산서상 당기순이익\n2. 익금산입·손금불산입\n3. 손금산입·익금불산입\n4. 이월결손금 공제\n5. 연습문제 3개' },
    { id: 27, topic: 'corporate-tax', question: '익금과 손금의 개념을 비교하고 예시를 드시오.', answer: '익금은 순자산 증가 거래, 손금은 순자산 감소 거래이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 익금과 손금의 개념을 비교하고 예시를 드시오.\n\n다음 순서로 설명해주세요:\n1. 익금의 개념과 범위\n2. 손금의 개념과 범위\n3. 익금불산입 항목\n4. 손금불산입 항목\n5. 연습문제 3개' },
    { id: 28, topic: 'corporate-tax', question: '접대비의 손금산입 한도 계산방법을 설명하시오.', answer: '기본한도 + 수입금액 기준 한도로 계산하며, 문화접대비는 별도 한도가 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 접대비의 손금산입 한도 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접대비의 범위\n2. 기본한도(1,200만원~3,600만원)\n3. 수입금액 기준 한도\n4. 문화접대비 추가한도\n5. 연습문제 3개' },
    { id: 29, topic: 'corporate-tax', question: '기부금의 손금산입 한도와 이월공제를 설명하시오.', answer: '법정기부금 50%, 지정기부금 10% 한도이며, 미공제액은 10년간 이월된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 기부금의 손금산입 한도와 이월공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기부금의 종류 구분\n2. 법정기부금 한도\n3. 지정기부금 한도\n4. 이월공제 적용\n5. 연습문제 3개' },
    { id: 30, topic: 'corporate-tax', question: '감가상각비의 세무조정 방법을 설명하시오.', answer: '회사 계상액이 한도를 초과하면 손금불산입, 미달하면 손금산입하지 않는다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 감가상각비의 세무조정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각 시인범위\n2. 상각범위액 계산\n3. 시부인 계산\n4. 상각부인액의 처리\n5. 연습문제 3개' },
    { id: 31, topic: 'corporate-tax', question: '대손충당금의 손금산입 한도와 세무조정을 설명하시오.', answer: '채권잔액의 1%(금융업 2%)와 대손실적률 중 큰 금액을 한도로 한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 대손충당금의 손금산입 한도와 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손충당금 대상 채권\n2. 한도 계산방법\n3. 세무조정 방법\n4. 대손금의 손금산입\n5. 연습문제 3개' },
    { id: 32, topic: 'corporate-tax', question: '소득처분의 종류와 귀속자별 처리방법을 설명하시오.', answer: '사외유출(배당, 기타소득, 상여), 유보, 사내유보로 구분하여 처분한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 소득처분의 종류와 귀속자별 처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소득처분의 의의\n2. 사외유출의 종류\n3. 유보와 △유보\n4. 귀속자별 원천징수\n5. 연습문제 3개' },
    { id: 33, topic: 'corporate-tax', question: '부당행위계산부인 제도의 적용 요건을 설명하시오.', answer: '특수관계인과의 거래에서 시가와 차이가 있고, 조세부담을 부당히 감소시킨 경우 적용된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 부당행위계산부인 제도의 적용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 취지\n2. 특수관계인의 범위\n3. 시가의 판단\n4. 부인 유형\n5. 연습문제 3개' },
    { id: 34, topic: 'corporate-tax', question: '이월결손금 공제의 요건과 한도를 설명하시오.', answer: '15년간 이월공제되며, 중소기업은 100%, 그 외는 60% 한도이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 이월결손금 공제의 요건과 한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이월결손금의 의의\n2. 공제 요건(신고 등)\n3. 공제 한도\n4. 공제 순서\n5. 연습문제 3개' },
    { id: 35, topic: 'corporate-tax', question: '법인세 세율과 중간예납제도를 설명하시오.', answer: '과세표준 구간별 9%~24% 세율이며, 직전 사업연도 기준으로 중간예납한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 법인세 세율과 중간예납제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법인세 세율 구조\n2. 중간예납 세액 계산\n3. 중간예납 면제 대상\n4. 중간예납 기한\n5. 연습문제 3개' },
    { id: 36, topic: 'corporate-tax', question: '세액공제와 세액감면의 종류를 설명하시오.', answer: '외국납부세액공제, 재해손실세액공제, 중소기업특별세액감면 등이 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 세액공제와 세액감면의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외국납부세액공제\n2. 재해손실세액공제\n3. 중소기업특별세액감면\n4. 연구개발세액공제\n5. 연습문제 3개' },
    { id: 37, topic: 'corporate-tax', question: '법인세 신고·납부 절차와 기한을 설명하시오.', answer: '사업연도 종료일로부터 3개월 내에 신고·납부해야 한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 법인세 신고·납부 절차와 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고 기한\n2. 제출 서류\n3. 납부 방법\n4. 분납과 물납\n5. 연습문제 3개' },

    // 부가가치세법 (38-50)
    { id: 38, topic: 'vat', question: '부가가치세의 과세거래를 설명하시오.', answer: '재화의 공급, 용역의 공급, 재화의 수입이 과세거래이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 부가가치세의 과세거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급\n2. 용역의 공급\n3. 재화의 수입\n4. 간주공급\n5. 연습문제 3개' },
    { id: 39, topic: 'vat', question: '영세율과 면세의 차이점을 설명하시오.', answer: '영세율은 매입세액 환급이 가능하나, 면세는 환급이 불가능하다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 영세율과 면세의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율의 의의와 적용 대상\n2. 면세의 의의와 적용 대상\n3. 매입세액 공제 차이\n4. 면세 포기 제도\n5. 연습문제 3개' },
    { id: 40, topic: 'vat', question: '공급시기와 세금계산서 발급시기를 설명하시오.', answer: '재화는 인도일, 용역은 완료일이 공급시기이며, 그 때 세금계산서를 발급한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 공급시기와 세금계산서 발급시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급시기\n2. 용역의 공급시기\n3. 세금계산서 발급시기\n4. 선발급과 후발급\n5. 연습문제 3개' },
    { id: 41, topic: 'vat', question: '과세표준에 포함되는 금액과 포함되지 않는 금액을 구분하시오.', answer: '대가, 운임, 포장비 등은 포함되고, 에누리·환입액은 제외된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 과세표준에 포함되는 금액과 포함되지 않는 금액을 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준의 일반원칙\n2. 포함 항목\n3. 불포함 항목\n4. 대손세액공제\n5. 연습문제 3개' },
    { id: 42, topic: 'vat', question: '매입세액공제의 요건과 불공제 항목을 설명하시오.', answer: '세금계산서 수취, 사업 관련성이 요건이며, 접대비 등은 불공제된다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 매입세액공제의 요건과 불공제 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입세액공제 요건\n2. 불공제 매입세액 종류\n3. 공통매입세액 안분계산\n4. 의제매입세액공제\n5. 연습문제 3개' },
    { id: 43, topic: 'vat', question: '세금계산서의 필수 기재사항과 가산세를 설명하시오.', answer: '공급자·공급받는 자 인적사항, 공급가액, 부가가치세액 등이 필수 기재사항이다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 세금계산서의 필수 기재사항과 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필수 기재사항\n2. 미발급·허위발급 가산세\n3. 지연발급·수취 가산세\n4. 전자세금계산서 의무\n5. 연습문제 3개' },
    { id: 44, topic: 'vat', question: '간이과세자 제도의 내용을 설명하시오.', answer: '연 매출 8천만원 미만 개인사업자에게 적용되며, 업종별 부가가치율을 적용한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 간이과세자 제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상과 배제 업종\n2. 세액 계산방법\n3. 업종별 부가가치율\n4. 납부면제 제도\n5. 연습문제 3개' },
    { id: 45, topic: 'vat', question: '부가가치세 예정신고와 확정신고를 비교하시오.', answer: '예정신고는 과세기간 중간에, 확정신고는 과세기간 종료 후에 한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 부가가치세 예정신고와 확정신고를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간 구분\n2. 예정신고 기한과 대상\n3. 확정신고 기한\n4. 예정고지 제도\n5. 연습문제 3개' },
    { id: 46, topic: 'vat', question: '사업자등록의 신청 기한과 미등록 가산세를 설명하시오.', answer: '사업개시일로부터 20일 이내에 등록하며, 미등록 시 매출세액의 1% 가산세가 있다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 사업자등록의 신청 기한과 미등록 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업자등록 의무\n2. 등록 신청 기한\n3. 미등록 가산세\n4. 휴업·폐업 신고\n5. 연습문제 3개' },
    { id: 47, topic: 'vat', question: '수정세금계산서 발급 사유와 절차를 설명하시오.', answer: '착오, 환입, 계약 해제 등의 사유로 공급가액 변동 시 발급한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 수정세금계산서 발급 사유와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발급 사유\n2. 발급 기한\n3. 작성 방법\n4. 신고서 수정\n5. 연습문제 3개' },
    { id: 48, topic: 'vat', question: '재화의 수입에 대한 부가가치세 과세를 설명하시오.', answer: '수입신고 시 세관장이 부가가치세를 징수하며, 매입세액으로 공제 가능하다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 재화의 수입에 대한 부가가치세 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준(CIF 가격)\n2. 납세의무자\n3. 징수 방법\n4. 수입세금계산서\n5. 연습문제 3개' },
    { id: 49, topic: 'vat', question: '용역의 국외공급과 국내공급 판정기준을 설명하시오.', answer: '용역이 제공되는 장소, 역무 수행지 등을 기준으로 판정한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 용역의 국외공급과 국내공급 판정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용역의 공급장소 원칙\n2. 특례 규정\n3. 디지털 서비스의 공급장소\n4. 영세율 적용 요건\n5. 연습문제 3개' },
    { id: 50, topic: 'vat', question: '부가가치세 환급의 유형과 절차를 설명하시오.', answer: '일반환급과 조기환급이 있으며, 확정신고 후 30일 이내에 환급한다.', prompt: '세무사 세법학개론 문제입니다.\n\n문제: 부가가치세 환급의 유형과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급 발생 사유\n2. 일반환급과 조기환급\n3. 환급 기한\n4. 환급 관련 가산세\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'basic-law', name: '국세기본법', count: 12 },
    { id: 'income-tax', name: '소득세법', count: 13 },
    { id: 'corporate-tax', name: '법인세법', count: 12 },
    { id: 'vat', name: '부가가치세법', count: 13 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tax-accountant" className="text-gray-500 hover:text-gray-700">세무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">세법학개론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📜 세법학개론</h1>
          <p className="text-gray-600">세무사 1차 시험 | 40문항 | 60분</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {questions.length} 문항 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedTopics.includes(topic.id) ? '📂' : '📁'}</span>
                  <span className="font-medium text-gray-900">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.count}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(topic.id) ? '▼' : '▶'}</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={completedQuestions.includes(q.id)} onChange={() => toggleQuestion(q.id)} className="mt-1 w-5 h-5 text-emerald-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition">🤖 AI</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/tax-accountant/study/fiscal-policy" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 재정학</Link>
          <Link href="/category/accounting/tax-accountant/study/accounting-intro" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">다음: 회계학개론 →</Link>
        </div>
      </main>

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
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
