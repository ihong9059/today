'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'risk-assessment',
    name: '위험성평가 실무',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '위험성평가표를 작성하시오. (작업: 지게차 운반작업)', answer: '유해위험요인→충돌/협착/전도, 위험성→빈도×강도, 감소대책→통로확보/신호수/안전교육', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 지게차 운반작업에 대한 위험성평가표를 작성하시오.\n\n다음 순서로 작성해주세요:\n1. 작업내용 분석\n2. 유해위험요인 파악 (3가지 이상)\n3. 현재 안전조치\n4. 위험성 추정 (빈도×강도)\n5. 위험성 감소대책\n\n표 형식으로 작성하고 비슷한 문제 2개도 만들어주세요.' },
      { id: 2, question: '체크리스트 방식 위험성평가를 작성하시오. (프레스 작업)', answer: '점검항목: 방호장치 정상작동, 양수조작식 설치, 금형 고정상태 등', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 프레스 작업에 대한 체크리스트 방식 위험성평가를 작성하시오.\n\n다음 순서로 작성해주세요:\n1. 점검 항목 10개 이상\n2. 점검 기준 (O/X 또는 점수)\n3. 위험등급 판정\n4. 미흡 시 조치사항\n5. 점검 주기\n\n비슷한 문제 2개도 만들어주세요.' },
      { id: 3, question: 'KRAS 기법으로 위험성을 평가하시오.', answer: '가능성(빈도): 1~5, 중대성(강도): 1~5, 위험성=가능성×중대성', prompt: '산업안전기사 실기 문제입니다.\n\n문제: KRAS 기법을 사용하여 위험성을 평가하시오.\n\n다음 순서로 설명해주세요:\n1. KRAS 평가 절차\n2. 가능성(빈도) 등급표\n3. 중대성(강도) 등급표\n4. 위험성 결정 매트릭스\n5. 허용가능 위험성 기준\n\n실제 작업 사례를 들어 평가해주세요.' },
      { id: 4, question: '위험성 감소대책의 우선순위를 적용하시오.', answer: '제거→대체→공학적대책→관리적대책→개인보호구', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 밀폐공간 작업의 위험성 감소대책을 우선순위에 따라 수립하시오.\n\n다음 순서로 설명해주세요:\n1. 제거 방안\n2. 대체 방안\n3. 공학적 대책\n4. 관리적 대책\n5. 개인보호구\n\n각 대책별 구체적 예시를 포함해주세요.' },
      { id: 5, question: '위험성평가 결과를 문서화하시오.', answer: '평가 일시, 참여자, 대상작업, 유해위험요인, 위험성, 감소대책, 이행확인', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 위험성평가 결과 보고서를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 평가 개요 (일시, 장소, 참여자)\n2. 대상 작업/공정\n3. 위험성평가 결과표\n4. 감소대책 및 일정\n5. 이행확인 계획\n\n양식 예시를 포함해주세요.' }
    ]
  },
  {
    id: 'accident-analysis',
    name: '재해조사 및 분석',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '4M 기법으로 재해 원인을 분석하시오.', answer: 'Man(인적), Machine(기계적), Media(환경적), Management(관리적) 요인 분석', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 다음 재해사례를 4M 기법으로 분석하시오.\n\n재해사례: 작업자가 프레스 금형 교체 중 기계가 갑자기 작동하여 손가락이 절단됨\n\n다음 순서로 분석해주세요:\n1. Man(인적요인)\n2. Machine(기계적요인)\n3. Media(환경적요인)\n4. Management(관리적요인)\n5. 재발방지대책\n\n비슷한 유형의 사례 분석 2개도 만들어주세요.' },
      { id: 2, question: '재해조사 보고서를 작성하시오.', answer: '재해 개요, 피해 현황, 발생경위, 원인분석, 동종재해 예방대책', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 추락재해 조사 보고서를 작성하시오.\n\n재해사례: 비계 작업 중 안전대 미착용으로 추락\n\n다음 항목을 포함해주세요:\n1. 재해 개요\n2. 피해 현황\n3. 발생 경위\n4. 원인 분석 (직접/간접)\n5. 동종재해 예방대책\n\n보고서 양식을 포함해주세요.' },
      { id: 3, question: '도수율, 강도율, 연천인율을 계산하시오.', answer: '도수율=(재해건수÷연근로시간)×10^6, 강도율=(손실일수÷연근로시간)×10^3', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 다음 자료를 바탕으로 재해통계를 계산하시오.\n\n자료:\n- 연평균 근로자수: 500명\n- 연간 재해건수: 10건\n- 연간 총근로시간: 1,000,000시간\n- 총손실일수: 500일\n\n다음을 계산해주세요:\n1. 도수율\n2. 강도율\n3. 연천인율\n4. 평균손실일수\n5. 해석 및 개선방향' },
      { id: 4, question: '재해발생형태를 분류하시오.', answer: '떨어짐, 넘어짐, 깔림, 부딪힘, 맞음, 끼임, 절단, 감전, 폭발, 화재 등', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 재해발생형태별 주요 원인과 대책을 설명하시오.\n\n다음 형태별로 분석해주세요:\n1. 떨어짐 (추락)\n2. 끼임 (협착)\n3. 감전\n4. 화재/폭발\n5. 질식\n\n각 형태별 원인 3가지와 대책 3가지를 포함해주세요.' },
      { id: 5, question: '아차사고(Near Miss) 보고서를 작성하시오.', answer: '발생상황, 잠재위험, 원인분석, 개선대책, 유사상황 예방', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 아차사고(Near Miss) 보고서를 작성하시오.\n\n사례: 지게차 이동 중 후진 시 작업자와 충돌할 뻔함\n\n다음 항목을 포함해주세요:\n1. 발생 상황\n2. 잠재 위험\n3. 원인 분석\n4. 개선 대책\n5. 유사상황 예방책\n\n양식 예시를 포함해주세요.' }
    ]
  },
  {
    id: 'safety-inspection',
    name: '안전점검 실무',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '안전점검표를 작성하시오. (대상: 용접작업)', answer: '용접기 접지, 가스누출, 인화물질 제거, 소화기 비치, 보호구 착용', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 용접작업 안전점검표를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 점검 항목 15개 이상\n2. 점검 기준\n3. 점검 방법\n4. 점검 주기\n5. 부적합 시 조치사항\n\n표 형식으로 작성해주세요.' },
      { id: 2, question: '작업허가서(PTW)를 작성하시오.', answer: '작업내용, 위험요인, 안전조치, 허가권자 서명, 작업완료 확인', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 화기작업 허가서를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 작업 개요\n2. 위험요인 및 안전조치\n3. 안전장비/보호구\n4. 작업 전 확인사항\n5. 허가/승인 절차\n\n허가서 양식을 포함해주세요.' },
      { id: 3, question: 'LOTO(잠금/표지) 절차서를 작성하시오.', answer: '에너지차단→잠금장치→표지부착→잔류에너지방출→확인→작업→해제', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 기계정비작업 LOTO 절차서를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 에너지원 확인\n2. 차단 순서\n3. 잠금장치 설치\n4. 표지 부착\n5. 확인 및 해제 절차\n\n절차서 양식을 포함해주세요.' },
      { id: 4, question: '밀폐공간 작업계획서를 작성하시오.', answer: '산소농도측정, 환기, 감시인배치, 구조장비, 보호구착용', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 맨홀 작업을 위한 밀폐공간 작업계획서를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 작업 개요\n2. 유해가스 측정 계획\n3. 환기 계획\n4. 감시인 배치\n5. 비상대응 계획\n\n계획서 양식을 포함해주세요.' },
      { id: 5, question: '안전보건표지의 의미를 설명하시오.', answer: '금지(빨강), 경고(노랑), 지시(파랑), 안내(녹색) 표지 구분', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 안전보건표지의 종류와 의미를 설명하시오.\n\n다음 표지를 설명해주세요:\n1. 금지표지 5종\n2. 경고표지 5종\n3. 지시표지 5종\n4. 안내표지 5종\n5. 표지 설치 기준\n\n각 표지의 형태, 색상, 의미를 포함해주세요.' }
    ]
  },
  {
    id: 'ppe-management',
    name: '보호구 관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '보호구 선정 기준을 설명하시오.', answer: '위험요인 파악→보호구 종류 선정→규격 선정→적합성 확인', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 작업별 보호구 선정 기준을 설명하시오.\n\n다음 작업에 대해 설명해주세요:\n1. 분진작업 - 호흡용 보호구\n2. 소음작업 - 청력보호구\n3. 화학물질 취급 - 보호복/장갑\n4. 용접작업 - 눈/얼굴 보호구\n5. 고소작업 - 안전대\n\n선정 시 고려사항을 포함해주세요.' },
      { id: 2, question: '방독마스크 선정 및 관리를 설명하시오.', answer: '가스종류별 정화통 선정, 파과시간 확인, 보관/교체 기준', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 방독마스크 선정 및 관리 기준을 설명하시오.\n\n다음 항목을 포함해주세요:\n1. 가스별 정화통 종류\n2. 정화통 색상 구분\n3. 파과시간 계산\n4. 교체 기준\n5. 보관 방법\n\n주요 가스별 정화통 예시를 포함해주세요.' },
      { id: 3, question: '안전대의 점검 및 관리를 설명하시오.', answer: '벨트/로프 상태, 훅/카라비너 기능, 스트랩 마모, 정기점검', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 안전대 점검 및 관리 기준을 설명하시오.\n\n다음 항목을 포함해주세요:\n1. 일상점검 항목\n2. 정기점검 항목\n3. 사용금지 기준\n4. 보관 방법\n5. 교체 주기\n\n점검표 양식을 포함해주세요.' },
      { id: 4, question: '절연용 보호구 점검 기준을 설명하시오.', answer: '절연장갑/화, 절연봉, 내전압시험, 사용 전 점검', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 절연용 보호구 점검 및 관리 기준을 설명하시오.\n\n다음 항목을 포함해주세요:\n1. 절연장갑 등급별 기준\n2. 내전압시험 주기\n3. 사용 전 점검 방법\n4. 보관 조건\n5. 사용금지 기준\n\n등급별 허용전압을 포함해주세요.' },
      { id: 5, question: '보호구 지급/착용 기록을 관리하시오.', answer: '지급일자, 지급자/수령자, 보호구 종류/규격, 점검결과', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 보호구 지급 및 착용 기록 관리 방법을 설명하시오.\n\n다음 항목을 포함해주세요:\n1. 지급대장 작성\n2. 착용상태 점검\n3. 교체/폐기 기록\n4. 교육 기록\n5. 법적 보존기간\n\n관리대장 양식을 포함해주세요.' }
    ]
  },
  {
    id: 'emergency-response',
    name: '비상대응',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '비상대피계획을 수립하시오.', answer: '비상사태 유형, 대피경로, 집결지, 비상연락망, 훈련계획', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 사업장 비상대피계획을 수립하시오.\n\n다음 항목을 포함해주세요:\n1. 비상사태 유형\n2. 대피경로 및 집결지\n3. 비상연락망\n4. 역할 분담\n5. 훈련 계획\n\n대피계획도 예시를 포함해주세요.' },
      { id: 2, question: '응급처치 절차를 작성하시오.', answer: '현장안전확보→의식확인→119신고→CPR→AED→병원이송', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 감전사고 응급처치 절차를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 현장 안전 확보\n2. 전원 차단\n3. 의식/호흡 확인\n4. 심폐소생술\n5. 후송 조치\n\n절차 흐름도를 포함해주세요.' },
      { id: 3, question: '화재 대응 절차를 작성하시오.', answer: '발견→경보→초기진화→대피→신고→소화활동', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 사업장 화재 대응 절차를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 화재 발견 시 조치\n2. 경보 발령\n3. 초기 진화\n4. 대피 유도\n5. 소방서 신고\n\n역할별 행동요령을 포함해주세요.' },
      { id: 4, question: '화학물질 누출 대응계획을 수립하시오.', answer: '누출확인→대피→차단→방제→제독→복구', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 화학물질 누출 비상대응계획을 수립하시오.\n\n다음 항목을 포함해주세요:\n1. 누출 감지/확인\n2. 대피 범위\n3. 누출 차단\n4. 방제 조치\n5. 복구 절차\n\nMSDS 활용 방법을 포함해주세요.' },
      { id: 5, question: '비상훈련 결과보고서를 작성하시오.', answer: '훈련일시, 참가자, 시나리오, 진행과정, 문제점, 개선사항', prompt: '산업안전기사 실기 문제입니다.\n\n문제: 비상대응훈련 결과보고서를 작성하시오.\n\n다음 항목을 포함해주세요:\n1. 훈련 개요\n2. 훈련 시나리오\n3. 진행 과정\n4. 평가 결과\n5. 개선 사항\n\n보고서 양식을 포함해주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-practical-completed');
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
    localStorage.setItem('industrial-safety-practical-completed', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🦺</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전기사 실기시험 필답형 대비</p>
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
