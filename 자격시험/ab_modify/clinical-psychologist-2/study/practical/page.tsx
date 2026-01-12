"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "심리검사 실시",
      description: "지능검사, MMPI-2, 투사검사 실시",
      questions: [
        "K-WAIS-IV 검사의 실시 절차를 설명하시오.",
        "K-WAIS-IV 언어이해 하위검사 실시를 설명하시오.",
        "K-WAIS-IV 지각추론 하위검사 실시를 설명하시오.",
        "MMPI-2 검사 실시 시 유의사항을 설명하시오.",
        "MMPI-2 무응답 문항 처리 방법을 설명하시오.",
        "로샤 검사의 실시 절차를 설명하시오.",
        "로샤 검사의 표준 지시문을 설명하시오.",
        "BGT 검사의 실시 절차를 설명하시오.",
        "TAT 검사의 실시 방법을 설명하시오.",
        "검사 배터리 구성의 원칙을 설명하시오.",
      ],
    },
    {
      title: "심리검사 채점",
      description: "MMPI-2, 로샤 기초 채점",
      questions: [
        "MMPI-2 원점수 산출 방법을 설명하시오.",
        "MMPI-2 T점수 변환을 설명하시오.",
        "MMPI-2 타당도 척도(L, F, K)의 채점을 설명하시오.",
        "MMPI-2 임상척도의 상승 확인을 설명하시오.",
        "로샤 검사의 위치(location) 코딩을 설명하시오.",
        "로샤 검사의 결정인 기초 코딩을 설명하시오.",
        "로샤 검사의 내용 코딩을 설명하시오.",
        "K-WAIS-IV 환산점수 계산을 설명하시오.",
        "K-WAIS-IV 지표점수 산출을 설명하시오.",
        "BGT 검사의 기초 채점을 설명하시오.",
      ],
    },
    {
      title: "심리검사 해석",
      description: "프로파일 분석 기초",
      questions: [
        "K-WAIS-IV 프로파일 기초 해석을 설명하시오.",
        "K-WAIS-IV 지표점수 해석을 설명하시오.",
        "MMPI-2 타당도 척도 해석을 설명하시오.",
        "MMPI-2 임상척도 상승의 의미를 설명하시오.",
        "MMPI-2 기본적인 2점 코드 해석을 설명하시오.",
        "로샤 검사의 기초 해석을 설명하시오.",
        "로샤 경험유형(EB)의 기초 해석을 설명하시오.",
        "BGT 검사 결과의 기초 해석을 설명하시오.",
        "TAT 반응의 기초 해석을 설명하시오.",
        "다중검사 결과의 통합적 이해를 설명하시오.",
      ],
    },
    {
      title: "사례개념화와 진단",
      description: "DSM-5 진단 기초, 치료계획",
      questions: [
        "주요우울장애의 DSM-5 진단을 설명하시오.",
        "범불안장애의 DSM-5 진단을 설명하시오.",
        "공황장애의 DSM-5 진단을 설명하시오.",
        "사회불안장애의 DSM-5 진단을 설명하시오.",
        "불안장애 간 감별진단을 설명하시오.",
        "생물-심리-사회 모델의 적용을 설명하시오.",
        "사례개념화의 기본 구성을 설명하시오.",
        "치료 목표 설정의 원칙을 설명하시오.",
        "치료 계획 수립의 기초를 설명하시오.",
        "근거기반 치료 선택을 설명하시오.",
      ],
    },
    {
      title: "심리평가 보고서 기초",
      description: "보고서 작성 기초",
      questions: [
        "심리평가 보고서의 구성요소를 설명하시오.",
        "의뢰사유 기술 방법을 설명하시오.",
        "배경정보 기술 방법을 설명하시오.",
        "행동관찰 기록 작성을 설명하시오.",
        "검사결과 기술의 원칙을 설명하시오.",
        "요약 및 결론 작성의 원칙을 설명하시오.",
        "권고사항 작성의 요령을 설명하시오.",
        "보고서 작성의 윤리적 고려를 설명하시오.",
        "피드백 면담의 기초를 설명하시오.",
        "비밀보장의 원칙과 예외를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `임상심리사 2급 실기시험 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 검사 실시 절차, 채점 방법, 해석 원리를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-purple-100">임상심리실무 | 필답형</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-purple-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험시간</p>
            <p className="text-3xl font-bold text-fuchsia-600">120분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격기준</p>
            <p className="text-3xl font-bold text-rose-600">60점</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 mb-8 border border-purple-200">
          <h3 className="font-bold text-purple-800 mb-3">2급 실기시험 특징</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-purple-700 mb-2">필답형 (100%)</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>- 심리검사 실시 및 해석</li>
                <li>- DSM-5 진단 기초</li>
                <li>- 사례개념화 기초</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-fuchsia-700 mb-2">1급과의 차이점</h4>
              <ul className="text-sm text-fuchsia-600 space-y-1">
                <li>- 작업형 없음</li>
                <li>- 시험시간 120분 (1급: 180분)</li>
                <li>- 기초 수준의 해석 능력</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-fuchsia-600 transition-colors">AI 도움</button>
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
            <Link href="/category/welfare/clinical-psychologist-2/study/counseling" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">심리상담</span></Link>
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
