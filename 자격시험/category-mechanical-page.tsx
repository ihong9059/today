import Link from 'next/link';

export default function MechanicalCategoryPage() {
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
      id: 'mechanical-engineer',
      name: '기계기사',
      englishName: 'Engineer Mechanical',
      icon: '⚙️',
      color: 'from-blue-600 to-cyan-500',
      difficulty: 4,
      description: '기계 설계, 제작, 설치, 운전 등의 전문 기술자',
      subjects: ['재료역학', '열역학', '유체역학', '기계제작법'],
      hasStudyPage: true,
      href: '/category/mechanical/mechanical-engineer',
    },
    {
      id: 'mechanical-craftsman',
      name: '기계산업기사',
      englishName: 'Industrial Engineer Mechanical',
      icon: '🔧',
      color: 'from-amber-500 to-yellow-500',
      difficulty: 3,
      description: '기계 분야 중급 기술 인력',
      subjects: ['기계제도', '기계재료', '기계설계', '기계제작법'],
      hasStudyPage: false,
    },
    {
      id: 'electric-engineer',
      name: '전기기사',
      englishName: 'Engineer Electricity',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      difficulty: 4,
      description: '전기설비의 설계, 시공, 감리 등 전문 기술자',
      subjects: ['전기자기학', '전력공학', '전기기기', '회로이론', '전기설비기술기준'],
      hasStudyPage: true,
      href: '/category/mechanical/electric-engineer',
    },
    {
      id: 'electric-craftsman',
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
      id: 'control-engineer',
      name: '제어계측기사',
      englishName: 'Engineer Control Instrumentation',
      icon: '🎛️',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 4,
      description: '자동제어 시스템 설계 및 관리 전문가',
      subjects: ['계측기학', '자동제어', '전자공학', '공업계측'],
      hasStudyPage: false,
    },
    {
      id: 'welding-engineer',
      name: '용접기사',
      englishName: 'Engineer Welding',
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      difficulty: 3,
      description: '용접 기술 및 품질관리 전문가',
      subjects: ['용접야금', '용접구조설계', '용접시공', '용접검사'],
      hasStudyPage: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">기계·전기</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">기계·전기 분야</h1>
              <p className="text-orange-100 mt-1">Mechanical & Electrical Engineering</p>
              <p className="text-orange-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
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
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{subject}</span>
                    ))}
                    {cert.subjects.length > 3 && (
                      <span className="text-xs text-gray-400">+{cert.subjects.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  {cert.hasStudyPage ? (
                    <Link href={cert.href!} className={`block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r ${cert.color} hover:opacity-90 transition`}>상세보기 →</Link>
                  ) : (
                    <button disabled className="block w-full text-center py-2.5 rounded-lg text-gray-400 font-medium bg-gray-100 cursor-not-allowed">준비중</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-2">💡 기계·전기 분야 자격증 안내</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• 기사: 4년제 대학 관련학과 졸업(예정)자 또는 산업기사 취득 후 1년 이상 실무경력자</li>
              <li>• 산업기사: 전문대학 관련학과 졸업(예정)자 또는 기능사 취득 후 1년 이상 실무경력자</li>
              <li>• 시험은 한국산업인력공단 Q-Net에서 접수 가능</li>
            </ul>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
