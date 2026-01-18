import Link from 'next/link';

export default function ITCategoryPage() {
    const certifications = [
    {
      id: "adsp",
      name: "ADsP",
      englishName: "Advanced Data Analytics Semi-Professional",
      icon: "📈",
      color: "from-cyan-500 to-blue-600",
      difficulty: 3,
      description: "데이터 분석 기초 역량 검증",
      subjects: ["데이터 이해", "데이터 분석 기획", "데이터 분석"],
      hasStudyPage: true,
      href: "/category/it/adsp",
    },
    {
      id: "information-processor",
      name: "정보처리기사",
      englishName: "Engineer Information Processing",
      icon: "🖥️",
      color: "from-blue-500 to-indigo-500",
      difficulty: 3,
      description: "소프트웨어 개발 및 데이터베이스 관리 전문가",
      subjects: ["소프트웨어설계", "소프트웨어개발", "데이터베이스", "프로그래밍언어", "정보시스템"],
      hasStudyPage: true,
      href: "/category/it/information-processor",
    },
    {
      id: "information-security",
      name: "정보보안기사",
      englishName: "Engineer Information Security",
      icon: "🔐",
      color: "from-emerald-500 to-teal-500",
      difficulty: 4,
      description: "정보시스템 보안 및 해킹 방어 전문가",
      subjects: ["시스템보안", "네트워크보안", "어플리케이션보안", "정보보안일반", "정보보안관리"],
      hasStudyPage: true,
      href: "/category/it/information-security",
    },
    {
      id: "network-admin",
      name: "네트워크관리사",
      englishName: "Network Administrator",
      icon: "🌐",
      color: "from-green-500 to-emerald-600",
      difficulty: 3,
      description: "네트워크 구축 및 관리 전문가",
      subjects: ["네트워크일반", "TCP/IP", "네트워크운용", "NOS", "실기"],
      hasStudyPage: true,
      href: "/category/it/network-admin",
    },
    {
      id: "sqld",
      name: "SQLD",
      englishName: "SQL Developer",
      icon: "🗄️",
      color: "from-orange-500 to-amber-600",
      difficulty: 3,
      description: "SQL 전문가 자격 (개발자)",
      subjects: ["데이터 모델링", "SQL 기본", "SQL 활용"],
      hasStudyPage: true,
      href: "/category/it/sqld",
    },
    {
      id: "linux-master",
      name: "리눅스마스터",
      englishName: "Linux Master",
      icon: "🐧",
      color: "from-yellow-500 to-orange-600",
      difficulty: 3,
      description: "리눅스 시스템 관리 자격",
      subjects: ["리눅스 실무", "시스템 관리", "네트워크 관리"],
      hasStudyPage: true,
      href: "/category/it/linux-master",
    },
    {
      id: "computer-organization",
      name: "전자계산기조직응용기사",
      englishName: "Engineer Computer Organization",
      icon: "⚙️",
      color: "from-violet-500 to-purple-500",
      difficulty: 4,
      description: "컴퓨터 시스템 설계 및 응용 전문가",
      subjects: ["데이터통신", "전자계산기구조", "운영체제", "소프트웨어공학", "데이터베이스"],
      hasStudyPage: true,
      href: "/category/it/computer-organization",
    },
    {
      id: "computer-system-pro",
      name: "컴퓨터시스템응용기술사",
      englishName: "Professional Engineer Computer System",
      icon: "🏆",
      color: "from-amber-500 to-orange-500",
      difficulty: 5,
      description: "컴퓨터 시스템 분야 최고급 전문가",
      subjects: ["컴퓨터구조", "운영체제", "데이터베이스", "네트워크", "소프트웨어공학", "면접"],
      hasStudyPage: true,
      href: "/category/it/computer-system-pro",
    },
    {
      id: "information-management-pro",
      name: "정보관리기술사",
      englishName: "Professional Engineer Information Management",
      icon: "📊",
      color: "from-rose-500 to-pink-500",
      difficulty: 5,
      description: "정보시스템 관리 분야 최고급 전문가",
      subjects: ["정보전략계획", "데이터아키텍처", "프로젝트관리", "정보보안", "최신IT동향", "면접"],
      hasStudyPage: true,
      href: "/category/it/information-management-pro",
    },
    {
      id: "big-data-analyst",
      name: "빅데이터분석기사",
      englishName: "Engineer Big Data Analytics",
      icon: "📈",
      color: "from-cyan-600 to-blue-500",
      difficulty: 3,
      description: "빅데이터 수집, 분석, 시각화 전문가",
      subjects: ["빅데이터분석기획", "빅데이터탐색", "빅데이터모델링", "빅데이터결과해석"],
      hasStudyPage: true,
      href: "/category/it/big-data-analyst",
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">IT·정보통신</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💻</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">IT·정보통신 분야</h1>
              <p className="text-blue-100 mt-1">Information Technology</p>
              <p className="text-blue-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
