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
  // 실기 유형 분석 (13문제)
  {
    id: 1,
    question: "GTQi 실기시험의 작업 시간은?",
    options: ["60분", "90분", "120분", "180분"],
    answer: 1,
    explanation: "GTQi 실기시험은 90분 동안 진행됩니다.",
    category: "실기 유형 분석"
  },
  {
    id: 2,
    question: "GTQi 1급 실기에서 주어지는 작업 개수는?",
    options: ["2개", "3개", "4개", "5개"],
    answer: 2,
    explanation: "GTQi 1급은 4개의 작업을 90분 내에 완성해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 3,
    question: "GTQi 실기시험에서 가장 높은 배점을 차지하는 평가 항목은?",
    options: ["완성도", "정확성", "표현력", "창의성"],
    answer: 0,
    explanation: "완성도가 가장 중요하며, 주어진 예시와 얼마나 유사하게 완성했는지를 평가합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 4,
    question: "GTQi 실기에서 제공되지 않는 것은?",
    options: ["예시 이미지", "소스 이미지", "작업 지시서", "완성 파일"],
    answer: 3,
    explanation: "완성 파일은 제공되지 않으며, 예시 이미지를 보고 직접 제작해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 5,
    question: "GTQi 실기에서 파일 저장 형식은?",
    options: ["PSD만", "AI만", "AI와 JPG/PDF", "PNG만"],
    answer: 2,
    explanation: "일반적으로 AI 원본 파일과 JPG 또는 PDF 출력 파일을 함께 저장해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 6,
    question: "실기시험에서 대지(Artboard) 크기 설정이 중요한 이유는?",
    options: ["파일 크기 감소", "채점 기준 중 정확성 평가", "속도 향상", "효과 적용을 위해"],
    answer: 1,
    explanation: "지정된 대지 크기대로 설정하지 않으면 정확성에서 감점됩니다.",
    category: "실기 유형 분석"
  },
  {
    id: 7,
    question: "GTQi 2급의 난이도 특징은?",
    options: ["1급과 동일", "기본 도구 위주의 간단한 작업", "3D 위주", "애니메이션 위주"],
    answer: 1,
    explanation: "2급은 기본 도구와 간단한 기능 위주로 출제되어 1급보다 난이도가 낮습니다.",
    category: "실기 유형 분석"
  },
  {
    id: 8,
    question: "실기시험 중 저장하지 않고 종료하면?",
    options: ["자동 복구됨", "작업 내용이 모두 손실됨", "임시 파일로 저장됨", "시험 시간 연장"],
    answer: 1,
    explanation: "저장하지 않으면 작업 내용이 손실되므로 수시로 저장(Ctrl+S)해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 9,
    question: "실기시험에서 색상 모드는 무엇으로 작업해야 하는가?",
    options: ["항상 RGB", "항상 CMYK", "문제 지시에 따라", "그레이스케일"],
    answer: 2,
    explanation: "문제에서 지정한 색상 모드(RGB 또는 CMYK)로 작업해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 10,
    question: "GTQi 실기에서 텍스트 처리 시 주의점은?",
    options: ["아무 폰트나 사용", "지정된 폰트와 크기 사용", "텍스트는 평가 안함", "영문만 사용"],
    answer: 1,
    explanation: "문제에서 지정한 폰트 종류와 크기를 정확히 사용해야 합니다.",
    category: "실기 유형 분석"
  },
  {
    id: 11,
    question: "패스파인더 사용이 필수적인 작업 유형은?",
    options: ["그라디언트 적용", "복잡한 도형 조합/제거", "텍스트 입력", "이미지 배치"],
    answer: 1,
    explanation: "여러 도형을 합치거나 빼서 복잡한 형태를 만들 때 패스파인더가 필수입니다.",
    category: "실기 유형 분석"
  },
  {
    id: 12,
    question: "실기시험 채점 시 레이어 정리가 중요한 이유는?",
    options: ["채점 기준에 포함", "속도 향상", "파일 크기 감소", "채점과 무관"],
    answer: 0,
    explanation: "레이어 정리와 구조도 채점 기준에 포함되어 감점 요소가 될 수 있습니다.",
    category: "실기 유형 분석"
  },
  {
    id: 13,
    question: "GTQi 실기 합격 기준 점수는?",
    options: ["50점 이상", "60점 이상", "70점 이상", "80점 이상"],
    answer: 1,
    explanation: "GTQi 실기시험은 100점 만점에 60점 이상이면 합격입니다.",
    category: "실기 유형 분석"
  },
  // 로고 및 아이콘 제작 (12문제)
  {
    id: 14,
    question: "로고 제작 시 가장 먼저 해야 할 작업은?",
    options: ["색상 선택", "기본 형태 구성", "효과 적용", "텍스트 입력"],
    answer: 1,
    explanation: "로고는 기본 도형이나 패스로 전체 형태를 먼저 잡은 후 세부 작업을 합니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 15,
    question: "대칭 로고를 효율적으로 만드는 방법은?",
    options: ["두 번 그리기", "반쪽만 그리고 반사 복사", "자동 대칭 기능", "눈대중으로 맞추기"],
    answer: 1,
    explanation: "절반만 그린 후 반사(Reflect) 도구로 복사하면 완벽한 대칭을 만들 수 있습니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 16,
    question: "로고의 여러 요소를 하나로 합치는 패스파인더 기능은?",
    options: ["빼기(Minus)", "합치기(Unite)", "나누기(Divide)", "교차(Intersect)"],
    answer: 1,
    explanation: "합치기(Unite)는 여러 오브젝트를 하나의 형태로 병합합니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 17,
    question: "로고 내부에 구멍을 만들려면?",
    options: ["지우개 도구", "패스파인더 빼기(Minus Front)", "삭제 키", "클리핑 마스크"],
    answer: 1,
    explanation: "빼기(Minus Front)를 사용하면 앞쪽 오브젝트 모양대로 뒤쪽에서 구멍이 뚫립니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 18,
    question: "아이콘 세트 제작 시 일관성을 유지하려면?",
    options: ["각각 다른 스타일", "같은 선 두께, 모서리 처리, 비율 유지", "색상만 통일", "크기만 통일"],
    answer: 1,
    explanation: "아이콘 세트는 선 두께, 모서리 라운드, 전체 비율 등을 통일해야 일관성 있습니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 19,
    question: "픽셀 퍼펙트(Pixel Perfect) 아이콘의 의미는?",
    options: ["비트맵으로 제작", "픽셀 그리드에 정렬된 선명한 아이콘", "큰 크기 아이콘", "3D 아이콘"],
    answer: 1,
    explanation: "픽셀 퍼펙트는 앵커 포인트가 픽셀 그리드에 정렬되어 흐림 없이 선명하게 보이는 것입니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 20,
    question: "새 픽셀 그리드에 정렬 옵션을 설정하는 방법은?",
    options: ["보기 메뉴", "변환 패널 옵션", "레이어 패널", "색상 패널"],
    answer: 1,
    explanation: "변환 패널 메뉴에서 '새 오브젝트를 픽셀 그리드에 정렬' 옵션을 설정할 수 있습니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 21,
    question: "로고 테두리에 균일한 간격의 외곽선을 추가하려면?",
    options: ["복사 후 확대", "패스 오프셋", "선 두께 증가", "외부 효과"],
    answer: 1,
    explanation: "패스 오프셋을 사용하면 원본에서 균일한 거리만큼 떨어진 외곽선을 만들 수 있습니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 22,
    question: "로고를 다양한 크기로 사용하기 위한 벡터의 장점은?",
    options: ["파일 크기가 작음", "확대해도 품질 저하 없음", "편집이 어려움", "색상이 제한됨"],
    answer: 1,
    explanation: "벡터 로고는 수학적 공식으로 정의되어 어떤 크기로 확대해도 품질이 유지됩니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 23,
    question: "로고에 그림자 효과를 추가하는 방법은?",
    options: ["효과 > 스타일라이즈 > 그림자", "필터 > 그림자", "편집 > 그림자", "보기 > 그림자"],
    answer: 0,
    explanation: "효과 > 스타일라이즈 > 그림자(Drop Shadow)로 그림자 효과를 적용합니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 24,
    question: "아이콘 내보내기에 적합한 형식은?",
    options: ["AI", "SVG, PNG", "PSD", "DOC"],
    answer: 1,
    explanation: "웹용 아이콘은 SVG(벡터)나 PNG(투명 배경) 형식으로 내보내는 것이 적합합니다.",
    category: "로고 및 아이콘 제작"
  },
  {
    id: 25,
    question: "여러 대지에 아이콘을 배치하여 한 번에 내보내는 기능은?",
    options: ["일괄 저장", "대지 내보내기(Export Artboards)", "다중 저장", "그룹 저장"],
    answer: 1,
    explanation: "파일 > 내보내기 > 화면용으로 내보내기에서 대지별로 한 번에 내보낼 수 있습니다.",
    category: "로고 및 아이콘 제작"
  },
  // 일러스트레이션 (13문제)
  {
    id: 26,
    question: "캐릭터 일러스트 제작 시 먼저 하는 작업은?",
    options: ["색칠", "스케치/윤곽선 작업", "효과 적용", "텍스트 추가"],
    answer: 1,
    explanation: "캐릭터는 먼저 펜 도구나 연필 도구로 윤곽선을 잡은 후 색칠과 디테일을 추가합니다.",
    category: "일러스트레이션"
  },
  {
    id: 27,
    question: "플랫 디자인 일러스트의 특징은?",
    options: ["복잡한 그라디언트", "단순한 형태와 단색 사용", "사실적 묘사", "3D 효과"],
    answer: 1,
    explanation: "플랫 디자인은 그라디언트나 그림자 없이 단순한 형태와 단색을 사용하는 스타일입니다.",
    category: "일러스트레이션"
  },
  {
    id: 28,
    question: "부드러운 곡선의 캐릭터를 그리기에 적합한 도구는?",
    options: ["사각형 도구", "펜 도구/곡률 도구", "직선 도구", "텍스트 도구"],
    answer: 1,
    explanation: "펜 도구나 곡률 도구를 사용하면 부드러운 베지어 곡선으로 캐릭터를 그릴 수 있습니다.",
    category: "일러스트레이션"
  },
  {
    id: 29,
    question: "일러스트에 입체감을 주는 기법이 아닌 것은?",
    options: ["그라디언트 사용", "하이라이트와 그림자 추가", "색상 대비", "모든 요소 같은 색상"],
    answer: 3,
    explanation: "입체감을 위해서는 그라디언트, 하이라이트, 그림자, 색상 대비 등을 활용해야 합니다.",
    category: "일러스트레이션"
  },
  {
    id: 30,
    question: "라이브 페인트 버킷의 용도는?",
    options: ["패스 그리기", "닫힌 영역에 빠르게 색 채우기", "그라디언트 적용", "패스 삭제"],
    answer: 1,
    explanation: "라이브 페인트 버킷은 겹쳐진 패스로 만들어진 영역에 빠르게 색을 채울 수 있습니다.",
    category: "일러스트레이션"
  },
  {
    id: 31,
    question: "이미지 추적(Image Trace)의 기능은?",
    options: ["벡터를 비트맵으로", "비트맵을 벡터로 변환", "이미지 삭제", "이미지 회전"],
    answer: 1,
    explanation: "이미지 추적은 비트맵 이미지를 벡터 패스로 자동 변환하는 기능입니다.",
    category: "일러스트레이션"
  },
  {
    id: 32,
    question: "물방울 브러시 도구의 특징은?",
    options: ["선(Stroke) 생성", "면(Fill) 형태의 패스 생성", "텍스트 입력", "이미지 삽입"],
    answer: 1,
    explanation: "물방울 브러시는 드래그한 경로가 면으로 채워진 닫힌 패스로 생성됩니다.",
    category: "일러스트레이션"
  },
  {
    id: 33,
    question: "아트 브러시와 패턴 브러시의 차이점은?",
    options: ["차이 없음", "아트는 늘어나고, 패턴은 반복됨", "색상 차이", "크기 차이"],
    answer: 1,
    explanation: "아트 브러시는 패스 길이에 따라 늘어나고, 패턴 브러시는 패스를 따라 반복됩니다.",
    category: "일러스트레이션"
  },
  {
    id: 34,
    question: "폭 도구(Width Tool)의 기능은?",
    options: ["색상 변경", "선의 두께를 부분적으로 다르게 조절", "패스 삭제", "회전"],
    answer: 1,
    explanation: "폭 도구는 선(Stroke)의 특정 부분 두께를 다르게 만들어 가변 폭 선을 만듭니다.",
    category: "일러스트레이션"
  },
  {
    id: 35,
    question: "셰이프 빌더 도구의 장점은?",
    options: ["색상 선택", "여러 도형을 직관적으로 합치거나 빼기", "텍스트 편집", "레이어 관리"],
    answer: 1,
    explanation: "셰이프 빌더 도구는 드래그하여 직관적으로 도형을 합치거나 Alt+클릭으로 빼는 작업이 가능합니다.",
    category: "일러스트레이션"
  },
  {
    id: 36,
    question: "일러스트에 텍스처를 추가하는 방법이 아닌 것은?",
    options: ["그레인 효과", "브러시 사용", "텍스처 이미지 마스킹", "단색 면 채우기"],
    answer: 3,
    explanation: "텍스처는 그레인 효과, 텍스처 브러시, 이미지 마스킹 등으로 추가하며, 단색은 텍스처가 아닙니다.",
    category: "일러스트레이션"
  },
  {
    id: 37,
    question: "일러스트 작업 시 레이어를 분리하는 이유는?",
    options: ["파일 크기 증가", "편집 편의성 및 요소별 관리", "속도 감소", "색상 제한"],
    answer: 1,
    explanation: "레이어를 분리하면 배경, 캐릭터, 소품 등을 개별적으로 편집하고 관리하기 쉽습니다.",
    category: "일러스트레이션"
  },
  {
    id: 38,
    question: "연필 도구 옵션에서 '선택 유지'의 기능은?",
    options: ["자동 삭제", "그린 패스가 계속 선택된 상태 유지", "색상 유지", "크기 유지"],
    answer: 1,
    explanation: "선택 유지를 체크하면 그린 후에도 패스가 선택되어 바로 수정하거나 이어 그릴 수 있습니다.",
    category: "일러스트레이션"
  },
  // 인쇄물 디자인 (12문제)
  {
    id: 39,
    question: "인쇄용 문서의 적절한 색상 모드는?",
    options: ["RGB", "CMYK", "그레이스케일", "인덱스 컬러"],
    answer: 1,
    explanation: "인쇄물은 CMYK(Cyan, Magenta, Yellow, Black) 모드로 작업해야 정확한 색상이 재현됩니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 40,
    question: "인쇄물의 도련(Bleed)의 의미는?",
    options: ["문서 크기", "재단선 바깥의 여유 영역", "텍스트 영역", "이미지 영역"],
    answer: 1,
    explanation: "도련은 재단 시 오차를 대비해 재단선 바깥으로 3mm 정도 확장하는 영역입니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 41,
    question: "인쇄용 해상도 설정 시 권장 값은?",
    options: ["72 ppi", "150 ppi", "300 ppi 이상", "50 ppi"],
    answer: 2,
    explanation: "인쇄물은 300 ppi 이상의 해상도로 설정해야 선명하게 출력됩니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 42,
    question: "텍스트를 인쇄용으로 변환할 때 하는 작업은?",
    options: ["삭제", "윤곽선(Outline) 만들기", "색상 변경", "크기 확대"],
    answer: 1,
    explanation: "글꼴 문제를 방지하기 위해 텍스트를 윤곽선(Ctrl+Shift+O)으로 변환합니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 43,
    question: "재단 표시(Trim Marks)를 추가하는 방법은?",
    options: ["효과 > 자르기 표시", "오브젝트 > 트림 마크 만들기", "파일 > 저장", "보기 > 표시"],
    answer: 1,
    explanation: "오브젝트 > 트림 마크 만들기로 선택한 오브젝트에 재단 표시를 추가할 수 있습니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 44,
    question: "인쇄 시 검은색을 진하게 표현하려면?",
    options: ["K 100%만 사용", "리치 블랙(C60 M40 Y40 K100) 사용", "RGB 검정", "투명도 적용"],
    answer: 1,
    explanation: "리치 블랙은 CMYK 값을 조합하여 K만 사용하는 것보다 깊고 진한 검정색을 만듭니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 45,
    question: "별색(Spot Color)의 용도는?",
    options: ["웹용 색상", "특정 기업 색상 등 정확한 색상 재현", "무채색만", "투명 색상"],
    answer: 1,
    explanation: "별색은 CMYK 혼합이 아닌 특수 잉크로 정확한 브랜드 색상 등을 재현할 때 사용합니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 46,
    question: "인쇄용 PDF 저장 시 권장 설정은?",
    options: ["가장 작은 파일 크기", "PDF/X-1a 또는 고품질 인쇄", "웹용 최적화", "대화형"],
    answer: 1,
    explanation: "인쇄용은 PDF/X 표준이나 고품질 인쇄 프리셋을 사용해야 품질이 보장됩니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 47,
    question: "링크된 이미지를 파일에 포함시키려면?",
    options: ["이미지 삭제", "이미지 포함(Embed)", "링크 해제", "새로 불러오기"],
    answer: 1,
    explanation: "링크 패널에서 이미지를 포함(Embed)하면 파일에 이미지가 저장되어 누락되지 않습니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 48,
    question: "명함 인쇄 시 중요한 텍스트를 재단선에서 얼마나 떨어뜨려야 하는가?",
    options: ["0mm", "3mm 이상", "안전 영역 고려 안함", "10mm 이상"],
    answer: 1,
    explanation: "중요한 텍스트나 로고는 재단선에서 최소 3mm 이상 안쪽에 배치해야 잘리지 않습니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 49,
    question: "분판 미리보기(Separations Preview)의 용도는?",
    options: ["색상 분리 확인", "레이어 확인", "효과 확인", "크기 확인"],
    answer: 0,
    explanation: "분판 미리보기로 CMYK 각 채널과 별색의 분리 상태를 인쇄 전에 확인할 수 있습니다.",
    category: "인쇄물 디자인"
  },
  {
    id: 50,
    question: "패키지(Package) 기능의 용도는?",
    options: ["파일 압축", "문서, 링크 이미지, 폰트를 한 폴더에 수집", "파일 삭제", "파일 분할"],
    answer: 1,
    explanation: "패키지 기능은 문서와 관련된 모든 링크 파일, 폰트를 한 폴더로 모아 인쇄소 전달용으로 준비합니다.",
    category: "인쇄물 디자인"
  }
];

export default function GTQiPracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gtqi-practical-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('gtqi-practical-progress', JSON.stringify({
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
    localStorage.removeItem('gtqi-practical-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "실기 유형 분석": "bg-orange-100 text-orange-800",
      "로고 및 아이콘 제작": "bg-amber-100 text-amber-800",
      "일러스트레이션": "bg-yellow-100 text-yellow-800",
      "인쇄물 디자인": "bg-red-100 text-red-800"
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
          <h1 className="text-3xl font-bold mb-2">실기 유형 연습</h1>
          <p className="text-orange-100">로고, 일러스트, 인쇄물 제작 실전 문제</p>
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
            {["실기 유형 분석", "로고 및 아이콘 제작", "일러스트레이션", "인쇄물 디자인"].map((category, idx) => {
              const count = questions.filter(q => q.category === category).length;
              return (
                <div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}>
                  <div className="font-medium text-sm">{category}</div>
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
