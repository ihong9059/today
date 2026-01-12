'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Civil7AdminLawPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('civil7-admin-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-admin-law-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'general-theory',
      title: '행정법 총론',
      icon: '📜',
      questions: [
        '행정법의 의의와 특질에 대해 설명하시오.',
        '법률유보 원칙과 법률우위 원칙의 차이를 비교하시오.',
        '행정법의 법원(法源)에 대해 설명하시오.',
        '행정법의 일반원칙(비례의 원칙, 신뢰보호 원칙 등)에 대해 논하시오.',
        '행정법관계의 당사자와 내용에 대해 설명하시오.',
        '공법관계와 사법관계의 구별기준을 설명하시오.',
        '특별권력관계 이론의 현대적 변용에 대해 논하시오.',
        '행정상 법률관계에서 사인의 공법행위에 대해 설명하시오.',
        '행정법상 비례의 원칙과 그 적용 사례를 설명하시오.',
        '신뢰보호 원칙의 요건과 한계에 대해 논하시오.',
      ],
    },
    {
      id: 'admin-act',
      title: '행정작용법',
      icon: '⚖️',
      questions: [
        '행정행위의 개념과 특성에 대해 설명하시오.',
        '행정행위의 종류(명령적 행위, 형성적 행위)를 구분하시오.',
        '행정행위의 효력(공정력, 구속력, 존속력)에 대해 논하시오.',
        '행정행위의 하자와 그 치유에 대해 설명하시오.',
        '무효인 행정행위와 취소할 수 있는 행정행위를 비교하시오.',
        '행정행위의 철회와 취소의 차이를 설명하시오.',
        '행정행위의 부관(조건, 기한, 부담 등)에 대해 논하시오.',
        '기속행위와 재량행위의 구별 및 재량의 한계를 설명하시오.',
        '불확정 개념과 판단여지 이론에 대해 설명하시오.',
        '행정입법(법규명령, 행정규칙)의 종류와 효력에 대해 논하시오.',
      ],
    },
    {
      id: 'admin-procedure',
      title: '행정절차법',
      icon: '📋',
      questions: [
        '행정절차법의 목적과 적용범위에 대해 설명하시오.',
        '처분의 사전통지와 의견제출 기회 부여에 대해 논하시오.',
        '청문의 실시 요건과 절차에 대해 설명하시오.',
        '공청회의 개최 사유와 운영 방법에 대해 논하시오.',
        '행정예고제도의 의의와 절차를 설명하시오.',
        '행정상 의무이행확보수단에 대해 설명하시오.',
        '행정대집행의 요건과 절차에 대해 논하시오.',
        '이행강제금과 행정벌의 차이를 비교하시오.',
        '직접강제와 즉시강제의 구별에 대해 설명하시오.',
        '행정조사의 법적 성격과 한계에 대해 논하시오.',
      ],
    },
    {
      id: 'admin-remedy',
      title: '행정구제법',
      icon: '🛡️',
      questions: [
        '행정쟁송의 종류(행정심판, 행정소송)와 관계를 설명하시오.',
        '행정심판의 종류(취소심판, 무효확인심판 등)에 대해 논하시오.',
        '행정심판의 청구기간과 재결의 효력을 설명하시오.',
        '행정소송의 종류와 특성에 대해 설명하시오.',
        '취소소송의 소송요건(원고적격, 처분성 등)에 대해 논하시오.',
        '항고소송의 대상적격(처분성)에 관한 판례를 설명하시오.',
        '원고적격 확대에 관한 판례의 변천을 논하시오.',
        '의무이행소송과 예방적 금지소송에 대해 설명하시오.',
        '행정소송에서 판결의 종류와 효력에 대해 논하시오.',
        '국가배상제도의 요건과 유형을 설명하시오.',
      ],
    },
    {
      id: 'state-liability',
      title: '국가배상과 손실보상',
      icon: '💰',
      questions: [
        '국가배상법 제2조의 공무원의 위법행위로 인한 손해배상을 설명하시오.',
        '국가배상에서 공무원의 고의·과실 요건에 대해 논하시오.',
        '국가배상법 제5조의 영조물의 설치·관리 하자 책임을 설명하시오.',
        '배상책임자(국가, 지방자치단체)의 결정 기준을 논하시오.',
        '국가배상에서 구상권의 행사 요건에 대해 설명하시오.',
        '손실보상의 의의와 헌법적 근거를 설명하시오.',
        '손실보상의 요건과 정당한 보상의 의미를 논하시오.',
        '수용유사침해와 수용적 침해에 대해 설명하시오.',
        '생활보상과 간접손실보상의 인정 여부를 논하시오.',
        '국가배상과 손실보상의 관계를 비교하시오.',
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
              📜
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">행정법</h1>
              <p className="text-gray-600">행정법총론, 행정작용법, 행정구제법</p>
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
          <h3 className="font-bold text-slate-800 mb-3">📖 행정법 학습 가이드</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• 행정법총론의 기본원칙(법률유보, 비례원칙, 신뢰보호)을 확실히 이해</li>
            <li>• 행정행위의 효력과 하자 이론은 판례 중심으로 학습</li>
            <li>• 행정구제법(행정심판, 행정소송)의 요건과 절차 암기</li>
            <li>• 국가배상과 손실보상의 요건과 차이점 구별</li>
            <li>• 최신 판례 동향 파악이 고득점의 핵심</li>
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
