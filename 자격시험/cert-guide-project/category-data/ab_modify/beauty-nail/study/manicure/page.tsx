'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManicurePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '매니큐어 기초', count: 10 },
    { id: 1, name: '큐티클 관리', count: 10 },
    { id: 2, name: '폴리시 도포', count: 10 },
    { id: 3, name: '네일 케어', count: 10 },
    { id: 4, name: '제품 지식', count: 10 },
  ];

  const questions = [
    // 매니큐어 기초 (1-10)
    { id: 1, topic: 0, question: "매니큐어 시술의 첫 단계는?", options: ["폴리시 도포", "손 소독", "큐티클 정리", "파일링"], answer: 1 },
    { id: 2, topic: 0, question: "핫 매니큐어의 특징은?", options: ["냉수 사용", "따뜻한 오일 사용", "화학약품 사용", "UV 램프 사용"], answer: 1 },
    { id: 3, topic: 0, question: "드라이 매니큐어란?", options: ["물 사용", "물 사용 안 함", "스팀 사용", "젤 사용"], answer: 1 },
    { id: 4, topic: 0, question: "매니큐어 시술 시간의 적정 범위는?", options: ["10분", "30-45분", "2시간", "3시간"], answer: 1 },
    { id: 5, topic: 0, question: "스파 매니큐어에 포함되는 것은?", options: ["젤 네일", "핸드 마사지", "네일 연장", "아크릴"], answer: 1 },
    { id: 6, topic: 0, question: "매니큐어 테이블에 필요한 것이 아닌 것은?", options: ["암레스트", "조명", "헤어드라이기", "도구 정리함"], answer: 2 },
    { id: 7, topic: 0, question: "고객 상담 시 확인할 사항이 아닌 것은?", options: ["피부 알레르기", "직업", "혈액형", "선호 스타일"], answer: 2 },
    { id: 8, topic: 0, question: "매니큐어 볼(핑거 볼)의 적정 온도는?", options: ["냉수", "미온수", "뜨거운 물", "얼음물"], answer: 1 },
    { id: 9, topic: 0, question: "매니큐어 시술 순서로 올바른 것은?", options: ["폴리시→파일→큐티클", "파일→큐티클→폴리시", "큐티클→파일→폴리시", "폴리시→큐티클→파일"], answer: 1 },
    { id: 10, topic: 0, question: "매니큐어 시술 후 관리 조언이 아닌 것은?", options: ["손 보습", "충격 피하기", "뜨거운 물 장시간 담그기", "장갑 착용"], answer: 2 },

    // 큐티클 관리 (11-20)
    { id: 11, topic: 1, question: "큐티클의 역할은?", options: ["영양 공급", "세균 침입 방지", "네일 성장", "색소 형성"], answer: 1 },
    { id: 12, topic: 1, question: "큐티클 푸셔의 용도는?", options: ["네일 커팅", "큐티클 밀어올리기", "폴리시 제거", "버프 작업"], answer: 1 },
    { id: 13, topic: 1, question: "큐티클 니퍼의 용도는?", options: ["네일 커팅", "거스러미 제거", "파일링", "버프"], answer: 1 },
    { id: 14, topic: 1, question: "큐티클 리무버의 성분 특성은?", options: ["산성", "알칼리성", "중성", "유성"], answer: 1 },
    { id: 15, topic: 1, question: "큐티클 오일의 주요 기능은?", options: ["경화", "보습과 영양", "착색", "제거"], answer: 1 },
    { id: 16, topic: 1, question: "큐티클 정리 시 과도하게 제거하면?", options: ["미관 향상", "감염 위험 증가", "네일 강화", "빠른 성장"], answer: 1 },
    { id: 17, topic: 1, question: "큐티클 연화 시간은?", options: ["30초", "2-3분", "10분", "30분"], answer: 1 },
    { id: 18, topic: 1, question: "에포니키움과 큐티클의 관계는?", options: ["같은 부위", "에포니키움이 살아있는 조직", "큐티클이 살아있는 조직", "관계없음"], answer: 1 },
    { id: 19, topic: 1, question: "큐티클 케어 금기 사항은?", options: ["건조한 피부", "감염된 피부", "정상 피부", "노화 피부"], answer: 1 },
    { id: 20, topic: 1, question: "큐티클 푸셔 사용 각도는?", options: ["90도", "45도", "10도", "수평"], answer: 1 },

    // 폴리시 도포 (21-30)
    { id: 21, topic: 2, question: "베이스 코트의 역할은?", options: ["광택", "착색 방지, 접착력 향상", "건조", "제거"], answer: 1 },
    { id: 22, topic: 2, question: "컬러 폴리시 도포 횟수는?", options: ["1회", "2회", "4회", "횟수 무관"], answer: 1 },
    { id: 23, topic: 2, question: "탑 코트의 주요 기능은?", options: ["착색", "광택과 보호", "건조 방해", "착색 방지"], answer: 1 },
    { id: 24, topic: 2, question: "폴리시 도포 시작 위치는?", options: ["양쪽 끝", "네일 중앙", "큐티클 라인", "프리엣지"], answer: 1 },
    { id: 25, topic: 2, question: "폴리시가 피부에 묻었을 때 제거 도구는?", options: ["화장솜", "클린업 브러시", "스폰지", "테이프"], answer: 1 },
    { id: 26, topic: 2, question: "폴리시 건조 시간 단축 방법은?", options: ["두껍게 바르기", "퀵 드라이 사용", "온풍", "물에 담그기"], answer: 1 },
    { id: 27, topic: 2, question: "프렌치 매니큐어의 특징은?", options: ["단색", "팁 부분 화이트", "전체 글리터", "그라데이션"], answer: 1 },
    { id: 28, topic: 2, question: "폴리시 묽기 조절에 사용하는 것은?", options: ["물", "시너", "아세톤", "알코올"], answer: 1 },
    { id: 29, topic: 2, question: "폴리시 브러시 압력은?", options: ["강하게", "적당한 압력", "매우 강하게", "압력 무관"], answer: 1 },
    { id: 30, topic: 2, question: "폴리시 도포 시 피해야 할 것은?", options: ["얇게 바르기", "큐티클 라인에서 시작", "두껍게 바르기", "건조 확인"], answer: 2 },

    // 네일 케어 (31-40)
    { id: 31, topic: 3, question: "네일 파일의 그릿(grit)이 높을수록?", options: ["거침", "고움", "두꺼움", "무관"], answer: 1 },
    { id: 32, topic: 3, question: "자연 네일에 적합한 파일 그릿은?", options: ["80", "180", "400", "1000"], answer: 1 },
    { id: 33, topic: 3, question: "파일링 방향은?", options: ["앞뒤로", "한 방향", "원형", "방향 무관"], answer: 1 },
    { id: 34, topic: 3, question: "버퍼의 주요 기능은?", options: ["커팅", "표면 광택", "연장", "제거"], answer: 1 },
    { id: 35, topic: 3, question: "네일 모양 중 가장 튼튼한 것은?", options: ["스퀘어", "라운드", "오벌", "포인트"], answer: 0 },
    { id: 36, topic: 3, question: "아몬드 네일 모양의 특징은?", options: ["직사각형", "끝이 뾰족한 타원형", "완전 둥근형", "사각형"], answer: 1 },
    { id: 37, topic: 3, question: "핸드 마사지의 효과가 아닌 것은?", options: ["혈액순환", "근육 이완", "네일 연장", "스트레스 해소"], answer: 2 },
    { id: 38, topic: 3, question: "네일 강화제 사용 시기는?", options: ["폴리시 위", "베이스 전", "탑 후", "아무 때나"], answer: 1 },
    { id: 39, topic: 3, question: "건조하고 갈라지는 네일 관리는?", options: ["자주 깎기", "오일과 보습", "아세톤 자주 사용", "물에 담그기"], answer: 1 },
    { id: 40, topic: 3, question: "네일 클리퍼 사용 시 주의점은?", options: ["한 번에 자르기", "조금씩 여러 번", "비스듬히 자르기", "주의 불필요"], answer: 1 },

    // 제품 지식 (41-50)
    { id: 41, topic: 4, question: "아세톤의 주요 용도는?", options: ["보습", "폴리시 제거", "경화", "영양 공급"], answer: 1 },
    { id: 42, topic: 4, question: "논-아세톤 리무버의 장점은?", options: ["빠른 제거", "자극 적음", "저렴함", "강력함"], answer: 1 },
    { id: 43, topic: 4, question: "하드너(경화제)의 기능은?", options: ["보습", "네일 강화", "광택", "착색"], answer: 1 },
    { id: 44, topic: 4, question: "핸드크림과 큐티클 오일의 차이는?", options: ["같은 제품", "핸드크림은 전체, 오일은 큐티클 집중", "용도 같음", "성분 같음"], answer: 1 },
    { id: 45, topic: 4, question: "젤 폴리시의 특징은?", options: ["자연 건조", "UV/LED 경화 필요", "물에 녹음", "일회용"], answer: 1 },
    { id: 46, topic: 4, question: "네일 글루의 용도가 아닌 것은?", options: ["팁 부착", "파츠 고정", "폴리시 도포", "수리"], answer: 2 },
    { id: 47, topic: 4, question: "프라이머의 역할은?", options: ["광택", "접착력 증가", "제거", "착색"], answer: 1 },
    { id: 48, topic: 4, question: "디하이드레이터의 기능은?", options: ["보습", "유수분 제거", "착색", "광택"], answer: 1 },
    { id: 49, topic: 4, question: "네일 폴리시 보관 시 주의점은?", options: ["직사광선", "서늘하고 어두운 곳", "냉동", "열원 근처"], answer: 1 },
    { id: 50, topic: 4, question: "폴리시의 유통기한은 보통?", options: ["1개월", "1년", "2-3년", "영구"], answer: 2 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('beauty-nail-manicure-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); } }, []);
  useEffect(() => { localStorage.setItem('beauty-nail-manicure-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered); if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1); };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-nail-manicure-progress'); };
  const handleAIHelp = (question: string, options: string[], answer: number) => { const prompt = `미용사(네일) 매니큐어 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`; setCurrentPrompt(prompt); setShowAIModal(true); };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-rose-100"><div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800">← 뒤로</Link><div className="flex-1"><h1 className="text-xl font-bold text-gray-800">매니큐어</h1><p className="text-sm text-gray-500">미용사(네일) 필기과목</p></div></div></div></header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-rose-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div></div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6"><div className="flex justify-between items-center mb-4"><span className="text-sm text-rose-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2><div className="space-y-3">{currentQ.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50'}`}><span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}</button>))}</div>{showResult && (<div className="mt-4 p-4 bg-rose-50 rounded-xl"><p className="text-rose-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p><p className="text-sm text-rose-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p><button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900">🤖 AI에게 해설 요청하기</button></div>)}</div>

        <div className="flex gap-3"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button><button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-600">다음 →</button></div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
