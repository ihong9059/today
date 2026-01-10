'use client';

import Link from 'next/link';

const subjects = [
            {
              id: 'financial-accounting',
              name: '재무회계',
              topics: 2,
            },
            {
              id: 'cost-accounting',
              name: '원가관리회계',
              topics: 1,
            },
];

export default function CpaMainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-emerald-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">공인회계사(CPA)</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">공인회계사(CPA)</h1>
          <p className="text-gray-600">과목을 선택하여 학습을 시작하세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/accounting/cpa/study/${subject.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1"
            >
              <h3 className="font-bold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.topics}개 토픽</p>
              <span className="inline-flex items-center text-sm text-emerald-600 font-medium mt-2">
                학습하기 →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/category/accounting/cpa/exam`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition"
          >
            📋 시험정보 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
