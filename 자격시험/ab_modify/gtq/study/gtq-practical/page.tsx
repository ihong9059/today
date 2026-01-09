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
  // 1번 문항 유형: 고급 툴 활용/포스터 기초 (13문항)
  {
    id: 1,
    question: "GTQ 시험에서 작업 파일을 저장할 때 필수로 제출해야 하는 형식은?",
    options: ["JPG만", "PSD만", "PSD와 JPG 모두", "PNG만"],
    answer: 2,
    explanation: "GTQ 시험에서는 작업 원본(PSD)과 결과물(JPG) 두 가지 형식을 모두 제출해야 합니다."
  },
  {
    id: 2,
    question: "시험 시작 전 반드시 확인해야 할 포토샵 설정은?",
    options: ["브러시 크기", "단위(Unit) 설정", "배경색", "글꼴 목록"],
    answer: 1,
    explanation: "단위가 픽셀(Pixels)로 설정되어 있는지 확인해야 정확한 크기로 작업할 수 있습니다."
  },
  {
    id: 3,
    question: "GTQ 시험에서 캔버스 크기 설정 시 주의할 점은?",
    options: ["원하는 크기로 자유롭게 설정", "문제에서 제시한 크기 정확히 준수", "항상 정사각형으로 설정", "크기는 채점에 영향 없음"],
    answer: 1,
    explanation: "문제에서 제시한 캔버스 크기를 정확히 준수해야 하며, 크기가 다르면 감점됩니다."
  },
  {
    id: 4,
    question: "포스터 제작 시 텍스트 배치의 기본 원칙은?",
    options: ["모두 중앙 정렬", "시각적 계층 구조를 고려한 배치", "모두 왼쪽 정렬", "텍스트 최소화"],
    answer: 1,
    explanation: "제목, 부제목, 본문 등 텍스트의 중요도에 따라 크기와 위치를 달리하여 시각적 계층을 만듭니다."
  },
  {
    id: 5,
    question: "펜 도구로 패스를 그릴 때 곡선을 만드는 방법은?",
    options: ["클릭만 하기", "클릭 후 드래그", "더블 클릭", "Shift 키 누르고 클릭"],
    answer: 1,
    explanation: "클릭 후 드래그하면 방향선(핸들)이 생성되어 곡선을 만들 수 있습니다."
  },
  {
    id: 6,
    question: "펜 도구 패스를 선택 영역으로 변환하는 방법은?",
    options: ["더블 클릭", "Ctrl + Enter", "Shift + 클릭", "Alt + 클릭"],
    answer: 1,
    explanation: "패스 패널에서 패스를 선택한 후 Ctrl + Enter를 누르면 선택 영역으로 변환됩니다."
  },
  {
    id: 7,
    question: "GTQ 시험에서 가이드(Guide)를 사용하는 이유는?",
    options: ["필수 제출 사항", "정확한 배치와 정렬을 위해", "채점 기준", "파일 크기 감소"],
    answer: 1,
    explanation: "가이드는 요소들을 정확하게 배치하고 정렬하는 데 도움이 됩니다."
  },
  {
    id: 8,
    question: "룰러(Ruler)를 표시하는 단축키는?",
    options: ["Ctrl + ;", "Ctrl + R", "Ctrl + G", "Ctrl + H"],
    answer: 1,
    explanation: "Ctrl + R은 룰러를 표시하거나 숨기는 단축키입니다."
  },
  {
    id: 9,
    question: "포토샵에서 정확한 위치에 요소를 배치하기 위한 기능이 아닌 것은?",
    options: ["가이드", "스마트 가이드", "룰러", "히스토그램"],
    answer: 3,
    explanation: "히스토그램은 이미지의 밝기 분포를 보여주는 기능으로 배치와 관련이 없습니다."
  },
  {
    id: 10,
    question: "문자 패널에서 행간(Leading)의 의미는?",
    options: ["글자 간격", "줄 간격", "단어 간격", "문단 간격"],
    answer: 1,
    explanation: "행간(Leading)은 텍스트 줄과 줄 사이의 간격을 의미합니다."
  },
  {
    id: 11,
    question: "문자 패널에서 자간(Tracking)의 의미는?",
    options: ["줄 간격", "전체 글자 간격 조절", "특정 두 글자 간격", "문단 간격"],
    answer: 1,
    explanation: "자간(Tracking)은 선택한 텍스트 전체의 글자 간격을 균일하게 조절합니다."
  },
  {
    id: 12,
    question: "커닝(Kerning)과 자간(Tracking)의 차이점은?",
    options: ["차이 없음", "커닝은 특정 두 글자 간격, 자간은 전체 간격", "커닝은 세로, 자간은 가로", "커닝은 굵기, 자간은 크기"],
    answer: 1,
    explanation: "커닝은 특정 두 글자 사이의 간격을 조절하고, 자간은 전체 글자 간격을 조절합니다."
  },
  {
    id: 13,
    question: "텍스트를 패스를 따라 배치하려면?",
    options: ["텍스트 도구로 패스 위 클릭", "텍스트 복사 후 붙여넣기", "레이어 병합", "마스크 적용"],
    answer: 0,
    explanation: "텍스트 도구를 선택하고 패스 위에 커서를 가져가면 패스를 따라 텍스트를 입력할 수 있습니다."
  },
  // 2번 문항 유형: 사진 편집/색상 보정 (12문항)
  {
    id: 14,
    question: "역광 사진을 보정하기에 가장 적합한 기능은?",
    options: ["색조/채도", "그림자/하이라이트", "포스터화", "문턱값"],
    answer: 1,
    explanation: "그림자/하이라이트는 어두운 영역과 밝은 영역을 개별적으로 조절하여 역광 보정에 효과적입니다."
  },
  {
    id: 15,
    question: "흑백 사진으로 변환할 때 가장 세밀한 조절이 가능한 방법은?",
    options: ["채도 0으로 설정", "그레이스케일 모드로 변환", "흑백 조정 레이어 사용", "밝기/대비 조절"],
    answer: 2,
    explanation: "흑백 조정 레이어는 각 색상별로 밝기를 개별 조절할 수 있어 가장 세밀한 제어가 가능합니다."
  },
  {
    id: 16,
    question: "특정 색상만 남기고 나머지를 흑백으로 만드는 기법의 이름은?",
    options: ["색상 분리", "컬러 스플래시(Color Splash)", "색상 반전", "색상 균형"],
    answer: 1,
    explanation: "컬러 스플래시는 특정 색상만 유지하고 나머지를 흑백으로 처리하는 기법입니다."
  },
  {
    id: 17,
    question: "피부톤 보정에 주로 사용되는 색상 범위는?",
    options: ["블루", "그린", "레드/옐로우", "시안"],
    answer: 2,
    explanation: "피부톤은 주로 레드와 옐로우 계열이므로 이 범위를 조절하여 보정합니다."
  },
  {
    id: 18,
    question: "사진의 전체적인 색조를 따뜻하게 만들려면?",
    options: ["블루 톤 추가", "색온도를 높이거나 오렌지 톤 추가", "채도 낮추기", "명도 높이기"],
    answer: 1,
    explanation: "색온도를 높이거나 오렌지/옐로우 톤을 추가하면 따뜻한 느낌이 됩니다."
  },
  {
    id: 19,
    question: "사진의 전체적인 색조를 차갑게 만들려면?",
    options: ["오렌지 톤 추가", "색온도를 낮추거나 블루 톤 추가", "채도 높이기", "명도 낮추기"],
    answer: 1,
    explanation: "색온도를 낮추거나 블루/시안 톤을 추가하면 차가운 느낌이 됩니다."
  },
  {
    id: 20,
    question: "곡선(Curves)에서 S자 커브를 만들면 어떤 효과가 나타나는가?",
    options: ["밝기만 증가", "대비(콘트라스트) 증가", "채도 증가", "색상 반전"],
    answer: 1,
    explanation: "S자 커브는 밝은 부분을 더 밝게, 어두운 부분을 더 어둡게 만들어 대비가 증가합니다."
  },
  {
    id: 21,
    question: "레벨(Levels)에서 흰색 점(White Point)을 왼쪽으로 이동하면?",
    options: ["이미지가 어두워짐", "이미지가 밝아짐", "색상이 반전됨", "채도가 감소함"],
    answer: 1,
    explanation: "흰색 점을 왼쪽으로 이동하면 더 많은 톤이 밝게 표현되어 이미지가 밝아집니다."
  },
  {
    id: 22,
    question: "레벨(Levels)에서 검정 점(Black Point)을 오른쪽으로 이동하면?",
    options: ["이미지가 밝아짐", "어두운 영역이 더 어두워짐", "색상이 변경됨", "채도가 증가함"],
    answer: 1,
    explanation: "검정 점을 오른쪽으로 이동하면 더 많은 톤이 어둡게 표현되어 그림자가 강해집니다."
  },
  {
    id: 23,
    question: "채도와 비브란스의 차이점은?",
    options: ["차이 없음", "비브란스는 이미 채도가 높은 색은 덜 조절함", "채도는 밝기도 변경", "비브란스는 특정 색상만 조절"],
    answer: 1,
    explanation: "비브란스는 채도가 낮은 색을 우선 조절하고, 피부톤을 보호하여 더 자연스럽습니다."
  },
  {
    id: 24,
    question: "특정 색상의 색조만 변경하려면 어떤 기능을 사용해야 하는가?",
    options: ["밝기/대비", "색조/채도에서 특정 색상 선택", "레벨", "곡선"],
    answer: 1,
    explanation: "색조/채도 대화상자에서 빨강, 노랑 등 특정 색상 범위를 선택하여 개별 조절할 수 있습니다."
  },
  {
    id: 25,
    question: "화이트 밸런스를 맞추는 가장 쉬운 방법은?",
    options: ["밝기 조절", "곡선의 스포이드로 중립 회색 클릭", "채도 조절", "선명도 증가"],
    answer: 1,
    explanation: "곡선이나 레벨의 중간 톤 스포이드로 회색이어야 할 영역을 클릭하면 색 편향이 보정됩니다."
  },
  // 3번 문항 유형: 이미지 합성 (13문항)
  {
    id: 26,
    question: "GTQ 합성 문제에서 자연스러운 합성을 위해 가장 먼저 해야 할 것은?",
    options: ["필터 적용", "피사체를 정확하게 선택/누끼", "색상 변경", "크기 조절"],
    answer: 1,
    explanation: "합성의 첫 단계는 피사체를 깔끔하게 선택하여 배경에서 분리(누끼)하는 것입니다."
  },
  {
    id: 27,
    question: "머리카락처럼 복잡한 가장자리를 선택할 때 가장 적합한 기능은?",
    options: ["사각형 선택 도구", "선택 및 마스크(Select and Mask)", "페인트 통 도구", "자르기 도구"],
    answer: 1,
    explanation: "선택 및 마스크 기능은 머리카락 같은 섬세한 가장자리를 정교하게 선택할 수 있습니다."
  },
  {
    id: 28,
    question: "합성한 피사체가 배경과 어울리지 않을 때 확인해야 할 요소가 아닌 것은?",
    options: ["빛의 방향", "색온도", "그림자", "파일 이름"],
    answer: 3,
    explanation: "빛의 방향, 색온도, 그림자, 해상도, 노이즈 등을 확인해야 하며 파일 이름은 관련 없습니다."
  },
  {
    id: 29,
    question: "합성 시 피사체 가장자리에 원래 배경색이 남아있을 때 해결 방법은?",
    options: ["무시하기", "매트 제거(Defringe) 기능 사용", "전체 삭제", "크기 축소"],
    answer: 1,
    explanation: "레이어 > 매트 > 매트 제거(Defringe)를 사용하면 가장자리의 잔여 색상을 제거할 수 있습니다."
  },
  {
    id: 30,
    question: "합성된 이미지에 통일감을 주기 위해 마지막에 적용하면 좋은 것은?",
    options: ["개별 색상 보정", "전체에 동일한 색상 그레이딩/톤 적용", "레이어 삭제", "해상도 낮추기"],
    answer: 1,
    explanation: "전체 이미지에 동일한 색상 그레이딩이나 필터를 적용하면 통일감이 생깁니다."
  },
  {
    id: 31,
    question: "그림자를 만들 때 자연스러운 결과를 위해 고려해야 할 것은?",
    options: ["항상 검정색 100% 사용", "광원 방향, 거리에 따른 흐림과 투명도 조절", "그림자는 만들지 않음", "파란색 그림자 사용"],
    answer: 1,
    explanation: "광원 방향에 맞게 그림자 위치를 정하고, 거리에 따라 흐림과 투명도를 조절합니다."
  },
  {
    id: 32,
    question: "피사체에 배경의 색상을 반영하여 자연스럽게 만드는 기법은?",
    options: ["색상 반전", "컬러 스필(Color Spill) 또는 환경광 추가", "채도 제거", "선명도 증가"],
    answer: 1,
    explanation: "실제로 피사체는 주변 환경의 색이 반사되므로, 배경색을 약간 추가하면 자연스럽습니다."
  },
  {
    id: 33,
    question: "레이어 스타일의 드롭 섀도우를 개별 레이어로 분리하려면?",
    options: ["레이어 삭제", "레이어 > 레이어 스타일 > 레이어 만들기", "마스크 적용", "레이어 병합"],
    answer: 1,
    explanation: "레이어 스타일 > 레이어 만들기를 선택하면 효과가 별도 레이어로 분리됩니다."
  },
  {
    id: 34,
    question: "합성에서 원근감을 맞추기 위해 사용하는 기능은?",
    options: ["색상 보정", "원근 뒤틀기/변형", "필터 갤러리", "히스토리 브러시"],
    answer: 1,
    explanation: "편집 > 변형 > 원근을 사용하여 피사체의 원근감을 배경에 맞출 수 있습니다."
  },
  {
    id: 35,
    question: "여러 이미지를 합성할 때 해상도가 다르면 어떤 문제가 발생하는가?",
    options: ["문제없음", "선명도 차이로 부자연스러움", "색상이 변함", "레이어가 병합됨"],
    answer: 1,
    explanation: "해상도가 낮은 이미지는 확대 시 흐려져 다른 이미지와 어울리지 않습니다."
  },
  {
    id: 36,
    question: "블렌드 이프(Blend If) 기능의 용도는?",
    options: ["색상 변경", "밝기 값에 따라 레이어를 자동으로 블렌딩", "해상도 변경", "파일 저장"],
    answer: 1,
    explanation: "블렌드 이프는 밝기 값을 기준으로 레이어의 특정 톤을 자동으로 숨기거나 표시합니다."
  },
  {
    id: 37,
    question: "합성 시 피사체 경계가 너무 선명할 때 자연스럽게 하는 방법은?",
    options: ["선명도 더 높이기", "마스크 가장자리에 블러 적용 또는 페더링", "레이어 삭제", "색상 반전"],
    answer: 1,
    explanation: "마스크 가장자리에 블러를 적용하거나 페더링하면 경계가 부드러워집니다."
  },
  {
    id: 38,
    question: "투명한 유리나 물체를 합성할 때 효과적인 블렌딩 모드는?",
    options: ["일반(Normal)", "스크린(Screen) 또는 오버레이(Overlay)", "곱하기(Multiply)", "색상(Color)"],
    answer: 1,
    explanation: "투명한 물체는 스크린이나 오버레이 모드를 사용하면 배경이 비쳐 보이는 효과를 줍니다."
  },
  // 4번 문항 유형: 종합 디자인/최종 완성 (12문항)
  {
    id: 39,
    question: "GTQ 시험에서 최종 저장 전 반드시 확인해야 할 사항은?",
    options: ["브러시 설정", "파일명, 크기, 형식이 문제 조건과 일치하는지", "히스토리 기록", "레이어 이름"],
    answer: 1,
    explanation: "파일명, 캔버스 크기, 저장 형식이 문제에서 제시한 조건과 정확히 일치해야 합니다."
  },
  {
    id: 40,
    question: "작업 중 실수에 대비하여 해야 할 것은?",
    options: ["실수하지 않기", "중간중간 파일 저장(Ctrl + S)", "브러시 크기 고정", "레이어 병합"],
    answer: 1,
    explanation: "작업 중 수시로 저장하여 프로그램 오류나 실수로 인한 작업 손실을 방지합니다."
  },
  {
    id: 41,
    question: "시험 시간 관리를 위해 권장되는 문항당 시간은?",
    options: ["각 문항 10분", "각 문항 약 20~22분", "각 문항 30분", "시간 제한 없음"],
    answer: 1,
    explanation: "90분에 4문항이므로 문항당 약 20~22분을 배정하고, 어려운 문항은 나중에 해결합니다."
  },
  {
    id: 42,
    question: "GTQ 시험에서 레이어를 병합하지 않고 유지해야 하는 이유는?",
    options: ["파일 크기 감소", "채점 시 작업 과정 확인 및 수정 용이성", "필수 사항 아님", "자동 병합됨"],
    answer: 1,
    explanation: "PSD 제출 시 레이어를 유지하면 채점관이 작업 과정을 확인할 수 있고, 수정도 용이합니다."
  },
  {
    id: 43,
    question: "레이어 스타일 '획(Stroke)'의 용도는?",
    options: ["그림자 추가", "테두리 추가", "밝기 조절", "크기 변경"],
    answer: 1,
    explanation: "획(Stroke)은 레이어의 가장자리에 테두리를 추가하는 효과입니다."
  },
  {
    id: 44,
    question: "레이어 스타일 '내부 그림자(Inner Shadow)'의 효과는?",
    options: ["외부에 그림자", "내부에 움푹 들어간 느낌", "색상 변경", "크기 확대"],
    answer: 1,
    explanation: "내부 그림자는 오브젝트 안쪽에 그림자를 만들어 움푹 들어간 느낌을 줍니다."
  },
  {
    id: 45,
    question: "레이어 스타일 '베벨과 엠보스(Bevel & Emboss)'의 효과는?",
    options: ["평면적 효과", "입체적/돌출 효과", "투명 효과", "흐림 효과"],
    answer: 1,
    explanation: "베벨과 엠보스는 오브젝트에 입체적인 돌출 또는 음각 효과를 줍니다."
  },
  {
    id: 46,
    question: "레이어 스타일 '외부 광선(Outer Glow)'의 용도는?",
    options: ["내부에 빛 효과", "외부에 빛나는 효과", "그림자 효과", "색상 변경"],
    answer: 1,
    explanation: "외부 광선은 오브젝트 바깥쪽으로 빛이 퍼지는 글로우 효과를 만듭니다."
  },
  {
    id: 47,
    question: "GTQ 시험에서 샘플 이미지의 색상과 최대한 비슷하게 맞추는 것이 중요한 이유는?",
    options: ["개인 취향", "채점 기준에 포함되므로", "파일 크기 감소", "선택 사항임"],
    answer: 1,
    explanation: "GTQ는 샘플과 최대한 유사하게 제작해야 하며, 색상 일치도 채점 기준입니다."
  },
  {
    id: 48,
    question: "최종 JPG 저장 시 권장되는 품질 설정은?",
    options: ["최저 품질", "중간 품질", "최고 품질 (12 또는 100%)", "품질 무관"],
    answer: 2,
    explanation: "제출용 이미지는 최고 품질로 저장하여 선명한 결과물을 제출해야 합니다."
  },
  {
    id: 49,
    question: "GTQ 시험에서 글꼴이 없을 때 대처 방법은?",
    options: ["작업 포기", "유사한 글꼴로 대체하여 작업", "글꼴 없이 제출", "텍스트 삭제"],
    answer: 1,
    explanation: "시험장 컴퓨터에 해당 글꼴이 없으면 유사한 스타일의 글꼴로 대체합니다."
  },
  {
    id: 50,
    question: "시험 종료 전 마지막으로 확인해야 할 것은?",
    options: ["브러시 크기", "PSD와 JPG 파일이 모두 지정된 위치에 저장되었는지", "레이어 이름", "히스토리 삭제"],
    answer: 1,
    explanation: "제출할 파일(PSD, JPG)이 지정된 폴더에 올바른 이름으로 저장되었는지 최종 확인합니다."
  }
];

export default function GTQPracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('gtq-practical-progress');
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
      localStorage.setItem('gtq-practical-progress', JSON.stringify({
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
    localStorage.removeItem('gtq-practical-progress');
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
            <h1 className="text-2xl font-bold text-gray-800">실기 유형</h1>
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
                {question.id <= 13 ? '1번 유형: 고급 툴/포스터' : question.id <= 25 ? '2번 유형: 사진 편집' : question.id <= 38 ? '3번 유형: 이미지 합성' : '4번 유형: 종합 디자인'}
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
