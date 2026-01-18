'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'casting',
    name: '주조',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '주물의 수축률이 1.5%일 때 길이 500mm 제품의 목형 길이는?',
        answer: 'L = 507.5 mm',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 주물의 수축률이 1.5%일 때 길이 500mm 제품의 목형 길이는?

다음 순서로 설명해주세요:
1. 수축여유 공식: L_목형 = L_제품 × (1 + 수축률)
2. 대입 및 계산
3. 재료별 수축률 (주철, 주강, 알루미늄)
4. 가공여유, 코어여유 개념
5. 목형 제작 시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '주조결함 중 수축공(Shrinkage Cavity)의 원인과 방지대책을 설명하시오.',
        answer: '원인: 응고수축, 방지: 압탕, 냉금 사용',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 주조결함 중 수축공(Shrinkage Cavity)의 원인과 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 수축공 정의
2. 발생 원인 (응고 시 체적 수축)
3. 방지대책 (압탕, 냉금, 지향성 응고)
4. 다른 주조결함 (기공, 개재물, 균열)
5. 주조결함 검사법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'forming',
    name: '소성가공',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '직경 100mm 봉재를 직경 50mm로 인발할 때 단면감소율은?',
        answer: '단면감소율 = 75%',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 직경 100mm 봉재를 직경 50mm로 인발할 때 단면감소율은?

다음 순서로 설명해주세요:
1. 단면감소율 공식: r = (A₀-A₁)/A₀ × 100
2. 각 단면적 계산
3. 대입 및 계산
4. 인발비와 단면감소율 관계
5. 허용 단면감소율과 패스 수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '자유단조와 형단조의 차이점을 설명하시오.',
        answer: '자유단조: 금형 없음, 형단조: 금형 사용',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 자유단조와 형단조의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 자유단조 정의 및 특징
2. 형단조 정의 및 특징
3. 각각의 장단점
4. 적용 분야
5. 단조 작업 (업셋팅, 드로잉, 굽힘)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '압연에서 중립점(Neutral Point)의 의미를 설명하시오.',
        answer: '롤과 소재 속도가 같은 점',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 압연에서 중립점(Neutral Point)의 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 중립점 정의
2. 입구측과 출구측 속도 차이
3. 전진율과 후진율
4. 물림 조건 (물림각)
5. 압연력 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'welding',
    name: '용접',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '피복 아크용접(SMAW)에서 피복제의 역할 3가지를 설명하시오.',
        answer: '아크 안정, 슬래그 형성, 가스 차폐',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 피복 아크용접(SMAW)에서 피복제의 역할 3가지를 설명하시오.

다음 순서로 설명해주세요:
1. 피복제 구성 성분
2. 아크 안정 역할
3. 슬래그 형성 역할 (산화 방지)
4. 가스 차폐 역할
5. 합금원소 첨가 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '용접결함 중 언더컷(Undercut)의 원인과 방지대책을 설명하시오.',
        answer: '원인: 과대전류, 빠른 용접속도',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 용접결함 중 언더컷(Undercut)의 원인과 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 언더컷 정의
2. 발생 원인
3. 방지대책
4. 다른 용접결함 (기공, 균열, 용입불량)
5. 용접부 검사법 (RT, UT, MT, PT)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'machining',
    name: '절삭가공',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '직경 100mm 소재를 200rpm으로 선삭할 때 절삭속도는?',
        answer: 'V = 62.8 m/min',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 직경 100mm 소재를 200rpm으로 선삭할 때 절삭속도는?

다음 순서로 설명해주세요:
1. 절삭속도 공식: V = πDN/1000
2. 단위 확인 (m/min)
3. 대입 및 계산
4. 재료별 적정 절삭속도
5. 이송속도와 절삭깊이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '테일러의 공구수명식 VTⁿ = C에서 n=0.125, C=400일 때 V=200m/min에서의 공구수명은?',
        answer: 'T = 39.06 min',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 테일러의 공구수명식 VTⁿ = C에서 n=0.125, C=400일 때 V=200m/min에서의 공구수명은?

다음 순서로 설명해주세요:
1. 테일러 공구수명식: VTⁿ = C
2. 공구수명 T 유도
3. 대입 및 계산
4. 지수 n의 의미 (재료별 특성)
5. 경제적 절삭속도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '구성인선(Built-up Edge)의 발생원인과 방지대책을 설명하시오.',
        answer: '원인: 저속절삭, 연성재료',
        prompt: `기계기사 기계제작법 문제입니다.

문제: 구성인선(Built-up Edge)의 발생원인과 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 구성인선 정의
2. 발생 조건 (속도, 재료)
3. 구성인선의 영향
4. 방지대책
5. 칩의 형태 (유동형, 전단형, 균열형)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'dynamics',
    name: '기계동력학',
    color: 'from-purple-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '질량 10kg, 스프링 상수 1000N/m인 시스템의 고유진동수는?',
        answer: 'fn = 1.59 Hz',
        prompt: `기계기사 기계동력학 문제입니다.

문제: 질량 10kg, 스프링 상수 1000N/m인 시스템의 고유진동수는?

다음 순서로 설명해주세요:
1. 고유진동수 공식: fn = (1/2π)√(k/m)
2. 각진동수 ωn = √(k/m)
3. 대입 및 계산
4. 고유진동수의 의미
5. 공진 현상

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '감쇠비 ζ=0.2인 시스템의 감쇠 종류와 특성을 설명하시오.',
        answer: '부족감쇠 (ζ<1), 진동하며 감쇠',
        prompt: `기계기사 기계동력학 문제입니다.

문제: 감쇠비 ζ=0.2인 시스템의 감쇠 종류와 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 감쇠비 ζ 정의
2. 감쇠 종류 (과감쇠, 임계감쇠, 부족감쇠)
3. ζ=0.2일 때 특성
4. 감쇠진동 응답
5. 실제 기계 시스템 예시

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function ManufacturingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('manufacturing-progress');
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
    localStorage.setItem('manufacturing-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-blue-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-engineer" className="text-gray-600 hover:text-blue-600">기계기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">기계제작법/동력학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🔧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계제작법 및 기계동력학 학습</h1>
                <p className="text-green-100">기계기사 필기 4과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-green-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
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
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
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
