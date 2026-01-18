'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TradeLogisticsPage() {
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
    // 해상운송 (10문제)
    { id: 1, topic: "해상운송", question: "정기선(Liner)의 특징이 아닌 것은?", options: ["정해진 항로 운항", "정기 운항 스케줄", "운임률표 적용", "화물량에 따른 용선"], answer: 3, explanation: "정기선은 정해진 항로와 스케줄에 따라 운항하며, 운임률표를 적용합니다. 용선은 부정기선의 특징입니다." },
    { id: 2, topic: "해상운송", question: "선하증권(B/L)의 기능이 아닌 것은?", options: ["화물 수령증", "운송계약 증거", "유가증권", "보험계약 증거"], answer: 3, explanation: "선하증권은 화물 수령증, 운송계약의 증거, 유가증권(권리증권)의 기능을 하지만, 보험계약과는 무관합니다." },
    { id: 3, topic: "해상운송", question: "컨테이너 운송에서 FCL의 의미는?", options: ["컨테이너 부분 적재", "컨테이너 만재", "컨테이너 혼적", "컨테이너 분할"], answer: 1, explanation: "FCL(Full Container Load)은 한 송하인의 화물로 컨테이너를 만재하는 것입니다." },
    { id: 4, topic: "해상운송", question: "LCL 화물의 특징은?", options: ["단일 송하인 화물", "여러 송하인 화물 혼적", "위험물 전용", "냉동 화물 전용"], answer: 1, explanation: "LCL(Less than Container Load)은 컨테이너를 채우지 못하는 소량 화물로, 여러 송하인 화물을 혼적합니다." },
    { id: 5, topic: "해상운송", question: "CY(Container Yard)의 기능은?", options: ["컨테이너 수리", "FCL 컨테이너 장치", "LCL 화물 작업", "빈 컨테이너만 보관"], answer: 1, explanation: "CY는 FCL 컨테이너를 장치(보관)하고 인수도하는 장소입니다." },
    { id: 6, topic: "해상운송", question: "CFS(Container Freight Station)의 기능은?", options: ["FCL 작업장", "LCL 화물 집화·분류", "선박 수리", "통관 업무"], answer: 1, explanation: "CFS는 LCL 화물을 집화, 분류, 컨테이너에 적입·적출하는 작업장입니다." },
    { id: 7, topic: "해상운송", question: "정기용선(Time Charter)의 특징은?", options: ["항차 단위 계약", "기간 단위 계약", "화물 단위 계약", "선박 매매 계약"], answer: 1, explanation: "정기용선은 일정 기간 동안 선박을 임차하는 기간 단위 계약입니다." },
    { id: 8, topic: "해상운송", question: "해상운임 산정 시 Freight Ton의 기준은?", options: ["총중량만", "용적만", "중량 또는 용적 중 큰 것", "가격"], answer: 2, explanation: "Freight Ton은 중량톤(W/T)과 용적톤(M/T) 중 운임 수입이 큰 것을 기준으로 합니다." },
    { id: 9, topic: "해상운송", question: "Demurrage(체선료)가 발생하는 경우는?", options: ["조기 하역 완료", "정박 기간 내 하역", "정박 기간 초과", "선박 수리"], answer: 2, explanation: "Demurrage는 약정된 정박 기간(Laytime)을 초과한 경우 지불하는 체선료입니다." },
    { id: 10, topic: "해상운송", question: "Despatch Money의 의미는?", options: ["체선료", "조출료", "정박료", "하역료"], answer: 1, explanation: "Despatch Money(조출료)는 약정 정박 기간보다 빨리 하역을 완료한 경우 받는 보상금입니다." },

    // 항공운송 (10문제)
    { id: 11, topic: "항공운송", question: "항공화물운송장(AWB)의 특징으로 옳지 않은 것은?", options: ["비유통증권", "기명식 증권", "유가증권", "수하인 지정"], answer: 2, explanation: "AWB는 유가증권이 아니며, 비유통증권(양도 불가)입니다. 수하인을 지정하는 기명식 증권입니다." },
    { id: 12, topic: "항공운송", question: "IATA의 역할은?", options: ["해상운송 규제", "항공운송 국제기구", "육상운송 협회", "보험 기구"], answer: 1, explanation: "IATA(국제항공운송협회)는 항공운송 관련 국제기구로, 운임, 규정 등을 조정합니다." },
    { id: 13, topic: "항공운송", question: "항공운송의 장점이 아닌 것은?", options: ["신속성", "정시성", "저렴한 운임", "안전성"], answer: 2, explanation: "항공운송은 신속성, 정시성, 안전성이 장점이나, 운임은 해상운송보다 높습니다." },
    { id: 14, topic: "항공운송", question: "항공화물 운임 산정 시 Chargeable Weight의 결정 기준은?", options: ["실중량만", "용적중량만", "실중량과 용적중량 중 큰 것", "운송 거리"], answer: 2, explanation: "Chargeable Weight는 실제 중량(Gross Weight)과 용적중량 중 큰 것을 적용합니다." },
    { id: 15, topic: "항공운송", question: "항공화물 용적중량 산정 공식은?", options: ["가로×세로×높이÷5000", "가로×세로×높이÷6000", "가로×세로×높이÷1000", "가로×세로×높이÷3000"], answer: 1, explanation: "항공화물 용적중량은 가로(cm)×세로(cm)×높이(cm)÷6000으로 kg 단위로 산정합니다." },
    { id: 16, topic: "항공운송", question: "ULD(Unit Load Device)의 의미는?", options: ["항공기 엔진", "항공 컨테이너/팔레트", "항공권", "항공사 코드"], answer: 1, explanation: "ULD는 항공화물 운송을 위한 컨테이너, 팔레트 등의 단위 탑재 용기입니다." },
    { id: 17, topic: "항공운송", question: "House AWB와 Master AWB의 관계는?", options: ["동일한 서류", "HAWB는 포워더, MAWB는 항공사 발행", "MAWB만 유효", "HAWB만 유효"], answer: 1, explanation: "HAWB는 포워더가 화주에게 발행하고, MAWB는 항공사가 포워더에게 발행합니다." },
    { id: 18, topic: "항공운송", question: "항공운송에서 Consolidation의 의미는?", options: ["화물 분산", "소량 화물 집화", "화물 보관", "화물 검사"], answer: 1, explanation: "Consolidation은 여러 화주의 소량 화물을 모아 하나의 화물로 운송하는 것입니다." },
    { id: 19, topic: "항공운송", question: "항공화물 최저운임(Minimum Charge)의 적용 대상은?", options: ["대량 화물", "소량 화물", "위험물", "귀중품"], answer: 1, explanation: "최저운임은 화물 중량이 매우 적어 정상 운임이 최저운임 이하인 경우 적용됩니다." },
    { id: 20, topic: "항공운송", question: "항공 운송 시 위험물 규정을 관장하는 기구는?", options: ["IATA", "IMO", "ICAO", "WCO"], answer: 2, explanation: "ICAO(국제민간항공기구)가 위험물 운송 규정(DGR)의 기본 기준을 정하고, IATA가 세부 시행규정을 운영합니다." },

    // 복합운송 (10문제)
    { id: 21, topic: "복합운송", question: "복합운송의 정의로 옳은 것은?", options: ["단일 운송수단 사용", "2개 이상 다른 운송수단 결합", "해상운송만", "항공운송만"], answer: 1, explanation: "복합운송은 2개 이상의 다른 운송수단(해상, 항공, 육상 등)을 결합하여 운송하는 것입니다." },
    { id: 22, topic: "복합운송", question: "복합운송증권(MTD)의 발행자는?", options: ["선박회사만", "항공사만", "복합운송인", "세관"], answer: 2, explanation: "복합운송증권(MTD/Multimodal Transport Document)은 복합운송인(MTO)이 발행합니다." },
    { id: 23, topic: "복합운송", question: "복합운송인(MTO)의 책임 구간은?", options: ["해상 구간만", "항공 구간만", "전 운송 구간", "육상 구간만"], answer: 2, explanation: "복합운송인은 화물을 인수한 시점부터 인도할 때까지 전 운송 구간에 대해 책임을 집니다." },
    { id: 24, topic: "복합운송", question: "Land Bridge 운송의 예는?", options: ["해상-해상 연결", "대륙 육상 통과 운송", "항공 전용 운송", "국내 운송만"], answer: 1, explanation: "Land Bridge는 해상운송 중 대륙의 육상운송을 거쳐 다시 해상운송하는 방식입니다." },
    { id: 25, topic: "복합운송", question: "Mini Land Bridge(MLB)의 특징은?", options: ["전 구간 해상운송", "아시아-북미 서안까지만 해상운송", "아시아-미국 내륙/동안까지 복합운송", "항공-해상 결합"], answer: 2, explanation: "MLB는 아시아에서 미국 서안까지 해상운송 후 철도로 내륙/동안까지 운송하는 방식입니다." },
    { id: 26, topic: "복합운송", question: "복합운송의 장점이 아닌 것은?", options: ["Door to Door 서비스", "운송비 절감", "단일 책임 체계", "모든 화물에 적합"], answer: 3, explanation: "복합운송은 표준화된 화물에 효율적이며, 모든 종류의 화물에 적합한 것은 아닙니다." },
    { id: 27, topic: "복합운송", question: "NVOCC(Non-Vessel Operating Common Carrier)의 역할은?", options: ["선박 운항", "선박 없이 운송 서비스 제공", "선박 건조", "항만 운영"], answer: 1, explanation: "NVOCC는 자체 선박 없이 운송 서비스를 제공하는 무선박 운송인입니다." },
    { id: 28, topic: "복합운송", question: "복합운송인의 책임 체계 중 Network Liability System의 특징은?", options: ["균일한 책임", "손해 발생 구간별 책임", "책임 면제", "무과실 책임"], answer: 1, explanation: "Network System은 손해가 발생한 운송 구간의 법규에 따라 책임을 지는 방식입니다." },
    { id: 29, topic: "복합운송", question: "Uniform Liability System의 특징은?", options: ["구간별 다른 책임", "전 구간 동일 책임", "책임 면제", "과실 여부 무관"], answer: 1, explanation: "Uniform System은 손해 발생 구간과 관계없이 동일한 책임 기준을 적용하는 방식입니다." },
    { id: 30, topic: "복합운송", question: "TCR(Trans-China Railway) 운송의 특징은?", options: ["해상 전용", "중국 대륙 횡단 철도", "항공 전용", "국내 운송만"], answer: 1, explanation: "TCR은 중국 대륙을 횡단하는 철도를 이용한 유라시아 복합운송 루트입니다." },

    // 국제물류 (10문제)
    { id: 31, topic: "국제물류", question: "3PL(Third Party Logistics)의 의미는?", options: ["1자 물류", "2자 물류", "제3자 물류", "4자 물류"], answer: 2, explanation: "3PL은 화주 기업이 물류 업무를 전문 물류업체(제3자)에게 위탁하는 것입니다." },
    { id: 32, topic: "국제물류", question: "4PL(Fourth Party Logistics)의 특징은?", options: ["단순 운송", "창고 운영만", "공급망 전체 관리", "포장 업무만"], answer: 2, explanation: "4PL은 3PL을 포함한 공급망 전체를 통합 관리하고 최적화하는 물류 서비스입니다." },
    { id: 33, topic: "국제물류", question: "SCM(Supply Chain Management)의 목적이 아닌 것은?", options: ["비용 절감", "효율성 향상", "재고 증가", "고객 서비스 향상"], answer: 2, explanation: "SCM은 공급망 전체의 효율성 향상, 비용 절감, 재고 최소화, 고객 서비스 향상을 목적으로 합니다." },
    { id: 34, topic: "국제물류", question: "JIT(Just In Time)의 핵심 개념은?", options: ["대량 재고 보유", "필요한 시점에 필요한 양만 공급", "장기 보관", "과잉 생산"], answer: 1, explanation: "JIT는 필요한 때에 필요한 양만큼만 생산·공급하여 재고를 최소화하는 방식입니다." },
    { id: 35, topic: "국제물류", question: "Cross Docking의 특징은?", options: ["장기 보관 후 출고", "입고 후 즉시 출고", "재고 축적", "가공 후 출고"], answer: 1, explanation: "Cross Docking은 입고된 화물을 보관하지 않고 바로 분류·출고하는 물류 방식입니다." },
    { id: 36, topic: "국제물류", question: "보세창고의 기능이 아닌 것은?", options: ["수입화물 장치", "관세 납부 유예", "국내 화물만 보관", "가공·제조 가능(보세공장)"], answer: 2, explanation: "보세창고는 외국 화물을 관세 납부 없이 보관하는 곳으로, 국내 화물 보관이 주 기능은 아닙니다." },
    { id: 37, topic: "국제물류", question: "FTZ(Free Trade Zone)의 특징은?", options: ["높은 관세 부과", "관세 면제 또는 유예", "수출 금지", "수입 제한"], answer: 1, explanation: "FTZ(자유무역지역)에서는 관세 면제 또는 유예 혜택을 받아 무역 활동을 촉진합니다." },
    { id: 38, topic: "국제물류", question: "Milk Run 방식의 특징은?", options: ["직송 방식", "순회 집화 방식", "항공 운송만", "해상 운송만"], answer: 1, explanation: "Milk Run은 한 대의 차량이 여러 공급업체를 순회하며 화물을 집화하는 방식입니다." },
    { id: 39, topic: "국제물류", question: "Hub & Spoke 시스템의 구조는?", options: ["직접 연결", "중심 거점과 지선 연결", "단일 경로", "무작위 연결"], answer: 1, explanation: "Hub & Spoke는 중심 거점(Hub)에서 각 지점(Spoke)으로 연결되는 네트워크 구조입니다." },
    { id: 40, topic: "국제물류", question: "VMI(Vendor Managed Inventory)의 의미는?", options: ["구매자 재고 관리", "공급자 재고 관리", "제3자 재고 관리", "무재고 방식"], answer: 1, explanation: "VMI는 공급업체가 고객의 재고를 관리하고 보충하는 방식입니다." },

    // 물류관리 (10문제)
    { id: 41, topic: "물류관리", question: "물류비 구성요소가 아닌 것은?", options: ["운송비", "보관비", "하역비", "매출원가"], answer: 3, explanation: "물류비는 운송비, 보관비, 하역비, 포장비, 정보처리비 등으로 구성되며, 매출원가는 포함되지 않습니다." },
    { id: 42, topic: "물류관리", question: "ABC 분석에서 A그룹의 특성은?", options: ["저가치 다량", "고가치 소량", "중가치 중량", "모든 품목"], answer: 1, explanation: "ABC 분석에서 A그룹은 전체 금액의 대부분을 차지하는 고가치 소량 품목입니다." },
    { id: 43, topic: "물류관리", question: "EOQ(Economic Order Quantity)의 의미는?", options: ["최대 주문량", "경제적 주문량", "최소 주문량", "평균 주문량"], answer: 1, explanation: "EOQ는 주문비용과 재고유지비용의 합을 최소화하는 경제적 주문량입니다." },
    { id: 44, topic: "물류관리", question: "안전재고(Safety Stock)의 목적은?", options: ["재고 최대화", "수요 변동 대비", "보관비 증가", "재고 제거"], answer: 1, explanation: "안전재고는 수요 변동이나 납기 지연 등 불확실성에 대비하여 보유하는 완충 재고입니다." },
    { id: 45, topic: "물류관리", question: "WMS(Warehouse Management System)의 기능이 아닌 것은?", options: ["입출고 관리", "재고 관리", "회계 결산", "로케이션 관리"], answer: 2, explanation: "WMS는 창고의 입출고, 재고, 로케이션 관리 등을 담당하며, 회계 결산은 별도 시스템에서 처리합니다." },
    { id: 46, topic: "물류관리", question: "TMS(Transportation Management System)의 주요 기능은?", options: ["창고 관리", "운송 계획 및 관리", "인사 관리", "생산 관리"], answer: 1, explanation: "TMS는 운송 계획, 배차, 경로 최적화, 운송비 관리 등 운송 관련 업무를 지원합니다." },
    { id: 47, topic: "물류관리", question: "물류 KPI 지표가 아닌 것은?", options: ["배송 정시율", "재고 회전율", "주가 수익률", "물류비 비율"], answer: 2, explanation: "주가 수익률은 재무 지표이며, 물류 KPI에는 배송 정시율, 재고 회전율, 물류비 비율 등이 있습니다." },
    { id: 48, topic: "물류관리", question: "리드타임(Lead Time) 단축의 효과가 아닌 것은?", options: ["재고 감소", "고객 만족 향상", "비용 증가", "경쟁력 강화"], answer: 2, explanation: "리드타임 단축은 재고 감소, 비용 절감, 고객 만족 향상, 경쟁력 강화에 기여합니다." },
    { id: 49, topic: "물류관리", question: "Green Logistics의 목표가 아닌 것은?", options: ["환경 부하 감소", "에너지 효율화", "이산화탄소 배출 최대화", "친환경 포장"], answer: 2, explanation: "Green Logistics는 환경 부하 감소, 에너지 효율화, 탄소 배출 감소를 목표로 합니다." },
    { id: 50, topic: "물류관리", question: "Reverse Logistics의 대상이 아닌 것은?", options: ["반품 처리", "폐기물 회수", "재활용", "신제품 출고"], answer: 3, explanation: "Reverse Logistics(역물류)는 반품, 회수, 재활용, 폐기 등 제품의 역방향 흐름을 관리합니다." },
  ];

  const topics = ["전체", "해상운송", "항공운송", "복합운송", "국제물류", "물류관리"];

  const filteredQuestions = currentTopic && currentTopic !== "전체"
    ? questions.filter(q => q.topic === currentTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-logistics-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-logistics-progress', JSON.stringify({
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
    localStorage.removeItem('trade-logistics-progress');
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
            <span className="text-indigo-600 font-medium">무역물류</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🚢 무역물류</h1>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`국제무역사 무역물류 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-center font-medium">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`국제무역사 무역물류 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-center font-medium">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`국제무역사 무역물류 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-center font-medium">Gemini에게 질문하기</a>
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
