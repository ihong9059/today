'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function ResearchBasicsPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-research-basics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-research-basics-progress', JSON.stringify(completedQuestions));
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
      title: '과학적 연구의 기초',
      icon: '🔬',
      questions: [
        { id: 1, q: '과학적 연구의 목적(기술, 설명, 예측, 통제)을 설명하시오.' },
        { id: 2, q: '과학적 연구의 특성(경험적, 체계적, 객관적, 반복가능)을 설명하시오.' },
        { id: 3, q: '연구문제와 가설의 차이점 및 작성 방법을 설명하시오.' },
        { id: 4, q: '독립변인, 종속변인, 매개변인, 조절변인의 개념을 설명하시오.' },
        { id: 5, q: '개념적 정의와 조작적 정의의 차이를 설명하시오.' },
        { id: 6, q: '상담연구의 특수성과 윤리적 고려사항을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '연구설계',
      icon: '📐',
      questions: [
        { id: 7, q: '실험설계, 준실험설계, 비실험설계의 차이점을 설명하시오.' },
        { id: 8, q: '무선할당과 짝짓기의 개념과 목적을 설명하시오.' },
        { id: 9, q: '사전-사후 통제집단 설계의 구조와 장단점을 설명하시오.' },
        { id: 10, q: '솔로몬 4집단 설계의 구조와 활용 목적을 설명하시오.' },
        { id: 11, q: '내적 타당도 위협요인 8가지(역사, 성숙, 검사 등)를 설명하시오.' },
        { id: 12, q: '외적 타당도(일반화 가능성)에 영향을 미치는 요인을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '표집방법',
      icon: '🎯',
      questions: [
        { id: 13, q: '모집단과 표본, 표집오차의 개념을 설명하시오.' },
        { id: 14, q: '확률표집(단순무선, 층화, 군집, 체계적 표집)의 특징을 설명하시오.' },
        { id: 15, q: '비확률표집(편의, 유목적, 할당, 눈덩이 표집)의 특징을 설명하시오.' },
        { id: 16, q: '표본크기 결정에 영향을 미치는 요인을 설명하시오.' },
        { id: 17, q: '표집방법 선택 시 고려사항을 설명하시오.' },
        { id: 18, q: '상담연구에서 자주 사용되는 표집방법과 그 이유를 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '측정과 척도',
      icon: '📏',
      questions: [
        { id: 19, q: '측정의 수준(명목, 서열, 등간, 비율)의 특성과 예시를 설명하시오.' },
        { id: 20, q: 'Likert 척도의 특성과 구성 방법을 설명하시오.' },
        { id: 21, q: '의미분별척도(semantic differential scale)의 특성과 활용을 설명하시오.' },
        { id: 22, q: '측정오차의 유형(체계적, 비체계적 오차)을 설명하시오.' },
        { id: 23, q: '검사 표준화의 의미와 절차를 설명하시오.' },
        { id: 24, q: '규준참조검사와 준거참조검사의 차이점을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '신뢰도와 타당도',
      icon: '✅',
      questions: [
        { id: 25, q: '신뢰도의 개념과 신뢰도 계수 해석 방법을 설명하시오.' },
        { id: 26, q: '검사-재검사 신뢰도의 개념과 적용 시 주의점을 설명하시오.' },
        { id: 27, q: '동형검사 신뢰도와 반분신뢰도의 특징을 설명하시오.' },
        { id: 28, q: '내적합치도(Cronbach α)의 의미와 해석 기준을 설명하시오.' },
        { id: 29, q: '타당도의 유형(내용, 구인, 준거)을 설명하시오.' },
        { id: 30, q: '수렴타당도와 변별타당도의 개념을 설명하시오.' },
        { id: 31, q: '신뢰도와 타당도의 관계를 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '기술통계',
      icon: '📊',
      questions: [
        { id: 32, q: '집중경향치(평균, 중앙값, 최빈값)의 특성과 활용 상황을 설명하시오.' },
        { id: 33, q: '분산도(범위, 분산, 표준편차)의 개념과 계산 방법을 설명하시오.' },
        { id: 34, q: '정규분포의 특성과 68-95-99.7 법칙을 설명하시오.' },
        { id: 35, q: '왜도와 첨도의 개념과 분포해석 방법을 설명하시오.' },
        { id: 36, q: '표준점수(Z점수)의 의미와 활용 방법을 설명하시오.' },
        { id: 37, q: 'T점수, 스테나인, 백분위의 특성을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '추론통계',
      icon: '📈',
      questions: [
        { id: 38, q: '가설검증의 절차와 제1종, 제2종 오류를 설명하시오.' },
        { id: 39, q: '유의수준(α)과 p값의 의미를 설명하시오.' },
        { id: 40, q: 't검정의 유형(일표본, 독립표본, 대응표본)과 적용 조건을 설명하시오.' },
        { id: 41, q: '상관분석에서 Pearson 상관계수의 해석 방법을 설명하시오.' },
        { id: 42, q: '일원분산분석(ANOVA)의 목적과 사후검증의 필요성을 설명하시오.' },
        { id: 43, q: '회귀분석의 기본 개념과 결정계수(R²)의 의미를 설명하시오.' },
        { id: 44, q: '카이제곱 검정의 활용 상황과 해석 방법을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '연구윤리',
      icon: '⚖️',
      questions: [
        { id: 45, q: '연구윤리의 기본 원칙(자율성, 선행, 정의)을 설명하시오.' },
        { id: 46, q: '연구 참여자의 동의서(informed consent) 구성요소를 설명하시오.' },
        { id: 47, q: '연구에서 기만(deception)의 사용과 윤리적 쟁점을 설명하시오.' },
        { id: 48, q: 'IRB(기관생명윤리위원회)의 역할과 심의 절차를 설명하시오.' },
        { id: 49, q: '연구데이터 관리와 연구부정행위(표절, 위조, 변조)를 설명하시오.' },
        { id: 50, q: '취약한 연구대상자(청소년, 아동) 연구 시 윤리적 고려사항을 설명하시오.' }
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
            <span className="text-gray-900">상담연구방법론의 기초</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📊</span>
            <h1 className="text-2xl font-bold">상담연구방법론의 기초</h1>
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
          <Link href="/category/welfare/youth-counselor-2/study/counseling-theory" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 과목
          </Link>
          <Link href="/category/welfare/youth-counselor-2/study/psychological-assessment" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
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
          <p className="text-gray-400">청소년상담사 2급 - 상담연구방법론의 기초</p>
        </div>
      </footer>
    </div>
  );
}
