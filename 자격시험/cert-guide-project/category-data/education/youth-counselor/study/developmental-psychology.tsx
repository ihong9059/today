'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'adolescence',
    name: '청소년기 발달 특성',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: '청소년기의 신체 발달 특징을 설명하시오.', answer: '사춘기, 급성장, 2차 성징, 성호르몬 분비 증가', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기의 신체 발달 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사춘기 시작 시기와 특징\n2. 급성장 현상\n3. 2차 성징의 발현\n4. 성호르몬의 역할\n5. 발달 속도의 개인차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년기 뇌 발달의 특징을 설명하시오.', answer: '전두엽 발달 지연, 변연계 활성화, 시냅스 가지치기', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기 뇌 발달의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전두엽 발달 지연과 의미\n2. 변연계 활성화와 감정조절\n3. 시냅스 가지치기 과정\n4. 수초화 진행\n5. 위험추구행동과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년기의 수면 패턴 변화를 설명하시오.', answer: '멜라토닌 분비 지연, 수면상 후퇴, 만성적 수면부족', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기의 수면 패턴 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 멜라토닌 분비 지연\n2. 수면상 후퇴 현상\n3. 등교 시간과의 불일치\n4. 수면부족의 영향\n5. 적절한 수면 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년기 영양과 건강 문제를 설명하시오.', answer: '영양 불균형, 다이어트, 섭식장애 위험 증가', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기 영양과 건강 문제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 급성장기 영양 요구\n2. 불규칙한 식습관\n3. 외모 관심과 다이어트\n4. 섭식장애 위험\n5. 건강한 식습관 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년기의 성 발달과 성적 정체성을 설명하시오.', answer: '성적 호기심, 성정체성 형성, 성소수자 인정 과정', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기의 성 발달과 성적 정체성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성적 호기심 증가\n2. 성정체성 형성 과정\n3. 성적 지향 탐색\n4. 성소수자 청소년 이슈\n5. 성교육의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'cognitive',
    name: '인지 발달',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '피아제의 형식적 조작기를 설명하시오.', answer: '추상적 사고, 가설연역적 사고, 조합적 사고', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 피아제의 형식적 조작기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형식적 조작기의 시작 시기\n2. 추상적 사고 능력\n3. 가설연역적 사고\n4. 조합적 사고와 체계적 사고\n5. 한계점 (청소년 자기중심성)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년의 메타인지 발달을 설명하시오.', answer: '자기 사고에 대한 사고, 학습전략 사용 증가', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 메타인지 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 메타인지의 정의\n2. 청소년기 메타인지 발달\n3. 학습전략 활용\n4. 자기 성찰 능력\n5. 교육적 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년 자기중심성을 설명하시오.', answer: '상상적 청중, 개인적 우화, Elkind 이론', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년 자기중심성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Elkind의 청소년 자기중심성\n2. 상상적 청중 개념\n3. 개인적 우화\n4. 행동 특성\n5. 극복 과정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년의 도덕성 발달을 설명하시오.', answer: 'Kohlberg 인습적-후인습적 수준, 정의 지향적 도덕', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 도덕성 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Kohlberg의 도덕성 발달 단계\n2. 인습적 수준의 특징\n3. 후인습적 수준으로의 이행\n4. Gilligan의 배려 윤리\n5. 도덕 교육의 방향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년의 의사결정 능력을 설명하시오.', answer: '합리적 사고 가능하나 정서적 영향 큼, 위험평가 미숙', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 의사결정 능력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의사결정의 인지적 측면\n2. 정서와 충동의 영향\n3. 또래 압력의 역할\n4. 위험 평가의 특성\n5. 의사결정 능력 향상 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emotional',
    name: '정서 발달',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년기의 정서적 특징을 설명하시오.', answer: '정서적 불안정, 양가감정, 질풍노도, 감수성 증가', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기의 정서적 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정서적 불안정성\n2. 양가감정의 경험\n3. 질풍노도(Storm and Stress)\n4. 예민한 감수성\n5. 정서조절 능력 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년의 우울과 불안을 설명하시오.', answer: '유병률 증가, 학업 스트레스, 또래 관계, 신체 변화', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 우울과 불안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기 우울증 특징\n2. 불안장애의 형태\n3. 주요 원인들\n4. 조기 발견의 중요성\n5. 개입 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년의 분노 조절 문제를 설명하시오.', answer: '충동성 증가, 전두엽 미성숙, 공격성 표출', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 분노 조절 문제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분노 증가의 생물학적 원인\n2. 충동조절의 어려움\n3. 공격성 표출 양상\n4. 분노조절장애 위험\n5. 분노조절 훈련 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년의 자존감 발달을 설명하시오.', answer: '불안정한 자존감, 외모·학업·또래 영향, 자아개념 형성', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 자존감 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자존감의 변화\n2. 영향 요인 (외모, 학업, 또래)\n3. 전반적 vs 영역별 자존감\n4. 낮은 자존감의 문제\n5. 자존감 향상 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년의 스트레스 대처를 설명하시오.', answer: '스트레스 증가, 대처자원 부족, 적응적-부적응적 대처', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 스트레스 대처를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 스트레스원\n2. 대처 자원과 능력\n3. 적응적 대처 전략\n4. 부적응적 대처 (회피, 약물)\n5. 대처 기술 훈련\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'social',
    name: '사회성 발달',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: '청소년기 또래관계의 중요성을 설명하시오.', answer: '정체성 형성, 소속감, 사회기술 습득, 또래압력', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기 또래관계의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 또래의 영향력 증가\n2. 소속감과 정체성\n3. 사회기술 습득\n4. 또래압력의 양면성\n5. 또래관계 문제와 개입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년기 부모-자녀 관계 변화를 설명하시오.', answer: '심리적 독립, 갈등 증가, 애착 지속, 자율성 요구', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년기 부모-자녀 관계 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리적 독립 욕구\n2. 부모와의 갈등 증가\n3. 애착의 지속과 변화\n4. 자율성 vs 통제\n5. 긍정적 관계 유지 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년의 학교 적응을 설명하시오.', answer: '학업 스트레스, 교우관계, 교사관계, 학교 소속감', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 학교 적응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교 적응의 구성요소\n2. 학업 스트레스\n3. 교우관계의 영향\n4. 교사와의 관계\n5. 학교부적응 징후와 개입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년의 데이트 관계를 설명하시오.', answer: '이성 관계 시작, 친밀감 욕구, 데이트 폭력 위험', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 데이트 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이성 관계의 시작\n2. 친밀감 발달\n3. 건강한 데이트 관계\n4. 데이트 폭력 문제\n5. 관계 교육의 필요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년의 사회적 고립과 외로움을 설명하시오.', answer: '또래 거부, SNS 역설, 사회불안, 은둔형 외톨이', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 청소년의 사회적 고립과 외로움을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회적 고립의 원인\n2. 외로움의 심리적 영향\n3. SNS와 외로움의 관계\n4. 은둔형 외톨이 문제\n5. 사회성 향상 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'identity',
    name: '정체성 발달',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'Erikson의 정체성 발달 이론을 설명하시오.', answer: '정체성 대 역할혼미, 심리사회적 유예기, 정체성 위기', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: Erikson의 정체성 발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계: 정체성 대 역할혼미\n2. 심리사회적 유예기\n3. 정체성 위기의 의미\n4. 정체성 형성 과정\n5. 정체성 혼미의 문제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Marcia의 정체성 지위 이론을 설명하시오.', answer: '정체성 성취, 유예, 폐쇄, 혼미 4가지 지위', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: Marcia의 정체성 지위 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탐색과 몰입 차원\n2. 정체성 성취 지위\n3. 유예 지위\n4. 폐쇄 지위\n5. 정체성 혼미 지위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '진로 정체성 발달을 설명하시오.', answer: '진로 탐색, 흥미·적성 발견, Super 발달단계', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 진로 정체성 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Super의 진로발달 단계\n2. 진로 탐색기의 특징\n3. 흥미와 적성 발견\n4. 진로 결정의 어려움\n5. 진로상담의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '성 정체성과 성역할 발달을 설명하시오.', answer: '성역할 고정관념, 양성성, LGBTQ+ 정체성', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 성 정체성과 성역할 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성 정체성의 형성\n2. 성역할 고정관념\n3. 심리적 양성성\n4. 성소수자 정체성 발달\n5. 다양성 존중 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '민족·문화 정체성 발달을 설명하시오.', answer: '다문화 청소년, 문화적응 스트레스, 이중문화 정체성', prompt: '청소년상담사 발달심리 문제입니다.\n\n문제: 민족·문화 정체성 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민족 정체성의 의미\n2. 다문화 청소년 이슈\n3. 문화적응 스트레스\n4. 이중문화 정체성\n5. 문화적 지지와 상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function DevelopmentalPsychologyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-developmental-psychology-progress');
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
    localStorage.setItem('youth-counselor-developmental-psychology-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-emerald-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-counselor" className="text-gray-600 hover:text-emerald-600">청소년상담사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">발달심리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold text-gray-800">발달심리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년상담사 3급 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-emerald-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
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
