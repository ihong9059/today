'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ElectricalEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['general']);

  useEffect(() => {
    const saved = localStorage.getItem('electrical-work-engineer-electrical-equipment-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('electrical-work-engineer-electrical-equipment-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]);
  };

  const topics = [
    {
      id: 'general',
      name: '총칙 및 정의',
      icon: '📖',
      questions: [
        { id: 1, question: '전기설비기술기준(KEC)의 목적과 적용범위를 설명하시오.', answer: '전기설비의 안전 확보, 전기사업법에 따른 모든 전기설비', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 전기설비기술기준(KEC)의 목적과 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KEC 제정 목적\n2. 적용범위\n3. 타 기준과의 관계\n4. 주요 개정내용\n5. 연습문제 3개' },
        { id: 2, question: '저압, 고압, 특고압의 전압구분을 설명하시오.', answer: '저압: 1kV 이하, 고압: 1~7kV, 특고압: 7kV 초과', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 저압, 고압, 특고압의 전압구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압 분류 기준\n2. 각 전압별 특성\n3. 시설기준 차이\n4. 적용 사례\n5. 연습문제 3개' },
        { id: 3, question: '전로의 절연저항 기준값을 설명하시오.', answer: '300V 이하: 0.1MΩ, 300V 초과: 0.2MΩ, 400V 초과: 0.4MΩ', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 전로의 절연저항 기준값을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연저항 기준표\n2. 측정 방법\n3. 판정 기준\n4. 불량시 조치\n5. 연습문제 3개' },
        { id: 4, question: '절연내력시험 전압과 시험시간을 설명하시오.', answer: '최대사용전압×1.5배(1분), 교류시험 또는 직류시험', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 절연내력시험 전압과 시험시간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험전압 산정\n2. 시험방법\n3. 판정기준\n4. 주의사항\n5. 연습문제 3개' },
        { id: 5, question: '과전류차단기의 시설 기준을 설명하시오.', answer: '전로의 각 극에 시설, 정격전류 이하 차단, 보호협조', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 과전류차단기의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시설 위치\n2. 정격 선정\n3. 보호협조\n4. 생략 조건\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'lowvoltage',
      name: '저압 전기설비',
      icon: '🔌',
      questions: [
        { id: 6, question: '저압 옥내배선의 시설 기준을 설명하시오.', answer: '사용전압 600V 이하, 절연전선 사용, 배선방법별 시설', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 저압 옥내배선의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 범위\n2. 전선 종류\n3. 배선 방법\n4. 시설 조건\n5. 연습문제 3개' },
        { id: 7, question: '합성수지관공사의 시설 기준을 설명하시오.', answer: 'CD관/PF관 사용, 굴곡반경, 박스 연결, 지지점 간격', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 합성수지관공사의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관 종류\n2. 시설 조건\n3. 굴곡 및 지지\n4. 접속 방법\n5. 연습문제 3개' },
        { id: 8, question: '금속관공사의 시설 기준을 설명하시오.', answer: '두께 1.2mm 이상, 접지공사, 박스 사용, 전선 점유율', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 금속관공사의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관 규격\n2. 접지 요구\n3. 시설 조건\n4. 전선 점유율\n5. 연습문제 3개' },
        { id: 9, question: '케이블공사의 시설 기준을 설명하시오.', answer: '케이블 종류, 허용곡률반경, 지지점 간격, 방호장치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 케이블공사의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 케이블 종류\n2. 허용 굴곡\n3. 지지 간격\n4. 방호 방법\n5. 연습문제 3개' },
        { id: 10, question: '저압 전동기 회로의 시설 기준을 설명하시오.', answer: '과부하보호, 단락보호, 개폐기, 배선 굵기 선정', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 저압 전동기 회로의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호장치 종류\n2. 배선 선정\n3. 개폐기 용량\n4. 시설 조건\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'grounding',
      name: '접지설비',
      icon: '⚡',
      questions: [
        { id: 11, question: '접지의 목적과 종류를 설명하시오.', answer: '감전방지/기기보호/뇌해방지, 계통접지/보호접지/피뢰접지', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 접지의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 목적\n2. 접지 종류\n3. 각 접지 특성\n4. 적용 사례\n5. 연습문제 3개' },
        { id: 12, question: 'KEC 접지시스템 방식을 설명하시오.', answer: 'TN계통(TN-C, TN-S, TN-C-S), TT계통, IT계통', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: KEC 접지시스템 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TN계통 설명\n2. TT계통 설명\n3. IT계통 설명\n4. 적용 선택\n5. 연습문제 3개' },
        { id: 13, question: '접지저항값 기준을 설명하시오.', answer: '저압: 100Ω 이하, 고압: 10Ω 이하, 특고압: 10Ω 이하', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 접지저항값 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압별 기준\n2. 측정 방법\n3. 저감 대책\n4. 검사 주기\n5. 연습문제 3개' },
        { id: 14, question: '접지극의 종류와 시설을 설명하시오.', answer: '접지봉/접지판/매설지선, 매설깊이, 상호이격거리', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 접지극의 종류와 시설을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지극 종류\n2. 규격 기준\n3. 매설 조건\n4. 시공 방법\n5. 연습문제 3개' },
        { id: 15, question: '등전위본딩의 목적과 방법을 설명하시오.', answer: '전위차 해소, 금속체 상호 연결, 접지단자함 설치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 등전위본딩의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등전위본딩 목적\n2. 본딩 대상\n3. 시설 방법\n4. 도체 규격\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'highvoltage',
      name: '고압/특고압 설비',
      icon: '🔋',
      questions: [
        { id: 16, question: '고압 수전설비의 구성을 설명하시오.', answer: '인입구배선/주차단장치/계량장치/배전반/보호장치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 고압 수전설비의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수전설비 구성\n2. 각 장치 기능\n3. 시설 기준\n4. 보호 협조\n5. 연습문제 3개' },
        { id: 17, question: '변압기 시설 기준을 설명하시오.', answer: '이격거리, 방유턱, 환기설비, 소방설비', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 변압기 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 장소\n2. 이격 거리\n3. 안전 설비\n4. 방화 대책\n5. 연습문제 3개' },
        { id: 18, question: '고압 케이블의 시설 기준을 설명하시오.', answer: 'CV/XLPE 케이블, 허용전류, 매설심도, 이격거리', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 고압 케이블의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 케이블 종류\n2. 허용전류 계산\n3. 매설 기준\n4. 접속 방법\n5. 연습문제 3개' },
        { id: 19, question: '큐비클(폐쇄형 배전반)의 시설 기준을 설명하시오.', answer: '충전부 절연, 인터록, 접지, 표시장치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 큐비클(폐쇄형 배전반)의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 큐비클 구조\n2. 안전장치\n3. 시설 조건\n4. 유지관리\n5. 연습문제 3개' },
        { id: 20, question: '진상용 콘덴서 설비의 시설 기준을 설명하시오.', answer: '방전장치, 보호장치, 과전류차단기, 개폐장치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 진상용 콘덴서 설비의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콘덴서 용량 선정\n2. 보호장치\n3. 방전 장치\n4. 시설 조건\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'safety',
      name: '안전 시설',
      icon: '🛡️',
      questions: [
        { id: 21, question: '누전차단기의 시설 기준을 설명하시오.', answer: '감도전류 30mA, 동작시간 0.03초, 시설 장소', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 누전차단기의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시설 의무\n2. 정격 선정\n3. 동작 특성\n4. 시험 방법\n5. 연습문제 3개' },
        { id: 22, question: '피뢰설비의 시설 기준을 설명하시오.', answer: '수뢰부, 인하도선, 접지극, 보호각/회전구체법', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 피뢰설비의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피뢰설비 구성\n2. 보호범위 산정\n3. 시설 기준\n4. 접지 요구\n5. 연습문제 3개' },
        { id: 23, question: '비상전원 설비의 시설 기준을 설명하시오.', answer: '비상발전기, UPS, 축전지설비, 절환시간', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 비상전원 설비의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비상전원 종류\n2. 용량 산정\n3. 시설 기준\n4. 시험 방법\n5. 연습문제 3개' },
        { id: 24, question: '전기화재 예방을 위한 시설 기준을 설명하시오.', answer: '과전류보호, 절연감시, 아크차단기, 불연재 사용', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 전기화재 예방을 위한 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재 원인\n2. 예방 설비\n3. 시설 기준\n4. 점검 항목\n5. 연습문제 3개' },
        { id: 25, question: '감전방지 대책을 설명하시오.', answer: '절연, 접지, 누전차단, 보호접지, 등전위본딩', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 감전방지 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감전 원인\n2. 방지 대책\n3. 보호장치\n4. 안전조치\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'special',
      name: '특수장소 시설',
      icon: '⚠️',
      questions: [
        { id: 26, question: '폭발위험장소의 전기설비 시설 기준을 설명하시오.', answer: '방폭구조, Zone 분류, 방폭기기 선정', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 폭발위험장소의 전기설비 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험장소 분류\n2. 방폭구조 종류\n3. 기기 선정\n4. 시설 기준\n5. 연습문제 3개' },
        { id: 27, question: '수중조명의 시설 기준을 설명하시오.', answer: '절연변압기, 방수등급 IP68, 저전압 사용', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 수중조명의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용전압 제한\n2. 방수 등급\n3. 보호장치\n4. 시설 조건\n5. 연습문제 3개' },
        { id: 28, question: '의료장소의 전기설비 시설 기준을 설명하시오.', answer: '의료IT계통, 절연감시, 등전위본딩, 비상전원', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 의료장소의 전기설비 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의료장소 분류\n2. 접지시스템\n3. 보호장치\n4. 비상전원\n5. 연습문제 3개' },
        { id: 29, question: '전기욕조 등의 시설 기준을 설명하시오.', answer: '영역 구분, 보호등급, 등전위본딩, SELV 사용', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 전기욕조 등의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역 구분\n2. 허용 기기\n3. 보호장치\n4. 시설 조건\n5. 연습문제 3개' },
        { id: 30, question: '태양광발전설비의 시설 기준을 설명하시오.', answer: '어레이 접지, 계통연계, 역전력 방지, 보호장치', prompt: '전기공사기사 전기설비기술기준 문제입니다.\n\n문제: 태양광발전설비의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비 구성\n2. 접지 시설\n3. 보호장치\n4. 계통연계\n5. 연습문제 3개' },
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
            <span className="text-amber-600 font-medium">전기설비기술기준</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">← 전기공사기사</Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-2xl font-bold">전기설비기술기준</h1>
              <p className="text-amber-100">KEC 기준, 저압/고압 시설, 접지설비, 안전시설</p>
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
