'use client';

import { useState } from 'react';

export default function WeldingEngineerExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-red-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/welding-engineer" className="text-gray-600 hover:text-red-600">용접기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">용접기사 시험 상세</h1>
              <p className="text-red-100">Engineer Welding - 시험 과목 및 출제 경향</p>
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
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-red-500 text-red-600 bg-red-50'
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
      name: '용접야금',
      color: 'bg-red-500',
      topics: [
        '금속의 결정구조 (BCC, FCC, HCP)',
        '철-탄소 상태도',
        '열처리 (담금질, 풀림, 뜨임)',
        '용접 열사이클과 HAZ',
        '용접 금속의 응고와 조직',
        '저온균열 (수소취성, 경화성)',
        '고온균열 (용접균열, 액화균열)',
        '합금 원소의 영향'
      ],
      tips: [
        'Fe-C 상태도 완벽 숙지',
        'HAZ 조직 변화 과정 이해',
        '균열 종류와 방지 대책 정리'
      ],
      studyLink: '/category/mechanical/welding-engineer/study/metallurgy',
      difficulty: '상'
    },
    {
      name: '용접구조설계',
      color: 'bg-orange-500',
      topics: [
        '용접이음의 종류와 기호',
        '용접이음부 강도 계산',
        '용접 잔류응력과 변형',
        '피로 설계와 파괴역학',
        '구조물 설계 기준',
        '용접 접합부 설계',
        '보강재 설계',
        '용접 수축량 계산'
      ],
      tips: [
        '용접 이음 강도 공식 암기',
        '잔류응력 경감 방법 숙지',
        '실제 구조물 설계 예제 연습'
      ],
      studyLink: '/category/mechanical/welding-engineer/study/design',
      difficulty: '상'
    },
    {
      name: '용접시공',
      color: 'bg-green-500',
      topics: [
        '아크용접 (SMAW, GMAW, GTAW)',
        '가스용접 (OAW)',
        '저항용접 (점용접, 심용접)',
        '특수용접 (플라즈마, 레이저, 전자빔)',
        '절단 방법 (가스, 플라즈마)',
        '예열 및 후열처리',
        '용접 자세와 위빙',
        '용접 안전 관리'
      ],
      tips: [
        '각 용접법의 특징 비교 정리',
        '용접 전류/전압/속도 관계 이해',
        '예열 온도 계산법 숙지'
      ],
      studyLink: '/category/mechanical/welding-engineer/study/process',
      difficulty: '중'
    },
    {
      name: '용접검사',
      color: 'bg-blue-500',
      topics: [
        '외관검사 (비드 형상, 결함)',
        '비파괴검사 (RT, UT, MT, PT)',
        '파괴검사 (인장, 굽힘, 충격)',
        '용접 결함의 종류와 원인',
        '품질관리 시스템',
        'WPS/PQR/WPQ',
        '용접사 자격 관리',
        '검사 합격 기준'
      ],
      tips: [
        'NDT 각 방법의 원리와 적용 범위',
        '결함 종류별 발생 원인 정리',
        'WPS 필수 기재 항목 암기'
      ],
      studyLink: '/category/mechanical/welding-engineer/study/inspection',
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
            <p className="text-2xl font-bold text-gray-800">100문항</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">시험시간</p>
            <p className="text-2xl font-bold text-gray-800">2시간 30분</p>
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
                        <span className="text-red-500 mt-1">•</span>
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
                    className="mt-4 inline-block bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
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
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 필기시험 학습 전략</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-red-600 mb-2">1단계: 용접야금 기초 (4주)</h3>
            <p className="text-gray-600">
              금속재료학 기초 개념 확립. Fe-C 상태도, 열처리 원리 완벽 숙지.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600 mb-2">2단계: 용접시공 (3주)</h3>
            <p className="text-gray-600">
              각종 용접법 특징과 적용. 실무 경험이 있으면 빠르게 습득 가능.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-2">3단계: 구조설계+검사 (4주)</h3>
            <p className="text-gray-600">
              용접이음 강도 계산과 NDT 원리. 계산 문제 반복 연습 필수.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">4단계: 기출문제 (3주)</h3>
            <p className="text-gray-600">
              최근 5개년 기출문제 분석. 자주 출제되는 유형 집중 공략.
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
      name: 'WPS/PQR 작성',
      description: '용접절차서 및 인증기록 작성',
      color: 'bg-red-500',
      topics: [
        'WPS (Welding Procedure Specification) 작성',
        'PQR (Procedure Qualification Record) 작성',
        '필수변수 및 비필수변수',
        '용접 재료 선정 및 기록',
        '예열/후열처리 조건',
        '용접 이음 상세도 작성'
      ],
      tips: [
        'WPS 필수 기재 항목 완벽 암기',
        'AWS/ASME 코드 기준 숙지',
        '실제 WPS 양식으로 연습'
      ]
    },
    {
      name: '용접 결함 분석',
      description: '결함 원인 분석 및 대책',
      color: 'bg-orange-500',
      topics: [
        '균열 결함 (저온균열, 고온균열)',
        '기공 결함 (블로홀, 피트)',
        '용입불량 및 융합불량',
        '언더컷, 오버랩',
        '슬래그 혼입',
        '결함 보수 방법'
      ],
      tips: [
        '결함별 발생 원인과 대책 표로 정리',
        '결함 사진 판독 연습',
        '보수 용접 절차 이해'
      ]
    },
    {
      name: '용접 작업 실기',
      description: '실제 용접 작업 수행',
      color: 'bg-green-500',
      topics: [
        '피복 아크 용접 (SMAW)',
        'CO2 용접 (GMAW)',
        'TIG 용접 (GTAW)',
        '다층 용접 기법',
        '위빙 기술',
        '비드 외관 관리'
      ],
      tips: [
        '용접 자세별 요령 숙달',
        '용접봉/와이어 선정 기준',
        '용접 조건 설정 능력'
      ]
    },
    {
      name: 'NDT 판독',
      description: '비파괴검사 결과 해석',
      color: 'bg-blue-500',
      topics: [
        'RT (방사선) 필름 판독',
        'UT (초음파) 결과 해석',
        'MT (자분) 검사 결과',
        'PT (침투) 검사 결과',
        '결함 크기 측정',
        '합격 판정 기준'
      ],
      tips: [
        'RT 필름 결함 패턴 암기',
        'UT 반사파 해석 원리 이해',
        'KS/AWS 합격 기준 숙지'
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
            <p className="text-2xl font-bold text-gray-800">필답형+작업형</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">시험시간</p>
            <p className="text-2xl font-bold text-gray-800">약 5시간</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">합격기준</p>
            <p className="text-2xl font-bold text-gray-800">60점 이상</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">출제형태</p>
            <p className="text-2xl font-bold text-gray-800">서술+작업</p>
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
                        <span className="text-red-500 mt-1">•</span>
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
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 실기시험 합격 전략</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <h3 className="font-semibold text-gray-800">WPS 작성 완벽 마스터</h3>
              <p className="text-gray-600">WPS 필수 기재 항목을 완벽히 암기하고, 다양한 용접 조건에 대한 WPS 작성 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <h3 className="font-semibold text-gray-800">결함 분석 능력</h3>
              <p className="text-gray-600">용접 결함 사진을 보고 종류, 원인, 대책을 즉시 작성할 수 있도록 반복 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <h3 className="font-semibold text-gray-800">실제 용접 작업 연습</h3>
              <p className="text-gray-600">용접 실기 작업은 현장 경험이 중요. 용접 학원이나 현장에서 실습 기회 확보.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
            <div>
              <h3 className="font-semibold text-gray-800">NDT 판독 훈련</h3>
              <p className="text-gray-600">RT 필름, UT 결과 판독 연습. 결함 패턴과 합격 기준 숙지.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 용접 기호 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 주요 용접 기호</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-600 mb-2">맞대기 용접</h3>
            <p className="text-gray-600 text-sm">V형, X형, U형, H형</p>
            <p className="text-gray-500 text-xs mt-1">판 두께에 따른 개선 형상 선택</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600 mb-2">필릿 용접</h3>
            <p className="text-gray-600 text-sm">T형, 겹치기, 모서리</p>
            <p className="text-gray-500 text-xs mt-1">목 두께와 각장 계산</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-2">특수 기호</h3>
            <p className="text-gray-600 text-sm">뒷면용접, 살붙임, 전주용접</p>
            <p className="text-gray-500 text-xs mt-1">AWS A2.4 기호 표준</p>
          </div>
        </div>
      </div>
    </div>
  );
}
