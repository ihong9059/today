'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Topic {
  id: string;
  name: string;
  color: string;
  questions: Question[];
}

export default function DataCommunicationPage() {
  const [activeTopic, setActiveTopic] = useState<string>('osi');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'osi',
      name: 'OSI 7계층',
      color: 'from-green-500 to-green-400',
      questions: [
        { id: 1, question: 'OSI 7계층에서 라우팅을 담당하는 계층은?', options: ['데이터링크 계층', '네트워크 계층', '전송 계층', '세션 계층'], answer: 1, explanation: '네트워크 계층(3계층)은 논리적 주소(IP)를 사용하여 경로 설정(라우팅)을 담당합니다.' },
        { id: 2, question: 'MAC 주소를 사용하는 계층은?', options: ['물리 계층', '데이터링크 계층', '네트워크 계층', '전송 계층'], answer: 1, explanation: '데이터링크 계층(2계층)은 MAC 주소를 사용하여 같은 네트워크 내에서 프레임을 전달합니다.' },
        { id: 3, question: '전송 계층의 프로토콜이 아닌 것은?', options: ['TCP', 'UDP', 'IP', 'SCTP'], answer: 2, explanation: 'IP는 네트워크 계층(3계층) 프로토콜입니다. TCP, UDP, SCTP는 전송 계층 프로토콜입니다.' },
        { id: 4, question: '응용 계층 프로토콜이 아닌 것은?', options: ['HTTP', 'FTP', 'TCP', 'SMTP'], answer: 2, explanation: 'TCP는 전송 계층 프로토콜입니다. HTTP, FTP, SMTP, DNS 등이 응용 계층 프로토콜입니다.' },
        { id: 5, question: '물리 계층에서 다루는 것은?', options: ['프레임', '패킷', '비트', '세그먼트'], answer: 2, explanation: '물리 계층(1계층)은 비트 단위로 데이터를 전기/광 신호로 변환하여 전송합니다.' },
        { id: 6, question: 'PDU(Protocol Data Unit)의 연결이 올바르지 않은 것은?', options: ['전송 계층 - 세그먼트', '네트워크 계층 - 패킷', '데이터링크 계층 - 프레임', '응용 계층 - 패킷'], answer: 3, explanation: '응용 계층의 PDU는 메시지 또는 데이터입니다. 패킷은 네트워크 계층의 PDU입니다.' },
        { id: 7, question: '세션 계층의 기능은?', options: ['비트 동기화', '경로 설정', '대화 제어 및 동기화', '데이터 압축'], answer: 2, explanation: '세션 계층(5계층)은 통신 세션의 설정, 유지, 종료와 대화 제어, 동기화를 담당합니다.' },
        { id: 8, question: '표현 계층의 기능이 아닌 것은?', options: ['데이터 암호화', '데이터 압축', '데이터 변환', '오류 검출'], answer: 3, explanation: '표현 계층(6계층)은 데이터 형식 변환, 암호화, 압축을 담당합니다. 오류 검출은 데이터링크 계층입니다.' },
        { id: 9, question: '허브(Hub)가 동작하는 계층은?', options: ['물리 계층', '데이터링크 계층', '네트워크 계층', '전송 계층'], answer: 0, explanation: '허브는 물리 계층(1계층) 장비로, 수신한 신호를 모든 포트로 브로드캐스트합니다.' },
        { id: 10, question: '스위치가 동작하는 계층은?', options: ['물리 계층', '데이터링크 계층', '네트워크 계층', '전송 계층'], answer: 1, explanation: '스위치는 데이터링크 계층(2계층) 장비로, MAC 주소를 기반으로 프레임을 전달합니다.' }
      ]
    },
    {
      id: 'tcpip',
      name: 'TCP/IP 프로토콜',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'TCP와 UDP의 차이점으로 올바른 것은?', options: ['TCP는 비연결형', 'UDP는 신뢰성 보장', 'TCP는 흐름 제어 제공', 'UDP는 3-way handshake 사용'], answer: 2, explanation: 'TCP는 연결 지향적이고 흐름 제어, 오류 제어를 제공합니다. UDP는 비연결형으로 빠르지만 신뢰성이 낮습니다.' },
        { id: 2, question: 'TCP 3-way handshake 순서로 올바른 것은?', options: ['SYN → ACK → SYN+ACK', 'SYN → SYN+ACK → ACK', 'ACK → SYN → SYN+ACK', 'SYN+ACK → SYN → ACK'], answer: 1, explanation: '클라이언트 SYN → 서버 SYN+ACK → 클라이언트 ACK 순서로 연결이 설정됩니다.' },
        { id: 3, question: 'IP 주소 192.168.1.0/24의 서브넷 마스크는?', options: ['255.255.0.0', '255.255.255.0', '255.255.255.128', '255.255.255.192'], answer: 1, explanation: '/24는 24비트가 네트워크 부분이므로 서브넷 마스크는 255.255.255.0입니다.' },
        { id: 4, question: 'ARP의 역할은?', options: ['IP 주소를 MAC 주소로 변환', 'MAC 주소를 IP 주소로 변환', 'IP 주소를 도메인으로 변환', '포트 번호 할당'], answer: 0, explanation: 'ARP(Address Resolution Protocol)는 IP 주소를 MAC 주소로 변환합니다.' },
        { id: 5, question: 'ICMP가 사용되는 명령어는?', options: ['netstat', 'ping', 'nslookup', 'tracert와 ping 모두'], answer: 3, explanation: 'ICMP는 네트워크 진단에 사용되며, ping과 tracert(traceroute) 모두 ICMP를 사용합니다.' },
        { id: 6, question: 'Well-known 포트 번호 범위는?', options: ['0-255', '0-1023', '1024-49151', '49152-65535'], answer: 1, explanation: 'Well-known 포트는 0-1023번으로, HTTP(80), HTTPS(443), FTP(21) 등이 사용합니다.' },
        { id: 7, question: 'NAT(Network Address Translation)의 주요 목적은?', options: ['암호화', '사설 IP와 공인 IP 변환', 'MAC 주소 변환', '라우팅 최적화'], answer: 1, explanation: 'NAT는 사설 IP 주소를 공인 IP 주소로 변환하여 IPv4 주소 부족 문제를 해결합니다.' },
        { id: 8, question: 'IPv6 주소의 비트 수는?', options: ['32비트', '64비트', '128비트', '256비트'], answer: 2, explanation: 'IPv6는 128비트 주소 체계로, IPv4(32비트)보다 훨씬 많은 주소를 지원합니다.' },
        { id: 9, question: 'TCP 헤더에 포함되지 않는 것은?', options: ['시퀀스 번호', 'TTL', '윈도우 크기', '체크섬'], answer: 1, explanation: 'TTL(Time To Live)은 IP 헤더에 포함됩니다. TCP 헤더에는 시퀀스 번호, 윈도우 크기, 체크섬이 있습니다.' },
        { id: 10, question: 'DHCP의 역할은?', options: ['DNS 질의', 'IP 주소 자동 할당', '라우팅 테이블 갱신', 'MAC 주소 변환'], answer: 1, explanation: 'DHCP(Dynamic Host Configuration Protocol)는 IP 주소, 서브넷 마스크, 게이트웨이 등을 자동으로 할당합니다.' }
      ]
    },
    {
      id: 'transmission',
      name: '전송 제어',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: '슬라이딩 윈도우의 목적은?', options: ['오류 검출', '흐름 제어', '경로 설정', '주소 변환'], answer: 1, explanation: '슬라이딩 윈도우는 송신측이 수신측의 처리 능력에 맞춰 데이터를 전송하는 흐름 제어 기법입니다.' },
        { id: 2, question: 'Stop-and-Wait ARQ의 단점은?', options: ['구현 복잡', '낮은 전송 효율', '오류 검출 불가', '대역폭 낭비 없음'], answer: 1, explanation: 'Stop-and-Wait은 매 프레임마다 ACK를 기다리므로 전송 효율이 낮습니다.' },
        { id: 3, question: 'Go-Back-N ARQ에서 오류 발생 시 동작은?', options: ['해당 프레임만 재전송', '오류 프레임부터 모두 재전송', '전체 처음부터 재전송', '재전송하지 않음'], answer: 1, explanation: 'Go-Back-N은 오류가 발생한 프레임부터 이후 모든 프레임을 재전송합니다.' },
        { id: 4, question: 'Selective Repeat ARQ의 장점은?', options: ['구현 간단', '오류 프레임만 재전송', '버퍼 불필요', '순서 보장 자동'], answer: 1, explanation: 'Selective Repeat은 오류가 발생한 프레임만 선택적으로 재전송하여 효율적입니다.' },
        { id: 5, question: 'TCP의 혼잡 제어 알고리즘이 아닌 것은?', options: ['Slow Start', 'Congestion Avoidance', 'Fast Retransmit', 'Stop-and-Wait'], answer: 3, explanation: 'Stop-and-Wait은 기본 ARQ 프로토콜입니다. TCP 혼잡 제어는 Slow Start, Congestion Avoidance 등을 사용합니다.' },
        { id: 6, question: 'CSMA/CD에서 CD의 의미는?', options: ['Carrier Detection', 'Collision Detection', 'Channel Division', 'Code Division'], answer: 1, explanation: 'CSMA/CD의 CD는 Collision Detection으로, 충돌을 감지하면 전송을 중단하고 재시도합니다.' },
        { id: 7, question: '피기백킹(Piggybacking)의 목적은?', options: ['오류 검출', 'ACK와 데이터를 함께 전송', '암호화', '다중화'], answer: 1, explanation: '피기백킹은 데이터 프레임에 ACK를 함께 실어 보내 전송 효율을 높이는 기법입니다.' },
        { id: 8, question: 'TCP에서 혼잡 윈도우(cwnd)가 절반으로 줄어드는 경우는?', options: ['타임아웃 발생', '3개 중복 ACK 수신', '연결 종료', '데이터 수신'], answer: 1, explanation: '3개의 중복 ACK를 받으면 혼잡 윈도우를 절반으로 줄이고 Fast Recovery를 수행합니다.' },
        { id: 9, question: 'Nagle 알고리즘의 목적은?', options: ['혼잡 제어', '작은 패킷 병합으로 효율 향상', '오류 복구', '경로 최적화'], answer: 1, explanation: 'Nagle 알고리즘은 작은 패킷들을 모아서 전송하여 네트워크 효율을 높입니다.' },
        { id: 10, question: '윈도우 크기가 7일 때 Go-Back-N에서 최대 미확인 프레임 수는?', options: ['6', '7', '8', '14'], answer: 1, explanation: 'Go-Back-N에서 윈도우 크기만큼 ACK 없이 프레임을 전송할 수 있으므로 최대 7개입니다.' }
      ]
    },
    {
      id: 'error',
      name: '오류 검출/정정',
      color: 'from-orange-500 to-orange-400',
      questions: [
        { id: 1, question: '패리티 비트의 한계는?', options: ['오류 정정 불가', '2비트 오류 검출 불가', '홀수 비트 오류만 검출', '모두 해당'], answer: 3, explanation: '패리티 비트는 홀수 개의 비트 오류만 검출 가능하고, 오류 정정은 불가능합니다.' },
        { id: 2, question: 'CRC(Cyclic Redundancy Check)의 특징은?', options: ['오류 정정 가능', '버스트 오류 검출에 효과적', '단일 비트 오류만 검출', '암호화 기능'], answer: 1, explanation: 'CRC는 연속된 비트 오류(버스트 오류)를 효과적으로 검출하지만, 오류 정정은 불가능합니다.' },
        { id: 3, question: '해밍 코드의 특징은?', options: ['오류 검출만 가능', '1비트 오류 정정 가능', '모든 오류 정정 가능', '다중 비트 오류 정정'], answer: 1, explanation: '해밍 코드는 1비트 오류를 검출하고 정정할 수 있으며, 2비트 오류는 검출만 가능합니다.' },
        { id: 4, question: '체크섬(Checksum)의 동작 방식은?', options: ['다항식 나눗셈', '데이터 합계 계산', 'XOR 연산', '암호화'], answer: 1, explanation: '체크섬은 데이터를 일정 단위로 나누어 합계를 계산하고 보수를 취하여 오류를 검출합니다.' },
        { id: 5, question: '데이터 1011을 짝수 패리티로 전송할 때 패리티 비트는?', options: ['0', '1', '10', '11'], answer: 1, explanation: '1011에서 1의 개수는 3개(홀수)이므로, 짝수 패리티를 위해 패리티 비트 1을 추가합니다.' },
        { id: 6, question: 'CRC-32의 32가 의미하는 것은?', options: ['데이터 크기', '생성 다항식 차수', '오류 검출 확률', '전송 속도'], answer: 1, explanation: 'CRC-32의 32는 생성 다항식의 차수(비트 수)를 의미합니다.' },
        { id: 7, question: 'FEC(Forward Error Correction)의 특징은?', options: ['재전송 필요', '수신측에서 오류 정정', '단순 오류 검출', 'ACK 필수'], answer: 1, explanation: 'FEC는 순방향 오류 정정으로, 수신측이 재전송 없이 오류를 정정합니다.' },
        { id: 8, question: 'ARQ(Automatic Repeat Request)의 특징은?', options: ['오류 시 재전송 요청', 'FEC 방식', '수신측 오류 정정', '재전송 불필요'], answer: 0, explanation: 'ARQ는 오류가 검출되면 송신측에 재전송을 요청하는 오류 제어 방식입니다.' },
        { id: 9, question: '블록 검사 코드(BCC)에서 수평/수직 패리티를 모두 사용하면?', options: ['1비트 오류 정정 가능', '모든 오류 검출', '암호화 가능', '압축 효과'], answer: 0, explanation: '수평과 수직 패리티를 함께 사용하면 1비트 오류의 위치를 찾아 정정할 수 있습니다.' },
        { id: 10, question: 'Reed-Solomon 코드가 주로 사용되는 분야는?', options: ['웹 통신', 'CD/DVD 저장장치', 'TCP 프로토콜', 'ARP 캐시'], answer: 1, explanation: 'Reed-Solomon 코드는 버스트 오류에 강해 CD, DVD, QR코드 등에 널리 사용됩니다.' }
      ]
    },
    {
      id: 'network',
      name: '네트워크 장비/라우팅',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: '라우터가 동작하는 OSI 계층은?', options: ['물리 계층', '데이터링크 계층', '네트워크 계층', '전송 계층'], answer: 2, explanation: '라우터는 네트워크 계층(3계층)에서 동작하며 IP 주소를 기반으로 패킷을 전달합니다.' },
        { id: 2, question: 'OSPF 프로토콜의 특징은?', options: ['거리 벡터 방식', '링크 상태 방식', 'AS 간 라우팅', '정적 라우팅'], answer: 1, explanation: 'OSPF는 링크 상태(Link State) 알고리즘을 사용하며, Dijkstra 알고리즘으로 최단 경로를 계산합니다.' },
        { id: 3, question: 'RIP 프로토콜의 단점은?', options: ['구현 복잡', '최대 홉 수 15 제한', '대역폭 소모 적음', '수렴 시간 빠름'], answer: 1, explanation: 'RIP는 거리 벡터 방식으로 최대 15홉까지만 지원하며, 수렴 시간이 느립니다.' },
        { id: 4, question: 'BGP가 사용되는 용도는?', options: ['VLAN 구성', 'AS 간 라우팅', '스위칭', 'MAC 주소 학습'], answer: 1, explanation: 'BGP(Border Gateway Protocol)는 자율 시스템(AS) 간의 라우팅에 사용되는 EGP입니다.' },
        { id: 5, question: '스위치의 MAC 주소 학습 방식은?', options: ['관리자 수동 입력', '송신 주소 학습', '브로드캐스트 사용', '라우팅 테이블 참조'], answer: 1, explanation: '스위치는 수신한 프레임의 송신 MAC 주소를 학습하여 MAC 주소 테이블을 구성합니다.' },
        { id: 6, question: 'VLAN의 장점이 아닌 것은?', options: ['브로드캐스트 도메인 분리', '보안 강화', '물리적 네트워크 변경 필요', '유연한 구성'], answer: 2, explanation: 'VLAN은 물리적 변경 없이 논리적으로 네트워크를 분리할 수 있어 유연합니다.' },
        { id: 7, question: '라우팅 테이블에 포함되지 않는 정보는?', options: ['목적지 네트워크', '넥스트 홉', '인터페이스', 'MAC 주소'], answer: 3, explanation: '라우팅 테이블에는 목적지 네트워크, 넥스트 홉, 메트릭, 인터페이스가 포함됩니다. MAC 주소는 ARP 테이블에 있습니다.' },
        { id: 8, question: '게이트웨이의 역할은?', options: ['동일 프로토콜 간 연결', '서로 다른 프로토콜 간 변환', 'MAC 주소 학습', '신호 증폭'], answer: 1, explanation: '게이트웨이는 서로 다른 프로토콜을 사용하는 네트워크를 연결하고 변환합니다.' },
        { id: 9, question: 'STP(Spanning Tree Protocol)의 목적은?', options: ['라우팅 최적화', '루프 방지', 'VLAN 설정', 'QoS 보장'], answer: 1, explanation: 'STP는 스위치 네트워크에서 루프를 방지하기 위해 일부 포트를 차단합니다.' },
        { id: 10, question: '로드 밸런서가 동작하는 일반적인 계층은?', options: ['2계층만', '3계층만', '4계층 또는 7계층', '1계층만'], answer: 2, explanation: '로드 밸런서는 L4(전송 계층) 또는 L7(응용 계층)에서 동작하여 트래픽을 분산합니다.' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('dc-score');
    if (saved) setScore(JSON.parse(saved));
  }, []);

  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === question.answer) {
      const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 };
      setScore(newScore);
      localStorage.setItem('dc-score', JSON.stringify(newScore));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < activeTpic.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1;
      if (nextTopicIdx < topics.length) {
        setActiveTopic(topics[nextTopicIdx].id);
        setCurrentQuestion(0);
      }
    }
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const generateAIPrompt = () => {
    const prompt = `전자계산기조직응용기사 데이터통신 과목의 "${activeTpic.name}" 주제에서 다음 문제에 대해 자세히 설명해주세요:

문제: ${question.question}

선택지:
${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

정답: ${question.options[question.answer]}

이 문제와 관련된 핵심 개념, 프로토콜 동작 원리, 그리고 관련 문제 유형에 대해 설명해주세요.`;
    setAiPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-cyan-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">데이터통신</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🌐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">데이터통신</h1>
              <p className="text-cyan-100">Data Communication - OSI, TCP/IP, 전송 제어</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span>
          </div>
        </div>
      </section>

      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-cyan-500 text-cyan-600 bg-cyan-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {topic.name}
                <span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span>
            <span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'}`}>
                <span className="font-medium mr-2">{idx + 1}.</span>
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>
                {selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}
              </p>
              <p className="text-gray-600 mt-2 text-sm">{question.explanation}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition flex items-center gap-2">
              🤖 AI 해설
            </button>
            <button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              다음 문제 →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4>
          <div className="space-y-3">
            {topics.map(topic => (
              <div key={topic.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{topic.name}</span>
                  <span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-300`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
