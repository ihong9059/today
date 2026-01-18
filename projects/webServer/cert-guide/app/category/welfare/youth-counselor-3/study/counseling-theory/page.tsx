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
    const saved = localStorage.getItem('youth-counselor-3-counseling-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-3-counseling-theory-progress', JSON.stringify(completedQuestions));
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
      title: '상담의 기초',
      icon: '📖',
      questions: [
        { id: 1, q: '상담의 정의와 상담의 목표를 설명하시오.' },
        { id: 2, q: '상담과 심리치료, 생활지도의 공통점과 차이점을 설명하시오.' },
        { id: 3, q: '상담자의 자질과 전문적 윤리를 설명하시오.' },
        { id: 4, q: '상담의 기본 원리(수용, 존중, 비밀보장 등)를 설명하시오.' },
        { id: 5, q: '상담의 유형(개인상담, 집단상담, 가족상담)을 비교하시오.' },
        { id: 6, q: '상담관계 형성의 중요성과 방법을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '정신분석 상담',
      icon: '🧠',
      questions: [
        { id: 7, q: 'Freud의 인간관과 정신분석 상담의 기본 가정을 설명하시오.' },
        { id: 8, q: '정신분석의 성격구조(원초아, 자아, 초자아)를 설명하시오.' },
        { id: 9, q: '방어기제의 종류(억압, 투사, 합리화 등)를 설명하시오.' },
        { id: 10, q: '정신분석 상담의 목표와 주요 기법(자유연상, 꿈 분석, 전이)을 설명하시오.' },
        { id: 11, q: '전이와 역전이의 개념과 상담에서의 활용을 설명하시오.' },
        { id: 12, q: '정신분석 상담의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '인간중심 상담',
      icon: '❤️',
      questions: [
        { id: 13, q: 'Rogers의 인간관과 인간중심 상담의 기본 가정을 설명하시오.' },
        { id: 14, q: '실현경향성과 자기실현의 개념을 설명하시오.' },
        { id: 15, q: '자기개념, 현상학적 장, 경험의 관계를 설명하시오.' },
        { id: 16, q: '상담자의 3가지 핵심 조건(무조건적 긍정적 존중, 공감적 이해, 진솔성)을 설명하시오.' },
        { id: 17, q: '인간중심 상담의 과정과 목표를 설명하시오.' },
        { id: 18, q: '인간중심 상담의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '행동주의 상담',
      icon: '🎯',
      questions: [
        { id: 19, q: '행동주의 상담의 기본 가정과 인간관을 설명하시오.' },
        { id: 20, q: '고전적 조건형성(Pavlov)의 원리와 상담적 적용을 설명하시오.' },
        { id: 21, q: '조작적 조건형성(Skinner)의 원리와 강화, 처벌의 유형을 설명하시오.' },
        { id: 22, q: '체계적 둔감법의 원리와 절차를 설명하시오.' },
        { id: 23, q: '토큰경제, 행동계약, 자기관리 기법을 설명하시오.' },
        { id: 24, q: '행동주의 상담의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '인지행동 상담',
      icon: '💭',
      questions: [
        { id: 25, q: 'Ellis의 합리적 정서행동치료(REBT)의 ABCDE 모델을 설명하시오.' },
        { id: 26, q: '비합리적 신념의 특징과 예시를 설명하시오.' },
        { id: 27, q: 'Beck의 인지치료의 기본 개념과 인지적 오류를 설명하시오.' },
        { id: 28, q: '자동적 사고와 핵심신념의 관계를 설명하시오.' },
        { id: 29, q: '인지재구조화 기법을 설명하시오.' },
        { id: 30, q: '인지행동 상담의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '게슈탈트 상담',
      icon: '🔄',
      questions: [
        { id: 31, q: 'Perls의 게슈탈트 상담의 기본 가정과 인간관을 설명하시오.' },
        { id: 32, q: '전경과 배경, 미해결 과제의 개념을 설명하시오.' },
        { id: 33, q: '지금-여기(here and now)의 원리를 설명하시오.' },
        { id: 34, q: '알아차림과 접촉의 개념을 설명하시오.' },
        { id: 35, q: '게슈탈트 상담의 주요 기법(빈 의자 기법, 과장 기법 등)을 설명하시오.' },
        { id: 36, q: '게슈탈트 상담의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '현실치료',
      icon: '🌟',
      questions: [
        { id: 37, q: 'Glasser의 현실치료의 기본 가정과 인간관을 설명하시오.' },
        { id: 38, q: '선택이론과 5가지 기본욕구(생존, 소속, 힘, 자유, 즐거움)를 설명하시오.' },
        { id: 39, q: '전행동(total behavior)의 4가지 구성요소를 설명하시오.' },
        { id: 40, q: 'WDEP 상담 과정을 설명하시오.' },
        { id: 41, q: '책임의 개념과 상담에서의 중요성을 설명하시오.' },
        { id: 42, q: '현실치료의 공헌과 한계점을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '상담 기법과 과정',
      icon: '🛠️',
      questions: [
        { id: 43, q: '상담의 기본 기법(경청, 반영, 명료화, 요약)을 설명하시오.' },
        { id: 44, q: '질문 기법(개방형, 폐쇄형 질문)의 활용을 설명하시오.' },
        { id: 45, q: '공감적 반응의 수준과 방법을 설명하시오.' },
        { id: 46, q: '직면과 해석 기법의 사용 시기와 방법을 설명하시오.' },
        { id: 47, q: '상담 과정(시작, 중기, 종결)의 특성과 과제를 설명하시오.' },
        { id: 48, q: '청소년 상담의 특수성과 접근 방법을 설명하시오.' },
        { id: 49, q: '상담에서의 저항 다루기 방법을 설명하시오.' },
        { id: 50, q: '상담 종결의 시기와 방법, 추수상담의 중요성을 설명하시오.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercentage = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/youth-counselor-3" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            청소년상담사 3급으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold mb-4">상담이론</h1>
          <p className="text-xl text-emerald-100">주요 상담이론과 기법을 학습합니다</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm font-bold text-emerald-600">{completedQuestions.length}/{totalQuestions} 완료 ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.includes(q.id)).length;
            const isExpanded = expandedTopic === topic.id;

            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${(topicCompleted / topic.questions.length) * 100}%` }}
                      ></div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="mt-4 space-y-3">
                      {topic.questions.map((question) => (
                        <div
                          key={question.id}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            completedQuestions.includes(question.id)
                              ? 'border-emerald-200 bg-emerald-50'
                              : 'border-gray-100 hover:border-emerald-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                completedQuestions.includes(question.id)
                                  ? 'border-emerald-500 bg-emerald-500 text-white'
                                  : 'border-gray-300 hover:border-emerald-400'
                              }`}
                            >
                              {completedQuestions.includes(question.id) && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <div className="flex-1">
                              <p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-emerald-700' : 'text-gray-700'}`}>
                                {question.id}. {question.q}
                              </p>
                            </div>
                            <button
                              onClick={() => openAIHelper(question.q)}
                              className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              AI 도움
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('학습 진행 상황을 초기화하시겠습니까?')) {
                setCompletedQuestions([]);
              }
            }}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            진행 상황 초기화
          </button>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 whitespace-pre-wrap">{currentPrompt}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">아래 AI 서비스를 선택하여 질문하세요:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-2xl">🤖</span>
                  <span className="font-semibold">Claude</span>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold">ChatGPT</span>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <span className="text-2xl">✨</span>
                  <span className="font-semibold">Gemini</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
