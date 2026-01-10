'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'ee-practical', name: '실기', icon: '🧪', color: 'from-orange-500 to-red-500' };

  const topics: Topic[] = [
    {
      id: 'design-calculation', title: '시설 설계 계산', description: '오염방지시설 설계', icon: '📐',
      questions: [
        { id: 'dc-1', question: '침전지 표면부하율 계산식은?', options: ['Q/V', 'Q/A', 'V/A', 'A/Q'], answer: 1, explanation: '표면부하율 = Q(유량) / A(침전지 면적), 단위: m³/m²·day' },
        { id: 'dc-2', question: 'BOD 제거효율 90%일 때 유출수 BOD는? (유입 200mg/L)', options: ['10mg/L', '20mg/L', '180mg/L', '190mg/L'], answer: 1, explanation: '유출 BOD = 200 × (1-0.9) = 200 × 0.1 = 20mg/L' },
        { id: 'dc-3', question: '집진효율 99%인 장치 3개 직렬 연결 시 총효율은?', options: ['99%', '99.9%', '99.99%', '99.9999%'], answer: 3, explanation: '총효율 = 1 - (0.01)³ = 1 - 0.000001 = 99.9999%' },
        { id: 'dc-4', question: '슬러지 함수율 98%를 95%로 낮추면 부피는?', options: ['약 1/2.5', '약 1/5', '약 1/10', '변화없음'], answer: 0, explanation: '부피비 = (100-98)/(100-95) = 2/5 = 0.4, 약 1/2.5로 감소' },
        { id: 'dc-5', question: '공기비 1.3일 때 과잉공기율은?', options: ['13%', '30%', '130%', '1.3%'], answer: 1, explanation: '과잉공기율 = (m-1) × 100% = (1.3-1) × 100% = 30%' },
      ]
    },
    {
      id: 'measurement', title: '환경측정분석', description: '공정시험기준', icon: '🔬',
      questions: [
        { id: 'ms-1', question: 'BOD 측정 시 식종(seeding)의 목적은?', options: ['산소 공급', '미생물 접종', '온도 유지', '희석'], answer: 1, explanation: '식종은 유기물 분해에 필요한 미생물을 접종하는 과정입니다.' },
        { id: 'ms-2', question: 'COD(Mn)법과 COD(Cr)법의 차이점은?', options: ['온도', '산화력', '시간', '압력'], answer: 1, explanation: 'K₂Cr₂O₇(Cr법)이 KMnO₄(Mn법)보다 산화력이 강해 CODCr ≥ CODMn입니다.' },
        { id: 'ms-3', question: '대기오염 측정 시 등속흡인의 목적은?', options: ['비용 절감', '대표성 있는 시료채취', '시간 단축', '가스 분석'], answer: 1, explanation: '등속흡인은 굴뚝 내 입자상 물질을 대표성 있게 채취하기 위함입니다.' },
        { id: 'ms-4', question: '수질 시료 보존 시 질산 첨가 목적은?', options: ['살균', '금속 용해 유지', '색도 제거', 'pH 상승'], answer: 1, explanation: 'HNO₃ 첨가는 pH를 낮춰 금속 침전을 방지하고 용해 상태를 유지합니다.' },
        { id: 'ms-5', question: 'GC-MS의 역할은?', options: ['분리만', '검출만', '분리 및 정성·정량', '농축'], answer: 2, explanation: 'GC로 분리하고 MS로 정성(물질확인)·정량 분석을 수행합니다.' },
      ]
    },
    {
      id: 'operation', title: '시설 운전관리', description: '처리시설 운영', icon: '⚙️',
      questions: [
        { id: 'op-1', question: '활성슬러지 벌킹의 원인이 아닌 것은?', options: ['저부하', '영양소 부족', '적정 F/M', '낮은 DO'], answer: 2, explanation: '벌킹은 저부하, 영양소 부족, 낮은 DO 등이 원인이며, 적정 F/M에서는 발생하지 않습니다.' },
        { id: 'op-2', question: 'SVI(슬러지용량지수)가 높으면?', options: ['침전성 좋음', '침전성 나쁨', '농도 높음', 'BOD 높음'], answer: 1, explanation: 'SVI가 높으면(>150) 슬러지가 잘 침전하지 않아 벌킹 상태입니다.' },
        { id: 'op-3', question: '소각로 운전 시 CO 발생 증가 원인은?', options: ['과잉공기', '완전연소', '산소 부족', '고온'], answer: 2, explanation: 'CO는 불완전연소 생성물로 산소 부족 시 발생이 증가합니다.' },
        { id: 'op-4', question: '막분리 공정에서 막오염(fouling) 원인이 아닌 것은?', options: ['유기물', '무기물', '미생물', '순수'], answer: 3, explanation: '순수(pure water)는 막오염을 일으키지 않습니다.' },
        { id: 'op-5', question: '침전지에서 단락류(short circuit) 방지책은?', options: ['정류벽 설치', '유속 증가', '면적 감소', '깊이 감소'], answer: 0, explanation: '정류벽은 흐름을 균일하게 하여 단락류를 방지합니다.' },
      ]
    },
    {
      id: 'regulations', title: '환경법규', description: '환경관계법령', icon: '📜',
      questions: [
        { id: 'rg-1', question: '환경영향평가 대상 사업의 결정 기준은?', options: ['사업비', '사업규모·입지', '사업자', '시공사'], answer: 1, explanation: '환경영향평가 대상은 사업의 규모와 입지에 따라 결정됩니다.' },
        { id: 'rg-2', question: '배출허용기준 초과 시 행정처분 순서는?', options: ['영업정지→개선명령', '개선명령→경고→영업정지', '과태료만', '허가취소만'], answer: 1, explanation: '초과 시 개선명령 → 조업정지 → 허가취소 등 단계별 처분이 이루어집니다.' },
        { id: 'rg-3', question: '통합환경관리제도의 목적은?', options: ['매체별 관리', '통합허가로 효율적 관리', '규제 강화만', '비용 증가'], answer: 1, explanation: '대기·수질·폐기물을 통합허가하여 효율적이고 종합적으로 관리합니다.' },
        { id: 'rg-4', question: '자가측정 의무 대상은?', options: ['모든 사업장', '배출시설 설치 사업장', '가정', '농업'], answer: 1, explanation: '배출시설을 설치·운영하는 사업장은 자가측정 의무가 있습니다.' },
        { id: 'rg-5', question: '환경기술인 배치 의무 대상 기준은?', options: ['매출액', '오염물질 배출량', '종업원 수', '자본금'], answer: 1, explanation: '배출시설 규모(오염물질 배출량 등)에 따라 환경기술인 배치가 의무화됩니다.' },
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
  const prompt = (q: Question) => `[환경기사 - 실기] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link><span className="text-gray-300">›</span><span className="text-teal-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">환경기사 실기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-orange-100 text-orange-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/environmental-engineer/study/noise-vibration" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 소음진동</Link><Link href="/category/chemistry/environmental-engineer" className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">환경기사 홈 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
