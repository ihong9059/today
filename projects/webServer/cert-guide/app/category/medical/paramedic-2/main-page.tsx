import Link from 'next/link';

export default function Paramedic2Page() {
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
            <span className="text-pink-600 font-medium">응급구조사 2급</span>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">응급구조사 2급</h1>
            <p className="text-gray-600 text-lg">응급처치 기본 - 응급구조사 2급 자격증 준비</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">자격증 정보</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-semibold text-red-600 w-24">응시자격:</span>
                  <span className="text-gray-700">양성과정 이수자</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold text-red-600 w-24">시험과목:</span>
                  <span className="text-gray-700">응급처치학, 심폐소생술/AED, 환자평가, 이송, 실기</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold text-red-600 w-24">합격률:</span>
                  <span className="text-gray-700">약 60%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">시험 안내</h2>
              <p className="mb-4">응급구조사 2급은 기본 응급처치를 수행하는 전문가입니다.</p>
              <Link href="/category/medical/paramedic-2/exam" className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                시험 정보 상세보기
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 과목</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/category/medical/paramedic-2/study/first-aid" className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow border-2 border-red-200 hover:border-red-400">
                <h3 className="text-xl font-bold text-red-700 mb-2">응급처치학</h3>
                <p className="text-gray-600 text-sm">기본 응급처치 원리와 방법</p>
              </Link>
              <Link href="/category/medical/paramedic-2/study/cpr-aed" className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border-2 border-blue-200 hover:border-blue-400">
                <h3 className="text-xl font-bold text-blue-700 mb-2">심폐소생술/AED</h3>
                <p className="text-gray-600 text-sm">CPR 및 자동제세동기 사용법</p>
              </Link>
              <Link href="/category/medical/paramedic-2/study/patient-assessment" className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow border-2 border-green-200 hover:border-green-400">
                <h3 className="text-xl font-bold text-green-700 mb-2">환자평가</h3>
                <p className="text-gray-600 text-sm">환자 상태 평가 및 판단</p>
              </Link>
              <Link href="/category/medical/paramedic-2/study/transport" className="block p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg hover:shadow-md transition-shadow border-2 border-orange-200 hover:border-orange-400">
                <h3 className="text-xl font-bold text-orange-700 mb-2">이송</h3>
                <p className="text-gray-600 text-sm">환자 이송 방법 및 주의사항</p>
              </Link>
              <Link href="/category/medical/paramedic-2/study/practical" className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg hover:shadow-md transition-shadow border-2 border-pink-200 hover:border-pink-400">
                <h3 className="text-xl font-bold text-pink-700 mb-2">실기</h3>
                <p className="text-gray-600 text-sm">실제 응급처치 술기 평가</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
