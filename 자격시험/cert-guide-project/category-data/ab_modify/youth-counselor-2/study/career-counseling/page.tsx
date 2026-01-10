'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CareerCounselingPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-career-counseling-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-career-counseling-progress', JSON.stringify(completedQuestions));
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
      title: '진로발달이론',
      icon: '📈',
      questions: [
        { id: 1, q: 'Super의 진로발달이론에서 자아개념의 역할을 설명하시오.' },
        { id: 2, q: 'Super의 생애진로발달 5단계(성장-탐색-확립-유지-쇠퇴)를 설명하시오.' },
        { id: 3, q: 'Super의 생애무지개(Life-Career Rainbow)모델을 설명하시오.' },
        { id: 4, q: 'Gottfredson의 제한-타협 이론의 주요 개념을 설명하시오.' },
        { id: 5, q: 'Ginzberg의 진로발달 3단계(환상기-잠정기-현실기)를 설명하시오.' },
        { id: 6, q: '진로발달이론의 청소년상담 적용 시 고려사항을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '특성요인이론',
      icon: '🔍',
      questions: [
        { id: 7, q: 'Parsons의 특성요인이론의 3단계 모델을 설명하시오.' },
        { id: 8, q: 'Holland의 직업적 성격유형 6가지(RIASEC)를 설명하시오.' },
        { id: 9, q: 'Holland 이론의 6각형 모델과 일관성, 분화도의 의미를 설명하시오.' },
        { id: 10, q: 'Holland 이론의 적합성(congruence) 개념과 진로상담 활용을 설명하시오.' },
        { id: 11, q: '직업분류체계(한국표준직업분류, 한국직업사전)의 특성을 설명하시오.' },
        { id: 12, q: '특성요인이론의 한계와 현대적 수정을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '사회인지진로이론',
      icon: '🧠',
      questions: [
        { id: 13, q: 'Bandura의 자기효능감 이론과 진로발달의 관계를 설명하시오.' },
        { id: 14, q: '자기효능감의 4가지 정보원천(성취경험, 대리경험 등)을 설명하시오.' },
        { id: 15, q: 'Lent의 사회인지진로이론(SCCT)의 주요 개념을 설명하시오.' },
        { id: 16, q: 'SCCT에서 흥미발달 모델을 설명하시오.' },
        { id: 17, q: '결과기대(outcome expectations)의 진로의사결정에서의 역할을 설명하시오.' },
        { id: 18, q: '진로장벽(career barriers)의 유형과 상담적 접근을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '진로의사결정 이론',
      icon: '🎯',
      questions: [
        { id: 19, q: 'Gelatt의 의사결정 모델의 단계를 설명하시오.' },
        { id: 20, q: 'Krumboltz의 사회학습 진로의사결정이론을 설명하시오.' },
        { id: 21, q: 'Krumboltz의 계획된 우연(Planned Happenstance) 이론을 설명하시오.' },
        { id: 22, q: '합리적, 직관적, 의존적 의사결정 유형의 특성을 설명하시오.' },
        { id: 23, q: '진로미결정의 유형과 원인을 설명하시오.' },
        { id: 24, q: '청소년 진로의사결정의 특성과 발달과업을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '진로검사',
      icon: '📋',
      questions: [
        { id: 25, q: 'Holland 검사(SDS, VPI)의 구성과 해석 방법을 설명하시오.' },
        { id: 26, q: 'Strong 직업흥미검사의 구성과 결과 해석을 설명하시오.' },
        { id: 27, q: '직업카드 분류법의 실시 방법과 활용을 설명하시오.' },
        { id: 28, q: '진로성숙도 검사의 구성요소와 활용을 설명하시오.' },
        { id: 29, q: '직업가치관 검사의 목적과 해석 방법을 설명하시오.' },
        { id: 30, q: '진로검사 결과 해석 시 유의사항을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '진로상담 과정',
      icon: '🛤️',
      questions: [
        { id: 31, q: '진로상담의 목표와 일반상담과의 차이점을 설명하시오.' },
        { id: 32, q: '진로상담의 단계(관계형성-탐색-이해-행동)를 설명하시오.' },
        { id: 33, q: '진로정보 제공의 원칙과 방법을 설명하시오.' },
        { id: 34, q: '진로상담에서 가치 명료화 활동의 활용을 설명하시오.' },
        { id: 35, q: '진로상담에서 인지적 재구조화의 활용을 설명하시오.' },
        { id: 36, q: '진로상담의 종결과 추수지도 방법을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '청소년 진로개입',
      icon: '👥',
      questions: [
        { id: 37, q: '학교 진로교육의 목표와 내용체계를 설명하시오.' },
        { id: 38, q: '진로체험의 유형(현장직업체험, 직업실무체험 등)과 효과를 설명하시오.' },
        { id: 39, q: '진로캠프, 진로박람회 등 집단 진로프로그램의 특성을 설명하시오.' },
        { id: 40, q: '직업인 초청강연의 효과적 운영 방법을 설명하시오.' },
        { id: 41, q: '진로포트폴리오의 구성과 활용 방법을 설명하시오.' },
        { id: 42, q: '학교밖청소년 진로지원 프로그램의 특성을 설명하시오.' },
        { id: 43, q: '특성화고/마이스터고 청소년의 진로지도 특성을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '학업상담',
      icon: '📚',
      questions: [
        { id: 44, q: '학습동기의 유형(내재적, 외재적)과 상담적 접근을 설명하시오.' },
        { id: 45, q: '자기조절학습의 구성요소와 전략을 설명하시오.' },
        { id: 46, q: '시험불안의 원인과 인지행동적 개입 방법을 설명하시오.' },
        { id: 47, q: '학습부진 청소년의 특성과 상담적 접근을 설명하시오.' },
        { id: 48, q: '학업중단 위기청소년의 특성과 예방 전략을 설명하시오.' },
        { id: 49, q: '귀인이론(Weiner)과 학업동기의 관계를 설명하시오.' },
        { id: 50, q: '학습전략(인지전략, 초인지전략)의 유형과 지도 방법을 설명하시오.' }
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
            <span className="text-gray-900">진로상담</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🎯</span>
            <h1 className="text-2xl font-bold">진로상담</h1>
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
          <Link href="/category/welfare/youth-counselor-2/study/abnormal-psychology" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 과목
          </Link>
          <Link href="/category/welfare/youth-counselor-2/study/group-counseling" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            다음 과목
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {/* AI Modal */}
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
          <p className="text-gray-400">청소년상담사 2급 - 진로상담</p>
        </div>
      </footer>
    </div>
  );
}
