'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
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
    { id: 0, name: '내추럴 메이크업', count: 10 },
    { id: 1, name: '웨딩 메이크업', count: 10 },
    { id: 2, name: '무대 메이크업', count: 10 },
    { id: 3, name: '캐릭터 메이크업', count: 10 },
    { id: 4, name: '위생 및 실기 준비', count: 10 },
  ];

  const questions = [
    // 내추럴 메이크업 (10문항)
    { id: 1, topic: 0, question: "내추럴 메이크업의 핵심 포인트는?", options: ["강한 색상", "자연스럽고 깨끗한 피부 표현", "과감한 컨투어링", "글리터 많이 사용"], answer: 1 },
    { id: 2, topic: 0, question: "내추럴 메이크업에 적합한 베이스 제품은?", options: ["풀커버 파운데이션", "가벼운 커버력의 틴티드 모이스처라이저", "스틱 파운데이션", "무대용 파운데이션"], answer: 1 },
    { id: 3, topic: 0, question: "내추럴 립 메이크업에 어울리는 색상은?", options: ["레드", "MLBB(My Lips But Better) 계열", "블랙", "블루"], answer: 1 },
    { id: 4, topic: 0, question: "내추럴 아이 메이크업 기법은?", options: ["스모키 메이크업", "브라운/베이지 그라데이션", "컬러풀 아이라인", "글리터 위주"], answer: 1 },
    { id: 5, topic: 0, question: "내추럴 메이크업의 눈썹 표현은?", options: ["강한 아치형", "자연스러운 결 표현", "날카로운 각도", "눈썹 생략"], answer: 1 },
    { id: 6, topic: 0, question: "내추럴 메이크업 시 블러셔 위치는?", options: ["광대 전체", "애플존에 살짝", "턱에", "이마에"], answer: 1 },
    { id: 7, topic: 0, question: "내추럴 메이크업에서 컨투어링은?", options: ["강하게", "거의 하지 않거나 아주 자연스럽게", "생략", "과하게"], answer: 1 },
    { id: 8, topic: 0, question: "데일리 내추럴 메이크업 소요 시간은?", options: ["5분 이내", "10-15분", "1시간", "2시간"], answer: 1 },
    { id: 9, topic: 0, question: "내추럴 메이크업의 마스카라 사용법은?", options: ["두껍게 여러 번", "자연스럽게 한두 번", "사용 안 함", "아래만"], answer: 1 },
    { id: 10, topic: 0, question: "내추럴 메이크업에서 하이라이터 사용은?", options: ["펄 많이", "은은하게 콧대, 광대 위", "전혀 안 함", "얼굴 전체"], answer: 1 },

    // 웨딩 메이크업 (10문항)
    { id: 11, topic: 1, question: "웨딩 메이크업의 가장 중요한 요소는?", options: ["개성 표현", "오래 지속되는 지속력", "트렌디함", "파격적 색상"], answer: 1 },
    { id: 12, topic: 1, question: "웨딩 메이크업 베이스의 특징은?", options: ["가벼운 커버력", "완벽한 커버력과 지속력", "무광만", "유광만"], answer: 1 },
    { id: 13, topic: 1, question: "웨딩 메이크업에서 눈물 방지를 위한 제품은?", options: ["일반 마스카라", "워터프루프 제품들", "매트 립스틱", "글로시 립"], answer: 1 },
    { id: 14, topic: 1, question: "웨딩 메이크업 전 스킨케어 포인트는?", options: ["유분기 많이", "충분한 보습과 진정", "스킨케어 생략", "필링"], answer: 1 },
    { id: 15, topic: 1, question: "웨딩 메이크업의 아이 메이크업 특징은?", options: ["무난함", "또렷하고 화사한 눈매", "스모키만", "아이라인 생략"], answer: 1 },
    { id: 16, topic: 1, question: "웨딩 촬영 시 주의할 메이크업 포인트는?", options: ["SPF 제품 많이", "SPF 조심 (플래시 반사)", "유광 많이", "글리터 과다"], answer: 1 },
    { id: 17, topic: 1, question: "웨딩 립 메이크업에 적합한 타입은?", options: ["글로시만", "롱래스팅 틴트 또는 매트", "립글로스만", "립밤만"], answer: 1 },
    { id: 18, topic: 1, question: "웨딩 메이크업 리허설의 중요성은?", options: ["불필요", "피부 반응 테스트 및 스타일 확정", "비용 낭비", "시간 낭비"], answer: 1 },
    { id: 19, topic: 1, question: "신부 드레스 색상과 메이크업의 관계는?", options: ["무관함", "드레스 톤에 맞춘 메이크업", "항상 빨간색", "항상 분홍색"], answer: 1 },
    { id: 20, topic: 1, question: "웨딩 메이크업 수정 키트에 필수인 것은?", options: ["전체 화장품", "립스틱, 파우더, 기름종이", "향수만", "선크림만"], answer: 1 },

    // 무대 메이크업 (10문항)
    { id: 21, topic: 2, question: "무대 메이크업의 특징은?", options: ["자연스러움", "또렷하고 과장된 표현", "무색", "투명"], answer: 1 },
    { id: 22, topic: 2, question: "무대 조명을 고려한 베이스 선택은?", options: ["매트만", "커버력 높은 제품으로 균일하게", "가벼운 커버력", "베이스 생략"], answer: 1 },
    { id: 23, topic: 2, question: "무대 아이 메이크업의 포인트는?", options: ["자연스러움", "강조된 아이라인과 또렷한 눈매", "아이섀도 생략", "연한 색만"], answer: 1 },
    { id: 24, topic: 2, question: "조명 아래에서 얼굴이 평면적으로 보이는 것을 방지하려면?", options: ["베이스만", "컨투어링과 하이라이팅 강조", "메이크업 생략", "파우더만"], answer: 1 },
    { id: 25, topic: 2, question: "무대 립 메이크업의 특징은?", options: ["누드 톤만", "선명하고 또렷한 색상", "립밤만", "투명 글로스"], answer: 1 },
    { id: 26, topic: 2, question: "발레 무대 메이크업의 특징은?", options: ["내추럴", "클래식하고 우아한 강조", "캐주얼", "스모키만"], answer: 1 },
    { id: 27, topic: 2, question: "콘서트 무대 메이크업 고려사항은?", options: ["조명 무시", "움직임과 땀, 조명 고려", "가벼운 메이크업", "메이크업 생략"], answer: 1 },
    { id: 28, topic: 2, question: "무대용 인조 속눈썹 선택은?", options: ["자연스러운 것", "풍성하고 긴 타입", "속눈썹 생략", "아래만"], answer: 1 },
    { id: 29, topic: 2, question: "뮤지컬 배우의 캐릭터 표현 메이크업은?", options: ["항상 동일", "캐릭터와 장면에 맞게 변화", "무메이크업", "자연스러움만"], answer: 1 },
    { id: 30, topic: 2, question: "무대 메이크업 전 피부 준비는?", options: ["세안만", "보습과 프라이머로 밀착력 강화", "준비 불필요", "유분 많이"], answer: 1 },

    // 캐릭터 메이크업 (10문항)
    { id: 31, topic: 3, question: "캐릭터 메이크업의 목적은?", options: ["일상 메이크업", "특정 인물/캐릭터 표현", "피부 관리", "클렌징"], answer: 1 },
    { id: 32, topic: 3, question: "노역 메이크업(노인 분장)에 사용되는 기법은?", options: ["하이라이트만", "주름 표현과 음영", "밝은 색만", "글리터"], answer: 1 },
    { id: 33, topic: 3, question: "특수 분장에 사용되는 재료가 아닌 것은?", options: ["라텍스", "젤라틴", "프로스테틱", "일반 립스틱"], answer: 3 },
    { id: 34, topic: 3, question: "상처 메이크업에 사용되는 제품은?", options: ["블러셔", "특수 분장용 혈액 및 왁스", "파운데이션", "립글로스"], answer: 1 },
    { id: 35, topic: 3, question: "코스프레 메이크업의 특징은?", options: ["자연스러움", "캐릭터 특징을 과장되게 표현", "무메이크업", "내추럴 톤만"], answer: 1 },
    { id: 36, topic: 3, question: "할로윈 메이크업에서 자주 사용하는 기법은?", options: ["내추럴 메이크업", "특수 분장 및 페이스 페인팅", "스킨케어만", "립스틱만"], answer: 1 },
    { id: 37, topic: 3, question: "시대극 메이크업의 특징은?", options: ["현대적 트렌드", "해당 시대 스타일 재현", "메이크업 생략", "무조건 화려하게"], answer: 1 },
    { id: 38, topic: 3, question: "판타지 캐릭터 메이크업에 사용되는 것은?", options: ["일반 메이크업만", "바디페인팅, 보석, 특수 아이템", "스킨케어 제품", "선크림"], answer: 1 },
    { id: 39, topic: 3, question: "캐릭터 눈 표현에서 컬러렌즈의 역할은?", options: ["시력 교정만", "캐릭터 눈 색상 표현", "불필요", "위험함"], answer: 1 },
    { id: 40, topic: 3, question: "드래그 메이크업의 특징은?", options: ["자연스러움", "과장된 여성성 또는 극적 표현", "최소한의 메이크업", "남성적 표현만"], answer: 1 },

    // 위생 및 실기 준비 (10문항)
    { id: 41, topic: 4, question: "메이크업 도구 소독에 사용하는 것은?", options: ["물만", "알코올 또는 전용 소독제", "비누만", "소독 불필요"], answer: 1 },
    { id: 42, topic: 4, question: "브러시 세척 주기는?", options: ["1년에 한 번", "정기적으로 주 1회 이상", "세척 불필요", "매일 완전 세척"], answer: 1 },
    { id: 43, topic: 4, question: "일회용 도구 사용이 권장되는 경우는?", options: ["모든 경우", "립, 마스카라 등 점막 접촉 시", "절대 불필요", "베이스만"], answer: 1 },
    { id: 44, topic: 4, question: "실기시험 전 손 위생 방법은?", options: ["손 씻기 생략", "비누로 손 세척 및 소독", "장갑만 착용", "물로만"], answer: 1 },
    { id: 45, topic: 4, question: "메이크업 제품 유통기한 확인의 중요성은?", options: ["중요하지 않음", "피부 트러블 및 감염 예방", "향만 확인", "색상만 확인"], answer: 1 },
    { id: 46, topic: 4, question: "실기시험 시 제품 배치의 중요성은?", options: ["무관함", "효율적 작업과 시간 관리", "디자인만", "양만 중요"], answer: 1 },
    { id: 47, topic: 4, question: "스펀지 위생 관리 방법은?", options: ["재사용만", "정기 세척 및 교체", "건조만", "관리 불필요"], answer: 1 },
    { id: 48, topic: 4, question: "모델의 피부 알러지 확인 방법은?", options: ["확인 불필요", "사전 상담 및 패치 테스트", "직접 바르기", "무시"], answer: 1 },
    { id: 49, topic: 4, question: "실기시험 시간 관리 팁은?", options: ["시간 무시", "단계별 시간 배분 연습", "빠르게만", "천천히만"], answer: 1 },
    { id: 50, topic: 4, question: "메이크업 작업 공간 위생 기준은?", options: ["청소 불필요", "작업 전후 정리 및 소독", "어질러도 됨", "마지막에만 청소"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-makeup-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-makeup-practical-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-makeup-practical-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`미용사 메이크업 실기: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎭 실기 문제 풀기</h1>
          <p className="text-gray-500">내추럴, 웨딩, 무대, 캐릭터 메이크업</p>
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
