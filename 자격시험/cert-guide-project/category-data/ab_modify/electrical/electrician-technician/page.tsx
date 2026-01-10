import Link from 'next/link';

export default function ElectricianTechnicianPage() {
  const subjects = [
    {
      name: '전기이론',
      icon: '⚡',
      description: '전기의 기본 원리와 회로 이론',
      topics: ['직류회로', '교류회로', '정전기와 자기', '전자유도'],
      difficulty: 3,
      questionCount: 20,
      href: '/category/electrical/electrician-technician/study/electrical-theory',
    },
    {
      name: '전기기기',
      icon: '🔌',
      description: '전동기, 변압기 등 전기기기 원리',
      topics: ['직류기', '동기기', '변압기', '유도기'],
      difficulty: 4,
      questionCount: 20,
      href: '/category/electrical/electrician-technician/study/electrical-machine',
    },
    {
      name: '전기설비',
      icon: '🏗️',
      description: '전기설비 설계, 시공, 유지보수',
      topics: ['배선설계', '조명설비', '동력설비', '접지공사'],
      difficulty: 3,
      questionCount: 20,
      href: '/category/electrical/electrician-technician/study/electrical-installation',
    },
    {
      name: '실기 대비',
      icon: '🔧',
      description: '전기설비 작업 실기 시험 대비',
      topics: ['배선작업', '전기기기 결선', '시퀀스제어', '측정기 사용'],
      difficulty: 4,
      questionCount: 25,
      href: '/category/electrical/electrician-technician/study/practical',
    },
  ];

  const studyOrder = [
    { step: 1, title: '전기이론 기초', desc: '옴의 법칙, 직류회로 기초부터 시작', duration: '2주' },
    { step: 2, title: '교류회로 심화', desc: '교류 기초와 RLC 회로 이해', duration: '2주' },
    { step: 3, title: '전기기기 학습', desc: '변압기, 전동기 원리와 특성', duration: '2주' },
    { step: 4, title: '전기설비 익히기', desc: '배선, 조명, 접지 실무 지식', duration: '2주' },
    { step: 5, title: '실기 연습', desc: '배선작업, 결선 실습 집중 훈련', duration: '3주' },
    { step: 6, title: '모의고사 풀이', desc: '기출문제 반복 학습', duration: '1주' },
  ];

  const aiQuestions = [
    '직류회로에서 키르히호프 법칙을 적용하는 방법을 설명해주세요',
    '3상 유도전동기의 기동법 종류와 특징을 알려주세요',
    '접지공사의 종류별 접지저항값 기준을 정리해주세요',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">홈</Link>
            <span>/</span>
            <Link href="/category/electrical" className="hover:text-yellow-600">기계·전기분야</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">전기기능사</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">⚡</span>
                    <div>
                      <h1 className="text-3xl font-bold">전기기능사</h1>
                      <p className="text-yellow-100">Craftsman Electrician</p>
                    </div>
                  </div>
                  <p className="text-yellow-100 mb-6 max-w-lg">
                    전기설비의 설치, 보수, 운용, 점검 등의 기능을 수행하는 국가기술자격입니다.
                    건축물, 공장 등 다양한 현장에서 전기 관련 업무를 수행할 수 있습니다.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs text-yellow-100">난이도</p>
                      <p className="font-bold">★★★☆☆</p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs text-yellow-100">연간 응시자</p>
                      <p className="font-bold">약 15만명</p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs text-yellow-100">합격률</p>
                      <p className="font-bold">필기 45% / 실기 50%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
                <p className="text-sm text-gray-500">필기시험</p>
                <p className="text-lg font-bold text-gray-800">60문항 / 60분</p>
                <p className="text-xs text-gray-500 mt-1">객관식 4지선다</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500">
                <p className="text-sm text-gray-500">실기시험</p>
                <p className="text-lg font-bold text-gray-800">작업형 / 약 4시간</p>
                <p className="text-xs text-gray-500 mt-1">전기설비 작업</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-amber-500">
                <p className="text-sm text-gray-500">응시료</p>
                <p className="text-lg font-bold text-gray-800">필기 14,500원</p>
                <p className="text-xs text-gray-500 mt-1">실기 57,300원</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-500">
                <p className="text-sm text-gray-500">주관기관</p>
                <p className="text-lg font-bold text-gray-800">Q-Net</p>
                <p className="text-xs text-gray-500 mt-1">한국산업인력공단</p>
              </div>
            </div>

            {/* Certification Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">전기기능사란?</h3>
                  <p className="text-sm leading-relaxed">
                    전기기능사는 전기에 관한 숙련기능을 가지고 전기설비 및 장비를 제작, 설치, 조작, 운전,
                    보수 등의 업무를 수행하는 국가기술자격입니다. 전기 분야의 가장 기본적인 자격증으로,
                    전기공사업, 건설업, 제조업 등 다양한 분야에서 필수적으로 요구됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>전기설비의 설치, 보수, 운용, 점검</li>
                    <li>배선공사 및 전기기기 결선 작업</li>
                    <li>조명설비, 동력설비 시공</li>
                    <li>접지공사 및 피뢰설비 설치</li>
                    <li>전기안전 점검 및 유지보수</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {['전기공사업체', '건설회사', '제조업체', '발전소', '빌딩관리', '전기설계사무소', '공공기관'].map((field) => (
                      <span key={field} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Subjects */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {subjects.slice(0, 3).map((subject) => (
                  <div key={subject.name} className="border border-gray-200 rounded-xl p-4 hover:border-yellow-300 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-800">{subject.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{subject.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {subject.topics.map((topic) => (
                              <span key={topic} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{subject.questionCount}문항</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t flex justify-end">
                      <Link
                        href={subject.href}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
                      >
                        학습하기 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Exam */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔧</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-orange-800">작업형 시험</h3>
                    <span className="px-3 py-1 bg-orange-200 text-orange-700 rounded-full text-sm">약 4시간</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-4">
                    전기설비 작업을 실제로 수행하는 작업형 시험입니다.
                    배선작업, 전기기기 결선, 시퀀스 제어회로 구성 등을 평가합니다.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-gray-800 text-sm">배선작업 (40%)</p>
                      <ul className="text-xs text-gray-600 mt-1">
                        <li>• 케이블 배선</li>
                        <li>• 금속관/합성수지관 배선</li>
                        <li>• 덕트 배선</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-gray-800 text-sm">전기기기 결선 (30%)</p>
                      <ul className="text-xs text-gray-600 mt-1">
                        <li>• 전동기 결선</li>
                        <li>• 변압기 결선</li>
                        <li>• 차단기 연결</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-gray-800 text-sm">시퀀스 제어 (20%)</p>
                      <ul className="text-xs text-gray-600 mt-1">
                        <li>• MC(전자접촉기) 회로</li>
                        <li>• 타이머 회로</li>
                        <li>• 자기유지 회로</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-gray-800 text-sm">측정 및 검사 (10%)</p>
                      <ul className="text-xs text-gray-600 mt-1">
                        <li>• 절연저항 측정</li>
                        <li>• 접지저항 측정</li>
                        <li>• 동작 확인</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/category/electrical/electrician-technician/study/practical"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition"
                  >
                    실기 대비 학습하기 →
                  </Link>
                </div>
              </div>
            </div>

            {/* Study Order */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📝</span> 추천 공부 순서
              </h2>
              <div className="space-y-3">
                {studyOrder.map((item) => (
                  <div key={item.step} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <span className="text-sm text-yellow-600 font-medium">{item.duration}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>💡 TIP:</strong> 비전공자는 전기이론부터 차근차근 시작하고,
                  전공자는 실기 위주로 집중 학습하는 것을 권장합니다.
                  실기시험은 반복 연습이 핵심입니다!
                </p>
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4 text-sm">
                어려운 개념이나 문제가 있다면 AI에게 질문해보세요.
                아래 예시 질문을 클릭하거나 직접 질문할 수 있습니다.
              </p>
              <div className="space-y-2">
                {aiQuestions.map((q, i) => (
                  <a
                    key={i}
                    href={`https://claude.ai/new?q=${encodeURIComponent(`전기기능사 시험 관련 질문입니다: ${q}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
                  >
                    💬 {q}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3">
                {[
                  { round: '1회', apply: '1.7~1.13', written: '2.8~2.21', practical: '3.21~4.4' },
                  { round: '2회', apply: '3.25~3.31', written: '4.26~5.9', practical: '6.20~7.4' },
                  { round: '3회', apply: '6.10~6.16', written: '7.12~7.25', practical: '9.5~9.19' },
                  { round: '4회', apply: '8.26~9.1', written: '10.4~10.17', practical: '11.21~12.5' },
                ].map((schedule) => (
                  <div key={schedule.round} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-yellow-600 mb-1">{schedule.round}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>접수: {schedule.apply}</p>
                      <p>필기: {schedule.written}</p>
                      <p>실기: {schedule.practical}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.q-net.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center text-sm text-yellow-600 hover:text-yellow-700"
              >
                Q-Net에서 일정 확인하기 →
              </a>
            </div>

            {/* Subject Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📊</span> 과목별 목표점수
              </h3>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{subject.name}</span>
                      <span className="text-yellow-600">목표 70점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * 필기 합격기준: 과목당 40점 이상, 전과목 평균 60점 이상
              </p>
            </div>

            {/* Related Certifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '전기산업기사', level: '상위' },
                  { name: '전기기사', level: '상위' },
                  { name: '전기공사기사', level: '관련' },
                  { name: '소방설비기사(전기)', level: '관련' },
                ].map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{cert.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      cert.level === '상위' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cert.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">시대고시 전기기능사</p>
                  <p className="text-xs text-gray-500">필기+실기 통합 교재</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">성안당 전기기능사 실기</p>
                  <p className="text-xs text-gray-500">실기 작업 상세 해설</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">일진사 전기이론 기초</p>
                  <p className="text-xs text-gray-500">비전공자 추천</p>
                </div>
              </div>
            </div>

            {/* Exam Detail Link */}
            <Link
              href="/category/electrical/electrician-technician/exam"
              className="block bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 text-center hover:from-yellow-600 hover:to-orange-700 transition shadow-lg"
            >
              <p className="text-lg font-bold mb-1">시험 상세 정보</p>
              <p className="text-sm text-yellow-100">출제경향, 합격전략 확인하기 →</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
