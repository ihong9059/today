'use client';

import Link from 'next/link';

export default function HealthEducator2ExamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/자격시험/medical/health-educator-2"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← 보건교육사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-blue-600">시험 정보</h1>
        </div>

        <div className="space-y-6">
          {/* 시험 개요 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">시험 개요</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">시행기관</h3>
                <p className="text-gray-700">보건복지부 (한국보건의료인국가시험원)</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-2">시험 횟수</h3>
                <p className="text-gray-700">연 1회</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold mb-2">합격 기준</h3>
                <p className="text-gray-700">과목당 40점 이상, 전 과목 평균 60점 이상</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold mb-2">평균 합격률</h3>
                <p className="text-gray-700">약 40%</p>
              </div>
            </div>
          </div>

          {/* 응시자격 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">응시자격</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-900">1. 학력 요건</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>보건학, 간호학, 영양학 등 관련학과 전문학사 이상</li>
                  <li>보건교육 관련 교과목 이수 필수</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-900">2. 경력 요건</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>보건교육사 3급 취득 후 보건교육 실무경력 2년 이상</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 시험과목 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">시험과목</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">과목명</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">문항수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">시험시간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">보건교육학개론</td>
                    <td className="border border-gray-300 px-4 py-2">25문항</td>
                    <td className="border border-gray-300 px-4 py-2" rowSpan={4}>150분</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">보건의사소통</td>
                    <td className="border border-gray-300 px-4 py-2">25문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">건강행동이론</td>
                    <td className="border border-gray-300 px-4 py-2">25문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">지역사회보건</td>
                    <td className="border border-gray-300 px-4 py-2">25문항</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">실기시험</td>
                    <td className="border border-gray-300 px-4 py-2">프로그램 기획 및 평가</td>
                    <td className="border border-gray-300 px-4 py-2">60분</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 시험 일정 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">시험 일정 (예정)</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">원서접수</span>
                <span className="text-gray-700">매년 1월 중</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">시험일</span>
                <span className="text-gray-700">매년 3월 중</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">합격자 발표</span>
                <span className="text-gray-700">매년 4월 중</span>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-sm text-yellow-800">
                정확한 일정은 한국보건의료인국가시험원 홈페이지에서 확인하시기 바랍니다.
              </p>
            </div>
          </div>

          {/* 학습 가이드 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4">학습 시작하기</h2>
            <p className="mb-4">
              각 과목별 핵심 내용과 학습 포인트를 확인하세요.
            </p>
            <Link
              href="/자격시험/medical/health-educator-2/study/health-education-intro"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              학습 자료 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
