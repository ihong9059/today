'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'rlc-circuit',
    name: 'R-L-C 회로 해석',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: 'RLC 직렬회로에서 임피던스 Z와 위상각 θ를 구하는 공식을 설명하시오.',
        answer: 'Z = √(R² + (XL-XC)²), θ = tan⁻¹((XL-XC)/R)',
        prompt: `전기기사 회로이론 문제입니다.

문제: RLC 직렬회로에서 임피던스와 위상각 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 임피던스의 정의
2. 저항, 유도 리액턴스, 용량 리액턴스
3. 임피던스 공식 유도
4. 위상각의 의미와 계산
5. 역률과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'RLC 병렬회로에서 어드미턴스 Y와 전류를 구하는 공식을 설명하시오.',
        answer: 'Y = √(G² + (BL-BC)²), I = V×Y',
        prompt: `전기기사 회로이론 문제입니다.

문제: RLC 병렬회로에서 어드미턴스와 전류 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 어드미턴스의 정의
2. 컨덕턴스와 서셉턴스
3. 어드미턴스 공식 유도
4. 전류 계산
5. 직렬회로와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'R=3Ω, XL=8Ω, XC=4Ω인 직렬회로의 임피던스, 역률, 위상각을 구하시오.',
        answer: 'Z = √(9+16) = 5Ω, cosθ = 3/5 = 0.6, θ = 53.13°',
        prompt: `전기기사 회로이론 문제입니다.

문제: R=3Ω, XL=8Ω, XC=4Ω인 직렬회로의 임피던스, 역률, 위상각을 구하시오.

다음 순서로 설명해주세요:
1. 합성 리액턴스 계산: XL-XC
2. 임피던스 계산
3. 역률 계산
4. 위상각 계산
5. 유도성/용량성 판정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '최대전력전달 조건과 최대전력값을 설명하시오.',
        answer: '조건: ZL = Zs* (켤레복소수), Pmax = V²/(4Rs)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 최대전력전달 조건과 최대전력값을 설명하시오.

다음 순서로 설명해주세요:
1. 전력전달의 개념
2. 최대전력전달 조건 유도
3. 순저항 회로의 조건
4. 복소 임피던스 회로의 조건
5. 최대전력 공식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '테브난(Thevenin) 등가회로와 노튼(Norton) 등가회로의 관계를 설명하시오.',
        answer: 'Vth = In×Zn, Zth = Zn, In = Vth/Zth',
        prompt: `전기기사 회로이론 문제입니다.

문제: 테브난과 노튼 등가회로의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 테브난 등가회로 정의
2. 노튼 등가회로 정의
3. 상호 변환 공식
4. 등가회로 구하는 방법
5. 적용 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '중첩의 원리(Superposition Theorem)를 설명하시오.',
        answer: '여러 전원이 있는 선형회로에서 각 전원에 의한 응답의 합이 전체 응답',
        prompt: `전기기사 회로이론 문제입니다.

문제: 중첩의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 중첩의 원리 정의
2. 적용 조건 (선형회로)
3. 해석 절차
4. 전압원, 전류원 처리 방법
5. 적용 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '밀만의 정리(Millman Theorem)를 설명하고 공식을 유도하시오.',
        answer: 'V = (V₁/Z₁ + V₂/Z₂ + ...)/(1/Z₁ + 1/Z₂ + ...) = ΣVY/ΣY',
        prompt: `전기기사 회로이론 문제입니다.

문제: 밀만의 정리와 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 밀만의 정리 정의
2. 적용 회로 조건
3. 공식 유도
4. 적용 방법
5. 계산 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '브리지 회로의 평형 조건을 설명하시오.',
        answer: 'Z₁×Z₄ = Z₂×Z₃ (대각선 임피던스의 곱이 같음)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 브리지 회로의 평형 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 휘트스톤 브리지 구조
2. 평형 조건 유도
3. 교류 브리지 평형 조건
4. 브리지 종류 (맥스웰, 헤이)
5. 응용 분야

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '키르히호프 법칙(KVL, KCL)을 설명하시오.',
        answer: 'KVL: 폐회로 전압합=0, KCL: 노드 전류합=0',
        prompt: `전기기사 회로이론 문제입니다.

문제: 키르히호프 법칙을 설명하시오.

다음 순서로 설명해주세요:
1. 전압법칙(KVL) 정의
2. 전류법칙(KCL) 정의
3. 물리적 의미
4. 회로해석 적용
5. 행렬을 이용한 해석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: 'Y-Δ 변환 공식을 유도하시오.',
        answer: 'ZY = Z₁Z₂/(Z₁+Z₂+Z₃), ZΔ = (Z₁Z₂+Z₂Z₃+Z₃Z₁)/Z₁',
        prompt: `전기기사 회로이론 문제입니다.

문제: Y-Δ 변환 공식을 유도하시오.

다음 순서로 설명해주세요:
1. Y결선과 Δ결선 구조
2. Y→Δ 변환 공식
3. Δ→Y 변환 공식
4. 대칭인 경우 공식
5. 변환 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'resonance',
    name: '공진회로',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '직렬공진 조건과 공진주파수를 구하시오.',
        answer: 'XL = XC일 때 공진, f₀ = 1/(2π√LC)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 직렬공진 조건과 공진주파수를 구하시오.

다음 순서로 설명해주세요:
1. 직렬공진의 정의
2. 공진 조건 유도
3. 공진주파수 공식
4. 공진시 임피던스와 전류
5. 공진시 전압 분포

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '선택도(Q, Quality Factor)의 정의와 의미를 설명하시오.',
        answer: 'Q = ω₀L/R = 1/(ω₀CR) = f₀/BW, Q가 클수록 선택성 좋음',
        prompt: `전기기사 회로이론 문제입니다.

문제: 선택도 Q의 정의와 의미를 설명하시오.

다음 순서로 설명해주세요:
1. Q의 정의
2. Q 계산 공식들
3. Q와 대역폭의 관계
4. Q가 큰 회로의 특성
5. 실제 응용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '병렬공진회로의 공진조건과 특성을 설명하시오.',
        answer: 'BL = BC일 때 공진, 임피던스 최대, 전류 최소',
        prompt: `전기기사 회로이론 문제입니다.

문제: 병렬공진회로의 공진조건과 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 병렬공진의 정의
2. 공진 조건 유도
3. 공진시 임피던스
4. 공진시 전류
5. 직렬공진과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '대역폭(Bandwidth)과 반전력점을 설명하시오.',
        answer: 'BW = f₂-f₁ = f₀/Q, 반전력점: 전력이 최대의 1/2인 주파수',
        prompt: `전기기사 회로이론 문제입니다.

문제: 대역폭과 반전력점을 설명하시오.

다음 순서로 설명해주세요:
1. 대역폭의 정의
2. 반전력점(3dB점) 정의
3. 대역폭 계산 공식
4. Q와의 관계
5. 필터 설계 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: 'L=10mH, C=100μF인 직렬공진회로의 공진주파수를 구하시오.',
        answer: 'f₀ = 1/(2π√(10×10⁻³×100×10⁻⁶)) = 159.2Hz',
        prompt: `전기기사 회로이론 문제입니다.

문제: L=10mH, C=100μF인 직렬공진회로의 공진주파수를 구하시오.

다음 순서로 설명해주세요:
1. 공진주파수 공식
2. 단위 환산
3. 계산 과정
4. 검증 방법
5. 공진시 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '공진회로에서 공진점을 벗어났을 때 특성 변화를 설명하시오.',
        answer: 'f<f₀: 용량성(전류앞섬), f>f₀: 유도성(전압앞섬)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 공진점을 벗어났을 때 특성 변화를 설명하시오.

다음 순서로 설명해주세요:
1. 공진점 이하 주파수
2. 공진점 이상 주파수
3. 임피던스 변화
4. 위상각 변화
5. 역률 변화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '공진시 L과 C에 걸리는 전압과 주전원 전압의 관계를 설명하시오.',
        answer: 'VL = VC = Q×V (Q배 확대, 전압확대작용)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 공진시 L, C 양단 전압을 설명하시오.

다음 순서로 설명해주세요:
1. 공진시 전류 계산
2. VL 계산
3. VC 계산
4. 전압확대 현상
5. 주의사항 (절연)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '안테나 동조회로의 원리를 설명하시오.',
        answer: 'L-C 공진을 이용, 원하는 주파수만 선택(공진주파수 조정)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 안테나 동조회로의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 동조의 개념
2. L-C 공진 이용
3. 가변콘덴서 역할
4. 선택도와 감도
5. 실제 라디오 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '저역필터(LPF)와 고역필터(HPF)의 구성을 설명하시오.',
        answer: 'LPF: 직렬L+병렬C, HPF: 직렬C+병렬L',
        prompt: `전기기사 회로이론 문제입니다.

문제: LPF와 HPF의 구성을 설명하시오.

다음 순서로 설명해주세요:
1. 필터의 개념
2. LPF 구성과 원리
3. HPF 구성과 원리
4. 차단주파수
5. BPF, BRF

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '실제 공진회로에서 Q값이 낮아지는 원인을 설명하시오.',
        answer: '저항손실(코일저항, 유전손실), 복사손실, 외부부하',
        prompt: `전기기사 회로이론 문제입니다.

문제: Q값이 낮아지는 원인을 설명하시오.

다음 순서로 설명해주세요:
1. 이상적 Q와 실제 Q
2. 코일의 저항손실
3. 콘덴서의 유전손실
4. 외부 부하 영향
5. Q 향상 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'symmetric',
    name: '대칭좌표법/다상회로',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '대칭좌표법에서 영상, 정상, 역상 분으로 분해하는 공식을 설명하시오.',
        answer: 'I₀=(Ia+Ib+Ic)/3, I₁=(Ia+aIb+a²Ic)/3, I₂=(Ia+a²Ib+aIc)/3, a=e^(j120°)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 대칭좌표법의 분해 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 대칭좌표법의 필요성
2. 연산자 a의 정의
3. 영상분 계산
4. 정상분 계산
5. 역상분 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '3상 평형회로에서 선간전압과 상전압, 선전류와 상전류의 관계를 설명하시오.',
        answer: 'Y결선: VL=√3Vp, IL=Ip, Δ결선: VL=Vp, IL=√3Ip',
        prompt: `전기기사 회로이론 문제입니다.

문제: 3상 회로의 전압/전류 관계를 설명하시오.

다음 순서로 설명해주세요:
1. Y결선의 전압관계
2. Y결선의 전류관계
3. Δ결선의 전압관계
4. Δ결선의 전류관계
5. 위상관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '3상 전력 공식 P = √3VLILcosθ를 유도하시오.',
        answer: 'P = 3VpIpcosθ = 3×(VL/√3)×IL×cosθ = √3VLILcosθ',
        prompt: `전기기사 회로이론 문제입니다.

문제: 3상 전력 공식을 유도하시오.

다음 순서로 설명해주세요:
1. 단상 전력 공식
2. 3상 전력 = 3×단상전력
3. Y결선에서 유도
4. Δ결선에서 유도
5. 무효전력과 피상전력

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '2전력계법으로 3상 전력을 측정하는 원리를 설명하시오.',
        answer: 'P = W₁+W₂, Q = √3(W₁-W₂), tanθ = √3(W₁-W₂)/(W₁+W₂)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 2전력계법의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 2전력계법 결선
2. 각 전력계 지시값
3. 유효전력 계산
4. 무효전력 계산
5. 역률 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '불평형 3상 회로 해석에서 대칭좌표법을 적용하는 방법을 설명하시오.',
        answer: '불평형량→대칭분 분해→각 분에 대해 해석→합성',
        prompt: `전기기사 회로이론 문제입니다.

문제: 불평형 3상 회로 해석 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 불평형 회로의 정의
2. 대칭분 분해
3. 각 대칭분 등가회로
4. 개별 해석
5. 합성 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '1선 지락시 고장전류를 대칭좌표법으로 구하시오.',
        answer: 'If = 3I₀ = 3E/(Z₀+Z₁+Z₂)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 1선 지락 고장전류를 대칭좌표법으로 구하시오.

다음 순서로 설명해주세요:
1. 1선 지락 조건
2. 대칭분 등가회로
3. 영상, 정상, 역상 전류
4. 고장전류 계산
5. 건전상 전압

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '회전자계(Rotating Magnetic Field)의 원리와 속도를 설명하시오.',
        answer: '3상 전류에 의해 회전자계 발생, Ns = 120f/P [rpm]',
        prompt: `전기기사 회로이론 문제입니다.

문제: 회전자계의 원리와 속도를 설명하시오.

다음 순서로 설명해주세요:
1. 회전자계 발생 원리
2. 3상 전류와 자계
3. 동기속도 공식
4. 극수와 속도 관계
5. 유도전동기 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: 'V결선시 출력과 이용률을 계산하시오.',
        answer: '출력 = √3VIcosθ (Δ의 57.7%), 이용률 = √3/2 = 86.6%',
        prompt: `전기기사 회로이론 문제입니다.

문제: V결선시 출력과 이용률을 계산하시오.

다음 순서로 설명해주세요:
1. V결선 구조
2. 출력 계산
3. Δ결선 대비 출력비
4. 이용률 계산
5. V결선 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '연산자 a = e^(j120°)의 특성을 설명하시오.',
        answer: 'a = -0.5+j0.866, a² = -0.5-j0.866, a³ = 1, 1+a+a² = 0',
        prompt: `전기기사 회로이론 문제입니다.

문제: 연산자 a의 특성을 설명하시오.

다음 순서로 설명해주세요:
1. a의 정의
2. a²의 값
3. a³의 값
4. 1+a+a²의 값
5. 대칭좌표법에서 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '선간전압 380V, 선전류 10A, 역률 0.8인 3상 부하의 전력을 구하시오.',
        answer: 'P = √3×380×10×0.8 = 5.27kW',
        prompt: `전기기사 회로이론 문제입니다.

문제: 주어진 조건에서 3상 전력을 구하시오.

다음 순서로 설명해주세요:
1. 3상 전력 공식
2. 값 대입
3. 계산 과정
4. 무효전력 계산
5. 피상전력 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'transient',
    name: '과도현상/라플라스',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: 'R-L 직렬회로에 DC 전압 인가시 전류의 과도응답을 구하시오.',
        answer: 'i(t) = (V/R)(1-e^(-t/τ)), τ = L/R (시정수)',
        prompt: `전기기사 회로이론 문제입니다.

문제: R-L 회로의 과도응답을 구하시오.

다음 순서로 설명해주세요:
1. 회로방정식 설정
2. 미분방정식 풀이
3. 시정수의 의미
4. 정상상태와 과도상태
5. 에너지 저장

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'R-C 직렬회로에 DC 전압 인가시 전압의 과도응답을 구하시오.',
        answer: 'vc(t) = V(1-e^(-t/τ)), τ = RC (시정수)',
        prompt: `전기기사 회로이론 문제입니다.

문제: R-C 회로의 과도응답을 구하시오.

다음 순서로 설명해주세요:
1. 회로방정식 설정
2. 미분방정식 풀이
3. 시정수의 의미
4. 충전 곡선
5. 방전 곡선

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '라플라스 변환의 정의와 기본 변환쌍을 설명하시오.',
        answer: 'F(s) = ∫₀^∞ f(t)e^(-st)dt, 1→1/s, e^(-at)→1/(s+a), sinωt→ω/(s²+ω²)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 라플라스 변환의 정의와 기본 변환쌍을 설명하시오.

다음 순서로 설명해주세요:
1. 라플라스 변환 정의
2. 단위계단함수 변환
3. 지수함수 변환
4. 삼각함수 변환
5. 미분, 적분 변환

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '라플라스 변환을 이용한 회로해석 절차를 설명하시오.',
        answer: '시간영역→s영역 변환→대수방정식 풀이→역변환→시간영역',
        prompt: `전기기사 회로이론 문제입니다.

문제: 라플라스 변환을 이용한 회로해석 절차를 설명하시오.

다음 순서로 설명해주세요:
1. s영역 등가회로
2. 초기조건 처리
3. 대수방정식 설정
4. 부분분수 전개
5. 역변환

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '시정수 τ = 0.1s인 R-L 회로에서 전류가 최종값의 63.2%에 도달하는 시간은?',
        answer: 't = τ = 0.1s (시정수 1배)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 전류가 63.2%에 도달하는 시간을 구하시오.

다음 순서로 설명해주세요:
1. 과도응답 공식
2. 63.2%의 의미
3. 1-e^(-1) = 0.632
4. 다른 도달시간 (95%, 99%)
5. 시정수의 실용적 의미

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: 'RLC 직렬회로의 과제동, 임계제동, 부족제동 조건을 설명하시오.',
        answer: '과제동: R>2√(L/C), 임계: R=2√(L/C), 부족제동: R<2√(L/C)',
        prompt: `전기기사 회로이론 문제입니다.

문제: RLC 회로의 제동 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 특성방정식
2. 근의 종류에 따른 분류
3. 과제동 응답
4. 임계제동 응답
5. 부족제동(진동) 응답

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '전달함수(Transfer Function)의 정의와 특성을 설명하시오.',
        answer: 'H(s) = 출력/입력 (초기조건 0), 시스템 특성 표현',
        prompt: `전기기사 회로이론 문제입니다.

문제: 전달함수의 정의와 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 전달함수 정의
2. 초기조건 0의 의미
3. 극점과 영점
4. 안정도 판별
5. 주파수응답과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '단위계단응답과 단위임펄스응답의 관계를 설명하시오.',
        answer: '단위임펄스응답 = 단위계단응답의 미분, g(t) = dh(t)/dt',
        prompt: `전기기사 회로이론 문제입니다.

문제: 단위계단응답과 임펄스응답의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 단위계단함수 정의
2. 단위임펄스함수 정의
3. 두 응답의 관계
4. 컨볼루션 정리
5. 시스템 해석 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '최종값 정리와 초기값 정리를 설명하시오.',
        answer: '최종값: lim(t→∞)f(t)=lim(s→0)sF(s), 초기값: lim(t→0)f(t)=lim(s→∞)sF(s)',
        prompt: `전기기사 회로이론 문제입니다.

문제: 최종값 정리와 초기값 정리를 설명하시오.

다음 순서로 설명해주세요:
1. 최종값 정리 공식
2. 최종값 정리 적용 조건
3. 초기값 정리 공식
4. 적용 예제
5. 주의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '인덕터와 커패시터의 s영역 등가회로를 설명하시오.',
        answer: 'L: sL 임피던스 + 초기전류원, C: 1/sC 임피던스 + 초기전압원',
        prompt: `전기기사 회로이론 문제입니다.

문제: L, C의 s영역 등가회로를 설명하시오.

다음 순서로 설명해주세요:
1. 인덕터의 s영역 등가
2. 초기조건 표현
3. 커패시터의 s영역 등가
4. 초기조건 표현
5. 회로해석 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'block-diagram',
    name: '블록선도/신호흐름선도',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '블록선도의 직렬연결, 병렬연결, 피드백 연결의 등가전달함수를 구하시오.',
        answer: '직렬: G₁G₂, 병렬: G₁±G₂, 피드백: G/(1±GH)',
        prompt: `전기기사 제어공학 문제입니다.

문제: 블록선도 연결방식별 등가전달함수를 구하시오.

다음 순서로 설명해주세요:
1. 직렬연결 등가
2. 병렬연결 등가
3. 피드백 연결 등가 (부귀환)
4. 피드백 연결 등가 (정귀환)
5. 복잡한 블록선도 축소

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '블록선도에서 가지점 이동과 인출점 이동 규칙을 설명하시오.',
        answer: '가지점 전진시 G곱함, 후진시 1/G곱함. 인출점은 반대',
        prompt: `전기기사 제어공학 문제입니다.

문제: 블록선도의 이동 규칙을 설명하시오.

다음 순서로 설명해주세요:
1. 가지점의 정의
2. 인출점의 정의
3. 가지점 이동 규칙
4. 인출점 이동 규칙
5. 적용 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '메이슨 이득공식(Mason Gain Formula)을 설명하시오.',
        answer: 'T = Σ(PkΔk)/Δ, Δ: 행렬식, Pk: k번째 전방경로 이득',
        prompt: `전기기사 제어공학 문제입니다.

문제: 메이슨 이득공식을 설명하시오.

다음 순서로 설명해주세요:
1. 신호흐름선도 용어 정의
2. 전방경로 이득
3. 루프이득
4. 행렬식(Δ) 계산
5. 전달함수 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '개루프전달함수와 폐루프전달함수의 관계를 설명하시오.',
        answer: 'T(s) = G(s)/(1+G(s)H(s)), 개루프: G(s)H(s)',
        prompt: `전기기사 제어공학 문제입니다.

문제: 개루프와 폐루프 전달함수 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 개루프 전달함수 정의
2. 폐루프 전달함수 유도
3. 특성방정식
4. 안정도와의 관계
5. 이득여유와 위상여유

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '감도함수(Sensitivity Function)의 정의와 의미를 설명하시오.',
        answer: 'S = (dT/T)/(dG/G), 폐루프에서 S = 1/(1+GH)',
        prompt: `전기기사 제어공학 문제입니다.

문제: 감도함수의 정의와 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 감도의 정의
2. 감도함수 유도
3. 피드백의 감도 저감 효과
4. 개루프와 폐루프 비교
5. 실제 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '특성방정식 1+G(s)H(s)=0의 의미와 중요성을 설명하시오.',
        answer: '시스템 극점 결정, 안정도 판별의 기준',
        prompt: `전기기사 제어공학 문제입니다.

문제: 특성방정식의 의미와 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 특성방정식 정의
2. 극점과의 관계
3. 안정도 조건
4. 루스-허르비츠 판별법
5. 근궤적 해석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '1차 시스템의 시간응답 특성을 설명하시오.',
        answer: 'G(s)=K/(τs+1), 시정수 τ, 정상상태값 K, 상승시간 2.2τ',
        prompt: `전기기사 제어공학 문제입니다.

문제: 1차 시스템의 시간응답 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 1차 시스템 전달함수
2. 단위계단응답
3. 시정수의 의미
4. 상승시간, 정착시간
5. DC 이득

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '2차 시스템의 감쇠비 ζ에 따른 응답 특성을 설명하시오.',
        answer: 'ζ>1: 과제동, ζ=1: 임계제동, 0<ζ<1: 부족제동(진동), ζ=0: 무제동',
        prompt: `전기기사 제어공학 문제입니다.

문제: 2차 시스템의 감쇠비에 따른 응답을 설명하시오.

다음 순서로 설명해주세요:
1. 2차 시스템 표준형
2. 감쇠비 ζ의 의미
3. 고유진동수 ωn
4. 감쇠비별 응답
5. 오버슈트와 감쇠비 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '정상상태오차와 시스템 형(Type)의 관계를 설명하시오.',
        answer: '0형: 위치오차, 1형: 속도오차, 2형: 가속도오차',
        prompt: `전기기사 제어공학 문제입니다.

문제: 정상상태오차와 시스템 형의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 시스템 형(Type)의 정의
2. 위치오차상수 Kp
3. 속도오차상수 Kv
4. 가속도오차상수 Ka
5. 형별 정상상태오차

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: 'PID 제어기의 각 요소 역할을 설명하시오.',
        answer: 'P: 현재오차 비례, I: 과거오차 적분(정상오차제거), D: 오차변화율(응답속도개선)',
        prompt: `전기기사 제어공학 문제입니다.

문제: PID 제어기의 각 요소 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 비례제어(P) 역할
2. 적분제어(I) 역할
3. 미분제어(D) 역할
4. PID 전달함수
5. 튜닝 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'stability',
    name: '안정도 판별',
    color: 'from-red-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '루스-허르비츠(Routh-Hurwitz) 안정도 판별법을 설명하시오.',
        answer: '특성방정식 계수로 루스표 작성, 1열 부호변화 횟수 = 불안정 근 개수',
        prompt: `전기기사 제어공학 문제입니다.

문제: 루스-허르비츠 안정도 판별법을 설명하시오.

다음 순서로 설명해주세요:
1. 루스표 작성법
2. 안정 조건
3. 부호변화 의미
4. 특수 경우 처리
5. 적용 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '나이퀴스트(Nyquist) 안정도 판별법을 설명하시오.',
        answer: 'N = Z - P, 폐루프 불안정 극점수 Z = N + P',
        prompt: `전기기사 제어공학 문제입니다.

문제: 나이퀴스트 안정도 판별법을 설명하시오.

다음 순서로 설명해주세요:
1. 나이퀴스트 선도
2. -1점 감싸는 횟수
3. 안정도 판별 공식
4. 이득여유와 위상여유
5. 적용 예제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '이득여유(GM)와 위상여유(PM)의 정의와 의미를 설명하시오.',
        answer: 'GM: 위상교차주파수에서 이득의 역수, PM: 이득교차주파수에서 180°+위상',
        prompt: `전기기사 제어공학 문제입니다.

문제: 이득여유와 위상여유를 설명하시오.

다음 순서로 설명해주세요:
1. 이득여유 정의
2. 위상여유 정의
3. 보드선도에서 읽기
4. 일반적인 설계 기준
5. 안정도와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '근궤적(Root Locus)의 기본 규칙을 설명하시오.',
        answer: '극점에서 시작→영점(또는 무한대)으로 종료, 실축 규칙, 점근선 규칙',
        prompt: `전기기사 제어공학 문제입니다.

문제: 근궤적의 기본 규칙을 설명하시오.

다음 순서로 설명해주세요:
1. 근궤적의 정의
2. 시작점과 종료점
3. 실축상의 근궤적
4. 점근선 각도와 중심
5. 허수축 교점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '보드선도(Bode Plot)의 특성과 안정도 분석을 설명하시오.',
        answer: '크기(dB)와 위상(deg)의 주파수응답, GM/PM으로 안정도 판별',
        prompt: `전기기사 제어공학 문제입니다.

문제: 보드선도와 안정도 분석을 설명하시오.

다음 순서로 설명해주세요:
1. 보드선도 정의
2. 크기선도 작도
3. 위상선도 작도
4. 안정도 판별
5. 이득/위상여유 읽기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '특성방정식 s³+2s²+3s+K=0이 안정할 K의 범위를 구하시오.',
        answer: '루스표에서 0<K<6',
        prompt: `전기기사 제어공학 문제입니다.

문제: 주어진 특성방정식이 안정할 K의 범위를 구하시오.

다음 순서로 설명해주세요:
1. 루스표 작성
2. 1열 계수 계산
3. 안정 조건 도출
4. K의 범위 결정
5. 경계값에서의 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '지상보상기(Lag Compensator)의 효과를 설명하시오.',
        answer: '저주파 이득 증가, 정상상태오차 감소, 대역폭 감소',
        prompt: `전기기사 제어공학 문제입니다.

문제: 지상보상기의 효과를 설명하시오.

다음 순서로 설명해주세요:
1. 지상보상기 전달함수
2. 주파수응답 특성
3. 정상상태오차 개선
4. 과도응답 영향
5. 설계 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '진상보상기(Lead Compensator)의 효과를 설명하시오.',
        answer: '위상여유 증가, 응답속도 개선, 대역폭 증가',
        prompt: `전기기사 제어공학 문제입니다.

문제: 진상보상기의 효과를 설명하시오.

다음 순서로 설명해주세요:
1. 진상보상기 전달함수
2. 주파수응답 특성
3. 안정도 개선
4. 과도응답 개선
5. 설계 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '상태공간 표현에서 가제어성과 가관측성의 조건을 설명하시오.',
        answer: '가제어: rank[B AB A²B...]=n, 가관측: rank[C CA CA²...]=n',
        prompt: `전기기사 제어공학 문제입니다.

문제: 가제어성과 가관측성 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 상태공간 표현
2. 가제어성 정의
3. 가제어성 행렬
4. 가관측성 정의
5. 가관측성 행렬

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '디지털 제어시스템의 안정도 조건을 설명하시오.',
        answer: '특성방정식의 모든 근이 단위원 내부 (|z|<1)',
        prompt: `전기기사 제어공학 문제입니다.

문제: 디지털 제어시스템의 안정도 조건을 설명하시오.

다음 순서로 설명해주세요:
1. z변환 정의
2. s평면과 z평면 관계
3. 안정 영역
4. 주리 안정도 판별법
5. 연속시스템과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  }
];

export default function CircuitControlStudyPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('circuit-control-completed');
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
    localStorage.setItem('circuit-control-completed', JSON.stringify([...newCompleted]));
  };

  const getAIUrl = (prompt: string) => {
    const encodedPrompt = encodeURIComponent(prompt);
    switch (selectedAI) {
      case 'claude': return `https://claude.ai/new?q=${encodedPrompt}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${encodedPrompt}`;
      case 'gemini': return `https://gemini.google.com/app?q=${encodedPrompt}`;
    }
  };

  const currentTopic = topics.find(t => t.id === activeTopic)!;
  const completedInTopic = currentTopic.questions.filter(q => completedQuestions.has(`${currentTopic.id}-${q.id}`)).length;
  const totalCompleted = topics.reduce((acc, topic) => acc + topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-blue-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-blue-600">필기시험</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">회로이론/제어공학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🔌</span></div>
              <div>
                <h1 className="text-2xl font-bold">회로이론 및 제어공학 학습</h1>
                <p className="text-blue-100">Circuit Theory & Control Engineering</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">전체 진도율</p>
              <p className="text-2xl font-bold">{totalCompleted} / 60</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(totalCompleted / 60) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">AI 선택:</span>
            <div className="flex gap-2">
              {[{ id: 'claude', name: 'Claude', color: 'orange' }, { id: 'chatgpt', name: 'ChatGPT', color: 'green' }, { id: 'gemini', name: 'Gemini', color: 'blue' }].map(ai => (
                <button key={ai.id} onClick={() => setSelectedAI(ai.id as typeof selectedAI)} className={`px-3 py-1 rounded-full text-sm font-medium transition ${selectedAI === ai.id ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={selectedAI === ai.id ? { backgroundColor: ai.id === 'claude' ? '#f97316' : ai.id === 'chatgpt' ? '#10b981' : '#3b82f6' } : {}}>
                  {ai.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b overflow-x-auto sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {topics.map(topic => {
              const completed = topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
              return (
                <button key={topic.id} onClick={() => setActiveTopic(topic.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTopic === topic.id ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {topic.name}<span className={`ml-2 text-xs ${completed === 10 ? 'text-green-500' : 'text-gray-400'}`}>{completed}/10</span>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{isCompleted ? '✓' : index + 1}</div>
                    <div className="flex-1"><p className="font-medium text-gray-800">{q.question}</p></div>
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
                      <a href={getAIUrl(q.prompt)} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-lg text-white font-medium text-center transition hover:opacity-90" style={{ backgroundColor: selectedAI === 'claude' ? '#f97316' : selectedAI === 'chatgpt' ? '#10b981' : '#3b82f6' }}>
                        🤖 {selectedAI === 'claude' ? 'Claude' : selectedAI === 'chatgpt' ? 'ChatGPT' : 'Gemini'}에게 질문하기
                      </a>
                      <button onClick={(e) => { e.stopPropagation(); handleComplete(currentTopic.id, q.id); }} className={`px-6 py-3 rounded-lg font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}>
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
