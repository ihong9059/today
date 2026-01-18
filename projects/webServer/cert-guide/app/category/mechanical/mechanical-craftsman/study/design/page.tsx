'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DesignStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mc-design-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('mc-design-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '나사',
      icon: '🔩',
      questions: [
        { id: 'de1', q: '나사의 종류(삼각나사, 사각나사, 사다리꼴나사)와 용도를 설명해주세요.', keyword: '나사 종류 삼각나사 사각나사' },
        { id: 'de2', q: '미터나사와 유니파이나사의 규격 표시법과 차이점을 설명해주세요.', keyword: '미터나사 유니파이나사' },
        { id: 'de3', q: '나사의 리드, 피치, 리드각의 관계와 효율 계산법을 설명해주세요.', keyword: '나사 리드 피치 효율' },
        { id: 'de4', q: '볼트의 강도계산(인장응력, 비틀림응력)을 설명해주세요.', keyword: '볼트 강도계산 인장응력' },
      ],
    },
    {
      title: '볼트와 너트',
      icon: '🔧',
      questions: [
        { id: 'de5', q: '볼트의 종류(육각볼트, 아이볼트, 스터드볼트)와 용도를 설명해주세요.', keyword: '볼트 종류 육각볼트' },
        { id: 'de6', q: '너트의 풀림방지법(로크너트, 스프링와셔, 분할핀)을 설명해주세요.', keyword: '너트 풀림방지 로크너트' },
        { id: 'de7', q: '볼트 체결력 계산과 조임토크의 관계를 설명해주세요.', keyword: '볼트 체결력 조임토크' },
        { id: 'de8', q: '볼트의 강도등급(4.6, 8.8, 10.9 등)의 의미를 설명해주세요.', keyword: '볼트 강도등급' },
      ],
    },
    {
      title: '축',
      icon: '🎯',
      questions: [
        { id: 'de9', q: '축의 종류(전동축, 크랭크축, 플렉시블축)와 특성을 설명해주세요.', keyword: '축 종류 전동축' },
        { id: 'de10', q: '축의 굽힘모멘트와 비틀림모멘트에 의한 등가응력 계산법을 설명해주세요.', keyword: '축 굽힘모멘트 비틀림모멘트' },
        { id: 'de11', q: '축의 위험속도와 공진현상을 설명해주세요.', keyword: '축 위험속도 공진' },
        { id: 'de12', q: '축이음(커플링)의 종류와 선정 기준을 설명해주세요.', keyword: '커플링 축이음 종류' },
      ],
    },
    {
      title: '베어링',
      icon: '⚙️',
      questions: [
        { id: 'de13', q: '미끄럼베어링과 구름베어링의 특성을 비교해주세요.', keyword: '미끄럼베어링 구름베어링' },
        { id: 'de14', q: '볼베어링과 롤러베어링의 종류와 적용 분야를 설명해주세요.', keyword: '볼베어링 롤러베어링' },
        { id: 'de15', q: '베어링의 수명계산(정격수명, 수명계수)을 설명해주세요.', keyword: '베어링 수명계산 정격수명' },
        { id: 'de16', q: '베어링의 윤활방법(그리스윤활, 오일윤활)과 선정을 설명해주세요.', keyword: '베어링 윤활 그리스' },
      ],
    },
    {
      title: '기어',
      icon: '⚙️',
      questions: [
        { id: 'de17', q: '기어의 종류(스퍼기어, 헬리컬기어, 베벨기어, 웜기어)와 특성을 설명해주세요.', keyword: '기어 종류 스퍼기어 헬리컬' },
        { id: 'de18', q: '기어의 모듈, 피치원, 이끝원, 이뿌리원의 관계를 설명해주세요.', keyword: '기어 모듈 피치원' },
        { id: 'de19', q: '기어의 속도비와 토크비 계산법을 설명해주세요.', keyword: '기어 속도비 토크비' },
        { id: 'de20', q: '기어의 강도계산(굽힘강도, 면압강도)을 설명해주세요.', keyword: '기어 강도계산 굽힘강도' },
      ],
    },
    {
      title: '벨트와 체인',
      icon: '🔗',
      questions: [
        { id: 'de21', q: 'V벨트 전동장치의 특징과 설계 요소를 설명해주세요.', keyword: 'V벨트 전동장치' },
        { id: 'de22', q: '벨트의 장력계산과 동력전달 용량 산정법을 설명해주세요.', keyword: '벨트 장력계산 동력전달' },
        { id: 'de23', q: '체인전동장치의 특징과 롤러체인의 규격을 설명해주세요.', keyword: '체인전동 롤러체인' },
        { id: 'de24', q: '타이밍벨트의 특징과 적용 분야를 설명해주세요.', keyword: '타이밍벨트' },
      ],
    },
    {
      title: '스프링',
      icon: '🌀',
      questions: [
        { id: 'de25', q: '스프링의 종류(코일스프링, 판스프링, 토션바)와 용도를 설명해주세요.', keyword: '스프링 종류 코일스프링' },
        { id: 'de26', q: '코일스프링의 스프링상수와 처짐량 계산법을 설명해주세요.', keyword: '스프링상수 처짐량' },
        { id: 'de27', q: '스프링의 직렬연결과 병렬연결시 합성 스프링상수를 설명해주세요.', keyword: '스프링 직렬 병렬 합성' },
        { id: 'de28', q: '스프링 재료와 표면처리방법(숏피닝)을 설명해주세요.', keyword: '스프링 재료 숏피닝' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `기계산업기사 기계설계 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요. 계산 공식과 예시도 포함해주세요.`,
      chatgpt: `기계산업기사 기계설계 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `기계산업기사 기계설계 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-amber-600">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">기계설계</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계설계</h1>
                <p className="text-amber-100">Machine Design</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-amber-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-amber-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
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
