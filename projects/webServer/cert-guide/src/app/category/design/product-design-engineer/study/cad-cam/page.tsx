'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

const questions: Question[] = [
  // 3D 모델링 기초 (12문항)
  { id: 1, question: "3D CAD에서 솔리드 모델링(Solid Modeling)의 특징은?", options: ["표면만 정의", "체적과 질량 정보 포함", "2D만 지원", "곡면 불가"], correct: 1, explanation: "솔리드 모델링은 객체의 체적, 질량, 무게중심 등 물리적 정보를 포함하는 완전한 3D 모델입니다.", topic: "3D 모델링" },
  { id: 2, question: "서피스 모델링(Surface Modeling)의 주요 용도는?", options: ["구조 해석", "자유곡면 디자인", "2D 도면", "NC 프로그래밍만"], correct: 1, explanation: "서피스 모델링은 복잡한 자유곡면을 표현할 수 있어 자동차, 항공기 등의 외형 디자인에 사용됩니다.", topic: "3D 모델링" },
  { id: 3, question: "CAD에서 '피처(Feature)'의 의미는?", options: ["색상 속성", "형상 생성/수정 요소", "파일 형식", "렌더링 효과"], correct: 1, explanation: "피처는 돌출, 컷, 필렛 등 모델의 형상을 생성하거나 수정하는 기본 요소입니다.", topic: "3D 모델링" },
  { id: 4, question: "파라메트릭 모델링(Parametric Modeling)의 장점은?", options: ["수치 변경 불가", "치수 변경으로 형상 자동 수정", "곡면 전용", "저용량"], correct: 1, explanation: "파라메트릭 모델링은 치수나 구속조건을 변경하면 관련 형상이 자동으로 업데이트됩니다.", topic: "3D 모델링" },
  { id: 5, question: "'로프트(Loft)' 명령의 기능은?", options: ["구멍 뚫기", "여러 단면을 연결하여 형상 생성", "모서리 깎기", "대칭 복사"], correct: 1, explanation: "로프트는 두 개 이상의 다른 단면을 부드럽게 연결하여 복잡한 형상을 만드는 기능입니다.", topic: "3D 모델링" },
  { id: 6, question: "'스윕(Sweep)' 명령이란?", options: ["회전 형상", "단면을 경로 따라 이동", "대칭 복사", "구멍 패턴"], correct: 1, explanation: "스윕은 2D 단면을 3D 경로를 따라 이동시켜 형상을 생성하는 기능입니다.", topic: "3D 모델링" },
  { id: 7, question: "필렛(Fillet)과 챔퍼(Chamfer)의 차이는?", options: ["크기 차이", "곡면 vs 경사면", "색상 차이", "재질 차이"], correct: 1, explanation: "필렛은 모서리를 둥글게, 챔퍼는 모서리를 경사지게 깎는 기능입니다.", topic: "3D 모델링" },
  { id: 8, question: "쉘(Shell) 명령의 용도는?", options: ["표면 삭제", "속이 빈 껍데기 형상 생성", "패턴 생성", "어셈블리"], correct: 1, explanation: "쉘은 솔리드 내부를 비워 균일한 두께의 껍데기 형상을 만드는 기능입니다.", topic: "3D 모델링" },
  { id: 9, question: "미러(Mirror) 기능의 주요 목적은?", options: ["색상 반전", "대칭 형상 생성", "크기 축소", "재질 변경"], correct: 1, explanation: "미러는 평면을 기준으로 형상을 대칭 복사하여 좌우 대칭 부품을 쉽게 만듭니다.", topic: "3D 모델링" },
  { id: 10, question: "부울 연산(Boolean Operation)에 해당하지 않는 것은?", options: ["합집합", "차집합", "교집합", "나눗셈"], correct: 3, explanation: "부울 연산은 합집합(Union), 차집합(Subtract), 교집합(Intersect)으로 솔리드를 결합하거나 분리합니다.", topic: "3D 모델링" },
  { id: 11, question: "다이렉트 모델링(Direct Modeling)의 특징은?", options: ["히스토리 기반", "형상 직접 조작", "파라메트릭만", "곡면 불가"], correct: 1, explanation: "다이렉트 모델링은 히스토리 없이 형상을 직접 밀고 당기며 수정하는 방식입니다.", topic: "3D 모델링" },
  { id: 12, question: "어셈블리(Assembly) 모델링에서 '구속조건(Constraint)'의 역할은?", options: ["색상 지정", "부품 간 위치/운동 관계 정의", "재질 설정", "렌더링"], correct: 1, explanation: "구속조건은 부품들 간의 일치, 동심, 거리 등의 관계를 정의하여 조립 상태를 표현합니다.", topic: "3D 모델링" },

  // 렌더링 기술 (13문항)
  { id: 13, question: "렌더링(Rendering)의 목적은?", options: ["구조 해석", "사실적 이미지 생성", "NC 코드 생성", "2D 도면 출력"], correct: 1, explanation: "렌더링은 3D 모델에 재질, 조명, 환경을 적용하여 사진처럼 사실적인 이미지를 생성합니다.", topic: "렌더링" },
  { id: 14, question: "레이 트레이싱(Ray Tracing)의 특징은?", options: ["저품질", "빛의 경로 추적으로 사실적 반사/굴절", "실시간만", "2D 전용"], correct: 1, explanation: "레이 트레이싱은 광선의 경로를 추적하여 반사, 굴절, 그림자 등을 사실적으로 표현합니다.", topic: "렌더링" },
  { id: 15, question: "글로벌 일루미네이션(Global Illumination)이란?", options: ["직접광만 계산", "간접광 포함한 전체 조명 계산", "그림자 제거", "색상 반전"], correct: 1, explanation: "글로벌 일루미네이션은 직접광뿐 아니라 반사되어 돌아오는 간접광까지 계산하여 자연스러운 조명을 표현합니다.", topic: "렌더링" },
  { id: 16, question: "HDRI(High Dynamic Range Image)의 용도는?", options: ["저해상도 이미지", "환경 조명/반사용 이미지", "2D 텍스처만", "저품질 출력"], correct: 1, explanation: "HDRI는 넓은 밝기 범위를 가진 360도 이미지로, 현실적인 환경 조명과 반사에 사용됩니다.", topic: "렌더링" },
  { id: 17, question: "PBR(Physically Based Rendering)의 의미는?", options: ["예술적 표현", "물리 법칙 기반 렌더링", "저사양 렌더링", "2D 렌더링"], correct: 1, explanation: "PBR은 빛의 물리적 특성을 기반으로 재질을 표현하여 일관된 사실적 결과를 얻는 방식입니다.", topic: "렌더링" },
  { id: 18, question: "재질의 '러프니스(Roughness)' 값이 높으면?", options: ["거울 반사", "확산 반사(매트)", "투명", "발광"], correct: 1, explanation: "러프니스가 높으면 표면이 거칠어 빛이 확산 반사되어 매트(무광)한 느낌이 됩니다.", topic: "렌더링" },
  { id: 19, question: "노멀 맵(Normal Map)의 용도는?", options: ["색상 표현", "표면 요철 시뮬레이션", "투명도 설정", "그림자 제거"], correct: 1, explanation: "노멀 맵은 실제 폴리곤을 늘리지 않고 표면의 요철을 시뮬레이션하여 디테일을 표현합니다.", topic: "렌더링" },
  { id: 20, question: "앰비언트 오클루전(Ambient Occlusion)의 효과는?", options: ["직접광 계산", "접힌 부분에 부드러운 그림자", "반사 증가", "투명도 증가"], correct: 1, explanation: "AO는 틈새나 모서리처럼 빛이 차단되는 부분에 부드러운 그림자를 추가하여 깊이감을 줍니다.", topic: "렌더링" },
  { id: 21, question: "카우스틱스(Caustics) 효과란?", options: ["그림자 제거", "빛이 굴절/반사되어 모이는 밝은 패턴", "안개 효과", "모션 블러"], correct: 1, explanation: "카우스틱스는 물이나 유리를 통과한 빛이 굴절되어 바닥에 밝은 패턴을 만드는 효과입니다.", topic: "렌더링" },
  { id: 22, question: "DOF(Depth of Field)의 의미는?", options: ["색 심도", "피사계 심도(초점 흐림)", "해상도", "비트 심도"], correct: 1, explanation: "피사계 심도는 초점이 맞는 범위를 조절하여 배경이나 전경을 흐리게 하는 카메라 효과입니다.", topic: "렌더링" },
  { id: 23, question: "모션 블러(Motion Blur)란?", options: ["정지 상태", "움직임에 의한 잔상 효과", "색상 번짐", "노이즈"], correct: 1, explanation: "모션 블러는 빠르게 움직이는 물체의 잔상을 표현하여 동적인 느낌을 주는 효과입니다.", topic: "렌더링" },
  { id: 24, question: "렌더 팜(Render Farm)의 용도는?", options: ["단일 PC 렌더링", "다수 컴퓨터로 분산 렌더링", "2D 작업만", "모델링 전용"], correct: 1, explanation: "렌더 팜은 여러 컴퓨터를 연결하여 렌더링 작업을 분산 처리, 시간을 단축합니다.", topic: "렌더링" },
  { id: 25, question: "실시간 렌더링과 오프라인 렌더링의 차이는?", options: ["품질 동일", "속도 vs 품질 트레이드오프", "용도 동일", "소프트웨어 동일"], correct: 1, explanation: "실시간 렌더링은 빠르지만 품질이 낮고, 오프라인 렌더링은 느리지만 고품질입니다.", topic: "렌더링" },

  // CAM 기초 (13문항)
  { id: 26, question: "CAM(Computer Aided Manufacturing)의 주요 기능은?", options: ["3D 모델링", "NC 가공 프로그램 생성", "렌더링", "구조 해석"], correct: 1, explanation: "CAM은 CAD 데이터를 기반으로 CNC 공작기계를 제어하는 NC 코드를 생성합니다.", topic: "CAM" },
  { id: 27, question: "G-code에서 'G01'의 의미는?", options: ["급속 이송", "직선 절삭 이송", "원호 이송", "프로그램 종료"], correct: 1, explanation: "G01은 지정된 이송 속도로 직선 경로를 따라 절삭하는 명령입니다.", topic: "CAM" },
  { id: 28, question: "G-code에서 'G00'의 의미는?", options: ["직선 절삭", "급속 위치 이동", "원호 절삭", "드웰"], correct: 1, explanation: "G00은 절삭 없이 최대 속도로 공구를 이동시키는 급속 이송 명령입니다.", topic: "CAM" },
  { id: 29, question: "포스트 프로세서(Post Processor)의 역할은?", options: ["3D 모델 생성", "특정 기계에 맞는 NC 코드 변환", "렌더링", "도면 출력"], correct: 1, explanation: "포스트 프로세서는 CAM의 툴패스를 특정 CNC 기계가 이해할 수 있는 NC 코드로 변환합니다.", topic: "CAM" },
  { id: 30, question: "황삭(Roughing)과 정삭(Finishing)의 차이는?", options: ["속도 차이만", "소재 대량 제거 vs 정밀 마무리", "공구 동일", "순서 무관"], correct: 1, explanation: "황삭은 큰 절삭량으로 빠르게 소재를 제거하고, 정삭은 작은 절삭량으로 정밀하게 마무리합니다.", topic: "CAM" },
  { id: 31, question: "절삭 속도(Cutting Speed)에 영향을 주는 요소가 아닌 것은?", options: ["소재 재질", "공구 재질", "소재 색상", "절삭 깊이"], correct: 2, explanation: "절삭 속도는 소재와 공구 재질, 절삭 조건에 따라 결정되며, 색상은 무관합니다.", topic: "CAM" },
  { id: 32, question: "'툴패스(Toolpath)'란?", options: ["공구 보관함", "공구가 이동하는 경로", "공구 사양", "공구 가격"], correct: 1, explanation: "툴패스는 가공 시 공구가 움직이는 경로를 의미하며, CAM에서 생성합니다.", topic: "CAM" },
  { id: 33, question: "3축 가공과 5축 가공의 차이는?", options: ["속도 차이만", "동시 제어 축 수", "재료 차이", "공구 크기"], correct: 1, explanation: "3축은 X, Y, Z 축만, 5축은 여기에 2개의 회전축을 추가하여 복잡한 형상을 가공합니다.", topic: "CAM" },
  { id: 34, question: "공구 경로 시뮬레이션의 목적은?", options: ["렌더링", "가공 전 충돌/오류 검증", "2D 도면 생성", "재질 설정"], correct: 1, explanation: "시뮬레이션은 실제 가공 전에 툴패스를 검증하여 충돌이나 과절삭 오류를 방지합니다.", topic: "CAM" },
  { id: 35, question: "스핀들 속도(RPM)를 결정하는 공식에 포함되지 않는 것은?", options: ["절삭 속도", "공구 직경", "소재 색상", "파이(π)"], correct: 2, explanation: "RPM = (절삭속도 × 1000) / (π × 공구직경)으로, 색상은 관련이 없습니다.", topic: "CAM" },
  { id: 36, question: "이송 속도(Feed Rate)의 단위는?", options: ["RPM", "mm/min 또는 mm/rev", "Watt", "Volt"], correct: 1, explanation: "이송 속도는 분당 이동 거리(mm/min) 또는 회전당 이동 거리(mm/rev)로 표시합니다.", topic: "CAM" },
  { id: 37, question: "엔드밀(End Mill)의 주요 용도는?", options: ["선반 가공", "밀링 측면/슬롯 가공", "드릴링만", "연삭만"], correct: 1, explanation: "엔드밀은 밀링 가공에서 측면, 슬롯, 포켓 등을 가공하는 다목적 절삭 공구입니다.", topic: "CAM" },
  { id: 38, question: "절삭유(Coolant)의 역할이 아닌 것은?", options: ["냉각", "윤활", "칩 제거", "경도 증가"], correct: 3, explanation: "절삭유는 가공 시 냉각, 윤활, 칩 제거 역할을 하며, 소재 경도를 높이지는 않습니다.", topic: "CAM" },

  // 3D 프린팅 (12문항)
  { id: 39, question: "3D 프린팅의 다른 명칭은?", options: ["절삭 가공", "적층 제조(AM)", "주조", "단조"], correct: 1, explanation: "3D 프린팅은 재료를 층층이 쌓아 올리는 방식으로 적층 제조(Additive Manufacturing)라고도 합니다.", topic: "3D 프린팅" },
  { id: 40, question: "FDM(Fused Deposition Modeling) 방식의 원리는?", options: ["레이저 소결", "필라멘트 압출 적층", "광경화", "분말 접착"], correct: 1, explanation: "FDM은 열가소성 필라멘트를 녹여 노즐로 압출하며 적층하는 가장 보편적인 3D 프린팅 방식입니다.", topic: "3D 프린팅" },
  { id: 41, question: "SLA(Stereolithography) 방식의 원리는?", options: ["필라멘트 압출", "액체 수지의 광경화", "분말 소결", "잉크젯"], correct: 1, explanation: "SLA는 액체 광경화성 수지에 UV 레이저나 광원을 조사하여 경화시키는 방식입니다.", topic: "3D 프린팅" },
  { id: 42, question: "SLS(Selective Laser Sintering)에서 사용하는 재료는?", options: ["액체 수지", "필라멘트", "분말 재료", "시트"], correct: 2, explanation: "SLS는 분말 형태의 재료(나일론, 금속 등)를 레이저로 선택적으로 소결하는 방식입니다.", topic: "3D 프린팅" },
  { id: 43, question: "3D 프린팅에서 '서포트(Support)'가 필요한 이유는?", options: ["색상 추가", "오버행 형상 지지", "속도 향상", "재료 절약"], correct: 1, explanation: "서포트는 돌출된 오버행 부분이 중력에 의해 처지지 않도록 임시로 지지하는 구조입니다.", topic: "3D 프린팅" },
  { id: 44, question: "3D 프린팅의 레이어 높이(Layer Height)가 낮으면?", options: ["표면 거침", "표면 매끄러움/시간 증가", "강도 감소", "재료 절약"], correct: 1, explanation: "레이어 높이가 낮을수록 표면이 매끄러워지지만 적층 횟수가 늘어 시간이 오래 걸립니다.", topic: "3D 프린팅" },
  { id: 45, question: "인필(Infill)의 역할은?", options: ["표면 마감", "내부 채움 구조로 강도/무게 조절", "색상 변경", "서포트 대체"], correct: 1, explanation: "인필은 출력물 내부를 채우는 패턴으로, 밀도를 조절하여 강도와 무게의 균형을 맞춥니다.", topic: "3D 프린팅" },
  { id: 46, question: "3D 프린팅용 표준 파일 형식은?", options: ["DWG", "STL", "PSD", "MP4"], correct: 1, explanation: "STL(Stereolithography)은 3D 프린팅에서 가장 널리 사용되는 표준 파일 형식입니다.", topic: "3D 프린팅" },
  { id: 47, question: "슬라이서(Slicer) 소프트웨어의 역할은?", options: ["3D 모델링", "모델을 레이어로 분할/G-code 생성", "렌더링", "스캐닝"], correct: 1, explanation: "슬라이서는 3D 모델을 프린터가 이해할 수 있도록 레이어로 분할하고 G-code를 생성합니다.", topic: "3D 프린팅" },
  { id: 48, question: "금속 3D 프린팅 기술에 해당하지 않는 것은?", options: ["DMLS", "EBM", "FDM", "SLM"], correct: 2, explanation: "FDM은 플라스틱 필라멘트 방식이고, DMLS, EBM, SLM은 금속 분말 기반 기술입니다.", topic: "3D 프린팅" },
  { id: 49, question: "래피드 프로토타이핑(Rapid Prototyping)의 장점은?", options: ["대량 생산", "빠른 시제품 제작", "저비용 금형", "무한 크기"], correct: 1, explanation: "래피드 프로토타이핑은 금형 없이 CAD 데이터에서 직접 빠르게 시제품을 제작할 수 있습니다.", topic: "3D 프린팅" },
  { id: 50, question: "DfAM(Design for Additive Manufacturing)이란?", options: ["전통 제조용 설계", "적층 제조 특성 고려 설계", "2D 도면 설계", "금형 설계"], correct: 1, explanation: "DfAM은 3D 프린팅의 장단점을 고려하여 최적화된 형상을 설계하는 방법론입니다.", topic: "3D 프린팅" }
];

export default function CadCamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('cad-cam-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(new Set(data.answered));
      setScore(data.score);
    }
  }, []);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestion);
    setAnsweredQuestions(newAnswered);

    let newScore = score;
    if (index === questions[currentQuestion].correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    localStorage.setItem('cad-cam-progress', JSON.stringify({
      answered: Array.from(newAnswered),
      score: newScore
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
    localStorage.removeItem('cad-cam-progress');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getAISearchUrl = (question: string, topic: string, aiType: string) => {
    const searchQuery = encodeURIComponent(`${topic} ${question} 제품디자인기사`);
    switch(aiType) {
      case 'claude': return `https://claude.ai/new?q=${searchQuery}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${searchQuery}`;
      case 'gemini': return `https://gemini.google.com/?q=${searchQuery}`;
      default: return '#';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
              <div className="text-xl text-gray-600">정답률: {percentage}%</div>
            </div>
            <div className="mb-8">
              {percentage >= 80 ? (
                <p className="text-green-600 font-semibold">훌륭합니다! CAD/CAM을 잘 이해하고 계시네요!</p>
              ) : percentage >= 60 ? (
                <p className="text-yellow-600 font-semibold">좋아요! 조금 더 학습하면 완벽해질 거예요!</p>
              ) : (
                <p className="text-red-600 font-semibold">더 많은 학습이 필요해요. 다시 도전해보세요!</p>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                다시 시작
              </button>
              <Link
                href="/category/design/product-design-engineer"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/category/design/product-design-engineer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            제품디자인기사 홈으로
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">CAD/CAM</h1>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              {question.topic}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    : selectedAnswer === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : index === question.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-semibold ${
                    selectedAnswer === null
                      ? 'bg-gray-200 text-gray-700'
                      : selectedAnswer === index
                        ? index === question.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === question.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl mb-6 ${
              selectedAnswer === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  selectedAnswer === question.correct ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {selectedAnswer === question.correct ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {selectedAnswer === question.correct ? '정답입니다!' : '틀렸습니다!'}
                  </p>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">AI에게 더 물어보기:</p>
                <div className="flex gap-2">
                  <a href={getAISearchUrl(question.question, question.topic, 'claude')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
                    Claude
                  </a>
                  <a href={getAISearchUrl(question.question, question.topic, 'chatgpt')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                    ChatGPT
                  </a>
                  <a href={getAISearchUrl(question.question, question.topic, 'gemini')} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                    Gemini
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedAnswer !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-10 gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestion(idx);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className={`w-full aspect-square rounded-lg font-medium text-sm transition-all duration-200 ${
                idx === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answeredQuestions.has(idx)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
