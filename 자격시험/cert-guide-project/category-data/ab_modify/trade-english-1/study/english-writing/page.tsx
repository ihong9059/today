'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EnglishWritingPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '오퍼/견적', count: 10 },
    { id: 1, name: '주문/확인', count: 10 },
    { id: 2, name: '선적통지', count: 10 },
    { id: 3, name: '클레임', count: 10 },
    { id: 4, name: '결제/독촉', count: 10 },
  ];

  const questions = [
    // 오퍼/견적 (10문항)
    { id: 1, topic: 0, question: "\"We are pleased to quote you the following prices.\"를 한국어로 해석하면?", options: ["아래와 같이 견적을 드리게 되어 기쁩니다", "가격 인상을 알려드립니다", "가격 인하를 요청합니다", "견적을 취소합니다"], answer: 0 },
    { id: 2, topic: 0, question: "\"Our prices are subject to change without notice.\"의 의미는?", options: ["당사 가격은 예고 없이 변경될 수 있습니다", "가격이 확정되었습니다", "가격 변경이 불가합니다", "가격을 통보해 드립니다"], answer: 0 },
    { id: 3, topic: 0, question: "견적서에서 \"This offer is valid for 30 days.\"의 의미는?", options: ["본 오퍼는 30일간 유효합니다", "30일 내 선적합니다", "30일 후 가격이 변동됩니다", "30일 이내 결제해야 합니다"], answer: 0 },
    { id: 4, topic: 0, question: "\"CIF Busan\"이 포함된 가격 조건의 의미는?", options: ["부산항까지 운임·보험료 포함 가격", "부산에서 출발하는 가격", "부산 창고 인도 가격", "부산 공장 가격"], answer: 0 },
    { id: 5, topic: 0, question: "\"We would like to request a quotation for...\"의 용도는?", options: ["견적 요청", "주문 취소", "클레임 제기", "선적 통지"], answer: 0 },
    { id: 6, topic: 0, question: "\"Firm offer\"와 \"Free offer\"의 차이는?", options: ["확정 오퍼 vs 자유 오퍼", "무료 오퍼 vs 유료 오퍼", "직접 오퍼 vs 간접 오퍼", "선적 오퍼 vs 창고 오퍼"], answer: 0 },
    { id: 7, topic: 0, question: "\"We are willing to grant you a 5% discount.\"의 의미는?", options: ["5% 할인을 제공하겠습니다", "5% 가격을 인상합니다", "5%만 주문 가능합니다", "5% 추가 비용이 발생합니다"], answer: 0 },
    { id: 8, topic: 0, question: "\"FOB Shanghai\"의 의미는?", options: ["상하이 본선 적재 인도 가격", "상하이 도착 가격", "상하이 창고 인도 가격", "상하이 운임 포함 가격"], answer: 0 },
    { id: 9, topic: 0, question: "\"Minimum order quantity is 500 units.\"의 의미는?", options: ["최소 주문 수량은 500개입니다", "최대 주문량은 500개입니다", "500개만 주문 가능합니다", "500개 이하만 할인됩니다"], answer: 0 },
    { id: 10, topic: 0, question: "\"Counter offer\"가 발생하는 상황은?", options: ["원 오퍼 조건 변경 시", "오퍼 수락 시", "오퍼 거절 시", "오퍼 취소 시"], answer: 0 },

    // 주문/확인 (10문항)
    { id: 11, topic: 1, question: "\"We hereby place an order for...\"의 의미는?", options: ["이로써 ~을 주문합니다", "주문을 취소합니다", "주문을 변경합니다", "주문을 확인합니다"], answer: 0 },
    { id: 12, topic: 1, question: "\"Please acknowledge receipt of this order.\"의 의미는?", options: ["본 주문 수령을 확인해 주세요", "주문을 취소해 주세요", "선적해 주세요", "결제해 주세요"], answer: 0 },
    { id: 13, topic: 1, question: "주문 확인서(Order Confirmation)의 주요 내용이 아닌 것은?", options: ["경쟁사 정보", "상품 명세", "가격 조건", "선적 일정"], answer: 0 },
    { id: 14, topic: 1, question: "\"Your order No. 123 has been received and is being processed.\"의 의미는?", options: ["주문번호 123번이 접수되어 처리 중입니다", "주문이 취소되었습니다", "주문이 선적되었습니다", "주문에 문제가 있습니다"], answer: 0 },
    { id: 15, topic: 1, question: "\"We regret that we cannot accept your order.\"는 어떤 상황인가?", options: ["주문 거절", "주문 수락", "주문 변경", "주문 확인"], answer: 0 },
    { id: 16, topic: 1, question: "\"Purchase Order (P/O)\"와 \"Sales Contract\"의 관계는?", options: ["구매 주문서와 매매 계약서", "같은 문서", "선적 서류", "결제 서류"], answer: 0 },
    { id: 17, topic: 1, question: "\"Subject to our final confirmation\"의 의미는?", options: ["당사의 최종 확인을 조건으로", "확인 없이 진행", "즉시 확정", "자동 확인"], answer: 0 },
    { id: 18, topic: 1, question: "\"Please expedite shipment.\"의 의미는?", options: ["선적을 신속히 해 주세요", "선적을 취소해 주세요", "선적을 연기해 주세요", "선적을 확인해 주세요"], answer: 0 },
    { id: 19, topic: 1, question: "주문 시 \"Delivery terms\"에 포함되는 내용은?", options: ["인도 조건 및 장소", "상품 색상", "제조업체 정보", "회사 연혁"], answer: 0 },
    { id: 20, topic: 1, question: "\"Trial order\"의 목적은?", options: ["품질 및 거래 관계 테스트", "대량 주문", "재고 처분", "긴급 주문"], answer: 0 },

    // 선적통지 (10문항)
    { id: 21, topic: 2, question: "\"Shipping Advice\"의 목적은?", options: ["선적 완료 통보", "주문 확인", "클레임 제기", "결제 요청"], answer: 0 },
    { id: 22, topic: 2, question: "\"The goods were shipped on board M/V Korea on May 15.\"의 의미는?", options: ["상품이 5월 15일 Korea호에 선적되었습니다", "상품이 한국에 도착했습니다", "상품이 5월 15일 출발합니다", "상품이 한국에서 제조되었습니다"], answer: 0 },
    { id: 23, topic: 2, question: "선적통지에 포함되어야 할 정보가 아닌 것은?", options: ["경쟁사 가격", "B/L 번호", "선박명", "도착 예정일"], answer: 0 },
    { id: 24, topic: 2, question: "\"ETA (Estimated Time of Arrival)\"의 의미는?", options: ["도착 예정 시간", "출발 예정 시간", "선적 완료 시간", "통관 완료 시간"], answer: 0 },
    { id: 25, topic: 2, question: "\"ETD (Estimated Time of Departure)\"의 의미는?", options: ["출발 예정 시간", "도착 예정 시간", "선적 시간", "결제 시한"], answer: 0 },
    { id: 26, topic: 2, question: "\"Documents have been sent by DHL courier.\"의 의미는?", options: ["서류가 DHL 특송으로 발송되었습니다", "상품이 DHL로 배송됩니다", "DHL이 서류를 요청했습니다", "DHL 비용을 청구합니다"], answer: 0 },
    { id: 27, topic: 2, question: "\"Partial shipment is allowed.\"의 의미는?", options: ["분할선적이 허용됩니다", "분할선적이 금지됩니다", "전량선적만 가능합니다", "선적이 취소되었습니다"], answer: 0 },
    { id: 28, topic: 2, question: "선적통지 시 \"Port of Loading\"과 \"Port of Discharge\"의 의미는?", options: ["선적항과 양륙항", "출발국과 도착국", "창고와 공장", "공급자와 구매자"], answer: 0 },
    { id: 29, topic: 2, question: "\"The vessel is scheduled to arrive at Busan on June 1.\"의 의미는?", options: ["선박은 6월 1일 부산 도착 예정입니다", "선박이 6월 1일 출발합니다", "선박이 부산에서 선적됩니다", "부산행 선박을 예약했습니다"], answer: 0 },
    { id: 30, topic: 2, question: "\"On deck shipment\"의 의미와 위험은?", options: ["갑판 적재, 해수 손상 위험", "선창 적재, 안전", "컨테이너 적재", "냉동 보관"], answer: 0 },

    // 클레임 (10문항)
    { id: 31, topic: 3, question: "\"We regret to inform you that the goods arrived damaged.\"의 상황은?", options: ["화물 손상 클레임 제기", "화물 수령 확인", "결제 완료 통보", "추가 주문"], answer: 0 },
    { id: 32, topic: 3, question: "클레임 서신에서 \"We hold you responsible for...\"의 의미는?", options: ["귀사에게 책임을 묻습니다", "책임을 면제합니다", "책임을 분담합니다", "책임을 이전합니다"], answer: 0 },
    { id: 33, topic: 3, question: "\"Please send a replacement immediately.\"의 의미는?", options: ["즉시 대체품을 보내주세요", "반품해 주세요", "수리해 주세요", "폐기해 주세요"], answer: 0 },
    { id: 34, topic: 3, question: "클레임 대응에서 \"We apologize for the inconvenience caused.\"의 용도는?", options: ["불편을 끼친 것에 대한 사과", "책임 부인", "클레임 거절", "추가 비용 청구"], answer: 0 },
    { id: 35, topic: 3, question: "\"Shortage in quantity\"의 의미는?", options: ["수량 부족", "품질 불량", "선적 지연", "파손"], answer: 0 },
    { id: 36, topic: 3, question: "\"The goods do not conform to the sample.\"의 의미는?", options: ["상품이 견본과 일치하지 않습니다", "상품이 견본과 동일합니다", "견본을 요청합니다", "견본을 발송했습니다"], answer: 0 },
    { id: 37, topic: 3, question: "클레임 처리에서 \"Credit note\"의 용도는?", options: ["환불/대금 차감 증빙", "추가 청구서", "선적 서류", "보험 청구서"], answer: 0 },
    { id: 38, topic: 3, question: "\"Survey report\"가 필요한 상황은?", options: ["화물 손상 시 검정 보고서", "일반 선적", "정상 거래", "주문 확인"], answer: 0 },
    { id: 39, topic: 3, question: "\"We are willing to settle this matter amicably.\"의 의미는?", options: ["이 문제를 원만하게 해결하겠습니다", "법적 대응하겠습니다", "클레임을 거절합니다", "책임이 없습니다"], answer: 0 },
    { id: 40, topic: 3, question: "클레임 시효(Claim period)가 경과하면?", options: ["클레임 권리 상실", "클레임 금액 증가", "자동 승인", "연장 가능"], answer: 0 },

    // 결제/독촉 (10문항)
    { id: 41, topic: 4, question: "\"Payment is due within 30 days from invoice date.\"의 의미는?", options: ["송장일로부터 30일 이내 결제", "30일 후 송장 발행", "30일간 할인 적용", "30일 후 선적"], answer: 0 },
    { id: 42, topic: 4, question: "결제 독촉장에서 \"Your account is overdue.\"의 의미는?", options: ["귀사 계정이 연체되었습니다", "계정이 승인되었습니다", "계정이 폐쇄되었습니다", "계정이 활성화되었습니다"], answer: 0 },
    { id: 43, topic: 4, question: "\"We kindly remind you of the outstanding balance.\"의 용도는?", options: ["미결제 잔액 독촉", "결제 완료 확인", "할인 제안", "주문 취소"], answer: 0 },
    { id: 44, topic: 4, question: "\"Net 30 days\"의 의미는?", options: ["30일 이내 순결제", "30% 할인", "30일 후 선적", "30개 단위 주문"], answer: 0 },
    { id: 45, topic: 4, question: "\"2/10, Net 30\"의 의미는?", options: ["10일 내 결제 시 2% 할인, 30일 내 전액 결제", "10일간 2% 할인", "30일간 10% 할인", "2일 내 결제 시 10% 할인"], answer: 0 },
    { id: 46, topic: 4, question: "\"We have not received payment for invoice No. 123.\"의 상황은?", options: ["미결제 독촉", "결제 확인", "송장 발행", "주문 취소"], answer: 0 },
    { id: 47, topic: 4, question: "\"Unless payment is made within 7 days...\"의 후속 내용은?", options: ["법적 조치 예고", "추가 할인 제공", "주문 확인", "선적 진행"], answer: 0 },
    { id: 48, topic: 4, question: "\"Open account\" 결제방식의 특징은?", options: ["외상 거래", "선불 결제", "신용장 거래", "추심 결제"], answer: 0 },
    { id: 49, topic: 4, question: "\"Please remit the amount by T/T.\"에서 T/T의 의미는?", options: ["전신환(Telegraphic Transfer)", "여행자수표", "신용장", "추심"], answer: 0 },
    { id: 50, topic: 4, question: "\"Final notice before legal action\"의 의미는?", options: ["법적 조치 전 최종 통고", "최종 할인 제안", "거래 종료 통보", "주문 마감 통보"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-1-writing-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-1-writing-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-1-writing-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/trade/trade-english-1" className="text-blue-600 hover:text-blue-800 font-medium">
            ← 무역영어 1급
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">✍️ 영작문</h1>
          <p className="text-gray-500">무역 영문 작성 능력</p>
        </div>

        {/* Progress */}
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
            <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{correctCount + wrongCount}/{questions.length}</p>
              <p className="text-sm text-gray-500">진행률</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((correctCount + wrongCount) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                selectedTopic === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedTopic === topic.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {topics.find(t => t.id === q.topic)?.name}
                  </span>
                  <span className="text-gray-400 text-sm">#{q.id}</span>
                </div>
                <button
                  onClick={() => openAIModal(q.question)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  🤖 AI에게 질문
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswer(q.id, optIndex)}
                    disabled={showAnswer === q.id}
                    className={`p-3 rounded-xl text-left transition ${
                      showAnswer === q.id
                        ? optIndex === q.answer
                          ? 'bg-green-100 text-green-800 border-2 border-green-500'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50 hover:bg-blue-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium mr-2">{optIndex + 1}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                  <p className="text-indigo-800 font-medium">
                    ✅ 정답: {q.answer + 1}. {q.options[q.answer]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-center font-medium hover:bg-purple-700 transition"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700 transition"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium hover:bg-blue-700 transition"
              >
                Gemini에게 질문하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
