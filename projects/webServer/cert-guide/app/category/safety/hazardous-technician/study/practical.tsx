'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-technician-practical-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('hazardous-technician-practical-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '위험물 저장 및 취급 실무',
      icon: '📦',
      questions: [
        { id: 'pr1', q: '제1류 위험물(산화성 고체)의 저장탱크 구조와 안전장치를 설명해주세요.', keyword: '제1류 저장탱크 안전장치' },
        { id: 'pr2', q: '제4류 위험물(인화성 액체) 옥외탱크 저장소의 방유제 설치기준을 설명해주세요.', keyword: '제4류 옥외탱크 방유제' },
        { id: 'pr3', q: '위험물 운반 시 운반용기 표시사항과 적재방법을 설명해주세요.', keyword: '위험물운반 용기표시 적재' },
      ],
    },
    {
      title: '소화설비 점검 및 유지관리',
      icon: '🧯',
      questions: [
        { id: 'pr4', q: '옥내소화전의 정기점검 항목과 점검 절차를 설명해주세요.', keyword: '옥내소화전 점검 절차' },
        { id: 'pr5', q: '스프링클러 헤드의 종류와 작동시험 방법을 설명해주세요.', keyword: '스프링클러헤드 작동시험' },
        { id: 'pr6', q: '분말소화설비의 점검항목과 소화약제 교체주기를 설명해주세요.', keyword: '분말소화설비 점검 교체주기' },
      ],
    },
    {
      title: '위험물 안전관리 실무',
      icon: '⚠️',
      questions: [
        { id: 'pr7', q: '위험물제조소의 정기점검 항목과 점검주기를 설명해주세요.', keyword: '제조소 정기점검 점검주기' },
        { id: 'pr8', q: '위험물 안전관리자의 업무와 자격기준을 설명해주세요.', keyword: '안전관리자 업무 자격' },
        { id: 'pr9', q: '위험물 취급 시 정전기 재해 방지대책을 설명해주세요.', keyword: '정전기재해 방지대책 접지' },
      ],
    },
    {
      title: '화재 예방 및 대응',
      icon: '🔥',
      questions: [
        { id: 'pr10', q: '위험물 화재 발생 시 초기 대응 절차를 설명해주세요.', keyword: '화재대응 초기조치 절차' },
        { id: 'pr11', q: '각 류별 위험물에 적합한 소화약제 선정방법을 설명해주세요.', keyword: '소화약제 선정 적응성' },
        { id: 'pr12', q: '위험물 시설의 소방계획서 작성 항목과 절차를 설명해주세요.', keyword: '소방계획서 작성 항목' },
      ],
    },
    {
      title: '사고사례 분석 및 대책',
      icon: '📋',
      questions: [
        { id: 'pr13', q: '주유소 화재사고의 주요 원인과 예방대책을 설명해주세요.', keyword: '주유소화재 원인 예방' },
        { id: 'pr14', q: '위험물 탱크 폭발사고의 메커니즘과 방지대책을 설명해주세요.', keyword: '탱크폭발 메커니즘 방지' },
        { id: 'pr15', q: '위험물 누출사고 시 긴급조치 요령을 설명해주세요.', keyword: '위험물누출 긴급조치 대응' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `위험물산업기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실무 중심으로 상세히 설명해주세요.`,
      chatgpt: `위험물산업기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실무 중심으로 상세히 설명해주세요.`,
      gemini: `위험물산업기사 실기시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실무 중심으로 상세히 설명해주세요.`,
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
            <span className="text-red-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">🔧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기시험 (위험물 취급 실무)</h1>
                <p className="text-red-100">Practical Examination - Hazardous Materials Handling</p>
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
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-green-800 mb-2">💡 실기시험 TIP</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 위험물 1~6류별 저장·취급 기준을 정확히 숙지하세요</li>
            <li>• 소화설비 점검 절차와 점검항목을 실무 중심으로 학습하세요</li>
            <li>• 실제 사고사례를 분석하고 원인과 대책을 이해하세요</li>
            <li>• 위험물안전관리법령의 주요 조항을 암기하세요</li>
          </ul>
        </div>

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
