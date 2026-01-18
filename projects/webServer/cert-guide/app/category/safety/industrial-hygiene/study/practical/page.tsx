'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('industrial-hygiene-practical-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('industrial-hygiene-practical-completed', JSON.stringify([...newCompleted]));
  };

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedItems(newCompleted);
    saveProgress(newCompleted);
  };

  const toggleTopic = (index: number) => {
    const newOpen = new Set(openTopics);
    if (newOpen.has(index)) newOpen.delete(index);
    else newOpen.add(index);
    setOpenTopics(newOpen);
  };

  const openAIHelper = (question: string) => {
    setSelectedQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "TWA 및 노출평가 계산",
      items: [
        { id: "1-1", question: "8시간 TWA 계산: 작업자가 80dB에서 2시간, 85dB에서 3시간, 90dB에서 3시간 노출 시 TWA를 계산하시오" },
        { id: "1-2", question: "노출지수(EI) 계산: TWA가 85ppm이고 노출기준이 100ppm일 때 노출지수를 계산하시오" },
        { id: "1-3", question: "혼합물질 노출평가: A물질(측정값 30ppm, 기준 50ppm), B물질(측정값 40ppm, 기준 100ppm)의 상가효과를 계산하시오" },
        { id: "1-4", question: "소음 합성: 85dB와 88dB가 동시에 작용할 때의 합성 소음레벨을 계산하시오" },
        { id: "1-5", question: "소음 노출량(Dose) 계산: 90dB에서 4시간, 95dB에서 2시간 작업 시 노출량을 계산하시오" }
      ]
    },
    {
      title: "환기량 계산",
      items: [
        { id: "2-1", question: "필요환기량 계산: 유기용제 발생량이 시간당 500g, 비중 0.8, 분자량 78일 때 필요환기량을 계산하시오" },
        { id: "2-2", question: "희석환기량: 아세톤(TLV 500ppm) 시간당 1L 증발 시 필요환기량을 계산하시오 (K=5)" },
        { id: "2-3", question: "국소배기 필요풍량: 슬롯형 후드(0.5m × 0.1m), 제어풍속 0.5m/s일 때 필요풍량을 계산하시오" },
        { id: "2-4", question: "원형 덕트 풍속: 직경 300mm 덕트에서 풍량 30CMM일 때 풍속을 계산하시오" },
        { id: "2-5", question: "배풍기 동력: 풍량 100CMM, 정압 150mmAq, 효율 60%일 때 필요동력을 계산하시오" }
      ]
    },
    {
      title: "환기설비 설계",
      items: [
        { id: "3-1", question: "외부식 후드의 후드 개구면에서 1m 거리의 제어풍속이 0.5m/s일 때 필요 풍량을 계산하시오 (후드 크기: 0.3m × 0.3m)" },
        { id: "3-2", question: "포위식 부스형 후드 설계: 개구면 1m × 2m, 제어풍속 0.4m/s일 때 필요풍량과 덕트 크기를 설계하시오" },
        { id: "3-3", question: "덕트 압력손실 계산: 직관 50m, 직경 400mm, 풍속 15m/s일 때 마찰손실을 계산하시오" },
        { id: "3-4", question: "국부손실 계산: 90° 엘보 3개(손실계수 0.5), 풍속 18m/s일 때 총 국부손실을 계산하시오" },
        { id: "3-5", question: "합류덕트 설계: 지관 풍량 20CMM(정압 30mmAq), 주관 풍량 50CMM일 때 정압평형 방법으로 설계하시오" }
      ]
    },
    {
      title: "물리적 인자 측정 및 평가",
      items: [
        { id: "4-1", question: "WBGT 계산: 실내작업장에서 건구 32°C, 습구 28°C, 흑구 35°C일 때 WBGT를 계산하시오" },
        { id: "4-2", question: "WBGT 옥외 계산: 옥외작업장(태양복사)에서 건구 35°C, 습구 30°C, 흑구 45°C일 때 WBGT를 계산하시오" },
        { id: "4-3", question: "조도 계산: 4점법으로 작업면 조도를 측정하였을 때(150, 180, 200, 170lx) 평균 조도를 계산하시오" },
        { id: "4-4", question: "진동가속도레벨(VAL) 계산: 가속도 5m/s² 일 때 VAL을 계산하시오 (기준가속도 10⁻⁵ m/s²)" },
        { id: "4-5", question: "방사선 피폭량 계산: 방사선원에서 2m 거리 시 10mSv/h일 때, 4m 거리의 피폭량을 계산하시오" }
      ]
    },
    {
      title: "실기 서술형 핵심",
      items: [
        { id: "5-1", question: "작업환경측정 계획서 작성요령: 측정대상, 측정지점, 측정방법, 측정시기를 포함하여 작성하시오" },
        { id: "5-2", question: "국소배기장치 점검사항: 후드, 덕트, 공기정화장치, 배풍기의 점검항목을 설명하시오" },
        { id: "5-3", question: "특수건강진단 대상 유해인자와 검진주기, 검진항목을 설명하시오" },
        { id: "5-4", question: "밀폐공간 작업 시 안전조치 사항을 설명하시오" },
        { id: "5-5", question: "유기용제 취급작업의 작업환경관리 대책(공학적, 행정적, 보호구)을 설명하시오" }
      ]
    }
  ];

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progress = Math.round((completedItems.size / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/safety/industrial-hygiene" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            <span>←</span>
            <span>산업위생관리기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">✍️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실기시험 대비</h1>
              <p className="text-gray-600">계산문제, 서술형 핵심 정리</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-teal-600">{progress}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedItems.size} / {totalItems} 완료</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📌 핵심 공식 정리</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-teal-50 rounded-xl">
              <h4 className="font-bold text-teal-800 mb-2">TWA 계산</h4>
              <p className="text-gray-700">TWA = (C₁×T₁ + C₂×T₂ + ...) / 8</p>
            </div>
            <div className="p-3 bg-cyan-50 rounded-xl">
              <h4 className="font-bold text-cyan-800 mb-2">노출지수(EI)</h4>
              <p className="text-gray-700">EI = 측정농도 / 노출기준</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <h4 className="font-bold text-emerald-800 mb-2">dB 합성</h4>
              <p className="text-gray-700">L = 10 log(10^(L₁/10) + 10^(L₂/10))</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl">
              <h4 className="font-bold text-teal-800 mb-2">WBGT (실내)</h4>
              <p className="text-gray-700">WBGT = 0.7×습구 + 0.3×흑구</p>
            </div>
            <div className="p-3 bg-cyan-50 rounded-xl">
              <h4 className="font-bold text-cyan-800 mb-2">WBGT (옥외)</h4>
              <p className="text-gray-700">WBGT = 0.7×습구 + 0.2×흑구 + 0.1×건구</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <h4 className="font-bold text-emerald-800 mb-2">필요환기량</h4>
              <p className="text-gray-700">Q = K × G × 24.45 / (M × TLV)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
              >
                <h2 className="text-lg font-bold">{topicIndex + 1}. {topic.title}</h2>
                <span className="text-2xl">{openTopics.has(topicIndex) ? '−' : '+'}</span>
              </button>

              {openTopics.has(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={completedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                      />
                      <span className={`flex-1 ${completedItems.has(item.id) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.question}
                      </span>
                      <button
                        onClick={() => openAIHelper(item.question)}
                        className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors"
                      >
                        AI 도움
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-200">
          <h3 className="font-bold text-teal-800 mb-3">💡 실기시험 TIP</h3>
          <ul className="space-y-2 text-teal-700 text-sm">
            <li>• TWA, 노출지수 계산은 매회 출제되므로 반드시 숙달하세요</li>
            <li>• 환기량 계산 시 단위 환산(CMM, m³/s)에 주의하세요</li>
            <li>• WBGT 공식(실내/옥외)을 구분하여 암기하세요</li>
            <li>• 서술형은 공학적→행정적→보호구 순서로 체계적으로 답하세요</li>
            <li>• 계산 과정을 꼼꼼히 적어 부분점수를 확보하세요</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4 p-3 bg-gray-100 rounded-lg">{selectedQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-center font-medium hover:opacity-90"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-center font-medium hover:opacity-90"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-center font-medium hover:opacity-90"
              >
                Gemini에게 질문하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full p-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
