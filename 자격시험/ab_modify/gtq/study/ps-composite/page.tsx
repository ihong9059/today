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
  // 블렌딩 모드 (13문항)
  {
    id: 1,
    question: "블렌딩 모드 '곱하기(Multiply)'의 효과는?",
    options: ["밝아지는 효과", "어두워지는 효과", "채도 증가", "반전 효과"],
    answer: 1,
    explanation: "곱하기 모드는 색상을 곱하여 어두운 결과를 만들며, 흰색은 투명하게 처리됩니다."
  },
  {
    id: 2,
    question: "블렌딩 모드 '스크린(Screen)'의 효과는?",
    options: ["어두워지는 효과", "밝아지는 효과", "채도 감소", "흑백 변환"],
    answer: 1,
    explanation: "스크린 모드는 곱하기의 반대로, 밝아지는 효과를 내며 검정은 투명하게 처리됩니다."
  },
  {
    id: 3,
    question: "블렌딩 모드 '오버레이(Overlay)'의 특징은?",
    options: ["항상 밝아짐", "항상 어두워짐", "밝은 부분은 더 밝게, 어두운 부분은 더 어둡게", "색상만 변경"],
    answer: 2,
    explanation: "오버레이는 기준 레이어의 밝기에 따라 곱하기와 스크린을 조합한 효과를 냅니다."
  },
  {
    id: 4,
    question: "블렌딩 모드 '소프트 라이트(Soft Light)'의 특징은?",
    options: ["오버레이보다 강한 효과", "오버레이보다 부드러운 효과", "색상만 적용", "밝기만 적용"],
    answer: 1,
    explanation: "소프트 라이트는 오버레이와 유사하지만 더 부드럽고 자연스러운 효과를 냅니다."
  },
  {
    id: 5,
    question: "블렌딩 모드 '하드 라이트(Hard Light)'의 특징은?",
    options: ["소프트 라이트보다 부드러움", "강한 대비 효과", "색상만 적용", "그림자만 생성"],
    answer: 1,
    explanation: "하드 라이트는 오버레이보다 더 강한 대비 효과를 만듭니다."
  },
  {
    id: 6,
    question: "블렌딩 모드 '색상(Color)'의 효과는?",
    options: ["밝기만 적용", "채도만 적용", "색조와 채도를 적용, 밝기는 유지", "전체 색상 변경"],
    answer: 2,
    explanation: "색상 모드는 상위 레이어의 색조와 채도를 적용하고, 하위 레이어의 밝기를 유지합니다."
  },
  {
    id: 7,
    question: "블렌딩 모드 '명도(Luminosity)'의 효과는?",
    options: ["색조만 적용", "채도만 적용", "밝기만 적용, 색상은 유지", "전체 변경"],
    answer: 2,
    explanation: "명도 모드는 상위 레이어의 밝기만 적용하고, 하위 레이어의 색상을 유지합니다."
  },
  {
    id: 8,
    question: "흰색 배경의 스캔 이미지를 투명하게 만들려면 어떤 블렌딩 모드가 적합한가?",
    options: ["곱하기(Multiply)", "스크린(Screen)", "일반(Normal)", "차이(Difference)"],
    answer: 0,
    explanation: "곱하기 모드는 흰색을 투명하게 처리하므로 흰 배경 제거에 효과적입니다."
  },
  {
    id: 9,
    question: "검은색 배경의 불꽃 이미지를 합성할 때 적합한 블렌딩 모드는?",
    options: ["곱하기(Multiply)", "스크린(Screen)", "색상 번(Color Burn)", "차이(Difference)"],
    answer: 1,
    explanation: "스크린 모드는 검정을 투명하게 처리하므로 불꽃, 조명 효과 합성에 적합합니다."
  },
  {
    id: 10,
    question: "블렌딩 모드 '차이(Difference)'의 효과는?",
    options: ["색상 합치기", "색상 차이를 표시, 동일 색상은 검정", "밝기 증가", "채도 감소"],
    answer: 1,
    explanation: "차이 모드는 두 레이어의 색상 차이를 표시하며, 동일한 색상은 검정으로 나타납니다."
  },
  {
    id: 11,
    question: "이미지에 따뜻한 색조를 추가할 때 주로 사용하는 블렌딩 모드는?",
    options: ["곱하기", "스크린", "소프트 라이트/오버레이 + 주황색 레이어", "차이"],
    answer: 2,
    explanation: "주황색 솔리드 레이어에 소프트 라이트나 오버레이 모드를 적용하면 따뜻한 톤을 줄 수 있습니다."
  },
  {
    id: 12,
    question: "블렌딩 모드 '색상 닷지(Color Dodge)'의 효과는?",
    options: ["어두워지는 효과", "강하게 밝아지는 효과", "채도 감소", "흑백 변환"],
    answer: 1,
    explanation: "색상 닷지는 하이라이트를 강하게 밝게 만들어 빛나는 효과를 줍니다."
  },
  {
    id: 13,
    question: "블렌딩 모드 '색상 번(Color Burn)'의 효과는?",
    options: ["강하게 밝아지는 효과", "강하게 어두워지는 효과", "채도 증가", "색상 반전"],
    answer: 1,
    explanation: "색상 번은 어두운 영역을 더 강하게 어둡게 만들어 대비를 높입니다."
  },
  // 레이어 마스크 (12문항)
  {
    id: 14,
    question: "레이어 마스크에서 흰색 영역의 의미는?",
    options: ["숨김", "보임", "반투명", "삭제"],
    answer: 1,
    explanation: "레이어 마스크에서 흰색은 보이는 영역(완전 불투명), 검정은 숨겨진 영역(완전 투명)입니다."
  },
  {
    id: 15,
    question: "레이어 마스크를 추가하는 방법으로 옳지 않은 것은?",
    options: ["레이어 패널 하단의 마스크 아이콘 클릭", "레이어 > 레이어 마스크 > 모두 표시", "Alt + 마스크 아이콘 클릭", "Ctrl + D"],
    answer: 3,
    explanation: "Ctrl + D는 선택 해제 단축키이며, 마스크 추가와 관련이 없습니다."
  },
  {
    id: 16,
    question: "검정 마스크(모두 숨김)를 추가하려면?",
    options: ["마스크 아이콘 클릭", "Alt + 마스크 아이콘 클릭", "Shift + 마스크 아이콘 클릭", "Ctrl + 마스크 아이콘 클릭"],
    answer: 1,
    explanation: "Alt 키를 누른 상태로 마스크 아이콘을 클릭하면 검정(모두 숨김) 마스크가 생성됩니다."
  },
  {
    id: 17,
    question: "레이어 마스크를 일시적으로 비활성화하려면?",
    options: ["마스크 삭제", "Shift + 마스크 썸네일 클릭", "Alt + 마스크 썸네일 클릭", "Ctrl + 마스크 썸네일 클릭"],
    answer: 1,
    explanation: "Shift 키를 누르고 마스크 썸네일을 클릭하면 마스크가 일시적으로 비활성화됩니다."
  },
  {
    id: 18,
    question: "Alt 키를 누르고 마스크 썸네일을 클릭하면?",
    options: ["마스크 삭제", "마스크 비활성화", "마스크만 화면에 표시", "마스크 복제"],
    answer: 2,
    explanation: "Alt + 마스크 썸네일 클릭은 마스크 자체를 흑백 이미지로 화면에 표시합니다."
  },
  {
    id: 19,
    question: "선택 영역을 마스크로 변환하면 선택된 영역은 어떻게 되는가?",
    options: ["검정(숨김)", "흰색(보임)", "회색(반투명)", "삭제됨"],
    answer: 1,
    explanation: "선택 영역을 마스크로 변환하면 선택된 부분은 흰색(보임), 선택되지 않은 부분은 검정(숨김)이 됩니다."
  },
  {
    id: 20,
    question: "마스크 가장자리를 부드럽게 하려면?",
    options: ["마스크에 가우시안 블러 적용", "마스크 삭제", "마스크 반전", "마스크 복제"],
    answer: 0,
    explanation: "마스크에 가우시안 블러 필터를 적용하면 가장자리가 부드럽게 페더링됩니다."
  },
  {
    id: 21,
    question: "마스크 반전의 단축키는?",
    options: ["Ctrl + I", "Ctrl + D", "Ctrl + Z", "Ctrl + J"],
    answer: 0,
    explanation: "마스크를 선택한 상태에서 Ctrl + I를 누르면 마스크가 반전됩니다."
  },
  {
    id: 22,
    question: "그라디언트를 사용한 마스크의 활용 예는?",
    options: ["선명한 경계 합성", "자연스러운 페이드 아웃 효과", "색상 변경", "크기 조절"],
    answer: 1,
    explanation: "그라디언트 마스크는 두 이미지를 자연스럽게 페이드시키며 합성할 때 사용합니다."
  },
  {
    id: 23,
    question: "벡터 마스크의 특징은?",
    options: ["비트맵 기반", "패스 기반으로 깔끔한 가장자리", "브러시로만 편집", "한 번만 적용 가능"],
    answer: 1,
    explanation: "벡터 마스크는 패스(Path) 기반으로, 확대해도 가장자리가 깔끔하게 유지됩니다."
  },
  {
    id: 24,
    question: "레이어와 마스크의 링크를 해제하면?",
    options: ["마스크 삭제", "레이어와 마스크를 개별로 이동 가능", "마스크 반전", "레이어 삭제"],
    answer: 1,
    explanation: "링크를 해제하면 레이어 내용과 마스크를 각각 독립적으로 이동하거나 변형할 수 있습니다."
  },
  {
    id: 25,
    question: "마스크를 다른 레이어로 복사하는 방법은?",
    options: ["Ctrl + C, Ctrl + V", "Alt + 드래그", "더블 클릭", "Shift + 드래그"],
    answer: 1,
    explanation: "Alt 키를 누른 상태로 마스크 썸네일을 다른 레이어로 드래그하면 복사됩니다."
  },
  // 합성 기법 (13문항)
  {
    id: 26,
    question: "여러 이미지를 자연스럽게 합성할 때 가장 중요한 요소가 아닌 것은?",
    options: ["빛의 방향", "색온도", "원근감", "파일 크기"],
    answer: 3,
    explanation: "자연스러운 합성을 위해서는 빛의 방향, 색온도, 원근감, 해상도가 중요하며, 파일 크기는 합성 품질과 직접 관련이 없습니다."
  },
  {
    id: 27,
    question: "합성 시 피사체에 그림자를 추가하는 이유는?",
    options: ["파일 크기 감소", "현실감과 입체감 부여", "색상 변경", "선명도 증가"],
    answer: 1,
    explanation: "그림자는 피사체가 배경에 자연스럽게 놓여 있는 것처럼 현실감과 입체감을 줍니다."
  },
  {
    id: 28,
    question: "반사 효과를 만들 때 주로 사용하는 기법은?",
    options: ["레이어 복제 + 수직 뒤집기 + 불투명도 조절", "색상 변경", "크기 확대", "마스크 삭제"],
    answer: 0,
    explanation: "레이어를 복제하고 수직으로 뒤집은 후 불투명도를 낮추면 반사 효과를 만들 수 있습니다."
  },
  {
    id: 29,
    question: "합성 시 피사체 가장자리를 자연스럽게 만드는 방법이 아닌 것은?",
    options: ["페더링", "마스크 블러", "선택 및 마스크 다듬기", "선명하게 필터"],
    answer: 3,
    explanation: "선명하게 필터는 가장자리를 더 뚜렷하게 만들어 합성이 부자연스러워질 수 있습니다."
  },
  {
    id: 30,
    question: "피사체와 배경의 색온도를 맞추는 이유는?",
    options: ["파일 크기 감소", "합성의 자연스러움 향상", "로딩 속도 증가", "레이어 수 감소"],
    answer: 1,
    explanation: "색온도가 다르면 합성이 부자연스러워 보이므로, 조정 레이어로 색온도를 맞춰야 합니다."
  },
  {
    id: 31,
    question: "원근 왜곡(Perspective)을 사용하는 경우는?",
    options: ["색상 보정", "피사체를 배경의 원근에 맞추기", "레이어 병합", "마스크 생성"],
    answer: 1,
    explanation: "원근 왜곡은 합성할 피사체를 배경의 원근감에 맞게 변형할 때 사용합니다."
  },
  {
    id: 32,
    question: "합성 시 피사체에 노이즈를 추가하는 이유는?",
    options: ["화질 저하", "배경과 질감 통일", "파일 크기 증가", "색상 변경"],
    answer: 1,
    explanation: "배경에 노이즈가 있다면 피사체에도 비슷한 노이즈를 추가해야 자연스럽습니다."
  },
  {
    id: 33,
    question: "하늘 교체 합성 시 주의할 점이 아닌 것은?",
    options: ["빛의 방향 일치", "색온도 맞추기", "파일 이름 변경", "가장자리 자연스럽게 처리"],
    answer: 2,
    explanation: "파일 이름은 합성 품질과 관련이 없습니다."
  },
  {
    id: 34,
    question: "더블 익스포저(Double Exposure) 효과를 만드는 방법은?",
    options: ["레이어 삭제", "두 이미지 중첩 + 블렌딩 모드(스크린, 밝게하기 등)", "색상 반전", "크기 축소"],
    answer: 1,
    explanation: "더블 익스포저는 두 이미지를 중첩하고 스크린이나 밝게하기 블렌딩 모드를 적용합니다."
  },
  {
    id: 35,
    question: "텍스트에 이미지를 채우는 방법은?",
    options: ["일반 레이어로 변환", "텍스트에 클리핑 마스크 적용", "텍스트 삭제", "배경에 텍스트 병합"],
    answer: 1,
    explanation: "이미지 레이어를 텍스트 레이어에 클리핑 마스크로 적용하면 텍스트 모양으로 이미지가 채워집니다."
  },
  {
    id: 36,
    question: "다중 노출 효과에서 인물의 실루엣을 유지하려면?",
    options: ["인물 레이어를 최하단에 배치", "인물에 마스크 적용 후 블렌딩", "인물 삭제", "배경만 사용"],
    answer: 1,
    explanation: "인물 레이어에 마스크를 적용하고 적절한 블렌딩 모드를 사용하면 실루엣을 유지할 수 있습니다."
  },
  {
    id: 37,
    question: "포토 매니퓰레이션(Photo Manipulation)의 정의는?",
    options: ["사진 삭제", "여러 이미지를 조합하여 새로운 이미지 창작", "사진 촬영", "사진 인쇄"],
    answer: 1,
    explanation: "포토 매니퓰레이션은 여러 이미지를 조합하고 편집하여 새로운 창작 이미지를 만드는 기법입니다."
  },
  {
    id: 38,
    question: "합성 작업의 비파괴 편집을 위해 권장되는 것은?",
    options: ["배경 레이어에서 직접 작업", "스마트 오브젝트와 조정 레이어 사용", "모든 레이어 병합 후 작업", "마스크 없이 지우개 사용"],
    answer: 1,
    explanation: "스마트 오브젝트와 조정 레이어를 사용하면 원본을 유지하면서 언제든 수정이 가능합니다."
  },
  // 출력과 저장 (12문항)
  {
    id: 39,
    question: "웹용 이미지 저장에 적합한 형식은?",
    options: ["PSD", "TIFF", "JPG, PNG, GIF", "RAW"],
    answer: 2,
    explanation: "웹에서는 파일 크기가 작은 JPG, PNG, GIF 형식이 적합합니다."
  },
  {
    id: 40,
    question: "투명 배경을 유지하려면 어떤 형식으로 저장해야 하는가?",
    options: ["JPG", "PNG", "BMP", "TIFF"],
    answer: 1,
    explanation: "PNG 형식은 투명도(알파 채널)를 지원하여 투명 배경을 유지할 수 있습니다."
  },
  {
    id: 41,
    question: "인쇄용 이미지의 권장 해상도는?",
    options: ["72dpi", "150dpi", "300dpi 이상", "50dpi"],
    answer: 2,
    explanation: "인쇄물은 일반적으로 300dpi 이상의 해상도가 권장됩니다."
  },
  {
    id: 42,
    question: "웹용 이미지의 일반적인 해상도는?",
    options: ["300dpi", "72dpi", "600dpi", "1200dpi"],
    answer: 1,
    explanation: "웹 이미지는 모니터 표시 기준인 72dpi가 일반적입니다."
  },
  {
    id: 43,
    question: "JPG 저장 시 품질 설정의 영향은?",
    options: ["색상 변화", "파일 크기와 화질의 상관관계", "해상도 변화", "레이어 유지"],
    answer: 1,
    explanation: "JPG 품질을 높이면 화질이 좋아지지만 파일 크기가 커지고, 낮추면 반대입니다."
  },
  {
    id: 44,
    question: "PSD 형식의 장점은?",
    options: ["파일 크기가 작음", "웹에서 바로 사용 가능", "레이어, 마스크 등 모든 작업 내용 보존", "투명도 미지원"],
    answer: 2,
    explanation: "PSD는 포토샵의 모든 작업 내용(레이어, 마스크, 효과 등)을 그대로 저장합니다."
  },
  {
    id: 45,
    question: "CMYK 색상 모드가 필요한 경우는?",
    options: ["웹 디자인", "인쇄물 제작", "화면 표시 전용", "동영상 편집"],
    answer: 1,
    explanation: "인쇄물은 CMYK 4색 잉크로 출력하므로 CMYK 모드로 작업하거나 변환해야 합니다."
  },
  {
    id: 46,
    question: "RGB에서 CMYK로 변환할 때 주의할 점은?",
    options: ["파일 크기만 변함", "일부 색상이 달라질 수 있음", "해상도가 높아짐", "레이어가 병합됨"],
    answer: 1,
    explanation: "CMYK의 색역이 RGB보다 좁아서 일부 선명한 색상이 탁해질 수 있습니다."
  },
  {
    id: 47,
    question: "GIF 형식의 특징은?",
    options: ["수백만 색상 지원", "256색 제한, 애니메이션 지원", "투명도 미지원", "레이어 보존"],
    answer: 1,
    explanation: "GIF는 256색으로 제한되지만 간단한 애니메이션과 투명도를 지원합니다."
  },
  {
    id: 48,
    question: "내보내기(Export)와 다른 이름으로 저장(Save As)의 차이점은?",
    options: ["차이 없음", "내보내기는 웹/기기용으로 최적화된 옵션 제공", "다른 이름으로 저장만 형식 변경 가능", "내보내기는 PSD만 지원"],
    answer: 1,
    explanation: "내보내기는 웹이나 기기용으로 최적화된 다양한 옵션(크기, 형식, 품질)을 제공합니다."
  },
  {
    id: 49,
    question: "이미지 크기를 줄일 때 '리샘플링'의 의미는?",
    options: ["색상 변경", "픽셀 수를 변경하여 크기 조절", "레이어 병합", "필터 적용"],
    answer: 1,
    explanation: "리샘플링은 픽셀 수를 늘리거나 줄여 이미지 크기를 조절하는 것입니다."
  },
  {
    id: 50,
    question: "대용량 PSD 파일을 줄이는 방법이 아닌 것은?",
    options: ["불필요한 레이어 삭제", "스마트 오브젝트 래스터화", "레이어 병합", "해상도 높이기"],
    answer: 3,
    explanation: "해상도를 높이면 오히려 파일 크기가 커집니다."
  }
];

export default function PSCompositePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('gtq-ps-composite-progress');
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
      localStorage.setItem('gtq-ps-composite-progress', JSON.stringify({
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
    localStorage.removeItem('gtq-ps-composite-progress');
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
            <h1 className="text-2xl font-bold text-gray-800">이미지 합성</h1>
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
                {question.id <= 13 ? '블렌딩 모드' : question.id <= 25 ? '레이어 마스크' : question.id <= 38 ? '합성 기법' : '출력과 저장'}
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
