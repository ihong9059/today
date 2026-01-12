'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OfficeMannerStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'greeting',
      name: '인사예절',
      icon: '🙇',
      questions: [
        { id: 1, q: '인사의 종류를 설명하시오.', a: '목례(15도), 보통례(30도), 정중례(45도)' },
        { id: 2, q: '목례의 상황을 설명하시오.', a: '복도에서 스쳐지나갈 때, 가벼운 인사' },
        { id: 3, q: '보통례의 상황을 설명하시오.', a: '일반적인 인사, 출퇴근 시' },
        { id: 4, q: '정중례의 상황을 설명하시오.', a: 'VIP 응대, 사과할 때, 깊은 감사' },
        { id: 5, q: '악수 예절을 설명하시오.', a: '상대방이 먼저 손을 내밀면 응함, 바른 자세' },
        { id: 6, q: '명함 교환 순서를 설명하시오.', a: '하급자가 먼저, 양손으로 주고받기' },
        { id: 7, q: '명함 보관법을 설명하시오.', a: '명함지갑에 정리, 바로 주머니에 넣지 않음' },
        { id: 8, q: '소개 순서를 설명하시오.', a: '하급자→상급자, 내부인→외부인 순' },
        { id: 9, q: '자기소개 방법을 설명하시오.', a: '소속, 직위, 이름 순서로 간결하게' },
        { id: 10, q: '배웅 예절을 설명하시오.', a: '엘리베이터/현관까지 배웅, 마지막 인사' }
      ]
    },
    {
      id: 'phone-manner',
      name: '전화예절',
      icon: '📞',
      questions: [
        { id: 1, q: '전화 받는 시점을 설명하시오.', a: '벨 3회 이내에 받기' },
        { id: 2, q: '전화 받는 인사를 설명하시오.', a: '"감사합니다. OO회사 OOO입니다"' },
        { id: 3, q: '전화 연결 멘트를 설명하시오.', a: '"잠시만 기다려 주십시오. 연결해 드리겠습니다"' },
        { id: 4, q: '부재중 안내를 설명하시오.', a: '"현재 자리에 안 계십니다. 메모 남겨드릴까요?"' },
        { id: 5, q: '메모 전달 요령을 설명하시오.', a: '발신자, 용건, 시간, 연락처 기록' },
        { id: 6, q: '전화 종료 예절을 설명하시오.', a: '상대방이 먼저 끊은 후 수화기 내려놓기' },
        { id: 7, q: '전화 보류 예절을 설명하시오.', a: '보류 전 양해 구하기, 오래 걸리면 다시 연락' },
        { id: 8, q: '전화 메모 양식을 설명하시오.', a: '일시, 발신자, 용건, 회신여부, 수신자' },
        { id: 9, q: '잘못 걸려온 전화 대응을 설명하시오.', a: '"죄송합니다. 전화 잘못 거셨습니다"' },
        { id: 10, q: '전화 걸 때 준비사항을 설명하시오.', a: '용건정리, 상대방 확인, 적절한 시간' }
      ]
    },
    {
      id: 'visitor-manner',
      name: '방문객 응대',
      icon: '🚶',
      questions: [
        { id: 1, q: '방문객 맞이 순서를 설명하시오.', a: '일어서기 → 인사 → 용건확인 → 안내' },
        { id: 2, q: '예약 확인 멘트를 설명하시오.', a: '"어떤 분과 약속이 있으신가요?"' },
        { id: 3, q: '안내 시 위치를 설명하시오.', a: '손님 2~3보 앞에서 안내, 문은 먼저 열기' },
        { id: 4, q: '대기 안내를 설명하시오.', a: '"잠시만 기다려 주십시오. 곧 모시겠습니다"' },
        { id: 5, q: '음료 제공 예절을 설명하시오.', a: '선택권 제공, 오른쪽에서 서빙' },
        { id: 6, q: '상석 위치를 설명하시오.', a: '출입문에서 먼 쪽, 창가 쪽이 상석' },
        { id: 7, q: '담당자 부재 시 대응을 설명하시오.', a: '사과, 대안 제시, 연락 약속' },
        { id: 8, q: '명함 받는 법을 설명하시오.', a: '양손으로, 읽어본 후 테이블에 놓기' },
        { id: 9, q: '엘리베이터 예절을 설명하시오.', a: '손님 먼저 타고 내리게 함' },
        { id: 10, q: '배웅 예절을 설명하시오.', a: '현관/엘리베이터까지 배웅, 감사인사' }
      ]
    },
    {
      id: 'appearance',
      name: '복장/용모',
      icon: '👔',
      questions: [
        { id: 1, q: '비서 복장의 기본을 설명하시오.', a: '단정함, 청결함, TPO에 맞게' },
        { id: 2, q: 'TPO의 의미를 설명하시오.', a: 'Time(시간), Place(장소), Occasion(상황)' },
        { id: 3, q: '정장 착용법을 설명하시오.', a: '맞는 사이즈, 구김 없이, 적절한 색상' },
        { id: 4, q: '액세서리 착용을 설명하시오.', a: '과하지 않게, 단정하게' },
        { id: 5, q: '구두 관리를 설명하시오.', a: '깨끗이 닦기, 굽 높이 적절하게' },
        { id: 6, q: '머리 정리를 설명하시오.', a: '단정하게, 흐트러지지 않게' },
        { id: 7, q: '화장 예절을 설명하시오.', a: '자연스럽게, 진한 화장 자제' },
        { id: 8, q: '손/손톱 관리를 설명하시오.', a: '깨끗하게, 손톱은 짧게' },
        { id: 9, q: '향수 사용법을 설명하시오.', a: '은은하게, 과하지 않게' },
        { id: 10, q: '신체 청결 유지를 설명하시오.', a: '구취, 체취 관리, 개인위생' }
      ]
    },
    {
      id: 'language-manner',
      name: '언어예절',
      icon: '💬',
      questions: [
        { id: 1, q: '경어 사용법을 설명하시오.', a: '상대방에 맞는 존칭 사용' },
        { id: 2, q: '쿠션어의 의미를 설명하시오.', a: '부드럽게 전달하기 위한 완충어' },
        { id: 3, q: '쿠션어 예시를 설명하시오.', a: '"죄송합니다만", "실례지만", "혹시"' },
        { id: 4, q: '긍정적 화법을 설명하시오.', a: '"안 됩니다" → "~해 주시면 가능합니다"' },
        { id: 5, q: '호칭 사용법을 설명하시오.', a: '직위+님, OOO님' },
        { id: 6, q: '경청의 중요성을 설명하시오.', a: '상대방 말 끝까지 듣기, 공감 표현' },
        { id: 7, q: '질문 요령을 설명하시오.', a: '명확하게, 정중하게' },
        { id: 8, q: '거절 화법을 설명하시오.', a: '사과 → 이유 설명 → 대안 제시' },
        { id: 9, q: '보고 화법을 설명하시오.', a: '결론부터, 간결하게, 정확하게' },
        { id: 10, q: '전화 화법의 특징을 설명하시오.', a: '밝고 명확하게, 적절한 속도로' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-3-manner-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-3-manner-progress', JSON.stringify(updated));
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
    const prompt = `비서 3급 - 사무매너 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-3" className="text-violet-600 hover:text-violet-800 flex items-center gap-2">
            ← 비서 3급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎀 사무매너</h1>
          <p className="text-gray-600 mb-4">인사, 전화, 방문객 응대, 예절</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-violet-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-violet-600 hover:text-violet-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
