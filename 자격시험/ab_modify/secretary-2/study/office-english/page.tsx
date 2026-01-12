'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OfficeEnglishStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'phone-english',
      name: '전화 영어',
      icon: '📞',
      questions: [
        { id: 1, q: '전화 받을 때 인사를 영어로 설명하시오.', a: 'Good morning/afternoon, [Company name]. How may I help you?' },
        { id: 2, q: '전화 연결 표현을 영어로 설명하시오.', a: 'I\'ll connect you. / Let me transfer your call.' },
        { id: 3, q: '대기 요청 표현을 영어로 설명하시오.', a: 'Could you hold on, please? / One moment, please.' },
        { id: 4, q: '부재중 안내를 영어로 설명하시오.', a: 'He\'s not available. / She\'s in a meeting.' },
        { id: 5, q: '메시지 접수를 영어로 설명하시오.', a: 'May I take a message? / Would you like to leave a message?' },
        { id: 6, q: '전화번호 확인을 영어로 설명하시오.', a: 'May I have your phone number? / Let me confirm...' },
        { id: 7, q: '다시 전화 요청을 영어로 설명하시오.', a: 'Could you call back later? / He\'ll return your call.' },
        { id: 8, q: '잘못 걸린 전화를 영어로 설명하시오.', a: 'I\'m sorry, you have the wrong number.' },
        { id: 9, q: '통화 종료를 영어로 설명하시오.', a: 'Thank you for calling. Have a nice day.' },
        { id: 10, q: '상대방 이름 확인을 영어로 설명하시오.', a: 'May I ask who\'s calling? / Could you spell your name?' }
      ]
    },
    {
      id: 'email-english',
      name: '이메일 영어',
      icon: '📧',
      questions: [
        { id: 1, q: '이메일 인사말을 영어로 설명하시오.', a: 'Dear Mr./Ms. [Name], Hello, Hi (informal)' },
        { id: 2, q: '이메일 시작 표현을 영어로 설명하시오.', a: 'I am writing to... / I would like to...' },
        { id: 3, q: '첨부파일 안내를 영어로 설명하시오.', a: 'Please find attached... / I have attached...' },
        { id: 4, q: '회신 요청을 영어로 설명하시오.', a: 'Please let me know. / I look forward to hearing from you.' },
        { id: 5, q: '감사 표현을 영어로 설명하시오.', a: 'Thank you for your help. / I appreciate your assistance.' },
        { id: 6, q: '사과 표현을 영어로 설명하시오.', a: 'I apologize for... / I\'m sorry for the inconvenience.' },
        { id: 7, q: '요청 표현을 영어로 설명하시오.', a: 'Could you please...? / Would you mind...?' },
        { id: 8, q: '이메일 마무리를 영어로 설명하시오.', a: 'Best regards, Sincerely, Kind regards' },
        { id: 9, q: '확인 요청을 영어로 설명하시오.', a: 'Please confirm... / Could you verify...?' },
        { id: 10, q: '참조 안내를 영어로 설명하시오.', a: 'I\'ve copied [Name] on this email.' }
      ]
    },
    {
      id: 'visitor-english',
      name: '방문객 응대 영어',
      icon: '🚶',
      questions: [
        { id: 1, q: '방문객 인사를 영어로 설명하시오.', a: 'Good morning. How may I help you?' },
        { id: 2, q: '예약 확인을 영어로 설명하시오.', a: 'Do you have an appointment?' },
        { id: 3, q: '안내 표현을 영어로 설명하시오.', a: 'Please follow me. / This way, please.' },
        { id: 4, q: '대기 안내를 영어로 설명하시오.', a: 'Please have a seat. He\'ll be with you shortly.' },
        { id: 5, q: '음료 제공을 영어로 설명하시오.', a: 'Would you like something to drink? Coffee or tea?' },
        { id: 6, q: '명함 요청을 영어로 설명하시오.', a: 'May I have your business card?' },
        { id: 7, q: '담당자 부재를 영어로 설명하시오.', a: 'I\'m afraid he\'s not available at the moment.' },
        { id: 8, q: '배웅 표현을 영어로 설명하시오.', a: 'Thank you for visiting. Let me show you out.' },
        { id: 9, q: '회의실 안내를 영어로 설명하시오.', a: 'The meeting room is on the third floor.' },
        { id: 10, q: '택시 호출을 영어로 설명하시오.', a: 'Shall I call a taxi for you?' }
      ]
    },
    {
      id: 'meeting-english',
      name: '회의 영어',
      icon: '🤝',
      questions: [
        { id: 1, q: '회의 시작을 영어로 설명하시오.', a: 'Let\'s get started. / Shall we begin?' },
        { id: 2, q: '안건 소개를 영어로 설명하시오.', a: 'Today\'s agenda is... / We\'re here to discuss...' },
        { id: 3, q: '의견 요청을 영어로 설명하시오.', a: 'What do you think? / Any thoughts?' },
        { id: 4, q: '동의 표현을 영어로 설명하시오.', a: 'I agree. / That\'s a good point.' },
        { id: 5, q: '반대 표현을 영어로 설명하시오.', a: 'I\'m not sure about that. / I see your point, but...' },
        { id: 6, q: '요약 표현을 영어로 설명하시오.', a: 'To summarize... / In conclusion...' },
        { id: 7, q: '회의 종료를 영어로 설명하시오.', a: 'That concludes our meeting. / Let\'s wrap up.' },
        { id: 8, q: '다음 회의 안내를 영어로 설명하시오.', a: 'The next meeting will be on...' },
        { id: 9, q: '질문 요청을 영어로 설명하시오.', a: 'Any questions? / Do you have any questions?' },
        { id: 10, q: '감사 표현을 영어로 설명하시오.', a: 'Thank you for your time. / Thank you for joining.' }
      ]
    },
    {
      id: 'basic-expressions',
      name: '기본 표현',
      icon: '💬',
      questions: [
        { id: 1, q: '자기소개를 영어로 설명하시오.', a: 'I\'m [Name], secretary to Mr./Ms. [Boss].' },
        { id: 2, q: '감사 인사를 영어로 설명하시오.', a: 'Thank you very much. / I really appreciate it.' },
        { id: 3, q: '양해 구하기를 영어로 설명하시오.', a: 'Excuse me. / I\'m sorry to bother you.' },
        { id: 4, q: '부탁 표현을 영어로 설명하시오.', a: 'Could you do me a favor? / Would you mind...?' },
        { id: 5, q: '거절 표현을 영어로 설명하시오.', a: 'I\'m afraid I can\'t. / Unfortunately, it\'s not possible.' },
        { id: 6, q: '확인 표현을 영어로 설명하시오.', a: 'Is that correct? / Did I understand correctly?' },
        { id: 7, q: '반복 요청을 영어로 설명하시오.', a: 'Could you repeat that? / I\'m sorry, I didn\'t catch that.' },
        { id: 8, q: '천천히 말해달라고 영어로 설명하시오.', a: 'Could you speak more slowly, please?' },
        { id: 9, q: '이해 확인을 영어로 설명하시오.', a: 'Do you understand? / Is that clear?' },
        { id: 10, q: '작별 인사를 영어로 설명하시오.', a: 'Goodbye. Have a nice day. / See you later.' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-2-english-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-2-english-progress', JSON.stringify(updated));
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
    const prompt = `비서 2급 - 사무영어 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-2" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            ← 비서 2급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🌐 사무영어</h1>
          <p className="text-gray-600 mb-4">기초 비즈니스 영어, 전화/이메일 표현</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-pink-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-pink-600 hover:text-pink-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
