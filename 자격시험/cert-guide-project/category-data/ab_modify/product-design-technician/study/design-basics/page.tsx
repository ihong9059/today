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
  // 디자인 역사와 사조 (10문항)
  { id: 1, question: "윌리엄 모리스가 주도한 영국의 수공예 운동은?", options: ["아르누보", "미술공예운동", "바우하우스", "데스틸"], correct: 1, explanation: "미술공예운동(Arts and Crafts Movement)은 산업혁명에 대한 반발로 수공예의 가치를 부활시키려 한 운동입니다.", topic: "디자인 역사" },
  { id: 2, question: "1919년 독일에서 설립된 세계 최초의 디자인 종합학교는?", options: ["울름조형대학", "바우하우스", "RCA", "파슨스"], correct: 1, explanation: "바우하우스는 발터 그로피우스가 설립한 학교로, 예술과 기술의 통합을 추구했습니다.", topic: "디자인 역사" },
  { id: 3, question: "아르누보(Art Nouveau)의 조형적 특징은?", options: ["기하학적 직선", "유기적 곡선", "원색 사용", "금속 소재"], correct: 1, explanation: "아르누보는 식물, 꽃 등 자연에서 영감을 받은 유기적이고 곡선적인 형태가 특징입니다.", topic: "디자인 역사" },
  { id: 4, question: "아르데코(Art Deco)의 특징으로 옳은 것은?", options: ["유기적 곡선", "기하학적 장식", "자연주의", "미니멀리즘"], correct: 1, explanation: "아르데코는 1920-30년대 기하학적 문양과 화려한 장식이 특징인 양식입니다.", topic: "디자인 역사" },
  { id: 5, question: "데스틸(De Stijl) 운동의 대표 인물은?", options: ["윌리엄 모리스", "몬드리안", "르 코르뷔지에", "필립 스탁"], correct: 1, explanation: "데스틸은 몬드리안, 리트벨트 등이 이끈 네덜란드 추상미술 운동으로 수직수평과 삼원색을 사용했습니다.", topic: "디자인 역사" },
  { id: 6, question: "포스트모더니즘 디자인의 특징이 아닌 것은?", options: ["역사적 인용", "장식의 부활", "기능주의 철저", "유머와 위트"], correct: 2, explanation: "포스트모더니즘은 모더니즘의 기능주의를 비판하고 장식과 다양성을 수용했습니다.", topic: "디자인 역사" },
  { id: 7, question: "모더니즘 디자인의 핵심 원칙은?", options: ["형태는 기능을 따른다", "장식이 미덕이다", "복잡성 추구", "역사적 양식 차용"], correct: 0, explanation: "'형태는 기능을 따른다(Form follows function)'는 루이스 설리번이 제창한 모더니즘의 핵심 원칙입니다.", topic: "디자인 역사" },
  { id: 8, question: "멤피스 그룹을 이끈 디자이너는?", options: ["디터 람스", "에토레 소트사스", "레이먼드 로위", "찰스 임스"], correct: 1, explanation: "에토레 소트사스는 1981년 이탈리아 멤피스 그룹을 결성하여 포스트모던 디자인을 이끌었습니다.", topic: "디자인 역사" },
  { id: 9, question: "굿 디자인(Good Design) 운동의 발상지는?", options: ["미국", "독일", "이탈리아", "일본"], correct: 1, explanation: "굿 디자인 운동은 전후 독일에서 시작되어 기능적이고 합리적인 디자인을 추구했습니다.", topic: "디자인 역사" },
  { id: 10, question: "스트림라인 디자인이 발전한 시기와 국가는?", options: ["1910년대 영국", "1930년대 미국", "1950년대 일본", "1970년대 이탈리아"], correct: 1, explanation: "스트림라인은 1930년대 미국 대공황기에 유선형 디자인으로 소비를 촉진하려 한 양식입니다.", topic: "디자인 역사" },

  // 조형의 원리 (15문항)
  { id: 11, question: "조형의 기본 요소가 아닌 것은?", options: ["점", "선", "면", "가격"], correct: 3, explanation: "조형의 기본 요소는 점, 선, 면, 형태, 색채, 질감, 공간 등이며 가격은 해당되지 않습니다.", topic: "조형원리" },
  { id: 12, question: "황금비율의 대략적인 수치는?", options: ["1:1.414", "1:1.618", "1:2.000", "1:1.732"], correct: 1, explanation: "황금비(Golden Ratio)는 약 1:1.618로, 가장 아름다운 비례로 여겨집니다.", topic: "조형원리" },
  { id: 13, question: "대칭(Symmetry)의 종류가 아닌 것은?", options: ["좌우대칭", "점대칭", "회전대칭", "불규칙대칭"], correct: 3, explanation: "대칭의 종류에는 좌우대칭, 점대칭, 회전대칭, 방사대칭 등이 있으며 불규칙대칭은 없습니다.", topic: "조형원리" },
  { id: 14, question: "비대칭(Asymmetry)의 효과는?", options: ["안정감", "역동감", "단조로움", "정적임"], correct: 1, explanation: "비대칭은 좌우가 다르면서 균형을 이루어 역동적이고 흥미로운 느낌을 줍니다.", topic: "조형원리" },
  { id: 15, question: "리듬(Rhythm)을 만드는 방법이 아닌 것은?", options: ["반복", "점이", "교대", "고립"], correct: 3, explanation: "리듬은 반복, 점이(그라데이션), 교대(얼터네이션) 등으로 만들며, 고립은 강조에 해당합니다.", topic: "조형원리" },
  { id: 16, question: "점이(Gradation)가 의미하는 것은?", options: ["급격한 변화", "점진적 변화", "무변화", "불규칙 변화"], correct: 1, explanation: "점이는 크기, 색상, 명도 등이 단계적으로 변화하여 운동감과 깊이감을 만드는 것입니다.", topic: "조형원리" },
  { id: 17, question: "강조(Emphasis)의 방법으로 적절하지 않은 것은?", options: ["크기 대비", "색상 대비", "고립 배치", "균일 처리"], correct: 3, explanation: "강조는 대비, 고립, 크기 확대 등으로 하며, 균일 처리는 강조와 반대 개념입니다.", topic: "조형원리" },
  { id: 18, question: "통일(Unity)과 변화(Variety)의 관계는?", options: ["상반됨", "상호보완", "무관함", "동일함"], correct: 1, explanation: "좋은 디자인은 통일성 속에 적절한 변화가 있어야 지루하지 않고 조화롭습니다.", topic: "조형원리" },
  { id: 19, question: "게슈탈트 법칙 중 '근접성의 법칙'이란?", options: ["유사한 것끼리 묶임", "가까운 것끼리 묶임", "닫힌 형태로 인식", "연속으로 인식"], correct: 1, explanation: "근접성의 법칙은 서로 가까이 있는 요소들을 하나의 그룹으로 인식하는 것입니다.", topic: "조형원리" },
  { id: 20, question: "게슈탈트 법칙 중 '폐쇄성의 법칙'이란?", options: ["열린 형태 선호", "불완전한 형태를 완성하려 함", "큰 형태 우선", "색상 우선"], correct: 1, explanation: "폐쇄성의 법칙은 불완전한 형태도 완전한 형태로 인식하려는 경향입니다.", topic: "조형원리" },
  { id: 21, question: "조화(Harmony)를 이루는 방법이 아닌 것은?", options: ["유사 조화", "대비 조화", "무작위 배치", "보색 조화"], correct: 2, explanation: "조화는 유사한 요소의 조화, 대비되는 요소의 조화, 보색 조화 등이 있으며 무작위는 아닙니다.", topic: "조형원리" },
  { id: 22, question: "비례(Proportion)에서 인체 비례의 기준 단위는?", options: ["발", "손", "머리", "팔"], correct: 2, explanation: "인체 비례는 전통적으로 머리 길이를 기준으로 7.5~8등신 등으로 표현합니다.", topic: "조형원리" },
  { id: 23, question: "착시(Optical Illusion) 현상이 아닌 것은?", options: ["뮬러-라이어 착시", "에빙하우스 착시", "폰조 착시", "색채 착시"], correct: 3, explanation: "뮬러-라이어, 에빙하우스, 폰조 등은 형태 착시이고, 색채 착시는 별도 분류입니다.", topic: "조형원리" },
  { id: 24, question: "형태 심리에서 '전경과 배경'의 관계를 설명한 것은?", options: ["근접성", "유사성", "도형-바탕 관계", "연속성"], correct: 2, explanation: "도형-바탕(Figure-Ground) 관계는 대상(전경)과 배경을 구분하여 인식하는 것입니다.", topic: "조형원리" },
  { id: 25, question: "시각적 무게(Visual Weight)에 영향을 주는 요소가 아닌 것은?", options: ["크기", "색상 명도", "위치", "냄새"], correct: 3, explanation: "시각적 무게는 크기, 색상, 명도, 위치, 질감 등 시각적 요소에 영향받으며 냄새는 무관합니다.", topic: "조형원리" },

  // 색채학 기초 (15문항)
  { id: 26, question: "빛의 3원색(가산혼합)은?", options: ["빨강, 노랑, 파랑", "빨강, 초록, 파랑", "시안, 마젠타, 노랑", "빨강, 주황, 노랑"], correct: 1, explanation: "빛의 3원색은 빨강(R), 초록(G), 파랑(B)이며 혼합하면 밝아집니다(가산혼합).", topic: "색채학" },
  { id: 27, question: "색료의 3원색(감산혼합)은?", options: ["빨강, 노랑, 파랑", "빨강, 초록, 파랑", "시안, 마젠타, 노랑", "빨강, 주황, 보라"], correct: 2, explanation: "색료의 3원색은 시안(C), 마젠타(M), 노랑(Y)이며 혼합하면 어두워집니다(감산혼합).", topic: "색채학" },
  { id: 28, question: "색의 3속성에 해당하지 않는 것은?", options: ["색상", "명도", "채도", "온도"], correct: 3, explanation: "색의 3속성은 색상(Hue), 명도(Value), 채도(Chroma/Saturation)입니다.", topic: "색채학" },
  { id: 29, question: "명도(Value)가 의미하는 것은?", options: ["색의 맑고 탁함", "색의 밝고 어두움", "색의 종류", "색의 면적"], correct: 1, explanation: "명도는 색의 밝고 어두운 정도로, 흰색에 가까울수록 고명도입니다.", topic: "색채학" },
  { id: 30, question: "채도(Saturation)가 높은 색의 특징은?", options: ["탁한 색", "선명한 색", "어두운 색", "밝은 색"], correct: 1, explanation: "채도가 높으면 색이 맑고 선명하며, 낮으면 탁하고 무채색에 가깝습니다.", topic: "색채학" },
  { id: 31, question: "보색 관계에 있는 색은?", options: ["빨강-주황", "파랑-초록", "빨강-초록", "노랑-주황"], correct: 2, explanation: "보색은 색상환에서 정반대에 위치한 색으로, 빨강-초록, 파랑-주황, 노랑-보라가 보색입니다.", topic: "색채학" },
  { id: 32, question: "난색(Warm Color)에 해당하는 것은?", options: ["파랑", "초록", "주황", "보라"], correct: 2, explanation: "난색은 따뜻한 느낌의 색으로 빨강, 주황, 노랑 계열이 해당합니다.", topic: "색채학" },
  { id: 33, question: "한색(Cool Color)에 해당하는 것은?", options: ["빨강", "노랑", "파랑", "주황"], correct: 2, explanation: "한색은 차가운 느낌의 색으로 파랑, 청록, 보라 계열이 해당합니다.", topic: "색채학" },
  { id: 34, question: "유사색 배색의 특징은?", options: ["강한 대비", "부드러운 조화", "긴장감", "충돌감"], correct: 1, explanation: "유사색 배색은 색상환에서 인접한 색을 사용하여 부드럽고 조화로운 느낌을 줍니다.", topic: "색채학" },
  { id: 35, question: "먼셀 색체계의 표기 순서는?", options: ["명도/색상/채도", "색상 명도/채도", "채도/색상/명도", "색상/채도/명도"], correct: 1, explanation: "먼셀 표기법은 H V/C (색상 명도/채도) 순으로 예: 5R 4/14.", topic: "색채학" },
  { id: 36, question: "색의 진출과 후퇴에서 진출색은?", options: ["한색", "고명도 난색", "저채도색", "무채색"], correct: 1, explanation: "진출색은 가깝게 느껴지는 색으로 난색, 고명도, 고채도 색이 해당합니다.", topic: "색채학" },
  { id: 37, question: "색의 팽창과 수축에서 수축색은?", options: ["흰색", "노랑", "검정", "주황"], correct: 2, explanation: "수축색은 작아 보이는 색으로 어두운 색, 한색이 해당합니다.", topic: "색채학" },
  { id: 38, question: "색채 대비 중 '명도대비'란?", options: ["색상 차이에 의한 대비", "밝기 차이에 의한 대비", "채도 차이에 의한 대비", "면적 차이에 의한 대비"], correct: 1, explanation: "명도대비는 밝은 색과 어두운 색이 만났을 때 더 밝고 어둡게 보이는 현상입니다.", topic: "색채학" },
  { id: 39, question: "연속대비(Successive Contrast)란?", options: ["동시에 본 색의 대비", "시간차를 두고 본 색의 대비", "같은 색의 대비", "무채색의 대비"], correct: 1, explanation: "연속대비는 한 색을 본 후 다른 색을 볼 때 잔상에 의해 영향받는 현상입니다.", topic: "색채학" },
  { id: 40, question: "색의 심리적 효과 중 '파랑'이 주는 느낌은?", options: ["흥분, 열정", "차분함, 신뢰", "자연, 성장", "고급, 우아"], correct: 1, explanation: "파랑은 차분함, 신뢰, 안정감, 전문성 등의 심리적 효과를 줍니다.", topic: "색채학" },

  // 디자인 프로세스 (10문항)
  { id: 41, question: "디자인 씽킹의 첫 번째 단계는?", options: ["정의", "공감", "아이디어", "프로토타입"], correct: 1, explanation: "디자인 씽킹은 공감(Empathize) - 정의 - 아이디어 - 프로토타입 - 테스트 순서입니다.", topic: "디자인 프로세스" },
  { id: 42, question: "더블 다이아몬드 프로세스의 4단계는?", options: ["발견-정의-개발-전달", "정의-발견-전달-개발", "개발-전달-발견-정의", "전달-개발-정의-발견"], correct: 0, explanation: "더블 다이아몬드는 Discover(발견) - Define(정의) - Develop(개발) - Deliver(전달)입니다.", topic: "디자인 프로세스" },
  { id: 43, question: "브레인스토밍의 원칙이 아닌 것은?", options: ["비판 금지", "자유분방", "즉각 평가", "다량 발상"], correct: 2, explanation: "브레인스토밍에서는 아이디어 발상 시 비판과 평가를 유보합니다.", topic: "디자인 프로세스" },
  { id: 44, question: "페르소나(Persona)의 목적은?", options: ["제품 가격 결정", "타겟 사용자 이해", "제조 공정 설계", "마케팅 예산 수립"], correct: 1, explanation: "페르소나는 가상의 사용자 모델로, 타겟 사용자를 구체적으로 이해하기 위해 만듭니다.", topic: "디자인 프로세스" },
  { id: 45, question: "무드보드(Mood Board)의 용도는?", options: ["회계 보고", "디자인 컨셉 시각화", "제조 공정표", "판매 현황"], correct: 1, explanation: "무드보드는 이미지, 색상, 재질 등을 모아 디자인 컨셉과 방향을 시각화합니다.", topic: "디자인 프로세스" },
  { id: 46, question: "프로토타입(Prototype)의 목적은?", options: ["최종 제품 판매", "아이디어 검증", "대량 생산", "광고 제작"], correct: 1, explanation: "프로토타입은 디자인 아이디어를 빠르게 구현하여 검증하고 피드백받기 위한 것입니다.", topic: "디자인 프로세스" },
  { id: 47, question: "사용성 테스트의 목적은?", options: ["제품 가격 책정", "사용자 경험 문제 발견", "제조 비용 산출", "재료 선정"], correct: 1, explanation: "사용성 테스트는 실제 사용자가 제품을 사용하면서 겪는 문제점을 발견하기 위한 것입니다.", topic: "디자인 프로세스" },
  { id: 48, question: "린(Lean) UX의 특징은?", options: ["완벽한 문서화", "빠른 반복과 검증", "장기 계획", "대규모 리서치"], correct: 1, explanation: "린 UX는 가설을 빠르게 실험하고 피드백을 통해 반복 개선하는 것을 강조합니다.", topic: "디자인 프로세스" },
  { id: 49, question: "마인드맵(Mind Map)의 활용 목적은?", options: ["재무 분석", "아이디어 발산과 정리", "생산 계획", "재고 관리"], correct: 1, explanation: "마인드맵은 중심 주제에서 연관된 아이디어를 방사형으로 전개하여 사고를 정리합니다.", topic: "디자인 프로세스" },
  { id: 50, question: "스케치의 역할로 적절하지 않은 것은?", options: ["아이디어 표현", "커뮤니케이션", "최종 제품 생산", "빠른 탐색"], correct: 2, explanation: "스케치는 아이디어를 빠르게 표현하고 소통하는 도구이며, 최종 제품 생산 단계가 아닙니다.", topic: "디자인 프로세스" }
];

export default function DesignBasicsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('pdt-design-basics-progress');
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

    localStorage.setItem('pdt-design-basics-progress', JSON.stringify({
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
    localStorage.removeItem('pdt-design-basics-progress');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getAISearchUrl = (question: string, topic: string, aiType: string) => {
    const searchQuery = encodeURIComponent(`${topic} ${question} 제품디자인산업기사`);
    switch(aiType) {
      case 'claude': return `https://claude.ai/new?q=${searchQuery}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${searchQuery}`;
      case 'gemini': return `https://gemini.google.com/?q=${searchQuery}`;
      default: return '#';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-teal-600 mb-2">{score}/{questions.length}</div>
              <div className="text-xl text-gray-600">정답률: {percentage}%</div>
            </div>
            <div className="mb-8">
              {percentage >= 80 ? (
                <p className="text-green-600 font-semibold">훌륭합니다! 디자인 일반을 잘 이해하고 계시네요!</p>
              ) : percentage >= 60 ? (
                <p className="text-yellow-600 font-semibold">좋아요! 조금 더 학습하면 완벽해질 거예요!</p>
              ) : (
                <p className="text-red-600 font-semibold">더 많은 학습이 필요해요. 다시 도전해보세요!</p>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={resetQuiz} className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">다시 시작</button>
              <Link href="/category/design/product-design-technician" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">돌아가기</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/category/design/product-design-technician" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제품디자인산업기사 홈으로
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">디자인 일반</h1>
            <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">{currentQuestion + 1} / {questions.length}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm mb-4">{question.topic}</span>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">{question.question}</h2>
          </div>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 ${
                  selectedAnswer === null ? 'border-gray-200 hover:border-teal-400 hover:bg-teal-50'
                    : selectedAnswer === index ? index === question.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800'
                    : index === question.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}>
                <div className="flex items-center">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-semibold ${
                    selectedAnswer === null ? 'bg-gray-200 text-gray-700'
                      : selectedAnswer === index ? index === question.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      : index === question.correct ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>{index + 1}</span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl mb-6 ${selectedAnswer === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedAnswer === question.correct ? 'bg-green-500' : 'bg-red-500'}`}>
                  {selectedAnswer === question.correct ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
                  <a href={getAISearchUrl(question.question, question.topic, 'claude')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors">Claude</a>
                  <a href={getAISearchUrl(question.question, question.topic, 'chatgpt')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">ChatGPT</a>
                  <a href={getAISearchUrl(question.question, question.topic, 'gemini')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">Gemini</a>
                </div>
              </div>
            </div>
          )}

          {selectedAnswer !== null && (
            <button onClick={nextQuestion} className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              {currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-10 gap-2">
          {questions.map((_, idx) => (
            <button key={idx} onClick={() => { setCurrentQuestion(idx); setSelectedAnswer(null); setShowExplanation(false); }}
              className={`w-full aspect-square rounded-lg font-medium text-sm transition-all duration-200 ${
                idx === currentQuestion ? 'bg-teal-600 text-white' : answeredQuestions.has(idx) ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}>{idx + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
