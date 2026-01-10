'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'ergonomics',
    name: '인간공학 기초',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '인간공학의 정의와 목적을 설명하시오.', answer: '인간-기계-환경 체계의 최적화, 안전성·능률성·쾌적성 향상', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인간공학의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인간공학 정의\n2. 연구 대상\n3. 목적 (안전성)\n4. 목적 (능률성)\n5. 목적 (쾌적성)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인간-기계 체계의 구성요소를 설명하시오.', answer: '입력장치(디스플레이), 인간(정보처리), 출력장치(조종장치), 기계', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인간-기계 체계의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입력장치 (디스플레이)\n2. 인간의 역할\n3. 출력장치 (조종장치)\n4. 기계의 역할\n5. 피드백 루프\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인간의 감각기관 종류를 설명하시오.', answer: '시각, 청각, 촉각, 후각, 미각', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인간의 감각기관 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시각의 특성\n2. 청각의 특성\n3. 촉각의 특성\n4. 후각과 미각\n5. 안전관리 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '피로의 종류와 예방대책을 설명하시오.', answer: '정신적 피로, 육체적 피로, 신경성 피로 / 작업환경 개선, 휴식 부여', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 피로의 종류와 예방대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정신적 피로\n2. 육체적 피로\n3. 신경성 피로\n4. 작업환경 개선\n5. 휴식 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '작업자세와 근골격계질환을 설명하시오.', answer: '부적절한 자세, 반복작업, 과도한 힘 사용이 원인 / 작업대 높이 조절, 보조도구 사용', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 작업자세와 근골격계질환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근골격계질환 정의\n2. 주요 원인\n3. 예방 대책\n4. 작업환경 개선\n5. 보조도구 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'human-error',
    name: '인적 오류',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '인적 오류의 분류를 설명하시오.', answer: '생략(Omission), 실행(Commission), 순서(Sequence), 시간(Timing) 오류', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인적 오류의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생략 오류\n2. 실행 오류\n3. 순서 오류\n4. 시간 오류\n5. 각 오류의 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인적 오류 발생 원인을 설명하시오.', answer: '피로, 부주의, 미숙련, 착각, 망각, 불안전한 행동', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인적 오류 발생 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피로와 스트레스\n2. 부주의\n3. 미숙련\n4. 착각과 망각\n5. 불안전한 행동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인적 오류 예방대책을 설명하시오.', answer: '교육훈련, 작업환경 개선, Fool Proof 설계, 안전장치 설치', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 인적 오류 예방대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육훈련 강화\n2. 작업환경 개선\n3. Fool Proof 설계\n4. 안전장치 설치\n5. 작업표준화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Fool Proof(바보방지)를 설명하시오.', answer: '인간의 실수를 방지하도록 설계하는 방법 (예: 잘못된 조립 불가능한 구조)', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: Fool Proof를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Fool Proof 개념\n2. 설계 원리\n3. 적용 사례\n4. 장점\n5. Fail Safe와 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '주의력과 재해의 관계를 설명하시오.', answer: '주의력 저하 시 재해 증가, 단조작업·야간작업 시 주의력 저하', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 주의력과 재해의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주의력의 종류\n2. 주의력 저하 요인\n3. 재해와의 관계\n4. 단조작업의 영향\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'system-safety',
    name: '시스템안전공학',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '시스템안전의 개념을 설명하시오.', answer: '시스템 설계 단계부터 안전을 고려하여 위험을 최소화하는 기법', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 시스템안전의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템안전 정의\n2. 목적\n3. 적용 시기\n4. 기본 원칙\n5. 전통적 안전과 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전 우선순위를 설명하시오.', answer: '1순위: 본질적 안전설계, 2순위: 안전장치, 3순위: 경고표시, 4순위: 교육훈련', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 안전 우선순위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본질적 안전설계\n2. 안전장치 설치\n3. 경고표시\n4. 교육훈련\n5. 각 단계의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'FTA(Fault Tree Analysis)를 설명하시오.', answer: '정상사건(재해)으로부터 원인을 추적하는 하향식 연역적 분석기법', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: FTA를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FTA 개념\n2. 분석 방법\n3. 논리 기호 (AND, OR)\n4. 장단점\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'FMEA(Failure Mode and Effect Analysis)를 설명하시오.', answer: '각 부품의 고장모드와 영향을 분석하는 귀납적 기법', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: FMEA를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FMEA 개념\n2. 분석 절차\n3. 고장모드 파악\n4. 영향 분석\n5. 대책 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '신뢰도의 개념을 설명하시오.', answer: '일정 조건에서 규정된 시간 동안 고장 없이 작동할 확률', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 신뢰도의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도 정의\n2. 신뢰도 계산\n3. 직렬시스템\n4. 병렬시스템\n5. 신뢰도 향상 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'work-environment',
    name: '작업환경',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '조명의 3요소를 설명하시오.', answer: '조도(밝기), 휘도(광원의 밝기), 광도(광원의 빛의 세기)', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 조명의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조도의 개념\n2. 휘도의 개념\n3. 광도의 개념\n4. 단위\n5. 적정 조도 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소음의 영향과 대책을 설명하시오.', answer: '청력손실, 생리적 영향, 심리적 영향 / 차음, 흡음, 격리, 보호구', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 소음의 영향과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청력손실\n2. 생리적 영향\n3. 심리적 영향\n4. 소음 저감 대책\n5. 보호구 착용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '온열환경과 쾌적 조건을 설명하시오.', answer: '기온, 습도, 기류, 복사열 / 쾌적온도 18~20℃, 습도 40~70%', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 온열환경과 쾌적 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온열환경 4요소\n2. 쾌적 온도\n3. 쾌적 습도\n4. 기류의 영향\n5. 개선 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '색채의 심리적 효과를 설명하시오.', answer: '빨강(경고), 주황(주의), 노랑(주의), 파랑(안전), 녹색(안전)', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 색채의 심리적 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 난색계 효과\n2. 한색계 효과\n3. 안전색채 규정\n4. 작업장 색채 활용\n5. 식별성 향상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '환기의 종류와 방법을 설명하시오.', answer: '자연환기, 강제환기 / 전체환기, 국소환기', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 환기의 종류와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연환기\n2. 강제환기\n3. 전체환기\n4. 국소환기\n5. 환기량 결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'display-control',
    name: '표시장치 및 조종장치',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '표시장치(디스플레이)의 종류를 설명하시오.', answer: '시각 표시장치, 청각 표시장치, 촉각 표시장치', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 표시장치의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시각 표시장치\n2. 청각 표시장치\n3. 촉각 표시장치\n4. 각 장치의 특성\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '계기판 배치의 원칙을 설명하시오.', answer: '중요도, 사용빈도, 기능별 분류, 사용순서에 따라 배치', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 계기판 배치의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중요도 원칙\n2. 사용빈도 원칙\n3. 기능별 분류\n4. 사용순서 고려\n5. 시야 범위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '조종장치(컨트롤)의 종류를 설명하시오.', answer: '손조작: 버튼, 스위치, 레버, 핸들 / 발조작: 페달', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 조종장치의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 버튼형\n2. 스위치형\n3. 레버형\n4. 핸들형\n5. 페달형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '조종장치 설계의 기본원칙을 설명하시오.', answer: '식별성, 호환성, 피드백, 적절한 크기와 간격', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 조종장치 설계의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 식별성 확보\n2. 호환성 고려\n3. 피드백 제공\n4. 크기 적정화\n5. 간격 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '호환성의 종류를 설명하시오.', answer: '공간적 호환성, 운동 호환성, 개념적 호환성, 양식 호환성', prompt: '산업안전산업기사 인간공학 및 시스템안전공학 문제입니다.\n\n문제: 호환성의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공간적 호환성\n2. 운동 호환성\n3. 개념적 호환성\n4. 양식 호환성\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HumanFactorsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-technician-human-factors-progress');
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
    localStorage.setItem('industrial-safety-technician-human-factors-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">인간공학 및 시스템안전공학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold text-gray-800">인간공학 및 시스템안전공학 학습하기</h1>
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
