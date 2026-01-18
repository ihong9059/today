'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SecuritiesAnalysisStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['fundamental-basics']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('securities-advisor-analysis-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('securities-advisor-analysis-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 기본적 분석 기초 (1-5)
    { id: 1, topic: 'fundamental-basics', question: '거시경제 분석의 주요 지표와 증시 영향을 설명하시오.', answer: 'GDP, 금리, 환율, 물가 등이 증시에 미치는 영향', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 거시경제 분석의 주요 지표와 증시 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'fundamental-basics', question: '경기순환과 주식시장의 관계를 설명하시오.', answer: '회복기-확장기-후퇴기-침체기 순환과 선행성', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 경기순환과 주식시장의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'fundamental-basics', question: '산업분석의 방법과 산업수명주기를 설명하시오.', answer: '도입기-성장기-성숙기-쇠퇴기, 포터의 5가지 경쟁요인', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 산업분석의 방법과 산업수명주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'fundamental-basics', question: '기업분석의 정성적 분석 요소를 설명하시오.', answer: '경영진 역량, 기업지배구조, 브랜드가치, 경쟁우위', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 기업분석의 정성적 분석 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'fundamental-basics', question: '탑다운과 바텀업 분석 접근법을 비교 설명하시오.', answer: '탑다운: 거시경제→산업→기업, 바텀업: 개별기업 중심', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 탑다운과 바텀업 분석 접근법을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },

    // 재무제표 분석 (6-10)
    { id: 6, topic: 'financial-statement', question: '수익성 비율의 종류와 계산방법을 설명하시오.', answer: 'ROE, ROA, 매출이익률, 영업이익률 등', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 수익성 비율의 종류와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'financial-statement', question: '안정성 비율의 종류와 의미를 설명하시오.', answer: '부채비율, 유동비율, 당좌비율, 이자보상배율', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 안정성 비율의 종류와 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'financial-statement', question: '활동성 비율과 회전율 분석을 설명하시오.', answer: '총자산회전율, 재고자산회전율, 매출채권회전율', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 활동성 비율과 회전율 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'financial-statement', question: '듀폰분석(ROE 분해)을 설명하시오.', answer: 'ROE = 순이익률 x 총자산회전율 x 재무레버리지', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 듀폰분석(ROE 분해)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'financial-statement', question: '현금흐름표 분석과 FCF(잉여현금흐름)를 설명하시오.', answer: '영업/투자/재무활동 현금흐름, FCF = OCF - CAPEX', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 현금흐름표 분석과 FCF(잉여현금흐름)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },

    // 기업가치 평가 (11-15)
    { id: 11, topic: 'valuation', question: 'PER(주가수익비율)의 의미와 활용을 설명하시오.', answer: 'PER = 주가/EPS, 상대가치평가 지표', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: PER(주가수익비율)의 의미와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'valuation', question: 'PBR(주가순자산비율)의 의미와 한계를 설명하시오.', answer: 'PBR = 주가/BPS, 자산가치 대비 평가', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: PBR(주가순자산비율)의 의미와 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'valuation', question: 'EV/EBITDA의 의미와 활용을 설명하시오.', answer: '기업가치/세전영업이익, 자본구조 중립적 평가', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: EV/EBITDA의 의미와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'valuation', question: 'DCF(현금흐름할인법) 모형을 설명하시오.', answer: '미래현금흐름의 현재가치 합계로 기업가치 산정', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: DCF(현금흐름할인법) 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'valuation', question: '배당할인모형(DDM)과 적정주가 산출을 설명하시오.', answer: '주가 = D1/(r-g), 배당의 현재가치 합계', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 배당할인모형(DDM)과 적정주가 산출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },

    // 기술적 분석 (16-20)
    { id: 16, topic: 'technical-analysis', question: '기술적 분석의 기본 가정과 원리를 설명하시오.', answer: '시장가격에 모든 정보 반영, 추세지속, 역사반복', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 기술적 분석의 기본 가정과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'technical-analysis', question: '추세선과 채널 분석을 설명하시오.', answer: '상승/하락 추세선, 지지선과 저항선 연결', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 추세선과 채널 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'technical-analysis', question: '지지선과 저항선의 개념과 활용을 설명하시오.', answer: '가격 하락 저지 수준, 상승 저지 수준', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 지지선과 저항선의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'technical-analysis', question: '주요 차트 패턴(머리어깨, 삼각형 등)을 설명하시오.', answer: '반전형 패턴, 지속형 패턴의 종류와 특징', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 주요 차트 패턴(머리어깨, 삼각형 등)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'technical-analysis', question: '이동평균선 분석과 매매신호를 설명하시오.', answer: '단기/장기 이동평균, 골든크로스/데드크로스', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 이동평균선 분석과 매매신호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },

    // 포트폴리오 이론 (21-25)
    { id: 21, topic: 'portfolio-theory', question: '분산투자의 원리와 위험감소 효과를 설명하시오.', answer: '비체계적 위험 감소, 상관관계와 분산효과', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 분산투자의 원리와 위험감소 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 22, topic: 'portfolio-theory', question: 'CAPM(자본자산가격결정모형)을 설명하시오.', answer: 'E(Ri) = Rf + βi(Rm-Rf), 체계적 위험 보상', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: CAPM(자본자산가격결정모형)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 23, topic: 'portfolio-theory', question: '베타(체계적 위험)의 의미와 계산을 설명하시오.', answer: '시장수익률 변동에 대한 개별자산 민감도', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 베타(체계적 위험)의 의미와 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 24, topic: 'portfolio-theory', question: '효율적 투자선과 최적 포트폴리오 선택을 설명하시오.', answer: '동일 위험 대비 최대수익률 포트폴리오 집합', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 효율적 투자선과 최적 포트폴리오 선택을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
    { id: 25, topic: 'portfolio-theory', question: '자산배분 전략의 종류와 방법을 설명하시오.', answer: '전략적/전술적 자산배분, 리밸런싱', prompt: '증권투자권유자문인력 증권분석 문제입니다.\n\n문제: 자산배분 전략의 종류와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'fundamental-basics', name: '기본적 분석 기초', icon: '📊', count: 5 },
    { id: 'financial-statement', name: '재무제표 분석', icon: '📋', count: 5 },
    { id: 'valuation', name: '기업가치 평가', icon: '💰', count: 5 },
    { id: 'technical-analysis', name: '기술적 분석', icon: '📈', count: 5 },
    { id: 'portfolio-theory', name: '포트폴리오 이론', icon: '📁', count: 5 },
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
            <Link href="/category/finance/securities-advisor" className="text-gray-500 hover:text-gray-700">증권투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">증권분석</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">증권분석</h1>
              <p className="text-green-100">기본적 분석, 재무제표, 기업가치 평가, 기술적 분석, 포트폴리오 이론</p>
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
          <Link href="/category/finance/securities-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 증권투자권유자문인력
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 증권투자권유자문인력 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
