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
  // 색채 디자인 기초 (13문항)
  {
    id: 1,
    question: "디자인에서 색채 계획의 첫 번째 단계는?",
    options: ["색채 적용", "색채 조사 및 분석", "색채 평가", "색채 수정"],
    answer: 1,
    explanation: "색채 계획은 조사 및 분석 → 콘셉트 설정 → 색채 선정 → 적용 → 평가 순으로 진행됩니다."
  },
  {
    id: 2,
    question: "컬러 마케팅에서 타깃 분석 시 고려하지 않아도 되는 요소는?",
    options: ["연령", "성별", "디자이너의 취향", "지역 문화"],
    answer: 2,
    explanation: "컬러 마케팅은 소비자(타깃) 중심으로 연령, 성별, 문화적 배경 등을 분석합니다."
  },
  {
    id: 3,
    question: "기업의 색채 아이덴티티(CI) 색상 선정 시 고려사항이 아닌 것은?",
    options: ["기업 이념과 부합", "타 기업과의 차별화", "디자이너 개인 취향", "시인성과 명시성"],
    answer: 2,
    explanation: "CI 색상은 기업 이념, 차별화, 시인성, 적용성 등을 고려하여 선정합니다."
  },
  {
    id: 4,
    question: "색채 트렌드 정보를 제공하는 국제적 기관이 아닌 것은?",
    options: ["Pantone", "Intercolor", "KOCCA", "WGSN"],
    answer: 2,
    explanation: "KOCCA(한국콘텐츠진흥원)는 색채 트렌드 전문 기관이 아닙니다. Pantone, Intercolor, WGSN이 대표적입니다."
  },
  {
    id: 5,
    question: "색채 조절을 통해 공간을 넓어 보이게 하려면?",
    options: ["저명도, 고채도 색 사용", "고명도, 저채도 색 사용", "난색 계열 사용", "어두운 색 사용"],
    answer: 1,
    explanation: "고명도, 저채도의 밝고 연한 색은 공간을 넓어 보이게 하는 효과가 있습니다."
  },
  {
    id: 6,
    question: "패키지 디자인에서 색채의 역할이 아닌 것은?",
    options: ["상품 보호", "상품 식별", "정보 전달", "생산비 절감"],
    answer: 3,
    explanation: "패키지 색채는 상품 보호, 식별, 정보 전달, 구매 유도 등의 역할을 합니다."
  },
  {
    id: 7,
    question: "계절별 색채 이미지에서 봄에 어울리는 색조는?",
    options: ["딥(Deep)", "라이트(Light), 브라이트(Bright)", "다크(Dark)", "그레이시(Grayish)"],
    answer: 1,
    explanation: "봄은 밝고 화사한 라이트, 브라이트 톤이 어울리며 파스텔 컬러가 대표적입니다."
  },
  {
    id: 8,
    question: "계절별 색채 이미지에서 가을에 어울리는 색상은?",
    options: ["파스텔 핑크", "비비드 블루", "딥 오렌지, 브라운", "화이트, 실버"],
    answer: 2,
    explanation: "가을은 딥하고 따뜻한 느낌의 오렌지, 브라운, 카키 등이 어울립니다."
  },
  {
    id: 9,
    question: "퍼스널 컬러 진단에서 사용하는 4계절 유형이 아닌 것은?",
    options: ["봄 웜", "여름 쿨", "가을 웜", "겨울 라이트"],
    answer: 3,
    explanation: "4계절 유형은 봄 웜, 여름 쿨, 가을 웜, 겨울 쿨입니다. '겨울 라이트'는 없습니다."
  },
  {
    id: 10,
    question: "웜톤(Warm Tone) 사람에게 어울리는 색상은?",
    options: ["파랑, 회색", "코랄, 피치", "라벤더, 민트", "네이비, 버건디"],
    answer: 1,
    explanation: "웜톤은 노란 베이스의 따뜻한 색인 코랄, 피치, 살구색 등이 잘 어울립니다."
  },
  {
    id: 11,
    question: "쿨톤(Cool Tone) 사람에게 어울리는 색상은?",
    options: ["오렌지, 살구색", "라벤더, 로즈 핑크", "올리브, 카키", "머스타드, 캐멀"],
    answer: 1,
    explanation: "쿨톤은 파란 베이스의 시원한 색인 라벤더, 로즈 핑크, 민트 등이 잘 어울립니다."
  },
  {
    id: 12,
    question: "색채 감성 이미지 스케일에서 가로축이 나타내는 것은?",
    options: ["명도", "난색-한색", "채도", "유채색-무채색"],
    answer: 1,
    explanation: "IRI 색채 이미지 스케일에서 가로축은 난색-한색(따뜻함-차가움)을 나타냅니다."
  },
  {
    id: 13,
    question: "색채 감성 이미지 스케일에서 세로축이 나타내는 것은?",
    options: ["색상", "채도-명도(부드러움-딱딱함)", "무게감", "면적"],
    answer: 1,
    explanation: "IRI 색채 이미지 스케일에서 세로축은 부드러움(고명도)-딱딱함(저명도)을 나타냅니다."
  },
  // 컬러 커뮤니케이션 (12문항)
  {
    id: 14,
    question: "색채 커뮤니케이션에서 발신자(송신자)의 역할은?",
    options: ["색채 메시지 수신", "색채 메시지 전달", "색채 해석", "색채 피드백"],
    answer: 1,
    explanation: "발신자는 색채를 통해 의도한 메시지를 전달하는 역할을 합니다."
  },
  {
    id: 15,
    question: "색채 프레젠테이션에서 색견본(Color Sample)의 역할은?",
    options: ["비용 산출", "색채 의도 정확히 전달", "일정 관리", "인력 배치"],
    answer: 1,
    explanation: "색견본은 제안하는 색채를 정확하게 전달하고 확인하는 데 필수적인 도구입니다."
  },
  {
    id: 16,
    question: "색채 지정 시 먼셀 기호 사용의 장점은?",
    options: ["감성적 표현 가능", "객관적이고 표준화된 전달", "비용 절감", "제작 시간 단축"],
    answer: 1,
    explanation: "먼셀 기호는 객관적이고 표준화된 방식으로 색을 지정하여 오류를 줄입니다."
  },
  {
    id: 17,
    question: "컬러 스웻치(Color Swatch)의 용도는?",
    options: ["색채 측정", "색채 비교 및 선택 참고", "조명 조절", "프린터 설정"],
    answer: 1,
    explanation: "컬러 스웻치는 실제 색상 견본을 모아 색채 비교와 선택에 활용합니다."
  },
  {
    id: 18,
    question: "색채 제안서(Color Proposal)에 포함되지 않아도 되는 내용은?",
    options: ["색채 콘셉트", "색채 팔레트", "경쟁사 직원 정보", "적용 예시"],
    answer: 2,
    explanation: "색채 제안서에는 콘셉트, 팔레트, 적용 예시, 색 번호 등이 포함됩니다."
  },
  {
    id: 19,
    question: "색채 시방서(Color Specification)의 주요 내용은?",
    options: ["디자이너 이력", "색채의 정확한 규격과 적용 방법", "회사 연혁", "마케팅 전략"],
    answer: 1,
    explanation: "색채 시방서는 색의 정확한 규격, 재료, 적용 방법 등을 명시한 문서입니다."
  },
  {
    id: 20,
    question: "색채 관리(Color Management)의 목적은?",
    options: ["색채 비용 증가", "입력-출력 장치 간 색 일관성 유지", "색상 수 감소", "디자인 시간 단축"],
    answer: 1,
    explanation: "색채 관리는 모니터, 프린터 등 다양한 장치 간 색의 일관성을 유지하는 것입니다."
  },
  {
    id: 21,
    question: "ICC 프로파일의 역할은?",
    options: ["색채 트렌드 예측", "장치별 색 특성 정보 저장", "이미지 압축", "파일 크기 축소"],
    answer: 1,
    explanation: "ICC 프로파일은 각 장치의 색 재현 특성을 저장하여 색 관리에 활용됩니다."
  },
  {
    id: 22,
    question: "모니터 캘리브레이션(Calibration)의 목적은?",
    options: ["모니터 크기 조절", "모니터 색 재현 정확도 향상", "모니터 수명 연장", "모니터 밝기 최대화"],
    answer: 1,
    explanation: "캘리브레이션은 모니터가 정확한 색을 재현하도록 조정하는 과정입니다."
  },
  {
    id: 23,
    question: "감마(Gamma) 값 조정이 영향을 주는 것은?",
    options: ["색상", "채도", "명도/계조", "해상도"],
    answer: 2,
    explanation: "감마 값은 화면의 밝기와 계조(명암 단계) 표현에 영향을 줍니다."
  },
  {
    id: 24,
    question: "색온도(Color Temperature) 6500K는 어떤 빛을 의미하는가?",
    options: ["붉은 빛(백열등)", "표준 주광(D65)", "푸른 빛", "녹색 빛"],
    answer: 1,
    explanation: "6500K는 표준 주광(D65)으로, 자연광과 유사한 백색광입니다."
  },
  {
    id: 25,
    question: "렌더링 인텐트(Rendering Intent) 중 사진에 적합한 방식은?",
    options: ["채도(Saturation)", "상대 색역(Relative Colorimetric)", "지각적(Perceptual)", "절대 색역(Absolute Colorimetric)"],
    answer: 2,
    explanation: "지각적 렌더링은 전체 톤의 관계를 유지하여 사진 이미지에 적합합니다."
  },
  // 디지털 색채 (13문항)
  {
    id: 26,
    question: "RGB 컬러 모드에서 R=255, G=255, B=255는 무슨 색인가?",
    options: ["검정", "흰색", "빨강", "파랑"],
    answer: 1,
    explanation: "RGB에서 모든 값이 최대(255)이면 빛이 모두 합쳐져 흰색이 됩니다."
  },
  {
    id: 27,
    question: "RGB 컬러 모드에서 R=0, G=0, B=0은 무슨 색인가?",
    options: ["흰색", "검정", "회색", "빨강"],
    answer: 1,
    explanation: "RGB에서 모든 값이 0이면 빛이 없어 검정이 됩니다."
  },
  {
    id: 28,
    question: "CMYK 컬러 모드가 주로 사용되는 분야는?",
    options: ["웹 디자인", "TV 방송", "인쇄", "게임"],
    answer: 2,
    explanation: "CMYK는 감산혼합 방식으로 인쇄 분야에서 사용됩니다."
  },
  {
    id: 29,
    question: "웹 디자인에서 주로 사용하는 컬러 모드는?",
    options: ["CMYK", "RGB", "LAB", "Grayscale"],
    answer: 1,
    explanation: "웹은 모니터 화면으로 표시되므로 빛의 삼원색인 RGB 모드를 사용합니다."
  },
  {
    id: 30,
    question: "HSB 컬러 모드에서 H가 의미하는 것은?",
    options: ["밝기", "채도", "색상", "투명도"],
    answer: 2,
    explanation: "HSB에서 H(Hue)는 색상, S(Saturation)는 채도, B(Brightness)는 밝기입니다."
  },
  {
    id: 31,
    question: "16진수 색상 코드 #FF0000이 나타내는 색은?",
    options: ["파랑", "초록", "빨강", "노랑"],
    answer: 2,
    explanation: "#FF0000은 R=255, G=0, B=0으로 빨강입니다."
  },
  {
    id: 32,
    question: "16진수 색상 코드 #00FF00이 나타내는 색은?",
    options: ["빨강", "초록", "파랑", "노랑"],
    answer: 1,
    explanation: "#00FF00은 R=0, G=255, B=0으로 초록입니다."
  },
  {
    id: 33,
    question: "16진수 색상 코드 #0000FF가 나타내는 색은?",
    options: ["빨강", "초록", "파랑", "검정"],
    answer: 2,
    explanation: "#0000FF는 R=0, G=0, B=255로 파랑입니다."
  },
  {
    id: 34,
    question: "비트 심도(Bit Depth) 8비트일 때 표현 가능한 색상 수는?",
    options: ["16색", "256색", "65,536색", "1600만 색"],
    answer: 1,
    explanation: "8비트는 2^8 = 256가지 색을 표현할 수 있습니다."
  },
  {
    id: 35,
    question: "트루컬러(True Color)라고 불리는 비트 심도는?",
    options: ["8비트", "16비트", "24비트", "32비트"],
    answer: 2,
    explanation: "24비트(RGB 각 8비트)는 약 1677만 색을 표현하여 트루컬러라고 합니다."
  },
  {
    id: 36,
    question: "dpi(dots per inch)가 높을수록 어떻게 되는가?",
    options: ["해상도가 낮아진다", "해상도가 높아진다", "색상 수가 줄어든다", "파일 크기가 작아진다"],
    answer: 1,
    explanation: "dpi가 높을수록 단위 면적당 점(dot) 수가 많아 해상도가 높아집니다."
  },
  {
    id: 37,
    question: "인쇄용 이미지의 권장 해상도는?",
    options: ["72dpi", "150dpi", "300dpi 이상", "50dpi"],
    answer: 2,
    explanation: "인쇄용 이미지는 300dpi 이상의 고해상도를 권장합니다."
  },
  {
    id: 38,
    question: "색역(Color Gamut)에 대한 설명으로 옳은 것은?",
    options: ["색의 무게", "장치가 재현할 수 있는 색 범위", "색의 온도", "색의 면적"],
    answer: 1,
    explanation: "색역은 특정 장치나 색 모델이 재현할 수 있는 색의 범위입니다."
  },
  // 측색과 품질관리 (12문항)
  {
    id: 39,
    question: "측색기(Colorimeter)의 용도는?",
    options: ["온도 측정", "색채 수치 측정", "거리 측정", "습도 측정"],
    answer: 1,
    explanation: "측색기는 색을 객관적인 수치(좌표)로 측정하는 기기입니다."
  },
  {
    id: 40,
    question: "분광광도계(Spectrophotometer)의 특징은?",
    options: ["색상만 측정", "파장별 반사율/투과율 측정", "밝기만 측정", "채도만 측정"],
    answer: 1,
    explanation: "분광광도계는 각 파장별 반사율이나 투과율을 측정하여 정밀한 색 분석이 가능합니다."
  },
  {
    id: 41,
    question: "색차(Color Difference) 공식에서 ΔE가 의미하는 것은?",
    options: ["명도 차이", "색상 차이", "두 색 사이의 총 색 차이", "채도 차이"],
    answer: 2,
    explanation: "ΔE(델타E)는 두 색 사이의 종합적인 색 차이를 수치로 나타낸 것입니다."
  },
  {
    id: 42,
    question: "ΔE 값이 1.0 미만일 때 일반적으로 어떻게 판단하는가?",
    options: ["색 차이가 매우 큼", "색 차이를 거의 느끼지 못함", "완전히 다른 색", "중간 정도 차이"],
    answer: 1,
    explanation: "ΔE < 1.0은 일반적으로 색 차이를 거의 느끼지 못하는 수준입니다."
  },
  {
    id: 43,
    question: "표준광 D65에 대한 설명으로 옳은 것은?",
    options: ["백열등 광원", "평균 주광(6500K)", "형광등 광원", "나트륨 램프"],
    answer: 1,
    explanation: "D65는 색온도 약 6500K의 평균 주광으로, 색채 평가의 표준광입니다."
  },
  {
    id: 44,
    question: "메타머리즘(Metamerism) 현상이란?",
    options: ["색이 항상 같게 보임", "조명에 따라 같은 색이 다르게 보이는 현상", "색이 점점 밝아지는 현상", "색이 사라지는 현상"],
    answer: 1,
    explanation: "메타머리즘은 조명 조건에 따라 동일하게 보이던 두 색이 다르게 보이는 현상입니다."
  },
  {
    id: 45,
    question: "조건등색(Conditional Color Match)이란?",
    options: ["어떤 조명에서도 같은 색", "특정 조명에서만 같게 보이는 색", "무조건 다른 색", "측정이 불가능한 색"],
    answer: 1,
    explanation: "조건등색은 특정 조명 조건에서만 같게 보이고, 조명이 바뀌면 다르게 보이는 것입니다."
  },
  {
    id: 46,
    question: "색채 품질관리(QC)에서 허용 색차의 기준을 정하는 이유는?",
    options: ["비용 절감", "제품 간 색 일관성 유지", "생산 속도 증가", "재료 절약"],
    answer: 1,
    explanation: "허용 색차 기준은 제품 간 색의 일관성을 유지하여 품질을 보장합니다."
  },
  {
    id: 47,
    question: "염료와 안료의 차이점으로 옳은 것은?",
    options: ["염료는 불투명, 안료는 투명", "염료는 용해되고, 안료는 분산됨", "둘 다 같은 성질", "안료만 섬유에 사용"],
    answer: 1,
    explanation: "염료는 용매에 용해되고, 안료는 용매에 용해되지 않고 분산됩니다."
  },
  {
    id: 48,
    question: "내광성(Light Fastness)이란?",
    options: ["물에 대한 저항성", "빛에 의한 변색 저항성", "열에 대한 저항성", "마찰에 대한 저항성"],
    answer: 1,
    explanation: "내광성은 색이 빛(자외선 등)에 노출되어도 변색되지 않는 정도입니다."
  },
  {
    id: 49,
    question: "색채의 견뢰도(Fastness)에 해당하지 않는 것은?",
    options: ["세탁 견뢰도", "마찰 견뢰도", "무게 견뢰도", "일광 견뢰도"],
    answer: 2,
    explanation: "견뢰도는 세탁, 마찰, 일광, 땀 등에 대한 색의 저항성을 나타내며, 무게는 해당되지 않습니다."
  },
  {
    id: 50,
    question: "교정쇄(Color Proof)의 목적은?",
    options: ["디자인 수정", "본인쇄 전 색상 확인", "용지 선택", "인쇄기 점검"],
    answer: 1,
    explanation: "교정쇄는 본인쇄 전에 색상과 디자인을 확인하고 검토하기 위한 것입니다."
  }
];

export default function ColorPracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('colorist-tech-color-practice-progress');
    if (savedProgress) {
      const { score, answered, currentQuestion } = JSON.parse(savedProgress);
      setScore(score);
      setAnsweredQuestions(new Set(answered));
      setCurrentQuestion(currentQuestion);
    }
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('colorist-tech-color-practice-progress', JSON.stringify({
        score,
        answered: Array.from(answeredQuestions),
        currentQuestion
      }));
    }
  }, [score, answeredQuestions, currentQuestion, isClient]);

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;

    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));

    if (index === shuffledQuestions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
    localStorage.removeItem('colorist-tech-color-practice-progress');
  };

  if (!isClient || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/category/design/colorist-technician" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            컬러리스트산업기사로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">색채실무</h1>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>진행률: {answeredQuestions.size}/{questions.length}</span>
              <span>점수: {score}/{answeredQuestions.size}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-sm rounded-full">
                {question.id <= 13 ? '색채 디자인 기초' :
                 question.id <= 25 ? '컬러 커뮤니케이션' :
                 question.id <= 38 ? '디지털 색채' : '측색과 품질관리'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Q{currentQuestion + 1}. {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answeredQuestions.has(currentQuestion)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    answeredQuestions.has(currentQuestion)
                      ? index === question.answer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-rose-400 hover:bg-rose-50'
                  }`}
                >
                  <span className="font-medium">{index + 1}. </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-xl mb-6 ${
              selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-semibold mb-2 ${
                selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === question.answer ? '정답입니다!' : '오답입니다!'}
              </p>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200"
            >
              다시 시작
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">문제 목록</h3>
          <div className="grid grid-cols-10 gap-2">
            {shuffledQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                }}
                className={`w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentQuestion === index
                    ? 'bg-rose-500 text-white'
                    : answeredQuestions.has(index)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
