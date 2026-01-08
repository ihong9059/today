"use client";

import { useState } from "react";
import Link from "next/link";

export default function HumanBehaviorStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "인간발달의 개념과 원리",
      description: "발달의 정의, 원리, 단계별 특성",
      questions: [
        "인간발달의 개념과 발달심리학의 연구영역을 설명하시오.",
        "발달의 일반적 원리 5가지를 설명하시오.",
        "성숙이론과 학습이론의 발달관을 비교하시오.",
        "결정적 시기(critical period)와 민감기(sensitive period)를 비교하시오.",
        "발달과업(developmental task)의 개념과 의의를 설명하시오.",
        "종단연구와 횡단연구의 장단점을 비교하시오.",
        "유전과 환경의 상호작용이 발달에 미치는 영향을 설명하시오.",
        "발달단계의 구분 기준과 각 학자별 발달단계를 비교하시오.",
        "코호트 효과(cohort effect)의 개념과 연구에서의 고려사항을 설명하시오.",
        "발달의 연속성 대 불연속성 논쟁을 설명하시오.",
      ],
    },
    {
      title: "정신역동이론",
      description: "프로이트, 에릭슨, 융, 아들러 이론",
      questions: [
        "프로이트의 성격구조(원초아, 자아, 초자아)를 설명하시오.",
        "프로이트의 심리성적 발달단계 5단계를 설명하시오.",
        "프로이트의 방어기제 유형과 특징을 설명하시오.",
        "에릭슨의 심리사회적 발달이론의 기본 가정을 설명하시오.",
        "에릭슨의 8단계 발달과업과 심리사회적 위기를 설명하시오.",
        "프로이트와 에릭슨 이론의 공통점과 차이점을 비교하시오.",
        "융(Jung)의 분석심리학의 주요 개념을 설명하시오.",
        "아들러(Adler)의 개인심리학의 주요 개념을 설명하시오.",
        "프로이트의 정신분석이론이 사회복지실천에 미친 영향을 설명하시오.",
        "대상관계이론의 주요 학자와 개념을 설명하시오.",
      ],
    },
    {
      title: "행동주의이론",
      description: "파블로프, 스키너, 반두라 이론",
      questions: [
        "파블로프의 고전적 조건화의 원리와 주요 개념을 설명하시오.",
        "스키너의 조작적 조건화의 원리를 설명하시오.",
        "강화(정적/부적)와 처벌(정적/부적)의 차이를 설명하시오.",
        "강화계획의 유형(연속/간헐)과 특징을 설명하시오.",
        "행동수정기법의 종류와 적용 방법을 설명하시오.",
        "소거, 자발적 회복, 일반화, 변별의 개념을 설명하시오.",
        "반두라의 사회학습이론의 주요 개념을 설명하시오.",
        "관찰학습(모방학습)의 4단계 과정을 설명하시오.",
        "자기효능감의 개념과 영향요인을 설명하시오.",
        "행동주의이론의 사회복지실천에서의 적용을 설명하시오.",
      ],
    },
    {
      title: "인지발달이론",
      description: "피아제, 비고츠키, 정보처리이론",
      questions: [
        "피아제의 인지발달 기본 개념(도식, 동화, 조절, 평형화)을 설명하시오.",
        "피아제의 인지발달 4단계의 특징을 설명하시오.",
        "감각운동기의 하위단계와 대상영속성 발달을 설명하시오.",
        "전조작기 사고의 특성(자기중심성, 물활론 등)을 설명하시오.",
        "구체적 조작기와 형식적 조작기의 특성을 비교하시오.",
        "피아제 이론에 대한 비판점을 설명하시오.",
        "비고츠키의 사회문화적 인지이론의 주요 개념을 설명하시오.",
        "근접발달영역(ZPD)과 비계설정(scaffolding)을 설명하시오.",
        "피아제와 비고츠키 이론의 공통점과 차이점을 비교하시오.",
        "정보처리이론의 주요 개념과 기억의 구조를 설명하시오.",
      ],
    },
    {
      title: "인본주의이론과 생태체계이론",
      description: "매슬로우, 로저스, 브론펜브레너",
      questions: [
        "매슬로우의 욕구위계이론 5단계를 설명하시오.",
        "매슬로우의 자아실현인의 특성을 설명하시오.",
        "로저스의 현상학적 성격이론의 주요 개념을 설명하시오.",
        "로저스의 완전히 기능하는 인간의 특성을 설명하시오.",
        "인본주의이론의 사회복지실천에서의 적용을 설명하시오.",
        "브론펜브레너의 생태체계이론의 5가지 체계를 설명하시오.",
        "미시체계, 중간체계, 외체계, 거시체계의 예시를 설명하시오.",
        "시간체계(chronosystem)의 개념과 의의를 설명하시오.",
        "생태체계이론의 사회복지실천에서의 유용성을 설명하시오.",
        "환경속의 인간(PIE) 관점과 생태체계이론의 관계를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사회복지사 1급 인간행동과 사회환경 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 학자, 실제 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/category/welfare/social-worker-1"
            className="inline-flex items-center text-pink-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">인간행동과 사회환경</h1>
          <p className="text-xl text-pink-100">1교시 | 발달이론, 성격이론, 체계이론 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-pink-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">중상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">60%</p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setExpandedTopic(expandedTopic === index ? null : index)}
                className="w-full p-6 flex justify-between items-center hover:bg-pink-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                    {topic.questions.length}문항
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="bg-pink-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button
                          onClick={() => handleAIHelper(question)}
                          className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-lg text-sm hover:from-pink-600 hover:to-rose-600 transition-colors"
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">다른 과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/welfare/social-worker-1/study/research" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-pink-700 font-medium">사회복지조사론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/practice" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-rose-700 font-medium">사회복지실천론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/practice-skills" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-rose-700 font-medium">실천기술론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/community" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-rose-700 font-medium">지역사회복지론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-fuchsia-700 font-medium">사회복지정책론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/administration" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-fuchsia-700 font-medium">사회복지행정론</span>
            </Link>
            <Link href="/category/welfare/social-worker-1/study/law" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-fuchsia-700 font-medium">사회복지법제론</span>
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
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors">
                  Claude
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors">
                  ChatGPT
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors">
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
