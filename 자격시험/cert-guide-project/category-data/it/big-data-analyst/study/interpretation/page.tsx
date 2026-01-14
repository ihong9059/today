'use client';

import { useState } from 'react';

export default function InterpretationStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      name: '분류 모델 평가',
      questions: [
        { id: 1, question: '혼동 행렬(Confusion Matrix)의 구성 요소는?', answer: 'TP, TN, FP, FN', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 혼동 행렬의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. TP, TN, FP, FN 정의\n2. 혼동 행렬 시각화\n3. sklearn confusion_matrix\n4. 해석 방법\n5. 연습문제 3개' },
        { id: 2, question: '정확도(Accuracy)의 공식은?', answer: '(TP + TN) / (TP + TN + FP + FN)', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 정확도의 공식은?\n\n다음 순서로 설명해주세요:\n1. 정확도 정의와 공식\n2. 불균형 데이터에서 한계\n3. sklearn accuracy_score\n4. 적절한 사용 상황\n5. 연습문제 3개' },
        { id: 3, question: '정밀도(Precision)의 공식과 의미는?', answer: 'TP / (TP + FP), 양성 예측 중 실제 양성 비율', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 정밀도의 공식과 의미는?\n\n다음 순서로 설명해주세요:\n1. 정밀도 정의와 공식\n2. FP를 줄이는 것이 중요할 때\n3. 스팸 필터 예시\n4. sklearn precision_score\n5. 연습문제 3개' },
        { id: 4, question: '재현율(Recall)의 공식과 의미는?', answer: 'TP / (TP + FN), 실제 양성 중 양성으로 예측한 비율', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 재현율의 공식과 의미는?\n\n다음 순서로 설명해주세요:\n1. 재현율 정의와 공식\n2. FN을 줄이는 것이 중요할 때\n3. 암 진단 예시\n4. sklearn recall_score\n5. 연습문제 3개' },
        { id: 5, question: 'F1-Score의 공식과 의미는?', answer: '2 * (Precision * Recall) / (Precision + Recall), 정밀도와 재현율의 조화평균', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: F1-Score의 공식과 의미는?\n\n다음 순서로 설명해주세요:\n1. F1-Score 정의\n2. 조화평균을 사용하는 이유\n3. 불균형 데이터에서 유용\n4. sklearn f1_score\n5. 연습문제 3개' },
        { id: 6, question: 'ROC 곡선이 보여주는 정보는?', answer: 'FPR(x축)과 TPR(y축)의 관계, 임계값 변화에 따른 성능', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: ROC 곡선이 보여주는 정보는?\n\n다음 순서로 설명해주세요:\n1. ROC 곡선 정의\n2. TPR(민감도)와 FPR\n3. 곡선 해석 방법\n4. sklearn roc_curve\n5. 연습문제 3개' },
        { id: 7, question: 'AUC(Area Under Curve)의 의미는?', answer: 'ROC 곡선 아래 면적, 1에 가까울수록 좋은 분류기', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: AUC의 의미는?\n\n다음 순서로 설명해주세요:\n1. AUC 정의\n2. AUC 해석 기준\n3. 0.5는 무작위 분류기\n4. sklearn roc_auc_score\n5. 연습문제 3개' },
        { id: 8, question: '특이도(Specificity)의 공식은?', answer: 'TN / (TN + FP), 실제 음성 중 음성으로 예측한 비율', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 특이도의 공식은?\n\n다음 순서로 설명해주세요:\n1. 특이도 정의\n2. 민감도와 관계\n3. 의료 진단에서 의미\n4. 계산 예시\n5. 연습문제 3개' },
        { id: 9, question: '정밀도-재현율 트레이드오프란?', answer: '임계값 조정 시 정밀도와 재현율이 반비례 관계', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 정밀도-재현율 트레이드오프란?\n\n다음 순서로 설명해주세요:\n1. 트레이드오프 개념\n2. 임계값의 영향\n3. PR 곡선\n4. 최적 임계값 찾기\n5. 연습문제 3개' },
        { id: 10, question: 'Macro/Micro/Weighted 평균의 차이는?', answer: 'Macro: 클래스별 단순 평균, Micro: 전체 통합, Weighted: 클래스 크기 가중', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 다중 클래스 평균 방식 차이는?\n\n다음 순서로 설명해주세요:\n1. Macro Average\n2. Micro Average\n3. Weighted Average\n4. sklearn average 파라미터\n5. 연습문제 3개' },
      ]
    },
    {
      name: '회귀 모델 평가',
      questions: [
        { id: 11, question: 'MSE(Mean Squared Error)의 특징은?', answer: '오차를 제곱하여 큰 오차에 더 큰 패널티', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: MSE의 특징은?\n\n다음 순서로 설명해주세요:\n1. MSE 공식\n2. 제곱의 의미\n3. 이상치 민감성\n4. sklearn mean_squared_error\n5. 연습문제 3개' },
        { id: 12, question: 'RMSE를 사용하는 이유는?', answer: '원래 단위로 해석 가능', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: RMSE를 사용하는 이유는?\n\n다음 순서로 설명해주세요:\n1. RMSE 정의\n2. MSE와 비교\n3. 단위 해석\n4. 계산 방법\n5. 연습문제 3개' },
        { id: 13, question: 'MAE(Mean Absolute Error)의 장점은?', answer: '이상치에 덜 민감, 해석이 직관적', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: MAE의 장점은?\n\n다음 순서로 설명해주세요:\n1. MAE 공식\n2. MSE와 비교\n3. 이상치 영향\n4. sklearn mean_absolute_error\n5. 연습문제 3개' },
        { id: 14, question: 'MAPE(Mean Absolute Percentage Error)의 공식은?', answer: 'mean(|실제-예측|/실제) * 100', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: MAPE의 공식은?\n\n다음 순서로 설명해주세요:\n1. MAPE 정의\n2. 백분율 해석\n3. 0이 포함된 데이터 문제\n4. 계산 방법\n5. 연습문제 3개' },
        { id: 15, question: 'R²(결정계수)가 음수가 되는 경우는?', answer: '모델이 평균값 예측보다 못할 때', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: R²가 음수가 되는 경우는?\n\n다음 순서로 설명해주세요:\n1. R² 공식\n2. 음수의 의미\n3. 모델 문제점 진단\n4. sklearn r2_score\n5. 연습문제 3개' },
        { id: 16, question: 'Adjusted R²를 사용하는 이유는?', answer: '변수 추가에 따른 R² 증가를 보정', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Adjusted R²를 사용하는 이유는?\n\n다음 순서로 설명해주세요:\n1. Adjusted R² 공식\n2. 변수 수 보정\n3. 변수 선택에 활용\n4. 계산 방법\n5. 연습문제 3개' },
        { id: 17, question: '잔차 플롯에서 패턴이 보이면 의미는?', answer: '선형성 가정 위배 또는 누락된 변수 존재', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 잔차 플롯 패턴의 의미는?\n\n다음 순서로 설명해주세요:\n1. 잔차 플롯 해석\n2. 무작위 분포가 이상적\n3. 패턴별 문제점\n4. matplotlib 시각화\n5. 연습문제 3개' },
        { id: 18, question: 'Q-Q Plot의 용도는?', answer: '잔차의 정규성 검정', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Q-Q Plot의 용도는?\n\n다음 순서로 설명해주세요:\n1. Q-Q Plot 정의\n2. 정규분포 확인 방법\n3. 직선에서 벗어나면?\n4. scipy.stats probplot\n5. 연습문제 3개' },
        { id: 19, question: 'RMSLE(Root Mean Squared Logarithmic Error)를 사용하는 경우는?', answer: '과대 예측보다 과소 예측에 더 큰 패널티를 줄 때', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: RMSLE를 사용하는 경우는?\n\n다음 순서로 설명해주세요:\n1. RMSLE 공식\n2. 로그 변환 효과\n3. 주택 가격 예측 예시\n4. 계산 방법\n5. 연습문제 3개' },
        { id: 20, question: '교차검증 시 회귀 모델의 평가 지표 선택 기준은?', answer: '비즈니스 목적과 데이터 특성에 따라 선택', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 회귀 평가 지표 선택 기준은?\n\n다음 순서로 설명해주세요:\n1. 지표별 특성\n2. 이상치 유무에 따른 선택\n3. 해석 용이성\n4. cross_val_score scoring\n5. 연습문제 3개' },
      ]
    },
    {
      name: '군집 모델 평가',
      questions: [
        { id: 21, question: '실루엣 점수(Silhouette Score)의 범위와 해석은?', answer: '-1 ~ 1, 1에 가까울수록 잘 군집화', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 실루엣 점수의 해석은?\n\n다음 순서로 설명해주세요:\n1. 실루엣 점수 공식\n2. 해석 기준\n3. 군집별 실루엣 분석\n4. sklearn silhouette_score\n5. 연습문제 3개' },
        { id: 22, question: 'Davies-Bouldin Index의 특징은?', answer: '값이 낮을수록 좋은 군집화', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Davies-Bouldin Index의 특징은?\n\n다음 순서로 설명해주세요:\n1. DBI 정의\n2. 해석 방법 (낮을수록 좋음)\n3. 실루엣과 비교\n4. sklearn davies_bouldin_score\n5. 연습문제 3개' },
        { id: 23, question: 'Calinski-Harabasz Index의 의미는?', answer: '군집 간 분산 / 군집 내 분산, 값이 클수록 좋음', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Calinski-Harabasz Index의 의미는?\n\n다음 순서로 설명해주세요:\n1. CH Index 정의\n2. 해석 방법 (높을수록 좋음)\n3. 군집 수 결정에 활용\n4. sklearn calinski_harabasz_score\n5. 연습문제 3개' },
        { id: 24, question: '엘보우 방법(Elbow Method)의 원리는?', answer: 'K 증가에 따른 inertia 감소가 완만해지는 지점 선택', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 엘보우 방법의 원리는?\n\n다음 순서로 설명해주세요:\n1. inertia 정의\n2. K에 따른 그래프\n3. 엘보우 포인트 찾기\n4. 코드 구현\n5. 연습문제 3개' },
        { id: 25, question: '외부 평가 지표와 내부 평가 지표의 차이는?', answer: '외부: 정답 레이블 필요, 내부: 레이블 불필요', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 외부/내부 평가 지표의 차이는?\n\n다음 순서로 설명해주세요:\n1. 외부 평가 지표 (ARI, NMI)\n2. 내부 평가 지표 (실루엣, DBI)\n3. 사용 상황\n4. sklearn 함수\n5. 연습문제 3개' },
        { id: 26, question: 'Adjusted Rand Index(ARI)의 범위와 해석은?', answer: '-1 ~ 1, 1에 가까울수록 정답과 일치', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: ARI의 범위와 해석은?\n\n다음 순서로 설명해주세요:\n1. Rand Index 정의\n2. Adjusted의 의미\n3. 해석 기준\n4. sklearn adjusted_rand_score\n5. 연습문제 3개' },
        { id: 27, question: 'NMI(Normalized Mutual Information)의 특징은?', answer: '0 ~ 1 범위, 정보 이론 기반 유사도', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: NMI의 특징은?\n\n다음 순서로 설명해주세요:\n1. Mutual Information 정의\n2. 정규화의 의미\n3. ARI와 비교\n4. sklearn normalized_mutual_info_score\n5. 연습문제 3개' },
        { id: 28, question: '군집 결과 시각화 방법은?', answer: 'PCA/t-SNE로 2D 변환 후 산점도', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 군집 결과 시각화 방법은?\n\n다음 순서로 설명해주세요:\n1. 고차원 데이터 시각화 문제\n2. PCA로 2D 변환\n3. t-SNE 활용\n4. matplotlib 코드\n5. 연습문제 3개' },
        { id: 29, question: '군집별 프로파일 분석이란?', answer: '각 군집의 특성(평균, 비율)을 비교하여 해석', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 군집별 프로파일 분석이란?\n\n다음 순서로 설명해주세요:\n1. 프로파일 분석 정의\n2. 군집별 통계량 비교\n3. 레이더 차트 시각화\n4. 비즈니스 해석\n5. 연습문제 3개' },
        { id: 30, question: 'Gap Statistic의 원리는?', answer: '실제 데이터와 무작위 데이터의 군집 결과 비교', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Gap Statistic의 원리는?\n\n다음 순서로 설명해주세요:\n1. Gap Statistic 정의\n2. 무작위 데이터 생성\n3. 최적 K 결정\n4. 구현 방법\n5. 연습문제 3개' },
      ]
    },
    {
      name: '모델 해석',
      questions: [
        { id: 31, question: '피처 중요도(Feature Importance)를 확인하는 방법은?', answer: '트리 기반 모델의 feature_importances_ 속성', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 피처 중요도 확인 방법은?\n\n다음 순서로 설명해주세요:\n1. 피처 중요도 정의\n2. 트리 모델에서 계산 원리\n3. 시각화 방법\n4. sklearn 코드\n5. 연습문제 3개' },
        { id: 32, question: 'Permutation Importance의 원리는?', answer: '피처 값을 섞었을 때 성능 저하 정도로 측정', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: Permutation Importance의 원리는?\n\n다음 순서로 설명해주세요:\n1. 순열 중요도 개념\n2. 기본 중요도와 차이\n3. 장단점\n4. sklearn permutation_importance\n5. 연습문제 3개' },
        { id: 33, question: 'SHAP(SHapley Additive exPlanations)의 특징은?', answer: '게임이론 기반, 각 피처의 기여도를 정량화', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: SHAP의 특징은?\n\n다음 순서로 설명해주세요:\n1. Shapley Value 개념\n2. SHAP 값 해석\n3. Force Plot, Summary Plot\n4. shap 라이브러리\n5. 연습문제 3개' },
        { id: 34, question: 'LIME(Local Interpretable Model-agnostic Explanations)의 원리는?', answer: '개별 예측 주변에서 단순 모델로 근사하여 설명', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: LIME의 원리는?\n\n다음 순서로 설명해주세요:\n1. LIME 개념\n2. Local Surrogate Model\n3. SHAP과 비교\n4. lime 라이브러리\n5. 연습문제 3개' },
        { id: 35, question: 'Partial Dependence Plot(PDP)이 보여주는 정보는?', answer: '특정 피처가 예측에 미치는 평균적 영향', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: PDP가 보여주는 정보는?\n\n다음 순서로 설명해주세요:\n1. PDP 정의\n2. 계산 방법\n3. 해석 방법\n4. sklearn plot_partial_dependence\n5. 연습문제 3개' },
        { id: 36, question: '설명 가능한 AI(XAI)의 필요성은?', answer: '모델 신뢰성 확보, 규제 대응, 디버깅', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: XAI의 필요성은?\n\n다음 순서로 설명해주세요:\n1. XAI 정의\n2. 블랙박스 모델 문제\n3. 규제 요구사항 (GDPR)\n4. XAI 기법 종류\n5. 연습문제 3개' },
        { id: 37, question: '회귀 계수의 해석 방법은?', answer: '다른 변수 고정 시 해당 변수 1단위 증가에 따른 타겟 변화', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 회귀 계수의 해석 방법은?\n\n다음 순서로 설명해주세요:\n1. 회귀 계수의 의미\n2. 다른 변수 통제\n3. 표준화 계수\n4. statsmodels 결과 해석\n5. 연습문제 3개' },
        { id: 38, question: '오즈비(Odds Ratio)의 의미는?', answer: '로지스틱 회귀에서 변수 1단위 증가 시 오즈 변화 비율', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 오즈비의 의미는?\n\n다음 순서로 설명해주세요:\n1. 오즈의 정의\n2. 오즈비 계산\n3. exp(계수)의 의미\n4. 해석 예시\n5. 연습문제 3개' },
        { id: 39, question: '의사결정나무 시각화의 장점은?', answer: '규칙 기반 해석이 직관적', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 의사결정나무 시각화의 장점은?\n\n다음 순서로 설명해주세요:\n1. 트리 구조 해석\n2. 분할 조건 확인\n3. 리프 노드 해석\n4. sklearn plot_tree\n5. 연습문제 3개' },
        { id: 40, question: 'ICE(Individual Conditional Expectation) Plot이란?', answer: 'PDP의 개별 인스턴스 버전, 이질성 파악 가능', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: ICE Plot이란?\n\n다음 순서로 설명해주세요:\n1. ICE Plot 정의\n2. PDP와 차이\n3. 이질적 효과 탐지\n4. 시각화 방법\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분석 결과 보고',
      questions: [
        { id: 41, question: '분석 보고서의 필수 구성 요소는?', answer: '배경/목적, 데이터 설명, 분석 방법, 결과, 결론/제언', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 분석 보고서의 필수 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 보고서 구조\n2. 각 섹션 작성 요령\n3. 독자 맞춤 작성\n4. 시각화 활용\n5. 연습문제 3개' },
        { id: 42, question: '데이터 시각화의 원칙은?', answer: '명확성, 정확성, 효율성, 심미성', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 데이터 시각화의 원칙은?\n\n다음 순서로 설명해주세요:\n1. 시각화 4원칙\n2. 차트 유형 선택\n3. 색상 사용 가이드\n4. 잘못된 시각화 예시\n5. 연습문제 3개' },
        { id: 43, question: '막대 그래프와 히스토그램의 차이는?', answer: '막대: 범주형, 히스토그램: 연속형 분포', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 막대 그래프와 히스토그램의 차이는?\n\n다음 순서로 설명해주세요:\n1. 막대 그래프 용도\n2. 히스토그램 용도\n3. 시각적 차이\n4. matplotlib 코드\n5. 연습문제 3개' },
        { id: 44, question: '파이 차트 사용 시 주의점은?', answer: '범주가 많으면 가독성 저하, 비교가 어려움', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 파이 차트 사용 시 주의점은?\n\n다음 순서로 설명해주세요:\n1. 파이 차트 적합 상황\n2. 범주 수 제한\n3. 대안 (막대, 도넛)\n4. 3D 파이 차트 문제\n5. 연습문제 3개' },
        { id: 45, question: '대시보드 설계 원칙은?', answer: '핵심 지표 중심, 실시간성, 인터랙티브', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 대시보드 설계 원칙은?\n\n다음 순서로 설명해주세요:\n1. 대시보드 목적\n2. KPI 선정\n3. 레이아웃 설계\n4. 도구 (Tableau, PowerBI)\n5. 연습문제 3개' },
        { id: 46, question: '스토리텔링 기반 데이터 발표의 요소는?', answer: '상황-문제-해결-결과 구조', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 데이터 스토리텔링의 요소는?\n\n다음 순서로 설명해주세요:\n1. 스토리텔링의 중요성\n2. SCQA 프레임워크\n3. 청중 분석\n4. 발표 팁\n5. 연습문제 3개' },
        { id: 47, question: '분석 결과의 비즈니스 임팩트를 정량화하는 방법은?', answer: 'ROI, 비용 절감액, 매출 증가액으로 환산', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 비즈니스 임팩트 정량화 방법은?\n\n다음 순서로 설명해주세요:\n1. 임팩트 정량화 필요성\n2. ROI 계산\n3. 가치 환산 예시\n4. 보고 방법\n5. 연습문제 3개' },
        { id: 48, question: '분석 한계점 기술의 중요성은?', answer: '결과 해석의 범위를 명확히 하고 신뢰성 확보', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 분석 한계점 기술의 중요성은?\n\n다음 순서로 설명해주세요:\n1. 한계점 기술 이유\n2. 데이터 한계\n3. 방법론 한계\n4. 후속 연구 제안\n5. 연습문제 3개' },
        { id: 49, question: '재현 가능한 분석(Reproducible Analysis)의 요건은?', answer: '코드, 데이터, 환경 정보 문서화', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: 재현 가능한 분석의 요건은?\n\n다음 순서로 설명해주세요:\n1. 재현성의 중요성\n2. 코드 버전 관리 (Git)\n3. 환경 관리 (requirements.txt)\n4. 노트북 문서화\n5. 연습문제 3개' },
        { id: 50, question: 'A/B 테스트 결과 해석 시 주의점은?', answer: '통계적 유의성, 실용적 유의성, 표본 크기 확인', prompt: '빅데이터분석기사 빅데이터 결과 해석 문제입니다.\n\n문제: A/B 테스트 결과 해석 시 주의점은?\n\n다음 순서로 설명해주세요:\n1. A/B 테스트 개요\n2. p-value 해석\n3. 효과 크기\n4. 검정력 분석\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst" className="text-gray-600 hover:text-blue-600">빅데이터분석기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst/study" className="text-gray-600 hover:text-blue-600">학습하기</a>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">빅데이터 결과 해석</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📊</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터 결과 해석</h1>
              <p className="text-purple-100">4과목 | {totalQuestions}문항 | 평가지표 암기 필수!</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topicIndex)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">{topicIndex + 1}</span>
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIndex) && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">{q.id}</span>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{q.question}</p>
                          <p className="text-sm text-purple-600 bg-purple-50 p-2 rounded">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
