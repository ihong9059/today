"use client";

import { useState } from "react";
import Link from "next/link";

export default function PolicyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "사회복지정책의 기초",
      description: "개념, 가치, 이론",
      questions: [
        "사회복지정책의 개념과 영역을 설명하시오.",
        "사회복지정책과 사회정책의 관계를 설명하시오.",
        "사회복지정책의 가치(평등, 자유, 효율 등)를 설명하시오.",
        "선별주의와 보편주의의 차이를 설명하시오.",
        "잔여적 복지와 제도적 복지의 차이를 설명하시오.",
        "사회복지정책의 기능(사회통합, 재분배 등)을 설명하시오.",
        "복지다원주의(welfare pluralism)의 개념을 설명하시오.",
        "사회복지정책 발달이론(산업화, 시민권 이론 등)을 설명하시오.",
        "복지국가 위기론과 재편론을 설명하시오.",
        "신자유주의가 사회복지정책에 미친 영향을 설명하시오.",
      ],
    },
    {
      title: "복지국가론",
      description: "유형, 모형, 발전",
      questions: [
        "에스핑-앤더슨의 복지국가 3유형을 설명하시오.",
        "자유주의 복지국가의 특성을 설명하시오.",
        "조합주의(보수주의) 복지국가의 특성을 설명하시오.",
        "사회민주주의 복지국가의 특성을 설명하시오.",
        "복지국가 발전의 결정요인을 설명하시오.",
        "한국 복지국가의 성격과 특성을 설명하시오.",
        "복지국가의 역사적 발전과정을 설명하시오.",
        "비버리지 보고서의 주요 내용을 설명하시오.",
        "복지국가의 황금기와 위기를 설명하시오.",
        "생산적 복지, 적극적 복지의 개념을 설명하시오.",
      ],
    },
    {
      title: "사회보장제도",
      description: "사회보험, 공공부조, 사회서비스",
      questions: [
        "사회보장의 개념과 범위를 설명하시오.",
        "사회보험의 원리와 특성을 설명하시오.",
        "국민연금제도의 구성과 급여를 설명하시오.",
        "국민건강보험제도의 특성과 급여를 설명하시오.",
        "고용보험제도의 구성과 급여를 설명하시오.",
        "산업재해보상보험의 특성과 급여를 설명하시오.",
        "노인장기요양보험의 특성과 급여를 설명하시오.",
        "공공부조의 원리와 특성을 설명하시오.",
        "국민기초생활보장제도의 급여 유형을 설명하시오.",
        "사회서비스의 개념과 유형을 설명하시오.",
      ],
    },
    {
      title: "사회복지정책 과정",
      description: "형성, 결정, 집행, 평가",
      questions: [
        "사회복지정책 과정의 단계를 설명하시오.",
        "사회문제의 정의와 이슈화 과정을 설명하시오.",
        "정책의제 설정의 유형과 과정을 설명하시오.",
        "정책대안의 형성과 분석 방법을 설명하시오.",
        "정책결정 모형(합리, 점증, 혼합 등)을 설명하시오.",
        "정책집행의 접근방법(하향식, 상향식)을 설명하시오.",
        "정책평가의 유형과 기준을 설명하시오.",
        "비용-편익분석과 비용-효과분석의 차이를 설명하시오.",
        "정책결정에 영향을 미치는 요인을 설명하시오.",
        "사회복지정책 환류(feedback)의 의미를 설명하시오.",
      ],
    },
    {
      title: "사회복지정책 분석",
      description: "분석틀, 급여, 재원, 전달체계",
      questions: [
        "길버트와 스펙트의 정책분석틀을 설명하시오.",
        "할당(allocation) 원칙의 유형을 설명하시오.",
        "급여(benefits)의 형태를 설명하시오.",
        "현금급여와 현물급여의 장단점을 비교하시오.",
        "바우처(voucher)의 특성과 유형을 설명하시오.",
        "사회복지 재원의 유형을 설명하시오.",
        "조세와 사회보험료의 차이를 설명하시오.",
        "전달체계의 개념과 구성요소를 설명하시오.",
        "공공전달체계와 민간전달체계를 비교하시오.",
        "전달체계의 통합과 분리의 쟁점을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사회복지사 1급 사회복지정책론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 학자, 정책 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-white">
      <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/social-worker-1" className="inline-flex items-center text-fuchsia-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">사회복지정책론</h1>
          <p className="text-xl text-fuchsia-100">3교시 | 복지국가, 사회보장, 정책분석 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-fuchsia-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">52%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-fuchsia-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-fuchsia-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:from-fuchsia-600 hover:to-purple-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/social-worker-1/study/administration" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지행정론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/law" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지법제론</span></Link>
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
