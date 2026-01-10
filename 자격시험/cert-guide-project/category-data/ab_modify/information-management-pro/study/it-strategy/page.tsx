'use client';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function ITStrategyPage() {
  const [activeTopic, setActiveTopic] = useState<string>('ea');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'ea',
      name: 'EA(엔터프라이즈 아키텍처)',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: 'TOGAF ADM(Architecture Development Method)의 첫 번째 단계는?', options: ['비즈니스 아키텍처', '예비 단계(Preliminary)', '아키텍처 비전', '기회 및 솔루션'], answer: 1, explanation: 'TOGAF ADM은 Preliminary(예비) 단계에서 아키텍처 원칙과 프레임워크를 수립합니다.' },
        { id: 2, question: 'Zachman Framework의 특징은?', options: ['프로세스 중심', '분류 체계(Taxonomy)', '애자일 방법론', '단일 뷰 제공'], answer: 1, explanation: 'Zachman Framework는 What, How, Where, Who, When, Why의 6개 질문과 관점으로 구성된 분류 체계입니다.' },
        { id: 3, question: 'EA의 4대 아키텍처 영역이 아닌 것은?', options: ['비즈니스 아키텍처', '데이터 아키텍처', '네트워크 아키텍처', '기술 아키텍처'], answer: 2, explanation: 'EA의 4대 영역은 비즈니스, 데이터, 애플리케이션, 기술 아키텍처입니다.' },
        { id: 4, question: 'ArchiMate의 핵심 계층이 아닌 것은?', options: ['Business', 'Application', 'Technology', 'Security'], answer: 3, explanation: 'ArchiMate의 핵심 계층은 Business, Application, Technology이며 확장으로 Motivation, Implementation 등이 있습니다.' },
        { id: 5, question: 'EA 거버넌스의 목적은?', options: ['개발 속도 향상', '아키텍처 준수 및 변경 관리', '비용 증가', '조직 축소'], answer: 1, explanation: 'EA 거버넌스는 아키텍처 원칙 준수, 변경 관리, 의사결정 체계를 관리합니다.' },
        { id: 6, question: 'Target Architecture와 Baseline Architecture의 차이는?', options: ['동일한 개념', 'Target은 미래, Baseline은 현재 상태', 'Baseline이 미래 상태', '둘 다 과거 상태'], answer: 1, explanation: 'Baseline은 현재(As-Is) 아키텍처, Target은 목표(To-Be) 아키텍처입니다.' },
        { id: 7, question: 'EA 성숙도 모델의 최고 단계는?', options: ['정의됨', '관리됨', '최적화됨', '반복 가능'], answer: 2, explanation: 'EA 성숙도는 일반적으로 초기→반복가능→정의됨→관리됨→최적화됨 순으로 발전합니다.' },
        { id: 8, question: 'Reference Architecture의 목적은?', options: ['특정 프로젝트 전용', '재사용 가능한 표준 아키텍처 제공', '코드 작성', '테스트 자동화'], answer: 1, explanation: 'Reference Architecture는 특정 도메인에서 재사용 가능한 표준 아키텍처 템플릿입니다.' },
        { id: 9, question: 'TOGAF에서 Building Block의 종류는?', options: ['ABB와 SBB', 'TBB와 DBB', 'CBB와 PBB', 'FBB와 NBB'], answer: 0, explanation: 'TOGAF의 Building Block은 ABB(Architecture BB)와 SBB(Solution BB)로 구분됩니다.' },
        { id: 10, question: 'EA 도입의 효과가 아닌 것은?', options: ['IT 투자 최적화', '시스템 통합 촉진', '개발 복잡도 증가', '표준화 및 재사용'], answer: 2, explanation: 'EA는 복잡도를 관리하고 줄이는 것이 목적이며, 표준화와 재사용을 촉진합니다.' }
      ]
    },
    {
      id: 'governance',
      name: 'IT 거버넌스',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'COBIT의 최신 버전에서 강조하는 핵심 개념은?', options: ['프로세스만', '거버넌스와 관리 분리', '기술 중심', '단일 프레임워크'], answer: 1, explanation: 'COBIT 2019는 거버넌스(Governance)와 관리(Management)를 명확히 분리합니다.' },
        { id: 2, question: 'IT 거버넌스의 5대 핵심 영역(COBIT)이 아닌 것은?', options: ['가치 전달', '위험 관리', '자원 관리', '인사 관리'], answer: 3, explanation: 'COBIT의 5대 영역: 전략적 정렬, 가치 전달, 위험 관리, 자원 관리, 성과 측정입니다.' },
        { id: 3, question: 'IT 거버넌스와 IT 관리의 차이점은?', options: ['동일한 개념', '거버넌스는 방향 설정, 관리는 실행', '관리가 상위 개념', '거버넌스는 운영 담당'], answer: 1, explanation: '거버넌스는 전략적 방향과 감시, 관리는 계획 수립과 실행을 담당합니다.' },
        { id: 4, question: 'Val IT의 주요 관심사는?', options: ['보안 관리', 'IT 투자 가치 실현', '서비스 운영', '인력 관리'], answer: 1, explanation: 'Val IT는 IT 투자의 비즈니스 가치 실현을 관리하는 프레임워크입니다.' },
        { id: 5, question: 'IT 투자 포트폴리오 관리의 목적은?', options: ['모든 프로젝트 승인', '한정된 자원의 최적 배분', '비용 무제한 증가', '단일 프로젝트 집중'], answer: 1, explanation: 'IT 포트폴리오 관리는 제한된 자원을 가치 있는 투자에 최적으로 배분합니다.' },
        { id: 6, question: 'IT Balanced Scorecard의 관점이 아닌 것은?', options: ['고객 관점', '내부 프로세스', '학습과 성장', '경쟁사 관점'], answer: 3, explanation: 'BSC의 4가지 관점: 재무, 고객, 내부 프로세스, 학습과 성장입니다.' },
        { id: 7, question: 'IT 거버넌스 성숙도 평가의 목적은?', options: ['규정 준수 증명', '현재 수준 파악 및 개선 방향 도출', '예산 삭감', '인력 감축'], answer: 1, explanation: '성숙도 평가는 현재 수준을 진단하고 목표 수준과의 갭을 분석하여 개선합니다.' },
        { id: 8, question: 'Risk IT 프레임워크의 핵심 영역이 아닌 것은?', options: ['위험 거버넌스', '위험 평가', '위험 대응', '위험 무시'], answer: 3, explanation: 'Risk IT는 위험 거버넌스, 위험 평가, 위험 대응의 세 영역으로 구성됩니다.' },
        { id: 9, question: '디지털 거버넌스가 전통적 IT 거버넌스와 다른 점은?', options: ['동일함', '빠른 변화와 혁신 대응', '변화 거부', '기술 무시'], answer: 1, explanation: '디지털 거버넌스는 빠른 기술 변화, 데이터 활용, 디지털 혁신을 고려합니다.' },
        { id: 10, question: 'IT 거버넌스 체계에서 CIO의 역할은?', options: ['운영만 담당', 'IT 전략 수립 및 비즈니스 연계', '개발만 담당', '외부 영업'], answer: 1, explanation: 'CIO는 IT 전략을 수립하고 비즈니스 전략과 연계하는 역할을 수행합니다.' }
      ]
    },
    {
      id: 'itsm',
      name: 'ITSM/ITIL',
      color: 'from-green-500 to-green-400',
      questions: [
        { id: 1, question: 'ITIL 4의 서비스 가치 시스템(SVS) 구성요소가 아닌 것은?', options: ['지도 원칙', '서비스 가치 사슬', '폭포수 프로세스', '지속적 개선'], answer: 2, explanation: 'SVS는 지도 원칙, 거버넌스, 서비스 가치 사슬, 실천 방법, 지속적 개선으로 구성됩니다.' },
        { id: 2, question: 'ITIL 4의 서비스 가치 사슬 활동이 아닌 것은?', options: ['Plan', 'Engage', 'Deploy', 'Develop'], answer: 2, explanation: '서비스 가치 사슬: Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support입니다. Deploy는 없습니다.' },
        { id: 3, question: 'Incident와 Problem의 차이점은?', options: ['동일한 개념', 'Incident는 증상, Problem은 근본 원인', 'Problem이 먼저 발생', 'Incident만 관리'], answer: 1, explanation: 'Incident는 서비스 중단 증상을 복구하고, Problem은 근본 원인을 분석하여 재발을 방지합니다.' },
        { id: 4, question: 'Change Management의 목적은?', options: ['변경 거부', '변경으로 인한 위험 최소화', '모든 변경 즉시 적용', '변경 기록 삭제'], answer: 1, explanation: 'Change Management는 변경의 위험을 평가하고 통제하여 서비스 영향을 최소화합니다.' },
        { id: 5, question: 'SLA(Service Level Agreement)의 구성요소가 아닌 것은?', options: ['서비스 범위', '성과 지표', '책임과 역할', '개발 방법론'], answer: 3, explanation: 'SLA는 서비스 범위, 성과 지표(KPI), 책임, 보고 체계, 분쟁 해결 등을 포함합니다.' },
        { id: 6, question: 'CMDB(Configuration Management Database)의 용도는?', options: ['코드 저장', 'IT 자산 및 관계 관리', '사용자 인증', '네트워크 모니터링'], answer: 1, explanation: 'CMDB는 IT 자산(CI)과 그들 간의 관계를 저장하여 변경 영향 분석에 활용합니다.' },
        { id: 7, question: 'ITIL 4의 지도 원칙이 아닌 것은?', options: ['가치에 집중', '현재 상태에서 시작', '피드백을 통한 반복', '완벽을 추구'], answer: 3, explanation: '지도 원칙: 가치 집중, 현재 상태에서 시작, 피드백 반복, 협업, 전체적 사고, 단순화, 자동화입니다.' },
        { id: 8, question: 'Service Desk의 역할은?', options: ['시스템 개발', '사용자 단일 연락 창구', '네트워크 설계', '데이터 분석'], answer: 1, explanation: 'Service Desk는 사용자의 단일 연락 창구(SPOC)로 인시던트, 요청을 접수합니다.' },
        { id: 9, question: 'Continual Improvement의 핵심은?', options: ['일회성 개선', '지속적인 개선 문화', '현상 유지', '비용 절감만'], answer: 1, explanation: 'Continual Improvement는 서비스와 프로세스를 지속적으로 개선하는 문화와 체계입니다.' },
        { id: 10, question: 'CAB(Change Advisory Board)의 역할은?', options: ['모든 변경 직접 실행', '변경 요청 검토 및 승인 자문', '인시던트 처리', '용량 계획'], answer: 1, explanation: 'CAB는 중요 변경 요청을 검토하고 변경 관리자에게 승인을 자문합니다.' }
      ]
    },
    {
      id: 'dx',
      name: '디지털 전환',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: '디지털 전환(DX)의 핵심 요소가 아닌 것은?', options: ['고객 경험 혁신', '운영 프로세스 최적화', '기존 방식 고수', '비즈니스 모델 혁신'], answer: 2, explanation: '디지털 전환은 기존 방식을 혁신하여 고객 경험, 운영, 비즈니스 모델을 변화시킵니다.' },
        { id: 2, question: 'API Economy의 의미는?', options: ['API 판매만', 'API를 통한 가치 창출 생태계', 'API 폐쇄', '내부 시스템만'], answer: 1, explanation: 'API Economy는 API를 통해 서비스를 연결하고 새로운 비즈니스 가치를 창출하는 생태계입니다.' },
        { id: 3, question: 'Platform Business Model의 특징이 아닌 것은?', options: ['네트워크 효과', '다면 시장', '선형적 가치 사슬', '생태계 구축'], answer: 2, explanation: '플랫폼 비즈니스는 선형적 가치 사슬이 아닌 네트워크 효과 기반의 생태계를 구축합니다.' },
        { id: 4, question: 'Data-Driven Decision Making의 핵심은?', options: ['직관에 의존', '데이터 기반 의사결정', '데이터 무시', '경험만 중시'], answer: 1, explanation: 'Data-Driven은 데이터 분석 결과를 기반으로 객관적인 의사결정을 수행합니다.' },
        { id: 5, question: 'Customer Journey Map의 목적은?', options: ['내부 프로세스 최적화만', '고객 경험 전 과정 시각화', '비용 절감', '시스템 통합'], answer: 1, explanation: 'Customer Journey Map은 고객이 서비스를 경험하는 전 과정을 시각화하여 개선점을 도출합니다.' },
        { id: 6, question: '디지털 성숙도 평가의 목적은?', options: ['현재 디지털 역량 진단', '기술 도입 거부', '조직 축소', '비용만 측정'], answer: 0, explanation: '디지털 성숙도 평가는 조직의 현재 디지털 역량을 진단하고 발전 방향을 제시합니다.' },
        { id: 7, question: 'Two-Speed IT의 개념은?', options: ['모든 것을 느리게', '안정성(Legacy)과 민첩성(Digital) 공존', '새 기술만 사용', '레거시만 유지'], answer: 1, explanation: 'Two-Speed IT는 안정적인 레거시 시스템과 민첩한 디지털 서비스가 공존하는 접근입니다.' },
        { id: 8, question: 'Product-Centric IT의 특징이 아닌 것은?', options: ['지속적 개선', '고객 가치 중심', '프로젝트 종료 후 관계 종료', '크로스펑셔널 팀'], answer: 2, explanation: 'Product-Centric은 프로젝트 종료가 아닌 제품의 지속적 개선과 운영을 강조합니다.' },
        { id: 9, question: '디지털 전환 성공 요인이 아닌 것은?', options: ['경영진 리더십', '변화 관리', '기술만 도입', '조직 문화 변화'], answer: 2, explanation: '디지털 전환은 기술뿐 아니라 리더십, 문화, 조직, 프로세스 변화가 필수입니다.' },
        { id: 10, question: 'Composable Enterprise의 특징은?', options: ['모놀리식 시스템', '모듈화되고 조합 가능한 구성', '변경 불가', '단일 벤더 종속'], answer: 1, explanation: 'Composable Enterprise는 비즈니스 역량을 모듈화하여 필요에 따라 조합하고 재구성합니다.' }
      ]
    },
    {
      id: 'investment',
      name: 'IT 투자 관리',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'TCO(Total Cost of Ownership)에 포함되지 않는 것은?', options: ['초기 구매 비용', '운영 비용', '경쟁사 비용', '유지보수 비용'], answer: 2, explanation: 'TCO는 초기 구매, 설치, 운영, 유지보수, 교육, 폐기 비용을 포함합니다.' },
        { id: 2, question: 'ROI(Return on Investment) 계산식은?', options: ['(이익-비용)/비용×100', '이익×비용', '비용/이익', '이익+비용'], answer: 0, explanation: 'ROI = (이익 - 투자비용) / 투자비용 × 100%입니다.' },
        { id: 3, question: 'NPV(Net Present Value)가 양수인 경우의 의미는?', options: ['투자 손실', '투자 가치 있음', '현금 부족', '위험 높음'], answer: 1, explanation: 'NPV > 0이면 투자의 현재 가치가 비용보다 커서 투자 가치가 있습니다.' },
        { id: 4, question: 'IT 투자 유형 중 "Run the Business"의 의미는?', options: ['새로운 혁신', '기존 운영 유지', '사업 확장', '인수합병'], answer: 1, explanation: 'Run은 기존 운영 유지, Grow는 성장, Transform은 혁신을 위한 투자입니다.' },
        { id: 5, question: 'IT 예산 편성 방식 중 제로베이스 예산의 특징은?', options: ['전년 대비 증감', '매년 백지 상태에서 검토', '고정 예산', '무제한 예산'], answer: 1, explanation: '제로베이스 예산은 전년도 기준 없이 매년 모든 항목을 새로 검토하고 정당화합니다.' },
        { id: 6, question: 'IRR(Internal Rate of Return)이 요구수익률보다 높으면?', options: ['투자 기각', '투자 승인', '추가 분석 필요', '의미 없음'], answer: 1, explanation: 'IRR > 요구수익률이면 투자 가치가 있어 승인 가능합니다.' },
        { id: 7, question: 'Payback Period의 한계점은?', options: ['계산 복잡', '화폐의 시간 가치 미반영', '위험 과대 평가', '모든 비용 포함'], answer: 1, explanation: '회수 기간법은 화폐의 시간 가치를 고려하지 않고 회수 후 현금흐름을 무시합니다.' },
        { id: 8, question: 'IT Chargeback의 목적은?', options: ['IT 비용 숨기기', 'IT 비용의 부서별 할당', '중앙 예산 집중', 'IT 인력 감축'], answer: 1, explanation: 'Chargeback은 IT 비용을 사용 부서에 할당하여 비용 인식과 효율적 사용을 유도합니다.' },
        { id: 9, question: 'FinOps의 목적은?', options: ['재무 부서만', '클라우드 비용 최적화', '개발 중단', '온프레미스 전환'], answer: 1, explanation: 'FinOps는 클라우드 비용을 가시화하고 최적화하는 운영 모델입니다.' },
        { id: 10, question: '비용-편익 분석에서 무형 편익의 예시는?', options: ['하드웨어 절감', '인건비 절감', '고객 만족도 향상', '전력 비용 절감'], answer: 2, explanation: '무형 편익은 고객 만족도, 브랜드 가치, 직원 사기 등 화폐로 측정하기 어려운 편익입니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('imp-its-score'); if (saved) setScore(JSON.parse(saved)); }, []);
  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];
  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('imp-its-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { const prompt = `정보관리기술사 IT전략/거버넌스 분야의 "${activeTpic.name}" 주제입니다:\n\n문제: ${question.question}\n\n선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${question.options[question.answer]}\n\n기술사 시험 답안 작성 관점에서 이 주제를 심층적으로 설명해주세요.`; setAiPrompt(prompt); setShowAIModal(true); };
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-violet-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a><span className="text-gray-300">›</span><span className="text-violet-600 font-medium">IT 전략/거버넌스</span></nav></div></header>
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📊</span></div><div><h1 className="text-2xl font-bold">IT 전략/거버넌스</h1><p className="text-violet-100">IT Strategy & Governance - EA, COBIT, ITIL, 디지털 전환</p></div></div><div className="mt-4 flex items-center gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span><span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span></div></div></section>
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
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div><p className="text-sm text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude나 ChatGPT에 붙여넣으세요.</p><div className="bg-gray-50 p-4 rounded-lg mb-4"><pre className="whitespace-pre-wrap text-sm text-gray-700">{aiPrompt}</pre></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('클립보드에 복사되었습니다!'); }} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">📋 프롬프트 복사하기</button></div></div>)}
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
