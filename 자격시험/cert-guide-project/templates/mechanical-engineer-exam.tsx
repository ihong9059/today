'use client';

import { useState } from 'react';

export default function MechanicalEngineerExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/mechanical-engineer" className="text-gray-600 hover:text-blue-600">기계기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">기계기사 시험 상세</h1>
              <p className="text-blue-100">Engineer Machinery - 시험 과목 및 출제 경향</p>
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
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
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
      name: '재료역학',
      questions: 20,
      difficulty: 4,
      passRate: '25%',
      color: 'blue',
      topics: [
        '응력과 변형률 (인장, 압축, 전단)',
        '보의 굽힘 응력 및 처짐',
        '비틀림 (축, 스프링)',
        '조합응력 및 모어의 응력원',
        '기둥의 좌굴 (오일러, 랭킨)',
        '단면의 성질 (단면2차모멘트)',
        '응력 집중 및 피로',
      ],
      tips: [
        '계산 문제 비중 높음',
        '공식 암기 및 유도 능력 필수',
        '보의 처짐 공식 정리',
        '기출문제 유형 반복 학습',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/mechanics',
    },
    {
      id: 2,
      name: '열역학',
      questions: 20,
      difficulty: 4,
      passRate: '30%',
      color: 'red',
      topics: [
        '열역학 제1법칙, 제2법칙',
        '이상기체 상태방정식',
        '열역학적 과정 (등온, 등압, 단열 등)',
        '카르노 사이클',
        '증기 사이클 (랭킨, 재열, 재생)',
        '가스 사이클 (오토, 디젤, 브레이튼)',
        '냉동 사이클',
      ],
      tips: [
        '사이클 문제 반복 출제',
        'T-s, P-v 선도 이해 필수',
        '효율 공식 암기',
        '실제 사이클과 이상 사이클 비교',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/thermodynamics',
    },
    {
      id: 3,
      name: '유체역학',
      questions: 20,
      difficulty: 3,
      passRate: '40%',
      color: 'cyan',
      topics: [
        '유체의 성질 (밀도, 점성, 압축성)',
        '정역학 (압력, 부력)',
        '연속방정식, 베르누이 방정식',
        '운동량 방정식',
        '관로 유동 (층류, 난류, 손실)',
        '차원해석 및 상사법칙',
        '유체계측 (피토관, 오리피스, 벤츄리)',
      ],
      tips: [
        '베르누이 방정식 응용 중요',
        '손실계산 공식 정리',
        '레이놀즈 수 관련 문제',
        '비교적 고득점 가능',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/fluid',
    },
    {
      id: 4,
      name: '기계제작법 및 기계동력학',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'green',
      topics: [
        '주조 (모형, 주형, 주조결함)',
        '소성가공 (단조, 압연, 인발, 압출)',
        '용접 (아크, 가스, 특수용접)',
        '절삭가공 (선삭, 밀링, 드릴링)',
        '연삭 및 정밀가공',
        '진동 (자유, 강제, 감쇠)',
        '기계요소의 동역학',
      ],
      tips: [
        '암기 위주 과목',
        '절삭이론 공식 정리',
        '용접 결함 및 검사법',
        '고득점 가능, 마지막에 집중',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/manufacturing',
    },
    {
      id: 5,
      name: '기계설계 및 기계재료',
      questions: 20,
      difficulty: 3,
      passRate: '40%',
      color: 'purple',
      topics: [
        '나사, 볼트, 너트 설계',
        '축 및 축이음 설계',
        '베어링 (미끄럼, 구름)',
        '기어 (스퍼, 헬리컬, 베벨, 웜)',
        '벨트, 체인, 로프 전동',
        '스프링 설계',
        '금속재료 (철강, 비철금속)',
        '열처리 (담금질, 뜨임, 불림)',
      ],
      tips: [
        '설계 공식 암기 필수',
        '재료별 특성 정리',
        '열처리 종류 구분',
        '기어 계산 문제 연습',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/design',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">5과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">100문항</p>
            <p className="text-sm text-gray-500">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">2시간 30분</p>
            <p className="text-sm text-gray-500">시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">객관식</p>
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
              subject.color === 'red' ? 'from-red-500 to-orange-400' :
              subject.color === 'cyan' ? 'from-cyan-500 to-blue-400' :
              subject.color === 'green' ? 'from-green-500 to-emerald-400' :
              'from-purple-500 to-indigo-400'
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
                        <span className="text-blue-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {subject.studyLink && (
                    <a
                      href={subject.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        subject.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        subject.color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                        subject.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        subject.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
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
          {['재료역학', '열역학', '유체역학', '기계제작법/동력학', '기계설계/재료'].map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <span className="font-medium text-gray-700">{name}</span>
              {i < 4 && <span className="text-gray-300 text-2xl ml-2">→</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          기초(재료역학) → 응용(열역학/유체) → 암기(제작법) → 마무리(설계/재료)
        </p>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const sections = [
    {
      name: '필답형 (계산/이론)',
      ratio: '약 50%',
      points: '약 50점',
      color: 'blue',
      topics: [
        '재료역학 계산 (응력, 처짐, 좌굴)',
        '열역학 계산 (효율, 사이클)',
        '유체역학 계산 (유량, 압력손실)',
        '기계설계 계산 (축, 기어, 베어링)',
        '이론 문제 (용어, 원리 설명)',
      ],
      tips: [
        '공식 정확히 암기',
        '단위 환산 연습',
        '계산기 사용법 숙달',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/practical',
    },
    {
      name: '작업형 (CAD)',
      ratio: '약 50%',
      points: '약 50점',
      color: 'indigo',
      topics: [
        '2D 도면 작성 (정투상법)',
        '단면도, 조립도 작성',
        '치수 기입 및 공차 표시',
        '기하공차 적용',
        '부품도, 조립도 해석',
      ],
      tips: [
        'AutoCAD 또는 Inventor 숙달',
        '도면 규격 (KS) 이해',
        '시간 배분 연습',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/practical',
    },
    {
      name: '재료역학 실무',
      ratio: '핵심 출제',
      points: '고배점',
      color: 'purple',
      topics: [
        '보의 반력 및 처짐 계산',
        '조합하중 문제',
        '안전율 및 허용응력 계산',
        '단면 설계',
      ],
      tips: [
        '필기 내용 심화 학습',
        '수치계산 정확성',
        '도표 해석 능력',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/practical',
    },
    {
      name: '기계설계 실무',
      ratio: '핵심 출제',
      points: '고배점',
      color: 'violet',
      topics: [
        '축 설계 (지름 결정, 키 홈)',
        '기어 설계 (모듈, 잇수, 중심거리)',
        '베어링 수명 계산',
        '나사 설계 (강도, 효율)',
      ],
      tips: [
        '설계 공식 체계적 정리',
        'KS 규격 참조',
        '실제 도면 많이 보기',
      ],
      studyLink: '/category/mechanical/mechanical-engineer/study/practical',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">필답+작업</p>
            <p className="text-sm text-gray-500">시험 유형</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">약 5시간</p>
            <p className="text-sm text-gray-500">총 시험 시간</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">100점</p>
            <p className="text-sm text-gray-500">만점</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">60점</p>
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
              section.color === 'blue' ? 'from-blue-500 to-cyan-500' :
              section.color === 'indigo' ? 'from-indigo-500 to-blue-500' :
              section.color === 'purple' ? 'from-purple-500 to-indigo-500' :
              'from-violet-500 to-purple-500'
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
                        <span className="text-blue-500 mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {section.studyLink && (
                    <a
                      href={section.studyLink}
                      className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${
                        section.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                        section.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' :
                        section.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                        'bg-violet-500 hover:bg-violet-600'
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
            <h3 className="font-bold text-blue-700 mb-2">1단계: CAD 숙달</h3>
            <p className="text-sm text-gray-600">AutoCAD 기본 명령어 및 도면 작성 능력 확보. 작업형 50% 비중</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">2단계: 계산 연습</h3>
            <p className="text-sm text-gray-600">재료역학, 기계설계 계산 문제 반복 연습. 공식 암기</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">3단계: 기출 분석</h3>
            <p className="text-sm text-gray-600">최근 5년 기출문제 유형 파악. 시간 배분 연습</p>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시간 배분 가이드</h2>
        <div className="space-y-3">
          {[
            { name: '필답형 - 계산 문제', time: '90분', color: 'bg-blue-500' },
            { name: '필답형 - 이론 문제', time: '30분', color: 'bg-cyan-500' },
            { name: '작업형 - CAD 도면 작성', time: '150분', color: 'bg-indigo-500' },
            { name: '검토 및 수정', time: '30분', color: 'bg-purple-500' },
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
