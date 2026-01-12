"use client";

import { useState } from "react";
import Link from "next/link";

export default function PsychologicalAssessmentStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "심리측정의 기초",
      description: "신뢰도, 타당도, 규준",
      questions: [
        "심리검사의 신뢰도 종류(검사-재검사, 동형검사 등)를 설명하시오.",
        "심리검사의 타당도 종류(내용, 구인, 준거)를 설명하시오.",
        "규준(norm)의 종류와 해석방법을 설명하시오.",
        "표준점수(Z점수, T점수, 편차IQ)의 특징을 설명하시오.",
        "백분위의 개념과 해석방법을 설명하시오.",
        "측정의 표준오차(SEM)의 개념을 설명하시오.",
        "신뢰구간의 개념과 활용을 설명하시오.",
        "검사의 표준화 과정을 설명하시오.",
        "검사 문항 분석(난이도, 변별도)을 설명하시오.",
        "컴퓨터 적응검사(CAT)의 원리를 설명하시오.",
      ],
    },
    {
      title: "지능검사",
      description: "K-WAIS, K-WISC 검사",
      questions: [
        "웩슬러 지능검사의 구조와 구성을 설명하시오.",
        "K-WAIS-IV의 4가지 지표점수를 설명하시오.",
        "언어이해 지표의 하위검사를 설명하시오.",
        "지각추론 지표의 하위검사를 설명하시오.",
        "작업기억 지표의 하위검사를 설명하시오.",
        "처리속도 지표의 하위검사를 설명하시오.",
        "프로파일 분석과 유의미한 차이 해석을 설명하시오.",
        "K-WISC-V의 특징과 K-WAIS-IV와의 차이를 설명하시오.",
        "지적장애의 지능검사 결과 해석을 설명하시오.",
        "영재의 지능검사 결과 해석을 설명하시오.",
      ],
    },
    {
      title: "객관적 성격검사 (MMPI-2)",
      description: "MMPI-2의 실시, 채점, 해석",
      questions: [
        "MMPI-2의 개발 배경과 특징을 설명하시오.",
        "MMPI-2의 타당도 척도(L, F, K 등)를 설명하시오.",
        "MMPI-2의 임상척도(Hs~Si)를 설명하시오.",
        "2점 코드 해석의 원리를 설명하시오.",
        "대표적인 2점 코드 유형(27/72, 48/84 등)을 설명하시오.",
        "MMPI-2의 내용척도를 설명하시오.",
        "MMPI-2의 보충척도를 설명하시오.",
        "MMPI-2-RF의 특징과 MMPI-2와의 차이를 설명하시오.",
        "MMPI-2 프로파일의 통합적 해석을 설명하시오.",
        "MMPI-2 보고서 작성의 요령을 설명하시오.",
      ],
    },
    {
      title: "투사적 검사",
      description: "로샤검사, TAT, BGT",
      questions: [
        "투사적 검사의 기본 가정과 장단점을 설명하시오.",
        "로샤 검사의 실시 절차를 설명하시오.",
        "로샤 검사의 반응 영역(W, D, Dd)을 설명하시오.",
        "로샤 검사의 결정인(F, M, C 등)을 설명하시오.",
        "로샤 검사의 내용과 평범반응을 설명하시오.",
        "Exner 체계의 특징을 설명하시오.",
        "TAT의 실시와 해석 방법을 설명하시오.",
        "BGT의 실시와 채점 방법을 설명하시오.",
        "HTP(집-나무-사람) 검사의 해석을 설명하시오.",
        "문장완성검사(SCT)의 활용을 설명하시오.",
      ],
    },
    {
      title: "신경심리검사와 기타 검사",
      description: "신경심리평가, 발달검사",
      questions: [
        "신경심리검사의 목적과 종류를 설명하시오.",
        "주의력 검사(CPT, TMT)의 해석을 설명하시오.",
        "기억력 검사(K-MAS, Rey-Kim)의 해석을 설명하시오.",
        "실행기능 검사(WCST, Stroop)의 해석을 설명하시오.",
        "언어기능 검사의 종류와 해석을 설명하시오.",
        "치매 선별검사(MMSE, CDR)의 활용을 설명하시오.",
        "발달검사(K-CDI, 베일리)의 특징을 설명하시오.",
        "ADHD 평가를 위한 검사도구를 설명하시오.",
        "자폐스펙트럼장애 평가도구를 설명하시오.",
        "종합심리평가 배터리 구성을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `임상심리사 1급 심리검사 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 검사의 실시방법, 채점체계, 해석 원리, 임상적 활용을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-1" className="inline-flex items-center text-indigo-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">심리검사</h1>
          <p className="text-xl text-indigo-100">필기 3과목 | 심리측정과 검사 해석</p>
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
            <p className="text-3xl font-bold text-red-600">상</p>
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
            <Link href="/category/welfare/clinical-psychologist-1/study/psychology-intro" className="bg-cyan-50 hover:bg-cyan-100 rounded-lg p-3 text-center transition-colors"><span className="text-cyan-700 font-medium">심리학개론</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/abnormal-psychology" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">이상심리학</span></Link>
            <Link href="/category/welfare/clinical-psychologist-1/study/clinical-psychology" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">임상심리학</span></Link>
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
