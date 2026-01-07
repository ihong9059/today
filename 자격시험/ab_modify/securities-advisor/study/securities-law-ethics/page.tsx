'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'capital-market-law',
    name: '자본시장법 개요',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '자본시장법의 제정 목적과 주요 원칙을 설명하시오.', answer: '투자자 보호, 금융투자업 건전화, 자본시장 공정성·신뢰성·효율성 확보', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 자본시장법의 제정 목적과 주요 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '금융투자상품의 정의와 분류(증권, 파생상품)를 설명하시오.', answer: '원본손실 가능성 있는 금융상품, 증권(지분·채무·수익·투자계약·파생결합)과 파생상품으로 구분', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융투자상품의 정의와 분류(증권, 파생상품)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자자의 분류(전문투자자, 일반투자자)와 그 차이를 설명하시오.', answer: '전문투자자: 국가, 금융기관 등 / 일반투자자: 전문투자자 외 모든 투자자, 더 강한 보호 적용', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 투자자의 분류(전문투자자, 일반투자자)와 그 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '자본시장법상 금융투자업의 종류를 설명하시오.', answer: '투자매매업, 투자중개업, 집합투자업, 투자자문업, 투자일임업, 신탁업', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 자본시장법상 금융투자업의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '자본시장법의 적용범위와 적용제외 대상을 설명하시오.', answer: '금융투자상품 거래에 적용, 예금·보험 등 원본보장 상품은 적용제외', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 자본시장법의 적용범위와 적용제외 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'financial-investment-regulation',
    name: '금융투자업 규제',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '금융투자업 인가 및 등록 요건을 설명하시오.', answer: '인가: 투자매매·중개·집합투자·신탁업, 등록: 투자자문·일임업, 자기자본·인력·시설 요건', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융투자업 인가 및 등록 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '금융투자업자의 건전성 규제(자기자본, 영업용순자본비율)를 설명하시오.', answer: '적정 자기자본 유지, NCR(영업용순자본비율) 100% 이상 유지 의무', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융투자업자의 건전성 규제(자기자본, 영업용순자본비율)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자권유 시 준수사항(적합성원칙, 적정성원칙)을 설명하시오.', answer: '적합성: 투자자 정보 파악 후 적합한 상품 권유, 적정성: 부적정 고지 의무', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 투자권유 시 준수사항(적합성원칙, 적정성원칙)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '설명의무와 부당권유 금지에 대해 설명하시오.', answer: '중요사항 설명의무, 단정적 판단 제공·허위설명·투자성향 부적합 권유 금지', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 설명의무와 부당권유 금지에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '금융투자업자의 금지행위(이해상충, 선행매매 등)를 설명하시오.', answer: '이해상충행위, 선행매매, 손실보전·이익보장 약속, 부당한 손해전가 금지', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융투자업자의 금지행위(이해상충, 선행매매 등)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'securities-regulation',
    name: '증권 발행·유통 규제',
    color: 'from-indigo-600 to-purple-500',
    questions: [
      { id: 1, question: '증권 공모와 사모의 구분 기준을 설명하시오.', answer: '공모: 50인 이상 청약권유, 사모: 49인 이하 또는 전문투자자 대상', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 증권 공모와 사모의 구분 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '증권신고서 제도와 효력발생 요건을 설명하시오.', answer: '공모 시 증권신고서 제출 의무, 수리 후 15일 경과 시 효력 발생', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 증권신고서 제도와 효력발생 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '정기공시와 수시공시의 종류와 내용을 설명하시오.', answer: '정기: 사업보고서·반기·분기보고서, 수시: 주요사항보고서·공정공시', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 정기공시와 수시공시의 종류와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '내부통제기준과 준법감시인 제도를 설명하시오.', answer: '법령준수·건전경영을 위한 내부통제기준 마련, 준법감시인 임명·독립성 보장', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 내부통제기준과 준법감시인 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '투자설명서 교부의무와 그 면제사유를 설명하시오.', answer: '청약 전 투자설명서 교부 의무, 전문투자자·기존주주 등은 면제 가능', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 투자설명서 교부의무와 그 면제사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'unfair-trading',
    name: '불공정거래 규제',
    color: 'from-purple-600 to-indigo-500',
    questions: [
      { id: 1, question: '내부자거래의 구성요건과 규제내용을 설명하시오.', answer: '내부자가 미공개 중요정보를 이용하여 거래, 정보이용자까지 규제 확대', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 내부자거래의 구성요건과 규제내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '시세조종행위의 유형과 제재를 설명하시오.', answer: '허위·가장매매, 통정매매, 현실거래에 의한 시세조종, 형사처벌·과징금 부과', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 시세조종행위의 유형과 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '부정거래행위의 개념과 구체적 사례를 설명하시오.', answer: '사기적 부정행위로 거래유인, 허위정보 유포, 시장질서 교란행위 포함', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 부정거래행위의 개념과 구체적 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '단기매매차익 반환제도의 내용을 설명하시오.', answer: '주요주주·임원의 6개월 내 반대매매 차익을 회사에 반환, 주주의 청구권', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 단기매매차익 반환제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '불공정거래에 대한 제재(형사·행정·민사)를 설명하시오.', answer: '형사: 징역·벌금, 행정: 과징금·시정명령, 민사: 손해배상책임', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 불공정거래에 대한 제재(형사·행정·민사)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'professional-ethics',
    name: '직무윤리',
    color: 'from-indigo-700 to-purple-600',
    questions: [
      { id: 1, question: '금융투자전문인력의 윤리강령 주요 내용을 설명하시오.', answer: '고객이익 우선, 성실의무, 전문성 유지, 법규준수, 시장질서 존중', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융투자전문인력의 윤리강령 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '이해상충 방지의무와 관리체계를 설명하시오.', answer: '이해상충 가능성 파악·관리, 정보교류 차단장치(Chinese Wall), 내부통제', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 이해상충 방지의무와 관리체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '고객정보 보호의무와 관련 규정을 설명하시오.', answer: '개인정보보호법·신용정보법 준수, 정보의 수집·이용·제공 시 동의 필요', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 고객정보 보호의무와 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '투자권유대행인 제도와 준수사항을 설명하시오.', answer: '금융투자업자 위탁으로 투자권유 대행, 등록·교육·감독 의무, 금지행위 준수', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 투자권유대행인 제도와 준수사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '금융소비자보호법의 주요 내용과 투자권유 관련 규정을 설명하시오.', answer: '6대 판매원칙(적합성·적정성·설명의무·불공정영업·부당권유·허위광고 금지)', prompt: `증권투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: 금융소비자보호법의 주요 내용과 투자권유 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
];

export default function SecuritiesLawEthicsPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['capital-market-law']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('securities-advisor-law-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('securities-advisor-law-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-indigo-600">홈</a><span className="text-gray-300">›</span><a href="/category/finance" className="text-gray-600 hover:text-indigo-600">금융</a><span className="text-gray-300">›</span><a href="/category/finance/securities-advisor" className="text-gray-600 hover:text-indigo-600">증권투자권유자문인력</a><span className="text-gray-300">›</span><span className="text-indigo-600 font-medium">직무윤리 및 법규</span></nav></div></header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚖️</span></div><div><h1 className="text-2xl font-bold">직무윤리 및 법규</h1><p className="text-indigo-100">증권투자권유자문인력 - 자본시장법, 금융투자업 규제, 직무윤리</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-indigo-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-indigo-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
