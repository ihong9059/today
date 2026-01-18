'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function DevelopmentalPsychologyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-3-developmental-psychology-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-3-developmental-psychology-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentPrompt(`청소년상담사 3급 시험 대비 질문입니다.\n\n${question}\n\n상세하게 설명해주세요.`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '발달의 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '발달의 정의와 발달심리학의 연구 목적을 설명하시오.' },
        { id: 2, q: '발달의 원리(연속성, 방향성, 개인차, 상호작용)를 설명하시오.' },
        { id: 3, q: '유전과 환경의 상호작용에 대한 관점을 설명하시오.' },
        { id: 4, q: '발달연구 방법(횡단, 종단, 계열)의 특징과 장단점을 설명하시오.' },
        { id: 5, q: '결정적 시기와 민감기의 개념을 설명하시오.' },
        { id: 6, q: '발달과업(Havighurst)의 개념과 청소년기 발달과업을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: 'Freud의 심리성적 발달이론',
      icon: '🧠',
      questions: [
        { id: 7, q: 'Freud의 성격구조(원초아, 자아, 초자아)를 설명하시오.' },
        { id: 8, q: 'Freud의 심리성적 발달 5단계(구강기~생식기)를 설명하시오.' },
        { id: 9, q: '고착과 퇴행의 개념을 설명하시오.' },
        { id: 10, q: '오이디푸스 콤플렉스와 엘렉트라 콤플렉스를 설명하시오.' },
        { id: 11, q: 'Freud 이론의 한계점과 현대 심리학에서의 평가를 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: 'Erikson의 심리사회적 발달이론',
      icon: '👥',
      questions: [
        { id: 12, q: 'Erikson 이론의 특징과 Freud 이론과의 차이점을 설명하시오.' },
        { id: 13, q: 'Erikson의 심리사회적 발달 8단계를 설명하시오.' },
        { id: 14, q: '영아기(신뢰감 vs 불신감)의 발달 특성과 중요성을 설명하시오.' },
        { id: 15, q: '유아기(자율성, 주도성)의 발달과업을 설명하시오.' },
        { id: 16, q: '청소년기 자아정체감 발달의 특성과 정체감 혼미를 설명하시오.' },
        { id: 17, q: 'Marcia의 정체감 지위 4가지를 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: 'Piaget의 인지발달이론',
      icon: '💡',
      questions: [
        { id: 18, q: 'Piaget 이론의 핵심 개념(도식, 동화, 조절, 평형)을 설명하시오.' },
        { id: 19, q: '감각운동기의 특징과 대상영속성 발달을 설명하시오.' },
        { id: 20, q: '전조작기의 특징(자기중심성, 물활론, 비가역성)을 설명하시오.' },
        { id: 21, q: '구체적 조작기의 특징(보존개념, 분류, 서열화)을 설명하시오.' },
        { id: 22, q: '형식적 조작기의 특징(추상적 사고, 가설연역적 사고)을 설명하시오.' },
        { id: 23, q: 'Piaget 이론의 교육적 시사점을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '도덕성 발달',
      icon: '⚖️',
      questions: [
        { id: 24, q: 'Piaget의 도덕성 발달 단계(타율적~자율적)를 설명하시오.' },
        { id: 25, q: 'Kohlberg의 도덕성 발달 6단계를 설명하시오.' },
        { id: 26, q: 'Kohlberg 이론에 대한 비판과 Gilligan의 배려 윤리를 설명하시오.' },
        { id: 27, q: '도덕성 발달에 영향을 미치는 요인을 설명하시오.' },
        { id: 28, q: '청소년기 도덕성 발달의 특성을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '청소년기 신체·인지 발달',
      icon: '🌱',
      questions: [
        { id: 29, q: '사춘기의 정의와 신체적 변화(1차, 2차 성징)를 설명하시오.' },
        { id: 30, q: '조숙과 만숙이 청소년 발달에 미치는 영향을 설명하시오.' },
        { id: 31, q: '청소년기 뇌 발달의 특성(전두엽, 가지치기)을 설명하시오.' },
        { id: 32, q: '청소년기 인지 발달 특성(형식적 조작, 이상주의)을 설명하시오.' },
        { id: 33, q: '청소년기 자기중심성(상상적 청중, 개인적 우화)을 설명하시오.' },
        { id: 34, q: '청소년기 도덕적 사고의 발달 특성을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '청소년기 사회·정서 발달',
      icon: '💚',
      questions: [
        { id: 35, q: '청소년기 자아개념 발달의 특성을 설명하시오.' },
        { id: 36, q: '청소년기 자아존중감의 변화와 영향 요인을 설명하시오.' },
        { id: 37, q: '청소년기 정서 발달의 특성(정서적 불안정)을 설명하시오.' },
        { id: 38, q: '청소년기 또래관계의 중요성과 특성을 설명하시오.' },
        { id: 39, q: '청소년기 이성관계와 성 발달을 설명하시오.' },
        { id: 40, q: '청소년기 부모-자녀 관계의 변화를 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '성인기 이후 발달',
      icon: '🌳',
      questions: [
        { id: 41, q: '성인초기의 발달과업(친밀감, 직업선택)을 설명하시오.' },
        { id: 42, q: '성인중기의 발달 특성과 중년의 위기를 설명하시오.' },
        { id: 43, q: '노년기의 신체적, 인지적 변화를 설명하시오.' },
        { id: 44, q: '노화에 대한 이론(활동이론, 분리이론)을 설명하시오.' },
        { id: 45, q: '성공적 노화의 개념과 요인을 설명하시오.' },
        { id: 46, q: 'Levinson의 성인발달 이론을 설명하시오.' },
        { id: 47, q: '애착이론(Bowlby, Ainsworth)의 핵심 개념을 설명하시오.' },
        { id: 48, q: '애착유형(안정, 불안정)과 이후 발달에의 영향을 설명하시오.' },
        { id: 49, q: 'Vygotsky의 사회문화적 인지발달이론을 설명하시오.' },
        { id: 50, q: '근접발달영역(ZPD)과 비계설정의 개념을 설명하시오.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare" className="hover:text-gray-700">복지·상담</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare/youth-counselor-3" className="hover:text-gray-700">청소년상담사 3급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">발달심리</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🌱</span>
            <h1 className="text-2xl font-bold">발달심리</h1>
          </div>
          <p className="text-emerald-100">25문항 | 핵심 예상문제 50선</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">학습 진도</span>
            <span className="text-sm font-medium text-emerald-600">{completedQuestions.length}/{totalQuestions} 완료 ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.length}문제</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-emerald-600">
                    {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                  </span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedTopic === topic.id && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((question) => (
                    <div key={question.id} className={`p-4 rounded-lg border ${completedQuestions.includes(question.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(question.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${completedQuestions.includes(question.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(question.id) && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800">{question.q}</p>
                          <button
                            onClick={() => openAIHelper(question.q)}
                            className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                          >
                            <span>🤖</span> AI에게 물어보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/category/welfare/youth-counselor-3" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            목록으로
          </Link>
          <Link href="/category/welfare/youth-counselor-3/study/group-counseling-basics" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            다음 과목
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition">
                  <span className="text-2xl">🟠</span>
                  <div><p className="font-medium">Claude</p><p className="text-sm text-gray-500">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition">
                  <span className="text-2xl">🟢</span>
                  <div><p className="font-medium">ChatGPT</p><p className="text-sm text-gray-500">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition">
                  <span className="text-2xl">🔵</span>
                  <div><p className="font-medium">Gemini</p><p className="text-sm text-gray-500">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">청소년상담사 3급 - 발달심리</p>
        </div>
      </footer>
    </div>
  );
}
