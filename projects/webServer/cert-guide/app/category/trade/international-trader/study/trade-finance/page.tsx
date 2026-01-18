'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeFinancePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  const questions = [
    // 신용장 실무 (10문제)
    { id: 1, topic: "신용장 실무", question: "신용장(L/C)의 정의로 옳은 것은?", options: ["수입상의 대금 지급 약속", "개설은행의 조건부 지급 확약", "수출상의 선적 확약", "운송인의 화물 인도 약속"], answer: 1, explanation: "신용장은 개설은행이 수익자(수출상)에게 신용장 조건에 일치하는 서류 제시 시 대금을 지급하겠다는 조건부 확약입니다." },
    { id: 2, topic: "신용장 실무", question: "신용장 통일규칙(UCP)의 현행 버전은?", options: ["UCP 400", "UCP 500", "UCP 600", "UCP 700"], answer: 2, explanation: "현재 적용되는 신용장 통일규칙은 2007년 7월부터 시행된 UCP 600입니다." },
    { id: 3, topic: "신용장 실무", question: "신용장 당사자 중 '개설의뢰인(Applicant)'은?", options: ["수출상", "수입상", "개설은행", "통지은행"], answer: 1, explanation: "개설의뢰인(Applicant)은 신용장 개설을 은행에 의뢰하는 수입상입니다." },
    { id: 4, topic: "신용장 실무", question: "신용장 당사자 중 '수익자(Beneficiary)'는?", options: ["수출상", "수입상", "개설은행", "확인은행"], answer: 0, explanation: "수익자(Beneficiary)는 신용장에 의해 대금을 받을 권리가 있는 수출상입니다." },
    { id: 5, topic: "신용장 실무", question: "확인신용장(Confirmed L/C)의 특징은?", options: ["개설은행만 지급 보증", "확인은행 추가 지급 보증", "지급 보증 없음", "수입상 직접 지급"], answer: 1, explanation: "확인신용장은 개설은행 외에 확인은행이 추가로 지급을 보증하여 수출상의 안전성을 높입니다." },
    { id: 6, topic: "신용장 실무", question: "양도가능신용장(Transferable L/C)에서 양도 횟수는?", options: ["무제한", "1회만 가능", "2회까지 가능", "3회까지 가능"], answer: 1, explanation: "양도가능신용장은 1회에 한하여 전부 또는 일부를 제3자에게 양도할 수 있습니다." },
    { id: 7, topic: "신용장 실무", question: "신용장 조건 변경(Amendment) 시 필요한 것은?", options: ["수출상 동의만", "수입상 동의만", "모든 당사자 동의", "은행 동의만"], answer: 2, explanation: "취소불능신용장의 조건 변경은 개설은행, 확인은행(있는 경우), 수익자 등 관련 당사자의 동의가 필요합니다." },
    { id: 8, topic: "신용장 실무", question: "신용장에서 'At Sight'의 의미는?", options: ["30일 후 지급", "60일 후 지급", "일람 즉시 지급", "90일 후 지급"], answer: 2, explanation: "'At Sight'는 서류가 제시되면 즉시 대금을 지급하는 일람출급 조건입니다." },
    { id: 9, topic: "신용장 실무", question: "Usance L/C에서 'Usance'의 의미는?", options: ["일람 즉시 지급", "기한부 지급", "분할 지급", "선지급"], answer: 1, explanation: "Usance는 일정 기간 후에 대금을 지급하는 기한부(연지급) 조건을 의미합니다." },
    { id: 10, topic: "신용장 실무", question: "신용장 서류심사에서 'Discrepancy'의 의미는?", options: ["완전 일치", "서류 하자", "조기 제시", "지연 제시"], answer: 1, explanation: "Discrepancy는 제시된 서류가 신용장 조건과 일치하지 않는 '하자' 또는 '불일치'를 의미합니다." },

    // 외환관리 (10문제)
    { id: 11, topic: "외환관리", question: "환율(Exchange Rate)의 정의는?", options: ["금리의 비율", "두 통화의 교환 비율", "물가 상승률", "수출입 비율"], answer: 1, explanation: "환율은 한 나라 화폐와 다른 나라 화폐의 교환 비율입니다." },
    { id: 12, topic: "외환관리", question: "직접표시법(Direct Quotation)의 예는?", options: ["USD 1 = KRW 1,300", "KRW 1 = USD 0.00077", "EUR/USD", "GBP/EUR"], answer: 0, explanation: "직접표시법은 외국 통화 1단위에 대한 자국 통화 금액으로 표시합니다(예: USD 1 = KRW 1,300)." },
    { id: 13, topic: "외환관리", question: "매입률(Bid Rate)과 매도율(Offer Rate)의 관계는?", options: ["매입률 > 매도율", "매입률 < 매도율", "항상 동일", "무관"], answer: 1, explanation: "은행의 매입률(Bid)은 매도율(Offer)보다 낮습니다. 그 차이가 은행의 스프레드(마진)입니다." },
    { id: 14, topic: "외환관리", question: "선물환(Forward Exchange)의 특징은?", options: ["즉시 결제", "미래 특정일 결제", "옵션 거래", "스왑 거래"], answer: 1, explanation: "선물환은 현재 시점에 환율을 정하고 미래 특정일에 결제하는 거래입니다." },
    { id: 15, topic: "외환관리", question: "환율 변동 시 수출기업에 유리한 상황은?", options: ["원화 강세(환율 하락)", "원화 약세(환율 상승)", "환율 불변", "무관"], answer: 1, explanation: "원화 약세(환율 상승) 시 수출기업은 동일한 외화로 더 많은 원화를 받게 되어 유리합니다." },
    { id: 16, topic: "외환관리", question: "현물환(Spot Exchange)의 결제일은?", options: ["당일", "익영업일", "2영업일 후", "1주일 후"], answer: 2, explanation: "현물환 거래의 결제일은 거래일로부터 2영업일 후(T+2)입니다." },
    { id: 17, topic: "외환관리", question: "외환 포지션(Position)에서 '매입초과 포지션(Long Position)'이란?", options: ["외화 매도 > 매입", "외화 매입 > 매도", "매입 = 매도", "포지션 없음"], answer: 1, explanation: "Long Position은 외화 매입액이 매도액보다 많은 상태로, 환율 상승 시 이익이 발생합니다." },
    { id: 18, topic: "외환관리", question: "외국환은행의 역할이 아닌 것은?", options: ["외환 매매", "해외 송금", "수출입 대금 결제", "국내 원화 대출만"], answer: 3, explanation: "외국환은행은 외환 매매, 해외 송금, 수출입 대금 결제 등 외환 관련 업무를 수행합니다." },
    { id: 19, topic: "외환관리", question: "Cross Rate의 의미는?", options: ["기준 통화 간 환율", "제3의 통화를 매개로 산출한 환율", "고정 환율", "변동 환율"], answer: 1, explanation: "Cross Rate는 두 통화를 직접 거래하지 않고 제3의 통화(주로 USD)를 매개로 산출한 환율입니다." },
    { id: 20, topic: "외환관리", question: "환율 변동 요인이 아닌 것은?", options: ["금리 차이", "물가 수준", "국제수지", "국내 교통량"], answer: 3, explanation: "환율 변동 요인에는 금리, 물가, 국제수지, 경제성장률, 정치적 요인 등이 있으며, 교통량은 무관합니다." },

    // 무역금융 (10문제)
    { id: 21, topic: "무역금융", question: "무역금융의 주요 목적은?", options: ["투기 자금 조달", "수출입 대금 결제 지원", "부동산 투자", "주식 매입"], answer: 1, explanation: "무역금융은 수출입 기업의 원활한 대금 결제와 운영자금을 지원하기 위한 금융입니다." },
    { id: 22, topic: "무역금융", question: "수출환어음 매입(Negotiation)의 의미는?", options: ["어음 발행", "어음 인수", "은행의 환어음 및 서류 매입", "어음 지급"], answer: 2, explanation: "매입(Negotiation)은 매입은행이 수출상으로부터 환어음과 선적서류를 할인 매입하는 것입니다." },
    { id: 23, topic: "무역금융", question: "포페이팅(Forfaiting)의 특징은?", options: ["단기 금융", "상환청구권 없는 중장기 채권 매입", "담보 대출", "일반 예금"], answer: 1, explanation: "Forfaiting은 수출채권을 상환청구권(Recourse) 없이 매입하는 중장기 무역금융 기법입니다." },
    { id: 24, topic: "무역금융", question: "팩토링(Factoring)의 기능이 아닌 것은?", options: ["채권 매입", "신용 조사", "채권 추심", "선박 건조"], answer: 3, explanation: "Factoring은 매출채권 매입, 신용 조사, 채권 추심, 대금 회수 보증 등의 기능을 합니다." },
    { id: 25, topic: "무역금융", question: "수입신용장 개설 시 필요한 담보가 아닌 것은?", options: ["신용장 개설 보증금", "수입화물 담보", "부동산 담보", "수출 실적"], answer: 3, explanation: "수입신용장 개설 시 보증금, 수입화물 담보, 부동산 담보 등이 필요하며, 수출 실적은 해당되지 않습니다." },
    { id: 26, topic: "무역금융", question: "D/A(Documents against Acceptance) 조건의 특징은?", options: ["대금 지급 후 서류 인도", "환어음 인수 후 서류 인도", "선적 전 대금 수령", "서류 없이 대금 결제"], answer: 1, explanation: "D/A 조건은 수입상이 환어음을 인수하면 서류를 인도하고, 만기일에 대금을 결제합니다." },
    { id: 27, topic: "무역금융", question: "무역어음의 종류가 아닌 것은?", options: ["Documentary Bill", "Clean Bill", "Banker's Acceptance", "Promissory Note"], answer: 3, explanation: "무역어음에는 화환어음(Documentary Bill), 무담보어음(Clean Bill), 은행인수어음(B/A) 등이 있으며, 약속어음(P/N)은 별개입니다." },
    { id: 28, topic: "무역금융", question: "내국신용장(Local L/C)의 용도는?", options: ["직접 수출", "국내 공급업체 결제", "해외 투자", "외화 예금"], answer: 1, explanation: "내국신용장은 수출용 물품이나 원자재를 국내 공급업체로부터 구매할 때 사용합니다." },
    { id: 29, topic: "무역금융", question: "수출보험의 담보 위험이 아닌 것은?", options: ["신용 위험", "비상 위험", "환변동 위험(환변동보험)", "국내 교통사고"], answer: 3, explanation: "수출보험은 신용위험(바이어 파산 등), 비상위험(전쟁, 환거래 제한 등)을 담보합니다." },
    { id: 30, topic: "무역금융", question: "수출환어음의 발행인(Drawer)은?", options: ["수입상", "수출상", "개설은행", "통지은행"], answer: 1, explanation: "수출환어음의 발행인(Drawer)은 대금을 받을 권리가 있는 수출상입니다." },

    // 환위험 관리 (10문제)
    { id: 31, topic: "환위험 관리", question: "환위험(Foreign Exchange Risk)의 정의는?", options: ["금리 변동 위험", "환율 변동으로 인한 손익 불확실성", "주가 변동 위험", "물가 상승 위험"], answer: 1, explanation: "환위험은 환율 변동으로 인해 외화 표시 자산·부채의 원화 가치가 변동하는 위험입니다." },
    { id: 32, topic: "환위험 관리", question: "환위험의 종류가 아닌 것은?", options: ["거래적 환위험", "환산적 환위험", "경제적 환위험", "기술적 환위험"], answer: 3, explanation: "환위험은 거래적 환위험, 환산적 환위험, 경제적 환위험으로 구분되며, 기술적 환위험은 없습니다." },
    { id: 33, topic: "환위험 관리", question: "선물환(Forward) 헤지의 장점은?", options: ["환율 변동 이익 가능", "미래 환율 확정으로 위험 제거", "프리미엄 수익", "옵션 행사 가능"], answer: 1, explanation: "선물환 헤지는 미래 결제 환율을 현재 시점에 확정하여 환위험을 제거합니다." },
    { id: 34, topic: "환위험 관리", question: "통화옵션(Currency Option)에서 Call Option의 권리는?", options: ["외화 매도 권리", "외화 매입 권리", "이자 수취 권리", "배당 수취 권리"], answer: 1, explanation: "Call Option은 특정 환율로 외화를 매입할 수 있는 권리를 부여합니다." },
    { id: 35, topic: "환위험 관리", question: "Put Option의 권리는?", options: ["외화 매입 권리", "외화 매도 권리", "주식 매입 권리", "채권 매입 권리"], answer: 1, explanation: "Put Option은 특정 환율로 외화를 매도할 수 있는 권리를 부여합니다." },
    { id: 36, topic: "환위험 관리", question: "환위험 관리 방법 중 '내부적 기법'이 아닌 것은?", options: ["매칭(Matching)", "리딩과 래깅(Leading & Lagging)", "네팅(Netting)", "통화선물 거래"], answer: 3, explanation: "내부적 기법에는 매칭, 리딩/래깅, 네팅 등이 있으며, 통화선물 거래는 외부적(파생상품) 기법입니다." },
    { id: 37, topic: "환위험 관리", question: "Matching 기법의 의미는?", options: ["외화 수입과 지출 일치시키기", "선물환 계약", "옵션 매입", "차입 상환"], answer: 0, explanation: "Matching은 외화 수입과 지출의 통화, 금액, 시기를 일치시켜 환위험을 상쇄하는 기법입니다." },
    { id: 38, topic: "환위험 관리", question: "Netting 기법의 효과는?", options: ["외환 거래량 증가", "외환 거래량 감소 및 비용 절감", "이자 수익 증가", "신용 위험 증가"], answer: 1, explanation: "Netting은 그룹 내 외화 거래를 상계하여 실제 결제 금액을 줄이고 거래 비용을 절감합니다." },
    { id: 39, topic: "환위험 관리", question: "Leading의 의미는?", options: ["결제 시기 연기", "결제 시기 앞당김", "환율 예측", "이자 계산"], answer: 1, explanation: "Leading은 환율 상승이 예상될 때 외화 지급을 앞당기거나 수금을 늦추는 기법입니다." },
    { id: 40, topic: "환위험 관리", question: "환변동보험의 담보 내용은?", options: ["화물 손해", "신용 위험", "환율 변동 손실", "운송 지연"], answer: 2, explanation: "환변동보험은 수출 대금 회수 시점의 환율 변동으로 인한 손실을 보상하는 보험입니다." },

    // 국제결제 (10문제)
    { id: 41, topic: "국제결제", question: "T/T(Telegraphic Transfer) 송금의 특징은?", options: ["은행의 지급 보증", "신속한 전신 송금", "서류와 상환", "연지급 조건"], answer: 1, explanation: "T/T는 전신을 통해 신속하게 대금을 송금하는 방식이며, 은행의 지급 보증은 없습니다." },
    { id: 42, topic: "국제결제", question: "추심(Collection)에서 D/P 조건의 의미는?", options: ["인수 후 서류 인도", "지급과 동시에 서류 인도", "선적 전 대금 수령", "무담보 거래"], answer: 1, explanation: "D/P(Documents against Payment)는 수입상이 대금을 지급하면 서류를 인도하는 지급인도조건입니다." },
    { id: 43, topic: "국제결제", question: "추심통일규칙(URC)을 제정한 기관은?", options: ["WTO", "ICC", "UN", "IMF"], answer: 1, explanation: "추심통일규칙(URC)은 국제상업회의소(ICC)에서 제정했으며, 현재 URC 522가 적용됩니다." },
    { id: 44, topic: "국제결제", question: "O/A(Open Account) 거래의 특징은?", options: ["선지급", "은행 보증 거래", "외상 거래", "현금 거래"], answer: 2, explanation: "O/A(외상거래)는 물품 인도 후 일정 기간 내에 대금을 결제하는 신용 거래입니다." },
    { id: 45, topic: "국제결제", question: "CAD(Cash Against Documents)의 의미는?", options: ["서류 도착 전 지급", "서류 도착 시 지급", "선적 전 지급", "연지급"], answer: 1, explanation: "CAD는 은행 경유 없이 수출상이 직접 서류를 제시하고 대금을 수령하는 서류상환 결제방식입니다." },
    { id: 46, topic: "국제결제", question: "Escrow 결제의 특징은?", options: ["즉시 지급", "제3자 계좌에 예치 후 조건 충족 시 지급", "외상 거래", "신용장 거래"], answer: 1, explanation: "Escrow는 대금을 제3자(은행 등) 계좌에 예치하고, 계약 조건 충족 시 지급하는 방식입니다." },
    { id: 47, topic: "국제결제", question: "국제 송금에서 SWIFT의 역할은?", options: ["물품 운송", "금융 메시지 전송 네트워크", "보험 제공", "품질 검사"], answer: 1, explanation: "SWIFT는 국제 금융기관 간 금융 메시지(송금, 신용장 등)를 전송하는 네트워크입니다." },
    { id: 48, topic: "국제결제", question: "COD(Cash On Delivery)의 의미는?", options: ["선적 전 지급", "물품 인도 시 현금 지급", "외상 30일", "신용장 결제"], answer: 1, explanation: "COD는 물품이 인도될 때 현금으로 대금을 지급하는 상품인도결제 방식입니다." },
    { id: 49, topic: "국제결제", question: "Advance Payment(선지급)의 위험 부담은?", options: ["수출상에게 유리", "수입상에게 유리", "수입상이 위험 부담", "위험 없음"], answer: 2, explanation: "선지급 방식에서는 수입상이 물품 인도 전에 대금을 지급하므로 위험을 부담합니다." },
    { id: 50, topic: "국제결제", question: "결제 방식 중 수출상에게 가장 안전한 방식은?", options: ["O/A", "D/A", "확인신용장", "D/P"], answer: 2, explanation: "확인신용장은 개설은행과 확인은행의 이중 지급 보증으로 수출상에게 가장 안전합니다." },
  ];

  const topics = ["전체", "신용장 실무", "외환관리", "무역금융", "환위험 관리", "국제결제"];

  const filteredQuestions = currentTopic && currentTopic !== "전체"
    ? questions.filter(q => q.topic === currentTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-finance-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-finance-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const currentQ = filteredQuestions[currentQuestion];
    if (selectedAnswer === currentQ.answer) {
      if (!answeredQuestions.includes(currentQ.id)) {
        setScore(score + 1);
        setAnsweredQuestions([...answeredQuestions, currentQ.id]);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    localStorage.removeItem('trade-finance-progress');
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progressPercent = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-indigo-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/international-trader" className="text-gray-600 hover:text-indigo-600">국제무역사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">무역결제</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">💳 무역결제</h1>
            <span className="text-sm text-gray-500">{answeredQuestions.length} / {questions.length} 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => { setCurrentTopic(topic === "전체" ? null : topic); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                (topic === "전체" && !currentTopic) || currentTopic === topic
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {filteredQuestions.length > 0 && currentQ && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{currentQ.topic}</span>
              <span className="text-gray-500">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>

            <h2 className="text-lg font-medium text-gray-800 mb-6">{currentQ.question}</h2>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition ${
                    showResult
                      ? index === currentQ.answer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  disabled={showResult}
                >
                  <span className="font-medium">{index + 1}. </span>{option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === currentQ.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-bold ${selectedAnswer === currentQ.answer ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedAnswer === currentQ.answer ? '✅ 정답입니다!' : '❌ 오답입니다'}
                </p>
                <p className="text-gray-700 mt-2">{currentQ.explanation}</p>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  🤖 AI에게 더 자세히 물어보기
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                ← 이전
              </button>
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  정답 확인
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === filteredQuestions.length - 1}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  다음 →
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={handleReset} className="flex-1 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600">
            진행 초기화
          </button>
          <Link href="/category/trade/international-trader" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-center">
            목록으로
          </Link>
        </div>
      </main>

      {showAIModal && currentQ && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4">이 문제에 대해 AI에게 더 자세한 설명을 들어보세요.</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`국제무역사 무역결제 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-center font-medium">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`국제무역사 무역결제 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-center font-medium">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`국제무역사 무역결제 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-center font-medium">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200">닫기</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
