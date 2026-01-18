'use client';

import Link from 'next/link';

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design" className="text-gray-600 hover:text-pink-600">디자인·문화</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design/gtqi" className="text-gray-600 hover:text-pink-600">GTQi(일러스트)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 GTQi(일러스트) 시험 정보</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">시행기관</h2>
              <p className="text-gray-600">한국생산성본부</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">시험 일정</h2>
              <p className="text-gray-600">
                정기시험: 연 4회 (3월, 5월, 8월, 11월경)<br/>
                상시시험: 일부 자격증 해당<br/>
                <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                  Q-Net에서 정확한 일정 확인 →
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">응시 자격</h2>
              <p className="text-gray-600">해당 자격증 시행처에서 확인하세요.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/category/design/gtqi"
              className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              ← 학습하러 가기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
