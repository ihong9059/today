'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'transmission',
    name: '송전선로 및 선로정수',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '154kV 송전선로의 1선당 인덕턴스가 1.2mH/km일 때, 긍장 100km 선로의 유도 리액턴스(60Hz)를 구하시오.',
        answer: 'XL = 2πfL = 2π×60×1.2×10⁻³×100 = 45.24Ω',
        prompt: `전기기사 전력공학 문제입니다.

문제: 154kV 송전선로의 1선당 인덕턴스가 1.2mH/km일 때, 긍장 100km 선로의 유도 리액턴스(60Hz)를 구하시오.

다음 순서로 설명해주세요:
1. 유도 리액턴스 공식: XL = 2πfL = ωL
2. 총 인덕턴스 계산: L = 1.2mH/km × 100km
3. 주파수 60Hz 대입
4. 계산 과정 및 단위 환산
5. 송전선로에서 인덕턴스의 영향 (전압강하, 안정도)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '복도체 방식을 채용하는 이유 3가지를 설명하시오.',
        answer: '1) 코로나 임계전압 상승, 2) 인덕턴스 감소, 3) 송전용량 증대',
        prompt: `전기기사 전력공학 문제입니다.

문제: 복도체 방식을 채용하는 이유 3가지를 설명하시오.

다음 순서로 설명해주세요:
1. 복도체(다도체)의 정의와 구조
2. 등가반경 증가로 인한 코로나 임계전압 상승 원리
3. 인덕턴스 감소와 정전용량 증가 원리
4. 송전용량 증대 효과
5. 복도체 사용 시 고려사항 (도체배치, 스페이서)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '코로나 임계전압 공식 Vc = 48.8×m₀×m₁×δ×r×ln(D/r) [kV]에서 각 기호의 의미를 설명하시오.',
        answer: 'm₀: 전선표면계수, m₁: 기상계수, δ: 상대공기밀도, r: 전선반경, D: 선간거리',
        prompt: `전기기사 전력공학 문제입니다.

문제: 코로나 임계전압 공식에서 각 기호의 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 코로나 현상의 정의와 발생 원리
2. 각 계수의 의미와 일반적인 값
   - m₀: 전선표면계수 (연선 0.8~0.87)
   - m₁: 기상계수 (맑은날 1.0, 비/눈 0.8)
   - δ: 상대공기밀도
3. 기하학적 요소 (r, D)의 영향
4. 코로나 손실 저감 대책
5. 실제 송전선로 설계시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '송전선로의 특성 임피던스가 400Ω, 전파정수가 0.001+j0.02일 때, 긍장 200km 선로의 감쇠정수와 위상정수를 구하시오.',
        answer: '감쇠정수 α = 0.001×200 = 0.2 Neper, 위상정수 β = 0.02×200 = 4 rad',
        prompt: `전기기사 전력공학 문제입니다.

문제: 전파정수가 0.001+j0.02일 때, 긍장 200km 선로의 감쇠정수와 위상정수를 구하시오.

다음 순서로 설명해주세요:
1. 전파정수(γ = α + jβ)의 정의
2. 감쇠정수(α)의 물리적 의미 - 전력손실
3. 위상정수(β)의 물리적 의미 - 위상변화
4. 거리에 따른 계산
5. 특성 임피던스와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '송전선로의 충전전류가 100A일 때, 충전용량[kVA]을 구하시오. (선간전압 154kV)',
        answer: 'Qc = √3 × V × Ic = √3 × 154 × 100 = 26,680 kVA ≒ 26.68 MVA',
        prompt: `전기기사 전력공학 문제입니다.

문제: 선간전압 154kV, 충전전류 100A일 때 충전용량을 구하시오.

다음 순서로 설명해주세요:
1. 충전전류의 정의와 발생 원인
2. 충전용량 공식: Qc = √3 × V × Ic
3. 계산 과정
4. 페란티 현상과의 관계
5. 충전용량 보상 방법 (분로리액터)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '연가(Transposition)를 하는 이유와 방법을 설명하시오.',
        answer: '3상 불평형 해소, 유도장해 감소. 방법: 선로를 3등분하여 각 상의 위치를 순환 배치',
        prompt: `전기기사 전력공학 문제입니다.

문제: 연가(Transposition)를 하는 이유와 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 연가의 정의
2. 연가가 필요한 이유
   - 선로정수 불평형 해소
   - 유도장해 감소
   - 통신선 유도전압 저감
3. 연가 방법 (완전연가, 부분연가)
4. 연가 구간 결정
5. 연가 미실시 시 문제점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: 'ACSR 410mm² 전선의 의미를 설명하시오.',
        answer: 'Aluminum Conductor Steel Reinforced, 강심 알루미늄 연선, 공칭단면적 410mm²',
        prompt: `전기기사 전력공학 문제입니다.

문제: ACSR 410mm² 전선의 의미를 설명하시오.

다음 순서로 설명해주세요:
1. ACSR의 풀네임과 의미
2. 강심 알루미늄 연선의 구조
3. 공칭단면적의 의미
4. ACSR 전선의 장점
5. 다른 전선 종류와의 비교 (AAC, AAAC, TACSR)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '이도(Sag)가 10m, 경간(Span)이 400m일 때, 전선의 실제 길이를 구하시오.',
        answer: 'L = S + 8D²/3S = 400 + 8×10²/(3×400) = 400.67m',
        prompt: `전기기사 전력공학 문제입니다.

문제: 이도 10m, 경간 400m일 때 전선의 실제 길이를 구하시오.

다음 순서로 설명해주세요:
1. 이도(Sag)의 정의
2. 전선 실장 공식: L = S + 8D²/3S
3. 계산 과정
4. 이도에 영향을 주는 요소
5. 적정 이도 유지의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '표피효과(Skin Effect)란 무엇이며, 영향을 주는 요소를 설명하시오.',
        answer: '교류 전류가 도체 표면에 집중하는 현상. 영향요소: 주파수, 도체 크기, 투자율, 도전율',
        prompt: `전기기사 전력공학 문제입니다.

문제: 표피효과란 무엇이며, 영향을 주는 요소를 설명하시오.

다음 순서로 설명해주세요:
1. 표피효과의 정의와 발생 원리
2. 침투깊이(Skin Depth) 공식
3. 영향을 주는 요소들
4. 표피효과로 인한 문제점 (유효저항 증가)
5. 표피효과 저감 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '가공지선(Ground Wire)의 역할 3가지를 설명하시오.',
        answer: '1) 직격뢰 차폐, 2) 유도뢰 감소, 3) 통신선 유도장해 경감',
        prompt: `전기기사 전력공학 문제입니다.

문제: 가공지선의 역할 3가지를 설명하시오.

다음 순서로 설명해주세요:
1. 가공지선의 정의와 설치 위치
2. 직격뢰 차폐 원리 (차폐각)
3. 유도뢰 감소 원리
4. 통신선 유도장해 경감 원리
5. 가공지선 종류 (OPGW, 일반지선)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'power-flow',
    name: '송전특성 및 전력원선도',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '송전단 전압 Vs=160kV, 수전단 전압 Vr=154kV, 리액턴스 X=50Ω일 때, 전송 가능한 최대전력을 구하시오.',
        answer: 'Pmax = VsVr/X = 160×154/50 = 492.8MW',
        prompt: `전기기사 전력공학 문제입니다.

문제: Vs=160kV, Vr=154kV, X=50Ω일 때 최대전력을 구하시오.

다음 순서로 설명해주세요:
1. 송전전력 공식: P = VsVr×sinδ/X
2. 최대전력 조건: δ = 90°
3. 계산 과정
4. 정태안정도와의 관계
5. 안정도 여유 확보 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '조상설비의 종류와 각각의 특징을 설명하시오.',
        answer: '동기조상기(연속조정, 과부하내량), 전력용콘덴서(경제적, 단계조정), 분로리액터(충전전류보상)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 조상설비의 종류와 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 조상설비의 필요성
2. 동기조상기의 원리와 특징
3. 전력용 콘덴서의 원리와 특징
4. 분로리액터의 원리와 특징
5. SVC, STATCOM 등 최신 조상설비

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '전력원선도(Power Circle Diagram)에서 알 수 있는 것을 5가지 설명하시오.',
        answer: '유효전력, 무효전력, 역률, 송전손실, 전압조정률',
        prompt: `전기기사 전력공학 문제입니다.

문제: 전력원선도에서 알 수 있는 것을 설명하시오.

다음 순서로 설명해주세요:
1. 전력원선도의 정의와 작도 방법
2. 송전단 원선도와 수전단 원선도
3. 유효전력, 무효전력 읽는 법
4. 역률과 전압조정 분석
5. 실제 활용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '페란티 현상(Ferranti Effect)이란 무엇이며, 대책을 설명하시오.',
        answer: '경부하시 수전단 전압이 송전단보다 높아지는 현상. 대책: 분로리액터 설치',
        prompt: `전기기사 전력공학 문제입니다.

문제: 페란티 현상과 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 페란티 현상의 정의
2. 발생 원인 (충전전류, 경부하)
3. 발생 조건과 전압상승률
4. 대책 방법
5. 장거리 송전선로에서의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '단거리, 중거리, 장거리 송전선로의 구분 기준과 각각의 등가회로를 설명하시오.',
        answer: '단거리(<80km): 집중정수, 중거리(80~240km): π형/T형, 장거리(>240km): 분포정수',
        prompt: `전기기사 전력공학 문제입니다.

문제: 송전선로 거리별 구분과 등가회로를 설명하시오.

다음 순서로 설명해주세요:
1. 거리별 구분 기준
2. 단거리 송전선로 등가회로
3. 중거리 송전선로 π형, T형 등가회로
4. 장거리 송전선로 분포정수 회로
5. 각 등가회로의 특성과 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '전압조정률(Voltage Regulation)이 5%일 때의 의미와 계산식을 설명하시오.',
        answer: 'ε = (Vs-Vr)/Vr × 100 = 5%. 송전단 전압이 수전단보다 5% 높다는 의미',
        prompt: `전기기사 전력공학 문제입니다.

문제: 전압조정률 5%의 의미와 계산식을 설명하시오.

다음 순서로 설명해주세요:
1. 전압조정률의 정의
2. 계산 공식
3. 전압조정률에 영향을 주는 요소
4. 전압조정률 개선 방법
5. 허용 전압조정률 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '역률 0.8 지상에서 0.95 지상으로 개선할 때 필요한 콘덴서 용량을 구하시오. (부하 1000kW)',
        answer: 'Qc = P(tanθ₁-tanθ₂) = 1000×(0.75-0.33) = 420kvar',
        prompt: `전기기사 전력공학 문제입니다.

문제: 역률 0.8→0.95 개선시 필요한 콘덴서 용량을 구하시오.

다음 순서로 설명해주세요:
1. 역률각 계산: cosθ에서 tanθ 구하기
2. 필요 무효전력 계산 공식
3. 계산 과정
4. 역률 개선의 효과
5. 과보상 시 문제점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '정태안정도와 과도안정도의 차이를 설명하시오.',
        answer: '정태안정도: 서서히 변하는 부하에 대한 안정도, 과도안정도: 급격한 외란(단락, 탈락)에 대한 안정도',
        prompt: `전기기사 전력공학 문제입니다.

문제: 정태안정도와 과도안정도의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 전력계통 안정도의 정의
2. 정태안정도의 정의와 특성
3. 과도안정도의 정의와 특성
4. 안정도 향상 대책
5. 동태안정도와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '4단자 정수 A, B, C, D에서 무부하시 수전단 전압 Vr = Vs/A의 관계를 유도하시오.',
        answer: 'Vs = AVr + BIr, 무부하시 Ir=0이므로 Vs = AVr, 따라서 Vr = Vs/A',
        prompt: `전기기사 전력공학 문제입니다.

문제: 4단자 정수에서 무부하시 Vr = Vs/A 관계를 유도하시오.

다음 순서로 설명해주세요:
1. 4단자 정수의 정의
2. 4단자 방정식
3. 무부하 조건 (Ir = 0)
4. 유도 과정
5. 각 정수의 물리적 의미

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '직렬콘덴서 보상의 효과와 문제점을 설명하시오.',
        answer: '효과: 리액턴스 보상으로 송전용량 증대, 안정도 향상. 문제점: 저주파 공진, 고조파 문제',
        prompt: `전기기사 전력공학 문제입니다.

문제: 직렬콘덴서 보상의 효과와 문제점을 설명하시오.

다음 순서로 설명해주세요:
1. 직렬콘덴서 보상 원리
2. 송전용량 증대 효과
3. 안정도 향상 효과
4. 문제점 (SSR, 보호협조)
5. 문제점 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'grounding',
    name: '중성점 접지방식',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '비접지 방식의 장단점을 설명하시오.',
        answer: '장점: 1선 지락시 계속운전 가능. 단점: 이상전압 발생, 지락검출 곤란',
        prompt: `전기기사 전력공학 문제입니다.

문제: 비접지 방식의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 비접지 방식의 정의
2. 장점 상세 설명
3. 단점 상세 설명
4. 적용 계통 (배전계통)
5. 다른 접지방식과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '유효접지 조건을 설명하시오.',
        answer: 'X₀/X₁ ≤ 3, R₀/X₁ ≤ 1 (건전상 전압상승 1.3배 이하)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 유효접지 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 유효접지의 정의
2. X₀/X₁ ≤ 3 조건의 의미
3. R₀/X₁ ≤ 1 조건의 의미
4. 건전상 전압상승 제한
5. 유효접지의 적용 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '소호리액터 접지방식의 원리와 동조조건을 설명하시오.',
        answer: '지락전류를 보상하여 소호. 동조조건: 3ωCE = 1/(ωL), 즉 ωL = 1/(3ωC)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 소호리액터 접지방식의 원리와 동조조건을 설명하시오.

다음 순서로 설명해주세요:
1. 소호리액터의 정의와 구조
2. 지락전류 보상 원리
3. 동조조건 유도
4. 과보상, 저보상의 특성
5. 적용 계통과 장단점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '저항접지 방식의 저항값 결정 시 고려사항을 설명하시오.',
        answer: '지락전류 제한, 계전기 동작확보, 이상전압 억제, 통신선 유도장해',
        prompt: `전기기사 전력공학 문제입니다.

문제: 저항접지 방식의 저항값 결정 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 저항접지의 정의
2. 지락전류 제한 목적
3. 보호계전기 동작 확보
4. 이상전압 억제
5. 실제 저항값 결정 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '1선 지락시 건전상 전압상승률을 접지방식별로 비교하시오.',
        answer: '비접지/소호리액터: √3배(173%), 저항접지: 1.35배, 직접접지: 1.3배 이하',
        prompt: `전기기사 전력공학 문제입니다.

문제: 1선 지락시 건전상 전압상승률을 접지방식별로 비교하시오.

다음 순서로 설명해주세요:
1. 건전상 전압상승의 원인
2. 비접지 계통의 전압상승
3. 저항접지 계통의 전압상승
4. 직접접지 계통의 전압상승
5. 절연협조와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '영상전류, 정상전류, 역상전류의 정의와 특성을 설명하시오.',
        answer: '영상(I₀): 3상 동상, 정상(I₁): 정상순서, 역상(I₂): 역순서',
        prompt: `전기기사 전력공학 문제입니다.

문제: 대칭좌표법의 영상, 정상, 역상 성분을 설명하시오.

다음 순서로 설명해주세요:
1. 대칭좌표법의 필요성
2. 영상분(Zero Sequence)의 특성
3. 정상분(Positive Sequence)의 특성
4. 역상분(Negative Sequence)의 특성
5. 고장계산에의 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '지락전류가 100A, 대지저항률이 100Ω·m일 때, 접지저항 10Ω인 접지극의 접촉전압을 구하시오.',
        answer: 'V = I×R = 100×10 = 1000V (위험전압)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 지락전류 100A, 접지저항 10Ω일 때 접촉전압을 구하시오.

다음 순서로 설명해주세요:
1. 접촉전압의 정의
2. 계산 공식과 과정
3. 허용 접촉전압 기준
4. 접촉전압 저감 대책
5. 보폭전압과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '송전계통과 배전계통의 접지방식 차이와 그 이유를 설명하시오.',
        answer: '송전: 직접접지(단락용량 크고 이상전압 억제), 배전: 비접지 또는 저항접지(계속운전)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 송전계통과 배전계통의 접지방식 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 송전계통 접지방식과 선택 이유
2. 배전계통 접지방식과 선택 이유
3. 접지방식 선택 시 고려사항
4. 국내 계통의 접지방식
5. 향후 변화 추세

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '접지계수(Earthing Factor)의 정의와 계산식을 설명하시오.',
        answer: 'EF = 지락시 건전상전압/정상시 상전압. 유효접지시 1.3 이하',
        prompt: `전기기사 전력공학 문제입니다.

문제: 접지계수의 정의와 계산식을 설명하시오.

다음 순서로 설명해주세요:
1. 접지계수의 정의
2. 계산 공식
3. 유효접지와의 관계
4. 피뢰기 정격과의 관계
5. 절연협조에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: 'GPT(Ground Potential Transformer)의 역할과 결선방식을 설명하시오.',
        answer: '영상전압 검출용. 1차: Y결선(중성점 접지), 2차: 개방Δ결선',
        prompt: `전기기사 전력공학 문제입니다.

문제: GPT의 역할과 결선방식을 설명하시오.

다음 순서로 설명해주세요:
1. GPT의 정의와 역할
2. 1차측 Y결선 이유
3. 2차측 개방Δ결선 이유
4. 영상전압 검출 원리
5. 지락보호계전기와의 연계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'overvoltage',
    name: '이상전압 및 방호대책',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '이상전압의 종류를 발생원인에 따라 분류하시오.',
        answer: '내부이상전압(개폐서지, 아크접지), 외부이상전압(직격뢰, 유도뢰)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 이상전압의 종류를 분류하시오.

다음 순서로 설명해주세요:
1. 이상전압의 정의
2. 내부이상전압의 종류와 원인
3. 외부이상전압의 종류와 원인
4. 각 이상전압의 크기와 특성
5. 보호대책 개요

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '피뢰기(Arrester)의 동작원리와 구비조건을 설명하시오.',
        answer: '이상전압시 방전, 속류차단. 구비조건: 제한전압↓, 방전개시전압↓, 속류차단능력↑',
        prompt: `전기기사 전력공학 문제입니다.

문제: 피뢰기의 동작원리와 구비조건을 설명하시오.

다음 순서로 설명해주세요:
1. 피뢰기의 정의와 역할
2. 동작 원리 (방전-속류차단)
3. 구비조건 상세
4. 피뢰기 종류 (갭형, 갭리스형)
5. 설치위치와 보호범위

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'BIL(Basic Impulse Insulation Level)의 정의와 결정방법을 설명하시오.',
        answer: '기기가 견딜 수 있는 기준충격절연강도. 피뢰기 제한전압에 보호마진 적용',
        prompt: `전기기사 전력공학 문제입니다.

문제: BIL의 정의와 결정방법을 설명하시오.

다음 순서로 설명해주세요:
1. BIL의 정의
2. 표준충격파 (1.2/50μs)
3. BIL 결정 과정
4. 절연협조와의 관계
5. 전압등급별 BIL 값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '차폐각(Shielding Angle)이란 무엇이며, 적정 차폐각을 설명하시오.',
        answer: '가공지선과 최외측 도체가 이루는 각도. 송전선로: 30° 이하, 변전소: 45° 이하',
        prompt: `전기기사 전력공학 문제입니다.

문제: 차폐각의 정의와 적정 차폐각을 설명하시오.

다음 순서로 설명해주세요:
1. 차폐각의 정의
2. 차폐 원리
3. 적정 차폐각 기준
4. 차폐실패의 영향
5. 역섬락(Back Flashover)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '개폐서지(Switching Surge)의 발생원인과 억제대책을 설명하시오.',
        answer: '원인: 차단기 개폐, 무부하선로 투입. 대책: 투입저항, 분로리액터, 피뢰기',
        prompt: `전기기사 전력공학 문제입니다.

문제: 개폐서지의 발생원인과 억제대책을 설명하시오.

다음 순서로 설명해주세요:
1. 개폐서지의 정의
2. 발생 원인 상세
3. 개폐서지의 크기와 특성
4. 억제대책
5. 재점호와 재발호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '진행파(Traveling Wave)의 반사와 투과 계수를 구하는 공식을 설명하시오.',
        answer: '반사계수 ρ = (Z₂-Z₁)/(Z₂+Z₁), 투과계수 τ = 2Z₂/(Z₂+Z₁)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 진행파의 반사/투과 계수 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 진행파의 정의
2. 반사계수 유도
3. 투과계수 유도
4. 특수조건 (개방단, 단락단)
5. 변압기 접속점에서의 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '절연협조(Insulation Coordination)의 목적과 원칙을 설명하시오.',
        answer: '목적: 경제적인 절연설계. 원칙: 피뢰기 → BIL → 기기절연 순으로 보호마진 확보',
        prompt: `전기기사 전력공학 문제입니다.

문제: 절연협조의 목적과 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 절연협조의 정의
2. 목적 (경제성과 신뢰성)
3. 절연협조 원칙
4. 보호마진 설정
5. 절연협조 절차

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '뇌충격파 표준파형 1.2/50μs의 의미를 설명하시오.',
        answer: '파두장 1.2μs, 파미장 50μs (파고값 도달시간과 반감시간)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 뇌충격파 표준파형의 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 뇌충격파의 정의
2. 파두장, 파미장의 정의
3. 1.2/50μs의 의미
4. 개폐충격파와의 비교
5. 충격시험 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '아크혼(Arcing Horn)의 역할과 설치위치를 설명하시오.',
        answer: '애자련 보호, 아크 유도. 설치위치: 애자련 양단',
        prompt: `전기기사 전력공학 문제입니다.

문제: 아크혼의 역할과 설치위치를 설명하시오.

다음 순서로 설명해주세요:
1. 아크혼의 정의
2. 애자련 보호 원리
3. 아크 유도 역할
4. 설치위치와 간격 결정
5. 다른 보호장치와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '역섬락(Back Flashover)의 발생원인과 방지대책을 설명하시오.',
        answer: '원인: 탑각전위상승으로 철탑→도체 역방향 섬락. 대책: 탑각접지저항 저감',
        prompt: `전기기사 전력공학 문제입니다.

문제: 역섬락의 발생원인과 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 역섬락의 정의
2. 발생 메커니즘
3. 탑각전위상승 원인
4. 방지대책 상세
5. 송전선로 뇌해 방지 종합대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'distribution',
    name: '배전방식 및 배전선로',
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        id: 1,
        question: '방사상 배전방식과 환상 배전방식의 장단점을 비교하시오.',
        answer: '방사상: 단순/저렴/보호용이, 신뢰도↓. 환상: 신뢰도↑, 복잡/고가',
        prompt: `전기기사 전력공학 문제입니다.

문제: 방사상과 환상 배전방식을 비교하시오.

다음 순서로 설명해주세요:
1. 방사상 배전방식 구조와 특징
2. 환상 배전방식 구조와 특징
3. 장단점 상세 비교
4. 적용 대상
5. 네트워크 배전방식과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '배전선로 전압강하율 계산공식을 설명하시오. (단상2선식 기준)',
        answer: 'e = 2IR×cosθ + 2IX×sinθ = 2I(Rcosθ + Xsinθ) [V]',
        prompt: `전기기사 전력공학 문제입니다.

문제: 배전선로 전압강하율 계산공식을 설명하시오.

다음 순서로 설명해주세요:
1. 전압강하의 정의
2. 단상2선식 전압강하 공식
3. 3상3선식 전압강하 공식
4. 전압강하율 허용기준
5. 전압강하 저감대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '배전선로 손실경감 대책을 5가지 설명하시오.',
        answer: '고압배전, 역률개선, 굵은전선, 부하균형, 선로 단축',
        prompt: `전기기사 전력공학 문제입니다.

문제: 배전선로 손실경감 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 배전손실의 종류
2. 고압배전의 효과
3. 역률개선의 효과
4. 전선 굵기 증대 효과
5. 기타 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '뱅킹(Banking) 방식의 장단점을 설명하시오.',
        answer: '장점: 변압기 이용률↑, 전압변동↓. 단점: 보호협조 복잡, 단락전류↑',
        prompt: `전기기사 전력공학 문제입니다.

문제: 뱅킹 방식의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 뱅킹 방식의 정의
2. 장점 상세 설명
3. 단점 상세 설명
4. 적용 조건
5. 순환전류 문제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '주상변압기 용량 선정시 고려사항을 설명하시오.',
        answer: '부하용량, 부하증가율, 부하불평형, 과부하내량, 역률',
        prompt: `전기기사 전력공학 문제입니다.

문제: 주상변압기 용량 선정시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 부하용량 산정
2. 부하증가율 고려
3. 부하불평형 고려
4. 과부하 내량
5. 표준용량 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '자동전압조정기(AVR)의 종류와 동작원리를 설명하시오.',
        answer: '유도전압조정기, 탭절환형. 원리: 전압검출→비교→보상권선 조정',
        prompt: `전기기사 전력공학 문제입니다.

문제: 자동전압조정기의 종류와 동작원리를 설명하시오.

다음 순서로 설명해주세요:
1. AVR의 필요성
2. 유도전압조정기 원리
3. 탭절환형 AVR 원리
4. 설치위치
5. SVR과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '지중배전선로와 가공배전선로를 비교하시오.',
        answer: '지중: 미관↑, 신뢰도↑, 고가, 고장수리 곤란. 가공: 저가, 보수용이, 기상영향',
        prompt: `전기기사 전력공학 문제입니다.

문제: 지중배전선로와 가공배전선로를 비교하시오.

다음 순서로 설명해주세요:
1. 가공배전선로 특징
2. 지중배전선로 특징
3. 경제성 비교
4. 신뢰성 비교
5. 적용 지역

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '개폐기(Switch)의 종류와 용도를 설명하시오.',
        answer: 'ASS(자동고장구분), LBS(부하개폐), COS(컷아웃스위치), 리클로저',
        prompt: `전기기사 전력공학 문제입니다.

문제: 배전선로 개폐기의 종류와 용도를 설명하시오.

다음 순서로 설명해주세요:
1. ASS (자동고장구분개폐기)
2. LBS (부하개폐기)
3. COS (컷아웃스위치)
4. 리클로저
5. 섹셔널라이저

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '스팟네트워크 배전방식의 구성과 장단점을 설명하시오.',
        answer: '구성: 복수회선+네트워크변압기+프로텍터. 장점: 고신뢰도, 무정전. 단점: 고가',
        prompt: `전기기사 전력공학 문제입니다.

문제: 스팟네트워크 배전방식을 설명하시오.

다음 순서로 설명해주세요:
1. 스팟네트워크의 정의
2. 구성요소
3. 동작원리
4. 장단점
5. 적용 대상

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '수용률, 부하율, 부등률의 정의와 관계를 설명하시오.',
        answer: '수용률=최대수용전력/설비용량, 부하율=평균전력/최대전력, 부등률=개별최대합/합성최대',
        prompt: `전기기사 전력공학 문제입니다.

문제: 수용률, 부하율, 부등률을 설명하시오.

다음 순서로 설명해주세요:
1. 수용률의 정의와 계산
2. 부하율의 정의와 계산
3. 부등률의 정의와 계산
4. 세 지표의 관계
5. 실제 적용 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'generation',
    name: '발전공학',
    color: 'from-indigo-500 to-blue-600',
    questions: [
      {
        id: 1,
        question: '수력발전소의 유효낙차 계산공식을 설명하시오.',
        answer: 'He = Hg - hl = 총낙차 - 손실낙차',
        prompt: `전기기사 전력공학 문제입니다.

문제: 수력발전소의 유효낙차 계산공식을 설명하시오.

다음 순서로 설명해주세요:
1. 총낙차(Gross Head)의 정의
2. 손실낙차의 종류
3. 유효낙차 계산
4. 출력 공식: P = 9.8QHη
5. 낙차 증대 방안

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '양수발전소의 역할과 경제성을 설명하시오.',
        answer: '역할: 첨두부하 담당, 계통안정. 경제성: 심야전력 이용, 피크 대응',
        prompt: `전기기사 전력공학 문제입니다.

문제: 양수발전소의 역할과 경제성을 설명하시오.

다음 순서로 설명해주세요:
1. 양수발전의 원리
2. 첨두부하 담당 역할
3. 계통안정 기여
4. 경제성 분석
5. 국내 양수발전소 현황

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '화력발전소의 열효율 향상 대책을 설명하시오.',
        answer: '재열사이클, 재생사이클, 복합발전, 초초임계압 적용',
        prompt: `전기기사 전력공학 문제입니다.

문제: 화력발전소의 열효율 향상 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 열효율의 정의
2. 재열사이클
3. 재생사이클
4. 복합발전(CCPP)
5. 초초임계압(USC)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '원자력발전소에서 사용되는 감속재와 냉각재의 종류를 설명하시오.',
        answer: '감속재: 경수, 중수, 흑연. 냉각재: 경수, 중수, CO₂, Na',
        prompt: `전기기사 전력공학 문제입니다.

문제: 원자력발전소의 감속재와 냉각재를 설명하시오.

다음 순서로 설명해주세요:
1. 감속재의 역할
2. 감속재 종류별 특성
3. 냉각재의 역할
4. 냉각재 종류별 특성
5. 노형별 사용 현황

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '수차의 비속도(Specific Speed)란 무엇이며, 수차 선정에 어떻게 활용되는지 설명하시오.',
        answer: 'Ns = NP^0.5/H^1.25, 비속도에 따라 펠턴(저), 프란시스(중), 프로펠러(고) 선정',
        prompt: `전기기사 전력공학 문제입니다.

문제: 수차의 비속도 정의와 활용을 설명하시오.

다음 순서로 설명해주세요:
1. 비속도의 정의
2. 비속도 계산 공식
3. 수차 종류별 비속도 범위
4. 수차 선정 방법
5. 비속도와 캐비테이션 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '조속기(Governor)의 역할과 동작원리를 설명하시오.',
        answer: '역할: 주파수 일정 유지. 원리: 속도변화 검출→밸브 조정→출력 조정',
        prompt: `전기기사 전력공학 문제입니다.

문제: 조속기의 역할과 동작원리를 설명하시오.

다음 순서로 설명해주세요:
1. 조속기의 필요성
2. 기계식 조속기 원리
3. 전자식 조속기 원리
4. 속도조정률
5. 부하분담

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '터빈 종류별 특성을 비교하시오. (충동, 반동)',
        answer: '충동터빈: 노즐에서 팽창, 압력일정. 반동터빈: 노즐+날개에서 팽창',
        prompt: `전기기사 전력공학 문제입니다.

문제: 충동터빈과 반동터빈을 비교하시오.

다음 순서로 설명해주세요:
1. 충동터빈의 원리
2. 반동터빈의 원리
3. 압력/속도 변화 비교
4. 적용 분야
5. 복합형 터빈

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '캐비테이션(Cavitation) 현상과 방지대책을 설명하시오.',
        answer: '현상: 기포발생→붕괴로 진동/침식. 대책: 흡출관 설계, 비속도 제한',
        prompt: `전기기사 전력공학 문제입니다.

문제: 캐비테이션 현상과 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 캐비테이션의 정의
2. 발생 원인
3. 피해 증상
4. 방지대책
5. 토마(Thoma) 계수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '연료전지의 원리와 종류를 설명하시오.',
        answer: '원리: 수소+산소→전기+물 (전기화학반응). 종류: PEMFC, SOFC, MCFC, PAFC',
        prompt: `전기기사 전력공학 문제입니다.

문제: 연료전지의 원리와 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 연료전지의 기본 원리
2. 각 종류별 특성
3. 효율 비교
4. 적용 분야
5. 장단점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '풍력발전의 출력 공식과 베츠한계를 설명하시오.',
        answer: 'P = 0.5ρAV³Cp, 베츠한계: Cp(max) = 0.593 (59.3%)',
        prompt: `전기기사 전력공학 문제입니다.

문제: 풍력발전의 출력 공식과 베츠한계를 설명하시오.

다음 순서로 설명해주세요:
1. 풍력발전 출력 공식
2. 각 변수의 의미
3. 출력계수(Cp) 정의
4. 베츠한계 유도
5. 실제 풍력터빈의 효율

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  }
];

export default function PowerEngineeringStudyPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('power-engineering-completed');
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
    localStorage.setItem('power-engineering-completed', JSON.stringify([...newCompleted]));
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
      {/* Header */}
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
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-green-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-green-600">필기시험</a>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">전력공학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">전력공학 학습</h1>
                <p className="text-green-100">Electric Power Engineering - 기출문제 학습</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">전체 진도율</p>
              <p className="text-2xl font-bold">{totalCompleted} / 60</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(totalCompleted / 60) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Selector */}

      {/* Topic Tabs */}
      <div className="bg-white border-b overflow-x-auto sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {topics.map(topic => {
              const completed = topic.questions.filter(
                q => completedQuestions.has(`${topic.id}-${q.id}`)
              ).length;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                    activeTopic === topic.id
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {topic.name}
                  <span className={`ml-2 text-xs ${completed === 10 ? 'text-green-500' : 'text-gray-400'}`}>
                    {completed}/10
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions */}
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
              <div
                key={q.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition ${
                  isCompleted ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{q.question}</p>
                    </div>
                    <span className={`transform transition ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(currentTopic.id, q.id);
                        }}
                        className={`px-6 py-3 rounded-lg font-medium transition ${
                          isCompleted
                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
