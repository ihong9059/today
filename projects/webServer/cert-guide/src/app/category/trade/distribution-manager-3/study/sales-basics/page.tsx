'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SalesBasicsPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-3-sales-basics-completed');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('distribution-manager-3-sales-basics-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 3급 판매 및 고객응대 과목에서 다음 문제에 대해 쉽게 설명해주세요:\n\n${question}\n\n초보자도 이해할 수 있게 핵심 개념을 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 판매의 기본 개념 (1-10)
    { id: 1, topic: '판매의 기본 개념', q: '판매란 무엇인가요?', a: '판매는 고객이 원하는 상품을 찾아주고, 설명해서 구매하도록 돕는 활동입니다. 단순히 물건을 파는 것이 아니라, 고객의 필요를 채워주는 서비스입니다.' },
    { id: 2, topic: '판매의 기본 개념', q: '좋은 판매원의 자질 5가지는?', a: '①친절한 태도 ②상품 지식 ③경청 능력 ④정직함 ⑤문제 해결 능력. 고객을 진심으로 돕고자 하는 마음이 가장 중요합니다.' },
    { id: 3, topic: '판매의 기본 개념', q: '판매의 기본 과정 5단계를 설명하시오.', a: '①접근(인사) ②니즈 파악(질문) ③상품 제안(설명) ④구매 유도(결정 도움) ⑤마무리(감사, 배웅). 순서대로 자연스럽게 진행합니다.' },
    { id: 4, topic: '판매의 기본 개념', q: '첫인상의 중요성을 설명하시오.', a: '첫인상은 3~5초 안에 결정됩니다. 깔끔한 용모, 밝은 표정, 친절한 인사가 중요합니다. 첫인상이 좋으면 고객이 편하게 쇼핑할 수 있습니다.' },
    { id: 5, topic: '판매의 기본 개념', q: '상품 설명을 잘 하는 방법은?', a: '①고객 눈높이에 맞게 ②어려운 말 피하기 ③특징보다 장점 위주 ④직접 보여주기 ⑤질문 유도하기. 고객이 이해하기 쉽게 설명해야 합니다.' },
    { id: 6, topic: '판매의 기본 개념', q: '고객이 망설일 때 어떻게 해야 하나요?', a: '①서두르지 않기 ②추가 정보 제공 ③다른 상품 제안 ④시간 여유 주기 ⑤연락처 받아두기. 압박하면 오히려 역효과입니다.' },
    { id: 7, topic: '판매의 기본 개념', q: '추가 판매(업셀링)란 무엇인가요?', a: '고객이 선택한 상품보다 더 좋은 상품을 권하는 것입니다. 예: 일반 커피 → 프리미엄 커피. 고객에게 도움이 될 때만 자연스럽게 제안합니다.' },
    { id: 8, topic: '판매의 기본 개념', q: '연관 판매(크로스셀링)란 무엇인가요?', a: '함께 사용하면 좋은 상품을 권하는 것입니다. 예: 신발 → 양말, 카메라 → 메모리카드. 고객의 편의를 위한 제안으로 자연스럽게 합니다.' },
    { id: 9, topic: '판매의 기본 개념', q: '단골 고객이 중요한 이유는?', a: '①새 고객 확보보다 비용이 적게 듦 ②안정적 매출 ③입소문 효과 ④피드백 제공 ⑤충성도 높음. 한 번 온 고객을 다시 오게 하는 것이 중요합니다.' },
    { id: 10, topic: '판매의 기본 개념', q: '구매 후 고객 관리가 중요한 이유는?', a: '①재구매 유도 ②불만 예방 ③좋은 후기 유도 ④소개 고객 확보. 판매 후에도 관심을 보이면 고객이 감동합니다.' },

    // 고객응대 기본자세 (11-20)
    { id: 11, topic: '고객응대 기본자세', q: '고객 응대의 기본 자세 5가지는?', a: '①밝은 표정 ②바른 자세 ③눈 맞춤 ④공손한 말투 ⑤적극적 경청. 고객을 존중하는 마음이 자세에서 나타납니다.' },
    { id: 12, topic: '고객응대 기본자세', q: '좋은 인사의 3요소는?', a: '①시선: 고객의 눈을 보며 ②표정: 자연스러운 미소 ③말: 명확한 인사말. "어서오세요"를 진심으로 말하는 것이 중요합니다.' },
    { id: 13, topic: '고객응대 기본자세', q: '경청이란 무엇이고 왜 중요한가요?', a: '경청은 고객의 말을 집중해서 듣는 것입니다. 고개 끄덕임, 맞장구 등으로 듣고 있음을 보여줍니다. 고객이 원하는 것을 정확히 파악할 수 있습니다.' },
    { id: 14, topic: '고객응대 기본자세', q: '공손한 말투란 어떤 것인가요?', a: '①높임말 사용 ②긍정적 표현 ③부드러운 어조 ④명확한 발음 ⑤적절한 속도. "~해드릴까요?", "~하시겠어요?" 등의 표현을 사용합니다.' },
    { id: 15, topic: '고객응대 기본자세', q: '고객과의 적절한 거리는 얼마인가요?', a: '약 1~1.5미터가 적절합니다. 너무 가까우면 부담, 너무 멀면 소홀하게 느껴집니다. 상황에 따라 조절하되, 고객이 편한 거리를 유지합니다.' },
    { id: 16, topic: '고객응대 기본자세', q: '손님이 왔을 때 가장 먼저 할 일은?', a: '①시선을 맞추며 인사 ②자연스럽게 다가가기 ③도움이 필요한지 물어보기. 바쁘더라도 고객이 왔음을 인지했다는 신호를 보냅니다.' },
    { id: 17, topic: '고객응대 기본자세', q: '여러 고객이 동시에 왔을 때 어떻게 하나요?', a: '①먼저 온 고객부터 응대 ②대기 고객에게 양해 구하기 ③눈 맞춤으로 기다림 인지 표시 ④신속하게 처리. 모든 고객에게 관심을 보여줍니다.' },
    { id: 18, topic: '고객응대 기본자세', q: '고객이 떠날 때 어떻게 해야 하나요?', a: '①감사 인사 ②또 방문 권유 ③입구까지 배웅(가능하면) ④밝은 표정 유지. 마지막 인상도 첫인상만큼 중요합니다.' },
    { id: 19, topic: '고객응대 기본자세', q: '판매원의 복장과 용모 규정은 왜 있나요?', a: '①전문성 표현 ②신뢰감 형성 ③위생 관리 ④브랜드 이미지 통일. 깔끔한 모습은 고객에게 안심감을 줍니다.' },
    { id: 20, topic: '고객응대 기본자세', q: '근무 중 하지 말아야 할 행동은?', a: '①사적 통화 ②동료와 잡담 ③껌 씹기 ④팔짱 끼기 ⑤고객 앞 휴대폰 사용. 고객에게 불쾌감을 주는 행동을 피해야 합니다.' },

    // 상품설명과 결제 (21-30)
    { id: 21, topic: '상품설명과 결제', q: '상품의 특징과 장점의 차이는?', a: '특징: 상품의 객관적 사실 (예: 이 옷은 면 100%). 장점: 고객에게 주는 이점 (예: 그래서 시원하고 편해요). 장점 위주로 설명하면 효과적입니다.' },
    { id: 22, topic: '상품설명과 결제', q: '고객의 필요(니즈)를 파악하는 질문법은?', a: '①개방형 질문: "어떤 용도로 찾으세요?" ②구체화 질문: "어떤 색상을 선호하세요?" 질문을 통해 고객이 원하는 것을 정확히 파악합니다.' },
    { id: 23, topic: '상품설명과 결제', q: '가격을 물어볼 때 어떻게 대답하나요?', a: '①자신있게 대답 ②가치 먼저 설명 ③할인/이벤트 정보 안내 ④비교 상품 제시. "비싸다"고 하면 가격 대비 장점을 설명합니다.' },
    { id: 24, topic: '상품설명과 결제', q: '고객이 "그냥 볼게요"라고 하면?', a: '①"네, 편하게 보세요" 대답 ②적당한 거리 유지 ③가끔 시선으로 관심 표시 ④필요할 때 다가가기. 부담 주지 않으면서 관심은 유지합니다.' },
    { id: 25, topic: '상품설명과 결제', q: '현금결제와 카드결제의 차이점은?', a: '현금: 즉시 정산, 거스름돈 필요. 카드: 단말기 사용, 수수료 발생, 영수증 자동 출력. 최근에는 카드·간편결제가 대부분입니다.' },
    { id: 26, topic: '상품설명과 결제', q: '카드 결제 시 주의사항은?', a: '①카드 확인(본인 여부) ②금액 확인 요청 ③사인/비밀번호 입력 ④영수증 전달 ⑤카드 정중히 돌려드리기. 금액 오류에 특히 주의합니다.' },
    { id: 27, topic: '상품설명과 결제', q: '간편결제(삼성페이 등) 처리 방법은?', a: '①결제 금액 입력 ②간편결제 선택 ③고객 휴대폰 태그 ④승인 확인 ⑤영수증 제공. 기존 카드 단말기로 처리 가능합니다.' },
    { id: 28, topic: '상품설명과 결제', q: '영수증이 중요한 이유는?', a: '①구매 증빙 ②교환·환불시 필요 ③가계부 정리 ④소득공제(현금영수증). 고객에게 반드시 전달하고, 보관을 권유합니다.' },
    { id: 29, topic: '상품설명과 결제', q: '거스름돈을 줄 때 주의사항은?', a: '①고객 앞에서 세기 ②큰 단위부터 ③영수증과 함께 ④두 손으로 드리기 ⑤금액 말로 확인. 실수를 방지하고 신뢰를 줍니다.' },
    { id: 30, topic: '상품설명과 결제', q: '결제 오류가 발생하면 어떻게 하나요?', a: '①침착하게 대응 ②고객에게 양해 구하기 ③다시 시도 ④다른 결제 방법 안내 ⑤필요시 상급자 호출. 당황하지 않고 차분히 해결합니다.' },

    // 포장과 배웅 (31-40)
    { id: 31, topic: '포장과 배웅', q: '포장의 목적은 무엇인가요?', a: '①상품 보호 ②운반 편리 ③선물 연출 ④브랜드 이미지 ⑤친환경 고려. 깔끔한 포장은 고객 만족을 높입니다.' },
    { id: 32, topic: '포장과 배웅', q: '기본 포장 순서는?', a: '①상품 확인 ②쇼핑백 선택(크기) ③완충재 사용(필요시) ④영수증 동봉 ⑤손잡이 정돈 ⑥정중히 전달. 상품이 손상되지 않게 주의합니다.' },
    { id: 33, topic: '포장과 배웅', q: '선물포장 시 주의사항은?', a: '①용도 확인(생일, 결혼 등) ②포장지·리본 선택 ③깔끔하게 마무리 ④카드 동봉 여부 확인 ⑤가격표 제거. 고객의 요청을 정확히 파악합니다.' },
    { id: 34, topic: '포장과 배웅', q: '식품 포장 시 주의사항은?', a: '①위생 장갑 착용 ②냉장식품은 아이스팩 ③뜨거운 것은 별도 포장 ④액체 누수 방지 ⑤유통기한 확인. 식품 안전이 가장 중요합니다.' },
    { id: 35, topic: '포장과 배웅', q: '무게가 무거운 상품 포장 시 주의점은?', a: '①튼튼한 쇼핑백 사용 ②손잡이 보강 ③여러 개로 나눠 담기 ④운반 도움 제안. 고객이 다치지 않도록 배려합니다.' },
    { id: 36, topic: '포장과 배웅', q: '친환경 포장이란 무엇인가요?', a: '①일회용 줄이기 ②종이 포장재 사용 ③에코백 권장 ④과대포장 자제 ⑤재활용 가능 소재. 환경을 생각하는 포장이 트렌드입니다.' },
    { id: 37, topic: '포장과 배웅', q: '고객 배웅의 기본 자세는?', a: '①밝은 표정 유지 ②감사 인사("감사합니다, 또 오세요") ③출입구 방향으로 안내 ④마지막까지 시선 유지 ⑤인사 후 정리. 끝까지 좋은 인상을 남깁니다.' },
    { id: 38, topic: '포장과 배웅', q: '고객이 무거운 짐을 들고 있다면?', a: '①"들어드릴까요?" 제안 ②출입구까지 운반 도움 ③차량 위치 확인 ④문 열어드리기. 작은 배려가 큰 감동을 줍니다.' },
    { id: 39, topic: '포장과 배웅', q: '비가 오는 날 고객 배웅 시 배려할 점은?', a: '①비닐 커버 제공 ②차량 대기 장소 안내 ③우산 대여 서비스(있다면) ④"조심히 가세요" 인사. 날씨에 따른 세심한 배려가 필요합니다.' },
    { id: 40, topic: '포장과 배웅', q: '불만족스러운 표정의 고객 배웅 시는?', a: '①더욱 정중한 인사 ②피드백 요청(가능하면) ③재방문 권유 ④개선 약속. 좋지 않은 경험도 마지막 인상으로 회복할 수 있습니다.' },

    // 특수 상황 응대 (41-50)
    { id: 41, topic: '특수 상황 응대', q: '외국인 고객 응대 시 주의점은?', a: '①천천히 말하기 ②간단한 영어 사용 ③제스처 활용 ④번역기 활용 ⑤친절한 미소. 언어가 달라도 친절함은 통합니다.' },
    { id: 42, topic: '특수 상황 응대', q: '어르신 고객 응대 시 주의점은?', a: '①천천히 또박또박 ②큰 목소리(단, 불쾌하지 않게) ③인내심 가지기 ④제품 조작 도움 ⑤존댓말 철저. 어르신을 공경하는 마음으로 대합니다.' },
    { id: 43, topic: '특수 상황 응대', q: '어린이 동반 고객 응대 시 주의점은?', a: '①아이에게도 인사 ②위험물 주의 ③아이 눈높이에서 대화 ④부모님께 확인 후 응대. 아이에게 친절하면 부모도 기분 좋아합니다.' },
    { id: 44, topic: '특수 상황 응대', q: '장애인 고객 응대 시 주의점은?', a: '①먼저 도움 필요 여부 확인 ②휠체어 이동 공간 확보 ③눈높이 맞추기 ④당연하게 대하기 ⑤필요시 도움 제공. 특별 대우보다 평등한 서비스가 중요합니다.' },
    { id: 45, topic: '특수 상황 응대', q: '바쁜 시간대 고객 응대 요령은?', a: '①신속한 처리 ②대기 고객 인지 표시 ③우선순위 판단 ④동료와 협력 ⑤양해 구하기. 바빠도 친절함을 잃지 않습니다.' },
    { id: 46, topic: '특수 상황 응대', q: '상품이 품절일 때 어떻게 안내하나요?', a: '①솔직하게 품절 안내 ②대체 상품 제안 ③입고 예정일 안내 ④예약 접수(가능하면) ⑤사과 표현. 고객의 실망을 최소화합니다.' },
    { id: 47, topic: '특수 상황 응대', q: '고객끼리 다툴 때 어떻게 하나요?', a: '①침착하게 개입 ②분리하여 대화 ③사실관계 파악 ④공정하게 중재 ⑤필요시 관리자 호출. 한쪽 편을 들지 않고 중립을 유지합니다.' },
    { id: 48, topic: '특수 상황 응대', q: '도난이 의심될 때 어떻게 하나요?', a: '①직접 대응하지 않기 ②관리자에게 보고 ③자연스럽게 관찰 ④CCTV 확인 요청. 무고한 고객을 의심해서는 안 되므로 신중해야 합니다.' },
    { id: 49, topic: '특수 상황 응대', q: '고객이 다쳤을 때 어떻게 하나요?', a: '①즉시 상태 확인 ②응급조치(가능하면) ③관리자 호출 ④119 신고(필요시) ⑤사고 보고서 작성. 고객 안전이 최우선입니다.' },
    { id: 50, topic: '특수 상황 응대', q: '정전이나 비상상황 시 대응은?', a: '①침착하게 안내 ②고객 안전 확보 ③비상구 안내 ④매뉴얼에 따라 행동 ⑤관리자 지시 따르기. 평소 비상대응 훈련이 중요합니다.' },
  ];

  const topics = [...new Set(questions.map(q => q.topic))];
  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link href="/category/trade/distribution-manager-3" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors">← 유통관리사 3급 메인으로</Link>
          <h1 className="text-3xl font-black mb-4">🤝 판매 및 고객응대</h1>
          <p className="text-green-100">판매의 기초와 고객응대 방법을 학습합니다.</p>
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">학습 진행률</span>
              <span className="font-bold">{completedQuestions.length} / {questions.length} 완료</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {topics.map((topic, topicIdx) => (
          <div key={topicIdx} className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">{topicIdx + 1}</span>
              {topic}
            </h2>
            <div className="space-y-3">
              {questions.filter(q => q.topic === topic).map(question => (
                <div key={question.id} className={`bg-white rounded-xl shadow-sm border transition-all ${completedQuestions.includes(question.id) ? 'border-green-300 bg-green-50/50' : 'border-gray-100 hover:border-green-200'}`}>
                  <div className="p-4 cursor-pointer flex items-start gap-3" onClick={() => toggleQuestion(question.id)}>
                    <button onClick={(e) => { e.stopPropagation(); toggleComplete(question.id); }} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completedQuestions.includes(question.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}`}>
                      {completedQuestions.includes(question.id) && '✓'}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-green-700' : 'text-gray-800'}`}>{question.id}. {question.q}</p>
                    </div>
                    <span className={`text-xl transition-transform ${openQuestions.includes(question.id) ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  {openQuestions.includes(question.id) && (
                    <div className="px-4 pb-4">
                      <div className="ml-9 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{question.a}</p>
                      </div>
                      <div className="ml-9 mt-3">
                        <button onClick={() => handleAIHelp(question.q)} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">🤖 AI에게 더 자세히 질문하기</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border border-orange-200">
                  <span className="text-3xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200">
                  <span className="text-3xl">💚</span>
                  <div><p className="font-bold text-emerald-700">ChatGPT</p><p className="text-xs text-emerald-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200">
                  <span className="text-3xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
