'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'air-practical', name: '실기', icon: '🧪', color: 'from-teal-500 to-cyan-500' };

  const topics: Topic[] = [
    { id: 'design-calc', title: '설계 계산', description: '집진·통풍 설계', icon: '📐',
      questions: [
        { id: 'dc-1', question: '집진효율 99% 장치 2개 직렬 시 총효율은?', options: ['99%', '99.9%', '99.99%', '198%'], answer: 2, explanation: '총효율 = 1-(1-0.99)² = 1-0.0001 = 99.99%' },
        { id: 'dc-2', question: 'Deutsch 집진효율식에서 효율을 높이려면?', options: ['유속 증가', '집진면적 증가', '유량 증가', '입자 크기 감소'], answer: 1, explanation: 'η = 1-exp(-wA/Q). 집진면적(A) 증가, 유량(Q) 감소 시 효율 증가.' },
        { id: 'dc-3', question: '이론공기량 8 m³/kg, 공기비 1.25일 때 실제공기량은?', options: ['6.4 m³/kg', '8 m³/kg', '10 m³/kg', '12 m³/kg'], answer: 2, explanation: '실제공기량 = 이론공기량 × 공기비 = 8 × 1.25 = 10 m³/kg' },
        { id: 'dc-4', question: '통풍력 계산에서 높이 2배 시 통풍력은?', options: ['2배', '4배', '변화없음', '1/2배'], answer: 0, explanation: '통풍력은 굴뚝 높이에 비례합니다. H = ρh × g × (ρa - ρg)' },
        { id: 'dc-5', question: '유효굴뚝높이 계산 시 상승높이에 영향주는 것은?', options: ['색상', '배출속도, 온도, 풍속', '재질', '두께'], answer: 1, explanation: '상승높이(ΔH)는 배출속도, 배가스-외기 온도차, 풍속에 영향받습니다.' },
      ]},
    { id: 'measurement', title: '측정 실무', description: '시료채취 및 분석', icon: '🔬',
      questions: [
        { id: 'ms-1', question: '등속흡인율 계산에 필요한 것은?', options: ['덕트 유속과 흡인 유속', '색상', '습도', '재질'], answer: 0, explanation: '등속흡인율 = (흡인유속/덕트유속) × 100, 90~110%가 적정.' },
        { id: 'ms-2', question: '여지 건조 시 항량의 의미는?', options: ['최대 중량', '연속 칭량 차이 0.5mg 이내', '초기 중량', '평균'], answer: 1, explanation: '항량은 연속 건조-칭량에서 무게 차이가 0.5mg 이내가 될 때까지 반복.' },
        { id: 'ms-3', question: '가스미터로 측정하는 것은?', options: ['유속', '시료채취 체적', '농도', '온도'], answer: 1, explanation: '가스미터는 채취된 시료 가스의 총 체적을 측정합니다.' },
        { id: 'ms-4', question: 'S-형 피토관의 계수(Cp)는 약?', options: ['0.5', '0.84', '1.0', '1.5'], answer: 1, explanation: 'S-형 피토관의 계수는 약 0.84이며, 표준 피토관은 1.0입니다.' },
        { id: 'ms-5', question: '측정 구멍 배치 시 원형 덕트 직경방향 측점 수는?', options: ['4점', '6점', '직경에 따라 다름', '1점'], answer: 2, explanation: '덕트 크기에 따라 측점 수가 달라지며, 소형은 4점, 대형은 증가합니다.' },
      ]},
    { id: 'regulations', title: '법규 및 기준', description: '배출허용기준, 법규', icon: '📜',
      questions: [
        { id: 'rg-1', question: '대기환경보전법상 배출시설 설치 시 필요한 것은?', options: ['등록', '허가 또는 신고', '통보', '없음'], answer: 1, explanation: '배출시설 설치 시 허가 또는 신고가 필요하며, 시설 규모에 따라 다릅니다.' },
        { id: 'rg-2', question: '자가측정 주기는 시설에 따라?', options: ['매일', '주 1회~월 2회', '년 1회', '3년 1회'], answer: 1, explanation: '시설 종류와 규모에 따라 주 1회에서 월 2회까지 자가측정 주기가 다릅니다.' },
        { id: 'rg-3', question: '굴뚝 자동측정기기(TMS) 설치 대상은?', options: ['모든 사업장', '1종 사업장 등', '가정', '소규모만'], answer: 1, explanation: '대형 배출시설(1종, 2종 일부)에는 굴뚝 자동측정기기 설치가 의무화됩니다.' },
        { id: 'rg-4', question: '배출허용기준 초과 시 1차 처분은?', options: ['영업정지', '개선명령', '허가취소', '과태료만'], answer: 1, explanation: '초과 시 일반적으로 개선명령 → 조업정지 → 허가취소 순으로 처분됩니다.' },
        { id: 'rg-5', question: '환경기술인 자격 기준은?', options: ['경력만', '자격증 또는 학력+경력', '나이', '성별'], answer: 1, explanation: '환경기술인은 관련 자격증 또는 학력과 경력 요건을 충족해야 합니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[대기환경기사 - 실기] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">대기환경기사 실기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-teal-100 text-teal-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/air-environment/study/air-testing" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 대기오염공정시험기준</Link><Link href="/category/chemistry/air-environment" className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">대기환경기사 홈 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
