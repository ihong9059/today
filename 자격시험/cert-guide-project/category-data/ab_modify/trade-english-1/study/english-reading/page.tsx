'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EnglishReadingPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '무역계약서', count: 10 },
    { id: 1, name: '신용장(L/C)', count: 10 },
    { id: 2, name: '무역서신', count: 10 },
    { id: 3, name: '국제협약', count: 10 },
    { id: 4, name: '선적서류', count: 10 },
  ];

  const questions = [
    // 무역계약서 (10문항)
    { id: 1, topic: 0, question: "\"The seller shall deliver the goods free of any encumbrance.\"에서 'encumbrance'의 의미는?", options: ["저당권/부담", "포장", "할인", "보험"], answer: 0 },
    { id: 2, topic: 0, question: "\"Subject to the terms and conditions herein\"에서 'herein'의 의미는?", options: ["이 문서에", "이전에", "이후에", "외부에"], answer: 0 },
    { id: 3, topic: 0, question: "\"Force majeure clause\"가 적용되는 상황은?", options: ["천재지변이나 불가항력 상황", "계약 변경 시", "대금 지불 시", "선적 완료 시"], answer: 0 },
    { id: 4, topic: 0, question: "\"The buyer shall indemnify the seller against all claims.\"에서 'indemnify'의 의미는?", options: ["손해를 배상하다", "거부하다", "확인하다", "수락하다"], answer: 0 },
    { id: 5, topic: 0, question: "\"This agreement shall be binding upon the parties.\"에서 'binding upon'의 의미는?", options: ["구속력이 있는", "해제되는", "연장되는", "무효인"], answer: 0 },
    { id: 6, topic: 0, question: "\"Arbitration shall be held in accordance with ICC rules.\"에서 ICC는?", options: ["International Chamber of Commerce", "International Commercial Court", "International Contract Committee", "International Cargo Control"], answer: 0 },
    { id: 7, topic: 0, question: "\"Notwithstanding any other provisions\"의 의미는?", options: ["다른 조항에도 불구하고", "다른 조항에 따라", "다른 조항을 대체하여", "다른 조항을 확인하여"], answer: 0 },
    { id: 8, topic: 0, question: "\"The contract is deemed to be concluded.\"에서 'deemed'의 의미는?", options: ["간주되다", "거부되다", "연장되다", "취소되다"], answer: 0 },
    { id: 9, topic: 0, question: "\"Liquidated damages\"의 의미는?", options: ["약정 손해배상금", "현금 지불", "청산 절차", "유동 자산"], answer: 0 },
    { id: 10, topic: 0, question: "\"Mutatis mutandis\"의 의미는?", options: ["필요한 수정을 가하여", "상호 동의하에", "전면 수정하여", "원본 그대로"], answer: 0 },

    // 신용장(L/C) (10문항)
    { id: 11, topic: 1, question: "\"Irrevocable Letter of Credit\"에서 'irrevocable'의 의미는?", options: ["취소불능의", "양도가능의", "일람불의", "기한부의"], answer: 0 },
    { id: 12, topic: 1, question: "\"Documents must be presented within 21 days after shipment.\"에서 요구하는 것은?", options: ["선적 후 21일 내 서류 제시", "21일 이내 선적", "21일 후 결제", "21일 이내 계약"], answer: 0 },
    { id: 13, topic: 1, question: "\"Full set of clean on board B/L\"에서 'clean'의 의미는?", options: ["하자 없이 선적됨", "깨끗이 포장됨", "검사 완료됨", "보험 가입됨"], answer: 0 },
    { id: 14, topic: 1, question: "\"The credit is available by negotiation.\"에서 'negotiation'의 의미는?", options: ["매입", "협상", "수정", "양도"], answer: 0 },
    { id: 15, topic: 1, question: "\"Beneficiary\"의 의미는?", options: ["수익자(수출자)", "개설은행", "통지은행", "매입은행"], answer: 0 },
    { id: 16, topic: 1, question: "\"Discrepancy in documents\"가 발생하면?", options: ["서류 불일치로 대금 지급 거절 가능", "추가 할인 제공", "선적 연장", "보험 청구"], answer: 0 },
    { id: 17, topic: 1, question: "\"Confirm the credit\"의 의미는?", options: ["신용장에 확인을 추가하다", "신용장을 취소하다", "신용장을 양도하다", "신용장을 수정하다"], answer: 0 },
    { id: 18, topic: 1, question: "\"Draft at sight\"의 의미는?", options: ["일람불 환어음", "기한부 환어음", "선적 전 결제", "분할 결제"], answer: 0 },
    { id: 19, topic: 1, question: "\"UCP 600\"은 무엇의 약자인가?", options: ["Uniform Customs and Practice for Documentary Credits", "United Commercial Payment", "Universal Credit Policy", "Unified Contract Provisions"], answer: 0 },
    { id: 20, topic: 1, question: "\"Transshipment is prohibited.\"의 의미는?", options: ["환적 금지", "분할선적 금지", "부분선적 허용", "직접운송 금지"], answer: 0 },

    // 무역서신 (10문항)
    { id: 21, topic: 2, question: "\"We are pleased to inform you that...\"는 어떤 내용의 서두인가?", options: ["긍정적인 통보", "클레임 제기", "거절 통보", "독촉장"], answer: 0 },
    { id: 22, topic: 2, question: "\"We regret to inform you that...\"는 어떤 상황에 사용되는가?", options: ["부정적인 통보", "감사 표시", "주문 확인", "문의 응답"], answer: 0 },
    { id: 23, topic: 2, question: "\"Please find enclosed\"의 의미는?", options: ["동봉된 것을 확인하세요", "찾아보세요", "발견하세요", "분실물을 찾으세요"], answer: 0 },
    { id: 24, topic: 2, question: "\"At your earliest convenience\"의 의미는?", options: ["가급적 빠른 시일 내에", "편리할 때", "늦어도 괜찮으니", "천천히"], answer: 0 },
    { id: 25, topic: 2, question: "\"We look forward to hearing from you.\"는 어떤 의미인가?", options: ["답장을 기다린다", "전화를 기다린다", "방문을 기다린다", "결제를 기다린다"], answer: 0 },
    { id: 26, topic: 2, question: "\"With reference to your inquiry dated...\"는 어떤 용도로 사용되는가?", options: ["문의에 대한 회신", "클레임 제기", "주문 취소", "계약 해지"], answer: 0 },
    { id: 27, topic: 2, question: "\"Should you have any questions, please do not hesitate to contact us.\"의 의미는?", options: ["문의사항이 있으면 연락하세요", "질문하지 마세요", "연락을 삼가해 주세요", "질문을 미루세요"], answer: 0 },
    { id: 28, topic: 2, question: "\"We hereby confirm...\"에서 'hereby'의 의미는?", options: ["이로써", "이전에", "나중에", "그곳에서"], answer: 0 },
    { id: 29, topic: 2, question: "\"Your prompt attention to this matter would be appreciated.\"의 의미는?", options: ["신속한 처리를 부탁드립니다", "주의해 주세요", "감사합니다", "걱정하지 마세요"], answer: 0 },
    { id: 30, topic: 2, question: "\"cc: Mr. Johnson\"에서 'cc'의 의미는?", options: ["참조(Carbon Copy)", "계약 확인", "신용 확인", "비용 계산"], answer: 0 },

    // 국제협약 (10문항)
    { id: 31, topic: 3, question: "\"CISG\"는 무엇의 약자인가?", options: ["Convention on Contracts for the International Sale of Goods", "Commercial International Sales Guidelines", "Contract for International Shipping of Goods", "Convention for International Standard Goods"], answer: 0 },
    { id: 32, topic: 3, question: "CISG가 적용되지 않는 거래는?", options: ["소비자 거래", "기업 간 거래", "국제 물품매매", "상업적 매매"], answer: 0 },
    { id: 33, topic: 3, question: "\"Hague-Visby Rules\"는 무엇에 관한 협약인가?", options: ["해상운송", "항공운송", "육상운송", "복합운송"], answer: 0 },
    { id: 34, topic: 3, question: "\"Warsaw Convention\"은 무엇을 규정하는가?", options: ["국제항공운송", "국제해상운송", "국제무역결제", "국제중재"], answer: 0 },
    { id: 35, topic: 3, question: "\"York-Antwerp Rules\"는 무엇에 관한 규칙인가?", options: ["공동해손(General Average)", "단독해손", "화물보험", "선박보험"], answer: 0 },
    { id: 36, topic: 3, question: "\"CMR Convention\"은 어떤 운송에 관한 협약인가?", options: ["국제도로운송", "해상운송", "항공운송", "철도운송"], answer: 0 },
    { id: 37, topic: 3, question: "\"Incoterms 2020\"을 제정한 기관은?", options: ["ICC (International Chamber of Commerce)", "WTO", "UN", "IMF"], answer: 0 },
    { id: 38, topic: 3, question: "\"Hamburg Rules\"는 무엇을 대체하기 위해 만들어졌는가?", options: ["Hague-Visby Rules", "Warsaw Convention", "CMR Convention", "CISG"], answer: 0 },
    { id: 39, topic: 3, question: "\"UNCITRAL\"의 역할은?", options: ["국제무역법 통일화", "관세 부과", "무역 분쟁 해결", "환율 결정"], answer: 0 },
    { id: 40, topic: 3, question: "\"New York Convention\"은 무엇에 관한 협약인가?", options: ["외국중재판정의 승인 및 집행", "해상운송", "신용장 거래", "무역보험"], answer: 0 },

    // 선적서류 (10문항)
    { id: 41, topic: 4, question: "\"B/L\"은 무엇의 약자인가?", options: ["Bill of Lading", "Bill of Loading", "Bank Letter", "Business License"], answer: 0 },
    { id: 42, topic: 4, question: "\"Shipped on Board B/L\"과 \"Received for Shipment B/L\"의 차이는?", options: ["본선 적재 여부", "보험 가입 여부", "세관 통과 여부", "결제 완료 여부"], answer: 0 },
    { id: 43, topic: 4, question: "\"Commercial Invoice\"에 반드시 포함되어야 할 정보가 아닌 것은?", options: ["선장 서명", "상품 명세", "단가 및 총액", "수출입자 정보"], answer: 0 },
    { id: 44, topic: 4, question: "\"Packing List\"의 주요 내용은?", options: ["포장 상세 내역", "가격 정보", "보험 조건", "결제 조건"], answer: 0 },
    { id: 45, topic: 4, question: "\"Certificate of Origin\"의 용도는?", options: ["원산지 증명", "품질 증명", "보험 증명", "운송 증명"], answer: 0 },
    { id: 46, topic: 4, question: "\"Insurance Policy\"와 \"Insurance Certificate\"의 차이는?", options: ["보험증권 vs 보험증명서", "해상보험 vs 화재보험", "단기보험 vs 장기보험", "전위험 vs 분손담보"], answer: 0 },
    { id: 47, topic: 4, question: "\"Consignee\"의 의미는?", options: ["수하인", "송하인", "운송인", "보험자"], answer: 0 },
    { id: 48, topic: 4, question: "\"Notify Party\"는 누구인가?", options: ["화물 도착 통지를 받을 자", "화물을 수령할 자", "화물을 발송할 자", "보험금을 받을 자"], answer: 0 },
    { id: 49, topic: 4, question: "\"Airway Bill\"의 특징은?", options: ["비유통증권", "유통증권", "선적증권", "창고증권"], answer: 0 },
    { id: 50, topic: 4, question: "\"FCR (Forwarder's Cargo Receipt)\"의 용도는?", options: ["복합운송 시 화물 인수증", "해상운송 전용", "항공운송 전용", "철도운송 전용"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-1-reading-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-1-reading-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-1-reading-progress');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 영문해석</h1>
          <p className="text-gray-500">무역 관련 영문 독해 능력</p>
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
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
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
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-800 font-medium">
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
