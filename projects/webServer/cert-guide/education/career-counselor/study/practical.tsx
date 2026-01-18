'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'case-analysis',
    name: '상담사례분석',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '진로미결정 사례를 분석하시오. (20대 대학생, 전공 불만족, 진로 방향성 부족)', answer: '문제파악: 자기이해 부족, 진로탐색 미흡 / 개입: 적성·흥미검사, 직업정보 제공, 의사결정 훈련', prompt: '직업상담사 2급 실기 문제입니다.\n\n사례: 20대 대학생 내담자가 전공에 불만족하며 진로 방향을 정하지 못해 상담을 요청했습니다.\n\n다음 순서로 분석하고 상담계획을 수립하세요:\n1. 내담자 문제 진단 (진로미결정 유형)\n2. 문제의 원인 분석\n3. 적용할 상담이론\n4. 구체적 개입 전략 (검사, 정보제공, 의사결정)\n5. 상담 목표와 예상 성과\n\n비슷한 사례 1개와 상담계획을 작성해주세요.' },
      { id: 2, question: '중장년 전직 사례를 분석하시오. (50대, 명예퇴직, 재취업 어려움)', answer: '문제파악: 연령차별, 자신감 저하, 정보 부족 / 개입: 경력분석, 직업훈련, 취업프로그램 연계', prompt: '직업상담사 2급 실기 문제입니다.\n\n사례: 50대 명예퇴직자가 재취업에 어려움을 겪으며 좌절감을 호소합니다.\n\n다음 순서로 분석하고 상담계획을 수립하세요:\n1. 내담자의 심리적 상태 파악\n2. 재취업 장애요인 분석\n3. 강점과 활용 가능한 경력\n4. 구체적 취업지원 전략\n5. 정서적 지지와 동기부여 방법\n\n비슷한 사례 1개와 상담계획을 작성해주세요.' },
      { id: 3, question: '경력단절여성 사례를 분석하시오. (30대 여성, 육아 후 재취업 희망)', answer: '문제파악: 경력단절, 자신감 부족, 일·가정 양립 / 개입: 새일센터 연계, 직업훈련, 유연근무 정보', prompt: '직업상담사 2급 실기 문제입니다.\n\n사례: 30대 경력단절여성이 육아 후 재취업을 희망하지만 자신감이 없고 정보가 부족합니다.\n\n다음 순서로 분석하고 상담계획을 수립하세요:\n1. 경력단절 기간과 영향 분석\n2. 재취업 준비상태 진단\n3. 일·가정 양립 고려사항\n4. 새일센터 등 지원기관 연계\n5. 직업훈련과 취업 로드맵\n\n비슷한 사례 1개와 상담계획을 작성해주세요.' }
    ]
  },
  {
    id: 'counseling-process',
    name: '상담과정설계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '초기면접에서 수행할 과제를 설명하시오.', answer: '라포형성, 문제탐색, 사정(검사), 목표설정, 계약', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 첫 상담에서 상담자가 수행해야 할 과제를 순서대로 설명하시오.\n\n다음 내용을 포함하세요:\n1. 관계 형성 (라포) 기법\n2. 주호소 문제 파악\n3. 종합사정 (배경, 검사)\n4. 상담 목표 설정\n5. 상담 계약 체결\n\n실제 초기면접 시나리오를 작성해주세요.' },
      { id: 2, question: '상담목표 설정 방법을 설명하시오.', answer: 'SMART 원칙: 구체적, 측정가능, 달성가능, 현실적, 시간제한', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 효과적인 상담목표 설정 방법을 설명하시오.\n\n다음 내용을 포함하세요:\n1. SMART 목표 설정 원칙\n2. 내담자 참여의 중요성\n3. 단기·중기·장기 목표\n4. 목표의 우선순위 설정\n5. 목표 달성 평가 방법\n\n구체적인 목표 설정 예시를 제시해주세요.' },
      { id: 3, question: '상담종결 과정을 설명하시오.', answer: '종결시기 판단, 성과평가, 재발방지, 추수지도, 의뢰', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 상담을 성공적으로 종결하는 과정을 설명하시오.\n\n다음 내용을 포함하세요:\n1. 종결 시기 판단 기준\n2. 종결 준비와 예고\n3. 성과 평가 방법\n4. 재발 방지 전략\n5. 추수상담 계획\n\n종결면접 시나리오를 작성해주세요.' }
    ]
  },
  {
    id: 'test-interpretation',
    name: '검사해석',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: 'Holland 직업선호도검사 결과를 해석하시오. (RSE 유형)', answer: '현실형-사회형-진취형 특성, 적합직업, 일관성 분석, 진로지도', prompt: '직업상담사 2급 실기 문제입니다.\n\n검사결과: 내담자의 Holland 코드가 RSE (현실형-사회형-진취형)로 나왔습니다.\n\n다음 순서로 해석하고 피드백하세요:\n1. RSE 각 유형의 특성 설명\n2. 일치성과 일관성 분석\n3. 적합한 직업군 제시\n4. 발달과제 제안\n5. 진로탐색 방향 제시\n\n피드백 대화 시나리오를 작성해주세요.' },
      { id: 2, question: 'MBTI 결과를 진로상담에 활용하시오. (ENFP 유형)', answer: 'ENFP 특성, 강점·약점, 적합 직업환경, 주의사항', prompt: '직업상담사 2급 실기 문제입니다.\n\n검사결과: 내담자의 MBTI 유형이 ENFP입니다.\n\n다음 순서로 해석하고 진로지도하세요:\n1. ENFP 성격 특성\n2. 직업에서의 강점\n3. 주의해야 할 약점\n4. 적합한 직업 환경\n5. 진로개발 조언\n\n진로상담 시나리오를 작성해주세요.' },
      { id: 3, question: '직업적성검사 결과를 활용하시오.', answer: '능력프로필 분석, 강점 영역, 적합 직무, 개발 영역', prompt: '직업상담사 2급 실기 문제입니다.\n\n검사결과: 직업적성검사에서 언어능력과 공간지각력이 높고, 수리능력은 보통입니다.\n\n다음 순서로 해석하고 활용하세요:\n1. 적성 프로필 분석\n2. 강점 영역 파악\n3. 적합한 직무 추천\n4. 개발이 필요한 영역\n5. 교육훈련 방향 제시\n\n적성검사 피드백 시나리오를 작성해주세요.' }
    ]
  },
  {
    id: 'job-information-use',
    name: '직업정보활용',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '직업정보 제공 방법을 설명하시오.', answer: '욕구파악, 정보탐색, 맞춤제공, 해석지원, 활용지도', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 내담자에게 효과적으로 직업정보를 제공하는 방법을 설명하시오.\n\n다음 순서로 설명하세요:\n1. 내담자 정보욕구 파악\n2. 정보원 탐색 방법\n3. 맞춤형 정보 제공\n4. 정보 해석 지원\n5. 정보 활용 지도\n\n직업정보 제공 상담 시나리오를 작성해주세요.' },
      { id: 2, question: '워크넷 활용법을 지도하시오.', answer: '회원가입, 이력서작성, 구인정보 검색, 직업심리검사, 취업성공패키지', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 구직자에게 워크넷을 효과적으로 활용하는 방법을 지도하시오.\n\n다음 내용을 포함하세요:\n1. 회원가입과 구직등록\n2. 온라인 이력서 작성\n3. 구인정보 검색 방법\n4. 직업심리검사 활용\n5. 취업지원 서비스\n\n워크넷 활용 교육 시나리오를 작성해주세요.' },
      { id: 3, question: '직업훈련 정보를 상담에 활용하시오.', answer: 'HRD-Net, 내일배움카드, 국기전략훈련, 훈련기관 선택', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 직업훈련이 필요한 내담자에게 훈련정보를 제공하고 지도하시오.\n\n다음 순서로 설명하세요:\n1. HRD-Net 활용법\n2. 내일배움카드 발급\n3. 훈련과정 선택 기준\n4. 훈련기관 평가 방법\n5. 훈련 후 취업 연계\n\n직업훈련 상담 시나리오를 작성해주세요.' }
    ]
  },
  {
    id: 'program-design',
    name: '프로그램설계',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '청년 취업준비 집단프로그램을 설계하시오.', answer: '자기탐색, 직업탐색, 의사결정, 취업기술, 8회기', prompt: '직업상담사 2급 실기 문제입니다.\n\n과제: 청년 구직자를 위한 8회기 취업준비 집단프로그램을 설계하시오.\n\n다음 내용을 포함하세요:\n1. 프로그램 목표\n2. 대상자 선정 기준\n3. 회기별 주제와 활동\n4. 진행 방법과 기법\n5. 평가 방법\n\n구체적인 회기별 계획을 작성해주세요.' },
      { id: 2, question: '중장년 전직지원 프로그램을 설계하시오.', answer: '심리지원, 경력분석, 재취업전략, 창업정보, 6회기', prompt: '직업상담사 2급 실기 문제입니다.\n\n과제: 명예퇴직 중장년을 위한 6회기 전직지원 프로그램을 설계하시오.\n\n다음 내용을 포함하세요:\n1. 프로그램 필요성\n2. 목표와 기대효과\n3. 회기별 주제\n4. 특화된 내용 (경력분석, 창업 등)\n5. 사후관리 계획\n\n구체적인 프로그램 운영계획을 작성해주세요.' },
      { id: 3, question: '진로진학상담 프로그램을 설계하시오.', answer: '자기이해, 학과탐색, 진로설계, 학습전략, 10회기', prompt: '직업상담사 2급 실기 문제입니다.\n\n과제: 고등학생을 위한 10회기 진로진학상담 프로그램을 설계하시오.\n\n다음 내용을 포함하세요:\n1. 대상 학년과 특성\n2. 프로그램 목표\n3. 회기별 활동 내용\n4. 심리검사 활용 계획\n5. 학부모 참여 방안\n\n구체적인 프로그램 계획서를 작성해주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-practical-progress');
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
    localStorage.setItem('career-counselor-practical-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/career-counselor" className="text-gray-600 hover:text-blue-600">직업상담사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">실기 (직업상담 실무)</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✍️</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 실기시험 - 사례분석과 상담계획 수립</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-blue-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>핵심답안:</strong> {q.answer}</p>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
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
