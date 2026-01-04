import Link from 'next/link';

export default function HealthEducator3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4">보건교육사 3급</h1>
          <p className="text-xl text-gray-600">건강증진과 보건교육 전문가</p>
        </div>

        {/* 자격증 개요 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">자격증 개요</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-green-800 mb-2">응시자격</h3>
              <p className="text-gray-700">학력 제한 없음 (누구나 응시 가능)</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-green-800 mb-2">난이도</h3>
              <div className="flex items-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 2 ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">2/5</span>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-green-800 mb-2">합격률</h3>
              <p className="text-gray-700">약 50%</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-green-800 mb-2">시험 주관</h3>
              <p className="text-gray-700">보건복지인력개발원</p>
            </div>
          </div>
        </div>

        {/* 시험과목 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">시험과목</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">보건교육기초</h3>
              <p className="text-gray-600 text-sm">보건교육의 기본 이론과 원리</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">공중보건학</h3>
              <p className="text-gray-600 text-sm">공중보건의 개념과 실제</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">건강심리학</h3>
              <p className="text-gray-600 text-sm">건강행동과 심리적 요인</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">실기</h3>
              <p className="text-gray-600 text-sm">보건교육 실무 능력 평가</p>
            </div>
          </div>
        </div>

        {/* 메뉴 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 시험정보 카드 */}
          <Link href="/자격시험/medical/health-educator-3/exam">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500">
              <div className="text-4xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">시험정보</h2>
              <p className="text-gray-600 mb-4">
                시험일정, 접수방법, 합격기준 등 상세 정보를 확인하세요.
              </p>
              <div className="text-green-600 font-semibold">자세히 보기 →</div>
            </div>
          </Link>

          {/* 학습하기 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">학습하기</h2>
            <p className="text-gray-600 mb-4">과목별 핵심 내용을 학습하세요.</p>
            <div className="space-y-2">
              <Link href="/자격시험/medical/health-educator-3/study/health-education-basics">
                <div className="bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-colors cursor-pointer">
                  <span className="font-semibold text-green-800">보건교육기초</span>
                </div>
              </Link>
              <Link href="/자격시험/medical/health-educator-3/study/public-health">
                <div className="bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-colors cursor-pointer">
                  <span className="font-semibold text-green-800">공중보건학</span>
                </div>
              </Link>
              <Link href="/자격시험/medical/health-educator-3/study/health-psychology">
                <div className="bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-colors cursor-pointer">
                  <span className="font-semibold text-green-800">건강심리학</span>
                </div>
              </Link>
              <Link href="/자격시험/medical/health-educator-3/study/practical">
                <div className="bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-colors cursor-pointer">
                  <span className="font-semibold text-green-800">실기</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 자격증 활용 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">자격증 활용</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">보건소</h3>
              <p className="text-gray-600 text-sm">지역사회 보건교육 담당</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">기업</h3>
              <p className="text-gray-600 text-sm">근로자 건강증진 프로그램 운영</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">학교</h3>
              <p className="text-gray-600 text-sm">학생 건강교육 지원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
