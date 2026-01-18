'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'safety-org',
    name: '안전관리 조직',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '안전관리자의 선임 기준을 설명하시오.', answer: '상시근로자 50인 이상 사업장, 업종별 기준 상이, 안전관리 전문기관 위탁 가능', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전관리자의 선임 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상 사업장\n2. 업종별 선임 기준\n3. 안전관리자 자격요건\n4. 전문기관 위탁 조건\n5. 미선임시 벌칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전보건관리책임자의 역할을 설명하시오.', answer: '산업재해 예방계획 수립, 안전보건관리규정 작성, 근로자 안전보건교육', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전보건관리책임자의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 주요 직무\n3. 권한과 책임\n4. 총괄안전보건책임자와 차이\n5. 법적 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '산업안전보건위원회의 구성과 운영을 설명하시오.', answer: '노사 동수 구성(각 9인 이내), 분기 1회 이상 정기회의', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 산업안전보건위원회의 구성과 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 구성 인원\n3. 심의·의결 사항\n4. 회의 운영\n5. 근로자 대표 위촉\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '안전관리 조직의 형태를 비교하시오.', answer: '직계형(line), 참모형(staff), 직계참모형(line & staff)', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전관리 조직의 형태를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 직계형 조직 특징\n2. 참모형 조직 특징\n3. 직계참모형 조직 특징\n4. 각 형태별 장단점\n5. 적합한 사업장 규모\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '명예산업안전감독관 제도를 설명하시오.', answer: '근로자 대표가 추천, 사업장 점검·건의, 3년 임기', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 명예산업안전감독관 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도 목적\n2. 위촉 자격\n3. 임무와 권한\n4. 임기 및 해촉\n5. 보호 규정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-education',
    name: '안전보건교육',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '정기안전보건교육의 시간 기준을 설명하시오.', answer: '사무직: 매분기 3시간, 판매·생산직: 매분기 6시간, 관리감독자: 연 16시간', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 정기안전보건교육의 시간 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사무직 근로자 기준\n2. 판매·생산직 근로자 기준\n3. 관리감독자 기준\n4. 교육 면제 조건\n5. 미실시 시 과태료\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '채용 시 교육과 작업내용 변경 시 교육을 비교하시오.', answer: '채용시: 8시간(일용 1시간), 작업변경: 2시간(일용 1시간)', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 채용 시 교육과 작업내용 변경 시 교육을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 채용 시 교육 시간\n2. 작업변경 시 교육 시간\n3. 일용근로자 특례\n4. 교육 내용\n5. 교육 시기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '특별안전보건교육 대상 작업을 설명하시오.', answer: '고압실내작업, 밀폐공간작업, 방사선작업, 유해위험기계작업 등 38개 작업', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 특별안전보건교육 대상 작업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별교육 목적\n2. 대상 작업 유형\n3. 교육 시간 (16시간+2시간)\n4. 단시간 작업 특례\n5. 교육 실시 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '안전보건교육의 방법과 기법을 설명하시오.', answer: 'OJT, Off-JT, 강의법, 토의법, 시청각교육법, 역할연기법', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전보건교육의 방법과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OJT(현장교육)\n2. Off-JT(집합교육)\n3. 강의법 특징\n4. 토의법 종류\n5. 시청각 교육 장점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안전보건교육의 원칙을 설명하시오.', answer: '동기부여, 반복, 자발적 참여, 개인차 고려, 실습 중심', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전보건교육의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습자 동기부여\n2. 반복학습 원리\n3. 자발적 참여 유도\n4. 개인차 고려\n5. 실습 중심 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-analysis',
    name: '재해조사 및 분석',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '재해발생 형태의 분류를 설명하시오.', answer: '떨어짐, 넘어짐, 깔림·뒤집힘, 부딪힘, 맞음, 끼임, 절단·베임·찔림, 감전, 폭발·파열, 화재, 무리한동작', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 재해발생 형태의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 재해 형태\n2. 화학적 재해 형태\n3. 전기적 재해 형태\n4. 기타 재해 형태\n5. 발생형태별 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '4M 분석기법을 설명하시오.', answer: 'Man(인적요인), Machine(기계), Media(환경), Management(관리)', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 4M 분석기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Man(인적요인) 분석\n2. Machine(기계적요인) 분석\n3. Media(환경적요인) 분석\n4. Management(관리적요인) 분석\n5. 4M 활용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '재해통계지표(도수율, 강도율, 연천인율)를 설명하시오.', answer: '도수율=(재해건수÷연근로시간)×10^6, 강도율=(손실일수÷연근로시간)×10^3, 연천인율=(재해자수÷연평균근로자수)×1000', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 재해통계지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도수율 계산법\n2. 강도율 계산법\n3. 연천인율 계산법\n4. 환산재해율\n5. 각 지표의 의미\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '하인리히의 재해비율(1:29:300)을 설명하시오.', answer: '중상해 1건 : 경상해 29건 : 무상해사고 300건', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 하인리히의 재해비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1:29:300 법칙 의미\n2. 버드의 비율(1:10:30:600)\n3. 아차사고(Near Miss) 관리\n4. 재해예방 시사점\n5. 현장 적용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '재해조사 시 수집해야 할 정보를 설명하시오.', answer: '발생일시·장소, 피해자 정보, 작업내용, 기인물·가해물, 목격자 진술, 현장 사진', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 재해조사 시 수집해야 할 정보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본정보 수집\n2. 피해자 관련 정보\n3. 작업 관련 정보\n4. 현장 증거 수집\n5. 조사보고서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'risk-assessment',
    name: '위험성평가',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '위험성평가의 절차를 설명하시오.', answer: '사전준비 → 유해위험요인 파악 → 위험성 추정 → 위험성 결정 → 위험성 감소대책 수립', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 위험성평가의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전준비 단계\n2. 유해위험요인 파악\n3. 위험성 추정 방법\n4. 위험성 결정 기준\n5. 감소대책 우선순위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'KRAS(한국형 위험성평가) 기법을 설명하시오.', answer: '빈도(Frequency)×강도(Severity)=위험성, 가능성과 중대성 조합 평가', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: KRAS 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KRAS 개요\n2. 빈도(가능성) 평가\n3. 강도(중대성) 평가\n4. 위험성 매트릭스\n5. 허용가능 위험성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험성평가 시 유해위험요인 파악 방법을 설명하시오.', answer: '현장순회, 작업관찰, 안전점검표, 과거재해기록, MSDS, 근로자면담', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 유해위험요인 파악 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현장조사 방법\n2. 문서검토 방법\n3. 근로자 참여\n4. 체크리스트 활용\n5. 위험요인 분류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험성 감소대책의 우선순위를 설명하시오.', answer: '제거 → 대체 → 공학적 대책 → 관리적 대책 → 개인보호구', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 위험성 감소대책의 우선순위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본질적 안전설계(제거)\n2. 대체\n3. 공학적 대책(방호장치)\n4. 관리적 대책(표지, 교육)\n5. 개인보호구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험성평가 실시 시기를 설명하시오.', answer: '최초평가, 수시평가(변경시), 정기평가(연 1회 이상)', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 위험성평가 실시 시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초 위험성평가\n2. 수시 위험성평가 대상\n3. 정기 위험성평가\n4. 상시 위험성평가\n5. 평가결과 보존기간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-inspection',
    name: '안전점검 및 진단',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '안전점검의 종류를 설명하시오.', answer: '정기점검, 수시점검, 특별점검, 자체점검, 합동점검', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전점검의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기점검 특징\n2. 수시점검 특징\n3. 특별점검 시기\n4. 자체점검 방법\n5. 합동점검 구성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전점검표(체크리스트) 작성 원칙을 설명하시오.', answer: '구체적 항목, 예/아니오 판정, 점검주기 명시, 책임자 지정', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전점검표 작성 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검항목 선정\n2. 판정기준 명확화\n3. 점검주기 설정\n4. 책임자 지정\n5. 개선조치 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '안전인증과 자율안전확인신고의 차이를 설명하시오.', answer: '안전인증: 사전심사+정기심사, 자율안전확인: 제조자 자체확인 후 신고', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 안전인증과 자율안전확인신고의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전인증 대상\n2. 자율안전확인 대상\n3. 인증 절차 차이\n4. 표시 방법\n5. 벌칙 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '공정안전보고서(PSM) 제도를 설명하시오.', answer: '유해위험설비 보유 사업장, 심사→확인→이행상태평가, 5년마다 갱신', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 공정안전보고서(PSM) 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PSM 적용 대상\n2. 제출 내용\n3. 심사 절차\n4. 이행상태 평가\n5. 변경관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '유해위험방지계획서 제도를 설명하시오.', answer: '일정규모 이상 건설공사, 착공 전 제출, 심사 후 확인서 발급', prompt: '산업안전기사 안전관리론 문제입니다.\n\n문제: 유해위험방지계획서 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제출 대상\n2. 제출 시기\n3. 포함 내용\n4. 심사 절차\n5. 변경 시 처리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function SafetyManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-safety-management-completed');
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
    localStorage.setItem('industrial-safety-safety-management-completed', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">안전관리론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📋</span>
            <h1 className="text-2xl font-bold text-gray-800">안전관리론 학습하기</h1>
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
