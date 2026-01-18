'use client';

import Link from 'next/link';

export default function WelfareCategoryPage() {
  const certifications = [
    {
      id: 'social-worker-2',
      name: '사회복지사 2급',
      icon: '💝',
      description: '학점이수를 통해 취득하는 사회복지 분야 국가자격증',
      category: '국가자격증(학점이수)',
      color: 'from-pink-500 to-rose-500',
      features: ['14과목 이수', '160시간 현장실습', '학위취득 필요']
    },
    {
      id: 'youth-counselor-2',
      name: '청소년상담사 2급',
      icon: '💚',
      description: '청소년 상담 및 지도 전문가 국가자격증',
      category: '국가자격증(시험)',
      color: 'from-green-500 to-emerald-500',
      features: ['필기시험 5과목', '면접시험', '경력요건']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <span className="text-white">사회복지·상담</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">💝 사회복지·상담 분야</h1>
          <p className="text-xl text-pink-100">사회복지사, 상담사 자격증 가이드</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={`/category/welfare/${cert.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-pink-300 transition-all group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cert.color} rounded-xl text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {cert.icon}
              </div>
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium mb-2">{cert.category}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h2>
              <p className="text-gray-600 mb-4">{cert.description}</p>
              <div className="flex flex-wrap gap-2">
                {cert.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{feature}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
