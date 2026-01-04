'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'safety-devices',
    name: '안전장치',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '과압방지장치의 종류를 설명하시오.', answer: '안전밸브, 파열판, 용해전(fusible plug)', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 과압방지장치의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전밸브 작동원리\n2. 파열판 특성\n3. 용해전 구조\n4. 적용 대상\n5. 설정압력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '역화방지기의 원리와 종류를 설명하시오.', answer: '건식(소결금속), 습식(수봉), 역화 시 화염 차단', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 역화방지기의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역화 발생 원인\n2. 건식 역화방지기\n3. 습식 역화방지기\n4. 소화 메커니즘\n5. 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '압력방출장치(PRD)의 종류를 설명하시오.', answer: '스프링식 안전밸브, 파열판, 조합형(안전밸브+파열판)', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 압력방출장치의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스프링식 PRD\n2. 파열판식 PRD\n3. 조합형 PRD\n4. 작동압력 기준\n5. 방출관 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '긴급차단장치의 작동조건을 설명하시오.', answer: '화재감지, 가스누출검지, 압력이상, 지진감지, 수동조작', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 긴급차단장치의 작동조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재감지 연동\n2. 가스누출 검지 연동\n3. 압력이상 감지\n4. 지진감지 연동\n5. 수동 긴급차단\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '화염방지기(Flame Arrester)의 원리를 설명하시오.', answer: '소화층 효과로 화염전파 차단, 좁은 틈새로 열손실', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 화염방지기의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화층 효과\n2. 최대실험안전틈새(MESG)\n3. 구조 (소결금속, 금속망)\n4. 설치 위치\n5. 점검 및 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'leak-detection',
    name: '가스누출 검지',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '가스검지기의 종류를 설명하시오.', answer: '접촉연소식(가연성), 반도체식, 전기화학식(독성), 열선형(광섬유)', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스검지기의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접촉연소식 원리\n2. 반도체식 원리\n3. 전기화학식 원리\n4. 열선형 원리\n5. 가스별 적합한 방식\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스경보기의 설치 기준을 설명하시오.', answer: '비중<1: 천장 부근, 비중>1: 바닥 부근 / 경보농도: LEL의 1/4 이하', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스경보기의 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 높이 (비중별)\n2. 경보농도 설정\n3. 설치 개수 산정\n4. 커버 범위\n5. 연동 설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스누출 시 경보 단계를 설명하시오.', answer: '1차 경보(LEL 25%), 2차 경보(LEL 50%), 긴급차단·환기 작동', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스누출 시 경보 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1차 경보 농도\n2. 2차 경보 농도\n3. 경보음 차이\n4. 연동 조치\n5. 긴급대응 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스누출 감지 방법을 설명하시오.', answer: '비눗물법, 검지액법, 휴대용검지기, 고정식검지기', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스누출 감지 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비눗물 도포법\n2. 검지액 도포법\n3. 휴대용 검지기\n4. 고정식 검지기\n5. 검지 민감도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스검지기의 교정 및 유지관리를 설명하시오.', answer: '표준가스로 정기 교정, 센서 수명 관리, 작동시험(월 1회)', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스검지기의 교정 및 유지관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교정용 표준가스\n2. 교정 주기\n3. 센서 수명\n4. 작동시험 방법\n5. 기록 보관\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-prevention',
    name: '가스사고 예방',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '가스사고의 주요 원인을 설명하시오.', answer: '설비결함, 부식·노후화, 시공불량, 운전오류, 안전관리 소홀', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스사고의 주요 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비 결함\n2. 부식 및 노후화\n3. 시공 불량\n4. 인적 오류\n5. 관리적 요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스설비 안전점검 항목을 설명하시오.', answer: '배관·밸브 누출, 압력·온도 이상, 안전장치 작동, 부식·손상, 환기상태', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스설비 안전점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 누출 점검\n2. 압력·온도 점검\n3. 안전장치 점검\n4. 부식·손상 점검\n5. 환기 점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스 저장탱크의 안전거리를 설명하시오.', answer: '제1종 보호시설(학교·병원): 30m 이상, 제2종(주택): 15m 이상, 담·제방: 5m 이상', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스 저장탱크의 안전거리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1종 보호시설 기준\n2. 제2종 보호시설 기준\n3. 담·제방 기준\n4. 탱크 상호 간 거리\n5. 안전거리 완화 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '정전기 재해 방지대책을 설명하시오.', answer: '접지(Grounding), 본딩(Bonding), 가습, 대전방지제, 제전기', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 정전기 재해 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 (접지저항 100Ω 이하)\n2. 본딩 (등전위화)\n3. 가습 (습도 70% 이상)\n4. 대전방지제 첨가\n5. 제전기 사용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '밀폐공간 가스작업 시 안전대책을 설명하시오.', answer: '산소농도 측정(18~23%), 환기, 가스농도 확인, 안전교육, 감시인 배치', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 밀폐공간 가스작업 시 안전대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산소농도 측정\n2. 강제환기\n3. 유해가스 측정\n4. 출입허가서 작성\n5. 감시인 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emergency-response',
    name: '비상대응',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '가스누출 시 초동조치를 설명하시오.', answer: '1)화기제거 2)밸브차단 3)환기 4)대피 5)신고', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스누출 시 초동조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화기 제거 (전기스위치 금지)\n2. 공급 차단 (밸브)\n3. 환기 실시\n4. 대피 유도\n5. 119·가스회사 신고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스화재 진압 방법을 설명하시오.', answer: '1순위: 공급차단, 2순위: 냉각(주수), 3순위: 질식소화, 재착화 방지', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스화재 진압 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급 차단\n2. 냉각 주수\n3. 질식 소화\n4. 잔화 처리\n5. 재착화 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스사고 시 비상연락체계를 설명하시오.', answer: '발견자 → 관리책임자 → 119·가스회사·관할관청 → 비상대응팀 출동', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스사고 시 비상연락체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발견 및 통보\n2. 관리책임자 판단\n3. 외부 신고 (119 등)\n4. 비상대응팀 소집\n5. 유관기관 협조\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스중독 시 응급조치를 설명하시오.', answer: '신선한 공기, 안정, 인공호흡, 산소투여, 병원 후송', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스중독 시 응급조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신선한 공기로 대피\n2. 안정 자세\n3. 인공호흡 (필요시)\n4. 산소 투여\n5. 병원 후송\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스사고 조사 절차를 설명하시오.', answer: '현장보존 → 사고조사(4M) → 원인분석 → 재발방지대책 → 보고서 작성', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스사고 조사 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현장 보존\n2. 사고조사 (증거수집)\n3. 원인분석 (4M)\n4. 재발방지대책\n5. 보고서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'gas-laws',
    name: '가스 관련 법규',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '고압가스안전관리법의 목적을 설명하시오.', answer: '고압가스의 제조·저장·판매·운반·사용 안전관리로 공공안전 확보', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 고압가스안전관리법의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 적용 대상 가스\n3. 규제 대상 행위\n4. 주무관청\n5. 벌칙 규정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '고압가스 제조 허가 기준을 설명하시오.', answer: '기술능력, 시설·설비 기준, 안전관리자 선임, 정기검사', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 고압가스 제조 허가 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 대상 (1톤 이상)\n2. 기술능력 요건\n3. 시설 기준\n4. 안전관리자 자격\n5. 완공검사 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도시가스사업법의 주요 내용을 설명하시오.', answer: '도시가스사업 면허, 공급규정, 안전관리규정, 사용시설 검사', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 도시가스사업법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업 면허\n2. 공급규정 승인\n3. 안전관리규정\n4. 사용시설 검사\n5. 요금 규제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'LPG 용기 검사 종류를 설명하시오.', answer: '제조검사(신품), 재검사(5년), 중간검사(외관), 폐기검사', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: LPG 용기 검사 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조검사 내용\n2. 재검사 주기와 방법\n3. 중간검사 조건\n4. 폐기검사 기준\n5. 검사 표시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스안전관리자의 선임 기준을 설명하시오.', answer: '제조·저장 시설: 기사 이상, 판매·충전: 산업기사 이상, 1개월 내 선임', prompt: '가스산업기사 가스안전관리 문제입니다.\n\n문제: 가스안전관리자의 선임 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자격 요건\n2. 선임 대상 시설\n3. 선임 인원 기준\n4. 선임 시기\n5. 직무와 권한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GasSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-technician-gas-safety-progress');
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
    localStorage.setItem('gas-technician-gas-safety-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">가스안전관리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🛡️</span>
            <h1 className="text-2xl font-bold text-gray-800">가스안전관리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스산업기사 필기시험 핵심 과목</p>
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
