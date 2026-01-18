'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InfoCommStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'comm-theory',
      name: '통신이론',
      icon: '📡',
      questions: [
        { id: 1, q: '데이터 통신의 정의와 구성요소를 설명하시오.', a: '전자적 데이터 교환, 송신기/전송매체/수신기' },
        { id: 2, q: '전송 방식의 종류를 설명하시오.', a: '단방향/반이중/전이중, 직렬/병렬 전송' },
        { id: 3, q: '아날로그와 디지털 신호를 비교하시오.', a: '아날로그: 연속적 파형, 디지털: 0과 1 이산값' },
        { id: 4, q: '변조의 종류를 설명하시오.', a: 'AM(진폭), FM(주파수), PM(위상), PCM(펄스코드)' },
        { id: 5, q: '다중화 기술을 설명하시오.', a: 'FDM(주파수), TDM(시간), CDM(코드), WDM(파장)' },
        { id: 6, q: '전송 매체의 종류를 설명하시오.', a: '동축케이블, UTP, 광섬유, 무선(전파/적외선)' },
        { id: 7, q: '오류 검출 방식을 설명하시오.', a: '패리티 비트, CRC, 체크섬, 해밍 코드' },
        { id: 8, q: '오류 정정 방식을 설명하시오.', a: '후진 오류 정정(ARQ), 전진 오류 정정(FEC)' },
        { id: 9, q: '대역폭과 전송률의 관계를 설명하시오.', a: '대역폭↑ = 전송률↑, bps 단위 측정' },
        { id: 10, q: '전송 지연의 종류를 설명하시오.', a: '전파 지연, 전송 지연, 처리 지연, 큐잉 지연' }
      ]
    },
    {
      id: 'network',
      name: '네트워크',
      icon: '🌐',
      questions: [
        { id: 1, q: '네트워크 토폴로지를 설명하시오.', a: '버스, 스타, 링, 메시, 트리 구조' },
        { id: 2, q: 'LAN/MAN/WAN을 비교하시오.', a: 'LAN: 근거리, MAN: 도시권, WAN: 광역' },
        { id: 3, q: '이더넷의 특징을 설명하시오.', a: 'CSMA/CD, 10/100/1000Mbps, IEEE 802.3' },
        { id: 4, q: '스위치와 라우터를 비교하시오.', a: '스위치: 2계층/MAC, 라우터: 3계층/IP' },
        { id: 5, q: 'IP 주소 체계를 설명하시오.', a: 'IPv4: 32비트, A/B/C/D/E 클래스, 서브넷' },
        { id: 6, q: 'MAC 주소의 특성을 설명하시오.', a: '48비트 물리 주소, NIC 고유 식별자' },
        { id: 7, q: '서브넷 마스크를 설명하시오.', a: '네트워크/호스트 부분 구분, AND 연산' },
        { id: 8, q: 'DHCP의 역할을 설명하시오.', a: 'IP 주소 자동 할당, 임대 방식' },
        { id: 9, q: 'DNS의 동작 원리를 설명하시오.', a: '도메인→IP 변환, 계층적 네임서버' },
        { id: 10, q: 'NAT의 개념을 설명하시오.', a: '사설IP↔공인IP 변환, IP 주소 절약' }
      ]
    },
    {
      id: 'protocol',
      name: '프로토콜',
      icon: '📋',
      questions: [
        { id: 1, q: 'OSI 7계층을 설명하시오.', a: '물리-데이터링크-네트워크-전송-세션-표현-응용' },
        { id: 2, q: 'TCP와 UDP를 비교하시오.', a: 'TCP: 연결형/신뢰성, UDP: 비연결형/빠름' },
        { id: 3, q: 'TCP 3-way handshake를 설명하시오.', a: 'SYN → SYN+ACK → ACK 연결 설정' },
        { id: 4, q: 'HTTP의 특징을 설명하시오.', a: '웹 통신 프로토콜, 무상태성, 80포트' },
        { id: 5, q: 'HTTPS의 보안 방식을 설명하시오.', a: 'SSL/TLS 암호화, 443포트, 인증서' },
        { id: 6, q: 'FTP의 동작 방식을 설명하시오.', a: '파일 전송, 21(제어)/20(데이터)포트' },
        { id: 7, q: 'SMTP/POP3/IMAP을 비교하시오.', a: 'SMTP: 송신, POP3: 수신/다운로드, IMAP: 동기화' },
        { id: 8, q: 'SNMP의 역할을 설명하시오.', a: '네트워크 장비 모니터링/관리 프로토콜' },
        { id: 9, q: 'ARP와 RARP를 설명하시오.', a: 'ARP: IP→MAC, RARP: MAC→IP 변환' },
        { id: 10, q: 'ICMP의 용도를 설명하시오.', a: '네트워크 오류 보고, ping 명령어' }
      ]
    },
    {
      id: 'internet',
      name: '인터넷',
      icon: '🔗',
      questions: [
        { id: 1, q: '인터넷의 개념과 특성을 설명하시오.', a: '전 세계 컴퓨터 네트워크, TCP/IP 기반' },
        { id: 2, q: 'WWW의 구성 요소를 설명하시오.', a: 'URL, HTTP, HTML, 웹브라우저/서버' },
        { id: 3, q: 'URL의 구조를 설명하시오.', a: '프로토콜://도메인:포트/경로?쿼리' },
        { id: 4, q: 'HTML/CSS/JavaScript를 설명하시오.', a: 'HTML: 구조, CSS: 스타일, JS: 동작' },
        { id: 5, q: '클라우드 컴퓨팅의 서비스 모델을 설명하시오.', a: 'IaaS, PaaS, SaaS' },
        { id: 6, q: 'IoT의 개념을 설명하시오.', a: '사물인터넷, 센서/네트워크/플랫폼' },
        { id: 7, q: '전자상거래의 유형을 설명하시오.', a: 'B2B, B2C, C2C, G2C 등' },
        { id: 8, q: '검색 엔진의 동작 원리를 설명하시오.', a: '크롤링→인덱싱→랭킹→검색 결과' },
        { id: 9, q: '웹 2.0의 특징을 설명하시오.', a: '사용자 참여, SNS, 플랫폼화, 개방성' },
        { id: 10, q: '모바일 통신 세대별 특징을 설명하시오.', a: '3G(WCDMA), 4G(LTE), 5G(초고속/저지연)' }
      ]
    },
    {
      id: 'security',
      name: '정보보안',
      icon: '🔒',
      questions: [
        { id: 1, q: '정보보안의 3대 목표를 설명하시오.', a: '기밀성(비밀유지), 무결성(변조방지), 가용성(접근보장)' },
        { id: 2, q: '대칭키 암호화를 설명하시오.', a: '같은 키로 암/복호화, AES/DES, 키 배포 문제' },
        { id: 3, q: '비대칭키 암호화를 설명하시오.', a: '공개키/개인키 쌍, RSA, 전자서명 가능' },
        { id: 4, q: '해시 함수를 설명하시오.', a: '고정 길이 출력, 단방향, 무결성 검증' },
        { id: 5, q: '전자서명의 원리를 설명하시오.', a: '개인키로 서명, 공개키로 검증, 부인방지' },
        { id: 6, q: '방화벽의 유형을 설명하시오.', a: '패킷 필터링, 상태검사, 프록시, 차세대' },
        { id: 7, q: 'VPN의 종류를 설명하시오.', a: 'IPsec VPN, SSL VPN, 터널링/암호화' },
        { id: 8, q: '악성코드의 유형을 설명하시오.', a: '바이러스, 웜, 트로이목마, 랜섬웨어' },
        { id: 9, q: 'DDoS 공격을 설명하시오.', a: '분산 서비스 거부, 좀비PC 동원, 트래픽 폭주' },
        { id: 10, q: '사회공학 공격을 설명하시오.', a: '심리적 취약점 이용, 피싱, 스피어피싱' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('oa-info-comm-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('oa-info-comm-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `사무자동화산업기사 정보통신개론 과목 문제입니다.

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-cyan-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">정보통신개론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🌐</span></div>
              <div>
                <h1 className="text-2xl font-bold">정보통신개론</h1>
                <p className="text-cyan-200">사무자동화산업기사 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-cyan-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                  className="w-full p-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/office-automation/study/programming" className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">← 프로그래밍 일반</Link>
          <Link href="/category/office/office-automation/study/practical" className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition">사무자동화 실무 →</Link>
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
