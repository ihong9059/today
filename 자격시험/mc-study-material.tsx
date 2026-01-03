'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MaterialStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mc-material-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('mc-material-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '금속재료 기초',
      icon: '🔬',
      questions: [
        { id: 'm1', q: '금속의 결정구조(BCC, FCC, HCP)와 대표적인 금속을 설명해주세요.', keyword: '금속 결정구조 BCC FCC' },
        { id: 'm2', q: '금속의 소성변형 기구(슬립, 쌍정)와 가공경화 현상을 설명해주세요.', keyword: '소성변형 슬립 가공경화' },
        { id: 'm3', q: '금속의 기계적 성질(인장강도, 경도, 연신율, 충격값)을 설명해주세요.', keyword: '금속 기계적성질' },
        { id: 'm4', q: '금속의 물리적 성질(밀도, 열전도도, 전기전도도)을 설명해주세요.', keyword: '금속 물리적성질' },
      ],
    },
    {
      title: '철강재료',
      icon: '🏗️',
      questions: [
        { id: 'm5', q: 'Fe-C 상태도에서 공석강, 아공석강, 과공석강의 조직 특성을 설명해주세요.', keyword: 'Fe-C상태도 공석강' },
        { id: 'm6', q: '탄소강의 5대 원소(C, Si, Mn, P, S)가 기계적 성질에 미치는 영향을 설명해주세요.', keyword: '탄소강 5대원소' },
        { id: 'm7', q: '기계구조용 탄소강(SM45C 등)의 기호 의미와 용도를 설명해주세요.', keyword: 'SM45C 기계구조용탄소강' },
        { id: 'm8', q: '합금강의 종류(Cr강, Ni강, Cr-Mo강)와 특성을 설명해주세요.', keyword: '합금강 종류 특성' },
      ],
    },
    {
      title: '열처리',
      icon: '🔥',
      questions: [
        { id: 'm9', q: '담금질(Quenching)의 목적, 방법, 조직변화를 설명해주세요.', keyword: '담금질 Quenching' },
        { id: 'm10', q: '뜨임(Tempering)의 목적과 저온뜨임/고온뜨임의 차이를 설명해주세요.', keyword: '뜨임 Tempering' },
        { id: 'm11', q: '풀림(Annealing)의 종류(완전풀림, 응력제거풀림, 구상화풀림)를 설명해주세요.', keyword: '풀림 Annealing 종류' },
        { id: 'm12', q: '불림(Normalizing)의 목적과 풀림과의 차이점을 설명해주세요.', keyword: '불림 Normalizing' },
        { id: 'm13', q: '표면경화법(침탄법, 질화법, 고주파경화)의 원리와 특징을 비교해주세요.', keyword: '표면경화법 침탄 질화' },
      ],
    },
    {
      title: '비철금속',
      icon: '🥇',
      questions: [
        { id: 'm14', q: '알루미늄 합금의 종류(주조용, 가공용)와 열처리 기호(T6 등)를 설명해주세요.', keyword: '알루미늄합금 T6 열처리' },
        { id: 'm15', q: '구리 합금(황동, 청동, 백동)의 조성과 특성을 비교해주세요.', keyword: '구리합금 황동 청동' },
        { id: 'm16', q: '스테인리스강의 종류(마르텐사이트계, 페라이트계, 오스테나이트계)를 설명해주세요.', keyword: '스테인리스강 종류' },
        { id: 'm17', q: '내열합금과 초경합금의 종류와 용도를 설명해주세요.', keyword: '내열합금 초경합금' },
      ],
    },
    {
      title: '비금속재료',
      icon: '🧱',
      questions: [
        { id: 'm18', q: '플라스틱의 종류(열가소성, 열경화성)와 대표적인 재료를 설명해주세요.', keyword: '플라스틱 열가소성 열경화성' },
        { id: 'm19', q: '세라믹 재료의 특성과 기계공업에서의 활용을 설명해주세요.', keyword: '세라믹 재료 특성' },
        { id: 'm20', q: '복합재료(FRP, CFRP)의 구성과 특성을 설명해주세요.', keyword: '복합재료 FRP CFRP' },
        { id: 'm21', q: '고무 재료의 종류와 가황처리의 목적을 설명해주세요.', keyword: '고무재료 가황처리' },
      ],
    },
    {
      title: '재료시험',
      icon: '📊',
      questions: [
        { id: 'm22', q: '인장시험에서 구할 수 있는 값(항복점, 인장강도, 연신율, 단면수축률)을 설명해주세요.', keyword: '인장시험 항복점 인장강도' },
        { id: 'm23', q: '경도시험의 종류(브리넬, 로크웰, 비커스)와 특징을 비교해주세요.', keyword: '경도시험 브리넬 로크웰 비커스' },
        { id: 'm24', q: '충격시험(샤르피, 아이조드)의 방법과 천이온도의 의미를 설명해주세요.', keyword: '충격시험 샤르피 천이온도' },
        { id: 'm25', q: '비파괴검사의 종류(UT, RT, MT, PT)와 적용 분야를 설명해주세요.', keyword: '비파괴검사 UT RT MT PT' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `기계산업기사 기계재료 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `기계산업기사 기계재료 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `기계산업기사 기계재료 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
    };
    const urls: Record<string, string> = {
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompts.claude)}`,
      chatgpt: `https://chat.openai.com/?q=${encodeURIComponent(prompts.chatgpt)}`,
      gemini: `https://gemini.google.com/?q=${encodeURIComponent(prompts.gemini)}`,
    };
    window.open(urls[aiType], '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-gray-500">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-600 font-medium">기계재료</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-gray-500 to-slate-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🔩</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계재료</h1>
                <p className="text-gray-200">Mechanical Materials</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-200 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-gray-200 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800">{topic.title}</h3>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.has(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.has(topicIndex) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 ${completedQuestions.has(q.id) ? 'bg-green-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => saveProgress(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions.has(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-3">{q.q}</p>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => openAI('claude', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm rounded-lg hover:opacity-90">Claude</button>
                            <button onClick={() => openAI('chatgpt', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-lg hover:opacity-90">ChatGPT</button>
                            <button onClick={() => openAI('gemini', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:opacity-90">Gemini</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
