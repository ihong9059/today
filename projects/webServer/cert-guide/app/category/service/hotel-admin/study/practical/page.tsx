'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HotelAdminPracticalStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '프런트 업무', count: 10 },
    { id: 1, name: '하우스키핑', count: 10 },
    { id: 2, name: 'F&B 서비스', count: 10 },
    { id: 3, name: '고객 관리', count: 10 },
    { id: 4, name: '상황 대처', count: 10 },
  ];

  const questions = [
    // 프런트 업무 (10문항)
    { id: 1, topic: 0, question: "[실기] 체크인 절차를 순서대로 서술하시오.", options: ["예약 확인 → 신분증 확인 → 등록카드 작성 → 결제 → 객실 키 전달 → 안내", "신분증 확인 → 예약 확인 → 결제 → 등록카드 작성 → 객실 키 전달 → 안내", "결제 → 예약 확인 → 신분증 확인 → 등록카드 작성 → 안내 → 객실 키 전달", "객실 키 전달 → 예약 확인 → 신분증 확인 → 등록카드 작성 → 결제 → 안내"], answer: 0 },
    { id: 2, topic: 0, question: "[실기] 오버부킹 발생 시 대응 절차는?", options: ["손님에게 사과하고 돌려보내기", "동급 이상 객실 배정 → 없으면 타 호텔 연계 → 보상 제공 → 후속 관리", "예약 취소 처리 후 환불", "대기시키고 빈 방이 생길 때까지 기다리게 하기"], answer: 1 },
    { id: 3, topic: 0, question: "[실기] 얼리 체크인(Early Check-in) 요청 시 처리 방법은?", options: ["무조건 거절", "객실 준비 상황 확인 → 가능 시 추가 요금 안내 → 배정 또는 짐 보관 서비스 제공", "다음 날 오라고 안내", "로비에서 대기시키기"], answer: 1 },
    { id: 4, topic: 0, question: "[실기] 예약 없이 방문한 워크인(Walk-in) 고객 응대 절차는?", options: ["예약 없으면 돌려보내기", "객실 현황 확인 → 객실/요금 안내 → 예약 진행 → 체크인 절차", "무조건 가장 비싼 방 권유", "대기 명단에 등록"], answer: 1 },
    { id: 5, topic: 0, question: "[실기] VIP 고객 체크인 시 특별 서비스 내용을 3가지 이상 서술하시오.", options: ["일반 고객과 동일하게 처리", "전담 직원 배치, 우선 체크인, 객실 업그레이드, 웰컴 어메니티, 컨시어지 연결", "그냥 빠르게 처리", "특별 서비스 없음"], answer: 1 },
    { id: 6, topic: 0, question: "[실기] 체크아웃 시 청구서 이의 제기 대응은?", options: ["이의를 무시하고 결제 요구", "경청 → 내역 확인 → 오류 시 수정, 정당 시 설명 → 양해 구하기", "무조건 할인 제공", "매니저에게 넘기고 자리 피하기"], answer: 1 },
    { id: 7, topic: 0, question: "[실기] 객실 키 분실 신고 시 처리 절차는?", options: ["새 키 바로 발급", "신분 확인 → 기존 키 비활성화 → 새 키 발급 → 분실 기록 작성", "보증금 징수 후 발급", "경찰 신고"], answer: 1 },
    { id: 8, topic: 0, question: "[실기] 레이트 체크아웃(Late Check-out) 요청 처리 방법은?", options: ["무조건 거절", "당일 예약 상황 확인 → 가능 여부 판단 → 추가 요금 안내 → 승인 처리", "무조건 허용", "객실료 전액 추가 청구"], answer: 1 },
    { id: 9, topic: 0, question: "[실기] 야간 근무(Night Audit) 시 주요 업무를 서술하시오.", options: ["그냥 대기", "일일 마감 정산, 객실 현황 점검, 익일 준비, 보안 순찰, 야간 고객 응대", "청소만 담당", "낮 근무자 업무 인계만"], answer: 1 },
    { id: 10, topic: 0, question: "[실기] 외화 환전 요청 시 처리 절차는?", options: ["환전 불가 안내", "환율 확인 → 고객 안내 → 신분 확인 → 환전 처리 → 영수증 발급", "무조건 은행 안내", "현금만 받고 처리"], answer: 1 },

    // 하우스키핑 (10문항)
    { id: 11, topic: 1, question: "[실기] 객실 청소 표준 절차를 순서대로 서술하시오.", options: ["대충 청소 → 마무리", "노크/확인 → 환기 → 쓰레기/린넨 수거 → 침구 정리 → 욕실 청소 → 비품 보충 → 점검", "비품 보충 → 쓰레기 수거 → 침구 정리", "욕실만 청소하고 완료"], answer: 1 },
    { id: 12, topic: 1, question: "[실기] 턴다운 서비스(Turn-down Service) 내용을 서술하시오.", options: ["그냥 청소", "침대 정리, 커튼 클로즈, 조명 조절, 슬리퍼/가운 배치, 초콜릿/물 준비", "아침 서비스", "체크아웃 서비스"], answer: 1 },
    { id: 13, topic: 1, question: "[실기] 린넨 관리 절차를 서술하시오.", options: ["그냥 세탁", "수거 → 분류 → 세탁 → 건조 → 다림질 → 적재 → 재고 관리", "외부 업체에 맡기기", "손님이 직접 처리"], answer: 1 },
    { id: 14, topic: 1, question: "[실기] DND(Do Not Disturb) 객실 관리 방법은?", options: ["무시하고 청소", "DND 존중 → 일정 시간 후 확인 연락 → 필요시 보안 확인 → 기록 유지", "그냥 패스", "매니저에게 보고만"], answer: 1 },
    { id: 15, topic: 1, question: "[실기] 분실물 발견 시 처리 절차는?", options: ["버리기", "발견 즉시 보고 → 분실물 대장 기록 → 보관 → 소유자 확인 → 반환 처리", "직접 보관", "경찰에 신고"], answer: 1 },
    { id: 16, topic: 1, question: "[실기] 객실 품질 점검(Room Inspection) 체크리스트 항목을 5가지 이상 서술하시오.", options: ["대충 확인", "청결도, 비품 상태, 침구 상태, 욕실 상태, 조명, 어메니티, 미니바, 냄새 등", "침대만 확인", "욕실만 확인"], answer: 1 },
    { id: 17, topic: 1, question: "[실기] 체크아웃 후 객실 점검 시 확인 사항은?", options: ["청소만", "분실물 확인, 파손 여부, 미니바 사용 내역, 비품 이상 유무, 다음 고객 준비", "키만 확인", "미니바만 확인"], answer: 1 },
    { id: 18, topic: 1, question: "[실기] 미니바 관리 절차를 서술하시오.", options: ["손님 자율", "일일 점검 → 사용 내역 기록 → 보충 → 유통기한 관리 → 청구 처리", "주 1회 점검", "체크아웃 시만 확인"], answer: 1 },
    { id: 19, topic: 1, question: "[실기] 세탁 서비스(Laundry Service) 처리 절차는?", options: ["세탁소 연락처 안내", "수거 → 품목/상태 확인 → 세탁 처리 → 품질 점검 → 배달 → 청구", "손님이 직접 세탁", "무조건 외부 위탁"], answer: 1 },
    { id: 20, topic: 1, question: "[실기] 객실 파손 발견 시 처리 방법은?", options: ["무시", "즉시 보고 → 사진 촬영/기록 → 원인 파악 → 수리 요청 → 비용 청구 여부 판단", "손님에게 바로 청구", "스스로 수리"], answer: 1 },

    // F&B 서비스 (10문항)
    { id: 21, topic: 2, question: "[실기] 레스토랑 테이블 세팅 순서를 서술하시오.", options: ["대충 배치", "테이블 클로스 → 언더라이너 → 냅킨 → 식기류 → 글라스류 → 소금/후추 → 중앙 장식", "식기만 배치", "글라스만 배치"], answer: 1 },
    { id: 22, topic: 2, question: "[실기] 와인 서비스 절차를 서술하시오.", options: ["그냥 따르기", "주문 확인 → 와인 제시 → 코르크 개봉 → 테이스팅 서비스 → 손님 순서대로 서빙", "차갑게 해서 가져다주기", "손님이 직접 따르게 하기"], answer: 1 },
    { id: 23, topic: 2, question: "[실기] 룸서비스 주문 처리 절차는?", options: ["주문만 받기", "주문 접수 → 확인 반복 → 주방 전달 → 트레이 세팅 → 객실 배달 → 서명 확인", "메뉴만 안내", "객실로 바로 전달"], answer: 1 },
    { id: 24, topic: 2, question: "[실기] 연회(Banquet) 서비스 준비 사항을 서술하시오.", options: ["테이블만 준비", "행사 확인 → 좌석 배치 → 테이블 세팅 → 음향/조명 점검 → 메뉴/음료 준비 → 직원 배치", "음식만 준비", "행사 당일에 준비"], answer: 1 },
    { id: 25, topic: 2, question: "[실기] 뷔페 서비스 관리 요령을 서술하시오.", options: ["음식만 채우기", "음식 온도 관리, 지속적 보충, 접시 교체, 위생 관리, 동선 관리, 재고 확인", "손님 자율", "개장 시에만 준비"], answer: 1 },
    { id: 26, topic: 2, question: "[실기] 음식 알레르기 대응 방법은?", options: ["무시", "사전 확인 → 주방 전달 → 별도 조리 → 서빙 시 재확인 → 응급 대비", "못 먹는다고 안내", "메뉴 변경 불가 안내"], answer: 1 },
    { id: 27, topic: 2, question: "[실기] 바(Bar) 서비스 기본 절차를 서술하시오.", options: ["주문만 받기", "인사 → 음료 추천/주문 → 제조 → 서빙 → 지속적 케어 → 결제", "음료만 제공", "손님이 직접 가져가게"], answer: 1 },
    { id: 28, topic: 2, question: "[실기] 조식 뷔페 운영 시 주의사항 5가지를 서술하시오.", options: ["음식만 배치", "위생 관리, 온도 유지, 지속 보충, 알레르기 표시, 대기열 관리", "오픈 시간만 지키기", "손님 자율"], answer: 1 },
    { id: 29, topic: 2, question: "[실기] 음식 서빙 시 기본 매너를 서술하시오.", options: ["빨리 서빙", "오른쪽에서 서빙, 왼쪽에서 수거, 여성/어른 우선, 조용히 서빙, 음식 설명", "아무쪽에서나", "손님이 직접 가져가게"], answer: 1 },
    { id: 30, topic: 2, question: "[실기] 레스토랑 예약 관리 방법을 서술하시오.", options: ["메모장에 기록", "예약 시스템 활용, 확인 전화, 테이블 배정 계획, 노쇼 관리, VIP 표시", "선착순 배정", "예약 불가 운영"], answer: 1 },

    // 고객 관리 (10문항)
    { id: 31, topic: 3, question: "[실기] 고객 불만 처리 5단계를 서술하시오.", options: ["사과만 하기", "경청 → 공감 → 사과 → 해결책 제시 → 후속 관리", "무시하기", "매니저에게 넘기기만"], answer: 1 },
    { id: 32, topic: 3, question: "[실기] VIP 고객 관리 서비스 내용을 5가지 이상 서술하시오.", options: ["일반 고객과 동일", "사전 정보 파악, 개인 취향 반영, 전담 직원 배정, 특별 어메니티, 신속한 대응, 후속 감사 연락", "특별 서비스 없음", "할인만 제공"], answer: 1 },
    { id: 33, topic: 3, question: "[실기] 고객 피드백 수집 및 활용 방법은?", options: ["받기만 하기", "설문 조사, 온라인 리뷰 모니터링, 직접 의견 청취, 데이터 분석, 개선 반영", "무시", "좋은 리뷰만 수집"], answer: 1 },
    { id: 34, topic: 3, question: "[실기] 상습 불만 고객(Chronic Complainer) 대응 방법은?", options: ["무시", "기록 유지, 일관된 대응, 명확한 정책 안내, 매니저 개입, 서비스 한계 설정", "원하는 대로 다 들어주기", "출입 금지"], answer: 1 },
    { id: 35, topic: 3, question: "[실기] 고객 정보 보안 관리 방법을 서술하시오.", options: ["공유해도 됨", "접근 권한 제한, 암호화 저장, 정기 교육, 개인정보 최소 수집, 폐기 절차 준수", "따로 관리 안 함", "직원 자율"], answer: 1 },
    { id: 36, topic: 3, question: "[실기] 멤버십/로열티 프로그램 운영 방법은?", options: ["할인만 제공", "등급별 혜택 차등화, 포인트 적립/사용, 맞춤 서비스, 특별 이벤트, 지속적 소통", "없어도 됨", "모든 고객 동일 혜택"], answer: 1 },
    { id: 37, topic: 3, question: "[실기] 단골 고객 관계 관리(CRM) 방법은?", options: ["특별히 안 함", "고객 이력 관리, 취향 기록, 맞춤 서비스, 기념일 관리, 정기 연락", "할인만 제공", "예약 시에만 관리"], answer: 1 },
    { id: 38, topic: 3, question: "[실기] 고객 만족도 조사 실시 방법은?", options: ["대충 물어보기", "체계적 설문 설계, 다양한 채널 활용, 정기적 실시, 결과 분석, 개선 조치", "하지 않음", "좋은 평가만 수집"], answer: 1 },
    { id: 39, topic: 3, question: "[실기] 서비스 회복(Service Recovery) 절차를 서술하시오.", options: ["사과만", "문제 인지 → 즉각 대응 → 진심 어린 사과 → 보상 제공 → 재발 방지 → 후속 확인", "보상만 제공", "무시"], answer: 1 },
    { id: 40, topic: 3, question: "[실기] 고객 클레임 기록 관리 방법은?", options: ["기록 안 함", "상세 내용 기록, 처리 과정 문서화, 패턴 분석, 교육 자료 활용, 정기 검토", "구두로만 전달", "좋은 것만 기록"], answer: 1 },

    // 상황 대처 (10문항)
    { id: 41, topic: 4, question: "[실기] 화재 발생 시 호텔 직원의 대응 절차는?", options: ["대피만 하기", "화재 경보 → 119 신고 → 고객 대피 유도 → 초기 진화 시도 → 집결지 확인 → 인원 점검", "불 끄기만", "사무실에서 대기"], answer: 1 },
    { id: 42, topic: 4, question: "[실기] 고객 의료 응급상황 발생 시 대응은?", options: ["119만 부르기", "상황 파악 → 119 신고 → 응급 처치 → AED 사용 → 가족 연락 → 기록 유지", "대기", "손님 자율에 맡기기"], answer: 1 },
    { id: 43, topic: 4, question: "[실기] 자연재해(태풍, 지진) 시 대응 절차는?", options: ["그냥 대기", "상황 모니터링 → 안전 조치 → 고객 안내 → 대피 유도 → 피해 점검 → 복구", "손님 자율 대피", "영업 중단만"], answer: 1 },
    { id: 44, topic: 4, question: "[실기] 객실 내 도난 신고 시 처리 방법은?", options: ["그냥 신고 접수만", "경청 → 상세 내용 확인 → 경찰 신고 → CCTV 확인 → 보험 처리 안내 → 기록", "무시", "손님 부주의로 처리"], answer: 1 },
    { id: 45, topic: 4, question: "[실기] 음주 소란 고객 대응 방법은?", options: ["방치", "침착하게 접근 → 조용히 안내 → 동료 지원 요청 → 필요시 보안/경찰 연락 → 기록", "바로 퇴장시키기", "무시"], answer: 1 },
    { id: 46, topic: 4, question: "[실기] 정전 발생 시 대응 절차는?", options: ["그냥 기다리기", "비상 발전기 가동 → 고객 안내 → 엘리베이터 확인 → 안전 조치 → 원인 파악 → 복구", "퇴근", "손님에게 양해만 구하기"], answer: 1 },
    { id: 47, topic: 4, question: "[실기] 식중독 의심 상황 발생 시 대응은?", options: ["무시", "증상 확인 → 의료 지원 → 관련 음식 보관 → 보건소 신고 → 원인 조사 → 재발 방지", "숨기기", "식당만 폐쇄"], answer: 1 },
    { id: 48, topic: 4, question: "[실기] 수상한 인물/물건 발견 시 대응은?", options: ["무시", "상황 관찰 → 보안팀 보고 → 접근 자제 → 경찰 신고 → 고객 안전 확보 → 기록", "직접 확인", "손님에게 알리기"], answer: 1 },
    { id: 49, topic: 4, question: "[실기] 엘리베이터 갇힘 사고 시 대응 절차는?", options: ["기다리기만", "인터폰 확인 → 고객 안심 → 구조 요청 → 지속 연락 → 구조 후 케어 → 점검 요청", "관리업체만 연락", "무시"], answer: 1 },
    { id: 50, topic: 4, question: "[실기] 시위/집회로 인한 호텔 주변 혼란 시 대응은?", options: ["영업 중단", "상황 모니터링 → 고객 안내 → 출입 통제 → 대체 동선 안내 → 보안 강화 → 기록", "그냥 평소대로 운영", "모든 출입 금지"], answer: 1 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('hotel-admin-practical-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('hotel-admin-practical-answers', JSON.stringify(newAnswers));
  };

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.answer).length;

  const openAIModal = (question: string) => { setCurrentQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-admin" className="text-pink-600 hover:text-pink-800 font-medium">← 호텔관리사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 실기시험 대비</h1>
          <p className="text-gray-500">호텔관리사 실기 핵심 문제 50문항</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
            <span className="text-pink-700 font-medium">진행률: {correctCount}/50</span>
            <div className="w-32 h-2 bg-pink-200 rounded-full"><div className="h-full bg-pink-600 rounded-full transition-all" style={{ width: `${(correctCount / 50) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === null ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 hover:bg-pink-50'}`}>전체 ({questions.length})</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === topic.id ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 hover:bg-pink-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">{topics[q.topic].name}</span>
                <span className="text-gray-400 text-sm">#{q.id}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>
              <div className="grid gap-2">
                {q.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(q.id, index)} className={`p-3 rounded-xl text-left transition ${userAnswers[q.id] === index ? index === q.answer ? 'bg-green-100 border-2 border-green-500 text-green-700' : 'bg-red-100 border-2 border-red-500 text-red-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    <span className="font-medium mr-2">{index + 1}.</span>{option}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                  {showAnswer === q.id ? '해설 닫기' : '해설 보기'}
                </button>
                <button onClick={() => openAIModal(q.question)} className="text-rose-600 hover:text-rose-800 text-sm font-medium ml-4">AI에게 질문</button>
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-pink-50 rounded-xl">
                  <p className="text-pink-800"><strong>정답:</strong> {q.answer + 1}번</p>
                  <p className="text-pink-600 text-sm mt-1">실기시험에서는 절차를 단계별로 명확히 서술하는 것이 중요합니다.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 text-sm mb-4 p-3 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 호텔관리사 실기시험 관점에서 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 호텔관리사 실기시험 관점에서 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 호텔관리사 실기시험 관점에서 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
