'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Civil9HistoryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil9-history-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil9-history-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'ancient',
      title: '선사~고대',
      icon: '🏺',
      questions: [
        '구석기 시대와 신석기 시대의 특징을 비교하시오.',
        '청동기 시대의 사회 변화에 대해 설명하시오.',
        '고조선의 건국과 8조법을 설명하시오.',
        '삼한의 정치와 사회 특징을 설명하시오.',
        '고구려의 발전 과정과 전성기를 설명하시오.',
        '백제의 건국과 발전 과정을 설명하시오.',
        '신라의 발전과 삼국 통일 과정을 설명하시오.',
        '발해의 건국과 문화적 특징을 설명하시오.',
        '삼국의 불교 수용과 발전에 대해 논하시오.',
        '삼국 시대의 대외 관계를 설명하시오.',
      ],
    },
    {
      id: 'medieval',
      title: '고려 시대',
      icon: '🏯',
      questions: [
        '고려의 건국과 후삼국 통일 과정을 설명하시오.',
        '고려 태조의 정책(훈요10조 등)에 대해 논하시오.',
        '고려의 중앙 정치 제도(2성 6부)를 설명하시오.',
        '고려의 지방 행정 제도를 설명하시오.',
        '고려의 과거 제도와 교육 제도를 설명하시오.',
        '고려의 토지 제도(전시과, 공음전)를 설명하시오.',
        '무신정권의 성립과 전개 과정을 설명하시오.',
        '몽골 침입과 대몽 항쟁에 대해 논하시오.',
        '고려 후기 개혁 정치(공민왕)를 설명하시오.',
        '고려의 문화(불교, 인쇄술, 청자)를 설명하시오.',
      ],
    },
    {
      id: 'joseon-early',
      title: '조선 전기',
      icon: '🎎',
      questions: [
        '조선 건국과 한양 천도의 의의를 설명하시오.',
        '조선의 중앙 정치 제도(의정부, 6조)를 설명하시오.',
        '조선의 지방 행정 제도(8도, 관찰사)를 설명하시오.',
        '조선의 과거 제도와 관료 선발을 설명하시오.',
        '조선의 토지 제도(과전법, 직전법)를 설명하시오.',
        '세종대의 문화적 업적에 대해 논하시오.',
        '훈구와 사림의 갈등과 사화에 대해 설명하시오.',
        '붕당 정치의 형성과 전개를 설명하시오.',
        '임진왜란의 발발과 극복 과정을 설명하시오.',
        '병자호란의 원인과 결과를 설명하시오.',
      ],
    },
    {
      id: 'joseon-late',
      title: '조선 후기',
      icon: '📜',
      questions: [
        '영조와 정조의 탕평 정치에 대해 논하시오.',
        '세도 정치의 전개와 폐해를 설명하시오.',
        '조선 후기 사회 경제적 변화를 설명하시오.',
        '조선 후기 상품 화폐 경제의 발달을 설명하시오.',
        '실학의 등장 배경과 주요 학자들을 설명하시오.',
        '서학(천주교)의 전래와 박해를 설명하시오.',
        '홍경래의 난과 농민 봉기의 원인을 설명하시오.',
        '흥선대원군의 개혁 정치를 설명하시오.',
        '강화도 조약의 내용과 의의를 설명하시오.',
        '개화파와 위정척사파의 갈등을 설명하시오.',
      ],
    },
    {
      id: 'modern',
      title: '근현대사',
      icon: '🏛️',
      questions: [
        '갑신정변의 전개와 의의를 설명하시오.',
        '동학농민운동의 전개와 의의를 설명하시오.',
        '갑오개혁의 주요 내용을 설명하시오.',
        '대한제국의 성립과 광무개혁을 설명하시오.',
        '을사늑약과 국권 피탈 과정을 설명하시오.',
        '3·1운동의 전개와 역사적 의의를 설명하시오.',
        '대한민국 임시정부의 활동을 설명하시오.',
        '무장 독립 투쟁(독립군, 광복군)에 대해 논하시오.',
        '8·15 광복과 대한민국 정부 수립을 설명하시오.',
        '6·25 전쟁의 발발과 전개 과정을 설명하시오.',
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
              🏛️
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">한국사</h1>
              <p className="text-gray-600">선사~현대사</p>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 한국사 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 시대별 흐름을 먼저 파악한 후 세부 사항 학습</li>
            <li>• 근현대사 비중이 높으므로 철저히 대비</li>
            <li>• 정치사, 경제사, 문화사를 연결하여 이해</li>
            <li>• 연표 정리로 사건의 선후 관계 파악</li>
            <li>• 기출문제로 출제 빈도 높은 주제 확인</li>
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
