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
      id: 'web-planning',
      name: '웹사이트 기획',
      icon: '📝',
      questions: [
        { id: 1, q: '전자상거래 사이트 기획서 작성 항목을 설명하시오.', a: '사업개요, 목표고객, 경쟁분석, 기능명세, 일정, 예산' },
        { id: 2, q: '사용자 요구사항 분석 방법을 설명하시오.', a: '설문조사, 인터뷰, 포커스그룹, 경쟁사 분석' },
        { id: 3, q: '와이어프레임 작성 방법을 설명하시오.', a: 'UI 레이아웃 스케치, 핵심 기능 배치, 사용자 흐름' },
        { id: 4, q: '사이트맵 설계 원칙을 설명하시오.', a: '3클릭 원칙, 논리적 구조, 직관적 네비게이션' },
        { id: 5, q: 'UI/UX 설계 원칙을 설명하시오.', a: '일관성, 가시성, 피드백, 오류방지, 접근성' },
        { id: 6, q: '반응형 웹 설계를 설명하시오.', a: 'PC/태블릿/모바일 대응, 미디어쿼리, 유동형 레이아웃' },
        { id: 7, q: '랜딩페이지 기획 요소를 설명하시오.', a: '헤드라인, 혜택, CTA버튼, 신뢰요소, 사회적증거' },
        { id: 8, q: '결제 프로세스 설계를 설명하시오.', a: '최소 단계, 게스트결제, 다양한 결제수단, 보안' },
        { id: 9, q: '회원가입 프로세스 최적화를 설명하시오.', a: '필수정보 최소화, 소셜로그인, 단계적 정보수집' },
        { id: 10, q: 'A/B 테스트 설계를 설명하시오.', a: '가설설정, 변수통제, 표본크기, 통계적 유의성' }
      ]
    },
    {
      id: 'shopping-operation',
      name: '쇼핑몰 운영',
      icon: '🛒',
      questions: [
        { id: 1, q: '상품 등록 프로세스를 설명하시오.', a: '카테고리 분류, 상품명, 이미지, 상세설명, 가격, 재고' },
        { id: 2, q: '상품 상세페이지 구성 요소를 설명하시오.', a: '대표이미지, 상세설명, 구매정보, 리뷰, 배송안내' },
        { id: 3, q: '재고관리(SKU) 시스템을 설명하시오.', a: '품목코드, 재고수량, 입출고관리, 안전재고' },
        { id: 4, q: '주문처리 프로세스를 설명하시오.', a: '주문접수, 결제확인, 배송준비, 출고, 배송완료' },
        { id: 5, q: '배송관리 시스템을 설명하시오.', a: '택배사 연동, 송장번호, 배송추적, 배송완료 처리' },
        { id: 6, q: '교환/반품 처리 절차를 설명하시오.', a: '신청접수, 회수, 검수, 환불/재발송 처리' },
        { id: 7, q: '프로모션 기획 및 실행을 설명하시오.', a: '할인행사, 쿠폰발행, 포인트적립, 무료배송' },
        { id: 8, q: '쿠폰/포인트 시스템 운영을 설명하시오.', a: '발급조건, 사용조건, 유효기간, 중복사용 정책' },
        { id: 9, q: '고객 리뷰 관리 방법을 설명하시오.', a: '리뷰 노출, 베스트리뷰, 포토리뷰, 악성리뷰 대응' },
        { id: 10, q: '매출 정산 프로세스를 설명하시오.', a: 'PG수수료, 마켓플레이스 수수료, 정산주기, 세금계산서' }
      ]
    },
    {
      id: 'data-analysis',
      name: '데이터 분석',
      icon: '📊',
      questions: [
        { id: 1, q: 'Google Analytics 핵심 지표를 설명하시오.', a: '세션, 사용자, 페이지뷰, 이탈률, 체류시간' },
        { id: 2, q: '전환율(CVR) 분석을 설명하시오.', a: '구매전환율 = 구매자/방문자, 단계별 전환 퍼널' },
        { id: 3, q: '이탈률 개선 방법을 설명하시오.', a: '페이지 로딩속도, 콘텐츠 품질, UX 개선' },
        { id: 4, q: '유입 채널 분석(UTM)을 설명하시오.', a: 'source, medium, campaign 파라미터로 채널 추적' },
        { id: 5, q: '구매 퍼널 분석을 설명하시오.', a: '방문→상품조회→장바구니→결제→구매 단계별 이탈' },
        { id: 6, q: 'RFM 분석을 설명하시오.', a: 'Recency, Frequency, Monetary로 고객 세분화' },
        { id: 7, q: '코호트 분석을 설명하시오.', a: '가입시점별 그룹의 행동 패턴 비교' },
        { id: 8, q: 'LTV(고객생애가치) 계산을 설명하시오.', a: '평균구매액 × 구매빈도 × 거래기간' },
        { id: 9, q: 'CAC(고객획득비용) 분석을 설명하시오.', a: '마케팅비용 / 신규고객수, LTV와 비교' },
        { id: 10, q: '히트맵 분석을 설명하시오.', a: '클릭, 스크롤, 마우스 이동 패턴 시각화' }
      ]
    },
    {
      id: 'marketing',
      name: '디지털 마케팅',
      icon: '📢',
      questions: [
        { id: 1, q: '검색엔진최적화(SEO) 기법을 설명하시오.', a: '키워드, 메타태그, 콘텐츠, 백링크, 사이트구조' },
        { id: 2, q: '검색광고(SEM) 운영을 설명하시오.', a: '키워드 입찰, 품질점수, 광고문안, 랜딩페이지' },
        { id: 3, q: 'SNS 마케팅 전략을 설명하시오.', a: '채널별 특성, 콘텐츠 기획, 인플루언서, 바이럴' },
        { id: 4, q: '리타겟팅 광고를 설명하시오.', a: '방문자 재방문 유도, 픽셀 기반 타겟팅' },
        { id: 5, q: '이메일 마케팅 실무를 설명하시오.', a: '발송리스트, 제목라인, 콘텐츠, 발송시점, A/B테스트' },
        { id: 6, q: '제휴마케팅(어필리에이트) 운영을 설명하시오.', a: 'CPA/CPS 기반, 제휴사 모집, 성과추적, 정산' },
        { id: 7, q: '콘텐츠 마케팅 전략을 설명하시오.', a: '블로그, 동영상, 인포그래픽, 사례연구, 웨비나' },
        { id: 8, q: '광고 성과 측정 지표를 설명하시오.', a: '노출, 클릭, CTR, CPC, CPA, ROAS' },
        { id: 9, q: 'CRM 마케팅 실무를 설명하시오.', a: '고객 세분화, 맞춤 메시지, 구매주기 관리' },
        { id: 10, q: '마케팅 자동화 도구를 설명하시오.', a: '이메일자동화, 챗봇, 개인화추천, 워크플로우' }
      ]
    },
    {
      id: 'cs-operation',
      name: '고객서비스 실무',
      icon: '🎧',
      questions: [
        { id: 1, q: 'CS(고객서비스) 응대 매뉴얼을 설명하시오.', a: '인사, 경청, 공감, 해결책 제시, 마무리' },
        { id: 2, q: '클레임 처리 프로세스를 설명하시오.', a: '접수, 원인파악, 해결방안 제시, 처리, 재발방지' },
        { id: 3, q: 'FAQ 시스템 구축을 설명하시오.', a: '자주묻는질문 분류, 검색기능, 정기 업데이트' },
        { id: 4, q: '챗봇 시나리오 설계를 설명하시오.', a: '인텐트 분류, 대화흐름, 예외처리, 상담사 연결' },
        { id: 5, q: '상담 품질 관리(QA)를 설명하시오.', a: '모니터링, 평가지표, 코칭, 만족도 조사' },
        { id: 6, q: 'VOC(고객의 소리) 분석을 설명하시오.', a: '불만사항 수집, 분류, 개선과제 도출' },
        { id: 7, q: 'NPS(순추천지수) 측정을 설명하시오.', a: '추천의향 0~10점, 추천자-비추천자 비율' },
        { id: 8, q: '악성 고객 대응 방법을 설명하시오.', a: '감정통제, 사실확인, 상위자 에스컬레이션' },
        { id: 9, q: '멀티채널 CS 운영을 설명하시오.', a: '전화, 채팅, 이메일, SNS 통합 관리' },
        { id: 10, q: '고객 만족도 조사를 설명하시오.', a: 'CSAT, 설문설계, 응답률 제고, 결과 분석' }
      ]
    },
    {
      id: 'system-admin',
      name: '시스템 관리',
      icon: '⚙️',
      questions: [
        { id: 1, q: '쇼핑몰 관리자 기능을 설명하시오.', a: '상품관리, 주문관리, 회원관리, 통계, 설정' },
        { id: 2, q: '호스팅 환경 설정을 설명하시오.', a: '웹호스팅, 서버호스팅, 클라우드, 도메인 연결' },
        { id: 3, q: 'SSL 인증서 적용을 설명하시오.', a: 'HTTPS 보안, 인증서 발급, 설치, 갱신' },
        { id: 4, q: 'PG(결제대행) 연동을 설명하시오.', a: 'PG사 계약, API 연동, 테스트, 정산' },
        { id: 5, q: '데이터 백업 정책을 설명하시오.', a: '주기적 백업, 복구 테스트, 이중화, DR' },
        { id: 6, q: '보안 취약점 점검을 설명하시오.', a: 'SQL인젝션, XSS, CSRF 방어, 보안패치' },
        { id: 7, q: '사이트 성능 최적화를 설명하시오.', a: '이미지압축, CDN, 캐싱, 코드최적화' },
        { id: 8, q: '모니터링 시스템 구축을 설명하시오.', a: '서버상태, 트래픽, 에러로그, 알림 설정' },
        { id: 9, q: '로그 분석 및 활용을 설명하시오.', a: '접속로그, 에러로그, 보안로그 분석' },
        { id: 10, q: '장애 대응 프로세스를 설명하시오.', a: '모니터링, 알림, 원인분석, 복구, 보고' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-1-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ecommerce-1-practical-progress', JSON.stringify(updated));
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
    const prompt = `전자상거래관리사 1급 실기 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office/ecommerce-1"
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            ← 전자상거래관리사 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 전자상거래 실무 (실기)</h1>
          <p className="text-gray-600 mb-4">필답형 + 작업형 실기 시험 대비</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {totalCompleted} / {totalQuestions}
            </span>
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
                            isCompleted
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, q.id)}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button
                                onClick={() => handleAskAI(q.q)}
                                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
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
                  <a
                    href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                  >
                    <span className="text-2xl">🧡</span>
                    <div className="text-left">
                      <p className="font-bold text-orange-700">Claude</p>
                      <p className="text-xs text-orange-600">Anthropic AI</p>
                    </div>
                  </a>
                  <a
                    href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                  >
                    <span className="text-2xl">💚</span>
                    <div className="text-left">
                      <p className="font-bold text-green-700">ChatGPT</p>
                      <p className="text-xs text-green-600">OpenAI</p>
                    </div>
                  </a>
                  <a
                    href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                  >
                    <span className="text-2xl">💙</span>
                    <div className="text-left">
                      <p className="font-bold text-blue-700">Gemini</p>
                      <p className="text-xs text-blue-600">Google AI</p>
                    </div>
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
