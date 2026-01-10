"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConfectionerExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/confectioner" className="inline-flex items-center text-pink-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제과기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 상세정보</h1>
          <p className="text-xl text-pink-200">제과기능사 필기/실기 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("written")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "written" ? "bg-pink-500 text-white" : "bg-white text-gray-600 hover:bg-pink-50"}`}>필기시험</button>
          <button onClick={() => setActiveTab("practical")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "practical" ? "bg-rose-500 text-white" : "bg-white text-gray-600 hover:bg-rose-50"}`}>실기시험</button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-pink-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">문항수</p><p className="text-2xl font-bold text-pink-600">60문항</p></div>
                <div className="bg-rose-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-rose-600">60분</p></div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-fuchsia-600">60점</p></div>
                <div className="bg-purple-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험방식</p><p className="text-2xl font-bold text-purple-600">CBT</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">출제 과목</h2>
              <div className="space-y-3">
                {[
                  { name: "과자류재료", questions: 20, desc: "밀가루, 설탕, 유지류, 달걀 등 재료 특성" },
                  { name: "제조 및 위생관리", questions: 40, desc: "제조공정, 식품위생, 개인위생, HACCP" },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div><h3 className="font-bold text-gray-800">{subject.name}</h3><p className="text-sm text-gray-600">{subject.desc}</p></div>
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">주요 출제 내용</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-pink-700 mb-2">과자류 재료</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 밀가루의 종류와 특성</li>
                    <li>• 설탕, 유지류의 역할</li>
                    <li>• 달걀의 기능성</li>
                    <li>• 팽창제의 종류</li>
                  </ul>
                </div>
                <div className="bg-rose-50 rounded-lg p-4">
                  <h3 className="font-bold text-rose-700 mb-2">제조 공정</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 반죽법 (크림법, 별립법)</li>
                    <li>• 굽기 온도와 시간</li>
                    <li>• 제품별 제조 공정</li>
                    <li>• 품질 관리</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험형태</p><p className="text-2xl font-bold text-rose-600">작업형</p></div>
                <div className="bg-pink-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-pink-600">2~4시간</p></div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-fuchsia-600">60점</p></div>
                <div className="bg-purple-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">출제품목</p><p className="text-2xl font-bold text-purple-600">20종</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 품목 (20종)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "마데라컵케이크", "파운드케이크", "버터스펀지케이크", "시폰케이크",
                  "젤리롤케이크", "소프트롤케이크", "브라우니", "과일케이크",
                  "마들렌", "다쿠아즈", "슈", "사과파이",
                  "타르트", "쿠키(버터쿠키)", "쿠키(스노볼)", "쿠키(아몬드튀일)",
                  "초코머핀", "호두파이", "치즈케이크", "무스케이크"
                ].map((item, i) => (
                  <div key={i} className="bg-pink-50 p-3 rounded-lg text-gray-700 flex items-center gap-3">
                    <span className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{i + 1}</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">채점 기준</h2>
              <div className="space-y-3">
                {[
                  { name: "위생상태", weight: 10, desc: "복장, 개인위생, 작업대 청결" },
                  { name: "작업순서", weight: 20, desc: "재료계량, 반죽, 성형 순서" },
                  { name: "제품외관", weight: 30, desc: "모양, 색상, 크기 균일성" },
                  { name: "제품내상", weight: 25, desc: "기공, 조직, 촉감" },
                  { name: "맛/풍미", weight: 15, desc: "맛의 조화, 향" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{item.name}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-pink-400 to-rose-500" style={{ width: `${item.weight}%` }} /></div>
                    <span className="w-12 text-right font-bold text-pink-600">{item.weight}%</span>
                    <span className="w-44 text-xs text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6">
              <h3 className="font-bold text-pink-800 mb-3">실기시험 준비물</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">👨‍🍳</span><p className="text-sm mt-1">위생복/위생모</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">⚖️</span><p className="text-sm mt-1">전자저울</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥣</span><p className="text-sm mt-1">볼/거품기</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧤</span><p className="text-sm mt-1">오븐장갑</p></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-4 text-center transition-colors"><span className="text-red-700 font-medium">식품위생학</span></Link>
            <Link href="/category/service/confectioner/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/confectioner/study/nutrition" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-4 text-center transition-colors"><span className="text-orange-700 font-medium">영양학</span></Link>
            <Link href="/category/service/confectioner/study/baking-theory" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-4 text-center transition-colors"><span className="text-pink-700 font-medium">제과이론</span></Link>
            <Link href="/category/service/confectioner/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors"><span className="text-purple-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
