'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'risk-assessment',
    name: '위험성평가',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '위험성평가의 절차를 순서대로 서술하시오.', answer: '사전준비 → 유해위험요인 파악 → 위험성 추정 → 위험성 결정 → 개선대책 수립 → 기록', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 위험성평가의 절차를 순서대로 서술하시오.\n\n다음 순서로 설명해주세요:\n1. 사전준비 단계\n2. 유해위험요인 파악\n3. 위험성 추정\n4. 위험성 결정\n5. 개선대책 수립 및 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '체크리스트법을 이용한 위험성평가 방법을 설명하시오.', answer: '점검표 작성 → 현장 점검 → YES/NO 판단 → 위험요인 도출 → 개선조치', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 체크리스트법을 이용한 위험성평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검표 작성\n2. 현장 점검 실시\n3. YES/NO 판단\n4. 위험요인 도출\n5. 개선조치 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험성 크기를 결정하는 방법을 설명하시오.', answer: '위험성 = 가능성(빈도) × 중대성(강도), 허용 가능 수준 이하로 관리', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 위험성 크기를 결정하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가능성(빈도) 평가\n2. 중대성(강도) 평가\n3. 위험성 계산\n4. 허용 가능 수준 판단\n5. 개선 우선순위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'accident-statistics',
    name: '재해통계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '도수율을 구하는 공식을 쓰고, 의미를 설명하시오.', answer: '도수율 = (재해건수 / 연근로시간수) × 1,000,000 / 100만 시간당 재해 발생 건수', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 도수율을 구하는 공식을 쓰고, 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도수율 정의\n2. 계산 공식\n3. 의미 해석\n4. 활용 방법\n5. 예제 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '강도율을 구하는 공식을 쓰고, 의미를 설명하시오.', answer: '강도율 = (근로손실일수 / 연근로시간수) × 1,000 / 1,000시간당 근로손실일수', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 강도율을 구하는 공식을 쓰고, 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강도율 정의\n2. 계산 공식\n3. 의미 해석\n4. 도수율과 차이\n5. 예제 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '하인리히 재해비율(1:29:300 법칙)을 설명하시오.', answer: '중상 1건, 경상 29건, 무상해사고 300건의 비율로 발생', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 하인리히 재해비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1:29:300 법칙 의미\n2. 중상재해\n3. 경상재해\n4. 무상해사고\n5. 안전관리 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-sign',
    name: '안전보건표지',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '안전보건표지의 색채별 의미를 설명하시오.', answer: '빨강(금지·방화), 노랑(경고·주의), 파랑(지시), 녹색(안내)', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 안전보건표지의 색채별 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빨강색 의미\n2. 노랑색 의미\n3. 파랑색 의미\n4. 녹색 의미\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '금지표지와 경고표지의 형태와 색상을 설명하시오.', answer: '금지표지: 원형, 빨강 테두리+사선 / 경고표지: 정삼각형, 노랑 바탕+검정 테두리', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 금지표지와 경고표지의 형태와 색상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금지표지 형태\n2. 금지표지 색상\n3. 경고표지 형태\n4. 경고표지 색상\n5. 주요 표지 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지시표지와 안내표지의 형태와 색상을 설명하시오.', answer: '지시표지: 원형, 파랑 바탕+흰색 그림 / 안내표지: 사각형, 녹색 바탕+흰색 그림', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 지시표지와 안내표지의 형태와 색상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지시표지 형태\n2. 지시표지 색상\n3. 안내표지 형태\n4. 안내표지 색상\n5. 주요 표지 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-inspection',
    name: '안전점검 및 작업허가',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '밀폐공간 작업 시 사전 확인사항을 설명하시오.', answer: '산소농도 측정(18~23.5%), 유해가스 측정, 환기 실시, 작업허가서 발급', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 밀폐공간 작업 시 사전 확인사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산소농도 측정\n2. 유해가스 측정\n3. 환기 실시\n4. 작업허가서\n5. 감시인 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '고소작업 안전조치사항을 설명하시오.', answer: '안전대 착용, 작업발판 설치, 추락방호망, 개구부 덮개, 작업계획서 작성', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 고소작업 안전조치사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전대 착용\n2. 작업발판 설치\n3. 추락방호망\n4. 개구부 덮개\n5. 작업계획서\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '작업허가서에 포함되어야 할 주요 내용을 설명하시오.', answer: '작업내용, 작업장소, 작업기간, 위험요인, 안전조치사항, 허가자·작업자 서명', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 작업허가서에 포함되어야 할 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업내용·장소·기간\n2. 위험요인\n3. 안전조치사항\n4. 허가자 서명\n5. 작업자 확인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'ppe-emergency',
    name: '보호구 및 응급조치',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '안전모의 종류와 용도를 설명하시오.', answer: 'AE형(비전도성), AB형(전기용), ABE형(복합형)', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 안전모의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AE형 특성\n2. AB형 특성\n3. ABE형 특성\n4. 선정 기준\n5. 착용 및 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '호흡보호구의 선정 기준을 설명하시오.', answer: '유해물질 종류, 농도, 산소농도에 따라 방진·방독·송기·공기호흡기 선정', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 호흡보호구의 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방진마스크\n2. 방독마스크\n3. 송기마스크\n4. 공기호흡기\n5. 선정 순서\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '감전 시 응급조치 방법을 설명하시오.', answer: '전원차단 → 피해자 격리 → 의식확인 → 심폐소생술 → 119 신고', prompt: '산업안전산업기사 실기 문제입니다.\n\n문제: 감전 시 응급조치 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전원차단\n2. 피해자 격리\n3. 의식확인\n4. 심폐소생술\n5. 119 신고 및 이송\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-technician-practical-progress');
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
    localStorage.setItem('industrial-safety-technician-practical-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🦺</span>
            <h1 className="text-2xl font-bold text-gray-800">산업안전 실무 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전산업기사 실기시험 대비</p>
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
