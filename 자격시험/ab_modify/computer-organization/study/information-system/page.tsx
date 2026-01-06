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

export default function InformationSystemPage() {
  const [activeTopic, setActiveTopic] = useState<string>('overview');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'overview',
      name: '정보통신 개요',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: '정보통신 시스템의 구성요소가 아닌 것은?', options: ['송신기', '수신기', '전송 매체', '운영체제'], answer: 3, explanation: '정보통신 시스템은 송신기, 수신기, 전송 매체, 통신 프로토콜로 구성됩니다.' },
        { id: 2, question: '아날로그 신호를 디지털로 변환하는 과정의 순서는?', options: ['표본화→양자화→부호화', '양자화→표본화→부호화', '부호화→표본화→양자화', '표본화→부호화→양자화'], answer: 0, explanation: 'A/D 변환은 표본화(Sampling)→양자화(Quantization)→부호화(Encoding) 순서로 수행됩니다.' },
        { id: 3, question: '나이퀴스트 정리에 따른 최소 표본화 주파수는?', options: ['신호 주파수와 같음', '신호 주파수의 2배 이상', '신호 주파수의 절반', '신호 주파수의 4배'], answer: 1, explanation: '나이퀴스트 정리에 따르면 신호를 완벽히 복원하려면 최대 주파수의 2배 이상으로 표본화해야 합니다.' },
        { id: 4, question: '대역폭(Bandwidth)의 단위는?', options: ['bps', 'Hz', 'dB', 'Baud'], answer: 1, explanation: '대역폭은 전송 가능한 주파수 범위를 나타내며 Hz 단위를 사용합니다. bps는 데이터 전송률입니다.' },
        { id: 5, question: '전이중(Full Duplex) 통신의 예시는?', options: ['TV 방송', '무전기', '전화', '라디오'], answer: 2, explanation: '전이중 통신은 양방향 동시 통신이 가능하며, 전화가 대표적인 예입니다.' },
        { id: 6, question: '변조(Modulation)의 목적이 아닌 것은?', options: ['원거리 전송', '주파수 분할 다중화', '데이터 압축', '잡음 감소'], answer: 2, explanation: '변조는 원거리 전송, 다중화, 안테나 크기 축소 등을 위해 사용되며, 데이터 압축과는 관련 없습니다.' },
        { id: 7, question: '디지털 변조 방식이 아닌 것은?', options: ['ASK', 'FSK', 'PSK', 'AM'], answer: 3, explanation: 'AM(진폭 변조)은 아날로그 변조 방식입니다. ASK, FSK, PSK는 디지털 변조 방식입니다.' },
        { id: 8, question: 'QAM(Quadrature Amplitude Modulation)의 특징은?', options: ['주파수만 변조', '진폭과 위상 동시 변조', '위상만 변조', '시간 분할 방식'], answer: 1, explanation: 'QAM은 진폭과 위상을 동시에 변조하여 높은 전송 효율을 얻습니다.' },
        { id: 9, question: '직렬 전송과 병렬 전송의 비교로 올바른 것은?', options: ['병렬 전송이 원거리에 유리', '직렬 전송이 고속에 불리', '직렬 전송이 장거리에 유리', '병렬 전송이 비용 절감'], answer: 2, explanation: '직렬 전송은 하나의 선로를 사용하여 장거리 전송에 유리하고 비용이 적습니다.' },
        { id: 10, question: '동기식 전송의 특징은?', options: ['각 문자마다 시작/정지 비트', '클록 동기화 필요', '오버헤드가 큼', '저속 전송에 적합'], answer: 1, explanation: '동기식 전송은 송수신기 간 클록 동기화가 필요하며, 오버헤드가 적어 고속 전송에 적합합니다.' }
      ]
    },
    {
      id: 'transmission',
      name: '전송 시스템',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: '광섬유의 장점이 아닌 것은?', options: ['높은 대역폭', '전자기 간섭 면역', '설치 용이성', '낮은 감쇠'], answer: 2, explanation: '광섬유는 대역폭이 높고 EMI에 강하지만, 설치와 연결이 까다롭습니다.' },
        { id: 2, question: '동축 케이블과 비교한 UTP 케이블의 장점은?', options: ['높은 대역폭', '낮은 비용', 'EMI 차폐 우수', '장거리 전송'], answer: 1, explanation: 'UTP 케이블은 동축 케이블보다 저렴하고 설치가 쉽지만, EMI에 취약합니다.' },
        { id: 3, question: '위성 통신의 단점은?', options: ['넓은 커버리지', '높은 지연 시간', '이동성 지원', '대용량 전송'], answer: 1, explanation: '정지궤도 위성은 약 36,000km 고도에서 약 250ms의 왕복 지연이 발생합니다.' },
        { id: 4, question: 'xDSL 기술의 특징은?', options: ['광케이블 사용', '기존 전화선 활용', '이동통신 기술', '위성 기반'], answer: 1, explanation: 'xDSL(ADSL, VDSL 등)은 기존 구리 전화선을 이용하여 고속 데이터를 전송합니다.' },
        { id: 5, question: 'FTTH(Fiber To The Home)의 의미는?', options: ['가정까지 동축 케이블', '가정까지 광케이블', '가정까지 전화선', '가정까지 무선'], answer: 1, explanation: 'FTTH는 광케이블을 가정까지 직접 연결하는 초고속 인터넷 기술입니다.' },
        { id: 6, question: 'PCM(Pulse Code Modulation)의 표본화 주파수로 음성 통화에 사용되는 것은?', options: ['4kHz', '8kHz', '16kHz', '44.1kHz'], answer: 1, explanation: '음성(4kHz 대역)은 나이퀴스트 정리에 따라 8kHz로 표본화합니다. 8비트 양자화로 64kbps 전송률이 됩니다.' },
        { id: 7, question: 'TDM(Time Division Multiplexing)의 특징은?', options: ['주파수 분할', '시간 분할', '코드 분할', '파장 분할'], answer: 1, explanation: 'TDM은 시간을 분할하여 여러 채널이 순차적으로 전송 매체를 사용합니다.' },
        { id: 8, question: 'WDM(Wavelength Division Multiplexing)이 사용되는 매체는?', options: ['동축 케이블', '광섬유', 'UTP 케이블', '무선'], answer: 1, explanation: 'WDM은 광섬유에서 여러 파장(색)의 빛을 동시에 전송하는 다중화 기술입니다.' },
        { id: 9, question: 'T1 회선의 전송 속도는?', options: ['64kbps', '1.544Mbps', '2.048Mbps', '45Mbps'], answer: 1, explanation: 'T1은 24개의 64kbps 채널로 구성되어 1.544Mbps 속도를 제공합니다(북미 표준).' },
        { id: 10, question: 'SONET/SDH의 특징은?', options: ['비동기 전송', '동기식 광전송', '무선 전송', '아날로그 전송'], answer: 1, explanation: 'SONET(북미)/SDH(국제)는 동기식 광전송 네트워크로 고속 백본망에 사용됩니다.' }
      ]
    },
    {
      id: 'security',
      name: '네트워크 보안',
      color: 'from-red-500 to-red-400',
      questions: [
        { id: 1, question: '대칭키 암호화의 특징은?', options: ['공개키/비밀키 쌍 사용', '같은 키로 암/복호화', '느린 처리 속도', '키 배송 문제 없음'], answer: 1, explanation: '대칭키 암호화는 같은 키로 암호화와 복호화를 수행하며, 속도가 빠르지만 키 배송 문제가 있습니다.' },
        { id: 2, question: 'RSA 알고리즘의 안전성 기반은?', options: ['이산 로그 문제', '큰 수의 소인수분해', '해시 충돌', '대칭키 길이'], answer: 1, explanation: 'RSA는 큰 수를 소인수분해하기 어렵다는 수학적 문제에 기반합니다.' },
        { id: 3, question: '디지털 서명의 목적이 아닌 것은?', options: ['인증', '무결성', '기밀성', '부인 방지'], answer: 2, explanation: '디지털 서명은 인증, 무결성, 부인 방지를 제공하지만, 기밀성은 암호화로 제공됩니다.' },
        { id: 4, question: 'SSL/TLS가 동작하는 계층은?', options: ['네트워크 계층', '전송 계층', '전송 계층과 응용 계층 사이', '데이터링크 계층'], answer: 2, explanation: 'SSL/TLS는 전송 계층과 응용 계층 사이에서 동작하여 보안 통신을 제공합니다.' },
        { id: 5, question: 'IPsec의 구성 프로토콜이 아닌 것은?', options: ['AH', 'ESP', 'IKE', 'TLS'], answer: 3, explanation: 'IPsec은 AH(인증), ESP(암호화), IKE(키 교환)로 구성됩니다. TLS는 별개의 프로토콜입니다.' },
        { id: 6, question: '방화벽의 유형이 아닌 것은?', options: ['패킷 필터링', '상태 검사', '프록시', 'VPN'], answer: 3, explanation: 'VPN은 가상 사설망으로 방화벽 유형이 아닙니다. 방화벽은 패킷 필터링, 상태 검사, 프록시 등이 있습니다.' },
        { id: 7, question: 'DoS 공격의 목적은?', options: ['데이터 탈취', '서비스 가용성 저하', '권한 상승', '백도어 설치'], answer: 1, explanation: 'DoS(Denial of Service) 공격은 시스템이나 네트워크의 가용성을 저하시키는 것이 목적입니다.' },
        { id: 8, question: 'AES 암호화의 키 길이가 아닌 것은?', options: ['128비트', '192비트', '256비트', '512비트'], answer: 3, explanation: 'AES는 128, 192, 256비트 키를 지원합니다. 512비트는 지원하지 않습니다.' },
        { id: 9, question: 'PKI(Public Key Infrastructure)의 구성요소가 아닌 것은?', options: ['인증기관(CA)', '등록기관(RA)', 'VPN 게이트웨이', '디렉토리 서비스'], answer: 2, explanation: 'PKI는 CA, RA, 디렉토리 서비스, CRL 등으로 구성됩니다. VPN은 PKI를 사용하는 응용입니다.' },
        { id: 10, question: '해시 함수의 특징이 아닌 것은?', options: ['일방향성', '충돌 저항성', '복호화 가능', '고정 길이 출력'], answer: 2, explanation: '해시 함수는 일방향으로 복호화가 불가능하며, 충돌 저항성과 고정 길이 출력 특성이 있습니다.' }
      ]
    },
    {
      id: 'internet',
      name: '인터넷 서비스',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: 'DNS의 역할은?', options: ['IP 주소를 MAC 주소로 변환', '도메인을 IP 주소로 변환', 'MAC 주소를 IP 주소로 변환', '포트 번호 할당'], answer: 1, explanation: 'DNS(Domain Name System)는 도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템입니다.' },
        { id: 2, question: 'HTTP와 HTTPS의 차이점은?', options: ['포트 번호만 다름', 'SSL/TLS 암호화 여부', '프로토콜 버전', '전송 속도'], answer: 1, explanation: 'HTTPS는 HTTP에 SSL/TLS 암호화를 추가하여 보안 통신을 제공합니다. 포트는 80과 443입니다.' },
        { id: 3, question: 'SMTP의 용도는?', options: ['웹 페이지 전송', '이메일 송신', '이메일 수신', '파일 전송'], answer: 1, explanation: 'SMTP(Simple Mail Transfer Protocol)는 이메일을 송신하는 데 사용됩니다. 수신은 POP3/IMAP을 사용합니다.' },
        { id: 4, question: 'FTP의 기본 포트 번호는?', options: ['20, 21', '22, 23', '80, 443', '25, 110'], answer: 0, explanation: 'FTP는 제어용으로 21번, 데이터 전송용으로 20번 포트를 사용합니다.' },
        { id: 5, question: 'REST API의 특징이 아닌 것은?', options: ['무상태성', 'HTTP 메서드 사용', '세션 상태 유지', 'URI로 자원 식별'], answer: 2, explanation: 'REST는 무상태(Stateless)를 원칙으로 하며, 서버가 클라이언트 상태를 저장하지 않습니다.' },
        { id: 6, question: 'CDN(Content Delivery Network)의 목적은?', options: ['보안 강화', '콘텐츠 분산으로 성능 향상', '데이터베이스 관리', 'VPN 제공'], answer: 1, explanation: 'CDN은 콘텐츠를 지리적으로 분산된 서버에 캐싱하여 사용자에게 빠르게 전달합니다.' },
        { id: 7, question: 'WebSocket의 특징은?', options: ['요청-응답 방식만', '양방향 실시간 통신', '비연결형', 'UDP 기반'], answer: 1, explanation: 'WebSocket은 HTTP 업그레이드 후 양방향 실시간 통신을 지원하는 프로토콜입니다.' },
        { id: 8, question: 'SSH의 기본 포트 번호는?', options: ['21', '22', '23', '25'], answer: 1, explanation: 'SSH(Secure Shell)는 22번 포트를 사용하며, 암호화된 원격 접속을 제공합니다.' },
        { id: 9, question: 'DNS 레코드 유형 중 IPv6 주소를 저장하는 것은?', options: ['A', 'AAAA', 'CNAME', 'MX'], answer: 1, explanation: 'A 레코드는 IPv4, AAAA 레코드는 IPv6 주소를 저장합니다.' },
        { id: 10, question: 'HTTP/2의 특징이 아닌 것은?', options: ['멀티플렉싱', '헤더 압축', '텍스트 기반 프로토콜', '서버 푸시'], answer: 2, explanation: 'HTTP/2는 이진(Binary) 프로토콜로, HTTP/1.1의 텍스트 기반과 다릅니다.' }
      ]
    },
    {
      id: 'emerging',
      name: '신기술(클라우드/IoT)',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: '클라우드 서비스 모델이 아닌 것은?', options: ['IaaS', 'PaaS', 'SaaS', 'NaaS'], answer: 3, explanation: '클라우드 서비스 모델은 IaaS(인프라), PaaS(플랫폼), SaaS(소프트웨어)로 구분됩니다.' },
        { id: 2, question: 'IaaS의 예시는?', options: ['Gmail', 'AWS EC2', 'Salesforce', 'Google Docs'], answer: 1, explanation: 'IaaS는 가상 서버, 스토리지 등 인프라를 제공하며, AWS EC2가 대표적입니다.' },
        { id: 3, question: '컨테이너 기술의 장점이 아닌 것은?', options: ['빠른 시작', '가벼운 가상화', '완전한 OS 격리', '이식성'], answer: 2, explanation: '컨테이너는 OS 커널을 공유하므로 완전한 OS 격리는 VM이 제공합니다. 컨테이너는 프로세스 격리입니다.' },
        { id: 4, question: 'IoT 프로토콜로 적합한 것은?', options: ['HTTP', 'MQTT', 'FTP', 'SMTP'], answer: 1, explanation: 'MQTT는 경량 메시지 프로토콜로 저전력, 저대역폭 IoT 환경에 적합합니다.' },
        { id: 5, question: '엣지 컴퓨팅의 목적은?', options: ['중앙 집중 처리', '데이터 발생 지점 근처에서 처리', '대용량 저장', '네트워크 연결 차단'], answer: 1, explanation: '엣지 컴퓨팅은 데이터를 발생 지점 가까이에서 처리하여 지연을 줄이고 대역폭을 절약합니다.' },
        { id: 6, question: '5G 통신의 특징이 아닌 것은?', options: ['초고속', '초저지연', '대규모 연결', '높은 전력 소모'], answer: 3, explanation: '5G는 초고속, 초저지연, 대규모 IoT 연결을 특징으로 하며, 전력 효율도 개선되었습니다.' },
        { id: 7, question: 'SDN(Software Defined Networking)의 특징은?', options: ['하드웨어 기반 제어', '제어 평면과 데이터 평면 분리', '고정된 네트워크 구성', '물리적 네트워크만'], answer: 1, explanation: 'SDN은 제어 평면을 소프트웨어로 분리하여 네트워크를 유연하게 관리합니다.' },
        { id: 8, question: 'NFV(Network Functions Virtualization)가 가상화하는 것은?', options: ['서버만', '네트워크 기능', '스토리지만', '데이터베이스'], answer: 1, explanation: 'NFV는 방화벽, 로드밸런서 등 네트워크 기능을 가상화하여 범용 서버에서 실행합니다.' },
        { id: 9, question: '블록체인의 특징이 아닌 것은?', options: ['분산 원장', '불변성', '중앙 집중 관리', '합의 알고리즘'], answer: 2, explanation: '블록체인은 중앙 관리자 없이 분산된 네트워크에서 합의를 통해 데이터를 관리합니다.' },
        { id: 10, question: '마이크로서비스 아키텍처의 장점이 아닌 것은?', options: ['독립적 배포', '기술 다양성', '단순한 운영', '확장성'], answer: 2, explanation: '마이크로서비스는 독립 배포와 확장이 가능하지만, 분산 시스템 관리로 운영이 복잡해집니다.' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('is-score');
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
      localStorage.setItem('is-score', JSON.stringify(newScore));
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
    const prompt = `전자계산기조직응용기사 정보통신시스템 과목의 "${activeTpic.name}" 주제에서 다음 문제에 대해 자세히 설명해주세요:

문제: ${question.question}

선택지:
${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

정답: ${question.options[question.answer]}

이 문제와 관련된 핵심 개념, 실제 시스템 적용 사례, 그리고 관련 문제 유형에 대해 설명해주세요.`;
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
            <span className="text-cyan-600 font-medium">정보통신시스템</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보통신시스템</h1>
              <p className="text-cyan-100">Information Communication System - 통신, 보안, 인터넷</p>
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
