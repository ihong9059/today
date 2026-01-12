"use client";

import { useState } from "react";
import Link from "next/link";

export default function PsychologyIntroStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "심리학의 기초",
      description: "역사, 관점, 연구방법",
      questions: [
        "심리학의 정의와 연구 대상을 설명하시오.",
        "과학적 심리학의 시작과 분트의 공헌을 설명하시오.",
        "행동주의 심리학의 기본 가정을 설명하시오.",
        "인지심리학의 관점과 특징을 설명하시오.",
        "정신분석 심리학의 핵심 개념을 설명하시오.",
        "인본주의 심리학의 특징을 설명하시오.",
        "생물심리학의 관점을 설명하시오.",
        "심리학 연구에서 변인의 종류를 설명하시오.",
        "실험 연구와 상관 연구의 차이를 설명하시오.",
        "심리학 연구의 윤리적 원칙을 설명하시오.",
      ],
    },
    {
      title: "학습과 기억",
      description: "고전적 조건형성, 조작적 조건형성, 기억과정",
      questions: [
        "고전적 조건형성의 원리를 설명하시오.",
        "파블로프의 실험과 주요 개념을 설명하시오.",
        "조작적 조건형성의 원리를 설명하시오.",
        "강화와 처벌의 종류와 효과를 설명하시오.",
        "강화계획(연속, 부분)의 특징을 설명하시오.",
        "관찰학습(사회학습)의 원리를 설명하시오.",
        "감각기억, 단기기억, 장기기억의 특징을 설명하시오.",
        "작업기억 모형(Baddeley)을 설명하시오.",
        "부호화, 저장, 인출 과정을 설명하시오.",
        "망각의 원인과 이론을 설명하시오.",
      ],
    },
    {
      title: "동기와 정서",
      description: "동기이론, 정서이론, 스트레스",
      questions: [
        "동기의 정의와 종류(내재적, 외재적)를 설명하시오.",
        "욕구위계이론(Maslow)의 5단계를 설명하시오.",
        "성취동기의 개념과 영향요인을 설명하시오.",
        "정서의 정의와 구성요소를 설명하시오.",
        "James-Lange 이론과 Cannon-Bard 이론을 비교하시오.",
        "Schachter의 정서 2요인 이론을 설명하시오.",
        "기본정서와 복합정서를 설명하시오.",
        "정서지능의 개념을 설명하시오.",
        "스트레스의 정의와 반응을 설명하시오.",
        "스트레스 대처전략을 설명하시오.",
      ],
    },
    {
      title: "성격심리",
      description: "성격이론, 성격평가",
      questions: [
        "성격의 정의와 특성을 설명하시오.",
        "프로이트의 성격구조(원초아, 자아, 초자아)를 설명하시오.",
        "프로이트의 심리성적 발달단계를 설명하시오.",
        "방어기제의 종류와 기능을 설명하시오.",
        "융의 분석심리학 주요 개념을 설명하시오.",
        "Erikson의 심리사회적 발달단계를 설명하시오.",
        "특성이론과 Big 5 성격요인을 설명하시오.",
        "Rogers의 자기이론을 설명하시오.",
        "Bandura의 사회인지이론을 설명하시오.",
        "성격평가 방법의 종류를 설명하시오.",
      ],
    },
    {
      title: "발달심리",
      description: "인지발달, 사회정서발달",
      questions: [
        "발달의 개념과 원리를 설명하시오.",
        "피아제의 인지발달 4단계를 설명하시오.",
        "감각운동기의 주요 특징을 설명하시오.",
        "전조작기의 사고 특성을 설명하시오.",
        "구체적 조작기와 형식적 조작기의 차이를 설명하시오.",
        "Vygotsky의 사회문화적 인지발달이론을 설명하시오.",
        "애착의 유형과 특징(Ainsworth)을 설명하시오.",
        "Kohlberg의 도덕발달 단계를 설명하시오.",
        "청소년기 발달과제와 특징을 설명하시오.",
        "노년기 발달과 적응을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `임상심리사 2급 심리학개론 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 핵심 개념, 이론적 배경, 실제 예시를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-cyan-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">심리학개론</h1>
          <p className="text-xl text-cyan-100">필기 1과목 | 심리학의 기초</p>
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
            <p className="text-3xl font-bold text-teal-600">55%</p>
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
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-1 rounded-lg text-sm hover:from-cyan-600 hover:to-teal-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/clinical-psychologist-2/study/abnormal-psychology" className="bg-teal-50 hover:bg-teal-100 rounded-lg p-3 text-center transition-colors"><span className="text-teal-700 font-medium">이상심리학</span></Link>
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
