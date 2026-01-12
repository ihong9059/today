'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Civil7AdminSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil7-admin-science-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-admin-science-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'admin-theory',
      title: '행정학 이론',
      icon: '📚',
      questions: [
        '행정학의 의의와 학문적 성격에 대해 설명하시오.',
        '행정의 개념을 행정법적 관점과 행정학적 관점에서 비교하시오.',
        '정치행정이원론과 정치행정일원론을 비교 설명하시오.',
        '과학적 관리론의 주요 내용과 한계를 논하시오.',
        '행정행태론의 특징과 공헌을 설명하시오.',
        '신행정학(New Public Administration)의 주요 내용을 설명하시오.',
        '신공공관리론(NPM)의 특징과 비판에 대해 논하시오.',
        '뉴거버넌스(New Governance)의 개념과 특징을 설명하시오.',
        '행정학의 접근방법(생태론, 체제론 등)을 비교하시오.',
        '포스트모더니즘 행정이론의 특징과 시사점을 논하시오.',
      ],
    },
    {
      id: 'organization',
      title: '조직론',
      icon: '🏢',
      questions: [
        '조직의 개념과 유형에 대해 설명하시오.',
        '고전적 조직이론(관료제, 과학적 관리론)의 특징을 논하시오.',
        '막스 베버의 관료제 이론과 그 한계를 설명하시오.',
        '인간관계론의 주요 내용과 호손실험의 시사점을 논하시오.',
        '조직구조의 변수(복잡성, 공식화, 집권화)를 설명하시오.',
        '조직형태(계선조직, 참모조직, 위원회조직 등)를 비교하시오.',
        '팀제 조직의 특징과 장단점을 설명하시오.',
        '네트워크 조직의 개념과 특성에 대해 논하시오.',
        '조직문화의 개념과 유형을 설명하시오.',
        '조직발전(OD)의 의의와 기법에 대해 논하시오.',
      ],
    },
    {
      id: 'personnel',
      title: '인사행정론',
      icon: '👥',
      questions: [
        '인사행정의 개념과 주요 원칙에 대해 설명하시오.',
        '직업공무원제의 의의와 수립 요건을 논하시오.',
        '엽관주의와 실적주의를 비교 설명하시오.',
        '대표관료제의 개념과 논쟁점에 대해 논하시오.',
        '직위분류제와 계급제를 비교 설명하시오.',
        '공직의 개방성 확대 방안에 대해 논하시오.',
        '고위공무원단제도의 도입 취지와 운영 현황을 설명하시오.',
        '공무원 성과평가제도의 종류와 문제점을 논하시오.',
        '공무원 보수체계(직무급, 연공급, 성과급)를 비교하시오.',
        '공무원 노동기본권의 내용과 제한에 대해 설명하시오.',
      ],
    },
    {
      id: 'budget',
      title: '재무행정론',
      icon: '💵',
      questions: [
        '예산의 개념과 기능에 대해 설명하시오.',
        '예산의 원칙(완전성, 통일성, 한정성 등)을 설명하시오.',
        '품목별 예산제도(LIBS)의 특징과 장단점을 논하시오.',
        '성과주의 예산제도(PBS)의 개념과 운영방식을 설명하시오.',
        '계획예산제도(PPBS)의 특징과 한계를 논하시오.',
        '영기준 예산제도(ZBB)의 개념과 적용을 설명하시오.',
        '결과기반 예산제도의 특징과 시사점을 논하시오.',
        '예산과정(편성, 심의, 집행, 결산)에 대해 설명하시오.',
        '재정민주주의와 주민참여예산제에 대해 논하시오.',
        '정부회계제도(발생주의, 복식부기)의 도입 의의를 설명하시오.',
      ],
    },
    {
      id: 'policy',
      title: '정책학',
      icon: '📊',
      questions: [
        '정책의 개념과 유형(배분정책, 규제정책 등)에 대해 설명하시오.',
        '정책결정모형(합리모형, 점증모형, 만족모형)을 비교하시오.',
        '정책의제설정과 정책창(policy window)을 설명하시오.',
        '정책네트워크(철의 삼각, 이슈 네트워크)를 비교하시오.',
        '정책집행연구의 접근방법(하향식, 상향식)을 설명하시오.',
        '정책평가의 유형과 방법에 대해 논하시오.',
        '정책변동의 유형과 영향요인에 대해 설명하시오.',
        '규제정책의 유형과 규제개혁 방안을 논하시오.',
        '정책분석에서 비용편익분석의 의의와 한계를 설명하시오.',
        '증거기반 정책결정(EBPM)의 개념과 시사점을 논하시오.',
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
            href="/category/civil/civil-service-7"
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            ← 7급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center text-3xl">
              🏢
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">행정학</h1>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 행정학 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 행정이론의 발전과정(고전이론→신공공관리론→뉴거버넌스)을 체계적으로 이해</li>
            <li>• 조직론은 이론과 실제 적용 사례를 연결하여 학습</li>
            <li>• 인사행정과 재무행정은 최근 제도 변화에 주목</li>
            <li>• 정책학은 다양한 모형과 사례를 함께 학습</li>
            <li>• 시사 이슈와 연계한 응용 문제 대비가 중요</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition"
              >
                Claude로 학습하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition"
              >
                ChatGPT로 학습하기
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`}
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
