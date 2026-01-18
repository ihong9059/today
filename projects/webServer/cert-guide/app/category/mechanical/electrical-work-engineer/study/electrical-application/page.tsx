'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function ElectricalApplicationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['lighting']);

  useEffect(() => {
    const saved = localStorage.getItem('electrical-work-engineer-electrical-application-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('electrical-work-engineer-electrical-application-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const topics = [
    {
      id: 'lighting',
      name: '조명공학',
      icon: '💡',
      questions: [
        { id: 1, question: '조도(lux)의 정의와 계산식을 설명하시오.', answer: '조도 = 광속(lm) / 면적(㎡), 단위면적당 입사광속', prompt: '전기공사기사 조명공학 문제입니다.\n\n문제: 조도(lux)의 정의와 계산식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조도의 정의\n2. 계산공식 유도\n3. 실무 적용 예시\n4. 관련 개념(광속, 광도)\n5. 연습문제 3개' },
        { id: 2, question: '광속법에 의한 실내조명 설계 순서를 설명하시오.', answer: '소요조도 결정 → 광원선정 → 조명률/감광보상률 적용 → 등기구 수 산출', prompt: '전기공사기사 조명공학 문제입니다.\n\n문제: 광속법에 의한 실내조명 설계 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 광속법의 원리\n2. 설계 단계별 설명\n3. 계산 예시\n4. 주의사항\n5. 연습문제 3개' },
        { id: 3, question: '실내 조명률(U)에 영향을 미치는 요소를 설명하시오.', answer: '실지수(K), 반사율, 조명기구 배광특성, 천장높이', prompt: '전기공사기사 조명공학 문제입니다.\n\n문제: 실내 조명률(U)에 영향을 미치는 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조명률 정의\n2. 영향 요소 분석\n3. 실지수 계산법\n4. 조명률표 활용법\n5. 연습문제 3개' },
        { id: 4, question: 'LED 조명의 특성과 장단점을 설명하시오.', answer: '고효율, 장수명, 즉시점등, 초기비용 높음', prompt: '전기공사기사 조명공학 문제입니다.\n\n문제: LED 조명의 특성과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LED 발광원리\n2. 전기적 특성\n3. 장단점 비교\n4. 적용사례\n5. 연습문제 3개' },
        { id: 5, question: '도로조명 설계시 고려사항을 설명하시오.', answer: '노면휘도, 균제도, 글레어 제한, 유도성', prompt: '전기공사기사 조명공학 문제입니다.\n\n문제: 도로조명 설계시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도로조명 목적\n2. 설계 고려사항\n3. 배치방식\n4. 기준 규정\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'heating',
      name: '전열공학',
      icon: '🔥',
      questions: [
        { id: 6, question: '전기가열의 종류와 특징을 설명하시오.', answer: '저항가열, 아크가열, 유도가열, 유전가열, 적외선가열', prompt: '전기공사기사 전열공학 문제입니다.\n\n문제: 전기가열의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가열방식 분류\n2. 각 방식의 원리\n3. 장단점 비교\n4. 적용분야\n5. 연습문제 3개' },
        { id: 7, question: '열량 계산 공식(Q=0.24I²Rt)을 유도하시오.', answer: 'P=I²R, E=Pt, 1cal=4.186J, Q=0.24Pt', prompt: '전기공사기사 전열공학 문제입니다.\n\n문제: 열량 계산 공식(Q=0.24I²Rt)을 유도하시오.\n\n다음 순서로 설명해주세요:\n1. 줄의 법칙\n2. 공식 유도 과정\n3. 단위 환산\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 8, question: '유도가열의 원리와 적용을 설명하시오.', answer: '와전류 손실에 의한 발열, 금속 열처리/용해', prompt: '전기공사기사 전열공학 문제입니다.\n\n문제: 유도가열의 원리와 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자유도 원리\n2. 와전류 발생\n3. 가열 효율\n4. 산업 응용\n5. 연습문제 3개' },
        { id: 9, question: '전기로의 열손실 종류와 방지대책을 설명하시오.', answer: '전도손실, 대류손실, 복사손실 → 단열재, 반사판', prompt: '전기공사기사 전열공학 문제입니다.\n\n문제: 전기로의 열손실 종류와 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열전달 3가지 방식\n2. 손실 계산법\n3. 방지대책\n4. 효율 향상 방법\n5. 연습문제 3개' },
        { id: 10, question: '히트펌프의 원리와 성능계수(COP)를 설명하시오.', answer: '냉매 사이클, COP = Q/W = 냉난방능력/소비전력', prompt: '전기공사기사 전열공학 문제입니다.\n\n문제: 히트펌프의 원리와 성능계수(COP)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 히트펌프 원리\n2. 냉매 사이클\n3. COP 계산\n4. 효율 향상 방안\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'electrochemistry',
      name: '전기화학',
      icon: '🔋',
      questions: [
        { id: 11, question: '전해의 법칙(패러데이 법칙)을 설명하시오.', answer: 'W=kIt=AIt/96500, 전기량에 비례하는 전착량', prompt: '전기공사기사 전기화학 문제입니다.\n\n문제: 전해의 법칙(패러데이 법칙)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1법칙 설명\n2. 제2법칙 설명\n3. 공식 유도\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 12, question: '전기도금의 원리와 도금액 조건을 설명하시오.', answer: '전해환원에 의한 금속피막 형성, pH/온도/전류밀도 제어', prompt: '전기공사기사 전기화학 문제입니다.\n\n문제: 전기도금의 원리와 도금액 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기도금 원리\n2. 도금액 조성\n3. 공정 조건\n4. 품질관리\n5. 연습문제 3개' },
        { id: 13, question: '2차전지(축전지)의 종류와 특성을 비교하시오.', answer: '연축전지, Ni-Cd, Ni-MH, Li-ion 등 에너지밀도/수명 비교', prompt: '전기공사기사 전기화학 문제입니다.\n\n문제: 2차전지(축전지)의 종류와 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 전지 종류\n2. 작동원리\n3. 특성 비교표\n4. 용도별 선정\n5. 연습문제 3개' },
        { id: 14, question: '연축전지의 충방전 특성을 설명하시오.', answer: '충전: PbSO4→Pb+PbO2, 방전: 역반응, 단자전압 2.0~2.7V', prompt: '전기공사기사 전기화학 문제입니다.\n\n문제: 연축전지의 충방전 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학반응식\n2. 충전특성곡선\n3. 방전특성곡선\n4. 수명관리\n5. 연습문제 3개' },
        { id: 15, question: '전기분해에 의한 물의 전해 조건을 설명하시오.', answer: '2H2O→2H2+O2, 이론분해전압 1.23V, 과전압 고려', prompt: '전기공사기사 전기화학 문제입니다.\n\n문제: 전기분해에 의한 물의 전해 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기분해 원리\n2. 분해전압\n3. 과전압 개념\n4. 효율 계산\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'motor-application',
      name: '전동력응용',
      icon: '⚙️',
      questions: [
        { id: 16, question: '전동기 용량 산정 방법을 설명하시오.', answer: 'P=Tω/η=FV/η, 부하특성 고려, 여유율 적용', prompt: '전기공사기사 전동력응용 문제입니다.\n\n문제: 전동기 용량 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용량 산정 공식\n2. 부하 종류별 계산\n3. 여유율 적용\n4. 선정 예시\n5. 연습문제 3개' },
        { id: 17, question: '펌프용 전동기 용량 계산식을 유도하시오.', answer: 'P=ρgQH/(η×1000) [kW], 양정/유량/효율 고려', prompt: '전기공사기사 전동력응용 문제입니다.\n\n문제: 펌프용 전동기 용량 계산식을 유도하시오.\n\n다음 순서로 설명해주세요:\n1. 수력학 기초\n2. 공식 유도\n3. 효율 고려\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 18, question: '엘리베이터 전동기 용량 산정을 설명하시오.', answer: 'P=WV/6120η [kW], 적재하중/속도/밸런스', prompt: '전기공사기사 전동력응용 문제입니다.\n\n문제: 엘리베이터 전동기 용량 산정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 승강기 구조\n2. 용량 계산식\n3. 평형추 역할\n4. 선정 시 고려사항\n5. 연습문제 3개' },
        { id: 19, question: '전동기 기동방식 종류와 특징을 비교하시오.', answer: '직입/Y-Δ/리액터/인버터 기동, 기동전류/토크 비교', prompt: '전기공사기사 전동력응용 문제입니다.\n\n문제: 전동기 기동방식 종류와 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기동방식 분류\n2. 각 방식 원리\n3. 기동특성 비교\n4. 적용 선정\n5. 연습문제 3개' },
        { id: 20, question: '인버터에 의한 전동기 속도제어를 설명하시오.', answer: 'V/f 일정제어, 벡터제어, 고조파 대책', prompt: '전기공사기사 전동력응용 문제입니다.\n\n문제: 인버터에 의한 전동기 속도제어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인버터 원리\n2. V/f 제어\n3. 벡터 제어\n4. 고조파 대책\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'advanced',
      name: '심화 응용',
      icon: '📊',
      questions: [
        { id: 21, question: '전력저장장치(ESS)의 종류와 특징을 설명하시오.', answer: '배터리, 플라이휠, SMES, 양수발전 등', prompt: '전기공사기사 전기응용 문제입니다.\n\n문제: 전력저장장치(ESS)의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ESS 종류\n2. 각 방식의 원리\n3. 특성 비교\n4. 적용 사례\n5. 연습문제 3개' },
        { id: 22, question: '태양광 발전 시스템 구성을 설명하시오.', answer: '태양전지모듈, 인버터, 계통연계장치, 보호장치', prompt: '전기공사기사 전기응용 문제입니다.\n\n문제: 태양광 발전 시스템 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 구성요소\n2. 각 요소 기능\n3. 용량 산정\n4. 설치 시 고려사항\n5. 연습문제 3개' },
        { id: 23, question: '전기자동차 충전설비 종류와 특징을 설명하시오.', answer: '완속충전(7kW), 급속충전(50~350kW), 규격별 특성', prompt: '전기공사기사 전기응용 문제입니다.\n\n문제: 전기자동차 충전설비 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충전 방식 분류\n2. 충전규격\n3. 설치기준\n4. 배선 설계\n5. 연습문제 3개' },
        { id: 24, question: '비상전원설비(UPS, 발전기)를 비교 설명하시오.', answer: 'UPS: 무순단전환, 발전기: 대용량, 상호보완', prompt: '전기공사기사 전기응용 문제입니다.\n\n문제: 비상전원설비(UPS, 발전기)를 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UPS 원리와 종류\n2. 발전기 특성\n3. 비교표\n4. 적용 선정\n5. 연습문제 3개' },
        { id: 25, question: '전력품질 개선 방법을 설명하시오.', answer: '고조파필터, 무효전력보상, 전압조정, 역률개선', prompt: '전기공사기사 전기응용 문제입니다.\n\n문제: 전력품질 개선 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전력품질 문제\n2. 개선 방법\n3. 설비 종류\n4. 적용 사례\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'calculation',
      name: '계산문제',
      icon: '🔢',
      questions: [
        { id: 26, question: '사무실(20×15m) 평균조도 500lux 설계시 등기구 수를 구하시오. (조명률 0.6, 감광보상률 1.4, 램프광속 3000lm)', answer: 'N = E×A×M/(F×U) = 500×300×1.4/(3000×0.6) = 117개', prompt: '전기공사기사 조명계산 문제입니다.\n\n문제: 사무실(20×15m) 평균조도 500lux 설계시 등기구 수를 구하시오. (조명률 0.6, 감광보상률 1.4, 램프광속 3000lm)\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 단계별 계산\n3. 답 도출\n4. 검토\n5. 유사문제 3개' },
        { id: 27, question: '100kg의 물을 20°C에서 80°C로 가열하는데 필요한 전력량을 구하시오. (효율 90%)', answer: 'Q = mcΔT/η = 100×1×60/0.9 = 6667kcal = 7.75kWh', prompt: '전기공사기사 전열계산 문제입니다.\n\n문제: 100kg의 물을 20°C에서 80°C로 가열하는데 필요한 전력량을 구하시오. (효율 90%)\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 단계별 계산\n3. 단위환산\n4. 답 도출\n5. 유사문제 3개' },
        { id: 28, question: '양정 50m, 유량 0.5㎥/min 펌프의 전동기 용량을 구하시오. (펌프효율 80%, 전동기효율 90%)', answer: 'P = ρgQH/(η×60) = 1000×9.8×0.5×50/(0.8×0.9×60×1000) = 5.67kW', prompt: '전기공사기사 전동력 계산 문제입니다.\n\n문제: 양정 50m, 유량 0.5㎥/min 펌프의 전동기 용량을 구하시오. (펌프효율 80%, 전동기효율 90%)\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 단위 환산\n3. 대입 계산\n4. 여유율 고려\n5. 유사문제 3개' },
        { id: 29, question: '전해도금시 10A로 2시간 동안 석출되는 구리(Cu)의 양을 구하시오. (Cu 원자량 63.5, 원자가 2)', answer: 'W = AIt/nF = 63.5×10×7200/(2×96500) = 23.7g', prompt: '전기공사기사 전기화학 계산 문제입니다.\n\n문제: 전해도금시 10A로 2시간 동안 석출되는 구리(Cu)의 양을 구하시오. (Cu 원자량 63.5, 원자가 2)\n\n다음 순서로 설명해주세요:\n1. 패러데이 법칙\n2. 공식 적용\n3. 단위 확인\n4. 답 도출\n5. 유사문제 3개' },
        { id: 30, question: '적재하중 1000kg, 속도 90m/min 엘리베이터의 전동기 용량을 구하시오. (효율 85%)', answer: 'P = WV/(6120η) = 1000×90/(6120×0.85) = 17.3kW', prompt: '전기공사기사 승강기 계산 문제입니다.\n\n문제: 적재하중 1000kg, 속도 90m/min 엘리베이터의 전동기 용량을 구하시오. (효율 85%)\n\n다음 순서로 설명해주세요:\n1. 공식 유도\n2. 대입 계산\n3. 평형추 고려\n4. 여유율 적용\n5. 유사문제 3개' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electrical-work-engineer" className="text-gray-600 hover:text-amber-600">전기공사기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">전기응용</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">← 전기공사기사</Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">💡</span>
            <div>
              <h1 className="text-2xl font-bold">전기응용</h1>
              <p className="text-amber-100">조명공학, 전열공학, 전기화학, 전동력응용</p>
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
                        <button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-amber-600 mt-1">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
