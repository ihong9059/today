import Link from 'next/link';

export default function DrivingCategoryPage() {
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
      id: 'driver-license-1-normal',
      name: '1종 보통면허',
      englishName: 'Class 1 Regular License',
      icon: '🚗',
      color: 'from-slate-600 to-gray-700',
      difficulty: 2,
      description: '승용차, 승합차(15인 이하), 화물차(12톤 미만)',
      subjects: ['교통법규', '안전운전', '자동차구조', '도로주행'],
      hasStudyPage: true,
      href: '/category/driving/driver-license-1-normal',
    },
    {
      id: 'driver-license-2-normal',
      name: '2종 보통면허',
      englishName: 'Class 2 Regular License',
      icon: '🚙',
      color: 'from-blue-500 to-indigo-500',
      difficulty: 2,
      description: '승용차, 승합차(10인 이하), 화물차(4톤 이하)',
      subjects: ['교통법규', '안전운전', '자동차구조', '도로주행'],
      hasStudyPage: true,
      href: '/category/driving/driver-license-2-normal',
    },
    {
      id: 'driver-license-1-large',
      name: '1종 대형면허',
      englishName: 'Class 1 Large License',
      icon: '🚛',
      color: 'from-amber-500 to-orange-500',
      difficulty: 3,
      description: '승합차(16인 이상), 화물차(12톤 이상), 건설기계',
      subjects: ['교통법규', '안전운전', '화물적재', '대형차량 조작'],
      hasStudyPage: true,
      href: '/category/driving/driver-license-1-large',
    },
    {
      id: 'driver-license-1-special',
      name: '1종 특수면허',
      englishName: 'Class 1 Special License',
      icon: '🚜',
      color: 'from-red-500 to-rose-500',
      difficulty: 3,
      description: '트레일러, 레커, 특수작업차량',
      subjects: ['교통법규', '특수차량구조', '견인운전', '안전운전'],
      hasStudyPage: true,
      href: '/category/driving/driver-license-1-special',
    },
    {
      id: 'excavator-license',
      name: '굴삭기운전기능사',
      englishName: 'Excavator Operator',
      icon: '🏗️',
      color: 'from-yellow-500 to-amber-500',
      difficulty: 3,
      description: '건설기계 굴삭기 조종자격',
      subjects: ['건설기계기관', '굴삭기조종', '유압일반', '안전관리'],
      hasStudyPage: true,
      href: '/category/driving/excavator-license',
    },
    {
      id: 'forklift-license',
      name: '지게차운전기능사',
      englishName: 'Forklift Operator',
      icon: '📦',
      color: 'from-emerald-500 to-teal-500',
      difficulty: 2,
      description: '물류 지게차 조종자격',
      subjects: ['지게차구조', '화물적재', '안전운전', '유압장치'],
      hasStudyPage: true,
      href: '/category/driving/forklift-license',
    },
    {
      id: 'crane-license',
      name: '기중기운전기능사',
      englishName: 'Crane Operator',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      difficulty: 3,
      description: '건설기계 기중기(크레인) 조종자격',
      subjects: ['기중기구조', '와이어로프', '신호방법', '안전관리'],
      hasStudyPage: true,
      href: '/category/driving/crane-license',
    },
    {
      id: 'boat-license',
      name: '소형선박조종사',
      englishName: 'Small Boat License',
      icon: '⛵',
      color: 'from-cyan-500 to-blue-500',
      difficulty: 2,
      description: '5톤 미만 소형선박 조종면허',
      subjects: ['항해술', '운용술', '법규', '기관'],
      hasStudyPage: true,
      href: '/category/driving/boat-license',
    },
    {
      id: 'yacht-license',
      name: '요트조종면허',
      englishName: 'Yacht License',
      icon: '🛥️',
      color: 'from-sky-500 to-cyan-500',
      difficulty: 2,
      description: '요트 및 모터보트 조종면허',
      subjects: ['수상안전', '항해술', '법규', '실기'],
      hasStudyPage: true,
      href: '/category/driving/yacht-license',
    },
    {
      id: 'pilot-license-private',
      name: '자가용조종사',
      englishName: 'Private Pilot License',
      icon: '✈️',
      color: 'from-violet-500 to-purple-500',
      difficulty: 4,
      description: '비사업용 항공기 조종자격',
      subjects: ['항공법규', '항공기상', '항공역학', '비행이론', '항법'],
      hasStudyPage: true,
      href: '/category/driving/pilot-license-private',
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
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">운전·조종</span>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🚗</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">운전·조종 분야</h1>
              <p className="text-slate-200 mt-1">Driving & Operating License</p>
              <p className="text-slate-200 mt-2">{certifications.length}개 자격증</p>
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
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">💡 운전·조종 분야 자격증 안내</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 자동차운전면허: 도로교통공단 주관, 학과+기능+도로주행 시험</li>
              <li>• 건설기계면허: 한국산업인력공단 주관, 필기+실기 시험</li>
              <li>• 선박조종면허: 해양수산부 주관, 필기+실기 시험</li>
              <li>• 항공조종면허: 국토교통부 주관, 학과+비행실기 시험</li>
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
