import Link from 'next/link';

export default function FinanceCategoryPage() {
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
      id: 'real-estate-agent',
      name: '공인중개사',
      englishName: 'Licensed Real Estate Agent',
      icon: '🏠',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 4,
      description: '부동산 중개 및 거래 전문가',
      subjects: ['부동산학개론', '민법', '중개사법', '공법', '공시법·세법'],
      hasStudyPage: true,
      href: '/category/finance/real-estate-agent',
    },
    {
      id: 'fund-advisor',
      name: '펀드투자권유자문인력',
      englishName: 'Fund Investment Advisor',
      icon: '📊',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 3,
      description: '펀드 투자 권유 및 자문 전문가',
      subjects: ['펀드일반', '투자권유', '펀드법규·윤리'],
      hasStudyPage: true,
      href: '/category/finance/fund-advisor',
    },
    {
      id: 'securities-advisor',
      name: '증권투자권유자문인력',
      englishName: 'Securities Investment Advisor',
      icon: '📈',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 3,
      description: '증권 투자 권유 및 자문 전문가',
      subjects: ['투자상품', '증권분석', '투자권유', '법규·윤리'],
      hasStudyPage: true,
      href: '/category/finance/securities-advisor',
    },
    {
      id: 'derivatives-advisor',
      name: '파생상품투자권유자문인력',
      englishName: 'Derivatives Investment Advisor',
      icon: '📉',
      color: 'from-violet-500 to-purple-500',
      difficulty: 4,
      description: '파생상품 투자 권유 및 자문 전문가',
      subjects: ['파생상품I', '파생상품II', '법규·윤리'],
      hasStudyPage: true,
      href: '/category/finance/derivatives-advisor',
    },
    {
      id: 'credit-analyst',
      name: '신용분석사',
      englishName: 'Credit Analyst',
      icon: '🏦',
      color: 'from-blue-600 to-indigo-600',
      difficulty: 4,
      description: '기업 신용평가 및 분석 전문가',
      subjects: ['회계원리', '재무회계', '신용분석', '기업분석'],
      hasStudyPage: true,
      href: '/category/finance/credit-analyst',
    },
    {
      id: 'financial-risk-manager',
      name: '재무위험관리사',
      englishName: 'Financial Risk Manager',
      icon: '⚠️',
      color: 'from-red-500 to-rose-500',
      difficulty: 4,
      description: '금융기관 리스크 관리 전문가',
      subjects: ['리스크관리 기초', '시장리스크', '신용리스크', '운영리스크'],
      hasStudyPage: true,
      href: '/category/finance/financial-risk-manager',
    },
    {
      id: 'fp',
      name: '자산관리사(FP)',
      englishName: 'Financial Planner',
      icon: '💰',
      color: 'from-teal-500 to-emerald-500',
      difficulty: 3,
      description: '개인 재무설계 및 자산관리 전문가',
      subjects: ['재무설계 개론', '투자설계', '보험설계', '세금설계'],
      hasStudyPage: true,
      href: '/category/finance/fp',
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">금융</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💳</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">금융 분야</h1>
              <p className="text-teal-100 mt-1">Finance & Investment</p>
              <p className="text-teal-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
            <h3 className="font-bold text-teal-800 mb-2">💡 금융 분야 자격증 안내</h3>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• 투자권유자문인력: 금융투자협회 주관, 금융투자회사 영업 필수 자격</li>
              <li>• 신용분석사/재무위험관리사: 한국금융연수원 주관, 금융기관 취업 우대</li>
              <li>• 공인중개사: 국토교통부 주관, 부동산 중개업 개업 필수 자격</li>
              <li>• 자산관리사(FP): 한국금융연수원 주관, 종합 재무설계 전문가 자격</li>
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
