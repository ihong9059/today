import Link from 'next/link';

export default function EducationCategoryPage() {
  const certifications = [
    {
      id: 'teacher-certificate',
      name: '교원자격증',
      englishName: 'Teacher Certificate',
      icon: '🎓',
      color: 'from-red-500 to-rose-600',
      difficulty: 5,
      description: '초등/중등/특수교사 임용시험',
      subjects: ['교육학', '전공과목', '교직논술', '수업실연', '면접'],
      hasStudyPage: true,
      href: '/category/education/teacher-certificate',
    },
    {
      id: 'kindergarten-teacher',
      name: '유치원정교사',
      englishName: 'Kindergarten Teacher',
      icon: '👶',
      color: 'from-pink-400 to-rose-500',
      difficulty: 4,
      description: '유아교육 전문가 자격',
      subjects: ['유아교육론', '유아발달', '유아교육과정', '교육방법론', '면접'],
      hasStudyPage: true,
      href: '/category/education/kindergarten-teacher',
    },
    {
      id: 'librarian-teacher',
      name: '사서교사',
      englishName: 'Librarian Teacher',
      icon: '📖',
      color: 'from-blue-500 to-indigo-600',
      difficulty: 4,
      description: '학교도서관 운영 전문가',
      subjects: ['도서관경영', '정보조직론', '정보서비스론', '독서교육론', '학교도서관'],
      hasStudyPage: true,
      href: '/category/education/librarian-teacher',
    },
    {
      id: 'lifelong-educator-1',
      name: '평생교육사 1급',
      englishName: 'Lifelong Educator Level 1',
      icon: '📚',
      color: 'from-indigo-600 to-purple-600',
      difficulty: 4,
      description: '평생교육 고급 전문가 (경력 5년+)',
      subjects: ['평생교육론', '평생교육방법론', '평생교육경영론', '프로그램개발론', '실습'],
      hasStudyPage: true,
      href: '/category/education/lifelong-educator-1',
    },
    {
      id: 'lifelong-educator-2',
      name: '평생교육사 2급',
      englishName: 'Lifelong Educator Level 2',
      icon: '📚',
      color: 'from-indigo-500 to-purple-500',
      difficulty: 3,
      description: '평생교육 프로그램 기획·운영',
      subjects: ['평생교육론', '평생교육방법론', '평생교육경영론', '실습'],
      hasStudyPage: true,
      href: '/category/education/lifelong-educator-2',
    },
    {
      id: 'youth-instructor-1',
      name: '청소년지도사 1급',
      englishName: 'Youth Instructor Level 1',
      icon: '🎯',
      color: 'from-green-600 to-teal-600',
      difficulty: 4,
      description: '청소년활동 고급 지도자 (경력 3년+)',
      subjects: ['청소년연구방법론', '청소년인권과참여', '청소년정책론', '기관운영', '면접'],
      hasStudyPage: true,
      href: '/category/education/youth-instructor-1',
    },
    {
      id: 'youth-instructor-2',
      name: '청소년지도사 2급',
      englishName: 'Youth Instructor Level 2',
      icon: '🎯',
      color: 'from-green-500 to-teal-500',
      difficulty: 3,
      description: '청소년활동 기획·운영·지도',
      subjects: ['청소년육성제도론', '청소년지도방법론', '청소년심리및상담', '청소년문화', '실기'],
      hasStudyPage: true,
      href: '/category/education/youth-instructor-2',
    },
    {
      id: 'youth-counselor',
      name: '청소년상담사',
      englishName: 'Youth Counselor',
      icon: '💚',
      color: 'from-emerald-500 to-green-500',
      difficulty: 4,
      description: '청소년 상담 및 심리치료 전문가',
      subjects: ['발달심리', '집단상담', '심리측정및평가', '상담이론', '학습이론', '실기'],
      hasStudyPage: true,
      href: '/category/education/youth-counselor',
    },
    {
      id: 'career-counselor-1',
      name: '직업상담사 1급',
      englishName: 'Career Counselor Level 1',
      icon: '💼',
      color: 'from-violet-600 to-purple-600',
      difficulty: 4,
      description: '직업상담 고급 전문가 (2급 취득 후 3년)',
      subjects: ['고급직업상담학', '고급직업심리학', '고급직업정보론', '노동시장론', '노동관계법규'],
      hasStudyPage: true,
      href: '/category/education/career-counselor-1',
    },
    {
      id: 'career-counselor-2',
      name: '직업상담사 2급',
      englishName: 'Career Counselor Level 2',
      icon: '💼',
      color: 'from-teal-500 to-emerald-500',
      difficulty: 3,
      description: '직업상담, 취업알선, 직업적응지도',
      subjects: ['직업상담학', '직업심리학', '직업정보론', '노동시장론', '노동관계법규'],
      hasStudyPage: true,
      href: '/category/education/career-counselor-2',
    },
    {
      id: 'social-worker',
      name: '사회복지사',
      englishName: 'Social Worker',
      icon: '🤝',
      color: 'from-pink-500 to-rose-500',
      difficulty: 3,
      description: '사회복지 프로그램 개발·운영·평가',
      subjects: ['사회복지기초', '사회복지실천', '사회복지정책과제도', '실습'],
      hasStudyPage: true,
      href: '/category/education/social-worker',
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">교육</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">교육 분야</h1>
              <p className="text-indigo-100 mt-1">Education</p>
              <p className="text-indigo-100 mt-2">{certifications.length}개 자격증</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
