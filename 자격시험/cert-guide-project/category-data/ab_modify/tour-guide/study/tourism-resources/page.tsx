'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TourismResourcesStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '유네스코 유산', count: 10 },
    { id: 1, name: '서울·경기 관광지', count: 10 },
    { id: 2, name: '지방 관광지', count: 10 },
    { id: 3, name: '자연 관광자원', count: 10 },
    { id: 4, name: '관광해설 기법', count: 10 },
  ];

  const questions = [
    // 유네스코 유산 (10문항)
    { id: 1, topic: 0, question: "한국 최초의 유네스코 세계유산은?", options: ["경주역사유적지구", "해인사 장경판전", "종묘", "석굴암·불국사"], answer: 3 },
    { id: 2, topic: 0, question: "팔만대장경이 보관된 해인사 장경판전이 세계유산으로 등재된 이유는?", options: ["건물 크기", "목판 보존 과학적 설계", "위치", "역사"], answer: 1 },
    { id: 3, topic: 0, question: "종묘가 세계유산인 이유는?", options: ["왕의 거주지", "조선 왕실 제례 공간", "군사 시설", "교육 기관"], answer: 1 },
    { id: 4, topic: 0, question: "수원 화성이 세계유산으로 평가받는 이유는?", options: ["가장 오래됨", "동서양 축성술 결합", "가장 큼", "목조 건축"], answer: 1 },
    { id: 5, topic: 0, question: "한국의 서원 중 유네스코 등재되지 않은 것은?", options: ["소수서원", "도산서원", "성균관", "옥산서원"], answer: 2 },
    { id: 6, topic: 0, question: "백제역사유적지구에 포함되지 않는 곳은?", options: ["공주", "부여", "익산", "경주"], answer: 3 },
    { id: 7, topic: 0, question: "산사, 한국의 산지 승원에 포함된 사찰이 아닌 것은?", options: ["통도사", "해인사", "불국사", "봉정사"], answer: 2 },
    { id: 8, topic: 0, question: "한국의 갯벌이 세계유산으로 등재된 해는?", options: ["2018년", "2021년", "2023년", "2019년"], answer: 1 },
    { id: 9, topic: 0, question: "유네스코 인류무형문화유산이 아닌 것은?", options: ["판소리", "강강술래", "종묘제례악", "한국 영화"], answer: 3 },
    { id: 10, topic: 0, question: "창덕궁이 세계유산으로 등재된 주요 이유는?", options: ["크기", "자연과 조화된 건축", "군사 시설", "종교 건물"], answer: 1 },

    // 서울·경기 관광지 (10문항)
    { id: 11, topic: 1, question: "경복궁의 정문 이름은?", options: ["광화문", "창경문", "동화문", "돈화문"], answer: 0 },
    { id: 12, topic: 1, question: "창덕궁의 대표적인 정원은?", options: ["낙원", "비원(후원)", "창경원", "덕수궁 정원"], answer: 1 },
    { id: 13, topic: 1, question: "덕수궁 앞에서 하는 전통 행사는?", options: ["종묘제례", "수문장 교대식", "대동놀이", "강강술래"], answer: 1 },
    { id: 14, topic: 1, question: "북촌한옥마을이 위치한 곳은?", options: ["종로구", "중구", "용산구", "강남구"], answer: 0 },
    { id: 15, topic: 1, question: "남산타워의 정식 명칭은?", options: ["서울타워", "N서울타워", "남산전망대", "서울랜드마크"], answer: 1 },
    { id: 16, topic: 1, question: "인사동의 특징은?", options: ["현대 쇼핑", "전통문화·공예품 거리", "금융 중심지", "대학가"], answer: 1 },
    { id: 17, topic: 1, question: "DMZ가 의미하는 것은?", options: ["대도시 구역", "비무장지대", "산업단지", "관광특구"], answer: 1 },
    { id: 18, topic: 1, question: "수원 화성을 건설한 조선 왕은?", options: ["세종", "영조", "정조", "고종"], answer: 2 },
    { id: 19, topic: 1, question: "이태원의 특징은?", options: ["한옥마을", "다문화·외국인 거리", "고궁", "대학가"], answer: 1 },
    { id: 20, topic: 1, question: "명동의 특징은?", options: ["역사 유적지", "쇼핑·뷰티 중심지", "자연 관광지", "박물관 거리"], answer: 1 },

    // 지방 관광지 (10문항)
    { id: 21, topic: 2, question: "경주 석굴암의 본존불은?", options: ["미륵불", "석가여래좌상", "관음보살", "약사불"], answer: 1 },
    { id: 22, topic: 2, question: "불국사의 대표적인 탑은?", options: ["다보탑과 석가탑", "원각사지탑", "미륵사지탑", "정림사지탑"], answer: 0 },
    { id: 23, topic: 2, question: "안동 하회마을의 특징은?", options: ["해변 마을", "양반 문화 전통 마을", "어촌", "산촌"], answer: 1 },
    { id: 24, topic: 2, question: "전주한옥마을에서 유명한 음식은?", options: ["냉면", "비빔밥", "삼계탕", "갈비"], answer: 1 },
    { id: 25, topic: 2, question: "부산의 대표 해수욕장은?", options: ["정동진", "해운대", "경포대", "만리포"], answer: 1 },
    { id: 26, topic: 2, question: "감천문화마을이 있는 도시는?", options: ["대구", "부산", "광주", "대전"], answer: 1 },
    { id: 27, topic: 2, question: "강릉의 대표 관광지가 아닌 것은?", options: ["경포대", "오죽헌", "정동진", "해운대"], answer: 3 },
    { id: 28, topic: 2, question: "순천만의 특징은?", options: ["해수욕장", "갯벌·습지 생태관광지", "스키장", "온천"], answer: 1 },
    { id: 29, topic: 2, question: "공주와 부여의 공통점은?", options: ["신라 유적", "백제 유적", "고구려 유적", "조선 유적"], answer: 1 },
    { id: 30, topic: 2, question: "여수의 야경 명소는?", options: ["여수밤바다", "해운대", "정동진", "경포대"], answer: 0 },

    // 자연 관광자원 (10문항)
    { id: 31, topic: 3, question: "한라산이 위치한 곳은?", options: ["강원도", "경상도", "제주도", "전라도"], answer: 2 },
    { id: 32, topic: 3, question: "설악산의 대표 봉우리는?", options: ["백두산", "대청봉", "천왕봉", "비로봉"], answer: 1 },
    { id: 33, topic: 3, question: "지리산이 걸쳐 있는 도가 아닌 것은?", options: ["전라남도", "전라북도", "경상남도", "강원도"], answer: 3 },
    { id: 34, topic: 3, question: "제주도 성산일출봉의 특징은?", options: ["온천", "해식동굴", "응회환(화산지형)", "폭포"], answer: 2 },
    { id: 35, topic: 3, question: "만장굴은 무엇으로 유명한가?", options: ["온천", "용암동굴", "해수욕장", "폭포"], answer: 1 },
    { id: 36, topic: 3, question: "담양의 대표 자연 관광지는?", options: ["죽녹원(대나무숲)", "해운대", "설악산", "한라산"], answer: 0 },
    { id: 37, topic: 3, question: "보성의 특산물과 관광지는?", options: ["사과 농장", "녹차밭", "포도밭", "배 농장"], answer: 1 },
    { id: 38, topic: 3, question: "울릉도의 대표 자연 관광지는?", options: ["성인봉", "한라산", "설악산", "지리산"], answer: 0 },
    { id: 39, topic: 3, question: "동해안의 일출 명소가 아닌 것은?", options: ["정동진", "간절곶", "호미곶", "서해대교"], answer: 3 },
    { id: 40, topic: 3, question: "내장산이 유명한 계절은?", options: ["봄", "여름", "가을(단풍)", "겨울"], answer: 2 },

    // 관광해설 기법 (10문항)
    { id: 41, topic: 4, question: "관광해설의 목적이 아닌 것은?", options: ["정보 전달", "흥미 유발", "물건 판매", "문화 이해 증진"], answer: 2 },
    { id: 42, topic: 4, question: "효과적인 관광해설 기법은?", options: ["일방적 설명", "스토리텔링", "암기식 낭독", "빠른 설명"], answer: 1 },
    { id: 43, topic: 4, question: "관광객과의 소통에서 중요한 것은?", options: ["무표정", "아이컨택과 경청", "빠른 진행", "무시"], answer: 1 },
    { id: 44, topic: 4, question: "문화유산 해설 시 주의할 점은?", options: ["과장된 설명", "정확한 역사적 사실 전달", "개인 의견만", "빠른 진행만"], answer: 1 },
    { id: 45, topic: 4, question: "다국적 관광객 대응 시 고려할 점은?", options: ["한국어만 사용", "문화적 다양성 존중", "무시", "한 언어만 집중"], answer: 1 },
    { id: 46, topic: 4, question: "관광지에서 안전 관련 안내 시 중요한 것은?", options: ["생략", "명확하고 반복적 안내", "빠르게 지나감", "무시"], answer: 1 },
    { id: 47, topic: 4, question: "돌발 상황(날씨, 일정 변경) 대처법은?", options: ["당황", "유연한 대안 제시", "무시", "여행 취소"], answer: 1 },
    { id: 48, topic: 4, question: "관광객 불만 처리의 첫 단계는?", options: ["변명", "경청과 공감", "무시", "책임 전가"], answer: 1 },
    { id: 49, topic: 4, question: "좋은 관광해설의 특징이 아닌 것은?", options: ["명확한 발음", "적절한 유머", "지루한 단조로움", "열정적 태도"], answer: 2 },
    { id: 50, topic: 4, question: "관광해설 마무리 시 해야 할 것은?", options: ["바로 퇴장", "감사 인사와 질의응답", "물건 판매", "다음 일정 무시"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('tour-guide-tourism-resources-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tour-guide-tourism-resources-progress', JSON.stringify({
      score,
      answered: Array.from(answeredQuestions)
    }));
  }, [score, answeredQuestions]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const current = filteredQuestions[currentQuestion];
    if (!answeredQuestions.has(current.id)) {
      if (index === current.answer) {
        setScore(prev => prev + 1);
      }
      setAnsweredQuestions(prev => new Set([...prev, current.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setScore(0);
    setAnsweredQuestions(new Set());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    localStorage.removeItem('tour-guide-tourism-resources-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`관광통역안내사 관광자원해설: ${question}`);
    switch (ai) {
      case 'claude': return `https://claude.ai/new?q=${query}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${query}`;
      case 'gemini': return `https://gemini.google.com/?q=${query}`;
      default: return '#';
    }
  };

  const current = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/tour-guide/exam" className="text-emerald-600 hover:text-emerald-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-teal-500 hover:text-teal-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🏛️ 관광자원해설</h1>
          <p className="text-gray-500">유네스코 유산, 관광지, 해설 기법</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-emerald-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <p className="text-emerald-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-emerald-600 hover:text-emerald-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{answeredQuestions.size} / {questions.length} 문제 완료</p>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestionForAI}</p>
            <div className="space-y-2">
              <a href={getAISearchUrl('claude', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">Claude에게 질문하기</a>
              <a href={getAISearchUrl('chatgpt', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-green-100 text-green-700 rounded-xl text-center font-medium hover:bg-green-200 transition">ChatGPT에게 질문하기</a>
              <a href={getAISearchUrl('gemini', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 p-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
