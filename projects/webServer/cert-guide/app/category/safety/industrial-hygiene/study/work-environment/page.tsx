'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function WorkEnvironmentStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('industrial-hygiene-work-environment-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('industrial-hygiene-work-environment-completed', JSON.stringify([...newCompleted]));
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
      title: "산업위생의 개념과 역사",
      items: [
        { id: "1-1", question: "산업위생의 정의와 4대 영역(예측, 인지, 평가, 관리)을 설명하시오" },
        { id: "1-2", question: "산업위생관리의 목적과 산업보건의 3대 원칙을 설명하시오" },
        { id: "1-3", question: "작업환경측정의 법적 근거와 측정 대상 유해인자를 설명하시오" },
        { id: "1-4", question: "산업위생사의 역할과 직업윤리에 대해 설명하시오" },
        { id: "1-5", question: "국내 산업위생 발전과정과 주요 역사적 사건을 설명하시오" },
        { id: "1-6", question: "ILO, NIOSH, OSHA, ACGIH 등 국제기구의 역할을 설명하시오" },
        { id: "1-7", question: "산업안전보건법상 사업주의 의무사항을 설명하시오" },
        { id: "1-8", question: "근로자 건강진단의 종류(배치전, 일반, 특수, 수시, 임시)를 설명하시오" },
        { id: "1-9", question: "직업병과 업무상 질병의 개념 및 차이점을 설명하시오" },
        { id: "1-10", question: "산업위생 프로그램의 구성요소와 PDCA 사이클을 설명하시오" }
      ]
    },
    {
      title: "인간공학 기초",
      items: [
        { id: "2-1", question: "인간공학의 정의와 적용 분야를 설명하시오" },
        { id: "2-2", question: "인체측정(Anthropometry)의 정의와 측정 방법을 설명하시오" },
        { id: "2-3", question: "인체측정 자료의 활용 원칙(5백분위, 50백분위, 95백분위)을 설명하시오" },
        { id: "2-4", question: "작업공간 설계 시 고려사항과 작업대 높이 결정 원칙을 설명하시오" },
        { id: "2-5", question: "VDT 작업의 정의와 VDT 증후군의 종류를 설명하시오" },
        { id: "2-6", question: "VDT 작업관리 지침의 주요 내용을 설명하시오" },
        { id: "2-7", question: "근골격계질환의 정의와 주요 유해요인을 설명하시오" },
        { id: "2-8", question: "근골격계 유해요인 조사 방법과 주기를 설명하시오" },
        { id: "2-9", question: "RULA, REBA, OWAS 등 인간공학적 평가 도구를 설명하시오" },
        { id: "2-10", question: "중량물 취급 기준과 NIOSH Lifting Equation을 설명하시오" }
      ]
    },
    {
      title: "작업생리",
      items: [
        { id: "3-1", question: "작업부하의 종류(정적/동적, 육체적/정신적)를 설명하시오" },
        { id: "3-2", question: "에너지 대사량(RMR) 측정방법과 계산식을 설명하시오" },
        { id: "3-3", question: "산소소비량을 이용한 작업강도 평가방법을 설명하시오" },
        { id: "3-4", question: "심박수를 이용한 작업부하 평가방법을 설명하시오" },
        { id: "3-5", question: "작업 시 산소부채와 회복에 대해 설명하시오" },
        { id: "3-6", question: "근육의 종류와 근수축 메커니즘을 설명하시오" },
        { id: "3-7", question: "정적 작업과 동적 작업의 생리적 차이를 설명하시오" },
        { id: "3-8", question: "작업 자세에 따른 생리적 영향을 설명하시오" },
        { id: "3-9", question: "교대작업이 인체에 미치는 영향과 관리방안을 설명하시오" },
        { id: "3-10", question: "적정 작업-휴식 시간 배분 원칙을 설명하시오" }
      ]
    },
    {
      title: "산업피로",
      items: [
        { id: "4-1", question: "산업피로의 정의와 발생 원인을 설명하시오" },
        { id: "4-2", question: "피로의 종류(육체적/정신적, 급성/만성)를 설명하시오" },
        { id: "4-3", question: "피로 측정방법(주관적, 객관적 방법)을 설명하시오" },
        { id: "4-4", question: "플리커 검사(Flicker Test)의 원리와 측정방법을 설명하시오" },
        { id: "4-5", question: "피로의 자각증상 조사방법을 설명하시오" },
        { id: "4-6", question: "작업능률 곡선과 피로의 관계를 설명하시오" },
        { id: "4-7", question: "피로 예방 및 회복 대책을 설명하시오" },
        { id: "4-8", question: "직무스트레스의 정의와 유해요인을 설명하시오" },
        { id: "4-9", question: "직무스트레스 평가도구(KOSS)와 측정방법을 설명하시오" },
        { id: "4-10", question: "직무스트레스 관리 프로그램(EAP)을 설명하시오" }
      ]
    },
    {
      title: "산업위생 관리체계",
      items: [
        { id: "5-1", question: "안전보건관리체제의 구성과 역할을 설명하시오" },
        { id: "5-2", question: "산업안전보건위원회의 구성과 심의사항을 설명하시오" },
        { id: "5-3", question: "안전보건관리규정의 작성기준과 포함내용을 설명하시오" },
        { id: "5-4", question: "물질안전보건자료(MSDS)의 구성항목과 게시요건을 설명하시오" },
        { id: "5-5", question: "유해·위험작업의 취업제한 기준을 설명하시오" },
        { id: "5-6", question: "특수건강진단 대상 유해인자와 검진주기를 설명하시오" },
        { id: "5-7", question: "작업환경측정 대상 유해인자와 측정주기를 설명하시오" },
        { id: "5-8", question: "유해인자 허용기준의 종류(TWA, STEL, Ceiling)를 설명하시오" },
        { id: "5-9", question: "작업환경개선 우선순위 결정 원칙을 설명하시오" },
        { id: "5-10", question: "산업재해 조사 및 보고 절차를 설명하시오" }
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
            <span className="text-5xl">📚</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">산업위생학개론</h1>
              <p className="text-gray-600">산업위생 기본개념, 인간공학, 작업생리</p>
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
            <li>• 산업위생 4대 영역(예측-인지-평가-관리)은 반드시 숙지하세요</li>
            <li>• VDT 증후군, 근골격계질환 관련 문제가 자주 출제됩니다</li>
            <li>• 에너지 대사량(RMR) 계산 공식을 암기하세요</li>
            <li>• 피로 측정방법(플리커, 자각증상)을 정리하세요</li>
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
