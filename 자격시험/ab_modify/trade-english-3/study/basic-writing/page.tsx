'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BasicWriting3Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '인사 표현', count: 10 },
    { id: 1, name: '요청 표현', count: 10 },
    { id: 2, name: '감사 표현', count: 10 },
    { id: 3, name: '안내 표현', count: 10 },
    { id: 4, name: '마무리 표현', count: 10 },
  ];

  const questions = [
    // 인사 표현 (10문항)
    { id: 1, topic: 0, question: '"친애하는 고객님께"를 영작하면?', options: ['Dear Customer', 'Hello Customer', 'Hi Customer', 'Good Customer'], answer: 0, explanation: '"Dear Customer"는 비즈니스 서신에서 고객에게 보내는 공식적인 인사말입니다.' },
    { id: 2, topic: 0, question: '"관계자분께"를 영작하면?', options: ['Dear Person', 'Dear Sir or Madam', 'Hello Everyone', 'To Person'], answer: 1, explanation: '"Dear Sir or Madam"은 수신인을 모를 때 사용하는 공식적인 인사말입니다.' },
    { id: 3, topic: 0, question: '"담당자분께"를 영작하면?', options: ['Dear Manager', 'To Whom It May Concern', 'Hello Staff', 'Dear Worker'], answer: 1, explanation: '"To Whom It May Concern"은 담당자를 특정하지 않을 때 사용합니다.' },
    { id: 4, topic: 0, question: '"김 사장님께"를 영작하면?', options: ['Dear Kim Boss', 'Dear Mr. Kim', 'Hello Kim', 'To Kim Sir'], answer: 1, explanation: '"Dear Mr. Kim"은 남성에게 보내는 공식적인 인사말입니다.' },
    { id: 5, topic: 0, question: '"박 부장님께"를 영작하면?', options: ['Dear Park Manager', 'Dear Ms. Park', 'Hello Park', 'To Park'], answer: 1, explanation: '"Dear Ms. Park" (여성) 또는 "Dear Mr. Park" (남성)으로 표현합니다.' },
    { id: 6, topic: 0, question: '"안녕하세요"를 영작하면?', options: ['Hello', 'Good morning', 'Hi there', 'How are you'], answer: 0, explanation: '"Hello"는 일반적인 인사말로, 이메일에서도 자주 사용됩니다.' },
    { id: 7, topic: 0, question: '"처음 연락드립니다"를 영작하면?', options: ['First contact', 'This is my first time writing to you', 'I am new', 'Starting letter'], answer: 1, explanation: '"This is my first time writing to you"는 처음 연락하는 상황을 표현합니다.' },
    { id: 8, topic: 0, question: '"오랜만에 연락드립니다"를 영작하면?', options: ['Long time contact', 'It has been a while since we last contacted', 'Old contact', 'Late contact'], answer: 1, explanation: '"It has been a while since we last contacted"는 오랜만의 연락을 표현합니다.' },
    { id: 9, topic: 0, question: '"귀사의 발전을 기원합니다"를 영작하면?', options: ['Good luck', 'We wish your company continued success', 'Hope you grow', 'Best to company'], answer: 1, explanation: '"We wish your company continued success"는 상대 회사의 번영을 기원하는 표현입니다.' },
    { id: 10, topic: 0, question: '"건강하시길 바랍니다"를 영작하면?', options: ['Be healthy', 'I hope you are well', 'Stay healthy', 'Health to you'], answer: 1, explanation: '"I hope you are well"은 상대의 안녕을 바라는 인사말입니다.' },

    // 요청 표현 (10문항)
    { id: 11, topic: 1, question: '"~해 주시겠습니까?"를 영작하면?', options: ['Can you do?', 'Could you please ~?', 'Do it please', 'Will you do?'], answer: 1, explanation: '"Could you please ~?"는 정중하게 요청하는 표현입니다.' },
    { id: 12, topic: 1, question: '"정보를 보내주세요"를 영작하면?', options: ['Send info', 'Please send us the information', 'Information please', 'Give info'], answer: 1, explanation: '"Please send us the information"은 정중한 정보 요청입니다.' },
    { id: 13, topic: 1, question: '"확인 부탁드립니다"를 영작하면?', options: ['Check please', 'Please confirm', 'Confirm it', 'Check it out'], answer: 1, explanation: '"Please confirm"은 확인을 요청하는 기본 표현입니다.' },
    { id: 14, topic: 1, question: '"답변 부탁드립니다"를 영작하면?', options: ['Answer please', 'Please reply', 'Reply me', 'Give answer'], answer: 1, explanation: '"Please reply"는 답변을 요청하는 표현입니다.' },
    { id: 15, topic: 1, question: '"견적서를 보내주세요"를 영작하면?', options: ['Send quotation', 'Please send us a quotation', 'Quotation please', 'Give price'], answer: 1, explanation: '"Please send us a quotation"은 견적서를 요청하는 표현입니다.' },
    { id: 16, topic: 1, question: '"샘플을 보내주세요"를 영작하면?', options: ['Sample please', 'Please send us samples', 'Give sample', 'Send sample now'], answer: 1, explanation: '"Please send us samples"는 샘플을 요청하는 표현입니다.' },
    { id: 17, topic: 1, question: '"가격표를 보내주세요"를 영작하면?', options: ['Price please', 'Please send us your price list', 'Give prices', 'List price now'], answer: 1, explanation: '"Please send us your price list"는 가격표를 요청하는 표현입니다.' },
    { id: 18, topic: 1, question: '"빠른 답변 부탁드립니다"를 영작하면?', options: ['Fast answer', 'Please reply as soon as possible', 'Quick reply', 'Answer fast'], answer: 1, explanation: '"Please reply as soon as possible"는 신속한 답변을 요청하는 표현입니다.' },
    { id: 19, topic: 1, question: '"카탈로그를 보내주세요"를 영작하면?', options: ['Catalog please', 'Could you please send us your catalog?', 'Give catalog', 'Send catalog'], answer: 1, explanation: '"Could you please send us your catalog?"는 정중하게 카탈로그를 요청하는 표현입니다.' },
    { id: 20, topic: 1, question: '"연락 부탁드립니다"를 영작하면?', options: ['Contact please', 'Please contact us', 'Call me', 'Get in touch'], answer: 1, explanation: '"Please contact us"는 연락을 요청하는 표현입니다.' },

    // 감사 표현 (10문항)
    { id: 21, topic: 2, question: '"문의해 주셔서 감사합니다"를 영작하면?', options: ['Thanks for asking', 'Thank you for your inquiry', 'Inquiry thanks', 'Good question'], answer: 1, explanation: '"Thank you for your inquiry"는 문의에 대한 감사 표현입니다.' },
    { id: 22, topic: 2, question: '"주문해 주셔서 감사합니다"를 영작하면?', options: ['Thanks for order', 'Thank you for your order', 'Order thanks', 'Good order'], answer: 1, explanation: '"Thank you for your order"는 주문에 대한 감사 표현입니다.' },
    { id: 23, topic: 2, question: '"연락 주셔서 감사합니다"를 영작하면?', options: ['Thanks for contact', 'Thank you for contacting us', 'Contact thanks', 'Good contact'], answer: 1, explanation: '"Thank you for contacting us"는 연락에 대한 감사 표현입니다.' },
    { id: 24, topic: 2, question: '"회신 감사합니다"를 영작하면?', options: ['Reply thanks', 'Thank you for your reply', 'Thanks reply', 'Good reply'], answer: 1, explanation: '"Thank you for your reply"는 회신에 대한 감사 표현입니다.' },
    { id: 25, topic: 2, question: '"협조에 감사드립니다"를 영작하면?', options: ['Cooperation thanks', 'Thank you for your cooperation', 'Thanks help', 'Good cooperation'], answer: 1, explanation: '"Thank you for your cooperation"은 협조에 대한 감사 표현입니다.' },
    { id: 26, topic: 2, question: '"관심 가져주셔서 감사합니다"를 영작하면?', options: ['Interest thanks', 'Thank you for your interest', 'Thanks interest', 'Good interest'], answer: 1, explanation: '"Thank you for your interest"는 관심에 대한 감사 표현입니다.' },
    { id: 27, topic: 2, question: '"시간 내주셔서 감사합니다"를 영작하면?', options: ['Time thanks', 'Thank you for your time', 'Thanks time', 'Good time'], answer: 1, explanation: '"Thank you for your time"은 시간을 내준 것에 대한 감사 표현입니다.' },
    { id: 28, topic: 2, question: '"이해해 주셔서 감사합니다"를 영작하면?', options: ['Understanding thanks', 'Thank you for your understanding', 'Thanks understand', 'Good understanding'], answer: 1, explanation: '"Thank you for your understanding"은 이해에 대한 감사 표현입니다.' },
    { id: 29, topic: 2, question: '"도움 주셔서 감사합니다"를 영작하면?', options: ['Help thanks', 'Thank you for your help', 'Thanks help', 'Good help'], answer: 1, explanation: '"Thank you for your help"는 도움에 대한 감사 표현입니다.' },
    { id: 30, topic: 2, question: '"성원에 감사드립니다"를 영작하면?', options: ['Support thanks', 'Thank you for your continued support', 'Thanks support', 'Good support'], answer: 1, explanation: '"Thank you for your continued support"는 지속적인 성원에 대한 감사입니다.' },

    // 안내 표현 (10문항)
    { id: 31, topic: 3, question: '"알려드립니다"를 영작하면?', options: ['I tell you', 'We would like to inform you', 'Information', 'Know this'], answer: 1, explanation: '"We would like to inform you"는 정보를 알리는 공식적인 표현입니다.' },
    { id: 32, topic: 3, question: '"첨부파일을 확인해 주세요"를 영작하면?', options: ['See attached', 'Please find attached', 'Check attachment', 'File attached'], answer: 1, explanation: '"Please find attached"는 첨부파일 확인을 안내하는 표현입니다.' },
    { id: 33, topic: 3, question: '"참고로 알려드립니다"를 영작하면?', options: ['FYI', 'For your information', 'Reference info', 'Know for reference'], answer: 1, explanation: '"For your information"은 참고 정보를 전달할 때 사용합니다.' },
    { id: 34, topic: 3, question: '"확인되었습니다"를 영작하면?', options: ['Confirmed', 'It has been confirmed', 'Check done', 'OK confirmed'], answer: 1, explanation: '"It has been confirmed"는 확인 완료를 알리는 표현입니다.' },
    { id: 35, topic: 3, question: '"주문이 접수되었습니다"를 영작하면?', options: ['Order OK', 'Your order has been received', 'Got order', 'Order done'], answer: 1, explanation: '"Your order has been received"는 주문 접수를 알리는 표현입니다.' },
    { id: 36, topic: 3, question: '"배송되었습니다"를 영작하면?', options: ['Shipped', 'Your order has been shipped', 'Delivery done', 'Sent out'], answer: 1, explanation: '"Your order has been shipped"는 배송 완료를 알리는 표현입니다.' },
    { id: 37, topic: 3, question: '"아래 내용을 참조하세요"를 영작하면?', options: ['See below', 'Please refer to the following', 'Below info', 'Look down'], answer: 1, explanation: '"Please refer to the following"은 아래 내용 참조를 안내합니다.' },
    { id: 38, topic: 3, question: '"가격이 변경되었습니다"를 영작하면?', options: ['Price changed', 'The price has been changed', 'New price', 'Price different'], answer: 1, explanation: '"The price has been changed"는 가격 변경을 알리는 표현입니다.' },
    { id: 39, topic: 3, question: '"일정이 변경되었습니다"를 영작하면?', options: ['Schedule changed', 'The schedule has been changed', 'New schedule', 'Different time'], answer: 1, explanation: '"The schedule has been changed"는 일정 변경을 알리는 표현입니다.' },
    { id: 40, topic: 3, question: '"문의사항이 있으시면"을 영작하면?', options: ['If questions', 'If you have any questions', 'Question time', 'Ask us'], answer: 1, explanation: '"If you have any questions"는 문의 유도 표현입니다.' },

    // 마무리 표현 (10문항)
    { id: 41, topic: 4, question: '"회신 기다리겠습니다"를 영작하면?', options: ['Waiting reply', 'We look forward to hearing from you', 'Reply wait', 'Answer please'], answer: 1, explanation: '"We look forward to hearing from you"는 회신을 기대하는 마무리 표현입니다.' },
    { id: 42, topic: 4, question: '"좋은 하루 되세요"를 영작하면?', options: ['Good day', 'Have a nice day', 'Day good', 'Nice day to you'], answer: 1, explanation: '"Have a nice day"는 친근한 마무리 인사입니다.' },
    { id: 43, topic: 4, question: '"감사합니다"를 영작하면?', options: ['Thanks', 'Thank you', 'Thanking', 'Grateful'], answer: 1, explanation: '"Thank you"는 기본적인 감사 표현입니다.' },
    { id: 44, topic: 4, question: '"안부 전해주세요"를 영작하면?', options: ['Say hi', 'Please give my regards', 'Hello to others', 'Greetings'], answer: 1, explanation: '"Please give my regards"는 안부를 전해달라는 표현입니다.' },
    { id: 45, topic: 4, question: '"연락 기다리겠습니다"를 영작하면?', options: ['Contact wait', 'We await your response', 'Wait for contact', 'Response needed'], answer: 1, explanation: '"We await your response"는 연락을 기다린다는 마무리 표현입니다.' },
    { id: 46, topic: 4, question: '"협조 부탁드립니다"를 영작하면?', options: ['Help please', 'We appreciate your cooperation', 'Cooperation please', 'Help needed'], answer: 1, explanation: '"We appreciate your cooperation"은 협조를 부탁하는 표현입니다.' },
    { id: 47, topic: 4, question: '"빠른 회신 부탁드립니다"를 영작하면?', options: ['Fast reply', 'A prompt reply would be appreciated', 'Quick answer', 'Reply soon'], answer: 1, explanation: '"A prompt reply would be appreciated"는 정중하게 빠른 회신을 요청합니다.' },
    { id: 48, topic: 4, question: '"도움이 되었으면 합니다"를 영작하면?', options: ['Hope help', 'I hope this helps', 'Helpful hope', 'May help'], answer: 1, explanation: '"I hope this helps"는 도움이 되길 바라는 표현입니다.' },
    { id: 49, topic: 4, question: '"다음 연락 기대합니다"를 영작하면?', options: ['Next contact', 'We look forward to your next message', 'Contact again', 'More contact'], answer: 1, explanation: '"We look forward to your next message"는 다음 연락을 기대하는 표현입니다.' },
    { id: 50, topic: 4, question: '"진심으로 감사드립니다"를 영작하면?', options: ['Really thanks', 'We sincerely appreciate', 'True thanks', 'Much grateful'], answer: 1, explanation: '"We sincerely appreciate"는 진심 어린 감사를 표현합니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-3-writing-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-3-writing-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-3-writing-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 3급 기초 영작문 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 표현에 대해 자세히 설명해주세요. 실제 비즈니스 서신에서 어떻게 사용하는지 예문도 알려주세요.`;
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
            <span className="text-teal-600 font-medium">기초 영작문</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">✍️ 기초 영작문</h1>
          <p className="text-gray-600">기초 영문 작성 연습</p>
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
