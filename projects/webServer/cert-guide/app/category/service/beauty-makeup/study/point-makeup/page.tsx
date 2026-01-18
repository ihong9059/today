'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PointMakeupStudyPage() {
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
    { id: 0, name: '아이 메이크업', count: 10 },
    { id: 1, name: '립 메이크업', count: 10 },
    { id: 2, name: '치크 메이크업', count: 10 },
    { id: 3, name: '눈썹 정리', count: 10 },
    { id: 4, name: '속눈썹', count: 10 },
  ];

  const questions = [
    // 아이 메이크업 (10문항)
    { id: 1, topic: 0, question: "아이섀도 베이스의 역할은?", options: ["눈 축소", "발색력 향상 및 지속력 강화", "눈 보호", "클렌징"], answer: 1 },
    { id: 2, topic: 0, question: "쌍꺼풀 있는 눈의 아이섀도 기법은?", options: ["쌍꺼풀 라인 무시", "쌍꺼풀 라인 활용 그라데이션", "눈 전체 단색", "아이섀도 생략"], answer: 1 },
    { id: 3, topic: 0, question: "스모키 메이크업의 특징은?", options: ["밝은 톤 위주", "어두운 톤의 그라데이션", "단색 사용", "컬러 생략"], answer: 1 },
    { id: 4, topic: 0, question: "눈을 커 보이게 하는 아이라이너 기법은?", options: ["점막 라이너만", "눈꼬리 연장 라이너", "아이라이너 생략", "두꺼운 라이너"], answer: 1 },
    { id: 5, topic: 0, question: "펜슬 아이라이너의 장점은?", options: ["번짐 없음", "수정이 쉬움", "지속력 최고", "가장 선명함"], answer: 1 },
    { id: 6, topic: 0, question: "처진 눈 교정 아이 메이크업 방법은?", options: ["눈꼬리 아래로", "눈꼬리 위로 올려 그리기", "아이라인 생략", "점막만 채우기"], answer: 1 },
    { id: 7, topic: 0, question: "글리터 아이섀도 사용 시 주의점은?", options: ["전체에 많이", "포인트로 소량 사용", "베이스 생략", "블렌딩 과다"], answer: 1 },
    { id: 8, topic: 0, question: "아이섀도 블렌딩 도구로 적합한 것은?", options: ["스펀지", "블렌딩 브러시", "손가락만", "면봉만"], answer: 1 },
    { id: 9, topic: 0, question: "내추럴 아이 메이크업에 적합한 색상은?", options: ["블랙, 블루", "브라운, 베이지", "레드, 퍼플", "그린, 옐로"], answer: 1 },
    { id: 10, topic: 0, question: "젤 아이라이너의 특징은?", options: ["가장 연함", "밀착력이 좋고 수정 가능", "휴대 불편", "발색 약함"], answer: 1 },

    // 립 메이크업 (10문항)
    { id: 11, topic: 1, question: "립라이너의 역할은?", options: ["입술 보습", "입술 윤곽 정리 및 번짐 방지", "클렌징", "입술 축소"], answer: 1 },
    { id: 12, topic: 1, question: "매트 립스틱의 특징은?", options: ["촉촉함", "광택 없는 보송한 마무리", "글로시함", "투명함"], answer: 1 },
    { id: 13, topic: 1, question: "틴트의 장점은?", options: ["보습력 최고", "오래 지속되는 발색", "두꺼운 질감", "광택 최고"], answer: 1 },
    { id: 14, topic: 1, question: "오버립 기법이란?", options: ["입술 작게", "입술 라인 바깥으로 그려 확대", "입술 색 지우기", "립밤만 사용"], answer: 1 },
    { id: 15, topic: 1, question: "그라데이션 립 연출 방법은?", options: ["전체 동일 색상", "입술 안쪽에 진한 색, 바깥쪽 블렌딩", "바깥쪽만 색칠", "윤곽만 그리기"], answer: 1 },
    { id: 16, topic: 1, question: "립글로스의 효과는?", options: ["매트한 느낌", "볼륨감과 촉촉한 광택", "지속력 향상", "색상 제거"], answer: 1 },
    { id: 17, topic: 1, question: "입술이 작아 보이는 것을 방지하려면?", options: ["어두운 색 사용", "밝은 색과 글로스 활용", "립 메이크업 생략", "매트만 사용"], answer: 1 },
    { id: 18, topic: 1, question: "립스틱 지속력을 높이는 방법은?", options: ["한 번만 바르기", "티슈로 찍고 덧바르기", "글로스만 사용", "물로 닦기"], answer: 1 },
    { id: 19, topic: 1, question: "쿨톤에 어울리는 립 색상은?", options: ["오렌지, 코랄", "핑크, 와인", "브라운, 베이지", "옐로우"], answer: 1 },
    { id: 20, topic: 1, question: "립 프라이머의 역할은?", options: ["클렌징", "입술 결 정돈 및 발색 향상", "색소 침착", "입술 축소"], answer: 1 },

    // 치크 메이크업 (10문항)
    { id: 21, topic: 2, question: "블러셔의 주요 역할은?", options: ["피부 보정", "혈색감 부여", "클렌징", "주름 커버"], answer: 1 },
    { id: 22, topic: 2, question: "둥근 얼굴형의 블러셔 위치는?", options: ["광대뼈 아래 사선", "애플존 동그랗게", "관자놀이만", "턱 위"], answer: 0 },
    { id: 23, topic: 2, question: "크림 블러셔의 특징은?", options: ["가루 날림", "촉촉하고 자연스러운 발색", "매트한 느낌", "지속력 약함"], answer: 1 },
    { id: 24, topic: 2, question: "파우더 블러셔 사용에 적합한 브러시는?", options: ["립 브러시", "블러셔 브러시 또는 앵글 브러시", "아이섀도 브러시", "팬 브러시만"], answer: 1 },
    { id: 25, topic: 2, question: "블러셔 과다 사용 시 수정 방법은?", options: ["세안", "파운데이션으로 블렌딩", "그대로 둠", "더 바름"], answer: 1 },
    { id: 26, topic: 2, question: "쿨톤에 어울리는 블러셔 색상은?", options: ["오렌지, 코랄", "핑크, 로즈", "브라운", "옐로우"], answer: 1 },
    { id: 27, topic: 2, question: "드레이핑 기법이란?", options: ["블러셔 생략", "블러셔로 얼굴 윤곽 강조", "립스틱 기법", "아이 메이크업 기법"], answer: 1 },
    { id: 28, topic: 2, question: "긴 얼굴형의 블러셔 기법은?", options: ["사선으로 올려", "수평으로 넓게", "아래로 내려", "광대뼈에만"], answer: 1 },
    { id: 29, topic: 2, question: "이구아나(Igari) 메이크업의 블러셔 위치는?", options: ["광대뼈 아래", "눈 밑과 코 주변", "이마", "턱선"], answer: 1 },
    { id: 30, topic: 2, question: "블러셔와 브론저의 차이점은?", options: ["같은 제품", "블러셔는 혈색, 브론저는 음영", "블러셔가 어두움", "차이 없음"], answer: 1 },

    // 눈썹 정리 (10문항)
    { id: 31, topic: 3, question: "눈썹 시작점의 기준 위치는?", options: ["눈 끝", "코 옆에서 수직", "눈동자 중앙", "관자놀이"], answer: 1 },
    { id: 32, topic: 3, question: "눈썹 꼬리 위치 기준은?", options: ["코와 눈 끝 연장선", "코와 눈동자 연장선", "귀 끝", "이마 끝"], answer: 0 },
    { id: 33, topic: 3, question: "눈썹 정리 도구가 아닌 것은?", options: ["눈썹칼", "족집게", "눈썹 가위", "립 브러시"], answer: 3 },
    { id: 34, topic: 3, question: "아이브로우 펜슬의 특징은?", options: ["자연스러운 결 표현 어려움", "한 올 한 올 표현 가능", "젤 타입", "파우더 타입"], answer: 1 },
    { id: 35, topic: 3, question: "눈썹 틴트의 장점은?", options: ["즉시 지워짐", "오래 지속되는 발색", "보습 효과", "컬러 없음"], answer: 1 },
    { id: 36, topic: 3, question: "아치형 눈썹의 인상은?", options: ["부드러움", "세련되고 또렷함", "졸려 보임", "순수함"], answer: 1 },
    { id: 37, topic: 3, question: "일자 눈썹의 인상은?", options: ["강인함", "어려 보이고 부드러움", "나이 들어 보임", "차가움"], answer: 1 },
    { id: 38, topic: 3, question: "눈썹 마스카라의 역할은?", options: ["눈썹 제거", "눈썹 결 정리 및 컬러링", "눈썹 성장", "클렌징"], answer: 1 },
    { id: 39, topic: 3, question: "눈썹 파우더의 장점은?", options: ["선명한 라인", "자연스럽고 부드러운 표현", "지속력 최고", "방수 효과"], answer: 1 },
    { id: 40, topic: 3, question: "눈썹 정리 전 피부 보호 방법은?", options: ["아무것도 안 함", "아이스팩 또는 진정제 사용", "오일 바름", "파운데이션 바름"], answer: 1 },

    // 속눈썹 (10문항)
    { id: 41, topic: 4, question: "뷰러 사용의 목적은?", options: ["속눈썹 제거", "속눈썹 컬링", "속눈썹 염색", "클렌징"], answer: 1 },
    { id: 42, topic: 4, question: "마스카라 사용 순서는?", options: ["마스카라 → 뷰러", "뷰러 → 마스카라", "동시 사용", "순서 무관"], answer: 1 },
    { id: 43, topic: 4, question: "워터프루프 마스카라의 특징은?", options: ["쉽게 지워짐", "물, 땀에 강함", "보습 효과", "컬링 없음"], answer: 1 },
    { id: 44, topic: 4, question: "인조 속눈썹 부착 도구는?", options: ["뷰러", "속눈썹 접착제와 핀셋", "마스카라", "아이라이너"], answer: 1 },
    { id: 45, topic: 4, question: "속눈썹 연장의 장점은?", options: ["매일 마스카라 필요", "자연스럽게 길어 보임", "매일 제거 필요", "알러지 유발"], answer: 1 },
    { id: 46, topic: 4, question: "마스카라 뭉침 방지 방법은?", options: ["많이 바르기", "지그재그로 빗듯이 바르기", "한 번에 두껍게", "수직으로만 바르기"], answer: 1 },
    { id: 47, topic: 4, question: "아래 속눈썹 마스카라 효과는?", options: ["눈 작아 보임", "눈이 커 보이고 또렷해짐", "효과 없음", "눈 피로"], answer: 1 },
    { id: 48, topic: 4, question: "뷰러 고무패드 교체 주기는?", options: ["영구 사용", "컬링력 저하 시 또는 3-6개월", "매일 교체", "1년마다"], answer: 1 },
    { id: 49, topic: 4, question: "속눈썹 영양제의 역할은?", options: ["속눈썹 제거", "속눈썹 성장 및 강화", "마스카라 대체", "클렌징"], answer: 1 },
    { id: 50, topic: 4, question: "히팅 뷰러의 장점은?", options: ["차가운 컬링", "열로 오래 지속되는 컬 형성", "속눈썹 탈모", "사용 어려움"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-makeup-point-makeup-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-makeup-point-makeup-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-makeup-point-makeup-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`미용사 메이크업 포인트 메이크업: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💋 포인트 메이크업</h1>
          <p className="text-gray-500">아이, 립, 치크, 눈썹, 속눈썹까지</p>
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
