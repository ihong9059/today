'use client';

import { useState } from 'react';

export default function MechanicalCraftsmanExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-amber-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-amber-600">기계산업기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">기계산업기사 시험 상세</h1>
              <p className="text-amber-100">Industrial Engineer Mechanical - 시험 과목 및 출제 경향</p>
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
                  ? 'border-amber-500 text-amber-600 bg-amber-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-amber-500 text-amber-600 bg-amber-50'
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
      name: '기계제도',
      questions: 20,
      difficulty: 2,
      passRate: '55%',
      color: 'blue',
      topics: [
        'KS 제도 규격',
        '투상법 (정투상, 등각투상)',
        '단면도 표시법',
        '치수 기입법',
        '공차 및 끼워맞춤',
        '기하공차',
        '표면 거칠기',
      ],
      tips: [
        '기초 과목, 먼저 공부 권장',
        'KS 기호 암기 필수',
        '도면 해독 연습',
        '비교적 고득점 가능',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/drawing',
    },
    {
      id: 2,
      name: '기계재료',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'green',
      topics: [
        '금속의 결정구조',
        '철강재료 (탄소강, 합금강)',
        '비철금속 (알루미늄, 구리합금)',
        '열처리 (담금질, 뜨임, 불림)',
        '표면경화법',
        '비금속재료',
        '신소재',
      ],
      tips: [
        '암기 위주 과목',
        '열처리 종류 구분 필수',
        '재료 기호 암기',
        '기출 반복이 효과적',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/material',
    },
    {
      id: 3,
      name: '기계설계',
      questions: 20,
      difficulty: 4,
      passRate: '30%',
      color: 'red',
      topics: [
        '나사, 볼트, 너트',
        '축 및 축이음',
        '베어링 (미끄럼, 구름)',
        '기어 (스퍼, 헬리컬)',
        '벨트, 체인, 로프',
        '스프링',
        '브레이크, 클러치',
      ],
      tips: [
        '가장 어려운 과목',
        '설계 공식 암기 필수',
        '계산 문제 많음',
        '기출 유형 분석 중요',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/design',
    },
    {
      id: 4,
      name: '기계제작법',
      questions: 20,
      difficulty: 3,
      passRate: '40%',
      color: 'purple',
      topics: [
        '주조 (모형, 주형, 주조결함)',
        '소성가공 (단조, 압연, 인발)',
        '용접 (아크, 가스, 특수)',
        '절삭가공 (선삭, 밀링, 드릴링)',
        '연삭 및 정밀가공',
        '측정 및 검사',
        'NC/CNC 가공',
      ],
      tips: [
        '암기 + 계산 혼합',
        '절삭이론 공식 정리',
        '용접 결함 및 검사법',
        '고득점 가능 과목',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/manufacturing',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">4과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">80문항</p>
            <p className="text-sm text-gray-500">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">2시간</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">객관식</p>
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
              subject.color === 'blue' ? 'from-blue-500 to-blue-400' :
              subject.color === 'green' ? 'from-green-500 to-green-400' :
              subject.color === 'red' ? 'from-red-500 to-red-400' :
              'from-purple-500 to-purple-400'
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
                        <span className="text-amber-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        subject.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                        subject.color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                        'bg-purple-500 hover:bg-purple-600'
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
          {['기계제도', '기계재료', '기계설계', '기계제작법'].map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="font-medium text-gray-700">{name}</span>
              {i < 3 && <span className="text-gray-300 text-2xl ml-2">→</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          기초(제도) → 암기(재료) → 핵심(설계) → 마무리(제작법)
        </p>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '필답형 문제',
      ratio: '약 40%',
      points: '약 40점',
      color: 'amber',
      topics: [
        '기계설계 계산 (축, 기어, 베어링)',
        '재료역학 기초 계산',
        '기계재료 특성',
        '가공법 이론',
      ],
      tips: [
        '공식 정확히 암기',
        '단위 환산 연습',
        '계산기 사용법 숙달',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/practical',
    },
    {
      name: '작업형 (CAD)',
      ratio: '약 60%',
      points: '약 60점',
      color: 'blue',
      topics: [
        '2D 도면 작성',
        '단면도, 조립도 작성',
        '치수 기입 및 공차 표시',
        '도면 해독',
      ],
      tips: [
        'AutoCAD 숙달',
        'KS 규격 이해',
        '시간 배분 연습',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/practical',
    },
    {
      name: '도면 해독',
      ratio: '핵심 출제',
      points: '고배점',
      color: 'green',
      topics: [
        '부품도 해석',
        '조립도 해석',
        '치수/공차 해석',
        '재료 기호 해석',
      ],
      tips: [
        '다양한 도면 분석',
        'KS 기호 암기',
        '실무 도면 연습',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/practical',
    },
    {
      name: '치수/공차',
      ratio: '핵심 출제',
      points: '고배점',
      color: 'purple',
      topics: [
        '끼워맞춤 (헐거움, 억지, 중간)',
        '기하공차 적용',
        '표면 거칠기 지정',
        '치수 공차 계산',
      ],
      tips: [
        '공차 표 숙지',
        '끼워맞춤 계산',
        '기출문제 반복',
      ],
      studyLink: '/category/mechanical/mechanical-craftsman/study/practical',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">필답+작업</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">약 4시간</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상 (과락 없음)
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📋 출제 영역별 상세</h2>
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`p-4 bg-gradient-to-r ${
              section.color === 'amber' ? 'from-amber-500 to-yellow-500' :
              section.color === 'blue' ? 'from-blue-500 to-cyan-500' :
              section.color === 'green' ? 'from-green-500 to-emerald-500' :
              'from-purple-500 to-indigo-500'
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
                        <span className="text-amber-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {section.studyLink && (
                    <a
                      href={section.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        section.color === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
                        section.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        section.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                        'bg-purple-500 hover:bg-purple-600'
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
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-bold text-amber-700 mb-2">1단계: CAD 숙달</h3>
            <p className="text-sm text-gray-600">AutoCAD 기본 명령어 완벽 숙지. 작업형 60% 비중</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-700 mb-2">2단계: 도면 연습</h3>
            <p className="text-sm text-gray-600">다양한 기계부품 도면 작성 연습. 시간 관리</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">3단계: 기출 분석</h3>
            <p className="text-sm text-gray-600">최근 5년 기출문제 유형 파악. 반복 연습</p>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-3">
          {[
            { name: '필답형 - 계산/이론 문제', time: '60분', color: 'bg-amber-500' },
            { name: '작업형 - CAD 도면 작성', time: '150분', color: 'bg-blue-500' },
            { name: '검토 및 수정', time: '30분', color: 'bg-green-500' },
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
  );
}
