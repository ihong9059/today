'use client';

import { useState } from 'react';

export default function ComputerOrganizationExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

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
            <a href="/" className="text-gray-600 hover:text-cyan-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🖥️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전자계산기조직응용기사 시험 상세</h1>
              <p className="text-cyan-100">Engineer Computer Organization Application - 시험 과목 및 출제 경향</p>
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
                  ? 'border-cyan-500 text-cyan-600 bg-cyan-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-cyan-500 text-cyan-600 bg-cyan-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <PracticalExamContent />}
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
      name: '전자계산기 구조',
      questions: 20,
      difficulty: 4,
      passRate: '40%',
      color: 'cyan',
      topics: [
        'CPU 구조 (레지스터, ALU, 제어장치)',
        '명령어 사이클 (Fetch, Decode, Execute)',
        '주소 지정 방식 (즉시, 직접, 간접, 레지스터)',
        '메모리 계층구조 (캐시, RAM, 가상메모리)',
        '파이프라인 (해저드, 분기예측)',
        '인터럽트 처리',
        '입출력 장치 (DMA, 채널)',
        '버스 구조 및 인터페이스',
      ],
      tips: [
        '명령어 형식 계산 문제 빈출',
        '주소 지정 방식 구분 필수',
        '캐시 적중률 계산 연습',
        '파이프라인 속도 계산',
      ],
      studyLink: '/category/it/computer-organization/study/computer-architecture',
    },
    {
      id: 2,
      name: '운영체제',
      questions: 20,
      difficulty: 4,
      passRate: '42%',
      color: 'blue',
      topics: [
        '프로세스 관리 (PCB, 상태전이, 문맥교환)',
        'CPU 스케줄링 (FCFS, SJF, RR, Priority)',
        '교착상태 (발생조건, 예방, 회피, 탐지)',
        '메모리 관리 (페이징, 세그멘테이션)',
        '가상 메모리 (페이지 교체 알고리즘)',
        '파일 시스템 (FAT, NTFS, inode)',
        '디스크 스케줄링 (FCFS, SSTF, SCAN)',
        '동기화 (세마포어, 뮤텍스, 모니터)',
      ],
      tips: [
        '스케줄링 평균 대기시간 계산',
        '페이지 폴트 횟수 계산',
        '교착상태 4조건 암기',
        '동기화 문제 해결 패턴',
      ],
      studyLink: '/category/it/computer-organization/study/operating-system',
    },
    {
      id: 3,
      name: '소프트웨어 공학',
      questions: 20,
      difficulty: 3,
      passRate: '48%',
      color: 'indigo',
      topics: [
        '개발 생명주기 모델 (폭포수, 프로토타입, 나선형)',
        '요구사항 분석 (기능/비기능, 명세화)',
        '설계 (아키텍처, 모듈, 인터페이스)',
        'UML 다이어그램 (유스케이스, 클래스, 시퀀스)',
        '테스트 (단위, 통합, 시스템, 인수)',
        '테스트 기법 (화이트박스, 블랙박스)',
        '형상관리 (버전관리, 변경관리)',
        '품질보증 (ISO 25010, 메트릭)',
      ],
      tips: [
        'UML 다이어그램 기호 암기',
        '테스트 커버리지 유형',
        '결합도/응집도 구분',
        '개발 방법론 특징 비교',
      ],
      studyLink: '/category/it/computer-organization/study/software-engineering',
    },
    {
      id: 4,
      name: '데이터 통신',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'green',
      topics: [
        'OSI 7계층 (각 계층 역할, 프로토콜)',
        'TCP/IP 프로토콜 스택',
        '전송 매체 (동축, 광섬유, 무선)',
        '다중화 (FDM, TDM, WDM)',
        '오류 제어 (패리티, CRC, 해밍코드)',
        '흐름 제어 (슬라이딩 윈도우)',
        '라우팅 프로토콜 (RIP, OSPF, BGP)',
        '네트워크 장비 (스위치, 라우터)',
      ],
      tips: [
        'OSI 7계층 완벽 암기',
        '서브넷팅 계산 필수',
        '프로토콜 포트번호 암기',
        '오류 검출 코드 계산',
      ],
      studyLink: '/category/it/computer-organization/study/data-communication',
    },
    {
      id: 5,
      name: '정보통신 개론',
      questions: 20,
      difficulty: 2,
      passRate: '55%',
      color: 'teal',
      topics: [
        '정보통신 시스템 구성',
        '교환 방식 (회선교환, 패킷교환)',
        '통신 네트워크 (LAN, WAN, MAN)',
        '이더넷 (CSMA/CD, 프레임 구조)',
        '무선 통신 (WiFi, LTE, 5G)',
        '인터넷 서비스 (DNS, DHCP, NAT)',
        '보안 (암호화, VPN, 방화벽)',
        '신기술 (IoT, 클라우드, SDN)',
      ],
      tips: [
        '통신 규약 암기 위주',
        '무선 기술 주파수 대역',
        'IPv4/IPv6 차이점',
        '최신 기술 동향 파악',
      ],
      studyLink: '/category/it/computer-organization/study/information-system',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">5과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">100문항</p>
            <p className="text-sm text-gray-500">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">2시간 30분</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">객관식</p>
            <p className="text-sm text-gray-500">4지선다형</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>💡 합격 기준:</strong> 과목당 40점 이상 + 전체 평균 60점 이상 (과락 주의!)
          </p>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세 정보</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              subject.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              subject.color === 'blue' ? 'from-blue-500 to-blue-400' :
              subject.color === 'indigo' ? 'from-indigo-500 to-indigo-400' :
              subject.color === 'green' ? 'from-green-500 to-green-400' :
              'from-teal-500 to-teal-400'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {subject.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-sm opacity-80">{subject.questions}문항 · 합격률 {subject.passRate}</p>
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
                        <span className="text-cyan-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        subject.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        subject.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        subject.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                        'bg-teal-500 hover:bg-teal-600'
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

      {/* Study Order */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 추천 학습 순서</h2>
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {['전자계산기 구조', '운영체제', '데이터 통신', '소프트웨어 공학', '정보통신 개론'].map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="font-medium text-gray-700">{name}</span>
              {i < 4 && <span className="text-gray-300 text-2xl ml-2">→</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          핵심 이론(구조) → 시스템(OS) → 통신 → SW공학 → 개론(암기)
        </p>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '전자계산기 구조 실무',
      ratio: '25%',
      points: '25점',
      color: 'cyan',
      topics: [
        'CPU 명령어 사이클 분석',
        '주소 지정 방식 계산 문제',
        '메모리 용량/주소 계산',
        '캐시 메모리 적중률',
        '파이프라인 성능 계산',
        '인터럽트 우선순위',
      ],
      tips: [
        '계산 문제 공식 암기',
        '진법 변환 연습',
        '주소 비트 수 계산',
      ],
      studyLink: '/category/it/computer-organization/study/practical',
    },
    {
      name: '운영체제 실무',
      ratio: '25%',
      points: '25점',
      color: 'blue',
      topics: [
        'CPU 스케줄링 계산 (평균 대기시간, 반환시간)',
        '페이지 교체 알고리즘 (FIFO, LRU, Optimal)',
        '교착상태 탐지 (은행가 알고리즘)',
        '디스크 스케줄링 이동거리',
        '메모리 할당 (First-Fit, Best-Fit)',
        '프로세스 동기화 문제',
      ],
      tips: [
        '간트 차트 그리기',
        '페이지 폴트 횟수 계산',
        '알고리즘별 특성 비교',
      ],
      studyLink: '/category/it/computer-organization/study/practical',
    },
    {
      name: '데이터 통신/네트워크',
      ratio: '25%',
      points: '25점',
      color: 'green',
      topics: [
        '서브넷팅/CIDR 계산',
        'IP 주소 클래스 및 대역',
        '오류 검출 코드 (패리티, CRC)',
        '전송 효율 계산',
        '라우팅 테이블 분석',
        'OSI 계층별 프로토콜',
      ],
      tips: [
        '서브넷 마스크 계산 필수',
        'IP 대역 구분 암기',
        '전송 지연 계산 공식',
      ],
      studyLink: '/category/it/computer-organization/study/practical',
    },
    {
      name: '소프트웨어 공학/DB',
      ratio: '25%',
      points: '25점',
      color: 'indigo',
      topics: [
        'UML 다이어그램 해석/작성',
        '정규화 (1NF, 2NF, 3NF, BCNF)',
        'SQL 쿼리 작성 및 결과',
        '트랜잭션/동시성 제어',
        '테스트 케이스 설계',
        '결합도/응집도 분석',
      ],
      tips: [
        'ER 다이어그램 정확히',
        '정규화 단계 구분',
        'SQL 문법 실습',
      ],
      studyLink: '/category/it/computer-organization/study/practical',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">필답형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">3시간</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-cyan-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상 (과락 없음)
          </p>
        </div>
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>📝 답안 형태:</strong> 단답형, 계산형, 서술형 혼합 (계산 과정 명시 필요)
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📋 출제 영역별 상세</h2>
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              section.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              section.color === 'blue' ? 'from-blue-500 to-blue-400' :
              section.color === 'green' ? 'from-green-500 to-green-400' :
              'from-indigo-500 to-indigo-400'
            } text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{section.name}</h3>
                <div className="text-right">
                  <p className="font-bold">{section.ratio}</p>
                  <p className="text-sm opacity-80">{section.points}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">📖 출제 내용</h4>
                  <ul className="space-y-2">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-cyan-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {section.studyLink && (
                    <a
                      href={section.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        section.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        section.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        section.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                        'bg-indigo-500 hover:bg-indigo-600'
                      } text-white rounded-lg transition text-sm font-medium`}
                    >
                      📚 실기 학습하기 →
                    </a>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">💡 학습 팁</h4>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
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

      {/* Exam Strategy */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 실기 합격 전략</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="font-bold text-cyan-700 mb-2">1단계: 계산 공식 정리</h3>
            <p className="text-sm text-gray-600">CPU, 메모리, 네트워크 관련 계산 공식을 정리하고 반복 연습</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-700 mb-2">2단계: 알고리즘 손풀이</h3>
            <p className="text-sm text-gray-600">스케줄링, 페이지 교체 등 알고리즘을 손으로 직접 풀어보기</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="font-bold text-indigo-700 mb-2">3단계: 기출 분석</h3>
            <p className="text-sm text-gray-600">최근 5년 기출문제 유형 파악. 반복 출제 패턴 확인</p>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-3">
          {[
            { name: '전자계산기 구조 계산 문제', time: '45분', color: 'bg-cyan-500' },
            { name: '운영체제 알고리즘 문제', time: '45분', color: 'bg-blue-500' },
            { name: '네트워크/통신 문제', time: '40분', color: 'bg-green-500' },
            { name: 'DB/SW공학 문제', time: '40분', color: 'bg-indigo-500' },
            { name: '검토 및 수정', time: '10분', color: 'bg-gray-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <span className="flex-1 text-gray-700">{item.name}</span>
              <span className="font-bold text-gray-800">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-200">
        <h2 className="text-xl font-bold text-amber-800 mb-4">⚠️ 실기 주의사항</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>계산 과정 명시:</strong> 단순 답만 적지 말고 풀이 과정 작성</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>단위 표기:</strong> 바이트, 비트, KB, MB 등 단위 정확히</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>진법 표기:</strong> 2진수, 16진수 등 진법 명확히 표기</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>그림/다이어그램:</strong> 간트차트, 상태도 등 깔끔하게 작성</p>
          </div>
        </div>
      </div>
    </div>
  );
}
