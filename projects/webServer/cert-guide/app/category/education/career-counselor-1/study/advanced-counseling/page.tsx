"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function AdvancedCounselingStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "직업상담 이론의 심화",
      description: "다양한 직업상담 이론의 심층적 이해와 적용",
      questions: [
        "특성-요인 이론의 핵심 가정과 한계점을 설명하시오.",
        "홀랜드(Holland)의 직업적 성격유형 6가지를 설명하시오.",
        "수퍼(Super)의 생애진로발달이론의 5단계를 설명하시오.",
        "사회인지진로이론(SCCT)의 핵심 요소를 설명하시오.",
        "구성주의 진로상담의 특징과 접근방법을 설명하시오.",
        "크럼볼츠(Krumboltz)의 사회학습이론을 설명하시오.",
        "인지적 정보처리 접근(CIP)의 피라미드 모델을 설명하시오.",
        "진로의사결정 이론의 유형별 특징을 비교하시오.",
        "관계적 진로상담의 핵심 원리를 설명하시오.",
        "카오스이론과 진로상담의 연결점을 설명하시오.",
      ],
    },
    {
      title: "상담기법의 고급 활용",
      description: "다양한 상담기법의 심층적 활용과 통합",
      questions: [
        "인간중심상담의 핵심 조건 3가지를 상세히 설명하시오.",
        "인지행동상담에서 사용하는 인지적 재구조화 기법을 설명하시오.",
        "해결중심단기상담의 핵심 질문기법들을 설명하시오.",
        "동기강화상담(MI)의 4가지 과정을 설명하시오.",
        "게슈탈트 상담기법 중 빈의자 기법의 활용법을 설명하시오.",
        "현실치료에서 WDEP 시스템을 설명하시오.",
        "이야기치료(Narrative Therapy)의 핵심 개념을 설명하시오.",
        "다문화 상담에서 고려해야 할 요소들을 설명하시오.",
        "상담에서 저항을 다루는 방법을 설명하시오.",
        "상담관계 형성을 위한 라포(rapport) 형성 기법을 설명하시오.",
      ],
    },
    {
      title: "집단상담 및 프로그램 개발",
      description: "집단상담의 이론과 실제, 프로그램 설계",
      questions: [
        "집단상담의 발달단계와 각 단계별 리더의 역할을 설명하시오.",
        "집단역동의 개념과 집단상담에서의 활용방법을 설명하시오.",
        "구조화 집단상담과 비구조화 집단상담을 비교하시오.",
        "진로집단상담 프로그램의 설계 절차를 설명하시오.",
        "집단상담에서 나타날 수 있는 문제상황과 대처방법을 설명하시오.",
        "취업준비 집단상담 프로그램의 구성요소를 설명하시오.",
        "집단상담에서 피드백을 제공하는 효과적인 방법을 설명하시오.",
        "온라인 집단상담의 특징과 유의점을 설명하시오.",
        "집단상담 효과를 평가하는 방법을 설명하시오.",
        "집단원 선발 기준과 집단 구성 원리를 설명하시오.",
      ],
    },
    {
      title: "상담윤리와 전문성",
      description: "직업상담사의 윤리강령과 전문성 발달",
      questions: [
        "직업상담사 윤리강령의 주요 내용을 설명하시오.",
        "상담에서 비밀보장의 원칙과 그 예외상황을 설명하시오.",
        "이중관계(dual relationship)의 개념과 윤리적 문제를 설명하시오.",
        "상담기록의 보관 및 관리에 관한 윤리적 지침을 설명하시오.",
        "내담자의 자기결정권과 상담사의 역할을 설명하시오.",
        "상담사의 전문성 발달 단계를 설명하시오.",
        "슈퍼비전의 목적과 방법을 설명하시오.",
        "상담사의 자기돌봄(self-care)의 중요성을 설명하시오.",
        "온라인 상담의 윤리적 고려사항을 설명하시오.",
        "다문화 상담에서의 윤리적 이슈를 설명하시오.",
      ],
    },
    {
      title: "상담사례 분석 및 슈퍼비전",
      description: "사례개념화와 슈퍼비전 실제",
      questions: [
        "사례개념화(case conceptualization)의 절차와 방법을 설명하시오.",
        "상담목표 설정 시 SMART 원칙의 적용방법을 설명하시오.",
        "상담과정 평가를 위한 척도들을 설명하시오.",
        "내담자 문제의 다차원적 평가 방법을 설명하시오.",
        "상담성과 평가의 다양한 방법을 설명하시오.",
        "슈퍼비전의 유형과 각각의 특징을 설명하시오.",
        "동료 슈퍼비전의 장단점을 설명하시오.",
        "상담 축어록 분석 방법을 설명하시오.",
        "상담에서 전이와 역전이를 다루는 방법을 설명하시오.",
        "상담종결 시 고려해야 할 사항들을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `직업상담사 1급 고급직업상담학 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 실제 적용 예시를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">고급직업상담학</h1>
          <p className="text-xl text-violet-100">
            직업상담 이론의 심화와 고급 상담기법 학습
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
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">45%</p>
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
