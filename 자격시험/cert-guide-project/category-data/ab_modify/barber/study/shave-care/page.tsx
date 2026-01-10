'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShaveCareStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '면도 기초', count: 10 },
    { id: 1, name: '면도 기법', count: 10 },
    { id: 2, name: '면도 후 관리', count: 10 },
    { id: 3, name: '두피 관리', count: 10 },
    { id: 4, name: '피부 트러블', count: 10 },
  ];

  const questions = [
    // 면도 기초 (10문항)
    { id: 1, topic: 0, question: "면도 전 스팀타월의 역할은?", options: ["장식", "모공 열고 수염 연화", "소독", "건조"], answer: 1 },
    { id: 2, topic: 0, question: "안전면도기의 장점은?", options: ["날 노출 많음", "피부 손상 위험 감소", "비쌈", "관리 어려움"], answer: 1 },
    { id: 3, topic: 0, question: "면도 크림/폼의 역할은?", options: ["색상 부여", "마찰 감소와 수염 연화", "향만", "건조시킴"], answer: 1 },
    { id: 4, topic: 0, question: "면도 전 세안의 중요성은?", options: ["불필요", "유분·오염 제거로 깔끔한 면도", "색상 변화", "시간 단축"], answer: 1 },
    { id: 5, topic: 0, question: "면도 브러시의 용도는?", options: ["커트", "폼을 골고루 바르고 수염 세움", "건조", "소독"], answer: 1 },
    { id: 6, topic: 0, question: "면도 방향의 기본 원칙은?", options: ["역방향만", "결대로(순방향) 먼저", "좌우만", "무관"], answer: 1 },
    { id: 7, topic: 0, question: "면도날 교체 시기는?", options: ["1년", "끝이 무뎌지거나 5~10회 사용 후", "매일", "영구 사용"], answer: 1 },
    { id: 8, topic: 0, question: "면도 시 피부를 당기는 이유는?", options: ["장식", "피부를 팽팽하게 해 깔끔한 면도", "색상 변화", "시간 단축"], answer: 1 },
    { id: 9, topic: 0, question: "프리쉐이브 오일의 역할은?", options: ["색상 부여", "피부 보호와 면도기 미끄러짐 향상", "건조", "탈색"], answer: 1 },
    { id: 10, topic: 0, question: "민감한 피부에 권장되는 면도법은?", options: ["강하게 역방향", "순방향으로 부드럽게", "폼 없이", "뜨거운 물로"], answer: 1 },

    // 면도 기법 (10문항)
    { id: 11, topic: 1, question: "위드 더 그레인(WTG)이란?", options: ["역방향 면도", "수염 결대로 면도", "옆으로 면도", "원형 면도"], answer: 1 },
    { id: 12, topic: 1, question: "어게인스트 더 그레인(ATG)이란?", options: ["순방향 면도", "수염 결 반대로 면도", "옆으로 면도", "원형 면도"], answer: 1 },
    { id: 13, topic: 1, question: "ATG 면도의 주의점은?", options: ["가장 안전", "피부 자극 가능, 민감 피부 주의", "권장 방법", "모든 피부 적합"], answer: 1 },
    { id: 14, topic: 1, question: "XTG(크로스 더 그레인)란?", options: ["순방향", "역방향", "수염 결에 수직으로 면도", "원형 면도"], answer: 2 },
    { id: 15, topic: 1, question: "얼굴 부위별 면도 순서는?", options: ["무관함", "볼→턱→입 주변→목 순서 권장", "목부터", "입 주변부터"], answer: 1 },
    { id: 16, topic: 1, question: "콧수염 부위 면도 시 주의점은?", options: ["세게 누르기", "피부 아래로 당기며 조심스럽게", "역방향만", "폼 없이"], answer: 1 },
    { id: 17, topic: 1, question: "턱 라인 면도 시 피부 처리는?", options: ["느슨하게", "팽팽하게 당겨 주름 없이", "건조하게", "폼 많이"], answer: 1 },
    { id: 18, topic: 1, question: "목 부위 면도 시 주의할 점은?", options: ["한 방향만", "수염 결이 다양해 방향 확인", "역방향만", "무시 가능"], answer: 1 },
    { id: 19, topic: 1, question: "면도 시 면도기 각도는?", options: ["90도", "30~45도가 적절", "0도", "각도 무관"], answer: 1 },
    { id: 20, topic: 1, question: "면도 중 출혈 시 대처법은?", options: ["무시", "차가운 물 또는 지혈제 사용", "계속 면도", "뜨거운 물"], answer: 1 },

    // 면도 후 관리 (10문항)
    { id: 21, topic: 2, question: "면도 후 차가운 물 세안의 효과는?", options: ["모공 열기", "모공 수축과 진정", "건조", "탈색"], answer: 1 },
    { id: 22, topic: 2, question: "애프터쉐이브의 역할은?", options: ["면도 전 사용", "소독·진정·보습", "색상 부여", "수염 성장"], answer: 1 },
    { id: 23, topic: 2, question: "알코올 성분 애프터쉐이브의 특징은?", options: ["보습 효과", "소독력 있으나 건조·자극 가능", "무자극", "향만"], answer: 1 },
    { id: 24, topic: 2, question: "민감 피부용 애프터쉐이브 특징은?", options: ["알코올 많음", "무알코올·진정 성분 함유", "향이 강함", "자극적"], answer: 1 },
    { id: 25, topic: 2, question: "면도 후 보습제 사용 이유는?", options: ["색상 변화", "면도로 인한 수분 손실 보충", "수염 성장", "탈색"], answer: 1 },
    { id: 26, topic: 2, question: "면도 후 발진 예방법은?", options: ["역방향 강하게", "순방향 면도, 적절한 보습", "폼 없이", "뜨거운 물로"], answer: 1 },
    { id: 27, topic: 2, question: "인그로운 헤어(내향성 모발) 예방법은?", options: ["역방향만", "순방향 면도, 각질 관리", "면도 자주", "폼 없이"], answer: 1 },
    { id: 28, topic: 2, question: "면도 자국 완화 방법은?", options: ["자극", "알로에·진정 성분 제품 사용", "뜨거운 물", "역방향 면도"], answer: 1 },
    { id: 29, topic: 2, question: "면도 도구 보관 시 주의점은?", options: ["젖은 상태 보관", "건조하게 보관", "물에 담가 보관", "밀폐 보관"], answer: 1 },
    { id: 30, topic: 2, question: "면도날 소독 방법은?", options: ["물만", "알코올 소독 또는 열탕 소독", "소독 불필요", "비누만"], answer: 1 },

    // 두피 관리 (10문항)
    { id: 31, topic: 3, question: "두피 타입 분류가 아닌 것은?", options: ["건성 두피", "지성 두피", "복합성 두피", "금속성 두피"], answer: 3 },
    { id: 32, topic: 3, question: "지성 두피의 특징은?", options: ["건조함", "피지 과다 분비", "각질 없음", "붉은 염증"], answer: 1 },
    { id: 33, topic: 3, question: "건성 두피 관리 방법은?", options: ["강한 세정", "보습과 부드러운 샴푸", "알코올 제품", "매일 세정"], answer: 1 },
    { id: 34, topic: 3, question: "두피 마사지의 효과는?", options: ["탈모 유발", "혈액순환 촉진 및 긴장 완화", "건조 유발", "피지 증가만"], answer: 1 },
    { id: 35, topic: 3, question: "두피 스케일링의 목적은?", options: ["색상 변화", "각질·노폐물 제거", "염색", "파마"], answer: 1 },
    { id: 36, topic: 3, question: "비듬의 주요 원인은?", options: ["청결", "피지 과다, 진균, 건조", "좋은 습관", "관리 잘함"], answer: 1 },
    { id: 37, topic: 3, question: "탈모 예방을 위한 두피 관리는?", options: ["방치", "청결 유지, 마사지, 영양 공급", "강한 자극", "화학제품 과다"], answer: 1 },
    { id: 38, topic: 3, question: "두피 관리 주기는?", options: ["1년에 한 번", "정기적으로 주 1~2회 집중 관리", "매일 강하게", "불필요"], answer: 1 },
    { id: 39, topic: 3, question: "두피 토닉의 역할은?", options: ["염색", "두피 영양 공급과 진정", "탈색", "파마"], answer: 1 },
    { id: 40, topic: 3, question: "샴푸 시 두피 세정 방법은?", options: ["손톱으로 긁기", "지문으로 부드럽게 마사지", "문지르지 않기", "뜨거운 물만"], answer: 1 },

    // 피부 트러블 (10문항)
    { id: 41, topic: 4, question: "면도 후 발생하는 레이저 번(면도 화상)이란?", options: ["열 화상", "면도로 인한 피부 자극·발적", "일광화상", "화학화상"], answer: 1 },
    { id: 42, topic: 4, question: "면도 범프(여드름 유사 증상) 원인은?", options: ["청결", "인그로운 헤어·세균 감염", "보습 과다", "좋은 면도"], answer: 1 },
    { id: 43, topic: 4, question: "모낭염의 증상은?", options: ["건조", "모낭 주위 붉은 염증·고름", "탈색", "비듬만"], answer: 1 },
    { id: 44, topic: 4, question: "피부 트러블 예방을 위한 면도 습관은?", options: ["무딘 날 사용", "깨끗한 도구, 적절한 기법", "폼 없이", "역방향만"], answer: 1 },
    { id: 45, topic: 4, question: "민감성 피부 면도 시 권장 제품은?", options: ["알코올 함유", "무향료·저자극 제품", "향이 강한 제품", "강한 알코올"], answer: 1 },
    { id: 46, topic: 4, question: "면도 후 붉은 발진이 지속될 때 조치는?", options: ["계속 면도", "면도 휴식, 피부과 상담", "자극 증가", "무시"], answer: 1 },
    { id: 47, topic: 4, question: "피부염이 있을 때 면도 주의점은?", options: ["강하게 면도", "염증 부위 피해 조심스럽게", "평소처럼", "역방향만"], answer: 1 },
    { id: 48, topic: 4, question: "알레르기 반응 시 대처법은?", options: ["계속 사용", "원인 제품 중단, 진정 관리", "더 바르기", "무시"], answer: 1 },
    { id: 49, topic: 4, question: "건조로 인한 피부 트러블 예방법은?", options: ["세안 많이", "적절한 보습", "알코올 제품", "뜨거운 물 자주"], answer: 1 },
    { id: 50, topic: 4, question: "고객 피부 트러블 발견 시 이용사의 역할은?", options: ["무시", "상태 확인 후 주의, 심하면 전문의 권유", "강행", "직접 치료"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('barber-shave-care-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('barber-shave-care-progress', JSON.stringify({
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
    localStorage.removeItem('barber-shave-care-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`이용사 면도 관리: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🪒 면도·관리</h1>
          <p className="text-gray-500">면도 기법, 면도 후 관리, 두피·피부 관리</p>
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
