'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'combustion',
    name: '연소이론',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '연소의 3요소와 4요소를 설명하시오.', answer: '3요소: 가연물, 산소, 점화원 / 4요소: +연쇄반응', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소의 3요소와 4요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '인화점, 발화점, 연소점의 차이를 설명하시오.', answer: '인화점<연소점<발화점 순서, 인화점: 점화원 필요, 발화점: 자연발화', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 인화점, 발화점, 연소점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '폭발한계(LEL, UEL)를 설명하시오.', answer: 'LEL: 폭발하한계, UEL: 폭발상한계, 위험도=(UEL-LEL)/LEL', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭발한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '연소의 형태를 분류하시오.', answer: '기체: 확산/예혼합, 액체: 증발/분무, 고체: 표면/분해/자기연소', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소의 형태를 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '연소생성물의 종류와 위험성을 설명하시오.', answer: 'CO(일산화탄소), CO2, HCN(시안화수소), 연기(가시거리 저하)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소생성물의 종류와 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '가연물의 조건과 종류를 설명하시오.', answer: '산화되기 쉬운 물질, 활성화 에너지가 작은 물질 / 고체, 액체, 기체 가연물', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 가연물의 조건과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '점화원의 종류와 특성을 설명하시오.', answer: '나화, 고온표면, 단열압축, 마찰/충격, 전기스파크, 정전기 등', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 점화원의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '연소열과 발열량의 개념을 설명하시오.', answer: '연소열: 완전연소 시 발생열량, 고위/저위 발열량 구분', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소열과 발열량의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '최소산소농도(MOC)와 한계산소지수(LOI)를 설명하시오.', answer: 'MOC: 연소유지 최소 산소농도, LOI: 물질의 연소 가능 최저 산소농도', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 최소산소농도(MOC)와 한계산소지수(LOI)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '자연발화의 원인과 방지대책을 설명하시오.', answer: '산화열 축적, 분해열, 흡착열 등 / 환기, 온도관리, 저장방법 개선', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 자연발화의 원인과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'fire-phenomena',
    name: '화재현상',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '플래시오버(Flashover)를 설명하시오.', answer: '실내 온도 약 600C, 복사열로 전면화재로 급격히 전이', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 플래시오버를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '백드래프트(Backdraft)를 설명하시오.', answer: '산소부족 상태에서 공기 유입 시 폭발적 연소', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 백드래프트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '화재의 성장곡선을 설명하시오.', answer: '초기-성장기-최성기-감쇠기, t2화재(at2)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재의 성장곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '화재하중과 등가가연물량을 설명하시오.', answer: '화재하중(MJ/m2)=가연물총발열량/바닥면적, 등가가연물(kg/m2)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재하중과 등가가연물량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '연기의 확산과 제연을 설명하시오.', answer: '굴뚝효과, 부력효과, 공조효과 / 제연방식: 자연/기계배연', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연기의 확산과 제연을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '롤오버(Rollover)와 플레임오버(Flameover)를 설명하시오.', answer: '롤오버: 천장부 가연성가스 연소, 플레임오버: 화염의 급속확산', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 롤오버(Rollover)와 플레임오버(Flameover)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '화재의 분류(A, B, C, D, K급)를 설명하시오.', answer: 'A급(일반), B급(유류), C급(전기), D급(금속), K급(주방)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재의 분류(A, B, C, D, K급)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '구획화재의 특성을 설명하시오.', answer: '환기지배형, 연료지배형 화재, 개구부 영향', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 구획화재의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '화재 시 열전달 방식 3가지를 설명하시오.', answer: '전도(Conduction), 대류(Convection), 복사(Radiation)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재 시 열전달 방식 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '화재조사의 목적과 방법을 설명하시오.', answer: '발화원인, 연소확대 경로 규명 / 현장보존, 증거수집, 분석', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재조사의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'extinguishing',
    name: '소화원리',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '소화의 4가지 방법을 설명하시오.', answer: '냉각소화, 질식소화, 제거소화, 억제소화(부촉매)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 소화의 4가지 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '소화약제별 소화원리를 설명하시오.', answer: '물(냉각), CO2(질식), 분말(억제+질식), 포(질식+냉각)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 소화약제별 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '화재 분류(A,B,C,D,K급)와 적응 소화약제를 설명하시오.', answer: 'A급(일반)-물, B급(유류)-포/CO2, C급(전기)-CO2/분말, D급(금속)-특수, K급(주방)-습식약제', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재 분류와 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '물의 소화 특성을 설명하시오.', answer: '비열 4.186kJ/kg.K, 기화잠열 2257kJ/kg, 수증기 팽창 1700배', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 물의 소화 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '분말소화약제의 종류와 특성을 설명하시오.', answer: '제1종(NaHCO3), 제2종(KHCO3), 제3종(NH4H2PO4), 제4종(KHCO3+요소)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 분말소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '포소화약제의 종류와 특성을 설명하시오.', answer: '단백포, 합성계면활성제포, 수성막포(AFFF), 내알코올포', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 포소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '이산화탄소(CO2) 소화약제의 특성을 설명하시오.', answer: '무색무취, 불연성, 질식소화, 전기절연성, 설계농도 34%', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 이산화탄소(CO2) 소화약제의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '할로겐화합물 소화약제의 특성을 설명하시오.', answer: '할론1211, 할론1301, 청정소화약제(HFC, FK-5-1-12)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 할로겐화합물 소화약제의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '강화액 소화약제의 특성을 설명하시오.', answer: '탄산칼륨 수용액, 동결방지, A/B급 화재 적응, 알칼리금속염 사용', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 강화액 소화약제의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '소화약제의 독성과 안전성을 설명하시오.', answer: 'NOAEL, LOAEL 기준, 인체 안전농도, 오존파괴지수(ODP)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 소화약제의 독성과 안전성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'explosion',
    name: '폭발이론',
    color: 'from-amber-500 to-orange-500',
    questions: [
      { id: 1, question: '폭발의 정의와 종류를 설명하시오.', answer: '급격한 압력상승, 물리적/화학적 폭발, 분진/가스/증기 폭발', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭발의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '분진폭발의 조건과 특성을 설명하시오.', answer: '가연성분진, 산소, 점화원, 밀폐공간, 분산상태 / 2차 폭발 위험', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 분진폭발의 조건과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '증기운폭발(UVCE)을 설명하시오.', answer: 'Unconfined Vapor Cloud Explosion, 대기 중 가연성 가스 구름 폭발', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 증기운폭발(UVCE)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'BLEVE 현상을 설명하시오.', answer: 'Boiling Liquid Expanding Vapor Explosion, 액화가스 탱크 파열 폭발', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: BLEVE 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '폭굉(Detonation)과 폭연(Deflagration)을 설명하시오.', answer: '폭굉: 음속 이상, 충격파 / 폭연: 음속 이하, 화염전파', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭굉(Detonation)과 폭연(Deflagration)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '폭발방호설비의 종류와 원리를 설명하시오.', answer: '방폭벽, 폭발방산구, 폭발억제장치, 불활성화', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭발방호설비의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '폭발 압력과 폭발지수(Kst, Kg)를 설명하시오.', answer: 'Pmax, dP/dt, Kst(분진), Kg(가스), 폭발등급 분류', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭발 압력과 폭발지수(Kst, Kg)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '정전기에 의한 폭발 방지대책을 설명하시오.', answer: '접지, 본딩, 가습, 제전기, 대전방지제 사용', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 정전기에 의한 폭발 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '위험물의 혼재 금지 원칙을 설명하시오.', answer: '유별 혼재 금지, 제1류-제6류 분리저장, 화학적 반응 방지', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 위험물의 혼재 금지 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '방폭전기기기의 종류와 적용을 설명하시오.', answer: '내압방폭, 압력방폭, 안전증방폭, 본질안전방폭, 방폭지역 분류', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 방폭전기기기의 종류와 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'hazmat',
    name: '위험물',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '위험물의 유별 분류(1류~6류)를 설명하시오.', answer: '1류(산화성고체), 2류(가연성고체), 3류(자연발화성/금수성), 4류(인화성액체), 5류(자기반응성), 6류(산화성액체)', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 위험물의 유별 분류(1류~6류)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '제4류 위험물의 특성과 저장취급 기준을 설명하시오.', answer: '인화성액체, 증기비중>1, 정전기 주의, 환기, 화기엄금', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 제4류 위험물의 특성과 저장취급 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '지정수량의 개념과 배수 계산을 설명하시오.', answer: '위험물 기준수량, 지정수량 배수=저장량/지정수량, 배수합산', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 지정수량의 개념과 배수 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '금수성 물질의 종류와 소화방법을 설명하시오.', answer: '나트륨, 칼륨, 칼슘 등 / 마른모래, 팽창질석, 건조분말', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 금수성 물질의 종류와 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '산화성 물질의 위험성과 저장기준을 설명하시오.', answer: '산소공급원, 가연물 접촉금지, 충격/마찰 주의, 환기', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 산화성 물질의 위험성과 저장기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '자기반응성 물질의 특성과 저장기준을 설명하시오.', answer: '분자 내 산소, 열분해 폭발, 냉암소 저장, 충격금지', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 자기반응성 물질의 특성과 저장기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '위험물 운반용기 기준을 설명하시오.', answer: '재질, 용량, 표시, 적재방법, 운반차량 기준', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 위험물 운반용기 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '위험물제조소등의 안전거리 기준을 설명하시오.', answer: '주거지역, 학교, 병원 등으로부터 이격거리, 지정수량 배수별 기준', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 위험물제조소등의 안전거리 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '옥내/옥외 저장소의 설치기준을 설명하시오.', answer: '바닥면적, 높이, 환기, 조명, 피뢰침, 배수설비', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 옥내/옥외 저장소의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'GHS의 개념과 위험물 표시를 설명하시오.', answer: 'Globally Harmonized System, 그림문자, 신호어, 유해위험문구', prompt: `소방설비기사(기계) 소방원론 문제입니다.\n\n문제: GHS의 개념과 위험물 표시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function FireTheoryPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['combustion']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-mech-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-mech-theory-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-orange-600">소방설비기사(기계)</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">소방원론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방원론</h1>
              <p className="text-orange-100">소방설비기사(기계) 필기 1과목 - 연소, 화재, 소화 이론</p>
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
              className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all"
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
