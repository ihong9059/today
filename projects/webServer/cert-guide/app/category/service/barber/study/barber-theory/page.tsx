'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BarberTheoryStudyPage() {
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
    { id: 0, name: '이용의 역사', count: 10 },
    { id: 1, name: '두발 형태학', count: 10 },
    { id: 2, name: '이용 도구', count: 10 },
    { id: 3, name: '고객 상담', count: 10 },
    { id: 4, name: '서비스 매너', count: 10 },
  ];

  const questions = [
    // 이용의 역사 (10문항)
    { id: 1, topic: 0, question: "이용(理容)이라는 용어의 의미는?", options: ["머리를 자르는 것", "이치에 맞게 용모를 다스림", "얼굴을 관리함", "수염을 깎음"], answer: 1 },
    { id: 2, topic: 0, question: "고대 이집트에서 이발사의 역할은?", options: ["오락 담당", "의료·종교적 역할", "군사 담당", "농업 담당"], answer: 1 },
    { id: 3, topic: 0, question: "바버샵 폴(Barber Pole)의 빨간색이 상징하는 것은?", options: ["정맥", "동맥(피)", "붕대", "건강"], answer: 1 },
    { id: 4, topic: 0, question: "바버샵 폴의 파란색이 상징하는 것은?", options: ["동맥", "정맥", "붕대", "하늘"], answer: 1 },
    { id: 5, topic: 0, question: "바버샵 폴의 흰색이 상징하는 것은?", options: ["피", "정맥", "붕대", "건강"], answer: 2 },
    { id: 6, topic: 0, question: "중세 유럽에서 이발사가 겸업했던 직업은?", options: ["농부", "외과의사", "군인", "상인"], answer: 1 },
    { id: 7, topic: 0, question: "우리나라 최초의 이발소가 생긴 시기는?", options: ["조선 초기", "개화기", "일제강점기", "광복 이후"], answer: 1 },
    { id: 8, topic: 0, question: "이용업의 법적 근거가 되는 법률은?", options: ["식품위생법", "공중위생관리법", "의료법", "건축법"], answer: 1 },
    { id: 9, topic: 0, question: "이용사 자격제도가 시작된 시기는?", options: ["1950년대", "1960년대", "1970년대", "1980년대"], answer: 2 },
    { id: 10, topic: 0, question: "현대 바버샵 트렌드의 특징은?", options: ["여성 전용", "클래식과 현대의 조화", "면도만 전문", "파마 전문"], answer: 1 },

    // 두발 형태학 (10문항)
    { id: 11, topic: 1, question: "모발의 주성분은?", options: ["콜라겐", "케라틴", "멜라닌", "엘라스틴"], answer: 1 },
    { id: 12, topic: 1, question: "모발의 3층 구조 중 가장 바깥층은?", options: ["모수질", "모피질", "모표피", "모근"], answer: 2 },
    { id: 13, topic: 1, question: "모발의 색을 결정하는 색소는?", options: ["케라틴", "멜라닌", "콜라겐", "엘라스틴"], answer: 1 },
    { id: 14, topic: 1, question: "모발 성장주기 중 성장기의 특징은?", options: ["모발 탈락", "성장 정지", "활발한 세포 분열", "휴식 상태"], answer: 2 },
    { id: 15, topic: 1, question: "하루 평균 자연 탈모량은?", options: ["10~20개", "50~100개", "200~300개", "500개 이상"], answer: 1 },
    { id: 16, topic: 1, question: "두피의 pH 정상 범위는?", options: ["3.0~4.0", "4.5~5.5", "7.0~8.0", "9.0~10.0"], answer: 1 },
    { id: 17, topic: 1, question: "지성 두피의 특징은?", options: ["건조하고 각질 많음", "피지 분비 과다", "정상적 유수분 밸런스", "붉은 염증"], answer: 1 },
    { id: 18, topic: 1, question: "모발의 성장 속도는 한 달에 약?", options: ["0.5cm", "1~1.5cm", "3cm", "5cm"], answer: 1 },
    { id: 19, topic: 1, question: "남성형 탈모의 주요 원인은?", options: ["영양 부족", "DHT 호르몬", "스트레스만", "세균 감염"], answer: 1 },
    { id: 20, topic: 1, question: "모발의 굵기를 결정하는 부분은?", options: ["모표피", "모피질", "모수질", "모낭"], answer: 1 },

    // 이용 도구 (10문항)
    { id: 21, topic: 2, question: "클리퍼(바리깡)의 주요 용도는?", options: ["면도", "짧은 커트", "파마", "염색"], answer: 1 },
    { id: 22, topic: 2, question: "블런트 커팅에 주로 사용하는 가위는?", options: ["숱가위", "일반 커트 가위", "곡선 가위", "면도기"], answer: 1 },
    { id: 23, topic: 2, question: "숱가위(틴닝 시저)의 용도는?", options: ["길이 자르기", "숱 조절", "면도", "스타일링"], answer: 1 },
    { id: 24, topic: 2, question: "안전면도기와 일반면도기의 차이점은?", options: ["크기 차이", "날 보호 장치 유무", "가격 차이", "브랜드 차이"], answer: 1 },
    { id: 25, topic: 2, question: "콤(빗)의 치아 간격이 넓은 것의 용도는?", options: ["마무리 정리", "엉킨 모발 빗기", "정밀 커팅", "파마"], answer: 1 },
    { id: 26, topic: 2, question: "넥스트립의 용도는?", options: ["스타일링", "목 주변 잔머리 보호", "면도 보조", "염색 보호"], answer: 1 },
    { id: 27, topic: 2, question: "아이롱의 주요 기능은?", options: ["커트", "열을 이용한 스타일링", "면도", "두피 마사지"], answer: 1 },
    { id: 28, topic: 2, question: "드라이어 사용 시 적정 거리는?", options: ["5cm 이내", "15~20cm", "50cm 이상", "거리 무관"], answer: 1 },
    { id: 29, topic: 2, question: "클리퍼 날 교체 시기 판단 기준은?", options: ["색상 변화", "커팅력 저하", "소리 변화만", "외관만"], answer: 1 },
    { id: 30, topic: 2, question: "가위 관리 시 주의사항은?", options: ["물에 담가 보관", "오일링 후 건조 보관", "고온 소독", "세제로 세척"], answer: 1 },

    // 고객 상담 (10문항)
    { id: 31, topic: 3, question: "첫 고객 상담 시 가장 먼저 해야 할 것은?", options: ["바로 커트 시작", "원하는 스타일 파악", "제품 판매", "예약 확인만"], answer: 1 },
    { id: 32, topic: 3, question: "고객의 얼굴형 파악이 중요한 이유는?", options: ["요금 책정", "어울리는 스타일 제안", "시간 단축", "도구 선택"], answer: 1 },
    { id: 33, topic: 3, question: "둥근 얼굴형에 어울리는 헤어스타일은?", options: ["볼륨 있는 옆머리", "윗머리 볼륨으로 길어 보이게", "완전 삭발", "양옆 볼륨"], answer: 1 },
    { id: 34, topic: 3, question: "긴 얼굴형에 어울리는 헤어스타일은?", options: ["윗머리 높이", "옆으로 볼륨, 위는 낮게", "완전 밀착", "뒷머리만 길게"], answer: 1 },
    { id: 35, topic: 3, question: "고객 불만 처리의 첫 단계는?", options: ["변명", "경청과 공감", "환불", "무시"], answer: 1 },
    { id: 36, topic: 3, question: "상담 시 사용하면 안 되는 표현은?", options: ["어떤 스타일 원하세요?", "그건 안 됩니다", "이 스타일은 어떠세요?", "두피 상태를 봐드릴게요"], answer: 1 },
    { id: 37, topic: 3, question: "재방문 고객 관리 방법으로 적절한 것은?", options: ["매번 처음처럼 대화", "이전 서비스 기록 확인", "할인만 제공", "관리 불필요"], answer: 1 },
    { id: 38, topic: 3, question: "고객 두피 상태 확인이 필요한 이유는?", options: ["요금 인상", "적절한 서비스 제공", "시간 지연", "판매 목적만"], answer: 1 },
    { id: 39, topic: 3, question: "사진 참고 상담 시 주의할 점은?", options: ["사진 그대로 재현 약속", "고객 모발 상태와 비교 설명", "사진 무시", "추가 요금 안내만"], answer: 1 },
    { id: 40, topic: 3, question: "상담 기록 관리의 장점은?", options: ["법적 의무", "고객 맞춤 서비스 제공", "시간 낭비", "필수 아님"], answer: 1 },

    // 서비스 매너 (10문항)
    { id: 41, topic: 4, question: "이용사의 기본 복장 원칙은?", options: ["화려한 패션", "청결하고 단정한 복장", "자유 복장", "운동복"], answer: 1 },
    { id: 42, topic: 4, question: "고객 응대 시 기본 자세는?", options: ["무표정", "밝은 표정과 인사", "최소 대화", "빠른 작업만"], answer: 1 },
    { id: 43, topic: 4, question: "서비스 중 휴대폰 사용에 대한 원칙은?", options: ["자유롭게 사용", "긴급 시에만 최소화", "항상 사용 가능", "통화는 자유롭게"], answer: 1 },
    { id: 44, topic: 4, question: "케이프 착용 시 주의사항은?", options: ["느슨하게", "목 불편하지 않게 적절히", "최대한 조임", "착용 생략 가능"], answer: 1 },
    { id: 45, topic: 4, question: "작업 전 손 위생 관리는?", options: ["선택 사항", "필수적으로 손 세정", "고객 요청 시만", "하루 한 번"], answer: 1 },
    { id: 46, topic: 4, question: "서비스 완료 후 해야 할 것은?", options: ["바로 다음 고객", "거울로 확인시키고 마무리", "결제만 진행", "청소만"], answer: 1 },
    { id: 47, topic: 4, question: "대기 고객에 대한 응대 방법은?", options: ["무시", "예상 대기 시간 안내", "다른 곳 추천", "먼저 온 고객만 응대"], answer: 1 },
    { id: 48, topic: 4, question: "작업 중 고객과의 대화 원칙은?", options: ["대화 금지", "고객 성향에 맞춰 적절히", "계속 말하기", "사적인 이야기만"], answer: 1 },
    { id: 49, topic: 4, question: "고객 개인정보 관리 원칙은?", options: ["공개 가능", "철저한 비밀 유지", "동료와 공유", "SNS 게시"], answer: 1 },
    { id: 50, topic: 4, question: "서비스 공간 청결 유지 시기는?", options: ["영업 종료 후만", "고객 퇴장 시마다", "일주일에 한 번", "한 달에 한 번"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('barber-theory-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('barber-theory-progress', JSON.stringify({
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
    localStorage.removeItem('barber-theory-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`이용사 이용이론: ${question}`);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/barber/exam" className="text-slate-600 hover:text-slate-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-blue-500 hover:text-blue-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 이용이론</h1>
          <p className="text-gray-500">이용의 역사, 두발 형태학, 도구, 상담, 매너</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-slate-50 hover:border-slate-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-slate-600 hover:text-slate-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-slate-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-slate-600 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
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
