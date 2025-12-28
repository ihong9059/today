'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star } from 'lucide-react';

const courseInfo: { [key: string]: { name: string; color: string; colorLight: string } } = {
  'math1': { name: '수학 I', color: 'from-blue-500 to-indigo-500', colorLight: 'blue' },
  'math2': { name: '수학 II', color: 'from-indigo-500 to-purple-500', colorLight: 'indigo' },
  'calculus': { name: '미적분', color: 'from-purple-500 to-pink-500', colorLight: 'purple' },
  'suneung': { name: '수능 수학', color: 'from-rose-500 to-red-500', colorLight: 'rose' },
};

const allLessons: { [course: string]: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string } } } = {
  'math1': {
    1: {
      title: '지수와 로그',
      desc: '지수법칙, 로그의 성질',
      prompt: `고등학교 수학I - 지수와 로그 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 지수법칙 활용 문제 2개
2. 로그의 정의와 성질 문제 2개
3. 로그 계산 문제 2개
4. 상용로그와 자연로그 설명
5. 지수와 로그의 관계 강조
6. 단계별 풀이와 공식 정리 포함

예시 형식:
[문제 1] 📊
log₂16 + log₂8의 값을 구하세요.
힌트: log₂16 = log₂2⁴ = 4`,
      funFact: '💡 재미있는 사실: 로그는 존 네이피어가 천문학 계산을 쉽게 하기 위해 발명했어요!',
      challenge: '🎯 도전 과제: log₁₀1000, log₁₀10000을 암산으로 구해보세요!'
    },
    2: {
      title: '지수함수와 로그함수',
      desc: '그래프와 성질',
      prompt: `고등학교 수학I - 지수함수와 로그함수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 지수함수 y=aˣ의 그래프 특성 2문제
2. 로그함수 y=logₐx의 그래프 특성 2문제
3. 지수/로그 방정식 풀이 2문제
4. 그래프 이동과 변환 1문제
5. 두 함수가 역함수 관계임을 설명
6. 그래프의 점근선, 정의역, 치역 강조

예시 형식:
[문제 1] 📈
y = 2^(x-1) + 3의 그래프를
y = 2^x의 그래프로부터 어떻게 얻을 수 있나요?`,
      funFact: '💡 재미있는 사실: 복리 이자 계산에서 e(자연상수)가 자연스럽게 등장해요!',
      challenge: '🎯 도전 과제: 지수함수와 로그함수 그래프가 y=x에 대해 대칭인지 확인해보세요!'
    },
    3: {
      title: '삼각함수의 정의',
      desc: '호도법, 삼각비',
      prompt: `고등학교 수학I - 삼각함수의 정의 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 호도법 ↔ 60분법 변환 2문제
2. 단위원에서 삼각함수 값 구하기 2문제
3. 특수각의 삼각함수 값 2문제
4. 삼각함수의 부호 판별 1문제
5. 단위원 그림으로 개념 설명
6. 삼각함수표 암기법도 포함

예시 형식:
[문제 1] 📐
60°를 호도법으로 나타내세요.
공식: θ° = (θ × π)/180 rad`,
      funFact: '💡 재미있는 사실: 호도법의 "라디안"은 반지름(radius)에서 온 말이에요!',
      challenge: '🎯 도전 과제: 30°, 45°, 60°, 90°의 sin, cos 값을 외워보세요!'
    },
    4: {
      title: '삼각함수의 그래프',
      desc: '주기, 진폭',
      prompt: `고등학교 수학I - 삼각함수의 그래프 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. y = sinx, y = cosx 그래프 특성 2문제
2. 주기와 진폭 구하기 2문제
3. 그래프 변환 (y = asin(bx+c)+d) 2문제
4. 삼각함수의 최댓값, 최솟값 구하기 1문제
5. 그래프의 평행이동과 신축 설명
6. 주기 공식 T = 2π/|b| 강조

예시 형식:
[문제 1] 📉
y = 3sin(2x)의 주기와 진폭을 구하세요.
진폭 = |a| = 3, 주기 = 2π/|b| = π`,
      funFact: '💡 재미있는 사실: 음악의 소리도 삼각함수(사인파)로 표현할 수 있어요!',
      challenge: '🎯 도전 과제: y=sinx와 y=cosx의 그래프가 어떤 관계인지 찾아보세요!'
    },
    5: {
      title: '삼각함수의 활용',
      desc: '덧셈정리, 합성',
      prompt: `고등학교 수학I - 삼각함수의 활용 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 삼각함수의 덧셈정리 활용 2문제
2. 배각공식 활용 2문제
3. 삼각함수의 합성 2문제
4. 삼각방정식 풀이 1문제
5. 공식을 유도하는 과정도 보여주기
6. 실생활 응용(측량, 파동) 예시 포함

예시 형식:
[문제 1] 🔺
sin75°의 값을 구하세요.
힌트: 75° = 45° + 30°를 이용해 덧셈정리 적용`,
      funFact: '💡 재미있는 사실: 삼각함수는 GPS 위성이 위치를 계산하는 데도 사용돼요!',
      challenge: '🎯 도전 과제: sin(A+B) = sinAcosB + cosAsinB를 증명해보세요!'
    }
  },
  'math2': {
    1: {
      title: '함수의 극한',
      desc: '극한의 개념과 성질',
      prompt: `고등학교 수학II - 함수의 극한 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 기본 극한 계산 2문제
2. 0/0 꼴 부정형 극한 2문제
3. ∞/∞ 꼴 극한 2문제
4. 극한의 대소 관계(샌드위치 정리) 1문제
5. 좌극한, 우극한 개념 설명
6. 극한이 존재하지 않는 경우도 다루기

예시 형식:
[문제 1] 🔍
lim(x→2) (x²-4)/(x-2)의 값을 구하세요.
힌트: 분자를 인수분해하여 약분`,
      funFact: '💡 재미있는 사실: 극한 개념은 뉴턴과 라이프니츠의 미적분학 발전에 핵심이었어요!',
      challenge: '🎯 도전 과제: lim(x→0) sinx/x = 1을 그래프로 확인해보세요!'
    },
    2: {
      title: '함수의 연속',
      desc: '연속함수, 불연속점',
      prompt: `고등학교 수학II - 함수의 연속 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 연속의 정의 확인 문제 2개
2. 불연속점 찾기 2문제
3. 구간에서 연속 조건 구하기 2문제
4. 중간값 정리 활용 1문제
5. 연속의 세 가지 조건 명확히 설명
6. 그래프로 연속/불연속 판별 방법 포함

예시 형식:
[문제 1] 📊
f(x) = (x²-1)/(x-1) (x≠1), f(1) = k일 때,
f(x)가 x=1에서 연속이 되도록 k의 값을 구하세요.`,
      funFact: '💡 재미있는 사실: 바이어슈트라스는 연속이지만 미분불가능한 함수를 발견했어요!',
      challenge: '🎯 도전 과제: y=1/x가 x=0에서 왜 불연속인지 설명해보세요!'
    },
    3: {
      title: '미분계수와 도함수',
      desc: '순간변화율',
      prompt: `고등학교 수학II - 미분계수와 도함수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 미분계수의 정의로 구하기 2문제
2. 도함수 기본 공식 활용 2문제
3. 곱의 미분법, 몫의 미분법 2문제
4. 접선의 방정식 구하기 1문제
5. 평균변화율과 순간변화율 비교
6. 미분 공식표 정리 포함

예시 형식:
[문제 1] 📐
f(x) = x³ - 2x + 1일 때, f'(2)의 값을 구하세요.
먼저 f'(x) = 3x² - 2를 구한 후 x=2 대입`,
      funFact: '💡 재미있는 사실: 미분은 뉴턴이 행성의 운동을 설명하기 위해 발명했어요!',
      challenge: '🎯 도전 과제: 속도-시간 그래프에서 기울기가 가속도임을 확인해보세요!'
    },
    4: {
      title: '도함수의 활용',
      desc: '증감, 극대극소',
      prompt: `고등학교 수학II - 도함수의 활용 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 함수의 증가/감소 구간 구하기 2문제
2. 극대/극소 구하기 2문제
3. 최대/최소 구하기 2문제
4. 그래프 개형 그리기 1문제
5. 증감표 작성 방법 자세히 설명
6. 실생활 최적화 문제 예시 포함

예시 형식:
[문제 1] 📈
f(x) = x³ - 3x의 극값을 구하세요.
1) f'(x) = 0 풀기
2) 증감표 작성
3) 극대/극소 판별`,
      funFact: '💡 재미있는 사실: 물류 회사들은 미분을 이용해 최적 배송 경로를 찾아요!',
      challenge: '🎯 도전 과제: 둘레가 일정할 때 넓이가 최대인 직사각형은 정사각형임을 증명해보세요!'
    },
    5: {
      title: '정적분',
      desc: '넓이, 정적분 계산',
      prompt: `고등학교 수학II - 정적분 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 정적분의 정의와 성질 2문제
2. 정적분 계산 문제 2문제
3. 곡선과 x축 사이의 넓이 2문제
4. 두 곡선 사이의 넓이 1문제
5. 부정적분과 정적분의 관계 설명
6. 리만합에서 정적분으로 가는 과정 간략히

예시 형식:
[문제 1] 📊
∫₀² (x² + 1)dx의 값을 구하세요.
= [x³/3 + x]₀² = (8/3 + 2) - 0 = 14/3`,
      funFact: '💡 재미있는 사실: 적분 기호 ∫는 "합"을 뜻하는 라틴어 summa의 S를 늘인 것이에요!',
      challenge: '🎯 도전 과제: y=x² (0≤x≤1)와 x축 사이 넓이가 1/3임을 확인해보세요!'
    }
  },
  'calculus': {
    1: {
      title: '수열의 극한',
      desc: '급수, 무한급수',
      prompt: `미적분 - 수열의 극한 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 수열의 극한 계산 2문제
2. 급수의 수렴/발산 판정 2문제
3. 등비급수 계산 2문제
4. 무한급수의 합 구하기 1문제
5. 수렴/발산 판정법 정리
6. 급수와 적분의 관계 암시

예시 형식:
[문제 1] ∞
lim(n→∞) (3n²+1)/(n²-2n+1)의 값을 구하세요.
힌트: 분자, 분모를 n²으로 나누기`,
      funFact: '💡 재미있는 사실: 1+1/2+1/4+1/8+... = 2가 되는 것은 고대 그리스 사람들도 알았어요!',
      challenge: '🎯 도전 과제: 1/2+1/4+1/8+...이 왜 1에 수렴하는지 직관적으로 설명해보세요!'
    },
    2: {
      title: '여러 가지 함수의 미분',
      desc: '합성함수, 음함수',
      prompt: `미적분 - 여러 가지 함수의 미분 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 합성함수의 미분 2문제
2. 삼각함수의 미분 2문제
3. 지수/로그함수의 미분 2문제
4. 음함수 미분 1문제
5. 연쇄법칙(Chain Rule) 자세히 설명
6. 각 함수의 미분 공식 정리표 포함

예시 형식:
[문제 1] 🔗
y = sin(x²)을 미분하세요.
연쇄법칙: dy/dx = cos(x²) · 2x = 2x·cos(x²)`,
      funFact: '💡 재미있는 사실: e^x의 미분이 자기 자신인 것은 수학에서 가장 아름다운 성질 중 하나예요!',
      challenge: '🎯 도전 과제: (e^x)′ = e^x를 극한의 정의로 증명해보세요!'
    },
    3: {
      title: '여러 가지 미분법',
      desc: '매개변수, 이계도함수',
      prompt: `미적분 - 여러 가지 미분법 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 매개변수 함수의 미분 2문제
2. 이계도함수 구하기 2문제
3. 로그미분법 2문제
4. 역함수의 미분 1문제
5. 매개변수 미분 공식 유도 과정
6. 이계도함수와 그래프 볼록성 관계

예시 형식:
[문제 1] 📊
x = t², y = t³일 때 dy/dx를 구하세요.
dy/dx = (dy/dt)/(dx/dt) = 3t²/2t = 3t/2`,
      funFact: '💡 재미있는 사실: 이계도함수가 0인 점을 변곡점이라 하고, 그래프의 볼록성이 바뀌어요!',
      challenge: '🎯 도전 과제: y=x³의 변곡점을 구하고 그래프로 확인해보세요!'
    },
    4: {
      title: '여러 가지 적분법',
      desc: '치환적분, 부분적분',
      prompt: `미적분 - 여러 가지 적분법 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 치환적분 문제 2개
2. 부분적분 문제 2개
3. 삼각함수 적분 2문제
4. 유리함수 적분 1문제
5. 치환적분과 부분적분 선택 기준 설명
6. 적분 기법 선택 플로우차트

예시 형식:
[문제 1] ∫
∫ x·e^x dx를 부분적분으로 구하세요.
u = x, dv = e^x dx로 놓으면
∫ x·e^x dx = x·e^x - ∫ e^x dx = x·e^x - e^x + C`,
      funFact: '💡 재미있는 사실: 부분적분 공식은 곱의 미분법을 거꾸로 적용한 것이에요!',
      challenge: '🎯 도전 과제: ∫ln(x)dx를 부분적분으로 구해보세요!'
    },
    5: {
      title: '정적분의 활용',
      desc: '넓이, 부피, 속도',
      prompt: `미적분 - 정적분의 활용 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 곡선으로 둘러싸인 넓이 2문제
2. 회전체의 부피 2문제
3. 속도/가속도와 적분 관계 2문제
4. 곡선의 길이 기초 1문제
5. 디스크 방법, 와셔 방법 설명
6. 실생활 응용(물탱크, 거리) 예시

예시 형식:
[문제 1] 🔄
y = √x (0 ≤ x ≤ 4)를 x축 둘레로 회전시킨 입체의 부피를 구하세요.
V = π∫₀⁴ (√x)² dx = π∫₀⁴ x dx`,
      funFact: '💡 재미있는 사실: 적분으로 포도주 통의 부피를 계산한 것이 적분학 발전의 시작이었어요!',
      challenge: '🎯 도전 과제: 반구의 부피가 (2/3)πr³인 것을 적분으로 증명해보세요!'
    }
  },
  'suneung': {
    1: {
      title: '수능 수학 전략',
      desc: '시간 배분, 유형별 접근',
      prompt: `수능 수학 - 시험 전략과 시간 관리 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 유형별 예상 소요 시간 안내
2. 쉬운 문제 빨리 풀기 전략 2문제
3. 시간 단축 계산 팁 3개
4. 실전 타이머 연습용 문제 세트
5. 킬러문제 접근/포기 판단 기준
6. 멘탈 관리와 실수 방지 팁

예시 형식:
[시간 배분 가이드]
- 1~15번 (5지선다): 평균 2분/문제 → 30분
- 16~21번 (단답형): 평균 4분/문제 → 24분
- 22번 (킬러): 최대 15분
- 검토: 10분
- 총: 100분 이내 목표`,
      funFact: '💡 수능 팁: 막힌 문제는 별표 치고 넘어가세요. 뒤에 쉬운 문제가 있을 수 있어요!',
      challenge: '🎯 도전 과제: 15분 타이머로 5문제 풀어보며 시간 감각을 익히세요!'
    },
    2: {
      title: '고난도 함수',
      desc: '함수 그래프 문제',
      prompt: `수능 수학 - 고난도 함수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 합성함수 조건 문제 2개
2. 함수의 그래프 해석 문제 2개
3. 함수의 개수 구하기 문제 1개
4. 최근 5년 출제 경향 분석
5. 함수 문제 접근 순서도 제공
6. 흔한 함정과 실수 유형 안내

예시 형식:
[문제 유형] 함수 f(x)에 대하여 조건을 만족시키는 함수의 개수
접근법:
1. 조건 분석 → 2. 경우 분류 → 3. 각 경우 검증 → 4. 개수 합산`,
      funFact: '💡 수능 팁: 함수 문제는 그래프로 생각하면 조건이 보여요!',
      challenge: '🎯 도전 과제: f(f(x))=x를 만족하는 함수 f의 예시를 3개 찾아보세요!'
    },
    3: {
      title: '고난도 미적분',
      desc: '미적분 킬러 문제',
      prompt: `수능 수학 - 고난도 미적분 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 미분 활용 종합 문제 2개
2. 적분과 넓이 복합 문제 2개
3. 정적분으로 정의된 함수 문제 1개
4. 자주 출제되는 킬러 유형 분석
5. 역함수와 미분의 관계 활용법
6. 실전에서 시간 단축하는 계산 기법

예시 형식:
[킬러 유형] ∫ₐᵇ f(t)dt = g(x) 형태
핵심 공식: g'(x) = f(x)
주의: 적분 구간에 x가 있으면 합성함수 미분!`,
      funFact: '💡 수능 팁: 킬러문제도 기본 공식의 조합이에요. 당황하지 말고 조건을 분해하세요!',
      challenge: '🎯 도전 과제: 최근 3년간 수능 21, 22번 문제를 분석해보세요!'
    },
    4: {
      title: '고난도 기하',
      desc: '벡터, 공간도형',
      prompt: `수능 수학 - 고난도 기하 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 공간벡터 활용 문제 2개
2. 공간도형의 성질 문제 2개
3. 이차곡선(타원, 쌍곡선) 문제 1개
4. 벡터의 내적 활용법 정리
5. 공간 위치 관계 시각화 팁
6. 계산 실수를 줄이는 체크리스트

예시 형식:
[벡터 문제 접근법]
1. 좌표계 설정 (원점, 축 방향 결정)
2. 점/벡터 좌표 표현
3. 내적, 크기 공식 적용
4. 답 검증 (단위 확인)`,
      funFact: '💡 수능 팁: 공간도형은 간단한 그림을 그리면 관계가 보여요!',
      challenge: '🎯 도전 과제: 정사면체의 꼭짓점을 벡터로 표현해보세요!'
    },
    5: {
      title: '실전 모의고사',
      desc: '시간 내 풀이 연습',
      prompt: `수능 수학 - 실전 모의고사용 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 수능과 유사한 난이도 분포 (쉬움 5, 보통 8, 어려움 8, 킬러 1)
2. 22문제 풀 수 있는 분량
3. 각 문제에 예상 풀이 시간 표시
4. 문제 유형별로 섞어서 출제
5. 상세 해설과 채점 기준 포함
6. 오답 분석 및 보완 학습 가이드

예시 형식:
[문제 1] (예상 시간: 1분) ⭐
lim(x→0) sin3x/x의 값은?
[문제 2] (예상 시간: 2분) ⭐
...
[문제 20] (예상 시간: 8분) ⭐⭐⭐
...`,
      funFact: '💡 수능 팁: 실전처럼 연습하고, 연습처럼 실전에 임하세요!',
      challenge: '🎯 도전 과제: 100분 안에 모든 문제를 풀어보고 실력을 점검하세요!'
    }
  }
};

export default function HighMathLessonPage() {
  const params = useParams();
  const course = params.course as string;
  const day = Number(params.day);

  const courseData = courseInfo[course];
  const lessons = allLessons[course];
  const lesson = lessons?.[day];

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`math-high-${course}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [course, day]);

  const copyPrompt = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = () => {
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`math-high-${course}-day${day}-completed`, 'true');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!courseData || !lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-${courseData.colorLight}-50`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '🔬'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2"><Brain className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/math" className="hover:text-blue-600">수학 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/math/high/${course}`} className="hover:text-blue-600">{courseData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${courseData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-white/80">{lesson.desc}</p>
              </div>
            </div>
            {completed && (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">완료!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 mb-1">학습 팁</p>
              <p className="text-amber-700 text-sm">AI에게 "이 문제를 더 쉬운 버전으로" 또는 "비슷한 유형 5문제 더"라고 요청해보세요!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              AI 프롬프트
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              오늘의 팁
            </h3>
            <p className="text-purple-700 text-sm">{lesson.funFact}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              도전 과제
            </h3>
            <p className="text-green-700 text-sm">{lesson.challenge}</p>
          </div>
        </div>

        {!completed && (
          <button onClick={markComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/math/high/${course}/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/math/high/${course}/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/math/high/${course}`} className="flex items-center gap-2 text-purple-600 font-medium">
              <span>코스 완료!</span>
              <Trophy className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
