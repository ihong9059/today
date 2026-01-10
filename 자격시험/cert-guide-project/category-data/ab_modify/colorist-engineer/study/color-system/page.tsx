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
  // 먼셀 색체계 (1-15)
  {
    id: 1,
    question: "먼셀 색체계의 3속성 표기 순서로 옳은 것은?",
    options: ["명도/색상 채도", "색상 명도/채도", "채도 명도/색상", "색상/채도 명도"],
    answer: 1,
    explanation: "먼셀 색체계는 H V/C (색상 명도/채도) 순서로 표기합니다. 예: 5R 4/14"
  },
  {
    id: 2,
    question: "먼셀 색상환의 기본 5색상(Principal Hues)이 아닌 것은?",
    options: ["Red(빨강)", "Yellow(노랑)", "Orange(주황)", "Blue(파랑)"],
    answer: 2,
    explanation: "먼셀의 기본 5색상은 R(빨강), Y(노랑), G(녹색), B(파랑), P(보라)입니다. 주황은 기본색이 아닙니다."
  },
  {
    id: 3,
    question: "먼셀 색상환에서 중간색(Intermediate Hues) 5가지는?",
    options: ["RY, YG, GB, BP, PR", "YR, GY, BG, PB, RP", "RO, OY, YG, GB, BP", "OR, YO, GY, BG, PB"],
    answer: 1,
    explanation: "먼셀의 중간 5색상은 YR(황적), GY(황녹), BG(청록), PB(청자), RP(적자)입니다."
  },
  {
    id: 4,
    question: "먼셀 색상환은 총 몇 개의 색상으로 구성되어 있는가?",
    options: ["10색상", "20색상", "100색상", "50색상"],
    answer: 2,
    explanation: "먼셀 색상환은 기본 5색 × 2(중간색) × 10단계 = 100색상으로 구성됩니다."
  },
  {
    id: 5,
    question: "먼셀 명도의 범위로 옳은 것은?",
    options: ["1~10", "0~10", "1~9", "0~100"],
    answer: 1,
    explanation: "먼셀 명도는 0(완전한 검정)~10(완전한 흰색)의 범위를 가지며, 실제로는 1~9 정도가 사용됩니다."
  },
  {
    id: 6,
    question: "먼셀 채도의 특징으로 옳은 것은?",
    options: ["0~10 고정", "색상에 따라 최대값이 다름", "모든 색상이 같은 최대 채도", "음수 값도 가능"],
    answer: 1,
    explanation: "먼셀 채도는 0(무채색)에서 시작하며, 최대값은 색상에 따라 다릅니다(빨강은 14 이상, 노랑은 12 정도)."
  },
  {
    id: 7,
    question: "먼셀 표기 '5R 4/14'의 의미는?",
    options: ["색상5, 명도R, 채도4/14", "빨강 계열, 명도4, 채도14", "빨강 계열, 채도4, 명도14", "빨강5%, 명도4, 채도14"],
    answer: 1,
    explanation: "5R 4/14는 빨강(R) 색상 중 5번, 명도 4, 채도 14를 의미합니다."
  },
  {
    id: 8,
    question: "먼셀 색체계에서 무채색의 표기 방법은?",
    options: ["N + 명도값", "G + 명도값", "W + 명도값", "0 + 명도값"],
    answer: 0,
    explanation: "먼셀 무채색은 N(Neutral) + 명도값으로 표기합니다. 예: N5는 중간 회색."
  },
  {
    id: 9,
    question: "먼셀 색체계의 특징이 아닌 것은?",
    options: ["지각적 등간격 원리", "색입체 형태", "색상환 100분할", "RGB 혼합 기반"],
    answer: 3,
    explanation: "먼셀 색체계는 RGB가 아닌 인간의 색지각에 기반한 지각적 등간격(perceptually uniform) 시스템입니다."
  },
  {
    id: 10,
    question: "먼셀 색입체에서 채도가 가장 높은 부분의 위치는?",
    options: ["색입체의 중심축", "색입체의 외곽 표면", "색입체의 상단", "색입체의 하단"],
    answer: 1,
    explanation: "먼셀 색입체에서 채도는 중심축(무채색)에서 외곽으로 갈수록 높아집니다."
  },
  {
    id: 11,
    question: "먼셀 보색 관계에 있는 색상 쌍은?",
    options: ["5R과 5Y", "5R과 5BG", "5R과 5G", "5R과 5B"],
    answer: 1,
    explanation: "먼셀에서 5R(빨강)의 보색은 5BG(청록)입니다. 색상환에서 마주보는 위치입니다."
  },
  {
    id: 12,
    question: "먼셀 색체계를 개발한 사람은?",
    options: ["오스트발트", "앨버트 먼셀", "요하네스 이텐", "뉴턴"],
    answer: 1,
    explanation: "먼셀 색체계는 미국의 화가이자 미술교육자인 앨버트 먼셀(Albert Munsell)이 1905년에 개발했습니다."
  },
  {
    id: 13,
    question: "한국산업표준(KS)에서 채택한 색체계는?",
    options: ["오스트발트 색체계", "NCS", "먼셀 색체계", "PCCS"],
    answer: 2,
    explanation: "한국산업표준(KS A 0062)은 먼셀 색체계를 기반으로 합니다."
  },
  {
    id: 14,
    question: "먼셀 색상 기호 'PB'가 나타내는 색은?",
    options: ["보라(Purple)", "청자(Purple-Blue)", "파랑(Blue)", "분홍(Pink-Blue)"],
    answer: 1,
    explanation: "PB는 Purple-Blue(청자색)로, 파랑과 보라 사이의 중간색입니다."
  },
  {
    id: 15,
    question: "먼셀 색체계에서 동일 색상, 동일 채도, 다른 명도의 배색은?",
    options: ["톤온톤 배색", "톤인톤 배색", "카마이유 배색", "악센트 배색"],
    answer: 0,
    explanation: "톤온톤(Tone on Tone) 배색은 같은 색상에서 명도 차이를 주는 배색 기법입니다."
  },

  // NCS (Natural Color System) (16-25)
  {
    id: 16,
    question: "NCS(Natural Color System)를 개발한 국가는?",
    options: ["미국", "독일", "스웨덴", "일본"],
    answer: 2,
    explanation: "NCS는 스웨덴 색채연구소(Scandinavian Colour Institute)에서 개발한 색체계입니다."
  },
  {
    id: 17,
    question: "NCS의 기본색(Elementary Colors)이 아닌 것은?",
    options: ["흰색(W)", "검정(S)", "빨강(R)", "주황(O)"],
    answer: 3,
    explanation: "NCS의 6가지 기본색은 W(흰색), S(검정), Y(노랑), R(빨강), B(파랑), G(녹색)입니다."
  },
  {
    id: 18,
    question: "NCS 표기 'S 2030-Y90R'에서 '2030'이 의미하는 것은?",
    options: ["색상코드", "검정량 20%, 유채색량 30%", "명도와 채도", "연도"],
    answer: 1,
    explanation: "NCS에서 첫 두 자리(20)는 검정량(Blackness), 다음 두 자리(30)는 유채색량(Chromaticness)을 나타냅니다."
  },
  {
    id: 19,
    question: "NCS에서 'Y90R'의 의미는?",
    options: ["노랑 90%, 빨강 10%", "노랑에서 빨강 방향으로 90%", "빨강 90%, 노랑 10%", "순수 노랑"],
    answer: 1,
    explanation: "Y90R은 노랑(Y)에서 빨강(R) 방향으로 90% 이동한 위치, 즉 주황에 가까운 빨강입니다."
  },
  {
    id: 20,
    question: "NCS 색공간에서 뉘앙스(Nuance)가 나타내는 것은?",
    options: ["색상만", "흰색량, 검정량, 유채색량의 비율", "명도만", "채도만"],
    answer: 1,
    explanation: "NCS의 뉘앙스는 흰색량(Whiteness), 검정량(Blackness), 유채색량(Chromaticness)의 비율을 나타냅니다."
  },
  {
    id: 21,
    question: "NCS 색상환은 몇 개의 구간으로 나뉘는가?",
    options: ["10구간", "40구간", "100구간", "360구간"],
    answer: 1,
    explanation: "NCS 색상환은 Y-R-B-G 사이를 각 10단계씩, 총 40구간으로 나눕니다."
  },
  {
    id: 22,
    question: "NCS의 특징으로 옳은 것은?",
    options: ["물리적 측정 기반", "심리적 색지각 기반", "인쇄용으로만 사용", "무채색 표현 불가"],
    answer: 1,
    explanation: "NCS는 인간의 심리적 색지각에 기반한 색체계로, 색을 지각하는 방식에 따라 구성됩니다."
  },
  {
    id: 23,
    question: "NCS 표기에서 'S'가 의미하는 것은?",
    options: ["Standard(표준)", "Sweden(스웨덴)", "Saturation(채도)", "System(시스템)"],
    answer: 0,
    explanation: "NCS 표기 앞의 S는 'Standard' 또는 'Second Edition'을 의미합니다."
  },
  {
    id: 24,
    question: "NCS에서 순수한 빨강의 표기는?",
    options: ["S 0000-R", "S 0080-R", "1080-R", "R 100"],
    answer: 2,
    explanation: "NCS에서 순색은 검정량 10%, 유채색량 80% 정도로, 순수 빨강은 약 1080-R로 표기됩니다."
  },
  {
    id: 25,
    question: "NCS 삼각형(NCS Triangle)에서 꼭짓점이 나타내는 것이 아닌 것은?",
    options: ["순색(C)", "흰색(W)", "검정(S)", "회색(G)"],
    answer: 3,
    explanation: "NCS 삼각형의 세 꼭짓점은 순색(Chromaticness), 흰색(Whiteness), 검정(Blackness)입니다."
  },

  // PCCS (Practical Color Co-ordinate System) (26-35)
  {
    id: 26,
    question: "PCCS를 개발한 국가는?",
    options: ["미국", "스웨덴", "독일", "일본"],
    answer: 3,
    explanation: "PCCS(Practical Color Co-ordinate System)는 일본색채연구소에서 개발한 색체계입니다."
  },
  {
    id: 27,
    question: "PCCS의 색상환은 몇 개의 색상으로 구성되는가?",
    options: ["10색상", "12색상", "24색상", "100색상"],
    answer: 2,
    explanation: "PCCS 색상환은 24색상으로 구성되어 있습니다."
  },
  {
    id: 28,
    question: "PCCS에서 톤(Tone)을 표현하는 기호가 아닌 것은?",
    options: ["v(vivid)", "p(pale)", "dk(dark)", "n(neutral)"],
    answer: 3,
    explanation: "PCCS 톤 기호에는 v, b, s, p, lt, ltg, g, dkg, d, dp, dk 등이 있습니다. n은 사용되지 않습니다."
  },
  {
    id: 29,
    question: "PCCS에서 'v' 톤의 특징은?",
    options: ["밝고 연한 색", "가장 선명하고 순수한 색", "어둡고 진한 색", "탁한 중간 톤"],
    answer: 1,
    explanation: "v(vivid) 톤은 PCCS에서 가장 선명하고 순수한 순색에 해당합니다."
  },
  {
    id: 30,
    question: "PCCS의 명도 단계 수는?",
    options: ["5단계", "9단계", "10단계", "12단계"],
    answer: 1,
    explanation: "PCCS의 명도는 1(가장 어두움)~9(가장 밝음)의 9단계로 구성됩니다."
  },
  {
    id: 31,
    question: "PCCS의 채도 단계 수는?",
    options: ["5단계", "9단계", "10단계", "12단계"],
    answer: 1,
    explanation: "PCCS의 채도도 1(가장 낮음)~9(가장 높음)의 9단계로 구성됩니다."
  },
  {
    id: 32,
    question: "PCCS에서 'p' 톤의 특징은?",
    options: ["선명한 색", "밝고 연한 파스텔 톤", "어두운 색", "탁한 색"],
    answer: 1,
    explanation: "p(pale) 톤은 PCCS에서 밝고 연한 파스텔 톤에 해당합니다."
  },
  {
    id: 33,
    question: "PCCS 표기 '2:v'의 의미는?",
    options: ["2번 색상의 비비드 톤", "명도 2의 비비드 톤", "채도 2의 비비드 톤", "2개의 비비드 톤"],
    answer: 0,
    explanation: "PCCS 표기는 '색상번호:톤기호' 형식으로, 2:v는 2번 색상(빨강 계열)의 비비드 톤입니다."
  },
  {
    id: 34,
    question: "PCCS의 특징으로 옳은 것은?",
    options: ["측색기 기반 정밀 시스템", "톤 개념을 중심으로 한 실용적 시스템", "건축 전용 색체계", "인쇄 전용 색체계"],
    answer: 1,
    explanation: "PCCS는 톤(명도+채도) 개념을 중심으로 한 실용적인 배색 교육용 색체계입니다."
  },
  {
    id: 35,
    question: "PCCS에서 'd' 톤의 특징은?",
    options: ["밝은 색", "어둡고 탁한 색(dull)", "선명한 색", "연한 색"],
    answer: 1,
    explanation: "d(dull) 톤은 PCCS에서 채도가 낮고 탁한 중간 명도의 색에 해당합니다."
  },

  // 오스트발트 색체계 (36-42)
  {
    id: 36,
    question: "오스트발트 색체계를 개발한 사람은?",
    options: ["앨버트 먼셀", "빌헬름 오스트발트", "요하네스 이텐", "아이작 뉴턴"],
    answer: 1,
    explanation: "오스트발트 색체계는 독일의 화학자 빌헬름 오스트발트(Wilhelm Ostwald)가 개발했습니다."
  },
  {
    id: 37,
    question: "오스트발트 색체계에서 색을 구성하는 세 요소는?",
    options: ["색상, 명도, 채도", "순색량, 흰색량, 검정량", "R, G, B", "C, M, Y"],
    answer: 1,
    explanation: "오스트발트 색체계는 순색량(C), 흰색량(W), 검정량(B)의 세 요소로 색을 정의합니다. C+W+B=100%"
  },
  {
    id: 38,
    question: "오스트발트 색상환의 색상 수는?",
    options: ["12색상", "24색상", "100색상", "360색상"],
    answer: 1,
    explanation: "오스트발트 색상환은 24색상으로 구성되어 있습니다."
  },
  {
    id: 39,
    question: "오스트발트 색체계의 특징으로 옳은 것은?",
    options: ["지각적 등간격", "물리적 혼합 비율 기반", "심리적 기반", "무채색 표현 불가"],
    answer: 1,
    explanation: "오스트발트 색체계는 순색, 흰색, 검정의 물리적 혼합 비율에 기반한 시스템입니다."
  },
  {
    id: 40,
    question: "오스트발트 색입체의 형태는?",
    options: ["구형", "정육면체", "원뿔 2개를 맞댄 쌍원뿔", "원기둥"],
    answer: 2,
    explanation: "오스트발트 색입체는 위아래로 원뿔 2개를 맞댄 쌍원뿔(복원뿔) 형태입니다."
  },
  {
    id: 41,
    question: "오스트발트 색체계에서 '등순색 계열'의 의미는?",
    options: ["같은 색상의 색들", "순색량이 같은 색들", "명도가 같은 색들", "채도가 같은 색들"],
    answer: 1,
    explanation: "등순색 계열은 순색량(Chromaticness)이 동일한 색들의 그룹입니다."
  },
  {
    id: 42,
    question: "오스트발트 색체계에서 '등백색 계열'의 의미는?",
    options: ["흰색량이 같은 색들", "색상이 같은 색들", "검정량이 같은 색들", "채도가 같은 색들"],
    answer: 0,
    explanation: "등백색 계열은 흰색량(Whiteness)이 동일한 색들의 그룹입니다."
  },

  // 기타 색체계 및 비교 (43-50)
  {
    id: 43,
    question: "CIE 표색계에서 XYZ가 의미하는 것은?",
    options: ["색의 3원색", "좌표축 방향", "삼자극치", "색온도"],
    answer: 2,
    explanation: "CIE XYZ 표색계에서 X, Y, Z는 색을 정의하는 삼자극치(Tristimulus Values)입니다."
  },
  {
    id: 44,
    question: "CIE Lab 색공간에서 L*이 나타내는 것은?",
    options: ["색상", "명도", "채도", "적-녹 축"],
    answer: 1,
    explanation: "CIE Lab에서 L*은 명도(Lightness)를 나타내며, 0(검정)~100(흰색) 범위입니다."
  },
  {
    id: 45,
    question: "CIE Lab 색공간에서 a*가 나타내는 것은?",
    options: ["명도", "적-녹 축", "황-청 축", "채도"],
    answer: 1,
    explanation: "CIE Lab에서 a*는 적-녹 축으로, +값은 빨강, -값은 녹색 방향입니다."
  },
  {
    id: 46,
    question: "CIE Lab 색공간에서 b*가 나타내는 것은?",
    options: ["명도", "적-녹 축", "황-청 축", "채도"],
    answer: 2,
    explanation: "CIE Lab에서 b*는 황-청 축으로, +값은 노랑, -값은 파랑 방향입니다."
  },
  {
    id: 47,
    question: "색차(ΔE)의 의미로 옳은 것은?",
    options: ["색의 밝기 차이", "두 색 사이의 지각적 거리", "색의 온도 차이", "색상 번호의 차이"],
    answer: 1,
    explanation: "색차(ΔE)는 CIE Lab 등의 색공간에서 두 색 사이의 지각적 차이를 수치화한 것입니다."
  },
  {
    id: 48,
    question: "색체계와 개발 국가의 연결이 틀린 것은?",
    options: ["먼셀 - 미국", "NCS - 스웨덴", "PCCS - 일본", "오스트발트 - 영국"],
    answer: 3,
    explanation: "오스트발트 색체계는 독일에서 개발되었습니다. 영국이 아닙니다."
  },
  {
    id: 49,
    question: "디지털 디스플레이에서 주로 사용하는 색 모델은?",
    options: ["먼셀", "NCS", "RGB", "PCCS"],
    answer: 2,
    explanation: "RGB(Red, Green, Blue)는 디지털 디스플레이에서 가산혼합을 기반으로 사용하는 색 모델입니다."
  },
  {
    id: 50,
    question: "인쇄에서 주로 사용하는 색 모델은?",
    options: ["RGB", "HSV", "CMYK", "NCS"],
    answer: 2,
    explanation: "CMYK(Cyan, Magenta, Yellow, Key/Black)는 인쇄에서 감산혼합을 기반으로 사용하는 색 모델입니다."
  }
];

export default function ColorSystemPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorist-engineer-color-system-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorist-engineer-color-system-progress', JSON.stringify({
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
    localStorage.removeItem('colorist-engineer-color-system-progress');
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
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-2">
            <Link href="/category/design/colorist-engineer" className="hover:text-white transition-colors">컬러리스트기사</Link>
            <span>/</span>
            <span>색채체계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">색채체계</h1>
          <p className="text-pink-100">먼셀, NCS, PCCS, 오스트발트 색체계</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div><span className="text-gray-600">진행률</span><span className="ml-2 font-bold text-pink-600">{answeredQuestions.size}/{questions.length}</span></div>
            <div><span className="text-gray-600">점수</span><span className="ml-2 font-bold text-purple-600">{score}점</span></div>
            <button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">초기화</button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button key={index} onClick={() => goToQuestion(index)} className={`w-10 h-10 rounded-lg font-medium transition-all ${currentQuestion === index ? 'bg-pink-600 text-white' : answeredQuestions.has(index) ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-medium">문제 {currentQuestion + 1}</span>
            {currentQuestion < 15 && <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">먼셀</span>}
            {currentQuestion >= 15 && currentQuestion < 25 && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">NCS</span>}
            {currentQuestion >= 25 && currentQuestion < 35 && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">PCCS</span>}
            {currentQuestion >= 35 && currentQuestion < 42 && <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm">오스트발트</span>}
            {currentQuestion >= 42 && <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">CIE/기타</span>}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={`w-full p-4 text-left rounded-xl border-2 transition-all ${answeredQuestions.has(currentQuestion) ? index === question.answer ? 'border-green-500 bg-green-50 text-green-700' : selectedAnswer === index ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-500' : 'border-gray-200 hover:border-pink-400 hover:bg-pink-50'}`}>
                <span className="font-medium mr-3">{index + 1}.</span>{option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className={`p-6 rounded-xl ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === question.answer ? <span className="text-green-600 font-bold">✓ 정답입니다!</span> : <span className="text-red-600 font-bold">✗ 오답입니다. 정답은 {question.answer + 1}번입니다.</span>}
              </div>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-medium">← 이전 문제</button>
          <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium">다음 문제 →</button>
        </div>

        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3>
              <p className="text-gray-600 mb-4">색채체계 과목을 모두 풀었습니다.</p>
              <div className="text-4xl font-bold text-pink-600 mb-6">{score} / {questions.length}</div>
              <div className="flex gap-3 justify-center">
                <button onClick={resetQuiz} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium">다시 풀기</button>
                <Link href="/category/design/colorist-engineer" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-colors font-medium">메인으로</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
