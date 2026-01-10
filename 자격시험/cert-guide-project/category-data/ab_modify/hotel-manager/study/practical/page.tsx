'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HotelPracticalStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState('');

  const topics = [
    { id: 0, name: '호텔 운영 전략', count: 10 },
    { id: 1, name: '마케팅 기획', count: 10 },
    { id: 2, name: '재무 분석', count: 10 },
    { id: 3, name: '인사·조직 관리', count: 10 },
    { id: 4, name: '서비스 품질 관리', count: 10 },
  ];

  const questions = [
    // 호텔 운영 전략 (10문항)
    { id: 1, topic: 0, question: "호텔 객실 점유율이 60%에서 80%로 상승할 때 예상되는 효과로 적절한 것은?", options: ["매출 감소", "매출 증가 및 고정비 분산 효과", "인건비만 증가", "객실 수 감소"], answer: 1 },
    { id: 2, topic: 0, question: "비수기 호텔 운영 전략으로 적절하지 않은 것은?", options: ["패키지 상품 개발", "기업 행사 유치", "객실 가격 대폭 인상", "장기 투숙 할인"], answer: 2 },
    { id: 3, topic: 0, question: "호텔의 레비뉴 매니지먼트 도입 목적은?", options: ["고정 가격 유지", "수요 예측 기반 수익 극대화", "무료 서비스 확대", "직원 수 증가"], answer: 1 },
    { id: 4, topic: 0, question: "호텔 오버부킹 시 발생한 Walk 고객 대응 방안은?", options: ["무시", "동급 이상 호텔 배정 및 교통편 제공", "환불 거부", "다음 예약 취소"], answer: 1 },
    { id: 5, topic: 0, question: "호텔 식음료 부문 수익성 개선 방안은?", options: ["메뉴 단가 무조건 인하", "원가 관리 및 메뉴 엔지니어링", "직원 전원 해고", "영업시간 단축"], answer: 1 },
    { id: 6, topic: 0, question: "호텔의 운영 효율성을 측정하는 지표가 아닌 것은?", options: ["RevPAR", "점유율", "날씨", "ADR"], answer: 2 },
    { id: 7, topic: 0, question: "호텔 체크인/아웃 프로세스 개선 방안은?", options: ["대기 시간 증가", "모바일 체크인 도입", "직원 감축으로 혼잡 유발", "서비스 축소"], answer: 1 },
    { id: 8, topic: 0, question: "호텔의 에너지 비용 절감 방안은?", options: ["에너지 낭비 방치", "LED 조명, 스마트 온도 제어 시스템 도입", "24시간 전력 최대 사용", "창문 개방만 허용"], answer: 1 },
    { id: 9, topic: 0, question: "호텔 위기관리 계획에 포함될 내용이 아닌 것은?", options: ["비상 대피 절차", "언론 대응 방안", "경쟁사 방해 계획", "고객 안전 확보"], answer: 2 },
    { id: 10, topic: 0, question: "호텔 체인의 브랜드 표준 유지 방법은?", options: ["각 호텔 자율에 맡김", "정기 감사 및 교육 실시", "표준 무시", "브랜드 폐기"], answer: 1 },

    // 마케팅 기획 (10문항)
    { id: 11, topic: 1, question: "호텔 신규 오픈 마케팅 전략으로 적절한 것은?", options: ["홍보 없이 오픈", "사전 홍보, 오픈 프로모션, 인플루언서 마케팅", "가격 비공개", "예약 불가 정책"], answer: 1 },
    { id: 12, topic: 1, question: "호텔 타겟 고객 설정 시 고려사항이 아닌 것은?", options: ["고객 니즈", "구매력", "날씨만 고려", "방문 목적"], answer: 2 },
    { id: 13, topic: 1, question: "호텔 로열티 프로그램 설계 시 핵심 요소는?", options: ["혜택 없음", "포인트 적립, 등급별 혜택, 개인화 서비스", "회비만 징수", "차별 금지"], answer: 1 },
    { id: 14, topic: 1, question: "호텔 패키지 상품 기획 시 고려사항은?", options: ["고객 선호도 무시", "시즌, 고객층, 경쟁사 분석", "원가 무시", "판매가만 결정"], answer: 1 },
    { id: 15, topic: 1, question: "호텔 온라인 마케팅 채널 선정 기준은?", options: ["비용만 고려", "타겟 고객 도달률, ROI, 브랜드 적합성", "무작위 선정", "경쟁사 배제"], answer: 1 },
    { id: 16, topic: 1, question: "호텔 리뷰 마케팅의 중요성은?", options: ["리뷰 무시", "예약 결정에 영향, 온라인 평판 관리", "부정적 리뷰만 홍보", "리뷰 삭제"], answer: 1 },
    { id: 17, topic: 1, question: "호텔 MICE 마케팅 전략은?", options: ["개인 고객만 타겟", "기업·단체 행사 유치, B2B 영업 강화", "소규모 행사만", "MICE 포기"], answer: 1 },
    { id: 18, topic: 1, question: "호텔 마케팅 예산 편성 시 고려사항은?", options: ["무제한 예산", "목표 대비 ROI, 채널별 효율성", "예산 없이 진행", "광고 전면 중단"], answer: 1 },
    { id: 19, topic: 1, question: "호텔 위기 시 마케팅 커뮤니케이션 원칙은?", options: ["정보 은폐", "투명하고 신속한 정보 제공", "언론 회피", "고객 비난"], answer: 1 },
    { id: 20, topic: 1, question: "호텔 브랜드 차별화 전략의 예시는?", options: ["경쟁사 모방", "독특한 컨셉, 서비스 차별화, 로컬 경험 제공", "모든 호텔 동일화", "브랜드 무시"], answer: 1 },

    // 재무 분석 (10문항)
    { id: 21, topic: 2, question: "RevPAR 100달러, ADR 125달러일 때 점유율은?", options: ["60%", "80%", "100%", "125%"], answer: 1 },
    { id: 22, topic: 2, question: "호텔 GOP(Gross Operating Profit) 향상 방안은?", options: ["매출 감소", "매출 증가 및 비용 효율화", "비용 증가만", "인력 무한 증원"], answer: 1 },
    { id: 23, topic: 2, question: "호텔 손익분기점 분석의 목적은?", options: ["최대 손실 계산", "수익과 비용이 같아지는 매출 수준 파악", "고정비 무시", "변동비만 분석"], answer: 1 },
    { id: 24, topic: 2, question: "호텔 부서별 수익성 분석 시 사용하는 지표는?", options: ["개인 취향", "부서별 GOP, 원가율, 생산성", "날씨", "객실 수만"], answer: 1 },
    { id: 25, topic: 2, question: "호텔 투자 의사결정에 사용되는 재무 분석 기법은?", options: ["감정적 판단", "NPV, IRR, Payback Period", "추측", "경쟁사 모방"], answer: 1 },
    { id: 26, topic: 2, question: "호텔 현금흐름 관리의 중요성은?", options: ["현금 무시", "유동성 확보 및 운영 자금 관리", "현금 낭비", "대출만 의존"], answer: 1 },
    { id: 27, topic: 2, question: "호텔 예산 대비 실적 분석에서 유리한 차이란?", options: ["실제 비용 > 예산", "실제 비용 < 예산 또는 실제 매출 > 예산", "차이 없음", "분석 불필요"], answer: 1 },
    { id: 28, topic: 2, question: "호텔 식음료 원가율 목표가 30%일 때, 판매가 5만원 메뉴의 목표 원가는?", options: ["10,000원", "15,000원", "20,000원", "25,000원"], answer: 1 },
    { id: 29, topic: 2, question: "호텔 재무제표 분석의 목적이 아닌 것은?", options: ["경영 성과 평가", "재무 건전성 파악", "경쟁사 비밀 탈취", "투자 의사결정"], answer: 2 },
    { id: 30, topic: 2, question: "호텔 인건비율이 높을 때 개선 방안은?", options: ["임금 미지급", "생산성 향상, 적정 인력 배치", "서비스 중단", "인력 무한 충원"], answer: 1 },

    // 인사·조직 관리 (10문항)
    { id: 31, topic: 3, question: "호텔 직원 채용 시 고려사항은?", options: ["외모만 중시", "역량, 경험, 서비스 마인드 평가", "무작위 선발", "친인척 우선"], answer: 1 },
    { id: 32, topic: 3, question: "호텔 신입 직원 오리엔테이션의 목적은?", options: ["업무 배제", "조직 문화 이해, 업무 숙지, 소속감 형성", "즉시 현장 투입만", "교육 생략"], answer: 1 },
    { id: 33, topic: 3, question: "호텔 직원 교육 프로그램의 종류가 아닌 것은?", options: ["서비스 교육", "안전 교육", "불법 행위 교육", "외국어 교육"], answer: 2 },
    { id: 34, topic: 3, question: "호텔 직원 동기부여 방안은?", options: ["성과 무시", "인정, 보상, 성장 기회 제공", "처벌만 강조", "의사소통 차단"], answer: 1 },
    { id: 35, topic: 3, question: "호텔 인력 배치의 기본 원칙은?", options: ["무작위 배치", "적재적소 배치, 업무량 고려", "인력 과잉 배치만", "인력 부족 방치"], answer: 1 },
    { id: 36, topic: 3, question: "호텔 직원 이직률이 높을 때 원인 분석 방법은?", options: ["원인 무시", "퇴직 면담, 직원 만족도 조사", "이직자 비난", "채용 중단"], answer: 1 },
    { id: 37, topic: 3, question: "호텔 조직 구조 설계 시 고려사항은?", options: ["비효율 추구", "부서 간 협업, 의사결정 체계, 책임 명확화", "혼란 조장", "개인 위주만"], answer: 1 },
    { id: 38, topic: 3, question: "호텔 리더십의 역할이 아닌 것은?", options: ["비전 제시", "팀 동기부여", "성과 착취", "문제 해결"], answer: 2 },
    { id: 39, topic: 3, question: "호텔 직원 평가 시스템의 목적은?", options: ["처벌 목적만", "성과 측정, 역량 개발, 공정한 보상", "평가 생략", "차별 조장"], answer: 1 },
    { id: 40, topic: 3, question: "호텔 노사관계 관리의 원칙은?", options: ["갈등 조장", "상호 존중, 소통, 합리적 협상", "일방적 통보", "노조 탄압"], answer: 1 },

    // 서비스 품질 관리 (10문항)
    { id: 41, topic: 4, question: "호텔 서비스 품질의 5가지 차원(SERVQUAL)이 아닌 것은?", options: ["신뢰성", "반응성", "가격", "공감성"], answer: 2 },
    { id: 42, topic: 4, question: "호텔 고객 불만 처리 시 첫 번째 단계는?", options: ["변명", "경청 및 공감", "무시", "책임 전가"], answer: 1 },
    { id: 43, topic: 4, question: "호텔 서비스 표준화의 장점은?", options: ["서비스 불일치", "일관된 서비스 품질 제공", "직원 혼란", "고객 불만족"], answer: 1 },
    { id: 44, topic: 4, question: "호텔 미스터리 쇼퍼(Mystery Shopper) 프로그램의 목적은?", options: ["직원 처벌", "서비스 품질 객관적 평가", "비용 낭비", "고객 감시"], answer: 1 },
    { id: 45, topic: 4, question: "호텔 고객 경험 개선을 위한 방법은?", options: ["고객 무시", "고객 여정 분석, 터치포인트 개선", "서비스 축소", "불만 방치"], answer: 1 },
    { id: 46, topic: 4, question: "호텔 직원 권한위임(Empowerment)의 효과는?", options: ["의사결정 지연", "현장에서 신속한 고객 대응", "혼란 증가", "책임 회피"], answer: 1 },
    { id: 47, topic: 4, question: "호텔 서비스 실패 회복(Service Recovery) 전략은?", options: ["무대응", "사과, 보상, 재발 방지 약속", "고객 비난", "책임 부정"], answer: 1 },
    { id: 48, topic: 4, question: "호텔 고객 만족도 조사 방법이 아닌 것은?", options: ["설문조사", "인터뷰", "SNS 모니터링", "고객 정보 판매"], answer: 3 },
    { id: 49, topic: 4, question: "호텔 서비스 차별화를 위한 개인화(Personalization) 전략은?", options: ["모든 고객 동일 대우", "고객 선호도 파악 및 맞춤 서비스", "개인정보 무시", "표준 서비스만"], answer: 1 },
    { id: 50, topic: 4, question: "호텔 VIP 고객 서비스 특징은?", options: ["일반 고객과 동일", "우선 서비스, 특별 혜택, 전담 직원", "차별 금지로 동일 대우", "VIP 개념 폐지"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => {
    const saved = localStorage.getItem('hotel-manager-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotel-manager-practical-progress', JSON.stringify({ answeredQuestions, score }));
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
    localStorage.removeItem('hotel-manager-practical-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`호텔경영사 실기시험 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-manager" className="text-orange-600 hover:text-orange-800 font-medium">← 호텔경영사</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 실기시험 대비</h1>
          <p className="text-gray-500">호텔경영사 실기시험 대비 50문항</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">전체 진행률</span>
            <span className="text-sm font-bold text-orange-600">{answeredQuestions.length}/50 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">정답률: </span>
            <span className="text-sm font-bold text-amber-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 (50)</button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>
            ))}
          </div>
        </div>

        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{topics.find(t => t.id === current.topic)?.name}</span>
              <span className="text-gray-400 text-sm">{currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>
            <div className="space-y-3">
              {current.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : index === selectedAnswer ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-orange-50 hover:border-orange-300 border-2 border-transparent'}`}>
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
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-orange-700 transition">다음 →</button>
        </div>

        <button onClick={resetProgress} className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">🔄 진행 상황 초기화</button>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 필기 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/hotel-manager/study/hotel-management" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔경영론</Link>
            <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
            <Link href="/category/service/hotel-manager/study/hotel-marketing" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔마케팅</Link>
            <Link href="/category/service/hotel-manager/study/hotel-law" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">관광법규</Link>
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
