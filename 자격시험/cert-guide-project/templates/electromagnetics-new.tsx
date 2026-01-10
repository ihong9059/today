'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'vector',
    name: '벡터 해석 기초',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '직교좌표계에서 점 P(3, 4, 0)의 원통좌표계 좌표 (ρ, φ, z)를 구하시오.',
        answer: '(5, 53.13°, 0)',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 직교좌표계에서 점 P(3, 4, 0)의 원통좌표계 좌표 (ρ, φ, z)를 구하시오.

다음 순서로 설명해주세요:
1. 직교좌표계와 원통좌표계의 관계 공식
2. ρ = √(x² + y²) 계산 과정
3. φ = tan⁻¹(y/x) 계산 과정
4. z 좌표 변환
5. 최종 답과 검산

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '벡터 A = 3ax + 4ay의 크기와 단위벡터를 구하시오.',
        answer: '|A| = 5, aA = (3ax + 4ay)/5',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 벡터 A = 3ax + 4ay의 크기와 단위벡터를 구하시오.

다음 순서로 설명해주세요:
1. 벡터의 크기 공식: |A| = √(Ax² + Ay²)
2. 대입하여 크기 계산
3. 단위벡터 정의: aA = A/|A|
4. 단위벡터 계산
5. 단위벡터 크기가 1인지 검증

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '벡터 A = 2ax + 3ay와 B = 4ax - ay의 내적을 구하시오.',
        answer: 'A·B = 5',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 벡터 A = 2ax + 3ay와 B = 4ax - ay의 내적을 구하시오.

다음 순서로 설명해주세요:
1. 내적(Dot Product) 정의와 공식
2. A·B = AxBx + AyBy 적용
3. 계산 과정 상세히
4. 내적의 물리적 의미
5. 내적이 0일 때의 의미 (수직)

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '그래디언트 ∇V에서 V = x² + y²일 때 점 (1,1)에서의 ∇V를 구하시오.',
        answer: '∇V = 2ax + 2ay',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: V = x² + y²일 때 점 (1,1)에서 그래디언트(∇V)를 구하시오.

다음 순서로 설명해주세요:
1. 그래디언트의 정의와 물리적 의미
2. ∇V = (∂V/∂x)ax + (∂V/∂y)ay
3. 각 편미분 계산
4. 점 (1,1) 대입
5. 그래디언트 방향의 의미

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '발산(Divergence) ∇·F에서 F = x²ax + xyay일 때 점 (1,2)에서의 발산값을 구하시오.',
        answer: '∇·F = 2x + x = 3x = 3',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: F = x²ax + xyay일 때 점 (1,2)에서 발산(∇·F)값을 구하시오.

다음 순서로 설명해주세요:
1. 발산의 정의와 물리적 의미
2. ∇·F = ∂Fx/∂x + ∂Fy/∂y
3. 각 편미분 계산
4. 점 (1,2) 대입
5. 발산이 양수/음수일 때의 의미

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'electrostatic',
    name: '정전계 (쿨롱법칙, 전계)',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '진공 중에서 2m 떨어진 두 점전하 Q1=4μC, Q2=9μC 사이의 힘을 구하시오.',
        answer: 'F = 81 mN',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 진공 중에서 2m 떨어진 두 점전하 Q1=4μC, Q2=9μC 사이의 힘을 구하시오.

다음 순서로 설명해주세요:
1. 쿨롱의 법칙: F = kQ1Q2/r²
2. k = 9×10⁹ N·m²/C²
3. 단위 변환 (μC → C)
4. 대입하여 계산
5. 인력/척력 판단

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '점전하 Q=10nC로부터 2m 떨어진 점의 전계의 세기를 구하시오.',
        answer: 'E = 22.5 V/m',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 점전하 Q=10nC로부터 2m 떨어진 점의 전계의 세기를 구하시오.

다음 순서로 설명해주세요:
1. 점전하에 의한 전계 공식: E = kQ/r²
2. k = 9×10⁹ N·m²/C²
3. 단위 변환 (nC → C)
4. 대입하여 계산
5. 전계의 방향

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '점전하 Q=5μC에서 2m 떨어진 점의 전위를 구하시오.',
        answer: 'V = 22.5 kV',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 점전하 Q=5μC에서 2m 떨어진 점의 전위를 구하시오.

다음 순서로 설명해주세요:
1. 점전하에 의한 전위 공식: V = kQ/r
2. k = 9×10⁹ N·m²/C²
3. 대입하여 계산
4. 전위와 전계의 관계
5. 전위차의 의미

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '전계 E = 100 V/m인 균일 전계에서 전하 q=2μC를 0.5m 이동시킬 때 필요한 일을 구하시오.',
        answer: 'W = 100 μJ',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 전계 E = 100 V/m인 균일 전계에서 전하 q=2μC를 전계 방향으로 0.5m 이동시킬 때 필요한 일을 구하시오.

다음 순서로 설명해주세요:
1. 일과 전위차의 관계: W = qΔV
2. 균일전계에서 전위차: V = E·d
3. 대입하여 계산
4. 에너지의 의미
5. 양의 일/음의 일

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '전위 V = 2x² + 3y일 때, 점 (1, 2)에서의 전계 E를 구하시오.',
        answer: 'E = -4ax - 3ay V/m',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 전위 V = 2x² + 3y일 때, 점 (1, 2)에서의 전계 E를 구하시오.

다음 순서로 설명해주세요:
1. 전계와 전위의 관계: E = -∇V
2. Ex = -∂V/∂x 계산
3. Ey = -∂V/∂y 계산
4. 점 (1, 2) 대입
5. 결과 해석

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'capacitor',
    name: '정전용량과 콘덴서',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '평행판 콘덴서의 면적 A=0.01m², 간격 d=1mm, 비유전율 εr=2일 때 정전용량을 구하시오.',
        answer: 'C = 177 pF',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 평행판 콘덴서의 면적 A=0.01m², 간격 d=1mm, 비유전율 εr=2일 때 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 평행판 콘덴서 정전용량 공식: C = ε₀εrA/d
2. ε₀ = 8.854×10⁻¹² F/m
3. 단위 환산 주의
4. 대입하여 계산
5. 정전용량을 증가시키는 방법

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '콘덴서 C1=3μF, C2=6μF를 직렬 연결했을 때 합성 정전용량을 구하시오.',
        answer: 'C = 2 μF',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 콘덴서 C1=3μF, C2=6μF를 직렬 연결했을 때 합성 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 직렬 연결 합성 공식: 1/C = 1/C1 + 1/C2
2. 대입하여 계산
3. 직렬 연결 시 전압 분배
4. 직렬 연결의 특징
5. 간단한 계산법: C = C1×C2/(C1+C2)

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '콘덴서 C1=3μF, C2=6μF를 병렬 연결했을 때 합성 정전용량을 구하시오.',
        answer: 'C = 9 μF',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 콘덴서 C1=3μF, C2=6μF를 병렬 연결했을 때 합성 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 병렬 연결 합성 공식: C = C1 + C2
2. 대입하여 계산
3. 병렬 연결 시 전압 동일
4. 병렬 연결의 특징
5. 직렬과 병렬 비교

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '정전용량 C=10μF인 콘덴서에 100V를 인가했을 때 저장되는 에너지를 구하시오.',
        answer: 'W = 50 mJ',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 정전용량 C=10μF인 콘덴서에 100V를 인가했을 때 저장되는 에너지를 구하시오.

다음 순서로 설명해주세요:
1. 콘덴서 에너지 공식: W = (1/2)CV²
2. 다른 형태: W = (1/2)QV = Q²/2C
3. 대입하여 계산
4. 에너지 저장 원리
5. 실제 응용 예시

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '콘덴서에 충전된 전하 Q=100μC, 전압 V=50V일 때 정전용량을 구하시오.',
        answer: 'C = 2 μF',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 콘덴서에 충전된 전하 Q=100μC, 전압 V=50V일 때 정전용량을 구하시오.

다음 순서로 설명해주세요:
1. 정전용량 정의: C = Q/V
2. 대입하여 계산
3. 정전용량의 단위
4. Q-V 관계 그래프
5. 정전용량의 물리적 의미

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'magnetostatic',
    name: '자계와 전자력',
    color: 'from-red-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '무한히 긴 직선 도선에 I=10A가 흐를 때 도선에서 r=0.5m 떨어진 점의 자계를 구하시오.',
        answer: 'H = 3.18 A/m',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 무한히 긴 직선 도선에 I=10A가 흐를 때 도선에서 r=0.5m 떨어진 점의 자계를 구하시오.

다음 순서로 설명해주세요:
1. 암페어 주회법칙: H = I/2πr
2. 대입하여 계산
3. 자계의 방향 (오른손 법칙)
4. 자속밀도 B = μ₀H
5. 실제 응용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '솔레노이드 코일(n=1000턴/m, I=2A)의 내부 자계를 구하시오.',
        answer: 'H = 2000 A/m',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 솔레노이드 코일(n=1000턴/m, I=2A)의 내부 자계를 구하시오.

다음 순서로 설명해주세요:
1. 솔레노이드 내부 자계: H = nI
2. 대입하여 계산
3. 자속밀도: B = μ₀H
4. 솔레노이드의 특징
5. 전자석 응용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '자속밀도 B=0.5T인 균일 자계에서 길이 l=0.2m, 전류 I=10A인 도선에 작용하는 힘을 구하시오.',
        answer: 'F = 1 N',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 자속밀도 B=0.5T인 균일 자계에서 길이 l=0.2m, 전류 I=10A인 도선에 작용하는 힘을 구하시오. (도선과 자계가 수직)

다음 순서로 설명해주세요:
1. 전자력 공식: F = BIL
2. 수직일 때 최대
3. 대입하여 계산
4. 힘의 방향 (플레밍 왼손법칙)
5. 전동기 원리

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '비투자율 μr=1000인 철심의 자속밀도가 B=1T일 때 자계의 세기 H를 구하시오.',
        answer: 'H ≈ 796 A/m',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 비투자율 μr=1000인 철심의 자속밀도가 B=1T일 때 자계의 세기 H를 구하시오.

다음 순서로 설명해주세요:
1. B = μH = μ₀μrH 관계
2. H = B/(μ₀μr) 유도
3. μ₀ = 4π×10⁻⁷ H/m
4. 대입하여 계산
5. B-H 곡선 설명

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '두 평행 도선(간격 d=0.1m)에 같은 방향으로 I1=I2=10A가 흐를 때 단위길이당 힘을 구하시오.',
        answer: 'F/L = 2×10⁻⁴ N/m (인력)',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 두 평행 도선(간격 d=0.1m)에 같은 방향으로 I1=I2=10A가 흐를 때 단위길이당 힘을 구하시오.

다음 순서로 설명해주세요:
1. F/L = μ₀I1I2/2πd 공식
2. μ₀ = 4π×10⁻⁷ H/m
3. 대입하여 계산
4. 같은 방향: 인력
5. 반대 방향: 척력

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'inductance',
    name: '인덕턴스와 자기에너지',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '솔레노이드(N=200턴, l=0.5m, A=10cm², μr=1)의 자기인덕턴스를 구하시오.',
        answer: 'L = 100.5 μH',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 솔레노이드(N=200턴, l=0.5m, A=10cm², μr=1)의 자기인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 자기인덕턴스 공식: L = μ₀μrN²A/l
2. 단위 변환 (cm² → m²)
3. 대입하여 계산
4. 인덕턴스의 물리적 의미
5. 철심 삽입 효과

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '인덕턴스 L=10mH에 전류 I=5A가 흐를 때 저장되는 에너지를 구하시오.',
        answer: 'W = 125 mJ',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 인덕턴스 L=10mH에 전류 I=5A가 흐를 때 저장되는 에너지를 구하시오.

다음 순서로 설명해주세요:
1. 인덕터 에너지 공식: W = (1/2)LI²
2. 대입하여 계산
3. 콘덴서 에너지와 비교
4. 에너지 저장 원리
5. LC 회로 에너지 교환

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '두 코일의 L1=4mH, L2=9mH, 결합계수 k=0.5일 때 상호인덕턴스를 구하시오.',
        answer: 'M = 3 mH',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 두 코일의 L1=4mH, L2=9mH, 결합계수 k=0.5일 때 상호인덕턴스를 구하시오.

다음 순서로 설명해주세요:
1. 상호인덕턴스 공식: M = k√(L1L2)
2. 대입하여 계산
3. 결합계수 k의 범위 (0~1)
4. 변압기 원리
5. 완전 결합과 무결합

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '인덕턴스 L에서 전류가 di/dt=100A/s로 변할 때 유도기전력이 10V이면 L은?',
        answer: 'L = 0.1 H = 100 mH',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 인덕턴스 L에서 전류가 di/dt=100A/s로 변할 때 유도기전력이 10V이면 L은?

다음 순서로 설명해주세요:
1. 유도기전력 공식: e = L(di/dt)
2. L = e/(di/dt) 유도
3. 대입하여 계산
4. 렌츠 법칙
5. 자기유도 현상

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '자기회로에서 자속 Φ=0.01Wb, 기자력 F=1000AT일 때 자기저항 Rm을 구하시오.',
        answer: 'Rm = 100,000 AT/Wb',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 자기회로에서 자속 Φ=0.01Wb, 기자력 F=1000AT일 때 자기저항 Rm을 구하시오.

다음 순서로 설명해주세요:
1. 자기 옴의 법칙: Φ = F/Rm
2. Rm = F/Φ 유도
3. 대입하여 계산
4. 자기저항 공식: Rm = l/(μA)
5. 전기회로와 비교

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'induction',
    name: '전자유도와 교류',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '자속이 Φ=0.1sin(100πt) Wb로 변할 때 유도기전력의 최댓값을 구하시오.',
        answer: 'em = 31.4 V',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 자속이 Φ=0.1sin(100πt) Wb로 변할 때 유도기전력의 최댓값을 구하시오.

다음 순서로 설명해주세요:
1. 패러데이 법칙: e = -dΦ/dt
2. Φ = Φm·sin(ωt)일 때 미분
3. 최댓값: em = ωΦm
4. ω = 100π에서 주파수 확인
5. 발전기 원리

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '도체 막대(l=0.5m)가 B=0.2T 자계에서 v=10m/s로 이동할 때 유도기전력은?',
        answer: 'e = 1 V',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 도체 막대(l=0.5m)가 B=0.2T 자계에서 v=10m/s로 수직 이동할 때 유도기전력은?

다음 순서로 설명해주세요:
1. 운동기전력 공식: e = Blv
2. 대입하여 계산
3. 플레밍 오른손 법칙
4. 발전기 원리
5. 실제 응용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'N=100턴 코일이 B=0.5T 자계에서 1200rpm으로 회전할 때 유도기전력 최댓값은? (A=0.01m²)',
        answer: 'em = 62.8 V',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: N=100턴 코일이 B=0.5T 자계에서 1200rpm으로 회전할 때 유도기전력 최댓값은? (A=0.01m²)

다음 순서로 설명해주세요:
1. rpm → rad/s 변환: ω = 2πn/60
2. 유도기전력 최댓값: em = NABω
3. 대입하여 계산
4. 발전기 구조
5. 주파수 계산

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '진공 중 전자파의 속도를 ε₀, μ₀로 표현하시오.',
        answer: 'c = 1/√(ε₀μ₀) = 3×10⁸ m/s',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 진공 중 전자파의 속도를 ε₀, μ₀로 표현하시오.

다음 순서로 설명해주세요:
1. 전자파 속도 공식: c = 1/√(ε₀μ₀)
2. 맥스웰 방정식에서 유도
3. 수치 계산
4. 광속과 동일함 확인
5. 매질에서의 속도

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '변위전류의 물리적 의미와 공식을 설명하시오.',
        answer: 'Jd = ε∂E/∂t: 시변 전계가 만드는 등가 전류',
        prompt: `전기산업기사 전기자기학 문제입니다.

문제: 변위전류의 물리적 의미와 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 변위전류 정의: Jd = ε∂E/∂t
2. 맥스웰의 발견
3. 콘덴서에서의 연속성
4. 전자파 발생 원리
5. 전도전류와 비교

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  }
];

export default function ElectricCraftsmanElectromagneticsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-electromagnetics-progress');
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
    localStorage.setItem('electric-craftsman-electromagnetics-progress', JSON.stringify(newCompleted));
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
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전기자기학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">전기자기학 학습</h1>
                <p className="text-orange-100">전기산업기사 필기 1과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-orange-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
