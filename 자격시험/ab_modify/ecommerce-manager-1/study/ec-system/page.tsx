'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ECSystemStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'web-dev',
      name: '웹개발',
      icon: '🌐',
      questions: [
        { id: 1, q: 'HTML의 기본 구조를 설명하시오.', a: '<!DOCTYPE>, <html>, <head>, <body> 태그' },
        { id: 2, q: 'CSS의 역할과 적용 방법을 설명하시오.', a: '스타일 정의, 인라인/내부/외부 스타일시트' },
        { id: 3, q: '반응형 웹디자인을 설명하시오.', a: '미디어쿼리, 유동적 레이아웃, 다양한 기기 대응' },
        { id: 4, q: 'JavaScript의 역할을 설명하시오.', a: '동적 기능, DOM 조작, 이벤트 처리, AJAX' },
        { id: 5, q: 'AJAX 통신을 설명하시오.', a: '비동기 데이터 통신, 페이지 새로고침 없이 갱신' },
        { id: 6, q: 'REST API를 설명하시오.', a: 'HTTP 메서드 기반, GET/POST/PUT/DELETE, JSON' },
        { id: 7, q: '프론트엔드와 백엔드를 비교하시오.', a: '프론트엔드: UI/UX, 백엔드: 서버/DB/비즈니스로직' },
        { id: 8, q: 'CMS(콘텐츠관리시스템)를 설명하시오.', a: 'WordPress, 카페24 등, 비개발자도 사이트 관리' },
        { id: 9, q: '웹 접근성을 설명하시오.', a: '장애인/고령자 접근 보장, WCAG 가이드라인' },
        { id: 10, q: 'CDN(콘텐츠전송네트워크)을 설명하시오.', a: '전 세계 서버 분산, 로딩 속도 향상, 트래픽 분산' }
      ]
    },
    {
      id: 'security',
      name: '보안',
      icon: '🔒',
      questions: [
        { id: 1, q: 'SSL/TLS 인증서의 역할을 설명하시오.', a: 'HTTPS 암호화, 사이트 신원 인증, 데이터 보호' },
        { id: 2, q: '개인정보 암호화 방법을 설명하시오.', a: '해시(SHA), 대칭키(AES), 비대칭키(RSA)' },
        { id: 3, q: 'XSS(크로스사이트스크립팅) 공격을 설명하시오.', a: '악성 스크립트 삽입, 입력값 검증/이스케이프로 방지' },
        { id: 4, q: 'SQL 인젝션 공격을 설명하시오.', a: 'SQL 쿼리 조작, 준비된 문장/파라미터화로 방지' },
        { id: 5, q: 'CSRF 공격을 설명하시오.', a: '사용자 권한 도용, 토큰 검증으로 방지' },
        { id: 6, q: '방화벽의 역할을 설명하시오.', a: '네트워크 트래픽 필터링, 비인가 접근 차단' },
        { id: 7, q: 'DDoS 공격과 대응을 설명하시오.', a: '대량 트래픽 공격, CDN/WAF/방어 서비스 활용' },
        { id: 8, q: 'PCI DSS를 설명하시오.', a: '카드 결제 보안 표준, 데이터 보호 요구사항' },
        { id: 9, q: '접근 통제 방식을 설명하시오.', a: '역할 기반(RBAC), 최소 권한 원칙' },
        { id: 10, q: '보안 취약점 점검 방법을 설명하시오.', a: '모의해킹, 취약점 스캐닝, 코드 리뷰' }
      ]
    },
    {
      id: 'payment',
      name: '결제시스템',
      icon: '💳',
      questions: [
        { id: 1, q: 'PG(결제대행사)의 역할을 설명하시오.', a: '가맹점-카드사 중개, 결제 처리, 정산' },
        { id: 2, q: '신용카드 결제 프로세스를 설명하시오.', a: '결제요청→인증→승인→정산→입금' },
        { id: 3, q: '간편결제 서비스를 설명하시오.', a: '카드정보 미입력, 네이버페이/카카오페이 등' },
        { id: 4, q: '가상계좌 결제를 설명하시오.', a: '일회용 계좌 발급, 무통장입금, 실시간 확인' },
        { id: 5, q: '에스크로 서비스를 설명하시오.', a: '제3자 예치, 구매자 보호, 분쟁 시 환불' },
        { id: 6, q: '휴대폰 결제를 설명하시오.', a: '통신사 청구, 소액결제, 본인인증 포함' },
        { id: 7, q: '정기결제(구독) 시스템을 설명하시오.', a: '자동 반복 결제, 빌링키 발급, 실패 처리' },
        { id: 8, q: '해외결제 서비스를 설명하시오.', a: 'PayPal, 해외카드, 환율 처리, 세금' },
        { id: 9, q: '결제 연동 API를 설명하시오.', a: 'PG사 API, 결제창 호출, 콜백 처리' },
        { id: 10, q: '결제 보안 인증(3D Secure)을 설명하시오.', a: '추가 인증 단계, 부정결제 방지, Visa/MC' }
      ]
    },
    {
      id: 'server',
      name: '서버/인프라',
      icon: '🖥️',
      questions: [
        { id: 1, q: '웹서버의 역할을 설명하시오.', a: 'HTTP 요청 처리, 정적 파일 제공, Apache/Nginx' },
        { id: 2, q: '클라우드 서비스(IaaS/PaaS/SaaS)를 비교하시오.', a: 'IaaS: 인프라, PaaS: 플랫폼, SaaS: 소프트웨어' },
        { id: 3, q: 'AWS/Azure/GCP를 비교하시오.', a: '3대 클라우드, 다양한 서비스, 글로벌 인프라' },
        { id: 4, q: '로드밸런싱을 설명하시오.', a: '서버 부하 분산, 가용성 향상, 이중화' },
        { id: 5, q: '오토스케일링을 설명하시오.', a: '트래픽 따른 자동 확장/축소, 비용 최적화' },
        { id: 6, q: '컨테이너(Docker)를 설명하시오.', a: '애플리케이션 격리, 환경 일관성, 배포 용이' },
        { id: 7, q: 'CI/CD를 설명하시오.', a: '지속적 통합/배포, 자동화 파이프라인' },
        { id: 8, q: '서버 모니터링을 설명하시오.', a: 'CPU/메모리/트래픽 감시, 알림, 로그 분석' },
        { id: 9, q: '백업 전략을 설명하시오.', a: '전체/증분/차등, 3-2-1 규칙, 복구 테스트' },
        { id: 10, q: 'DNS 관리를 설명하시오.', a: '도메인-IP 매핑, A/CNAME 레코드, TTL' }
      ]
    },
    {
      id: 'database',
      name: '데이터베이스',
      icon: '🗄️',
      questions: [
        { id: 1, q: 'RDBMS와 NoSQL을 비교하시오.', a: 'RDBMS: 정형/관계형, NoSQL: 비정형/분산' },
        { id: 2, q: 'MySQL/PostgreSQL을 비교하시오.', a: '오픈소스 RDBMS, PostgreSQL이 더 고급 기능' },
        { id: 3, q: 'MongoDB를 설명하시오.', a: '문서형 NoSQL, JSON 형태, 유연한 스키마' },
        { id: 4, q: 'SQL 기본 명령어를 설명하시오.', a: 'SELECT, INSERT, UPDATE, DELETE, JOIN' },
        { id: 5, q: '인덱스의 역할을 설명하시오.', a: '검색 속도 향상, B-Tree 구조, 쓰기 오버헤드' },
        { id: 6, q: '트랜잭션(ACID)을 설명하시오.', a: '원자성/일관성/격리성/지속성' },
        { id: 7, q: '데이터 백업/복구를 설명하시오.', a: '덤프, 리플리케이션, 포인트인타임 복구' },
        { id: 8, q: '데이터 마이그레이션을 설명하시오.', a: '시스템간 데이터 이전, ETL 프로세스' },
        { id: 9, q: '캐싱(Redis/Memcached)을 설명하시오.', a: '메모리 기반 고속 저장, DB 부하 감소' },
        { id: 10, q: '데이터 정규화를 설명하시오.', a: '중복 제거, 무결성 보장, 1NF~3NF' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ec-system-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ec-system-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `전자상거래관리사 1급 전자상거래 시스템관리 과목 문제입니다.

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-emerald-600">전자상거래관리사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">전자상거래 시스템관리</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">💻</span></div>
              <div>
                <h1 className="text-2xl font-bold">전자상거래 시스템관리</h1>
                <p className="text-emerald-200">전자상거래관리사 1급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-emerald-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                  className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/ecommerce-1/study/ec-operation" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">← 전자상거래 운영관리</Link>
          <Link href="/category/office/ecommerce-1/study/ec-law" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition">전자상거래 관련법규 →</Link>
        </div>
      </main>

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
