'use client';

import Link from 'next/link';

export default function Paramedic2ExamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/category/medical/paramedic-2"
            className="text-red-600 hover:text-red-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-red-600">시험 정보</h1>
        </div>

        <div className="space-y-6">
          {/* 시험 개요 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">시험 개요</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold mb-2">시행기관</h3>
                <p className="text-gray-700">보건복지부 (한국보건의료인국가시험원)</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold mb-2">시험 횟수</h3>
                <p className="text-gray-700">연 1회</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-semibold mb-2">합격 기준</h3>
                <p className="text-gray-700">과목당 40점 이상, 전 과목 평균 60점 이상</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold mb-2">평균 합격률</h3>
                <p className="text-gray-700">약 55%</p>
              </div>
            </div>
          </div>

          {/* 응시자격 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">응시자격</h2>
            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-red-900">1. 학력 요건</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>고등학교 졸업자 또는 이와 동등 이상의 학력 소지자</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-900">2. 양성과정 이수</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>보건복지부장관이 지정한 응급구조사 양성기관에서 교육과정 이수</li>
                  <li>전문대학 응급구조학과 또는 관련 학과 졸업(예정)자</li>
                  <li>양성과정: 이론 및 실습 1,000시간 이상 이수</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800">
                응급구조사 1급은 4년제 대학 졸업이 필요하지만, 2급은 전문대학 졸업으로 응시 가능합니다.
              </p>
            </div>
          </div>

          {/* 시험과목 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">시험과목</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">과목명</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">문항수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2" rowSpan={5}>필기시험</td>
                    <td className="border border-gray-300 px-4 py-2">응급처치학</td>
                    <td className="border border-gray-300 px-4 py-2">30문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">심폐소생술 및 AED 사용법</td>
                    <td className="border border-gray-300 px-4 py-2">20문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">환자평가</td>
                    <td className="border border-gray-300 px-4 py-2">20문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">환자 이송</td>
                    <td className="border border-gray-300 px-4 py-2">15문항</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">응급구조사 관련 법규 및 윤리</td>
                    <td className="border border-gray-300 px-4 py-2">15문항</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">실기시험</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}>
                      심폐소생술, 기도유지, 출혈조절, 부목고정, 환자이송 등
                    </td>
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
                <span className="text-gray-700">매년 12월 ~ 1월</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">필기시험</span>
                <span className="text-gray-700">매년 2월</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">필기 합격자 발표</span>
                <span className="text-gray-700">필기시험 후 약 2주</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">실기시험</span>
                <span className="text-gray-700">매년 3월</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">최종 합격자 발표</span>
                <span className="text-gray-700">매년 4월</span>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-sm text-yellow-800">
                정확한 일정은 한국보건의료인국가시험원 홈페이지에서 확인하시기 바랍니다.
              </p>
            </div>
          </div>

          {/* 진로 및 활동 분야 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">진로 및 활동 분야</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-red-900">응급의료기관</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>병원 응급실</li>
                  <li>응급의료센터</li>
                  <li>권역외상센터</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-900">구급 활동</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>119 구급대</li>
                  <li>민간 구급차</li>
                  <li>산업체 의무실</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-900">공공기관</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>소방공무원</li>
                  <li>해양경찰</li>
                  <li>국립공원관리공단</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-yellow-900">기타</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>응급처치 교육기관</li>
                  <li>의료기기 업체</li>
                  <li>산업안전보건 관련 기업</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 학습 가이드 */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4">학습 시작하기</h2>
            <p className="mb-4">
              각 과목별 핵심 내용과 학습 포인트를 확인하세요.
            </p>
            <Link
              href="/category/medical/paramedic-2/study/first-aid"
              className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              학습 자료 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
