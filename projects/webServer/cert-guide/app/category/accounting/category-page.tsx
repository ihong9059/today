import Link from 'next/link';

export default function AccountingCategoryPage() {
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
      id: 'financial-manager',
      name: '재경관리사',
      englishName: 'Financial Manager',
      icon: '💼',
      color: 'from-indigo-600 to-purple-500',
      difficulty: 3,
      description: '재무회계, 세무회계, 원가관리회계 전문가',
      subjects: ['재무회계', '세무회계', '원가관리회계'],
      hasStudyPage: true,
      href: '/category/accounting/financial-manager',
    },
    {
      id: 'cpa',
      name: '공인회계사(CPA)',
      englishName: 'Certified Public Accountant',
      icon: '📊',
      color: 'from-emerald-600 to-teal-600',
      difficulty: 5,
      description: '회계감사 및 재무제표 작성 전문가',
      subjects: ['재정학', '세법개론', '상법', '회계학', '경영학'],
      hasStudyPage: true,
      href: '/category/accounting/cpa',
    },
    {
      id: 'tax-accountant',
      name: '세무사',
      englishName: 'Certified Tax Accountant',
      icon: '📋',
      color: 'from-blue-600 to-indigo-600',
      difficulty: 5,
      description: '세금 신고 및 조세 상담 전문가',
      subjects: ['재정학', '세법학개론', '회계학개론', '상법', '행정소송법'],
      hasStudyPage: true,
      href: '/category/accounting/tax-accountant',
    },
    {
      id: 'customs-broker',
      name: '관세사',
      englishName: 'Customs Broker',
      icon: '📦',
      color: 'from-violet-500 to-purple-600',
      difficulty: 5,
      description: '수출입 통관 및 관세 업무 전문가',
      subjects: ['관세법', '무역영어', '내국소비세법', '회계학', '관세율표'],
      hasStudyPage: true,
      href: '/category/accounting/customs-broker',
    },
    {
      id: 'computerized-accounting-1',
      name: '전산회계 1급',
      englishName: 'Computerized Accounting Level 1',
      icon: '💻',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 3,
      description: '전산회계 실무 능력 국가공인자격',
      subjects: ['재무회계', '원가회계', '세무회계', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/computerized-accounting-1',
    },
    {
      id: 'computerized-accounting-2',
      name: '전산회계 2급',
      englishName: 'Computerized Accounting Level 2',
      icon: '📝',
      color: 'from-teal-400 to-cyan-500',
      difficulty: 2,
      description: '회계 기초 실무 능력 국가공인자격',
      subjects: ['회계원리', '부가가치세', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/computerized-accounting-2',
    },
    {
      id: 'computerized-tax-1',
      name: '전산세무 1급',
      englishName: 'Computerized Tax Level 1',
      icon: '🧮',
      color: 'from-indigo-500 to-violet-500',
      difficulty: 4,
      description: '전산세무 고급 실무 능력 국가공인자격',
      subjects: ['재무회계', '원가회계', '세무회계', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/computerized-tax-1',
    },
    {
      id: 'computerized-tax-2',
      name: '전산세무 2급',
      englishName: 'Computerized Tax Level 2',
      icon: '📊',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 3,
      description: '전산세무 중급 실무 능력 국가공인자격',
      subjects: ['재무회계', '부가가치세', '소득세', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/computerized-tax-2',
    },
    {
      id: 'fat-1',
      name: 'FAT 1급',
      englishName: 'Financial Accounting Technician Level 1',
      icon: '💼',
      color: 'from-amber-500 to-orange-500',
      difficulty: 3,
      description: '회계정보처리 국가공인자격 (한국공인회계사회)',
      subjects: ['재무회계', '원가관리회계', '세무회계', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/fat-1',
    },
    {
      id: 'fat-2',
      name: 'FAT 2급',
      englishName: 'Financial Accounting Technician Level 2',
      icon: '📖',
      color: 'from-yellow-500 to-amber-500',
      difficulty: 2,
      description: '회계정보처리 기초 국가공인자격',
      subjects: ['회계기초', '부기실무', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/fat-2',
    },
    {
      id: 'tat-1',
      name: 'TAT 1급',
      englishName: 'Tax Accounting Technician Level 1',
      icon: '📑',
      color: 'from-rose-500 to-pink-500',
      difficulty: 4,
      description: '세무정보처리 국가공인자격 (한국공인회계사회)',
      subjects: ['재무회계', '원가회계', '세무회계', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/tat-1',
    },
    {
      id: 'tat-2',
      name: 'TAT 2급',
      englishName: 'Tax Accounting Technician Level 2',
      icon: '📋',
      color: 'from-pink-400 to-rose-500',
      difficulty: 3,
      description: '세무정보처리 기초 국가공인자격',
      subjects: ['회계원리', '부가가치세', '실기'],
      hasStudyPage: true,
      href: '/category/accounting/tat-2',
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">회계·세무</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">회계·세무 분야</h1>
              <p className="text-emerald-100 mt-1">Accounting & Tax</p>
              <p className="text-emerald-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-2">💡 회계·세무 분야 자격증 안내</h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• 공인회계사/세무사/관세사: 국가전문자격, 1차·2차 시험 합격 필요</li>
              <li>• 전산회계/전산세무: 한국세무사회 주관, 회계프로그램 실무 자격</li>
              <li>• FAT/TAT: 한국공인회계사회 주관, AT(회계정보처리) 자격시험</li>
              <li>• 실무 회계/세무 업무에 필수적인 자격증으로 취업 시 우대</li>
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
