'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WaterTreatmentPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'water-treatment', name: '상하수도계획', icon: '🚰', color: 'from-teal-500 to-green-500' };

  const topics: Topic[] = [
    { id: 'water-supply', title: '상수도 계획', description: '상수도 시설 및 계획', icon: '💧',
      questions: [
        { id: 'ws-1', question: '상수도 계획급수량의 순서로 옳은 것은?', options: ['계획1일최대 > 계획1일평균', '계획1일평균 > 계획1일최대', '같음', '관계없음'], answer: 0, explanation: '계획1일최대급수량 > 계획1일평균급수량. 최대급수량은 평균의 1.2~1.5배입니다.' },
        { id: 'ws-2', question: '계획급수인구 추정 방법이 아닌 것은?', options: ['등차급수법', '등비급수법', '최소자승법', '적분법'], answer: 3, explanation: '인구추정은 등차급수법, 등비급수법, 로지스틱법, 최소자승법 등을 사용합니다.' },
        { id: 'ws-3', question: '배수관망의 종류 중 격자식의 장점은?', options: ['경제적', '수압 균등', '관리 용이', '단순함'], answer: 1, explanation: '격자식(그리드)은 양방향 급수가 가능하여 수압이 균등하고 사고 시 대응이 유리합니다.' },
        { id: 'ws-4', question: '급수관의 관경 결정 시 고려사항이 아닌 것은?', options: ['유량', '유속', '관 색상', '마찰손실'], answer: 2, explanation: '관경은 유량, 유속, 마찰손실수두, 수압 등을 고려하여 결정합니다.' },
        { id: 'ws-5', question: '배수지의 유효용량 산정 시 포함되는 것은?', options: ['기초', '시간변동', '조도', '색상'], answer: 1, explanation: '배수지 용량 = 시간변동분 + 비상시용량 + 소화용수량' },
      ]},
    { id: 'water-treatment-process', title: '정수처리', description: '상수 처리 공정', icon: '🏭',
      questions: [
        { id: 'wt-1', question: '정수처리의 일반적인 순서는?', options: ['여과→침전→응집', '응집→침전→여과', '침전→응집→여과', '여과→응집→침전'], answer: 1, explanation: '일반적인 정수처리: 착수정→혼화→응집→침전→여과→소독' },
        { id: 'wt-2', question: '응집제로 주로 사용되는 것은?', options: ['염소', '황산알루미늄', '활성탄', '석회'], answer: 1, explanation: '황산알루미늄(Al₂(SO₄)₃), PAC 등이 응집제로 사용됩니다.' },
        { id: 'wt-3', question: '급속여과지의 여과속도는?', options: ['4~5 m/일', '50~80 m/일', '120~150 m/일', '300~400 m/일'], answer: 2, explanation: '급속여과지의 여과속도는 120~150 m/일 정도입니다. 완속여과지는 4~5 m/일.' },
        { id: 'wt-4', question: '소독의 목적은?', options: ['탁도 제거', '병원균 살균', '경도 제거', '색도 제거'], answer: 1, explanation: '소독은 정수 중 병원균을 불활성화하여 음용 안전성을 확보합니다.' },
        { id: 'wt-5', question: '잔류염소의 의미는?', options: ['투입 염소량', '소독 후 남은 염소', '반응한 염소', '증발한 염소'], answer: 1, explanation: '잔류염소는 소독 후 물 속에 남아있는 유효 염소로 지속적인 살균효과를 제공합니다.' },
      ]},
    { id: 'sewerage-system', title: '하수도 계획', description: '하수도 시설 및 계획', icon: '🌊',
      questions: [
        { id: 'ss-1', question: '합류식 하수도의 특징은?', options: ['오수만 수집', '우수만 수집', '오수+우수 함께', '처리수 수집'], answer: 2, explanation: '합류식은 오수와 우수를 함께 수집하는 방식입니다.' },
        { id: 'ss-2', question: '분류식 하수도의 장점은?', options: ['경제적', '처리장 부하 일정', '관리 단순', '우천시 유리'], answer: 1, explanation: '분류식은 오수만 처리하므로 처리장 부하가 일정하고 효율적입니다.' },
        { id: 'ss-3', question: '하수관거의 최소 유속을 유지하는 이유는?', options: ['소음 방지', '침전 방지', '부식 방지', '냄새 방지'], answer: 1, explanation: '최소유속(0.6~0.8m/s)을 유지하여 관 내 고형물의 침전을 방지합니다.' },
        { id: 'ss-4', question: '우수관거 설계 시 사용되는 것은?', options: ['BOD', '확률년수 강우강도', 'SS', 'pH'], answer: 1, explanation: '우수관거는 확률년수(5~10년)에 해당하는 강우강도를 적용하여 설계합니다.' },
        { id: 'ss-5', question: '맨홀의 설치 간격 기준은?', options: ['10m', '50m 이내', '관경에 따라 다름', '200m'], answer: 2, explanation: '맨홀 설치 간격은 관경에 따라 다르며, 일반적으로 관경 600mm 이하는 75m 이내입니다.' },
      ]},
    { id: 'pipe-hydraulics', title: '관로 수리', description: '관수로 및 개수로', icon: '📐',
      questions: [
        { id: 'ph-1', question: '하젠-윌리엄스(Hazen-Williams) 공식에서 조도계수 C의 의미는?', options: ['값이 클수록 거침', '값이 클수록 매끄러움', '유량', '유속'], answer: 1, explanation: 'C값이 클수록 관 내면이 매끄럽고 마찰손실이 적습니다. (새 주철관 C=130)' },
        { id: 'ph-2', question: '개수로에서 등류의 조건은?', options: ['유속 증가', '유속 감소', '유속과 수심 일정', '유량 변화'], answer: 2, explanation: '등류(uniform flow)는 유속과 수심이 일정하게 유지되는 흐름입니다.' },
        { id: 'ph-3', question: '매닝(Manning) 공식의 적용 대상은?', options: ['압력관', '개수로', '펌프', '밸브'], answer: 1, explanation: '매닝 공식은 개수로(하수관거, 하천) 유속 계산에 사용됩니다.' },
        { id: 'ph-4', question: '수격현상(water hammer)의 원인은?', options: ['밸브 서서히 개폐', '밸브 급속 개폐', '온도 상승', '유량 증가'], answer: 1, explanation: '수격현상은 밸브를 급속히 개폐할 때 압력파가 발생하여 관을 손상시킬 수 있습니다.' },
        { id: 'ph-5', question: '손실수두의 종류가 아닌 것은?', options: ['마찰손실', '곡관손실', '색상손실', '밸브손실'], answer: 2, explanation: '손실수두에는 마찰손실, 곡관손실, 밸브손실, 확대·축소손실 등이 있습니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[수질환경기사 - 상하수도계획] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">수질환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-teal-100 text-teal-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/water-environment/study/water-pollution-overview" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 수질오염개론</Link><Link href="/category/chemistry/water-environment/study/water-pollution-control" className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">수질오염방지기술 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
