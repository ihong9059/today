'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GroupCounselingPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-group-counseling-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-group-counseling-progress', JSON.stringify(completedQuestions));
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
      title: '집단상담의 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '집단상담의 정의와 개인상담과의 차이점을 설명하시오.' },
        { id: 2, q: '집단상담의 장점과 제한점을 설명하시오.' },
        { id: 3, q: '집단상담의 유형(상담집단, 치료집단, 성장집단)을 설명하시오.' },
        { id: 4, q: '집단의 크기, 구성, 빈도가 집단과정에 미치는 영향을 설명하시오.' },
        { id: 5, q: '개방집단과 폐쇄집단의 특성과 장단점을 설명하시오.' },
        { id: 6, q: '동질집단과 이질집단의 장단점을 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '집단역동',
      icon: '⚡',
      questions: [
        { id: 7, q: '집단역동의 개념과 집단상담에서의 중요성을 설명하시오.' },
        { id: 8, q: 'Yalom의 치료적 요인 11가지를 설명하시오.' },
        { id: 9, q: '집단응집력의 개념과 응집력 형성 방법을 설명하시오.' },
        { id: 10, q: '보편성(universality)과 희망주입(hope)의 치료적 의미를 설명하시오.' },
        { id: 11, q: '카타르시스와 자기개방의 치료적 의미를 설명하시오.' },
        { id: 12, q: '대인관계 학습(interpersonal learning)의 개념과 촉진 방법을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '집단발달 단계',
      icon: '📈',
      questions: [
        { id: 13, q: 'Corey의 집단발달 5단계 모델을 설명하시오.' },
        { id: 14, q: '초기단계(형성기)의 특성과 상담자 역할을 설명하시오.' },
        { id: 15, q: '과도기(갈등기)의 특성과 저항 다루기 방법을 설명하시오.' },
        { id: 16, q: '작업단계(수행기)의 특성과 상담자 역할을 설명하시오.' },
        { id: 17, q: '종결단계의 특성과 효과적인 종결 방법을 설명하시오.' },
        { id: 18, q: '각 단계별 집단원의 행동 특성과 대처 방법을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '집단상담자 역할과 기술',
      icon: '👨‍🏫',
      questions: [
        { id: 19, q: '집단상담자의 역할(촉진자, 모델, 참여자)을 설명하시오.' },
        { id: 20, q: '집단상담자의 자질과 핵심 역량을 설명하시오.' },
        { id: 21, q: '적극적 경청과 반영 기술의 집단상담 적용을 설명하시오.' },
        { id: 22, q: '연결짓기(linking) 기술의 목적과 방법을 설명하시오.' },
        { id: 23, q: '차단(blocking)과 보호(protecting) 기술의 활용을 설명하시오.' },
        { id: 24, q: '초점맞추기와 구체화 기술의 활용을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '집단상담 기법',
      icon: '🔧',
      questions: [
        { id: 25, q: '집단 구조화의 목적과 방법을 설명하시오.' },
        { id: 26, q: '아이스 브레이킹(ice-breaking) 활동의 유형과 효과를 설명하시오.' },
        { id: 27, q: '돌아가며 말하기(go-around)의 활용 방법을 설명하시오.' },
        { id: 28, q: '역할극(psychodrama)의 구성요소와 활용을 설명하시오.' },
        { id: 29, q: '빈의자 기법의 집단상담 적용을 설명하시오.' },
        { id: 30, q: '피드백 주고받기의 원칙과 방법을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '집단상담의 어려운 상황',
      icon: '⚠️',
      questions: [
        { id: 31, q: '집단에서 침묵하는 집단원 다루기 방법을 설명하시오.' },
        { id: 32, q: '지나치게 말을 많이 하는 집단원 다루기 방법을 설명하시오.' },
        { id: 33, q: '저항적이고 적대적인 집단원 다루기 방법을 설명하시오.' },
        { id: 34, q: '집단 내 하위집단(subgroup) 형성 시 대처 방법을 설명하시오.' },
        { id: 35, q: '집단 내 갈등 상황의 치료적 활용 방법을 설명하시오.' },
        { id: 36, q: '조기종결자(dropout) 발생 시 대처 방법을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '청소년 집단상담',
      icon: '👥',
      questions: [
        { id: 37, q: '청소년 집단상담의 특성과 고려사항을 설명하시오.' },
        { id: 38, q: '청소년 집단상담에서 발달단계별 특성 고려를 설명하시오.' },
        { id: 39, q: '학교 기반 집단상담 프로그램의 특성과 운영 방법을 설명하시오.' },
        { id: 40, q: '자기성장 집단의 목표와 활동 내용을 설명하시오.' },
        { id: 41, q: '사회성 훈련 집단의 목표와 활동 내용을 설명하시오.' },
        { id: 42, q: '분노조절 집단의 목표와 활동 내용을 설명하시오.' },
        { id: 43, q: '학교폭력 예방 집단프로그램의 구성과 내용을 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '집단상담 윤리와 평가',
      icon: '⚖️',
      questions: [
        { id: 44, q: '집단상담의 윤리적 원칙(비밀보장, 자발성 등)을 설명하시오.' },
        { id: 45, q: '집단상담에서 비밀보장의 한계와 집단원 교육 방법을 설명하시오.' },
        { id: 46, q: '집단원 선별(screening)의 목적과 방법을 설명하시오.' },
        { id: 47, q: '집단상담 동의서의 포함 내용을 설명하시오.' },
        { id: 48, q: '집단상담 프로그램 개발 절차를 설명하시오.' },
        { id: 49, q: '집단상담 효과 평가 방법(과정평가, 결과평가)을 설명하시오.' },
        { id: 50, q: '공동지도자(co-leader) 활용의 장단점과 운영 방법을 설명하시오.' }
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
            <span className="text-gray-900">집단상담 (선택)</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">👥</span>
            <h1 className="text-2xl font-bold">집단상담 (선택)</h1>
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
          <Link href="/category/welfare/youth-counselor-2/study/career-counseling" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 과목
          </Link>
          <Link href="/category/welfare/youth-counselor-2" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            목록으로
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
          <p className="text-gray-400">청소년상담사 2급 - 집단상담 (선택)</p>
        </div>
      </footer>
    </div>
  );
}
