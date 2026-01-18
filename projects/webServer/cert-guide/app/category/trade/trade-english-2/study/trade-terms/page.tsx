'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeTerms2Page() {
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
    { id: 0, name: 'Incoterms 기초', count: 10 },
    { id: 1, name: '결제 용어', count: 10 },
    { id: 2, name: '선적 용어', count: 10 },
    { id: 3, name: '보험 용어', count: 10 },
    { id: 4, name: '일반 무역 용어', count: 10 },
  ];

  const questions = [
    // Incoterms 기초 (10문항)
    { id: 1, topic: 0, question: 'FOB의 풀 네임은?', options: ['Free On Board', 'Freight On Board', 'Free Of Burden', 'Freight Over Border'], answer: 0, explanation: 'FOB는 Free On Board의 약자로, 본선인도조건을 의미합니다.' },
    { id: 2, topic: 0, question: 'CIF 조건에서 매도인이 부담하는 비용은?', options: ['운송비만', '보험료만', '운송비와 보험료', '하역비만'], answer: 2, explanation: 'CIF(Cost, Insurance and Freight)에서 매도인은 운송비(Freight)와 보험료(Insurance)를 부담합니다.' },
    { id: 3, topic: 0, question: 'EXW 조건의 의미는?', options: ['공장인도', '본선인도', '운임포함인도', '목적지인도'], answer: 0, explanation: 'EXW(Ex Works)는 공장인도조건으로, 매도인의 공장에서 물품을 인도합니다.' },
    { id: 4, topic: 0, question: 'DAP의 의미는?', options: ['운임지급인도', '목적지인도', '관세지급인도', '부두인도'], answer: 1, explanation: 'DAP(Delivered At Place)는 목적지인도조건으로, 지정된 목적지까지 운송 책임을 집니다.' },
    { id: 5, topic: 0, question: 'FOB 조건에서 위험 이전 시점은?', options: ['공장 출고 시', '본선 적재 시', '목적지 도착 시', '선적서류 인도 시'], answer: 1, explanation: 'FOB 조건에서는 물품이 본선에 적재될 때 위험이 매수인에게 이전됩니다.' },
    { id: 6, topic: 0, question: 'CFR 조건에서 매도인이 부담하지 않는 것은?', options: ['운송비', '통관비용', '보험료', '선적비용'], answer: 2, explanation: 'CFR(Cost and Freight)에서 매도인은 운송비를 부담하지만, 보험료는 매수인이 부담합니다.' },
    { id: 7, topic: 0, question: 'FCA의 풀 네임은?', options: ['Free Carrier', 'Freight Carrier', 'Free Customs', 'Freight Cost Added'], answer: 0, explanation: 'FCA는 Free Carrier의 약자로, 운송인인도조건을 의미합니다.' },
    { id: 8, topic: 0, question: 'DDP 조건에서 관세 부담 주체는?', options: ['매수인', '매도인', '운송인', '보험회사'], answer: 1, explanation: 'DDP(Delivered Duty Paid)에서는 매도인이 관세까지 부담합니다.' },
    { id: 9, topic: 0, question: 'Incoterms 2020에서 해상운송 전용 조건이 아닌 것은?', options: ['FOB', 'CFR', 'CIF', 'CIP'], answer: 3, explanation: 'CIP(Carriage and Insurance Paid to)는 모든 운송수단에 적용 가능한 조건입니다.' },
    { id: 10, topic: 0, question: 'CPT의 의미는?', options: ['운송비지급인도', '관세지급인도', '보험지급인도', '목적지인도'], answer: 0, explanation: 'CPT(Carriage Paid To)는 운송비지급인도조건으로, 지정목적지까지 운송비를 지급합니다.' },

    // 결제 용어 (10문항)
    { id: 11, topic: 1, question: 'L/C의 풀 네임은?', options: ['Letter of Credit', 'License of Commerce', 'Letter of Contract', 'Legal Certificate'], answer: 0, explanation: 'L/C는 Letter of Credit의 약자로, 신용장을 의미합니다.' },
    { id: 12, topic: 1, question: 'T/T의 의미는?', options: ['수표결제', '전신환송금', '신용카드결제', '현금결제'], answer: 1, explanation: 'T/T(Telegraphic Transfer)는 전신환송금으로, 은행을 통한 전자송금입니다.' },
    { id: 13, topic: 1, question: 'D/P의 풀 네임은?', options: ['Documents against Payment', 'Delivery Promise', 'Draft Payment', 'Direct Purchase'], answer: 0, explanation: 'D/P(Documents against Payment)는 지급인도조건으로, 대금 지급 시 서류를 인도합니다.' },
    { id: 14, topic: 1, question: 'D/A와 D/P의 차이점은?', options: ['운송방식', '인수/지급 조건', '보험조건', '통관절차'], answer: 1, explanation: 'D/A(Documents against Acceptance)는 인수 시 서류인도, D/P는 지급 시 서류인도입니다.' },
    { id: 15, topic: 1, question: 'Sight L/C의 특징은?', options: ['만기일 지급', '일람불 지급', '분할 지급', '연불 지급'], answer: 1, explanation: 'Sight L/C(일람불 신용장)는 서류 제시 즉시 대금을 지급받는 신용장입니다.' },
    { id: 16, topic: 1, question: 'Usance L/C의 의미는?', options: ['일람불 신용장', '기한부 신용장', '양도가능 신용장', '취소가능 신용장'], answer: 1, explanation: 'Usance L/C(기한부 신용장)는 일정 기간 후 대금을 지급하는 신용장입니다.' },
    { id: 17, topic: 1, question: 'COD의 의미는?', options: ['대금상환인도', '서류인도', '본선인도', '공장인도'], answer: 0, explanation: 'COD(Cash On Delivery)는 대금상환인도로, 물품 인도와 동시에 대금을 지급합니다.' },
    { id: 18, topic: 1, question: 'Advance Payment의 의미는?', options: ['분할지급', '선지급', '후지급', '대금상환지급'], answer: 1, explanation: 'Advance Payment(선지급)는 물품 선적 전에 대금을 미리 지급하는 방식입니다.' },
    { id: 19, topic: 1, question: 'Open Account의 특징은?', options: ['신용장 필요', '서류결제', '외상거래', '현금거래'], answer: 2, explanation: 'Open Account(외상거래)는 신용장 없이 매수인의 신용을 바탕으로 하는 거래입니다.' },
    { id: 20, topic: 1, question: 'B/E의 풀 네임은?', options: ['Bill of Exchange', 'Bank Exchange', 'Business Enterprise', 'Bill of Entry'], answer: 0, explanation: 'B/E(Bill of Exchange)는 환어음으로, 대금 지급을 요청하는 서류입니다.' },

    // 선적 용어 (10문항)
    { id: 21, topic: 2, question: 'B/L의 풀 네임은?', options: ['Bill of Lading', 'Bank Letter', 'Business License', 'Bill of Loading'], answer: 0, explanation: 'B/L(Bill of Lading)은 선하증권으로, 해상운송의 핵심 서류입니다.' },
    { id: 22, topic: 2, question: 'ETD의 의미는?', options: ['도착예정일', '출발예정일', '선적예정일', '검사예정일'], answer: 1, explanation: 'ETD(Estimated Time of Departure)는 출발예정일을 의미합니다.' },
    { id: 23, topic: 2, question: 'ETA의 의미는?', options: ['출발예정일', '도착예정일', '선적완료일', '검사완료일'], answer: 1, explanation: 'ETA(Estimated Time of Arrival)는 도착예정일을 의미합니다.' },
    { id: 24, topic: 2, question: 'FCL의 의미는?', options: ['부분 컨테이너', '만재 컨테이너', '냉장 컨테이너', '특수 컨테이너'], answer: 1, explanation: 'FCL(Full Container Load)은 만재 컨테이너로, 한 화주가 컨테이너 전체를 사용합니다.' },
    { id: 25, topic: 2, question: 'LCL의 의미는?', options: ['만재 컨테이너', '소량 컨테이너', '대형 컨테이너', '냉동 컨테이너'], answer: 1, explanation: 'LCL(Less than Container Load)은 소량화물로, 여러 화주의 화물을 혼재합니다.' },
    { id: 26, topic: 2, question: 'Consignee의 의미는?', options: ['송화인', '수화인', '운송인', '보험인'], answer: 1, explanation: 'Consignee는 수화인으로, 화물을 수령하는 당사자입니다.' },
    { id: 27, topic: 2, question: 'Shipper의 의미는?', options: ['수화인', '송화인', '선장', '검사관'], answer: 1, explanation: 'Shipper는 송화인으로, 화물을 보내는 당사자입니다.' },
    { id: 28, topic: 2, question: 'Transshipment의 의미는?', options: ['직항운송', '환적', '복합운송', '항공운송'], answer: 1, explanation: 'Transshipment(환적)는 중간 항구에서 다른 선박으로 화물을 옮기는 것입니다.' },
    { id: 29, topic: 2, question: 'Clean B/L의 특징은?', options: ['손상 기재 있음', '손상 기재 없음', '복사본', '원본 없음'], answer: 1, explanation: 'Clean B/L은 화물의 외관 손상이 기재되지 않은 무사고 선하증권입니다.' },
    { id: 30, topic: 2, question: 'AWB의 풀 네임은?', options: ['Air Way Bill', 'All Water Bill', 'Average Weight Bill', 'Agency Work Bill'], answer: 0, explanation: 'AWB(Air Way Bill)는 항공화물운송장으로, 항공운송의 핵심 서류입니다.' },

    // 보험 용어 (10문항)
    { id: 31, topic: 3, question: 'Marine Insurance의 의미는?', options: ['화재보험', '해상보험', '생명보험', '자동차보험'], answer: 1, explanation: 'Marine Insurance는 해상보험으로, 해상운송 중 발생하는 위험을 보상합니다.' },
    { id: 32, topic: 3, question: 'All Risks의 의미는?', options: ['특정위험담보', '전위험담보', '무보험', '부분보험'], answer: 1, explanation: 'All Risks(전위험담보)는 거의 모든 위험을 담보하는 보험조건입니다.' },
    { id: 33, topic: 3, question: 'WA의 풀 네임은?', options: ['With Average', 'Without Accident', 'Water Average', 'Wide Agreement'], answer: 0, explanation: 'WA(With Average)는 단독해손담보로, 단독해손까지 보상합니다.' },
    { id: 34, topic: 3, question: 'FPA의 풀 네임은?', options: ['Free of Particular Average', 'Full Payment Assured', 'Final Price Agreement', 'Free Port Access'], answer: 0, explanation: 'FPA(Free of Particular Average)는 분손부담보로, 분손을 보상하지 않습니다.' },
    { id: 35, topic: 3, question: 'ICC의 의미는?', options: ['국제상공회의소', '협회적하약관', '국제계약조건', '수입통관증명'], answer: 1, explanation: 'ICC(Institute Cargo Clauses)는 협회적하약관으로, 해상보험의 표준약관입니다.' },
    { id: 36, topic: 3, question: 'General Average의 의미는?', options: ['일반평균', '공동해손', '특별해손', '단독해손'], answer: 1, explanation: 'General Average(공동해손)는 선박과 화물의 공동안전을 위해 발생한 손해입니다.' },
    { id: 37, topic: 3, question: 'Particular Average의 의미는?', options: ['공동해손', '단독해손', '전손', '분손'], answer: 1, explanation: 'Particular Average(단독해손)는 개별 화물에만 발생한 손해입니다.' },
    { id: 38, topic: 3, question: 'Total Loss의 의미는?', options: ['부분손해', '전손', '일부손해', '경미한손해'], answer: 1, explanation: 'Total Loss(전손)는 보험목적물이 전부 멸실되거나 완전히 손상된 상태입니다.' },
    { id: 39, topic: 3, question: 'Premium의 의미는?', options: ['보험금', '보험료', '면책금', '자기부담금'], answer: 1, explanation: 'Premium은 보험료로, 보험계약에 대해 지급하는 비용입니다.' },
    { id: 40, topic: 3, question: 'Claim의 의미는?', options: ['보험가입', '보험청구', '보험해지', '보험갱신'], answer: 1, explanation: 'Claim은 보험청구로, 보험사고 발생 시 보상을 요청하는 것입니다.' },

    // 일반 무역 용어 (10문항)
    { id: 41, topic: 4, question: 'Invoice의 의미는?', options: ['송장', '포장명세서', '보험증권', '원산지증명서'], answer: 0, explanation: 'Invoice(송장)는 물품의 명세와 가격을 기재한 상업서류입니다.' },
    { id: 42, topic: 4, question: 'Packing List의 의미는?', options: ['가격표', '포장명세서', '선적목록', '검사성적서'], answer: 1, explanation: 'Packing List(포장명세서)는 화물의 포장 내용을 상세히 기재한 서류입니다.' },
    { id: 43, topic: 4, question: 'C/O의 풀 네임은?', options: ['Customs Office', 'Certificate of Origin', 'Cost Order', 'Cargo Order'], answer: 1, explanation: 'C/O(Certificate of Origin)는 원산지증명서로, 물품의 원산지를 증명합니다.' },
    { id: 44, topic: 4, question: 'Customs Clearance의 의미는?', options: ['세관신고', '통관', '관세환급', '세관검사'], answer: 1, explanation: 'Customs Clearance(통관)는 수출입 화물이 세관 절차를 완료하는 것입니다.' },
    { id: 45, topic: 4, question: 'Tariff의 의미는?', options: ['세금', '관세', '수수료', '운임'], answer: 1, explanation: 'Tariff(관세)는 수입품에 부과되는 세금입니다.' },
    { id: 46, topic: 4, question: 'Duty-Free의 의미는?', options: ['관세면제', '세금포함', '부가세면제', '운임포함'], answer: 0, explanation: 'Duty-Free(관세면제)는 관세가 부과되지 않는 것을 의미합니다.' },
    { id: 47, topic: 4, question: 'Forwarder의 역할은?', options: ['보험업자', '화물운송주선업자', '세관공무원', '검사관'], answer: 1, explanation: 'Forwarder(화물운송주선업자)는 화물 운송을 주선하고 대행하는 업체입니다.' },
    { id: 48, topic: 4, question: 'Quotation의 의미는?', options: ['주문서', '견적서', '영수증', '계약서'], answer: 1, explanation: 'Quotation(견적서)는 물품의 가격과 조건을 제시하는 서류입니다.' },
    { id: 49, topic: 4, question: 'Proforma Invoice의 용도는?', options: ['대금청구', '견적 및 가계약', '세금계산', '관세신고'], answer: 1, explanation: 'Proforma Invoice(견적송장)는 정식 계약 전 견적 및 가계약 용도로 사용됩니다.' },
    { id: 50, topic: 4, question: 'HS Code의 목적은?', options: ['상품분류', '운송분류', '보험분류', '회계분류'], answer: 0, explanation: 'HS Code(품목분류코드)는 국제적으로 통일된 상품 분류 체계입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-2-terms-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-2-terms-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-2-terms-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 2급 무역용어 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 무역 용어에 대해 자세히 설명해주세요. 실제 무역 실무에서 어떻게 사용되는지도 알려주세요.`;
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
            <span className="text-sky-600 font-medium">무역용어</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 무역용어</h1>
          <p className="text-gray-600">Incoterms 기초 및 무역 실무 용어 학습</p>
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
