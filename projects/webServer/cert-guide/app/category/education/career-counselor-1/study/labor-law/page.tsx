"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function LaborLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "근로기준법 심화",
      description: "근로기준법의 핵심 내용과 실무적 적용",
      questions: [
        "근로기준법의 적용범위와 적용 예외를 설명하시오.",
        "근로계약의 성립요건과 효력을 설명하시오.",
        "해고의 정당성 요건을 판례를 통해 설명하시오.",
        "경영상 해고(정리해고)의 요건을 설명하시오.",
        "근로시간의 개념과 산정 방법을 설명하시오.",
        "유연근로시간제의 유형과 도입요건을 설명하시오.",
        "연장·야간·휴일근로와 가산수당을 설명하시오.",
        "연차유급휴가의 발생요건과 사용 촉진제도를 설명하시오.",
        "임금의 개념과 통상임금·평균임금의 차이를 설명하시오.",
        "취업규칙의 작성·변경 절차와 효력을 설명하시오.",
      ],
    },
    {
      title: "노동조합법",
      description: "노동조합 및 노동관계조정법의 이해",
      questions: [
        "노동3권의 헌법적 보장과 제한을 설명하시오.",
        "노동조합의 설립요건과 설립신고 절차를 설명하시오.",
        "단체교섭의 대상과 성실교섭의무를 설명하시오.",
        "단체협약의 효력과 일반적 구속력을 설명하시오.",
        "쟁의행위의 정당성 요건을 설명하시오.",
        "부당노동행위의 유형과 구제절차를 설명하시오.",
        "노동쟁의 조정제도의 유형을 설명하시오.",
        "노동위원회의 구성과 역할을 설명하시오.",
        "필수유지업무제도를 설명하시오.",
        "복수노조와 교섭창구 단일화 제도를 설명하시오.",
      ],
    },
    {
      title: "고용보험법 및 산재보험법",
      description: "사회보험법의 핵심 내용",
      questions: [
        "고용보험의 적용범위와 피보험자격을 설명하시오.",
        "실업급여의 수급요건과 급여수준을 설명하시오.",
        "육아휴직급여와 출산전후휴가급여를 설명하시오.",
        "고용안정·직업능력개발사업의 내용을 설명하시오.",
        "모성보호급여제도의 종류와 내용을 설명하시오.",
        "산업재해보상보험의 적용범위를 설명하시오.",
        "업무상 재해의 인정기준을 설명하시오.",
        "산재보험급여의 종류와 내용을 설명하시오.",
        "통근재해의 인정요건을 설명하시오.",
        "사업주의 고용보험료와 산재보험료 부담을 설명하시오.",
      ],
    },
    {
      title: "직업안정법",
      description: "직업소개 및 고용서비스 관련 법규",
      questions: [
        "직업안정법의 목적과 기본원칙을 설명하시오.",
        "공공 직업안정기관의 종류와 역할을 설명하시오.",
        "민간 직업소개사업의 허가요건을 설명하시오.",
        "유료직업소개사업의 규제 내용을 설명하시오.",
        "근로자파견사업의 허가요건과 제한을 설명하시오.",
        "근로자파견 대상업무의 범위를 설명하시오.",
        "직업소개 및 직업상담원의 자격요건을 설명하시오.",
        "근로자공급사업의 금지와 예외를 설명하시오.",
        "취업알선 수수료의 규제 내용을 설명하시오.",
        "온라인 취업플랫폼 관련 규제를 설명하시오.",
      ],
    },
    {
      title: "고용정책 관련 법규",
      description: "고용정책기본법 및 관련 법률",
      questions: [
        "고용정책기본법의 목적과 기본원칙을 설명하시오.",
        "고용정책심의회의 구성과 역할을 설명하시오.",
        "고용영향평가제도의 내용을 설명하시오.",
        "청년고용촉진특별법의 주요 내용을 설명하시오.",
        "고령자고용촉진법의 주요 내용을 설명하시오.",
        "장애인고용촉진법의 의무고용제도를 설명하시오.",
        "남녀고용평등법의 주요 내용을 설명하시오.",
        "직장 내 성희롱 예방 및 처리 절차를 설명하시오.",
        "경력단절여성 지원정책의 내용을 설명하시오.",
        "기간제 및 단시간근로자 보호법의 주요 내용을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `직업상담사 1급 노동관계법규 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 법률 조문, 판례, 실무 적용 사례를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">노동관계법규</h1>
          <p className="text-xl text-violet-100">
            노동법 및 고용정책 관련 법률의 심층 이해
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
            <p className="text-3xl font-bold text-yellow-600">중</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">52%</p>
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
              href="/category/education/career-counselor-1/study/labor-market"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">노동시장론</span>
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
