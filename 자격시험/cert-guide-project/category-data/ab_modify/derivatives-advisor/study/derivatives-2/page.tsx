'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Derivatives2StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['interest-rate-swap']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('derivatives-advisor-2-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('derivatives-advisor-2-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 금리스왑 (1-5)
    { id: 1, topic: 'interest-rate-swap', question: '금리스왑(IRS)의 정의와 기본 구조를 설명하시오.', answer: '고정금리와 변동금리 교환, 원금교환 없음', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 금리스왑(IRS)의 정의와 기본 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'interest-rate-swap', question: '금리스왑의 가격결정(스왑레이트) 원리를 설명하시오.', answer: '고정금리 현금흐름 현가 = 변동금리 현금흐름 현가', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 금리스왑의 가격결정(스왑레이트) 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'interest-rate-swap', question: '금리스왑의 활용 목적(헤지, 차익거래, 투기)을 설명하시오.', answer: '금리위험 헤지, 자금조달 비용 절감, 금리 전망 투자', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 금리스왑의 활용 목적(헤지, 차익거래, 투기)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'interest-rate-swap', question: '금리스왑의 평가와 시장가치 산출방법을 설명하시오.', answer: '할인현금흐름법, 고정금리채권-변동금리채권 가치 차이', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 금리스왑의 평가와 시장가치 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'interest-rate-swap', question: '베이시스 스왑과 오버나이트 인덱스 스왑(OIS)을 설명하시오.', answer: '베이시스: 서로 다른 변동금리 교환, OIS: 익일물 금리 기반', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 베이시스 스왑과 오버나이트 인덱스 스왑(OIS)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },

    // 통화스왑과 기타 스왑 (6-10)
    { id: 6, topic: 'currency-other-swap', question: '통화스왑(CRS)의 구조와 금리스왑과의 차이점을 설명하시오.', answer: '원금 교환 발생, 서로 다른 통화 금리 교환', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 통화스왑(CRS)의 구조와 금리스왑과의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'currency-other-swap', question: '통화스왑의 활용과 가격결정 원리를 설명하시오.', answer: '환위험 헤지, 외화자금 조달, 금리평가이론 기반', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 통화스왑의 활용과 가격결정 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'currency-other-swap', question: '상품스왑(Commodity Swap)의 구조와 활용을 설명하시오.', answer: '고정가격과 변동가격 교환, 원자재 가격 헤지', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 상품스왑(Commodity Swap)의 구조와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'currency-other-swap', question: '주식스왑(Equity Swap)의 구조와 특성을 설명하시오.', answer: '주식수익률과 금리/다른 수익률 교환', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 주식스왑(Equity Swap)의 구조와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'currency-other-swap', question: '스왑션(Swaption)의 종류와 활용을 설명하시오.', answer: '페이어/리시버 스왑션, 금리변동 옵션', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 스왑션(Swaption)의 종류와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },

    // 신용파생상품 (11-15)
    { id: 11, topic: 'credit-derivatives', question: '신용파생상품의 정의와 신용위험 이전 원리를 설명하시오.', answer: '신용위험을 기초자산으로 분리/거래', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 신용파생상품의 정의와 신용위험 이전 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'credit-derivatives', question: '신용부도스왑(CDS)의 구조와 가격결정을 설명하시오.', answer: '보장매입자 프리미엄 지급, 신용사건 시 보상', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 신용부도스왑(CDS)의 구조와 가격결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'credit-derivatives', question: '신용연계채권(CLN)의 구조와 투자위험을 설명하시오.', answer: '채권+CDS 매도 결합, 준거자산 신용위험 노출', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 신용연계채권(CLN)의 구조와 투자위험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'credit-derivatives', question: 'CDO(부채담보부증권)의 구조와 트랜치를 설명하시오.', answer: '자산풀 증권화, 선순위/중순위/후순위 트랜치', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: CDO(부채담보부증권)의 구조와 트랜치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'credit-derivatives', question: '신용파생상품의 신용사건 유형과 결제방식을 설명하시오.', answer: '파산/지급불이행/구조조정, 현금/실물결제', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 신용파생상품의 신용사건 유형과 결제방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },

    // 구조화상품 (16-20)
    { id: 16, topic: 'structured-products', question: 'ELS(주가연계증권)의 구조와 수익구조 유형을 설명하시오.', answer: '주가지수 연계, 스텝다운/녹인/녹아웃 구조', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: ELS(주가연계증권)의 구조와 수익구조 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'structured-products', question: 'ELS의 조기상환 조건과 만기상환 구조를 설명하시오.', answer: '기준일 주가 조건 충족 시 조기상환, 녹인 발생 시 원금손실', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: ELS의 조기상환 조건과 만기상환 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'structured-products', question: 'DLS(파생결합증권)의 기초자산 유형과 특성을 설명하시오.', answer: '금리/환율/원자재/신용 등 연계, ELS 외 기초자산', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: DLS(파생결합증권)의 기초자산 유형과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'structured-products', question: 'ELW(주식워런트증권)의 구조와 거래 특성을 설명하시오.', answer: '개별주식/지수 옵션 증권화, LP 호가 제시', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: ELW(주식워런트증권)의 구조와 거래 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'structured-products', question: '구조화상품의 발행자 위험과 투자자 보호제도를 설명하시오.', answer: '발행사 신용위험, 적합성원칙/설명의무 적용', prompt: '파생상품투자권유자문인력 파생상품 II 문제입니다.\n\n문제: 구조화상품의 발행자 위험과 투자자 보호제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 구조와 특성\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'interest-rate-swap', name: '금리스왑', icon: '💹', count: 5 },
    { id: 'currency-other-swap', name: '통화스왑과 기타 스왑', icon: '💱', count: 5 },
    { id: 'credit-derivatives', name: '신용파생상품', icon: '📊', count: 5 },
    { id: 'structured-products', name: '구조화상품', icon: '📈', count: 5 },
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
            <Link href="/category/finance/derivatives-advisor" className="text-gray-500 hover:text-gray-700">파생상품투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">파생상품 II</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💹</div>
            <div>
              <h1 className="text-2xl font-bold">파생상품 II</h1>
              <p className="text-violet-100">금리스왑, 통화스왑, 신용파생상품, 구조화상품</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-violet-100 border-2 border-violet-300'
                    : 'bg-white border border-gray-200 hover:border-violet-200'
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
                              ? 'bg-violet-500 border-violet-500 text-white'
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
                              className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition flex-shrink-0"
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
          <Link href="/category/finance/derivatives-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 파생상품투자권유자문인력
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 파생상품투자권유자문인력 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
