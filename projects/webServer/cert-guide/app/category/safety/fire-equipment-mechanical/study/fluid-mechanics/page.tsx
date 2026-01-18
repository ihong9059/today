'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'hydrostatics',
    name: '유체정역학',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '압력의 정의와 단위 환산을 설명하시오.', answer: 'P=F/A, 1bar=10^5Pa, 1kgf/cm2=98.07kPa=0.9807bar', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 압력의 정의와 단위 환산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력의 정의\n2. 압력 단위(Pa, bar, kgf/cm2)\n3. 단위 환산\n4. 게이지압과 절대압\n5. 소방설비 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '파스칼의 원리를 설명하시오.', answer: '밀폐된 유체의 한 점에 가한 압력은 모든 방향으로 같은 크기로 전달', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 파스칼의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파스칼의 원리 정의\n2. 압력 전달 특성\n3. 유압장치 응용\n4. 소방설비 적용 예\n5. 계산 예제\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '정지 유체 내 압력 분포를 설명하시오.', answer: 'P=rho*g*h, 수심이 깊을수록 압력 증가, 같은 수평면은 동일 압력', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 정지 유체 내 압력 분포를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정수압 공식\n2. 수심과 압력 관계\n3. 수평면 압력\n4. 연결관 원리\n5. 수조/탱크 설계 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '부력과 아르키메데스 원리를 설명하시오.', answer: '부력=배제한 유체의 무게, FB=rho*g*V', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 부력과 아르키메데스 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아르키메데스 원리\n2. 부력 계산식\n3. 부유/침강 조건\n4. 비중과의 관계\n5. 소방설비 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '마노미터(압력계)의 원리를 설명하시오.', answer: 'U자관, 경사관, 차압계 등 / P=rho*g*h 이용', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 마노미터의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. U자관 마노미터\n2. 경사관 마노미터\n3. 차압계\n4. 압력 측정 원리\n5. 측정 계산 예제\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '절대압력과 게이지압력의 관계를 설명하시오.', answer: '절대압력 = 게이지압력 + 대기압력(약 101.325kPa)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 절대압력과 게이지압력의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절대압력 정의\n2. 게이지압력 정의\n3. 대기압과의 관계\n4. 진공압력\n5. 소방설비에서의 압력 표현\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '잠긴 평면에 작용하는 전수압을 설명하시오.', answer: 'F=rho*g*hc*A (hc: 도심 깊이, A: 면적)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 잠긴 평면에 작용하는 전수압을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전수압 공식\n2. 도심과 압력중심\n3. 경사면의 경우\n4. 수직면의 경우\n5. 수문 설계 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '유체의 점성과 점성계수를 설명하시오.', answer: '점성: 유체의 흐름 저항성, 동점성계수 nu = mu/rho', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 유체의 점성과 점성계수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점성의 정의\n2. 동점성계수와 절대점성계수\n3. 뉴턴 유체\n4. 온도와 점성 관계\n5. 배관 유동에서의 영향\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '표면장력과 모세관 현상을 설명하시오.', answer: '표면장력: 표면적 최소화 경향, 모세관: h = 4*sigma*cos(theta)/(rho*g*d)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 표면장력과 모세관 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표면장력 정의\n2. 모세관 현상\n3. 접촉각\n4. 상승/하강 높이\n5. 소방설비 관련 현상\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '유체의 압축성과 체적탄성계수를 설명하시오.', answer: 'K = -V*(dP/dV), 물의 경우 약 2.2GPa로 비압축성으로 취급', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 유체의 압축성과 체적탄성계수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압축성 정의\n2. 체적탄성계수\n3. 비압축성 유체\n4. 압축성 유체\n5. 수격작용과의 관계\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'hydrodynamics',
    name: '유체동역학',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '연속방정식을 설명하시오.', answer: 'A1*V1=A2*V2, 질량보존법칙, 단면적 감소시 속도 증가', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 연속방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연속방정식 유도\n2. 질량보존법칙\n3. 단면적과 유속 관계\n4. 배관 축소/확대 적용\n5. 계산 예제\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '베르누이 방정식을 설명하시오.', answer: 'P/(rho*g) + V^2/(2g) + Z = 일정, 에너지보존법칙', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 베르누이 방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 베르누이 방정식\n2. 압력수두, 속도수두, 위치수두\n3. 에너지보존법칙\n4. 적용 조건과 제한\n5. 소방배관 설계 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '레이놀즈 수와 유동 형태를 설명하시오.', answer: 'Re=rho*V*D/mu, Re<2300 층류, Re>4000 난류', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 레이놀즈 수와 유동 형태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레이놀즈 수 정의\n2. 층류와 난류 구분\n3. 천이영역\n4. 점성의 영향\n5. 배관 설계 고려사항\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '오리피스와 벤투리미터를 설명하시오.', answer: '유량측정장치, Q=C*A*sqrt(2*g*delta_h), 오리피스 간단/손실大, 벤투리 정확/손실小', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 오리피스와 벤투리미터를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오리피스 원리\n2. 벤투리미터 원리\n3. 유량 계산식\n4. 장단점 비교\n5. 소방설비 유량측정\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '토리첼리 정리를 설명하시오.', answer: '방출속도 V=sqrt(2*g*h), 수조 바닥 작은 구멍에서 물 방출', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 토리첼리 정리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토리첼리 정리 내용\n2. 방출속도 공식\n3. 유량 계산\n4. 방출시간 계산\n5. 소방수조 설계 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '피토관의 원리와 유속 측정을 설명하시오.', answer: 'V = sqrt(2*g*h) 또는 V = sqrt(2*delta_P/rho), 정압과 동압 측정', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 피토관의 원리와 유속 측정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피토관 구조\n2. 정압과 동압\n3. 유속 계산식\n4. 피토-정압관\n5. 소방설비 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '유체역학적 에너지(수두)의 종류를 설명하시오.', answer: '압력수두(P/rho*g), 속도수두(V^2/2g), 위치수두(Z)의 합 = 전수두', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 유체역학적 에너지(수두)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력수두\n2. 속도수두\n3. 위치수두\n4. 전수두\n5. 수두 손실과 에너지 보존\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '층류와 난류의 유속분포를 비교하시오.', answer: '층류: 포물선 분포(최대유속=2*평균유속), 난류: 균일에 가까운 분포', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 층류와 난류의 유속분포를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 층류 유속분포\n2. 난류 유속분포\n3. 평균유속과 최대유속\n4. 에너지 보정계수\n5. 배관 유동 해석\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '유량계의 종류와 특성을 설명하시오.', answer: '차압식(오리피스, 벤투리), 용적식, 터빈식, 초음파식, 전자기식 등', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 유량계의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차압식 유량계\n2. 용적식 유량계\n3. 터빈식 유량계\n4. 기타 유량계\n5. 소방설비 유량측정\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '운동량 방정식을 설명하시오.', answer: 'F = rho*Q*(V2-V1), 유체가 물체에 작용하는 힘 계산', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 운동량 방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운동량 정리\n2. 힘과 운동량 변화\n3. 배관 벤드의 힘\n4. 노즐의 반력\n5. 소방호스 반동력 계산\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'pipe-flow',
    name: '배관유동',
    color: 'from-blue-600 to-blue-500',
    questions: [
      { id: 1, question: '마찰손실수두를 설명하시오.', answer: 'Darcy-Weisbach: hf=f*(L/D)*(V^2/2g), Hazen-Williams: hf=10.67*Q^1.85/(C^1.85*D^4.87)*L', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 마찰손실수두를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Darcy-Weisbach 공식\n2. Hazen-Williams 공식\n3. 마찰계수\n4. 관경/유량/손실 관계\n5. 소방배관 손실 계산\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '형상손실(국부손실)을 설명하시오.', answer: '엘보, 밸브, 축소/확대 등에서 손실, hL=K*(V^2/2g)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 형상손실을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형상손실 정의\n2. 손실계수 K값\n3. 주요 관부속품 손실\n4. 등가관길이 개념\n5. 배관 설계 고려사항\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '배관의 직렬 및 병렬연결을 설명하시오.', answer: '직렬: Q동일, h합산 / 병렬: h동일, Q합산', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 배관의 직렬 및 병렬연결을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬연결 특성\n2. 병렬연결 특성\n3. 유량 분배\n4. 손실수두 계산\n5. 소방배관망 설계\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '관망해석(Hardy-Cross법)을 설명하시오.', answer: '반복계산법, Sum(hL)=0(루프), Sum(Q)=0(절점)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 관망해석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Hardy-Cross법 원리\n2. 루프방정식\n3. 절점방정식\n4. 반복계산 절차\n5. 스프링클러 배관망 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '수격현상(워터해머)을 설명하시오.', answer: '급폐쇄 시 압력상승, delta_P=rho*c*V, c=음속, 배관파손위험', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 수격현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수격현상 발생원인\n2. 압력상승 계산\n3. 파동속도\n4. 배관 손상 위험\n5. 방지대책\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: 'Hazen-Williams 공식과 C계수를 설명하시오.', answer: 'V=0.85*C*R^0.63*S^0.54, 배관재질별 C값(주철120, 강관130 등)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: Hazen-Williams 공식과 C계수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Hazen-Williams 공식\n2. C계수의 의미\n3. 배관재질별 C값\n4. 동수반경\n5. 소방배관 설계 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '무디 선도(Moody Chart)를 설명하시오.', answer: '레이놀즈수와 상대조도로 마찰계수 결정, 층류/난류영역 구분', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 무디 선도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무디 선도 구성\n2. 레이놀즈수\n3. 상대조도\n4. 마찰계수 결정\n5. 배관 손실 계산 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '등가관길이법을 설명하시오.', answer: '관부속품 손실을 직관 길이로 환산, Le = K*D/f', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 등가관길이법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등가관길이 정의\n2. 손실계수와의 관계\n3. 관부속품별 등가관길이\n4. 배관 총손실 계산\n5. 실무 적용 예시\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '배관 내 공기 혼입 문제와 대책을 설명하시오.', answer: '공기 혼입시 유량 감소/이상음, 공기빼기 밸브, 배관 경사 설치', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 배관 내 공기 혼입 문제와 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공기 혼입 원인\n2. 발생 문제점\n3. 공기빼기 방법\n4. 배관 설계시 고려사항\n5. 소방배관 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '배관의 유속 제한 기준을 설명하시오.', answer: '소방배관: 6m/s 이하(주배관), 10m/s 이하(가지배관), 과속시 소음/진동/침식', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 배관의 유속 제한 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유속 제한 이유\n2. 소방배관 기준\n3. 과속 시 문제점\n4. 경제적 유속\n5. 배관 구경 결정\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'pump-theory',
    name: '펌프이론',
    color: 'from-cyan-600 to-cyan-500',
    questions: [
      { id: 1, question: '펌프의 종류와 특성을 설명하시오.', answer: '원심펌프(대유량 저양정), 터빈펌프(고양정), 용적형펌프(정량토출)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원심펌프\n2. 터빈펌프\n3. 용적형펌프\n4. 각 펌프 특성비교\n5. 소방설비 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '펌프의 양정과 동력을 설명하시오.', answer: 'H=전양정(흡입+토출양정+손실), L=rho*g*Q*H/eta', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 양정과 동력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전양정 개념\n2. 실양정과 손실양정\n3. 펌프 동력 계산\n4. 펌프 효율\n5. 펌프 선정 계산\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '펌프의 성능곡선을 설명하시오.', answer: 'Q-H곡선, 효율곡선, 동력곡선, 운전점=시스템곡선 교점', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 성능곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Q-H 곡선\n2. 효율 곡선\n3. 동력 곡선\n4. 운전점 결정\n5. 최적 운전영역\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '캐비테이션을 설명하시오.', answer: '흡입측 압력저하 -> 증기포 발생 -> 파손, NPSH>NPSHr 필요', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 캐비테이션을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 캐비테이션 발생원리\n2. NPSH 개념\n3. 캐비테이션 영향\n4. 발생 조건\n5. 방지 대책\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '펌프의 직렬 및 병렬운전을 설명하시오.', answer: '직렬: 양정증가, 병렬: 유량증가', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 직렬 및 병렬운전을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬운전 특성\n2. 병렬운전 특성\n3. 합성성능곡선\n4. 적용 사례\n5. 소방펌프 설계\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '펌프의 상사법칙을 설명하시오.', answer: 'Q~N, H~N^2, P~N^3 (N: 회전수)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 상사법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상사법칙 정의\n2. 유량과 회전수\n3. 양정과 회전수\n4. 동력과 회전수\n5. 실무 적용 예시\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '펌프의 비속도를 설명하시오.', answer: 'Ns = N*sqrt(Q)/H^(3/4), 펌프 형식 선정 기준', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 비속도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비속도 정의\n2. 비속도 계산식\n3. 비속도와 펌프 형식\n4. 임펠러 형상과의 관계\n5. 소방펌프 선정\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: 'NPSH(유효흡입수두)를 설명하시오.', answer: 'NPSHa = Pa/(rho*g) - Pvs/(rho*g) - Hs - Hfs, NPSHa > NPSHr + 여유', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: NPSH를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. NPSH 정의\n2. 유효 NPSH(NPSHa)\n3. 필요 NPSH(NPSHr)\n4. NPSH 계산\n5. 캐비테이션 방지\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '펌프의 흡입양정 제한을 설명하시오.', answer: '이론상 10.33m(대기압), 실제 6~7m 이하, 캐비테이션 방지', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 흡입양정 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론적 흡입양정\n2. 실제 제한값\n3. 제한 원인\n4. 고도/온도 영향\n5. 소방펌프 설치 기준\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '펌프 서징현상을 설명하시오.', answer: '유량/압력 주기적 변동, 불안정 운전영역에서 발생, 배관 진동/소음', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프 서징현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서징 정의\n2. 발생 원인\n3. 발생 조건\n4. 문제점\n5. 방지 대책\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'hydraulic-calc',
    name: '수리계산',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '스프링클러 수리계산 방법을 설명하시오.', answer: 'K=Q/sqrt(P), 최원단 헤드 -> 급수관, 배관마찰손실 합산', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 스프링클러 수리계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. K계수(방수량계수)\n2. 최원단 헤드 압력\n3. 배관 손실계산\n4. 급수배관 압력\n5. 펌프 양정 결정\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '옥내소화전 수리계산을 설명하시오.', answer: '130L/min 노즐방수량, 0.17MPa 노즐압력, 배관손실+낙차+노즐압', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 옥내소화전 수리계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수량 기준\n2. 노즐압력\n3. 호스 마찰손실\n4. 배관 손실\n5. 펌프 양정 산정\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '물분무 방수밀도 계산을 설명하시오.', answer: '방수밀도 L/min*m^2, 방호면적 x 방수밀도 = 총유량', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 물분무 방수밀도 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수밀도 기준\n2. 방호면적 산정\n3. 헤드 개수 결정\n4. 총 방수량 계산\n5. 배관 설계\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '소방펌프 성능시험 방법을 설명하시오.', answer: '정격점 150%, 140%, 100%(정격), 체절운전, 성능곡선 작성', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 소방펌프 성능시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 조건\n2. 체절양정 측정\n3. 정격점 확인\n4. 150% 점 확인\n5. 성능곡선 검증\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '급수배관 구경 결정 방법을 설명하시오.', answer: '유속법(V<4m/s), 손실수두법(hf<10%), 등가관길이', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 급수배관 구경 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유속 제한\n2. 손실수두 제한\n3. 경제관경\n4. 등가관길이\n5. 배관 선정 절차\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '소화용수량 산정 방법을 설명하시오.', answer: '소화전: Q*T*N, 스프링클러: 설계면적*밀도*시간, 수원 용량 계산', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 소화용수량 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옥내소화전 수원\n2. 스프링클러 수원\n3. 방수시간 기준\n4. 동시사용 개수\n5. 총 수원량 계산\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '고가수조 방식의 양정 계산을 설명하시오.', answer: 'H = 낙차 - 배관손실 - 노즐압력, 자연낙차 이용', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 고가수조 방식의 양정 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고가수조 원리\n2. 필요 낙차 계산\n3. 배관 손실 고려\n4. 설치 높이 결정\n5. 장단점 분석\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '압력탱크 방식의 설계를 설명하시오.', answer: '압력탱크 내 압축공기로 압력 유지, P1V1=P2V2 적용', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 압력탱크 방식의 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력탱크 원리\n2. 공기압과 수압\n3. 탱크 용량 계산\n4. 압력 설정\n5. 장단점 분석\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '가압송수장치 선정 기준을 설명하시오.', answer: '펌프방식(대규모), 고가수조(중규모), 압력탱크(소규모)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 가압송수장치 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 펌프 방식\n2. 고가수조 방식\n3. 압력탱크 방식\n4. 선정 기준\n5. 각 방식 비교\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '배관 마찰손실 계산 예제를 풀이하시오.', answer: 'Hazen-Williams: hf=6.05*10^5*L*Q^1.85/(C^1.85*D^4.87)', prompt: `소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 배관 마찰손실 계산 예제를 풀이하시오.\n\n다음 순서로 설명해주세요:\n1. 주어진 조건 정리\n2. 공식 선택\n3. 단위 환산\n4. 계산 과정\n5. 결과 검토\n\n실제 계산 예제 2개를 풀이해주세요.` },
    ],
  },
];

export default function FluidMechanicsPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['hydrostatics']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-mech-fluid-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-mech-fluid-progress', JSON.stringify(completedQuestions));
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
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-blue-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-blue-600">소방설비기사(기계)</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">소방유체역학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방유체역학</h1>
              <p className="text-blue-100">소방설비기사(기계) 필기 - 유체정역학, 동역학, 배관유동, 펌프이론</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-blue-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
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
                          ? 'bg-cyan-50 border-cyan-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-cyan-500 border-cyan-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-blue-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-cyan-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
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
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
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
