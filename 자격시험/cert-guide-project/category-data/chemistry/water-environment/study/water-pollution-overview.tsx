'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WaterPollutionOverviewPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'water-pollution-overview', name: '수질오염개론', icon: '🌊', color: 'from-blue-500 to-cyan-500' };

  const topics: Topic[] = [
    { id: 'water-basics', title: '수질의 기초', description: '물의 특성과 수질지표', icon: '💧',
      questions: [
        { id: 'wb-1', question: '물의 최대 밀도가 되는 온도는?', options: ['0°C', '4°C', '10°C', '25°C'], answer: 1, explanation: '물은 4°C에서 최대 밀도(1g/cm³)를 가집니다.' },
        { id: 'wb-2', question: 'BOD의 정의는?', options: ['화학적 산소요구량', '생물화학적 산소요구량', '용존산소', '총유기탄소'], answer: 1, explanation: 'BOD(Biochemical Oxygen Demand)는 미생물이 유기물을 분해할 때 필요한 산소량입니다.' },
        { id: 'wb-3', question: 'COD와 BOD의 관계로 옳은 것은?', options: ['항상 같음', 'COD ≥ BOD', 'BOD > COD', '관계없음'], answer: 1, explanation: 'COD는 화학적으로 산화 가능한 모든 물질을 측정하므로 일반적으로 COD ≥ BOD입니다.' },
        { id: 'wb-4', question: 'DO의 포화농도에 영향을 주는 요소는?', options: ['색도', '온도', 'pH', '탁도'], answer: 1, explanation: '용존산소(DO) 포화농도는 온도가 높을수록, 염분이 높을수록 감소합니다.' },
        { id: 'wb-5', question: 'SS(부유물질)의 측정 원리는?', options: ['흡광도', '여과 후 중량', '전기전도도', '적정'], answer: 1, explanation: 'SS는 일정량의 시료를 여과한 후 건조하여 무게를 측정합니다.' },
      ]},
    { id: 'pollution-sources', title: '오염원과 오염물질', description: '수질오염의 원인과 특성', icon: '🏭',
      questions: [
        { id: 'ps-1', question: '점오염원의 예는?', options: ['농경지', '도로', '하수처리장 방류수', '대기오염'], answer: 2, explanation: '점오염원은 공장폐수, 하수처리장 등 배출지점이 명확한 오염원입니다.' },
        { id: 'ps-2', question: '비점오염원의 특성이 아닌 것은?', options: ['강우 시 유출', '광범위한 발생', '일정한 배출구', '관리 어려움'], answer: 2, explanation: '비점오염원은 배출구가 불명확하고 광범위하게 발생합니다.' },
        { id: 'ps-3', question: '부영양화의 원인 물질은?', options: ['중금속', '질소, 인', '유류', '농약'], answer: 1, explanation: '부영양화는 질소(N), 인(P)과 같은 영양염류 과다로 발생합니다.' },
        { id: 'ps-4', question: '적조 현상의 원인은?', options: ['중금속', '유기물', '영양염류', '온도만'], answer: 2, explanation: '적조는 영양염류 과다로 식물플랑크톤이 대량 증식하여 발생합니다.' },
        { id: 'ps-5', question: '생활하수의 주요 오염물질이 아닌 것은?', options: ['유기물', '영양염류', '병원균', '방사성물질'], answer: 3, explanation: '생활하수에는 유기물, 영양염류, 병원균, 세제 등이 포함됩니다.' },
      ]},
    { id: 'self-purification', title: '자정작용', description: '수역의 자연정화', icon: '🔄',
      questions: [
        { id: 'sp-1', question: '자정작용의 주요 인자가 아닌 것은?', options: ['희석', '침전', '색상', '생물분해'], answer: 2, explanation: '자정작용은 희석, 침전, 흡착, 생물분해, 재폭기 등에 의해 일어납니다.' },
        { id: 'sp-2', question: 'DO Sag Curve에서 최저점(Critical Point)의 의미는?', options: ['오염 시작점', 'DO가 최소인 지점', '완전 정화점', '유입점'], answer: 1, explanation: 'Critical Point는 산소소비와 재폭기가 균형을 이루며 DO가 최저인 지점입니다.' },
        { id: 'sp-3', question: 'Streeter-Phelps 식에서 탈산소계수(k₁)가 크면?', options: ['분해 느림', '분해 빠름', 'DO 증가', '영향 없음'], answer: 1, explanation: 'k₁(탈산소계수)가 클수록 유기물 분해가 빠르고 산소소비도 빠릅니다.' },
        { id: 'sp-4', question: '재폭기계수(k₂)에 영향을 주는 요소는?', options: ['유기물량', '수온, 유속', '색도', 'pH만'], answer: 1, explanation: '재폭기계수는 수온, 유속, 수심, 바람 등에 영향받습니다.' },
        { id: 'sp-5', question: '자정계수(f)의 정의는?', options: ['k₁/k₂', 'k₂/k₁', 'k₁+k₂', 'k₁×k₂'], answer: 1, explanation: '자정계수 f = k₂/k₁. f가 클수록 자정능력이 우수합니다.' },
      ]},
    { id: 'aquatic-ecosystem', title: '수생태계', description: '수중 생물과 생태', icon: '🐟',
      questions: [
        { id: 'ae-1', question: '부영양호의 특징이 아닌 것은?', options: ['조류 대량 발생', '투명도 감소', 'DO 높음', '악취 발생'], answer: 2, explanation: '부영양호는 조류 증식 후 분해과정에서 DO가 감소합니다.' },
        { id: 'ae-2', question: '수온 성층 중 도약층(Thermocline)의 특징은?', options: ['온도 일정', '수온 급격 변화', '혼합 활발', '바닥층'], answer: 1, explanation: '도약층(수온약층)은 수심에 따라 수온이 급격히 변하는 층입니다.' },
        { id: 'ae-3', question: '생물학적 산소요구량(BOD) 측정 기간은?', options: ['1일', '3일', '5일', '10일'], answer: 2, explanation: 'BOD₅는 20°C에서 5일간 배양하여 소비된 산소량을 측정합니다.' },
        { id: 'ae-4', question: '지표생물 중 오염지역에서 출현하는 것은?', options: ['가재', '은어', '실지렁이', '플라나리아'], answer: 2, explanation: '실지렁이는 오염에 강하여 오염된 수역의 지표생물입니다.' },
        { id: 'ae-5', question: '수생태계 먹이사슬에서 1차 생산자는?', options: ['동물플랑크톤', '어류', '조류', '세균'], answer: 2, explanation: '조류(식물플랑크톤)는 광합성으로 유기물을 생산하는 1차 생산자입니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[수질환경기사 - 수질오염개론] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">수질환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/water-environment" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 수질환경기사 홈</Link><Link href="/category/chemistry/water-environment/study/water-treatment" className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">상하수도계획 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
