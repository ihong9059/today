'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function DistributionInfoBasicsPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-3-distribution-info-basics-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => setOpenQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id) ? completedQuestions.filter(q => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('distribution-manager-3-distribution-info-basics-completed', JSON.stringify(newCompleted));
  };
  const handleAIHelp = (question: string) => { setCurrentPrompt(`유통관리사 3급 유통정보 기초 과목에서 다음 문제에 대해 쉽게 설명해주세요:\n\n${question}\n\n초보자도 이해할 수 있게 핵심 개념을 알려주세요.`); setShowAIModal(true); };

  const questions = [
    // POS 시스템 개요 (1-10)
    { id: 1, topic: 'POS 시스템 개요', q: 'POS란 무엇의 약자이고 무슨 뜻인가요?', a: 'POS는 Point of Sale의 약자로 "판매시점관리"를 뜻합니다. 계산대에서 상품을 스캔하고 결제할 때 사용하는 시스템입니다. 편의점, 마트 등 모든 매장에서 사용합니다.' },
    { id: 2, topic: 'POS 시스템 개요', q: 'POS 시스템의 기본 구성품은?', a: '①모니터(화면) ②바코드 스캐너 ③현금서랍 ④영수증 프린터 ⑤카드 단말기. 이것들이 연결되어 판매와 결제를 처리합니다.' },
    { id: 3, topic: 'POS 시스템 개요', q: 'POS로 할 수 있는 일은?', a: '①상품 판매 등록 ②결제 처리(현금, 카드) ③영수증 출력 ④재고 확인 ⑤매출 조회. 판매와 관련된 모든 업무를 POS로 처리합니다.' },
    { id: 4, topic: 'POS 시스템 개요', q: 'POS 사용의 장점은?', a: '①빠른 계산 ②정확한 가격 적용 ③자동 재고 관리 ④매출 데이터 축적 ⑤오류 감소. 수기로 하는 것보다 훨씬 효율적입니다.' },
    { id: 5, topic: 'POS 시스템 개요', q: 'POS 시작 시(영업 개시) 할 일은?', a: '①시스템 부팅 ②시재금 확인(현금 준비) ③날짜 확인 ④프린터 테스트 ⑤바코드 스캐너 테스트. 정상 작동을 확인하고 영업을 시작합니다.' },
    { id: 6, topic: 'POS 시스템 개요', q: 'POS 마감 시 할 일은?', a: '①매출 정산 ②현금 수금액 확인 ③카드 매출 확인 ④일일 보고서 출력 ⑤시재금 정리. 정확한 마감으로 오류를 방지합니다.' },
    { id: 7, topic: 'POS 시스템 개요', q: 'POS에서 환불 처리하는 방법은?', a: '①환불 메뉴 선택 ②영수증 확인(또는 바코드 스캔) ③환불 상품 입력 ④환불 방법 선택(현금/카드 취소) ⑤환불 영수증 출력. 관리자 승인이 필요한 경우도 있습니다.' },
    { id: 8, topic: 'POS 시스템 개요', q: 'POS 오류 발생 시 대처법은?', a: '①당황하지 않기 ②재시작 시도 ③고객에게 양해 구하기 ④다른 POS 사용(가능하면) ⑤관리자/본사 연락. 기본 조치 후에도 안 되면 도움을 요청합니다.' },
    { id: 9, topic: 'POS 시스템 개요', q: 'PLU 코드란 무엇인가요?', a: 'Price Look Up의 약자로, 바코드가 없는 상품(야채, 과일 등)에 부여하는 코드입니다. 저울에 올려놓고 PLU 코드를 입력하면 가격이 계산됩니다.' },
    { id: 10, topic: 'POS 시스템 개요', q: 'POS 데이터가 왜 중요한가요?', a: '①어떤 상품이 잘 팔리는지 파악 ②재고 관리 ③발주량 결정 ④고객 분석 ⑤매출 예측. POS 데이터는 매장 운영의 기초 정보입니다.' },

    // 바코드의 이해 (11-20)
    { id: 11, topic: '바코드의 이해', q: '바코드란 무엇인가요?', a: '상품 정보를 줄무늬로 표현한 것입니다. 스캐너로 읽으면 상품번호, 가격 등이 자동으로 인식됩니다. 모든 상품에 부착되어 있습니다.' },
    { id: 12, topic: '바코드의 이해', q: '바코드의 장점은?', a: '①빠른 입력 ②입력 오류 감소 ③재고 관리 용이 ④가격 변경 쉬움 ⑤판매 데이터 자동 수집. 수작업보다 훨씬 효율적입니다.' },
    { id: 13, topic: '바코드의 이해', q: 'EAN-13이란 무엇인가요?', a: '13자리 숫자로 이루어진 표준 상품 바코드입니다. 앞 3자리는 국가코드(한국 880), 다음은 회사코드, 상품코드, 검증숫자입니다.' },
    { id: 14, topic: '바코드의 이해', q: 'QR코드란 무엇인가요?', a: '정사각형 모양의 2차원 코드입니다. 바코드보다 더 많은 정보를 담을 수 있습니다. 스마트폰으로 스캔하여 웹사이트 연결, 결제 등에 활용합니다.' },
    { id: 15, topic: '바코드의 이해', q: '바코드가 읽히지 않을 때 대처법은?', a: '①바코드 상태 확인(훼손 여부) ②다른 각도로 스캔 ③손으로 번호 입력 ④다른 스캐너 사용 ⑤상품 교체. 바코드가 구겨지거나 더러우면 안 읽힙니다.' },
    { id: 16, topic: '바코드의 이해', q: '바코드와 QR코드의 차이점은?', a: '바코드: 1차원, 가로줄, 소량 정보. QR코드: 2차원, 정사각형, 대량 정보. QR코드는 URL, 결제정보 등 더 많은 정보를 담습니다.' },
    { id: 17, topic: '바코드의 이해', q: '상품에 바코드가 없으면 어떻게 하나요?', a: '①상품에 맞는 바코드 라벨 부착 ②PLU 코드로 입력 ③수동으로 상품번호 입력. 바코드가 없으면 입고 시 라벨을 만들어 붙입니다.' },
    { id: 18, topic: '바코드의 이해', q: '바코드 스캐너의 종류는?', a: '①건타입(손에 들고 스캔) ②고정형(계산대에 고정) ③무선타입(휴대용). 매장 환경에 따라 적합한 종류를 선택합니다.' },
    { id: 19, topic: '바코드의 이해', q: '모바일 바코드란 무엇인가요?', a: '스마트폰 화면에 표시되는 바코드입니다. 멤버십 카드, 쿠폰, 모바일 상품권 등에 활용됩니다. 종이 없이 휴대폰만으로 사용 가능합니다.' },
    { id: 20, topic: '바코드의 이해', q: 'RFID란 무엇인가요?', a: 'Radio Frequency Identification의 약자로, 무선으로 정보를 읽는 기술입니다. 바코드와 달리 여러 개를 동시에, 비접촉으로 읽을 수 있습니다. 무인계산대에 활용됩니다.' },

    // 결제 시스템 (21-30)
    { id: 21, topic: '결제 시스템', q: '결제 방법의 종류는?', a: '①현금 ②신용카드 ③체크카드 ④모바일페이(삼성페이 등) ⑤간편결제(카카오페이 등) ⑥상품권 ⑦포인트. 다양한 결제를 지원해야 고객이 편리합니다.' },
    { id: 22, topic: '결제 시스템', q: '신용카드와 체크카드의 차이는?', a: '신용카드: 나중에 결제(다음 달), 할부 가능, 신용 필요. 체크카드: 즉시 출금, 통장 잔액 한도, 누구나 발급 가능. 결제 시 처리 방법은 동일합니다.' },
    { id: 23, topic: '결제 시스템', q: '카드 결제 순서는?', a: '①금액 확인 ②카드 삽입/접촉/스와이프 ③비밀번호 또는 서명 ④승인 대기 ⑤승인 완료 ⑥영수증 출력. 간단하지만 정확히 해야 합니다.' },
    { id: 24, topic: '결제 시스템', q: '카드 승인 거절 시 대처법은?', a: '①다시 시도 ②다른 카드 요청 ③현금 결제 안내 ④카드사 문의 안내. 고객에게 정중하게 안내하고, 원인은 카드사에서 확인해야 합니다.' },
    { id: 25, topic: '결제 시스템', q: '간편결제(삼성페이 등)란?', a: '스마트폰에 카드를 등록해두고 휴대폰으로 결제하는 방식입니다. 빠르고 편리합니다. 기존 카드 단말기에서 사용 가능합니다.' },
    { id: 26, topic: '결제 시스템', q: '현금영수증이란 무엇인가요?', a: '현금으로 결제할 때 발급하는 영수증입니다. 연말정산 소득공제에 사용됩니다. 휴대폰 번호나 현금영수증 카드로 발급합니다.' },
    { id: 27, topic: '결제 시스템', q: '할부 결제란 무엇인가요?', a: '고가 상품을 나눠서 결제하는 방식입니다. 2개월~12개월 등. 신용카드만 가능하고, 일정 금액 이상(보통 5만원)부터 선택할 수 있습니다.' },
    { id: 28, topic: '결제 시스템', q: '포인트 결제란 무엇인가요?', a: '적립된 포인트로 결제하는 방식입니다. 멤버십 카드에 적립된 포인트를 현금처럼 사용합니다. 일부 또는 전액 사용 가능합니다.' },
    { id: 29, topic: '결제 시스템', q: '상품권 결제 시 주의점은?', a: '①유효기간 확인 ②사용 가능 여부 확인 ③거스름돈 규정 확인 ④위조 여부 확인. 상품권 종류마다 규정이 다를 수 있습니다.' },
    { id: 30, topic: '결제 시스템', q: '결제 오류 방지를 위한 체크리스트는?', a: '①금액 확인 후 결제 ②고객에게 금액 안내 ③카드 확인 ④영수증 확인 후 전달 ⑤거스름돈 정확히 계산. 차분하게 하면 오류를 줄일 수 있습니다.' },

    // 재고 시스템 (31-40)
    { id: 31, topic: '재고 시스템', q: '재고 시스템이란 무엇인가요?', a: '상품의 입고, 출고, 현재 수량을 관리하는 시스템입니다. POS와 연동되어 판매 시 자동으로 재고가 차감됩니다. 정확한 재고 파악이 가능합니다.' },
    { id: 32, topic: '재고 시스템', q: '입고 처리란 무엇인가요?', a: '배송된 상품을 시스템에 등록하는 것입니다. 바코드를 스캔하거나 수량을 입력합니다. 입고 처리를 해야 재고에 반영됩니다.' },
    { id: 33, topic: '재고 시스템', q: '출고 처리란 무엇인가요?', a: '상품이 매장에서 나가는 것을 기록하는 것입니다. 판매(POS 자동), 반품, 폐기 등이 출고입니다. 정확한 출고 처리로 재고를 관리합니다.' },
    { id: 34, topic: '재고 시스템', q: '재고 조회 방법은?', a: 'POS나 시스템에서 상품 검색 → 현재 재고 수량 확인. 바코드 스캔이나 상품명 검색으로 할 수 있습니다. 고객 문의 시 바로 확인 가능합니다.' },
    { id: 35, topic: '재고 시스템', q: '시스템 재고와 실제 재고가 다르면?', a: '①재고 실사로 정확한 수량 파악 ②차이 원인 분석(도난, 누락, 오입력) ③시스템 재고 조정 ④재발 방지 조치. 정기적인 실사가 중요합니다.' },
    { id: 36, topic: '재고 시스템', q: '자동 발주란 무엇인가요?', a: '재고가 일정 수량 이하로 떨어지면 시스템이 자동으로 발주하는 것입니다. 품절 방지에 효과적입니다. 적정 재고 수준을 미리 설정해둡니다.' },
    { id: 37, topic: '재고 시스템', q: '안전재고란 무엇인가요?', a: '최소한으로 유지해야 하는 재고량입니다. 이 수준 이하로 떨어지면 품절 위험이 있습니다. 인기 상품은 안전재고를 높게 설정합니다.' },
    { id: 38, topic: '재고 시스템', q: '재고 회전율이란 무엇인가요?', a: '일정 기간 동안 재고가 몇 번 팔렸는지 나타내는 지표입니다. 회전율이 높으면 잘 팔리는 상품, 낮으면 안 팔리는 상품입니다.' },
    { id: 39, topic: '재고 시스템', q: '폐기 처리는 어떻게 하나요?', a: '①폐기 사유 확인(유통기한, 파손 등) ②시스템에서 폐기 등록 ③실물 처리 ④기록 보관. 정확한 폐기 처리로 재고 정확도를 유지합니다.' },
    { id: 40, topic: '재고 시스템', q: '재고 데이터가 중요한 이유는?', a: '①적정 발주량 결정 ②품절 예방 ③과잉재고 방지 ④매출 분석 ⑤손실 파악. 정확한 재고 데이터가 효율적 운영의 기초입니다.' },

    // 전자상거래 기초 (41-50)
    { id: 41, topic: '전자상거래 기초', q: '전자상거래(이커머스)란?', a: '인터넷으로 상품을 사고파는 것입니다. 온라인 쇼핑몰, 앱 쇼핑 등이 해당됩니다. 시간과 장소에 구애받지 않아 편리합니다.' },
    { id: 42, topic: '전자상거래 기초', q: '온라인 쇼핑의 특징은?', a: '①24시간 구매 가능 ②가격 비교 쉬움 ③배송 필요 ④반품이 번거로움 ⑤직접 볼 수 없음. 편리하지만 오프라인과 다른 점이 있습니다.' },
    { id: 43, topic: '전자상거래 기초', q: '오픈마켓과 소셜커머스의 차이는?', a: '오픈마켓: 개인/업체가 자유롭게 판매(11번가, G마켓). 소셜커머스: 공동구매·할인 중심(쿠팡, 티몬 초기). 현재는 구분이 모호해지고 있습니다.' },
    { id: 44, topic: '전자상거래 기초', q: '라이브커머스란 무엇인가요?', a: '실시간 방송으로 상품을 소개하고 판매하는 것입니다. 진행자가 상품을 보여주며, 시청자가 바로 구매할 수 있습니다. 쌍방향 소통이 특징입니다.' },
    { id: 45, topic: '전자상거래 기초', q: '배송 추적이란 무엇인가요?', a: '주문한 상품이 어디에 있는지 확인하는 것입니다. 운송장 번호로 조회합니다. 수거→이동→도착→배송중→배송완료 단계를 확인할 수 있습니다.' },
    { id: 46, topic: '전자상거래 기초', q: '청약철회란 무엇인가요?', a: '온라인 구매 후 마음이 바뀌면 취소할 수 있는 권리입니다. 상품 수령 후 7일 이내 가능합니다. 단, 사용한 상품이나 식품 등은 제외됩니다.' },
    { id: 47, topic: '전자상거래 기초', q: '온라인 결제 방법의 종류는?', a: '①신용/체크카드 ②무통장입금 ③간편결제(카카오페이 등) ④휴대폰 결제 ⑤포인트 결제. 다양한 결제 방법을 제공해야 고객이 편리합니다.' },
    { id: 48, topic: '전자상거래 기초', q: '온라인 리뷰의 중요성은?', a: '①구매 결정에 영향 ②신뢰도 형성 ③상품 개선 피드백 ④마케팅 효과. 좋은 리뷰는 매출을 높이고, 나쁜 리뷰는 개선 기회입니다.' },
    { id: 49, topic: '전자상거래 기초', q: 'O2O 서비스란 무엇인가요?', a: 'Online to Offline의 약자로, 온라인에서 주문하고 오프라인에서 받는 서비스입니다. 예: 온라인 주문→매장 픽업, 배달앱. 온·오프라인 연결입니다.' },
    { id: 50, topic: '전자상거래 기초', q: '옴니채널이란 무엇인가요?', a: '온라인, 오프라인, 모바일 등 모든 채널을 연결하는 것입니다. 어디서든 같은 서비스를 받을 수 있습니다. 예: 온라인 구매→매장 교환. 통합된 쇼핑 경험을 제공합니다.' },
  ];

  const topics = [...new Set(questions.map(q => q.topic))];
  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link href="/category/trade/distribution-manager-3" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors">← 유통관리사 3급 메인으로</Link>
          <h1 className="text-3xl font-black mb-4">💻 유통정보 기초</h1>
          <p className="text-green-100">POS, 바코드 등 기본 시스템을 학습합니다.</p>
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4"><div className="flex justify-between items-center mb-2"><span className="font-medium">학습 진행률</span><span className="font-bold">{completedQuestions.length} / {questions.length} 완료</span></div><div className="w-full bg-white/30 rounded-full h-3"><div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }}></div></div></div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {topics.map((topic, topicIdx) => (<div key={topicIdx} className="mb-8"><h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">{topicIdx + 1}</span>{topic}</h2><div className="space-y-3">{questions.filter(q => q.topic === topic).map(question => (<div key={question.id} className={`bg-white rounded-xl shadow-sm border transition-all ${completedQuestions.includes(question.id) ? 'border-green-300 bg-green-50/50' : 'border-gray-100 hover:border-green-200'}`}><div className="p-4 cursor-pointer flex items-start gap-3" onClick={() => toggleQuestion(question.id)}><button onClick={(e) => { e.stopPropagation(); toggleComplete(question.id); }} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completedQuestions.includes(question.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}`}>{completedQuestions.includes(question.id) && '✓'}</button><div className="flex-1"><p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-green-700' : 'text-gray-800'}`}>{question.id}. {question.q}</p></div><span className={`text-xl transition-transform ${openQuestions.includes(question.id) ? 'rotate-180' : ''}`}>▼</span></div>{openQuestions.includes(question.id) && (<div className="px-4 pb-4"><div className="ml-9 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"><p className="text-gray-700 leading-relaxed whitespace-pre-line">{question.a}</p></div><div className="ml-9 mt-3"><button onClick={() => handleAIHelp(question.q)} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">🤖 AI에게 더 자세히 질문하기</button></div></div>)}</div>))}</div></div>))}
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full shadow-2xl"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button></div><p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border border-orange-200"><span className="text-3xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200"><span className="text-3xl">💚</span><div><p className="font-bold text-emerald-700">ChatGPT</p><p className="text-xs text-emerald-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200"><span className="text-3xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
