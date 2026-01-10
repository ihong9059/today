'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HairCuttingStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '클리퍼 기법', count: 10 },
    { id: 1, name: '시저스 커트', count: 10 },
    { id: 2, name: '레이어 커트', count: 10 },
    { id: 3, name: '투블럭 커트', count: 10 },
    { id: 4, name: '스포츠 커트', count: 10 },
  ];

  const questions = [
    // 클리퍼 기법 (10문항)
    { id: 1, topic: 0, question: "클리퍼 사용 시 기본 방향은?", options: ["모발 결 방향", "모발 결 반대 방향(역방향)", "좌우 방향", "무관"], answer: 1 },
    { id: 2, topic: 0, question: "클리퍼의 날 길이 조절 기능을 무엇이라 하는가?", options: ["레버", "어태치먼트", "두 가지 모두", "조절기"], answer: 2 },
    { id: 3, topic: 0, question: "페이드 커트의 특징은?", options: ["일정한 길이", "자연스러운 그라데이션", "완전 삭발", "긴 머리만"], answer: 1 },
    { id: 4, topic: 0, question: "로우 페이드의 그라데이션 시작 위치는?", options: ["정수리", "귀 위", "귀 아래~귀선", "목선"], answer: 2 },
    { id: 5, topic: 0, question: "하이 페이드의 그라데이션 시작 위치는?", options: ["귀 아래", "관자놀이~정수리 사이", "목선", "귀선"], answer: 1 },
    { id: 6, topic: 0, question: "클리퍼 오일링의 목적은?", options: ["소리 감소", "날 마모 방지 및 부드러운 작동", "모양 변경", "색상 유지"], answer: 1 },
    { id: 7, topic: 0, question: "테이퍼링 기법이란?", options: ["균일 커트", "점진적으로 짧아지는 기법", "숱 치기", "레이어링"], answer: 1 },
    { id: 8, topic: 0, question: "클리퍼 가드 0번의 길이는?", options: ["3mm", "가드 없이 날만", "6mm", "12mm"], answer: 1 },
    { id: 9, topic: 0, question: "블렌딩 시 클리퍼 사용법은?", options: ["한 번에 자르기", "여러 번 가볍게 빗듯이", "세게 누르기", "고정 후 자르기"], answer: 1 },
    { id: 10, topic: 0, question: "스킨 페이드의 특징은?", options: ["긴 그라데이션", "피부가 보일 정도로 짧게 시작", "숱만 조절", "일정 길이 유지"], answer: 1 },

    // 시저스 커트 (10문항)
    { id: 11, topic: 1, question: "시저스 오버 콤 기법이란?", options: ["가위만 사용", "빗 위로 가위 커트", "클리퍼 사용", "숱가위 사용"], answer: 1 },
    { id: 12, topic: 1, question: "블런트 커트의 특징은?", options: ["층이 많음", "일자로 깔끔한 라인", "숱 조절", "그라데이션"], answer: 1 },
    { id: 13, topic: 1, question: "포인트 커팅의 목적은?", options: ["일자 라인", "자연스러운 끝처리와 질감", "완전 삭발", "길이만 조절"], answer: 1 },
    { id: 14, topic: 1, question: "슬라이드 커팅의 특징은?", options: ["직각으로 자름", "가위를 미끄러지듯 사용", "한 번에 자름", "클리퍼로 자름"], answer: 1 },
    { id: 15, topic: 1, question: "가위 잡는 올바른 손가락 위치는?", options: ["모든 손가락 사용", "엄지와 약지", "엄지와 검지", "검지와 중지"], answer: 1 },
    { id: 16, topic: 1, question: "커트 시 가이드 라인의 역할은?", options: ["장식용", "전체 커트의 기준", "시간 단축", "고객 요청"], answer: 1 },
    { id: 17, topic: 1, question: "텍스처라이징의 목적은?", options: ["길이 조절", "질감과 움직임 부여", "색상 변경", "볼륨 감소만"], answer: 1 },
    { id: 18, topic: 1, question: "노칭 기법이란?", options: ["일자 커트", "톱니 모양으로 잘라 질감 표현", "숱 조절만", "레이어만"], answer: 1 },
    { id: 19, topic: 1, question: "시저스 커트 시 머리카락을 잡는 각도의 중요성은?", options: ["무관함", "커트 라인과 볼륨에 영향", "속도에만 영향", "가위 수명에만 영향"], answer: 1 },
    { id: 20, topic: 1, question: "피봇 포인트란?", options: ["가위 날", "두상의 기준점", "빗의 끝", "클리퍼 날"], answer: 1 },

    // 레이어 커트 (10문항)
    { id: 21, topic: 2, question: "레이어 커트의 특징은?", options: ["일자 라인", "층을 내어 볼륨과 움직임 표현", "완전 삭발", "숱만 조절"], answer: 1 },
    { id: 22, topic: 2, question: "롱 레이어의 특징은?", options: ["층 차이가 큼", "층 차이가 적어 자연스러움", "층 없음", "삭발에 가까움"], answer: 1 },
    { id: 23, topic: 2, question: "숏 레이어의 특징은?", options: ["층 없음", "층 차이가 커서 볼륨감 강조", "일자 라인", "긴 머리 전용"], answer: 1 },
    { id: 24, topic: 2, question: "유니폼 레이어란?", options: ["불균일 레이어", "전체 길이가 동일한 레이어", "층 없음", "한쪽만 레이어"], answer: 1 },
    { id: 25, topic: 2, question: "레이어 커트 시 시작 섹션은?", options: ["옆머리", "뒷머리 아래(네이프)", "앞머리", "정수리"], answer: 1 },
    { id: 26, topic: 2, question: "90도 각도 레이어의 효과는?", options: ["무거움", "균일한 레이어와 자연스러운 볼륨", "층 없음", "완전 삭발"], answer: 1 },
    { id: 27, topic: 2, question: "180도 각도 레이어의 효과는?", options: ["층 없음", "강한 층과 많은 볼륨", "일자 라인", "무거운 느낌"], answer: 1 },
    { id: 28, topic: 2, question: "레이어 연결의 중요성은?", options: ["무관함", "자연스러운 실루엣 형성", "시간 단축", "도구 보호"], answer: 1 },
    { id: 29, topic: 2, question: "가벼운 느낌의 레이어를 위한 기법은?", options: ["블런트 커트", "텍스처라이징과 포인트 커팅", "일자 커트", "숱가위 생략"], answer: 1 },
    { id: 30, topic: 2, question: "레이어 커트의 유지 관리 주기는?", options: ["1년", "4~6주", "6개월", "유지 불필요"], answer: 1 },

    // 투블럭 커트 (10문항)
    { id: 31, topic: 3, question: "투블럭 커트의 특징은?", options: ["전체 동일 길이", "윗머리 길고 옆·뒷머리 짧음", "완전 삭발", "층 없음"], answer: 1 },
    { id: 32, topic: 3, question: "투블럭 라인의 위치 결정 기준은?", options: ["무조건 귀 위", "얼굴형과 고객 요구에 따라", "항상 동일", "뒷머리만"], answer: 1 },
    { id: 33, topic: 3, question: "투블럭에서 옆머리 처리 도구는?", options: ["가위만", "클리퍼 또는 가위", "빗만", "드라이어"], answer: 1 },
    { id: 34, topic: 3, question: "댄디 컷과 투블럭의 공통점은?", options: ["전체 긴 머리", "사이드와 백 짧게 처리", "파마 필수", "염색 필수"], answer: 1 },
    { id: 35, topic: 3, question: "투블럭 윗머리 길이 조절 시 주의점은?", options: ["무조건 짧게", "얼굴형에 맞는 볼륨과 길이", "길게만", "숱 조절 불필요"], answer: 1 },
    { id: 36, topic: 3, question: "투블럭 라인을 자연스럽게 연결하는 기법은?", options: ["일자 커트", "블렌딩 또는 그라데이션", "삭발", "레이어 생략"], answer: 1 },
    { id: 37, topic: 3, question: "투블럭 스타일링에 자주 사용하는 제품은?", options: ["샴푸만", "왁스, 포마드", "린스만", "오일만"], answer: 1 },
    { id: 38, topic: 3, question: "언더컷과 투블럭의 차이점은?", options: ["같은 스타일", "언더컷은 경계가 더 뚜렷함", "투블럭이 더 짧음", "차이 없음"], answer: 1 },
    { id: 39, topic: 3, question: "투블럭 유지를 위한 재방문 주기는?", options: ["6개월", "3~4주", "1년", "유지 불필요"], answer: 1 },
    { id: 40, topic: 3, question: "둥근 얼굴형에 투블럭 시 주의점은?", options: ["옆 볼륨 추가", "윗머리로 길이감 주기", "완전 삭발", "투블럭 비추천"], answer: 1 },

    // 스포츠 커트 (10문항)
    { id: 41, topic: 4, question: "스포츠 커트의 특징은?", options: ["긴 머리", "짧고 관리 편한 스타일", "파마 필수", "염색 필수"], answer: 1 },
    { id: 42, topic: 4, question: "크루 컷의 특징은?", options: ["긴 윗머리", "옆과 뒤 짧고 위는 약간 길게", "완전 삭발", "층 많음"], answer: 1 },
    { id: 43, topic: 4, question: "버즈 컷이란?", options: ["긴 스타일", "클리퍼로 전체 균일하게 짧게", "레이어 커트", "파마 스타일"], answer: 1 },
    { id: 44, topic: 4, question: "아이비리그 커트의 특징은?", options: ["삭발", "클래식하고 단정한 스타일", "긴 머리", "펑크 스타일"], answer: 1 },
    { id: 45, topic: 4, question: "스포츠 커트의 장점은?", options: ["스타일링 복잡", "세척·관리 용이, 시원함", "유지 어려움", "비용 높음"], answer: 1 },
    { id: 46, topic: 4, question: "밀리터리 컷의 유래는?", options: ["패션계", "군대", "연예계", "스포츠계"], answer: 1 },
    { id: 47, topic: 4, question: "스포츠 커트 시 클리퍼 가드 선택 기준은?", options: ["무조건 0번", "고객 원하는 길이에 맞게", "무조건 길게", "가드 없이만"], answer: 1 },
    { id: 48, topic: 4, question: "시저 컷 스포츠 스타일의 특징은?", options: ["클리퍼만 사용", "가위로 자연스럽게 짧게", "긴 머리", "파마"], answer: 1 },
    { id: 49, topic: 4, question: "스포츠 커트 후 마무리 방법은?", options: ["왁스 많이", "자연스럽게 또는 가볍게 스타일링", "무조건 고정", "스타일링 불필요만"], answer: 1 },
    { id: 50, topic: 4, question: "여름철 스포츠 커트 수요가 높은 이유는?", options: ["패션 트렌드", "시원함과 관리 편의성", "의무 사항", "가격 할인"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('barber-hair-cutting-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('barber-hair-cutting-progress', JSON.stringify({
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
    localStorage.removeItem('barber-hair-cutting-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`이용사 커트기법: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">✂️ 커트기법</h1>
          <p className="text-gray-500">클리퍼, 시저스, 레이어, 투블럭, 스포츠 커트</p>
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
