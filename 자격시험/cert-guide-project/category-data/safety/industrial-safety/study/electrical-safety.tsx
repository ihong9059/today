'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'electric-shock',
    name: '감전재해',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '감전의 위험성을 설명하시오.', answer: '통전전류 1mA(감지), 10mA(이탈한계), 50mA(심실세동)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 감전의 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통전전류 영향\n2. 감지전류(1mA)\n3. 이탈한계전류(10mA)\n4. 심실세동전류(50mA)\n5. 인체 저항 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '누전차단기의 구조와 작동원리를 설명하시오.', answer: '영상변류기(ZCT)로 누설전류 검출, 정격감도전류(30mA) 초과 시 차단', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 누전차단기의 구조와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영상변류기(ZCT)\n2. 감도전류 종류\n3. 동작시간(고속형/시연형)\n4. 설치장소\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '접지공사의 종류와 접지저항을 설명하시오.', answer: '특별3종(10Ω), 1종(10Ω), 2종(공식), 3종(100Ω)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 접지공사의 종류와 접지저항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별3종 접지\n2. 1종 접지\n3. 2종 접지\n4. 3종 접지\n5. 접지극 설치 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '보호접지와 등전위본딩을 설명하시오.', answer: '보호접지: 기기외함을 접지, 등전위본딩: 전위차 제거', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 보호접지와 등전위본딩을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호접지 목적\n2. 등전위본딩 목적\n3. 접지와 본딩 차이\n4. 본딩 대상 설비\n5. 시공 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '활선작업 시 안전조치를 설명하시오.', answer: '절연용 보호구/방호구 착용, 활선작업용 기구 사용, 충전부 방호', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 활선작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호구 착용\n2. 활선작업용 기구\n3. 절연용 방호구\n4. 감시인 배치\n5. 작업범위 제한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'electric-fire',
    name: '전기화재',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '전기화재의 원인을 분류하시오.', answer: '과전류, 누전, 합선(단락), 접촉불량, 과부하', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전기화재의 원인을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 과전류 원인\n2. 누전 원인\n3. 합선(단락) 원인\n4. 접촉불량 원인\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '과전류 차단장치의 종류를 설명하시오.', answer: '퓨즈, 배선용차단기(MCCB), 누전차단기(ELB)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 과전류 차단장치의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퓨즈 특성\n2. 배선용차단기(MCCB)\n3. 누전차단기(ELB)\n4. 정격전류 선정\n5. 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '전선의 허용전류와 과부하 보호를 설명하시오.', answer: '허용전류 = 연속사용 가능한 최대전류, 차단기 정격 ≤ 허용전류', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전선의 허용전류와 과부하 보호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용전류 정의\n2. 영향 요인\n3. 차단기 선정\n4. 과부하 판단\n5. 전선 굵기 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '트래킹 현상을 설명하시오.', answer: '절연물 표면에 탄화 도전로 형성, 습기/먼지가 주원인', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 트래킹 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트래킹 정의\n2. 발생 원인\n3. 진행 과정\n4. 예방 대책\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '전기화재 시 소화방법을 설명하시오.', answer: 'C급 화재: CO2, 분말, 하론, 전원차단 후 A급 소화', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전기화재 시 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. C급 화재 특성\n2. 적응 소화약제\n3. 물 사용 금지 이유\n4. 전원차단 후 조치\n5. 소화기 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'static-electricity',
    name: '정전기',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '정전기 발생 메커니즘을 설명하시오.', answer: '마찰대전, 박리대전, 유동대전, 분무대전, 유도대전', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 정전기 발생 메커니즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마찰대전\n2. 박리대전\n3. 유동대전\n4. 분무대전\n5. 유도대전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '정전기 재해 방지대책을 설명하시오.', answer: '접지, 가습(상대습도 70% 이상), 제전기 사용, 대전방지제', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 정전기 재해 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 방법\n2. 습도 관리\n3. 제전기 종류\n4. 대전방지제\n5. 도전성 설비 사용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인체의 정전기 대전과 방전을 설명하시오.', answer: '보행대전 수kV~수십kV, 최소착화에너지 0.2mJ(탄화수소)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 인체의 정전기 대전과 방전을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보행대전 전압\n2. 방전에너지 계산\n3. 최소착화에너지\n4. 인체 정전용량\n5. 방지대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 취급 시 정전기 대책을 설명하시오.', answer: '본딩, 접지, 유속제한(1m/s), 이완시간 확보', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 위험물 취급 시 정전기 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본딩 조치\n2. 접지 조치\n3. 유속 제한\n4. 이완시간 확보\n5. 용기 재질 선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '정전기 방전의 종류를 설명하시오.', answer: '코로나방전, 브러시방전, 불꽃방전, 연면방전', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 정전기 방전의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코로나방전\n2. 브러시방전\n3. 불꽃방전\n4. 연면방전\n5. 착화 위험성 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion-proof',
    name: '방폭설비',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '폭발위험장소의 구분을 설명하시오.', answer: '0종(상시), 1종(정상운전 중 생성), 2종(비정상 시 생성)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 폭발위험장소의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 0종 장소\n2. 1종 장소\n3. 2종 장소\n4. 분진 위험장소(20/21/22종)\n5. 장소 구분 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '방폭구조의 종류를 설명하시오.', answer: '내압방폭(d), 압력방폭(p), 유입방폭(o), 안전증방폭(e), 본질안전방폭(i)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 방폭구조의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내압방폭(d) 원리\n2. 압력방폭(p) 원리\n3. 유입방폭(o) 원리\n4. 안전증방폭(e) 원리\n5. 본질안전방폭(i) 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '방폭기기의 표시방법을 설명하시오.', answer: 'Ex d IIB T4: 내압방폭, 가스그룹IIB, 온도등급T4', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 방폭기기의 표시방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방폭구조 기호\n2. 가스그룹\n3. 온도등급\n4. 보호등급(IP)\n5. 표시 해석 예\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스그룹과 온도등급을 설명하시오.', answer: 'IIA(프로판), IIB(에틸렌), IIC(수소/아세틸렌), T1~T6', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 가스그룹과 온도등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가스그룹 I/II/III\n2. 대표 가스 종류\n3. 온도등급 T1~T6\n4. 발화온도와의 관계\n5. 기기 선정 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '분진방폭의 특성을 설명하시오.', answer: 'DIP A(분진 비침투), DIP B(분진 침투 제한), DIP C(가연성 분진)', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 분진방폭의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분진폭발 조건\n2. 분진 위험장소 구분\n3. 분진방폭 구조\n4. 온도등급\n5. 설비 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'electrical-work',
    name: '전기작업 안전',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '정전작업 시 안전조치를 설명하시오.', answer: '전원차단→잔류전하 방전→단락접지→검전→통전금지표지', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 정전작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전원차단\n2. 잔류전하 방전\n3. 단락접지\n4. 검전 확인\n5. 통전금지 표시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전기작업용 안전장구를 설명하시오.', answer: '절연장갑, 절연화, 절연복, 절연안전모, 절연테이프', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전기작업용 안전장구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연장갑 등급\n2. 절연화 기준\n3. 절연복/절연헬멧\n4. 활선작업용 기구\n5. 점검/관리 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '접근한계거리를 설명하시오.', answer: '특고압(7kV 초과): 60cm 이상, 고압: 30cm 이상, 저압: 접촉금지', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 접근한계거리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저압 기준\n2. 고압 기준\n3. 특별고압 기준\n4. 충전부 방호\n5. 작업발판 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전기기계기구의 충전부 방호를 설명하시오.', answer: '충전부 절연, 충전부 격리(울타리/커버), 감전방지용 구조', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전기기계기구의 충전부 방호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연 방법\n2. 격리 방법\n3. 울타리/덮개\n4. 보호등급(IP)\n5. 정기점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '전기설비 정기점검 항목을 설명하시오.', answer: '절연저항, 접지저항, 누전차단기 동작, 접속부 발열', prompt: '산업안전기사 전기위험방지기술 문제입니다.\n\n문제: 전기설비 정기점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연저항 측정\n2. 접지저항 측정\n3. 누전차단기 시험\n4. 접속부 점검\n5. 열화상 점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricalSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-electrical-safety-completed');
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
    localStorage.setItem('industrial-safety-electrical-safety-completed', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">전기위험방지기술</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-2xl font-bold text-gray-800">전기위험방지기술 학습하기</h1>
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
