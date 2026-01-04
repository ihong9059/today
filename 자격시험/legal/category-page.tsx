'use client';

import Link from 'next/link';

const certifications = [
    {
      id: 'judicial-scrivener',
      name: '법무사',
      description: '법률사무 전문가',
      href: '/category/legal/judicial-scrivener'
    },
    {
      id: 'patent-attorney',
      name: '변리사',
      description: '특허·상표 등 지적재산권 전문가',
      href: '/category/legal/patent-attorney'
    },
    {
      id: 'labor-attorney',
      name: '공인노무사',
      description: '노동 관련 법률 전문가',
      href: '/category/legal/labor-attorney'
    },
    {
      id: 'appraiser',
      name: '감정평가사',
      description: '부동산 및 동산 가치평가 전문가',
      href: '/category/legal/appraiser'
    }
];

export default function LegalCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">법률</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">⚖️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">법률 분야 자격증</h1>
          <p className="text-gray-600">법률 분야 전문 자격증 시험 정보 및 학습 가이드</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <Link key={cert.id} href={cert.href}>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-white">⚖️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.description}</p>
                  </div>
                  <div className="text-violet-500">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
