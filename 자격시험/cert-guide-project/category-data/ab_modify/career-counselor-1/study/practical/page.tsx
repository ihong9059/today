"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "상담사례 분석 및 처치계획",
      description: "실제 상담사례 분석과 개입 전략 수립",
      questions: [
        "다음 사례를 읽고 내담자의 핵심 문제를 파악하여 사례개념화를 작성하시오.",
        "제시된 상담사례에서 내담자에게 적합한 상담목표를 설정하시오.",
        "상담과정에서 나타난 내담자의 저항을 분석하고 대처 방안을 제시하시오.",
        "구조화 면접과 비구조화 면접의 장단점을 비교하고 적용 상황을 설명하시오.",
        "상담 초기, 중기, 종결 단계별 상담자의 역할과 과제를 설명하시오.",
        "내담자의 직업결정 수준을 평가하고 적합한 개입 전략을 제시하시오.",
        "상담관계에서 전이와 역전이가 발생했을 때 대처 방안을 설명하시오.",
        "위기상담 상황에서의 즉각적 개입 절차와 방법을 제시하시오.",
        "다문화 내담자 상담 시 고려해야 할 사항과 상담 전략을 설명하시오.",
        "상담 종결 시점의 판단 기준과 종결 과정을 설명하시오.",
      ],
    },
    {
      title: "직업심리검사 해석",
      description: "심리검사 결과의 종합적 해석과 활용",
      questions: [
        "홀랜드 직업흥미검사 결과 프로파일을 해석하고 진로상담에 활용하시오.",
        "MBTI 성격유형검사 결과를 직업선택과 연결하여 해석하시오.",
        "다면적 인성검사(MMPI) 결과를 진로상담 맥락에서 해석하시오.",
        "스트롱 직업흥미검사와 홀랜드 검사의 결과를 통합 해석하시오.",
        "직업적성검사 결과와 직업흥미검사 결과가 불일치할 때의 상담 전략을 제시하시오.",
        "직업가치관 검사 결과를 해석하고 직업선택 상담에 활용하시오.",
        "진로성숙도 검사 결과를 해석하고 발달 단계에 맞는 개입 방안을 제시하시오.",
        "직업선호도 검사(L형)와 직업선호도 검사(S형)의 차이와 활용 방법을 설명하시오.",
        "검사-재검사 신뢰도가 낮게 나온 검사 결과의 해석과 활용 방안을 제시하시오.",
        "복수의 심리검사 결과가 상충될 때 통합 해석 방법을 설명하시오.",
      ],
    },
    {
      title: "직업정보 활용 실무",
      description: "직업정보 수집과 분석, 취업지원 실무",
      questions: [
        "워크넷을 활용한 직업정보 탐색 방법과 상담 활용 전략을 설명하시오.",
        "특정 직업군의 노동시장 현황을 분석하고 진로상담에 활용하시오.",
        "구직자의 특성을 고려한 취업알선 절차와 방법을 설명하시오.",
        "청년 구직자를 위한 취업지원 프로그램을 설계하시오.",
        "경력단절여성의 재취업 지원 상담 전략을 제시하시오.",
        "한국표준직업분류와 한국고용직업분류의 차이점과 활용 방법을 설명하시오.",
        "신직업 발굴을 위한 직업정보 수집 방법과 분석 기법을 제시하시오.",
        "직업사전과 직업전망서의 정보를 상담에 효과적으로 활용하는 방법을 설명하시오.",
        "고령자 고용 촉진을 위한 취업지원 전략을 제시하시오.",
        "장애인 취업지원 시 고려사항과 맞춤형 지원 방안을 설명하시오.",
      ],
    },
    {
      title: "집단상담 프로그램 운영",
      description: "집단상담 기획과 운영 실무",
      questions: [
        "취업준비생을 위한 집단상담 프로그램을 설계하시오.",
        "집단상담에서 갈등상황 발생 시 리더의 개입 전략을 설명하시오.",
        "온라인 집단상담 프로그램의 효과적 운영 방안을 제시하시오.",
        "집단상담 프로그램의 효과성 평가 방법을 설명하시오.",
        "중장년 전직자를 위한 집단상담 프로그램을 설계하시오.",
        "집단 발달 단계별 리더의 역할과 개입 기법을 설명하시오.",
        "집단 내 침묵하는 구성원에 대한 개입 전략을 제시하시오.",
        "집단 응집력 향상을 위한 구체적 활동과 기법을 설명하시오.",
        "구조화된 집단프로그램과 비구조화된 집단프로그램의 장단점을 비교하시오.",
        "집단상담 윤리 원칙과 위반 시 대처 방안을 설명하시오.",
      ],
    },
    {
      title: "법규 적용 및 윤리적 의사결정",
      description: "노동법규 적용과 윤리적 판단",
      questions: [
        "제시된 사례에서 근로기준법 위반 여부를 판단하고 근거를 제시하시오.",
        "직업상담 과정에서 발생할 수 있는 윤리적 딜레마 상황과 대응방안을 설명하시오.",
        "비밀보장 예외 상황에서 상담사의 의사결정 과정을 설명하시오.",
        "고용보험법상 실업급여 수급자격 해당 여부를 판단하시오.",
        "직업소개 과정에서 발생할 수 있는 법적 문제와 예방 방안을 설명하시오.",
        "남녀고용평등법 위반 사례를 분석하고 대응 방안을 제시하시오.",
        "직업안정법상 유료직업소개사업의 금지 행위와 벌칙을 설명하시오.",
        "근로계약 체결 시 필수 기재 사항과 위반 시 효력을 설명하시오.",
        "직업상담사 윤리강령의 주요 내용과 준수 방안을 설명하시오.",
        "다중관계(이중관계) 발생 시 윤리적 의사결정 모델을 적용하여 해결 방안을 제시하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `직업상담사 1급 실기(논술) 문제입니다:\n\n"${question}"\n\n이 논술 문제에 대해 모범답안을 작성해주세요. 서론-본론-결론 구조로, 관련 이론과 실제 적용 사례를 포함하여 작성해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/category/education/career-counselor-1"
            className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition-colors"
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
          <h1 className="text-4xl font-bold mb-4">실기 (논술)</h1>
          <p className="text-xl text-purple-100">
            2차 시험 대비 논술형 문제 연습
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 문항수</p>
            <p className="text-3xl font-bold text-purple-600">5~7문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험시간</p>
            <p className="text-3xl font-bold text-purple-600">150분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험유형</p>
            <p className="text-3xl font-bold text-purple-600">논술형</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격기준</p>
            <p className="text-3xl font-bold text-purple-600">60점 이상</p>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 mb-8 border border-amber-200">
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
            논술 시험 작성 요령
          </h3>
          <ul className="space-y-2 text-amber-900">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              문제의 핵심 키워드와 요구사항을 정확히 파악하세요.
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              서론-본론-결론 구조로 논리적으로 전개하세요.
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              관련 이론과 학자명을 정확히 인용하세요.
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              실제 상담 상황에서의 적용 예시를 포함하세요.
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              시간 배분을 철저히 하여 모든 문항에 답변하세요.
            </li>
          </ul>
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
                className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
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
                  <ul className="space-y-4">
                    {topic.questions.map((question, qIndex) => (
                      <li
                        key={qIndex}
                        className="p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <span className="text-gray-700 font-medium">
                            {question}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleAIHelper(question)}
                            className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-fuchsia-600 transition-colors flex items-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            AI로 모범답안 확인
                          </button>
                        </div>
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
            1차 필기 과목 학습하기
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
              href="/category/education/career-counselor-1/study/labor-law"
              className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"
            >
              <span className="text-violet-700 font-medium">노동관계법규</span>
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
