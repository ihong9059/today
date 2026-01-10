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
  // 인터페이스 기초 (13문항)
  {
    id: 1,
    question: "일러스트레이터에서 새 문서를 만드는 단축키는?",
    options: ["Ctrl + O", "Ctrl + N", "Ctrl + S", "Ctrl + P"],
    answer: 1,
    explanation: "Ctrl + N은 New의 약자로 새 문서를 생성합니다."
  },
  {
    id: 2,
    question: "일러스트레이터의 작업 영역을 아트보드(Artboard)라고 부르는 이유는?",
    options: ["파일 형식 때문에", "인쇄 가능한 영역을 나타내므로", "3D 작업이 가능해서", "비트맵 이미지라서"],
    answer: 1,
    explanation: "아트보드는 실제 출력될 영역을 나타내며, 여러 개의 아트보드를 만들 수 있습니다."
  },
  {
    id: 3,
    question: "일러스트레이터에서 도구 패널을 숨기거나 표시하는 단축키는?",
    options: ["Tab", "Shift + Tab", "Ctrl + Tab", "Alt + Tab"],
    answer: 0,
    explanation: "Tab 키를 누르면 모든 패널을 숨기거나 표시할 수 있습니다."
  },
  {
    id: 4,
    question: "벡터 그래픽의 특징으로 옳은 것은?",
    options: ["픽셀로 구성됨", "확대하면 깨짐", "수학적 공식으로 구성됨", "사진 편집에 최적화"],
    answer: 2,
    explanation: "벡터 그래픽은 점, 선, 곡선을 수학적 공식으로 표현하여 확대해도 품질이 유지됩니다."
  },
  {
    id: 5,
    question: "일러스트레이터에서 화면을 확대하는 단축키는?",
    options: ["Ctrl + +", "Ctrl + -", "Ctrl + 0", "Ctrl + 1"],
    answer: 0,
    explanation: "Ctrl + +는 화면을 확대하고, Ctrl + -는 축소합니다."
  },
  {
    id: 6,
    question: "일러스트레이터에서 화면에 맞추기 단축키는?",
    options: ["Ctrl + 1", "Ctrl + 0", "Ctrl + H", "Ctrl + R"],
    answer: 1,
    explanation: "Ctrl + 0은 아트보드를 화면에 맞춰 전체 보기합니다."
  },
  {
    id: 7,
    question: "손 도구(Hand Tool)의 단축키는?",
    options: ["V", "H", "A", "P"],
    answer: 1,
    explanation: "H키는 손 도구로, 화면을 드래그하여 이동할 수 있습니다. Space바를 누르면 임시 활성화됩니다."
  },
  {
    id: 8,
    question: "돋보기 도구(Zoom Tool)의 단축키는?",
    options: ["H", "Z", "V", "M"],
    answer: 1,
    explanation: "Z키는 돋보기 도구로, 클릭하면 확대, Alt+클릭하면 축소됩니다."
  },
  {
    id: 9,
    question: "룰러(Ruler)를 표시하는 단축키는?",
    options: ["Ctrl + R", "Ctrl + ;", "Ctrl + '", "Ctrl + H"],
    answer: 0,
    explanation: "Ctrl + R은 룰러를 표시하거나 숨깁니다."
  },
  {
    id: 10,
    question: "가이드를 잠그거나 해제하는 단축키는?",
    options: ["Ctrl + ;", "Ctrl + Alt + ;", "Ctrl + '", "Ctrl + H"],
    answer: 1,
    explanation: "Ctrl + Alt + ; 는 가이드를 잠그거나 해제합니다."
  },
  {
    id: 11,
    question: "스마트 가이드를 켜고 끄는 단축키는?",
    options: ["Ctrl + U", "Ctrl + H", "Ctrl + '", "Ctrl + ;"],
    answer: 0,
    explanation: "Ctrl + U는 스마트 가이드를 토글합니다. 정렬과 간격을 맞추는 데 유용합니다."
  },
  {
    id: 12,
    question: "작업 취소(Undo)의 단축키는?",
    options: ["Ctrl + Y", "Ctrl + Z", "Ctrl + X", "Ctrl + C"],
    answer: 1,
    explanation: "Ctrl + Z는 마지막 작업을 취소합니다."
  },
  {
    id: 13,
    question: "다시 실행(Redo)의 단축키는?",
    options: ["Ctrl + Z", "Ctrl + Shift + Z", "Ctrl + Y", "Ctrl + Alt + Z"],
    answer: 1,
    explanation: "Ctrl + Shift + Z는 취소한 작업을 다시 실행합니다."
  },
  // 선택 도구 (12문항)
  {
    id: 14,
    question: "선택 도구(Selection Tool)의 단축키는?",
    options: ["A", "V", "P", "M"],
    answer: 1,
    explanation: "V키는 선택 도구로, 오브젝트 전체를 선택하고 이동합니다."
  },
  {
    id: 15,
    question: "직접 선택 도구(Direct Selection Tool)의 단축키는?",
    options: ["V", "A", "P", "M"],
    answer: 1,
    explanation: "A키는 직접 선택 도구로, 개별 앵커 포인트나 패스 세그먼트를 선택합니다."
  },
  {
    id: 16,
    question: "선택 도구와 직접 선택 도구의 차이점은?",
    options: ["색상 선택 방식", "전체 객체 vs 개별 점/선 선택", "크기 조절 방식", "회전 방식"],
    answer: 1,
    explanation: "선택 도구는 객체 전체를, 직접 선택 도구는 앵커 포인트와 세그먼트를 개별 선택합니다."
  },
  {
    id: 17,
    question: "여러 오브젝트를 추가로 선택하려면 어떤 키를 누른 상태로 클릭해야 하는가?",
    options: ["Alt", "Ctrl", "Shift", "Tab"],
    answer: 2,
    explanation: "Shift 키를 누른 상태로 클릭하면 선택에 추가하거나 해제할 수 있습니다."
  },
  {
    id: 18,
    question: "모든 오브젝트를 선택하는 단축키는?",
    options: ["Ctrl + A", "Ctrl + D", "Ctrl + G", "Ctrl + J"],
    answer: 0,
    explanation: "Ctrl + A는 현재 레이어의 모든 오브젝트를 선택합니다."
  },
  {
    id: 19,
    question: "선택 해제의 단축키는?",
    options: ["Ctrl + A", "Ctrl + D", "Ctrl + Shift + A", "Esc"],
    answer: 2,
    explanation: "Ctrl + Shift + A는 모든 선택을 해제합니다."
  },
  {
    id: 20,
    question: "같은 속성의 오브젝트를 선택하려면 어떤 메뉴를 사용하는가?",
    options: ["편집 메뉴", "선택 > 같음(Select > Same)", "오브젝트 메뉴", "보기 메뉴"],
    answer: 1,
    explanation: "선택 > 같음 메뉴에서 같은 색상, 획, 불투명도 등을 가진 오브젝트를 한 번에 선택할 수 있습니다."
  },
  {
    id: 21,
    question: "올가미 도구(Lasso Tool)의 용도는?",
    options: ["원형 선택", "자유롭게 둘러싸서 선택", "사각형 선택", "패스 그리기"],
    answer: 1,
    explanation: "올가미 도구는 자유로운 형태로 영역을 그려 해당 영역 안의 오브젝트를 선택합니다."
  },
  {
    id: 22,
    question: "마술봉 도구(Magic Wand Tool)의 기능은?",
    options: ["마법 효과 적용", "비슷한 속성의 오브젝트 선택", "자동 그리기", "색상 채우기"],
    answer: 1,
    explanation: "마술봉 도구는 클릭한 오브젝트와 비슷한 색상, 획 등의 속성을 가진 오브젝트를 선택합니다."
  },
  {
    id: 23,
    question: "그룹 선택 도구(Group Selection Tool)의 용도는?",
    options: ["그룹 생성", "그룹 내 개별 오브젝트 선택", "그룹 해제", "그룹 복제"],
    answer: 1,
    explanation: "그룹 선택 도구는 그룹을 해제하지 않고 그룹 내의 개별 오브젝트를 선택할 수 있습니다."
  },
  {
    id: 24,
    question: "선택한 오브젝트를 숨기는 단축키는?",
    options: ["Ctrl + H", "Ctrl + 3", "Ctrl + 2", "Ctrl + 1"],
    answer: 1,
    explanation: "Ctrl + 3은 선택한 오브젝트를 숨깁니다. Ctrl + Alt + 3으로 모두 표시합니다."
  },
  {
    id: 25,
    question: "선택한 오브젝트를 잠그는 단축키는?",
    options: ["Ctrl + 3", "Ctrl + 2", "Ctrl + L", "Ctrl + K"],
    answer: 1,
    explanation: "Ctrl + 2는 선택한 오브젝트를 잠급니다. Ctrl + Alt + 2로 모두 잠금 해제합니다."
  },
  // 도형 도구 (13문항)
  {
    id: 26,
    question: "사각형 도구(Rectangle Tool)의 단축키는?",
    options: ["R", "M", "L", "E"],
    answer: 1,
    explanation: "M키는 사각형 도구의 단축키입니다."
  },
  {
    id: 27,
    question: "원형 도구(Ellipse Tool)의 단축키는?",
    options: ["O", "L", "E", "C"],
    answer: 1,
    explanation: "L키는 원형(타원) 도구의 단축키입니다."
  },
  {
    id: 28,
    question: "정사각형을 그리려면 어떤 키를 누른 상태로 드래그해야 하는가?",
    options: ["Alt", "Ctrl", "Shift", "Tab"],
    answer: 2,
    explanation: "Shift 키를 누른 상태로 드래그하면 가로세로 비율이 1:1인 정사각형이나 정원이 그려집니다."
  },
  {
    id: 29,
    question: "중심에서부터 도형을 그리려면 어떤 키를 누른 상태로 드래그해야 하는가?",
    options: ["Shift", "Alt", "Ctrl", "Space"],
    answer: 1,
    explanation: "Alt 키를 누른 상태로 드래그하면 클릭한 지점을 중심으로 도형이 그려집니다."
  },
  {
    id: 30,
    question: "다각형 도구에서 변의 수를 조절하는 방법은?",
    options: ["드래그 중 Shift 키", "드래그 중 위/아래 화살표 키", "드래그 중 Alt 키", "드래그 중 Ctrl 키"],
    answer: 1,
    explanation: "다각형을 그리는 중 위/아래 화살표 키를 누르면 변의 수를 늘리거나 줄일 수 있습니다."
  },
  {
    id: 31,
    question: "별 도구(Star Tool)에서 꼭지점 수를 조절하는 방법은?",
    options: ["Shift 키", "위/아래 화살표 키", "좌/우 화살표 키", "숫자 키"],
    answer: 1,
    explanation: "별을 그리는 중 위/아래 화살표 키로 꼭지점(뾰족한 부분) 수를 조절합니다."
  },
  {
    id: 32,
    question: "둥근 모서리 사각형을 그리는 도구는?",
    options: ["Rectangle Tool", "Rounded Rectangle Tool", "Ellipse Tool", "Polygon Tool"],
    answer: 1,
    explanation: "Rounded Rectangle Tool(둥근 사각형 도구)로 모서리가 둥근 사각형을 그립니다."
  },
  {
    id: 33,
    question: "선 도구(Line Segment Tool)의 단축키는?",
    options: ["L", "\\", "/", "-"],
    answer: 1,
    explanation: "백슬래시(\\)키는 선 도구의 단축키입니다."
  },
  {
    id: 34,
    question: "45도 각도로 직선을 그리려면?",
    options: ["Alt 키를 누른 상태로", "Shift 키를 누른 상태로", "Ctrl 키를 누른 상태로", "자동으로 45도"],
    answer: 1,
    explanation: "Shift 키를 누른 상태로 드래그하면 0, 45, 90도 등으로 각도가 제한됩니다."
  },
  {
    id: 35,
    question: "호(Arc) 도구의 용도는?",
    options: ["직선 그리기", "곡선 호 그리기", "원 그리기", "사각형 그리기"],
    answer: 1,
    explanation: "호 도구는 열린 곡선 형태의 호를 그립니다."
  },
  {
    id: 36,
    question: "나선형(Spiral) 도구의 용도는?",
    options: ["직선 패턴", "나선형 패스 그리기", "원형 패턴", "사각형 패턴"],
    answer: 1,
    explanation: "나선형 도구는 소용돌이 모양의 나선을 그립니다."
  },
  {
    id: 37,
    question: "사각 격자(Rectangular Grid) 도구의 용도는?",
    options: ["표 형태의 격자 그리기", "원형 격자 그리기", "사진 자르기", "색상 선택"],
    answer: 0,
    explanation: "사각 격자 도구는 가로/세로로 분할된 격자 형태를 한 번에 그립니다."
  },
  {
    id: 38,
    question: "극좌표 격자(Polar Grid) 도구의 용도는?",
    options: ["사각형 격자", "원형 방사형 격자 그리기", "직선 그리기", "곡선 그리기"],
    answer: 1,
    explanation: "극좌표 격자 도구는 방사형으로 분할된 원형 격자를 그립니다."
  },
  // 색상과 획 (12문항)
  {
    id: 39,
    question: "면색(Fill)과 획색(Stroke)을 전환하는 단축키는?",
    options: ["D", "X", "S", "F"],
    answer: 1,
    explanation: "X키를 누르면 면색과 획색이 서로 전환됩니다."
  },
  {
    id: 40,
    question: "면색/획색을 기본값(흰색 면, 검정 획)으로 초기화하는 단축키는?",
    options: ["X", "D", "F", "S"],
    answer: 1,
    explanation: "D키를 누르면 면색은 흰색, 획색은 검정으로 초기화됩니다."
  },
  {
    id: 41,
    question: "면색이나 획색을 없음(None)으로 설정하는 단축키는?",
    options: ["/", "\\", ".", ","],
    answer: 0,
    explanation: "슬래시(/)키를 누르면 현재 선택된 면색 또는 획색이 없음으로 설정됩니다."
  },
  {
    id: 42,
    question: "색상 패널을 여는 단축키는?",
    options: ["F5", "F6", "F7", "F8"],
    answer: 1,
    explanation: "F6키는 색상 패널을 열거나 닫습니다."
  },
  {
    id: 43,
    question: "획(Stroke) 패널에서 설정할 수 없는 것은?",
    options: ["획 두께", "선 끝 모양", "모서리 모양", "면 색상"],
    answer: 3,
    explanation: "획 패널에서는 획의 두께, 선 끝 모양, 모서리, 점선 등을 설정합니다. 면 색상은 설정하지 않습니다."
  },
  {
    id: 44,
    question: "획의 모서리 모양(Join)에 해당하지 않는 것은?",
    options: ["마이터(Miter)", "라운드(Round)", "베벨(Bevel)", "스퀘어(Square)"],
    answer: 3,
    explanation: "모서리 모양에는 마이터(뾰족), 라운드(둥근), 베벨(깎인)이 있습니다. 스퀘어는 선 끝 모양입니다."
  },
  {
    id: 45,
    question: "점선을 만들려면 획 패널의 어떤 옵션을 설정해야 하는가?",
    options: ["선 두께", "점선(Dashed Line)", "선 끝 모양", "정렬"],
    answer: 1,
    explanation: "획 패널의 점선(Dashed Line) 옵션을 체크하고 간격을 설정하면 점선이 됩니다."
  },
  {
    id: 46,
    question: "스포이드 도구(Eyedropper Tool)의 단축키는?",
    options: ["E", "I", "S", "P"],
    answer: 1,
    explanation: "I키는 스포이드 도구로, 다른 오브젝트의 속성(색상, 획 등)을 복사합니다."
  },
  {
    id: 47,
    question: "스와치(Swatches) 패널의 용도는?",
    options: ["레이어 관리", "색상 저장 및 관리", "효과 적용", "정렬"],
    answer: 1,
    explanation: "스와치 패널에는 자주 사용하는 색상, 그라디언트, 패턴을 저장하고 적용합니다."
  },
  {
    id: 48,
    question: "전역 색상(Global Color)의 특징은?",
    options: ["한 번만 사용 가능", "수정하면 적용된 모든 곳이 변경됨", "CMYK 전용", "웹 전용"],
    answer: 1,
    explanation: "전역 색상은 수정하면 해당 색상이 적용된 모든 오브젝트에 자동으로 반영됩니다."
  },
  {
    id: 49,
    question: "색상 모드 중 인쇄용으로 적합한 것은?",
    options: ["RGB", "CMYK", "HSB", "Grayscale"],
    answer: 1,
    explanation: "CMYK는 4색 인쇄를 위한 색상 모드입니다."
  },
  {
    id: 50,
    question: "색상 모드 중 웹/화면용으로 적합한 것은?",
    options: ["CMYK", "RGB", "LAB", "Grayscale"],
    answer: 1,
    explanation: "RGB는 모니터 등 화면 표시에 적합한 색상 모드입니다."
  }
];

export default function AIBasicsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('gtqi-ai-basics-progress');
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
      localStorage.setItem('gtqi-ai-basics-progress', JSON.stringify({
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
    localStorage.removeItem('gtqi-ai-basics-progress');
  };

  if (!isClient || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/category/design/gtqi" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQi로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">일러스트 기초</h1>
            <span className="text-sm text-gray-500">{currentQuestion + 1} / {questions.length}</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>진행률: {answeredQuestions.size}/{questions.length}</span>
              <span>점수: {score}/{answeredQuestions.size}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                {question.id <= 13 ? '인터페이스 기초' : question.id <= 25 ? '선택 도구' : question.id <= 38 ? '도형 도구' : '색상과 획'}
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
                      : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50'
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
            <button onClick={resetQuiz} className="px-6 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">다시 시작</button>
            <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">다음</button>
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
                  currentQuestion === index ? 'bg-orange-500 text-white' : answeredQuestions.has(index) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
