import Link from 'next/link';

export default function OfficeCategoryPage() {
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
      id: 'word-processor',
      name: '워드프로세서',
      englishName: 'Word Processor',
      icon: '📄',
      color: 'from-violet-600 to-purple-500',
      difficulty: 2,
      description: '대한상공회의소 문서작성 전문 자격',
      subjects: ['워드프로세싱 용어', '컴퓨터 상식', '문서작성'],
      hasStudyPage: true,
      href: '/category/office/word-processor',
    },
    {
      id: 'computer-skills-1',
      name: '컴퓨터활용능력 1급',
      englishName: 'Computer Skills Level 1',
      icon: '💻',
      color: 'from-blue-600 to-indigo-500',
      difficulty: 4,
      description: '컴퓨터활용 최상위 수준 자격',
      subjects: ['컴퓨터 일반', '스프레드시트', '데이터베이스'],
      hasStudyPage: true,
      href: '/category/office/computer-skills-1',
    },
    {
      id: 'computer-skills-2',
      name: '컴퓨터활용능력 2급',
      englishName: 'Computer Skills Level 2',
      icon: '🖥️',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 3,
      description: '컴퓨터활용 중급 수준 자격',
      subjects: ['컴퓨터 일반', '스프레드시트'],
      hasStudyPage: true,
      href: '/category/office/computer-skills-2',
    },
    {
      id: 'office-automation',
      name: '사무자동화산업기사',
      englishName: 'Industrial Engineer Office Automation',
      icon: '⚙️',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 3,
      description: '한국산업인력공단 사무자동화 전문 자격',
      subjects: ['사무자동화시스템', '프로그래밍', '정보통신', '사무경영관리'],
      hasStudyPage: true,
      href: '/category/office/office-automation',
    },
    {
      id: 'ecommerce-1',
      name: '전자상거래관리사 1급',
      englishName: 'E-Commerce Manager Level 1',
      icon: '🛒',
      color: 'from-orange-500 to-amber-500',
      difficulty: 4,
      description: '전자상거래 최상위 수준 자격',
      subjects: ['전자상거래 기획', '전자상거래 운영', '전자상거래 관리'],
      hasStudyPage: true,
      href: '/category/office/ecommerce-1',
    },
    {
      id: 'ecommerce-2',
      name: '전자상거래관리사 2급',
      englishName: 'E-Commerce Manager Level 2',
      icon: '🖱️',
      color: 'from-yellow-500 to-orange-400',
      difficulty: 3,
      description: '전자상거래 중급 수준 자격',
      subjects: ['전자상거래 일반', '전자상거래 기술', '인터넷 마케팅'],
      hasStudyPage: true,
      href: '/category/office/ecommerce-2',
    },
    {
      id: 'secretary-1',
      name: '비서 1급',
      englishName: 'Secretary Level 1',
      icon: '👔',
      color: 'from-pink-500 to-rose-500',
      difficulty: 3,
      description: '비서 업무 최상위 수준 자격',
      subjects: ['비서실무', '경영일반', '사무영어', '사무정보관리'],
      hasStudyPage: true,
      href: '/category/office/secretary-1',
    },
    {
      id: 'secretary-2',
      name: '비서 2급',
      englishName: 'Secretary Level 2',
      icon: '👩‍💼',
      color: 'from-fuchsia-500 to-pink-500',
      difficulty: 2,
      description: '비서 업무 중급 수준 자격',
      subjects: ['비서실무', '사무정보관리', '비즈니스 매너'],
      hasStudyPage: true,
      href: '/category/office/secretary-2',
    },
    {
      id: 'secretary-3',
      name: '비서 3급',
      englishName: 'Secretary Level 3',
      icon: '📋',
      color: 'from-purple-400 to-fuchsia-400',
      difficulty: 2,
      description: '비서 업무 초급 수준 자격',
      subjects: ['비서실무 기초', '문서작성', '비즈니스 매너'],
      hasStudyPage: true,
      href: '/category/office/secretary-3',
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
            <span className="text-violet-600 font-medium">사무·경영</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-violet-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💼</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">사무·경영 분야</h1>
              <p className="text-violet-100 mt-1">Office & Business Administration</p>
              <p className="text-violet-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-violet-50 rounded-xl p-6 border border-violet-200">
            <h3 className="font-bold text-violet-800 mb-2">💡 사무·경영 분야 자격증 안내</h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• 워드프로세서/컴퓨터활용능력: 대한상공회의소 주관, 상시시험 가능</li>
              <li>• 전자상거래관리사: 대한상공회의소 주관, 연 4회 정기시험</li>
              <li>• 비서자격증: 대한상공회의소 주관, 연 4회 정기시험</li>
              <li>• 사무자동화산업기사: 한국산업인력공단 주관, 연 3회 정기시험</li>
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
