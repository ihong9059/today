'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MeasurementStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('industrial-hygiene-measurement-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('industrial-hygiene-measurement-completed', JSON.stringify([...newCompleted]));
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
      title: "시료채취 이론",
      items: [
        { id: "1-1", question: "개인시료채취와 지역시료채취의 차이점과 적용 기준을 설명하시오" },
        { id: "1-2", question: "시료채취 펌프의 종류와 유량 보정 방법을 설명하시오" },
        { id: "1-3", question: "분진 시료채취 방법(여과포집, 관성충돌)을 설명하시오" },
        { id: "1-4", question: "가스·증기 시료채취 방법(흡착관, 임핀저, 직접채취)을 설명하시오" },
        { id: "1-5", question: "입경별 분진 채취 장치(사이클론, 임팩터)를 설명하시오" },
        { id: "1-6", question: "호흡성 분진과 흡입성 분진의 정의와 채취 기준을 설명하시오" },
        { id: "1-7", question: "시료채취 시간 결정 기준과 최소 채취량을 설명하시오" },
        { id: "1-8", question: "시료의 운반, 보관 및 안정성에 대해 설명하시오" },
        { id: "1-9", question: "현장 공시료(Field Blank)의 목적과 사용방법을 설명하시오" },
        { id: "1-10", question: "시료채취 오차의 종류와 최소화 방법을 설명하시오" }
      ]
    },
    {
      title: "측정기기 및 분석방법",
      items: [
        { id: "2-1", question: "가스크로마토그래피(GC)의 원리와 적용을 설명하시오" },
        { id: "2-2", question: "원자흡광광도법(AAS)의 원리와 금속 분석 적용을 설명하시오" },
        { id: "2-3", question: "분광광도계의 원리와 측정 방법을 설명하시오" },
        { id: "2-4", question: "X선 형광분석법(XRF)의 원리와 적용을 설명하시오" },
        { id: "2-5", question: "검지관의 원리, 종류 및 사용 시 주의사항을 설명하시오" },
        { id: "2-6", question: "직독식 측정기(산소, 가연성가스, 독성가스)의 원리를 설명하시오" },
        { id: "2-7", question: "분석방법 검증(정밀도, 정확도, 검출한계)을 설명하시오" },
        { id: "2-8", question: "표준물질과 검량선 작성 방법을 설명하시오" },
        { id: "2-9", question: "분석오차의 종류(계통오차, 우연오차)와 관리를 설명하시오" },
        { id: "2-10", question: "KOSHA Guide 분석방법의 구성과 활용을 설명하시오" }
      ]
    },
    {
      title: "노출평가",
      items: [
        { id: "3-1", question: "시간가중평균농도(TWA)의 정의와 계산방법을 설명하시오" },
        { id: "3-2", question: "단시간노출기준(STEL)의 정의와 적용을 설명하시오" },
        { id: "3-3", question: "최고노출기준(Ceiling)의 정의와 적용을 설명하시오" },
        { id: "3-4", question: "노출지수(EI)의 계산방법과 판정기준을 설명하시오" },
        { id: "3-5", question: "혼합물질의 노출기준 적용방법(상가작용)을 설명하시오" },
        { id: "3-6", question: "고·저온, 고·저기압 환경에서의 노출기준 보정을 설명하시오" },
        { id: "3-7", question: "통계적 노출평가 방법(기하평균, 기하표준편차)을 설명하시오" },
        { id: "3-8", question: "노출 프로파일 작성 방법과 활용을 설명하시오" },
        { id: "3-9", question: "유사노출그룹(SEG)의 설정 기준을 설명하시오" },
        { id: "3-10", question: "노출평가 불확실성 분석 방법을 설명하시오" }
      ]
    },
    {
      title: "측정계획 및 전략",
      items: [
        { id: "4-1", question: "작업환경측정 대상 사업장과 측정주기를 설명하시오" },
        { id: "4-2", question: "측정점 선정 기준과 단위작업장소 구분을 설명하시오" },
        { id: "4-3", question: "유해인자별 측정방법 선정 기준을 설명하시오" },
        { id: "4-4", question: "측정계획서 작성 항목과 내용을 설명하시오" },
        { id: "4-5", question: "사전조사(예비조사) 내용과 방법을 설명하시오" },
        { id: "4-6", question: "작업환경측정 결과보고서 작성방법을 설명하시오" },
        { id: "4-7", question: "측정결과에 따른 조치기준(노출기준 초과 시)을 설명하시오" },
        { id: "4-8", question: "작업환경측정 결과의 보존 및 통보 의무를 설명하시오" },
        { id: "4-9", question: "작업환경측정기관의 지정요건과 관리를 설명하시오" },
        { id: "4-10", question: "자율측정과 위탁측정의 차이점을 설명하시오" }
      ]
    },
    {
      title: "특수 측정 및 평가",
      items: [
        { id: "5-1", question: "석면 측정방법(PCM, TEM)과 평가기준을 설명하시오" },
        { id: "5-2", question: "금속흄 측정방법과 용접작업 노출평가를 설명하시오" },
        { id: "5-3", question: "유기용제 증기 측정 시 주의사항을 설명하시오" },
        { id: "5-4", question: "산·알칼리 미스트 측정방법을 설명하시오" },
        { id: "5-5", question: "결정형 유리규산(Quartz) 측정방법을 설명하시오" },
        { id: "5-6", question: "발암물질 측정 시 특별관리 사항을 설명하시오" },
        { id: "5-7", question: "밀폐공간 측정방법과 평가기준을 설명하시오" },
        { id: "5-8", question: "국소배기장치 성능검사 측정항목과 방법을 설명하시오" },
        { id: "5-9", question: "개인노출량과 지역농도의 상관관계 분석을 설명하시오" },
        { id: "5-10", question: "작업환경측정 품질관리(QA/QC) 프로그램을 설명하시오" }
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
            <span className="text-5xl">📊</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">작업환경측정 및 평가</h1>
              <p className="text-gray-600">시료채취, 분석방법, 노출평가</p>
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
          <h3 className="font-bold text-teal-800 mb-3">💡 학습 TIP</h3>
          <ul className="space-y-2 text-teal-700 text-sm">
            <li>• TWA 계산 문제는 매회 출제되므로 공식을 완벽히 숙지하세요</li>
            <li>• 노출지수(EI) 계산과 혼합물질 평가는 필수입니다</li>
            <li>• 개인시료/지역시료 채취 기준 구분이 중요합니다</li>
            <li>• 석면, 금속흄 등 특수물질 측정방법을 정리하세요</li>
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
