'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HousekeepingStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '객실 청소', count: 10 },
    { id: 1, name: '린넨 관리', count: 10 },
    { id: 2, name: '품질 점검', count: 10 },
    { id: 3, name: '분실물 처리', count: 10 },
    { id: 4, name: '특수 상황', count: 10 },
  ];

  const questions = [
    // 객실 청소 (10문항)
    { id: 1, topic: 0, question: "객실 청소 시 가장 먼저 해야 할 일은?", options: ["침구 정돈", "문을 열고 환기", "욕실 청소", "쓰레기 수거"], answer: 1 },
    { id: 2, topic: 0, question: "객실 청소 순서로 올바른 것은?", options: ["욕실→침실→거실", "환기→정돈→청소→점검", "점검→청소→환기", "임의 순서"], answer: 1 },
    { id: 3, topic: 0, question: "체크아웃 객실과 스테이오버 객실 청소의 차이점은?", options: ["동일", "체크아웃은 전체 교체, 스테이오버는 정돈 중심", "스테이오버가 더 오래 걸림", "체크아웃만 청소"], answer: 1 },
    { id: 4, topic: 0, question: "침구 교체 시 확인할 사항은?", options: ["색상만", "얼룩, 손상, 청결 상태", "브랜드", "가격"], answer: 1 },
    { id: 5, topic: 0, question: "욕실 청소 시 주의할 점은?", options: ["물기 남기기", "배수구 확인, 소독, 물기 제거", "빠른 작업만", "세제 과다 사용"], answer: 1 },
    { id: 6, topic: 0, question: "미니바 점검 시 확인할 사항이 아닌 것은?", options: ["재고 확인", "유통기한", "고객 신용등급", "청결 상태"], answer: 2 },
    { id: 7, topic: 0, question: "DND(Do Not Disturb) 객실 대응은?", options: ["무조건 입실", "청소 생략, 나중에 재확인", "문 두드리기", "고객 불만"], answer: 1 },
    { id: 8, topic: 0, question: "청소 카트 관리 원칙은?", options: ["정리 불필요", "정리정돈, 청결 유지, 재고 확인", "빈 상태 유지", "복도 방치"], answer: 1 },
    { id: 9, topic: 0, question: "객실 어메니티 보충 기준은?", options: ["고객 요청 시만", "표준 세트 기준 보충", "최소량만", "보충 불필요"], answer: 1 },
    { id: 10, topic: 0, question: "청소 완료 후 마지막 점검 사항은?", options: ["빠른 퇴실", "전등, 에어컨, 커튼, 전체 상태 확인", "문만 닫기", "키 반납만"], answer: 1 },

    // 린넨 관리 (10문항)
    { id: 11, topic: 1, question: "린넨(Linen)에 해당하지 않는 것은?", options: ["시트", "타월", "베갯잇", "의자"], answer: 3 },
    { id: 12, topic: 1, question: "린넨 Par Stock의 의미는?", options: ["최대 보유량", "적정 보유량", "최소 보유량", "폐기량"], answer: 1 },
    { id: 13, topic: 1, question: "린넨 교환 주기로 적절한 것은?", options: ["고객 퇴실 시마다", "1주일", "1개월", "1년"], answer: 0 },
    { id: 14, topic: 1, question: "린넨 세탁 시 분류 기준이 아닌 것은?", options: ["색상", "소재", "고객 국적", "오염도"], answer: 2 },
    { id: 15, topic: 1, question: "린넨 품질 저하 징후가 아닌 것은?", options: ["변색", "마모", "새 제품 냄새", "올 풀림"], answer: 2 },
    { id: 16, topic: 1, question: "린넨룸 관리 원칙은?", options: ["정리 불필요", "정리정돈, 재고 관리, 위생 유지", "잠금 장치 불필요", "아무나 출입"], answer: 1 },
    { id: 17, topic: 1, question: "타월 접기 방식이 중요한 이유는?", options: ["개인 취향", "시각적 통일성 및 품질 인식", "시간 절약만", "불필요"], answer: 1 },
    { id: 18, topic: 1, question: "린넨 손상 시 처리 방법은?", options: ["그냥 사용", "손상 기록, 폐기 또는 수선", "숨기기", "무시"], answer: 1 },
    { id: 19, topic: 1, question: "친환경 린넨 관리 방법은?", options: ["세제 과다 사용", "고객 동의 시 재사용", "매일 전량 교체", "물 낭비"], answer: 1 },
    { id: 20, topic: 1, question: "린넨 재고 조사의 목적은?", options: ["직원 감시", "적정 재고 유지 및 손실 파악", "비용 증가", "업무 회피"], answer: 1 },

    // 품질 점검 (10문항)
    { id: 21, topic: 2, question: "객실 인스펙션(Inspection)의 목적은?", options: ["직원 처벌", "청소 품질 및 객실 상태 확인", "고객 감시", "비용 절감만"], answer: 1 },
    { id: 22, topic: 2, question: "인스펙션 체크리스트 항목이 아닌 것은?", options: ["침구 상태", "욕실 청결", "고객 취향", "조명 작동"], answer: 2 },
    { id: 23, topic: 2, question: "품질 문제 발견 시 조치는?", options: ["무시", "즉시 시정 및 재발 방지", "다음 날 처리", "고객 탓"], answer: 1 },
    { id: 24, topic: 2, question: "객실 품질 등급 평가 기준이 아닌 것은?", options: ["청결도", "비품 상태", "직원 외모", "시설 작동"], answer: 2 },
    { id: 25, topic: 2, question: "인스펙터의 역할이 아닌 것은?", options: ["품질 점검", "직원 교육", "조리 업무", "개선 피드백"], answer: 2 },
    { id: 26, topic: 2, question: "셀프 인스펙션의 장점은?", options: ["시간 낭비", "청소원 스스로 품질 의식 향상", "비용 증가", "책임 회피"], answer: 1 },
    { id: 27, topic: 2, question: "품질 관리 지표(KPI)의 예는?", options: ["고객 불만율, 재청소율", "직원 취미", "날씨", "경쟁사 매출"], answer: 0 },
    { id: 28, topic: 2, question: "VIP 객실 점검 시 추가 확인 사항은?", options: ["일반 객실과 동일", "특별 어메니티, 환영 메시지", "점검 생략", "청소 생략"], answer: 1 },
    { id: 29, topic: 2, question: "품질 개선 회의의 목적은?", options: ["직원 비난", "문제점 공유 및 개선 방안 논의", "시간 낭비", "회피"], answer: 1 },
    { id: 30, topic: 2, question: "고객 피드백 반영 방법은?", options: ["무시", "분석 후 서비스 개선", "비난", "삭제"], answer: 1 },

    // 분실물 처리 (10문항)
    { id: 31, topic: 3, question: "분실물 발견 시 첫 번째 조치는?", options: ["개인 보관", "분실물 대장 기록 및 보관", "버리기", "판매"], answer: 1 },
    { id: 32, topic: 3, question: "분실물 보관 기간은 일반적으로?", options: ["1일", "3~6개월", "1주일", "영구"], answer: 1 },
    { id: 33, topic: 3, question: "귀중품 분실물 처리 시 주의점은?", options: ["일반 물품과 동일", "별도 보관, 관리자 보고", "즉시 폐기", "직원 사용"], answer: 1 },
    { id: 34, topic: 3, question: "분실물 인도 시 확인 사항은?", options: ["확인 없이 전달", "신원 확인, 물품 특징 확인", "무조건 전달", "유상 판매"], answer: 1 },
    { id: 35, topic: 3, question: "분실물 대장에 기록할 내용이 아닌 것은?", options: ["발견 일시", "발견 장소", "발견자 취미", "물품 특징"], answer: 2 },
    { id: 36, topic: 3, question: "고객이 분실물 문의 시 대응은?", options: ["무시", "분실물 대장 확인 후 안내", "거절", "다른 부서 연결만"], answer: 1 },
    { id: 37, topic: 3, question: "분실물 보관 장소의 조건은?", options: ["개방된 장소", "잠금장치가 있는 안전한 장소", "복도", "청소 카트"], answer: 1 },
    { id: 38, topic: 3, question: "보관 기간 경과 분실물 처리는?", options: ["영구 보관", "규정에 따라 처분", "직원 분배", "판매"], answer: 1 },
    { id: 39, topic: 3, question: "해외 고객 분실물 반환 시 고려 사항은?", options: ["반환 불가", "배송비, 통관 절차 안내", "폐기", "무시"], answer: 1 },
    { id: 40, topic: 3, question: "분실물 관리가 중요한 이유는?", options: ["불필요", "고객 신뢰 및 호텔 이미지", "비용 증가", "업무 증가만"], answer: 1 },

    // 특수 상황 (10문항)
    { id: 41, topic: 4, question: "객실에서 해충 발견 시 조치는?", options: ["무시", "즉시 보고 및 방역 조치", "그냥 청소", "고객에게 알리지 않음"], answer: 1 },
    { id: 42, topic: 4, question: "객실 내 파손 발견 시 대응은?", options: ["숨기기", "보고 및 수리 요청", "직접 수리", "무시"], answer: 1 },
    { id: 43, topic: 4, question: "고객 개인 물품 정리 시 원칙은?", options: ["임의 이동", "위치 유지, 정돈만", "폐기", "숨기기"], answer: 1 },
    { id: 44, topic: 4, question: "전염병 의심 객실 청소 시 주의점은?", options: ["일반 청소", "보호장구 착용, 특별 소독", "청소 거부", "빠른 작업만"], answer: 1 },
    { id: 45, topic: 4, question: "화재 발생 시 하우스키핑 직원 역할은?", options: ["청소 계속", "대피 유도, 비상 연락", "방관", "개인 대피만"], answer: 1 },
    { id: 46, topic: 4, question: "고객 응급 상황 발견 시 조치는?", options: ["무시", "119 신고 및 관리자 보고", "혼자 처리", "퇴근"], answer: 1 },
    { id: 47, topic: 4, question: "객실 내 의심스러운 물품 발견 시?", options: ["직접 처리", "보고 후 지시 대기", "폐기", "개인 보관"], answer: 1 },
    { id: 48, topic: 4, question: "장기 투숙객 객실 관리 시 고려점은?", options: ["청소 생략", "고객 스케줄 고려, 프라이버시 존중", "매일 전체 청소", "무시"], answer: 1 },
    { id: 49, topic: 4, question: "고객 불만 접수 시 하우스키핑 직원 대응은?", options: ["변명", "경청, 사과, 즉시 조치", "무시", "고객 탓"], answer: 1 },
    { id: 50, topic: 4, question: "자연재해 시 객실 점검 사항은?", options: ["점검 불필요", "피해 상황, 안전 확인", "청소만", "무시"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-admin-housekeeping-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-admin-housekeeping-progress', JSON.stringify({ answeredQuestions, score }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const current = filteredQuestions[currentQuestion];
    if (index === current.answer && !answeredQuestions.includes(current.id)) {
      setScore(score + 1);
    }
    if (!answeredQuestions.includes(current.id)) {
      setAnsweredQuestions([...answeredQuestions, current.id]);
    }
  };

  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions([]); localStorage.removeItem('hotel-admin-housekeeping-progress'); };
  const openAIModal = (question: string) => { setCurrentQuestionForAI(question); setShowAIModal(true); };
  const getAIUrl = (ai: string) => { const prompt = encodeURIComponent(`호텔관리사 하우스키핑 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`); switch (ai) { case 'claude': return `https://claude.ai/new?q=${prompt}`; case 'chatgpt': return `https://chat.openai.com/?q=${prompt}`; case 'gemini': return `https://gemini.google.com/?q=${prompt}`; default: return '#'; } };

  const current = filteredQuestions[currentQuestion];
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-admin" className="text-rose-600 hover:text-rose-800 font-medium">← 호텔관리사</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🧹 하우스키핑</h1>
          <p className="text-gray-500">호텔관리사 필기시험 대비 50문항</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">전체 진행률</span><span className="text-sm font-bold text-rose-600">{answeredQuestions.length}/50 문제</span></div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div></div>
          <div className="mt-2 text-right"><span className="text-sm text-gray-500">정답률: </span><span className="text-sm font-bold text-pink-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span></div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>
            {topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}
          </div>
        </div>

        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4"><span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span><span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span></div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>
            <div className="space-y-3">{current.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-rose-50 hover:border-rose-300 border-2 border-transparent'}`}><span className="font-medium">{index + 1}. {option}</span></button>))}</div>
            {showResult && (<div className={`mt-6 p-4 rounded-xl ${selectedAnswer === current.answer ? 'bg-green-50' : 'bg-red-50'}`}><p className={`font-bold ${selectedAnswer === current.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === current.answer ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}</p><p className="text-gray-600 mt-2">정답: {current.answer + 1}. {current.options[current.answer]}</p><button onClick={() => openAIModal(current.question)} className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition">🤖 AI에게 자세한 설명 듣기</button></div>)}
          </div>
        )}

        <div className="flex gap-4"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-300 transition">← 이전</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-700 transition">다음 →</button></div>
        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/hotel-admin/study/front-office" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">프런트오피스</Link>
            <Link href="/category/service/hotel-admin/study/fb-service" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">F&B서비스</Link>
            <Link href="/category/service/hotel-admin/study/hotel-english" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">호텔영어</Link>
            <Link href="/category/service/hotel-admin/study/practical" className="py-3 px-4 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기시험</Link>
          </div>
        </div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full"><h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하여 자세한 설명을 들어보세요</p><div className="space-y-3"><a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-center font-medium hover:from-orange-500 hover:to-orange-600 transition">Claude</a><a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition">ChatGPT</a><a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition">Gemini</a></div><button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button></div></div>)}
    </div>
  );
}
