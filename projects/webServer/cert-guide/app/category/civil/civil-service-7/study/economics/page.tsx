'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Civil7EconomicsPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil7-economics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-economics-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'micro-basic',
      title: '미시경제학 기초',
      icon: '📈',
      questions: [
        '경제학의 10대 원리에 대해 설명하시오.',
        '수요와 공급의 법칙 및 균형가격 결정을 설명하시오.',
        '탄력성(가격탄력성, 소득탄력성, 교차탄력성)의 개념과 활용을 논하시오.',
        '소비자 잉여와 생산자 잉여의 개념과 후생분석을 설명하시오.',
        '가격 상한제와 가격 하한제의 효과를 분석하시오.',
        '조세의 귀착과 효율성에 대해 논하시오.',
        '효용이론과 소비자 선택의 원리를 설명하시오.',
        '무차별곡선과 예산제약을 이용한 최적 소비 분석을 설명하시오.',
        '소득효과와 대체효과의 분해를 설명하시오.',
        '기펜재와 열등재의 개념과 사례를 논하시오.',
      ],
    },
    {
      id: 'micro-advanced',
      title: '미시경제학 심화',
      icon: '🔬',
      questions: [
        '생산함수와 비용함수의 관계를 설명하시오.',
        '단기비용과 장기비용의 차이점에 대해 논하시오.',
        '완전경쟁시장의 특징과 기업의 이윤극대화 조건을 설명하시오.',
        '독점시장의 특징과 후생손실에 대해 논하시오.',
        '가격차별의 종류와 조건을 설명하시오.',
        '독점적 경쟁시장의 특징과 단기·장기균형을 분석하시오.',
        '과점시장에서 쿠르노, 베르트랑, 스타켈버그 모형을 비교하시오.',
        '게임이론의 기본개념(내쉬균형, 우월전략)을 설명하시오.',
        '외부효과의 종류와 시장실패에 대해 논하시오.',
        '코즈정리의 내용과 한계를 설명하시오.',
      ],
    },
    {
      id: 'macro-basic',
      title: '거시경제학 기초',
      icon: '🌐',
      questions: [
        'GDP의 개념과 측정방법(생산, 지출, 소득접근)을 설명하시오.',
        '명목GDP와 실질GDP의 차이 및 GDP 디플레이터를 설명하시오.',
        '실업의 종류(마찰적, 구조적, 경기적)와 자연실업률을 논하시오.',
        '인플레이션의 원인과 비용에 대해 설명하시오.',
        '소비함수 이론(케인즈, 항상소득, 생애주기)을 비교하시오.',
        '투자결정 이론과 토빈의 q이론을 설명하시오.',
        '승수효과와 정부지출승수의 도출을 설명하시오.',
        '화폐의 기능과 통화량 지표(M1, M2)에 대해 논하시오.',
        '화폐수량설과 피셔방정식을 설명하시오.',
        '중앙은행의 역할과 통화정책 수단에 대해 논하시오.',
      ],
    },
    {
      id: 'macro-advanced',
      title: '거시경제학 심화',
      icon: '📊',
      questions: [
        'IS-LM 모형의 도출과 재정·통화정책 효과를 분석하시오.',
        '유동성 함정과 투자 함정에서의 정책 효과를 논하시오.',
        '총수요-총공급 모형과 경기변동을 설명하시오.',
        '스태그플레이션의 원인과 대응 방안에 대해 논하시오.',
        '필립스 곡선의 단기·장기 관계를 설명하시오.',
        '합리적 기대가설과 정책무력성 명제를 논하시오.',
        '경제성장론(솔로우 모형)의 핵심 내용을 설명하시오.',
        '내생적 성장이론의 주요 모형을 설명하시오.',
        '경기변동론(실물경기변동, 새케인즈학파)을 비교하시오.',
        '재정정책과 통화정책의 상대적 유효성을 논하시오.',
      ],
    },
    {
      id: 'international-public',
      title: '국제경제학과 재정학',
      icon: '💹',
      questions: [
        '비교우위론과 무역의 이익에 대해 설명하시오.',
        '헥셔-올린 정리와 스톨퍼-사무엘슨 정리를 논하시오.',
        '관세와 비관세장벽의 효과를 분석하시오.',
        '환율결정 이론(구매력평가설, 이자율평가설)을 설명하시오.',
        '고정환율제도와 변동환율제도를 비교하시오.',
        '먼델-플레밍 모형의 정책함의를 논하시오.',
        '국제수지의 구성과 결정요인에 대해 설명하시오.',
        '조세의 원칙(공평, 효율, 징수편의)을 설명하시오.',
        '공공재의 특성과 최적 공급 조건에 대해 논하시오.',
        '소득재분배 정책과 형평성에 대해 논하시오.',
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
              💹
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">경제학</h1>
              <p className="text-gray-600">미시경제학, 거시경제학, 국제경제학, 재정학</p>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 경제학 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 미시경제학: 수요·공급 분석과 시장구조론 기초 확립</li>
            <li>• 거시경제학: IS-LM, AD-AS 모형의 정책효과 분석 숙달</li>
            <li>• 그래프 해석과 수리적 풀이 능력이 필수</li>
            <li>• 국제경제학과 재정학은 기본 개념 위주로 학습</li>
            <li>• 시사경제 이슈와 이론을 연결하는 응용력 키우기</li>
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
