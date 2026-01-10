'use client';

import { useState } from 'react';

export default function InformationManagementProExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-violet-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보관리기술사 시험 상세</h1>
              <p className="text-violet-100">Professional Engineer Information Management - 최고급 IT 전문자격</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-violet-500 text-violet-600 bg-violet-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'interview'
                  ? 'border-violet-500 text-violet-600 bg-violet-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🎤 면접시험
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <InterviewExamContent />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 Q-Net에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

function WrittenExamContent() {
  const subjects = [
    {
      id: 1,
      name: '데이터 아키텍처',
      difficulty: 5,
      passRate: '8%',
      color: 'violet',
      topics: [
        '데이터 모델링 (개념/논리/물리)',
        '데이터베이스 설계 (정규화, 반정규화)',
        '빅데이터 아키텍처 (Lambda, Kappa)',
        '데이터 품질관리 (DQM)',
        'NoSQL/NewSQL (MongoDB, Cassandra)',
        '데이터 거버넌스',
        '데이터 레이크/웨어하우스',
        'MDM (마스터 데이터 관리)',
      ],
      tips: [
        '데이터 모델링 3단계 프로세스',
        'ERD 작성 및 해석 능력',
        '빅데이터 플랫폼 아키텍처',
        '실제 프로젝트 사례 연계',
      ],
      studyLink: '/category/it/information-management-pro/study/data-architecture',
    },
    {
      id: 2,
      name: '소프트웨어 공학',
      difficulty: 4,
      passRate: '10%',
      color: 'purple',
      topics: [
        '개발 방법론 (Agile, DevOps, SAFe)',
        'SW 아키텍처 패턴 (MSA, Event-Driven)',
        'SW 품질관리 (ISO 25010)',
        '프로젝트 관리 (PMBOK, Scrum)',
        'CI/CD 파이프라인',
        'MLOps/DataOps',
        '기술 부채 관리',
        '코드 리뷰 및 정적 분석',
      ],
      tips: [
        'Agile vs Waterfall 비교',
        'MSA 설계 원칙',
        '품질 메트릭 정의',
        'DevOps 문화와 도구',
      ],
      studyLink: '/category/it/information-management-pro/study/sw-engineering',
    },
    {
      id: 3,
      name: 'IT 전략/거버넌스',
      difficulty: 4,
      passRate: '9%',
      color: 'indigo',
      topics: [
        'EA (Enterprise Architecture)',
        'IT 거버넌스 (COBIT)',
        'ITSM/ITIL 4',
        '디지털 전환(DX) 전략',
        'IT 투자관리 (ROI, TCO)',
        'IT 조직 및 인력 관리',
        'BCP/DR (업무연속성)',
        'IT 감사 및 컴플라이언스',
      ],
      tips: [
        'EA 프레임워크 (TOGAF)',
        'ITIL 4 서비스 가치 체계',
        'DX 성공 사례 분석',
        'IT 성과 지표 설정',
      ],
      studyLink: '/category/it/information-management-pro/study/it-strategy',
    },
    {
      id: 4,
      name: '신기술 동향',
      difficulty: 5,
      passRate: '7%',
      color: 'blue',
      topics: [
        '클라우드 컴퓨팅 (AWS, Azure, GCP)',
        'AI/ML (생성형 AI, LLM)',
        '블록체인 (DeFi, NFT, CBDC)',
        '보안 기술 (Zero Trust, SASE)',
        'IoT/엣지 컴퓨팅',
        '메타버스/XR',
        '양자 컴퓨팅',
        '디지털 트윈',
      ],
      tips: [
        '최신 기술 트렌드 지속 학습',
        '기술의 비즈니스 가치',
        '실제 적용 사례 수집',
        '기술 도입 시 고려사항',
      ],
      studyLink: '/category/it/information-management-pro/study/emerging-tech',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">단답형+서술형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">4시간</p>
            <p className="text-sm text-gray-500">총 시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">60점 이상</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>💡 기술사 시험 특징:</strong> 단순 암기보다 실무 경험과 논리적 사고력, 문제 해결 능력을 평가합니다.
          </p>
        </div>
      </div>

      {/* Exam Structure */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 구성</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-violet-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-bold">1교시</span>
              <h3 className="font-bold text-violet-700">단답형 (100분)</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                10~13문제 중 10문제 선택
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                각 문제당 10점 배점
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                핵심 개념을 간결하게 설명
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                A4 1/3~1/2 분량 권장
              </li>
            </ul>
            <div className="mt-4 p-3 bg-violet-50 rounded-lg">
              <p className="text-xs text-violet-700">
                <strong>작성 순서:</strong> 정의 → 특징/구성요소 → 장단점 → 활용사례
              </p>
            </div>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">2교시</span>
              <h3 className="font-bold text-purple-700">서술형 (100분)</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                4~6문제 중 4문제 선택
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                각 문제당 25점 배점
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                심층적인 분석과 논술 요구
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                A4 2~3페이지 분량 권장
              </li>
            </ul>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                <strong>작성 순서:</strong> 서론(배경) → 본론(분석/비교) → 결론(제언/전망)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📚 출제 분야별 상세</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              subject.color === 'violet' ? 'from-violet-500 to-violet-400' :
              subject.color === 'purple' ? 'from-purple-500 to-purple-400' :
              subject.color === 'indigo' ? 'from-indigo-500 to-indigo-400' :
              'from-blue-500 to-blue-400'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {subject.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-sm opacity-80">합격률 약 {subject.passRate}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= subject.difficulty ? 'text-yellow-300' : 'text-white/30'}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">📖 출제 범위</h4>
                  <ul className="space-y-2">
                    {subject.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-violet-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'violet' ? 'bg-violet-500 hover:bg-violet-600' :
                        subject.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        subject.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        'bg-blue-500 hover:bg-blue-600'
                      } text-white rounded-lg transition text-sm font-medium`}
                    >
                      📚 {subject.name} 학습하기 →
                    </a>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">💡 학습 팁</h4>
                  <ul className="space-y-2">
                    {subject.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-violet-600 mb-3">1교시 - 단답형 (100분)</h3>
            <div className="space-y-2">
              {[
                { task: '문제 파악 및 선택', time: '5분', color: 'bg-gray-400' },
                { task: '10문제 작성 (문제당 8분)', time: '80분', color: 'bg-violet-500' },
                { task: '검토 및 보완', time: '15분', color: 'bg-violet-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="flex-1 text-gray-700 text-sm">{item.task}</span>
                  <span className="font-bold text-gray-800 text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-purple-600 mb-3">2교시 - 서술형 (100분)</h3>
            <div className="space-y-2">
              {[
                { task: '문제 파악 및 선택', time: '5분', color: 'bg-gray-400' },
                { task: '4문제 작성 (문제당 22분)', time: '88분', color: 'bg-purple-500' },
                { task: '검토 및 보완', time: '7분', color: 'bg-purple-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="flex-1 text-gray-700 text-sm">{item.task}</span>
                  <span className="font-bold text-gray-800 text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategy */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 필기 합격 전략</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
            <h3 className="font-bold text-violet-700 mb-2">1단계: 기본기</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 토픽별 정의/개념 정리</li>
              <li>• 기출문제 유형 파악</li>
              <li>• 답안 작성 틀 연습</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">2단계: 심화</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 실무 경험 사례화</li>
              <li>• 토픽 간 연계 학습</li>
              <li>• 모의고사 풀이</li>
            </ul>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="font-bold text-indigo-700 mb-2">3단계: 마무리</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 예상 문제 답안 작성</li>
              <li>• 시간 내 완성 연습</li>
              <li>• 최신 이슈 정리</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Answer Writing Guide */}
      <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">✍️ 답안 작성 가이드</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-violet-600 mb-3">단답형 답안 구조</h4>
            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2"><span className="font-bold text-violet-500">1.</span> 정의 (What)</li>
              <li className="flex gap-2"><span className="font-bold text-violet-500">2.</span> 특징/구성요소 (Feature)</li>
              <li className="flex gap-2"><span className="font-bold text-violet-500">3.</span> 장단점/비교 (Compare)</li>
              <li className="flex gap-2"><span className="font-bold text-violet-500">4.</span> 적용/활용 (How)</li>
            </ol>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-3">서술형 답안 구조</h4>
            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2"><span className="font-bold text-purple-500">I.</span> 서론 - 배경, 필요성, 정의</li>
              <li className="flex gap-2"><span className="font-bold text-purple-500">II.</span> 본론 - 상세 분석, 비교, 사례</li>
              <li className="flex gap-2"><span className="font-bold text-purple-500">III.</span> 결론 - 시사점, 향후 전망, 제언</li>
            </ol>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> 도표, 그림, 수식을 적절히 활용하면 가독성과 전문성이 높아집니다.
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-200">
        <h2 className="text-xl font-bold text-amber-800 mb-4">⚠️ 필기시험 주의사항</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>문제 선택:</strong> 자신 있는 문제부터 선택, 어려운 문제는 과감히 포기</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>분량 조절:</strong> 단답형은 너무 길게 쓰지 않고, 서술형은 충분히 작성</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>용어 정확성:</strong> 기술 용어의 정확한 표기와 약어 설명 필수</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>글씨체:</strong> 채점자가 읽기 쉽도록 또박또박 작성</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewExamContent() {
  const interviewTopics = [
    {
      category: '기술 심층 질문',
      icon: '💻',
      color: 'violet',
      topics: [
        '필기시험 답안 검증 질문',
        '기술적 깊이 확인',
        '실무 적용 능력 검증',
        '문제 해결 접근법',
        '기술 선택 이유 설명',
      ],
      examples: [
        '"필기시험에서 MSA에 대해 작성하셨는데, 실제 도입 시 고려사항은?"',
        '"데이터 마이그레이션 프로젝트에서 발생할 수 있는 리스크는?"',
      ],
    },
    {
      category: '프로젝트 경험',
      icon: '📂',
      color: 'purple',
      topics: [
        '주요 프로젝트 상세 설명',
        '본인의 역할과 기여도',
        '어려움 극복 사례',
        '프로젝트 성과와 교훈',
        '실패 경험 및 개선점',
      ],
      examples: [
        '"가장 어려웠던 프로젝트와 극복 방법은?"',
        '"프로젝트에서 기술적 결정을 내린 사례를 설명해주세요"',
      ],
    },
    {
      category: '리더십/관리',
      icon: '👔',
      color: 'indigo',
      topics: [
        '팀 관리 및 멘토링 경험',
        '이해관계자 조정 사례',
        '기술 의사결정 과정',
        '후배 육성 방법',
        '갈등 해결 경험',
      ],
      examples: [
        '"팀원 간 기술적 의견 충돌 시 어떻게 조율하시나요?"',
        '"기술 리더로서 가장 중요하게 생각하는 역량은?"',
      ],
    },
    {
      category: '최신 동향/비전',
      icon: '🔮',
      color: 'blue',
      topics: [
        '기술 트렌드 전망',
        '산업 변화 대응 전략',
        '지속적 학습 방법',
        '기술사로서의 비전',
        '사회적 책임과 윤리',
      ],
      examples: [
        '"향후 5년간 IT 분야의 가장 큰 변화는 무엇이라 예상하시나요?"',
        '"기술사 자격 취득 후 어떤 활동을 계획하고 계신가요?"',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 면접시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">구술형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">15~30분</p>
            <p className="text-sm text-gray-500">면접 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">60점 이상</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
          <p className="text-sm text-violet-800">
            <strong>💡 면접 특징:</strong> 필기시험 답안을 기반으로 질문하며, 기술사로서의 자질과 품위를 종합 평가합니다.
          </p>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 평가 항목 상세</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border-2 border-violet-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-violet-700">기술적 역량</h3>
              <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-bold">40%</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                전문 지식의 깊이와 정확성
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                기술 적용 및 응용 능력
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                최신 기술 동향 파악 수준
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500">•</span>
                기술적 문제 해결 능력
              </li>
            </ul>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-purple-700">경험 및 실무</h3>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">30%</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                프로젝트 수행 경험의 다양성
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                실제 문제 해결 사례
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                리더십 및 팀 관리 경험
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                경험의 구체성과 진정성
              </li>
            </ul>
          </div>
          <div className="border-2 border-indigo-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-indigo-700">의사소통</h3>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">15%</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                논리적이고 명확한 설명
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                질문 의도 파악 능력
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                적절한 답변 길이 조절
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                전문가다운 어휘 사용
              </li>
            </ul>
          </div>
          <div className="border-2 border-blue-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-blue-700">품위 및 자질</h3>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">15%</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                기술사로서의 윤리의식
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                사회적 책임감
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                지속적 발전 의지
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                전문가로서의 태도
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interview Topics */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">🎯 면접 질문 유형별 상세</h2>
        {interviewTopics.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              section.color === 'violet' ? 'from-violet-500 to-violet-400' :
              section.color === 'purple' ? 'from-purple-500 to-purple-400' :
              section.color === 'indigo' ? 'from-indigo-500 to-indigo-400' :
              'from-blue-500 to-blue-400'
            } text-white`}>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.category}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">📌 주요 질문 영역</h4>
                  <ul className="space-y-2">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-violet-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">💬 예상 질문 예시</h4>
                  <div className="space-y-3">
                    {section.examples.map((example, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 italic">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Process */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 면접 진행 순서</h2>
        <div className="space-y-4">
          {[
            { step: 1, title: '입장 및 인사', time: '1분', desc: '면접관에게 정중히 인사, 착석 허락 후 착석' },
            { step: 2, title: '자기소개', time: '2-3분', desc: '간단한 경력 소개, 주요 프로젝트 경험 언급' },
            { step: 3, title: '필기 답안 기반 질문', time: '8-10분', desc: '필기시험 답안 내용 검증, 심화 질문' },
            { step: 4, title: '경험/역량 질문', time: '8-10분', desc: '실무 경험, 리더십, 문제 해결 사례' },
            { step: 5, title: '마무리 질문', time: '2-3분', desc: '기술사 활동 계획, 마지막 하고 싶은 말' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <span className="text-sm text-violet-600 font-medium">{item.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 면접 합격 전략</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
            <h3 className="font-bold text-violet-700 mb-2">사전 준비</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 필기 답안 복기 및 보완 학습</li>
              <li>• 경력 기술서 상세 숙지</li>
              <li>• 예상 질문 답변 준비</li>
              <li>• 모의 면접 연습</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">면접 중 태도</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 자신감 있는 목소리와 태도</li>
              <li>• 질문에 대한 구조화된 답변</li>
              <li>• 모르는 것은 솔직히 인정</li>
              <li>• 면접관과 눈 맞춤 유지</li>
            </ul>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="font-bold text-indigo-700 mb-2">답변 핵심</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 실무 경험 구체적 설명</li>
              <li>• STAR 기법 활용</li>
              <li>• 기술사 역할 인식 표현</li>
              <li>• 전문가적 비전 제시</li>
            </ul>
          </div>
        </div>
      </div>

      {/* STAR Method */}
      <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">📝 STAR 답변 기법</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">S</div>
            <h4 className="font-bold text-violet-700">Situation</h4>
            <p className="text-xs text-gray-600 mt-1">상황/배경 설명</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">T</div>
            <h4 className="font-bold text-purple-700">Task</h4>
            <p className="text-xs text-gray-600 mt-1">과제/목표 제시</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">A</div>
            <h4 className="font-bold text-indigo-700">Action</h4>
            <p className="text-xs text-gray-600 mt-1">행동/실행 내용</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">R</div>
            <h4 className="font-bold text-blue-700">Result</h4>
            <p className="text-xs text-gray-600 mt-1">결과/성과 강조</p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-200">
        <h2 className="text-xl font-bold text-amber-800 mb-4">⚠️ 면접 주의사항</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>복장:</strong> 정장 착용 권장, 단정하고 전문가다운 이미지</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>시간 준수:</strong> 면접 시간 20분 전 도착, 여유 있게 대기</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>답변 길이:</strong> 한 질문당 1-2분 내외로 핵심만 간결하게</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>솔직함:</strong> 모르는 내용은 인정하고, 추측성 답변 지양</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>겸손함:</strong> 자신의 성과를 어필하되 팀 기여도도 인정</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/category/it/information-management-pro/study/interview"
          className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition font-bold"
        >
          🎯 면접 대비 학습하기 →
        </a>
      </div>
    </div>
  );
}
