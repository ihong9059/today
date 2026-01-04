'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'plumbing',
    name: '급배수 설비',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '급수방식의 종류와 특징을 설명하시오.',
        answer: '수도직결방식, 고가수조방식, 압력탱크방식, 부스터펌프방식',
        prompt: `건축기사 건축설비 문제입니다.

문제: 급수방식의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 수도직결방식의 원리와 적용
2. 고가수조방식의 원리와 장단점
3. 압력탱크방식의 원리
4. 부스터펌프방식의 특징
5. 건물 규모별 적합한 급수방식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '배수트랩의 종류와 봉수(封水)의 역할을 설명하시오.',
        answer: 'P트랩, S트랩, U트랩 등, 봉수깊이 50~100mm로 악취 및 해충 차단',
        prompt: `건축기사 건축설비 문제입니다.

문제: 배수트랩의 종류와 봉수(封水)의 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 트랩의 정의와 목적
2. 트랩 종류별 특징 (P, S, U, 드럼트랩)
3. 봉수의 역할과 적정 깊이
4. 봉수파괴 원인과 방지대책
5. 통기관의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'hvac',
    name: '냉난방 설비',
    color: 'from-red-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '중앙집중식 공조방식과 개별 공조방식의 차이점을 설명하시오.',
        answer: '중앙: 기계실 집중, 대규모 / 개별: 각 실 개별제어, 소규모',
        prompt: `건축기사 건축설비 문제입니다.

문제: 중앙집중식 공조방식과 개별 공조방식의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 중앙집중식 공조의 원리와 특징
2. 개별 공조방식의 원리와 특징
3. 각 방식의 장단점 비교
4. 건물 용도별 적합한 방식
5. 에너지 효율 측면 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '공기조화의 4요소를 설명하시오.',
        answer: '온도, 습도, 기류, 청정도',
        prompt: `건축기사 건축설비 문제입니다.

문제: 공기조화의 4요소를 설명하시오.

다음 순서로 설명해주세요:
1. 온도조절 (난방, 냉방)
2. 습도조절 (가습, 제습)
3. 기류 (속도, 분포)
4. 청정도 (환기, 여과)
5. 쾌적범위와 PMV지수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'electrical',
    name: '전기 설비',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '건축물의 조명설계 시 고려사항을 설명하시오.',
        answer: '조도, 휘도, 균제도, 연색성, 글레어 방지',
        prompt: `건축기사 건축설비 문제입니다.

문제: 건축물의 조명설계 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 조도(lux) 기준과 용도별 조도
2. 휘도와 휘도대비
3. 균제도의 의미
4. 연색성 지수(Ra)
5. 글레어 방지 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'fire-protection',
    name: '소방 설비',
    color: 'from-red-600 to-rose-600',
    questions: [
      {
        id: 1,
        question: '스프링클러 설비의 종류와 특징을 설명하시오.',
        answer: '습식, 건식, 준비작동식, 일제살수식',
        prompt: `건축기사 건축설비 문제입니다.

문제: 스프링클러 설비의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 습식 스프링클러의 원리와 적용
2. 건식 스프링클러의 원리와 적용
3. 준비작동식의 특징
4. 일제살수식의 특징
5. 헤드 종류와 배치 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function BuildingEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('building-equipment-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('building-equipment-progress', JSON.stringify(newCompleted));
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
            <span className="text-orange-600 font-medium">건축설비</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🔧</span></div>
              <div>
                <h1 className="text-2xl font-bold">건축설비 학습</h1>
                <p className="text-yellow-100">건축기사 필기 3과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-yellow-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
