import Link from 'next/link';

export default function Paramedic2MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            응급구조사 2급
          </h1>
          <p className="text-xl text-gray-600">
            응급 상황 대응 전문 인력 양성 과정
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
            <div className="text-red-600 font-semibold mb-2">응시자격</div>
            <div className="text-gray-900 font-bold">고졸 + 양성과정</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
            <div className="text-orange-600 font-semibold mb-2">시험과목</div>
            <div className="text-gray-900 font-bold">5과목</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amber-500">
            <div className="text-amber-600 font-semibold mb-2">난이도</div>
            <div className="text-gray-900 font-bold">★★★☆☆</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
            <div className="text-yellow-600 font-semibold mb-2">합격률</div>
            <div className="text-gray-900 font-bold">약 55%</div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Exam Info */}
          <Link
            href="/자격시험/medical/paramedic-2/exam"
            className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-red-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              시험 정보
            </h2>
            <p className="text-gray-600 mb-4">
              응급구조사 2급 시험 일정, 응시자격, 시험과목 등 상세 정보를 확인하세요.
            </p>
            <div className="text-red-600 font-semibold">자세히 보기 →</div>
          </Link>

          {/* Study Materials */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
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
              href="/자격시험/medical/paramedic-2/study/first-aid"
              className="block p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                응급처치학
              </h3>
              <p className="text-sm text-gray-600">
                기본 응급처치 이론과 실제
              </p>
            </Link>

            <Link
              href="/자격시험/medical/paramedic-2/study/cpr-aed"
              className="block p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                심폐소생술/AED
              </h3>
              <p className="text-sm text-gray-600">
                CPR 및 자동제세동기 사용법
              </p>
            </Link>

            <Link
              href="/자격시험/medical/paramedic-2/study/patient-assessment"
              className="block p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                환자평가
              </h3>
              <p className="text-sm text-gray-600">
                환자 상태 평가 및 기록
              </p>
            </Link>

            <Link
              href="/자격시험/medical/paramedic-2/study/transport"
              className="block p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                이송
              </h3>
              <p className="text-sm text-gray-600">
                응급환자 이송 및 처리
              </p>
            </Link>

            <Link
              href="/자격시험/medical/paramedic-2/study/practical"
              className="block p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                실기
              </h3>
              <p className="text-sm text-gray-600">
                응급구조 실무 및 실습
              </p>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-red-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            응급구조사 2급이란?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            응급구조사 2급은 응급 상황에서 환자의 생명을 구하고 응급처치를 수행하는 전문 의료인입니다.
            고등학교 졸업 후 양성과정을 이수하면 응시할 수 있어 1급보다 진입장벽이 낮습니다.
            응급실, 구급차, 소방서 등에서 활동하며, 기본 응급처치, 심폐소생술, 환자 평가 및 이송 등의
            업무를 수행합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
