'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FrontOfficeStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '체크인/아웃', count: 10 },
    { id: 1, name: '예약 관리', count: 10 },
    { id: 2, name: '객실 배정', count: 10 },
    { id: 3, name: '컨시어지', count: 10 },
    { id: 4, name: '야간 업무', count: 10 },
  ];

  const questions = [
    // 체크인/아웃 (10문항)
    { id: 1, topic: 0, question: "체크인 시 가장 먼저 확인해야 할 사항은?", options: ["객실 청소 상태", "예약 확인 및 고객 신원 확인", "미니바 재고", "주차 안내"], answer: 1 },
    { id: 2, topic: 0, question: "체크인 시 고객에게 받아야 하는 필수 서류는?", options: ["운전면허증만", "신분증(여권/주민등록증)", "명함", "학생증"], answer: 1 },
    { id: 3, topic: 0, question: "Express Check-out의 장점이 아닌 것은?", options: ["고객 편의성 증대", "프런트 혼잡 감소", "체크아웃 시간 연장", "신속한 퇴실"], answer: 2 },
    { id: 4, topic: 0, question: "체크아웃 시 확인해야 할 사항이 아닌 것은?", options: ["미결제 요금", "객실 키 반납", "다음 고객 정보", "미니바 사용 내역"], answer: 2 },
    { id: 5, topic: 0, question: "Late Check-out 요청 시 적절한 대응은?", options: ["무조건 거절", "객실 상황 확인 후 안내", "무조건 승인", "다른 직원에게 전달"], answer: 1 },
    { id: 6, topic: 0, question: "체크인 시 객실 키 전달과 함께 안내할 사항이 아닌 것은?", options: ["조식 시간", "Wi-Fi 비밀번호", "직원 개인 연락처", "비상구 위치"], answer: 2 },
    { id: 7, topic: 0, question: "체크인 대기 고객이 많을 때 적절한 조치는?", options: ["천천히 처리", "대기 고객에게 사과하고 신속히 처리", "다른 직원 호출 없이 혼자 처리", "고객에게 나중에 오라고 함"], answer: 1 },
    { id: 8, topic: 0, question: "Pre-registration의 목적은?", options: ["고객 정보 삭제", "체크인 시간 단축", "체크아웃 지연", "예약 취소"], answer: 1 },
    { id: 9, topic: 0, question: "고객이 체크인 시 예약이 없다고 주장할 때?", options: ["바로 거절", "예약 시스템 재확인 및 다른 이름으로 검색", "다른 호텔 안내만", "무시"], answer: 1 },
    { id: 10, topic: 0, question: "체크아웃 후 고객 분실물 발견 시 조치는?", options: ["버리기", "분실물 등록 및 고객 연락", "개인 보관", "다른 고객에게 제공"], answer: 1 },

    // 예약 관리 (10문항)
    { id: 11, topic: 1, question: "예약 접수 시 반드시 확인해야 할 정보가 아닌 것은?", options: ["투숙 기간", "객실 타입", "고객 혈액형", "연락처"], answer: 2 },
    { id: 12, topic: 1, question: "No-show의 정의는?", options: ["조기 체크아웃", "예약 후 연락 없이 미도착", "늦은 체크인", "예약 변경"], answer: 1 },
    { id: 13, topic: 1, question: "예약 보증(Guarantee)의 목적은?", options: ["예약 취소", "No-show 방지 및 객실 확보", "가격 인상", "고객 차별"], answer: 1 },
    { id: 14, topic: 1, question: "예약 변경 요청 시 확인할 사항은?", options: ["변경 날짜 객실 가용 여부", "고객 취미", "날씨", "직원 스케줄"], answer: 0 },
    { id: 15, topic: 1, question: "그룹 예약(Group Reservation)의 특징이 아닌 것은?", options: ["다수 객실 예약", "특별 요금 적용 가능", "개인 예약과 동일 처리", "사전 조율 필요"], answer: 2 },
    { id: 16, topic: 1, question: "예약 확인서(Confirmation)에 포함될 내용이 아닌 것은?", options: ["예약 번호", "투숙 기간", "객실 요금", "직원 주소"], answer: 3 },
    { id: 17, topic: 1, question: "Waitlist 관리의 목적은?", options: ["예약 거절", "만실 시 대기 고객 관리", "예약 삭제", "가격 인상"], answer: 1 },
    { id: 18, topic: 1, question: "예약 취소 시 확인할 사항은?", options: ["취소 수수료 정책", "고객 국적", "날씨", "경쟁사 가격"], answer: 0 },
    { id: 19, topic: 1, question: "OTA(Online Travel Agency) 예약의 특징은?", options: ["전화 예약만", "온라인 플랫폼 통한 예약", "직접 방문 예약", "팩스 예약"], answer: 1 },
    { id: 20, topic: 1, question: "예약 Overbooking의 위험성은?", options: ["수익 증가만", "고객 불만 및 Walk 발생", "예약 감소", "직원 증가"], answer: 1 },

    // 객실 배정 (10문항)
    { id: 21, topic: 2, question: "객실 배정 시 우선 고려 사항은?", options: ["직원 편의", "고객 요청 및 객실 상태", "청소 순서", "임의 배정"], answer: 1 },
    { id: 22, topic: 2, question: "VIP 고객 객실 배정 시 고려할 점은?", options: ["일반 객실 배정", "고층/전망 좋은 객실, 사전 점검", "저층 배정", "무작위 배정"], answer: 1 },
    { id: 23, topic: 2, question: "객실 상태 코드 'VC'의 의미는?", options: ["점유 중", "청소 필요", "Vacant Clean(빈 객실, 청소 완료)", "고장"], answer: 2 },
    { id: 24, topic: 2, question: "Connecting Room의 특징은?", options: ["독립된 객실", "내부 문으로 연결된 인접 객실", "스위트룸만", "1인실만"], answer: 1 },
    { id: 25, topic: 2, question: "장애인 고객 객실 배정 시 고려할 점은?", options: ["고층 배정", "접근성 좋은 객실 및 편의시설 확인", "일반 객실만", "무시"], answer: 1 },
    { id: 26, topic: 2, question: "객실 업그레이드 제공 상황이 아닌 것은?", options: ["VIP 고객 우대", "객실 불만족 보상", "무조건 모든 고객", "특별 이벤트"], answer: 2 },
    { id: 27, topic: 2, question: "객실 배정 시스템(PMS)의 기능이 아닌 것은?", options: ["객실 현황 확인", "예약 관리", "음식 조리", "고객 정보 조회"], answer: 2 },
    { id: 28, topic: 2, question: "Stay-over 객실이란?", options: ["체크아웃 객실", "연박 투숙 중인 객실", "빈 객실", "고장 객실"], answer: 1 },
    { id: 29, topic: 2, question: "Due-out 리스트의 용도는?", options: ["입실 예정 고객", "당일 체크아웃 예정 객실 확인", "청소 순서", "VIP 목록"], answer: 1 },
    { id: 30, topic: 2, question: "객실 변경(Room Change) 요청 시 절차는?", options: ["무조건 거절", "사유 확인, 대체 객실 확보, 고객 안내", "비용 청구만", "무시"], answer: 1 },

    // 컨시어지 (10문항)
    { id: 31, topic: 3, question: "컨시어지 서비스의 범위가 아닌 것은?", options: ["관광 안내", "레스토랑 예약", "객실 청소", "교통 안내"], answer: 2 },
    { id: 32, topic: 3, question: "고객이 공연 티켓을 요청할 때 대응은?", options: ["불가능하다고 함", "예매 대행 또는 안내", "무시", "다른 고객에게 전달"], answer: 1 },
    { id: 33, topic: 3, question: "컨시어지가 지역 정보를 알아야 하는 이유는?", options: ["개인 용도", "정확한 관광 및 편의 안내 제공", "회사 보고", "비용 절감"], answer: 1 },
    { id: 34, topic: 3, question: "고객 수하물 보관 서비스 제공 시 주의점은?", options: ["보관증 없이 보관", "보관증 발급 및 보안 관리", "무료 보관만", "장기 보관 불가"], answer: 1 },
    { id: 35, topic: 3, question: "컨시어지에게 요청되는 특수 서비스의 예는?", options: ["객실 청소", "꽃 배달, 서프라이즈 준비", "회계 업무", "인사 관리"], answer: 1 },
    { id: 36, topic: 3, question: "공항 픽업 서비스 안내 시 확인할 정보는?", options: ["고객 취미", "항공편, 도착 시간, 연락처", "객실 번호만", "식사 선호"], answer: 1 },
    { id: 37, topic: 3, question: "컨시어지의 네트워킹이 중요한 이유는?", options: ["개인 인맥", "다양한 서비스 연결 및 예약 용이", "경쟁사 정보", "직원 평가"], answer: 1 },
    { id: 38, topic: 3, question: "고객 비밀 유지의 중요성은?", options: ["중요하지 않음", "고객 신뢰 및 프라이버시 보호", "홍보 목적", "비용 절감"], answer: 1 },
    { id: 39, topic: 3, question: "렌터카 예약 대행 시 확인 사항은?", options: ["고객 혈액형", "면허증, 희망 차종, 기간", "객실 번호만", "식사 선호"], answer: 1 },
    { id: 40, topic: 3, question: "컨시어지 데스크 위치가 로비인 이유는?", options: ["청소 편의", "고객 접근성 및 가시성", "비용 절감", "직원 감시"], answer: 1 },

    // 야간 업무 (10문항)
    { id: 41, topic: 4, question: "Night Audit의 주요 업무는?", options: ["객실 청소", "일일 매출 정산 및 객실 현황 점검", "조식 준비", "수영장 관리"], answer: 1 },
    { id: 42, topic: 4, question: "야간 근무 시 보안 점검 사항이 아닌 것은?", options: ["출입문 확인", "CCTV 모니터링", "메뉴 개발", "비상구 확인"], answer: 2 },
    { id: 43, topic: 4, question: "야간에 발생한 응급 상황 대응 순서는?", options: ["무시", "상황 파악, 응급 조치, 관리자 보고", "퇴근", "다음 날 처리"], answer: 1 },
    { id: 44, topic: 4, question: "야간 체크인 고객 응대 시 주의점은?", options: ["큰 소리로 대화", "조용하고 신속한 응대", "긴 설명", "다른 업무 우선"], answer: 1 },
    { id: 45, topic: 4, question: "Night Audit에서 Bucket Check란?", options: ["버킷 청소", "객실 상태와 시스템 기록 대조 확인", "음료 점검", "린넨 점검"], answer: 1 },
    { id: 46, topic: 4, question: "야간 근무 인수인계 시 전달 사항은?", options: ["개인 일정", "특이 사항, 대기 업무, 고객 요청", "퇴근 시간만", "날씨"], answer: 1 },
    { id: 47, topic: 4, question: "야간에 손님 불만 접수 시 대응은?", options: ["다음 날 처리", "즉시 경청하고 가능한 조치", "무시", "변명만"], answer: 1 },
    { id: 48, topic: 4, question: "야간 모닝콜 설정의 중요성은?", options: ["중요하지 않음", "고객 일정 준수 지원", "호텔 편의", "비용 절감"], answer: 1 },
    { id: 49, topic: 4, question: "야간 보고서에 포함될 내용이 아닌 것은?", options: ["객실 점유율", "특이 사항", "개인 감상", "매출 현황"], answer: 2 },
    { id: 50, topic: 4, question: "야간 근무 시 고객 안전 확보 방법은?", options: ["무관심", "정기 순찰, 비상 연락망 확보", "잠자기", "외출"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-admin-front-office-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-admin-front-office-progress', JSON.stringify({ answeredQuestions, score }));
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

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    localStorage.removeItem('hotel-admin-front-office-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔관리사 프런트오피스 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
    switch (ai) {
      case 'claude': return `https://claude.ai/new?q=${prompt}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${prompt}`;
      case 'gemini': return `https://gemini.google.com/?q=${prompt}`;
      default: return '#';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🛎️ 프런트오피스</h1>
          <p className="text-gray-500">호텔관리사 필기시험 대비 50문항</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">전체 진행률</span>
            <span className="text-sm font-bold text-rose-600">{answeredQuestions.length}/50 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">정답률: </span>
            <span className="text-sm font-bold text-pink-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>
            ))}
          </div>
        </div>

        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span>
              <span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>
            <div className="space-y-3">
              {current.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-rose-50 hover:border-rose-300 border-2 border-transparent'}`}>
                  <span className="font-medium">{index + 1}. {option}</span>
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === current.answer ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-bold ${selectedAnswer === current.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === current.answer ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}</p>
                <p className="text-gray-600 mt-2">정답: {current.answer + 1}. {current.options[current.answer]}</p>
                <button onClick={() => openAIModal(current.question)} className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition">🤖 AI에게 자세한 설명 듣기</button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-300 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-700 transition">다음 →</button>
        </div>

        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/hotel-admin/study/housekeeping" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">하우스키핑</Link>
            <Link href="/category/service/hotel-admin/study/fb-service" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">F&B서비스</Link>
            <Link href="/category/service/hotel-admin/study/hotel-english" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">호텔영어</Link>
            <Link href="/category/service/hotel-admin/study/practical" className="py-3 px-4 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기시험</Link>
          </div>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하여 자세한 설명을 들어보세요</p>
            <div className="space-y-3">
              <a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-center font-medium hover:from-orange-500 hover:to-orange-600 transition">Claude</a>
              <a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition">ChatGPT</a>
              <a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition">Gemini</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
