"use client";

import { useState } from "react";
import Link from "next/link";

export default function BeautyGeneralExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "미용이론",
      questions: 15,
      time: "15분",
      passRate: "58%",
      difficulty: "★★★☆☆",
      topics: [
        "미용의 역사와 발전",
        "미용기기 및 도구",
        "고객 상담 및 응대",
        "미용실 경영관리",
        "공중위생관리법",
        "미용업 관련 법규",
        "소독과 위생관리",
        "안전사고 예방",
      ],
      tips: "역사와 법규 부분은 암기 위주로, 최신 개정 법률 확인 필수",
      link: "/category/service/beauty-general/study/hair-theory",
    },
    {
      name: "두피·모발학",
      questions: 15,
      time: "15분",
      passRate: "55%",
      difficulty: "★★★☆☆",
      topics: [
        "두피의 구조와 기능",
        "모발의 구조와 특성",
        "모발의 성장 주기",
        "두피 유형과 관리",
        "탈모의 원인과 종류",
        "모발 손상의 원인",
        "모발 진단법",
        "두피 트러블 관리",
      ],
      tips: "모발의 3층 구조(큐티클, 코텍스, 메듈라)와 케라틴 단백질 중점",
      link: "/category/service/beauty-general/study/scalp-hair",
    },
    {
      name: "헤어 커팅",
      questions: 15,
      time: "15분",
      passRate: "52%",
      difficulty: "★★★★☆",
      topics: [
        "커트의 기본 원리",
        "가위와 도구 사용법",
        "원랭스 커트",
        "그라데이션 커트",
        "레이어 커트",
        "샤기 커트",
        "커트 라인과 각도",
        "섹션 분할과 슬라이스",
      ],
      tips: "각도에 따른 커트 명칭과 효과를 정확히 구분할 것",
      link: "/category/service/beauty-general/study/hair-cutting",
    },
    {
      name: "헤어 펌·염색",
      questions: 15,
      time: "15분",
      passRate: "50%",
      difficulty: "★★★★☆",
      topics: [
        "퍼머넌트 웨이브 원리",
        "콜드펌 vs 열펌",
        "펌 약제(1제, 2제)",
        "로드 선택과 와인딩",
        "염색의 원리",
        "산화염모제와 탈색제",
        "염색 테스트",
        "염색 후 관리",
      ],
      tips: "환원제(1제)와 산화제(2제)의 역할, pH 변화를 정확히 이해",
      link: "/category/service/beauty-general/study/hair-perm",
    },
  ];

  const practicalItems = [
    {
      name: "헤어 커트 (그라데이션)",
      time: "25분",
      weight: "20%",
      difficulty: "★★★★☆",
      desc: "후두부부터 사이드까지 자연스러운 연결",
      frequency: "매회",
    },
    {
      name: "헤어 커트 (레이어)",
      time: "25분",
      weight: "20%",
      difficulty: "★★★★☆",
      desc: "탑부터 네이프까지 층 내기",
      frequency: "매회",
    },
    {
      name: "헤어 커트 (원랭스)",
      time: "20분",
      weight: "15%",
      difficulty: "★★★☆☆",
      desc: "일직선으로 자르기, 길이 일정하게",
      frequency: "자주",
    },
    {
      name: "블로우 드라이 (C컬)",
      time: "15분",
      weight: "10%",
      difficulty: "★★★☆☆",
      desc: "모발 끝을 안쪽으로 말기",
      frequency: "매회",
    },
    {
      name: "블로우 드라이 (S컬)",
      time: "15분",
      weight: "10%",
      difficulty: "★★★★☆",
      desc: "S자 웨이브 만들기",
      frequency: "자주",
    },
    {
      name: "아이론 (직모)",
      time: "10분",
      weight: "5%",
      difficulty: "★★★☆☆",
      desc: "매끄러운 직모 스타일링",
      frequency: "간헐",
    },
    {
      name: "아이론 (웨이브)",
      time: "15분",
      weight: "10%",
      difficulty: "★★★★☆",
      desc: "웨이브 아이론으로 컬 만들기",
      frequency: "자주",
    },
    {
      name: "업스타일",
      time: "20분",
      weight: "10%",
      difficulty: "★★★★★",
      desc: "롤셋팅, 핀컬을 이용한 올림머리",
      frequency: "자주",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              자격증
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/category/service"
              className="text-gray-500 hover:text-gray-700"
            >
              서비스
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/category/service/beauty-general"
              className="text-gray-500 hover:text-gray-700"
            >
              미용사(일반)
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-pink-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💇‍♀️</span>
            <div>
              <h1 className="text-3xl font-bold">미용사(일반) 시험 상세</h1>
              <p className="text-pink-100">필기시험 & 실기시험 출제 기준</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("written")}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === "written"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab("practical")}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === "practical"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ✂️ 실기시험
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Written Exam Tab */}
        {activeTab === "written" && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📋 필기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">60문항</div>
                  <div className="text-sm text-gray-600">총 문항 수</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">60분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            {/* Subject Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                📚 과목별 상세
              </h2>
              {writtenSubjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {idx + 1}. {subject.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                          {subject.questions}문항
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {subject.time}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          합격률 {subject.passRate}
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                          {subject.difficulty}
                        </span>
                      </div>
                    </div>
                    <Link href={subject.link}>
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm whitespace-nowrap">
                        학습하기 →
                      </button>
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        📌 주요 토픽
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, tidx) => (
                          <span
                            key={tidx}
                            className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        💡 학습 팁
                      </h4>
                      <p className="text-sm text-gray-600 bg-pink-50 p-3 rounded-lg">
                        {subject.tips}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pass Strategy */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                🎯 필기시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-pink-700">✅ 필수 암기 항목</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      모발의 3층 구조: 큐티클, 코텍스, 메듈라
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      펌 1제(환원제)와 2제(산화제)의 역할
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      커트 각도별 명칭 (0도, 45도, 90도)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      공중위생관리법 주요 조항
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-rose-700">⚠️ 주의 사항</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      과락 40점 미만 시 불합격
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      비슷한 용어 구분: 콜드펌 vs 열펌
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      수치 문제: pH, 온도, 시간 정확히 암기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      법규 개정 내용 최신 버전 확인
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Tab */}
        {activeTab === "practical" && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ✂️ 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">작업형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">약 2시간</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">35,700원</div>
                  <div className="text-sm text-gray-600">응시료</div>
                </div>
              </div>
            </div>

            {/* Practical Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📋 실기시험 과제 (세부 항목)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">
                        과제명
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700">
                        시간
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700">
                        비중
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700">
                        난이도
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700">
                        출제빈도
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {practicalItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="p-3">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </td>
                        <td className="text-center p-3 text-gray-600">
                          {item.time}
                        </td>
                        <td className="text-center p-3">
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">
                            {item.weight}
                          </span>
                        </td>
                        <td className="text-center p-3 text-yellow-600">
                          {item.difficulty}
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.frequency === "매회"
                                ? "bg-red-100 text-red-700"
                                : item.frequency === "자주"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {item.frequency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Required Tools */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                🛠️ 준비물 (필수 지참)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-pink-700 mb-3">커트 도구</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      미용가위 (5.5~6인치)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      틴닝가위 (숱가위)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      커트빗 (자루빗, 꼬리빗)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      덕빌클립, 집게핀
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      분무기
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-rose-700 mb-3">드라이/아이론 도구</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      드라이기
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      롤브러시 (다양한 사이즈)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      매직기 (스트레이트 아이론)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      컬 아이론 (고데기)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      열보호 스프레이
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>필수:</strong> 마네킹(연습용 위그) 직접 지참! 시험장에서 제공하지 않습니다.
                </p>
              </div>
            </div>

            {/* Scoring Criteria */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📊 채점 기준
              </h2>
              <div className="space-y-4">
                {[
                  { category: "커트 완성도", weight: 35, desc: "라인의 정확성, 균형, 층의 연결" },
                  { category: "기술 숙련도", weight: 25, desc: "가위질 속도, 빗 사용법, 자세" },
                  { category: "스타일링 완성도", weight: 20, desc: "드라이/아이론 결과물 품질" },
                  { category: "위생 및 안전", weight: 10, desc: "도구 관리, 작업 환경 정리" },
                  { category: "시간 준수", weight: 10, desc: "제한 시간 내 완료 여부" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-gray-700">
                      {item.category}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full"
                            style={{ width: `${item.weight}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-pink-600 w-12">
                          {item.weight}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                💡 실기시험 합격 팁
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-rose-700">✅ 합격 비결</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      최소 50회 이상 위그 연습 필수
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      시간 단축 연습: 실제 시험의 80%로
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      섹션 나누기를 정확하게 연습
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      드라이 시 텐션 일정하게 유지
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-pink-700">❌ 감점 요소</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      불균형한 좌우 길이
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      층의 연결이 부자연스러움
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      시간 초과 (큰 감점)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      도구 정리 안함
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Link */}
            <Link href="/category/service/beauty-general/study/practical">
              <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl p-6 hover:from-pink-700 hover:to-rose-600 transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">
                  ✂️ 실기시험 문제 연습하기
                </h3>
                <p className="text-pink-100">
                  50개 실기 관련 문제로 실기시험 대비하기 →
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 자격증 가이드. 미용사(일반) 시험 상세 페이지
          </p>
        </div>
      </footer>
    </div>
  );
}
