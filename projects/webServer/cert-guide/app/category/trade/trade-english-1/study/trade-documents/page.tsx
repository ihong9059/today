'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeDocumentsPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '신용장(L/C)', count: 10 },
    { id: 1, name: '선하증권(B/L)', count: 10 },
    { id: 2, name: '상업송장', count: 10 },
    { id: 3, name: '보험서류', count: 10 },
    { id: 4, name: '기타서류', count: 10 },
  ];

  const questions = [
    // 신용장(L/C) (10문항)
    { id: 1, topic: 0, question: "L/C의 당사자 중 'Applicant'의 역할은?", options: ["신용장 개설 신청인(수입자)", "수익자(수출자)", "개설은행", "통지은행"], answer: 0 },
    { id: 2, topic: 0, question: "L/C에서 'Issuing Bank'의 역할은?", options: ["신용장을 개설하는 은행", "신용장을 통지하는 은행", "신용장을 확인하는 은행", "서류를 매입하는 은행"], answer: 0 },
    { id: 3, topic: 0, question: "L/C의 'Advising Bank'와 'Confirming Bank'의 차이는?", options: ["통지만 vs 지급보증 추가", "같은 역할", "개설 vs 통지", "결제 vs 추심"], answer: 0 },
    { id: 4, topic: 0, question: "\"Transferable L/C\"의 특징은?", options: ["양도 가능 신용장", "취소 가능 신용장", "확인 신용장", "일람불 신용장"], answer: 0 },
    { id: 5, topic: 0, question: "\"Revolving L/C\"는 어떤 거래에 적합한가?", options: ["반복적인 정기 거래", "일회성 대규모 거래", "샘플 주문", "긴급 주문"], answer: 0 },
    { id: 6, topic: 0, question: "L/C에서 \"47A: Additional Conditions\"란?", options: ["추가 조건란", "상품 명세란", "선적 조건란", "결제 조건란"], answer: 0 },
    { id: 7, topic: 0, question: "\"Red Clause L/C\"의 특징은?", options: ["선적 전 대금 선지급 가능", "선적 후에만 지급", "분할선적 불가", "환적 불가"], answer: 0 },
    { id: 8, topic: 0, question: "L/C 조건 불일치(Discrepancy) 발생 시 처리 방법이 아닌 것은?", options: ["무시하고 대금 청구", "조건 수정 요청", "서류 정정", "개설의뢰인 승인 요청"], answer: 0 },
    { id: 9, topic: 0, question: "\"Back-to-Back L/C\"의 용도는?", options: ["중계무역 시 원신용장 담보로 신규 L/C 개설", "양도 신용장", "회전 신용장", "확인 신용장"], answer: 0 },
    { id: 10, topic: 0, question: "UCP 600 제14조 'Standard for Examination of Documents'의 핵심은?", options: ["서류 심사 기준 5영업일", "서류 심사 기준 3일", "서류 심사 기준 7일", "서류 심사 기준 10일"], answer: 0 },

    // 선하증권(B/L) (10문항)
    { id: 11, topic: 1, question: "B/L의 3대 기능이 아닌 것은?", options: ["보험증권", "화물수령증", "운송계약 증거", "권리증권"], answer: 0 },
    { id: 12, topic: 1, question: "\"Order B/L\"의 특징은?", options: ["배서에 의해 양도 가능", "양도 불가", "기명인만 수령", "운송인이 수령"], answer: 0 },
    { id: 13, topic: 1, question: "\"Straight B/L\"의 특징은?", options: ["기명인만 화물 수령 가능, 양도 불가", "배서로 양도 가능", "무기명 양도", "운송인 보관"], answer: 0 },
    { id: 14, topic: 1, question: "\"Shipped on Board B/L\"과 \"Received for Shipment B/L\"의 핵심 차이는?", options: ["본선 적재 완료 여부", "운임 지불 여부", "보험 가입 여부", "통관 완료 여부"], answer: 0 },
    { id: 15, topic: 1, question: "\"Clean B/L\"이란?", options: ["화물 손상 없이 본선에 적재되었음을 표시", "깨끗하게 인쇄된 B/L", "복사본이 없는 B/L", "보험이 포함된 B/L"], answer: 0 },
    { id: 16, topic: 1, question: "\"Foul B/L\" 또는 \"Claused B/L\"이란?", options: ["화물 상태에 이상이 있음을 기재", "정상 상태 B/L", "분실된 B/L", "무효 B/L"], answer: 0 },
    { id: 17, topic: 1, question: "B/L의 \"Consignee\" 란에 \"To Order\"로 기재된 경우?", options: ["송하인의 배서로 양도 가능", "수하인 고정", "양도 불가", "운송인 보관"], answer: 0 },
    { id: 18, topic: 1, question: "\"Switch B/L\"의 용도는?", options: ["중계무역 시 원산지 변경/가격 은폐", "분실 시 재발행", "복사본 발행", "보험 청구"], answer: 0 },
    { id: 19, topic: 1, question: "B/L의 \"Freight Prepaid\"와 \"Freight Collect\"의 차이는?", options: ["운임 선불 vs 운임 착불", "보험 포함 vs 미포함", "통관 완료 vs 미완료", "포장 포함 vs 미포함"], answer: 0 },
    { id: 20, topic: 1, question: "\"Full Set of B/L\"의 일반적인 통수는?", options: ["Original 3통", "Original 1통", "Original 5통", "Original 2통"], answer: 0 },

    // 상업송장 (10문항)
    { id: 21, topic: 2, question: "Commercial Invoice의 주요 기능이 아닌 것은?", options: ["운송 계약 증거", "대금 청구서", "통관 자료", "거래 명세서"], answer: 0 },
    { id: 22, topic: 2, question: "Invoice에 반드시 기재되어야 할 내용이 아닌 것은?", options: ["선장 서명", "상품 명세", "단가 및 총액", "무역조건"], answer: 0 },
    { id: 23, topic: 2, question: "\"Proforma Invoice\"의 용도는?", options: ["견적 송장, 거래 조건 제시", "최종 청구서", "세금계산서", "영수증"], answer: 0 },
    { id: 24, topic: 2, question: "\"Consular Invoice\"가 필요한 경우는?", options: ["수입국 영사 확인이 필요한 경우", "일반 수출", "국내 거래", "샘플 발송"], answer: 0 },
    { id: 25, topic: 2, question: "Invoice의 \"Unit Price\"와 \"Amount\"의 관계는?", options: ["Unit Price × Quantity = Amount", "같은 개념", "Unit Price > Amount", "관계 없음"], answer: 0 },
    { id: 26, topic: 2, question: "L/C 거래 시 Invoice 금액이 L/C 금액을 초과하면?", options: ["Discrepancy 발생", "정상 처리", "자동 조정", "추가 결제"], answer: 0 },
    { id: 27, topic: 2, question: "Invoice에 기재된 \"Trade Terms: CIF Busan\"의 의미는?", options: ["부산까지 운임보험료 포함 가격 조건", "부산 출발 조건", "부산 창고 인도", "부산 공장 가격"], answer: 0 },
    { id: 28, topic: 2, question: "\"Certified Invoice\"란?", options: ["상공회의소 등에서 인증받은 송장", "사본 송장", "수정 송장", "취소 송장"], answer: 0 },
    { id: 29, topic: 2, question: "Invoice 발행일과 L/C 유효기간의 관계는?", options: ["Invoice 발행일이 L/C 유효기간 내여야 함", "관계 없음", "Invoice가 먼저 발행되어야 함", "L/C 만료 후 발행 가능"], answer: 0 },
    { id: 30, topic: 2, question: "\"Customs Invoice\"의 주요 용도는?", options: ["세관 통관용 송장", "일반 거래용", "은행 제출용", "보험 청구용"], answer: 0 },

    // 보험서류 (10문항)
    { id: 31, topic: 3, question: "해상보험에서 \"All Risks (A/R)\"의 의미는?", options: ["전위험담보", "특정위험만 담보", "분손부담보", "전손만 담보"], answer: 0 },
    { id: 32, topic: 3, question: "\"WA (With Average)\"와 \"FPA (Free from Particular Average)\"의 차이는?", options: ["분손담보 vs 분손부담보", "같은 의미", "전손담보 vs 분손담보", "단독해손 vs 공동해손"], answer: 0 },
    { id: 33, topic: 3, question: "CIF 조건에서 보험 최소 부보금액 기준은?", options: ["CIF 가격의 110%", "FOB 가격", "Invoice 금액", "원가"], answer: 0 },
    { id: 34, topic: 3, question: "\"Insurance Policy\"와 \"Insurance Certificate\"의 법적 효력 차이는?", options: ["Policy가 원본, Certificate는 요약본", "같은 효력", "Certificate가 우선", "둘 다 무효"], answer: 0 },
    { id: 35, topic: 3, question: "\"Open Policy (OP)\"의 특징은?", options: ["포괄예정보험증권, 계속 거래용", "건별 보험", "단기 보험", "항공보험 전용"], answer: 0 },
    { id: 36, topic: 3, question: "L/C 거래 시 보험서류 피보험자(Insured)는 누구여야 하는가?", options: ["L/C 조건에 따름, 보통 수입자 또는 지시식", "반드시 수출자", "반드시 운송인", "반드시 은행"], answer: 0 },
    { id: 37, topic: 3, question: "\"War Risk\"는 기본 담보에 포함되는가?", options: ["별도 추가 담보 필요", "기본 포함", "항상 제외", "무료 추가"], answer: 0 },
    { id: 38, topic: 3, question: "보험 서류의 발행일이 선적일보다 늦으면?", options: ["Discrepancy 발생 (선적 전 부보 원칙)", "정상", "자동 연장", "보험 무효"], answer: 0 },
    { id: 39, topic: 3, question: "\"Warehouse to Warehouse Clause\"의 의미는?", options: ["창고간 약관 (출발지~도착지 창고)", "창고 내 보관만", "운송 중만 담보", "하역 시만 담보"], answer: 0 },
    { id: 40, topic: 3, question: "ICC (Institute Cargo Clauses) 2009의 등급 순서(담보 범위 넓음→좁음)는?", options: ["ICC(A) → ICC(B) → ICC(C)", "ICC(C) → ICC(B) → ICC(A)", "모두 동일", "ICC(B)가 가장 넓음"], answer: 0 },

    // 기타서류 (10문항)
    { id: 41, topic: 4, question: "\"Packing List\"의 주요 내용이 아닌 것은?", options: ["가격 정보", "포장 단위", "순중량/총중량", "케이스 번호"], answer: 0 },
    { id: 42, topic: 4, question: "\"Certificate of Origin (C/O)\"의 용도는?", options: ["원산지 증명, 관세 혜택", "품질 증명", "검역 증명", "보험 증명"], answer: 0 },
    { id: 43, topic: 4, question: "FTA 특혜관세 적용을 위한 원산지 증명서는?", options: ["FTA 원산지 증명서", "일반 원산지 증명서", "상공회의소 발행 C/O", "자율 C/O"], answer: 0 },
    { id: 44, topic: 4, question: "\"Inspection Certificate\"의 발행 주체는?", options: ["제3자 검정기관 (SGS 등)", "수출자", "수입자", "운송인"], answer: 0 },
    { id: 45, topic: 4, question: "\"Phytosanitary Certificate\"가 필요한 품목은?", options: ["식물성 제품 (농산물)", "공산품", "화학제품", "섬유제품"], answer: 0 },
    { id: 46, topic: 4, question: "\"Veterinary Certificate\"가 필요한 품목은?", options: ["동물성 제품 (축산물)", "식물성 제품", "기계류", "전자제품"], answer: 0 },
    { id: 47, topic: 4, question: "\"Weight Certificate\"와 \"Measurement Certificate\"의 차이는?", options: ["중량 증명 vs 용적 증명", "같은 서류", "포장 증명 vs 품질 증명", "원산지 vs 검역"], answer: 0 },
    { id: 48, topic: 4, question: "\"Dangerous Goods Declaration\"이 필요한 경우는?", options: ["위험물 운송 시", "일반 화물", "식품 운송 시", "냉동 화물"], answer: 0 },
    { id: 49, topic: 4, question: "\"Fumigation Certificate\"의 용도는?", options: ["훈증 소독 증명 (목재 포장재)", "품질 증명", "보험 증명", "통관 증명"], answer: 0 },
    { id: 50, topic: 4, question: "\"GSP Form A\"의 용도는?", options: ["일반특혜관세 원산지 증명서", "FTA 원산지 증명", "일반 원산지 증명", "품질 증명"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-1-documents-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-1-documents-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-1-documents-progress');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 무역서류</h1>
          <p className="text-gray-500">L/C, B/L 등 무역서류</p>
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
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
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
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-purple-800 font-medium">
                    ✅ 정답: {q.answer + 1}. {q.options[q.answer]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
