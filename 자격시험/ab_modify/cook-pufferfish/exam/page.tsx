"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookPufferfishExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-slate-700 to-zinc-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 상세정보</h1>
          <p className="text-xl text-slate-300">복어조리기능사 필기/실기 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("written")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "written" ? "bg-slate-700 text-white" : "bg-white text-gray-600 hover:bg-slate-50"}`}>필기시험</button>
          <button onClick={() => setActiveTab("practical")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "practical" ? "bg-zinc-700 text-white" : "bg-white text-gray-600 hover:bg-zinc-50"}`}>실기시험</button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">문항수</p><p className="text-2xl font-bold text-slate-600">60문항</p></div>
                <div className="bg-zinc-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-zinc-600">60분</p></div>
                <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-gray-600">60점</p></div>
                <div className="bg-stone-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험방식</p><p className="text-2xl font-bold text-stone-600">CBT</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">출제 과목</h2>
              <div className="space-y-3">
                {[
                  { name: "식품위생 및 법규", questions: 15, desc: "식품위생법, HACCP, 복어 관련 법규" },
                  { name: "식품학", questions: 15, desc: "복어 독소, 영양소, 식품성분" },
                  { name: "조리이론과 원가계산", questions: 15, desc: "복어 손질법, 조리법, 원가계산" },
                  { name: "공중보건학", questions: 15, desc: "보건행정, 역학, 식중독 예방" },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div><h3 className="font-bold text-gray-800">{subject.name}</h3><p className="text-sm text-gray-600">{subject.desc}</p></div>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">CBT 시험 안내</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-slate-500">•</span>상시시험으로 원하는 날짜/시간 선택 가능</li>
                <li className="flex items-start gap-2"><span className="text-slate-500">•</span>컴퓨터로 응시하며 마우스로 정답 클릭</li>
                <li className="flex items-start gap-2"><span className="text-slate-500">•</span>신분증 필수 지참 (주민등록증, 운전면허증 등)</li>
                <li className="flex items-start gap-2"><span className="text-slate-500">•</span>시험 종료 후 즉시 결과 확인 가능</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험형태</p><p className="text-2xl font-bold text-zinc-600">작업형</p></div>
                <div className="bg-slate-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-slate-600">60분</p></div>
                <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-gray-600">60점</p></div>
                <div className="bg-stone-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">핵심과제</p><p className="text-2xl font-bold text-stone-600">독소제거</p></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 border-2 border-red-300">
              <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ 실기시험 핵심: 독소 제거</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-red-700 mb-2">독이 있는 부위</h4>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• <strong>난소(알)</strong> - 가장 독성이 강함</li>
                    <li>• <strong>간장</strong> - 독성이 매우 강함</li>
                    <li>• <strong>피부</strong> - 종류에 따라 독성</li>
                    <li>• <strong>내장</strong> - 제거 필수</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-red-700 mb-2">안전한 부위</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• <strong>근육(살)</strong> - 식용 가능</li>
                    <li>• <strong>정소(이리)</strong> - 식용 가능</li>
                    <li>• <strong>뼈</strong> - 국물용 가능</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 과제</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["복어 손질(독소 제거)", "복어회(테사)", "복어껍질회(가와사시)", "복어튀김", "복어찜", "복어탕(지리)", "복어죽", "복어불고기"].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg text-gray-700 flex items-center gap-3">
                    <span className="bg-slate-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{i + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">채점 기준</h2>
              <div className="space-y-3">
                {[
                  { name: "독소제거", weight: 30, desc: "난소, 간장, 내장 완벽 제거" },
                  { name: "위생상태", weight: 20, desc: "개인위생, 복장, 조리대 청결" },
                  { name: "조리과정", weight: 20, desc: "손질법, 칼질, 조리순서" },
                  { name: "완성품", weight: 20, desc: "맛, 색, 형태, 분량" },
                  { name: "정리정돈", weight: 10, desc: "폐기물 처리, 설거지" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{item.name}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-slate-500 to-zinc-600" style={{ width: `${item.weight}%` }} /></div>
                    <span className="w-12 text-right font-bold text-slate-600">{item.weight}%</span>
                    <span className="w-44 text-xs text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-100 to-zinc-100 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-3">복어 손질 도구</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔪</span><p className="text-sm mt-1">복어전용 칼</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧤</span><p className="text-sm mt-1">위생장갑</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🪣</span><p className="text-sm mt-1">독소폐기통</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧊</span><p className="text-sm mt-1">얼음/냉수</p></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-4 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-pufferfish/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/practical" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 text-center transition-colors"><span className="text-slate-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
