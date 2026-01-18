import Link from 'next/link';

export default function CivilCategoryPage() {
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
      id: 'civil-service-5',
      name: '5급 공채(행정고시)',
      englishName: 'Grade 5 Civil Service Exam',
      icon: '🏛️',
      color: 'from-slate-700 to-gray-600',
      difficulty: 5,
      description: '사무관급 고위공무원 선발시험',
      subjects: ['PSAT', '헌법', '행정법', '경제학', '행정학'],
      hasStudyPage: true,
      href: '/category/civil/civil-service-5',
    },
    {
      id: 'civil-service-7',
      name: '7급 공채',
      englishName: 'Grade 7 Civil Service Exam',
      icon: '📋',
      color: 'from-blue-600 to-indigo-500',
      difficulty: 4,
      description: '주무관급 공무원 선발시험',
      subjects: ['국어', '영어', '한국사', '헌법', '행정법', '행정학', '경제학'],
      hasStudyPage: true,
      href: '/category/civil/civil-service-7',
    },
    {
      id: 'civil-service-9',
      name: '9급 공채',
      englishName: 'Grade 9 Civil Service Exam',
      icon: '📝',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 3,
      description: '주사급 공무원 선발시험',
      subjects: ['국어', '영어', '한국사', '행정법총론', '행정학개론'],
      hasStudyPage: true,
      href: '/category/civil/civil-service-9',
    },
    {
      id: 'local-civil-7',
      name: '지방직 7급',
      englishName: 'Local Grade 7 Civil Service',
      icon: '🏢',
      color: 'from-purple-500 to-violet-500',
      difficulty: 4,
      description: '광역/기초자치단체 7급 공무원',
      subjects: ['국어', '영어', '한국사', '지방자치론', '행정법', '행정학'],
      hasStudyPage: true,
      href: '/category/civil/local-civil-7',
    },
    {
      id: 'local-civil-9',
      name: '지방직 9급',
      englishName: 'Local Grade 9 Civil Service',
      icon: '🏠',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 3,
      description: '광역/기초자치단체 9급 공무원',
      subjects: ['국어', '영어', '한국사', '행정법총론', '행정학개론'],
      hasStudyPage: true,
      href: '/category/civil/local-civil-9',
    },
    {
      id: 'police-officer',
      name: '경찰공무원(순경)',
      englishName: 'Police Officer Exam',
      icon: '👮',
      color: 'from-blue-700 to-blue-500',
      difficulty: 3,
      description: '순경 공채 선발시험',
      subjects: ['한국사', '영어', '형사법', '경찰학', '헌법'],
      hasStudyPage: true,
      href: '/category/civil/police-officer',
    },
    {
      id: 'firefighter',
      name: '소방공무원(소방사)',
      englishName: 'Firefighter Exam',
      icon: '🚒',
      color: 'from-red-500 to-orange-500',
      difficulty: 3,
      description: '소방사 공채 선발시험',
      subjects: ['한국사', '영어', '소방학개론', '소방관계법규', '행정법총론'],
      hasStudyPage: true,
      href: '/category/civil/firefighter',
    },
    {
      id: 'corrections-officer',
      name: '교정직(교도관)',
      englishName: 'Corrections Officer Exam',
      icon: '🔒',
      color: 'from-gray-600 to-slate-500',
      difficulty: 3,
      description: '교정시설 교도관 선발시험',
      subjects: ['국어', '영어', '한국사', '교정학', '형사소송법'],
      hasStudyPage: true,
      href: '/category/civil/corrections-officer',
    },
    {
      id: 'military-civil',
      name: '군무원',
      englishName: 'Military Civilian Employee Exam',
      icon: '🎖️',
      color: 'from-green-600 to-emerald-500',
      difficulty: 3,
      description: '국방부 소속 군무원 선발시험',
      subjects: ['국어', '영어', '한국사', '행정학', '국가안보학'],
      hasStudyPage: true,
      href: '/category/civil/military-civil',
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
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">공무원</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">공무원 분야</h1>
              <p className="text-slate-200 mt-1">Civil Service Examinations</p>
              <p className="text-slate-200 mt-2">{certifications.length}개 시험</p>
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
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">💡 공무원 시험 안내</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 국가직 공무원: 인사혁신처 주관, 연 1~2회 시험</li>
              <li>• 지방직 공무원: 각 지방자치단체 주관, 연 1회 시험</li>
              <li>• 경찰/소방공무원: 경찰청/소방청 주관, 연 1~2회 시험</li>
              <li>• 시험 접수: 사이버국가고시센터(gosi.kr) 또는 각 기관 홈페이지</li>
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
