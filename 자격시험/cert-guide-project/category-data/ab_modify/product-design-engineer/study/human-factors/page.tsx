'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

const questions: Question[] = [
  // 인체측정학 (10문항)
  { id: 1, question: "인체측정학(Anthropometry)의 정의로 가장 적절한 것은?", options: ["인체의 색채 분석", "인체 각 부위 치수 측정", "인체의 화학적 분석", "인체의 심리 분석"], correct: 1, explanation: "인체측정학은 인체 각 부위의 치수를 측정하고 분석하는 학문으로, 제품 설계의 기초 자료가 됩니다.", topic: "인체측정학" },
  { id: 2, question: "정적 인체측정과 동적 인체측정의 차이점은?", options: ["측정 도구의 차이", "자세 변화 여부", "측정 대상의 차이", "측정 시간의 차이"], correct: 1, explanation: "정적 인체측정은 정지 자세에서, 동적 인체측정은 동작 중의 치수와 범위를 측정합니다.", topic: "인체측정학" },
  { id: 3, question: "백분위수(Percentile)에서 95번째 백분위는?", options: ["5%가 이 값보다 큼", "95%가 이 값보다 큼", "5%가 이 값보다 작음", "95%가 이 값보다 작음"], correct: 3, explanation: "95번째 백분위는 전체의 95%가 이 값보다 작거나 같고, 5%가 이 값보다 큰 것을 의미합니다.", topic: "인체측정학" },
  { id: 4, question: "제품 설계 시 출입구 높이 결정에 적용해야 할 백분위는?", options: ["5번째 백분위", "50번째 백분위", "95번째 백분위", "평균값"], correct: 2, explanation: "출입구처럼 큰 사람도 통과해야 하는 경우 95번째 백분위 이상의 치수를 적용합니다.", topic: "인체측정학" },
  { id: 5, question: "선반 최대 도달 높이 설계 시 적용할 백분위는?", options: ["5번째 백분위", "50번째 백분위", "95번째 백분위", "100번째 백분위"], correct: 0, explanation: "도달 높이처럼 작은 사람도 닿아야 하는 경우 5번째 백분위 치수를 적용합니다.", topic: "인체측정학" },
  { id: 6, question: "인체측정 데이터의 주요 수집 방법이 아닌 것은?", options: ["직접 측정", "사진 측정", "3D 스캐닝", "혈액 검사"], correct: 3, explanation: "인체측정은 직접 측정, 사진 측정(포토그래메트리), 3D 스캐닝 등의 방법을 사용합니다.", topic: "인체측정학" },
  { id: 7, question: "한국인 인체치수조사사업(Size Korea)의 주관 기관은?", options: ["교육부", "국토부", "산업통상자원부", "보건복지부"], correct: 2, explanation: "Size Korea는 산업통상자원부 산하 기술표준원에서 주관하는 국가 인체치수 조사 사업입니다.", topic: "인체측정학" },
  { id: 8, question: "인체치수 중 '키'를 측정할 때의 기준 자세는?", options: ["앉은 자세", "누운 자세", "직립 자세", "구부린 자세"], correct: 2, explanation: "키(신장)는 직립 자세에서 발바닥부터 머리 꼭대기까지의 수직 거리를 측정합니다.", topic: "인체측정학" },
  { id: 9, question: "앉은키(Sitting Height)의 측정 범위는?", options: ["바닥~머리", "의자 면~머리", "의자 면~어깨", "바닥~어깨"], correct: 1, explanation: "앉은키는 의자에 바로 앉은 상태에서 의자 면부터 머리 꼭대기까지의 높이입니다.", topic: "인체측정학" },
  { id: 10, question: "손 치수 중 '손 너비'는 어디서 측정하는가?", options: ["손가락 끝", "손목", "손바닥 관절", "엄지 기저부"], correct: 2, explanation: "손 너비는 손바닥의 다섯 손가락 관절 부위(중수골두)에서 측정합니다.", topic: "인체측정학" },

  // 작업생리학 (10문항)
  { id: 11, question: "작업생리학에서 '대사량(Metabolism)'의 단위는?", options: ["kg", "kcal/min", "cm", "dB"], correct: 1, explanation: "대사량은 신체 활동에 필요한 에너지 소비량으로 kcal/min 또는 W(와트)로 표시합니다.", topic: "작업생리학" },
  { id: 12, question: "기초대사량(BMR)이 의미하는 것은?", options: ["운동 시 에너지", "수면 시 에너지", "안정 상태 최소 에너지", "최대 운동 에너지"], correct: 2, explanation: "기초대사량은 생명 유지에 필요한 최소한의 에너지로, 안정 상태에서 측정합니다.", topic: "작업생리학" },
  { id: 13, question: "근육 피로의 주된 원인 물질은?", options: ["포도당", "젖산", "단백질", "지방"], correct: 1, explanation: "근육이 무산소 운동을 할 때 젖산(Lactic acid)이 축적되어 근육 피로를 유발합니다.", topic: "작업생리학" },
  { id: 14, question: "등척성 수축(Isometric Contraction)이란?", options: ["근육 길이 변화 O", "근육 길이 변화 X", "근육 이완", "근육 신장"], correct: 1, explanation: "등척성 수축은 근육 길이가 변하지 않고 힘만 발생하는 수축으로, 정적 작업에 해당합니다.", topic: "작업생리학" },
  { id: 15, question: "최대 산소 섭취량(VO2max)이 높을수록?", options: ["지구력 낮음", "지구력 높음", "순발력 낮음", "유연성 높음"], correct: 1, explanation: "최대 산소 섭취량은 심폐 지구력의 지표로, 높을수록 지구성 작업 능력이 좋습니다.", topic: "작업생리학" },
  { id: 16, question: "작업 강도를 평가하는 지표로 주로 사용되는 것은?", options: ["혈압", "심박수", "체온", "호흡"], correct: 1, explanation: "심박수는 작업 강도와 비례하여 증가하므로 작업 부하를 평가하는 실용적인 지표입니다.", topic: "작업생리학" },
  { id: 17, question: "Repetitive Strain Injury(RSI)의 주원인은?", options: ["일회성 충격", "반복적 동작", "화학물질", "고온 환경"], correct: 1, explanation: "RSI(반복성 긴장 손상)는 동일한 동작의 반복으로 인한 근골격계 질환입니다.", topic: "작업생리학" },
  { id: 18, question: "근골격계 질환 예방을 위한 휴식 원칙은?", options: ["긴 휴식 1회", "짧은 휴식 여러 번", "휴식 불필요", "작업 후만 휴식"], correct: 1, explanation: "반복 작업에서는 긴 휴식 1회보다 짧은 휴식을 자주 취하는 것이 피로 예방에 효과적입니다.", topic: "작업생리학" },
  { id: 19, question: "작업대 높이가 너무 높을 때 발생하는 문제는?", options: ["허리 통증", "어깨 피로", "손목 통증", "무릎 통증"], correct: 1, explanation: "작업대가 너무 높으면 어깨를 들어올려야 하므로 어깨 근육에 피로와 통증이 발생합니다.", topic: "작업생리학" },
  { id: 20, question: "손목터널증후군(CTS)에 영향을 주는 신경은?", options: ["척골신경", "정중신경", "요골신경", "대퇴신경"], correct: 1, explanation: "손목터널증후군은 손목의 수근관을 지나는 정중신경(Median nerve)이 압박되어 발생합니다.", topic: "작업생리학" },

  // 인지공학 (15문항)
  { id: 21, question: "인지공학(Cognitive Engineering)의 주요 연구 대상은?", options: ["신체 치수", "정보 처리 과정", "재료 물성", "생산 공정"], correct: 1, explanation: "인지공학은 인간의 지각, 인지, 의사결정 등 정보 처리 과정을 연구하여 인터페이스를 설계합니다.", topic: "인지공학" },
  { id: 22, question: "Miller의 마법의 숫자 '7±2'가 의미하는 것은?", options: ["장기기억 용량", "단기기억 용량", "감각기억 용량", "작업기억 시간"], correct: 1, explanation: "밀러의 법칙에 따르면 인간의 단기기억은 7±2개(5~9개)의 청크(chunk)를 처리할 수 있습니다.", topic: "인지공학" },
  { id: 23, question: "히크의 법칙(Hick's Law)이 설명하는 것은?", options: ["기억 용량", "선택지 수와 반응 시간", "색채 인식", "청각 범위"], correct: 1, explanation: "히크의 법칙은 선택지가 많아질수록 반응 시간이 로그 함수적으로 증가함을 설명합니다.", topic: "인지공학" },
  { id: 24, question: "피츠의 법칙(Fitts's Law)과 관련된 것은?", options: ["기억력", "지각 능력", "운동 조절", "청각"], correct: 2, explanation: "피츠의 법칙은 목표물의 크기와 거리에 따른 운동 시간을 예측하는 운동 조절 모델입니다.", topic: "인지공학" },
  { id: 25, question: "시그널 탐지 이론(Signal Detection Theory)에서 '오경보'란?", options: ["신호 있을 때 탐지", "신호 없을 때 탐지", "신호 있을 때 미탐지", "신호 없을 때 미탐지"], correct: 1, explanation: "오경보(False Alarm)는 신호가 없는데도 있다고 반응하는 오류입니다.", topic: "인지공학" },
  { id: 26, question: "주의(Attention)의 특성 중 '선택적 주의'란?", options: ["모든 정보 처리", "특정 정보만 처리", "무의식적 처리", "자동 처리"], correct: 1, explanation: "선택적 주의는 여러 자극 중 필요한 정보에만 주의를 기울이는 능력입니다.", topic: "인지공학" },
  { id: 27, question: "자동화된 행동(Automaticity)의 특징은?", options: ["의식적 노력 필요", "많은 주의 필요", "적은 주의로 수행", "항상 정확함"], correct: 2, explanation: "자동화된 행동은 반복 학습을 통해 적은 주의와 노력으로 수행할 수 있게 된 것입니다.", topic: "인지공학" },
  { id: 28, question: "멘탈 모델(Mental Model)의 역할은?", options: ["시력 보정", "시스템 이해와 예측", "근력 강화", "청력 개선"], correct: 1, explanation: "멘탈 모델은 사용자가 시스템의 작동 방식을 이해하고 예측하기 위해 형성하는 내적 표상입니다.", topic: "인지공학" },
  { id: 29, question: "인지 부하(Cognitive Load)를 줄이는 방법이 아닌 것은?", options: ["정보 청킹", "시각적 단서 제공", "정보량 증가", "단계별 안내"], correct: 2, explanation: "인지 부하를 줄이려면 정보를 청킹하거나 단계별로 제공하며, 정보량을 늘리면 오히려 부하가 증가합니다.", topic: "인지공학" },
  { id: 30, question: "실수(Slip)와 착오(Mistake)의 차이는?", options: ["결과의 차이", "의도의 차이", "속도의 차이", "빈도의 차이"], correct: 1, explanation: "실수는 올바른 의도를 잘못 실행한 것이고, 착오는 의도 자체가 잘못된 것입니다.", topic: "인지공학" },
  { id: 31, question: "상황 인식(Situation Awareness)의 3단계 순서는?", options: ["이해-지각-예측", "지각-이해-예측", "예측-지각-이해", "이해-예측-지각"], correct: 1, explanation: "상황 인식은 지각(Perception) - 이해(Comprehension) - 예측(Projection)의 3단계로 구성됩니다.", topic: "인지공학" },
  { id: 32, question: "인지적 워크스루(Cognitive Walkthrough)의 목적은?", options: ["성능 테스트", "학습 용이성 평가", "내구성 검사", "원가 분석"], correct: 1, explanation: "인지적 워크스루는 사용자가 인터페이스를 처음 사용할 때 학습하기 쉬운지 평가하는 방법입니다.", topic: "인지공학" },
  { id: 33, question: "가시성(Visibility)의 디자인 원칙이 의미하는 것은?", options: ["숨겨진 기능", "기능이 눈에 보임", "복잡한 메뉴", "다단계 접근"], correct: 1, explanation: "가시성 원칙은 시스템의 기능과 상태가 사용자에게 명확히 보여야 한다는 것입니다.", topic: "인지공학" },
  { id: 34, question: "피드백(Feedback)의 디자인 원칙이 중요한 이유는?", options: ["미적 효과", "행위 결과 확인", "비용 절감", "생산성 향상"], correct: 1, explanation: "피드백은 사용자가 자신의 행위 결과를 즉시 확인할 수 있게 하여 오류를 방지합니다.", topic: "인지공학" },
  { id: 35, question: "일관성(Consistency)의 디자인 원칙에 해당하는 것은?", options: ["매번 다른 방식", "동일한 기능은 동일한 방식", "복잡한 인터페이스", "예측 불가능성"], correct: 1, explanation: "일관성 원칙은 동일한 기능은 동일한 방식으로 작동해야 사용자가 예측하고 학습하기 쉽다는 것입니다.", topic: "인지공학" },

  // 감성공학 (15문항)
  { id: 36, question: "감성공학(Kansei Engineering)의 기원 국가는?", options: ["미국", "독일", "일본", "영국"], correct: 2, explanation: "감성공학은 1970년대 일본 히로시마대학의 나가마치 미츠오 교수가 창시했습니다.", topic: "감성공학" },
  { id: 37, question: "감성공학의 주요 목적은?", options: ["원가 절감", "인간 감성을 제품에 반영", "생산 효율화", "기술 혁신"], correct: 1, explanation: "감성공학은 인간의 감성과 이미지를 파악하여 제품 설계에 반영하는 것을 목적으로 합니다.", topic: "감성공학" },
  { id: 38, question: "의미미분법(Semantic Differential)의 척도 형태는?", options: ["단일 형용사", "반의어 쌍", "숫자만", "그림"], correct: 1, explanation: "의미미분법은 '크다-작다', '밝다-어둡다'와 같은 반의어 쌍을 사용하여 감성을 측정합니다.", topic: "감성공학" },
  { id: 39, question: "감성 어휘 수집에 사용되는 기법이 아닌 것은?", options: ["문헌 조사", "인터뷰", "FGI", "화학 분석"], correct: 3, explanation: "감성 어휘는 문헌 조사, 인터뷰, 포커스 그룹 인터뷰(FGI) 등 정성적 방법으로 수집합니다.", topic: "감성공학" },
  { id: 40, question: "감성공학에서 '물리적 특성'과 '감성'의 관계를 분석하는 통계 기법은?", options: ["빈도 분석", "회귀 분석", "신뢰도 분석", "기술 통계"], correct: 1, explanation: "회귀 분석을 통해 제품의 물리적 특성(색상, 형태 등)이 감성 평가에 미치는 영향을 분석합니다.", topic: "감성공학" },
  { id: 41, question: "제품의 '럭셔리' 감성을 높이는 요소가 아닌 것은?", options: ["고급 재질", "섬세한 디테일", "저렴한 가격표시", "무게감"], correct: 2, explanation: "럭셔리 감성은 고급 재질, 정교한 마감, 적절한 무게감 등으로 형성되며, 저렴함은 반대 효과를 줍니다.", topic: "감성공학" },
  { id: 42, question: "촉각 감성(Haptic Sensation)에 영향을 주는 요소가 아닌 것은?", options: ["표면 질감", "온도", "무게", "색상"], correct: 3, explanation: "촉각 감성은 표면 질감, 온도, 무게, 형태 등 촉각으로 느끼는 요소이며, 색상은 시각 요소입니다.", topic: "감성공학" },
  { id: 43, question: "컬러 감성에서 '빨간색'이 일반적으로 연상시키는 감정은?", options: ["차분함", "열정, 흥분", "우울함", "냉정함"], correct: 1, explanation: "빨간색은 일반적으로 열정, 에너지, 흥분, 사랑 등의 감정을 연상시킵니다.", topic: "감성공학" },
  { id: 44, question: "감성 품질(Perceived Quality)에 영향을 주는 요소가 아닌 것은?", options: ["마감 품질", "작동음", "조작감", "제조 원가"], correct: 3, explanation: "감성 품질은 사용자가 감각으로 인지하는 품질로, 제조 원가는 직접적 요소가 아닙니다.", topic: "감성공학" },
  { id: 45, question: "사운드 디자인(Sound Design)의 목적이 아닌 것은?", options: ["브랜드 아이덴티티", "사용성 향상", "감성 전달", "소음 증가"], correct: 3, explanation: "사운드 디자인은 브랜드 아이덴티티 형성, 피드백 제공, 감성 전달을 목적으로 하며 소음 증가는 아닙니다.", topic: "감성공학" },
  { id: 46, question: "UX(User Experience)와 감성공학의 공통점은?", options: ["기술 중심", "사용자 경험 중심", "비용 중심", "생산 중심"], correct: 1, explanation: "UX와 감성공학 모두 사용자의 경험과 감성을 중심으로 제품/서비스를 설계합니다.", topic: "감성공학" },
  { id: 47, question: "감성 측정에서 생리적 반응 측정에 해당하지 않는 것은?", options: ["심박수", "피부전도도", "뇌파", "설문조사"], correct: 3, explanation: "생리적 반응 측정은 심박수, 피부전도도, 뇌파, 안구 운동 등이며, 설문조사는 주관적 측정입니다.", topic: "감성공학" },
  { id: 48, question: "감성공학 프로세스의 첫 단계는?", options: ["물리적 설계", "감성 분석", "제품 생산", "시장 출시"], correct: 1, explanation: "감성공학 프로세스는 먼저 타겟 사용자의 감성을 분석한 후, 이를 물리적 설계로 변환합니다.", topic: "감성공학" },
  { id: 49, question: "다감각 디자인(Multi-sensory Design)이 중요한 이유는?", options: ["비용 절감", "총체적 경험 제공", "단순화", "기술 과시"], correct: 1, explanation: "다감각 디자인은 시각, 청각, 촉각 등 여러 감각을 통해 풍부하고 총체적인 사용자 경험을 제공합니다.", topic: "감성공학" },
  { id: 50, question: "제품의 '친환경' 감성을 전달하는 방법이 아닌 것은?", options: ["자연 소재 사용", "녹색 계열 색상", "유기적 형태", "플라스틱 광택"], correct: 3, explanation: "친환경 감성은 자연 소재, 녹색/갈색 계열, 유기적 형태로 전달하며, 플라스틱 광택은 반대입니다.", topic: "감성공학" }
];

export default function HumanFactorsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('human-factors-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestion);
    setAnsweredQuestions(newAnswered);

    let newScore = score;
    if (index === questions[currentQuestion].correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    localStorage.setItem('human-factors-progress', JSON.stringify({
      answered: Array.from(newAnswered),
      score: newScore
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
    localStorage.removeItem('human-factors-progress');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getAISearchUrl = (question: string, topic: string, aiType: string) => {
    const searchQuery = encodeURIComponent(`${topic} ${question} 제품디자인기사`);
    switch(aiType) {
      case 'claude': return `https://claude.ai/new?q=${searchQuery}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${searchQuery}`;
      case 'gemini': return `https://gemini.google.com/?q=${searchQuery}`;
      default: return '#';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
              <div className="text-xl text-gray-600">정답률: {percentage}%</div>
            </div>
            <div className="mb-8">
              {percentage >= 80 ? (
                <p className="text-green-600 font-semibold">훌륭합니다! 인간공학을 잘 이해하고 계시네요!</p>
              ) : percentage >= 60 ? (
                <p className="text-yellow-600 font-semibold">좋아요! 조금 더 학습하면 완벽해질 거예요!</p>
              ) : (
                <p className="text-red-600 font-semibold">더 많은 학습이 필요해요. 다시 도전해보세요!</p>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                다시 시작
              </button>
              <Link
                href="/category/design/product-design-engineer"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/category/design/product-design-engineer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            제품디자인기사 홈으로
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">인간공학</h1>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              {question.topic}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    : selectedAnswer === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : index === question.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-semibold ${
                    selectedAnswer === null
                      ? 'bg-gray-200 text-gray-700'
                      : selectedAnswer === index
                        ? index === question.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === question.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl mb-6 ${
              selectedAnswer === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  selectedAnswer === question.correct ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {selectedAnswer === question.correct ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {selectedAnswer === question.correct ? '정답입니다!' : '틀렸습니다!'}
                  </p>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">AI에게 더 물어보기:</p>
                <div className="flex gap-2">
                  <a href={getAISearchUrl(question.question, question.topic, 'claude')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
                    Claude
                  </a>
                  <a href={getAISearchUrl(question.question, question.topic, 'chatgpt')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                    ChatGPT
                  </a>
                  <a href={getAISearchUrl(question.question, question.topic, 'gemini')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                    Gemini
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedAnswer !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-10 gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestion(idx);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className={`w-full aspect-square rounded-lg font-medium text-sm transition-all duration-200 ${
                idx === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answeredQuestions.has(idx)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
