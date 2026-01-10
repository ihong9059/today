'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FirePreventionStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-technician-fire-prevention-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('hazardous-technician-fire-prevention-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '연소 이론',
      icon: '🔥',
      questions: [
        { id: 'fp1', q: '연소의 3요소(가연물, 산소공급원, 점화원)와 연소의 4요소를 설명해주세요.', keyword: '연소3요소 가연물 산소 점화원' },
        { id: 'fp2', q: '인화점, 발화점, 연소점의 개념과 차이를 설명해주세요.', keyword: '인화점 발화점 연소점' },
        { id: 'fp3', q: '연소의 종류(표면연소, 증발연소, 분해연소, 자기연소)를 설명해주세요.', keyword: '연소종류 표면연소 증발연소' },
        { id: 'fp4', q: '폭발의 정의와 종류(물리적 폭발, 화학적 폭발)를 설명해주세요.', keyword: '폭발 물리적폭발 화학적폭발' },
        { id: 'fp5', q: '연소범위(폭발범위)와 연소한계의 개념을 설명해주세요.', keyword: '연소범위 폭발범위 연소한계' },
      ],
    },
    {
      title: '소화 이론',
      icon: '🧯',
      questions: [
        { id: 'fp6', q: '소화의 원리(냉각, 질식, 제거, 억제)를 설명해주세요.', keyword: '소화원리 냉각 질식 제거' },
        { id: 'fp7', q: '냉각 소화의 원리와 적용 사례를 설명해주세요.', keyword: '냉각소화 물 열제거' },
        { id: 'fp8', q: '질식 소화의 원리와 적용 사례를 설명해주세요.', keyword: '질식소화 산소차단 CO2' },
        { id: 'fp9', q: '제거 소화의 원리와 적용 사례를 설명해주세요.', keyword: '제거소화 가연물제거' },
        { id: 'fp10', q: '부촉매 소화(억제 소화)의 원리를 설명해주세요.', keyword: '부촉매소화 억제 할론' },
      ],
    },
    {
      title: '소화 약제',
      icon: '💧',
      questions: [
        { id: 'fp11', q: '물 소화약제의 특성과 적응화재를 설명해주세요.', keyword: '물소화약제 냉각효과 A급화재' },
        { id: 'fp12', q: '포 소화약제의 종류와 소화 원리를 설명해주세요.', keyword: '포소화약제 단백포 수성막포' },
        { id: 'fp13', q: '이산화탄소(CO2) 소화약제의 특성과 적응화재를 설명해주세요.', keyword: 'CO2소화약제 질식 B급C급' },
        { id: 'fp14', q: '할로겐화합물(할론) 소화약제의 특성을 설명해주세요.', keyword: '할론 할로겐화합물 부촉매' },
        { id: 'fp15', q: '분말 소화약제의 종류(ABC, BC, D급)와 특성을 설명해주세요.', keyword: '분말소화약제 ABC BC D급' },
      ],
    },
    {
      title: '소화 설비',
      icon: '🚿',
      questions: [
        { id: 'fp16', q: '소화기의 종류와 사용법을 설명해주세요.', keyword: '소화기 ABC분말 CO2' },
        { id: 'fp17', q: '옥내소화전 설비의 구성과 작동 원리를 설명해주세요.', keyword: '옥내소화전 소화펌프 배관' },
        { id: 'fp18', q: '스프링클러 설비의 종류(습식, 건식, 준비작동식)와 특성을 설명해주세요.', keyword: '스프링클러 습식 건식' },
        { id: 'fp19', q: '물분무 소화설비와 미분무 소화설비의 차이를 설명해주세요.', keyword: '물분무 미분무 입자크기' },
        { id: 'fp20', q: '자동화재탐지설비의 구성과 감지기 종류를 설명해주세요.', keyword: '화재탐지 감지기 수신기' },
      ],
    },
    {
      title: '화재 조사',
      icon: '🔍',
      questions: [
        { id: 'fp21', q: '화재 등급(A, B, C, D, K급)과 각각의 특성을 설명해주세요.', keyword: '화재등급 A급 B급 C급' },
        { id: 'fp22', q: '발화 원인의 종류(자연발화, 전기발화, 화학적발화)를 설명해주세요.', keyword: '발화원인 자연발화 전기발화' },
        { id: 'fp23', q: '자연발화의 메커니즘과 예방법을 설명해주세요.', keyword: '자연발화 산화열 축적' },
        { id: 'fp24', q: '정전기 발화의 원리와 예방대책을 설명해주세요.', keyword: '정전기발화 접지 대전방지' },
        { id: 'fp25', q: '화재 확산 경로(전도, 대류, 복사)를 설명해주세요.', keyword: '화재확산 전도 대류 복사' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `위험물산업기사 화재예방과 소화방법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `위험물산업기사 화재예방과 소화방법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `위험물산업기사 화재예방과 소화방법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/category/safety/hazardous-technician" className="text-gray-600 hover:text-red-600">위험물산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">화재예방과 소화방법</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🧯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">화재예방과 소화방법</h1>
                <p className="text-red-100">Fire Prevention and Extinguishing Methods</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-red-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-red-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
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
