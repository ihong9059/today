'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'concept',
    name: '정신건강의 개념',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '정신건강의 정의는 무엇인가?',
        answer: 'WHO - 완전한 신체적, 정신적, 사회적 안녕 상태',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 정신건강의 정의는 무엇인가?

다음 순서로 설명해주세요:
1. WHO의 정신건강 정의
2. 정신건강의 구성 요소 (신체적, 정신적, 사회적, 영적)
3. 단순히 질병이 없는 상태가 아닌 웰빙의 개념
4. 현대적 정신건강 개념의 발전 과정
5. 정신건강 증진의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '정상과 비정상의 구분 기준을 설명하시오.',
        answer: '통계적, 사회문화적, 기능적 관점',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 정상과 비정상의 구분 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 통계적 기준: 평균으로부터의 편차
2. 사회문화적 기준: 사회 규범과의 일치도
3. 기능적 기준: 일상생활 기능 수행 능력
4. 주관적 불편감 기준
5. 각 기준의 장단점과 한계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'development',
    name: '성격 발달 이론',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: 'Erikson의 심리사회발달이론에서 영아기(0-1세)의 발달 과업은?',
        answer: '신뢰감 vs 불신감',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: Erikson의 심리사회발달이론에서 영아기(0-1세)의 발달 과업은?

다음 순서로 설명해주세요:
1. Erikson의 8단계 심리사회발달이론 개요
2. 영아기(0-1세)의 발달 과업: 신뢰감 vs 불신감
3. 이 시기 양육자의 역할과 중요성
4. 신뢰감 형성 실패 시 영향
5. 각 발달 단계별 주요 과업 정리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'Freud의 정신분석이론 5단계를 순서대로 나열하시오.',
        answer: '구강기 → 항문기 → 남근기 → 잠복기 → 생식기',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: Freud의 정신분석이론 5단계를 순서대로 나열하시오.

다음 순서로 설명해주세요:
1. 구강기(0-1세): 입을 통한 만족
2. 항문기(1-3세): 배변 훈련과 통제
3. 남근기(3-6세): 성 정체성 형성
4. 잠복기(6-12세): 성적 욕구 억압
5. 생식기(12세 이상): 성숙한 성적 관계
6. 각 단계별 고착의 결과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'stress',
    name: '스트레스와 적응',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: 'Selye의 일반적응증후군(GAS) 3단계를 순서대로 나열하시오.',
        answer: '경고(alarm) → 저항(resistance) → 소진(exhaustion)',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: Selye의 일반적응증후군(GAS) 3단계를 순서대로 나열하시오.

다음 순서로 설명해주세요:
1. 경고 단계: 스트레스 인지, 투쟁-도피 반응
2. 저항 단계: 적응 시도, 저항력 증가
3. 소진 단계: 에너지 고갈, 질병 발생
4. 각 단계별 생리적 변화
5. 스트레스 관리의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '문제중심 대처와 정서중심 대처의 차이를 설명하시오.',
        answer: '문제중심: 상황 변화 시도, 정서중심: 감정 조절',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 문제중심 대처와 정서중심 대처의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 문제중심 대처: 스트레스 원인 제거, 해결 방안 모색
2. 정서중심 대처: 감정 관리, 긍정적 재해석
3. 각 대처 방식의 장단점
4. 상황에 따른 적절한 대처 방식 선택
5. 효과적인 스트레스 관리 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'defense',
    name: '방어기제',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '자신의 공격적 감정을 타인이 가지고 있다고 생각하는 방어기제는?',
        answer: '투사(Projection)',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 자신의 공격적 감정을 타인이 가지고 있다고 생각하는 방어기제는?

다음 순서로 설명해주세요:
1. 투사(Projection)의 정의
2. 투사의 작동 기전
3. 임상적 사례 (예: 편집증적 사고)
4. 다른 방어기제와의 차이
5. 치료적 접근 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '성숙한 방어기제인 승화(Sublimation)를 설명하시오.',
        answer: '사회적으로 인정받는 방향으로 에너지 전환',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 성숙한 방어기제인 승화(Sublimation)를 설명하시오.

다음 순서로 설명해주세요:
1. 승화의 정의: 본능적 욕구를 건설적 방향으로 전환
2. 승화의 예시 (예: 공격성 → 스포츠, 성적 에너지 → 예술)
3. 다른 방어기제와의 차이 (가장 성숙한 방어기제)
4. 승화의 심리적 이점
5. 정신건강 증진에서의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'crisis',
    name: '위기 이론',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '위기 개입의 4가지 원칙을 나열하시오.',
        answer: '즉시성, 근접성, 단순성, 실용성',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 위기 개입의 4가지 원칙을 나열하시오.

다음 순서로 설명해주세요:
1. 즉시성(Immediacy): 지체 없이 즉각 개입
2. 근접성(Proximity): 익숙한 환경에서 개입
3. 단순성(Simplicity): 간단하고 명확한 접근
4. 실용성(Practicality): 현실적이고 실행 가능한 방법
5. 각 원칙의 임상적 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'Caplan의 위기 4단계를 순서대로 설명하시오.',
        answer: '불안 증가 → 문제해결 시도 → 비상 대처 → 붕괴',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: Caplan의 위기 4단계를 순서대로 설명하시오.

다음 순서로 설명해주세요:
1. 1단계: 불안과 긴장 증가
2. 2단계: 기존 대처 방법 시도
3. 3단계: 비상 자원 동원, 새로운 대처
4. 4단계: 대처 실패, 심리적 붕괴
5. 각 단계별 적절한 간호 중재

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'prevention',
    name: '정신건강 증진',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '정신건강 1차 예방의 정의와 예시를 설명하시오.',
        answer: '질병 발생 예방 (교육, 환경 개선)',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 정신건강 1차 예방의 정의와 예시를 설명하시오.

다음 순서로 설명해주세요:
1. 1차 예방의 정의: 질병 발생 전 예방
2. 1차 예방 활동 예시 (정신건강교육, 스트레스 관리, 환경 개선)
3. 대상: 일반 인구 전체
4. 목표: 발생률 감소
5. 효과적인 1차 예방 프로그램 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '2차 예방과 3차 예방의 차이를 설명하시오.',
        answer: '2차: 조기 발견 및 치료, 3차: 재발 방지 및 재활',
        prompt: `정신건강간호사 시험 - 정신건강이론 문제입니다.

문제: 2차 예방과 3차 예방의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 2차 예방: 조기 발견, 선별검사, 조기 치료
2. 2차 예방 예시 (우울증 선별, 위기 상담)
3. 3차 예방: 재발 방지, 재활, 사회 복귀
4. 3차 예방 예시 (재활 프로그램, 사회기술훈련)
5. 각 예방 단계의 목표와 효과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function MentalHealthTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-theory-progress');
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
    localStorage.setItem('mental-health-theory-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-emerald-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-emerald-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">정신건강이론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">정신건강이론 학습</h1>
                <p className="text-emerald-100">정신건강간호사 자격시험</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-emerald-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                                  href={'https://claude.ai/new?q=' + encodeURIComponent(q.prompt)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  Claude
                                </a>
                                <a
                                  href={'https://chat.openai.com/?q=' + encodeURIComponent(q.prompt)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  ChatGPT
                                </a>
                                <a
                                  href={'https://gemini.google.com/app?q=' + encodeURIComponent(q.prompt)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  Gemini
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
