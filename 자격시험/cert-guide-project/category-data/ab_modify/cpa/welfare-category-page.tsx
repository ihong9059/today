import Link from 'next/link';

export default function WelfareCategoryPage() {
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
      id: 'social-worker-1',
      name: '사회복지사 1급',
      englishName: 'Social Worker Level 1',
      icon: '🤝',
      color: 'from-violet-600 to-purple-600',
      difficulty: 4,
      description: '사회복지 서비스 제공 전문가',
      subjects: ['사회복지기초', '사회복지실천', '사회복지정책과 제도'],
      hasStudyPage: true,
      href: '/category/welfare/social-worker-1',
    },
    {
      id: 'social-worker-2',
      name: '사회복지사 2급',
      englishName: 'Social Worker Level 2',
      icon: '🤝',
      color: 'from-violet-500 to-purple-500',
      difficulty: 3,
      description: '사회복지 현장실무 전문가',
      subjects: ['사회복지개론', '사회복지실천론', '사회복지실습'],
      hasStudyPage: true,
      href: '/category/welfare/social-worker-2',
    },
    {
      id: 'childcare-teacher-1',
      name: '보육교사 1급',
      englishName: 'Childcare Teacher Level 1',
      icon: '👶',
      color: 'from-pink-500 to-rose-500',
      difficulty: 3,
      description: '어린이집 보육 전문가',
      subjects: ['영유아발달', '보육과정', '아동권리와 복지'],
      hasStudyPage: true,
      href: '/category/welfare/childcare-teacher-1',
    },
    {
      id: 'childcare-teacher-2',
      name: '보육교사 2급',
      englishName: 'Childcare Teacher Level 2',
      icon: '👶',
      color: 'from-pink-400 to-rose-400',
      difficulty: 2,
      description: '어린이집 보육 실무자',
      subjects: ['보육학개론', '영유아교수방법론', '보육실습'],
      hasStudyPage: true,
      href: '/category/welfare/childcare-teacher-2',
    },
    {
      id: 'career-counselor-1',
      name: '직업상담사 1급',
      englishName: 'Career Counselor Level 1',
      icon: '💼',
      color: 'from-blue-600 to-indigo-600',
      difficulty: 4,
      description: '취업 및 진로 상담 전문가',
      subjects: ['고급직업상담학', '고급직업심리학', '고급직업정보론', '노동시장론', '노동법규'],
      hasStudyPage: true,
      href: '/category/welfare/career-counselor-1',
    },
    {
      id: 'career-counselor-2',
      name: '직업상담사 2급',
      englishName: 'Career Counselor Level 2',
      icon: '💼',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 3,
      description: '취업 및 진로 상담 실무자',
      subjects: ['직업상담학', '직업심리학', '직업정보론', '노동시장론', '노동법규'],
      hasStudyPage: true,
      href: '/category/welfare/career-counselor-2',
    },
    {
      id: 'youth-counselor-1',
      name: '청소년상담사 1급',
      englishName: 'Youth Counselor Level 1',
      icon: '🧑‍🤝‍🧑',
      color: 'from-emerald-600 to-teal-600',
      difficulty: 5,
      description: '청소년 심리상담 전문가',
      subjects: ['상담자교육 및 사례지도', '청소년관련법과 정책', '상담연구방법론', '비행상담', '성상담', '약물상담'],
      hasStudyPage: true,
      href: '/category/welfare/youth-counselor-1',
    },
    {
      id: 'youth-counselor-2',
      name: '청소년상담사 2급',
      englishName: 'Youth Counselor Level 2',
      icon: '🧑‍🤝‍🧑',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 4,
      description: '청소년 심리상담 중급자',
      subjects: ['청소년상담', '상담이론', '집단상담', '심리측정 및 평가', '청소년이해론'],
      hasStudyPage: true,
      href: '/category/welfare/youth-counselor-2',
    },
    {
      id: 'youth-counselor-3',
      name: '청소년상담사 3급',
      englishName: 'Youth Counselor Level 3',
      icon: '🧑‍🤝‍🧑',
      color: 'from-emerald-400 to-teal-400',
      difficulty: 3,
      description: '청소년 심리상담 입문자',
      subjects: ['발달심리', '집단상담', '심리측정 및 평가', '상담이론', '학습이론'],
      hasStudyPage: true,
      href: '/category/welfare/youth-counselor-3',
    },
    {
      id: 'clinical-psychologist-1',
      name: '임상심리사 1급',
      englishName: 'Clinical Psychologist Level 1',
      icon: '🧠',
      color: 'from-cyan-600 to-blue-600',
      difficulty: 5,
      description: '심리평가 및 치료 전문가',
      subjects: ['심리학개론', '이상심리학', '심리검사', '임상심리학', '심리치료'],
      hasStudyPage: true,
      href: '/category/welfare/clinical-psychologist-1',
    },
    {
      id: 'clinical-psychologist-2',
      name: '임상심리사 2급',
      englishName: 'Clinical Psychologist Level 2',
      icon: '🧠',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 3,
      description: '심리평가 및 치료 실무자',
      subjects: ['심리학개론', '이상심리학', '심리검사', '임상심리학', '심리상담'],
      hasStudyPage: true,
      href: '/category/welfare/clinical-psychologist-2',
    },
    {
      id: 'counseling-psychologist-1',
      name: '상담심리사 1급',
      englishName: 'Counseling Psychologist Level 1',
      icon: '💬',
      color: 'from-amber-500 to-orange-500',
      difficulty: 5,
      description: '한국상담심리학회 1급 자격',
      subjects: ['상담심리학', '심리검사', '집단상담', '상담수련', '사례발표'],
      hasStudyPage: true,
      href: '/category/welfare/counseling-psychologist-1',
    },
    {
      id: 'counseling-psychologist-2',
      name: '상담심리사 2급',
      englishName: 'Counseling Psychologist Level 2',
      icon: '💬',
      color: 'from-amber-400 to-orange-400',
      difficulty: 3,
      description: '한국상담심리학회 2급 자격',
      subjects: ['상담심리학', '심리검사', '상담실습', '사례보고서'],
      hasStudyPage: true,
      href: '/category/welfare/counseling-psychologist-2',
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
            <span className="text-violet-600 font-medium">사회복지·상담</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🤝</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">사회복지·상담 분야</h1>
              <p className="text-violet-100 mt-1">Social Welfare & Counseling</p>
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
            <h3 className="font-bold text-violet-800 mb-2">💡 사회복지·상담 분야 자격증 안내</h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• 사회복지사: 보건복지부 주관 국가자격, 사회복지시설 필수 자격</li>
              <li>• 직업상담사: 한국산업인력공단 주관, 고용센터·취업지원기관 근무</li>
              <li>• 청소년상담사: 여성가족부 주관 국가자격, 청소년상담복지센터 근무</li>
              <li>• 임상심리사: 한국산업인력공단 주관, 병원·상담센터 심리평가 업무</li>
              <li>• 상담심리사: 한국상담심리학회 민간자격, 상담전문가 자격</li>
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
