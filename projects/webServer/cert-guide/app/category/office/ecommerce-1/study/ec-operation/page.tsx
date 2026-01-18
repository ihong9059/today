'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ECOperationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'shop-operation',
      name: '쇼핑몰 운영',
      icon: '🛒',
      questions: [
        { id: 1, q: '온라인 쇼핑몰의 유형을 설명하시오.', a: '종합몰, 전문몰, 오픈마켓, 소셜커머스, 자사몰' },
        { id: 2, q: '쇼핑몰 운영의 핵심 지표(KPI)를 설명하시오.', a: '방문자수, 전환율, 객단가, 재구매율, 이탈율' },
        { id: 3, q: '전환율(Conversion Rate) 향상 방법을 설명하시오.', a: 'UI/UX 개선, 상품페이지 최적화, 결제 간소화' },
        { id: 4, q: '이탈률 분석과 개선 방법을 설명하시오.', a: '히트맵 분석, 퍼널 분석, 페이지 로딩 속도 개선' },
        { id: 5, q: '모바일 커머스 최적화 전략을 설명하시오.', a: '반응형 디자인, 간편결제, 푸시알림, 앱 최적화' },
        { id: 6, q: 'MD(상품기획) 역할을 설명하시오.', a: '상품 소싱, 가격 책정, 프로모션 기획, 트렌드 분석' },
        { id: 7, q: '시즌 마케팅 전략을 설명하시오.', a: '명절/기념일 프로모션, 시즌오프, 한정판 기획' },
        { id: 8, q: '프로모션 유형을 설명하시오.', a: '할인, 쿠폰, 적립금, 무료배송, 사은품, 번들' },
        { id: 9, q: '재고관리의 중요성을 설명하시오.', a: '재고비용 절감, 품절 방지, 현금흐름 최적화' },
        { id: 10, q: '셀러(판매자) 관리 방법을 설명하시오.', a: '입점 심사, 품질 관리, 정산, 성과 평가' }
      ]
    },
    {
      id: 'product-mgmt',
      name: '상품관리',
      icon: '📦',
      questions: [
        { id: 1, q: '상품 등록의 핵심 요소를 설명하시오.', a: '상품명, 이미지, 상세설명, 가격, 옵션, 재고' },
        { id: 2, q: '상품 상세페이지 구성을 설명하시오.', a: '썸네일, 상세이미지, 스펙, 후기, 배송정보, FAQ' },
        { id: 3, q: 'SKU 관리를 설명하시오.', a: 'Stock Keeping Unit, 개별 상품 식별 코드' },
        { id: 4, q: '상품 카테고리 설계 원칙을 설명하시오.', a: '사용자 관점, 계층 구조, 검색 편의성, 확장성' },
        { id: 5, q: '상품 이미지 최적화를 설명하시오.', a: '고화질, 다각도, 상세컷, 사용 예시, 용량 최적화' },
        { id: 6, q: '가격 정책 유형을 설명하시오.', a: '정가판매, 할인판매, 동적가격, 묶음판매' },
        { id: 7, q: '리뷰 관리의 중요성을 설명하시오.', a: '구매 결정 영향, 신뢰도 향상, SEO 효과' },
        { id: 8, q: '품절/재입고 관리를 설명하시오.', a: '재입고 알림, 유사상품 추천, 예약판매' },
        { id: 9, q: '시즌 상품 관리를 설명하시오.', a: '시즌 예측, 선주문, 재고 소진 전략' },
        { id: 10, q: '상품 태그/해시태그 활용을 설명하시오.', a: '검색 노출 향상, 연관상품 연결, 트렌드 반영' }
      ]
    },
    {
      id: 'logistics',
      name: '물류/배송',
      icon: '🚚',
      questions: [
        { id: 1, q: '풀필먼트(Fulfillment) 서비스를 설명하시오.', a: '입고-보관-포장-배송 일괄 대행, 3PL' },
        { id: 2, q: '라스트마일 배송을 설명하시오.', a: '최종 소비자까지 배송, 비용 40% 차지, 경쟁력 핵심' },
        { id: 3, q: '당일/새벽 배송 시스템을 설명하시오.', a: '도심 물류센터, 실시간 재고, 배송 최적화' },
        { id: 4, q: '반품/교환 프로세스를 설명하시오.', a: '반품신청-수거-검수-환불/교환발송' },
        { id: 5, q: '배송비 정책 유형을 설명하시오.', a: '무료배송, 조건부무료, 착불, 도서산간 추가' },
        { id: 6, q: '재고관리 방식(FIFO/LIFO)을 설명하시오.', a: 'FIFO: 선입선출, LIFO: 후입선출' },
        { id: 7, q: '안전재고의 개념을 설명하시오.', a: '수요 변동 대비 최소 재고, 품절 방지' },
        { id: 8, q: '송장번호 관리를 설명하시오.', a: '배송추적, 배송사 연동, 자동발송' },
        { id: 9, q: '포장재 관리를 설명하시오.', a: '상품 보호, 브랜딩, 친환경 포장, 비용 관리' },
        { id: 10, q: '역물류(Reverse Logistics)를 설명하시오.', a: '반품/회수/재활용 물류, 비용 절감, 환경 고려' }
      ]
    },
    {
      id: 'customer-mgmt',
      name: '고객관리',
      icon: '👥',
      questions: [
        { id: 1, q: 'CRM의 정의와 목적을 설명하시오.', a: '고객관계관리, 고객 데이터 분석, 맞춤 서비스' },
        { id: 2, q: 'RFM 분석을 설명하시오.', a: 'Recency(최근성), Frequency(빈도), Monetary(구매금액)' },
        { id: 3, q: '고객 세그먼테이션을 설명하시오.', a: '고객 유형별 분류, VIP/일반/휴면 등' },
        { id: 4, q: '로열티 프로그램을 설명하시오.', a: '포인트 적립, 등급제, 멤버십 혜택' },
        { id: 5, q: '고객 생애가치(LTV) 계산을 설명하시오.', a: 'LTV = 평균구매액 × 구매빈도 × 고객유지기간' },
        { id: 6, q: '이탈 고객 방지 전략을 설명하시오.', a: '이탈 예측, 리텐션 캠페인, 윈백 마케팅' },
        { id: 7, q: '개인화 마케팅을 설명하시오.', a: '고객별 맞춤 추천, 개인화 이메일, 타겟 광고' },
        { id: 8, q: '휴면 고객 재활성화를 설명하시오.', a: '웰컴백 쿠폰, 신상품 알림, 특별 혜택' },
        { id: 9, q: '고객 피드백 수집 방법을 설명하시오.', a: '설문조사, NPS, 리뷰, 1:1 문의 분석' },
        { id: 10, q: 'NPS(순추천고객지수)를 설명하시오.', a: '추천의향 점수, 추천자-비추천자 비율' }
      ]
    },
    {
      id: 'cs-operation',
      name: 'CS 운영',
      icon: '🎧',
      questions: [
        { id: 1, q: '고객서비스 채널 유형을 설명하시오.', a: '전화, 이메일, 채팅, SNS, FAQ, 챗봇' },
        { id: 2, q: '챗봇 활용 방안을 설명하시오.', a: '24시간 응대, FAQ 자동응답, 상담원 연결' },
        { id: 3, q: 'VOC(고객의 소리) 분석을 설명하시오.', a: '불만/요청 수집, 개선점 도출, 서비스 향상' },
        { id: 4, q: 'CS 응대 매뉴얼 구성을 설명하시오.', a: '인사말, 응대 시나리오, 클레임 처리, 에스컬레이션' },
        { id: 5, q: '클레임 처리 프로세스를 설명하시오.', a: '접수-확인-해결-보상-피드백-재발방지' },
        { id: 6, q: '환불/취소 정책 설정을 설명하시오.', a: '법적 기준, 고객 편의, 악용 방지 균형' },
        { id: 7, q: 'CS 품질 지표를 설명하시오.', a: '응답시간, 해결율, 만족도, 재문의율' },
        { id: 8, q: '악성 고객 대응 방법을 설명하시오.', a: '감정 분리, 사실 확인, 정책 안내, 법적 대응' },
        { id: 9, q: '상담 품질 모니터링을 설명하시오.', a: '상담 녹취, 스크립트 준수, 피드백, 교육' },
        { id: 10, q: 'CS 아웃소싱의 장단점을 설명하시오.', a: '장점: 비용절감, 전문성 / 단점: 품질관리, 정보보안' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ec-operation-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ec-operation-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `전자상거래관리사 1급 전자상거래 운영관리 과목 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명
3. 실무 적용 사례
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-blue-600">전자상거래관리사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">전자상거래 운영관리</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🛒</span></div>
              <div>
                <h1 className="text-2xl font-bold">전자상거래 운영관리</h1>
                <p className="text-blue-200">전자상거래관리사 1급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map(q => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.q}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                              >
                                🤖 AI에게 질문하기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/category/office/ecommerce-1/study/ec-planning" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">← 전자상거래 기획</Link>
          <Link href="/category/office/ecommerce-1/study/ec-system" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition">전자상거래 시스템관리 →</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
