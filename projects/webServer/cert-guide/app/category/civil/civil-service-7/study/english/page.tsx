'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function EnglishStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'vocabulary',
      name: '어휘',
      icon: '📚',
      questions: [
        { id: 1, q: '동의어/유의어 문제 접근법을 설명하시오.', a: '문맥에서 의미 파악, 선지 대입 확인' },
        { id: 2, q: '반의어 문제 접근법을 설명하시오.', a: '접두사(un-, dis-, in-) 활용, 문맥 확인' },
        { id: 3, q: '다의어 해석 방법을 설명하시오.', a: '문맥에 따른 적절한 의미 선택' },
        { id: 4, q: '관용표현/숙어 학습법을 설명하시오.', a: '자주 출제되는 표현 암기, 맥락 이해' },
        { id: 5, q: '어휘 빈칸 추론 전략을 설명하시오.', a: '앞뒤 문맥, 논리관계, 콜로케이션 활용' },
        { id: 6, q: '접두사의 의미를 설명하시오.', a: 'pre-(전), post-(후), re-(다시), anti-(반대)' },
        { id: 7, q: '접미사의 기능을 설명하시오.', a: '-tion(명사화), -ly(부사화), -able(형용사화)' },
        { id: 8, q: '어근 학습의 중요성을 설명하시오.', a: '어근으로 모르는 단어 의미 추론 가능' },
        { id: 9, q: '콜로케이션을 설명하시오.', a: '자주 함께 쓰이는 단어 조합 (make a decision)' },
        { id: 10, q: '문맥을 통한 어휘 추론을 설명하시오.', a: '정의, 예시, 대조, 인과관계 활용' }
      ]
    },
    {
      id: 'grammar',
      name: '문법',
      icon: '📖',
      questions: [
        { id: 1, q: '시제 일치 규칙을 설명하시오.', a: '주절 과거 → 종속절 과거/과거완료' },
        { id: 2, q: '가정법 과거/과거완료를 설명하시오.', a: '과거: 현재 반대 / 과거완료: 과거 반대' },
        { id: 3, q: '관계대명사 선택법을 설명하시오.', a: 'who(사람), which(사물), that(둘 다), whose(소유)' },
        { id: 4, q: '분사구문 만드는 법을 설명하시오.', a: '접속사 생략, 주어 같으면 생략, 동사→분사' },
        { id: 5, q: '수 일치 규칙을 설명하시오.', a: '주어와 동사의 단수/복수 일치' },
        { id: 6, q: '비교급/최상급을 설명하시오.', a: '-er/-est, more/most, 불규칙 변화' },
        { id: 7, q: '부정사와 동명사 선택을 설명하시오.', a: '동사에 따라 목적어로 부정사/동명사 결정' },
        { id: 8, q: '조동사의 의미를 설명하시오.', a: 'can(능력), may(허가), must(의무), should(충고)' },
        { id: 9, q: '수동태 전환을 설명하시오.', a: '목적어→주어, be+p.p., 행위자는 by+목적격' },
        { id: 10, q: '도치 구문을 설명하시오.', a: '부정어/장소부사 문두 시 조동사+주어 도치' }
      ]
    },
    {
      id: 'reading-main',
      name: '독해 - 주제/요지',
      icon: '📄',
      questions: [
        { id: 1, q: '주제문 찾는 방법을 설명하시오.', a: '첫 문장, 마지막 문장, 역접 뒤 주목' },
        { id: 2, q: '주제 vs 요지를 설명하시오.', a: '주제: 글의 화제 / 요지: 필자의 주장' },
        { id: 3, q: '제목 추론 방법을 설명하시오.', a: '주제 파악 후 간결하게 표현' },
        { id: 4, q: '글의 목적 파악을 설명하시오.', a: '설득, 정보전달, 광고, 비판 등 구분' },
        { id: 5, q: '필자의 태도 파악을 설명하시오.', a: '긍정/부정/중립, 형용사·부사에서 확인' },
        { id: 6, q: '문단 요약 전략을 설명하시오.', a: '핵심 정보만 추출, 세부사항 제외' },
        { id: 7, q: '주장 근거 파악을 설명하시오.', a: '예시, 통계, 인용, 비교 등 근거 유형 확인' },
        { id: 8, q: '글의 논조 파악을 설명하시오.', a: '비판적, 객관적, 낙관적, 비관적 등' },
        { id: 9, q: '함축 의미 추론을 설명하시오.', a: '직접 언급되지 않은 의미 논리적 도출' },
        { id: 10, q: '필자의 의도 파악을 설명하시오.', a: '글을 쓴 궁극적 목적 추론' }
      ]
    },
    {
      id: 'reading-detail',
      name: '독해 - 세부/추론',
      icon: '🔍',
      questions: [
        { id: 1, q: '세부내용 일치 문제 전략을 설명하시오.', a: '선지 키워드로 본문 해당 부분 찾아 대조' },
        { id: 2, q: '빈칸 추론 전략을 설명하시오.', a: '앞뒤 문맥, 연결어, 논리흐름 파악' },
        { id: 3, q: '지시어 파악 방법을 설명하시오.', a: '지시어 앞 문장에서 지칭 대상 확인' },
        { id: 4, q: '문장 삽입 위치 찾기를 설명하시오.', a: '연결어, 지시어, 논리적 흐름 활용' },
        { id: 5, q: '문장 배열 전략을 설명하시오.', a: '첫 문장/마지막 문장 찾기, 연결고리 파악' },
        { id: 6, q: '어휘 추론 문제 접근을 설명하시오.', a: '문맥에서 단어 의미 추론' },
        { id: 7, q: '문맥상 어색한 어휘 찾기를 설명하시오.', a: '논리적 흐름에 맞지 않는 어휘 선택' },
        { id: 8, q: '요약문 완성 전략을 설명하시오.', a: '본문 핵심 내용과 일치하는 선지 선택' },
        { id: 9, q: '도표/그래프 해석을 설명하시오.', a: '도표 정보와 본문 내용 대조' },
        { id: 10, q: '장문 독해 전략을 설명하시오.', a: '문단별 핵심 파악, 전체 구조 이해' }
      ]
    },
    {
      id: 'strategy',
      name: '문제풀이 전략',
      icon: '⚡',
      questions: [
        { id: 1, q: '시간 배분 전략을 설명하시오.', a: '문제당 약 3분, 어려운 문제는 후순위' },
        { id: 2, q: '선지 먼저 읽기 전략을 설명하시오.', a: '문제 유형 파악 후 선지로 방향 설정' },
        { id: 3, q: '소거법 활용을 설명하시오.', a: '확실히 틀린 선지 먼저 제외' },
        { id: 4, q: 'Skimming 기법을 설명하시오.', a: '전체 내용 빠르게 훑어 읽기' },
        { id: 5, q: 'Scanning 기법을 설명하시오.', a: '특정 정보 찾아 읽기' },
        { id: 6, q: '연결어 활용법을 설명하시오.', a: 'however(역접), therefore(인과), moreover(첨가)' },
        { id: 7, q: '논리 구조 파악을 설명하시오.', a: '도입-전개-결론, 문제-해결, 비교-대조' },
        { id: 8, q: '오답 유형 분석을 설명하시오.', a: '범위 오류, 왜곡, 과장, 본문에 없는 내용' },
        { id: 9, q: '문법 문제 접근법을 설명하시오.', a: '밑줄 부분 문법 포인트 파악, 규칙 적용' },
        { id: 10, q: '모르는 문제 처리법을 설명하시오.', a: '표시 후 다음으로, 남은 시간에 재도전' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil7-english-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-english-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `7급 공채 영어 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/civil-service-7" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 7급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🌐 영어</h1>
          <p className="text-gray-600 mb-4">어휘, 문법, 독해</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-slate-500 to-gray-600 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-slate-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                  <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
                <div className="space-y-3">
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
