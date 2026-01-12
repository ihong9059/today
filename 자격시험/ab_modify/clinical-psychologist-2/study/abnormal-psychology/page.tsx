"use client";

import { useState } from "react";
import Link from "next/link";

export default function AbnormalPsychologyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "이상심리학 기초",
      description: "정의, 분류체계, 진단",
      questions: [
        "이상행동의 정의와 판단 기준을 설명하시오.",
        "정상과 이상의 연속성 개념을 설명하시오.",
        "DSM-5의 구조와 특징을 설명하시오.",
        "DSM-5의 주요 변화(DSM-IV-TR과 비교)를 설명하시오.",
        "ICD-11과 DSM-5의 차이점을 설명하시오.",
        "이상행동의 생물학적 모델을 설명하시오.",
        "이상행동의 심리사회적 모델을 설명하시오.",
        "취약성-스트레스 모델을 설명하시오.",
        "정신장애의 위험요인과 보호요인을 설명하시오.",
        "문화적 맥락에서의 이상행동 이해를 설명하시오.",
      ],
    },
    {
      title: "불안장애와 강박장애",
      description: "불안장애 스펙트럼",
      questions: [
        "범불안장애의 진단기준과 특징을 설명하시오.",
        "공황장애의 진단기준과 특징을 설명하시오.",
        "광장공포증의 정의와 특징을 설명하시오.",
        "사회불안장애의 진단기준과 특징을 설명하시오.",
        "특정공포증의 유형과 특징을 설명하시오.",
        "분리불안장애의 진단기준을 설명하시오.",
        "강박장애의 진단기준과 특징을 설명하시오.",
        "강박사고와 강박행동의 관계를 설명하시오.",
        "신체이형장애의 특징을 설명하시오.",
        "불안장애의 인지행동적 치료를 설명하시오.",
      ],
    },
    {
      title: "우울장애와 양극성장애",
      description: "기분장애 스펙트럼",
      questions: [
        "주요우울장애의 진단기준을 설명하시오.",
        "우울삽화의 증상을 설명하시오.",
        "지속성 우울장애(기분저하증)의 특징을 설명하시오.",
        "우울장애의 인지이론(Beck)을 설명하시오.",
        "학습된 무기력 이론(Seligman)을 설명하시오.",
        "양극성 I형 장애의 진단기준을 설명하시오.",
        "양극성 II형 장애의 진단기준을 설명하시오.",
        "조증삽화와 경조증삽화의 차이를 설명하시오.",
        "순환성 장애의 특징을 설명하시오.",
        "기분장애의 치료적 접근을 설명하시오.",
      ],
    },
    {
      title: "조현병 스펙트럼",
      description: "정신병적 장애",
      questions: [
        "조현병의 진단기준을 설명하시오.",
        "조현병의 양성증상을 설명하시오.",
        "조현병의 음성증상을 설명하시오.",
        "망상의 종류와 특징을 설명하시오.",
        "환각의 종류와 특징을 설명하시오.",
        "조현정동장애의 특징을 설명하시오.",
        "망상장애의 진단기준을 설명하시오.",
        "단기 정신병적 장애의 특징을 설명하시오.",
        "조현병의 신경생물학적 이론을 설명하시오.",
        "조현병의 예후와 치료를 설명하시오.",
      ],
    },
    {
      title: "성격장애와 기타 장애",
      description: "성격장애, 해리장애, 신체증상장애",
      questions: [
        "성격장애의 일반적 특징을 설명하시오.",
        "A군 성격장애(편집성, 조현성, 조현형)를 설명하시오.",
        "B군 성격장애(반사회성, 경계성, 연극성, 자기애성)를 설명하시오.",
        "C군 성격장애(회피성, 의존성, 강박성)를 설명하시오.",
        "경계성 성격장애의 특징과 치료를 설명하시오.",
        "해리장애의 종류와 특징을 설명하시오.",
        "해리성 정체감장애의 특징을 설명하시오.",
        "신체증상장애의 진단기준을 설명하시오.",
        "질병불안장애의 특징을 설명하시오.",
        "전환장애의 특징을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `임상심리사 2급 이상심리학 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. DSM-5 진단기준, 핵심 증상, 감별진단을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-teal-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">이상심리학</h1>
          <p className="text-xl text-teal-100">필기 2과목 | 정신장애의 이해</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-teal-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">예상 합격률</p>
            <p className="text-3xl font-bold text-cyan-600">45%</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-teal-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-teal-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 rounded-lg text-sm hover:from-teal-600 hover:to-cyan-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/clinical-psychologist-2/study/psychological-assessment" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">심리검사</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/clinical-psychology" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">임상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/counseling" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">심리상담</span></Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">실기</span></Link>
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
