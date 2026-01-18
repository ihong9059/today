import Link from 'next/link';

export default function HealthEducator1Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">보건교육사 1급</span>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-pink-600 mb-4">보건교육사 1급</h1>
            <p className="text-gray-600 text-lg">보건교육 고급 전문가 (2급+경력 3년)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">자격증 정보</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-semibold text-pink-600 w-24">응시자격:</span>
                  <span className="text-gray-700">보건교육사 2급 + 경력 3년</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold text-pink-600 w-24">시험과목:</span>
                  <span className="text-gray-700">보건교육학, 건강증진이론, 보건정책, 프로그램개발, 실기</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">시험 안내</h2>
              <p className="mb-4">보건교육사 1급은 보건교육 분야의 최고급 전문가입니다.</p>
              <Link href="/category/medical/health-educator-1/exam" className="inline-block bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
                시험 정보 상세보기
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 과목</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/category/medical/health-educator-1/study/health-education-theory" className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg hover:shadow-md transition-shadow border-2 border-pink-200 hover:border-pink-400">
                <h3 className="text-xl font-bold text-pink-700 mb-2">보건교육학</h3>
                <p className="text-gray-600 text-sm">보건교육 이론과 실무</p>
              </Link>
              <Link href="/category/medical/health-educator-1/study/health-promotion" className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border-2 border-blue-200 hover:border-blue-400">
                <h3 className="text-xl font-bold text-blue-700 mb-2">건강증진이론</h3>
                <p className="text-gray-600 text-sm">건강증진 이론과 전략</p>
              </Link>
              <Link href="/category/medical/health-educator-1/study/health-policy" className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow border-2 border-green-200 hover:border-green-400">
                <h3 className="text-xl font-bold text-green-700 mb-2">보건정책</h3>
                <p className="text-gray-600 text-sm">보건정책 수립과 평가</p>
              </Link>
              <Link href="/category/medical/health-educator-1/study/program-planning" className="block p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg hover:shadow-md transition-shadow border-2 border-orange-200 hover:border-orange-400">
                <h3 className="text-xl font-bold text-orange-700 mb-2">프로그램개발</h3>
                <p className="text-gray-600 text-sm">보건교육 프로그램 기획</p>
              </Link>
              <Link href="/category/medical/health-educator-1/study/practical" className="block p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg hover:shadow-md transition-shadow border-2 border-purple-200 hover:border-purple-400">
                <h3 className="text-xl font-bold text-purple-700 mb-2">실기</h3>
                <p className="text-gray-600 text-sm">실제 보건교육 진행</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
