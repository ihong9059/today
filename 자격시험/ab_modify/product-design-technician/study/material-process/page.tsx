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
  // 금속재료 (10문항)
  { id: 1, question: "스테인리스강의 주요 합금 원소는?", options: ["구리", "크롬", "납", "주석"], correct: 1, explanation: "스테인리스강은 철에 크롬(12% 이상)을 첨가하여 내식성을 높인 합금강입니다.", topic: "금속재료" },
  { id: 2, question: "알루미늄의 특성이 아닌 것은?", options: ["경량성", "내식성", "자성", "열전도성"], correct: 2, explanation: "알루미늄은 경량, 내식성, 열/전기 전도성이 우수하나 비자성 금속입니다.", topic: "금속재료" },
  { id: 3, question: "황동(Brass)의 구성 원소는?", options: ["구리+아연", "구리+주석", "철+탄소", "알루미늄+마그네슘"], correct: 0, explanation: "황동은 구리(Cu)와 아연(Zn)의 합금으로, 황금색을 띠며 가공성이 좋습니다.", topic: "금속재료" },
  { id: 4, question: "청동(Bronze)의 구성 원소는?", options: ["구리+아연", "구리+주석", "구리+니켈", "철+크롬"], correct: 1, explanation: "청동은 구리(Cu)와 주석(Sn)의 합금으로, 경도가 높고 내마모성이 좋습니다.", topic: "금속재료" },
  { id: 5, question: "어닐링(Annealing) 열처리의 목적은?", options: ["경도 증가", "연성 회복", "내식성 향상", "색상 변화"], correct: 1, explanation: "어닐링은 금속을 가열 후 서서히 냉각하여 내부 응력을 제거하고 연성을 회복시킵니다.", topic: "금속재료" },
  { id: 6, question: "마그네슘 합금의 가장 큰 장점은?", options: ["고강도", "초경량", "저렴함", "내열성"], correct: 1, explanation: "마그네슘은 실용 금속 중 가장 가벼워(비중 1.74) 경량화에 적합합니다.", topic: "금속재료" },
  { id: 7, question: "양극산화(Anodizing)의 주요 대상 금속은?", options: ["철", "알루미늄", "구리", "납"], correct: 1, explanation: "양극산화는 주로 알루미늄에 적용하여 산화피막을 형성, 내식성과 경도를 높입니다.", topic: "금속재료" },
  { id: 8, question: "금속의 가공경화 현상이란?", options: ["열처리로 연화", "냉간가공으로 경도 증가", "부식", "고온 연화"], correct: 1, explanation: "가공경화는 냉간 가공 시 금속 결정구조가 변형되어 경도와 강도가 증가하는 현상입니다.", topic: "금속재료" },
  { id: 9, question: "다이캐스팅에 적합한 금속은?", options: ["철", "아연/알루미늄 합금", "티타늄", "텅스텐"], correct: 1, explanation: "다이캐스팅은 저융점 금속(아연, 알루미늄, 마그네슘)에 적합한 주조 방법입니다.", topic: "금속재료" },
  { id: 10, question: "금속의 연성(Ductility)이란?", options: ["깨지기 쉬움", "잡아당겼을 때 늘어남", "압축에 강함", "열에 약함"], correct: 1, explanation: "연성은 금속을 잡아당겼을 때 끊어지지 않고 늘어나는 성질입니다.", topic: "금속재료" },

  // 플라스틱 재료 (15문항)
  { id: 11, question: "열가소성 수지와 열경화성 수지의 차이는?", options: ["색상 차이", "재가열 시 형태 변화 여부", "가격 차이", "투명도"], correct: 1, explanation: "열가소성은 재가열 시 녹지만, 열경화성은 한번 경화되면 다시 녹지 않습니다.", topic: "플라스틱" },
  { id: 12, question: "열가소성 수지의 예가 아닌 것은?", options: ["PE", "PP", "에폭시", "ABS"], correct: 2, explanation: "에폭시는 열경화성 수지이며, PE, PP, ABS는 열가소성 수지입니다.", topic: "플라스틱" },
  { id: 13, question: "ABS 수지의 특성은?", options: ["유연함", "내충격성 우수", "투명함", "내열성 우수"], correct: 1, explanation: "ABS는 내충격성이 우수하여 가전제품 외장, 장난감 등에 널리 사용됩니다.", topic: "플라스틱" },
  { id: 14, question: "폴리카보네이트(PC)의 대표적 특성은?", options: ["유연성", "내충격성/투명성", "내열성 부족", "불투명"], correct: 1, explanation: "PC는 투명하면서 뛰어난 내충격성을 가져 안전 헬멧, 렌즈 등에 사용됩니다.", topic: "플라스틱" },
  { id: 15, question: "폴리프로필렌(PP)의 특성이 아닌 것은?", options: ["경량", "내화학성", "고가격", "힌지 특성"], correct: 2, explanation: "PP는 경량, 내화학성, 힌지 특성이 뛰어나며 가격이 저렴한 범용 플라스틱입니다.", topic: "플라스틱" },
  { id: 16, question: "PMMA(아크릴)의 특성은?", options: ["불투명", "높은 투명도", "유연함", "저렴한 가격"], correct: 1, explanation: "PMMA는 유리보다 투명도가 높고 가벼워 간판, 조명 커버 등에 사용됩니다.", topic: "플라스틱" },
  { id: 17, question: "POM(폴리아세탈)의 주요 용도는?", options: ["포장재", "기어/베어링", "식품용기", "건축자재"], correct: 1, explanation: "POM은 내마모성, 저마찰로 기어, 베어링 등 기계부품에 사용됩니다.", topic: "플라스틱" },
  { id: 18, question: "생분해성 플라스틱의 대표 종류는?", options: ["PE", "PP", "PLA", "PVC"], correct: 2, explanation: "PLA(폴리젖산)는 옥수수 전분에서 추출한 대표적인 생분해성 플라스틱입니다.", topic: "플라스틱" },
  { id: 19, question: "엔지니어링 플라스틱의 특징은?", options: ["저가격", "범용성", "고기능/고성능", "가공 용이"], correct: 2, explanation: "엔지니어링 플라스틱은 내열성, 기계적 강도 등이 우수한 고기능성 플라스틱입니다.", topic: "플라스틱" },
  { id: 20, question: "플라스틱 첨가제 중 '가소제'의 역할은?", options: ["색상 부여", "유연성 증가", "강도 증가", "내열성 향상"], correct: 1, explanation: "가소제는 플라스틱에 유연성을 부여하여 가공성과 물성을 개선합니다.", topic: "플라스틱" },
  { id: 21, question: "플라스틱의 자외선 안정제 역할은?", options: ["색상 부여", "자외선에 의한 열화 방지", "강도 증가", "투명도 증가"], correct: 1, explanation: "자외선 안정제는 UV에 의한 변색, 균열 등의 열화를 방지합니다.", topic: "플라스틱" },
  { id: 22, question: "섬유강화 플라스틱(FRP)의 특징은?", options: ["경량 고강도", "투명성", "유연성", "저렴함"], correct: 0, explanation: "FRP는 유리섬유나 탄소섬유로 강화되어 가볍고 강한 복합재료입니다.", topic: "플라스틱" },
  { id: 23, question: "TPE(열가소성 엘라스토머)의 특징은?", options: ["열경화성", "고무+플라스틱 특성", "금속 특성", "취성"], correct: 1, explanation: "TPE는 고무의 탄성과 플라스틱의 가공성을 겸비하여 재활용이 가능합니다.", topic: "플라스틱" },
  { id: 24, question: "실리콘의 특성이 아닌 것은?", options: ["내열성", "유연성", "강한 강도", "내후성"], correct: 2, explanation: "실리콘은 내열성, 유연성, 내후성이 뛰어나지만 기계적 강도는 약합니다.", topic: "플라스틱" },
  { id: 25, question: "플라스틱 '수축률'이 중요한 이유는?", options: ["색상 결정", "치수 정밀도", "무게 계산", "내구성 예측"], correct: 1, explanation: "성형 후 냉각 시 수축이 발생하므로 금형 설계 시 수축률을 고려해야 정확한 치수를 얻습니다.", topic: "플라스틱" },

  // 성형가공 (13문항)
  { id: 26, question: "사출성형의 기본 공정 순서는?", options: ["냉각-충전-보압-취출", "충전-보압-냉각-취출", "보압-충전-취출-냉각", "취출-충전-냉각-보압"], correct: 1, explanation: "사출성형은 충전-보압-냉각-취출 순서로 진행됩니다.", topic: "성형가공" },
  { id: 27, question: "사출성형 불량 중 '웰드 라인'의 원인은?", options: ["과충전", "수지 흐름 합류", "온도 과다", "금형 손상"], correct: 1, explanation: "웰드 라인은 두 수지 흐름이 만나는 부위에 생기는 자국입니다.", topic: "성형가공" },
  { id: 28, question: "'싱크 마크'의 원인은?", options: ["수축 차이", "공기 혼입", "금형 마모", "색상 불균일"], correct: 0, explanation: "싱크 마크는 두꺼운 부분이 더 많이 수축하여 표면이 움푹 들어가는 현상입니다.", topic: "성형가공" },
  { id: 29, question: "사출금형의 '언더컷'이란?", options: ["표면 무늬", "제품 취출 방해 형상", "냉각 채널", "주입구"], correct: 1, explanation: "언더컷은 단순 금형 개폐만으로는 취출할 수 없는 형상으로, 슬라이드 코어가 필요합니다.", topic: "성형가공" },
  { id: 30, question: "블로우 성형의 주요 제품은?", options: ["기어", "병/용기", "필름", "파이프"], correct: 1, explanation: "블로우 성형은 공기를 불어 패리슨을 확장시켜 병, 용기 등 중공 제품을 만듭니다.", topic: "성형가공" },
  { id: 31, question: "압출성형으로 만드는 제품은?", options: ["복잡한 3D 형상", "일정 단면의 연속 제품", "정밀 부품", "중공 용기"], correct: 1, explanation: "압출성형은 파이프, 시트, 프로파일 등 일정 단면의 연속 제품을 만듭니다.", topic: "성형가공" },
  { id: 32, question: "진공성형의 원리는?", options: ["고압 주입", "진공으로 시트 흡착", "회전 성형", "압축 성형"], correct: 1, explanation: "진공성형은 가열된 플라스틱 시트를 진공으로 금형에 흡착시킵니다.", topic: "성형가공" },
  { id: 33, question: "회전성형의 특징은?", options: ["초고압 사용", "대형 중공제품 적합", "고속 생산", "미세 정밀도"], correct: 1, explanation: "회전성형은 저압으로 대형 중공제품(물탱크 등)을 만들 수 있습니다.", topic: "성형가공" },
  { id: 34, question: "프레스 가공의 기본 공정이 아닌 것은?", options: ["전단", "굽힘", "드로잉", "주조"], correct: 3, explanation: "프레스 가공은 전단, 굽힘, 드로잉 등이며, 주조는 별개 공정입니다.", topic: "성형가공" },
  { id: 35, question: "다이캐스팅의 특징은?", options: ["저압 주조", "고압으로 정밀 금속 성형", "플라스틱 성형", "분말 성형"], correct: 1, explanation: "다이캐스팅은 용융 금속을 고압으로 금형에 주입하여 정밀 부품을 대량 생산합니다.", topic: "성형가공" },
  { id: 36, question: "CNC 가공의 장점이 아닌 것은?", options: ["정밀도", "복잡 형상", "대량 생산 효율", "다품종 소량"], correct: 2, explanation: "CNC 가공은 정밀하고 복잡한 형상, 다품종 소량에 적합하나 대량 생산은 사출이 효율적입니다.", topic: "성형가공" },
  { id: 37, question: "레이저 커팅의 장점은?", options: ["두꺼운 금속 절단", "비접촉 정밀 가공", "저비용 설비", "표면 경화"], correct: 1, explanation: "레이저 커팅은 비접촉 방식으로 열 영향을 최소화하며 정밀하게 절단합니다.", topic: "성형가공" },
  { id: 38, question: "용접 중 TIG 용접의 특징은?", options: ["소모성 전극", "불활성 가스+텅스텐 전극", "저품질", "두꺼운 판만 가능"], correct: 1, explanation: "TIG 용접은 비소모성 텅스텐 전극과 불활성 가스를 사용해 고품질 용접합니다.", topic: "성형가공" },

  // 표면처리 (12문항)
  { id: 39, question: "도금의 주된 목적은?", options: ["무게 증가", "내식성/장식성", "절연성", "흡음성"], correct: 1, explanation: "도금은 금속 표면에 다른 금속을 얇게 입혀 내식성, 장식성을 부여합니다.", topic: "표면처리" },
  { id: 40, question: "크롬 도금의 특성은?", options: ["연질", "높은 경도와 광택", "흡수성", "절연성"], correct: 1, explanation: "크롬 도금은 높은 경도, 내마모성, 광택이 특징입니다.", topic: "표면처리" },
  { id: 41, question: "분체 도장의 장점은?", options: ["VOC 배출", "두꺼운 도막/친환경", "저온 경화", "수용성 필요"], correct: 1, explanation: "분체 도장은 용제가 없어 친환경적이고, 두꺼운 도막을 형성합니다.", topic: "표면처리" },
  { id: 42, question: "양극산화 후 염색이 가능한 이유는?", options: ["표면 금속화", "다공성 산화피막 형성", "표면 연화", "전도성 증가"], correct: 1, explanation: "양극산화로 형성된 다공성 산화피막에 염료가 흡수되어 착색됩니다.", topic: "표면처리" },
  { id: 43, question: "샌드블라스팅의 목적은?", options: ["광택 부여", "표면 거칠기 부여/청소", "도금", "용접"], correct: 1, explanation: "샌드블라스팅은 모래 등을 분사하여 표면을 거칠게 만들거나 이물질을 제거합니다.", topic: "표면처리" },
  { id: 44, question: "진공증착(PVD)의 특징은?", options: ["두꺼운 피막", "진공에서 얇은 금속막 형성", "상온 도금", "화학반응 이용"], correct: 1, explanation: "PVD는 진공에서 금속을 증발시켜 얇고 균일한 피막을 형성합니다.", topic: "표면처리" },
  { id: 45, question: "전착도장(E-Coating)의 원리는?", options: ["분사", "전기영동", "침적", "열경화만"], correct: 1, explanation: "전착도장은 도료 입자가 전기장에 의해 피도물에 달라붙는 전기영동 원리를 이용합니다.", topic: "표면처리" },
  { id: 46, question: "헤어라인 마감이란?", options: ["거울 광택", "가는 선 무늬", "매트 마감", "무늬 프레스"], correct: 1, explanation: "헤어라인은 금속 표면에 머리카락처럼 가는 직선 무늬를 낸 마감입니다.", topic: "표면처리" },
  { id: 47, question: "소프트터치 코팅의 특징은?", options: ["딱딱함", "부드러운 촉감", "광택 증가", "투명화"], correct: 1, explanation: "소프트터치 코팅은 고무 같은 부드러운 촉감을 주어 그립감을 향상시킵니다.", topic: "표면처리" },
  { id: 48, question: "UV 코팅의 경화 원리는?", options: ["열경화", "자외선 경화", "상온 건조", "수분 경화"], correct: 1, explanation: "UV 코팅은 자외선 조사에 의해 순간 경화되어 빠른 생산과 높은 경도를 얻습니다.", topic: "표면처리" },
  { id: 49, question: "실크스크린 인쇄의 특징은?", options: ["사진 인쇄 전용", "스크린 판을 통한 인쇄", "활자 인쇄", "레이저 인쇄"], correct: 1, explanation: "실크스크린은 메쉬 스크린의 구멍을 통해 잉크를 밀어내어 인쇄하는 방식입니다.", topic: "표면처리" },
  { id: 50, question: "패드 인쇄의 특징은?", options: ["평면만 인쇄", "곡면에도 인쇄 가능", "대면적 전용", "직접 인쇄"], correct: 1, explanation: "패드 인쇄는 실리콘 패드를 이용하여 곡면이나 요철면에도 인쇄할 수 있습니다.", topic: "표면처리" }
];

export default function MaterialProcessPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('pdt-material-process-progress');
    if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); }
  }, []);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index); setShowExplanation(true);
    const newAnswered = new Set(answeredQuestions); newAnswered.add(currentQuestion); setAnsweredQuestions(newAnswered);
    let newScore = score; if (index === questions[currentQuestion].correct) { newScore = score + 1; setScore(newScore); }
    localStorage.setItem('pdt-material-process-progress', JSON.stringify({ answered: Array.from(newAnswered), score: newScore }));
  };

  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowExplanation(false); } else { setShowResult(true); } };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setShowExplanation(false); setAnsweredQuestions(new Set()); localStorage.removeItem('pdt-material-process-progress'); };
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const getAISearchUrl = (question: string, topic: string, aiType: string) => { const q = encodeURIComponent(`${topic} ${question} 제품디자인산업기사`); return aiType === 'claude' ? `https://claude.ai/new?q=${q}` : aiType === 'chatgpt' ? `https://chat.openai.com/?q=${q}` : `https://gemini.google.com/?q=${q}`; };

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div></div>;

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8"><div className="max-w-2xl mx-auto px-4"><div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h2>
        <div className="mb-6"><div className="text-6xl font-bold text-teal-600 mb-2">{score}/{questions.length}</div><div className="text-xl text-gray-600">정답률: {pct}%</div></div>
        <div className="mb-8">{pct >= 80 ? <p className="text-green-600 font-semibold">훌륭합니다!</p> : pct >= 60 ? <p className="text-yellow-600 font-semibold">좋아요!</p> : <p className="text-red-600 font-semibold">더 학습이 필요해요!</p>}</div>
        <div className="flex gap-4 justify-center"><button onClick={resetQuiz} className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">다시 시작</button><Link href="/category/design/product-design-technician" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold">돌아가기</Link></div>
      </div></div></div>
    );
  }

  const q = questions[currentQuestion];
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6"><Link href="/category/design/product-design-technician" className="inline-flex items-center text-teal-600 hover:text-teal-800"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>제품디자인산업기사 홈으로</Link></div>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">재료 및 공정</h1><span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">{currentQuestion + 1} / {questions.length}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8"><div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
          <div className="mb-8"><span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm mb-4">{q.topic}</span><h2 className="text-xl font-semibold text-gray-800">{q.question}</h2></div>
          <div className="space-y-3 mb-8">{q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null} className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedAnswer === null ? 'border-gray-200 hover:border-teal-400 hover:bg-teal-50' : selectedAnswer === i ? i === q.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800' : i === q.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
              <div className="flex items-center"><span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-semibold ${selectedAnswer === null ? 'bg-gray-200 text-gray-700' : selectedAnswer === i ? i === q.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white' : i === q.correct ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</span><span className="font-medium">{opt}</span></div>
            </button>
          ))}</div>
          {showExplanation && (
            <div className={`p-6 rounded-xl mb-6 ${selectedAnswer === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start"><div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedAnswer === q.correct ? 'bg-green-500' : 'bg-red-500'}`}>{selectedAnswer === q.correct ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}</div><div><p className={`font-semibold mb-1 ${selectedAnswer === q.correct ? 'text-green-800' : 'text-red-800'}`}>{selectedAnswer === q.correct ? '정답입니다!' : '틀렸습니다!'}</p><p className="text-gray-700">{q.explanation}</p></div></div>
              <div className="mt-4 pt-4 border-t border-gray-200"><p className="text-sm text-gray-600 mb-2">AI에게 더 물어보기:</p><div className="flex gap-2"><a href={getAISearchUrl(q.question, q.topic, 'claude')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200">Claude</a><a href={getAISearchUrl(q.question, q.topic, 'chatgpt')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">ChatGPT</a><a href={getAISearchUrl(q.question, q.topic, 'gemini')} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">Gemini</a></div></div>
            </div>
          )}
          {selectedAnswer !== null && <button onClick={nextQuestion} className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 shadow-lg">{currentQuestion < questions.length - 1 ? '다음 문제' : '결과 보기'}</button>}
        </div>
        <div className="grid grid-cols-10 gap-2">{questions.map((_, i) => <button key={i} onClick={() => { setCurrentQuestion(i); setSelectedAnswer(null); setShowExplanation(false); }} className={`w-full aspect-square rounded-lg font-medium text-sm ${i === currentQuestion ? 'bg-teal-600 text-white' : answeredQuestions.has(i) ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>)}</div>
      </div>
    </div>
  );
}
