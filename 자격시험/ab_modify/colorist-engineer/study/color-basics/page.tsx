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
  // 색의 3속성 (1-12)
  {
    id: 1,
    question: "색의 3속성에 해당하지 않는 것은?",
    options: ["색상(Hue)", "명도(Value)", "채도(Chroma)", "투명도(Transparency)"],
    answer: 3,
    explanation: "색의 3속성은 색상(Hue), 명도(Value/Lightness), 채도(Chroma/Saturation)입니다. 투명도는 색의 3속성에 포함되지 않습니다."
  },
  {
    id: 2,
    question: "색상(Hue)에 대한 설명으로 옳은 것은?",
    options: ["색의 밝고 어두운 정도", "색의 맑고 탁한 정도", "빨강, 노랑, 파랑 등 색을 구별하는 속성", "색의 무게감"],
    answer: 2,
    explanation: "색상(Hue)은 빨강, 주황, 노랑, 녹색, 파랑, 보라 등 색을 서로 구별할 수 있게 해주는 색의 종류를 말합니다."
  },
  {
    id: 3,
    question: "명도(Value)가 가장 높은 색은?",
    options: ["검정", "흰색", "회색", "빨강"],
    answer: 1,
    explanation: "명도는 색의 밝고 어두운 정도를 나타내며, 흰색이 명도가 가장 높고 검정이 가장 낮습니다."
  },
  {
    id: 4,
    question: "채도(Chroma)에 대한 설명으로 옳은 것은?",
    options: ["색의 밝기 정도", "색의 순수하고 선명한 정도", "색의 따뜻하고 차가운 느낌", "색의 무게감"],
    answer: 1,
    explanation: "채도는 색의 맑고 탁한 정도, 즉 색의 순수성이나 선명도를 나타냅니다. 순색에 가까울수록 채도가 높습니다."
  },
  {
    id: 5,
    question: "무채색의 특징으로 옳은 것은?",
    options: ["색상과 채도가 있다", "명도만 있고 색상과 채도가 없다", "채도만 있다", "색상만 있다"],
    answer: 1,
    explanation: "무채색(흰색, 회색, 검정)은 색상과 채도가 없고 명도만 있는 색입니다."
  },
  {
    id: 6,
    question: "유채색에 대한 설명으로 옳은 것은?",
    options: ["흰색, 회색, 검정만 해당", "색상, 명도, 채도를 모두 가진 색", "명도만 있는 색", "투명한 색"],
    answer: 1,
    explanation: "유채색은 빨강, 노랑, 파랑 등 색상을 가진 색으로, 색상, 명도, 채도의 3속성을 모두 가지고 있습니다."
  },
  {
    id: 7,
    question: "순색(Pure Color)에 대한 설명으로 옳은 것은?",
    options: ["흰색이나 검정이 섞이지 않은 가장 선명한 색", "가장 어두운 색", "가장 밝은 색", "무채색"],
    answer: 0,
    explanation: "순색은 흰색이나 검정이 섞이지 않은 가장 순수하고 선명한 색으로, 해당 색상에서 채도가 가장 높습니다."
  },
  {
    id: 8,
    question: "명청색(Tint)은 어떻게 만들어지는가?",
    options: ["순색에 검정을 섞음", "순색에 흰색을 섞음", "순색에 회색을 섞음", "순색에 보색을 섞음"],
    answer: 1,
    explanation: "명청색(Tint)은 순색에 흰색을 섞어 만든 밝고 연한 색입니다."
  },
  {
    id: 9,
    question: "암청색(Shade)은 어떻게 만들어지는가?",
    options: ["순색에 흰색을 섞음", "순색에 검정을 섞음", "순색에 보색을 섞음", "순색에 유사색을 섞음"],
    answer: 1,
    explanation: "암청색(Shade)은 순색에 검정을 섞어 만든 어둡고 진한 색입니다."
  },
  {
    id: 10,
    question: "탁색(Tone)은 어떻게 만들어지는가?",
    options: ["순색에 흰색만 섞음", "순색에 검정만 섞음", "순색에 회색(흰색+검정)을 섞음", "순색끼리 섞음"],
    answer: 2,
    explanation: "탁색(Tone)은 순색에 회색을 섞어 만든 탁한 색으로, 채도가 낮아집니다."
  },
  {
    id: 11,
    question: "색의 3속성 중 색온도(따뜻함/차가움)와 가장 관련 있는 것은?",
    options: ["명도", "채도", "색상", "투명도"],
    answer: 2,
    explanation: "색온도는 주로 색상과 관련됩니다. 빨강, 주황, 노랑 계열은 따뜻한 색, 파랑, 청록 계열은 차가운 색으로 느껴집니다."
  },
  {
    id: 12,
    question: "고명도, 저채도의 색은 어떤 느낌을 주는가?",
    options: ["강렬하고 화려한 느낌", "부드럽고 연한 느낌", "무겁고 어두운 느낌", "탁하고 칙칙한 느낌"],
    answer: 1,
    explanation: "고명도, 저채도의 색은 파스텔톤처럼 부드럽고 연한 느낌을 줍니다."
  },

  // 색채 지각 (13-25)
  {
    id: 13,
    question: "눈의 망막에서 색을 감지하는 세포는?",
    options: ["간상세포만", "원추세포만", "간상세포와 원추세포 모두", "수정체"],
    answer: 2,
    explanation: "간상세포는 명암을 감지하고, 원추세포는 색을 감지합니다. 두 세포 모두 색채 지각에 관여합니다."
  },
  {
    id: 14,
    question: "원추세포(Cone Cell)의 종류가 아닌 것은?",
    options: ["L-원추세포(적색)", "M-원추세포(녹색)", "S-원추세포(청색)", "Y-원추세포(황색)"],
    answer: 3,
    explanation: "원추세포는 L(장파장-적색), M(중파장-녹색), S(단파장-청색) 세 종류가 있습니다. 황색 전용 원추세포는 없습니다."
  },
  {
    id: 15,
    question: "가시광선의 파장 범위로 옳은 것은?",
    options: ["약 100~300nm", "약 380~780nm", "약 800~1000nm", "약 1000~2000nm"],
    answer: 1,
    explanation: "가시광선은 약 380nm(보라색)에서 780nm(빨간색) 사이의 파장을 가진 빛입니다."
  },
  {
    id: 16,
    question: "빨간색 빛의 파장 특성으로 옳은 것은?",
    options: ["단파장", "중파장", "장파장", "초단파장"],
    answer: 2,
    explanation: "빨간색은 약 620~780nm의 장파장에 해당합니다. 파란색은 단파장, 녹색은 중파장입니다."
  },
  {
    id: 17,
    question: "색순응(Chromatic Adaptation)에 대한 설명으로 옳은 것은?",
    options: ["특정 색에 적응하여 그 색을 더 강하게 느끼는 현상", "특정 색에 오래 노출되면 그 색에 대한 감도가 낮아지는 현상", "어두운 곳에서 밝은 곳으로 적응하는 현상", "색맹이 되는 현상"],
    answer: 1,
    explanation: "색순응은 특정 색에 오래 노출되면 원추세포의 감도가 낮아져 그 색을 덜 느끼게 되는 현상입니다."
  },
  {
    id: 18,
    question: "암순응(Dark Adaptation)에 대한 설명으로 옳은 것은?",
    options: ["밝은 곳에서 어두운 곳으로 갈 때 적응하는 과정", "어두운 곳에서 밝은 곳으로 갈 때 적응하는 과정", "색을 구분하는 능력이 높아지는 과정", "명도 지각이 낮아지는 과정"],
    answer: 0,
    explanation: "암순응은 밝은 곳에서 어두운 곳으로 이동할 때 눈이 적응하는 과정으로, 약 30분 정도 소요됩니다."
  },
  {
    id: 19,
    question: "명순응(Light Adaptation)에 대한 설명으로 옳은 것은?",
    options: ["약 30분 정도 소요", "약 1~2분 정도로 빠르게 진행", "간상세포의 활성화", "로돕신 재합성"],
    answer: 1,
    explanation: "명순응은 어두운 곳에서 밝은 곳으로 이동할 때의 적응으로, 암순응보다 훨씬 빠르게 약 1~2분 내에 이루어집니다."
  },
  {
    id: 20,
    question: "푸르킨예 현상(Purkinje Effect)에 대한 설명으로 옳은 것은?",
    options: ["밝은 곳에서 색이 더 선명해지는 현상", "어두워지면 적색보다 청색이 더 밝게 보이는 현상", "색이 확대되어 보이는 현상", "색이 왜곡되어 보이는 현상"],
    answer: 1,
    explanation: "푸르킨예 현상은 조도가 낮아지면 장파장(적색)보다 단파장(청색)의 밝기가 상대적으로 높아 보이는 현상입니다."
  },
  {
    id: 21,
    question: "색의 항상성(Color Constancy)에 대한 설명으로 옳은 것은?",
    options: ["조명이 바뀌어도 물체의 색을 일정하게 인식하는 현상", "색이 항상 변하는 현상", "모든 색이 같아 보이는 현상", "색을 구분하지 못하는 현상"],
    answer: 0,
    explanation: "색의 항상성은 광원의 변화에도 불구하고 물체의 색을 비교적 일정하게 인식하는 지각 현상입니다."
  },
  {
    id: 22,
    question: "색각 이상 중 가장 흔한 유형은?",
    options: ["제1색맹(적색맹)", "제2색맹(녹색맹)", "제3색맹(청황색맹)", "전색맹"],
    answer: 1,
    explanation: "제2색맹(녹색맹)이 가장 흔하며, 남성의 약 5%가 해당합니다. 적녹색맹이 청황색맹보다 훨씬 흔합니다."
  },
  {
    id: 23,
    question: "색각 이상이 남성에게 더 많이 나타나는 이유는?",
    options: ["환경적 요인", "X염색체 열성 유전", "Y염색체 우성 유전", "식습관의 차이"],
    answer: 1,
    explanation: "색각 이상은 X염색체 열성 유전이므로, X염색체가 하나인 남성이 여성보다 발현 확률이 높습니다."
  },
  {
    id: 24,
    question: "메타머리즘(Metamerism)에 대한 설명으로 옳은 것은?",
    options: ["같은 색이 항상 같게 보이는 현상", "분광 조성이 다른 색이 특정 조명에서 같게 보이는 현상", "색이 더 선명하게 보이는 현상", "색이 희미해지는 현상"],
    answer: 1,
    explanation: "메타머리즘은 분광 조성이 다른 두 색이 특정 광원에서는 같아 보이지만 다른 광원에서는 달라 보이는 현상입니다."
  },
  {
    id: 25,
    question: "연색성(Color Rendering)이 좋은 광원의 특징은?",
    options: ["특정 파장만 방출", "모든 파장을 균일하게 방출", "적외선을 많이 방출", "자외선을 많이 방출"],
    answer: 1,
    explanation: "연색성이 좋은 광원은 가시광선의 모든 파장을 균일하게 방출하여 물체의 색을 자연스럽게 보이게 합니다."
  },

  // 색의 혼합 (26-38)
  {
    id: 26,
    question: "가산혼합(Additive Color Mixing)의 3원색은?",
    options: ["빨강, 노랑, 파랑", "빨강, 녹색, 파랑", "시안, 마젠타, 노랑", "빨강, 녹색, 노랑"],
    answer: 1,
    explanation: "가산혼합(빛의 혼합)의 3원색은 빨강(R), 녹색(G), 파랑(B)입니다."
  },
  {
    id: 27,
    question: "감산혼합(Subtractive Color Mixing)의 3원색은?",
    options: ["빨강, 녹색, 파랑", "시안, 마젠타, 노랑", "빨강, 노랑, 파랑", "흰색, 회색, 검정"],
    answer: 1,
    explanation: "감산혼합(물감/잉크의 혼합)의 3원색은 시안(C), 마젠타(M), 노랑(Y)입니다."
  },
  {
    id: 28,
    question: "가산혼합에서 빨강(R)과 녹색(G)을 혼합하면?",
    options: ["시안", "마젠타", "노랑", "검정"],
    answer: 2,
    explanation: "가산혼합에서 R+G=Yellow(노랑)입니다."
  },
  {
    id: 29,
    question: "가산혼합에서 빨강, 녹색, 파랑을 모두 혼합하면?",
    options: ["검정", "흰색", "회색", "갈색"],
    answer: 1,
    explanation: "가산혼합에서 R+G+B=White(흰색)입니다. 빛을 더할수록 밝아집니다."
  },
  {
    id: 30,
    question: "감산혼합에서 시안, 마젠타, 노랑을 모두 혼합하면?",
    options: ["흰색", "검정", "회색", "갈색"],
    answer: 1,
    explanation: "감산혼합에서 C+M+Y=Black(검정)입니다. 물감을 섞을수록 어두워집니다(이론적으로)."
  },
  {
    id: 31,
    question: "감산혼합에서 시안(C)과 마젠타(M)를 혼합하면?",
    options: ["빨강", "파랑", "녹색", "노랑"],
    answer: 1,
    explanation: "감산혼합에서 C+M=Blue(파랑)입니다."
  },
  {
    id: 32,
    question: "감산혼합에서 마젠타(M)와 노랑(Y)을 혼합하면?",
    options: ["시안", "파랑", "빨강", "녹색"],
    answer: 2,
    explanation: "감산혼합에서 M+Y=Red(빨강)입니다."
  },
  {
    id: 33,
    question: "병치혼합(Optical Mixing)의 예시로 적절한 것은?",
    options: ["물감 섞기", "TV 화면의 픽셀", "프리즘", "거울 반사"],
    answer: 1,
    explanation: "병치혼합은 가까이 있는 색점들이 멀리서 볼 때 혼합되어 보이는 현상으로, TV 화면, 인상파 점묘법 등이 예입니다."
  },
  {
    id: 34,
    question: "회전혼합(Rotary Mixing)의 특징은?",
    options: ["감산혼합의 일종", "빛의 혼합", "시간적 가산혼합", "물리적 혼합"],
    answer: 2,
    explanation: "회전혼합은 색 원판을 빠르게 회전시킬 때 색이 혼합되어 보이는 현상으로, 시간적 가산혼합입니다."
  },
  {
    id: 35,
    question: "중간혼합(Intermediate Mixing)에 해당하는 것은?",
    options: ["물감 혼합", "빛의 혼합", "병치혼합, 회전혼합", "프리즘 분광"],
    answer: 2,
    explanation: "중간혼합은 가산도 감산도 아닌 중간적 특성을 가진 혼합으로, 병치혼합과 회전혼합이 해당합니다."
  },
  {
    id: 36,
    question: "인쇄에서 CMYK의 K가 의미하는 것은?",
    options: ["Key(검정)", "Khaki(카키)", "Korea", "Kind"],
    answer: 0,
    explanation: "CMYK에서 K는 Key(검정)를 의미합니다. Black의 B가 Blue와 혼동되어 K를 사용합니다."
  },
  {
    id: 37,
    question: "가산혼합이 적용되는 분야가 아닌 것은?",
    options: ["TV 모니터", "무대 조명", "스마트폰 화면", "유화 물감"],
    answer: 3,
    explanation: "유화 물감은 감산혼합이 적용됩니다. TV, 모니터, 조명 등은 빛을 사용하므로 가산혼합입니다."
  },
  {
    id: 38,
    question: "점묘법(Pointillism)에서 사용하는 혼합 방식은?",
    options: ["감산혼합", "가산혼합", "병치혼합", "회전혼합"],
    answer: 2,
    explanation: "점묘법은 색점을 나란히 배치하여 멀리서 볼 때 색이 혼합되어 보이게 하는 병치혼합을 이용합니다."
  },

  // 색채 용어 및 개념 (39-50)
  {
    id: 39,
    question: "보색(Complementary Color)에 대한 설명으로 옳은 것은?",
    options: ["인접한 색", "색상환에서 서로 마주보는 색", "같은 톤의 색", "명도가 같은 색"],
    answer: 1,
    explanation: "보색은 색상환에서 서로 마주보는(180도) 위치에 있는 색으로, 혼합하면 무채색이 됩니다."
  },
  {
    id: 40,
    question: "유사색(Analogous Color)에 대한 설명으로 옳은 것은?",
    options: ["색상환에서 마주보는 색", "색상환에서 인접한 색", "명도가 같은 색", "채도가 같은 색"],
    answer: 1,
    explanation: "유사색은 색상환에서 서로 인접해 있는 색으로, 조화롭고 통일감 있는 배색에 사용됩니다."
  },
  {
    id: 41,
    question: "난색(Warm Color)에 해당하지 않는 것은?",
    options: ["빨강", "주황", "노랑", "파랑"],
    answer: 3,
    explanation: "난색은 따뜻한 느낌의 색으로 빨강, 주황, 노랑 등이 해당합니다. 파랑은 한색(차가운 색)입니다."
  },
  {
    id: 42,
    question: "한색(Cool Color)에 해당하는 것은?",
    options: ["빨강", "주황", "파랑", "노랑"],
    answer: 2,
    explanation: "한색은 차가운 느낌의 색으로 파랑, 청록, 보라 등이 해당합니다."
  },
  {
    id: 43,
    question: "톤(Tone)에 대한 설명으로 옳은 것은?",
    options: ["색상만을 의미", "명도와 채도의 복합 개념", "채도만을 의미", "색온도를 의미"],
    answer: 1,
    explanation: "톤은 명도와 채도를 복합적으로 나타내는 개념으로, 비비드, 페일, 딥 등으로 표현됩니다."
  },
  {
    id: 44,
    question: "비비드 톤(Vivid Tone)의 특징은?",
    options: ["저명도, 저채도", "고명도, 저채도", "고채도의 순색에 가까운 선명한 색", "무채색에 가까운 색"],
    answer: 2,
    explanation: "비비드 톤은 순색에 가까운 가장 선명하고 강렬한 색으로, 채도가 가장 높습니다."
  },
  {
    id: 45,
    question: "페일 톤(Pale Tone)의 특징은?",
    options: ["어둡고 진한 색", "밝고 연한 색", "선명하고 강렬한 색", "탁하고 칙칙한 색"],
    answer: 1,
    explanation: "페일 톤은 고명도, 저채도의 밝고 연한 파스텔 톤입니다."
  },
  {
    id: 46,
    question: "딥 톤(Deep Tone)의 특징은?",
    options: ["밝고 연한 색", "어둡고 진한 색", "탁한 중간 톤", "무채색에 가까운 색"],
    answer: 1,
    explanation: "딥 톤은 저명도, 고채도의 어둡고 깊은 느낌의 진한 색입니다."
  },
  {
    id: 47,
    question: "그레이시 톤(Grayish Tone)의 특징은?",
    options: ["선명한 색", "회색이 많이 섞인 탁한 색", "순색에 가까운 색", "고명도의 밝은 색"],
    answer: 1,
    explanation: "그레이시 톤은 회색이 많이 섞여 탁하고 차분한 느낌의 저채도 색입니다."
  },
  {
    id: 48,
    question: "중성색(Neutral Color)에 해당하는 것은?",
    options: ["빨강", "파랑", "녹색", "보라"],
    answer: 2,
    explanation: "중성색은 난색도 한색도 아닌 중간적 성질의 색으로, 녹색과 보라가 해당합니다."
  },
  {
    id: 49,
    question: "팬톤(Pantone), DIC 등은 어떤 시스템인가?",
    options: ["조명 시스템", "색채 표준화 시스템", "인쇄 기계", "카메라 시스템"],
    answer: 1,
    explanation: "팬톤, DIC 등은 색을 표준화하여 정확하게 지정하고 재현하기 위한 색채 표준화 시스템입니다."
  },
  {
    id: 50,
    question: "색의 3속성을 활용한 색 표기 방법의 예시는?",
    options: ["RGB(255,0,0)", "HV/C 표기법 (예: 5R 4/14)", "#FF0000", "온도(K)"],
    answer: 1,
    explanation: "HV/C(색상 명도/채도) 표기법은 먼셀 시스템에서 사용하는 방식으로, 5R 4/14는 빨강 계열 색상, 명도 4, 채도 14를 의미합니다."
  }
];

export default function ColorBasicsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorist-engineer-color-basics-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorist-engineer-color-basics-progress', JSON.stringify({
      score,
      answered: Array.from(answeredQuestions),
      current: currentQuestion
    }));
  }, [score, answeredQuestions, currentQuestion]);

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestion);
    setAnsweredQuestions(newAnswered);

    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (newAnswered.size === questions.length) {
      setIsComplete(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
    setIsComplete(false);
    localStorage.removeItem('colorist-engineer-color-basics-progress');
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-2">
            <Link href="/category/design/colorist-engineer" className="hover:text-white transition-colors">
              컬러리스트기사
            </Link>
            <span>/</span>
            <span>색채기초</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">색채기초</h1>
          <p className="text-pink-100">색의 3속성, 색채 지각, 색의 혼합</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-gray-600">진행률</span>
              <span className="ml-2 font-bold text-pink-600">{answeredQuestions.size}/{questions.length}</span>
            </div>
            <div>
              <span className="text-gray-600">점수</span>
              <span className="ml-2 font-bold text-purple-600">{score}점</span>
            </div>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              초기화
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentQuestion === index
                    ? 'bg-pink-600 text-white'
                    : answeredQuestions.has(index)
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-medium">
              문제 {currentQuestion + 1}
            </span>
            {currentQuestion < 12 && (
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">색의 3속성</span>
            )}
            {currentQuestion >= 12 && currentQuestion < 25 && (
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">색채 지각</span>
            )}
            {currentQuestion >= 25 && currentQuestion < 38 && (
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">색의 혼합</span>
            )}
            {currentQuestion >= 38 && (
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">색채 용어</span>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answeredQuestions.has(currentQuestion)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answeredQuestions.has(currentQuestion)
                    ? index === question.answer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-gray-200 hover:border-pink-400 hover:bg-pink-50'
                }`}
              >
                <span className="font-medium mr-3">{index + 1}.</span>
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl ${
              selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === question.answer ? (
                  <span className="text-green-600 font-bold">✓ 정답입니다!</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ 오답입니다. 정답은 {question.answer + 1}번입니다.</span>
                )}
              </div>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-medium"
          >
            ← 이전 문제
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium"
          >
            다음 문제 →
          </button>
        </div>

        {/* Complete Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3>
              <p className="text-gray-600 mb-4">색채기초 과목을 모두 풀었습니다.</p>
              <div className="text-4xl font-bold text-pink-600 mb-6">{score} / {questions.length}</div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
                >
                  다시 풀기
                </button>
                <Link
                  href="/category/design/colorist-engineer"
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-colors font-medium"
                >
                  메인으로
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
