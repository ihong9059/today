'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ColorDesignPage() {
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
    { id: 0, name: '색채 이론', count: 10 },
    { id: 1, name: '배색 원리', count: 10 },
    { id: 2, name: '퍼스널 컬러', count: 10 },
    { id: 3, name: '이미지 메이킹', count: 10 },
    { id: 4, name: '조명과 색채', count: 10 },
  ];

  const questions = [
    // 색채 이론 (1-10)
    { id: 1, topic: 0, question: "색의 3속성이 아닌 것은?", options: ["색상", "명도", "채도", "무게"], answer: 3 },
    { id: 2, topic: 0, question: "빨강, 노랑, 파랑을 무엇이라 하는가?", options: ["2차색", "3차색", "1차색(원색)", "보색"], answer: 2 },
    { id: 3, topic: 0, question: "보색 관계에 있는 색의 조합은?", options: ["빨강-주황", "빨강-초록", "노랑-주황", "파랑-보라"], answer: 1 },
    { id: 4, topic: 0, question: "명도가 높아지면 색은?", options: ["어두워짐", "밝아짐", "선명해짐", "탁해짐"], answer: 1 },
    { id: 5, topic: 0, question: "채도가 높은 색의 특징은?", options: ["탁함", "선명함", "어두움", "밝음"], answer: 1 },
    { id: 6, topic: 0, question: "무채색에 해당하는 것은?", options: ["빨강", "흰색, 검정, 회색", "노랑", "파랑"], answer: 1 },
    { id: 7, topic: 0, question: "난색에 해당하는 것은?", options: ["파랑", "초록", "빨강, 주황, 노랑", "보라"], answer: 2 },
    { id: 8, topic: 0, question: "한색에 해당하는 것은?", options: ["빨강", "주황", "파랑, 청록", "노랑"], answer: 2 },
    { id: 9, topic: 0, question: "중성색에 해당하는 것은?", options: ["빨강", "녹색, 보라", "주황", "노랑"], answer: 1 },
    { id: 10, topic: 0, question: "색상환에서 인접한 색의 관계는?", options: ["보색", "유사색", "반대색", "무관"], answer: 1 },

    // 배색 원리 (11-20)
    { id: 11, topic: 1, question: "동일 색상 배색의 특징은?", options: ["대비 강함", "조화롭고 통일감", "화려함", "복잡함"], answer: 1 },
    { id: 12, topic: 1, question: "보색 배색의 효과는?", options: ["차분함", "강한 대비와 시선 집중", "단조로움", "흐릿함"], answer: 1 },
    { id: 13, topic: 1, question: "유사색 배색의 특징은?", options: ["강한 대비", "부드럽고 자연스러움", "화려함", "불안정"], answer: 1 },
    { id: 14, topic: 1, question: "톤온톤 배색이란?", options: ["다른 톤, 같은 색상", "같은 톤, 다른 색상", "같은 톤, 같은 색상", "보색 배색"], answer: 0 },
    { id: 15, topic: 1, question: "톤인톤 배색이란?", options: ["다른 톤, 같은 색상", "같은 톤, 다른 색상", "같은 톤, 같은 색상", "보색 배색"], answer: 1 },
    { id: 16, topic: 1, question: "악센트 컬러의 역할은?", options: ["배경", "포인트와 강조", "전체 통일", "대비 감소"], answer: 1 },
    { id: 17, topic: 1, question: "그라데이션 배색의 특징은?", options: ["급격한 변화", "점진적 색상 변화", "단색", "보색"], answer: 1 },
    { id: 18, topic: 1, question: "세퍼레이션 기법이란?", options: ["색 혼합", "색 사이에 구분선 삽입", "색 제거", "색 반전"], answer: 1 },
    { id: 19, topic: 1, question: "트리아드 배색이란?", options: ["2색 배색", "색상환에서 정삼각형 위치의 3색", "보색 배색", "단색 배색"], answer: 1 },
    { id: 20, topic: 1, question: "스플릿 보색 배색이란?", options: ["보색 양옆 색 사용", "같은 색상", "유사색", "무채색"], answer: 0 },

    // 퍼스널 컬러 (21-30)
    { id: 21, topic: 2, question: "퍼스널 컬러의 기준이 되는 요소가 아닌 것은?", options: ["피부톤", "눈동자 색", "발 크기", "머리카락 색"], answer: 2 },
    { id: 22, topic: 2, question: "웜톤에 어울리는 색은?", options: ["쿨 핑크", "코랄, 피치", "블루 레드", "실버"], answer: 1 },
    { id: 23, topic: 2, question: "쿨톤에 어울리는 색은?", options: ["오렌지", "골드", "로즈 핑크, 버건디", "브라운"], answer: 2 },
    { id: 24, topic: 2, question: "봄 웜톤의 특징은?", options: ["차갑고 어두운", "밝고 선명한 따뜻한 색", "탁하고 어두운", "차갑고 밝은"], answer: 1 },
    { id: 25, topic: 2, question: "여름 쿨톤의 특징은?", options: ["따뜻하고 밝은", "부드럽고 파스텔", "강렬하고 따뜻한", "어둡고 따뜻한"], answer: 1 },
    { id: 26, topic: 2, question: "가을 웜톤에 어울리는 색은?", options: ["파스텔 핑크", "머스타드, 테라코타", "아이시 블루", "네온"], answer: 1 },
    { id: 27, topic: 2, question: "겨울 쿨톤의 특징은?", options: ["부드럽고 따뜻한", "강렬하고 선명한 차가운 색", "탁하고 따뜻한", "밝고 따뜻한"], answer: 1 },
    { id: 28, topic: 2, question: "퍼스널 컬러 진단 시 사용하는 도구는?", options: ["체온계", "드레이프 천", "청진기", "저울"], answer: 1 },
    { id: 29, topic: 2, question: "언더톤이란?", options: ["피부 표면 색", "피부 밑에 비치는 색조", "머리카락 색", "눈동자 색"], answer: 1 },
    { id: 30, topic: 2, question: "뮤트 톤의 특징은?", options: ["선명함", "탁하고 부드러운", "강렬함", "밝음"], answer: 1 },

    // 이미지 메이킹 (31-40)
    { id: 31, topic: 3, question: "내추럴 이미지의 특징은?", options: ["화려함", "자연스럽고 편안함", "강렬함", "차가움"], answer: 1 },
    { id: 32, topic: 3, question: "엘레강스 이미지의 특징은?", options: ["캐주얼", "우아하고 세련됨", "강렬함", "소박함"], answer: 1 },
    { id: 33, topic: 3, question: "모던 이미지의 특징은?", options: ["클래식", "도시적이고 세련됨", "로맨틱", "컨트리"], answer: 1 },
    { id: 34, topic: 3, question: "로맨틱 이미지에 어울리는 색은?", options: ["검정", "파스텔 핑크, 라벤더", "카키", "네이비"], answer: 1 },
    { id: 35, topic: 3, question: "시크 이미지의 특징은?", options: ["귀여움", "도시적이고 세련된 멋", "소녀적", "화려함"], answer: 1 },
    { id: 36, topic: 3, question: "클래식 이미지에 어울리는 색은?", options: ["네온", "베이지, 네이비, 브라운", "형광", "파스텔"], answer: 1 },
    { id: 37, topic: 3, question: "액티브 이미지의 특징은?", options: ["정적", "활동적이고 건강한", "우아함", "차분함"], answer: 1 },
    { id: 38, topic: 3, question: "TPO에서 P는 무엇인가?", options: ["Person", "Place", "Price", "Position"], answer: 1 },
    { id: 39, topic: 3, question: "메이크업에서 이미지 메이킹의 목적은?", options: ["유행 따라가기", "개인의 매력 극대화", "비용 절감", "시간 단축"], answer: 1 },
    { id: 40, topic: 3, question: "얼굴형에 따른 메이크업이 중요한 이유는?", options: ["유행", "단점 보완, 장점 부각", "비용", "시간"], answer: 1 },

    // 조명과 색채 (41-50)
    { id: 41, topic: 4, question: "자연광의 특징은?", options: ["색 왜곡", "가장 정확한 색 재현", "붉은 빛", "푸른 빛"], answer: 1 },
    { id: 42, topic: 4, question: "형광등 조명에서 피부색은?", options: ["따뜻해 보임", "푸르고 차가워 보임", "변화 없음", "붉어 보임"], answer: 1 },
    { id: 43, topic: 4, question: "백열등 조명의 특징은?", options: ["푸른 빛", "따뜻한 노란빛", "흰 빛", "녹색 빛"], answer: 1 },
    { id: 44, topic: 4, question: "무대 조명에서 메이크업이 진해야 하는 이유는?", options: ["유행", "강한 조명으로 색이 날아감", "비용", "선호"], answer: 1 },
    { id: 45, topic: 4, question: "촬영 조명에서 고려할 점은?", options: ["가격", "조명 색온도와 메이크업 조화", "크기", "무게"], answer: 1 },
    { id: 46, topic: 4, question: "색온도(K)가 높으면?", options: ["붉은빛", "푸른빛", "노란빛", "녹색빛"], answer: 1 },
    { id: 47, topic: 4, question: "메이크업 작업 시 최적의 조명은?", options: ["촛불", "자연광 또는 연색성 높은 조명", "암실", "네온"], answer: 1 },
    { id: 48, topic: 4, question: "역광에서 얼굴이 어둡게 보이는 이유는?", options: ["조명 부족", "빛이 뒤에서 비춤", "색온도", "밝기 과다"], answer: 1 },
    { id: 49, topic: 4, question: "링 라이트의 장점은?", options: ["그림자 생성", "균일한 조명으로 그림자 최소화", "저렴함", "무거움"], answer: 1 },
    { id: 50, topic: 4, question: "야외 촬영 메이크업 시 주의점은?", options: ["실내와 동일", "자연광 변화 고려", "조명 무시", "색상 무시"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('beauty-makeup-color-design-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); } }, []);
  useEffect(() => { localStorage.setItem('beauty-makeup-color-design-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered); if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1); };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-makeup-color-design-progress'); };
  const handleAIHelp = (question: string, options: string[], answer: number) => { const prompt = `미용사(메이크업) 색채 디자인 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`; setCurrentPrompt(prompt); setShowAIModal(true); };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-fuchsia-100"><div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><Link href="/category/service/beauty-makeup" className="text-fuchsia-600 hover:text-fuchsia-800">← 뒤로</Link><div className="flex-1"><h1 className="text-xl font-bold text-gray-800">색채 디자인</h1><p className="text-sm text-gray-500">미용사(메이크업) 필기과목</p></div></div></div></header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-fuchsia-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div></div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6"><div className="flex justify-between items-center mb-4"><span className="text-sm text-fuchsia-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2><div className="space-y-3">{currentQ.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-fuchsia-300 hover:bg-fuchsia-50'}`}><span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}</button>))}</div>{showResult && (<div className="mt-4 p-4 bg-fuchsia-50 rounded-xl"><p className="text-fuchsia-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p><p className="text-sm text-fuchsia-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p><button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-fuchsia-700 hover:text-fuchsia-900">🤖 AI에게 해설 요청하기</button></div>)}</div>

        <div className="flex gap-3"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button><button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-fuchsia-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-fuchsia-600">다음 →</button></div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
