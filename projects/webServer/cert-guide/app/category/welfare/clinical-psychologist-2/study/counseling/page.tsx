"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function CounselingStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "상담의 기초",
      description: "상담 관계와 기본 기술",
      questions: [
        "상담의 정의와 목표를 설명하시오.",
        "상담과 심리치료의 차이를 설명하시오.",
        "상담자의 자질과 역량을 설명하시오.",
        "상담 관계의 특성을 설명하시오.",
        "공감(empathy)의 개념과 중요성을 설명하시오.",
        "무조건적 긍정적 존중의 의미를 설명하시오.",
        "일치성(congruence)의 개념을 설명하시오.",
        "적극적 경청의 기술을 설명하시오.",
        "반영(reflection)의 유형을 설명하시오.",
        "명료화와 요약의 기술을 설명하시오.",
      ],
    },
    {
      title: "정신분석적 상담",
      description: "정신분석 이론과 기법",
      questions: [
        "프로이트의 정신분석이론 핵심 개념을 설명하시오.",
        "의식, 전의식, 무의식의 개념을 설명하시오.",
        "원초아, 자아, 초자아의 기능을 설명하시오.",
        "방어기제의 종류와 기능을 설명하시오.",
        "전이(transference)의 개념을 설명하시오.",
        "역전이(countertransference)의 이해를 설명하시오.",
        "저항(resistance)의 유형을 설명하시오.",
        "꿈 분석의 원리를 설명하시오.",
        "자유연상의 기법을 설명하시오.",
        "대상관계이론의 기본 개념을 설명하시오.",
      ],
    },
    {
      title: "인지행동 상담",
      description: "CBT 이론과 기법",
      questions: [
        "인지행동치료의 기본 가정을 설명하시오.",
        "Beck의 인지삼제(cognitive triad)를 설명하시오.",
        "인지적 왜곡의 유형을 설명하시오.",
        "자동적 사고의 확인 방법을 설명하시오.",
        "소크라테스식 질문의 원리를 설명하시오.",
        "Ellis의 REBT와 ABC 모델을 설명하시오.",
        "비합리적 신념의 특징을 설명하시오.",
        "행동활성화의 원리를 설명하시오.",
        "이완훈련의 종류를 설명하시오.",
        "인지재구조화의 방법을 설명하시오.",
      ],
    },
    {
      title: "인본주의 및 기타 접근",
      description: "인간중심, 게슈탈트, 해결중심",
      questions: [
        "인간중심상담의 기본 원리를 설명하시오.",
        "Rogers의 치료적 조건을 설명하시오.",
        "자기실현경향성의 개념을 설명하시오.",
        "게슈탈트 상담의 핵심 개념을 설명하시오.",
        "게슈탈트 기법(빈의자 등)을 설명하시오.",
        "현실치료의 원리를 설명하시오.",
        "선택이론의 기본 욕구를 설명하시오.",
        "해결중심 단기상담의 특징을 설명하시오.",
        "예외질문과 기적질문을 설명하시오.",
        "동기강화면담의 원리를 설명하시오.",
      ],
    },
    {
      title: "집단상담과 상담 윤리",
      description: "집단상담, 윤리적 문제",
      questions: [
        "집단상담의 치료적 요인(Yalom)을 설명하시오.",
        "집단발달 단계를 설명하시오.",
        "집단상담에서 리더의 역할을 설명하시오.",
        "집단역동의 개념을 설명하시오.",
        "가족상담의 기본 개념을 설명하시오.",
        "상담 윤리의 주요 원칙을 설명하시오.",
        "비밀보장과 그 한계를 설명하시오.",
        "이중관계의 윤리적 문제를 설명하시오.",
        "상담 기록의 관리 원칙을 설명하시오.",
        "수퍼비전의 목적과 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `임상심리사 2급 심리상담 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 이론적 배경, 핵심 개념, 상담 장면에서의 적용을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-violet-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">심리상담</h1>
          <p className="text-xl text-violet-100">필기 5과목 | 상담이론과 기법</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-violet-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-yellow-600">중</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-purple-600">58%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-violet-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-violet-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:from-violet-600 hover:to-purple-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/clinical-psychologist-2/study/clinical-psychology" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">임상심리학</span></Link>
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
