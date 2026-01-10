'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'transformer',
    name: '변압기',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '변압기의 권수비가 a=N1/N2=10일 때, 1차 전압 6600V이면 2차 전압은?', answer: 'V2 = V1/a = 660V', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 변압기의 권수비가 a=10일 때, 1차 전압 6600V이면 2차 전압은?\n\n다음 순서로 설명해주세요:\n1. 권수비 정의\n2. V1/V2 = N1/N2 관계\n3. 대입하여 계산\n4. 전류비 I1/I2 관계\n5. 이상변압기 가정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '변압기의 무부하시험으로 측정할 수 있는 것은?', answer: '철손, 여자전류, 여자컨덕턴스, 여자서셉턴스', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 변압기의 무부하시험으로 측정할 수 있는 것은?\n\n다음 순서로 설명해주세요:\n1. 무부하시험 방법\n2. 철손 측정\n3. 여자전류 성분\n4. 등가회로 정수\n5. 단락시험과 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '변압기의 효율이 최대가 되는 조건은?', answer: '철손 = 동손', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 변압기의 효율이 최대가 되는 조건은?\n\n다음 순서로 설명해주세요:\n1. 효율 공식\n2. 철손(고정손)\n3. 동손(부하손)\n4. 최대효율 조건 유도\n5. 최대효율점 부하율\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '변압기의 전압변동률 공식을 쓰시오.', answer: 'ε = (V20-V2n)/V2n × 100 [%]', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 변압기의 전압변동률 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 전압변동률 정의\n2. 무부하/전부하 전압\n3. 공식 유도\n4. 역률과 관계\n5. 저감 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '변압기의 %임피던스가 5%일 때 2차 단락전류 배수는?', answer: 'Is/In = 100/%Z = 20배', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 변압기의 %임피던스가 5%일 때 2차 단락전류 배수는?\n\n다음 순서로 설명해주세요:\n1. %임피던스 정의\n2. 단락전류 계산\n3. Is = In × 100/%Z\n4. 단락용량\n5. 보호협조\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'induction',
    name: '유도기',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '3상 유도전동기의 동기속도 공식을 쓰시오.', answer: 'Ns = 120f/P [rpm]', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 3상 유도전동기의 동기속도 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 회전자계 원리\n2. Ns = 120f/P 유도\n3. 극수와 주파수 영향\n4. 60Hz, 4극 예제\n5. 실제 회전수와 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '유도전동기의 슬립(slip) 정의와 공식을 쓰시오.', answer: 's = (Ns-N)/Ns', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 유도전동기의 슬립(slip) 정의와 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 슬립 정의\n2. s = (Ns-N)/Ns\n3. 정격 슬립 범위\n4. 슬립과 토크 관계\n5. 슬립 주파수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '유도전동기의 기동법 3가지를 설명하시오.', answer: 'Y-Δ기동, 리액터기동, 기동보상기', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 유도전동기의 기동법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전전압기동\n2. Y-Δ기동 (1/3 전류)\n3. 리액터기동\n4. 기동보상기\n5. 인버터기동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '유도전동기의 속도제어 방법 3가지를 쓰시오.', answer: '극수변환, 주파수변환(VVVF), 2차저항', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 유도전동기의 속도제어 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 극수변환법\n2. 주파수변환(VVVF)\n3. 2차저항 제어\n4. 각 방법의 특징\n5. 인버터 제어 장점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '유도전동기의 역률이 낮은 이유는?', answer: '여자전류(무효전력)가 크기 때문', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 유도전동기의 역률이 낮은 이유는?\n\n다음 순서로 설명해주세요:\n1. 여자전류 특성\n2. 공극의 영향\n3. 무부하/부하시 역률\n4. 역률 개선 방법\n5. 진상 콘덴서\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'synchronous',
    name: '동기기',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '동기발전기의 유기기전력 공식을 쓰시오.', answer: 'E = 4.44fNΦkw [V]', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 동기발전기의 유기기전력 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 유기기전력 원리\n2. E = 4.44fNΦkw\n3. 권선계수 kw\n4. 주파수와 극수 관계\n5. 전압조정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '동기발전기의 병렬운전 조건 4가지를 쓰시오.', answer: '전압, 주파수, 위상, 상회전방향 일치', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 동기발전기의 병렬운전 조건 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 기전력 크기 일치\n2. 주파수 일치\n3. 위상 일치\n4. 상회전방향 일치\n5. 동기투입장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '동기전동기의 V곡선을 설명하시오.', answer: '계자전류 vs 전기자전류, 역률 1에서 최소', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 동기전동기의 V곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. V곡선 정의\n2. 부족여자/과여자\n3. 역률 변화\n4. 동기조상기 원리\n5. 안정도 한계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '동기발전기의 단락비가 클수록 어떤 특성을 갖는가?', answer: '안정도 증가, 전압변동률 감소, 가격 상승', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 동기발전기의 단락비가 클수록 어떤 특성을 갖는가?\n\n다음 순서로 설명해주세요:\n1. 단락비 정의\n2. 동기임피던스 관계\n3. 안정도 증가\n4. 전압변동률 감소\n5. 크기/가격 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '동기전동기의 기동방법을 설명하시오.', answer: '제동권선법, 기동전동기법, 인버터기동법', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 동기전동기의 기동방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기기동 불가 이유\n2. 제동권선(농형)법\n3. 기동전동기법\n4. 인버터기동법\n5. 동기속도 투입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'dc',
    name: '직류기',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '직류발전기의 유기기전력 공식을 쓰시오.', answer: 'E = PZNΦ/60a [V]', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 직류발전기의 유기기전력 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 유기기전력 원리\n2. E = PZNΦ/60a\n3. P(극수), Z(도체수)\n4. N(회전수), Φ(자속)\n5. a(병렬회로수)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직류전동기의 속도-토크 특성을 여자방식별로 비교하시오.', answer: '분권: 정속도, 직권: 가변속도(저속고토크)', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 직류전동기의 속도-토크 특성을 여자방식별로 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 분권전동기 특성\n2. 직권전동기 특성\n3. 복권전동기 특성\n4. 적용 분야\n5. 무부하 주의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '직류전동기의 속도제어 방법 3가지를 쓰시오.', answer: '전압제어, 계자제어, 저항제어', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 직류전동기의 속도제어 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 전압제어법\n2. 계자제어법(약계자)\n3. 저항제어법\n4. 각 방법의 특성\n5. 효율 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직류기의 정류자 역할을 설명하시오.', answer: '교류→직류 변환(발전기), 직류→교류 변환(전동기)', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 직류기의 정류자 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정류자 구조\n2. 발전기: AC→DC\n3. 전동기: 토크방향 유지\n4. 브러시 역할\n5. 정류 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직류전동기의 역기전력과 토크 관계를 설명하시오.', answer: 'E = V-IaRa, T = kΦIa', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 직류전동기의 역기전력과 토크 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역기전력 E = kΦN\n2. 전기자 회로: V = E + IaRa\n3. 토크 T = kΦIa\n4. 속도 N = (V-IaRa)/kΦ\n5. 기동토크\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special',
    name: '특수기기/전력전자',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '인버터(Inverter)의 역할을 설명하시오.', answer: 'DC→AC 변환, 가변전압가변주파수(VVVF) 출력', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 인버터(Inverter)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인버터 정의\n2. DC→AC 변환\n3. VVVF 출력\n4. PWM 제어\n5. 유도전동기 구동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '정류회로의 종류와 출력전압을 비교하시오.', answer: '단상반파 0.45Vm, 단상전파 0.9Vm, 3상전파 1.35Vm', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 정류회로의 종류와 출력전압을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 단상반파정류\n2. 단상전파정류\n3. 3상반파정류\n4. 3상전파정류\n5. 맥동률 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '서보모터의 특징을 설명하시오.', answer: '정밀위치제어, 빠른응답, 고토크, 엔코더 내장', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 서보모터의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서보모터 정의\n2. 위치/속도 제어\n3. 엔코더 피드백\n4. AC서보 vs DC서보\n5. 산업용 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '스텝모터의 동작원리를 설명하시오.', answer: '펄스신호에 따라 일정 각도씩 회전', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: 스텝모터의 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스텝모터 구조\n2. 펄스 입력\n3. 스텝각\n4. PM형/VR형/HB형\n5. 마이크로스텝\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'BLDC 모터의 특징을 설명하시오.', answer: '브러시 없음, 정류자 대신 전자정류, 고효율', prompt: '전기산업기사 전기기기 문제입니다.\n\n문제: BLDC 모터의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BLDC 구조\n2. 전자정류\n3. 홀센서 역할\n4. 장점 (고효율, 저소음)\n5. 적용분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricCraftsmanMachineryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-machinery-completed');
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
    localStorage.setItem('electric-craftsman-machinery-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

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
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전기기기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전기기기</h1>
              <p className="text-blue-100">전기산업기사 필기 핵심 과목</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalQuestions}</div>
              <div className="text-blue-100 text-sm">문제 완료</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                    {getCompletedCount(topic.id)}/{topic.questions.length}
                  </span>
                </div>
                <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => {
                    const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleComplete(topic.id, q.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                            <div className="flex gap-2 flex-wrap">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">🧡 Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">💚 ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">💙 Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
