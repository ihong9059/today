'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'calculation',
    name: '필답형 계산 문제',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '보에 집중하중 10kN이 중앙에 작용하고 스팬 4m일 때 최대 굽힘응력을 구하시오. (단면: 50×100mm 직사각형)',
        answer: 'σ_max = 120 MPa',
        prompt: `기계기사 실기 계산 문제입니다.

문제: 보에 집중하중 10kN이 중앙에 작용하고 스팬 4m일 때 최대 굽힘응력을 구하시오. (단면: 50×100mm 직사각형)

다음 순서로 풀이해주세요:
1. 최대 굽힘모멘트 M = PL/4
2. 단면계수 Z = bh²/6
3. 굽힘응력 σ = M/Z
4. 단위 환산 주의
5. 답 정리

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
      {
        id: 2,
        question: '축 직경 50mm, 길이 1m에 비틀림 모멘트 2kN·m 작용 시 비틀림각을 구하시오. (G=80GPa)',
        answer: 'θ = 2.92°',
        prompt: `기계기사 실기 계산 문제입니다.

문제: 축 직경 50mm, 길이 1m에 비틀림 모멘트 2kN·m 작용 시 비틀림각을 구하시오. (G=80GPa)

다음 순서로 풀이해주세요:
1. 극단면2차모멘트 J = πd⁴/32
2. 비틀림각 공식 θ = TL/(GJ)
3. 단위 통일 (mm → m, kN·m → N·m)
4. 라디안 → 도(°) 환산
5. 답 정리

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
      {
        id: 3,
        question: '압축비 8인 오토사이클의 열효율을 구하시오. (k=1.4)',
        answer: 'η = 56.5%',
        prompt: `기계기사 실기 계산 문제입니다.

문제: 압축비 8인 오토사이클의 열효율을 구하시오. (k=1.4)

다음 순서로 풀이해주세요:
1. 오토사이클 효율 공식 η = 1 - 1/r^(k-1)
2. 압축비 r = 8 대입
3. 지수 계산 k-1 = 0.4
4. 최종 계산
5. 백분율로 표현

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
      {
        id: 4,
        question: '유량 0.1m³/s, 관 직경 200mm일 때 유속과 레이놀즈 수를 구하시오. (ν=10⁻⁶ m²/s)',
        answer: 'V = 3.18 m/s, Re = 636,000',
        prompt: `기계기사 실기 계산 문제입니다.

문제: 유량 0.1m³/s, 관 직경 200mm일 때 유속과 레이놀즈 수를 구하시오. (ν=10⁻⁶ m²/s)

다음 순서로 풀이해주세요:
1. 단면적 A = πD²/4
2. 유속 V = Q/A
3. 레이놀즈 수 Re = VD/ν
4. 층류/난류 판정 (Re > 4000 → 난류)
5. 답 정리

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
    ],
  },
  {
    id: 'shaft-design',
    name: '축 설계 실무',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '전달동력 15kW, 회전수 1000rpm인 축의 최소 직경을 구하시오. (허용전단응력 40MPa)',
        answer: 'd = 42.5 mm → 45mm 선정',
        prompt: `기계기사 실기 축 설계 문제입니다.

문제: 전달동력 15kW, 회전수 1000rpm인 축의 최소 직경을 구하시오. (허용전단응력 40MPa)

다음 순서로 풀이해주세요:
1. 토크 계산 T = 9550P/n (kW, rpm → N·mm)
2. 비틀림 공식 τ = 16T/(πd³)
3. 직경 d 유도
4. 계산 및 규격치 선정
5. 안전율 검토

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
      {
        id: 2,
        question: '축에 굽힘모멘트 500N·m와 비틀림모멘트 800N·m가 동시에 작용할 때 축 직경을 구하시오. (σa = 100MPa)',
        answer: 'd = 37.2 mm → 40mm 선정',
        prompt: `기계기사 실기 조합응력 축 설계 문제입니다.

문제: 축에 굽힘모멘트 500N·m와 비틀림모멘트 800N·m가 동시에 작용할 때 축 직경을 구하시오. (σa = 100MPa)

다음 순서로 풀이해주세요:
1. 상당굽힘모멘트 Me = 0.5(M + √(M² + T²))
2. 굽힘응력 공식 σ = 32Me/(πd³)
3. 직경 d 유도 및 계산
4. 규격치 선정
5. 검증

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
    ],
  },
  {
    id: 'gear-design',
    name: '기어 설계 실무',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '속도비 4, 중심거리 250mm인 표준 스퍼기어쌍의 모듈과 잇수를 결정하시오.',
        answer: 'm=5, z₁=20, z₂=80',
        prompt: `기계기사 실기 기어 설계 문제입니다.

문제: 속도비 4, 중심거리 250mm인 표준 스퍼기어쌍의 모듈과 잇수를 결정하시오.

다음 순서로 풀이해주세요:
1. 속도비 i = z₂/z₁ = 4
2. 중심거리 a = m(z₁+z₂)/2 = 250
3. z₁ + z₂ = 500/m
4. 모듈 선정 (표준 모듈: 1, 1.5, 2, 2.5, 3, 4, 5, 6...)
5. 잇수 결정 및 검증

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
      {
        id: 2,
        question: '모듈 4, 잇수 25인 스퍼기어의 각 원 지름을 계산하시오.',
        answer: 'd=100, da=108, df=90mm',
        prompt: `기계기사 실기 기어 치수 계산 문제입니다.

문제: 모듈 4, 잇수 25인 스퍼기어의 각 원 지름을 계산하시오.

다음 순서로 풀이해주세요:
1. 피치원 지름 d = mz
2. 이끝원 지름 da = d + 2m
3. 이뿌리원 지름 df = d - 2.5m (표준)
4. 이높이 ha = m, hf = 1.25m
5. 검증

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
    ],
  },
  {
    id: 'bearing-design',
    name: '베어링 선정 실무',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '레이디얼하중 5kN, 회전수 1500rpm, 수명 20000시간을 만족하는 볼베어링의 기본동정격하중을 구하시오.',
        answer: 'C = 63.7 kN',
        prompt: `기계기사 실기 베어링 선정 문제입니다.

문제: 레이디얼하중 5kN, 회전수 1500rpm, 수명 20000시간을 만족하는 볼베어링의 기본동정격하중을 구하시오.

다음 순서로 풀이해주세요:
1. 수명 회전수 L10 = 60nL10h
2. L10 = (C/P)³ × 10⁶ (볼베어링)
3. C 유도 및 계산
4. 베어링 카탈로그에서 선정
5. 안전율 검토

실기 시험에서 부분점수를 받을 수 있도록 풀이 과정을 상세히 작성해주세요.`
      },
    ],
  },
  {
    id: 'cad',
    name: 'CAD 도면 작성',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: 'AutoCAD에서 3D 형상을 2D 도면으로 변환하는 과정을 설명하시오.',
        answer: 'FLATSHOT 또는 뷰포트 활용',
        prompt: `기계기사 실기 CAD 작업 문제입니다.

문제: AutoCAD에서 3D 형상을 2D 도면으로 변환하는 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 3D 모델링 완료 상태 확인
2. 레이아웃(배치) 탭 이동
3. 뷰포트 생성 및 투상법 설정
4. FLATSHOT 명령 사용법
5. 숨은선, 외형선 설정
6. 치수 기입 및 마무리

실기 시험에서 자주 출제되는 CAD 명령어도 정리해주세요.`
      },
      {
        id: 2,
        question: '제3각법으로 정면도, 평면도, 우측면도를 배치하는 방법을 설명하시오.',
        answer: '정면 위에 평면, 오른쪽에 우측면',
        prompt: `기계기사 실기 도면 배치 문제입니다.

문제: 제3각법으로 정면도, 평면도, 우측면도를 배치하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 제3각법 정의
2. 정면도 위치 결정
3. 평면도 배치 (정면도 위)
4. 우측면도 배치 (정면도 오른쪽)
5. 좌측면도, 저면도 위치
6. 투상선 맞춤

도면 작성 시 유의사항도 함께 설명해주세요.`
      },
      {
        id: 3,
        question: '도면에 치수를 기입할 때 주의사항을 설명하시오.',
        answer: '기준면 설정, 중복 피함, 가공순서 고려',
        prompt: `기계기사 실기 치수 기입 문제입니다.

문제: 도면에 치수를 기입할 때 주의사항을 설명하시오.

다음 항목을 설명해주세요:
1. 기준면(데이텀) 설정
2. 치수 중복 피하기
3. 누적공차 고려
4. 가공순서에 따른 치수 배치
5. 치수선, 치수보조선 규칙
6. 공차 기입법 (IT 등급)

실기 시험에서 자주 출제되는 치수 기입 규칙을 정리해주세요.`
      },
    ],
  },
  {
    id: 'terms',
    name: '용어 및 이론',
    color: 'from-gray-500 to-slate-600',
    questions: [
      {
        id: 1,
        question: '열처리 종류 4가지와 각각의 목적을 설명하시오.',
        answer: '담금질, 뜨임, 풀림, 불림',
        prompt: `기계기사 실기 열처리 용어 문제입니다.

문제: 열처리 종류 4가지와 각각의 목적을 설명하시오.

다음 항목을 설명해주세요:
1. 담금질(Quenching): 목적, 방법, 조직
2. 뜨임(Tempering): 목적, 온도, 효과
3. 풀림(Annealing): 목적, 종류
4. 불림(Normalizing): 목적, 방법
5. 표면경화법 (침탄, 질화, 고주파)

실기 단답형에서 자주 출제되는 핵심 키워드를 정리해주세요.`
      },
      {
        id: 2,
        question: '기어 백래시(Backlash)의 정의와 필요 이유를 설명하시오.',
        answer: '맞물린 치면 사이의 틈새',
        prompt: `기계기사 실기 기어 용어 문제입니다.

문제: 기어 백래시(Backlash)의 정의와 필요 이유를 설명하시오.

다음 항목을 설명해주세요:
1. 백래시 정의
2. 백래시의 필요 이유 (열팽창, 윤활)
3. 적정 백래시 값
4. 백래시 과다/과소 시 문제점
5. 백래시 조정 방법

실기 단답형에서 자주 출제되는 기어 관련 용어도 정리해주세요.`
      },
      {
        id: 3,
        question: '베어링 예압(Preload)의 목적과 방법을 설명하시오.',
        answer: '강성 증가, 진동 감소',
        prompt: `기계기사 실기 베어링 용어 문제입니다.

문제: 베어링 예압(Preload)의 목적과 방법을 설명하시오.

다음 항목을 설명해주세요:
1. 예압의 정의
2. 예압의 목적 (강성, 정밀도, 소음)
3. 예압 부여 방법 (정위치, 정압)
4. 적정 예압량 결정
5. 과도한 예압의 문제점

실기 단답형에서 자주 출제되는 베어링 관련 용어도 정리해주세요.`
      },
    ],
  },
];

export default function MEPracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('me-practical-progress');
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
    localStorage.setItem('me-practical-progress', JSON.stringify(newCompleted));
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
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-engineer" className="text-gray-600 hover:text-blue-600">기계기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">실기시험</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">✍️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기시험 학습</h1>
                <p className="text-indigo-100">기계기사 실기 - 필답형 + 작업형(CAD)</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-indigo-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
