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
  // 운송의 기초 (1-10)
  {
    id: 1,
    question: "운송의 기능 중 '장소적 효용' 창출이란?",
    options: ["시간 단축", "상품을 필요한 장소로 이동", "비용 절감", "품질 향상"],
    answer: 1,
    explanation: "장소적 효용은 운송을 통해 상품을 수요가 있는 장소로 이동시키는 것입니다."
  },
  {
    id: 2,
    question: "화물운송수단의 선택 기준이 아닌 것은?",
    options: ["운임", "운송 시간", "직원 수", "화물의 특성"],
    answer: 2,
    explanation: "운송수단 선택 시 운임, 시간, 안전성, 화물 특성 등을 고려합니다."
  },
  {
    id: 3,
    question: "운송의 경제적 특성인 '규모의 경제'란?",
    options: ["운송량 증가 시 단위당 비용 감소", "소량 운송이 유리", "거리가 짧을수록 유리", "속도가 빠를수록 유리"],
    answer: 0,
    explanation: "규모의 경제는 운송량이 증가할수록 단위당 운송비가 감소하는 현상입니다."
  },
  {
    id: 4,
    question: "운송에서 '거리의 경제'란?",
    options: ["짧은 거리가 유리", "장거리일수록 단위당 비용 감소", "속도가 중요", "빈도가 중요"],
    answer: 1,
    explanation: "거리의 경제는 운송거리가 길수록 단위당 운송비가 감소하는 현상입니다."
  },
  {
    id: 5,
    question: "복합운송의 장점이 아닌 것은?",
    options: ["문전수송 가능", "단일 운송장", "복잡한 절차", "비용 절감"],
    answer: 2,
    explanation: "복합운송은 여러 운송수단을 결합하여 효율성과 편의성을 높입니다."
  },
  {
    id: 6,
    question: "운송수단 중 대량 화물의 장거리 운송에 가장 적합한 것은?",
    options: ["트럭", "철도", "항공", "오토바이"],
    answer: 1,
    explanation: "철도는 대량 화물을 장거리로 저렴하게 운송하는 데 적합합니다."
  },
  {
    id: 7,
    question: "긴급 화물 운송에 가장 적합한 운송수단은?",
    options: ["해운", "철도", "항공", "파이프라인"],
    answer: 2,
    explanation: "항공운송은 가장 빠른 운송수단으로 긴급 화물에 적합합니다."
  },
  {
    id: 8,
    question: "운송비에서 고정비에 해당하는 것은?",
    options: ["연료비", "차량 감가상각비", "통행료", "인건비(변동)"],
    answer: 1,
    explanation: "차량 감가상각비는 운행 여부와 관계없이 발생하는 고정비입니다."
  },
  {
    id: 9,
    question: "공로운송의 장점이 아닌 것은?",
    options: ["문전수송 가능", "유연한 운행", "대량 운송 유리", "소량 다품종 적합"],
    answer: 2,
    explanation: "공로운송은 문전수송과 유연성이 장점이나, 대량 운송에는 불리합니다."
  },
  {
    id: 10,
    question: "운송경로 결정 시 고려사항이 아닌 것은?",
    options: ["운송 거리", "운송 시간", "직원 학력", "도로 상태"],
    answer: 2,
    explanation: "운송경로는 거리, 시간, 도로 상태, 비용 등을 고려하여 결정합니다."
  },
  // 육상운송 (11-20)
  {
    id: 11,
    question: "트럭 운송의 장점으로 적절하지 않은 것은?",
    options: ["문전수송", "유연한 운행 스케줄", "대량 화물 운송", "긴급 배송 가능"],
    answer: 2,
    explanation: "트럭은 소량~중량 화물에 적합하며, 대량 화물은 철도가 유리합니다."
  },
  {
    id: 12,
    question: "화물자동차의 종류 중 '특수용도형'에 해당하는 것은?",
    options: ["일반 화물차", "탱크로리", "승합차", "승용차"],
    answer: 1,
    explanation: "탱크로리, 냉동차, 컨테이너 전용차 등이 특수용도형입니다."
  },
  {
    id: 13,
    question: "철도운송의 장점이 아닌 것은?",
    options: ["대량 운송", "정시성", "문전수송", "환경친화적"],
    answer: 2,
    explanation: "철도는 역에서 역까지만 운송하므로 문전수송이 어렵습니다."
  },
  {
    id: 14,
    question: "철도운송에서 '피기백(Piggyback)' 운송이란?",
    options: ["트럭을 철도로 운송", "사람을 철도로 운송", "항공화물을 철도로 운송", "해상화물을 철도로 운송"],
    answer: 0,
    explanation: "피기백은 트럭이나 트레일러를 철도 화차에 싣고 운송하는 방식입니다."
  },
  {
    id: 15,
    question: "파이프라인 운송의 특징이 아닌 것은?",
    options: ["연속 운송", "기상 영향 적음", "다양한 화물 운송", "낮은 운영비"],
    answer: 2,
    explanation: "파이프라인은 석유, 가스 등 특정 화물만 운송 가능합니다."
  },
  {
    id: 16,
    question: "운송 효율화를 위한 '공동배송'의 장점은?",
    options: ["차량 가동률 향상", "개별 관리 용이", "비용 증가", "서비스 차별화"],
    answer: 0,
    explanation: "공동배송은 차량 가동률과 적재효율을 높여 비용을 절감합니다."
  },
  {
    id: 17,
    question: "화물자동차 운수사업의 종류가 아닌 것은?",
    options: ["일반화물", "개별화물", "용달화물", "여객운송"],
    answer: 3,
    explanation: "화물자동차 운수사업은 일반, 개별, 용달화물 등으로 구분됩니다."
  },
  {
    id: 18,
    question: "차량 적재효율을 높이는 방법이 아닌 것은?",
    options: ["파렛트 활용", "혼재 운송", "공차 운행 증가", "배송 경로 최적화"],
    answer: 2,
    explanation: "공차 운행을 줄이는 것이 적재효율 향상에 도움됩니다."
  },
  {
    id: 19,
    question: "운송관리시스템(TMS)의 기능이 아닌 것은?",
    options: ["배차 관리", "운행 추적", "생산 계획", "운임 정산"],
    answer: 2,
    explanation: "TMS는 배차, 운행 추적, 운임 관리 등 운송 관련 기능을 수행합니다."
  },
  {
    id: 20,
    question: "친환경 운송 방안이 아닌 것은?",
    options: ["전기차 도입", "공회전 감소", "과적 운행", "공동배송"],
    answer: 2,
    explanation: "과적은 불법이며 환경오염과 도로 파손을 유발합니다."
  },
  // 해상운송 (21-30)
  {
    id: 21,
    question: "해상운송의 장점으로 적절하지 않은 것은?",
    options: ["대량 운송", "저렴한 운임", "빠른 속도", "국제 운송"],
    answer: 2,
    explanation: "해상운송은 대량 화물을 저렴하게 운송하나 속도는 느립니다."
  },
  {
    id: 22,
    question: "정기선(Liner) 운송의 특징은?",
    options: ["부정기 운항", "일정한 항로와 스케줄", "용선 계약", "대량 살화물"],
    answer: 1,
    explanation: "정기선은 정해진 항로와 스케줄에 따라 운항합니다."
  },
  {
    id: 23,
    question: "부정기선(Tramper) 운송의 특징은?",
    options: ["정해진 항로", "수요에 따라 운항", "컨테이너 전용", "여객 운송"],
    answer: 1,
    explanation: "부정기선은 화주의 수요에 따라 자유롭게 운항합니다."
  },
  {
    id: 24,
    question: "컨테이너선의 장점이 아닌 것은?",
    options: ["하역 효율화", "화물 손상 감소", "벌크화물 적합", "문전수송 연계"],
    answer: 2,
    explanation: "컨테이너는 단위화된 화물에 적합하며, 벌크화물은 벌크선을 사용합니다."
  },
  {
    id: 25,
    question: "선하증권(B/L)의 기능이 아닌 것은?",
    options: ["운송계약 증거", "화물 인수증", "권리증권", "보험 증권"],
    answer: 3,
    explanation: "B/L은 운송계약 증거, 화물 인수증, 권리증권의 기능을 합니다."
  },
  {
    id: 26,
    question: "해상운임 결정요소가 아닌 것은?",
    options: ["화물의 종류", "운송 거리", "선박 색상", "시장 상황"],
    answer: 2,
    explanation: "해상운임은 화물 종류, 거리, 시장 상황, 계절 등에 따라 결정됩니다."
  },
  {
    id: 27,
    question: "용선계약의 종류가 아닌 것은?",
    options: ["항해용선", "기간용선", "나용선", "여객용선"],
    answer: 3,
    explanation: "용선계약은 항해용선, 기간용선, 나용선으로 구분됩니다."
  },
  {
    id: 28,
    question: "TEU(Twenty-foot Equivalent Unit)란?",
    options: ["화물 중량 단위", "20피트 컨테이너 기준 단위", "선박 속도 단위", "운임 단위"],
    answer: 1,
    explanation: "TEU는 20피트 컨테이너를 기준으로 한 컨테이너 물동량 단위입니다."
  },
  {
    id: 29,
    question: "해상운송에서 'FCL'의 의미는?",
    options: ["컨테이너 단위 화물", "소량 화물", "항공 화물", "철도 화물"],
    answer: 0,
    explanation: "FCL(Full Container Load)은 컨테이너 1개 단위로 운송하는 화물입니다."
  },
  {
    id: 30,
    question: "해상운송에서 'LCL'의 의미는?",
    options: ["대량 화물", "컨테이너 미만 소량 화물", "특수 화물", "위험물"],
    answer: 1,
    explanation: "LCL(Less than Container Load)은 컨테이너 단위 미만의 소량 화물입니다."
  },
  // 항공운송 (31-40)
  {
    id: 31,
    question: "항공운송의 장점으로 적절하지 않은 것은?",
    options: ["신속성", "안전성", "저렴한 운임", "정시성"],
    answer: 2,
    explanation: "항공운송은 빠르고 안전하나 운임이 다른 운송수단보다 비쌉니다."
  },
  {
    id: 32,
    question: "항공화물에 적합한 품목은?",
    options: ["원유", "석탄", "고가의 전자제품", "건축 자재"],
    answer: 2,
    explanation: "고가의 소형 제품, 신선식품, 긴급 화물 등이 항공운송에 적합합니다."
  },
  {
    id: 33,
    question: "항공화물운송장(AWB)의 특징은?",
    options: ["유가증권", "비유가증권", "권리증권", "지불수단"],
    answer: 1,
    explanation: "AWB는 B/L과 달리 비유가증권(단순 수령증)입니다."
  },
  {
    id: 34,
    question: "항공운송에서 'ULD'란?",
    options: ["항공기 종류", "항공 화물 탑재용기", "운임 단위", "공항 코드"],
    answer: 1,
    explanation: "ULD(Unit Load Device)는 항공기 화물칸에 맞는 표준 탑재용기입니다."
  },
  {
    id: 35,
    question: "항공운임 결정에서 '용적중량'의 의미는?",
    options: ["실제 중량만 적용", "부피를 중량으로 환산", "항공기 중량", "연료 중량"],
    answer: 1,
    explanation: "용적중량은 화물의 부피를 중량으로 환산한 것으로, 실제 중량과 비교하여 큰 값을 적용합니다."
  },
  {
    id: 36,
    question: "전용 화물기(Freighter)의 특징은?",
    options: ["여객만 운송", "화물 전용 항공기", "소형 항공기", "헬리콥터"],
    answer: 1,
    explanation: "전용 화물기는 여객 없이 화물만 운송하는 항공기입니다."
  },
  {
    id: 37,
    question: "항공운송에서 포워더의 역할은?",
    options: ["항공기 조종", "화물 운송 주선", "공항 건설", "세금 징수"],
    answer: 1,
    explanation: "항공 포워더는 화주와 항공사 사이에서 운송을 주선합니다."
  },
  {
    id: 38,
    question: "항공운송의 단점이 아닌 것은?",
    options: ["높은 운임", "기상 영향", "빠른 속도", "용량 제한"],
    answer: 2,
    explanation: "빠른 속도는 항공운송의 장점입니다."
  },
  {
    id: 39,
    question: "항공 화물터미널의 기능이 아닌 것은?",
    options: ["화물 분류", "통관", "항공기 정비", "화물 보관"],
    answer: 2,
    explanation: "항공 화물터미널은 화물 분류, 통관, 보관 기능을 수행합니다."
  },
  {
    id: 40,
    question: "항공운송 보안검색 대상이 아닌 것은?",
    options: ["수하물", "화물", "우편물", "운항 승무원 개인물품 면제"],
    answer: 3,
    explanation: "항공보안법에 따라 수하물, 화물, 우편물 등은 보안검색 대상입니다."
  },
  // 운임 및 계약 (41-50)
  {
    id: 41,
    question: "운임의 종류 중 '기본운임'이란?",
    options: ["할인된 운임", "표준 요율에 의한 운임", "특별 운임", "무료 운송"],
    answer: 1,
    explanation: "기본운임은 표준 요율표에 따라 산정되는 일반적인 운임입니다."
  },
  {
    id: 42,
    question: "종가운임(Ad Valorem Rate)의 특징은?",
    options: ["중량 기준", "용적 기준", "화물 가격 기준", "거리 기준"],
    answer: 2,
    explanation: "종가운임은 화물의 가격을 기준으로 산정하는 운임입니다."
  },
  {
    id: 43,
    question: "운송계약에서 '송하인'의 의무가 아닌 것은?",
    options: ["운임 지급", "화물 정보 제공", "포장 적정", "화물 배달"],
    answer: 3,
    explanation: "화물 배달은 운송인의 의무입니다."
  },
  {
    id: 44,
    question: "운송인의 책임 범위를 제한하는 규정은?",
    options: ["운송 약관", "마케팅 계획", "인사 규정", "회계 기준"],
    answer: 0,
    explanation: "운송 약관에는 운송인의 책임 범위와 면책사유 등이 규정됩니다."
  },
  {
    id: 45,
    question: "화물운송 보험의 목적은?",
    options: ["운임 절감", "운송 중 사고 손해 보상", "속도 향상", "서비스 개선"],
    answer: 1,
    explanation: "화물보험은 운송 중 발생할 수 있는 손해를 보상받기 위한 것입니다."
  },
  {
    id: 46,
    question: "CIF 조건에서 운임과 보험료 부담자는?",
    options: ["구매자", "판매자", "운송인", "보험회사"],
    answer: 1,
    explanation: "CIF는 판매자가 운임과 보험료를 부담하는 무역조건입니다."
  },
  {
    id: 47,
    question: "FOB 조건에서 위험 이전 시점은?",
    options: ["공장 출고 시", "본선 적재 시", "목적항 도착 시", "구매자 창고 도착 시"],
    answer: 1,
    explanation: "FOB는 화물이 본선에 적재되는 시점에 위험이 이전됩니다."
  },
  {
    id: 48,
    question: "운송 클레임 제기 기한을 정하는 이유는?",
    options: ["운임 인상", "분쟁의 신속한 해결", "서비스 축소", "비용 증가"],
    answer: 1,
    explanation: "클레임 기한은 분쟁을 신속히 해결하고 증거 보전을 위해 규정됩니다."
  },
  {
    id: 49,
    question: "운임 할증료(Surcharge)가 부과되는 경우가 아닌 것은?",
    options: ["연료비 급등", "성수기", "일반 화물", "위험물"],
    answer: 2,
    explanation: "할증료는 연료비 변동, 성수기, 위험물 등 특수 상황에 부과됩니다."
  },
  {
    id: 50,
    question: "전자운송서류의 장점이 아닌 것은?",
    options: ["처리 속도 향상", "비용 절감", "보관 공간 증가", "오류 감소"],
    answer: 2,
    explanation: "전자운송서류는 종이 문서 대비 보관 공간이 거의 필요 없습니다."
  }
];

export default function LogisticsManagementPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('logistics-manager-management-answers');
    if (saved) setSelectedAnswers(JSON.parse(saved));
    const savedResults = localStorage.getItem('logistics-manager-management-results');
    if (savedResults) setShowResults(JSON.parse(savedResults));
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('logistics-manager-management-answers', JSON.stringify(newAnswers));
    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('logistics-manager-management-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `물류관리사 화물운송론 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('logistics-manager-management-answers');
      localStorage.removeItem('logistics-manager-management-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "운송의 기초", range: [1, 10] },
    { name: "육상운송", range: [11, 20] },
    { name: "해상운송", range: [21, 30] },
    { name: "항공운송", range: [31, 40] },
    { name: "운임 및 계약", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/trade/logistics-manager" className="text-indigo-200 hover:text-white transition">← 물류관리사</Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">🚛 화물운송론</h1>
          <p className="text-indigo-100">물류관리사 2과목 핵심 문제</p>
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
