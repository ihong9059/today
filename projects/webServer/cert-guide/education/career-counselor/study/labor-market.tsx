'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'labor-supply-demand',
    name: '노동수요공급',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '노동수요이론을 설명하시오.', answer: '한계생산성이론, 노동수요곡선, 수요탄력성', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동수요이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한계생산성 이론\n2. 한계생산가치(VMP)\n3. 노동수요곡선의 도출\n4. 수요탄력성의 결정요인\n5. 임금 변화와 노동수요\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '노동공급이론을 설명하시오.', answer: '여가-소득 선택, 대체효과, 소득효과, 후방굴절', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동공급이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 여가-소득 선택 모형\n2. 대체효과(substitution effect)\n3. 소득효과(income effect)\n4. 후방굴절 노동공급곡선\n5. 노동참가 결정요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '노동시장 균형을 설명하시오.', answer: '수요공급균형, 균형임금, 균형고용량, 시장청산', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 균형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수요곡선과 공급곡선\n2. 균형점 결정\n3. 균형임금과 고용량\n4. 시장청산 메커니즘\n5. 균형의 변화 요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '인적자본이론을 설명하시오.', answer: '교육투자, 훈련투자, 수익률, Mincer 소득함수', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 인적자본이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인적자본의 개념 (Becker)\n2. 교육투자와 수익률\n3. 직업훈련의 종류\n4. Mincer 소득함수\n5. 인적자본과 경제성장\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '노동이동을 설명하시오.', answer: '직업이동, 지역이동, 산업이동, 이동비용', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동이동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동이동의 유형\n2. 직업이동의 동기\n3. 지역이동과 이주\n4. 이동비용과 편익\n5. 이동성 제약요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'wage',
    name: '임금이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '임금결정이론을 설명하시오.', answer: '한계생산성, 생계비, 교섭력, 효율임금', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금결정이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한계생산성 임금이론\n2. 생계비 이론\n3. 교섭력 이론\n4. 효율임금 이론\n5. 현실 임금결정 요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '임금격차를 설명하시오.', answer: '보상적 격차, 인적자본 차이, 차별, 독점', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금격차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보상적 임금격차\n2. 인적자본 차이\n3. 차별적 임금격차\n4. 노동시장 분단\n5. 임금격차 완화 정책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '최저임금제도를 설명하시오.', answer: '목적, 결정방식, 고용효과, 소득분배', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 최저임금제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최저임금제 도입 목적\n2. 한국의 결정방식\n3. 고용효과 논쟁\n4. 소득분배 효과\n5. 적정 수준 판단\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '임금체계를 설명하시오.', answer: '연공급, 직무급, 성과급, 직능급', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연공급 체계\n2. 직무급 체계\n3. 성과급 체계\n4. 직능급 체계\n5. 임금체계 개편 동향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '성과급제도를 설명하시오.', answer: '인센티브, 성과배분, 스톡옵션, 동기부여', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 성과급제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인 인센티브 제도\n2. 집단 성과배분제\n3. 스톡옵션\n4. 성과급의 동기부여 효과\n5. 성과평가의 공정성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'unemployment',
    name: '실업이론',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '실업의 유형을 설명하시오.', answer: '마찰적, 구조적, 경기적, 계절적 실업', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 실업의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마찰적 실업\n2. 구조적 실업\n3. 경기적(순환적) 실업\n4. 계절적 실업\n5. 각 유형별 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '자연실업률을 설명하시오.', answer: 'NAIRU, 구조적+마찰적, 완전고용 실업률', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 자연실업률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연실업률의 개념\n2. NAIRU의 의미\n3. 구성 요소\n4. 영향 요인\n5. 정책적 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '실업의 비용을 설명하시오.', answer: '개인 소득상실, 사회 생산감소, 심리적 비용', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 실업의 비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인의 소득상실\n2. 사회적 생산 감소\n3. 심리적·건강 비용\n4. 인적자본 손실\n5. 사회적 비용 총계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '구직이론을 설명하시오.', answer: '탐색이론, 유보임금, 구직기간, 정보비용', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 구직이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탐색이론(search theory)\n2. 유보임금 개념\n3. 최적 구직기간\n4. 정보비용과 편익\n5. 구직지원 정책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청년실업을 설명하시오.', answer: '고학력화, 일자리 미스매치, 대기실업', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 청년실업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청년실업의 현황\n2. 고학력화와 일자리 불일치\n3. 대기실업 현상\n4. 니트족(NEET)\n5. 청년고용 정책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'labor-market-structure',
    name: '노동시장구조',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '이중노동시장이론을 설명하시오.', answer: '1차 시장(내부), 2차 시장(외부), 분단', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 이중노동시장이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1차 노동시장 특성\n2. 2차 노동시장 특성\n3. 시장 분단 원인\n4. 이동성 제약\n5. 정책적 함의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '내부노동시장을 설명하시오.', answer: '기업특수기술, 승진사다리, 장기고용', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 내부노동시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내부노동시장의 형성\n2. 기업특수 인적자본\n3. 승진 사다리(job ladder)\n4. 장기고용 관행\n5. 임금 프로필\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '비정규직을 설명하시오.', answer: '기간제, 파견, 용역, 시간제, 보호정책', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 비정규직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비정규직의 유형\n2. 증가 원인\n3. 임금·근로조건 격차\n4. 사회적 문제점\n5. 보호 및 지원 정책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '플랫폼노동을 설명하시오.', answer: '긱 이코노미, 특수고용, 배달·대리운전', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 플랫폼노동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플랫폼 경제의 특징\n2. 긱 워커(gig worker)\n3. 특수고용 형태\n4. 노동권 보호 문제\n5. 사회보험 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '노동시장 유연화를 설명하시오.', answer: '수량적, 기능적, 임금 유연성', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 유연화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수량적 유연성\n2. 기능적 유연성\n3. 임금 유연성\n4. 유연안정성(flexicurity)\n5. 유연화의 명암\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'employment-policy',
    name: '고용정책',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '적극적 노동시장정책을 설명하시오.', answer: '직업훈련, 고용보조금, 공공근로, 창업지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 적극적 노동시장정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업훈련 프로그램\n2. 고용보조금 제도\n3. 공공근로 사업\n4. 창업지원 정책\n5. 일자리 매칭 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소극적 노동시장정책을 설명하시오.', answer: '실업급여, 조기퇴직, 근로시간단축', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 소극적 노동시장정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실업급여 제도\n2. 조기퇴직 유도\n3. 근로시간 단축\n4. 일자리 나누기\n5. 적극적 정책과 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '고용보험제도를 설명하시오.', answer: '실업급여, 고용안정, 직업능력개발, 육아휴직', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 고용보험제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고용보험의 체계\n2. 실업급여 사업\n3. 고용안정 사업\n4. 직업능력개발 사업\n5. 모성보호(육아휴직) 급여\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청년고용정책을 설명하시오.', answer: '청년수당, 일경험, 취업성공패키지, 청년내일채움공제', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 청년고용정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청년 일자리 사업\n2. 취업성공패키지\n3. 청년내일채움공제\n4. 청년 직업훈련\n5. K-디지털 트레이닝\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '일-생활 균형 정책을 설명하시오.', answer: '주 52시간, 육아휴직, 유연근무, 재택근무', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 일-생활 균형 정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주 52시간 근무제\n2. 육아휴직·출산휴가\n3. 유연근무제도\n4. 재택·원격 근무\n5. 가족친화 인증제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LaborMarketStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-labor-market-progress');
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
    localStorage.setItem('career-counselor-labor-market-progress', JSON.stringify(arr));
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
            <span className="text-blue-600 font-medium">노동시장론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📈</span>
            <h1 className="text-2xl font-bold text-gray-800">노동시장론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 필기시험 핵심 과목 - 노동경제학 이론</p>
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
