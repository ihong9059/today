"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PracticeStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "사회복지실천의 기초",
      description: "역사, 가치, 윤리, 관점",
      questions: [
        "사회복지실천의 정의와 목적을 설명하시오.",
        "사회복지실천의 역사적 발달과정을 설명하시오.",
        "인보관운동과 자선조직협회의 차이를 비교하시오.",
        "사회복지실천의 가치체계를 설명하시오.",
        "사회복지사 윤리강령의 주요 내용을 설명하시오.",
        "클라이언트의 자기결정권과 그 한계를 설명하시오.",
        "비밀보장의 원칙과 예외 상황을 설명하시오.",
        "통합적 접근방법의 개념과 특징을 설명하시오.",
        "일반주의(generalist) 실천의 개념을 설명하시오.",
        "환경속의 인간(PIE) 관점을 설명하시오.",
      ],
    },
    {
      title: "사회복지실천 관계론",
      description: "관계형성, 면접기술, 의사소통",
      questions: [
        "전문적 관계의 특성을 설명하시오.",
        "비에스텍(Biestek)의 관계 7대 원칙을 설명하시오.",
        "수용과 비심판적 태도의 의미를 설명하시오.",
        "의도적 감정표현의 원칙을 설명하시오.",
        "통제된 정서적 관여의 원칙을 설명하시오.",
        "효과적 의사소통 기술을 설명하시오.",
        "언어적 의사소통과 비언어적 의사소통을 비교하시오.",
        "경청과 공감의 기술을 설명하시오.",
        "질문기법의 종류와 활용을 설명하시오.",
        "명료화, 요약, 재진술 기법을 설명하시오.",
      ],
    },
    {
      title: "사회복지실천 과정",
      description: "접수, 자료수집, 사정, 계획, 개입, 종결",
      questions: [
        "사회복지실천 과정의 단계를 설명하시오.",
        "접수(intake) 단계의 과업과 기술을 설명하시오.",
        "자료수집의 방법과 내용을 설명하시오.",
        "사정(assessment)의 개념과 특성을 설명하시오.",
        "사정도구(생태도, 가계도, 사회관계망 지도)를 설명하시오.",
        "계획수립 단계의 과업을 설명하시오.",
        "목표설정의 원칙(SMART)을 설명하시오.",
        "개입 단계의 주요 과업을 설명하시오.",
        "종결의 유형과 과업을 설명하시오.",
        "평가의 유형과 방법을 설명하시오.",
      ],
    },
    {
      title: "면접론",
      description: "면접의 유형, 기술, 환경",
      questions: [
        "면접의 정의와 목적을 설명하시오.",
        "면접의 유형(구조화, 비구조화, 반구조화)을 설명하시오.",
        "면접의 구성요소를 설명하시오.",
        "면접 시작 단계의 기술을 설명하시오.",
        "면접 중간 단계의 기술을 설명하시오.",
        "면접 종결 단계의 기술을 설명하시오.",
        "면접 시 주의사항을 설명하시오.",
        "면접환경 조성의 원칙을 설명하시오.",
        "저항적 클라이언트에 대한 면접기술을 설명하시오.",
        "위기상황에서의 면접기술을 설명하시오.",
      ],
    },
    {
      title: "사례관리",
      description: "사례관리의 개념, 과정, 모델",
      questions: [
        "사례관리의 정의와 등장배경을 설명하시오.",
        "사례관리의 목적과 기능을 설명하시오.",
        "사례관리자의 역할을 설명하시오.",
        "사례관리의 과정을 설명하시오.",
        "사례관리 모델(중개, 임상, 강점관점 등)을 비교하시오.",
        "서비스 연계와 조정의 방법을 설명하시오.",
        "자원개발 및 동원 방법을 설명하시오.",
        "사례관리와 전통적 사회복지실천의 차이를 설명하시오.",
        "사례관리의 한계와 과제를 설명하시오.",
        "통합사례관리의 개념과 특징을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `사회복지사 1급 사회복지실천론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론, 실제 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/social-worker-1" className="inline-flex items-center text-rose-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">사회복지실천론</h1>
          <p className="text-xl text-rose-100">2교시 | 실천과정, 면접기술, 사례관리 학습</p>
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
            <p className="text-3xl font-bold text-blue-600">65%</p>
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
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-rose-600 hover:to-pink-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/social-worker-1/study/practice-skills" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">실천기술론</span></Link>
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
