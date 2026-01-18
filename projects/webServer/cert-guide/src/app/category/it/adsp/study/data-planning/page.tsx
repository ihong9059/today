'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ADsPDataPlanningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('adsp-data-planning-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('adsp-data-planning-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "분석 기획 방향 설정",
      icon: "🎯",
      items: [
        "분석 기획의 정의: 문제 정의에서 분석 수행까지 계획",
        "분석 주제 유형: 최적화, 솔루션, 통찰력, 발견",
        "하향식 접근법(Top-Down): 문제 정의 → 해결방안 탐색",
        "상향식 접근법(Bottom-Up): 데이터 기반 문제 발굴",
        "분석 기회 발굴: 거시적/미시적 분석 기회",
        "분석 과제 정의: 해결해야 할 문제 명확화",
        "분석 대상과 방법: What-How 매트릭스",
        "Quick-Win 과제: 빠른 성과 창출 가능 과제",
        "분석 ROI: 분석 투자 대비 수익률 평가",
        "분석 우선순위: 시급성, 난이도, 효과 고려"
      ]
    },
    {
      title: "분석 방법론",
      icon: "📐",
      items: [
        "KDD (Knowledge Discovery in Database): 데이터 마이닝 프로세스",
        "KDD 단계: 선택-전처리-변환-마이닝-해석/평가",
        "CRISP-DM: 표준 데이터 마이닝 프로세스",
        "CRISP-DM 6단계: 비즈니스이해-데이터이해-준비-모델링-평가-전개",
        "SEMMA: SAS 사의 데이터 마이닝 방법론",
        "SEMMA 단계: Sample-Explore-Modify-Model-Assess",
        "빅데이터 분석 방법론: 폭포수 vs 애자일 모델",
        "분석 방법론 특징: 반복적, 점진적 개선",
        "분석 방법론 선택: 프로젝트 특성에 따른 선택",
        "방법론 간 비교: KDD vs CRISP-DM vs SEMMA"
      ]
    },
    {
      title: "분석 과제 정의",
      icon: "📝",
      items: [
        "분석 과제 도출: 비즈니스 문제를 분석 문제로 전환",
        "과제 발굴 방법: 인터뷰, 워크숍, 벤치마킹",
        "데이터 분석 문제 정의: 목표, 범위, 제약조건 명확화",
        "프로젝트 목표 설정: SMART 원칙 적용",
        "SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
        "성공 기준 정의: KPI (핵심성과지표) 설정",
        "분석 범위 설정: 분석 대상, 기간, 데이터 범위",
        "분석 가설 수립: 검증 가능한 가설 정의",
        "분석 모델 선정: 문제 유형에 맞는 모델 선택",
        "분석 결과 활용 계획: 의사결정 지원 방안"
      ]
    },
    {
      title: "분석 프로젝트 관리",
      icon: "📊",
      items: [
        "분석 프로젝트 특성: 불확실성, 반복성, 탐색적",
        "프로젝트 관리 영역: 5대 프로세스 그룹",
        "착수(Initiating): 프로젝트 차터 작성",
        "기획(Planning): WBS, 일정, 자원 계획",
        "실행(Executing): 분석 수행, 품질 관리",
        "통제(Controlling): 진척 관리, 변경 통제",
        "종료(Closing): 산출물 인수, 교훈 정리",
        "WBS (Work Breakdown Structure): 업무 분류 체계",
        "간트 차트: 일정 시각화 도구",
        "리스크 관리: 분석 실패 위험 요소 관리"
      ]
    },
    {
      title: "분석 거버넌스",
      icon: "🏛️",
      items: [
        "분석 거버넌스 정의: 분석 활동 총괄 관리 체계",
        "분석 조직 유형: 집중형, 분산형, 기능형, 하이브리드",
        "집중형 조직: 전사 분석 조직이 전담",
        "분산형 조직: 현업 부서에서 각자 분석 수행",
        "기능형 조직: 분석 COE(Center of Excellence)",
        "분석 인력 역량: 분석 기술, 도메인, 커뮤니케이션",
        "분석 성숙도 모델: 분석 역량 수준 진단",
        "분석 성숙도 단계: 도입-활용-확산-최적화",
        "분석 문화: 데이터 기반 의사결정 문화 조성",
        "분석 지원 체계: 분석 플랫폼, 도구, 교육"
      ]
    },
    {
      title: "기출 빈출 개념",
      icon: "⭐",
      items: [
        "CRISP-DM 6단계: 순서와 특징 정확히 암기",
        "KDD vs CRISP-DM: 차이점 비교",
        "하향식 vs 상향식: 각 접근법 특징과 적용 상황",
        "SMART 원칙: 5가지 요소 암기",
        "분석 조직 유형: 집중형/분산형/기능형 특징",
        "분석 성숙도 4단계: 도입-활용-확산-최적화",
        "What-How 매트릭스: 분석 과제 유형 분류",
        "분석 ROI: 투자 대비 수익률 개념",
        "Quick-Win 과제: 빠른 성과 창출 과제",
        "5대 프로젝트 관리 프로세스: 착수-기획-실행-통제-종료"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/adsp" className="text-cyan-600 hover:text-cyan-800 flex items-center gap-2">
            <span>←</span>
            <span>ADsP로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📋</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">2과목: 데이터 분석 기획</h1>
              <p className="text-gray-600">분석 계획 수립 60문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 2과목 학습 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• CRISP-DM 6단계는 가장 빈출 문제입니다. 순서 완벽 암기!</li>
            <li>• 분석 방법론 간 비교 문제가 자주 출제됩니다</li>
            <li>• 분석 조직 유형과 특징을 정리해두세요</li>
            <li>• 10문항 20% 비중이지만 이론 암기 비중이 높습니다</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`ADsP 데이터 분석 기획 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`ADsP 데이터 분석 기획 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`ADsP 데이터 분석 기획 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
