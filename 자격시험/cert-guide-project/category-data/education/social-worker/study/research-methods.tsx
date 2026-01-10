'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'research-design',
    name: '조사설계',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '실험설계의 3요소(무작위화, 통제집단, 조작)를 설명하고, 내적 타당도 저해요인을 5가지 서술하시오.',
        answer: '무작위화, 통제집단, 독립변수 조작 / 역사, 성숙, 검사, 도구, 통계적 회귀',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 실험설계의 3요소(무작위화, 통제집단, 조작)를 설명하고, 내적 타당도 저해요인을 5가지 서술하시오.

다음 순서로 설명해주세요:
1. 무작위화(Randomization)의 중요성
2. 통제집단(Control Group)의 역할
3. 독립변수 조작(Manipulation)
4. 내적 타당도 저해요인: 역사, 성숙, 검사, 도구, 통계적 회귀
5. 외적 타당도와의 차이
6. 사회복지 실험연구 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '비실험설계(횡단조사, 종단조사)의 종류를 구분하고 각각의 장단점을 설명하시오.',
        answer: '횡단조사(한 시점), 종단조사(패널, 추세, 코호트)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 비실험설계(횡단조사, 종단조사)의 종류를 구분하고 각각의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 횡단조사(Cross-sectional Study): 한 시점, 신속, 인과관계 한계
2. 종단조사(Longitudinal Study)의 종류
3. 패널조사(Panel Study): 동일 표본 반복 조사
4. 추세조사(Trend Study): 모집단에서 반복 표집
5. 코호트조사(Cohort Study): 특정 집단 추적
6. 각 설계의 장단점과 사회복지 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '단일사례설계(Single-Subject Design)의 유형을 설명하시오.',
        answer: 'AB설계, ABA설계, ABAB설계, 복수기초선설계',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 단일사례설계(Single-Subject Design)의 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 단일사례설계의 개념과 특징
2. AB설계: 기초선(A) → 개입(B)
3. ABA설계: 철회설계(Withdrawal Design)
4. ABAB설계: 반전설계(Reversal Design)
5. 복수기초선설계(Multiple Baseline Design)
6. 사회복지 임상실천에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '유사실험설계의 종류와 한계를 설명하시오.',
        answer: '비동질 통제집단 설계, 시계열설계, 무작위화 없음',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 유사실험설계의 종류와 한계를 설명하시오.

다음 순서로 설명해주세요:
1. 유사실험설계(Quasi-Experimental Design)의 정의
2. 비동질 통제집단 설계
3. 시계열설계(Time-Series Design)
4. 무작위화 부재의 한계
5. 내적 타당도 확보 방법
6. 사회복지 현장연구에서의 필요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '탐색적 조사, 기술적 조사, 설명적 조사의 차이를 비교 설명하시오.',
        answer: '탐색(예비), 기술(현상), 설명(인과관계)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 탐색적 조사, 기술적 조사, 설명적 조사의 차이를 비교 설명하시오.

다음 순서로 설명해주세요:
1. 탐색적 조사(Exploratory): 문제 발견, 예비조사
2. 기술적 조사(Descriptive): 현상 기술, 실태조사
3. 설명적 조사(Explanatory): 인과관계 규명
4. 각 조사 목적에 따른 연구설계 선택
5. 사회복지조사 사례
6. 순차적 적용 가능성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'measurement',
    name: '측정과 척도',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '측정의 4가지 수준(명목, 서열, 등간, 비율)을 설명하고 각각의 예를 드시오.',
        answer: '명목(성별), 서열(학력), 등간(온도), 비율(소득)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 측정의 4가지 수준(명목, 서열, 등간, 비율)을 설명하고 각각의 예를 드시오.

다음 순서로 설명해주세요:
1. 명목척도(Nominal): 분류, 성별/종교
2. 서열척도(Ordinal): 순위, 학력/만족도
3. 등간척도(Interval): 동일 간격, 온도/IQ
4. 비율척도(Ratio): 절대영점, 소득/나이
5. 각 수준별 통계분석 방법
6. 사회복지조사에서의 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '신뢰도의 종류(재검사, 반분, 내적일관성)를 설명하시오.',
        answer: '재검사 신뢰도, 반분 신뢰도, 크론바흐 알파',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 신뢰도의 종류(재검사, 반분, 내적일관성)를 설명하시오.

다음 순서로 설명해주세요:
1. 신뢰도(Reliability)의 정의: 측정의 일관성
2. 재검사 신뢰도(Test-Retest): 시간 간격 두고 반복
3. 반분 신뢰도(Split-Half): 문항 이분 후 상관관계
4. 내적일관성(Internal Consistency): 크론바흐 알파
5. 평가자 간 신뢰도
6. 신뢰도 계수 해석 (.70 이상)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '타당도의 종류(내용, 기준, 구성)를 설명하시오.',
        answer: '내용타당도, 기준타당도(동시/예측), 구성타당도(수렴/변별)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 타당도의 종류(내용, 기준, 구성)를 설명하시오.

다음 순서로 설명해주세요:
1. 타당도(Validity)의 정의: 측정의 정확성
2. 내용타당도(Content): 전문가 판단
3. 기준타당도(Criterion): 동시타당도, 예측타당도
4. 구성타당도(Construct): 수렴타당도, 변별타당도
5. 신뢰도와 타당도의 관계
6. 척도 개발 시 타당도 검증

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '리커트 척도와 거트만 척도의 차이를 설명하시오.',
        answer: '리커트: 동의 정도 5점, 거트만: 누적 위계',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 리커트 척도와 거트만 척도의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 리커트 척도(Likert Scale): 동의 정도 5점/7점
2. 총합평정척도, 문항 간 상관관계
3. 거트만 척도(Guttman Scale): 누적척도
4. 위계적 구조, 재현계수(Coefficient of Reproducibility)
5. 각 척도의 장단점
6. 사회복지조사 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '개념적 정의와 조작적 정의의 차이를 설명하고 예를 드시오.',
        answer: '개념적: 추상적 개념, 조작적: 측정 가능한 방법',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 개념적 정의와 조작적 정의의 차이를 설명하고 예를 드시오.

다음 순서로 설명해주세요:
1. 개념적 정의(Conceptual Definition): 이론적, 추상적
2. 조작적 정의(Operational Definition): 측정 가능, 구체적
3. 예시: 빈곤, 우울, 삶의 질
4. 조작화(Operationalization) 과정
5. 타당도와의 관계
6. 사회복지조사에서의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'sampling',
    name: '표집',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '확률표집의 종류(단순무작위, 계통, 층화, 집락)를 설명하시오.',
        answer: '단순무작위, 계통표집(K), 층화표집(집단별), 집락표집(묶음)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 확률표집의 종류(단순무작위, 계통, 층화, 집락)를 설명하시오.

다음 순서로 설명해주세요:
1. 단순무작위표집(Simple Random Sampling): 모두 동일 확률
2. 계통표집(Systematic Sampling): K번째 선택
3. 층화표집(Stratified Sampling): 집단별 비례/비비례
4. 집락표집(Cluster Sampling): 집단 단위 추출
5. 각 방법의 장단점
6. 사회복지조사 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '비확률표집의 종류(편의, 할당, 유의, 눈덩이)를 설명하시오.',
        answer: '편의표집, 할당표집, 유의표집, 눈덩이표집',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 비확률표집의 종류(편의, 할당, 유의, 눈덩이)를 설명하시오.

다음 순서로 설명해주세요:
1. 편의표집(Convenience): 접근 용이한 대상
2. 할당표집(Quota): 비례 할당
3. 유의표집(Purposive): 전문가 판단
4. 눈덩이표집(Snowball): 추천, 은폐집단
5. 비확률표집의 한계
6. 질적 연구에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '표집오차와 비표집오차의 차이를 설명하시오.',
        answer: '표집오차: 표본 선택, 비표집오차: 측정·응답 오류',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 표집오차와 비표집오차의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 표집오차(Sampling Error): 표본 선택에 따른 오차
2. 표준오차, 신뢰구간
3. 비표집오차(Non-sampling Error)의 종류
4. 측정오차, 응답오차, 무응답오차
5. 각 오차 감소 방법
6. 표본크기와 오차의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '표본크기 결정 요인과 적정 표본크기를 설명하시오.',
        answer: '모집단 크기, 신뢰수준, 허용오차, 분산',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 표본크기 결정 요인과 적정 표본크기를 설명하시오.

다음 순서로 설명해주세요:
1. 표본크기 결정 공식
2. 모집단 크기(유한/무한)
3. 신뢰수준(95%, 99%)
4. 허용오차(±3%, ±5%)
5. 분산(이질성)
6. 사회복지조사 표본크기 권장사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '대표성(Representativeness)의 개념과 확보 방법을 설명하시오.',
        answer: '모집단 특성 반영, 확률표집, 표본크기',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 대표성(Representativeness)의 개념과 확보 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 대표성의 정의: 모집단 특성 반영
2. 확률표집을 통한 대표성 확보
3. 적정 표본크기 확보
4. 층화표집을 통한 이질성 반영
5. 무응답 편향(Non-response Bias) 최소화
6. 사회복지조사에서 대표성의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'data-collection',
    name: '자료수집',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '설문조사의 장단점과 우편·전화·인터넷 조사의 차이를 설명하시오.',
        answer: '우편(비용↓, 응답률↓), 전화(신속), 인터넷(편리)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 설문조사의 장단점과 우편·전화·인터넷 조사의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 설문조사(Survey)의 장점: 대규모, 계량화
2. 단점: 심층성 부족, 무응답
3. 우편조사: 비용 낮음, 응답률 낮음
4. 전화조사: 신속, 짧은 질문
5. 인터넷 조사: 편리, 표집편향
6. 사회복지조사 적용 시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '면접법의 종류(구조화, 반구조화, 비구조화)와 특징을 설명하시오.',
        answer: '구조화: 표준화, 반구조화: 융통성, 비구조화: 심층',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 면접법의 종류(구조화, 반구조화, 비구조화)와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 구조화 면접(Structured): 표준화된 질문, 계량화 용이
2. 반구조화 면접(Semi-structured): 기본 틀 + 융통성
3. 비구조화 면접(Unstructured): 개방형, 심층면접
4. 각 방법의 장단점
5. 면접자 훈련의 중요성
6. 사회복지 질적 연구 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '관찰법의 종류(참여/비참여, 구조화/비구조화)를 설명하시오.',
        answer: '참여관찰(내부자), 비참여관찰(외부자), 구조화 정도',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 관찰법의 종류(참여/비참여, 구조화/비구조화)를 설명하시오.

다음 순서로 설명해주세요:
1. 참여관찰(Participant Observation): 내부자 시각
2. 비참여관찰(Non-participant): 외부자 관찰
3. 구조화 관찰: 사전 범주, 체계적
4. 비구조화 관찰: 자연스러운 기록
5. 관찰자 효과(Hawthorne Effect)
6. 사회복지 현장연구 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '2차 자료 분석(기존 통계, 문헌)의 장단점을 설명하시오.',
        answer: '장점: 비용·시간 절약, 단점: 목적 불일치, 신뢰성',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 2차 자료 분석(기존 통계, 문헌)의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 2차 자료(Secondary Data)의 정의
2. 장점: 시간·비용 절약, 종단분석 가능
3. 단점: 연구목적 불일치, 자료 품질 확인 어려움
4. 주요 2차 자료원: 통계청, 보건복지부
5. 메타분석(Meta-Analysis)
6. 사회복지정책 연구 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '좋은 질문지 작성의 원칙을 5가지 이상 설명하시오.',
        answer: '명확성, 단순성, 중립성, 이중질문 금지, 적절한 응답범주',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 좋은 질문지 작성의 원칙을 5가지 이상 설명하시오.

다음 순서로 설명해주세요:
1. 명확하고 구체적인 언어 사용
2. 한 번에 하나의 질문(이중질문 금지)
3. 중립적 표현, 유도질문 회피
4. 응답자 수준 고려
5. 적절한 응답범주 제공
6. 민감한 질문은 후반부 배치
7. 사전조사(Pretest)의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'data-analysis',
    name: '자료분석',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '기술통계(중심경향, 산포도)의 측정치를 설명하시오.',
        answer: '평균·중앙값·최빈값, 범위·분산·표준편차',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 기술통계(중심경향, 산포도)의 측정치를 설명하시오.

다음 순서로 설명해주세요:
1. 중심경향치: 평균(Mean), 중앙값(Median), 최빈값(Mode)
2. 각 측정치의 특징과 적용
3. 산포도: 범위(Range), 분산(Variance), 표준편차(SD)
4. 정규분포와 왜도(Skewness)
5. 측정수준에 따른 통계량 선택
6. 사회복지조사 결과 해석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '추리통계에서 귀무가설과 대립가설, 제1종·제2종 오류를 설명하시오.',
        answer: 'H0(차이 없음), H1(차이 있음), α오류(기각), β오류(채택)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 추리통계에서 귀무가설과 대립가설, 제1종·제2종 오류를 설명하시오.

다음 순서로 설명해주세요:
1. 귀무가설(H0): 차이/관계 없음
2. 대립가설(H1): 차이/관계 있음
3. 제1종 오류(α): 참인 H0를 기각 (위양성)
4. 제2종 오류(β): 거짓인 H0를 채택 (위음성)
5. 유의수준(p<.05, p<.01)
6. 검정력(1-β)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 't-검정과 분산분석(ANOVA)의 차이를 설명하시오.',
        answer: 't-검정: 2집단 평균, ANOVA: 3집단 이상 평균',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: t-검정과 분산분석(ANOVA)의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. t-검정(t-test): 2집단 평균 비교
2. 독립표본 t-검정, 대응표본 t-검정
3. 분산분석(ANOVA): 3집단 이상 평균 비교
4. F-값, 사후검정(Post-hoc)
5. 가정: 정규분포, 등분산성
6. 사회복지 프로그램 효과성 평가

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '상관관계와 인과관계의 차이를 설명하시오.',
        answer: '상관: 관련성, 인과: 원인→결과 (시간순서, 허위관계 통제)',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 상관관계와 인과관계의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 상관관계(Correlation): 변수 간 관련성
2. 피어슨 r, 스피어만 ρ
3. 인과관계(Causation)의 3요건
4. 시간적 선행성, 공변성, 허위관계 통제
5. 제3의 변수 문제
6. 사회복지연구에서 인과관계 입증

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '카이제곱 검정(χ²)의 원리와 활용을 설명하시오.',
        answer: 'χ²: 명목/서열 변수 관련성, 관찰빈도 vs 기대빈도',
        prompt: `사회복지사 1급 사회복지조사론 문제입니다.

문제: 카이제곱 검정(χ²)의 원리와 활용을 설명하시오.

다음 순서로 설명해주세요:
1. 카이제곱(χ²) 검정의 원리
2. 관찰빈도 vs 기대빈도
3. 명목/서열 변수 간 관련성 검정
4. 독립성 검정, 적합도 검정
5. 자유도(df)와 해석
6. 사회복지조사 적용 (성별×서비스 이용)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function ResearchMethodsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-research-methods-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('social-worker-research-methods-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/education/social-worker" className="text-gray-600 hover:text-pink-600">사회복지사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">사회복지조사론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🤝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">사회복지조사론 학습</h1>
                <p className="text-pink-100">사회복지사 1급 - 사회복지기초 영역</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-pink-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <a
                                  href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  🧡 Claude
                                </a>
                                <a
                                  href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  💚 ChatGPT
                                </a>
                                <a
                                  href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  💙 Gemini
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
