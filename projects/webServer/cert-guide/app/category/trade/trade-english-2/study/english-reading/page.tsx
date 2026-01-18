'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function EnglishReading2Page() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '기본 서신', count: 10 },
    { id: 1, name: '무역 용어', count: 10 },
    { id: 2, name: '주문/확인', count: 10 },
    { id: 3, name: '가격/조건', count: 10 },
    { id: 4, name: '일반 표현', count: 10 },
  ];

  const questions = [
    // 기본 서신 (10문항)
    { id: 1, topic: 0, question: "\"Thank you for your inquiry.\"의 의미는?", options: ["문의해 주셔서 감사합니다", "주문 감사합니다", "결제 감사합니다", "방문 감사합니다"], answer: 0 },
    { id: 2, topic: 0, question: "\"We are pleased to receive your order.\"의 의미는?", options: ["주문을 받게 되어 기쁩니다", "주문을 취소합니다", "주문을 거절합니다", "주문을 변경합니다"], answer: 0 },
    { id: 3, topic: 0, question: "\"Please find enclosed our catalog.\"의 의미는?", options: ["당사 카탈로그를 동봉합니다", "카탈로그를 요청합니다", "카탈로그를 반송합니다", "카탈로그를 분실했습니다"], answer: 0 },
    { id: 4, topic: 0, question: "\"We look forward to hearing from you.\"의 의미는?", options: ["회신을 기다리겠습니다", "연락하지 마세요", "나중에 연락하겠습니다", "연락이 끊겼습니다"], answer: 0 },
    { id: 5, topic: 0, question: "\"In reply to your letter dated May 10...\"의 의미는?", options: ["5월 10일자 귀하의 서신에 대한 회신으로", "5월 10일까지 회신해주세요", "5월 10일에 편지를 보냅니다", "5월 10일 편지를 받았습니다"], answer: 0 },
    { id: 6, topic: 0, question: "\"We regret to inform you that...\"는 어떤 내용을 전달할 때 쓰는가?", options: ["부정적인 소식", "긍정적인 소식", "중립적인 정보", "감사 표시"], answer: 0 },
    { id: 7, topic: 0, question: "\"Your prompt reply would be appreciated.\"의 의미는?", options: ["신속한 회신 부탁드립니다", "회신하지 마세요", "천천히 회신하세요", "회신을 받았습니다"], answer: 0 },
    { id: 8, topic: 0, question: "\"With reference to...\"는 서신에서 어떤 역할을 하는가?", options: ["언급/참조하는 내용 소개", "결론 도출", "감사 표시", "사과 표현"], answer: 0 },
    { id: 9, topic: 0, question: "\"Should you have any questions, please contact us.\"의 의미는?", options: ["문의사항이 있으시면 연락주세요", "질문하지 마세요", "질문에 답할 수 없습니다", "질문을 받았습니다"], answer: 0 },
    { id: 10, topic: 0, question: "\"Yours sincerely,\"는 어떤 경우에 사용하는가?", options: ["수신인 이름을 알 때", "수신인 이름을 모를 때", "친구에게 보낼 때", "공식 문서에만"], answer: 0 },

    // 무역 용어 (10문항)
    { id: 11, topic: 1, question: "\"FOB\"의 full form은?", options: ["Free On Board", "Freight On Board", "Free Of Bill", "First Order Buyer"], answer: 0 },
    { id: 12, topic: 1, question: "\"CIF\"가 포함하는 비용은?", options: ["비용, 보험, 운임", "비용만", "운임만", "보험만"], answer: 0 },
    { id: 13, topic: 1, question: "\"L/C\"는 무엇의 약자인가?", options: ["Letter of Credit", "Letter of Contract", "List of Cargo", "Limit of Cost"], answer: 0 },
    { id: 14, topic: 1, question: "\"B/L\"의 의미는?", options: ["선하증권", "신용장", "송장", "포장명세서"], answer: 0 },
    { id: 15, topic: 1, question: "\"EXW\"에서 매도인의 의무가 끝나는 곳은?", options: ["공장/창고", "선적항", "도착항", "구매자 창고"], answer: 0 },
    { id: 16, topic: 1, question: "\"T/T\"는 어떤 결제방식인가?", options: ["전신환 송금", "신용장 결제", "추심 결제", "현금 결제"], answer: 0 },
    { id: 17, topic: 1, question: "\"Incoterms\"는 무엇을 규정하는가?", options: ["무역 조건", "관세율", "환율", "품질 기준"], answer: 0 },
    { id: 18, topic: 1, question: "\"Consignee\"의 의미는?", options: ["수하인", "송하인", "운송인", "보험자"], answer: 0 },
    { id: 19, topic: 1, question: "\"Shipper\"의 의미는?", options: ["송하인", "수하인", "선박회사", "포워더"], answer: 0 },
    { id: 20, topic: 1, question: "\"Invoice\"의 의미는?", options: ["송장/청구서", "주문서", "계약서", "보험증권"], answer: 0 },

    // 주문/확인 (10문항)
    { id: 21, topic: 2, question: "\"We would like to place an order for...\"의 의미는?", options: ["~을 주문하고 싶습니다", "주문을 취소합니다", "주문을 변경합니다", "주문을 확인합니다"], answer: 0 },
    { id: 22, topic: 2, question: "\"Please confirm receipt of our order.\"의 의미는?", options: ["주문 수령을 확인해주세요", "주문을 취소해주세요", "주문을 변경해주세요", "주문을 발송해주세요"], answer: 0 },
    { id: 23, topic: 2, question: "\"Order No. 123 has been shipped.\"의 의미는?", options: ["주문번호 123이 선적되었습니다", "주문이 취소되었습니다", "주문이 접수되었습니다", "주문에 문제가 있습니다"], answer: 0 },
    { id: 24, topic: 2, question: "\"Delivery will be made within 2 weeks.\"의 의미는?", options: ["2주 내에 배송됩니다", "2주 후에 주문하세요", "2주간 보관합니다", "2주 동안 할인됩니다"], answer: 0 },
    { id: 25, topic: 2, question: "\"We acknowledge receipt of your order.\"의 의미는?", options: ["주문 수령을 확인합니다", "주문을 거절합니다", "주문을 변경합니다", "주문을 취소합니다"], answer: 0 },
    { id: 26, topic: 2, question: "\"Please ship the goods as soon as possible.\"의 의미는?", options: ["가능한 빨리 상품을 선적해주세요", "천천히 선적해주세요", "선적을 취소해주세요", "선적을 연기해주세요"], answer: 0 },
    { id: 27, topic: 2, question: "\"The goods are out of stock.\"의 의미는?", options: ["상품이 품절되었습니다", "상품이 입고되었습니다", "상품이 할인됩니다", "상품이 반품되었습니다"], answer: 0 },
    { id: 28, topic: 2, question: "\"Your order is being processed.\"의 의미는?", options: ["주문이 처리 중입니다", "주문이 취소되었습니다", "주문이 완료되었습니다", "주문에 문제가 있습니다"], answer: 0 },
    { id: 29, topic: 2, question: "\"Minimum order quantity\"의 의미는?", options: ["최소 주문 수량", "최대 주문 수량", "권장 주문 수량", "평균 주문 수량"], answer: 0 },
    { id: 30, topic: 2, question: "\"Lead time\"이 의미하는 것은?", options: ["납기/소요 시간", "할인 기간", "보증 기간", "결제 기한"], answer: 0 },

    // 가격/조건 (10문항)
    { id: 31, topic: 3, question: "\"Please quote us your best price.\"의 의미는?", options: ["최저가를 알려주세요", "가격을 올려주세요", "가격을 확정해주세요", "가격을 취소해주세요"], answer: 0 },
    { id: 32, topic: 3, question: "\"The price is subject to change.\"의 의미는?", options: ["가격은 변경될 수 있습니다", "가격이 확정되었습니다", "가격이 할인됩니다", "가격이 인상됩니다"], answer: 0 },
    { id: 33, topic: 3, question: "\"We offer a 10% discount.\"의 의미는?", options: ["10% 할인을 제공합니다", "10% 가격 인상", "10%만 결제", "10개만 주문 가능"], answer: 0 },
    { id: 34, topic: 3, question: "\"Payment terms: Net 30 days\"의 의미는?", options: ["30일 이내 순결제", "30% 선불", "30일 후 할인", "30개 단위 결제"], answer: 0 },
    { id: 35, topic: 3, question: "\"Unit price\"의 의미는?", options: ["단가", "총액", "할인가", "원가"], answer: 0 },
    { id: 36, topic: 3, question: "\"The offer is valid until June 30.\"의 의미는?", options: ["오퍼는 6월 30일까지 유효합니다", "6월 30일에 오퍼합니다", "6월 30일에 만납니다", "6월 30일에 선적합니다"], answer: 0 },
    { id: 37, topic: 3, question: "\"Prices are quoted in US dollars.\"의 의미는?", options: ["가격은 미화로 표시됩니다", "달러로 결제 불가", "원화로만 결제", "환율 변동 없음"], answer: 0 },
    { id: 38, topic: 3, question: "\"Bulk order discount\"의 의미는?", options: ["대량 주문 할인", "소량 주문 할인", "첫 주문 할인", "재주문 할인"], answer: 0 },
    { id: 39, topic: 3, question: "\"Total amount\"의 의미는?", options: ["총액", "단가", "할인액", "세금"], answer: 0 },
    { id: 40, topic: 3, question: "\"Freight charges\"의 의미는?", options: ["운임", "보험료", "관세", "포장비"], answer: 0 },

    // 일반 표현 (10문항)
    { id: 41, topic: 4, question: "\"as soon as possible (ASAP)\"의 의미는?", options: ["가능한 빨리", "가능하면", "나중에", "천천히"], answer: 0 },
    { id: 42, topic: 4, question: "\"attached herewith\"의 의미는?", options: ["이에 첨부된", "별도로 발송", "추후 발송", "이전에 발송"], answer: 0 },
    { id: 43, topic: 4, question: "\"for your reference\"의 의미는?", options: ["참고용으로", "결정용으로", "보관용으로", "폐기용으로"], answer: 0 },
    { id: 44, topic: 4, question: "\"at your earliest convenience\"의 의미는?", options: ["가급적 빠른 시일 내에", "편할 때", "늦어도 괜찮으니", "급하지 않으니"], answer: 0 },
    { id: 45, topic: 4, question: "\"in accordance with\"의 의미는?", options: ["~에 따라", "~에 반하여", "~와 관계없이", "~대신에"], answer: 0 },
    { id: 46, topic: 4, question: "\"kindly\"는 서신에서 어떤 뉘앙스를 주는가?", options: ["공손한 요청", "강한 명령", "비공식적 표현", "부정적 표현"], answer: 0 },
    { id: 47, topic: 4, question: "\"per your request\"의 의미는?", options: ["귀하의 요청에 따라", "요청을 거부함", "요청을 변경함", "요청을 취소함"], answer: 0 },
    { id: 48, topic: 4, question: "\"due to\"의 의미는?", options: ["~때문에", "~에도 불구하고", "~대신에", "~와 함께"], answer: 0 },
    { id: 49, topic: 4, question: "\"regarding\"의 의미는?", options: ["~에 관하여", "~를 제외하고", "~대신에", "~와 별개로"], answer: 0 },
    { id: 50, topic: 4, question: "\"hereby\"의 의미는?", options: ["이로써", "나중에", "이전에", "별도로"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-2-reading-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-2-reading-progress', JSON.stringify({
      correct: correctCount,
      wrong: wrongCount
    }));
  }, [correctCount, wrongCount]);

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const handleAnswer = (questionId: number, selectedOption: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      if (selectedOption === question.answer) {
        setCorrectCount(prev => prev + 1);
      } else {
        setWrongCount(prev => prev + 1);
      }
      setShowAnswer(questionId);
    }
  };

  const openAIModal = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setWrongCount(0);
    setShowAnswer(null);
    localStorage.removeItem('trade-english-2-reading-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/trade/trade-english-2" className="text-sky-600 hover:text-sky-800 font-medium">
            ← 무역영어 2급
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 영문해석</h1>
          <p className="text-gray-500">기초 무역 영문 해석</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-gray-400 hover:text-red-500">초기화</button>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-gray-500">정답</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              <p className="text-sm text-gray-500">오답</p>
            </div>
            <div className="flex-1 bg-sky-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-sky-600">{correctCount + wrongCount}/{questions.length}</p>
              <p className="text-sm text-gray-500">진행률</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-sky-500 h-2 rounded-full transition-all" style={{ width: `${((correctCount + wrongCount) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-xl font-medium transition ${selectedTopic === null ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-xl font-medium transition ${selectedTopic === topic.id ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">{topics.find(t => t.id === q.topic)?.name}</span>
                  <span className="text-gray-400 text-sm">#{q.id}</span>
                </div>
                <button onClick={() => openAIModal(q.question)} className="text-sky-600 hover:text-sky-800 text-sm font-medium">🤖 AI에게 질문</button>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((option, optIndex) => (
                  <button key={optIndex} onClick={() => handleAnswer(q.id, optIndex)} disabled={showAnswer === q.id}
                    className={`p-3 rounded-xl text-left transition ${showAnswer === q.id ? optIndex === q.answer ? 'bg-green-100 text-green-800 border-2 border-green-500' : 'bg-gray-100 text-gray-500' : 'bg-gray-50 hover:bg-sky-50 text-gray-700'}`}>
                    <span className="font-medium mr-2">{optIndex + 1}.</span>{option}
                  </button>
                ))}
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-sky-50 rounded-xl">
                  <p className="text-sky-800 font-medium">✅ 정답: {q.answer + 1}. {q.options[q.answer]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-center font-medium hover:bg-purple-700 transition">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700 transition">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium hover:bg-blue-700 transition">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
