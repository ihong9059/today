'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TourEnglishStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '관광 기본 회화', count: 10 },
    { id: 1, name: '문화유산 설명', count: 10 },
    { id: 2, name: '음식·쇼핑 안내', count: 10 },
    { id: 3, name: '교통·숙박 안내', count: 10 },
    { id: 4, name: '상황별 대응', count: 10 },
  ];

  const questions = [
    // 관광 기본 회화 (10문항)
    { id: 1, topic: 0, question: "'관광통역안내사'를 영어로 표현하면?", options: ["Tour Driver", "Tour Guide Interpreter", "Travel Agent", "Hotel Staff"], answer: 1 },
    { id: 2, topic: 0, question: "'한국에 오신 것을 환영합니다'를 영어로?", options: ["Welcome to Korea", "Goodbye Korea", "Hello Korea", "Thank Korea"], answer: 0 },
    { id: 3, topic: 0, question: "관광객에게 일정을 안내할 때 적절한 표현은?", options: ["You must follow", "Let me explain today's itinerary", "Do whatever you want", "I don't know"], answer: 1 },
    { id: 4, topic: 0, question: "'자유시간을 드리겠습니다'의 영어 표현은?", options: ["No free time", "You will have some free time", "Work time now", "Sleep time"], answer: 1 },
    { id: 5, topic: 0, question: "'질문 있으시면 말씀해 주세요'의 영어 표현은?", options: ["No questions", "Please feel free to ask questions", "Be quiet", "Don't ask"], answer: 1 },
    { id: 6, topic: 0, question: "'버스로 돌아올 시간은 3시입니다'의 영어 표현은?", options: ["Bus at 3", "Please be back at the bus by 3 o'clock", "No bus", "Bus gone"], answer: 1 },
    { id: 7, topic: 0, question: "'여기가 우리의 첫 번째 목적지입니다'의 영어 표현은?", options: ["Last stop", "This is our first destination", "We are lost", "End of tour"], answer: 1 },
    { id: 8, topic: 0, question: "'사진 찍으셔도 됩니다'의 영어 표현은?", options: ["No photos", "You may take pictures here", "Camera broken", "Delete photos"], answer: 1 },
    { id: 9, topic: 0, question: "'주의하세요, 바닥이 미끄럽습니다'의 영어 표현은?", options: ["Run fast", "Please be careful, the floor is slippery", "No warning", "Jump"], answer: 1 },
    { id: 10, topic: 0, question: "'투어를 마치겠습니다'의 영어 표현은?", options: ["Start tour", "This concludes our tour", "Continue forever", "No end"], answer: 1 },

    // 문화유산 설명 (10문항)
    { id: 11, topic: 1, question: "'경복궁은 조선시대에 지어졌습니다'를 영어로?", options: ["Gyeongbokgung was built in the Goryeo Dynasty", "Gyeongbokgung was built during the Joseon Dynasty", "Gyeongbokgung is modern", "Gyeongbokgung is a church"], answer: 1 },
    { id: 12, topic: 1, question: "'세계문화유산'을 영어로?", options: ["World Heritage Site", "Local Museum", "National Park", "City Hall"], answer: 0 },
    { id: 13, topic: 1, question: "'이 궁은 500년 이상의 역사를 가지고 있습니다'를 영어로?", options: ["This palace is new", "This palace has over 500 years of history", "This palace is 50 years old", "No history"], answer: 1 },
    { id: 14, topic: 1, question: "'불국사는 신라 시대에 건립되었습니다'를 영어로?", options: ["Bulguksa was built in Joseon", "Bulguksa was built during the Silla period", "Bulguksa is modern", "Bulguksa is in Japan"], answer: 1 },
    { id: 15, topic: 1, question: "'이 건물은 유네스코에 등재되어 있습니다'를 영어로?", options: ["Not registered", "This building is registered with UNESCO", "Unknown building", "Local building"], answer: 1 },
    { id: 16, topic: 1, question: "'한글은 세종대왕이 창제했습니다'를 영어로?", options: ["Hangeul was created by King Sejong", "Hangeul is Chinese", "Hangeul is Japanese", "Hangeul is old"], answer: 0 },
    { id: 17, topic: 1, question: "'이 탑은 국보입니다'를 영어로?", options: ["This tower is nothing", "This pagoda is a National Treasure", "This is trash", "Not important"], answer: 1 },
    { id: 18, topic: 1, question: "'DMZ'는 무엇의 약자인가?", options: ["Demilitarized Zone", "Downtown Zone", "Dance Music Zone", "Digital Zone"], answer: 0 },
    { id: 19, topic: 1, question: "'종묘는 조선 왕실의 사당입니다'를 영어로?", options: ["Jongmyo is a school", "Jongmyo is the royal ancestral shrine of Joseon", "Jongmyo is a market", "Jongmyo is a hotel"], answer: 1 },
    { id: 20, topic: 1, question: "'수문장 교대식'을 영어로?", options: ["Shopping ceremony", "Royal Guard Changing Ceremony", "Food festival", "Music concert"], answer: 1 },

    // 음식·쇼핑 안내 (10문항)
    { id: 21, topic: 2, question: "'비빔밥'을 설명하는 영어 표현은?", options: ["Soup dish", "Rice mixed with vegetables and meat", "Noodle dish", "Bread"], answer: 1 },
    { id: 22, topic: 2, question: "'김치'를 설명하는 영어 표현은?", options: ["Sweet dessert", "Fermented vegetable dish, usually cabbage", "Meat dish", "Fish"], answer: 1 },
    { id: 23, topic: 2, question: "'이 음식은 맵습니다'를 영어로?", options: ["This food is sweet", "This food is spicy", "This food is sour", "This food is cold"], answer: 1 },
    { id: 24, topic: 2, question: "'채식주의자용 메뉴가 있습니까?'를 영어로?", options: ["No menu", "Do you have vegetarian options?", "Meat only", "No food"], answer: 1 },
    { id: 25, topic: 2, question: "'면세점'을 영어로?", options: ["Tax Store", "Duty-Free Shop", "Free Store", "Cheap Store"], answer: 1 },
    { id: 26, topic: 2, question: "'한국의 전통 공예품'을 영어로?", options: ["Modern art", "Traditional Korean crafts", "Western goods", "Chinese products"], answer: 1 },
    { id: 27, topic: 2, question: "'세금 환급을 받을 수 있습니다'를 영어로?", options: ["No refund", "You can get a tax refund", "Pay more tax", "Tax increase"], answer: 1 },
    { id: 28, topic: 2, question: "'이 제품은 한국에서 만들어졌습니다'를 영어로?", options: ["Made in China", "This product is made in Korea", "Made in Japan", "Unknown origin"], answer: 1 },
    { id: 29, topic: 2, question: "'시장'을 영어로?", options: ["Park", "Market", "Museum", "Temple"], answer: 1 },
    { id: 30, topic: 2, question: "'할인'을 영어로?", options: ["Increase", "Discount", "Full price", "Tax"], answer: 1 },

    // 교통·숙박 안내 (10문항)
    { id: 31, topic: 3, question: "'호텔 체크인 시간'을 영어로?", options: ["Check-out time", "Hotel check-in time", "Room service", "Breakfast time"], answer: 1 },
    { id: 32, topic: 3, question: "'지하철역'을 영어로?", options: ["Bus stop", "Subway station", "Airport", "Harbor"], answer: 1 },
    { id: 33, topic: 3, question: "'택시를 타세요'를 영어로?", options: ["Take the bus", "Please take a taxi", "Walk", "Run"], answer: 1 },
    { id: 34, topic: 3, question: "'공항까지 얼마나 걸립니까?'를 영어로?", options: ["Where is airport?", "How long does it take to the airport?", "Airport closed", "No airport"], answer: 1 },
    { id: 35, topic: 3, question: "'교통카드'를 영어로?", options: ["ID card", "Transportation card", "Credit card", "Business card"], answer: 1 },
    { id: 36, topic: 3, question: "'짐을 맡기실 수 있습니다'를 영어로?", options: ["No luggage", "You can store your luggage here", "Carry all", "Throw away"], answer: 1 },
    { id: 37, topic: 3, question: "'버스가 지연되고 있습니다'를 영어로?", options: ["Bus is early", "The bus is delayed", "No bus", "Bus cancelled"], answer: 1 },
    { id: 38, topic: 3, question: "'호텔 조식 시간은 7시부터입니다'를 영어로?", options: ["No breakfast", "Breakfast starts at 7 AM", "Lunch at 7", "Dinner at 7"], answer: 1 },
    { id: 39, topic: 3, question: "'와이파이 비밀번호'를 영어로?", options: ["Room number", "Wi-Fi password", "Phone number", "Address"], answer: 1 },
    { id: 40, topic: 3, question: "'프런트 데스크'를 영어로?", options: ["Back office", "Front desk", "Kitchen", "Garage"], answer: 1 },

    // 상황별 대응 (10문항)
    { id: 41, topic: 4, question: "관광객이 길을 잃었을 때 적절한 표현은?", options: ["Go away", "Don't worry, I'll help you find your way", "Not my problem", "Goodbye"], answer: 1 },
    { id: 42, topic: 4, question: "응급 상황에서 '병원에 가야 합니다'를 영어로?", options: ["No hospital", "We need to go to the hospital", "Stay here", "No help"], answer: 1 },
    { id: 43, topic: 4, question: "'분실물 센터'를 영어로?", options: ["Gift shop", "Lost and found", "Information desk", "Exit"], answer: 1 },
    { id: 44, topic: 4, question: "'일정이 변경되었습니다'를 영어로?", options: ["Same schedule", "The schedule has been changed", "No schedule", "Cancel all"], answer: 1 },
    { id: 45, topic: 4, question: "'불편을 끼쳐 죄송합니다'를 영어로?", options: ["Not sorry", "I apologize for the inconvenience", "Your fault", "No problem"], answer: 1 },
    { id: 46, topic: 4, question: "'대체 일정을 준비했습니다'를 영어로?", options: ["No plan", "We have prepared an alternative plan", "Cancel tour", "Go home"], answer: 1 },
    { id: 47, topic: 4, question: "'비가 와서 실내 관광으로 변경합니다'를 영어로?", options: ["Continue outdoor", "Due to rain, we'll change to indoor sightseeing", "Cancel tour", "No change"], answer: 1 },
    { id: 48, topic: 4, question: "'여권을 분실하셨다면 대사관에 연락하세요'를 영어로?", options: ["No help", "If you lost your passport, please contact your embassy", "Keep searching", "Buy new one"], answer: 1 },
    { id: 49, topic: 4, question: "'의사소통 문제가 있을 때 통역 지원을 해드릴게요'를 영어로?", options: ["No help", "I'll provide interpretation assistance", "Speak Korean only", "No English"], answer: 1 },
    { id: 50, topic: 4, question: "'투어가 끝났습니다. 즐거우셨기를 바랍니다'를 영어로?", options: ["Bad tour", "The tour is over. I hope you enjoyed it", "More tour", "Pay more"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('tour-guide-tour-english-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tour-guide-tour-english-progress', JSON.stringify({
      score,
      answered: Array.from(answeredQuestions)
    }));
  }, [score, answeredQuestions]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const current = filteredQuestions[currentQuestion];
    if (!answeredQuestions.has(current.id)) {
      if (index === current.answer) {
        setScore(prev => prev + 1);
      }
      setAnsweredQuestions(prev => new Set([...prev, current.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setScore(0);
    setAnsweredQuestions(new Set());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    localStorage.removeItem('tour-guide-tour-english-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`관광통역안내사 관광영어: ${question}`);
    switch (ai) {
      case 'claude': return `https://claude.ai/new?q=${query}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${query}`;
      case 'gemini': return `https://gemini.google.com/?q=${query}`;
      default: return '#';
    }
  };

  const current = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/tour-guide/exam" className="text-emerald-600 hover:text-emerald-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-teal-500 hover:text-teal-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🌐 관광영어</h1>
          <p className="text-gray-500">관광 통역, 영어 회화, 상황별 표현</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-emerald-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <p className="text-emerald-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-emerald-600 hover:text-emerald-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{answeredQuestions.size} / {questions.length} 문제 완료</p>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestionForAI}</p>
            <div className="space-y-2">
              <a href={getAISearchUrl('claude', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">Claude에게 질문하기</a>
              <a href={getAISearchUrl('chatgpt', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-green-100 text-green-700 rounded-xl text-center font-medium hover:bg-green-200 transition">ChatGPT에게 질문하기</a>
              <a href={getAISearchUrl('gemini', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 p-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
