'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'site-work',
    name: '가설 및 토공사',
    color: 'from-amber-600 to-orange-600',
    questions: [
      {
        id: 1,
        question: '흙막이 공법의 종류와 특징을 설명하시오.',
        answer: '엄지말뚝+토류판, 시트파일, 지하연속벽, SCW, CIP',
        prompt: `건축기사 건축시공 문제입니다.

문제: 흙막이 공법의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 엄지말뚝+토류판 공법
2. 시트파일(Sheet Pile) 공법
3. 지하연속벽(Slurry Wall) 공법
4. SCW(Soil Cement Wall) 공법
5. 각 공법의 적용 조건과 장단점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '터파기 시 히빙(Heaving)과 보일링(Boiling) 현상을 설명하시오.',
        answer: '히빙: 점토지반 융기, 보일링: 사질지반 용출',
        prompt: `건축기사 건축시공 문제입니다.

문제: 터파기 시 히빙(Heaving)과 보일링(Boiling) 현상을 설명하시오.

다음 순서로 설명해주세요:
1. 히빙의 정의와 발생 원인
2. 보일링의 정의와 발생 원인
3. 각 현상의 방지 대책
4. 파이핑(Piping) 현상과의 비교
5. 지하수위 관리 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'concrete-work',
    name: '철근콘크리트 공사',
    color: 'from-gray-500 to-slate-600',
    questions: [
      {
        id: 1,
        question: '콘크리트 배합설계 순서를 설명하시오.',
        answer: '강도결정→W/C결정→슬럼프결정→잔골재율→단위수량→배합표작성',
        prompt: `건축기사 건축시공 문제입니다.

문제: 콘크리트 배합설계 순서를 설명하시오.

다음 순서로 설명해주세요:
1. 설계기준강도와 배합강도 결정
2. 물-시멘트비(W/C) 결정
3. 슬럼프 및 공기량 결정
4. 잔골재율과 단위수량 결정
5. 시험배합과 현장배합 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '콘크리트 양생 방법과 목적을 설명하시오.',
        answer: '습윤양생, 피막양생, 증기양생 등, 수화반응 촉진 및 균열방지',
        prompt: `건축기사 건축시공 문제입니다.

문제: 콘크리트 양생 방법과 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 양생의 정의와 목적
2. 습윤양생 방법
3. 피막양생 방법
4. 증기양생과 오토클레이브 양생
5. 계절별 양생 시 주의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '콘크리트 균열의 종류와 원인을 설명하시오.',
        answer: '소성수축균열, 건조수축균열, 온도균열, 침하균열 등',
        prompt: `건축기사 건축시공 문제입니다.

문제: 콘크리트 균열의 종류와 원인을 설명하시오.

다음 순서로 설명해주세요:
1. 소성수축균열의 원인과 방지
2. 건조수축균열의 원인과 방지
3. 온도균열(수화열)의 원인과 방지
4. 침하균열의 원인과 방지
5. 균열 보수 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'steel-work',
    name: '철골공사',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '철골 세우기 순서와 정밀도 관리를 설명하시오.',
        answer: '앵커볼트→베이스플레이트→기둥→보→가새 순, 수직도 1/1000',
        prompt: `건축기사 건축시공 문제입니다.

문제: 철골 세우기 순서와 정밀도 관리를 설명하시오.

다음 순서로 설명해주세요:
1. 철골 세우기 준비 작업
2. 세우기 순서 (앵커볼트부터 가새까지)
3. 수직도 및 수평도 허용오차
4. 가조임과 본조임
5. 임시버팀과 브레이싱

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'finishing',
    name: '마감공사',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '방수공법의 종류와 특징을 설명하시오.',
        answer: '아스팔트방수, 시트방수, 도막방수, 시멘트액체방수',
        prompt: `건축기사 건축시공 문제입니다.

문제: 방수공법의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 아스팔트 방수의 종류와 특징
2. 시트(멤브레인) 방수의 종류
3. 도막방수(우레탄, 아크릴)
4. 시멘트 액체방수
5. 적용 부위별 적합한 방수공법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '커튼월 공법의 종류와 특징을 설명하시오.',
        answer: '스틱방식, 유닛방식, 멀리언방식',
        prompt: `건축기사 건축시공 문제입니다.

문제: 커튼월 공법의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 커튼월의 정의와 특징
2. 스틱(Stick)방식
3. 유닛(Unit)방식
4. 멀리언(Mullion)방식
5. 각 방식의 장단점 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function BuildingConstructionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('building-construction-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('building-construction-progress', JSON.stringify(newCompleted));
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
            <span className="text-orange-600 font-medium">건축시공</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">👷</span></div>
              <div>
                <h1 className="text-2xl font-bold">건축시공 학습</h1>
                <p className="text-teal-100">건축기사 필기 4과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-teal-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
