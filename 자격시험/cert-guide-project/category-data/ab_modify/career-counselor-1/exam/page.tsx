"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareerCounselor1ExamPage() {
  const [activeTab, setActiveTab] = useState<"first" | "second">("first");

  const firstExamSubjects = [
    {
      name: "고급직업상담학",
      questions: 25,
      time: 25,
      topics: [
        "직업상담 이론의 심화",
        "상담기법의 고급 활용",
        "집단상담 및 프로그램 개발",
        "상담윤리와 전문성",
        "상담사례 분석 및 슈퍼비전",
      ],
      difficulty: "상",
      passRate: "45%",
    },
    {
      name: "고급직업심리학",
      questions: 25,
      time: 25,
      topics: [
        "직업심리검사의 개발과 해석",
        "진로발달이론의 심화",
        "직업적응이론과 연구",
        "직업흥미·적성의 고급분석",
        "심리측정학적 이론",
      ],
      difficulty: "상",
      passRate: "42%",
    },
    {
      name: "고급직업정보론",
      questions: 25,
      time: 25,
      topics: [
        "직업정보시스템 구축 및 관리",
        "직업분류체계 심화",
        "고용정보 분석 및 활용",
        "직업전망 및 노동시장 분석",
        "직업정보 정책 및 제도",
      ],
      difficulty: "중상",
      passRate: "48%",
    },
    {
      name: "노동시장론",
      questions: 25,
      time: 25,
      topics: [
        "노동시장 이론과 분석",
        "노동수요와 공급",
        "임금결정 이론",
        "노동시장 정책",
        "고용구조와 변화",
      ],
      difficulty: "중상",
      passRate: "50%",
    },
    {
      name: "노동관계법규",
      questions: 25,
      time: 25,
      topics: [
        "근로기준법 심화",
        "노동조합법",
        "고용보험법 및 산재보험법",
        "직업안정법",
        "고용정책 관련 법규",
      ],
      difficulty: "중",
      passRate: "52%",
    },
  ];

  const secondExamAreas = [
    {
      name: "직업상담 실무",
      ratio: "40%",
      content: [
        "상담사례 분석 및 처치 계획",
        "내담자 문제 진단",
        "상담기법 적용 및 효과 분석",
        "종합 상담계획 수립",
      ],
    },
    {
      name: "직업심리검사 해석",
      ratio: "30%",
      content: [
        "심리검사 결과 종합해석",
        "검사도구 선정 및 활용",
        "검사결과 기반 진로상담",
        "검사의 신뢰도·타당도 분석",
      ],
    },
    {
      name: "직업정보 활용",
      ratio: "30%",
      content: [
        "직업정보 수집 및 분석",
        "노동시장 동향 분석",
        "취업알선 및 직업소개",
        "직업프로그램 기획·운영",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/category/education/career-counselor-1"
            className="inline-flex items-center text-violet-100 hover:text-white mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            직업상담사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">직업상담사 1급 시험 안내</h1>
          <p className="text-xl text-violet-100">
            1차 필기시험과 2차 논술시험의 상세 정보
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("first")}
            className={`py-4 px-6 font-semibold text-lg transition-colors ${
              activeTab === "first"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-violet-600"
            }`}
          >
            1차 필기시험
          </button>
          <button
            onClick={() => setActiveTab("second")}
            className={`py-4 px-6 font-semibold text-lg transition-colors ${
              activeTab === "second"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-violet-600"
            }`}
          >
            2차 실기시험
          </button>
        </div>

        {/* First Exam Content */}
        {activeTab === "first" && (
          <div>
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1차 시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항수</p>
                  <p className="text-2xl font-bold text-violet-600">125문항</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-violet-600">125분</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-violet-600">
                    평균 60점
                  </p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과락기준</p>
                  <p className="text-2xl font-bold text-violet-600">
                    과목당 40점
                  </p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-6">
              {firstExamSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          {subject.questions}문항
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          {subject.time}분
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          subject.difficulty === "상"
                            ? "bg-red-100 text-red-700"
                            : subject.difficulty === "중상"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        난이도: {subject.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        합격률: {subject.passRate}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      주요 출제 내용
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-violet-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
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

        {/* Second Exam Content */}
        {activeTab === "second" && (
          <div>
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2차 시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험유형</p>
                  <p className="text-2xl font-bold text-purple-600">논술형</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-purple-600">150분</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-purple-600">60점 이상</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">문항수</p>
                  <p className="text-2xl font-bold text-purple-600">5~7문항</p>
                </div>
              </div>
            </div>

            {/* Exam Areas */}
            <div className="space-y-6">
              {secondExamAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{area.name}</h3>
                      <span className="bg-white/20 px-4 py-1 rounded-full">
                        배점 비중: {area.ratio}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      주요 평가 내용
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {area.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            className="w-5 h-5 mr-2 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Essay Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 mt-8 border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                논술 시험 대비 TIP
              </h3>
              <ul className="space-y-2 text-amber-900">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  문제에서 요구하는 핵심 키워드를 명확히 파악하세요.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  서론-본론-결론 구조를 갖추어 논리적으로 작성하세요.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  관련 이론과 실제 사례를 적절히 연결하여 기술하세요.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  시간 배분을 철저히 하여 모든 문항에 답변하세요.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Study Links */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            과목별 학습하기
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/category/education/career-counselor-1/study/advanced-counseling"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-violet-700 font-semibold group-hover:text-violet-800">
                고급직업상담학
              </span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-psychology"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-violet-700 font-semibold group-hover:text-violet-800">
                고급직업심리학
              </span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-job-info"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-violet-700 font-semibold group-hover:text-violet-800">
                고급직업정보론
              </span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/labor-market"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-violet-700 font-semibold group-hover:text-violet-800">
                노동시장론
              </span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/labor-law"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-violet-700 font-semibold group-hover:text-violet-800">
                노동관계법규
              </span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/practical"
              className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors group"
            >
              <span className="text-purple-700 font-semibold group-hover:text-purple-800">
                실기 (논술)
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
