'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'career-development',
    name: '진로발달이론',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '슈퍼의 진로발달이론을 설명하시오.', answer: '성장기, 탐색기, 확립기, 유지기, 쇠퇴기 / 자아개념 발달', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 슈퍼의 진로발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로발달의 5단계\n2. 자아개념과 진로선택\n3. 생애 공간과 생애 역할 무지개\n4. 발달과업\n5. 진로성숙도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '홀랜드의 직업선택이론을 설명하시오.', answer: 'RIASEC 6가지 성격유형, 일치성, 일관성, 분화성', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 홀랜드의 직업선택이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RIASEC 6가지 성격유형\n2. 육각형 모형\n3. 일치성(congruence)\n4. 일관성(consistency)\n5. 분화성(differentiation)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '긴즈버그의 진로발달이론을 설명하시오.', answer: '환상기, 잠정기, 현실기', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 긴즈버그의 진로발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환상기(fantasy period) 특성\n2. 잠정기(tentative period) 특성\n3. 현실기(realistic period) 특성\n4. 타협이론의 핵심\n5. 진로선택의 비가역성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '크럼볼츠의 사회학습이론을 설명하시오.', answer: '유전적 자질, 환경조건, 학습경험, 과제접근기술', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 크럼볼츠의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로결정에 영향을 주는 4가지 요인\n2. 도구적 학습경험\n3. 연합적 학습경험\n4. 계획된 우연 이론\n5. 진로상담 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '사회인지 진로이론을 설명하시오.', answer: '자기효능감, 결과기대, 개인목표', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 사회인지 진로이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기효능감의 개념\n2. 결과기대\n3. 개인목표 설정\n4. 흥미 발달 모형\n5. 진로선택 모형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'psychological-tests',
    name: '심리검사',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '심리검사의 신뢰도를 설명하시오.', answer: '검사-재검사, 동형검사, 반분, 내적일관성', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 심리검사의 신뢰도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 정의\n2. 검사-재검사 신뢰도\n3. 동형검사 신뢰도\n4. 반분 신뢰도\n5. 내적일관성 (크론바흐 알파)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '심리검사의 타당도를 설명하시오.', answer: '내용타당도, 준거타당도, 구인타당도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 심리검사의 타당도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도의 정의\n2. 내용타당도\n3. 준거타당도 (예언, 동시)\n4. 구인타당도\n5. 타당도와 신뢰도의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '적성검사를 설명하시오.', answer: 'GATB, DAT, 직업적성검사, 잠재능력 측정', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 적성검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적성의 정의\n2. GATB (일반적성검사)\n3. DAT (분별적성검사)\n4. 한국직업능력개발원 직업적성검사\n5. 적성검사 결과 해석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '흥미검사를 설명하시오.', answer: 'Strong, Kuder, 직업흥미검사, Holland 유형', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 흥미검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흥미의 정의와 특성\n2. Strong 직업흥미검사\n3. Kuder 직업흥미검사\n4. Holland 직업선호도검사\n5. 흥미검사 활용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '성격검사를 설명하시오.', answer: 'MBTI, MMPI, 16PF, Big5', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 성격검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MBTI 4가지 선호지표\n2. MMPI의 임상척도\n3. 16PF 성격요인\n4. Big Five 성격이론\n5. 성격검사의 진로상담 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'aptitude',
    name: '직업적성',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '지능의 이론을 설명하시오.', answer: 'Spearman g요인, Thurstone 다요인, Gardner 다중지능', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 지능의 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Spearman의 일반요인(g) 이론\n2. Thurstone의 다요인 이론\n3. Gardner의 다중지능 이론\n4. Sternberg의 삼원지능 이론\n5. 직업과 지능의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '지능검사의 종류를 설명하시오.', answer: 'Wechsler, Stanford-Binet, Raven, K-WAIS', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 지능검사의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Wechsler 지능검사 (WAIS, WISC)\n2. Stanford-Binet 지능검사\n3. Raven 지능검사 (비언어적)\n4. K-WAIS (한국판)\n5. IQ 점수의 해석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '특수적성을 설명하시오.', answer: '음악, 미술, 운동, 기계, 사무적성', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 특수적성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특수적성의 정의\n2. 음악적성과 미술적성\n3. 운동적성과 신체능력\n4. 기계적성과 공간지각력\n5. 사무적성과 수리능력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '적성과 흥미의 관계를 설명하시오.', answer: '능력 vs 선호, 상호작용, 진로선택 영향', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 적성과 흥미의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적성과 흥미의 차이\n2. 상호영향 관계\n3. 일치도와 진로만족\n4. 불일치 시 문제점\n5. 진로상담에서의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '적성개발 방법을 설명하시오.', answer: '교육훈련, 실습경험, 피드백, 자기주도학습', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 적성개발 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체계적 교육훈련\n2. 실무 경험과 실습\n3. 피드백과 코칭\n4. 자기주도 학습\n5. 적성개발 계획 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'personality',
    name: '성격이론',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '특질이론을 설명하시오.', answer: 'Allport, Cattell 16PF, Big Five', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 특질이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Allport의 특질분류\n2. Cattell의 16가지 성격요인\n3. Big Five 성격모델 (OCEAN)\n4. 특질의 안정성과 변화\n5. 직업선택과 특질의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '융의 분석심리학을 설명하시오.', answer: '내향-외향, 4가지 기능(사고, 감정, 감각, 직관)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 융의 분석심리학을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단무의식과 원형\n2. 내향성-외향성\n3. 4가지 심리기능\n4. 8가지 성격유형\n5. MBTI와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'MBTI 성격유형을 설명하시오.', answer: 'E/I, S/N, T/F, J/P → 16가지 유형', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: MBTI 성격유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4가지 선호지표 (E/I, S/N, T/F, J/P)\n2. 16가지 성격유형\n3. 기질론 (SJ, SP, NT, NF)\n4. 성격발달과 유형역동\n5. 진로상담에서의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '애니어그램을 설명하시오.', answer: '9가지 성격유형, 날개, 통합-분열', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 애니어그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 9가지 성격유형\n2. 3가지 중심 (본능, 감정, 사고)\n3. 날개(wing) 개념\n4. 통합-분열 방향\n5. 직업선택과의 연관성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '성격과 직업적응을 설명하시오.', answer: '성격-직업 적합성, 직무만족, 이직의도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 성격과 직업적응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성격-직업 적합성 이론\n2. 성격과 직무만족\n3. 성격과 직무성과\n4. 성격과 조직적응\n5. 성격불일치 시 대응방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'values',
    name: '가치관·동기',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '직업가치관을 설명하시오.', answer: '내재적 가치(자율성, 성취감), 외재적 가치(보수, 안정)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업가치관을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가치관의 정의와 기능\n2. 내재적 직업가치\n3. 외재적 직업가치\n4. 가치관 명료화\n5. 가치관과 진로선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '욕구이론을 설명하시오.', answer: 'Maslow 5단계, Herzberg 2요인, Alderfer ERG', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 욕구이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Maslow의 욕구위계 5단계\n2. Herzberg의 2요인 이론\n3. Alderfer의 ERG 이론\n4. McClelland의 성취동기\n5. 직업상담에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '동기이론을 설명하시오.', answer: '내재동기, 외재동기, 자기결정성, 목표설정', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 동기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재동기와 외재동기\n2. 자기결정성 이론\n3. 목표설정 이론\n4. 기대이론\n5. 동기부여 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직업만족을 설명하시오.', answer: '직무특성, 보상, 관계, 성장기회, 직무만족 이론', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업만족을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업만족의 정의\n2. 직업만족 영향요인\n3. Hackman-Oldham 직무특성이론\n4. 직업만족과 생산성\n5. 직업만족 향상 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '경력몰입을 설명하시오.', answer: '조직몰입, 직업몰입, 경력정체, 이직의도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 경력몰입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직몰입의 개념\n2. 직업몰입과 경력몰입\n3. 경력정체 현상\n4. 이직의도와 이직행동\n5. 몰입 증진 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PsychologyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-psychology-progress');
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
    localStorage.setItem('career-counselor-psychology-progress', JSON.stringify(arr));
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
            <span className="text-blue-600 font-medium">직업심리학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold text-gray-800">직업심리학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 필기시험 핵심 과목 - 진로발달이론과 심리검사</p>
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
