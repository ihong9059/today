import Link from 'next/link';

export default function LegalCategoryPage() {
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
      id: 'judicial-scrivener',
      name: '법무사',
      englishName: 'Judicial Scrivener',
      icon: '⚖️',
      color: 'from-violet-600 to-purple-600',
      difficulty: 5,
      description: '법률사무 및 등기신청 전문가',
      subjects: ['헌법', '민법', '형법', '상법', '민사소송법', '부동산등기법'],
      hasStudyPage: true,
      href: '/category/legal/judicial-scrivener',
    },
    {
      id: 'patent-attorney',
      name: '변리사',
      englishName: 'Patent Attorney',
      icon: '💡',
      color: 'from-blue-600 to-indigo-600',
      difficulty: 5,
      description: '특허·상표 등 지적재산권 전문가',
      subjects: ['산업재산권법', '민법', '자연과학개론', '특허법', '상표법'],
      hasStudyPage: true,
      href: '/category/legal/patent-attorney',
    },
    {
      id: 'labor-attorney',
      name: '공인노무사',
      englishName: 'Certified Labor Attorney',
      icon: '👷',
      color: 'from-amber-500 to-orange-500',
      difficulty: 5,
      description: '노동 관련 법률 및 노무관리 전문가',
      subjects: ['노동법', '민법', '사회보험법', '경영학', '행정소송법'],
      hasStudyPage: true,
      href: '/category/legal/labor-attorney',
    },
    {
      id: 'appraiser',
      name: '감정평가사',
      englishName: 'Certified Appraiser',
      icon: '🏢',
      color: 'from-teal-500 to-emerald-500',
      difficulty: 5,
      description: '부동산 및 동산 가치평가 전문가',
      subjects: ['감정평가이론', '부동산학원론', '민법', '경제학원론', '회계학'],
      hasStudyPage: true,
      href: '/category/legal/appraiser',
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
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">법률</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">법률 분야</h1>
              <p className="text-violet-100 mt-1">Legal & Law</p>
              <p className="text-violet-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
          <div className="bg-violet-50 rounded-xl p-6 border border-violet-200">
            <h3 className="font-bold text-violet-800 mb-2">💡 법률 분야 자격증 안내</h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• 법무사/변리사/공인노무사/감정평가사: 국가전문자격, 1차·2차 시험 합격 필요</li>
              <li>• 모든 자격시험은 연 1회 시행 (법무사, 변리사는 법무부/특허청 주관)</li>
              <li>• 합격 후 일정 기간 실무수습 필요</li>
              <li>• 전문직 자격으로 독립 개업 또는 법률사무소, 기업 취업 가능</li>
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
