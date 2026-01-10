'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['planning']);

  useEffect(() => {
    const saved = localStorage.getItem('electrical-work-engineer-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('electrical-work-engineer-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]);
  };

  const topics = [
    {
      id: 'planning',
      name: '공사계획 수립',
      icon: '📋',
      questions: [
        { id: 1, question: '전기공사 설계도서의 구성을 설명하시오.', answer: '시방서/도면/산출내역서/공정표/자재명세서', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기공사 설계도서의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계도서 종류\n2. 각 도서 내용\n3. 작성 요령\n4. 활용 방법\n5. 연습문제 3개' },
        { id: 2, question: '전기공사비 산출 방법을 설명하시오.', answer: '재료비+노무비+경비+일반관리비+이윤', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기공사비 산출 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공사비 구성\n2. 각 항목 산출\n3. 품셈 적용\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 3, question: '공정표 작성 방법을 설명하시오.', answer: '막대공정표/네트워크공정표, 주공정경로(CP)', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 공정표 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정표 종류\n2. 작업 분할\n3. 일정 계산\n4. 주공정 도출\n5. 연습문제 3개' },
        { id: 4, question: '전선 굵기 선정 기준을 설명하시오.', answer: '허용전류/전압강하/기계적강도/단락전류', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전선 굵기 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선정 기준\n2. 허용전류 계산\n3. 전압강하 검토\n4. 표 활용법\n5. 연습문제 3개' },
        { id: 5, question: '자재명세서 작성 방법을 설명하시오.', answer: '품명/규격/수량/단가/금액, 물량산출기준', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 자재명세서 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명세서 양식\n2. 물량 산출\n3. 할증률 적용\n4. 작성 예시\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'wiring',
      name: '배선공사',
      icon: '🔌',
      questions: [
        { id: 6, question: '전기배선도면 기호를 해석하시오.', answer: 'KS기호, 조명/콘센트/스위치/분전반 기호', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기배선도면 기호를 해석하시오.\n\n다음 순서로 설명해주세요:\n1. 조명 기호\n2. 콘센트 기호\n3. 스위치 기호\n4. 배선 기호\n5. 연습문제 3개' },
        { id: 7, question: '분전반 결선도 작성법을 설명하시오.', answer: '주간선/분기회로/보호장치/접지, 회로구성', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 분전반 결선도 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결선도 구성\n2. 회로 배분\n3. 차단기 선정\n4. 작성 예시\n5. 연습문제 3개' },
        { id: 8, question: '간선 굵기 계산 방법을 설명하시오.', answer: '허용전류법/전압강하법, 부하전류 산출', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 간선 굵기 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부하전류 계산\n2. 허용전류 검토\n3. 전압강하 계산\n4. 전선 선정\n5. 연습문제 3개' },
        { id: 9, question: '배관공사 물량 산출법을 설명하시오.', answer: '관종류/굵기/연장, 부속품 수량 산출', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 배관공사 물량 산출법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 종류\n2. 연장 산출\n3. 부속품 산출\n4. 할증 적용\n5. 연습문제 3개' },
        { id: 10, question: '조명설계 계산법을 설명하시오.', answer: '광속법, 조도기준/조명률/감광보상률', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 조명설계 계산법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소요조도 결정\n2. 광속법 계산\n3. 등기구 배치\n4. 계산 예시\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'installation',
      name: '기기설치공사',
      icon: '🔧',
      questions: [
        { id: 11, question: '수변전설비 결선도를 해석하시오.', answer: 'DS/PF/VCB/MOF/TR/배전반 구성 및 결선', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 수변전설비 결선도를 해석하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 기기\n2. 결선 순서\n3. 보호장치\n4. 접지계통\n5. 연습문제 3개' },
        { id: 12, question: '변압기 용량 선정을 계산하시오.', answer: '부하용량×수용률/역률, 표준용량 선정', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 변압기 용량 선정을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 부하 집계\n2. 수용률 적용\n3. 역률 보정\n4. 표준용량 선정\n5. 연습문제 3개' },
        { id: 13, question: '콘덴서 용량 산정법을 설명하시오.', answer: 'Qc = P(tanθ1-tanθ2), 역률개선 계산', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 콘덴서 용량 산정법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현재 역률\n2. 목표 역률\n3. 콘덴서 용량 계산\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 14, question: '전동기 회로 설계법을 설명하시오.', answer: '전동기용량/기동방식/전선/보호장치 선정', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전동기 회로 설계법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전동기 용량\n2. 기동방식 선정\n3. 전선 굵기\n4. 보호장치 선정\n5. 연습문제 3개' },
        { id: 15, question: '비상발전기 용량 산정법을 설명하시오.', answer: '비상부하×수용률/효율/역률, kVA 환산', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 비상발전기 용량 산정법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비상부하 집계\n2. 기동용량 고려\n3. 용량 계산\n4. 표준용량 선정\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'testing',
      name: '시운전 및 검사',
      icon: '🔍',
      questions: [
        { id: 16, question: '절연저항 측정 방법과 판정기준을 설명하시오.', answer: '메거 사용, 전압별 기준값 (0.1~0.4MΩ)', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 절연저항 측정 방법과 판정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 기기\n2. 측정 방법\n3. 판정 기준\n4. 불량시 조치\n5. 연습문제 3개' },
        { id: 17, question: '접지저항 측정 방법을 설명하시오.', answer: '접지저항계, 3극법/2극법, 보조접지극', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 접지저항 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 원리\n2. 3극법 절차\n3. 판정 기준\n4. 저감 대책\n5. 연습문제 3개' },
        { id: 18, question: '보호계전기 시험 방법을 설명하시오.', answer: 'OCR/OCGR 동작시험, 정정치 확인', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 보호계전기 시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 장비\n2. 동작치 확인\n3. 시간특성 시험\n4. 정정치 조정\n5. 연습문제 3개' },
        { id: 19, question: '변압기 시험 항목을 설명하시오.', answer: '절연저항/내전압/권선저항/변압비/무부하시험', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 변압기 시험 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 종류\n2. 시험 방법\n3. 판정 기준\n4. 기록 작성\n5. 연습문제 3개' },
        { id: 20, question: '전기설비 준공검사 절차를 설명하시오.', answer: '서류검사/외관검사/기능시험/성적서 작성', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기설비 준공검사 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 종류\n2. 검사 항목\n3. 시험 방법\n4. 성적서 작성\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'safety',
      name: '안전관리',
      icon: '⚠️',
      questions: [
        { id: 21, question: '전기작업 안전수칙을 설명하시오.', answer: '정전작업 5대 원칙, 활선작업 금지, 보호구 착용', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기작업 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정전작업 원칙\n2. 보호구 종류\n3. 작업 절차\n4. 금지 사항\n5. 연습문제 3개' },
        { id: 22, question: '감전사고 방지대책을 설명하시오.', answer: '절연/접지/보호장치/안전거리/교육훈련', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 감전사고 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감전 원인\n2. 방지 대책\n3. 보호장치\n4. 응급조치\n5. 연습문제 3개' },
        { id: 23, question: '전기화재 원인과 대책을 설명하시오.', answer: '과부하/단락/누전/접촉불량, 예방설비 설치', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기화재 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재 원인\n2. 예방 대책\n3. 점검 항목\n4. 소화 방법\n5. 연습문제 3개' },
        { id: 24, question: '전기안전관리자 직무를 설명하시오.', answer: '정기점검/기록관리/안전교육/공사감독', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기안전관리자 직무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 기준\n2. 직무 내용\n3. 점검 항목\n4. 기록 관리\n5. 연습문제 3개' },
        { id: 25, question: '전기설비 정기점검 항목을 설명하시오.', answer: '월간/연간 점검, 절연/접지/보호장치/외관', prompt: '전기공사기사 실기 문제입니다.\n\n문제: 전기설비 정기점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 주기\n2. 점검 항목\n3. 측정 방법\n4. 기록 관리\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'calculation',
      name: '종합계산',
      icon: '🔢',
      questions: [
        { id: 26, question: '3상 200kW 부하, 역률 0.8, 380V 간선의 전선굵기를 선정하시오.', answer: 'I = 200000/(√3×380×0.8) = 380A, CV 150㎟ 선정', prompt: '전기공사기사 실기 계산 문제입니다.\n\n문제: 3상 200kW 부하, 역률 0.8, 380V 간선의 전선굵기를 선정하시오.\n\n다음 순서로 설명해주세요:\n1. 전류 계산\n2. 허용전류표 확인\n3. 전압강하 검토\n4. 전선 선정\n5. 유사문제 3개' },
        { id: 27, question: '20×15m 사무실, 평균조도 500lux 설계시 40W LED등 수를 구하시오. (조명률 0.55, 감광보상률 1.4, 광속 4000lm)', answer: 'N = 500×300×1.4/(4000×0.55) = 95.5 → 96등', prompt: '전기공사기사 실기 계산 문제입니다.\n\n문제: 20×15m 사무실, 평균조도 500lux 설계시 40W LED등 수를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 광속법 공식\n2. 대입 계산\n3. 등기구 수\n4. 배치 계획\n5. 유사문제 3개' },
        { id: 28, question: '300kVA 변압기, 부하역률 0.85, 목표역률 0.95일 때 콘덴서 용량을 구하시오.', answer: 'P = 300×0.85 = 255kW, Qc = 255×(0.62-0.33) = 73.95kvar', prompt: '전기공사기사 실기 계산 문제입니다.\n\n문제: 300kVA 변압기, 부하역률 0.85, 목표역률 0.95일 때 콘덴서 용량을 구하시오.\n\n다음 순서로 설명해주세요:\n1. 유효전력 계산\n2. tan값 계산\n3. 콘덴서 용량\n4. 표준용량 선정\n5. 유사문제 3개' },
        { id: 29, question: '단상 3선식 100m, 부하 30A×2회로, 전압강하 3% 이내 전선을 선정하시오. (220V)', answer: 'e = 6.6V, A = 35.6×30×100/(1000×6.6) = 16.2㎟ → 25㎟', prompt: '전기공사기사 실기 계산 문제입니다.\n\n문제: 단상 3선식 100m, 부하 30A×2회로, 전압강하 3% 이내 전선을 선정하시오.\n\n다음 순서로 설명해주세요:\n1. 허용 전압강하\n2. 전선 굵기 계산\n3. 표준 규격 선정\n4. 검증\n5. 유사문제 3개' },
        { id: 30, question: '비상부하 100kW, 전동기 최대기동용량 30kW일 때 발전기 용량을 선정하시오.', answer: 'PG = 100×1.1 + 30×2.5 = 185kW → 200kVA 선정 (역률 0.8)', prompt: '전기공사기사 실기 계산 문제입니다.\n\n문제: 비상부하 100kW, 전동기 최대기동용량 30kW일 때 발전기 용량을 선정하시오.\n\n다음 순서로 설명해주세요:\n1. 정상부하 용량\n2. 기동용량 고려\n3. kVA 환산\n4. 표준용량 선정\n5. 유사문제 3개' },
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
            <span className="text-amber-600 font-medium">실기 대비</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">← 전기공사기사</Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">🔧</span>
            <div>
              <h1 className="text-2xl font-bold">실기 대비</h1>
              <p className="text-amber-100">공사계획, 배선공사, 기기설치, 시운전, 안전관리</p>
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
