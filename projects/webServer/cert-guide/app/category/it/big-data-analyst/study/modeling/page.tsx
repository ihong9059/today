'use client';

import { useState } from 'react';

export default function ModelingStudyPage() {
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
      name: '회귀분석',
      questions: [
        { id: 1, question: '단순선형회귀에서 결정계수(R²)의 의미는?', answer: '종속변수의 분산 중 독립변수로 설명되는 비율', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 결정계수(R²)의 의미는?\n\n다음 순서로 설명해주세요:\n1. R²의 정의와 공식\n2. 0~1 사이 해석\n3. 조정된 R² (Adjusted R²)\n4. sklearn로 계산\n5. 연습문제 3개' },
        { id: 2, question: '다중공선성(Multicollinearity)의 문제점은?', answer: '회귀계수 추정이 불안정해지고 해석이 어려워짐', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 다중공선성의 문제점은?\n\n다음 순서로 설명해주세요:\n1. 다중공선성의 정의\n2. VIF로 진단\n3. 해결 방법 (피처 제거, PCA)\n4. Python 코드\n5. 연습문제 3개' },
        { id: 3, question: '릿지(Ridge) 회귀의 정규화 방식은?', answer: 'L2 정규화 (계수의 제곱합에 패널티)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 릿지 회귀의 정규화 방식은?\n\n다음 순서로 설명해주세요:\n1. Ridge 회귀 정의\n2. L2 정규화 공식\n3. alpha 파라미터\n4. sklearn Ridge 사용법\n5. 연습문제 3개' },
        { id: 4, question: '라쏘(Lasso) 회귀의 특징은?', answer: 'L1 정규화로 불필요한 피처의 계수를 0으로 만듦 (피처 선택)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 라쏘 회귀의 특징은?\n\n다음 순서로 설명해주세요:\n1. Lasso 회귀 정의\n2. L1 정규화 공식\n3. 피처 선택 효과\n4. Ridge vs Lasso 비교\n5. 연습문제 3개' },
        { id: 5, question: '엘라스틱넷(ElasticNet)의 특징은?', answer: 'L1과 L2 정규화를 결합', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 엘라스틱넷의 특징은?\n\n다음 순서로 설명해주세요:\n1. ElasticNet 정의\n2. l1_ratio 파라미터\n3. 사용 시나리오\n4. sklearn 사용법\n5. 연습문제 3개' },
        { id: 6, question: '회귀모델의 잔차(Residual)가 만족해야 하는 가정은?', answer: '정규성, 등분산성, 독립성, 선형성', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 회귀모델 잔차의 가정은?\n\n다음 순서로 설명해주세요:\n1. 4가지 가정 설명\n2. 잔차 플롯 분석\n3. 가정 위배 시 대처\n4. 검정 방법\n5. 연습문제 3개' },
        { id: 7, question: 'MSE(Mean Squared Error)와 RMSE의 관계는?', answer: 'RMSE = √MSE', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: MSE와 RMSE의 관계는?\n\n다음 순서로 설명해주세요:\n1. MSE 정의와 공식\n2. RMSE 정의\n3. MAE와 비교\n4. sklearn로 계산\n5. 연습문제 3개' },
        { id: 8, question: 'MAE(Mean Absolute Error)의 특징은?', answer: '이상치에 덜 민감함', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: MAE의 특징은?\n\n다음 순서로 설명해주세요:\n1. MAE 정의와 공식\n2. MSE와 비교\n3. 이상치 영향\n4. sklearn로 계산\n5. 연습문제 3개' },
        { id: 9, question: '다항회귀(Polynomial Regression)의 목적은?', answer: '비선형 관계를 다항식으로 모델링', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 다항회귀의 목적은?\n\n다음 순서로 설명해주세요:\n1. 다항회귀 정의\n2. PolynomialFeatures\n3. 과적합 위험\n4. sklearn 구현\n5. 연습문제 3개' },
        { id: 10, question: '회귀계수의 p-value가 0.05보다 클 때 의미는?', answer: '해당 변수가 통계적으로 유의하지 않음', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 회귀계수 p-value 해석은?\n\n다음 순서로 설명해주세요:\n1. p-value의 정의\n2. 유의수준 0.05\n3. 변수 선택 기준\n4. statsmodels 결과 해석\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분류 모델',
      questions: [
        { id: 11, question: '로지스틱 회귀의 출력값 범위와 해석은?', answer: '0~1 사이의 확률값', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 로지스틱 회귀의 출력값은?\n\n다음 순서로 설명해주세요:\n1. 시그모이드 함수\n2. 확률 해석\n3. 임계값(threshold) 설정\n4. sklearn LogisticRegression\n5. 연습문제 3개' },
        { id: 12, question: '의사결정나무의 분할 기준으로 사용되는 지표는?', answer: '지니 불순도(Gini), 엔트로피(Entropy)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 의사결정나무의 분할 기준은?\n\n다음 순서로 설명해주세요:\n1. 지니 불순도 공식\n2. 엔트로피 공식\n3. 정보 이득\n4. sklearn criterion\n5. 연습문제 3개' },
        { id: 13, question: '의사결정나무의 과적합 방지 방법은?', answer: '가지치기(Pruning), max_depth 제한, min_samples_split', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 의사결정나무 과적합 방지 방법은?\n\n다음 순서로 설명해주세요:\n1. 과적합의 원인\n2. 사전 가지치기 파라미터\n3. 사후 가지치기\n4. sklearn 파라미터\n5. 연습문제 3개' },
        { id: 14, question: 'KNN(K-최근접이웃) 알고리즘의 K값이 클 때 특징은?', answer: '결정 경계가 부드러워지고 과소적합 가능성', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: KNN에서 K값의 영향은?\n\n다음 순서로 설명해주세요:\n1. KNN 알고리즘 원리\n2. K값과 편향-분산 트레이드오프\n3. 최적 K 선택 방법\n4. sklearn KNeighborsClassifier\n5. 연습문제 3개' },
        { id: 15, question: 'SVM(Support Vector Machine)의 마진(Margin)이란?', answer: '결정 경계와 가장 가까운 데이터 포인트(서포트 벡터) 사이의 거리', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: SVM의 마진이란?\n\n다음 순서로 설명해주세요:\n1. 마진의 정의\n2. 하드 마진 vs 소프트 마진\n3. C 파라미터\n4. sklearn SVC\n5. 연습문제 3개' },
        { id: 16, question: 'SVM에서 커널 트릭의 목적은?', answer: '비선형 데이터를 고차원으로 매핑하여 선형 분리 가능하게 함', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: SVM 커널 트릭의 목적은?\n\n다음 순서로 설명해주세요:\n1. 커널 트릭 개념\n2. RBF, Polynomial 커널\n3. gamma 파라미터\n4. sklearn kernel 옵션\n5. 연습문제 3개' },
        { id: 17, question: '나이브 베이즈 분류기의 "나이브" 가정은?', answer: '모든 특성(피처)이 서로 독립이라는 가정', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 나이브 베이즈의 나이브 가정은?\n\n다음 순서로 설명해주세요:\n1. 조건부 독립 가정\n2. 베이즈 정리\n3. 장단점\n4. sklearn GaussianNB\n5. 연습문제 3개' },
        { id: 18, question: '소프트맥스(Softmax) 함수의 역할은?', answer: '다중 클래스 분류에서 각 클래스의 확률을 합이 1이 되도록 변환', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 소프트맥스 함수의 역할은?\n\n다음 순서로 설명해주세요:\n1. 소프트맥스 공식\n2. 시그모이드와 차이\n3. 다중 클래스 분류\n4. 코드 구현\n5. 연습문제 3개' },
        { id: 19, question: '불균형 데이터 처리 방법 중 SMOTE의 원리는?', answer: '소수 클래스의 합성 샘플을 생성하여 오버샘플링', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: SMOTE의 원리는?\n\n다음 순서로 설명해주세요:\n1. SMOTE 알고리즘\n2. 오버샘플링 vs 언더샘플링\n3. class_weight 파라미터\n4. imblearn 사용법\n5. 연습문제 3개' },
        { id: 20, question: 'One-vs-Rest(OvR) 전략이란?', answer: '다중 클래스를 여러 이진 분류 문제로 분해', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: One-vs-Rest 전략이란?\n\n다음 순서로 설명해주세요:\n1. OvR 개념\n2. OvO(One-vs-One)와 비교\n3. 적용 알고리즘\n4. sklearn multi_class 옵션\n5. 연습문제 3개' },
      ]
    },
    {
      name: '앙상블 학습',
      questions: [
        { id: 21, question: '배깅(Bagging)의 원리는?', answer: '부트스트랩 샘플로 여러 모델 학습 후 평균/투표로 결합', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 배깅의 원리는?\n\n다음 순서로 설명해주세요:\n1. Bootstrap Aggregating\n2. 분산 감소 효과\n3. Out-of-Bag 에러\n4. sklearn BaggingClassifier\n5. 연습문제 3개' },
        { id: 22, question: '랜덤포레스트의 특징은?', answer: '배깅 + 무작위 피처 선택으로 다양성 확보', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 랜덤포레스트의 특징은?\n\n다음 순서로 설명해주세요:\n1. 랜덤포레스트 원리\n2. max_features 파라미터\n3. feature_importances_\n4. sklearn RandomForestClassifier\n5. 연습문제 3개' },
        { id: 23, question: '부스팅(Boosting)의 원리는?', answer: '이전 모델의 오차를 보완하는 방식으로 순차적 학습', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 부스팅의 원리는?\n\n다음 순서로 설명해주세요:\n1. 순차적 학습 개념\n2. 가중치 업데이트\n3. 배깅과 차이\n4. AdaBoost 원리\n5. 연습문제 3개' },
        { id: 24, question: '그래디언트 부스팅의 학습 방식은?', answer: '잔차(residual)를 예측하는 모델을 순차적으로 추가', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 그래디언트 부스팅의 학습 방식은?\n\n다음 순서로 설명해주세요:\n1. 잔차 학습 개념\n2. 손실 함수 최소화\n3. learning_rate 역할\n4. sklearn GradientBoostingClassifier\n5. 연습문제 3개' },
        { id: 25, question: 'XGBoost의 장점은?', answer: '정규화, 병렬 처리, 결측치 자동 처리, 조기 종료 지원', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: XGBoost의 장점은?\n\n다음 순서로 설명해주세요:\n1. XGBoost 특징\n2. 정규화 파라미터 (lambda, alpha)\n3. early_stopping_rounds\n4. xgboost 사용법\n5. 연습문제 3개' },
        { id: 26, question: 'LightGBM의 특징은?', answer: 'Leaf-wise 성장 방식으로 빠른 학습 속도', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: LightGBM의 특징은?\n\n다음 순서로 설명해주세요:\n1. Leaf-wise vs Level-wise\n2. GOSS, EFB 기법\n3. num_leaves 파라미터\n4. lightgbm 사용법\n5. 연습문제 3개' },
        { id: 27, question: 'CatBoost의 특징은?', answer: '범주형 변수 자동 처리, 순서형 부스팅으로 과적합 방지', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: CatBoost의 특징은?\n\n다음 순서로 설명해주세요:\n1. Categorical Boosting\n2. Ordered Boosting\n3. cat_features 파라미터\n4. catboost 사용법\n5. 연습문제 3개' },
        { id: 28, question: '스태킹(Stacking)의 원리는?', answer: '여러 모델의 예측값을 입력으로 메타 모델 학습', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 스태킹의 원리는?\n\n다음 순서로 설명해주세요:\n1. 스태킹 개념\n2. 1단계 모델 vs 메타 모델\n3. 과적합 방지 (CV)\n4. sklearn StackingClassifier\n5. 연습문제 3개' },
        { id: 29, question: '보팅(Voting)의 종류는?', answer: '하드 보팅(다수결), 소프트 보팅(확률 평균)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 보팅의 종류는?\n\n다음 순서로 설명해주세요:\n1. 하드 보팅 개념\n2. 소프트 보팅 개념\n3. voting 파라미터\n4. sklearn VotingClassifier\n5. 연습문제 3개' },
        { id: 30, question: '앙상블에서 모델 다양성이 중요한 이유는?', answer: '다양한 모델이 서로 다른 오차를 만들어 상쇄 효과', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 모델 다양성이 중요한 이유는?\n\n다음 순서로 설명해주세요:\n1. 다양성과 앙상블 효과\n2. 상관관계 낮은 모델 조합\n3. 다양성 확보 방법\n4. 실험 예시\n5. 연습문제 3개' },
      ]
    },
    {
      name: '군집분석',
      questions: [
        { id: 31, question: 'K-means 알고리즘의 동작 원리는?', answer: '1) 중심점 초기화 2) 점 할당 3) 중심점 업데이트 반복', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: K-means 알고리즘의 원리는?\n\n다음 순서로 설명해주세요:\n1. K-means 단계별 설명\n2. 초기화 방법 (k-means++)\n3. inertia (관성)\n4. sklearn KMeans\n5. 연습문제 3개' },
        { id: 32, question: '최적의 K(군집 수)를 결정하는 방법은?', answer: '엘보우 방법, 실루엣 점수', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 최적의 K를 결정하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 엘보우 방법\n2. 실루엣 점수\n3. 갭 통계량\n4. Python 구현\n5. 연습문제 3개' },
        { id: 33, question: '실루엣 점수(Silhouette Score)의 범위와 해석은?', answer: '-1 ~ 1, 1에 가까울수록 잘 군집화', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 실루엣 점수의 해석은?\n\n다음 순서로 설명해주세요:\n1. 실루엣 점수 공식\n2. a(i), b(i) 개념\n3. 해석 기준\n4. sklearn silhouette_score\n5. 연습문제 3개' },
        { id: 34, question: '계층적 군집화의 종류는?', answer: '병합적(Agglomerative), 분할적(Divisive)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 계층적 군집화의 종류는?\n\n다음 순서로 설명해주세요:\n1. 병합적 방법\n2. 분할적 방법\n3. 덴드로그램\n4. sklearn AgglomerativeClustering\n5. 연습문제 3개' },
        { id: 35, question: '연결 기준(Linkage)의 종류와 특징은?', answer: 'Single(최소), Complete(최대), Average(평균), Ward(분산 최소화)', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 연결 기준의 종류는?\n\n다음 순서로 설명해주세요:\n1. Single Linkage\n2. Complete Linkage\n3. Average Linkage\n4. Ward Linkage\n5. 연습문제 3개' },
        { id: 36, question: 'DBSCAN의 특징은?', answer: '밀도 기반 군집화, 이상치 탐지 가능, K 지정 불필요', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: DBSCAN의 특징은?\n\n다음 순서로 설명해주세요:\n1. DBSCAN 원리\n2. eps, min_samples 파라미터\n3. 핵심점, 경계점, 노이즈점\n4. sklearn DBSCAN\n5. 연습문제 3개' },
        { id: 37, question: '가우시안 혼합 모델(GMM)의 특징은?', answer: '확률적 군집화, 소프트 할당 가능', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: GMM의 특징은?\n\n다음 순서로 설명해주세요:\n1. GMM 개념\n2. EM 알고리즘\n3. 소프트 클러스터링\n4. sklearn GaussianMixture\n5. 연습문제 3개' },
        { id: 38, question: 'K-means의 한계점은?', answer: '구형 군집만 탐지, 이상치에 민감, K 사전 지정 필요', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: K-means의 한계점은?\n\n다음 순서로 설명해주세요:\n1. 구형 군집 가정\n2. 이상치 민감성\n3. 초기화 의존성\n4. 대안 알고리즘\n5. 연습문제 3개' },
        { id: 39, question: 'Mean Shift 알고리즘의 특징은?', answer: '밀도의 최대점(모드)을 찾아 군집 중심 이동', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: Mean Shift의 특징은?\n\n다음 순서로 설명해주세요:\n1. Mean Shift 원리\n2. bandwidth 파라미터\n3. K 자동 결정\n4. sklearn MeanShift\n5. 연습문제 3개' },
        { id: 40, question: '군집 결과 시각화 방법은?', answer: 'PCA/t-SNE로 2D 투영 후 산점도', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 군집 결과 시각화 방법은?\n\n다음 순서로 설명해주세요:\n1. 차원 축소 필요성\n2. PCA 적용\n3. t-SNE 적용\n4. matplotlib 시각화\n5. 연습문제 3개' },
      ]
    },
    {
      name: '모델 학습 및 튜닝',
      questions: [
        { id: 41, question: '교차검증(Cross Validation)의 목적은?', answer: '모델의 일반화 성능을 안정적으로 평가', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 교차검증의 목적은?\n\n다음 순서로 설명해주세요:\n1. 교차검증 개념\n2. K-Fold CV\n3. Stratified K-Fold\n4. sklearn cross_val_score\n5. 연습문제 3개' },
        { id: 42, question: '과적합(Overfitting)의 징후는?', answer: '훈련 성능은 높지만 검증 성능은 낮음', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 과적합의 징후는?\n\n다음 순서로 설명해주세요:\n1. 과적합 정의\n2. 학습 곡선 분석\n3. 과적합 방지 방법\n4. 정규화 기법\n5. 연습문제 3개' },
        { id: 43, question: '그리드 서치(Grid Search)의 단점은?', answer: '하이퍼파라미터 조합이 많으면 시간이 오래 걸림', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 그리드 서치의 단점은?\n\n다음 순서로 설명해주세요:\n1. Grid Search 원리\n2. 탐색 공간 지수적 증가\n3. sklearn GridSearchCV\n4. best_params_ 확인\n5. 연습문제 3개' },
        { id: 44, question: '랜덤 서치(Random Search)의 장점은?', answer: '적은 반복으로도 좋은 파라미터를 찾을 확률이 높음', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 랜덤 서치의 장점은?\n\n다음 순서로 설명해주세요:\n1. Random Search 원리\n2. Grid Search와 비교\n3. n_iter 파라미터\n4. sklearn RandomizedSearchCV\n5. 연습문제 3개' },
        { id: 45, question: '학습률(Learning Rate)이 너무 클 때 문제는?', answer: '최적점을 지나쳐서 발산할 수 있음', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 학습률이 너무 클 때 문제는?\n\n다음 순서로 설명해주세요:\n1. 학습률의 역할\n2. 너무 큰 경우 vs 너무 작은 경우\n3. 학습률 스케줄링\n4. 실험 방법\n5. 연습문제 3개' },
        { id: 46, question: '조기 종료(Early Stopping)의 목적은?', answer: '검증 성능이 더 이상 향상되지 않으면 학습 중단하여 과적합 방지', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 조기 종료의 목적은?\n\n다음 순서로 설명해주세요:\n1. Early Stopping 개념\n2. patience/rounds 파라미터\n3. 모니터링 지표\n4. 구현 방법\n5. 연습문제 3개' },
        { id: 47, question: '편향-분산 트레이드오프란?', answer: '모델 복잡도 증가 시 편향 감소, 분산 증가', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 편향-분산 트레이드오프란?\n\n다음 순서로 설명해주세요:\n1. 편향(Bias)의 정의\n2. 분산(Variance)의 정의\n3. 총 오차 분해\n4. 최적 모델 복잡도\n5. 연습문제 3개' },
        { id: 48, question: 'train_test_split에서 stratify 파라미터의 역할은?', answer: '클래스 비율을 유지하면서 분할', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: stratify 파라미터의 역할은?\n\n다음 순서로 설명해주세요:\n1. 계층 샘플링 개념\n2. 불균형 데이터에서 중요성\n3. stratify=y 사용법\n4. sklearn 코드\n5. 연습문제 3개' },
        { id: 49, question: 'n_estimators 파라미터의 의미는?', answer: '앙상블에서 사용할 기본 모델(트리)의 개수', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: n_estimators의 의미는?\n\n다음 순서로 설명해주세요:\n1. n_estimators 정의\n2. 값이 클수록 성능 향상?\n3. 과적합과 관계\n4. 최적값 찾기\n5. 연습문제 3개' },
        { id: 50, question: '하이퍼파라미터 vs 파라미터의 차이는?', answer: '하이퍼파라미터: 사용자 지정, 파라미터: 학습으로 결정', prompt: '빅데이터분석기사 빅데이터 모델링 문제입니다.\n\n문제: 하이퍼파라미터와 파라미터의 차이는?\n\n다음 순서로 설명해주세요:\n1. 파라미터 정의 (weights, bias)\n2. 하이퍼파라미터 정의\n3. 하이퍼파라미터 예시\n4. 튜닝 방법\n5. 연습문제 3개' },
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
            <span className="text-indigo-600 font-medium">빅데이터 모델링</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🤖</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터 모델링</h1>
              <p className="text-indigo-100">3과목 | {totalQuestions}문항 | 가장 어려움!</p>
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
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">{topicIndex + 1}</span>
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
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">{q.id}</span>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{q.question}</p>
                          <p className="text-sm text-indigo-600 bg-indigo-50 p-2 rounded">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition flex-shrink-0">🤖 AI</button>
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
