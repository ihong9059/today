'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 보관의 기초 (1-10)
  {
    id: 1,
    question: "보관의 기능 중 '시간적 효용' 창출이란?",
    options: ["장소 이동", "필요한 시간까지 저장", "포장 변경", "품질 향상"],
    answer: 1,
    explanation: "시간적 효용은 상품을 필요한 시점까지 저장하여 수급을 조절하는 것입니다."
  },
  {
    id: 2,
    question: "창고의 종류 중 '자가창고'의 특징은?",
    options: ["임대 운영", "기업이 직접 소유·운영", "공공 소유", "임시 사용"],
    answer: 1,
    explanation: "자가창고는 기업이 직접 소유하고 운영하는 창고입니다."
  },
  {
    id: 3,
    question: "영업창고의 장점이 아닌 것은?",
    options: ["초기 투자비용 절감", "수요 변동 대응 유연", "완전한 통제권", "전문 서비스 이용"],
    answer: 2,
    explanation: "영업창고는 외부 업체 운영으로 완전한 통제권 확보가 어렵습니다."
  },
  {
    id: 4,
    question: "창고관리시스템(WMS)의 기능이 아닌 것은?",
    options: ["입출고 관리", "재고 관리", "차량 운행 관리", "로케이션 관리"],
    answer: 2,
    explanation: "WMS는 입출고, 재고, 로케이션 관리 등을 수행하며, 차량 운행은 TMS 기능입니다."
  },
  {
    id: 5,
    question: "냉동창고의 보관 온도 범위로 적절한 것은?",
    options: ["0~10°C", "-18°C 이하", "10~20°C", "상온"],
    answer: 1,
    explanation: "냉동창고는 일반적으로 -18°C 이하의 온도를 유지합니다."
  },
  {
    id: 6,
    question: "보관 효율화를 위한 'ABC 분석'의 기준은?",
    options: ["알파벳 순서", "출고 빈도 또는 금액", "크기 순서", "무게 순서"],
    answer: 1,
    explanation: "ABC 분석은 출고 빈도나 금액 기준으로 품목을 A, B, C 등급으로 분류합니다."
  },
  {
    id: 7,
    question: "로케이션 관리의 목적은?",
    options: ["재고 증가", "보관 위치 파악 및 효율화", "비용 증가", "인력 증가"],
    answer: 1,
    explanation: "로케이션 관리는 화물의 보관 위치를 체계적으로 관리하여 효율을 높입니다."
  },
  {
    id: 8,
    question: "고정 로케이션 방식의 특징은?",
    options: ["품목별 지정 위치 없음", "품목별 지정 위치 고정", "무작위 배치", "매일 변경"],
    answer: 1,
    explanation: "고정 로케이션은 각 품목의 보관 위치를 고정하는 방식입니다."
  },
  {
    id: 9,
    question: "프리 로케이션 방식의 장점은?",
    options: ["위치 기억 용이", "공간 활용률 높음", "피킹 속도 빠름", "관리 단순"],
    answer: 1,
    explanation: "프리 로케이션은 빈 공간에 자유롭게 배치하여 공간 활용률이 높습니다."
  },
  {
    id: 10,
    question: "창고 레이아웃 설계 시 고려사항이 아닌 것은?",
    options: ["입출고 동선", "화물 특성", "직원 출퇴근 거리", "작업 효율"],
    answer: 2,
    explanation: "창고 레이아웃은 입출고 동선, 화물 특성, 작업 효율 등을 고려합니다."
  },
  // 하역의 기초 (11-20)
  {
    id: 11,
    question: "하역의 정의로 적절한 것은?",
    options: ["운송 활동", "화물의 적재·양하·이동 작업", "포장 작업", "재고 관리"],
    answer: 1,
    explanation: "하역은 화물을 싣고, 내리고, 이동시키는 작업입니다."
  },
  {
    id: 12,
    question: "하역작업의 원칙인 '하역 최소화'의 의미는?",
    options: ["하역 횟수 증가", "하역 횟수 감소", "하역 비용 증가", "하역 시간 증가"],
    answer: 1,
    explanation: "하역 최소화는 불필요한 하역 횟수를 줄여 효율을 높이는 것입니다."
  },
  {
    id: 13,
    question: "유닛로드시스템의 장점이 아닌 것은?",
    options: ["하역 효율화", "화물 손상 감소", "개별 화물 취급 용이", "운송 효율화"],
    answer: 2,
    explanation: "유닛로드시스템은 화물을 단위화하여 개별 취급이 아닌 일괄 처리합니다."
  },
  {
    id: 14,
    question: "파렛트의 장점이 아닌 것은?",
    options: ["하역 기계화", "적재 효율 향상", "보관 공간 증가", "운반 효율화"],
    answer: 2,
    explanation: "파렛트 사용은 하역 기계화와 효율 향상이 장점이며, 공간 효율도 개선됩니다."
  },
  {
    id: 15,
    question: "표준 파렛트의 크기는?",
    options: ["1000×1000mm", "1100×1100mm", "1200×1200mm", "800×800mm"],
    answer: 1,
    explanation: "한국 표준 파렛트 크기는 1100×1100mm입니다."
  },
  {
    id: 16,
    question: "지게차(Forklift)의 용도는?",
    options: ["장거리 운송", "파렛트 화물 적재·이동", "포장 작업", "검품 작업"],
    answer: 1,
    explanation: "지게차는 파렛트화된 화물을 적재하고 이동시키는 하역 기계입니다."
  },
  {
    id: 17,
    question: "컨베이어의 장점이 아닌 것은?",
    options: ["연속 운반 가능", "자동화 용이", "유연한 경로 변경", "대량 처리 가능"],
    answer: 2,
    explanation: "컨베이어는 고정된 경로로 운반하므로 경로 변경이 유연하지 않습니다."
  },
  {
    id: 18,
    question: "AS/RS(자동창고시스템)의 특징이 아닌 것은?",
    options: ["고층 랙 사용", "자동 입출고", "인력 의존도 높음", "공간 활용 극대화"],
    answer: 2,
    explanation: "AS/RS는 자동화 시스템으로 인력 의존도가 낮습니다."
  },
  {
    id: 19,
    question: "하역작업 안전을 위한 조치가 아닌 것은?",
    options: ["안전모 착용", "하중 초과 적재", "안전 교육", "작업 구역 표시"],
    answer: 1,
    explanation: "하중 초과 적재는 안전사고 위험을 높이므로 금지됩니다."
  },
  {
    id: 20,
    question: "크레인의 종류가 아닌 것은?",
    options: ["천장 크레인", "갠트리 크레인", "지게차 크레인", "타워 크레인"],
    answer: 2,
    explanation: "크레인의 종류로는 천장, 갠트리, 타워, 컨테이너 크레인 등이 있습니다."
  },
  // 포장 (21-30)
  {
    id: 21,
    question: "포장의 기본 기능이 아닌 것은?",
    options: ["보호 기능", "취급 편의 기능", "가격 결정 기능", "정보 전달 기능"],
    answer: 2,
    explanation: "포장의 기본 기능은 보호, 취급 편의, 정보 전달입니다."
  },
  {
    id: 22,
    question: "개장(낱포장)의 목적은?",
    options: ["대량 운송", "소비자 판매 단위 포장", "장기 보관", "팔레트화"],
    answer: 1,
    explanation: "개장은 소비자에게 판매하기 위한 최소 단위 포장입니다."
  },
  {
    id: 23,
    question: "내장(속포장)의 기능은?",
    options: ["외부 충격 방지", "내용물 직접 보호", "운반 편의", "광고 효과"],
    answer: 1,
    explanation: "내장은 내용물을 직접 감싸 보호하는 포장입니다."
  },
  {
    id: 24,
    question: "외장(겉포장)의 목적은?",
    options: ["소비자 판매", "수송·보관 시 보호", "진열 용도", "개봉 용이"],
    answer: 1,
    explanation: "외장은 수송과 보관 시 화물을 보호하기 위한 포장입니다."
  },
  {
    id: 25,
    question: "포장 재료 중 골판지의 장점이 아닌 것은?",
    options: ["경량", "가격 저렴", "방수성 우수", "충격 흡수"],
    answer: 2,
    explanation: "골판지는 경량, 저렴, 충격 흡수 장점이 있으나 방수성은 취약합니다."
  },
  {
    id: 26,
    question: "포장 표준화의 효과가 아닌 것은?",
    options: ["물류 효율화", "비용 절감", "다양성 증가", "호환성 향상"],
    answer: 2,
    explanation: "포장 표준화는 규격 통일로 물류 효율화와 비용 절감을 가져옵니다."
  },
  {
    id: 27,
    question: "위험물 포장 시 필수 표시 사항은?",
    options: ["제조사 연락처", "위험물 표시 라벨", "가격", "원산지만"],
    answer: 1,
    explanation: "위험물은 위험물 표시 라벨과 취급 주의사항을 필수 표시해야 합니다."
  },
  {
    id: 28,
    question: "친환경 포장의 특징이 아닌 것은?",
    options: ["재활용 가능", "과대 포장", "생분해성 소재", "포장재 감량"],
    answer: 1,
    explanation: "친환경 포장은 과대 포장을 지양하고 재활용, 생분해성 소재를 사용합니다."
  },
  {
    id: 29,
    question: "수출 포장 시 고려사항이 아닌 것은?",
    options: ["운송 거리", "기후 조건", "국내 판매 가격", "취급 환경"],
    answer: 2,
    explanation: "수출 포장은 운송 거리, 기후, 취급 환경 등을 고려합니다."
  },
  {
    id: 30,
    question: "포장 기호 중 '깨지기 쉬움'을 나타내는 것은?",
    options: ["화살표", "유리잔 그림", "우산 그림", "태양 그림"],
    answer: 1,
    explanation: "깨지기 쉬운 화물은 유리잔 그림으로 표시합니다."
  },
  // 재고관리 (31-40)
  {
    id: 31,
    question: "재고관리의 목적이 아닌 것은?",
    options: ["고객 서비스 유지", "재고비용 최소화", "재고 극대화", "공급 안정성"],
    answer: 2,
    explanation: "재고관리는 적정 재고를 유지하며 재고 비용을 최소화합니다."
  },
  {
    id: 32,
    question: "재고유지비용에 포함되지 않는 것은?",
    options: ["보관비", "보험료", "발주비", "자본비용"],
    answer: 2,
    explanation: "발주비는 주문 시 발생하는 비용으로 재고유지비와 별개입니다."
  },
  {
    id: 33,
    question: "경제적 주문량(EOQ)의 목적은?",
    options: ["최대 주문", "주문비용과 재고유지비의 최소화", "재고 극대화", "배송 속도 향상"],
    answer: 1,
    explanation: "EOQ는 주문비용과 재고유지비의 합을 최소화하는 주문량입니다."
  },
  {
    id: 34,
    question: "안전재고의 목적은?",
    options: ["과잉 재고 유지", "수요 불확실성 대응", "비용 증가", "재고 회전율 저하"],
    answer: 1,
    explanation: "안전재고는 수요 변동이나 공급 불확실성에 대비하기 위한 재고입니다."
  },
  {
    id: 35,
    question: "정기 발주 방식의 특징은?",
    options: ["수량 고정, 주기 변동", "주기 고정, 수량 변동", "수량과 주기 모두 고정", "무작위 발주"],
    answer: 1,
    explanation: "정기 발주는 일정 주기로 발주하며, 발주량은 재고 상황에 따라 변동합니다."
  },
  {
    id: 36,
    question: "정량 발주 방식의 특징은?",
    options: ["발주 주기 고정", "재고가 재주문점 도달 시 발주", "수량 변동", "매일 발주"],
    answer: 1,
    explanation: "정량 발주는 재고가 재주문점에 도달하면 일정량을 발주하는 방식입니다."
  },
  {
    id: 37,
    question: "재고회전율의 의미는?",
    options: ["재고 보관 기간", "일정 기간 재고 교체 횟수", "재고 증가율", "재고 비용"],
    answer: 1,
    explanation: "재고회전율은 일정 기간 동안 재고가 몇 번 회전했는지를 나타냅니다."
  },
  {
    id: 38,
    question: "선입선출(FIFO)의 장점은?",
    options: ["재고 노후화 방지", "보관 비용 증가", "관리 복잡", "재고 증가"],
    answer: 0,
    explanation: "FIFO는 먼저 입고된 것을 먼저 출고하여 재고 노후화를 방지합니다."
  },
  {
    id: 39,
    question: "적시 재고(JIT)의 원칙은?",
    options: ["대량 재고 보유", "필요 시점에 필요량만 확보", "안전재고 극대화", "장기 보관"],
    answer: 1,
    explanation: "JIT는 필요한 시점에 필요한 양만 확보하여 재고를 최소화합니다."
  },
  {
    id: 40,
    question: "재고 실사의 목적은?",
    options: ["장부 재고만 관리", "실물과 장부 재고 일치 확인", "재고 증가", "비용 증가"],
    answer: 1,
    explanation: "재고 실사는 실제 재고와 장부 재고의 일치 여부를 확인하는 작업입니다."
  },
  // 물류센터 운영 (41-50)
  {
    id: 41,
    question: "물류센터의 유형 중 TC(Transfer Center)의 특징은?",
    options: ["장기 보관 중심", "통과형, 크로스도킹", "생산 기능 포함", "소매 판매"],
    answer: 1,
    explanation: "TC는 화물이 통과하는 형태로 크로스도킹을 주로 수행합니다."
  },
  {
    id: 42,
    question: "DC(Distribution Center)의 주요 기능은?",
    options: ["생산", "보관 및 배송", "제조", "연구개발"],
    answer: 1,
    explanation: "DC는 화물을 보관하고 배송하는 물류센터입니다."
  },
  {
    id: 43,
    question: "피킹(Picking) 작업의 의미는?",
    options: ["화물 입고", "주문에 따른 상품 선별", "포장", "운송"],
    answer: 1,
    explanation: "피킹은 주문에 따라 보관 중인 상품을 선별하는 작업입니다."
  },
  {
    id: 44,
    question: "존 피킹(Zone Picking)의 특징은?",
    options: ["한 작업자가 전체 구역 담당", "구역별 분담 작업", "자동화 불가", "소량 주문에 비효율"],
    answer: 1,
    explanation: "존 피킹은 창고를 구역으로 나누어 작업자가 분담하는 방식입니다."
  },
  {
    id: 45,
    question: "DPS(Digital Picking System)의 장점은?",
    options: ["수작업 증가", "피킹 정확도 향상", "비용 증가만", "속도 저하"],
    answer: 1,
    explanation: "DPS는 디지털 표시기를 이용해 피킹 정확도와 속도를 높입니다."
  },
  {
    id: 46,
    question: "물류센터 자동화 장비가 아닌 것은?",
    options: ["소터(Sorter)", "자동 라벨러", "수동 대차", "컨베이어"],
    answer: 2,
    explanation: "수동 대차는 자동화 장비가 아닌 수동 운반 도구입니다."
  },
  {
    id: 47,
    question: "물류센터 입지 선정 시 고려요소가 아닌 것은?",
    options: ["교통 접근성", "인력 확보", "건물 색상", "토지 비용"],
    answer: 2,
    explanation: "물류센터 입지는 교통, 인력, 비용, 고객 근접성 등을 고려합니다."
  },
  {
    id: 48,
    question: "크로스도킹의 장점이 아닌 것은?",
    options: ["보관비 절감", "리드타임 단축", "재고 증가", "배송 속도 향상"],
    answer: 2,
    explanation: "크로스도킹은 보관 없이 바로 출고하여 재고를 줄입니다."
  },
  {
    id: 49,
    question: "물류센터 KPI로 적절하지 않은 것은?",
    options: ["주문 처리 정확도", "피킹 생산성", "직원 만족도", "공간 활용률"],
    answer: 2,
    explanation: "물류센터 KPI는 주문 정확도, 피킹 생산성, 공간 활용률 등입니다."
  },
  {
    id: 50,
    question: "물류센터 안전 관리 항목이 아닌 것은?",
    options: ["소화 설비 점검", "비상구 확보", "마케팅 계획", "안전 교육"],
    answer: 2,
    explanation: "물류센터 안전 관리는 소화 설비, 비상구, 안전 교육 등을 포함합니다."
  }
];

export default function WarehouseTransportPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('logistics-manager-warehouse-answers');
    if (saved) setSelectedAnswers(JSON.parse(saved));
    const savedResults = localStorage.getItem('logistics-manager-warehouse-results');
    if (savedResults) setShowResults(JSON.parse(savedResults));
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('logistics-manager-warehouse-answers', JSON.stringify(newAnswers));
    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('logistics-manager-warehouse-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `물류관리사 보관하역론 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('logistics-manager-warehouse-answers');
      localStorage.removeItem('logistics-manager-warehouse-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "보관의 기초", range: [1, 10] },
    { name: "하역의 기초", range: [11, 20] },
    { name: "포장", range: [21, 30] },
    { name: "재고관리", range: [31, 40] },
    { name: "물류센터 운영", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/trade/logistics-manager" className="text-indigo-200 hover:text-white transition">← 물류관리사</Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">🏭 보관하역론</h1>
          <p className="text-indigo-100">물류관리사 4과목 핵심 문제</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-red-500 hover:text-red-700 transition">초기화</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }} />
            </div>
            <span className="text-lg font-semibold text-gray-700">{Object.keys(selectedAnswers).length}/{questions.length}</span>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            정답률: {Object.keys(selectedAnswers).length > 0 ? Math.round((getCorrectCount() / Object.keys(selectedAnswers).length) * 100) : 0}% ({getCorrectCount()}/{Object.keys(selectedAnswers).length})
          </div>
        </div>

        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">{topicIndex + 1}</span>
              {topic.name}
            </h3>
            <div className="space-y-3">
              {questions.filter(q => q.id >= topic.range[0] && q.id <= topic.range[1]).map((question) => (
                <div key={question.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button onClick={() => toggleQuestion(question.id)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${showResults[question.id] ? selectedAnswers[question.id] === question.answer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{question.id}</span>
                      <span className="font-medium text-gray-800">{question.question}</span>
                    </div>
                    <span className={`transform transition-transform ${expandedQuestions[question.id] ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedQuestions[question.id] && (
                    <div className="px-6 pb-4 border-t">
                      <div className="mt-4 space-y-2">
                        {question.options.map((option, idx) => (
                          <button key={idx} onClick={() => handleAnswerSelect(question.id, idx)} className={`w-full p-3 rounded-lg text-left transition flex items-center gap-3 ${showResults[question.id] ? idx === question.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswers[question.id] === idx ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : selectedAnswers[question.id] === idx ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50 hover:bg-gray-100'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${showResults[question.id] ? idx === question.answer ? 'bg-green-500 text-white' : selectedAnswers[question.id] === idx ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600' : selectedAnswers[question.id] === idx ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>{idx + 1}</span>
                            {option}
                          </button>
                        ))}
                      </div>
                      {showResults[question.id] && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800"><strong>해설:</strong> {question.explanation}</p>
                          <button onClick={() => openAIModal(question)} className="mt-3 text-sm bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition">🤖 AI에게 질문하기</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 text-center">
          <Link href="/category/trade/logistics-manager" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg">← 물류관리사 메인으로</Link>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                  <div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-500">Anthropic의 AI</div></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-500">OpenAI의 AI</div></div>
                </a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-500">Google의 AI</div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
