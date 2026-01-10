'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  // 펜 도구 기초 (12문제)
  {
    id: 1,
    question: "일러스트레이터에서 펜 도구의 단축키는?",
    options: ["A", "P", "V", "L"],
    answer: 1,
    explanation: "펜 도구(Pen Tool)의 단축키는 P입니다.",
    category: "펜 도구 기초"
  },
  {
    id: 2,
    question: "펜 도구로 직선을 그리려면 어떻게 해야 하는가?",
    options: ["드래그하여 그린다", "클릭만 하여 점을 찍는다", "Shift를 누르고 드래그한다", "Alt를 누르고 클릭한다"],
    answer: 1,
    explanation: "직선은 펜 도구로 클릭만 하여 앵커 포인트를 찍으면 됩니다. 드래그하면 곡선이 만들어집니다.",
    category: "펜 도구 기초"
  },
  {
    id: 3,
    question: "펜 도구로 곡선을 만들려면?",
    options: ["클릭만 한다", "클릭 후 드래그한다", "더블클릭한다", "Ctrl+클릭한다"],
    answer: 1,
    explanation: "곡선은 클릭 후 드래그하여 방향선(핸들)을 만들면 생성됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 4,
    question: "열린 패스를 닫으려면?",
    options: ["Esc를 누른다", "시작점을 클릭한다", "Enter를 누른다", "더블클릭한다"],
    answer: 1,
    explanation: "열린 패스의 시작점을 클릭하면 패스가 닫힙니다. 커서 옆에 작은 원이 표시됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 5,
    question: "펜 도구 사용 중 패스 그리기를 끝내려면?",
    options: ["시작점 클릭", "Ctrl+클릭 (빈 영역)", "Delete 키", "Backspace 키"],
    answer: 1,
    explanation: "Ctrl(Cmd)+클릭으로 빈 영역을 클릭하면 현재 패스 그리기가 종료됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 6,
    question: "펜 도구로 45도 각도의 직선을 그리려면?",
    options: ["Alt를 누르고 클릭", "Shift를 누르고 클릭", "Ctrl을 누르고 클릭", "스페이스바를 누르고 클릭"],
    answer: 1,
    explanation: "Shift를 누르면 45도 단위(0, 45, 90, 135도 등)로 제한됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 7,
    question: "곡선을 그린 후 다음 점에서 직선으로 전환하려면?",
    options: ["Shift+클릭", "Alt+마지막 점 클릭", "Ctrl+클릭", "더블클릭"],
    answer: 1,
    explanation: "Alt(Option)를 누르고 마지막 앵커 포인트를 클릭하면 방향선이 제거되어 다음 선분이 직선이 됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 8,
    question: "펜 도구 사용 중 마지막 앵커 포인트를 삭제하려면?",
    options: ["Backspace/Delete", "Ctrl+Z", "Esc", "Enter"],
    answer: 0,
    explanation: "Backspace 또는 Delete 키를 누르면 마지막으로 찍은 앵커 포인트가 삭제됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 9,
    question: "연필 도구(Pencil Tool)의 특징은?",
    options: ["정밀한 곡선 제어", "자유로운 프리핸드 드로잉", "직선만 그릴 수 있음", "원만 그릴 수 있음"],
    answer: 1,
    explanation: "연필 도구는 마우스를 드래그하여 자유롭게 패스를 그리는 프리핸드 도구입니다.",
    category: "펜 도구 기초"
  },
  {
    id: 10,
    question: "곡률 도구(Curvature Tool)의 장점은?",
    options: ["직선만 그릴 수 있다", "방향선 없이 직관적으로 곡선 생성", "속도가 빠르다", "정밀도가 낮다"],
    answer: 1,
    explanation: "곡률 도구는 클릭만으로 부드러운 곡선을 만들 수 있어 펜 도구보다 직관적입니다.",
    category: "펜 도구 기초"
  },
  {
    id: 11,
    question: "펜 도구 사용 시 커서 옆에 '+' 기호가 나타나는 경우는?",
    options: ["앵커 포인트 삭제 가능", "앵커 포인트 추가 가능", "패스 시작", "패스 종료"],
    answer: 1,
    explanation: "기존 패스 위에서 펜 도구를 사용하면 '+' 기호가 나타나며, 클릭 시 앵커 포인트가 추가됩니다.",
    category: "펜 도구 기초"
  },
  {
    id: 12,
    question: "펜 도구 사용 시 커서 옆에 '-' 기호가 나타나는 경우는?",
    options: ["새 패스 시작", "앵커 포인트 위", "패스 연결 가능", "패스 삭제"],
    answer: 1,
    explanation: "기존 앵커 포인트 위에서 펜 도구를 사용하면 '-' 기호가 나타나며, 클릭 시 앵커 포인트가 삭제됩니다.",
    category: "펜 도구 기초"
  },
  // 베지어 곡선 (13문제)
  {
    id: 13,
    question: "베지어 곡선(Bezier Curve)의 구성 요소가 아닌 것은?",
    options: ["앵커 포인트", "방향선(핸들)", "제어점", "필터"],
    answer: 3,
    explanation: "베지어 곡선은 앵커 포인트, 방향선(핸들), 제어점으로 구성됩니다. 필터는 구성 요소가 아닙니다.",
    category: "베지어 곡선"
  },
  {
    id: 14,
    question: "방향선(Direction Handle)의 역할은?",
    options: ["패스의 색상 결정", "곡선의 방향과 곡률 제어", "앵커 포인트 삭제", "레이어 순서 변경"],
    answer: 1,
    explanation: "방향선은 곡선이 휘어지는 방향과 정도(곡률)를 제어합니다.",
    category: "베지어 곡선"
  },
  {
    id: 15,
    question: "방향선을 길게 드래그하면?",
    options: ["곡선이 더 급하게 휜다", "곡선이 더 완만해진다", "직선이 된다", "패스가 삭제된다"],
    answer: 1,
    explanation: "방향선이 길수록 곡선이 더 완만하게 휘어집니다.",
    category: "베지어 곡선"
  },
  {
    id: 16,
    question: "부드러운 점(Smooth Point)의 특징은?",
    options: ["방향선이 없다", "양쪽 방향선이 일직선상에 있다", "한쪽 방향선만 있다", "꺾인 각도를 만든다"],
    answer: 1,
    explanation: "부드러운 점은 양쪽 방향선이 일직선상에 있어 곡선이 매끄럽게 연결됩니다.",
    category: "베지어 곡선"
  },
  {
    id: 17,
    question: "모서리 점(Corner Point)의 특징은?",
    options: ["곡선만 만들 수 있다", "방향선이 서로 독립적", "항상 방향선이 없다", "삭제할 수 없다"],
    answer: 1,
    explanation: "모서리 점은 양쪽 방향선이 독립적으로 움직여 꺾인 각도나 방향 전환을 만듭니다.",
    category: "베지어 곡선"
  },
  {
    id: 18,
    question: "부드러운 점을 모서리 점으로 변환하려면?",
    options: ["Delete 키", "앵커 포인트 도구로 클릭", "Shift+클릭", "Ctrl+D"],
    answer: 1,
    explanation: "앵커 포인트 도구(Anchor Point Tool)로 부드러운 점을 클릭하면 모서리 점으로 변환됩니다.",
    category: "베지어 곡선"
  },
  {
    id: 19,
    question: "모서리 점을 부드러운 점으로 변환하려면?",
    options: ["앵커 포인트 도구로 드래그", "Delete 키", "Enter 키", "Ctrl+클릭"],
    answer: 0,
    explanation: "앵커 포인트 도구로 모서리 점을 드래그하면 방향선이 생기며 부드러운 점이 됩니다.",
    category: "베지어 곡선"
  },
  {
    id: 20,
    question: "한쪽 방향선만 독립적으로 조절하려면?",
    options: ["Shift+드래그", "Alt+드래그", "Ctrl+드래그", "스페이스바+드래그"],
    answer: 1,
    explanation: "Alt(Option)를 누르고 방향선을 드래그하면 해당 방향선만 독립적으로 조절됩니다.",
    category: "베지어 곡선"
  },
  {
    id: 21,
    question: "3차 베지어 곡선의 제어점 개수는?",
    options: ["2개", "3개", "4개", "5개"],
    answer: 2,
    explanation: "3차 베지어 곡선은 시작점, 끝점, 2개의 제어점으로 총 4개의 점으로 정의됩니다.",
    category: "베지어 곡선"
  },
  {
    id: 22,
    question: "베지어 곡선이 항상 제어점을 통과하는가?",
    options: ["예, 모든 제어점을 통과한다", "아니오, 시작점과 끝점만 통과한다", "제어점에 따라 다르다", "통과 여부를 설정할 수 있다"],
    answer: 1,
    explanation: "베지어 곡선은 시작점과 끝점만 통과하며, 중간 제어점은 곡선의 형태만 제어합니다.",
    category: "베지어 곡선"
  },
  {
    id: 23,
    question: "S자 곡선을 만들려면 최소 몇 개의 앵커 포인트가 필요한가?",
    options: ["2개", "3개", "4개", "5개"],
    answer: 1,
    explanation: "S자 곡선은 최소 3개의 앵커 포인트(시작, 중간 변곡점, 끝)로 만들 수 있습니다.",
    category: "베지어 곡선"
  },
  {
    id: 24,
    question: "곡선의 변곡점(Inflection Point)이란?",
    options: ["곡선의 시작점", "곡선의 방향이 바뀌는 점", "곡선의 끝점", "방향선의 끝점"],
    answer: 1,
    explanation: "변곡점은 곡선이 한 방향에서 다른 방향으로 휘어지는 지점입니다.",
    category: "베지어 곡선"
  },
  {
    id: 25,
    question: "방향선의 각도가 곡선에 미치는 영향은?",
    options: ["곡선의 색상 결정", "곡선이 휘어지는 방향 결정", "곡선의 두께 결정", "영향 없음"],
    answer: 1,
    explanation: "방향선의 각도는 곡선이 어느 방향으로 휘어질지 결정합니다.",
    category: "베지어 곡선"
  },
  // 앵커 포인트 편집 (13문제)
  {
    id: 26,
    question: "앵커 포인트 추가 도구의 단축키는?",
    options: ["P", "+", "Shift+P", "없음 (펜 도구에서 자동 전환)"],
    answer: 3,
    explanation: "펜 도구 상태에서 패스 위에 마우스를 올리면 자동으로 앵커 포인트 추가 모드로 전환됩니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 27,
    question: "앵커 포인트 삭제 도구의 단축키는?",
    options: ["-", "Delete", "Backspace", "없음 (펜 도구에서 자동 전환)"],
    answer: 3,
    explanation: "펜 도구 상태에서 앵커 포인트 위에 마우스를 올리면 자동으로 삭제 모드로 전환됩니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 28,
    question: "직접 선택 도구(Direct Selection Tool)의 단축키는?",
    options: ["V", "A", "P", "D"],
    answer: 1,
    explanation: "직접 선택 도구의 단축키는 A입니다. 개별 앵커 포인트나 방향선을 선택할 수 있습니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 29,
    question: "선택 도구(Selection Tool)와 직접 선택 도구의 차이점은?",
    options: ["차이 없음", "선택 도구는 전체 오브젝트, 직접 선택 도구는 개별 점 선택", "색상만 다름", "속도만 다름"],
    answer: 1,
    explanation: "선택 도구(V)는 전체 오브젝트를 선택하고, 직접 선택 도구(A)는 개별 앵커 포인트나 세그먼트를 선택합니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 30,
    question: "여러 앵커 포인트를 동시에 선택하려면?",
    options: ["Alt+클릭", "Shift+클릭", "Ctrl+클릭", "더블클릭"],
    answer: 1,
    explanation: "Shift를 누르고 클릭하면 여러 앵커 포인트를 추가로 선택할 수 있습니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 31,
    question: "앵커 포인트를 정확한 위치로 이동하려면?",
    options: ["마우스로 드래그", "변형 패널에서 좌표 입력", "방향키만 사용", "불가능"],
    answer: 1,
    explanation: "변형(Transform) 패널에서 X, Y 좌표를 직접 입력하면 정확한 위치로 이동할 수 있습니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 32,
    question: "앵커 포인트를 수평/수직으로만 이동하려면?",
    options: ["Alt+드래그", "Shift+드래그", "Ctrl+드래그", "스페이스바+드래그"],
    answer: 1,
    explanation: "Shift를 누르고 드래그하면 수평, 수직, 45도 각도로만 이동이 제한됩니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 33,
    question: "패스의 일부 세그먼트만 선택하려면?",
    options: ["선택 도구 사용", "직접 선택 도구로 세그먼트 클릭", "마술봉 도구 사용", "불가능"],
    answer: 1,
    explanation: "직접 선택 도구(A)로 패스의 선분(세그먼트)을 클릭하면 해당 부분만 선택됩니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 34,
    question: "선택한 앵커 포인트를 1픽셀씩 이동하려면?",
    options: ["마우스 드래그", "방향키", "Ctrl+방향키", "숫자 입력"],
    answer: 1,
    explanation: "방향키를 누르면 선택한 앵커 포인트가 1픽셀(또는 설정된 단위)씩 이동합니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 35,
    question: "선택한 앵커 포인트를 10픽셀씩 이동하려면?",
    options: ["방향키", "Shift+방향키", "Ctrl+방향키", "Alt+방향키"],
    answer: 1,
    explanation: "Shift+방향키를 누르면 10픽셀(또는 설정된 단위의 10배)씩 이동합니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 36,
    question: "패스 단순화(Simplify) 기능의 목적은?",
    options: ["패스 색상 변경", "불필요한 앵커 포인트 자동 제거", "패스 복사", "패스 그룹화"],
    answer: 1,
    explanation: "패스 단순화는 패스의 형태를 유지하면서 불필요한 앵커 포인트를 자동으로 제거합니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 37,
    question: "오브젝트 > 패스 > 앵커 포인트 추가의 결과는?",
    options: ["모든 앵커 포인트 삭제", "각 세그먼트 중간에 앵커 포인트 추가", "패스 색상 변경", "패스 삭제"],
    answer: 1,
    explanation: "이 기능은 모든 세그먼트의 중간 지점에 앵커 포인트를 자동으로 추가합니다.",
    category: "앵커 포인트 편집"
  },
  {
    id: 38,
    question: "앵커 포인트 정렬 기능은 어디에서 찾을 수 있는가?",
    options: ["파일 메뉴", "편집 메뉴", "정렬 패널", "레이어 패널"],
    answer: 2,
    explanation: "정렬(Align) 패널에서 선택한 앵커 포인트들을 수평 또는 수직으로 정렬할 수 있습니다.",
    category: "앵커 포인트 편집"
  },
  // 패스 편집 (12문제)
  {
    id: 39,
    question: "두 개의 열린 패스를 연결하려면?",
    options: ["Ctrl+C", "Ctrl+J (Join)", "Ctrl+G", "Ctrl+V"],
    answer: 1,
    explanation: "Ctrl+J(Join)는 선택한 두 개의 열린 패스 끝점을 연결합니다.",
    category: "패스 편집"
  },
  {
    id: 40,
    question: "패스를 특정 지점에서 자르려면?",
    options: ["지우개 도구", "가위 도구(Scissors)", "칼 도구", "직접 선택 도구"],
    answer: 1,
    explanation: "가위 도구(C)를 사용하여 패스의 특정 지점을 클릭하면 그 위치에서 패스가 잘립니다.",
    category: "패스 편집"
  },
  {
    id: 41,
    question: "가위 도구의 단축키는?",
    options: ["S", "C", "X", "K"],
    answer: 1,
    explanation: "가위 도구(Scissors Tool)의 단축키는 C입니다.",
    category: "패스 편집"
  },
  {
    id: 42,
    question: "칼 도구(Knife Tool)의 특징은?",
    options: ["패스만 자른다", "자유로운 모양으로 오브젝트를 분할", "직선으로만 자른다", "텍스트만 자른다"],
    answer: 1,
    explanation: "칼 도구는 드래그한 경로를 따라 오브젝트를 자유롭게 분할합니다.",
    category: "패스 편집"
  },
  {
    id: 43,
    question: "패스의 방향을 반전시키려면?",
    options: ["Ctrl+R", "오브젝트 > 패스 > 패스 방향 반전", "Shift+R", "Alt+R"],
    answer: 1,
    explanation: "오브젝트 > 패스 > 패스 방향 반전 메뉴로 패스의 시작점과 끝점 방향을 바꿀 수 있습니다.",
    category: "패스 편집"
  },
  {
    id: 44,
    question: "패스 오프셋(Offset Path)의 기능은?",
    options: ["패스 삭제", "원본 패스에서 일정 거리만큼 떨어진 패스 생성", "패스 색상 변경", "패스 그룹 해제"],
    answer: 1,
    explanation: "패스 오프셋은 원본 패스를 기준으로 안쪽 또는 바깥쪽으로 일정 거리 떨어진 새 패스를 만듭니다.",
    category: "패스 편집"
  },
  {
    id: 45,
    question: "윤곽선(Outline Stroke)의 기능은?",
    options: ["선을 삭제", "선(Stroke)을 면(Fill)으로 변환", "선 두께 변경", "선 색상 변경"],
    answer: 1,
    explanation: "윤곽선 기능은 선(Stroke)을 닫힌 패스로 변환하여 면(Fill)으로 만듭니다.",
    category: "패스 편집"
  },
  {
    id: 46,
    question: "복합 패스(Compound Path)를 만드는 단축키는?",
    options: ["Ctrl+7", "Ctrl+8", "Ctrl+9", "Ctrl+0"],
    answer: 1,
    explanation: "Ctrl+8 또는 오브젝트 > 복합 패스 > 만들기로 복합 패스를 생성합니다.",
    category: "패스 편집"
  },
  {
    id: 47,
    question: "복합 패스의 용도는?",
    options: ["색상 변경", "여러 패스를 하나로 합쳐 구멍 만들기", "패스 삭제", "그룹 만들기"],
    answer: 1,
    explanation: "복합 패스는 여러 패스를 하나로 결합하여 도넛처럼 구멍이 있는 형태를 만들 수 있습니다.",
    category: "패스 편집"
  },
  {
    id: 48,
    question: "평균(Average) 기능의 용도는?",
    options: ["색상 평균", "선택한 앵커 포인트들을 평균 위치로 정렬", "크기 평균", "투명도 평균"],
    answer: 1,
    explanation: "평균 기능(Ctrl+Alt+J)은 선택한 앵커 포인트들을 수평, 수직, 또는 양쪽의 평균 위치로 이동시킵니다.",
    category: "패스 편집"
  },
  {
    id: 49,
    question: "패스파인더의 나누기(Divide) 기능은?",
    options: ["패스 삭제", "겹치는 부분을 모두 분리", "패스 결합", "패스 복사"],
    answer: 1,
    explanation: "나누기는 겹치는 모든 영역을 개별 오브젝트로 분리합니다.",
    category: "패스 편집"
  },
  {
    id: 50,
    question: "패스 지우개 도구의 기능은?",
    options: ["전체 패스 삭제", "드래그한 부분의 패스만 삭제", "앵커 포인트 추가", "방향선 삭제"],
    answer: 1,
    explanation: "패스 지우개 도구는 드래그한 경로를 따라 패스의 일부분을 삭제합니다.",
    category: "패스 편집"
  }
];

export default function AIPathPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gtqi-ai-path-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('gtqi-ai-path-progress', JSON.stringify({
      score: newScore,
      answered: Array.from(answered),
      current
    }));
  };

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = new Set(answeredQuestions).add(currentQuestion);
    setAnsweredQuestions(newAnswered);

    let newScore = score;
    if (index === questions[currentQuestion].answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    saveProgress(newScore, newAnswered, currentQuestion);

    if (newAnswered.size === questions.length) {
      setIsComplete(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      saveProgress(score, answeredQuestions, currentQuestion + 1);
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
    localStorage.removeItem('gtqi-ai-path-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "펜 도구 기초": "bg-orange-100 text-orange-800",
      "베지어 곡선": "bg-amber-100 text-amber-800",
      "앵커 포인트 편집": "bg-yellow-100 text-yellow-800",
      "패스 편집": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/design/gtqi" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQi 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">패스와 펜 도구</h1>
          <p className="text-orange-100">베지어 곡선의 원리와 펜 도구 사용법</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">학습 진행률</span>
            <span className="text-sm font-medium text-orange-600">{answeredQuestions.size} / {questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">현재 점수: {score}점</span>
            <span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span>
          </div>
        </div>

        {/* Complete Message */}
        {isComplete && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <button
              onClick={resetQuiz}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              다시 도전하기
            </button>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
              {question.category}
            </span>
            <span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";

              if (showExplanation) {
                if (index === question.answer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.answer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else if (answeredQuestions.has(currentQuestion)) {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed";
              } else {
                buttonClass += "border-gray-200 hover:border-orange-400 hover:bg-orange-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answeredQuestions.has(currentQuestion)}
                  className={buttonClass}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">💡 해설</h3>
              <p className="text-amber-900">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 문제
          </button>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            처음부터 다시
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            다음 문제
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["펜 도구 기초", "베지어 곡선", "앵커 포인트 편집", "패스 편집"].map((category, idx) => {
              const count = questions.filter(q => q.category === category).length;
              return (
                <div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}>
                  <div className="font-medium">{category}</div>
                  <div className="text-sm opacity-80">{count}문제</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
