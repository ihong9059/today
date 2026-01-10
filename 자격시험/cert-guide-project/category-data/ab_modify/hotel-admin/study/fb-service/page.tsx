'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FBServiceStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '레스토랑 서비스', count: 10 },
    { id: 1, name: '연회 서비스', count: 10 },
    { id: 2, name: '룸서비스', count: 10 },
    { id: 3, name: '바 서비스', count: 10 },
    { id: 4, name: '위생·안전', count: 10 },
  ];

  const questions = [
    // 레스토랑 서비스 (10문항)
    { id: 1, topic: 0, question: "테이블 세팅 순서로 올바른 것은?", options: ["냅킨→포크→나이프→접시", "접시→포크→나이프→글라스→냅킨", "글라스→접시→냅킨", "무작위"], answer: 1 },
    { id: 2, topic: 0, question: "고객 착석 시 서버의 첫 행동은?", options: ["주문 받기", "인사 및 메뉴 제공", "음식 서빙", "계산서 전달"], answer: 1 },
    { id: 3, topic: 0, question: "음식 서빙 방향으로 올바른 것은?", options: ["오른쪽에서", "왼쪽에서", "뒤에서", "정면에서"], answer: 1 },
    { id: 4, topic: 0, question: "음료 서빙 방향으로 올바른 것은?", options: ["왼쪽에서", "오른쪽에서", "뒤에서", "정면에서"], answer: 1 },
    { id: 5, topic: 0, question: "코스 요리 순서로 올바른 것은?", options: ["메인→에피타이저→디저트", "에피타이저→수프→메인→디저트", "디저트→메인→수프", "무작위"], answer: 1 },
    { id: 6, topic: 0, question: "고객이 알레르기를 언급할 때 대응은?", options: ["무시", "주방에 전달 및 대체 메뉴 안내", "거절", "일반 메뉴 제공"], answer: 1 },
    { id: 7, topic: 0, question: "와인 서비스 순서로 올바른 것은?", options: ["무조건 따르기", "라벨 확인→오픈→시음→서빙", "고객 혼자 따르게 함", "글라스만 제공"], answer: 1 },
    { id: 8, topic: 0, question: "Crumbing(크러밍)의 의미는?", options: ["테이블 청소", "식사 중 테이블 부스러기 정리", "설거지", "쓰레기 버리기"], answer: 1 },
    { id: 9, topic: 0, question: "계산서 전달 시기로 적절한 것은?", options: ["식사 중", "고객 요청 시", "입장 즉시", "무작위"], answer: 1 },
    { id: 10, topic: 0, question: "레스토랑 서비스 품질 향상 방법이 아닌 것은?", options: ["교육", "피드백 반영", "고객 무시", "표준화"], answer: 2 },

    // 연회 서비스 (10문항)
    { id: 11, topic: 1, question: "연회 BEO(Banquet Event Order)의 내용이 아닌 것은?", options: ["행사 일시", "인원", "직원 급여", "메뉴"], answer: 2 },
    { id: 12, topic: 1, question: "연회장 세팅 시 가장 먼저 할 일은?", options: ["음식 준비", "BEO 확인 및 레이아웃 설정", "고객 입장", "퇴장 준비"], answer: 1 },
    { id: 13, topic: 1, question: "뷔페 서비스의 장점이 아닌 것은?", options: ["다양한 선택", "대량 서비스 가능", "개인별 정교한 서빙", "시간 효율"], answer: 2 },
    { id: 14, topic: 1, question: "연회 중 음식 보충 시 주의점은?", options: ["빈 그릇 무시", "청결한 그릇 교체 및 온도 유지", "음식 섞기", "무작위 보충"], answer: 1 },
    { id: 15, topic: 1, question: "연회 진행 시 서버 역할이 아닌 것은?", options: ["음식 서빙", "고객 안내", "개인 전화 통화", "테이블 정리"], answer: 2 },
    { id: 16, topic: 1, question: "칵테일 파티의 특징은?", options: ["착석 식사", "스탠딩, 핑거푸드, 음료 중심", "코스 요리", "긴 식사 시간"], answer: 1 },
    { id: 17, topic: 1, question: "연회 후 정리 시 확인 사항은?", options: ["빠른 퇴근", "분실물, 시설 점검, 정리 완료 확인", "청소 생략", "다음 날 처리"], answer: 1 },
    { id: 18, topic: 1, question: "웨딩 연회 시 특별 고려 사항은?", options: ["일반 연회와 동일", "축하 분위기, 케이크 커팅, 진행 순서", "간단한 서비스", "서비스 축소"], answer: 1 },
    { id: 19, topic: 1, question: "연회 테이블 배치 'Theater Style'의 특징은?", options: ["원탁 배치", "강의식, 의자만 배치", "U자형", "교실형"], answer: 1 },
    { id: 20, topic: 1, question: "연회 서비스 개선을 위한 방법은?", options: ["피드백 무시", "고객 설문, 직원 교육, 절차 개선", "서비스 축소", "가격 인상만"], answer: 1 },

    // 룸서비스 (10문항)
    { id: 21, topic: 2, question: "룸서비스 주문 접수 시 확인 사항은?", options: ["고객 취미", "객실 번호, 메뉴, 수량, 특별 요청", "날씨", "경쟁사 정보"], answer: 1 },
    { id: 22, topic: 2, question: "룸서비스 배달 시 음식 온도 유지 방법은?", options: ["무관심", "보온/보냉 장비 사용", "천천히 배달", "음식 노출"], answer: 1 },
    { id: 23, topic: 2, question: "룸서비스 트레이/카트 세팅에 포함될 것이 아닌 것은?", options: ["식기", "냅킨", "개인 소지품", "조미료"], answer: 2 },
    { id: 24, topic: 2, question: "객실 문 앞 도착 시 첫 행동은?", options: ["그냥 들어가기", "노크 후 인사", "큰 소리로 부르기", "문 열고 확인"], answer: 1 },
    { id: 25, topic: 2, question: "룸서비스 24시간 운영의 목적은?", options: ["비용 증가", "고객 편의 및 만족도 향상", "직원 피로", "매출 감소"], answer: 1 },
    { id: 26, topic: 2, question: "룸서비스 메뉴 가격이 높은 이유는?", options: ["이유 없음", "배달 서비스, 편의성 비용 포함", "음식 품질 낮음", "고객 차별"], answer: 1 },
    { id: 27, topic: 2, question: "룸서비스 식기 회수 절차는?", options: ["고객이 알아서", "일정 시간 후 회수 전화 또는 문 앞 수거", "회수 안 함", "다음 날 수거"], answer: 1 },
    { id: 28, topic: 2, question: "룸서비스 불만 발생 시 대응은?", options: ["무시", "사과 및 즉시 조치", "변명", "고객 탓"], answer: 1 },
    { id: 29, topic: 2, question: "조식 룸서비스 Door Knob Menu란?", options: ["레스토랑 메뉴", "문고리에 걸어두는 사전 주문서", "전화 주문", "온라인 주문"], answer: 1 },
    { id: 30, topic: 2, question: "룸서비스 서빙 시 프라이버시 고려 방법은?", options: ["객실 구경", "신속히 세팅 후 퇴실", "대화 길게", "사진 촬영"], answer: 1 },

    // 바 서비스 (10문항)
    { id: 31, topic: 3, question: "바텐더의 역할이 아닌 것은?", options: ["칵테일 제조", "고객 응대", "객실 청소", "재고 관리"], answer: 2 },
    { id: 32, topic: 3, question: "칵테일 제조 시 기본 기법이 아닌 것은?", options: ["Shaking", "Stirring", "Roasting", "Building"], answer: 2 },
    { id: 33, topic: 3, question: "바 재고 관리에서 Par Stock의 의미는?", options: ["최대 재고", "적정 재고 수준", "최소 재고", "폐기량"], answer: 1 },
    { id: 34, topic: 3, question: "음주 고객 관리 시 주의점은?", options: ["무제한 제공", "과음 방지 및 안전 확보", "빠른 서비스만", "무관심"], answer: 1 },
    { id: 35, topic: 3, question: "바 위생 관리에 해당하지 않는 것은?", options: ["글라스 세척", "작업대 청결", "개인 음주", "기구 소독"], answer: 2 },
    { id: 36, topic: 3, question: "호텔 로비바의 특징은?", options: ["숨겨진 위치", "접근성 좋고 분위기 조성", "저가 음료만", "셀프서비스"], answer: 1 },
    { id: 37, topic: 3, question: "바 음료 가격 책정 시 고려 요소는?", options: ["날씨만", "원가, 경쟁사, 고객층", "직원 취향", "무작위"], answer: 1 },
    { id: 38, topic: 3, question: "미니바 관리 담당 부서는?", options: ["조리부", "하우스키핑 또는 F&B", "인사부", "회계부"], answer: 1 },
    { id: 39, topic: 3, question: "바 마감 시 체크 사항이 아닌 것은?", options: ["재고 확인", "매출 정산", "개인 일정", "청소 완료"], answer: 2 },
    { id: 40, topic: 3, question: "바에서 고객 추천 시 고려할 점은?", options: ["비싼 음료만", "고객 취향, 식사 여부, 분위기", "메뉴 무시", "판매량만"], answer: 1 },

    // 위생·안전 (10문항)
    { id: 41, topic: 4, question: "식품위생법상 식품접객업 종사자의 의무는?", options: ["건강진단", "무관심", "개인 취미", "휴가"], answer: 0 },
    { id: 42, topic: 4, question: "HACCP의 목적은?", options: ["맛 향상", "식품 안전 위해 요소 관리", "비용 절감만", "디자인 개선"], answer: 1 },
    { id: 43, topic: 4, question: "식재료 보관 온도 기준이 아닌 것은?", options: ["냉장 5°C 이하", "냉동 -18°C 이하", "상온 50°C", "적정 온도 유지"], answer: 2 },
    { id: 44, topic: 4, question: "교차오염 방지 방법은?", options: ["도마 구분 없이 사용", "식재료별 도구 분리, 손 세척", "생고기와 채소 함께 보관", "무관심"], answer: 1 },
    { id: 45, topic: 4, question: "식중독 예방의 3원칙이 아닌 것은?", options: ["청결", "신속", "가열/냉각", "음식 방치"], answer: 3 },
    { id: 46, topic: 4, question: "조리 종사자 개인 위생 기준이 아닌 것은?", options: ["손 세척", "위생복 착용", "악세서리 착용", "손톱 관리"], answer: 2 },
    { id: 47, topic: 4, question: "식품 알레르기 정보 제공의 중요성은?", options: ["불필요", "고객 안전 및 법적 의무", "메뉴 축소", "비용 증가만"], answer: 1 },
    { id: 48, topic: 4, question: "주방 화재 발생 시 첫 대응은?", options: ["무시", "화재 경보, 초기 진화 시도, 대피", "조리 계속", "퇴근"], answer: 1 },
    { id: 49, topic: 4, question: "유통기한 관리 원칙은?", options: ["무시", "선입선출(FIFO)", "후입선출", "무작위 사용"], answer: 1 },
    { id: 50, topic: 4, question: "고객에게 상한 음식 제공 시 법적 책임은?", options: ["없음", "민형사 책임 발생", "고객 책임", "호텔 무관"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('hotel-admin-fb-service-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(data.answeredQuestions || []); setScore(data.score || 0); } }, []);
  useEffect(() => { localStorage.setItem('hotel-admin-fb-service-progress', JSON.stringify({ answeredQuestions, score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const current = filteredQuestions[currentQuestion]; if (index === current.answer && !answeredQuestions.includes(current.id)) { setScore(score + 1); } if (!answeredQuestions.includes(current.id)) { setAnsweredQuestions([...answeredQuestions, current.id]); } };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions([]); localStorage.removeItem('hotel-admin-fb-service-progress'); };
  const openAIModal = (question: string) => { setCurrentQuestionForAI(question); setShowAIModal(true); };
  const getAIUrl = (ai: string) => { const prompt = encodeURIComponent(`호텔관리사 F&B서비스 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`); switch (ai) { case 'claude': return `https://claude.ai/new?q=${prompt}`; case 'chatgpt': return `https://chat.openai.com/?q=${prompt}`; case 'gemini': return `https://gemini.google.com/?q=${prompt}`; default: return '#'; } };

  const current = filteredQuestions[currentQuestion];
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40"><div className="max-w-6xl mx-auto px-4 py-4"><Link href="/category/service/hotel-admin" className="text-rose-600 hover:text-rose-800 font-medium">← 호텔관리사</Link></div></header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-gray-800 mb-2">🍽️ F&B서비스</h1><p className="text-gray-500">호텔관리사 필기시험 대비 50문항</p></div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">전체 진행률</span><span className="text-sm font-bold text-rose-600">{answeredQuestions.length}/50 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div></div><div className="mt-2 text-right"><span className="text-sm text-gray-500">정답률: </span><span className="text-sm font-bold text-pink-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span></div></div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6"><p className="text-sm text-gray-500 mb-3">토픽별 필터</p><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        {current && (<div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><div className="flex justify-between items-center mb-4"><span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span><span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2><div className="space-y-3">{current.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-rose-50 hover:border-rose-300 border-2 border-transparent'}`}><span className="font-medium">{index + 1}. {option}</span></button>))}</div>{showResult && (<div className={`mt-6 p-4 rounded-xl ${selectedAnswer === current.answer ? 'bg-green-50' : 'bg-red-50'}`}><p className={`font-bold ${selectedAnswer === current.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === current.answer ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}</p><p className="text-gray-600 mt-2">정답: {current.answer + 1}. {current.options[current.answer]}</p><button onClick={() => openAIModal(current.question)} className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition">🤖 AI에게 자세한 설명 듣기</button></div>)}</div>)}

        <div className="flex gap-4"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-300 transition">← 이전</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-700 transition">다음 →</button></div>
        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm"><h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3><div className="grid grid-cols-2 gap-3"><Link href="/category/service/hotel-admin/study/front-office" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">프런트오피스</Link><Link href="/category/service/hotel-admin/study/housekeeping" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">하우스키핑</Link><Link href="/category/service/hotel-admin/study/hotel-english" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">호텔영어</Link><Link href="/category/service/hotel-admin/study/practical" className="py-3 px-4 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기시험</Link></div></div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full"><h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하여 자세한 설명을 들어보세요</p><div className="space-y-3"><a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-center font-medium hover:from-orange-500 hover:to-orange-600 transition">Claude</a><a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition">ChatGPT</a><a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition">Gemini</a></div><button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button></div></div>)}
    </div>
  );
}
