'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ControlEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-cyan-600">기계·제어</Link>
            <span>/</span>
            <Link href="/category/mechanical/control-engineer" className="hover:text-cyan-600">제어계측기사</Link>
            <span>/</span>
            <span className="text-cyan-600 font-medium">
              {activeTab === 'written' ? '필기시험' : '실기시험'}
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎛️</span>
            <div>
              <h1 className="text-3xl font-bold">제어계측기사 시험 상세</h1>
              <p className="text-cyan-100 mt-2">
                필기 및 실기 시험의 과목별 상세 내용과 학습 전략
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'written'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'practical'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🔧 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <PracticalExamContent />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 자격증 가이드. 제어계측기사 합격을 응원합니다! 🎛️
          </p>
        </div>
      </footer>
    </div>
  );
}

function WrittenExamContent() {
  const subjects = [
    {
      name: '계측기 개론',
      color: 'bg-cyan-500',
      topics: [
        '측정의 기초 (정확도, 정밀도, 분해능)',
        '오차론 (계통오차, 우연오차, 오차전파)',
        '온도계측 (열전대, 측온저항체, 방사온도계)',
        '압력계측 (부르동관, 다이어프램, 압전소자)',
        '유량계측 (오리피스, 벤튜리, 전자유량계)',
        '레벨계측 (부력식, 차압식, 초음파식)',
        '분석계측 (pH계, 가스분석기, 농도계)'
      ],
      tips: [
        '각 센서의 측정 원리와 특성을 정확히 이해',
        '오차 계산 문제 반복 연습 필수',
        '산업현장 적용 사례와 연계하여 학습'
      ],
      studyLink: '/study/control/instrumentation',
      difficulty: '중'
    },
    {
      name: '자동제어',
      color: 'bg-teal-500',
      topics: [
        '제어시스템 개요 (개루프, 폐루프)',
        '라플라스 변환 및 역변환',
        '전달함수와 블록선도',
        'PID 제어 (P, I, D 각 요소의 역할)',
        '안정도 판별 (Routh, Nyquist, Bode)',
        '근궤적법과 주파수 응답',
        '현대제어 기초 (상태공간, 가제어성, 가관측성)'
      ],
      tips: [
        '라플라스 변환 공식 암기 필수',
        'PID 튜닝 방법 (Ziegler-Nichols 등) 숙지',
        '안정도 판별법 문제는 계산 연습 많이 필요'
      ],
      studyLink: '/study/control/automatic-control',
      difficulty: '상'
    },
    {
      name: '공업전자 및 전기',
      color: 'bg-blue-500',
      topics: [
        '전자회로 기초 (다이오드, 트랜지스터)',
        '연산증폭기 (OP-AMP) 응용회로',
        'A/D, D/A 변환기',
        '전원회로 (정류, 평활, 안정화)',
        '디지털 논리회로 (게이트, 플립플롭)',
        '마이크로프로세서 기초',
        '전기기기 (변압기, 전동기, 발전기)'
      ],
      tips: [
        'OP-AMP 회로 해석 문제 자주 출제',
        'A/D 변환기 분해능 계산 문제 연습',
        '전기 기본 법칙 (옴의 법칙, 키르히호프 법칙) 확실히'
      ],
      studyLink: '/study/control/electronics',
      difficulty: '중'
    },
    {
      name: '계장시스템',
      color: 'bg-purple-500',
      topics: [
        '계장시스템 구성 (센서-전송기-제어기-조작기)',
        '신호 전송 (4-20mA, HART, Fieldbus)',
        'DCS와 PLC 시스템',
        '제어밸브 (특성곡선, 사이징)',
        'SIS와 안전계장 (SIL 등급)',
        '방폭 시스템과 접지',
        'P&ID 도면 해석'
      ],
      tips: [
        '4-20mA 신호 계산 문제 정복',
        '제어밸브 Cv 계산 공식 숙지',
        'P&ID 심볼 암기 필수'
      ],
      studyLink: '/study/control/instrumentation-system',
      difficulty: '중'
    },
    {
      name: '공정제어',
      color: 'bg-orange-500',
      topics: [
        '공정 동특성과 모델링',
        '비례대, 적분시간, 미분시간 튜닝',
        '캐스케이드 제어',
        '피드포워드 제어',
        '비율제어와 선택제어',
        '분산제어시스템 (DCS) 응용',
        '배치 제어와 시퀀스 제어'
      ],
      tips: [
        '각 제어 방식의 적용 상황 이해가 중요',
        '캐스케이드 제어의 마스터-슬레이브 개념',
        '실제 공정 사례와 연계하여 학습'
      ],
      studyLink: '/study/control/process-control',
      difficulty: '상'
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
                        <span className="text-cyan-500 mt-1">•</span>
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
                  <Link
                    href={subject.studyLink}
                    className="mt-4 inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-200 transition-colors"
                  >
                    📖 학습하러 가기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 학습 전략 */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 필기시험 학습 전략</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-cyan-600 mb-2">1단계: 기초 다지기 (3주)</h3>
            <p className="text-gray-600">
              계측기 개론과 공업전자 기초부터 시작. 센서 원리와 전자회로 기본 개념을 확실히.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-teal-600 mb-2">2단계: 핵심 과목 (4주)</h3>
            <p className="text-gray-600">
              자동제어와 공정제어 집중. 라플라스 변환, PID 제어, 안정도 판별 완벽 정복.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">3단계: 시스템 통합 (2주)</h3>
            <p className="text-gray-600">
              계장시스템 전체 흐름 이해. DCS/PLC, 신호 전송, 제어밸브를 연계하여 학습.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600 mb-2">4단계: 기출문제 (3주)</h3>
            <p className="text-gray-600">
              최근 5개년 기출문제 반복. 시간 배분 연습과 취약 과목 보강.
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
      name: '계장 설계 및 도면',
      description: '계장 시스템 설계와 도면 작성',
      color: 'bg-cyan-500',
      topics: [
        'P&ID (배관계장도) 작성 및 해석',
        '계장 Loop Diagram 작성',
        '제어밸브 사이징 및 선정',
        '계장 배선도 작성',
        '접지 및 방폭 설계',
        '계장 설비 사양서 작성'
      ],
      tips: [
        'ISA/KS 심볼 표준 암기 필수',
        'Cv 계산 공식과 적용 연습',
        '실제 도면 작성 연습 많이 할 것'
      ]
    },
    {
      name: '제어시스템 설계',
      description: 'PLC/DCS 기반 제어 시스템 설계',
      color: 'bg-teal-500',
      topics: [
        'PLC 프로그래밍 (래더 다이어그램)',
        'DCS 제어 로직 설계',
        '시퀀스 제어 프로그램 작성',
        'PID 제어기 파라미터 설정',
        'HMI 화면 설계',
        '인터록 및 알람 시스템'
      ],
      tips: [
        'PLC 래더 로직 직접 작성 연습',
        '타이머, 카운터 응용 문제 많이 풀기',
        'PID 튜닝 시뮬레이션 연습'
      ]
    },
    {
      name: '계측기 선정 및 설치',
      description: '현장 조건에 맞는 계측기 선정',
      color: 'bg-blue-500',
      topics: [
        '공정 조건별 센서 선정',
        '측정 범위와 정확도 결정',
        '설치 위치 및 방법',
        '배선 및 신호 처리',
        '교정 및 검증 절차',
        '유지보수 계획 수립'
      ],
      tips: [
        '각 센서 유형의 장단점 비교 정리',
        '설치 환경 (온도, 진동, 부식) 고려사항',
        '실제 사례 기반 문제 연습'
      ]
    },
    {
      name: '시운전 및 유지보수',
      description: '계장 시스템 시운전과 문제 해결',
      color: 'bg-purple-500',
      topics: [
        'Loop 테스트 및 검증',
        '제어밸브 캘리브레이션',
        '센서 교정 절차',
        '시스템 트러블슈팅',
        '예방정비 계획',
        '기록 및 문서화'
      ],
      tips: [
        '실무 경험이 중요 - 현장 방문 권장',
        '트러블슈팅 시나리오별 대응 방법 정리',
        '안전 절차 (LOTO 등) 숙지'
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
            <p className="text-2xl font-bold text-gray-800">3시간</p>
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
                        <span className="text-cyan-500 mt-1">•</span>
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
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 실기시험 합격 전략</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <h3 className="font-semibold text-gray-800">도면 작성 능력 강화</h3>
              <p className="text-gray-600">P&ID, Loop Diagram을 직접 그려보며 연습. 심볼과 표기법 완벽 숙지.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <h3 className="font-semibold text-gray-800">계산 문제 연습</h3>
              <p className="text-gray-600">제어밸브 Cv 계산, 센서 오차 계산, PID 파라미터 계산 문제 반복 연습.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <h3 className="font-semibold text-gray-800">PLC 프로그래밍</h3>
              <p className="text-gray-600">래더 다이어그램 작성 연습. 타이머, 카운터, 비교 명령어 활용 문제 풀이.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex gap-4 items-start">
            <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
            <div>
              <h3 className="font-semibold text-gray-800">기출문제 분석</h3>
              <p className="text-gray-600">최근 기출문제 유형 파악. 자주 출제되는 주제 집중 공략.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 공식 정리 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 필수 공식 정리</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-cyan-600 mb-2">제어밸브 Cv 계산</h3>
            <p className="text-gray-600 font-mono text-sm">Cv = Q × √(SG / ΔP)</p>
            <p className="text-gray-500 text-sm mt-1">Q: 유량, SG: 비중, ΔP: 차압</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-teal-600 mb-2">4-20mA 신호 변환</h3>
            <p className="text-gray-600 font-mono text-sm">I = 4 + 16 × (PV - Min) / (Max - Min)</p>
            <p className="text-gray-500 text-sm mt-1">PV: 측정값, Min/Max: 범위</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">PID 제어 출력</h3>
            <p className="text-gray-600 font-mono text-sm">CO = Kp × (e + 1/Ti × ∫e dt + Td × de/dt)</p>
            <p className="text-gray-500 text-sm mt-1">Kp: 비례이득, Ti: 적분시간, Td: 미분시간</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600 mb-2">오차율 계산</h3>
            <p className="text-gray-600 font-mono text-sm">오차율(%) = (측정값 - 참값) / 참값 × 100</p>
            <p className="text-gray-500 text-sm mt-1">계측기 정확도 평가에 사용</p>
          </div>
        </div>
      </div>
    </div>
  );
}
