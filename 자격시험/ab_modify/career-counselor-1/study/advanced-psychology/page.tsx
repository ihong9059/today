"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdvancedPsychologyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "직업심리검사의 개발과 해석",
      description: "심리검사 개발 과정과 결과 해석의 심화",
      questions: [
        "심리검사 개발의 표준화 절차를 설명하시오.",
        "검사의 규준(norm) 개발 과정과 유형을 설명하시오.",
        "백분위 점수와 표준점수의 차이와 변환 방법을 설명하시오.",
        "검사 프로파일 해석의 원리와 방법을 설명하시오.",
        "컴퓨터화 적응검사(CAT)의 원리와 특징을 설명하시오.",
        "문항반응이론(IRT)의 기본 가정과 모형을 설명하시오.",
        "검사의 편향(bias)과 공정성 이슈를 설명하시오.",
        "다특질-다방법 행렬(MTMM)의 활용을 설명하시오.",
        "검사결과 피드백 제공 방법과 윤리적 고려사항을 설명하시오.",
        "직업적성검사와 흥미검사의 통합적 해석 방법을 설명하시오.",
      ],
    },
    {
      title: "진로발달이론의 심화",
      description: "주요 진로발달이론의 심층 분석",
      questions: [
        "수퍼(Super)의 자아개념 발달과 진로성숙의 관계를 설명하시오.",
        "고트프레드슨(Gottfredson)의 제한-타협 이론을 설명하시오.",
        "렌트(Lent)의 진로자기효능감 발달 과정을 설명하시오.",
        "사비카스(Savickas)의 진로구성이론의 핵심 요소를 설명하시오.",
        "관계적 진로이론(RCT)의 핵심 원리를 설명하시오.",
        "진로정체감의 발달과 측정 방법을 설명하시오.",
        "성인 진로발달의 특징과 과제를 설명하시오.",
        "진로장벽의 유형과 극복 전략을 설명하시오.",
        "일-가정 양립과 진로발달의 관계를 설명하시오.",
        "진로적응성(career adaptability)의 4차원을 설명하시오.",
      ],
    },
    {
      title: "직업적응이론과 연구",
      description: "직업적응 관련 이론과 연구 동향",
      questions: [
        "도스-로퀴스트(Dawis-Lofquist)의 직업적응이론(TWA)을 설명하시오.",
        "직업만족과 조직몰입의 관계를 설명하시오.",
        "직무스트레스의 원인과 대처전략을 설명하시오.",
        "번아웃(burnout)의 증상과 예방법을 설명하시오.",
        "직장 내 대인관계 갈등과 해결 방안을 설명하시오.",
        "직업전환 과정에서의 심리적 적응을 설명하시오.",
        "퇴직 적응과 심리적 변화 과정을 설명하시오.",
        "원격근무가 직업적응에 미치는 영향을 설명하시오.",
        "세대 간 직업가치관 차이와 조직적응을 설명하시오.",
        "직업적응력의 개념과 측정 방법을 설명하시오.",
      ],
    },
    {
      title: "직업흥미·적성의 고급분석",
      description: "흥미와 적성의 심층 분석 기법",
      questions: [
        "홀랜드(Holland) 유형의 일치도(congruence) 계산법을 설명하시오.",
        "스트롱직업흥미검사(SII)의 척도 구성과 해석을 설명하시오.",
        "흥미의 안정성과 변화 가능성에 대해 설명하시오.",
        "적성과 능력의 차이와 측정 방법을 설명하시오.",
        "다중지능이론과 진로상담에의 적용을 설명하시오.",
        "창의성과 직업선택의 관계를 설명하시오.",
        "정서지능과 직업적응의 관계를 설명하시오.",
        "흥미와 적성의 불일치 시 상담 전략을 설명하시오.",
        "흥미발달에 영향을 미치는 요인들을 설명하시오.",
        "적성검사 결과와 실제 수행의 관계를 설명하시오.",
      ],
    },
    {
      title: "심리측정학적 이론",
      description: "측정이론의 심층 이해",
      questions: [
        "고전검사이론(CTT)의 기본 가정과 한계를 설명하시오.",
        "신뢰도의 유형별 특징과 추정 방법을 설명하시오.",
        "타당도의 유형과 검증 방법을 설명하시오.",
        "구인타당도(construct validity) 검증 절차를 설명하시오.",
        "측정의 표준오차(SEM)의 개념과 활용을 설명하시오.",
        "요인분석의 유형과 절차를 설명하시오.",
        "확인적 요인분석(CFA)의 적합도 지수를 설명하시오.",
        "측정동등성(measurement invariance)의 개념과 검증을 설명하시오.",
        "문항분석의 방법과 활용을 설명하시오.",
        "검사의 진단적 활용을 위한 절단점 설정 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `직업상담사 1급 고급직업심리학 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 실제 적용 예시를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">고급직업심리학</h1>
          <p className="text-xl text-violet-100">
            직업심리검사 개발·해석과 심리측정 이론의 심화
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
            <p className="text-3xl font-bold text-blue-600">42%</p>
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
