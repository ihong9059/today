'use client';

import Link from 'next/link';

export default function CategoryPage() {
  const certifications = [
    {
      id: 'civil-service-5',
      name: '5급 공채(행정고시)',
      desc: '사무관급 고위공무원 선발',
      icon: '🏛️',
      href: '/category/civil/civil-service-5'
    },
    {
      id: 'civil-service-7',
      name: '7급 공채',
      desc: '주무관급 공무원 선발',
      icon: '📋',
      href: '/category/civil/civil-service-7'
    },
    {
      id: 'civil-service-9',
      name: '9급 공채',
      desc: '주사급 공무원 선발',
      icon: '📝',
      href: '/category/civil/civil-service-9'
    },
    {
      id: 'local-civil-7',
      name: '지방직 7급',
      desc: '광역/기초자치단체 7급 공무원',
      icon: '🏢',
      href: '/category/civil/local-civil-7'
    },
    {
      id: 'local-civil-9',
      name: '지방직 9급',
      desc: '광역/기초자치단체 9급 공무원',
      icon: '🏠',
      href: '/category/civil/local-civil-9'
    },
    {
      id: 'police-officer',
      name: '경찰공무원(순경)',
      desc: '순경 공채 선발',
      icon: '👮',
      href: '/category/civil/police-officer'
    },
    {
      id: 'firefighter',
      name: '소방공무원(소방사)',
      desc: '소방사 공채 선발',
      icon: '🚒',
      href: '/category/civil/firefighter'
    },
    {
      id: 'corrections-officer',
      name: '교정직(교도관)',
      desc: '교정시설 교도관 선발',
      icon: '🔒',
      href: '/category/civil/corrections-officer'
    },
    {
      id: 'military-civil',
      name: '군무원',
      desc: '국방부 소속 공무원',
      icon: '🎖️',
      href: '/category/civil/military-civil'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">공무원</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-500 to-gray-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🏛️</span>
          <h1 className="text-3xl font-bold mb-2">공무원 분야</h1>
          <p className="text-slate-100">공무원 시험 준비를 위한 학습 가이드</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.href}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-slate-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{cert.icon}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.desc}</p>
                </div>
              </div>
              <div className="text-right text-slate-500 text-sm font-medium">
                학습하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
