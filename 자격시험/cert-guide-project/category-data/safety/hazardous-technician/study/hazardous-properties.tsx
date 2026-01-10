'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HazardousPropertiesStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-technician-hazardous-properties-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('hazardous-technician-hazardous-properties-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '위험물의 분류 체계',
      icon: '📊',
      questions: [
        { id: 'hp1', q: '위험물의 정의와 지정수량의 개념을 설명해주세요.', keyword: '위험물 정의 지정수량' },
        { id: 'hp2', q: '위험물 6개 류(제1류~제6류)의 분류 기준과 특성을 설명해주세요.', keyword: '위험물분류 1류~6류' },
        { id: 'hp3', q: '위험물의 저장 및 취급 기준(지정수량, 배수)을 설명해주세요.', keyword: '저장기준 취급기준 지정수량배수' },
        { id: 'hp4', q: '위험물 안전관리자의 역할과 책임을 설명해주세요.', keyword: '안전관리자 역할 책임' },
        { id: 'hp5', q: '위험물 시설의 종류(제조소, 저장소, 취급소)를 설명해주세요.', keyword: '제조소 저장소 취급소' },
      ],
    },
    {
      title: '제1류 위험물 (산화성 고체)',
      icon: '⚗️',
      questions: [
        { id: 'hp6', q: '제1류 위험물의 정의와 공통 성질을 설명해주세요.', keyword: '제1류 산화성고체 성질' },
        { id: 'hp7', q: '염소산염류(KClO3, NaClO3)의 성질과 위험성을 설명해주세요.', keyword: '염소산염류 KClO3 위험성' },
        { id: 'hp8', q: '과염소산염류, 무기과산화물의 성질과 저장·취급 방법을 설명해주세요.', keyword: '과염소산염류 무기과산화물' },
        { id: 'hp9', q: '질산염류, 아염소산염류의 성질과 화재 시 소화방법을 설명해주세요.', keyword: '질산염류 아염소산염류 소화' },
        { id: 'hp10', q: '제1류 위험물의 저장·취급 주의사항과 적응 소화약제를 설명해주세요.', keyword: '제1류 저장 취급 소화약제' },
      ],
    },
    {
      title: '제2류 위험물 (가연성 고체)',
      icon: '🔥',
      questions: [
        { id: 'hp11', q: '제2류 위험물의 정의와 공통 성질을 설명해주세요.', keyword: '제2류 가연성고체 성질' },
        { id: 'hp12', q: '황화린, 적린, 유황의 성질과 위험성을 설명해주세요.', keyword: '황화린 적린 유황' },
        { id: 'hp13', q: '금속분(알루미늄분, 마그네슘분)의 성질과 화재위험을 설명해주세요.', keyword: '금속분 알루미늄 마그네슘' },
        { id: 'hp14', q: '인화성 고체(고형알코올, 고무풀 등)의 성질을 설명해주세요.', keyword: '인화성고체 고형알코올' },
        { id: 'hp15', q: '제2류 위험물의 저장·취급 주의사항과 소화방법을 설명해주세요.', keyword: '제2류 저장 소화방법' },
      ],
    },
    {
      title: '제3류 위험물 (자연발화성·금수성)',
      icon: '💧',
      questions: [
        { id: 'hp16', q: '제3류 위험물의 정의와 자연발화성, 금수성의 의미를 설명해주세요.', keyword: '제3류 자연발화성 금수성' },
        { id: 'hp17', q: '칼륨(K), 나트륨(Na)의 성질과 물과의 반응을 설명해주세요.', keyword: '칼륨 나트륨 금수성' },
        { id: 'hp18', q: '황린(백린)의 성질과 자연발화 위험성을 설명해주세요.', keyword: '황린 백린 자연발화' },
        { id: 'hp19', q: '알킬알루미늄, 알킬리튬의 성질과 위험성을 설명해주세요.', keyword: '알킬알루미늄 알킬리튬' },
        { id: 'hp20', q: '제3류 위험물의 저장방법(보호액 사용)과 화재 시 주의사항을 설명해주세요.', keyword: '제3류 보호액 저장 소화' },
      ],
    },
    {
      title: '제4~6류 위험물',
      icon: '☢️',
      questions: [
        { id: 'hp21', q: '제4류 위험물(인화성 액체)의 정의와 특수인화물, 제1~4석유류를 설명해주세요.', keyword: '제4류 인화성액체 석유류' },
        { id: 'hp22', q: '제5류 위험물(자기반응성 물질)의 정의와 주요 물질을 설명해주세요.', keyword: '제5류 자기반응성 니트로' },
        { id: 'hp23', q: '제6류 위험물(산화성 액체)의 정의와 주요 물질(과산화수소, 질산 등)을 설명해주세요.', keyword: '제6류 산화성액체 과산화수소' },
        { id: 'hp24', q: '휘발유, 경유, 등유의 인화점과 발화점 비교 및 위험성을 설명해주세요.', keyword: '휘발유 경유 인화점' },
        { id: 'hp25', q: '위험물 혼재 저장의 금지 사항과 예외 규정을 설명해주세요.', keyword: '혼재저장 금지 예외' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `위험물산업기사 위험물의 성질과 취급 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `위험물산업기사 위험물의 성질과 취급 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `위험물산업기사 위험물의 성질과 취급 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <span className="text-red-600 font-medium">위험물의 성질과 취급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">☢️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">위험물의 성질과 취급</h1>
                <p className="text-red-100">Hazardous Materials Properties and Handling</p>
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
