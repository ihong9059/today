'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WaterTestingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'water-testing', name: '수질오염공정시험기준', icon: '🔬', color: 'from-purple-500 to-pink-500' };

  const topics: Topic[] = [
    { id: 'sampling', title: '시료채취', description: '시료채취 및 보존', icon: '🧪',
      questions: [
        { id: 'sp-1', question: '금속류 분석 시 시료 보존제는?', options: ['알칼리', '질산(HNO₃)', '염소', '활성탄'], answer: 1, explanation: '금속류 분석 시 HNO₃를 첨가하여 pH 2 이하로 보존합니다.' },
        { id: 'sp-2', question: '시료채취 시 기록해야 할 항목이 아닌 것은?', options: ['날짜', '위치', '분석자 이름', '시료 색상'], answer: 3, explanation: '시료채취 기록에는 날짜, 시간, 위치, 기상조건, 채취자 등을 기록합니다.' },
        { id: 'sp-3', question: 'BOD 분석용 시료의 보존 온도는?', options: ['상온', '0~4°C', '20°C', '37°C'], answer: 1, explanation: 'BOD 시료는 4°C 이하 냉암소에서 보존하며, 24시간 내 분석합니다.' },
        { id: 'sp-4', question: '복합시료(composite sample)의 의미는?', options: ['단일 시점 시료', '일정 시간 혼합 시료', '증류수', '표준용액'], answer: 1, explanation: '복합시료는 일정 시간 간격으로 채취한 시료를 혼합한 것입니다.' },
        { id: 'sp-5', question: '시료 용기 세척 시 사용하는 것은?', options: ['세제만', '증류수로 헹굼', '질산세척', '항목에 따라 다름'], answer: 3, explanation: '분석항목에 따라 세척방법이 다릅니다. 금속은 질산, 유기물은 유기용매 등.' },
      ]},
    { id: 'general-items', title: '일반항목', description: 'pH, DO, SS 등', icon: '📊',
      questions: [
        { id: 'gi-1', question: 'pH 측정 시 유리전극의 보관 용액은?', options: ['증류수', 'KCl 포화용액', '알코올', '산'], answer: 1, explanation: 'pH 유리전극은 KCl 포화용액 또는 pH 4~7 완충용액에 보관합니다.' },
        { id: 'gi-2', question: 'DO 측정의 윙클러-아지드화나트륨법의 원리는?', options: ['흡광도', '산화환원적정', '전기전도도', '중량법'], answer: 1, explanation: '윙클러법은 DO에 의해 생성된 요오드를 티오황산나트륨으로 적정합니다.' },
        { id: 'gi-3', question: 'SS 측정 시 사용하는 여과지는?', options: ['종이', 'GF/C 또는 GF/F', '막여과지', '면'], answer: 1, explanation: 'SS는 유리섬유여과지(GF/C: 1.2μm, GF/F: 0.7μm)를 사용합니다.' },
        { id: 'gi-4', question: '전기전도도의 단위는?', options: ['mg/L', 'μS/cm', 'NTU', 'pH'], answer: 1, explanation: '전기전도도의 단위는 μS/cm(마이크로지멘스/센티미터)입니다.' },
        { id: 'gi-5', question: '탁도 측정에 사용되는 표준물질은?', options: ['염화나트륨', '포르마진', '인산염', '질산염'], answer: 1, explanation: '탁도 표준물질은 포르마진(Formazin)이며, 단위는 NTU입니다.' },
      ]},
    { id: 'organic-analysis', title: '유기물 분석', description: 'BOD, COD, TOC', icon: '🧬',
      questions: [
        { id: 'oa-1', question: 'BOD₅ 측정 조건으로 옳은 것은?', options: ['0°C, 5일', '20°C, 5일', '25°C, 3일', '37°C, 1일'], answer: 1, explanation: 'BOD₅는 20°C에서 5일간 배양하여 소비된 DO를 측정합니다.' },
        { id: 'oa-2', question: 'CODMn과 CODCr의 차이점은?', options: ['온도', '산화제 종류', '시료량', 'pH'], answer: 1, explanation: 'CODMn은 과망간산칼륨, CODCr은 중크롬산칼륨을 산화제로 사용합니다.' },
        { id: 'oa-3', question: 'BOD 측정 시 식종(seeding)의 목적은?', options: ['살균', '미생물 공급', '중화', '희석'], answer: 1, explanation: '식종은 유기물 분해에 필요한 미생물을 시료에 공급하기 위함입니다.' },
        { id: 'oa-4', question: 'TOC 측정 원리는?', options: ['적정', '유기탄소 산화 후 CO₂ 측정', '중량', '흡착'], answer: 1, explanation: 'TOC는 시료 내 유기탄소를 산화하여 발생하는 CO₂를 측정합니다.' },
        { id: 'oa-5', question: 'n-헥산추출물질의 측정 대상은?', options: ['중금속', '유분(유류)', '질소', '인'], answer: 1, explanation: 'n-헥산추출물질은 기름, 그리스 등 비극성 유기물질을 측정합니다.' },
      ]},
    { id: 'nutrient-analysis', title: '영양염류 분석', description: '질소, 인 분석', icon: '🧫',
      questions: [
        { id: 'na-1', question: '총질소(T-N) 분석법은?', options: ['중량법', '자외선흡광광도법', '원자흡광법', '적정법만'], answer: 1, explanation: '총질소는 자외선흡광광도법, 카드뮴-구리환원법 등으로 측정합니다.' },
        { id: 'na-2', question: '총인(T-P) 분석 시 사용하는 분해제는?', options: ['질산', '과황산칼륨', '염산', '수산화나트륨'], answer: 1, explanation: '총인 분석은 과황산칼륨으로 분해 후 아스코르빈산환원법으로 측정합니다.' },
        { id: 'na-3', question: '암모니아성질소 측정에 사용되는 방법은?', options: ['중량법', '인도페놀법', '원자흡광법', 'GC'], answer: 1, explanation: '암모니아성질소는 인도페놀법(청색 발색) 또는 이온전극법으로 측정합니다.' },
        { id: 'na-4', question: '질산성질소 측정법은?', options: ['카드뮴환원법', '중량법', '적정법', '연소법'], answer: 0, explanation: '질산성질소는 카드뮴-구리환원법, 이온크로마토그래피, 자외선흡광광도법으로 측정.' },
        { id: 'na-5', question: '인산염인 측정 시 발색 시약은?', options: ['EDTA', '몰리브덴산암모늄+아스코르빈산', '크롬산', '과망간산'], answer: 1, explanation: '인산염인은 몰리브덴청법(아스코르빈산환원법)으로 청색 발색하여 측정합니다.' },
      ]},
    { id: 'metal-analysis', title: '금속류 분석', description: '중금속 분석법', icon: '⚗️',
      questions: [
        { id: 'ma-1', question: '원자흡광광도법(AAS)의 원리는?', options: ['형광', '원자가 특정 파장 흡수', '굴절', '산란'], answer: 1, explanation: 'AAS는 원자화된 금속이 특정 파장의 빛을 흡수하는 원리를 이용합니다.' },
        { id: 'ma-2', question: 'ICP-OES의 장점이 아닌 것은?', options: ['다원소 동시분석', '넓은 농도범위', '저비용', '높은 감도'], answer: 2, explanation: 'ICP-OES는 다원소 동시분석이 가능하나, 장비 비용이 높습니다.' },
        { id: 'ma-3', question: '수은(Hg) 분석에 적합한 방법은?', options: ['불꽃 AAS', '냉증기 원자흡광법', '중량법', '적정법'], answer: 1, explanation: '수은은 상온에서 기화하므로 냉증기 원자흡광광도법을 사용합니다.' },
        { id: 'ma-4', question: '시료 전처리 시 산분해의 목적은?', options: ['희석', '유기물 분해 및 금속 용출', '중화', '살균'], answer: 1, explanation: '산분해는 유기물을 분해하고 금속을 이온 형태로 용출시킵니다.' },
        { id: 'ma-5', question: '6가 크롬 분석에 사용되는 방법은?', options: ['AAS만', '디페닐카르바지드법', 'GC', 'TOC'], answer: 1, explanation: '6가 크롬은 디페닐카르바지드법으로 자주색 발색하여 흡광도로 측정합니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[수질환경기사 - 수질오염공정시험기준] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">수질환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-purple-100 text-purple-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/water-environment/study/water-pollution-control" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 수질오염방지기술</Link><Link href="/category/chemistry/water-environment/study/practical" className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">실기 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
