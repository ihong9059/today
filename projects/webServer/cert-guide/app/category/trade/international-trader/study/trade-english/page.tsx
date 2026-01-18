'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeEnglishPage() {
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
    // 무역서신 (10문제)
    { id: 1, topic: "무역서신", question: "'We are pleased to inform you that your order has been shipped.'의 의미는?", options: ["주문을 취소했습니다", "주문이 선적되었습니다", "주문을 확인합니다", "주문이 지연됩니다"], answer: 1, explanation: "'your order has been shipped'는 '귀하의 주문이 선적되었습니다'라는 의미입니다." },
    { id: 2, topic: "무역서신", question: "'Please find enclosed our latest catalog.'에서 'enclosed'의 의미는?", options: ["동봉된", "삭제된", "수정된", "요청된"], answer: 0, explanation: "'Enclosed'는 편지나 이메일에 '동봉된', '첨부된'이라는 의미입니다." },
    { id: 3, topic: "무역서신", question: "'We regret to inform you that we cannot accept your order.'의 어조는?", options: ["기쁨", "유감", "분노", "중립"], answer: 1, explanation: "'We regret to inform you'는 유감스러운 소식을 전할 때 사용하는 정중한 표현입니다." },
    { id: 4, topic: "무역서신", question: "'Your prompt reply would be appreciated.'의 의미는?", options: ["천천히 회신해 주세요", "빠른 회신을 부탁드립니다", "회신이 필요 없습니다", "회신을 연기해 주세요"], answer: 1, explanation: "'Prompt reply'는 '신속한 회신'을 의미하며, 정중하게 빠른 답변을 요청하는 표현입니다." },
    { id: 5, topic: "무역서신", question: "'As per your request'의 의미는?", options: ["귀하의 요청과 다르게", "귀하의 요청대로", "요청을 거절하며", "추가 요청에 따라"], answer: 1, explanation: "'As per your request'는 '귀하의 요청에 따라', '요청대로'라는 의미입니다." },
    { id: 6, topic: "무역서신", question: "'We look forward to doing business with you.'의 의미는?", options: ["거래를 종료합니다", "거래를 기대합니다", "거래에 문제가 있습니다", "거래를 보류합니다"], answer: 1, explanation: "'Look forward to'는 '~을 기대하다'라는 의미로, 향후 거래를 희망한다는 표현입니다." },
    { id: 7, topic: "무역서신", question: "'Please acknowledge receipt of this letter.'의 요청 내용은?", options: ["편지 폐기", "편지 수신 확인", "편지 전달", "편지 번역"], answer: 1, explanation: "'Acknowledge receipt'는 '수신을 확인하다'라는 의미로, 편지 수령 확인을 요청하는 것입니다." },
    { id: 8, topic: "무역서신", question: "'Further to our telephone conversation'의 의미는?", options: ["전화 통화 전에", "전화 통화에 이어서", "전화 통화 대신에", "전화 통화를 취소하고"], answer: 1, explanation: "'Further to'는 '~에 이어서', '~에 관련하여'라는 의미입니다." },
    { id: 9, topic: "무역서신", question: "'We are writing to inquire about your products.'의 목적은?", options: ["불만 제기", "제품 문의", "주문 취소", "대금 청구"], answer: 1, explanation: "'Inquire about'는 '~에 대해 문의하다'라는 의미로, 제품 정보를 요청하는 서신입니다." },
    { id: 10, topic: "무역서신", question: "'Kindly arrange for shipment at your earliest convenience.'의 요청은?", options: ["선적 취소", "가능한 빨리 선적", "선적 연기", "선적 방법 변경"], answer: 1, explanation: "'At your earliest convenience'는 '가능한 한 빨리'라는 정중한 표현입니다." },

    // 무역서류 (10문제)
    { id: 11, topic: "무역서류", question: "Bill of Lading(B/L)의 한국어 명칭은?", options: ["상업송장", "선하증권", "포장명세서", "원산지증명서"], answer: 1, explanation: "Bill of Lading(B/L)은 선하증권으로, 해상운송 시 화물의 수령을 증명하는 서류입니다." },
    { id: 12, topic: "무역서류", question: "Commercial Invoice에 포함되지 않는 항목은?", options: ["품명 및 수량", "단가 및 총액", "보험증권 번호", "선적 조건"], answer: 2, explanation: "Commercial Invoice(상업송장)에는 보험증권 번호가 포함되지 않으며, 이는 보험증권에 기재됩니다." },
    { id: 13, topic: "무역서류", question: "'Clean B/L'의 의미는?", options: ["오염된 선하증권", "무사고 선하증권", "분실된 선하증권", "복사본 선하증권"], answer: 1, explanation: "Clean B/L은 화물의 외관상 하자가 없음을 나타내는 '무사고 선하증권'입니다." },
    { id: 14, topic: "무역서류", question: "Packing List에 기재되는 주요 내용이 아닌 것은?", options: ["포장 단위", "순중량/총중량", "대금 결제 조건", "포장 번호"], answer: 2, explanation: "Packing List(포장명세서)에는 대금 결제 조건이 아닌 포장 관련 정보가 기재됩니다." },
    { id: 15, topic: "무역서류", question: "Certificate of Origin의 주요 목적은?", options: ["품질 증명", "원산지 증명", "수량 증명", "가격 증명"], answer: 1, explanation: "Certificate of Origin(원산지증명서)은 물품의 원산지를 증명하여 관세 혜택 등을 받기 위한 서류입니다." },
    { id: 16, topic: "무역서류", question: "'On Board B/L'의 의미는?", options: ["선적 예정 선하증권", "본선 적재 선하증권", "항공운송장", "복합운송증권"], answer: 1, explanation: "On Board B/L은 화물이 실제로 본선에 적재되었음을 증명하는 선하증권입니다." },
    { id: 17, topic: "무역서류", question: "Insurance Policy와 Insurance Certificate의 차이는?", options: ["발행 기관", "양도 가능 여부", "보험료 차이", "동일한 서류"], answer: 1, explanation: "Insurance Policy(보험증권)는 양도 가능하고, Insurance Certificate(보험증명서)는 양도가 제한됩니다." },
    { id: 18, topic: "무역서류", question: "'Consignee' 항목에 기재되는 내용은?", options: ["송하인", "수하인", "운송인", "보험자"], answer: 1, explanation: "Consignee는 '수하인'으로, 화물을 수령할 당사자를 의미합니다." },
    { id: 19, topic: "무역서류", question: "'Notify Party'의 역할은?", options: ["대금 지급", "화물 도착 통지 수신", "물품 검사", "관세 납부"], answer: 1, explanation: "Notify Party는 화물 도착 시 통지를 받는 당사자입니다." },
    { id: 20, topic: "무역서류", question: "Air Waybill(AWB)과 B/L의 공통점은?", options: ["유가증권", "운송계약 증빙", "양도 가능", "해상운송 전용"], answer: 1, explanation: "둘 다 운송계약의 증빙 서류이나, AWB는 유가증권이 아니고 양도가 불가능합니다." },

    // 영문계약서 (10문제)
    { id: 21, topic: "영문계약서", question: "'Whereas' 조항의 역할은?", options: ["계약 종료", "계약 배경 설명", "위약금 규정", "분쟁 해결"], answer: 1, explanation: "'Whereas' 조항(전문)은 계약 체결의 배경과 목적을 설명하는 부분입니다." },
    { id: 22, topic: "영문계약서", question: "'Force Majeure'의 한국어 의미는?", options: ["계약 위반", "불가항력", "손해배상", "계약 연장"], answer: 1, explanation: "Force Majeure는 천재지변 등 예측 불가능한 사태를 의미하는 '불가항력'입니다." },
    { id: 23, topic: "영문계약서", question: "'Liquidated Damages'의 의미는?", options: ["유동자산", "예정손해배상액", "청산 비용", "유동부채"], answer: 1, explanation: "Liquidated Damages는 계약 위반 시 미리 정한 '예정손해배상액'입니다." },
    { id: 24, topic: "영문계약서", question: "'Termination Clause'에서 다루는 내용은?", options: ["계약 체결", "계약 해지", "가격 조정", "품질 보증"], answer: 1, explanation: "Termination Clause(해지 조항)는 계약 해지의 조건과 절차를 규정합니다." },
    { id: 25, topic: "영문계약서", question: "'Confidentiality Agreement'의 목적은?", options: ["가격 공개", "비밀 유지", "정보 공유", "기술 이전"], answer: 1, explanation: "Confidentiality Agreement(비밀유지계약)는 기밀 정보의 보호를 목적으로 합니다." },
    { id: 26, topic: "영문계약서", question: "'Indemnification'의 의미는?", options: ["손해 면제", "손해 배상", "손해 통보", "손해 분담"], answer: 1, explanation: "Indemnification은 상대방의 손해를 보상해 주는 '면책/손해배상'을 의미합니다." },
    { id: 27, topic: "영문계약서", question: "'Governing Law'가 규정하는 것은?", options: ["적용 법률", "중재 기관", "재판 관할", "계약 언어"], answer: 0, explanation: "Governing Law(준거법)는 계약 해석과 분쟁 해결에 적용되는 법률을 규정합니다." },
    { id: 28, topic: "영문계약서", question: "'Assignment' 조항에서 금지하는 것은?", options: ["계약 이행", "계약 양도", "계약 변경", "계약 연장"], answer: 1, explanation: "Assignment(양도) 조항은 일반적으로 상대방 동의 없이 계약상 권리 의무의 양도를 금지합니다." },
    { id: 29, topic: "영문계약서", question: "'Entire Agreement' 조항의 효과는?", options: ["부분 합의", "구두 약정 무효화", "추가 합의 허용", "암묵적 동의 인정"], answer: 1, explanation: "Entire Agreement(완전합의) 조항은 서면 계약서가 당사자 간 유일한 합의임을 명시합니다." },
    { id: 30, topic: "영문계약서", question: "'Warranty'와 'Guarantee'의 관계는?", options: ["동일한 의미", "반대 의미", "유사하나 법적 강도 다름", "무관"], answer: 2, explanation: "둘 다 보증을 의미하나, Guarantee가 일반적으로 더 강한 법적 구속력을 가집니다." },

    // 비즈니스 커뮤니케이션 (10문제)
    { id: 31, topic: "비즈니스 커뮤니케이션", question: "'Could you please clarify the following points?'의 의도는?", options: ["항의", "설명 요청", "거절", "승인"], answer: 1, explanation: "'Clarify'는 '명확히 하다'라는 의미로, 추가 설명을 요청하는 정중한 표현입니다." },
    { id: 32, topic: "비즈니스 커뮤니케이션", question: "'We would appreciate it if you could expedite the delivery.'의 요청은?", options: ["배송 취소", "배송 신속 처리", "배송 연기", "배송지 변경"], answer: 1, explanation: "'Expedite'는 '신속히 처리하다'라는 의미로, 빠른 배송을 요청하는 표현입니다." },
    { id: 33, topic: "비즈니스 커뮤니케이션", question: "'Please be advised that~'로 시작하는 문장의 목적은?", options: ["질문", "통보/안내", "사과", "거절"], answer: 1, explanation: "'Please be advised that~'은 '~을 알려드립니다'라는 공식적인 통보 표현입니다." },
    { id: 34, topic: "비즈니스 커뮤니케이션", question: "'I am writing on behalf of our CEO.'에서 'on behalf of'의 의미는?", options: ["대신하여", "함께", "반대하여", "무관하게"], answer: 0, explanation: "'On behalf of'는 '~을 대신하여', '~를 대표하여'라는 의미입니다." },
    { id: 35, topic: "비즈니스 커뮤니케이션", question: "'We apologize for any inconvenience caused.'의 상황은?", options: ["감사 인사", "사과", "축하", "제안"], answer: 1, explanation: "'Apologize for inconvenience'는 불편을 끼쳐서 사과한다는 표현입니다." },
    { id: 36, topic: "비즈니스 커뮤니케이션", question: "'Please find attached the revised quotation.'에서 'attached'의 의미는?", options: ["삭제된", "첨부된", "수정된", "승인된"], answer: 1, explanation: "'Attached'는 이메일 등에 '첨부된'이라는 의미입니다." },
    { id: 37, topic: "비즈니스 커뮤니케이션", question: "'We are in receipt of your inquiry dated May 5.'의 의미는?", options: ["5월 5일자 문의를 받았습니다", "5월 5일에 문의하겠습니다", "5월 5일까지 회신하겠습니다", "5월 5일자 문의를 거절합니다"], answer: 0, explanation: "'Be in receipt of'는 '~을 받다'라는 공식적인 표현입니다." },
    { id: 38, topic: "비즈니스 커뮤니케이션", question: "'Subject to final confirmation'의 의미는?", options: ["최종 확정됨", "최종 확인 조건부", "확인 불필요", "즉시 유효"], answer: 1, explanation: "'Subject to'는 '~을 조건으로'라는 의미로, 최종 확인이 필요함을 나타냅니다." },
    { id: 39, topic: "비즈니스 커뮤니케이션", question: "'For your information (FYI)'의 용도는?", options: ["긴급 요청", "참고용 안내", "승인 요청", "반대 의사"], answer: 1, explanation: "FYI는 '참고로 알려드립니다'라는 의미로, 정보 제공 목적으로 사용됩니다." },
    { id: 40, topic: "비즈니스 커뮤니케이션", question: "'We reserve the right to~'의 의미는?", options: ["권리를 포기합니다", "권리를 유보합니다", "권리를 양도합니다", "권리를 부인합니다"], answer: 1, explanation: "'Reserve the right'는 '권리를 유보하다'라는 의미로, 특정 조치를 취할 권리가 있음을 명시합니다." },

    // 무역용어 (10문제)
    { id: 41, topic: "무역용어", question: "'Proforma Invoice'의 용도는?", options: ["최종 대금 청구", "견적/가계약서", "세금계산서", "영수증"], answer: 1, explanation: "Proforma Invoice는 정식 계약 전 가격, 조건 등을 제시하는 견적서/가송장입니다." },
    { id: 42, topic: "무역용어", question: "'Drawee'의 의미는?", options: ["발행인", "지급인(어음 인수인)", "수취인", "배서인"], answer: 1, explanation: "Drawee는 환어음에서 대금을 지급해야 하는 '지급인' 또는 '어음 인수인'입니다." },
    { id: 43, topic: "무역용어", question: "'Freight Prepaid'의 의미는?", options: ["운임 후불", "운임 선불", "운임 면제", "운임 분담"], answer: 1, explanation: "Freight Prepaid는 운임이 미리 지불되었다는 '운임 선불'을 의미합니다." },
    { id: 44, topic: "무역용어", question: "'Transshipment'의 의미는?", options: ["직접 운송", "환적", "반송", "분할 선적"], answer: 1, explanation: "Transshipment는 화물을 중간 항구에서 다른 선박으로 옮겨 싣는 '환적'입니다." },
    { id: 45, topic: "무역용어", question: "'Demurrage'의 발생 원인은?", options: ["조기 하역", "정박 기간 초과", "화물 분실", "품질 불량"], answer: 1, explanation: "Demurrage는 선박이 약정된 정박 기간을 초과하여 발생하는 체선료입니다." },
    { id: 46, topic: "무역용어", question: "'FOB Stowed'에서 'Stowed'의 의미는?", options: ["보험 포함", "적부 완료", "통관 완료", "양하 완료"], answer: 1, explanation: "'Stowed'는 화물을 선창 내에 적부(정리)까지 완료했다는 의미입니다." },
    { id: 47, topic: "무역용어", question: "'ETD'와 'ETA'의 의미는?", options: ["예상 출발/도착 시간", "실제 출발/도착 시간", "출발지/도착지", "비용/가격"], answer: 0, explanation: "ETD(Estimated Time of Departure)는 예상 출발 시간, ETA(Estimated Time of Arrival)는 예상 도착 시간입니다." },
    { id: 48, topic: "무역용어", question: "'Advising Bank'의 역할은?", options: ["신용장 개설", "신용장 통지", "대금 지급", "서류 심사"], answer: 1, explanation: "Advising Bank(통지은행)는 개설은행을 대신하여 수출상에게 신용장을 통지합니다." },
    { id: 49, topic: "무역용어", question: "'Partial Shipment'의 의미는?", options: ["전량 선적", "분할 선적", "선적 취소", "재선적"], answer: 1, explanation: "Partial Shipment는 계약 물량을 나누어 여러 번 선적하는 '분할 선적'입니다." },
    { id: 50, topic: "무역용어", question: "'Negotiating Bank'의 기능은?", options: ["신용장 개설", "서류 매입", "화물 운송", "보험 가입"], answer: 1, explanation: "Negotiating Bank(매입은행)는 수출상으로부터 환어음과 선적서류를 매입하는 은행입니다." },
  ];

  const topics = ["전체", "무역서신", "무역서류", "영문계약서", "비즈니스 커뮤니케이션", "무역용어"];

  const filteredQuestions = currentTopic && currentTopic !== "전체"
    ? questions.filter(q => q.topic === currentTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-progress');
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
            <span className="text-indigo-600 font-medium">무역영어</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🌍 무역영어</h1>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`국제무역사 무역영어 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-center font-medium">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`국제무역사 무역영어 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-center font-medium">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`국제무역사 무역영어 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-center font-medium">Gemini에게 질문하기</a>
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
