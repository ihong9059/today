"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookChineseExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-chinese" className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            중식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 상세정보</h1>
          <p className="text-xl text-red-200">중식조리기능사 필기/실기 시험 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("written")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "written" ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-red-50"}`}>필기시험</button>
          <button onClick={() => setActiveTab("practical")} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${activeTab === "practical" ? "bg-rose-600 text-white" : "bg-white text-gray-600 hover:bg-rose-50"}`}>실기시험</button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">문항수</p><p className="text-2xl font-bold text-red-600">60문항</p></div>
                <div className="bg-rose-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-rose-600">60분</p></div>
                <div className="bg-pink-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-pink-600">60점</p></div>
                <div className="bg-orange-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험방식</p><p className="text-2xl font-bold text-orange-600">CBT</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">출제 과목</h2>
              <div className="space-y-3">
                {[
                  { name: "식품위생 및 법규", questions: 15, desc: "식품위생법, HACCP, 식중독, 개인위생" },
                  { name: "식품학", questions: 15, desc: "영양소, 식품성분, 조리 시 변화" },
                  { name: "조리이론과 원가계산", questions: 15, desc: "중식조리법, 스톡, 원가계산" },
                  { name: "공중보건학", questions: 15, desc: "보건행정, 역학, 환경위생" },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div><h3 className="font-bold text-gray-800">{subject.name}</h3><p className="text-sm text-gray-600">{subject.desc}</p></div>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">CBT 시험 안내</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-red-500">•</span>상시시험으로 원하는 날짜/시간 선택 가능</li>
                <li className="flex items-start gap-2"><span className="text-red-500">•</span>컴퓨터로 응시하며 마우스로 정답 클릭</li>
                <li className="flex items-start gap-2"><span className="text-red-500">•</span>신분증 필수 지참 (주민등록증, 운전면허증 등)</li>
                <li className="flex items-start gap-2"><span className="text-red-500">•</span>시험 종료 후 즉시 결과 확인 가능</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험형태</p><p className="text-2xl font-bold text-rose-600">작업형</p></div>
                <div className="bg-pink-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">시험시간</p><p className="text-2xl font-bold text-pink-600">70분</p></div>
                <div className="bg-red-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">합격기준</p><p className="text-2xl font-bold text-red-600">60점</p></div>
                <div className="bg-orange-50 rounded-lg p-4 text-center"><p className="text-sm text-gray-600">출제품목</p><p className="text-2xl font-bold text-orange-600">30종</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 품목 (30종)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["짜장면", "짬뽕", "울면", "유니짜장", "볶음밥", "새우볶음밥", "탕수육", "깐풍기", "라조기", "유린기", "깐쇼새우", "고추잡채", "팔보채", "해파리냉채", "양장피", "오이냉국", "삼선짬뽕", "사천탕면", "물만두", "군만두", "마파두부", "어향육사", "난자완스", "송이덮밥", "잡채밥", "부추잡채", "홍소두부", "해삼전복탕", "유산슬", "경장육사"].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg text-center text-gray-700">{item}</div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">채점 기준</h2>
              <div className="space-y-3">
                {[
                  { name: "위생상태", weight: 20, desc: "개인위생, 복장, 조리대 청결" },
                  { name: "조리과정", weight: 30, desc: "재료손질, 불조절, 조리순서" },
                  { name: "완성품", weight: 40, desc: "맛, 색, 형태, 분량, 온도" },
                  { name: "정리정돈", weight: 10, desc: "설거지, 쓰레기처리" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{item.name}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-red-500 to-rose-500" style={{ width: `${item.weight}%` }} /></div>
                    <span className="w-12 text-right font-bold text-red-600">{item.weight}%</span>
                    <span className="w-40 text-xs text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3">중식조리 필수 도구</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥘</span><p className="text-sm mt-1">웍(중화팬)</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔪</span><p className="text-sm mt-1">중식도</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥄</span><p className="text-sm mt-1">국자/뒤지개</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥢</span><p className="text-sm mt-1">긴 젓가락</p></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-4 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-chinese/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-chinese/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-chinese/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
            <Link href="/category/service/cook-chinese/study/practical" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-4 text-center transition-colors"><span className="text-rose-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
