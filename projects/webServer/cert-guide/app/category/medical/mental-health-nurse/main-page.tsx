import Link from 'next/link';

export default function MentalHealthNursePage() {
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
            <span className="text-pink-600 font-medium">정신건강간호사</span>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-emerald-600 mb-4">정신건강간호사</h1>
            <p className="text-gray-600 text-lg">정신건강 전문간호사 자격증 준비</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">자격증 정보</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-semibold text-emerald-600 w-24">응시자격:</span>
                  <span className="text-gray-700">간호사 면허 + 정신건강 실무경력 또는 대학원 과정</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold text-emerald-600 w-24">시험과목:</span>
                  <span className="text-gray-700">정신간호학, 정신건강이론, 정신약리학, 치료적의사소통, 실기</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">시험 안내</h2>
              <p className="mb-4">정신건강간호사는 정신건강 분야의 전문 간호인력입니다.</p>
              <Link href="/category/medical/mental-health-nurse/exam" className="inline-block bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                시험 정보 상세보기
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 과목</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/category/medical/mental-health-nurse/study/psychiatric-nursing" className="block p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg hover:shadow-md transition-shadow border-2 border-emerald-200 hover:border-emerald-400">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">정신간호학</h3>
                <p className="text-gray-600 text-sm">정신질환 환자 간호</p>
              </Link>
              <Link href="/category/medical/mental-health-nurse/study/mental-health-theory" className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border-2 border-blue-200 hover:border-blue-400">
                <h3 className="text-xl font-bold text-blue-700 mb-2">정신건강이론</h3>
                <p className="text-gray-600 text-sm">정신건강의 이론적 기초</p>
              </Link>
              <Link href="/category/medical/mental-health-nurse/study/psychopharmacology" className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow border-2 border-green-200 hover:border-green-400">
                <h3 className="text-xl font-bold text-green-700 mb-2">정신약리학</h3>
                <p className="text-gray-600 text-sm">정신질환 약물치료</p>
              </Link>
              <Link href="/category/medical/mental-health-nurse/study/therapeutic-communication" className="block p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg hover:shadow-md transition-shadow border-2 border-orange-200 hover:border-orange-400">
                <h3 className="text-xl font-bold text-orange-700 mb-2">치료적의사소통</h3>
                <p className="text-gray-600 text-sm">환자와의 효과적 소통</p>
              </Link>
              <Link href="/category/medical/mental-health-nurse/study/practical" className="block p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg hover:shadow-md transition-shadow border-2 border-purple-200 hover:border-purple-400">
                <h3 className="text-xl font-bold text-purple-700 mb-2">실기</h3>
                <p className="text-gray-600 text-sm">실제 정신건강간호 수행</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
