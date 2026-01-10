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
  // 디자인 역사 및 사조 (10문항)
  { id: 1, question: "19세기 말 영국에서 윌리엄 모리스가 주도한 수공예 운동은?", options: ["아르누보", "미술공예운동", "바우하우스", "데스틸"], correct: 1, explanation: "미술공예운동(Arts and Crafts Movement)은 산업혁명으로 인한 기계생산에 반대하여 수공예의 가치를 되살리려 한 운동입니다.", topic: "디자인 역사" },
  { id: 2, question: "1919년 독일 바이마르에서 발터 그로피우스가 설립한 디자인 학교는?", options: ["울름조형대학", "바우하우스", "비엔나공방", "시카고학교"], correct: 1, explanation: "바우하우스(Bauhaus)는 예술과 기술의 통합을 추구한 세계 최초의 디자인 종합학교입니다.", topic: "디자인 역사" },
  { id: 3, question: "아르누보(Art Nouveau) 양식의 특징으로 가장 적절한 것은?", options: ["기하학적 형태", "유기적 곡선과 자연형태", "미니멀리즘", "고전적 장식"], correct: 1, explanation: "아르누보는 식물의 덩굴이나 꽃 등 자연에서 영감을 받은 유기적이고 유연한 곡선이 특징입니다.", topic: "디자인 역사" },
  { id: 4, question: "포스트모더니즘 디자인의 특징으로 적절하지 않은 것은?", options: ["역사적 양식의 인용", "장식의 복귀", "기능주의 철저한 추구", "다원주의"], correct: 2, explanation: "포스트모더니즘은 모더니즘의 기능주의를 비판하고 장식과 역사적 양식을 다시 수용했습니다.", topic: "디자인 역사" },
  { id: 5, question: "이탈리아의 안티 디자인(Anti-Design) 운동을 대표하는 그룹은?", options: ["데스틸", "멤피스", "IDEO", "프로그디자인"], correct: 1, explanation: "멤피스(Memphis) 그룹은 에토레 소트사스가 이끈 이탈리아 급진적 디자인 운동입니다.", topic: "디자인 역사" },
  { id: 6, question: "데스틸(De Stijl) 운동의 조형적 특징은?", options: ["유기적 곡선", "수직수평선과 삼원색", "자연물 모방", "복잡한 장식"], correct: 1, explanation: "데스틸은 몬드리안의 회화처럼 수직과 수평선, 빨강·파랑·노랑의 삼원색만을 사용하는 추상 조형을 추구했습니다.", topic: "디자인 역사" },
  { id: 7, question: "스트림라인(Streamline) 디자인이 주로 발전한 시기와 국가는?", options: ["1920년대 독일", "1930년대 미국", "1950년대 일본", "1970년대 이탈리아"], correct: 1, explanation: "스트림라인 디자인은 1930년대 미국 대공황 시기에 유선형 형태로 소비자의 관심을 끌기 위해 발전했습니다.", topic: "디자인 역사" },
  { id: 8, question: "굿 디자인(Good Design) 운동을 주도한 국가는?", options: ["프랑스", "독일", "일본", "미국"], correct: 1, explanation: "독일은 전후 기능적이고 합리적인 '굿 디자인' 운동을 통해 산업디자인의 표준을 제시했습니다.", topic: "디자인 역사" },
  { id: 9, question: "레이먼드 로위가 발전시킨 디자인 개념은?", options: ["유니버설 디자인", "MAYA 원칙", "인클루시브 디자인", "서스테이너블 디자인"], correct: 1, explanation: "MAYA(Most Advanced Yet Acceptable) 원칙은 혁신적이면서도 소비자가 수용 가능한 수준의 디자인을 의미합니다.", topic: "디자인 역사" },
  { id: 10, question: "디터 람스가 제안한 '좋은 디자인의 10가지 원칙'에 해당하지 않는 것은?", options: ["혁신적이다", "환경친화적이다", "장식적이다", "오래 지속된다"], correct: 2, explanation: "디터 람스의 원칙 중 '좋은 디자인은 가능한 적게 디자인한다'는 장식을 최소화하는 것을 의미합니다.", topic: "디자인 역사" },

  // 디자인 프로세스 (10문항)
  { id: 11, question: "더블 다이아몬드 디자인 프로세스의 4단계 순서는?", options: ["정의-발견-개발-전달", "발견-정의-개발-전달", "개발-발견-정의-전달", "전달-개발-정의-발견"], correct: 1, explanation: "더블 다이아몬드는 Discover(발견) - Define(정의) - Develop(개발) - Deliver(전달)의 4단계로 구성됩니다.", topic: "디자인 프로세스" },
  { id: 12, question: "디자인 씽킹(Design Thinking)의 5단계 중 첫 번째 단계는?", options: ["Ideate", "Empathize", "Define", "Prototype"], correct: 1, explanation: "디자인 씽킹은 공감(Empathize) - 정의(Define) - 아이디어(Ideate) - 프로토타입(Prototype) - 테스트(Test) 순서입니다.", topic: "디자인 프로세스" },
  { id: 13, question: "브레인스토밍의 4대 원칙에 해당하지 않는 것은?", options: ["비판 금지", "자유분방", "다량 발상", "즉각적 평가"], correct: 3, explanation: "브레인스토밍에서는 아이디어 발상 단계에서 평가를 유보하고, 비판 금지, 자유분방, 다량 발상, 결합 개선을 원칙으로 합니다.", topic: "디자인 프로세스" },
  { id: 14, question: "페르소나(Persona)를 만드는 주된 목적은?", options: ["제품 가격 결정", "타겟 사용자 이해", "생산 공정 설계", "마케팅 예산 산정"], correct: 1, explanation: "페르소나는 실제 사용자 데이터를 기반으로 만든 가상의 사용자 모델로, 타겟 사용자를 깊이 이해하기 위해 만듭니다.", topic: "디자인 프로세스" },
  { id: 15, question: "고객 여정 맵(Customer Journey Map)에서 주로 파악하는 것은?", options: ["제조 원가", "사용자 경험 접점", "판매 채널", "재고 현황"], correct: 1, explanation: "고객 여정 맵은 사용자가 제품/서비스와 상호작용하는 모든 접점에서의 경험을 시각화합니다.", topic: "디자인 프로세스" },
  { id: 16, question: "린(Lean) UX에서 강조하는 것은?", options: ["완벽한 문서화", "빠른 반복과 검증", "장기 계획 수립", "대규모 리서치"], correct: 1, explanation: "린 UX는 빠른 프로토타이핑, 실험, 피드백을 통해 가설을 빠르게 검증하고 반복하는 것을 강조합니다.", topic: "디자인 프로세스" },
  { id: 17, question: "MVP(Minimum Viable Product)의 의미는?", options: ["최대 이익 제품", "최소 기능 제품", "중간 가격 제품", "최신 버전 제품"], correct: 1, explanation: "MVP는 핵심 기능만 갖춘 최소 기능 제품으로, 빠르게 시장에 출시하여 사용자 피드백을 받기 위한 것입니다.", topic: "디자인 프로세스" },
  { id: 18, question: "사용성 테스트에서 '생각을 소리내어 말하기' 기법의 영어 명칭은?", options: ["Eye Tracking", "Think Aloud", "Card Sorting", "A/B Testing"], correct: 1, explanation: "Think Aloud(생각 말하기) 기법은 사용자가 과제를 수행하면서 생각을 말로 표현하게 하여 인사이트를 얻는 방법입니다.", topic: "디자인 프로세스" },
  { id: 19, question: "애자일(Agile) 방법론에서 짧은 개발 주기를 무엇이라 하는가?", options: ["마일스톤", "스프린트", "릴리즈", "데드라인"], correct: 1, explanation: "스프린트(Sprint)는 보통 1-4주 단위의 짧은 개발 주기로, 그 기간 내에 특정 기능을 완성합니다.", topic: "디자인 프로세스" },
  { id: 20, question: "형태 분석법(Morphological Analysis)의 목적은?", options: ["색채 결정", "체계적 아이디어 발상", "원가 계산", "구조 분석"], correct: 1, explanation: "형태 분석법은 제품의 요소를 분해하고 각 요소의 변형을 조합하여 체계적으로 새로운 아이디어를 발상하는 기법입니다.", topic: "디자인 프로세스" },

  // 조형 원리와 미학 (10문항)
  { id: 21, question: "게슈탈트(Gestalt) 법칙 중 '유사성의 법칙'이 의미하는 것은?", options: ["가까운 요소끼리 묶임", "비슷한 요소끼리 묶임", "연속된 요소끼리 묶임", "닫힌 형태로 인식"], correct: 1, explanation: "유사성의 법칙은 형태, 크기, 색상 등이 유사한 요소들을 하나의 그룹으로 인식하는 것입니다.", topic: "조형 원리" },
  { id: 22, question: "황금비율의 대략적인 수치는?", options: ["1:1.414", "1:1.618", "1:2.000", "1:1.732"], correct: 1, explanation: "황금비(Golden Ratio)는 약 1:1.618로, 자연과 예술에서 가장 조화로운 비례로 여겨집니다.", topic: "조형 원리" },
  { id: 23, question: "시각적 계층(Visual Hierarchy)을 만드는 요소가 아닌 것은?", options: ["크기 대비", "색상 대비", "소재 가격", "위치"], correct: 2, explanation: "시각적 계층은 크기, 색상, 위치, 대비, 여백 등 시각적 요소로 만들며, 소재 가격은 시각적 요소가 아닙니다.", topic: "조형 원리" },
  { id: 24, question: "대칭(Symmetry)의 반대 개념으로 역동적 느낌을 주는 것은?", options: ["균형", "비대칭", "반복", "조화"], correct: 1, explanation: "비대칭(Asymmetry)은 좌우가 다르면서도 균형을 이루어 역동적이고 흥미로운 느낌을 줍니다.", topic: "조형 원리" },
  { id: 25, question: "리듬(Rhythm)을 만드는 방법이 아닌 것은?", options: ["반복", "점이", "교대", "고립"], correct: 3, explanation: "리듬은 반복, 점이(점진적 변화), 교대(번갈아 나타남) 등으로 만들며, 고립은 리듬과 반대되는 개념입니다.", topic: "조형 원리" },
  { id: 26, question: "형태 심리학에서 '폐쇄성의 법칙'이란?", options: ["열린 형태를 닫힌 것으로 인식", "복잡한 형태 선호", "큰 형태 우선 인식", "색상 우선 인식"], correct: 0, explanation: "폐쇄성의 법칙(Law of Closure)은 불완전한 형태도 완성된 형태로 인식하려는 경향입니다.", topic: "조형 원리" },
  { id: 27, question: "조형에서 '점이(Gradation)'가 의미하는 것은?", options: ["급격한 변화", "점진적 변화", "불규칙 변화", "무변화"], correct: 1, explanation: "점이는 크기, 색상, 형태 등이 점진적으로 변화하여 운동감과 깊이감을 만드는 것입니다.", topic: "조형 원리" },
  { id: 28, question: "강조(Emphasis)의 방법으로 적절하지 않은 것은?", options: ["대비 사용", "고립 배치", "균일한 처리", "크기 확대"], correct: 2, explanation: "강조는 대비, 고립, 크기 확대 등으로 특정 요소를 두드러지게 하며, 균일한 처리는 강조와 반대입니다.", topic: "조형 원리" },
  { id: 29, question: "네거티브 스페이스(Negative Space)의 역할은?", options: ["주제 강조와 시각적 휴식", "제조 비용 절감", "구조적 강도 증가", "색상 다양화"], correct: 0, explanation: "네거티브 스페이스(여백)는 주제를 강조하고 시각적 휴식을 제공하며 전체 구성의 균형을 잡습니다.", topic: "조형 원리" },
  { id: 30, question: "테셀레이션(Tessellation)이란?", options: ["색채 배합", "평면을 빈틈없이 채우는 패턴", "입체 조형", "점진적 변화"], correct: 1, explanation: "테셀레이션은 동일하거나 여러 형태를 사용해 평면을 빈틈이나 겹침 없이 채우는 패턴입니다.", topic: "조형 원리" },

  // 디자인 방법론 (10문항)
  { id: 31, question: "인간중심 디자인(HCD)의 핵심 원칙은?", options: ["기술 중심", "사용자 요구 중심", "비용 중심", "생산 중심"], correct: 1, explanation: "인간중심 디자인(Human-Centered Design)은 사용자의 요구, 행동, 환경을 깊이 이해하고 이를 디자인에 반영합니다.", topic: "디자인 방법론" },
  { id: 32, question: "유니버설 디자인의 7대 원칙 중 '공평한 사용'이 의미하는 것은?", options: ["저렴한 가격", "모든 사람이 동등하게 사용", "전문가 전용", "단일 용도"], correct: 1, explanation: "공평한 사용은 다양한 능력을 가진 모든 사용자가 동등하게 제품을 사용할 수 있어야 함을 의미합니다.", topic: "디자인 방법론" },
  { id: 33, question: "지속가능한 디자인(Sustainable Design)에서 3R 원칙은?", options: ["Reduce, Reuse, Recycle", "Read, React, Respond", "Research, Review, Revise", "Risk, Return, Rate"], correct: 0, explanation: "3R은 Reduce(줄이기), Reuse(재사용), Recycle(재활용)으로 환경 영향을 최소화하는 원칙입니다.", topic: "디자인 방법론" },
  { id: 34, question: "감성 디자인에서 도널드 노먼이 제시한 3가지 수준에 해당하지 않는 것은?", options: ["본능적 수준", "행동적 수준", "반성적 수준", "경제적 수준"], correct: 3, explanation: "노먼의 감성 디자인 3수준은 본능적(Visceral), 행동적(Behavioral), 반성적(Reflective) 수준입니다.", topic: "디자인 방법론" },
  { id: 35, question: "어포던스(Affordance)의 개념을 디자인에 적용한 학자는?", options: ["도널드 노먼", "레이먼드 로위", "디터 람스", "필립 스탁"], correct: 0, explanation: "도널드 노먼은 제임스 깁슨의 어포던스 개념을 인터페이스 디자인에 적용하여 지각된 어포던스 개념을 발전시켰습니다.", topic: "디자인 방법론" },
  { id: 36, question: "QFD(Quality Function Deployment)에서 사용하는 도구는?", options: ["간트 차트", "품질의 집", "마인드맵", "SWOT 매트릭스"], correct: 1, explanation: "품질의 집(House of Quality)은 고객 요구사항을 기술적 특성으로 변환하는 QFD의 핵심 도구입니다.", topic: "디자인 방법론" },
  { id: 37, question: "벤치마킹(Benchmarking)의 주된 목적은?", options: ["특허 침해", "경쟁 제품 분석과 개선점 도출", "가격 담합", "생산량 조절"], correct: 1, explanation: "벤치마킹은 우수한 경쟁 제품이나 사례를 분석하여 자사 제품의 개선점을 도출하는 것입니다.", topic: "디자인 방법론" },
  { id: 38, question: "TRIZ에서 '모순 해결'이 의미하는 것은?", options: ["타협점 찾기", "상충되는 요구 동시 만족", "하나 포기", "문제 회피"], correct: 1, explanation: "TRIZ(창의적 문제해결 이론)는 타협이 아닌 상충되는 요구사항을 모두 만족시키는 해결책을 찾습니다.", topic: "디자인 방법론" },
  { id: 39, question: "바이오미미크리(Biomimicry) 디자인이란?", options: ["동물 모양 디자인", "자연의 원리를 모방한 디자인", "유기농 재료 사용", "친환경 포장"], correct: 1, explanation: "바이오미미크리는 자연의 형태, 프로세스, 시스템을 모방하여 디자인 문제를 해결하는 접근법입니다.", topic: "디자인 방법론" },
  { id: 40, question: "서비스 디자인에서 블루프린트(Blueprint)의 역할은?", options: ["건축 설계", "서비스 프로세스 시각화", "재무 계획", "마케팅 전략"], correct: 1, explanation: "서비스 블루프린트는 서비스의 전체 프로세스와 사용자-제공자 상호작용을 시각화한 다이어그램입니다.", topic: "디자인 방법론" },

  // 디자인 마케팅 (10문항)
  { id: 41, question: "디자인 마케팅에서 STP 전략의 순서는?", options: ["Segmentation-Targeting-Positioning", "Strategy-Target-Plan", "Sales-Trend-Price", "Supply-Trade-Profit"], correct: 0, explanation: "STP는 시장세분화(Segmentation), 목표시장선정(Targeting), 포지셔닝(Positioning)의 전략입니다.", topic: "디자인 마케팅" },
  { id: 42, question: "브랜드 아이덴티티(Brand Identity)의 구성요소가 아닌 것은?", options: ["로고", "컬러", "타이포그래피", "재고량"], correct: 3, explanation: "브랜드 아이덴티티는 로고, 컬러, 타이포그래피, 패턴 등 시각적 요소로 구성되며 재고량은 해당되지 않습니다.", topic: "디자인 마케팅" },
  { id: 43, question: "4P 마케팅 믹스에 해당하지 않는 것은?", options: ["Product", "Price", "Promotion", "Perception"], correct: 3, explanation: "4P는 Product(제품), Price(가격), Place(유통), Promotion(촉진)이며, Perception은 포함되지 않습니다.", topic: "디자인 마케팅" },
  { id: 44, question: "제품 수명주기(PLC)의 단계 순서는?", options: ["성장-도입-성숙-쇠퇴", "도입-성장-성숙-쇠퇴", "성숙-성장-도입-쇠퇴", "쇠퇴-성숙-성장-도입"], correct: 1, explanation: "제품 수명주기는 도입기-성장기-성숙기-쇠퇴기의 순서로 진행됩니다.", topic: "디자인 마케팅" },
  { id: 45, question: "포지셔닝 맵(Positioning Map)의 주된 용도는?", options: ["생산 공정 관리", "경쟁 제품 대비 위치 파악", "인사 관리", "회계 처리"], correct: 1, explanation: "포지셔닝 맵은 두 개의 축을 기준으로 자사 제품과 경쟁 제품의 상대적 위치를 시각화합니다.", topic: "디자인 마케팅" },
  { id: 46, question: "USP(Unique Selling Proposition)의 의미는?", options: ["표준 판매 절차", "고유한 판매 제안", "통합 판매 계획", "범용 서비스 패키지"], correct: 1, explanation: "USP는 경쟁 제품과 차별화되는 제품의 고유한 강점이나 특성을 의미합니다.", topic: "디자인 마케팅" },
  { id: 47, question: "디자인 트렌드 분석에서 STEEP 분석이 포함하지 않는 것은?", options: ["Social", "Technology", "Quality", "Political"], correct: 2, explanation: "STEEP는 Social, Technology, Economic, Environmental, Political 요인 분석이며, Quality는 포함되지 않습니다.", topic: "디자인 마케팅" },
  { id: 48, question: "가치 제안(Value Proposition)이란?", options: ["원가 절감", "고객에게 제공하는 핵심 가치", "주식 가치", "부동산 가치"], correct: 1, explanation: "가치 제안은 제품이나 서비스가 고객에게 제공하는 핵심 혜택과 차별화된 가치입니다.", topic: "디자인 마케팅" },
  { id: 49, question: "라이프스타일 분석의 주요 요소인 AIO는?", options: ["Activity-Interest-Opinion", "Age-Income-Occupation", "Attitude-Image-Outlook", "Analysis-Insight-Output"], correct: 0, explanation: "AIO는 Activities(활동), Interests(관심사), Opinions(의견)으로 소비자 라이프스타일을 분석합니다.", topic: "디자인 마케팅" },
  { id: 50, question: "디자인 경영에서 CDO의 역할은?", options: ["재무 관리", "디자인 전략 총괄", "생산 관리", "영업 관리"], correct: 1, explanation: "CDO(Chief Design Officer)는 기업의 디자인 전략을 총괄하고 디자인을 경영 전략에 통합하는 역할을 합니다.", topic: "디자인 마케팅" }
];

export default function ProductDesignTheoryPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('product-design-theory-progress');
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

    localStorage.setItem('product-design-theory-progress', JSON.stringify({
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
    localStorage.removeItem('product-design-theory-progress');
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
                <p className="text-green-600 font-semibold">훌륭합니다! 제품디자인론을 잘 이해하고 계시네요!</p>
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
            <h1 className="text-2xl font-bold text-gray-800">제품디자인론</h1>
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
