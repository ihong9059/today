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
  // 선택 도구 (13문항)
  {
    id: 1,
    question: "사각형 선택 윤곽 도구의 단축키는?",
    options: ["V", "M", "L", "W"],
    answer: 1,
    explanation: "M키는 사각형/원형 선택 윤곽 도구(Marquee Tool)의 단축키입니다."
  },
  {
    id: 2,
    question: "선택 영역을 정사각형으로 만들려면 어떤 키를 누른 상태에서 드래그해야 하는가?",
    options: ["Ctrl", "Alt", "Shift", "Tab"],
    answer: 2,
    explanation: "Shift 키를 누른 상태에서 드래그하면 정사각형 또는 정원 선택 영역을 만들 수 있습니다."
  },
  {
    id: 3,
    question: "올가미 도구(Lasso Tool)의 단축키는?",
    options: ["M", "L", "W", "P"],
    answer: 1,
    explanation: "L키는 올가미 도구(Lasso Tool)의 단축키로, 자유롭게 선택 영역을 그릴 수 있습니다."
  },
  {
    id: 4,
    question: "다각형 올가미 도구의 특징으로 옳은 것은?",
    options: ["곡선 선택에 적합", "직선으로 연결되는 선택 영역 생성", "자동으로 윤곽 감지", "색상 기반 선택"],
    answer: 1,
    explanation: "다각형 올가미 도구는 클릭한 점들을 직선으로 연결하여 선택 영역을 만듭니다."
  },
  {
    id: 5,
    question: "자석 올가미 도구가 윤곽을 인식하는 기준은?",
    options: ["색상 차이", "명도 대비(가장자리)", "파일 크기", "레이어 순서"],
    answer: 1,
    explanation: "자석 올가미 도구는 이미지의 명도 대비(가장자리)를 인식하여 자동으로 윤곽을 따라갑니다."
  },
  {
    id: 6,
    question: "빠른 선택 도구(Quick Selection Tool)의 단축키는?",
    options: ["M", "L", "W", "Q"],
    answer: 2,
    explanation: "W키는 빠른 선택 도구와 마법봉 도구의 단축키입니다."
  },
  {
    id: 7,
    question: "마법봉 도구에서 '허용치(Tolerance)'의 역할은?",
    options: ["선택 영역의 크기 결정", "유사한 색상 범위 결정", "브러시 크기 결정", "레이어 투명도 결정"],
    answer: 1,
    explanation: "허용치는 클릭한 픽셀과 얼마나 유사한 색상까지 선택할지 결정하며, 값이 높을수록 넓은 범위를 선택합니다."
  },
  {
    id: 8,
    question: "선택 영역에서 일부를 빼려면 어떤 키를 누른 상태에서 선택해야 하는가?",
    options: ["Shift", "Alt", "Ctrl", "Tab"],
    answer: 1,
    explanation: "Alt 키를 누른 상태에서 선택하면 기존 선택 영역에서 뺄 수 있습니다."
  },
  {
    id: 9,
    question: "선택 영역에 추가하려면 어떤 키를 누른 상태에서 선택해야 하는가?",
    options: ["Alt", "Shift", "Ctrl", "Space"],
    answer: 1,
    explanation: "Shift 키를 누른 상태에서 선택하면 기존 선택 영역에 추가할 수 있습니다."
  },
  {
    id: 10,
    question: "선택 영역을 반전시키는 단축키는?",
    options: ["Ctrl + A", "Ctrl + D", "Ctrl + Shift + I", "Ctrl + T"],
    answer: 2,
    explanation: "Ctrl + Shift + I (또는 메뉴의 선택 > 반전)로 선택 영역을 반전할 수 있습니다."
  },
  {
    id: 11,
    question: "선택 영역을 해제하는 단축키는?",
    options: ["Ctrl + A", "Ctrl + D", "Ctrl + Z", "Ctrl + S"],
    answer: 1,
    explanation: "Ctrl + D는 선택 영역을 해제(Deselect)하는 단축키입니다."
  },
  {
    id: 12,
    question: "전체 선택의 단축키는?",
    options: ["Ctrl + A", "Ctrl + D", "Ctrl + C", "Ctrl + V"],
    answer: 0,
    explanation: "Ctrl + A는 캔버스 전체를 선택(Select All)하는 단축키입니다."
  },
  {
    id: 13,
    question: "'선택 및 마스크' 기능의 주요 용도는?",
    options: ["색상 변경", "정교한 선택 영역 다듬기", "파일 저장", "레이어 생성"],
    answer: 1,
    explanation: "'선택 및 마스크' 기능은 머리카락 같은 복잡한 가장자리를 정교하게 선택할 때 사용합니다."
  },
  // 이동/변형 도구 (12문항)
  {
    id: 14,
    question: "이동 도구(Move Tool)의 단축키는?",
    options: ["M", "V", "L", "W"],
    answer: 1,
    explanation: "V키는 이동 도구(Move Tool)의 단축키로, 레이어나 선택 영역을 이동할 때 사용합니다."
  },
  {
    id: 15,
    question: "자유 변형(Free Transform)의 단축키는?",
    options: ["Ctrl + T", "Ctrl + D", "Ctrl + Z", "Ctrl + S"],
    answer: 0,
    explanation: "Ctrl + T는 자유 변형 모드를 활성화하는 단축키입니다."
  },
  {
    id: 16,
    question: "자유 변형 시 비율을 유지하면서 크기를 조절하려면?",
    options: ["Alt 키를 누른 상태로 드래그", "Shift 키를 누른 상태로 드래그", "Ctrl 키를 누른 상태로 드래그", "그냥 드래그"],
    answer: 1,
    explanation: "Shift 키를 누른 상태로 모서리 핸들을 드래그하면 가로세로 비율이 유지됩니다."
  },
  {
    id: 17,
    question: "자유 변형 시 중심점을 기준으로 확대/축소하려면?",
    options: ["Shift 키", "Alt 키", "Ctrl 키", "Tab 키"],
    answer: 1,
    explanation: "Alt 키를 누른 상태로 드래그하면 오브젝트의 중심을 기준으로 크기가 조절됩니다."
  },
  {
    id: 18,
    question: "이미지를 회전할 때 15도 단위로 회전시키려면?",
    options: ["Alt 키 누르기", "Shift 키 누르기", "Ctrl 키 누르기", "Space 키 누르기"],
    answer: 1,
    explanation: "Shift 키를 누른 상태로 회전하면 15도 단위로 각도가 제한됩니다."
  },
  {
    id: 19,
    question: "뒤틀기(Warp) 기능의 용도는?",
    options: ["색상 변경", "이미지를 곡면 형태로 변형", "레이어 병합", "파일 저장"],
    answer: 1,
    explanation: "뒤틀기는 이미지를 격자 형태로 곡면 변형할 수 있는 기능입니다."
  },
  {
    id: 20,
    question: "원근 변형(Perspective)의 특징은?",
    options: ["색상만 변경", "원근감을 표현하는 변형", "회전만 가능", "크기만 조절"],
    answer: 1,
    explanation: "원근 변형은 사다리꼴 형태로 변형하여 원근감을 표현할 수 있습니다."
  },
  {
    id: 21,
    question: "자르기 도구(Crop Tool)의 단축키는?",
    options: ["C", "V", "M", "L"],
    answer: 0,
    explanation: "C키는 자르기 도구(Crop Tool)의 단축키입니다."
  },
  {
    id: 22,
    question: "자르기 도구에서 특정 비율로 자르려면?",
    options: ["Alt 키 사용", "옵션 바에서 비율 설정", "Ctrl 키 사용", "불가능함"],
    answer: 1,
    explanation: "상단 옵션 바에서 원하는 비율(예: 16:9, 4:3 등)을 설정할 수 있습니다."
  },
  {
    id: 23,
    question: "콘텐츠 인식 비율(Content-Aware Scale)의 특징은?",
    options: ["모든 부분을 균등하게 변형", "중요한 부분을 보호하면서 변형", "색상만 변경", "레이어 병합"],
    answer: 1,
    explanation: "콘텐츠 인식 비율은 인물 등 중요한 피사체를 보호하면서 배경을 늘이거나 줄일 수 있습니다."
  },
  {
    id: 24,
    question: "퍼펫 뒤틀기(Puppet Warp)의 용도는?",
    options: ["색상 보정", "핀을 사용한 부분 변형", "파일 저장", "레이어 생성"],
    answer: 1,
    explanation: "퍼펫 뒤틀기는 핀을 배치하여 이미지의 특정 부분을 자연스럽게 변형합니다."
  },
  {
    id: 25,
    question: "스마트 오브젝트의 장점은?",
    options: ["파일 크기 감소", "비파괴 변형 가능", "색상 자동 보정", "자동 저장"],
    answer: 1,
    explanation: "스마트 오브젝트는 원본 품질을 유지하면서 여러 번 변형해도 화질 저하가 없습니다."
  },
  // 브러시/페인팅 도구 (13문항)
  {
    id: 26,
    question: "브러시 도구(Brush Tool)의 단축키는?",
    options: ["B", "E", "P", "G"],
    answer: 0,
    explanation: "B키는 브러시 도구(Brush Tool)의 단축키입니다."
  },
  {
    id: 27,
    question: "브러시 크기를 키보드로 조절하는 방법은?",
    options: ["[ ] 키 사용", "- + 키 사용", "< > 키 사용", "( ) 키 사용"],
    answer: 0,
    explanation: "[ 키로 브러시 크기를 줄이고, ] 키로 브러시 크기를 키울 수 있습니다."
  },
  {
    id: 28,
    question: "브러시 경도(Hardness)가 100%일 때의 특징은?",
    options: ["가장자리가 부드러움", "가장자리가 선명함", "투명하게 그려짐", "점선으로 그려짐"],
    answer: 1,
    explanation: "경도 100%는 브러시 가장자리가 선명하고 뚜렷합니다. 0%에 가까울수록 부드럽습니다."
  },
  {
    id: 29,
    question: "지우개 도구(Eraser Tool)의 단축키는?",
    options: ["B", "E", "D", "X"],
    answer: 1,
    explanation: "E키는 지우개 도구(Eraser Tool)의 단축키입니다."
  },
  {
    id: 30,
    question: "페인트 통 도구(Paint Bucket Tool)의 기능은?",
    options: ["선 그리기", "영역 채우기", "지우기", "선택하기"],
    answer: 1,
    explanation: "페인트 통 도구는 클릭한 영역을 전경색으로 채웁니다."
  },
  {
    id: 31,
    question: "그라디언트 도구(Gradient Tool)의 단축키는?",
    options: ["B", "G", "P", "E"],
    answer: 1,
    explanation: "G키는 그라디언트 도구의 단축키입니다 (페인트 통과 같은 그룹)."
  },
  {
    id: 32,
    question: "전경색과 배경색을 전환하는 단축키는?",
    options: ["D", "X", "B", "E"],
    answer: 1,
    explanation: "X키를 누르면 전경색과 배경색이 서로 바뀝니다."
  },
  {
    id: 33,
    question: "전경색/배경색을 기본값(검정/흰색)으로 초기화하는 단축키는?",
    options: ["X", "D", "B", "E"],
    answer: 1,
    explanation: "D키를 누르면 전경색은 검정, 배경색은 흰색으로 초기화됩니다."
  },
  {
    id: 34,
    question: "스포이드 도구(Eyedropper Tool)의 단축키는?",
    options: ["I", "E", "S", "P"],
    answer: 0,
    explanation: "I키는 스포이드 도구의 단축키로, 이미지에서 색상을 추출합니다."
  },
  {
    id: 35,
    question: "복제 도장 도구(Clone Stamp Tool)의 단축키는?",
    options: ["C", "S", "J", "B"],
    answer: 1,
    explanation: "S키는 복제 도장 도구의 단축키로, 이미지의 한 부분을 다른 곳에 복제합니다."
  },
  {
    id: 36,
    question: "복제 도장 도구 사용 시 샘플링 지점을 지정하는 방법은?",
    options: ["Shift + 클릭", "Alt + 클릭", "Ctrl + 클릭", "더블 클릭"],
    answer: 1,
    explanation: "Alt 키를 누른 상태에서 클릭하여 복제할 원본 지점을 지정합니다."
  },
  {
    id: 37,
    question: "힐링 브러시 도구(Healing Brush Tool)의 특징은?",
    options: ["그대로 복제", "주변과 자연스럽게 혼합", "색상만 복제", "밝기만 복제"],
    answer: 1,
    explanation: "힐링 브러시는 복제한 텍스처를 주변 색상, 밝기와 자연스럽게 혼합합니다."
  },
  {
    id: 38,
    question: "스팟 힐링 브러시 도구의 장점은?",
    options: ["샘플링 지점 필요", "샘플링 지점 불필요, 자동 복구", "색상 변경 전용", "선택 도구"],
    answer: 1,
    explanation: "스팟 힐링 브러시는 Alt+클릭으로 샘플링하지 않아도 자동으로 주변을 인식하여 복구합니다."
  },
  // 기타 도구 (12문항)
  {
    id: 39,
    question: "펜 도구(Pen Tool)의 단축키는?",
    options: ["P", "B", "V", "L"],
    answer: 0,
    explanation: "P키는 펜 도구(Pen Tool)의 단축키로, 정밀한 패스를 그릴 수 있습니다."
  },
  {
    id: 40,
    question: "문자 도구(Type Tool)의 단축키는?",
    options: ["T", "F", "A", "S"],
    answer: 0,
    explanation: "T키는 문자 도구(Type Tool)의 단축키입니다."
  },
  {
    id: 41,
    question: "손 도구(Hand Tool)의 단축키는?",
    options: ["V", "H", "Z", "M"],
    answer: 1,
    explanation: "H키는 손 도구의 단축키로, 캔버스를 이동할 수 있습니다. 또는 Space 키를 누르고 있으면 임시로 손 도구가 됩니다."
  },
  {
    id: 42,
    question: "돋보기 도구(Zoom Tool)의 단축키는?",
    options: ["H", "Z", "V", "M"],
    answer: 1,
    explanation: "Z키는 돋보기 도구의 단축키로, 화면을 확대/축소합니다."
  },
  {
    id: 43,
    question: "화면을 100%로 보는 단축키는?",
    options: ["Ctrl + 0", "Ctrl + 1", "Ctrl + 2", "Ctrl + 3"],
    answer: 1,
    explanation: "Ctrl + 1은 화면을 100% 실제 크기로 표시합니다."
  },
  {
    id: 44,
    question: "화면에 맞추기(Fit on Screen)의 단축키는?",
    options: ["Ctrl + 0", "Ctrl + 1", "Ctrl + +", "Ctrl + -"],
    answer: 0,
    explanation: "Ctrl + 0은 캔버스를 화면에 맞춰 전체가 보이도록 합니다."
  },
  {
    id: 45,
    question: "모양 도구(Shape Tool)의 단축키는?",
    options: ["S", "U", "P", "M"],
    answer: 1,
    explanation: "U키는 모양 도구(사각형, 원형, 다각형 등)의 단축키입니다."
  },
  {
    id: 46,
    question: "직접 선택 도구(Direct Selection Tool)의 단축키는?",
    options: ["V", "A", "P", "M"],
    answer: 1,
    explanation: "A키는 직접 선택 도구의 단축키로, 패스의 개별 앵커 포인트를 선택합니다."
  },
  {
    id: 47,
    question: "작업 취소(Undo)의 단축키는?",
    options: ["Ctrl + Y", "Ctrl + Z", "Ctrl + X", "Ctrl + C"],
    answer: 1,
    explanation: "Ctrl + Z는 마지막 작업을 취소합니다."
  },
  {
    id: 48,
    question: "여러 단계 뒤로 가기(Step Backward)의 단축키는?",
    options: ["Ctrl + Z", "Ctrl + Alt + Z", "Ctrl + Shift + Z", "Ctrl + Y"],
    answer: 1,
    explanation: "Ctrl + Alt + Z를 누르면 여러 단계의 작업을 순차적으로 취소할 수 있습니다."
  },
  {
    id: 49,
    question: "새 레이어 생성 단축키는?",
    options: ["Ctrl + N", "Ctrl + Shift + N", "Ctrl + L", "Ctrl + J"],
    answer: 1,
    explanation: "Ctrl + Shift + N은 새 레이어 대화상자를 열어 새 레이어를 생성합니다."
  },
  {
    id: 50,
    question: "선택 영역을 새 레이어로 복사하는 단축키는?",
    options: ["Ctrl + C", "Ctrl + J", "Ctrl + V", "Ctrl + X"],
    answer: 1,
    explanation: "Ctrl + J는 선택 영역을 복사하여 새 레이어로 만듭니다."
  }
];

export default function PSToolsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('gtq-ps-tools-progress');
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
      localStorage.setItem('gtq-ps-tools-progress', JSON.stringify({
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
    localStorage.removeItem('gtq-ps-tools-progress');
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
            <h1 className="text-2xl font-bold text-gray-800">포토샵 도구</h1>
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
                {question.id <= 13 ? '선택 도구' : question.id <= 25 ? '이동/변형 도구' : question.id <= 38 ? '브러시/페인팅 도구' : '기타 도구'}
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
