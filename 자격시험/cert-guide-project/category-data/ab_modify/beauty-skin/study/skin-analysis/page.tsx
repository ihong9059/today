'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SkinAnalysisPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '피부 분석 기초', count: 10 },
    { id: 1, name: '피부 측정 기기', count: 10 },
    { id: 2, name: '피부 트러블', count: 10 },
    { id: 3, name: '피부 상담', count: 10 },
    { id: 4, name: '고객 관리', count: 10 },
  ];

  const questions = [
    // 피부 분석 기초 (1-10)
    { id: 1, topic: 0, question: "피부 분석 시 가장 먼저 확인해야 하는 것은?", options: ["피부 탄력", "피부 유형", "주름 상태", "색소 침착"], answer: 1 },
    { id: 2, topic: 0, question: "피부 분석의 목적이 아닌 것은?", options: ["피부 상태 파악", "적합한 관리 선택", "제품 판매 강요", "문제점 발견"], answer: 2 },
    { id: 3, topic: 0, question: "시각적 피부 분석 시 관찰하는 항목이 아닌 것은?", options: ["피부색", "모공 크기", "혈압", "주름"], answer: 2 },
    { id: 4, topic: 0, question: "촉각적 피부 분석으로 알 수 있는 것은?", options: ["피부 온도", "멜라닌 양", "자외선 손상도", "혈관 상태"], answer: 0 },
    { id: 5, topic: 0, question: "피부 분석 환경의 적정 조명은?", options: ["강한 직사광선", "자연 주광", "어두운 조명", "붉은 조명"], answer: 1 },
    { id: 6, topic: 0, question: "피부 분석 전 클렌징의 목적은?", options: ["제품 판매", "정확한 분석", "시간 끌기", "피부 자극"], answer: 1 },
    { id: 7, topic: 0, question: "피부 분석 기록 카드에 포함되지 않는 것은?", options: ["피부 유형", "알레르기 여부", "주민등록번호", "피부 고민"], answer: 2 },
    { id: 8, topic: 0, question: "피부 두께 분석에서 얇은 피부의 특징은?", options: ["두꺼운 각질", "혈관 잘 보임", "큰 모공", "지성"], answer: 1 },
    { id: 9, topic: 0, question: "피부 분석 시 T존 부위는?", options: ["볼과 턱", "이마, 코, 턱", "눈가와 입가", "귀 주변"], answer: 1 },
    { id: 10, topic: 0, question: "피부 탄력 분석 방법은?", options: ["손으로 눌러 확인", "냄새 맡기", "두드리기", "문지르기"], answer: 0 },

    // 피부 측정 기기 (11-20)
    { id: 11, topic: 1, question: "우드램프의 주요 용도는?", options: ["피부 수분 측정", "피부 상태 관찰", "체온 측정", "혈압 측정"], answer: 1 },
    { id: 12, topic: 1, question: "우드램프에서 정상 피부는 어떤 색으로 보이는가?", options: ["흰색", "청백색", "노란색", "주황색"], answer: 1 },
    { id: 13, topic: 1, question: "피부 수분 측정기의 원리는?", options: ["자외선 반사", "전기 전도도", "적외선 흡수", "초음파 반사"], answer: 1 },
    { id: 14, topic: 1, question: "피지 측정기의 측정 부위로 적합한 곳은?", options: ["손등", "이마", "발바닥", "손바닥"], answer: 1 },
    { id: 15, topic: 1, question: "피부 확대 분석에 사용되는 기기는?", options: ["스킨스코프", "체중계", "혈압계", "청진기"], answer: 0 },
    { id: 16, topic: 1, question: "우드램프에서 여드름 피부는 어떤 색으로 보이는가?", options: ["청백색", "주황색", "녹색", "자주색"], answer: 1 },
    { id: 17, topic: 1, question: "피부 탄력 측정기가 측정하는 것은?", options: ["피지량", "수분량", "피부 회복력", "색소량"], answer: 2 },
    { id: 18, topic: 1, question: "멜라닌 측정기의 용도는?", options: ["주름 측정", "색소 침착 측정", "수분 측정", "탄력 측정"], answer: 1 },
    { id: 19, topic: 1, question: "피부 pH 측정기의 정상 범위는?", options: ["3.0~4.0", "4.5~6.5", "7.0~8.0", "8.5~9.5"], answer: 1 },
    { id: 20, topic: 1, question: "피부 진단 기기 사용 전 주의사항이 아닌 것은?", options: ["기기 소독", "고객 동의", "메이크업 유지", "프로브 청결"], answer: 2 },

    // 피부 트러블 (21-30)
    { id: 21, topic: 2, question: "여드름의 주요 원인이 아닌 것은?", options: ["피지 과다", "모공 막힘", "세균 감염", "자외선 부족"], answer: 3 },
    { id: 22, topic: 2, question: "면포(블랙헤드)의 형성 원인은?", options: ["수분 부족", "피지 산화", "혈관 확장", "멜라닌 증가"], answer: 1 },
    { id: 23, topic: 2, question: "주사(로사세아)의 특징은?", options: ["피지 감소", "얼굴 홍조", "피부 건조", "각질 증가"], answer: 1 },
    { id: 24, topic: 2, question: "기미의 주요 원인이 아닌 것은?", options: ["자외선", "호르몬 변화", "임신", "건조함"], answer: 3 },
    { id: 25, topic: 2, question: "색소 침착 트러블 관리 시 주의할 성분은?", options: ["알부틴", "하이드로퀴논", "비타민 C", "나이아신아마이드"], answer: 1 },
    { id: 26, topic: 2, question: "모공 확대의 원인이 아닌 것은?", options: ["피지 과다", "탄력 저하", "수분 과다", "노화"], answer: 2 },
    { id: 27, topic: 2, question: "민감성 피부 트러블 관리 원칙은?", options: ["강한 자극 제품", "진정 관리", "고농도 산 사용", "잦은 필링"], answer: 1 },
    { id: 28, topic: 2, question: "건조로 인한 피부 트러블 증상은?", options: ["피지 과다", "각질 들뜸", "여드름", "모공 확대"], answer: 1 },
    { id: 29, topic: 2, question: "피부 트러블 악화 요인이 아닌 것은?", options: ["스트레스", "수면 부족", "균형 잡힌 식사", "흡연"], answer: 2 },
    { id: 30, topic: 2, question: "여드름 흉터의 종류가 아닌 것은?", options: ["아이스픽 흉터", "롤링 흉터", "박스카 흉터", "기미 흉터"], answer: 3 },

    // 피부 상담 (31-40)
    { id: 31, topic: 3, question: "피부 상담의 목적이 아닌 것은?", options: ["고객 요구 파악", "적절한 관리 제안", "강매", "신뢰 구축"], answer: 2 },
    { id: 32, topic: 3, question: "효과적인 상담 기법은?", options: ["일방적 설명", "경청과 질문", "반박", "무관심"], answer: 1 },
    { id: 33, topic: 3, question: "상담 시 피해야 할 행동은?", options: ["눈 맞춤", "경청", "고객 말 끊기", "공감 표현"], answer: 2 },
    { id: 34, topic: 3, question: "피부 상담 카드 작성 시 포함할 내용이 아닌 것은?", options: ["생활 습관", "피부 고민", "신용카드 정보", "알레르기 여부"], answer: 2 },
    { id: 35, topic: 3, question: "상담 시 개방형 질문의 예시는?", options: ["예, 아니오로 답변", "피부 고민이 무엇인가요?", "지성 피부죠?", "건조하시죠?"], answer: 1 },
    { id: 36, topic: 3, question: "상담 시 고객의 기대 관리가 필요한 이유는?", options: ["과장 광고", "현실적 결과 기대", "무조건 약속", "빠른 판매"], answer: 1 },
    { id: 37, topic: 3, question: "재방문 상담 시 확인할 사항은?", options: ["새 고객 정보", "이전 관리 만족도", "다른 샵 방문 여부", "경쟁사 비방"], answer: 1 },
    { id: 38, topic: 3, question: "상담 시 전문 용어 사용의 적절한 방법은?", options: ["최대한 많이 사용", "고객 수준에 맞게 설명", "설명 없이 사용", "무조건 피함"], answer: 1 },
    { id: 39, topic: 3, question: "클레임 상담 시 올바른 태도는?", options: ["변명하기", "고객 탓하기", "경청 후 해결책 제시", "무시하기"], answer: 2 },
    { id: 40, topic: 3, question: "상담 종료 시 해야 할 것은?", options: ["빠른 퇴장", "다음 관리 예약 권유", "무관심", "다른 고객 응대"], answer: 1 },

    // 고객 관리 (41-50)
    { id: 41, topic: 4, question: "고객 관리의 목적이 아닌 것은?", options: ["고객 만족", "재방문 유도", "일회성 거래", "신뢰 구축"], answer: 2 },
    { id: 42, topic: 4, question: "고객 데이터베이스 관리의 중요성은?", options: ["개인정보 판매", "맞춤형 서비스", "스팸 발송", "경쟁사 공유"], answer: 1 },
    { id: 43, topic: 4, question: "VIP 고객 관리 방법이 아닌 것은?", options: ["특별 혜택", "우선 예약", "차별 대우 공개", "감사 표현"], answer: 2 },
    { id: 44, topic: 4, question: "고객 불만 처리 시 첫 번째로 해야 할 것은?", options: ["변명", "사과와 경청", "책임 전가", "무시"], answer: 1 },
    { id: 45, topic: 4, question: "고객 만족도 조사 방법이 아닌 것은?", options: ["설문조사", "전화 인터뷰", "SNS 모니터링", "고객 뒷담화"], answer: 3 },
    { id: 46, topic: 4, question: "고객 유지의 비용이 신규 고객 유치보다 저렴한 이유는?", options: ["이미 관계 형성", "광고 불필요", "무료 서비스", "품질 저하"], answer: 0 },
    { id: 47, topic: 4, question: "고객 생일 관리의 효과는?", options: ["의무 이행", "고객 감동", "비용 낭비", "업무 증가"], answer: 1 },
    { id: 48, topic: 4, question: "휴면 고객 관리 방법으로 적절한 것은?", options: ["포기", "재방문 유도 이벤트", "삭제", "무관심"], answer: 1 },
    { id: 49, topic: 4, question: "고객 정보 보호의 원칙이 아닌 것은?", options: ["동의 필수", "목적 내 사용", "제3자 판매 가능", "보안 유지"], answer: 2 },
    { id: 50, topic: 4, question: "효과적인 고객 후속 관리는?", options: ["관리 후 연락 안함", "관리 후 만족도 확인", "자동 문자만 발송", "경쟁사 추천"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-skin-skin-analysis-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-skin-skin-analysis-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-skin-skin-analysis-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(피부) 피부분석학 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
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
              <h1 className="text-xl font-bold text-gray-800">피부분석학</h1>
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
