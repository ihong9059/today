'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeTermsPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: 'Incoterms E/F', count: 10 },
    { id: 1, name: 'Incoterms C', count: 10 },
    { id: 2, name: 'Incoterms D', count: 10 },
    { id: 3, name: '결제용어', count: 10 },
    { id: 4, name: '일반무역용어', count: 10 },
  ];

  const questions = [
    // Incoterms E/F (10문항)
    { id: 1, topic: 0, question: "EXW (Ex Works)에서 매도인의 의무가 끝나는 지점은?", options: ["공장/창고 인도 시점", "선적항 본선 적재 시점", "도착항 인도 시점", "구매자 창고 도착 시점"], answer: 0 },
    { id: 2, topic: 0, question: "FCA (Free Carrier)에서 위험 이전 시점은?", options: ["지정 장소에서 운송인에게 인도 시", "본선 적재 시", "목적지 도착 시", "세관 통관 시"], answer: 0 },
    { id: 3, topic: 0, question: "FOB (Free On Board)에서 매도인의 비용 부담 범위는?", options: ["본선 적재까지", "운임 포함", "보험료 포함", "목적지까지"], answer: 0 },
    { id: 4, topic: 0, question: "FAS (Free Alongside Ship)의 특징은?", options: ["선측 인도 조건", "본선 적재 조건", "운임 포함 조건", "보험 포함 조건"], answer: 0 },
    { id: 5, topic: 0, question: "EXW 조건에서 수출 통관 책임은?", options: ["매수인", "매도인", "운송인", "세관"], answer: 0 },
    { id: 6, topic: 0, question: "FOB 조건에서 해상 운임 부담자는?", options: ["매수인", "매도인", "선박회사", "보험회사"], answer: 0 },
    { id: 7, topic: 0, question: "FCA 조건이 FOB보다 유리한 점은?", options: ["복합운송에 적합", "비용이 저렴", "서류가 간단", "보험 포함"], answer: 0 },
    { id: 8, topic: 0, question: "Incoterms 2020에서 FAS, FOB, CFR, CIF의 공통점은?", options: ["해상/내수면 운송 전용", "항공운송 전용", "복합운송 전용", "철도운송 전용"], answer: 0 },
    { id: 9, topic: 0, question: "FOB Incheon의 의미는?", options: ["인천항 본선 적재 인도", "인천항 도착 인도", "인천 창고 인도", "인천공항 인도"], answer: 0 },
    { id: 10, topic: 0, question: "FCA와 FOB의 주요 차이점은?", options: ["FCA는 모든 운송수단, FOB는 해상만", "FCA가 비용이 더 높음", "FOB가 복합운송에 적합", "차이 없음"], answer: 0 },

    // Incoterms C (10문항)
    { id: 11, topic: 1, question: "CIF (Cost, Insurance and Freight)에서 매도인이 부담하는 것은?", options: ["비용, 보험, 운임", "비용만", "운임만", "보험만"], answer: 0 },
    { id: 12, topic: 1, question: "CFR (Cost and Freight)과 CIF의 차이는?", options: ["보험료 부담 여부", "운임 부담 여부", "위험 이전 시점", "인도 장소"], answer: 0 },
    { id: 13, topic: 1, question: "CIF 조건에서 위험 이전 시점은?", options: ["선적항 본선 적재 시", "목적항 도착 시", "매수인 창고 도착 시", "보험 가입 시"], answer: 0 },
    { id: 14, topic: 1, question: "CPT (Carriage Paid To)에서 매도인 의무는?", options: ["지정 목적지까지 운임 지불", "보험 가입", "목적지 인도", "세관 통관"], answer: 0 },
    { id: 15, topic: 1, question: "CIP (Carriage and Insurance Paid to)가 CPT와 다른 점은?", options: ["보험료 포함", "운임 포함", "위험 이전 시점", "인도 장소"], answer: 0 },
    { id: 16, topic: 1, question: "C-terms에서 공통적인 특징은?", options: ["비용과 위험 분리점이 다름", "비용과 위험 분리점이 같음", "매도인 위험 최소", "매수인 위험 없음"], answer: 0 },
    { id: 17, topic: 1, question: "CIF 조건에서 보험 최소 부보 기준은?", options: ["CIF 가격의 110%", "CIF 가격의 100%", "송장 금액", "FOB 가격"], answer: 0 },
    { id: 18, topic: 1, question: "Incoterms 2020에서 CIP의 보험 기준이 변경된 내용은?", options: ["ICC(A) 조건으로 상향", "ICC(C) 조건으로 하향", "보험 의무 삭제", "변경 없음"], answer: 0 },
    { id: 19, topic: 1, question: "CFR Busan의 의미는?", options: ["부산까지 운임 포함 가격", "부산에서 선적", "부산 창고 인도", "부산공항 인도"], answer: 0 },
    { id: 20, topic: 1, question: "CPT와 CIP가 CFR, CIF보다 유리한 점은?", options: ["모든 운송수단에 사용 가능", "비용이 저렴", "위험이 적음", "서류가 간단"], answer: 0 },

    // Incoterms D (10문항)
    { id: 21, topic: 2, question: "DAP (Delivered at Place)에서 매도인 의무가 끝나는 지점은?", options: ["지정 목적지 도착, 하역 전", "선적항 본선 적재", "목적항 하역 완료", "매수인 창고 입고"], answer: 0 },
    { id: 22, topic: 2, question: "DPU (Delivered at Place Unloaded)의 특징은?", options: ["지정 장소에서 하역까지 매도인 책임", "하역 전 인도", "선적 책임만", "운임만 부담"], answer: 0 },
    { id: 23, topic: 2, question: "DDP (Delivered Duty Paid)에서 매도인의 책임 범위는?", options: ["수입 통관 및 관세 납부까지 전부", "수출 통관까지", "운임까지", "보험까지"], answer: 0 },
    { id: 24, topic: 2, question: "D-terms에서 공통점은?", options: ["도착지 인도 조건", "선적지 인도 조건", "운임 미포함", "보험 미포함"], answer: 0 },
    { id: 25, topic: 2, question: "DAP와 DPU의 차이는?", options: ["하역 책임 유무", "운임 포함 여부", "보험 포함 여부", "통관 책임"], answer: 0 },
    { id: 26, topic: 2, question: "DDP 조건이 매수인에게 가장 유리한 이유는?", options: ["모든 비용과 위험을 매도인이 부담", "가격이 저렴", "품질 보증", "빠른 배송"], answer: 0 },
    { id: 27, topic: 2, question: "Incoterms 2010의 DAT가 Incoterms 2020에서 바뀐 명칭은?", options: ["DPU", "DAP", "DDP", "삭제됨"], answer: 0 },
    { id: 28, topic: 2, question: "DDP Seoul의 의미는?", options: ["서울까지 관세 납부 완료 인도", "서울에서 선적", "서울 창고 보관", "서울공항 인도"], answer: 0 },
    { id: 29, topic: 2, question: "D-terms 사용 시 매도인이 가장 큰 위험을 부담하는 조건은?", options: ["DDP", "DAP", "DPU", "모두 동일"], answer: 0 },
    { id: 30, topic: 2, question: "D-terms가 C-terms와 다른 핵심 차이는?", options: ["도착지에서 위험 이전", "선적지에서 위험 이전", "보험 필수", "운임 미포함"], answer: 0 },

    // 결제용어 (10문항)
    { id: 31, topic: 3, question: "L/C (Letter of Credit)의 정의는?", options: ["은행의 조건부 지급 확약", "현금 결제", "외상 거래", "어음 결제"], answer: 0 },
    { id: 32, topic: 3, question: "T/T (Telegraphic Transfer)의 특징은?", options: ["전신환 송금", "신용장 결제", "추심 결제", "현금 결제"], answer: 0 },
    { id: 33, topic: 3, question: "D/P (Documents against Payment)의 의미는?", options: ["지급 인도 조건", "인수 인도 조건", "신용장 결제", "전신환 결제"], answer: 0 },
    { id: 34, topic: 3, question: "D/A (Documents against Acceptance)의 특징은?", options: ["환어음 인수 후 서류 인도", "지급 즉시 서류 인도", "신용장 제시", "현금 결제"], answer: 0 },
    { id: 35, topic: 3, question: "Sight L/C와 Usance L/C의 차이는?", options: ["일람불 vs 기한부", "취소가능 vs 취소불능", "확인 vs 미확인", "양도 vs 양도불가"], answer: 0 },
    { id: 36, topic: 3, question: "CAD (Cash Against Documents)의 의미는?", options: ["서류 상환불", "신용장 결제", "추심 결제", "외상 거래"], answer: 0 },
    { id: 37, topic: 3, question: "Advance Payment의 의미와 특징은?", options: ["선불 결제, 수출자에게 유리", "후불 결제", "분할 결제", "신용장 결제"], answer: 0 },
    { id: 38, topic: 3, question: "Open Account의 특징은?", options: ["외상 거래, 수입자에게 유리", "선불 거래", "신용장 거래", "현금 거래"], answer: 0 },
    { id: 39, topic: 3, question: "Escrow의 용도는?", options: ["제3자를 통한 안전 거래", "직접 결제", "어음 발행", "추심 결제"], answer: 0 },
    { id: 40, topic: 3, question: "Confirmed L/C가 Unconfirmed L/C보다 안전한 이유는?", options: ["확인은행의 추가 지급 보증", "수수료가 저렴", "절차가 간단", "기간이 짧음"], answer: 0 },

    // 일반무역용어 (10문항)
    { id: 41, topic: 4, question: "Consignment의 의미는?", options: ["위탁 판매", "직접 수출", "중개 무역", "삼국간 무역"], answer: 0 },
    { id: 42, topic: 4, question: "Bonded Warehouse의 용도는?", options: ["보세 창고, 관세 유보", "일반 창고", "냉동 창고", "위험물 창고"], answer: 0 },
    { id: 43, topic: 4, question: "ATA Carnet의 용도는?", options: ["일시 수입품 면세 통관", "영구 수입", "수출 허가", "관세 환급"], answer: 0 },
    { id: 44, topic: 4, question: "Drawback의 의미는?", options: ["관세 환급", "관세 부과", "벌금 부과", "세금 감면"], answer: 0 },
    { id: 45, topic: 4, question: "Force Majeure가 적용되는 상황은?", options: ["천재지변, 전쟁 등 불가항력", "계약 위반", "품질 불량", "가격 변동"], answer: 0 },
    { id: 46, topic: 4, question: "Proforma Invoice의 용도는?", options: ["견적 송장, 거래 조건 제시", "최종 청구서", "세금계산서", "영수증"], answer: 0 },
    { id: 47, topic: 4, question: "HS Code의 역할은?", options: ["국제 통일 상품 분류 번호", "회사 코드", "선박 코드", "은행 코드"], answer: 0 },
    { id: 48, topic: 4, question: "Demurrage의 의미는?", options: ["체선료/체화료", "운임", "보험료", "하역비"], answer: 0 },
    { id: 49, topic: 4, question: "TEU (Twenty-foot Equivalent Unit)의 의미는?", options: ["20피트 컨테이너 환산 단위", "톤 단위", "무게 단위", "거리 단위"], answer: 0 },
    { id: 50, topic: 4, question: "General Average의 의미는?", options: ["공동해손", "단독해손", "화물 보험", "선박 보험"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-1-terms-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-1-terms-progress', JSON.stringify({
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
    localStorage.removeItem('trade-english-1-terms-progress');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 무역용어</h1>
          <p className="text-gray-500">Incoterms 및 무역 전문용어</p>
        </div>

        {/* Incoterms Reference */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-4">📦 Incoterms 2020 한눈에 보기</h2>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white/20 rounded-xl p-3">
              <p className="font-bold mb-1">E그룹</p>
              <p>EXW</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="font-bold mb-1">F그룹</p>
              <p>FCA, FAS, FOB</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="font-bold mb-1">C그룹</p>
              <p>CFR, CIF, CPT, CIP</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="font-bold mb-1">D그룹</p>
              <p>DAP, DPU, DDP</p>
            </div>
          </div>
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
