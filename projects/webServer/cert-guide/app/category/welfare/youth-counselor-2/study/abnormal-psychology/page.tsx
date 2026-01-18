'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function AbnormalPsychologyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-2-abnormal-psychology-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-2-abnormal-psychology-progress', JSON.stringify(completedQuestions));
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
      title: '이상심리의 기초',
      icon: '📚',
      questions: [
        { id: 1, q: '이상행동의 정의 기준(통계적, 사회적, 주관적, 기능적)을 설명하시오.' },
        { id: 2, q: '이상심리학의 역사적 관점(악마론, 체액론, 의학모델)을 설명하시오.' },
        { id: 3, q: '생물학적 모델의 주요 가정과 치료 접근을 설명하시오.' },
        { id: 4, q: '심리역동적 모델의 주요 가정과 치료 접근을 설명하시오.' },
        { id: 5, q: '인지행동적 모델의 주요 가정과 치료 접근을 설명하시오.' },
        { id: 6, q: 'DSM-5의 특징과 분류체계를 설명하시오.' }
      ]
    },
    {
      id: 2,
      title: '불안장애',
      icon: '😰',
      questions: [
        { id: 7, q: '불안의 정의와 공포, 불안의 차이점을 설명하시오.' },
        { id: 8, q: '범불안장애의 DSM-5 진단기준과 특징을 설명하시오.' },
        { id: 9, q: '공황장애의 DSM-5 진단기준과 공황발작 증상을 설명하시오.' },
        { id: 10, q: '사회불안장애의 DSM-5 진단기준과 청소년 특성을 설명하시오.' },
        { id: 11, q: '특정공포증의 유형과 치료 접근(노출치료)을 설명하시오.' },
        { id: 12, q: '분리불안장애의 DSM-5 진단기준과 아동·청소년 특성을 설명하시오.' }
      ]
    },
    {
      id: 3,
      title: '우울장애',
      icon: '😢',
      questions: [
        { id: 13, q: '주요우울장애의 DSM-5 진단기준(증상 9가지, 기간)을 설명하시오.' },
        { id: 14, q: '지속성 우울장애(기분부전장애)의 진단기준과 특징을 설명하시오.' },
        { id: 15, q: '우울증의 인지적 모델(Beck의 인지삼제)을 설명하시오.' },
        { id: 16, q: '학습된 무기력(Seligman)과 우울증의 관계를 설명하시오.' },
        { id: 17, q: '청소년 우울의 특성과 성인 우울과의 차이점을 설명하시오.' },
        { id: 18, q: '자살의 위험요인과 보호요인을 설명하시오.' }
      ]
    },
    {
      id: 4,
      title: '양극성 장애',
      icon: '🎭',
      questions: [
        { id: 19, q: '양극성 I형 장애의 진단기준과 조증 삽화 증상을 설명하시오.' },
        { id: 20, q: '양극성 II형 장애의 진단기준과 경조증 삽화의 특징을 설명하시오.' },
        { id: 21, q: '순환성 장애의 진단기준을 설명하시오.' },
        { id: 22, q: '양극성 장애의 생물학적 원인과 치료 접근을 설명하시오.' },
        { id: 23, q: '청소년기 양극성 장애의 진단적 어려움과 특성을 설명하시오.' },
        { id: 24, q: '기분장애의 계절성 양상과 특징을 설명하시오.' }
      ]
    },
    {
      id: 5,
      title: '외상 및 스트레스 관련 장애',
      icon: '💔',
      questions: [
        { id: 25, q: 'PTSD의 DSM-5 진단기준(4가지 증상군)을 설명하시오.' },
        { id: 26, q: '급성 스트레스 장애와 PTSD의 차이점을 설명하시오.' },
        { id: 27, q: '적응장애의 진단기준과 하위유형을 설명하시오.' },
        { id: 28, q: '외상의 유형(단일 vs 복합)과 복합외상의 특성을 설명하시오.' },
        { id: 29, q: '청소년 외상후스트레스의 특성과 치료적 접근을 설명하시오.' },
        { id: 30, q: '해리장애의 유형과 특성을 설명하시오.' }
      ]
    },
    {
      id: 6,
      title: '섭식장애',
      icon: '🍽️',
      questions: [
        { id: 31, q: '신경성 식욕부진증의 DSM-5 진단기준과 특징을 설명하시오.' },
        { id: 32, q: '신경성 폭식증의 DSM-5 진단기준과 특징을 설명하시오.' },
        { id: 33, q: '폭식장애의 진단기준과 신경성 폭식증과의 차이를 설명하시오.' },
        { id: 34, q: '섭식장애의 원인(생물, 심리, 사회문화적 요인)을 설명하시오.' },
        { id: 35, q: '청소년 섭식장애의 특성과 치료적 접근을 설명하시오.' },
        { id: 36, q: '회피/제한적 음식섭취 장애의 특성을 설명하시오.' }
      ]
    },
    {
      id: 7,
      title: '청소년기 장애 (ADHD, 품행장애)',
      icon: '🧒',
      questions: [
        { id: 37, q: 'ADHD의 DSM-5 진단기준(부주의, 과잉행동-충동성)을 설명하시오.' },
        { id: 38, q: 'ADHD의 3가지 하위유형과 특성을 설명하시오.' },
        { id: 39, q: 'ADHD의 원인론과 신경생물학적 특성을 설명하시오.' },
        { id: 40, q: '품행장애의 DSM-5 진단기준과 증상 범주를 설명하시오.' },
        { id: 41, q: '적대적 반항장애의 진단기준과 품행장애와의 관계를 설명하시오.' },
        { id: 42, q: '청소년 비행의 발달경로(조기발병형 vs 청소년기 제한형)를 설명하시오.' }
      ]
    },
    {
      id: 8,
      title: '기타 장애와 감별진단',
      icon: '🔍',
      questions: [
        { id: 43, q: '자폐스펙트럼장애의 DSM-5 진단기준과 특성을 설명하시오.' },
        { id: 44, q: '틱장애와 투렛장애의 진단기준을 설명하시오.' },
        { id: 45, q: '인터넷 게임장애의 진단기준과 청소년 특성을 설명하시오.' },
        { id: 46, q: '성격장애의 일반적 특성과 청소년 진단 시 주의점을 설명하시오.' },
        { id: 47, q: '우울장애와 양극성 장애의 감별진단 포인트를 설명하시오.' },
        { id: 48, q: 'ADHD와 품행장애의 공병 특성과 치료적 함의를 설명하시오.' },
        { id: 49, q: '불안장애와 우울장애의 공병 특성을 설명하시오.' },
        { id: 50, q: '청소년 정신장애의 연속성 관점과 조기개입의 중요성을 설명하시오.' }
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
            <span className="text-gray-900">이상심리</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🧠</span>
            <h1 className="text-2xl font-bold">이상심리</h1>
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
          <Link href="/category/welfare/youth-counselor-2/study/psychological-assessment" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 과목
          </Link>
          <Link href="/category/welfare/youth-counselor-2/study/career-counseling" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
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
          <p className="text-gray-400">청소년상담사 2급 - 이상심리</p>
        </div>
      </footer>
    </div>
  );
}
