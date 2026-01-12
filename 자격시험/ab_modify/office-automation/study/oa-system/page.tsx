'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OASystemStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'oa-concept',
      name: 'OA 시스템 개요',
      icon: '🏢',
      questions: [
        { id: 1, q: '사무자동화(OA)의 정의와 목적을 설명하시오.', a: '사무 업무의 생산성 향상을 위해 정보기술을 활용하는 시스템' },
        { id: 2, q: 'OA 시스템의 구성 요소를 설명하시오.', a: '하드웨어, 소프트웨어, 네트워크, 데이터베이스, 사용자' },
        { id: 3, q: 'OA 시스템 도입 효과를 설명하시오.', a: '업무 효율성 향상, 비용 절감, 의사결정 신속화' },
        { id: 4, q: '전자문서시스템(EDMS)을 설명하시오.', a: '문서의 생성, 저장, 검색, 배포를 전자적으로 관리하는 시스템' },
        { id: 5, q: '그룹웨어의 개념과 기능을 설명하시오.', a: '협업 지원 소프트웨어, 전자메일/일정관리/전자결재 등' },
        { id: 6, q: 'ERP 시스템의 개념을 설명하시오.', a: '전사적 자원관리, 기업 내 모든 자원을 통합 관리' },
        { id: 7, q: 'CRM 시스템의 개념을 설명하시오.', a: '고객관계관리, 고객 정보 수집/분석/활용 시스템' },
        { id: 8, q: 'SCM 시스템의 개념을 설명하시오.', a: '공급망관리, 원자재 조달부터 고객 배송까지 관리' },
        { id: 9, q: 'KMS(지식관리시스템)를 설명하시오.', a: '조직 내 지식의 생성, 저장, 공유, 활용을 지원하는 시스템' },
        { id: 10, q: '워크플로우 시스템을 설명하시오.', a: '업무 프로세스의 자동화 및 관리 시스템' }
      ]
    },
    {
      id: 'hardware',
      name: '하드웨어',
      icon: '🖥️',
      questions: [
        { id: 1, q: 'CPU의 구조와 동작 원리를 설명하시오.', a: '제어장치, 연산장치, 레지스터로 구성, 명령어 인출-해독-실행' },
        { id: 2, q: '주기억장치의 종류와 특성을 설명하시오.', a: 'RAM(휘발성), ROM(비휘발성), 속도 빠름, 용량 제한' },
        { id: 3, q: '보조기억장치의 종류를 설명하시오.', a: 'HDD, SSD, USB, CD/DVD, 대용량, 비휘발성' },
        { id: 4, q: '입력장치의 종류와 특성을 설명하시오.', a: '키보드, 마우스, 스캐너, 바코드리더, 터치스크린' },
        { id: 5, q: '출력장치의 종류와 특성을 설명하시오.', a: '모니터, 프린터, 플로터, 스피커, 빔프로젝터' },
        { id: 6, q: '프린터의 종류와 특성을 비교하시오.', a: '잉크젯(컬러), 레이저(고속), 도트매트릭스(복사지)' },
        { id: 7, q: '서버의 종류를 설명하시오.', a: '파일서버, 웹서버, 메일서버, DB서버, 프린트서버' },
        { id: 8, q: 'UPS(무정전전원장치)의 역할을 설명하시오.', a: '정전 시 전력 공급, 전압 안정화, 데이터 보호' },
        { id: 9, q: 'NAS와 SAN의 차이를 설명하시오.', a: 'NAS: 파일 단위 공유, SAN: 블록 단위, 고속 전용망' },
        { id: 10, q: '가상화 기술을 설명하시오.', a: '물리적 자원을 논리적으로 분할, VM, 서버 통합' }
      ]
    },
    {
      id: 'software',
      name: '소프트웨어',
      icon: '💿',
      questions: [
        { id: 1, q: '운영체제의 기능을 설명하시오.', a: '프로세스/메모리/파일/입출력 관리, 사용자 인터페이스' },
        { id: 2, q: 'Windows의 특징을 설명하시오.', a: 'GUI, 멀티태스킹, 플러그앤플레이, 광범위한 호환성' },
        { id: 3, q: 'Linux의 특징을 설명하시오.', a: '오픈소스, 안정성, 다양한 배포판, 서버용 최적화' },
        { id: 4, q: '스프레드시트 프로그램의 기능을 설명하시오.', a: '수식/함수, 차트, 데이터 분석, 매크로, 피벗테이블' },
        { id: 5, q: '데이터베이스 관리 시스템(DBMS)을 설명하시오.', a: '데이터 저장/관리/검색, 동시성 제어, 보안, 백업' },
        { id: 6, q: '프레젠테이션 프로그램의 기능을 설명하시오.', a: '슬라이드 작성, 애니메이션, 전환효과, 발표 모드' },
        { id: 7, q: '워드프로세서의 기능을 설명하시오.', a: '문서 편집, 서식 지정, 표/그림 삽입, 인쇄' },
        { id: 8, q: '백신 프로그램의 기능을 설명하시오.', a: '바이러스 탐지/제거, 실시간 감시, 방화벽 기능' },
        { id: 9, q: '유틸리티 프로그램의 종류를 설명하시오.', a: '디스크 정리, 백업, 압축, 시스템 모니터링' },
        { id: 10, q: 'SaaS, PaaS, IaaS를 비교하시오.', a: 'SaaS: 소프트웨어, PaaS: 플랫폼, IaaS: 인프라 서비스' }
      ]
    },
    {
      id: 'system-build',
      name: '시스템 구축/운영',
      icon: '🔧',
      questions: [
        { id: 1, q: '시스템 개발 생명주기(SDLC)를 설명하시오.', a: '계획-분석-설계-구현-테스트-유지보수' },
        { id: 2, q: '폭포수 모델의 특징을 설명하시오.', a: '순차적 진행, 단계별 산출물, 대규모 프로젝트 적합' },
        { id: 3, q: '프로토타이핑 모델을 설명하시오.', a: '시제품 개발 후 피드백 반영, 사용자 참여 증가' },
        { id: 4, q: '애자일 방법론의 특징을 설명하시오.', a: '반복적 개발, 변화 대응, 고객 협력, 짧은 주기' },
        { id: 5, q: '요구사항 분석 방법을 설명하시오.', a: '인터뷰, 설문, 관찰, 문서분석, 프로토타입' },
        { id: 6, q: '시스템 테스트의 종류를 설명하시오.', a: '단위/통합/시스템/인수 테스트' },
        { id: 7, q: '시스템 유지보수의 유형을 설명하시오.', a: '수정/적응/완전/예방 유지보수' },
        { id: 8, q: '백업 전략의 종류를 설명하시오.', a: '전체/증분/차등 백업, 3-2-1 백업 규칙' },
        { id: 9, q: '재해복구 계획(DRP)을 설명하시오.', a: '재해 대비 시스템 복구 계획, RTO/RPO 설정' },
        { id: 10, q: '시스템 성능 평가 지표를 설명하시오.', a: '처리량, 응답시간, 자원 사용률, 가용성' }
      ]
    },
    {
      id: 'security',
      name: '보안/관리',
      icon: '🔒',
      questions: [
        { id: 1, q: '정보보안의 3요소(CIA)를 설명하시오.', a: '기밀성, 무결성, 가용성' },
        { id: 2, q: '접근 통제 방식을 설명하시오.', a: 'DAC(임의적), MAC(강제적), RBAC(역할 기반)' },
        { id: 3, q: '암호화 기법의 종류를 설명하시오.', a: '대칭키(AES), 비대칭키(RSA), 해시(SHA)' },
        { id: 4, q: '방화벽의 기능을 설명하시오.', a: '패킷 필터링, 프록시, 상태 검사, 침입 차단' },
        { id: 5, q: 'VPN의 개념과 유형을 설명하시오.', a: '가상 사설망, SSL VPN, IPsec VPN' },
        { id: 6, q: '악성코드의 종류를 설명하시오.', a: '바이러스, 웜, 트로이목마, 랜섬웨어, 스파이웨어' },
        { id: 7, q: '개인정보 보호법의 주요 내용을 설명하시오.', a: '수집 동의, 목적 외 이용 금지, 안전조치 의무' },
        { id: 8, q: '정보보안 정책 수립 방법을 설명하시오.', a: '위험분석-정책수립-구현-교육-감사' },
        { id: 9, q: '침입탐지시스템(IDS)를 설명하시오.', a: '네트워크/호스트 기반, 오용/이상 탐지' },
        { id: 10, q: 'ISO 27001의 개요를 설명하시오.', a: '정보보안 관리체계 국제표준, ISMS 인증' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('oa-system-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('oa-system-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `사무자동화산업기사 사무자동화시스템 과목 문제입니다.

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
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-blue-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">사무자동화시스템</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🖥️</span></div>
              <div>
                <h1 className="text-2xl font-bold">사무자동화시스템</h1>
                <p className="text-blue-200">사무자동화산업기사 필기</p>
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
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/office-automation" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">← 메인으로</Link>
          <Link href="/category/office/office-automation/study/office-management" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition">사무경영관리개론 →</Link>
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
