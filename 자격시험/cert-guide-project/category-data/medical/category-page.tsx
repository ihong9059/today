import Link from 'next/link';

export default function MedicalCategoryPage() {
  const certifications = [
    {
      id: 'health-educator-1',
      name: '보건교육사 1급',
      englishName: 'Health Educator Level 1',
      icon: '🏥',
      color: 'from-pink-600 to-rose-600',
      difficulty: 4,
      description: '보건교육 고급 전문가 (2급+경력 3년)',
      subjects: ['보건교육학', '건강증진이론', '보건정책', '프로그램개발', '실기'],
      hasStudyPage: true,
      href: '/category/medical/health-educator-1',
    },
    {
      id: 'health-educator-2',
      name: '보건교육사 2급',
      englishName: 'Health Educator Level 2',
      icon: '🏥',
      color: 'from-pink-500 to-rose-500',
      difficulty: 3,
      description: '보건교육 프로그램 기획·운영',
      subjects: ['보건교육학개론', '보건의사소통', '건강행동이론', '지역사회보건', '실기'],
      hasStudyPage: true,
      href: '/category/medical/health-educator-2',
    },
    {
      id: 'health-educator-3',
      name: '보건교육사 3급',
      englishName: 'Health Educator Level 3',
      icon: '🏥',
      color: 'from-pink-400 to-rose-400',
      difficulty: 2,
      description: '보건교육 기초 (학력제한 없음)',
      subjects: ['보건교육기초', '공중보건학', '건강심리학', '실기'],
      hasStudyPage: true,
      href: '/category/medical/health-educator-3',
    },
    {
      id: 'mental-health-nurse',
      name: '정신건강간호사',
      englishName: 'Mental Health Nurse',
      icon: '💚',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 4,
      description: '정신건강 전문간호사',
      subjects: ['정신간호학', '정신건강이론', '정신약리학', '치료적의사소통', '실기'],
      hasStudyPage: true,
      href: '/category/medical/mental-health-nurse',
    },
    {
      id: 'paramedic-1',
      name: '응급구조사 1급',
      englishName: 'Paramedic Level 1',
      icon: '🚑',
      color: 'from-red-600 to-orange-600',
      difficulty: 4,
      description: '응급처치 전문가 (대학 졸업)',
      subjects: ['응급의학총론', '해부생리학', '약리학', '외상처치', '심장응급', '실기'],
      hasStudyPage: true,
      href: '/category/medical/paramedic-1',
    },
    {
      id: 'paramedic-2',
      name: '응급구조사 2급',
      englishName: 'Paramedic Level 2',
      icon: '🚑',
      color: 'from-red-500 to-orange-500',
      difficulty: 3,
      description: '응급처치 기본 (양성과정 이수)',
      subjects: ['응급처치학', '심폐소생술/AED', '환자평가', '이송', '실기'],
      hasStudyPage: true,
      href: '/category/medical/paramedic-2',
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
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">의료·보건</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🏥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">의료·보건 분야</h1>
              <p className="text-pink-100 mt-1">Medical & Health</p>
              <p className="text-pink-100 mt-2">{certifications.length}개 자격증</p>
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
