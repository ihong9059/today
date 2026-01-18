'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RetailBasicsPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-3-retail-basics-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id) ? completedQuestions.filter(q => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('distribution-manager-3-retail-basics-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 3급 소매경영 과목에서 다음 문제에 대해 쉽게 설명해주세요:\n\n${question}\n\n초보자도 이해할 수 있게 핵심 개념을 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 소매업의 유형 (1-10)
    { id: 1, topic: '소매업의 유형', q: '소매업이란 무엇인가요?', a: '소매업은 일반 소비자에게 상품을 직접 판매하는 사업입니다. 마트, 편의점, 백화점 등이 모두 소매업에 해당합니다. 우리가 일상에서 쇼핑하는 모든 곳이 소매점입니다.' },
    { id: 2, topic: '소매업의 유형', q: '편의점의 특징 5가지를 설명하시오.', a: '①24시간 영업 ②작은 매장(30~50평) ③주거지역 근처 위치 ④소량·소포장 상품 ⑤다양한 서비스(택배, ATM). 바쁜 현대인의 편의를 위한 업태입니다.' },
    { id: 3, topic: '소매업의 유형', q: '대형마트와 슈퍼마켓의 차이점은?', a: '대형마트: 3,000㎡ 이상, 식품+비식품, 저렴한 가격. 슈퍼마켓: 300~3,000㎡, 식품 중심, 동네에 위치. 규모와 취급 상품 범위가 다릅니다.' },
    { id: 4, topic: '소매업의 유형', q: '백화점의 특징은 무엇인가요?', a: '①고급 브랜드 입점 ②다양한 상품군 ③직원 서비스 ④수수료 방식(입점 브랜드에서 수수료) ⑤문화센터 등 부대시설. 프리미엄 쇼핑 경험을 제공합니다.' },
    { id: 5, topic: '소매업의 유형', q: '창고형 매장(코스트코 등)의 특징은?', a: '①회원제 ②대용량 상품 ③저렴한 가격 ④창고형 진열 ⑤최소 포장. 많이 사면 저렴해서 대가족, 자영업자에게 인기입니다.' },
    { id: 6, topic: '소매업의 유형', q: '전문점이란 무엇인가요?', a: '특정 상품군만 전문적으로 파는 매장입니다. 예: 서점, 안경점, 스포츠용품점, 화장품 전문점. 전문성과 다양한 선택지가 강점입니다.' },
    { id: 7, topic: '소매업의 유형', q: '드럭스토어란 무엇인가요?', a: '화장품, 건강식품, 생활용품을 함께 파는 매장입니다. 올리브영, 롭스 등이 대표적입니다. 뷰티와 건강 트렌드에 맞춰 성장했습니다.' },
    { id: 8, topic: '소매업의 유형', q: '온라인 쇼핑몰의 장점은 무엇인가요?', a: '①24시간 구매 가능 ②가격 비교 쉬움 ③집에서 배송 ④다양한 상품 ⑤후기 참고 가능. 편리함이 최대 장점이지만, 직접 보지 못하는 단점도 있습니다.' },
    { id: 9, topic: '소매업의 유형', q: '무인매장이란 무엇인가요?', a: '직원 없이 운영되는 매장입니다. 앱 체크인 → 상품 선택 → 자동 결제. 기술 발전으로 늘어나고 있으며, 24시간 운영과 인건비 절감이 장점입니다.' },
    { id: 10, topic: '소매업의 유형', q: '전통시장과 현대적 마트의 차이는?', a: '전통시장: 흥정 가능, 인정미, 저렴, 신선식품. 마트: 정찰제, 편리함, 다양한 상품, 원스톱 쇼핑. 각각 다른 매력이 있어 공존합니다.' },

    // 매장 관리 기초 (11-20)
    { id: 11, topic: '매장 관리 기초', q: '영업 시작 전 준비사항은 무엇인가요?', a: '①청소 및 정돈 ②상품 진열 확인 ③재고 확인 ④POS 점검 ⑤조명·공조 점검 ⑥유니폼 착용 ⑦오픈 미팅. 고객을 맞을 준비를 철저히 합니다.' },
    { id: 12, topic: '매장 관리 기초', q: '매장 청소의 기본 원칙은?', a: '①높은 곳 → 낮은 곳 ②안쪽 → 바깥쪽 ③건조한 곳 → 습한 곳 ④오염 심한 곳 → 깨끗한 곳. 매일 정해진 시간에 청소하고, 청결함을 유지합니다.' },
    { id: 13, topic: '매장 관리 기초', q: '매장 온도와 조명 관리가 왜 중요한가요?', a: '온도: 적정온도(20~24도)로 쾌적함 유지. 조명: 밝기로 분위기 연출, 상품 돋보이게. 둘 다 고객 체류시간과 구매에 영향을 줍니다.' },
    { id: 14, topic: '매장 관리 기초', q: '동선(고객 이동 경로) 관리란?', a: '고객이 매장 안에서 이동하는 경로를 설계하는 것입니다. 자연스럽게 많은 상품을 보게 하고, 막다른 길 없이 편하게 돌아볼 수 있도록 합니다.' },
    { id: 15, topic: '매장 관리 기초', q: '영업 마감 시 해야 할 일은?', a: '①매출 정산 ②현금·카드 마감 ③재고 확인 ④청소 ⑤보안 점검 ⑥조명·전원 끄기 ⑦문 잠금. 체크리스트로 빠짐없이 확인합니다.' },
    { id: 16, topic: '매장 관리 기초', q: '매장 안전관리 기본사항은?', a: '①바닥 미끄럼 방지 ②비상구 확보 ③소화기 위치 확인 ④전선 정리 ⑤높은 진열물 고정. 고객과 직원 안전이 최우선입니다.' },
    { id: 17, topic: '매장 관리 기초', q: '도난 방지를 위한 기본 수칙은?', a: '①CCTV 설치 ②사각지대 최소화 ③고가품 별도 관리 ④EAS 태그 부착 ⑤직원 교육. 예방이 가장 중요하고, 의심 시 관리자에게 보고합니다.' },
    { id: 18, topic: '매장 관리 기초', q: '화재 예방과 대응 기본은?', a: '예방: 전기 점검, 화기 관리, 소화기 비치. 대응: 침착하게 비상벨, 고객 대피 안내, 119 신고. 정기적인 소방훈련이 필요합니다.' },
    { id: 19, topic: '매장 관리 기초', q: '교대 근무 시 인수인계 방법은?', a: '①매출 현황 전달 ②특이사항 공유 ③미처리 업무 안내 ④재고 이슈 전달 ⑤고객 요청사항 공유. 인수인계 노트나 시스템을 활용합니다.' },
    { id: 20, topic: '매장 관리 기초', q: '효율적인 근무 시간 관리법은?', a: '①업무 우선순위 정하기 ②바쁜 시간대 미리 준비 ③틈틈이 정리정돈 ④동료와 협력 ⑤피크타임 집중. 시간 관리가 서비스 품질을 높입니다.' },

    // 상품 진열 기본 (21-30)
    { id: 21, topic: '상품 진열 기본', q: '상품 진열의 목적은 무엇인가요?', a: '①상품을 눈에 띄게 ②구매 욕구 자극 ③쇼핑 편의 제공 ④매장 이미지 형성 ⑤충동구매 유도. 좋은 진열은 무언의 판매원 역할을 합니다.' },
    { id: 22, topic: '상품 진열 기본', q: '골든존(Golden Zone)이란?', a: '고객 눈높이(약 85~135cm) 위치입니다. 가장 잘 보이고 손이 닿기 쉬워 판매가 잘 됩니다. 주력 상품이나 신상품을 이 위치에 진열합니다.' },
    { id: 23, topic: '상품 진열 기본', q: '수직 진열과 수평 진열의 차이는?', a: '수직 진열: 같은 상품을 위아래로 배치, 눈에 잘 띔. 수평 진열: 같은 상품을 좌우로 배치, 비교 쉬움. 상품 특성에 따라 선택합니다.' },
    { id: 24, topic: '상품 진열 기본', q: '엔드 진열이란 무엇인가요?', a: '선반 끝(통로 교차점)에 진열하는 것입니다. 눈에 잘 띄어 프로모션 상품이나 시즌 상품에 활용합니다. "엔드"는 선반의 양쪽 끝을 말합니다.' },
    { id: 25, topic: '상품 진열 기본', q: '선입선출(FIFO) 진열이란?', a: 'First In First Out, 먼저 들어온 상품을 먼저 판매하는 것입니다. 유통기한 관리에 필수입니다. 새 상품은 뒤에, 오래된 상품은 앞에 배치합니다.' },
    { id: 26, topic: '상품 진열 기본', q: '관련 상품 진열의 예시는?', a: '함께 사용하는 상품을 가까이 배치합니다. 예: 라면+국자, 치약+칫솔, 와인+와인잔. 고객 편의와 추가 구매를 유도합니다.' },
    { id: 27, topic: '상품 진열 기본', q: '가격표(프라이스 카드) 작성 원칙은?', a: '①상품명 명확 ②가격 크게 ③단위 표시(개, kg) ④할인 정보 표시 ⑤깔끔하게. 가격표가 없거나 틀리면 고객 불편과 불신을 야기합니다.' },
    { id: 28, topic: '상품 진열 기본', q: '진열 보충(Facing)이란?', a: '진열된 상품을 앞으로 당겨 정돈하는 것입니다. 뒤에 숨은 상품을 앞으로, 빈 공간 없이 채움. 정기적으로 하면 매장이 풍성해 보입니다.' },
    { id: 29, topic: '상품 진열 기본', q: 'POP(Point of Purchase) 광고란?', a: '매장 내 구매시점 광고입니다. 포스터, 배너, 선반태그 등. 상품 정보, 할인 안내, 신상품 홍보에 사용합니다. 눈에 잘 띄게 설치합니다.' },
    { id: 30, topic: '상품 진열 기본', q: '계절 상품 진열 시 주의점은?', a: '①시즌 시작 전 미리 진열 ②눈에 띄는 위치 ③충분한 재고 확보 ④시즌 종료 후 신속 철수. 타이밍이 중요하며, 시즌 후에는 할인 처리합니다.' },

    // 재고 관리 개념 (31-40)
    { id: 31, topic: '재고 관리 개념', q: '재고 관리란 무엇인가요?', a: '상품의 입고, 보관, 출고, 수량을 관리하는 활동입니다. 적정량을 유지해서 품절과 과잉재고를 방지합니다. 돈과 직결되는 중요한 업무입니다.' },
    { id: 32, topic: '재고 관리 개념', q: '품절이 발생하면 어떤 문제가 있나요?', a: '①판매 기회 손실 ②고객 불만 ③경쟁점으로 이탈 ④신뢰도 하락. 인기 상품이 자주 품절되면 고객이 다른 매장을 찾게 됩니다.' },
    { id: 33, topic: '재고 관리 개념', q: '과잉재고의 문제점은?', a: '①자금 묶임 ②보관 공간 차지 ③유통기한 임박 위험 ④할인 판매 불가피 ⑤폐기 손실. 필요한 만큼만 주문하는 것이 중요합니다.' },
    { id: 34, topic: '재고 관리 개념', q: '발주란 무엇인가요?', a: '필요한 상품을 공급업체에 주문하는 것입니다. 적정 시점에 적정량을 발주해야 품절과 과잉재고를 방지합니다. POS 데이터를 참고합니다.' },
    { id: 35, topic: '재고 관리 개념', q: '입고 검수란 무엇인가요?', a: '배송된 상품을 받으면서 확인하는 것입니다. ①수량 확인 ②상품 상태 확인 ③유통기한 확인 ④파손 여부 확인. 문제가 있으면 바로 보고합니다.' },
    { id: 36, topic: '재고 관리 개념', q: '재고 실사란 무엇인가요?', a: '실제 재고와 시스템 재고를 대조하는 작업입니다. 정기적(월별, 분기별)으로 실시합니다. 차이가 있으면 원인을 파악하고 조정합니다.' },
    { id: 37, topic: '재고 관리 개념', q: '유통기한 관리가 왜 중요한가요?', a: '①식품 안전 ②법적 의무 ③고객 신뢰 ④폐기 손실 방지. 유통기한이 가까운 상품은 앞에 진열하고, 임박 상품은 할인 판매합니다.' },
    { id: 38, topic: '재고 관리 개념', q: '상품 분류 코드(바코드)의 역할은?', a: '①상품 식별 ②가격 정보 연결 ③재고 관리 ④판매 데이터 수집. 바코드를 스캔하면 모든 정보가 자동 처리되어 효율적입니다.' },
    { id: 39, topic: '재고 관리 개념', q: '반품 처리 시 주의사항은?', a: '①반품 사유 확인 ②상품 상태 확인 ③반품 전표 작성 ④재고 시스템 조정 ⑤정해진 장소 보관. 정확한 기록이 중요합니다.' },
    { id: 40, topic: '재고 관리 개념', q: '폐기 상품 처리 방법은?', a: '①폐기 사유 기록 ②관리자 승인 ③재고 차감 ④규정에 따른 처리 ⑤환경 고려. 식품은 위생적으로, 일반 상품은 재활용 고려합니다.' },

    // 매장 운영 실무 (41-50)
    { id: 41, topic: '매장 운영 실무', q: '피크타임(바쁜 시간)이란?', a: '고객이 집중되는 시간대입니다. 편의점은 아침·점심·저녁 출퇴근 시간, 마트는 주말 오후가 피크타임입니다. 이 시간에 인력을 집중 배치합니다.' },
    { id: 42, topic: '매장 운영 실무', q: '매출 목표 관리란?', a: '일·주·월별로 매출 목표를 세우고 달성을 관리하는 것입니다. 목표 대비 실적을 확인하고, 부족하면 판촉 활동을 강화합니다.' },
    { id: 43, topic: '매장 운영 실무', q: '일일 매출 정산 순서는?', a: '①POS 매출 확인 ②현금 정산(시재금 확인) ③카드 매출 확인 ④매출 보고서 출력 ⑤상급자 보고. 정확한 정산으로 오류를 방지합니다.' },
    { id: 44, topic: '매장 운영 실무', q: '매장 인력 배치의 기본 원칙은?', a: '①피크타임 인원 보강 ②업무 능력에 맞는 배치 ③휴식시간 보장 ④비상시 대체 인력 확보. 효율적 배치로 서비스 품질을 유지합니다.' },
    { id: 45, topic: '매장 운영 실무', q: '근무 일지(영업일보) 작성 내용은?', a: '①매출 현황 ②특이사항 ③고객 불만 ④상품 이슈 ⑤내일 할 일. 기록해두면 인수인계와 문제 해결에 도움이 됩니다.' },
    { id: 46, topic: '매장 운영 실무', q: '본사와의 커뮤니케이션 방법은?', a: '①정기 보고(매출, 재고) ②비상 연락(사고, 클레임) ③공지사항 확인 ④교육 참여. 본사 지시를 정확히 이해하고 실행합니다.' },
    { id: 47, topic: '매장 운영 실무', q: '판촉 행사 진행 시 주의점은?', a: '①행사 내용 숙지 ②충분한 재고 확보 ③POP 설치 ④직원 교육 ⑤기간 엄수. 행사 후에는 결과를 분석합니다.' },
    { id: 48, topic: '매장 운영 실무', q: '시즌 대비(명절, 휴가철) 준비는?', a: '①수요 예측 ②재고 확보 ③인력 조정 ④영업시간 조정 ⑤매장 연출. 미리 준비해야 판매 기회를 놓치지 않습니다.' },
    { id: 49, topic: '매장 운영 실무', q: '경쟁 매장 분석이 필요한 이유는?', a: '①차별화 포인트 파악 ②가격 경쟁력 확인 ③고객 유출 방지 ④벤치마킹. 경쟁 매장의 장점을 배우고 단점을 보완합니다.' },
    { id: 50, topic: '매장 운영 실무', q: '고객 의견 수집 방법은?', a: '①직접 대화 ②고객 의견함 ③설문조사 ④온라인 리뷰 확인 ⑤SNS 모니터링. 고객 의견은 개선의 출발점입니다.' },
  ];

  const topics = [...new Set(questions.map(q => q.topic))];
  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link href="/category/trade/distribution-manager-3" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors">← 유통관리사 3급 메인으로</Link>
          <h1 className="text-3xl font-black mb-4">🏪 소매경영</h1>
          <p className="text-green-100">소매점 운영의 기본원리를 학습합니다.</p>
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2"><span className="font-medium">학습 진행률</span><span className="font-bold">{completedQuestions.length} / {questions.length} 완료</span></div>
            <div className="w-full bg-white/30 rounded-full h-3"><div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {topics.map((topic, topicIdx) => (
          <div key={topicIdx} className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">{topicIdx + 1}</span>{topic}</h2>
            <div className="space-y-3">
              {questions.filter(q => q.topic === topic).map(question => (
                <div key={question.id} className={`bg-white rounded-xl shadow-sm border transition-all ${completedQuestions.includes(question.id) ? 'border-green-300 bg-green-50/50' : 'border-gray-100 hover:border-green-200'}`}>
                  <div className="p-4 cursor-pointer flex items-start gap-3" onClick={() => toggleQuestion(question.id)}>
                    <button onClick={(e) => { e.stopPropagation(); toggleComplete(question.id); }} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completedQuestions.includes(question.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}`}>{completedQuestions.includes(question.id) && '✓'}</button>
                    <div className="flex-1"><p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-green-700' : 'text-gray-800'}`}>{question.id}. {question.q}</p></div>
                    <span className={`text-xl transition-transform ${openQuestions.includes(question.id) ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  {openQuestions.includes(question.id) && (<div className="px-4 pb-4"><div className="ml-9 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"><p className="text-gray-700 leading-relaxed whitespace-pre-line">{question.a}</p></div><div className="ml-9 mt-3"><button onClick={() => handleAIHelp(question.q)} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">🤖 AI에게 더 자세히 질문하기</button></div></div>)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full shadow-2xl"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button></div><p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border border-orange-200"><span className="text-3xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200"><span className="text-3xl">💚</span><div><p className="font-bold text-emerald-700">ChatGPT</p><p className="text-xs text-emerald-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200"><span className="text-3xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
