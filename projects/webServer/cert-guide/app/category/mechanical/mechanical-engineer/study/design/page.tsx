'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'screw',
    name: '나사, 볼트, 너트',
    color: 'from-purple-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: 'M10 볼트의 인장하중이 20kN일 때 인장응력은? (유효단면적 58mm²)',
        answer: 'σ = 344.8 MPa',
        prompt: `기계기사 기계설계 문제입니다.

문제: M10 볼트의 인장하중이 20kN일 때 인장응력은? (유효단면적 58mm²)

다음 순서로 설명해주세요:
1. 인장응력 공식: σ = F/A
2. 유효단면적의 의미 (골지름 기준)
3. 대입 및 계산
4. 볼트 호칭과 규격 (M시리즈)
5. 볼트 등급 (4.6, 8.8, 10.9 등)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사다리꼴나사 Tr40×7에서 리드각을 구하시오.',
        answer: 'λ = 3.18°',
        prompt: `기계기사 기계설계 문제입니다.

문제: 사다리꼴나사 Tr40×7에서 리드각을 구하시오.

다음 순서로 설명해주세요:
1. 리드각 공식: tan λ = L/(πd)
2. 호칭 해석 (Tr40: 호칭지름 40mm, 7: 리드)
3. 대입 및 계산
4. 나사의 자립조건
5. 나사 효율과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'shaft',
    name: '축 설계',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '축에 5kN·m의 비틀림 모멘트만 작용할 때 허용전단응력 50MPa로 축 직경을 구하시오.',
        answer: 'd = 68.4 mm',
        prompt: `기계기사 기계설계 문제입니다.

문제: 축에 5kN·m의 비틀림 모멘트만 작용할 때 허용전단응력 50MPa로 축 직경을 구하시오.

다음 순서로 설명해주세요:
1. 비틀림 공식: τ = 16T/(πd³)
2. 직경 d 공식 유도
3. 대입 및 계산
4. 중실축과 중공축 비교
5. 안전율 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '축에 굽힘모멘트 2kN·m와 비틀림모멘트 3kN·m가 동시에 작용할 때 상당비틀림모멘트는?',
        answer: 'Te = 3.61 kN·m',
        prompt: `기계기사 기계설계 문제입니다.

문제: 축에 굽힘모멘트 2kN·m와 비틀림모멘트 3kN·m가 동시에 작용할 때 상당비틀림모멘트는?

다음 순서로 설명해주세요:
1. 상당비틀림모멘트 공식: Te = √(M² + T²)
2. 대입 및 계산
3. 상당굽힘모멘트 공식
4. 조합응력 축 설계
5. ASME 코드 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'bearing',
    name: '베어링',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '기본동정격하중 50kN, 레이디얼하중 10kN일 때 구름베어링 수명은? (볼베어링)',
        answer: 'L10 = 125×10⁶ 회전',
        prompt: `기계기사 기계설계 문제입니다.

문제: 기본동정격하중 50kN, 레이디얼하중 10kN일 때 구름베어링 수명은? (볼베어링)

다음 순서로 설명해주세요:
1. 베어링 수명 공식: L10 = (C/P)^p × 10⁶
2. 볼베어링 지수 p = 3
3. 대입 및 계산
4. 시간 수명으로 환산 (L10h)
5. 수정수명계수 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '미끄럼베어링의 저널 지름 50mm, 길이 60mm, 하중 5kN일 때 베어링 압력은?',
        answer: 'p = 1.67 MPa',
        prompt: `기계기사 기계설계 문제입니다.

문제: 미끄럼베어링의 저널 지름 50mm, 길이 60mm, 하중 5kN일 때 베어링 압력은?

다음 순서로 설명해주세요:
1. 베어링 압력 공식: p = W/(d×L)
2. 투영면적 개념
3. 대입 및 계산
4. 허용 베어링 압력
5. pv값과 발열

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'gear',
    name: '기어',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '모듈 m=4, 잇수 z=25인 스퍼기어의 피치원 지름은?',
        answer: 'd = 100 mm',
        prompt: `기계기사 기계설계 문제입니다.

문제: 모듈 m=4, 잇수 z=25인 스퍼기어의 피치원 지름은?

다음 순서로 설명해주세요:
1. 피치원 지름 공식: d = mz
2. 모듈의 정의
3. 대입 및 계산
4. 이끝원, 이뿌리원 지름
5. 기어의 기본 치형

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '구동기어 잇수 20, 피동기어 잇수 80일 때 속도비와 중심거리는? (m=3)',
        answer: 'i=4, a=150mm',
        prompt: `기계기사 기계설계 문제입니다.

문제: 구동기어 잇수 20, 피동기어 잇수 80일 때 속도비와 중심거리는? (m=3)

다음 순서로 설명해주세요:
1. 속도비 공식: i = z₂/z₁ = n₁/n₂
2. 중심거리 공식: a = m(z₁+z₂)/2
3. 대입 및 계산
4. 감속비와 증속비
5. 토크 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '헬리컬기어의 비틀림각 30°, 법선모듈 3일 때 축직각 모듈은?',
        answer: 'mt = 3.46',
        prompt: `기계기사 기계설계 문제입니다.

문제: 헬리컬기어의 비틀림각 30°, 법선모듈 3일 때 축직각 모듈은?

다음 순서로 설명해주세요:
1. 모듈 관계: mt = mn/cosβ
2. 비틀림각 β의 역할
3. 대입 및 계산
4. 헬리컬기어의 장점
5. 스러스트 하중 발생

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'belt',
    name: '벨트, 체인 전동',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '평벨트에서 긴장측 장력 1000N, 이완측 장력 400N일 때 유효장력과 전달동력은? (V=10m/s)',
        answer: 'Fe=600N, P=6kW',
        prompt: `기계기사 기계설계 문제입니다.

문제: 평벨트에서 긴장측 장력 1000N, 이완측 장력 400N일 때 유효장력과 전달동력은? (V=10m/s)

다음 순서로 설명해주세요:
1. 유효장력 공식: Fe = T₁ - T₂
2. 전달동력 공식: P = Fe × V
3. 대입 및 계산
4. 장력비와 마찰계수 관계
5. 벨트 초기장력 설정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'V벨트에서 홈각 40°일 때 유효마찰계수를 구하시오. (μ=0.3)',
        answer: 'μ\' = 0.88',
        prompt: `기계기사 기계설계 문제입니다.

문제: V벨트에서 홈각 40°일 때 유효마찰계수를 구하시오. (μ=0.3)

다음 순서로 설명해주세요:
1. 유효마찰계수 공식: μ' = μ/sin(α/2)
2. 홈각과 쐐기효과
3. 대입 및 계산
4. V벨트의 장점
5. 표준 홈각

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'material',
    name: '기계재료',
    color: 'from-gray-500 to-slate-600',
    questions: [
      {
        id: 1,
        question: '담금질(Quenching)과 뜨임(Tempering)의 목적과 방법을 설명하시오.',
        answer: '담금질: 경도 증가, 뜨임: 인성 회복',
        prompt: `기계기사 기계재료 문제입니다.

문제: 담금질(Quenching)과 뜨임(Tempering)의 목적과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 담금질 정의와 목적
2. 담금질 방법 (수냉, 유냉, 공냉)
3. 뜨임 정의와 목적
4. 뜨임 온도와 특성 변화
5. 마르텐사이트 조직

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'SM45C와 SCM440 재료의 차이점을 설명하시오.',
        answer: 'SM45C: 탄소강, SCM440: Cr-Mo 합금강',
        prompt: `기계기사 기계재료 문제입니다.

문제: SM45C와 SCM440 재료의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. SM45C 재료 특성 (기계구조용 탄소강)
2. SCM440 재료 특성 (Cr-Mo 합금강)
3. 각 재료의 용도
4. 합금원소의 역할
5. 열처리 특성 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '스테인리스강 SUS304와 SUS316의 차이점을 설명하시오.',
        answer: 'SUS316: Mo 첨가로 내식성 향상',
        prompt: `기계기사 기계재료 문제입니다.

문제: 스테인리스강 SUS304와 SUS316의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. SUS304 조성과 특성 (18Cr-8Ni)
2. SUS316 조성과 특성 (Mo 첨가)
3. 내식성 차이
4. 적용 분야
5. 다른 스테인리스강 종류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function DesignStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('design-progress');
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
    localStorage.setItem('design-progress', JSON.stringify(newCompleted));
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
            <span className="text-purple-600 font-medium">기계설계/재료</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계설계 및 기계재료 학습</h1>
                <p className="text-purple-100">기계기사 필기 5과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-purple-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
