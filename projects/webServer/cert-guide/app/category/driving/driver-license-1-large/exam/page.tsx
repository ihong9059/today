"use client";

import Link from "next/link";

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="bg-gradient-to-r from-zinc-700 to-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-large" className="inline-flex items-center text-zinc-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 대형면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 정보</h1>
          <p className="text-xl text-zinc-300">1종 대형면허 취득 절차 및 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 취득 절차 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">취득 절차</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "신체검사", desc: "병원/면허시험장" },
              { step: 2, title: "학과교육", desc: "3시간 (대형차 특별)" },
              { step: 3, title: "학과시험", desc: "40문항/60점 합격" },
              { step: 4, title: "기능시험", desc: "대형차 코스/70점" },
              { step: 5, title: "도로주행", desc: "대형차/70점 합격" },
            ].map((item) => (
              <div key={item.step} className="bg-zinc-50 rounded-xl p-4 text-center">
                <div className="bg-zinc-700 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{item.step}</div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 응시자격 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시자격 (중요)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-amber-700 mb-3">필수 요건</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>만 19세 이상</li>
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>1종 보통면허 보유자</li>
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>신체검사 합격 (대형면허용)</li>
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>결격사유 없음</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-700 mb-3">교육 이수</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>학과교육: 3시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>기능교육: 10시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>도로주행교육: 6시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>전문학원 또는 시험장</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 학과시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학과시험 (필기)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">시험 개요</h3>
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
              <h3 className="font-bold text-zinc-700 mb-3">대형면허 특별 출제</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-zinc-600">•</span>대형차량 통행규정</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600">•</span>화물적재 규정</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600">•</span>에어브레이크 구조</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600">•</span>운행기록계 관련</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기능시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">기능시험 (장내 - 대형차)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">평가 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 굴절코스 (대형차 전용)</li>
                <li>• S자코스 통과</li>
                <li>• 곡선/직각코스</li>
                <li>• 경사로 정지/출발</li>
                <li>• 후진 및 방향전환</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">합격 기준</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 100점 만점 중 70점 이상</li>
                <li>• 라인 밟음: -5점</li>
                <li>• 코스 이탈: -10점</li>
                <li>• 접촉/충돌: 즉시 실격</li>
                <li>• 내륜차로 인한 충돌 주의</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 도로주행 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">도로주행시험 (대형차)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">시험 내용</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 5km 이상 실제 도로 (대형차)</li>
                <li>• 대형차 차로 준수</li>
                <li>• 사각지대 확인 필수</li>
                <li>• 우회전 시 내륜차 주의</li>
                <li>• 에어브레이크 활용</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">주요 감점 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 신호위반: 즉시 실격</li>
                <li>• 중앙선 침범: 즉시 실격</li>
                <li>• 우회전 보행자 미확인: -15점</li>
                <li>• 사각지대 미확인: -10점</li>
                <li>• 급제동: -10점</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 운전 가능 차량 */}
        <div className="bg-gradient-to-r from-zinc-100 to-stone-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">운전 가능 차량</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">1종 대형 전용</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-zinc-600 font-bold">🚌</span>대형승합차 (16인 이상)</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600 font-bold">🚛</span>대형화물차 (12톤 이상)</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600 font-bold">🚜</span>덤프트럭, 콘크리트믹서</li>
                <li className="flex items-center gap-2"><span className="text-zinc-600 font-bold">🚐</span>특수자동차 (구난차 등)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-700 mb-3">추가로 운전 가능</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 1종 보통 운전 가능 차량 전부</li>
                <li>• 승합자동차 (모든 인원)</li>
                <li>• 화물자동차 (적재중량 무제한)</li>
                <li>• 원동기장치자전거</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 응시 비용 */}
        <div className="bg-gradient-to-r from-zinc-50 to-stone-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시 비용</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">신체검사</p>
              <p className="text-2xl font-bold text-zinc-700">6,000원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">학과시험</p>
              <p className="text-2xl font-bold text-zinc-700">7,500원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">기능시험</p>
              <p className="text-2xl font-bold text-zinc-700">22,000원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">도로주행</p>
              <p className="text-2xl font-bold text-zinc-700">30,000원</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 면허증 발급비용 별도 (7,500원) / 대형면허 응시료는 보통면허보다 높음</p>
        </div>
      </div>
    </div>
  );
}
