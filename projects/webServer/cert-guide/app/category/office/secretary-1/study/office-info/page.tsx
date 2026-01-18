'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OfficeInfoStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'oa-system',
      name: 'OA시스템',
      icon: '🖥️',
      questions: [
        { id: 1, q: 'OA(Office Automation)의 정의를 설명하시오.', a: '사무 업무의 전산화/자동화, 생산성 향상' },
        { id: 2, q: '그룹웨어의 기능을 설명하시오.', a: '전자결재, 메일, 캘린더, 게시판, 메신저' },
        { id: 3, q: '워드프로세서의 기능을 설명하시오.', a: '문서 작성/편집/저장, 서식, 표/그림 삽입' },
        { id: 4, q: '스프레드시트의 기능을 설명하시오.', a: '표 작성, 수식/함수, 차트, 데이터 분석' },
        { id: 5, q: '프레젠테이션 도구를 설명하시오.', a: 'PPT/키노트, 슬라이드 작성, 애니메이션' },
        { id: 6, q: 'ERP 시스템을 설명하시오.', a: '전사적 자원관리, 회계/인사/생산 통합' },
        { id: 7, q: 'CRM 시스템을 설명하시오.', a: '고객관계관리, 고객 정보/이력 관리' },
        { id: 8, q: 'KMS(지식관리시스템)를 설명하시오.', a: '조직 지식 수집/공유/활용' },
        { id: 9, q: '클라우드 오피스를 설명하시오.', a: 'Google Workspace, MS 365, 웹 기반 협업' },
        { id: 10, q: '협업 도구를 설명하시오.', a: 'Slack, Teams, Notion, Trello' }
      ]
    },
    {
      id: 'info-mgmt',
      name: '정보관리',
      icon: '📊',
      questions: [
        { id: 1, q: '정보의 특성을 설명하시오.', a: '정확성, 적시성, 관련성, 완전성, 신뢰성' },
        { id: 2, q: '정보 수집 방법을 설명하시오.', a: '내부자료, 외부자료, 인터넷, 데이터베이스' },
        { id: 3, q: '정보 분류 체계를 설명하시오.', a: '주제별, 부서별, 형태별, 보안등급별' },
        { id: 4, q: '정보 가공/분석을 설명하시오.', a: '데이터 정리, 통계, 시각화, 인사이트 도출' },
        { id: 5, q: '정보 공유 방법을 설명하시오.', a: '그룹웨어, 공유폴더, 클라우드, 보고서' },
        { id: 6, q: '정보 보안 원칙을 설명하시오.', a: '기밀성, 무결성, 가용성 (CIA)' },
        { id: 7, q: '개인정보 보호를 설명하시오.', a: '수집동의, 목적 제한, 안전조치, 파기' },
        { id: 8, q: '정보 백업 방법을 설명하시오.', a: '전체/증분/차등 백업, 3-2-1 규칙' },
        { id: 9, q: '정보 검색 기법을 설명하시오.', a: '불리언 연산, 키워드, 필터링' },
        { id: 10, q: '빅데이터 활용을 설명하시오.', a: '대용량 데이터 분석, 패턴 발견, 예측' }
      ]
    },
    {
      id: 'database',
      name: '데이터베이스',
      icon: '🗄️',
      questions: [
        { id: 1, q: '데이터베이스의 정의를 설명하시오.', a: '구조화된 데이터 집합, 체계적 관리' },
        { id: 2, q: 'DBMS의 역할을 설명하시오.', a: '데이터 생성/조회/수정/삭제, 보안/백업' },
        { id: 3, q: '관계형 데이터베이스를 설명하시오.', a: '테이블 기반, 행/열, 관계 설정' },
        { id: 4, q: '기본키와 외래키를 설명하시오.', a: '기본키: 고유식별, 외래키: 관계 연결' },
        { id: 5, q: 'SQL 기본 명령어를 설명하시오.', a: 'SELECT, INSERT, UPDATE, DELETE' },
        { id: 6, q: '데이터 정규화를 설명하시오.', a: '중복 제거, 이상현상 방지, 무결성 확보' },
        { id: 7, q: '인덱스의 역할을 설명하시오.', a: '검색 속도 향상, 색인 생성' },
        { id: 8, q: '데이터 백업과 복구를 설명하시오.', a: '정기 백업, 장애 시 복원' },
        { id: 9, q: '데이터 무결성을 설명하시오.', a: '정확성/일관성 유지, 제약조건' },
        { id: 10, q: 'NoSQL 데이터베이스를 설명하시오.', a: '비정형 데이터, 유연한 스키마, MongoDB' }
      ]
    },
    {
      id: 'network',
      name: '네트워크/통신',
      icon: '🌐',
      questions: [
        { id: 1, q: '네트워크의 유형을 설명하시오.', a: 'LAN, WAN, MAN, 인터넷, 인트라넷' },
        { id: 2, q: 'TCP/IP 프로토콜을 설명하시오.', a: '인터넷 통신 규약, 데이터 전송 표준' },
        { id: 3, q: 'IP 주소와 도메인을 설명하시오.', a: 'IP: 숫자 주소, 도메인: 문자 주소' },
        { id: 4, q: '웹브라우저의 기능을 설명하시오.', a: '웹페이지 표시, 북마크, 다운로드' },
        { id: 5, q: '이메일 프로토콜을 설명하시오.', a: 'SMTP(발신), POP3/IMAP(수신)' },
        { id: 6, q: 'VPN의 역할을 설명하시오.', a: '가상 사설망, 암호화 통신, 원격접속' },
        { id: 7, q: '클라우드 서비스를 설명하시오.', a: 'IaaS, PaaS, SaaS, 원격 컴퓨팅' },
        { id: 8, q: '무선네트워크(WiFi)를 설명하시오.', a: '무선LAN, AP, SSID, 보안' },
        { id: 9, q: '방화벽의 기능을 설명하시오.', a: '네트워크 접근 제어, 외부 침입 차단' },
        { id: 10, q: '네트워크 보안 위협을 설명하시오.', a: '해킹, 악성코드, 피싱, DDoS' }
      ]
    },
    {
      id: 'it-security',
      name: '정보보안',
      icon: '🔒',
      questions: [
        { id: 1, q: '정보보안의 목표를 설명하시오.', a: '기밀성, 무결성, 가용성 확보' },
        { id: 2, q: '악성코드 종류를 설명하시오.', a: '바이러스, 웜, 트로이목마, 랜섬웨어' },
        { id: 3, q: '비밀번호 관리 원칙을 설명하시오.', a: '복잡성, 주기적 변경, 재사용 금지' },
        { id: 4, q: '암호화의 종류를 설명하시오.', a: '대칭키, 비대칭키, 해시' },
        { id: 5, q: '백신 프로그램을 설명하시오.', a: '악성코드 탐지/제거, 실시간 감시' },
        { id: 6, q: '피싱 공격을 설명하시오.', a: '가짜 사이트로 개인정보 탈취' },
        { id: 7, q: 'SSL/TLS를 설명하시오.', a: 'HTTPS, 통신 암호화, 인증서' },
        { id: 8, q: '2단계 인증을 설명하시오.', a: '비밀번호 + OTP/생체인증' },
        { id: 9, q: '보안 정책 수립을 설명하시오.', a: '접근 권한, 백업, 사고 대응 절차' },
        { id: 10, q: '정보보안 교육의 중요성을 설명하시오.', a: '보안 인식 제고, 사고 예방' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-1-info-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-1-info-progress', JSON.stringify(updated));
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
    const prompt = `비서 1급 - 사무정보관리론 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-1" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            ← 비서 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💻 사무정보관리론</h1>
          <p className="text-gray-600 mb-4">OA시스템, 정보관리, 데이터베이스</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all"
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
                            isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-rose-300'
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
                                className="mt-2 text-sm text-rose-600 hover:text-rose-800 flex items-center gap-1"
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
