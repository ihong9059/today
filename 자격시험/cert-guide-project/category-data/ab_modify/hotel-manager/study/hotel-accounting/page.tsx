'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HotelAccountingStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '재무제표', count: 10 },
    { id: 1, name: '원가관리', count: 10 },
    { id: 2, name: '예산관리', count: 10 },
    { id: 3, name: '손익분석', count: 10 },
    { id: 4, name: '세무회계', count: 10 },
  ];

  const questions = [
    // 재무제표 (10문항)
    { id: 1, topic: 0, question: "재무상태표(대차대조표)에 포함되지 않는 항목은?", options: ["자산", "부채", "자본", "매출액"], answer: 3 },
    { id: 2, topic: 0, question: "유동자산에 해당하는 것은?", options: ["건물", "토지", "현금 및 예금", "기계장치"], answer: 2 },
    { id: 3, topic: 0, question: "손익계산서의 목적은?", options: ["재무상태 파악", "일정 기간 경영성과 측정", "현금흐름 분석", "자본 변동 확인"], answer: 1 },
    { id: 4, topic: 0, question: "매출총이익 계산 공식은?", options: ["매출액 - 판관비", "매출액 - 매출원가", "영업이익 - 이자비용", "순이익 + 법인세"], answer: 1 },
    { id: 5, topic: 0, question: "호텔 재무제표에서 객실 수익이 분류되는 항목은?", options: ["영업외수익", "영업수익", "자본", "부채"], answer: 1 },
    { id: 6, topic: 0, question: "유동비율의 의미는?", options: ["수익성 지표", "단기 지급능력 지표", "성장성 지표", "활동성 지표"], answer: 1 },
    { id: 7, topic: 0, question: "감가상각비의 특성은?", options: ["현금 지출 발생", "비현금성 비용", "매출 증가 효과", "부채 감소"], answer: 1 },
    { id: 8, topic: 0, question: "현금흐름표의 세 가지 활동이 아닌 것은?", options: ["영업활동", "투자활동", "재무활동", "마케팅활동"], answer: 3 },
    { id: 9, topic: 0, question: "부채비율이 높으면 의미하는 것은?", options: ["재무 안정성 높음", "재무 위험 높음", "수익성 높음", "성장성 높음"], answer: 1 },
    { id: 10, topic: 0, question: "호텔 업계에서 USALI란?", options: ["객실관리시스템", "통일 회계시스템", "예약시스템", "인사관리시스템"], answer: 1 },

    // 원가관리 (10문항)
    { id: 11, topic: 1, question: "고정비의 특성으로 올바른 것은?", options: ["매출에 비례하여 변동", "매출 변동과 무관하게 일정", "제품 단위당 일정", "계절에 따라 변동"], answer: 1 },
    { id: 12, topic: 1, question: "변동비의 예시가 아닌 것은?", options: ["식재료비", "세제 비용", "임대료", "객실 어메니티"], answer: 2 },
    { id: 13, topic: 1, question: "호텔 식음료 원가율이 35%일 때, 판매가 100,000원의 원가는?", options: ["25,000원", "35,000원", "65,000원", "100,000원"], answer: 1 },
    { id: 14, topic: 1, question: "호텔에서 인건비율이 높아지는 원인이 아닌 것은?", options: ["과잉 인력", "낮은 생산성", "자동화 도입", "높은 임금 인상"], answer: 2 },
    { id: 15, topic: 1, question: "ABC 원가계산의 특징은?", options: ["직접비만 계산", "활동 기준 간접비 배분", "단순 평균 계산", "고정비 무시"], answer: 1 },
    { id: 16, topic: 1, question: "호텔 객실의 한계비용에 해당하는 것은?", options: ["건물 감가상각비", "청소용품, 린넨 세탁비", "관리자 급여", "보험료"], answer: 1 },
    { id: 17, topic: 1, question: "표준원가와 실제원가의 차이를 분석하는 것은?", options: ["손익분석", "차이분석", "비율분석", "현금분석"], answer: 1 },
    { id: 18, topic: 1, question: "호텔 원가 절감 방안으로 적절하지 않은 것은?", options: ["에너지 효율 개선", "구매 협상력 강화", "서비스 품질 무시", "업무 프로세스 개선"], answer: 2 },
    { id: 19, topic: 1, question: "공헌이익의 계산 공식은?", options: ["매출액 - 고정비", "매출액 - 변동비", "영업이익 - 이자", "순이익 + 세금"], answer: 1 },
    { id: 20, topic: 1, question: "호텔 F&B 부서의 원가 통제 방법이 아닌 것은?", options: ["표준 레시피 사용", "재고 관리 철저", "무제한 시식 허용", "구매가 협상"], answer: 2 },

    // 예산관리 (10문항)
    { id: 21, topic: 2, question: "예산의 기능이 아닌 것은?", options: ["계획 기능", "통제 기능", "조정 기능", "비용 증가 기능"], answer: 3 },
    { id: 22, topic: 2, question: "호텔 연간 예산 편성 시기로 적절한 것은?", options: ["회계연도 시작 후", "회계연도 시작 2~3개월 전", "회계연도 중반", "예산 필요 없음"], answer: 1 },
    { id: 23, topic: 2, question: "제로베이스 예산(ZBB)의 특징은?", options: ["전년 예산 기준 증가", "매년 처음부터 예산 검토", "고정예산 유지", "변동예산만 사용"], answer: 1 },
    { id: 24, topic: 2, question: "호텔 객실 예산에서 가장 중요한 변수는?", options: ["건물 가치", "객실 점유율과 ADR", "직원 수", "주차장 크기"], answer: 1 },
    { id: 25, topic: 2, question: "예산 차이 분석에서 유리한 차이란?", options: ["실제가 예산보다 많은 비용", "실제가 예산보다 적은 비용", "예산과 동일", "차이 없음"], answer: 1 },
    { id: 26, topic: 2, question: "호텔 자본예산의 대상이 아닌 것은?", options: ["객실 리노베이션", "신규 장비 구입", "일상 소모품 구매", "건물 증축"], answer: 2 },
    { id: 27, topic: 2, question: "유연예산(Flexible Budget)의 장점은?", options: ["활동 수준 변화에 대응 가능", "편성이 간단함", "고정비만 관리", "변경 불가능"], answer: 0 },
    { id: 28, topic: 2, question: "호텔 예산 통제의 목적은?", options: ["직원 감시", "목표 달성 및 효율적 자원 배분", "비용 무시", "매출 무시"], answer: 1 },
    { id: 29, topic: 2, question: "Rolling Budget의 특징은?", options: ["1년 고정 예산", "지속적으로 갱신되는 예산", "과거 실적 무시", "비용 예산만 포함"], answer: 1 },
    { id: 30, topic: 2, question: "예산 편성 시 Bottom-up 방식이란?", options: ["경영진이 일방적 결정", "각 부서에서 상향 제안", "외부 컨설턴트 결정", "무작위 배정"], answer: 1 },

    // 손익분석 (10문항)
    { id: 31, topic: 3, question: "손익분기점(BEP)의 의미는?", options: ["최대 이익 지점", "수익과 비용이 같은 지점", "최대 손실 지점", "매출 최저점"], answer: 1 },
    { id: 32, topic: 3, question: "손익분기점 매출액 공식은?", options: ["고정비 ÷ 공헌이익률", "변동비 ÷ 매출액", "매출액 × 원가율", "순이익 ÷ 매출액"], answer: 0 },
    { id: 33, topic: 3, question: "공헌이익률이 높을수록 의미하는 것은?", options: ["손익분기점 높아짐", "손익분기점 낮아짐", "고정비 증가", "변동비 증가"], answer: 1 },
    { id: 34, topic: 3, question: "호텔 GOP(Gross Operating Profit)란?", options: ["총 영업이익", "순이익", "매출액", "자본금"], answer: 0 },
    { id: 35, topic: 3, question: "영업이익률 계산 공식은?", options: ["영업이익 ÷ 매출액 × 100", "순이익 ÷ 자본 × 100", "매출액 ÷ 비용 × 100", "이자 ÷ 매출액 × 100"], answer: 0 },
    { id: 36, topic: 3, question: "호텔 부서별 손익분석의 장점이 아닌 것은?", options: ["부서별 성과 평가", "비효율 부서 파악", "모든 부서 동일 평가", "자원 배분 개선"], answer: 2 },
    { id: 37, topic: 3, question: "안전한계(Margin of Safety)란?", options: ["최소 이익 수준", "현재 매출과 손익분기점 매출의 차이", "최대 손실 한도", "예산 초과 한도"], answer: 1 },
    { id: 38, topic: 3, question: "호텔 객실부문 이익률이 높은 이유는?", options: ["높은 변동비", "낮은 한계비용", "높은 인건비", "낮은 판매가"], answer: 1 },
    { id: 39, topic: 3, question: "CVP 분석에서 V가 의미하는 것은?", options: ["Value", "Volume", "Variance", "Velocity"], answer: 1 },
    { id: 40, topic: 3, question: "목표이익 달성 매출액 공식은?", options: ["(고정비+목표이익) ÷ 공헌이익률", "목표이익 × 매출액", "고정비 - 목표이익", "변동비 + 목표이익"], answer: 0 },

    // 세무회계 (10문항)
    { id: 41, topic: 4, question: "부가가치세의 일반 세율은?", options: ["5%", "10%", "15%", "20%"], answer: 1 },
    { id: 42, topic: 4, question: "호텔 객실 요금에 부가가치세가 적용되는 경우는?", options: ["면세 대상", "과세 대상", "영세율 적용", "비과세"], answer: 1 },
    { id: 43, topic: 4, question: "법인세 신고 기한은 사업연도 종료 후?", options: ["1개월 이내", "3개월 이내", "6개월 이내", "12개월 이내"], answer: 1 },
    { id: 44, topic: 4, question: "접대비의 세무상 특징은?", options: ["전액 비용 인정", "한도액 내 비용 인정", "전액 불인정", "자산 처리"], answer: 1 },
    { id: 45, topic: 4, question: "감가상각 방법 중 정액법의 특징은?", options: ["매년 감가상각비 감소", "매년 동일한 금액 상각", "초기에 많이 상각", "상각 없음"], answer: 1 },
    { id: 46, topic: 4, question: "호텔에서 봉사료(Service Charge)의 세무 처리는?", options: ["비과세", "부가세 과세 대상", "영세율", "면세"], answer: 1 },
    { id: 47, topic: 4, question: "세금계산서 발행이 의무인 거래는?", options: ["현금 소액 거래", "부가세 과세 사업자 간 거래", "개인 간 거래", "해외 거래만"], answer: 1 },
    { id: 48, topic: 4, question: "호텔 직원 급여에서 원천징수하는 세금이 아닌 것은?", options: ["소득세", "지방소득세", "부가가치세", "국민연금"], answer: 2 },
    { id: 49, topic: 4, question: "세무조사 대응 시 호텔이 준비해야 할 것은?", options: ["장부 폐기", "정확한 회계 장부 및 증빙 서류", "세금 미납", "직원 해고"], answer: 1 },
    { id: 50, topic: 4, question: "호텔 부동산 취득 시 부과되는 세금은?", options: ["소득세", "취득세", "상속세", "증여세"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-manager-accounting-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-manager-accounting-progress', JSON.stringify({ answeredQuestions, score }));
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
    localStorage.removeItem('hotel-manager-accounting-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔경영사 호텔회계 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 호텔회계</h1>
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
