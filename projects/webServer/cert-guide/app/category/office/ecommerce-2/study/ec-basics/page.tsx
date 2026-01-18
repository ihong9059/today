'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ECBasicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'ec-concept',
      name: '전자상거래 개념',
      icon: '📚',
      questions: [
        { id: 1, q: '전자상거래의 정의를 설명하시오.', a: '인터넷 등 전자적 수단을 통한 상품/서비스 거래 활동' },
        { id: 2, q: 'E-Business와 E-Commerce의 차이를 설명하시오.', a: 'E-Business는 전체 업무 전자화, E-Commerce는 거래에 집중' },
        { id: 3, q: '전자상거래의 장점을 설명하시오.', a: '24시간 운영, 글로벌 판매, 비용 절감, 고객 데이터 활용' },
        { id: 4, q: '전자상거래의 단점을 설명하시오.', a: '보안 문제, 배송 시간, 실물 확인 불가, 신뢰 구축 어려움' },
        { id: 5, q: '전자상거래 발전 단계를 설명하시오.', a: '정보제공→거래→통합→협업→지능화' },
        { id: 6, q: '디지털 전환(Digital Transformation)을 설명하시오.', a: '디지털 기술로 비즈니스 모델과 프로세스 혁신' },
        { id: 7, q: '옴니채널(Omni-Channel)을 설명하시오.', a: '온오프라인 모든 채널의 통합된 고객 경험 제공' },
        { id: 8, q: 'O2O(Online to Offline) 서비스를 설명하시오.', a: '온라인에서 구매 후 오프라인에서 서비스 제공' },
        { id: 9, q: '전자상거래 생태계 구성요소를 설명하시오.', a: '판매자, 구매자, 플랫폼, 결제, 물류, 마케팅' },
        { id: 10, q: '전자상거래 성공 요인을 설명하시오.', a: 'UX, 상품 경쟁력, 마케팅, 물류, 고객서비스' }
      ]
    },
    {
      id: 'ec-types',
      name: '전자상거래 유형',
      icon: '🏷️',
      questions: [
        { id: 1, q: 'B2C(Business to Consumer)를 설명하시오.', a: '기업이 소비자에게 판매, 쿠팡/11번가 등' },
        { id: 2, q: 'B2B(Business to Business)를 설명하시오.', a: '기업간 거래, 도매/원자재/부품 거래' },
        { id: 3, q: 'C2C(Consumer to Consumer)를 설명하시오.', a: '개인간 거래, 당근마켓/중고나라 등' },
        { id: 4, q: 'B2G(Business to Government)를 설명하시오.', a: '기업이 정부기관에 납품, 조달청 나라장터' },
        { id: 5, q: 'D2C(Direct to Consumer)를 설명하시오.', a: '제조사가 소비자에게 직접 판매, 자사몰 운영' },
        { id: 6, q: '오픈마켓과 종합몰의 차이를 설명하시오.', a: '오픈마켓: 입점형 플랫폼, 종합몰: 자체 매입/판매' },
        { id: 7, q: '소셜커머스를 설명하시오.', a: 'SNS 기반 공동구매/할인판매, 쿠팡/티몬/위메프' },
        { id: 8, q: '버티컬 커머스를 설명하시오.', a: '특정 카테고리 전문몰, 무신사(패션)/마켓컬리(식품)' },
        { id: 9, q: '라이브커머스를 설명하시오.', a: '실시간 방송으로 상품 판매, 쇼호스트 진행' },
        { id: 10, q: '구독 커머스를 설명하시오.', a: '정기 배송 서비스, 밀키트/화장품/면도기 등' }
      ]
    },
    {
      id: 'business-model',
      name: '비즈니스 모델',
      icon: '💼',
      questions: [
        { id: 1, q: '플랫폼 비즈니스 모델을 설명하시오.', a: '판매자와 구매자 연결, 수수료 수익' },
        { id: 2, q: '수수료 기반 모델을 설명하시오.', a: '거래 금액의 일정 비율 수수료 수취' },
        { id: 3, q: '광고 수익 모델을 설명하시오.', a: '배너광고, 검색광고, 스폰서 상품 노출' },
        { id: 4, q: '프리미엄(Freemium) 모델을 설명하시오.', a: '기본 무료, 고급 기능 유료 제공' },
        { id: 5, q: '구독(Subscription) 모델을 설명하시오.', a: '정기 결제로 서비스/상품 제공' },
        { id: 6, q: '드롭쉬핑(Drop Shipping)을 설명하시오.', a: '재고 없이 주문 후 공급자가 직접 배송' },
        { id: 7, q: '제휴 마케팅(Affiliate) 모델을 설명하시오.', a: '외부 제휴사 통해 판매 시 수수료 지급' },
        { id: 8, q: '데이터 수익화 모델을 설명하시오.', a: '고객 데이터 분석/판매로 수익 창출' },
        { id: 9, q: '풀필먼트 서비스를 설명하시오.', a: '물류/배송/CS 대행 서비스 제공' },
        { id: 10, q: '리셀(Resale) 비즈니스를 설명하시오.', a: '한정판/중고 상품 재판매, 스탁엑스/크림' }
      ]
    },
    {
      id: 'market-trend',
      name: '시장 동향',
      icon: '📈',
      questions: [
        { id: 1, q: '국내 전자상거래 시장 규모를 설명하시오.', a: '약 200조원 이상, 연평균 10% 이상 성장' },
        { id: 2, q: '모바일 커머스 비중을 설명하시오.', a: '전체 전자상거래의 70% 이상 모바일' },
        { id: 3, q: '크로스보더 커머스를 설명하시오.', a: '국경 넘어 해외 직구/역직구' },
        { id: 4, q: '퀵커머스(Quick Commerce)를 설명하시오.', a: '1시간 이내 초고속 배송 서비스' },
        { id: 5, q: 'AI 쇼핑 어시스턴트를 설명하시오.', a: 'AI 기반 상품 추천, 챗봇 상담' },
        { id: 6, q: 'AR/VR 커머스를 설명하시오.', a: '가상 피팅, 3D 상품 체험' },
        { id: 7, q: 'ESG와 전자상거래를 설명하시오.', a: '친환경 포장, 탄소 중립 물류' },
        { id: 8, q: '리커머스(Re-commerce)를 설명하시오.', a: '중고/리퍼브 상품 거래 활성화' },
        { id: 9, q: '슈퍼앱 전략을 설명하시오.', a: '하나의 앱에서 모든 서비스 제공, 카카오/네이버' },
        { id: 10, q: '버티컬 플랫폼 성장을 설명하시오.', a: '특정 카테고리 전문 플랫폼 강세' }
      ]
    },
    {
      id: 'success-case',
      name: '성공 사례',
      icon: '🏆',
      questions: [
        { id: 1, q: '아마존의 성공 전략을 설명하시오.', a: '고객 중심, 프라임, AWS, 풀필먼트' },
        { id: 2, q: '쿠팡의 성장 전략을 설명하시오.', a: '로켓배송, 자체 물류, 와우멤버십' },
        { id: 3, q: '네이버쇼핑의 전략을 설명하시오.', a: '검색연동, 스마트스토어, 결제 연계' },
        { id: 4, q: '마켓컬리의 차별화를 설명하시오.', a: '새벽배송, 프리미엄 식품, 콜드체인' },
        { id: 5, q: '무신사의 성공 요인을 설명하시오.', a: '패션 커뮤니티, 브랜드 발굴, MZ세대 타겟' },
        { id: 6, q: '당근마켓의 혁신을 설명하시오.', a: '하이퍼로컬, 직거래, 동네 커뮤니티' },
        { id: 7, q: '알리바바의 글로벌 전략을 설명하시오.', a: '알리페이, 물류(차이냐오), 클라우드' },
        { id: 8, q: '쇼피(Shopee)의 동남아 전략을 설명하시오.', a: '현지화, 게이미피케이션, 무료배송' },
        { id: 9, q: '29CM의 브랜딩을 설명하시오.', a: '큐레이션, 감성 마케팅, 프리미엄 이미지' },
        { id: 10, q: '오늘의집의 성장 전략을 설명하시오.', a: '인테리어 콘텐츠, 커뮤니티, 시공 연계' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-2-basics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ecommerce-2-basics-progress', JSON.stringify(updated));
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
    const prompt = `전자상거래관리사 2급 - 전자상거래 일반 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 전자상거래 일반</h1>
          <p className="text-gray-600 mb-4">전자상거래 개념, 유형, 비즈니스 모델</p>
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
