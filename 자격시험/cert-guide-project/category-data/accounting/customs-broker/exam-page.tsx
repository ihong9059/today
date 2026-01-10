'use client';

import Link from 'next/link';

export default function CustomsbrokerExamPage() {
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
            <Link href="/category/accounting/customs-broker" className="text-gray-600 hover:text-emerald-600">관세사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">관세사 시험정보</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">시험 개요</h2>
          <div className="space-y-3 text-gray-600">
            <p>• 시험 정보는 해당 주관기관 홈페이지에서 확인하세요</p>
            <p>• 시험일정 및 접수는 주관기관에서 안내합니다</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/category/accounting/customs-broker"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            ← 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
