'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HotelLawStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '관광기본법', count: 10 },
    { id: 1, name: '관광진흥법', count: 10 },
    { id: 2, name: '소비자보호', count: 10 },
    { id: 3, name: '노동법', count: 10 },
    { id: 4, name: '위생법규', count: 10 },
  ];

  const questions = [
    // 관광기본법 (10문항)
    { id: 1, topic: 0, question: "관광기본법의 목적으로 올바른 것은?", options: ["관광산업 억제", "관광 진흥을 통한 국민경제 발전", "외국인 입국 제한", "관광지 폐쇄"], answer: 1 },
    { id: 2, topic: 0, question: "관광기본법에서 정의하는 '관광'이란?", options: ["출퇴근 이동", "일상을 벗어나 자연·문화 등을 감상·체험하는 활동", "업무 출장만", "거주지 변경"], answer: 1 },
    { id: 3, topic: 0, question: "관광진흥 기본계획 수립 주기는?", options: ["매년", "3년", "5년", "10년"], answer: 2 },
    { id: 4, topic: 0, question: "관광기본법상 관광 진흥의 기본 방향이 아닌 것은?", options: ["국민 관광 활성화", "국제 관광 촉진", "관광산업 축소", "관광 인력 양성"], answer: 2 },
    { id: 5, topic: 0, question: "관광기본법에 따른 관광 통계 작성 책임은?", options: ["개별 호텔", "문화체육관광부", "지방자치단체만", "관광객"], answer: 1 },
    { id: 6, topic: 0, question: "관광기본법상 관광 취약계층 지원 대상이 아닌 것은?", options: ["저소득층", "장애인", "고액 자산가", "노인"], answer: 2 },
    { id: 7, topic: 0, question: "관광기본법에서 규정하는 관광의 날은?", options: ["1월 1일", "5월 5일", "9월 27일", "12월 25일"], answer: 2 },
    { id: 8, topic: 0, question: "관광기본법상 지역 관광 활성화를 위한 지원 주체는?", options: ["외국 정부", "국가 및 지방자치단체", "개인 사업자만", "관광객"], answer: 1 },
    { id: 9, topic: 0, question: "관광기본법의 관광산업 범위에 포함되지 않는 것은?", options: ["여행업", "숙박업", "군사시설업", "관광편의시설업"], answer: 2 },
    { id: 10, topic: 0, question: "관광기본법상 관광 진흥을 위한 재원 조달 방법이 아닌 것은?", options: ["관광진흥개발기금", "정부 예산", "관광세 징수 불가", "민간 투자 유치"], answer: 2 },

    // 관광진흥법 (10문항)
    { id: 11, topic: 1, question: "관광진흥법상 관광사업의 종류가 아닌 것은?", options: ["여행업", "관광숙박업", "제조업", "유원시설업"], answer: 2 },
    { id: 12, topic: 1, question: "호텔업 등록 신청 기관은?", options: ["문화체육관광부", "특별자치도지사 또는 시장·군수·구청장", "경찰서", "세무서"], answer: 1 },
    { id: 13, topic: 1, question: "관광진흥법상 호텔업의 등급 결정 기관은?", options: ["호텔 자체", "한국관광공사 또는 등급심사기관", "경찰청", "국토교통부"], answer: 1 },
    { id: 14, topic: 1, question: "관광진흥법상 관광사업자 준수사항이 아닌 것은?", options: ["안전 관리", "가격 표시", "고객 차별 대우", "자격증 게시"], answer: 2 },
    { id: 15, topic: 1, question: "관광숙박업 등록 취소 사유가 아닌 것은?", options: ["거짓 등록", "영업정지 기간 중 영업", "고객 만족도 우수", "등록 기준 미달"], answer: 2 },
    { id: 16, topic: 1, question: "관광진흥법상 관광 편의시설업에 해당하는 것은?", options: ["여행업", "관광식당업", "항공운송업", "보험업"], answer: 1 },
    { id: 17, topic: 1, question: "관광진흥법에 따른 관광특구의 지정 목적은?", options: ["관광객 감소", "관광 활성화 및 편의 증진", "관광지 폐쇄", "외국인 입국 금지"], answer: 1 },
    { id: 18, topic: 1, question: "관광진흥법상 호텔업 종류가 아닌 것은?", options: ["관광호텔업", "수상관광호텔업", "한국전통호텔업", "공장호텔업"], answer: 3 },
    { id: 19, topic: 1, question: "관광진흥법상 관광사업자의 보험 가입 의무와 관련된 내용은?", options: ["보험 가입 불필요", "고객 피해 배상을 위한 보험 가입 의무", "정부가 대신 가입", "외국 보험만 허용"], answer: 1 },
    { id: 20, topic: 1, question: "관광진흥법 위반 시 과태료 부과 주체는?", options: ["법원", "행정기관(시·도지사 등)", "관광객", "호텔"], answer: 1 },

    // 소비자보호 (10문항)
    { id: 21, topic: 2, question: "소비자기본법상 소비자의 권리가 아닌 것은?", options: ["안전할 권리", "알 권리", "선택할 권리", "무제한 환불 권리"], answer: 3 },
    { id: 22, topic: 2, question: "호텔 예약 취소 시 위약금 부과가 적법한 경우는?", options: ["사전 고지 없이 부과", "약관에 명시하고 사전 동의받은 경우", "임의로 결정", "고객 동의 없이 전액 몰수"], answer: 1 },
    { id: 23, topic: 2, question: "불공정 약관의 예시는?", options: ["합리적 취소 규정", "고객에게 일방적으로 불리한 조항", "명확한 가격 표시", "공정한 환불 정책"], answer: 1 },
    { id: 24, topic: 2, question: "소비자 피해구제 절차의 첫 단계는?", options: ["법원 소송", "사업자와 직접 교섭", "언론 보도", "시위"], answer: 1 },
    { id: 25, topic: 2, question: "한국소비자원의 역할이 아닌 것은?", options: ["소비자 상담", "피해구제 지원", "형사 처벌", "소비자 교육"], answer: 2 },
    { id: 26, topic: 2, question: "호텔 서비스 불만족 시 소비자 대응 방법은?", options: ["불법 행위", "호텔에 정당한 보상 요청", "무조건 포기", "허위 리뷰 작성"], answer: 1 },
    { id: 27, topic: 2, question: "전자상거래 소비자보호법상 청약철회 기간은?", options: ["3일", "7일 이내", "30일", "1년"], answer: 1 },
    { id: 28, topic: 2, question: "소비자분쟁해결기준의 법적 성격은?", options: ["강제 규정", "권고 기준", "형사법", "국제법"], answer: 1 },
    { id: 29, topic: 2, question: "호텔 내 고객 물품 분실 시 호텔의 책임은?", options: ["항상 면책", "관리 소홀 시 배상 책임", "고객 전적 책임", "보험회사만 책임"], answer: 1 },
    { id: 30, topic: 2, question: "개인정보보호법상 호텔이 고객 정보 수집 시 필요한 것은?", options: ["별도 동의 불필요", "고객의 명시적 동의", "정부 허가", "경쟁사 통보"], answer: 1 },

    // 노동법 (10문항)
    { id: 31, topic: 3, question: "근로기준법상 법정 근로시간은 1주 최대?", options: ["40시간", "52시간", "60시간", "무제한"], answer: 1 },
    { id: 32, topic: 3, question: "호텔 직원의 최저임금 적용 여부는?", options: ["적용 제외", "최저임금법 적용", "호텔 자율 결정", "지역마다 다름"], answer: 1 },
    { id: 33, topic: 3, question: "연장근로 시 가산임금 비율은?", options: ["통상임금의 30%", "통상임금의 50%", "통상임금의 100%", "가산 없음"], answer: 1 },
    { id: 34, topic: 3, question: "호텔 직원의 연차유급휴가 발생 요건은?", options: ["1개월 근무", "1년간 80% 이상 출근", "5년 근무", "10년 근무"], answer: 1 },
    { id: 35, topic: 3, question: "부당해고에 해당하는 것은?", options: ["정당한 사유와 절차를 거친 해고", "징계 사유 없이 임의 해고", "정리해고 요건 충족", "근로자 동의하에 권고사직"], answer: 1 },
    { id: 36, topic: 3, question: "호텔 서비스직 근로자의 야간근로 가산은?", options: ["없음", "통상임금의 50%", "통상임금의 30%", "통상임금의 10%"], answer: 1 },
    { id: 37, topic: 3, question: "산업안전보건법상 호텔의 의무가 아닌 것은?", options: ["안전 교육", "작업환경 개선", "산재 은폐", "보호구 지급"], answer: 2 },
    { id: 38, topic: 3, question: "호텔 내 성희롱 발생 시 사업주의 조치는?", options: ["무시", "즉시 조사 및 피해자 보호", "가해자 편들기", "피해자 해고"], answer: 1 },
    { id: 39, topic: 3, question: "근로계약서 작성 시 필수 기재사항이 아닌 것은?", options: ["임금", "근로시간", "취미", "휴일"], answer: 2 },
    { id: 40, topic: 3, question: "4대 사회보험에 해당하지 않는 것은?", options: ["국민연금", "건강보험", "고용보험", "생명보험"], answer: 3 },

    // 위생법규 (10문항)
    { id: 41, topic: 4, question: "공중위생관리법상 숙박업의 위생관리 의무자는?", options: ["관광객", "숙박업 영업자", "지방자치단체만", "경찰"], answer: 1 },
    { id: 42, topic: 4, question: "호텔 객실의 침구류 교체 기준은?", options: ["고객 요청 시만", "퇴실 시마다 교체", "1주일에 1회", "1개월에 1회"], answer: 1 },
    { id: 43, topic: 4, question: "식품위생법상 식품접객업 영업자의 의무가 아닌 것은?", options: ["위생교육 이수", "건강진단 실시", "유통기한 무시", "위생적 조리환경 유지"], answer: 2 },
    { id: 44, topic: 4, question: "호텔 레스토랑 종업원의 건강진단 주기는?", options: ["6개월", "1년", "2년", "5년"], answer: 1 },
    { id: 45, topic: 4, question: "공중위생관리법상 위생등급 평가 대상은?", options: ["제조업", "숙박업·이미용업 등", "건설업", "금융업"], answer: 1 },
    { id: 46, topic: 4, question: "호텔 수영장 수질 관리 기준을 정하는 법령은?", options: ["형법", "공중위생관리법·체육시설법", "저작권법", "특허법"], answer: 1 },
    { id: 47, topic: 4, question: "식품위생법 위반 시 제재가 아닌 것은?", options: ["영업정지", "과태료", "허가 취소", "포상금 지급"], answer: 3 },
    { id: 48, topic: 4, question: "호텔 주방의 HACCP 인증 목적은?", options: ["비용 절감", "식품 안전관리 체계 구축", "직원 감축", "메뉴 축소"], answer: 1 },
    { id: 49, topic: 4, question: "감염병예방법상 호텔의 역할은?", options: ["감염병 은폐", "방역 협조 및 신고 의무", "감염자 차별", "영업 계속"], answer: 1 },
    { id: 50, topic: 4, question: "공중위생관리법상 행정처분 종류가 아닌 것은?", options: ["개선명령", "영업정지", "영업허가 취소", "포상"], answer: 3 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-manager-law-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-manager-law-progress', JSON.stringify({ answeredQuestions, score }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const current = filteredQuestions[currentQuestion];
    if (index === current.answer && !answeredQuestions.includes(current.id)) {
      setScore(score + 1);
    }
    if (!answeredQuestions.includes(current.id)) {
      setAnsweredQuestions([...answeredQuestions, current.id]);
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
    setAnsweredQuestions([]);
    localStorage.removeItem('hotel-manager-law-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔경영사 관광법규 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
    switch (ai) {
      case 'claude': return `https://claude.ai/new?q=${prompt}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${prompt}`;
      case 'gemini': return `https://gemini.google.com/?q=${prompt}`;
      default: return '#';
    }
  };

  const current = filteredQuestions[currentQuestion];
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-manager" className="text-amber-600 hover:text-amber-800 font-medium">← 호텔경영사</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚖️ 관광법규</h1>
          <p className="text-gray-500">호텔경영사 필기시험 대비 50문항</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">전체 진행률</span>
            <span className="text-sm font-bold text-amber-600">{answeredQuestions.length}/50 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">정답률: </span>
            <span className="text-sm font-bold text-orange-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>
            ))}
          </div>
        </div>

        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span>
              <span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>
            <div className="space-y-3">
              {current.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-amber-50 hover:border-amber-300 border-2 border-transparent'}`}>
                  <span className="font-medium">{index + 1}. {option}</span>
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === current.answer ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-bold ${selectedAnswer === current.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === current.answer ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}</p>
                <p className="text-gray-600 mt-2">정답: {current.answer + 1}. {current.options[current.answer]}</p>
                <button onClick={() => openAIModal(current.question)} className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition">🤖 AI에게 자세한 설명 듣기</button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-300 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-amber-700 transition">다음 →</button>
        </div>

        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/hotel-manager/study/hotel-management" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔경영론</Link>
            <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
            <Link href="/category/service/hotel-manager/study/hotel-marketing" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔마케팅</Link>
            <Link href="/category/service/hotel-manager/study/practical" className="py-3 px-4 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">실기시험</Link>
          </div>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하여 자세한 설명을 들어보세요</p>
            <div className="space-y-3">
              <a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-center font-medium hover:from-orange-500 hover:to-orange-600 transition">Claude</a>
              <a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition">ChatGPT</a>
              <a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition">Gemini</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
