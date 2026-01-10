'use client';

import { useState } from 'react';

export default function InformationProcessorExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-indigo-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-indigo-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-processor" className="text-gray-600 hover:text-indigo-600">정보처리기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보처리기사 시험 상세</h1>
              <p className="text-indigo-100">Engineer Information Processing - 시험 과목 및 출제 경향</p>
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
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
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
      name: '소프트웨어 설계',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'indigo',
      topics: [
        '요구사항 분석 (요구공학, 기능/비기능 요구사항)',
        'UML (유스케이스, 클래스, 시퀀스, 상태, 활동 다이어그램)',
        'UI 설계 (UI 원칙, 와이어프레임, 프로토타입)',
        '소프트웨어 아키텍처 (MVC, 레이어드, 마이크로서비스)',
        '디자인 패턴 (생성, 구조, 행위 패턴)',
        '객체지향 설계 (SOLID 원칙)',
        '인터페이스 설계 (API, 데이터 연계)',
      ],
      tips: [
        'UML 다이어그램 구분 필수',
        '디자인 패턴 23개 암기',
        'SOLID 원칙 이해',
        '기출에서 반복 출제 많음',
      ],
      studyLink: '/category/it/information-processor/study/software-design',
    },
    {
      id: 2,
      name: '소프트웨어 개발',
      questions: 20,
      difficulty: 3,
      passRate: '42%',
      color: 'blue',
      topics: [
        '자료구조 (배열, 리스트, 스택, 큐, 트리, 그래프)',
        '알고리즘 (정렬, 탐색, 해시)',
        '인터페이스 구현 (EAI, ESB, 웹서비스)',
        '소프트웨어 테스트 (화이트박스, 블랙박스)',
        '테스트 기법 (경계값, 동치분할, 상태전이)',
        '형상관리 (Git, SVN)',
        '빌드 및 배포 (CI/CD)',
      ],
      tips: [
        '자료구조 시간복잡도 암기',
        '정렬 알고리즘 동작 이해',
        '테스트 기법 구분 중요',
        '기출 유형 반복 학습',
      ],
      studyLink: '/category/it/information-processor/study/software-development',
    },
    {
      id: 3,
      name: '데이터베이스 구축',
      questions: 20,
      difficulty: 3,
      passRate: '48%',
      color: 'cyan',
      topics: [
        'SQL (SELECT, INSERT, UPDATE, DELETE)',
        'JOIN (INNER, LEFT, RIGHT, FULL)',
        '서브쿼리 (스칼라, 인라인뷰, 중첩)',
        '정규화 (1NF, 2NF, 3NF, BCNF)',
        '트랜잭션 (ACID, 동시성 제어)',
        'ER 다이어그램, 데이터 모델링',
        '인덱스, 뷰, 프로시저',
      ],
      tips: [
        'SQL 문법 실습 필수',
        '정규화 단계별 이해',
        'JOIN 결과 예측 연습',
        '실기에서도 중요한 과목',
      ],
      studyLink: '/category/it/information-processor/study/database',
    },
    {
      id: 4,
      name: '프로그래밍 언어 활용',
      questions: 20,
      difficulty: 4,
      passRate: '35%',
      color: 'purple',
      topics: [
        'C언어 (포인터, 배열, 구조체, 함수)',
        'Java (클래스, 상속, 다형성, 인터페이스)',
        'Python (리스트, 딕셔너리, 함수)',
        '변수, 연산자, 제어문',
        '함수와 재귀',
        '객체지향 개념 (캡슐화, 상속, 다형성)',
        '예외처리, 라이브러리 활용',
      ],
      tips: [
        '코드 실행 결과 예측 연습',
        '포인터 연산 반복 학습',
        '상속/오버라이딩 구분',
        '가장 어려운 과목, 집중!',
      ],
      studyLink: '/category/it/information-processor/study/programming',
    },
    {
      id: 5,
      name: '정보시스템 구축관리',
      questions: 20,
      difficulty: 2,
      passRate: '55%',
      color: 'pink',
      topics: [
        '소프트웨어 개발 방법론 (애자일, 워터폴, 스크럼)',
        'IT 프로젝트 관리 (WBS, 간트차트, PERT/CPM)',
        '소프트웨어 품질 (ISO 25010)',
        '정보보안 (암호화, 접근제어, 공격기법)',
        '네트워크 기초 (OSI 7계층, TCP/IP)',
        '클라우드, 가상화',
        '신기술 동향 (AI, 블록체인, IoT)',
      ],
      tips: [
        '암기 위주 과목',
        '보안 공격 종류 정리',
        'OSI 7계층 완벽 암기',
        '고득점 가능, 마무리에 집중',
      ],
      studyLink: '/category/it/information-processor/study/system-management',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">5과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">100문항</p>
            <p className="text-sm text-gray-500">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">2시간 30분</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">객관식</p>
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
              subject.color === 'indigo' ? 'from-indigo-500 to-indigo-400' :
              subject.color === 'blue' ? 'from-blue-500 to-blue-400' :
              subject.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              subject.color === 'purple' ? 'from-purple-500 to-purple-400' :
              'from-pink-500 to-pink-400'
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
                        <span className="text-indigo-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        subject.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        subject.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        subject.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        'bg-pink-500 hover:bg-pink-600'
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
          {['프로그래밍 언어', '데이터베이스', '소프트웨어 개발', '소프트웨어 설계', '정보시스템 구축관리'].map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="font-medium text-gray-700">{name}</span>
              {i < 4 && <span className="text-gray-300 text-2xl ml-2">→</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          핵심(프로그래밍) → 실용(DB) → 이론(개발/설계) → 암기(구축관리)
        </p>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '프로그래밍 언어 활용',
      ratio: '30%',
      points: '30점',
      color: 'purple',
      topics: [
        'C언어 코드 실행 결과 (포인터, 배열)',
        'Java 코드 실행 결과 (상속, 오버라이딩)',
        'Python 코드 실행 결과 (리스트, 슬라이싱)',
        '알고리즘 구현 (정렬, 탐색)',
        '함수 및 재귀 호출',
      ],
      tips: [
        '손으로 코드 트레이싱 연습',
        '출력 결과 정확히 예측',
        '실행 순서 파악 필수',
      ],
      studyLink: '/category/it/information-processor/study/practical',
    },
    {
      name: 'SQL 활용',
      ratio: '25%',
      points: '25점',
      color: 'cyan',
      topics: [
        'SELECT 구문 작성 (조건, 정렬, 그룹)',
        'JOIN 쿼리 (INNER, OUTER)',
        '서브쿼리 작성',
        'DDL (CREATE, ALTER, DROP)',
        'DML (INSERT, UPDATE, DELETE)',
      ],
      tips: [
        'SQL 실습 환경 구축',
        'JOIN 결과 직접 확인',
        '서브쿼리 유형별 연습',
      ],
      studyLink: '/category/it/information-processor/study/practical',
    },
    {
      name: '화면설계/요구분석',
      ratio: '20%',
      points: '20점',
      color: 'indigo',
      topics: [
        'UML 다이어그램 해석',
        '유스케이스 작성',
        '클래스 다이어그램 분석',
        '시퀀스 다이어그램',
        'UI 설계서 작성',
      ],
      tips: [
        'UML 기호 암기',
        '관계 화살표 구분',
        '다이어그램 작성 연습',
      ],
      studyLink: '/category/it/information-processor/study/practical',
    },
    {
      name: '신기술/보안/네트워크',
      ratio: '25%',
      points: '25점',
      color: 'pink',
      topics: [
        '정보보안 (암호화 알고리즘, 해시)',
        '네트워크 (IP주소, 서브넷)',
        '개발 방법론 (애자일, 스크럼)',
        '신기술 용어 (클라우드, 컨테이너)',
        '테스트/품질 관련 개념',
      ],
      tips: [
        '용어 정의 암기',
        '약어 풀이 연습',
        '최신 기출 확인',
      ],
      studyLink: '/category/it/information-processor/study/practical',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">필답형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">3시간</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">60점</p>
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
            <strong>📝 답안 형태:</strong> 단답형, 약술형, 서술형 혼합 (정확한 답안 작성 필수)
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📋 출제 영역별 상세</h2>
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              section.color === 'purple' ? 'from-purple-500 to-purple-400' :
              section.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
              section.color === 'indigo' ? 'from-indigo-500 to-indigo-400' :
              'from-pink-500 to-pink-400'
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
                        <span className="text-indigo-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {section.studyLink && (
                    <a
                      href={section.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        section.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        section.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        section.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        'bg-pink-500 hover:bg-pink-600'
                      } text-white rounded-lg transition text-sm font-medium`}
                    >
                      📚 {section.name} 학습하기 →
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
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">1단계: 코드 트레이싱</h3>
            <p className="text-sm text-gray-600">C, Java, Python 코드를 손으로 따라가며 실행 결과 예측 연습</p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="font-bold text-cyan-700 mb-2">2단계: SQL 실습</h3>
            <p className="text-sm text-gray-600">실제 DB 환경에서 쿼리 작성 및 결과 확인. JOIN 집중!</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
            <h3 className="font-bold text-pink-700 mb-2">3단계: 기출 분석</h3>
            <p className="text-sm text-gray-600">최근 5년 기출문제 유형 파악. 반복 출제 패턴 확인</p>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-3">
          {[
            { name: '프로그래밍 언어 (코드 문제)', time: '60분', color: 'bg-purple-500' },
            { name: 'SQL 문제', time: '45분', color: 'bg-cyan-500' },
            { name: 'UML/설계 문제', time: '35분', color: 'bg-indigo-500' },
            { name: '신기술/보안/네트워크', time: '30분', color: 'bg-pink-500' },
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
            <p className="text-gray-700"><strong>정확한 용어 사용:</strong> 오타 없이 정확하게 작성 (예: 캡슐화 ≠ 캡슐활)</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>대소문자 구분:</strong> SQL 예약어, 함수명 등 정확히 작성</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>코드 결과:</strong> 출력 형식까지 정확하게 (줄바꿈, 공백 포함)</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-600">•</span>
            <p className="text-gray-700"><strong>약어 풀이:</strong> 영문 약어는 Full Name 암기 필수</p>
          </div>
        </div>
      </div>
    </div>
  );
}
