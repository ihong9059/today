'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function PsychologicalAssessmentPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-psychological-assessment-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-psychological-assessment-progress', JSON.stringify(completedQuestions));
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
      title: '심리검사의 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '심리검사의 정의와 목적을 설명하시오.' },
        { id: 2, q: '심리검사의 종류(최대수행검사 vs 전형적 행동검사)를 설명하시오.' },
        { id: 3, q: '규준의 개념과 규준집단의 중요성을 설명하시오.' },
        { id: 4, q: '원점수, 백분위, 표준점수의 관계를 설명하시오.' },
        { id: 5, q: '검사 선택 시 고려해야 할 요인들을 설명하시오.' },
        { id: 6, q: '검사 실시 절차와 표준화된 검사 환경의 중요성을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '지능검사',
      icon: '🧠',
      questions: [
        { id: 7, q: '지능의 정의와 주요 지능이론(Spearman, Gardner, Sternberg)을 설명하시오.' },
        { id: 8, q: 'K-WISC-V의 구성과 5개 지표점수의 의미를 설명하시오.' },
        { id: 9, q: 'K-WISC-V 소검사(언어이해, 시공간 등)의 특성과 측정 내용을 설명하시오.' },
        { id: 10, q: 'IQ점수 해석 시 유의점과 신뢰구간의 의미를 설명하시오.' },
        { id: 11, q: '지표점수 간 유의한 차이 해석 방법을 설명하시오.' },
        { id: 12, q: '지적장애의 진단기준과 지능검사 활용을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: 'MMPI 성격검사',
      icon: '📊',
      questions: [
        { id: 13, q: 'MMPI-2의 개발 배경과 특징을 설명하시오.' },
        { id: 14, q: 'MMPI-2 타당도 척도(L, F, K)의 의미와 해석을 설명하시오.' },
        { id: 15, q: 'MMPI-2 임상척도 10개의 명칭과 측정 내용을 설명하시오.' },
        { id: 16, q: 'MMPI-2 프로파일 해석 절차(타당도→코드타입)를 설명하시오.' },
        { id: 17, q: 'MMPI-2 2점 코드타입 해석의 의미와 주요 유형을 설명하시오.' },
        { id: 18, q: 'MMPI-A(청소년용)의 특성과 MMPI-2와의 차이점을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '기타 성격검사',
      icon: '🔍',
      questions: [
        { id: 19, q: 'MBTI의 4가지 선호지표와 16가지 성격유형을 설명하시오.' },
        { id: 20, q: 'MBTI 검사의 활용 영역과 한계점을 설명하시오.' },
        { id: 21, q: 'TCI(기질 및 성격검사)의 이론적 배경과 7개 척도를 설명하시오.' },
        { id: 22, q: 'NEO 성격검사의 5요인 모델(Big Five)을 설명하시오.' },
        { id: 23, q: '에니어그램의 9가지 성격유형과 상담에서의 활용을 설명하시오.' },
        { id: 24, q: '청소년용 성격검사 선택 시 고려사항을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '투사검사',
      icon: '🎨',
      questions: [
        { id: 25, q: '투사검사의 기본 가정과 장단점을 설명하시오.' },
        { id: 26, q: 'HTP(집-나무-사람) 검사의 실시 절차와 해석 원리를 설명하시오.' },
        { id: 27, q: 'HTP에서 집, 나무, 사람 그림의 상징적 의미를 설명하시오.' },
        { id: 28, q: 'KFD(동적 가족화)의 실시와 해석 방법을 설명하시오.' },
        { id: 29, q: 'SCT(문장완성검사)의 특성과 해석 방법을 설명하시오.' },
        { id: 30, q: 'BGT(벤더 게슈탈트 검사)의 목적과 해석 원리를 설명하시오.' },
        { id: 31, q: 'TAT/CAT의 실시 방법과 해석 원리를 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '진로/적성검사',
      icon: '🎯',
      questions: [
        { id: 32, q: 'Holland 직업적 성격유형 6가지(RIASEC)를 설명하시오.' },
        { id: 33, q: 'Holland 검사(SDS, VPI)의 결과 해석 방법을 설명하시오.' },
        { id: 34, q: 'Strong 직업흥미검사의 구성과 해석 방법을 설명하시오.' },
        { id: 35, q: '적성검사의 유형과 직업선택에서의 활용을 설명하시오.' },
        { id: 36, q: '진로성숙도 검사의 목적과 구성요소를 설명하시오.' },
        { id: 37, q: '청소년 진로검사 결과 해석 시 유의사항을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '행동평가',
      icon: '📝',
      questions: [
        { id: 38, q: 'CBCL(아동행동체크리스트)의 구성과 해석 방법을 설명하시오.' },
        { id: 39, q: 'K-BASC-2의 구성척도와 청소년 행동평가에서의 활용을 설명하시오.' },
        { id: 40, q: 'ADHD 평가척도(ADHD Rating Scale)의 특성과 활용을 설명하시오.' },
        { id: 41, q: '다면적 평가(자기보고, 부모, 교사)의 중요성을 설명하시오.' },
        { id: 42, q: '행동관찰법의 유형과 기록 방법을 설명하시오.' },
        { id: 43, q: '자살위험성 평가도구(SSI, SBQ-R)의 특성과 활용을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '검사 활용과 보고서',
      icon: '📋',
      questions: [
        { id: 44, q: '심리검사 배터리 구성의 원리와 방법을 설명하시오.' },
        { id: 45, q: '검사 결과 통합 해석의 절차와 방법을 설명하시오.' },
        { id: 46, q: '심리평가 보고서 작성 시 포함해야 할 요소를 설명하시오.' },
        { id: 47, q: '검사 결과 피드백 제공 시 유의사항을 설명하시오.' },
        { id: 48, q: '청소년에게 검사 결과를 설명할 때 고려사항을 설명하시오.' },
        { id: 49, q: '검사 윤리(자격, 비밀보장, 검사보안)에 대해 설명하시오.' },
        { id: 50, q: '심리검사 결과를 상담계획 수립에 활용하는 방법을 설명하시오.' }
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
            <span className="text-gray-900">심리측정평가의 활용</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📋</span>
            <h1 className="text-2xl font-bold">심리측정평가의 활용</h1>
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
          <Link href="/category/welfare/youth-counselor-2/study/research-basics" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 과목
          </Link>
          <Link href="/category/welfare/youth-counselor-2/study/abnormal-psychology" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
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
          <p className="text-gray-400">청소년상담사 2급 - 심리측정평가의 활용</p>
        </div>
      </footer>
    </div>
  );
}
