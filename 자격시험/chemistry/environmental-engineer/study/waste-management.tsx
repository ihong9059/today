'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WasteManagementPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'waste-management', name: '폐기물처리', icon: '♻️', color: 'from-green-500 to-lime-500' };

  const topics: Topic[] = [
    {
      id: 'waste-classification', title: '폐기물 분류', description: '폐기물의 종류와 특성', icon: '🗂️',
      questions: [
        { id: 'wc-1', question: '폐기물관리법상 폐기물의 정의는?', options: ['버려지는 물질', '쓸모없는 물질', '쓰레기, 연소재, 오니 등', '재활용 가능물'], answer: 2, explanation: '폐기물은 쓰레기, 연소재, 오니, 폐유, 폐산, 폐알칼리 등으로 정의됩니다.' },
        { id: 'wc-2', question: '지정폐기물의 특성이 아닌 것은?', options: ['유해성', '감염성', '폭발성', '일반성'], answer: 3, explanation: '지정폐기물은 유해성, 감염성, 폭발성 등 위험한 특성을 가진 폐기물입니다.' },
        { id: 'wc-3', question: '사업장폐기물 발생량 기준은?', options: ['1일 100kg', '1일 300kg', '월 1톤', '연 10톤'], answer: 1, explanation: '사업장폐기물은 1일 300kg 이상 발생하는 사업장의 폐기물입니다.' },
        { id: 'wc-4', question: '생활폐기물 처리 책임자는?', options: ['국가', '시·군·구', '사업자', '주민'], answer: 1, explanation: '생활폐기물 처리는 시·군·구청장의 책임입니다.' },
        { id: 'wc-5', question: '의료폐기물의 처리 방법으로 적절한 것은?', options: ['매립', '해양투기', '소각', '퇴비화'], answer: 2, explanation: '의료폐기물(감염성)은 고온 소각이 가장 적절한 처리 방법입니다.' },
      ]
    },
    {
      id: 'incineration', title: '소각', description: '폐기물 열적 처리', icon: '🔥',
      questions: [
        { id: 'ic-1', question: '소각의 3T가 아닌 것은?', options: ['Temperature', 'Time', 'Turbulence', 'Treatment'], answer: 3, explanation: '소각의 3T는 온도(Temperature), 시간(Time), 혼합(Turbulence)입니다.' },
        { id: 'ic-2', question: '폐기물 소각 시 다이옥신 저감 조건은?', options: ['저온 연소', '850°C 이상 고온 연소', '산소 부족', '서냉'], answer: 1, explanation: '다이옥신은 850°C 이상 고온에서 완전연소시키고 급랭하여 저감합니다.' },
        { id: 'ic-3', question: '스토커식 소각로의 특징은?', options: ['액상 폐기물 전용', '고정상', '이동화격자', '회전원통'], answer: 2, explanation: '스토커식은 이동화격자(grate)를 사용하여 고형폐기물을 연소시킵니다.' },
        { id: 'ic-4', question: '유동층 소각로의 장점이 아닌 것은?', options: ['열효율 높음', '다양한 폐기물 처리', '대형화 용이', '분리 불필요'], answer: 3, explanation: '유동층 소각로도 폐기물 전처리(파쇄, 분리)가 필요합니다.' },
        { id: 'ic-5', question: '소각재의 처리 방법은?', options: ['해양투기', '매립', '방치', '하수방류'], answer: 1, explanation: '소각재(바닥재, 비산재)는 주로 매립처리하며, 비산재는 유해물질 함유로 특별관리합니다.' },
      ]
    },
    {
      id: 'landfill', title: '매립', description: '폐기물 최종처분', icon: '🏔️',
      questions: [
        { id: 'lf-1', question: '위생매립지의 필수 시설이 아닌 것은?', options: ['차수시설', '침출수 처리', '가스 포집', '소각시설'], answer: 3, explanation: '위생매립지는 차수, 침출수처리, 가스관리가 필수이며 소각은 별도 시설입니다.' },
        { id: 'lf-2', question: '침출수의 특성으로 옳지 않은 것은?', options: ['높은 BOD', '중금속 함유', '낮은 암모니아', '색도 높음'], answer: 2, explanation: '침출수는 암모니아성 질소 농도가 높은 것이 특징입니다.' },
        { id: 'lf-3', question: '매립가스의 주성분은?', options: ['O₂, N₂', 'CH₄, CO₂', 'H₂S만', 'CO만'], answer: 1, explanation: '매립가스는 메탄(CH₄) 45-60%, 이산화탄소(CO₂) 35-50%가 주성분입니다.' },
        { id: 'lf-4', question: '준호기성 매립의 특징은?', options: ['완전 밀폐', '공기 주입', '침출수 순환', '매탄 다량 발생'], answer: 1, explanation: '준호기성 매립은 공기를 주입하여 유기물 분해를 촉진합니다.' },
        { id: 'lf-5', question: '매립지 안정화 후 토지이용으로 적합하지 않은 것은?', options: ['공원', '골프장', '주거지', '태양광발전'], answer: 2, explanation: '매립지는 침하, 가스 발생 등으로 주거용 건축은 부적합합니다.' },
      ]
    },
    {
      id: 'recycling', title: '재활용', description: '자원 순환과 재활용', icon: '🔄',
      questions: [
        { id: 'rc-1', question: '폐기물 처리 우선순위로 옳은 것은?', options: ['처리→발생억제→재활용', '재활용→처리→발생억제', '발생억제→재활용→처리', '처리→재활용→발생억제'], answer: 2, explanation: '폐기물 처리 우선순위: 발생억제 → 재사용 → 재활용 → 에너지회수 → 처분' },
        { id: 'rc-2', question: '물질재활용(MR)과 에너지회수(ER)의 차이는?', options: ['MR이 에너지 생산', 'ER이 물질 생산', 'MR은 물질로, ER은 열로 회수', '차이 없음'], answer: 2, explanation: 'MR은 원료로 재활용, ER은 소각열 등 에너지로 회수하는 방법입니다.' },
        { id: 'rc-3', question: '생산자책임재활용제도(EPR)의 목적은?', options: ['소비자 부담', '생산자의 재활용 책임', '정부 보조', '수출 확대'], answer: 1, explanation: 'EPR은 생산자가 제품의 재활용에 대한 책임을 지도록 하는 제도입니다.' },
        { id: 'rc-4', question: '퇴비화에 적합한 C/N비는?', options: ['5:1', '10:1', '25~35:1', '100:1'], answer: 2, explanation: '퇴비화에 적합한 C/N비는 25~35:1입니다.' },
        { id: 'rc-5', question: 'RDF(폐기물고형연료)의 장점이 아닌 것은?', options: ['저장 용이', '균질한 발열량', '수분 함량 높음', '운반 편리'], answer: 2, explanation: 'RDF는 건조하여 수분 함량이 낮고 발열량이 균일한 것이 장점입니다.' },
      ]
    },
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0);
  const done = Object.values(completedQuestions).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[환경기사 - 폐기물처리] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link><span className="text-gray-300">›</span><span className="text-teal-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-green-100 text-green-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/environmental-engineer/study/water-pollution" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 수질오염방지기술</Link><Link href="/category/chemistry/environmental-engineer/study/noise-vibration" className="flex-1 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">소음진동 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
