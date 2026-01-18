'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'dc-machine',
    name: '직류기',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '직류발전기의 유기기전력 공식 E = PZΦn/(60a)에서 각 기호의 의미를 설명하시오.',
        answer: 'P: 극수, Z: 총도체수, Φ: 자속, n: 회전수, a: 병렬회로수',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류발전기의 유기기전력 공식에서 각 기호의 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 유기기전력 발생 원리 (패러데이 법칙)
2. 각 기호의 정의와 단위
3. 중권과 파권에서 a값의 차이
4. 공식 유도 과정
5. 실제 계산 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '직류전동기의 속도제어 방법 3가지를 설명하시오.',
        answer: '전압제어(정토크), 계자제어(정출력), 저항제어(손실큼)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류전동기의 속도제어 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 속도 공식: n = (V-IaRa)/(KΦ)
2. 전압제어법의 원리와 특성
3. 계자제어법의 원리와 특성
4. 저항제어법의 원리와 특성
5. 각 방법의 적용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '직류발전기의 종류별 특성곡선을 설명하시오. (타여자, 분권, 직권, 복권)',
        answer: '타여자: 전압일정, 분권: 약간감소, 직권: 수하특성, 복권: 보상',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류발전기 종류별 특성곡선을 설명하시오.

다음 순서로 설명해주세요:
1. 타여자 발전기 특성
2. 분권 발전기 특성
3. 직권 발전기 특성
4. 복권 발전기 특성 (가동복권, 차동복권)
5. 용도별 적합한 발전기 선택

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '전기자 반작용이란 무엇이며, 그 영향과 대책을 설명하시오.',
        answer: '전기자 전류에 의한 자속이 주자속에 영향. 영향: 주자속 감소, 중성축 이동. 대책: 보극, 보상권선',
        prompt: `전기기사 전기기기 문제입니다.

문제: 전기자 반작용의 영향과 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 전기자 반작용의 정의
2. 교차자화작용과 감자작용
3. 중성축 이동의 영향
4. 보극(Interpole)의 역할
5. 보상권선의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '직류전동기에서 역기전력의 역할을 설명하시오.',
        answer: '전기자 전류 제한, 전력변환(전기→기계), 속도 자동조절',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류전동기에서 역기전력의 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 역기전력의 발생 원리
2. 역기전력 공식
3. 전기자 전류 제한 역할
4. 부하변동시 자동조절 원리
5. 기동시 역기전력과 기동저항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '직류전동기의 토크 공식 T = PZΦIa/(2πa)를 유도하시오.',
        answer: 'T = 출력/각속도 = EIa/ω = (PZΦn/60a)×Ia/(2πn/60)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류전동기의 토크 공식을 유도하시오.

다음 순서로 설명해주세요:
1. 출력과 토크의 관계
2. 유기기전력 공식 대입
3. 토크 공식 유도
4. 토크-전류, 토크-자속 관계
5. 분권/직권 전동기의 토크특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '직류전동기의 기동법을 설명하시오.',
        answer: '기동저항법(직접기동 위험), 기동전압저감법, Y-Δ기동(교류)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류전동기의 기동법을 설명하시오.

다음 순서로 설명해주세요:
1. 직접기동이 위험한 이유
2. 기동저항법의 원리
3. 기동저항 계산법
4. 전압저감 기동법
5. 기동전류 제한 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '정류(Commutation)란 무엇이며, 양호한 정류 조건을 설명하시오.',
        answer: '코일 전류 방향 전환. 양호조건: 직선정류(저항정류, 보극사용)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 정류와 양호한 정류 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 정류의 정의
2. 직선정류, 부족정류, 과정류
3. 정류불량의 원인
4. 보극에 의한 정류개선
5. 정류자와 브러시의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '워드-레오나드 시스템(Ward-Leonard System)의 원리와 장점을 설명하시오.',
        answer: '전동기-발전기 조합으로 넓은 범위 속도제어. 장점: 정역회전, 무단속도제어, 회생제동',
        prompt: `전기기사 전기기기 문제입니다.

문제: 워드-레오나드 시스템을 설명하시오.

다음 순서로 설명해주세요:
1. 시스템 구성
2. 동작 원리
3. 장점과 단점
4. 적용 분야
5. 정류기 시스템과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '직류기의 효율 계산시 손실의 종류를 설명하시오.',
        answer: '동손(I²R), 철손(히스테리시스+와전류), 기계손(마찰+풍손), 표류부하손',
        prompt: `전기기사 전기기기 문제입니다.

문제: 직류기의 손실 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 동손(구리손)의 정의와 계산
2. 철손의 종류와 특성
3. 기계손의 종류
4. 표류부하손
5. 효율 계산 공식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'transformer',
    name: '변압기',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '변압기의 권수비 a = N₁/N₂ = V₁/V₂ = I₂/I₁ 관계를 유도하시오.',
        answer: '패러데이 법칙에서 V₁/V₂ = N₁/N₂, 에너지 보존에서 V₁I₁ = V₂I₂',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기의 권수비 관계를 유도하시오.

다음 순서로 설명해주세요:
1. 이상변압기 가정
2. 패러데이 법칙 적용
3. 전압비 유도
4. 에너지 보존법칙
5. 전류비 유도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '변압기의 전압변동률 계산식을 유도하고, 전압변동률이 최대가 되는 조건을 설명하시오.',
        answer: 'ε = %r·cosθ + %x·sinθ, 최대조건: tanθ = %x/%r',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기 전압변동률 공식과 최대조건을 설명하시오.

다음 순서로 설명해주세요:
1. 전압변동률의 정의
2. 등가회로에서 전압강하
3. 전압변동률 공식 유도
4. 최대 전압변동률 조건
5. 역률과 전압변동률 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '변압기 병렬운전 조건 4가지를 설명하시오.',
        answer: '1)정격전압 같을 것, 2)권수비 같을 것, 3)극성 같을 것, 4)%임피던스 같을 것',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기 병렬운전 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 각 조건의 이유
2. 조건 불만족시 문제점
3. 순환전류 발생 원인
4. 부하분담 관계
5. 병렬운전 가능 여부 판정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '변압기 결선방식 Y-Y, Y-Δ, Δ-Y, Δ-Δ의 특징을 비교하시오.',
        answer: 'Y-Y: 중성점접지가능/3고조파문제, Y-Δ: 3고조파순환/강압용, Δ-Y: 승압용, Δ-Δ: V결선가능',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기 결선방식별 특징을 비교하시오.

다음 순서로 설명해주세요:
1. Y-Y 결선의 장단점
2. Y-Δ 결선의 장단점
3. Δ-Y 결선의 장단점
4. Δ-Δ 결선의 장단점
5. 결선방식 선택 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '변압기의 무부하시험과 단락시험의 목적을 설명하시오.',
        answer: '무부하시험: 철손, 여자전류, 여자임피던스. 단락시험: 동손, 누설임피던스',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기 무부하시험과 단락시험의 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 무부하시험 방법
2. 무부하시험에서 구하는 값
3. 단락시험 방법
4. 단락시험에서 구하는 값
5. 등가회로 정수 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '변압기의 효율이 최대가 되는 조건을 유도하시오.',
        answer: '철손 = 동손일 때 효율 최대. 부하율 m = √(Pi/Pc)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기 효율 최대 조건을 유도하시오.

다음 순서로 설명해주세요:
1. 변압기 효율 공식
2. 효율 최대 조건 미분
3. 철손 = 동손 유도
4. 최대효율 부하율 계산
5. 실제 설계시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '단권변압기의 장단점과 자기용량/부하용량 관계를 설명하시오.',
        answer: '장점: 경제적, 고효율, 소형. 단점: 절연문제. 자기용량 = (1-1/a)×부하용량',
        prompt: `전기기사 전기기기 문제입니다.

문제: 단권변압기의 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 단권변압기의 구조
2. 자기용량과 부하용량 관계
3. 장점 상세
4. 단점 상세
5. 적용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: 'V-V결선의 출력비와 이용률을 계산하시오.',
        answer: '출력비 = √3/3 = 57.7%, 이용률 = √3/2 = 86.6%',
        prompt: `전기기사 전기기기 문제입니다.

문제: V-V결선의 출력비와 이용률을 계산하시오.

다음 순서로 설명해주세요:
1. V-V결선의 구조
2. 출력 계산
3. 출력비 유도
4. 이용률 유도
5. V-V결선의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '변압기유(절연유)의 역할과 구비조건을 설명하시오.',
        answer: '역할: 절연, 냉각. 조건: 높은절연내력, 낮은점도, 높은인화점, 화학적안정',
        prompt: `전기기사 전기기기 문제입니다.

문제: 변압기유의 역할과 구비조건을 설명하시오.

다음 순서로 설명해주세요:
1. 절연 역할
2. 냉각 역할
3. 구비조건 상세
4. 유중가스분석
5. 절연유 열화와 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '여자돌입전류(Inrush Current)의 발생원인과 대책을 설명하시오.',
        answer: '원인: 투입시 잔류자속+투입위상에 따른 자속포화. 대책: 폐로저항, 투입시점제어',
        prompt: `전기기사 전기기기 문제입니다.

문제: 여자돌입전류의 발생원인과 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 여자돌입전류의 정의
2. 발생 원인 상세
3. 돌입전류의 크기와 특성
4. 보호계전기 오동작 문제
5. 대책 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'induction',
    name: '유도기',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '유도전동기의 슬립(Slip) 공식 s = (Ns-N)/Ns를 설명하시오.',
        answer: 'Ns: 동기속도(120f/P), N: 회전자속도. s=0(동기), s=1(정지)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 유도전동기의 슬립 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 동기속도 공식
2. 슬립의 정의
3. 슬립의 범위
4. 슬립과 회전자 주파수 관계
5. 슬립과 2차 유기기전력 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '유도전동기의 토크-슬립 특성곡선을 그리고 최대토크 조건을 설명하시오.',
        answer: '최대토크 조건: s = r₂/x₂, 최대토크는 r₂와 무관',
        prompt: `전기기사 전기기기 문제입니다.

문제: 유도전동기의 토크-슬립 특성과 최대토크 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 토크-슬립 특성곡선 형태
2. 최대토크 조건 유도
3. 최대토크 공식
4. 비례추이 설명
5. 기동토크와 최대토크

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '농형 유도전동기의 기동법을 5가지 설명하시오.',
        answer: '직입기동, Y-Δ기동, 기동보상기법, 리액터기동, 소프트스타터',
        prompt: `전기기사 전기기기 문제입니다.

문제: 농형 유도전동기의 기동법을 설명하시오.

다음 순서로 설명해주세요:
1. 직입기동의 문제점
2. Y-Δ기동의 원리와 특성
3. 기동보상기법
4. 리액터기동법
5. 인버터/소프트스타터 기동

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '권선형 유도전동기의 속도제어 방법을 설명하시오.',
        answer: '2차저항법, 종속접속법, 전압제어법, 주파수제어법',
        prompt: `전기기사 전기기기 문제입니다.

문제: 권선형 유도전동기의 속도제어 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 2차저항법 원리와 특성
2. 종속접속법 종류
3. 전압제어법
4. 주파수제어법 (VVVF)
5. 각 방법의 장단점 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '단상유도전동기가 자기기동을 하지 못하는 이유와 기동방법을 설명하시오.',
        answer: '이유: 교번자계(정회전+역회전), 정지시 합성토크=0. 기동: 분상기동, 반발기동, 세이딩코일',
        prompt: `전기기사 전기기기 문제입니다.

문제: 단상유도전동기의 기동 문제와 해결방법을 설명하시오.

다음 순서로 설명해주세요:
1. 단상의 교번자계
2. 이중회전자계 이론
3. 정지시 토크가 0인 이유
4. 기동방법들
5. 각 기동방식의 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '유도전동기의 원선도(Circle Diagram)에서 알 수 있는 것을 설명하시오.',
        answer: '출력, 토크, 효율, 역률, 슬립, 기동전류, 최대출력',
        prompt: `전기기사 전기기기 문제입니다.

문제: 유도전동기 원선도에서 알 수 있는 것을 설명하시오.

다음 순서로 설명해주세요:
1. 원선도의 작도 원리
2. 각 부분이 나타내는 물리량
3. 효율과 역률 읽기
4. 최대출력과 최대토크
5. 원선도 활용법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '유도전동기의 역률개선 방법을 설명하시오.',
        answer: '콘덴서 병렬접속, 동기조상기 사용, 인버터 구동',
        prompt: `전기기사 전기기기 문제입니다.

문제: 유도전동기의 역률개선 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 유도전동기 역률이 낮은 이유
2. 부하에 따른 역률 변화
3. 콘덴서 설치 방법
4. 필요 콘덴서 용량 계산
5. 경부하시 주의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '비례추이(Proportional Shifting)란 무엇인지 설명하시오.',
        answer: '2차저항 n배 증가시, 슬립 n배, 최대토크 슬립 n배, 최대토크는 불변',
        prompt: `전기기사 전기기기 문제입니다.

문제: 비례추이를 설명하시오.

다음 순서로 설명해주세요:
1. 비례추이의 정의
2. 2차저항 증가의 영향
3. 토크-슬립 곡선의 변화
4. 비례추이의 활용 (기동)
5. 비례추이를 이용한 속도제어

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '유도전동기의 제동방법 3가지를 설명하시오.',
        answer: '발전제동(회생제동), 역상제동(플러깅), 직류제동(단락제동)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 유도전동기의 제동방법을 설명하시오.

다음 순서로 설명해주세요:
1. 발전제동(회생제동) 원리
2. 역상제동(플러깅) 원리
3. 직류제동(단락제동) 원리
4. 각 제동방식의 특징
5. 적용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '특수 농형 유도전동기(이중농형, 심구형)의 원리를 설명하시오.',
        answer: '기동시 외부도체(저항↑), 운전시 내부도체(저항↓). 표피효과 이용',
        prompt: `전기기사 전기기기 문제입니다.

문제: 이중농형/심구형 유도전동기의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 일반 농형의 기동특성 문제
2. 이중농형의 구조
3. 표피효과 이용 원리
4. 기동시와 운전시 동작
5. 심구형과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'synchronous',
    name: '동기기',
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        id: 1,
        question: '동기발전기의 유기기전력 공식 E = 4.44fNΦk를 유도하시오.',
        answer: 'E = 4.44fNΦkw, kw: 권선계수(=kp×kd), f: 주파수, N: 권수',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기발전기의 유기기전력 공식을 유도하시오.

다음 순서로 설명해주세요:
1. 패러데이 법칙 기본
2. 평균값에서 실효값
3. 권선계수의 의미
4. 분포계수와 단절계수
5. 공식 유도 과정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '동기발전기의 전기자반작용을 역률별로 설명하시오.',
        answer: '역률1: 교차자화, 지상: 감자작용, 진상: 증자작용',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기발전기의 전기자반작용을 역률별로 설명하시오.

다음 순서로 설명해주세요:
1. 전기자반작용의 정의
2. 역률 1일 때 교차자화
3. 지상역률일 때 감자작용
4. 진상역률일 때 증자작용
5. 동기임피던스와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '동기발전기의 병렬운전 조건을 설명하시오.',
        answer: '기전력 크기, 주파수, 위상, 파형, 상회전방향이 같을 것',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기발전기의 병렬운전 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 각 조건의 이유
2. 조건 불만족시 문제점
3. 동기검정기 사용법
4. 동기화 과정
5. 부하분담

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '동기전동기의 V곡선을 설명하시오.',
        answer: '여자전류에 따른 전기자전류 변화. 정격여자: 역률1, 과여자: 진상, 부족여자: 지상',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기전동기의 V곡선을 설명하시오.

다음 순서로 설명해주세요:
1. V곡선의 형태와 의미
2. 정격여자 상태
3. 과여자 상태 (진상운전)
4. 부족여자 상태 (지상운전)
5. 조상기로서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '동기전동기의 기동법을 설명하시오.',
        answer: '자기기동법(제동권선), 기동전동기법, 저주파기동, 인버터기동',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기전동기의 기동법을 설명하시오.

다음 순서로 설명해주세요:
1. 동기전동기가 자기기동 못하는 이유
2. 제동권선에 의한 자기기동
3. 기동전동기법
4. 저주파기동법
5. 인버터 기동

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '동기임피던스(Synchronous Impedance)란 무엇인지 설명하시오.',
        answer: 'Zs = 전기자저항 + 동기리액턴스(누설+전기자반작용)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기임피던스를 설명하시오.

다음 순서로 설명해주세요:
1. 동기임피던스의 정의
2. 구성요소
3. 단락비와의 관계
4. 동기임피던스 측정법
5. 전압변동률 계산에 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '단락비(Short-Circuit Ratio)의 정의와 의미를 설명하시오.',
        answer: 'Ks = If₀/Ifs = 1/Xs(pu). 단락비 크면: 안정도↑, 전압변동↓, 기계크기↑',
        prompt: `전기기사 전기기기 문제입니다.

문제: 단락비의 정의와 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 단락비의 정의
2. 단락비와 동기임피던스 관계
3. 단락비가 큰 경우의 특성
4. 단락비가 작은 경우의 특성
5. 적정 단락비 값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '동기발전기의 부하각(Power Angle)과 출력의 관계를 설명하시오.',
        answer: 'P = EV·sinδ/Xs, 최대출력: δ=90°, 정상운전: δ<90°',
        prompt: `전기기사 전기기기 문제입니다.

문제: 동기발전기의 부하각과 출력 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 부하각의 정의
2. 출력 공식 유도
3. P-δ 특성곡선
4. 정태안정도
5. 탈조 현상

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '난조(Hunting) 현상과 대책을 설명하시오.',
        answer: '부하변동시 회전자 진동. 대책: 제동권선(댐퍼권선), 플라이휠',
        prompt: `전기기사 전기기기 문제입니다.

문제: 난조 현상과 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 난조의 정의
2. 발생 원인
3. 난조의 영향
4. 제동권선의 역할
5. 기타 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '돌극형과 원통형 동기기의 차이를 설명하시오.',
        answer: '돌극형: 저속대용량(수차발전기), 원통형: 고속(터빈발전기)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 돌극형과 원통형 동기기의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 돌극형의 구조와 특징
2. 원통형의 구조와 특징
3. 직축/횡축 리액턴스
4. 적용 분야
5. 릴럭턴스 토크

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'special',
    name: '정류기 및 특수기기',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '3상 전파정류회로의 평균출력전압을 구하시오.',
        answer: 'Vdc = 3√2·V/π × 6/π = 1.35V (이상적인 경우)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 3상 전파정류회로의 평균출력전압을 구하시오.

다음 순서로 설명해주세요:
1. 3상 전파정류 회로 구성
2. 적분을 통한 평균값 계산
3. 결과 공식
4. 3상 반파정류와 비교
5. 제어정류시 전압 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '인버터(Inverter)의 원리와 종류를 설명하시오.',
        answer: '직류→교류 변환. 전압형 인버터(정전압원), 전류형 인버터(정전류원)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 인버터의 원리와 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 인버터의 정의
2. 동작 원리
3. 전압형 인버터
4. 전류형 인버터
5. PWM 제어

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'VVVF(Variable Voltage Variable Frequency) 제어의 원리를 설명하시오.',
        answer: 'V/f 일정 제어로 자속 일정 유지. 저속: 전압↓주파수↓, 고속: 전압↑주파수↑',
        prompt: `전기기사 전기기기 문제입니다.

문제: VVVF 제어의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. VVVF 제어의 필요성
2. V/f 일정의 의미
3. 저속운전시 특성
4. 고속운전시 특성
5. 벡터제어와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사이리스터(Thyristor)의 동작원리와 특성을 설명하시오.',
        answer: 'PNPN 4층 구조, 게이트 트리거로 턴온, 전류차단으로 턴오프',
        prompt: `전기기사 전기기기 문제입니다.

문제: 사이리스터의 동작원리와 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 사이리스터 구조
2. 턴온 조건
3. 턴오프 조건
4. V-I 특성곡선
5. 게이트 제어

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '스테핑모터(Stepping Motor)의 종류와 특징을 설명하시오.',
        answer: 'VR형, PM형, HB형. 특징: 개루프위치제어, 펄스당 일정각도 회전',
        prompt: `전기기사 전기기기 문제입니다.

문제: 스테핑모터의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 스테핑모터의 원리
2. VR형 스테핑모터
3. PM형 스테핑모터
4. HB형 스테핑모터
5. 스텝각 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '서보모터(Servo Motor)의 원리와 특징을 설명하시오.',
        answer: '폐루프 위치/속도 제어. 특징: 고정밀 제어, 빠른 응답, 엔코더 피드백',
        prompt: `전기기사 전기기기 문제입니다.

문제: 서보모터의 원리와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 서보모터의 정의
2. 동작 원리
3. AC 서보모터
4. DC 서보모터
5. 스테핑모터와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: 'BLDC 모터(Brushless DC Motor)의 원리와 특징을 설명하시오.',
        answer: '영구자석 회전자, 전자정류. 특징: 브러시 없음, 저소음, 장수명',
        prompt: `전기기사 전기기기 문제입니다.

문제: BLDC 모터의 원리와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. BLDC 모터 구조
2. 전자정류 원리
3. 홀센서 역할
4. DC모터와의 비교
5. 적용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '초퍼(Chopper)의 원리와 종류를 설명하시오.',
        answer: '직류 전압 제어. 강압형(Buck), 승압형(Boost), 승강압형(Buck-Boost)',
        prompt: `전기기사 전기기기 문제입니다.

문제: 초퍼의 원리와 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 초퍼의 정의
2. 강압형 초퍼
3. 승압형 초퍼
4. 승강압형 초퍼
5. 듀티비와 출력전압

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '리니어모터(Linear Motor)의 원리와 적용분야를 설명하시오.',
        answer: '회전운동→직선운동 변환. 원리: 회전형 모터를 펼친 구조. 적용: 자기부상열차, 이송장치',
        prompt: `전기기사 전기기기 문제입니다.

문제: 리니어모터의 원리와 적용분야를 설명하시오.

다음 순서로 설명해주세요:
1. 리니어모터의 원리
2. 리니어 유도전동기
3. 리니어 동기전동기
4. 장단점
5. 적용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '전력용 반도체 소자의 종류를 비교하시오. (다이오드, SCR, GTO, IGBT)',
        answer: '다이오드:비제어, SCR:턴온제어, GTO:턴온/오프제어, IGBT:고속스위칭',
        prompt: `전기기사 전기기기 문제입니다.

문제: 전력용 반도체 소자를 비교하시오.

다음 순서로 설명해주세요:
1. 다이오드 특성
2. SCR(사이리스터) 특성
3. GTO 특성
4. IGBT 특성
5. 용도별 소자 선정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  }
];

export default function ElectricMachineryStudyPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('electric-machinery-completed');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('electric-machinery-completed', JSON.stringify([...newCompleted]));
  };


  const currentTopic = topics.find(t => t.id === activeTopic)!;
  const completedInTopic = currentTopic.questions.filter(
    q => completedQuestions.has(`${currentTopic.id}-${q.id}`)
  ).length;

  const totalCompleted = topics.reduce((acc, topic) => {
    return acc + topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-yellow-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-yellow-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-orange-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-orange-600">필기시험</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전기기기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">전기기기 학습</h1>
                <p className="text-orange-100">Electric Machinery - 기출문제 학습</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm">전체 진도율</p>
              <p className="text-2xl font-bold">{totalCompleted} / 50</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(totalCompleted / 50) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="bg-white border-b overflow-x-auto sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {topics.map(topic => {
              const completed = topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTopic === topic.id ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {topic.name}
                  <span className={`ml-2 text-xs ${completed === 10 ? 'text-green-500' : 'text-gray-400'}`}>{completed}/10</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${currentTopic.color} text-white`}>
            <h2 className="font-bold">{currentTopic.name}</h2>
            <p className="text-sm opacity-80">완료: {completedInTopic}/10</p>
          </div>
        </div>

        <div className="space-y-4">
          {currentTopic.questions.map((q, index) => {
            const isCompleted = completedQuestions.has(`${currentTopic.id}-${q.id}`);
            const isExpanded = expandedQuestion === q.id;

            return (
              <div key={q.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{q.question}</p>
                    </div>
                    <span className={`transform transition ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">정답:</p>
                      <p className="font-medium text-green-700 bg-green-50 p-3 rounded-lg">{q.answer}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex gap-2 flex-1">
                        <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-orange-500 hover:bg-orange-600 transition">🧡 Claude</a>
                        <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-green-600 hover:bg-green-700 transition">💚 ChatGPT</a>
                        <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-blue-500 hover:bg-blue-600 transition">💙 Gemini</a>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleComplete(currentTopic.id, q.id); }}
                        className={`px-6 py-3 rounded-lg font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
                      >
                        {isCompleted ? '완료 취소' : '완료 표시'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
