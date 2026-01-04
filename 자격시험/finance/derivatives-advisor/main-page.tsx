'use client';

import Link from 'next/link';

const subjects = [
            {
              id: 'derivatives-basic',
              name: '파생상품 기초',
              topics: 2,
            },
];

export default function DerivativesadvisorMainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">파생상품투자권유자문인력</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">파생상품투자권유자문인력</h1>
          <p className="text-gray-600">과목을 선택하여 학습을 시작하세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/finance/derivatives-advisor/study/${subject.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1"
            >
              <h3 className="font-bold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.topics}개 토픽</p>
              <span className="inline-flex items-center text-sm text-teal-600 font-medium mt-2">
                학습하기 →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/category/finance/derivatives-advisor/exam`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition"
          >
            📋 시험정보 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
