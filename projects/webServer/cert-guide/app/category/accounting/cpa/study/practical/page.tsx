'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['writing']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-practical-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-practical-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 답안작성법 (1-8)
    { id: 1, topic: 'writing', question: '재무회계 2차 시험 답안 작성 전략을 설명하시오.', answer: '분개+설명 병기, 계산과정 명시, 시간배분', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 재무회계 답안 작성 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시간배분 전략\n2. 분개 작성법\n3. 계산과정 표시\n4. 부분점수 확보법\n5. 실전 연습방법' },
    { id: 2, topic: 'writing', question: '원가관리회계 계산문제 풀이 전략을 설명하시오.', answer: '공식 제시, 대입, 계산과정 단계별 표시', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 원가관리회계 풀이 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 유형 분석\n2. 공식 활용법\n3. 계산 실수 방지\n4. 검산 방법\n5. 고득점 전략' },
    { id: 3, topic: 'writing', question: '세무회계 세무조정 답안 작성법을 설명하시오.', answer: '세무조정계산서 형식, 소득처분 명시', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 세무조정 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세무조정 계산서 양식\n2. 소득처분 표시\n3. 세액계산 순서\n4. 법조문 인용\n5. 주의사항' },
    { id: 4, topic: 'writing', question: '회계감사 논술형 답안 구조를 설명하시오.', answer: '서론-본론-결론, 감사기준서 인용', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 회계감사 논술 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 논술형 답안 구조\n2. 감사기준서 인용법\n3. 논리전개 방법\n4. 결론 도출\n5. 분량 조절' },
    { id: 5, topic: 'writing', question: '연결재무제표 문제 접근법을 설명하시오.', answer: '취득일 분석→연결조정분개→미실현손익', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 연결재무제표 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지배력 판단\n2. 취득일 분석\n3. 연결조정분개 순서\n4. NCI 처리\n5. 검증 방법' },
    { id: 6, topic: 'writing', question: '금융상품 회계처리 문제 풀이법을 설명하시오.', answer: '분류 판단→최초측정→후속측정→분개', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 금융상품 풀이법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 기준 적용\n2. 유효이자율 계산\n3. 손상 처리\n4. 위험회피회계\n5. 실전 팁' },
    { id: 7, topic: 'writing', question: '2차 시험 시간관리 전략을 설명하시오.', answer: '문항별 시간배분, 쉬운 문제 우선', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 시간관리 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과목별 시간배분\n2. 문항 선택 전략\n3. 시간 부족시 대응\n4. 마무리 점검\n5. 멘탈 관리' },
    { id: 8, topic: 'writing', question: '모의고사 활용법을 설명하시오.', answer: '실전 환경, 시간측정, 오답분석', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 모의고사 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모의고사 선택\n2. 실전 환경 조성\n3. 채점 및 분석\n4. 약점 보완\n5. 복습 주기' },

    // 핵심 계산연습 (9-17)
    { id: 9, topic: 'calculation', question: '유효이자율 계산 연습문제를 풀이하시오.', answer: '현재가치 = 미래현금흐름 할인, 시행착오법', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 사채 액면 1,000,000원, 표시이자율 8%, 만기 3년, 발행가액 951,963원. 유효이자율을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 현금흐름 분석\n2. 현재가치 공식\n3. 유효이자율 산출\n4. 상각표 작성\n5. 유사 연습문제 3개' },
    { id: 10, topic: 'calculation', question: 'CVP 분석 계산 연습문제를 풀이하시오.', answer: '손익분기점 = 고정비 / 공헌이익률', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 판매가 10,000원, 변동비 6,000원, 고정비 8,000,000원. 손익분기 매출액과 목표이익 2,000,000원 달성 판매량을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 공헌이익 계산\n2. 손익분기점\n3. 목표이익 판매량\n4. 안전한계율\n5. 유사 연습문제 3개' },
    { id: 11, topic: 'calculation', question: '연결조정분개 계산 연습문제를 풀이하시오.', answer: '투자계정 상계, 영업권 산출', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: P사가 S사 지분 80%를 800,000원에 취득. S사 순자산 장부금액 900,000원, 공정가치 950,000원. 연결조정분개를 작성하시오.\n\n다음 순서로 풀이해주세요:\n1. 영업권 계산\n2. 비지배지분 측정\n3. 투자계정 상계분개\n4. 순자산 조정분개\n5. 유사 연습문제 3개' },
    { id: 12, topic: 'calculation', question: '표준원가 차이분석 연습문제를 풀이하시오.', answer: '가격차이, 능률차이, 조업도차이', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 표준: 재료 2kg@500원, 실제: 2.2kg@480원, 생산량 100단위. 재료비 차이를 분석하시오.\n\n다음 순서로 풀이해주세요:\n1. 가격차이\n2. 수량차이\n3. 총차이 검증\n4. 차이 원인 분석\n5. 유사 연습문제 3개' },
    { id: 13, topic: 'calculation', question: '법인세 세무조정 계산 연습문제를 풀이하시오.', answer: '익금산입, 손금불산입, 소득처분', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 접대비 지출 50,000,000원, 수입금액 10억원. 접대비 한도와 손금불산입액을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 기본한도\n2. 수입금액 기준 한도\n3. 총한도액\n4. 손금불산입액\n5. 유사 연습문제 3개' },
    { id: 14, topic: 'calculation', question: '리스회계 계산 연습문제를 풀이하시오.', answer: '사용권자산, 리스부채 현재가치', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 연간 리스료 1,000,000원, 5년, 내재이자율 10%. 사용권자산과 리스부채를 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 리스부채 현재가치\n2. 사용권자산 측정\n3. 연간 분개\n4. 상각표 작성\n5. 유사 연습문제 3개' },
    { id: 15, topic: 'calculation', question: '주당이익 계산 연습문제를 풀이하시오.', answer: '기본EPS, 희석EPS', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 당기순이익 100억원, 기초 보통주 1,000만주, 7월 유상증자 200만주, 전환사채 액면 10억원(전환가격 5,000원). 주당이익을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 가중평균주식수\n2. 기본주당이익\n3. 희석주당이익\n4. 반희석 판단\n5. 유사 연습문제 3개' },
    { id: 16, topic: 'calculation', question: '이연법인세 계산 연습문제를 풀이하시오.', answer: '일시적차이, 이연법인세자산/부채', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 감가상각 회계상 200, 세무상 150, 세율 25%. 이연법인세를 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 일시적차이 분석\n2. 가산/차감 판단\n3. 이연법인세 계산\n4. 분개 작성\n5. 유사 연습문제 3개' },
    { id: 17, topic: 'calculation', question: '확정급여제도 계산 연습문제를 풀이하시오.', answer: '확정급여채무, 사외적립자산, 순확정급여부채', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 기초 확정급여채무 1,000, 당기근무원가 100, 이자원가 50, 보험수리적손실 30. 기말 확정급여채무를 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 확정급여채무 변동\n2. 사외적립자산 변동\n3. 순이자원가\n4. 재측정요소\n5. 유사 연습문제 3개' },

    // 기출 유형 분석 (18-25)
    { id: 18, topic: 'past', question: '최근 3년 재무회계 출제경향을 분석하시오.', answer: '연결회계, 금융상품, 수익인식 고정출제', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 재무회계 출제경향을 분석하시오.\n\n다음 순서로 분석해주세요:\n1. 최근 3년 주요 출제 주제\n2. 문항별 배점 분석\n3. 난이도 변화\n4. 예상 출제 영역\n5. 대비 전략' },
    { id: 19, topic: 'past', question: '원가관리회계 자주 출제되는 유형을 정리하시오.', answer: 'CVP, 표준원가, 의사결정, 성과평가', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 원가관리회계 출제유형을 정리하시오.\n\n다음 순서로 정리해주세요:\n1. 매회 출제 유형\n2. 자주 출제 유형\n3. 간헐 출제 유형\n4. 고난도 유형\n5. 대비 전략' },
    { id: 20, topic: 'past', question: '세무회계 핵심 출제영역을 정리하시오.', answer: '법인세 세무조정, 소득세, 부가가치세', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 세무회계 출제영역을 정리하시오.\n\n다음 순서로 정리해주세요:\n1. 법인세 핵심 주제\n2. 소득세 핵심 주제\n3. 부가가치세 핵심 주제\n4. 조세절차법\n5. 대비 전략' },
    { id: 21, topic: 'past', question: '회계감사 논술 출제패턴을 분석하시오.', answer: '감사의견, 내부통제, 감사증거', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 회계감사 출제패턴을 분석하시오.\n\n다음 순서로 분석해주세요:\n1. 논술형 출제 주제\n2. 사례형 문제 유형\n3. 감사기준서 인용\n4. 답안 분량\n5. 대비 전략' },
    { id: 22, topic: 'past', question: '연결재무제표 기출 유형을 정리하시오.', answer: '취득일 분석, 내부거래, 지분변동', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 연결회계 기출유형을 정리하시오.\n\n다음 순서로 정리해주세요:\n1. 취득일 회계 문제\n2. 내부거래 제거\n3. 지분변동 문제\n4. 지분법 문제\n5. 대비 전략' },
    { id: 23, topic: 'past', question: '금융상품 기출 유형을 정리하시오.', answer: '분류와 측정, 손상, 위험회피회계', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 금융상품 기출유형을 정리하시오.\n\n다음 순서로 정리해주세요:\n1. 분류 문제\n2. 손상 문제\n3. 파생상품 문제\n4. 위험회피 문제\n5. 대비 전략' },
    { id: 24, topic: 'past', question: '수익인식 기출 유형을 정리하시오.', answer: '5단계 적용, 변동대가, 기간인식', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 수익인식 기출유형을 정리하시오.\n\n다음 순서로 정리해주세요:\n1. 5단계 모형 적용\n2. 변동대가 문제\n3. 라이선스 수익\n4. 건설계약\n5. 대비 전략' },
    { id: 25, topic: 'past', question: '고득점 합격생의 학습 전략을 분석하시오.', answer: '기본서 정독, 기출분석, 모의고사', prompt: '공인회계사 2차 실무연습 문제입니다.\n\n문제: 고득점 합격 전략을 분석하시오.\n\n다음 순서로 분석해주세요:\n1. 과목별 학습량 배분\n2. 기본서 활용법\n3. 기출문제 분석법\n4. 모의고사 활용\n5. 최종 마무리 전략' },
  ];

  const topics = [
    { id: 'writing', name: '답안작성법', icon: '✍️', count: 8 },
    { id: 'calculation', name: '핵심계산연습', icon: '🧮', count: 9 },
    { id: 'past', name: '기출유형분석', icon: '📊', count: 8 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/accounting/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">실무연습</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-rose-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">✍️</div>
            <div>
              <h1 className="text-2xl font-bold">실무연습</h1>
              <p className="text-rose-100">2차 시험 대비 | 답안작성, 계산연습, 기출분석</p>
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
        <div className="grid grid-cols-3 gap-3 mb-6">
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
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/cpa/study/financial-accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 재무회계(2차)
          </Link>
          <Link href="/category/accounting/cpa" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
            메인으로 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 2차 시험 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
