'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OfficeEnglishStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'phone-english',
      name: '전화영어',
      icon: '📞',
      questions: [
        { id: 1, q: '전화 받을 때 기본 표현을 설명하시오.', a: 'Good morning, ABC Company. How may I help you?' },
        { id: 2, q: '상대방 확인 표현을 설명하시오.', a: 'May I ask who is calling? / Who shall I say is calling?' },
        { id: 3, q: '전화 연결 표현을 설명하시오.', a: 'I\'ll put you through. / Let me transfer your call.' },
        { id: 4, q: '대기 요청 표현을 설명하시오.', a: 'Could you hold the line, please? / One moment, please.' },
        { id: 5, q: '부재 중 안내 표현을 설명하시오.', a: 'He\'s in a meeting. / She\'s out of the office.' },
        { id: 6, q: '메시지 전달 표현을 설명하시오.', a: 'May I take a message? / Would you like to leave a message?' },
        { id: 7, q: '전화번호 확인 표현을 설명하시오.', a: 'Could you spell that, please? / Let me confirm the number.' },
        { id: 8, q: '다시 전화 요청을 설명하시오.', a: 'Could you call back later? / He\'ll return your call.' },
        { id: 9, q: '통화 종료 표현을 설명하시오.', a: 'Thank you for calling. / Is there anything else I can help you with?' },
        { id: 10, q: '잘못 걸린 전화 응대를 설명하시오.', a: 'I\'m sorry, you have the wrong number.' }
      ]
    },
    {
      id: 'email-english',
      name: '이메일영어',
      icon: '📧',
      questions: [
        { id: 1, q: '이메일 인사말을 설명하시오.', a: 'Dear Mr./Ms., Hello, Hi (친한 경우)' },
        { id: 2, q: '이메일 목적 표현을 설명하시오.', a: 'I am writing to inquire about... / regarding...' },
        { id: 3, q: '첨부파일 안내를 설명하시오.', a: 'Please find attached... / I have attached...' },
        { id: 4, q: '회신 요청 표현을 설명하시오.', a: 'I look forward to hearing from you. / Please let me know.' },
        { id: 5, q: '감사 표현을 설명하시오.', a: 'Thank you for your prompt reply. / I appreciate your help.' },
        { id: 6, q: '사과 표현을 설명하시오.', a: 'I apologize for the inconvenience. / I\'m sorry for the delay.' },
        { id: 7, q: '요청 표현을 설명하시오.', a: 'Could you please...? / I would appreciate if you could...' },
        { id: 8, q: '이메일 마무리 표현을 설명하시오.', a: 'Best regards, Sincerely, Kind regards' },
        { id: 9, q: '긴급 안내 표현을 설명하시오.', a: 'This is urgent. / Your immediate attention is required.' },
        { id: 10, q: '참조(CC) 안내를 설명하시오.', a: 'I\'ve copied Mr. Kim on this email.' }
      ]
    },
    {
      id: 'meeting-english',
      name: '회의영어',
      icon: '🤝',
      questions: [
        { id: 1, q: '회의 시작 표현을 설명하시오.', a: 'Let\'s get started. / Shall we begin?' },
        { id: 2, q: '안건 소개 표현을 설명하시오.', a: 'Today\'s agenda is... / We\'re here to discuss...' },
        { id: 3, q: '의견 요청 표현을 설명하시오.', a: 'What do you think? / Any thoughts on this?' },
        { id: 4, q: '의견 제시 표현을 설명하시오.', a: 'In my opinion... / I think we should...' },
        { id: 5, q: '동의 표현을 설명하시오.', a: 'I agree. / That\'s a good point. / Exactly.' },
        { id: 6, q: '반대 표현을 설명하시오.', a: 'I see your point, but... / I\'m not sure about that.' },
        { id: 7, q: '정리/요약 표현을 설명하시오.', a: 'To summarize... / In conclusion...' },
        { id: 8, q: '회의 종료 표현을 설명하시오.', a: 'Let\'s wrap up. / That concludes our meeting.' },
        { id: 9, q: '후속 조치 표현을 설명하시오.', a: 'I\'ll follow up on that. / Let\'s schedule a follow-up.' },
        { id: 10, q: '화상회의 표현을 설명하시오.', a: 'Can everyone hear me? / Let me share my screen.' }
      ]
    },
    {
      id: 'visitor-english',
      name: '방문객 응대영어',
      icon: '🚶',
      questions: [
        { id: 1, q: '방문객 인사 표현을 설명하시오.', a: 'Good morning. How may I help you?' },
        { id: 2, q: '예약 확인 표현을 설명하시오.', a: 'Do you have an appointment?' },
        { id: 3, q: '안내 표현을 설명하시오.', a: 'Please follow me. / This way, please.' },
        { id: 4, q: '대기 안내 표현을 설명하시오.', a: 'Please have a seat. He\'ll be with you shortly.' },
        { id: 5, q: '음료 제공 표현을 설명하시오.', a: 'May I offer you some coffee or tea?' },
        { id: 6, q: '명함 요청 표현을 설명하시오.', a: 'May I have your business card?' },
        { id: 7, q: '회의실 안내 표현을 설명하시오.', a: 'The meeting room is on the 3rd floor.' },
        { id: 8, q: '배웅 표현을 설명하시오.', a: 'Thank you for visiting. / Let me show you out.' },
        { id: 9, q: '부재 안내 표현을 설명하시오.', a: 'I\'m afraid he\'s not available at the moment.' },
        { id: 10, q: '택시 호출 표현을 설명하시오.', a: 'Shall I call a taxi for you?' }
      ]
    },
    {
      id: 'business-letter',
      name: '영문서 작성',
      icon: '📝',
      questions: [
        { id: 1, q: '영문 비즈니스 레터 구성을 설명하시오.', a: 'Letterhead, Date, Inside Address, Salutation, Body, Closing' },
        { id: 2, q: '초대장(Invitation) 작성을 설명하시오.', a: 'We cordially invite you to... / You are invited to...' },
        { id: 3, q: '감사장(Thank-you Letter) 작성을 설명하시오.', a: 'Thank you for your kind hospitality...' },
        { id: 4, q: '축하 서신 작성을 설명하시오.', a: 'Congratulations on your promotion...' },
        { id: 5, q: '조의 서신 작성을 설명하시오.', a: 'Please accept our deepest sympathy...' },
        { id: 6, q: '조회 서신(Inquiry) 작성을 설명하시오.', a: 'We would like to inquire about...' },
        { id: 7, q: '회신 서신(Reply) 작성을 설명하시오.', a: 'In response to your inquiry...' },
        { id: 8, q: '주문 서신(Order) 작성을 설명하시오.', a: 'We would like to place an order for...' },
        { id: 9, q: '클레임 서신 작성을 설명하시오.', a: 'We regret to inform you that...' },
        { id: 10, q: '영문 메모(Memo) 작성을 설명하시오.', a: 'To, From, Date, Subject, Message' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-1-english-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-1-english-progress', JSON.stringify(updated));
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
    const prompt = `비서 1급 - 비서영어 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-1" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            ← 비서 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🌐 비서영어</h1>
          <p className="text-gray-600 mb-4">비즈니스 영어, 영문서 작성, 커뮤니케이션</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
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
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
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
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-rose-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, q.id)}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button
                                onClick={() => handleAskAI(q.q)}
                                className="mt-2 text-sm text-rose-600 hover:text-rose-800 flex items-center gap-1"
                              >
                                🤖 AI에게 자세히 물어보기
                              </button>
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
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
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
