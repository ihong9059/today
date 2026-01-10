'use client';

import Link from 'next/link';

const certifications = [
    { id: 'information-processor', name: '정보처리기사', emoji: '🖥️', desc: '소프트웨어 개발 및 관리', hasPage: true },
    { id: 'information-security', name: '정보보안기사', emoji: '🔐', desc: '정보시스템 보안', hasPage: true },
    { id: 'network-admin', name: '네트워크관리사', emoji: '🌐', desc: '네트워크 구축 및 관리', hasPage: true },
    { id: 'computer-organization', name: '전자계산기조직응용기사', emoji: '⚙️', desc: '컴퓨터시스템 응용', hasPage: true },
    { id: 'computer-system-pro', name: '컴퓨터시스템응용기술사', emoji: '🏆', desc: '최고급 전문가', hasPage: true },
    { id: 'information-management-pro', name: '정보관리기술사', emoji: '📊', desc: '최고급 전문가', hasPage: true }
];

export default function ITCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">IT·정보통신</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">💻</span>
          <h1 className="text-4xl font-bold mb-4">IT·정보통신</h1>
          <p className="text-xl text-blue-100">정보처리, 보안, 네트워크 분야 자격증</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.hasPage ? `/category/it/${cert.id}` : '#'}
              className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition ${!cert.hasPage && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{cert.emoji}</span>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{cert.name}</h2>
                  <p className="text-sm text-gray-500">{cert.desc}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-blue-600 text-sm font-medium">{cert.hasPage ? '학습하기 →' : '준비중'}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
