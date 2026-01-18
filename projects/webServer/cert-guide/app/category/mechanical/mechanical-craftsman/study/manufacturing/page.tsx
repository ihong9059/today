'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManufacturingStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mc-manufacturing-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('mc-manufacturing-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '주조',
      icon: '🔥',
      questions: [
        { id: 'mf1', q: '주조의 종류(사형주조, 금형주조, 다이캐스팅)와 특징을 비교해주세요.', keyword: '주조 종류 사형주조 금형주조' },
        { id: 'mf2', q: '주형재료(생형, 건조형, 자경성 주형)의 특성을 설명해주세요.', keyword: '주형재료 생형 건조형' },
        { id: 'mf3', q: '주조 결함(수축공, 기포, 개재물, 균열)의 원인과 대책을 설명해주세요.', keyword: '주조결함 수축공 기포' },
        { id: 'mf4', q: '압탕(Riser)과 탕구계(Gating system)의 역할을 설명해주세요.', keyword: '압탕 탕구계' },
      ],
    },
    {
      title: '소성가공',
      icon: '🔨',
      questions: [
        { id: 'mf5', q: '단조(자유단조, 형단조)의 특징과 적용 분야를 설명해주세요.', keyword: '단조 자유단조 형단조' },
        { id: 'mf6', q: '압연(열간압연, 냉간압연)의 원리와 제품을 설명해주세요.', keyword: '압연 열간압연 냉간압연' },
        { id: 'mf7', q: '압출과 인발의 원리와 차이점을 설명해주세요.', keyword: '압출 인발' },
        { id: 'mf8', q: '프레스가공(전단, 굽힘, 드로잉)의 원리와 금형 구조를 설명해주세요.', keyword: '프레스가공 전단 드로잉' },
        { id: 'mf9', q: '블랭킹과 펀칭의 차이, 클리어런스 설정 방법을 설명해주세요.', keyword: '블랭킹 펀칭 클리어런스' },
      ],
    },
    {
      title: '용접',
      icon: '⚡',
      questions: [
        { id: 'mf10', q: '아크용접(피복아크용접, TIG, MIG, CO2)의 특징을 비교해주세요.', keyword: '아크용접 TIG MIG CO2' },
        { id: 'mf11', q: '가스용접(산소-아세틸렌)의 원리와 불꽃 조절을 설명해주세요.', keyword: '가스용접 산소아세틸렌' },
        { id: 'mf12', q: '용접 결함(기공, 슬래그 혼입, 언더컷, 크랙)의 원인과 대책을 설명해주세요.', keyword: '용접결함 기공 언더컷' },
        { id: 'mf13', q: '용접 이음의 종류(맞대기, 겹치기, T형, 모서리)를 설명해주세요.', keyword: '용접이음 맞대기 겹치기' },
        { id: 'mf14', q: '저항용접(점용접, 심용접, 프로젝션용접)의 원리를 설명해주세요.', keyword: '저항용접 점용접' },
      ],
    },
    {
      title: '절삭가공',
      icon: '🔪',
      questions: [
        { id: 'mf15', q: '선반가공의 종류(외경선삭, 단면가공, 나사가공, 보링)를 설명해주세요.', keyword: '선반가공 외경선삭' },
        { id: 'mf16', q: '밀링가공(상향밀링, 하향밀링)의 차이와 특징을 설명해주세요.', keyword: '밀링 상향밀링 하향밀링' },
        { id: 'mf17', q: '드릴링, 리밍, 보링, 호닝의 차이와 적용을 설명해주세요.', keyword: '드릴링 리밍 보링 호닝' },
        { id: 'mf18', q: '절삭속도, 이송속도, 절삭깊이의 관계와 계산법을 설명해주세요.', keyword: '절삭속도 이송속도 계산' },
        { id: 'mf19', q: '공구수명(Taylor의 공구수명식)과 경제적 절삭속도를 설명해주세요.', keyword: '공구수명 Taylor' },
        { id: 'mf20', q: '절삭공구 재료(고속도강, 초경합금, 세라믹, CBN)의 특성을 비교해주세요.', keyword: '절삭공구 초경합금 세라믹' },
      ],
    },
    {
      title: '연삭가공',
      icon: '💎',
      questions: [
        { id: 'mf21', q: '연삭숫돌의 구성요소(입자, 결합제, 기공)와 표시법을 설명해주세요.', keyword: '연삭숫돌 구성 표시법' },
        { id: 'mf22', q: '연삭가공의 종류(원통연삭, 내면연삭, 평면연삭, 센터리스연삭)를 설명해주세요.', keyword: '연삭가공 원통연삭 센터리스' },
        { id: 'mf23', q: '연삭숫돌의 선정방법(입도, 결합도, 조직)을 설명해주세요.', keyword: '연삭숫돌 입도 결합도' },
        { id: 'mf24', q: '래핑과 폴리싱의 원리와 적용 분야를 설명해주세요.', keyword: '래핑 폴리싱' },
      ],
    },
    {
      title: '특수가공',
      icon: '⚡',
      questions: [
        { id: 'mf25', q: '방전가공(EDM)의 원리와 와이어컷 방전가공의 특징을 설명해주세요.', keyword: '방전가공 EDM 와이어컷' },
        { id: 'mf26', q: '레이저가공의 원리와 적용 분야를 설명해주세요.', keyword: '레이저가공' },
        { id: 'mf27', q: '전해가공(ECM)과 전해연마의 원리를 설명해주세요.', keyword: '전해가공 ECM' },
        { id: 'mf28', q: '초음파가공과 워터젯가공의 원리와 특징을 설명해주세요.', keyword: '초음파가공 워터젯' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `기계산업기사 기계제작법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `기계산업기사 기계제작법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `기계산업기사 기계제작법 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-green-600">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">기계제작법</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🏭</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계제작법</h1>
                <p className="text-green-100">Manufacturing Processes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-green-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
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
