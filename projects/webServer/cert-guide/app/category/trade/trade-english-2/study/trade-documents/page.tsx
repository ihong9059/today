'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeDocuments2Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '선적서류', count: 10 },
    { id: 1, name: '상업서류', count: 10 },
    { id: 2, name: '결제서류', count: 10 },
    { id: 3, name: '통관서류', count: 10 },
    { id: 4, name: '기타서류', count: 10 },
  ];

  const questions = [
    // 선적서류 (10문항)
    { id: 1, topic: 0, question: 'Bill of Lading(B/L)의 역할이 아닌 것은?', options: ['운송계약의 증거', '화물인수증', '권리증권', '보험증권'], answer: 3, explanation: 'B/L은 운송계약의 증거, 화물인수증, 권리증권의 역할을 하며, 보험증권은 별도 서류입니다.' },
    { id: 2, topic: 0, question: 'Clean B/L의 의미는?', options: ['깨끗한 용지 사용', '외관 손상 없음 기재', '서명 없음', '원본 없음'], answer: 1, explanation: 'Clean B/L은 화물의 외관에 손상이나 하자가 없다는 것이 기재된 선하증권입니다.' },
    { id: 3, topic: 0, question: 'On Board B/L의 특징은?', options: ['선적 전 발행', '본선 적재 확인 후 발행', '양륙 후 발행', '통관 후 발행'], answer: 1, explanation: 'On Board B/L은 화물이 본선에 적재된 후 발행되는 선하증권입니다.' },
    { id: 4, topic: 0, question: 'Received B/L의 특징은?', options: ['본선 적재 후 발행', '운송인이 화물 인수 시 발행', '양륙 후 발행', '세관 통과 후 발행'], answer: 1, explanation: 'Received B/L은 운송인이 화물을 인수했을 때 발행하며, 아직 본선 적재 전입니다.' },
    { id: 5, topic: 0, question: 'Air Waybill(AWB)과 B/L의 차이점은?', options: ['발행기관', '권리증권 여부', '운송수단', '서류 색상'], answer: 1, explanation: 'AWB는 B/L과 달리 권리증권이 아니며, 양도가 불가능합니다.' },
    { id: 6, topic: 0, question: 'Straight B/L의 특징은?', options: ['양도 가능', '기명식, 양도 불가', '지시식', '소지인 출급식'], answer: 1, explanation: 'Straight B/L(기명식 선하증권)은 특정인을 수화인으로 지정하며 양도가 불가능합니다.' },
    { id: 7, topic: 0, question: 'Order B/L의 특징은?', options: ['양도 불가', '배서로 양도 가능', '원본만 유효', '사본도 유효'], answer: 1, explanation: 'Order B/L(지시식 선하증권)은 배서를 통해 양도가 가능합니다.' },
    { id: 8, topic: 0, question: 'Sea Waybill의 특징은?', options: ['권리증권', '화물인도지시서', '보험서류', '통관서류'], answer: 1, explanation: 'Sea Waybill은 B/L과 달리 권리증권이 아닌 화물인도지시서입니다.' },
    { id: 9, topic: 0, question: 'B/L의 원본 통수는 일반적으로?', options: ['1통', '2통', '3통', '5통'], answer: 2, explanation: '일반적으로 B/L은 3통(Full set)으로 발행됩니다.' },
    { id: 10, topic: 0, question: 'Stale B/L의 의미는?', options: ['깨끗한 B/L', '지연 제시된 B/L', '손상된 B/L', '사본 B/L'], answer: 1, explanation: 'Stale B/L은 선적 후 일정 기간이 경과하여 지연 제시된 선하증권입니다.' },

    // 상업서류 (10문항)
    { id: 11, topic: 1, question: 'Commercial Invoice에 포함되지 않는 항목은?', options: ['품명', '수량', '가격', '보험 조건'], answer: 3, explanation: 'Commercial Invoice(상업송장)에는 품명, 수량, 가격 등이 기재되며, 보험 조건은 보험증권에 기재됩니다.' },
    { id: 12, topic: 1, question: 'Proforma Invoice의 용도는?', options: ['정식 대금청구', '견적 및 가계약', '세금신고', '관세납부'], answer: 1, explanation: 'Proforma Invoice(견적송장)는 정식 계약 전 견적 및 가계약 용도로 사용됩니다.' },
    { id: 13, topic: 1, question: 'Packing List에 기재되는 내용은?', options: ['가격 정보', '포장 상세 내역', '보험 조건', '결제 조건'], answer: 1, explanation: 'Packing List(포장명세서)에는 화물의 포장 상세 내역이 기재됩니다.' },
    { id: 14, topic: 1, question: 'Weight List의 용도는?', options: ['가격 증명', '중량 증명', '품질 증명', '원산지 증명'], answer: 1, explanation: 'Weight List(중량명세서)는 화물의 중량을 증명하는 서류입니다.' },
    { id: 15, topic: 1, question: 'Shipping Advice의 목적은?', options: ['주문 확인', '선적 통지', '대금 청구', '클레임 제기'], answer: 1, explanation: 'Shipping Advice(선적통지서)는 화물 선적 사실을 매수인에게 통지합니다.' },
    { id: 16, topic: 1, question: 'Consular Invoice의 발행처는?', options: ['수출자', '수입국 영사관', '운송인', '보험회사'], answer: 1, explanation: 'Consular Invoice(영사송장)는 수입국의 영사관에서 발행합니다.' },
    { id: 17, topic: 1, question: 'Customs Invoice의 용도는?', options: ['운송용', '관세 부과용', '보험 청구용', '품질 증명용'], answer: 1, explanation: 'Customs Invoice(세관송장)는 수입국 세관의 관세 부과를 위해 사용됩니다.' },
    { id: 18, topic: 1, question: 'Measurement List의 기재 내용은?', options: ['중량', '용적', '가격', '원산지'], answer: 1, explanation: 'Measurement List(용적명세서)에는 화물의 용적(부피)이 기재됩니다.' },
    { id: 19, topic: 1, question: 'Invoice의 필수 기재 사항이 아닌 것은?', options: ['매도인 정보', '매수인 정보', '품목 및 가격', '운송인 서명'], answer: 3, explanation: 'Invoice에는 매도인, 매수인 정보와 품목, 가격이 필수이며, 운송인 서명은 필요하지 않습니다.' },
    { id: 20, topic: 1, question: 'Debit Note의 용도는?', options: ['대금 지급 통지', '추가 청구 통지', '할인 통지', '환불 통지'], answer: 1, explanation: 'Debit Note(차변표)는 추가 금액을 청구할 때 사용하는 서류입니다.' },

    // 결제서류 (10문항)
    { id: 21, topic: 2, question: 'Bill of Exchange(환어음)의 당사자가 아닌 것은?', options: ['발행인', '지급인', '수취인', '운송인'], answer: 3, explanation: '환어음의 당사자는 발행인(Drawer), 지급인(Drawee), 수취인(Payee)입니다.' },
    { id: 22, topic: 2, question: 'Sight Draft의 특징은?', options: ['만기일 지정', '일람 즉시 지급', '분할 지급', '연불 지급'], answer: 1, explanation: 'Sight Draft(일람불 환어음)는 제시 즉시 지급되는 환어음입니다.' },
    { id: 23, topic: 2, question: 'Usance Draft의 특징은?', options: ['즉시 지급', '만기일에 지급', '분할 지급', '선지급'], answer: 1, explanation: 'Usance Draft(기한부 환어음)는 일정 기간 후 만기일에 지급되는 환어음입니다.' },
    { id: 24, topic: 2, question: 'L/C(신용장)의 개설은행은?', options: ['수출자 거래은행', '수입자 거래은행', '중앙은행', '보험회사'], answer: 1, explanation: '신용장은 수입자(매수인)의 거래은행(개설은행)이 발행합니다.' },
    { id: 25, topic: 2, question: 'Irrevocable L/C의 특징은?', options: ['일방적 취소 가능', '관계 당사자 동의 없이 취소 불가', '자동 취소', '부분 취소 가능'], answer: 1, explanation: 'Irrevocable L/C(취소불능 신용장)는 관계 당사자 전원의 동의 없이 취소할 수 없습니다.' },
    { id: 26, topic: 2, question: 'Confirmed L/C의 장점은?', options: ['비용 절감', '이중 지급 보증', '절차 간소화', '기간 단축'], answer: 1, explanation: 'Confirmed L/C(확인신용장)는 개설은행 외에 확인은행의 지급보증이 추가됩니다.' },
    { id: 27, topic: 2, question: 'Beneficiary는 신용장에서 누구를 지칭하는가?', options: ['수입자', '수출자', '개설은행', '통지은행'], answer: 1, explanation: 'Beneficiary(수익자)는 신용장의 수혜자인 수출자(매도인)를 의미합니다.' },
    { id: 28, topic: 2, question: 'Applicant는 신용장에서 누구를 지칭하는가?', options: ['수출자', '수입자', '매입은행', '보험회사'], answer: 1, explanation: 'Applicant(개설의뢰인)는 신용장 개설을 의뢰한 수입자(매수인)입니다.' },
    { id: 29, topic: 2, question: 'D/P 결제에서 서류 인도 조건은?', options: ['인수 시', '지급 시', '선적 시', '통관 시'], answer: 1, explanation: 'D/P(Documents against Payment)는 대금 지급과 동시에 서류를 인도합니다.' },
    { id: 30, topic: 2, question: 'D/A 결제에서 서류 인도 조건은?', options: ['지급 시', '환어음 인수 시', '선적 시', '양륙 시'], answer: 1, explanation: 'D/A(Documents against Acceptance)는 환어음 인수 시 서류를 인도합니다.' },

    // 통관서류 (10문항)
    { id: 31, topic: 3, question: 'Certificate of Origin(원산지증명서)의 발급처는?', options: ['수출자', '상공회의소', '세관', '운송인'], answer: 1, explanation: '원산지증명서는 상공회의소 또는 관련 기관에서 발급합니다.' },
    { id: 32, topic: 3, question: 'Import License의 용도는?', options: ['수출 허가', '수입 허가', '운송 허가', '보험 가입'], answer: 1, explanation: 'Import License(수입허가서)는 수입국에서 특정 품목의 수입을 허가하는 서류입니다.' },
    { id: 33, topic: 3, question: 'Export License의 용도는?', options: ['수입 허가', '수출 허가', '통관 면제', '관세 환급'], answer: 1, explanation: 'Export License(수출허가서)는 특정 품목의 수출을 허가하는 서류입니다.' },
    { id: 34, topic: 3, question: 'Customs Declaration의 목적은?', options: ['운송 신청', '세관 신고', '보험 가입', '품질 검사'], answer: 1, explanation: 'Customs Declaration(세관신고서)은 수출입 화물을 세관에 신고하는 서류입니다.' },
    { id: 35, topic: 3, question: 'Health Certificate의 발급 대상은?', options: ['기계류', '식품/농산물', '섬유류', '화학제품'], answer: 1, explanation: 'Health Certificate(위생증명서)는 식품, 농산물 등의 위생 상태를 증명합니다.' },
    { id: 36, topic: 3, question: 'Phytosanitary Certificate의 용도는?', options: ['동물 검역', '식물 검역', '의약품 검사', '중량 증명'], answer: 1, explanation: 'Phytosanitary Certificate(식물검역증명서)는 식물의 병해충 여부를 증명합니다.' },
    { id: 37, topic: 3, question: 'Veterinary Certificate의 용도는?', options: ['식물 검역', '동물 검역', '의약품 검사', '화학물질 검사'], answer: 1, explanation: 'Veterinary Certificate(동물검역증명서)는 동물 및 축산물의 검역을 증명합니다.' },
    { id: 38, topic: 3, question: 'HS Code의 목적은?', options: ['운송 분류', '상품 분류', '보험 분류', '회계 분류'], answer: 1, explanation: 'HS Code(품목분류코드)는 국제적으로 통일된 상품 분류를 위한 코드입니다.' },
    { id: 39, topic: 3, question: 'Import Declaration의 제출처는?', options: ['수출국 세관', '수입국 세관', '운송회사', '보험회사'], answer: 1, explanation: 'Import Declaration(수입신고서)은 수입국 세관에 제출합니다.' },
    { id: 40, topic: 3, question: 'FTA Certificate of Origin의 효과는?', options: ['운송비 면제', '관세 혜택', '보험료 할인', '검사 면제'], answer: 1, explanation: 'FTA 원산지증명서는 FTA 체결국 간 관세 혜택을 받기 위해 필요합니다.' },

    // 기타서류 (10문항)
    { id: 41, topic: 4, question: 'Insurance Policy의 발급자는?', options: ['수출자', '보험회사', '은행', '세관'], answer: 1, explanation: 'Insurance Policy(보험증권)는 보험회사가 발급합니다.' },
    { id: 42, topic: 4, question: 'Insurance Certificate와 Insurance Policy의 차이점은?', options: ['발급기관', '간이 vs 정식 증권', '보상 범위', '유효기간'], answer: 1, explanation: 'Insurance Certificate는 간이 보험증명서이고, Policy는 정식 보험증권입니다.' },
    { id: 43, topic: 4, question: 'Inspection Certificate의 용도는?', options: ['가격 확인', '품질/수량 검사 확인', '운송 확인', '통관 확인'], answer: 1, explanation: 'Inspection Certificate(검사증명서)는 화물의 품질이나 수량 검사 결과를 증명합니다.' },
    { id: 44, topic: 4, question: 'Certificate of Quality의 발급 주체는?', options: ['수출자', '공인 검사기관', '운송인', '은행'], answer: 1, explanation: 'Certificate of Quality(품질증명서)는 공인된 검사기관에서 발급합니다.' },
    { id: 45, topic: 4, question: 'Dock Receipt의 발급 시점은?', options: ['본선 적재 후', '부두 인수 시', '양륙 후', '통관 후'], answer: 1, explanation: 'Dock Receipt(부두수취증)는 화물이 부두에 인수될 때 발급됩니다.' },
    { id: 46, topic: 4, question: "Mate's Receipt의 발급자는?", options: ['선장', '일등항해사', '세관', '보험회사'], answer: 1, explanation: "Mate's Receipt(본선수취증)는 본선의 일등항해사가 발급합니다." },
    { id: 47, topic: 4, question: 'Delivery Order의 용도는?', options: ['선적 지시', '화물 인도 지시', '대금 지급', '보험 청구'], answer: 1, explanation: 'Delivery Order(화물인도지시서)는 운송인에게 화물 인도를 지시하는 서류입니다.' },
    { id: 48, topic: 4, question: 'Shipping Order의 용도는?', options: ['화물 인도', '선적 지시', '대금 청구', '보험 가입'], answer: 1, explanation: 'Shipping Order(선적지시서)는 선박회사에 화물 선적을 지시하는 서류입니다.' },
    { id: 49, topic: 4, question: 'Letter of Guarantee(L/G)의 용도는?', options: ['품질 보증', '선하증권 미도착 시 화물 인수', '대금 보증', '운송 보증'], answer: 1, explanation: 'L/G(수입화물선취보증서)는 B/L이 미도착했을 때 화물을 인수하기 위한 보증서입니다.' },
    { id: 50, topic: 4, question: 'Trust Receipt(T/R)의 용도는?', options: ['선적 확인', '수입화물 인수 및 판매 허가', '품질 보증', '보험 청구'], answer: 1, explanation: 'T/R(수입화물대도)은 수입자가 담보 없이 화물을 인수하여 판매할 수 있게 하는 서류입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-2-documents-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-2-documents-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const currentQ = filteredQuestions[currentQuestion];
    if (!answeredQuestions.includes(currentQ.id)) {
      setAnsweredQuestions([...answeredQuestions, currentQ.id]);
      if (index === currentQ.answer) {
        setScore(score + 1);
      }
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
    localStorage.removeItem('trade-english-2-documents-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 2급 무역서류 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 무역 서류에 대해 자세히 설명해주세요. 서류의 역할과 실제 무역 실무에서 어떻게 사용되는지 알려주세요.`;
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-sky-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/trade-english-2" className="text-gray-600 hover:text-sky-600">무역영어 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-sky-600 font-medium">무역서류</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 무역서류</h1>
          <p className="text-gray-600">기본 무역서류 이해 및 학습</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">전체 진행률</span>
            <span className="text-sm font-bold text-sky-600">{answeredQuestions.length} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {currentQ && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sky-100">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{topics[currentQ.topic].name}</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-sky-50 hover:border-sky-300 border-2 border-transparent'}`}>
                    <span className="font-medium">{index + 1}. {option}</span>
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-6 p-4 bg-sky-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-sky-800">💡 해설</p>
                    <button onClick={() => openAIModal(currentQ)} className="px-3 py-1 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition">AI에게 질문하기</button>
                  </div>
                  <p className="text-sky-700">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">← 이전</button>
          <button onClick={resetProgress} className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition">초기화</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-sky-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-600 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">📊 학습 현황</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-sky-50 rounded-xl">
              <p className="text-2xl font-bold text-sky-600">{answeredQuestions.length}</p>
              <p className="text-sm text-gray-600">푼 문제</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{score}</p>
              <p className="text-sm text-gray-600">맞은 문제</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</p>
              <p className="text-sm text-gray-600">정답률</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{questions.length - answeredQuestions.length}</p>
              <p className="text-sm text-gray-600">남은 문제</p>
            </div>
          </div>
        </div>
      </main>

      {showAIModal && currentQuestionForAI && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4">아래 AI 서비스를 선택하면 문제에 대한 상세 설명을 받을 수 있습니다.</p>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl text-left transition">
                <span className="font-bold text-orange-700">Claude</span>
                <span className="text-orange-600 text-sm ml-2">Anthropic의 AI 어시스턴트</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl text-left transition">
                <span className="font-bold text-green-700">ChatGPT</span>
                <span className="text-green-600 text-sm ml-2">OpenAI의 AI 어시스턴트</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition">
                <span className="font-bold text-blue-700">Gemini</span>
                <span className="text-blue-600 text-sm ml-2">Google의 AI 어시스턴트</span>
              </a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full p-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
