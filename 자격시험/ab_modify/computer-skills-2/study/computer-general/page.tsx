'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComputerGeneralStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'hardware',
      name: '컴퓨터 하드웨어',
      icon: '🖥️',
      questions: [
        { id: 1, q: 'CPU의 구성 요소와 기능을 설명하시오.', a: '제어장치(명령 해석), 연산장치(ALU), 레지스터(임시 저장)' },
        { id: 2, q: 'RAM과 ROM의 차이점을 설명하시오.', a: 'RAM: 휘발성, 읽기/쓰기 가능 / ROM: 비휘발성, 읽기 전용' },
        { id: 3, q: '캐시 메모리의 역할을 설명하시오.', a: 'CPU와 주기억장치 속도 차이 해소, 자주 사용 데이터 저장' },
        { id: 4, q: 'SSD와 HDD의 차이점을 설명하시오.', a: 'SSD: 플래시 메모리, 빠름, 충격 강함 / HDD: 자기 디스크, 저렴, 대용량' },
        { id: 5, q: 'USB 규격별 전송 속도를 설명하시오.', a: 'USB 2.0: 480Mbps, USB 3.0: 5Gbps, USB 3.1: 10Gbps' },
        { id: 6, q: 'GPU의 역할을 설명하시오.', a: '그래픽 처리 전담, 3D 렌더링, 동영상 인코딩/디코딩' },
        { id: 7, q: '메인보드의 구성 요소를 설명하시오.', a: 'CPU 소켓, 메모리 슬롯, 확장 슬롯, 칩셋, BIOS' },
        { id: 8, q: '입력 장치의 종류를 설명하시오.', a: '키보드, 마우스, 스캐너, 마이크, 웹캠, 터치스크린' },
        { id: 9, q: '출력 장치의 종류를 설명하시오.', a: '모니터, 프린터, 스피커, 플로터, 빔프로젝터' },
        { id: 10, q: '전원 공급 장치(PSU)의 역할을 설명하시오.', a: 'AC를 DC로 변환, 각 부품에 적정 전압 공급' }
      ]
    },
    {
      id: 'os',
      name: '운영체제',
      icon: '⚙️',
      questions: [
        { id: 1, q: '운영체제의 주요 기능을 설명하시오.', a: '프로세스 관리, 메모리 관리, 파일 관리, 입출력 관리' },
        { id: 2, q: 'Windows의 시스템 요구 사항을 설명하시오.', a: 'Windows 11: 1GHz 이상 CPU, 4GB RAM, 64GB 저장공간' },
        { id: 3, q: '멀티태스킹의 개념을 설명하시오.', a: '여러 프로그램을 동시에 실행하는 것처럼 보이게 하는 기능' },
        { id: 4, q: '가상 메모리의 개념을 설명하시오.', a: '하드디스크 일부를 RAM처럼 사용, 물리적 메모리 한계 극복' },
        { id: 5, q: '파일 시스템의 종류를 설명하시오.', a: 'NTFS(Windows), ext4(Linux), APFS(Mac), FAT32(호환용)' },
        { id: 6, q: '레지스트리의 역할을 설명하시오.', a: 'Windows 설정 정보 저장 데이터베이스, 시스템/사용자 설정' },
        { id: 7, q: '장치 드라이버의 역할을 설명하시오.', a: '하드웨어와 운영체제 간 통신 담당, 장치 제어' },
        { id: 8, q: '부팅 과정을 설명하시오.', a: 'POST → BIOS → 부트로더 → 운영체제 로드' },
        { id: 9, q: '바탕화면 구성 요소를 설명하시오.', a: '아이콘, 작업표시줄, 시작 메뉴, 시스템 트레이' },
        { id: 10, q: '제어판의 주요 기능을 설명하시오.', a: '시스템 설정, 프로그램 관리, 장치 관리, 사용자 계정 관리' }
      ]
    },
    {
      id: 'network',
      name: '네트워크',
      icon: '🌐',
      questions: [
        { id: 1, q: 'IP 주소의 개념을 설명하시오.', a: '네트워크에서 장치를 식별하는 고유 주소, IPv4/IPv6' },
        { id: 2, q: 'DNS의 역할을 설명하시오.', a: '도메인 이름을 IP 주소로 변환하는 서비스' },
        { id: 3, q: 'LAN과 WAN의 차이를 설명하시오.', a: 'LAN: 근거리 통신망 / WAN: 광역 통신망(인터넷)' },
        { id: 4, q: '프로토콜의 개념을 설명하시오.', a: '통신 규약, 데이터 전송 규칙 (TCP/IP, HTTP 등)' },
        { id: 5, q: 'Wi-Fi 규격을 설명하시오.', a: '802.11n(WiFi 4), 802.11ac(WiFi 5), 802.11ax(WiFi 6)' },
        { id: 6, q: '라우터의 역할을 설명하시오.', a: '네트워크 간 데이터 전달, IP 주소 할당(DHCP)' },
        { id: 7, q: '서브넷 마스크의 역할을 설명하시오.', a: '네트워크 부분과 호스트 부분을 구분하는 역할' },
        { id: 8, q: 'MAC 주소의 개념을 설명하시오.', a: '네트워크 카드의 고유 물리적 주소, 48비트' },
        { id: 9, q: 'HTTP와 HTTPS의 차이를 설명하시오.', a: 'HTTPS는 SSL/TLS 암호화 적용, 보안 강화' },
        { id: 10, q: 'VPN의 개념을 설명하시오.', a: '가상 사설망, 공용 네트워크에서 암호화된 통신' }
      ]
    },
    {
      id: 'security',
      name: '정보 보안',
      icon: '🔒',
      questions: [
        { id: 1, q: '악성 소프트웨어의 종류를 설명하시오.', a: '바이러스, 웜, 트로이목마, 랜섬웨어, 스파이웨어' },
        { id: 2, q: '방화벽의 역할을 설명하시오.', a: '네트워크 트래픽 감시, 비인가 접근 차단' },
        { id: 3, q: '피싱의 개념과 예방법을 설명하시오.', a: '가짜 사이트로 유도해 정보 탈취, URL 확인 필수' },
        { id: 4, q: '암호화의 개념을 설명하시오.', a: '데이터를 암호문으로 변환, 대칭키/비대칭키 방식' },
        { id: 5, q: '백업의 중요성과 방법을 설명하시오.', a: '데이터 손실 대비, 전체/증분/차등 백업' },
        { id: 6, q: '비밀번호 관리 원칙을 설명하시오.', a: '8자 이상, 대소문자+숫자+특수문자 조합, 주기적 변경' },
        { id: 7, q: '소셜 엔지니어링을 설명하시오.', a: '사람의 심리를 이용한 해킹, 사칭/협박 등' },
        { id: 8, q: '보안 업데이트의 중요성을 설명하시오.', a: '취약점 패치, 새로운 위협 대응, 자동 업데이트 권장' },
        { id: 9, q: '개인정보 보호 원칙을 설명하시오.', a: '수집 최소화, 목적 명시, 안전한 보관, 파기 원칙' },
        { id: 10, q: '인증서의 역할을 설명하시오.', a: '신원 확인, 암호화 통신, 공인인증서/공동인증서' }
      ]
    },
    {
      id: 'software',
      name: '소프트웨어',
      icon: '💿',
      questions: [
        { id: 1, q: '시스템 소프트웨어와 응용 소프트웨어를 구분하시오.', a: '시스템: OS, 드라이버 / 응용: 워드, 엑셀, 게임' },
        { id: 2, q: '오픈소스 소프트웨어를 설명하시오.', a: '소스 코드 공개, 무료 사용/수정/배포 가능' },
        { id: 3, q: '소프트웨어 설치 방법을 설명하시오.', a: '다운로드 후 실행, 패키지 관리자 사용, 압축 해제' },
        { id: 4, q: '프리웨어와 셰어웨어를 구분하시오.', a: '프리웨어: 완전 무료 / 셰어웨어: 일정 기간 무료' },
        { id: 5, q: '파일 압축의 원리를 설명하시오.', a: '중복 데이터 제거, ZIP/RAR 형식, 손실/비손실 압축' },
        { id: 6, q: 'PDF 파일의 특징을 설명하시오.', a: '문서 레이아웃 고정, 플랫폼 독립적, Adobe 개발' },
        { id: 7, q: '클라우드 서비스의 종류를 설명하시오.', a: 'IaaS(인프라), PaaS(플랫폼), SaaS(소프트웨어)' },
        { id: 8, q: '웹 브라우저의 기능을 설명하시오.', a: '웹페이지 표시, 북마크, 다운로드, 확장 프로그램' },
        { id: 9, q: '유틸리티 프로그램의 종류를 설명하시오.', a: '백신, 디스크 정리, 시스템 모니터링, 파일 관리자' },
        { id: 10, q: '라이선스의 종류를 설명하시오.', a: 'GPL, MIT, Apache, 상용 라이선스 등' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-2-computer-general-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('computer-skills-2-computer-general-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `컴퓨터활용능력 2급 컴퓨터 일반 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명
3. 실제 예시
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/computer-skills-2" className="text-gray-600 hover:text-violet-600">컴활 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">컴퓨터 일반</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🖥️</span></div>
              <div>
                <h1 className="text-2xl font-bold">컴퓨터 일반</h1>
                <p className="text-violet-200">컴퓨터활용능력 2급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-violet-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                  className="w-full p-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/computer-skills-2" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">← 메인으로</Link>
          <Link href="/category/office/computer-skills-2/study/spreadsheet" className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">스프레드시트 일반 →</Link>
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
