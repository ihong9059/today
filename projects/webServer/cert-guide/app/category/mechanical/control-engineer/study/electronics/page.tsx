'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ElectronicsStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('ctrl-electronics-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('ctrl-electronics-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '회로이론',
      icon: '⚡',
      questions: [
        { id: 'e1', q: '옴의 법칙과 키르히호프의 법칙(KVL, KCL)을 설명해주세요.', keyword: '옴의법칙 키르히호프 KVL KCL' },
        { id: 'e2', q: '직렬/병렬 저항회로의 합성저항과 분압/분류 법칙을 설명해주세요.', keyword: '합성저항 분압 분류' },
        { id: 'e3', q: 'RC, RL, RLC 회로의 과도응답과 정상상태 응답을 설명해주세요.', keyword: 'RC RL RLC 과도응답' },
        { id: 'e4', q: '테브난 정리와 노튼 정리의 원리와 적용을 설명해주세요.', keyword: '테브난 노튼 정리' },
        { id: 'e5', q: '교류회로의 임피던스, 위상, 역률을 설명해주세요.', keyword: '임피던스 위상 역률' },
      ],
    },
    {
      title: '반도체',
      icon: '💎',
      questions: [
        { id: 'e6', q: 'PN접합 다이오드의 동작원리와 특성을 설명해주세요.', keyword: 'PN접합 다이오드' },
        { id: 'e7', q: '제너 다이오드, LED, 포토다이오드의 특성과 용도를 설명해주세요.', keyword: '제너다이오드 LED 포토다이오드' },
        { id: 'e8', q: 'BJT의 구조와 동작원리(공통이미터, 공통베이스, 공통컬렉터)를 설명해주세요.', keyword: 'BJT 트랜지스터 공통이미터' },
        { id: 'e9', q: 'FET(JFET, MOSFET)의 구조와 동작원리를 설명해주세요.', keyword: 'FET JFET MOSFET' },
        { id: 'e10', q: 'SCR, TRIAC, DIAC의 동작원리와 제어응용을 설명해주세요.', keyword: 'SCR TRIAC 사이리스터' },
      ],
    },
    {
      title: 'OP앰프',
      icon: '🔊',
      questions: [
        { id: 'e11', q: '이상적인 OP앰프의 특성과 실제 OP앰프의 한계를 설명해주세요.', keyword: '이상적 OP앰프 특성' },
        { id: 'e12', q: '반전증폭기와 비반전증폭기의 회로와 이득 계산을 설명해주세요.', keyword: '반전증폭기 비반전증폭기' },
        { id: 'e13', q: '차동증폭기와 계측증폭기의 구성과 특성을 설명해주세요.', keyword: '차동증폭기 계측증폭기' },
        { id: 'e14', q: 'OP앰프를 이용한 적분기, 미분기 회로를 설명해주세요.', keyword: 'OP앰프 적분기 미분기' },
        { id: 'e15', q: 'OP앰프를 이용한 비교기와 슈미트 트리거 회로를 설명해주세요.', keyword: 'OP앰프 비교기 슈미트트리거' },
      ],
    },
    {
      title: '디지털 논리회로',
      icon: '🔢',
      questions: [
        { id: 'e16', q: '기본 논리게이트(AND, OR, NOT, NAND, NOR, XOR)의 동작을 설명해주세요.', keyword: '논리게이트 AND OR NOT NAND' },
        { id: 'e17', q: '불대수의 기본 법칙과 논리식 간소화를 설명해주세요.', keyword: '불대수 논리식 간소화' },
        { id: 'e18', q: '카르노맵을 이용한 논리식 최소화를 설명해주세요.', keyword: '카르노맵 논리식 최소화' },
        { id: 'e19', q: '플립플롭(SR, D, JK, T)의 동작과 특성을 설명해주세요.', keyword: '플립플롭 SR D JK' },
        { id: 'e20', q: '카운터와 레지스터의 종류와 동작을 설명해주세요.', keyword: '카운터 레지스터' },
      ],
    },
    {
      title: '신호처리',
      icon: '📶',
      questions: [
        { id: 'e21', q: '아날로그 신호와 디지털 신호의 차이를 설명해주세요.', keyword: '아날로그 디지털 신호' },
        { id: 'e22', q: '푸리에 변환과 주파수 스펙트럼 분석을 설명해주세요.', keyword: '푸리에변환 주파수스펙트럼' },
        { id: 'e23', q: 'AM, FM, PM 변조의 원리를 설명해주세요.', keyword: 'AM FM PM 변조' },
        { id: 'e24', q: 'PCM(펄스코드변조)의 원리와 과정을 설명해주세요.', keyword: 'PCM 펄스코드변조' },
      ],
    },
    {
      title: '전원회로',
      icon: '🔌',
      questions: [
        { id: 'e25', q: '정류회로(반파, 전파, 브리지)의 원리와 특성을 설명해주세요.', keyword: '정류회로 반파 전파 브리지' },
        { id: 'e26', q: '평활회로(콘덴서 필터, LC필터)의 원리를 설명해주세요.', keyword: '평활회로 콘덴서필터' },
        { id: 'e27', q: '직렬형/병렬형 안정화 전원의 원리를 설명해주세요.', keyword: '안정화전원 직렬형 병렬형' },
        { id: 'e28', q: 'DC-DC 컨버터(벅, 부스트, 벅-부스트)의 원리를 설명해주세요.', keyword: 'DC-DC컨버터 벅 부스트' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `제어계측기사 전자공학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `제어계측기사 전자공학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `제어계측기사 전자공학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-purple-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-green-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">전자공학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">💡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">전자공학</h1>
                <p className="text-green-100">Electronics Engineering</p>
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
