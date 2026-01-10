'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MakeupTheoryPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '메이크업 역사', count: 10 },
    { id: 1, name: '피부학', count: 10 },
    { id: 2, name: '위생 소독', count: 10 },
    { id: 3, name: '화장품학', count: 10 },
    { id: 4, name: '뷰티 트렌드', count: 10 },
  ];

  const questions = [
    // 메이크업 역사 (1-10)
    { id: 1, topic: 0, question: "고대 이집트에서 사용된 아이 메이크업 재료는?", options: ["콜(Kohl)", "루주", "백분", "연지"], answer: 0 },
    { id: 2, topic: 0, question: "르네상스 시대 여성들이 선호한 피부색은?", options: ["태닝 피부", "창백한 피부", "황금빛 피부", "붉은 피부"], answer: 1 },
    { id: 3, topic: 0, question: "1920년대 메이크업 트렌드의 특징은?", options: ["자연스러운 메이크업", "진한 스모키 눈화장", "핑크 메이크업", "무화장"], answer: 1 },
    { id: 4, topic: 0, question: "한국 전통 화장에서 사용한 흰 분의 주성분은?", options: ["납", "밀가루", "쌀가루", "조개껍데기"], answer: 2 },
    { id: 5, topic: 0, question: "빅토리아 시대의 메이크업 특징은?", options: ["화려한 색조", "최소한의 메이크업", "진한 아이라인", "붉은 입술"], answer: 1 },
    { id: 6, topic: 0, question: "메이크업이 대중화되기 시작한 시기는?", options: ["18세기", "19세기", "20세기 초", "21세기"], answer: 2 },
    { id: 7, topic: 0, question: "할리우드 메이크업의 시작과 관련된 것은?", options: ["패션쇼", "영화 산업", "궁중 문화", "종교 의식"], answer: 1 },
    { id: 8, topic: 0, question: "1950년대 대표적인 메이크업 아이콘은?", options: ["트위기", "마릴린 먼로", "클레오파트라", "오드리 헵번"], answer: 1 },
    { id: 9, topic: 0, question: "K-뷰티가 세계적으로 주목받기 시작한 시기는?", options: ["1990년대", "2000년대", "2010년대", "1980년대"], answer: 2 },
    { id: 10, topic: 0, question: "메이크업 아티스트라는 직업이 등장한 배경은?", options: ["패션쇼", "영화와 TV 산업", "미용실", "화장품 광고"], answer: 1 },

    // 피부학 (11-20)
    { id: 11, topic: 1, question: "피부의 가장 바깥층은?", options: ["진피", "표피", "피하지방", "근육층"], answer: 1 },
    { id: 12, topic: 1, question: "멜라닌 색소를 생성하는 세포는?", options: ["각질세포", "멜라노사이트", "랑게르한스세포", "섬유아세포"], answer: 1 },
    { id: 13, topic: 1, question: "피부의 pH 정상 범위는?", options: ["3.0~4.0", "4.5~6.5", "7.0~8.0", "8.5~9.5"], answer: 1 },
    { id: 14, topic: 1, question: "지성 피부의 특징이 아닌 것은?", options: ["번들거림", "모공 확대", "건조함", "여드름 발생"], answer: 2 },
    { id: 15, topic: 1, question: "피부 탄력에 관여하는 진피 성분은?", options: ["케라틴", "콜라겐과 엘라스틴", "멜라닌", "히알루론산"], answer: 1 },
    { id: 16, topic: 1, question: "T존 부위는 어디인가?", options: ["볼과 턱", "이마, 코, 턱", "눈가", "입술 주변"], answer: 1 },
    { id: 17, topic: 1, question: "민감성 피부의 특징은?", options: ["피지 과다", "자극에 쉽게 반응", "각질 두꺼움", "모공 확대"], answer: 1 },
    { id: 18, topic: 1, question: "피부 노화의 내적 요인이 아닌 것은?", options: ["나이", "호르몬 변화", "자외선", "유전"], answer: 2 },
    { id: 19, topic: 1, question: "피부 턴오버 주기는 약?", options: ["7일", "14일", "28일", "60일"], answer: 2 },
    { id: 20, topic: 1, question: "건성 피부에 적합한 케어는?", options: ["수렴 토너", "유분기 있는 보습", "피지 컨트롤", "각질 제거 강화"], answer: 1 },

    // 위생 소독 (21-30)
    { id: 21, topic: 2, question: "메이크업 브러시 세척 주기는?", options: ["매일", "주 1회", "월 1회", "년 1회"], answer: 1 },
    { id: 22, topic: 2, question: "일회용 스펀지 사용의 장점은?", options: ["경제적", "교차 감염 방지", "내구성", "재사용 가능"], answer: 1 },
    { id: 23, topic: 2, question: "메이크업 아티스트의 손 위생 시점이 아닌 것은?", options: ["시술 전", "시술 후", "점심 시간", "고객 변경 시"], answer: 2 },
    { id: 24, topic: 2, question: "립스틱 위생 관리 방법은?", options: ["직접 바름", "립브러시 또는 스패출라 사용", "손가락으로", "공유"], answer: 1 },
    { id: 25, topic: 2, question: "마스카라 사용 시 위생 수칙은?", options: ["공유 가능", "일회용 완드 사용", "직접 도포", "여러 번 펌핑"], answer: 1 },
    { id: 26, topic: 2, question: "브러시 소독에 적합한 방법은?", options: ["물에 담그기", "알코올 스프레이", "열탕 소독", "자연 건조만"], answer: 1 },
    { id: 27, topic: 2, question: "메이크업 스테이션 소독 시기는?", options: ["하루 끝", "고객마다", "주 1회", "월 1회"], answer: 1 },
    { id: 28, topic: 2, question: "화장품 유통기한 확인이 중요한 이유는?", options: ["가격", "안전성", "색상", "향기"], answer: 1 },
    { id: 29, topic: 2, question: "아이 메이크업 도구 공유 시 위험은?", options: ["색상 변화", "눈 감염", "피부 건조", "알레르기"], answer: 1 },
    { id: 30, topic: 2, question: "파우더 제품의 위생적 사용법은?", options: ["손가락 사용", "개인 브러시/퍼프 사용", "직접 터치", "공유 브러시"], answer: 1 },

    // 화장품학 (31-40)
    { id: 31, topic: 3, question: "프라이머의 주요 기능은?", options: ["클렌징", "메이크업 밀착력 향상", "보습", "자외선 차단"], answer: 1 },
    { id: 32, topic: 3, question: "파운데이션의 종류가 아닌 것은?", options: ["리퀴드", "크림", "파우더", "세럼"], answer: 3 },
    { id: 33, topic: 3, question: "컨실러의 용도는?", options: ["광택 부여", "결점 커버", "피부 세정", "보습"], answer: 1 },
    { id: 34, topic: 3, question: "세팅 파우더의 역할은?", options: ["색조", "메이크업 고정", "클렌징", "보습"], answer: 1 },
    { id: 35, topic: 3, question: "SPF는 무엇을 나타내는가?", options: ["보습력", "자외선 차단 지수", "색상", "유통기한"], answer: 1 },
    { id: 36, topic: 3, question: "크림 블러셔와 파우더 블러셔의 차이는?", options: ["색상", "제형과 질감", "가격", "브랜드"], answer: 1 },
    { id: 37, topic: 3, question: "워터프루프 제품의 특징은?", options: ["수분 함량 높음", "물에 강함", "유분 많음", "알코올 함유"], answer: 1 },
    { id: 38, topic: 3, question: "매트 립스틱의 특징은?", options: ["광택", "무광 마무리", "투명", "보습"], answer: 1 },
    { id: 39, topic: 3, question: "아이섀도 프라이머의 역할은?", options: ["클렌징", "발색력과 지속력 향상", "보습", "자외선 차단"], answer: 1 },
    { id: 40, topic: 3, question: "하이라이터의 주요 성분은?", options: ["납", "펄 파우더/반짝이 입자", "오일", "알코올"], answer: 1 },

    // 뷰티 트렌드 (41-50)
    { id: 41, topic: 4, question: "K-뷰티의 특징이 아닌 것은?", options: ["자연스러운 피부 표현", "과한 컨투어링", "촉촉한 피부", "투명 메이크업"], answer: 1 },
    { id: 42, topic: 4, question: "글래스 스킨이란?", options: ["매트 피부", "유리알처럼 맑은 피부", "태닝 피부", "건조한 피부"], answer: 1 },
    { id: 43, topic: 4, question: "노메이크업 룩의 특징은?", options: ["진한 색조", "자연스러운 맨얼굴 느낌", "화려한 눈화장", "강한 윤곽"], answer: 1 },
    { id: 44, topic: 4, question: "클린 뷰티의 핵심은?", options: ["화려한 색상", "친환경, 유해성분 배제", "저가 제품", "강한 향"], answer: 1 },
    { id: 45, topic: 4, question: "스트로빙 기법이란?", options: ["음영 강조", "하이라이트로 광채 표현", "매트 마무리", "진한 컨투어"], answer: 1 },
    { id: 46, topic: 4, question: "Y2K 메이크업 트렌드의 특징은?", options: ["자연스러움", "글리터, 펄, 과한 블러셔", "무채색", "무광"], answer: 1 },
    { id: 47, topic: 4, question: "비건 화장품이란?", options: ["동물성 성분/동물실험 배제", "저가 제품", "오가닉", "의약품"], answer: 0 },
    { id: 48, topic: 4, question: "SNS가 뷰티 트렌드에 미친 영향은?", options: ["영향 없음", "트렌드 확산 가속화", "트렌드 감소", "전통 회귀"], answer: 1 },
    { id: 49, topic: 4, question: "젠더리스 뷰티란?", options: ["여성 전용", "남성 전용", "성별 구분 없는 뷰티", "아동용"], answer: 2 },
    { id: 50, topic: 4, question: "지속가능 뷰티 트렌드의 핵심은?", options: ["과대 포장", "환경과 사회적 책임", "저가 전략", "대량 생산"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('beauty-makeup-makeup-theory-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); } }, []);
  useEffect(() => { localStorage.setItem('beauty-makeup-makeup-theory-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered); if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1); };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-makeup-makeup-theory-progress'); };
  const handleAIHelp = (question: string, options: string[], answer: number) => { const prompt = `미용사(메이크업) 메이크업 개론 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`; setCurrentPrompt(prompt); setShowAIModal(true); };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-fuchsia-100"><div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><Link href="/category/service/beauty-makeup" className="text-fuchsia-600 hover:text-fuchsia-800">← 뒤로</Link><div className="flex-1"><h1 className="text-xl font-bold text-gray-800">메이크업 개론</h1><p className="text-sm text-gray-500">미용사(메이크업) 필기과목</p></div></div></div></header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-fuchsia-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div></div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6"><div className="flex justify-between items-center mb-4"><span className="text-sm text-fuchsia-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2><div className="space-y-3">{currentQ.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-fuchsia-300 hover:bg-fuchsia-50'}`}><span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}</button>))}</div>{showResult && (<div className="mt-4 p-4 bg-fuchsia-50 rounded-xl"><p className="text-fuchsia-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p><p className="text-sm text-fuchsia-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p><button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-fuchsia-700 hover:text-fuchsia-900">🤖 AI에게 해설 요청하기</button></div>)}</div>

        <div className="flex gap-3"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button><button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-fuchsia-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-fuchsia-600">다음 →</button></div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
