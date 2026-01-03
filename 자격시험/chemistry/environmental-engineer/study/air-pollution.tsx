'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function AirPollutionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'ee-air-pollution', name: '대기오염방지기술', icon: '💨', color: 'from-sky-500 to-blue-500' };

  const topics: Topic[] = [
    {
      id: 'air-pollutants', title: '대기오염물질', description: '오염물질의 종류와 특성', icon: '🏭',
      questions: [
        { id: 'ap-1', question: '1차 오염물질이 아닌 것은?', options: ['CO', 'SO₂', 'O₃', 'NO'], answer: 2, explanation: '오존(O₃)은 NOx와 VOC가 자외선과 반응하여 생성되는 2차 오염물질입니다.' },
        { id: 'ap-2', question: 'PM2.5의 공기역학적 직경 기준은?', options: ['2.5mm 이하', '2.5μm 이하', '10μm 이하', '0.25μm 이하'], answer: 1, explanation: 'PM2.5는 공기역학적 직경이 2.5μm 이하인 입자상 물질입니다.' },
        { id: 'ap-3', question: '황산화물(SOx)의 주요 배출원은?', options: ['자동차', '화력발전소', '농업', '폐수처리장'], answer: 1, explanation: '화력발전소에서 화석연료(석탄, 중유) 연소 시 SO₂가 주로 발생합니다.' },
        { id: 'ap-4', question: '광화학스모그의 주요 생성물질은?', options: ['CO', 'SO₂', '오존', '분진'], answer: 2, explanation: '광화학스모그에서 NOx와 VOC가 자외선과 반응하여 오존(O₃)이 생성됩니다.' },
        { id: 'ap-5', question: '휘발성유기화합물(VOC)의 특징이 아닌 것은?', options: ['휘발성', '광화학반응 참여', '비휘발성', '증기압 높음'], answer: 2, explanation: 'VOC는 휘발성이 높아 대기 중으로 쉽게 증발하는 유기화합물입니다.' },
      ]
    },
    {
      id: 'dust-collection', title: '집진시설', description: '입자상 물질 제거 기술', icon: '🌪️',
      questions: [
        { id: 'dc-1', question: '전기집진기의 집진 원리는?', options: ['원심력', '관성력', '정전기력', '중력'], answer: 2, explanation: '전기집진기는 입자에 전하를 부여하여 정전기력으로 집진합니다.' },
        { id: 'dc-2', question: '사이클론의 집진 원리는?', options: ['원심력', '중력', '정전기력', '확산'], answer: 0, explanation: '사이클론은 회전 기류에 의한 원심력으로 입자를 분리합니다.' },
        { id: 'dc-3', question: '여과집진기(백필터)의 장점이 아닌 것은?', options: ['고효율', '다양한 입자 처리', '고온가스 직접처리', '건식 운전'], answer: 2, explanation: '백필터는 내열 한계가 있어 고온가스는 냉각 후 처리해야 합니다.' },
        { id: 'dc-4', question: '세정집진기의 특징은?', options: ['건식', '가스+입자 동시처리', '저압력손실', '탈수 불필요'], answer: 1, explanation: '세정집진기는 물을 사용하여 가스상과 입자상 오염물질을 동시에 처리할 수 있습니다.' },
        { id: 'dc-5', question: '집진효율 99%인 장치 2개를 직렬 연결 시 총 효율은?', options: ['99%', '99.9%', '99.99%', '100%'], answer: 2, explanation: '총 효율 = 1 - (1-0.99)×(1-0.99) = 1 - 0.0001 = 99.99%' },
      ]
    },
    {
      id: 'gas-treatment', title: '유해가스 처리', description: '가스상 오염물질 제거', icon: '🧪',
      questions: [
        { id: 'gt-1', question: 'SO₂ 제거에 사용되는 습식법 흡수제는?', options: ['활성탄', 'Ca(OH)₂', '철광석', '모래'], answer: 1, explanation: '습식 탈황에서 석회석[CaCO₃], 소석회[Ca(OH)₂] 등 알칼리성 흡수제를 사용합니다.' },
        { id: 'gt-2', question: 'NOx 제거를 위한 SCR의 환원제는?', options: ['물', '암모니아(NH₃)', '산소', '이산화탄소'], answer: 1, explanation: 'SCR(선택적촉매환원)에서 암모니아를 환원제로 사용하여 NOx를 N₂로 환원합니다.' },
        { id: 'gt-3', question: '활성탄 흡착의 원리는?', options: ['화학반응', '물리적 흡착', '연소', '침전'], answer: 1, explanation: '활성탄은 넓은 표면적을 이용한 물리적 흡착(Van der Waals력)으로 오염물질을 제거합니다.' },
        { id: 'gt-4', question: 'RTO(축열식연소장치)의 특징은?', options: ['저온처리', '열회수율 높음', '촉매 사용', '흡수'], answer: 1, explanation: 'RTO는 세라믹 축열재를 이용해 열회수율 95% 이상으로 VOC를 처리합니다.' },
        { id: 'gt-5', question: '바이오필터의 처리 대상으로 적합한 것은?', options: ['고농도 SO₂', '저농도 악취', '분진', '고온가스'], answer: 1, explanation: '바이오필터는 미생물을 이용하여 저농도 악취물질을 분해합니다.' },
      ]
    },
    {
      id: 'combustion', title: '연소공학', description: '연소와 배기가스', icon: '🔥',
      questions: [
        { id: 'cb-1', question: '완전연소의 조건이 아닌 것은?', options: ['충분한 산소', '적정 온도', '혼합', '저온 유지'], answer: 3, explanation: '완전연소는 충분한 산소, 적정 온도, 충분한 체류시간, 좋은 혼합이 필요합니다.' },
        { id: 'cb-2', question: '공기비(m)가 1.2일 때 과잉공기율은?', options: ['10%', '20%', '120%', '12%'], answer: 1, explanation: '과잉공기율 = (m-1) × 100% = (1.2-1) × 100% = 20%' },
        { id: 'cb-3', question: '연소 시 CO 발생의 원인이 아닌 것은?', options: ['산소 부족', '연소온도 낮음', '과잉공기', '혼합 불량'], answer: 2, explanation: '과잉공기는 CO 발생을 줄입니다. CO는 불완전연소의 산물입니다.' },
        { id: 'cb-4', question: '굴뚝 배출가스 중 산소농도 측정에 사용되는 것은?', options: ['GC', '지르코니아 센서', 'pH미터', 'UV'], answer: 1, explanation: '지르코니아 센서는 배기가스 중 산소농도를 연속 측정하는 데 사용됩니다.' },
        { id: 'cb-5', question: '저NOx 연소기술이 아닌 것은?', options: ['저과잉공기 연소', '2단 연소', '배가스 재순환', '고온연소'], answer: 3, explanation: '고온연소는 Thermal NOx 생성을 증가시킵니다. 저온연소가 NOx 저감에 효과적입니다.' },
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
  const prompt = (q: Question) => `[환경기사 - 대기오염방지기술] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link><span className="text-gray-300">›</span><span className="text-teal-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-sky-500 border-sky-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-sky-100 text-sky-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/environmental-engineer/study/environmental-engineering" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 환경공학개론</Link><Link href="/category/chemistry/environmental-engineer/study/water-pollution" className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">수질오염방지기술 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
