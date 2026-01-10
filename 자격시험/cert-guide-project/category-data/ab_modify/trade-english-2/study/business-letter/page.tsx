'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BusinessLetter2Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '서신 구성', count: 10 },
    { id: 1, name: '문의 서신', count: 10 },
    { id: 2, name: '주문 서신', count: 10 },
    { id: 3, name: '회신 서신', count: 10 },
    { id: 4, name: '기타 서신', count: 10 },
  ];

  const questions = [
    // 서신 구성 (10문항)
    { id: 1, topic: 0, question: '비즈니스 서신의 발신인 주소는 어디에 위치하는가?', options: ['서신 하단', '서신 상단', '본문 중간', '서명 아래'], answer: 1, explanation: '발신인 주소(Letterhead/Return Address)는 서신 상단에 위치합니다.' },
    { id: 2, topic: 0, question: '"Dear Sir or Madam"은 언제 사용하는가?', options: ['친한 동료에게', '수신인을 모를 때', '상사에게', '고객에게만'], answer: 1, explanation: '"Dear Sir or Madam"은 수신인의 이름을 모를 때 사용하는 일반적인 인사말입니다.' },
    { id: 3, topic: 0, question: '"Yours faithfully"는 어떤 경우에 사용하는가?', options: ['Dear Mr. Kim 사용 시', 'Dear Sir/Madam 사용 시', '친구에게', '내부 메모 시'], answer: 1, explanation: '"Yours faithfully"는 "Dear Sir/Madam"처럼 이름을 모르는 경우의 결어입니다.' },
    { id: 4, topic: 0, question: '"Yours sincerely"는 어떤 경우에 사용하는가?', options: ['이름을 모를 때', '이름을 알 때', '공식 문서에만', '비공식 메모에만'], answer: 1, explanation: '"Yours sincerely"는 "Dear Mr./Ms. ~"처럼 이름을 아는 경우의 결어입니다.' },
    { id: 5, topic: 0, question: 'Subject line(제목줄)의 위치는?', options: ['인사말 전', '인사말 후, 본문 전', '본문 후', '서명 전'], answer: 1, explanation: 'Subject line은 인사말(Dear ~) 다음, 본문 시작 전에 위치합니다.' },
    { id: 6, topic: 0, question: 'Enclosure의 의미는?', options: ['서명', '동봉물', '참조', '추신'], answer: 1, explanation: 'Enclosure(Encl.)는 서신에 동봉된 서류를 표시합니다.' },
    { id: 7, topic: 0, question: 'CC의 의미는?', options: ['사본', '참조', '본문', '제목'], answer: 1, explanation: 'CC(Carbon Copy)는 참조인에게 사본을 보낸다는 의미입니다.' },
    { id: 8, topic: 0, question: 'P.S.의 위치는?', options: ['서두', '본문 중간', '서명 위', '서명 후'], answer: 3, explanation: 'P.S.(Post Script, 추신)는 서명 후에 추가 내용을 적을 때 사용합니다.' },
    { id: 9, topic: 0, question: 'Reference number의 용도는?', options: ['가격 표시', '서신 추적 및 관리', '날짜 표시', '서명 대용'], answer: 1, explanation: 'Reference number는 서신을 추적하고 관리하기 위한 참조번호입니다.' },
    { id: 10, topic: 0, question: '비즈니스 서신에서 날짜 표기로 적절한 것은?', options: ['1/5/26', 'January 5, 2026', '5-1-26', '26/1/5'], answer: 1, explanation: '국제 비즈니스에서는 "January 5, 2026" 형식이 명확하고 권장됩니다.' },

    // 문의 서신 (10문항)
    { id: 11, topic: 1, question: '문의 서신의 목적을 밝히는 표현은?', options: ['We are writing to complain', 'We are writing to inquire about', 'We are pleased to inform', 'We regret to inform'], answer: 1, explanation: '"We are writing to inquire about ~"는 문의 목적을 밝히는 표준 표현입니다.' },
    { id: 12, topic: 1, question: '"귀사 제품의 가격 정보를 요청합니다"의 표현은?', options: ['Give us prices', 'We would like to request pricing information on your products', 'Tell prices now', 'Prices wanted'], answer: 1, explanation: '"We would like to request ~"는 정중하게 정보를 요청하는 표현입니다.' },
    { id: 13, topic: 1, question: '카탈로그 요청 시 적절한 표현은?', options: ['Send catalog', 'Could you please send us your latest catalog?', 'Catalog now', 'We need catalog'], answer: 1, explanation: '"Could you please send us ~?"는 정중한 요청 표현입니다.' },
    { id: 14, topic: 1, question: '"추가 정보가 필요합니다"의 표현은?', options: ['More info please', 'We require additional information', 'Need more details', 'Information missing'], answer: 1, explanation: '"We require additional information"은 추가 정보 필요를 표현하는 공식적 표현입니다.' },
    { id: 15, topic: 1, question: '"샘플을 보내주실 수 있습니까?"의 표현은?', options: ['Samples please', 'Would it be possible to send us samples?', 'We want samples', 'Send samples now'], answer: 1, explanation: '"Would it be possible to ~?"는 가능 여부를 묻는 정중한 표현입니다.' },
    { id: 16, topic: 1, question: '문의 서신의 마무리로 적절한 표현은?', options: ['Reply soon', 'We look forward to your reply', 'Answer quickly', 'Waiting for response'], answer: 1, explanation: '"We look forward to your reply"는 회신을 기대하는 정중한 마무리 표현입니다.' },
    { id: 17, topic: 1, question: '"귀사의 신제품에 관심이 있습니다"의 표현은?', options: ['We like your new product', 'We are interested in your new products', 'New products are good', 'Interested in products'], answer: 1, explanation: '"We are interested in ~"은 관심 표명의 표준 비즈니스 표현입니다.' },
    { id: 18, topic: 1, question: '거래 조건을 문의할 때 적절한 표현은?', options: ['What are your terms?', 'Could you provide us with your terms and conditions?', 'Terms please', 'Tell us conditions'], answer: 1, explanation: '"Could you provide us with ~?"는 정보 요청의 정중한 표현입니다.' },
    { id: 19, topic: 1, question: '"빠른 회신 부탁드립니다"의 표현은?', options: ['Reply fast', 'A prompt reply would be appreciated', 'Quick answer please', 'Respond soon'], answer: 1, explanation: '"A prompt reply would be appreciated"는 정중하게 빠른 회신을 요청하는 표현입니다.' },
    { id: 20, topic: 1, question: '문의 서신에서 자사 소개 시 적절한 표현은?', options: ['We are company', 'We are a leading manufacturer of ~', 'Our company is big', 'We make products'], answer: 1, explanation: '"We are a leading manufacturer of ~"은 자사를 소개하는 전문적인 표현입니다.' },

    // 주문 서신 (10문항)
    { id: 21, topic: 2, question: '주문 서신의 도입부로 적절한 표현은?', options: ['We want to buy', 'We would like to place an order for', 'Order this now', 'Buying from you'], answer: 1, explanation: '"We would like to place an order for ~"는 주문 서신의 표준 도입 표현입니다.' },
    { id: 22, topic: 2, question: '"첨부된 주문서를 참조해 주십시오"의 표현은?', options: ['See order attached', 'Please refer to the attached purchase order', 'Order is enclosed', 'Look at attachment'], answer: 1, explanation: '"Please refer to the attached ~"는 첨부 서류 참조를 요청하는 표현입니다.' },
    { id: 23, topic: 2, question: '"가능한 빨리 배송해 주십시오"의 표현은?', options: ['Ship fast', 'Please ship as soon as possible', 'Quick delivery needed', 'Hurry up shipping'], answer: 1, explanation: '"Please ship as soon as possible"는 신속 배송을 요청하는 정중한 표현입니다.' },
    { id: 24, topic: 2, question: '주문 확인을 요청하는 표현은?', options: ['Confirm order', 'Please acknowledge receipt of this order', 'Order OK?', 'Did you get order?'], answer: 1, explanation: '"Please acknowledge receipt of this order"는 주문 확인을 요청하는 표준 표현입니다.' },
    { id: 25, topic: 2, question: '"대금은 신용장으로 결제하겠습니다"의 표현은?', options: ['Pay by L/C', 'Payment will be made by Letter of Credit', 'L/C payment', 'Credit payment coming'], answer: 1, explanation: '"Payment will be made by ~"는 결제 방식을 알리는 표준 표현입니다.' },
    { id: 26, topic: 2, question: '배송 주소를 알릴 때 적절한 표현은?', options: ['Ship here', 'Please ship to the following address', 'Address below', 'Delivery to this place'], answer: 1, explanation: '"Please ship to the following address"는 배송지를 안내하는 표준 표현입니다.' },
    { id: 27, topic: 2, question: '"주문 수량은 500개입니다"의 표현은?', options: ['500 pieces wanted', 'The quantity ordered is 500 units', 'We want 500', '500 needed'], answer: 1, explanation: '"The quantity ordered is ~"는 주문 수량을 명시하는 표준 표현입니다.' },
    { id: 28, topic: 2, question: '납기일을 지정하는 표현은?', options: ['Delivery by June', 'We require delivery by June 30', 'June delivery needed', 'Must arrive June'], answer: 1, explanation: '"We require delivery by ~"는 납기일을 지정하는 표준 표현입니다.' },
    { id: 29, topic: 2, question: '"이전 주문과 동일한 조건입니다"의 표현은?', options: ['Same as before', 'Terms and conditions remain the same as our previous order', 'Like last order', 'Previous terms apply'], answer: 1, explanation: '"Terms and conditions remain the same as ~"는 동일 조건을 알리는 표현입니다.' },
    { id: 30, topic: 2, question: '주문 서신의 마무리로 적절한 표현은?', options: ['Thanks for order', 'We look forward to receiving the goods', 'Hope to get items', 'Waiting for delivery'], answer: 1, explanation: '"We look forward to receiving ~"은 물품 수령을 기대하는 마무리 표현입니다.' },

    // 회신 서신 (10문항)
    { id: 31, topic: 3, question: '문의에 대한 회신 시작 표현은?', options: ['Got your letter', 'Thank you for your inquiry of January 5', 'Your letter received', 'We read your letter'], answer: 1, explanation: '"Thank you for your inquiry of ~"는 문의에 감사하며 회신을 시작하는 표현입니다.' },
    { id: 32, topic: 3, question: '"요청하신 정보를 보내드립니다"의 표현은?', options: ['Here is info', 'Please find enclosed the information you requested', 'Sending info now', 'Information attached'], answer: 1, explanation: '"Please find enclosed ~"는 요청 자료를 동봉했음을 알리는 표현입니다.' },
    { id: 33, topic: 3, question: '"주문을 확인합니다"의 표현은?', options: ['Order confirmed', 'We are pleased to confirm your order', 'Your order is OK', 'Confirmed the order'], answer: 1, explanation: '"We are pleased to confirm ~"은 주문 확인의 정중한 표현입니다.' },
    { id: 34, topic: 3, question: '"불편을 드려 죄송합니다"의 표현은?', options: ['Sorry for trouble', 'We apologize for any inconvenience caused', 'Our bad', 'Inconvenience sorry'], answer: 1, explanation: '"We apologize for any inconvenience caused"는 불편 사과의 표준 표현입니다.' },
    { id: 35, topic: 3, question: '"배송이 지연되어 죄송합니다"의 표현은?', options: ['Delivery late sorry', 'We regret to inform you of the delay in shipment', 'Sorry for late shipping', 'Shipment delayed'], answer: 1, explanation: '"We regret to inform you of ~"는 유감스러운 소식을 전하는 표현입니다.' },
    { id: 36, topic: 3, question: '"긍정적으로 검토하겠습니다"의 표현은?', options: ['Will think about it', 'We will give your request our favorable consideration', 'Considering it positively', 'Good thinking'], answer: 1, explanation: '"We will give ~ our favorable consideration"은 긍정적 검토 의사 표현입니다.' },
    { id: 37, topic: 3, question: '"요청을 수락합니다"의 표현은?', options: ['OK we accept', 'We are happy to accept your proposal', 'Accepted', 'Your request is fine'], answer: 1, explanation: '"We are happy to accept ~"은 요청 수락의 긍정적 표현입니다.' },
    { id: 38, topic: 3, question: '"가격 인상에 양해 부탁드립니다"의 표현은?', options: ['Prices went up', 'We kindly ask for your understanding regarding the price increase', 'Please accept price raise', 'Price up now'], answer: 1, explanation: '"We kindly ask for your understanding regarding ~"는 양해를 구하는 정중한 표현입니다.' },
    { id: 39, topic: 3, question: '요청을 거절할 때 적절한 표현은?', options: ['Cannot do it', 'We regret that we are unable to meet your request', 'No way', 'Request denied'], answer: 1, explanation: '"We regret that we are unable to ~"는 거절의 정중한 표현입니다.' },
    { id: 40, topic: 3, question: '"추가 문의사항이 있으시면 연락주십시오"의 표현은?', options: ['Call us if needed', 'Please do not hesitate to contact us if you have any further questions', 'Questions? Call us', 'Contact for more'], answer: 1, explanation: '"Please do not hesitate to contact us if ~"은 추가 문의를 환영하는 표현입니다.' },

    // 기타 서신 (10문항)
    { id: 41, topic: 4, question: '감사 서신의 시작으로 적절한 표현은?', options: ['Thanks a lot', 'We would like to express our sincere appreciation for', 'Thank you very much', 'Grateful for everything'], answer: 1, explanation: '"We would like to express our sincere appreciation for ~"은 공식 감사 표현입니다.' },
    { id: 42, topic: 4, question: '축하 서신에서 사용하는 표현은?', options: ['Congrats', 'Please accept our congratulations on', 'Good job', 'Well done'], answer: 1, explanation: '"Please accept our congratulations on ~"은 공식적인 축하 표현입니다.' },
    { id: 43, topic: 4, question: '사과 서신의 시작으로 적절한 표현은?', options: ['Sorry about that', 'We sincerely apologize for', 'Our bad', 'We feel sorry'], answer: 1, explanation: '"We sincerely apologize for ~"은 진심 어린 사과의 표현입니다.' },
    { id: 44, topic: 4, question: '독촉 서신에서 사용하는 표현은?', options: ['Pay now', 'We would like to remind you that payment is overdue', 'Money please', 'Where is payment?'], answer: 1, explanation: '"We would like to remind you that ~"은 정중하게 상기시키는 독촉 표현입니다.' },
    { id: 45, topic: 4, question: '클레임 서신의 시작으로 적절한 표현은?', options: ['There is a problem', 'We regret to inform you that we have found some problems with', 'Something is wrong', 'Bad products received'], answer: 1, explanation: '"We regret to inform you that ~"은 문제를 알리는 정중한 표현입니다.' },
    { id: 46, topic: 4, question: '협조 요청 서신의 표현은?', options: ['Help us please', 'We would appreciate your cooperation in this matter', 'Cooperate with us', 'Need your help'], answer: 1, explanation: '"We would appreciate your cooperation in ~"은 협조 요청의 정중한 표현입니다.' },
    { id: 47, topic: 4, question: '계약 해지 통보 시 적절한 표현은?', options: ['Contract cancelled', 'We regret to inform you that we wish to terminate the contract', 'No more contract', 'Ending contract now'], answer: 1, explanation: '"We regret to inform you that we wish to terminate ~"은 해지 통보의 표준 표현입니다.' },
    { id: 48, topic: 4, question: '미팅 요청 서신의 표현은?', options: ['Let us meet', 'We would like to request a meeting to discuss', 'Meeting needed', 'Can we meet?'], answer: 1, explanation: '"We would like to request a meeting to discuss ~"는 미팅 요청의 정중한 표현입니다.' },
    { id: 49, topic: 4, question: '방문 확인 서신의 표현은?', options: ['Coming to visit', 'This is to confirm our visit to your office on', 'Will visit soon', 'Visiting you on'], answer: 1, explanation: '"This is to confirm ~"은 확인 목적을 밝히는 표준 표현입니다.' },
    { id: 50, topic: 4, question: '일정 변경 요청 시 적절한 표현은?', options: ['Change the date', 'We would like to request a change in the schedule', 'Different date please', 'Schedule needs changing'], answer: 1, explanation: '"We would like to request a change in ~"은 변경 요청의 정중한 표현입니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-2-letter-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-2-letter-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-2-letter-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 2급 비즈니스 서신 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 비즈니스 서신 표현에 대해 자세히 설명해주세요. 실제 무역 서신에서 어떻게 사용되는지 예문도 알려주세요.`;
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
            <span className="text-sky-600 font-medium">비즈니스 서신</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 비즈니스 서신</h1>
          <p className="text-gray-600">기본 무역 서신 작성법 학습</p>
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
