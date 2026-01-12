"use client";

import Link from "next/link";

export default function LightSportPilotExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "만 17세 이상",
        "항공신체검사 2종 이상 합격",
        "비행경력 20시간 이상",
        "단독비행 5시간 이상",
        "야외비행 경력 포함",
      ],
    },
    {
      title: "필기시험",
      icon: "📝",
      content: [
        "시험과목: 항공법규, 항공기상, 비행이론, 항법",
        "문항수: 과목당 40문항",
        "시험시간: 과목당 50분",
        "합격기준: 과목당 70점 이상",
        "출제방식: 4지선다형 객관식",
      ],
    },
    {
      title: "실기시험",
      icon: "✈️",
      content: [
        "구술시험 + 실비행시험",
        "이륙, 공중조작, 착륙 평가",
        "비상절차 수행능력",
        "합격기준: 항목별 S등급",
        "불합격 시 재응시",
      ],
    },
    {
      title: "비행훈련",
      icon: "🎓",
      content: [
        "총 비행시간: 20시간 이상",
        "교관동승: 15시간 이상",
        "단독비행: 5시간 이상",
        "야외비행: 포함",
        "비상절차 훈련: 포함",
      ],
    },
    {
      title: "시험기관",
      icon: "🏛️",
      content: [
        "시행기관: 국토교통부",
        "위탁기관: 교통안전공단",
        "시험장소: 지정 비행장",
        "접수방법: 온라인 (TS2020)",
        "합격발표: 시험 후 개별 통보",
      ],
    },
    {
      title: "예상비용",
      icon: "💰",
      content: [
        "필기시험: 48,400원",
        "실기시험: 72,600원",
        "비행훈련: 약 500~800만원",
        "신체검사: 약 10만원",
        "총 예상: 약 700만원+",
      ],
    },
  ];

  const aircraftTypes = [
    { type: "타면조종형", desc: "일반 경비행기 형태", example: "세스나 스카이캐쳐" },
    { type: "체중이동형", desc: "트라이크, 행글라이더형", example: "델타윙 트라이크" },
    { type: "자이로플레인", desc: "회전익 형태", example: "오토자이로" },
    { type: "동력패러글라이더", desc: "PPG/PPGG", example: "파라모터" },
  ];

  const comparisonTable = [
    { item: "최대이륙중량", light: "600kg 이하", private: "제한없음" },
    { item: "좌석수", light: "2석 이하", private: "제한없음" },
    { item: "비행경력", light: "20시간", private: "40시간" },
    { item: "신체검사", light: "2종", private: "2종" },
    { item: "야간비행", light: "불가", private: "가능" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-cyan-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving/light-sport-pilot" className="text-gray-600 hover:text-cyan-600">경량항공기조종사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-cyan-200 text-lg">경량항공기조종사 면허 취득 안내</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {examInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{info.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{info.title}</h3>
              </div>
              <ul className="space-y-2">
                {info.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🪂</span>
            경량항공기 종류
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {aircraftTypes.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-4 border border-cyan-200 text-center">
                <p className="font-bold text-gray-800">{item.type}</p>
                <p className="text-cyan-600 text-sm">{item.desc}</p>
                <p className="text-gray-500 text-xs mt-1">{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            경량 vs 자가용 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cyan-50">
                  <th className="text-left p-3 font-bold text-gray-800">항목</th>
                  <th className="text-left p-3 font-bold text-cyan-700">경량항공기</th>
                  <th className="text-left p-3 font-bold text-violet-700">자가용</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 text-gray-700 font-medium">{row.item}</td>
                    <td className="p-3 text-cyan-600">{row.light}</td>
                    <td className="p-3 text-violet-600">{row.private}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 mb-10 border border-cyan-200">
          <h2 className="text-xl font-bold text-cyan-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">1. 신체검사</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">2. 비행훈련</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">3. 필기시험</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">4. 실기시험</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-cyan-600 text-white px-4 py-2 rounded-full font-medium">5. 면허발급</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-10 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            알아두면 좋은 정보
          </h2>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• 경량항공기는 주간 시계비행(VFR)만 가능합니다</li>
            <li>• 야간비행 및 계기비행은 불가합니다</li>
            <li>• 자가용조종사 취득 시 경량항공기도 조종 가능합니다</li>
            <li>• 동력패러글라이더는 별도 한정이 필요합니다</li>
            <li>• 경량항공기는 유상 운항이 불가합니다</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/light-sport-pilot"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-4 rounded-xl font-bold text-center hover:from-cyan-700 hover:to-teal-700 transition-colors shadow-lg"
          >
            ← 과목별 학습하기
          </Link>
          <Link
            href="/category/driving"
            className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
