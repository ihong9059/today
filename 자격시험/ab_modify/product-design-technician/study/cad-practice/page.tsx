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
  // 2D CAD 기초 (1-12)
  {
    id: 1,
    question: "CAD에서 'Layer'의 주요 기능으로 가장 적절한 것은?",
    options: ["파일 저장", "도면 요소의 분류 및 관리", "프린터 설정", "뷰포트 생성"],
    answer: 1,
    explanation: "Layer는 도면의 요소들을 종류별로 분류하고 관리하는 기능으로, 색상, 선종류, 표시/비표시 등을 제어할 수 있습니다."
  },
  {
    id: 2,
    question: "AutoCAD에서 정확한 좌표 입력 방법 중 '@10,20'의 의미는?",
    options: ["절대좌표 (10,20)", "현재점에서 X방향 10, Y방향 20 상대이동", "극좌표 거리 10, 각도 20", "월드좌표 (10,20)"],
    answer: 1,
    explanation: "@기호는 상대좌표를 의미하며, 현재점을 기준으로 X방향 10, Y방향 20만큼 이동한 위치를 지정합니다."
  },
  {
    id: 3,
    question: "CAD에서 'OSNAP' 기능의 용도로 가장 적절한 것은?",
    options: ["객체 삭제", "정확한 점 지정 (끝점, 중심점 등)", "화면 확대/축소", "블록 생성"],
    answer: 1,
    explanation: "OSNAP(Object Snap)은 객체의 특정 점(끝점, 중점, 중심점, 교차점 등)을 정확하게 지정할 수 있게 해주는 기능입니다."
  },
  {
    id: 4,
    question: "CAD 도면에서 축척 1:2의 의미는?",
    options: ["실물이 도면의 2배", "도면이 실물의 2배", "실물과 도면이 같은 크기", "실물이 도면의 4배"],
    answer: 0,
    explanation: "축척 1:2는 도면 1에 대해 실물이 2라는 의미로, 실물 크기의 절반으로 축소하여 표현한 것입니다."
  },
  {
    id: 5,
    question: "CAD에서 'TRIM' 명령의 기능은?",
    options: ["객체 복사", "객체의 불필요한 부분 잘라내기", "객체 회전", "객체 이동"],
    answer: 1,
    explanation: "TRIM은 절단 경계선을 기준으로 객체의 불필요한 부분을 잘라내는 편집 명령입니다."
  },
  {
    id: 6,
    question: "CAD에서 'OFFSET' 명령의 기능은?",
    options: ["객체를 지정 거리만큼 평행 복사", "객체 삭제", "객체 대칭 복사", "객체 축소"],
    answer: 0,
    explanation: "OFFSET은 선택한 객체를 지정한 거리만큼 평행하게 복사하는 명령으로, 벽체나 윤곽선 작성에 유용합니다."
  },
  {
    id: 7,
    question: "CAD에서 'ARRAY' 명령의 종류가 아닌 것은?",
    options: ["직사각형 배열(Rectangular)", "원형 배열(Polar)", "경로 배열(Path)", "삼각형 배열(Triangular)"],
    answer: 3,
    explanation: "ARRAY 명령은 직사각형 배열, 원형 배열, 경로 배열의 3가지 유형을 제공합니다. 삼각형 배열은 없습니다."
  },
  {
    id: 8,
    question: "CAD에서 'FILLET' 명령의 기능은?",
    options: ["모서리를 둥글게 처리", "모서리를 직각으로 처리", "선 연장", "선 분할"],
    answer: 0,
    explanation: "FILLET은 두 선이 만나는 모서리를 지정한 반지름의 호로 둥글게 연결하는 명령입니다."
  },
  {
    id: 9,
    question: "CAD에서 'CHAMFER' 명령의 기능은?",
    options: ["모서리를 둥글게 처리", "모서리를 모따기(사선) 처리", "객체 복사", "객체 삭제"],
    answer: 1,
    explanation: "CHAMFER는 두 선이 만나는 모서리를 지정한 거리의 직선(사선)으로 모따기 처리하는 명령입니다."
  },
  {
    id: 10,
    question: "CAD에서 'MIRROR' 명령의 기능은?",
    options: ["객체를 회전 복사", "객체를 대칭 복사", "객체를 확대", "객체를 이동"],
    answer: 1,
    explanation: "MIRROR는 지정한 대칭축을 기준으로 객체를 거울처럼 대칭 복사하는 명령입니다."
  },
  {
    id: 11,
    question: "CAD에서 'SCALE' 명령 사용 시 축척 비율 0.5의 의미는?",
    options: ["2배 확대", "50% 축소", "5배 확대", "변화 없음"],
    answer: 1,
    explanation: "SCALE 명령에서 비율 0.5는 원본 크기의 50%로 축소됨을 의미합니다."
  },
  {
    id: 12,
    question: "CAD에서 'EXTEND' 명령의 기능은?",
    options: ["객체를 경계선까지 연장", "객체를 잘라내기", "객체를 복사", "객체를 회전"],
    answer: 0,
    explanation: "EXTEND는 선택한 객체를 지정한 경계선까지 연장하는 명령입니다."
  },

  // 3D 모델링 (13-25)
  {
    id: 13,
    question: "3D 모델링 방식 중 'Solid Modeling'의 특징으로 적절한 것은?",
    options: ["표면만 정의", "질량, 부피 계산 가능", "점과 선만 사용", "2D 요소만 포함"],
    answer: 1,
    explanation: "Solid Modeling은 내부가 채워진 3D 형상으로, 질량, 부피, 무게중심 등의 물리적 특성 계산이 가능합니다."
  },
  {
    id: 14,
    question: "3D 모델링에서 'Boolean 연산'에 해당하지 않는 것은?",
    options: ["Union(합집합)", "Subtract(차집합)", "Intersect(교집합)", "Extrude(돌출)"],
    answer: 3,
    explanation: "Boolean 연산은 Union(합), Subtract(차), Intersect(교)의 세 가지이며, Extrude는 2D를 3D로 변환하는 명령입니다."
  },
  {
    id: 15,
    question: "3D 모델링에서 'Extrude'의 기능은?",
    options: ["2D 프로파일을 직선 방향으로 돌출", "2D 프로파일을 축 중심 회전", "3D 객체를 자르기", "3D 객체를 복사"],
    answer: 0,
    explanation: "Extrude는 2D 단면 형상을 지정한 높이만큼 직선 방향으로 돌출시켜 3D 형상을 생성합니다."
  },
  {
    id: 16,
    question: "3D 모델링에서 'Revolve'의 기능은?",
    options: ["2D 프로파일을 직선 방향으로 돌출", "2D 프로파일을 축 중심으로 회전시켜 3D 생성", "3D 객체를 대칭 복사", "3D 객체를 분해"],
    answer: 1,
    explanation: "Revolve는 2D 프로파일을 지정한 축을 중심으로 회전시켜 3D 회전체를 생성합니다."
  },
  {
    id: 17,
    question: "3D 모델링에서 'Loft'의 기능은?",
    options: ["단일 프로파일 돌출", "여러 단면을 연결하여 3D 생성", "구멍 뚫기", "모서리 라운딩"],
    answer: 1,
    explanation: "Loft는 여러 개의 2D 단면(프로파일)을 부드럽게 연결하여 복잡한 3D 형상을 생성합니다."
  },
  {
    id: 18,
    question: "3D 모델링에서 'Sweep'의 기능은?",
    options: ["프로파일을 경로를 따라 이동시켜 3D 생성", "3D 객체 회전", "3D 객체 축소", "표면 생성"],
    answer: 0,
    explanation: "Sweep은 2D 프로파일을 지정한 경로(Path)를 따라 이동시켜 3D 형상을 생성합니다."
  },
  {
    id: 19,
    question: "3D CAD에서 'Shell' 명령의 기능은?",
    options: ["솔리드를 속이 빈 껍질 형태로 변환", "표면 색상 변경", "객체 복사", "객체 결합"],
    answer: 0,
    explanation: "Shell은 솔리드 객체의 내부를 파내어 지정한 두께의 껍질(외벽)만 남기는 명령입니다."
  },
  {
    id: 20,
    question: "3D 모델링에서 'Fillet'과 'Chamfer'의 공통점은?",
    options: ["모서리 처리 기능", "구멍 뚫기 기능", "복사 기능", "삭제 기능"],
    answer: 0,
    explanation: "Fillet(둥근 모서리)과 Chamfer(모따기)는 모두 3D 객체의 모서리를 처리하는 기능입니다."
  },
  {
    id: 21,
    question: "파라메트릭 모델링의 특징으로 가장 적절한 것은?",
    options: ["치수 변경 시 형상이 자동 업데이트", "표면만 정의 가능", "수정이 불가능", "2D만 지원"],
    answer: 0,
    explanation: "파라메트릭 모델링은 치수와 구속조건을 매개변수로 정의하여, 값 변경 시 형상이 자동으로 업데이트됩니다."
  },
  {
    id: 22,
    question: "3D 모델링에서 'Assembly'의 의미는?",
    options: ["단일 부품 생성", "여러 부품의 조립체 구성", "도면 출력", "재질 설정"],
    answer: 1,
    explanation: "Assembly는 여러 개의 개별 부품(Part)을 결합하여 완성된 제품의 조립체를 구성하는 것입니다."
  },
  {
    id: 23,
    question: "3D CAD에서 'Constraint(구속조건)'의 역할은?",
    options: ["객체 삭제", "객체 간의 기하학적 관계 정의", "색상 변경", "파일 저장"],
    answer: 1,
    explanation: "Constraint는 부품 간의 동심, 일치, 평행, 수직 등의 기하학적 관계를 정의하여 조립 위치를 결정합니다."
  },
  {
    id: 24,
    question: "Surface Modeling과 Solid Modeling의 차이점은?",
    options: ["Surface는 표면만, Solid는 내부까지 정의", "Surface가 더 간단함", "Solid는 2D만 가능", "차이 없음"],
    answer: 0,
    explanation: "Surface Modeling은 표면(껍질)만 정의하고, Solid Modeling은 내부가 채워진 덩어리로 정의합니다."
  },
  {
    id: 25,
    question: "3D 모델링에서 'Pattern(패턴)' 기능의 용도는?",
    options: ["형상을 규칙적으로 반복 배열", "색상 패턴 적용", "표면 질감 설정", "조명 효과"],
    answer: 0,
    explanation: "Pattern은 구멍, 돌출 등의 형상을 선형 또는 원형으로 규칙적으로 반복 배열하는 기능입니다."
  },

  // 렌더링 기법 (26-38)
  {
    id: 26,
    question: "3D 렌더링에서 'Material(재질)'이 포함하는 속성이 아닌 것은?",
    options: ["색상(Color)", "반사도(Reflectivity)", "투명도(Transparency)", "질량(Mass)"],
    answer: 3,
    explanation: "Material은 색상, 반사도, 투명도, 굴절률, 범프 등 시각적 속성을 포함하며, 질량은 물리적 속성입니다."
  },
  {
    id: 27,
    question: "렌더링에서 'Ray Tracing'의 특징은?",
    options: ["빠른 처리 속도", "광선 추적으로 사실적인 반사/굴절 표현", "저품질 이미지", "2D 전용"],
    answer: 1,
    explanation: "Ray Tracing은 광원에서 나온 빛의 경로를 추적하여 반사, 굴절, 그림자 등을 사실적으로 표현합니다."
  },
  {
    id: 28,
    question: "렌더링에서 'Ambient Light(환경광)'의 특징은?",
    options: ["특정 방향에서 오는 빛", "모든 방향에서 균일하게 비추는 빛", "점에서 발산하는 빛", "물체에서 반사된 빛만"],
    answer: 1,
    explanation: "Ambient Light는 특정 광원 없이 장면 전체를 균일하게 밝히는 기본 조명입니다."
  },
  {
    id: 29,
    question: "렌더링 조명 중 'Spot Light'의 특징은?",
    options: ["모든 방향으로 균일한 빛", "원뿔형으로 집중된 빛", "평행한 빛", "환경광"],
    answer: 1,
    explanation: "Spot Light는 한 점에서 원뿔형으로 퍼지는 집중 조명으로, 무대 조명과 유사합니다."
  },
  {
    id: 30,
    question: "'HDRI(High Dynamic Range Image)'의 렌더링에서의 용도는?",
    options: ["모델링 보조", "사실적인 환경 조명 및 반사 표현", "파일 압축", "애니메이션 생성"],
    answer: 1,
    explanation: "HDRI는 넓은 밝기 범위를 가진 이미지로, 환경 조명과 사실적인 반사 표현에 사용됩니다."
  },
  {
    id: 31,
    question: "렌더링에서 'Texture Mapping'의 기능은?",
    options: ["3D 형상 생성", "2D 이미지를 3D 표면에 입히기", "조명 설정", "카메라 설정"],
    answer: 1,
    explanation: "Texture Mapping은 2D 이미지(텍스처)를 3D 객체의 표면에 입혀 질감을 표현하는 기법입니다."
  },
  {
    id: 32,
    question: "렌더링에서 'Bump Mapping'의 효과는?",
    options: ["색상 변화", "실제 형상 변경 없이 요철감 표현", "투명도 조절", "크기 변경"],
    answer: 1,
    explanation: "Bump Mapping은 실제 지오메트리 변경 없이 명암 조절로 표면의 요철감(울퉁불퉁함)을 표현합니다."
  },
  {
    id: 33,
    question: "'Global Illumination(전역 조명)'의 특징은?",
    options: ["직접광만 계산", "직접광과 간접광(반사광)을 모두 계산", "조명 없이 렌더링", "2D 조명만"],
    answer: 1,
    explanation: "Global Illumination은 광원의 직접광뿐 아니라 물체에서 반사된 간접광까지 계산하여 사실적인 조명을 구현합니다."
  },
  {
    id: 34,
    question: "렌더링에서 'Anti-aliasing'의 목적은?",
    options: ["렌더링 속도 향상", "계단 현상(Jagging) 제거로 부드러운 경계선", "파일 크기 감소", "색상 보정"],
    answer: 1,
    explanation: "Anti-aliasing은 픽셀의 계단 현상을 부드럽게 처리하여 경계선의 품질을 향상시킵니다."
  },
  {
    id: 35,
    question: "렌더링에서 'Depth of Field(피사계 심도)'의 효과는?",
    options: ["모든 부분 선명", "초점 거리에 따른 흐림 효과", "색상 변화", "크기 변화"],
    answer: 1,
    explanation: "Depth of Field는 카메라 초점에 따라 전경과 배경에 흐림 효과를 주어 사실적인 이미지를 표현합니다."
  },
  {
    id: 36,
    question: "'PBR(Physically Based Rendering)'의 특징은?",
    options: ["비사실적 표현", "물리 법칙 기반의 사실적 재질 표현", "2D 전용", "저품질 렌더링"],
    answer: 1,
    explanation: "PBR은 빛의 물리적 특성을 기반으로 재질을 정의하여 일관되고 사실적인 렌더링 결과를 제공합니다."
  },
  {
    id: 37,
    question: "렌더링 출력 해상도 'DPI'의 의미는?",
    options: ["화면 크기", "인치당 도트(픽셀) 수", "파일 크기", "색상 수"],
    answer: 1,
    explanation: "DPI(Dots Per Inch)는 인치당 도트(픽셀) 수로, 인쇄물의 해상도와 품질을 결정합니다."
  },
  {
    id: 38,
    question: "렌더링에서 'Caustics' 효과가 표현하는 것은?",
    options: ["그림자", "투명체를 통과한 빛의 집중 패턴", "반사", "굴절"],
    answer: 1,
    explanation: "Caustics는 유리잔이나 물 등 투명체를 통과하거나 반사된 빛이 집중되어 생기는 밝은 패턴입니다."
  },

  // 도면 작성법 (39-50)
  {
    id: 39,
    question: "제품도면에서 '제1각법'과 '제3각법'의 차이점은?",
    options: ["선의 종류", "투상면과 물체의 위치 관계", "축척 방법", "치수 표기법"],
    answer: 1,
    explanation: "제1각법은 물체-투상면 순서로, 제3각법은 투상면-물체 순서로 배치되어 정면도 기준 다른 도면 배치가 달라집니다."
  },
  {
    id: 40,
    question: "KS 제도 규격에서 한국이 주로 사용하는 투상법은?",
    options: ["제1각법", "제2각법", "제3각법", "제4각법"],
    answer: 2,
    explanation: "한국(KS)은 미국, 일본과 함께 제3각법을 표준으로 사용합니다. 유럽은 제1각법을 주로 사용합니다."
  },
  {
    id: 41,
    question: "도면에서 '외형선(굵은 실선)'이 표현하는 것은?",
    options: ["보이지 않는 모서리", "물체의 보이는 윤곽선", "중심선", "치수 보조선"],
    answer: 1,
    explanation: "외형선은 굵은 실선으로 물체의 보이는 외곽 윤곽선을 표현합니다."
  },
  {
    id: 42,
    question: "도면에서 '숨은선(파선)'이 표현하는 것은?",
    options: ["보이는 모서리", "물체의 보이지 않는 부분", "중심선", "절단선"],
    answer: 1,
    explanation: "숨은선은 가는 파선으로 현재 보는 방향에서 가려져 보이지 않는 모서리나 윤곽을 표현합니다."
  },
  {
    id: 43,
    question: "도면에서 '중심선'의 올바른 표현은?",
    options: ["굵은 실선", "가는 1점 쇄선", "파선", "굵은 2점 쇄선"],
    answer: 1,
    explanation: "중심선은 가는 1점 쇄선으로 도형의 중심, 대칭축, 원의 중심 등을 표현합니다."
  },
  {
    id: 44,
    question: "도면의 치수 기입에서 'φ' 기호의 의미는?",
    options: ["반지름", "지름", "모따기", "깊이"],
    answer: 1,
    explanation: "φ(파이) 기호는 원이나 원통의 지름(직경)을 나타내는 치수 기호입니다."
  },
  {
    id: 45,
    question: "도면의 치수 기입에서 'R' 기호의 의미는?",
    options: ["지름", "반지름", "모따기", "두께"],
    answer: 1,
    explanation: "R 기호는 원호나 라운드의 반지름을 나타내는 치수 기호입니다."
  },
  {
    id: 46,
    question: "도면에서 '표면 거칠기' 기호가 나타내는 것은?",
    options: ["재질", "가공 후 표면의 미세한 요철 정도", "색상", "무게"],
    answer: 1,
    explanation: "표면 거칠기 기호는 가공된 표면의 미세한 요철 정도를 Ra, Rz 등의 수치로 표시합니다."
  },
  {
    id: 47,
    question: "도면의 '단면도'를 사용하는 주된 목적은?",
    options: ["외부 형상 표현", "내부 구조 및 형상 표현", "정면 형상만 표현", "색상 표현"],
    answer: 1,
    explanation: "단면도는 물체를 가상으로 절단하여 내부 구조와 형상을 명확하게 표현하기 위해 사용합니다."
  },
  {
    id: 48,
    question: "도면에서 '해칭(Hatching)'의 용도는?",
    options: ["외형선 강조", "단면 부분 표시", "중심선 표시", "치수선 표시"],
    answer: 1,
    explanation: "해칭은 단면도에서 절단된 재료 부분을 45도 평행선 등으로 표시하여 단면임을 나타냅니다."
  },
  {
    id: 49,
    question: "도면의 '부품표(Parts List)'에 포함되는 정보가 아닌 것은?",
    options: ["부품 번호", "부품명", "수량", "가공 시간"],
    answer: 3,
    explanation: "부품표에는 부품 번호, 부품명, 수량, 재질, 규격 등이 포함되며, 가공 시간은 별도 공정표에서 관리합니다."
  },
  {
    id: 50,
    question: "도면의 '공차' 표기 'H7/g6'에서 대문자와 소문자의 의미는?",
    options: ["대문자-축, 소문자-구멍", "대문자-구멍, 소문자-축", "둘 다 구멍", "둘 다 축"],
    answer: 1,
    explanation: "끼워맞춤 공차에서 대문자(H7)는 구멍의 공차, 소문자(g6)는 축의 공차를 나타냅니다."
  }
];

export default function CadPracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pdt-cad-practice-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pdt-cad-practice-progress', JSON.stringify({
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
    localStorage.removeItem('pdt-cad-practice-progress');
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
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-teal-100 mb-2">
            <Link href="/category/design/product-design-technician" className="hover:text-white transition-colors">
              제품디자인산업기사
            </Link>
            <span>/</span>
            <span>CAD실무</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">CAD실무</h1>
          <p className="text-teal-100">2D/3D CAD, 렌더링, 도면 작성 핵심 문제</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-gray-600">진행률</span>
              <span className="ml-2 font-bold text-teal-600">{answeredQuestions.size}/{questions.length}</span>
            </div>
            <div>
              <span className="text-gray-600">점수</span>
              <span className="ml-2 font-bold text-cyan-600">{score}점</span>
            </div>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              초기화
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentQuestion === index
                    ? 'bg-teal-600 text-white'
                    : answeredQuestions.has(index)
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">
              문제 {currentQuestion + 1}
            </span>
            {currentQuestion < 12 && (
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">2D CAD 기초</span>
            )}
            {currentQuestion >= 12 && currentQuestion < 25 && (
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">3D 모델링</span>
            )}
            {currentQuestion >= 25 && currentQuestion < 38 && (
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">렌더링 기법</span>
            )}
            {currentQuestion >= 38 && (
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">도면 작성법</span>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answeredQuestions.has(currentQuestion)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answeredQuestions.has(currentQuestion)
                    ? index === question.answer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-gray-200 hover:border-teal-400 hover:bg-teal-50'
                }`}
              >
                <span className="font-medium mr-3">{index + 1}.</span>
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl ${
              selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === question.answer ? (
                  <span className="text-green-600 font-bold">✓ 정답입니다!</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ 오답입니다. 정답은 {question.answer + 1}번입니다.</span>
                )}
              </div>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-medium"
          >
            ← 이전 문제
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium"
          >
            다음 문제 →
          </button>
        </div>

        {/* Complete Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3>
              <p className="text-gray-600 mb-4">CAD실무 과목을 모두 풀었습니다.</p>
              <div className="text-4xl font-bold text-teal-600 mb-6">{score} / {questions.length}</div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
                >
                  다시 풀기
                </button>
                <Link
                  href="/category/design/product-design-technician"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl transition-colors font-medium"
                >
                  메인으로
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
