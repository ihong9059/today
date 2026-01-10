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
  // 레이어 기초 (13문항)
  {
    id: 1,
    question: "레이어 패널을 여는 단축키는?",
    options: ["F5", "F6", "F7", "F8"],
    answer: 2,
    explanation: "F7 키는 레이어 패널을 열거나 닫는 단축키입니다."
  },
  {
    id: 2,
    question: "배경 레이어(Background Layer)의 특징으로 옳지 않은 것은?",
    options: ["잠금 상태로 생성됨", "투명도 조절 불가", "순서 이동 불가", "이름 변경 불가"],
    answer: 3,
    explanation: "배경 레이어는 이름을 변경할 수 있습니다. 더블클릭하면 일반 레이어로 전환됩니다."
  },
  {
    id: 3,
    question: "레이어 불투명도(Opacity)를 50%로 설정하면?",
    options: ["레이어가 삭제됨", "레이어가 반투명해짐", "레이어가 잠김", "레이어가 병합됨"],
    answer: 1,
    explanation: "불투명도를 낮추면 해당 레이어가 반투명해져 아래 레이어가 비쳐 보입니다."
  },
  {
    id: 4,
    question: "레이어의 채우기(Fill)와 불투명도(Opacity)의 차이점은?",
    options: ["차이 없음", "Fill은 레이어 스타일에 영향 없음", "Opacity는 레이어 스타일에 영향 없음", "Fill은 100% 이상 가능"],
    answer: 1,
    explanation: "Fill은 레이어 내용물만 투명도가 변하고, 레이어 스타일(드롭섀도우 등)은 유지됩니다."
  },
  {
    id: 5,
    question: "레이어 순서를 위로 올리는 단축키는?",
    options: ["Ctrl + [", "Ctrl + ]", "Alt + [", "Alt + ]"],
    answer: 1,
    explanation: "Ctrl + ]는 레이어를 한 단계 위로 올리고, Ctrl + [는 한 단계 아래로 내립니다."
  },
  {
    id: 6,
    question: "레이어 그룹(Group)을 만드는 단축키는?",
    options: ["Ctrl + G", "Ctrl + Shift + G", "Ctrl + E", "Ctrl + J"],
    answer: 0,
    explanation: "Ctrl + G는 선택한 레이어들을 그룹으로 묶습니다."
  },
  {
    id: 7,
    question: "선택한 레이어를 병합하는 단축키는?",
    options: ["Ctrl + G", "Ctrl + E", "Ctrl + J", "Ctrl + Shift + E"],
    answer: 1,
    explanation: "Ctrl + E는 선택한 레이어를 아래 레이어와 병합합니다."
  },
  {
    id: 8,
    question: "보이는 레이어를 모두 병합하는 단축키는?",
    options: ["Ctrl + E", "Ctrl + Shift + E", "Ctrl + Alt + E", "Ctrl + Shift + Alt + E"],
    answer: 1,
    explanation: "Ctrl + Shift + E는 눈 아이콘이 켜진 모든 레이어를 병합합니다."
  },
  {
    id: 9,
    question: "레이어 복제의 단축키는?",
    options: ["Ctrl + C", "Ctrl + J", "Ctrl + D", "Ctrl + V"],
    answer: 1,
    explanation: "Ctrl + J는 선택한 레이어 또는 선택 영역을 새 레이어로 복제합니다."
  },
  {
    id: 10,
    question: "레이어 잠금의 종류가 아닌 것은?",
    options: ["투명 픽셀 잠금", "이미지 픽셀 잠금", "위치 잠금", "크기 잠금"],
    answer: 3,
    explanation: "레이어 잠금에는 투명 픽셀, 이미지 픽셀, 위치, 전체 잠금이 있으며 크기 잠금은 없습니다."
  },
  {
    id: 11,
    question: "조정 레이어(Adjustment Layer)의 장점은?",
    options: ["파일 크기 감소", "비파괴 편집 가능", "자동 저장", "레이어 수 감소"],
    answer: 1,
    explanation: "조정 레이어는 원본 이미지를 변경하지 않고 색상 보정을 적용하는 비파괴 편집 방식입니다."
  },
  {
    id: 12,
    question: "레이어 마스크의 검정색 영역은 어떻게 표시되는가?",
    options: ["보이는 영역", "숨겨진 영역", "반투명 영역", "삭제된 영역"],
    answer: 1,
    explanation: "레이어 마스크에서 검정색은 숨김(투명), 흰색은 보임(불투명)을 나타냅니다."
  },
  {
    id: 13,
    question: "클리핑 마스크(Clipping Mask)를 만드는 단축키는?",
    options: ["Ctrl + G", "Ctrl + Alt + G", "Ctrl + Shift + G", "Ctrl + M"],
    answer: 1,
    explanation: "Ctrl + Alt + G는 상위 레이어를 하위 레이어에 클리핑 마스크로 적용합니다."
  },
  // 색상 보정 (12문항)
  {
    id: 14,
    question: "레벨(Levels) 조정의 단축키는?",
    options: ["Ctrl + L", "Ctrl + M", "Ctrl + U", "Ctrl + B"],
    answer: 0,
    explanation: "Ctrl + L은 레벨 조정 대화상자를 엽니다."
  },
  {
    id: 15,
    question: "곡선(Curves) 조정의 단축키는?",
    options: ["Ctrl + L", "Ctrl + M", "Ctrl + U", "Ctrl + B"],
    answer: 1,
    explanation: "Ctrl + M은 곡선 조정 대화상자를 엽니다."
  },
  {
    id: 16,
    question: "색조/채도(Hue/Saturation) 조정의 단축키는?",
    options: ["Ctrl + L", "Ctrl + M", "Ctrl + U", "Ctrl + B"],
    answer: 2,
    explanation: "Ctrl + U는 색조/채도 조정 대화상자를 엽니다."
  },
  {
    id: 17,
    question: "색상 균형(Color Balance) 조정의 단축키는?",
    options: ["Ctrl + L", "Ctrl + M", "Ctrl + U", "Ctrl + B"],
    answer: 3,
    explanation: "Ctrl + B는 색상 균형 조정 대화상자를 엽니다."
  },
  {
    id: 18,
    question: "레벨 조정에서 히스토그램의 역할은?",
    options: ["색상 표시", "밝기 분포 표시", "채도 표시", "선명도 표시"],
    answer: 1,
    explanation: "히스토그램은 이미지의 밝기(톤) 분포를 그래프로 보여줍니다."
  },
  {
    id: 19,
    question: "곡선(Curves) 조정에서 대각선을 위로 올리면?",
    options: ["이미지가 어두워짐", "이미지가 밝아짐", "채도가 증가함", "색상이 변함"],
    answer: 1,
    explanation: "곡선을 위로 올리면 해당 톤 영역이 밝아지고, 아래로 내리면 어두워집니다."
  },
  {
    id: 20,
    question: "흑백(Black & White) 변환의 장점은?",
    options: ["자동 변환만 가능", "각 색상별 밝기 조절 가능", "파일 크기 감소", "해상도 증가"],
    answer: 1,
    explanation: "흑백 조정은 빨강, 노랑, 초록, 시안, 파랑, 마젠타별로 밝기를 개별 조절할 수 있습니다."
  },
  {
    id: 21,
    question: "자동 색상(Auto Color) 기능의 역할은?",
    options: ["수동 색상 조정", "자동으로 색상 교정", "색상 삭제", "색상 추가"],
    answer: 1,
    explanation: "자동 색상은 이미지의 색조 불균형을 자동으로 보정합니다."
  },
  {
    id: 22,
    question: "비브란스(Vibrance) 조정의 특징은?",
    options: ["모든 색상 동일하게 조절", "채도가 낮은 색상 위주로 조절", "밝기만 조절", "대비만 조절"],
    answer: 1,
    explanation: "비브란스는 이미 채도가 높은 색상은 덜 조절하고, 채도가 낮은 색상을 더 조절하여 자연스럽습니다."
  },
  {
    id: 23,
    question: "그림자/하이라이트(Shadows/Highlights) 조정의 용도는?",
    options: ["색상 변경", "역광 사진 보정", "선명도 조절", "노이즈 제거"],
    answer: 1,
    explanation: "그림자/하이라이트는 어두운 영역과 밝은 영역을 개별적으로 보정하여 역광 사진에 효과적입니다."
  },
  {
    id: 24,
    question: "선택적 색상(Selective Color)의 특징은?",
    options: ["전체 색상 일괄 조정", "특정 색상 영역만 조정", "자동 색상 보정", "색상 삭제"],
    answer: 1,
    explanation: "선택적 색상은 빨강, 노랑, 초록 등 특정 색상 영역만 선택하여 CMYK 성분을 조절합니다."
  },
  {
    id: 25,
    question: "반전(Invert)의 단축키는?",
    options: ["Ctrl + I", "Ctrl + U", "Ctrl + L", "Ctrl + M"],
    answer: 0,
    explanation: "Ctrl + I는 이미지 색상을 반전(네거티브 효과)시킵니다."
  },
  // 필터와 효과 (13문항)
  {
    id: 26,
    question: "가우시안 블러(Gaussian Blur)의 용도가 아닌 것은?",
    options: ["배경 흐림 효과", "노이즈 감소", "부드러운 그림자", "선명도 증가"],
    answer: 3,
    explanation: "가우시안 블러는 이미지를 흐리게 하는 필터로, 선명도 증가와는 반대 효과입니다."
  },
  {
    id: 27,
    question: "언샵 마스크(Unsharp Mask)의 용도는?",
    options: ["흐림 효과", "선명도 증가", "노이즈 추가", "색상 변경"],
    answer: 1,
    explanation: "언샵 마스크는 이미지의 가장자리를 강조하여 선명도를 높이는 필터입니다."
  },
  {
    id: 28,
    question: "고주파 선명하게(High Pass)필터와 함께 사용하는 블렌딩 모드는?",
    options: ["일반(Normal)", "곱하기(Multiply)", "오버레이(Overlay)", "색상(Color)"],
    answer: 2,
    explanation: "High Pass 필터는 오버레이, 소프트 라이트 모드와 함께 사용하면 선명도가 증가합니다."
  },
  {
    id: 29,
    question: "모션 블러(Motion Blur)의 특징은?",
    options: ["전체 균일 흐림", "방향성 있는 흐림", "원형 흐림", "노이즈 흐림"],
    answer: 1,
    explanation: "모션 블러는 특정 방향으로 움직이는 듯한 흐림 효과를 만듭니다."
  },
  {
    id: 30,
    question: "방사형 블러(Radial Blur)의 효과는?",
    options: ["직선 방향 흐림", "회전 또는 줌 효과", "가장자리만 흐림", "중앙만 흐림"],
    answer: 1,
    explanation: "방사형 블러는 회전(Spin) 또는 줌(Zoom) 효과를 줄 수 있습니다."
  },
  {
    id: 31,
    question: "렌즈 흐림(Lens Blur)의 특징은?",
    options: ["단순 흐림 효과", "사실적인 아웃포커싱 효과", "노이즈 제거", "색상 변경"],
    answer: 1,
    explanation: "렌즈 흐림은 실제 카메라 렌즈의 아웃포커싱과 유사한 자연스러운 블러 효과를 만듭니다."
  },
  {
    id: 32,
    question: "노이즈 추가(Add Noise) 필터의 활용 예는?",
    options: ["사진 선명하게", "필름 그레인 효과", "색상 보정", "크기 조절"],
    answer: 1,
    explanation: "노이즈 추가는 필름 카메라의 그레인 효과나 빈티지 느낌을 연출할 때 사용합니다."
  },
  {
    id: 33,
    question: "먼지와 스크래치(Dust & Scratches) 필터의 용도는?",
    options: ["노이즈 추가", "작은 잡티 제거", "선명도 증가", "색상 변경"],
    answer: 1,
    explanation: "먼지와 스크래치 필터는 사진의 작은 먼지, 스크래치를 자동으로 제거합니다."
  },
  {
    id: 34,
    question: "왜곡(Distort) 필터 그룹에 속하지 않는 것은?",
    options: ["물결(Wave)", "구형화(Spherize)", "가우시안 블러(Gaussian Blur)", "핀치(Pinch)"],
    answer: 2,
    explanation: "가우시안 블러는 블러(Blur) 필터 그룹에 속합니다."
  },
  {
    id: 35,
    question: "액화(Liquify) 필터의 용도는?",
    options: ["색상 변경", "이미지 부분 변형", "선명도 조절", "노이즈 제거"],
    answer: 1,
    explanation: "액화 필터는 이미지의 특정 부분을 밀고 당기며 자유롭게 변형할 수 있습니다."
  },
  {
    id: 36,
    question: "Camera Raw 필터의 장점은?",
    options: ["JPG에서도 RAW 편집 기능 사용", "자동 저장", "레이어 병합", "선택 영역 자동 생성"],
    answer: 0,
    explanation: "Camera Raw 필터는 JPG 등 일반 이미지에서도 RAW 편집기의 강력한 보정 기능을 사용할 수 있습니다."
  },
  {
    id: 37,
    question: "스마트 필터(Smart Filter)의 특징은?",
    options: ["일회성 적용", "수정 및 제거 가능", "자동 적용", "레이어 병합 필요"],
    answer: 1,
    explanation: "스마트 필터는 스마트 오브젝트에 적용되며, 언제든지 수정하거나 제거할 수 있습니다."
  },
  {
    id: 38,
    question: "필터 갤러리(Filter Gallery)의 특징은?",
    options: ["필터 1개만 적용 가능", "여러 필터 중첩 및 미리보기 가능", "자동 적용", "취소 불가"],
    answer: 1,
    explanation: "필터 갤러리에서는 여러 예술적 필터를 중첩하여 적용하고 실시간 미리보기가 가능합니다."
  },
  // 리터칭 기법 (12문항)
  {
    id: 39,
    question: "피부 보정에 가장 적합한 도구는?",
    options: ["브러시 도구", "힐링 브러시 도구", "페인트 통 도구", "지우개 도구"],
    answer: 1,
    explanation: "힐링 브러시 도구는 잡티를 주변 텍스처와 자연스럽게 혼합하여 제거합니다."
  },
  {
    id: 40,
    question: "콘텐츠 인식 채우기(Content-Aware Fill)의 용도는?",
    options: ["색상 채우기", "불필요한 객체를 배경으로 자연스럽게 제거", "선택 영역 확대", "레이어 병합"],
    answer: 1,
    explanation: "콘텐츠 인식 채우기는 선택한 영역을 주변 배경과 자연스럽게 채워 객체를 제거합니다."
  },
  {
    id: 41,
    question: "닷지 도구(Dodge Tool)의 기능은?",
    options: ["어둡게 하기", "밝게 하기", "채도 높이기", "흐리게 하기"],
    answer: 1,
    explanation: "닷지 도구는 브러시로 칠한 영역을 밝게 합니다."
  },
  {
    id: 42,
    question: "번 도구(Burn Tool)의 기능은?",
    options: ["밝게 하기", "어둡게 하기", "채도 낮추기", "선명하게 하기"],
    answer: 1,
    explanation: "번 도구는 브러시로 칠한 영역을 어둡게 합니다."
  },
  {
    id: 43,
    question: "스펀지 도구(Sponge Tool)의 기능은?",
    options: ["밝기 조절", "채도 조절", "크기 조절", "선명도 조절"],
    answer: 1,
    explanation: "스펀지 도구는 칠한 영역의 채도를 높이거나 낮출 수 있습니다."
  },
  {
    id: 44,
    question: "빈도 분리(Frequency Separation) 기법의 용도는?",
    options: ["색상 변경", "피부 텍스처와 색상을 분리하여 보정", "크기 조절", "레이어 병합"],
    answer: 1,
    explanation: "빈도 분리는 이미지를 텍스처(고주파)와 색상/톤(저주파)으로 분리하여 각각 보정합니다."
  },
  {
    id: 45,
    question: "적목 현상 도구(Red Eye Tool)의 용도는?",
    options: ["눈 색상 변경", "플래시로 인한 빨간 눈 제거", "눈 크기 확대", "눈 선명도 증가"],
    answer: 1,
    explanation: "적목 현상 도구는 플래시 촬영 시 발생하는 빨간 눈을 클릭만으로 쉽게 제거합니다."
  },
  {
    id: 46,
    question: "패치 도구(Patch Tool)의 특징은?",
    options: ["점만 제거", "영역을 선택하여 다른 영역으로 대체", "색상만 변경", "크기만 조절"],
    answer: 1,
    explanation: "패치 도구는 영역을 선택하고 드래그하여 다른 영역의 텍스처로 자연스럽게 대체합니다."
  },
  {
    id: 47,
    question: "콘텐츠 인식 이동 도구의 기능은?",
    options: ["색상 변경", "객체를 이동하고 빈 공간을 자동 채움", "레이어 이동", "캔버스 이동"],
    answer: 1,
    explanation: "콘텐츠 인식 이동 도구는 객체를 다른 위치로 이동하면서 원래 위치를 자동으로 채웁니다."
  },
  {
    id: 48,
    question: "블러 도구(Blur Tool)의 리터칭 활용 예는?",
    options: ["피부 모공 강조", "피부 결 부드럽게", "주름 강조", "잡티 강조"],
    answer: 1,
    explanation: "블러 도구는 피부 결을 부드럽게 만들거나 배경을 흐리게 할 때 사용합니다."
  },
  {
    id: 49,
    question: "샤픈 도구(Sharpen Tool)의 주의점은?",
    options: ["너무 약하게 사용", "과도하게 사용하면 노이즈 발생", "레이어 병합 필요", "마스크 필요"],
    answer: 1,
    explanation: "샤픈 도구를 과도하게 사용하면 이미지에 노이즈와 인공물이 생길 수 있습니다."
  },
  {
    id: 50,
    question: "스머지 도구(Smudge Tool)의 기능은?",
    options: ["색상 채우기", "문지르듯이 이미지 번짐 효과", "선택 영역 생성", "레이어 복제"],
    answer: 1,
    explanation: "스머지 도구는 손가락으로 물감을 문지르듯이 픽셀을 번지게 합니다."
  }
];

export default function PSEditingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('gtq-ps-editing-progress');
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
      localStorage.setItem('gtq-ps-editing-progress', JSON.stringify({
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
    localStorage.removeItem('gtq-ps-editing-progress');
  };

  if (!isClient || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/category/design/gtq" className="text-fuchsia-600 hover:text-fuchsia-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQ로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">이미지 편집</h1>
            <span className="text-sm text-gray-500">{currentQuestion + 1} / {questions.length}</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>진행률: {answeredQuestions.size}/{questions.length}</span>
              <span>점수: {score}/{answeredQuestions.size}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-fuchsia-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 text-sm rounded-full">
                {question.id <= 13 ? '레이어 기초' : question.id <= 25 ? '색상 보정' : question.id <= 38 ? '필터와 효과' : '리터칭 기법'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Q{currentQuestion + 1}. {question.question}</h2>

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
                      : 'border-gray-200 hover:border-fuchsia-400 hover:bg-fuchsia-50'
                  }`}
                >
                  <span className="font-medium">{index + 1}. </span>{option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-semibold mb-2 ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>
                {selectedAnswer === question.answer ? '정답입니다!' : '오답입니다!'}
              </p>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">이전</button>
            <button onClick={resetQuiz} className="px-6 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-lg hover:bg-fuchsia-200">다시 시작</button>
            <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed">다음</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">문제 목록</h3>
          <div className="grid grid-cols-10 gap-2">
            {shuffledQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentQuestion(index); setSelectedAnswer(null); setShowExplanation(false); }}
                className={`w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentQuestion === index ? 'bg-fuchsia-500 text-white' : answeredQuestions.has(index) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
