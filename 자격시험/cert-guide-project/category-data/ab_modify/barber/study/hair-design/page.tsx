'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HairDesignStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '얼굴형 분석', count: 10 },
    { id: 1, name: '헤어스타일 디자인', count: 10 },
    { id: 2, name: '트렌드 스타일', count: 10 },
    { id: 3, name: '스타일링 기법', count: 10 },
    { id: 4, name: '제품 활용', count: 10 },
  ];

  const questions = [
    // 얼굴형 분석 (10문항)
    { id: 1, topic: 0, question: "얼굴형 분석의 목적은?", options: ["시간 단축", "어울리는 스타일 제안", "요금 책정", "도구 선택"], answer: 1 },
    { id: 2, topic: 0, question: "둥근 얼굴형의 특징은?", options: ["길이가 길다", "가로와 세로 비율이 비슷", "각이 있다", "삼각형 형태"], answer: 1 },
    { id: 3, topic: 0, question: "둥근 얼굴형에 어울리는 스타일은?", options: ["옆으로 볼륨", "윗머리 볼륨으로 길어 보이게", "전체 동글게", "양옆 풍성하게"], answer: 1 },
    { id: 4, topic: 0, question: "긴 얼굴형에 어울리는 스타일은?", options: ["윗머리 높이", "옆으로 볼륨, 위는 낮게", "세로로 길게", "완전 삭발"], answer: 1 },
    { id: 5, topic: 0, question: "사각 얼굴형의 특징은?", options: ["둥근 턱선", "각진 턱선과 넓은 이마", "좁은 이마", "뾰족한 턱"], answer: 1 },
    { id: 6, topic: 0, question: "사각 얼굴형에 어울리는 스타일은?", options: ["각진 스타일", "부드러운 라인과 볼륨감", "일자 앞머리", "완전 삭발"], answer: 1 },
    { id: 7, topic: 0, question: "역삼각형 얼굴형의 특징은?", options: ["넓은 턱", "넓은 이마, 좁은 턱", "둥근 얼굴", "긴 얼굴"], answer: 1 },
    { id: 8, topic: 0, question: "역삼각형 얼굴형에 어울리는 스타일은?", options: ["이마 강조", "아래쪽에 볼륨감 부여", "윗머리만 볼륨", "삭발"], answer: 1 },
    { id: 9, topic: 0, question: "계란형 얼굴형의 특징은?", options: ["각진 턱", "이상적인 비율, 균형 잡힌 형태", "넓은 이마만", "좁은 이마만"], answer: 1 },
    { id: 10, topic: 0, question: "계란형 얼굴형에 어울리는 스타일은?", options: ["특정 스타일만", "다양한 스타일 가능", "삭발만", "긴 머리만"], answer: 1 },

    // 헤어스타일 디자인 (10문항)
    { id: 11, topic: 1, question: "헤어디자인의 기본 요소가 아닌 것은?", options: ["형태(Form)", "질감(Texture)", "색상(Color)", "가격(Price)"], answer: 3 },
    { id: 12, topic: 1, question: "실루엣이란?", options: ["머리 색상", "헤어스타일의 외곽선", "머리 길이", "머리 숱"], answer: 1 },
    { id: 13, topic: 1, question: "볼륨감을 주는 방법이 아닌 것은?", options: ["레이어 커트", "드라이 기법", "숱 많이 치기", "루트 볼륨 스타일링"], answer: 2 },
    { id: 14, topic: 1, question: "대칭 디자인의 특징은?", options: ["역동적", "안정적이고 클래식한 느낌", "비대칭만", "개성적"], answer: 1 },
    { id: 15, topic: 1, question: "비대칭 디자인의 효과는?", options: ["안정감", "역동적이고 개성있는 느낌", "클래식함", "보수적"], answer: 1 },
    { id: 16, topic: 1, question: "디자인에서 선(Line)의 역할은?", options: ["장식", "방향성과 움직임 표현", "색상 변화", "길이만"], answer: 1 },
    { id: 17, topic: 1, question: "컬러와 헤어디자인의 관계는?", options: ["무관함", "입체감과 분위기 변화", "길이만 영향", "형태만 영향"], answer: 1 },
    { id: 18, topic: 1, question: "질감(Texture)이 헤어스타일에 미치는 영향은?", options: ["색상 변화", "촉감과 시각적 느낌 변화", "길이 변화", "무관함"], answer: 1 },
    { id: 19, topic: 1, question: "헤어디자인 시 고려해야 할 것은?", options: ["트렌드만", "고객 얼굴형, 모발 상태, 라이프스타일", "가격만", "시간만"], answer: 1 },
    { id: 20, topic: 1, question: "균형(Balance)의 원리란?", options: ["한쪽만 강조", "시각적 안정감과 조화", "불균형", "비대칭만"], answer: 1 },

    // 트렌드 스타일 (10문항)
    { id: 21, topic: 2, question: "페이드 커트가 유행하는 이유는?", options: ["오래된 스타일", "깔끔하고 세련된 느낌", "관리 어려움", "비용 저렴"], answer: 1 },
    { id: 22, topic: 2, question: "텍스처 페이드의 특징은?", options: ["층 없음", "질감 있는 윗머리와 페이드", "일자 라인", "긴 머리"], answer: 1 },
    { id: 23, topic: 2, question: "슬릭백 스타일이란?", options: ["앞으로 넘김", "뒤로 넘기는 클래식 스타일", "옆으로만", "삭발"], answer: 1 },
    { id: 24, topic: 2, question: "퀴프(Quiff) 스타일의 특징은?", options: ["평평함", "앞머리를 위로 올린 볼륨감", "완전 밀착", "뒤로만 넘김"], answer: 1 },
    { id: 25, topic: 2, question: "콤보버(Combover)의 특징은?", options: ["삭발", "한쪽으로 가르마와 넘김", "양쪽 대칭", "뒤로 넘김"], answer: 1 },
    { id: 26, topic: 2, question: "포마드 스타일에 어울리는 제품은?", options: ["무스", "포마드, 젤", "스프레이만", "오일만"], answer: 1 },
    { id: 27, topic: 2, question: "내추럴 스타일의 특징은?", options: ["강한 고정", "자연스럽고 힘주지 않은 느낌", "젤 많이 사용", "완전 고정"], answer: 1 },
    { id: 28, topic: 2, question: "모히칸 스타일의 특징은?", options: ["전체 긴 머리", "중앙만 길고 양옆 짧거나 삭발", "양옆만 길게", "뒤만 길게"], answer: 1 },
    { id: 29, topic: 2, question: "K-스타일 남자 헤어의 특징은?", options: ["삭발", "자연스럽고 부드러운 볼륨감", "강한 젤 스타일", "펑크 스타일"], answer: 1 },
    { id: 30, topic: 2, question: "클래식 사이드 파트의 특징은?", options: ["비대칭", "정돈된 가르마와 깔끔함", "펑크", "삭발"], answer: 1 },

    // 스타일링 기법 (10문항)
    { id: 31, topic: 3, question: "드라이 스타일링의 기본 원리는?", options: ["차가운 바람", "열과 바람으로 형태 만들기", "물만 사용", "제품만 사용"], answer: 1 },
    { id: 32, topic: 3, question: "볼륨을 주는 드라이 방향은?", options: ["모발 결대로", "모발 결 반대 방향(루트 들어올림)", "아래로만", "옆으로만"], answer: 1 },
    { id: 33, topic: 3, question: "아이롱 스타일링의 목적은?", options: ["커트", "열로 웨이브나 직모 연출", "염색", "탈색"], answer: 1 },
    { id: 34, topic: 3, question: "고데기 사용 시 적정 온도는?", options: ["최고 온도", "모발 상태에 맞는 중간 온도", "최저 온도", "온도 무관"], answer: 1 },
    { id: 35, topic: 3, question: "자연스러운 웨이브를 위한 아이롱 기법은?", options: ["꽉 감기", "느슨하게 감아 빼기", "고정 오래", "젤 많이 사용"], answer: 1 },
    { id: 36, topic: 3, question: "핸드 드라이의 장점은?", options: ["강한 고정", "자연스러운 볼륨과 움직임", "완전 고정", "젤 같은 느낌"], answer: 1 },
    { id: 37, topic: 3, question: "롤 브러시 사용의 효과는?", options: ["숱 조절", "볼륨감과 라운드한 곡선", "길이 조절", "색상 변화"], answer: 1 },
    { id: 38, topic: 3, question: "스타일링 전 모발 상태는?", options: ["완전 건조", "80% 정도 건조 상태가 이상적", "완전 젖음", "상태 무관"], answer: 1 },
    { id: 39, topic: 3, question: "차가운 바람(쿨샷)의 역할은?", options: ["형태 만들기", "스타일 고정", "볼륨 만들기", "무관함"], answer: 1 },
    { id: 40, topic: 3, question: "빗질 방향이 스타일에 미치는 영향은?", options: ["무관함", "흐름과 방향성 결정", "색상 변화", "길이 변화"], answer: 1 },

    // 제품 활용 (10문항)
    { id: 41, topic: 4, question: "왁스의 주요 특징은?", options: ["강한 고정", "자연스러운 질감과 중간 고정", "광택만", "보습만"], answer: 1 },
    { id: 42, topic: 4, question: "포마드의 특징은?", options: ["무광", "윤기와 강한 고정력", "가벼움", "숱 조절"], answer: 1 },
    { id: 43, topic: 4, question: "무스의 사용 목적은?", options: ["강한 고정", "가벼운 볼륨감 부여", "색상 변화", "면도"], answer: 1 },
    { id: 44, topic: 4, question: "젤의 특징은?", options: ["자연스러움", "강한 고정과 윤기", "무광", "가벼움만"], answer: 1 },
    { id: 45, topic: 4, question: "매트 왁스의 특징은?", options: ["강한 윤기", "무광 마무리", "젖은 느낌", "물처럼 가벼움"], answer: 1 },
    { id: 46, topic: 4, question: "헤어스프레이의 용도는?", options: ["볼륨만", "스타일 마무리 및 고정", "색상 변화", "트리트먼트"], answer: 1 },
    { id: 47, topic: 4, question: "클레이 왁스의 특징은?", options: ["물같이 가벼움", "매트하고 텍스처 표현 좋음", "강한 윤기", "젤같은 고정"], answer: 1 },
    { id: 48, topic: 4, question: "헤어오일의 주요 기능은?", options: ["강한 고정", "윤기와 보습", "탈색", "커트"], answer: 1 },
    { id: 49, topic: 4, question: "제품 선택 시 고려할 점은?", options: ["가격만", "모발 타입과 원하는 스타일", "브랜드만", "향만"], answer: 1 },
    { id: 50, topic: 4, question: "스타일링 제품 적정 사용량은?", options: ["많을수록 좋음", "소량부터 시작, 필요시 추가", "항상 동일", "제품마다 무관"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('barber-hair-design-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('barber-hair-design-progress', JSON.stringify({
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
    localStorage.removeItem('barber-hair-design-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`이용사 헤어디자인: ${question}`);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/barber/exam" className="text-slate-600 hover:text-slate-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-blue-500 hover:text-blue-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💈 헤어디자인</h1>
          <p className="text-gray-500">얼굴형 분석, 스타일 디자인, 트렌드, 스타일링</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-slate-50 hover:border-slate-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-slate-600 hover:text-slate-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-slate-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-slate-600 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
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
