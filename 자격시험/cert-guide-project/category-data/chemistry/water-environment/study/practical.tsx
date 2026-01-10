'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'water-practical', name: '실기', icon: '🧪', color: 'from-amber-500 to-orange-500' };

  const topics: Topic[] = [
    { id: 'design-calc', title: '설계 계산', description: '처리시설 설계', icon: '📐',
      questions: [
        { id: 'dc-1', question: '폭기조 용량 설계 시 필요한 인자는?', options: ['색상', '유량, BOD, MLSS, F/M비', '온도만', '습도'], answer: 1, explanation: 'V = Q × BOD / (MLSS × F/M). 유량, BOD부하, MLSS, F/M비로 계산합니다.' },
        { id: 'dc-2', question: '침전지 설계 시 수면적부하율의 단위는?', options: ['m/h', 'm³/m²·일', 'kg/일', 'mg/L'], answer: 1, explanation: '수면적부하율(SOR) = Q/A, 단위는 m³/m²·일입니다.' },
        { id: 'dc-3', question: 'SRT가 10일, 폭기조 MLSS 3000mg/L일 때 슬러지 생산량 계산에 필요한 것은?', options: ['폭기조 용량', '색상', '습도', '압력'], answer: 0, explanation: '슬러지 생산량 = (V × MLSS) / SRT. 폭기조 용량(V)이 필요합니다.' },
        { id: 'dc-4', question: '반송슬러지 비율(R) 계산식은?', options: ['MLSS / Xr', 'Xr - MLSS', 'MLSS / (Xr - MLSS)', '유량 / MLSS'], answer: 2, explanation: 'R = MLSS / (Xr - MLSS). Xr: 반송슬러지 농도' },
        { id: 'dc-5', question: '활성슬러지법에서 F/M비의 적정 범위는?', options: ['0.01~0.05', '0.2~0.4', '1~2', '5~10'], answer: 1, explanation: '표준 활성슬러지법의 F/M비는 0.2~0.4 kgBOD/kgMLSS·일입니다.' },
      ]},
    { id: 'operation', title: '운전 관리', description: '시설 운영 실무', icon: '⚙️',
      questions: [
        { id: 'op-1', question: '활성슬러지 SVI 측정 방법은?', options: ['원심분리', '30분 침전 후 부피', '여과', '증류'], answer: 1, explanation: 'SVI = (30분 침전슬러지 부피 mL/L) / (MLSS mg/L) × 1000' },
        { id: 'op-2', question: 'SVI가 150 이상일 때 발생하는 현상은?', options: ['정상', '벌킹(bulking)', '효율 최고', '관계없음'], answer: 1, explanation: 'SVI > 150이면 슬러지 침강성이 불량하여 벌킹 상태입니다.' },
        { id: 'op-3', question: '용존산소(DO) 유지 범위로 적절한 것은?', options: ['0~0.5 mg/L', '1~2 mg/L', '2~4 mg/L', '10 mg/L 이상'], answer: 2, explanation: '폭기조 DO는 2~4 mg/L로 유지하는 것이 적정합니다.' },
        { id: 'op-4', question: '소화조 온도 관리 범위(중온소화)는?', options: ['10~20°C', '30~37°C', '50~60°C', '70°C 이상'], answer: 1, explanation: '중온소화는 30~37°C, 고온소화는 50~55°C에서 운전합니다.' },
        { id: 'op-5', question: '반송슬러지 펌프 고장 시 발생하는 문제는?', options: ['DO 상승', 'MLSS 감소', '처리수 개선', '관계없음'], answer: 1, explanation: '반송펌프 고장 시 폭기조 MLSS가 감소하여 처리효율이 저하됩니다.' },
      ]},
    { id: 'analysis-calc', title: '분석 계산', description: '농도 환산 및 계산', icon: '🧮',
      questions: [
        { id: 'ac-1', question: 'BOD 제거효율 계산식은?', options: ['유입/유출', '(유입-유출)/유입 × 100', '유출-유입', '유입+유출'], answer: 1, explanation: '제거효율(%) = (유입농도 - 유출농도) / 유입농도 × 100' },
        { id: 'ac-2', question: 'ppm을 mg/L로 환산 시 (물의 경우)?', options: ['10배', '같음', '1000배', '100배'], answer: 1, explanation: '물의 비중이 1일 때 1 ppm = 1 mg/L입니다.' },
        { id: 'ac-3', question: '희석배율 50배로 분석한 시료의 실제 농도는?', options: ['측정값 × 50', '측정값 / 50', '측정값 + 50', '관계없음'], answer: 0, explanation: '실제 농도 = 측정 농도 × 희석배율' },
        { id: 'ac-4', question: '유량 100m³/일, BOD 200mg/L일 때 BOD 부하량은?', options: ['2 kg/일', '20 kg/일', '200 kg/일', '0.2 kg/일'], answer: 1, explanation: 'BOD 부하량 = 100 × 200 / 1000 = 20 kg/일' },
        { id: 'ac-5', question: '슬러지 함수율 98%의 의미는?', options: ['고형물 98%', '수분 98%, 고형물 2%', '고형물 50%', '수분 2%'], answer: 1, explanation: '함수율 98%는 수분이 98%, 고형물(TS)이 2%를 의미합니다.' },
      ]},
    { id: 'regulations', title: '법규 및 기준', description: '배출허용기준, 법규', icon: '📜',
      questions: [
        { id: 'rg-1', question: '수질오염물질 배출시설 설치 시 필요한 것은?', options: ['등록', '허가 또는 신고', '통보', '없음'], answer: 1, explanation: '배출시설 설치 시 시설 규모에 따라 허가 또는 신고가 필요합니다.' },
        { id: 'rg-2', question: '공공하수처리시설의 방류수 BOD 기준은?', options: ['100 mg/L', '10 mg/L 이하', '50 mg/L', '200 mg/L'], answer: 1, explanation: '공공하수처리시설 방류수 BOD 기준은 10 mg/L 이하(I지역)입니다.' },
        { id: 'rg-3', question: '수질오염경보제의 발령 기준이 아닌 것은?', options: ['조류경보', '수온경보', '수질오염사고', '악취경보'], answer: 3, explanation: '수질오염경보는 조류경보, 수질예보, 수질오염사고 등이 있습니다.' },
        { id: 'rg-4', question: '환경기술인 배치 기준은?', options: ['규모 무관', '배출시설 규모에 따라', '자발적', '선택적'], answer: 1, explanation: '배출시설 규모에 따라 환경기술인 배치 기준이 다릅니다.' },
        { id: 'rg-5', question: '총량관리제의 목적은?', options: ['농도 기준만', '오염물질 총량 관리', '온도 관리', '유량 관리'], answer: 1, explanation: '총량관리제는 배출 오염물질의 총량을 지역 단위로 관리하는 제도입니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[수질환경기사 - 실기] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">수질환경기사 실기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/water-environment/study/water-testing" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 수질오염공정시험기준</Link><Link href="/category/chemistry/water-environment" className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">수질환경기사 홈 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
