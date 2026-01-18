"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function ResearchStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "조사연구의 기초",
      description: "과학적 조사의 특징과 조사연구 과정",
      questions: [
        "과학적 지식의 특성과 비과학적 지식과의 차이를 설명하시오.",
        "사회복지조사의 목적과 유형을 설명하시오.",
        "연역법과 귀납법의 차이를 설명하시오.",
        "이론, 가설, 변수, 개념의 관계를 설명하시오.",
        "양적 연구와 질적 연구의 특성을 비교하시오.",
        "종단연구와 횡단연구의 장단점을 비교하시오.",
        "조사연구의 윤리적 원칙을 설명하시오.",
        "연구 참여자 보호를 위한 지침을 설명하시오.",
        "사회복지조사의 과학적 접근방법을 설명하시오.",
        "조사연구에서 가치중립성 논쟁을 설명하시오.",
      ],
    },
    {
      title: "조사설계",
      description: "실험설계, 유사실험설계, 비실험설계",
      questions: [
        "조사설계의 개념과 기본 요소를 설명하시오.",
        "내적 타당도와 외적 타당도의 개념과 저해요인을 설명하시오.",
        "순수실험설계의 유형과 특징을 설명하시오.",
        "유사실험설계(준실험설계)의 유형과 특징을 설명하시오.",
        "전실험설계의 유형과 한계를 설명하시오.",
        "통제집단 전후비교설계를 도식화하고 설명하시오.",
        "솔로몬 4집단 설계의 장점을 설명하시오.",
        "시계열설계의 특징과 활용을 설명하시오.",
        "단일사례설계의 유형(AB, ABA, ABAB 등)을 설명하시오.",
        "비실험설계의 유형과 특징을 설명하시오.",
      ],
    },
    {
      title: "측정과 척도",
      description: "측정의 수준과 척도의 유형",
      questions: [
        "측정의 개념과 측정 수준(명목, 서열, 등간, 비율)을 설명하시오.",
        "각 측정 수준에 따른 통계분석 방법을 설명하시오.",
        "신뢰도의 개념과 유형(검사-재검사, 내적일관성 등)을 설명하시오.",
        "타당도의 개념과 유형(내용, 기준, 구성타당도)을 설명하시오.",
        "신뢰도와 타당도의 관계를 설명하시오.",
        "리커트 척도의 특징과 작성 방법을 설명하시오.",
        "거트만 척도의 특징과 누적성을 설명하시오.",
        "서스톤 척도의 특징을 설명하시오.",
        "의미분화척도의 특징과 활용을 설명하시오.",
        "조작적 정의의 개념과 중요성을 설명하시오.",
      ],
    },
    {
      title: "표집과 자료수집",
      description: "표집방법과 자료수집 기법",
      questions: [
        "모집단과 표본의 개념을 설명하시오.",
        "확률표집의 유형(단순무작위, 체계적, 층화, 집락)을 설명하시오.",
        "비확률표집의 유형(편의, 유의, 할당, 눈덩이)을 설명하시오.",
        "표집오차와 비표집오차의 차이를 설명하시오.",
        "적정 표본크기 결정에 영향을 미치는 요인을 설명하시오.",
        "설문조사의 장단점을 설명하시오.",
        "면접조사의 유형과 특징을 설명하시오.",
        "관찰법의 유형과 특징을 설명하시오.",
        "2차 자료 분석의 장단점을 설명하시오.",
        "내용분석의 개념과 절차를 설명하시오.",
      ],
    },
    {
      title: "자료분석과 통계",
      description: "기술통계, 추론통계, 가설검정",
      questions: [
        "기술통계와 추론통계의 차이를 설명하시오.",
        "중심경향치(평균, 중앙값, 최빈값)의 특성을 비교하시오.",
        "분산과 표준편차의 개념과 계산방법을 설명하시오.",
        "정규분포의 특성을 설명하시오.",
        "가설검정의 절차와 오류(1종, 2종)를 설명하시오.",
        "유의수준과 p값의 의미를 설명하시오.",
        "t검정의 종류와 활용을 설명하시오.",
        "카이제곱 검정의 활용과 해석을 설명하시오.",
        "상관관계와 인과관계의 차이를 설명하시오.",
        "회귀분석의 기본 개념을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `사회복지사 1급 사회복지조사론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 공식, 실제 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/social-worker-1" className="inline-flex items-center text-pink-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사회복지사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">사회복지조사론</h1>
          <p className="text-xl text-pink-100">1교시 | 조사설계, 측정, 표집, 통계분석 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-pink-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-blue-600">55%</p>
          </div>
        </div>

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
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-pink-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-lg text-sm hover:from-pink-600 hover:to-rose-600 transition-colors">
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

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">다른 과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/welfare/social-worker-1/study/human-behavior" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors">
              <span className="text-pink-700 font-medium">인간행동과 사회환경</span>
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

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
