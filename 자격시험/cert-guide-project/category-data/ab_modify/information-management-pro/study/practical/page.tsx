'use client';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function PracticalPage() {
  const [activeTopic, setActiveTopic] = useState<string>('short');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'short',
      name: '단답형 기출',
      color: 'from-violet-500 to-violet-400',
      questions: [
        { id: 1, question: '데이터 웨어하우스의 OLAP 연산 중 Drill-Down의 의미는?', options: ['요약 데이터로 이동', '상세 데이터로 이동', '다른 차원으로 이동', '데이터 필터링'], answer: 1, explanation: 'Drill-Down은 요약에서 상세로 이동(예: 연도→분기→월)하는 연산입니다. 반대는 Roll-Up.' },
        { id: 2, question: 'API Gateway에서 Rate Limiting의 목적은?', options: ['성능 향상', 'API 호출 빈도 제한으로 서비스 보호', '데이터 암호화', '로드 밸런싱'], answer: 1, explanation: 'Rate Limiting은 과도한 API 호출을 제한하여 서비스 가용성을 보호합니다.' },
        { id: 3, question: 'Kubernetes에서 Horizontal Pod Autoscaler의 역할은?', options: ['수직 확장', 'CPU/메모리 기반 Pod 수 자동 조정', '네트워크 설정', '스토리지 관리'], answer: 1, explanation: 'HPA는 메트릭 기반으로 Pod 복제본 수를 자동으로 조정합니다.' },
        { id: 4, question: 'CI/CD에서 Blue-Green Deployment와 Canary의 주요 차이점은?', options: ['동일한 방식', 'Blue-Green은 전체 전환, Canary는 점진적', 'Canary가 비용이 낮음', 'Blue-Green만 롤백 가능'], answer: 1, explanation: 'Blue-Green은 전체 트래픽을 전환하고, Canary는 일부 트래픽으로 시작하여 점진적으로 확대합니다.' },
        { id: 5, question: 'OAuth 2.0의 Access Token과 Refresh Token의 차이는?', options: ['동일한 용도', 'Access는 단기, Refresh는 Access 갱신용', 'Refresh가 더 짧은 수명', 'Access만 필요'], answer: 1, explanation: 'Access Token은 짧은 수명으로 리소스 접근에, Refresh Token은 Access Token 갱신에 사용됩니다.' }
      ]
    },
    {
      id: 'essay',
      name: '서술형 기출',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: '마이크로서비스 아키텍처 도입 시 고려해야 할 주요 사항을 서술하시오.', options: ['기술 스택만', '서비스 분리, 데이터 관리, 통신, 모니터링, 조직', '비용만', 'UI만'], answer: 1, explanation: '마이크로서비스 도입 시 서비스 경계 정의, 분산 데이터 관리, 서비스 간 통신, 모니터링/로깅, 조직 구조 변화를 고려해야 합니다.' },
        { id: 2, question: 'DevOps 문화 도입을 위한 조직 변화 관리 방안을 설명하시오.', options: ['기술 도입만', '문화, 프로세스, 도구, 측정 지표 통합 접근', '인력 감축', '외주 확대'], answer: 1, explanation: 'DevOps 성공을 위해 협업 문화, CI/CD 프로세스, 자동화 도구, DORA 메트릭 등을 통합적으로 접근해야 합니다.' },
        { id: 3, question: '데이터 거버넌스 체계 수립 시 핵심 구성요소를 설명하시오.', options: ['기술만', '조직, 정책, 프로세스, 기술, 메트릭', '외부 컨설팅만', '데이터만'], answer: 1, explanation: '데이터 거버넌스는 조직(역할/책임), 정책/표준, 프로세스, 기술 인프라, 품질 메트릭으로 구성됩니다.' },
        { id: 4, question: '클라우드 마이그레이션 전략(6R)을 설명하고 각각의 적용 상황을 기술하시오.', options: ['한 가지만', 'Rehost, Replatform, Repurchase, Refactor, Retire, Retain', '이론만', '비용만'], answer: 1, explanation: '6R: Rehost(Lift&Shift), Replatform(최소 변경), Repurchase(SaaS 전환), Refactor(재설계), Retire(폐기), Retain(유지)' },
        { id: 5, question: 'Zero Trust 보안 모델의 구현 방안과 기대 효과를 서술하시오.', options: ['기존 경계 보안', '신원 확인, 최소 권한, 지속적 검증, 마이크로 세분화', 'VPN만', '방화벽만'], answer: 1, explanation: 'Zero Trust는 신원 확인, 최소 권한 원칙, 지속적 검증, 네트워크 마이크로 세분화를 통해 보안을 강화합니다.' }
      ]
    },
    {
      id: 'case',
      name: '사례 분석',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: '대규모 레거시 시스템을 클라우드로 전환할 때 가장 적절한 접근 방식은?', options: ['빅뱅 전환', '점진적 마이그레이션(Strangler Fig 패턴)', '전환 포기', '새 시스템만 개발'], answer: 1, explanation: '레거시 시스템은 Strangler Fig 패턴으로 점진적으로 기능을 이전하여 위험을 줄입니다.' },
        { id: 2, question: '실시간 데이터 처리가 필요한 IoT 플랫폼 구축 시 적절한 아키텍처는?', options: ['배치 처리만', 'Lambda/Kappa 아키텍처 + Edge Computing', '단일 서버', '파일 기반'], answer: 1, explanation: '실시간 IoT는 Edge에서 전처리, Kafka로 스트리밍, Lambda/Kappa로 배치+실시간 처리를 병행합니다.' },
        { id: 3, question: 'MSA 환경에서 분산 트랜잭션 문제 해결을 위한 패턴은?', options: ['2PC만', 'Saga 패턴(Choreography/Orchestration)', '무시', '모놀리식 전환'], answer: 1, explanation: 'MSA에서는 Saga 패턴으로 각 서비스의 로컬 트랜잭션과 보상 트랜잭션으로 일관성을 유지합니다.' },
        { id: 4, question: 'AI/ML 모델의 프로덕션 배포 및 운영을 위한 플랫폼 구성 요소는?', options: ['모델만', 'Feature Store, Model Registry, Serving, Monitoring', '개발 환경만', '데이터만'], answer: 1, explanation: 'MLOps 플랫폼은 Feature Store, Model Registry, Model Serving, Monitoring, A/B Testing을 포함합니다.' },
        { id: 5, question: '하이브리드 클라우드 환경에서 일관된 보안 정책 적용 방안은?', options: ['각각 별도 관리', 'SASE, CSPM, 통합 IAM', '보안 무시', '온프레미스만 보안'], answer: 1, explanation: '하이브리드 환경은 SASE(Secure Access Service Edge), CSPM, 통합 IAM으로 일관된 보안을 적용합니다.' }
      ]
    },
    {
      id: 'interview',
      name: '면접 대비',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: '기술사로서 가장 중요하게 생각하는 역량은?', options: ['코딩 능력만', '기술 전문성, 의사소통, 리더십, 윤리의식', '관리만', '영업만'], answer: 1, explanation: '기술사는 기술 전문성뿐 아니라 의사소통, 리더십, 사회적 책임, 윤리의식이 중요합니다.' },
        { id: 2, question: '디지털 전환 프로젝트에서 기술사의 역할은?', options: ['개발만', '전략 수립, 아키텍처 설계, 기술 자문, 변화 관리', '운영만', '외주 관리만'], answer: 1, explanation: '기술사는 DX 전략 수립, 기술 아키텍처 설계, 이해관계자 조율, 변화 관리를 주도합니다.' },
        { id: 3, question: '프로젝트 실패 경험과 교훈을 설명하시오.', options: ['실패 없음만', '원인 분석, 배운 점, 개선 사항 구체적 설명', '책임 회피', '기술 탓만'], answer: 1, explanation: '실패 경험을 솔직히 인정하고, 근본 원인 분석, 배운 교훈, 이후 개선 사항을 구체적으로 설명합니다.' },
        { id: 4, question: '최신 기술 트렌드 중 가장 주목하는 것과 이유는?', options: ['트렌드 무시', '선택한 기술의 개념, 발전 방향, 비즈니스 영향 설명', '모든 기술 동일', '과거 기술만'], answer: 1, explanation: '주목하는 기술(예: 생성형 AI, 양자컴퓨팅)의 개념, 발전 방향, 산업 영향을 자신의 관점으로 설명합니다.' },
        { id: 5, question: '기술사 취득 후 계획과 비전은?', options: ['취득이 목표', '전문 분야 심화, 후배 육성, 사회 기여', '은퇴', '전직'], answer: 1, explanation: '기술사 취득 후 전문 분야 심화, 후배 기술사 육성, 기술 자문, 사회 기여 등 구체적 비전을 제시합니다.' }
      ]
    },
    {
      id: 'strategy',
      name: '답안 작성 전략',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: '단답형 문제의 효과적인 답안 구조는?', options: ['나열만', '정의→특징→장단점→적용사례', '결론만', '서론만'], answer: 1, explanation: '단답형은 정의→특징(구성요소)→장단점→적용사례/동향 순으로 핵심을 간결하게 작성합니다.' },
        { id: 2, question: '서술형 문제에서 도표/다이어그램 활용의 효과는?', options: ['불필요', '내용 구조화, 가독성 향상, 전문성 표현', '감점 요인', '시간 낭비'], answer: 1, explanation: '적절한 도표와 다이어그램은 내용을 구조화하고 가독성을 높여 전문성을 보여줍니다.' },
        { id: 3, question: '기술사 답안에서 실무 경험 언급의 중요성은?', options: ['불필요', '이론과 실무 연계로 신뢰성 향상', '이론만 중요', '경험 숨기기'], answer: 1, explanation: '실무 경험을 언급하면 이론적 지식이 실제로 적용 가능함을 보여주어 신뢰성이 높아집니다.' },
        { id: 4, question: '시간 관리를 위한 답안 작성 전략은?', options: ['첫 문제에 집중', '배점 비례 시간 배분, 아는 문제 먼저', '마지막에 몰아서', '시간 무시'], answer: 1, explanation: '배점에 비례하여 시간을 배분하고, 확실한 문제부터 작성하여 점수를 확보합니다.' },
        { id: 5, question: '답안 작성 시 최신 동향 반영의 효과는?', options: ['불필요', '기술 트렌드 인식과 전문성 표현', '혼란 유발', '감점 요인'], answer: 1, explanation: '최신 기술 동향을 반영하면 지속적 학습과 현업 감각을 갖춘 전문가임을 보여줍니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('imp-prac-score'); if (saved) setScore(JSON.parse(saved)); }, []);
  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];
  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('imp-prac-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { const prompt = `정보관리기술사 시험 대비 "${activeTpic.name}" 주제입니다:\n\n문제: ${question.question}\n\n선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${question.options[question.answer]}\n\n기술사 시험 답안 작성 관점에서 이 주제에 대한 모범 답안을 작성해주세요. 서론-본론-결론 구조로 구체적인 예시를 포함해주세요.`; setAiPrompt(prompt); setShowAIModal(true); };
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-violet-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a><span className="text-gray-300">›</span><span className="text-violet-600 font-medium">실전 대비</span></nav></div></header>
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🎯</span></div><div><h1 className="text-2xl font-bold">실전 대비</h1><p className="text-violet-100">기출문제, 사례분석, 면접 대비, 답안 작성 전략</p></div></div><div className="mt-4 flex items-center gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span><span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span></div></div></section>
      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto"><div className="max-w-6xl mx-auto px-4"><div className="flex">{topics.map(topic => (<button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span></button>))}</div></div></div>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4"><span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span><span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span></div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">{question.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'}`}><span className="font-medium mr-2">{idx + 1}.</span>{option}</button>))}</div>
          {showResult && (<div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}><p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}</p><p className="text-gray-600 mt-2 text-sm">{question.explanation}</p></div>)}
          <div className="flex justify-between mt-6"><button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">🤖 AI 모범답안</button><button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50">다음 문제 →</button></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6"><h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4><div className="space-y-3">{topics.map(topic => (<div key={topic.id}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{topic.name}</span><span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${topic.color}`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div></div></div>))}</div></div>
      </main>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div><p className="text-sm text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude나 ChatGPT에 붙여넣으세요.</p><div className="bg-gray-50 p-4 rounded-lg mb-4"><pre className="whitespace-pre-wrap text-sm text-gray-700">{aiPrompt}</pre></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('클립보드에 복사되었습니다!'); }} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">📋 프롬프트 복사하기</button></div></div>)}
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
