"use client";

import { useState } from "react";
import Link from "next/link";

export default function LawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "사회복지법의 기초",
      description: "사회복지법의 개념과 체계",
      questions: [
        "사회복지법의 개념과 특성을 설명하시오.",
        "사회복지법의 법원(法源)을 설명하시오.",
        "사회복지 관련 법률의 체계를 설명하시오.",
        "사회복지법의 기본원리를 설명하시오.",
        "사회복지 수급권의 법적 성격을 설명하시오.",
        "사회복지법상 권리구제 절차를 설명하시오.",
        "사회복지서비스 신청과 결정 절차를 설명하시오.",
        "사회복지사의 법적 지위와 의무를 설명하시오.",
        "사회복지법과 헌법의 관계를 설명하시오.",
        "사회보장기본법의 주요 내용을 설명하시오.",
      ],
    },
    {
      title: "사회보험법",
      description: "국민연금, 건강보험, 고용보험, 산재보험",
      questions: [
        "국민연금법의 적용대상과 가입유형을 설명하시오.",
        "국민연금의 급여 종류와 수급요건을 설명하시오.",
        "국민건강보험법의 적용대상을 설명하시오.",
        "건강보험의 보험료 산정과 부과 방식을 설명하시오.",
        "건강보험의 급여 종류를 설명하시오.",
        "고용보험법의 적용대상과 사업을 설명하시오.",
        "실업급여의 종류와 수급요건을 설명하시오.",
        "산업재해보상보험법의 적용대상을 설명하시오.",
        "업무상 재해의 인정기준을 설명하시오.",
        "산재보험급여의 종류를 설명하시오.",
      ],
    },
    {
      title: "공공부조법",
      description: "기초생활보장, 긴급복지지원, 의료급여",
      questions: [
        "국민기초생활보장법의 목적과 기본원리를 설명하시오.",
        "기초생활보장 수급자 선정기준을 설명하시오.",
        "기초생활보장급여의 종류와 내용을 설명하시오.",
        "부양의무자 기준과 부양비 산정을 설명하시오.",
        "생계급여와 주거급여의 지급기준을 설명하시오.",
        "의료급여법의 수급자 유형을 설명하시오.",
        "긴급복지지원법의 지원대상과 급여를 설명하시오.",
        "기초연금법의 수급요건과 급여를 설명하시오.",
        "장애인연금법의 수급요건과 급여를 설명하시오.",
        "자활지원사업의 종류와 내용을 설명하시오.",
      ],
    },
    {
      title: "사회서비스법 (1)",
      description: "아동, 노인, 장애인 복지법",
      questions: [
        "아동복지법의 기본이념과 원칙을 설명하시오.",
        "아동학대의 정의와 신고의무를 설명하시오.",
        "아동복지서비스의 종류를 설명하시오.",
        "입양특례법의 주요 내용을 설명하시오.",
        "노인복지법의 기본이념과 정책을 설명하시오.",
        "노인복지시설의 종류를 설명하시오.",
        "노인장기요양보험법의 주요 내용을 설명하시오.",
        "장애인복지법의 기본이념과 원칙을 설명하시오.",
        "장애인 등록과 복지서비스를 설명하시오.",
        "장애인활동지원법의 주요 내용을 설명하시오.",
      ],
    },
    {
      title: "사회서비스법 (2)",
      description: "한부모, 영유아, 다문화, 정신건강 복지법",
      questions: [
        "한부모가족지원법의 지원대상과 급여를 설명하시오.",
        "영유아보육법의 주요 내용을 설명하시오.",
        "다문화가족지원법의 지원대상과 내용을 설명하시오.",
        "건강가정기본법의 주요 내용을 설명하시오.",
        "정신건강복지법의 입원유형과 절차를 설명하시오.",
        "사회복지사업법의 주요 내용을 설명하시오.",
        "사회복지시설 설치·운영 기준을 설명하시오.",
        "사회복지법인의 설립과 운영을 설명하시오.",
        "사회서비스 이용 및 이용권관리에 관한 법률을 설명하시오.",
        "발달장애인 권리보장 및 지원에 관한 법률을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사회복지사 1급 사회복지법제론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 관련 법 조문, 수급요건, 실무 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/social-worker-1" className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">사회복지법제론</h1>
          <p className="text-xl text-purple-100">3교시 | 사회보장법, 복지서비스법 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-purple-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">50%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-indigo-600 transition-colors">AI 도움</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">다른 과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/welfare/social-worker-1/study/human-behavior" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors"><span className="text-pink-700 font-medium">인간행동과 사회환경</span></Link>
            <Link href="/category/welfare/social-worker-1/study/research" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors"><span className="text-pink-700 font-medium">사회복지조사론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/practice" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">사회복지실천론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/practice-skills" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">실천기술론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/community" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">지역사회복지론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지정책론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/administration" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지행정론</span></Link>
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors">Claude</a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors">ChatGPT</a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors">Gemini</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
