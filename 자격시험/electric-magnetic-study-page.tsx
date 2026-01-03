'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'vector',
    name: '벡터 해석 및 좌표계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '직교좌표계에서 점 P(3, 4, 0)의 원통좌표계 좌표 (ρ, φ, z)를 구하시오.',
        answer: '(5, 53.13°, 0)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 직교좌표계에서 점 P(3, 4, 0)의 원통좌표계 좌표 (ρ, φ, z)를 구하시오.

다음 순서로 설명해주세요:
1. 직교좌표계와 원통좌표계의 관계 공식
2. ρ = √(x² + y²) 계산 과정
3. φ = tan⁻¹(y/x) 계산 과정
4. z 좌표 변환
5. 최종 답과 검산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '벡터 A = 3ax + 4ay - 2az의 크기와 단위벡터를 구하시오.',
        answer: '|A| = √29, aA = (3ax + 4ay - 2az)/√29',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 벡터 A = 3ax + 4ay - 2az의 크기와 단위벡터를 구하시오.

다음 순서로 설명해주세요:
1. 벡터의 크기 공식: |A| = √(Ax² + Ay² + Az²)
2. 대입하여 크기 계산
3. 단위벡터 정의: aA = A/|A|
4. 단위벡터 계산
5. 단위벡터 크기가 1인지 검증

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '벡터 A = 2ax + 3ay와 B = 4ax - ay의 내적(스칼라적)을 구하시오.',
        answer: 'A·B = 5',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 벡터 A = 2ax + 3ay와 B = 4ax - ay의 내적(스칼라적)을 구하시오.

다음 순서로 설명해주세요:
1. 내적(Dot Product) 정의와 공식
2. A·B = AxBx + AyBy + AzBz 적용
3. 계산 과정 상세히
4. 내적의 물리적 의미 (두 벡터 사이의 각도와 관계)
5. 내적이 0일 때의 의미 (수직)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '벡터 A = ax + 2ay + 3az와 B = 2ax - ay + az의 외적(벡터적)을 구하시오.',
        answer: 'A×B = 5ax + 5ay - 5az',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 벡터 A = ax + 2ay + 3az와 B = 2ax - ay + az의 외적(벡터적)을 구하시오.

다음 순서로 설명해주세요:
1. 외적(Cross Product) 정의
2. 행렬식을 이용한 외적 계산법
3. 각 성분별 계산 과정
4. 외적 결과 벡터가 A, B 모두에 수직인지 검증
5. 외적의 물리적 의미 (넓이, 토크 등)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '구좌표계에서 점 P(r=2, θ=60°, φ=45°)를 직교좌표계로 변환하시오.',
        answer: 'P(0.87, 0.87, 1)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 구좌표계에서 점 P(r=2, θ=60°, φ=45°)를 직교좌표계로 변환하시오.

다음 순서로 설명해주세요:
1. 구좌표계와 직교좌표계의 변환 공식
   - x = r·sinθ·cosφ
   - y = r·sinθ·sinφ
   - z = r·cosθ
2. 각도를 라디안으로 변환 (필요시)
3. 각 좌표 계산 과정
4. 최종 답 정리
5. 검산: r = √(x² + y² + z²) 확인

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '발산(Divergence) ∇·F에서 F = x²ax + xyay + xyz·az일 때 점 (1,2,3)에서의 발산값을 구하시오.',
        answer: '∇·F = 2x + x + xy = 2(1) + 1 + 1×2 = 5',
        prompt: `전기기사 전기자기학 문제입니다.

문제: F = x²ax + xyay + xyz·az일 때 점 (1,2,3)에서 발산(∇·F)값을 구하시오.

다음 순서로 설명해주세요:
1. 발산(Divergence)의 정의와 물리적 의미
2. 직교좌표계에서 발산 공식: ∇·F = ∂Fx/∂x + ∂Fy/∂y + ∂Fz/∂z
3. 각 편미분 계산
4. 점 (1,2,3) 대입
5. 발산정리(가우스 정리)와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '회전(Curl) ∇×F에서 F = yzax + xzay + xyaz일 때 ∇×F를 구하시오.',
        answer: '∇×F = 0 (무회전장)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: F = yzax + xzay + xyaz일 때 회전(∇×F)을 구하시오.

다음 순서로 설명해주세요:
1. 회전(Curl)의 정의와 물리적 의미
2. 행렬식을 이용한 회전 계산법
3. 각 성분별 계산
4. 결과가 0인 경우의 의미 (보존장, 무회전장)
5. 스토크스 정리와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '그래디언트(Gradient) ∇V에서 V = x² + y² + z²일 때 점 (1,1,1)에서의 ∇V를 구하시오.',
        answer: '∇V = 2ax + 2ay + 2az',
        prompt: `전기기사 전기자기학 문제입니다.

문제: V = x² + y² + z²일 때 점 (1,1,1)에서 그래디언트(∇V)를 구하시오.

다음 순서로 설명해주세요:
1. 그래디언트(Gradient)의 정의와 물리적 의미
2. ∇V = (∂V/∂x)ax + (∂V/∂y)ay + (∂V/∂z)az
3. 각 편미분 계산
4. 점 (1,1,1) 대입
5. 그래디언트가 등전위면에 수직임을 설명

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '라플라시안(Laplacian) ∇²V에서 V = x²y + yz²일 때 ∇²V를 구하시오.',
        answer: '∇²V = 2y + 2y = 4y',
        prompt: `전기기사 전기자기학 문제입니다.

문제: V = x²y + yz²일 때 라플라시안(∇²V)을 구하시오.

다음 순서로 설명해주세요:
1. 라플라시안의 정의: ∇²V = ∂²V/∂x² + ∂²V/∂y² + ∂²V/∂z²
2. 1차 편미분 계산
3. 2차 편미분 계산
4. 합산하여 결과 도출
5. 라플라스 방정식(∇²V = 0)과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '선적분 ∫F·dl에서 F = yax + xay이고, 경로가 원점에서 (1,1)까지 직선일 때 적분값을 구하시오.',
        answer: '∫F·dl = 1',
        prompt: `전기기사 전기자기학 문제입니다.

문제: F = yax + xay이고, 경로가 원점에서 (1,1)까지 직선일 때 선적분 ∫F·dl을 구하시오.

다음 순서로 설명해주세요:
1. 선적분의 정의와 물리적 의미 (일, 에너지)
2. 경로의 매개변수화 (y = x, 0 ≤ x ≤ 1)
3. dl = dx·ax + dy·ay 표현
4. F·dl 계산 및 적분
5. 보존장에서 선적분은 경로에 무관함을 설명

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'electrostatic',
    name: '정전계 (쿨롱의 법칙, 전위, 전계)',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '진공 중에서 2m 떨어진 두 점전하 Q1=4μC, Q2=9μC 사이의 힘의 크기를 구하시오.',
        answer: 'F = 81 mN',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 진공 중에서 2m 떨어진 두 점전하 Q1=4μC, Q2=9μC 사이의 힘의 크기를 구하시오.

다음 순서로 설명해주세요:
1. 쿨롱의 법칙: F = kQ1Q2/r²
2. k = 1/(4πε₀) = 9×10⁹ N·m²/C²
3. 단위 변환 (μC → C)
4. 대입하여 계산
5. 인력/척력 판단 (같은 부호면 척력)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '점전하 Q=10nC로부터 5m 떨어진 점의 전계의 세기를 구하시오.',
        answer: 'E = 3.6 V/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 점전하 Q=10nC로부터 5m 떨어진 점의 전계의 세기를 구하시오.

다음 순서로 설명해주세요:
1. 점전하에 의한 전계 공식: E = Q/(4πε₀r²)
2. ε₀ = 8.854×10⁻¹² F/m
3. 단위 변환 (nC → C)
4. 대입하여 계산
5. 전계의 방향 (양전하면 바깥쪽)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '점전하 Q=5μC에서 2m 떨어진 점의 전위를 구하시오.',
        answer: 'V = 22.5 kV',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 점전하 Q=5μC에서 2m 떨어진 점의 전위를 구하시오.

다음 순서로 설명해주세요:
1. 점전하에 의한 전위 공식: V = Q/(4πε₀r)
2. 전위와 전계의 관계: E = -∇V
3. 대입하여 계산
4. 무한원점을 기준으로 한 전위
5. 전위차와 일의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '전계 E = 100 V/m인 균일 전계에서 전하 q=2μC를 전계 방향으로 0.5m 이동시킬 때 필요한 일을 구하시오.',
        answer: 'W = -100 μJ',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 전계 E = 100 V/m인 균일 전계에서 전하 q=2μC를 전계 방향으로 0.5m 이동시킬 때 필요한 일을 구하시오.

다음 순서로 설명해주세요:
1. 일과 전위차의 관계: W = qΔV
2. 균일전계에서 전위차: V = E·d
3. 부호 결정 (전계 방향 이동)
4. 대입하여 계산
5. 양의 일/음의 일의 물리적 의미

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '반지름 a인 도체구에 전하 Q가 균일하게 분포할 때, 도체구 표면에서의 전계를 구하시오.',
        answer: 'E = Q/(4πε₀a²)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 반지름 a인 도체구에 전하 Q가 균일하게 분포할 때, 도체구 표면에서의 전계를 구하시오.

다음 순서로 설명해주세요:
1. 가우스 법칙: ∮E·dA = Q/ε₀
2. 대칭성을 이용한 가우스면 선택 (구면)
3. 표면적분 계산
4. 전계 도출
5. 도체 내부 전계가 0인 이유

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '무한 평면 도체에 면전하밀도 σ=10nC/m²가 분포할 때, 도체 표면 근처의 전계를 구하시오.',
        answer: 'E = σ/ε₀ = 1130 V/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 무한 평면 도체에 면전하밀도 σ=10nC/m²가 분포할 때, 도체 표면 근처의 전계를 구하시오.

다음 순서로 설명해주세요:
1. 도체 표면 경계조건
2. 가우스 법칙 적용 (원통형 가우스면)
3. E = σ/ε₀ 도출
4. 도체 내부 전계 = 0
5. 자유공간에서 무한평면 전하와의 차이 (E = σ/2ε₀)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '비유전율 εr=4인 유전체 내부에 전하 Q=1μC가 있을 때, 1m 거리에서의 전계를 구하시오.',
        answer: 'E = Q/(4πε₀εr) = 2.25 kV/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 비유전율 εr=4인 유전체 내부에 전하 Q=1μC가 있을 때, 1m 거리에서의 전계를 구하시오.

다음 순서로 설명해주세요:
1. 유전체 내 전계 공식
2. ε = ε₀εr 관계
3. 유전율이 클수록 전계가 약해지는 이유
4. 대입하여 계산
5. 전속밀도 D와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '전위 V = 2x² + 3y일 때, 점 (1, 2)에서의 전계 E를 구하시오.',
        answer: 'E = -4ax - 3ay V/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 전위 V = 2x² + 3y일 때, 점 (1, 2)에서의 전계 E를 구하시오.

다음 순서로 설명해주세요:
1. 전계와 전위의 관계: E = -∇V
2. 각 성분별 편미분
3. Ex = -∂V/∂x 계산
4. Ey = -∂V/∂y 계산
5. 점 (1, 2) 대입 및 결과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '두 점전하 +Q와 -Q가 거리 d만큼 떨어져 있을 때, 전기쌍극자 모멘트를 구하시오.',
        answer: 'p = Qd',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 점전하 +Q와 -Q가 거리 d만큼 떨어져 있을 때, 전기쌍극자 모멘트를 구하시오.

다음 순서로 설명해주세요:
1. 전기쌍극자의 정의
2. 쌍극자 모멘트: p = Qd (방향: -Q에서 +Q)
3. 쌍극자에 의한 원거리 전위
4. 쌍극자에 의한 원거리 전계
5. 분극(Polarization)과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '포아송 방정식 ∇²V = -ρ/ε₀에서 전하밀도 ρ=0인 영역의 전위 방정식을 쓰시오.',
        answer: '라플라스 방정식: ∇²V = 0',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 포아송 방정식 ∇²V = -ρ/ε₀에서 전하밀도 ρ=0인 영역의 전위 방정식을 쓰시오.

다음 순서로 설명해주세요:
1. 포아송 방정식의 유도 (가우스 법칙 + E=-∇V)
2. 전하가 없는 영역에서 라플라스 방정식
3. 라플라스 방정식의 해법 (경계값 문제)
4. 유일성 정리
5. 영상법(Image Method)의 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'conductor',
    name: '도체계와 정전용량',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '평행판 콘덴서의 면적 A=0.01m², 간격 d=1mm, 비유전율 εr=2일 때 정전용량을 구하시오.',
        answer: 'C = 177 pF',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 평행판 콘덴서의 면적 A=0.01m², 간격 d=1mm, 비유전율 εr=2일 때 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 평행판 콘덴서 정전용량 공식: C = ε₀εrA/d
2. 각 값 대입
3. 단위 환산 주의
4. 정전용량의 물리적 의미
5. 정전용량을 증가시키는 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '내반경 a=1cm, 외반경 b=2cm인 동축케이블의 단위길이당 정전용량을 구하시오. (εr=1)',
        answer: 'C = 80.3 pF/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 내반경 a=1cm, 외반경 b=2cm인 동축케이블의 단위길이당 정전용량을 구하시오. (εr=1)

다음 순서로 설명해주세요:
1. 동축케이블 정전용량 공식: C = 2πε₀εr/ln(b/a)
2. 가우스 법칙을 이용한 유도
3. 대입하여 계산
4. 케이블 임피던스와의 관계
5. 특성임피던스 계산법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '콘덴서 C1=3μF, C2=6μF를 직렬 연결했을 때 합성 정전용량을 구하시오.',
        answer: 'C = 2 μF',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 콘덴서 C1=3μF, C2=6μF를 직렬 연결했을 때 합성 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 직렬 연결 합성 공식: 1/C = 1/C1 + 1/C2
2. 대입하여 계산
3. 직렬 연결 시 전압 분배
4. 직렬 연결의 특징 (합성용량 < 각 용량)
5. 내압 증가 효과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '콘덴서 C1=3μF, C2=6μF를 병렬 연결했을 때 합성 정전용량을 구하시오.',
        answer: 'C = 9 μF',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 콘덴서 C1=3μF, C2=6μF를 병렬 연결했을 때 합성 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 병렬 연결 합성 공식: C = C1 + C2
2. 대입하여 계산
3. 병렬 연결 시 전압 동일
4. 병렬 연결의 특징 (합성용량 > 각 용량)
5. 전하 저장량 증가

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '정전용량 C=10μF인 콘덴서에 100V를 인가했을 때 저장되는 에너지를 구하시오.',
        answer: 'W = 50 mJ',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 정전용량 C=10μF인 콘덴서에 100V를 인가했을 때 저장되는 에너지를 구하시오.

다음 순서로 설명해주세요:
1. 콘덴서 에너지 공식: W = (1/2)CV²
2. 다른 형태: W = (1/2)QV = Q²/2C
3. 대입하여 계산
4. 에너지 밀도: w = (1/2)εE²
5. 에너지 저장 메커니즘

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '반경 a인 고립 도체구의 정전용량을 구하시오.',
        answer: 'C = 4πε₀a',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 반경 a인 고립 도체구의 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 고립 도체구의 전위 분포
2. V = Q/(4πε₀a)
3. C = Q/V 관계
4. 정전용량 도출
5. 지구의 정전용량 계산 예시

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '평행판 콘덴서에 두께 t의 유전체(εr)를 삽입했을 때 정전용량 변화를 구하시오.',
        answer: 'C = ε₀A/[d-t+t/εr]',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 간격 d인 평행판 콘덴서에 두께 t(< d)의 유전체(εr)를 삽입했을 때 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 공기층과 유전체층의 직렬 연결
2. 각 층의 정전용량
3. 직렬 합성
4. C = ε₀A/[d-t+t/εr] 유도
5. 유전체로 완전히 채웠을 때와 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '콘덴서에 충전된 전하 Q=100μC, 전압 V=50V일 때 정전용량을 구하시오.',
        answer: 'C = 2 μF',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 콘덴서에 충전된 전하 Q=100μC, 전압 V=50V일 때 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 정전용량 정의: C = Q/V
2. 대입하여 계산
3. 정전용량의 단위 (F, μF, pF)
4. 정전용량은 도체계의 기하학적 특성
5. 전압과 전하의 관계 (Q-V 특성)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '평행판 콘덴서의 극판 간격을 2배로 늘리면 정전용량은 어떻게 변하는가?',
        answer: '정전용량이 1/2로 감소',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 평행판 콘덴서의 극판 간격을 2배로 늘리면 정전용량은 어떻게 변하는가?

다음 순서로 설명해주세요:
1. C = ε₀εrA/d 관계
2. 간격 d가 2d가 되면
3. C' = C/2 도출
4. 일정 전압 유지 시 에너지 변화
5. 일정 전하 유지 시 에너지 변화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '내경 a, 외경 b인 구형 콘덴서의 정전용량을 구하시오.',
        answer: 'C = 4πε₀ab/(b-a)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 내경 a, 외경 b인 구형 콘덴서의 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 동심 도체구 사이의 전위차 계산
2. 가우스 법칙으로 전계 구하기
3. V = -∫E·dr 적분
4. C = Q/V 도출
5. b→∞일 때 고립구 정전용량으로 수렴

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'dielectric',
    name: '유전체와 경계조건',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '비유전율 εr=4인 유전체 내 전속밀도 D=8μC/m²일 때 전계 E와 분극 P를 구하시오.',
        answer: 'E=226kV/m, P=6μC/m²',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 비유전율 εr=4인 유전체 내 전속밀도 D=8μC/m²일 때 전계 E와 분극 P를 구하시오.

다음 순서로 설명해주세요:
1. D = εE = ε₀εrE 관계
2. E = D/(ε₀εr) 계산
3. P = D - ε₀E = ε₀(εr-1)E
4. 또는 P = χeε₀E (χe = εr-1)
5. D, E, P의 물리적 의미 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '두 유전체 경계면에서 전계의 접선성분 Et1과 Et2의 관계를 구하시오.',
        answer: 'Et1 = Et2 (접선성분 연속)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 유전체 경계면에서 전계의 접선성분 Et1과 Et2의 관계를 구하시오.

다음 순서로 설명해주세요:
1. 경계면에서의 경계조건
2. ∮E·dl = 0 적용 (보존장)
3. Et1 = Et2 유도
4. 물리적 의미 (전위 연속)
5. 굴절 법칙과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '두 유전체(ε1, ε2) 경계면에서 전속밀도의 법선성분 관계를 구하시오. (자유전하 없음)',
        answer: 'Dn1 = Dn2 (법선성분 연속)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 유전체(ε1, ε2) 경계면에서 전속밀도의 법선성분 관계를 구하시오. (자유전하 없음)

다음 순서로 설명해주세요:
1. 가우스 법칙 ∮D·dA = Qf 적용
2. 자유전하 없으면 Dn1 = Dn2
3. 자유전하 있으면 Dn1 - Dn2 = σf
4. 물리적 의미 (전하 보존)
5. 분극전하와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '유전체 경계면에서 전계가 굴절할 때 tanθ1/tanθ2 = ?',
        answer: 'tanθ1/tanθ2 = ε1/ε2',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 유전체 경계면에서 전계가 굴절할 때 tanθ1/tanθ2의 관계를 구하시오.

다음 순서로 설명해주세요:
1. 경계조건: Et1=Et2, Dn1=Dn2
2. E1sinθ1 = E2sinθ2
3. ε1E1cosθ1 = ε2E2cosθ2
4. 나누어서 굴절 법칙 유도
5. 스넬의 법칙과 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '평행판 콘덴서에 유전체를 삽입했을 때 전하 일정 조건에서 에너지 변화를 구하시오.',
        answer: 'W2 = W1/εr (에너지 감소)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 평행판 콘덴서에 유전체(εr)를 삽입했을 때 전하 일정 조건에서 에너지 변화를 구하시오.

다음 순서로 설명해주세요:
1. 초기 에너지: W1 = Q²/2C1
2. 유전체 삽입 후: C2 = εrC1
3. 에너지: W2 = Q²/2C2 = W1/εr
4. 에너지 감소분은 어디로?
5. 유전체에 작용하는 힘

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '전기감수율 χe=3인 유전체의 비유전율 εr을 구하시오.',
        answer: 'εr = 1 + χe = 4',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 전기감수율 χe=3인 유전체의 비유전율 εr을 구하시오.

다음 순서로 설명해주세요:
1. 분극과 전계의 관계: P = χeε₀E
2. D = ε₀E + P = ε₀(1+χe)E
3. εr = 1 + χe 유도
4. 진공의 χe = 0, εr = 1
5. 도체의 χe = ∞, εr = ∞

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '유전체 내 분극전하밀도 ρp와 분극 P의 관계를 구하시오.',
        answer: 'ρp = -∇·P',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 유전체 내 분극전하밀도 ρp와 분극 P의 관계를 구하시오.

다음 순서로 설명해주세요:
1. 분극의 정의 (단위부피당 쌍극자 모멘트)
2. 분극전하의 발생 원리
3. ρp = -∇·P 유도
4. 경계면 분극전하: σp = P·n
5. 가우스 법칙에서의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '콘덴서에 유전체를 삽입할 때 전압 일정 조건에서 전하 변화를 구하시오.',
        answer: 'Q2 = εrQ1 (전하 증가)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 콘덴서에 유전체(εr)를 삽입할 때 전압 일정 조건에서 전하 변화를 구하시오.

다음 순서로 설명해주세요:
1. C2 = εrC1
2. Q = CV 관계
3. V 일정이므로 Q2 = C2V = εrC1V = εrQ1
4. 에너지 변화: W2 = εrW1
5. 전원에서 공급된 에너지

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '유전체의 항복전압(절연파괴전압)이 30kV/mm일 때, 두께 2mm 유전체의 최대 허용전압은?',
        answer: 'Vmax = 60 kV',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 유전체의 항복전압(절연파괴전압)이 30kV/mm일 때, 두께 2mm 유전체의 최대 허용전압은?

다음 순서로 설명해주세요:
1. 항복전압의 정의
2. V = E × d 관계
3. 대입하여 계산
4. 안전율 고려
5. 절연파괴의 원인과 방지법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '분극강도 P=10μC/m²인 유전체 경계면의 분극면전하밀도를 구하시오. (P가 경계면에 수직)',
        answer: 'σp = P = 10 μC/m²',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 분극강도 P=10μC/m²인 유전체 경계면의 분극면전하밀도를 구하시오. (P가 경계면에 수직)

다음 순서로 설명해주세요:
1. 분극면전하밀도: σp = P·n = Pcosθ
2. P가 수직이면 θ=0, σp=P
3. 분극전하의 부호 결정
4. 유전체 양쪽 표면의 전하
5. 분극에 의한 내부 전계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'magnetostatic',
    name: '정자계 (비오-사바르, 암페어)',
    color: 'from-red-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '반경 a=10cm인 원형 코일에 I=5A가 흐를 때 중심에서의 자계의 세기를 구하시오.',
        answer: 'H = I/2a = 25 A/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 반경 a=10cm인 원형 코일에 I=5A가 흐를 때 중심에서의 자계의 세기를 구하시오.

다음 순서로 설명해주세요:
1. 비오-사바르 법칙: dH = Idl×r/(4πr³)
2. 원형 코일 중심에서 H = I/2a 유도
3. 대입하여 계산
4. N턴 코일인 경우: H = NI/2a
5. 자계의 방향 (오른손 법칙)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '무한히 긴 직선 도선에 I=10A가 흐를 때 도선에서 r=0.5m 떨어진 점의 자계를 구하시오.',
        answer: 'H = I/2πr = 3.18 A/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 무한히 긴 직선 도선에 I=10A가 흐를 때 도선에서 r=0.5m 떨어진 점의 자계를 구하시오.

다음 순서로 설명해주세요:
1. 암페어 주회법칙: ∮H·dl = I
2. 원형 경로 선택 (대칭성)
3. H × 2πr = I
4. H = I/2πr 유도
5. 자계의 방향 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '솔레노이드 코일(n=1000턴/m, I=2A)의 내부 자계를 구하시오.',
        answer: 'H = nI = 2000 A/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 솔레노이드 코일(n=1000턴/m, I=2A)의 내부 자계를 구하시오.

다음 순서로 설명해주세요:
1. 솔레노이드 내부 자계: H = nI
2. 암페어 법칙으로 유도
3. 대입하여 계산
4. 자속밀도: B = μ₀nI
5. 솔레노이드 외부 자계 ≈ 0

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '토로이드(N=500턴, 평균반경 r=20cm, I=4A)의 내부 자계를 구하시오.',
        answer: 'H = NI/2πr = 1592 A/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 토로이드(N=500턴, 평균반경 r=20cm, I=4A)의 내부 자계를 구하시오.

다음 순서로 설명해주세요:
1. 암페어 법칙 적용
2. H × 2πr = NI
3. H = NI/2πr 유도
4. 대입하여 계산
5. 토로이드 외부 자계 = 0

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '두 평행 도선(간격 d=0.1m)에 같은 방향으로 I1=I2=10A가 흐를 때 단위길이당 작용력을 구하시오.',
        answer: 'F/L = μ₀I1I2/2πd = 2×10⁻⁴ N/m (인력)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 평행 도선(간격 d=0.1m)에 같은 방향으로 I1=I2=10A가 흐를 때 단위길이당 작용력을 구하시오.

다음 순서로 설명해주세요:
1. 도선1이 만드는 자계: H = I1/2πd
2. 도선2에 작용하는 힘: F = BI2L
3. F/L = μ₀I1I2/2πd 유도
4. 같은 방향 전류: 인력
5. 반대 방향 전류: 척력

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '자속밀도 B=0.5T인 균일 자계에서 길이 l=0.2m, 전류 I=10A인 도선에 작용하는 힘을 구하시오. (도선과 자계가 수직)',
        answer: 'F = BIL = 1 N',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 자속밀도 B=0.5T인 균일 자계에서 길이 l=0.2m, 전류 I=10A인 도선에 작용하는 힘을 구하시오. (도선과 자계가 수직)

다음 순서로 설명해주세요:
1. 로렌츠 힘: F = IL × B
2. 수직일 때: F = BIL
3. 대입하여 계산
4. 힘의 방향 (플레밍 왼손법칙)
5. 전동기 원리와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '자속밀도 B=0.1T인 자계에서 v=100m/s로 수직 이동하는 전자(e=1.6×10⁻¹⁹C)에 작용하는 힘을 구하시오.',
        answer: 'F = qvB = 1.6×10⁻¹⁸ N',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 자속밀도 B=0.1T인 자계에서 v=100m/s로 수직 이동하는 전자에 작용하는 힘을 구하시오.

다음 순서로 설명해주세요:
1. 로렌츠 힘: F = qv × B
2. 수직일 때: F = qvB
3. 대입하여 계산
4. 전자의 원운동
5. 사이클로트론 주파수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '비투자율 μr=1000인 철심의 자속밀도가 B=1T일 때 자계의 세기 H를 구하시오.',
        answer: 'H = B/μ₀μr ≈ 796 A/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 비투자율 μr=1000인 철심의 자속밀도가 B=1T일 때 자계의 세기 H를 구하시오.

다음 순서로 설명해주세요:
1. B = μH = μ₀μrH 관계
2. H = B/(μ₀μr) 유도
3. μ₀ = 4π×10⁻⁷ H/m
4. 대입하여 계산
5. 자화곡선(B-H 곡선) 설명

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '자화의 세기 M=500A/m, 비투자율 μr=100일 때 자속밀도 B를 구하시오.',
        answer: 'B = μ₀(H + M) = μ₀(M/(μr-1) + M)',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 자화의 세기 M=500A/m, 비투자율 μr=100일 때 자속밀도 B를 구하시오.

다음 순서로 설명해주세요:
1. M = χmH, χm = μr - 1 관계
2. H = M/χm = M/(μr-1)
3. B = μ₀(H + M) = μ₀μrH
4. 대입하여 계산
5. 포화 자화와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '권수 N=100, 평균자로길이 l=0.5m, 전류 I=2A인 환상 솔레노이드의 기자력을 구하시오.',
        answer: 'F = NI = 200 AT',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 권수 N=100, 평균자로길이 l=0.5m, 전류 I=2A인 환상 솔레노이드의 기자력을 구하시오.

다음 순서로 설명해주세요:
1. 기자력(MMF) 정의: F = NI
2. 대입하여 계산
3. 자기저항: Rm = l/(μA)
4. 자기 옴의 법칙: Φ = F/Rm
5. 자기회로와 전기회로 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'inductance',
    name: '자성체와 인덕턴스',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '솔레노이드(N=200턴, l=0.5m, A=10cm², μr=1)의 자기인덕턴스를 구하시오.',
        answer: 'L = μ₀N²A/l = 100.5 μH',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 솔레노이드(N=200턴, l=0.5m, A=10cm², μr=1)의 자기인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 자기인덕턴스 정의: L = NΦ/I
2. 솔레노이드: L = μ₀μrN²A/l 유도
3. 단위 변환 (cm² → m²)
4. 대입하여 계산
5. 철심 삽입 시 변화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '두 코일의 자기인덕턴스 L1=4mH, L2=9mH, 결합계수 k=0.5일 때 상호인덕턴스를 구하시오.',
        answer: 'M = k√(L1L2) = 3 mH',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 코일의 자기인덕턴스 L1=4mH, L2=9mH, 결합계수 k=0.5일 때 상호인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 상호인덕턴스 정의
2. M = k√(L1L2) 공식
3. 대입하여 계산
4. 결합계수 k의 범위 (0 ≤ k ≤ 1)
5. 완전 결합(k=1)과 무결합(k=0)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '인덕턴스 L=10mH에 전류 I=5A가 흐를 때 저장되는 에너지를 구하시오.',
        answer: 'W = (1/2)LI² = 125 mJ',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 인덕턴스 L=10mH에 전류 I=5A가 흐를 때 저장되는 에너지를 구하시오.

다음 순서로 설명해주세요:
1. 인덕터 에너지 공식: W = (1/2)LI²
2. 대입하여 계산
3. 에너지 밀도: w = (1/2)μH² = B²/2μ
4. 콘덴서 에너지와 비교
5. LC 회로에서의 에너지 교환

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '두 인덕터 L1=5mH, L2=3mH를 가극성 직렬연결했을 때(M=2mH) 합성 인덕턴스를 구하시오.',
        answer: 'L = L1 + L2 + 2M = 12 mH',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 두 인덕터 L1=5mH, L2=3mH를 가극성 직렬연결했을 때(M=2mH) 합성 인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 가극성(+): L = L1 + L2 + 2M
2. 감극성(-): L = L1 + L2 - 2M
3. 가극성 결과 계산
4. 극성 결정 방법 (점 표시)
5. 변압기 권선 연결

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '동축케이블(내반경 a, 외반경 b)의 단위길이당 인덕턴스를 구하시오.',
        answer: 'L = (μ₀/2π)ln(b/a) H/m',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 동축케이블(내반경 a, 외반경 b)의 단위길이당 인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 내부도체와 외부도체 사이 자계: H = I/2πr
2. 자속 Φ = ∫B·dA 계산
3. L = Φ/I 유도
4. L = (μ₀/2π)ln(b/a) 결과
5. 특성임피던스 Z₀ = √(L/C)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '자기회로에서 자속 Φ=0.01Wb, 기자력 F=1000AT일 때 자기저항 Rm을 구하시오.',
        answer: 'Rm = F/Φ = 100,000 AT/Wb',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 자기회로에서 자속 Φ=0.01Wb, 기자력 F=1000AT일 때 자기저항 Rm을 구하시오.

다음 순서로 설명해주세요:
1. 자기 옴의 법칙: Φ = F/Rm
2. Rm = F/Φ 유도
3. 대입하여 계산
4. Rm = l/(μA) 관계
5. 전기회로와의 대응 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '강자성체의 히스테리시스 손실이 Wh∝f·Bm^1.6일 때 주파수를 2배로 하면 손실은?',
        answer: '히스테리시스 손실 2배 증가',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 강자성체의 히스테리시스 손실이 Wh∝f·Bm^1.6일 때 주파수를 2배로 하면 손실은?

다음 순서로 설명해주세요:
1. 히스테리시스 손실 공식: Wh = kh·f·Bm^n (n≈1.6)
2. 주파수 f가 2배가 되면
3. Wh' = kh·2f·Bm^1.6 = 2Wh
4. 와전류 손실과 비교: We∝f²Bm²
5. 철손 = 히스테리시스 손실 + 와전류 손실

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '인덕턴스 L에서 전류가 di/dt=100A/s로 변할 때 유도기전력이 10V이면 L은?',
        answer: 'L = e/(di/dt) = 0.1 H = 100 mH',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 인덕턴스 L에서 전류가 di/dt=100A/s로 변할 때 유도기전력이 10V이면 L은?

다음 순서로 설명해주세요:
1. 유도기전력: e = -L(di/dt)
2. 크기만 고려: |e| = L(di/dt)
3. L = e/(di/dt) 유도
4. 대입하여 계산
5. 렌츠의 법칙과 부호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '공극이 있는 자기회로에서 공극 자기저항이 철심보다 훨씬 클 때 자속 분포는?',
        answer: '대부분의 기자력 강하가 공극에서 발생',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 공극이 있는 자기회로에서 공극 자기저항이 철심보다 훨씬 클 때 자속 분포는?

다음 순서로 설명해주세요:
1. 직렬 자기회로: Rm_total = Rm_iron + Rm_gap
2. Rm_gap >> Rm_iron일 때
3. 대부분의 MMF가 공극에서 소비
4. 공극 효과 (누설자속, 프린징)
5. 공극 자기저항: Rm_gap = lg/(μ₀Ag)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '상호인덕턴스 M=5mH인 두 코일에서 1차 전류가 di1/dt=200A/s로 변할 때 2차 유도전압은?',
        answer: 'e2 = M(di1/dt) = 1 V',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 상호인덕턴스 M=5mH인 두 코일에서 1차 전류가 di1/dt=200A/s로 변할 때 2차 유도전압은?

다음 순서로 설명해주세요:
1. 상호유도 법칙: e2 = -M(di1/dt)
2. 크기 계산
3. 단위 확인 (mH × A/s = mV? → 틀림, V 맞음)
4. 변압기 원리
5. 에너지 전달

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'maxwell',
    name: '전자유도와 맥스웰 방정식',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '자속이 Φ=0.1sin(100πt) Wb로 변할 때 유도기전력의 최댓값을 구하시오.',
        answer: 'em = ωΦm = 100π × 0.1 = 31.4 V',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 자속이 Φ=0.1sin(100πt) Wb로 변할 때 유도기전력의 최댓값을 구하시오.

다음 순서로 설명해주세요:
1. 패러데이 법칙: e = -dΦ/dt
2. Φ = Φm·sin(ωt)일 때
3. e = -ωΦm·cos(ωt)
4. 최댓값: em = ωΦm
5. 주파수 f = ω/2π = 50Hz 확인

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'N=100턴 코일이 B=0.5T인 균일자계에서 n=1200rpm으로 회전할 때 유도기전력 최댓값을 구하시오. (코일면적 A=0.01m²)',
        answer: 'em = NABω = 62.8 V',
        prompt: `전기기사 전기자기학 문제입니다.

문제: N=100턴 코일이 B=0.5T인 균일자계에서 n=1200rpm으로 회전할 때 유도기전력 최댓값을 구하시오. (코일면적 A=0.01m²)

다음 순서로 설명해주세요:
1. rpm을 rad/s로 변환: ω = 2πn/60
2. 유도기전력: e = NABωsin(ωt)
3. 최댓값: em = NABω
4. 대입하여 계산
5. 발전기 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '도체 막대(l=0.5m)가 B=0.2T 자계에서 v=10m/s로 수직 이동할 때 유도기전력은?',
        answer: 'e = Blv = 1 V',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 도체 막대(l=0.5m)가 B=0.2T 자계에서 v=10m/s로 수직 이동할 때 유도기전력은?

다음 순서로 설명해주세요:
1. 운동기전력(Motional EMF): e = ∫(v×B)·dl
2. v, B, l이 서로 수직일 때: e = Blv
3. 대입하여 계산
4. 플레밍 오른손 법칙으로 극성 결정
5. 레일건, MHD 발전기 응용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '맥스웰 방정식 중 ∇×E = -∂B/∂t의 물리적 의미를 설명하시오.',
        answer: '패러데이 법칙: 시변 자계가 전계를 유도',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 맥스웰 방정식 중 ∇×E = -∂B/∂t의 물리적 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 패러데이 법칙의 미분형
2. 시간에 따라 변하는 자계가 전계를 유도
3. 적분형: ∮E·dl = -dΦ/dt
4. 렌츠 법칙과의 관계 (음의 부호)
5. 변압기, 유도전동기 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '맥스웰 방정식 중 ∇×H = J + ∂D/∂t에서 ∂D/∂t의 물리적 의미는?',
        answer: '변위전류 밀도: 시변 전계가 자계를 생성',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 맥스웰 방정식 중 ∇×H = J + ∂D/∂t에서 ∂D/∂t의 물리적 의미는?

다음 순서로 설명해주세요:
1. 암페어-맥스웰 법칙
2. J: 전도전류 밀도
3. ∂D/∂t: 변위전류 밀도
4. 콘덴서 충전 시 연속성 설명
5. 전자파 발생의 핵심

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '진공 중 전자파의 속도를 ε₀, μ₀로 표현하시오.',
        answer: 'c = 1/√(ε₀μ₀) = 3×10⁸ m/s',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 진공 중 전자파의 속도를 ε₀, μ₀로 표현하시오.

다음 순서로 설명해주세요:
1. 파동방정식 유도 (맥스웰 방정식에서)
2. 위상속도: v = 1/√(με)
3. 진공에서: c = 1/√(ε₀μ₀)
4. 수치 계산으로 광속 확인
5. 맥스웰의 발견과 전자기파 예측

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '포인팅 벡터 S = E × H의 물리적 의미와 단위를 설명하시오.',
        answer: 'S: 전자기 에너지 흐름의 밀도, 단위 W/m²',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 포인팅 벡터 S = E × H의 물리적 의미와 단위를 설명하시오.

다음 순서로 설명해주세요:
1. 포인팅 벡터의 정의: S = E × H
2. 물리적 의미: 단위면적당 전력 흐름
3. 단위: V/m × A/m = W/m²
4. 포인팅 정리: ∇·S + ∂u/∂t = -J·E
5. 안테나, 도파관에서의 응용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '도체에서 표피효과(Skin Effect)가 발생하는 이유를 설명하시오.',
        answer: '고주파 전류가 도체 표면에 집중되는 현상',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 도체에서 표피효과(Skin Effect)가 발생하는 이유를 설명하시오.

다음 순서로 설명해주세요:
1. 표피효과의 정의
2. 발생 원인 (와전류에 의한 자기차폐)
3. 침투깊이: δ = √(2/ωμσ)
4. 주파수가 높을수록 δ 감소
5. 고주파 회로 설계 시 고려사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '평면파의 전계와 자계의 위상관계와 진폭비(파동임피던스)를 구하시오.',
        answer: 'E/H = η = √(μ/ε), 동위상',
        prompt: `전기기사 전기자기학 문제입니다.

문제: 평면파의 전계와 자계의 위상관계와 진폭비(파동임피던스)를 구하시오.

다음 순서로 설명해주세요:
1. 평면파 해: E = E₀e^(j(ωt-βz))
2. E와 H는 동위상 (무손실 매질)
3. 파동임피던스: η = |E|/|H| = √(μ/ε)
4. 진공에서: η₀ = √(μ₀/ε₀) = 377Ω
5. 반사계수와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '∇·B = 0의 물리적 의미를 설명하시오.',
        answer: '자기 모노폴(자기 홀극)이 존재하지 않음',
        prompt: `전기기사 전기자기학 문제입니다.

문제: ∇·B = 0의 물리적 의미를 설명하시오.

다음 순서로 설명해주세요:
1. 가우스 자기법칙
2. 자력선은 항상 폐곡선 형성
3. 자기 홀극(모노폴)이 없다
4. ∇·D = ρ와의 비교 (전기 홀극은 존재)
5. 벡터 퍼텐셜 A의 존재 보장

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  }
];

export default function ElectricMagneticStudyPage() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [copied, setCopied] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('electric-magnetic-completed');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(activeQuestion.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(activeQuestion.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const urls = {
      claude: 'https://claude.ai/new',
      chatgpt: 'https://chat.openai.com/',
      gemini: 'https://gemini.google.com/'
    };
    window.open(urls[selectedAI], '_blank');
  };

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('electric-magnetic-completed', JSON.stringify([...newCompleted]));
  };

  const getCompletedCount = (topicId: string) => {
    return [...completedQuestions].filter(key => key.startsWith(topicId)).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-orange-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-orange-600">필기</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전기자기학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">🧲</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전기자기학 집중 학습</h1>
              <p className="text-red-100">AI와 함께 기출문제 마스터하기</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Tabs */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => { setActiveTopicId(topic.id); setActiveQuestionId(1); setShowAnswer(false); }}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTopicId === topic.id
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {topic.name}
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {getCompletedCount(topic.id)}/10
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-gray-800 mb-3">문제 목록</h3>
              <div className="space-y-2">
                {activeTopic.questions.map((q) => {
                  const isCompleted = completedQuestions.has(`${activeTopicId}-${q.id}`);
                  return (
                    <button
                      key={q.id}
                      onClick={() => { setActiveQuestionId(q.id); setShowAnswer(false); }}
                      className={`w-full text-left p-3 rounded-lg text-sm transition ${
                        activeQuestionId === q.id
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : q.id}
                        </span>
                        <span className="truncate">{q.question.slice(0, 30)}...</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Question Detail */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${activeTopic.color} text-white`}>
                  {activeTopic.name}
                </span>
                <span className="text-gray-500">문제 {activeQuestionId}/10</span>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                Q{activeQuestionId}. {activeQuestion.question}
              </h2>

              {/* Answer Toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {showAnswer ? '정답 숨기기 ▲' : '정답 보기 ▼'}
                </button>
                {showAnswer && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800">💡 정답: {activeQuestion.answer}</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Prompt Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">🤖 AI에게 질문하기</h3>
                <select
                  value={selectedAI}
                  onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt' | 'gemini')}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="claude">Claude</option>
                  <option value="chatgpt">ChatGPT</option>
                  <option value="gemini">Gemini</option>
                </select>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                {activeQuestion.prompt}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyPrompt}
                  className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {copied ? '✓ 복사됨!' : '📋 프롬프트 복사'}
                </button>
                <button
                  onClick={openAI}
                  className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 text-white ${
                    selectedAI === 'claude' ? 'bg-orange-500 hover:bg-orange-600' :
                    selectedAI === 'chatgpt' ? 'bg-green-600 hover:bg-green-700' :
                    'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  🚀 {selectedAI === 'claude' ? 'Claude' : selectedAI === 'chatgpt' ? 'ChatGPT' : 'Gemini'} 열기
                </button>
              </div>
            </div>

            {/* Complete Button */}
            {!completedQuestions.has(`${activeTopicId}-${activeQuestionId}`) ? (
              <button
                onClick={markComplete}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
              >
                ✅ 학습 완료!
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-lg text-center">
                ✓ 완료됨
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              {activeQuestionId > 1 ? (
                <button
                  onClick={() => { setActiveQuestionId(activeQuestionId - 1); setShowAnswer(false); }}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                >
                  ← 이전 문제
                </button>
              ) : <div />}
              {activeQuestionId < 10 ? (
                <button
                  onClick={() => { setActiveQuestionId(activeQuestionId + 1); setShowAnswer(false); }}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                >
                  다음 문제 →
                </button>
              ) : (
                <Link
                  href="/category/mechanical/electric-engineer/exam"
                  className="flex items-center gap-2 text-red-600 font-medium"
                >
                  필기시험으로 돌아가기 →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
