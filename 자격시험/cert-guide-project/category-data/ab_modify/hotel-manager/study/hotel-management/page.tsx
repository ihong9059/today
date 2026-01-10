'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HotelManagementStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '호텔 조직', count: 10 },
    { id: 1, name: '객실관리', count: 10 },
    { id: 2, name: '식음료 운영', count: 10 },
    { id: 3, name: '연회관리', count: 10 },
    { id: 4, name: '하우스키핑', count: 10 },
  ];

  const questions = [
    // 호텔 조직 (10문항)
    { id: 1, topic: 0, question: "호텔의 총지배인(General Manager)의 주요 역할이 아닌 것은?", options: ["전체 호텔 운영 총괄", "경영 목표 수립 및 달성", "객실 청소 직접 수행", "대외 관계 관리"], answer: 2 },
    { id: 2, topic: 0, question: "Front Office의 주요 업무가 아닌 것은?", options: ["고객 체크인/체크아웃", "객실 예약 관리", "식음료 조리", "컨시어지 서비스"], answer: 2 },
    { id: 3, topic: 0, question: "호텔 조직에서 'Rooms Division'에 속하지 않는 부서는?", options: ["프런트 오피스", "하우스키핑", "레스토랑", "예약부"], answer: 2 },
    { id: 4, topic: 0, question: "호텔의 수익 중심 부서(Revenue Center)에 해당하는 것은?", options: ["인사부", "객실부", "회계부", "시설관리부"], answer: 1 },
    { id: 5, topic: 0, question: "호텔 조직에서 Staff Department의 특성은?", options: ["직접 수익 창출", "지원 및 조언 기능", "고객 직접 응대", "판매 활동 수행"], answer: 1 },
    { id: 6, topic: 0, question: "F&B 부서의 'B'가 의미하는 것은?", options: ["Business", "Beverage", "Banquet", "Budget"], answer: 1 },
    { id: 7, topic: 0, question: "호텔의 Duty Manager의 역할은?", options: ["야간/주말 호텔 운영 책임", "회계 업무 담당", "식음료 조리", "객실 청소 감독"], answer: 0 },
    { id: 8, topic: 0, question: "호텔 조직의 계층 구조에서 올바른 순서는?", options: ["사원-과장-부장-이사-GM", "사원-부장-과장-이사-GM", "이사-부장-과장-사원-GM", "GM-과장-부장-이사-사원"], answer: 0 },
    { id: 9, topic: 0, question: "호텔의 Sales & Marketing 부서의 주요 업무는?", options: ["객실 청소", "고객 유치 및 판촉 활동", "식재료 구매", "시설 보수"], answer: 1 },
    { id: 10, topic: 0, question: "호텔 체인의 본사가 각 호텔에 지원하는 기능이 아닌 것은?", options: ["브랜드 관리", "예약 시스템", "개별 호텔 인사권", "마케팅 지원"], answer: 2 },

    // 객실관리 (10문항)
    { id: 11, topic: 1, question: "객실 점유율(Occupancy Rate) 계산 공식은?", options: ["판매객실수/총객실수×100", "총객실수/판매객실수×100", "객실매출/총매출×100", "투숙객수/객실수×100"], answer: 0 },
    { id: 12, topic: 1, question: "ADR(Average Daily Rate)의 의미는?", options: ["평균 일일 점유율", "평균 객실 요금", "총 객실 수익", "객실 가동률"], answer: 1 },
    { id: 13, topic: 1, question: "RevPAR의 계산 방법으로 올바른 것은?", options: ["ADR × 점유율", "총매출 ÷ 직원수", "객실수 × 요금", "투숙객 × 체류일수"], answer: 0 },
    { id: 14, topic: 1, question: "오버부킹(Overbooking)을 하는 주된 이유는?", options: ["고객 불만 유발", "노쇼(No-show) 대비 수익 극대화", "직원 업무 증가", "경쟁사 견제"], answer: 1 },
    { id: 15, topic: 1, question: "Walk-in Guest의 의미는?", options: ["예약 없이 방문한 투숙객", "예약 후 취소한 고객", "장기 투숙객", "VIP 고객"], answer: 0 },
    { id: 16, topic: 1, question: "호텔 객실 타입 중 'Suite'의 특징은?", options: ["가장 저렴한 객실", "침실과 거실이 분리된 고급 객실", "2인용 더블베드 객실", "창문이 없는 객실"], answer: 1 },
    { id: 17, topic: 1, question: "레비뉴 매니지먼트의 핵심 개념은?", options: ["모든 객실 동일 가격 적용", "수요에 따른 유동적 가격 책정", "최저가 유지 전략", "객실수 감축"], answer: 1 },
    { id: 18, topic: 1, question: "호텔 예약 시스템에서 GDS란?", options: ["Guest Data System", "Global Distribution System", "General Delivery Service", "Group Discount Sale"], answer: 1 },
    { id: 19, topic: 1, question: "Late Check-out의 의미는?", options: ["정해진 시간 전 퇴실", "정해진 시간 이후 퇴실", "예약 취소", "조기 입실"], answer: 1 },
    { id: 20, topic: 1, question: "호텔 객실 상태 코드 중 'OOO'의 의미는?", options: ["점유 중", "청소 완료", "판매 불가(고장 등)", "예약됨"], answer: 2 },

    // 식음료 운영 (10문항)
    { id: 21, topic: 2, question: "호텔 F&B 부서에서 'Mise en place'의 의미는?", options: ["메뉴 개발", "서비스 전 준비작업", "고객 응대", "회계 정산"], answer: 1 },
    { id: 22, topic: 2, question: "레스토랑 좌석 회전율(Seat Turnover)이 높을수록 의미하는 것은?", options: ["서비스 품질 저하", "수익 증가 가능성", "고객 만족도 하락", "인건비 증가"], answer: 1 },
    { id: 23, topic: 2, question: "식음료 원가율 계산 공식은?", options: ["매출액/원가×100", "원가/매출액×100", "이익/원가×100", "원가/이익×100"], answer: 1 },
    { id: 24, topic: 2, question: "호텔 레스토랑의 서비스 유형 중 'Buffet Service'의 특징은?", options: ["직원이 테이블에서 서빙", "고객이 직접 음식 선택", "개인별 코스 제공", "객실로 배달"], answer: 1 },
    { id: 25, topic: 2, question: "메뉴 엔지니어링에서 'Star' 메뉴의 특성은?", options: ["수익성 낮고 인기 낮음", "수익성 높고 인기 높음", "수익성 높고 인기 낮음", "수익성 낮고 인기 높음"], answer: 1 },
    { id: 26, topic: 2, question: "호텔 바(Bar)에서 'Par Stock'의 개념은?", options: ["최소 재고 수준", "적정 재고 수준", "최대 재고 수준", "폐기 재고"], answer: 1 },
    { id: 27, topic: 2, question: "Room Service의 장점이 아닌 것은?", options: ["고객 편의성 증대", "높은 가격 책정 가능", "낮은 인건비", "24시간 서비스 가능"], answer: 2 },
    { id: 28, topic: 2, question: "레스토랑 예약 시스템에서 'No-show' 대응 전략은?", options: ["예약 제한", "예약금 제도 도입", "무제한 예약 허용", "예약 시스템 폐지"], answer: 1 },
    { id: 29, topic: 2, question: "식음료 부서의 Stewarding 업무는?", options: ["조리 담당", "서빙 담당", "식기 세척 및 주방 위생", "메뉴 개발"], answer: 2 },
    { id: 30, topic: 2, question: "호텔 미니바(Minibar)의 특징이 아닌 것은?", options: ["객실 내 음료 제공", "편의성 높음", "저렴한 가격", "자동 과금 시스템"], answer: 2 },

    // 연회관리 (10문항)
    { id: 31, topic: 3, question: "호텔 연회장의 'Banquet Event Order(BEO)'란?", options: ["연회 예약 주문서", "식재료 발주서", "직원 근무표", "고객 영수증"], answer: 0 },
    { id: 32, topic: 3, question: "연회 행사 유형 중 'Cocktail Party'의 특징은?", options: ["정식 착석 식사", "스탠딩 형태의 가벼운 음료와 핑거푸드", "뷔페 스타일", "코스 요리 제공"], answer: 1 },
    { id: 33, topic: 3, question: "연회 수익 극대화를 위한 전략이 아닌 것은?", options: ["비수기 할인 프로모션", "부가 서비스 판매", "모든 행사 동일 가격", "패키지 상품 개발"], answer: 2 },
    { id: 34, topic: 3, question: "MICE 행사에서 'C'가 의미하는 것은?", options: ["Catering", "Convention", "Concert", "Consulting"], answer: 1 },
    { id: 35, topic: 3, question: "연회장 배치 형태 중 'U-shape'의 특징은?", options: ["강의식 배치", "U자형으로 회의에 적합", "원탁 배치", "일렬 배치"], answer: 1 },
    { id: 36, topic: 3, question: "연회 행사 담당자가 사전에 확인해야 할 사항이 아닌 것은?", options: ["참석 인원", "메뉴 확정", "고객 개인정보 유출", "장비 세팅"], answer: 2 },
    { id: 37, topic: 3, question: "연회 원가 관리에서 가장 비중이 큰 항목은?", options: ["장식비", "음식료 원가", "조명비", "인쇄비"], answer: 1 },
    { id: 38, topic: 3, question: "기업 연회 고객 유치를 위한 전략은?", options: ["개인 고객만 집중", "B2B 영업 강화", "연회장 축소", "가격 인상"], answer: 1 },
    { id: 39, topic: 3, question: "연회 행사 후 고객 관리 방법은?", options: ["연락 두절", "감사 연락 및 피드백 수집", "불만 무시", "가격 인상 통보"], answer: 1 },
    { id: 40, topic: 3, question: "호텔 웨딩 연회의 특징으로 올바른 것은?", options: ["수익성 낮음", "고부가가치 행사", "비수기만 가능", "소규모만 가능"], answer: 1 },

    // 하우스키핑 (10문항)
    { id: 41, topic: 4, question: "하우스키핑 부서의 주요 업무가 아닌 것은?", options: ["객실 청소", "린넨 관리", "고객 체크인", "미니바 보충"], answer: 2 },
    { id: 42, topic: 4, question: "객실 청소 순서로 적절한 것은?", options: ["침구 정돈 → 환기 → 청소 → 점검", "환기 → 쓰레기 수거 → 청소 → 침구 정돈 → 점검", "점검 → 청소 → 침구 정돈 → 환기", "청소 → 환기 → 점검 → 침구 정돈"], answer: 1 },
    { id: 43, topic: 4, question: "Turn-down Service의 의미는?", options: ["체크아웃 청소", "저녁 침대 정돈 서비스", "객실 점검", "린넨 교체"], answer: 1 },
    { id: 44, topic: 4, question: "호텔 린넨 관리에서 'Par Level'이란?", options: ["최대 보유량", "적정 보유량", "최소 보유량", "폐기량"], answer: 1 },
    { id: 45, topic: 4, question: "하우스키핑에서 분실물 처리 절차로 올바른 것은?", options: ["직접 사용", "발견 시 프런트에 보고 및 등록", "버리기", "다른 객실에 비치"], answer: 1 },
    { id: 46, topic: 4, question: "객실 상태 'DND'의 의미는?", options: ["청소 완료", "방해 금지", "퇴실 예정", "예약됨"], answer: 1 },
    { id: 47, topic: 4, question: "하우스키핑 생산성 향상 방안이 아닌 것은?", options: ["효율적 동선 설계", "적정 인력 배치", "청소 인원 무조건 감축", "장비 현대화"], answer: 2 },
    { id: 48, topic: 4, question: "객실 인스펙션(Inspection)의 목적은?", options: ["직원 감시", "청소 품질 및 객실 상태 점검", "고객 불만 수집", "린넨 수거"], answer: 1 },
    { id: 49, topic: 4, question: "호텔 세탁실(Laundry)의 업무 범위가 아닌 것은?", options: ["객실 린넨 세탁", "직원 유니폼 세탁", "고객 세탁물", "음식 조리"], answer: 3 },
    { id: 50, topic: 4, question: "친환경 하우스키핑 실천 방안은?", options: ["세제 과다 사용", "린넨 매일 전량 교체", "고객 동의 시 린넨 재사용", "에너지 과다 소비"], answer: 2 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-manager-management-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-manager-management-progress', JSON.stringify({ answeredQuestions, score }));
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
    localStorage.removeItem('hotel-manager-management-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔경영사 호텔경영론 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏨 호텔경영론</h1>
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
            <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
            <Link href="/category/service/hotel-manager/study/hotel-marketing" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔마케팅</Link>
            <Link href="/category/service/hotel-manager/study/hotel-law" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">관광법규</Link>
            <Link href="/category/service/hotel-manager/study/practical" className="py-3 px-4 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">실기시험</Link>
          </div>
        </div>
      </main>

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
