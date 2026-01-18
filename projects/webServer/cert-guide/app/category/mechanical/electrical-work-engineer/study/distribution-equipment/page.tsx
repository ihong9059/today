'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function DistributionEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['system']);

  useEffect(() => {
    const saved = localStorage.getItem('electrical-work-engineer-distribution-equipment-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('electrical-work-engineer-distribution-equipment-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]);
  };

  const topics = [
    {
      id: 'system',
      name: '배전계통',
      icon: '🔌',
      questions: [
        { id: 1, question: '배전계통의 구성과 전압체계를 설명하시오.', answer: '22.9kV/380V/220V, 변전소-배전선-인입선-수용가', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전계통의 구성과 전압체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배전계통 개요\n2. 전압체계\n3. 구성요소\n4. 계통도\n5. 연습문제 3개' },
        { id: 2, question: '배전방식의 종류와 특징을 비교하시오.', answer: '방사상/환상/네트워크/스팟네트워크 방식', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전방식의 종류와 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 방사상 방식\n2. 환상 방식\n3. 네트워크 방식\n4. 비교표\n5. 연습문제 3개' },
        { id: 3, question: '전압강하 계산법을 설명하시오.', answer: 'e = IR cosθ + IX sinθ, 전선굵기 선정 기준', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 전압강하 계산법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압강하 공식\n2. 단상/3상 계산\n3. 허용 기준\n4. 전선 선정\n5. 연습문제 3개' },
        { id: 4, question: '역률과 역률개선의 효과를 설명하시오.', answer: 'cosθ = P/S, 전류감소/손실저감/전압강하 개선', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 역률과 역률개선의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역률 정의\n2. 저역률 문제점\n3. 개선 효과\n4. 콘덴서 용량 산정\n5. 연습문제 3개' },
        { id: 5, question: '부하율과 수용률의 의미를 설명하시오.', answer: '부하율 = 평균전력/최대전력, 수용률 = 최대수용전력/설비용량', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 부하율과 수용률의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부하율 정의\n2. 수용률 정의\n3. 부등률 설명\n4. 설비용량 산정\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'line',
      name: '배전선로',
      icon: '🔗',
      questions: [
        { id: 6, question: '가공배전선로의 구성과 특징을 설명하시오.', answer: '전주/완금/애자/전선/지지물, 시공비 저렴', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 가공배전선로의 구성과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성요소\n2. 전선 종류\n3. 장단점\n4. 시설기준\n5. 연습문제 3개' },
        { id: 7, question: '지중배전선로의 구성과 특징을 설명하시오.', answer: '케이블/관로/맨홀/핸드홀, 미관양호 신뢰성', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 지중배전선로의 구성과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성요소\n2. 케이블 종류\n3. 포설방법\n4. 장단점\n5. 연습문제 3개' },
        { id: 8, question: '배전용 전선의 종류와 특성을 설명하시오.', answer: 'OW/DV/AL-OC/ACSR, 허용전류/기계강도', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전용 전선의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전선 종류\n2. 각 전선 특성\n3. 허용전류\n4. 선정 기준\n5. 연습문제 3개' },
        { id: 9, question: '배전용 케이블의 종류와 특성을 설명하시오.', answer: 'CV/XLPE/FR-CV, 내열성/허용온도', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전용 케이블의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 케이블 종류\n2. 절연체 특성\n3. 허용전류\n4. 선정 기준\n5. 연습문제 3개' },
        { id: 10, question: '전선 허용전류 산정 방법을 설명하시오.', answer: '기준온도, 주위온도보정, 복수포설 감소율', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 전선 허용전류 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용전류 기준\n2. 보정계수\n3. 계산 방법\n4. 표 활용법\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'protection',
      name: '보호장치',
      icon: '🛡️',
      questions: [
        { id: 11, question: '배전선로 보호방식의 종류를 설명하시오.', answer: '과전류보호/지락보호/재폐로방식', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전선로 보호방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호방식 분류\n2. 과전류 보호\n3. 지락 보호\n4. 보호협조\n5. 연습문제 3개' },
        { id: 12, question: '차단기의 종류와 특성을 비교하시오.', answer: 'VCB/GCB/OCB/ABB, 차단용량/소호방식', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 차단기의 종류와 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 차단기 종류\n2. 소호 방식\n3. 특성 비교\n4. 적용 선정\n5. 연습문제 3개' },
        { id: 13, question: '계전기의 종류와 역할을 설명하시오.', answer: 'OCR/OCGR/UVR/OVR, 고장검출 및 차단명령', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 계전기의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계전기 분류\n2. 동작 원리\n3. 정정치 설정\n4. 보호협조\n5. 연습문제 3개' },
        { id: 14, question: '퓨즈의 종류와 특성을 설명하시오.', answer: 'PF/COS/전력퓨즈, 차단용량/한류특성', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 퓨즈의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퓨즈 종류\n2. 동작 특성\n3. 용량 선정\n4. 적용 범위\n5. 연습문제 3개' },
        { id: 15, question: '피뢰기의 종류와 역할을 설명하시오.', answer: 'LA/SA, 이상전압 억제, 제한전압', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 피뢰기의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피뢰기 원리\n2. 종류별 특성\n3. 정격 선정\n4. 설치 위치\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'automation',
      name: '배전자동화',
      icon: '🖥️',
      questions: [
        { id: 16, question: '배전자동화 시스템의 구성을 설명하시오.', answer: 'SCADA/DAS/FTU/단말장치, 원격감시제어', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전자동화 시스템의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 구성\n2. 각 요소 기능\n3. 통신방식\n4. 기대효과\n5. 연습문제 3개' },
        { id: 17, question: '자동 고장구간 분리 시스템을 설명하시오.', answer: '고장검출→구간분리→건전구간복구, 무정전', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 자동 고장구간 분리 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동작 순서\n2. 분리 로직\n3. 복구 과정\n4. 정전시간 단축\n5. 연습문제 3개' },
        { id: 18, question: '스마트그리드의 개념과 구성을 설명하시오.', answer: 'AMI/ESS/DR/마이크로그리드, 양방향 전력망', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 스마트그리드의 개념과 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스마트그리드 개념\n2. 핵심 기술\n3. 구성 요소\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 19, question: 'AMI(지능형전력계량인프라)를 설명하시오.', answer: '스마트미터/통신망/MDMS, 실시간 계량', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: AMI(지능형전력계량인프라)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AMI 구성\n2. 스마트미터\n3. 통신 방식\n4. 활용 분야\n5. 연습문제 3개' },
        { id: 20, question: 'ESS(에너지저장장치)의 배전계통 적용을 설명하시오.', answer: '피크저감/주파수조정/비상전원, 리튬이온', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: ESS(에너지저장장치)의 배전계통 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ESS 종류\n2. 배전 적용\n3. 운영 방식\n4. 경제성\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'substation',
      name: '수변전설비',
      icon: '🏭',
      questions: [
        { id: 21, question: '수전설비의 구성과 결선도를 설명하시오.', answer: 'DS/PF/VCB/MOF/TR, 단선결선도 작성', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 수전설비의 구성과 결선도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수전설비 구성\n2. 각 기기 역할\n3. 결선도 작성\n4. 보호협조\n5. 연습문제 3개' },
        { id: 22, question: '변압기 용량 산정 방법을 설명하시오.', answer: '부하설비용량×수용률/역률, 여유율 적용', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 변압기 용량 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부하 산정\n2. 수용률 적용\n3. 역률 보정\n4. 여유율\n5. 연습문제 3개' },
        { id: 23, question: '개폐장치의 종류와 역할을 설명하시오.', answer: 'DS/LBS/CB/COS, 무부하/부하/고장전류 차단', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 개폐장치의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개폐장치 분류\n2. 각 장치 기능\n3. 차단능력\n4. 적용 선정\n5. 연습문제 3개' },
        { id: 24, question: '계기용변성기(MOF, PT, CT)를 설명하시오.', answer: '전압/전류 변환, 계량/계측/보호용', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 계기용변성기(MOF, PT, CT)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MOF 구조\n2. PT/CT 원리\n3. 정격 선정\n4. 2차측 결선\n5. 연습문제 3개' },
        { id: 25, question: '배전반의 구성과 종류를 설명하시오.', answer: '폐쇄형/개방형, MCC/배전반/제어반', prompt: '전기공사기사 배전설비 문제입니다.\n\n문제: 배전반의 구성과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배전반 분류\n2. 구성요소\n3. 설치기준\n4. 유지보수\n5. 연습문제 3개' },
      ],
    },
    {
      id: 'calculation',
      name: '계산문제',
      icon: '🔢',
      questions: [
        { id: 26, question: '3상 380V, 50kW 부하, 역률 0.8일 때 전류를 구하시오.', answer: 'I = P/(√3×V×cosθ) = 50000/(1.732×380×0.8) = 94.9A', prompt: '전기공사기사 배전설비 계산 문제입니다.\n\n문제: 3상 380V, 50kW 부하, 역률 0.8일 때 전류를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 대입 계산\n3. 답 도출\n4. 검증\n5. 유사문제 3개' },
        { id: 27, question: '거리 200m, 부하 100A, CV 22㎟ 케이블의 전압강하를 구하시오. (도체저항 0.84Ω/km, 리액턴스 무시)', answer: 'e = 2×I×R×L = 2×100×0.84×0.2 = 33.6V', prompt: '전기공사기사 배전설비 계산 문제입니다.\n\n문제: 거리 200m, 부하 100A, CV 22㎟ 케이블의 전압강하를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 공식 제시\n2. 저항 계산\n3. 전압강하 계산\n4. 허용치 확인\n5. 유사문제 3개' },
        { id: 28, question: '역률 0.7을 0.95로 개선시 필요한 콘덴서 용량을 구하시오. (부하 500kW)', answer: 'Qc = P(tanθ1-tanθ2) = 500×(1.02-0.33) = 345kvar', prompt: '전기공사기사 배전설비 계산 문제입니다.\n\n문제: 역률 0.7을 0.95로 개선시 필요한 콘덴서 용량을 구하시오. (부하 500kW)\n\n다음 순서로 설명해주세요:\n1. tanθ 계산\n2. 콘덴서 용량 공식\n3. 계산 과정\n4. 답 확인\n5. 유사문제 3개' },
        { id: 29, question: '단락용량 200MVA 계통에서 차단기 용량을 선정하시오. (22.9kV)', answer: 'Is = 200×10^6/(√3×22900) = 5043A, 차단기 7.2kA 선정', prompt: '전기공사기사 배전설비 계산 문제입니다.\n\n문제: 단락용량 200MVA 계통에서 차단기 용량을 선정하시오. (22.9kV)\n\n다음 순서로 설명해주세요:\n1. 단락전류 계산\n2. 차단기 규격\n3. 용량 선정\n4. 여유율 고려\n5. 유사문제 3개' },
        { id: 30, question: '설비용량 1000kVA, 수용률 70%, 부하역률 0.85일 때 변압기 용량을 선정하시오.', answer: 'Ptr = 1000×0.7/0.85 = 823.5kVA, 1000kVA 선정', prompt: '전기공사기사 배전설비 계산 문제입니다.\n\n문제: 설비용량 1000kVA, 수용률 70%, 부하역률 0.85일 때 변압기 용량을 선정하시오.\n\n다음 순서로 설명해주세요:\n1. 수용전력 계산\n2. 변압기 용량 산정\n3. 표준용량 선정\n4. 여유율 확인\n5. 유사문제 3개' },
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
            <span className="text-amber-600 font-medium">배전설비</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">← 전기공사기사</Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">🔌</span>
            <div>
              <h1 className="text-2xl font-bold">배전설비</h1>
              <p className="text-amber-100">배전계통, 배전선로, 보호장치, 배전자동화</p>
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

      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
