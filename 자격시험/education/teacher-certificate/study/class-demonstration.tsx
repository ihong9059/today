'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'preparation',
    name: '수업실연 준비',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '수업 지도안 작성법을 설명하시오.', answer: '학습목표, 단계별 활동, 평가', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 효과적인 수업 지도안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습목표 설정 (SMART 원칙)\n2. 도입-전개-정리 단계 구성\n3. 교수학습 활동 상세 기술\n4. 평가 계획 (형성평가)\n5. 시간 배분과 유의점\n\n15분 수업 지도안 예시를 작성해주세요.' },
      { id: 2, question: '수업 도입 기법을 설명하시오.', answer: '동기유발, 선수학습 확인, 학습목표 제시', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 효과적인 수업 도입 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동기유발의 중요성과 방법\n2. 선수학습 확인 전략\n3. 학습목표 제시 방법\n4. 학습 분위기 조성\n5. 도입 단계 시간 관리 (2-3분)\n\n구체적인 도입 스크립트 예시를 만들어주세요.' },
      { id: 3, question: '발문 기법을 설명하시오.', answer: '개방형 질문, 사고촉진, 추가질문', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 효과적인 발문 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발문의 종류 (사실적, 추론적, 평가적)\n2. 개방형 질문과 폐쇄형 질문\n3. 사고를 촉진하는 질문 기법\n4. 추가 질문과 재질문\n5. 기다리기(Wait Time)의 중요성\n\n5가지 효과적인 발문 예시를 만들어주세요.' }
    ]
  },
  {
    id: 'teaching',
    name: '수업 진행',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '교사의 언어적 표현을 설명하시오.', answer: '명료성, 적절한 속도, 강조', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 수업 중 교사의 언어적 표현 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명료하고 정확한 설명\n2. 적절한 속도와 크기\n3. 중요한 내용 강조 (억양, 반복)\n4. 학생 수준에 맞는 어휘 사용\n5. 긍정적이고 격려하는 언어\n\n수업 장면별 언어 표현 예시를 만들어주세요.' },
      { id: 2, question: '교사의 비언어적 표현을 설명하시오.', answer: '시선, 제스처, 동선, 표정', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 수업 중 교사의 비언어적 표현 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아이컨택(eye contact)의 활용\n2. 적절한 제스처와 손동작\n3. 교실 내 동선 활용\n4. 표정과 미소의 중요성\n5. 판서와 시각자료 활용\n\n효과적인 비언어적 표현 팁을 제시해주세요.' },
      { id: 3, question: '학생 활동 지도 방법을 설명하시오.', answer: '명확한 지시, 순회 관찰, 피드백', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 학생 활동 지도 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 활동 목적과 방법 명확히 안내\n2. 순회하며 학생 활동 관찰\n3. 개별/모둠별 즉각적 피드백\n4. 어려움 겪는 학생 지원\n5. 활동 후 정리 및 공유\n\n모둠활동 지도 시나리오를 작성해주세요.' }
    ]
  },
  {
    id: 'methods',
    name: '교수방법',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '강의법의 효과적 활용을 설명하시오.', answer: '명확한 설명, 예시, 시각자료', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 강의법의 효과적 활용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강의법의 장단점\n2. 명확하고 체계적인 설명\n3. 구체적 예시와 비유 활용\n4. 시각자료(PPT, 판서) 활용\n5. 학생 참여 유도 (질문, 확인)\n\n5분 강의 시나리오를 작성해주세요.' },
      { id: 2, question: '토의·토론 수업 진행법을 설명하시오.', answer: '주제 제시, 규칙 안내, 촉진', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 토의·토론 수업 진행법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토의 주제 및 질문 제시\n2. 토의·토론 규칙 안내\n3. 모둠 구성 및 역할 분담\n4. 교사의 촉진자 역할\n5. 정리 및 의견 공유\n\n10분 토의 수업 시나리오를 작성해주세요.' },
      { id: 3, question: '협력학습 지도법을 설명하시오.', answer: '긍정적 상호의존, 개인 책무성', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 협력학습 지도법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력학습의 5가지 요소\n2. 모둠 구성 (이질 집단)\n3. 역할 분담과 과제 부여\n4. 긍정적 상호의존성 강화\n5. 개인 책무성 확인\n\nJigsaw 모형 수업 예시를 만들어주세요.' }
    ]
  },
  {
    id: 'materials',
    name: '교수자료 활용',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '판서 기법을 설명하시오.', answer: '구조화, 가독성, 강조', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 효과적인 판서 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판서의 구조화 (제목, 핵심 내용)\n2. 가독성 (글씨 크기, 정돈)\n3. 색분필 활용 (강조, 구분)\n4. 학생과 대화하며 판서\n5. 판서 시간 최소화\n\n수업 주제별 판서 계획안을 작성해주세요.' },
      { id: 2, question: 'PPT 활용법을 설명하시오.', answer: '간결성, 시각적 효과, 적절한 양', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: PPT 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간결한 내용 구성 (핵심만)\n2. 시각적 효과 (이미지, 도표)\n3. 적절한 분량 (슬라이드 수)\n4. 애니메이션 절제\n5. PPT에 의존하지 않기\n\n15분 수업용 PPT 구성안을 만들어주세요.' },
      { id: 3, question: '교구 및 실물자료 활용을 설명하시오.', answer: '구체물, 조작활동, 실생활 연계', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 교구 및 실물자료 활용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구체물을 통한 이해 촉진\n2. 학생 조작활동 유도\n3. 실생활 사례 연계\n4. 자료 제시 타이밍\n5. 자료 활용 후 정리\n\n과목별 교구 활용 예시를 제시해주세요.' }
    ]
  },
  {
    id: 'evaluation',
    name: '수업 평가 및 마무리',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '형성평가 방법을 설명하시오.', answer: '즉각 피드백, 이해도 확인, 보충', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 수업 중 형성평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성평가의 목적과 시기\n2. 구두 질문을 통한 확인\n3. 간단한 퀴즈나 문제 풀이\n4. 즉각적 피드백 제공\n5. 미흡한 부분 보충 설명\n\n수업 중 형성평가 예시를 만들어주세요.' },
      { id: 2, question: '수업 정리 방법을 설명하시오.', answer: '요약, 차시예고, 과제 안내', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 효과적인 수업 정리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습 내용 요약 (학생 참여)\n2. 학습목표 달성 확인\n3. 차시 내용 예고\n4. 과제 안내 (필요시)\n5. 격려와 마무리 인사\n\n2-3분 정리 단계 스크립트를 작성해주세요.' },
      { id: 3, question: '수업 후 자기반성을 설명하시오.', answer: '목표 달성, 학생 반응, 개선점', prompt: '교원임용시험 2차 수업실연 문제입니다.\n\n문제: 수업 후 자기반성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습목표 달성 여부 점검\n2. 학생 반응 및 참여도 분석\n3. 교수방법의 적절성 평가\n4. 시간 배분 점검\n5. 개선 방안 도출\n\n수업 반성 체크리스트를 만들어주세요.' }
    ]
  }
];

export default function ClassDemonstrationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-class-demonstration-progress');
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
    localStorage.setItem('teacher-certificate-class-demonstration-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">수업실연</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎭</span>
            <h1 className="text-2xl font-bold text-gray-800">수업실연 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">교원임용시험 2차 - 실제 수업 시연 및 교수능력 평가</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>핵심 요소:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '완료'}
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
