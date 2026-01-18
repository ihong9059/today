'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('ctrl-practical-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('ctrl-practical-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: 'PLC 프로그래밍',
      icon: '🖥️',
      questions: [
        { id: 'pr1', q: 'PLC의 구성요소(CPU, 입력모듈, 출력모듈, 전원부)와 동작원리를 설명해주세요.', keyword: 'PLC 구성요소 동작원리' },
        { id: 'pr2', q: '래더 다이어그램의 기본 명령어(LD, AND, OR, OUT, NOT)를 설명해주세요.', keyword: '래더다이어그램 LD AND OR OUT' },
        { id: 'pr3', q: '타이머(TON, TOF, TP)와 카운터(CTU, CTD)의 사용법을 설명해주세요.', keyword: 'PLC 타이머 카운터 TON CTU' },
        { id: 'pr4', q: '자기유지회로(Self-holding)와 인터록회로의 래더 프로그램을 작성해주세요.', keyword: '자기유지회로 인터록 래더' },
        { id: 'pr5', q: '순차제어(시퀀스 제어)와 스텝 래더의 작성법을 설명해주세요.', keyword: '순차제어 시퀀스 스텝래더' },
      ],
    },
    {
      title: '시퀀스 제어',
      icon: '⚡',
      questions: [
        { id: 'pr6', q: '시퀀스 다이어그램의 작성법과 기호를 설명해주세요.', keyword: '시퀀스다이어그램 기호' },
        { id: 'pr7', q: '전자접촉기(MC), 보조릴레이의 동작과 접점 표시를 설명해주세요.', keyword: '전자접촉기 MC 보조릴레이' },
        { id: 'pr8', q: '타임차트를 이용한 동작순서 분석방법을 설명해주세요.', keyword: '타임차트 동작순서' },
        { id: 'pr9', q: '정역운전 회로와 스타-델타 기동회로를 설명해주세요.', keyword: '정역운전 스타델타 기동회로' },
        { id: 'pr10', q: '비상정지, 과부하 보호회로의 설계를 설명해주세요.', keyword: '비상정지 과부하보호' },
      ],
    },
    {
      title: '계측기 교정',
      icon: '📏',
      questions: [
        { id: 'pr11', q: '압력계의 교정 절차와 교정 성적서 작성법을 설명해주세요.', keyword: '압력계 교정 성적서' },
        { id: 'pr12', q: '온도계(열전대, RTD)의 교정 방법을 설명해주세요.', keyword: '온도계 교정 열전대 RTD' },
        { id: 'pr13', q: '유량계의 교정 방법과 검증 절차를 설명해주세요.', keyword: '유량계 교정 검증' },
        { id: 'pr14', q: '트랜스미터의 제로/스팬 조정 방법을 설명해주세요.', keyword: '트랜스미터 제로 스팬 조정' },
        { id: 'pr15', q: '측정 불확도 계산과 교정 주기 결정을 설명해주세요.', keyword: '불확도계산 교정주기' },
      ],
    },
    {
      title: '제어회로 설계',
      icon: '🔧',
      questions: [
        { id: 'pr16', q: 'P&ID(배관계장도)의 해석과 기호를 설명해주세요.', keyword: 'P&ID 배관계장도 기호' },
        { id: 'pr17', q: '제어루프 다이어그램(Loop Diagram)의 작성법을 설명해주세요.', keyword: '루프다이어그램 작성' },
        { id: 'pr18', q: '단일 루프 제어와 캐스케이드 제어의 설계를 비교해주세요.', keyword: '단일루프 캐스케이드 제어' },
        { id: 'pr19', q: '피드포워드 제어와 비율 제어의 원리와 적용을 설명해주세요.', keyword: '피드포워드 비율제어' },
        { id: 'pr20', q: '인터록 로직 설계와 SIS(안전계장시스템)를 설명해주세요.', keyword: '인터록 SIS 안전계장' },
      ],
    },
    {
      title: '공정제어 튜닝',
      icon: '🎛️',
      questions: [
        { id: 'pr21', q: 'PID 제어기의 수동 튜닝 방법(시행착오법)을 설명해주세요.', keyword: 'PID 수동튜닝 시행착오' },
        { id: 'pr22', q: '지글러-니콜스법(개루프, 폐루프)을 이용한 PID 튜닝을 설명해주세요.', keyword: '지글러니콜스 개루프 폐루프' },
        { id: 'pr23', q: '릴레이 피드백 방법을 이용한 자동 튜닝을 설명해주세요.', keyword: '릴레이피드백 자동튜닝' },
        { id: 'pr24', q: '공정 응답 곡선 분석(1차+시간지연 모델)을 설명해주세요.', keyword: '공정응답 1차시스템 시간지연' },
      ],
    },
    {
      title: '계장 실무',
      icon: '📋',
      questions: [
        { id: 'pr25', q: '계장 배선도(Wiring Diagram)의 작성과 해석을 설명해주세요.', keyword: '계장배선도 Wiring' },
        { id: 'pr26', q: '접지 시스템(보호접지, 계기접지)의 설계를 설명해주세요.', keyword: '접지시스템 보호접지 계기접지' },
        { id: 'pr27', q: '케이블 트레이와 덕트 배선 설계를 설명해주세요.', keyword: '케이블트레이 덕트배선' },
        { id: 'pr28', q: '방폭 지역 분류와 방폭 계기 선정을 설명해주세요.', keyword: '방폭지역 방폭계기' },
        { id: 'pr29', q: 'DCS/SCADA 시스템의 구성과 기능을 설명해주세요.', keyword: 'DCS SCADA 구성' },
        { id: 'pr30', q: '필드버스(HART, Foundation Fieldbus, Profibus)를 비교해주세요.', keyword: '필드버스 HART Profibus' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `제어계측기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요. 실습 예제나 절차도 포함해주세요.`,
      chatgpt: `제어계측기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요.`,
      gemini: `제어계측기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-teal-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">실기시험</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기시험 (필답형 + 작업형)</h1>
                <p className="text-teal-100">Practical Examination</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-teal-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-teal-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-teal-800 mb-2">📝 실기시험 안내</h3>
          <ul className="text-sm text-teal-700 space-y-1">
            <li>• 시험시간: 약 4시간</li>
            <li>• 시험형태: 필답형 + 작업형 복합</li>
            <li>• 합격기준: 60점 이상</li>
            <li>• 주요 출제: PLC 프로그래밍, 계측기 교정, 제어회로 설계</li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-2">
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
