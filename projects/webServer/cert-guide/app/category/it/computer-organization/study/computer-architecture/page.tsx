'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'cpu',
    name: 'CPU 구조',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: 'CPU의 기본 구성요소 4가지를 쓰시오.', answer: 'ALU(산술논리장치), 제어장치, 레지스터, 버스', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: CPU의 기본 구성요소 4가지를 쓰시오.` },
      { id: 2, question: '명령어 사이클의 4단계를 순서대로 쓰시오.', answer: 'Fetch → Decode → Execute → Store', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 명령어 사이클의 4단계를 순서대로 쓰시오.` },
      { id: 3, question: 'PC(Program Counter)의 역할을 설명하시오.', answer: '다음 실행할 명령어의 주소를 저장하는 레지스터', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: PC(Program Counter)의 역할을 설명하시오.` },
      { id: 4, question: 'MAR과 MBR의 차이를 설명하시오.', answer: 'MAR: 메모리 주소 저장, MBR: 메모리 데이터 저장', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: MAR과 MBR의 차이를 설명하시오.` },
      { id: 5, question: 'CISC와 RISC의 차이점을 설명하시오.', answer: 'CISC: 복잡한 명령어/가변 길이, RISC: 단순 명령어/고정 길이', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: CISC와 RISC의 차이점을 설명하시오.` },
      { id: 6, question: '레지스터의 종류 5가지를 쓰시오.', answer: 'PC, IR, MAR, MBR, ACC(누산기)', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 레지스터의 종류 5가지를 쓰시오.` },
      { id: 7, question: 'ALU가 수행하는 연산의 종류를 설명하시오.', answer: '산술 연산(+,-,×,÷), 논리 연산(AND, OR, NOT, XOR)', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: ALU가 수행하는 연산의 종류를 설명하시오.` },
      { id: 8, question: '마이크로 오퍼레이션의 개념을 설명하시오.', answer: '하나의 명령어를 실행하기 위한 CPU 내부의 기본 동작', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 마이크로 오퍼레이션의 개념을 설명하시오.` },
      { id: 9, question: '인터럽트의 종류를 설명하시오.', answer: '외부 인터럽트, 내부 인터럽트, 소프트웨어 인터럽트', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 인터럽트의 종류를 설명하시오.` },
      { id: 10, question: 'DMA(Direct Memory Access)의 장점을 설명하시오.', answer: 'CPU 개입 없이 직접 메모리 접근, CPU 부하 감소', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: DMA(Direct Memory Access)의 장점을 설명하시오.` },
    ],
  },
  {
    id: 'pipeline',
    name: '파이프라인',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '파이프라인의 5단계를 쓰시오.', answer: 'IF(인출) → ID(해독) → EX(실행) → MEM(메모리) → WB(쓰기)', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 파이프라인의 5단계를 쓰시오.` },
      { id: 2, question: '파이프라인 해저드의 종류 3가지를 설명하시오.', answer: '구조적 해저드, 데이터 해저드, 제어 해저드', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 파이프라인 해저드의 종류 3가지를 설명하시오.` },
      { id: 3, question: '데이터 해저드 해결 기법을 설명하시오.', answer: 'Forwarding(전방전달), Stalling(지연), NOP 삽입', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 데이터 해저드 해결 기법을 설명하시오.` },
      { id: 4, question: '분기 예측(Branch Prediction)의 목적을 설명하시오.', answer: '제어 해저드 감소, 파이프라인 효율 향상', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 분기 예측(Branch Prediction)의 목적을 설명하시오.` },
      { id: 5, question: '파이프라인 성능 향상률 계산 공식을 쓰시오.', answer: 'Speedup = n / (1 + (n-1)/k), n=명령어 수, k=단계 수', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 파이프라인 성능 향상률 계산 공식을 쓰시오.` },
    ],
  },
  {
    id: 'memory',
    name: '메모리 계층',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '메모리 계층 구조를 속도 순으로 나열하시오.', answer: '레지스터 → 캐시 → 메인 메모리 → 보조기억장치', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 메모리 계층 구조를 속도 순으로 나열하시오.` },
      { id: 2, question: '캐시 메모리의 지역성 원리 2가지를 설명하시오.', answer: '시간적 지역성(최근 사용 재사용), 공간적 지역성(인접 데이터 사용)', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 캐시 메모리의 지역성 원리 2가지를 설명하시오.` },
      { id: 3, question: '캐시 매핑 방식 3가지를 설명하시오.', answer: '직접 매핑, 연관 매핑, 집합 연관 매핑', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 캐시 매핑 방식 3가지를 설명하시오.` },
      { id: 4, question: '캐시 교체 알고리즘 3가지를 쓰시오.', answer: 'LRU(최소 최근 사용), FIFO(선입선출), Random', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 캐시 교체 알고리즘 3가지를 쓰시오.` },
      { id: 5, question: '캐시 히트율이 90%일 때 평균 접근 시간을 계산하시오. (캐시: 10ns, 메모리: 100ns)', answer: '0.9×10 + 0.1×100 = 19ns', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 캐시 히트율이 90%일 때 평균 접근 시간을 계산하시오.` },
      { id: 6, question: 'Write-Through와 Write-Back 정책의 차이를 설명하시오.', answer: 'Write-Through: 동시 기록, Write-Back: 캐시만 갱신 후 나중에 기록', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: Write-Through와 Write-Back 정책의 차이를 설명하시오.` },
      { id: 7, question: 'SRAM과 DRAM의 차이를 설명하시오.', answer: 'SRAM: 플립플롭/빠름/비쌈, DRAM: 커패시터/느림/저렴', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: SRAM과 DRAM의 차이를 설명하시오.` },
      { id: 8, question: 'ROM의 종류를 설명하시오.', answer: 'ROM, PROM, EPROM, EEPROM, Flash Memory', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: ROM의 종류를 설명하시오.` },
    ],
  },
  {
    id: 'io',
    name: '입출력 시스템',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '입출력 방식 3가지를 설명하시오.', answer: '프로그램 I/O, 인터럽트 I/O, DMA', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 입출력 방식 3가지를 설명하시오.` },
      { id: 2, question: 'RAID 0, 1, 5의 특징을 설명하시오.', answer: 'RAID 0: 스트라이핑, RAID 1: 미러링, RAID 5: 분산 패리티', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: RAID 0, 1, 5의 특징을 설명하시오.` },
      { id: 3, question: 'Cycle Stealing의 개념을 설명하시오.', answer: 'DMA가 CPU 버스 사이클을 빼앗아 메모리 접근', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: Cycle Stealing의 개념을 설명하시오.` },
      { id: 4, question: '버스 중재 방식을 설명하시오.', answer: '데이지 체인, 폴링, 독립 요청 방식', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 버스 중재 방식을 설명하시오.` },
      { id: 5, question: '채널(Channel)의 종류를 설명하시오.', answer: 'Selector, Multiplexer, Block Multiplexer 채널', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 채널(Channel)의 종류를 설명하시오.` },
    ],
  },
  {
    id: 'parallel',
    name: '병렬 처리',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'Flynn의 분류 4가지를 설명하시오.', answer: 'SISD, SIMD, MISD, MIMD', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: Flynn의 분류 4가지를 설명하시오.` },
      { id: 2, question: '슈퍼스칼라와 VLIW의 차이를 설명하시오.', answer: '슈퍼스칼라: 동적 명령어 병렬, VLIW: 정적 컴파일러 의존', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 슈퍼스칼라와 VLIW의 차이를 설명하시오.` },
      { id: 3, question: 'SMP(대칭형 다중 처리)의 특징을 설명하시오.', answer: '모든 프로세서가 동등한 자격으로 메모리/I/O 접근', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: SMP(대칭형 다중 처리)의 특징을 설명하시오.` },
      { id: 4, question: '암달의 법칙(Amdahl\'s Law)을 설명하시오.', answer: '병렬화 불가 부분이 전체 성능 향상 한계 결정', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 암달의 법칙(Amdahl\'s Law)을 설명하시오.` },
      { id: 5, question: '벡터 프로세서의 특징을 설명하시오.', answer: '벡터 데이터를 하나의 명령어로 동시 처리', prompt: `전자계산기조직응용기사 문제입니다.\n\n문제: 벡터 프로세서의 특징을 설명하시오.` },
    ],
  },
];

export default function ComputerArchitecturePage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cpu']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('computer-org-architecture-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('computer-org-architecture-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-cyan-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</a><span className="text-gray-300">›</span><span className="text-cyan-600 font-medium">전자계산기구조</span></nav></div></header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🖥️</span></div><div><h1 className="text-2xl font-bold">전자계산기구조</h1><p className="text-cyan-100">전자계산기조직응용기사 1과목 - CPU, 메모리, 입출력</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-cyan-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-cyan-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
