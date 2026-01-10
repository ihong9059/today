import Link from 'next/link';

export default function MentalHealthNursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">정신건강간호사</h1>
          <p className="text-gray-600 text-lg">
            정신건강 전문가 - 정신건강간호사 자격증 준비
          </p>
        </div>

        {/* 자격증 정보 카드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">자격증 정보</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-semibold text-purple-600 w-24">응시자격:</span>
                <span className="text-gray-700">간호사 면허 + 정신건강간호 전문과정 이수</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-purple-600 w-24">시험과목:</span>
                <span className="text-gray-700">정신간호학, 정신건강이론, 정신약리학, 치료적의사소통, 실기</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-purple-600 w-24">난이도:</span>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">(4/5)</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-purple-600 w-24">합격률:</span>
                <span className="text-gray-700">약 35%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">시험 안내</h2>
            <p className="mb-4">
              정신건강간호사는 정신질환자와 정신건강 문제를 가진 대상자에게 전문적인 간호를 제공하는 전문가입니다.
            </p>
            <Link
              href="/자격시험/medical/mental-health-nurse/exam"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              시험 정보 상세보기
            </Link>
          </div>
        </div>

        {/* 학습 과목 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 과목</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/자격시험/medical/mental-health-nurse/study/psychiatric-nursing"
              className="block p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border-2 border-purple-200 hover:border-purple-400"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-2">정신간호학</h3>
              <p className="text-gray-600 text-sm">정신질환 간호, 위기개입, 간호과정</p>
            </Link>

            <Link
              href="/자격시험/medical/mental-health-nurse/study/mental-health-theory"
              className="block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow border-2 border-blue-200 hover:border-blue-400"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">정신건강이론</h3>
              <p className="text-gray-600 text-sm">정신건강 개념, 발달이론, 스트레스</p>
            </Link>

            <Link
              href="/자격시험/medical/mental-health-nurse/study/psychopharmacology"
              className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow border-2 border-green-200 hover:border-green-400"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">정신약리학</h3>
              <p className="text-gray-600 text-sm">향정신성 약물, 부작용 관리</p>
            </Link>

            <Link
              href="/자격시험/medical/mental-health-nurse/study/therapeutic-communication"
              className="block p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg hover:shadow-md transition-shadow border-2 border-orange-200 hover:border-orange-400"
            >
              <h3 className="text-xl font-bold text-orange-700 mb-2">치료적의사소통</h3>
              <p className="text-gray-600 text-sm">의사소통 기법, 치료적 관계 형성</p>
            </Link>

            <Link
              href="/자격시험/medical/mental-health-nurse/study/practical"
              className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg hover:shadow-md transition-shadow border-2 border-pink-200 hover:border-pink-400"
            >
              <h3 className="text-xl font-bold text-pink-700 mb-2">실기</h3>
              <p className="text-gray-600 text-sm">정신간호 실무 및 사례 분석</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
