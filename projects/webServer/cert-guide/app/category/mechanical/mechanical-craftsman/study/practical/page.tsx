'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mc-practical-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('mc-practical-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '도면 해독',
      icon: '📐',
      questions: [
        { id: 'p1', q: '주어진 정투상도에서 제3각법 투상 원리를 적용하여 부품의 형상을 파악하는 방법을 설명해주세요.', keyword: '제3각법 투상도 해독' },
        { id: 'p2', q: '단면도에서 해칭 방향과 재료 표시를 해석하는 방법을 설명해주세요.', keyword: '단면도 해칭 해석' },
        { id: 'p3', q: '공차와 끼워맞춤 기호(H7/g6 등)를 해독하여 치수 허용차를 구하는 방법을 설명해주세요.', keyword: '끼워맞춤 기호 해독' },
        { id: 'p4', q: '기하공차 기호와 데이텀을 해석하는 방법을 설명해주세요.', keyword: '기하공차 데이텀 해석' },
      ],
    },
    {
      title: '치수 계산',
      icon: '🔢',
      questions: [
        { id: 'p5', q: '축과 구멍의 끼워맞춤에서 최대/최소 틈새와 조임량을 계산하는 방법을 설명해주세요.', keyword: '끼워맞춤 틈새 조임량 계산' },
        { id: 'p6', q: '테이퍼와 기울기의 각도를 계산하는 공식과 예제를 풀어주세요.', keyword: '테이퍼 기울기 각도계산' },
        { id: 'p7', q: '스플라인 축의 피치원 지름과 유효 이폭을 계산하는 방법을 설명해주세요.', keyword: '스플라인 피치원 계산' },
        { id: 'p8', q: '체인전동에서 스프로킷 이수와 피치원 지름을 계산해주세요.', keyword: '스프로킷 피치원 계산' },
      ],
    },
    {
      title: '절삭조건 계산',
      icon: '⚙️',
      questions: [
        { id: 'p9', q: '선반가공에서 절삭속도(V), 회전수(N), 이송속도(F)의 관계와 계산공식을 설명해주세요.', keyword: '선반 절삭속도 회전수 계산' },
        { id: 'p10', q: '밀링가공에서 테이블 이송속도와 분당 절삭량 계산법을 설명해주세요.', keyword: '밀링 이송속도 절삭량' },
        { id: 'p11', q: '드릴가공에서 가공시간과 절삭동력 계산법을 설명해주세요.', keyword: '드릴 가공시간 절삭동력' },
        { id: 'p12', q: '연삭가공에서 숫돌 주속도와 공작물 회전수를 계산해주세요.', keyword: '연삭 주속도 회전수' },
      ],
    },
    {
      title: '기계요소 설계',
      icon: '🔧',
      questions: [
        { id: 'p13', q: '축의 지름을 비틀림모멘트로부터 계산하는 방법과 공식을 설명해주세요.', keyword: '축 지름 비틀림모멘트 계산' },
        { id: 'p14', q: '볼트의 인장응력과 필요 골지름을 계산하는 방법을 설명해주세요.', keyword: '볼트 인장응력 골지름' },
        { id: 'p15', q: '스퍼기어의 모듈, 잇수, 피치원 지름의 관계와 계산을 설명해주세요.', keyword: '스퍼기어 모듈 피치원' },
        { id: 'p16', q: 'V벨트 전동장치의 벨트 길이와 풀리 지름을 계산해주세요.', keyword: 'V벨트 길이 풀리지름' },
      ],
    },
    {
      title: '가공방법 선정',
      icon: '🏭',
      questions: [
        { id: 'p17', q: '주어진 형상에 적합한 주조방법을 선정하는 기준을 설명해주세요.', keyword: '주조방법 선정기준' },
        { id: 'p18', q: '표면거칠기 요구사항에 따른 가공방법 선정 기준을 설명해주세요.', keyword: '표면거칠기 가공방법 선정' },
        { id: 'p19', q: '치수정밀도에 따른 마무리 가공방법(연삭, 호닝, 래핑) 선정을 설명해주세요.', keyword: '정밀가공 연삭 호닝 래핑' },
        { id: 'p20', q: '재료 특성에 따른 절삭공구 선정 방법을 설명해주세요.', keyword: '절삭공구 선정 재료특성' },
      ],
    },
    {
      title: '공정 계획',
      icon: '📋',
      questions: [
        { id: 'p21', q: '축 부품의 가공공정 순서를 작성하는 방법을 설명해주세요.', keyword: '축 가공공정 순서' },
        { id: 'p22', q: '기어 가공의 공정순서와 각 공정의 목적을 설명해주세요.', keyword: '기어 가공공정 순서' },
        { id: 'p23', q: '플랜지 부품의 선반가공 공정계획을 수립하는 방법을 설명해주세요.', keyword: '플랜지 선반가공 공정' },
        { id: 'p24', q: '열처리 전후 가공의 공정순서와 유의사항을 설명해주세요.', keyword: '열처리 가공순서' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `기계산업기사 실기시험(필답형) 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요. 계산 과정과 예시 문제도 포함해주세요.`,
      chatgpt: `기계산업기사 실기시험(필답형) 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요.`,
      gemini: `기계산업기사 실기시험(필답형) 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n실기시험에 자주 출제되는 형태로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-emerald-600">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">실기시험</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기시험 (필답형)</h1>
                <p className="text-emerald-100">Practical Examination</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-emerald-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-emerald-800 mb-2">📝 실기시험 안내</h3>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 시험시간: 2시간 30분</li>
            <li>• 시험형태: 필답형 (주관식)</li>
            <li>• 합격기준: 60점 이상</li>
            <li>• 주요 출제: 도면해독, 치수계산, 절삭조건, 기계요소 설계</li>
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
