"use client";

import { useState } from "react";
import Link from "next/link";

export default function SocialWorker1Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `사회복지사 1급 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/category/welfare"
            className="inline-flex items-center text-pink-100 hover:text-white mb-6 transition-colors"
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
            사회복지·상담 분야
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🤝</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">사회복지사 1급</h1>
              <p className="text-xl text-pink-100">Social Worker Level 1</p>
              <p className="text-pink-100 mt-2">
                사회복지 전문가로서 정책 수립, 프로그램 개발·평가, 시설 운영
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
            <p className="text-2xl font-bold text-pink-600">★★★★☆</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">연간 응시자</p>
            <p className="text-2xl font-bold text-pink-600">약 3만명</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격률</p>
            <p className="text-2xl font-bold text-pink-600">약 35%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">응시료</p>
            <p className="text-2xl font-bold text-pink-600">32,000원</p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자격 개요</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            사회복지사 1급은 사회복지 분야의 최상위 국가자격증으로, 사회복지 정책 수립,
            프로그램 개발 및 평가, 사회복지시설 운영 등 전문적인 업무를 수행합니다.
            복지관, 병원, 학교, 기업, 공공기관 등 다양한 분야에서 활동할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-lg p-4">
              <h3 className="font-semibold text-pink-800 mb-2">주요 업무</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 사회복지 프로그램 기획·개발·평가</li>
                <li>• 복지시설 운영 및 관리</li>
                <li>• 사회복지 정책 연구 및 자문</li>
                <li>• 사례관리 및 슈퍼비전</li>
              </ul>
            </div>
            <div className="bg-rose-50 rounded-lg p-4">
              <h3 className="font-semibold text-rose-800 mb-2">취업 분야</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 사회복지관, 노인복지시설</li>
                <li>• 장애인복지시설, 아동복지시설</li>
                <li>• 의료사회복지사 (병원)</li>
                <li>• 학교사회복지사, 기업복지담당</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exam Structure */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 구성</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-pink-50">
                  <th className="px-4 py-3 text-left text-pink-800">교시</th>
                  <th className="px-4 py-3 text-left text-pink-800">영역</th>
                  <th className="px-4 py-3 text-left text-pink-800">과목</th>
                  <th className="px-4 py-3 text-center text-pink-800">문항수</th>
                  <th className="px-4 py-3 text-center text-pink-800">시간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium" rowSpan={2}>1교시</td>
                  <td className="px-4 py-3" rowSpan={2}>사회복지기초</td>
                  <td className="px-4 py-3">인간행동과 사회환경</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center" rowSpan={2}>50분</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">사회복지조사론</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium" rowSpan={3}>2교시</td>
                  <td className="px-4 py-3" rowSpan={3}>사회복지실천</td>
                  <td className="px-4 py-3">사회복지실천론</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center" rowSpan={3}>75분</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">사회복지실천기술론</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">지역사회복지론</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium" rowSpan={3}>3교시</td>
                  <td className="px-4 py-3" rowSpan={3}>사회복지정책과제도</td>
                  <td className="px-4 py-3">사회복지정책론</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center" rowSpan={3}>75분</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">사회복지행정론</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">사회복지법제론</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-pink-100 font-semibold">
                  <td className="px-4 py-3" colSpan={3}>합계</td>
                  <td className="px-4 py-3 text-center">200문항</td>
                  <td className="px-4 py-3 text-center">200분</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 font-medium">
              💡 합격기준: 총점 60% 이상 (120점), 과목당 40% 이상 (10점)
            </p>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/category/welfare/social-worker-1/study/human-behavior"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">인간행동과 사회환경</h3>
              <p className="text-sm text-gray-600 mt-1">발달이론, 성격이론, 체계이론</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/research"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지조사론</h3>
              <p className="text-sm text-gray-600 mt-1">조사설계, 측정, 표집, 통계분석</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/practice"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지실천론</h3>
              <p className="text-sm text-gray-600 mt-1">실천과정, 면접기술, 사례관리</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/practice-skills"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지실천기술론</h3>
              <p className="text-sm text-gray-600 mt-1">상담기법, 집단사회사업, 가족치료</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/community"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">지역사회복지론</h3>
              <p className="text-sm text-gray-600 mt-1">지역사회조직, 사회행동, 네트워크</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/policy"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지정책론</h3>
              <p className="text-sm text-gray-600 mt-1">복지국가, 사회보장, 정책분석</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/administration"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지행정론</h3>
              <p className="text-sm text-gray-600 mt-1">조직관리, 인사관리, 재정관리</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
            <Link
              href="/category/welfare/social-worker-1/study/law"
              className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition border border-pink-100"
            >
              <h3 className="font-bold text-pink-800">사회복지법제론</h3>
              <p className="text-sm text-gray-600 mt-1">사회보장법, 복지서비스법</p>
              <span className="text-pink-600 text-sm font-medium mt-2 inline-block">학습하기 →</span>
            </Link>
          </div>
        </div>

        {/* Study Order */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">추천 학습 순서</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg">
              <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">기초 다지기 (1-2주)</h3>
                <p className="text-gray-600 text-sm">인간행동과 사회환경 → 사회복지실천론</p>
                <p className="text-gray-500 text-xs mt-1">사회복지의 기본 철학과 이론적 토대 학습</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-rose-50 rounded-lg">
              <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">실천 영역 (2-3주)</h3>
                <p className="text-gray-600 text-sm">사회복지실천기술론 → 지역사회복지론</p>
                <p className="text-gray-500 text-xs mt-1">실제 현장에서 적용되는 기술과 방법 학습</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-fuchsia-50 rounded-lg">
              <div className="bg-fuchsia-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">정책 및 제도 (2-3주)</h3>
                <p className="text-gray-600 text-sm">사회복지정책론 → 사회복지행정론 → 사회복지법제론</p>
                <p className="text-gray-500 text-xs mt-1">사회복지 제도와 법률, 행정 체계 이해</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">조사방법론 (1-2주)</h3>
                <p className="text-gray-600 text-sm">사회복지조사론</p>
                <p className="text-gray-500 text-xs mt-1">연구방법론과 통계 개념 집중 학습</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Helper */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-pink-100 mb-4">
            어려운 개념이나 이론이 있으신가요? AI에게 질문해보세요!
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "인간행동 발달이론",
              "사회복지실천 과정",
              "사례관리 모델",
              "사회보장제도",
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
                  <td className="px-4 py-3 font-medium">제24회</td>
                  <td className="px-4 py-3">2025.12.02 ~ 12.13</td>
                  <td className="px-4 py-3 text-pink-600 font-medium">2026.01.24 (토)</td>
                  <td className="px-4 py-3">2026.02.14</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">※ 연 1회 시험 (매년 1월 넷째주 토요일)</p>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">응시자격</h2>
          <div className="space-y-3">
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">기본 응시자격 (택 1)</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 대학원에서 사회복지학 또는 사회사업학을 전공하고 석사학위 이상 취득</li>
                <li>• 대학에서 사회복지학, 사회사업학 전공 후 학사학위 취득</li>
                <li>• 학점은행제로 사회복지학 전공 학사학위 취득</li>
                <li>• 사회복지사 2급 자격 취득 후 1년 이상 실무경력</li>
              </ul>
            </div>
            <div className="p-4 bg-rose-50 rounded-lg">
              <h3 className="font-semibold text-rose-800 mb-2">필수 이수과목</h3>
              <p className="text-gray-700 text-sm">
                사회복지학 전공필수 10과목, 선택 4과목 이상 이수 및 현장실습 120시간 이상
              </p>
            </div>
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
