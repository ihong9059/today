"use client";

import Link from "next/link";

export default function BoatLicenseExamPage() {
  const examInfo = [
    {
      title: "응시자격",
      icon: "👤",
      content: [
        "만 14세 이상 (수상오토바이는 만 14세 이상)",
        "신체검사 합격자",
        "결격사유에 해당하지 않는 자",
        "별도의 학력/경력 제한 없음",
      ],
    },
    {
      title: "필기시험",
      icon: "📝",
      content: [
        "시험과목: 항해, 운용, 법규, 기관 (4과목)",
        "문항수: 40문항 (과목당 10문항)",
        "시험시간: 40분",
        "합격기준: 60점 이상 (100점 만점)",
        "출제방식: 4지선다형 객관식",
      ],
    },
    {
      title: "실기시험",
      icon: "🚤",
      content: [
        "시험내용: 출항 전 점검, 조종, 계류 등",
        "시험시간: 약 10~15분",
        "합격기준: 80점 이상 (100점 만점)",
        "평가항목: 조종술, 안전의식, 법규준수",
        "실격항목: 위험행위, 2회 실패 시",
      ],
    },
    {
      title: "시험일정",
      icon: "📅",
      content: [
        "시행기관: 해양수산부 (한국해양교통안전공단)",
        "시험장소: 전국 면허시험장",
        "시험횟수: 수시 시행 (시험장별 상이)",
        "접수방법: 온라인 (안전교육포털) 또는 현장",
        "합격발표: 시험 당일 발표",
      ],
    },
    {
      title: "응시비용",
      icon: "💰",
      content: [
        "필기시험: 12,000원",
        "실기시험: 54,500원",
        "신체검사: 약 30,000원 (병원별 상이)",
        "면허증 발급: 6,000원",
        "총 예상비용: 약 10만원",
      ],
    },
    {
      title: "합격 후 절차",
      icon: "🎓",
      content: [
        "합격 후 면허증 발급 신청",
        "신체검사서 제출 (3개월 이내)",
        "면허증 발급 (약 1~2주 소요)",
        "면허 유효기간: 5년",
        "갱신: 신체검사 후 갱신 가능",
      ],
    },
  ];

  const disqualifications = [
    "정신건강의학과 질환자 (조현병, 분열정동장애 등)",
    "마약류 중독자",
    "뇌전증 환자 (완치 시 제외)",
    "면허취소 후 1년 미경과자",
    "음주운항 면허취소 후 2년 미경과자",
  ];

  const practicalItems = [
    { item: "출항 전 점검", desc: "엔진, 연료, 안전장비 확인" },
    { item: "이안 (출항)", desc: "안전하게 계류장 이탈" },
    { item: "직진 항행", desc: "지정 코스 직진 운항" },
    { item: "변침 (방향전환)", desc: "좌/우 90도 이상 변침" },
    { item: "후진", desc: "안전하게 후진 운항" },
    { item: "사행 (S자 운항)", desc: "장애물 회피 운항" },
    { item: "접안 (입항)", desc: "안전하게 계류장 접근" },
    { item: "계류", desc: "로프 결속, 정박 완료" },
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
            <Link href="/category/driving/boat-license" className="text-gray-600 hover:text-cyan-600">소형선박조종사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">시험정보</h1>
              <p className="text-cyan-200 text-lg">소형선박조종사 면허 취득 안내</p>
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
            <span className="text-2xl">🚤</span>
            실기시험 평가항목
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {practicalItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <span className="font-bold text-gray-800">{item.item}</span>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-10 border border-red-200">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            결격사유 (면허취득 불가)
          </h2>
          <ul className="space-y-2">
            {disqualifications.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700">
                <span className="text-red-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-10 border border-cyan-200">
          <h2 className="text-xl font-bold text-cyan-800 mb-4">취득 절차</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">1. 신체검사</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">2. 시험접수</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">3. 필기시험</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full border border-cyan-300 font-medium">4. 실기시험</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-cyan-600 text-white px-4 py-2 rounded-full font-medium">5. 면허발급</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/boat-license"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold text-center hover:from-cyan-700 hover:to-blue-700 transition-colors shadow-lg"
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
