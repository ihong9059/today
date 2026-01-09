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
  // 색채 대비 (13문항)
  {
    id: 1,
    question: "색상 대비에 대한 설명으로 옳은 것은?",
    options: ["명도 차이에 의한 대비", "채도 차이에 의한 대비", "색상 차이에 의한 대비", "면적 차이에 의한 대비"],
    answer: 2,
    explanation: "색상 대비는 서로 다른 색상이 인접할 때 각 색상의 차이가 더욱 강조되어 보이는 현상입니다."
  },
  {
    id: 2,
    question: "명도 대비에서 회색이 검정 위에서 더 밝게 보이는 이유는?",
    options: ["채도가 높아져서", "색상이 변해서", "주변 명도가 낮아 상대적으로 밝게 보여서", "면적이 넓어져서"],
    answer: 2,
    explanation: "명도 대비는 주변색의 명도에 따라 같은 색이 더 밝거나 어둡게 보이는 현상입니다."
  },
  {
    id: 3,
    question: "채도 대비에 대한 설명으로 옳은 것은?",
    options: ["순색이 탁색 옆에서 더 선명해 보임", "명도가 높아 보이는 현상", "색상이 변해 보이는 현상", "크기가 달라 보이는 현상"],
    answer: 0,
    explanation: "채도 대비는 채도가 다른 두 색이 인접할 때 채도 차이가 더 강조되어 보이는 현상입니다."
  },
  {
    id: 4,
    question: "보색 대비에 대한 설명으로 옳은 것은?",
    options: ["같은 색끼리의 대비", "보색 관계의 색이 서로 더 선명해 보임", "명도만 변해 보임", "면적이 같아 보임"],
    answer: 1,
    explanation: "보색 대비는 보색 관계의 두 색이 인접하면 서로 채도가 높아 보이고 강렬해지는 현상입니다."
  },
  {
    id: 5,
    question: "한난 대비에서 주황색 옆의 노랑이 더 차갑게 느껴지는 이유는?",
    options: ["명도가 높아서", "주변 색보다 상대적으로 차갑기 때문에", "채도가 낮아서", "면적이 작아서"],
    answer: 1,
    explanation: "한난 대비는 따뜻한 색과 차가운 색이 인접할 때 온도감 차이가 강조되는 현상입니다."
  },
  {
    id: 6,
    question: "면적 대비에 대한 설명으로 옳은 것은?",
    options: ["색의 면적에 따라 명도, 채도가 다르게 보임", "색상만 변화함", "명도만 변화함", "채도만 변화함"],
    answer: 0,
    explanation: "면적 대비는 같은 색이라도 면적에 따라 명도와 채도가 다르게 느껴지는 현상입니다."
  },
  {
    id: 7,
    question: "연변 대비(가장자리 대비)에 대한 설명으로 옳은 것은?",
    options: ["색의 중심부가 변해 보임", "색의 경계 부분에서 대비가 강조됨", "전체 색이 변함", "크기가 변해 보임"],
    answer: 1,
    explanation: "연변 대비는 두 색이 접하는 경계 부분에서 대비 효과가 가장 강하게 나타나는 현상입니다."
  },
  {
    id: 8,
    question: "동시 대비에 대한 설명으로 옳은 것은?",
    options: ["시간차를 두고 나타나는 대비", "두 색을 동시에 볼 때 나타나는 대비", "한 색만 볼 때 나타나는 대비", "보색 잔상 현상"],
    answer: 1,
    explanation: "동시 대비는 두 색을 동시에 볼 때 각 색이 서로의 영향을 받아 다르게 보이는 현상입니다."
  },
  {
    id: 9,
    question: "계시 대비(연속 대비)에 대한 설명으로 옳은 것은?",
    options: ["동시에 두 색을 볼 때", "한 색을 본 후 다른 색을 볼 때", "멀리서 볼 때", "가까이서 볼 때"],
    answer: 1,
    explanation: "계시 대비는 한 색을 본 후 다른 색을 볼 때 잔상의 영향으로 색이 다르게 보이는 현상입니다."
  },
  {
    id: 10,
    question: "네온 효과(Neon Effect)가 나타나는 조건은?",
    options: ["보색 배치", "선이나 작은 면적의 색이 배경과 대비될 때", "동일색 배치", "무채색 배경"],
    answer: 1,
    explanation: "네온 효과는 가는 선이나 작은 면적의 색이 배경색과 대비되어 빛나 보이는 현상입니다."
  },
  {
    id: 11,
    question: "리프만 효과(Liebmann Effect)에 대한 설명으로 옳은 것은?",
    options: ["명도 차가 클 때 경계가 뚜렷함", "명도 차가 작고 채도 차가 클 때 경계가 흐릿함", "색상 차가 클 때 발생", "한난 차가 클 때 발생"],
    answer: 1,
    explanation: "리프만 효과는 명도 차가 작고 채도 차만 클 때 색의 경계가 흐릿하게 보이는 현상입니다."
  },
  {
    id: 12,
    question: "색의 동화 현상에 대한 설명으로 옳은 것은?",
    options: ["색이 대비되어 차이가 커 보임", "주변색의 영향으로 비슷하게 보임", "색이 사라져 보임", "색이 진해 보임"],
    answer: 1,
    explanation: "색의 동화는 작은 색 면적이 주변색에 영향받아 비슷하게 변해 보이는 현상입니다."
  },
  {
    id: 13,
    question: "배색에서 세퍼레이션(Separation)의 역할은?",
    options: ["대비를 없애기", "색과 색 사이를 분리하여 조화시킴", "색을 혼합함", "명도를 통일함"],
    answer: 1,
    explanation: "세퍼레이션은 대비가 강한 색 사이에 무채색이나 다른 색을 넣어 완충 역할을 합니다."
  },
  // 색채 조화 (12문항)
  {
    id: 14,
    question: "보색 조화에 해당하는 것은?",
    options: ["빨강-노랑", "파랑-초록", "빨강-초록", "노랑-주황"],
    answer: 2,
    explanation: "보색 조화는 색상환에서 서로 마주보는 색의 조합으로, 빨강-초록이 대표적입니다."
  },
  {
    id: 15,
    question: "유사색 조화에 대한 설명으로 옳은 것은?",
    options: ["보색끼리의 배색", "인접한 색상끼리의 배색", "무채색 배색", "모든 색을 사용한 배색"],
    answer: 1,
    explanation: "유사색 조화는 색상환에서 인접한 색상끼리 배색하는 것으로 통일감이 있습니다."
  },
  {
    id: 16,
    question: "트라이어드(Triad) 배색이란?",
    options: ["2색 배색", "색상환에서 등간격 3색 배색", "보색 배색", "단색 배색"],
    answer: 1,
    explanation: "트라이어드는 색상환에서 정삼각형을 이루는 세 색의 조합으로, 균형 잡힌 배색입니다."
  },
  {
    id: 17,
    question: "테트라드(Tetrad) 배색이란?",
    options: ["3색 배색", "4색 배색(사각형 배치)", "2색 배색", "단색 배색"],
    answer: 1,
    explanation: "테트라드는 색상환에서 사각형(정사각형 또는 직사각형)을 이루는 네 색의 조합입니다."
  },
  {
    id: 18,
    question: "스플릿 보색 조화란?",
    options: ["보색의 양쪽 인접색을 사용", "동일 색상만 사용", "무채색만 사용", "한 색상만 사용"],
    answer: 0,
    explanation: "스플릿 보색(분열 보색)은 한 색과 그 보색의 양쪽 인접색을 조합한 배색입니다."
  },
  {
    id: 19,
    question: "톤 온 톤(Tone on Tone) 배색이란?",
    options: ["보색 배색", "동일 색상의 다른 톤 배색", "무채색 배색", "난색 배색"],
    answer: 1,
    explanation: "톤 온 톤은 동일한 색상에서 명도나 채도가 다른 톤을 조합한 배색입니다."
  },
  {
    id: 20,
    question: "톤 인 톤(Tone in Tone) 배색이란?",
    options: ["동일 톤의 다른 색상 배색", "보색 배색", "무채색 배색", "단색 배색"],
    answer: 0,
    explanation: "톤 인 톤은 동일한 톤에서 다른 색상을 조합한 배색으로 통일감이 있습니다."
  },
  {
    id: 21,
    question: "도미넌트 컬러(Dominant Color) 배색이란?",
    options: ["모든 색을 균등하게 사용", "하나의 색상을 주조색으로 통일", "무채색만 사용", "보색만 사용"],
    answer: 1,
    explanation: "도미넌트 컬러는 하나의 색상이 지배적인 배색으로, 색상의 통일감을 줍니다."
  },
  {
    id: 22,
    question: "그라데이션(Gradation) 배색이란?",
    options: ["명도나 채도가 단계적으로 변화하는 배색", "대비가 강한 배색", "무채색 배색", "보색 배색"],
    answer: 0,
    explanation: "그라데이션은 색상, 명도, 채도가 점진적으로 변화하는 배색입니다."
  },
  {
    id: 23,
    question: "악센트 컬러(Accent Color)의 역할은?",
    options: ["전체를 통일시킴", "작은 면적으로 강조점 제공", "대비를 약화시킴", "배경색 역할"],
    answer: 1,
    explanation: "악센트 컬러는 작은 면적에 사용하여 시각적 강조점을 만드는 색입니다."
  },
  {
    id: 24,
    question: "베이스 컬러(Base Color)에 대한 설명으로 옳은 것은?",
    options: ["가장 작은 면적의 색", "가장 넓은 면적을 차지하는 기본색", "보조색", "강조색"],
    answer: 1,
    explanation: "베이스 컬러는 전체 배색에서 가장 넓은 면적을 차지하는 기본색입니다."
  },
  {
    id: 25,
    question: "먼셀의 조화론에서 강조하는 것은?",
    options: ["보색만 조화됨", "균형과 질서", "혼색만 조화됨", "무채색만 조화됨"],
    answer: 1,
    explanation: "먼셀의 조화론은 색채의 균형과 질서를 중시하며, 중성색으로의 혼합을 강조합니다."
  },
  // 색채 심리와 감정 (13문항)
  {
    id: 26,
    question: "난색(Warm Color)에 해당하지 않는 것은?",
    options: ["빨강", "주황", "노랑", "파랑"],
    answer: 3,
    explanation: "파랑은 한색(Cool Color)에 해당합니다. 난색은 빨강, 주황, 노랑 등입니다."
  },
  {
    id: 27,
    question: "한색이 주는 심리적 효과로 옳은 것은?",
    options: ["따뜻하고 활동적인 느낌", "차갑고 진정되는 느낌", "무거운 느낌", "탁한 느낌"],
    answer: 1,
    explanation: "한색(파랑, 청록 등)은 차갑고 시원하며 진정되는 심리적 효과를 줍니다."
  },
  {
    id: 28,
    question: "고명도 색이 주는 느낌으로 옳은 것은?",
    options: ["무겁고 안정적", "가볍고 부드러움", "탁하고 칙칙함", "어둡고 우울함"],
    answer: 1,
    explanation: "고명도 색은 밝아서 가볍고 부드러운 느낌을 줍니다."
  },
  {
    id: 29,
    question: "저명도 색이 주는 느낌으로 옳은 것은?",
    options: ["가볍고 경쾌함", "무겁고 안정적", "화려함", "시원함"],
    answer: 1,
    explanation: "저명도 색은 어두워서 무겁고 안정적이며 중후한 느낌을 줍니다."
  },
  {
    id: 30,
    question: "고채도 색이 주는 심리적 효과는?",
    options: ["차분하고 온화함", "강렬하고 역동적", "우울하고 침체됨", "무겁고 어두움"],
    answer: 1,
    explanation: "고채도 색은 선명하고 강렬하여 역동적이고 활기찬 느낌을 줍니다."
  },
  {
    id: 31,
    question: "빨강색이 주는 일반적인 심리 효과는?",
    options: ["차분함, 평화", "정열, 흥분, 에너지", "슬픔, 우울", "신비, 고급"],
    answer: 1,
    explanation: "빨강은 정열, 흥분, 에너지, 열정 등 적극적이고 역동적인 느낌을 줍니다."
  },
  {
    id: 32,
    question: "파랑색이 주는 일반적인 심리 효과는?",
    options: ["흥분, 자극", "신뢰, 평화, 안정", "위험, 경고", "식욕 증진"],
    answer: 1,
    explanation: "파랑은 신뢰, 평화, 안정, 차분함 등 진정 효과가 있는 색입니다."
  },
  {
    id: 33,
    question: "노랑색이 주는 일반적인 심리 효과는?",
    options: ["우울, 슬픔", "밝음, 희망, 주의", "차가움, 냉정", "무거움, 안정"],
    answer: 1,
    explanation: "노랑은 밝고 희망적이며, 주의를 끄는 효과가 있어 경고색으로도 사용됩니다."
  },
  {
    id: 34,
    question: "초록색이 주는 일반적인 심리 효과는?",
    options: ["흥분, 자극", "자연, 안정, 평화", "위험, 경고", "정열, 에너지"],
    answer: 1,
    explanation: "초록은 자연을 연상시키며 안정, 평화, 편안함, 휴식의 느낌을 줍니다."
  },
  {
    id: 35,
    question: "보라색이 주는 일반적인 심리 효과는?",
    options: ["에너지, 열정", "신비, 고급, 창의성", "자연, 건강", "순수, 청결"],
    answer: 1,
    explanation: "보라는 신비, 고급스러움, 창의성, 영성 등의 느낌을 줍니다."
  },
  {
    id: 36,
    question: "흰색이 주는 일반적인 심리 효과는?",
    options: ["무거움, 답답함", "순수, 청결, 순결", "우울, 슬픔", "위험, 경고"],
    answer: 1,
    explanation: "흰색은 순수, 청결, 순결, 시작, 평화 등의 느낌을 줍니다."
  },
  {
    id: 37,
    question: "검정색이 주는 일반적인 심리 효과는?",
    options: ["밝음, 경쾌함", "고급, 권위, 엄숙", "자연, 건강", "순수, 청결"],
    answer: 1,
    explanation: "검정은 고급스러움, 권위, 엄숙함, 세련됨, 신비로움 등의 느낌을 줍니다."
  },
  {
    id: 38,
    question: "색의 진출색과 후퇴색에 대한 설명으로 옳은 것은?",
    options: ["한색이 진출색", "난색이 후퇴색", "난색이 진출색, 한색이 후퇴색", "명도와 무관함"],
    answer: 2,
    explanation: "난색과 고명도색은 앞으로 나와 보이는 진출색, 한색과 저명도색은 후퇴색입니다."
  },
  // 색채 활용 (12문항)
  {
    id: 39,
    question: "색의 팽창색과 수축색에 대한 설명으로 옳은 것은?",
    options: ["한색이 팽창색", "고명도색이 팽창색, 저명도색이 수축색", "저명도색이 팽창색", "채도와 관련됨"],
    answer: 1,
    explanation: "고명도의 밝은 색은 실제보다 크게(팽창), 저명도의 어두운 색은 작게(수축) 보입니다."
  },
  {
    id: 40,
    question: "경량색과 중량색에 대한 설명으로 옳은 것은?",
    options: ["한색이 중량색", "고명도가 경량색, 저명도가 중량색", "난색이 경량색", "채도가 높으면 중량색"],
    answer: 1,
    explanation: "고명도의 밝은 색은 가볍게(경량색), 저명도의 어두운 색은 무겁게(중량색) 느껴집니다."
  },
  {
    id: 41,
    question: "흥분색과 진정색에 대한 설명으로 옳은 것은?",
    options: ["한색이 흥분색", "난색이 진정색", "난색, 고채도가 흥분색", "저채도가 흥분색"],
    answer: 2,
    explanation: "난색과 고채도 색은 흥분 효과, 한색과 저채도 색은 진정 효과가 있습니다."
  },
  {
    id: 42,
    question: "식품 포장에서 피해야 할 색은?",
    options: ["빨강, 주황", "노랑, 연두", "파랑, 보라", "갈색, 베이지"],
    answer: 2,
    explanation: "파랑, 보라는 식욕을 감퇴시키므로 식품 포장에서는 주로 피합니다."
  },
  {
    id: 43,
    question: "병원에서 초록색이 많이 사용되는 이유는?",
    options: ["흥분을 유발하기 위해", "눈의 피로를 줄이고 안정감을 주기 위해", "경고하기 위해", "고급스러워 보이기 위해"],
    answer: 1,
    explanation: "초록은 눈의 피로를 줄이고 안정감을 주며, 수술복에서는 붉은 잔상을 중화합니다."
  },
  {
    id: 44,
    question: "안전색채에서 빨강이 나타내는 의미는?",
    options: ["주의", "위험, 금지, 정지", "안전, 진행", "지시, 안내"],
    answer: 1,
    explanation: "안전색채에서 빨강은 위험, 금지, 정지, 방화를 나타냅니다."
  },
  {
    id: 45,
    question: "안전색채에서 노랑이 나타내는 의미는?",
    options: ["위험, 금지", "주의, 경고", "안전, 진행", "지시"],
    answer: 1,
    explanation: "안전색채에서 노랑은 주의, 경고를 나타내며 시인성이 높습니다."
  },
  {
    id: 46,
    question: "안전색채에서 초록이 나타내는 의미는?",
    options: ["위험, 금지", "주의, 경고", "안전, 진행, 구호", "지시, 안내"],
    answer: 2,
    explanation: "안전색채에서 초록은 안전, 진행, 구호, 피난을 나타냅니다."
  },
  {
    id: 47,
    question: "안전색채에서 파랑이 나타내는 의미는?",
    options: ["위험", "경고", "지시, 안내", "정지"],
    answer: 2,
    explanation: "안전색채에서 파랑은 지시, 안내의 의미로 사용됩니다."
  },
  {
    id: 48,
    question: "시인성(Visibility)에 대한 설명으로 옳은 것은?",
    options: ["색의 아름다움", "색이 눈에 잘 띄는 정도", "색의 조화", "색의 무게감"],
    answer: 1,
    explanation: "시인성은 색이 주변과 구별되어 눈에 잘 띄는 정도를 말합니다."
  },
  {
    id: 49,
    question: "명시성이 가장 높은 배색 조합은?",
    options: ["검정 위에 노랑", "흰색 위에 연노랑", "파랑 위에 보라", "초록 위에 파랑"],
    answer: 0,
    explanation: "명시성은 명도 대비가 클수록 높으며, 검정 위의 노랑이 가장 명시성이 높습니다."
  },
  {
    id: 50,
    question: "유목성(Attention Value)에 대한 설명으로 옳은 것은?",
    options: ["색의 조화도", "무의식적으로 시선을 끄는 정도", "색의 명도", "색의 채도"],
    answer: 1,
    explanation: "유목성은 색이 무의식적으로 시선을 끌어당기는 정도로, 난색과 고채도색이 높습니다."
  }
];

export default function ColorApplicationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('colorist-tech-color-application-progress');
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
      localStorage.setItem('colorist-tech-color-application-progress', JSON.stringify({
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
    localStorage.removeItem('colorist-tech-color-application-progress');
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
            <h1 className="text-2xl font-bold text-gray-800">색채응용</h1>
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
                {question.id <= 13 ? '색채 대비' :
                 question.id <= 25 ? '색채 조화' :
                 question.id <= 38 ? '색채 심리와 감정' : '색채 활용'}
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
