import Link from 'next/link';

export default function HealthEducator2MainPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">보건교육사 2급</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">자격증 개요</h2>
          <p className="text-gray-700 mb-4">
            보건교육사 2급은 국민의 건강증진과 질병예방을 위한 보건교육 전문인력 자격증입니다.
            지역사회 및 직장, 학교 등에서 보건교육 프로그램을 기획, 실행, 평가하는 전문가로 활동합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">응시자격</h3>
              <p className="text-gray-600">관련학과 졸업자 또는 3급 취득 후 경력 2년</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">난이도</h3>
              <p className="text-gray-600">3/5 (중간)</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">합격률</h3>
              <p className="text-gray-600">약 40%</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">시험과목</h3>
              <p className="text-gray-600">보건교육학개론, 보건의사소통, 건강행동이론, 지역사회보건, 실기</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/자격시험/medical/health-educator-2/exam"
            className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">시험 정보</h3>
            <p className="text-blue-100">시험일정, 응시자격, 합격기준 등 상세 정보</p>
          </Link>

          <Link
            href="/자격시험/medical/health-educator-2/study/health-education-intro"
            className="block bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">학습 자료</h3>
            <p className="text-green-100">과목별 핵심 내용 및 학습 가이드</p>
          </Link>
        </div>

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">주요 활동 분야</h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>보건소 및 공공보건기관</li>
            <li>병원 및 의료기관 건강증진센터</li>
            <li>학교 보건교육</li>
            <li>기업 및 산업체 보건관리</li>
            <li>건강증진사업 기획 및 평가</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
