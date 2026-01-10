'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GeneralChemistryStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-technician-general-chemistry-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('hazardous-technician-general-chemistry-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '원자 구조와 주기율표',
      icon: '⚛️',
      questions: [
        { id: 'gc1', q: '원자의 구조(양성자, 중성자, 전자)와 원자번호, 질량수의 개념을 설명해주세요.', keyword: '원자구조 원자번호 질량수' },
        { id: 'gc2', q: '주기율표의 구성과 주기, 족의 의미를 설명하고 원소의 성질 변화를 설명해주세요.', keyword: '주기율표 주기 족 원소' },
        { id: 'gc3', q: '전자배치와 오비탈(s, p, d, f)의 개념을 설명해주세요.', keyword: '전자배치 오비탈 spdf' },
        { id: 'gc4', q: '이온화 에너지, 전자친화도, 전기음성도의 개념과 주기적 경향을 설명해주세요.', keyword: '이온화에너지 전자친화도 전기음성도' },
        { id: 'gc5', q: '동위원소의 개념과 예시(C-12, C-14 등)를 설명해주세요.', keyword: '동위원소 탄소14 방사성' },
      ],
    },
    {
      title: '화학 결합',
      icon: '🔗',
      questions: [
        { id: 'gc6', q: '이온결합의 형성 원리와 특성을 설명해주세요.', keyword: '이온결합 양이온 음이온' },
        { id: 'gc7', q: '공유결합의 형성 원리와 종류(단일, 이중, 삼중결합)를 설명해주세요.', keyword: '공유결합 단일결합 이중결합' },
        { id: 'gc8', q: '금속결합의 특성과 자유전자 모형을 설명해주세요.', keyword: '금속결합 자유전자 전도성' },
        { id: 'gc9', q: '분자간 힘(반데르발스 힘, 수소결합)의 종류와 특성을 설명해주세요.', keyword: '분자간힘 수소결합 반데르발스' },
        { id: 'gc10', q: '극성 분자와 무극성 분자의 차이를 설명해주세요.', keyword: '극성분자 무극성분자 쌍극자' },
      ],
    },
    {
      title: '화학 반응과 양론',
      icon: '⚗️',
      questions: [
        { id: 'gc11', q: '화학 반응식의 균형 맞추기와 계수의 의미를 설명해주세요.', keyword: '화학반응식 균형 계수' },
        { id: 'gc12', q: '몰(mole) 개념과 아보가드로 수를 설명해주세요.', keyword: '몰 아보가드로수 6.02×10²³' },
        { id: 'gc13', q: '몰농도, 몰랄농도, 퍼센트 농도의 개념과 계산법을 설명해주세요.', keyword: '몰농도 몰랄농도 농도계산' },
        { id: 'gc14', q: '한계반응물과 과량반응물의 개념을 설명해주세요.', keyword: '한계반응물 과량반응물 수율' },
        { id: 'gc15', q: '산화-환원 반응의 정의와 산화수 변화를 설명해주세요.', keyword: '산화환원 산화수 환원제' },
      ],
    },
    {
      title: '반응 속도론',
      icon: '⏱️',
      questions: [
        { id: 'gc16', q: '반응속도의 정의와 측정 방법을 설명해주세요.', keyword: '반응속도 농도변화 속도식' },
        { id: 'gc17', q: '반응속도에 영향을 주는 요인(온도, 농도, 촉매, 표면적)을 설명해주세요.', keyword: '반응속도 온도 농도 촉매' },
        { id: 'gc18', q: '활성화 에너지와 아레니우스 식을 설명해주세요.', keyword: '활성화에너지 아레니우스식' },
        { id: 'gc19', q: '촉매의 역할과 종류(정촉매, 부촉매)를 설명해주세요.', keyword: '촉매 정촉매 활성화에너지 감소' },
        { id: 'gc20', q: '반응 차수(0차, 1차, 2차)의 개념을 설명해주세요.', keyword: '반응차수 0차 1차 2차' },
      ],
    },
    {
      title: '화학 열역학',
      icon: '🔥',
      questions: [
        { id: 'gc21', q: '엔탈피(H)의 개념과 발열반응, 흡열반응을 설명해주세요.', keyword: '엔탈피 발열반응 흡열반응' },
        { id: 'gc22', q: '헤스의 법칙과 생성열, 연소열을 설명해주세요.', keyword: '헤스법칙 생성열 연소열' },
        { id: 'gc23', q: '엔트로피(S)의 개념과 자발적 변화를 설명해주세요.', keyword: '엔트로피 무질서도 자발성' },
        { id: 'gc24', q: '깁스 자유에너지(G)와 반응의 자발성 판단을 설명해주세요.', keyword: '깁스자유에너지 자발성 ΔG' },
        { id: 'gc25', q: '화학평형과 평형상수(K)의 개념을 설명해주세요.', keyword: '화학평형 평형상수 르샤틀리에' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `위험물산업기사 일반화학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `위험물산업기사 일반화학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `위험물산업기사 일반화학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <span className="text-red-600 font-medium">일반화학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">⚗️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">일반화학</h1>
                <p className="text-red-100">General Chemistry</p>
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
