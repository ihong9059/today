'use client';

import Link from 'next/link';

export default function AppraiserExamPage() {
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
            <Link href="/category/legal/appraiser" className="text-gray-600 hover:text-violet-600">감정평가사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 감정평가사 시험 정보</h1>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📅 시험 일정</h3>
            <p className="text-gray-600">1차 4월, 2차 7월</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📝 시험 과목</h3>
            <p className="text-gray-600">감정평가관계법규, 회계학, 경제학, 민법, 부동산학 등</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📊 합격률</h3>
            <p className="text-gray-600">약 23%</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📄 시험 형식</h3>
            <p className="text-gray-600">1차 객관식, 2차 주관식</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">🎯 응시 자격</h3>
            <p className="text-gray-600">제한 없음</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/category/legal/appraiser" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
