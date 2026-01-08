"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdministrationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "사회복지행정의 기초",
      description: "개념, 이론, 발달과정",
      questions: [
        "사회복지행정의 정의와 특성을 설명하시오.",
        "사회복지행정과 일반행정의 차이를 설명하시오.",
        "사회복지행정의 필요성을 설명하시오.",
        "사회복지행정의 발달과정을 설명하시오.",
        "사회복지행정의 가치와 이념을 설명하시오.",
        "사회복지행정의 주요 영역을 설명하시오.",
        "사회복지조직의 특성을 설명하시오.",
        "사회복지서비스의 특성이 행정에 미치는 영향을 설명하시오.",
        "행정이론(과학적 관리론, 인간관계론 등)의 발전을 설명하시오.",
        "사회복지행정에서 효율성과 효과성의 의미를 설명하시오.",
      ],
    },
    {
      title: "조직이론과 구조",
      description: "조직의 유형, 구조, 환경",
      questions: [
        "조직의 정의와 구성요소를 설명하시오.",
        "공식조직과 비공식조직의 차이를 설명하시오.",
        "관료제 조직의 특성과 역기능을 설명하시오.",
        "조직구조의 유형(기능별, 사업별, 매트릭스)을 설명하시오.",
        "조직문화의 개념과 유형을 설명하시오.",
        "조직환경의 유형과 조직에 미치는 영향을 설명하시오.",
        "조직변화와 혁신의 방법을 설명하시오.",
        "학습조직의 개념과 특성을 설명하시오.",
        "임파워먼트 조직의 특성을 설명하시오.",
        "사회복지조직의 책무성(accountability)을 설명하시오.",
      ],
    },
    {
      title: "기획과 의사결정",
      description: "기획과정, 의사결정 모형",
      questions: [
        "기획의 개념과 유형을 설명하시오.",
        "기획의 과정과 단계를 설명하시오.",
        "전략적 기획의 개념과 과정을 설명하시오.",
        "SWOT 분석의 활용방법을 설명하시오.",
        "프로그램 기획의 과정을 설명하시오.",
        "욕구조사의 방법을 설명하시오.",
        "의사결정의 개념과 유형을 설명하시오.",
        "의사결정 모형(합리적, 점증적, 혼합 모형)을 설명하시오.",
        "집단의사결정의 장단점을 설명하시오.",
        "의사결정에 영향을 미치는 요인을 설명하시오.",
      ],
    },
    {
      title: "인적자원관리",
      description: "채용, 교육훈련, 동기부여, 리더십",
      questions: [
        "인적자원관리의 개념과 과정을 설명하시오.",
        "직무분석과 직무설계의 방법을 설명하시오.",
        "채용과 선발의 방법을 설명하시오.",
        "직원개발과 교육훈련의 유형을 설명하시오.",
        "인사고과의 방법과 오류를 설명하시오.",
        "동기부여 이론(내용이론, 과정이론)을 설명하시오.",
        "매슬로우, 허즈버그의 동기이론을 비교하시오.",
        "리더십 이론(특성, 행동, 상황이론)을 설명하시오.",
        "변혁적 리더십과 거래적 리더십을 비교하시오.",
        "슈퍼비전의 개념과 기능을 설명하시오.",
      ],
    },
    {
      title: "재정관리와 마케팅",
      description: "예산, 회계, 모금, 홍보",
      questions: [
        "사회복지조직의 재원 유형을 설명하시오.",
        "예산의 개념과 기능을 설명하시오.",
        "예산편성의 원칙과 과정을 설명하시오.",
        "품목별 예산과 성과주의 예산을 비교하시오.",
        "영기준 예산(ZBB)의 특성을 설명하시오.",
        "회계의 원칙과 재무제표의 유형을 설명하시오.",
        "모금(fundraising)의 방법과 전략을 설명하시오.",
        "사회복지 마케팅의 개념과 특성을 설명하시오.",
        "마케팅 믹스(4P)의 사회복지 적용을 설명하시오.",
        "PR과 홍보의 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사회복지사 1급 사회복지행정론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론, 실제 적용 예시를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">사회복지행정론</h1>
          <p className="text-xl text-fuchsia-100">3교시 | 조직관리, 인사관리, 재정관리 학습</p>
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
            <p className="text-3xl font-bold text-yellow-600">중</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">60%</p>
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
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지정책론</span></Link>
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
