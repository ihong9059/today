'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '클렌징 실기', count: 10 },
    { id: 1, name: '얼굴 매뉴얼테크닉', count: 10 },
    { id: 2, name: '팩·마스크 적용', count: 10 },
    { id: 3, name: '눈썹 정리', count: 10 },
    { id: 4, name: '제모·왁싱 실기', count: 10 },
  ];

  const questions = [
    // 클렌징 실기 (1-10)
    { id: 1, topic: 0, question: "클렌징 시술 전 준비사항으로 옳지 않은 것은?", options: ["손 소독", "헤어밴드 착용", "귀금속 제거", "화장 유지"], answer: 3 },
    { id: 2, topic: 0, question: "포인트 메이크업 제거 순서는?", options: ["눈→입술", "입술→눈", "동시에", "순서 무관"], answer: 0 },
    { id: 3, topic: 0, question: "아이 메이크업 리무버 적용 방법은?", options: ["강하게 문지름", "화장솜에 적셔 살짝 눌러줌", "물로만 세안", "비누로 문지름"], answer: 1 },
    { id: 4, topic: 0, question: "클렌징 크림 도포 시 적정 양은?", options: ["아주 소량", "적정량 (체리 크기)", "과다량", "양 무관"], answer: 1 },
    { id: 5, topic: 0, question: "클렌징 마사지 방향은?", options: ["아래에서 위로", "위에서 아래로", "방향 무관", "좌우로만"], answer: 0 },
    { id: 6, topic: 0, question: "클렌징 후 토너 사용의 목적은?", options: ["피부 건조", "잔여물 제거 및 pH 조절", "각질 증가", "피지 증가"], answer: 1 },
    { id: 7, topic: 0, question: "스팀 타월 적용 시간으로 적절한 것은?", options: ["30초", "2-3분", "10분", "시간 무관"], answer: 1 },
    { id: 8, topic: 0, question: "이중 세안 시 2차 클렌저로 적합한 것은?", options: ["오일 클렌저", "폼 클렌저", "클렌징 크림", "클렌징 오일"], answer: 1 },
    { id: 9, topic: 0, question: "클렌징 시술 시 고객 눈 보호 방법은?", options: ["눈 뜨게 함", "아이패드 적용", "무시", "강하게 닦음"], answer: 1 },
    { id: 10, topic: 0, question: "딥클렌징 전 피부 연화 방법은?", options: ["냉찜질", "스티머 적용", "건조 유지", "바로 진행"], answer: 1 },

    // 얼굴 매뉴얼테크닉 (11-20)
    { id: 11, topic: 1, question: "얼굴 마사지 시작 부위로 적합한 것은?", options: ["코", "이마", "턱", "볼"], answer: 2 },
    { id: 12, topic: 1, question: "림프 드레나지 시 압력의 특징은?", options: ["강한 압력", "가볍고 리드미컬", "압력 무관", "매우 빠름"], answer: 1 },
    { id: 13, topic: 1, question: "눈가 마사지 시 주의사항은?", options: ["강하게 누름", "약한 압력으로 조심스럽게", "문지름", "피함"], answer: 1 },
    { id: 14, topic: 1, question: "데콜테 마사지 범위는?", options: ["얼굴만", "목과 가슴 상부", "전신", "손만"], answer: 1 },
    { id: 15, topic: 1, question: "마사지 크림 도포량으로 적절한 것은?", options: ["최소량", "충분히 슬라이딩 가능한 양", "과다량", "양 무관"], answer: 1 },
    { id: 16, topic: 1, question: "에플러라지 동작의 특징은?", options: ["두드리기", "부드럽게 쓸어넘기기", "강하게 누르기", "진동"], answer: 1 },
    { id: 17, topic: 1, question: "페트리사지 동작의 효과는?", options: ["피부 진정", "근육 이완", "각질 제거", "피부 냉각"], answer: 1 },
    { id: 18, topic: 1, question: "마사지 종료 동작으로 적합한 것은?", options: ["강한 압력", "페더링 터치", "빠른 동작", "갑작스런 종료"], answer: 1 },
    { id: 19, topic: 1, question: "지압점 자극 시간으로 적절한 것은?", options: ["1초", "3-5초", "30초", "1분"], answer: 1 },
    { id: 20, topic: 1, question: "마사지 시간으로 적절한 것은?", options: ["5분", "15-20분", "60분", "시간 무관"], answer: 1 },

    // 팩·마스크 적용 (21-30)
    { id: 21, topic: 2, question: "팩 도포 시 피해야 할 부위는?", options: ["이마", "볼", "눈가·입술", "코"], answer: 2 },
    { id: 22, topic: 2, question: "모델링 마스크 혼합 비율의 원칙은?", options: ["물이 많게", "가루가 많게", "제조사 권장 비율", "비율 무관"], answer: 2 },
    { id: 23, topic: 2, question: "시트 마스크 적용 시간은?", options: ["5분", "15-20분", "60분", "하루 종일"], answer: 1 },
    { id: 24, topic: 2, question: "클레이 팩이 마르기 전 제거해야 하는 이유는?", options: ["시간 절약", "수분 빼앗김 방지", "색상 변화", "무관"], answer: 1 },
    { id: 25, topic: 2, question: "팩 제거 방법으로 올바른 것은?", options: ["강하게 떼어냄", "미온수로 부드럽게", "문지름", "그대로 둠"], answer: 1 },
    { id: 26, topic: 2, question: "고무 마스크 제거 방향은?", options: ["위에서 아래", "아래에서 위", "좌에서 우", "방향 무관"], answer: 1 },
    { id: 27, topic: 2, question: "팩 적용 전 피부 상태 확인 이유는?", options: ["시간 절약", "적합한 제품 선택", "무시해도 됨", "고객 기분"], answer: 1 },
    { id: 28, topic: 2, question: "팩 적용 중 고객 편안함을 위한 조치는?", options: ["대화 계속", "조용한 환경 조성", "음악 크게", "방치"], answer: 1 },
    { id: 29, topic: 2, question: "팩 후 필수 단계는?", options: ["재차 팩", "토너와 보습", "세안만", "종료"], answer: 1 },
    { id: 30, topic: 2, question: "앰플 도포 후 팩 적용의 목적은?", options: ["앰플 제거", "앰플 흡수 촉진", "앰플 희석", "무관"], answer: 1 },

    // 눈썹 정리 (31-40)
    { id: 31, topic: 3, question: "눈썹 모양 결정 시 고려사항이 아닌 것은?", options: ["얼굴형", "눈 모양", "발 크기", "선호 스타일"], answer: 2 },
    { id: 32, topic: 3, question: "눈썹 시작점 위치 측정 방법은?", options: ["콧볼에서 수직 연장선", "눈동자 중앙", "눈꼬리에서", "임의로"], answer: 0 },
    { id: 33, topic: 3, question: "눈썹 산 위치 측정 방법은?", options: ["콧볼에서 눈동자 바깥쪽 연장선", "눈 중앙", "눈 안쪽", "임의로"], answer: 0 },
    { id: 34, topic: 3, question: "눈썹 꼬리 위치 측정 방법은?", options: ["눈 중앙", "콧볼에서 눈꼬리 연장선", "눈 안쪽", "임의로"], answer: 1 },
    { id: 35, topic: 3, question: "트위저(족집게) 사용 시 주의사항은?", options: ["여러 개 동시 제거", "한 올씩 모발 방향으로", "반대 방향으로", "방향 무관"], answer: 1 },
    { id: 36, topic: 3, question: "눈썹 정리 전 진정 방법은?", options: ["냉찜질", "따뜻한 스팀", "건조", "무관"], answer: 1 },
    { id: 37, topic: 3, question: "눈썹 왁싱 후 관리는?", options: ["즉시 메이크업", "진정 젤 도포", "방치", "강한 세안"], answer: 1 },
    { id: 38, topic: 3, question: "눈썹 트리밍 시 사용하는 도구는?", options: ["면도기", "눈썹 가위와 빗", "일반 가위", "커터"], answer: 1 },
    { id: 39, topic: 3, question: "눈썹 정리 금기 사항은?", options: ["건강한 피부", "피부 염증", "정상 상태", "고객 요청"], answer: 1 },
    { id: 40, topic: 3, question: "눈썹 대칭 확인 방법은?", options: ["한쪽만 확인", "양쪽 동시 비교", "거울 없이", "확인 불필요"], answer: 1 },

    // 제모·왁싱 실기 (41-50)
    { id: 41, topic: 4, question: "왁싱 전 피부 준비로 올바른 것은?", options: ["로션 바름", "클렌징 후 건조", "오일 도포", "수분 크림"], answer: 1 },
    { id: 42, topic: 4, question: "하드왁스 적정 온도 확인 방법은?", options: ["손등에 소량 테스트", "바로 적용", "온도계만", "감으로"], answer: 0 },
    { id: 43, topic: 4, question: "왁스 도포 방향은?", options: ["모발 반대 방향", "모발 성장 방향", "방향 무관", "위에서 아래"], answer: 1 },
    { id: 44, topic: 4, question: "왁스 제거 방향은?", options: ["모발 성장 방향", "모발 반대 방향", "방향 무관", "아래에서 위"], answer: 1 },
    { id: 45, topic: 4, question: "왁싱 시 피부 당김의 목적은?", options: ["통증 증가", "통증 감소 및 효과적 제거", "무관", "재미"], answer: 1 },
    { id: 46, topic: 4, question: "왁싱 후 남은 왁스 제거 방법은?", options: ["물", "오일 또는 전용 리무버", "알코올", "문지름"], answer: 1 },
    { id: 47, topic: 4, question: "왁싱 후 발생한 홍반 진정 방법은?", options: ["방치", "알로에 젤 도포", "뜨거운 물", "마찰"], answer: 1 },
    { id: 48, topic: 4, question: "소프트왁스 스트립 제거 각도는?", options: ["90도", "피부와 평행하게", "45도", "각도 무관"], answer: 1 },
    { id: 49, topic: 4, question: "왁싱 시술 간격으로 적절한 것은?", options: ["매일", "4-6주", "6개월", "1년"], answer: 1 },
    { id: 50, topic: 4, question: "왁싱 후 주의사항으로 올바른 것은?", options: ["즉시 태닝", "24시간 사우나·수영 금지", "강한 운동", "뜨거운 물"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-skin-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-skin-practical-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-skin-practical-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(피부) 실기 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
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
              <h1 className="text-xl font-bold text-gray-800">실기</h1>
              <p className="text-sm text-gray-500">미용사(피부) 실기과목</p>
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
