'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManagementStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('industrial-hygiene-management-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('industrial-hygiene-management-completed', JSON.stringify([...newCompleted]));
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
      title: "환기공학 기초",
      items: [
        { id: "1-1", question: "환기의 종류(자연환기, 기계환기)와 적용 원칙을 설명하시오" },
        { id: "1-2", question: "전체환기(희석환기)의 원리와 필요환기량 계산을 설명하시오" },
        { id: "1-3", question: "국소배기의 원리와 전체환기 대비 장점을 설명하시오" },
        { id: "1-4", question: "환기량 단위 환산(CMM, CFM, m³/sec)을 설명하시오" },
        { id: "1-5", question: "필요환기량 계산 시 안전계수(K) 적용 기준을 설명하시오" },
        { id: "1-6", question: "유해물질 발생량에 따른 필요환기량 계산방법을 설명하시오" },
        { id: "1-7", question: "희석환기 적용 조건과 한계를 설명하시오" },
        { id: "1-8", question: "환기 효율에 영향을 미치는 요인을 설명하시오" },
        { id: "1-9", question: "급기와 배기의 배치 원칙을 설명하시오" },
        { id: "1-10", question: "환기설비 설치 시 법적 기준을 설명하시오" }
      ]
    },
    {
      title: "국소배기장치",
      items: [
        { id: "2-1", question: "국소배기장치의 구성요소와 각 역할을 설명하시오" },
        { id: "2-2", question: "후드의 종류(포위식, 외부식, 리시빙)와 선정기준을 설명하시오" },
        { id: "2-3", question: "외부식 후드의 제어풍속과 흡인 원리를 설명하시오" },
        { id: "2-4", question: "포위식 후드의 설계 원칙과 적용 사례를 설명하시오" },
        { id: "2-5", question: "슬롯형 후드의 설계와 적용을 설명하시오" },
        { id: "2-6", question: "캐노피 후드의 특성과 한계를 설명하시오" },
        { id: "2-7", question: "푸시-풀 환기 시스템의 원리와 적용을 설명하시오" },
        { id: "2-8", question: "제어풍속 측정방법과 판정기준을 설명하시오" },
        { id: "2-9", question: "후드 정압과 반송속도의 관계를 설명하시오" },
        { id: "2-10", question: "후드의 손실계수와 압력손실 계산을 설명하시오" }
      ]
    },
    {
      title: "덕트 및 배풍기",
      items: [
        { id: "3-1", question: "덕트의 종류(원형, 각형)와 선정 기준을 설명하시오" },
        { id: "3-2", question: "덕트 내 반송속도 결정 기준을 설명하시오" },
        { id: "3-3", question: "덕트의 압력손실 계산방법(마찰손실, 국부손실)을 설명하시오" },
        { id: "3-4", question: "덕트 설계 시 압력평형 방법을 설명하시오" },
        { id: "3-5", question: "합류부 설계와 정압평형 원리를 설명하시오" },
        { id: "3-6", question: "배풍기의 종류(축류, 원심)와 특성을 설명하시오" },
        { id: "3-7", question: "배풍기 선정 시 고려사항(풍량, 정압)을 설명하시오" },
        { id: "3-8", question: "배풍기의 성능곡선과 시스템 저항곡선을 설명하시오" },
        { id: "3-9", question: "배풍기 동력 계산방법을 설명하시오" },
        { id: "3-10", question: "배풍기 법칙(상사법칙)을 설명하시오" }
      ]
    },
    {
      title: "공기정화장치",
      items: [
        { id: "4-1", question: "분진 집진장치의 종류와 원리를 설명하시오" },
        { id: "4-2", question: "사이클론 집진기의 원리와 설계 인자를 설명하시오" },
        { id: "4-3", question: "여과집진기(백필터)의 원리와 탈진 방법을 설명하시오" },
        { id: "4-4", question: "전기집진기의 원리와 적용을 설명하시오" },
        { id: "4-5", question: "습식세정기(스크러버)의 종류와 원리를 설명하시오" },
        { id: "4-6", question: "가스상 물질 정화장치(흡착, 흡수)를 설명하시오" },
        { id: "4-7", question: "활성탄 흡착의 원리와 재생 방법을 설명하시오" },
        { id: "4-8", question: "집진효율 계산방법과 영향 인자를 설명하시오" },
        { id: "4-9", question: "공기정화장치 선정 시 고려사항을 설명하시오" },
        { id: "4-10", question: "배출허용기준과 자가측정 요건을 설명하시오" }
      ]
    },
    {
      title: "개인보호구 및 행정관리",
      items: [
        { id: "5-1", question: "개인보호구의 종류와 선정 원칙을 설명하시오" },
        { id: "5-2", question: "호흡용 보호구의 분류(공기정화식, 공기공급식)를 설명하시오" },
        { id: "5-3", question: "방진마스크의 등급과 선정 기준을 설명하시오" },
        { id: "5-4", question: "방독마스크 정화통의 종류와 선정 기준을 설명하시오" },
        { id: "5-5", question: "송기마스크와 자급식 호흡기의 특성을 설명하시오" },
        { id: "5-6", question: "보호구의 밀착도 검사 방법(정성적, 정량적)을 설명하시오" },
        { id: "5-7", question: "보호계수(APF)의 개념과 적용을 설명하시오" },
        { id: "5-8", question: "청력보호구의 종류와 차음 성능(NRR)을 설명하시오" },
        { id: "5-9", question: "보호장갑의 종류와 화학물질별 선정 기준을 설명하시오" },
        { id: "5-10", question: "작업관리(행정적 관리)의 종류와 적용을 설명하시오" }
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
            <span className="text-5xl">🌬️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">작업환경관리대책</h1>
              <p className="text-gray-600">환기공학, 국소배기장치, 개인보호구</p>
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
            <li>• 필요환기량 계산은 필기·실기 모두 필수입니다</li>
            <li>• 후드 종류별 특성과 제어풍속 기준을 암기하세요</li>
            <li>• 덕트 압력손실 계산 공식을 숙지하세요</li>
            <li>• 호흡보호구 분류와 보호계수(APF)를 정리하세요</li>
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
