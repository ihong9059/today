'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function WaterPollutionControlPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'water-pollution-control', name: '수질오염방지기술', icon: '🏭', color: 'from-gray-500 to-slate-600' };

  const topics: Topic[] = [
    { id: 'physical-treatment', title: '물리적 처리', description: '스크린, 침전, 부상, 여과', icon: '⚙️',
      questions: [
        { id: 'pt-1', question: '1차 침전지의 주요 제거 대상은?', options: ['용존성 유기물', '침전 가능 고형물', '질소', '인'], answer: 1, explanation: '1차 침전지는 침전 가능한 고형물(SS)을 물리적으로 제거합니다.' },
        { id: 'pt-2', question: '부상분리법의 원리는?', options: ['중력', '미세기포 부착', '자력', '원심력'], answer: 1, explanation: '부상분리는 미세기포를 발생시켜 고형물에 부착, 수면으로 부상시켜 제거합니다.' },
        { id: 'pt-3', question: '침전효율에 영향을 주는 인자가 아닌 것은?', options: ['수면적', '수온', '유속', '색상'], answer: 3, explanation: '침전효율은 수면적, 수온, 입자크기, 체류시간, 유속 등에 영향받습니다.' },
        { id: 'pt-4', question: '막분리 공정 중 가장 미세한 것을 제거하는 것은?', options: ['MF', 'UF', 'NF', 'RO'], answer: 3, explanation: '제거 크기: RO(역삼투) < NF < UF(한외여과) < MF(정밀여과)' },
        { id: 'pt-5', question: '원심분리기의 적용 대상은?', options: ['용존물질', '슬러지 농축', '가스', '색도'], answer: 1, explanation: '원심분리기는 원심력을 이용하여 슬러지를 농축·탈수합니다.' },
      ]},
    { id: 'chemical-treatment', title: '화학적 처리', description: '응집, 중화, 산화, 흡착', icon: '🧪',
      questions: [
        { id: 'ct-1', question: '응집제 주입 시 pH 조정이 필요한 이유는?', options: ['냄새 제거', '최적 응집 pH 유지', '색 변화', '온도 조절'], answer: 1, explanation: '응집제마다 최적 pH 범위가 있어 pH 조정이 필요합니다. (PAC: pH 6~8)' },
        { id: 'ct-2', question: '인(P) 제거에 효과적인 방법은?', options: ['활성탄 흡착', '응집침전(화학적 침전)', '스크린', '포기'], answer: 1, explanation: '인은 철염, 알루미늄염, 석회 등을 이용한 화학적 침전으로 효과적으로 제거됩니다.' },
        { id: 'ct-3', question: '중화처리의 목적은?', options: ['SS 제거', 'pH 조정', '탈질', '탈인'], answer: 1, explanation: '중화처리는 산성 또는 알칼리성 폐수의 pH를 중성 범위로 조정합니다.' },
        { id: 'ct-4', question: '고도산화법(AOP)의 특징은?', options: ['저에너지', '·OH 라디칼 이용', '저비용', '물리적 방법'], answer: 1, explanation: 'AOP는 ·OH(수산화라디칼)를 생성하여 난분해성 물질을 산화분해합니다.' },
        { id: 'ct-5', question: '활성탄 흡착의 재생 방법은?', options: ['수세', '가열 재생', '산처리', '냉각'], answer: 1, explanation: '포화된 활성탄은 600~900°C에서 가열하여 흡착물질을 탈착, 재생합니다.' },
      ]},
    { id: 'biological-treatment', title: '생물학적 처리', description: '활성슬러지, 생물막법', icon: '🦠',
      questions: [
        { id: 'bt-1', question: '활성슬러지법의 핵심 구성요소는?', options: ['침전지만', '폭기조 + 2차 침전지', '스크린', '여과지'], answer: 1, explanation: '활성슬러지법은 폭기조(미생물 분해)와 2차 침전지(슬러지 분리)로 구성됩니다.' },
        { id: 'bt-2', question: 'SRT(슬러지체류시간)가 길어지면?', options: ['미생물 농도 감소', '슬러지 안정화 증가', 'BOD 증가', '유량 증가'], answer: 1, explanation: 'SRT가 길수록 미생물 농도가 높아지고 슬러지가 안정화됩니다.' },
        { id: 'bt-3', question: 'F/M비가 너무 높으면 발생하는 문제는?', options: ['미생물 부족', '벌킹(bulking)', '거품 발생', '악취'], answer: 1, explanation: 'F/M비가 높으면 미생물 대비 유기물이 과다하여 벌킹, 처리효율 저하가 발생합니다.' },
        { id: 'bt-4', question: '살수여상법의 특징이 아닌 것은?', options: ['생물막법', '저동력', '고농도 처리', '넓은 부지'], answer: 2, explanation: '살수여상법은 동력비가 낮지만 고농도 폐수 처리에는 부적합합니다.' },
        { id: 'bt-5', question: 'MLSS의 의미는?', options: ['용존산소', '폭기조 내 부유물질 농도', '반송률', '체류시간'], answer: 1, explanation: 'MLSS(Mixed Liquor Suspended Solids)는 폭기조 내 미생물 포함 부유물질 농도입니다.' },
      ]},
    { id: 'nutrient-removal', title: '영양염류 제거', description: '질소, 인 제거 공정', icon: '🔄',
      questions: [
        { id: 'nr-1', question: '생물학적 질소 제거 공정의 순서는?', options: ['탈질→질산화', '질산화→탈질', '침전→여과', '응집→침전'], answer: 1, explanation: '호기조에서 질산화(NH₄⁺→NO₃⁻) 후 무산소조에서 탈질(NO₃⁻→N₂)로 제거합니다.' },
        { id: 'nr-2', question: '질산화에 필요한 조건이 아닌 것은?', options: ['호기조건', '적정 pH', '무산소조건', '충분한 SRT'], answer: 2, explanation: '질산화는 호기조건에서 질산화균에 의해 일어납니다.' },
        { id: 'nr-3', question: '생물학적 인 제거(BPR)의 원리는?', options: ['응집', 'PAO의 인 과잉섭취', '산화', '흡착'], answer: 1, explanation: 'BPR은 PAO(인축적미생물)이 혐기→호기조건에서 인을 과잉섭취하는 원리입니다.' },
        { id: 'nr-4', question: 'A2O 공정의 구성 순서는?', options: ['호기→혐기→무산소', '혐기→무산소→호기', '무산소→호기→혐기', '호기→무산소→혐기'], answer: 1, explanation: 'A2O는 혐기(인방출)→무산소(탈질)→호기(질산화, 인섭취) 순서입니다.' },
        { id: 'nr-5', question: 'MLE 공정의 주요 목적은?', options: ['인 제거', '질소 제거', 'BOD 제거만', '중금속 제거'], answer: 1, explanation: 'MLE(Modified Ludzack-Ettinger)는 질소 제거를 위한 무산소-호기 공정입니다.' },
      ]},
    { id: 'sludge-treatment', title: '슬러지 처리', description: '농축, 소화, 탈수', icon: '♻️',
      questions: [
        { id: 'st-1', question: '슬러지 농축의 목적은?', options: ['살균', '함수율 저감', 'BOD 제거', 'pH 조정'], answer: 1, explanation: '슬러지 농축은 함수율을 낮춰 후속 처리의 효율과 경제성을 높입니다.' },
        { id: 'st-2', question: '혐기성 소화의 최종 산물은?', options: ['산소', '메탄가스', '질소', '암모니아만'], answer: 1, explanation: '혐기성 소화에서 유기물은 CH₄(메탄)와 CO₂로 분해됩니다.' },
        { id: 'st-3', question: '벨트프레스의 탈수 원리는?', options: ['원심력', '압착과 전단', '진공', '열건조'], answer: 1, explanation: '벨트프레스는 두 벨트 사이에서 슬러지를 압착하고 전단력으로 탈수합니다.' },
        { id: 'st-4', question: '슬러지 개량제 투입 목적은?', options: ['냄새 제거', '탈수 효율 향상', '색 변화', '온도 조절'], answer: 1, explanation: '개량제(폴리머 등)는 슬러지 입자를 응집시켜 탈수 효율을 향상시킵니다.' },
        { id: 'st-5', question: '소화 슬러지의 VFA/Alkalinity 비가 너무 높으면?', options: ['정상', '소화조 불안정', '효율 최고', '관계없음'], answer: 1, explanation: 'VFA/Alk 비가 0.3~0.5 이상이면 산 축적으로 소화조가 불안정해집니다.' },
      ]},
  ];

  useEffect(() => { const saved = localStorage.getItem(`completed-${subject.id}`); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (qId: string) => { const n = { ...completedQuestions, [qId]: !completedQuestions[qId] }; setCompletedQuestions(n); localStorage.setItem(`completed-${subject.id}`, JSON.stringify(n)); };
  const toggleTopic = (tId: string) => setExpandedTopics(p => ({ ...p, [tId]: !p[tId] }));
  const total = topics.reduce((s, t) => s + t.questions.length, 0); const done = Object.values(completedQuestions).filter(Boolean).length; const pct = Math.round((done / total) * 100);
  const copy = (t: string) => navigator.clipboard.writeText(t);
  const prompt = (q: Question) => `[수질환경기사 - 수질오염방지기술] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">수질환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-slate-500 border-slate-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-slate-100 text-slate-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/water-environment/study/water-treatment" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 상하수도계획</Link><Link href="/category/chemistry/water-environment/study/water-testing" className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-xl font-medium text-center hover:opacity-90 transition">수질오염공정시험기준 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
