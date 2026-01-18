"use client";

import Link from "next/link";

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/crane-operator" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기중기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 정보</h1>
          <p className="text-xl text-blue-200">기중기운전기능사 취득 절차 및 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 취득 절차 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">취득 절차</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "원서접수", desc: "Q-Net 접수" },
              { step: 2, title: "필기시험", desc: "CBT 60문항" },
              { step: 3, title: "실기시험", desc: "작업형 7분" },
              { step: 4, title: "자격증발급", desc: "합격 후 발급" },
            ].map((item) => (
              <div key={item.step} className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{item.step}</div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 응시자격 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시자격</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-700 mb-3">필기시험</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span>응시자격 제한 없음</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span>연령 제한 없음</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span>학력 제한 없음</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span>경력 제한 없음</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700 mb-3">실기시험</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>필기시험 합격자</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>필기 합격 후 2년 이내</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>만 18세 이상 권장</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>건강 상태 양호</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 필기시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">필기시험</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-3">시험 개요</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b"><td className="py-2 text-gray-600">문항수</td><td className="py-2 font-medium">60문항</td></tr>
                  <tr className="border-b"><td className="py-2 text-gray-600">시험시간</td><td className="py-2 font-medium">60분</td></tr>
                  <tr className="border-b"><td className="py-2 text-gray-600">합격기준</td><td className="py-2 font-medium">60점 (36문항)</td></tr>
                  <tr><td className="py-2 text-gray-600">출제형식</td><td className="py-2 font-medium">CBT 4지선다</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-3">출제과목</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">40%</span>기중기조종</li>
                <li className="flex items-center gap-2"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">30%</span>건설기계일반</li>
                <li className="flex items-center gap-2"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">20%</span>안전관리</li>
                <li className="flex items-center gap-2"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">10%</span>관련법규</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 실기시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">실기시험 (작업형)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-700 mb-3">시험 내용</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>인양물 인양작업</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>선회/이동 작업</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>정위치 하역작업</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>신호수 협력작업</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700 mb-3">합격 기준</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>100점 만점 중 60점 이상</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>시험시간: 7분 이내</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>안전수칙 준수 필수</li>
                <li className="flex items-center gap-2"><span className="text-green-600">•</span>즉시실격 항목 주의</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 실기시험 과제 상세 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">실기시험 과제 상세</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5">
              <h3 className="font-bold text-blue-700 mb-3">1. 인양작업</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• 후크 결속 확인</li>
                <li>• 권상(바닥떼기)</li>
                <li>• 수평 확인</li>
                <li>• 안전높이 유지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5">
              <h3 className="font-bold text-indigo-700 mb-3">2. 이동/선회</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• 선회 속도 조절</li>
                <li>• 흔들림 방지</li>
                <li>• 경로 유지</li>
                <li>• 장애물 회피</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5">
              <h3 className="font-bold text-violet-700 mb-3">3. 정위치</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• 위치 미세조정</li>
                <li>• 안전 하강</li>
                <li>• 정확도 평가</li>
                <li>• 후크 이탈</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 실격/감점 */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-8 mb-8 border border-red-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">실격 및 감점 기준</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-700 mb-3">즉시 실격 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">✗</span>인양물 낙하</li>
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">✗</span>기중기 전도</li>
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">✗</span>구조물 충돌</li>
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">✗</span>시간 초과 (7분)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-700 mb-3">주요 감점 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-orange-600">-10</span>인양물 흔들림</li>
                <li className="flex items-center gap-2"><span className="text-orange-600">-10</span>정위치 오차</li>
                <li className="flex items-center gap-2"><span className="text-orange-600">-5</span>급작스런 조작</li>
                <li className="flex items-center gap-2"><span className="text-orange-600">-5</span>안전확인 미흡</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기중기 종류 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 장비 (기중기)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">이동식 크레인</h3>
              <p className="text-sm text-gray-600">시험장 주로 사용, 트럭탑재형</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
              <h3 className="font-bold text-indigo-700 mb-2">정격하중</h3>
              <p className="text-sm text-gray-600">3톤 이상</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
              <h3 className="font-bold text-violet-700 mb-2">주요장치</h3>
              <p className="text-sm text-gray-600">아웃트리거, OLP 장착</p>
            </div>
          </div>
        </div>

        {/* 자격증 활용 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">자격증 취득 후 활용</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-3">취업 분야</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-blue-600">•</span>건설현장 (철골, 콘크리트)</li>
                <li className="flex items-center gap-2"><span className="text-blue-600">•</span>조선소, 제철소</li>
                <li className="flex items-center gap-2"><span className="text-blue-600">•</span>항만, 물류센터</li>
                <li className="flex items-center gap-2"><span className="text-blue-600">•</span>제조업체, 플랜트</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-indigo-700 mb-3">관련 자격증</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-indigo-600">•</span>타워크레인운전기능사</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600">•</span>굴삭기운전기능사</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600">•</span>지게차운전기능사</li>
                <li className="flex items-center gap-2"><span className="text-indigo-600">•</span>로더운전기능사</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 응시 비용 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시 비용</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">필기시험</p>
              <p className="text-2xl font-bold text-blue-700">14,500원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">실기시험</p>
              <p className="text-2xl font-bold text-indigo-700">37,900원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">자격증 발급</p>
              <p className="text-2xl font-bold text-violet-700">6,800원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">총 비용</p>
              <p className="text-2xl font-bold text-green-700">59,200원</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 실기 연습비용(학원) 별도</p>
        </div>
      </div>
    </div>
  );
}
