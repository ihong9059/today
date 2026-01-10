'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'structural-mechanics',
    name: '구조역학 기초',
    color: 'from-amber-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '단순보 중앙에 집중하중 P가 작용할 때 최대 휨모멘트와 처짐을 구하시오.',
        answer: 'Mmax = PL/4, δmax = PL³/48EI',
        prompt: `건축기사 건축구조 문제입니다.

문제: 단순보 중앙에 집중하중 P가 작용할 때 최대 휨모멘트와 처짐을 구하시오.

다음 순서로 설명해주세요:
1. 단순보 반력 계산
2. 휨모멘트 공식 유도 (M = PL/4)
3. 처짐 공식 유도 (δ = PL³/48EI)
4. E와 I의 의미
5. 비슷한 하중 조건의 공식 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '부정정 구조물과 정정 구조물의 차이점을 설명하시오.',
        answer: '정정: 평형조건만으로 해석 가능, 부정정: 변형조건 필요',
        prompt: `건축기사 건축구조 문제입니다.

문제: 부정정 구조물과 정정 구조물의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 정정구조물의 정의와 특징
2. 부정정구조물의 정의와 특징
3. 부정정 차수 계산 방법
4. 각 구조물의 장단점
5. 실제 건축물에서의 적용 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'rc-structure',
    name: '철근콘크리트 구조',
    color: 'from-gray-500 to-slate-600',
    questions: [
      {
        id: 1,
        question: '철근콘크리트 보의 복근보와 단근보의 차이점을 설명하시오.',
        answer: '단근보: 인장철근만 배근, 복근보: 인장+압축철근 배근',
        prompt: `건축기사 건축구조 문제입니다.

문제: 철근콘크리트 보의 복근보와 단근보의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 단근보의 정의와 철근 배치
2. 복근보의 정의와 철근 배치
3. 복근보가 필요한 경우
4. 압축철근의 역할
5. 각 유형의 설계 시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '콘크리트의 크리프(Creep) 현상을 설명하시오.',
        answer: '지속하중 하에서 시간 경과에 따라 변형이 증가하는 현상',
        prompt: `건축기사 건축구조 문제입니다.

문제: 콘크리트의 크리프(Creep) 현상을 설명하시오.

다음 순서로 설명해주세요:
1. 크리프의 정의
2. 크리프에 영향을 주는 요인
3. 크리프 계수
4. 크리프가 구조물에 미치는 영향
5. 크리프를 고려한 설계 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '철근의 정착길이 산정 시 고려사항을 설명하시오.',
        answer: '철근직경, 콘크리트강도, 피복두께, 철근간격, 횡보강근',
        prompt: `건축기사 건축구조 문제입니다.

문제: 철근의 정착길이 산정 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 정착길이의 정의와 목적
2. 정착길이 계산 공식
3. 영향 인자 (철근직경, 콘크리트강도 등)
4. 표준갈고리의 정착길이
5. 이음과 정착의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'steel-structure',
    name: '철골구조',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '철골구조 접합부의 종류와 특징을 설명하시오.',
        answer: '고력볼트 접합, 용접접합, 리벳접합 등',
        prompt: `건축기사 건축구조 문제입니다.

문제: 철골구조 접합부의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 고력볼트 접합의 원리와 특징
2. 용접접합의 종류와 특징
3. 각 접합방식의 장단점
4. 접합부 설계 시 고려사항
5. 현장 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '철골 기둥의 좌굴에 대해 설명하시오.',
        answer: '세장비에 따른 압축재의 갑작스러운 횡방향 변형 현상',
        prompt: `건축기사 건축구조 문제입니다.

문제: 철골 기둥의 좌굴에 대해 설명하시오.

다음 순서로 설명해주세요:
1. 좌굴의 정의
2. 오일러 좌굴하중 공식
3. 세장비와 유효좌굴길이
4. 좌굴 방지 대책
5. 국부좌굴과 전체좌굴

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'seismic-design',
    name: '내진설계',
    color: 'from-red-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '건축물의 내진설계 시 고려해야 할 사항을 설명하시오.',
        answer: '지역계수, 중요도계수, 구조시스템, 비틀림, 층간변위',
        prompt: `건축기사 건축구조 문제입니다.

문제: 건축물의 내진설계 시 고려해야 할 사항을 설명하시오.

다음 순서로 설명해주세요:
1. 지진하중 산정 (지역계수, 중요도계수)
2. 구조시스템 선정
3. 비틀림 효과 검토
4. 층간변위 제한
5. 내진상세 요구사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function BuildingStructureStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('building-structure-progress');
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
    localStorage.setItem('building-structure-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-orange-600 font-medium">건축구조</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🏗️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">건축구조 학습</h1>
                <p className="text-amber-100">건축기사 필기 2과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-amber-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((q) => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleComplete(topic.id, q.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}>
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
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

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
