'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Civil7ConstitutionalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil7-constitutional-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-constitutional-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'general-theory',
      title: '헌법총론',
      icon: '⚖️',
      questions: [
        '헌법의 의의와 특성에 대해 설명하시오.',
        '성문헌법과 불문헌법의 차이점을 비교하시오.',
        '헌법의 제정권력과 헌법개정권력의 관계를 논하시오.',
        '헌법의 해석 방법과 헌법변천에 대해 설명하시오.',
        '헌법의 수호자에 관한 논쟁(슈미트 vs 켈젠)을 설명하시오.',
        '대한민국 헌법의 기본원리(국민주권, 자유민주주의 등)를 논하시오.',
        '법치주의의 내용과 현대적 변용에 대해 설명하시오.',
        '사회국가 원리의 헌법적 근거와 내용을 논하시오.',
        '문화국가 원리의 의의와 내용에 대해 설명하시오.',
        '국제평화주의와 평화통일 원칙을 설명하시오.',
      ],
    },
    {
      id: 'basic-rights',
      title: '기본권 총론',
      icon: '🛡️',
      questions: [
        '기본권의 주체(국민, 외국인, 법인)에 대해 설명하시오.',
        '기본권의 효력(대국가적, 대사인적 효력)을 논하시오.',
        '기본권의 갈등과 경합에 대해 설명하시오.',
        '기본권 제한의 일반원칙(법률유보, 비례의 원칙)을 논하시오.',
        '본질적 내용 침해 금지 원칙에 대해 설명하시오.',
        '과잉금지 원칙의 4단계 심사를 설명하시오.',
        '기본권의 침해와 구제에 대해 논하시오.',
        '헌법소원심판의 청구요건에 대해 설명하시오.',
        '기본권 보호의무 이론에 대해 논하시오.',
        '기본권 경쟁(경합)의 해결방법을 설명하시오.',
      ],
    },
    {
      id: 'individual-rights',
      title: '기본권 각론',
      icon: '📜',
      questions: [
        '인간의 존엄과 가치, 행복추구권의 내용을 설명하시오.',
        '평등권의 의의와 위헌심사기준에 대해 논하시오.',
        '신체의 자유의 실체적·절차적 내용을 설명하시오.',
        '거주이전의 자유와 직업선택의 자유를 비교하시오.',
        '언론·출판의 자유의 보호영역과 한계를 논하시오.',
        '집회·결사의 자유의 내용과 제한을 설명하시오.',
        '재산권의 보장과 공용침해에 대해 논하시오.',
        '청구권적 기본권(청원권, 재판청구권 등)을 설명하시오.',
        '참정권(선거권, 피선거권, 국민투표권)의 내용을 논하시오.',
        '사회적 기본권의 법적 성격과 내용에 대해 설명하시오.',
      ],
    },
    {
      id: 'government',
      title: '통치구조 (정부형태)',
      icon: '🏛️',
      questions: [
        '권력분립의 원리와 현대적 변용에 대해 설명하시오.',
        '대통령제와 의원내각제를 비교하시오.',
        '대한민국 정부형태의 특성에 대해 논하시오.',
        '대통령의 헌법상 지위와 권한을 설명하시오.',
        '대통령의 긴급명령권과 긴급재정경제명령권을 비교하시오.',
        '국무총리의 헌법상 지위와 권한에 대해 논하시오.',
        '국무회의의 헌법상 지위와 심의사항을 설명하시오.',
        '감사원의 헌법상 지위와 권한에 대해 논하시오.',
        '선거관리위원회의 헌법상 지위와 기능을 설명하시오.',
        '지방자치의 헌법적 보장에 대해 논하시오.',
      ],
    },
    {
      id: 'legislature-judiciary',
      title: '국회와 사법부',
      icon: '🏢',
      questions: [
        '국회의 헌법상 지위와 기능에 대해 설명하시오.',
        '국회의 입법권과 법률안 의결 절차를 설명하시오.',
        '국회의 예산안 심의·확정권에 대해 논하시오.',
        '국정감사권과 국정조사권을 비교 설명하시오.',
        '국회의원의 불체포특권과 면책특권을 설명하시오.',
        '국회의원의 발언·표결 자유 제한에 대해 논하시오.',
        '사법권의 의의와 한계에 대해 설명하시오.',
        '법관의 독립과 신분보장에 대해 논하시오.',
        '위헌법률심판의 요건과 절차를 설명하시오.',
        '헌법재판소의 권한과 헌법소원심판에 대해 논하시오.',
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
              ⚖️
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">헌법</h1>
              <p className="text-gray-600">헌법총론, 기본권, 통치구조</p>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 헌법 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 헌법총론은 기본원리와 헌법변천 이론을 체계적으로 이해</li>
            <li>• 기본권은 판례 중심으로 각 기본권의 보호영역과 제한을 학습</li>
            <li>• 위헌심사기준(과잉금지원칙, 평등심사)의 적용방법 숙달</li>
            <li>• 통치구조는 기관간 권한쟁의 관련 판례 주목</li>
            <li>• 헌법재판소 결정례의 최신 동향 파악이 중요</li>
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
