'use client';

import { useState } from 'react';

export default function ComputerSystemProExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-emerald-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-emerald-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-system-pro" className="text-gray-600 hover:text-emerald-600">컴퓨터시스템응용기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">컴퓨터시스템응용기술사 시험 상세</h1>
              <p className="text-emerald-100">Computer System Professional Engineer - 시험 구성 및 출제 경향</p>
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
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험 (논문형)
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'interview'
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🎤 면접시험 (구술형)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <InterviewContent />}
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
      name: '시스템 아키텍처',
      ratio: '25%',
      difficulty: 5,
      color: 'emerald',
      topics: [
        'CPU 마이크로아키텍처 (파이프라인, 슈퍼스칼라, 분기예측)',
        '메모리 계층 구조 (캐시 일관성, MESI 프로토콜)',
        '버스 아키텍처 (PCIe, HyperTransport, QPI)',
        'NUMA 아키텍처 및 메모리 친화도',
        'GPU/FPGA/ASIC 아키텍처',
        'SoC 설계 및 임베디드 시스템',
        '가상화 하드웨어 지원 (VT-x, AMD-V)',
        '서버 아키텍처 (블레이드, 하이퍼컨버지드)',
      ],
      tips: [
        '최신 CPU 아키텍처 트렌드 숙지',
        '벤치마크 결과 해석 능력',
        '성능/전력 트레이드오프 분석',
        '클라우드 인프라와 연계',
      ],
      studyLink: '/category/it/computer-system-pro/study/system-architecture',
    },
    {
      id: 2,
      name: '운영체제/커널',
      ratio: '25%',
      difficulty: 5,
      color: 'teal',
      topics: [
        '프로세스 스케줄링 (CFS, RT, Deadline)',
        '메모리 관리 (페이지 교체, 대용량 페이지, NUMA)',
        '파일 시스템 (ext4, XFS, Btrfs, ZFS)',
        '커널 동기화 (스핀락, RCU, 시퀀스락)',
        'I/O 스케줄링 및 블록 계층',
        '커널 모듈 및 디바이스 드라이버',
        'cgroups, namespaces, seccomp',
        '실시간 운영체제 (RTOS)',
      ],
      tips: [
        'Linux 커널 소스 코드 분석',
        '시스템 콜 동작 원리 이해',
        '성능 프로파일링 도구 숙지',
        '컨테이너 기술과 연계',
      ],
      studyLink: '/category/it/computer-system-pro/study/os-kernel',
    },
    {
      id: 3,
      name: '분산 시스템',
      ratio: '25%',
      difficulty: 5,
      color: 'cyan',
      topics: [
        'CAP 정리 및 PACELC 이론',
        '합의 알고리즘 (Paxos, Raft, PBFT)',
        '분산 트랜잭션 (2PC, Saga 패턴)',
        '분산 스토리지 (HDFS, Ceph, GlusterFS)',
        '서비스 메시 (Istio, Linkerd)',
        '컨테이너 오케스트레이션 (Kubernetes)',
        '메시지 큐 (Kafka, RabbitMQ)',
        '분산 캐시 (Redis Cluster, Memcached)',
      ],
      tips: [
        '실제 분산 시스템 운영 경험',
        '장애 시나리오 및 복구 전략',
        'CAP 트레이드오프 분석',
        '대규모 시스템 사례 연구',
      ],
      studyLink: '/category/it/computer-system-pro/study/distributed-system',
    },
    {
      id: 4,
      name: '성능 최적화',
      ratio: '25%',
      difficulty: 4,
      color: 'blue',
      topics: [
        '성능 프로파일링 (perf, flamegraph)',
        '병목 분석 및 튜닝 기법',
        '리소스 모니터링 (Prometheus, Grafana)',
        'SLA/SLO/SLI 정의 및 관리',
        '용량 계획 및 수요 예측',
        '로드 밸런싱 및 오토스케일링',
        '데이터베이스 최적화 (인덱스, 쿼리)',
        '네트워크 성능 최적화',
      ],
      tips: [
        '실제 성능 개선 사례 준비',
        '측정 지표 해석 능력',
        '비용 효율성 분석',
        'A/B 테스트 및 카나리 배포',
      ],
      studyLink: '/category/it/computer-system-pro/study/performance',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">논문형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">4시간</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
      </div>

      {/* Exam Structure */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 구성</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-emerald-200 rounded-xl p-5 bg-emerald-50">
            <h3 className="font-bold text-emerald-700 text-lg mb-3">1교시 - 단답형 (100분)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                10~13문제 중 <strong>10문제 선택</strong> 답안 작성
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                각 문제당 <strong>10점 배점</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                핵심 개념을 <strong>간결하게</strong> 설명
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                400자 원고지 <strong>1~2매</strong> 분량
              </li>
            </ul>
          </div>
          <div className="border-2 border-teal-200 rounded-xl p-5 bg-teal-50">
            <h3 className="font-bold text-teal-700 text-lg mb-3">2교시 - 서술형 (100분)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                4~6문제 중 <strong>4문제 선택</strong> 답안 작성
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                각 문제당 <strong>25점 배점</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <strong>심층 분석</strong>과 논리적 전개 필요
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                400자 원고지 <strong>4~6매</strong> 분량
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>💡 작성 팁:</strong> 서론-본론-결론 구조, 도표/그림 활용, 실무 사례 인용, 최신 기술 트렌드 반영
          </p>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📚 출제 분야별 상세</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              subject.color === 'emerald' ? 'from-emerald-500 to-emerald-400' :
              subject.color === 'teal' ? 'from-teal-500 to-teal-400' :
              subject.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              'from-blue-500 to-blue-400'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {subject.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-sm opacity-80">출제 비중 {subject.ratio}</p>
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
                        <span className="text-emerald-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
                        subject.color === 'teal' ? 'bg-teal-500 hover:bg-teal-600' :
                        subject.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
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

      {/* Writing Strategy */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 답안 작성 전략</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-700">단답형 답안 구조</h3>
            <div className="bg-emerald-50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">1. 정의 (What)</p>
              <p className="text-gray-600 mb-3">→ 핵심 개념 한 문장 정의</p>
              <p className="font-medium mb-2">2. 특징/원리 (How)</p>
              <p className="text-gray-600 mb-3">→ 동작 원리, 주요 특징 3~5개</p>
              <p className="font-medium mb-2">3. 적용/사례 (Why)</p>
              <p className="text-gray-600">→ 실제 적용 분야, 장단점</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-teal-700">서술형 답안 구조</h3>
            <div className="bg-teal-50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">1. 서론 (10%)</p>
              <p className="text-gray-600 mb-3">→ 배경, 필요성, 정의</p>
              <p className="font-medium mb-2">2. 본론 (70%)</p>
              <p className="text-gray-600 mb-3">→ 구조도, 상세 설명, 비교 분석</p>
              <p className="font-medium mb-2">3. 결론 (20%)</p>
              <p className="text-gray-600">→ 요약, 전망, 개인 의견</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-emerald-700 mb-2">1교시 (100분)</h3>
            <div className="space-y-2">
              {[
                { name: '문제 파악 및 선택', time: '10분', color: 'bg-emerald-500' },
                { name: '단답형 10문제 작성 (각 8분)', time: '80분', color: 'bg-emerald-400' },
                { name: '검토 및 수정', time: '10분', color: 'bg-emerald-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="flex-1 text-gray-700">{item.name}</span>
                  <span className="font-bold text-gray-800">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-teal-700 mb-2">2교시 (100분)</h3>
            <div className="space-y-2">
              {[
                { name: '문제 파악 및 선택', time: '10분', color: 'bg-teal-500' },
                { name: '서술형 4문제 작성 (각 20분)', time: '80분', color: 'bg-teal-400' },
                { name: '검토 및 수정', time: '10분', color: 'bg-teal-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="flex-1 text-gray-700">{item.name}</span>
                  <span className="font-bold text-gray-800">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewContent() {
  const evaluationItems = [
    {
      category: '기술적 역량',
      ratio: '40%',
      color: 'emerald',
      items: [
        '전문 분야 지식의 깊이와 정확성',
        '기술 적용 및 문제 해결 능력',
        '최신 기술 트렌드 파악',
        '기술적 의사결정 능력',
      ],
    },
    {
      category: '경험 및 실무',
      ratio: '30%',
      color: 'teal',
      items: [
        '프로젝트 경험의 다양성과 깊이',
        '실제 문제 해결 사례',
        '리더십 및 팀워크 경험',
        '실무 적용 능력',
      ],
    },
    {
      category: '의사소통 능력',
      ratio: '15%',
      color: 'cyan',
      items: [
        '논리적이고 체계적인 설명',
        '질문 의도 정확한 파악',
        '전문가다운 표현력',
        '경청 및 응답 능력',
      ],
    },
    {
      category: '품위 및 자질',
      ratio: '15%',
      color: 'blue',
      items: [
        '기술사로서의 윤리의식',
        '사회적 책임감',
        '지속적 발전 의지',
        '전문가로서의 태도',
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
            <p className="text-3xl font-bold text-emerald-600">구술형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">15~30분</p>
            <p className="text-sm text-gray-500">면접 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>✅ 면접 방식:</strong> 3명의 면접위원이 순차적으로 질문, 필기 답안 기반 심층 질문
          </p>
        </div>
      </div>

      {/* Evaluation Items */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📋 평가 항목별 상세</h2>
        {evaluationItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              item.color === 'emerald' ? 'from-emerald-500 to-emerald-400' :
              item.color === 'teal' ? 'from-teal-500 to-teal-400' :
              item.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              'from-blue-500 to-blue-400'
            } text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{item.category}</h3>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">{item.ratio}</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {item.items.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-emerald-500 mt-1">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Preparation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 면접 준비 전략</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="font-bold text-emerald-700 mb-2">1단계: 필기 답안 복기</h3>
            <p className="text-sm text-gray-600">작성한 답안 내용을 완벽히 숙지하고, 추가 질문에 대비</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="font-bold text-teal-700 mb-2">2단계: 경험 정리</h3>
            <p className="text-sm text-gray-600">주요 프로젝트 경험을 STAR 기법으로 정리 (상황-과제-행동-결과)</p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="font-bold text-cyan-700 mb-2">3단계: 모의 면접</h3>
            <p className="text-sm text-gray-600">기출 질문으로 연습, 시간 내 답변 연습, 스터디 그룹 활용</p>
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">❓ 자주 나오는 질문 유형</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4">
            <p className="font-medium text-gray-800">필기 답안 관련</p>
            <p className="text-sm text-gray-600">"○○에 대해 작성하셨는데, 실제로 적용해 본 경험이 있나요?"</p>
          </div>
          <div className="border-l-4 border-teal-500 pl-4">
            <p className="font-medium text-gray-800">기술 심화</p>
            <p className="text-sm text-gray-600">"이 기술의 한계점은 무엇이고, 어떻게 극복할 수 있나요?"</p>
          </div>
          <div className="border-l-4 border-cyan-500 pl-4">
            <p className="font-medium text-gray-800">경험 기반</p>
            <p className="text-sm text-gray-600">"가장 어려웠던 기술적 문제와 해결 과정을 설명해 주세요."</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium text-gray-800">기술사 역할</p>
            <p className="text-sm text-gray-600">"기술사로서 사회에 어떤 기여를 할 수 있다고 생각하나요?"</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-200">
        <h2 className="text-xl font-bold text-amber-800 mb-4">⚠️ 면접 주의사항</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>모르는 질문:</strong> 솔직히 "잘 모르겠습니다"라고 인정하고, 아는 범위까지 답변</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>시간 관리:</strong> 답변은 1~2분 내로 핵심만 전달, 장황한 설명 지양</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>자세와 태도:</strong> 자신감 있되 겸손한 태도, 면접위원과 눈 맞춤</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>복장:</strong> 정장 착용 권장, 단정한 외모</p>
          </div>
        </div>
      </div>

      {/* Study Link */}
      <div className="text-center">
        <a href="/category/it/computer-system-pro/study/practical" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-bold">
          🎯 면접 대비 학습하기 →
        </a>
      </div>
    </div>
  );
}
