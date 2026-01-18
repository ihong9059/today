import Link from 'next/link';

export default function AgricultureCategoryPage() {
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
      id: 'plant-protection-engineer',
      name: '식물보호기사',
      englishName: 'Engineer Plant Protection',
      icon: '🌿',
      color: 'from-green-600 to-emerald-500',
      difficulty: 4,
      description: '병해충 방제 및 식물 보호 전문가',
      subjects: ['식물병리학', '농림해충학', '잡초방제학', '농약학'],
      hasStudyPage: true,
      href: '/category/agriculture/plant-protection-engineer',
    },
    {
      id: 'plant-protection-technician',
      name: '식물보호산업기사',
      englishName: 'Industrial Engineer Plant Protection',
      icon: '🌱',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 3,
      description: '병해충 방제 기술인력',
      subjects: ['식물병리학', '농림해충학', '잡초방제학', '농약학'],
      hasStudyPage: true,
      href: '/category/agriculture/plant-protection-technician',
    },
    {
      id: 'organic-farming-engineer',
      name: '유기농업기사',
      englishName: 'Engineer Organic Agriculture',
      icon: '🥬',
      color: 'from-lime-500 to-green-500',
      difficulty: 4,
      description: '친환경 유기농업 전문가',
      subjects: ['재배원론', '토양학', '유기농업일반', '유기식품가공학'],
      hasStudyPage: true,
      href: '/category/agriculture/organic-farming-engineer',
    },
    {
      id: 'organic-farming-technician',
      name: '유기농업산업기사',
      englishName: 'Industrial Engineer Organic Agriculture',
      icon: '🥗',
      color: 'from-green-500 to-lime-500',
      difficulty: 3,
      description: '친환경 유기농업 기술인력',
      subjects: ['재배원론', '토양학', '유기농업일반', '유기식품가공학'],
      hasStudyPage: true,
      href: '/category/agriculture/organic-farming-technician',
    },
    {
      id: 'livestock-engineer',
      name: '축산기사',
      englishName: 'Engineer Livestock',
      icon: '🐄',
      color: 'from-amber-500 to-orange-500',
      difficulty: 4,
      description: '가축 사육 및 관리 전문가',
      subjects: ['가축육종학', '가축번식학', '가축영양학', '사료학'],
      hasStudyPage: true,
      href: '/category/agriculture/livestock-engineer',
    },
    {
      id: 'livestock-technician',
      name: '축산산업기사',
      englishName: 'Industrial Engineer Livestock',
      icon: '🐖',
      color: 'from-orange-400 to-amber-400',
      difficulty: 3,
      description: '가축 사육 및 관리 기술인력',
      subjects: ['가축사양학', '가축번식학', '축산경영학', '사료학'],
      hasStudyPage: true,
      href: '/category/agriculture/livestock-technician',
    },
    {
      id: 'agri-machine-engineer',
      name: '농업기계기사',
      englishName: 'Engineer Agricultural Machinery',
      icon: '🚜',
      color: 'from-yellow-500 to-amber-500',
      difficulty: 4,
      description: '농기계 정비 및 관리 전문가',
      subjects: ['농업기계학', '농업동력학', '농업기계설계', '정밀농업'],
      hasStudyPage: true,
      href: '/category/agriculture/agri-machine-engineer',
    },
    {
      id: 'agri-machine-technician',
      name: '농업기계산업기사',
      englishName: 'Industrial Engineer Agricultural Machinery',
      icon: '🔧',
      color: 'from-amber-400 to-yellow-400',
      difficulty: 3,
      description: '농기계 정비 및 관리 기술인력',
      subjects: ['농업기계학', '농업동력학', '농업기계공작', '농업기계정비'],
      hasStudyPage: true,
      href: '/category/agriculture/agri-machine-technician',
    },
    {
      id: 'seed-engineer',
      name: '종자기사',
      englishName: 'Engineer Seed',
      icon: '🌾',
      color: 'from-teal-500 to-cyan-500',
      difficulty: 4,
      description: '종자 생산 및 관리 전문가',
      subjects: ['종자생산학', '식물육종학', '재배원론', '종자관련법규'],
      hasStudyPage: true,
      href: '/category/agriculture/seed-engineer',
    },
    {
      id: 'seed-technician',
      name: '종자산업기사',
      englishName: 'Industrial Engineer Seed',
      icon: '🌰',
      color: 'from-cyan-500 to-teal-400',
      difficulty: 3,
      description: '종자 생산 및 관리 기술인력',
      subjects: ['종자생산학', '식물육종학', '재배원론', '종자관련법규'],
      hasStudyPage: true,
      href: '/category/agriculture/seed-technician',
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
            <Link href="/" className="text-gray-600 hover:text-lime-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-lime-600 font-medium">농림·축산</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🌾</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">농림·축산 분야</h1>
              <p className="text-lime-100 mt-1">Agriculture & Livestock</p>
              <p className="text-lime-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-lime-50 rounded-xl p-6 border border-lime-200">
            <h3 className="font-bold text-lime-800 mb-2">💡 농림·축산 분야 자격증 안내</h3>
            <ul className="text-sm text-lime-700 space-y-1">
              <li>• 기사: 4년제 대학 관련학과 졸업(예정)자 또는 산업기사 취득 후 1년 이상 실무경력자</li>
              <li>• 산업기사: 전문대학 관련학과 졸업(예정)자 또는 기능사 취득 후 1년 이상 실무경력자</li>
              <li>• 시험은 한국산업인력공단 Q-Net에서 접수 가능</li>
              <li>• 농업 관련 공무원 시험 가산점 부여 자격증</li>
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
