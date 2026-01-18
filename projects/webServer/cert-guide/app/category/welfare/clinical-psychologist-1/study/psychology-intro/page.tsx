"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PsychologyIntroStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "심리학의 역사와 관점",
      description: "심리학의 발전과 주요 이론적 관점",
      questions: [
        "구조주의와 기능주의의 차이점을 설명하시오.",
        "행동주의 심리학의 핵심 원리와 대표 학자를 설명하시오.",
        "정신분석학의 기본 가정과 무의식의 개념을 설명하시오.",
        "인본주의 심리학의 특징과 매슬로우의 욕구위계를 설명하시오.",
        "인지주의 심리학의 등장 배경과 핵심 개념을 설명하시오.",
        "생물심리학적 관점의 특징을 설명하시오.",
        "진화심리학의 기본 원리를 설명하시오.",
        "사회문화적 관점이 심리학에 미친 영향을 설명하시오.",
        "절충주의적 접근의 필요성을 설명하시오.",
        "현대 심리학의 주요 분야를 나열하고 설명하시오.",
      ],
    },
    {
      title: "생물심리학과 신경과학",
      description: "뇌와 신경계의 구조와 기능",
      questions: [
        "뉴런의 구조와 신경전달 과정을 설명하시오.",
        "주요 신경전달물질(도파민, 세로토닌 등)의 기능을 설명하시오.",
        "대뇌피질의 엽별 기능을 설명하시오.",
        "변연계의 구조와 기능을 설명하시오.",
        "자율신경계(교감/부교감)의 기능을 설명하시오.",
        "내분비계와 호르몬의 심리적 영향을 설명하시오.",
        "뇌의 가소성(plasticity)의 개념과 의의를 설명하시오.",
        "분리뇌 연구의 결과와 의미를 설명하시오.",
        "신경영상 기법(fMRI, EEG 등)의 원리를 설명하시오.",
        "유전과 환경의 상호작용을 설명하시오.",
      ],
    },
    {
      title: "학습과 기억",
      description: "행동과 인지의 학습, 기억의 과정",
      questions: [
        "고전적 조건형성의 원리와 파블로프 실험을 설명하시오.",
        "조작적 조건형성과 강화의 유형을 설명하시오.",
        "관찰학습(대리학습)의 과정과 반두라의 실험을 설명하시오.",
        "학습된 무기력의 개념과 임상적 의의를 설명하시오.",
        "기억의 3단계 모델(부호화, 저장, 인출)을 설명하시오.",
        "작업기억(working memory)의 구조를 설명하시오.",
        "장기기억의 유형(서술적/절차적)을 설명하시오.",
        "망각의 원인(간섭, 소멸 등)을 설명하시오.",
        "기억의 왜곡과 거짓 기억 현상을 설명하시오.",
        "기억 향상 전략을 설명하시오.",
      ],
    },
    {
      title: "발달심리학",
      description: "인간 발달의 단계와 과정",
      questions: [
        "피아제의 인지발달 4단계를 설명하시오.",
        "비고츠키의 사회문화적 발달이론을 설명하시오.",
        "에릭슨의 심리사회적 발달 8단계를 설명하시오.",
        "애착이론과 애착 유형(안정/불안정)을 설명하시오.",
        "콜버그의 도덕발달 단계를 설명하시오.",
        "청소년기 정체성 발달의 특징을 설명하시오.",
        "성인기 발달과제와 특성을 설명하시오.",
        "노년기의 심리적 특성과 적응을 설명하시오.",
        "발달의 결정적 시기와 민감기를 설명하시오.",
        "발달에서 유전-환경 논쟁의 현대적 관점을 설명하시오.",
      ],
    },
    {
      title: "성격심리학과 사회심리학",
      description: "성격이론과 사회적 행동",
      questions: [
        "프로이트의 성격구조(원초아, 자아, 초자아)를 설명하시오.",
        "융의 분석심리학과 집단무의식을 설명하시오.",
        "로저스의 자기이론과 자기실현 경향성을 설명하시오.",
        "특질이론과 Big Five 성격요인을 설명하시오.",
        "사회학습이론의 성격 형성 관점을 설명하시오.",
        "귀인이론과 귀인 오류를 설명하시오.",
        "태도의 형성과 변화 과정을 설명하시오.",
        "동조와 복종에 관한 실험(애쉬, 밀그램)을 설명하시오.",
        "집단사고와 집단극화 현상을 설명하시오.",
        "편견과 차별의 심리적 기제를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `임상심리사 1급 심리학개론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 대표 학자, 이론의 특징, 실제 적용 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-1" className="inline-flex items-center text-cyan-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">심리학개론</h1>
          <p className="text-xl text-cyan-100">필기 1과목 | 심리학의 기초 이론과 개념</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-cyan-600">50문항</p>
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
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-cyan-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-cyan-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:from-cyan-600 hover:to-blue-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/clinical-psychologist-1/study/abnormal-psychology" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">이상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/psychological-assessment" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">심리검사</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/clinical-psychology" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">임상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/counseling" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">심리상담</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/practical" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">실기</span></Link>
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
