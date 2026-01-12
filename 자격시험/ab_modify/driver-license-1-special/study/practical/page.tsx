"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "트레일러 연결/분리",
      description: "연결 절차, 점검, 분리 방법",
      questions: [
        "트레일러 연결 전 점검사항을 설명하시오.",
        "제5륜과 킹핀 연결 절차를 설명하시오.",
        "연결 후 안전 확인 방법을 설명하시오.",
        "글래디핸드 연결 순서를 설명하시오.",
        "전기 커넥터 연결 방법을 설명하시오.",
        "랜딩기어 조작 방법을 설명하시오.",
        "트레일러 분리 절차를 설명하시오.",
        "분리 시 안전조치를 설명하시오.",
        "연결장치 잠금 확인을 설명하시오.",
        "연결 상태 최종점검을 설명하시오.",
      ],
    },
    {
      title: "트레일러 장내기능",
      description: "후진, 직각코스, 방향전환",
      questions: [
        "트레일러 후진 핸들 조작 원리를 설명하시오.",
        "트레일러 후진 시 방향 수정을 설명하시오.",
        "트레일러 직각코스 진입 요령을 설명하시오.",
        "트레일러 S자코스 통과 방법을 설명하시오.",
        "트레일러 굴절코스 요령을 설명하시오.",
        "좁은 공간 방향전환 방법을 설명하시오.",
        "트레일러 정지선 맞추기를 설명하시오.",
        "코스 통과 시 내륜차 고려를 설명하시오.",
        "장내시험 감점 기준을 설명하시오.",
        "트레일러 코스 실격 항목을 설명하시오.",
      ],
    },
    {
      title: "트레일러 도로주행",
      description: "출발, 차로변경, 교차로 통행",
      questions: [
        "트레일러 출발 전 점검을 설명하시오.",
        "연결차량 출발 순서를 설명하시오.",
        "트레일러 차로변경 요령을 설명하시오.",
        "트레일러 사각지대 확인을 설명하시오.",
        "트레일러 교차로 직진 통행을 설명하시오.",
        "트레일러 좌회전 궤적 확인을 설명하시오.",
        "트레일러 우회전 시 주의사항을 설명하시오.",
        "트레일러 유턴 가능 여부를 설명하시오.",
        "연결차량 정지 시 안전거리를 설명하시오.",
        "고속도로 연결차량 통행을 설명하시오.",
      ],
    },
    {
      title: "레커 실기",
      description: "견인 작업, 차량 적재, 운반",
      questions: [
        "레커 견인 작업 준비를 설명하시오.",
        "고장차량 견인 연결 방법을 설명하시오.",
        "휠리프트 사용 방법을 설명하시오.",
        "견인바 연결 방법을 설명하시오.",
        "플랫베드 차량 적재 방법을 설명하시오.",
        "적재 후 고정 방법을 설명하시오.",
        "레커 견인 출발 절차를 설명하시오.",
        "견인 중 피견인차 확인을 설명하시오.",
        "견인 후 인계 절차를 설명하시오.",
        "레커 실기 감점 항목을 설명하시오.",
      ],
    },
    {
      title: "실기시험 감점/실격",
      description: "주요 감점, 즉시실격, 합격기준",
      questions: [
        "트레일러 실기 즉시실격 항목을 설명하시오.",
        "연결장치 오류 감점 기준을 설명하시오.",
        "후진 시 방향 실수 감점을 설명하시오.",
        "코스 이탈 감점 기준을 설명하시오.",
        "접촉/충돌 감점 기준을 설명하시오.",
        "도로주행 신호위반 감점을 설명하시오.",
        "안전확인 미흡 감점을 설명하시오.",
        "속도위반 감점 기준을 설명하시오.",
        "70점 합격 기준 계산을 설명하시오.",
        "재시험 응시 절차를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `1종 특수면허 실기시험 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 트레일러/레커 특성을 고려한 실제 시험 상황에서의 구체적인 요령과 주의사항을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-special" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 특수면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 (장내/도로)</h1>
          <p className="text-xl text-indigo-200">트레일러 연결/후진, 레커 작업, 도로주행</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-indigo-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">장내기능</p>
            <p className="text-3xl font-bold text-violet-600">70점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">도로주행</p>
            <p className="text-3xl font-bold text-purple-600">70점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">특수면허 실기시험 핵심</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-indigo-700 mb-2">트레일러 실기</h4>
              <ul className="text-sm text-indigo-600 space-y-1">
                <li>- 연결/분리 작업 (필수)</li>
                <li>- 후진 핸들 반대 조작</li>
                <li>- 궤적 차이 고려 필수</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-violet-700 mb-2">레커 실기</h4>
              <ul className="text-sm text-violet-600 space-y-1">
                <li>- 견인 연결 작업</li>
                <li>- 휠리프트/견인바 사용</li>
                <li>- 플랫베드 적재 작업</li>
              </ul>
            </div>
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
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-3 py-1 rounded-lg text-sm hover:from-indigo-600 hover:to-violet-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-special/study/traffic-law" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
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
