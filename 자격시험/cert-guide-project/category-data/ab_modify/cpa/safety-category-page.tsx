import Link from 'next/link';

export default function SafetyCategoryPage() {
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
      id: 'industrial-safety',
      name: '산업안전기사',
      englishName: 'Engineer Industrial Safety',
      icon: '🦺',
      color: 'from-red-500 to-orange-500',
      difficulty: 4,
      description: '산업현장 안전관리 및 재해예방 전문가',
      subjects: ['안전관리론', '인간공학', '기계위험방지', '전기위험방지', '화학설비위험방지', '건설안전'],
      hasStudyPage: true,
      href: '/category/safety/industrial-safety',
    },
    {
      id: 'industrial-safety-technician',
      name: '산업안전산업기사',
      englishName: 'Industrial Engineer Industrial Safety',
      icon: '🦺',
      color: 'from-red-400 to-orange-400',
      difficulty: 3,
      description: '산업현장 안전관리 실무 담당자',
      subjects: ['안전관리론', '인간공학', '기계·설비안전', '전기·화학안전', '실기'],
      hasStudyPage: true,
      href: '/category/safety/industrial-safety-technician',
    },
    {
      id: 'fire-equipment-mechanical',
      name: '소방설비기사(기계)',
      englishName: 'Engineer Fire-Fighting System (Mechanical)',
      icon: '🧯',
      color: 'from-orange-500 to-red-600',
      difficulty: 4,
      description: '기계분야 소방설비 설계·시공·감리 전문가',
      subjects: ['소방원론', '소방유체역학', '소방관계법규', '소방기계시설', '실기'],
      hasStudyPage: true,
      href: '/category/safety/fire-equipment-mechanical',
    },
    {
      id: 'fire-equipment-electrical',
      name: '소방설비기사(전기)',
      englishName: 'Engineer Fire-Fighting System (Electrical)',
      icon: '⚡',
      color: 'from-orange-500 to-amber-500',
      difficulty: 4,
      description: '전기분야 소방설비 설계·시공·감리 전문가',
      subjects: ['소방원론', '소방전기일반', '소방관계법규', '소방전기시설', '실기'],
      hasStudyPage: true,
      href: '/category/safety/fire-equipment-electrical',
    },
    {
      id: 'hazardous-master',
      name: '위험물기능장',
      englishName: 'Master Craftsman Hazardous Materials',
      icon: '☢️',
      color: 'from-yellow-500 to-orange-500',
      difficulty: 5,
      description: '위험물 취급 최고등급 전문가',
      subjects: ['위험물관리', '화재예방', '위험물성질', '실기'],
      hasStudyPage: true,
      href: '/category/safety/hazardous-master',
    },
    {
      id: 'hazardous-engineer',
      name: '위험물기사',
      englishName: 'Engineer Hazardous Materials',
      icon: '⚠️',
      color: 'from-yellow-500 to-red-500',
      difficulty: 4,
      description: '위험물 안전관리 기술 전문가',
      subjects: ['일반화학', '화재예방과 소화', '위험물성질과 취급', '위험물안전관리법', '실기'],
      hasStudyPage: true,
      href: '/category/safety/hazardous-engineer',
    },
    {
      id: 'hazardous-technician',
      name: '위험물산업기사',
      englishName: 'Industrial Engineer Hazardous Materials',
      icon: '☢️',
      color: 'from-yellow-400 to-orange-400',
      difficulty: 3,
      description: '위험물 취급 및 안전관리 실무자',
      subjects: ['일반화학', '화재예방과 소화', '위험물성질과 취급', '실기'],
      hasStudyPage: true,
      href: '/category/safety/hazardous-technician',
    },
    {
      id: 'gas-engineer',
      name: '가스기사',
      englishName: 'Engineer Gas',
      icon: '🔥',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 4,
      description: '고압가스·LPG·도시가스 시설 안전관리 전문가',
      subjects: ['연소공학', '가스설비', '가스안전관리', '가스관계법규', '실기'],
      hasStudyPage: true,
      href: '/category/safety/gas-engineer',
    },
    {
      id: 'gas-technician',
      name: '가스산업기사',
      englishName: 'Industrial Engineer Gas',
      icon: '🔥',
      color: 'from-blue-400 to-indigo-400',
      difficulty: 3,
      description: '가스시설 안전관리 및 점검 실무자',
      subjects: ['연소공학', '가스설비', '가스안전관리', '실기'],
      hasStudyPage: true,
      href: '/category/safety/gas-technician',
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">안전·소방</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">안전·소방 분야</h1>
              <p className="text-red-100 mt-1">Safety & Fire Protection</p>
              <p className="text-red-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">💡 안전·소방 분야 자격증 안내</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• 산업안전기사: 한국산업인력공단 주관, 산업현장 안전관리자 필수 자격</li>
              <li>• 소방설비기사: 소방시설 설계·시공·감리 업무 수행 가능</li>
              <li>• 위험물기사: 위험물 제조소·저장소·취급소 안전관리자 선임 가능</li>
              <li>• 가스기사: 고압가스, LPG, 도시가스 시설 안전관리 업무 수행</li>
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
