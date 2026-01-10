import Link from 'next/link';

export default function InsuranceCategoryPage() {
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
      id: 'damage-assessor',
      name: '손해평가사',
      englishName: 'Damage Assessor',
      icon: '🌾',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 4,
      description: '농작물재해 손해평가 전문가',
      subjects: ['상법(보험편)', '농어업재해보험법', '농학개론', '손해평가론'],
      hasStudyPage: true,
      href: '/category/insurance/damage-assessor',
    },
    {
      id: 'housing-manager',
      name: '주택관리사(보)',
      englishName: 'Housing Manager',
      icon: '🏢',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 4,
      description: '공동주택 관리 전문가',
      subjects: ['민법', '주택관리관계법규', '회계원리', '시설관리'],
      hasStudyPage: true,
      href: '/category/insurance/housing-manager',
    },
    {
      id: 'actuary',
      name: '보험계리사',
      englishName: 'Actuary',
      icon: '📊',
      color: 'from-purple-500 to-violet-500',
      difficulty: 5,
      description: '보험상품 설계 및 리스크 관리 전문가',
      subjects: ['보험수학', '보험계약법', '리스크관리', '계리모형'],
      hasStudyPage: true,
      href: '/category/insurance/actuary',
    },
    {
      id: 'loss-adjuster',
      name: '손해사정사',
      englishName: 'Loss Adjuster',
      icon: '📋',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 4,
      description: '보험사고 손해액 산정 전문가',
      subjects: ['보험이론', '손해사정이론', '보험관계법규', '자동차보험'],
      hasStudyPage: true,
      href: '/category/insurance/loss-adjuster',
    },
    {
      id: 'insurance-broker',
      name: '보험중개사',
      englishName: 'Insurance Broker',
      icon: '🤝',
      color: 'from-teal-500 to-cyan-500',
      difficulty: 4,
      description: '보험상품 중개 전문가',
      subjects: ['보험이론', '보험법규', '보험계약법', '리스크관리'],
      hasStudyPage: true,
      href: '/category/insurance/insurance-broker',
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
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">보험·부동산</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🏠</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">보험·부동산 분야</h1>
              <p className="text-cyan-100 mt-1">Insurance & Real Estate</p>
              <p className="text-cyan-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
            <h3 className="font-bold text-cyan-800 mb-2">💡 보험·부동산 분야 자격증 안내</h3>
            <ul className="text-sm text-cyan-700 space-y-1">
              <li>• 손해평가사: 금융감독원 주관, 연 1회 시험</li>
              <li>• 주택관리사(보): 국토교통부 주관, 연 1회 시험</li>
              <li>• 보험계리사: 금융감독원 주관, 연 1회 시험 (1차/2차)</li>
              <li>• 손해사정사: 금융감독원 주관, 연 2회 시험</li>
              <li>• 보험중개사: 금융감독원 주관, 연 1회 시험</li>
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
