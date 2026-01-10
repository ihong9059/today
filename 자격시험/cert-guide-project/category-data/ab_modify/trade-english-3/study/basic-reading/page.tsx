'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BasicReading3Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '기초 인사말', count: 10 },
    { id: 1, name: '간단한 문의', count: 10 },
    { id: 2, name: '기본 용어', count: 10 },
    { id: 3, name: '짧은 문장', count: 10 },
    { id: 4, name: '일반 표현', count: 10 },
  ];

  const questions = [
    // 기초 인사말 (10문항)
    { id: 1, topic: 0, question: '"Dear Sir"의 의미는?', options: ['친애하는 선생님께', '관계자분께', '사장님께', '고객님께'], answer: 1, explanation: '"Dear Sir"는 수신인을 모를 때 "관계자분께"라는 의미로 사용하는 일반적인 인사말입니다.' },
    { id: 2, topic: 0, question: '"Yours sincerely"의 의미는?', options: ['당신 것입니다', '진심으로', '서명 대신', '감사합니다'], answer: 1, explanation: '"Yours sincerely"는 편지 끝에 쓰는 결어로 "진심으로"라는 의미입니다.' },
    { id: 3, topic: 0, question: '"Best regards"의 의미는?', options: ['최고입니다', '안부 인사', '좋은 소식', '최선을 다해'], answer: 1, explanation: '"Best regards"는 "안부를 전합니다"라는 의미의 결어입니다.' },
    { id: 4, topic: 0, question: '"Thank you for your letter"의 의미는?', options: ['편지 감사합니다', '편지를 주세요', '편지를 보냈습니다', '편지를 기다립니다'], answer: 0, explanation: '서신에 대한 감사를 표현하는 "편지 감사합니다"입니다.' },
    { id: 5, topic: 0, question: '"We are pleased to inform you"의 의미는?', options: ['알려드려 죄송합니다', '알려드리게 되어 기쁩니다', '정보를 원합니다', '알려주세요'], answer: 1, explanation: '좋은 소식을 전할 때 "알려드리게 되어 기쁩니다"라고 시작합니다.' },
    { id: 6, topic: 0, question: '"Dear Customer"의 의미는?', options: ['친애하는 고객님', '값비싼 고객', '소중한 손님', '귀한 거래처'], answer: 0, explanation: '"Dear Customer"는 "친애하는 고객님"이라는 의미의 인사말입니다.' },
    { id: 7, topic: 0, question: '"To Whom It May Concern"의 의미는?', options: ['관련 부서에', '담당자분께', '관계자 모두에게', '사장님께'], answer: 1, explanation: '수신인을 특정하지 않을 때 사용하는 "담당자분께"라는 의미입니다.' },
    { id: 8, topic: 0, question: '"With best wishes"의 의미는?', options: ['최선을 다해', '좋은 일 바랍니다', '바람이 좋습니다', '희망합니다'], answer: 1, explanation: '"With best wishes"는 "좋은 일 바랍니다"라는 결어입니다.' },
    { id: 9, topic: 0, question: '"Looking forward to hearing from you"의 의미는?', options: ['앞을 봅니다', '회신 기다립니다', '듣기를 원합니다', '전화 주세요'], answer: 1, explanation: '"회신을 기다립니다"라는 의미로 편지 끝에 자주 사용됩니다.' },
    { id: 10, topic: 0, question: '"Yours faithfully"는 언제 사용하는가?', options: ['친한 사이에', '이름을 모를 때', '상사에게만', '공식 문서에만'], answer: 1, explanation: '"Yours faithfully"는 수신인의 이름을 모를 때 (Dear Sir/Madam 사용 시) 쓰는 결어입니다.' },

    // 간단한 문의 (10문항)
    { id: 11, topic: 1, question: '"Could you please send us"의 의미는?', options: ['보내주셨습니다', '보내주시겠습니까', '보냈습니다', '보내지 마세요'], answer: 1, explanation: '정중하게 "~을 보내주시겠습니까?"라고 요청하는 표현입니다.' },
    { id: 12, topic: 1, question: '"We would like to inquire"의 의미는?', options: ['문의합니다', '문의드리고 싶습니다', '질문했습니다', '대답합니다'], answer: 1, explanation: '"문의드리고 싶습니다"라는 정중한 문의 표현입니다.' },
    { id: 13, topic: 1, question: '"Please let us know"의 의미는?', options: ['알려주세요', '알고 있습니다', '모르겠습니다', '알려드립니다'], answer: 0, explanation: '"Please let us know"는 "알려주세요"라는 요청 표현입니다.' },
    { id: 14, topic: 1, question: '"We are interested in"의 의미는?', options: ['흥미롭습니다', '~에 관심이 있습니다', '재미있습니다', '중요합니다'], answer: 1, explanation: '"~에 관심이 있습니다"라는 관심 표명 표현입니다.' },
    { id: 15, topic: 1, question: '"Would it be possible to"의 의미는?', options: ['가능합니다', '~이 가능할까요', '불가능합니다', '가능했습니다'], answer: 1, explanation: '정중하게 "~이 가능할까요?"라고 묻는 표현입니다.' },
    { id: 16, topic: 1, question: '"We need more information about"의 의미는?', options: ['정보가 많습니다', '~에 대한 추가 정보가 필요합니다', '정보를 드립니다', '정보가 없습니다'], answer: 1, explanation: '"~에 대한 추가 정보가 필요합니다"라는 의미입니다.' },
    { id: 17, topic: 1, question: '"Can you confirm"의 의미는?', options: ['확인했습니다', '확인해 주시겠습니까', '확인 불가', '확인됩니다'], answer: 1, explanation: '"확인해 주시겠습니까?"라고 확인을 요청하는 표현입니다.' },
    { id: 18, topic: 1, question: '"Please reply as soon as possible"의 의미는?', options: ['천천히 답하세요', '가능한 빨리 답해주세요', '답할 필요 없습니다', '답했습니다'], answer: 1, explanation: '"가능한 빨리 답해주세요"라는 신속한 회신 요청입니다.' },
    { id: 19, topic: 1, question: '"Do you have any"의 의미는?', options: ['가지고 있습니다', '~이 있습니까', '없습니다', '가질 것입니다'], answer: 1, explanation: '"~이 있습니까?"라고 묻는 기본 질문 표현입니다.' },
    { id: 20, topic: 1, question: '"We would appreciate"의 의미는?', options: ['감사했습니다', '~해 주시면 감사하겠습니다', '감사하지 않습니다', '감사드립니다'], answer: 1, explanation: '"~해 주시면 감사하겠습니다"라는 정중한 요청 표현입니다.' },

    // 기본 용어 (10문항)
    { id: 21, topic: 2, question: '"Price list"의 의미는?', options: ['가격표', '목록 가격', '리스트 값', '가격 목록서'], answer: 0, explanation: '"Price list"는 제품의 가격을 나열한 "가격표"입니다.' },
    { id: 22, topic: 2, question: '"Catalog"의 의미는?', options: ['카탈로그', '분류표', '목록', '안내서'], answer: 0, explanation: '"Catalog"는 제품 정보를 담은 "카탈로그"입니다.' },
    { id: 23, topic: 2, question: '"Sample"의 의미는?', options: ['샘플/견본', '예시', '본보기', '시험'], answer: 0, explanation: '"Sample"은 제품의 "샘플" 또는 "견본"을 의미합니다.' },
    { id: 24, topic: 2, question: '"Quotation"의 의미는?', options: ['인용문', '견적서', '문장', '설명서'], answer: 1, explanation: '"Quotation"은 가격과 조건을 제시하는 "견적서"입니다.' },
    { id: 25, topic: 2, question: '"Order"의 의미는?', options: ['순서', '주문', '명령', '정리'], answer: 1, explanation: '무역에서 "Order"는 "주문"을 의미합니다.' },
    { id: 26, topic: 2, question: '"Delivery"의 의미는?', options: ['배달', '배송/인도', '전달', '운반'], answer: 1, explanation: '"Delivery"는 물품의 "배송" 또는 "인도"를 의미합니다.' },
    { id: 27, topic: 2, question: '"Payment"의 의미는?', options: ['지불/결제', '돈', '대금', '비용'], answer: 0, explanation: '"Payment"는 "지불" 또는 "결제"를 의미합니다.' },
    { id: 28, topic: 2, question: '"Shipment"의 의미는?', options: ['선박', '선적/발송', '운송', '항해'], answer: 1, explanation: '"Shipment"는 물품의 "선적" 또는 "발송"을 의미합니다.' },
    { id: 29, topic: 2, question: '"Invoice"의 의미는?', options: ['초대장', '송장', '영수증', '계산서'], answer: 1, explanation: '"Invoice"는 상품 명세와 금액이 기재된 "송장"입니다.' },
    { id: 30, topic: 2, question: '"Contract"의 의미는?', options: ['접촉', '계약', '연락', '내용'], answer: 1, explanation: '"Contract"는 "계약" 또는 "계약서"를 의미합니다.' },

    // 짧은 문장 (10문항)
    { id: 31, topic: 3, question: '"The goods will be shipped"의 의미는?', options: ['상품이 도착했습니다', '상품이 선적될 것입니다', '상품을 선적했습니다', '상품이 없습니다'], answer: 1, explanation: '"상품이 선적될 것입니다"라는 미래 선적 안내입니다.' },
    { id: 32, topic: 3, question: '"Please find attached"의 의미는?', options: ['첨부를 찾으세요', '첨부파일을 확인해 주세요', '첨부했습니다', '첨부할게요'], answer: 1, explanation: '"첨부파일을 확인해 주세요"라는 첨부물 안내 표현입니다.' },
    { id: 33, topic: 3, question: '"We have received your order"의 의미는?', options: ['주문을 보냈습니다', '주문을 받았습니다', '주문하겠습니다', '주문이 없습니다'], answer: 1, explanation: '"귀하의 주문을 받았습니다"라는 주문 확인입니다.' },
    { id: 34, topic: 3, question: '"The price includes shipping"의 의미는?', options: ['가격이 비쌉니다', '가격에 배송비가 포함됩니다', '배송이 무료입니다', '가격을 올렸습니다'], answer: 1, explanation: '"가격에 배송비가 포함됩니다"라는 의미입니다.' },
    { id: 35, topic: 3, question: '"Payment is due"의 의미는?', options: ['지불했습니다', '지불 기한입니다', '지불 불가', '지불 완료'], answer: 1, explanation: '"지불 기한입니다" 또는 "대금 지급일입니다"라는 의미입니다.' },
    { id: 36, topic: 3, question: '"We apologize for the delay"의 의미는?', options: ['지연에 감사합니다', '지연에 사과드립니다', '지연됩니다', '지연이 없습니다'], answer: 1, explanation: '"지연에 대해 사과드립니다"라는 사과 표현입니다.' },
    { id: 37, topic: 3, question: '"Your order has been confirmed"의 의미는?', options: ['주문이 취소되었습니다', '주문이 확인되었습니다', '주문을 확인하세요', '주문해 주세요'], answer: 1, explanation: '"귀하의 주문이 확인되었습니다"라는 주문 확정 안내입니다.' },
    { id: 38, topic: 3, question: '"Please contact us if you have any questions"의 의미는?', options: ['질문하지 마세요', '질문이 있으시면 연락주세요', '질문에 답합니다', '질문이 많습니다'], answer: 1, explanation: '"질문이 있으시면 연락 주세요"라는 문의 안내입니다.' },
    { id: 39, topic: 3, question: '"We offer a discount"의 의미는?', options: ['할인을 원합니다', '할인을 제공합니다', '할인이 없습니다', '할인해 주세요'], answer: 1, explanation: '"할인을 제공합니다"라는 할인 안내입니다.' },
    { id: 40, topic: 3, question: '"The product is out of stock"의 의미는?', options: ['제품이 재고 있습니다', '제품이 품절입니다', '제품이 좋습니다', '제품을 주문했습니다'], answer: 1, explanation: '"제품이 품절입니다"라는 재고 부족 안내입니다.' },

    // 일반 표현 (10문항)
    { id: 41, topic: 4, question: '"As per your request"의 의미는?', options: ['요청대로', '요청합니다', '요청 거절', '요청 변경'], answer: 0, explanation: '"귀하의 요청대로"라는 의미로, 요청에 따른 행동을 안내합니다.' },
    { id: 42, topic: 4, question: '"For your information"의 의미는?', options: ['정보 부족', '참고로 알려드립니다', '정보 요청', '정보 없음'], answer: 1, explanation: '"참고로 알려드립니다"라는 의미입니다 (약어: FYI).' },
    { id: 43, topic: 4, question: '"Enclosed please find"의 의미는?', options: ['동봉했습니다', '동봉물을 확인해 주세요', '동봉하세요', '동봉 없음'], answer: 1, explanation: '"동봉물을 확인해 주세요"라는 동봉 서류 안내입니다.' },
    { id: 44, topic: 4, question: '"We regret to inform you"의 의미는?', options: ['알려드려 기쁩니다', '유감스럽게도 알려드립니다', '알려주세요', '알 수 없습니다'], answer: 1, explanation: '좋지 않은 소식을 전할 때 "유감스럽게도 알려드립니다"라고 시작합니다.' },
    { id: 45, topic: 4, question: '"At your earliest convenience"의 의미는?', options: ['편할 때', '가능한 빨리', '천천히', '나중에'], answer: 1, explanation: '"가능한 빨리" 또는 "편하신 빠른 시일 내에"라는 의미입니다.' },
    { id: 46, topic: 4, question: '"Please be advised that"의 의미는?', options: ['조언해 주세요', '~임을 알려드립니다', '충고합니다', '알려주세요'], answer: 1, explanation: '"~임을 알려드립니다"라는 공지 표현입니다.' },
    { id: 47, topic: 4, question: '"In reference to"의 의미는?', options: ['참조하여', '~에 관하여', '언급 없이', '참고로'], answer: 1, explanation: '"~에 관하여" 또는 "~과 관련하여"라는 의미입니다.' },
    { id: 48, topic: 4, question: '"We look forward to"의 의미는?', options: ['앞을 봅니다', '~을 기대합니다', '기대하지 않습니다', '앞으로 갑니다'], answer: 1, explanation: '"~을 기대합니다"라는 긍정적 기대 표현입니다.' },
    { id: 49, topic: 4, question: '"Thank you for your cooperation"의 의미는?', options: ['협조하세요', '협조에 감사드립니다', '협조 부탁드립니다', '협조 불가'], answer: 1, explanation: '"협조에 감사드립니다"라는 감사 표현입니다.' },
    { id: 50, topic: 4, question: '"If you have any questions"의 의미는?', options: ['질문이 있습니다', '질문이 있으시면', '질문하세요', '질문 없습니다'], answer: 1, explanation: '"질문이 있으시면"이라는 문의 유도 표현입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-3-reading-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-3-reading-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-3-reading-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 3급 기초 영문해석 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 표현에 대해 자세히 설명해주세요. 실제 무역 서신에서 어떻게 사용되는지 예문도 알려주세요.`;
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
            <span className="text-teal-600 font-medium">기초 영문해석</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 기초 영문해석</h1>
          <p className="text-gray-600">기초 무역 영문 읽기 연습</p>
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
