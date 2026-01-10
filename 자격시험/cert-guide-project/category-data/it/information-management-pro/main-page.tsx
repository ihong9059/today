'use client';

import Link from 'next/link';

const subjects = [
    { id: 'information-strategy', name: '정보전략계획', emoji: '📖', desc: '정보전략계획 학습' },
    { id: 'project-management', name: '프로젝트관리', emoji: '📖', desc: '프로젝트관리 학습' },
    { id: 'practical', name: '면접', emoji: '📖', desc: '면접 학습' }
];

export default function InformationmanagementproMainPage() {
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
            <Link href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">정보관리기술사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">📊</span>
          <h1 className="text-4xl font-bold mb-4">정보관리기술사</h1>
          <p className="text-xl text-blue-100">최고급 전문가</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/category/it/information-management-pro/exam" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📋</span>
              <div>
                <h2 className="font-bold text-lg text-gray-800">시험 정보</h2>
                <p className="text-sm text-gray-500">시험 일정, 응시자격, 합격기준</p>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 과목별 학습</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/it/information-management-pro/study/${subject.id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{subject.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.desc}</p>
                </div>
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
