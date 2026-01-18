import Link from 'next/link';

export default function ElectronicCategoryPage() {
  const certifications: {
    id: string;
    name: string;
    englishName: string;
    icon: string;
    color: string;
    difficulty: number;
    description: string;
    subjects: string[];
    hasStudyPage: boolean;
    href?: string;
  }[] = [
    {
      id: 'electronic-engineer',
      name: '전자기사',
      englishName: 'Engineer Electronics',
      icon: '📡',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 4,
      description: '전자회로, 반도체, 통신시스템 설계 및 개발',
      subjects: ['전자회로', '디지털공학', '전자계측', '통신이론'],
      hasStudyPage: false,
    },
    {
      id: 'electronic-craftsman',
      name: '전자산업기사',
      englishName: 'Industrial Engineer Electronics',
      icon: '🔌',
      color: 'from-indigo-400 to-blue-400',
      difficulty: 3,
      description: '전자 분야 중급 기술 인력',
      subjects: ['전자회로', '디지털공학', '전자계측'],
      hasStudyPage: false,
    },
    {
      id: 'information-communication-engineer',
      name: '정보통신기사',
      englishName: 'Engineer Information Communication',
      icon: '📶',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 4,
      description: '정보통신 네트워크 설계 및 구축 전문가',
      subjects: ['정보통신개론', '정보통신시스템', '데이터통신', '전송공학'],
      hasStudyPage: false,
    },
    {
      id: 'radio-communication-engineer',
      name: '무선설비기사',
      englishName: 'Engineer Radio Communication Equipment',
      icon: '📻',
      color: 'from-purple-500 to-indigo-500',
      difficulty: 4,
      description: '무선통신 설비 설치 및 운용 전문가',
      subjects: ['전파공학', '무선기기', '전자회로', '안테나공학'],
      hasStudyPage: false,
    },
    {
      id: 'semiconductor-engineer',
      name: '반도체설계기사',
      englishName: 'Engineer Semiconductor Design',
      icon: '💾',
      color: 'from-violet-500 to-purple-500',
      difficulty: 5,
      description: '반도체 회로 설계 및 검증 전문가',
      subjects: ['디지털논리회로', '전자회로', 'VLSI설계', '반도체공학'],
      hasStudyPage: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">전자</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">📡</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">전자 분야</h1>
              <p className="text-blue-100 mt-1">Electronics Engineering</p>
              <p className="text-blue-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${cert.color} p-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{cert.icon}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className={s <= cert.difficulty ? 'text-yellow-300' : 'text-white/30'}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800">{cert.name}</h3>
                <p className="text-sm text-gray-500">{cert.englishName}</p>
                <p className="text-sm text-gray-600 mt-2">{cert.description}</p>

                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">시험 과목</p>
                  <div className="flex flex-wrap gap-1">
                    {cert.subjects.slice(0, 3).map((subject, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {subject}
                      </span>
                    ))}
                    {cert.subjects.length > 3 && (
                      <span className="text-xs text-gray-400">+{cert.subjects.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {cert.hasStudyPage ? (
                    <Link
                      href={cert.href!}
                      className={`block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r ${cert.color} hover:opacity-90 transition`}
                    >
                      상세보기 →
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block w-full text-center py-2.5 rounded-lg text-gray-400 font-medium bg-gray-100 cursor-not-allowed"
                    >
                      준비중
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
