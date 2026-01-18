'use client';

import { useState } from 'react';

export default function PracticalStudyPage() {
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
      name: '작업형 1유형 - 데이터 전처리',
      questions: [
        { id: 1, question: 'DataFrame에서 특정 컬럼의 결측치 개수를 구하는 코드는?', answer: "df['col'].isnull().sum()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 결측치 개수 구하는 코드는?\n\n다음 순서로 설명해주세요:\n1. isnull() 함수\n2. sum()과 조합\n3. 전체 결측치 확인\n4. 다른 방법\n5. 연습문제 3개' },
        { id: 2, question: 'Age 컬럼의 결측치를 중앙값으로 대체하는 코드는?', answer: "df['Age'].fillna(df['Age'].median(), inplace=True)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 결측치를 중앙값으로 대체하는 코드는?\n\n다음 순서로 설명해주세요:\n1. fillna() 사용법\n2. median() 함수\n3. inplace 파라미터\n4. 평균, 최빈값 대체\n5. 연습문제 3개' },
        { id: 3, question: '데이터프레임에서 중복 행을 제거하는 코드는?', answer: 'df.drop_duplicates(inplace=True)', prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 중복 행 제거 코드는?\n\n다음 순서로 설명해주세요:\n1. drop_duplicates() 사용법\n2. subset 파라미터\n3. keep 파라미터\n4. 중복 확인 방법\n5. 연습문제 3개' },
        { id: 4, question: 'Salary 컬럼에서 상위 10% 값을 구하는 코드는?', answer: "df['Salary'].quantile(0.9)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 상위 10% 값 구하는 코드는?\n\n다음 순서로 설명해주세요:\n1. quantile() 함수\n2. 백분위수 개념\n3. 상위 vs 하위\n4. 여러 분위수 한번에\n5. 연습문제 3개' },
        { id: 5, question: 'Age 컬럼에서 IQR 기준 이상치의 개수를 구하는 코드는?', answer: "Q1 = df['Age'].quantile(0.25); Q3 = df['Age'].quantile(0.75); IQR = Q3 - Q1; ((df['Age'] < Q1-1.5*IQR) | (df['Age'] > Q3+1.5*IQR)).sum()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: IQR 기준 이상치 개수 코드는?\n\n다음 순서로 설명해주세요:\n1. IQR 계산\n2. 이상치 기준\n3. 불리언 인덱싱\n4. 이상치 제거\n5. 연습문제 3개' },
        { id: 6, question: 'Gender 컬럼을 One-Hot Encoding하는 코드는?', answer: "pd.get_dummies(df['Gender'])", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: One-Hot Encoding 코드는?\n\n다음 순서로 설명해주세요:\n1. get_dummies() 사용법\n2. 원본에 추가하기\n3. drop_first 옵션\n4. Label Encoding과 비교\n5. 연습문제 3개' },
        { id: 7, question: 'Date 컬럼에서 연도만 추출하여 새 컬럼으로 만드는 코드는?', answer: "df['Year'] = pd.to_datetime(df['Date']).dt.year", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 날짜에서 연도 추출 코드는?\n\n다음 순서로 설명해주세요:\n1. to_datetime() 변환\n2. dt 접근자\n3. year, month, day\n4. 요일 추출\n5. 연습문제 3개' },
        { id: 8, question: 'Salary 컬럼을 Min-Max 정규화하는 코드는?', answer: "(df['Salary'] - df['Salary'].min()) / (df['Salary'].max() - df['Salary'].min())", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: Min-Max 정규화 코드는?\n\n다음 순서로 설명해주세요:\n1. 정규화 공식\n2. sklearn MinMaxScaler\n3. 역변환\n4. 표준화와 비교\n5. 연습문제 3개' },
      ]
    },
    {
      name: '작업형 1유형 - 데이터 필터링/집계',
      questions: [
        { id: 9, question: 'Age가 30 이상이고 Gender가 Male인 행의 수를 구하는 코드는?', answer: "len(df[(df['Age'] >= 30) & (df['Gender'] == 'Male')])", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 다중 조건 필터링 코드는?\n\n다음 순서로 설명해주세요:\n1. 불리언 인덱싱\n2. & (AND) 연산\n3. | (OR) 연산\n4. query() 방법\n5. 연습문제 3개' },
        { id: 10, question: 'Department별 평균 Salary를 구하는 코드는?', answer: "df.groupby('Department')['Salary'].mean()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 그룹별 평균 구하는 코드는?\n\n다음 순서로 설명해주세요:\n1. groupby() 사용법\n2. 집계 함수 (mean, sum, count)\n3. 여러 집계 동시에 (agg)\n4. 다중 컬럼 그룹화\n5. 연습문제 3개' },
        { id: 11, question: 'Salary가 가장 높은 상위 5명의 데이터를 추출하는 코드는?', answer: "df.nlargest(5, 'Salary')", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 상위 N개 추출 코드는?\n\n다음 순서로 설명해주세요:\n1. nlargest() 사용법\n2. nsmallest()\n3. sort_values()로 대체\n4. 여러 컬럼 기준\n5. 연습문제 3개' },
        { id: 12, question: 'Name 컬럼에서 "Kim"을 포함하는 행의 수를 구하는 코드는?', answer: "df['Name'].str.contains('Kim').sum()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 문자열 포함 확인 코드는?\n\n다음 순서로 설명해주세요:\n1. str.contains() 사용법\n2. 대소문자 무시 (case=False)\n3. 정규표현식\n4. na 파라미터\n5. 연습문제 3개' },
        { id: 13, question: 'Department별 Salary의 합계를 내림차순으로 정렬하는 코드는?', answer: "df.groupby('Department')['Salary'].sum().sort_values(ascending=False)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 그룹별 합계 정렬 코드는?\n\n다음 순서로 설명해주세요:\n1. groupby + sum\n2. sort_values()\n3. ascending 파라미터\n4. 인덱스 리셋\n5. 연습문제 3개' },
        { id: 14, question: 'Age를 10단위 구간으로 나누어 각 구간의 빈도를 구하는 코드는?', answer: "pd.cut(df['Age'], bins=[0,20,30,40,50,60]).value_counts()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 구간별 빈도 구하는 코드는?\n\n다음 순서로 설명해주세요:\n1. pd.cut() 사용법\n2. bins 파라미터\n3. labels 파라미터\n4. qcut()과 비교\n5. 연습문제 3개' },
        { id: 15, question: '두 데이터프레임을 공통 컬럼 ID로 내부 조인하는 코드는?', answer: "pd.merge(df1, df2, on='ID', how='inner')", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 데이터프레임 조인 코드는?\n\n다음 순서로 설명해주세요:\n1. merge() 사용법\n2. how 파라미터 (inner, outer, left, right)\n3. on vs left_on, right_on\n4. concat()과 차이\n5. 연습문제 3개' },
        { id: 16, question: 'Salary 컬럼의 z-score가 3 이상인 행의 개수를 구하는 코드는?', answer: "z = (df['Salary'] - df['Salary'].mean()) / df['Salary'].std(); (z.abs() >= 3).sum()", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: z-score 기반 이상치 개수 코드는?\n\n다음 순서로 설명해주세요:\n1. z-score 공식\n2. abs()로 절대값\n3. 이상치 기준\n4. scipy.stats.zscore\n5. 연습문제 3개' },
      ]
    },
    {
      name: '작업형 2유형 - 분류 모델링',
      questions: [
        { id: 17, question: 'train_test_split으로 데이터를 8:2로 분할하는 코드는?', answer: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 데이터 분할 코드는?\n\n다음 순서로 설명해주세요:\n1. train_test_split 사용법\n2. test_size 파라미터\n3. random_state 역할\n4. stratify 파라미터\n5. 연습문제 3개' },
        { id: 18, question: 'RandomForest 분류 모델을 학습하고 예측하는 코드는?', answer: "from sklearn.ensemble import RandomForestClassifier; model = RandomForestClassifier(); model.fit(X_train, y_train); pred = model.predict(X_test)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: RandomForest 분류 코드는?\n\n다음 순서로 설명해주세요:\n1. import 문\n2. 모델 생성\n3. fit()으로 학습\n4. predict()로 예측\n5. 연습문제 3개' },
        { id: 19, question: '분류 모델의 정확도를 계산하는 코드는?', answer: "from sklearn.metrics import accuracy_score; accuracy_score(y_test, pred)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 정확도 계산 코드는?\n\n다음 순서로 설명해주세요:\n1. accuracy_score 사용법\n2. confusion_matrix\n3. classification_report\n4. 다른 평가 지표\n5. 연습문제 3개' },
        { id: 20, question: '확률값으로 예측하는 코드는?', answer: "proba = model.predict_proba(X_test)[:, 1]", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 확률 예측 코드는?\n\n다음 순서로 설명해주세요:\n1. predict_proba() 출력 구조\n2. [:, 1]의 의미\n3. 임계값 조정\n4. ROC-AUC 계산\n5. 연습문제 3개' },
        { id: 21, question: 'XGBoost 분류 모델 학습 코드는?', answer: "from xgboost import XGBClassifier; model = XGBClassifier(n_estimators=100, learning_rate=0.1); model.fit(X_train, y_train)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: XGBoost 분류 코드는?\n\n다음 순서로 설명해주세요:\n1. XGBClassifier import\n2. 주요 파라미터\n3. 학습 및 예측\n4. 피처 중요도\n5. 연습문제 3개' },
        { id: 22, question: '제출 파일(submission.csv)을 생성하는 코드는?', answer: "submit = pd.DataFrame({'id': test['id'], 'target': pred}); submit.to_csv('submission.csv', index=False)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 제출 파일 생성 코드는?\n\n다음 순서로 설명해주세요:\n1. DataFrame 생성\n2. to_csv() 사용법\n3. index=False 중요성\n4. 제출 형식 확인\n5. 연습문제 3개' },
        { id: 23, question: 'LightGBM 모델로 학습하는 코드는?', answer: "from lightgbm import LGBMClassifier; model = LGBMClassifier(n_estimators=100); model.fit(X_train, y_train)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: LightGBM 분류 코드는?\n\n다음 순서로 설명해주세요:\n1. LGBMClassifier import\n2. 주요 파라미터\n3. XGBoost와 비교\n4. 범주형 변수 처리\n5. 연습문제 3개' },
        { id: 24, question: '교차검증으로 모델 성능을 평가하는 코드는?', answer: "from sklearn.model_selection import cross_val_score; scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 교차검증 코드는?\n\n다음 순서로 설명해주세요:\n1. cross_val_score 사용법\n2. cv 파라미터\n3. scoring 옵션\n4. StratifiedKFold\n5. 연습문제 3개' },
      ]
    },
    {
      name: '작업형 2유형 - 회귀 모델링',
      questions: [
        { id: 25, question: 'RandomForest 회귀 모델 학습 코드는?', answer: "from sklearn.ensemble import RandomForestRegressor; model = RandomForestRegressor(); model.fit(X_train, y_train)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: RandomForest 회귀 코드는?\n\n다음 순서로 설명해주세요:\n1. RandomForestRegressor import\n2. 분류와 차이\n3. 주요 파라미터\n4. 예측 및 평가\n5. 연습문제 3개' },
        { id: 26, question: 'RMSE를 계산하는 코드는?', answer: "from sklearn.metrics import mean_squared_error; import numpy as np; rmse = np.sqrt(mean_squared_error(y_test, pred))", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: RMSE 계산 코드는?\n\n다음 순서로 설명해주세요:\n1. MSE 계산\n2. sqrt로 RMSE\n3. sklearn 2.0 squared 파라미터\n4. MAE와 비교\n5. 연습문제 3개' },
        { id: 27, question: 'XGBoost 회귀 모델 학습 코드는?', answer: "from xgboost import XGBRegressor; model = XGBRegressor(); model.fit(X_train, y_train)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: XGBoost 회귀 코드는?\n\n다음 순서로 설명해주세요:\n1. XGBRegressor import\n2. 분류와 차이점\n3. objective 파라미터\n4. 조기 종료\n5. 연습문제 3개' },
        { id: 28, question: 'R² 점수를 계산하는 코드는?', answer: "from sklearn.metrics import r2_score; r2_score(y_test, pred)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: R² 점수 계산 코드는?\n\n다음 순서로 설명해주세요:\n1. r2_score 사용법\n2. 해석 방법\n3. 음수가 나오는 경우\n4. adjusted R²\n5. 연습문제 3개' },
        { id: 29, question: '피처 중요도를 확인하는 코드는?', answer: "importance = model.feature_importances_; pd.Series(importance, index=X.columns).sort_values(ascending=False)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 피처 중요도 확인 코드는?\n\n다음 순서로 설명해주세요:\n1. feature_importances_ 속성\n2. Series로 변환\n3. 정렬 및 시각화\n4. 중요 피처 선택\n5. 연습문제 3개' },
        { id: 30, question: 'GridSearchCV로 하이퍼파라미터 튜닝하는 코드는?', answer: "from sklearn.model_selection import GridSearchCV; params = {'n_estimators': [100, 200], 'max_depth': [3, 5]}; grid = GridSearchCV(model, params, cv=3); grid.fit(X_train, y_train)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: GridSearchCV 코드는?\n\n다음 순서로 설명해주세요:\n1. GridSearchCV 사용법\n2. param_grid 정의\n3. best_params_ 확인\n4. RandomizedSearchCV\n5. 연습문제 3개' },
      ]
    },
    {
      name: '작업형 3유형 - 통계분석',
      questions: [
        { id: 31, question: '두 그룹의 평균 차이를 검정하는 t-test 코드는?', answer: "from scipy.stats import ttest_ind; stat, pvalue = ttest_ind(group1, group2)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 독립 t-test 코드는?\n\n다음 순서로 설명해주세요:\n1. ttest_ind 사용법\n2. 귀무가설 설정\n3. p-value 해석\n4. 대응 t-test (ttest_rel)\n5. 연습문제 3개' },
        { id: 32, question: '카이제곱 검정 코드는?', answer: "from scipy.stats import chi2_contingency; stat, pvalue, dof, expected = chi2_contingency(contingency_table)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 카이제곱 검정 코드는?\n\n다음 순서로 설명해주세요:\n1. 교차표 생성 (pd.crosstab)\n2. chi2_contingency 사용법\n3. 반환값 해석\n4. 독립성 검정\n5. 연습문제 3개' },
        { id: 33, question: '일원분산분석(One-way ANOVA) 코드는?', answer: "from scipy.stats import f_oneway; stat, pvalue = f_oneway(group1, group2, group3)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: ANOVA 코드는?\n\n다음 순서로 설명해주세요:\n1. f_oneway 사용법\n2. 3그룹 이상 비교\n3. 사후검정 필요성\n4. F 통계량 해석\n5. 연습문제 3개' },
        { id: 34, question: '상관계수와 p-value를 함께 구하는 코드는?', answer: "from scipy.stats import pearsonr; corr, pvalue = pearsonr(x, y)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 상관분석 코드는?\n\n다음 순서로 설명해주세요:\n1. pearsonr 사용법\n2. spearmanr (순위 상관)\n3. p-value 해석\n4. df.corr()과 차이\n5. 연습문제 3개' },
        { id: 35, question: '정규성 검정(Shapiro-Wilk) 코드는?', answer: "from scipy.stats import shapiro; stat, pvalue = shapiro(data)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 정규성 검정 코드는?\n\n다음 순서로 설명해주세요:\n1. shapiro 사용법\n2. 귀무가설 (정규분포)\n3. p-value 해석\n4. normaltest, kstest\n5. 연습문제 3개' },
        { id: 36, question: '등분산성 검정(Levene) 코드는?', answer: "from scipy.stats import levene; stat, pvalue = levene(group1, group2)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 등분산 검정 코드는?\n\n다음 순서로 설명해주세요:\n1. levene 사용법\n2. 귀무가설 (등분산)\n3. Bartlett 검정\n4. Welch t-test\n5. 연습문제 3개' },
        { id: 37, question: '회귀분석에서 회귀계수와 p-value를 확인하는 코드는?', answer: "import statsmodels.api as sm; X = sm.add_constant(X); model = sm.OLS(y, X).fit(); print(model.summary())", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 회귀분석 결과 확인 코드는?\n\n다음 순서로 설명해주세요:\n1. statsmodels OLS\n2. add_constant 필요성\n3. summary() 해석\n4. coef_, pvalues\n5. 연습문제 3개' },
        { id: 38, question: '95% 신뢰구간을 계산하는 코드는?', answer: "import scipy.stats as stats; ci = stats.t.interval(0.95, len(data)-1, loc=data.mean(), scale=stats.sem(data))", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: 신뢰구간 계산 코드는?\n\n다음 순서로 설명해주세요:\n1. t.interval 사용법\n2. 자유도 (n-1)\n3. 표준오차 (sem)\n4. 정규분포 기반 신뢰구간\n5. 연습문제 3개' },
        { id: 39, question: 'Mann-Whitney U 검정 코드는?', answer: "from scipy.stats import mannwhitneyu; stat, pvalue = mannwhitneyu(group1, group2)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: Mann-Whitney U 검정 코드는?\n\n다음 순서로 설명해주세요:\n1. 비모수 검정 개념\n2. mannwhitneyu 사용법\n3. t-test와 차이\n4. 사용 조건\n5. 연습문제 3개' },
        { id: 40, question: 'Wilcoxon 부호순위 검정 코드는?', answer: "from scipy.stats import wilcoxon; stat, pvalue = wilcoxon(before, after)", prompt: '빅데이터분석기사 실기 코딩 문제입니다.\n\n문제: Wilcoxon 검정 코드는?\n\n다음 순서로 설명해주세요:\n1. 대응표본 비모수 검정\n2. wilcoxon 사용법\n3. paired t-test와 비교\n4. 사용 조건\n5. 연습문제 3개' },
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
            <span className="text-green-600 font-medium">실기 코딩 연습</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">💻</span>
            <div>
              <h1 className="text-2xl font-bold">실기 코딩 연습</h1>
              <p className="text-green-100">작업형 1,2,3유형 | {totalQuestions}문항 | Python 필수!</p>
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
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">{topicIndex + 1}</span>
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
                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">{q.id}</span>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{q.question}</p>
                          <p className="text-sm text-green-600 bg-green-50 p-2 rounded font-mono">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition flex-shrink-0">🤖 AI</button>
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
