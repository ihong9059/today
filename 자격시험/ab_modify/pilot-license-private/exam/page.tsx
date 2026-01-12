"use client";

import Link from "next/link";

export default function PilotLicenseExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "만 17세 이상",
        "항공신체검사 2종 이상 합격",
        "비행경력 40시간 이상",
        "단독비행 10시간 포함",
        "야간비행 3시간 (해당 시)",
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
        "합격기준: 항목별 S등급 이상",
        "불합격 시 재응시",
      ],
    },
    {
      title: "비행훈련",
      icon: "🎓",
      content: [
        "총 비행시간: 40시간 이상",
        "교관동승: 20시간 이상",
        "단독비행: 10시간 이상",
        "야외비행: 5시간 이상",
        "야간비행: 해당 한정 시",
      ],
    },
    {
      title: "시험기관",
      icon: "🏛️",
      content: [
        "시행기관: 국토교통부",
        "위탁기관: 교통안전공단",
        "시험장소: 전국 비행장",
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
        "비행훈련: 약 1,500~2,000만원",
        "신체검사: 약 10만원",
        "총 예상: 약 2,000만원+",
      ],
    },
  ];

  const flightTraining = [
    { phase: "기초훈련", hours: "10시간", desc: "이착륙, 기본조작" },
    { phase: "상급훈련", hours: "10시간", desc: "비상절차, 계기비행 기초" },
    { phase: "단독비행", hours: "10시간", desc: "단독이착륙, 장주비행" },
    { phase: "야외비행", hours: "5시간", desc: "항법, 타 비행장 착륙" },
    { phase: "실기준비", hours: "5시간", desc: "실기시험 대비" },
  ];

  const medicalRequirements = [
    { item: "시력", standard: "교정시력 1.0 이상 (각 눈)" },
    { item: "청력", standard: "정상 청력" },
    { item: "혈압", standard: "160/95 이하" },
    { item: "색각", standard: "항공등화 식별 가능" },
    { item: "정신건강", standard: "조종에 지장 없을 것" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-violet-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving/pilot-license-private" className="text-gray-600 hover:text-violet-600">자가용조종사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-violet-200 text-lg">자가용조종사 면허 취득 안내</p>
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
                    <span className="text-violet-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            비행훈련 과정 (40시간)
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {flightTraining.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200 text-center">
                <span className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">{index + 1}</span>
                <p className="font-bold text-gray-800">{item.phase}</p>
                <p className="text-violet-600 font-semibold">{item.hours}</p>
                <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            항공신체검사 기준 (2종)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-3 font-bold text-gray-800">검사항목</th>
                  <th className="text-left p-3 font-bold text-violet-700">기준</th>
                </tr>
              </thead>
              <tbody>
                {medicalRequirements.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 text-gray-700 font-medium">{row.item}</td>
                    <td className="p-3 text-gray-600">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">* 유효기간: 만 40세 미만 5년, 40세 이상 2년</p>
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 mb-10 border border-violet-200">
          <h2 className="text-xl font-bold text-violet-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-violet-300 font-medium">1. 신체검사</span>
            <span className="text-violet-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-violet-300 font-medium">2. 비행훈련</span>
            <span className="text-violet-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-violet-300 font-medium">3. 필기시험</span>
            <span className="text-violet-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-violet-300 font-medium">4. 실기시험</span>
            <span className="text-violet-400">→</span>
            <span className="bg-violet-600 text-white px-4 py-2 rounded-full font-medium">5. 면허발급</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 mb-10 border border-amber-200">
          <h2 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            알아두면 좋은 정보
          </h2>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 필기시험 합격 후 2년 내 실기시험 응시 필요</li>
            <li>• 면허 취득 후 사업용조종사, 계기한정 추가 가능</li>
            <li>• 한정사항: 육상단발, 육상다발, 수상단발 등</li>
            <li>• 야간비행, 계기비행은 별도 한정 필요</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/pilot-license-private"
            className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-bold text-center hover:from-violet-700 hover:to-purple-700 transition-colors shadow-lg"
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
