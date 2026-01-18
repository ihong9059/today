"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function ClinicalPsychologyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "임상심리학의 기초",
      description: "역사, 역할, 윤리",
      questions: [
        "임상심리학의 정의와 목적을 설명하시오.",
        "임상심리학의 역사적 발전을 설명하시오.",
        "임상심리사의 주요 역할과 기능을 설명하시오.",
        "과학자-실무자 모델(Boulder 모델)을 설명하시오.",
        "임상심리 윤리의 기본 원칙을 설명하시오.",
        "비밀보장의 원칙과 예외를 설명하시오.",
        "다중관계의 윤리적 문제를 설명하시오.",
        "사전동의의 요소를 설명하시오.",
        "근거기반실무(EBP)의 개념을 설명하시오.",
        "문화적 역량의 중요성을 설명하시오.",
      ],
    },
    {
      title: "임상 면담과 평가",
      description: "면담기법, 행동관찰",
      questions: [
        "임상 면담의 목적과 종류를 설명하시오.",
        "구조화 면담과 비구조화 면담을 비교하시오.",
        "초기 면담에서 다루어야 할 내용을 설명하시오.",
        "정신상태검사(MSE)의 구성요소를 설명하시오.",
        "행동관찰의 방법과 기록을 설명하시오.",
        "라포 형성의 중요성과 방법을 설명하시오.",
        "위기 면담의 특징을 설명하시오.",
        "자살 위험성 평가의 요소를 설명하시오.",
        "면담 시 의사소통 기술을 설명하시오.",
        "면담 기록의 작성 원칙을 설명하시오.",
      ],
    },
    {
      title: "심리치료 이론",
      description: "정신역동, 인지행동, 인본주의",
      questions: [
        "정신분석치료의 기본 원리를 설명하시오.",
        "전이와 역전이의 개념을 설명하시오.",
        "인지치료의 기본 가정을 설명하시오.",
        "인지적 왜곡의 유형을 설명하시오.",
        "행동치료의 기본 원리를 설명하시오.",
        "체계적 둔감화의 절차를 설명하시오.",
        "노출치료의 원리와 유형을 설명하시오.",
        "인간중심치료의 핵심 조건을 설명하시오.",
        "게슈탈트 치료의 주요 개념을 설명하시오.",
        "치료적 동맹의 중요성을 설명하시오.",
      ],
    },
    {
      title: "심리치료 기법",
      description: "CBT, 행동치료 기법",
      questions: [
        "인지재구조화의 방법을 설명하시오.",
        "소크라테스식 질문의 활용을 설명하시오.",
        "행동활성화의 원리와 방법을 설명하시오.",
        "이완훈련의 종류와 방법을 설명하시오.",
        "사고기록지 작성 방법을 설명하시오.",
        "행동 실험의 설계를 설명하시오.",
        "모델링의 원리와 적용을 설명하시오.",
        "토큰경제의 원리를 설명하시오.",
        "문제해결훈련의 단계를 설명하시오.",
        "사회기술훈련의 방법을 설명하시오.",
      ],
    },
    {
      title: "사례개념화와 치료계획",
      description: "사례개념화, 치료 과정",
      questions: [
        "사례개념화의 정의와 목적을 설명하시오.",
        "생물-심리-사회 모델을 설명하시오.",
        "치료 목표 설정의 원칙을 설명하시오.",
        "치료 계획 수립의 과정을 설명하시오.",
        "치료 초기 단계의 과제를 설명하시오.",
        "치료 중기 단계의 작업을 설명하시오.",
        "치료 종결의 과정을 설명하시오.",
        "치료 효과 평가의 방법을 설명하시오.",
        "치료 저항의 이해와 대처를 설명하시오.",
        "심리치료 효과의 공통요인을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `임상심리사 2급 임상심리학 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 임상 적용을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-indigo-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">임상심리학</h1>
          <p className="text-xl text-indigo-100">필기 4과목 | 임상장면의 이해</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-indigo-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">중상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-violet-600">50%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-indigo-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-indigo-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-3 py-1 rounded-lg text-sm hover:from-indigo-600 hover:to-violet-600 transition-colors">AI 도움</button>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/welfare/clinical-psychologist-2/study/psychology-intro" className="bg-cyan-50 hover:bg-cyan-100 rounded-lg p-3 text-center transition-colors"><span className="text-cyan-700 font-medium">심리학개론</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/abnormal-psychology" className="bg-teal-50 hover:bg-teal-100 rounded-lg p-3 text-center transition-colors"><span className="text-teal-700 font-medium">이상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/psychological-assessment" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">심리검사</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/counseling" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">심리상담</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">실기</span></Link>
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
