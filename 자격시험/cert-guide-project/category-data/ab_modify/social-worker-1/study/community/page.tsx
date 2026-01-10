"use client";

import { useState } from "react";
import Link from "next/link";

export default function CommunityStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "지역사회복지의 이해",
      description: "개념, 역사, 이론",
      questions: [
        "지역사회의 개념과 유형을 설명하시오.",
        "지역사회복지의 개념과 특성을 설명하시오.",
        "지역사회복지와 지역복지의 차이를 설명하시오.",
        "지역사회복지의 역사적 발달과정을 설명하시오.",
        "인보관운동과 자선조직협회의 지역사회복지 기여를 설명하시오.",
        "지역사회복지 이론(생태학, 사회체계 등)을 설명하시오.",
        "사회자본(social capital)의 개념과 의의를 설명하시오.",
        "지역사회복지의 가치와 원칙을 설명하시오.",
        "지역사회 역량강화(empowerment)의 의미를 설명하시오.",
        "지역사회복지 환경 변화와 과제를 설명하시오.",
      ],
    },
    {
      title: "지역사회복지실천 모델",
      description: "로스만, 웨일과 갬블 모델",
      questions: [
        "로스만의 지역사회조직 3가지 모델을 설명하시오.",
        "지역사회개발모델의 특성과 사회복지사 역할을 설명하시오.",
        "사회계획모델의 특성과 사회복지사 역할을 설명하시오.",
        "사회행동모델의 특성과 사회복지사 역할을 설명하시오.",
        "웨일과 갬블(Weil & Gamble)의 8가지 모델을 설명하시오.",
        "테일러와 로버츠(Taylor & Roberts)의 모델을 설명하시오.",
        "포플(Popple)의 지역사회복지실천 모델을 설명하시오.",
        "로스만 모델의 수정·발전을 설명하시오.",
        "지역사회복지실천 모델의 비교와 선택기준을 설명하시오.",
        "한국의 지역사회복지실천 모델 적용사례를 설명하시오.",
      ],
    },
    {
      title: "지역사회복지실천 과정과 기술",
      description: "욕구조사, 자원개발, 조직화",
      questions: [
        "지역사회복지실천의 과정을 설명하시오.",
        "지역사회 욕구조사의 방법을 설명하시오.",
        "지역사회 자원의 유형과 개발방법을 설명하시오.",
        "지역사회 조직화 기술을 설명하시오.",
        "옹호(advocacy) 기술과 유형을 설명하시오.",
        "연계(linkage)와 조정(coordination)의 기술을 설명하시오.",
        "지역사회교육의 방법과 기술을 설명하시오.",
        "주민참여의 수준과 촉진방법을 설명하시오.",
        "갈등해결과 협상기술을 설명하시오.",
        "지역사회복지 평가방법을 설명하시오.",
      ],
    },
    {
      title: "지역사회복지 추진체계",
      description: "공공기관, 민간기관, 협력체계",
      questions: [
        "지역사회복지 공공전달체계를 설명하시오.",
        "주민센터의 복지기능을 설명하시오.",
        "사회복지관의 기능과 사업을 설명하시오.",
        "지역사회복지협의체의 기능과 역할을 설명하시오.",
        "지역자활센터의 기능과 사업을 설명하시오.",
        "자원봉사센터의 기능과 역할을 설명하시오.",
        "사회복지공동모금회의 기능을 설명하시오.",
        "민·관 협력체계 구축방안을 설명하시오.",
        "읍면동 복지허브화의 내용을 설명하시오.",
        "통합사례관리의 추진체계를 설명하시오.",
      ],
    },
    {
      title: "지역사회보장계획과 정책",
      description: "지역사회보장계획, 사회적 경제",
      questions: [
        "지역사회보장계획의 수립과정을 설명하시오.",
        "지역사회보장계획의 내용 구성을 설명하시오.",
        "지역사회보장지표의 개념과 활용을 설명하시오.",
        "사회적 경제의 개념과 유형을 설명하시오.",
        "사회적기업의 개념과 인증요건을 설명하시오.",
        "협동조합의 유형과 특성을 설명하시오.",
        "마을기업의 개념과 사업내용을 설명하시오.",
        "자활기업의 개념과 지원체계를 설명하시오.",
        "커뮤니티 케어의 개념과 추진현황을 설명하시오.",
        "지역사회 통합돌봄의 내용을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사회복지사 1급 지역사회복지론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 학자, 실제 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/social-worker-1" className="inline-flex items-center text-rose-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">지역사회복지론</h1>
          <p className="text-xl text-rose-100">2교시 | 지역사회조직, 사회행동, 네트워크 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-rose-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-yellow-600">중</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">62%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-rose-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-rose-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm hover:from-rose-600 hover:to-fuchsia-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지정책론</span></Link>
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
