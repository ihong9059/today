'use client';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function SwEngineeringPage() {
  const [activeTopic, setActiveTopic] = useState<string>('methodology');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'methodology',
      name: '개발 방법론',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: 'SAFe(Scaled Agile Framework)의 특징으로 올바르지 않은 것은?', options: ['대규모 조직용 애자일', '포트폴리오, 프로그램, 팀 레벨', '폭포수 방식 권장', 'PI Planning 수행'], answer: 2, explanation: 'SAFe는 대규모 조직에서 애자일을 확장 적용하며 폭포수가 아닌 반복적 접근을 권장합니다.' },
        { id: 2, question: 'LeSS(Large Scale Scrum)와 일반 Scrum의 차이점은?', options: ['Sprint 없음', '다중 팀이 하나의 Product Backlog 공유', 'Scrum Master 불필요', '릴리즈 계획 없음'], answer: 1, explanation: 'LeSS는 여러 팀이 하나의 Product Backlog와 Product Owner를 공유합니다.' },
        { id: 3, question: 'Domain-Driven Design(DDD)의 핵심 개념이 아닌 것은?', options: ['Bounded Context', 'Ubiquitous Language', 'Waterfall Process', 'Aggregate'], answer: 2, explanation: 'DDD의 핵심은 Bounded Context, Ubiquitous Language, Aggregate, Entity, Value Object 등입니다.' },
        { id: 4, question: 'Event Storming의 목적은?', options: ['코드 리뷰', '도메인 이벤트 기반 모델링', '테스트 자동화', '배포 자동화'], answer: 1, explanation: 'Event Storming은 도메인 이벤트를 중심으로 비즈니스 프로세스를 시각화하는 워크숍 기법입니다.' },
        { id: 5, question: 'Kanban의 핵심 메트릭이 아닌 것은?', options: ['Lead Time', 'Cycle Time', 'Velocity', 'Throughput'], answer: 2, explanation: 'Velocity는 Scrum 메트릭입니다. Kanban은 Lead Time, Cycle Time, Throughput을 주로 사용합니다.' },
        { id: 6, question: 'Spotify Model의 구성요소가 아닌 것은?', options: ['Squad', 'Tribe', 'Chapter', 'Division'], answer: 3, explanation: 'Spotify Model은 Squad, Tribe, Chapter, Guild로 구성됩니다.' },
        { id: 7, question: 'BDD(Behavior-Driven Development)의 시나리오 형식은?', options: ['Input-Process-Output', 'Given-When-Then', 'Arrange-Act-Assert', 'Setup-Execute-Verify'], answer: 1, explanation: 'BDD는 Given(상황)-When(행동)-Then(결과) 형식으로 시나리오를 작성합니다.' },
        { id: 8, question: 'TDD의 Red-Green-Refactor 사이클에서 Red의 의미는?', options: ['코드 삭제', '실패하는 테스트 작성', '리팩토링', '배포'], answer: 1, explanation: 'Red는 먼저 실패하는 테스트를 작성하는 단계입니다. Green은 테스트 통과, Refactor는 개선입니다.' },
        { id: 9, question: 'Feature Toggle의 장점이 아닌 것은?', options: ['점진적 릴리즈', 'A/B 테스트', '코드 복잡도 감소', '빠른 롤백'], answer: 2, explanation: 'Feature Toggle은 점진적 릴리즈와 롤백에 유용하지만 코드 복잡도는 오히려 증가합니다.' },
        { id: 10, question: 'Trunk-Based Development의 특징은?', options: ['긴 수명의 Feature Branch', '짧은 주기로 Main에 통합', 'Pull Request 금지', '배포 자동화 불가'], answer: 1, explanation: 'Trunk-Based Development는 짧은 주기(보통 하루 이내)로 Main/Trunk에 코드를 통합합니다.' }
      ]
    },
    {
      id: 'architecture',
      name: '아키텍처 패턴',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: 'Microservices Architecture의 장점이 아닌 것은?', options: ['독립적 배포', '기술 다양성', '분산 트랜잭션 용이', '확장성'], answer: 2, explanation: '마이크로서비스는 분산 트랜잭션이 어렵고, Saga 패턴 등 별도 방법이 필요합니다.' },
        { id: 2, question: 'CQRS 패턴의 특징은?', options: ['읽기/쓰기 모델 분리', '단일 데이터베이스 필수', '동기식 처리만', 'ORM 필수'], answer: 0, explanation: 'CQRS는 Command(쓰기)와 Query(읽기) 책임을 분리하여 각각 최적화합니다.' },
        { id: 3, question: 'Event Sourcing의 장점이 아닌 것은?', options: ['완전한 이력 추적', '시간 여행 쿼리 가능', '저장 공간 효율', '감사 로그 내장'], answer: 2, explanation: 'Event Sourcing은 모든 이벤트를 저장하므로 저장 공간이 많이 필요합니다.' },
        { id: 4, question: 'Hexagonal Architecture(Ports and Adapters)의 목적은?', options: ['UI 최적화', '비즈니스 로직의 외부 의존성 분리', '데이터베이스 성능 향상', '네트워크 최적화'], answer: 1, explanation: '헥사고날 아키텍처는 핵심 비즈니스 로직을 외부(DB, UI, API)로부터 분리합니다.' },
        { id: 5, question: 'API Gateway 패턴의 역할이 아닌 것은?', options: ['라우팅', '인증/인가', '비즈니스 로직 구현', '속도 제한'], answer: 2, explanation: 'API Gateway는 라우팅, 인증, 속도 제한, 로깅 등을 담당하며 비즈니스 로직은 서비스에서 구현합니다.' },
        { id: 6, question: 'Service Mesh의 대표적인 구현체는?', options: ['Kubernetes', 'Istio', 'Docker', 'Jenkins'], answer: 1, explanation: 'Istio, Linkerd, Consul Connect 등이 대표적인 Service Mesh 구현체입니다.' },
        { id: 7, question: 'Saga 패턴에서 보상 트랜잭션의 역할은?', options: ['성능 최적화', '실패 시 이전 단계 롤백', '데이터 압축', '로깅'], answer: 1, explanation: 'Saga의 보상 트랜잭션은 분산 환경에서 실패 시 이전 단계들을 논리적으로 롤백합니다.' },
        { id: 8, question: 'Backend for Frontend(BFF) 패턴의 목적은?', options: ['백엔드 통합', '클라이언트별 맞춤 API 제공', '데이터베이스 분리', '캐싱'], answer: 1, explanation: 'BFF는 웹, 모바일 등 각 클라이언트에 최적화된 API를 별도로 제공합니다.' },
        { id: 9, question: 'Strangler Fig 패턴의 용도는?', options: ['신규 시스템 구축', '레거시 시스템 점진적 교체', '성능 테스트', '보안 강화'], answer: 1, explanation: 'Strangler Fig는 레거시 시스템을 한 번에 교체하지 않고 점진적으로 새 시스템으로 이전합니다.' },
        { id: 10, question: 'Clean Architecture의 의존성 규칙은?', options: ['외부에서 내부로', '내부에서 외부로', '양방향', '의존성 없음'], answer: 0, explanation: 'Clean Architecture는 외부(프레임워크)에서 내부(엔티티)로만 의존하도록 합니다.' }
      ]
    },
    {
      id: 'quality',
      name: '품질 관리',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'ISO 25010 품질 특성 중 신뢰성(Reliability)의 하위 특성이 아닌 것은?', options: ['성숙성', '가용성', '결함 허용성', '상호운용성'], answer: 3, explanation: '상호운용성은 호환성의 하위 특성입니다. 신뢰성은 성숙성, 가용성, 결함 허용성, 복구성을 포함합니다.' },
        { id: 2, question: 'SonarQube가 측정하지 않는 것은?', options: ['코드 커버리지', '코드 스멜', '사용자 만족도', '보안 취약점'], answer: 2, explanation: 'SonarQube는 정적 분석 도구로 코드 품질을 측정하며, 사용자 만족도는 측정하지 않습니다.' },
        { id: 3, question: '기술 부채(Technical Debt) 관리 방법이 아닌 것은?', options: ['부채 가시화', '점진적 상환 계획', '완전 무시', '리팩토링 스프린트'], answer: 2, explanation: '기술 부채는 가시화하고 점진적으로 상환해야 하며, 완전히 무시하면 비용이 급증합니다.' },
        { id: 4, question: 'DORA 메트릭이 아닌 것은?', options: ['배포 빈도', '변경 리드 타임', '코드 라인 수', '서비스 복구 시간'], answer: 2, explanation: 'DORA 메트릭은 배포 빈도, 리드 타임, 변경 실패율, MTTR입니다. 코드 라인 수는 포함되지 않습니다.' },
        { id: 5, question: 'Shift-Left Testing의 의미는?', options: ['테스트 지연', '테스트를 개발 초기 단계로', '운영 단계 테스트', '테스트 자동화 제거'], answer: 1, explanation: 'Shift-Left은 테스트를 개발 생명주기 초기(왼쪽)로 이동시켜 결함을 조기에 발견합니다.' },
        { id: 6, question: 'Chaos Engineering의 대표적인 도구는?', options: ['Jenkins', 'Chaos Monkey', 'SonarQube', 'Selenium'], answer: 1, explanation: 'Netflix의 Chaos Monkey가 대표적인 Chaos Engineering 도구입니다.' },
        { id: 7, question: 'Contract Testing의 목적은?', options: ['UI 테스트', 'API 계약 검증', '성능 테스트', '보안 테스트'], answer: 1, explanation: 'Contract Testing은 서비스 간 API 계약이 지켜지는지 검증합니다. Pact가 대표 도구입니다.' },
        { id: 8, question: '돌연변이 테스트(Mutation Testing)의 목적은?', options: ['코드 변경', '테스트 품질 검증', '성능 측정', '보안 점검'], answer: 1, explanation: '돌연변이 테스트는 코드에 인위적 결함을 주입하여 테스트가 이를 탐지하는지 검증합니다.' },
        { id: 9, question: 'Code Review의 효과가 아닌 것은?', options: ['지식 공유', '결함 조기 발견', '실행 성능 향상', '코드 품질 개선'], answer: 2, explanation: 'Code Review는 결함 발견, 지식 공유, 품질 개선에 효과적이지만 실행 성능과는 직접 관련 없습니다.' },
        { id: 10, question: 'SAST와 DAST의 차이점은?', options: ['SAST는 동적, DAST는 정적', 'SAST는 정적, DAST는 동적', '동일한 방식', 'SAST만 보안 점검'], answer: 1, explanation: 'SAST는 Static(소스코드 정적 분석), DAST는 Dynamic(실행 중 동적 분석) 보안 테스트입니다.' }
      ]
    },
    {
      id: 'project',
      name: '프로젝트 관리',
      color: 'from-green-500 to-green-400',
      questions: [
        { id: 1, question: 'Earned Value Management에서 CPI < 1의 의미는?', options: ['예산 절감', '예산 초과', '일정 지연', '범위 축소'], answer: 1, explanation: 'CPI(Cost Performance Index) < 1은 계획보다 비용이 많이 들어 예산 초과 상태입니다.' },
        { id: 2, question: 'SPI(Schedule Performance Index)의 계산식은?', options: ['EV/PV', 'EV/AC', 'PV/AC', 'AC/EV'], answer: 0, explanation: 'SPI = EV(Earned Value) / PV(Planned Value)입니다. SPI < 1이면 일정 지연입니다.' },
        { id: 3, question: '리스크 대응 전략 중 회피(Avoid)의 예시는?', options: ['보험 가입', '리스크 요소 제거', '아무 조치 안함', '제3자에게 이전'], answer: 1, explanation: '회피는 리스크가 발생하지 않도록 요소 자체를 제거하는 전략입니다.' },
        { id: 4, question: 'MoSCoW 우선순위에서 S가 의미하는 것은?', options: ['Skip', 'Should have', 'Sometimes', 'Stop'], answer: 1, explanation: 'MoSCoW: Must have, Should have, Could have, Won\'t have입니다.' },
        { id: 5, question: 'Work Breakdown Structure(WBS)의 최하위 단위는?', options: ['Phase', 'Deliverable', 'Work Package', 'Milestone'], answer: 2, explanation: 'WBS의 최하위 단위는 Work Package로, 일정과 비용 산정의 기준이 됩니다.' },
        { id: 6, question: 'RACI 차트에서 R의 의미는?', options: ['Review', 'Responsible', 'Required', 'Report'], answer: 1, explanation: 'RACI: Responsible(실행), Accountable(승인), Consulted(자문), Informed(통보)입니다.' },
        { id: 7, question: '애자일 추정 기법 중 상대적 크기 추정은?', options: ['기능점수', '스토리 포인트', '코드 라인 수', '시간 추정'], answer: 1, explanation: '스토리 포인트는 절대적 시간이 아닌 상대적 복잡도와 노력을 추정합니다.' },
        { id: 8, question: 'Critical Path Method에서 Float이 0인 경로의 의미는?', options: ['병렬 작업 가능', '지연 시 프로젝트 지연', '선택적 작업', '완료된 작업'], answer: 1, explanation: 'Float(여유시간) 0인 작업은 Critical Path에 있어 지연 시 전체 프로젝트가 지연됩니다.' },
        { id: 9, question: 'Definition of Done(DoD)의 목적은?', options: ['프로젝트 시작 조건', '완료 기준 명확화', '예산 승인', '팀 구성'], answer: 1, explanation: 'DoD는 기능이나 스프린트의 완료를 판단하는 명확한 기준을 정의합니다.' },
        { id: 10, question: '프로젝트 관리 지식체계(PMBOK)의 프로세스 그룹이 아닌 것은?', options: ['착수', '기획', '실행', '운영'], answer: 3, explanation: 'PMBOK 프로세스 그룹: 착수, 기획, 실행, 감시 및 통제, 종료입니다. 운영은 포함되지 않습니다.' }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps/MLOps',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'CI/CD에서 CI의 주요 목적은?', options: ['배포 자동화', '코드 통합 및 빌드 자동화', '인프라 관리', '모니터링'], answer: 1, explanation: 'CI(Continuous Integration)는 코드 변경을 자주 통합하고 자동 빌드/테스트합니다.' },
        { id: 2, question: 'Infrastructure as Code(IaC)의 대표 도구가 아닌 것은?', options: ['Terraform', 'Ansible', 'Jenkins', 'Pulumi'], answer: 2, explanation: 'Jenkins는 CI/CD 도구입니다. IaC 도구로는 Terraform, Ansible, Pulumi, CloudFormation 등이 있습니다.' },
        { id: 3, question: 'Blue-Green Deployment의 장점은?', options: ['리소스 절약', '무중단 배포 및 빠른 롤백', '점진적 트래픽 이동', '카나리 분석'], answer: 1, explanation: 'Blue-Green은 두 환경을 준비하여 무중단 배포와 즉시 롤백이 가능합니다.' },
        { id: 4, question: 'Canary Deployment의 특징은?', options: ['전체 트래픽 즉시 전환', '일부 트래픽으로 점진적 배포', '롤백 불가', '테스트 환경 전용'], answer: 1, explanation: 'Canary는 일부(예: 1%)의 트래픽만 새 버전으로 보내 검증 후 점진적으로 확대합니다.' },
        { id: 5, question: 'GitOps의 핵심 원칙이 아닌 것은?', options: ['Git을 Single Source of Truth로', '선언적 설정', '수동 배포 권장', '자동 동기화'], answer: 2, explanation: 'GitOps는 Git 저장소를 기준으로 자동화된 배포를 수행하며 수동 배포를 지양합니다.' },
        { id: 6, question: 'Kubernetes의 Pod에 대한 설명으로 올바르지 않은 것은?', options: ['최소 배포 단위', '하나 이상의 컨테이너 포함', '영구적 존재', 'IP 주소 할당'], answer: 2, explanation: 'Pod는 일시적(ephemeral)이며 재시작 시 새로운 Pod가 생성됩니다.' },
        { id: 7, question: 'MLOps의 특징이 아닌 것은?', options: ['ML 파이프라인 자동화', '모델 버저닝', '데이터 드리프트 모니터링', '수동 모델 배포만'], answer: 3, explanation: 'MLOps는 ML 모델의 자동화된 학습, 배포, 모니터링을 포함합니다.' },
        { id: 8, question: 'Feature Store의 목적은?', options: ['코드 저장', 'ML 피처의 재사용 및 관리', '모델 서빙', '로그 수집'], answer: 1, explanation: 'Feature Store는 ML 피처를 중앙에서 관리하고 학습/추론에서 재사용합니다.' },
        { id: 9, question: 'Observability의 세 가지 핵심 요소는?', options: ['CPU, Memory, Disk', 'Metrics, Logs, Traces', 'Build, Test, Deploy', 'Code, Data, Model'], answer: 1, explanation: 'Observability의 세 기둥은 Metrics(지표), Logs(로그), Traces(추적)입니다.' },
        { id: 10, question: 'SRE(Site Reliability Engineering)의 핵심 지표인 SLO의 의미는?', options: ['Service Level Objective', 'System Load Output', 'Software License Option', 'Security Log Output'], answer: 0, explanation: 'SLO(Service Level Objective)는 서비스 수준 목표로, 가용성, 지연 등의 목표치입니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('imp-swe-score'); if (saved) setScore(JSON.parse(saved)); }, []);

  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];

  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('imp-swe-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { const prompt = `정보관리기술사 소프트웨어공학 분야의 "${activeTpic.name}" 주제입니다:\n\n문제: ${question.question}\n\n선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${question.options[question.answer]}\n\n기술사 시험 답안 작성 관점에서 이 주제를 심층적으로 설명해주세요. 정의, 특징, 장단점, 적용 사례를 포함해주세요.`; setAiPrompt(prompt); setShowAIModal(true); };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-violet-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a><span className="text-gray-300">›</span><span className="text-violet-600 font-medium">소프트웨어공학</span></nav></div></header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚙️</span></div><div><h1 className="text-2xl font-bold">소프트웨어공학</h1><p className="text-violet-100">Software Engineering - 방법론, 아키텍처, 품질, DevOps</p></div></div><div className="mt-4 flex items-center gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span><span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span></div></div></section>

      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto"><div className="max-w-6xl mx-auto px-4"><div className="flex">{topics.map(topic => (<button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span></button>))}</div></div></div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4"><span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span><span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span></div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">{question.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'}`}><span className="font-medium mr-2">{idx + 1}.</span>{option}</button>))}</div>
          {showResult && (<div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}><p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}</p><p className="text-gray-600 mt-2 text-sm">{question.explanation}</p></div>)}
          <div className="flex justify-between mt-6"><button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition flex items-center gap-2">🤖 AI 해설</button><button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed">다음 문제 →</button></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6"><h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4><div className="space-y-3">{topics.map(topic => (<div key={topic.id}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{topic.name}</span><span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-300`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div></div></div>))}</div></div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div><p className="text-sm text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude나 ChatGPT에 붙여넣으세요.</p><div className="bg-gray-50 p-4 rounded-lg mb-4"><pre className="whitespace-pre-wrap text-sm text-gray-700">{aiPrompt}</pre></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('클립보드에 복사되었습니다!'); }} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">📋 프롬프트 복사하기</button></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
