'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 고객서비스의 이해 (1-10)
  {
    id: 1,
    question: "고객서비스의 정의로 가장 적절한 것은?",
    options: ["상품만 판매하는 활동", "고객 만족을 위한 모든 활동", "할인 행사만 진행하는 것", "광고만 하는 것"],
    answer: 1,
    explanation: "고객서비스는 고객의 만족을 위해 제공하는 모든 활동을 의미합니다."
  },
  {
    id: 2,
    question: "고객서비스의 중요성으로 올바르지 않은 것은?",
    options: ["고객 충성도 향상", "재구매율 증가", "비용만 증가", "기업 이미지 개선"],
    answer: 2,
    explanation: "좋은 고객서비스는 장기적으로 고객 유지와 매출 증가에 기여합니다."
  },
  {
    id: 3,
    question: "서비스의 특성 중 '무형성'의 의미는?",
    options: ["형태가 없어 만질 수 없음", "저장할 수 있음", "대량 생산 가능", "균일한 품질 유지"],
    answer: 0,
    explanation: "무형성은 서비스가 물리적 형태가 없어 보거나 만질 수 없는 특성입니다."
  },
  {
    id: 4,
    question: "서비스의 '비분리성'이란?",
    options: ["생산과 소비가 동시에 일어남", "저장이 가능함", "품질이 일정함", "형태가 있음"],
    answer: 0,
    explanation: "비분리성은 서비스의 생산과 소비가 동시에 이루어지는 특성입니다."
  },
  {
    id: 5,
    question: "서비스 품질을 결정하는 요소가 아닌 것은?",
    options: ["신뢰성", "응답성", "상품 원가", "공감성"],
    answer: 2,
    explanation: "서비스 품질은 신뢰성, 응답성, 확신성, 공감성, 유형성 등으로 평가됩니다."
  },
  {
    id: 6,
    question: "고객이 서비스에 기대하는 것과 실제 경험의 차이를 무엇이라 하는가?",
    options: ["서비스 격차", "서비스 품질", "서비스 특성", "서비스 가치"],
    answer: 0,
    explanation: "서비스 격차는 고객의 기대와 실제 서비스 간의 차이를 말합니다."
  },
  {
    id: 7,
    question: "고객서비스의 '이질성'이란?",
    options: ["서비스 품질이 항상 일정함", "제공자와 상황에 따라 품질이 다름", "서비스를 저장할 수 있음", "형태가 있음"],
    answer: 1,
    explanation: "이질성은 서비스가 제공자, 시간, 장소에 따라 품질이 달라질 수 있는 특성입니다."
  },
  {
    id: 8,
    question: "서비스의 '소멸성'의 의미는?",
    options: ["저장하거나 재판매할 수 없음", "영원히 지속됨", "대량 생산 가능", "품질이 일정함"],
    answer: 0,
    explanation: "소멸성은 서비스를 저장하거나 재판매할 수 없는 특성입니다."
  },
  {
    id: 9,
    question: "고객서비스 향상을 위한 방법으로 적절하지 않은 것은?",
    options: ["직원 교육 강화", "고객 피드백 수집", "고객 불만 무시", "서비스 표준화"],
    answer: 2,
    explanation: "고객 불만은 서비스 개선의 중요한 정보이므로 적극적으로 대응해야 합니다."
  },
  {
    id: 10,
    question: "서비스 마인드란 무엇인가?",
    options: ["이익만 추구하는 마음", "고객을 섬기려는 마음가짐", "빨리 퇴근하려는 마음", "최소한의 노력"],
    answer: 1,
    explanation: "서비스 마인드는 고객을 진심으로 섬기고 만족시키려는 마음가짐입니다."
  },
  // 고객 응대 기법 (11-20)
  {
    id: 11,
    question: "첫인상 형성에서 가장 큰 영향을 미치는 것은?",
    options: ["말의 내용", "목소리 톤", "외모와 표정", "지식"],
    answer: 2,
    explanation: "첫인상은 시각적 요소인 외모, 표정, 자세 등이 가장 큰 영향을 미칩니다."
  },
  {
    id: 12,
    question: "올바른 인사 방법으로 적절하지 않은 것은?",
    options: ["미소를 지으며 인사", "눈을 마주치며 인사", "무표정하게 인사", "밝은 목소리로 인사"],
    answer: 2,
    explanation: "인사할 때는 밝은 표정과 미소로 진심이 담긴 인사를 해야 합니다."
  },
  {
    id: 13,
    question: "고객과의 대화에서 경청의 중요성으로 올바른 것은?",
    options: ["시간 낭비", "고객 요구 파악", "불필요한 행동", "형식적 절차"],
    answer: 1,
    explanation: "경청을 통해 고객의 진정한 요구와 문제를 파악할 수 있습니다."
  },
  {
    id: 14,
    question: "비언어적 커뮤니케이션에 해당하지 않는 것은?",
    options: ["표정", "제스처", "말의 내용", "눈 맞춤"],
    answer: 2,
    explanation: "비언어적 커뮤니케이션은 표정, 제스처, 자세 등 말 이외의 의사소통입니다."
  },
  {
    id: 15,
    question: "고객 응대 시 적절한 거리는?",
    options: ["너무 가깝게 밀착", "적절한 사회적 거리 유지", "멀리서 소리치기", "등을 돌리고 응대"],
    answer: 1,
    explanation: "고객과 적절한 사회적 거리(약 1~1.5m)를 유지하는 것이 좋습니다."
  },
  {
    id: 16,
    question: "전화 응대의 기본 원칙으로 올바르지 않은 것은?",
    options: ["3번 이내 수신", "밝은 목소리", "천천히 말하기", "먼저 끊기"],
    answer: 3,
    explanation: "전화는 고객이 먼저 끊을 때까지 기다리는 것이 예의입니다."
  },
  {
    id: 17,
    question: "고객 응대 시 사용해야 할 표현은?",
    options: ["\"안 돼요\"", "\"모르겠어요\"", "\"확인해 보겠습니다\"", "\"그건 제 일이 아니에요\""],
    answer: 2,
    explanation: "긍정적이고 적극적인 표현을 사용해야 고객에게 좋은 인상을 줍니다."
  },
  {
    id: 18,
    question: "고객 응대 시 금지해야 할 행동은?",
    options: ["미소 짓기", "경청하기", "팔짱 끼기", "눈 맞춤"],
    answer: 2,
    explanation: "팔짱 끼기는 거부감이나 방어적인 느낌을 주므로 피해야 합니다."
  },
  {
    id: 19,
    question: "고객의 이름을 부를 때 적절한 방법은?",
    options: ["반말로 이름만 부름", "존칭과 함께 성함 사용", "별명으로 부름", "부르지 않음"],
    answer: 1,
    explanation: "고객의 성함에 존칭을 붙여 부르면 존중받는 느낌을 줍니다."
  },
  {
    id: 20,
    question: "고객 응대 중 다른 업무가 생겼을 때 올바른 행동은?",
    options: ["고객을 무시하고 다른 일 처리", "양해를 구하고 잠시 기다리게 함", "아무 말 없이 자리를 뜸", "급하게 마무리"],
    answer: 1,
    explanation: "다른 업무가 생기면 고객에게 양해를 구하고 정중히 기다려 달라고 요청합니다."
  },
  // 불만 고객 처리 (21-30)
  {
    id: 21,
    question: "고객 불만의 원인으로 적절하지 않은 것은?",
    options: ["상품 결함", "서비스 불만족", "직원의 불친절", "고객의 나이"],
    answer: 3,
    explanation: "고객 불만은 상품, 서비스, 직원 태도 등에서 발생하며 나이는 원인이 아닙니다."
  },
  {
    id: 22,
    question: "불만 고객 응대의 첫 단계로 가장 적절한 것은?",
    options: ["변명하기", "경청하고 공감하기", "무시하기", "다른 직원에게 넘기기"],
    answer: 1,
    explanation: "불만 고객에게는 먼저 충분히 경청하고 공감을 표현해야 합니다."
  },
  {
    id: 23,
    question: "불만 처리 시 사용하면 안 되는 표현은?",
    options: ["\"죄송합니다\"", "\"이해합니다\"", "\"그건 고객님 잘못입니다\"", "\"확인해 보겠습니다\""],
    answer: 2,
    explanation: "고객의 잘못을 지적하는 표현은 상황을 악화시킬 수 있습니다."
  },
  {
    id: 24,
    question: "불만 고객을 진정시키는 방법으로 올바르지 않은 것은?",
    options: ["차분한 목소리로 대화", "고객의 감정 인정", "빨리 끝내려 함", "해결책 제시"],
    answer: 2,
    explanation: "불만 고객에게는 충분한 시간을 갖고 진심으로 대응해야 합니다."
  },
  {
    id: 25,
    question: "고객 불만 처리의 LAST 원칙에서 'L'의 의미는?",
    options: ["Learn(배우다)", "Listen(경청하다)", "Love(사랑하다)", "Leave(떠나다)"],
    answer: 1,
    explanation: "LAST 원칙: Listen(경청), Apologize(사과), Solve(해결), Thank(감사)입니다."
  },
  {
    id: 26,
    question: "불만 고객 응대 후 해야 할 일은?",
    options: ["잊어버리기", "기록하고 원인 분석", "다른 직원 탓하기", "고객 비난"],
    answer: 1,
    explanation: "불만 사례를 기록하고 분석하여 재발 방지 대책을 세워야 합니다."
  },
  {
    id: 27,
    question: "화가 난 고객에게 절대 해서는 안 되는 행동은?",
    options: ["사과하기", "경청하기", "맞대응하기", "해결책 제시"],
    answer: 2,
    explanation: "화난 고객에게 맞대응하면 상황이 더 악화됩니다."
  },
  {
    id: 28,
    question: "불만 고객이 원하는 것으로 적절하지 않은 것은?",
    options: ["진심 어린 사과", "문제 해결", "금전적 보상만", "존중받는 느낌"],
    answer: 2,
    explanation: "대부분의 불만 고객은 금전보다 진심 어린 사과와 문제 해결을 원합니다."
  },
  {
    id: 29,
    question: "불만 처리 후 사후관리로 적절한 것은?",
    options: ["연락 끊기", "후속 전화로 만족도 확인", "무시하기", "다른 고객에게 말하기"],
    answer: 1,
    explanation: "불만 처리 후 후속 연락으로 만족 여부를 확인하면 신뢰를 회복할 수 있습니다."
  },
  {
    id: 30,
    question: "불만 고객을 충성 고객으로 만들 수 있는 이유는?",
    options: ["불만을 무시해서", "훌륭한 불만 처리 경험", "할인만 해줘서", "그냥 시간이 지나서"],
    answer: 1,
    explanation: "불만을 잘 처리하면 오히려 고객의 신뢰와 충성도가 높아질 수 있습니다."
  },
  // 판매 촉진 서비스 (31-40)
  {
    id: 31,
    question: "판매 촉진의 목적이 아닌 것은?",
    options: ["매출 증가", "신규 고객 유치", "재고 정리", "고객 불만 유발"],
    answer: 3,
    explanation: "판매 촉진은 매출 증가, 고객 유치, 재고 관리 등을 목적으로 합니다."
  },
  {
    id: 32,
    question: "가장 일반적인 판매 촉진 방법은?",
    options: ["가격 할인", "상품 숨기기", "서비스 축소", "매장 폐쇄"],
    answer: 0,
    explanation: "가격 할인은 가장 보편적이고 효과적인 판매 촉진 방법입니다."
  },
  {
    id: 33,
    question: "포인트 적립 프로그램의 장점은?",
    options: ["일회성 구매 유도", "고객 재방문 유도", "비용 증가만", "고객 이탈 촉진"],
    answer: 1,
    explanation: "포인트 적립은 고객의 재방문과 충성도를 높이는 효과가 있습니다."
  },
  {
    id: 34,
    question: "묶음 판매(Bundle Sale)의 장점은?",
    options: ["단가 하락만", "객단가 상승", "재고 증가", "고객 불만 증가"],
    answer: 1,
    explanation: "묶음 판매는 고객의 구매 금액(객단가)을 높이는 효과가 있습니다."
  },
  {
    id: 35,
    question: "쿠폰 판촉의 특징이 아닌 것은?",
    options: ["신규 고객 유치", "구매 촉진", "비용 없음", "사용 기간 설정"],
    answer: 2,
    explanation: "쿠폰 발행과 관리에는 비용이 발생합니다."
  },
  {
    id: 36,
    question: "시식/샘플 제공의 효과로 올바른 것은?",
    options: ["비용만 낭비", "상품 체험 기회 제공", "고객 기피", "매출 감소"],
    answer: 1,
    explanation: "시식이나 샘플은 고객에게 상품을 직접 체험하게 하여 구매를 유도합니다."
  },
  {
    id: 37,
    question: "POP(Point of Purchase) 광고란?",
    options: ["TV 광고", "구매 시점 광고", "라디오 광고", "신문 광고"],
    answer: 1,
    explanation: "POP 광고는 구매 시점(매장 내)에서 이루어지는 광고입니다."
  },
  {
    id: 38,
    question: "크로스셀링(Cross-selling)의 의미는?",
    options: ["같은 상품 추가 판매", "연관 상품 추천 판매", "반품 처리", "가격 할인"],
    answer: 1,
    explanation: "크로스셀링은 구매 상품과 연관된 다른 상품을 추천하여 판매하는 것입니다."
  },
  {
    id: 39,
    question: "업셀링(Up-selling)의 의미는?",
    options: ["저가 상품 추천", "고급/상위 상품 추천", "할인 상품 추천", "재고 상품 추천"],
    answer: 1,
    explanation: "업셀링은 고객에게 더 고급이나 상위 버전의 상품을 추천하는 것입니다."
  },
  {
    id: 40,
    question: "계절 할인 판매의 특징은?",
    options: ["연중 상시 진행", "특정 계절에 집중", "신상품만 대상", "할인 없음"],
    answer: 1,
    explanation: "계절 할인은 시즌 상품을 특정 계절에 집중적으로 할인 판매합니다."
  },
  // 서비스 회복과 고객 관계 관리 (41-50)
  {
    id: 41,
    question: "서비스 회복의 의미는?",
    options: ["서비스 실패 후 고객 만족 복구", "신규 서비스 개발", "서비스 종료", "직원 해고"],
    answer: 0,
    explanation: "서비스 회복은 서비스 실패 후 고객 만족을 회복시키는 노력입니다."
  },
  {
    id: 42,
    question: "서비스 회복 패러독스란?",
    options: ["서비스 실패가 좋다는 것", "잘 회복하면 오히려 만족도 상승", "회복이 불가능함", "고객이 떠남"],
    answer: 1,
    explanation: "서비스 실패를 잘 회복하면 원래보다 더 높은 만족도를 얻을 수 있습니다."
  },
  {
    id: 43,
    question: "CRM(고객관계관리)의 목적이 아닌 것은?",
    options: ["고객 유지", "고객 만족", "일회성 거래만 추구", "고객 가치 증대"],
    answer: 2,
    explanation: "CRM은 장기적인 고객 관계 구축과 유지를 목적으로 합니다."
  },
  {
    id: 44,
    question: "고객 생애 가치(CLV)란?",
    options: ["한 번의 구매 금액", "고객의 나이", "고객이 평생 가져다주는 총 가치", "상품 가격"],
    answer: 2,
    explanation: "고객 생애 가치는 한 고객이 거래 기간 동안 가져다주는 총 가치입니다."
  },
  {
    id: 45,
    question: "고객 충성도를 높이는 방법이 아닌 것은?",
    options: ["우수한 서비스 제공", "개인화된 혜택 제공", "고객 무시", "지속적인 소통"],
    answer: 2,
    explanation: "고객 충성도는 관심과 배려, 우수한 서비스를 통해 높아집니다."
  },
  {
    id: 46,
    question: "VIP 고객 관리의 중요성은?",
    options: ["비용만 증가", "소수지만 높은 매출 기여", "관리 불필요", "일반 고객과 동일"],
    answer: 1,
    explanation: "VIP 고객은 수는 적지만 전체 매출에서 높은 비중을 차지합니다."
  },
  {
    id: 47,
    question: "고객 정보 관리 시 주의할 점은?",
    options: ["무단 공개 가능", "개인정보 보호 준수", "아무렇게나 관리", "정보 판매 가능"],
    answer: 1,
    explanation: "고객 정보는 개인정보보호법에 따라 철저히 관리해야 합니다."
  },
  {
    id: 48,
    question: "고객 피드백의 활용 방법으로 적절한 것은?",
    options: ["무시하기", "서비스 개선에 반영", "직원 처벌에만 사용", "삭제하기"],
    answer: 1,
    explanation: "고객 피드백은 서비스와 상품 개선의 중요한 자료로 활용해야 합니다."
  },
  {
    id: 49,
    question: "이탈 고객 관리의 필요성은?",
    options: ["신규 고객만 중요", "기존 고객 유지가 비용 효율적", "이탈해도 무관", "관리 불가능"],
    answer: 1,
    explanation: "기존 고객 유지가 신규 고객 확보보다 비용이 적게 듭니다."
  },
  {
    id: 50,
    question: "고객 만족 조사의 목적은?",
    options: ["형식적 절차", "서비스 수준 파악 및 개선", "직원 감시", "비용 낭비"],
    answer: 1,
    explanation: "고객 만족 조사는 현재 서비스 수준을 파악하고 개선점을 찾기 위함입니다."
  }
];

export default function CustomerServicePage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('distribution-manager-3-customer-service-answers');
    if (saved) {
      setSelectedAnswers(JSON.parse(saved));
    }
    const savedResults = localStorage.getItem('distribution-manager-3-customer-service-results');
    if (savedResults) {
      setShowResults(JSON.parse(savedResults));
    }
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('distribution-manager-3-customer-service-answers', JSON.stringify(newAnswers));

    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('distribution-manager-3-customer-service-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `유통관리사 3급 고객서비스 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('distribution-manager-3-customer-service-answers');
      localStorage.removeItem('distribution-manager-3-customer-service-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "고객서비스의 이해", range: [1, 10] },
    { name: "고객 응대 기법", range: [11, 20] },
    { name: "불만 고객 처리", range: [21, 30] },
    { name: "판매 촉진 서비스", range: [31, 40] },
    { name: "서비스 회복과 고객 관계 관리", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <a href="/category/trade/distribution-manager-3" className="text-green-200 hover:text-white transition">
              ← 유통관리사 3급
            </a>
          </div>
          <h1 className="text-3xl font-bold mb-2">📚 고객서비스</h1>
          <p className="text-green-100">유통관리사 3급 5과목 핵심 문제</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진도</h2>
            <button
              onClick={resetProgress}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              초기화
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {Object.keys(selectedAnswers).length}/{questions.length}
            </span>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            정답률: {Object.keys(selectedAnswers).length > 0
              ? Math.round((getCorrectCount() / Object.keys(selectedAnswers).length) * 100)
              : 0}% ({getCorrectCount()}/{Object.keys(selectedAnswers).length})
          </div>
        </div>

        {/* Topics */}
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                {topicIndex + 1}
              </span>
              {topic.name}
            </h3>
            <div className="space-y-3">
              {questions
                .filter(q => q.id >= topic.range[0] && q.id <= topic.range[1])
                .map((question) => (
                  <div key={question.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          showResults[question.id]
                            ? selectedAnswers[question.id] === question.answer
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {question.id}
                        </span>
                        <span className="font-medium text-gray-800">{question.question}</span>
                      </div>
                      <span className={`transform transition-transform ${expandedQuestions[question.id] ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    {expandedQuestions[question.id] && (
                      <div className="px-6 pb-4 border-t">
                        <div className="mt-4 space-y-2">
                          {question.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswerSelect(question.id, idx)}
                              className={`w-full p-3 rounded-lg text-left transition flex items-center gap-3 ${
                                showResults[question.id]
                                  ? idx === question.answer
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : selectedAnswers[question.id] === idx
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-gray-50'
                                  : selectedAnswers[question.id] === idx
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                                showResults[question.id]
                                  ? idx === question.answer
                                    ? 'bg-green-500 text-white'
                                    : selectedAnswers[question.id] === idx
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                                  : selectedAnswers[question.id] === idx
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}>
                                {idx + 1}
                              </span>
                              {option}
                            </button>
                          ))}
                        </div>

                        {showResults[question.id] && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>해설:</strong> {question.explanation}
                            </p>
                            <button
                              onClick={() => openAIModal(question)}
                              className="mt-3 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition"
                            >
                              🤖 AI에게 질문하기
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/category/trade/distribution-manager-3"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
          >
            ← 유통관리사 3급 메인으로
          </a>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-4 text-sm">원하는 AI를 선택하여 더 자세한 설명을 받아보세요.</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                  <div>
                    <div className="font-semibold text-gray-800">Claude</div>
                    <div className="text-sm text-gray-500">Anthropic의 AI 어시스턴트</div>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200"
                >
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div>
                    <div className="font-semibold text-gray-800">ChatGPT</div>
                    <div className="text-sm text-gray-500">OpenAI의 AI 챗봇</div>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div>
                    <div className="font-semibold text-gray-800">Gemini</div>
                    <div className="text-sm text-gray-500">Google의 AI 어시스턴트</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
