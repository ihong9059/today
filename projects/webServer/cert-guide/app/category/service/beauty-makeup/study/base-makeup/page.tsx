'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BaseMakeupStudyPage() {
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
    { id: 0, name: '스킨케어', count: 10 },
    { id: 1, name: '파운데이션', count: 10 },
    { id: 2, name: '컨투어링', count: 10 },
    { id: 3, name: '하이라이팅', count: 10 },
    { id: 4, name: '피부 보정', count: 10 },
  ];

  const questions = [
    // 스킨케어 (10문항)
    { id: 1, topic: 0, question: "메이크업 전 스킨케어의 주요 목적은?", options: ["피부 보호", "피부 자극", "모공 확대", "유분 증가"], answer: 0 },
    { id: 2, topic: 0, question: "세안 후 가장 먼저 사용하는 제품은?", options: ["로션", "에센스", "토너", "크림"], answer: 2 },
    { id: 3, topic: 0, question: "건성 피부에 적합한 스킨케어 제품 특성은?", options: ["알코올 함유", "유분기 많음", "수분 적음", "자극적"], answer: 1 },
    { id: 4, topic: 0, question: "프라이머의 역할로 옳지 않은 것은?", options: ["모공 커버", "메이크업 지속력 향상", "피부 정돈", "클렌징"], answer: 3 },
    { id: 5, topic: 0, question: "지성 피부 스킨케어 시 주의할 점은?", options: ["유분 과다 공급", "수분 공급 중요", "세안 생략", "보습 생략"], answer: 1 },
    { id: 6, topic: 0, question: "자외선 차단제는 언제 바르는 것이 좋은가?", options: ["메이크업 후", "스킨케어 마지막 단계", "세안 직후", "파운데이션 후"], answer: 1 },
    { id: 7, topic: 0, question: "민감성 피부에 권장되는 스킨케어 성분은?", options: ["알코올", "센텔라 아시아티카", "레티놀", "AHA"], answer: 1 },
    { id: 8, topic: 0, question: "메이크업 전 립케어가 중요한 이유는?", options: ["립스틱 발색 저하", "입술 건조 방지", "입술 색상 변경", "입술 축소"], answer: 1 },
    { id: 9, topic: 0, question: "아이크림을 바르는 올바른 방법은?", options: ["세게 문지르기", "손가락으로 두드리기", "손바닥으로 밀기", "비비기"], answer: 1 },
    { id: 10, topic: 0, question: "스킨케어 순서로 올바른 것은?", options: ["크림→토너→에센스", "토너→에센스→크림", "에센스→크림→토너", "크림→에센스→토너"], answer: 1 },

    // 파운데이션 (10문항)
    { id: 11, topic: 1, question: "파운데이션 선택 시 가장 중요한 요소는?", options: ["브랜드", "가격", "피부톤 매칭", "용량"], answer: 2 },
    { id: 12, topic: 1, question: "리퀴드 파운데이션의 특징은?", options: ["커버력 없음", "자연스러운 피부 표현", "건조함", "두꺼운 질감"], answer: 1 },
    { id: 13, topic: 1, question: "쿠션 파운데이션의 장점은?", options: ["커버력 최고", "휴대성과 간편함", "지속력 최고", "가격 저렴"], answer: 1 },
    { id: 14, topic: 1, question: "파운데이션 테스트 시 확인해야 할 부위는?", options: ["손등", "손목 안쪽", "턱선", "이마"], answer: 2 },
    { id: 15, topic: 1, question: "지성 피부에 적합한 파운데이션 타입은?", options: ["오일 베이스", "매트 타입", "글로우 타입", "크림 타입"], answer: 1 },
    { id: 16, topic: 1, question: "파운데이션 발림성을 높이는 도구는?", options: ["손가락만", "브러시 또는 스펀지", "면봉", "휴지"], answer: 1 },
    { id: 17, topic: 1, question: "BB크림과 파운데이션의 차이점은?", options: ["같은 제품", "BB크림은 스킨케어 기능 포함", "파운데이션이 가벼움", "차이 없음"], answer: 1 },
    { id: 18, topic: 1, question: "파운데이션 산화란?", options: ["색상이 밝아짐", "피부와 반응해 색상이 어두워짐", "향이 변함", "질감 변화"], answer: 1 },
    { id: 19, topic: 1, question: "커버력이 가장 높은 파운데이션 타입은?", options: ["틴티드 모이스처라이저", "쿠션", "스틱 파운데이션", "페이스 미스트"], answer: 2 },
    { id: 20, topic: 1, question: "파운데이션을 목까지 연결해야 하는 이유는?", options: ["제품 소진", "자연스러운 경계선", "목 보호", "향 확산"], answer: 1 },

    // 컨투어링 (10문항)
    { id: 21, topic: 2, question: "컨투어링의 주요 목적은?", options: ["피부 보습", "얼굴 입체감 연출", "피부 치료", "클렌징"], answer: 1 },
    { id: 22, topic: 2, question: "컨투어 제품으로 주로 사용하는 색상은?", options: ["흰색", "분홍색", "갈색 계열", "파란색"], answer: 2 },
    { id: 23, topic: 2, question: "둥근 얼굴형 컨투어링 포인트는?", options: ["이마 전체", "광대뼈 아래와 턱선", "코끝만", "눈 주위"], answer: 1 },
    { id: 24, topic: 2, question: "코 컨투어링으로 코를 작아 보이게 하는 방법은?", options: ["코 전체에 밝은색", "콧대 양옆에 어두운색", "코끝에만 하이라이트", "컨투어 생략"], answer: 1 },
    { id: 25, topic: 2, question: "컨투어링 블렌딩 시 중요한 점은?", options: ["경계선 뚜렷하게", "자연스럽게 그라데이션", "한 방향으로만", "물 사용"], answer: 1 },
    { id: 26, topic: 2, question: "크림 컨투어 제품의 특징은?", options: ["블렌딩 어려움", "밀착력이 좋음", "가루 날림", "커버력 없음"], answer: 1 },
    { id: 27, topic: 2, question: "긴 얼굴형의 컨투어링 위치는?", options: ["이마와 턱 끝", "광대뼈만", "코만", "눈 주위"], answer: 0 },
    { id: 28, topic: 2, question: "컨투어링 시 피해야 할 실수는?", options: ["자연스러운 블렌딩", "적당한 양 사용", "과도한 어두운 색 사용", "피부톤 고려"], answer: 2 },
    { id: 29, topic: 2, question: "파우더 컨투어 제품 사용 시 적합한 도구는?", options: ["스펀지", "앵글 브러시", "손가락", "면봉"], answer: 1 },
    { id: 30, topic: 2, question: "사각 얼굴형 컨투어링 위치는?", options: ["이마 중앙", "턱 양옆 각진 부분", "코끝", "광대뼈 위"], answer: 1 },

    // 하이라이팅 (10문항)
    { id: 31, topic: 3, question: "하이라이팅의 목적은?", options: ["얼굴 축소", "빛을 받는 부위 강조", "피부 진정", "클렌징"], answer: 1 },
    { id: 32, topic: 3, question: "하이라이터를 바르는 일반적인 위치는?", options: ["턱 아래", "광대뼈 위, 콧대, T존", "목", "귀"], answer: 1 },
    { id: 33, topic: 3, question: "펄이 많은 하이라이터의 특징은?", options: ["매트한 느낌", "글리터리한 광택", "무광", "탁한 느낌"], answer: 1 },
    { id: 34, topic: 3, question: "자연스러운 하이라이팅을 위한 팁은?", options: ["많은 양 사용", "소량으로 레이어링", "경계선 뚜렷하게", "블렌딩 생략"], answer: 1 },
    { id: 35, topic: 3, question: "크림 하이라이터의 장점은?", options: ["가루 날림", "촉촉한 광택", "건조함", "커버력"], answer: 1 },
    { id: 36, topic: 3, question: "하이라이터 색상 선택 기준은?", options: ["유행 색상", "피부 언더톤과 매칭", "가격", "브랜드"], answer: 1 },
    { id: 37, topic: 3, question: "지성 피부에 하이라이터 사용 시 주의점은?", options: ["많이 바르기", "T존 피하기", "전체에 바르기", "주의사항 없음"], answer: 1 },
    { id: 38, topic: 3, question: "스트로빙 기법이란?", options: ["컨투어링 강조", "하이라이터 중심 메이크업", "블러셔 강조", "립 강조"], answer: 1 },
    { id: 39, topic: 3, question: "큐피드 보우(입술 산)에 하이라이터를 바르는 이유는?", options: ["입술 축소", "입술 입체감 강조", "입술 색상 변경", "주름 커버"], answer: 1 },
    { id: 40, topic: 3, question: "하이라이터와 컨투어링의 관계는?", options: ["무관함", "상호 보완적", "같은 기법", "대체 가능"], answer: 1 },

    // 피부 보정 (10문항)
    { id: 41, topic: 4, question: "컬러 코렉터의 역할은?", options: ["피부 보습", "피부 결점 색상 보정", "클렌징", "자외선 차단"], answer: 1 },
    { id: 42, topic: 4, question: "다크서클 보정에 적합한 컬러 코렉터 색상은?", options: ["녹색", "피치/오렌지", "보라색", "흰색"], answer: 1 },
    { id: 43, topic: 4, question: "붉은기 보정에 사용하는 색상은?", options: ["오렌지", "녹색", "노란색", "분홍색"], answer: 1 },
    { id: 44, topic: 4, question: "컨실러 사용 순서로 올바른 것은?", options: ["파운데이션 전", "파운데이션 후", "스킨케어 전", "파우더 후"], answer: 1 },
    { id: 45, topic: 4, question: "눈 밑 컨실러 세팅에 사용하는 제품은?", options: ["크림", "세팅 파우더", "오일", "토너"], answer: 1 },
    { id: 46, topic: 4, question: "잡티 커버 시 컨실러 사용 방법은?", options: ["넓게 펴 바르기", "잡티 위에 점찍듯 밀착", "문지르기", "두껍게 바르기"], answer: 1 },
    { id: 47, topic: 4, question: "눈 밑 삼각존 컨실러의 효과는?", options: ["눈 축소", "얼굴 리프팅 및 화사함", "주름 강조", "다크서클 강조"], answer: 1 },
    { id: 48, topic: 4, question: "노란 피부톤 보정에 적합한 색상은?", options: ["노란색", "녹색", "보라/라벤더", "오렌지"], answer: 2 },
    { id: 49, topic: 4, question: "컨실러 브러시 vs 손가락 사용의 차이는?", options: ["차이 없음", "브러시는 정교함, 손가락은 밀착력", "손가락이 비위생적", "브러시가 비위생적"], answer: 1 },
    { id: 50, topic: 4, question: "베이킹 기법이란?", options: ["오븐 사용", "파우더를 올려둔 후 블렌딩하여 고정", "열 가하기", "크림 사용"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-makeup-base-makeup-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-makeup-base-makeup-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-makeup-base-makeup-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`미용사 메이크업 베이스 메이크업: ${question}`);
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
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-fuchsia-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/beauty-makeup/exam" className="text-fuchsia-600 hover:text-fuchsia-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-pink-500 hover:text-pink-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💄 베이스 메이크업</h1>
          <p className="text-gray-500">스킨케어부터 피부 보정까지</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-fuchsia-500 text-white' : 'bg-white text-gray-600 hover:bg-fuchsia-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-fuchsia-500 text-white' : 'bg-white text-gray-600 hover:bg-fuchsia-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-fuchsia-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-fuchsia-50 text-fuchsia-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-fuchsia-50 hover:border-fuchsia-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-fuchsia-50 rounded-xl">
              <p className="text-fuchsia-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-fuchsia-600 hover:text-fuchsia-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fuchsia-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-fuchsia-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fuchsia-600 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
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
