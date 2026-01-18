'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function EmergingTechPage() {
  const [activeTopic, setActiveTopic] = useState<string>('cloud');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'cloud',
      name: '클라우드 컴퓨팅',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: '클라우드 네이티브 애플리케이션의 특징이 아닌 것은?', options: ['컨테이너 기반', '마이크로서비스', '모놀리식 아키텍처', '선언적 API'], answer: 2, explanation: '클라우드 네이티브는 컨테이너, 마이크로서비스, 선언적 API, 자동화를 특징으로 하며 모놀리식과 대비됩니다.' },
        { id: 2, question: 'Kubernetes의 최소 배포 단위는?', options: ['Container', 'Pod', 'Node', 'Cluster'], answer: 1, explanation: 'Pod는 하나 이상의 컨테이너를 포함하는 Kubernetes의 최소 배포 단위입니다.' },
        { id: 3, question: 'Serverless Computing의 장점이 아닌 것은?', options: ['인프라 관리 부담 감소', '사용량 기반 과금', '콜드 스타트 없음', '자동 확장'], answer: 2, explanation: 'Serverless는 콜드 스타트 지연이 발생할 수 있는 단점이 있습니다.' },
        { id: 4, question: 'Multi-Cloud 전략의 장점이 아닌 것은?', options: ['벤더 종속 방지', '복잡성 감소', '가용성 향상', '최적 서비스 선택'], answer: 1, explanation: 'Multi-Cloud는 여러 클라우드를 사용하므로 복잡성이 오히려 증가합니다.' },
        { id: 5, question: 'AWS Lambda, Azure Functions, GCP Cloud Functions의 공통점은?', options: ['IaaS', 'PaaS', 'FaaS(Serverless)', 'SaaS'], answer: 2, explanation: '이들은 모두 FaaS(Function as a Service) 기반의 서버리스 컴퓨팅 서비스입니다.' },
        { id: 6, question: 'Cloud Native Computing Foundation(CNCF)의 역할은?', options: ['클라우드 판매', '클라우드 네이티브 기술 표준화', '하드웨어 제조', '네트워크 구축'], answer: 1, explanation: 'CNCF는 Kubernetes 등 클라우드 네이티브 오픈소스 프로젝트를 관리합니다.' },
        { id: 7, question: 'Hybrid Cloud의 정의는?', options: ['단일 퍼블릭 클라우드', '온프레미스와 클라우드 결합', '여러 퍼블릭 클라우드', '프라이빗 클라우드만'], answer: 1, explanation: 'Hybrid Cloud는 온프레미스(또는 프라이빗)와 퍼블릭 클라우드를 결합한 형태입니다.' },
        { id: 8, question: 'Cloud FinOps의 핵심 원칙이 아닌 것은?', options: ['팀의 협업', '비용 가시화', '무제한 지출', '비즈니스 가치 기반 결정'], answer: 2, explanation: 'FinOps는 클라우드 비용의 가시화, 최적화, 비즈니스 가치 기반 의사결정을 강조합니다.' },
        { id: 9, question: 'Kubernetes Operator 패턴의 목적은?', options: ['수동 운영', '애플리케이션 운영 자동화', 'UI 제공', '네트워크 설정'], answer: 1, explanation: 'Operator는 Kubernetes에서 복잡한 애플리케이션의 배포와 운영을 자동화합니다.' },
        { id: 10, question: 'Service Mesh에서 Sidecar 패턴의 역할은?', options: ['데이터 저장', '서비스 간 통신 관리', 'UI 렌더링', '배치 처리'], answer: 1, explanation: 'Sidecar 프록시는 서비스 옆에서 트래픽 관리, 보안, 모니터링을 담당합니다.' }
      ]
    },
    {
      id: 'ai',
      name: 'AI/머신러닝',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: '지도학습(Supervised Learning)의 특징은?', options: ['레이블 없는 데이터', '레이블된 데이터로 학습', '보상 기반 학습', '군집화'], answer: 1, explanation: '지도학습은 입력과 정답(레이블)이 있는 데이터로 모델을 학습시킵니다.' },
        { id: 2, question: 'Deep Learning이 전통적 ML과 다른 점은?', options: ['특징 수동 추출', '자동 특징 학습', '데이터 불필요', '규칙 기반'], answer: 1, explanation: '딥러닝은 신경망을 통해 특징(feature)을 자동으로 학습합니다.' },
        { id: 3, question: 'Transformer 아키텍처의 핵심 메커니즘은?', options: ['Convolution', 'Recurrence', 'Self-Attention', 'Pooling'], answer: 2, explanation: 'Transformer는 Self-Attention 메커니즘으로 시퀀스의 모든 위치를 동시에 처리합니다.' },
        { id: 4, question: 'GPT와 BERT의 차이점은?', options: ['동일한 구조', 'GPT는 단방향, BERT는 양방향', 'BERT가 더 큼', 'GPT는 이미지용'], answer: 1, explanation: 'GPT는 단방향(Left-to-Right), BERT는 양방향 컨텍스트를 사용합니다.' },
        { id: 5, question: 'MLOps 파이프라인 구성요소가 아닌 것은?', options: ['데이터 수집', '모델 학습', '모델 배포', '하드웨어 제조'], answer: 3, explanation: 'MLOps는 데이터 수집, 전처리, 학습, 검증, 배포, 모니터링 파이프라인을 포함합니다.' },
        { id: 6, question: 'Model Drift의 의미는?', options: ['모델 크기 증가', '시간에 따른 모델 성능 저하', '학습 속도 증가', '정확도 향상'], answer: 1, explanation: 'Model Drift는 데이터 분포 변화로 배포된 모델의 성능이 저하되는 현상입니다.' },
        { id: 7, question: 'RAG(Retrieval-Augmented Generation)의 목적은?', options: ['이미지 생성', '외부 지식 검색으로 LLM 응답 개선', '음성 인식', '번역만'], answer: 1, explanation: 'RAG는 외부 문서/DB에서 관련 정보를 검색하여 LLM의 응답 품질을 높입니다.' },
        { id: 8, question: '설명 가능한 AI(XAI)의 목적은?', options: ['모델 성능 향상', 'AI 의사결정 과정 설명', '학습 속도 증가', '데이터 압축'], answer: 1, explanation: 'XAI는 AI 모델이 왜 그런 결정을 내렸는지 인간이 이해할 수 있게 설명합니다.' },
        { id: 9, question: 'Fine-tuning과 Prompt Engineering의 차이는?', options: ['동일한 방법', 'Fine-tuning은 모델 수정, Prompt는 입력 수정', 'Prompt가 더 비용이 높음', 'Fine-tuning은 입력만 변경'], answer: 1, explanation: 'Fine-tuning은 모델 가중치를 재학습하고, Prompt Engineering은 입력 방식을 최적화합니다.' },
        { id: 10, question: 'Responsible AI의 원칙이 아닌 것은?', options: ['공정성', '투명성', '이윤 최대화', '프라이버시'], answer: 2, explanation: 'Responsible AI는 공정성, 투명성, 프라이버시, 안전성, 책임성을 강조합니다.' }
      ]
    },
    {
      id: 'blockchain',
      name: '블록체인',
      color: 'from-orange-500 to-orange-400',
      questions: [
        { id: 1, question: '블록체인의 핵심 특성이 아닌 것은?', options: ['탈중앙화', '불변성', '중앙 통제', '투명성'], answer: 2, explanation: '블록체인은 탈중앙화, 불변성, 투명성, 합의 메커니즘이 핵심입니다.' },
        { id: 2, question: 'PoW(Proof of Work)의 단점은?', options: ['보안 취약', '높은 에너지 소비', '빠른 처리', '저렴한 비용'], answer: 1, explanation: 'PoW는 채굴에 많은 컴퓨팅 파워와 에너지가 필요합니다.' },
        { id: 3, question: 'Smart Contract의 특징이 아닌 것은?', options: ['자동 실행', '변경 가능', '코드로 정의', '조건 기반'], answer: 1, explanation: '스마트 컨트랙트는 배포 후 변경이 어려우며(immutable), 자동 실행됩니다.' },
        { id: 4, question: 'Public과 Private 블록체인의 차이는?', options: ['동일함', 'Public은 누구나 참여, Private은 허가된 참여자', 'Private이 더 탈중앙화', 'Public은 비공개'], answer: 1, explanation: 'Public은 개방형, Private(Permissioned)은 허가된 참여자만 접근합니다.' },
        { id: 5, question: 'DeFi(Decentralized Finance)의 특징은?', options: ['은행 필수', '중개자 없는 금융 서비스', '중앙 통제', '오프라인만'], answer: 1, explanation: 'DeFi는 스마트 컨트랙트로 중개자 없이 금융 서비스를 제공합니다.' },
        { id: 6, question: 'NFT(Non-Fungible Token)의 특징은?', options: ['대체 가능', '고유하고 대체 불가', '화폐와 동일', '물리적 자산만'], answer: 1, explanation: 'NFT는 각 토큰이 고유하여 대체할 수 없는 디지털 자산입니다.' },
        { id: 7, question: 'Layer 2 솔루션의 목적은?', options: ['보안 약화', '확장성 향상', '탈중앙화 감소', '비용 증가'], answer: 1, explanation: 'Layer 2(Lightning Network, Rollup 등)는 메인체인 외부에서 처리하여 확장성을 높입니다.' },
        { id: 8, question: '합의 알고리즘 PBFT의 특징은?', options: ['높은 에너지 소비', '소수 노드에서 효율적', '완전 탈중앙화', 'PoW와 동일'], answer: 1, explanation: 'PBFT는 소규모 노드에서 빠른 합의가 가능하나 노드 수 증가 시 성능이 저하됩니다.' },
        { id: 9, question: '블록체인 트릴레마란?', options: ['세 가지 장점 동시 달성', '확장성, 보안, 탈중앙화 동시 달성의 어려움', '세 가지 블록체인 유형', '세 번의 합의'], answer: 1, explanation: '블록체인 트릴레마는 확장성, 보안, 탈중앙화를 동시에 만족하기 어렵다는 개념입니다.' },
        { id: 10, question: 'CBDC(Central Bank Digital Currency)와 암호화폐의 차이는?', options: ['동일함', 'CBDC는 중앙은행 발행, 암호화폐는 탈중앙화', 'CBDC가 더 탈중앙화', '암호화폐만 법정화폐'], answer: 1, explanation: 'CBDC는 중앙은행이 발행하는 디지털 화폐로 법정화폐이며, 암호화폐는 탈중앙화됩니다.' }
      ]
    },
    {
      id: 'security',
      name: '보안 기술',
      color: 'from-red-500 to-red-400',
      questions: [
        { id: 1, question: 'Zero Trust 보안 모델의 원칙은?', options: ['내부 신뢰', 'Never Trust, Always Verify', '경계 보안만', '패스워드 불필요'], answer: 1, explanation: 'Zero Trust는 내부/외부 구분 없이 모든 접근을 검증합니다.' },
        { id: 2, question: 'SIEM(Security Information and Event Management)의 역할은?', options: ['네트워크 설계', '보안 로그 수집/분석/상관관계', '코드 개발', '하드웨어 관리'], answer: 1, explanation: 'SIEM은 여러 소스의 보안 로그를 수집, 분석하고 위협을 탐지합니다.' },
        { id: 3, question: 'DevSecOps의 핵심은?', options: ['보안을 개발 후 추가', '보안을 개발 생명주기 전체에 통합', '개발팀만 보안 담당', '운영 제외'], answer: 1, explanation: 'DevSecOps는 보안을 DevOps 파이프라인 전체에 통합(Shift-Left Security)합니다.' },
        { id: 4, question: 'SOAR(Security Orchestration, Automation and Response)의 목적은?', options: ['수동 대응', '보안 대응 자동화 및 오케스트레이션', '네트워크 구축', '개발 자동화'], answer: 1, explanation: 'SOAR는 보안 인시던트 대응을 자동화하고 여러 보안 도구를 연계합니다.' },
        { id: 5, question: '동형 암호(Homomorphic Encryption)의 특징은?', options: ['빠른 복호화', '암호화된 상태로 연산 가능', '키 불필요', '평문으로만 연산'], answer: 1, explanation: '동형 암호는 암호화된 데이터를 복호화 없이 연산할 수 있어 프라이버시를 보호합니다.' },
        { id: 6, question: 'Confidential Computing의 목적은?', options: ['저장 데이터 보호만', '사용 중 데이터 보호', '전송 데이터만', '암호화 불필요'], answer: 1, explanation: 'Confidential Computing은 TEE를 사용해 사용 중(In-use) 데이터를 보호합니다.' },
        { id: 7, question: 'Supply Chain Attack의 의미는?', options: ['물류 공격', '소프트웨어 공급망을 통한 공격', '직접 해킹만', '물리적 침입'], answer: 1, explanation: '공급망 공격은 소프트웨어 개발/배포 과정의 취약점을 이용합니다(예: SolarWinds).' },
        { id: 8, question: 'CASB(Cloud Access Security Broker)의 역할은?', options: ['클라우드 개발', '클라우드 서비스 보안 중개', '네트워크 설계', '하드웨어 관리'], answer: 1, explanation: 'CASB는 사용자와 클라우드 서비스 사이에서 보안 정책을 적용합니다.' },
        { id: 9, question: 'Threat Intelligence의 목적은?', options: ['위협 무시', '사이버 위협 정보 수집/분석', '시스템 개발', '네트워크 확장'], answer: 1, explanation: 'Threat Intelligence는 위협 정보를 수집하고 분석하여 선제적 대응에 활용합니다.' },
        { id: 10, question: 'Post-Quantum Cryptography의 필요성은?', options: ['현재 암호 충분', '양자컴퓨터에 의한 기존 암호 위협 대응', '속도 향상만', '비용 절감'], answer: 1, explanation: '양자컴퓨터가 RSA, ECC 등 현재 암호를 깰 수 있어 양자내성 암호가 필요합니다.' }
      ]
    },
    {
      id: 'iot',
      name: 'IoT/엣지 컴퓨팅',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'IoT 아키텍처의 일반적인 계층이 아닌 것은?', options: ['디바이스 계층', '네트워크 계층', '응용 계층', '컴파일 계층'], answer: 3, explanation: 'IoT 아키텍처는 디바이스, 네트워크(게이트웨이), 플랫폼, 응용 계층으로 구성됩니다.' },
        { id: 2, question: 'Edge Computing의 장점이 아닌 것은?', options: ['지연 감소', '대역폭 절약', '모든 처리를 클라우드로', '실시간 처리'], answer: 2, explanation: 'Edge Computing은 데이터를 발생지 근처에서 처리하여 클라우드 전송을 줄입니다.' },
        { id: 3, question: 'MQTT 프로토콜의 특징은?', options: ['무거운 프로토콜', '발행-구독 모델', 'HTTP 기반', '고대역폭 필요'], answer: 1, explanation: 'MQTT는 경량 발행-구독(Pub-Sub) 프로토콜로 IoT에 적합합니다.' },
        { id: 4, question: 'Digital Twin의 정의는?', options: ['물리적 복제품', '물리 자산의 디지털 복제본', '단순 시뮬레이션', '문서화'], answer: 1, explanation: 'Digital Twin은 물리적 자산/프로세스의 디지털 복제본으로 실시간 동기화됩니다.' },
        { id: 5, question: 'IoT 보안의 주요 과제가 아닌 것은?', options: ['제한된 컴퓨팅 자원', '다양한 프로토콜', '풍부한 보안 기능', '대규모 디바이스 관리'], answer: 2, explanation: 'IoT 디바이스는 제한된 자원으로 풍부한 보안 기능 구현이 어렵습니다.' },
        { id: 6, question: 'Fog Computing과 Edge Computing의 관계는?', options: ['동일한 개념', 'Fog는 Edge보다 클라우드에 가까운 중간 계층', 'Edge가 더 클라우드에 가까움', '관계없음'], answer: 1, explanation: 'Fog Computing은 Edge와 클라우드 사이의 중간 계층으로, 더 넓은 범위를 포함합니다.' },
        { id: 7, question: '5G가 IoT에 미치는 영향이 아닌 것은?', options: ['초저지연', '대규모 연결', '높은 대역폭', '배터리 수명 감소'], answer: 3, explanation: '5G mMTC는 저전력 대규모 IoT 연결을 지원하여 배터리 효율도 개선합니다.' },
        { id: 8, question: 'OTA(Over-The-Air) 업데이트의 중요성은?', options: ['비용 증가', '원격 펌웨어/소프트웨어 업데이트', '물리적 접근 필수', '보안 취약점 유지'], answer: 1, explanation: 'OTA는 원격으로 IoT 디바이스를 업데이트하여 보안 패치와 기능 개선이 가능합니다.' },
        { id: 9, question: 'TinyML의 특징은?', options: ['대형 서버 전용', '초소형 디바이스에서 ML 실행', '클라우드 필수', '고전력 소비'], answer: 1, explanation: 'TinyML은 마이크로컨트롤러 같은 초소형, 저전력 디바이스에서 ML을 실행합니다.' },
        { id: 10, question: 'Industrial IoT(IIoT)의 특징이 아닌 것은?', options: ['제조업 적용', '높은 신뢰성 요구', '소비자 가전 중심', '예측 유지보수'], answer: 2, explanation: 'IIoT는 제조, 에너지 등 산업 분야에 적용되며 높은 신뢰성과 안전이 요구됩니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('imp-et-score'); if (saved) setScore(JSON.parse(saved)); }, []);
  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];
  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('imp-et-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { const prompt = `정보관리기술사 신기술 동향 분야의 "${activeTpic.name}" 주제입니다:\n\n문제: ${question.question}\n\n선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${question.options[question.answer]}\n\n기술사 시험 답안 작성 관점에서 이 주제를 심층적으로 설명해주세요.`; setAiPrompt(prompt); setShowAIModal(true); };
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-violet-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a><span className="text-gray-300">›</span><span className="text-violet-600 font-medium">신기술 동향</span></nav></div></header>
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🔮</span></div><div><h1 className="text-2xl font-bold">신기술 동향</h1><p className="text-violet-100">Emerging Technologies - 클라우드, AI, 블록체인, 보안, IoT</p></div></div><div className="mt-4 flex items-center gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span><span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span></div></div></section>
      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto"><div className="max-w-6xl mx-auto px-4"><div className="flex">{topics.map(topic => (<button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span></button>))}</div></div></div>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4"><span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span><span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span></div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">{question.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'}`}><span className="font-medium mr-2">{idx + 1}.</span>{option}</button>))}</div>
          {showResult && (<div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}><p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}</p><p className="text-gray-600 mt-2 text-sm">{question.explanation}</p></div>)}
          <div className="flex justify-between mt-6"><button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">🤖 AI 해설</button><button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50">다음 문제 →</button></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6"><h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4><div className="space-y-3">{topics.map(topic => (<div key={topic.id}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{topic.name}</span><span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${topic.color}`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div></div></div>))}</div></div>
      </main>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
