'use client';

import Link from 'next/link';

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/civil" className="text-gray-600 hover:text-slate-600">공무원</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/civil/police-officer" className="text-gray-600 hover:text-slate-600">경찰공무원(순경)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 경찰공무원(순경) 시험정보</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">시험 개요</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600 w-32">시행기관</td>
                <td className="py-2">경찰청</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600">시험명</td>
                <td className="py-2">경찰공무원(순경)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600">시험일정</td>
                <td className="py-2">연 1~2회 (기관별 상이)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">시험 과목</h2>
          <p className="text-gray-600 text-sm">상세 정보는 시행기관 공고를 확인하세요.</p>
        </div>
      </section>
    </div>
  );
}
