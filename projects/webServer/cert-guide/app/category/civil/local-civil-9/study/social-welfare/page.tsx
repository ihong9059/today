'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Local9SocialWelfarePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('local9-social-welfare-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('local9-social-welfare-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'basic',
      title: '사회복지 기초',
      icon: '📚',
      questions: [
        '사회복지의 개념과 범위에 대해 설명하시오.',
        '사회복지와 사회보장의 관계를 설명하시오.',
        '잔여적 복지와 제도적 복지를 비교하시오.',
        '사회복지의 가치(인간존엄성, 평등, 사회정의)를 설명하시오.',
        '사회복지의 동기(인도주의, 사회통제 등)를 설명하시오.',
        '사회복지 발달 이론(수렴이론, 확산이론 등)을 설명하시오.',
        '사회복지 역사(빈민법, 엘리자베스 구빈법)를 설명하시오.',
        '베버리지 보고서의 주요 내용과 의의를 설명하시오.',
        '복지국가의 유형(에스핑-앤더슨)을 비교하시오.',
        '한국 사회복지의 발전 과정을 설명하시오.',
      ],
    },
    {
      id: 'policy',
      title: '사회복지정책',
      icon: '📋',
      questions: [
        '사회복지정책의 개념과 특성에 대해 설명하시오.',
        '사회복지정책의 목표와 기능을 설명하시오.',
        '사회복지정책의 형성과정을 설명하시오.',
        '할당(대상자 선정)의 원칙과 방법을 설명하시오.',
        '급여의 형태(현금, 현물, 서비스)를 비교하시오.',
        '사회복지 재정(조세, 사회보험료)을 설명하시오.',
        '사회복지 전달체계의 원칙과 유형을 설명하시오.',
        '사회복지정책 평가의 기준과 방법을 논하시오.',
        '사회보험과 공공부조의 차이를 비교하시오.',
        '사회복지정책의 최근 동향을 설명하시오.',
      ],
    },
    {
      id: 'institution',
      title: '사회보장제도',
      icon: '🏛️',
      questions: [
        '국민연금제도의 구조와 특성을 설명하시오.',
        '건강보험제도의 내용과 급여를 설명하시오.',
        '고용보험제도의 구성과 급여를 설명하시오.',
        '산업재해보상보험의 특성과 급여를 설명하시오.',
        '노인장기요양보험의 내용을 설명하시오.',
        '국민기초생활보장제도의 구조를 설명하시오.',
        '기초연금제도의 내용과 의의를 설명하시오.',
        '아동수당과 양육수당을 비교하시오.',
        '긴급복지지원제도에 대해 설명하시오.',
        '장애인 복지정책의 주요 내용을 설명하시오.',
      ],
    },
    {
      id: 'practice',
      title: '사회복지실천',
      icon: '🤝',
      questions: [
        '사회복지실천의 개념과 목적에 대해 설명하시오.',
        '사회복지실천의 가치와 윤리를 설명하시오.',
        '사회복지사의 역할과 기능을 설명하시오.',
        '사회복지실천의 관계론에 대해 논하시오.',
        '사회복지실천 과정(접수, 사정, 개입, 평가)을 설명하시오.',
        '개별사회사업의 특성과 기법을 설명하시오.',
        '집단사회사업의 유형과 과정을 설명하시오.',
        '지역사회복지실천 모델을 비교하시오.',
        '사례관리의 개념과 과정을 설명하시오.',
        '사회복지조직 관리의 원칙을 설명하시오.',
      ],
    },
    {
      id: 'field',
      title: '분야별 사회복지',
      icon: '👨‍👩‍👧‍👦',
      questions: [
        '아동복지의 원칙과 주요 서비스를 설명하시오.',
        '청소년복지의 특성과 정책을 설명하시오.',
        '노인복지의 현황과 과제를 설명하시오.',
        '장애인복지의 이념과 서비스를 설명하시오.',
        '가족복지의 접근방법과 서비스를 설명하시오.',
        '여성복지의 주요 이슈와 정책을 설명하시오.',
        '정신건강 사회복지의 역할을 설명하시오.',
        '의료사회복지의 기능과 역할을 설명하시오.',
        '학교사회복지의 필요성과 역할을 설명하시오.',
        '지역사회복지의 이론과 실천을 설명하시오.',
      ],
    },
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;

  const handleAIClick = (question: string) => {
    setSelectedQuestion(question);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/local-civil-9" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            ← 지방직 9급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl">🤝</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">사회복지학개론</h1>
              <p className="text-gray-600">사회복지 정책, 실천, 제도</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">진행률</p>
              <p className="text-2xl font-bold text-emerald-600">{completedCount}/{totalQuestions}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((_, idx) => completedQuestions[`${topic.id}-${idx}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button onClick={() => setExpandedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition ${expandedTopics[topic.id] ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="px-6 pb-6 space-y-3">
                    {topic.questions.map((question, idx) => {
                      const isCompleted = completedQuestions[`${topic.id}-${idx}`];
                      return (
                        <div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 hover:border-emerald-400'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p>
                              <button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium">🤖 AI에게 물어보기</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-emerald-50 rounded-2xl p-6">
          <h3 className="font-bold text-emerald-800 mb-3">📖 사회복지학개론 학습 가이드</h3>
          <ul className="text-sm text-emerald-700 space-y-2">
            <li>• 사회복지의 기본 개념과 가치 이해</li>
            <li>• 사회보장제도(4대 보험, 공공부조)의 구조 암기</li>
            <li>• 사회복지실천의 과정과 기법 숙지</li>
            <li>• 분야별 복지서비스의 대상과 내용 정리</li>
            <li>• 최근 복지정책 변화와 이슈 파악</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
