'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'fire-detection-design',
    name: '자동화재탐지설비 설계',
    color: 'from-orange-600 to-red-500',
    questions: [
      { id: 1, question: '지하주차장 1,000㎡에 설치할 감지기의 종류와 수량을 산출하시오.', answer: '차동식 분포형(공기관식) 또는 정온식 특종, 바닥면적 ÷ 설치면적 = 감지기 수량', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 지하주차장 1,000㎡에 설치할 감지기의 종류와 수량을 산출하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 2, question: '연면적 5,000㎡ 건물의 P형 수신기 용량을 산정하시오.', answer: '회로수 산정: 경계구역수 + 예비회로(10%), 수신기 용량 = 회로수 이상', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 연면적 5,000㎡ 건물의 P형 수신기 용량을 산정하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 3, question: '경계구역 설정 기준과 바닥면적 600㎡ 이하 규정의 예외 조건을 쓰시오.', answer: '주요구조부 내화: 1,000㎡ 이하, 광전식분리형: 1,000㎡ 이하', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 경계구역 설정 기준과 바닥면적 600㎡ 이하 규정의 예외 조건을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 4, question: '내화배선과 내열배선의 구분 기준 및 적용 장소를 설명하시오.', answer: '내화배선: 비상전원~수신기, 내열배선: 수신기~감지기·발신기', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 내화배선과 내열배선의 구분 기준 및 적용 장소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 5, question: '중계기 설치 조건과 수용 감지기 수를 산정하시오.', answer: '송수신 거리 초과 시, 중계기 1대당 7회로 이하', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 중계기 설치 조건과 수용 감지기 수를 산정하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
    ],
  },
  {
    id: 'detector-wiring',
    name: '감지기 결선도',
    color: 'from-red-500 to-orange-400',
    questions: [
      { id: 1, question: 'P형 2급 수신기의 감지기 결선도를 그리고 종단저항 위치를 표시하시오.', answer: '공통선(C), 감지선(L), 종단저항(10kΩ) 최말단 감지기 단자', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: P형 2급 수신기의 감지기 결선도를 그리고 종단저항 위치를 표시하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 2, question: 'R형 수신기의 아날로그 감지기 결선 방식을 설명하시오.', answer: '4선식(전원 2선 + 통신 2선) 또는 2선식(전원+통신 공용)', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: R형 수신기의 아날로그 감지기 결선 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 3, question: '송배선식과 일반배선식의 차이점과 결선도를 그리시오.', answer: '송배선식: 단선 시 고장구간만 불통, 일반배선식: 단선 이후 전체 불통', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 송배선식과 일반배선식의 차이점과 결선도를 그리시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 4, question: '감지기 회로의 도통시험과 작동시험 방법을 설명하시오.', answer: '도통시험: 회로저항 측정(50Ω 이하), 작동시험: 가열·연기 인가', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 감지기 회로의 도통시험과 작동시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 5, question: '발신기세트(발신기, 표시등, 경종)의 결선도를 그리시오.', answer: '전원선(+,-), 발신기 스위치, 표시등, 경종 공통접지', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 발신기세트(발신기, 표시등, 경종)의 결선도를 그리시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
    ],
  },
  {
    id: 'emergency-light-design',
    name: '유도등 설계',
    color: 'from-orange-500 to-yellow-400',
    questions: [
      { id: 1, question: '대형 피난구유도등과 중형 피난구유도등의 설치 기준을 구분하시오.', answer: '대형: 영화관·대형마트 등 대규모, 중형: 일반 건축물', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 대형 피난구유도등과 중형 피난구유도등의 설치 기준을 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 2, question: '통로유도등의 설치 간격과 바닥면 조도 기준을 쓰시오.', answer: '설치간격: 20m 이하, 바닥조도: 1lx 이상', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 통로유도등의 설치 간격과 바닥면 조도 기준을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 3, question: '유도등의 비상전원 용량 계산 및 축전지 선정 방법을 설명하시오.', answer: '비상점등시간(20분·60분) × 소비전력, 축전지 용량 = W × T / V × η', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 유도등의 비상전원 용량 계산 및 축전지 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 4, question: '유도등 전용회로의 결선도와 3선식 배선 방식을 설명하시오.', answer: '상시전원(L,N), 비상전원(E), 점멸기 연동', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 유도등 전용회로의 결선도와 3선식 배선 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 5, question: '피난유도선의 설치 기준과 유도등 면제 조건을 설명하시오.', answer: '바닥 50cm 이하, 0.5m 간격 광원, 유도등 설치 시 면제 가능', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 피난유도선의 설치 기준과 유도등 면제 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
    ],
  },
  {
    id: 'wiring-calculation',
    name: '배선용량 계산',
    color: 'from-red-600 to-red-400',
    questions: [
      { id: 1, question: '감지기 회로의 전압강하율 계산 공식과 허용 기준을 쓰시오.', answer: 'e = 35.6 × L × I / 1000 × A, 허용: 5% 이하', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 감지기 회로의 전압강하율 계산 공식과 허용 기준을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 2, question: '옥내소화전 펌프 모터(15kW, 380V)의 전선 규격을 산정하시오.', answer: 'I = P / (√3 × V × cosθ × η), 허용전류표에서 규격 선정', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 옥내소화전 펌프 모터(15kW, 380V)의 전선 규격을 산정하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 3, question: '비상콘센트 회로의 간선 용량 계산과 전선 규격을 산정하시오.', answer: '1.5kVA × 회로수, 동시사용률 적용, HIV 전선 선정', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 비상콘센트 회로의 간선 용량 계산과 전선 규격을 산정하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 4, question: '비상발전기의 용량 산정 방법과 소방부하 계산을 설명하시오.', answer: 'PG = Σ(소방부하) × 수용률 / 발전기효율', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 비상발전기의 용량 산정 방법과 소방부하 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 5, question: '축전지 용량(Ah) 계산 공식과 방전종지전압을 설명하시오.', answer: 'C = K × L × (1/η), 방전종지전압: 셀당 1.75V', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 축전지 용량(Ah) 계산 공식과 방전종지전압을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
    ],
  },
  {
    id: 'comprehensive-design',
    name: '종합설계',
    color: 'from-orange-600 to-orange-400',
    questions: [
      { id: 1, question: '지하2층~지상10층 복합건물의 소방전기설비 설계 개요를 작성하시오.', answer: '자탐설비, 비상경보, 유도등, 비상조명, 비상콘센트, 무선통신보조', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 지하2층~지상10층 복합건물의 소방전기설비 설계 개요를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 2, question: '소방전기설비 평면도 작성 시 필수 표기 항목을 나열하시오.', answer: '감지기, 발신기, 유도등, 비상조명, 수신기, 배선경로, 범례', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 소방전기설비 평면도 작성 시 필수 표기 항목을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 3, question: '자동화재탐지설비 계통도 작성 방법과 포함 내용을 설명하시오.', answer: '수신기~중계기~감지기 계통, 회로번호, 배선종류, 배관규격', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 자동화재탐지설비 계통도 작성 방법과 포함 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 4, question: '소방설비 설계도서 검토 체크리스트를 작성하시오.', answer: '법적 적합성, 수량산출, 배선용량, 비상전원, 경계구역', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 소방설비 설계도서 검토 체크리스트를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
      { id: 5, question: '소방시설 완공검사 시 전기설비 점검 항목을 나열하시오.', answer: '접지저항, 절연저항, 회로시험, 작동시험, 비상전원 절체시험', prompt: `소방설비기사(전기) 실기 문제입니다.\n\n문제: 소방시설 완공검사 시 전기설비 점검 항목을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 조건 확인\n2. 계산 과정\n3. 도면 작성법\n4. 검토 사항\n5. 자주 하는 실수` },
    ],
  },
];

export default function PracticalPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['fire-detection-design']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('fire-elec-practical-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('fire-elec-practical-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-orange-600">홈</a><span className="text-gray-300">›</span><a href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</a><span className="text-gray-300">›</span><a href="/category/safety/fire-equipment-electrical" className="text-gray-600 hover:text-orange-600">소방설비기사(전기)</a><span className="text-gray-300">›</span><span className="text-orange-600 font-medium">실기연습</span></nav></div></header>

      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">✍️</span></div><div><h1 className="text-2xl font-bold">실기연습 문제풀이</h1><p className="text-orange-100">소방설비기사(전기) 실기 - 설계, 계산, 도면작성</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-orange-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-orange-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border font-mono"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
