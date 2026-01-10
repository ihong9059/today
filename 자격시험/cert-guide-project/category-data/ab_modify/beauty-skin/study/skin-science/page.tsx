'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SkinSciencePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '피부 구조', count: 10 },
    { id: 1, name: '피부 기능', count: 10 },
    { id: 2, name: '피부 유형', count: 10 },
    { id: 3, name: '피부 노화', count: 10 },
    { id: 4, name: '피부 면역', count: 10 },
  ];

  const questions = [
    // 피부 구조 (1-10)
    { id: 1, topic: 0, question: "피부의 가장 바깥층을 형성하는 것은?", options: ["진피", "표피", "피하지방", "근육층"], answer: 1 },
    { id: 2, topic: 0, question: "표피의 가장 바깥층은?", options: ["기저층", "유극층", "과립층", "각질층"], answer: 3 },
    { id: 3, topic: 0, question: "멜라닌 색소를 생성하는 세포는?", options: ["각질세포", "멜라노사이트", "랑게르한스세포", "섬유아세포"], answer: 1 },
    { id: 4, topic: 0, question: "진피의 주요 구성 성분이 아닌 것은?", options: ["콜라겐", "엘라스틴", "케라틴", "히알루론산"], answer: 2 },
    { id: 5, topic: 0, question: "표피와 진피 사이의 경계 부위는?", options: ["피하조직", "기저막", "과립층", "유두층"], answer: 1 },
    { id: 6, topic: 0, question: "진피의 상부층으로 유두 형태를 이루는 층은?", options: ["망상층", "유두층", "기저층", "과립층"], answer: 1 },
    { id: 7, topic: 0, question: "표피의 각질형성세포가 분열하는 층은?", options: ["각질층", "과립층", "유극층", "기저층"], answer: 3 },
    { id: 8, topic: 0, question: "피부 탄력의 주요 역할을 하는 섬유는?", options: ["콜라겐섬유", "엘라스틴섬유", "케라틴섬유", "레티쿨린섬유"], answer: 1 },
    { id: 9, topic: 0, question: "피하지방층의 주요 기능이 아닌 것은?", options: ["체온 유지", "충격 흡수", "에너지 저장", "색소 생성"], answer: 3 },
    { id: 10, topic: 0, question: "표피 세포의 턴오버 주기는 약 며칠인가?", options: ["7일", "14일", "28일", "42일"], answer: 2 },

    // 피부 기능 (11-20)
    { id: 11, topic: 1, question: "피부의 보호 기능에 해당하지 않는 것은?", options: ["물리적 보호", "화학적 보호", "생물학적 보호", "영양 공급"], answer: 3 },
    { id: 12, topic: 1, question: "피부의 체온 조절에 관여하는 것은?", options: ["모낭", "피지선", "한선", "멜라노사이트"], answer: 2 },
    { id: 13, topic: 1, question: "피부의 감각 기능을 담당하는 수용체가 아닌 것은?", options: ["마이스너소체", "파치니소체", "멜라노솜", "자유신경종말"], answer: 2 },
    { id: 14, topic: 1, question: "피부의 pH 유지에 관여하는 것은?", options: ["산성피지막", "알칼리피지막", "중성피지막", "염기피지막"], answer: 0 },
    { id: 15, topic: 1, question: "피부의 정상 pH 범위는?", options: ["3.5~4.5", "4.5~6.5", "6.5~7.5", "7.5~8.5"], answer: 1 },
    { id: 16, topic: 1, question: "자외선을 차단하는 피부 색소는?", options: ["헤모글로빈", "멜라닌", "카로틴", "빌리루빈"], answer: 1 },
    { id: 17, topic: 1, question: "피부 호흡에서 배출되는 주요 노폐물은?", options: ["산소", "이산화탄소", "질소", "수소"], answer: 1 },
    { id: 18, topic: 1, question: "피부의 비타민 D 합성에 필요한 것은?", options: ["자외선 A", "자외선 B", "자외선 C", "적외선"], answer: 1 },
    { id: 19, topic: 1, question: "피부의 수분 증발을 막는 층은?", options: ["기저층", "각질층", "유극층", "과립층"], answer: 1 },
    { id: 20, topic: 1, question: "피지 분비에 영향을 주는 호르몬은?", options: ["인슐린", "안드로겐", "에스트로겐", "글루카곤"], answer: 1 },

    // 피부 유형 (21-30)
    { id: 21, topic: 2, question: "건성 피부의 특징이 아닌 것은?", options: ["모공이 작음", "유분 부족", "번들거림", "당김 현상"], answer: 2 },
    { id: 22, topic: 2, question: "지성 피부에 적합한 관리법은?", options: ["유분 크림 사용", "딥클렌징", "스팀 피함", "보습제 피함"], answer: 1 },
    { id: 23, topic: 2, question: "복합성 피부의 특징은?", options: ["전체적 건조", "전체적 지성", "T존 지성, U존 건성", "전체적 정상"], answer: 2 },
    { id: 24, topic: 2, question: "민감성 피부의 특징이 아닌 것은?", options: ["홍조 발생", "쉽게 자극", "두꺼운 각질층", "모세혈관 확장"], answer: 2 },
    { id: 25, topic: 2, question: "피부 유형을 결정하는 주요 요인은?", options: ["피지 분비량", "색소량", "모발 상태", "손톱 상태"], answer: 0 },
    { id: 26, topic: 2, question: "정상 피부의 유수분 밸런스 상태는?", options: ["유분 과다", "수분 과다", "유수분 균형", "유수분 부족"], answer: 2 },
    { id: 27, topic: 2, question: "탈수 피부의 주요 원인이 아닌 것은?", options: ["수분 섭취 부족", "건조한 환경", "피지 과다", "에어컨 사용"], answer: 2 },
    { id: 28, topic: 2, question: "여드름성 피부의 특징은?", options: ["모공 축소", "피지 분비 감소", "면포 형성", "건조함"], answer: 2 },
    { id: 29, topic: 2, question: "피부 유형 분석에 사용되는 기기가 아닌 것은?", options: ["우드램프", "피부분석기", "청진기", "수분측정기"], answer: 2 },
    { id: 30, topic: 2, question: "계절에 따른 피부 변화 설명으로 옳은 것은?", options: ["여름에 건조해짐", "겨울에 지성화", "여름에 피지 증가", "겨울에 피지 증가"], answer: 2 },

    // 피부 노화 (31-40)
    { id: 31, topic: 3, question: "내인성 노화의 원인은?", options: ["자외선", "유전적 요인", "흡연", "오염"], answer: 1 },
    { id: 32, topic: 3, question: "광노화의 주요 원인은?", options: ["가시광선", "자외선", "적외선", "감마선"], answer: 1 },
    { id: 33, topic: 3, question: "피부 노화로 인해 감소하는 것은?", options: ["주름", "색소침착", "콜라겐", "각질"], answer: 2 },
    { id: 34, topic: 3, question: "노화 피부의 특징이 아닌 것은?", options: ["탄력 저하", "주름 증가", "수분 증가", "피부 위축"], answer: 2 },
    { id: 35, topic: 3, question: "활성산소로 인한 피부 손상을 막는 것은?", options: ["산화제", "항산화제", "방부제", "계면활성제"], answer: 1 },
    { id: 36, topic: 3, question: "피부 노화 예방에 효과적인 것은?", options: ["자외선 노출", "흡연", "자외선 차단제", "스트레스"], answer: 2 },
    { id: 37, topic: 3, question: "주름의 형성 원인이 아닌 것은?", options: ["콜라겐 감소", "엘라스틴 감소", "수분 증가", "근육 수축"], answer: 2 },
    { id: 38, topic: 3, question: "노화 피부에 적합한 성분은?", options: ["알코올", "레티놀", "인공향료", "미네랄오일"], answer: 1 },
    { id: 39, topic: 3, question: "피부 처짐의 주요 원인은?", options: ["콜라겐 증가", "탄력 섬유 감소", "수분 증가", "피지 증가"], answer: 1 },
    { id: 40, topic: 3, question: "외인성 노화 요인이 아닌 것은?", options: ["자외선", "흡연", "나이", "대기오염"], answer: 2 },

    // 피부 면역 (41-50)
    { id: 41, topic: 4, question: "피부 면역에 관여하는 세포는?", options: ["멜라노사이트", "랑게르한스세포", "섬유아세포", "지방세포"], answer: 1 },
    { id: 42, topic: 4, question: "피부의 선천 면역 기능을 담당하는 것은?", options: ["항체", "각질층", "멜라닌", "콜라겐"], answer: 1 },
    { id: 43, topic: 4, question: "피부 알레르기 반응의 특징이 아닌 것은?", options: ["가려움", "홍반", "부종", "멜라닌 증가"], answer: 3 },
    { id: 44, topic: 4, question: "아토피 피부염의 특징은?", options: ["지성 피부", "건조하고 가려움", "피지 과다", "모공 확대"], answer: 1 },
    { id: 45, topic: 4, question: "피부 감염을 막는 물질이 아닌 것은?", options: ["항균 펩타이드", "피지", "히알루론산", "라이소자임"], answer: 2 },
    { id: 46, topic: 4, question: "피부의 산성피지막이 방어하는 것은?", options: ["자외선", "세균", "열", "기계적 자극"], answer: 1 },
    { id: 47, topic: 4, question: "면역 반응으로 인한 피부 증상이 아닌 것은?", options: ["두드러기", "접촉성 피부염", "탄력 증가", "아토피"], answer: 2 },
    { id: 48, topic: 4, question: "피부의 방어 기능을 약화시키는 것은?", options: ["충분한 수면", "균형 잡힌 식사", "과도한 스트레스", "적절한 운동"], answer: 2 },
    { id: 49, topic: 4, question: "피부 면역력 강화에 도움이 되는 것은?", options: ["수면 부족", "비타민 C 섭취", "흡연", "음주"], answer: 1 },
    { id: 50, topic: 4, question: "피부 장벽 기능이 저하되면 나타나는 현상은?", options: ["탄력 증가", "외부 자극에 민감", "주름 감소", "피지 감소"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-skin-skin-science-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-skin-skin-science-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-skin-skin-science-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(피부) 피부학 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
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
              <h1 className="text-xl font-bold text-gray-800">피부학</h1>
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
