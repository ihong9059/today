"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClinicalPsychologyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "임상심리학의 기초",
      description: "역사, 역할, 윤리",
      questions: [
        "임상심리학의 정의와 역사적 발전을 설명하시오.",
        "임상심리사의 역할과 업무 영역을 설명하시오.",
        "과학자-실무자 모델(Boulder 모델)을 설명하시오.",
        "임상심리 분야의 윤리강령 핵심 원칙을 설명하시오.",
        "비밀보장의 원칙과 예외 상황을 설명하시오.",
        "다중관계의 윤리적 문제를 설명하시오.",
        "근거기반실무(EBP)의 개념과 중요성을 설명하시오.",
        "문화적 역량의 개념과 필요성을 설명하시오.",
        "임상심리 수련과정을 설명하시오.",
        "임상심리사의 자기돌봄(self-care)의 중요성을 설명하시오.",
      ],
    },
    {
      title: "임상 면담과 평가",
      description: "면담기법, 사례개념화",
      questions: [
        "구조화 면담과 비구조화 면담의 차이를 설명하시오.",
        "정신상태검사(MSE)의 구성요소를 설명하시오.",
        "행동관찰의 방법과 기록을 설명하시오.",
        "초기 면담에서 다루어야 할 내용을 설명하시오.",
        "위기 면담의 특징과 기법을 설명하시오.",
        "사례개념화의 정의와 구성요소를 설명하시오.",
        "생물-심리-사회 모델의 적용을 설명하시오.",
        "치료 목표 설정의 원칙(SMART)을 설명하시오.",
        "치료 계획 수립의 과정을 설명하시오.",
        "심리평가 보고서 작성의 원칙을 설명하시오.",
      ],
    },
    {
      title: "심리치료 이론과 기법",
      description: "정신역동, 인지행동, 인본주의",
      questions: [
        "정신역동치료의 핵심 개념(전이, 저항 등)을 설명하시오.",
        "인지치료의 인지적 왜곡 유형을 설명하시오.",
        "행동치료의 주요 기법(체계적 둔감화 등)을 설명하시오.",
        "인지행동치료(CBT)의 치료 과정을 설명하시오.",
        "수용전념치료(ACT)의 핵심 요소를 설명하시오.",
        "변증법적 행동치료(DBT)의 특징을 설명하시오.",
        "마음챙김 기반 치료의 원리를 설명하시오.",
        "인간중심치료의 핵심 조건을 설명하시오.",
        "게슈탈트 치료의 주요 기법을 설명하시오.",
        "통합적/절충적 치료 접근을 설명하시오.",
      ],
    },
    {
      title: "특수 집단과 치료",
      description: "아동, 노인, 트라우마",
      questions: [
        "아동 청소년 심리치료의 특수성을 설명하시오.",
        "놀이치료의 원리와 기법을 설명하시오.",
        "노인 심리치료의 특수한 고려사항을 설명하시오.",
        "인지재활의 목적과 방법을 설명하시오.",
        "트라우마 초점 인지행동치료의 특징을 설명하시오.",
        "EMDR의 원리와 치료 과정을 설명하시오.",
        "자살 위험성 평가와 개입을 설명하시오.",
        "물질사용장애의 동기강화면담을 설명하시오.",
        "섭식장애의 심리치료적 접근을 설명하시오.",
        "성격장애의 심리치료적 접근을 설명하시오.",
      ],
    },
    {
      title: "치료 과정과 효과",
      description: "치료관계, 효과연구",
      questions: [
        "치료적 동맹(therapeutic alliance)의 중요성을 설명하시오.",
        "치료 초기 단계의 과제를 설명하시오.",
        "치료 중기 단계의 작업을 설명하시오.",
        "치료 종결의 과정과 고려사항을 설명하시오.",
        "치료 저항의 유형과 대처를 설명하시오.",
        "치료 효과 연구의 방법론을 설명하시오.",
        "효과 크기(effect size)의 해석을 설명하시오.",
        "공통요인 접근(common factors)을 설명하시오.",
        "치료 실패의 원인과 대처를 설명하시오.",
        "수퍼비전의 목적과 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `임상심리사 1급 임상심리학 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 실제 임상 적용, 관련 연구를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-1" className="inline-flex items-center text-violet-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">임상심리학</h1>
          <p className="text-xl text-violet-100">필기 4과목 | 임상장면의 심리평가와 개입</p>
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
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-purple-600">52%</p>
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
            <Link href="/category/welfare/clinical-psychologist-1/study/psychology-intro" className="bg-cyan-50 hover:bg-cyan-100 rounded-lg p-3 text-center transition-colors"><span className="text-cyan-700 font-medium">심리학개론</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/abnormal-psychology" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">이상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/psychological-assessment" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">심리검사</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/counseling" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">심리상담</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/practical" className="bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg p-3 text-center transition-colors"><span className="text-fuchsia-700 font-medium">실기</span></Link>
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
