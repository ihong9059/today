import Link from 'next/link';

export default function ConstructionCategoryPage() {
  const certifications = [
    {
      id: 'architect-engineer',
      name: '건축기사',
      englishName: 'Architect Engineer',
      icon: '🏛️',
      color: 'from-orange-600 to-red-600',
      difficulty: 4,
      description: '건축물 설계 및 시공 관리 전문가',
      subjects: ['건축계획', '건축구조', '건축설비', '건축시공', '실기'],
      hasStudyPage: true,
      href: '/category/construction/architect-engineer',
    },
    {
      id: 'civil-engineer',
      name: '토목기사',
      englishName: 'Civil Engineer',
      icon: '🌉',
      color: 'from-amber-600 to-orange-600',
      difficulty: 4,
      description: '토목구조물 설계 및 시공 관리',
      subjects: ['응용역학', '측량학', '수리학', '토질 및 기초', '철근콘크리트', '실기'],
      hasStudyPage: true,
      href: '/category/construction/civil-engineer',
    },
    {
      id: 'construction-safety',
      name: '건설안전기사',
      englishName: 'Construction Safety Engineer',
      icon: '🦺',
      color: 'from-yellow-500 to-amber-500',
      difficulty: 3,
      description: '건설현장 안전관리 전문가',
      subjects: ['안전관리론', '건설안전기술', '건설재료학', '안전관계법규', '실기'],
      hasStudyPage: true,
      href: '/category/construction/construction-safety',
    },
    {
      id: 'surveying-geo',
      name: '측량및지형공간정보기사',
      englishName: 'Surveying & Geo-Spatial Engineer',
      icon: '📐',
      color: 'from-teal-500 to-cyan-500',
      difficulty: 3,
      description: '측량 및 지적업무 전문가',
      subjects: ['측지학', '사진측량', 'GIS', '지적학', '실기'],
      hasStudyPage: true,
      href: '/category/construction/surveying-geo',
    },
    {
      id: 'interior-architect',
      name: '실내건축기사',
      englishName: 'Interior Architect Engineer',
      icon: '🛋️',
      color: 'from-purple-500 to-pink-500',
      difficulty: 3,
      description: '실내공간 설계 전문가',
      subjects: ['실내디자인론', '실내건축재료', '실내건축구조', '색채 및 조명', '실기'],
      hasStudyPage: true,
      href: '/category/construction/interior-architect',
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
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">건축·토목</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">건축·토목 분야</h1>
              <p className="text-orange-100 mt-1">Construction & Civil Engineering</p>
              <p className="text-orange-100 mt-2">{certifications.length}개 자격증</p>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
