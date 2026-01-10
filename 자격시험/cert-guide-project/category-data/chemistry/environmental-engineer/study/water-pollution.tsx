'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WaterPollutionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'ee-water-pollution', name: '수질오염방지기술', icon: '💧', color: 'from-blue-500 to-cyan-500' };

  const topics: Topic[] = [
    {
      id: 'water-quality', title: '수질오염 개론', description: '수질오염의 원인과 지표', icon: '🌊',
      questions: [
        { id: 'wq-1', question: 'BOD(생물화학적산소요구량)의 측정 조건은?', options: ['25°C, 3일', '20°C, 5일', '30°C, 7일', '15°C, 5일'], answer: 1, explanation: 'BOD는 20°C에서 5일간 배양하여 측정합니다(BOD₅).' },
        { id: 'wq-2', question: 'COD 측정에서 산화제로 사용되는 것은?', options: ['NaOH', 'KMnO₄ 또는 K₂Cr₂O₇', 'HCl', 'NaCl'], answer: 1, explanation: 'COD 측정은 과망간산칼륨(CODMn) 또는 중크롬산칼륨(CODCr)을 산화제로 사용합니다.' },
        { id: 'wq-3', question: '부영양화의 주요 원인 영양소는?', options: ['탄소, 산소', '질소, 인', '철, 망간', '칼슘, 마그네슘'], answer: 1, explanation: '질소(N)와 인(P)의 과다 유입이 부영양화의 주요 원인입니다.' },
        { id: 'wq-4', question: 'DO(용존산소)가 높을수록?', options: ['수질 나쁨', '수질 좋음', '오염 심함', 'BOD 높음'], answer: 1, explanation: 'DO가 높으면 수생생물이 살기 좋은 환경으로 수질이 좋다고 판단합니다.' },
        { id: 'wq-5', question: 'SS(부유물질)의 측정 방법은?', options: ['적정법', '여과 후 건조 중량', '비색법', '전기전도도'], answer: 1, explanation: 'SS는 시료를 유리섬유여지로 여과한 후 105°C 건조하여 중량을 측정합니다.' },
      ]
    },
    {
      id: 'physical-treatment', title: '물리적 처리', description: '침전, 여과, 부상 등', icon: '⚙️',
      questions: [
        { id: 'pt-1', question: '침전지에서 표면부하율의 단위는?', options: ['m/hr', 'm³/m²·day', 'mg/L', 'kg/day'], answer: 1, explanation: '표면부하율(수면적부하) = 유량/침전지면적, 단위는 m³/m²·day입니다.' },
        { id: 'pt-2', question: '응집제로 가장 많이 사용되는 것은?', options: ['NaCl', 'Al₂(SO₄)₃', 'CaCO₃', 'NaOH'], answer: 1, explanation: '황산알루미늄(명반)은 가장 일반적으로 사용되는 응집제입니다.' },
        { id: 'pt-3', question: '급속여과와 완속여과의 차이점으로 옳은 것은?', options: ['급속여과가 느림', '완속여과는 응집제 필수', '급속여과 속도 100~150m/day', '완속여과가 면적 작음'], answer: 2, explanation: '급속여과는 100~150m/day, 완속여과는 4~5m/day로 속도 차이가 큽니다.' },
        { id: 'pt-4', question: '부상분리의 원리는?', options: ['중력', '미세기포 부착', '여과', '침전'], answer: 1, explanation: '부상분리는 미세기포를 발생시켜 입자에 부착, 수면으로 부상시켜 제거합니다.' },
        { id: 'pt-5', question: '막분리 공정 중 분자량 기준 분리는?', options: ['MF', 'UF', 'RO', 'NF'], answer: 1, explanation: 'UF(한외여과)는 분자량 크기에 따라 분리하며, MF는 입자, RO는 이온 분리입니다.' },
      ]
    },
    {
      id: 'biological-treatment', title: '생물학적 처리', description: '활성슬러지, 생물막 공정', icon: '🦠',
      questions: [
        { id: 'bt-1', question: '활성슬러지 공법의 핵심 미생물은?', options: ['조류', '호기성 세균', '곰팡이', '바이러스'], answer: 1, explanation: '활성슬러지 공법에서는 호기성 세균이 유기물 분해의 주역할을 합니다.' },
        { id: 'bt-2', question: 'F/M비의 정의는?', options: ['유기물/미생물량', '미생물/유기물', '산소/유기물', '슬러지/유량'], answer: 0, explanation: 'F/M비(food to microorganism ratio) = 유입 BOD / MLSS' },
        { id: 'bt-3', question: 'SRT(슬러지체류시간)가 길면?', options: ['슬러지 안정화', '처리효율 감소', 'BOD 증가', '산소 불필요'], answer: 0, explanation: 'SRT가 길면 슬러지가 더 안정화되고 잉여슬러지 발생량이 감소합니다.' },
        { id: 'bt-4', question: 'MBR(막결합생물반응조)의 장점이 아닌 것은?', options: ['고품질 처리수', '슬러지 농도 높음', '막오염 없음', '소형화 가능'], answer: 2, explanation: 'MBR은 막오염(fouling)이 발생할 수 있어 막세정이 필요합니다.' },
        { id: 'bt-5', question: '질소제거를 위한 탈질소화 조건은?', options: ['호기성', '혐기성', '무산소', '고온'], answer: 2, explanation: '탈질소화는 무산소 조건에서 NO₃⁻가 N₂로 환원되는 과정입니다.' },
      ]
    },
    {
      id: 'sludge-treatment', title: '슬러지 처리', description: '농축, 소화, 탈수, 처분', icon: '🗑️',
      questions: [
        { id: 'st-1', question: '슬러지 농축의 목적은?', options: ['살균', '수분 감소', '악취 제거', 'BOD 증가'], answer: 1, explanation: '슬러지 농축은 후속 처리를 위해 수분을 감소시키는 과정입니다.' },
        { id: 'st-2', question: '혐기성 소화의 최종 생성물은?', options: ['O₂, H₂O', 'CH₄, CO₂', 'NH₃, H₂S만', 'N₂, O₂'], answer: 1, explanation: '혐기성 소화에서 메탄(CH₄)과 이산화탄소(CO₂)가 주요 생성물입니다.' },
        { id: 'st-3', question: '슬러지 탈수 장치가 아닌 것은?', options: ['벨트프레스', '원심분리기', '침전조', '필터프레스'], answer: 2, explanation: '침전조는 슬러지 농축에 사용되며, 탈수 장치가 아닙니다.' },
        { id: 'st-4', question: '슬러지 개량(conditioning)의 목적은?', options: ['살균', '탈수성 향상', '부피 증가', '악취 발생'], answer: 1, explanation: '슬러지 개량은 응집제나 열처리로 탈수성을 향상시키는 과정입니다.' },
        { id: 'st-5', question: '슬러지 처분 방법이 아닌 것은?', options: ['매립', '해양투기', '퇴비화', '재순환'], answer: 1, explanation: '해양투기는 런던협약에 의해 금지되어 더 이상 허용되지 않습니다.' },
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
  const prompt = (q: Question) => `[환경기사 - 수질오염방지기술] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link><span className="text-gray-300">›</span><span className="text-teal-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/environmental-engineer/study/air-pollution" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 대기오염방지기술</Link><Link href="/category/chemistry/environmental-engineer/study/waste-management" className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">폐기물처리 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
