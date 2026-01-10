'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'facility-design',
    name: '가스설비 설계',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: 'LPG 저장탱크 용량 계산 및 안전거리를 산정하시오. (저장량 10톤)', answer: '용량 계산: 10,000kg ÷ 0.5(LPG비중) = 20m³, 안전거리: 10m 이상(10톤 이하 기준)', prompt: '가스기사 실기 문제입니다.\n\n문제: LPG 저장탱크 용량 계산 및 안전거리를 산정하시오. (저장량 10톤)\n\n다음 순서로 풀이해주세요:\n1. LPG 비중 적용\n2. 용량 계산식\n3. 안전거리 법규 기준\n4. 보유공지 계산\n5. 방호벽 높이 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도시가스 배관 직경을 계산하시오. (유량 100Nm³/h, 압력강하 100Pa/m)', answer: 'Weymouth 공식 사용: Q = K×D^2.667×√(P1²-P2²)/L, D ≈ 100mm', prompt: '가스기사 실기 문제입니다.\n\n문제: 도시가스 배관 직경을 계산하시오. (유량 100Nm³/h, 압력강하 100Pa/m)\n\n다음 순서로 풀이해주세요:\n1. 적용 공식 선정\n2. 압력강하 계산\n3. 배관 직경 산출\n4. 표준 규격 선정\n5. 유속 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '압축기 소요동력을 계산하시오. (흡입압력 1bar, 토출압력 10bar, 유량 100Nm³/h)', answer: 'L = (k/(k-1))×P1×V1×[(P2/P1)^((k-1)/k) - 1]/η, 약 15kW (단열효율 80%)', prompt: '가스기사 실기 문제입니다.\n\n문제: 압축기 소요동력을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 압축일 공식\n2. 비열비(k) 적용\n3. 이론 압축일 계산\n4. 효율 적용\n5. 실제 동력 산출\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-device-selection',
    name: '안전장치 선정',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '안전밸브의 방출량을 계산하시오. (용기 내용적 10m³, LPG 저장)', answer: 'Q = A×F (A: 방열면적, F: 방출계수), 약 5,000kg/h', prompt: '가스기사 실기 문제입니다.\n\n문제: 안전밸브의 방출량을 계산하시오.\n\n다음 순서로 풀이해주세요:\n1. 방열면적 계산\n2. 방출계수 선정\n3. 방출량 산출\n4. 안전밸브 구경\n5. 방출관 직경\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스검지기 설치 개수를 산정하시오. (실내공간 300m², 천장고 4m)', answer: '검지범위: 반경 4m, 개수: 300÷(π×4²) ≈ 6개', prompt: '가스기사 실기 문제입니다.\n\n문제: 가스검지기 설치 개수를 산정하시오.\n\n다음 순서로 풀이해주세요:\n1. 가스 비중 확인\n2. 검지 반경 적용\n3. 유효 감지 면적\n4. 필요 개수 산출\n5. 설치 위치 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '역화방지기를 선정하시오. (아세틸렌 사용량 10m³/h)', answer: '건식 역화방지기, 정격유량 15m³/h 이상 (안전율 1.5배)', prompt: '가스기사 실기 문제입니다.\n\n문제: 역화방지기를 선정하시오.\n\n다음 순서로 풀이해주세요:\n1. 가스 종류 확인\n2. 사용량 계산\n3. 안전율 적용\n4. 역화방지기 종류\n5. 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'inspection-test',
    name: '점검 및 시험',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '기밀시험 절차와 합격기준을 서술하시오. (시험압력 10bar)', answer: '절차: 가스 퍼지→공기압 가압→10bar 유지(30분)→압력강하 확인, 합격: 압력강하 3% 이내', prompt: '가스기사 실기 문제입니다.\n\n문제: 기밀시험 절차와 합격기준을 서술하시오.\n\n다음 순서로 풀이해주세요:\n1. 사전 준비\n2. 가압 절차\n3. 보압 시간\n4. 압력강하 측정\n5. 합격 판정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스 누출검사 방법을 설명하고 절차를 기술하시오.', answer: '발포액 도포→기포 발생 확인→검지기 사용→초음파 검사→누출 부위 표시 및 보수', prompt: '가스기사 실기 문제입니다.\n\n문제: 가스 누출검사 방법과 절차를 기술하시오.\n\n다음 순서로 풀이해주세요:\n1. 발포액 검사\n2. 검지기 사용\n3. 초음파 검사\n4. 누출 부위 확인\n5. 조치 및 재검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '밸브 점검 체크리스트를 작성하시오.', answer: '외관(부식, 손상), 작동(개폐 원활), 누설(시트부, 패킹), 그리스(주입 상태), 표시(개폐 방향)', prompt: '가스기사 실기 문제입니다.\n\n문제: 밸브 점검 체크리스트를 작성하시오.\n\n다음 순서로 풀이해주세요:\n1. 외관 점검 항목\n2. 작동 점검 항목\n3. 누설 점검 항목\n4. 그리스 점검\n5. 표시 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-analysis',
    name: '사고사례 분석',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: 'LPG 저장탱크 화재 사고를 분석하고 대책을 수립하시오.', answer: '원인: 용접불티→가스누출→점화, 대책: 용접 전 가스 퍼지, 살수설비 작동, 긴급차단, 방호벽 설치', prompt: '가스기사 실기 문제입니다.\n\n문제: LPG 저장탱크 화재 사고를 분석하고 대책을 수립하시오.\n\n다음 순서로 풀이해주세요:\n1. 사고 경위 분석\n2. 직접 원인\n3. 간접 원인\n4. 재발방지 대책\n5. 비상대응 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도시가스 배관 굴착 중 파손 사고를 분석하시오.', answer: '원인: 매설 위치 미확인→굴착기 손상→가스누출, 대책: 사전 협의, 시험굴, 수작업, 배관 탐지', prompt: '가스기사 실기 문제입니다.\n\n문제: 도시가스 배관 굴착 중 파손 사고를 분석하시오.\n\n다음 순서로 풀이해주세요:\n1. 사고 발생 과정\n2. 사고 원인 분석\n3. 안전조치 미흡점\n4. 개선 대책\n5. 근접공사 안전수칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '밀폐공간 질식사고를 분석하고 예방대책을 제시하시오.', answer: '원인: 산소결핍(18% 미만)→작업자 진입→질식, 대책: 산소농도 측정, 환기, 공기호흡기, 감시인 배치', prompt: '가스기사 실기 문제입니다.\n\n문제: 밀폐공간 질식사고를 분석하고 예방대책을 제시하시오.\n\n다음 순서로 풀이해주세요:\n1. 질식 메커니즘\n2. 사고 원인\n3. 안전조치 부족\n4. 예방 대책\n5. 비상구출 계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'work-permit',
    name: '작업허가 및 관리',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '화기작업 허가서를 작성하시오. (저장탱크 인근 용접작업)', answer: '작업내용, 안전조치(가스 퍼지, 소화기 배치, 불티비산 방지), 작업자/감독자 서명, 허가 기간', prompt: '가스기사 실기 문제입니다.\n\n문제: 화기작업 허가서를 작성하시오.\n\n다음 순서로 작성해주세요:\n1. 작업 개요\n2. 안전조치 사항\n3. 비상연락 체계\n4. 작업 전 점검\n5. 서명 및 승인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '밀폐공간 작업허가서를 작성하시오. (저장탱크 내부 점검)', answer: '산소농도(18% 이상), 가스농도(LEL 10% 미만), 환기장치, 공기호흡기, 감시인, 비상구출 장비', prompt: '가스기사 실기 문제입니다.\n\n문제: 밀폐공간 작업허가서를 작성하시오.\n\n다음 순서로 작성해주세요:\n1. 사전 측정 결과\n2. 환기 계획\n3. 보호구 착용\n4. 감시 체계\n5. 비상조치 계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정비작업 안전작업절차서(SOP)를 작성하시오. (압축기 정비)', answer: '가스 차단→압력 배출→전원 차단→잠금장치(LOTO)→작업 실시→시운전→인계', prompt: '가스기사 실기 문제입니다.\n\n문제: 정비작업 안전작업절차서를 작성하시오.\n\n다음 순서로 작성해주세요:\n1. 작업 준비\n2. 안전조치(LOTO)\n3. 작업 순서\n4. 시운전 절차\n5. 완료 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-engineer-practical-progress');
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
    localStorage.setItem('gas-engineer-practical-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/gas-engineer" className="text-gray-600 hover:text-red-600">가스기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스기사 실기시험 - 가스설비 실무</p>
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
