'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'design-theory',
    name: '건축설계 이론',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '건축계획의 기본 요소인 기능, 미, 구조의 관계를 설명하시오.',
        answer: '비트루비우스 3요소: 용(기능), 강(구조), 미(아름다움)의 조화',
        prompt: `건축기사 건축계획 문제입니다.

문제: 건축계획의 기본 요소인 기능, 미, 구조의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 비트루비우스의 건축 3요소 (용, 강, 미)
2. 각 요소의 의미와 중요성
3. 현대 건축에서의 적용 사례
4. 세 요소의 균형과 조화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '건축물의 동선계획에서 고려해야 할 사항을 설명하시오.',
        answer: '명확성, 최단거리, 교차회피, 폭과 높이 확보, 안전성',
        prompt: `건축기사 건축계획 문제입니다.

문제: 건축물의 동선계획에서 고려해야 할 사항을 설명하시오.

다음 순서로 설명해주세요:
1. 동선계획의 정의와 목적
2. 주요 고려사항 (명확성, 최단거리, 교차회피 등)
3. 건물 용도별 동선계획 특성
4. 피난동선과 일상동선의 구분

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '모듈러 코디네이션(MC)의 개념과 장점을 설명하시오.',
        answer: '기본치수 100mm를 기준으로 건축부재를 규격화하는 치수조정 시스템',
        prompt: `건축기사 건축계획 문제입니다.

문제: 모듈러 코디네이션(MC)의 개념과 장점을 설명하시오.

다음 순서로 설명해주세요:
1. MC의 정의와 기본모듈 (100mm)
2. MC의 목적과 적용 원리
3. MC의 장점 (호환성, 경제성, 시공성)
4. 국내외 모듈 규격 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'housing',
    name: '주거건축계획',
    color: 'from-amber-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '아파트 단위세대 평면유형 중 판상형과 탑상형의 특징을 비교하시오.',
        answer: '판상형: 남향배치, 통풍유리 / 탑상형: 조망확보, 토지이용률 높음',
        prompt: `건축기사 건축계획 문제입니다.

문제: 아파트 단위세대 평면유형 중 판상형과 탑상형의 특징을 비교하시오.

다음 순서로 설명해주세요:
1. 판상형 아파트의 특징과 장단점
2. 탑상형 아파트의 특징과 장단점
3. 각 유형의 적합한 적용 상황
4. 혼합형 계획 시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '주거건축에서 채광과 환기의 기준을 설명하시오.',
        answer: '채광: 거실바닥면적의 1/10 이상, 환기: 거실바닥면적의 1/20 이상',
        prompt: `건축기사 건축계획 문제입니다.

문제: 주거건축에서 채광과 환기의 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 건축법상 채광 기준 (바닥면적의 1/10)
2. 건축법상 환기 기준 (바닥면적의 1/20)
3. 자연채광과 인공채광
4. 자연환기와 기계환기 방식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'public-building',
    name: '공공건축계획',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '사무소 건축에서 코어(Core)의 유형과 특징을 설명하시오.',
        answer: '중앙코어, 편심코어, 양단코어, 분산코어 등',
        prompt: `건축기사 건축계획 문제입니다.

문제: 사무소 건축에서 코어(Core)의 유형과 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 코어의 정의와 구성요소
2. 코어 유형별 특징 (중앙, 편심, 양단, 분산)
3. 각 유형의 장단점
4. 건물 규모에 따른 적합한 코어 유형

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '학교건축의 교실 배치유형을 설명하시오.',
        answer: '편복도형, 중복도형, 클러스터형, 오픈플랜형',
        prompt: `건축기사 건축계획 문제입니다.

문제: 학교건축의 교실 배치유형을 설명하시오.

다음 순서로 설명해주세요:
1. 편복도형의 특징과 장단점
2. 중복도형의 특징과 장단점
3. 클러스터형과 오픈플랜형
4. 현대 학교건축의 트렌드

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'barrier-free',
    name: '무장애 설계',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '장애인 편의시설 중 경사로의 설치기준을 설명하시오.',
        answer: '기울기 1/12 이하, 유효폭 1.2m 이상, 참 설치(30m마다)',
        prompt: `건축기사 건축계획 문제입니다.

문제: 장애인 편의시설 중 경사로의 설치기준을 설명하시오.

다음 순서로 설명해주세요:
1. 경사로 기울기 기준 (1/12 이하, 옥외 1/18)
2. 유효폭과 참 설치 기준
3. 손잡이 및 마감재료 기준
4. 점자블록 설치 위치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function BuildingPlanningStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('building-planning-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('building-planning-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-orange-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/architect-engineer" className="text-gray-600 hover:text-orange-600">건축기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">건축계획</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">건축계획 학습</h1>
                <p className="text-orange-100">건축기사 필기 1과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-orange-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <a
                                  href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  🧡 Claude
                                </a>
                                <a
                                  href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  💚 ChatGPT
                                </a>
                                <a
                                  href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  💙 Gemini
                                </a>
                              </div>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
