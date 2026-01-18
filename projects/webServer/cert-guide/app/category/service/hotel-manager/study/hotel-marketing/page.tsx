'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HotelMarketingStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '마케팅 믹스', count: 10 },
    { id: 1, name: '고객관리', count: 10 },
    { id: 2, name: '디지털 마케팅', count: 10 },
    { id: 3, name: '브랜딩', count: 10 },
    { id: 4, name: '가격전략', count: 10 },
  ];

  const questions = [
    // 마케팅 믹스 (10문항)
    { id: 1, topic: 0, question: "마케팅 믹스 4P에 해당하지 않는 것은?", options: ["Product", "Price", "Place", "People"], answer: 3 },
    { id: 2, topic: 0, question: "호텔 마케팅에서 'Product'에 해당하는 것은?", options: ["객실 가격", "객실 및 서비스", "예약 채널", "광고 활동"], answer: 1 },
    { id: 3, topic: 0, question: "서비스 마케팅 7P에서 추가되는 3P가 아닌 것은?", options: ["People", "Process", "Physical Evidence", "Profit"], answer: 3 },
    { id: 4, topic: 0, question: "호텔의 'Place' 전략에 해당하는 것은?", options: ["객실 인테리어", "예약 채널 및 유통망", "직원 서비스", "가격 정책"], answer: 1 },
    { id: 5, topic: 0, question: "호텔 'Promotion' 활동이 아닌 것은?", options: ["광고", "홍보(PR)", "판촉", "객실 청소"], answer: 3 },
    { id: 6, topic: 0, question: "통합 마케팅 커뮤니케이션(IMC)의 목적은?", options: ["각 채널 독립 운영", "일관된 브랜드 메시지 전달", "비용 증가", "마케팅 축소"], answer: 1 },
    { id: 7, topic: 0, question: "호텔 마케팅에서 'Physical Evidence'의 예시는?", options: ["광고 문구", "객실 인테리어와 시설", "할인 쿠폰", "예약 시스템"], answer: 1 },
    { id: 8, topic: 0, question: "STP 전략에서 'T'가 의미하는 것은?", options: ["Testing", "Targeting", "Trading", "Training"], answer: 1 },
    { id: 9, topic: 0, question: "호텔 시장 세분화(Segmentation) 기준이 아닌 것은?", options: ["지리적 기준", "인구통계적 기준", "심리적 기준", "날씨 기준"], answer: 3 },
    { id: 10, topic: 0, question: "포지셔닝(Positioning)의 의미는?", options: ["가격 설정", "시장에서 차별화된 위치 확보", "인력 배치", "객실 배정"], answer: 1 },

    // 고객관리 (10문항)
    { id: 11, topic: 1, question: "CRM(Customer Relationship Management)의 목적은?", options: ["비용 증가", "고객과의 장기적 관계 구축", "직원 관리", "시설 관리"], answer: 1 },
    { id: 12, topic: 1, question: "호텔 고객 충성도 프로그램의 장점이 아닌 것은?", options: ["반복 방문 유도", "고객 데이터 수집", "가격 경쟁력 약화", "고객 유지"], answer: 2 },
    { id: 13, topic: 1, question: "고객 생애 가치(CLV)란?", options: ["1회 구매 금액", "고객이 평생 창출할 예상 수익", "고객 나이", "고객 수"], answer: 1 },
    { id: 14, topic: 1, question: "호텔 VIP 고객 관리 방법으로 적절하지 않은 것은?", options: ["개인화된 서비스", "특별 혜택 제공", "모든 고객과 동일 대우", "우선 예약 권한"], answer: 2 },
    { id: 15, topic: 1, question: "고객 불만 처리의 LEARN 기법에서 'L'의 의미는?", options: ["Lead", "Listen", "Learn", "Leave"], answer: 1 },
    { id: 16, topic: 1, question: "Net Promoter Score(NPS)는 무엇을 측정하는가?", options: ["매출액", "고객 추천 의향", "직원 만족도", "시설 품질"], answer: 1 },
    { id: 17, topic: 1, question: "고객 세분화에서 RFM 분석의 'R'이 의미하는 것은?", options: ["Revenue", "Recency", "Rating", "Ranking"], answer: 1 },
    { id: 18, topic: 1, question: "호텔 리뷰 관리의 중요성이 아닌 것은?", options: ["온라인 평판 관리", "개선점 파악", "리뷰 무시", "고객 신뢰 구축"], answer: 2 },
    { id: 19, topic: 1, question: "고객 접점(Touch Point) 관리의 목적은?", options: ["고객 회피", "모든 접점에서 긍정적 경험 제공", "접점 최소화", "비용 절감만"], answer: 1 },
    { id: 20, topic: 1, question: "고객 피드백 수집 방법이 아닌 것은?", options: ["설문조사", "인터뷰", "소셜미디어 모니터링", "고객 무시"], answer: 3 },

    // 디지털 마케팅 (10문항)
    { id: 21, topic: 2, question: "호텔 웹사이트에서 직접 예약의 장점은?", options: ["높은 수수료", "중개 수수료 절감", "고객 데이터 없음", "브랜드 노출 감소"], answer: 1 },
    { id: 22, topic: 2, question: "OTA(Online Travel Agency)의 예시가 아닌 것은?", options: ["Booking.com", "Expedia", "Agoda", "Microsoft"], answer: 3 },
    { id: 23, topic: 2, question: "SEO(Search Engine Optimization)의 목적은?", options: ["유료 광고 증가", "검색 결과 상위 노출", "소셜미디어 관리", "이메일 발송"], answer: 1 },
    { id: 24, topic: 2, question: "호텔 소셜미디어 마케팅의 장점이 아닌 것은?", options: ["고객과 소통", "브랜드 인지도 향상", "비용 과다 지출", "바이럴 마케팅"], answer: 2 },
    { id: 25, topic: 2, question: "구글 호텔 광고의 특징은?", options: ["가격 비교 및 직접 예약 유도", "신문 광고", "TV 광고", "옥외 광고"], answer: 0 },
    { id: 26, topic: 2, question: "이메일 마케팅에서 Open Rate이란?", options: ["구매 전환율", "이메일 열람률", "클릭률", "이탈률"], answer: 1 },
    { id: 27, topic: 2, question: "호텔 메타서치의 기능은?", options: ["객실 청소", "여러 OTA 가격 비교", "직원 관리", "회계 처리"], answer: 1 },
    { id: 28, topic: 2, question: "리타겟팅(Retargeting) 광고란?", options: ["신규 고객 타겟", "이전 방문자 대상 광고", "직원 교육", "시설 개보수"], answer: 1 },
    { id: 29, topic: 2, question: "호텔 모바일 앱의 장점이 아닌 것은?", options: ["모바일 체크인", "고객 편의성", "개발 및 유지 비용 없음", "푸시 알림"], answer: 2 },
    { id: 30, topic: 2, question: "디지털 마케팅 성과 지표(KPI)가 아닌 것은?", options: ["전환율", "클릭당 비용(CPC)", "날씨", "ROI"], answer: 2 },

    // 브랜딩 (10문항)
    { id: 31, topic: 3, question: "호텔 브랜드의 구성 요소가 아닌 것은?", options: ["로고", "슬로건", "브랜드 스토리", "객실 수"], answer: 3 },
    { id: 32, topic: 3, question: "브랜드 아이덴티티(Brand Identity)란?", options: ["고객이 인식하는 이미지", "기업이 의도하는 브랜드 이미지", "경쟁사 브랜드", "가격 정책"], answer: 1 },
    { id: 33, topic: 3, question: "호텔 체인의 브랜드 포트폴리오 전략의 장점은?", options: ["단일 브랜드만 운영", "다양한 고객층 타겟", "브랜드 축소", "경쟁 회피"], answer: 1 },
    { id: 34, topic: 3, question: "브랜드 확장(Brand Extension)의 예시는?", options: ["호텔 브랜드로 레스토랑 론칭", "브랜드 폐기", "가격 인하", "직원 감축"], answer: 0 },
    { id: 35, topic: 3, question: "호텔 브랜드 차별화 전략이 아닌 것은?", options: ["독특한 디자인", "차별화된 서비스", "경쟁사 모방", "특별한 고객 경험"], answer: 2 },
    { id: 36, topic: 3, question: "브랜드 인지도(Brand Awareness) 제고 방법은?", options: ["광고 중단", "일관된 마케팅 활동", "브랜드 숨기기", "가격만 강조"], answer: 1 },
    { id: 37, topic: 3, question: "호텔 브랜드 로열티의 지표가 아닌 것은?", options: ["재방문율", "추천 의향", "부정적 리뷰 수", "멤버십 가입률"], answer: 2 },
    { id: 38, topic: 3, question: "리브랜딩(Rebranding)을 고려하는 상황은?", options: ["브랜드 성과 우수", "브랜드 이미지 노후화", "매출 증가", "고객 만족도 높음"], answer: 1 },
    { id: 39, topic: 3, question: "호텔의 브랜드 경험(Brand Experience)에 해당하는 것은?", options: ["광고 시청만", "투숙 중 모든 고객 경험", "예약 취소", "경쟁사 이용"], answer: 1 },
    { id: 40, topic: 3, question: "Co-branding의 의미는?", options: ["단일 브랜드 운영", "두 브랜드의 협력 마케팅", "브랜드 폐기", "가격 할인"], answer: 1 },

    // 가격전략 (10문항)
    { id: 41, topic: 4, question: "호텔 다이나믹 프라이싱(Dynamic Pricing)이란?", options: ["고정 가격 유지", "수요에 따른 유동적 가격 책정", "최저가 유지", "가격 비공개"], answer: 1 },
    { id: 42, topic: 4, question: "레비뉴 매니지먼트의 핵심 목표는?", options: ["객실 비우기", "수익 극대화", "가격 인하", "고객 감소"], answer: 1 },
    { id: 43, topic: 4, question: "호텔 가격 전략에서 Rack Rate란?", options: ["할인 가격", "공시 정가", "특가", "무료"], answer: 1 },
    { id: 44, topic: 4, question: "가격 차별화 전략의 기준이 아닌 것은?", options: ["시간대", "고객 유형", "예약 시기", "직원 이름"], answer: 3 },
    { id: 45, topic: 4, question: "호텔 Best Available Rate(BAR)란?", options: ["최고 가격", "조건 없이 가장 좋은 가격", "최저가 보장", "고정 가격"], answer: 1 },
    { id: 46, topic: 4, question: "번들 프라이싱(Bundle Pricing)의 예시는?", options: ["객실만 판매", "객실+조식+스파 패키지", "무료 제공", "가격 비공개"], answer: 1 },
    { id: 47, topic: 4, question: "호텔 LOS(Length of Stay) 가격 전략이란?", options: ["체류 기간에 따른 가격 차등", "모든 기간 동일 가격", "1박만 허용", "장기 투숙 금지"], answer: 0 },
    { id: 48, topic: 4, question: "가격 경쟁력 분석에서 Comp Set이란?", options: ["자사 호텔만", "경쟁 호텔 그룹", "전 세계 호텔", "폐업 호텔"], answer: 1 },
    { id: 49, topic: 4, question: "호텔 얼리버드(Early Bird) 할인의 목적은?", options: ["조기 예약 유도", "마지막 순간 예약 유도", "가격 인상", "예약 감소"], answer: 0 },
    { id: 50, topic: 4, question: "호텔 가격 전략에서 Parity란?", options: ["가격 차별화", "채널 간 동일 가격 유지", "최저가 경쟁", "가격 비공개"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-manager-marketing-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-manager-marketing-progress', JSON.stringify({ answeredQuestions, score }));
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
    localStorage.removeItem('hotel-manager-marketing-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔경영사 호텔마케팅 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-manager" className="text-amber-600 hover:text-amber-800 font-medium">← 호텔경영사</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 호텔마케팅</h1>
          <p className="text-gray-500">호텔경영사 필기시험 대비 50문항</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">전체 진행률</span>
            <span className="text-sm font-bold text-amber-600">{answeredQuestions.length}/50 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">정답률: </span>
            <span className="text-sm font-bold text-orange-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>
            ))}
          </div>
        </div>

        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span>
              <span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>
            <div className="space-y-3">
              {current.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-amber-50 hover:border-amber-300 border-2 border-transparent'}`}>
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
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-amber-700 transition">다음 →</button>
        </div>

        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/hotel-manager/study/hotel-management" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔경영론</Link>
            <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
            <Link href="/category/service/hotel-manager/study/hotel-law" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">관광법규</Link>
            <Link href="/category/service/hotel-manager/study/practical" className="py-3 px-4 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">실기시험</Link>
          </div>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
