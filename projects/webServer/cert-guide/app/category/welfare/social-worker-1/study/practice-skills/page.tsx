"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PracticeSkillsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "사회복지실천모델",
      description: "정신역동, 심리사회, 인지행동, 과제중심 모델",
      questions: [
        "정신역동모델의 주요 개념과 기법을 설명하시오.",
        "심리사회모델의 특성과 개입기법을 설명하시오.",
        "인지행동모델의 주요 개념과 기법을 설명하시오.",
        "과제중심모델의 특성과 개입과정을 설명하시오.",
        "위기개입모델의 특성과 개입단계를 설명하시오.",
        "역량강화모델(empowerment)의 특성을 설명하시오.",
        "해결중심모델의 특성과 질문기법을 설명하시오.",
        "클라이언트중심모델의 특성과 기법을 설명하시오.",
        "행동수정모델의 기법(강화, 소거, 토큰경제 등)을 설명하시오.",
        "각 실천모델의 비교와 선택기준을 설명하시오.",
      ],
    },
    {
      title: "개인대상 실천기술",
      description: "개인상담 기법과 기술",
      questions: [
        "라포형성(rapport)의 의미와 방법을 설명하시오.",
        "반영, 명료화, 직면의 기법을 설명하시오.",
        "재명명(reframing) 기법을 설명하시오.",
        "인지재구조화 기법을 설명하시오.",
        "자기주장훈련의 목적과 방법을 설명하시오.",
        "이완훈련과 체계적 둔감법을 설명하시오.",
        "모델링 기법의 유형과 적용을 설명하시오.",
        "역할연습(role play)의 활용방법을 설명하시오.",
        "긍정적 자기대화 기법을 설명하시오.",
        "숙제(과제) 부여 기법을 설명하시오.",
      ],
    },
    {
      title: "집단대상 실천기술",
      description: "집단사회사업의 원리와 기술",
      questions: [
        "집단사회사업의 개념과 목적을 설명하시오.",
        "집단의 유형(치료집단, 과업집단, 자조집단 등)을 설명하시오.",
        "집단발달 단계와 각 단계별 특성을 설명하시오.",
        "집단역동의 개념과 구성요소를 설명하시오.",
        "집단응집력의 개념과 영향요인을 설명하시오.",
        "집단지도자의 역할과 기술을 설명하시오.",
        "집단프로그램 기획 시 고려사항을 설명하시오.",
        "집단에서 발생하는 문제와 대처방법을 설명하시오.",
        "집단상담 기법(라운드로빈, 역할극 등)을 설명하시오.",
        "집단프로그램 평가방법을 설명하시오.",
      ],
    },
    {
      title: "가족대상 실천기술",
      description: "가족치료 이론과 기법",
      questions: [
        "가족체계이론의 주요 개념을 설명하시오.",
        "보웬(Bowen)의 다세대 가족치료를 설명하시오.",
        "미누친(Minuchin)의 구조적 가족치료를 설명하시오.",
        "사티어(Satir)의 경험적 가족치료를 설명하시오.",
        "헤일리(Haley)의 전략적 가족치료를 설명하시오.",
        "해결중심 가족치료의 특성과 기법을 설명하시오.",
        "가족사정 도구(가계도, 생태도)의 활용을 설명하시오.",
        "순환적 질문기법의 활용을 설명하시오.",
        "가족의사소통 유형과 개선 방법을 설명하시오.",
        "가족상담의 윤리적 이슈를 설명하시오.",
      ],
    },
    {
      title: "기록과 평가",
      description: "사회복지실천 기록과 평가방법",
      questions: [
        "사회복지실천에서 기록의 목적과 기능을 설명하시오.",
        "기록의 유형(과정기록, 문제중심기록, 요약기록 등)을 설명하시오.",
        "SOAP 기록방식의 구성요소를 설명하시오.",
        "PIE 분류체계의 구성요소를 설명하시오.",
        "사회복지실천 평가의 유형(과정/결과평가)을 설명하시오.",
        "단일사례설계의 유형과 적용을 설명하시오.",
        "목표달성척도(GAS)의 활용방법을 설명하시오.",
        "클라이언트 만족도 조사방법을 설명하시오.",
        "증거기반실천(EBP)의 개념과 과정을 설명하시오.",
        "기록의 윤리적 고려사항을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `사회복지사 1급 사회복지실천기술론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 학자, 실제 적용 예시를 포함하여 답변해주세요.`;
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
          <h1 className="text-4xl font-bold mb-4">사회복지실천기술론</h1>
          <p className="text-xl text-rose-100">2교시 | 상담기법, 집단사회사업, 가족치료 학습</p>
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
            <p className="text-3xl font-bold text-orange-600">중상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">58%</p>
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
            <Link href="/category/welfare/social-worker-1/study/community" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">지역사회복지론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/policy" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지정책론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/administration" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지행정론</span></Link>
            <Link href="/category/welfare/social-worker-1/study/law" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">사회복지법제론</span></Link>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
