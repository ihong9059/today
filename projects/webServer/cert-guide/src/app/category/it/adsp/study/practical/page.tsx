'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ADsPPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('adsp-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('adsp-practical-completed', JSON.stringify(items));
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
      title: "시험 당일 준비",
      icon: "📅",
      items: [
        "시험 시작 30분 전까지 입실 완료하기",
        "신분증 필수 지참 (주민등록증, 운전면허증, 여권)",
        "수험표 출력 또는 캡처 준비",
        "컴퓨터 사인펜 준비 (일부 시험장)",
        "시험장 위치 사전 확인하기"
      ]
    },
    {
      title: "시험 시간 관리",
      icon: "⏱️",
      items: [
        "총 90분, 50문항 → 문항당 평균 1분 48초",
        "1과목(10문항): 15분 이내 목표",
        "2과목(10문항): 15분 이내 목표",
        "3과목(30문항): 50분 이내 목표",
        "마지막 10분은 검토 시간으로 확보"
      ]
    },
    {
      title: "1과목 출제 전략",
      icon: "📊",
      items: [
        "DIKW 피라미드: 데이터→정보→지식→지혜 순서",
        "3V/5V: 빅데이터 특징 (Volume, Velocity, Variety...)",
        "SECI 모델: 암묵지-형식지 변환 4단계",
        "정형/반정형/비정형: 예시 문제 자주 출제",
        "개인정보: 가명정보 vs 익명정보 구분"
      ]
    },
    {
      title: "2과목 출제 전략",
      icon: "📋",
      items: [
        "CRISP-DM 6단계: 순서 완벽 암기 필수",
        "KDD vs CRISP-DM vs SEMMA: 차이점 비교",
        "하향식 vs 상향식 접근법: 특징과 적용 상황",
        "분석 조직 유형: 집중형/분산형/기능형",
        "분석 성숙도 4단계: 도입-활용-확산-최적화"
      ]
    },
    {
      title: "3과목 출제 전략",
      icon: "🔬",
      items: [
        "R 데이터 구조: vector, matrix, data.frame, list",
        "결측값/이상값 처리: na.omit(), IQR 방식",
        "상관계수: 피어슨(연속), 스피어만(순위)",
        "회귀분석: R² 해석, VIF 다중공선성",
        "K-means: 알고리즘 순서, 엘보우 방법"
      ]
    },
    {
      title: "빈출 공식 정리",
      icon: "📐",
      items: [
        "표준화: (x - mean) / sd",
        "정규화: (x - min) / (max - min)",
        "지지도: P(A∩B) = (A와 B 동시 발생) / 전체",
        "신뢰도: P(B|A) = P(A∩B) / P(A)",
        "향상도: Confidence / P(B), >1이면 양의 상관"
      ]
    },
    {
      title: "자주 틀리는 개념",
      icon: "⚠️",
      items: [
        "1종 오류: 귀무가설이 참인데 기각 (α)",
        "2종 오류: 귀무가설이 거짓인데 채택 (β)",
        "검정력: 1 - β (대립가설 참일 때 기각 확률)",
        "p-value < α 이면 귀무가설 기각",
        "R²가 높다고 항상 좋은 모델은 아님"
      ]
    },
    {
      title: "마무리 체크리스트",
      icon: "✅",
      items: [
        "기출문제 최소 3회분 풀어보기",
        "오답노트 작성 및 복습",
        "용어 정의 최종 정리",
        "공식 암기 최종 확인",
        "시험 전날은 가볍게 복습만"
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
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 40문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-50 transition-colors"
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
                            isCompleted ? 'bg-cyan-50 border-cyan-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-cyan-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-cyan-500 hover:text-cyan-700 text-xs px-2 py-1 rounded bg-cyan-100 hover:bg-cyan-200"
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

        <div className="mt-8 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
          <h3 className="font-bold text-cyan-800 mb-3">💡 합격 전략 요약</h3>
          <ul className="space-y-2 text-cyan-700 text-sm">
            <li>• <strong>3과목 집중</strong>: 60% 배점이므로 3과목에 가장 많은 시간 투자</li>
            <li>• <strong>기출문제</strong>: 기출 유형이 반복되므로 기출 분석 필수</li>
            <li>• <strong>용어 정리</strong>: 유사 개념 구분 문제 대비</li>
            <li>• <strong>60점 목표</strong>: 과락 없이 총점 60점 이상이면 합격</li>
          </ul>
        </div>

        <div className="mt-4 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">📚 추천 학습 자료</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 데이터진흥원 공식 가이드북</li>
            <li>• 기출문제 PDF (데이터자격검정 홈페이지)</li>
            <li>• ADsP 요약집 (시중 교재)</li>
            <li>• 유튜브 ADsP 강의 (무료)</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`ADsP 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`ADsP 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`ADsP 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
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
