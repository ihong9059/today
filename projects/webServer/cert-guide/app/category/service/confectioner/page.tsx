"use client";

import Link from "next/link";

export default function ConfectionerPage() {
  const examInfo = {
    title: "제과기능사",
    description: "케이크, 쿠키, 파이 등 과자류 제조 전문 국가자격증",
    category: "서비스",
    difficulty: "중",
    period: "상시시험",
    agency: "한국산업인력공단",
  };

  const subjects = [
    { name: "과자류재료", questions: 20, color: "bg-pink-500" },
    { name: "제조 및 위생관리", questions: 40, color: "bg-rose-500" },
  ];

  const features = [
    { icon: "🍰", title: "케이크 제조", desc: "스펀지, 시폰, 버터케이크 등" },
    { icon: "🍪", title: "쿠키 제조", desc: "다양한 쿠키류 제조 기술" },
    { icon: "🥧", title: "파이 제조", desc: "파이, 타르트 제조" },
    { icon: "🎂", title: "데코레이션", desc: "아이싱, 장식 기술" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/category/service" className="inline-flex items-center text-pink-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            서비스 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">국가기술자격</span>
            <span className="bg-yellow-400/30 px-4 py-2 rounded-full text-sm font-medium">인기자격</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{examInfo.title}</h1>
          <p className="text-xl text-pink-100 mb-6">{examInfo.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/service/confectioner/exam" className="bg-white text-pink-600 px-8 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors shadow-lg">시험 상세정보</Link>
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-pink-400 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-300 transition-colors">학습 시작하기</Link>
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
          <div className="mt-6 p-4 bg-pink-50 rounded-xl">
            <p className="text-pink-800"><strong>합격기준:</strong> 60문항 중 36문항 이상 정답 (60점 이상)</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-gradient-to-br from-red-400 to-rose-500 text-white p-6 rounded-xl text-center hover:from-red-500 hover:to-rose-600 transition-colors">
              <div className="text-3xl mb-2">🦠</div>
              <div className="font-bold">식품위생학</div>
              <div className="text-sm text-red-100">50문항</div>
            </Link>
            <Link href="/category/service/confectioner/study/food-science" className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-6 rounded-xl text-center hover:from-green-500 hover:to-emerald-600 transition-colors">
              <div className="text-3xl mb-2">🧬</div>
              <div className="font-bold">식품학</div>
              <div className="text-sm text-green-100">50문항</div>
            </Link>
            <Link href="/category/service/confectioner/study/nutrition" className="bg-gradient-to-br from-orange-400 to-amber-500 text-white p-6 rounded-xl text-center hover:from-orange-500 hover:to-amber-600 transition-colors">
              <div className="text-3xl mb-2">🥗</div>
              <div className="font-bold">영양학</div>
              <div className="text-sm text-orange-100">50문항</div>
            </Link>
            <Link href="/category/service/confectioner/study/baking-theory" className="bg-gradient-to-br from-pink-400 to-rose-500 text-white p-6 rounded-xl text-center hover:from-pink-500 hover:to-rose-600 transition-colors">
              <div className="text-3xl mb-2">🍰</div>
              <div className="font-bold">제과이론</div>
              <div className="text-sm text-pink-100">50문항</div>
            </Link>
            <Link href="/category/service/confectioner/study/practical" className="bg-gradient-to-br from-purple-400 to-violet-500 text-white p-6 rounded-xl text-center hover:from-purple-500 hover:to-violet-600 transition-colors">
              <div className="text-3xl mb-2">👨‍🍳</div>
              <div className="font-bold">실기</div>
              <div className="text-sm text-purple-100">20품목</div>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-pink-600 mb-2">필기시험</h3>
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
                <li>• 시험시간: 2~4시간</li>
                <li>• 제과 제품 제조</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-fuchsia-600 mb-2">응시자격</h3>
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
