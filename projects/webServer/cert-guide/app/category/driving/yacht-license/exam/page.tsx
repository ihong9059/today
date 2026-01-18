"use client";

import Link from "next/link";

export default function YachtLicenseExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "2급: 만 14세 이상, 제한 없음",
        "1급: 2급 취득 후 응시 가능",
        "신체검사 합격자",
        "결격사유에 해당하지 않는 자",
      ],
    },
    {
      title: "필기시험",
      icon: "📝",
      content: [
        "시험과목: 수상안전, 항해술, 법규, 요트운용",
        "문항수: 40문항 (과목당 10문항)",
        "시험시간: 40분",
        "합격기준: 60점 이상 (100점 만점)",
        "출제방식: 4지선다형 객관식",
      ],
    },
    {
      title: "실기시험",
      icon: "⛵",
      content: [
        "시험내용: 세일 조작, 조종, 계류 등",
        "시험시간: 약 20~30분",
        "합격기준: 80점 이상 (100점 만점)",
        "평가항목: 세일링 기술, 안전의식",
        "실격: 위험행위, 2회 실패 시",
      ],
    },
    {
      title: "시험일정",
      icon: "📅",
      content: [
        "시행기관: 해양수산부 (한국해양교통안전공단)",
        "시험장소: 전국 면허시험장",
        "시험횟수: 수시 시행",
        "접수방법: 온라인 또는 현장",
        "합격발표: 시험 당일 발표",
      ],
    },
    {
      title: "응시비용",
      icon: "💰",
      content: [
        "필기시험: 12,000원",
        "실기시험: 54,500원 (2급 기준)",
        "신체검사: 약 30,000원",
        "면허증 발급: 6,000원",
        "총 예상비용: 약 10만원",
      ],
    },
    {
      title: "면허 종류",
      icon: "🎓",
      content: [
        "2급: 5톤 미만 요트/모터보트",
        "1급: 5톤 이상 요트/모터보트",
        "유효기간: 5년",
        "갱신: 신체검사 후 갱신",
        "1급은 원양항해 가능",
      ],
    },
  ];

  const practicalItems = [
    { item: "출항 전 점검", desc: "세일, 삭구, 안전장비 확인" },
    { item: "이안 (출항)", desc: "계류장 안전하게 이탈" },
    { item: "세일 전개", desc: "메인세일, 집 전개" },
    { item: "클로즈홀드", desc: "역풍 방향 항해" },
    { item: "빔리치", desc: "횡풍 방향 항해" },
    { item: "태킹", desc: "역풍 통과 방향전환" },
    { item: "자이빙", desc: "순풍 방향전환" },
    { item: "접안/계류", desc: "안전하게 접안 후 계류" },
  ];

  const licenseComparison = [
    { item: "조종 가능 선박", level2: "5톤 미만", level1: "5톤 이상" },
    { item: "항행구역", level2: "연안", level1: "원양 가능" },
    { item: "응시자격", level2: "만 14세 이상", level1: "2급 취득자" },
    { item: "실기시험", level2: "기본 조종", level1: "고급 세일링" },
    { item: "상업운항", level2: "불가", level1: "가능" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-sky-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving/yacht-license" className="text-gray-600 hover:text-sky-600">요트조종면허</Link>
            <span className="text-gray-300">›</span>
            <span className="text-sky-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-sky-200 text-lg">요트조종면허 취득 안내</p>
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
                    <span className="text-sky-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⛵</span>
            실기시험 평가항목
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {practicalItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-4 border border-sky-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-sky-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <span className="font-bold text-gray-800">{item.item}</span>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            1급 vs 2급 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sky-50">
                  <th className="text-left p-3 font-bold text-gray-800">구분</th>
                  <th className="text-center p-3 font-bold text-sky-700">2급</th>
                  <th className="text-center p-3 font-bold text-blue-700">1급</th>
                </tr>
              </thead>
              <tbody>
                {licenseComparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 text-gray-700">{row.item}</td>
                    <td className="p-3 text-center text-sky-600">{row.level2}</td>
                    <td className="p-3 text-center text-blue-600">{row.level1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl p-6 mb-10 border border-sky-200">
          <h2 className="text-xl font-bold text-sky-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-sky-300 font-medium">1. 신체검사</span>
            <span className="text-sky-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-sky-300 font-medium">2. 시험접수</span>
            <span className="text-sky-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-sky-300 font-medium">3. 필기시험</span>
            <span className="text-sky-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-sky-300 font-medium">4. 실기시험</span>
            <span className="text-sky-400">→</span>
            <span className="bg-sky-600 text-white px-4 py-2 rounded-full font-medium">5. 면허발급</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/yacht-license"
            className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-center hover:from-sky-600 hover:to-cyan-700 transition-colors shadow-lg"
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
