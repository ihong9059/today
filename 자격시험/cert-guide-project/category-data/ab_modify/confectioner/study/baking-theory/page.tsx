"use client";

import { useState } from "react";
import Link from "next/link";

export default function BakingTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "제과 기초이론",
      description: "제과의 정의, 분류, 기본 원리",
      questions: [
        "제과의 정의와 특성을 설명하시오.", "제과와 제빵의 차이를 설명하시오.", "제과제품의 분류를 설명하시오.", "반죽형 과자의 특성을 설명하시오.", "거품형 과자의 특성을 설명하시오.",
        "쿠키류의 분류와 특성을 설명하시오.", "케이크류의 분류와 특성을 설명하시오.", "파이류의 분류와 특성을 설명하시오.", "슈류의 특성을 설명하시오.", "냉과류의 특성을 설명하시오.",
      ],
    },
    {
      title: "반죽법",
      description: "크림법, 별립법, 공립법, 1단계법",
      questions: [
        "크림법(Creaming method)의 원리를 설명하시오.", "크림법의 순서를 설명하시오.", "별립법(Separated method)의 원리를 설명하시오.", "별립법의 순서를 설명하시오.", "공립법(Foaming method)의 원리를 설명하시오.",
        "블렌딩법의 원리를 설명하시오.", "1단계법(Single stage)의 원리를 설명하시오.", "반죽 온도의 중요성을 설명하시오.", "반죽 비중 측정법을 설명하시오.", "반죽별 적합한 제품을 설명하시오.",
      ],
    },
    {
      title: "굽기와 냉각",
      description: "오븐 온도, 굽기 시간, 냉각",
      questions: [
        "굽기의 과학적 원리를 설명하시오.", "오븐 내 열전달 방식을 설명하시오.", "굽기 중 제품의 변화를 설명하시오.", "제품별 적정 굽기 온도를 설명하시오.", "굽기 시간에 영향을 주는 요인을 설명하시오.",
        "오븐 스프링 현상을 설명하시오.", "마이야르 반응의 역할을 설명하시오.", "캐러멜화 반응의 역할을 설명하시오.", "냉각의 중요성을 설명하시오.", "제품별 냉각 방법을 설명하시오.",
      ],
    },
    {
      title: "장식과 마무리",
      description: "크림, 아이싱, 데코레이션",
      questions: [
        "버터크림의 종류와 제조법을 설명하시오.", "생크림 휘핑의 원리를 설명하시오.", "커스터드 크림 제조법을 설명하시오.", "아이싱의 종류를 설명하시오.", "퐁당의 제조법을 설명하시오.",
        "초콜릿 템퍼링의 원리를 설명하시오.", "가나슈 제조법을 설명하시오.", "마지팬의 특성과 사용법을 설명하시오.", "케이크 아이싱 방법을 설명하시오.", "데코레이션 기법을 설명하시오.",
      ],
    },
    {
      title: "제과 품질관리",
      description: "제품 평가, 결점, 저장",
      questions: [
        "제과제품의 품질 평가 기준을 설명하시오.", "스펀지케이크의 품질 결점을 설명하시오.", "파운드케이크의 품질 결점을 설명하시오.", "쿠키의 품질 결점을 설명하시오.", "파이의 품질 결점을 설명하시오.",
        "슈의 품질 결점을 설명하시오.", "제과제품의 노화 현상을 설명하시오.", "제과제품의 저장 방법을 설명하시오.", "포장의 중요성을 설명하시오.", "제과제품의 유통기한 설정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `제과기능사 제과이론 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 실무 적용 방법\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/confectioner" className="inline-flex items-center text-pink-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제과기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">제과이론</h1>
          <p className="text-xl text-pink-200">반죽법, 굽기, 장식, 품질관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-pink-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-rose-600">매우 높음</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-fuchsia-600">상</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-pink-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-pink-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 py-1 rounded-lg text-sm hover:from-pink-600 hover:to-rose-700 transition-colors">AI 도움</button>
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
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생학</span></Link>
            <Link href="/category/service/confectioner/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/confectioner/study/nutrition" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-colors"><span className="text-orange-700 font-medium">영양학</span></Link>
            <Link href="/category/service/confectioner/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
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
