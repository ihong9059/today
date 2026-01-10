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
  // 국제물류의 기초 (1-10)
  {
    id: 1,
    question: "국제물류의 정의로 가장 적절한 것은?",
    options: ["국내 물류만 담당", "국경을 넘는 물류 활동", "항공 물류만 해당", "창고 관리만 해당"],
    answer: 1,
    explanation: "국제물류는 국경을 넘어 이루어지는 모든 물류 활동을 의미합니다."
  },
  {
    id: 2,
    question: "국제물류의 특징이 아닌 것은?",
    options: ["통관 절차 필요", "환율 변동 영향", "국내법만 적용", "운송거리 장거리"],
    answer: 2,
    explanation: "국제물류는 수출입국 양국의 법규와 국제협약의 적용을 받습니다."
  },
  {
    id: 3,
    question: "국제물류에서 가장 많이 사용되는 운송수단은?",
    options: ["항공", "해운", "철도", "파이프라인"],
    answer: 1,
    explanation: "해운은 대량 화물을 저렴하게 운송할 수 있어 국제물류의 90% 이상을 차지합니다."
  },
  {
    id: 4,
    question: "국제복합운송의 정의로 적절한 것은?",
    options: ["단일 운송수단 사용", "2가지 이상 운송수단 결합", "육상 운송만 해당", "해상 운송만 해당"],
    answer: 1,
    explanation: "국제복합운송은 2가지 이상의 운송수단을 결합하여 화물을 운송하는 것입니다."
  },
  {
    id: 5,
    question: "국제물류 포워더의 역할은?",
    options: ["직접 운송", "운송 주선 및 대행", "제조", "판매"],
    answer: 1,
    explanation: "포워더는 화주를 대신하여 운송 주선, 통관, 보험 등을 대행합니다."
  },
  {
    id: 6,
    question: "국제물류에서 'Door to Door' 서비스란?",
    options: ["항구에서 항구까지", "공장에서 최종 목적지까지", "터미널에서 터미널까지", "창고에서 창고까지"],
    answer: 1,
    explanation: "Door to Door는 출발지 문전에서 도착지 문전까지 일관 운송하는 서비스입니다."
  },
  {
    id: 7,
    question: "국제물류 비용에 포함되지 않는 것은?",
    options: ["운송비", "통관비", "국내 법인세", "보험료"],
    answer: 2,
    explanation: "국제물류 비용은 운송비, 통관비, 보험료, 창고비 등입니다."
  },
  {
    id: 8,
    question: "글로벌 소싱(Global Sourcing)의 의미는?",
    options: ["국내에서만 조달", "전 세계에서 최적 조달", "자가 생산만 수행", "재고 없이 운영"],
    answer: 1,
    explanation: "글로벌 소싱은 전 세계를 대상으로 최적의 조달처를 찾는 것입니다."
  },
  {
    id: 9,
    question: "국제물류 허브의 조건이 아닌 것은?",
    options: ["지리적 이점", "항만/공항 인프라", "인구 규모만 중요", "물류 서비스 발달"],
    answer: 2,
    explanation: "국제물류 허브는 지리적 위치, 인프라, 물류 서비스 등이 중요합니다."
  },
  {
    id: 10,
    question: "FTA(자유무역협정)가 국제물류에 미치는 영향은?",
    options: ["관세 증가", "무역 장벽 감소", "물동량 감소", "운송비 증가"],
    answer: 1,
    explanation: "FTA는 관세를 인하하여 무역 장벽을 낮추고 물동량을 증가시킵니다."
  },
  // 인코텀즈(Incoterms) (11-20)
  {
    id: 11,
    question: "인코텀즈(Incoterms)의 목적은?",
    options: ["운임 결정", "무역거래 조건 통일", "환율 결정", "품질 기준"],
    answer: 1,
    explanation: "인코텀즈는 국제무역에서 사용되는 거래조건을 표준화한 것입니다."
  },
  {
    id: 12,
    question: "인코텀즈 2020에서 가장 최신 버전인 이유는?",
    options: ["최초 제정", "국제상업회의소 10년마다 개정", "매년 개정", "5년마다 개정"],
    answer: 1,
    explanation: "인코텀즈는 국제상업회의소(ICC)에서 대략 10년마다 개정합니다."
  },
  {
    id: 13,
    question: "EXW(공장인도) 조건에서 위험 이전 시점은?",
    options: ["본선 적재 시", "공장 구내에서 인도 시", "목적항 도착 시", "구매자 창고 도착 시"],
    answer: 1,
    explanation: "EXW는 판매자가 자신의 영업장(공장)에서 화물을 인도하면 위험이 이전됩니다."
  },
  {
    id: 14,
    question: "FOB(본선인도) 조건에서 운임 부담자는?",
    options: ["판매자", "구매자", "운송인", "보험회사"],
    answer: 1,
    explanation: "FOB에서 본선 적재 이후의 운임은 구매자가 부담합니다."
  },
  {
    id: 15,
    question: "CIF 조건에서 판매자의 의무는?",
    options: ["운임만 부담", "운임과 보험료 부담", "위험만 부담", "통관만 담당"],
    answer: 1,
    explanation: "CIF에서 판매자는 운임(Cost), 보험료(Insurance), 운송비(Freight)를 부담합니다."
  },
  {
    id: 16,
    question: "DAP(도착장소인도) 조건에서 위험 이전 시점은?",
    options: ["출발지", "본선 적재 시", "지정 목적지 도착 시", "통관 완료 시"],
    answer: 2,
    explanation: "DAP에서 판매자는 지정 목적지까지 위험을 부담합니다."
  },
  {
    id: 17,
    question: "DDP(관세지급인도) 조건에서 수입통관 의무자는?",
    options: ["구매자", "판매자", "세관", "운송인"],
    answer: 1,
    explanation: "DDP에서 판매자는 수입통관과 관세까지 부담합니다."
  },
  {
    id: 18,
    question: "인코텀즈에서 해상운송 전용 조건이 아닌 것은?",
    options: ["FOB", "CFR", "CIF", "FCA"],
    answer: 3,
    explanation: "FCA는 모든 운송수단에 사용 가능한 조건입니다."
  },
  {
    id: 19,
    question: "CPT(운송비지급인도) 조건의 특징은?",
    options: ["해상 전용", "판매자가 목적지까지 운임 지급", "위험은 목적지에서 이전", "보험 필수"],
    answer: 1,
    explanation: "CPT에서 판매자는 목적지까지 운임을 지급하나, 위험은 운송인 인도 시 이전됩니다."
  },
  {
    id: 20,
    question: "인코텀즈가 결정하지 않는 것은?",
    options: ["비용 분담", "위험 이전", "소유권 이전", "인도 장소"],
    answer: 2,
    explanation: "인코텀즈는 비용과 위험 분담을 정하지만, 소유권 이전은 별도 계약 사항입니다."
  },
  // 수출입 절차 (21-30)
  {
    id: 21,
    question: "수출 통관의 순서로 올바른 것은?",
    options: ["적재→신고→검사→수리", "신고→심사→검사→수리", "검사→신고→적재→수리", "수리→신고→검사→적재"],
    answer: 1,
    explanation: "수출통관은 신고→심사→검사→수리 순으로 진행됩니다."
  },
  {
    id: 22,
    question: "수입 통관에서 '과세가격'의 기준은?",
    options: ["FOB 가격", "CIF 가격", "공장가격", "소매가격"],
    answer: 1,
    explanation: "수입 과세가격은 일반적으로 CIF 가격을 기준으로 합니다."
  },
  {
    id: 23,
    question: "AEO(Authorized Economic Operator)의 의미는?",
    options: ["관세 면제업체", "수출입안전관리 우수업체", "면세점 운영업체", "물류 대기업"],
    answer: 1,
    explanation: "AEO는 세관이 인증한 수출입안전관리 우수업체입니다."
  },
  {
    id: 24,
    question: "원산지 증명서의 목적은?",
    options: ["품질 보증", "FTA 관세 혜택", "보험 가입", "운송 확인"],
    answer: 1,
    explanation: "원산지 증명서는 FTA 협정세율 적용을 위해 필요합니다."
  },
  {
    id: 25,
    question: "HS Code의 용도는?",
    options: ["선박 식별", "품목 분류 및 관세율 적용", "회사 식별", "항공기 식별"],
    answer: 1,
    explanation: "HS Code는 국제적으로 통일된 품목분류 코드로 관세율 결정에 사용됩니다."
  },
  {
    id: 26,
    question: "보세구역의 기능이 아닌 것은?",
    options: ["관세 미납 상태 보관", "수출입 화물 장치", "국내 판매 목적 보관", "통관 대기"],
    answer: 2,
    explanation: "보세구역은 통관 전 화물을 관세 미납 상태로 보관하는 곳입니다."
  },
  {
    id: 27,
    question: "관세환급의 의미는?",
    options: ["관세 추가 납부", "수출 시 납부 관세 반환", "관세 면제", "관세 인상"],
    answer: 1,
    explanation: "관세환급은 수입 원재료로 생산한 제품을 수출 시 납부 관세를 돌려받는 것입니다."
  },
  {
    id: 28,
    question: "적하목록(Manifest)의 내용이 아닌 것은?",
    options: ["선박/항공기 정보", "화물 내역", "승객 정보", "가격 정보"],
    answer: 3,
    explanation: "적하목록에는 운송수단 정보, 화물 내역 등이 포함되며 가격은 별도입니다."
  },
  {
    id: 29,
    question: "수입 신고 시 필요하지 않은 서류는?",
    options: ["송품장(Invoice)", "포장명세서", "이력서", "선하증권"],
    answer: 2,
    explanation: "수입 신고에는 송품장, 포장명세서, B/L, 원산지증명서 등이 필요합니다."
  },
  {
    id: 30,
    question: "전자통관시스템의 장점이 아닌 것은?",
    options: ["신속한 처리", "비용 절감", "투명성 향상", "서류 증가"],
    answer: 3,
    explanation: "전자통관은 서류를 줄이고 처리 속도와 투명성을 높입니다."
  },
  // 국제운송 (31-40)
  {
    id: 31,
    question: "국제복합운송인(MTO)의 역할은?",
    options: ["단일 구간만 책임", "전 운송구간 일괄 책임", "하역만 담당", "포장만 담당"],
    answer: 1,
    explanation: "MTO는 복합운송 전 구간에 대해 일괄적으로 책임을 집니다."
  },
  {
    id: 32,
    question: "랜드브리지(Land Bridge)의 의미는?",
    options: ["해상만 이용", "육상 경유 복합운송", "항공만 이용", "파이프라인 이용"],
    answer: 1,
    explanation: "랜드브리지는 대륙 횡단 철도나 트럭을 이용한 복합운송 루트입니다."
  },
  {
    id: 33,
    question: "시베리아 랜드브리지(SLB)가 연결하는 구간은?",
    options: ["미국-유럽", "아시아-유럽", "아시아-아프리카", "유럽-아프리카"],
    answer: 1,
    explanation: "SLB는 시베리아 횡단철도를 이용해 아시아와 유럽을 연결합니다."
  },
  {
    id: 34,
    question: "국제항공화물의 특징이 아닌 것은?",
    options: ["고가 화물 적합", "신속성", "저렴한 운임", "긴급 화물 적합"],
    answer: 2,
    explanation: "항공화물은 빠르지만 운임이 해상운송보다 비쌉니다."
  },
  {
    id: 35,
    question: "피더(Feeder) 서비스의 의미는?",
    options: ["대형 모선 운항", "허브항과 지역항 연결 운송", "내륙 운송", "항공 운송"],
    answer: 1,
    explanation: "피더 서비스는 소형 선박으로 허브항과 지역 항만을 연결하는 운송입니다."
  },
  {
    id: 36,
    question: "NVOCC(Non-Vessel Operating Common Carrier)의 특징은?",
    options: ["선박 보유", "선박 미보유 운송인", "항공사", "철도회사"],
    answer: 1,
    explanation: "NVOCC는 선박을 보유하지 않고 운송 서비스를 제공하는 운송인입니다."
  },
  {
    id: 37,
    question: "국제물류에서 컨테이너화의 장점이 아닌 것은?",
    options: ["하역 효율화", "화물 손상 감소", "벌크화물에 적합", "문전수송 연계"],
    answer: 2,
    explanation: "컨테이너는 일반 화물에 적합하며, 벌크화물은 별도 선박을 사용합니다."
  },
  {
    id: 38,
    question: "드라이 컨테이너의 용도는?",
    options: ["냉동 화물", "일반 잡화", "액체 화물", "산적 화물"],
    answer: 1,
    explanation: "드라이 컨테이너는 일반 잡화를 운송하는 표준 컨테이너입니다."
  },
  {
    id: 39,
    question: "리퍼 컨테이너(Reefer Container)의 용도는?",
    options: ["일반 화물", "냉동/냉장 화물", "위험물", "산적 화물"],
    answer: 1,
    explanation: "리퍼 컨테이너는 온도 조절이 필요한 냉동/냉장 화물용입니다."
  },
  {
    id: 40,
    question: "국제물류에서 'Transit Time'이란?",
    options: ["통관 시간", "운송 소요 시간", "하역 시간", "보관 시간"],
    answer: 1,
    explanation: "Transit Time은 출발지에서 목적지까지의 운송 소요 시간입니다."
  },
  // 관세 및 무역 (41-50)
  {
    id: 41,
    question: "관세의 목적이 아닌 것은?",
    options: ["재정 수입", "국내 산업 보호", "수출 촉진만", "무역 조절"],
    answer: 2,
    explanation: "관세는 재정 수입, 국내 산업 보호, 무역 조절 목적이 있습니다."
  },
  {
    id: 42,
    question: "종가세(Ad Valorem Duty)의 기준은?",
    options: ["화물 수량", "화물 가격", "화물 중량", "화물 용적"],
    answer: 1,
    explanation: "종가세는 화물의 가격을 기준으로 관세를 부과합니다."
  },
  {
    id: 43,
    question: "반덤핑관세의 목적은?",
    options: ["수출 촉진", "덤핑 수입품에 대응", "관세 인하", "무역 자유화"],
    answer: 1,
    explanation: "반덤핑관세는 정상가격 이하로 수출되는 덤핑 상품에 부과됩니다."
  },
  {
    id: 44,
    question: "WTO의 역할로 적절하지 않은 것은?",
    options: ["무역 분쟁 해결", "다자간 무역협상", "개별국 관세율 결정", "무역규범 관장"],
    answer: 2,
    explanation: "WTO는 국제무역 규범을 관장하나, 개별국 관세율은 각국이 결정합니다."
  },
  {
    id: 45,
    question: "신용장(L/C)의 기능이 아닌 것은?",
    options: ["대금 지급 보장", "무역금융", "운송 계약", "신용 보완"],
    answer: 2,
    explanation: "신용장은 대금 지급 보장, 무역금융, 신용 보완 기능을 합니다."
  },
  {
    id: 46,
    question: "무역서류 중 상업송장(Commercial Invoice)의 내용은?",
    options: ["선박 정보", "상품 명세, 가격, 수량", "보험 조건", "통관 내역"],
    answer: 1,
    explanation: "상업송장에는 상품 명세, 가격, 수량, 거래조건 등이 기재됩니다."
  },
  {
    id: 47,
    question: "포장명세서(Packing List)의 용도는?",
    options: ["가격 확인", "포장 상태 확인", "보험 청구", "운임 계산"],
    answer: 1,
    explanation: "포장명세서는 화물의 포장 단위, 중량, 용적 등을 기재합니다."
  },
  {
    id: 48,
    question: "특혜관세의 적용 조건은?",
    options: ["모든 국가에 적용", "FTA 체결국 원산지 충족 시", "고가 상품만", "대량 수입 시"],
    answer: 1,
    explanation: "특혜관세는 FTA 체결국에서 원산지 기준을 충족한 상품에 적용됩니다."
  },
  {
    id: 49,
    question: "무역보험의 종류가 아닌 것은?",
    options: ["적하보험", "수출보험", "건강보험", "적하보험"],
    answer: 2,
    explanation: "무역보험은 적하보험, 수출보험, 무역금융보험 등이 있습니다."
  },
  {
    id: 50,
    question: "EDI(Electronic Data Interchange)의 무역 적용 효과는?",
    options: ["서류 처리 지연", "비용 증가", "업무 효율화", "오류 증가"],
    answer: 2,
    explanation: "EDI는 전자문서 교환으로 무역 업무 효율화와 비용 절감을 가져옵니다."
  }
];

export default function InternationalLogisticsPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('logistics-manager-international-answers');
    if (saved) setSelectedAnswers(JSON.parse(saved));
    const savedResults = localStorage.getItem('logistics-manager-international-results');
    if (savedResults) setShowResults(JSON.parse(savedResults));
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('logistics-manager-international-answers', JSON.stringify(newAnswers));
    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('logistics-manager-international-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `물류관리사 국제물류론 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('logistics-manager-international-answers');
      localStorage.removeItem('logistics-manager-international-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "국제물류의 기초", range: [1, 10] },
    { name: "인코텀즈(Incoterms)", range: [11, 20] },
    { name: "수출입 절차", range: [21, 30] },
    { name: "국제운송", range: [31, 40] },
    { name: "관세 및 무역", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/trade/logistics-manager" className="text-indigo-200 hover:text-white transition">← 물류관리사</Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">🌍 국제물류론</h1>
          <p className="text-indigo-100">물류관리사 3과목 핵심 문제</p>
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
