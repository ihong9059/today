'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'safety-management',
    name: '가스 안전관리',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '가스 안전관리자의 직무와 자격을 설명하시오.', answer: '가스시설 점검·정비, 안전교육, 사고대응 / 자격: 가스기사 이상', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 안전관리자의 직무와 자격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전관리자 선임 대상\n2. 주요 직무\n3. 자격 요건\n4. 교육 이수\n5. 법적 책임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스시설의 정기검사 및 정밀안전진단을 설명하시오.', answer: '정기검사: 연 1회, 정밀안전진단: 15년 이상 시설, 안전성 평가', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스시설의 정기검사 및 정밀안전진단을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사 주기\n2. 검사 항목\n3. 정밀안전진단 대상\n4. 진단 방법\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스 안전교육의 종류와 내용을 설명하시오.', answer: '신규교육, 정기교육(연 1회), 특별안전교육 - 법규, 안전수칙, 사고사례', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 안전교육의 종류와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신규교육 대상\n2. 정기교육 주기\n3. 특별안전교육 시기\n4. 교육 내용\n5. 이수 시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스 안전점검표 작성과 활용을 설명하시오.', answer: '일상점검, 정기점검, 특별점검 - 체크리스트, 이상 발견 시 조치', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 안전점검표 작성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 종류\n2. 점검 항목 선정\n3. 체크리스트 구성\n4. 결과 기록\n5. 개선 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스사고 발생 시 초동조치를 설명하시오.', answer: '가스 차단, 화기 금지, 환기, 대피, 소방서·가스회사 신고', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스사고 발생 시 초동조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가스 차단 방법\n2. 화기 금지 조치\n3. 환기 실시\n4. 대피 절차\n5. 신고 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'leak-detection',
    name: '가스 누출 및 검지',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '가스 누출 검사 방법을 설명하시오.', answer: '발포액(비눗물), 가스검지기, 압력강하법, 초음파 검사', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 누출 검사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발포액 검사\n2. 가스검지기 사용\n3. 압력강하법\n4. 초음파 검사\n5. 적용 대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '기밀시험의 종류와 방법을 설명하시오.', answer: '공기압시험, 질소압시험, 수압시험 - 시험압력, 보압시간, 합격기준', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 기밀시험의 종류와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공기압시험 절차\n2. 질소압시험 장점\n3. 수압시험 적용\n4. 시험압력 설정\n5. 합격 판정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스검지기의 종류와 설치기준을 설명하시오.', answer: '접촉연소식, 반도체식, 전기화학식 - 폭발하한계 1/4 이하 경보', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스검지기의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검지 원리별 종류\n2. 설치 위치 선정\n3. 경보 설정값\n4. 점검 주기\n5. 교정 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스 냄새제(부취제) 첨가와 검지를 설명하시오.', answer: 'THT(테트라하이드로티오펜), TBM(터셔리부틸머캅탄) - 1/1000 농도 검지 가능', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 냄새제 첨가와 검지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부취제 종류\n2. 첨가 농도 기준\n3. 후각 검지 한계\n4. 부취제 검사\n5. 적용 제외 가스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '누출 가스의 확산과 체류를 설명하시오.', answer: '비중에 따른 확산(LPG: 하부, LNG: 상부), 환기 불량 시 체류', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 누출 가스의 확산과 체류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가스 비중과 확산\n2. LPG 체류 특성\n3. LNG 확산 특성\n4. 환기 중요성\n5. 검지기 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-prevention',
    name: '가스사고 예방',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '가스사고의 유형과 원인을 설명하시오.', answer: '누출, 폭발, 화재, 질식, 중독 - 설비 결함, 인적 오류, 관리 소홀', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스사고의 유형과 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 누출사고 원인\n2. 폭발사고 메커니즘\n3. 화재 발생 조건\n4. 질식 위험성\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '정전기 재해 방지대책을 설명하시오.', answer: '접지, 본딩, 습도 유지, 대전 방지제, 제전기', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 정전기 재해 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 방법\n2. 본딩 적용\n3. 습도 관리\n4. 대전 방지제\n5. 제전기 사용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '밀폐공간 작업 시 안전조치를 설명하시오.', answer: '산소농도 측정(18% 이상), 환기, 작업허가서, 감시인 배치', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 밀폐공간 작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산소농도 기준\n2. 사전 환기\n3. 작업허가서 작성\n4. 감시인 배치\n5. 비상구출 준비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접·용단 작업 시 안전대책을 설명하시오.', answer: '가스 퍼지, 불티 비산 방지, 소화기 비치, 작업 후 감시', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 용접·용단 작업 시 안전대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전 가스 퍼지\n2. 불티 비산 방지\n3. 소화 설비 준비\n4. 작업 중 감시\n5. 작업 후 점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스 충전 시 안전수칙을 설명하시오.', answer: '용기 외관검사, 충전량 확인, 과충전 방지, 충전 후 누출검사', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 충전 시 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용기 외관검사\n2. 충전량 계산\n3. 과충전 방지\n4. 충전 속도 관리\n5. 누출 검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emergency-response',
    name: '비상대응',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '가스 누출 시 긴급조치 절차를 설명하시오.', answer: '공급 차단, 환기, 화기 금지, 대피, 긴급연락', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 누출 시 긴급조치 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급 차단 방법\n2. 환기 실시\n3. 화기 금지 조치\n4. 대피 경로\n5. 긴급연락 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스화재 진압 방법을 설명하시오.', answer: '공급 차단 후 소화, 차단 불가 시 냉각 소화, 적합 소화약제 사용', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스화재 진압 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급 차단 우선\n2. 냉각 소화\n3. 적합 소화약제\n4. 재발화 방지\n5. 안전 거리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '비상대응계획(ERP) 수립을 설명하시오.', answer: '위험성 평가, 시나리오 작성, 조직 구성, 훈련 실시', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 비상대응계획 수립을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험성 평가\n2. 사고 시나리오\n3. 비상조직 구성\n4. 훈련 계획\n5. 개선 및 보완\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스 중독 시 응급처치를 설명하시오.', answer: '신선한 공기로 이동, 인공호흡, 산소 공급, 병원 이송', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스 중독 시 응급처치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환자 구출\n2. 신선한 공기 이동\n3. 기도 확보\n4. 인공호흡\n5. 병원 이송\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '방재설비(소화설비, 제독설비)를 설명하시오.', answer: '살수설비, 포소화설비, 불활성가스 소화설비, 중화제 살포', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 방재설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 살수설비 구성\n2. 포소화설비 적용\n3. 불활성가스 소화\n4. 제독 방법\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'inspection-maintenance',
    name: '점검 및 정비',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '가스시설의 일상점검 항목을 설명하시오.', answer: '누출 확인, 압력 확인, 온도 확인, 계기 작동, 이상음·진동', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 가스시설의 일상점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 누출 점검\n2. 압력·온도 확인\n3. 계기 작동 확인\n4. 이상 징후 파악\n5. 점검 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '정기점검의 주기와 내용을 설명하시오.', answer: '월 1회, 분기 1회, 연 1회 - 설비별 세부 점검', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 정기점검의 주기와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 월간 점검 항목\n2. 분기 점검 항목\n3. 연간 점검 항목\n4. 점검 결과 보고\n5. 개선 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '밸브의 점검 및 정비를 설명하시오.', answer: '외관검사, 작동검사, 누설검사, 분해정비, 그리스 주입', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 밸브의 점검 및 정비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 점검\n2. 작동 시험\n3. 누설 검사\n4. 분해 정비\n5. 시트 교체\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '비파괴검사(NDT) 방법을 설명하시오.', answer: '방사선투과검사(RT), 초음파탐상검사(UT), 자분탐상검사(MT), 침투탐상검사(PT)', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 비파괴검사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RT(방사선투과)\n2. UT(초음파탐상)\n3. MT(자분탐상)\n4. PT(침투탐상)\n5. 적용 대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '배관의 부식 방지 및 검사를 설명하시오.', answer: '도장, 전기방식(음극방식), 두께 측정, 부식 정도 평가', prompt: '가스기사 가스안전관리 문제입니다.\n\n문제: 배관의 부식 방지 및 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도장 방식\n2. 전기방식 원리\n3. 두께 측정 방법\n4. 부식 등급 판정\n5. 교체 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GasSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-engineer-gas-safety-progress');
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
    localStorage.setItem('gas-engineer-gas-safety-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">가스안전관리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">가스안전관리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스기사 필기시험 핵심 과목</p>
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
