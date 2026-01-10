import Link from 'next/link';

export default function DesignCategoryPage() {
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
      id: 'computer-graphics',
      name: '컴퓨터그래픽스운용기능사',
      englishName: 'Craftsman Computer Graphics',
      icon: '🖥️',
      color: 'from-purple-500 to-indigo-500',
      difficulty: 2,
      description: '그래픽 디자인 실무 능력 자격',
      subjects: ['산업디자인일반', '색채및도법', '컴퓨터그래픽스'],
      hasStudyPage: true,
      href: '/category/design/computer-graphics',
    },
    {
      id: 'web-design',
      name: '웹디자인기능사',
      englishName: 'Craftsman Web Design',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      difficulty: 2,
      description: '웹페이지 디자인 및 코딩 자격',
      subjects: ['디자인일반', '인터넷일반', '웹그래픽디자인'],
      hasStudyPage: true,
      href: '/category/design/web-design',
    },
    {
      id: 'visual-design-engineer',
      name: '시각디자인기사',
      englishName: 'Engineer Visual Communication Design',
      icon: '🎨',
      color: 'from-pink-500 to-rose-500',
      difficulty: 4,
      description: '시각매체 디자인 전문가',
      subjects: ['시각디자인론', '색채학', '타이포그래피', '광고학'],
      hasStudyPage: true,
      href: '/category/design/visual-design-engineer',
    },
    {
      id: 'visual-design-technician',
      name: '시각디자인산업기사',
      englishName: 'Industrial Engineer Visual Design',
      icon: '🎨',
      color: 'from-rose-400 to-pink-400',
      difficulty: 3,
      description: '시각매체 디자인 기술자',
      subjects: ['시각디자인론', '색채학', '타이포그래피', '광고학'],
      hasStudyPage: true,
      href: '/category/design/visual-design-technician',
    },
    {
      id: 'product-design-engineer',
      name: '제품디자인기사',
      englishName: 'Engineer Product Design',
      icon: '📦',
      color: 'from-orange-500 to-amber-500',
      difficulty: 4,
      description: '제품 디자인 전문가',
      subjects: ['제품디자인론', '인간공학', '재료및가공', '디자인사'],
      hasStudyPage: true,
      href: '/category/design/product-design-engineer',
    },
    {
      id: 'product-design-technician',
      name: '제품디자인산업기사',
      englishName: 'Industrial Engineer Product Design',
      icon: '📦',
      color: 'from-amber-400 to-orange-400',
      difficulty: 3,
      description: '제품 디자인 기술자',
      subjects: ['제품디자인론', '인간공학', '재료및가공', '디자인사'],
      hasStudyPage: true,
      href: '/category/design/product-design-technician',
    },
    {
      id: 'colorist-engineer',
      name: '컬러리스트기사',
      englishName: 'Engineer Colorist',
      icon: '🌈',
      color: 'from-violet-500 to-purple-500',
      difficulty: 4,
      description: '색채 기획 및 관리 전문가',
      subjects: ['색채심리', '색채디자인', '색채관리', '색채지각론'],
      hasStudyPage: true,
      href: '/category/design/colorist-engineer',
    },
    {
      id: 'colorist-technician',
      name: '컬러리스트산업기사',
      englishName: 'Industrial Engineer Colorist',
      icon: '🎨',
      color: 'from-purple-400 to-violet-400',
      difficulty: 3,
      description: '색채 기획 및 관리 기술자',
      subjects: ['색채심리', '색채디자인', '색채관리', '색채지각론'],
      hasStudyPage: true,
      href: '/category/design/colorist-technician',
    },
    {
      id: 'gtq',
      name: 'GTQ(그래픽기술자격)',
      englishName: 'Graphic Technology Qualification',
      icon: '🖼️',
      color: 'from-sky-500 to-blue-500',
      difficulty: 2,
      description: '포토샵 활용 능력 자격',
      subjects: ['포토샵 기능', '이미지 편집', '그래픽 제작'],
      hasStudyPage: true,
      href: '/category/design/gtq',
    },
    {
      id: 'gtqi',
      name: 'GTQi(일러스트)',
      englishName: 'GTQ Illustrator',
      icon: '✏️',
      color: 'from-teal-500 to-emerald-500',
      difficulty: 2,
      description: '일러스트레이터 활용 능력 자격',
      subjects: ['일러스트레이터 기능', '벡터 그래픽', '아트워크 제작'],
      hasStudyPage: true,
      href: '/category/design/gtqi',
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
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">디자인·문화</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🎨</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">디자인·문화 분야</h1>
              <p className="text-pink-100 mt-1">Design & Culture</p>
              <p className="text-pink-100 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
            <h3 className="font-bold text-pink-800 mb-2">💡 디자인·문화 분야 자격증 안내</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• 기사/산업기사: 한국산업인력공단 주관, 연 3회 정기시험</li>
              <li>• 기능사: 한국산업인력공단 주관, 상시시험 가능</li>
              <li>• GTQ/GTQi: 한국생산성본부 주관, 연 12회 정기시험</li>
              <li>• 디자인 분야 취업 시 포트폴리오와 함께 활용도 높음</li>
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
