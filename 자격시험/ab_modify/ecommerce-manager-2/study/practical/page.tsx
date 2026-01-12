'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'shop-setup',
      name: '쇼핑몰 구축',
      icon: '🏪',
      questions: [
        { id: 1, q: '쇼핑몰 구축 절차를 설명하시오.', a: '기획→디자인→개발→테스트→오픈→운영' },
        { id: 2, q: '쇼핑몰 플랫폼 선택 기준을 설명하시오.', a: '비용, 기능, 확장성, 커스터마이징' },
        { id: 3, q: '자사몰과 입점몰 차이를 설명하시오.', a: '자사몰: 독립 운영, 입점몰: 플랫폼 이용' },
        { id: 4, q: '쇼핑몰 기획서 구성요소를 설명하시오.', a: '컨셉, 타겟, 기능명세, 디자인, 일정' },
        { id: 5, q: '상품 카테고리 설계 원칙을 설명하시오.', a: '사용자 관점, 직관적 분류, 3depth 이내' },
        { id: 6, q: '결제 수단 선택 기준을 설명하시오.', a: '타겟 연령, 수수료, 정산주기' },
        { id: 7, q: '배송 정책 수립을 설명하시오.', a: '무료배송 기준, 도서산간 추가비용' },
        { id: 8, q: '교환/반품 정책을 설명하시오.', a: '7일 철회권, 귀책사유별 비용 부담' },
        { id: 9, q: '개인정보처리방침 필수 항목을 설명하시오.', a: '수집항목, 목적, 보유기간, 제3자제공' },
        { id: 10, q: '이용약관 주요 내용을 설명하시오.', a: '서비스 내용, 이용조건, 책임제한' }
      ]
    },
    {
      id: 'product-mgmt',
      name: '상품 관리',
      icon: '📦',
      questions: [
        { id: 1, q: '상품 등록 필수 정보를 설명하시오.', a: '상품명, 이미지, 가격, 상세설명, 재고' },
        { id: 2, q: '상품명 작성 원칙을 설명하시오.', a: '브랜드+상품명+특성+옵션, 검색 키워드' },
        { id: 3, q: '상품 이미지 기준을 설명하시오.', a: '대표이미지 정사각형, 고해상도, 배경 통일' },
        { id: 4, q: '상세페이지 구성을 설명하시오.', a: '헤더, 상품정보, 구매안내, 리뷰' },
        { id: 5, q: '옵션/재고 관리를 설명하시오.', a: 'SKU 코드, 옵션별 재고, 품절 처리' },
        { id: 6, q: '가격 정책 수립을 설명하시오.', a: '원가, 마진율, 경쟁가, 프로모션 가격' },
        { id: 7, q: '상품 노출 순위 결정 요소를 설명하시오.', a: '판매량, 리뷰, 클릭률, 최신성' },
        { id: 8, q: '시즌 상품 관리를 설명하시오.', a: '시즌 전 준비, 시즌 후 재고 정리' },
        { id: 9, q: '품절/단종 처리를 설명하시오.', a: '품절 표시, 입고 알림, 대체상품 추천' },
        { id: 10, q: '상품 정보 고시를 설명하시오.', a: '품목별 필수 표시 정보 (전자상거래법)' }
      ]
    },
    {
      id: 'order-delivery',
      name: '주문/배송 관리',
      icon: '🚚',
      questions: [
        { id: 1, q: '주문 처리 프로세스를 설명하시오.', a: '주문접수→결제확인→배송준비→출고→완료' },
        { id: 2, q: '결제 확인 방법을 설명하시오.', a: 'PG 승인 내역, 무통장 입금 확인' },
        { id: 3, q: '송장 발급 절차를 설명하시오.', a: '택배사 계약, 송장 출력, 시스템 등록' },
        { id: 4, q: '배송 추적 서비스를 설명하시오.', a: '택배사 API 연동, 실시간 위치 조회' },
        { id: 5, q: '반품 처리 절차를 설명하시오.', a: '신청접수→회수→검수→환불처리' },
        { id: 6, q: '교환 처리 절차를 설명하시오.', a: '신청접수→회수→검수→재배송' },
        { id: 7, q: '부분 취소/환불을 설명하시오.', a: '일부 상품만 취소, 차액 환불' },
        { id: 8, q: '묶음 배송 처리를 설명하시오.', a: '동일 주소 여러 주문 합포장' },
        { id: 9, q: '배송 지연 처리를 설명하시오.', a: '고객 안내, 보상 정책, 재고 확인' },
        { id: 10, q: '해외 배송 처리를 설명하시오.', a: '통관, 관세, 배송비, 배송 기간' }
      ]
    },
    {
      id: 'cs',
      name: '고객서비스(CS)',
      icon: '📞',
      questions: [
        { id: 1, q: 'CS 응대 기본 원칙을 설명하시오.', a: '친절, 경청, 공감, 신속, 정확' },
        { id: 2, q: '문의 유형별 대응을 설명하시오.', a: '상품문의, 배송문의, 교환/반품, 불만' },
        { id: 3, q: '클레임 처리 절차를 설명하시오.', a: '접수→원인파악→해결방안→처리→사후관리' },
        { id: 4, q: 'FAQ 작성 원칙을 설명하시오.', a: '자주 묻는 질문, 명확한 답변, 검색 가능' },
        { id: 5, q: '리뷰 관리 방법을 설명하시오.', a: '답변 작성, 베스트 선정, 악성 대응' },
        { id: 6, q: '고객 등급 관리를 설명하시오.', a: '구매금액/횟수 기준 등급, 혜택 차등' },
        { id: 7, q: '휴면 고객 관리를 설명하시오.', a: '재방문 유도, 쿠폰/이벤트 안내' },
        { id: 8, q: 'VOC(고객의 소리) 활용을 설명하시오.', a: '불만 분석, 서비스 개선 반영' },
        { id: 9, q: '분쟁 조정 절차를 설명하시오.', a: '내부 해결 → 소비자원 조정 → 소송' },
        { id: 10, q: 'CS 성과 지표를 설명하시오.', a: '응답시간, 해결률, 만족도(CSAT)' }
      ]
    },
    {
      id: 'sales-analysis',
      name: '매출 분석',
      icon: '📊',
      questions: [
        { id: 1, q: '매출 분석 지표를 설명하시오.', a: '매출액, 주문수, 객단가, 전환율' },
        { id: 2, q: '일별/월별 매출 분석을 설명하시오.', a: '트렌드 파악, 시즌성, 전년 대비' },
        { id: 3, q: '상품별 매출 분석을 설명하시오.', a: '베스트셀러, 수익성, 재고회전율' },
        { id: 4, q: '고객별 매출 분석을 설명하시오.', a: '신규/재구매, VIP 기여도' },
        { id: 5, q: '채널별 매출 분석을 설명하시오.', a: '자사몰, 오픈마켓, SNS 채널' },
        { id: 6, q: '마케팅 ROI 분석을 설명하시오.', a: '광고비 대비 매출, ROAS' },
        { id: 7, q: '장바구니 이탈 분석을 설명하시오.', a: '이탈률, 이탈 원인, 리타겟팅' },
        { id: 8, q: '재구매율 분석을 설명하시오.', a: '재구매 고객 비율, 주기 분석' },
        { id: 9, q: '매출 리포트 작성을 설명하시오.', a: '실적 요약, 원인 분석, 개선 방안' },
        { id: 10, q: 'KPI 설정 방법을 설명하시오.', a: 'SMART 기준, 측정 가능한 목표' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-2-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ecommerce-2-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `전자상거래관리사 2급 실기 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/ecommerce-2" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            ← 전자상거래관리사 2급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 전자상거래 실무 (실기)</h1>
          <p className="text-gray-600 mb-4">필답형 실기 시험 대비</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-4 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, q.id)}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button
                                onClick={() => handleAskAI(q.q)}
                                className="mt-2 text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1"
                              >
                                🤖 AI에게 자세히 물어보기
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
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
