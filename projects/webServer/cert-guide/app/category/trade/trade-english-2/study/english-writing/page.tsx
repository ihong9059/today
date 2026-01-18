'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function EnglishWriting2Page() {
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
    { id: 0, name: '문의 서신', count: 10 },
    { id: 1, name: '주문 서신', count: 10 },
    { id: 2, name: '회신 작성', count: 10 },
    { id: 3, name: '클레임 표현', count: 10 },
    { id: 4, name: '일반 표현', count: 10 },
  ];

  const questions = [
    // 문의 서신 (10문항)
    { id: 1, topic: 0, question: '"귀사의 제품에 대해 문의드립니다"를 영작하면?', options: ['We inquire about your products', 'We are writing to inquire about your products', 'We want your products information', 'Please tell us your products'], answer: 1, explanation: '"We are writing to inquire about ~"는 공식적인 문의 서신의 표준 표현입니다.' },
    { id: 2, topic: 0, question: '"가격표를 보내주시겠습니까?"의 적절한 영작은?', options: ['Send us price list', 'Give me the price list', 'Could you please send us your price list?', 'I want price list'], answer: 2, explanation: '"Could you please ~?"는 정중한 요청 표현으로 비즈니스 서신에 적합합니다.' },
    { id: 3, topic: 0, question: '"빠른 회신 부탁드립니다"의 영작으로 적절한 것은?', options: ['Reply quickly', 'Fast response please', 'We would appreciate your prompt reply', 'Answer soon'], answer: 2, explanation: '"We would appreciate your prompt reply"는 정중하게 빠른 회신을 요청하는 표준 표현입니다.' },
    { id: 4, topic: 0, question: '"추가 정보가 필요하시면 연락 주십시오"의 영작은?', options: ['Call us if you need more', 'Please contact us if you need further information', 'Tell us what you need more', 'Need more? Contact us'], answer: 1, explanation: '"Please contact us if you need further information"은 추가 정보 제공 의사를 밝히는 표준 표현입니다.' },
    { id: 5, topic: 0, question: '"귀사의 카탈로그를 요청합니다"의 영작은?', options: ['Give us catalog', 'We would like to request your catalog', 'Send catalog please', 'Catalog needed'], answer: 1, explanation: '"We would like to request ~"는 정중하게 요청하는 표현입니다.' },
    { id: 6, topic: 0, question: '"샘플을 보내주실 수 있는지요?"의 영작은?', options: ['Send samples', 'Could you send us some samples?', 'We want samples', 'Samples please'], answer: 1, explanation: '"Could you send us ~?"는 공손한 요청 표현입니다.' },
    { id: 7, topic: 0, question: '"귀사의 서비스에 관심이 있습니다"의 영작은?', options: ['I like your service', 'We are interested in your services', 'Your service is good', 'We want service'], answer: 1, explanation: '"We are interested in ~"은 관심 표명의 표준 비즈니스 표현입니다.' },
    { id: 8, topic: 0, question: '"자세한 설명을 부탁드립니다"의 영작은?', options: ['Explain more', 'Could you provide us with detailed information?', 'Give details', 'More explanation please'], answer: 1, explanation: '"Could you provide us with ~?"는 정중하게 정보를 요청하는 표현입니다.' },
    { id: 9, topic: 0, question: '"납기일에 대해 알려주십시오"의 영작은?', options: ['Tell delivery date', 'When is delivery?', 'Please inform us of the delivery date', 'Delivery time please'], answer: 2, explanation: '"Please inform us of ~"는 정보 요청의 표준 표현입니다.' },
    { id: 10, topic: 0, question: '"귀사와 거래를 희망합니다"의 영작은?', options: ['We want trade with you', 'We would like to do business with you', 'Business with you please', 'Let us trade'], answer: 1, explanation: '"We would like to do business with you"는 거래 희망을 표현하는 정중한 표현입니다.' },

    // 주문 서신 (10문항)
    { id: 11, topic: 1, question: '"다음과 같이 주문합니다"의 영작은?', options: ['We order following', 'We would like to place an order as follows', 'Order below', 'Following is order'], answer: 1, explanation: '"We would like to place an order as follows"는 주문서의 표준 도입 표현입니다.' },
    { id: 12, topic: 1, question: '"가능한 빨리 배송해 주십시오"의 영작은?', options: ['Ship fast', 'Please ship as soon as possible', 'Quick delivery please', 'Hurry shipping'], answer: 1, explanation: '"Please ship as soon as possible"는 신속한 배송을 요청하는 정중한 표현입니다.' },
    { id: 13, topic: 1, question: '"첨부된 주문서를 확인해 주십시오"의 영작은?', options: ['See attached order', 'Check order please', 'Please confirm the attached purchase order', 'Order is attached'], answer: 2, explanation: '"Please confirm the attached purchase order"는 첨부 주문서 확인을 요청하는 표현입니다.' },
    { id: 14, topic: 1, question: '"100개를 추가로 주문합니다"의 영작은?', options: ['100 more please', 'We want 100 more', 'We would like to order an additional 100 units', 'Add 100 to order'], answer: 2, explanation: '"We would like to order an additional ~ units"는 추가 주문의 표준 표현입니다.' },
    { id: 15, topic: 1, question: '"주문을 취소하고 싶습니다"의 영작은?', options: ['Cancel order', 'We would like to cancel our order', 'No more order', 'Order cancelled'], answer: 1, explanation: '"We would like to cancel our order"는 정중하게 주문 취소를 요청하는 표현입니다.' },
    { id: 16, topic: 1, question: '"주문 번호 123을 참조해 주십시오"의 영작은?', options: ['Order 123', 'See order 123', 'Please refer to Order No. 123', 'Reference: 123'], answer: 2, explanation: '"Please refer to Order No. ~"는 주문 번호를 참조 요청하는 표현입니다.' },
    { id: 17, topic: 1, question: '"수량을 변경하고 싶습니다"의 영작은?', options: ['Change quantity', 'We would like to change the quantity', 'Different quantity please', 'Quantity modification'], answer: 1, explanation: '"We would like to change the quantity"는 수량 변경 요청의 표준 표현입니다.' },
    { id: 18, topic: 1, question: '"배송지 주소는 다음과 같습니다"의 영작은?', options: ['Address below', 'The shipping address is as follows', 'Ship to this address', 'Delivery address here'], answer: 1, explanation: '"The shipping address is as follows"는 배송지를 안내하는 표준 표현입니다.' },
    { id: 19, topic: 1, question: '"주문 확인을 부탁드립니다"의 영작은?', options: ['Confirm order please', 'Please acknowledge receipt of our order', 'Order confirmed?', 'Check our order'], answer: 1, explanation: '"Please acknowledge receipt of our order"는 주문 확인을 요청하는 정중한 표현입니다.' },
    { id: 20, topic: 1, question: '"다음 주까지 배송이 가능합니까?"의 영작은?', options: ['Delivery next week?', 'Ship by next week?', 'Is it possible to deliver by next week?', 'Next week delivery OK?'], answer: 2, explanation: '"Is it possible to deliver by ~?"는 납기 가능 여부를 묻는 정중한 표현입니다.' },

    // 회신 작성 (10문항)
    { id: 21, topic: 2, question: '"문의해 주셔서 감사합니다"의 영작은?', options: ['Thanks for asking', 'Thank you for your inquiry', 'Your question is appreciated', 'Thanks for the interest'], answer: 1, explanation: '"Thank you for your inquiry"는 문의에 대한 감사의 표준 표현입니다.' },
    { id: 22, topic: 2, question: '"귀하의 요청에 따라"의 영작은?', options: ['As you want', 'Following your wish', 'As per your request', 'You requested so'], answer: 2, explanation: '"As per your request"는 요청에 따른 행동을 나타내는 비즈니스 표현입니다.' },
    { id: 23, topic: 2, question: '"요청하신 자료를 첨부합니다"의 영작은?', options: ['File attached', 'Here is the document you wanted', 'Please find attached the information you requested', 'Attached is your request'], answer: 2, explanation: '"Please find attached the information you requested"는 요청 자료 첨부의 표준 표현입니다.' },
    { id: 24, topic: 2, question: '"가격 인상에 대해 양해 부탁드립니다"의 영작은?', options: ['Prices went up, sorry', 'Please understand price increase', 'We kindly ask for your understanding regarding the price increase', 'Price up, please accept'], answer: 2, explanation: '"We kindly ask for your understanding regarding ~"는 양해를 구하는 정중한 표현입니다.' },
    { id: 25, topic: 2, question: '"배송 지연에 대해 사과드립니다"의 영작은?', options: ['Sorry for late delivery', 'We apologize for the delay in delivery', 'Delivery was delayed, sorry', 'Late delivery apology'], answer: 1, explanation: '"We apologize for the delay in delivery"는 배송 지연 사과의 표준 표현입니다.' },
    { id: 26, topic: 2, question: '"긍정적으로 검토하겠습니다"의 영작은?', options: ['We will think about it', 'We will consider it positively', 'OK we will see', 'Positive thinking'], answer: 1, explanation: '"We will consider it positively"는 긍정적 검토 의사를 밝히는 표현입니다.' },
    { id: 27, topic: 2, question: '"요청을 수락합니다"의 영작은?', options: ['OK accepted', 'We accept your request', 'Your request is fine', 'Request approved'], answer: 1, explanation: '"We accept your request"는 요청 수락의 표준 표현입니다.' },
    { id: 28, topic: 2, question: '"추후 연락드리겠습니다"의 영작은?', options: ['Will contact later', 'We will get back to you soon', 'Later we call', 'Contact you after'], answer: 1, explanation: '"We will get back to you soon"은 추후 연락 약속의 표현입니다.' },
    { id: 29, topic: 2, question: '"불편을 드려 죄송합니다"의 영작은?', options: ['Sorry for trouble', 'We apologize for any inconvenience caused', 'Inconvenience is sorry', 'Sorry about that'], answer: 1, explanation: '"We apologize for any inconvenience caused"는 불편 사과의 표준 비즈니스 표현입니다.' },
    { id: 30, topic: 2, question: '"귀하의 주문을 확인합니다"의 영작은?', options: ['Order confirmed', 'We confirm your order', 'Your order is checked', 'Confirming order'], answer: 1, explanation: '"We confirm your order"는 주문 확인의 표준 표현입니다.' },

    // 클레임 표현 (10문항)
    { id: 31, topic: 3, question: '"제품에 결함이 있었습니다"의 영작은?', options: ['Product was bad', 'The product was defective', 'Product has problems', 'Something wrong with product'], answer: 1, explanation: '"The product was defective"는 제품 결함을 알리는 표준 표현입니다.' },
    { id: 32, topic: 3, question: '"교환을 요청합니다"의 영작은?', options: ['Change please', 'We request a replacement', 'Exchange this', 'Want new one'], answer: 1, explanation: '"We request a replacement"는 교환 요청의 표준 표현입니다.' },
    { id: 33, topic: 3, question: '"환불을 요청합니다"의 영작은?', options: ['Money back please', 'We would like to request a refund', 'Refund wanted', 'Give money back'], answer: 1, explanation: '"We would like to request a refund"는 환불 요청의 정중한 표현입니다.' },
    { id: 34, topic: 3, question: '"수량이 부족했습니다"의 영작은?', options: ['Not enough quantity', 'The quantity was short', 'Quantity is less', 'Missing quantity'], answer: 1, explanation: '"The quantity was short"는 수량 부족을 알리는 표준 표현입니다.' },
    { id: 35, topic: 3, question: '"파손된 상태로 도착했습니다"의 영작은?', options: ['Arrived broken', 'The goods arrived in damaged condition', 'Product came broken', 'Damage on arrival'], answer: 1, explanation: '"The goods arrived in damaged condition"은 파손 상태 도착을 알리는 표준 표현입니다.' },
    { id: 36, topic: 3, question: '"주문한 것과 다릅니다"의 영작은?', options: ['This is wrong', 'Not what I ordered', 'This differs from what we ordered', 'Order is different'], answer: 2, explanation: '"This differs from what we ordered"는 주문과 다름을 알리는 표현입니다.' },
    { id: 37, topic: 3, question: '"보상을 요청합니다"의 영작은?', options: ['Pay us', 'We request compensation', 'Compensate please', 'Give us money'], answer: 1, explanation: '"We request compensation"은 보상 요청의 표준 표현입니다.' },
    { id: 38, topic: 3, question: '"빠른 조치를 부탁드립니다"의 영작은?', options: ['Act fast', 'We would appreciate your prompt action', 'Quick action please', 'Do something soon'], answer: 1, explanation: '"We would appreciate your prompt action"은 빠른 조치를 요청하는 정중한 표현입니다.' },
    { id: 39, topic: 3, question: '"품질이 기준에 미달합니다"의 영작은?', options: ['Quality is bad', 'The quality does not meet the standards', 'Standards not met', 'Quality under standard'], answer: 1, explanation: '"The quality does not meet the standards"는 품질 미달을 표현하는 표현입니다.' },
    { id: 40, topic: 3, question: '"이 문제를 해결해 주시기 바랍니다"의 영작은?', options: ['Fix this', 'We kindly ask you to resolve this issue', 'Solve problem please', 'Problem needs fixing'], answer: 1, explanation: '"We kindly ask you to resolve this issue"는 문제 해결을 요청하는 정중한 표현입니다.' },

    // 일반 표현 (10문항)
    { id: 41, topic: 4, question: '"귀사의 답변을 기다리겠습니다"의 영작은?', options: ['Waiting for answer', 'We look forward to hearing from you', 'Reply please', 'Answer awaited'], answer: 1, explanation: '"We look forward to hearing from you"는 회신을 기대하는 표준 마무리 표현입니다.' },
    { id: 42, topic: 4, question: '"협조에 감사드립니다"의 영작은?', options: ['Thanks for help', 'Thank you for your cooperation', 'Cooperation appreciated', 'Thanks cooperating'], answer: 1, explanation: '"Thank you for your cooperation"은 협조에 대한 감사의 표준 표현입니다.' },
    { id: 43, topic: 4, question: '"참고로 알려드립니다"의 영작은?', options: ['FYI', 'For your information', 'Let you know', 'Information for you'], answer: 1, explanation: '"For your information"은 참고 사항 전달의 표준 표현입니다 (약어: FYI).' },
    { id: 44, topic: 4, question: '"동봉한 서류를 확인해 주십시오"의 영작은?', options: ['See enclosed', 'Please find the enclosed documents', 'Documents inside', 'Enclosed check please'], answer: 1, explanation: '"Please find the enclosed documents"는 동봉 서류 확인 요청의 표준 표현입니다.' },
    { id: 45, topic: 4, question: '"질문이 있으시면 연락 주십시오"의 영작은?', options: ['Call if questions', 'If you have any questions, please contact us', 'Questions? Call us', 'Contact for questions'], answer: 1, explanation: '"If you have any questions, please contact us"는 문의 안내의 표준 표현입니다.' },
    { id: 46, topic: 4, question: '"성원에 감사드립니다"의 영작은?', options: ['Thanks for support', 'Thank you for your continued support', 'Support appreciated', 'Thanks supporting'], answer: 1, explanation: '"Thank you for your continued support"는 지속적인 성원에 대한 감사 표현입니다.' },
    { id: 47, topic: 4, question: '"아래 내용을 참조해 주십시오"의 영작은?', options: ['See below', 'Please refer to the following', 'Below is reference', 'Following reference'], answer: 1, explanation: '"Please refer to the following"은 아래 내용 참조 요청의 표준 표현입니다.' },
    { id: 48, topic: 4, question: '"연락처는 다음과 같습니다"의 영작은?', options: ['Contact here', 'Our contact information is as follows', 'Following is contact', 'Contact below'], answer: 1, explanation: '"Our contact information is as follows"는 연락처 안내의 표준 표현입니다.' },
    { id: 49, topic: 4, question: '"도움이 되었으면 합니다"의 영작은?', options: ['Hope it helps', 'We hope this information is helpful', 'Helpful hopefully', 'May be helpful'], answer: 1, explanation: '"We hope this information is helpful"은 도움 희망을 표현하는 표준 표현입니다.' },
    { id: 50, topic: 4, question: '"좋은 하루 되세요"의 영작은?', options: ['Good day', 'Have a nice day', 'Day be good', 'Nice day to you'], answer: 1, explanation: '"Have a nice day"는 서신 말미의 친근한 인사 표현입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-2-writing-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-2-writing-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-2-writing-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 2급 영작문 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 문제에 대해 자세히 설명해주세요. 왜 이 답이 맞는지, 무역 영작문에서 이 표현이 어떻게 사용되는지 알려주세요.`;
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
            <span className="text-sky-600 font-medium">영작문</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">✍️ 영작문</h1>
          <p className="text-gray-600">무역영어 2급 기본 영문 작성 연습</p>
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
