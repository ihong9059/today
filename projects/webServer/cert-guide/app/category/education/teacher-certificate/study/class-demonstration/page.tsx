'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Topic {
  id: number;
  question: string;
  prompt: string;
}

const topics: { title: string; icon: string; items: Topic[] }[] = [
  {
    title: '수업 도입',
    icon: '🎬',
    items: [
      { id: 1, question: '수업 도입 단계의 주의집중 전략은?', prompt: '교원임용 2차 수업실연에서 수업 도입 단계의 효과적인 주의집중 전략(동기유발 기법, 선수학습 확인, 학습목표 제시 방법)에 대해 구체적인 예시와 함께 설명해주세요.' },
      { id: 2, question: '선수학습 확인 방법은?', prompt: '수업실연에서 선수학습 확인의 효과적인 방법(질문법, 퀴즈, 마인드맵 등)과 진단평가를 활용한 수준별 수업 도입 전략을 설명해주세요.' },
      { id: 3, question: '학습목표 진술 및 제시 방법은?', prompt: '수업실연에서 학습목표의 효과적인 진술 방법(Mager의 목표진술, 행동동사 활용)과 학생들에게 의미있게 제시하는 전략을 설명해주세요.' },
      { id: 4, question: '동기유발 자료 제작 및 활용법은?', prompt: '수업실연에서 효과적인 동기유발 자료(영상, 이미지, 실물, 이야기 등)의 제작 원리와 교과별 특성에 맞는 활용 전략을 설명해주세요.' },
      { id: 5, question: '도입에서 학습 분위기 조성법은?', prompt: '수업실연 도입 단계에서 긍정적인 학습 분위기 조성 방법(라포 형성, 격려, 유머 활용)과 학생 참여를 이끌어내는 전략을 설명해주세요.' },
      { id: 6, question: '전시학습과 본시학습 연결법은?', prompt: '수업실연에서 전시학습과 본시학습을 자연스럽게 연결하는 방법과 학습의 연속성을 확보하는 브릿징 전략을 설명해주세요.' },
      { id: 7, question: '호기심 유발 질문 기법은?', prompt: '수업실연 도입부에서 학생들의 호기심과 탐구심을 자극하는 효과적인 질문 기법(개방형 질문, 역발상 질문, 딜레마 상황 제시)을 설명해주세요.' },
      { id: 8, question: '도입부 시간 배분 전략은?', prompt: '수업실연에서 도입 단계의 적정 시간 배분(전체 수업의 10-15%)과 각 요소별 시간 안배 전략을 구체적으로 설명해주세요.' },
      { id: 9, question: '학생 배경지식 활성화 방법은?', prompt: '수업실연에서 학생들의 배경지식과 일상 경험을 활성화시켜 새로운 학습과 연결하는 스키마 활성화 전략을 설명해주세요.' },
      { id: 10, question: '도입부 발문 설계 방법은?', prompt: '수업실연 도입 단계에서 효과적인 발문 설계 원리(Bloom의 분류학 활용, 수렴적/확산적 질문 조합)와 학생 응답 유도 기법을 설명해주세요.' }
    ]
  },
  {
    title: '수업 전개',
    icon: '📚',
    items: [
      { id: 11, question: '설명식 수업의 효과적 진행법은?', prompt: '수업실연에서 설명식 수업의 효과적인 진행 방법(핵심개념 추출, 예시 제시, 시청각자료 활용, 요약 및 정리)을 단계별로 설명해주세요.' },
      { id: 12, question: '토의·토론 수업 운영 방법은?', prompt: '수업실연에서 토의·토론 수업의 효과적인 운영 방법(주제 선정, 모둠 구성, 규칙 설정, 사회자 역할, 정리)을 구체적으로 설명해주세요.' },
      { id: 13, question: '협동학습 수업 설계 방법은?', prompt: '수업실연에서 협동학습(Jigsaw, STAD, TGT 등)의 효과적인 설계와 운영 방법, 개별 책무성과 긍정적 상호의존성 확보 전략을 설명해주세요.' },
      { id: 14, question: '문제중심학습(PBL) 진행법은?', prompt: '수업실연에서 문제중심학습(PBL)의 효과적인 진행 방법(문제 제시, 탐구 활동, 해결안 도출, 발표 및 평가)과 교사 촉진자 역할을 설명해주세요.' },
      { id: 15, question: '프로젝트 학습 운영 방법은?', prompt: '수업실연에서 프로젝트 학습의 효과적인 설계와 운영(주제 선정, 계획 수립, 탐구 수행, 결과물 제작, 발표)을 단계별로 설명해주세요.' },
      { id: 16, question: '개념학습 지도 전략은?', prompt: '수업실연에서 개념학습의 효과적인 지도 전략(개념 정의, 속성 분석, 예/비예 제시, 개념 적용)과 개념도 활용법을 설명해주세요.' },
      { id: 17, question: '탐구학습 수업 진행법은?', prompt: '수업실연에서 탐구학습(가설 설정, 자료 수집, 검증, 일반화)의 효과적인 진행 방법과 학생 탐구 활동 촉진 전략을 설명해주세요.' },
      { id: 18, question: '수준별 수업 운영 방법은?', prompt: '수업실연에서 학생 수준별(상/중/하) 차별화된 수업 운영 방법과 개별화 학습을 위한 과제 및 활동 설계 전략을 설명해주세요.' },
      { id: 19, question: '전개 단계 발문 기법은?', prompt: '수업실연 전개 단계에서 효과적인 발문 기법(확인 질문, 이해 질문, 적용 질문, 분석 질문)과 학생 사고 촉진 전략을 설명해주세요.' },
      { id: 20, question: '학습활동 시간 관리 방법은?', prompt: '수업실연에서 전개 단계의 효과적인 시간 관리 방법과 다양한 학습활동(개별-모둠-전체) 간 균형있는 시간 배분 전략을 설명해주세요.' }
    ]
  },
  {
    title: '교수학습 자료',
    icon: '💻',
    items: [
      { id: 21, question: '판서 계획 및 활용법은?', prompt: '수업실연에서 효과적인 판서 계획(판서 영역 구성, 구조화, 색분필 활용)과 학습 내용 시각화를 위한 판서 기법을 설명해주세요.' },
      { id: 22, question: 'PPT 자료 제작 원칙은?', prompt: '수업실연에서 효과적인 PPT 자료 제작 원칙(간결성, 시각화, 일관성, 가독성)과 슬라이드별 내용 구성 전략을 설명해주세요.' },
      { id: 23, question: '학습지(워크시트) 설계법은?', prompt: '수업실연에서 효과적인 학습지(워크시트) 설계 원칙(학습목표 연계, 단계적 구성, 사고력 촉진)과 활용 전략을 설명해주세요.' },
      { id: 24, question: '실물자료 및 모형 활용법은?', prompt: '수업실연에서 실물자료, 모형, 표본 등 구체물의 효과적인 활용 방법과 추상적 개념의 구체화 전략을 교과별로 설명해주세요.' },
      { id: 25, question: '디지털 도구 활용 수업법은?', prompt: '수업실연에서 디지털 도구(패들렛, 카훗, 멘티미터, 잼보드 등)의 효과적인 활용 방법과 학생 참여 촉진 전략을 설명해주세요.' },
      { id: 26, question: '영상자료 활용 전략은?', prompt: '수업실연에서 영상자료(다큐멘터리, UCC, 뉴스 등)의 효과적인 선정 기준과 활용 전략(사전 안내, 시청 중 활동, 사후 토의)을 설명해주세요.' },
      { id: 27, question: '교구 제작 및 활용법은?', prompt: '수업실연에서 교과별 특성에 맞는 교구 제작 원리와 학습 효과를 높이는 교구 활용 전략을 구체적인 예시와 함께 설명해주세요.' },
      { id: 28, question: '게이미피케이션 적용법은?', prompt: '수업실연에서 게이미피케이션(포인트, 배지, 리더보드, 퀘스트 등)을 활용한 학습 동기 유발과 참여 촉진 전략을 설명해주세요.' },
      { id: 29, question: '스마트기기 활용 수업법은?', prompt: '수업실연에서 태블릿, 스마트폰 등 스마트기기를 활용한 효과적인 수업 진행 방법과 학생 자기주도적 학습 촉진 전략을 설명해주세요.' },
      { id: 30, question: '자료 제시 순서 및 타이밍은?', prompt: '수업실연에서 교수학습 자료의 효과적인 제시 순서와 타이밍 결정 원리, 학생 주의집중을 유지하는 자료 전환 전략을 설명해주세요.' }
    ]
  },
  {
    title: '상호작용 및 피드백',
    icon: '🗣️',
    items: [
      { id: 31, question: '효과적인 질문 기법은?', prompt: '수업실연에서 효과적인 질문 기법(Bloom의 인지적 질문 수준, 대기 시간, 추가 질문)과 학생 사고력을 촉진하는 발문 전략을 설명해주세요.' },
      { id: 32, question: '학생 발표 지도 방법은?', prompt: '수업실연에서 학생 발표를 효과적으로 지도하는 방법(발표 준비, 발표 기법 안내, 청중 태도, 피드백 제공)을 설명해주세요.' },
      { id: 33, question: '즉각적 피드백 제공 방법은?', prompt: '수업실연에서 학생 응답에 대한 즉각적이고 구체적인 피드백 제공 방법(칭찬, 교정, 확장, 심화)과 학습 동기 유발 전략을 설명해주세요.' },
      { id: 34, question: '오개념 수정 지도법은?', prompt: '수업실연에서 학생의 오개념(misconception)을 발견하고 효과적으로 수정하는 지도 방법(인지갈등 유발, 대안적 설명, 확인)을 설명해주세요.' },
      { id: 35, question: '모둠활동 촉진 전략은?', prompt: '수업실연에서 모둠활동을 효과적으로 촉진하는 전략(역할 분담, 상호작용 규칙, 순회지도, 모둠간 공유)을 구체적으로 설명해주세요.' },
      { id: 36, question: '학생 참여 유도 방법은?', prompt: '수업실연에서 소극적인 학생의 참여를 유도하는 방법(안전한 분위기 조성, 선택권 부여, 단계적 참여 요청)을 설명해주세요.' },
      { id: 37, question: '비언어적 의사소통 활용법은?', prompt: '수업실연에서 비언어적 의사소통(눈맞춤, 제스처, 표정, 이동, 근접성)을 효과적으로 활용하는 방법과 학생과의 라포 형성 전략을 설명해주세요.' },
      { id: 38, question: '경청과 공감적 반응 기법은?', prompt: '수업실연에서 학생 발언에 대한 경청과 공감적 반응 기법(적극적 경청, 반영, 요약, 명료화)을 통한 효과적인 의사소통 전략을 설명해주세요.' },
      { id: 39, question: '학습 점검 및 확인 방법은?', prompt: '수업실연에서 학생들의 학습 상태를 수시로 점검하고 확인하는 방법(형성평가, 손가락 신호, 화이트보드 활용 등)을 설명해주세요.' },
      { id: 40, question: '다양한 학생에 대한 대응법은?', prompt: '수업실연에서 다양한 학습자(영재, 학습부진, 다문화, 장애학생 등)에 대한 효과적인 대응과 개별화 지원 전략을 설명해주세요.' }
    ]
  },
  {
    title: '정리 및 평가',
    icon: '✅',
    items: [
      { id: 41, question: '수업 정리 및 요약 방법은?', prompt: '수업실연에서 효과적인 수업 정리 및 요약 방법(핵심내용 재진술, 마인드맵, 학생 정리 활동)과 학습 내용 장기기억 전이 전략을 설명해주세요.' },
      { id: 42, question: '형성평가 설계 및 활용법은?', prompt: '수업실연에서 형성평가의 효과적인 설계(문항 유형, 난이도, 변별도)와 결과를 활용한 즉각적 피드백 및 보충지도 전략을 설명해주세요.' },
      { id: 43, question: '자기평가 및 동료평가 지도법은?', prompt: '수업실연에서 학생 자기평가와 동료평가를 효과적으로 지도하는 방법(평가 기준 공유, 루브릭 활용, 피드백 훈련)을 설명해주세요.' },
      { id: 44, question: '차시 예고 및 과제 제시법은?', prompt: '수업실연에서 효과적인 차시 예고(호기심 유발, 연계성 강조)와 의미있는 과제 제시 방법(목적, 방법, 기한 안내)을 설명해주세요.' },
      { id: 45, question: '학습 성찰 활동 지도법은?', prompt: '수업실연에서 학생들의 학습 성찰 활동(학습일지, 성찰 질문, 메타인지 촉진)을 효과적으로 지도하는 방법을 설명해주세요.' },
      { id: 46, question: '학습 전이 촉진 전략은?', prompt: '수업실연 정리 단계에서 학습 내용의 실생활 적용과 타 교과로의 전이를 촉진하는 연결 전략을 구체적인 예시와 함께 설명해주세요.' },
      { id: 47, question: '수업 마무리 인사 및 정리법은?', prompt: '수업실연에서 효과적인 수업 마무리 인사와 정리 방법(긍정적 마무리, 학습 격려, 다음 수업에 대한 기대감 조성)을 설명해주세요.' },
      { id: 48, question: '수업 후 자기반성 방법은?', prompt: '수업실연 후 교사의 자기반성과 수업 개선을 위한 성찰 방법(수업 분석, 강점/약점 파악, 개선점 도출)을 설명해주세요.' },
      { id: 49, question: '채점 기준 및 루브릭 설계법은?', prompt: '수업실연에서 과정중심평가를 위한 채점 기준과 루브릭 설계 방법(평가 요소, 성취수준 기술, 채점 일관성)을 설명해주세요.' },
      { id: 50, question: '수업실연 시간 관리 총정리는?', prompt: '수업실연 전체(도입-전개-정리)의 효과적인 시간 관리 전략과 예상치 못한 상황에서의 유연한 시간 조정 방법을 종합적으로 설명해주세요.' }
    ]
  }
];

export default function ClassDemonstrationPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-class-demonstration-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teacher-certificate-class-demonstration-progress', JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAIHelp = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progressPercentage = (completedItems.length / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/teacher-certificate" className="hover:text-indigo-600 transition">
              교원자격증
            </Link>
            <span>/</span>
            <Link href="/category/education/teacher-certificate/study" className="hover:text-indigo-600 transition">
              과목별 학습
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">수업실연</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🎭 수업실연 학습</h1>
          <p className="text-gray-600 mt-1">2차 시험 수업실연 핵심 영역 50문제</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">학습 진도</h2>
              <p className="text-gray-600">{completedItems.length} / {totalItems} 완료</p>
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {completedItems.length > 0 && (
            <button
              onClick={() => setCompletedItems([])}
              className="mt-4 text-sm text-red-500 hover:text-red-700 transition"
            >
              진도 초기화
            </button>
          )}
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-amber-800 mb-3">💡 수업실연 준비 TIP</h3>
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>수업실연은 10~20분 내외로 진행되며, 도입-전개-정리의 구조를 갖춥니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>가상의 학생들이 있다고 가정하고, 실제 수업하듯 진행합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>발문, 판서, 학생과의 상호작용을 자연스럽게 표현하는 것이 중요합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>교과별 특성에 맞는 교수학습 방법을 적용해야 합니다</span>
            </li>
          </ul>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.items.filter(item =>
              completedItems.includes(item.id)
            ).length;

            return (
              <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${(topicCompleted / topic.items.length) * 100}%` }}
                      />
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="border-t divide-y">
                    {topic.items.map((item) => (
                      <div
                        key={item.id}
                        className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition ${
                          completedItems.includes(item.id) ? 'bg-green-50' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedItems.includes(item.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-indigo-500'
                          }`}
                        >
                          {completedItems.includes(item.id) && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedItems.includes(item.id) ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.id}. {item.question}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAIHelp(item.prompt)}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition shadow-md"
                        >
                          🤖 AI 도움
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/education/teacher-certificate/study/teaching-essay"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 교직논술
          </Link>
          <Link
            href="/category/education/teacher-certificate/study/interview"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 transition shadow-md"
          >
            면접 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-4 rounded-xl">
                {currentPrompt.slice(0, 100)}...
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-sm text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
