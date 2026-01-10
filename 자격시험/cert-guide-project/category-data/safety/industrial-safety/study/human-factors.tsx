'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'human-machine',
    name: '인간-기계 체계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '인간-기계 체계의 기능 배분 원칙을 설명하시오.', answer: '인간: 유연성, 판단력, 창의성 / 기계: 정확성, 반복성, 속도, 힘', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 인간-기계 체계의 기능 배분 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인간의 우수한 기능\n2. 기계의 우수한 기능\n3. 기능 배분 시 고려사항\n4. MABA-MABA 원칙\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인간-기계 체계의 유형을 분류하시오.', answer: '수동체계, 반자동체계, 자동체계', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 인간-기계 체계의 유형을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 수동체계 특징\n2. 반자동체계 특징\n3. 자동체계 특징\n4. 각 체계별 장단점\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '표시장치(디스플레이)의 설계 원칙을 설명하시오.', answer: '가시성, 가독성, 적합성, 양립성, 피드백', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 표시장치의 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가시성 확보\n2. 가독성 향상\n3. 인간 특성 적합성\n4. 기대치 양립성\n5. 피드백 제공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '조종장치(컨트롤)의 설계 원칙을 설명하시오.', answer: '조작력 적정, 조작방향 양립성, 식별성, 조작오차 방지', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 조종장치의 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조작력 적정화\n2. 양립성 원칙\n3. 형태/색상 식별\n4. 오조작 방지\n5. 배치 원칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '양립성(Compatibility)의 종류를 설명하시오.', answer: '공간양립성, 운동양립성, 개념양립성, 양식양립성', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 양립성의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공간양립성\n2. 운동양립성\n3. 개념양립성\n4. 양식양립성\n5. 양립성 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'human-error',
    name: '인적오류',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '인적오류(Human Error)의 유형을 분류하시오.', answer: 'Slip(실수), Lapse(착오), Mistake(실책), Violation(위반)', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 인적오류의 유형을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. Slip(행위적 실수)\n2. Lapse(기억 착오)\n3. Mistake(판단 실책)\n4. Violation(의도적 위반)\n5. 각 유형별 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '스웨인(Swain)의 인적오류 분류를 설명하시오.', answer: 'Omission(생략), Commission(착오), Extraneous(불필요행위), Sequential(순서오류), Timing(시간오류)', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 스웨인의 인적오류 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생략오류\n2. 착오오류\n3. 불필요행위오류\n4. 순서오류\n5. 시간오류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인적오류 방지대책을 설명하시오.', answer: 'Fool Proof, Fail Safe, Interlock, 표준작업절차, 교육훈련', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 인적오류 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Fool Proof 설계\n2. Fail Safe 설계\n3. Interlock 장치\n4. 표준작업절차(SOP)\n5. 교육훈련 강화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '불안전행동의 원인을 분석하시오.', answer: '심리적 원인(피로, 부주의), 생리적 원인(질병), 환경적 원인, 관리적 원인', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 불안전행동의 원인을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 심리적 원인\n2. 생리적 원인\n3. 환경적 원인\n4. 관리적 원인\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '착오(Error)와 위반(Violation)의 차이를 설명하시오.', answer: '착오: 의도하지 않은 행동, 위반: 의도적인 규칙 위반', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 착오와 위반의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 착오의 특성\n2. 위반의 특성\n3. 발생 원인 차이\n4. 대응 방법 차이\n5. 사례 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'work-environment',
    name: '작업환경',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '조명의 적정 기준을 설명하시오.', answer: '초정밀작업: 750lx 이상, 정밀작업: 300lx 이상, 보통작업: 150lx 이상, 단순작업: 75lx 이상', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 조명의 적정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업별 조도 기준\n2. 균일도 요건\n3. 눈부심 방지\n4. 자연채광 활용\n5. 조명 측정 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소음의 허용기준과 청력보존프로그램을 설명하시오.', answer: '8시간 90dB(A), 85dB(A) 이상 시 청력보존프로그램 실시', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 소음 허용기준과 청력보존프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노출기준\n2. 측정 방법\n3. 청력보존프로그램 구성\n4. 청력검사\n5. 소음대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '온열환경의 평가지표를 설명하시오.', answer: 'WBGT(습구흑구온도지수), 감각온도, 실효온도, 불쾌지수', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 온열환경의 평가지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. WBGT 지수\n2. 감각온도\n3. 실효온도\n4. 불쾌지수\n5. 온열질환 예방\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '진동의 유해성과 대책을 설명하시오.', answer: '전신진동: 요통, 멀미 / 국소진동: 레이노 현상(백지병)', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 진동의 유해성과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전신진동 영향\n2. 국소진동 영향\n3. 레이노 현상\n4. 진동 측정\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '색채의 안전표시 의미를 설명하시오.', answer: '빨강: 금지/방화, 노랑: 경고, 파랑: 지시, 녹색: 안전/구호, 주황: 위험경고', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 색채의 안전표시 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빨강색 의미\n2. 노랑색 의미\n3. 파랑색 의미\n4. 녹색 의미\n5. 표시 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'system-safety',
    name: '시스템안전공학',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: 'FTA(Fault Tree Analysis)를 설명하시오.', answer: '정상사상(Top Event)에서 하향식 분석, AND/OR 게이트 사용, 최소절단집합 도출', prompt: '산업안전기사 시스템안전공학 문제입니다.\n\n문제: FTA를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FTA 개념\n2. 수행 절차\n3. 기호(Gate) 의미\n4. 최소절단집합\n5. 신뢰도 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'FMEA(고장모드 및 영향분석)를 설명하시오.', answer: '부품별 고장모드 파악 → 시스템 영향 평가 → 위험도 순위 결정(RPN)', prompt: '산업안전기사 시스템안전공학 문제입니다.\n\n문제: FMEA를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FMEA 개념\n2. 수행 절차\n3. 고장모드 분류\n4. 위험우선순위(RPN)\n5. 활용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'ETA(Event Tree Analysis)를 설명하시오.', answer: '초기사건(Initiating Event)에서 시작하여 성공/실패 경로 분석', prompt: '산업안전기사 시스템안전공학 문제입니다.\n\n문제: ETA를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ETA 개념\n2. FTA와의 차이\n3. 수행 절차\n4. 확률 계산\n5. 활용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '시스템 신뢰도를 계산하는 방법을 설명하시오.', answer: '직렬: Rs=R1×R2×...×Rn, 병렬: Rs=1-(1-R1)(1-R2)...(1-Rn)', prompt: '산업안전기사 시스템안전공학 문제입니다.\n\n문제: 시스템 신뢰도 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬시스템 신뢰도\n2. 병렬시스템 신뢰도\n3. 복합시스템 분석\n4. 중복설계(Redundancy)\n5. 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'HAZOP(Hazard and Operability Study)를 설명하시오.', answer: '가이드워드(More, Less, No, Reverse 등) 사용하여 공정 이탈 분석', prompt: '산업안전기사 시스템안전공학 문제입니다.\n\n문제: HAZOP을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HAZOP 개념\n2. 가이드워드\n3. 수행 절차\n4. 팀 구성\n5. 보고서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'ergonomics',
    name: '작업생리 및 피로',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '피로의 측정 방법을 설명하시오.', answer: '생리적 측정(심박수, 뇌파), 심리적 측정(주관적 피로감), 작업능률 측정', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 피로의 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생리적 측정 방법\n2. 심리적 측정 방법\n3. 작업능률 측정\n4. 플리커(Flicker) 검사\n5. 피로 회복 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '에너지대사율(RMR)을 설명하시오.', answer: 'RMR=(작업시 에너지-안정시 에너지)/기초대사량, 작업강도 분류에 활용', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 에너지대사율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RMR 계산식\n2. 작업강도 분류\n3. 산소소비량 관계\n4. 심박수와의 관계\n5. 휴식시간 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '근골격계질환의 유해요인을 설명하시오.', answer: '반복동작, 부적절한 자세, 무리한 힘, 진동, 접촉스트레스', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 근골격계질환의 유해요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 반복동작\n2. 부적절한 자세\n3. 무리한 힘\n4. 진동\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '작업휴식 배분 원칙을 설명하시오.', answer: '짧은 휴식 여러번이 효과적, 작업강도에 따라 휴식시간 조정', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 작업휴식 배분 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 휴식의 효과\n2. 휴식시간 산정\n3. 휴식 방법\n4. 교대작업 설계\n5. 야간작업 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '인체측정학의 설계 원칙을 설명하시오.', answer: '조절식 설계(5~95%), 극단치 설계(최대/최소), 평균치 설계', prompt: '산업안전기사 인간공학 문제입니다.\n\n문제: 인체측정학의 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조절식 설계\n2. 극단치 설계\n3. 평균치 설계\n4. 백분위수 적용\n5. 설계 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HumanFactorsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-human-factors-completed');
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
    localStorage.setItem('industrial-safety-human-factors-completed', JSON.stringify(arr));
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
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/industrial-safety" className="text-gray-600 hover:text-red-600">산업안전기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">인간공학 및 시스템안전공학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold text-gray-800">인간공학 및 시스템안전공학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전기사 필기시험 핵심 과목</p>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
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
