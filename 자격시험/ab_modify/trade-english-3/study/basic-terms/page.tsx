'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BasicTerms3Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: 'Incoterms 기초', count: 10 },
    { id: 1, name: '결제 용어', count: 10 },
    { id: 2, name: '운송 용어', count: 10 },
    { id: 3, name: '서류 용어', count: 10 },
    { id: 4, name: '일반 용어', count: 10 },
  ];

  const questions = [
    // Incoterms 기초 (10문항)
    { id: 1, topic: 0, question: 'FOB의 의미는?', options: ['본선인도', '공장인도', '운임포함', '보험포함'], answer: 0, explanation: 'FOB(Free On Board)는 "본선인도"로, 물품이 본선에 적재될 때 위험이 이전됩니다.' },
    { id: 2, topic: 0, question: 'CIF의 의미는?', options: ['공장인도', '운임보험료포함인도', '목적지인도', '창고인도'], answer: 1, explanation: 'CIF(Cost, Insurance and Freight)는 "운임보험료포함인도"로, 운임과 보험료를 매도인이 부담합니다.' },
    { id: 3, topic: 0, question: 'EXW의 의미는?', options: ['본선인도', '공장인도', '운임포함', '목적지인도'], answer: 1, explanation: 'EXW(Ex Works)는 "공장인도"로, 매도인 공장에서 물품을 인도합니다.' },
    { id: 4, topic: 0, question: 'CFR의 의미는?', options: ['운임포함인도', '보험포함인도', '공장인도', '부두인도'], answer: 0, explanation: 'CFR(Cost and Freight)은 "운임포함인도"로, 운임을 매도인이 부담합니다.' },
    { id: 5, topic: 0, question: 'FOB에서 위험 이전 시점은?', options: ['계약 시', '본선 적재 시', '목적지 도착 시', '대금 지급 시'], answer: 1, explanation: 'FOB 조건에서 위험은 물품이 본선에 적재될 때 매수인에게 이전됩니다.' },
    { id: 6, topic: 0, question: 'CIF에서 보험료 부담 주체는?', options: ['매수인', '매도인', '운송인', '은행'], answer: 1, explanation: 'CIF 조건에서 보험료는 매도인이 부담합니다.' },
    { id: 7, topic: 0, question: 'DDP의 의미는?', options: ['관세미지급인도', '관세지급인도', '부두인도', '창고인도'], answer: 1, explanation: 'DDP(Delivered Duty Paid)는 "관세지급인도"로, 매도인이 관세까지 부담합니다.' },
    { id: 8, topic: 0, question: 'FCA의 의미는?', options: ['본선인도', '운송인인도', '공장인도', '부두인도'], answer: 1, explanation: 'FCA(Free Carrier)는 "운송인인도"로, 지정된 장소에서 운송인에게 인도합니다.' },
    { id: 9, topic: 0, question: 'Incoterms를 관리하는 기관은?', options: ['WTO', 'ICC', 'UN', 'IMF'], answer: 1, explanation: 'Incoterms는 ICC(국제상공회의소)에서 제정하고 관리합니다.' },
    { id: 10, topic: 0, question: 'DAP의 의미는?', options: ['부두인도', '목적지인도', '공장인도', '창고인도'], answer: 1, explanation: 'DAP(Delivered At Place)는 "목적지인도"로, 지정 목적지까지 운송 책임을 집니다.' },

    // 결제 용어 (10문항)
    { id: 11, topic: 1, question: 'L/C의 풀 네임은?', options: ['Letter of Credit', 'License of Commerce', 'Letter of Contract', 'List of Cost'], answer: 0, explanation: 'L/C는 Letter of Credit(신용장)의 약자입니다.' },
    { id: 12, topic: 1, question: 'T/T의 의미는?', options: ['무역거래', '전신환송금', '현금거래', '수표결제'], answer: 1, explanation: 'T/T(Telegraphic Transfer)는 "전신환송금"으로, 은행 간 전자송금입니다.' },
    { id: 13, topic: 1, question: 'D/P의 의미는?', options: ['서류상환결제', '선지급', '후지급', '분할결제'], answer: 0, explanation: 'D/P(Documents against Payment)는 "지급인도조건"으로, 대금 지급 시 서류를 인도합니다.' },
    { id: 14, topic: 1, question: 'D/A의 의미는?', options: ['지급인도', '인수인도', '현금결제', '신용결제'], answer: 1, explanation: 'D/A(Documents against Acceptance)는 "인수인도조건"으로, 어음 인수 시 서류를 인도합니다.' },
    { id: 15, topic: 1, question: 'Payment의 의미는?', options: ['주문', '결제/지급', '배송', '계약'], answer: 1, explanation: 'Payment는 "결제" 또는 "지급"을 의미합니다.' },
    { id: 16, topic: 1, question: 'Advance Payment의 의미는?', options: ['후불', '선불', '분할결제', '외상'], answer: 1, explanation: 'Advance Payment는 "선불" 또는 "선지급"을 의미합니다.' },
    { id: 17, topic: 1, question: 'COD의 의미는?', options: ['선불결제', '대금상환인도', '외상거래', '분할결제'], answer: 1, explanation: 'COD(Cash On Delivery)는 "대금상환인도"로, 물품 인도 시 대금을 지급합니다.' },
    { id: 18, topic: 1, question: 'Open Account의 의미는?', options: ['현금결제', '신용장결제', '외상거래', '선불결제'], answer: 2, explanation: 'Open Account는 "외상거래"로, 신용을 바탕으로 후불 결제합니다.' },
    { id: 19, topic: 1, question: 'Draft의 의미는?', options: ['초안', '환어음', '송장', '계약서'], answer: 1, explanation: 'Draft는 무역에서 "환어음"을 의미합니다.' },
    { id: 20, topic: 1, question: 'Remittance의 의미는?', options: ['환불', '송금', '결제', '대출'], answer: 1, explanation: 'Remittance는 "송금"을 의미합니다.' },

    // 운송 용어 (10문항)
    { id: 21, topic: 2, question: 'B/L의 풀 네임은?', options: ['Bill of Lading', 'Bill of Loading', 'Business Letter', 'Bank Letter'], answer: 0, explanation: 'B/L은 Bill of Lading(선하증권)의 약자입니다.' },
    { id: 22, topic: 2, question: 'AWB의 의미는?', options: ['해상운송장', '항공운송장', '철도운송장', '육상운송장'], answer: 1, explanation: 'AWB(Air Way Bill)는 "항공화물운송장"입니다.' },
    { id: 23, topic: 2, question: 'Shipment의 의미는?', options: ['선박', '선적/발송', '항해', '운임'], answer: 1, explanation: 'Shipment는 "선적" 또는 "발송"을 의미합니다.' },
    { id: 24, topic: 2, question: 'Freight의 의미는?', options: ['화물/운임', '선박', '항구', '창고'], answer: 0, explanation: 'Freight는 "화물" 또는 "운임"을 의미합니다.' },
    { id: 25, topic: 2, question: 'Carrier의 의미는?', options: ['화주', '운송인', '수화인', '송화인'], answer: 1, explanation: 'Carrier는 "운송인" 또는 "운송회사"를 의미합니다.' },
    { id: 26, topic: 2, question: 'Consignee의 의미는?', options: ['송화인', '수화인', '운송인', '보험인'], answer: 1, explanation: 'Consignee는 "수화인"으로, 화물을 받는 사람입니다.' },
    { id: 27, topic: 2, question: 'Shipper의 의미는?', options: ['선박회사', '송화인', '수화인', '선장'], answer: 1, explanation: 'Shipper는 "송화인"으로, 화물을 보내는 사람입니다.' },
    { id: 28, topic: 2, question: 'ETD의 의미는?', options: ['도착예정일', '출발예정일', '선적완료일', '검사일'], answer: 1, explanation: 'ETD(Estimated Time of Departure)는 "출발예정일"입니다.' },
    { id: 29, topic: 2, question: 'ETA의 의미는?', options: ['출발예정일', '도착예정일', '선적일', '하역일'], answer: 1, explanation: 'ETA(Estimated Time of Arrival)는 "도착예정일"입니다.' },
    { id: 30, topic: 2, question: 'Container의 의미는?', options: ['용기', '컨테이너', '포장', '상자'], answer: 1, explanation: 'Container는 화물 운송에 사용되는 "컨테이너"입니다.' },

    // 서류 용어 (10문항)
    { id: 31, topic: 3, question: 'Invoice의 의미는?', options: ['초대장', '송장', '계약서', '영수증'], answer: 1, explanation: 'Invoice는 상품 명세와 금액이 기재된 "송장"입니다.' },
    { id: 32, topic: 3, question: 'Packing List의 의미는?', options: ['가격표', '포장명세서', '선적목록', '재고목록'], answer: 1, explanation: 'Packing List는 포장 내용을 기재한 "포장명세서"입니다.' },
    { id: 33, topic: 3, question: 'C/O의 풀 네임은?', options: ['Certificate of Origin', 'Certificate of Order', 'Copy of Order', 'Contract of Origin'], answer: 0, explanation: 'C/O는 Certificate of Origin(원산지증명서)의 약자입니다.' },
    { id: 34, topic: 3, question: 'Insurance Policy의 의미는?', options: ['보험료', '보험증권', '보험청구', '보험회사'], answer: 1, explanation: 'Insurance Policy는 "보험증권"입니다.' },
    { id: 35, topic: 3, question: 'Quotation의 의미는?', options: ['인용', '견적서', '질문', '설명'], answer: 1, explanation: 'Quotation은 가격과 조건을 제시하는 "견적서"입니다.' },
    { id: 36, topic: 3, question: 'Purchase Order의 의미는?', options: ['판매주문', '구매주문서', '가격표', '영수증'], answer: 1, explanation: 'Purchase Order는 "구매주문서"입니다.' },
    { id: 37, topic: 3, question: 'Contract의 의미는?', options: ['접촉', '계약/계약서', '연락', '접속'], answer: 1, explanation: 'Contract는 "계약" 또는 "계약서"를 의미합니다.' },
    { id: 38, topic: 3, question: 'Proforma Invoice의 용도는?', options: ['정식 청구', '견적/가계약', '세금 신고', '관세 납부'], answer: 1, explanation: 'Proforma Invoice는 정식 계약 전 "견적" 또는 "가계약" 용도입니다.' },
    { id: 39, topic: 3, question: 'Receipt의 의미는?', options: ['영수증', '수령', '접수', '입금'], answer: 0, explanation: 'Receipt는 "영수증"을 의미합니다.' },
    { id: 40, topic: 3, question: 'Document의 의미는?', options: ['문서/서류', '기록', '증거', '보고서'], answer: 0, explanation: 'Document는 "문서" 또는 "서류"를 의미합니다.' },

    // 일반 용어 (10문항)
    { id: 41, topic: 4, question: 'Export의 의미는?', options: ['수입', '수출', '운송', '보관'], answer: 1, explanation: 'Export는 "수출"을 의미합니다.' },
    { id: 42, topic: 4, question: 'Import의 의미는?', options: ['수출', '수입', '운송', '통관'], answer: 1, explanation: 'Import는 "수입"을 의미합니다.' },
    { id: 43, topic: 4, question: 'Customs의 의미는?', options: ['관습', '세관/관세', '고객', '맞춤'], answer: 1, explanation: 'Customs는 "세관" 또는 "관세"를 의미합니다.' },
    { id: 44, topic: 4, question: 'Tariff의 의미는?', options: ['요금', '관세', '세금', '비용'], answer: 1, explanation: 'Tariff는 "관세"를 의미합니다.' },
    { id: 45, topic: 4, question: 'Buyer의 의미는?', options: ['판매자', '구매자', '중개인', '운송인'], answer: 1, explanation: 'Buyer는 "구매자" 또는 "매수인"을 의미합니다.' },
    { id: 46, topic: 4, question: 'Seller의 의미는?', options: ['구매자', '판매자', '중개인', '대리인'], answer: 1, explanation: 'Seller는 "판매자" 또는 "매도인"을 의미합니다.' },
    { id: 47, topic: 4, question: 'Quantity의 의미는?', options: ['품질', '수량', '가격', '무게'], answer: 1, explanation: 'Quantity는 "수량"을 의미합니다.' },
    { id: 48, topic: 4, question: 'Quality의 의미는?', options: ['수량', '품질', '자격', '특성'], answer: 1, explanation: 'Quality는 "품질"을 의미합니다.' },
    { id: 49, topic: 4, question: 'Price의 의미는?', options: ['상품', '가격', '비용', '이익'], answer: 1, explanation: 'Price는 "가격"을 의미합니다.' },
    { id: 50, topic: 4, question: 'Discount의 의미는?', options: ['추가', '할인', '세금', '비용'], answer: 1, explanation: 'Discount는 "할인"을 의미합니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-3-terms-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-3-terms-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-3-terms-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 3급 기초 무역용어 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 무역 용어에 대해 자세히 설명해주세요. 실제 무역에서 어떻게 사용되는지도 알려주세요.`;
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-teal-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/trade-english-3" className="text-gray-600 hover:text-teal-600">무역영어 3급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">기초 무역용어</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 기초 무역용어</h1>
          <p className="text-gray-600">필수 무역 용어 학습</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">전체 진행률</span>
            <span className="text-sm font-bold text-teal-600">{answeredQuestions.length} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {currentQ && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-teal-100">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{topics[currentQ.topic].name}</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent'}`}>
                    <span className="font-medium">{index + 1}. {option}</span>
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-teal-800">💡 해설</p>
                    <button onClick={() => openAIModal(currentQ)} className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition">AI에게 질문하기</button>
                  </div>
                  <p className="text-teal-700">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">← 이전</button>
          <button onClick={resetProgress} className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition">초기화</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-600 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">📊 학습 현황</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <p className="text-2xl font-bold text-teal-600">{answeredQuestions.length}</p>
              <p className="text-sm text-gray-600">푼 문제</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{score}</p>
              <p className="text-sm text-gray-600">맞은 문제</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <p className="text-2xl font-bold text-cyan-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</p>
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
