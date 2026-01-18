'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'safety-org',
    name: '안전관리 조직',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '안전관리자의 직무를 설명하시오.', answer: '안전교육, 작업환경관리, 위험성평가, 안전점검, 재해조사', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전관리자의 직무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전교육 실시\n2. 작업환경관리\n3. 위험성평가 수행\n4. 안전점검 실시\n5. 재해조사 및 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전관리 조직의 유형을 설명하시오.', answer: '라인형, 스탭형, 라인-스탭형, 위원회형', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전관리 조직의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라인형 조직\n2. 스탭형 조직\n3. 라인-스탭형 조직\n4. 위원회형 조직\n5. 각 조직의 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '안전보건관리책임자의 직무를 설명하시오.', answer: '안전보건관리규정 작성, 위험성평가 실시, 안전보건교육 계획 수립', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전보건관리책임자의 직무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전보건관리규정 작성\n2. 위험성평가 실시\n3. 안전보건교육 계획\n4. 사업장 순회점검\n5. 개선조치 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '관리감독자의 안전보건 업무를 설명하시오.', answer: '작업 시작 전 안전점검, 근로자 지도·감독, 보호구 착용 확인', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 관리감독자의 안전보건 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업 시작 전 점검\n2. 근로자 지도·감독\n3. 보호구 착용 확인\n4. 위험요인 제거\n5. 응급조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '산업안전보건위원회의 구성과 기능을 설명하시오.', answer: '노사 동수 구성, 근로자 대표 참여, 안전보건에 관한 사항 심의·의결', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 산업안전보건위원회의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성 요건\n2. 노사 동수 원칙\n3. 심의·의결 사항\n4. 회의 개최 주기\n5. 의결의 효력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-education',
    name: '안전교육',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '정기 안전보건교육의 종류와 시간을 설명하시오.', answer: '사무직: 분기 3시간, 판매·서비스직: 분기 3시간, 기타: 분기 6시간', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 정기 안전보건교육의 종류와 시간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사무직 근로자\n2. 판매·서비스직\n3. 기타 근로자\n4. 교육 내용\n5. 교육 시기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '특별안전보건교육 대상 작업을 설명하시오.', answer: '고소작업, 밀폐공간작업, 중량물 취급작업, 크레인 운전작업 등', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 특별안전보건교육 대상 작업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고소작업\n2. 밀폐공간작업\n3. 중량물 취급\n4. 크레인 운전\n5. 교육 시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '채용 시 교육과 작업 내용 변경 시 교육을 설명하시오.', answer: '채용 시: 8시간 이상, 작업내용 변경 시: 2시간 이상', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 채용 시 교육과 작업내용 변경 시 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채용 시 교육 시간\n2. 작업내용 변경 시 교육\n3. 교육 내용\n4. 교육 방법\n5. 교육 기록 보존\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '효과적인 안전교육의 원칙을 설명하시오.', answer: '흥미의 원칙, 반복의 원칙, 동기부여의 원칙, 참가의 원칙', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 효과적인 안전교육의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흥미의 원칙\n2. 반복의 원칙\n3. 동기부여 원칙\n4. 참가의 원칙\n5. 적용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안전교육의 4단계법을 설명하시오.', answer: '준비(Introduction), 제시(Presentation), 적용(Application), 확인(Test)', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전교육의 4단계법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 준비 단계\n2. 제시 단계\n3. 적용 단계\n4. 확인 단계\n5. 각 단계의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-analysis',
    name: '재해조사 및 분석',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '재해의 분류(강도별)를 설명하시오.', answer: '사망재해, 영구전노동불능, 영구일부노동불능, 일시전노동불능', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 재해의 분류(강도별)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사망재해\n2. 영구전노동불능\n3. 영구일부노동불능\n4. 일시전노동불능\n5. 각 분류의 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도수율과 강도율을 설명하시오.', answer: '도수율 = (재해건수/연근로시간수) × 1,000,000, 강도율 = (근로손실일수/연근로시간수) × 1,000', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 도수율과 강도율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도수율 정의\n2. 도수율 계산식\n3. 강도율 정의\n4. 강도율 계산식\n5. 활용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '하인리히 재해 발생 비율(1:29:300 법칙)을 설명하시오.', answer: '중상 1건, 경상 29건, 무상해사고 300건의 비율', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 하인리히 재해 발생 비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1:29:300 법칙 의미\n2. 중상재해\n3. 경상재해\n4. 무상해사고\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '버드(Bird)의 재해 발생 비율을 설명하시오.', answer: '중상 1건, 경상 10건, 물적피해 30건, 무상해사고 600건', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 버드의 재해 발생 비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1:10:30:600 법칙\n2. 하인리히와의 차이\n3. 물적피해 추가\n4. 무상해사고 중요성\n5. 현대적 의의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '재해조사의 순서를 설명하시오.', answer: '현장보존 → 사실확인 → 원인분석 → 대책수립 → 보고서 작성', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 재해조사의 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현장보존\n2. 사실확인\n3. 원인분석\n4. 대책수립\n5. 보고서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-inspection',
    name: '안전점검',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '안전점검의 종류를 설명하시오.', answer: '정기점검, 수시점검, 특별점검, 일상점검', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전점검의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기점검\n2. 수시점검\n3. 특별점검\n4. 일상점검\n5. 각 점검의 시기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전점검표(체크리스트) 작성 요령을 설명하시오.', answer: '점검항목 선정, YES/NO 응답, 위험요인 명시, 개선조치 기록', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전점검표 작성 요령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검항목 선정\n2. 점검 방법\n3. 위험요인 명시\n4. 개선조치 기록\n5. 후속 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '사업장 순회점검의 목적과 방법을 설명하시오.', answer: '위험요인 발견, 안전수칙 준수 확인, 작업환경 개선', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 사업장 순회점검의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 순회점검 목적\n2. 점검 대상\n3. 점검 주기\n4. 점검 방법\n5. 조치사항 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '안전점검 시 주요 확인사항을 설명하시오.', answer: '방호장치 정상작동, 보호구 착용, 정리정돈 상태, 위험물 관리', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전점검 시 주요 확인사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방호장치 확인\n2. 보호구 착용\n3. 정리정돈 상태\n4. 위험물 관리\n5. 작업환경 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안전점검 결과 조치사항을 설명하시오.', answer: '즉시조치 사항, 단기개선 사항, 장기개선 사항 구분 후 실행', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 안전점검 결과 조치사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 즉시조치 사항\n2. 단기개선 사항\n3. 장기개선 사항\n4. 우선순위 결정\n5. 이행 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'risk-assessment',
    name: '위험성평가',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '위험성평가의 절차를 설명하시오.', answer: '사전준비 → 유해위험요인 파악 → 위험성 추정 → 위험성 결정 → 개선대책 수립 → 기록', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 위험성평가의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전준비\n2. 유해위험요인 파악\n3. 위험성 추정\n4. 위험성 결정\n5. 개선대책 수립 및 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험성 크기 결정 방법을 설명하시오.', answer: '위험성 = 빈도(가능성) × 강도(중대성)', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 위험성 크기 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빈도(가능성) 평가\n2. 강도(중대성) 평가\n3. 위험성 계산\n4. 허용 가능 수준\n5. 개선 우선순위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '체크리스트법을 설명하시오.', answer: '사전에 작성된 점검표를 이용한 정성적 위험성평가 기법', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 체크리스트법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체크리스트법 개념\n2. 점검표 작성\n3. 평가 방법\n4. 장단점\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험성평가 실시 시기를 설명하시오.', answer: '최초평가, 정기평가(매년), 수시평가(작업내용 변경 시)', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 위험성평가 실시 시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초평가\n2. 정기평가\n3. 수시평가\n4. 재평가 필요 시점\n5. 평가 주기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험성평가 결과의 활용 방안을 설명하시오.', answer: '개선대책 수립, 안전교육 자료, 작업표준 개정, 안전투자 우선순위', prompt: '산업안전산업기사 안전관리론 문제입니다.\n\n문제: 위험성평가 결과의 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개선대책 수립\n2. 안전교육 자료\n3. 작업표준 개정\n4. 안전투자 계획\n5. 지속적 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function SafetyManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-technician-safety-management-progress');
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
    localStorage.setItem('industrial-safety-technician-safety-management-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/industrial-safety-technician" className="text-gray-600 hover:text-red-600">산업안전산업기사</Link>
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
          <p className="text-gray-600 mb-4">산업안전산업기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
