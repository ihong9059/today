'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Civil9SocialPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil9-social-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil9-social-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'politics',
      title: '정치',
      icon: '🏛️',
      questions: [
        '정치의 의미와 기능에 대해 설명하시오.',
        '민주주의의 원리(국민주권, 권력분립 등)를 설명하시오.',
        '정치 참여의 유형과 중요성을 설명하시오.',
        '선거제도의 종류(다수대표제, 비례대표제)를 비교하시오.',
        '정당의 기능과 역할에 대해 논하시오.',
        '대통령제와 의원내각제를 비교하시오.',
        '국회의 구성과 기능을 설명하시오.',
        '헌법재판소의 권한에 대해 설명하시오.',
        '지방자치제도의 의의와 현황을 설명하시오.',
        '정치 과정과 여론 형성에 대해 논하시오.',
      ],
    },
    {
      id: 'economy',
      title: '경제',
      icon: '💰',
      questions: [
        '경제 문제의 발생 원인(희소성)을 설명하시오.',
        '시장경제체제와 계획경제체제를 비교하시오.',
        '수요와 공급의 법칙에 대해 설명하시오.',
        '시장가격의 결정과 변동에 대해 논하시오.',
        '시장실패의 원인과 해결방안을 설명하시오.',
        '경제성장과 물가, 실업의 관계를 설명하시오.',
        '국내총생산(GDP)의 개념과 의미를 설명하시오.',
        '재정정책과 통화정책을 비교하시오.',
        '무역의 이익과 국제수지에 대해 설명하시오.',
        '환율의 결정과 변동 효과를 설명하시오.',
      ],
    },
    {
      id: 'law',
      title: '법',
      icon: '⚖️',
      questions: [
        '법의 의미와 기능에 대해 설명하시오.',
        '법의 분류(공법, 사법, 사회법)를 설명하시오.',
        '법원(法源)의 종류에 대해 설명하시오.',
        '헌법의 기본원리에 대해 논하시오.',
        '기본권의 종류와 제한에 대해 설명하시오.',
        '형법의 기본원칙(죄형법정주의)을 설명하시오.',
        '민법의 기본원칙(사적자치)을 설명하시오.',
        '행정법의 기본원칙을 설명하시오.',
        '사회법(노동법, 경제법)의 특성을 설명하시오.',
        '국제법의 법원과 특성에 대해 논하시오.',
      ],
    },
    {
      id: 'society-culture',
      title: '사회·문화',
      icon: '👥',
      questions: [
        '사회화의 의미와 기관에 대해 설명하시오.',
        '사회구조와 사회제도의 관계를 설명하시오.',
        '사회집단의 유형과 특성을 설명하시오.',
        '사회계층화 현상과 이동에 대해 논하시오.',
        '사회불평등 현상과 해결방안을 설명하시오.',
        '일탈행동의 원인에 관한 이론을 설명하시오.',
        '문화의 의미와 특성에 대해 설명하시오.',
        '문화변동의 요인과 양상을 설명하시오.',
        '현대사회의 다양한 문제(고령화, 저출산)를 논하시오.',
        '사회보장제도의 유형과 내용을 설명하시오.',
      ],
    },
    {
      id: 'research',
      title: '사회탐구방법',
      icon: '🔍',
      questions: [
        '사회과학의 특성에 대해 설명하시오.',
        '양적 연구와 질적 연구를 비교하시오.',
        '실증적 연구방법의 절차를 설명하시오.',
        '조사연구(설문조사)의 장단점을 설명하시오.',
        '실험연구의 특징과 절차를 설명하시오.',
        '면접법과 관찰법을 비교하시오.',
        '문헌연구법의 특징을 설명하시오.',
        '표본추출방법의 종류를 설명하시오.',
        '변인(독립변인, 종속변인)의 관계를 설명하시오.',
        '연구윤리의 중요성에 대해 논하시오.',
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
              👥
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">사회</h1>
              <p className="text-gray-600">정치, 경제, 법, 사회문화</p>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 사회 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 정치, 경제, 법, 사회문화 4개 영역 균형 학습</li>
            <li>• 기본 개념과 원리를 정확히 이해</li>
            <li>• 시사 이슈와 연결하여 응용력 향상</li>
            <li>• 도표, 그래프 해석 연습 필수</li>
            <li>• 기출문제로 출제 경향 파악</li>
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
