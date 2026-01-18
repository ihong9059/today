"use client";

import { useState } from "react";
import Link from "next/link";

export default function BeautySkinExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "피부학",
      questions: 15,
      time: "15분",
      passRate: "52%",
      difficulty: "★★★☆☆",
      topics: [
        "피부의 구조와 기능",
        "표피·진피·피하조직",
        "피부의 부속기관",
        "피부 유형과 특성",
        "피부 노화의 원인",
        "자외선과 피부",
        "피부 면역과 방어",
        "피부 생리학",
      ],
      tips: "표피 5층 구조와 각 층의 기능을 반드시 암기하세요.",
      link: "/category/service/beauty-skin/study/skin-science",
    },
    {
      name: "피부분석학",
      questions: 15,
      time: "15분",
      passRate: "50%",
      difficulty: "★★★☆☆",
      topics: [
        "피부 상태 분석법",
        "문진과 촉진",
        "확대경 분석",
        "피부 측정 기기",
        "피부 타입 진단",
        "트러블 피부 분석",
        "피부 상담 기록",
        "맞춤 관리 계획",
      ],
      tips: "4가지 피부 타입(건성, 지성, 복합성, 민감성)의 특징과 관리법을 구분하세요.",
      link: "/category/service/beauty-skin/study/skin-analysis",
    },
    {
      name: "얼굴관리",
      questions: 15,
      time: "15분",
      passRate: "48%",
      difficulty: "★★★★☆",
      topics: [
        "클렌징의 종류와 방법",
        "딥클렌징 기법",
        "매뉴얼 테크닉(마사지)",
        "림프 드레나쥬",
        "팩과 마스크",
        "기기 관리",
        "눈썹 정리",
        "특수 관리",
      ],
      tips: "매뉴얼 테크닉의 5가지 기본 동작(경찰법, 강찰법, 유연법, 고타법, 진동법)을 숙지하세요.",
      link: "/category/service/beauty-skin/study/facial-care",
    },
    {
      name: "전신관리",
      questions: 15,
      time: "15분",
      passRate: "47%",
      difficulty: "★★★★☆",
      topics: [
        "바디 마사지 기법",
        "등 관리",
        "다리·팔 관리",
        "복부 관리",
        "제모의 종류와 방법",
        "왁싱 기법",
        "체형 관리",
        "아로마 테라피",
      ],
      tips: "제모(왁싱) 시 털이 자라는 방향과 반대로 떼어내는 것을 기억하세요.",
      link: "/category/service/beauty-skin/study/body-care",
    },
  ];

  const practicalItems = [
    {
      name: "클렌징",
      time: "10분",
      weight: "15%",
      difficulty: "★★★☆☆",
      desc: "포인트 메이크업 + 전체 클렌징",
      frequency: "매회",
    },
    {
      name: "딥클렌징",
      time: "10분",
      weight: "10%",
      difficulty: "★★★☆☆",
      desc: "스크럽, 효소, 고마쥬 등",
      frequency: "매회",
    },
    {
      name: "매뉴얼 테크닉 (얼굴)",
      time: "25분",
      weight: "25%",
      difficulty: "★★★★☆",
      desc: "얼굴·목·데콜테 마사지",
      frequency: "매회",
    },
    {
      name: "팩/마스크",
      time: "15분",
      weight: "10%",
      difficulty: "★★★☆☆",
      desc: "모델링 마스크, 시트 마스크 등",
      frequency: "매회",
    },
    {
      name: "눈썹 정리",
      time: "10분",
      weight: "10%",
      difficulty: "★★★★☆",
      desc: "왁스 또는 족집게 사용",
      frequency: "자주",
    },
    {
      name: "등 관리",
      time: "20분",
      weight: "15%",
      difficulty: "★★★★☆",
      desc: "등 클렌징 + 마사지",
      frequency: "자주",
    },
    {
      name: "다리 관리",
      time: "15분",
      weight: "10%",
      difficulty: "★★★☆☆",
      desc: "하체 마사지 + 관리",
      frequency: "자주",
    },
    {
      name: "마무리",
      time: "5분",
      weight: "5%",
      difficulty: "★★☆☆☆",
      desc: "정리 및 상담",
      frequency: "매회",
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
              href="/category/service/beauty-skin"
              className="text-gray-500 hover:text-gray-700"
            >
              미용사(피부)
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-purple-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💆‍♀️</span>
            <div>
              <h1 className="text-3xl font-bold">미용사(피부) 시험 상세</h1>
              <p className="text-purple-100">필기시험 & 실기시험 출제 기준</p>
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
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab("practical")}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === "practical"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🧴 실기시험
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
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">60문항</div>
                  <div className="text-sm text-gray-600">총 문항 수</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">60분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">60점</div>
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
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
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
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm whitespace-nowrap">
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
                      <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                        {subject.tips}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pass Strategy */}
            <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-6 border border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                🎯 필기시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-purple-700">✅ 필수 암기 항목</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      표피의 5층 구조: 각질층, 투명층, 과립층, 유극층, 기저층
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      피부 유형별 특징과 관리 방법
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      매뉴얼 테크닉 5가지 기본 동작
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      공중위생관리법 주요 조항
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-fuchsia-700">⚠️ 주의 사항</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      과락 40점 미만 시 불합격
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      화장품 성분과 효능 혼동 주의
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      피부 타입별 관리법 구분
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      기기 사용법과 금기사항 숙지
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
                🧴 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-fuchsia-50 rounded-xl">
                  <div className="text-2xl font-bold text-fuchsia-600">작업형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-fuchsia-50 rounded-xl">
                  <div className="text-2xl font-bold text-fuchsia-600">약 2시간 30분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-fuchsia-50 rounded-xl">
                  <div className="text-2xl font-bold text-fuchsia-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
                <div className="text-center p-4 bg-fuchsia-50 rounded-xl">
                  <div className="text-2xl font-bold text-fuchsia-600">29,500원</div>
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
                          <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 rounded text-xs">
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
                  <h3 className="font-bold text-purple-700 mb-3">클렌징/관리 도구</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      클렌징 제품 (폼, 밀크, 오일 등)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      스폰지, 해면, 화장솜
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      딥클렌징 제품 (스크럽, 고마쥬 등)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      마사지 크림/오일
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      팩/마스크 (모델링, 시트 등)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-fuchsia-700 mb-3">기타 도구</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                      눈썹 정리 도구 (왁스, 족집게)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                      붓, 브러시, 스파출라
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                      타월 (대·중·소)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                      거즈, 일회용 장갑
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                      앞치마, 깔끔한 복장
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>필수:</strong> 실제 모델(사람)을 직접 섭외해야 합니다!
                  시험장에서 모델을 제공하지 않습니다.
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
                  { category: "테크닉 정확성", weight: 35, desc: "마사지 동작, 압력, 리듬의 정확성" },
                  { category: "시술 순서", weight: 25, desc: "정해진 순서대로 시술 진행" },
                  { category: "위생 및 청결", weight: 20, desc: "도구 관리, 위생 준수" },
                  { category: "시간 준수", weight: 10, desc: "제한 시간 내 완료 여부" },
                  { category: "고객 응대", weight: 10, desc: "모델 배려, 전문성 표현" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-gray-700">
                      {item.category}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-4 rounded-full"
                            style={{ width: `${item.weight}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-purple-600 w-12">
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
            <div className="bg-gradient-to-r from-fuchsia-50 to-purple-50 rounded-2xl p-6 border border-fuchsia-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                💡 실기시험 합격 팁
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-fuchsia-700">✅ 합격 비결</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      최소 30회 이상 모델 실습 필수
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      시간 단축 연습: 실제 시험의 80%로
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      마사지 동작의 리듬과 압력 일정하게
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500">•</span>
                      모델과 사전 연습으로 호흡 맞추기
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-purple-700">❌ 감점 요소</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      순서 누락 또는 건너뛰기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      불균형한 압력과 속도
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      시간 초과 (큰 감점)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      위생 관리 소홀
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Link */}
            <Link href="/category/service/beauty-skin/study/practical">
              <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-2xl p-6 hover:from-purple-700 hover:to-fuchsia-600 transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">
                  🧴 실기시험 문제 연습하기
                </h3>
                <p className="text-purple-100">
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
            © 2026 자격증 가이드. 미용사(피부) 시험 상세 페이지
          </p>
        </div>
      </footer>
    </div>
  );
}
