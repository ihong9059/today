'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradePracticePage() {
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
    // 무역계약 (10문제)
    { id: 1, topic: "무역계약", question: "무역계약에서 청약(Offer)의 효력이 발생하는 시점은?", options: ["청약서 작성 시", "청약 발송 시", "청약 도달 시", "청약 승낙 시"], answer: 2, explanation: "청약은 상대방에게 도달한 때 효력이 발생합니다. 이를 도달주의라고 합니다." },
    { id: 2, topic: "무역계약", question: "Firm Offer(확정 청약)에 대한 설명으로 옳은 것은?", options: ["언제든지 철회 가능", "유효기간 내 철회 불가", "승낙 없이 자동 성립", "구두로만 가능"], answer: 1, explanation: "Firm Offer는 유효기간을 명시하고 그 기간 내에는 철회할 수 없는 확정적인 청약입니다." },
    { id: 3, topic: "무역계약", question: "Counter Offer(반대청약)의 효과로 옳은 것은?", options: ["원청약 효력 유지", "원청약 효력 소멸", "원청약 유효기간 연장", "자동으로 계약 성립"], answer: 1, explanation: "Counter Offer는 원청약을 거절하고 새로운 청약을 하는 것으로, 원청약의 효력은 소멸됩니다." },
    { id: 4, topic: "무역계약", question: "무역계약의 성립요건이 아닌 것은?", options: ["당사자의 합의", "확정 가능한 목적", "적법한 내용", "공증인의 확인"], answer: 3, explanation: "무역계약의 성립요건은 당사자 합의, 확정 가능한 목적, 적법한 내용이며, 공증은 필수가 아닙니다." },
    { id: 5, topic: "무역계약", question: "국제물품매매계약에 관한 UN협약(CISG)의 적용이 배제되는 경우는?", options: ["계약당사자가 명시적으로 배제한 경우", "물품대금이 일정액 이상인 경우", "당사국 간의 거래인 경우", "서면으로 계약한 경우"], answer: 0, explanation: "CISG는 당사자가 명시적으로 적용 배제를 합의한 경우 적용되지 않습니다." },
    { id: 6, topic: "무역계약", question: "무역계약서에 포함되어야 할 필수 조항이 아닌 것은?", options: ["품명 및 규격", "수량 및 가격", "선적일 및 목적지", "판매 후 마케팅 계획"], answer: 3, explanation: "판매 후 마케팅 계획은 무역계약의 필수 조항이 아니며, 별도의 마케팅 계약으로 체결합니다." },
    { id: 7, topic: "무역계약", question: "무역계약에서 Quantity 조건 표시 시 'about', 'circa'의 의미는?", options: ["정확한 수량", "±5% 범위", "±10% 범위", "무제한 허용"], answer: 2, explanation: "'About', 'circa' 등의 표현은 일반적으로 ±10% 범위의 과부족을 허용합니다." },
    { id: 8, topic: "무역계약", question: "무역계약에서 품질결정 방법 중 'Sale by Sample'의 의미는?", options: ["표준품 매매", "견본 매매", "명세서 매매", "상표 매매"], answer: 1, explanation: "Sale by Sample은 견본품을 기준으로 품질을 결정하는 견본 매매 방식입니다." },
    { id: 9, topic: "무역계약", question: "FOB 조건에서 위험이전 시점은?", options: ["공장 인도 시", "본선 적재 시", "목적항 도착 시", "창고 입고 시"], answer: 1, explanation: "FOB 조건에서 위험은 물품이 선적항에서 본선에 적재될 때 매수인에게 이전됩니다." },
    { id: 10, topic: "무역계약", question: "무역계약에서 Force Majeure(불가항력) 조항의 목적은?", options: ["계약이행 촉진", "손해배상 증가", "책임 면제", "이익 극대화"], answer: 2, explanation: "불가항력 조항은 천재지변 등 예측 불가능한 사유로 계약 이행이 불가능한 경우 당사자의 책임을 면제합니다." },

    // Incoterms (10문제)
    { id: 11, topic: "Incoterms", question: "Incoterms 2020에서 해상운송에만 사용되는 조건이 아닌 것은?", options: ["FOB", "CFR", "CIF", "DAP"], answer: 3, explanation: "DAP는 모든 운송방식에 사용 가능하며, FOB, CFR, CIF는 해상 및 내수로 운송에만 사용됩니다." },
    { id: 12, topic: "Incoterms", question: "CIF 조건에서 매도인의 의무가 아닌 것은?", options: ["해상운송 계약 체결", "해상적하보험 가입", "수입통관", "선적서류 제공"], answer: 2, explanation: "CIF 조건에서 수입통관은 매수인의 의무이며, 매도인은 운송 및 보험 계약을 담당합니다." },
    { id: 13, topic: "Incoterms", question: "EXW 조건에서 매도인의 위험이전 시점은?", options: ["수출통관 완료 시", "매도인 영업장에서 물품 인도 시", "본선 적재 시", "목적지 도착 시"], answer: 1, explanation: "EXW는 매도인 영업장에서 물품을 매수인의 처분하에 놓는 시점에 위험이 이전됩니다." },
    { id: 14, topic: "Incoterms", question: "FCA 조건에서 운송인에게 인도하는 장소가 매도인 영업장인 경우, 물품 적재 책임은?", options: ["매수인", "매도인", "운송인", "보험회사"], answer: 1, explanation: "FCA 조건에서 인도장소가 매도인 영업장인 경우, 매도인이 물품을 운송수단에 적재해야 합니다." },
    { id: 15, topic: "Incoterms", question: "DDP 조건에서 매도인의 의무로 옳은 것은?", options: ["수출통관만 담당", "운송비만 부담", "수입통관 및 관세 부담", "보험가입 필수"], answer: 2, explanation: "DDP는 매도인이 수입통관과 관세를 포함한 모든 비용을 부담하는 조건입니다." },
    { id: 16, topic: "Incoterms", question: "CPT와 CIP의 차이점은?", options: ["운송비 부담 여부", "보험가입 의무 유무", "위험이전 시점", "통관 책임"], answer: 1, explanation: "CPT와 CIP의 차이는 보험가입 의무 유무입니다. CIP는 매도인이 보험가입 의무가 있습니다." },
    { id: 17, topic: "Incoterms", question: "Incoterms 2020에서 FCA 조건의 새로운 옵션은?", options: ["보험가입 의무 추가", "본선적재 선하증권 발행 요청 가능", "수입통관 의무 추가", "해상운송만 사용"], answer: 1, explanation: "Incoterms 2020에서 FCA 조건에 신용장 거래 시 본선적재 선하증권 발행 요청 옵션이 추가되었습니다." },
    { id: 18, topic: "Incoterms", question: "DAP 조건에서 양하(unloading) 비용 부담은?", options: ["매도인", "매수인", "운송인", "공동 부담"], answer: 1, explanation: "DAP 조건에서 매도인은 목적지까지 운송하고, 양하 비용은 매수인이 부담합니다." },
    { id: 19, topic: "Incoterms", question: "CIF 조건에서 매도인이 가입해야 하는 최소 보험 조건은?", options: ["ICC(A)", "ICC(B)", "ICC(C)", "선택 자유"], answer: 2, explanation: "CIF 조건에서 매도인은 최소 ICC(C) 조건의 보험에 가입해야 합니다." },
    { id: 20, topic: "Incoterms", question: "FAS 조건에서 물품 인도 장소는?", options: ["매도인 공장", "본선 선측", "목적항 부두", "매수인 창고"], answer: 1, explanation: "FAS(Free Alongside Ship)는 선적항에서 본선 선측에 물품을 인도하는 조건입니다." },

    // 대금결제 (10문제)
    { id: 21, topic: "대금결제", question: "신용장 거래에서 개설은행(Issuing Bank)의 역할은?", options: ["수출상 대리", "수입상 대리 및 대금지급 보증", "운송 주선", "검사 대행"], answer: 1, explanation: "개설은행은 수입상의 요청에 따라 신용장을 개설하고 조건에 맞는 서류 제시 시 대금지급을 보증합니다." },
    { id: 22, topic: "대금결제", question: "취소불능신용장(Irrevocable L/C)의 특징은?", options: ["개설은행이 일방적으로 취소 가능", "모든 당사자 동의 없이 변경 불가", "수출상의 요청으로 변경 가능", "유효기간 제한 없음"], answer: 1, explanation: "취소불능신용장은 수익자(수출상), 개설은행, 확인은행 등 모든 당사자의 동의 없이 취소나 변경이 불가능합니다." },
    { id: 23, topic: "대금결제", question: "UCP 600에서 은행의 서류심사 기간은?", options: ["3영업일", "5영업일", "7영업일", "10영업일"], answer: 1, explanation: "UCP 600에 따르면 은행은 서류를 접수한 다음 날부터 최대 5영업일 이내에 심사를 완료해야 합니다." },
    { id: 24, topic: "대금결제", question: "추심결제(D/P, D/A)에서 D/A의 의미는?", options: ["지급인도조건", "인수인도조건", "상환청구권 없음", "일람출급"], answer: 1, explanation: "D/A(Documents against Acceptance)는 수입상이 환어음을 인수하면 서류를 인도하는 인수인도조건입니다." },
    { id: 25, topic: "대금결제", question: "Standby L/C(보증신용장)의 주요 용도는?", options: ["일반 상품대금 결제", "채무불이행 시 보상", "운송비 지급", "관세 납부"], answer: 1, explanation: "Standby L/C는 주로 계약 이행 보증, 차입금 상환 보증 등 채무불이행 시 보상을 위해 사용됩니다." },
    { id: 26, topic: "대금결제", question: "신용장 통일규칙(UCP)을 제정하는 기관은?", options: ["WTO", "ICC", "UN", "IMF"], answer: 1, explanation: "신용장 통일규칙(UCP)은 국제상업회의소(ICC)에서 제정합니다. 현재 UCP 600이 적용 중입니다." },
    { id: 27, topic: "대금결제", question: "Red Clause L/C의 특징은?", options: ["선적 전 대금 선지급 가능", "양도 가능", "분할 선적 가능", "취소 가능"], answer: 0, explanation: "Red Clause L/C는 수출상이 물품 선적 전에 대금의 일부를 선지급 받을 수 있는 신용장입니다." },
    { id: 28, topic: "대금결제", question: "신용장 거래에서 Discrepancy(하자)가 발견된 경우 은행의 조치는?", options: ["자동 지급", "무조건 거절", "개설의뢰인에게 통보 후 지시 대기", "수정 후 지급"], answer: 2, explanation: "서류에 하자가 있는 경우 은행은 개설의뢰인(수입상)에게 통보하고 지시를 기다립니다." },
    { id: 29, topic: "대금결제", question: "Transferable L/C(양도가능신용장)에서 제1수익자가 변경할 수 없는 조건은?", options: ["단가", "유효기간", "신용장 금액", "수량"], answer: 1, explanation: "양도 시 제1수익자는 금액, 단가, 유효기간 등을 축소할 수 있으나, 유효기간 연장은 불가능합니다." },
    { id: 30, topic: "대금결제", question: "T/T(전신환) 송금방식의 특징으로 옳은 것은?", options: ["은행의 지급보증 있음", "신속한 송금 가능", "서류와 상환 방식", "분쟁 시 은행 조정"], answer: 1, explanation: "T/T 송금은 신속하게 대금을 송금할 수 있으나, 은행의 지급보증이 없는 단순송금방식입니다." },

    // 무역보험 (10문제)
    { id: 31, topic: "무역보험", question: "해상적하보험에서 ICC(A) 조건의 담보범위는?", options: ["열거위험만 담보", "특정위험 제외 전위험", "전쟁위험 포함", "파업위험 포함"], answer: 1, explanation: "ICC(A)는 면책위험을 제외한 전위험(All Risks)을 담보하는 가장 넓은 범위의 보험조건입니다." },
    { id: 32, topic: "무역보험", question: "해상보험에서 공동해손(General Average)이란?", options: ["화물 전손", "선박만의 손해", "선박과 화물 공동 위험 회피 비용", "보험자 부담 비용"], answer: 2, explanation: "공동해손은 선박과 화물의 공동위험을 회피하기 위해 발생한 비용을 이해관계자가 공동 부담하는 것입니다." },
    { id: 33, topic: "무역보험", question: "적하보험 청구권의 소멸시효는?", options: ["1년", "2년", "3년", "5년"], answer: 1, explanation: "해상보험에서 보험금 청구권의 소멸시효는 2년입니다." },
    { id: 34, topic: "무역보험", question: "해상보험에서 담보위험이 아닌 것은?", options: ["침몰", "좌초", "화재", "고유하자"], answer: 3, explanation: "고유하자(화물 자체의 결함으로 인한 손해)는 해상보험에서 담보하지 않는 면책위험입니다." },
    { id: 35, topic: "무역보험", question: "무역보험공사의 수출보험 상품이 아닌 것은?", options: ["단기수출보험", "중장기수출보험", "수입보험", "환변동보험"], answer: 2, explanation: "무역보험공사는 수출 관련 보험(단기/중장기수출보험, 환변동보험 등)을 제공하며, 수입보험은 없습니다." },
    { id: 36, topic: "무역보험", question: "해상보험에서 분손부담보(FPA) 조건의 의미는?", options: ["전손만 보상", "분손도 보상", "화재손해만 보상", "침몰손해만 보상"], answer: 0, explanation: "FPA(Free from Particular Average)는 단독해손(분손)을 보상하지 않고 전손만 보상하는 조건입니다." },
    { id: 37, topic: "무역보험", question: "해상보험 가액의 결정에서 CIF 가액에 추가되는 예상이익은?", options: ["5%", "10%", "15%", "20%"], answer: 1, explanation: "해상보험에서 보험가액은 일반적으로 CIF 가액에 10%의 예상이익을 추가하여 산정합니다." },
    { id: 38, topic: "무역보험", question: "Warehouse to Warehouse Clause(창고 간 약관)의 의미는?", options: ["선박에서만 담보", "창고 보관 중만 담보", "출발창고에서 도착창고까지 담보", "내륙운송 제외"], answer: 2, explanation: "창고 간 약관은 물품이 출발지 창고를 떠나 도착지 창고에 도달할 때까지 전 구간을 담보합니다." },
    { id: 39, topic: "무역보험", question: "해상보험에서 피보험이익(Insurable Interest)이 없는 경우 보험계약은?", options: ["유효", "무효", "취소 가능", "조건부 유효"], answer: 1, explanation: "피보험이익이 없는 보험계약은 도박계약으로 간주되어 무효입니다." },
    { id: 40, topic: "무역보험", question: "무역보험공사의 환변동보험이 담보하는 위험은?", options: ["신용위험", "비상위험", "환율변동위험", "운송위험"], answer: 2, explanation: "환변동보험은 수출 대금 회수 시 환율 변동으로 인한 손실을 보상하는 보험입니다." },

    // 클레임 및 중재 (10문제)
    { id: 41, topic: "클레임·중재", question: "무역 클레임의 발생 원인이 아닌 것은?", options: ["품질 불량", "수량 부족", "선적 지연", "환율 변동"], answer: 3, explanation: "환율 변동은 계약 조건 불이행이 아니므로 일반적으로 클레임의 원인이 되지 않습니다." },
    { id: 42, topic: "클레임·중재", question: "무역 분쟁에서 중재(Arbitration)의 장점이 아닌 것은?", options: ["신속한 해결", "전문성", "비공개성", "항소 가능"], answer: 3, explanation: "중재판정은 최종적이고 구속력이 있어 원칙적으로 항소가 불가능합니다. 이는 장점이자 단점이 될 수 있습니다." },
    { id: 43, topic: "클레임·중재", question: "대한상사중재원의 영문 약칭은?", options: ["KITA", "KOTRA", "KCAB", "KCA"], answer: 2, explanation: "대한상사중재원의 영문명은 Korean Commercial Arbitration Board, 약칭 KCAB입니다." },
    { id: 44, topic: "클레임·중재", question: "뉴욕협약(1958)의 주요 내용은?", options: ["무역계약 표준화", "외국중재판정 승인 및 집행", "관세 감면", "운송 표준화"], answer: 1, explanation: "뉴욕협약은 외국중재판정의 승인 및 집행에 관한 협약으로, 국제 중재의 기초가 됩니다." },
    { id: 45, topic: "클레임·중재", question: "클레임 제기 시 제출해야 할 서류가 아닌 것은?", options: ["계약서 사본", "손해 증빙 자료", "검사 보고서", "수입국 시장조사 자료"], answer: 3, explanation: "클레임 제기 시에는 계약서, 손해 증빙자료, 검사보고서 등이 필요하며, 시장조사 자료는 불필요합니다." },
    { id: 46, topic: "클레임·중재", question: "ICC 중재규칙에 따른 중재의 특징은?", options: ["국내 분쟁만 해결", "중재인 1명만 가능", "다국적 기업 분쟁에 적합", "비용이 가장 저렴"], answer: 2, explanation: "ICC 중재는 국제상업회의소 중재로, 대규모 국제거래 및 다국적 기업 간 분쟁에 적합합니다." },
    { id: 47, topic: "클레임·중재", question: "품질 클레임 시 품질 검정 기준 시점은?", options: ["선적 시 품질", "계약 시 품질", "도착 시 품질", "계약서에 명시된 기준"], answer: 3, explanation: "품질 검정 기준은 계약서에 명시된 조건(선적품질조건, 양륙품질조건 등)에 따릅니다." },
    { id: 48, topic: "클레임·중재", question: "손해배상의 범위에 포함되지 않는 것은?", options: ["직접손해", "간접손해", "기대이익 상실", "징벌적 손해배상(일반적으로)"], answer: 3, explanation: "국제무역에서 징벌적 손해배상은 일반적으로 인정되지 않으며, 실제 발생한 손해만 배상합니다." },
    { id: 49, topic: "클레임·중재", question: "중재조항(Arbitration Clause)에 포함되어야 할 필수 사항이 아닌 것은?", options: ["중재기관", "중재지", "준거법", "증인 출석 의무"], answer: 3, explanation: "중재조항에는 중재기관, 중재지, 준거법, 중재인 수, 중재언어 등이 포함되며, 증인 출석 의무는 필수가 아닙니다." },
    { id: 50, topic: "클레임·중재", question: "INCOTERMS 분쟁 시 해석 기준이 되는 것은?", options: ["수출국 법률", "수입국 법률", "ICC INCOTERMS 규칙", "UN 협약만"], answer: 2, explanation: "INCOTERMS 분쟁 시에는 ICC가 발행한 INCOTERMS 규칙이 해석의 기준이 됩니다." },
  ];

  const topics = ["전체", "무역계약", "Incoterms", "대금결제", "무역보험", "클레임·중재"];

  const filteredQuestions = currentTopic && currentTopic !== "전체"
    ? questions.filter(q => q.topic === currentTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-practice-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-practice-progress', JSON.stringify({
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
    localStorage.removeItem('trade-practice-progress');
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
            <span className="text-indigo-600 font-medium">무역실무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">📋 무역실무</h1>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`국제무역사 시험 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-center font-medium">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`국제무역사 시험 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-center font-medium">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`국제무역사 시험 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-center font-medium">Gemini에게 질문하기</a>
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
