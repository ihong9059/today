import Link from 'next/link';

export default function ChemistryCategoryPage() {
  const certifications = [
    {
      id: 'chemical-analyst',
      name: '화학분석기사',
      englishName: 'Engineer Chemical Analysis',
      icon: '🧪',
      color: 'from-green-500 to-emerald-500',
      difficulty: 4,
      description: '화학물질 분석 및 품질관리 전문 기술자',
      subjects: ['일반화학', '분석화학', '기기분석', '환경화학', '실기'],
      hasStudyPage: true,
      href: '/category/chemistry/chemical-analyst',
    },
    {
      id: 'hazardous-materials',
      name: '위험물산업기사',
      englishName: 'Industrial Engineer Hazardous Materials',
      icon: '⚠️',
      color: 'from-orange-500 to-red-500',
      difficulty: 3,
      description: '위험물 저장·취급·운반 안전관리 전문가',
      subjects: ['일반화학', '화재예방과 소화방법', '위험물의 성질과 취급', '실기'],
      hasStudyPage: true,
      href: '/category/chemistry/hazardous-materials',
    },
    {
      id: 'environmental-engineer',
      name: '환경기사',
      englishName: 'Engineer Environment',
      icon: '🌿',
      color: 'from-teal-500 to-green-500',
      difficulty: 4,
      description: '환경오염 방지시설 설계·시공·운영 전문가',
      subjects: ['환경공학개론', '대기오염방지', '수질오염방지', '폐기물처리', '소음진동', '실기'],
      hasStudyPage: true,
      href: '/category/chemistry/environmental-engineer',
    },
    {
      id: 'air-environment',
      name: '대기환경기사',
      englishName: 'Engineer Air Environment',
      icon: '💨',
      color: 'from-sky-500 to-blue-500',
      difficulty: 4,
      description: '대기오염 측정·방지시설 운영 전문가',
      subjects: ['대기오염개론', '연소공학', '대기오염방지기술', '대기오염공정시험기준', '실기'],
      hasStudyPage: true,
      href: '/category/chemistry/air-environment',
    },
    {
      id: 'water-environment',
      name: '수질환경기사',
      englishName: 'Engineer Water Environment',
      icon: '💧',
      color: 'from-blue-500 to-cyan-500',
      difficulty: 4,
      description: '수질오염 측정·방지시설 운영 전문가',
      subjects: ['수질오염개론', '상하수도계획', '수질오염방지기술', '수질오염공정시험기준', '실기'],
      hasStudyPage: true,
      href: '/category/chemistry/water-environment',
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">화학·환경</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🧪</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">화학·환경 분야</h1>
              <p className="text-green-100 mt-1">Chemistry & Environment</p>
              <p className="text-green-100 mt-2">{certifications.length}개 자격증</p>
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
