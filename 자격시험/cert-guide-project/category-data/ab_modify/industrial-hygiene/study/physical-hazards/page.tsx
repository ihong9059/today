'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PhysicalHazardsStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('industrial-hygiene-physical-hazards-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('industrial-hygiene-physical-hazards-completed', JSON.stringify([...newCompleted]));
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
      title: "소음",
      items: [
        { id: "1-1", question: "소음의 정의와 음압, 음압레벨(dB)의 개념을 설명하시오" },
        { id: "1-2", question: "데시벨(dB) 합성 계산방법을 설명하시오" },
        { id: "1-3", question: "소음의 허용기준(90dB 8시간)과 반감기(5dB)를 설명하시오" },
        { id: "1-4", question: "소음노출량(Dose)과 TWA 계산방법을 설명하시오" },
        { id: "1-5", question: "청력손실의 종류(전음성, 감각신경성)와 소음성 난청을 설명하시오" },
        { id: "1-6", question: "소음 측정방법(지역, 개인)과 측정기기를 설명하시오" },
        { id: "1-7", question: "소음의 주파수 분석과 옥타브 밴드 분석을 설명하시오" },
        { id: "1-8", question: "소음 저감 대책(발생원, 전파경로, 수음점)을 설명하시오" },
        { id: "1-9", question: "흡음과 차음의 원리와 재료 특성을 설명하시오" },
        { id: "1-10", question: "청력보존 프로그램의 구성요소와 실행방법을 설명하시오" }
      ]
    },
    {
      title: "진동",
      items: [
        { id: "2-1", question: "진동의 물리적 특성(진폭, 주파수, 가속도)을 설명하시오" },
        { id: "2-2", question: "국소진동(수지진동)과 전신진동의 차이를 설명하시오" },
        { id: "2-3", question: "진동의 인체 영향과 진동장해(백지병, 레이노 현상)를 설명하시오" },
        { id: "2-4", question: "진동 측정방법과 측정기기를 설명하시오" },
        { id: "2-5", question: "진동 허용기준과 노출평가 방법을 설명하시오" },
        { id: "2-6", question: "진동 방지대책(발생원, 전파경로, 작업관리)을 설명하시오" },
        { id: "2-7", question: "방진고무, 방진스프링 등 방진재료의 특성을 설명하시오" },
        { id: "2-8", question: "진동공구 취급 작업자 건강관리 방법을 설명하시오" },
        { id: "2-9", question: "진동가속도 레벨과 진동속도 레벨의 관계를 설명하시오" },
        { id: "2-10", question: "공진현상과 방진설계 원칙을 설명하시오" }
      ]
    },
    {
      title: "온열환경",
      items: [
        { id: "3-1", question: "인체의 열평형 원리와 체온조절 메커니즘을 설명하시오" },
        { id: "3-2", question: "WBGT(습구흑구온도) 지수의 정의와 계산방법을 설명하시오" },
        { id: "3-3", question: "고온장해의 종류(열사병, 열탈진, 열경련, 열피로)를 설명하시오" },
        { id: "3-4", question: "고열작업장의 작업환경관리 기준을 설명하시오" },
        { id: "3-5", question: "저온작업의 인체 영향(동상, 저체온증)을 설명하시오" },
        { id: "3-6", question: "온열환경 측정기기(건구온도계, 습구온도계, 흑구온도계)를 설명하시오" },
        { id: "3-7", question: "카타 냉각력과 기류 측정방법을 설명하시오" },
        { id: "3-8", question: "고열작업 관리대책(공학적, 행정적, 보호구)을 설명하시오" },
        { id: "3-9", question: "작업복 선택과 열응력 관리방법을 설명하시오" },
        { id: "3-10", question: "온열지표(ET, CET, PMV, PPD)의 개념을 설명하시오" }
      ]
    },
    {
      title: "이상기압과 방사선",
      items: [
        { id: "4-1", question: "이상기압의 종류(고압, 저압)와 인체 영향을 설명하시오" },
        { id: "4-2", question: "잠수병(감압병)의 원인과 예방대책을 설명하시오" },
        { id: "4-3", question: "고압작업의 작업관리 기준(가압, 감압)을 설명하시오" },
        { id: "4-4", question: "산소결핍증의 정의와 발생장소를 설명하시오" },
        { id: "4-5", question: "방사선의 종류(전리, 비전리)와 특성을 설명하시오" },
        { id: "4-6", question: "방사선의 인체 영향(급성, 만성)을 설명하시오" },
        { id: "4-7", question: "방사선 피폭한도와 ALARA 원칙을 설명하시오" },
        { id: "4-8", question: "방사선 방호대책(시간, 거리, 차폐)을 설명하시오" },
        { id: "4-9", question: "방사선 측정기기(필름배지, TLD, 서베이미터)를 설명하시오" },
        { id: "4-10", question: "비전리방사선(자외선, 적외선, 레이저)의 건강영향을 설명하시오" }
      ]
    },
    {
      title: "조명과 기타 유해인자",
      items: [
        { id: "5-1", question: "조명의 기본 단위(광속, 광도, 조도, 휘도)를 설명하시오" },
        { id: "5-2", question: "작업장 조도 기준과 조명설계 원칙을 설명하시오" },
        { id: "5-3", question: "균제도와 눈부심(글레어) 방지대책을 설명하시오" },
        { id: "5-4", question: "조명 측정방법과 4점법을 설명하시오" },
        { id: "5-5", question: "색채관리와 안전색채 사용기준을 설명하시오" },
        { id: "5-6", question: "전자파의 건강영향과 관리기준을 설명하시오" },
        { id: "5-7", question: "레이저 작업의 안전관리 기준을 설명하시오" },
        { id: "5-8", question: "자외선·적외선 노출 관리기준을 설명하시오" },
        { id: "5-9", question: "환기 불량 장소의 관리기준을 설명하시오" },
        { id: "5-10", question: "복합 유해인자 노출 시 관리방법을 설명하시오" }
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
            <span className="text-5xl">🔊</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">물리적 유해인자관리</h1>
              <p className="text-gray-600">소음, 진동, 온열환경, 방사선, 조명</p>
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
            <li>• 소음 dB 합성 계산은 매회 출제되는 핵심 문제입니다</li>
            <li>• WBGT 계산 공식과 고열작업 기준을 암기하세요</li>
            <li>• 방사선 피폭한도와 방호 3원칙을 정리하세요</li>
            <li>• 조명 단위(lx, cd, lm)의 관계를 이해하세요</li>
          </ul>
        </div>
      </div>

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
