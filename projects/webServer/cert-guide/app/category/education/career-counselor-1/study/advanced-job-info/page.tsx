"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function AdvancedJobInfoStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "직업정보시스템 구축 및 관리",
      description: "직업정보시스템의 설계와 운영 방법",
      questions: [
        "직업정보시스템의 구성요소와 설계 원리를 설명하시오.",
        "워크넷(Work-Net) 시스템의 기능과 활용 방법을 설명하시오.",
        "고용정보 데이터베이스 구축 절차를 설명하시오.",
        "직업정보의 수집·분석·배포 과정을 설명하시오.",
        "직업정보시스템의 품질관리 방안을 설명하시오.",
        "온라인 직업정보서비스의 특징과 발전방향을 설명하시오.",
        "빅데이터를 활용한 직업정보 분석 방법을 설명하시오.",
        "인공지능 기반 직업추천시스템의 원리를 설명하시오.",
        "직업정보시스템과 진로상담의 연계 방안을 설명하시오.",
        "직업정보시스템의 보안 및 개인정보 보호 방안을 설명하시오.",
      ],
    },
    {
      title: "직업분류체계 심화",
      description: "직업분류의 이론과 체계적 이해",
      questions: [
        "한국표준직업분류(KSCO)의 분류원칙과 체계를 설명하시오.",
        "한국고용직업분류(KECO)의 특징과 활용 방법을 설명하시오.",
        "국제표준직업분류(ISCO)와 한국표준직업분류의 비교를 설명하시오.",
        "직업분류체계의 개정 절차와 원리를 설명하시오.",
        "직업과 직무의 개념적 차이를 설명하시오.",
        "신직업과 소멸직업의 분류 기준을 설명하시오.",
        "직업분류와 직업상담에의 활용 방안을 설명하시오.",
        "O*NET 직업정보시스템의 구조와 특징을 설명하시오.",
        "직업능력수준(Skill Level)의 분류 기준을 설명하시오.",
        "직업분류체계의 한계와 개선방안을 설명하시오.",
      ],
    },
    {
      title: "고용정보 분석 및 활용",
      description: "고용정보의 수집·분석·활용 기법",
      questions: [
        "고용동향 통계의 주요 지표와 해석 방법을 설명하시오.",
        "경제활동인구조사의 주요 개념과 활용을 설명하시오.",
        "산업별·직업별 고용구조 분석 방법을 설명하시오.",
        "지역노동시장 분석의 방법과 활용을 설명하시오.",
        "고용보험통계의 활용 방안을 설명하시오.",
        "임금통계의 종류와 해석 방법을 설명하시오.",
        "청년고용 현황 분석의 주요 지표를 설명하시오.",
        "취업취약계층의 고용현황 분석 방법을 설명하시오.",
        "고용서비스 실적 분석의 방법을 설명하시오.",
        "고용영향평가의 개념과 방법을 설명하시오.",
      ],
    },
    {
      title: "직업전망 및 노동시장 분석",
      description: "미래 직업과 노동시장 변화 예측",
      questions: [
        "직업전망 예측의 방법론을 설명하시오.",
        "한국직업전망서의 활용 방법을 설명하시오.",
        "4차 산업혁명이 직업세계에 미치는 영향을 설명하시오.",
        "기술변화에 따른 직업의 대체 가능성 분석 방법을 설명하시오.",
        "신직업의 발굴과 육성 방안을 설명하시오.",
        "고령화가 노동시장에 미치는 영향을 설명하시오.",
        "글로벌화가 직업구조에 미치는 영향을 설명하시오.",
        "미래직업 역량(Future Work Skills)을 설명하시오.",
        "그린잡(Green Jobs)의 개념과 전망을 설명하시오.",
        "플랫폼 노동의 현황과 과제를 설명하시오.",
      ],
    },
    {
      title: "직업정보 정책 및 제도",
      description: "직업정보 관련 정책과 제도 이해",
      questions: [
        "국가직무능력표준(NCS)의 개념과 활용 방안을 설명하시오.",
        "직업능력개발 정책의 현황과 과제를 설명하시오.",
        "고용서비스 정책의 주요 내용을 설명하시오.",
        "직업훈련제도의 유형과 특징을 설명하시오.",
        "평생경력개발 지원정책을 설명하시오.",
        "일경험(인턴십) 프로그램의 유형과 효과를 설명하시오.",
        "취업지원서비스의 전달체계를 설명하시오.",
        "민간고용서비스 산업의 현황과 과제를 설명하시오.",
        "직업정보제공기관의 역할과 기능을 설명하시오.",
        "고용정보 관련 법규의 주요 내용을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `직업상담사 1급 고급직업정보론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 현행 제도, 실제 활용 예시를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">고급직업정보론</h1>
          <p className="text-xl text-violet-100">
            직업정보시스템 구축과 노동시장 분석의 심화
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
            <p className="text-3xl font-bold text-blue-600">48%</p>
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
              href="/category/education/career-counselor-1/study/labor-market"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">노동시장론</span>
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
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
