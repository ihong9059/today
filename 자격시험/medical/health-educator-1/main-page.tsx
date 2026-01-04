import Link from 'next/link';

export default function HealthEducator1Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            보건교육사 1급
          </h1>
          <p className="text-xl text-gray-600">
            전문 보건교육 전문가 양성 과정
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-500">
            <div className="text-emerald-600 font-semibold mb-2">응시자격</div>
            <div className="text-gray-900 font-bold">2급 + 경력 3년</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-teal-500">
            <div className="text-teal-600 font-semibold mb-2">시험과목</div>
            <div className="text-gray-900 font-bold">5과목</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-500">
            <div className="text-cyan-600 font-semibold mb-2">난이도</div>
            <div className="text-gray-900 font-bold">★★★★☆</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="text-blue-600 font-semibold mb-2">합격률</div>
            <div className="text-gray-900 font-bold">약 30%</div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Exam Info */}
          <Link
            href="/자격시험/medical/health-educator-1/exam"
            className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-emerald-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              시험 정보
            </h2>
            <p className="text-gray-600 mb-4">
              보건교육사 1급 시험 일정, 응시자격, 시험과목 등 상세 정보를 확인하세요.
            </p>
            <div className="text-emerald-600 font-semibold">자세히 보기 →</div>
          </Link>

          {/* Study Materials */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              학습 자료
            </h2>
            <p className="text-gray-600 mb-4">
              과목별 핵심 내용과 AI 기반 학습 도구를 활용하세요.
            </p>
          </div>
        </div>

        {/* Study Subjects */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            과목별 학습
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/자격시험/medical/health-educator-1/study/health-education-theory"
              className="block p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                보건교육학
              </h3>
              <p className="text-sm text-gray-600">
                보건교육의 이론과 실제
              </p>
            </Link>

            <Link
              href="/자격시험/medical/health-educator-1/study/health-promotion"
              className="block p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                건강증진이론
              </h3>
              <p className="text-sm text-gray-600">
                행동변화 이론과 적용
              </p>
            </Link>

            <Link
              href="/자격시험/medical/health-educator-1/study/health-policy"
              className="block p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                보건정책
              </h3>
              <p className="text-sm text-gray-600">
                보건의료 정책과 관리
              </p>
            </Link>

            <Link
              href="/자격시험/medical/health-educator-1/study/program-planning"
              className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                보건프로그램개발
              </h3>
              <p className="text-sm text-gray-600">
                프로그램 기획 및 평가
              </p>
            </Link>

            <Link
              href="/자격시험/medical/health-educator-1/study/practical"
              className="block p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                실기
              </h3>
              <p className="text-sm text-gray-600">
                보건교육 실습 및 실무
              </p>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-emerald-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            보건교육사 1급이란?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            보건교육사 1급은 보건교육 분야의 최상위 전문 자격으로, 2급 자격 취득 후 3년 이상의 실무 경력을
            갖춘 전문가가 도전할 수 있습니다. 보건교육 프로그램의 기획, 실행, 평가를 총괄하며, 지역사회
            건강증진 사업을 주도하는 리더 역할을 수행합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
