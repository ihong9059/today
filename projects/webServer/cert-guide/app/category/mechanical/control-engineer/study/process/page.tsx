'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProcessStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('ctrl-process-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('ctrl-process-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '온도 계측',
      icon: '🌡️',
      questions: [
        { id: 'p1', q: '온도의 정의와 온도 스케일(섭씨, 화씨, 켈빈, 랭킨)의 관계를 설명해주세요.', keyword: '온도스케일 섭씨 화씨 켈빈' },
        { id: 'p2', q: '열전대의 종류(K, J, T, E, R, S, B)와 특성을 비교해주세요.', keyword: '열전대 K형 J형 T형' },
        { id: 'p3', q: '측온저항체(RTD)의 원리와 Pt100의 특성을 설명해주세요.', keyword: 'RTD Pt100 측온저항체' },
        { id: 'p4', q: '서미스터(NTC, PTC)의 특성과 용도를 설명해주세요.', keyword: '서미스터 NTC PTC' },
        { id: 'p5', q: '비접촉식 온도계(방사온도계, 적외선온도계)의 원리를 설명해주세요.', keyword: '방사온도계 적외선온도계' },
      ],
    },
    {
      title: '압력 계측',
      icon: '🔵',
      questions: [
        { id: 'p6', q: '압력의 정의와 단위(Pa, bar, psi, kgf/cm², mmHg)의 환산을 설명해주세요.', keyword: '압력단위 Pa bar psi' },
        { id: 'p7', q: '부르동관 압력계의 원리와 종류(C형, 나선형, 스파이럴형)를 설명해주세요.', keyword: '부르동관 압력계' },
        { id: 'p8', q: '다이어프램형, 벨로우즈형 압력계의 원리를 설명해주세요.', keyword: '다이어프램 벨로우즈 압력계' },
        { id: 'p9', q: '압력 트랜스미터의 원리와 4-20mA 출력 신호를 설명해주세요.', keyword: '압력트랜스미터 4-20mA' },
        { id: 'p10', q: '절대압력, 게이지압력, 차압의 차이와 측정방법을 설명해주세요.', keyword: '절대압력 게이지압력 차압' },
      ],
    },
    {
      title: '유량 계측',
      icon: '💧',
      questions: [
        { id: 'p11', q: '유량의 정의(체적유량, 질량유량)와 베르누이 정리를 설명해주세요.', keyword: '유량 베르누이 정리' },
        { id: 'p12', q: '오리피스, 벤츄리관, 노즐의 차압식 유량계 원리를 설명해주세요.', keyword: '오리피스 벤츄리 차압식유량계' },
        { id: 'p13', q: '터빈 유량계와 용적식 유량계의 원리와 특성을 설명해주세요.', keyword: '터빈유량계 용적식유량계' },
        { id: 'p14', q: '전자 유량계(Magnetic Flow Meter)의 원리와 적용 조건을 설명해주세요.', keyword: '전자유량계 magnetic' },
        { id: 'p15', q: '초음파 유량계(도플러식, 전파시간차식)의 원리를 설명해주세요.', keyword: '초음파유량계 도플러' },
        { id: 'p16', q: '코리올리 유량계와 질량유량 측정 원리를 설명해주세요.', keyword: '코리올리 유량계 질량유량' },
      ],
    },
    {
      title: '레벨 계측',
      icon: '📏',
      questions: [
        { id: 'p17', q: '플로트식 레벨계와 디스플레이서 레벨계의 원리를 설명해주세요.', keyword: '플로트 디스플레이서 레벨계' },
        { id: 'p18', q: '차압식 레벨계의 원리와 설치시 주의사항을 설명해주세요.', keyword: '차압식 레벨계' },
        { id: 'p19', q: '정전용량식 레벨계의 원리와 적용을 설명해주세요.', keyword: '정전용량식 레벨계' },
        { id: 'p20', q: '초음파 레벨계와 레이더 레벨계의 원리를 비교해주세요.', keyword: '초음파레벨계 레이더레벨계' },
        { id: 'p21', q: '방사선(감마선) 레벨계의 원리와 적용을 설명해주세요.', keyword: '방사선 감마선 레벨계' },
      ],
    },
    {
      title: '분석계기',
      icon: '🔬',
      questions: [
        { id: 'p22', q: 'pH 측정의 원리와 pH 전극의 구조를 설명해주세요.', keyword: 'pH측정 pH전극' },
        { id: 'p23', q: '용존산소(DO) 측정의 원리와 방법을 설명해주세요.', keyword: '용존산소 DO 측정' },
        { id: 'p24', q: '가스 크로마토그래피(GC)의 원리와 구성을 설명해주세요.', keyword: '가스크로마토그래피 GC' },
        { id: 'p25', q: '적외선 가스분석계(NDIR)의 원리를 설명해주세요.', keyword: 'NDIR 적외선가스분석' },
        { id: 'p26', q: '산소분석계(지르코니아식, 상자성식)의 원리를 설명해주세요.', keyword: '산소분석계 지르코니아' },
      ],
    },
    {
      title: '제어밸브',
      icon: '🔧',
      questions: [
        { id: 'p27', q: '조절밸브의 종류(글로브, 버터플라이, 볼)와 특성을 비교해주세요.', keyword: '조절밸브 글로브 버터플라이' },
        { id: 'p28', q: '밸브의 유량특성(등백분율, 직선, 속개형)을 설명해주세요.', keyword: '밸브 유량특성 등백분율' },
        { id: 'p29', q: 'Cv값의 정의와 밸브 사이징 방법을 설명해주세요.', keyword: 'Cv값 밸브사이징' },
        { id: 'p30', q: '공압식 밸브 액츄에이터의 동작 원리를 설명해주세요.', keyword: '공압식 밸브 액츄에이터' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `제어계측기사 공업계측 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `제어계측기사 공업계측 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `제어계측기사 공업계측 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-orange-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">공업계측</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🔬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">공업계측</h1>
                <p className="text-orange-100">Process Instrumentation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-orange-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
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
