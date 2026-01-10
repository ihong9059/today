'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BodyCarePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '바디 해부생리', count: 10 },
    { id: 1, name: '바디 마사지', count: 10 },
    { id: 2, name: '체형관리', count: 10 },
    { id: 3, name: '림프·순환', count: 10 },
    { id: 4, name: '제모·왁싱', count: 10 },
  ];

  const questions = [
    // 바디 해부생리 (1-10)
    { id: 1, topic: 0, question: "인체의 가장 큰 기관은?", options: ["심장", "간", "피부", "폐"], answer: 2 },
    { id: 2, topic: 0, question: "근육의 종류가 아닌 것은?", options: ["골격근", "심근", "평활근", "피부근"], answer: 3 },
    { id: 3, topic: 0, question: "림프계의 주요 기능은?", options: ["산소 운반", "노폐물 배출", "체온 조절", "호르몬 분비"], answer: 1 },
    { id: 4, topic: 0, question: "셀룰라이트가 주로 발생하는 부위가 아닌 것은?", options: ["허벅지", "엉덩이", "복부", "얼굴"], answer: 3 },
    { id: 5, topic: 0, question: "지방세포가 주로 저장되는 층은?", options: ["표피", "진피", "피하지방층", "근육층"], answer: 2 },
    { id: 6, topic: 0, question: "혈액순환의 출발점인 기관은?", options: ["폐", "심장", "간", "신장"], answer: 1 },
    { id: 7, topic: 0, question: "인체의 항상성 유지에 관여하는 것은?", options: ["뼈", "자율신경계", "손톱", "모발"], answer: 1 },
    { id: 8, topic: 0, question: "콜라겐 섬유가 많이 분포하는 피부층은?", options: ["표피", "진피", "각질층", "기저층"], answer: 1 },
    { id: 9, topic: 0, question: "체온 조절에 관여하는 피부 부속기관은?", options: ["피지선", "한선", "모낭", "손톱"], answer: 1 },
    { id: 10, topic: 0, question: "인체 수분이 가장 많이 분포하는 곳은?", options: ["혈액", "세포 내", "림프", "세포 외"], answer: 1 },

    // 바디 마사지 (11-20)
    { id: 11, topic: 1, question: "바디 마사지의 효과가 아닌 것은?", options: ["혈액순환", "근육 이완", "뼈 성장", "스트레스 해소"], answer: 2 },
    { id: 12, topic: 1, question: "스웨디시 마사지의 특징은?", options: ["강한 압력", "부드러운 롱 스트로크", "지압 위주", "빠른 동작"], answer: 1 },
    { id: 13, topic: 1, question: "딥티슈 마사지의 목적은?", options: ["표면 진정", "심부 근육 이완", "피부 미백", "각질 제거"], answer: 1 },
    { id: 14, topic: 1, question: "아로마 마사지에 사용되는 것은?", options: ["미네랄 오일", "에센셜 오일", "식용유", "경유"], answer: 1 },
    { id: 15, topic: 1, question: "마사지 오일의 역할이 아닌 것은?", options: ["마찰 감소", "피부 보습", "각질 제거", "슬라이딩 촉진"], answer: 2 },
    { id: 16, topic: 1, question: "바디 마사지 금기 사항이 아닌 것은?", options: ["급성 염증", "열병", "건강한 상태", "피부 질환"], answer: 2 },
    { id: 17, topic: 1, question: "마사지 시 혈액 순환 방향은?", options: ["심장에서 멀리", "심장 방향", "방향 무관", "아래로만"], answer: 1 },
    { id: 18, topic: 1, question: "핫스톤 마사지에 사용되는 돌의 특징은?", options: ["열 보존력 우수", "열 전도 불가", "차가운 상태 유지", "금속 재질"], answer: 0 },
    { id: 19, topic: 1, question: "바디 마사지 전 준비사항이 아닌 것은?", options: ["손 소독", "따뜻한 손", "긴 손톱", "오일 준비"], answer: 2 },
    { id: 20, topic: 1, question: "마사지 압력의 원칙은?", options: ["항상 강하게", "고객 반응에 따라 조절", "항상 약하게", "압력 무관"], answer: 1 },

    // 체형관리 (21-30)
    { id: 21, topic: 2, question: "비만의 기준이 되는 지표는?", options: ["키", "BMI", "혈압", "체온"], answer: 1 },
    { id: 22, topic: 2, question: "셀룰라이트의 특징이 아닌 것은?", options: ["오렌지필 피부", "울퉁불퉁함", "탄력 증가", "혈액순환 저하"], answer: 2 },
    { id: 23, topic: 2, question: "체형관리 시 측정하지 않는 것은?", options: ["허리둘레", "체지방률", "IQ", "근육량"], answer: 2 },
    { id: 24, topic: 2, question: "지방 분해에 도움이 되는 관리가 아닌 것은?", options: ["마사지", "운동", "고열량 식사", "고주파"], answer: 2 },
    { id: 25, topic: 2, question: "하체 비만의 특징은?", options: ["사과형", "배형", "복부 비만", "상체 비만"], answer: 1 },
    { id: 26, topic: 2, question: "체형관리 프로그램에 포함되지 않는 것은?", options: ["식이요법", "운동", "수면 무시", "생활습관 개선"], answer: 2 },
    { id: 27, topic: 2, question: "기초대사량에 영향을 주는 요인이 아닌 것은?", options: ["나이", "성별", "혈액형", "근육량"], answer: 2 },
    { id: 28, topic: 2, question: "체형관리 기기가 아닌 것은?", options: ["고주파", "저주파", "청진기", "석션"], answer: 2 },
    { id: 29, topic: 2, question: "효과적인 체형관리를 위한 식습관은?", options: ["폭식", "규칙적인 식사", "야식", "편식"], answer: 1 },
    { id: 30, topic: 2, question: "바디 랩의 효과가 아닌 것은?", options: ["발한 촉진", "노폐물 배출", "체중 증가", "피부 탄력"], answer: 2 },

    // 림프·순환 (31-40)
    { id: 31, topic: 3, question: "림프절의 주요 기능은?", options: ["산소 공급", "면역 기능", "영양 공급", "체온 조절"], answer: 1 },
    { id: 32, topic: 3, question: "림프 드레나지의 목적이 아닌 것은?", options: ["부종 감소", "노폐물 배출", "지방 증가", "면역력 강화"], answer: 2 },
    { id: 33, topic: 3, question: "림프 마사지의 압력은?", options: ["매우 강함", "가볍고 리드미컬", "압력 무관", "깊은 압력"], answer: 1 },
    { id: 34, topic: 3, question: "림프액의 특징은?", options: ["붉은색", "무색 투명", "검은색", "노란색"], answer: 1 },
    { id: 35, topic: 3, question: "주요 림프절 위치가 아닌 것은?", options: ["겨드랑이", "서혜부", "손바닥", "목"], answer: 2 },
    { id: 36, topic: 3, question: "림프 순환이 원활하지 않을 때 나타나는 현상은?", options: ["체중 감소", "부종", "피부 탄력 증가", "근육 강화"], answer: 1 },
    { id: 37, topic: 3, question: "혈액순환 촉진에 도움이 되는 것은?", options: ["장시간 좌식", "규칙적인 운동", "흡연", "고염분 식사"], answer: 1 },
    { id: 38, topic: 3, question: "정맥 순환 촉진을 위한 자세는?", options: ["다리 낮춤", "다리 높임", "자세 무관", "웅크림"], answer: 1 },
    { id: 39, topic: 3, question: "림프 드레나지 금기 사항이 아닌 것은?", options: ["감염", "암 환자", "건강한 상태", "혈전"], answer: 2 },
    { id: 40, topic: 3, question: "림프 마사지 방향은?", options: ["림프절에서 멀리", "림프절 방향", "방향 무관", "아래 방향만"], answer: 1 },

    // 제모·왁싱 (41-50)
    { id: 41, topic: 4, question: "왁싱의 원리는?", options: ["화학적 용해", "물리적 제거", "레이저 파괴", "전기 분해"], answer: 1 },
    { id: 42, topic: 4, question: "하드왁스의 특징은?", options: ["스트립 사용", "스트립 불필요", "저온 사용", "액체 상태"], answer: 1 },
    { id: 43, topic: 4, question: "소프트왁스 사용 시 필요한 것은?", options: ["핀셋", "왁싱 스트립", "가위", "면도기"], answer: 1 },
    { id: 44, topic: 4, question: "왁싱 후 피해야 할 것은?", options: ["보습", "진정", "사우나", "냉찜질"], answer: 2 },
    { id: 45, topic: 4, question: "왁싱 전 적정 모발 길이는?", options: ["1mm 미만", "3-5mm", "10mm 이상", "길이 무관"], answer: 1 },
    { id: 46, topic: 4, question: "왁싱 금기 사항이 아닌 것은?", options: ["피부 염증", "상처 부위", "건강한 피부", "정맥류"], answer: 2 },
    { id: 47, topic: 4, question: "브라질리언 왁싱 부위는?", options: ["팔", "다리", "비키니 라인", "겨드랑이"], answer: 2 },
    { id: 48, topic: 4, question: "왁싱 후 발생할 수 있는 문제가 아닌 것은?", options: ["홍반", "내성모", "피부 탄력 증가", "색소침착"], answer: 2 },
    { id: 49, topic: 4, question: "왁싱 제거 방향은?", options: ["모발 성장 방향", "모발 반대 방향", "방향 무관", "위쪽으로만"], answer: 1 },
    { id: 50, topic: 4, question: "왁싱 후 적절한 관리는?", options: ["즉시 태닝", "진정 젤 도포", "뜨거운 물 샤워", "강한 스크럽"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-skin-body-care-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-skin-body-care-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-skin-body-care-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(피부) 전신관리 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
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
              <h1 className="text-xl font-bold text-gray-800">전신관리</h1>
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
