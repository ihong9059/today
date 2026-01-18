'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Civil9AdminIntroPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil9-admin-intro-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil9-admin-intro-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'theory',
      title: '행정학 기초 이론',
      icon: '📚',
      questions: [
        '행정의 개념을 정의하고 특성을 설명하시오.',
        '행정과 경영의 유사점과 차이점을 비교하시오.',
        '정치행정이원론과 정치행정일원론을 비교하시오.',
        '행정학의 발달 과정을 시대별로 설명하시오.',
        '과학적 관리론의 주요 내용과 한계를 설명하시오.',
        '인간관계론의 등장 배경과 주요 내용을 설명하시오.',
        '행정행태론의 특징과 공헌을 설명하시오.',
        '신공공관리론(NPM)의 특징과 비판을 설명하시오.',
        '뉴거버넌스의 개념과 특징을 설명하시오.',
        '행정의 가치(능률성, 효과성, 형평성)를 비교하시오.',
      ],
    },
    {
      id: 'organization',
      title: '조직론',
      icon: '🏢',
      questions: [
        '조직의 개념과 유형에 대해 설명하시오.',
        '관료제의 특징과 역기능에 대해 논하시오.',
        '조직구조의 기본 변수(복잡성, 공식화, 집권화)를 설명하시오.',
        '계선조직과 참모조직의 차이를 설명하시오.',
        '위원회 조직의 장단점에 대해 논하시오.',
        '팀제 조직의 특징과 효과를 설명하시오.',
        '동기부여 이론(내용이론, 과정이론)을 설명하시오.',
        'McGregor의 X이론과 Y이론을 비교하시오.',
        'Herzberg의 2요인 이론을 설명하시오.',
        '리더십 이론의 발전 과정을 설명하시오.',
      ],
    },
    {
      id: 'personnel',
      title: '인사행정론',
      icon: '👥',
      questions: [
        '인사행정의 의의와 기능에 대해 설명하시오.',
        '엽관주의와 실적주의를 비교 설명하시오.',
        '직업공무원제의 의의와 확립 요건을 설명하시오.',
        '대표관료제의 개념과 장단점을 논하시오.',
        '직위분류제와 계급제를 비교 설명하시오.',
        '공무원 채용 방식(공개경쟁, 경력경쟁)을 설명하시오.',
        '공무원 교육훈련의 종류와 방법을 설명하시오.',
        '공무원 성과평가제도에 대해 설명하시오.',
        '공무원 보수체계(호봉제, 성과급)를 비교하시오.',
        '공무원 신분보장과 징계에 대해 설명하시오.',
      ],
    },
    {
      id: 'budget',
      title: '재무행정론',
      icon: '💵',
      questions: [
        '예산의 개념과 기능에 대해 설명하시오.',
        '예산의 원칙(완전성, 통일성 등)을 설명하시오.',
        '예산의 종류(일반회계, 특별회계, 기금)를 설명하시오.',
        '예산 과정(편성, 심의, 집행, 결산)을 설명하시오.',
        '품목별 예산제도(LIBS)의 특징을 설명하시오.',
        '성과주의 예산제도(PBS)의 특징을 설명하시오.',
        '계획예산제도(PPBS)의 특징을 설명하시오.',
        '영기준 예산제도(ZBB)의 특징을 설명하시오.',
        '결과기반 예산제도의 특징을 설명하시오.',
        '정부회계제도(발생주의, 복식부기)를 설명하시오.',
      ],
    },
    {
      id: 'policy-local',
      title: '정책학과 지방행정',
      icon: '🏛️',
      questions: [
        '정책의 개념과 유형에 대해 설명하시오.',
        '정책결정모형(합리모형, 점증모형)을 비교하시오.',
        '정책의제설정에 대해 설명하시오.',
        '정책집행의 접근방법(하향식, 상향식)을 비교하시오.',
        '정책평가의 유형과 방법을 설명하시오.',
        '지방자치의 개념과 의의에 대해 설명하시오.',
        '지방자치단체의 종류와 특성을 설명하시오.',
        '지방자치단체의 기관 구성(기관대립형, 기관통합형)을 비교하시오.',
        '주민참여 제도(주민투표, 주민소환 등)를 설명하시오.',
        '지방재정의 구조와 특성에 대해 논하시오.',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/civil/civil-service-9"
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            ← 9급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center text-3xl">
              🏢
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">행정학개론</h1>
              <p className="text-gray-600">행정이론, 조직론, 인사행정, 재무행정, 정책학</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">진행률</p>
              <p className="text-2xl font-bold text-slate-600">
                {completedCount}/{totalQuestions}
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-slate-500 to-gray-600 h-3 rounded-full transition-all"
              style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (_, idx) => completedQuestions[`${topic.id}-${idx}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span
                    className={`transform transition ${expandedTopics[topic.id] ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="px-6 pb-6 space-y-3">
                    {topic.questions.map((question, idx) => {
                      const isCompleted = completedQuestions[`${topic.id}-${idx}`];
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border-2 transition ${
                            isCompleted
                              ? 'border-slate-300 bg-slate-50'
                              : 'border-gray-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, idx)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'border-slate-500 bg-slate-500 text-white'
                                  : 'border-gray-300 hover:border-slate-400'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>
                                {idx + 1}. {question}
                              </p>
                              <button
                                onClick={() => handleAIClick(question)}
                                className="mt-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
                              >
                                🤖 AI에게 물어보기
                              </button>
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

        <div className="mt-8 bg-slate-50 rounded-2xl p-6">
          <h3 className="font-bold text-slate-800 mb-3">📖 행정학개론 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 행정이론의 발전 과정을 체계적으로 이해</li>
            <li>• 조직론과 인사행정은 기본 개념 암기 필수</li>
            <li>• 재무행정의 예산제도 종류와 특징 비교</li>
            <li>• 정책학은 모형과 과정 중심으로 학습</li>
            <li>• 지방행정 관련 최신 제도 파악 중요</li>
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
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition"
              >
                Claude로 학습하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition"
              >
                ChatGPT로 학습하기
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition"
              >
                Gemini로 학습하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
