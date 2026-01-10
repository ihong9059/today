"use client";

import Link from "next/link";

export default function CookPufferfishPage() {
  const examInfo = {
    title: "복어조리기능사",
    description: "복어 전문 조리사 국가자격증 (독소 제거 전문)",
    category: "서비스",
    difficulty: "상",
    period: "상시시험",
    agency: "한국산업인력공단",
  };

  const subjects = [
    { name: "식품위생 및 법규", questions: 15, color: "bg-red-500" },
    { name: "식품학", questions: 15, color: "bg-green-500" },
    { name: "조리이론과 원가계산", questions: 15, color: "bg-blue-500" },
    { name: "공중보건학", questions: 15, color: "bg-purple-500" },
  ];

  const features = [
    { icon: "🐡", title: "복어 전문", desc: "복어 독소 제거 및 안전한 조리 기술" },
    { icon: "⚠️", title: "독소 관리", desc: "테트로도톡신 완벽 제거 필수" },
    { icon: "📜", title: "법적 필수", desc: "복어 취급 시 반드시 필요한 자격" },
    { icon: "💼", title: "전문 자격", desc: "복어 전문점, 일식당 필수 자격" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-slate-700 to-zinc-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/category/service" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            서비스 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">국가기술자격</span>
            <span className="bg-red-500/30 px-4 py-2 rounded-full text-sm font-medium">전문자격</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{examInfo.title}</h1>
          <p className="text-xl text-slate-300 mb-6">{examInfo.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/service/cook-pufferfish/exam" className="bg-white text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">시험 상세정보</Link>
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-slate-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-500 transition-colors">학습 시작하기</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ 복어조리기능사 필수 안내</h3>
          <ul className="text-red-700 space-y-2">
            <li>• 복어에는 <strong>테트로도톡신(TTX)</strong>이라는 맹독이 있습니다</li>
            <li>• 복어를 조리하려면 반드시 <strong>복어조리기능사 자격증</strong>이 필요합니다</li>
            <li>• 무자격자의 복어 조리는 <strong>법적 처벌</strong> 대상입니다</li>
            <li>• 독소는 열에 파괴되지 않아 <strong>완벽한 제거</strong>가 필수입니다</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">필기시험 과목</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-3 h-12 ${subject.color} rounded-full`}></div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.questions}문항 출제</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-slate-800"><strong>합격기준:</strong> 60문항 중 36문항 이상 정답 (60점 이상)</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-xl text-center hover:from-red-600 hover:to-rose-700 transition-colors">
              <div className="text-3xl mb-2">🦠</div>
              <div className="font-bold">식품위생법규</div>
              <div className="text-sm text-red-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center hover:from-green-600 hover:to-emerald-700 transition-colors">
              <div className="text-3xl mb-2">🧬</div>
              <div className="font-bold">식품학</div>
              <div className="text-sm text-green-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-pufferfish/study/cooking-theory" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl text-center hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <div className="text-3xl mb-2">📖</div>
              <div className="font-bold">조리이론/원가</div>
              <div className="text-sm text-blue-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-pufferfish/study/public-health" className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-xl text-center hover:from-purple-600 hover:to-violet-700 transition-colors">
              <div className="text-3xl mb-2">🏥</div>
              <div className="font-bold">공중보건학</div>
              <div className="text-sm text-purple-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-pufferfish/study/practical" className="bg-gradient-to-br from-slate-600 to-zinc-700 text-white p-6 rounded-xl text-center hover:from-slate-700 hover:to-zinc-800 transition-colors">
              <div className="text-3xl mb-2">🐡</div>
              <div className="font-bold">실기</div>
              <div className="text-sm text-slate-300">25문항</div>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-100 to-zinc-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-slate-600 mb-2">필기시험</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 객관식 4지선다 60문항</li>
                <li>• 시험시간: 60분</li>
                <li>• CBT 상시시험</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-zinc-600 mb-2">실기시험</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 작업형 실기</li>
                <li>• 시험시간: 60분</li>
                <li>• 복어 손질 및 독소 제거</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-600 mb-2">응시자격</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 제한 없음</li>
                <li>• 연령, 학력 무관</li>
                <li>• 누구나 응시 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
