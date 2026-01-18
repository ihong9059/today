'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['calculation']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 계산문제연습 (1-10)
    { id: 1, topic: 'calculation', question: '종합소득세 산출세액 계산 문제를 풀어보시오.', answer: '과세표준에 기본세율을 적용하여 산출세액을 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 거주자 甲의 종합소득세 산출세액을 계산하시오.\n\n[자료]\n- 사업소득금액: 80,000,000원\n- 근로소득금액: 30,000,000원\n- 기본공제: 본인, 배우자, 자녀 2인\n- 국민연금보험료: 4,000,000원\n\n다음 순서로 풀이해주세요:\n1. 종합소득금액 계산\n2. 소득공제 계산\n3. 과세표준 계산\n4. 산출세액 계산(세율 적용)\n5. 검산 및 확인' },
    { id: 2, topic: 'calculation', question: '양도소득세 계산 문제를 풀어보시오.', answer: '양도가액에서 취득가액과 필요경비를 차감하여 양도차익을 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 양도소득세를 계산하시오.\n\n[자료]\n- 양도가액: 500,000,000원\n- 취득가액: 300,000,000원\n- 취득세 등 부대비용: 15,000,000원\n- 보유기간: 5년\n- 거주기간: 3년(1세대 1주택 아님)\n\n다음 순서로 풀이해주세요:\n1. 양도차익 계산\n2. 장기보유특별공제\n3. 양도소득금액 및 과세표준\n4. 산출세액 계산\n5. 검산 및 확인' },
    { id: 3, topic: 'calculation', question: '법인세 과세표준 및 산출세액 계산 문제를 풀어보시오.', answer: '결산서상 당기순이익에 세무조정을 반영하여 과세표준을 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 법인세 과세표준과 산출세액을 계산하시오.\n\n[자료]\n- 결산서상 당기순이익: 200,000,000원\n- 접대비 한도초과액: 10,000,000원\n- 감가상각비 시인부인액: 5,000,000원\n- 수입배당금 익금불산입: 8,000,000원\n- 이월결손금: 20,000,000원(중소기업)\n\n다음 순서로 풀이해주세요:\n1. 익금산입·손금불산입\n2. 손금산입·익금불산입\n3. 각 사업연도소득\n4. 과세표준 및 세액\n5. 검산 및 확인' },
    { id: 4, topic: 'calculation', question: '부가가치세 납부세액 계산 문제를 풀어보시오.', answer: '매출세액에서 매입세액을 차감하여 납부세액을 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 부가가치세 납부세액을 계산하시오.\n\n[자료]\n- 과세매출액: 300,000,000원\n- 영세율매출액: 50,000,000원\n- 면세매출액: 20,000,000원\n- 세금계산서 수취 매입액: 200,000,000원\n- 신용카드매출전표 매입액: 30,000,000원\n\n다음 순서로 풀이해주세요:\n1. 매출세액 계산\n2. 매입세액 계산\n3. 공통매입세액 안분\n4. 납부세액 계산\n5. 검산 및 확인' },
    { id: 5, topic: 'calculation', question: '감가상각비 세무조정 문제를 풀어보시오.', answer: '회사 계상액과 세법상 상각범위액을 비교하여 시부인 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 감가상각비 세무조정을 하시오.\n\n[자료]\n- 기계장치 취득가액: 100,000,000원\n- 내용연수: 10년(정액법)\n- 잔존가치: 0원\n- 회사계상 감가상각비: 15,000,000원\n- 전기말 시인부인누계액: 3,000,000원\n\n다음 순서로 풀이해주세요:\n1. 상각범위액 계산\n2. 시부인 계산\n3. 유보 처리\n4. 조정명세서 작성\n5. 검산 및 확인' },
    { id: 6, topic: 'calculation', question: '대손충당금 세무조정 문제를 풀어보시오.', answer: '세법상 한도액과 회사 설정액을 비교하여 조정한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 대손충당금 세무조정을 하시오.\n\n[자료]\n- 기말 외상매출금: 500,000,000원\n- 기말 받을어음: 200,000,000원\n- 회사 대손충당금 설정액: 10,000,000원\n- 전기말 대손충당금: 8,000,000원\n- 대손실적률: 1.5%\n\n다음 순서로 풀이해주세요:\n1. 대손충당금 설정대상 채권\n2. 세법상 한도액 계산\n3. 전입액과 환입액 분석\n4. 세무조정\n5. 검산 및 확인' },
    { id: 7, topic: 'calculation', question: '접대비 손금산입한도 계산 문제를 풀어보시오.', answer: '기본한도와 수입금액 기준 한도를 합산하여 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 접대비 손금불산입액을 계산하시오.\n\n[자료]\n- 일반접대비: 50,000,000원\n- 문화접대비: 10,000,000원\n- 당기 수입금액: 10,000,000,000원\n- 중소기업 해당 여부: 해당\n\n다음 순서로 풀이해주세요:\n1. 기본한도 계산\n2. 수입금액 기준 한도\n3. 일반접대비 한도\n4. 문화접대비 추가한도\n5. 손금불산입액 계산' },
    { id: 8, topic: 'calculation', question: '외국납부세액공제 한도 계산 문제를 풀어보시오.', answer: '국외원천소득 비율로 공제한도를 계산한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 외국납부세액공제액을 계산하시오.\n\n[자료]\n- 각 사업연도소득: 1,000,000,000원\n- 국외원천소득: 200,000,000원\n- 외국납부세액: 50,000,000원\n- 산출세액: 180,000,000원\n\n다음 순서로 풀이해주세요:\n1. 공제한도 계산\n2. 공제대상 세액\n3. 공제액 결정\n4. 이월공제액\n5. 검산 및 확인' },
    { id: 9, topic: 'calculation', question: '배당소득 그로스업과 배당세액공제 계산 문제를 풀어보시오.', answer: '배당소득에 11%를 가산하고 종합과세 시 세액공제한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 금융소득 종합과세액을 계산하시오.\n\n[자료]\n- 이자소득: 15,000,000원\n- 배당소득: 25,000,000원(상장법인 배당)\n- 근로소득금액: 50,000,000원\n- 기납부세액(원천징수): 5,600,000원\n\n다음 순서로 풀이해주세요:\n1. 금융소득 종합과세 여부 판단\n2. 그로스업 계산\n3. 종합소득세 산출세액\n4. 배당세액공제\n5. 납부(환급)세액 계산' },
    { id: 10, topic: 'calculation', question: '이월결손금 공제 계산 문제를 풀어보시오.', answer: '각 사업연도소득의 일정 비율을 한도로 공제한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 이월결손금 공제 후 과세표준을 계산하시오.\n\n[자료]\n- 2024년 각 사업연도소득: 500,000,000원\n- 이월결손금 내역:\n  2019년: 100,000,000원\n  2020년: 200,000,000원\n- 중소기업 해당 여부: 비해당\n\n다음 순서로 풀이해주세요:\n1. 공제한도 계산(60%)\n2. 이월결손금 공제순서\n3. 공제액 계산\n4. 과세표준 산출\n5. 잔여 이월결손금' },

    // 세무조정실습 (11-18)
    { id: 11, topic: 'tax-adjustment', question: '소득처분 종합문제를 풀어보시오.', answer: '귀속자를 파악하여 배당, 상여, 기타소득으로 처분한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 세무조정사항에 대해 소득처분을 하시오.\n\n[자료]\n1. 대표이사 개인경비 부담액: 10,000,000원\n2. 무기명 차용금에 대한 지급이자: 5,000,000원\n3. 특수관계법인에 무상제공 용역: 20,000,000원\n4. 감가상각비 한도초과액: 8,000,000원\n\n다음 순서로 풀이해주세요:\n1. 각 항목별 세무조정 유형\n2. 사외유출 판단\n3. 귀속자별 소득처분\n4. 원천징수 필요 여부\n5. 세무조정계산서 작성' },
    { id: 12, topic: 'tax-adjustment', question: '부당행위계산부인 종합문제를 풀어보시오.', answer: '시가와 거래가액의 차이를 부인하고 익금 또는 손금 조정한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 거래에 대해 부당행위계산부인 적용 여부를 검토하시오.\n\n[자료]\n- 특수관계법인에 부동산 양도\n- 양도가액: 800,000,000원\n- 시가: 1,000,000,000원\n- 장부가액: 600,000,000원\n\n다음 순서로 풀이해주세요:\n1. 부당행위계산부인 요건 검토\n2. 시가와 거래가액 차이 계산\n3. 익금산입액 계산\n4. 소득처분\n5. 세무조정계산서 작성' },
    { id: 13, topic: 'tax-adjustment', question: '업무용승용차 세무조정 문제를 풀어보시오.', answer: '업무사용비율에 따라 감가상각비와 유지비를 안분한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 업무용승용차 관련 세무조정을 하시오.\n\n[자료]\n- 차량 취득가액: 80,000,000원(소나타)\n- 당기 감가상각비: 16,000,000원\n- 유류비, 보험료 등: 5,000,000원\n- 업무용사용비율: 70%\n- 운행기록부 작성: 미작성\n\n다음 순서로 풀이해주세요:\n1. 감가상각비 한도 검토\n2. 업무사용비율 적용\n3. 손금불산입액 계산\n4. 유지비용 조정\n5. 세무조정계산서 작성' },
    { id: 14, topic: 'tax-adjustment', question: '기부금 세무조정 종합문제를 풀어보시오.', answer: '기부금 종류별 한도를 계산하고 초과액은 이월공제한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 기부금 세무조정을 하시오.\n\n[자료]\n- 소득금액(기부금차감전): 1,000,000,000원\n- 법정기부금: 300,000,000원\n- 지정기부금: 150,000,000원\n- 전기이월 지정기부금: 50,000,000원\n\n다음 순서로 풀이해주세요:\n1. 법정기부금 한도(50%)\n2. 지정기부금 한도(10%)\n3. 손금산입액 계산\n4. 이월공제액 처리\n5. 세무조정계산서 작성' },
    { id: 15, topic: 'tax-adjustment', question: '퇴직급여충당금 세무조정 문제를 풀어보시오.', answer: '세법상 한도액과 회사 설정액을 비교하여 조정한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 퇴직급여충당금 세무조정을 하시오.\n\n[자료]\n- 기말 퇴직급여추계액: 500,000,000원\n- 회사 퇴직급여충당부채: 480,000,000원\n- 전기말 퇴직급여충당부채: 420,000,000원\n- 퇴직연금 납입액: 30,000,000원\n\n다음 순서로 풀이해주세요:\n1. 퇴직급여충당금 한도\n2. 당기 전입액 분석\n3. 손금산입 한도액\n4. 세무조정\n5. 검산 및 확인' },
    { id: 16, topic: 'tax-adjustment', question: '가지급금 인정이자 세무조정 문제를 풀어보시오.', answer: '특수관계자에 대한 가지급금은 인정이자를 익금산입한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 가지급금 인정이자를 계산하시오.\n\n[자료]\n- 대표이사 가지급금: 200,000,000원\n- 적수(일수 × 금액): 36,500,000,000원\n- 약정이자율: 연 3%\n- 당좌대출이자율: 연 5%\n- 수령이자: 4,000,000원\n\n다음 순서로 풀이해주세요:\n1. 인정이자율 결정\n2. 인정이자 계산\n3. 수령이자와 비교\n4. 익금산입액\n5. 소득처분' },
    { id: 17, topic: 'tax-adjustment', question: '재고자산 세무조정 문제를 풀어보시오.', answer: '재고자산 평가방법과 저가법 적용을 검토한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 자료를 이용하여 재고자산 세무조정을 하시오.\n\n[자료]\n- 신고 평가방법: 선입선출법\n- 회사 적용 방법: 총평균법\n- 선입선출법 기말재고: 100,000,000원\n- 총평균법 기말재고: 95,000,000원\n- 순실현가능가치: 92,000,000원\n\n다음 순서로 풀이해주세요:\n1. 평가방법 적정성 검토\n2. 평가금액 차이 분석\n3. 저가법 적용 검토\n4. 세무조정\n5. 검산 및 확인' },
    { id: 18, topic: 'tax-adjustment', question: '합병 시 세무조정 종합문제를 풀어보시오.', answer: '적격합병 요건을 검토하고 승계자산의 세무조정을 수행한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 다음 합병거래에 대해 세무조정을 하시오.\n\n[자료]\n- 피합병법인 순자산 시가: 500,000,000원\n- 피합병법인 순자산 장부가액: 400,000,000원\n- 합병대가(신주): 500,000,000원\n- 적격합병 요건: 충족\n\n다음 순서로 풀이해주세요:\n1. 적격합병 요건 검토\n2. 승계자산 취득가액\n3. 합병차익 처리\n4. 이월결손금 승계\n5. 세무조정계산서 작성' },

    // 답안작성법 (19-25)
    { id: 19, topic: 'answer-writing', question: '세무사 1차 객관식 문제 접근법을 설명하시오.', answer: '선지 분석, 소거법, 계산확인 순서로 접근한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 1차 시험 객관식 문제 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 유형별 분석\n2. 선지 소거법 활용\n3. 계산문제 검산법\n4. 시간 배분 전략\n5. 실전 예시 문제' },
    { id: 20, topic: 'answer-writing', question: '세무사 2차 논술형 답안 구조를 설명하시오.', answer: '쟁점정리, 법적근거, 판례검토, 결론의 순서로 작성한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 2차 시험 논술형 답안의 기본 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서론 작성법(쟁점 정리)\n2. 본론 전개법(법적 근거)\n3. 판례·학설 인용\n4. 결론 도출\n5. 모범답안 예시' },
    { id: 21, topic: 'answer-writing', question: '계산형 문제 답안 작성법을 설명하시오.', answer: '계산과정을 명확히 제시하고 단위와 항목명을 정확히 기재한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 시험 계산형 문제 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 과정 표시법\n2. 단위 기재 원칙\n3. 중간계산 정리\n4. 최종답 표시\n5. 검산 방법' },
    { id: 22, topic: 'answer-writing', question: '세무조정계산서 작성요령을 설명하시오.', answer: '익금산입·손금불산입, 손금산입·익금불산입을 구분하여 기재한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무조정계산서 작성요령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조정계산서 양식\n2. 익금산입·손금불산입\n3. 손금산입·익금불산입\n4. 소득처분\n5. 작성 예시' },
    { id: 23, topic: 'answer-writing', question: '부분점수 획득 전략을 설명하시오.', answer: '완전한 답을 모르더라도 알고 있는 내용을 체계적으로 작성한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 시험에서 부분점수 획득 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채점 기준 이해\n2. 키워드 포함 전략\n3. 논리 구조 유지\n4. 부분 계산 제시\n5. 시간 관리' },
    { id: 24, topic: 'answer-writing', question: '오답 방지 체크리스트를 설명하시오.', answer: '문제조건 확인, 계산검산, 답안 형식을 점검한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 시험 오답 방지 체크리스트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 조건 재확인\n2. 계산 과정 검산\n3. 단위 확인\n4. 답안 형식 점검\n5. 시간 여유 확보' },
    { id: 25, topic: 'answer-writing', question: '시험 당일 실전 전략을 설명하시오.', answer: '시간배분, 문제선택, 컨디션관리를 철저히 한다.', prompt: '세무사 실무연습 문제입니다.\n\n문제: 세무사 시험 당일 실전 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시간 배분 계획\n2. 문제 선택 순서\n3. 컨디션 관리\n4. 돌발상황 대처\n5. 마무리 점검' },
  ];

  const topics = [
    { id: 'calculation', name: '계산문제연습', count: 10 },
    { id: 'tax-adjustment', name: '세무조정실습', count: 8 },
    { id: 'answer-writing', name: '답안작성법', count: 7 },
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
            <span className="text-emerald-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 실무연습</h1>
          <p className="text-gray-600">세무사 시험 실전 대비 | 계산 및 세무조정</p>
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
          <Link href="/category/accounting/tax-accountant/study/tax-law-advanced" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 세법학 심화</Link>
          <Link href="/category/accounting/tax-accountant" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">세무사 메인으로 →</Link>
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
