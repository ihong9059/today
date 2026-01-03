'use client';

import { useState } from 'react';

export default function ElectricCraftsmanExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔌</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전기산업기사 시험 상세</h1>
              <p className="text-orange-100">Industrial Engineer Electricity - 시험 과목 및 출제 경향</p>
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
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
        </div>
      </footer>
    </div>
  );
}

function WrittenExamContent() {
  const subjects = [
    {
      name: '전기자기학',
      color: 'bg-blue-500',
      topics: [
        '벡터 해석 (발산, 회전, 기울기)',
        '정전계 (쿨롱의 법칙, 전위, 전계)',
        '도체계와 정전용량',
        '유전체와 분극',
        '정자계 (비오-사바르 법칙)',
        '자성체와 자화',
        '전자유도 (패러데이 법칙)',
        '인덕턴스와 상호 인덕턴스'
      ],
      tips: [
        '벡터 공식 암기 필수 (del 연산자)',
        '정전계/정자계 대응 관계 이해',
        '단위 변환 문제 주의'
      ],
      studyLink: '/category/mechanical/electric-craftsman/study/electromagnetics',
      difficulty: '중'
    },
    {
      name: '전력공학',
      color: 'bg-green-500',
      topics: [
        '수력발전 (수차 종류, 비속도)',
        '화력발전 (열사이클, 효율)',
        '원자력/신재생 발전',
        '송전선로 (선로정수, 전압강하)',
        '배전방식 (방사상, 루프식)',
        '보호계전 시스템',
        '접지 방식과 종류',
        '역률 개선과 조상설비'
      ],
      tips: [
        '발전 방식별 특징 비교 정리',
        '송전선로 계산 공식 숙지',
        '보호계전기 동작 원리 이해'
      ],
      studyLink: '/category/mechanical/electric-craftsman/study/power',
      difficulty: '중'
    },
    {
      name: '전기기기',
      color: 'bg-red-500',
      topics: [
        '직류기 (구조, 특성, 운전)',
        '변압기 (등가회로, 손실, 효율)',
        '유도전동기 (슬립, 토크, 기동법)',
        '동기기 (발전기, 전동기)',
        '정류기와 인버터',
        '특수전동기 (스테핑, 서보)',
        '전력 변환 장치',
        '전기기기 보호 장치'
      ],
      tips: [
        '변압기 등가회로 계산 반복 연습',
        '유도전동기 슬립 관련 문제 집중',
        '각 기기별 토크-속도 특성 암기'
      ],
      studyLink: '/category/mechanical/electric-craftsman/study/machinery',
      difficulty: '상'
    },
    {
      name: '회로이론 및 제어공학',
      color: 'bg-purple-500',
      topics: [
        '직류회로 (키르히호프 법칙)',
        '교류회로 (페이저, 임피던스)',
        '공진회로 (직렬, 병렬 공진)',
        '다상교류 (3상 결선, 전력)',
        '과도현상 (RL, RC, RLC)',
        '라플라스 변환',
        '전달함수와 블록선도',
        'PID 제어와 안정도'
      ],
      tips: [
        '페이저 계산 문제 반복 연습',
        '3상 결선별 전압/전류 관계',
        '과도현상 시정수 개념 확실히'
      ],
      studyLink: '/category/mechanical/electric-craftsman/study/circuit',
      difficulty: '중'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 시험 정보 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 필기시험 정보</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">문항 수</p>
            <p className="text-2xl font-bold text-gray-800">80문항</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">시험시간</p>
            <p className="text-2xl font-bold text-gray-800">2시간</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">합격기준</p>
            <p className="text-2xl font-bold text-gray-800">평균 60점</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">과락기준</p>
            <p className="text-2xl font-bold text-gray-800">과목당 40점</p>
          </div>
        </div>
      </div>

      {/* 과목별 상세 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 과목별 상세 내용</h2>
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`${subject.color} text-white p-4`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{index + 1}. {subject.name}</h3>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  난이도: {subject.difficulty}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">📖 주요 출제 내용</h4>
                  <ul className="space-y-2">
                    {subject.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-orange-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">💡 학습 팁</h4>
                  <ul className="space-y-2">
                    {subject.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={subject.studyLink}
                    className="mt-4 inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    📖 학습하러 가기 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 학습 전략 */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 필기시험 학습 전략</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600 mb-2">1단계: 기초 다지기 (3주)</h3>
            <p className="text-gray-600">
              전기자기학과 회로이론 기초 개념 확립. 수학적 기초(벡터, 복소수) 필수.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-amber-600 mb-2">2단계: 핵심 과목 (4주)</h3>
            <p className="text-gray-600">
              전기기기 집중 학습. 변압기, 유도기 계산 문제 반복 연습.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-2">3단계: 전력공학 (2주)</h3>
            <p className="text-gray-600">
              발전, 송배전 원리 이해. 실무 관련 문제 유형 파악.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">4단계: 기출문제 (3주)</h3>
            <p className="text-gray-600">
              최근 5개년 기출문제 최소 5회독. 오답노트 작성 필수.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '배선설계',
      description: '전기배선도 작성 및 해석',
      color: 'bg-orange-500',
      topics: [
        '단선결선도 작성',
        '배선도면 해독',
        '전선 굵기 선정',
        '배관 및 덕트 설계',
        '부하 계산',
        '간선 설계'
      ],
      tips: [
        '심볼 기호 완벽 암기',
        '실제 도면 예제 많이 접할 것',
        'KEC 규정 숙지'
      ]
    },
    {
      name: '전력설비 계산',
      description: '변압기, 차단기 용량 계산',
      color: 'bg-amber-500',
      topics: [
        '변압기 용량 계산',
        '차단기 선정',
        '케이블 허용전류',
        '전압강하 계산',
        '단락전류 계산',
        '역률 개선 콘덴서 용량'
      ],
      tips: [
        '공식 유도과정 이해하며 암기',
        '계산기 활용법 숙달',
        '단위 환산 실수 주의'
      ]
    },
    {
      name: '조명설계',
      description: '조도 계산 및 조명 설비',
      color: 'bg-yellow-500',
      topics: [
        '조도 계산 (광속법)',
        '조명률 적용',
        '실지수 계산',
        '등기구 배치',
        '비상조명 설계',
        'LED 조명 적용'
      ],
      tips: [
        '조명률표 해석 연습',
        '실지수 공식 정확히',
        'KS 조도 기준 암기'
      ]
    },
    {
      name: '시퀀스 제어',
      description: 'PLC 및 시퀀스 회로',
      color: 'bg-green-500',
      topics: [
        '시퀀스 회로도 작성',
        'PLC 프로그래밍',
        '타이머/카운터 응용',
        '전동기 기동 회로',
        '자기유지 회로',
        '인터록 회로'
      ],
      tips: [
        'a접점, b접점 동작 원리 확실히',
        '기본 회로 패턴 암기',
        'PLC 래더 다이어그램 연습'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* 실기시험 정보 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🔧 실기시험 정보</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">시험유형</p>
            <p className="text-2xl font-bold text-gray-800">필답형</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">시험시간</p>
            <p className="text-2xl font-bold text-gray-800">2시간 30분</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">합격기준</p>
            <p className="text-2xl font-bold text-gray-800">60점 이상</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">출제형태</p>
            <p className="text-2xl font-bold text-gray-800">서술형+계산</p>
          </div>
        </div>
      </div>

      {/* 실기 분야별 상세 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📐 출제 분야별 상세</h2>
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`${section.color} text-white p-4`}>
              <h3 className="text-xl font-bold">{section.name}</h3>
              <p className="text-white/80 text-sm">{section.description}</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">📖 주요 출제 항목</h4>
                  <ul className="space-y-2">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-orange-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">💡 실기 대비 팁</h4>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
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

      {/* 실기 합격 전략 */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 실기시험 합격 전략</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <h3 className="font-semibold text-gray-800">계산 문제 마스터</h3>
              <p className="text-gray-600">변압기 용량, 전압강하, 조도 계산 등 계산 문제가 60% 이상. 공식 암기 + 반복 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <h3 className="font-semibold text-gray-800">도면 해독 능력</h3>
              <p className="text-gray-600">단선결선도, 배선도 해석 능력 필수. 심볼 기호 암기와 실제 도면 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <h3 className="font-semibold text-gray-800">시퀀스 회로 연습</h3>
              <p className="text-gray-600">전동기 기동 회로, 자기유지 회로 등 기본 패턴 완벽 숙지. PLC 래더 다이어그램 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
            <div>
              <h3 className="font-semibold text-gray-800">기출문제 분석</h3>
              <p className="text-gray-600">최근 5년 기출문제 패턴 분석. 자주 출제되는 유형 집중 공략.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 공식 정리 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 필수 공식 정리</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600 mb-2">변압기 용량</h3>
            <p className="text-gray-600 font-mono text-sm">P = √3 × V × I × cosθ [kVA]</p>
            <p className="text-gray-500 text-sm mt-1">V: 선간전압, I: 선전류</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-amber-600 mb-2">전압강하</h3>
            <p className="text-gray-600 font-mono text-sm">e = K × L × I / A [V]</p>
            <p className="text-gray-500 text-sm mt-1">K: 전압강하계수, L: 거리, A: 단면적</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-2">조도 계산</h3>
            <p className="text-gray-600 font-mono text-sm">E = F × N × U × M / A [lx]</p>
            <p className="text-gray-500 text-sm mt-1">F: 광속, N: 등수, U: 조명률, M: 보수율</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">역률 개선 콘덴서</h3>
            <p className="text-gray-600 font-mono text-sm">Qc = P × (tanθ₁ - tanθ₂) [kVar]</p>
            <p className="text-gray-500 text-sm mt-1">P: 유효전력, θ: 역률각</p>
          </div>
        </div>
      </div>
    </div>
  );
}
