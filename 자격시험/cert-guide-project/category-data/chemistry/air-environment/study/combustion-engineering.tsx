'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function CombustionEngineeringPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'combustion-engineering', name: '연소공학', icon: '🔥', color: 'from-orange-500 to-red-500' };

  const topics: Topic[] = [
    { id: 'combustion-basics', title: '연소 기초', description: '연소의 원리와 조건', icon: '🔥',
      questions: [
        { id: 'cb-1', question: '연소의 3요소가 아닌 것은?', options: ['가연물', '산소', '점화원', '촉매'], answer: 3, explanation: '연소의 3요소는 가연물, 산소(공급원), 점화원(열)입니다.' },
        { id: 'cb-2', question: '완전연소의 조건이 아닌 것은?', options: ['충분한 산소', '적정 온도', '혼합', '저온 유지'], answer: 3, explanation: '완전연소에는 충분한 산소, 적정 온도, 좋은 혼합, 충분한 체류시간이 필요합니다.' },
        { id: 'cb-3', question: '이론공기량의 정의는?', options: ['실제 사용 공기량', '완전연소에 필요한 최소 공기량', '과잉공기량', '배가스량'], answer: 1, explanation: '이론공기량은 연료를 완전연소시키는 데 필요한 최소 공기량입니다.' },
        { id: 'cb-4', question: '공기비(m)가 1.2일 때 과잉공기율은?', options: ['12%', '20%', '120%', '1.2%'], answer: 1, explanation: '과잉공기율 = (m-1) × 100% = (1.2-1) × 100% = 20%' },
        { id: 'cb-5', question: '불완전연소의 생성물은?', options: ['CO₂만', 'CO', 'N₂', 'O₂'], answer: 1, explanation: '불완전연소 시 CO(일산화탄소), 그을음, 미연탄소 등이 생성됩니다.' },
      ]},
    { id: 'fuels', title: '연료의 종류와 특성', description: '고체, 액체, 기체 연료', icon: '⛽',
      questions: [
        { id: 'fu-1', question: '고위발열량과 저위발열량의 차이는?', options: ['연료 종류', '수증기 잠열', '온도', '압력'], answer: 1, explanation: '고위발열량 = 저위발열량 + 수증기 잠열. 수분의 증발잠열을 포함 여부가 차이입니다.' },
        { id: 'fu-2', question: '연료의 원소분석에서 C, H, O, N, S 중 발열량과 무관한 것은?', options: ['C', 'H', 'N', 'S'], answer: 2, explanation: '질소(N)는 연소에 참여하지 않아 발열량에 기여하지 않습니다.' },
        { id: 'fu-3', question: 'LNG의 주성분은?', options: ['프로판', '부탄', '메탄', '에탄'], answer: 2, explanation: 'LNG(액화천연가스)의 주성분은 메탄(CH₄)으로 약 90% 이상입니다.' },
        { id: 'fu-4', question: '무연탄과 유연탄의 차이는?', options: ['회분 함량', '휘발분 함량', '수분', '황분'], answer: 1, explanation: '무연탄은 휘발분이 적고(10% 미만), 유연탄은 휘발분이 많습니다.' },
        { id: 'fu-5', question: '연료의 인화점과 발화점 관계는?', options: ['인화점 > 발화점', '인화점 < 발화점', '같음', '관계없음'], answer: 1, explanation: '발화점(자연발화온도)은 인화점보다 높습니다. 인화점 < 연소점 < 발화점' },
      ]},
    { id: 'combustion-calc', title: '연소 계산', description: '공기량, 배가스량 계산', icon: '🧮',
      questions: [
        { id: 'cc-1', question: '메탄(CH₄) 1mol 완전연소에 필요한 O₂는?', options: ['1mol', '2mol', '3mol', '4mol'], answer: 1, explanation: 'CH₄ + 2O₂ → CO₂ + 2H₂O. 메탄 1mol당 산소 2mol 필요.' },
        { id: 'cc-2', question: '습배가스와 건배가스의 차이는?', options: ['온도', '수증기 포함 여부', '산소', 'CO₂'], answer: 1, explanation: '습배가스는 수증기 포함, 건배가스는 수증기 제외한 것입니다.' },
        { id: 'cc-3', question: '배가스 중 CO₂max의 의미는?', options: ['최대 CO₂ 배출량', '이론 연소 시 CO₂ 농도', '과잉공기 시 CO₂', '측정 최대값'], answer: 1, explanation: 'CO₂max는 이론공기량(m=1)으로 완전연소 시 배가스 중 CO₂의 최대 농도입니다.' },
        { id: 'cc-4', question: '오르자트 분석으로 측정하는 것은?', options: ['습배가스 조성', '건배가스 조성(CO₂, O₂, CO)', '연료 조성', '공기 조성'], answer: 1, explanation: '오르자트 분석은 건배가스 중 CO₂, O₂, CO의 부피 백분율을 측정합니다.' },
        { id: 'cc-5', question: '공기비 계산에 사용되는 것은?', options: ['CO₂', '배가스 중 O₂ 농도', '수분', 'N₂'], answer: 1, explanation: 'm = 21/(21-O₂) 또는 CO₂max/CO₂ 등으로 공기비를 계산합니다.' },
      ]},
    { id: 'combustion-equipment', title: '연소장치', description: '버너와 연소실', icon: '🏭',
      questions: [
        { id: 'ce-1', question: '저NOx 연소기술이 아닌 것은?', options: ['2단 연소', '배가스 재순환', '저과잉공기 연소', '고온연소'], answer: 3, explanation: '고온연소는 Thermal NOx를 증가시킵니다. 저NOx는 저온, 저산소 조건입니다.' },
        { id: 'ce-2', question: '확산 버너와 예혼합 버너의 차이는?', options: ['연료 종류', '연료-공기 혼합 위치', '용량', '온도'], answer: 1, explanation: '확산버너는 연소실에서 혼합, 예혼합버너는 버너 전에 미리 혼합합니다.' },
        { id: 'ce-3', question: '연소실의 열부하 계산에 필요한 것은?', options: ['발열량과 연소실 체적', '온도', '압력', '습도'], answer: 0, explanation: '열부하 = 연료량 × 발열량 / 연소실 체적 (kcal/m³·h)' },
        { id: 'ce-4', question: '스토커식 연소장치의 특징은?', options: ['액체연료 전용', '이동화격자', '가스전용', '회전원통'], answer: 1, explanation: '스토커식은 이동화격자(grate)를 사용하여 고형연료를 연소시킵니다.' },
        { id: 'ce-5', question: '유동층 연소의 장점이 아닌 것은?', options: ['저온연소로 NOx 저감', '다양한 연료 사용', '탈황 가능', '단순한 구조'], answer: 3, explanation: '유동층 연소는 구조가 복잡하지만 저온연소, 다연료, 노내 탈황이 가능합니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[대기환경기사 - 연소공학] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">대기환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-orange-100 text-orange-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/air-environment/study/air-pollution-overview" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 대기오염개론</Link><Link href="/category/chemistry/air-environment/study/air-pollution-control" className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">대기오염방지기술 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
