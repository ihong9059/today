'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function LearningTheoryPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-3-learning-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-3-learning-theory-progress', JSON.stringify(completedQuestions));
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
      title: '학습의 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '학습의 정의와 학습심리학의 연구 목적을 설명하시오.' },
        { id: 2, q: '학습과 수행, 성숙의 관계를 설명하시오.' },
        { id: 3, q: '학습이론의 발달 역사와 주요 관점을 설명하시오.' },
        { id: 4, q: '학습의 유형(연합학습, 인지학습, 사회학습)을 비교하시오.' },
        { id: 5, q: '학습에 영향을 미치는 요인(동기, 연습, 피드백)을 설명하시오.' },
        { id: 6, q: '학습곡선과 고원현상을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '고전적 조건형성',
      icon: '🔔',
      questions: [
        { id: 7, q: 'Pavlov의 고전적 조건형성 실험과 원리를 설명하시오.' },
        { id: 8, q: '무조건자극, 무조건반응, 조건자극, 조건반응의 개념을 설명하시오.' },
        { id: 9, q: '자극 일반화와 변별의 개념을 설명하시오.' },
        { id: 10, q: '소거와 자발적 회복 현상을 설명하시오.' },
        { id: 11, q: '고차적 조건형성의 원리와 예시를 설명하시오.' },
        { id: 12, q: 'Watson의 Little Albert 실험과 정서 학습을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '조작적 조건형성',
      icon: '🎯',
      questions: [
        { id: 13, q: 'Thorndike의 시행착오 학습과 효과의 법칙을 설명하시오.' },
        { id: 14, q: 'Skinner의 조작적 조건형성의 기본 원리를 설명하시오.' },
        { id: 15, q: '정적 강화와 부적 강화의 차이를 설명하시오.' },
        { id: 16, q: '정적 처벌과 부적 처벌의 차이를 설명하시오.' },
        { id: 17, q: '강화계획(연속, 간헐, 비율, 간격)의 특징과 효과를 설명하시오.' },
        { id: 18, q: '행동조성(shaping)과 연쇄(chaining)를 설명하시오.' },
        { id: 19, q: '프리맥 원리(Premack principle)를 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '인지주의 학습이론',
      icon: '💡',
      questions: [
        { id: 20, q: '인지주의 학습이론의 기본 가정과 행동주의와의 차이를 설명하시오.' },
        { id: 21, q: 'Tolman의 잠재학습과 인지도 개념을 설명하시오.' },
        { id: 22, q: 'Köhler의 통찰학습과 침팬지 실험을 설명하시오.' },
        { id: 23, q: '정보처리이론의 기본 모형(감각기억, 작업기억, 장기기억)을 설명하시오.' },
        { id: 24, q: '부호화, 저장, 인출 과정을 설명하시오.' },
        { id: 25, q: '망각의 원인(쇠퇴, 간섭, 인출실패)을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '사회인지 학습이론',
      icon: '👥',
      questions: [
        { id: 26, q: 'Bandura의 사회학습이론의 기본 원리를 설명하시오.' },
        { id: 27, q: '관찰학습(모델링)의 4단계(주의, 파지, 재생, 동기화)를 설명하시오.' },
        { id: 28, q: 'Bobo 인형 실험과 공격행동 학습을 설명하시오.' },
        { id: 29, q: '대리강화와 대리처벌의 개념을 설명하시오.' },
        { id: 30, q: '자기효능감의 개념과 학습에 미치는 영향을 설명하시오.' },
        { id: 31, q: '자기효능감의 4가지 원천(성취경험, 대리경험, 언어적 설득, 정서적 각성)을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '구성주의 학습이론',
      icon: '🏗️',
      questions: [
        { id: 32, q: '구성주의 학습이론의 기본 가정과 특징을 설명하시오.' },
        { id: 33, q: 'Piaget의 인지적 구성주의를 설명하시오.' },
        { id: 34, q: 'Vygotsky의 사회적 구성주의와 근접발달영역(ZPD)을 설명하시오.' },
        { id: 35, q: '비계설정(scaffolding)의 개념과 방법을 설명하시오.' },
        { id: 36, q: '협동학습의 원리와 효과를 설명하시오.' },
        { id: 37, q: '문제기반학습(PBL)의 특징과 절차를 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '학습동기',
      icon: '🔥',
      questions: [
        { id: 38, q: '동기의 개념과 학습에서의 중요성을 설명하시오.' },
        { id: 39, q: '내재적 동기와 외재적 동기의 차이를 설명하시오.' },
        { id: 40, q: 'Maslow의 욕구위계이론과 학습동기의 관계를 설명하시오.' },
        { id: 41, q: '성취동기이론(Atkinson)의 주요 개념을 설명하시오.' },
        { id: 42, q: '귀인이론(Weiner)과 학습된 무력감을 설명하시오.' },
        { id: 43, q: '자기결정성이론과 학습동기의 관계를 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '학습이론의 적용',
      icon: '🛠️',
      questions: [
        { id: 44, q: '학습이론의 청소년 교육 적용 방안을 설명하시오.' },
        { id: 45, q: '행동수정의 원리와 기법을 설명하시오.' },
        { id: 46, q: '프로그램 학습과 컴퓨터 보조학습(CAI)을 설명하시오.' },
        { id: 47, q: '자기조절학습의 개념과 전략을 설명하시오.' },
        { id: 48, q: '메타인지의 개념과 학습에서의 역할을 설명하시오.' },
        { id: 49, q: '효과적인 학습전략(정교화, 조직화, 시연)을 설명하시오.' },
        { id: 50, q: '전이(transfer)의 개념과 유형, 촉진 방법을 설명하시오.' }
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
          <h1 className="text-4xl font-bold mb-4">학습이론</h1>
          <p className="text-xl text-emerald-100">학습의 원리와 다양한 학습이론을 학습합니다</p>
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
