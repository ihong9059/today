'use client';

import { useState } from 'react';

export default function SolarPowerEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '태양광발전시스템 이론',
      icon: '☀️',
      questions: 20,
      time: 30,
      passRate: 45,
      difficulty: 4,
      color: 'yellow',
      topics: [
        '태양전지의 원리와 종류 (결정질, 박막, 유기)',
        'I-V 특성곡선과 MPP(최대출력점)',
        '일사량 분석과 발전량 예측',
        '온도계수와 효율 저하 요인',
        '태양전지 모듈의 구조와 규격',
        '직렬/병렬 연결과 미스매치 손실',
        '태양광 어레이 설계 기초',
        'PV 시스템 성능비(PR) 계산',
      ],
      tips: '태양전지 효율 계산과 I-V 곡선 해석이 매회 출제됩니다. MPP, Voc, Isc 관계를 명확히 이해하세요.',
      studyLink: '/category/mechanical/solar-power-engineer/study/photovoltaics',
    },
    {
      name: '전력계통 및 전기설비',
      icon: '⚡',
      questions: 20,
      time: 30,
      passRate: 40,
      difficulty: 4,
      color: 'orange',
      topics: [
        '계통연계형/독립형 시스템 구성',
        '인버터의 종류와 특성 (중앙, 스트링, 마이크로)',
        '계통연계 보호장치와 단독운전 방지',
        '수배전반 및 분전반 설계',
        '전력변환 효율과 손실 분석',
        'ESS(에너지저장장치) 연계',
        '역률개선과 고조파 대책',
        '접속함 및 접속반 구성',
      ],
      tips: '인버터 MPPT 동작원리와 계통연계 조건(전압, 주파수 범위)이 자주 출제됩니다.',
      studyLink: '/category/mechanical/solar-power-engineer/study/power-systems',
    },
    {
      name: '태양광발전설비 설계',
      icon: '📐',
      questions: 20,
      time: 30,
      passRate: 35,
      difficulty: 5,
      color: 'red',
      topics: [
        '발전용량 및 어레이 설계 계산',
        '경사각, 방위각 최적화 설계',
        '음영분석과 이격거리 산정',
        '전기설계 (케이블 굵기, 전압강하)',
        '구조물 설계와 하중 계산',
        '접지시스템 설계 (TN, TT, IT)',
        'SPD(서지보호장치) 선정',
        '단선결선도 작성법',
      ],
      tips: '설계 계산문제가 가장 어렵습니다. 용량산정, 케이블굵기, 전압강하 공식을 반드시 암기하세요!',
      studyLink: '/category/mechanical/solar-power-engineer/study/electrical-equipment',
    },
    {
      name: '태양광발전설비 시공',
      icon: '🔧',
      questions: 20,
      time: 30,
      passRate: 55,
      difficulty: 3,
      color: 'green',
      topics: [
        '모듈 설치공법 (지붕형, 지상형, 수상형)',
        '구조물 시공과 앵커 설치',
        '배선공사 및 커넥터 연결',
        '접지공사 및 피뢰시스템',
        '인버터 및 접속함 설치',
        '계통연계 및 계량기 설치',
        '시운전 및 성능검사',
        '품질관리 및 안전관리',
      ],
      tips: '시공순서와 안전수칙 위주로 학습하세요. 실무 사진을 보며 공법을 익히면 효과적입니다.',
      studyLink: '/category/mechanical/solar-power-engineer/study/construction',
    },
    {
      name: '전기설비기술기준 및 법규',
      icon: '📜',
      questions: 20,
      time: 30,
      passRate: 50,
      difficulty: 3,
      color: 'blue',
      topics: [
        '한국전기설비규정(KEC) 주요 조항',
        '신에너지 및 재생에너지법',
        '전기사업법 및 시행령',
        '전기안전관리법',
        'REC/RPS 제도 이해',
        '발전사업 인허가 절차',
        '전력거래와 정산제도',
        '환경영향평가 관련 법규',
      ],
      tips: '법규 개정사항을 반드시 확인하세요. 특히 KEC 관련 조항은 매회 5문제 이상 출제됩니다.',
      studyLink: '/category/mechanical/solar-power-engineer/study/standards',
    },
  ];

  const practicalAreas = [
    {
      name: '태양광발전시스템 설계',
      weight: 25,
      icon: '📐',
      color: 'yellow',
      items: ['발전용량 산정', '어레이 배치 설계', '전기설계도 작성', '설계도서 검토'],
      frequency: '매회',
    },
    {
      name: '발전량 예측 및 경제성 분석',
      weight: 20,
      icon: '📊',
      color: 'orange',
      items: ['일사량 데이터 분석', '연간발전량 계산', '투자비 회수기간', 'LCOE 산정'],
      frequency: '매회',
    },
    {
      name: '전력품질 및 계통연계',
      weight: 20,
      icon: '⚡',
      color: 'red',
      items: ['인버터 설정 및 시험', '계통연계 조건 확인', '보호협조 검토', '역률/고조파 분석'],
      frequency: '자주',
    },
    {
      name: '설비 시공 및 시험',
      weight: 20,
      icon: '🔧',
      color: 'green',
      items: ['모듈 특성시험', '절연저항 측정', '접지저항 측정', 'I-V 특성 측정'],
      frequency: '매회',
    },
    {
      name: '유지보수 및 안전관리',
      weight: 15,
      icon: '🛡️',
      color: 'blue',
      items: ['고장진단 및 조치', '성능저하 분석', '안전점검 실시', '유지보수 계획 수립'],
      frequency: '간헐',
    },
  ];

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-300' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-300' },
      red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-300' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-300' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-300' },
    };
    return colors[color]?.[type] || '';
  };

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
            <a href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-orange-600">태양광발전설비기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">☀️</span>
            <div>
              <h1 className="text-2xl font-bold">태양광발전설비기사 시험 상세</h1>
              <p className="text-yellow-100">필기 5과목 100문항 / 실기 필답형+작업형</p>
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
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">5</p>
                  <p className="text-sm text-gray-600">과목</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-orange-600">100</p>
                  <p className="text-sm text-gray-600">문항</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">2:30</p>
                  <p className="text-sm text-gray-600">시간</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">60점</p>
                  <p className="text-sm text-gray-600">합격기준 (과락 40점)</p>
                </div>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
              {writtenSubjects.map((subject, idx) => (
                <div key={idx} className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${getColorClass(subject.color, 'border').replace('border-', 'border-l-')}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{idx + 1}. {subject.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{subject.questions}문항</span>
                            <span>{subject.time}분</span>
                            <span>합격률 {subject.passRate}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= subject.difficulty ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">출제 토픽</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {subject.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className={`w-5 h-5 ${getColorClass(subject.color, 'bg')} text-white rounded-full flex items-center justify-center text-xs`}>{tIdx + 1}</span>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-yellow-800">💡 <strong>합격 TIP:</strong> {subject.tips}</p>
                    </div>

                    {subject.studyLink && (
                      <a href={subject.studyLink} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition text-sm font-medium">
                        📚 {subject.name} 학습하기 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">📌 시간 배분</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      1과목 (이론): 25분 - 기본개념 빠르게
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      2과목 (전력계통): 30분 - 계산문제 주의
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      3과목 (설계): 40분 - 가장 어려움, 충분히
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      4과목 (시공): 25분 - 암기 위주
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      5과목 (법규): 25분 - 조문 암기
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                      검토: 5분
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">⚠️ 주의사항</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 과락(40점) 주의 - 특히 설계과목</li>
                    <li>• 설계 계산문제는 공식을 정확히 암기</li>
                    <li>• 법규 개정사항 반드시 확인</li>
                    <li>• 계통연계 조건(전압/주파수) 숫자 암기</li>
                    <li>• KEC 관련 조항 반복 학습</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 최근 출제 경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📈 최근 출제 경향</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-gray-700 mb-2">2025년 출제 트렌드</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 양면형 모듈, BIPV 관련 문제 증가</li>
                    <li>• ESS 연계 시스템 문제 신규 출제</li>
                    <li>• KEC 개정사항 관련 법규 문제 다수</li>
                    <li>• 경제성 분석(LCOE, IRR) 계산문제 증가</li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="font-bold text-yellow-700">이론 트렌드</p>
                    <p className="text-sm text-yellow-600 mt-1">페로브스카이트, 이종접합 등 신기술 출제</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="font-bold text-orange-700">설계 트렌드</p>
                    <p className="text-sm text-orange-600 mt-1">수상태양광, 영농형 설계 문제 증가</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-bold text-blue-700">법규 트렌드</p>
                    <p className="text-sm text-blue-600 mt-1">RE100, REC 거래제도 관련 출제</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">필답형</p>
                  <p className="text-sm text-gray-600">주관식/서술형</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-orange-600">+작업형</p>
                  <p className="text-sm text-gray-600">실무 작업</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">약 4시간</p>
                  <p className="text-sm text-gray-600">시험시간</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">60점</p>
                  <p className="text-sm text-gray-600">합격기준</p>
                </div>
              </div>
            </section>

            {/* 영역별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📊 영역별 상세</h2>
              {practicalAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className={`${getColorClass(area.color, 'bg')} px-6 py-3 flex items-center justify-between`}>
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-2xl">{area.icon}</span>
                      <h3 className="font-bold">{area.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">배점 {area.weight}%</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${area.frequency === '매회' ? 'bg-red-600' : area.frequency === '자주' ? 'bg-yellow-600' : 'bg-gray-600'}`}>
                        {area.frequency}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-3">
                      {area.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className={`w-5 h-5 ${getColorClass(area.color, 'bg')} text-white rounded-full flex items-center justify-center text-xs`}>✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 출제 경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📈 출제 경향</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left">출제 빈도</th>
                      <th className="px-4 py-3 text-left">주요 문제 유형</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">매회 출제</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">발전용량 계산, 어레이 설계, I-V 특성분석, 접지저항 측정</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">자주 출제</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">인버터 설정, 전압강하 계산, 경제성 분석, 고장진단</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">간헐 출제</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">ESS 연계설계, 수상태양광 특수시공, 환경영향 검토</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 실기 대비 팁 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기 대비 팁</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">📝 필답형 대비</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      설계 계산공식 완벽 암기 (용량, 케이블, 전압강하)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      단위 변환 실수 주의 (kW, MW, kWh)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      답안 작성 시 계산과정 필수 기재
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      최근 기출문제 유형 반복 연습
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">🔧 작업형 대비</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      측정장비 사용법 숙지 (절연저항계, 접지저항계)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      I-V 커브트레이서 측정 및 해석 연습
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      인버터 파라미터 설정 절차 암기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      실기 동영상 강의로 작업 순서 학습
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 실기 학습하기 */}
            <section className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">📚 실기 학습하기</h2>
              <p className="text-yellow-100 mb-4">실기시험 대비 핵심 문제를 풀어보세요</p>
              <a
                href="/category/mechanical/solar-power-engineer/study/practical"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition"
              >
                🔧 실기 문제 풀기 →
              </a>
            </section>
          </div>
        )}
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
