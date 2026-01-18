'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FundBasicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['basic-concept']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fund-advisor-basics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('fund-advisor-basics-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 펀드 기초개념 (1-5)
    { id: 1, topic: 'basic-concept', question: '펀드(집합투자)의 정의와 법적 성격을 설명하시오.', answer: '2인 이상 투자자로부터 금전 모집, 운용결과 배분', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드(집합투자)의 정의와 법적 성격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'basic-concept', question: '펀드투자의 특성과 직접투자 대비 장점을 설명하시오.', answer: '분산투자, 전문가운용, 소액투자 가능', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드투자의 특성과 직접투자 대비 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'basic-concept', question: '펀드투자의 단점과 위험요인을 설명하시오.', answer: '원금손실 가능, 보수비용 발생, 환매제한', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드투자의 단점과 위험요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'basic-concept', question: '펀드의 기준가격 산정 방법을 설명하시오.', answer: '순자산총액 / 수익증권총수, 1000좌 기준', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드의 기준가격 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'basic-concept', question: '펀드의 설정과 환매 절차를 설명하시오.', answer: '설정: 자금납입→수익증권발행, 환매: 환매청구→대금지급', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드의 설정과 환매 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

    // 펀드의 종류 (6-10)
    { id: 6, topic: 'fund-types', question: '주식형펀드의 특성과 투자전략을 설명하시오.', answer: '주식 60% 이상 투자, 고수익고위험', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 주식형펀드의 특성과 투자전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'fund-types', question: '채권형펀드의 특성과 투자위험을 설명하시오.', answer: '채권 60% 이상 투자, 금리위험 노출', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 채권형펀드의 특성과 투자위험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'fund-types', question: '혼합형펀드의 유형과 특성을 설명하시오.', answer: '주식혼합형(50% 미만), 채권혼합형', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 혼합형펀드의 유형과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'fund-types', question: 'MMF(머니마켓펀드)의 특성과 규제를 설명하시오.', answer: '단기금융상품 투자, 당일환매 가능', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: MMF(머니마켓펀드)의 특성과 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'fund-types', question: '개방형펀드와 폐쇄형펀드의 차이를 설명하시오.', answer: '개방형: 수시환매, 폐쇄형: 만기환매', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 개방형펀드와 폐쇄형펀드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

    // 펀드의 구조 (11-15)
    { id: 11, topic: 'fund-structure', question: '집합투자업자의 역할과 의무를 설명하시오.', answer: '자산운용 담당, 선관주의의무, 충실의무', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 집합투자업자의 역할과 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'fund-structure', question: '신탁업자의 역할과 감시기능을 설명하시오.', answer: '자산보관, 운용지시 실행, 운용행위 감시', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 신탁업자의 역할과 감시기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'fund-structure', question: '판매회사의 역할과 책임을 설명하시오.', answer: '투자권유, 설명의무, 적합성원칙 준수', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 판매회사의 역할과 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'fund-structure', question: '일반사무관리회사의 역할을 설명하시오.', answer: '기준가격 산정, 회계장부 작성, 보고서 발송', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 일반사무관리회사의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'fund-structure', question: '펀드 보수와 수수료의 종류를 설명하시오.', answer: '운용보수, 판매보수, 수탁보수, 환매수수료', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드 보수와 수수료의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

    // 펀드 운용전략 (16-20)
    { id: 16, topic: 'fund-strategy', question: '액티브 운용전략의 특성과 종류를 설명하시오.', answer: '벤치마크 초과수익 추구, 종목선정/마켓타이밍', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 액티브 운용전략의 특성과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'fund-strategy', question: '패시브(인덱스) 운용전략을 설명하시오.', answer: '지수 추종, 낮은 보수, 추적오차 관리', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 패시브(인덱스) 운용전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'fund-strategy', question: '가치투자와 성장투자 전략을 비교 설명하시오.', answer: '가치: 저평가종목, 성장: 이익성장 기대종목', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 가치투자와 성장투자 전략을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'fund-strategy', question: '탑다운과 바텀업 접근법을 설명하시오.', answer: '탑다운: 거시경제→업종→종목, 바텀업: 개별종목분석', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 탑다운과 바텀업 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'fund-strategy', question: '채권펀드의 듀레이션 전략을 설명하시오.', answer: '금리예측에 따른 듀레이션 조절', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 채권펀드의 듀레이션 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

    // 펀드 성과평가 (21-25)
    { id: 21, topic: 'fund-performance', question: '펀드 수익률의 종류와 계산방법을 설명하시오.', answer: '기간수익률, 연환산수익률, 복리수익률', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 펀드 수익률의 종류와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 22, topic: 'fund-performance', question: '샤프지수의 의미와 계산방법을 설명하시오.', answer: '(펀드수익률-무위험이자율)/표준편차', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 샤프지수의 의미와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 23, topic: 'fund-performance', question: '트레이너 지수와 젠센알파를 설명하시오.', answer: '트레이너: 체계적위험 대비, 젠센: CAPM 초과수익', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 트레이너 지수와 젠센알파를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 24, topic: 'fund-performance', question: '벤치마크의 의미와 선정기준을 설명하시오.', answer: '성과비교 기준, 투자전략과 일관성', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 벤치마크의 의미와 선정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 25, topic: 'fund-performance', question: '정보비율과 추적오차를 설명하시오.', answer: '정보비율: 초과수익/추적오차, 추적오차: 수익률 편차', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 정보비율과 추적오차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

    // ETF와 특수펀드 (26-30)
    { id: 26, topic: 'etf-special', question: 'ETF의 구조와 특성을 설명하시오.', answer: '거래소 상장, 지정참가회사, 설정/환매단위', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: ETF의 구조와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 27, topic: 'etf-special', question: 'ETF와 일반펀드의 차이점을 설명하시오.', answer: '실시간 거래, NAV 괴리, 세제 차이', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: ETF와 일반펀드의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 28, topic: 'etf-special', question: '재간접펀드(Fund of Funds)의 특성을 설명하시오.', answer: '다른 펀드에 50% 이상 투자, 분산효과', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 재간접펀드(Fund of Funds)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 29, topic: 'etf-special', question: 'TDF(타겟데이트펀드)의 구조와 특성을 설명하시오.', answer: '목표시점 설정, 자동 자산배분 조정', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: TDF(타겟데이트펀드)의 구조와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
    { id: 30, topic: 'etf-special', question: '레버리지/인버스 ETF의 특성과 위험을 설명하시오.', answer: '기초지수 배수/역방향 추종, 복리효과 주의', prompt: '펀드투자권유자문인력 펀드일반 문제입니다.\n\n문제: 레버리지/인버스 ETF의 특성과 위험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'basic-concept', name: '펀드 기초개념', icon: '📚', count: 5 },
    { id: 'fund-types', name: '펀드의 종류', icon: '📊', count: 5 },
    { id: 'fund-structure', name: '펀드의 구조', icon: '🏛️', count: 5 },
    { id: 'fund-strategy', name: '펀드 운용전략', icon: '🎯', count: 5 },
    { id: 'fund-performance', name: '펀드 성과평가', icon: '📈', count: 5 },
    { id: 'etf-special', name: 'ETF와 특수펀드', icon: '💹', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/fund-advisor" className="text-gray-500 hover:text-gray-700">펀드투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">펀드일반</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📚</div>
            <div>
              <h1 className="text-2xl font-bold">펀드일반</h1>
              <p className="text-teal-100">펀드 기초개념, 종류, 구조, 운용전략, 성과평가</p>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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
          <Link href="/category/finance/fund-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 펀드투자권유자문인력
          </Link>
          <Link href="/category/finance/fund-advisor/study/fund-law-ethics" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            펀드법규윤리 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 펀드투자권유자문인력 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
