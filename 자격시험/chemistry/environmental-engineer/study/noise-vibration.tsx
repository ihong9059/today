'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question { id: string; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; title: string; description: string; icon: string; questions: Question[]; }

export default function NoiseVibrationPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const subject = { id: 'noise-vibration', name: '소음진동', icon: '📢', color: 'from-purple-500 to-pink-500' };

  const topics: Topic[] = [
    {
      id: 'noise-basics', title: '소음 기초', description: '소음의 물리적 특성', icon: '🔊',
      questions: [
        { id: 'nb-1', question: '소음의 단위는?', options: ['Hz', 'dB', 'Pa', 'm/s'], answer: 1, explanation: '소음의 크기는 dB(데시벨)로 측정합니다. Hz는 주파수 단위입니다.' },
        { id: 'nb-2', question: '청력 역치의 기준 음압은?', options: ['2×10⁻⁵ Pa', '2×10⁻⁴ Pa', '20 Pa', '200 Pa'], answer: 0, explanation: '사람의 청력 역치(기준 음압)는 2×10⁻⁵ Pa (= 20 μPa)입니다.' },
        { id: 'nb-3', question: '60dB 소음 2개가 합성되면?', options: ['60dB', '63dB', '120dB', '30dB'], answer: 1, explanation: '동일 레벨 2개 합성 시 +3dB 증가합니다. 60 + 3 = 63dB' },
        { id: 'nb-4', question: '가청 주파수 범위는?', options: ['1~100Hz', '20~20,000Hz', '100~10,000Hz', '1,000Hz 이상'], answer: 1, explanation: '사람의 가청 주파수 범위는 약 20Hz ~ 20,000Hz입니다.' },
        { id: 'nb-5', question: 'A 가중치(dBA)가 주로 사용되는 이유는?', options: ['측정 편의', '인체 청감 반영', '고주파 강조', '저주파 강조'], answer: 1, explanation: 'A 가중치는 사람 귀의 주파수별 감도 특성을 반영합니다.' },
      ]
    },
    {
      id: 'noise-control', title: '소음 방지', description: '소음 저감 기술', icon: '🔇',
      questions: [
        { id: 'nc-1', question: '소음 방지 대책 중 가장 효과적인 것은?', options: ['방음벽', '귀마개', '음원 제어', '거리 이격'], answer: 2, explanation: '음원에서의 소음 발생을 줄이는 것이 가장 근본적이고 효과적입니다.' },
        { id: 'nc-2', question: '흡음재의 원리는?', options: ['소리 반사', '소리 투과', '소리 에너지 흡수', '소리 차단'], answer: 2, explanation: '흡음재는 음파 에너지를 열에너지로 변환하여 흡수합니다.' },
        { id: 'nc-3', question: '차음재의 성능 지표는?', options: ['흡음률', '투과손실(TL)', '잔향시간', '음압레벨'], answer: 1, explanation: '차음재 성능은 투과손실(Transmission Loss, TL)로 평가합니다.' },
        { id: 'nc-4', question: '소음기(머플러)의 종류가 아닌 것은?', options: ['흡음형', '반사형', '공명형', '진동형'], answer: 3, explanation: '소음기는 흡음형, 반사형(팽창형), 공명형 등이 있습니다.' },
        { id: 'nc-5', question: '방음벽의 회절 감쇠에 영향을 주는 요소가 아닌 것은?', options: ['벽 높이', '음원-수음점 거리', '벽 재질 색상', '주파수'], answer: 2, explanation: '방음벽 효과는 높이, 거리, 주파수에 의존하며 색상은 무관합니다.' },
      ]
    },
    {
      id: 'vibration-basics', title: '진동 기초', description: '진동의 물리적 특성', icon: '📳',
      questions: [
        { id: 'vb-1', question: '진동레벨의 단위는?', options: ['dB(V)', 'Hz', 'm/s²', 'Pa'], answer: 0, explanation: '진동레벨은 dB(V)로 표시하며, 기준 가속도는 10⁻⁵ m/s²입니다.' },
        { id: 'vb-2', question: '진동의 3요소가 아닌 것은?', options: ['진폭', '주파수', '위상', '온도'], answer: 3, explanation: '진동의 3요소는 진폭, 주파수, 위상입니다.' },
        { id: 'vb-3', question: '공진(resonance)이 발생하는 조건은?', options: ['고유진동수 = 가진주파수', '고유진동수 > 가진주파수', '고유진동수 < 가진주파수', '진폭 = 0'], answer: 0, explanation: '공진은 고유진동수와 가진주파수가 일치할 때 발생하며 진폭이 크게 증가합니다.' },
        { id: 'vb-4', question: '진동 전달률이 1보다 작아지는 조건은?', options: ['ω/ωn < 1', 'ω/ωn = 1', 'ω/ωn > √2', 'ω/ωn = 0'], answer: 2, explanation: '진동수비(ω/ωn)가 √2보다 클 때 방진 효과가 나타납니다.' },
        { id: 'vb-5', question: '인체에 영향을 주는 전신진동의 주파수 범위는?', options: ['1~80Hz', '100~1000Hz', '1kHz 이상', '0.1Hz 이하'], answer: 0, explanation: '전신진동은 1~80Hz 범위에서 인체에 영향을 줍니다.' },
      ]
    },
    {
      id: 'vibration-control', title: '진동 방지', description: '진동 저감 기술', icon: '🛡️',
      questions: [
        { id: 'vc-1', question: '방진의 기본 원리는?', options: ['진동 증폭', '공진 유발', '진동 절연', '진동 가속'], answer: 2, explanation: '방진은 진동원과 수진점 사이에 탄성체를 삽입하여 진동을 절연합니다.' },
        { id: 'vc-2', question: '방진고무의 장점이 아닌 것은?', options: ['가격 저렴', '시공 용이', '고온에 강함', '다양한 형상'], answer: 2, explanation: '고무는 고온에서 노화, 열화가 발생할 수 있어 고온에 약합니다.' },
        { id: 'vc-3', question: '동흡진기(dynamic absorber)의 원리는?', options: ['진동 흡수', '부가 질량의 역위상 진동', '마찰 감쇠', '강성 증가'], answer: 1, explanation: '동흡진기는 부가된 질량이 역위상으로 진동하여 주진동을 상쇄합니다.' },
        { id: 'vc-4', question: '기초 방진에서 관성 블록의 역할은?', options: ['진동 증가', '질량 증가로 진동 감소', '공진 유발', '진동수 증가'], answer: 1, explanation: '관성 블록은 질량을 증가시켜 진동 에너지를 분산, 진폭을 감소시킵니다.' },
        { id: 'vc-5', question: '제진(damping)의 목적은?', options: ['진동수 증가', '진동 에너지 소산', '공진 유발', '진폭 증가'], answer: 1, explanation: '제진은 진동 에너지를 열 등으로 소산시켜 진폭을 감소시킵니다.' },
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
  const prompt = (q: Question) => `[환경기사 - 소음진동] 문제:\n${q.question}\n\n선택지:\n${q.options.map((o,i)=>`${i+1}. ${o}`).join('\n')}\n\n정답: ${q.answer+1}번 (${q.options[q.answer]})\n해설: ${q.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link><span className="text-gray-300">›</span><span className="text-teal-600 font-medium">{subject.name}</span></nav></div></header>
      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-white/80">환경기사 필기시험</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-3"><div className="flex items-center justify-between mb-1"><span className="text-sm">학습 진행률</span><span className="text-sm font-medium">{done}/{total} ({pct}%)</span></div><div className="w-full bg-white/30 rounded-full h-2"><div className="bg-white rounded-full h-2 transition-all duration-300" style={{width:`${pct}%`}}/></div></div></div></section>
      <section className="max-w-6xl mx-auto px-4 py-6"><div className="space-y-4">{topics.map(topic => { const tc = topic.questions.filter(q => completedQuestions[q.id]).length; const exp = expandedTopics[topic.id]; return (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topic.description}</p></div></div><div className="flex items-center gap-3"><span className="text-sm text-gray-500">{tc}/{topic.questions.length}</span><span className={`transform transition ${exp ? 'rotate-180' : ''}`}>▼</span></div></button>{exp && (<div className="border-t divide-y">{topic.questions.map((q, qi) => { const ic = completedQuestions[q.id]; return (<div key={q.id} className="p-4"><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${ic ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>{ic && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800">{qi + 1}. {q.question}</p><div className="mt-2 space-y-1">{q.options.map((o, oi) => (<div key={oi} className={`p-2 rounded text-sm ${oi === q.answer ? 'bg-purple-100 text-purple-800 font-medium' : 'bg-gray-50 text-gray-600'}`}>{oi + 1}. {o}{oi === q.answer && ' ✓'}</div>))}</div><div className="mt-2 p-3 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800"><strong>해설:</strong> {q.explanation}</p></div><div className="mt-2 flex gap-2"><button onClick={() => { copy(prompt(q)); window.open('https://claude.ai', '_blank'); }} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</button><button onClick={() => { copy(prompt(q)); window.open('https://chat.openai.com', '_blank'); }} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</button><button onClick={() => { copy(prompt(q)); window.open('https://gemini.google.com', '_blank'); }} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</button></div></div></div></div>); })}</div>)}</div>); })}</div><div className="mt-6 flex gap-3"><Link href="/category/chemistry/environmental-engineer/study/waste-management" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 폐기물처리</Link><Link href="/category/chemistry/environmental-engineer/study/practical" className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition">실기 →</Link></div></section>
      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
