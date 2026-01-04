'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'real-estate-basics',
    name: '부동산의 개념과 특성',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '부동산의 자연적 특성 3가지를 설명하시오.',
        answer: '1) 부동성(위치의 고정성) 2) 부증성(공급의 비탄력성) 3) 영속성(내구성)',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산의 자연적 특성 3가지를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 부동성(위치의 고정성)의 의미와 영향
2. 부증성(공급의 비탄력성)의 의미와 영향
3. 영속성(내구성)의 의미와 영향
4. 각 특성이 부동산 시장에 미치는 영향
5. 인문적 특성과의 차이점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '부동산의 인문적(경제적) 특성 4가지를 설명하시오.',
        answer: '1) 용도의 다양성 2) 병합·분할의 가능성 3) 사회적·경제적 위치의 가변성 4) 개별성',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산의 인문적(경제적) 특성 4가지를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 용도의 다양성 - 최유효이용과의 관계
2. 병합·분할의 가능성 - 토지의 물리적 변형
3. 사회적·경제적 위치의 가변성 - 입지의 변화
4. 개별성 - 대체불가능성
5. 자연적 특성과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '부동산의 수요와 공급의 특성을 설명하시오.',
        answer: '수요: 파생수요, 개별성, 대체효과 / 공급: 비탄력성, 재고유지, 신규공급의 시차',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산의 수요와 공급의 특성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 부동산 수요의 특성 (파생수요, 개별성, 대체효과)
2. 부동산 공급의 특성 (비탄력성, 재고유지, 신규공급의 시차)
3. 수요곡선과 공급곡선의 형태
4. 탄력성 개념
5. 시장 균형과 가격 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '토지의 효용, 상대적 희소성, 유효수요의 관계를 설명하시오.',
        answer: '토지의 가치는 효용, 상대적 희소성, 유효수요 세 요소가 모두 충족될 때 발생한다.',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 토지의 효용, 상대적 희소성, 유효수요의 관계를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 효용(Utility)의 개념과 종류
2. 상대적 희소성(Scarcity)의 의미
3. 유효수요(Effective Demand)의 조건
4. 세 요소의 상호관계
5. 부동산 가치 발생의 조건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '최유효이용(Highest and Best Use)의 개념과 판정기준을 설명하시오.',
        answer: '물리적 가능성, 법적 허용성, 경제적 타당성, 최대 생산성을 충족하는 이용방법',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 최유효이용(Highest and Best Use)의 개념과 판정기준을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 최유효이용의 정의
2. 물리적 가능성 (Physical Possibility)
3. 법적 허용성 (Legal Permissibility)
4. 경제적 타당성 (Financial Feasibility)
5. 최대 생산성 (Maximum Productivity)
6. 감정평가에서의 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'real-estate-market',
    name: '부동산시장론',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '부동산 시장의 특성 5가지를 설명하시오.',
        answer: '1) 지역성 2) 비조직성 3) 상품의 비표준화 4) 불완전경쟁시장 5) 정보의 비대칭성',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산 시장의 특성 5가지를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 지역성 - 하위시장의 형성
2. 비조직성 - 거래의 개별성
3. 상품의 비표준화 - 이질성
4. 불완전경쟁시장 - 진입장벽
5. 정보의 비대칭성 - 중개의 필요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '부동산 경기변동의 특성과 국면을 설명하시오.',
        answer: '회복기→확장기→후퇴기→침체기 순환, 일반경기와 시차 존재',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산 경기변동의 특성과 국면을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 부동산 경기변동의 개념
2. 4국면: 회복기, 확장기, 후퇴기, 침체기
3. 일반경기와의 시차관계
4. 경기변동의 원인
5. 경기예측 지표

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '지대이론 중 차액지대론과 위치지대론을 비교 설명하시오.',
        answer: '차액지대론(리카도): 토지비옥도 차이 / 위치지대론(튀넨): 시장과의 거리 차이',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 지대이론 중 차액지대론과 위치지대론을 비교 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 리카도의 차액지대론 - 토지비옥도 기준
2. 튀넨의 위치지대론 - 고립국 모형
3. 두 이론의 공통점과 차이점
4. 현대 도시경제학에서의 적용
5. 한계지대와 잉여지대 개념

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '입찰지대곡선(Bid Rent Curve)의 개념을 설명하시오.',
        answer: '동일한 효용수준을 유지하면서 지불할 수 있는 최대 지대를 거리에 따라 나타낸 곡선',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 입찰지대곡선(Bid Rent Curve)의 개념을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 입찰지대곡선의 정의
2. 도심에서 거리에 따른 지대 변화
3. 용도별(상업, 주거, 공업) 입찰지대곡선 형태
4. 토지이용 패턴 결정 원리
5. 알론소(Alonso) 모형과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '효율적 시장가설의 세 가지 형태를 설명하시오.',
        answer: '약형: 과거정보 반영 / 준강형: 공개정보 반영 / 강형: 모든 정보 반영',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 효율적 시장가설의 세 가지 형태를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 효율적 시장가설의 개념
2. 약형 효율성 (Weak Form)
3. 준강형 효율성 (Semi-Strong Form)
4. 강형 효율성 (Strong Form)
5. 부동산 시장의 효율성 수준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'real-estate-policy',
    name: '부동산정책론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '부동산 정책의 목표와 수단을 설명하시오.',
        answer: '목표: 주거안정, 효율성, 형평성 / 수단: 조세, 금융, 토지이용규제',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 부동산 정책의 목표와 수단을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 정책목표: 주거안정, 효율성, 형평성
2. 조세정책: 취득세, 재산세, 양도소득세
3. 금융정책: LTV, DTI, DSR
4. 토지이용규제: 용도지역제, 개발제한구역
5. 정책의 효과와 한계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '토지공개념의 내용과 관련 제도를 설명하시오.',
        answer: '토지의 사회성 강조, 개발이익환수제, 토지초과이득세, 개발부담금 등',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 토지공개념의 내용과 관련 제도를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 토지공개념의 의의와 근거
2. 헌법적 근거 (제23조, 제122조)
3. 개발이익환수제도
4. 개발부담금제도
5. 토지거래허가제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '주택정책 중 공급정책과 수요정책을 비교하시오.',
        answer: '공급정책: 공공주택, 택지개발 / 수요정책: 금융지원, 세제혜택, 주거급여',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 주택정책 중 공급정책과 수요정책을 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 주택 공급정책의 종류와 효과
2. 주택 수요정책의 종류와 효과
3. 공공임대주택정책
4. 주택금융정책
5. 정책의 효과성 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: 'LTV, DTI, DSR의 개념과 차이를 설명하시오.',
        answer: 'LTV: 담보인정비율, DTI: 총부채상환비율, DSR: 총부채원리금상환비율',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: LTV, DTI, DSR의 개념과 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. LTV(담보인정비율)의 정의와 계산
2. DTI(총부채상환비율)의 정의와 계산
3. DSR(총부채원리금상환비율)의 정의와 계산
4. 세 지표의 차이점
5. 규제 현황과 효과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '분양가상한제의 목적과 내용을 설명하시오.',
        answer: '주택가격 안정을 위해 분양가를 기본형건축비+택지비 이하로 제한하는 제도',
        prompt: `공인중개사 시험 부동산학개론 문제입니다.

문제: 분양가상한제의 목적과 내용을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 분양가상한제의 도입 목적
2. 적용 대상과 지역
3. 분양가격의 구성 (기본형건축비, 택지비)
4. 분양가심사위원회의 역할
5. 제도의 효과와 부작용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function RealestateintroStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('real-estate-agent-real-estate-intro-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('real-estate-agent-real-estate-intro-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-600 hover:text-teal-600">공인중개사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">부동산학개론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">부동산학개론</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{totalCompleted}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">
                    ({getTopicProgress(topic.id, topic.questions.length)}/{topic.questions.length})
                  </span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions[`${topic.id}-${q.id}`]
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                          <p className="text-teal-600 font-medium mb-3">💡 {q.answer}</p>
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
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
