'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function AirTestingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'air-testing', name: '대기오염공정시험기준', icon: '🔬', color: 'from-purple-500 to-pink-500' };

  const topics: Topic[] = [
    { id: 'sampling', title: '시료채취', description: '대기오염물질 시료채취 방법', icon: '🎯',
      questions: [
        { id: 'sp-1', question: '등속흡인의 목적은?', options: ['비용 절감', '대표성 있는 입자 채취', '시간 단축', '가스 분석'], answer: 1, explanation: '등속흡인은 굴뚝 내 유속과 같은 속도로 흡인하여 입자 시료의 대표성을 확보합니다.' },
        { id: 'sp-2', question: '가스상 시료채취 시 흡수법에 사용되는 장치는?', options: ['필터', '임핀저', '캐니스터', '흡착관'], answer: 1, explanation: '임핀저(impinger)는 가스상 오염물질을 흡수액에 용해시켜 채취합니다.' },
        { id: 'sp-3', question: '피토관으로 측정하는 것은?', options: ['온도', '유속', '농도', '습도'], answer: 1, explanation: '피토관은 정압과 동압의 차이를 이용하여 배가스 유속을 측정합니다.' },
        { id: 'sp-4', question: '측정 구멍의 위치 선정 기준은?', options: ['배출구에서 직경 2배', '방해물 전 8D, 후 2D', '입구', '아무 곳'], answer: 1, explanation: '측정구는 방해물 상류로 직경의 8배, 하류로 2배 이상 떨어진 곳에 설치합니다.' },
        { id: 'sp-5', question: '여지(필터) 채취 시 온도 유지 이유는?', options: ['안전', '수분 응축 방지', '색 변화', '분석 편의'], answer: 1, explanation: '여지 온도를 노점 이상으로 유지하여 수분 응축에 의한 측정 오류를 방지합니다.' },
      ]},
    { id: 'gas-analysis', title: '가스상 물질 분석', description: '오염물질 농도 측정', icon: '📊',
      questions: [
        { id: 'ga-1', question: 'SO₂ 측정에 사용되는 방법이 아닌 것은?', options: ['적정법', '이온크로마토그래피', '자외선형광법', 'GC-FID'], answer: 3, explanation: 'GC-FID는 VOC 측정에 사용됩니다. SO₂는 적정법, IC, 자외선형광법 등으로 측정합니다.' },
        { id: 'ga-2', question: 'NOx 측정에 사용되는 화학발광법의 원리는?', options: ['흡수', 'NO + O₃ 반응 발광', '형광', '연소'], answer: 1, explanation: '화학발광법: NO + O₃ → NO₂* → NO₂ + hν (빛 발생)' },
        { id: 'ga-3', question: '배출가스 중 O₂ 농도 연속측정에 사용되는 것은?', options: ['pH미터', '지르코니아 센서', 'GC', 'UV'], answer: 1, explanation: '지르코니아 산소센서는 고온에서 배가스 중 O₂를 연속 측정합니다.' },
        { id: 'ga-4', question: 'VOC 측정에 주로 사용되는 검출기는?', options: ['TCD', 'FID', 'ECD', 'PID'], answer: 1, explanation: 'FID(불꽃이온화검출기)는 탄화수소 계열 VOC 측정에 널리 사용됩니다.' },
        { id: 'ga-5', question: 'CO 측정에 사용되는 비분산적외선법(NDIR)의 원리는?', options: ['흡수', '형광', 'CO의 적외선 흡수', '연소'], answer: 2, explanation: 'NDIR은 CO가 특정 파장의 적외선을 흡수하는 원리를 이용합니다.' },
      ]},
    { id: 'particulate-analysis', title: '입자상 물질 분석', description: '먼지 농도 측정', icon: '🌫️',
      questions: [
        { id: 'pa-1', question: '총먼지 측정 시 사용되는 여지 건조온도는?', options: ['50°C', '105~110°C', '200°C', '300°C'], answer: 1, explanation: '여지는 105~110°C에서 항량이 될 때까지 건조하여 칭량합니다.' },
        { id: 'pa-2', question: '중량법 먼지 측정의 원리는?', options: ['흡광도', '여과 후 중량 측정', '형광', '화학반응'], answer: 1, explanation: '중량법은 여지에 입자를 포집한 후 무게 증가량으로 농도를 계산합니다.' },
        { id: 'pa-3', question: '광산란법의 장점은?', options: ['고정밀', '연속 측정 가능', '저가', '습식'], answer: 1, explanation: '광산란법은 빛의 산란을 이용하여 실시간 연속 측정이 가능합니다.' },
        { id: 'pa-4', question: '먼지 농도 환산에 필요한 것은?', options: ['색상', '표준산소농도', '습도만', '압력만'], answer: 1, explanation: '배출허용기준 적용 시 표준산소농도(보통 12~15%)로 환산합니다.' },
        { id: 'pa-5', question: '입자 크기 측정에 사용되는 캐스케이드 임팩터의 원리는?', options: ['중력', '관성충돌', '정전기', '확산'], answer: 1, explanation: '캐스케이드 임팩터는 관성충돌을 이용해 입자를 크기별로 분류합니다.' },
      ]},
    { id: 'calculation', title: '농도 환산 및 계산', description: '표준상태 환산, 단위', icon: '🧮',
      questions: [
        { id: 'cl-1', question: '표준상태의 조건은?', options: ['25°C, 1기압', '0°C, 1기압', '20°C, 1기압', '15°C, 1기압'], answer: 1, explanation: '표준상태(STP)는 0°C(273K), 1기압(760mmHg)입니다.' },
        { id: 'cl-2', question: 'ppm을 mg/m³으로 환산할 때 필요한 것은?', options: ['색상', '분자량', '밀도만', '점도'], answer: 1, explanation: 'mg/m³ = ppm × 분자량 / 22.4 (표준상태 기준)' },
        { id: 'cl-3', question: '산소보정 농도 계산식에 사용되는 것은?', options: ['표준산소농도와 측정산소농도', '온도', '습도', '압력'], answer: 0, explanation: 'Cs = C × (21-Os)/(21-Om). Os: 표준O₂, Om: 측정O₂' },
        { id: 'cl-4', question: '습배가스를 건배가스로 환산하는 이유는?', options: ['편의', '수분 변동 배제', '비용', '규정'], answer: 1, explanation: '수분 함량이 변동하므로 건조 기준으로 환산하여 비교합니다.' },
        { id: 'cl-5', question: '배출량(kg/h) 계산에 필요한 것은?', options: ['농도, 유량', '색상', '습도만', '온도만'], answer: 0, explanation: '배출량 = 농도(mg/m³) × 유량(m³/h) / 1,000,000' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[대기환경기사 - 대기오염공정시험기준] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">대기환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-purple-100 text-purple-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/air-environment/study/air-pollution-control" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 대기오염방지기술</Link><Link href="/category/chemistry/air-environment/study/practical" className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">실기 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
