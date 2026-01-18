'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FacialCarePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '클렌징', count: 10 },
    { id: 1, name: '딥클렌징', count: 10 },
    { id: 2, name: '매뉴얼테크닉', count: 10 },
    { id: 3, name: '팩·마스크', count: 10 },
    { id: 4, name: '기기관리', count: 10 },
  ];

  const questions = [
    // 클렌징 (1-10)
    { id: 1, topic: 0, question: "클렌징의 주요 목적은?", options: ["영양 공급", "노폐물 제거", "주름 개선", "미백"], answer: 1 },
    { id: 2, topic: 0, question: "포인트 메이크업 클렌징에 적합한 제품은?", options: ["폼클렌저", "전용 리무버", "비누", "스크럽"], answer: 1 },
    { id: 3, topic: 0, question: "클렌징 순서로 올바른 것은?", options: ["전체→포인트", "포인트→전체", "동시에", "순서 무관"], answer: 1 },
    { id: 4, topic: 0, question: "지성 피부에 적합한 클렌저 타입은?", options: ["크림타입", "오일타입", "젤타입", "밀크타입"], answer: 2 },
    { id: 5, topic: 0, question: "민감성 피부 클렌징 시 주의사항은?", options: ["강하게 문지름", "뜨거운 물 사용", "저자극 제품 사용", "알코올 제품 사용"], answer: 2 },
    { id: 6, topic: 0, question: "이중 세안의 목적은?", options: ["피부 자극", "완벽한 세정", "시간 절약", "비용 절감"], answer: 1 },
    { id: 7, topic: 0, question: "클렌징 워터의 특징은?", options: ["유분 함량 높음", "물 베이스", "강한 세정력", "두꺼운 제형"], answer: 1 },
    { id: 8, topic: 0, question: "클렌징 오일의 세정 원리는?", options: ["산성 반응", "유사 용해", "효소 분해", "물리적 제거"], answer: 1 },
    { id: 9, topic: 0, question: "클렌징 후 적합한 수온은?", options: ["냉수", "미온수", "열탕", "얼음물"], answer: 1 },
    { id: 10, topic: 0, question: "과도한 클렌징의 부작용은?", options: ["피부 강화", "피부 장벽 손상", "주름 개선", "탄력 증가"], answer: 1 },

    // 딥클렌징 (11-20)
    { id: 11, topic: 1, question: "딥클렌징의 목적이 아닌 것은?", options: ["각질 제거", "모공 청소", "영양 공급", "피부결 개선"], answer: 2 },
    { id: 12, topic: 1, question: "AHA 성분의 특징은?", options: ["지용성", "수용성", "불용성", "알칼리성"], answer: 1 },
    { id: 13, topic: 1, question: "BHA 성분으로 대표적인 것은?", options: ["글리콜산", "락틱산", "살리실산", "만델산"], answer: 2 },
    { id: 14, topic: 1, question: "효소 필링의 원리는?", options: ["물리적 마찰", "화학적 용해", "단백질 분해", "열에 의한 제거"], answer: 2 },
    { id: 15, topic: 1, question: "스크럽 제품에 사용되는 입자 재료가 아닌 것은?", options: ["호두껍질", "소금", "히알루론산", "설탕"], answer: 2 },
    { id: 16, topic: 1, question: "민감성 피부에 적합한 딥클렌징 방법은?", options: ["강한 스크럽", "고농도 산", "효소 필링", "물리적 마찰"], answer: 2 },
    { id: 17, topic: 1, question: "딥클렌징 후 반드시 해야 할 것은?", options: ["각질 제거", "진정 관리", "재차 딥클렌징", "열 스팀"], answer: 1 },
    { id: 18, topic: 1, question: "각질 제거 주기로 적절한 것은?", options: ["매일", "주 1-2회", "월 1회", "년 1회"], answer: 1 },
    { id: 19, topic: 1, question: "과도한 딥클렌징의 부작용이 아닌 것은?", options: ["피부 건조", "자극 증가", "피부 강화", "민감성 증가"], answer: 2 },
    { id: 20, topic: 1, question: "여드름 피부에 적합한 딥클렌징 성분은?", options: ["글리콜산", "살리실산", "만델산", "락틱산"], answer: 1 },

    // 매뉴얼테크닉 (21-30)
    { id: 21, topic: 2, question: "마사지의 기본 효과가 아닌 것은?", options: ["혈액순환 촉진", "근육 이완", "각질 제거", "림프 순환"], answer: 2 },
    { id: 22, topic: 2, question: "에플러라지(Effleurage)는 어떤 동작인가?", options: ["두드리기", "쓸어넘기기", "주무르기", "진동"], answer: 1 },
    { id: 23, topic: 2, question: "페트리사지(Petrissage)의 효과는?", options: ["진정", "근육 이완", "피부 냉각", "각질 제거"], answer: 1 },
    { id: 24, topic: 2, question: "타포트먼트(Tapotement)는 어떤 동작인가?", options: ["쓸어넘기기", "두드리기", "주무르기", "마찰"], answer: 1 },
    { id: 25, topic: 2, question: "마사지 시 금기 사항이 아닌 것은?", options: ["염증 부위", "상처 부위", "정상 피부", "감염 부위"], answer: 2 },
    { id: 26, topic: 2, question: "마사지 방향의 원칙은?", options: ["아래에서 위로", "위에서 아래로", "방향 무관", "좌우로만"], answer: 0 },
    { id: 27, topic: 2, question: "림프 드레나지의 목적은?", options: ["근육 강화", "노폐물 배출", "각질 제거", "색소 제거"], answer: 1 },
    { id: 28, topic: 2, question: "마사지 시 적합한 제품은?", options: ["토너", "마사지 크림", "클렌저", "선크림"], answer: 1 },
    { id: 29, topic: 2, question: "지압의 효과가 아닌 것은?", options: ["혈액순환", "근육 이완", "피부 박피", "통증 완화"], answer: 2 },
    { id: 30, topic: 2, question: "마사지 시간으로 적절한 것은?", options: ["5분", "15-20분", "60분", "120분"], answer: 1 },

    // 팩·마스크 (31-40)
    { id: 31, topic: 3, question: "팩의 주요 목적이 아닌 것은?", options: ["영양 공급", "보습", "각질 제거", "진정"], answer: 2 },
    { id: 32, topic: 3, question: "클레이 마스크의 효과는?", options: ["보습", "피지 흡착", "미백", "주름 개선"], answer: 1 },
    { id: 33, topic: 3, question: "시트 마스크의 장점은?", options: ["재사용 가능", "간편한 사용", "영구 보관", "열 발생"], answer: 1 },
    { id: 34, topic: 3, question: "진정 효과가 있는 팩 성분은?", options: ["알코올", "알로에", "레티놀", "AHA"], answer: 1 },
    { id: 35, topic: 3, question: "모델링 마스크의 특징은?", options: ["액체 형태", "굳으면서 밀착", "영구 부착", "열 발생"], answer: 1 },
    { id: 36, topic: 3, question: "팩 도포 시 피해야 할 부위는?", options: ["이마", "볼", "눈가·입술", "턱"], answer: 2 },
    { id: 37, topic: 3, question: "팩 적용 시간으로 적절한 것은?", options: ["5분", "15-20분", "60분", "하루 종일"], answer: 1 },
    { id: 38, topic: 3, question: "하이드로겔 마스크의 특징은?", options: ["종이 재질", "젤 형태로 밀착력 우수", "흙 재질", "가루 형태"], answer: 1 },
    { id: 39, topic: 3, question: "팩 후 필요한 관리는?", options: ["재차 팩", "보습제 도포", "클렌징", "스크럽"], answer: 1 },
    { id: 40, topic: 3, question: "민감성 피부에 부적합한 팩 성분은?", options: ["알로에", "캐모마일", "고농도 비타민C", "오트밀"], answer: 2 },

    // 기기관리 (41-50)
    { id: 41, topic: 4, question: "갈바닉 기기의 원리는?", options: ["고주파", "직류 전류", "초음파", "레이저"], answer: 1 },
    { id: 42, topic: 4, question: "이온토포레시스의 목적은?", options: ["각질 제거", "유효 성분 침투", "피지 제거", "털 제거"], answer: 1 },
    { id: 43, topic: 4, question: "고주파 기기의 효과가 아닌 것은?", options: ["살균", "혈액순환", "이온 침투", "진정"], answer: 2 },
    { id: 44, topic: 4, question: "초음파 기기의 원리는?", options: ["전기 자극", "음파 진동", "빛 에너지", "열 에너지"], answer: 1 },
    { id: 45, topic: 4, question: "스티머의 효과가 아닌 것은?", options: ["모공 확장", "혈액순환", "피부 건조", "제품 흡수 촉진"], answer: 2 },
    { id: 46, topic: 4, question: "브러시 기기의 용도는?", options: ["영양 공급", "딥클렌징", "주름 개선", "미백"], answer: 1 },
    { id: 47, topic: 4, question: "LED 기기 중 여드름 관리에 효과적인 파장은?", options: ["빨간색", "파란색", "노란색", "녹색"], answer: 1 },
    { id: 48, topic: 4, question: "기기 사용 전 반드시 확인할 것은?", options: ["고객 기분", "기기 작동 상태", "날씨", "시간"], answer: 1 },
    { id: 49, topic: 4, question: "기기 사용 금기 대상이 아닌 것은?", options: ["임산부", "심장 질환자", "건강한 성인", "금속 삽입물 보유자"], answer: 2 },
    { id: 50, topic: 4, question: "기기 관리 후 필수 사항은?", options: ["방치", "소독 및 보관", "물에 담금", "햇빛 노출"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-skin-facial-care-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-skin-facial-care-progress', JSON.stringify({
      answered: Array.from(answeredQuestions),
      score: score
    }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(filteredQuestions[currentQuestion].id);
    setAnsweredQuestions(newAnswered);

    if (index === filteredQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    localStorage.removeItem('beauty-skin-facial-care-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(피부) 얼굴관리 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-fuchsia-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/category/service/beauty-skin" className="text-purple-600 hover:text-purple-800">
              ← 뒤로
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">얼굴관리</h1>
              <p className="text-sm text-gray-500">미용사(피부) 필기과목</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">전체 진행률</span>
            <span className="text-sm text-purple-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-green-600">정답: {score}개</span>
            <span className="text-red-500">오답: {answeredQuestions.size - score}개</span>
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedTopic === null
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedTopic === topic.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-purple-600 font-medium">
              문제 {currentQuestion + 1} / {filteredQuestions.length}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
              {topics.find(t => t.id === currentQ.topic)?.name}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition ${
                  showResult
                    ? index === currentQ.answer
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : selectedAnswer === index
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <span className="font-medium">{index + 1}.</span> {option}
                {showResult && index === currentQ.answer && (
                  <span className="ml-2">✓</span>
                )}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl">
              <p className="text-purple-800 font-medium mb-2">
                {selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}
              </p>
              <p className="text-sm text-purple-600">
                정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}
              </p>
              <button
                onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)}
                className="mt-3 flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900"
              >
                🤖 AI에게 해설 요청하기
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50"
          >
            ← 이전
          </button>
          <button
            onClick={resetProgress}
            className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200"
          >
            초기화
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === filteredQuestions.length - 1}
            className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-purple-600"
          >
            다음 →
          </button>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
