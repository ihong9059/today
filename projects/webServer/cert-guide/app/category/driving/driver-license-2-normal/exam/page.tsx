"use client";

import Link from "next/link";

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-2-normal" className="inline-flex items-center text-sky-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            2종 보통면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 정보</h1>
          <p className="text-xl text-sky-200">2종 보통면허 취득 절차 및 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 취득 절차 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">취득 절차</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "신체검사", desc: "병원/면허시험장" },
              { step: 2, title: "학과교육", desc: "1시간 (온라인 가능)" },
              { step: 3, title: "학과시험", desc: "40문항/60점 합격" },
              { step: 4, title: "기능시험", desc: "장내코스/70점 합격" },
              { step: 5, title: "도로주행", desc: "5km+/70점 합격" },
            ].map((item) => (
              <div key={item.step} className="bg-sky-50 rounded-xl p-4 text-center">
                <div className="bg-sky-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{item.step}</div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 학과시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학과시험 (필기)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sky-700 mb-3">시험 개요</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b"><td className="py-2 text-gray-600">문항수</td><td className="py-2 font-medium">40문항</td></tr>
                  <tr className="border-b"><td className="py-2 text-gray-600">시험시간</td><td className="py-2 font-medium">50분</td></tr>
                  <tr className="border-b"><td className="py-2 text-gray-600">합격기준</td><td className="py-2 font-medium">60점 (24문항)</td></tr>
                  <tr><td className="py-2 text-gray-600">출제형식</td><td className="py-2 font-medium">객관식 4지선다</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 mb-3">출제 범위</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-sky-600">•</span>도로교통법규 (60%)</li>
                <li className="flex items-center gap-2"><span className="text-sky-600">•</span>안전운전 요령 (30%)</li>
                <li className="flex items-center gap-2"><span className="text-sky-600">•</span>자동차 구조 (10%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기능시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">기능시험 (장내)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sky-700 mb-3">평가 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 굴절코스 통과</li>
                <li>• 곡선코스 통과</li>
                <li>• 직각코스 통과</li>
                <li>• 경사로 정지/출발</li>
                <li>• T자/평행주차</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 mb-3">합격 기준</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 100점 만점 중 70점 이상</li>
                <li>• 라인 밟음: -5점</li>
                <li>• 코스 이탈: -10점</li>
                <li>• 접촉/충돌: 즉시 실격</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 도로주행 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">도로주행시험</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sky-700 mb-3">시험 내용</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 5km 이상 실제 도로 주행</li>
                <li>• 차로변경, 좌우회전</li>
                <li>• 신호 준수, 보행자 보호</li>
                <li>• 교차로 통행</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 mb-3">주요 감점 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 신호위반: 즉시 실격</li>
                <li>• 중앙선 침범: 즉시 실격</li>
                <li>• 방향지시등 미사용: -10점</li>
                <li>• 안전거리 미확보: -5점</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2종 보통 특징 */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 mb-8 border border-sky-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">2종 보통면허 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sky-700 mb-3">운전 가능 차량</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 승용자동차</li>
                <li>• 승합자동차 (10인승 이하)</li>
                <li>• 화물자동차 (적재중량 4톤 이하)</li>
                <li>• 원동기장치자전거</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 mb-3">1종 보통과 차이점</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 승합차: 10인승 이하 (1종은 15인승)</li>
                <li>• 화물차: 4톤 이하 (1종은 12톤 미만)</li>
                <li>• 자동변속기(AT)만 가능한 한정면허 가능</li>
                <li>• 취득 난이도가 상대적으로 쉬움</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 응시 비용 */}
        <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시 비용</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">신체검사</p>
              <p className="text-2xl font-bold text-sky-700">6,000원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">학과시험</p>
              <p className="text-2xl font-bold text-sky-700">7,500원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">기능시험</p>
              <p className="text-2xl font-bold text-sky-700">18,500원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">도로주행</p>
              <p className="text-2xl font-bold text-sky-700">25,000원</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 면허증 발급비용 별도 (7,500원)</p>
        </div>
      </div>
    </div>
  );
}
