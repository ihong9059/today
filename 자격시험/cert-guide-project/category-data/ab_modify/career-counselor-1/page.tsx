"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareerCounselor1Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `직업상담사 1급 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/category/education"
            className="inline-flex items-center text-violet-100 hover:text-white mb-6 transition-colors"
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
            교육 분야
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">💼</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">직업상담사 1급</h1>
              <p className="text-xl text-violet-100">Career Counselor Level 1</p>
              <p className="text-violet-100 mt-2">
                고급 직업상담 이론과 기법으로 진로·취업 문제 해결 및 프로그램 개발
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-2xl font-bold text-violet-600">★★★★☆</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">연간 응시자</p>
            <p className="text-2xl font-bold text-violet-600">약 5천명</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격률</p>
            <p className="text-2xl font-bold text-violet-600">1차 25% / 2차 35%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">응시료</p>
            <p className="text-2xl font-bold text-violet-600">53,000원</p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자격 개요</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            직업상담사 1급은 직업상담 분야의 최고급 국가기술자격으로, 고급 상담이론과 기법을 활용하여
            복잡한 진로·취업 문제를 해결하고, 직업상담 프로그램을 개발·운영하는 전문가입니다.
            고용노동부, 지방고용센터, 대학교, 인력개발원 등에서 활동합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-violet-50 rounded-lg p-4">
              <h3 className="font-semibold text-violet-800 mb-2">주요 업무</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 고급 직업상담 및 진로설계</li>
                <li>• 직업상담 프로그램 개발·운영</li>
                <li>• 직업심리검사 실시 및 해석</li>
                <li>• 상담사 슈퍼비전 및 교육</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">취업 분야</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 고용노동부, 지방고용센터</li>
                <li>• 대학교 취업지원센터</li>
                <li>• 직업훈련기관, 인력개발원</li>
                <li>• 기업 인사·교육부서</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exam Structure */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 구성</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1차 시험 */}
            <div className="border border-violet-200 rounded-xl p-4">
              <h3 className="font-bold text-violet-800 mb-3 text-lg">1차 시험 (필기)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">문항수</span>
                  <span className="font-medium">125문항 (과목당 25문항)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">시험시간</span>
                  <span className="font-medium">150분</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">합격기준</span>
                  <span className="font-medium">평균 60점, 과목당 40점 이상</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">응시료</span>
                  <span className="font-medium">26,000원</span>
                </div>
              </div>
            </div>
            {/* 2차 시험 */}
            <div className="border border-purple-200 rounded-xl p-4">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">2차 시험 (실기)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">유형</span>
                  <span className="font-medium">논술형 (주관식)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">시험시간</span>
                  <span className="font-medium">3시간</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">합격기준</span>
                  <span className="font-medium">60점 이상</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">응시료</span>
                  <span className="font-medium">27,000원</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 font-medium">
              💡 1차 합격 후 2년간 1차 시험 면제 (2차만 응시 가능)
            </p>
          </div>
        </div>

        {/* 1차 Subjects */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1차 시험 과목 (5과목)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-violet-50">
                  <th className="px-4 py-3 text-left text-violet-800">과목</th>
                  <th className="px-4 py-3 text-left text-violet-800">주요 내용</th>
                  <th className="px-4 py-3 text-center text-violet-800">문항</th>
                  <th className="px-4 py-3 text-center text-violet-800">난이도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium">고급직업상담학</td>
                  <td className="px-4 py-3 text-sm text-gray-600">상담이론 심화, 수퍼비전, 윤리</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center text-red-500">★★★★☆</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">고급직업심리학</td>
                  <td className="px-4 py-3 text-sm text-gray-600">심리검사 개발, 연구방법론</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center text-red-500">★★★★★</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">고급직업정보론</td>
                  <td className="px-4 py-3 text-sm text-gray-600">직업분류 고급, 정보시스템 구축</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center text-orange-500">★★★★☆</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">노동시장론</td>
                  <td className="px-4 py-3 text-sm text-gray-600">노동경제학 심화, 고용정책</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center text-orange-500">★★★★☆</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">노동관계법규</td>
                  <td className="px-4 py-3 text-sm text-gray-600">판례 중심, 노동법 심화</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center text-red-500">★★★★★</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Study Links */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/category/education/career-counselor-1/study/advanced-counseling"
              className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition border border-violet-100"
            >
              <h3 className="font-bold text-violet-800">고급직업상담학</h3>
              <p className="text-sm text-gray-600 mt-1">상담이론 심화, 수퍼비전, 윤리</p>
              <span className="text-violet-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-psychology"
              className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition border border-violet-100"
            >
              <h3 className="font-bold text-violet-800">고급직업심리학</h3>
              <p className="text-sm text-gray-600 mt-1">심리검사 개발, 연구방법론</p>
              <span className="text-violet-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-job-info"
              className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition border border-violet-100"
            >
              <h3 className="font-bold text-violet-800">고급직업정보론</h3>
              <p className="text-sm text-gray-600 mt-1">직업분류 고급, 정보시스템</p>
              <span className="text-violet-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/labor-market"
              className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition border border-violet-100"
            >
              <h3 className="font-bold text-violet-800">노동시장론</h3>
              <p className="text-sm text-gray-600 mt-1">노동경제학 심화, 고용정책</p>
              <span className="text-violet-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/labor-law"
              className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition border border-violet-100"
            >
              <h3 className="font-bold text-violet-800">노동관계법규</h3>
              <p className="text-sm text-gray-600 mt-1">판례 중심, 노동법 심화</p>
              <span className="text-violet-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/practical"
              className="block p-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl hover:shadow-md transition border border-purple-100"
            >
              <h3 className="font-bold text-purple-800">실기 (2차)</h3>
              <p className="text-sm text-gray-600 mt-1">논술형 대비, 사례분석</p>
              <span className="text-purple-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
          </div>
        </div>

        {/* Study Order */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">추천 학습 순서</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-violet-50 rounded-lg">
              <div className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">상담 이론 기초 (1-2주)</h3>
                <p className="text-gray-600 text-sm">고급직업상담학 → 기본 상담이론과 윤리 학습</p>
                <p className="text-gray-500 text-xs mt-1">2급에서 배운 내용의 심화 학습</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">심리검사와 연구방법 (2-3주)</h3>
                <p className="text-gray-600 text-sm">고급직업심리학 → 검사 개발, 타당도, 신뢰도</p>
                <p className="text-gray-500 text-xs mt-1">연구방법론과 통계 개념 집중 학습</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-fuchsia-50 rounded-lg">
              <div className="bg-fuchsia-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">노동 관련 과목 (2-3주)</h3>
                <p className="text-gray-600 text-sm">노동시장론 → 노동관계법규</p>
                <p className="text-gray-500 text-xs mt-1">판례와 노동경제학 심화 학습</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg">
              <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">직업정보와 실기 대비 (2-3주)</h3>
                <p className="text-gray-600 text-sm">고급직업정보론 → 실기 논술 연습</p>
                <p className="text-gray-500 text-xs mt-1">사례분석과 논술 작성 연습</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Helper */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-violet-100 mb-4">
            어려운 개념이나 이론이 있으신가요? AI에게 질문해보세요!
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "평행과정(Parallel Process)",
              "직업심리검사 개발 절차",
              "노동시장 이중구조론",
              "부당해고 구제절차",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleAIHelper(topic)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2026년 시험 일정</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">회차</th>
                  <th className="px-4 py-3 text-left">원서접수</th>
                  <th className="px-4 py-3 text-left">시험일</th>
                  <th className="px-4 py-3 text-left">합격발표</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">1회차 (1차)</td>
                  <td className="px-4 py-3">2026.01.06 ~ 01.09</td>
                  <td className="px-4 py-3 text-violet-600 font-medium">2026.02.08 (토)</td>
                  <td className="px-4 py-3">2026.03.12</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-medium">1회차 (2차)</td>
                  <td className="px-4 py-3">2026.03.24 ~ 03.27</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">2026.04.26 (일)</td>
                  <td className="px-4 py-3">2026.06.05</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">2회차 (1차)</td>
                  <td className="px-4 py-3">2026.07.13 ~ 07.16</td>
                  <td className="px-4 py-3 text-violet-600 font-medium">2026.08.08 (토)</td>
                  <td className="px-4 py-3">2026.09.04</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-medium">2회차 (2차)</td>
                  <td className="px-4 py-3">2026.09.14 ~ 09.17</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">2026.10.17 (일)</td>
                  <td className="px-4 py-3">2026.11.27</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">※ 연 2회 시험, 정확한 일정은 Q-Net 확인</p>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">응시자격</h2>
          <div className="space-y-3">
            <div className="p-4 bg-violet-50 rounded-lg">
              <h3 className="font-semibold text-violet-800 mb-2">기본 응시자격 (택 1)</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 직업상담사 2급 취득 후 해당 실무 3년 이상</li>
                <li>• 관련학과 대졸 후 해당 실무 5년 이상</li>
                <li>• 해당 실무 7년 이상</li>
                <li>• 고용노동부장관이 인정하는 자</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">관련 학과</h3>
              <p className="text-gray-700 text-sm">
                심리학, 교육학, 사회학, 경영학, 행정학, 사회복지학 등 고용노동부령으로 정하는 학과
              </p>
            </div>
          </div>
        </div>

        {/* 2급 Link */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-teal-800 mb-1">직업상담사 2급부터 시작하기</h3>
              <p className="text-sm text-teal-600">2급 취득 후 실무 3년이면 1급 응시자격 획득</p>
            </div>
            <Link
              href="/category/education/career-counselor-2"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              2급 보기 →
            </Link>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Claude
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  ChatGPT
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors"
                >
                  Gemini
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
