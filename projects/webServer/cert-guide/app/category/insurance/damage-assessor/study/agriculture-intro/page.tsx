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
  // 재배학 기초 (13문제)
  {
    id: 1,
    question: "식물의 광합성에서 CO2가 고정되는 장소는?",
    options: ["미토콘드리아", "엽록체의 스트로마", "세포질", "핵"],
    answer: 1,
    explanation: "광합성의 암반응(캘빈회로)은 엽록체의 스트로마에서 일어나며, 여기서 CO2가 고정됩니다.",
    category: "재배학 기초"
  },
  {
    id: 2,
    question: "광합성의 명반응에서 생성되는 물질이 아닌 것은?",
    options: ["ATP", "NADPH", "O2", "포도당"],
    answer: 3,
    explanation: "명반응에서는 ATP, NADPH, O2가 생성되며, 포도당은 암반응에서 생성됩니다.",
    category: "재배학 기초"
  },
  {
    id: 3,
    question: "식물의 생장에 가장 적합한 광질은?",
    options: ["녹색광", "적색광과 청색광", "자외선", "적외선"],
    answer: 1,
    explanation: "식물은 적색광(660nm)과 청색광(450nm)을 가장 잘 흡수하여 광합성에 이용합니다.",
    category: "재배학 기초"
  },
  {
    id: 4,
    question: "C3 식물과 C4 식물의 차이점에 관한 설명으로 옳은 것은?",
    options: ["C4 식물이 광합성 효율이 낮다", "C3 식물은 고온에서 유리하다", "C4 식물은 광호흡이 적다", "두 식물의 차이가 없다"],
    answer: 2,
    explanation: "C4 식물은 CO2 농축 기작이 있어 광호흡이 적고, 고온·건조 환경에서 유리합니다.",
    category: "재배학 기초"
  },
  {
    id: 5,
    question: "식물 호르몬 중 줄기 신장과 정단우세를 촉진하는 것은?",
    options: ["에틸렌", "옥신", "사이토키닌", "앱시스산"],
    answer: 1,
    explanation: "옥신은 줄기의 신장 생장을 촉진하고 정단우세(꼭대기 눈의 우세)를 유지합니다.",
    category: "재배학 기초"
  },
  {
    id: 6,
    question: "단일식물의 특성에 관한 설명으로 옳은 것은?",
    options: ["일장이 길면 개화", "일장이 짧으면 개화", "일장과 무관하게 개화", "저온에서만 개화"],
    answer: 1,
    explanation: "단일식물은 한계일장보다 일장이 짧을 때(밤이 길 때) 개화가 촉진됩니다. 예: 국화, 벼, 콩",
    category: "재배학 기초"
  },
  {
    id: 7,
    question: "춘화처리(버널리제이션)의 효과는?",
    options: ["발아 촉진", "저온 경험으로 개화 촉진", "낙과 방지", "해충 방제"],
    answer: 1,
    explanation: "춘화처리는 일정 기간 저온을 경험하게 하여 개화를 촉진시키는 처리입니다.",
    category: "재배학 기초"
  },
  {
    id: 8,
    question: "식물의 증산작용 조절에 관여하는 세포는?",
    options: ["표피세포", "공변세포", "책상조직", "해면조직"],
    answer: 1,
    explanation: "공변세포는 기공의 개폐를 조절하여 증산작용을 조절합니다.",
    category: "재배학 기초"
  },
  {
    id: 9,
    question: "식물체 내 수분 이동의 주요 원동력은?",
    options: ["삼투압", "증산작용에 의한 흡인력", "뿌리압", "확산"],
    answer: 1,
    explanation: "증산작용에 의한 흡인력(응집력-장력설)이 식물체 내 수분 이동의 주요 원동력입니다.",
    category: "재배학 기초"
  },
  {
    id: 10,
    question: "질소(N) 결핍 시 나타나는 증상은?",
    options: ["잎 가장자리 괴사", "하위엽 황화", "과실 불량", "잎 끝 갈변"],
    answer: 1,
    explanation: "질소가 결핍되면 이동성 원소이므로 하위엽(오래된 잎)부터 황화 현상이 나타납니다.",
    category: "재배학 기초"
  },
  {
    id: 11,
    question: "칼륨(K) 결핍 시 나타나는 증상은?",
    options: ["잎맥 사이 황화", "잎 가장자리 갈변 및 괴사", "생장점 고사", "과실 변형"],
    answer: 1,
    explanation: "칼륨 결핍 시 잎 가장자리가 갈변하고 괴사되는 증상이 나타납니다.",
    category: "재배학 기초"
  },
  {
    id: 12,
    question: "식물의 필수원소 중 다량원소가 아닌 것은?",
    options: ["질소(N)", "인(P)", "철(Fe)", "칼륨(K)"],
    answer: 2,
    explanation: "철(Fe)은 미량원소이며, 다량원소는 N, P, K, Ca, Mg, S입니다.",
    category: "재배학 기초"
  },
  {
    id: 13,
    question: "유기물 분해 시 탄질비(C/N)가 낮은 경우 일어나는 현상은?",
    options: ["질소 기아 현상", "빠른 분해와 질소 방출", "분해가 지연됨", "병해 발생"],
    answer: 1,
    explanation: "탄질비가 낮으면(20:1 이하) 미생물에 의한 분해가 빠르고 질소가 방출됩니다.",
    category: "재배학 기초"
  },
  // 토양학 기초 (12문제)
  {
    id: 14,
    question: "토양의 삼상(三相) 구성요소가 아닌 것은?",
    options: ["고상(토양입자)", "액상(토양수분)", "기상(토양공기)", "열상(토양온도)"],
    answer: 3,
    explanation: "토양의 삼상은 고상(토양입자), 액상(토양수분), 기상(토양공기)입니다. 온도는 삼상에 포함되지 않습니다.",
    category: "토양학 기초"
  },
  {
    id: 15,
    question: "토양 입자의 크기가 큰 순서로 옳은 것은?",
    options: ["점토 > 미사 > 모래", "모래 > 미사 > 점토", "미사 > 점토 > 모래", "점토 > 모래 > 미사"],
    answer: 1,
    explanation: "토양 입자 크기: 모래(0.02~2mm) > 미사(0.002~0.02mm) > 점토(0.002mm 이하)",
    category: "토양학 기초"
  },
  {
    id: 16,
    question: "양토(loam)의 특성으로 옳은 것은?",
    options: ["모래 함량이 80% 이상", "점토 함량이 60% 이상", "모래, 미사, 점토가 적당히 혼합", "자갈이 다량 포함"],
    answer: 2,
    explanation: "양토는 모래, 미사, 점토가 적당한 비율로 혼합되어 농업에 가장 적합한 토양입니다.",
    category: "토양학 기초"
  },
  {
    id: 17,
    question: "토양 pH가 식물에 미치는 영향으로 옳은 것은?",
    options: ["pH와 양분 흡수는 무관함", "pH에 따라 양분 유효도가 변함", "pH가 높을수록 좋음", "pH가 낮을수록 좋음"],
    answer: 1,
    explanation: "토양 pH에 따라 각 양분의 유효도(식물이 흡수할 수 있는 정도)가 달라집니다. 대부분의 작물은 pH 6.0~7.0에서 잘 자랍니다.",
    category: "토양학 기초"
  },
  {
    id: 18,
    question: "토양의 양이온치환용량(CEC)이 높으면?",
    options: ["양분 보유력이 낮음", "양분 보유력이 높음", "배수가 좋음", "통기성이 좋음"],
    answer: 1,
    explanation: "CEC가 높으면 토양이 양이온(K+, Ca2+, Mg2+ 등)을 많이 보유할 수 있어 비옥도가 높습니다.",
    category: "토양학 기초"
  },
  {
    id: 19,
    question: "부식(腐植, humus)의 역할이 아닌 것은?",
    options: ["양이온치환용량 증가", "토양 구조 개선", "토양 pH 급격히 낮춤", "보수력 향상"],
    answer: 2,
    explanation: "부식은 CEC 증가, 토양 구조 개선, 보수력 향상 등의 역할을 하며, pH를 급격히 낮추지는 않습니다.",
    category: "토양학 기초"
  },
  {
    id: 20,
    question: "석회(CaO) 시용의 주요 목적은?",
    options: ["질소 공급", "산성토양 개량", "칼륨 공급", "인산 공급"],
    answer: 1,
    explanation: "석회는 산성토양의 pH를 높이고 칼슘을 공급하여 토양을 개량합니다.",
    category: "토양학 기초"
  },
  {
    id: 21,
    question: "토양 침식의 원인이 아닌 것은?",
    options: ["강우", "바람", "경사지 경작", "피복작물 재배"],
    answer: 3,
    explanation: "피복작물 재배는 토양 침식을 방지하는 방법이며, 침식의 원인이 아닙니다.",
    category: "토양학 기초"
  },
  {
    id: 22,
    question: "질소비료의 종류가 아닌 것은?",
    options: ["요소", "황산암모늄", "과인산석회", "질산암모늄"],
    answer: 2,
    explanation: "과인산석회는 인산비료이며, 요소, 황산암모늄, 질산암모늄은 질소비료입니다.",
    category: "토양학 기초"
  },
  {
    id: 23,
    question: "녹비작물의 역할로 옳지 않은 것은?",
    options: ["질소 고정(콩과 작물)", "토양 유기물 증가", "토양 침식 방지", "토양 pH 급격 상승"],
    answer: 3,
    explanation: "녹비작물은 질소 고정, 유기물 증가, 침식 방지 역할을 하며, pH를 급격히 올리지는 않습니다.",
    category: "토양학 기초"
  },
  {
    id: 24,
    question: "토양 염류집적의 원인은?",
    options: ["과다한 관수", "과다한 시비", "적절한 윤작", "유기물 시용"],
    answer: 1,
    explanation: "과다한 시비는 토양에 염류가 집적되는 주요 원인입니다.",
    category: "토양학 기초"
  },
  {
    id: 25,
    question: "유효인산이란?",
    options: ["토양 전체 인산", "식물이 흡수할 수 있는 형태의 인산", "유기태 인산", "불용성 인산"],
    answer: 1,
    explanation: "유효인산은 식물이 뿌리를 통해 흡수할 수 있는 형태(수용성, 구용성)의 인산입니다.",
    category: "토양학 기초"
  },
  // 병해 (13문제)
  {
    id: 26,
    question: "식물 병원체가 아닌 것은?",
    options: ["세균", "바이러스", "곤충", "곰팡이"],
    answer: 2,
    explanation: "식물 병원체에는 곰팡이, 세균, 바이러스, 파이토플라즈마 등이 있으며, 곤충은 해충입니다.",
    category: "병해"
  },
  {
    id: 27,
    question: "곰팡이에 의한 병해가 아닌 것은?",
    options: ["노균병", "흰가루병", "무름병", "탄저병"],
    answer: 2,
    explanation: "무름병은 세균(Erwinia)에 의해 발생하며, 나머지는 곰팡이에 의한 병해입니다.",
    category: "병해"
  },
  {
    id: 28,
    question: "바이러스병의 특징으로 옳은 것은?",
    options: ["약제로 쉽게 방제", "접촉 전염만 가능", "매개충에 의한 전염이 많음", "고온에서 증식 활발"],
    answer: 2,
    explanation: "식물 바이러스병은 진딧물, 매미충 등 매개충에 의해 전염되는 경우가 많습니다.",
    category: "병해"
  },
  {
    id: 29,
    question: "도열병의 병원체는?",
    options: ["세균", "곰팡이", "바이러스", "선충"],
    answer: 1,
    explanation: "벼 도열병은 Magnaporthe oryzae(곰팡이)에 의해 발생합니다.",
    category: "병해"
  },
  {
    id: 30,
    question: "역병(疫病)의 발생 조건으로 옳은 것은?",
    options: ["고온 건조", "저온 다습", "고온 다습", "저온 건조"],
    answer: 2,
    explanation: "역병은 고온 다습한 환경에서 잘 발생합니다. 토마토, 고추 등에 피해를 줍니다.",
    category: "병해"
  },
  {
    id: 31,
    question: "흰가루병의 발생 조건으로 옳은 것은?",
    options: ["고온 다습", "건조한 환경", "토양 전염", "저온 다습"],
    answer: 1,
    explanation: "흰가루병은 비교적 건조한 환경에서 발생하며, 잎 표면에 흰색 균사가 나타납니다.",
    category: "병해"
  },
  {
    id: 32,
    question: "식물병의 3요소(병의 삼각형)가 아닌 것은?",
    options: ["병원체", "기주식물", "환경", "농약"],
    answer: 3,
    explanation: "식물병의 3요소는 병원체, 기주식물, 환경입니다. 농약은 방제 수단입니다.",
    category: "병해"
  },
  {
    id: 33,
    question: "종자 전염병의 방제 방법으로 가장 효과적인 것은?",
    options: ["토양 소독", "종자 소독", "엽면 살포", "관수 조절"],
    answer: 1,
    explanation: "종자 전염병은 종자 소독을 통해 효과적으로 방제할 수 있습니다.",
    category: "병해"
  },
  {
    id: 34,
    question: "저항성 품종 재배의 장점이 아닌 것은?",
    options: ["농약 사용 감소", "환경 보전", "영구적 방제 효과", "비용 절감"],
    answer: 2,
    explanation: "저항성 품종은 병원균의 변이로 인해 저항성이 무력화될 수 있어 영구적이지 않습니다.",
    category: "병해"
  },
  {
    id: 35,
    question: "탄저병에 걸린 과일의 증상은?",
    options: ["흰색 균사 발생", "둥근 검은 반점과 함몰", "잎 황화", "뿌리 부패"],
    answer: 1,
    explanation: "탄저병은 과일에 둥근 검은 반점이 생기고 함몰되는 증상이 특징입니다.",
    category: "병해"
  },
  {
    id: 36,
    question: "세균성 병해의 특징으로 옳은 것은?",
    options: ["균사 형성", "점액 분비", "포자 비산", "흰가루 발생"],
    answer: 1,
    explanation: "세균성 병해는 감염 부위에서 점액(세균 덩어리)이 분비되는 것이 특징입니다.",
    category: "병해"
  },
  {
    id: 37,
    question: "풋마름병의 원인 병원체는?",
    options: ["곰팡이", "세균", "바이러스", "선충"],
    answer: 1,
    explanation: "풋마름병은 Ralstonia solanacearum(세균)에 의해 발생하며, 토마토, 고추 등에 피해를 줍니다.",
    category: "병해"
  },
  {
    id: 38,
    question: "잿빛곰팡이병의 발생 조건으로 옳은 것은?",
    options: ["고온 건조", "저온 다습", "토양 산성화", "질소 결핍"],
    answer: 1,
    explanation: "잿빛곰팡이병(Botrytis)은 저온 다습한 환경에서 잘 발생합니다.",
    category: "병해"
  },
  // 해충 (12문제)
  {
    id: 39,
    question: "해충의 구기 형태 중 식물 즙액을 빨아먹는 것은?",
    options: ["저작구", "흡수구", "핥는 구기", "여과구"],
    answer: 1,
    explanation: "진딧물, 매미충 등은 흡수구로 식물 즙액을 빨아먹습니다.",
    category: "해충"
  },
  {
    id: 40,
    question: "완전변태 곤충의 발육 단계는?",
    options: ["알-약충-성충", "알-유충-번데기-성충", "알-유충-성충", "약충-번데기-성충"],
    answer: 1,
    explanation: "완전변태: 알-유충-번데기-성충의 4단계를 거칩니다. 예: 나비, 딱정벌레",
    category: "해충"
  },
  {
    id: 41,
    question: "불완전변태 곤충의 예가 아닌 것은?",
    options: ["메뚜기", "진딧물", "나방", "노린재"],
    answer: 2,
    explanation: "나방은 완전변태 곤충이며, 메뚜기, 진딧물, 노린재는 불완전변태 곤충입니다.",
    category: "해충"
  },
  {
    id: 42,
    question: "응애의 특징으로 옳은 것은?",
    options: ["곤충의 일종", "다리가 8개인 절지동물", "완전변태", "주로 야간 활동"],
    answer: 1,
    explanation: "응애는 곤충이 아닌 거미강에 속하는 절지동물로 다리가 8개입니다.",
    category: "해충"
  },
  {
    id: 43,
    question: "진딧물의 피해 양상이 아닌 것은?",
    options: ["흡즙에 의한 생육 저해", "바이러스 매개", "감로 분비로 그을음병 유발", "잎을 갉아먹음"],
    answer: 3,
    explanation: "진딧물은 흡즙해충으로 잎을 갉아먹지 않습니다. 흡즙, 바이러스 매개, 감로 분비가 주요 피해입니다.",
    category: "해충"
  },
  {
    id: 44,
    question: "생물학적 방제 방법의 예가 아닌 것은?",
    options: ["천적 이용", "기생벌 방사", "살충제 살포", "유용 미생물 이용"],
    answer: 2,
    explanation: "살충제 살포는 화학적 방제이며, 천적, 기생벌, 유용 미생물은 생물학적 방제입니다.",
    category: "해충"
  },
  {
    id: 45,
    question: "페로몬 트랩의 원리는?",
    options: ["해충 직접 살충", "성페로몬으로 유인 및 포획", "천적 유인", "살충 성분 함유"],
    answer: 1,
    explanation: "페로몬 트랩은 암컷이 분비하는 성페로몬을 합성하여 수컷을 유인, 포획합니다.",
    category: "해충"
  },
  {
    id: 46,
    question: "굴파리류의 피해 증상은?",
    options: ["잎에 굴 모양 식흔", "줄기 구멍", "뿌리 갉아먹기", "과일 낙과"],
    answer: 0,
    explanation: "굴파리 유충은 잎 속에서 잎 조직을 먹으며 굴 모양의 식흔을 남깁니다.",
    category: "해충"
  },
  {
    id: 47,
    question: "나방류 해충의 주요 피해 시기는?",
    options: ["알 단계", "유충 단계", "번데기 단계", "성충 단계"],
    answer: 1,
    explanation: "나방류 해충은 주로 유충(애벌레) 시기에 식물을 가해합니다.",
    category: "해충"
  },
  {
    id: 48,
    question: "종합적 병해충 관리(IPM)의 원칙이 아닌 것은?",
    options: ["예방 우선", "모니터링", "화학 방제 전적 의존", "경제적 피해 수준 고려"],
    answer: 2,
    explanation: "IPM은 화학 방제 의존을 줄이고 다양한 방제 방법을 종합적으로 사용하는 것입니다.",
    category: "해충"
  },
  {
    id: 49,
    question: "총채벌레의 피해 증상은?",
    options: ["잎에 은백색 반점", "줄기 굴 피해", "뿌리 가해", "과실 구멍"],
    answer: 0,
    explanation: "총채벌레는 잎 세포를 긁어먹어 은백색 반점이 나타나고, 바이러스를 매개하기도 합니다.",
    category: "해충"
  },
  {
    id: 50,
    question: "해충 방제를 위한 경종적 방제 방법이 아닌 것은?",
    options: ["윤작", "저항성 품종 재배", "적기 파종", "살충제 살포"],
    answer: 3,
    explanation: "살충제 살포는 화학적 방제이며, 윤작, 저항성 품종, 적기 파종은 경종적(재배적) 방제입니다.",
    category: "해충"
  }
];

export default function AgricultureIntroPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('damage-assessor-agriculture-intro-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('damage-assessor-agriculture-intro-progress', JSON.stringify({
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
    if (newAnswered.size === questions.length) setIsComplete(true);
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
    localStorage.removeItem('damage-assessor-agriculture-intro-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "재배학 기초": "bg-emerald-100 text-emerald-800",
      "토양학 기초": "bg-amber-100 text-amber-800",
      "병해": "bg-red-100 text-red-800",
      "해충": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            손해평가사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">농학개론</h1>
          <p className="text-emerald-100">재배학, 토양학, 병해충 기초</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">학습 진행률</span>
            <span className="text-sm font-medium text-emerald-600">{answeredQuestions.size} / {questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">현재 점수: {score}점</span>
            <span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span>
          </div>
        </div>

        {isComplete && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <button onClick={resetQuiz} className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">다시 도전하기</button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>{question.category}</span>
            <span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";
              if (showExplanation) {
                if (index === question.answer) buttonClass += "border-green-500 bg-green-50 text-green-800";
                else if (index === selectedAnswer) buttonClass += "border-red-500 bg-red-50 text-red-800";
                else buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
              } else if (answeredQuestions.has(currentQuestion)) {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed";
              } else {
                buttonClass += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer";
              }
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={buttonClass}>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <h3 className="font-bold text-teal-800 mb-2">💡 해설</h3>
              <p className="text-teal-900">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>이전 문제
          </button>
          <button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">처음부터 다시</button>
          <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            다음 문제<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["재배학 기초", "토양학 기초", "병해", "해충"].map((category, idx) => {
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
