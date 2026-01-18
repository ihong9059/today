'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function NailArtPage() {
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
    { id: 0, name: '컬러 이론', count: 10 },
    { id: 1, name: '아트 기법', count: 10 },
    { id: 2, name: '디자인 원리', count: 10 },
    { id: 3, name: '재료·도구', count: 10 },
    { id: 4, name: '트렌드', count: 10 },
  ];

  const questions = [
    // 컬러 이론 (1-10)
    { id: 1, topic: 0, question: "색의 3속성이 아닌 것은?", options: ["색상", "명도", "채도", "무게"], answer: 3 },
    { id: 2, topic: 0, question: "보색 관계에 있는 색의 조합은?", options: ["빨강-파랑", "빨강-초록", "노랑-주황", "파랑-보라"], answer: 1 },
    { id: 3, topic: 0, question: "따뜻한 느낌을 주는 색은?", options: ["파랑", "초록", "빨강", "보라"], answer: 2 },
    { id: 4, topic: 0, question: "무채색에 해당하는 것은?", options: ["빨강", "회색", "노랑", "파랑"], answer: 1 },
    { id: 5, topic: 0, question: "색의 명도가 높아지면?", options: ["어두워짐", "밝아짐", "선명해짐", "탁해짐"], answer: 1 },
    { id: 6, topic: 0, question: "유사색 조화란?", options: ["반대색 조합", "인접색 조합", "무채색 조합", "삼원색 조합"], answer: 1 },
    { id: 7, topic: 0, question: "프렌치 네일의 기본 색상 조합은?", options: ["빨강+파랑", "누드+화이트", "검정+골드", "네이비+실버"], answer: 1 },
    { id: 8, topic: 0, question: "피부톤이 따뜻한 사람에게 어울리는 색은?", options: ["핑크 베이지", "쿨 핑크", "블루 레드", "실버"], answer: 0 },
    { id: 9, topic: 0, question: "네일 컬러 선택 시 고려사항이 아닌 것은?", options: ["피부톤", "계절", "혈액형", "의상 색상"], answer: 2 },
    { id: 10, topic: 0, question: "그라데이션 기법에서 색의 변화는?", options: ["급격한 변화", "점진적 변화", "변화 없음", "반복 패턴"], answer: 1 },

    // 아트 기법 (11-20)
    { id: 11, topic: 1, question: "마블링 기법이란?", options: ["점 찍기", "대리석 무늬 표현", "줄무늬", "꽃 그리기"], answer: 1 },
    { id: 12, topic: 1, question: "스탬핑 네일아트에 사용되는 도구는?", options: ["붓", "스탬퍼와 플레이트", "스폰지", "테이프"], answer: 1 },
    { id: 13, topic: 1, question: "워터 마블의 특징은?", options: ["물 위에 폴리시를 띄워 무늬 생성", "브러시로 그리기", "스티커 부착", "에어브러시 사용"], answer: 0 },
    { id: 14, topic: 1, question: "도트 아트에 사용되는 도구는?", options: ["평붓", "도트펜", "팬붓", "스폰지"], answer: 1 },
    { id: 15, topic: 1, question: "에어브러시 네일의 장점은?", options: ["저렴함", "섬세한 그라데이션 가능", "도구 불필요", "오래 걸림"], answer: 1 },
    { id: 16, topic: 1, question: "포일 아트의 특징은?", options: ["물 사용", "금속 느낌 연출", "마블 무늬", "점 찍기"], answer: 1 },
    { id: 17, topic: 1, question: "3D 아트에 주로 사용되는 재료는?", options: ["젤 폴리시", "아크릴 파우더", "일반 폴리시", "물감"], answer: 1 },
    { id: 18, topic: 1, question: "스트라이핑 테이프의 용도는?", options: ["네일 보호", "라인 표현", "큐티클 관리", "네일 강화"], answer: 1 },
    { id: 19, topic: 1, question: "스폰지 그라데이션의 특징은?", options: ["선명한 경계", "부드러운 색 변화", "무늬 생성", "스티커 부착"], answer: 1 },
    { id: 20, topic: 1, question: "핸드페인팅에 적합한 붓은?", options: ["스폰지 붓", "세필 붓", "면 붓", "고무 붓"], answer: 1 },

    // 디자인 원리 (21-30)
    { id: 21, topic: 2, question: "균형의 원리란?", options: ["반복", "안정감 있는 배치", "강조", "대비"], answer: 1 },
    { id: 22, topic: 2, question: "점, 선, 면 중 가장 기본적인 요소는?", options: ["선", "면", "점", "모두 동일"], answer: 2 },
    { id: 23, topic: 2, question: "비대칭 균형의 특징은?", options: ["정적인 느낌", "동적이고 개성적", "단조로움", "무거움"], answer: 1 },
    { id: 24, topic: 2, question: "강조의 원리를 적용하는 방법은?", options: ["같은 색 반복", "포인트 컬러 사용", "무채색만 사용", "전체 동일 디자인"], answer: 1 },
    { id: 25, topic: 2, question: "리듬의 원리란?", options: ["정지된 느낌", "규칙적 반복으로 운동감", "불균형", "무질서"], answer: 1 },
    { id: 26, topic: 2, question: "통일성의 원리를 적용하는 방법은?", options: ["다양한 색상 사용", "공통 요소 반복", "대비 강조", "무작위 배치"], answer: 1 },
    { id: 27, topic: 2, question: "손톱이 짧아 보이게 하는 디자인은?", options: ["세로 줄무늬", "가로 줄무늬", "V형 프렌치", "단색"], answer: 1 },
    { id: 28, topic: 2, question: "손톱이 길어 보이게 하는 디자인은?", options: ["가로 줄무늬", "세로 줄무늬", "가로 그라데이션", "전체 글리터"], answer: 1 },
    { id: 29, topic: 2, question: "프렌치 네일의 스마일 라인이란?", options: ["큐티클 라인", "프리엣지의 곡선", "사이드 월", "네일 중앙"], answer: 1 },
    { id: 30, topic: 2, question: "네거티브 스페이스 디자인이란?", options: ["전체 칠하기", "일부를 비워두는 디자인", "3D 아트", "스톤 장식"], answer: 1 },

    // 재료·도구 (31-40)
    { id: 31, topic: 3, question: "젤 네일 경화에 필요한 것은?", options: ["열", "UV/LED 램프", "공기", "물"], answer: 1 },
    { id: 32, topic: 3, question: "아트용 세필 붓의 특징은?", options: ["넓은 면적 도포", "섬세한 선 표현", "큐티클 정리", "버프 작업"], answer: 1 },
    { id: 33, topic: 3, question: "글리터의 종류가 아닌 것은?", options: ["홀로그램", "미러", "매트", "헥사곤"], answer: 2 },
    { id: 34, topic: 3, question: "스톤을 붙이는 데 사용하는 접착제는?", options: ["순간접착제", "젤 또는 네일 글루", "목공용 풀", "스프레이 접착제"], answer: 1 },
    { id: 35, topic: 3, question: "네일 스티커의 장점은?", options: ["영구적", "간편하고 빠름", "비용 많이 듦", "전문 기술 필요"], answer: 1 },
    { id: 36, topic: 3, question: "아크릴 파우더와 함께 사용하는 액체는?", options: ["물", "아세톤", "모노머", "알코올"], answer: 2 },
    { id: 37, topic: 3, question: "네일 파츠 중 진주 형태의 장식은?", options: ["스터드", "펄", "스톤", "참"], answer: 1 },
    { id: 38, topic: 3, question: "에어브러시의 구성요소가 아닌 것은?", options: ["컴프레서", "건", "UV 램프", "호스"], answer: 2 },
    { id: 39, topic: 3, question: "마블링에 적합한 폴리시 특성은?", options: ["빠른 건조", "느린 건조", "고점도", "저점도"], answer: 1 },
    { id: 40, topic: 3, question: "전사지 사용 시 필요한 것은?", options: ["물", "열", "UV 램프", "스팀"], answer: 0 },

    // 트렌드 (41-50)
    { id: 41, topic: 4, question: "옴브레 네일이란?", options: ["단색 네일", "그라데이션 네일", "프렌치 네일", "스톤 네일"], answer: 1 },
    { id: 42, topic: 4, question: "미러 네일의 특징은?", options: ["무광", "거울처럼 반사", "투명", "매트"], answer: 1 },
    { id: 43, topic: 4, question: "젤리 네일의 특징은?", options: ["불투명", "반투명한 젤리 느낌", "무광", "금속 느낌"], answer: 1 },
    { id: 44, topic: 4, question: "캣아이 네일에 사용되는 것은?", options: ["일반 젤", "마그네틱 젤", "아크릴", "일반 폴리시"], answer: 1 },
    { id: 45, topic: 4, question: "글래스 네일의 특징은?", options: ["불투명", "유리조각 같은 반짝임", "무광", "단색"], answer: 1 },
    { id: 46, topic: 4, question: "누드 톤 네일의 장점은?", options: ["화려함", "자연스럽고 다양한 상황에 적합", "개성 표현", "짧아 보임"], answer: 1 },
    { id: 47, topic: 4, question: "네온 컬러 네일의 특징은?", options: ["차분함", "밝고 눈에 띄는 색상", "무채색", "투명"], answer: 1 },
    { id: 48, topic: 4, question: "미니멀 네일 트렌드란?", options: ["화려한 장식", "단순하고 깔끔한 디자인", "3D 아트", "전체 글리터"], answer: 1 },
    { id: 49, topic: 4, question: "시즌별 네일 트렌드에서 봄에 인기 있는 색은?", options: ["다크 톤", "파스텔 톤", "블랙", "네이비"], answer: 1 },
    { id: 50, topic: 4, question: "크롬 네일 파우더의 효과는?", options: ["매트", "금속 광택", "투명", "무광"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('beauty-nail-nail-art-progress');
    if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty-nail-nail-art-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index); setShowResult(true);
    const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered);
    if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1);
  };

  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-nail-nail-art-progress'); };

  const handleAIHelp = (question: string, options: string[], answer: number) => {
    const prompt = `미용사(네일) 네일 아트 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`;
    setCurrentPrompt(prompt); setShowAIModal(true);
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800">← 뒤로</Link>
            <div className="flex-1"><h1 className="text-xl font-bold text-gray-800">네일 아트</h1><p className="text-sm text-gray-500">미용사(네일) 필기과목</p></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-rose-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>
            {topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4"><span className="text-sm text-rose-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div>
          <h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50'}`}>
                <span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mt-4 p-4 bg-rose-50 rounded-xl">
              <p className="text-rose-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p>
              <p className="text-sm text-rose-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p>
              <button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900">🤖 AI에게 해설 요청하기</button>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button>
          <button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-600">다음 →</button>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div>
              <p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
