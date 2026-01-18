"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookWesternExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "식품위생 및 법규",
      items: 15,
      passRate: "50%",
      difficulty: "중",
      topics: ["식품위생법", "HACCP 제도", "식품표시기준", "식중독 예방", "개인위생관리", "조리장 위생", "식품첨가물", "유통기한 관리"],
      tips: "식품위생법 조문과 HACCP 7원칙이 핵심. 식중독균 종류와 예방법 필수 암기.",
      href: "/category/service/cook-western/study/food-hygiene"
    },
    {
      name: "식품학",
      items: 15,
      passRate: "46%",
      difficulty: "중상",
      topics: ["탄수화물", "단백질", "지방", "비타민", "무기질", "식품의 색", "식품의 맛", "식품의 저장"],
      tips: "영양소별 특성, 식품 성분의 변화, 조리 시 변화 이해 필요.",
      href: "/category/service/cook-western/study/food-science"
    },
    {
      name: "조리이론과 원가계산",
      items: 15,
      passRate: "52%",
      difficulty: "중",
      topics: ["양식 조리법", "스톡과 소스", "계량 단위", "원가계산 공식", "손익분기점", "재료비 계산", "조리기기 관리", "메뉴 관리"],
      tips: "5대 모체소스, 스톡 종류 암기. 원가계산 공식 완벽 숙지.",
      href: "/category/service/cook-western/study/cooking-theory"
    },
    {
      name: "공중보건학",
      items: 15,
      passRate: "56%",
      difficulty: "중하",
      topics: ["보건행정", "역학개론", "감염병관리", "환경위생", "산업보건", "식품과 건강", "보건통계", "건강증진"],
      tips: "감염병 종류와 관리, 환경위생 기준이 자주 출제.",
      href: "/category/service/cook-western/study/public-health"
    }
  ];

  const practicalItems = [
    { category: "수프류", items: ["콘소메 수프", "피시 차우더", "포타주 수프", "미네스트로네"], points: "맑은 수프의 투명도, 농도 조절" },
    { category: "소스류", items: ["브라운 소스", "화이트 소스", "홀란다이즈", "토마토 소스"], points: "루(Roux) 농도, 유화 안정성" },
    { category: "육류", items: ["비프 스테이크", "비프 커틀릿", "폭 커틀릿", "치킨 커틀릿"], points: "굽기 정도, 빵가루 코팅" },
    { category: "해산물", items: ["생선 뫼니에르", "생선 필레", "관자 버터구이", "새우 요리"], points: "비린내 제거, 익힘 정도" },
    { category: "에그류", items: ["플레인 오믈렛", "스페니시 오믈렛", "포치드 에그", "스크램블 에그"], points: "모양, 익힘 정도, 식감" },
    { category: "샐러드", items: ["시저 샐러드", "발도프 샐러드", "포테이토 샐러드", "해산물 샐러드"], points: "드레싱 배합, 재료 손질" },
    { category: "파스타", items: ["스파게티 카르보나라", "봉골레", "알리오 올리오"], points: "면 삶기, 소스 농도" },
    { category: "기타", items: ["샌드위치", "카나페", "BLT 샌드위치"], points: "빵 선택, 재료 배치" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/service" className="text-gray-500 hover:text-gray-700">서비스</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/service/cook-western" className="text-gray-500 hover:text-gray-700">양식조리기능사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/category/service/cook-western" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            양식조리기능사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">시험 상세 정보</h1>
          <p className="text-indigo-100">필기시험과 실기시험의 상세 구성 및 합격 전략</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("written")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "written" ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-indigo-50"}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab("practical")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "practical" ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-indigo-50"}`}>👨‍🍳 실기시험</button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">과목 수</p><p className="text-2xl font-bold text-indigo-600">4과목</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">총 문항</p><p className="text-2xl font-bold text-indigo-600">60문항</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">시험 시간</p><p className="text-2xl font-bold text-indigo-600">60분</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">응시료</p><p className="text-2xl font-bold text-indigo-600">14,500원</p></div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg"><p className="text-blue-800"><strong>합격 기준:</strong> 과목당 40점 이상(과락), 전 과목 평균 60점 이상</p></div>
            </div>

            <div className="space-y-6">
              {writtenSubjects.map((subject, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div><h3 className="text-xl font-bold">{i + 1}과목. {subject.name}</h3><p className="text-indigo-100 text-sm">{subject.items}문항 | 난이도: {subject.difficulty} | 평균합격률: {subject.passRate}</p></div>
                      <Link href={subject.href} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition">학습하기 →</Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">출제 토픽</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">{subject.topics.map((topic, j) => (<span key={j} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm text-center">{topic}</span>))}</div>
                    <div className="bg-indigo-50 rounded-lg p-4"><p className="text-sm text-indigo-700"><strong>💡 합격 TIP:</strong> {subject.tips}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">시험 형태</p><p className="text-2xl font-bold text-indigo-600">작업형</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">시험 시간</p><p className="text-2xl font-bold text-indigo-600">70분 내외</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">출제 품목</p><p className="text-2xl font-bold text-indigo-600">30종</p></div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center"><p className="text-gray-600 text-sm">응시료</p><p className="text-2xl font-bold text-indigo-600">29,600원</p></div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg"><p className="text-blue-800"><strong>합격 기준:</strong> 100점 만점 중 60점 이상</p></div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 출제 품목 (30종)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {practicalItems.map((group, i) => (
                  <div key={i} className="border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-bold text-indigo-600 mb-2">{group.category}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">{group.items.map((item, j) => (<span key={j} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-sm">{item}</span>))}</div>
                    <p className="text-xs text-gray-500">💡 {group.points}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 실기시험 채점 기준</h2>
              <div className="space-y-4">
                {[
                  { name: "위생상태", weight: 20, desc: "복장, 개인위생, 조리대 청결" },
                  { name: "조리과정", weight: 30, desc: "재료손질, 조리순서, 불조절" },
                  { name: "완성품 평가", weight: 40, desc: "맛, 색, 형태, 분량, 온도" },
                  { name: "정리정돈", weight: 10, desc: "조리 후 정리, 설거지" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1"><div className="h-4 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" style={{ width: `${item.weight}%` }} /></div></div>
                    <div className="w-12 text-right font-bold text-indigo-600">{item.weight}%</div>
                    <div className="w-48 text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/category/service/cook-western/study/practical" className="block bg-indigo-600 text-white text-center py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">실기 대비 학습하기 →</Link>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
