"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "대형차 장내기능 - 기본코스",
      description: "굴절, 곡선, S자코스, 직각코스",
      questions: [
        "대형차 굴절코스 진입 요령을 설명하시오.",
        "대형차 굴절코스 중간 통과법을 설명하시오.",
        "대형차 곡선코스 핸들 조작을 설명하시오.",
        "대형차 S자코스 통과 요령을 설명하시오.",
        "대형차 직각코스 진입 각도를 설명하시오.",
        "대형차 코스 통과 시 내륜차 고려를 설명하시오.",
        "대형차 후방 확인 방법을 설명하시오.",
        "코스 라인 밟음 감점 기준을 설명하시오.",
        "코스 이탈 시 재진입 방법을 설명하시오.",
        "대형차 저속 핸들 조작 요령을 설명하시오.",
      ],
    },
    {
      title: "대형차 장내기능 - 특수코스",
      description: "경사로, 후진, 방향전환",
      questions: [
        "대형차 경사로 오르막 정지 요령을 설명하시오.",
        "대형차 경사로 밀림 방지 방법을 설명하시오.",
        "대형차 에어브레이크 사용 요령을 설명하시오.",
        "대형차 후진 시 사각지대 확인을 설명하시오.",
        "대형차 후진 핸들 조작 요령을 설명하시오.",
        "대형차 방향전환 코스 통과를 설명하시오.",
        "대형차 좁은 공간 회전 요령을 설명하시오.",
        "대형차 주차브레이크 사용을 설명하시오.",
        "대형차 기어 조작 순서를 설명하시오.",
        "장내시험 시간 제한과 감점을 설명하시오.",
      ],
    },
    {
      title: "대형차 도로주행 - 기본기술",
      description: "출발, 가속, 차로변경",
      questions: [
        "대형차 출발 전 점검사항을 설명하시오.",
        "대형차 미러 조정 방법을 설명하시오.",
        "대형차 출발 순서와 요령을 설명하시오.",
        "대형차 가속 시 기어 변속을 설명하시오.",
        "대형차 차로변경 순서를 설명하시오.",
        "대형차 사각지대 확인 방법을 설명하시오.",
        "대형차 방향지시등 사용 타이밍을 설명하시오.",
        "대형차 감속 시 엔진브레이크 사용을 설명하시오.",
        "대형차 정지 시 안전거리를 설명하시오.",
        "대형차 급제동 시 주의사항을 설명하시오.",
      ],
    },
    {
      title: "대형차 도로주행 - 교차로/회전",
      description: "좌회전, 우회전, 대형차 특수상황",
      questions: [
        "대형차 교차로 직진 통행을 설명하시오.",
        "대형차 좌회전 시 궤적 확인을 설명하시오.",
        "대형차 우회전 시 내륜차 주의를 설명하시오.",
        "대형차 우회전 시 자전거 확인을 설명하시오.",
        "대형버스 승객 안전 고려 회전을 설명하시오.",
        "대형차 회전교차로 통행을 설명하시오.",
        "대형차 유턴 가능 장소를 설명하시오.",
        "대형차 좁은 도로 통행 요령을 설명하시오.",
        "대형차 교차로 정지선 준수를 설명하시오.",
        "대형차 신호대기 위치를 설명하시오.",
      ],
    },
    {
      title: "대형차 도로주행 - 감점항목",
      description: "주요 감점, 즉시실격, 합격기준",
      questions: [
        "대형차 즉시 실격 항목을 설명하시오.",
        "대형차 신호위반 감점 기준을 설명하시오.",
        "대형차 중앙선 침범 감점 기준을 설명하시오.",
        "대형차 안전거리 미확보 감점을 설명하시오.",
        "대형차 급제동 감점 기준을 설명하시오.",
        "대형차 차로이탈 감점 기준을 설명하시오.",
        "대형차 속도위반 감점 기준을 설명하시오.",
        "대형차 보행자 보호 위반 감점을 설명하시오.",
        "대형차 도로주행 합격 기준(70점)을 설명하시오.",
        "대형차 재시험 응시 절차를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 대형면허 실기시험 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형차량 특성을 고려한 실제 시험 상황에서의 구체적인 요령과 주의사항을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-large" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 대형면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 (장내/도로)</h1>
          <p className="text-xl text-indigo-200">대형차 기능시험 + 도로주행시험 대비</p>
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
            <p className="text-gray-600 text-sm">주행거리</p>
            <p className="text-3xl font-bold text-pink-600">5km+</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">대형차 실기시험 특이사항</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-indigo-700 mb-2">장내기능시험</h4>
              <ul className="text-sm text-indigo-600 space-y-1">
                <li>- 대형차 전용 코스 (더 넓은 폭)</li>
                <li>- 내륜차 현상 고려 필수</li>
                <li>- 에어브레이크 조작 숙달</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-violet-700 mb-2">도로주행시험</h4>
              <ul className="text-sm text-violet-600 space-y-1">
                <li>- 대형차 사각지대 상시 확인</li>
                <li>- 우회전 시 보행자/자전거 주의</li>
                <li>- 안전거리 충분히 확보</li>
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
            <Link href="/category/driving/driver-license-1-large/study/traffic-law" className="bg-zinc-50 hover:bg-zinc-100 rounded-lg p-3 text-center transition-colors"><span className="text-zinc-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
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
