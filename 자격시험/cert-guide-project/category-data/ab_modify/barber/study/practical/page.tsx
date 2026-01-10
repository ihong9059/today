'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '기본 커트', count: 10 },
    { id: 1, name: '스포츠 커트', count: 10 },
    { id: 2, name: '면도 실기', count: 10 },
    { id: 3, name: '아이롱 실기', count: 10 },
    { id: 4, name: '위생·준비', count: 10 },
  ];

  const questions = [
    // 기본 커트 (10문항)
    { id: 1, topic: 0, question: "기본 커트 실기에서 첫 번째 단계는?", options: ["바로 커트", "고객 상담 및 스타일 확인", "면도", "아이롱"], answer: 1 },
    { id: 2, topic: 0, question: "마네킹 고정 시 주의점은?", options: ["흔들리게", "안정적으로 고정", "눕혀서", "거꾸로"], answer: 1 },
    { id: 3, topic: 0, question: "커트 전 모발 상태 확인 항목은?", options: ["색상만", "길이·두께·모질 확인", "향만", "가격만"], answer: 1 },
    { id: 4, topic: 0, question: "섹션(구획) 나누기의 목적은?", options: ["장식", "체계적이고 균일한 커트", "시간 낭비", "어려움 증가"], answer: 1 },
    { id: 5, topic: 0, question: "가이드 라인 설정의 중요성은?", options: ["불필요", "전체 커트의 기준이 됨", "장식용", "시간만 소요"], answer: 1 },
    { id: 6, topic: 0, question: "시저스 오버 콤 시 빗의 각도는?", options: ["90도 고정", "원하는 길이에 맞춰 조절", "수평만", "수직만"], answer: 1 },
    { id: 7, topic: 0, question: "클리퍼 사용 시 모발 상태는?", options: ["젖은 상태", "건조한 상태가 기본", "상태 무관", "오일 바른 상태"], answer: 1 },
    { id: 8, topic: 0, question: "커트 중 텐션(당김) 조절의 중요성은?", options: ["무관함", "균일한 길이와 깔끔한 라인", "빠른 작업만", "도구 보호"], answer: 1 },
    { id: 9, topic: 0, question: "마무리 단계에서 확인할 것은?", options: ["바로 종료", "전체 균형·대칭·마무리 점검", "요금만", "다음 고객"], answer: 1 },
    { id: 10, topic: 0, question: "기본 커트 실기 시간 배분 팁은?", options: ["시간 무시", "단계별 시간 배분 연습", "빠르게만", "천천히만"], answer: 1 },

    // 스포츠 커트 (10문항)
    { id: 11, topic: 1, question: "스포츠 커트 실기의 특징은?", options: ["긴 머리", "짧고 깔끔한 스타일 연출", "파마", "염색"], answer: 1 },
    { id: 12, topic: 1, question: "클리퍼 가드 선택 기준은?", options: ["무조건 0번", "원하는 길이에 맞게 선택", "무조건 높은 번호", "가드 없이만"], answer: 1 },
    { id: 13, topic: 1, question: "페이드 그라데이션 시작 위치 결정은?", options: ["무조건 동일", "스타일에 따라 로우·미드·하이 결정", "무조건 아래", "무조건 위"], answer: 1 },
    { id: 14, topic: 1, question: "블렌딩 시 클리퍼 동작은?", options: ["한 번에 깊게", "가볍게 여러 번 빗듯이", "고정", "세게 누르기"], answer: 1 },
    { id: 15, topic: 1, question: "스포츠 커트에서 윗머리 처리 도구는?", options: ["클리퍼만", "클리퍼와 가위 병행 가능", "빗만", "드라이어"], answer: 1 },
    { id: 16, topic: 1, question: "네이프(목선) 정리 시 주의점은?", options: ["무시", "깔끔한 라인 정리", "길게 남기기", "자르지 않기"], answer: 1 },
    { id: 17, topic: 1, question: "사이드 라인 정리 도구는?", options: ["가위만", "클리퍼 또는 트리머", "빗만", "드라이어"], answer: 1 },
    { id: 18, topic: 1, question: "스포츠 커트 마무리 시 확인 사항은?", options: ["바로 종료", "대칭·그라데이션·라인 점검", "요금만", "시간만"], answer: 1 },
    { id: 19, topic: 1, question: "스포츠 커트 실기 중 흔한 실수는?", options: ["균일한 커트", "불균일한 그라데이션·라인 어긋남", "너무 완벽함", "시간 남음"], answer: 1 },
    { id: 20, topic: 1, question: "스포츠 커트 시간 관리 팁은?", options: ["시간 무시", "섹션별 시간 배분 연습", "빠르게만", "천천히만"], answer: 1 },

    // 면도 실기 (10문항)
    { id: 21, topic: 2, question: "면도 실기 전 준비 단계는?", options: ["바로 면도", "도구 소독·스팀타월·폼 준비", "커트만", "아이롱만"], answer: 1 },
    { id: 22, topic: 2, question: "스팀타월 온도 확인 방법은?", options: ["무시", "손목 안쪽으로 온도 확인", "얼굴에 바로", "고온 그대로"], answer: 1 },
    { id: 23, topic: 2, question: "면도 폼 적용 방법은?", options: ["대충 바르기", "브러시로 골고루 도포", "손으로 문지르기", "폼 생략"], answer: 1 },
    { id: 24, topic: 2, question: "안전면도기 잡는 방법은?", options: ["세게 쥐기", "펜 잡듯 안정적으로", "느슨하게", "양손으로"], answer: 1 },
    { id: 25, topic: 2, question: "면도 시 피부 처리 방법은?", options: ["느슨하게", "한 손으로 피부 팽팽하게 당기기", "건드리지 않기", "꼬집기"], answer: 1 },
    { id: 26, topic: 2, question: "면도 기본 방향은?", options: ["역방향만", "순방향(결대로) 먼저", "좌우만", "무관"], answer: 1 },
    { id: 27, topic: 2, question: "면도 중 면도기 각도는?", options: ["90도", "30~45도 유지", "0도", "각도 무관"], answer: 1 },
    { id: 28, topic: 2, question: "목 부위 면도 시 주의점은?", options: ["한 방향만", "결이 다양해 방향 확인·조심", "무시", "강하게"], answer: 1 },
    { id: 29, topic: 2, question: "면도 후 마무리 단계는?", options: ["바로 종료", "차가운 물·애프터쉐이브 적용", "뜨거운 물만", "폼 다시"], answer: 1 },
    { id: 30, topic: 2, question: "면도 실기 시 감점 요인은?", options: ["깔끔한 면도", "피부 손상·남은 수염·위생 불량", "완벽한 마무리", "정확한 각도"], answer: 1 },

    // 아이롱 실기 (10문항)
    { id: 31, topic: 3, question: "아이롱 실기의 목적은?", options: ["커트", "열을 이용한 스타일 연출", "면도", "염색"], answer: 1 },
    { id: 32, topic: 3, question: "아이롱 사용 전 확인 사항은?", options: ["바로 사용", "온도 설정·모발 상태 확인", "무조건 고온", "온도 무관"], answer: 1 },
    { id: 33, topic: 3, question: "아이롱 적정 온도 범위는?", options: ["최고 온도", "모발 상태에 따라 120~180도", "최저 온도", "온도 무관"], answer: 1 },
    { id: 34, topic: 3, question: "손상 모발에 아이롱 사용 시 주의점은?", options: ["고온 사용", "저온·열보호제 사용", "온도 무관", "열보호제 생략"], answer: 1 },
    { id: 35, topic: 3, question: "아이롱으로 웨이브 만드는 기법은?", options: ["누르기만", "감아서 빼기", "직선으로만", "젤 많이 사용"], answer: 1 },
    { id: 36, topic: 3, question: "C컬 만들기 기법은?", options: ["역방향 감기", "안쪽 또는 바깥쪽으로 C자 모양", "직선으로", "고정만"], answer: 1 },
    { id: 37, topic: 3, question: "볼륨 루트 아이롱 기법은?", options: ["끝부분만", "뿌리 부분을 들어올려 볼륨", "평평하게", "누르기"], answer: 1 },
    { id: 38, topic: 3, question: "아이롱 사용 시 화상 예방법은?", options: ["무시", "적정 온도·피부 접촉 주의", "고온 사용", "빠르게만"], answer: 1 },
    { id: 39, topic: 3, question: "아이롱 마무리 후 스타일 고정 방법은?", options: ["아무것도 안 함", "쿨샷 또는 스프레이 사용", "물 뿌리기", "다시 가열"], answer: 1 },
    { id: 40, topic: 3, question: "아이롱 실기 평가 포인트는?", options: ["속도만", "웨이브 균일성·볼륨·마무리 상태", "시간만", "도구만"], answer: 1 },

    // 위생·준비 (10문항)
    { id: 41, topic: 4, question: "실기시험 전 손 위생 방법은?", options: ["생략 가능", "비누 세척 및 소독", "물만", "한 번만"], answer: 1 },
    { id: 42, topic: 4, question: "도구 소독 필수 여부는?", options: ["선택", "필수 사항", "불필요", "시험 후만"], answer: 1 },
    { id: 43, topic: 4, question: "케이프 착용 시 주의점은?", options: ["느슨하게", "목 불편하지 않게 적절히 고정", "조이게", "착용 안 함"], answer: 1 },
    { id: 44, topic: 4, question: "넥스트립의 용도는?", options: ["장식", "목 주변 보호·잔머리 방지", "스타일링", "면도용"], answer: 1 },
    { id: 45, topic: 4, question: "도구 배치의 중요성은?", options: ["무관함", "효율적 작업과 시간 관리", "장식", "점수 무관"], answer: 1 },
    { id: 46, topic: 4, question: "실기시험 중 바닥 청결 유지는?", options: ["무시", "작업 중·후 정리 필요", "시험 후만", "불필요"], answer: 1 },
    { id: 47, topic: 4, question: "일회용 도구 사용이 권장되는 경우는?", options: ["모든 경우", "면도날·넥스트립 등", "사용 안 함", "재사용만"], answer: 1 },
    { id: 48, topic: 4, question: "실기시험 복장 규정은?", options: ["자유 복장", "청결하고 단정한 이용사 복장", "운동복", "정장"], answer: 1 },
    { id: 49, topic: 4, question: "실기시험 시간 관리 팁은?", options: ["시간 무시", "각 과제별 시간 배분 연습", "빠르게만", "천천히만"], answer: 1 },
    { id: 50, topic: 4, question: "실기시험 준비물 체크리스트 확인 시기는?", options: ["시험 당일", "시험 전날까지 미리 확인", "시험 후", "확인 불필요"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('barber-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('barber-practical-progress', JSON.stringify({
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
    localStorage.removeItem('barber-practical-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`이용사 실기시험: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎯 실기 문제 풀기</h1>
          <p className="text-gray-500">기본 커트, 스포츠 커트, 면도, 아이롱, 위생</p>
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
