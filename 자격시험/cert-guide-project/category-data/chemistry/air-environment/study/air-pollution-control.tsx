'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function AirPollutionControlPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'air-pollution-control', name: '대기오염방지기술', icon: '🏭', color: 'from-gray-500 to-slate-600' };

  const topics: Topic[] = [
    { id: 'dust-collection', title: '집진장치', description: '입자상 물질 제거', icon: '🌪️',
      questions: [
        { id: 'dc-1', question: '전기집진기의 집진 원리는?', options: ['원심력', '관성력', '정전기력', '중력'], answer: 2, explanation: '전기집진기는 코로나 방전으로 입자에 전하를 부여하여 정전기력으로 집진합니다.' },
        { id: 'dc-2', question: '사이클론의 집진 원리는?', options: ['정전기력', '원심력', '확산', '중력'], answer: 1, explanation: '사이클론은 회전 기류에 의한 원심력으로 입자를 분리합니다.' },
        { id: 'dc-3', question: '여과집진기(백필터)에 부적합한 조건은?', options: ['건조 분진', '상온 가스', '고온·고습 가스', '미세 분진'], answer: 2, explanation: '백필터는 내열 한계가 있고, 고습 시 결로·막힘 문제가 발생합니다.' },
        { id: 'dc-4', question: '세정집진기의 장점은?', options: ['건식 운전', '가스+입자 동시처리', '폐수 없음', '고효율만'], answer: 1, explanation: '세정집진기는 물을 사용하여 가스상과 입자상 오염물질을 동시에 처리할 수 있습니다.' },
        { id: 'dc-5', question: '전기집진기의 집진효율에 영향을 주는 요소가 아닌 것은?', options: ['전압', '비저항', '분진 농도', '색상'], answer: 3, explanation: '집진효율은 전압, 비저항, 체류시간, 집진면적 등에 영향받으며 색상은 무관합니다.' },
      ]},
    { id: 'gas-treatment', title: '유해가스 처리', description: 'SOx, NOx, VOC 제거', icon: '🧪',
      questions: [
        { id: 'gt-1', question: 'SO₂ 제거 습식법의 흡수제는?', options: ['활성탄', 'Ca(OH)₂, CaCO₃', '철광석', '모래'], answer: 1, explanation: '습식 탈황에서 석회석(CaCO₃), 소석회(Ca(OH)₂) 등 알칼리성 흡수제를 사용합니다.' },
        { id: 'gt-2', question: 'SCR(선택적촉매환원)의 환원제는?', options: ['산소', '암모니아(NH₃)', '물', 'CO₂'], answer: 1, explanation: 'SCR에서 암모니아를 환원제로 사용: 4NO + 4NH₃ + O₂ → 4N₂ + 6H₂O' },
        { id: 'gt-3', question: 'SNCR과 SCR의 차이점은?', options: ['환원제', '촉매 사용 여부', '온도만', '압력'], answer: 1, explanation: 'SCR은 촉매 사용(300-400°C), SNCR은 촉매 없이 고온(850-1100°C)에서 반응합니다.' },
        { id: 'gt-4', question: 'RTO(축열식연소장치)의 특징은?', options: ['저온처리', '열회수율 95% 이상', '흡수법', '촉매 필수'], answer: 1, explanation: 'RTO는 세라믹 축열재로 열회수율 95% 이상 달성하여 VOC를 고온 산화합니다.' },
        { id: 'gt-5', question: '활성탄 흡착의 재생 방법은?', options: ['수세', '가열 탈착', '산처리', '냉각'], answer: 1, explanation: '활성탄 재생은 주로 가열하여 흡착물질을 탈착시키거나 수증기를 사용합니다.' },
      ]},
    { id: 'ventilation', title: '통풍 및 배출', description: '통풍력과 굴뚝 설계', icon: '💨',
      questions: [
        { id: 'vt-1', question: '굴뚝의 통풍력 계산에 필요한 요소가 아닌 것은?', options: ['굴뚝 높이', '온도차', '굴뚝 색상', '배가스 밀도'], answer: 2, explanation: '통풍력은 높이, 배가스-외기 온도차(밀도차)에 의존하며 색상은 무관합니다.' },
        { id: 'vt-2', question: '강제통풍의 장점은?', options: ['동력 불필요', '정밀한 유량 제어', '저비용', '단순구조'], answer: 1, explanation: '강제통풍(송풍기 사용)은 정밀한 유량 제어가 가능하고 외기 조건에 영향을 덜 받습니다.' },
        { id: 'vt-3', question: '유효굴뚝높이에 영향을 주는 요소는?', options: ['배출속도, 온도', '굴뚝 재질', '굴뚝 두께', '접지'], answer: 0, explanation: '유효굴뚝높이 = 실제높이 + 상승높이. 상승은 배출속도, 온도, 풍속에 영향받습니다.' },
        { id: 'vt-4', question: '다운워시(downwash) 방지 방법은?', options: ['굴뚝 높이 감소', '배출속도 증가', '온도 감소', '직경 증가'], answer: 1, explanation: '다운워시는 배출속도가 풍속보다 낮을 때 발생하므로 배출속도를 높입니다.' },
        { id: 'vt-5', question: '연돌효과(stack effect)는?', options: ['수평 바람', '온도차에 의한 상승기류', '압축', '확산'], answer: 1, explanation: '연돌효과는 내외부 온도차로 인한 밀도차에 의해 상승기류가 발생하는 현상입니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[대기환경기사 - 대기오염방지기술] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">대기환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-slate-500 border-slate-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-slate-100 text-slate-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/air-environment/study/combustion-engineering" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 연소공학</Link><Link href="/category/chemistry/air-environment/study/air-testing" className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-xl font-medium text-center hover:opacity-90 transition">대기오염공정시험기준 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
