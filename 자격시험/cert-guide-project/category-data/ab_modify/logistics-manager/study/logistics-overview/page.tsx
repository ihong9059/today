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
  // 물류의 기본개념 (1-10)
  {
    id: 1,
    question: "물류(Physical Distribution)의 정의로 가장 적절한 것은?",
    options: ["상품의 생산만을 담당", "원자재부터 완제품까지의 흐름 관리", "판매 활동만 수행", "재무 관리만 담당"],
    answer: 1,
    explanation: "물류는 원자재 조달부터 생산, 보관, 운송, 배송까지의 전체 흐름을 관리합니다."
  },
  {
    id: 2,
    question: "물류의 5대 기능에 해당하지 않는 것은?",
    options: ["운송", "보관", "포장", "생산"],
    answer: 3,
    explanation: "물류 5대 기능은 운송, 보관, 하역, 포장, 정보입니다. 생산은 물류 기능이 아닙니다."
  },
  {
    id: 3,
    question: "물류관리의 궁극적인 목표는?",
    options: ["비용 증가", "서비스 수준 저하", "고객 서비스 향상과 비용 절감", "재고 증가"],
    answer: 2,
    explanation: "물류관리의 목표는 적정 서비스 수준을 유지하면서 총 물류비용을 최소화하는 것입니다."
  },
  {
    id: 4,
    question: "조달물류(Inbound Logistics)에 해당하는 것은?",
    options: ["완제품 배송", "원자재 조달", "고객 반품 처리", "제품 생산"],
    answer: 1,
    explanation: "조달물류는 원자재나 부품을 공급업체로부터 조달하는 물류 활동입니다."
  },
  {
    id: 5,
    question: "물류의 시간적 효용은 무엇을 의미하는가?",
    options: ["필요한 장소에 제공", "필요한 시간에 제공", "필요한 양만큼 제공", "저렴한 가격에 제공"],
    answer: 1,
    explanation: "시간적 효용은 고객이 원하는 시간에 상품을 제공하는 것을 의미합니다."
  },
  {
    id: 6,
    question: "물류의 장소적 효용은 주로 어떤 활동으로 창출되는가?",
    options: ["보관", "운송", "포장", "하역"],
    answer: 1,
    explanation: "장소적 효용은 운송을 통해 상품을 필요한 장소로 이동시켜 창출됩니다."
  },
  {
    id: 7,
    question: "제3자 물류(3PL)의 의미는?",
    options: ["자사 물류", "물류 전문업체에 위탁", "고객 직접 픽업", "생산자 직접 배송"],
    answer: 1,
    explanation: "3PL은 물류 활동을 전문 물류업체에게 아웃소싱하는 것을 의미합니다."
  },
  {
    id: 8,
    question: "녹색물류(Green Logistics)의 목표는?",
    options: ["물류비용 증가", "환경 부하 감소", "운송 속도 저하", "재고 증가"],
    answer: 1,
    explanation: "녹색물류는 물류 활동에서 발생하는 환경오염을 최소화하는 것이 목표입니다."
  },
  {
    id: 9,
    question: "역물류(Reverse Logistics)에 해당하는 것은?",
    options: ["원자재 조달", "제품 생산", "반품/회수 처리", "완제품 배송"],
    answer: 2,
    explanation: "역물류는 반품, 회수, 재활용 등 역방향 물류 흐름을 관리합니다."
  },
  {
    id: 10,
    question: "물류 아웃소싱의 장점이 아닌 것은?",
    options: ["핵심역량 집중", "물류비 절감", "서비스 품질 저하", "유연성 확보"],
    answer: 2,
    explanation: "물류 아웃소싱은 전문업체 활용으로 서비스 품질이 오히려 향상될 수 있습니다."
  },
  // 물류시스템 (11-20)
  {
    id: 11,
    question: "물류시스템의 구성요소에 해당하지 않는 것은?",
    options: ["물적요소", "인적요소", "정보요소", "정치요소"],
    answer: 3,
    explanation: "물류시스템은 물적, 인적, 정보 요소로 구성됩니다."
  },
  {
    id: 12,
    question: "허브 앤 스포크(Hub and Spoke) 시스템의 특징은?",
    options: ["직접 배송", "중앙 집하 후 분산", "무작위 배송", "개별 운송"],
    answer: 1,
    explanation: "허브 앤 스포크는 중앙 허브에 집하 후 각 목적지로 분산하는 시스템입니다."
  },
  {
    id: 13,
    question: "크로스도킹(Cross-Docking)의 특징은?",
    options: ["장기 보관", "보관 없이 바로 배송", "제조 공정", "원자재 조달"],
    answer: 1,
    explanation: "크로스도킹은 입고된 화물을 보관 없이 바로 출고하는 방식입니다."
  },
  {
    id: 14,
    question: "밀크런(Milk-Run) 방식의 특징은?",
    options: ["단일 공급자 방문", "다수 공급자 순회 수거", "개별 배송", "보관 위주"],
    answer: 1,
    explanation: "밀크런은 하나의 차량이 여러 공급자를 순회하며 화물을 수거하는 방식입니다."
  },
  {
    id: 15,
    question: "물류센터의 주요 기능이 아닌 것은?",
    options: ["보관", "분류", "제조", "출하"],
    answer: 2,
    explanation: "물류센터는 보관, 분류, 출하 기능을 하며, 제조는 생산시설의 기능입니다."
  },
  {
    id: 16,
    question: "거점배송과 직송의 차이점에서 거점배송의 특징은?",
    options: ["중간 물류센터 경유", "생산지에서 직접 배송", "고객 직접 픽업", "항공 운송"],
    answer: 0,
    explanation: "거점배송은 물류센터를 경유하여 배송하는 방식입니다."
  },
  {
    id: 17,
    question: "물류공동화의 장점이 아닌 것은?",
    options: ["비용 절감", "환경 부하 감소", "독자적 운영 가능", "차량 가동률 향상"],
    answer: 2,
    explanation: "물류공동화는 여러 기업이 공동으로 운영하므로 독자적 운영이 제한됩니다."
  },
  {
    id: 18,
    question: "유닛로드시스템(ULS)의 핵심 개념은?",
    options: ["개별 화물 운송", "단위화된 화물 취급", "수작업 하역", "분산 보관"],
    answer: 1,
    explanation: "ULS는 화물을 파렛트나 컨테이너 등으로 단위화하여 취급하는 시스템입니다."
  },
  {
    id: 19,
    question: "물류네트워크 설계 시 고려사항이 아닌 것은?",
    options: ["물류센터 위치", "운송 경로", "직원 복지", "재고 정책"],
    answer: 2,
    explanation: "물류네트워크 설계는 물류센터 위치, 운송 경로, 재고 정책 등을 고려합니다."
  },
  {
    id: 20,
    question: "물류거점의 집중화 장점은?",
    options: ["재고 증가", "규모의 경제", "배송시간 증가", "운송비 증가"],
    answer: 1,
    explanation: "물류거점 집중화는 규모의 경제를 통해 물류비용을 절감할 수 있습니다."
  },
  // 공급사슬관리(SCM) (21-30)
  {
    id: 21,
    question: "SCM(Supply Chain Management)의 정의로 적절한 것은?",
    options: ["생산관리만 담당", "공급망 전체의 통합 관리", "재무관리만 담당", "인사관리만 담당"],
    answer: 1,
    explanation: "SCM은 공급자부터 최종 소비자까지 공급망 전체를 통합 관리하는 것입니다."
  },
  {
    id: 22,
    question: "채찍효과(Bullwhip Effect)란?",
    options: ["수요정보 왜곡 현상", "비용 감소 현상", "재고 감소 현상", "서비스 향상"],
    answer: 0,
    explanation: "채찍효과는 공급망 상류로 갈수록 수요 변동이 증폭되는 현상입니다."
  },
  {
    id: 23,
    question: "채찍효과의 원인이 아닌 것은?",
    options: ["수요예측 오류", "주문 일괄처리", "정보 공유 확대", "가격 변동"],
    answer: 2,
    explanation: "정보 공유 확대는 채찍효과를 감소시키는 요인입니다."
  },
  {
    id: 24,
    question: "VMI(Vendor Managed Inventory)의 의미는?",
    options: ["고객 재고 관리", "공급자 재고 관리", "정부 재고 관리", "은행 재고 관리"],
    answer: 1,
    explanation: "VMI는 공급자가 고객의 재고를 직접 관리하는 방식입니다."
  },
  {
    id: 25,
    question: "CPFR(Collaborative Planning Forecasting and Replenishment)의 핵심은?",
    options: ["단독 계획 수립", "협력적 계획 및 예측", "경쟁적 관계", "정보 단절"],
    answer: 1,
    explanation: "CPFR은 거래 파트너 간 협력적으로 계획, 예측, 보충을 수행하는 것입니다."
  },
  {
    id: 26,
    question: "SCM의 도입 효과가 아닌 것은?",
    options: ["재고 감소", "리드타임 단축", "비용 증가", "서비스 향상"],
    answer: 2,
    explanation: "SCM 도입은 재고 감소, 리드타임 단축, 비용 절감 등의 효과가 있습니다."
  },
  {
    id: 27,
    question: "공급사슬에서 '리드타임'이란?",
    options: ["주문부터 수령까지 소요시간", "제조 시간만", "운송 시간만", "검수 시간만"],
    answer: 0,
    explanation: "리드타임은 주문부터 상품을 수령할 때까지의 총 소요시간입니다."
  },
  {
    id: 28,
    question: "SCM에서 정보 공유의 효과가 아닌 것은?",
    options: ["채찍효과 감소", "재고 최적화", "정보 비용 증가", "의사결정 개선"],
    answer: 2,
    explanation: "정보 공유는 채찍효과 감소, 재고 최적화, 의사결정 개선 효과가 있습니다."
  },
  {
    id: 29,
    question: "공급사슬 가시성(Visibility)의 의미는?",
    options: ["정보 은폐", "공급망 전체 정보 파악", "개별 관리", "정보 단절"],
    answer: 1,
    explanation: "공급사슬 가시성은 공급망 전체의 정보를 실시간으로 파악하는 것입니다."
  },
  {
    id: 30,
    question: "SCM 성과지표인 SCOR 모델의 5대 프로세스에 해당하지 않는 것은?",
    options: ["계획(Plan)", "조달(Source)", "생산(Make)", "마케팅(Marketing)"],
    answer: 3,
    explanation: "SCOR 모델의 5대 프로세스는 계획, 조달, 생산, 배송, 반품입니다."
  },
  // 물류전략 (31-40)
  {
    id: 31,
    question: "물류전략의 유형 중 비용 우위 전략의 특징은?",
    options: ["차별화된 서비스", "최저 비용 추구", "틈새시장 공략", "다양한 서비스"],
    answer: 1,
    explanation: "비용 우위 전략은 물류비용을 최소화하여 경쟁력을 확보하는 전략입니다."
  },
  {
    id: 32,
    question: "물류 차별화 전략의 예로 적절한 것은?",
    options: ["최저가 운임", "익일 배송 서비스", "일반 포장", "표준 서비스"],
    answer: 1,
    explanation: "차별화 전략은 특별한 서비스(익일배송, 야간배송 등)로 경쟁력을 확보합니다."
  },
  {
    id: 33,
    question: "물류 집중화 전략의 장점은?",
    options: ["분산 관리", "재고 증가", "규모의 경제", "배송시간 증가"],
    answer: 2,
    explanation: "물류 집중화는 물류거점을 통합하여 규모의 경제를 실현합니다."
  },
  {
    id: 34,
    question: "JIT(Just In Time)의 핵심 원칙은?",
    options: ["대량 재고 유지", "필요시 필요량만 공급", "예측 기반 생산", "장기 보관"],
    answer: 1,
    explanation: "JIT는 필요한 시점에 필요한 양만 공급하여 재고를 최소화합니다."
  },
  {
    id: 35,
    question: "TOC(제약이론)에서 병목공정의 의미는?",
    options: ["가장 빠른 공정", "전체 처리량을 제한하는 공정", "가장 쉬운 공정", "마지막 공정"],
    answer: 1,
    explanation: "병목공정은 전체 시스템의 처리량을 제한하는 가장 느린 공정입니다."
  },
  {
    id: 36,
    question: "린(Lean) 물류의 목표는?",
    options: ["재고 증가", "낭비 제거", "비용 증가", "복잡성 증가"],
    answer: 1,
    explanation: "린 물류는 물류 프로세스에서 낭비를 제거하여 효율을 높이는 것입니다."
  },
  {
    id: 37,
    question: "애자일(Agile) 물류의 특징은?",
    options: ["경직성", "신속한 대응력", "표준화", "대량 생산"],
    answer: 1,
    explanation: "애자일 물류는 시장 변화에 신속하고 유연하게 대응하는 물류 전략입니다."
  },
  {
    id: 38,
    question: "물류 아웃소싱 결정 시 고려요소가 아닌 것은?",
    options: ["비용", "서비스 수준", "직원 출퇴근 시간", "핵심역량"],
    answer: 2,
    explanation: "물류 아웃소싱 결정은 비용, 서비스 수준, 핵심역량 등을 고려합니다."
  },
  {
    id: 39,
    question: "물류 표준화의 효과가 아닌 것은?",
    options: ["호환성 향상", "비용 절감", "복잡성 증가", "효율성 향상"],
    answer: 2,
    explanation: "물류 표준화는 호환성 향상, 비용 절감, 효율성 향상 효과가 있습니다."
  },
  {
    id: 40,
    question: "물류 성과 측정 지표인 KPI에 해당하지 않는 것은?",
    options: ["배송 정시율", "재고 회전율", "직원 만족도", "물류비 비율"],
    answer: 2,
    explanation: "물류 KPI는 배송 정시율, 재고 회전율, 물류비 비율 등이 있습니다."
  },
  // 물류비 관리 (41-50)
  {
    id: 41,
    question: "물류비의 구성요소에 해당하지 않는 것은?",
    options: ["운송비", "보관비", "마케팅비", "하역비"],
    answer: 2,
    explanation: "물류비는 운송비, 보관비, 하역비, 포장비, 물류정보비 등으로 구성됩니다."
  },
  {
    id: 42,
    question: "물류비 중 일반적으로 가장 큰 비중을 차지하는 것은?",
    options: ["보관비", "운송비", "포장비", "정보비"],
    answer: 1,
    explanation: "운송비는 일반적으로 전체 물류비의 40-50%를 차지합니다."
  },
  {
    id: 43,
    question: "물류비 절감 방안으로 적절하지 않은 것은?",
    options: ["차량 적재효율 향상", "물류 공동화", "재고 증가", "직배송 확대"],
    answer: 2,
    explanation: "재고 증가는 보관비를 증가시키므로 물류비 절감 방안이 아닙니다."
  },
  {
    id: 44,
    question: "ABC 물류원가 분석의 특징은?",
    options: ["제품별 원가 배분", "활동 기준 원가 배분", "고정비만 분석", "변동비만 분석"],
    answer: 1,
    explanation: "ABC 분석은 활동(Activity)을 기준으로 물류원가를 배분하는 방식입니다."
  },
  {
    id: 45,
    question: "총물류비(Total Logistics Cost) 개념의 중요성은?",
    options: ["개별 비용만 분석", "부분 최적화", "전체 최적화", "비용 무시"],
    answer: 2,
    explanation: "총물류비 개념은 개별 비용이 아닌 전체 물류비를 최적화하는 것입니다."
  },
  {
    id: 46,
    question: "물류비 절감을 위한 재고관리 방안은?",
    options: ["안전재고 증가", "적정 재고 유지", "과잉 재고", "무재고 정책"],
    answer: 1,
    explanation: "적정 수준의 재고를 유지하는 것이 물류비 절감에 효과적입니다."
  },
  {
    id: 47,
    question: "운송비 절감 방안이 아닌 것은?",
    options: ["적재효율 향상", "공차율 감소", "개별 운송 확대", "복합운송 활용"],
    answer: 2,
    explanation: "개별 운송보다 공동 운송이 운송비 절감에 효과적입니다."
  },
  {
    id: 48,
    question: "물류비 관리를 위한 물류회계의 역할은?",
    options: ["세금 납부", "물류비 파악 및 분석", "급여 계산", "마케팅 분석"],
    answer: 1,
    explanation: "물류회계는 물류비를 정확히 파악하고 분석하여 관리하는 역할을 합니다."
  },
  {
    id: 49,
    question: "재고유지비용에 포함되지 않는 것은?",
    options: ["보험료", "보관료", "운송료", "자본비용"],
    answer: 2,
    explanation: "재고유지비용은 보험료, 보관료, 자본비용 등이며, 운송료는 별도입니다."
  },
  {
    id: 50,
    question: "물류비와 고객서비스 수준의 관계는?",
    options: ["반비례", "무관", "서비스 향상 시 비용 증가 경향", "서비스 향상 시 비용 감소"],
    answer: 2,
    explanation: "일반적으로 고객서비스 수준을 높이면 물류비도 증가하는 경향이 있습니다."
  }
];

export default function LogisticsOverviewPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('logistics-manager-overview-answers');
    if (saved) setSelectedAnswers(JSON.parse(saved));
    const savedResults = localStorage.getItem('logistics-manager-overview-results');
    if (savedResults) setShowResults(JSON.parse(savedResults));
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('logistics-manager-overview-answers', JSON.stringify(newAnswers));
    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('logistics-manager-overview-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `물류관리사 물류관리론 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('logistics-manager-overview-answers');
      localStorage.removeItem('logistics-manager-overview-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "물류의 기본개념", range: [1, 10] },
    { name: "물류시스템", range: [11, 20] },
    { name: "공급사슬관리(SCM)", range: [21, 30] },
    { name: "물류전략", range: [31, 40] },
    { name: "물류비 관리", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/trade/logistics-manager" className="text-indigo-200 hover:text-white transition">
              ← 물류관리사
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">📦 물류관리론</h1>
          <p className="text-indigo-100">물류관리사 1과목 핵심 문제</p>
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
              <p className="text-gray-600 mb-4 text-sm">원하는 AI를 선택하여 더 자세한 설명을 받아보세요.</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                  <div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-500">Anthropic의 AI 어시스턴트</div></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-500">OpenAI의 AI 챗봇</div></div>
                </a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-500">Google의 AI 어시스턴트</div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
