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
  // 색의 3속성 (12문항)
  {
    id: 1,
    question: "색의 3속성에 해당하지 않는 것은?",
    options: ["색상", "명도", "채도", "농도"],
    answer: 3,
    explanation: "색의 3속성은 색상(Hue), 명도(Value), 채도(Chroma)입니다. 농도는 3속성에 포함되지 않습니다."
  },
  {
    id: 2,
    question: "색상(Hue)에 대한 설명으로 옳은 것은?",
    options: ["색의 밝고 어두운 정도", "색의 맑고 탁한 정도", "색을 구별하는 특성", "색의 무게감"],
    answer: 2,
    explanation: "색상(Hue)은 빨강, 노랑, 파랑 등 색을 구별하는 특성으로, 색상환에서의 위치를 나타냅니다."
  },
  {
    id: 3,
    question: "명도(Value)가 가장 높은 색은?",
    options: ["검정", "회색", "노랑", "남색"],
    answer: 2,
    explanation: "노랑은 유채색 중 명도가 가장 높은 색입니다. 무채색 중에서는 흰색이 가장 높습니다."
  },
  {
    id: 4,
    question: "채도(Chroma)에 대한 설명으로 옳은 것은?",
    options: ["색의 밝기 정도", "색의 선명하고 탁한 정도", "색의 온도감", "색의 면적 대비"],
    answer: 1,
    explanation: "채도는 색의 순수한 정도, 즉 선명하고 탁한 정도를 나타내며, 순색에 가까울수록 채도가 높습니다."
  },
  {
    id: 5,
    question: "무채색에 해당하는 것은?",
    options: ["빨강", "회색", "노랑", "파랑"],
    answer: 1,
    explanation: "무채색은 흰색, 회색, 검정처럼 색상이 없고 명도만 가지는 색입니다."
  },
  {
    id: 6,
    question: "순색(Pure Color)에 대한 설명으로 옳은 것은?",
    options: ["명도가 가장 낮은 색", "채도가 가장 높은 색", "흰색이 섞인 색", "검정이 섞인 색"],
    answer: 1,
    explanation: "순색은 다른 색의 혼합 없이 가장 선명한 상태의 색으로, 채도가 가장 높습니다."
  },
  {
    id: 7,
    question: "명청색(Tint)이란?",
    options: ["순색에 검정을 섞은 색", "순색에 흰색을 섞은 색", "순색에 회색을 섞은 색", "보색을 혼합한 색"],
    answer: 1,
    explanation: "명청색(Tint)은 순색에 흰색을 혼합하여 밝아진 색으로, 파스텔 톤이 대표적입니다."
  },
  {
    id: 8,
    question: "암청색(Shade)이란?",
    options: ["순색에 흰색을 섞은 색", "순색에 검정을 섞은 색", "순색에 회색을 섞은 색", "한난 대비를 이룬 색"],
    answer: 1,
    explanation: "암청색(Shade)은 순색에 검정을 혼합하여 어두워진 색입니다."
  },
  {
    id: 9,
    question: "탁색(Tone)에 대한 설명으로 옳은 것은?",
    options: ["순색에 흰색만 섞은 색", "순색에 검정만 섞은 색", "순색에 회색을 섞은 색", "순수한 색상"],
    answer: 2,
    explanation: "탁색은 순색에 회색(흰색+검정)을 혼합한 색으로, 채도가 낮아지면서 탁해진 색입니다."
  },
  {
    id: 10,
    question: "유채색에 대한 설명으로 옳지 않은 것은?",
    options: ["색상, 명도, 채도를 모두 가진다", "빨강, 노랑, 파랑 등이 해당된다", "흰색, 회색, 검정이 포함된다", "채도 0 이상의 색이다"],
    answer: 2,
    explanation: "흰색, 회색, 검정은 무채색으로 색상과 채도가 없고 명도만 있습니다."
  },
  {
    id: 11,
    question: "고명도, 고채도의 색 느낌은?",
    options: ["무겁고 탁하다", "밝고 선명하다", "어둡고 침착하다", "가볍고 탁하다"],
    answer: 1,
    explanation: "고명도, 고채도의 색은 밝고 선명한 느낌을 주며, 비비드(Vivid) 톤이 대표적입니다."
  },
  {
    id: 12,
    question: "저명도, 저채도의 색이 주는 느낌은?",
    options: ["화려하고 강렬하다", "밝고 경쾌하다", "차분하고 중후하다", "시원하고 청량하다"],
    answer: 2,
    explanation: "저명도, 저채도의 색은 차분하고 중후한 느낌을 주며, 다크 그레이시 톤이 해당됩니다."
  },
  // 색채체계 (13문항)
  {
    id: 13,
    question: "먼셀 색체계의 기본 5색상이 아닌 것은?",
    options: ["빨강(R)", "노랑(Y)", "주황(O)", "파랑(B)"],
    answer: 2,
    explanation: "먼셀의 기본 5색상은 빨강(R), 노랑(Y), 초록(G), 파랑(B), 보라(P)입니다. 주황은 중간색입니다."
  },
  {
    id: 14,
    question: "먼셀 색체계에서 명도 단계는 몇 단계인가?",
    options: ["9단계", "10단계", "11단계", "12단계"],
    answer: 2,
    explanation: "먼셀 색체계에서 명도는 0(완전한 검정)~10(완전한 흰색)까지 11단계로 구분됩니다."
  },
  {
    id: 15,
    question: "먼셀 표색계의 표기 순서로 옳은 것은?",
    options: ["명도/색상 채도", "색상 명도/채도", "채도/색상 명도", "색상 채도/명도"],
    answer: 1,
    explanation: "먼셀 표색계는 'H V/C' 형식으로 색상(Hue) 명도(Value)/채도(Chroma) 순으로 표기합니다."
  },
  {
    id: 16,
    question: "먼셀 기호 '5R 4/14'에서 '4'가 의미하는 것은?",
    options: ["색상", "명도", "채도", "색상 번호"],
    answer: 1,
    explanation: "'5R 4/14'에서 4는 명도(Value)를 의미합니다. 0~10 중 중간 정도의 밝기입니다."
  },
  {
    id: 17,
    question: "오스트발트 색체계의 특징이 아닌 것은?",
    options: ["백색량, 흑색량, 순색량의 합이 100%", "색상환이 24색상", "명도를 11단계로 구분", "등색상 삼각형 활용"],
    answer: 2,
    explanation: "명도를 11단계로 구분하는 것은 먼셀 색체계의 특징입니다. 오스트발트는 8단계입니다."
  },
  {
    id: 18,
    question: "NCS 색체계가 개발된 국가는?",
    options: ["미국", "독일", "스웨덴", "일본"],
    answer: 2,
    explanation: "NCS(Natural Color System)는 스웨덴에서 개발된 색체계로, 색지각을 기반으로 합니다."
  },
  {
    id: 19,
    question: "PCCS 색체계의 특징으로 옳은 것은?",
    options: ["스웨덴에서 개발", "톤(Tone) 개념 도입", "백색량, 흑색량 표기", "CIE 표준 기반"],
    answer: 1,
    explanation: "PCCS(Practical Color Coordinate System)는 일본에서 개발되었으며, 톤(Tone) 개념을 도입했습니다."
  },
  {
    id: 20,
    question: "CIE 표준 색체계의 특징으로 옳은 것은?",
    options: ["감성적 색채 표현", "물리적 측색 기반", "톤 분류 체계", "24색상환 구성"],
    answer: 1,
    explanation: "CIE 색체계는 국제조명위원회에서 정한 물리적 측색에 기반한 객관적 색체계입니다."
  },
  {
    id: 21,
    question: "RAL 색체계가 주로 사용되는 분야는?",
    options: ["패션 디자인", "산업용 도료", "웹 디자인", "화장품"],
    answer: 1,
    explanation: "RAL은 독일에서 개발된 색체계로, 주로 산업용 도료와 건축 분야에서 사용됩니다."
  },
  {
    id: 22,
    question: "DIC 색체계가 개발된 국가는?",
    options: ["미국", "독일", "일본", "영국"],
    answer: 2,
    explanation: "DIC(Dainippon Ink and Chemicals)는 일본에서 개발된 인쇄용 색체계입니다."
  },
  {
    id: 23,
    question: "팬톤(Pantone) 색체계의 주요 용도는?",
    options: ["건축 도장", "그래픽/인쇄", "조명 설계", "섬유 염색"],
    answer: 1,
    explanation: "팬톤은 미국에서 개발된 색체계로, 그래픽 디자인과 인쇄 분야에서 표준으로 사용됩니다."
  },
  {
    id: 24,
    question: "KS 표준색에서 사용하는 기본 색체계는?",
    options: ["오스트발트", "먼셀", "NCS", "PCCS"],
    answer: 1,
    explanation: "한국산업표준(KS)의 표준색은 먼셀 색체계를 기반으로 합니다."
  },
  {
    id: 25,
    question: "현색계(Color Appearance System)의 특징은?",
    options: ["물리적 파장 기반", "색 견본 제시", "수치화된 좌표", "측색기 필요"],
    answer: 1,
    explanation: "현색계는 실제 색 견본(Color Chip)을 제시하여 색을 지정하는 방식입니다."
  },
  // 색의 혼합 (13문항)
  {
    id: 26,
    question: "가산혼합의 삼원색이 아닌 것은?",
    options: ["빨강(R)", "초록(G)", "파랑(B)", "노랑(Y)"],
    answer: 3,
    explanation: "가산혼합(빛의 혼합)의 삼원색은 빨강(R), 초록(G), 파랑(B)입니다. 노랑은 감산혼합의 원색입니다."
  },
  {
    id: 27,
    question: "감산혼합의 삼원색으로 옳은 것은?",
    options: ["RGB", "CMY", "RYB", "HSB"],
    answer: 1,
    explanation: "감산혼합(색료의 혼합)의 삼원색은 시안(C), 마젠타(M), 노랑(Y)입니다."
  },
  {
    id: 28,
    question: "가산혼합에서 R+G+B를 혼합하면?",
    options: ["검정", "흰색", "회색", "갈색"],
    answer: 1,
    explanation: "가산혼합에서 빨강+초록+파랑을 모두 혼합하면 흰색이 됩니다."
  },
  {
    id: 29,
    question: "감산혼합에서 C+M+Y를 혼합하면?",
    options: ["흰색", "검정", "회색", "갈색"],
    answer: 1,
    explanation: "감산혼합에서 시안+마젠타+노랑을 모두 혼합하면 이론적으로 검정이 됩니다."
  },
  {
    id: 30,
    question: "가산혼합에서 R+G를 혼합하면?",
    options: ["시안", "마젠타", "노랑", "흰색"],
    answer: 2,
    explanation: "가산혼합에서 빨강+초록을 혼합하면 노랑이 됩니다."
  },
  {
    id: 31,
    question: "가산혼합에서 G+B를 혼합하면?",
    options: ["노랑", "마젠타", "시안", "주황"],
    answer: 2,
    explanation: "가산혼합에서 초록+파랑을 혼합하면 시안(Cyan)이 됩니다."
  },
  {
    id: 32,
    question: "가산혼합에서 R+B를 혼합하면?",
    options: ["노랑", "시안", "마젠타", "초록"],
    answer: 2,
    explanation: "가산혼합에서 빨강+파랑을 혼합하면 마젠타(Magenta)가 됩니다."
  },
  {
    id: 33,
    question: "중간혼합(병치혼합)의 예로 옳은 것은?",
    options: ["물감 혼합", "프린터 인쇄", "컬러TV 화면", "조명 혼합"],
    answer: 2,
    explanation: "중간혼합(병치혼합)은 작은 색점들이 망막에서 혼합되어 보이는 것으로, 컬러TV가 대표적입니다."
  },
  {
    id: 34,
    question: "회전혼합에 대한 설명으로 옳은 것은?",
    options: ["물감을 섞는 혼합", "빛을 겹치는 혼합", "색면을 회전시키는 혼합", "필터를 겹치는 혼합"],
    answer: 2,
    explanation: "회전혼합은 색이 칠해진 원판을 빠르게 회전시켜 중간색을 만드는 방법입니다."
  },
  {
    id: 35,
    question: "점묘파 화가들이 사용한 혼합 방법은?",
    options: ["가산혼합", "감산혼합", "병치혼합", "회전혼합"],
    answer: 2,
    explanation: "점묘파(쇠라, 시냑 등)는 작은 색점을 병치하여 망막에서 혼합되게 하는 병치혼합을 사용했습니다."
  },
  {
    id: 36,
    question: "인쇄에서 CMYK 중 K가 추가된 이유는?",
    options: ["색상 범위 확대", "완전한 검정 표현", "밝기 조절", "비용 절감"],
    answer: 1,
    explanation: "CMY만으로는 완전한 검정을 만들기 어려워 검정(K)을 별도로 추가합니다."
  },
  {
    id: 37,
    question: "투과혼합의 예로 옳은 것은?",
    options: ["물감 혼합", "컬러 필터 겹침", "TV 화면", "실 직조"],
    answer: 1,
    explanation: "투과혼합은 컬러 필터나 셀로판지 등을 겹쳐 빛이 투과하면서 혼합되는 방식입니다."
  },
  {
    id: 38,
    question: "직물의 씨실과 날실이 교차하며 나타나는 혼합은?",
    options: ["가산혼합", "감산혼합", "직조혼합", "회전혼합"],
    answer: 2,
    explanation: "직조혼합은 직물에서 다른 색의 실이 교차하며 시각적으로 혼합되어 보이는 현상입니다."
  },
  // 색채 지각 (12문항)
  {
    id: 39,
    question: "가시광선의 파장 범위로 옳은 것은?",
    options: ["280~380nm", "380~780nm", "780~1000nm", "100~280nm"],
    answer: 1,
    explanation: "가시광선은 약 380~780nm의 파장 범위로, 사람이 눈으로 감지할 수 있는 빛입니다."
  },
  {
    id: 40,
    question: "파장이 가장 긴 색은?",
    options: ["보라", "파랑", "초록", "빨강"],
    answer: 3,
    explanation: "빨강은 약 620~780nm로 가시광선 중 파장이 가장 깁니다."
  },
  {
    id: 41,
    question: "파장이 가장 짧은 색은?",
    options: ["빨강", "노랑", "초록", "보라"],
    answer: 3,
    explanation: "보라는 약 380~450nm로 가시광선 중 파장이 가장 짧습니다."
  },
  {
    id: 42,
    question: "추상체(원추세포)의 기능은?",
    options: ["밝은 곳에서 색 지각", "어두운 곳에서 명암 지각", "원근감 지각", "움직임 지각"],
    answer: 0,
    explanation: "추상체(원추세포)는 밝은 곳에서 색을 지각하며, L, M, S 세 종류가 있습니다."
  },
  {
    id: 43,
    question: "간상체(막대세포)의 기능으로 옳은 것은?",
    options: ["색 구별", "어두운 곳 시각", "색 혼합", "명시 현상"],
    answer: 1,
    explanation: "간상체는 어두운 곳에서 명암을 지각하는 세포로, 색 구별은 할 수 없습니다."
  },
  {
    id: 44,
    question: "명순응에 대한 설명으로 옳은 것은?",
    options: ["어두운 곳에서 밝은 곳으로 이동 시 적응", "밝은 곳에서 어두운 곳으로 이동 시 적응", "색온도 적응", "색상 적응"],
    answer: 0,
    explanation: "명순응은 어두운 곳에서 밝은 곳으로 이동할 때 눈이 적응하는 현상으로, 빠르게 진행됩니다."
  },
  {
    id: 45,
    question: "암순응에 걸리는 시간으로 옳은 것은?",
    options: ["약 1분", "약 5분", "약 30분", "약 2시간"],
    answer: 2,
    explanation: "암순응은 밝은 곳에서 어두운 곳으로 이동 시 약 30분 정도 소요됩니다."
  },
  {
    id: 46,
    question: "푸르키네 현상에 대한 설명으로 옳은 것은?",
    options: ["밝은 곳에서 노랑이 밝게 보임", "어두운 곳에서 파랑이 밝게 보임", "보색이 선명해 보임", "색상이 변해 보임"],
    answer: 1,
    explanation: "푸르키네 현상은 어두워지면 파랑-초록 계열이 상대적으로 밝게 보이는 현상입니다."
  },
  {
    id: 47,
    question: "색각 이상 중 가장 흔한 유형은?",
    options: ["제1색각 이상(적색맹)", "제2색각 이상(녹색맹)", "제3색각 이상(청색맹)", "전색맹"],
    answer: 1,
    explanation: "제2색각 이상(녹색맹)이 가장 흔하며, 주로 남성에게 많이 나타납니다."
  },
  {
    id: 48,
    question: "잔상(Afterimage)에 대한 설명으로 옳은 것은?",
    options: ["같은 색이 계속 보이는 현상", "원래 자극이 사라진 후 나타나는 상", "색이 더 선명해지는 현상", "색이 흐려지는 현상"],
    answer: 1,
    explanation: "잔상은 원래 자극이 사라진 후에도 일정 시간 상이 보이는 현상입니다."
  },
  {
    id: 49,
    question: "보색 잔상(음성 잔상)의 특징은?",
    options: ["원래 색과 같은 색이 보임", "원래 색의 보색이 보임", "무채색으로 보임", "색이 사라짐"],
    answer: 1,
    explanation: "보색 잔상(음성 잔상)은 원래 색을 오래 본 후 흰 면을 보면 보색이 나타나는 현상입니다."
  },
  {
    id: 50,
    question: "색의 항상성에 대한 설명으로 옳은 것은?",
    options: ["조명이 변해도 색이 일정하게 지각됨", "색이 항상 변한다", "보색만 지각됨", "무채색으로 보임"],
    answer: 0,
    explanation: "색의 항상성은 조명 조건이 변해도 물체의 색을 비교적 일정하게 지각하는 현상입니다."
  }
];

export default function ColorTheoryPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('colorist-tech-color-theory-progress');
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
      localStorage.setItem('colorist-tech-color-theory-progress', JSON.stringify({
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
    localStorage.removeItem('colorist-tech-color-theory-progress');
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
            <h1 className="text-2xl font-bold text-gray-800">색채이론</h1>
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
                {question.id <= 12 ? '색의 3속성' :
                 question.id <= 25 ? '색채체계' :
                 question.id <= 38 ? '색의 혼합' : '색채 지각'}
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
