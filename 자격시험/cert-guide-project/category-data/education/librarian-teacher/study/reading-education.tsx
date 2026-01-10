'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'reading-theory',
    name: '독서 이론',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '독서의 개념과 본질을 설명하시오.', answer: '의미 구성, 상호작용, 인지 과정, 사회문화적 실천', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서의 개념과 본질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서의 정의\n2. 의미 구성 과정\n3. 독자-텍스트 상호작용\n4. 인지적 과정\n5. 사회문화적 실천으로서의 독서\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '독서 과정 모형을 설명하시오.', answer: '상향식, 하향식, 상호작용 모형, 구성주의', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 과정 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상향식 모형 (Bottom-up)\n2. 하향식 모형 (Top-down)\n3. 상호작용 모형 (Interactive)\n4. 구성주의 모형\n5. 교육적 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '독서의 영역과 단계를 설명하시오.', answer: '문자적·추론적·비판적·창의적 이해, 사전·중·사후', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서의 영역과 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문자적 이해 (Literal)\n2. 추론적 이해 (Inferential)\n3. 비판적 이해 (Critical)\n4. 창의적 이해 (Creative)\n5. 사전-중-사후 독서 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독서 동기와 태도를 설명하시오.', answer: '내재적·외재적 동기, 독서 흥미, 자아효능감', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 동기와 태도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재적 동기 vs 외재적 동기\n2. 독서 흥미와 선호도\n3. 독서 자아효능감\n4. 독서 태도 형성\n5. 독서 동기 증진 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '독자 반응 이론을 설명하시오.', answer: '로젠블랫, 심미적·정보적 읽기, 독자 중심', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독자 반응 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 로젠블랫(Rosenblatt)의 이론\n2. 심미적 읽기 (Aesthetic)\n3. 정보적 읽기 (Efferent)\n4. 독자 중심 교육\n5. 독서 반응 활동 유형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'reading-development',
    name: '독서 발달',
    color: 'from-rose-500 to-red-500',
    questions: [
      { id: 1, question: '독서 발달 단계를 설명하시오.', answer: '전독서기, 초기독서기, 유창성 단계, 독립독서기', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전독서기 (Emergent Literacy)\n2. 초기 독서기 (Beginning Reading)\n3. 유창성 단계 (Fluency)\n4. 학습을 위한 독서 (Reading to Learn)\n5. 독립 독서기 (Advanced Reading)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '발달 단계별 독서지도를 설명하시오.', answer: '영유아, 초등, 중등, 청소년 맞춤 지도', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 발달 단계별 독서지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영유아기 그림책 읽기\n2. 초등 저학년 독서지도\n3. 초등 고학년 독서지도\n4. 중학생 독서지도\n5. 고등학생 심화 독서지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '읽기 유창성을 설명하시오.', answer: '정확성, 속도, 운율, 자동화, 이해 촉진', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 읽기 유창성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 읽기 유창성의 개념\n2. 정확성, 속도, 운율\n3. 자동화 (Automaticity)\n4. 유창성과 이해의 관계\n5. 유창성 향상 전략 (반복 읽기)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '어휘력 발달과 독서를 설명하시오.', answer: '어휘 폭, 깊이, 맥락 학습, 독서량과의 관계', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 어휘력 발달과 독서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 어휘력의 구성 (폭과 깊이)\n2. 맥락을 통한 어휘 학습\n3. 독서량과 어휘력의 관계\n4. 어휘 지도 전략\n5. 어휘력 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '읽기 부진 학생 지도를 설명하시오.', answer: '진단, 개별화 지도, 중재, 동기 부여', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 읽기 부진 학생 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 읽기 부진의 원인 진단\n2. 개별화 지도 계획\n3. 중재 반응 모형 (RTI)\n4. 읽기 부진 극복 전략\n5. 동기 부여 및 자신감 회복\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'reading-method',
    name: '독서지도 방법',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '독서 전략 지도를 설명하시오.', answer: '예측, 확인, 추론, 요약, 평가', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 전략 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예측하기 (Predicting)\n2. 확인하기 (Questioning)\n3. 추론하기 (Inferring)\n4. 요약하기 (Summarizing)\n5. 평가하기 (Evaluating)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '상호적 교수법(Reciprocal Teaching)을 설명하시오.', answer: '예측, 질문, 명료화, 요약, 대화적 학습', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 상호적 교수법(Reciprocal Teaching)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상호적 교수법의 개념 (Palincsar & Brown)\n2. 4가지 전략 (예측, 질문, 명료화, 요약)\n3. 대화적 학습 과정\n4. 교사-학생 역할 교대\n5. 독해력 향상 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '독서토론 지도를 설명하시오.', answer: '문학토론, 하브루타, 서평 쓰기, 비경쟁 토론', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서토론 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서토론의 목적과 유형\n2. 문학서클 (Literature Circles)\n3. 하브루타 독서토론\n4. 서평 쓰기 및 발표\n5. 비경쟁 토론 진행\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독서감상문 지도를 설명하시오.', answer: '자유 감상, 구조화, 장르별 접근, 피드백', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서감상문 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서감상문의 유형\n2. 자유 감상 vs 구조화된 감상\n3. 장르별 감상문 작성법\n4. 비평적 감상문 쓰기\n5. 피드백 및 첨삭 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '독서 포트폴리오를 설명하시오.', answer: '독서 기록, 성찰, 누적 평가, 성장 추적', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 포트폴리오를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서 포트폴리오의 개념\n2. 독서 기록장 작성\n3. 성찰 활동 포함\n4. 누적 평가 자료\n5. 독서 성장 추적 및 피드백\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'reading-program',
    name: '독서 프로그램',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '독서 프로그램 개발을 설명하시오.', answer: '요구분석, 목표설정, 설계, 실행, 평가', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이용자 요구 분석\n2. 프로그램 목표 설정\n3. 내용 및 활동 설계\n4. 실행 계획 수립\n5. 평가 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '독서동아리 운영을 설명하시오.', answer: '조직, 도서 선정, 토론, 활동, 성과 공유', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서동아리 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서동아리 조직 및 모집\n2. 공동 도서 선정\n3. 정기 모임 및 토론\n4. 다양한 독서 활동\n5. 성과 발표 및 공유\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '독서 행사 기획을 설명하시오.', answer: '독서주간, 작가 초청, 북콘서트, 전시회', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 행사 기획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서주간·독서의 달 행사\n2. 작가 초청 강연\n3. 북콘서트 및 낭독회\n4. 독서 전시회 및 북큐레이션\n5. 온라인 독서 챌린지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '한 책 읽기 운동을 설명하시오.', answer: '학교 공동체 독서, 다양한 활동, 독서문화 조성', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 한 책 읽기 운동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한 책 읽기 운동의 의의\n2. 공동 도서 선정 과정\n3. 전교생 독서 활동\n4. 교과 연계 프로젝트\n5. 독서문화 확산 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '독서치료 프로그램을 설명하시오.', answer: '발달적·임상적 독서치료, 자아존중감, 공감', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서치료 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서치료(Bibliotherapy)의 개념\n2. 발달적 독서치료 vs 임상적 독서치료\n3. 자아존중감 향상 프로그램\n4. 공감 능력 개발\n5. 치유 그림책 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'materials-evaluation',
    name: '독서자료 및 평가',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '독서자료 선정 기준을 설명하시오.', answer: '발달 적합성, 문학성, 다양성, 교육과정 연계', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서자료 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발달 단계 적합성\n2. 문학적·예술적 가치\n3. 주제 및 장르 다양성\n4. 교육과정 연계성\n5. 최신성 및 정확성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '아동·청소년 문학의 장르를 설명하시오.', answer: '그림책, 동화, 동시, 청소년 소설, 논픽션', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 아동·청소년 문학의 장르를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 그림책의 특징과 종류\n2. 동화 (전래동화, 창작동화)\n3. 동시와 아동극\n4. 청소년 소설 (YA Literature)\n5. 논픽션 (지식정보책)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '독서 평가 방법을 설명하시오.', answer: '과정 평가, 포트폴리오, 루브릭, 자기평가', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독서 평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과정 중심 평가\n2. 포트폴리오 평가\n3. 루브릭 개발 및 활용\n4. 자기평가 및 동료평가\n5. 수행평가 (프로젝트, 발표)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독해력 검사를 설명하시오.', answer: '표준화 검사, 비형식 검사, 진단 평가', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 독해력 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준화 독해력 검사\n2. 비형식 독해력 검사\n3. 진단 평가 도구\n4. 독서 수준 측정\n5. 검사 결과 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '디지털 독서와 멀티모달 리터러시를 설명하시오.', answer: '전자책, 하이퍼텍스트, 멀티미디어 읽기, 새로운 리터러시', prompt: '사서교사 임용시험 독서교육론 문제입니다.\n\n문제: 디지털 독서와 멀티모달 리터러시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 독서의 특징\n2. 전자책 vs 종이책\n3. 하이퍼텍스트 읽기\n4. 멀티모달 리터러시 (이미지, 영상, 소리)\n5. 뉴 리터러시 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ReadingEducationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('librarian-teacher-reading-education-progress');
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
    localStorage.setItem('librarian-teacher-reading-education-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-pink-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-pink-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">독서교육론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📖</span>
            <h1 className="text-2xl font-bold text-gray-800">독서교육론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">사서교사 임용시험 - 독서지도와 프로그램</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-pink-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
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
