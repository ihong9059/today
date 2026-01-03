'use client';

import { useState } from 'react';

export default function ElectricEngineerExamPage() {
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
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-orange-600">전기기사</a>
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
              <span className="text-4xl">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전기기사 시험 상세</h1>
              <p className="text-orange-100">Engineer Electricity - 시험 과목 및 출제 경향</p>
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
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
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
      name: '전기자기학',
      questions: 20,
      difficulty: 5,
      passRate: '15%',
      color: 'red',
      topics: [
        '벡터 해석 및 좌표계',
        '정전계 (쿨롱의 법칙, 전위, 전계)',
        '도체계와 정전용량',
        '유전체와 경계조건',
        '정자계 (비오-사바르 법칙, 암페어 법칙)',
        '자성체와 인덕턴스',
        '전자유도와 맥스웰 방정식',
      ],
      tips: [
        '가장 어려운 과목, 과락률 1위',
        '공식 암기보다 개념 이해가 중요',
        '벡터 계산 문제 반복 연습 필수',
        '기출문제 최소 5회독 권장',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/electromagnetics',
    },
    {
      id: 2,
      name: '전력공학',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'green',
      topics: [
        '송전선로 (선로정수, 코로나)',
        '송전특성 및 전력원선도',
        '중성점 접지방식',
        '이상전압 및 방호대책',
        '유도장해와 차폐',
        '배전방식 및 배전선로',
        '수력/화력/원자력 발전',
      ],
      tips: [
        '암기 위주 과목, 고득점 가능',
        '송전/배전 공식 정리 필수',
        '발전 부분 출제 빈도 높음',
        '계산 문제 유형 반복',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/power-engineering',
    },
    {
      id: 3,
      name: '전기기기',
      questions: 20,
      difficulty: 4,
      passRate: '25%',
      color: 'orange',
      topics: [
        '직류기 (발전기, 전동기)',
        '동기기 (발전기, 전동기)',
        '변압기 (구조, 결선, 병렬운전)',
        '유도기 (3상, 단상 유도전동기)',
        '정류기 및 인버터',
        '특수 전동기',
      ],
      tips: [
        '과락률 2위, 계산 문제 많음',
        '변압기, 유도전동기 집중 학습',
        '등가회로 이해 필수',
        '효율, 전압변동률 계산 연습',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/machinery',
    },
    {
      id: 4,
      name: '회로이론 및 제어공학',
      questions: 20,
      difficulty: 3,
      passRate: '40%',
      color: 'blue',
      topics: [
        '회로이론: R-L-C 회로 해석',
        '회로이론: 교류회로 및 공진',
        '회로이론: 대칭좌표법, 다상회로',
        '회로이론: 과도현상, 라플라스 변환',
        '제어공학: 블록선도, 신호흐름선도',
        '제어공학: 전달함수, 주파수응답',
        '제어공학: 안정도 판별 (루스, 나이퀴스트)',
      ],
      tips: [
        '기초 과목, 먼저 공부 권장',
        '라플라스 변환 완벽 이해',
        '제어공학 공식 암기 필수',
        '계산 속도가 중요',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/circuit-control',
    },
    {
      id: 5,
      name: '전기설비기술기준',
      questions: 20,
      difficulty: 2,
      passRate: '55%',
      color: 'green',
      topics: [
        '총칙 및 용어 정의',
        '전선 및 전로',
        '전기사용장소 시설',
        '저압/고압/특고압 전기설비',
        '전기철도 설비',
        '분산형 전원설비',
        '접지/피뢰 설비',
      ],
      tips: [
        '순수 암기 과목, 막판 집중 공부',
        '숫자(이격거리, 전선굵기) 정리',
        'KEC 개정 내용 반영 확인',
        '최근 기출 반복이 가장 효과적',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/standards',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">5과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">100문항</p>
            <p className="text-sm text-gray-500">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">2시간 30분</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">객관식</p>
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
              subject.color === 'red' ? 'from-red-500 to-red-400' :
              subject.color === 'green' ? 'from-green-500 to-green-400' :
              subject.color === 'orange' ? 'from-orange-500 to-orange-400' :
              'from-blue-500 to-blue-400'
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
                        <span className="text-orange-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                        subject.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                        subject.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
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

      {/* Study Order */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 추천 학습 순서</h2>
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {['회로이론/제어', '전력공학', '전기기기', '전기자기학', '전기설비기술기준'].map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="font-medium text-gray-700">{name}</span>
              {i < 4 && <span className="text-gray-300 text-2xl ml-2">→</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          기초(회로이론) → 암기(전력) → 응용(전기기기) → 심화(전자기) → 마무리(기술기준)
        </p>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '단답형 문제',
      ratio: '70-85%',
      points: '약 60-70점',
      color: 'indigo',
      topics: [
        '용어 정의 및 설명',
        '전기설비 기술기준',
        '전력계통 관련 이론',
        '안전관리 및 규정',
        '전기기기 특성',
      ],
      tips: [
        '기출 용어 반복 암기',
        '핵심 키워드 위주 정리',
        '최근 5년 기출 필수',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/practical',
    },
    {
      name: '수변전 설비',
      ratio: '10-15%',
      points: '약 10-15점',
      color: 'purple',
      topics: [
        '수변전 설비 단선도 해석',
        '변압기 용량 계산',
        '차단기/개폐기 선정',
        '보호협조 검토',
        '접지시스템 설계',
      ],
      tips: [
        '단선도 기호 완벽 암기',
        '용량 계산 공식 정리',
        '실제 도면 많이 보기',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/practical',
    },
    {
      name: '시퀀스/PLC',
      ratio: '5-10%',
      points: '약 5-10점',
      color: 'violet',
      topics: [
        '시퀀스 회로도 해석',
        '타임차트 작성',
        'PLC 래더 다이어그램',
        '전동기 제어회로',
        '자기유지회로, 인터록',
      ],
      tips: [
        '기본 회로 패턴 암기',
        '타임차트 그리기 연습',
        'a접점/b접점 구분',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/practical',
    },
    {
      name: '계산 문제',
      ratio: '10-15%',
      points: '약 10-15점',
      color: 'fuchsia',
      topics: [
        '고장전류 계산 (%Z법)',
        '전압강하 계산',
        '역률개선 계산',
        '부하 계산',
        '케이블 굵기 선정',
      ],
      tips: [
        '공식 유도과정 이해',
        '단위 환산 정확히',
        '계산기 사용법 숙달',
      ],
      studyLink: '/category/mechanical/electric-engineer/study/practical',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">필답형</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">2시간 30분</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상 (과락 없음, 필기보다 유리!)
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">📋 출제 영역별 상세</h2>
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
                        section.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        section.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        section.color === 'violet' ? 'bg-violet-500 hover:bg-violet-600' :
                        'bg-fuchsia-500 hover:bg-fuchsia-600'
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
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-700 mb-2">1단계: 기출 분석</h3>
            <p className="text-sm text-gray-600">최근 10년 기출문제 패턴 파악. 반복 출제 용어 정리</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">2단계: 용어 암기</h3>
            <p className="text-sm text-gray-600">단답형 60점 확보가 핵심. 매일 10개씩 암기</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">3단계: 실전 연습</h3>
            <p className="text-sm text-gray-600">시간 배분 연습. 모르는 문제는 과감히 넘기기</p>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-3">
          {[
            { name: '단답형 (쉬운 문제)', time: '60분', color: 'bg-green-500' },
            { name: '단답형 (어려운 문제)', time: '30분', color: 'bg-yellow-500' },
            { name: '수변전/시퀀스', time: '30분', color: 'bg-orange-500' },
            { name: '계산 문제', time: '20분', color: 'bg-red-500' },
            { name: '검토', time: '10분', color: 'bg-blue-500' },
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
