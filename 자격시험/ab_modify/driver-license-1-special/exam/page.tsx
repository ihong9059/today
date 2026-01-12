"use client";

import Link from "next/link";

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-special" className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 특수면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 정보</h1>
          <p className="text-xl text-purple-200">1종 특수면허 취득 절차 및 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 취득 절차 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">취득 절차</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "신체검사", desc: "병원/면허시험장" },
              { step: 2, title: "학과교육", desc: "3시간 (특수차량)" },
              { step: 3, title: "학과시험", desc: "40문항/60점 합격" },
              { step: 4, title: "기능시험", desc: "연결/코스/70점" },
              { step: 5, title: "도로주행", desc: "연결차/70점 합격" },
            ].map((item) => (
              <div key={item.step} className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{item.step}</div>
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
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>신체검사 합격</li>
                <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">✓</span>결격사유 없음</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-700 mb-3">교육 이수</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>학과교육: 3시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>기능교육: 6시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>도로주행교육: 6시간</li>
                <li className="flex items-center gap-2"><span className="text-amber-600">•</span>전문학원 필수 (트레일러/레커)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 특수면허 종류 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">특수면허 종류 (선택)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚛</span> 트레일러
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 세미트레일러, 풀트레일러</li>
                <li>• 컨테이너 운송차량</li>
                <li>• 피견인차 750kg 초과</li>
                <li>• 연결/분리 작업 시험 포함</li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-xl p-6 border-2 border-violet-300">
              <h3 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚗</span> 레커 (구난차)
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 소형/중형/대형 레커</li>
                <li>• 플랫베드 레커</li>
                <li>• 고장/사고 차량 견인</li>
                <li>• 견인 작업 시험 포함</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 트레일러와 레커는 별도 면허이며, 각각 취득해야 합니다</p>
        </div>

        {/* 학과시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학과시험 (필기)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-purple-700 mb-3">시험 개요</h3>
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
              <h3 className="font-bold text-purple-700 mb-3">특수면허 특별 출제</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-purple-600">•</span>연결장치 구조/규정</li>
                <li className="flex items-center gap-2"><span className="text-purple-600">•</span>피견인차 제동장치</li>
                <li className="flex items-center gap-2"><span className="text-purple-600">•</span>견인 관련 법규</li>
                <li className="flex items-center gap-2"><span className="text-purple-600">•</span>잭나이프/스윙아웃 방지</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기능시험 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">기능시험 (장내 - 특수차량)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-purple-700 mb-3">트레일러 평가 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 트레일러 연결/분리 작업</li>
                <li>• 트레일러 후진 (핵심)</li>
                <li>• 굴절/직각/S자 코스</li>
                <li>• 방향전환 코스</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-700 mb-3">합격 기준</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 100점 만점 중 70점 이상</li>
                <li>• 연결장치 오류: -20점</li>
                <li>• 후진 방향 실수: -10점</li>
                <li>• 접촉/충돌: 즉시 실격</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 도로주행 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">도로주행시험 (연결차량)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-purple-700 mb-3">시험 내용</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 5km 이상 연결차량 주행</li>
                <li>• 트레일러 차로변경</li>
                <li>• 교차로 좌우회전 (궤적)</li>
                <li>• 사각지대 지속 확인</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-700 mb-3">주요 감점 항목</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 신호위반: 즉시 실격</li>
                <li>• 연결부 미확인: -15점</li>
                <li>• 내륜차 미고려: -10점</li>
                <li>• 사각지대 미확인: -10점</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 운전 가능 차량 */}
        <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">운전 가능 차량</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-purple-700 mb-3">트레일러 면허</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-purple-600 font-bold">🚛</span>세미트레일러</li>
                <li className="flex items-center gap-2"><span className="text-purple-600 font-bold">🚛</span>풀트레일러</li>
                <li className="flex items-center gap-2"><span className="text-purple-600 font-bold">🚛</span>컨테이너 섀시</li>
                <li className="flex items-center gap-2"><span className="text-purple-600 font-bold">🚛</span>특수물 운반 트레일러</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-violet-700 mb-3">레커 면허</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span className="text-violet-600 font-bold">🚗</span>소형/중형/대형 레커</li>
                <li className="flex items-center gap-2"><span className="text-violet-600 font-bold">🚗</span>플랫베드 레커</li>
                <li className="flex items-center gap-2"><span className="text-violet-600 font-bold">🚗</span>구난차</li>
                <li className="flex items-center gap-2"><span className="text-violet-600 font-bold">🚗</span>견인용 특수차</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 1종 보통면허로 운전 가능한 차량도 모두 운전 가능</p>
        </div>

        {/* 응시 비용 */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시 비용</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">신체검사</p>
              <p className="text-2xl font-bold text-purple-700">6,000원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">학과시험</p>
              <p className="text-2xl font-bold text-purple-700">7,500원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">기능시험</p>
              <p className="text-2xl font-bold text-purple-700">22,000원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">도로주행</p>
              <p className="text-2xl font-bold text-purple-700">30,000원</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">* 면허증 발급비용 별도 (7,500원) / 전문학원 교육비 별도</p>
        </div>
      </div>
    </div>
  );
}
