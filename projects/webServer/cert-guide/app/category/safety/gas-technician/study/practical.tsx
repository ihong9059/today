'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'equipment-design',
    name: '가스설비 설계 및 계산',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '도시가스 배관의 유량과 압력강하를 계산하시오. (주어진 조건: 배관길이 100m, 관경 50mm, 유량 10Nm³/h)', answer: 'Weymouth 공식 또는 Panhandle 공식 적용, 압력강하 = (유량, 길이, 관경) 함수', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 도시가스 배관의 압력강하를 계산하시오.\n조건: 배관길이 100m, 관경 50mm, 유량 10Nm³/h\n\n다음 순서로 설명해주세요:\n1. 적용 공식 선택 (Weymouth, Panhandle)\n2. 계산 과정 상세 단계별 풀이\n3. 압력강하 결과\n4. 적정 관경 검토\n5. 유사 문제 2개 출제\n\n실제 시험처럼 계산과정을 보여주세요.' },
      { id: 2, question: 'LPG 저장탱크의 필요 용량을 산정하시오. (일일 사용량 500kg, 저장일수 7일, 충전율 90%)', answer: '필요 용량(L) = (일일사용량 × 저장일수) ÷ (LPG비중 × 충전율)', prompt: '가스산업기사 실기 문제입니다.\n\n문제: LPG 저장탱크의 필요 용량을 산정하시오.\n조건: 일일 사용량 500kg, 저장일수 7일, 충전율 90%\n\n다음 순서로 설명해주세요:\n1. 총 저장량 계산\n2. LPG 비중 적용 (0.5~0.58)\n3. 충전율 고려\n4. 안전율 적용\n5. 표준 탱크 용량 선정\n\n실제 시험처럼 계산과정을 보여주세요.' },
      { id: 3, question: '안전밸브의 분출량을 계산하시오. (압력용기 용적 10m³, 설정압력 1.5MPa)', answer: '분출량(kg/h) = K × A × P (K: 계수, A: 분출면적, P: 압력)', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 안전밸브의 분출량을 계산하시오.\n조건: 압력용기 용적 10m³, 설정압력 1.5MPa\n\n다음 순서로 설명해주세요:\n1. 적용 공식\n2. 분출계수 선정\n3. 분출면적 계산\n4. 분출량 계산\n5. 안전밸브 규격 선정\n\n실제 시험처럼 계산과정을 보여주세요.' },
    ]
  },
  {
    id: 'safety-management',
    name: '안전관리 실무',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '고압가스 저장시설의 안전거리를 산정하시오. (저장능력 3톤, 보호시설: 학교)', answer: '제1종 보호시설: 30m + (저장능력-1톤)×추가거리', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 고압가스 저장시설의 안전거리를 산정하시오.\n조건: 저장능력 3톤, 보호시설은 학교\n\n다음 순서로 설명해주세요:\n1. 보호시설 분류 (제1종/제2종)\n2. 기본 안전거리\n3. 저장능력에 따른 추가거리\n4. 총 안전거리 계산\n5. 안전거리 완화 조건\n\n실제 시험처럼 근거 법령과 계산과정을 보여주세요.' },
      { id: 2, question: '가스누출 사고 발생 시 초동조치 절차를 작성하시오.', answer: '1)화기제거 2)밸브차단 3)환기 4)인원대피 5)119신고 6)누출부위 확인 7)응급조치', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 가스누출 사고 발생 시 초동조치 절차를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 발견 즉시 조치사항\n2. 공급 차단 방법\n3. 환기 및 대피\n4. 비상연락 체계\n5. 2차 재해 방지\n\n실제 시험처럼 단계별로 구체적으로 작성하세요.' },
      { id: 3, question: '가스설비 정기점검표를 작성하시오. (LPG 충전소 기준)', answer: '점검항목: 저장탱크, 압축기, 충전기, 배관, 밸브, 안전장치, 가스검지기, 소화설비', prompt: '가스산업기사 실기 문제입니다.\n\n문제: LPG 충전소의 정기점검표를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 저장탱크 점검항목\n2. 충전설비 점검항목\n3. 배관·밸브 점검항목\n4. 안전장치 점검항목\n5. 점검주기 및 기록\n\n실제 점검표 양식처럼 표 형태로 작성하세요.' },
    ]
  },
  {
    id: 'accident-analysis',
    name: '가스사고 사례 분석',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: 'LPG 배관 부식으로 인한 누출 화재사고의 원인과 대책을 분석하시오.', answer: '원인: 배관 부식·노후화, 점검 소홀 / 대책: 정기점검, 교체, 부식방지, 가스검지기', prompt: '가스산업기사 실기 문제입니다.\n\n문제: LPG 배관 부식으로 인한 누출 화재사고를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 사고 발생 경위\n2. 직접 원인 (기술적 요인)\n3. 간접 원인 (관리적 요인)\n4. 재발 방지대책 (기술적)\n5. 재발 방지대책 (관리적)\n\n4M 기법을 활용하여 분석하세요.' },
      { id: 2, question: '도시가스 정압기 고장으로 인한 과압 공급 사고를 분석하시오.', answer: '원인: 정압기 작동불량, 모니터정압기 미작동 / 대책: 정기점검, 압력계 설치, 긴급차단장치', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 정압기 고장으로 인한 과압 공급 사고를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 사고 시나리오\n2. 정압기 고장 원인\n3. 안전장치 미작동 원인\n4. 피해 내용\n5. 재발 방지대책\n\n시간 순서대로 상세히 분석하세요.' },
      { id: 3, question: '밀폐공간에서 질식사고가 발생한 원인과 대책을 분석하시오.', answer: '원인: 산소결핍, 환기 불량, 가스측정 미실시 / 대책: 산소농도 측정, 강제환기, 안전교육, 감시인', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 밀폐공간 질식사고의 원인과 대책을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 사고 개요\n2. 질식 발생 메커니즘\n3. 안전조치 미흡 사항\n4. 작업 전 준비사항\n5. 작업 중 안전대책\n\n산업안전보건법 밀폐공간 규정을 적용하세요.' },
    ]
  },
  {
    id: 'law-application',
    name: '법규 적용',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '고압가스 제조시설의 완공검사 신청 서류와 절차를 설명하시오.', answer: '서류: 완공검사신청서, 설계도서, 시공내역서, 비파괴검사성적서, 기밀시험성적서', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 고압가스 제조시설의 완공검사 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완공검사 신청 시기\n2. 제출 서류 목록\n3. 검사 항목\n4. 합격 기준\n5. 검사 결과 후속 조치\n\n고압가스안전관리법 시행규칙을 근거로 작성하세요.' },
      { id: 2, question: 'LPG 용기의 재검사 대상과 방법을 설명하시오.', answer: '대상: 제조 후 5년 경과 용기 / 방법: 외관검사, 두께측정, 수압시험', prompt: '가스산업기사 실기 문제입니다.\n\n문제: LPG 용기의 재검사 대상과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재검사 주기\n2. 재검사 신청 절차\n3. 검사 항목 (외관, 두께, 수압)\n4. 합격 기준\n5. 불합격 시 조치\n\n고압가스안전관리법을 근거로 작성하세요.' },
      { id: 3, question: '도시가스 사용시설의 정기검사 기준을 설명하시오.', answer: '검사주기: 2년 / 검사항목: 배관누출, 연소기, 환기, 가스계량기, 중간밸브', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 도시가스 사용시설의 정기검사 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사 주기\n2. 검사 대상 시설\n3. 검사 항목별 기준\n4. 불합격 시 조치\n5. 검사 기록 보관\n\n도시가스사업법을 근거로 작성하세요.' },
    ]
  },
  {
    id: 'practical-skills',
    name: '실무 기술',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '가스배관 용접 후 비파괴검사 방법을 선정하시오. (재료: 탄소강, 두께: 10mm, 맞대기용접)', answer: '방사선투과시험(RT) 또는 초음파탐상시험(UT) 적용', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 가스배관 용접부의 비파괴검사 방법을 선정하시오.\n조건: 탄소강, 두께 10mm, 맞대기용접\n\n다음 순서로 설명해주세요:\n1. 적용 가능한 비파괴검사 방법\n2. RT와 UT 장단점 비교\n3. 검사 방법 선정 이유\n4. 검사 절차\n5. 합격 기준\n\n실제 현장 적용 관점에서 설명하세요.' },
      { id: 2, question: '가스배관 기밀시험 절차를 작성하시오. (시험압력: 1.5MPa, 공기 사용)', answer: '1)배관 가압 2)압력유지 3)비눗물 도포 4)압력강하 측정 5)합격판정', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 가스배관 기밀시험 절차를 작성하시오.\n조건: 시험압력 1.5MPa, 공기 사용\n\n다음 순서로 설명해주세요:\n1. 시험 전 준비사항\n2. 가압 방법 및 속도\n3. 압력유지 시간\n4. 누설 검사 방법\n5. 합격 기준\n\n안전상 주의사항도 포함하세요.' },
      { id: 3, question: '가스검지기의 교정(Calibration) 절차를 설명하시오.', answer: '1)Zero 가스 투입 → Zero 조정 2)Span 가스 투입 → Span 조정 3)검증', prompt: '가스산업기사 실기 문제입니다.\n\n문제: 가스검지기의 교정 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교정용 가스 준비 (Zero, Span)\n2. Zero 교정 방법\n3. Span 교정 방법\n4. 교정 검증\n5. 교정 주기 및 기록\n\n실제 작업처럼 단계별로 상세히 설명하세요.' },
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-technician-practical-progress');
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
    localStorage.setItem('gas-technician-practical-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/gas-technician" className="text-gray-600 hover:text-red-600">가스산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔧</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스산업기사 실기시험 - 가스설비 실무 (필답형)</p>
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
