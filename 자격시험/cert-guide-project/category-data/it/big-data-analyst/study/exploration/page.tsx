'use client';

import { useState } from 'react';

export default function ExplorationStudyPage() {
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
      name: '데이터 전처리',
      questions: [
        { id: 1, question: 'pandas에서 결측치를 확인하는 함수는?', answer: 'df.isnull() 또는 df.isna()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: pandas에서 결측치를 확인하는 함수는?\n\n다음 순서로 설명해주세요:\n1. isnull()과 isna()의 차이\n2. 결측치 개수 확인 방법\n3. 결측치 처리 방법 (삭제, 대체)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 2, question: '결측치를 평균값으로 대체하는 pandas 코드는?', answer: 'df.fillna(df.mean())', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 결측치를 평균값으로 대체하는 pandas 코드는?\n\n다음 순서로 설명해주세요:\n1. fillna() 함수 사용법\n2. 평균, 중앙값, 최빈값 대체\n3. 그룹별 대체 방법\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 3, question: 'IQR 방법으로 이상치를 탐지할 때 이상치 기준은?', answer: 'Q1 - 1.5*IQR 미만 또는 Q3 + 1.5*IQR 초과', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: IQR 방법으로 이상치를 탐지할 때 이상치 기준은?\n\n다음 순서로 설명해주세요:\n1. IQR의 정의\n2. 이상치 탐지 공식\n3. 박스플롯과의 관계\n4. Python 코드 구현\n5. 연습문제 3개' },
        { id: 4, question: 'pandas에서 중복 행을 제거하는 함수는?', answer: 'df.drop_duplicates()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: pandas에서 중복 행을 제거하는 함수는?\n\n다음 순서로 설명해주세요:\n1. drop_duplicates() 사용법\n2. subset 파라미터 활용\n3. keep 파라미터 (first, last, False)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 5, question: '데이터 타입을 변환하는 pandas 함수는?', answer: 'df.astype()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 데이터 타입을 변환하는 pandas 함수는?\n\n다음 순서로 설명해주세요:\n1. astype() 사용법\n2. 주요 데이터 타입 (int, float, str, category)\n3. 날짜 타입 변환 (to_datetime)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 6, question: 'One-Hot Encoding의 목적과 pandas 함수는?', answer: '범주형 변수를 이진 변수로 변환, pd.get_dummies()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: One-Hot Encoding의 목적과 pandas 함수는?\n\n다음 순서로 설명해주세요:\n1. One-Hot Encoding 정의\n2. get_dummies() 사용법\n3. Label Encoding과 비교\n4. 언제 어떤 인코딩을 사용하는지\n5. 연습문제 3개' },
        { id: 7, question: 'Min-Max 정규화의 공식은?', answer: '(x - min) / (max - min)', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: Min-Max 정규화의 공식은?\n\n다음 순서로 설명해주세요:\n1. 정규화의 목적\n2. Min-Max 정규화 공식\n3. sklearn MinMaxScaler 사용법\n4. 표준화(Z-score)와 비교\n5. 연습문제 3개' },
        { id: 8, question: 'Z-score 표준화의 공식은?', answer: '(x - mean) / std', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: Z-score 표준화의 공식은?\n\n다음 순서로 설명해주세요:\n1. 표준화의 목적\n2. Z-score 공식\n3. sklearn StandardScaler 사용법\n4. 정규화 vs 표준화 선택 기준\n5. 연습문제 3개' },
        { id: 9, question: 'pandas에서 문자열 컬럼의 공백을 제거하는 방법은?', answer: "df['col'].str.strip()", prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: pandas에서 문자열 공백을 제거하는 방법은?\n\n다음 순서로 설명해주세요:\n1. str 접근자 개념\n2. strip(), lstrip(), rstrip()\n3. replace()로 특정 문자 제거\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 10, question: 'pandas에서 날짜에서 연도만 추출하는 방법은?', answer: "df['date'].dt.year", prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: pandas에서 날짜에서 연도만 추출하는 방법은?\n\n다음 순서로 설명해주세요:\n1. dt 접근자 개념\n2. year, month, day, dayofweek\n3. to_datetime() 변환\n4. 코드 예시\n5. 연습문제 3개' },
      ]
    },
    {
      name: '탐색적 데이터 분석(EDA)',
      questions: [
        { id: 11, question: 'pandas에서 데이터프레임의 기본 정보를 확인하는 함수는?', answer: 'df.info()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 데이터프레임의 기본 정보를 확인하는 함수는?\n\n다음 순서로 설명해주세요:\n1. info() 함수의 출력 내용\n2. shape, dtypes, columns\n3. head(), tail()\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 12, question: 'pandas에서 기술통계량을 확인하는 함수는?', answer: 'df.describe()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 기술통계량을 확인하는 함수는?\n\n다음 순서로 설명해주세요:\n1. describe() 출력 항목\n2. include 파라미터 활용\n3. 개별 통계 함수 (mean, std, min, max)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 13, question: '히스토그램이 보여주는 정보는?', answer: '데이터의 분포와 빈도', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 히스토그램이 보여주는 정보는?\n\n다음 순서로 설명해주세요:\n1. 히스토그램의 정의\n2. matplotlib/seaborn으로 그리기\n3. bins 설정 방법\n4. 분포 해석 (정규, 편향 등)\n5. 연습문제 3개' },
        { id: 14, question: '박스플롯에서 박스의 상단과 하단이 의미하는 것은?', answer: '상단: Q3(75%), 하단: Q1(25%)', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 박스플롯의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 박스플롯 구성 요소\n2. Q1, Q2(중앙값), Q3\n3. 수염과 이상치\n4. seaborn으로 그리기\n5. 연습문제 3개' },
        { id: 15, question: '산점도(Scatter Plot)가 보여주는 정보는?', answer: '두 변수 간의 관계와 상관성', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 산점도가 보여주는 정보는?\n\n다음 순서로 설명해주세요:\n1. 산점도의 정의와 목적\n2. 양의 상관, 음의 상관, 무상관\n3. matplotlib/seaborn으로 그리기\n4. hue로 그룹 구분\n5. 연습문제 3개' },
        { id: 16, question: 'pandas에서 그룹별 집계를 수행하는 함수는?', answer: 'df.groupby()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 그룹별 집계를 수행하는 함수는?\n\n다음 순서로 설명해주세요:\n1. groupby() 기본 사용법\n2. 집계 함수 (mean, sum, count, agg)\n3. 다중 컬럼 그룹화\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 17, question: 'pandas에서 피벗 테이블을 생성하는 함수는?', answer: 'pd.pivot_table()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 피벗 테이블을 생성하는 함수는?\n\n다음 순서로 설명해주세요:\n1. pivot_table() 사용법\n2. index, columns, values, aggfunc\n3. 다중 집계 함수 적용\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 18, question: 'seaborn에서 상관관계 히트맵을 그리는 함수는?', answer: 'sns.heatmap(df.corr())', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 상관관계 히트맵을 그리는 방법은?\n\n다음 순서로 설명해주세요:\n1. 상관계수 행렬 생성 (corr())\n2. heatmap() 사용법\n3. annot, cmap 파라미터\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 19, question: 'pandas에서 조건에 맞는 행을 필터링하는 방법은?', answer: "df[df['col'] > 값] 또는 df.query()", prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 조건에 맞는 행을 필터링하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 불리언 인덱싱\n2. 다중 조건 (& |)\n3. query() 함수\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 20, question: 'pandas에서 데이터프레임을 병합하는 함수는?', answer: 'pd.merge() 또는 pd.concat()', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 데이터프레임을 병합하는 방법은?\n\n다음 순서로 설명해주세요:\n1. merge()와 concat() 차이\n2. merge의 how 파라미터 (inner, outer, left, right)\n3. on 파라미터\n4. 코드 예시\n5. 연습문제 3개' },
      ]
    },
    {
      name: '기초 통계분석',
      questions: [
        { id: 21, question: '평균, 중앙값, 최빈값의 관계에서 오른쪽으로 치우친 분포의 특징은?', answer: '최빈값 < 중앙값 < 평균', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 오른쪽으로 치우친 분포의 특징은?\n\n다음 순서로 설명해주세요:\n1. 왜도(Skewness)의 정의\n2. 양의 왜도(오른쪽 치우침)\n3. 음의 왜도(왼쪽 치우침)\n4. Python으로 왜도 계산\n5. 연습문제 3개' },
        { id: 22, question: '분산(Variance)과 표준편차(Standard Deviation)의 관계는?', answer: '표준편차 = √분산', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 분산과 표준편차의 관계는?\n\n다음 순서로 설명해주세요:\n1. 분산의 정의와 공식\n2. 표준편차의 정의\n3. 모분산 vs 표본분산\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 23, question: '피어슨 상관계수의 범위와 해석은?', answer: '-1 ~ +1, 1에 가까울수록 강한 양의 상관', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 피어슨 상관계수의 범위와 해석은?\n\n다음 순서로 설명해주세요:\n1. 상관계수의 정의\n2. 상관계수 해석 기준\n3. 상관 vs 인과 관계\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 24, question: '정규분포에서 평균±1표준편차 범위에 포함되는 데이터 비율은?', answer: '약 68%', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 정규분포의 68-95-99.7 법칙은?\n\n다음 순서로 설명해주세요:\n1. 정규분포의 특성\n2. 68-95-99.7 법칙\n3. Z-score와 확률\n4. Python에서 정규분포\n5. 연습문제 3개' },
        { id: 25, question: '중심극한정리(Central Limit Theorem)의 의미는?', answer: '표본 크기가 충분히 크면 표본평균의 분포가 정규분포에 근사', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 중심극한정리의 의미는?\n\n다음 순서로 설명해주세요:\n1. 중심극한정리 정의\n2. 표본 크기 조건 (n≥30)\n3. 통계적 추론에서의 중요성\n4. 시뮬레이션 예시\n5. 연습문제 3개' },
        { id: 26, question: '공분산(Covariance)의 한계점은?', answer: '단위에 의존하여 크기 비교가 어려움', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 공분산의 한계점은?\n\n다음 순서로 설명해주세요:\n1. 공분산의 정의\n2. 공분산의 한계\n3. 상관계수로 해결\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 27, question: '첨도(Kurtosis)가 3보다 큰 분포의 특징은?', answer: '정규분포보다 뾰족하고 꼬리가 두꺼움', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 첨도의 의미와 해석은?\n\n다음 순서로 설명해주세요:\n1. 첨도의 정의\n2. 정규분포 첨도 (3)\n3. 뾰족한 분포 vs 평평한 분포\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 28, question: '변동계수(CV, Coefficient of Variation)의 공식은?', answer: '(표준편차 / 평균) × 100%', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 변동계수의 공식과 용도는?\n\n다음 순서로 설명해주세요:\n1. 변동계수의 정의\n2. 사용 목적 (단위가 다른 데이터 비교)\n3. 해석 방법\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 29, question: '사분위수(Quartile)에서 Q2가 의미하는 것은?', answer: '중앙값 (50번째 백분위수)', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 사분위수의 종류와 의미는?\n\n다음 순서로 설명해주세요:\n1. Q1, Q2, Q3의 정의\n2. 백분위수와 관계\n3. IQR 계산\n4. Python으로 계산\n5. 연습문제 3개' },
        { id: 30, question: '표본오차(Sampling Error)를 줄이는 방법은?', answer: '표본 크기를 늘림', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 표본오차를 줄이는 방법은?\n\n다음 순서로 설명해주세요:\n1. 표본오차의 정의\n2. 표본오차 공식\n3. 표본 크기와의 관계\n4. 신뢰구간 계산\n5. 연습문제 3개' },
      ]
    },
    {
      name: '데이터 변환',
      questions: [
        { id: 31, question: '로그 변환의 목적은?', answer: '오른쪽으로 치우친 분포를 정규분포에 가깝게 변환', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 로그 변환의 목적은?\n\n다음 순서로 설명해주세요:\n1. 로그 변환의 정의\n2. 왜도 감소 효과\n3. np.log(), np.log1p()\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 32, question: 'Box-Cox 변환의 특징은?', answer: '최적의 람다(λ)를 찾아 정규분포로 변환', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: Box-Cox 변환의 특징은?\n\n다음 순서로 설명해주세요:\n1. Box-Cox 변환 정의\n2. 람다 파라미터\n3. scipy.stats.boxcox()\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 33, question: '이산화(Discretization)의 목적은?', answer: '연속형 변수를 범주형으로 변환', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 이산화의 목적은?\n\n다음 순서로 설명해주세요:\n1. 이산화의 정의\n2. pd.cut()과 pd.qcut()\n3. 구간 설정 방법\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 34, question: '피처 스케일링이 필요한 알고리즘은?', answer: 'KNN, SVM, 경사하강법 기반 알고리즘', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 피처 스케일링이 필요한 알고리즘은?\n\n다음 순서로 설명해주세요:\n1. 스케일링의 필요성\n2. 거리 기반 알고리즘\n3. 트리 기반은 불필요\n4. 스케일링 적용 시점\n5. 연습문제 3개' },
        { id: 35, question: 'Robust Scaler의 특징은?', answer: '중앙값과 IQR을 사용하여 이상치에 강건함', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: Robust Scaler의 특징은?\n\n다음 순서로 설명해주세요:\n1. RobustScaler 정의\n2. 공식: (x - median) / IQR\n3. 이상치가 많을 때 유용\n4. sklearn 사용법\n5. 연습문제 3개' },
        { id: 36, question: '다항식 피처(Polynomial Features)의 목적은?', answer: '비선형 관계를 선형 모델로 학습 가능하게 함', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 다항식 피처의 목적은?\n\n다음 순서로 설명해주세요:\n1. 다항식 피처 정의\n2. degree 파라미터\n3. interaction_only\n4. sklearn PolynomialFeatures\n5. 연습문제 3개' },
        { id: 37, question: 'Target Encoding의 장단점은?', answer: '장점: 고차원 범주 처리, 단점: 과적합 위험', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: Target Encoding의 장단점은?\n\n다음 순서로 설명해주세요:\n1. Target Encoding 정의\n2. 구현 방법\n3. Data Leakage 주의\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 38, question: '날짜 데이터에서 추출할 수 있는 피처는?', answer: '연, 월, 일, 요일, 분기, 공휴일 여부 등', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 날짜 데이터에서 추출할 수 있는 피처는?\n\n다음 순서로 설명해주세요:\n1. datetime 피처 엔지니어링\n2. pandas dt 접근자\n3. 주기성 피처 (사인, 코사인)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 39, question: 'pandas apply() 함수의 용도는?', answer: '사용자 정의 함수를 행/열에 적용', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: pandas apply() 함수의 용도는?\n\n다음 순서로 설명해주세요:\n1. apply() 기본 사용법\n2. lambda 함수 활용\n3. axis 파라미터 (0: 열, 1: 행)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 40, question: 'pandas melt() 함수의 용도는?', answer: 'Wide 형식을 Long 형식으로 변환', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: melt() 함수의 용도는?\n\n다음 순서로 설명해주세요:\n1. Wide vs Long 형식\n2. melt() 사용법\n3. id_vars, value_vars\n4. 코드 예시\n5. 연습문제 3개' },
      ]
    },
    {
      name: '차원 축소',
      questions: [
        { id: 41, question: 'PCA(주성분분석)의 목적은?', answer: '고차원 데이터를 저차원으로 변환하면서 분산 최대화', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: PCA의 목적은?\n\n다음 순서로 설명해주세요:\n1. PCA의 정의\n2. 주성분의 의미\n3. 분산 설명 비율\n4. sklearn PCA 사용법\n5. 연습문제 3개' },
        { id: 42, question: 'PCA 적용 전 반드시 해야 하는 전처리는?', answer: '표준화 (StandardScaler)', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: PCA 전 표준화가 필요한 이유는?\n\n다음 순서로 설명해주세요:\n1. 스케일 차이의 문제\n2. 공분산 행렬에 미치는 영향\n3. 표준화 코드\n4. 전체 파이프라인\n5. 연습문제 3개' },
        { id: 43, question: 'LDA(Linear Discriminant Analysis)와 PCA의 차이는?', answer: 'LDA는 클래스 분리 최대화 (지도학습), PCA는 분산 최대화 (비지도)', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: LDA와 PCA의 차이는?\n\n다음 순서로 설명해주세요:\n1. LDA의 정의\n2. PCA와 목적 차이\n3. 클래스 간/내 분산\n4. sklearn LDA 사용법\n5. 연습문제 3개' },
        { id: 44, question: 't-SNE의 특징과 용도는?', answer: '비선형 차원 축소, 고차원 데이터 시각화에 적합', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: t-SNE의 특징과 용도는?\n\n다음 순서로 설명해주세요:\n1. t-SNE의 정의\n2. perplexity 파라미터\n3. PCA와 비교\n4. sklearn TSNE 사용법\n5. 연습문제 3개' },
        { id: 45, question: '특이값 분해(SVD)와 PCA의 관계는?', answer: 'PCA는 공분산 행렬의 고유값 분해, SVD는 데이터 행렬 직접 분해', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: SVD와 PCA의 관계는?\n\n다음 순서로 설명해주세요:\n1. SVD의 정의\n2. U, Σ, V 행렬\n3. Truncated SVD\n4. sklearn TruncatedSVD\n5. 연습문제 3개' },
        { id: 46, question: '피처 선택(Feature Selection)과 피처 추출(Feature Extraction)의 차이는?', answer: '선택: 기존 피처 중 선택, 추출: 새로운 피처 생성', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 피처 선택과 추출의 차이는?\n\n다음 순서로 설명해주세요:\n1. 피처 선택 방법 (Filter, Wrapper, Embedded)\n2. 피처 추출 방법 (PCA, LDA)\n3. 각 방법의 장단점\n4. 사용 시나리오\n5. 연습문제 3개' },
        { id: 47, question: '상관계수 기반 피처 선택의 기준은?', answer: '타겟과 상관이 높고, 피처 간 상관이 낮은 것 선택', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 상관계수 기반 피처 선택 기준은?\n\n다음 순서로 설명해주세요:\n1. Filter 방법 개념\n2. 다중공선성 문제\n3. VIF (분산팽창요인)\n4. 코드 예시\n5. 연습문제 3개' },
        { id: 48, question: '정보 이득(Information Gain)의 의미는?', answer: '피처 추가로 인한 엔트로피 감소량', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 정보 이득의 의미는?\n\n다음 순서로 설명해주세요:\n1. 엔트로피의 정의\n2. 정보 이득 공식\n3. 의사결정나무에서의 활용\n4. sklearn 활용법\n5. 연습문제 3개' },
        { id: 49, question: 'UMAP의 특징은?', answer: 't-SNE보다 빠르고 전역 구조 보존이 좋음', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: UMAP의 특징은?\n\n다음 순서로 설명해주세요:\n1. UMAP의 정의\n2. t-SNE와 비교\n3. n_neighbors, min_dist 파라미터\n4. umap-learn 사용법\n5. 연습문제 3개' },
        { id: 50, question: '주성분 개수를 결정하는 방법은?', answer: '누적 설명 분산이 95% 이상이 되는 개수 선택', prompt: '빅데이터분석기사 빅데이터 탐색 문제입니다.\n\n문제: 주성분 개수를 결정하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 설명 분산 비율\n2. 스크리 플롯\n3. 누적 설명 분산 95%\n4. 코드 예시\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <span className="text-blue-600 font-medium">빅데이터 탐색</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🔍</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터 탐색</h1>
              <p className="text-blue-100">2과목 | {totalQuestions}문항 | pandas + 통계</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {topicIndex + 1}
                  </span>
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openTopics.includes(topicIndex) && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {q.id}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{q.question}</p>
                          <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition flex-shrink-0"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI 선택 모달 */}
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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
