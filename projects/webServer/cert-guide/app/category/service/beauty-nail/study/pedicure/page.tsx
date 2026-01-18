'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PedicurePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '페디큐어 기초', count: 10 },
    { id: 1, name: '발 구조', count: 10 },
    { id: 2, name: '각질 관리', count: 10 },
    { id: 3, name: '풋케어', count: 10 },
    { id: 4, name: '위생 관리', count: 10 },
  ];

  const questions = [
    // 페디큐어 기초 (1-10)
    { id: 1, topic: 0, question: "페디큐어의 의미는?", options: ["손 관리", "발 관리", "얼굴 관리", "두피 관리"], answer: 1 },
    { id: 2, topic: 0, question: "페디큐어 시술 전 첫 단계는?", options: ["폴리시 도포", "발 담그기", "각질 제거", "상담 및 소독"], answer: 3 },
    { id: 3, topic: 0, question: "페디큐어와 매니큐어의 차이점은?", options: ["같은 시술", "부위와 시술 시간", "사용 제품", "기술 수준"], answer: 1 },
    { id: 4, topic: 0, question: "페디큐어 시술 소요 시간은?", options: ["15분", "30분", "45-60분", "2시간"], answer: 2 },
    { id: 5, topic: 0, question: "스파 페디큐어에 포함되는 것은?", options: ["네일 연장", "풋 마사지", "젤 네일만", "파일링만"], answer: 1 },
    { id: 6, topic: 0, question: "페디큐어 시술 시 고객 자세는?", options: ["서서", "누워서", "앉아서 발 펴기", "쪼그려 앉기"], answer: 2 },
    { id: 7, topic: 0, question: "페디큐어 볼(족욕기)의 적정 온도는?", options: ["냉수", "미온수(38-40도)", "뜨거운 물", "얼음물"], answer: 1 },
    { id: 8, topic: 0, question: "페디큐어 시술 순서로 올바른 것은?", options: ["폴리시→각질→파일", "파일→각질→폴리시", "각질→폴리시→파일", "폴리시→파일→각질"], answer: 1 },
    { id: 9, topic: 0, question: "페디큐어 분리대(토우 세퍼레이터)의 용도는?", options: ["각질 제거", "발가락 분리", "마사지", "파일링"], answer: 1 },
    { id: 10, topic: 0, question: "페디큐어 후 관리 조언은?", options: ["바로 신발 신기", "건조 후 보습", "물에 담그기", "운동하기"], answer: 1 },

    // 발 구조 (11-20)
    { id: 11, topic: 1, question: "발에 있는 뼈의 개수는?", options: ["19개", "22개", "26개", "30개"], answer: 2 },
    { id: 12, topic: 1, question: "발의 아치 중 가장 높은 것은?", options: ["내측 종아치", "외측 종아치", "횡아치", "모두 같음"], answer: 0 },
    { id: 13, topic: 1, question: "발바닥에 체중이 집중되는 부위는?", options: ["발가락만", "뒤꿈치와 앞꿈치", "아치", "발등"], answer: 1 },
    { id: 14, topic: 1, question: "발톱의 성장 속도는 손톱보다?", options: ["빠름", "느림", "같음", "일정하지 않음"], answer: 1 },
    { id: 15, topic: 1, question: "발의 한선(땀샘) 수는?", options: ["500개", "3000개", "25만개", "100만개"], answer: 2 },
    { id: 16, topic: 1, question: "발바닥에 없는 피부 부속기관은?", options: ["한선", "피지선", "둘 다 있음", "둘 다 없음"], answer: 1 },
    { id: 17, topic: 1, question: "평발의 특징은?", options: ["아치가 높음", "아치가 낮거나 없음", "발이 작음", "발톱이 두꺼움"], answer: 1 },
    { id: 18, topic: 1, question: "요족(높은 아치)의 문제점은?", options: ["땀이 많음", "충격 흡수 어려움", "발톱 문제", "각질 없음"], answer: 1 },
    { id: 19, topic: 1, question: "발톱이 손톱보다 두꺼운 이유는?", options: ["체중 부하", "미관", "성장 속도", "관계없음"], answer: 0 },
    { id: 20, topic: 1, question: "발가락 중 가장 큰 것은?", options: ["검지", "중지", "엄지", "새끼"], answer: 2 },

    // 각질 관리 (21-30)
    { id: 21, topic: 2, question: "발 각질이 두꺼워지는 이유는?", options: ["수분 과다", "마찰과 압력", "영양 과다", "운동 부족"], answer: 1 },
    { id: 22, topic: 2, question: "풋 파일의 용도는?", options: ["네일 모양", "각질 제거", "폴리시 도포", "마사지"], answer: 1 },
    { id: 23, topic: 2, question: "각질 연화제의 성분 특성은?", options: ["산성", "알칼리성", "중성", "유성"], answer: 1 },
    { id: 24, topic: 2, question: "각질 제거 시 주의사항은?", options: ["피가 날 때까지", "적당히 제거", "전부 제거", "건조한 상태"], answer: 1 },
    { id: 25, topic: 2, question: "발뒤꿈치 각질 관리 주기는?", options: ["매일", "주 1-2회", "월 1회", "년 1회"], answer: 1 },
    { id: 26, topic: 2, question: "풋 스크럽의 기능은?", options: ["보습", "각질 제거와 매끄럽게", "착색", "경화"], answer: 1 },
    { id: 27, topic: 2, question: "전동 각질 제거기 사용 시 주의점은?", options: ["강하게 누르기", "한 부위에 오래", "적당한 압력으로 움직이며", "마른 발에"], answer: 2 },
    { id: 28, topic: 2, question: "굳은살과 티눈의 차이는?", options: ["같음", "티눈은 핵이 있음", "굳은살이 더 아픔", "위치 차이 없음"], answer: 1 },
    { id: 29, topic: 2, question: "각질 제거 후 필수 단계는?", options: ["더 제거", "보습", "방치", "물에 담그기"], answer: 1 },
    { id: 30, topic: 2, question: "과도한 각질 제거의 부작용은?", options: ["매끄러움", "피부 손상, 감염 위험", "보습 효과", "착색"], answer: 1 },

    // 풋케어 (31-40)
    { id: 31, topic: 3, question: "풋 마사지의 효과가 아닌 것은?", options: ["혈액순환", "피로 회복", "네일 연장", "이완"], answer: 2 },
    { id: 32, topic: 3, question: "발 마사지 방향은?", options: ["심장에서 멀리", "심장 방향", "방향 무관", "아래로만"], answer: 1 },
    { id: 33, topic: 3, question: "풋 마사지 크림의 역할은?", options: ["각질 제거", "마찰 감소와 보습", "착색", "경화"], answer: 1 },
    { id: 34, topic: 3, question: "발 냄새의 주요 원인은?", options: ["세균과 땀", "각질", "네일", "혈액순환"], answer: 0 },
    { id: 35, topic: 3, question: "발 냄새 예방법이 아닌 것은?", options: ["통풍 좋은 신발", "양말 자주 교체", "같은 신발 연속 착용", "발 청결 유지"], answer: 2 },
    { id: 36, topic: 3, question: "풋 파우더의 기능은?", options: ["보습", "땀과 냄새 억제", "착색", "광택"], answer: 1 },
    { id: 37, topic: 3, question: "풋 스프레이의 용도는?", options: ["광택", "청량감과 냄새 제거", "각질 제거", "연장"], answer: 1 },
    { id: 38, topic: 3, question: "족욕에 첨가하면 좋은 것은?", options: ["아세톤", "에센셜 오일/소금", "폴리시", "글루"], answer: 1 },
    { id: 39, topic: 3, question: "풋 마스크의 주요 효과는?", options: ["착색", "보습과 영양", "각질 증가", "경화"], answer: 1 },
    { id: 40, topic: 3, question: "겨울철 발 관리의 핵심은?", options: ["각질 무시", "보습 강화", "통풍", "냉수 사용"], answer: 1 },

    // 위생 관리 (41-50)
    { id: 41, topic: 4, question: "페디큐어 도구 소독이 중요한 이유는?", options: ["미관", "감염 예방", "비용 절감", "시간 단축"], answer: 1 },
    { id: 42, topic: 4, question: "풋파일 소독 방법은?", options: ["물 세척만", "알코올 소독", "재사용 불가", "소독 불필요"], answer: 1 },
    { id: 43, topic: 4, question: "일회용 도구 사용의 장점은?", options: ["경제적", "교차 감염 방지", "내구성", "재사용 가능"], answer: 1 },
    { id: 44, topic: 4, question: "무좀 의심 고객 시술 시 대처는?", options: ["정상 시술", "시술 거부 및 의료기관 권유", "무시", "항생제 처방"], answer: 1 },
    { id: 45, topic: 4, question: "페디큐어 시술대 청소 시기는?", options: ["하루 끝", "고객마다", "주 1회", "월 1회"], answer: 1 },
    { id: 46, topic: 4, question: "족욕기 위생 관리 방법은?", options: ["물만 버리기", "세척 및 소독", "소독 불필요", "재사용 물"], answer: 1 },
    { id: 47, topic: 4, question: "시술자 손 위생의 중요성은?", options: ["미관", "감염 예방", "속도", "비용"], answer: 1 },
    { id: 48, topic: 4, question: "내향성 발톱 시술 시 주의점은?", options: ["깊이 자르기", "의료적 처치가 필요하면 전문가 의뢰", "무시", "강하게 누르기"], answer: 1 },
    { id: 49, topic: 4, question: "발 상처가 있는 고객 대처는?", options: ["정상 시술", "상처 부위 피해서 시술", "시술 거부", "항생제 바르기"], answer: 1 },
    { id: 50, topic: 4, question: "타월 위생 관리 방법은?", options: ["재사용", "고객마다 교체", "주 1회 교체", "월 1회 교체"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('beauty-nail-pedicure-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); } }, []);
  useEffect(() => { localStorage.setItem('beauty-nail-pedicure-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered); if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1); };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-nail-pedicure-progress'); };
  const handleAIHelp = (question: string, options: string[], answer: number) => { const prompt = `미용사(네일) 페디큐어 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`; setCurrentPrompt(prompt); setShowAIModal(true); };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-rose-100"><div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800">← 뒤로</Link><div className="flex-1"><h1 className="text-xl font-bold text-gray-800">페디큐어</h1><p className="text-sm text-gray-500">미용사(네일) 필기과목</p></div></div></div></header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-rose-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div></div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6"><div className="flex justify-between items-center mb-4"><span className="text-sm text-rose-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2><div className="space-y-3">{currentQ.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50'}`}><span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}</button>))}</div>{showResult && (<div className="mt-4 p-4 bg-rose-50 rounded-xl"><p className="text-rose-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p><p className="text-sm text-rose-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p><button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900">🤖 AI에게 해설 요청하기</button></div>)}</div>

        <div className="flex gap-3"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button><button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-600">다음 →</button></div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
