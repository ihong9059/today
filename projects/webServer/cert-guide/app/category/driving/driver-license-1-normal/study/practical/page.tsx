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
      title: "장내기능시험 - 기본코스",
      description: "굴절, 곡선, 직각코스 통과",
      questions: [
        "굴절코스 진입 방법과 요령을 설명하시오.",
        "굴절코스 중간 꺾이는 지점 통과법을 설명하시오.",
        "굴절코스 탈출 시 주의사항을 설명하시오.",
        "곡선코스 핸들 조작 요령을 설명하시오.",
        "곡선코스 속도 조절 방법을 설명하시오.",
        "직각코스 진입 각도 잡는 법을 설명하시오.",
        "직각코스 꺾는 타이밍을 설명하시오.",
        "코스 진행 중 라인 밟음 감점 기준을 설명하시오.",
        "코스 이탈 시 대처 방법을 설명하시오.",
        "코스 통과 실패 시 재시도 방법을 설명하시오.",
      ],
    },
    {
      title: "장내기능시험 - 경사로/주차",
      description: "경사로, T자주차, 평행주차",
      questions: [
        "경사로 오르막 정지 요령을 설명하시오.",
        "경사로 출발 시 밀림 방지 방법을 설명하시오.",
        "경사로 내리막 제동 요령을 설명하시오.",
        "T자 주차 진입 방법을 설명하시오.",
        "T자 주차 후진 핸들 조작을 설명하시오.",
        "T자 주차 정차 위치 맞추기를 설명하시오.",
        "평행주차 진입 각도 설정을 설명하시오.",
        "평행주차 후진 타이밍을 설명하시오.",
        "평행주차 핸들 복원 시점을 설명하시오.",
        "주차 후 기어 및 주차브레이크 조작을 설명하시오.",
      ],
    },
    {
      title: "도로주행시험 - 기본기술",
      description: "출발, 차로변경, 정지",
      questions: [
        "도로주행 출발 전 확인사항을 설명하시오.",
        "안전벨트 착용 및 미러 조정을 설명하시오.",
        "시동 후 출발 순서를 설명하시오.",
        "가속과 감속 요령을 설명하시오.",
        "차로변경 순서와 방법을 설명하시오.",
        "방향지시등 사용 타이밍을 설명하시오.",
        "사이드미러 확인 방법을 설명하시오.",
        "정지 시 브레이크 사용법을 설명하시오.",
        "신호대기 중 기어 조작을 설명하시오.",
        "급정지 상황 대처법을 설명하시오.",
      ],
    },
    {
      title: "도로주행시험 - 교차로/회전",
      description: "좌회전, 우회전, 유턴",
      questions: [
        "교차로 직진 통행 방법을 설명하시오.",
        "교차로 좌회전 순서를 설명하시오.",
        "비보호 좌회전 방법을 설명하시오.",
        "교차로 우회전 순서를 설명하시오.",
        "우회전 시 횡단보도 보행자 확인을 설명하시오.",
        "회전교차로 진입과 통행을 설명하시오.",
        "유턴 허용 장소와 방법을 설명하시오.",
        "좁은 도로에서 방향전환을 설명하시오.",
        "T자 교차로 통행방법을 설명하시오.",
        "신호등 없는 교차로 통행을 설명하시오.",
      ],
    },
    {
      title: "도로주행시험 - 감점항목",
      description: "주요 감점사항, 실격항목",
      questions: [
        "즉시 실격 항목을 설명하시오.",
        "신호위반 감점 기준을 설명하시오.",
        "중앙선 침범 감점 기준을 설명하시오.",
        "안전거리 미확보 감점 기준을 설명하시오.",
        "방향지시등 미사용 감점 기준을 설명하시오.",
        "급제동/급가속 감점 기준을 설명하시오.",
        "차로 이탈 감점 기준을 설명하시오.",
        "보행자 보호 위반 감점 기준을 설명하시오.",
        "70점 합격 기준과 감점 계산을 설명하시오.",
        "재시험 응시 절차를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 보통면허 실기시험 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 시험 상황에서의 구체적인 요령과 주의사항을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-normal" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 보통면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 (장내/도로)</h1>
          <p className="text-xl text-blue-200">기능시험 + 도로주행시험 대비</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-blue-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">장내기능</p>
            <p className="text-3xl font-bold text-indigo-600">70점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">도로주행</p>
            <p className="text-3xl font-bold text-violet-600">70점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">주행거리</p>
            <p className="text-3xl font-bold text-purple-600">5km+</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">실기시험 구성</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">장내기능시험</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>- 굴절코스, 곡선코스, 직각코스</li>
                <li>- 경사로 정지 및 출발</li>
                <li>- T자 주차, 평행주차</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-indigo-700 mb-2">도로주행시험</h4>
              <ul className="text-sm text-indigo-600 space-y-1">
                <li>- 5km 이상 실제 도로 주행</li>
                <li>- 교차로, 차로변경, 좌우회전</li>
                <li>- 신호 준수, 보행자 보호</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-blue-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-blue-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:from-blue-600 hover:to-indigo-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-normal/study/traffic-law" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-3 text-center transition-colors"><span className="text-slate-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-normal/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-normal/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
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
