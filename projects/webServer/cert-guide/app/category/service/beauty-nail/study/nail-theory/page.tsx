'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function NailTheoryPage() {
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
    { id: 0, name: '손발 구조', count: 10 },
    { id: 1, name: '네일 구조', count: 10 },
    { id: 2, name: '위생 소독', count: 10 },
    { id: 3, name: '피부 질환', count: 10 },
    { id: 4, name: '화장품학', count: 10 },
  ];

  const questions = [
    // 손발 구조 (1-10)
    { id: 1, topic: 0, question: "손에 있는 뼈의 개수는?", options: ["19개", "27개", "33개", "42개"], answer: 1 },
    { id: 2, topic: 0, question: "손가락을 굽히는 근육은?", options: ["굴근", "신근", "회내근", "회외근"], answer: 0 },
    { id: 3, topic: 0, question: "손목 관절의 종류는?", options: ["구상관절", "타원관절", "안장관절", "경첩관절"], answer: 1 },
    { id: 4, topic: 0, question: "발에 있는 뼈의 개수는?", options: ["19개", "22개", "26개", "30개"], answer: 2 },
    { id: 5, topic: 0, question: "손톱 밑에 있는 뼈는?", options: ["중수골", "수근골", "말절골", "기절골"], answer: 2 },
    { id: 6, topic: 0, question: "손가락 관절의 수는?", options: ["10개", "12개", "14개", "16개"], answer: 2 },
    { id: 7, topic: 0, question: "엄지손가락의 마디 수는?", options: ["1마디", "2마디", "3마디", "4마디"], answer: 1 },
    { id: 8, topic: 0, question: "손의 혈액 공급을 담당하는 동맥은?", options: ["경동맥", "요골동맥", "대퇴동맥", "쇄골하동맥"], answer: 1 },
    { id: 9, topic: 0, question: "발바닥의 아치를 유지하는 것은?", options: ["인대와 근육", "피부", "지방", "연골"], answer: 0 },
    { id: 10, topic: 0, question: "손등의 정맥이 잘 보이는 이유는?", options: ["혈압이 높아서", "피부가 얇아서", "근육이 없어서", "지방이 많아서"], answer: 1 },

    // 네일 구조 (11-20)
    { id: 11, topic: 1, question: "네일 플레이트의 주성분은?", options: ["콜라겐", "케라틴", "멜라닌", "엘라스틴"], answer: 1 },
    { id: 12, topic: 1, question: "네일이 자라는 속도는 월 평균?", options: ["1mm", "3mm", "5mm", "7mm"], answer: 1 },
    { id: 13, topic: 1, question: "네일 매트릭스의 기능은?", options: ["보호", "네일 생성", "수분 공급", "색소 형성"], answer: 1 },
    { id: 14, topic: 1, question: "큐티클의 역할은?", options: ["영양 공급", "세균 침입 방지", "네일 성장", "색소 형성"], answer: 1 },
    { id: 15, topic: 1, question: "루눌라(반월)는 어디에 위치하는가?", options: ["네일 끝", "네일 뿌리 부근", "네일 옆면", "네일 밑면"], answer: 1 },
    { id: 16, topic: 1, question: "네일 베드의 색이 분홍색인 이유는?", options: ["멜라닌", "모세혈관", "케라틴", "지방"], answer: 1 },
    { id: 17, topic: 1, question: "프리엣지(free edge)란?", options: ["네일 뿌리", "네일 끝 흰 부분", "큐티클", "네일 옆면"], answer: 1 },
    { id: 18, topic: 1, question: "네일의 수분 함량은 약?", options: ["5%", "10-15%", "25-30%", "40%"], answer: 1 },
    { id: 19, topic: 1, question: "네일 폴드(nail fold)의 위치는?", options: ["네일 끝", "네일 측면", "네일 뿌리 위 피부", "네일 밑"], answer: 2 },
    { id: 20, topic: 1, question: "건강한 네일의 특징이 아닌 것은?", options: ["매끄러움", "분홍빛", "세로줄", "광택"], answer: 2 },

    // 위생 소독 (21-30)
    { id: 21, topic: 2, question: "소독과 멸균의 차이점은?", options: ["같은 의미", "멸균이 더 강력", "소독이 더 강력", "용도가 다름"], answer: 1 },
    { id: 22, topic: 2, question: "알코올 소독제의 적정 농도는?", options: ["50%", "70%", "90%", "100%"], answer: 1 },
    { id: 23, topic: 2, question: "자외선 소독기의 작용 원리는?", options: ["열 살균", "DNA 파괴", "화학 반응", "건조"], answer: 1 },
    { id: 24, topic: 2, question: "금속 도구 소독에 적합한 방법은?", options: ["알코올 침적", "자외선 소독", "고압증기멸균", "물 세척"], answer: 2 },
    { id: 25, topic: 2, question: "일회용품 사용의 장점이 아닌 것은?", options: ["위생적", "편리", "경제적", "교차감염 방지"], answer: 2 },
    { id: 26, topic: 2, question: "손 씻기에 권장되는 시간은?", options: ["5초", "10초", "20초 이상", "1분"], answer: 2 },
    { id: 27, topic: 2, question: "네일샵에서 B형 간염 예방을 위해 필요한 것은?", options: ["마스크", "장갑 착용", "고글", "앞치마"], answer: 1 },
    { id: 28, topic: 2, question: "소독제의 보관 시 주의사항은?", options: ["직사광선 노출", "어두운 곳 보관", "냉동 보관", "개봉 후 혼합"], answer: 1 },
    { id: 29, topic: 2, question: "작업 전 손 소독을 해야 하는 이유는?", options: ["향기", "미관", "감염 예방", "피부 보호"], answer: 2 },
    { id: 30, topic: 2, question: "네일 파일 소독 방법으로 부적절한 것은?", options: ["알코올 스프레이", "자외선 소독", "물에 삶기", "소독티슈"], answer: 2 },

    // 피부 질환 (31-40)
    { id: 31, topic: 3, question: "조갑백선(손톱무좀)의 원인은?", options: ["세균", "바이러스", "진균", "기생충"], answer: 2 },
    { id: 32, topic: 3, question: "네일 시술이 금지되는 경우는?", options: ["건조한 피부", "감염성 질환", "색소 침착", "얇은 네일"], answer: 1 },
    { id: 33, topic: 3, question: "조갑주위염의 증상은?", options: ["네일 탈락", "주변 피부 발적, 부종", "네일 변색", "네일 비후"], answer: 1 },
    { id: 34, topic: 3, question: "내향성 발톱의 원인이 아닌 것은?", options: ["잘못된 커팅", "좁은 신발", "유전", "영양 과다"], answer: 3 },
    { id: 35, topic: 3, question: "조갑박리증이란?", options: ["네일이 두꺼워짐", "네일이 베드에서 분리", "네일 변색", "네일 균열"], answer: 1 },
    { id: 36, topic: 3, question: "접촉성 피부염의 원인이 되는 것은?", options: ["물", "공기", "알레르겐", "빛"], answer: 2 },
    { id: 37, topic: 3, question: "네일 세로줄의 주요 원인은?", options: ["감염", "노화", "외상", "영양 과다"], answer: 1 },
    { id: 38, topic: 3, question: "숟가락 손톱(스푼 네일)의 원인은?", options: ["비타민 과다", "철분 결핍", "단백질 과다", "수분 과다"], answer: 1 },
    { id: 39, topic: 3, question: "사마귀의 원인은?", options: ["세균", "진균", "바이러스", "기생충"], answer: 2 },
    { id: 40, topic: 3, question: "티눈과 굳은살의 차이점은?", options: ["위치", "핵의 유무", "크기", "색깔"], answer: 1 },

    // 화장품학 (41-50)
    { id: 41, topic: 4, question: "네일 폴리시의 주성분은?", options: ["물", "니트로셀룰로오스", "알코올", "글리세린"], answer: 1 },
    { id: 42, topic: 4, question: "큐티클 리무버의 주요 성분은?", options: ["산성", "알칼리성", "중성", "유성"], answer: 1 },
    { id: 43, topic: 4, question: "베이스 코트의 역할이 아닌 것은?", options: ["착색 방지", "접착력 향상", "네일 제거", "표면 정리"], answer: 2 },
    { id: 44, topic: 4, question: "탑 코트의 주요 기능은?", options: ["착색", "광택 부여", "큐티클 제거", "네일 강화"], answer: 1 },
    { id: 45, topic: 4, question: "아세톤의 용도는?", options: ["보습", "폴리시 제거", "소독", "영양 공급"], answer: 1 },
    { id: 46, topic: 4, question: "네일 강화제에 포함된 성분은?", options: ["알코올", "칼슘, 단백질", "오일", "색소"], answer: 1 },
    { id: 47, topic: 4, question: "젤 네일의 경화에 필요한 것은?", options: ["열", "UV/LED 램프", "공기", "물"], answer: 1 },
    { id: 48, topic: 4, question: "네일 오일의 주요 성분은?", options: ["알코올", "식물성 오일", "아세톤", "니트로셀룰로오스"], answer: 1 },
    { id: 49, topic: 4, question: "화장품의 유통기한 표시 의무화 품목은?", options: ["모든 화장품", "영유아용", "네일용", "색조 화장품"], answer: 1 },
    { id: 50, topic: 4, question: "프라이머의 역할은?", options: ["착색", "접착력 향상", "광택", "보습"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-nail-nail-theory-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-nail-nail-theory-progress', JSON.stringify({
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
    localStorage.removeItem('beauty-nail-nail-theory-progress');
  };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(네일) 네일 개론 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800">
              ← 뒤로
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">네일 개론</h1>
              <p className="text-sm text-gray-500">미용사(네일) 필기과목</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">전체 진행률</span>
            <span className="text-sm text-rose-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-green-600">정답: {score}개</span>
            <span className="text-red-500">오답: {answeredQuestions.size - score}개</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-rose-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span>
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
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <span className="font-medium">{index + 1}.</span> {option}
                {showResult && index === currentQ.answer && <span className="ml-2">✓</span>}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 p-4 bg-rose-50 rounded-xl">
              <p className="text-rose-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p>
              <p className="text-sm text-rose-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p>
              <button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900">
                🤖 AI에게 해설 요청하기
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button>
          <button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-600">다음 →</button>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
