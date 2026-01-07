'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'dc-circuit',
    name: '직류회로',
    color: 'from-orange-600 to-orange-500',
    questions: [
      { id: 1, question: '옴의 법칙(V=IR)에서 저항이 일정할 때 전압과 전류의 관계를 설명하시오.', answer: '전압과 전류는 비례관계, 전압이 2배가 되면 전류도 2배', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 옴의 법칙(V=IR)에서 저항이 일정할 때 전압과 전류의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '직렬회로에서 전체 저항과 전류 분배 특성을 설명하시오.', answer: 'R총=R1+R2+..., 전류 동일, 전압 분배', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 직렬회로에서 전체 저항과 전류 분배 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '병렬회로에서 전체 저항 계산 공식과 전류 분배를 설명하시오.', answer: '1/R총=1/R1+1/R2+..., 전압 동일, 전류 분배', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 병렬회로에서 전체 저항 계산 공식과 전류 분배를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '키르히호프 전류법칙(KCL)을 설명하시오.', answer: '한 점에 유입되는 전류의 합 = 유출되는 전류의 합', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 키르히호프 전류법칙(KCL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '키르히호프 전압법칙(KVL)을 설명하시오.', answer: '폐회로에서 전압 강하의 합 = 기전력의 합', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 키르히호프 전압법칙(KVL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'ac-circuit',
    name: '교류회로',
    color: 'from-red-600 to-red-500',
    questions: [
      { id: 1, question: '교류의 주파수, 주기, 각주파수의 관계를 설명하시오.', answer: 'f=1/T, ω=2πf, T=주기(초), f=주파수(Hz)', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 교류의 주파수, 주기, 각주파수의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: 'RLC 직렬회로의 임피던스 계산 공식을 설명하시오.', answer: 'Z=√(R²+(XL-XC)²), XL=ωL, XC=1/ωC', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: RLC 직렬회로의 임피던스 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '직렬공진 조건과 공진 시 회로 특성을 설명하시오.', answer: 'XL=XC, 임피던스 최소(Z=R), 전류 최대', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 직렬공진 조건과 공진 시 회로 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '역률(Power Factor)의 정의와 개선 방법을 설명하시오.', answer: 'cosθ=P/S, 콘덴서 병렬 연결로 개선', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 역률(Power Factor)의 정의와 개선 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '3상 교류의 Y결선과 Δ결선의 전압/전류 관계를 비교하시오.', answer: 'Y결선: VL=√3Vp, IL=Ip / Δ결선: VL=Vp, IL=√3Ip', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 3상 교류의 Y결선과 Δ결선의 전압/전류 관계를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'electromagnetics',
    name: '전자기학',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '패러데이 전자유도 법칙을 설명하시오.', answer: '유도기전력 e=-N(dΦ/dt), 자속 변화에 비례', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 패러데이 전자유도 법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '렌츠의 법칙과 유도기전력의 방향을 설명하시오.', answer: '유도전류는 자속 변화를 방해하는 방향으로 흐름', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 렌츠의 법칙과 유도기전력의 방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '자기회로와 전기회로의 대응 관계를 설명하시오.', answer: '기자력↔기전력, 자속↔전류, 자기저항↔저항', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 자기회로와 전기회로의 대응 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '자기 인덕턴스(L)와 상호 인덕턴스(M)를 설명하시오.', answer: 'L=NΦ/I(자기유도), M=N2Φ12/I1(상호유도)', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 자기 인덕턴스(L)와 상호 인덕턴스(M)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '히스테리시스 손실과 와전류 손실을 설명하시오.', answer: '히스테리시스: 자화곡선 면적 비례, 와전류: 주파수² 비례', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 히스테리시스 손실과 와전류 손실을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'electrical-machine',
    name: '전기기기',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '변압기의 원리와 권수비에 따른 전압/전류 관계를 설명하시오.', answer: 'V1/V2=N1/N2=I2/I1, 전자유도 원리', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 변압기의 원리와 권수비에 따른 전압/전류 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '유도전동기의 회전원리와 슬립(slip)을 설명하시오.', answer: 's=(Ns-N)/Ns×100%, 회전자계와 회전자 속도 차', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 유도전동기의 회전원리와 슬립(slip)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '동기발전기의 동기속도 계산 공식을 설명하시오.', answer: 'Ns=120f/P (rpm), f=주파수, P=극수', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 동기발전기의 동기속도 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '직류전동기의 종류와 특성을 비교하시오.', answer: '분권형(정속도), 직권형(고기동토크), 복권형(중간특성)', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 직류전동기의 종류와 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '전동기의 역률과 효율 계산 방법을 설명하시오.', answer: '효율=출력/입력×100%, 역률=유효전력/피상전력', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전동기의 역률과 효율 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'power-system',
    name: '전력설비',
    color: 'from-orange-600 to-orange-400',
    questions: [
      { id: 1, question: '수변전설비의 구성요소와 역할을 설명하시오.', answer: '차단기, 변압기, 단로기, 계전기, PF, CT, PT', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 수변전설비의 구성요소와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '단상 3선식과 3상 4선식 배전방식을 비교하시오.', answer: '단상3선: 110/220V, 3상4선: 220/380V 동시 사용', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 단상 3선식과 3상 4선식 배전방식을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '변류기(CT)와 계기용변압기(PT)의 역할을 설명하시오.', answer: 'CT: 대전류→소전류 변환, PT: 고전압→저전압 변환', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 변류기(CT)와 계기용변압기(PT)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '차단기의 종류(ACB, VCB, MCCB)와 특징을 설명하시오.', answer: 'ACB: 기중, VCB: 진공, MCCB: 배선용(과전류보호)', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 차단기의 종류(ACB, VCB, MCCB)와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '무정전전원장치(UPS)의 종류와 동작원리를 설명하시오.', answer: '온라인(상시 인버터), 오프라인(정전 시 전환), 라인인터랙티브', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 무정전전원장치(UPS)의 종류와 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'sequence-control',
    name: '시퀀스제어',
    color: 'from-red-600 to-red-400',
    questions: [
      { id: 1, question: '전자릴레이(Relay)의 구조와 동작원리를 설명하시오.', answer: '코일에 전류→전자석→접점 개폐, a접점/b접점', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전자릴레이(Relay)의 구조와 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: 'PLC(Programmable Logic Controller)의 구성과 동작을 설명하시오.', answer: 'CPU, 입력부, 출력부, 메모리, 전원부로 구성', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: PLC(Programmable Logic Controller)의 구성과 동작을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: 'AND, OR, NOT 논리회로의 진리표를 설명하시오.', answer: 'AND: 둘 다 1→1, OR: 하나라도 1→1, NOT: 반전', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: AND, OR, NOT 논리회로의 진리표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '자기유지회로(Self-holding circuit)를 설명하시오.', answer: '버튼 해제 후에도 릴레이가 동작상태 유지하는 회로', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 자기유지회로(Self-holding circuit)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '타이머(Timer)와 카운터(Counter)의 종류와 용도를 설명하시오.', answer: '한시동작/한시복귀 타이머, 업/다운 카운터', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 타이머(Timer)와 카운터(Counter)의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'measurement',
    name: '전기측정',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '전압계, 전류계, 전력계의 접속 방법을 설명하시오.', answer: '전압계: 병렬, 전류계: 직렬, 전력계: 전압/전류 동시', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전압계, 전류계, 전력계의 접속 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '멀티미터(테스터)의 사용법과 주의사항을 설명하시오.', answer: '측정범위 선택, 극성 확인, 고전압 시 AC/DC 확인', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 멀티미터(테스터)의 사용법과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '절연저항계(메거)의 측정원리와 판정기준을 설명하시오.', answer: '고전압 인가→누설전류 측정, 최소 0.1MΩ 이상', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 절연저항계(메거)의 측정원리와 판정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '접지저항 측정방법(3전극법)을 설명하시오.', answer: 'E(접지극), P(전위극), C(전류극) 일직선 배치', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 접지저항 측정방법(3전극법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '클램프미터의 원리와 사용 용도를 설명하시오.', answer: '전류에 의한 자계 측정, 비접촉 전류측정 가능', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 클램프미터의 원리와 사용 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'wiring-design',
    name: '배선설계',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '전선의 허용전류와 굵기 선정 방법을 설명하시오.', answer: '부하전류 ≤ 허용전류, 전압강하 고려하여 굵기 결정', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전선의 허용전류와 굵기 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '전압강하 계산 공식과 허용범위를 설명하시오.', answer: 'e=2IR (단상), e=√3IR (3상), 내선규정 3% 이내', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전압강하 계산 공식과 허용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '금속관 공사와 합성수지관 공사의 시공방법을 비교하시오.', answer: '금속관: 접지필요, 굴곡제한 / 합성수지관: 내식성, 절연성', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 금속관 공사와 합성수지관 공사의 시공방법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '내화배선과 내열배선의 차이와 적용기준을 설명하시오.', answer: '내화: 30분 이상 기능유지, 내열: 15분 이상', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 내화배선과 내열배선의 차이와 적용기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '간선과 분기회로의 설계 기준을 설명하시오.', answer: '간선: 총부하용량, 분기회로: 콘센트/조명 분리', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 간선과 분기회로의 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'grounding-lightning',
    name: '접지 및 피뢰',
    color: 'from-orange-600 to-amber-500',
    questions: [
      { id: 1, question: '접지의 종류(제1종~특별 제3종)와 접지저항 기준을 설명하시오.', answer: '1종:10Ω, 2종:계산, 3종:100Ω, 특3종:10Ω', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 접지의 종류(제1종~특별 제3종)와 접지저항 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '등전위 본딩의 목적과 시공방법을 설명하시오.', answer: '전위차 제거로 감전방지, 금속체 상호 연결', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 등전위 본딩의 목적과 시공방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '피뢰설비의 구성요소와 보호각 개념을 설명하시오.', answer: '수뢰부, 인하도선, 접지극, 보호각 45~60도', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 피뢰설비의 구성요소와 보호각 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: 'SPD(서지보호장치)의 종류와 설치위치를 설명하시오.', answer: 'Type1: 인입구, Type2: 분전반, Type3: 기기 근접', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: SPD(서지보호장치)의 종류와 설치위치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: 'TN, TT, IT 접지방식의 특징을 비교하시오.', answer: 'TN: 계통접지, TT: 독립접지, IT: 비접지', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: TN, TT, IT 접지방식의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'electrical-safety',
    name: '전기안전',
    color: 'from-red-600 to-rose-500',
    questions: [
      { id: 1, question: '감전의 위험도에 영향을 미치는 요소를 설명하시오.', answer: '전류크기, 통전시간, 전류경로, 주파수, 인체저항', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 감전의 위험도에 영향을 미치는 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 2, question: '누전차단기(ELB/RCD)의 동작원리와 정격감도전류를 설명하시오.', answer: '영상변류기로 누설전류 검출, 30mA(인체보호용)', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 누전차단기(ELB/RCD)의 동작원리와 정격감도전류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 3, question: '과전류 보호장치(퓨즈, 배선용차단기)의 동작특성을 설명하시오.', answer: '정격전류의 1.1~1.25배 시 일정시간 후 차단', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 과전류 보호장치(퓨즈, 배선용차단기)의 동작특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 4, question: '전기화재의 원인과 예방대책을 설명하시오.', answer: '단락, 과부하, 누전, 접촉불량 → 정기점검, 적정용량', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전기화재의 원인과 예방대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
      { id: 5, question: '전기작업 시 안전수칙과 활선작업 주의사항을 설명하시오.', answer: '정전 확인, 검전기 사용, 절연공구, 안전장구 착용', prompt: `소방설비기사(전기) 소방전기일반 문제입니다.\n\n문제: 전기작업 시 안전수칙과 활선작업 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 계산 공식\n3. 계산 예시\n4. 회로 적용\n5. 기출 포인트` },
    ],
  },
];

export default function ElectricalBasicsPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['dc-circuit']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-elec-basics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-elec-basics-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-electrical" className="text-gray-600 hover:text-orange-600">소방설비기사(전기)</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">소방전기일반</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방전기일반</h1>
              <p className="text-orange-100">소방설비기사(전기) 2과목 - 직류/교류회로, 전기기기, 시퀀스제어</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-orange-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-orange-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
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

      {/* AI Modal */}
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
