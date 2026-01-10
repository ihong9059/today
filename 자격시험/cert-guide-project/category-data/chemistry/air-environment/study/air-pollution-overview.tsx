'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function AirPollutionOverviewPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'air-pollution-overview', name: '대기오염개론', icon: '🌍', color: 'from-sky-500 to-blue-500' };

  const topics: Topic[] = [
    { id: 'air-basics', title: '대기의 구성과 특성', description: '대기권과 대기오염', icon: '🌐',
      questions: [
        { id: 'ab-1', question: '대기 중 질소(N₂)의 부피 비율은 약?', options: ['21%', '78%', '0.9%', '0.03%'], answer: 1, explanation: '대기는 질소 약 78%, 산소 약 21%로 구성됩니다.' },
        { id: 'ab-2', question: '성층권 오존층의 역할은?', options: ['산소 공급', '자외선 차단', '열 발생', '구름 형성'], answer: 1, explanation: '성층권 오존층은 태양의 유해 자외선(UV-B, UV-C)을 흡수합니다.' },
        { id: 'ab-3', question: '대류권의 특성으로 옳은 것은?', options: ['고도 상승시 온도 상승', '오존층 존재', '기상현상 발생', '무중력'], answer: 2, explanation: '대류권에서는 대류가 일어나 구름, 비 등 기상현상이 발생합니다.' },
        { id: 'ab-4', question: '1차 오염물질에 해당하는 것은?', options: ['O₃', 'PAN', 'SO₂', '광화학스모그'], answer: 2, explanation: 'SO₂는 배출원에서 직접 배출되는 1차 오염물질입니다.' },
        { id: 'ab-5', question: '2차 오염물질의 예는?', options: ['CO', 'NO', '오존(O₃)', '분진'], answer: 2, explanation: '오존은 NOx와 VOC가 광화학반응하여 생성되는 2차 오염물질입니다.' },
      ]},
    { id: 'pollutant-types', title: '대기오염물질의 종류', description: '입자상·가스상 오염물질', icon: '💨',
      questions: [
        { id: 'pt-1', question: 'PM2.5의 정의는?', options: ['직경 2.5mm 이하', '직경 2.5μm 이하', '직경 10μm 이하', '질량 2.5g'], answer: 1, explanation: 'PM2.5는 공기역학적 직경 2.5μm 이하의 미세먼지입니다.' },
        { id: 'pt-2', question: 'VOC(휘발성유기화합물)의 특성이 아닌 것은?', options: ['높은 증기압', '광화학반응 참여', '비휘발성', '탄소 함유'], answer: 2, explanation: 'VOC는 휘발성이 높아 쉽게 기화됩니다. 비휘발성은 반대 특성입니다.' },
        { id: 'pt-3', question: '황산화물(SOx)의 주요 배출원은?', options: ['농업', '화력발전', '자동차', '폐수처리'], answer: 1, explanation: '화력발전소에서 황 함유 연료(석탄, 중유) 연소 시 SOx가 발생합니다.' },
        { id: 'pt-4', question: 'CO의 인체 영향은?', options: ['폐암', '산소운반 저해', '피부질환', '청력손실'], answer: 1, explanation: 'CO는 헤모글로빈과 결합하여 산소운반을 저해합니다.' },
        { id: 'pt-5', question: 'NOx 생성의 주요 원인은?', options: ['저온연소', '고온연소', '혐기조건', '습도'], answer: 1, explanation: 'Thermal NOx는 고온(1300°C 이상)에서 N₂와 O₂의 반응으로 생성됩니다.' },
      ]},
    { id: 'air-effects', title: '대기오염의 영향', description: '환경 및 건강 영향', icon: '🏥',
      questions: [
        { id: 'ae-1', question: '산성비의 pH 기준은?', options: ['pH 7 미만', 'pH 5.6 미만', 'pH 4 미만', 'pH 8 미만'], answer: 1, explanation: '자연 빗물은 CO₂ 용해로 pH 5.6이며, 그 미만을 산성비라 합니다.' },
        { id: 'ae-2', question: '오존층 파괴물질은?', options: ['CO₂', 'CFCs', 'CH₄', 'N₂O'], answer: 1, explanation: 'CFCs(프레온가스)는 성층권에서 염소를 방출하여 오존을 파괴합니다.' },
        { id: 'ae-3', question: '광화학스모그의 주요 증상은?', options: ['피부 발진', '눈 자극, 호흡곤란', '청력 손실', '빈혈'], answer: 1, explanation: '광화학스모그(오존)은 눈 자극, 기도 자극, 호흡곤란을 유발합니다.' },
        { id: 'ae-4', question: '온실가스 중 GWP가 가장 높은 것은?', options: ['CO₂', 'CH₄', 'N₂O', 'SF₆'], answer: 3, explanation: 'SF₆의 GWP는 약 23,900으로 가장 높습니다. CO₂는 1입니다.' },
        { id: 'ae-5', question: '스모그의 종류 중 런던형의 특징은?', options: ['광화학 반응', 'SO₂, 분진', '고온', '여름철'], answer: 1, explanation: '런던형 스모그는 SO₂와 분진이 안개와 결합하여 발생합니다.' },
      ]},
    { id: 'meteorology', title: '대기확산과 기상', description: '오염물질 확산과 기상조건', icon: '🌤️',
      questions: [
        { id: 'mt-1', question: '역전층이 발생하면?', options: ['확산 촉진', '오염물질 정체', '강우 증가', '풍속 증가'], answer: 1, explanation: '역전층은 상층이 더 따뜻하여 대류가 억제되고 오염물질이 정체됩니다.' },
        { id: 'mt-2', question: '굴뚝 연기 형태 중 fumigation은?', options: ['부채형', '훈증형', '원추형', '루핑형'], answer: 1, explanation: 'Fumigation(훈증형)은 역전층 붕괴 시 지상으로 오염물질이 급격히 하강합니다.' },
        { id: 'mt-3', question: '유효굴뚝높이에 영향을 주는 요소가 아닌 것은?', options: ['배출속도', '배가스 온도', '풍속', '굴뚝 색상'], answer: 3, explanation: '유효굴뚝높이는 배출속도, 온도, 풍속에 영향받으며 색상은 무관합니다.' },
        { id: 'mt-4', question: 'Pasquill 안정도 분류에서 가장 불안정한 것은?', options: ['A', 'D', 'F', 'G'], answer: 0, explanation: 'A(매우 불안정) > B > C > D(중립) > E > F(안정) 순입니다.' },
        { id: 'mt-5', question: '해륙풍의 발생 원인은?', options: ['기압 차이', '육지/해양의 비열 차이', '지형', '습도'], answer: 1, explanation: '육지와 바다의 비열 차이로 낮에는 해풍, 밤에는 육풍이 발생합니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[대기환경기사 - 대기오염개론] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">대기환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-sky-500 border-sky-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-sky-100 text-sky-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/air-environment" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 대기환경기사 홈</Link><Link href="/category/chemistry/air-environment/study/combustion-engineering" className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">연소공학 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
