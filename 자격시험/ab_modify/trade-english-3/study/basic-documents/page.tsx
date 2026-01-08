'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BasicDocuments3Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '운송서류', count: 10 },
    { id: 1, name: '상업서류', count: 10 },
    { id: 2, name: '결제서류', count: 10 },
    { id: 3, name: '통관서류', count: 10 },
    { id: 4, name: '기타서류', count: 10 },
  ];

  const questions = [
    // 운송서류 (10문항)
    { id: 1, topic: 0, question: 'B/L(선하증권)의 역할은?', options: ['보험 증명', '운송계약 증거 및 화물인수증', '대금 청구', '관세 신고'], answer: 1, explanation: 'B/L(Bill of Lading)은 운송계약의 증거이자 화물인수증 역할을 합니다.' },
    { id: 2, topic: 0, question: 'AWB(항공운송장)의 특징은?', options: ['권리증권이다', '권리증권이 아니다', '해상운송용이다', '철도운송용이다'], answer: 1, explanation: 'AWB는 B/L과 달리 권리증권이 아니며 양도가 불가능합니다.' },
    { id: 3, topic: 0, question: 'Clean B/L의 의미는?', options: ['깨끗한 종이 사용', '화물 손상 기재 없음', '원본만 의미', '복사본 의미'], answer: 1, explanation: 'Clean B/L은 화물의 외관 손상이 기재되지 않은 선하증권입니다.' },
    { id: 4, topic: 0, question: 'On Board B/L의 특징은?', options: ['선적 전 발행', '본선 적재 후 발행', '하역 후 발행', '통관 후 발행'], answer: 1, explanation: 'On Board B/L은 화물이 본선에 적재된 후 발행됩니다.' },
    { id: 5, topic: 0, question: 'B/L은 보통 몇 통으로 발행되는가?', options: ['1통', '2통', '3통', '5통'], answer: 2, explanation: 'B/L은 일반적으로 3통(Full set)으로 발행됩니다.' },
    { id: 6, topic: 0, question: 'Shipper는 B/L에서 누구를 의미하는가?', options: ['수화인', '송화인', '운송인', '대리인'], answer: 1, explanation: 'Shipper는 화물을 보내는 "송화인"입니다.' },
    { id: 7, topic: 0, question: 'Consignee는 B/L에서 누구를 의미하는가?', options: ['송화인', '수화인', '선장', '운송인'], answer: 1, explanation: 'Consignee는 화물을 받는 "수화인"입니다.' },
    { id: 8, topic: 0, question: 'Notify Party의 역할은?', options: ['화물 발송', '도착 통지 수령', '대금 지급', '보험 처리'], answer: 1, explanation: 'Notify Party는 화물 도착 시 통지를 받는 당사자입니다.' },
    { id: 9, topic: 0, question: 'Freight Prepaid의 의미는?', options: ['운임 후불', '운임 선불', '운임 없음', '운임 할인'], answer: 1, explanation: 'Freight Prepaid는 운임을 미리 지불했다는 의미입니다.' },
    { id: 10, topic: 0, question: 'Freight Collect의 의미는?', options: ['운임 선불', '운임 후불', '운임 면제', '운임 포함'], answer: 1, explanation: 'Freight Collect는 목적지에서 운임을 받는다는 의미입니다.' },

    // 상업서류 (10문항)
    { id: 11, topic: 1, question: 'Commercial Invoice의 주요 내용은?', options: ['보험 조건', '상품 명세와 가격', '운송 경로', '검사 결과'], answer: 1, explanation: 'Commercial Invoice(상업송장)에는 상품 명세와 가격이 기재됩니다.' },
    { id: 12, topic: 1, question: 'Packing List의 용도는?', options: ['가격 안내', '포장 상세 내역 기재', '보험 증명', '품질 증명'], answer: 1, explanation: 'Packing List는 화물의 포장 상세 내역을 기재합니다.' },
    { id: 13, topic: 1, question: 'Proforma Invoice의 용도는?', options: ['정식 대금 청구', '견적 및 가계약', '관세 신고', '보험 청구'], answer: 1, explanation: 'Proforma Invoice는 정식 계약 전 견적 또는 가계약 용도입니다.' },
    { id: 14, topic: 1, question: 'Weight List의 내용은?', options: ['가격', '중량', '품질', '원산지'], answer: 1, explanation: 'Weight List에는 화물의 중량이 기재됩니다.' },
    { id: 15, topic: 1, question: 'Invoice에 반드시 포함되는 항목이 아닌 것은?', options: ['품명', '수량', '가격', '보험료'], answer: 3, explanation: 'Invoice에는 품명, 수량, 가격이 필수이며, 보험료는 별도 서류에 기재됩니다.' },
    { id: 16, topic: 1, question: 'Shipping Advice의 목적은?', options: ['주문 확인', '선적 통지', '대금 청구', '품질 검사'], answer: 1, explanation: 'Shipping Advice는 화물 선적 사실을 매수인에게 통지합니다.' },
    { id: 17, topic: 1, question: 'Debit Note의 용도는?', options: ['환불 통지', '추가 청구 통지', '할인 통지', '취소 통지'], answer: 1, explanation: 'Debit Note는 추가 금액을 청구할 때 사용합니다.' },
    { id: 18, topic: 1, question: 'Credit Note의 용도는?', options: ['추가 청구', '환불/공제 통지', '주문 확인', '선적 통지'], answer: 1, explanation: 'Credit Note는 환불이나 금액 공제를 통지할 때 사용합니다.' },
    { id: 19, topic: 1, question: 'Purchase Order의 의미는?', options: ['판매 주문', '구매 주문서', '견적서', '송장'], answer: 1, explanation: 'Purchase Order는 "구매 주문서"입니다.' },
    { id: 20, topic: 1, question: 'Sales Contract의 의미는?', options: ['구매 계약', '판매 계약', '운송 계약', '보험 계약'], answer: 1, explanation: 'Sales Contract는 "판매 계약서"입니다.' },

    // 결제서류 (10문항)
    { id: 21, topic: 2, question: 'L/C(신용장)의 발행처는?', options: ['수출자', '수입자', '수입자 거래은행', '수출자 거래은행'], answer: 2, explanation: '신용장은 수입자의 거래은행(개설은행)이 발행합니다.' },
    { id: 22, topic: 2, question: 'Bill of Exchange(환어음)의 발행인은?', options: ['수입자', '수출자', '은행', '보험회사'], answer: 1, explanation: '환어음의 발행인(Drawer)은 수출자입니다.' },
    { id: 23, topic: 2, question: 'Sight Draft의 특징은?', options: ['만기일 지정', '제시 즉시 지급', '분할 지급', '연불 지급'], answer: 1, explanation: 'Sight Draft(일람불 환어음)는 제시 즉시 지급됩니다.' },
    { id: 24, topic: 2, question: 'Usance Draft의 특징은?', options: ['즉시 지급', '만기일에 지급', '선지급', '분할 지급'], answer: 1, explanation: 'Usance Draft(기한부 환어음)는 만기일에 지급됩니다.' },
    { id: 25, topic: 2, question: 'Beneficiary는 신용장에서 누구인가?', options: ['수입자', '수출자', '개설은행', '통지은행'], answer: 1, explanation: 'Beneficiary(수익자)는 신용장의 수혜자인 수출자입니다.' },
    { id: 26, topic: 2, question: 'Applicant는 신용장에서 누구인가?', options: ['수출자', '수입자', '매입은행', '확인은행'], answer: 1, explanation: 'Applicant(개설의뢰인)는 신용장 개설을 의뢰한 수입자입니다.' },
    { id: 27, topic: 2, question: 'Issuing Bank의 역할은?', options: ['신용장 통지', '신용장 개설', '환어음 매입', '화물 운송'], answer: 1, explanation: 'Issuing Bank(개설은행)는 신용장을 발행합니다.' },
    { id: 28, topic: 2, question: 'Advising Bank의 역할은?', options: ['신용장 개설', '신용장 통지', '대금 지급', '화물 검사'], answer: 1, explanation: 'Advising Bank(통지은행)는 수출자에게 신용장을 통지합니다.' },
    { id: 29, topic: 2, question: 'D/P에서 서류 인도 조건은?', options: ['어음 인수 시', '대금 지급 시', '선적 시', '통관 시'], answer: 1, explanation: 'D/P(Documents against Payment)는 대금 지급 시 서류를 인도합니다.' },
    { id: 30, topic: 2, question: 'D/A에서 서류 인도 조건은?', options: ['대금 지급 시', '어음 인수 시', '선적 시', '도착 시'], answer: 1, explanation: 'D/A(Documents against Acceptance)는 어음 인수 시 서류를 인도합니다.' },

    // 통관서류 (10문항)
    { id: 31, topic: 3, question: 'Certificate of Origin(원산지증명서)의 용도는?', options: ['품질 증명', '원산지 증명', '중량 증명', '가격 증명'], answer: 1, explanation: 'Certificate of Origin은 물품의 원산지를 증명합니다.' },
    { id: 32, topic: 3, question: 'C/O 발급 기관은?', options: ['수출자', '상공회의소', '세관', '운송회사'], answer: 1, explanation: '원산지증명서는 상공회의소에서 발급합니다.' },
    { id: 33, topic: 3, question: 'Import License의 용도는?', options: ['수출 허가', '수입 허가', '운송 허가', '보관 허가'], answer: 1, explanation: 'Import License는 수입 허가서입니다.' },
    { id: 34, topic: 3, question: 'Export License의 용도는?', options: ['수입 허가', '수출 허가', '통관 면제', '관세 환급'], answer: 1, explanation: 'Export License는 수출 허가서입니다.' },
    { id: 35, topic: 3, question: 'Customs Declaration의 목적은?', options: ['운송 신청', '세관 신고', '보험 청구', '품질 검사'], answer: 1, explanation: 'Customs Declaration은 세관 신고서입니다.' },
    { id: 36, topic: 3, question: 'Health Certificate는 어떤 품목에 필요한가?', options: ['기계류', '식품/농산물', '섬유류', '금속제품'], answer: 1, explanation: 'Health Certificate는 식품, 농산물 등에 필요한 위생증명서입니다.' },
    { id: 37, topic: 3, question: 'HS Code의 용도는?', options: ['가격 분류', '상품 분류', '운송 분류', '보험 분류'], answer: 1, explanation: 'HS Code는 국제적으로 통일된 상품 분류 코드입니다.' },
    { id: 38, topic: 3, question: 'Tariff의 의미는?', options: ['세금', '관세', '수수료', '보험료'], answer: 1, explanation: 'Tariff는 수입품에 부과되는 관세입니다.' },
    { id: 39, topic: 3, question: 'Duty-Free의 의미는?', options: ['세금 포함', '관세 면제', '무료 배송', '할인 적용'], answer: 1, explanation: 'Duty-Free는 관세가 면제됨을 의미합니다.' },
    { id: 40, topic: 3, question: 'Customs Clearance의 의미는?', options: ['세관 검사', '통관', '관세 납부', '수입 금지'], answer: 1, explanation: 'Customs Clearance는 세관 절차를 완료하는 "통관"입니다.' },

    // 기타서류 (10문항)
    { id: 41, topic: 4, question: 'Insurance Policy의 발급자는?', options: ['수출자', '보험회사', '은행', '세관'], answer: 1, explanation: 'Insurance Policy(보험증권)는 보험회사가 발급합니다.' },
    { id: 42, topic: 4, question: 'Insurance Certificate의 용도는?', options: ['정식 보험증권', '간이 보험증명', '보험 청구', '보험 해지'], answer: 1, explanation: 'Insurance Certificate는 간이 보험증명서입니다.' },
    { id: 43, topic: 4, question: 'Inspection Certificate의 용도는?', options: ['가격 확인', '품질/수량 검사 증명', '원산지 증명', '운송 증명'], answer: 1, explanation: 'Inspection Certificate는 품질이나 수량 검사 결과를 증명합니다.' },
    { id: 44, topic: 4, question: 'Certificate of Quality의 발급 주체는?', options: ['수출자', '공인 검사기관', '운송인', '은행'], answer: 1, explanation: 'Certificate of Quality는 공인 검사기관에서 발급합니다.' },
    { id: 45, topic: 4, question: 'Delivery Order의 용도는?', options: ['선적 지시', '화물 인도 지시', '대금 지급', '보험 청구'], answer: 1, explanation: 'Delivery Order는 화물 인도를 지시하는 서류입니다.' },
    { id: 46, topic: 4, question: 'Letter of Guarantee(L/G)의 용도는?', options: ['품질 보증', 'B/L 미도착 시 화물 인수', '대금 보증', '운송 보증'], answer: 1, explanation: 'L/G는 B/L이 미도착했을 때 화물을 인수하기 위한 보증서입니다.' },
    { id: 47, topic: 4, question: 'Quotation의 의미는?', options: ['주문서', '견적서', '영수증', '계약서'], answer: 1, explanation: 'Quotation은 가격과 조건을 제시하는 견적서입니다.' },
    { id: 48, topic: 4, question: 'Contract의 의미는?', options: ['견적서', '계약서', '송장', '주문서'], answer: 1, explanation: 'Contract는 계약서입니다.' },
    { id: 49, topic: 4, question: 'Receipt의 의미는?', options: ['송장', '영수증', '계약서', '견적서'], answer: 1, explanation: 'Receipt는 영수증입니다.' },
    { id: 50, topic: 4, question: 'Memo(Memorandum)의 용도는?', options: ['공식 계약', '내부 메모/비망록', '대외 서신', '광고'], answer: 1, explanation: 'Memo는 내부 업무용 메모나 비망록입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-3-documents-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-3-documents-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-3-documents-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 3급 기초 무역서류 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 무역 서류에 대해 자세히 설명해주세요. 어떤 상황에서 사용되는지도 알려주세요.`;
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
            <span className="text-teal-600 font-medium">기초 서류</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 기초 서류</h1>
          <p className="text-gray-600">기본 무역서류 이해</p>
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
