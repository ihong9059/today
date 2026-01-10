'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'system-practical',
    name: '시스템 보안 실무',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'Linux에서 특정 사용자의 로그인 기록을 확인하는 명령어를 쓰시오.', answer: 'last [username] 또는 lastlog | grep [username]', prompt: `정보보안기사 실기 문제입니다.\n\n문제: Linux에서 특정 사용자의 로그인 기록을 확인하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 명령어 문법\n2. 옵션 설명\n3. 실행 예시\n4. 관련 파일\n5. 연습문제 3개` },
      { id: 2, question: 'Windows에서 로컬 보안 정책을 설정하는 방법을 설명하시오.', answer: 'secpol.msc 실행 또는 gpedit.msc에서 보안 설정', prompt: `정보보안기사 실기 문제입니다.\n\n문제: Windows에서 로컬 보안 정책을 설정하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접근 방법\n2. 주요 설정 항목\n3. 권장 설정\n4. 확인 방법\n5. 연습문제 3개` },
      { id: 3, question: 'chmod 755 file.sh의 의미를 설명하시오.', answer: '소유자(rwx=7), 그룹(r-x=5), 기타(r-x=5) 권한 설정', prompt: `정보보안기사 실기 문제입니다.\n\n문제: chmod 755 file.sh의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. chmod 명령어 문법\n2. 숫자 권한 계산\n3. 755의 의미\n4. 보안 관점 해석\n5. 연습문제 3개` },
      { id: 4, question: 'SetUID가 설정된 파일을 찾는 명령어를 쓰시오.', answer: 'find / -perm -4000 -type f 2>/dev/null', prompt: `정보보안기사 실기 문제입니다.\n\n문제: SetUID가 설정된 파일을 찾는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. find 명령어 문법\n2. -perm 옵션 설명\n3. SetUID 비트(4000)\n4. 보안 점검 목적\n5. 연습문제 3개` },
      { id: 5, question: 'crontab을 이용한 악성 스케줄 작업 점검 방법을 설명하시오.', answer: 'crontab -l, /var/spool/cron/, /etc/cron.* 디렉토리 점검', prompt: `정보보안기사 실기 문제입니다.\n\n문제: crontab을 이용한 악성 스케줄 작업 점검 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. crontab 점검 방법\n2. 관련 파일 위치\n3. 의심스러운 항목 식별\n4. 삭제 방법\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'network-practical',
    name: '네트워크 보안 실무',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'iptables를 이용하여 특정 IP를 차단하는 명령어를 쓰시오.', answer: 'iptables -A INPUT -s [IP주소] -j DROP', prompt: `정보보안기사 실기 문제입니다.\n\n문제: iptables를 이용하여 특정 IP를 차단하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. iptables 문법\n2. 옵션 설명\n3. 실행 예시\n4. 영구 저장 방법\n5. 연습문제 3개` },
      { id: 2, question: 'netstat 명령어로 ESTABLISHED 연결만 확인하는 방법을 쓰시오.', answer: 'netstat -an | grep ESTABLISHED', prompt: `정보보안기사 실기 문제입니다.\n\n문제: netstat 명령어로 ESTABLISHED 연결만 확인하는 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. netstat 옵션 설명\n2. 연결 상태 종류\n3. 의심스러운 연결 식별\n4. ss 명령어 대안\n5. 연습문제 3개` },
      { id: 3, question: 'tcpdump로 특정 포트의 패킷을 캡처하는 명령어를 쓰시오.', answer: 'tcpdump -i eth0 port 80 -w capture.pcap', prompt: `정보보안기사 실기 문제입니다.\n\n문제: tcpdump로 특정 포트의 패킷을 캡처하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. tcpdump 문법\n2. 주요 옵션\n3. 필터 표현식\n4. 파일 저장 및 분석\n5. 연습문제 3개` },
      { id: 4, question: 'nmap을 이용한 포트 스캔 명령어를 쓰시오.', answer: 'nmap -sS -p 1-65535 [대상IP]', prompt: `정보보안기사 실기 문제입니다.\n\n문제: nmap을 이용한 포트 스캔 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. nmap 스캔 유형\n2. 주요 옵션\n3. 결과 해석\n4. 탐지 우회 기법\n5. 연습문제 3개` },
      { id: 5, question: 'ARP 테이블을 확인하고 정적 엔트리를 추가하는 방법을 쓰시오.', answer: 'arp -a (확인), arp -s [IP] [MAC] (추가)', prompt: `정보보안기사 실기 문제입니다.\n\n문제: ARP 테이블을 확인하고 정적 엔트리를 추가하는 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. arp 명령어 문법\n2. ARP 스푸핑 방어\n3. 정적 엔트리 장단점\n4. 자동화 방법\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'web-practical',
    name: '웹 보안 실무',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: 'SQL Injection 취약점 테스트 페이로드를 3개 쓰시오.', answer: "' OR '1'='1, ' UNION SELECT null--, ' AND 1=1--", prompt: `정보보안기사 실기 문제입니다.\n\n문제: SQL Injection 취약점 테스트 페이로드를 3개 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 페이로드 원리\n2. 테스트 방법\n3. 취약점 확인\n4. 대응 방안\n5. 연습문제 3개` },
      { id: 2, question: 'XSS 취약점 테스트 페이로드를 3개 쓰시오.', answer: '<script>alert(1)</script>, <img src=x onerror=alert(1)>, javascript:alert(1)', prompt: `정보보안기사 실기 문제입니다.\n\n문제: XSS 취약점 테스트 페이로드를 3개 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 페이로드 원리\n2. Stored/Reflected 구분\n3. WAF 우회 기법\n4. 대응 방안\n5. 연습문제 3개` },
      { id: 3, question: 'HTTP 응답 헤더에서 보안 관련 헤더를 5개 쓰시오.', answer: 'X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, CSP, Strict-Transport-Security', prompt: `정보보안기사 실기 문제입니다.\n\n문제: HTTP 응답 헤더에서 보안 관련 헤더를 5개 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 헤더 역할\n2. 권장 설정값\n3. 설정 방법\n4. 검증 방법\n5. 연습문제 3개` },
      { id: 4, question: 'robots.txt의 보안적 의미와 점검 포인트를 설명하시오.', answer: '민감 경로 노출 위험, Disallow 항목이 공격 대상이 될 수 있음', prompt: `정보보안기사 실기 문제입니다.\n\n문제: robots.txt의 보안적 의미와 점검 포인트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. robots.txt 역할\n2. 보안 취약점\n3. 점검 방법\n4. 권장 설정\n5. 연습문제 3개` },
      { id: 5, question: 'OWASP ZAP을 이용한 취약점 스캔 절차를 설명하시오.', answer: '대상 설정 → Spider → Active Scan → 결과 분석 → 보고서', prompt: `정보보안기사 실기 문제입니다.\n\n문제: OWASP ZAP을 이용한 취약점 스캔 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ZAP 설정\n2. 스캔 유형\n3. 결과 해석\n4. False Positive 처리\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'crypto-practical',
    name: '암호 및 인증 실무',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: 'OpenSSL로 파일을 AES-256으로 암호화하는 명령어를 쓰시오.', answer: 'openssl enc -aes-256-cbc -salt -in plain.txt -out encrypted.enc', prompt: `정보보안기사 실기 문제입니다.\n\n문제: OpenSSL로 파일을 AES-256으로 암호화하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. openssl enc 문법\n2. 옵션 설명\n3. 복호화 명령어\n4. 키 관리\n5. 연습문제 3개` },
      { id: 2, question: 'SSH 키 쌍을 생성하는 명령어를 쓰시오.', answer: 'ssh-keygen -t rsa -b 4096 -C "comment"', prompt: `정보보안기사 실기 문제입니다.\n\n문제: SSH 키 쌍을 생성하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. ssh-keygen 옵션\n2. 키 종류 (RSA/Ed25519)\n3. 키 파일 위치\n4. 보안 설정\n5. 연습문제 3개` },
      { id: 3, question: '파일의 해시값(SHA-256)을 계산하는 명령어를 쓰시오.', answer: 'sha256sum filename 또는 openssl dgst -sha256 filename', prompt: `정보보안기사 실기 문제입니다.\n\n문제: 파일의 해시값(SHA-256)을 계산하는 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 해시 계산 명령어\n2. 무결성 검증\n3. 비교 방법\n4. 활용 사례\n5. 연습문제 3개` },
      { id: 4, question: 'X.509 인증서의 내용을 확인하는 OpenSSL 명령어를 쓰시오.', answer: 'openssl x509 -in cert.pem -text -noout', prompt: `정보보안기사 실기 문제입니다.\n\n문제: X.509 인증서의 내용을 확인하는 OpenSSL 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 명령어 문법\n2. 주요 확인 항목\n3. 인증서 체인 검증\n4. 만료일 확인\n5. 연습문제 3개` },
      { id: 5, question: 'CSR(인증서 서명 요청) 생성 명령어를 쓰시오.', answer: 'openssl req -new -key private.key -out request.csr', prompt: `정보보안기사 실기 문제입니다.\n\n문제: CSR(인증서 서명 요청) 생성 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. CSR 생성 절차\n2. 입력 정보\n3. 키 쌍 생성\n4. CA 제출\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'incident-practical',
    name: '보안 관제 및 사고대응',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '침해사고 대응 절차(6단계)를 순서대로 쓰시오.', answer: '준비 → 탐지/분석 → 초동대응 → 봉쇄 → 복구 → 사후관리', prompt: `정보보안기사 실기 문제입니다.\n\n문제: 침해사고 대응 절차(6단계)를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계 설명\n2. 수행 활동\n3. 산출물\n4. 주의사항\n5. 연습문제 3개` },
      { id: 2, question: '악성코드 감염 의심 시스템의 증거 수집 절차를 설명하시오.', answer: '휘발성 순서(메모리→네트워크→프로세스→파일시스템)', prompt: `정보보안기사 실기 문제입니다.\n\n문제: 악성코드 감염 의심 시스템의 증거 수집 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 휘발성 순서\n2. 수집 도구\n3. 무결성 보존\n4. 문서화\n5. 연습문제 3개` },
      { id: 3, question: 'Snort 룰 작성 예시를 쓰시오 (HTTP GET 요청 탐지).', answer: 'alert tcp any any -> any 80 (msg:"HTTP GET"; content:"GET"; sid:1000001;)', prompt: `정보보안기사 실기 문제입니다.\n\n문제: Snort 룰 작성 예시를 쓰시오 (HTTP GET 요청 탐지).\n\n다음 순서로 설명해주세요:\n1. 룰 구조\n2. 헤더 옵션\n3. 페이로드 옵션\n4. 테스트 방법\n5. 연습문제 3개` },
      { id: 4, question: 'YARA 룰의 기본 구조를 설명하시오.', answer: 'rule name { meta: strings: condition: } 구조', prompt: `정보보안기사 실기 문제입니다.\n\n문제: YARA 룰의 기본 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 룰 섹션 설명\n2. 문자열 정의\n3. 조건 작성\n4. 실행 방법\n5. 연습문제 3개` },
      { id: 5, question: 'Windows 이벤트 로그에서 로그온 실패 이벤트 ID를 쓰시오.', answer: 'Event ID 4625 (로그온 실패)', prompt: `정보보안기사 실기 문제입니다.\n\n문제: Windows 이벤트 로그에서 로그온 실패 이벤트 ID를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 주요 이벤트 ID\n2. 로그 위치\n3. 분석 도구\n4. 이상 징후 탐지\n5. 연습문제 3개` },
    ],
  },
];

export default function PracticalPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['system-practical']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('info-security-practical-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('info-security-practical-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-red-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a><span className="text-gray-300">›</span><span className="text-red-600 font-medium">실기시험</span></nav></div></header>

      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">✍️</span></div><div><h1 className="text-2xl font-bold">실기시험 문제풀이</h1><p className="text-red-100">정보보안기사 실기 - 실무 명령어, 설정, 분석</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-red-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-red-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border font-mono"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
