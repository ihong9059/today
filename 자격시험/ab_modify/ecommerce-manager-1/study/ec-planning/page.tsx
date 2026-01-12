'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ECPlanningStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'ec-strategy',
      name: '전자상거래 전략',
      icon: '🎯',
      questions: [
        { id: 1, q: '전자상거래의 정의와 유형(B2B, B2C, C2C)을 설명하시오.', a: 'B2B: 기업간, B2C: 기업-소비자, C2C: 소비자간 거래' },
        { id: 2, q: 'O2O(Online to Offline) 비즈니스 모델을 설명하시오.', a: '온라인 주문 후 오프라인 체험/수령, 배달앱, 예약서비스' },
        { id: 3, q: '옴니채널 전략을 설명하시오.', a: '온/오프라인 채널 통합, 일관된 고객 경험 제공' },
        { id: 4, q: '플랫폼 비즈니스 모델을 설명하시오.', a: '공급자-소비자 연결, 네트워크 효과, 수수료 수익' },
        { id: 5, q: '구독경제(Subscription) 모델을 설명하시오.', a: '정기 결제 기반, 지속적 수익, 고객 락인 효과' },
        { id: 6, q: '라이브커머스의 특징을 설명하시오.', a: '실시간 방송+판매, 양방향 소통, 즉시 구매' },
        { id: 7, q: 'D2C(Direct to Consumer) 전략을 설명하시오.', a: '제조사 직접 판매, 중간 유통 배제, 브랜드 관계 강화' },
        { id: 8, q: '소셜커머스의 특징을 설명하시오.', a: 'SNS 기반 판매, 공동구매, 입소문 마케팅' },
        { id: 9, q: '크로스보더(Cross-border) 전자상거래를 설명하시오.', a: '국경 넘는 온라인 거래, 역직구/해외직구' },
        { id: 10, q: '리테일테크의 주요 기술을 설명하시오.', a: 'AI 추천, AR/VR, 무인매장, 스마트물류' }
      ]
    },
    {
      id: 'marketing',
      name: '디지털 마케팅',
      icon: '📣',
      questions: [
        { id: 1, q: '디지털 마케팅의 4P와 4C를 비교하시오.', a: '4P: Product/Price/Place/Promotion, 4C: 고객가치/비용/편의/소통' },
        { id: 2, q: 'SEO(검색엔진최적화)를 설명하시오.', a: '검색 결과 상위 노출, 키워드/콘텐츠/링크 최적화' },
        { id: 3, q: 'SEM(검색엔진마케팅)을 설명하시오.', a: '유료 검색광고, CPC/CPM 과금, 키워드 입찰' },
        { id: 4, q: '리타겟팅(Retargeting) 광고를 설명하시오.', a: '방문자 재타겟팅, 쿠키 기반, 전환율 향상' },
        { id: 5, q: '콘텐츠 마케팅 전략을 설명하시오.', a: '유용한 콘텐츠 제공, 신뢰 구축, 자연스러운 유입' },
        { id: 6, q: '인플루언서 마케팅을 설명하시오.', a: 'SNS 영향력자 활용, 팔로워 신뢰, 브랜드 인지도' },
        { id: 7, q: '퍼포먼스 마케팅을 설명하시오.', a: '성과 기반 광고, ROAS/CPA 측정, 데이터 드리븐' },
        { id: 8, q: '이메일 마케팅의 핵심 지표를 설명하시오.', a: '오픈율, 클릭률, 전환율, 구독해지율' },
        { id: 9, q: '고객여정(Customer Journey) 분석을 설명하시오.', a: '인지-고려-구매-충성 단계별 터치포인트 분석' },
        { id: 10, q: 'A/B 테스트의 활용을 설명하시오.', a: '두 버전 비교 실험, 전환율 최적화, 가설 검증' }
      ]
    },
    {
      id: 'business-plan',
      name: '사업계획',
      icon: '📋',
      questions: [
        { id: 1, q: '전자상거래 사업계획서의 구성요소를 설명하시오.', a: '사업개요, 시장분석, 마케팅, 운영계획, 재무계획' },
        { id: 2, q: 'SWOT 분석을 설명하시오.', a: '강점/약점/기회/위협 분석, 전략 도출' },
        { id: 3, q: 'STP 전략을 설명하시오.', a: 'Segmentation(세분화), Targeting(타겟팅), Positioning(포지셔닝)' },
        { id: 4, q: '비즈니스 모델 캔버스를 설명하시오.', a: '9개 블록: 가치제안, 고객, 채널, 수익원 등' },
        { id: 5, q: 'MVP(Minimum Viable Product)를 설명하시오.', a: '최소 기능 제품, 빠른 시장 검증, 린스타트업' },
        { id: 6, q: '손익분기점(BEP) 분석을 설명하시오.', a: '고정비/(판매가-변동비), 수익성 판단 기준' },
        { id: 7, q: 'CAC와 LTV의 관계를 설명하시오.', a: 'CAC: 고객획득비용, LTV: 고객생애가치, LTV>CAC 필요' },
        { id: 8, q: 'KPI 설정 방법을 설명하시오.', a: 'SMART 원칙, 매출/전환율/재방문율 등 핵심 지표' },
        { id: 9, q: '린캔버스의 구성요소를 설명하시오.', a: '문제, 솔루션, 핵심지표, 가치제안, 경쟁우위 등' },
        { id: 10, q: '피보팅(Pivoting) 전략을 설명하시오.', a: '사업 방향 전환, 시장 피드백 반영, 성장 전략' }
      ]
    },
    {
      id: 'market-analysis',
      name: '시장분석',
      icon: '📊',
      questions: [
        { id: 1, q: '국내 전자상거래 시장 규모와 트렌드를 설명하시오.', a: '200조원 이상, 모바일커머스 성장, 라이브커머스 확대' },
        { id: 2, q: '경쟁사 분석 방법을 설명하시오.', a: '5 Forces 분석, 벤치마킹, 포지셔닝 맵' },
        { id: 3, q: '고객 페르소나를 설명하시오.', a: '가상 이상적 고객 프로필, 인구통계/행동/니즈' },
        { id: 4, q: '시장 세분화 기준을 설명하시오.', a: '인구통계적, 지리적, 심리적, 행동적 세분화' },
        { id: 5, q: 'TAM/SAM/SOM을 설명하시오.', a: 'TAM: 전체시장, SAM: 유효시장, SOM: 획득시장' },
        { id: 6, q: '블루오션 전략을 설명하시오.', a: '경쟁 없는 새 시장 창출, 가치혁신, 차별화+저비용' },
        { id: 7, q: '트렌드 분석 방법을 설명하시오.', a: '빅데이터 분석, 소셜 리스닝, 검색어 분석' },
        { id: 8, q: '가격 전략의 종류를 설명하시오.', a: '침투가격, 스키밍, 경쟁가격, 가치기반 가격' },
        { id: 9, q: 'PEST 분석을 설명하시오.', a: '정치/경제/사회/기술 환경 분석' },
        { id: 10, q: '포터의 5 Forces 모델을 설명하시오.', a: '기존경쟁, 신규진입, 대체재, 공급자/구매자 교섭력' }
      ]
    },
    {
      id: 'revenue-model',
      name: '수익모델',
      icon: '💰',
      questions: [
        { id: 1, q: '전자상거래의 수익모델 유형을 설명하시오.', a: '판매수익, 수수료, 광고, 구독료, 데이터 판매' },
        { id: 2, q: '마진율 계산 방법을 설명하시오.', a: '(매출-원가)/매출×100, 매출총이익률' },
        { id: 3, q: '객단가 향상 전략을 설명하시오.', a: '업셀링, 크로스셀링, 번들링, 무료배송 기준' },
        { id: 4, q: '재구매율 향상 전략을 설명하시오.', a: '멤버십, 포인트, 리마케팅, CRM, 고객경험 개선' },
        { id: 5, q: 'GMV와 매출의 차이를 설명하시오.', a: 'GMV: 총거래액, 매출: 실제수익(수수료 등)' },
        { id: 6, q: '플랫폼 수수료 구조를 설명하시오.', a: '판매수수료, 결제수수료, 광고수수료, 입점비' },
        { id: 7, q: '프리미엄(Freemium) 모델을 설명하시오.', a: '기본 무료+유료 프리미엄, 전환율 중요' },
        { id: 8, q: '광고 수익모델의 종류를 설명하시오.', a: 'CPM, CPC, CPA, CPS, 고정광고비' },
        { id: 9, q: '데이터 기반 수익모델을 설명하시오.', a: '고객데이터 분석/판매, 맞춤광고, 인사이트 제공' },
        { id: 10, q: 'ROI와 ROAS의 차이를 설명하시오.', a: 'ROI: 투자수익률, ROAS: 광고비 대비 매출' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ec-planning-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ec-planning-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `전자상거래관리사 1급 전자상거래 기획 과목 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명
3. 실무 적용 사례
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-indigo-600">전자상거래관리사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">전자상거래 기획</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📊</span></div>
              <div>
                <h1 className="text-2xl font-bold">전자상거래 기획</h1>
                <p className="text-indigo-200">전자상거래관리사 1급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-indigo-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map(q => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.q}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                              >
                                🤖 AI에게 질문하기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/category/office/ecommerce-1" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">← 메인으로</Link>
          <Link href="/category/office/ecommerce-1/study/ec-operation" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">전자상거래 운영관리 →</Link>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
