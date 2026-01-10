'use client';

import Link from 'next/link';

const subjects = [
      { id: 'appraisal-law', name: '감정평가이론' }
];

export default function AppraiserMainPage() {
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
            <Link href="/category/legal" className="text-gray-600 hover:text-violet-600">법률</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">감정평가사</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl mb-4">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">감정평가사</h1>
          <p className="text-gray-600">부동산 및 동산 가치평가 전문가</p>
        </div>

        <div className="grid gap-4 mb-8">
          <Link href="/category/legal/appraiser/exam">
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border-l-4 border-violet-500">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-bold text-gray-800">시험 정보</h3>
                  <p className="text-sm text-gray-500">일정, 과목, 합격률 등</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
        <div className="grid gap-3">
          {subjects.map((subject) => (
            <Link key={subject.id} href={`/category/legal/appraiser/study/${subject.id}`}>
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition flex items-center justify-between">
                <span className="font-medium text-gray-700">{subject.name}</span>
                <span className="text-violet-500">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
