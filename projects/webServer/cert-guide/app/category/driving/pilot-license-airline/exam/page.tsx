"use client";

import Link from "next/link";

export default function AirlinePilotExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "만 21세 이상",
        "사업용조종사 면허 소지",
        "비행경력 1,500시간 이상",
        "기장시간 500시간 이상",
        "항공신체검사 1종 합격",
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
        "출제수준: 최고난도 심화",
      ],
    },
    {
      title: "실기시험",
      icon: "✈️",
      content: [
        "풀 플라이트 시뮬레이터(FFS)",
        "정밀 계기접근 수행",
        "비상절차 종합평가",
        "CRM/TEM 평가",
        "합격기준: 전 항목 S등급",
      ],
    },
    {
      title: "비행경력",
      icon: "🎓",
      content: [
        "총 비행시간: 1,500시간 이상",
        "기장시간: 500시간 이상",
        "야간비행: 100시간 이상",
        "계기비행: 75시간 이상",
        "다발기: 해당 요건 충족",
      ],
    },
    {
      title: "시험기관",
      icon: "🏛️",
      content: [
        "시행기관: 국토교통부",
        "위탁기관: 교통안전공단",
        "실기장소: 항공사 시뮬레이터",
        "접수방법: 온라인 (TS2020)",
        "합격발표: 시험 후 개별 통보",
      ],
    },
    {
      title: "관련비용",
      icon: "💰",
      content: [
        "필기시험: 48,400원",
        "실기시험: 72,600원",
        "형식한정 훈련: 별도",
        "신체검사: 약 15만원",
        "시뮬레이터: 항공사 지원",
      ],
    },
  ];

  const flightRequirements = [
    { category: "총 비행시간", hours: "1,500시간", desc: "전체 비행 경력" },
    { category: "기장시간", hours: "500시간", desc: "단독 기장으로 비행" },
    { category: "야간비행", hours: "100시간", desc: "야간 비행 경력" },
    { category: "계기비행", hours: "75시간", desc: "계기비행 경력" },
    { category: "다발기", hours: "요건충족", desc: "다발기 비행 경력" },
  ];

  const careerPath = [
    { step: "자가용", desc: "PPL" },
    { step: "사업용", desc: "CPL" },
    { step: "부기장", desc: "항공사" },
    { step: "운송용", desc: "ATPL" },
    { step: "기장", desc: "Captain" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-slate-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving/pilot-license-airline" className="text-gray-600 hover:text-slate-600">운송용조종사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-700 to-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-slate-300 text-lg">운송용조종사 면허 취득 안내</p>
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
                    <span className="text-slate-500 mt-1">•</span>
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
            비행경력 요건
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {flightRequirements.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-lg p-4 border border-slate-200 text-center">
                <p className="font-bold text-gray-800">{item.category}</p>
                <p className="text-slate-700 font-semibold text-lg">{item.hours}</p>
                <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            조종사 커리어 패스
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {careerPath.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`text-center p-4 rounded-xl ${index === 3 ? "bg-slate-700 text-white" : "bg-gray-100"}`}>
                  <p className="font-bold">{item.step}</p>
                  <p className={`text-sm ${index === 3 ? "text-slate-300" : "text-gray-500"}`}>{item.desc}</p>
                </div>
                {index < careerPath.length - 1 && <span className="text-gray-400 text-2xl">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-6 mb-10 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-slate-300 font-medium">1. 사업용 취득</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-300 font-medium">2. 부기장 경력</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-300 font-medium">3. 1,500시간 달성</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-300 font-medium">4. 필기시험</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-300 font-medium">5. 실기시험</span>
            <span className="text-slate-400">→</span>
            <span className="bg-slate-700 text-white px-4 py-2 rounded-full font-medium">6. 기장 승격</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-10 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            알아두면 좋은 정보
          </h2>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• ATPL은 항공기 기장이 되기 위한 필수 자격입니다</li>
            <li>• 대부분 항공사 입사 후 부기장으로 경력을 쌓으며 취득합니다</li>
            <li>• 형식한정(Type Rating)을 추가하여 특정 기종 운항 자격을 얻습니다</li>
            <li>• 기장 승격까지 총 비행시간 약 3,000~5,000시간이 필요합니다</li>
            <li>• 항공사별로 기장 승격 요건이 다를 수 있습니다</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/pilot-license-airline"
            className="flex-1 bg-gradient-to-r from-slate-700 to-gray-800 text-white py-4 rounded-xl font-bold text-center hover:from-slate-800 hover:to-gray-900 transition-colors shadow-lg"
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
