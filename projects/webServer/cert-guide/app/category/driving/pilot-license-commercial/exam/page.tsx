"use client";

import Link from "next/link";

export default function CommercialPilotExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "만 18세 이상",
        "자가용조종사 면허 소지",
        "비행경력 200시간 이상",
        "기장시간 100시간 이상",
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
        "출제수준: 자가용 대비 심화",
      ],
    },
    {
      title: "실기시험",
      icon: "✈️",
      content: [
        "구술시험 + 실비행시험",
        "정밀 계기비행 수행",
        "비상절차 및 비정상 상황",
        "야간비행 능력 평가",
        "합격기준: 전 항목 S등급",
      ],
    },
    {
      title: "비행훈련",
      icon: "🎓",
      content: [
        "총 비행시간: 200시간 이상",
        "기장시간: 100시간 이상",
        "계기비행: 40시간 이상",
        "야외비행: 20시간 이상",
        "야간비행: 5시간 이상",
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
        "비행훈련: 약 5,000~7,000만원",
        "신체검사: 약 15만원",
        "총 예상: 약 6,000만원+",
      ],
    },
  ];

  const flightRequirements = [
    { category: "총 비행시간", hours: "200시간", desc: "전체 비행 경력" },
    { category: "기장시간", hours: "100시간", desc: "단독 기장으로 비행" },
    { category: "야외비행", hours: "20시간", desc: "300km 이상 왕복" },
    { category: "계기비행", hours: "40시간", desc: "계기비행 훈련" },
    { category: "야간비행", hours: "5시간", desc: "야간 이착륙 포함" },
  ];

  const careerPath = [
    { step: "자가용조종사", desc: "기초 비행 자격" },
    { step: "사업용조종사", desc: "유상 운항 자격" },
    { step: "계기한정", desc: "IFR 운항 자격" },
    { step: "운송용조종사", desc: "대형기 기장 자격" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-amber-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving/pilot-license-commercial" className="text-gray-600 hover:text-amber-600">사업용조종사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-amber-200 text-lg">사업용조종사 면허 취득 안내</p>
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
                    <span className="text-amber-500 mt-1">•</span>
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
              <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 text-center">
                <p className="font-bold text-gray-800">{item.category}</p>
                <p className="text-amber-600 font-semibold text-lg">{item.hours}</p>
                <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            조종사 자격 단계
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {careerPath.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`text-center p-4 rounded-xl ${index === 1 ? "bg-amber-600 text-white" : "bg-gray-100"}`}>
                  <p className="font-bold">{item.step}</p>
                  <p className={`text-sm ${index === 1 ? "text-amber-200" : "text-gray-500"}`}>{item.desc}</p>
                </div>
                {index < careerPath.length - 1 && <span className="text-gray-400 text-2xl">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-10 border border-amber-200">
          <h2 className="text-xl font-bold text-amber-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-amber-300 font-medium">1. 자가용 취득</span>
            <span className="text-amber-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-amber-300 font-medium">2. 비행경력 축적</span>
            <span className="text-amber-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-amber-300 font-medium">3. 1종 신체검사</span>
            <span className="text-amber-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-amber-300 font-medium">4. 필기시험</span>
            <span className="text-amber-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-amber-300 font-medium">5. 실기시험</span>
            <span className="text-amber-400">→</span>
            <span className="bg-amber-600 text-white px-4 py-2 rounded-full font-medium">6. 면허발급</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-10 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            알아두면 좋은 정보
          </h2>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 사업용 면허로 항공기 사용사업, 항공운송사업 종사 가능</li>
            <li>• 다발한정, 계기한정 추가로 취업 기회 확대</li>
            <li>• 비행교관(CFI) 자격 취득 시 교관 활동 가능</li>
            <li>• 운송용조종사(ATPL)로의 상위 자격 진출 가능</li>
            <li>• 항공사 부기장 지원 시 계기한정 필수</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/pilot-license-commercial"
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold text-center hover:from-amber-700 hover:to-orange-700 transition-colors shadow-lg"
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
