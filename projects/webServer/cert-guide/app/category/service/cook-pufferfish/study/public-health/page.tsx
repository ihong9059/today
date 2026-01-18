"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PublicHealthStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "공중보건학 총론",
      description: "보건의 개념, 보건행정, 보건지표",
      questions: [
        "공중보건학의 정의와 목적을 설명하시오.", "WHO의 건강 정의를 설명하시오.", "1차, 2차, 3차 예방의 개념을 설명하시오.", "보건행정의 기본 원리를 설명하시오.", "우리나라 보건행정 조직을 설명하시오.",
        "보건지표의 종류를 설명하시오.", "조사망률과 조출생률을 설명하시오.", "영아사망률의 의미를 설명하시오.", "평균수명과 건강수명의 차이를 설명하시오.", "국민건강증진법의 목적을 설명하시오.",
      ],
    },
    {
      title: "역학",
      description: "역학개념, 감염병, 질병관리",
      questions: [
        "역학의 정의와 목적을 설명하시오.", "역학의 3요인(삼각형)을 설명하시오.", "발생률과 유병률의 차이를 설명하시오.", "감염병의 발생 과정을 설명하시오.", "감염병의 예방 대책을 설명하시오.",
        "법정감염병의 분류를 설명하시오.", "1군 감염병의 종류와 특성을 설명하시오.", "수인성 감염병의 종류를 설명하시오.", "식품매개 감염병의 예방을 설명하시오.", "검역감염병의 종류를 설명하시오.",
      ],
    },
    {
      title: "환경위생",
      description: "수질, 대기, 폐기물, 소독",
      questions: [
        "환경위생의 정의와 범위를 설명하시오.", "음용수의 수질기준을 설명하시오.", "물의 정수 과정을 설명하시오.", "물의 소독 방법을 설명하시오.", "대기오염의 원인과 영향을 설명하시오.",
        "실내공기 오염 물질을 설명하시오.", "소음의 건강 영향을 설명하시오.", "폐기물의 분류와 처리를 설명하시오.", "소독의 종류와 방법을 설명하시오.", "멸균과 소독의 차이를 설명하시오.",
      ],
    },
    {
      title: "산업보건",
      description: "직업병, 산업재해, 작업환경",
      questions: [
        "산업보건의 정의와 목적을 설명하시오.", "직업병의 정의와 종류를 설명하시오.", "진폐증의 원인과 예방을 설명하시오.", "소음성 난청의 특징을 설명하시오.", "VDT 증후군을 설명하시오.",
        "근골격계 질환의 예방을 설명하시오.", "작업환경 측정의 목적을 설명하시오.", "산업재해의 정의와 통계를 설명하시오.", "조리종사자의 직업병을 설명하시오.", "산업안전보건법의 주요 내용을 설명하시오.",
      ],
    },
    {
      title: "식품과 건강",
      description: "영양관리, 식중독 예방, 복어 중독",
      questions: [
        "영양소의 기능과 분류를 설명하시오.", "한국인 영양소 섭취기준을 설명하시오.", "식중독의 종류와 예방을 설명하시오.", "자연독 식중독의 종류를 설명하시오.", "복어 중독의 특성을 설명하시오.",
        "복어 중독 증상과 응급처치를 설명하시오.", "복어 중독 사망 원인을 설명하시오.", "복어 중독 예방 방법을 설명하시오.", "건강기능식품의 정의를 설명하시오.", "균형 잡힌 식단의 구성을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `복어조리기능사 공중보건학 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 복어 관련 특별 사항\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">공중보건학</h1>
          <p className="text-xl text-purple-200">보건행정, 역학, 환경위생, 복어 중독 예방</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-purple-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-violet-600">15문항/60</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-fuchsia-600">중</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-violet-700 transition-colors">AI 도움</button>
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
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-pufferfish/study/practical" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-3 text-center transition-colors"><span className="text-slate-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
