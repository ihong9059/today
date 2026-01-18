'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function KoreanStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'grammar',
      name: '문법',
      icon: '📖',
      questions: [
        { id: 1, q: '품사의 종류를 설명하시오.', a: '명사, 대명사, 수사, 동사, 형용사, 관형사, 부사, 조사, 감탄사' },
        { id: 2, q: '문장 성분을 설명하시오.', a: '주어, 서술어, 목적어, 보어, 관형어, 부사어, 독립어' },
        { id: 3, q: '문장의 종류를 설명하시오.', a: '홑문장, 겹문장(안은문장, 이어진문장)' },
        { id: 4, q: '피동과 사동을 설명하시오.', a: '피동: 주어가 동작 받음 / 사동: 주어가 시킴' },
        { id: 5, q: '높임법의 종류를 설명하시오.', a: '주체높임, 객체높임, 상대높임' },
        { id: 6, q: '시제의 종류를 설명하시오.', a: '과거(-었-), 현재(-ㄴ/는-), 미래(-겠-/-ㄹ-)' },
        { id: 7, q: '형태소의 종류를 설명하시오.', a: '자립/의존, 실질/형식 형태소' },
        { id: 8, q: '단어 형성법을 설명하시오.', a: '파생어(접사+어근), 합성어(어근+어근)' },
        { id: 9, q: '음운 변동을 설명하시오.', a: '교체, 탈락, 첨가, 축약' },
        { id: 10, q: '띄어쓰기 원칙을 설명하시오.', a: '문장 각 단어는 띄어 씀, 조사는 붙여씀' }
      ]
    },
    {
      id: 'spelling',
      name: '맞춤법/표준어',
      icon: '✏️',
      questions: [
        { id: 1, q: '사이시옷 규칙을 설명하시오.', a: '합성어에서 앞말 모음+뒷말 된소리 시 사이시옷' },
        { id: 2, q: '두음법칙을 설명하시오.', a: '어두에서 ㄴ,ㄹ→ㅇ/ㄴ, 례→예, 녀→여' },
        { id: 3, q: '-데와 -대의 구분을 설명하시오.', a: '-데: 회상 / -대: 전달(~다고 해)' },
        { id: 4, q: '-로서와 -로써의 구분을 설명하시오.', a: '-로서: 자격 / -로써: 수단·도구' },
        { id: 5, q: '붙여쓰기 예외를 설명하시오.', a: '의존명사, 단위명사, 열거 순서 등' },
        { id: 6, q: '표준어와 비표준어를 설명하시오.', a: '표준어 규정에 따른 올바른 표현 구분' },
        { id: 7, q: '외래어 표기법을 설명하시오.', a: '외래어 한글 표기 원칙, 된소리 제한' },
        { id: 8, q: '로마자 표기법을 설명하시오.', a: '국어의 로마자 표기 원칙' },
        { id: 9, q: '겹받침 발음을 설명하시오.', a: 'ㄳ→ㄱ, ㄵ→ㄴ, ㄶ→ㄴ 등 발음 규칙' },
        { id: 10, q: '문장부호 사용법을 설명하시오.', a: '마침표, 쉼표, 따옴표, 괄호 등 용법' }
      ]
    },
    {
      id: 'vocabulary',
      name: '어휘',
      icon: '📚',
      questions: [
        { id: 1, q: '유의어와 반의어를 설명하시오.', a: '유의어: 비슷한 뜻 / 반의어: 반대 뜻' },
        { id: 2, q: '동음이의어를 설명하시오.', a: '소리는 같으나 뜻이 다른 단어' },
        { id: 3, q: '다의어를 설명하시오.', a: '하나의 단어가 여러 의미를 가짐' },
        { id: 4, q: '관용어를 설명하시오.', a: '둘 이상 단어가 합쳐져 특별한 의미를 가짐' },
        { id: 5, q: '속담의 특징을 설명하시오.', a: '민중의 지혜를 담은 교훈적 표현' },
        { id: 6, q: '한자어의 특징을 설명하시오.', a: '한자에서 유래한 어휘, 조어력이 강함' },
        { id: 7, q: '고유어의 특징을 설명하시오.', a: '순우리말, 정서적 표현력이 풍부' },
        { id: 8, q: '외래어와 외국어를 설명하시오.', a: '외래어: 국어화된 것 / 외국어: 그렇지 않은 것' },
        { id: 9, q: '전문용어를 설명하시오.', a: '특정 분야에서 사용하는 전문적 어휘' },
        { id: 10, q: '신어와 유행어를 설명하시오.', a: '새로 생긴 말, 일시적으로 유행하는 말' }
      ]
    },
    {
      id: 'reading',
      name: '독해',
      icon: '📄',
      questions: [
        { id: 1, q: '주제 파악 방법을 설명하시오.', a: '핵심어, 반복어, 결론부 확인' },
        { id: 2, q: '글의 구조 파악 방법을 설명하시오.', a: '서론-본론-결론, 두괄식/미괄식/양괄식' },
        { id: 3, q: '추론 문제 접근법을 설명하시오.', a: '명시적 정보에서 논리적으로 도출' },
        { id: 4, q: '내용 일치/불일치 문제를 설명하시오.', a: '선지와 본문 대조, 변형/왜곡 확인' },
        { id: 5, q: '빈칸 추론 방법을 설명하시오.', a: '앞뒤 문맥, 접속어, 논리 흐름 활용' },
        { id: 6, q: '글의 목적 파악을 설명하시오.', a: '설득, 정보전달, 친교, 정서표현 등' },
        { id: 7, q: '문단 배열 방법을 설명하시오.', a: '지시어, 접속어, 시간/논리 순서 활용' },
        { id: 8, q: '필자의 관점 파악을 설명하시오.', a: '평가적 표현, 강조 어구 주목' },
        { id: 9, q: '비문학 독해 전략을 설명하시오.', a: '핵심 개념, 논증 구조, 사례 파악' },
        { id: 10, q: '문학 독해 전략을 설명하시오.', a: '주제, 화자/서술자, 표현기법 분석' }
      ]
    },
    {
      id: 'writing',
      name: '작문/화법',
      icon: '✍️',
      questions: [
        { id: 1, q: '글쓰기 과정을 설명하시오.', a: '계획-내용생성-조직-표현-고쳐쓰기' },
        { id: 2, q: '논증의 방법을 설명하시오.', a: '연역, 귀납, 유추, 인과 논증' },
        { id: 3, q: '설명의 방법을 설명하시오.', a: '정의, 예시, 비교대조, 분류, 분석' },
        { id: 4, q: '문장의 오류 유형을 설명하시오.', a: '호응 오류, 중의성, 비문, 어색한 표현' },
        { id: 5, q: '고쳐쓰기 원리를 설명하시오.', a: '명확성, 간결성, 적절성, 통일성' },
        { id: 6, q: '담화의 원리를 설명하시오.', a: '협력원리(양, 질, 관련성, 태도)' },
        { id: 7, q: '말하기 전략을 설명하시오.', a: '청자분석, 내용조직, 표현, 전달' },
        { id: 8, q: '듣기 전략을 설명하시오.', a: '핵심파악, 추론, 평가적 듣기' },
        { id: 9, q: '토론의 형식을 설명하시오.', a: '논제, 입론, 반론, 최종발언' },
        { id: 10, q: '협상의 전략을 설명하시오.', a: '상호 이익 추구, 양보와 조정' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil7-korean-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-korean-progress', JSON.stringify(updated));
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
    const prompt = `7급 공채 국어 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📝 국어</h1>
          <p className="text-gray-600 mb-4">문법, 어휘, 독해, 작문</p>
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
