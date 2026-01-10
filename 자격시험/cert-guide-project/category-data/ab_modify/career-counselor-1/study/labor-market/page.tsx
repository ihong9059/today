"use client";

import { useState } from "react";
import Link from "next/link";

export default function LaborMarketStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "노동시장 이론과 분석",
      description: "노동시장의 기본 이론과 분석 방법론",
      questions: [
        "노동시장의 특성과 일반시장과의 차이를 설명하시오.",
        "내부노동시장과 외부노동시장의 개념을 비교 설명하시오.",
        "분절노동시장이론의 핵심 개념을 설명하시오.",
        "노동시장 이중구조론의 원인과 결과를 설명하시오.",
        "노동시장 유연성의 유형과 효과를 설명하시오.",
        "인적자본이론의 핵심 가정과 비판을 설명하시오.",
        "직무탐색이론(Job Search Theory)의 핵심 내용을 설명하시오.",
        "효율임금이론의 주요 가설을 설명하시오.",
        "암묵적 계약이론의 핵심 내용을 설명하시오.",
        "노동시장 신호이론(Signaling Theory)을 설명하시오.",
      ],
    },
    {
      title: "노동수요와 공급",
      description: "노동시장에서의 수요와 공급 메커니즘",
      questions: [
        "노동수요의 결정요인을 설명하시오.",
        "노동수요의 파생적 성격을 설명하시오.",
        "단기 노동수요곡선과 장기 노동수요곡선의 차이를 설명하시오.",
        "노동수요의 탄력성에 영향을 미치는 요인을 설명하시오.",
        "노동공급의 결정요인을 설명하시오.",
        "개인 노동공급곡선의 후방굴절 현상을 설명하시오.",
        "소득효과와 대체효과가 노동공급에 미치는 영향을 설명하시오.",
        "노동력 참가율의 결정요인을 설명하시오.",
        "여성 노동공급의 특성과 결정요인을 설명하시오.",
        "고령자 노동공급의 특성을 설명하시오.",
      ],
    },
    {
      title: "임금결정 이론",
      description: "임금의 결정 원리와 임금구조",
      questions: [
        "한계생산력이론에 따른 임금결정을 설명하시오.",
        "임금격차의 발생 원인을 설명하시오.",
        "보상적 임금격차(compensating wage differentials)를 설명하시오.",
        "인적자본과 임금의 관계를 설명하시오.",
        "최저임금제도의 효과와 논쟁을 설명하시오.",
        "생산성과 임금의 관계를 설명하시오.",
        "성별 임금격차의 원인과 해소 방안을 설명하시오.",
        "연공급과 직무급의 특징을 비교하시오.",
        "성과급제의 유형과 효과를 설명하시오.",
        "임금피크제의 도입 배경과 효과를 설명하시오.",
      ],
    },
    {
      title: "노동시장 정책",
      description: "노동시장 관련 정책의 이해",
      questions: [
        "적극적 노동시장정책(ALMP)의 유형과 효과를 설명하시오.",
        "소극적 노동시장정책의 유형을 설명하시오.",
        "고용보험제도의 구성과 기능을 설명하시오.",
        "실업급여제도의 효과와 문제점을 설명하시오.",
        "직업훈련정책의 유형과 효과를 설명하시오.",
        "고용장려금 정책의 효과를 설명하시오.",
        "취업취약계층 지원정책의 종류를 설명하시오.",
        "청년고용정책의 현황과 과제를 설명하시오.",
        "고령자 고용정책의 주요 내용을 설명하시오.",
        "일·생활 균형 정책의 효과를 설명하시오.",
      ],
    },
    {
      title: "고용구조와 변화",
      description: "고용형태의 다양화와 노동시장 변화",
      questions: [
        "비정규직 고용의 유형과 특성을 설명하시오.",
        "플랫폼 노동의 개념과 특징을 설명하시오.",
        "기간제 근로와 파견근로의 법적 차이를 설명하시오.",
        "기술변화가 고용구조에 미치는 영향을 설명하시오.",
        "고용의 양극화 현상과 원인을 설명하시오.",
        "실업의 유형별 특성과 대책을 설명하시오.",
        "자연실업률(NAIRU)의 개념과 결정요인을 설명하시오.",
        "청년실업의 원인과 대책을 설명하시오.",
        "고령자 고용의 현황과 과제를 설명하시오.",
        "원격근무가 노동시장에 미치는 영향을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `직업상담사 1급 노동시장론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 정책적 시사점을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

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
          <h1 className="text-4xl font-bold mb-4">노동시장론</h1>
          <p className="text-xl text-violet-100">
            노동시장의 이론과 정책에 대한 심층 이해
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-violet-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">중상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">50%</p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedTopic(expandedTopic === index ? null : index)
                }
                className="w-full p-6 flex justify-between items-center hover:bg-violet-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
                    {topic.questions.length}문항
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      expandedTopic === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li
                        key={qIndex}
                        className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg"
                      >
                        <div className="flex items-start gap-3">
                          <span className="bg-violet-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button
                          onClick={() => handleAIHelper(question)}
                          className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:from-violet-600 hover:to-purple-600 transition-colors"
                        >
                          AI 도움
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Other Subjects */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            다른 과목 학습하기
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="/category/education/career-counselor-1/study/advanced-counseling"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">고급직업상담학</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-psychology"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">고급직업심리학</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/advanced-job-info"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">고급직업정보론</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/labor-law"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">노동관계법규</span>
            </Link>
            <Link
              href="/category/education/career-counselor-1/study/practical"
              className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-purple-700 font-medium">실기 (논술)</span>
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
                <h3 className="text-xl font-bold text-gray-800">
                  AI 도우미 선택
                </h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  <span>Claude</span>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  <span>ChatGPT</span>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors"
                >
                  <span>Gemini</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
