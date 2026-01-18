'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ECMarketingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'online-marketing',
      name: '온라인 마케팅 기초',
      icon: '📢',
      questions: [
        { id: 1, q: '온라인 마케팅의 정의를 설명하시오.', a: '인터넷을 활용한 마케팅 활동 전반' },
        { id: 2, q: '온라인 마케팅의 장점을 설명하시오.', a: '비용 효율, 타겟팅, 측정 가능, 양방향 소통' },
        { id: 3, q: '마케팅 믹스 4P를 설명하시오.', a: 'Product, Price, Place, Promotion' },
        { id: 4, q: '디지털 마케팅 4C를 설명하시오.', a: 'Customer, Cost, Convenience, Communication' },
        { id: 5, q: '퍼포먼스 마케팅을 설명하시오.', a: '성과 기반 마케팅, CPA/CPC/CPS 과금' },
        { id: 6, q: '브랜드 마케팅을 설명하시오.', a: '브랜드 인지도/이미지 구축 중심' },
        { id: 7, q: '타겟 마케팅을 설명하시오.', a: '특정 고객 세그먼트 집중 공략' },
        { id: 8, q: 'STP 전략을 설명하시오.', a: 'Segmentation, Targeting, Positioning' },
        { id: 9, q: '고객 여정(Customer Journey)을 설명하시오.', a: '인지→관심→고려→구매→충성 단계' },
        { id: 10, q: '마케팅 퍼널을 설명하시오.', a: 'TOFU(인지), MOFU(고려), BOFU(전환)' }
      ]
    },
    {
      id: 'search-marketing',
      name: '검색 마케팅',
      icon: '🔍',
      questions: [
        { id: 1, q: 'SEO(검색엔진최적화)를 설명하시오.', a: '검색 결과 상위 노출을 위한 최적화' },
        { id: 2, q: '온페이지 SEO를 설명하시오.', a: '페이지 내 제목/콘텐츠/메타태그 최적화' },
        { id: 3, q: '오프페이지 SEO를 설명하시오.', a: '백링크 확보, 소셜 시그널' },
        { id: 4, q: '키워드 리서치를 설명하시오.', a: '검색량/경쟁도 분석, 롱테일 키워드' },
        { id: 5, q: 'SEM(검색엔진마케팅)을 설명하시오.', a: 'SEO + 유료 검색광고(PPC)' },
        { id: 6, q: 'PPC(Pay Per Click) 광고를 설명하시오.', a: '클릭당 과금 검색광고, 네이버/구글' },
        { id: 7, q: '품질점수(Quality Score)를 설명하시오.', a: '광고 품질 평가, CTR/연관성/랜딩페이지' },
        { id: 8, q: 'CPC(Cost Per Click)를 설명하시오.', a: '클릭당 비용, 입찰가와 품질점수로 결정' },
        { id: 9, q: 'CTR(Click Through Rate)을 설명하시오.', a: '클릭률 = 클릭수/노출수 × 100' },
        { id: 10, q: '검색광고 A/B 테스트를 설명하시오.', a: '광고문안/랜딩페이지 비교 실험' }
      ]
    },
    {
      id: 'sns-marketing',
      name: 'SNS 마케팅',
      icon: '📱',
      questions: [
        { id: 1, q: 'SNS 마케팅의 특징을 설명하시오.', a: '양방향 소통, 바이럴, 커뮤니티' },
        { id: 2, q: '인스타그램 마케팅 전략을 설명하시오.', a: '비주얼 콘텐츠, 해시태그, 스토리/릴스' },
        { id: 3, q: '페이스북 광고를 설명하시오.', a: '타겟팅, 리타겟팅, 유사타겟' },
        { id: 4, q: '유튜브 마케팅을 설명하시오.', a: '영상 콘텐츠, 구독자, 인플루언서 협업' },
        { id: 5, q: '틱톡 마케팅을 설명하시오.', a: '숏폼 영상, 챌린지, MZ세대 타겟' },
        { id: 6, q: '인플루언서 마케팅을 설명하시오.', a: '영향력 있는 개인 통한 홍보' },
        { id: 7, q: '마이크로 인플루언서를 설명하시오.', a: '1만~10만 팔로워, 높은 참여율' },
        { id: 8, q: 'UGC(User Generated Content)를 설명하시오.', a: '사용자 생성 콘텐츠 활용' },
        { id: 9, q: '바이럴 마케팅을 설명하시오.', a: '입소문 통한 자연적 확산' },
        { id: 10, q: '소셜 커머스를 설명하시오.', a: 'SNS에서 직접 구매 가능한 커머스' }
      ]
    },
    {
      id: 'crm',
      name: '고객관계관리(CRM)',
      icon: '👥',
      questions: [
        { id: 1, q: 'CRM의 정의를 설명하시오.', a: '고객과의 관계를 관리하여 가치 극대화' },
        { id: 2, q: 'CRM의 목적을 설명하시오.', a: '고객 획득, 유지, 확대, 이탈 방지' },
        { id: 3, q: '고객 세분화를 설명하시오.', a: '인구통계/행동/가치 기준 고객 분류' },
        { id: 4, q: 'RFM 분석을 설명하시오.', a: 'Recency, Frequency, Monetary 기반 분석' },
        { id: 5, q: 'CLV(고객생애가치)를 설명하시오.', a: '고객이 평생 가져다 줄 예상 수익' },
        { id: 6, q: '고객 충성도 프로그램을 설명하시오.', a: '포인트/등급제/멤버십으로 재구매 유도' },
        { id: 7, q: '개인화 마케팅을 설명하시오.', a: '개인별 맞춤 상품/메시지 제공' },
        { id: 8, q: '이메일 마케팅을 설명하시오.', a: '뉴스레터, 프로모션, 장바구니 리마인드' },
        { id: 9, q: '푸시 알림 마케팅을 설명하시오.', a: '앱/웹 푸시로 즉각적 메시지 전달' },
        { id: 10, q: 'NPS(순추천지수)를 설명하시오.', a: '추천의향 점수, 추천자-비추천자 비율' }
      ]
    },
    {
      id: 'promotion',
      name: '판촉 전략',
      icon: '🎁',
      questions: [
        { id: 1, q: '쿠폰 마케팅을 설명하시오.', a: '할인쿠폰 발급으로 구매 유도' },
        { id: 2, q: '포인트 마케팅을 설명하시오.', a: '적립금으로 재구매 유도' },
        { id: 3, q: '타임세일을 설명하시오.', a: '한정 시간 할인으로 긴급성 자극' },
        { id: 4, q: '무료배송 전략을 설명하시오.', a: '배송비 무료로 구매 장벽 제거' },
        { id: 5, q: '번들 판매를 설명하시오.', a: '여러 상품 묶음 할인 판매' },
        { id: 6, q: '업셀링(Up-selling)을 설명하시오.', a: '더 비싼 상품 구매 유도' },
        { id: 7, q: '크로스셀링(Cross-selling)을 설명하시오.', a: '관련 상품 추가 구매 유도' },
        { id: 8, q: '사은품 증정을 설명하시오.', a: '구매 시 무료 증정품 제공' },
        { id: 9, q: '신규 가입 혜택을 설명하시오.', a: '첫 구매 할인/적립으로 가입 유도' },
        { id: 10, q: '리뷰 이벤트를 설명하시오.', a: '리뷰 작성 시 포인트/쿠폰 제공' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-2-marketing-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ecommerce-2-marketing-progress', JSON.stringify(updated));
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
    const prompt = `전자상거래관리사 2급 - 전자상거래 마케팅 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📢 전자상거래 마케팅</h1>
          <p className="text-gray-600 mb-4">온라인 마케팅, 고객관리, 판촉전략</p>
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
