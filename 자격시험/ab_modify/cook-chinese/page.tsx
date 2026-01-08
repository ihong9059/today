"use client";

import Link from "next/link";

export default function CookChinesePage() {
  const examInfo = {
    title: "중식조리기능사",
    description: "중국요리 전문 조리사 국가자격증",
    category: "서비스",
    difficulty: "중",
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
    { icon: "🥢", title: "중화요리 전문", desc: "짜장면, 탕수육, 볶음밥 등 중국요리 전문 기술" },
    { icon: "🔥", title: "웍(Wok) 조리", desc: "센 불에서 빠른 조리, 웍 기술 습득" },
    { icon: "📜", title: "국가공인자격", desc: "한국산업인력공단 시행 국가기술자격" },
    { icon: "💼", title: "취업 필수", desc: "중식당, 호텔 중식당, 대형조리장 취업" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/category/service" className="inline-flex items-center text-red-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            서비스 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">국가기술자격</span>
            <span className="bg-yellow-400/30 px-4 py-2 rounded-full text-sm font-medium">상시시험</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{examInfo.title}</h1>
          <p className="text-xl text-red-100 mb-6">{examInfo.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/service/cook-chinese/exam" className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors shadow-lg">시험 상세정보</Link>
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-red-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-900 transition-colors">학습 시작하기</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
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
          <div className="mt-6 p-4 bg-red-50 rounded-xl">
            <p className="text-red-800"><strong>합격기준:</strong> 60문항 중 36문항 이상 정답 (60점 이상)</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-xl text-center hover:from-red-600 hover:to-rose-700 transition-colors">
              <div className="text-3xl mb-2">🦠</div>
              <div className="font-bold">식품위생법규</div>
              <div className="text-sm text-red-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-chinese/study/food-science" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center hover:from-green-600 hover:to-emerald-700 transition-colors">
              <div className="text-3xl mb-2">🧬</div>
              <div className="font-bold">식품학</div>
              <div className="text-sm text-green-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-chinese/study/cooking-theory" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl text-center hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <div className="text-3xl mb-2">📖</div>
              <div className="font-bold">조리이론/원가</div>
              <div className="text-sm text-blue-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-chinese/study/public-health" className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-xl text-center hover:from-purple-600 hover:to-violet-700 transition-colors">
              <div className="text-3xl mb-2">🏥</div>
              <div className="font-bold">공중보건학</div>
              <div className="text-sm text-purple-200">50문항</div>
            </Link>
            <Link href="/category/service/cook-chinese/study/practical" className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-xl text-center hover:from-rose-600 hover:to-pink-700 transition-colors">
              <div className="text-3xl mb-2">🥢</div>
              <div className="font-bold">실기</div>
              <div className="text-sm text-rose-200">25문항</div>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-red-600 mb-2">필기시험</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 객관식 4지선다 60문항</li>
                <li>• 시험시간: 60분</li>
                <li>• CBT 상시시험</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-rose-600 mb-2">실기시험</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 작업형 실기</li>
                <li>• 시험시간: 70분</li>
                <li>• 30종 품목 중 2가지 조리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-pink-600 mb-2">응시자격</h3>
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
