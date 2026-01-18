'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function CounselingTheoryPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-counseling-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-counseling-theory-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentPrompt(`청소년상담사 2급 시험 대비 질문입니다.\n\n${question}\n\n상세하게 설명해주세요.`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '상담이론 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '상담의 정의와 심리치료와의 차이점을 설명하시오.' },
        { id: 2, q: '상담의 기본 원리(수용, 공감, 진실성)를 각각 설명하시오.' },
        { id: 3, q: '효과적인 상담관계의 특성 5가지를 기술하시오.' },
        { id: 4, q: '상담자의 역할과 자질에 대해 설명하시오.' },
        { id: 5, q: '상담과정의 일반적 단계(초기-중기-종결)를 설명하시오.' },
        { id: 6, q: '상담에서 라포(rapport) 형성의 중요성과 방법을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '정신분석적 상담',
      icon: '🧠',
      questions: [
        { id: 7, q: 'Freud의 정신분석이론에서 의식, 전의식, 무의식의 개념을 설명하시오.' },
        { id: 8, q: '성격구조(원초아, 자아, 초자아)의 특성과 상호작용을 설명하시오.' },
        { id: 9, q: 'Freud의 심리성적 발달단계 5단계를 설명하시오.' },
        { id: 10, q: '방어기제의 정의와 주요 유형(억압, 투사, 합리화 등)을 설명하시오.' },
        { id: 11, q: '전이(transference)와 역전이(countertransference)의 개념과 활용법을 설명하시오.' },
        { id: 12, q: '정신분석 상담의 주요 기법(자유연상, 꿈 분석, 해석)을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '인간중심 상담',
      icon: '💚',
      questions: [
        { id: 13, q: 'Rogers의 인간관과 현상학적 관점을 설명하시오.' },
        { id: 14, q: '자기개념(self-concept)과 경험의 불일치가 부적응을 초래하는 과정을 설명하시오.' },
        { id: 15, q: '상담자의 핵심 조건(무조건적 긍정적 존중, 공감적 이해, 일치성)을 설명하시오.' },
        { id: 16, q: '인간중심 상담의 치료과정 7단계를 설명하시오.' },
        { id: 17, q: '완전히 기능하는 사람(fully functioning person)의 특성을 설명하시오.' },
        { id: 18, q: '인간중심 상담이 청소년상담에 적용될 때의 장단점을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '인지행동 상담',
      icon: '🎯',
      questions: [
        { id: 19, q: 'Beck의 인지치료 이론에서 자동적 사고와 인지도식의 개념을 설명하시오.' },
        { id: 20, q: 'Ellis의 REBT에서 ABC모델과 비합리적 신념의 유형을 설명하시오.' },
        { id: 21, q: '인지적 오류(왜곡)의 유형 10가지를 설명하시오.' },
        { id: 22, q: '소크라테스식 질문법의 목적과 활용 방법을 설명하시오.' },
        { id: 23, q: '인지행동치료의 주요 기법(인지재구조화, 행동실험, 노출)을 설명하시오.' },
        { id: 24, q: '청소년 우울에 대한 인지행동적 개입 전략을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '게슈탈트 상담',
      icon: '🌀',
      questions: [
        { id: 25, q: '게슈탈트 상담의 기본 가정과 인간관을 설명하시오.' },
        { id: 26, q: '지금-여기(here and now)의 원리와 상담에서의 적용을 설명하시오.' },
        { id: 27, q: '접촉경계 혼란(융합, 내사, 투사, 반전, 편향)을 설명하시오.' },
        { id: 28, q: '미해결 과제(unfinished business)의 개념과 해결 방법을 설명하시오.' },
        { id: 29, q: '게슈탈트 기법(빈의자 기법, 과장기법, 머물기)을 설명하시오.' },
        { id: 30, q: '게슈탈트 상담의 알아차림(awareness) 3영역을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '청소년 문제유형별 상담',
      icon: '👥',
      questions: [
        { id: 31, q: '청소년 학업문제의 원인 유형과 상담적 접근을 설명하시오.' },
        { id: 32, q: '청소년 대인관계 문제(또래, 이성, 교사)의 상담 전략을 설명하시오.' },
        { id: 33, q: '청소년 인터넷·게임 과몰입 상담의 특징과 개입 방법을 설명하시오.' },
        { id: 34, q: '청소년 우울·자살 상담 시 위험요인 평가와 개입 원칙을 설명하시오.' },
        { id: 35, q: '학교폭력 피해·가해 청소년 상담의 접근법을 설명하시오.' },
        { id: 36, q: '가출 청소년의 특성과 상담 시 고려사항을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '상담기법과 과정',
      icon: '🔧',
      questions: [
        { id: 37, q: '경청의 유형(소극적, 적극적 경청)과 기법을 설명하시오.' },
        { id: 38, q: '반영(감정반영, 내용반영)의 기능과 활용 방법을 설명하시오.' },
        { id: 39, q: '질문 기법(개방형, 폐쇄형, 탐색 질문)의 특징과 적절한 사용 시점을 설명하시오.' },
        { id: 40, q: '직면(confrontation)의 목적, 유형, 사용 시 주의점을 설명하시오.' },
        { id: 41, q: '즉시성(immediacy)의 개념과 상담관계에서의 활용을 설명하시오.' },
        { id: 42, q: '상담에서 침묵의 의미 유형과 대처 방법을 설명하시오.' },
        { id: 43, q: '상담 구조화(시간, 목표, 역할)의 중요성과 방법을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '상담윤리와 매체상담',
      icon: '⚖️',
      questions: [
        { id: 44, q: '상담윤리 강령의 주요 원칙 5가지를 설명하시오.' },
        { id: 45, q: '비밀보장의 원칙과 예외 상황(위험고지 의무)을 설명하시오.' },
        { id: 46, q: '이중관계(다중관계)의 정의와 윤리적 문제를 설명하시오.' },
        { id: 47, q: '청소년상담에서 부모 동의와 비밀보장의 윤리적 딜레마를 설명하시오.' },
        { id: 48, q: '전화상담의 특성과 상담 기법을 설명하시오.' },
        { id: 49, q: '사이버상담(채팅, 이메일)의 장단점과 유의점을 설명하시오.' },
        { id: 50, q: '다문화 청소년 상담 시 문화적 역량과 고려사항을 설명하시오.' }
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
            <Link href="/category/welfare/youth-counselor-2" className="hover:text-gray-700">청소년상담사 2급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">청소년상담의 이론과 실제</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">💬</span>
            <h1 className="text-2xl font-bold">청소년상담의 이론과 실제</h1>
          </div>
          <p className="text-teal-100">25문항 | 핵심 예상문제 50선</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">학습 진도</span>
            <span className="text-sm font-medium text-teal-600">{completedQuestions.length}/{totalQuestions} 완료 ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
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
                  <span className="text-sm text-teal-600">
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
                    <div key={question.id} className={`p-4 rounded-lg border ${completedQuestions.includes(question.id) ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(question.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${completedQuestions.includes(question.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}
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
                            className="mt-2 text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1"
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
          <Link href="/category/welfare/youth-counselor-2" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            목록으로
          </Link>
          <Link href="/category/welfare/youth-counselor-2/study/research-basics" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
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
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition"
                >
                  <span className="text-2xl">🟠</span>
                  <div>
                    <p className="font-medium">Claude</p>
                    <p className="text-sm text-gray-500">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition"
                >
                  <span className="text-2xl">🟢</span>
                  <div>
                    <p className="font-medium">ChatGPT</p>
                    <p className="text-sm text-gray-500">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <span className="text-2xl">🔵</span>
                  <div>
                    <p className="font-medium">Gemini</p>
                    <p className="text-sm text-gray-500">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">청소년상담사 2급 - 청소년상담의 이론과 실제</p>
        </div>
      </footer>
    </div>
  );
}
