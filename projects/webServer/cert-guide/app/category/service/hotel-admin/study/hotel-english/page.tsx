'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HotelEnglishStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '예약 표현', count: 10 },
    { id: 1, name: '체크인/아웃', count: 10 },
    { id: 2, name: '안내 표현', count: 10 },
    { id: 3, name: '불만 응대', count: 10 },
    { id: 4, name: '전화 영어', count: 10 },
  ];

  const questions = [
    // 예약 표현 (10문항)
    { id: 1, topic: 0, question: "\"I'd like to make a reservation for two nights.\"의 적절한 응답은?", options: ["Certainly, what dates would you prefer?", "We don't have rooms.", "Please wait outside.", "Come back tomorrow."], answer: 0 },
    { id: 2, topic: 0, question: "예약 확인 시 \"Could you spell your name, please?\" 다음 적절한 표현은?", options: ["No, I can't.", "It's K-I-M.", "What name?", "I don't know."], answer: 1 },
    { id: 3, topic: 0, question: "\"Do you have any vacancies for this weekend?\"의 의미는?", options: ["이번 주말 식사 예약", "이번 주말 빈 객실 여부", "이번 주말 행사 문의", "이번 주말 체크아웃"], answer: 1 },
    { id: 4, topic: 0, question: "예약 변경 요청 시 적절한 표현은?", options: ["I want to change everything.", "I'd like to modify my reservation.", "Change it now.", "Do something."], answer: 1 },
    { id: 5, topic: 0, question: "\"What type of room would you prefer?\"의 적절한 응답은?", options: ["A twin room, please.", "I don't care.", "Any room.", "Whatever."], answer: 0 },
    { id: 6, topic: 0, question: "예약 취소 시 정중한 표현은?", options: ["Cancel my room!", "I'd like to cancel my reservation, please.", "I don't want it.", "Forget it."], answer: 1 },
    { id: 7, topic: 0, question: "\"How long will you be staying?\"의 적절한 응답은?", options: ["Very long.", "Three nights.", "I'm not sure if I want to stay.", "Maybe."], answer: 1 },
    { id: 8, topic: 0, question: "예약 확정 시 \"Your reservation is confirmed.\" 다음 말은?", options: ["Your confirmation number is...", "Good luck.", "See you.", "Bye."], answer: 0 },
    { id: 9, topic: 0, question: "\"Is breakfast included?\"의 의미는?", options: ["조식 메뉴 문의", "조식 포함 여부", "조식 시간 문의", "조식 취소"], answer: 1 },
    { id: 10, topic: 0, question: "그룹 예약 시 \"We need a block of 10 rooms.\"의 'block'은?", options: ["건물 블록", "일괄 예약", "방해물", "차단"], answer: 1 },

    // 체크인/아웃 (10문항)
    { id: 11, topic: 1, question: "체크인 시 \"May I see your ID, please?\"의 적절한 응답은?", options: ["No way.", "Here you are.", "I forgot it at home.", "Why do you need it?"], answer: 1 },
    { id: 12, topic: 1, question: "\"How would you like to pay?\"의 의미는?", options: ["얼마입니까?", "결제 방법 문의", "할인 가능한가요?", "영수증 필요한가요?"], answer: 1 },
    { id: 13, topic: 1, question: "객실 키 전달 시 적절한 표현은?", options: ["Take this.", "Here is your room key. Your room is on the 5th floor.", "Go up.", "Find it yourself."], answer: 1 },
    { id: 14, topic: 1, question: "\"Could you fill out this registration form?\"에서 'fill out'의 의미는?", options: ["채우다(작성하다)", "버리다", "접다", "찢다"], answer: 0 },
    { id: 15, topic: 1, question: "체크아웃 시 \"Did you enjoy your stay?\"의 적절한 응답은?", options: ["I don't know.", "Yes, it was wonderful. Thank you.", "Not your business.", "Maybe."], answer: 1 },
    { id: 16, topic: 1, question: "\"I'd like to check out.\"의 응답으로 적절한 것은?", options: ["Wait.", "Certainly. May I have your room number?", "Later.", "Why?"], answer: 1 },
    { id: 17, topic: 1, question: "미니바 이용 확인 시 적절한 표현은?", options: ["Did you eat anything?", "Did you use anything from the minibar?", "What did you take?", "Pay for everything."], answer: 1 },
    { id: 18, topic: 1, question: "\"Could you call a taxi for me?\"의 의미는?", options: ["택시 요금 문의", "택시 호출 요청", "택시 회사 문의", "택시 불만"], answer: 1 },
    { id: 19, topic: 1, question: "레이트 체크아웃 요청 시 적절한 표현은?", options: ["I want to stay more.", "Would it be possible to have a late check-out?", "Don't kick me out.", "I'm not leaving."], answer: 1 },
    { id: 20, topic: 1, question: "\"Your total comes to $250.\"의 'comes to'는?", options: ["오다", "합계가 ~이다", "가다", "변하다"], answer: 1 },

    // 안내 표현 (10문항)
    { id: 21, topic: 2, question: "호텔 시설 안내 시 \"The fitness center is on the 3rd floor.\"의 적절한 추가 안내는?", options: ["Go find it.", "It's open from 6 AM to 10 PM.", "I don't know more.", "That's it."], answer: 1 },
    { id: 22, topic: 2, question: "\"Where can I find the business center?\"의 적절한 응답은?", options: ["Somewhere.", "It's located on the 2nd floor, next to the lobby.", "I'm not sure.", "Look around."], answer: 1 },
    { id: 23, topic: 2, question: "조식당 안내 시 적절한 표현은?", options: ["Breakfast is served in the restaurant on the 1st floor from 7 to 10 AM.", "Eat whenever.", "Find the restaurant.", "Just go down."], answer: 0 },
    { id: 24, topic: 2, question: "\"Is there a swimming pool?\"의 적절한 응답은?", options: ["Maybe.", "Yes, it's on the rooftop. Here's a pool pass.", "I don't swim.", "No pool."], answer: 1 },
    { id: 25, topic: 2, question: "와이파이 안내 시 적절한 표현은?", options: ["Find it yourself.", "The WiFi password is on this card. It's complimentary.", "No internet.", "Use data."], answer: 1 },
    { id: 26, topic: 2, question: "\"How do I get to the nearest subway station?\"의 적절한 응답은?", options: ["Walk.", "Turn left at the main entrance and walk about 5 minutes.", "I don't know.", "Take a taxi."], answer: 1 },
    { id: 27, topic: 2, question: "룸서비스 안내 시 \"Room service is available 24 hours.\"의 추가 안내는?", options: ["That's all.", "Here's the menu. Just dial 0 to order.", "Order online.", "No more info."], answer: 1 },
    { id: 28, topic: 2, question: "\"Could you recommend a good restaurant nearby?\"의 적절한 응답은?", options: ["Find one.", "There's an excellent Korean restaurant just 2 blocks away.", "I don't eat out.", "Google it."], answer: 1 },
    { id: 29, topic: 2, question: "주차 안내 시 적절한 표현은?", options: ["Valet parking is available at the main entrance for $20 per day.", "Park somewhere.", "No parking.", "Find a spot."], answer: 0 },
    { id: 30, topic: 2, question: "\"What time is check-out?\"의 적절한 응답은?", options: ["Whenever.", "Check-out time is 11 AM.", "I don't remember.", "Ask later."], answer: 1 },

    // 불만 응대 (10문항)
    { id: 31, topic: 3, question: "고객 불만 시 첫 응대로 적절한 표현은?", options: ["What's your problem?", "I'm so sorry to hear that. Let me help you.", "That's not my fault.", "Calm down."], answer: 1 },
    { id: 32, topic: 3, question: "\"The air conditioner isn't working.\"의 적절한 응답은?", options: ["Too bad.", "I apologize for the inconvenience. I'll send maintenance right away.", "Open the window.", "It's fine."], answer: 1 },
    { id: 33, topic: 3, question: "객실 청소 불만 시 적절한 응대는?", options: ["It looks clean to me.", "I sincerely apologize. I'll have housekeeping come immediately.", "Clean it yourself.", "That's impossible."], answer: 1 },
    { id: 34, topic: 3, question: "소음 불만 \"It's too noisy.\"의 적절한 응답은?", options: ["Use earplugs.", "I'm very sorry. Would you like me to move you to a quieter room?", "It's not loud.", "That's normal."], answer: 1 },
    { id: 35, topic: 3, question: "\"I'd like to speak to the manager.\"의 적절한 응답은?", options: ["The manager is busy.", "Certainly, I'll get the manager for you right away.", "Why?", "I can help you."], answer: 1 },
    { id: 36, topic: 3, question: "청구서 오류 불만 시 적절한 응대는?", options: ["Check it yourself.", "I apologize for the error. Let me review your bill immediately.", "It's correct.", "Pay first, complain later."], answer: 1 },
    { id: 37, topic: 3, question: "\"The room is not what I booked.\"의 적절한 응답은?", options: ["It's the same.", "I'm terribly sorry. Let me check and arrange the correct room for you.", "Accept it.", "No other rooms."], answer: 1 },
    { id: 38, topic: 3, question: "보상 제안 시 적절한 표현은?", options: ["Take it or leave it.", "As a gesture of apology, we'd like to offer you a complimentary dinner.", "No compensation.", "It's policy."], answer: 1 },
    { id: 39, topic: 3, question: "고객 불만 해결 후 적절한 마무리 표현은?", options: ["Finally.", "Is there anything else I can help you with?", "Don't complain again.", "Bye."], answer: 1 },
    { id: 40, topic: 3, question: "\"I'm very disappointed with the service.\"의 적절한 응답은?", options: ["Sorry you feel that way.", "I sincerely apologize. We value your feedback and will improve.", "Our service is fine.", "Not my problem."], answer: 1 },

    // 전화 영어 (10문항)
    { id: 41, topic: 4, question: "전화 응대 시 첫 인사로 적절한 표현은?", options: ["Hello?", "Good morning, Grand Hotel. How may I help you?", "Who is this?", "What do you want?"], answer: 1 },
    { id: 42, topic: 4, question: "전화 연결 시 \"One moment, please. I'll transfer your call.\"의 'transfer'는?", options: ["끊다", "연결하다", "기다리다", "거절하다"], answer: 1 },
    { id: 43, topic: 4, question: "전화로 예약 확인 시 적절한 표현은?", options: ["What's your name again?", "May I have your name and reservation date, please?", "When did you book?", "Do you have a reservation?"], answer: 1 },
    { id: 44, topic: 4, question: "\"Could you hold the line, please?\"의 의미는?", options: ["전화를 끊어주세요", "잠시 기다려 주세요", "다시 전화해 주세요", "메시지를 남겨주세요"], answer: 1 },
    { id: 45, topic: 4, question: "부재 시 메시지 남기기 적절한 표현은?", options: ["Leave a message.", "Would you like to leave a message?", "Call back later.", "They're not here."], answer: 1 },
    { id: 46, topic: 4, question: "전화 끊기 전 적절한 마무리 표현은?", options: ["Bye.", "Thank you for calling Grand Hotel. Have a great day.", "OK.", "Done."], answer: 1 },
    { id: 47, topic: 4, question: "\"I'm calling to confirm my reservation.\"의 적절한 응답은?", options: ["OK.", "Certainly. May I have your confirmation number?", "What reservation?", "Hold on."], answer: 1 },
    { id: 48, topic: 4, question: "전화 상태 불량 시 적절한 표현은?", options: ["I can't hear you. Speak louder!", "I'm sorry, the line is not clear. Could you repeat that?", "What?", "Bad connection."], answer: 1 },
    { id: 49, topic: 4, question: "웨이크업 콜 요청 \"I'd like a wake-up call at 6 AM.\"의 응답은?", options: ["Set your alarm.", "Certainly, I'll arrange a wake-up call for 6 AM. Is that for room 305?", "Wake up yourself.", "OK."], answer: 1 },
    { id: 50, topic: 4, question: "전화로 컨시어지 서비스 연결 요청 시 적절한 응답은?", options: ["Find the number.", "Certainly, I'll connect you to the concierge. Please hold.", "What do you need?", "Call them directly."], answer: 1 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('hotel-admin-english-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('hotel-admin-english-answers', JSON.stringify(newAnswers));
  };

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.answer).length;

  const openAIModal = (question: string) => { setCurrentQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-admin" className="text-rose-600 hover:text-rose-800 font-medium">← 호텔관리사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🗣️ 호텔영어 학습</h1>
          <p className="text-gray-500">호텔 상황별 영어 표현 50문항</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <span className="text-rose-700 font-medium">진행률: {correctCount}/50</span>
            <div className="w-32 h-2 bg-rose-200 rounded-full"><div className="h-full bg-rose-600 rounded-full transition-all" style={{ width: `${(correctCount / 50) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === null ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-rose-50'}`}>전체 ({questions.length})</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === topic.id ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-rose-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{topics[q.topic].name}</span>
                <span className="text-gray-400 text-sm">#{q.id}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>
              <div className="grid gap-2">
                {q.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(q.id, index)} className={`p-3 rounded-xl text-left transition ${userAnswers[q.id] === index ? index === q.answer ? 'bg-green-100 border-2 border-green-500 text-green-700' : 'bg-red-100 border-2 border-red-500 text-red-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    <span className="font-medium mr-2">{index + 1}.</span>{option}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} className="text-rose-600 hover:text-rose-800 text-sm font-medium">
                  {showAnswer === q.id ? '해설 닫기' : '해설 보기'}
                </button>
                <button onClick={() => openAIModal(q.question)} className="text-pink-600 hover:text-pink-800 text-sm font-medium ml-4">AI에게 질문</button>
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-rose-50 rounded-xl">
                  <p className="text-rose-800"><strong>정답:</strong> {q.answer + 1}번 - {q.options[q.answer]}</p>
                  <p className="text-rose-600 text-sm mt-1">호텔 영어에서는 정중하고 전문적인 표현이 중요합니다.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 text-sm mb-4 p-3 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 이 호텔영어 표현에 대해 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 이 호텔영어 표현에 대해 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 이 호텔영어 표현에 대해 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
