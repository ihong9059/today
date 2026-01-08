"use client";

import { useState } from "react";
import Link from "next/link";

export default function SocialWorker1ExamPage() {
  const [activeTab, setActiveTab] = useState<"first" | "second" | "third">("first");

  const firstSubjects = [
    {
      name: "인간행동과 사회환경",
      questions: 25,
      topics: [
        "인간발달의 개념과 원리",
        "프로이트의 정신분석이론",
        "에릭슨의 심리사회적 발달이론",
        "피아제의 인지발달이론",
        "스키너의 행동주의이론",
        "반두라의 사회학습이론",
        "체계이론과 생태체계이론",
        "사회환경의 수준별 체계",
      ],
      difficulty: "중상",
      passRate: "60%",
    },
    {
      name: "사회복지조사론",
      questions: 25,
      topics: [
        "과학적 조사의 특징",
        "조사설계의 유형",
        "측정과 척도의 유형",
        "표집방법 (확률/비확률)",
        "자료수집방법",
        "신뢰도와 타당도",
        "통계분석의 기초",
        "조사연구의 윤리",
      ],
      difficulty: "상",
      passRate: "55%",
    },
  ];

  const secondSubjects = [
    {
      name: "사회복지실천론",
      questions: 25,
      topics: [
        "사회복지실천의 역사와 가치",
        "통합적 접근방법",
        "관계형성 기술",
        "면접의 기술",
        "사회복지실천과정",
        "사정과 개입",
        "사례관리",
        "기록",
      ],
      difficulty: "중",
      passRate: "65%",
    },
    {
      name: "사회복지실천기술론",
      questions: 25,
      topics: [
        "정신역동모델",
        "심리사회모델",
        "인지행동모델",
        "과제중심모델",
        "위기개입모델",
        "집단사회사업",
        "가족치료",
        "사례관리실천",
      ],
      difficulty: "중상",
      passRate: "58%",
    },
    {
      name: "지역사회복지론",
      questions: 25,
      topics: [
        "지역사회복지의 이론",
        "지역사회조직화",
        "사회행동",
        "지역사회복지실천모델",
        "사회복지관 운영",
        "지역사회보장계획",
        "자원봉사와 후원",
        "네트워크와 협력",
      ],
      difficulty: "중",
      passRate: "62%",
    },
  ];

  const thirdSubjects = [
    {
      name: "사회복지정책론",
      questions: 25,
      topics: [
        "사회복지정책의 개념",
        "복지국가의 유형",
        "사회보장제도",
        "국민연금제도",
        "건강보험제도",
        "고용보험제도",
        "산재보험제도",
        "공공부조제도",
      ],
      difficulty: "상",
      passRate: "52%",
    },
    {
      name: "사회복지행정론",
      questions: 25,
      topics: [
        "사회복지행정의 개념",
        "조직이론",
        "기획과 의사결정",
        "인적자원관리",
        "재정관리",
        "프로그램 평가",
        "마케팅과 홍보",
        "정보관리시스템",
      ],
      difficulty: "중",
      passRate: "60%",
    },
    {
      name: "사회복지법제론",
      questions: 25,
      topics: [
        "사회보장기본법",
        "사회복지사업법",
        "국민기초생활보장법",
        "아동복지법",
        "노인복지법",
        "장애인복지법",
        "한부모가족지원법",
        "긴급복지지원법",
      ],
      difficulty: "상",
      passRate: "50%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/category/welfare/social-worker-1"
            className="inline-flex items-center text-pink-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">사회복지사 1급 시험 안내</h1>
          <p className="text-xl text-pink-100">3교시 8과목 200문항 상세 정보</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("first")}
            className={`py-4 px-6 font-semibold text-lg transition-colors ${
              activeTab === "first"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500 hover:text-pink-600"
            }`}
          >
            1교시 (기초)
          </button>
          <button
            onClick={() => setActiveTab("second")}
            className={`py-4 px-6 font-semibold text-lg transition-colors ${
              activeTab === "second"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500 hover:text-pink-600"
            }`}
          >
            2교시 (실천)
          </button>
          <button
            onClick={() => setActiveTab("third")}
            className={`py-4 px-6 font-semibold text-lg transition-colors ${
              activeTab === "third"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500 hover:text-pink-600"
            }`}
          >
            3교시 (정책)
          </button>
        </div>

        {/* First Period */}
        {activeTab === "first" && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1교시: 사회복지기초</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항수</p>
                  <p className="text-2xl font-bold text-pink-600">50문항</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-pink-600">50분</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-pink-600">2과목</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과락기준</p>
                  <p className="text-2xl font-bold text-pink-600">10점 미만</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {firstSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {subject.questions}문항
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        subject.difficulty === "상" ? "bg-red-100 text-red-700" :
                        subject.difficulty === "중상" ? "bg-orange-100 text-orange-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        난이도: {subject.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        합격률: {subject.passRate}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">주요 출제 내용</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second Period */}
        {activeTab === "second" && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2교시: 사회복지실천</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항수</p>
                  <p className="text-2xl font-bold text-rose-600">75문항</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-rose-600">75분</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-rose-600">3과목</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과락기준</p>
                  <p className="text-2xl font-bold text-rose-600">10점 미만</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {secondSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {subject.questions}문항
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        subject.difficulty === "상" ? "bg-red-100 text-red-700" :
                        subject.difficulty === "중상" ? "bg-orange-100 text-orange-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        난이도: {subject.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        합격률: {subject.passRate}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">주요 출제 내용</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Third Period */}
        {activeTab === "third" && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3교시: 사회복지정책과제도</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항수</p>
                  <p className="text-2xl font-bold text-fuchsia-600">75문항</p>
                </div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-fuchsia-600">75분</p>
                </div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-fuchsia-600">3과목</p>
                </div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과락기준</p>
                  <p className="text-2xl font-bold text-fuchsia-600">10점 미만</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {thirdSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {subject.questions}문항
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        subject.difficulty === "상" ? "bg-red-100 text-red-700" :
                        subject.difficulty === "중상" ? "bg-orange-100 text-orange-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        난이도: {subject.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        합격률: {subject.passRate}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">주요 출제 내용</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Links */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/category/welfare/social-worker-1/study/human-behavior" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-pink-700 font-semibold">인간행동과 사회환경</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/research" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-pink-700 font-semibold">사회복지조사론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/practice" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-rose-700 font-semibold">사회복지실천론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/practice-skills" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-rose-700 font-semibold">사회복지실천기술론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/community" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-rose-700 font-semibold">지역사회복지론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-fuchsia-700 font-semibold">사회복지정책론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/administration" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-fuchsia-700 font-semibold">사회복지행정론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/law" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-fuchsia-700 font-semibold">사회복지법제론</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
