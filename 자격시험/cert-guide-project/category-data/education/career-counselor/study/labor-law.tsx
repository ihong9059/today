'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'labor-standards',
    name: '근로기준법',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '근로기준법의 기본원칙을 설명하시오.', answer: '근로조건 최저기준, 균등처우, 강제근로 금지', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로기준법의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로조건의 최저기준\n2. 균등대우 원칙\n3. 강제근로 금지\n4. 중간착취 배제\n5. 근로조건 명시의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '근로계약을 설명하시오.', answer: '서면명시, 계약기간, 수습, 해지, 부당해고', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로계약을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로계약 체결과 서면명시\n2. 근로계약 기간\n3. 수습기간 운영\n4. 근로계약 해지\n5. 부당해고 구제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '근로시간을 설명하시오.', answer: '주 52시간, 연장·야간·휴일근로, 휴게·휴일', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로시간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정 근로시간 (주 52시간)\n2. 연장근로 한도와 가산수당\n3. 야간·휴일근로 수당\n4. 휴게시간 부여\n5. 주휴일과 법정휴일\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '임금을 설명하시오.', answer: '통화·직접·전액·정기 지급, 최저임금, 평균임금', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 임금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임금 지급 4원칙\n2. 최저임금 적용\n3. 평균임금 계산\n4. 통상임금의 의미\n5. 임금채권 우선변제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연차유급휴가를 설명하시오.', answer: '1년 15일, 비례부여, 사용촉진, 수당', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 연차유급휴가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연차휴가 발생 요건\n2. 부여 일수 (1년 15일)\n3. 비례부여 원칙\n4. 사용촉진 제도\n5. 미사용 수당\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'employment-insurance',
    name: '고용보험법',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '고용보험의 적용대상을 설명하시오.', answer: '근로자, 사업주, 적용제외, 임의가입', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 고용보험의 적용대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 당연적용 사업장\n2. 적용대상 근로자\n3. 적용제외 근로자\n4. 임의가입 제도\n5. 보험료 부담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '구직급여를 설명하시오.', answer: '수급요건, 대기기간, 지급액, 지급기간', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 구직급여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수급 자격요건\n2. 대기기간 7일\n3. 지급액 계산 (평균임금 60%)\n4. 지급기간 (120~270일)\n5. 재취업활동 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '취업촉진수당을 설명하시오.', answer: '조기재취업수당, 직업능력개발수당, 광역구직활동비', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 취업촉진수당을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조기재취업 수당\n2. 직업능력개발 수당\n3. 광역구직활동비\n4. 이주비\n5. 수급 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '고용안정사업을 설명하시오.', answer: '고용유지, 고용촉진, 고용창출', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 고용안정사업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고용유지 지원금\n2. 고용촉진 장려금\n3. 고용창출 지원\n4. 일자리 함께하기\n5. 고령자·장애인 고용지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직업능력개발사업을 설명하시오.', answer: '훈련비 지원, 내일배움카드, 국가기간전략', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 직업능력개발사업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 훈련비 지원 제도\n2. 국민내일배움카드\n3. 국가기간·전략산업직종훈련\n4. 사업주 훈련 지원\n5. K-디지털 트레이닝\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'industrial-safety',
    name: '산업안전보건법',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '산업안전보건법의 목적을 설명하시오.', answer: '산업재해 예방, 쾌적한 작업환경, 근로자 건강', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 산업안전보건법의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산업재해 예방\n2. 쾌적한 작업환경 조성\n3. 근로자 건강 보호\n4. 사업주 의무\n5. 근로자 권리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전보건관리체계를 설명하시오.', answer: '관리책임자, 관리감독자, 안전관리자, 보건관리자', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 안전보건관리체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전보건관리책임자\n2. 관리감독자\n3. 안전관리자 선임\n4. 보건관리자 선임\n5. 산업보건의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '안전보건교육을 설명하시오.', answer: '정기교육, 채용시교육, 특별교육, 관리감독자교육', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 안전보건교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기 안전보건교육\n2. 채용 시 교육\n3. 특별안전보건교육\n4. 관리감독자 교육\n5. 교육 시간과 내용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '유해·위험 작업을 설명하시오.', answer: '유해물질, 위험기계·기구, 보호구, 건강진단', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 유해·위험 작업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유해물질 관리\n2. 위험기계·기구\n3. 보호구 착용\n4. 특수건강진단\n5. 작업환경측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '산업재해를 설명하시오.', answer: '업무상 사고·질병, 보고의무, 산재보험', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 산업재해를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산업재해의 정의\n2. 업무상 사고와 질병\n3. 재해 발생 보고의무\n4. 산재보험 급여\n5. 재해 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'labor-union',
    name: '노동조합법',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '노동3권을 설명하시오.', answer: '단결권, 단체교섭권, 단체행동권', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 노동3권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단결권의 의미\n2. 단체교섭권\n3. 단체행동권 (쟁의권)\n4. 헌법적 보장\n5. 제한과 조정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '노동조합을 설명하시오.', answer: '설립신고, 조직형태, 운영, 전임자', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 노동조합을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동조합의 정의\n2. 설립 신고제\n3. 조직형태 (기업별, 산업별)\n4. 조합 운영\n5. 전임자 제도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '단체교섭을 설명하시오.', answer: '교섭당사자, 성실교섭의무, 단체협약', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 단체교섭을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교섭당사자\n2. 성실교섭 의무\n3. 교섭절차\n4. 단체협약 체결\n5. 협약의 효력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '쟁의행위를 설명하시오.', answer: '파업, 태업, 직장폐쇄, 조정·중재', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 쟁의행위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파업의 요건\n2. 태업과 보이콧\n3. 사용자의 직장폐쇄\n4. 쟁의조정 절차\n5. 필수공익사업 제한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '부당노동행위를 설명하시오.', answer: '불이익 취급, 지배·개입, 단체교섭 거부', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 부당노동행위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불이익 취급 금지\n2. 지배·개입 금지\n3. 단체교섭 거부 금지\n4. 경비원조 금지\n5. 구제신청 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'equal-employment',
    name: '남녀고용평등법',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '남녀 균등처우를 설명하시오.', answer: '채용·승진 차별금지, 동일가치노동 동일임금', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 남녀 균등처우를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모집·채용 차별 금지\n2. 임금 차별 금지\n3. 승진·배치 차별 금지\n4. 정년·퇴직 차별 금지\n5. 적극적 고용개선조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직장 내 성희롱을 설명하시오.', answer: '정의, 예방교육, 조사·조치, 피해자 보호', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 직장 내 성희롱을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성희롱의 정의\n2. 예방교육 의무\n3. 발생 시 조사\n4. 행위자 조치\n5. 피해자 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '모성보호를 설명하시오.', answer: '출산전후휴가, 육아휴직, 육아기 근로시간단축', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 모성보호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 출산전후휴가 (90일)\n2. 배우자 출산휴가\n3. 육아휴직 (1년)\n4. 육아기 근로시간 단축\n5. 임신기 근로시간 단축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '일·가정 양립을 설명하시오.', answer: '가족돌봄휴직, 유연근무, 가족친화기업', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 일·가정 양립을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가족돌봄휴직\n2. 가족돌봄휴가\n3. 유연근무제\n4. 가족친화 인증\n5. 일·가정양립지원금\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '고용상 연령차별금지를 설명하시오.', answer: '모집·채용, 정년, 차별 시정, 고령자 고용촉진', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 고용상 연령차별금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연령차별 금지 원칙\n2. 모집·채용 시 연령 제한 금지\n3. 정년 제도\n4. 고령자 고용촉진\n5. 차별 시정 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LaborLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-labor-law-progress');
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
    localStorage.setItem('career-counselor-labor-law-progress', JSON.stringify(arr));
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
            <span className="text-blue-600 font-medium">노동관계법규</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span>
            <h1 className="text-2xl font-bold text-gray-800">노동관계법규 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 필기시험 핵심 과목 - 노동법 핵심</p>
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
