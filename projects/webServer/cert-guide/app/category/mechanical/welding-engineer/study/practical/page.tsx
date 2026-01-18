'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'wps-pqr',
    name: 'WPS/PQR 작성',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'WPS(용접절차사양서)의 필수변수를 설명하시오.', answer: '모재종류, 용접법, 전류종류, 예열온도', prompt: '용접기사 실기 문제입니다.\n\n문제: WPS(용접절차사양서)의 필수변수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모재(P-No.)\n2. 용접법(SMAW, GMAW 등)\n3. 전류 종류/극성\n4. 예열/층간온도\n5. PWHT 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'PQR 시험항목을 설명하시오.', answer: '인장, 굽힘, 충격, 경도, 매크로', prompt: '용접기사 실기 문제입니다.\n\n문제: PQR 시험항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인장시험\n2. 굽힘시험\n3. 충격시험\n4. 경도시험\n5. 매크로시험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'WPS와 PQR의 관계를 설명하시오.', answer: 'PQR로 WPS 검증, WPS 범위 내 적용', prompt: '용접기사 실기 문제입니다.\n\n문제: WPS와 PQR의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PQR의 역할\n2. WPS 인정범위\n3. 필수변수 관계\n4. 비필수변수\n5. 보충필수변수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접사 자격시험 항목을 설명하시오.', answer: '굽힘시험, RT검사, 외관검사', prompt: '용접기사 실기 문제입니다.\n\n문제: 용접사 자격시험 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관검사\n2. RT 검사\n3. 굽힘시험\n4. 자격 범위\n5. 유효기간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '두께 범위에 따른 PQR 인정범위를 설명하시오.', answer: '시험두께의 2배 또는 무제한(규격별 차이)', prompt: '용접기사 실기 문제입니다.\n\n문제: 두께 범위에 따른 PQR 인정범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험두께 기준\n2. 최소 인정두께\n3. 최대 인정두께\n4. 규격별 차이\n5. 복수 PQR 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'defect',
    name: '용접결함분석',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '기공(Porosity) 발생원인과 방지대책을 쓰시오.', answer: '원인: 수분/유분/도금, 대책: 건조/청결', prompt: '용접기사 실기 문제입니다.\n\n문제: 기공(Porosity) 발생원인과 방지대책을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 수분에 의한 기공\n2. 유분/녹에 의한 기공\n3. 도금층의 영향\n4. 방지대책\n5. 검사방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '슬래그혼입 발생원인과 방지대책을 쓰시오.', answer: '원인: 슬래그 제거불량, 대책: 층간청소', prompt: '용접기사 실기 문제입니다.\n\n문제: 슬래그혼입 발생원인과 방지대책을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 층간 슬래그 제거 불량\n2. 용접조건 부적절\n3. 그루브 형상\n4. 방지대책\n5. 검사방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용입불량 발생원인과 방지대책을 쓰시오.', answer: '원인: 저전류/빠른속도, 대책: 조건조정', prompt: '용접기사 실기 문제입니다.\n\n문제: 용입불량 발생원인과 방지대책을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 낮은 용접전류\n2. 빠른 용접속도\n3. 그루브 형상 부적절\n4. 방지대책\n5. 검사방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '균열(Crack) 종류와 발생원인을 분류하시오.', answer: '고온균열(응고), 저온균열(수소)', prompt: '용접기사 실기 문제입니다.\n\n문제: 균열(Crack) 종류와 발생원인을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 고온균열 원인\n2. 저온균열 원인\n3. 재열균열\n4. 라멜라테어\n5. 방지대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'RT 필름에서 결함 종류를 판별하는 방법을 설명하시오.', answer: '형상(둥근/선상), 밀도, 위치로 판별', prompt: '용접기사 실기 문제입니다.\n\n문제: RT 필름에서 결함 종류를 판별하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기공 형상\n2. 슬래그 형상\n3. 균열 형상\n4. 용입불량\n5. 판독 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'practice',
    name: '용접작업실기',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: 'SMAW 아래보기 맞대기용접 절차를 설명하시오.', answer: '가용접→루트패스→필링→캡핑', prompt: '용접기사 실기 문제입니다.\n\n문제: SMAW 아래보기 맞대기용접 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가용접\n2. 루트패스(초층)\n3. 필링패스(중간층)\n4. 캡핑패스(표면층)\n5. 비드 품질 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'GTAW 루트패스 기법을 설명하시오.', answer: '키홀형성, 와이어 공급, 백비드 확인', prompt: '용접기사 실기 문제입니다.\n\n문제: GTAW 루트패스 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퍼지 가스\n2. 아크 시작\n3. 키홀 형성\n4. 와이어 공급\n5. 백비드 품질\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '수직상진 용접 시 주의사항을 설명하시오.', answer: '저전류, 좁은 위빙, 용융풀 관리', prompt: '용접기사 실기 문제입니다.\n\n문제: 수직상진 용접 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전류 설정\n2. 위빙 폭\n3. 용융풀 제어\n4. 비드 형성\n5. 결함 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접변형 최소화를 위한 용접순서를 설명하시오.', answer: '대칭용접, 후퇴법, 스킵법', prompt: '용접기사 실기 문제입니다.\n\n문제: 용접변형 최소화를 위한 용접순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대칭용접법\n2. 후퇴법\n3. 스킵법(비석법)\n4. 분할용접\n5. 변형 예측\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접시작/종료부 결함 방지법을 설명하시오.', answer: '런온/런오프탭, 백스텝법', prompt: '용접기사 실기 문제입니다.\n\n문제: 용접시작/종료부 결함 방지법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 런온탭(엔드탭)\n2. 런오프탭\n3. 백스텝법\n4. 크레이터 처리\n5. 탭 제거\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'ndt',
    name: 'NDT 판독',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: 'RT 필름 판독 절차를 설명하시오.', answer: '농도확인→식별기호→결함판독→기록', prompt: '용접기사 실기 문제입니다.\n\n문제: RT 필름 판독 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필름 상태 확인\n2. 농도 측정\n3. IQI 확인\n4. 결함 판독\n5. 기록 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'UT 탐상기록 작성법을 설명하시오.', answer: '결함위치(x,y,d), 에코높이, 지시길이', prompt: '용접기사 실기 문제입니다.\n\n문제: UT 탐상기록 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결함 위치 (x, y)\n2. 깊이 (d)\n3. 에코높이 (%)\n4. 지시길이\n5. 결함 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'MT/PT 지시 판정 기준을 설명하시오.', answer: '선형/원형 지시, 크기별 합부 판정', prompt: '용접기사 실기 문제입니다.\n\n문제: MT/PT 지시 판정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선형지시 기준\n2. 원형지시 기준\n3. 연속/분산 판정\n4. 관련지시\n5. 합격/불합격\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '결함 보수용접 절차를 설명하시오.', answer: '결함제거→재검사→용접→후검사', prompt: '용접기사 실기 문제입니다.\n\n문제: 결함 보수용접 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결함 제거\n2. 제거 확인\n3. 보수용접\n4. 재검사\n5. 기록 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'NDT 결과 보고서 작성법을 설명하시오.', answer: '시험조건, 결함내용, 판정, 서명', prompt: '용접기사 실기 문제입니다.\n\n문제: NDT 결과 보고서 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험정보\n2. 시험조건\n3. 결함 내용\n4. 판정 결과\n5. 검사자 서명\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'calc',
    name: '용접계산',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '용접입열량 계산 문제를 푸시오. (I=200A, V=25V, v=20cm/min)', answer: 'H = 60×200×25/20 = 15,000 J/cm', prompt: '용접기사 실기 문제입니다.\n\n문제: 용접입열량 계산 (I=200A, V=25V, v=20cm/min)\n\n다음 순서로 설명해주세요:\n1. 입열량 공식 H = 60EI/v\n2. 값 대입\n3. 계산 과정\n4. 단위 확인\n5. 적정 입열 여부\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '필릿용접 목두께 계산 문제를 푸시오. (다리길이 6mm)', answer: 'a = 0.7 × 6 = 4.2mm', prompt: '용접기사 실기 문제입니다.\n\n문제: 필릿용접 목두께 계산 (다리길이 6mm)\n\n다음 순서로 설명해주세요:\n1. 목두께 공식 a = 0.7S\n2. 값 대입\n3. 계산\n4. 유효단면적\n5. 강도 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '예열온도 계산 방법을 설명하시오.', answer: 'CE 기준 또는 Pcm 공식 사용', prompt: '용접기사 실기 문제입니다.\n\n문제: 예열온도 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄소당량(CE) 계산\n2. Pcm 공식\n3. 두께 영향\n4. 예열온도 결정\n5. 층간온도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용착효율 계산 문제를 푸시오.', answer: '용착효율 = 실제용착량/사용용접봉량 × 100%', prompt: '용접기사 실기 문제입니다.\n\n문제: 용착효율 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용착효율 정의\n2. 계산 공식\n3. SMAW 효율\n4. GMAW 효율\n5. 비용 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접재료 소요량 계산 문제를 푸시오.', answer: '용접금속량/용착효율 × 안전율', prompt: '용접기사 실기 문제입니다.\n\n문제: 용접재료 소요량 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용접금속 체적\n2. 용접금속 중량\n3. 용착효율 적용\n4. 안전율\n5. 발주량 결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function WeldingPracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('welding-practical-completed');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('welding-practical-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-red-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/welding-engineer" className="text-gray-600 hover:text-red-600">용접기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔧</span>
            <h1 className="text-2xl font-bold text-gray-800">실기시험 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">용접기사 실기시험 핵심 내용</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
