import Link from 'next/link';

export default function ElectricalCategoryPage() {
  const certifications = [
    {
      id: 'electrician-technician',
      name: '전기기능사',
      englishName: 'Craftsman Electrician',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600',
      difficulty: 3,
      description: '전기설비 설치, 보수, 운용의 기본 기능 자격',
      subjects: ['전기이론', '전기기기', '전기설비'],
      hasStudyPage: true,
      href: '/category/electrical/electrician-technician',
    },
    {
      id: 'electrical-engineer',
      name: '전기기사',
      englishName: 'Engineer Electricity',
      icon: '🔋',
      color: 'from-yellow-500 to-orange-500',
      difficulty: 4,
      description: '전기설비의 설계, 시공, 감리 등 전문 기술자',
      subjects: ['전기자기학', '전력공학', '전기기기', '회로이론', '전기설비기술기준'],
      hasStudyPage: true,
      href: '/category/mechanical/electric-engineer',
    },
    {
      id: 'electrical-craftsman',
      name: '전기산업기사',
      englishName: 'Industrial Engineer Electricity',
      icon: '🔌',
      color: 'from-orange-400 to-amber-400',
      difficulty: 3,
      description: '전기 분야 중급 기술 인력',
      subjects: ['전기자기학', '전력공학', '전기기기', '회로이론'],
      hasStudyPage: false,
    },
    {
      id: 'electrical-work-engineer',
      name: '전기공사기사',
      englishName: 'Engineer Electrical Construction',
      icon: '🔧',
      color: 'from-amber-500 to-yellow-500',
      difficulty: 4,
      description: '전기공사 시공 및 감리 전문가',
      subjects: ['전기응용', '전기설비기술기준', '전기기기', '배전설비'],
      hasStudyPage: false,
    },
    {
      id: 'electrical-work-craftsman',
      name: '전기공사산업기사',
      englishName: 'Industrial Engineer Electrical Construction',
      icon: '⚙️',
      color: 'from-yellow-400 to-amber-400',
      difficulty: 3,
      description: '전기공사 분야 중급 기술 인력',
      subjects: ['전기응용', '전기설비기술기준', '전력설비'],
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
            <Link href="/" className="text-gray-600 hover:text-yellow-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">기계·전기분야</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">⚡</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">기계·전기분야</h1>
              <p className="text-yellow-100 mt-1">Mechanical & Electrical Engineering</p>
              <p className="text-yellow-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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

      {/* Info Section */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 기계·전기분야 자격증 TIP</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>입문</strong>: 전기기능사로 기초 역량 확보</li>
            <li>• <strong>중급</strong>: 전기산업기사, 전기공사산업기사</li>
            <li>• <strong>전문가</strong>: 전기기사 → 전기기술사 경로</li>
            <li>• <strong>취업</strong>: 전기공사업, 건설사, 발전소, 제조업체</li>
          </ul>
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
