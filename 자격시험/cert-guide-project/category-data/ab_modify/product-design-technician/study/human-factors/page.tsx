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
  // 인체측정학 (12문항)
  { id: 1, question: "인체측정학(Anthropometry)의 정의는?", options: ["인체의 화학 분석", "인체 각 부위 치수 측정", "인체의 심리 분석", "인체의 운동 분석"], correct: 1, explanation: "인체측정학은 인체 각 부위의 치수를 측정하고 분석하는 학문입니다.", topic: "인체측정학" },
  { id: 2, question: "정적 인체측정과 동적 인체측정의 차이는?", options: ["측정 도구 차이", "자세 변화 여부", "측정 대상 차이", "측정 시간 차이"], correct: 1, explanation: "정적 측정은 정지 상태, 동적 측정은 동작 중의 치수와 범위를 측정합니다.", topic: "인체측정학" },
  { id: 3, question: "백분위수(Percentile)에서 5번째 백분위는?", options: ["95%가 이 값보다 큼", "5%가 이 값보다 큼", "5%가 이 값보다 작음", "50%가 이 값보다 작음"], correct: 0, explanation: "5번째 백분위는 전체의 5%가 이 값보다 작고 95%가 이 값보다 큽니다.", topic: "인체측정학" },
  { id: 4, question: "출입구 높이 설계 시 적용해야 할 백분위는?", options: ["5번째", "50번째", "95번째", "평균값"], correct: 2, explanation: "출입구는 큰 사람도 통과해야 하므로 95번째 백분위 이상을 적용합니다.", topic: "인체측정학" },
  { id: 5, question: "손이 닿아야 하는 버튼 위치 설계 시 적용할 백분위는?", options: ["5번째", "50번째", "95번째", "100번째"], correct: 0, explanation: "도달 거리는 작은 사람도 닿아야 하므로 5번째 백분위를 적용합니다.", topic: "인체측정학" },
  { id: 6, question: "한국인 인체치수조사사업의 명칭은?", options: ["Body Korea", "Size Korea", "Human Korea", "Measure Korea"], correct: 1, explanation: "Size Korea는 산업통상자원부 기술표준원에서 주관하는 국가 인체치수 조사 사업입니다.", topic: "인체측정학" },
  { id: 7, question: "인체치수 중 '키'를 측정할 때의 자세는?", options: ["앉은 자세", "누운 자세", "직립 자세", "구부린 자세"], correct: 2, explanation: "키(신장)는 직립 자세에서 발바닥부터 머리 꼭대기까지 수직 거리를 측정합니다.", topic: "인체측정학" },
  { id: 8, question: "앉은키의 측정 범위는?", options: ["바닥~머리", "의자면~머리", "의자면~어깨", "바닥~어깨"], correct: 1, explanation: "앉은키는 의자에 앉은 상태에서 의자 면부터 머리 꼭대기까지의 높이입니다.", topic: "인체측정학" },
  { id: 9, question: "팔 길이 측정의 기준점은?", options: ["손목~손끝", "어깨~손끝", "어깨~손목", "팔꿈치~손끝"], correct: 1, explanation: "팔 길이는 어깨점(견봉점)에서 손끝(중지끝점)까지의 거리입니다.", topic: "인체측정학" },
  { id: 10, question: "인체측정 데이터 수집 방법이 아닌 것은?", options: ["직접 측정", "사진 측정", "3D 스캐닝", "설문조사"], correct: 3, explanation: "인체측정은 직접 측정, 사진 측정, 3D 스캐닝 등의 객관적 방법을 사용합니다.", topic: "인체측정학" },
  { id: 11, question: "기능적 치수(Functional Dimension)란?", options: ["정지 상태 치수", "동작 범위 포함 치수", "평균 치수", "최소 치수"], correct: 1, explanation: "기능적 치수는 실제 동작이나 작업 시 필요한 공간을 포함한 치수입니다.", topic: "인체측정학" },
  { id: 12, question: "여유공간(Clearance)이 필요한 이유는?", options: ["미관", "동작과 의복 고려", "비용 절감", "생산 편의"], correct: 1, explanation: "여유공간은 인체 동작, 의복 두께, 안전 여유 등을 고려하여 추가합니다.", topic: "인체측정학" },

  // 작업환경 설계 (13문항)
  { id: 13, question: "작업대 높이가 너무 높을 때 발생하는 문제는?", options: ["허리 통증", "어깨 피로", "손목 통증", "무릎 통증"], correct: 1, explanation: "작업대가 너무 높으면 어깨를 들어올려야 하므로 어깨 근육 피로가 발생합니다.", topic: "작업환경" },
  { id: 14, question: "작업대 높이가 너무 낮을 때 발생하는 문제는?", options: ["어깨 피로", "허리 구부림", "손목 통증", "목 통증"], correct: 1, explanation: "작업대가 너무 낮으면 허리를 구부려야 하므로 요통이 발생합니다.", topic: "작업환경" },
  { id: 15, question: "정밀작업을 위한 적정 조도(lux)는?", options: ["100~200", "300~500", "750~1500", "2000 이상"], correct: 2, explanation: "정밀작업은 750~1500lux 정도의 높은 조도가 필요합니다.", topic: "작업환경" },
  { id: 16, question: "일반 사무작업의 적정 조도는?", options: ["100~200lux", "300~500lux", "750~1500lux", "2000lux 이상"], correct: 1, explanation: "일반 사무작업은 300~500lux 정도의 조도가 적당합니다.", topic: "작업환경" },
  { id: 17, question: "소음이 작업에 미치는 영향이 아닌 것은?", options: ["집중력 저하", "스트레스 증가", "청력 손상", "체중 증가"], correct: 3, explanation: "소음은 집중력 저하, 스트레스, 청력 손상 등을 유발하지만 체중과는 무관합니다.", topic: "작업환경" },
  { id: 18, question: "VDT 작업 시 모니터와 눈의 적정 거리는?", options: ["20~30cm", "40~70cm", "80~100cm", "100cm 이상"], correct: 1, explanation: "VDT 작업 시 모니터와 눈 사이는 40~70cm가 적당합니다.", topic: "작업환경" },
  { id: 19, question: "VDT 작업 시 화면 위치는 눈높이 대비?", options: ["위에", "같거나 약간 아래", "많이 아래", "옆에"], correct: 1, explanation: "모니터 상단이 눈높이와 같거나 약간 아래에 있어야 목 부담이 적습니다.", topic: "작업환경" },
  { id: 20, question: "좌식 작업 시 의자 높이의 기준은?", options: ["발이 바닥에 닿지 않음", "무릎이 90도", "허리가 구부러짐", "발끝만 닿음"], correct: 1, explanation: "의자 높이는 발바닥이 바닥에 닿고 무릎이 90도가 되도록 조절합니다.", topic: "작업환경" },
  { id: 21, question: "요추 지지대(Lumbar Support)의 역할은?", options: ["목 지지", "허리 곡선 유지", "팔 받침", "머리 받침"], correct: 1, explanation: "요추 지지대는 허리의 자연스러운 S자 곡선을 유지시켜 요통을 예방합니다.", topic: "작업환경" },
  { id: 22, question: "작업영역 중 '최적작업영역'이란?", options: ["팔을 뻗어 닿는 범위", "손목만 움직이는 범위", "팔꿈치만 움직이는 범위", "몸을 돌려야 닿는 범위"], correct: 2, explanation: "최적작업영역은 상완을 몸에 붙이고 전완만 움직여 닿는 범위입니다.", topic: "작업환경" },
  { id: 23, question: "휴식이 필요한 이유가 아닌 것은?", options: ["피로 회복", "집중력 유지", "근육 이완", "비용 절감"], correct: 3, explanation: "휴식은 피로 회복, 집중력 유지, 근육 이완 등을 위해 필요합니다.", topic: "작업환경" },
  { id: 24, question: "반복작업에서 휴식의 원칙은?", options: ["긴 휴식 1회", "짧은 휴식 여러 번", "휴식 불필요", "작업 후만 휴식"], correct: 1, explanation: "반복작업에서는 긴 휴식 1회보다 짧은 휴식을 자주 취하는 것이 효과적입니다.", topic: "작업환경" },
  { id: 25, question: "근골격계 질환(MSD)의 원인이 아닌 것은?", options: ["반복 동작", "부적절한 자세", "과도한 힘", "적절한 휴식"], correct: 3, explanation: "MSD는 반복, 부적절한 자세, 과도한 힘, 진동 등이 원인이며 휴식은 예방 요소입니다.", topic: "작업환경" },

  // 사용성 평가 (13문항)
  { id: 26, question: "사용성(Usability)의 구성요소가 아닌 것은?", options: ["효율성", "효과성", "만족도", "수익성"], correct: 3, explanation: "사용성은 효과성, 효율성, 만족도로 구성되며 수익성은 포함되지 않습니다.", topic: "사용성 평가" },
  { id: 27, question: "학습용이성(Learnability)이 의미하는 것은?", options: ["오류 복구 용이", "처음 사용 시 쉬움", "재사용 시 기억", "효율적 사용"], correct: 1, explanation: "학습용이성은 처음 사용하는 사람이 얼마나 쉽게 배울 수 있는지를 의미합니다.", topic: "사용성 평가" },
  { id: 28, question: "기억용이성(Memorability)이 의미하는 것은?", options: ["처음 배우기 쉬움", "오래 사용 후 재사용 시 기억", "빠른 작업 수행", "오류 복구"], correct: 1, explanation: "기억용이성은 한동안 사용하지 않다가 다시 사용할 때 기억하기 쉬운 정도입니다.", topic: "사용성 평가" },
  { id: 29, question: "오류(Error)에 대한 사용성 원칙은?", options: ["오류 무시", "오류 방지와 복구 용이", "오류 숨김", "오류 경고 없음"], correct: 1, explanation: "좋은 사용성은 오류를 방지하고, 발생 시 쉽게 복구할 수 있어야 합니다.", topic: "사용성 평가" },
  { id: 30, question: "어포던스(Affordance)의 의미는?", options: ["시각적 매력", "행동 유도 속성", "가격 경쟁력", "내구성"], correct: 1, explanation: "어포던스는 사물이 사용자에게 특정 행동을 유도하는 속성입니다 (예: 버튼은 누르도록 유도).", topic: "사용성 평가" },
  { id: 31, question: "피드백(Feedback)의 역할은?", options: ["미적 효과", "행위 결과 확인", "비용 절감", "생산성 향상"], correct: 1, explanation: "피드백은 사용자가 자신의 행위 결과를 즉시 확인할 수 있게 합니다.", topic: "사용성 평가" },
  { id: 32, question: "일관성(Consistency)의 원칙이란?", options: ["매번 다른 방식", "동일 기능은 동일 방식", "복잡한 인터페이스", "예측 불가능"], correct: 1, explanation: "일관성은 동일한 기능은 항상 동일한 방식으로 작동해야 한다는 원칙입니다.", topic: "사용성 평가" },
  { id: 33, question: "가시성(Visibility)의 원칙이란?", options: ["기능 숨기기", "기능이 눈에 보임", "복잡한 메뉴", "다단계 접근"], correct: 1, explanation: "가시성은 시스템의 기능과 상태가 사용자에게 명확히 보여야 한다는 원칙입니다.", topic: "사용성 평가" },
  { id: 34, question: "제약(Constraint)을 활용한 설계 예시는?", options: ["아무 곳에나 꽂히는 플러그", "한 방향으로만 들어가는 USB", "모든 버튼 동일 크기", "라벨 없는 버튼"], correct: 1, explanation: "제약은 잘못된 사용을 물리적으로 방지하는 것으로, 한 방향 삽입 USB가 예시입니다.", topic: "사용성 평가" },
  { id: 35, question: "매핑(Mapping)의 좋은 예시는?", options: ["무작위 버튼 배치", "가스레인지 손잡이 위치=버너 위치", "숨겨진 스위치", "복잡한 메뉴 구조"], correct: 1, explanation: "좋은 매핑은 조작부와 대상의 위치 관계가 직관적으로 대응하는 것입니다.", topic: "사용성 평가" },
  { id: 36, question: "사용성 테스트에서 'Think Aloud' 기법이란?", options: ["조용히 사용", "생각을 말로 표현", "테스트 후 인터뷰", "설문 조사"], correct: 1, explanation: "Think Aloud는 사용자가 과제 수행 중 생각을 말로 표현하게 하여 인사이트를 얻습니다.", topic: "사용성 평가" },
  { id: 37, question: "휴리스틱 평가(Heuristic Evaluation)란?", options: ["사용자 테스트", "전문가의 원칙 기반 평가", "A/B 테스트", "설문 조사"], correct: 1, explanation: "휴리스틱 평가는 전문가가 사용성 원칙(휴리스틱)에 따라 인터페이스를 평가합니다.", topic: "사용성 평가" },
  { id: 38, question: "닐슨의 10가지 휴리스틱에 포함되지 않는 것은?", options: ["시스템 상태 가시성", "실세계와의 일치", "최저 가격", "오류 예방"], correct: 2, explanation: "닐슨의 휴리스틱은 가시성, 일치, 사용자 제어, 일관성, 오류 예방 등이며 가격은 무관합니다.", topic: "사용성 평가" },

  // 유니버설 디자인 (12문항)
  { id: 39, question: "유니버설 디자인의 목표는?", options: ["특정 사용자 전용", "모든 사람이 사용 가능", "고급 제품 전용", "젊은 층 전용"], correct: 1, explanation: "유니버설 디자인은 장애, 나이, 성별에 관계없이 모든 사람이 사용할 수 있는 디자인입니다.", topic: "유니버설 디자인" },
  { id: 40, question: "유니버설 디자인의 7대 원칙에 해당하지 않는 것은?", options: ["공평한 사용", "사용의 유연성", "낮은 물리적 노력", "고가격"], correct: 3, explanation: "7대 원칙: 공평한 사용, 유연성, 간단/직관적, 지각 가능한 정보, 오류 허용, 낮은 노력, 접근/사용 공간.", topic: "유니버설 디자인" },
  { id: 41, question: "'공평한 사용'이 의미하는 것은?", options: ["동일 가격", "모든 사용자 동등 사용", "전문가 전용", "단일 용도"], correct: 1, explanation: "공평한 사용은 다양한 능력의 사용자가 동등하게 사용할 수 있어야 함을 의미합니다.", topic: "유니버설 디자인" },
  { id: 42, question: "'사용의 유연성'이 의미하는 것은?", options: ["고정된 사용법", "다양한 사용 방식 제공", "전문가만 사용", "단일 자세"], correct: 1, explanation: "사용의 유연성은 개인의 선호와 능력에 맞는 다양한 사용 방식을 제공하는 것입니다.", topic: "유니버설 디자인" },
  { id: 43, question: "'간단하고 직관적인 사용'의 예시는?", options: ["복잡한 매뉴얼 필요", "아이콘으로 기능 표시", "숨겨진 기능", "전문 용어 사용"], correct: 1, explanation: "간단하고 직관적인 사용은 경험, 지식, 언어와 관계없이 쉽게 이해할 수 있는 것입니다.", topic: "유니버설 디자인" },
  { id: 44, question: "'지각 가능한 정보'의 예시는?", options: ["시각 정보만 제공", "청각+시각+촉각 정보 병행", "작은 글씨만 사용", "단색 표시"], correct: 1, explanation: "지각 가능한 정보는 다양한 감각(시각, 청각, 촉각)으로 정보를 전달하는 것입니다.", topic: "유니버설 디자인" },
  { id: 45, question: "'오류에 대한 허용'이 의미하는 것은?", options: ["오류 무시", "오류 시 위험 최소화", "오류 경고 없음", "오류 시 기기 파손"], correct: 1, explanation: "오류 허용은 실수나 의도치 않은 행동으로 인한 위험이나 부정적 결과를 최소화하는 것입니다.", topic: "유니버설 디자인" },
  { id: 46, question: "'낮은 물리적 노력'의 예시는?", options: ["무거운 문", "자동문", "높은 스위치", "작은 버튼"], correct: 1, explanation: "낮은 물리적 노력은 피로를 최소화하며 편안하게 사용할 수 있는 것입니다.", topic: "유니버설 디자인" },
  { id: 47, question: "접근성(Accessibility)이 의미하는 것은?", options: ["높은 가격", "장애인도 사용 가능", "전문가 전용", "제한된 접근"], correct: 1, explanation: "접근성은 장애가 있는 사람도 제품이나 서비스를 이용할 수 있도록 하는 것입니다.", topic: "유니버설 디자인" },
  { id: 48, question: "배리어프리(Barrier-free) 디자인이란?", options: ["장벽 증가", "물리적/제도적 장벽 제거", "장벽 유지", "특정인 제외"], correct: 1, explanation: "배리어프리는 장애인, 고령자 등이 겪는 물리적, 제도적 장벽을 제거하는 디자인입니다.", topic: "유니버설 디자인" },
  { id: 49, question: "점자 블록의 역할은?", options: ["미관용", "시각장애인 보행 안내", "소음 감소", "미끄럼 방지만"], correct: 1, explanation: "점자 블록은 시각장애인이 보행 시 발로 느끼며 방향과 위험을 인지하도록 돕습니다.", topic: "유니버설 디자인" },
  { id: 50, question: "유니버설 디자인과 배리어프리 디자인의 차이는?", options: ["동일함", "배리어프리는 장애인 중심, UD는 모든 사람", "UD가 장애인 전용", "배리어프리가 더 포괄적"], correct: 1, explanation: "배리어프리는 장애인의 장벽 제거에 초점, 유니버설 디자인은 처음부터 모든 사람을 고려합니다.", topic: "유니버설 디자인" }
];

export default function HumanFactorsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('pdt-human-factors-progress');
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
    if (index === questions[currentQuestion].correct) { newScore = score + 1; setScore(newScore); }
    localStorage.setItem('pdt-human-factors-progress', JSON.stringify({ answered: Array.from(newAnswered), score: newScore }));
  };

  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowExplanation(false); } else { setShowResult(true); } };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setShowExplanation(false); setAnsweredQuestions(new Set()); localStorage.removeItem('pdt-human-factors-progress'); };
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const getAISearchUrl = (question: string, topic: string, aiType: string) => { const searchQuery = encodeURIComponent(`${topic} ${question} 제품디자인산업기사`); switch(aiType) { case 'claude': return `https://claude.ai/new?q=${searchQuery}`; case 'chatgpt': return `https://chat.openai.com/?q=${searchQuery}`; case 'gemini': return `https://gemini.google.com/?q=${searchQuery}`; default: return '#'; } };

  if (!isClient) { return (<div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div></div>); }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h2>
            <div className="mb-6"><div className="text-6xl font-bold text-teal-600 mb-2">{score}/{questions.length}</div><div className="text-xl text-gray-600">정답률: {percentage}%</div></div>
            <div className="mb-8">{percentage >= 80 ? (<p className="text-green-600 font-semibold">훌륭합니다!</p>) : percentage >= 60 ? (<p className="text-yellow-600 font-semibold">좋아요!</p>) : (<p className="text-red-600 font-semibold">더 학습이 필요해요!</p>)}</div>
            <div className="flex gap-4 justify-center"><button onClick={resetQuiz} className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">다시 시작</button><Link href="/category/design/product-design-technician" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold">돌아가기</Link></div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6"><Link href="/category/design/product-design-technician" className="inline-flex items-center text-teal-600 hover:text-teal-800"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>제품디자인산업기사 홈으로</Link></div>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">인간공학</h1><span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">{currentQuestion + 1} / {questions.length}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8"><div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
          <div className="mb-8"><span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm mb-4">{question.topic}</span><h2 className="text-xl font-semibold text-gray-800">{question.question}</h2></div>
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={selectedAnswer !== null} className={`w-full p-4 text-left rounded-xl transition-all border-2 ${selectedAnswer === null ? 'border-gray-200 hover:border-teal-400 hover:bg-teal-50' : selectedAnswer === index ? index === question.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800' : index === question.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
                <div className="flex items-center"><span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-semibold ${selectedAnswer === null ? 'bg-gray-200 text-gray-700' : selectedAnswer === index ? index === question.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white' : index === question.correct ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{index + 1}</span><span className="font-medium">{option}</span></div>
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className={`p-6 rounded-xl mb-6 ${selectedAnswer === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start"><div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedAnswer === question.correct ? 'bg-green-500' : 'bg-red-500'}`}>{selectedAnswer === question.correct ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}</div><div><p className={`font-semibold mb-1 ${selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'}`}>{selectedAnswer === question.correct ? '정답입니다!' : '틀렸습니다!'}</p><p className="text-gray-700">{question.explanation}</p></div></div>
              <div className="mt-4 pt-4 border-t border-gray-200"><p className="text-sm text-gray-600 mb-2">AI에게 더 물어보기:</p><div className="flex gap-2"><a href={getAISearchUrl(question.question, question.topic, 'claude')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200">Claude</a><a href={getAISearchUrl(question.question, question.topic, 'chatgpt')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">ChatGPT</a><a href={getAISearchUrl(question.question, question.topic, 'gemini')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">Gemini</a></div></div>
            </div>
          )}
          {selectedAnswer !== null && (<button onClick={nextQuestion} className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 shadow-lg">{currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'}</button>)}
        </div>
        <div className="grid grid-cols-10 gap-2">{questions.map((_, idx) => (<button key={idx} onClick={() => { setCurrentQuestion(idx); setSelectedAnswer(null); setShowExplanation(false); }} className={`w-full aspect-square rounded-lg font-medium text-sm ${idx === currentQuestion ? 'bg-teal-600 text-white' : answeredQuestions.has(idx) ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{idx + 1}</button>))}</div>
      </div>
    </div>
  );
}
