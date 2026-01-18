'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function PsychologicalTestingPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-3-psychological-testing-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-3-psychological-testing-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const openAIHelper = (question: string) => {
    setCurrentPrompt(`청소년상담사 3급 시험 대비 질문입니다.\n\n${question}\n\n상세하게 설명해주세요.`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1, title: '심리검사의 기초', icon: '📚',
      questions: [
        { id: 1, q: '심리검사의 정의와 목적을 설명하시오.' },
        { id: 2, q: '심리검사의 분류(최대수행검사 vs 전형적 행동검사)를 설명하시오.' },
        { id: 3, q: '표준화 검사의 개념과 필요성을 설명하시오.' },
        { id: 4, q: '검사의 표준화 절차를 설명하시오.' },
        { id: 5, q: '검사 선택 시 고려해야 할 요인을 설명하시오.' },
        { id: 6, q: '검사 실시 시 표준화된 환경의 중요성을 설명하시오.' }
      ]
    },
    {
      id: 2, title: '신뢰도', icon: '🔒',
      questions: [
        { id: 7, q: '신뢰도의 개념과 측정의 오차를 설명하시오.' },
        { id: 8, q: '검사-재검사 신뢰도의 개념과 장단점을 설명하시오.' },
        { id: 9, q: '동형검사 신뢰도의 개념을 설명하시오.' },
        { id: 10, q: '반분신뢰도의 개념과 스피어만-브라운 공식을 설명하시오.' },
        { id: 11, q: '내적합치도(Cronbach α)의 개념과 해석 기준을 설명하시오.' },
        { id: 12, q: '신뢰도에 영향을 미치는 요인을 설명하시오.' }
      ]
    },
    {
      id: 3, title: '타당도', icon: '🎯',
      questions: [
        { id: 13, q: '타당도의 개념과 신뢰도와의 관계를 설명하시오.' },
        { id: 14, q: '내용타당도의 개념과 확인 방법을 설명하시오.' },
        { id: 15, q: '준거타당도(예언, 공인)의 개념을 설명하시오.' },
        { id: 16, q: '구인타당도의 개념과 확인 방법을 설명하시오.' },
        { id: 17, q: '수렴타당도와 변별타당도를 설명하시오.' },
        { id: 18, q: '요인분석의 목적과 활용을 설명하시오.' }
      ]
    },
    {
      id: 4, title: '규준과 점수', icon: '📊',
      questions: [
        { id: 19, q: '규준의 개념과 규준집단의 중요성을 설명하시오.' },
        { id: 20, q: '원점수와 변환점수의 관계를 설명하시오.' },
        { id: 21, q: '백분위 점수의 개념과 해석 방법을 설명하시오.' },
        { id: 22, q: '표준점수(Z점수)의 개념과 계산법을 설명하시오.' },
        { id: 23, q: 'T점수의 개념과 활용을 설명하시오.' },
        { id: 24, q: '스테나인(stanine)의 개념과 해석을 설명하시오.' }
      ]
    },
    {
      id: 5, title: '지능검사', icon: '🧠',
      questions: [
        { id: 25, q: '지능의 정의와 지능이론(Spearman, Gardner)을 설명하시오.' },
        { id: 26, q: 'Wechsler 지능검사의 특징과 구성을 설명하시오.' },
        { id: 27, q: 'K-WISC의 구성과 하위검사를 설명하시오.' },
        { id: 28, q: 'IQ점수의 의미와 해석 시 유의점을 설명하시오.' },
        { id: 29, q: '지능검사 결과의 교육적 활용을 설명하시오.' },
        { id: 30, q: '지능지수의 한계와 다중지능 관점을 설명하시오.' }
      ]
    },
    {
      id: 6, title: '성격검사', icon: '🔍',
      questions: [
        { id: 31, q: 'MMPI의 개발 배경과 특징을 설명하시오.' },
        { id: 32, q: 'MMPI 타당도 척도(L, F, K)의 의미를 설명하시오.' },
        { id: 33, q: 'MMPI 임상척도 10개를 설명하시오.' },
        { id: 34, q: 'MBTI의 4가지 선호지표를 설명하시오.' },
        { id: 35, q: 'MBTI 16가지 성격유형의 특징을 설명하시오.' },
        { id: 36, q: '성격검사 활용 시 유의사항을 설명하시오.' }
      ]
    },
    {
      id: 7, title: '적성 및 흥미검사', icon: '🎯',
      questions: [
        { id: 37, q: '적성의 개념과 적성검사의 목적을 설명하시오.' },
        { id: 38, q: 'Holland의 직업적 성격유형 6가지를 설명하시오.' },
        { id: 39, q: 'Holland 검사의 결과 해석 방법을 설명하시오.' },
        { id: 40, q: 'Strong 직업흥미검사의 구성을 설명하시오.' },
        { id: 41, q: '직업카드 분류법의 실시와 활용을 설명하시오.' },
        { id: 42, q: '청소년 진로검사 결과 해석 시 유의점을 설명하시오.' }
      ]
    },
    {
      id: 8, title: '투사검사와 활용', icon: '🎨',
      questions: [
        { id: 43, q: '투사검사의 기본 가정과 특징을 설명하시오.' },
        { id: 44, q: 'HTP 검사의 실시 방법과 해석 원리를 설명하시오.' },
        { id: 45, q: 'KFD(동적 가족화)의 실시와 해석을 설명하시오.' },
        { id: 46, q: 'SCT(문장완성검사)의 특성과 해석을 설명하시오.' },
        { id: 47, q: '검사 결과 피드백 제공 원칙을 설명하시오.' },
        { id: 48, q: '검사배터리 구성의 원리를 설명하시오.' },
        { id: 49, q: '심리평가 보고서 작성 요소를 설명하시오.' },
        { id: 50, q: '검사 윤리(자격, 비밀보장, 보안)를 설명하시오.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link><span className="mx-2">/</span>
            <Link href="/category/welfare" className="hover:text-gray-700">복지·상담</Link><span className="mx-2">/</span>
            <Link href="/category/welfare/youth-counselor-3" className="hover:text-gray-700">청소년상담사 3급</Link><span className="mx-2">/</span>
            <span className="text-gray-900">심리측정 및 평가</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📊</span>
            <h1 className="text-2xl font-bold">심리측정 및 평가</h1>
          </div>
          <p className="text-emerald-100">25문항 | 핵심 예상문제 50선</p>
        </div>
      </div>

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left"><h3 className="font-bold">{topic.title}</h3><p className="text-sm text-gray-500">{topic.questions.length}문제</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-emerald-600">{topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === topic.id && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((question) => (
                    <div key={question.id} className={`p-4 rounded-lg border ${completedQuestions.includes(question.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(question.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${completedQuestions.includes(question.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.includes(question.id) && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800">{question.q}</p>
                          <button onClick={() => openAIHelper(question.q)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1"><span>🤖</span> AI에게 물어보기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Link href="/category/welfare/youth-counselor-3/study/group-counseling-basics" className="text-gray-600 hover:text-gray-900 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>이전 과목</Link>
          <Link href="/category/welfare/youth-counselor-3/study/counseling-theory" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">다음 과목<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition"><span className="text-2xl">🟠</span><div><p className="font-medium">Claude</p><p className="text-sm text-gray-500">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition"><span className="text-2xl">🟢</span><div><p className="font-medium">ChatGPT</p><p className="text-sm text-gray-500">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"><span className="text-2xl">🔵</span><div><p className="font-medium">Gemini</p><p className="text-sm text-gray-500">Google AI</p></div></a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center"><p className="text-gray-400">청소년상담사 3급 - 심리측정 및 평가</p></div>
      </footer>
    </div>
  );
}
