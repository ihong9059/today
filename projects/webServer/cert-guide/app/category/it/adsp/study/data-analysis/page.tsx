'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ADsPDataAnalysisPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('adsp-data-analysis-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('adsp-data-analysis-completed', JSON.stringify(items));
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
      title: "R 기초와 데이터 구조",
      icon: "💻",
      items: [
        "R 언어 특징: 통계 분석 특화 오픈소스 언어",
        "R 데이터 타입: numeric, character, logical, factor",
        "벡터(Vector): 동일 타입 원소의 1차원 배열, c() 함수",
        "행렬(Matrix): 동일 타입 2차원 배열, matrix() 함수",
        "데이터프레임(Data Frame): 열마다 다른 타입 가능, data.frame()",
        "리스트(List): 다양한 타입 저장 가능, list() 함수",
        "팩터(Factor): 범주형 변수 처리, factor() 함수",
        "데이터 불러오기: read.csv(), read.table()",
        "데이터 저장하기: write.csv(), write.table()",
        "패키지 설치: install.packages(), library()"
      ]
    },
    {
      title: "데이터 마트와 전처리",
      icon: "🔧",
      items: [
        "데이터 마트: 분석용 데이터셋 구성",
        "결측값(NA) 처리: na.omit(), is.na(), 대체",
        "결측값 대체: 평균, 중앙값, 최빈값 대체",
        "이상값(Outlier) 탐지: IQR 방식, Z-score 방식",
        "이상값 처리: 제거, 대체, 변환",
        "데이터 변환: 로그 변환, 정규화, 표준화",
        "표준화(Standardization): (x - mean) / sd",
        "정규화(Normalization): (x - min) / (max - min)",
        "더미 변수: 범주형 → 수치형 변환",
        "데이터 병합: merge(), rbind(), cbind()"
      ]
    },
    {
      title: "기술통계와 탐색적 분석",
      icon: "📈",
      items: [
        "중심 경향: 평균(mean), 중앙값(median), 최빈값(mode)",
        "산포도: 분산(var), 표준편차(sd), 범위(range)",
        "분위수: quantile(), IQR (사분위수 범위)",
        "왜도(Skewness): 분포의 비대칭 정도",
        "첨도(Kurtosis): 분포의 뾰족함 정도",
        "상관계수: cor(), 피어슨/스피어만/켄달",
        "피어슨 상관: 선형 관계, -1 ~ +1 범위",
        "공분산: cov(), 두 변수의 함께 변하는 정도",
        "그룹별 통계: aggregate(), tapply()",
        "EDA (탐색적 데이터 분석): summary(), str(), head()"
      ]
    },
    {
      title: "확률과 추론통계",
      icon: "🎲",
      items: [
        "확률 기초: 확률 정의, 조건부 확률, 독립 사건",
        "베이즈 정리: P(A|B) = P(B|A)P(A) / P(B)",
        "확률 분포: 이산형(이항, 포아송), 연속형(정규, 지수)",
        "정규 분포: 평균과 표준편차로 결정되는 종 모양",
        "표준 정규 분포: 평균 0, 표준편차 1인 정규분포",
        "중심극한정리: 표본평균은 정규분포에 수렴",
        "표본 추출: 단순무작위, 층화, 군집 추출",
        "점추정과 구간추정: 모수 추정 방법",
        "신뢰구간: 모수가 포함될 구간 (95%, 99%)",
        "표준오차(SE): 표본평균의 표준편차"
      ]
    },
    {
      title: "가설검정",
      icon: "🔬",
      items: [
        "가설검정 절차: 가설설정 → 유의수준 → 검정통계량 → 결론",
        "귀무가설(H0): 차이/효과가 없다는 가설",
        "대립가설(H1): 차이/효과가 있다는 가설",
        "유의수준(α): 1종 오류 허용 범위 (0.05, 0.01)",
        "1종 오류: H0 참인데 기각 (α)",
        "2종 오류: H0 거짓인데 채택 (β)",
        "검정력(1-β): 대립가설이 참일 때 기각하는 확률",
        "p-value: 귀무가설 하에서 관측값의 확률",
        "t-검정: 평균 비교 (단일표본, 독립표본, 대응표본)",
        "카이제곱 검정: 범주형 변수 독립성/적합도 검정"
      ]
    },
    {
      title: "회귀분석",
      icon: "📊",
      items: [
        "단순 회귀: Y = β0 + β1*X + ε (1개 독립변수)",
        "다중 회귀: Y = β0 + β1*X1 + β2*X2 + ... + ε",
        "최소제곱법(OLS): 잔차 제곱합 최소화",
        "결정계수(R²): 설명력, 0~1 범위",
        "수정된 R²: 변수 수 보정한 R²",
        "회귀계수 해석: X가 1 증가하면 Y가 β만큼 변화",
        "잔차 분석: 정규성, 등분산성, 독립성 확인",
        "다중공선성: VIF > 10이면 문제",
        "변수 선택: 전진, 후진, 단계적 선택법",
        "R 함수: lm(), summary(), predict()"
      ]
    },
    {
      title: "분류 분석",
      icon: "🏷️",
      items: [
        "분류 문제: 범주형 종속변수 예측",
        "로지스틱 회귀: 이항 분류, 시그모이드 함수",
        "오즈(Odds): 성공확률 / 실패확률",
        "로짓(Logit): log(Odds), 로지스틱 회귀의 선형식",
        "의사결정나무: 규칙 기반 분류, 해석력 우수",
        "엔트로피: 불순도 측정 지표 (정보이론)",
        "지니 지수: 불순도 측정 지표 (CART)",
        "가지치기(Pruning): 과적합 방지",
        "앙상블: 배깅, 부스팅, 랜덤포레스트",
        "혼동행렬: TP, TN, FP, FN"
      ]
    },
    {
      title: "군집 분석",
      icon: "👥",
      items: [
        "군집 분석: 비지도 학습, 유사 객체 그룹화",
        "K-means: 중심점 기반 군집화",
        "K-means 알고리즘: 초기화 → 할당 → 업데이트 반복",
        "K 결정 방법: 엘보우(Elbow) 방법",
        "계층적 군집: 병합/분할 방식, 덴드로그램",
        "거리 측정: 유클리드, 맨해튼, 민코프스키",
        "연결 방법: 단일, 완전, 평균, 워드",
        "실루엣 계수: 군집 품질 평가 (-1 ~ 1)",
        "밀도 기반 군집: DBSCAN (비구형 군집 탐지)",
        "R 함수: kmeans(), hclust(), dist()"
      ]
    },
    {
      title: "연관 분석",
      icon: "🔗",
      items: [
        "연관 규칙: 장바구니 분석, If-Then 규칙",
        "지지도(Support): P(A∩B), 전체 대비 동시 발생",
        "신뢰도(Confidence): P(B|A), A 발생 시 B 발생 확률",
        "향상도(Lift): Confidence / P(B), 1보다 크면 양의 상관",
        "최소 지지도/신뢰도: 규칙 필터링 기준",
        "Apriori 알고리즘: 빈발 항목집합 탐색",
        "Apriori 원리: 빈발하지 않은 집합의 상위집합도 빈발 X",
        "순차 패턴: 시간 순서 고려한 연관 규칙",
        "활용 사례: 상품 추천, 교차 판매",
        "R 패키지: arules, arulesViz"
      ]
    },
    {
      title: "데이터 시각화",
      icon: "📉",
      items: [
        "시각화 목적: 탐색, 설명, 인사이트 전달",
        "막대 그래프: 범주형 비교, barplot()",
        "히스토그램: 연속형 분포, hist()",
        "상자그림(Boxplot): 분포와 이상값, boxplot()",
        "산점도: 두 변수 관계, plot()",
        "선그래프: 시계열 추세, plot(type='l')",
        "파이차트: 비율 표현 (주의: 비교 어려움)",
        "히트맵: 행렬 시각화, 상관행렬 표현",
        "시각화 원칙: 정확성, 명확성, 효율성",
        "ggplot2: Grammar of Graphics 기반 시각화"
      ]
    },
    {
      title: "기출 빈출 개념",
      icon: "⭐",
      items: [
        "R 데이터 구조: 벡터, 행렬, 데이터프레임, 리스트 차이",
        "결측값/이상값: 처리 방법 정리",
        "표준화 vs 정규화: 공식과 적용 상황",
        "상관계수: 피어슨, 스피어만 차이점",
        "가설검정: 1종/2종 오류, p-value 해석",
        "회귀분석: R², VIF, 잔차 분석",
        "로지스틱 회귀: 오즈, 로짓 개념",
        "K-means: 알고리즘 순서, K 결정 방법",
        "연관분석: 지지도, 신뢰도, 향상도 공식",
        "시각화: 변수 유형별 적절한 그래프 선택"
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
            <span className="text-4xl">🔬</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">3과목: 데이터 분석</h1>
              <p className="text-gray-600">통계, 마이닝, 시각화 110문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>중요:</strong> 3과목은 30문항(60%)으로 가장 배점이 높습니다.
            통계와 R 기초, 데이터 마이닝 기법을 집중적으로 학습하세요.
          </p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-50 transition-colors"
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
                            isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-indigo-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-indigo-500 hover:text-indigo-700 text-xs px-2 py-1 rounded bg-indigo-100 hover:bg-indigo-200"
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

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">💡 3과목 학습 TIP</h3>
          <ul className="space-y-2 text-indigo-700 text-sm">
            <li>• <strong>R 기초</strong>: 데이터 구조와 기본 함수는 반드시 숙지하세요</li>
            <li>• <strong>통계</strong>: 가설검정 절차와 1종/2종 오류 개념 정리</li>
            <li>• <strong>회귀분석</strong>: R², VIF, 다중공선성 개념 필수</li>
            <li>• <strong>데이터 마이닝</strong>: K-means, 의사결정나무, 연관분석 빈출</li>
            <li>• <strong>공식</strong>: 지지도/신뢰도/향상도, 표준화/정규화 공식 암기</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`ADsP 데이터 분석 관련 질문입니다: "${currentQuestion}" - 예제와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`ADsP 데이터 분석 관련 질문입니다: "${currentQuestion}" - 예제와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`ADsP 데이터 분석 관련 질문입니다: "${currentQuestion}" - 예제와 함께 자세히 설명해주세요.`)}`}
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
