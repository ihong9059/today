'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ControlStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('ctrl-control-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('ctrl-control-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '라플라스 변환',
      icon: '📐',
      questions: [
        { id: 'c1', q: '라플라스 변환의 정의와 기본 함수(단위계단, 램프, 임펄스, 지수함수)의 변환을 설명해주세요.', keyword: '라플라스변환 단위계단 임펄스' },
        { id: 'c2', q: '라플라스 변환의 주요 정리(선형성, 시간이동, 주파수이동, 미분, 적분)를 설명해주세요.', keyword: '라플라스 변환정리 시간이동' },
        { id: 'c3', q: '역라플라스 변환과 부분분수 전개법을 설명해주세요.', keyword: '역라플라스 부분분수 전개' },
        { id: 'c4', q: '최종값 정리와 초기값 정리의 공식과 적용을 설명해주세요.', keyword: '최종값정리 초기값정리' },
      ],
    },
    {
      title: '전달함수',
      icon: '🔄',
      questions: [
        { id: 'c5', q: '전달함수의 정의와 블록선도에서의 직렬/병렬/피드백 연결을 설명해주세요.', keyword: '전달함수 블록선도 직렬 병렬' },
        { id: 'c6', q: '1차 시스템의 전달함수와 시정수(Time Constant)의 의미를 설명해주세요.', keyword: '1차시스템 시정수' },
        { id: 'c7', q: '2차 시스템의 전달함수와 특성(감쇠비, 고유주파수)을 설명해주세요.', keyword: '2차시스템 감쇠비 고유주파수' },
        { id: 'c8', q: '과도응답 특성(상승시간, 정착시간, 오버슈트, 정상상태오차)을 설명해주세요.', keyword: '과도응답 상승시간 오버슈트' },
      ],
    },
    {
      title: 'PID 제어',
      icon: '🎛️',
      questions: [
        { id: 'c9', q: 'P제어(비례제어)의 원리와 특성, 한계를 설명해주세요.', keyword: 'P제어 비례제어 오프셋' },
        { id: 'c10', q: 'I제어(적분제어)의 원리와 적분시간(Ti)의 영향을 설명해주세요.', keyword: 'I제어 적분제어 적분시간' },
        { id: 'c11', q: 'D제어(미분제어)의 원리와 미분시간(Td)의 영향을 설명해주세요.', keyword: 'D제어 미분제어 미분시간' },
        { id: 'c12', q: 'PID 제어기의 튜닝 방법(지글러-니콜스법)을 설명해주세요.', keyword: 'PID튜닝 지글러니콜스' },
        { id: 'c13', q: '안티와인드업(Anti-windup)의 필요성과 구현방법을 설명해주세요.', keyword: '안티와인드업 적분포화' },
      ],
    },
    {
      title: '시스템 안정도',
      icon: '📊',
      questions: [
        { id: 'c14', q: '안정도의 정의와 특성방정식 근의 위치와의 관계를 설명해주세요.', keyword: '안정도 특성방정식 근' },
        { id: 'c15', q: '라우스-허위츠(Routh-Hurwitz) 안정도 판별법을 설명해주세요.', keyword: '라우스허위츠 안정도판별' },
        { id: 'c16', q: '보드선도(Bode Plot)의 작성법과 안정도 해석을 설명해주세요.', keyword: '보드선도 Bode Plot' },
        { id: 'c17', q: '위상여유(Phase Margin)와 이득여유(Gain Margin)의 의미를 설명해주세요.', keyword: '위상여유 이득여유' },
        { id: 'c18', q: '나이퀴스트(Nyquist) 판별법의 원리와 적용을 설명해주세요.', keyword: '나이퀴스트 판별법' },
      ],
    },
    {
      title: '근궤적',
      icon: '📈',
      questions: [
        { id: 'c19', q: '근궤적(Root Locus)의 정의와 작도 규칙을 설명해주세요.', keyword: '근궤적 Root Locus 작도' },
        { id: 'c20', q: '근궤적에서 점근선, 분기점, 이탈점의 구하는 방법을 설명해주세요.', keyword: '근궤적 점근선 분기점' },
        { id: 'c21', q: '근궤적을 이용한 이득 K의 결정과 시스템 설계를 설명해주세요.', keyword: '근궤적 이득결정 설계' },
      ],
    },
    {
      title: '상태공간 해석',
      icon: '🔬',
      questions: [
        { id: 'c22', q: '상태변수와 상태방정식의 정의를 설명해주세요.', keyword: '상태변수 상태방정식' },
        { id: 'c23', q: '전달함수와 상태방정식 간의 변환 방법을 설명해주세요.', keyword: '전달함수 상태방정식 변환' },
        { id: 'c24', q: '가제어성(Controllability)과 가관측성(Observability)을 설명해주세요.', keyword: '가제어성 가관측성' },
        { id: 'c25', q: '상태피드백 제어와 극배치법을 설명해주세요.', keyword: '상태피드백 극배치' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `제어계측기사 자동제어 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n수식과 예제를 포함하여 시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `제어계측기사 자동제어 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `제어계측기사 자동제어 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-indigo-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">자동제어</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🎛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">자동제어</h1>
                <p className="text-blue-100">Automatic Control</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
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
