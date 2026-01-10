'use client';

import Link from 'next/link';

export default function CategoryPage() {
  const certifications = [
    {
      id: 'plant-protection-engineer',
      name: '식물보호기사',
      desc: '병해충 방제 전문가',
      icon: '🌿',
      href: '/category/agriculture/plant-protection-engineer'
    },
    {
      id: 'plant-protection-technician',
      name: '식물보호산업기사',
      desc: '병해충 방제 기술인력',
      icon: '🌱',
      href: '/category/agriculture/plant-protection-technician'
    },
    {
      id: 'organic-farming-engineer',
      name: '유기농업기사',
      desc: '친환경농업 전문가',
      icon: '🥬',
      href: '/category/agriculture/organic-farming-engineer'
    },
    {
      id: 'organic-farming-technician',
      name: '유기농업산업기사',
      desc: '친환경농업 기술인력',
      icon: '🥗',
      href: '/category/agriculture/organic-farming-technician'
    },
    {
      id: 'livestock-engineer',
      name: '축산기사',
      desc: '가축 사육 및 관리 전문가',
      icon: '🐄',
      href: '/category/agriculture/livestock-engineer'
    },
    {
      id: 'livestock-technician',
      name: '축산산업기사',
      desc: '가축 사육 및 관리 기술인력',
      icon: '🐖',
      href: '/category/agriculture/livestock-technician'
    },
    {
      id: 'agri-machine-engineer',
      name: '농업기계기사',
      desc: '농기계 정비 및 관리 전문가',
      icon: '🚜',
      href: '/category/agriculture/agri-machine-engineer'
    },
    {
      id: 'agri-machine-technician',
      name: '농업기계산업기사',
      desc: '농기계 정비 및 관리 기술인력',
      icon: '🔧',
      href: '/category/agriculture/agri-machine-technician'
    },
    {
      id: 'seed-engineer',
      name: '종자기사',
      desc: '종자 생산 및 관리 전문가',
      icon: '🌾',
      href: '/category/agriculture/seed-engineer'
    },
    {
      id: 'seed-technician',
      name: '종자산업기사',
      desc: '종자 생산 및 관리 기술인력',
      icon: '🌰',
      href: '/category/agriculture/seed-technician'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-lime-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-lime-600 font-medium">농림·축산</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🌾</span>
          <h1 className="text-3xl font-bold mb-2">농림·축산 분야</h1>
          <p className="text-lime-100">농업, 축산, 종자 분야 자격시험 학습 가이드</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.href}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-lime-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{cert.icon}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.desc}</p>
                </div>
              </div>
              <div className="text-right text-lime-500 text-sm font-medium">
                학습하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
