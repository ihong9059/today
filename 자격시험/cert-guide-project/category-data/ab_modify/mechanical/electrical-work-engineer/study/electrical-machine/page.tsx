'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ElectricalMachineStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['transformer']);

  useEffect(() => {
    const saved = localStorage.getItem('electrical-work-engineer-electrical-machine-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('electrical-work-engineer-electrical-machine-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]);
  };

  const topics = [
    {
      id: 'transformer',
      name: '변압기',
      icon: '🔄',
      questions: [
        { id: 1, question: '변압기의 원리와 전압비를 설명하시오.', answer: 'V1/V2 = N1/N2, 상호유도에 의한 전압변환', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 변압기의 원리와 전압비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변압기 원리\n2. 전압비 유도\n3. 권수비와의 관계\n4. 적용 예시\n5. 연습문제 3개' },
        { id: 2, question: '변압기 등가회로를 그리고 설명하시오.', answer: '1차 임피던스, 여자어드미턴스, 2차 임피던스 환산', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 변압기 등가회로를 그리고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등가회로 구성\n2. 각 요소 의미\n3. 간이 등가회로\n4. 계산 활용\n5. 연습문제 3개' },
        { id: 3, question: '변압기의 전압변동률을 계산하시오.', answer: 'ε = (Pcosθ + qsinθ) × 100%, %임피던스 활용', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 변압기의 전압변동률을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 전압변동률 정의\n2. 계산 공식\n3. 영향 인자\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 4, question: '변압기 결선방식(Y-Δ, Δ-Y 등)을 비교하시오.', answer: 'Y-Δ: 승압용, Δ-Y: 강압용, 3고조파 제거', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 변압기 결선방식(Y-Δ, Δ-Y 등)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 결선방식 종류\n2. 각 결선 특징\n3. 위상변위\n4. 적용 선택\n5. 연습문제 3개' },
        { id: 5, question: '변압기 병렬운전 조건을 설명하시오.', answer: '극성일치, 전압동일, 위상일치, %임피던스 동일', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 변압기 병렬운전 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 병렬운전 목적\n2. 필수 조건\n3. 부하분담\n4. 조건 미충족시 문제\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'induction',
      name: '유도전동기',
      icon: '⚙️',
      questions: [
        { id: 6, question: '3상 유도전동기의 원리와 슬립을 설명하시오.', answer: '회전자계에 의한 유도, s = (Ns-N)/Ns', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 3상 유도전동기의 원리와 슬립을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회전자계 원리\n2. 유도 기전력\n3. 슬립 정의\n4. 동기속도 계산\n5. 연습문제 3개' },
        { id: 7, question: '유도전동기의 등가회로를 그리고 설명하시오.', answer: '고정자/회전자 임피던스, 기계적 출력 등가저항', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 유도전동기의 등가회로를 그리고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등가회로 구성\n2. 슬립 반영\n3. 출력 계산\n4. 효율 산정\n5. 연습문제 3개' },
        { id: 8, question: '유도전동기의 토크-속도 특성을 설명하시오.', answer: '기동토크, 최대토크, 정격토크, 슬립과의 관계', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 유도전동기의 토크-속도 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토크 공식\n2. 특성곡선\n3. 최대토크 조건\n4. 안정/불안정 영역\n5. 연습문제 3개' },
        { id: 9, question: '유도전동기 기동법을 비교하시오.', answer: '직입/Y-Δ/리액터/기동보상기/인버터 기동', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 유도전동기 기동법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기동법 종류\n2. 기동전류/토크 비교\n3. 적용 조건\n4. 장단점\n5. 연습문제 3개' },
        { id: 10, question: '유도전동기 속도제어법을 설명하시오.', answer: '극수변환/전압제어/주파수제어/2차저항제어', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 유도전동기 속도제어법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 속도제어 원리\n2. 제어방법별 특성\n3. 인버터 제어\n4. 적용 선정\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'synchronous',
      name: '동기기',
      icon: '🔋',
      questions: [
        { id: 11, question: '동기발전기의 원리와 특성을 설명하시오.', answer: '계자에 의한 유기기전력, 동기속도 = 120f/P', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 동기발전기의 원리와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발전 원리\n2. 동기속도\n3. 유기기전력\n4. 출력 특성\n5. 연습문제 3개' },
        { id: 12, question: '동기발전기의 병렬운전 조건을 설명하시오.', answer: '기전력크기/주파수/위상/상순서 일치', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 동기발전기의 병렬운전 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 병렬운전 목적\n2. 조건 4가지\n3. 동기검정기\n4. 병입 절차\n5. 연습문제 3개' },
        { id: 13, question: '동기전동기의 특성과 용도를 설명하시오.', answer: '정속도 운전, 역률조정, 대용량 부하', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 동기전동기의 특성과 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운전 특성\n2. 역률 조정\n3. 기동법\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 14, question: '동기조상기의 원리와 용도를 설명하시오.', answer: '무부하 운전으로 진상/지상 무효전력 공급', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 동기조상기의 원리와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원리 설명\n2. V곡선\n3. 역률개선\n4. 콘덴서와 비교\n5. 연습문제 3개' },
        { id: 15, question: '동기기의 단락비와 %동기임피던스를 설명하시오.', answer: '단락비 = If0/Ifn, %Zs = 1/단락비 × 100', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 동기기의 단락비와 %동기임피던스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단락비 정의\n2. 측정 방법\n3. 특성 영향\n4. 계산 예시\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'dc',
      name: '직류기',
      icon: '⚡',
      questions: [
        { id: 16, question: '직류발전기의 원리와 종류를 설명하시오.', answer: '전자유도, 타여자/자여자(분권/직권/복권)', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 직류발전기의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발전 원리\n2. 여자 방식\n3. 종류별 특성\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 17, question: '직류전동기의 속도특성을 비교하시오.', answer: '분권-정속도, 직권-변속도, 복권-중간특성', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 직류전동기의 속도특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 속도 공식\n2. 종류별 특성\n3. 특성곡선\n4. 용도 선정\n5. 연습문제 3개' },
        { id: 18, question: '직류전동기의 속도제어법을 설명하시오.', answer: '전압제어/계자제어/저항제어, 제어범위', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 직류전동기의 속도제어법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 속도 공식 분석\n2. 제어방법별 특성\n3. 제어범위\n4. 적용 선정\n5. 연습문제 3개' },
        { id: 19, question: '직류기의 전기자반작용을 설명하시오.', answer: '주자속 왜곡, 감자작용, 보상권선 설치', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 직류기의 전기자반작용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기자반작용 원인\n2. 자속 왜곡\n3. 감자 효과\n4. 보상 방법\n5. 연습문제 3개' },
        { id: 20, question: '직류기의 정류작용과 정류개선법을 설명하시오.', answer: '정류자에 의한 교류→직류, 보극/저항정류', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 직류기의 정류작용과 정류개선법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정류 원리\n2. 정류 종류\n3. 불량정류 원인\n4. 개선 방법\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'special',
      name: '특수전동기',
      icon: '🔧',
      questions: [
        { id: 21, question: '단상유도전동기의 종류와 특성을 설명하시오.', answer: '분상기동/콘덴서기동/셰이딩코일형', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 단상유도전동기의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단상 유도전동기 원리\n2. 종류별 구조\n3. 기동 특성\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 22, question: '서보모터의 원리와 종류를 설명하시오.', answer: 'AC서보/DC서보/스테핑모터, 위치제어용', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 서보모터의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서보모터 원리\n2. 종류별 특성\n3. 제어 방식\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 23, question: '브러시리스 DC모터(BLDC)의 원리를 설명하시오.', answer: '영구자석 회전자, 전자정류, 고효율', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 브러시리스 DC모터(BLDC)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조 및 원리\n2. 정류 방식\n3. 장단점\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 24, question: '리니어모터의 원리와 종류를 설명하시오.', answer: '직선운동, LIM/LSM, 자기부상열차 적용', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 리니어모터의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리니어모터 원리\n2. 종류 분류\n3. 특성\n4. 적용 사례\n5. 연습문제 3개' },
        { id: 25, question: '스테핑모터의 원리와 특성을 설명하시오.', answer: '펄스에 의한 스텝각 회전, VR/PM/HB형', prompt: '전기공사기사 전기기기 문제입니다.\n\n문제: 스테핑모터의 원리와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구동 원리\n2. 종류별 특성\n3. 스텝각 계산\n4. 적용 분야\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'calculation',
      name: '계산문제',
      icon: '🔢',
      questions: [
        { id: 26, question: '1차 6600V, 2차 220V, 용량 100kVA 변압기의 1차/2차 정격전류를 구하시오.', answer: 'I1 = 100000/6600 = 15.15A, I2 = 100000/220 = 454.5A', prompt: '전기공사기사 전기기기 계산 문제입니다.\n\n문제: 1차 6600V, 2차 220V, 용량 100kVA 변압기의 1차/2차 정격전류를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 계산 과정\n3. 답 도출\n4. 검증\n5. 유사문제 3개' },
        { id: 27, question: '4극, 60Hz 유도전동기의 동기속도와 슬립 5%일 때 회전속도를 구하시오.', answer: 'Ns = 120×60/4 = 1800rpm, N = 1800×(1-0.05) = 1710rpm', prompt: '전기공사기사 전기기기 계산 문제입니다.\n\n문제: 4극, 60Hz 유도전동기의 동기속도와 슬립 5%일 때 회전속도를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 동기속도 공식\n2. 슬립 공식\n3. 계산 과정\n4. 답 확인\n5. 유사문제 3개' },
        { id: 28, question: '10kW, 효율 90%인 전동기의 입력전력과 손실을 구하시오.', answer: 'Pin = 10/0.9 = 11.11kW, 손실 = 11.11-10 = 1.11kW', prompt: '전기공사기사 전기기기 계산 문제입니다.\n\n문제: 10kW, 효율 90%인 전동기의 입력전력과 손실을 구하시오.\n\n다음 순서로 설명해주세요:\n1. 효율 공식\n2. 입력 계산\n3. 손실 계산\n4. 검증\n5. 유사문제 3개' },
        { id: 29, question: '6극 동기발전기가 1200rpm으로 운전시 주파수를 구하시오.', answer: 'f = P×N/120 = 6×1200/120 = 60Hz', prompt: '전기공사기사 전기기기 계산 문제입니다.\n\n문제: 6극 동기발전기가 1200rpm으로 운전시 주파수를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 주파수 공식\n2. 대입 계산\n3. 답 도출\n4. 역계산 확인\n5. 유사문제 3개' },
        { id: 30, question: '200V, 20A, 1500rpm 직류분권전동기의 출력을 구하시오. (효율 85%)', answer: 'P = V×I×η = 200×20×0.85 = 3400W = 3.4kW', prompt: '전기공사기사 전기기기 계산 문제입니다.\n\n문제: 200V, 20A, 1500rpm 직류분권전동기의 출력을 구하시오. (효율 85%)\n\n다음 순서로 설명해주세요:\n1. 출력 공식\n2. 입력 계산\n3. 효율 적용\n4. 답 확인\n5. 유사문제 3개' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electrical-work-engineer" className="text-gray-600 hover:text-amber-600">전기공사기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">전기기기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">← 전기공사기사</Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚡</span>
            <div>
              <h1 className="text-2xl font-bold">전기기기</h1>
              <p className="text-amber-100">변압기, 유도전동기, 동기기, 직류기</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="bg-white h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-amber-100 text-sm mt-2">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.filter((q) => completedQuestions.includes(q.id)).length}/{topic.questions.length} 완료</p>
                  </div>
                </div>
                <span className="text-2xl text-gray-400">{expandedTopics.includes(topic.id) ? '−' : '+'}</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 ${completedQuestions.includes(q.id) ? 'bg-green-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions.includes(q.id) && '✓'}</button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-amber-600 mt-1">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
