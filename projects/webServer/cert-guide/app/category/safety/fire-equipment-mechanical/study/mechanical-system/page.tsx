'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'sprinkler',
    name: '스프링클러설비',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '스프링클러설비의 구성요소를 설명하시오.', answer: '수원, 가압송수장치, 배관, 헤드, 유수검지장치, 제어밸브, 부속품', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원의 종류와 기준\n2. 가압송수장치\n3. 배관 구성\n4. 헤드 종류\n5. 유수검지장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 2, question: '스프링클러 헤드의 종류와 특성을 설명하시오.', answer: '폐쇄형(감열체), 개방형(일제개방), 표준형(68도C), 고온형(79도C, 141도C)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 헤드의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폐쇄형 헤드\n2. 개방형 헤드\n3. 감열체 종류\n4. 표시온도\n5. 반응시간지수(RTI)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 3, question: '습식/건식/준비작동식 스프링클러를 비교하시오.', answer: '습식(상시충수), 건식(압축공기), 준비작동식(화재감지기연동)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 방식을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 스프링클러\n2. 건식 스프링클러\n3. 준비작동식\n4. 일제살수식\n5. 적용 장소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 4, question: '유수검지장치의 구조와 작동원리를 설명하시오.', answer: '알람밸브, 리타딩챔버, 압력스위치, 플로스위치, 경보 발신', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 유수검지장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 유수검지장치\n2. 건식 유수검지장치\n3. 알람밸브 작동\n4. 압력스위치\n5. 경보 발신 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 5, question: '스프링클러설비의 수원 및 가압송수장치를 설명하시오.', answer: '수조(20분+1.6m3), 펌프(전동기펌프+내연기관펌프), 고가수조(낙차)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 수원 및 가압송수장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 산정\n2. 펌프 방식\n3. 고가수조 방식\n4. 가압수조 방식\n5. 예비동력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 6, question: '스프링클러설비의 배관 설계 기준을 설명하시오.', answer: '급수배관 구경, 수평/수직배관, 가지배관, 말단시험밸브', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러설비의 배관 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 구경 산정법\n2. 주배관과 가지배관\n3. 수평배관 설치\n4. 수직배관 설치\n5. 말단시험밸브\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 7, question: '스프링클러 헤드의 배치 기준을 설명하시오.', answer: '수평거리 2.1~2.3m, 천장과의 거리 30cm 이내, 살수반경', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 헤드의 배치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 헤드 간 수평거리\n2. 천장과의 이격거리\n3. 벽면 거리\n4. 살수반경\n5. 소방대상물별 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 8, question: '스프링클러설비의 헤드 수별 급수배관 구경을 설명하시오.', answer: '헤드 2개 이하(25mm), 3~5개(32mm), 6~10개(40mm), 11~30개(50mm)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 헤드 수별 배관 구경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 헤드 수에 따른 구경 기준\n2. 급수배관 구경표\n3. 수리계산에 의한 방법\n4. 가지배관 설계\n5. 교차배관 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 9, question: '스프링클러 경보장치의 구성과 작동을 설명하시오.', answer: '압력스위치, 유수검지장치, 경종, 표시등, 수신기 연동', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 경보장치의 구성과 작동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경보장치 구성요소\n2. 압력스위치 작동\n3. 경종 설치기준\n4. 표시등 설치\n5. 수신기 연동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 10, question: '조기반응형 스프링클러헤드(ESFR)를 설명하시오.', answer: 'RTI 50 이하, 대규모 물류창고, 높은 방수량, 빠른 반응', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 조기반응형 스프링클러헤드(ESFR)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ESFR 헤드 정의\n2. RTI 기준\n3. 적용 대상\n4. 방수량 기준\n5. 설치 이점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'hydrant',
    name: '옥내소화전설비',
    color: 'from-rose-500 to-rose-400',
    questions: [
      { id: 1, question: '옥내소화전설비의 구성요소를 설명하시오.', answer: '수원, 가압송수장치, 배관, 소화전함(호스/관창/노즐), 기동장치', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량\n2. 가압송수장치\n3. 소화전함 구성\n4. 호스 규격\n5. 노즐 방수압력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 2, question: '옥내소화전 방수량과 방수압력 기준을 설명하시오.', answer: '노즐방수량 130L/min, 방수압력 0.17MPa, 방수거리 15m', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 방수 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노즐방수량\n2. 방수압력\n3. 방수거리\n4. 호스 마찰손실\n5. 펌프 양정 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 3, question: '옥내소화전 펌프의 성능시험 기준을 설명하시오.', answer: '정격점 100%, 체절양정 140~170%, 150%점 양정 65%이상', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 펌프 성능시험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체절운전 기준\n2. 정격점 확인\n3. 150%점 양정\n4. 성능곡선 작성\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 4, question: '옥내소화전 배관의 설계 기준을 설명하시오.', answer: '급수관 구경 산정, 주배관 루프형, 수직배관 관경 유지', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 배관 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 구경 산정\n2. 급수배관 방식\n3. 수직배관 기준\n4. 관경 유지 규정\n5. 압력손실 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 5, question: '옥내소화전 호스와 관창의 규격을 설명하시오.', answer: '호스 구경 40mm(1.5인치) 또는 65mm(2.5인치), 길이 15m', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 호스와 관창을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 호스 규격\n2. 호스 길이\n3. 관창 종류\n4. 노즐 구경\n5. 방수 형태\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 6, question: '옥내소화전함의 설치기준을 설명하시오.', answer: '바닥면 0.5~1.5m, 표시등 설치, 호스/관창/소화전밸브', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전함의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치높이 기준\n2. 표시등 설치\n3. 소화전함 구성품\n4. 방수구 설치\n5. 비상전원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 7, question: '옥내소화전 수원량 산정방법을 설명하시오.', answer: '소화전 개수 x 130L/min x 20분, 최소 2개 이상 동시사용', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 수원량 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동시사용 개수 기준\n2. 방수량 기준\n3. 방수시간 기준\n4. 수원량 계산\n5. 예비수원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 8, question: '옥내소화전 펌프 양정 산정방법을 설명하시오.', answer: 'H = h1 + h2 + h3 + 17m (낙차+배관손실+호스손실+방수압)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 펌프 양정 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양정 산정 공식\n2. 낙차 계산\n3. 배관 마찰손실\n4. 호스 마찰손실\n5. 방수압력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 9, question: '옥내소화전의 기동방식을 설명하시오.', answer: '기동용수압개폐장치, 압력챔버, 기동용압력스위치', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전의 기동방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기동용수압개폐장치\n2. 압력챔버 작동\n3. 압력스위치\n4. 자동/수동 기동\n5. 충압펌프\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 10, question: '옥외소화전설비와 옥내소화전설비의 차이를 설명하시오.', answer: '옥외: 350L/min, 0.25MPa / 옥내: 130L/min, 0.17MPa', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥외소화전설비와 옥내소화전설비의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수량 차이\n2. 방수압력 차이\n3. 호스 규격 차이\n4. 설치위치 차이\n5. 적용대상 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'water-spray',
    name: '물분무소화설비',
    color: 'from-red-400 to-rose-400',
    questions: [
      { id: 1, question: '물분무소화설비의 소화원리를 설명하시오.', answer: '냉각소화(미세입자), 질식소화(수증기), 유화소화(유류화재)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무소화설비의 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각 효과\n2. 질식 효과\n3. 유화 효과\n4. 미세입자 형성\n5. 적용 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 2, question: '물분무헤드의 종류와 특성을 설명하시오.', answer: '개방형 헤드, 분무각 60~120도, 방수압력 0.1~0.35MPa', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무헤드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 헤드 구조\n2. 분무각\n3. 방수압력\n4. 입자크기\n5. 배치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 3, question: '물분무설비의 방수밀도 기준을 설명하시오.', answer: '차고 10L/min/m2, 전기설비 20L/min/m2, 가연성액체 20L/min/m2', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비의 방수밀도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수밀도 개념\n2. 방호대상별 기준\n3. 방호면적 산정\n4. 헤드 개수 계산\n5. 총 방수량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 4, question: '물분무소화설비의 일제개방밸브를 설명하시오.', answer: '화재감지기 연동, 전기식/기계식, 일제개방, 경보 발신', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 일제개방밸브를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동 원리\n2. 전기식 밸브\n3. 기계식 밸브\n4. 화재감지기 연동\n5. 수동기동장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 5, question: '물분무설비의 수원 및 가압송수장치를 설명하시오.', answer: '수원 20분 방수량, 펌프 정격유량/전양정, 예비동력', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비 수원 및 펌프를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 산정\n2. 펌프 용량 계산\n3. 전양정 산정\n4. 예비동력 기준\n5. 성능시험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 6, question: '물분무설비의 배관 및 밸브류를 설명하시오.', answer: '배관 구경, 제어밸브, 스트레이너, 압력계', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비의 배관 및 밸브류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 구경 기준\n2. 제어밸브 설치\n3. 스트레이너 설치\n4. 압력계 설치\n5. 시험장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 7, question: '미분무소화설비의 특징을 설명하시오.', answer: '400um 이하 미세입자, 적은 수량, 질식/냉각 효과', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 미분무소화설비의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미분무 정의\n2. 입자크기 기준\n3. 소화효과\n4. 장단점\n5. 적용대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 8, question: '물분무설비의 전기설비 적용기준을 설명하시오.', answer: '특고압 변압기, 케이블실, 방수밀도 20L/min/m2', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비의 전기설비 적용기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 방수밀도\n3. 방호면적 산정\n4. 안전조치\n5. 차단장치 연동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 9, question: '물분무설비의 유류화재 적용기준을 설명하시오.', answer: '인화점 70도C 미만 위험물, 유화소화 원리', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비의 유류화재 적용기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 유화소화 원리\n3. 방수밀도\n4. 방호구역 설정\n5. 안전조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 10, question: '물분무설비와 스프링클러설비의 차이를 설명하시오.', answer: '헤드 구조, 입자크기, 소화원리, 적용대상', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비와 스프링클러설비의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 헤드 구조 차이\n2. 물입자 크기\n3. 소화원리 차이\n4. 적용대상 차이\n5. 방수밀도 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'foam',
    name: '포소화설비',
    color: 'from-rose-400 to-red-400',
    questions: [
      { id: 1, question: '포소화약제의 종류와 소화원리를 설명하시오.', answer: '단백포/합성계면활성제포/수성막포 / 질식/냉각/피복', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화약제의 종류와 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단백포\n2. 합성계면활성제포\n3. 수성막포(AFFF)\n4. 소화 원리\n5. 적용 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 2, question: '포의 발포배수와 방출률을 설명하시오.', answer: '발포배수=포부피/약액부피, 저발포(20배 미만), 고발포(80배 이상)', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포의 발포배수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발포배수 정의\n2. 저발포\n3. 고발포\n4. 방출률 계산\n5. 소화 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 3, question: '포헤드 및 포방출구의 종류를 설명하시오.', answer: '고정포방출구, 포헤드, 포모니터, 포워터 스프링클러', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포헤드 및 포방출구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정포방출구\n2. 포헤드\n3. 포모니터\n4. 포워터 스프링클러\n5. 적용 장소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 4, question: '포소화설비의 혼합장치를 설명하시오.', answer: '프레셔 프로포셔너, 라인 프로포셔너, 프레셔 사이드 프로포셔너', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화설비의 혼합장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프레셔 프로포셔너\n2. 라인 프로포셔너\n3. 프레셔 사이드 프로포셔너\n4. 혼합 원리\n5. 혼합비 조정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 5, question: '포소화설비의 방출량 기준을 설명하시오.', answer: '탱크화재: 방호면적x방출률(분당 L/m2), 주차장: 바닥면적 기준', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화설비의 방출량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물탱크\n2. 주차장\n3. 방출률\n4. 방출시간\n5. 약제량 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 6, question: '포소화약제의 저장량 산정방법을 설명하시오.', answer: '방호면적 x 방출률 x 시간 x 혼합비', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화약제의 저장량 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산정 공식\n2. 방호면적 계산\n3. 방출률 기준\n4. 방출시간\n5. 혼합비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 7, question: '이동식 포소화설비를 설명하시오.', answer: '포소화전, 호스릴포, 포노즐, 이동식 포모니터', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 이동식 포소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이동식 설비 종류\n2. 포소화전\n3. 호스릴포\n4. 설치기준\n5. 적용대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 8, question: '고발포용 포소화설비의 특징을 설명하시오.', answer: '발포배수 80~1000배, 지하공간, 질식소화', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 고발포용 포소화설비의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고발포 정의\n2. 발포배수\n3. 소화원리\n4. 적용대상\n5. 포발생기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 9, question: '위험물탱크의 포소화설비 설계기준을 설명하시오.', answer: '탱크 직경별 방출률, 표면하주입/표면상주입', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 위험물탱크의 포소화설비 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 분류\n2. 방출률 기준\n3. 표면하주입방식\n4. 표면상주입방식\n5. 방출시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 10, question: 'AFFF(수성막포)의 특성을 설명하시오.', answer: '불소계면활성제, 수성막 형성, 유류화재, 재발화 방지', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: AFFF(수성막포)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AFFF 정의\n2. 수성막 형성 원리\n3. 소화 메커니즘\n4. 장단점\n5. 적용대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'evacuation-smoke',
    name: '피난/제연설비',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '피난기구의 종류와 적용 기준을 설명하시오.', answer: '미끄럼대, 피난사다리, 구조대, 완강기, 공기안전매트', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 피난기구의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미끄럼대\n2. 피난사다리\n3. 완강기\n4. 구조대\n5. 적용 층수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 2, question: '제연설비의 목적과 원리를 설명하시오.', answer: '연기 배출/차단, 피난로 확보, 급기/배기, 차압 형성', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연설비의 목적과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제연의 목적\n2. 배연 원리\n3. 급기 원리\n4. 차압 형성\n5. 피난로 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 3, question: '제연설비의 배출량 및 풍속 기준을 설명하시오.', answer: '제연구역 바닥면적 1m2당 1m3/min 이상, 개구부 풍속 0.7m/s 이상', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연설비의 배출량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배출량 산정\n2. 개구부 풍속\n3. 제연구역 기준\n4. 제연경계 설정\n5. 배연기 용량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 4, question: '특별피난계단과 부속실 제연을 설명하시오.', answer: '차압 40~50Pa, 급기량 산정, 과압방지장치', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 특별피난계단 제연을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차압 기준\n2. 급기량 산정\n3. 과압방지장치\n4. 제연방식\n5. 성능시험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 5, question: '유도등 및 유도표지의 종류를 설명하시오.', answer: '피난구유도등, 통로유도등, 객석유도등, 유도표지', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 유도등의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난구유도등\n2. 통로유도등\n3. 객석유도등\n4. 유도표지\n5. 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 6, question: '제연설비의 제연방식을 비교하시오.', answer: '자연배연, 기계배연, 스모크타워, 급기가압', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연설비의 제연방식을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 자연배연 방식\n2. 기계배연 방식\n3. 스모크타워 방식\n4. 급기가압 방식\n5. 적용 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 7, question: '제연경계벽의 설치기준을 설명하시오.', answer: '천장에서 50cm 이상, 내열성 재료, 연기차단', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연경계벽의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수직거리 기준\n2. 재료 기준\n3. 설치 위치\n4. 연기 차단 원리\n5. 제연구역 구획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 8, question: '급기가압 제연설비의 설계기준을 설명하시오.', answer: '차압 40~50Pa, 방연풍속 0.7m/s, 과압방지장치', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 급기가압 제연설비의 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차압 기준\n2. 방연풍속\n3. 급기량 산정\n4. 급기구 설치\n5. 과압방지장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 9, question: '피난안전구역의 제연설비 설치기준을 설명하시오.', answer: '급기가압, 차압유지, 비상전원, 피난대기공간', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 피난안전구역의 제연설비 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난안전구역 정의\n2. 제연설비 기준\n3. 차압 유지\n4. 비상전원\n5. 공기조화 설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
      { id: 10, question: '배연창의 설치기준을 설명하시오.', answer: '바닥면적 1% 이상, 천장 가까이, 수동/자동개방', prompt: `소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 배연창의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유효면적 기준\n2. 설치위치\n3. 개방방식\n4. 연동방식\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.` },
    ],
  },
];

export default function MechanicalSystemPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['sprinkler']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-mech-system-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-mech-system-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-red-600">소방설비기사(기계)</a>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">소방기계시설</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방기계시설의 구조 및 원리</h1>
              <p className="text-red-100">소방설비기사(기계) 필기 - 수계/포소화설비, 피난/제연설비</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-red-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-rose-500 h-3 rounded-full transition-all"
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
                            <span className="text-red-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
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
