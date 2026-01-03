'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DrawingStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mc-drawing-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('mc-drawing-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '제도 통칙',
      icon: '📏',
      questions: [
        { id: 'd1', q: '도면의 척도 종류(현척, 축척, 배척)와 KS 규격에 따른 표기법을 설명해주세요.', keyword: '기계제도 척도' },
        { id: 'd2', q: '도면의 크기(A0~A4)와 윤곽선, 표제란의 규격을 설명해주세요.', keyword: '기계제도 도면크기 규격' },
        { id: 'd3', q: '선의 종류(실선, 파선, 일점쇄선 등)와 용도를 구분해서 설명해주세요.', keyword: '기계제도 선의종류' },
        { id: 'd4', q: '문자와 숫자의 규격(높이, 폭, 기울기)을 KS규격에 맞게 설명해주세요.', keyword: '기계제도 문자규격' },
      ],
    },
    {
      title: '투상법',
      icon: '📐',
      questions: [
        { id: 'd5', q: '제1각법과 제3각법의 차이점과 투상도 배치 방법을 설명해주세요.', keyword: '제1각법 제3각법 차이' },
        { id: 'd6', q: '정투상도(정면도, 평면도, 측면도)의 선정 기준을 설명해주세요.', keyword: '정투상도 선정기준' },
        { id: 'd7', q: '등각투상도와 사투상도의 특징과 작도법을 설명해주세요.', keyword: '등각투상도 사투상도' },
        { id: 'd8', q: '보조투상도와 부분투상도의 사용 목적과 도시방법을 설명해주세요.', keyword: '보조투상도 부분투상도' },
      ],
    },
    {
      title: '단면도',
      icon: '🔍',
      questions: [
        { id: 'd9', q: '전단면도, 반단면도, 부분단면도의 차이와 사용 조건을 설명해주세요.', keyword: '단면도 종류' },
        { id: 'd10', q: '회전단면도와 이동단면도의 도시방법과 사용 목적을 설명해주세요.', keyword: '회전단면도 이동단면도' },
        { id: 'd11', q: '해칭(단면선)의 종류와 재료별 해칭 표시법을 설명해주세요.', keyword: '해칭 단면선 재료' },
        { id: 'd12', q: '단면으로 도시하지 않는 부품(축, 리브, 볼트 등)의 이유를 설명해주세요.', keyword: '단면도 제외부품' },
      ],
    },
    {
      title: '치수 기입법',
      icon: '📊',
      questions: [
        { id: 'd13', q: '치수선, 치수보조선, 치수숫자의 기입 원칙을 설명해주세요.', keyword: '치수기입 원칙' },
        { id: 'd14', q: '직렬치수기입법, 병렬치수기입법, 누진치수기입법의 특징을 비교해주세요.', keyword: '직렬치수 병렬치수 누진치수' },
        { id: 'd15', q: '지름, 반지름, 구의 지름/반지름 기호 표시법을 설명해주세요.', keyword: '치수기입 기호' },
        { id: 'd16', q: '테이퍼와 기울기의 표시방법과 계산법을 설명해주세요.', keyword: '테이퍼 기울기 표시' },
      ],
    },
    {
      title: '공차와 끼워맞춤',
      icon: '🔧',
      questions: [
        { id: 'd17', q: '치수공차의 정의와 기준치수, 허용한계치수, 치수허용차를 설명해주세요.', keyword: '치수공차 정의' },
        { id: 'd18', q: 'IT공차등급(IT01~IT18)의 의미와 적용 예를 설명해주세요.', keyword: 'IT공차등급' },
        { id: 'd19', q: '끼워맞춤의 종류(헐거운, 중간, 억지)와 구멍기준식/축기준식을 설명해주세요.', keyword: '끼워맞춤 종류' },
        { id: 'd20', q: '기하공차의 종류(진직도, 평면도, 진원도, 동심도 등)와 기호를 설명해주세요.', keyword: '기하공차 종류 기호' },
      ],
    },
    {
      title: '표면거칠기와 가공기호',
      icon: '✨',
      questions: [
        { id: 'd21', q: '표면거칠기의 정의와 Ra, Rz, Rmax의 의미를 설명해주세요.', keyword: '표면거칠기 Ra Rz' },
        { id: 'd22', q: '표면거칠기 기호의 도시방법과 가공방법 표시를 설명해주세요.', keyword: '표면거칠기 기호' },
        { id: 'd23', q: '용접기호의 종류와 도면에서의 표시방법을 설명해주세요.', keyword: '용접기호 표시' },
        { id: 'd24', q: '재료기호(SM45C, STS304 등)의 의미와 표시방법을 설명해주세요.', keyword: '재료기호 의미' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `기계산업기사 기계제도 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요. 예시와 함께 설명해주시면 좋겠습니다.`,
      chatgpt: `기계산업기사 기계제도 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `기계산업기사 기계제도 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
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
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-blue-600">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">기계제도</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">📐</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">기계제도</h1>
                <p className="text-blue-100">Mechanical Drawing</p>
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
