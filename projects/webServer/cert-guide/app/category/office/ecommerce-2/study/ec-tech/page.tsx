'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ECTechStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'web-basics',
      name: '웹 기술 기초',
      icon: '🌐',
      questions: [
        { id: 1, q: 'HTML의 역할을 설명하시오.', a: '웹페이지 구조/내용 정의, 마크업 언어' },
        { id: 2, q: 'CSS의 역할을 설명하시오.', a: '웹페이지 디자인/스타일 정의' },
        { id: 3, q: 'JavaScript의 역할을 설명하시오.', a: '웹페이지 동적 기능 구현' },
        { id: 4, q: '반응형 웹을 설명하시오.', a: '화면 크기에 따라 레이아웃 자동 조정' },
        { id: 5, q: 'URL 구조를 설명하시오.', a: '프로토콜://도메인/경로?쿼리스트링' },
        { id: 6, q: '도메인과 호스팅을 설명하시오.', a: '도메인: 주소, 호스팅: 서버 공간 제공' },
        { id: 7, q: 'HTTP와 HTTPS 차이를 설명하시오.', a: 'HTTPS는 SSL 암호화 적용' },
        { id: 8, q: '쿠키(Cookie)를 설명하시오.', a: '브라우저에 저장되는 사용자 정보' },
        { id: 9, q: '세션(Session)을 설명하시오.', a: '서버에 저장되는 사용자 상태 정보' },
        { id: 10, q: 'API를 설명하시오.', a: '프로그램 간 데이터 교환 인터페이스' }
      ]
    },
    {
      id: 'security',
      name: '보안 기초',
      icon: '🔒',
      questions: [
        { id: 1, q: 'SSL/TLS 인증서를 설명하시오.', a: '통신 암호화, HTTPS 구현' },
        { id: 2, q: '방화벽(Firewall)을 설명하시오.', a: '네트워크 접근 제어, 외부 공격 차단' },
        { id: 3, q: '악성코드 종류를 설명하시오.', a: '바이러스, 웜, 트로이목마, 랜섬웨어' },
        { id: 4, q: '피싱(Phishing)을 설명하시오.', a: '가짜 사이트로 개인정보 탈취' },
        { id: 5, q: 'SQL 인젝션을 설명하시오.', a: '악성 SQL문 삽입으로 DB 공격' },
        { id: 6, q: 'XSS(크로스사이트스크립팅)를 설명하시오.', a: '악성 스크립트 삽입 공격' },
        { id: 7, q: 'DDoS 공격을 설명하시오.', a: '대량 트래픽으로 서버 마비' },
        { id: 8, q: '2단계 인증(2FA)을 설명하시오.', a: '비밀번호 + 추가 인증(OTP 등)' },
        { id: 9, q: '암호화의 종류를 설명하시오.', a: '대칭키(AES), 비대칭키(RSA)' },
        { id: 10, q: '개인정보 보호 조치를 설명하시오.', a: '암호화, 접근제한, 로그관리' }
      ]
    },
    {
      id: 'payment',
      name: '결제 시스템',
      icon: '💳',
      questions: [
        { id: 1, q: 'PG(Payment Gateway)를 설명하시오.', a: '결제대행사, 카드사/은행 연결' },
        { id: 2, q: '신용카드 결제 흐름을 설명하시오.', a: '승인요청→카드사승인→매입→정산' },
        { id: 3, q: '가상계좌 결제를 설명하시오.', a: '임시 계좌번호 발급, 입금 확인 시 결제 완료' },
        { id: 4, q: '간편결제를 설명하시오.', a: '네이버페이, 카카오페이, 페이코 등' },
        { id: 5, q: '에스크로(Escrow)를 설명하시오.', a: '구매확정 전 결제대금 보관, 소비자 보호' },
        { id: 6, q: '정기결제를 설명하시오.', a: '구독 서비스용 자동 반복 결제' },
        { id: 7, q: 'PCI-DSS를 설명하시오.', a: '카드정보 보안 국제 표준' },
        { id: 8, q: '현금영수증 발급을 설명하시오.', a: '현금 결제 시 소득공제용 발급' },
        { id: 9, q: '환불 처리 프로세스를 설명하시오.', a: '취소요청→PG전송→카드사승인→환불' },
        { id: 10, q: '해외결제 서비스를 설명하시오.', a: 'PayPal, Stripe, 페이게이트' }
      ]
    },
    {
      id: 'network',
      name: '네트워크 기초',
      icon: '📡',
      questions: [
        { id: 1, q: 'IP 주소를 설명하시오.', a: '인터넷 상의 컴퓨터 식별 주소' },
        { id: 2, q: 'DNS를 설명하시오.', a: '도메인을 IP주소로 변환하는 시스템' },
        { id: 3, q: '서버와 클라이언트를 설명하시오.', a: '서버: 서비스 제공, 클라이언트: 요청' },
        { id: 4, q: '웹서버의 역할을 설명하시오.', a: 'HTTP 요청 처리, 웹페이지 전송' },
        { id: 5, q: 'CDN을 설명하시오.', a: '콘텐츠 전송 네트워크, 빠른 로딩' },
        { id: 6, q: '로드밸런싱을 설명하시오.', a: '트래픽을 여러 서버에 분산' },
        { id: 7, q: '클라우드 서비스를 설명하시오.', a: 'AWS, Azure, GCP 등 인프라 제공' },
        { id: 8, q: 'SaaS/PaaS/IaaS를 설명하시오.', a: '소프트웨어/플랫폼/인프라 서비스' },
        { id: 9, q: 'VPN을 설명하시오.', a: '가상 사설망, 암호화된 터널 연결' },
        { id: 10, q: '대역폭(Bandwidth)을 설명하시오.', a: '데이터 전송 용량, 속도 결정' }
      ]
    },
    {
      id: 'database',
      name: '데이터베이스 기초',
      icon: '🗄️',
      questions: [
        { id: 1, q: '데이터베이스의 정의를 설명하시오.', a: '구조화된 데이터의 집합, 체계적 관리' },
        { id: 2, q: 'DBMS를 설명하시오.', a: '데이터베이스 관리 시스템, MySQL/Oracle' },
        { id: 3, q: 'SQL의 역할을 설명하시오.', a: '데이터 조회/삽입/수정/삭제 언어' },
        { id: 4, q: '테이블과 레코드를 설명하시오.', a: '테이블: 데이터 구조, 레코드: 행(데이터)' },
        { id: 5, q: '기본키(Primary Key)를 설명하시오.', a: '레코드 고유 식별, 중복 불가' },
        { id: 6, q: '외래키(Foreign Key)를 설명하시오.', a: '테이블 간 관계 연결' },
        { id: 7, q: '인덱스(Index)를 설명하시오.', a: '검색 속도 향상을 위한 색인' },
        { id: 8, q: '백업과 복구를 설명하시오.', a: '데이터 손실 대비 저장/복원' },
        { id: 9, q: 'NoSQL을 설명하시오.', a: '비정형 데이터 저장, MongoDB 등' },
        { id: 10, q: '데이터 무결성을 설명하시오.', a: '데이터의 정확성과 일관성 보장' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-2-tech-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ecommerce-2-tech-progress', JSON.stringify(updated));
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
    const prompt = `전자상거래관리사 2급 - 전자상거래 기술 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💻 전자상거래 기술</h1>
          <p className="text-gray-600 mb-4">웹기술, 보안, 결제시스템 기초</p>
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
