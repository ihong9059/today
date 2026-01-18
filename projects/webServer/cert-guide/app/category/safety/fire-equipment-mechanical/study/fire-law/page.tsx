'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'fire-basic-law',
    name: '소방기본법',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '소방기본법의 목적과 적용범위를 설명하시오.', answer: '화재예방·경계·진압, 국민생명·신체·재산보호, 공공안전·복리증진', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방기본법의 목적과 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방기본법 목적\n2. 적용 범위\n3. 국가와 지방자치단체 책무\n4. 소방력 기준\n5. 다른 법과의 관계\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '화재의 예방조치와 소방대상물 관계인의 의무를 설명하시오.', answer: '화기취급 감독, 피난시설 유지관리, 소방활동 방해금지', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재의 예방조치와 소방대상물 관계인의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관계인의 정의\n2. 화재예방 의무\n3. 소방시설 유지관리\n4. 피난시설 관리\n5. 위반 시 처벌\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '소방활동과 소방대의 긴급통행을 설명하시오.', answer: '소방대 우선통행, 긴급차량 양보의무, 소방활동구역 설정', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방활동과 소방대의 긴급통행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방대 우선통행권\n2. 긴급통행 방해 금지\n3. 소방활동구역 설정\n4. 강제처분 권한\n5. 보상 규정\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '화재의 조사와 보고를 설명하시오.', answer: '화재원인조사, 피해조사, 화재통계, 관할서장 보고의무', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재의 조사와 보고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재조사 목적\n2. 조사 주체와 권한\n3. 화재원인 판정\n4. 보고 의무\n5. 통계 작성\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '소방용수시설과 소방출동로를 설명하시오.', answer: '소화전 설치기준(100m 이내), 급수탑, 저수조, 소방차 전용구역', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방용수시설과 소방출동로를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화전 설치기준\n2. 급수탑 설치\n3. 저수조 설치\n4. 소방출동로 확보\n5. 소방차 전용구역\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '의용소방대의 설치와 운영을 설명하시오.', answer: '주민 자율 조직, 화재 예방 지원, 소방활동 보조', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 의용소방대의 설치와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의용소방대 정의\n2. 설치 근거\n3. 대원의 자격\n4. 활동 범위\n5. 지원 및 보상\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '소방신호와 화재경보를 설명하시오.', answer: '경계신호, 발화신호, 해제신호, 훈련신호', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방신호와 화재경보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방신호 종류\n2. 각 신호의 의미\n3. 발령 권한\n4. 경보 전파\n5. 허위경보 처벌\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '소방력 기준과 소방장비를 설명하시오.', answer: '소방차, 소방헬기, 소방정, 구조장비, 구급장비', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방력 기준과 소방장비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방력 기준 개요\n2. 인력 기준\n3. 장비 기준\n4. 시설 기준\n5. 확충 계획\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '소방본부장과 소방서장의 권한을 설명하시오.', answer: '화재 예방 명령, 소방활동 지휘, 강제처분권', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방본부장과 소방서장의 권한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예방 조치 권한\n2. 진압 지휘 권한\n3. 강제처분 권한\n4. 조사 권한\n5. 명령 권한\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '벌칙과 과태료 규정을 설명하시오.', answer: '소방활동 방해 처벌, 허위신고 과태료, 소방시설 훼손 처벌', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방기본법의 벌칙과 과태료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 처벌 규정\n2. 과태료 대상\n3. 금액 기준\n4. 양벌 규정\n5. 행정처분\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'fire-prevention-law',
    name: '화재예방법',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '화재예방법의 목적과 특정소방대상물을 설명하시오.', answer: '화재·재난·재해 예방, 특정소방대상물: 근린생활시설, 판매·업무·숙박시설 등', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재예방법의 목적과 특정소방대상물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재예방법 목적\n2. 특정소방대상물 정의\n3. 대상물 분류\n4. 규모별 구분\n5. 적용 법령\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '소방안전관리자의 선임과 업무를 설명하시오.', answer: '1급·2급·3급 구분, 특급대상물 1급, 방화관리업무, 자위소방대 조직', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자의 선임과 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 등급별 구분\n3. 선임 기준\n4. 업무 내용\n5. 교육 의무\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '소방계획서와 피난계획을 설명하시오.', answer: '소방시설 관리, 자위소방대 편성, 피난훈련 실시, 소방훈련 연2회', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방계획서와 피난계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방계획서 작성\n2. 피난계획 수립\n3. 자위소방대 편성\n4. 소방훈련 실시\n5. 제출 및 보고\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '다중이용업소 안전관리를 설명하시오.', answer: '노래연습장, PC방, 영화상영관, 실내게임장 등 / 안전시설 기준 강화', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 다중이용업소 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다중이용업소 정의\n2. 안전시설 기준\n3. 영업허가 조건\n4. 정기점검 의무\n5. 안전교육 실시\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '화기취급 감독과 특수가연물 저장·취급을 설명하시오.', answer: '용접·용단 작업 허가, 특수가연물 지정수량, 저장·취급 기준', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화기취급 감독과 특수가연물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화기취급 감독자\n2. 작업허가 절차\n3. 특수가연물 정의\n4. 지정수량\n5. 저장·취급 기준\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '건축허가동의와 사용승인을 설명하시오.', answer: '소방시설 설계도서 확인, 완공검사, 사용승인', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 건축허가동의와 사용승인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건축허가 동의 대상\n2. 동의 절차\n3. 소방시설 확인\n4. 완공검사\n5. 사용승인 조건\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '소방안전관리 대행과 위탁을 설명하시오.', answer: '대행업체 등록, 대행 가능 업무, 대행자 자격', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방안전관리 대행과 위탁을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대행 제도 개요\n2. 대행업체 등록\n3. 대행 가능 업무\n4. 대행자 자격\n5. 책임 소재\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '피난시설과 방화시설 유지관리를 설명하시오.', answer: '피난계단, 완강기, 방화문, 방화셔터 유지관리', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 피난시설과 방화시설 유지관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난시설 종류\n2. 방화시설 종류\n3. 유지관리 기준\n4. 점검 주기\n5. 위반 시 처벌\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '소방특별조사를 설명하시오.', answer: '정기조사, 수시조사, 조사항목, 조치명령', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방특별조사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조사 목적\n2. 조사 대상\n3. 조사 유형\n4. 조사 항목\n5. 조치명령\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '자위소방대의 편성과 운영을 설명하시오.', answer: '대장, 부대장, 지휘반, 소화반, 구조반, 대피유도반', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 자위소방대의 편성과 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 편성 대상\n2. 조직 구성\n3. 각 반의 임무\n4. 훈련 실시\n5. 운영 기준\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'fire-facility-law',
    name: '소방시설법',
    color: 'from-indigo-600 to-purple-500',
    questions: [
      { id: 1, question: '소방시설의 종류를 설명하시오.', answer: '소화설비, 경보설비, 피난설비, 소화용수설비, 소화활동설비', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화설비 종류\n2. 경보설비 종류\n3. 피난설비 종류\n4. 소화용수설비\n5. 소화활동설비\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '소방시설 설치·유지 및 안전관리를 설명하시오.', answer: '특정소방대상물별 설치기준, 성능위주설계, 자체점검, 종합정밀점검', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설 설치·유지 및 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 설치 기준\n3. 자체점검\n4. 종합정밀점검\n5. 유지관리 의무\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '소방시설공사업과 감리업을 설명하시오.', answer: '설계·시공·감리 등록, 소방기술자 배치기준, 착공신고, 완공검사', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설공사업과 감리업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공사업 등록\n2. 감리업 등록\n3. 기술인력 기준\n4. 착공신고\n5. 완공검사\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '성능위주설계와 소방시설 성능시험을 설명하시오.', answer: '30층 이상, 연면적 20만㎡ 이상 등 / 화재·피난 시뮬레이션', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 성능위주설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성능위주설계 대상\n2. 설계 방법\n3. 화재 시뮬레이션\n4. 피난 시뮬레이션\n5. 평가 기준\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '소방시설 자체점검과 정기점검을 설명하시오.', answer: '작동점검(연2회), 종합정밀점검(연1회), 점검인력 배치, 점검결과 보고', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설 자체점검을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동점검\n2. 종합정밀점검\n3. 점검 대상\n4. 점검자 자격\n5. 결과 보고\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '소방용품의 형식승인과 검정을 설명하시오.', answer: '형식승인, 형식적합검사, 성능인증, 제품검사', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방용품의 형식승인과 검정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형식승인 대상\n2. 승인 절차\n3. 형식적합검사\n4. 성능인증 제도\n5. 제품검사\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '소방시설관리업 등록과 업무를 설명하시오.', answer: '점검업, 공사업, 설계업 등록 요건 및 업무', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설관리업 등록과 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리업 종류\n2. 등록 요건\n3. 업무 범위\n4. 기술인력 기준\n5. 행정처분\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '소방기술자 자격과 배치기준을 설명하시오.', answer: '소방기술사, 소방설비기사, 소방설비산업기사, 배치기준', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방기술자 자격과 배치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자격 종류\n2. 등급별 업무\n3. 배치 대상\n4. 배치 기준\n5. 경력 관리\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '소방시설공사의 착공신고와 완공검사를 설명하시오.', answer: '착공신고 대상, 제출서류, 완공검사 절차', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설공사 착공신고와 완공검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 착공신고 대상\n2. 신고 절차\n3. 제출 서류\n4. 완공검사 신청\n5. 검사 기준\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '소방시설의 내진설계 기준을 설명하시오.', answer: '내진설계 대상, 지진분리장치, 버팀대 설치', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설의 내진설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내진설계 대상\n2. 지진분리장치\n3. 버팀대 설치\n4. 배관 설계\n5. 적용 기준\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'hazmat-law',
    name: '위험물안전관리법',
    color: 'from-purple-600 to-indigo-500',
    questions: [
      { id: 1, question: '위험물의 종류와 지정수량을 설명하시오.', answer: '제1류~제6류 / 지정수량: 제4류 휘발유 200L, 경유 1000L', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물의 종류와 지정수량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물 6류 분류\n2. 지정수량 개념\n3. 류별 지정수량\n4. 배수 계산\n5. 규제 적용\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '위험물제조소등의 종류를 설명하시오.', answer: '제조소, 저장소(옥내·옥외·옥상·지하·간이·이동), 취급소(주유·판매·이송)', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물제조소등의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조소\n2. 저장소 종류\n3. 취급소 종류\n4. 각각의 정의\n5. 허가 대상\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '위험물안전관리자의 선임과 업무를 설명하시오.', answer: '갑종·을종·병종, 제조소등 감독, 안전교육 이수, 위험물 취급 감독', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물안전관리자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 자격 등급\n3. 선임 기준\n4. 업무 내용\n5. 교육 의무\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '제조소의 위치·구조·설비 기준을 설명하시오.', answer: '보유공지, 방유제, 피뢰침, 경계표지, 소화설비, 자동화재탐지설비', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 제조소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위치 기준\n2. 구조 기준\n3. 보유공지\n4. 방유제 설치\n5. 소화설비\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '옥내저장소의 기준과 소화설비를 설명하시오.', answer: '바닥면적 1000㎡ 이하, 연면적 1000㎡당 구획, 스프링클러·물분무·포소화설비', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 옥내저장소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조 기준\n2. 면적 제한\n3. 구획 기준\n4. 소화설비 설치\n5. 환기설비\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '옥외탱크저장소의 기준을 설명하시오.', answer: '방유제, 보유공지, 탱크 구조, 배관 기준', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 옥외탱크저장소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 구조\n2. 방유제 용량\n3. 보유공지\n4. 배관 기준\n5. 소화설비\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '주유취급소의 설치기준을 설명하시오.', answer: '주유공지, 급유공지, 탱크 용량, 소화설비', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 주유취급소의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주유공지 기준\n2. 탱크 설치\n3. 배관 기준\n4. 소화설비\n5. 안전거리\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '위험물 운반 및 운송 기준을 설명하시오.', answer: '운반용기, 혼재 금지, 운송 표지, 운송책임자', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물 운반 및 운송 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운반용기 기준\n2. 혼재 금지 위험물\n3. 표지 및 표시\n4. 운송책임자\n5. 이송취급소\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '위험물의 저장·취급 기준을 설명하시오.', answer: '유별 공통기준, 류별 특수기준, 혼합저장 금지', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물의 저장·취급 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통 기준\n2. 류별 기준\n3. 혼합저장 금지\n4. 취급 시 주의사항\n5. 비상조치\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '위험물시설의 정기점검과 정기검사를 설명하시오.', answer: '자체점검, 정기점검, 정기검사, 점검표 작성', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물시설의 정기점검과 정기검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자체점검 주기\n2. 정기점검 대상\n3. 정기검사 대상\n4. 점검 항목\n5. 결과 보고\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
  {
    id: 'other-laws',
    name: '기타 관련법규',
    color: 'from-indigo-400 to-purple-400',
    questions: [
      { id: 1, question: '소방시설공사업법의 주요 내용을 설명하시오.', answer: '공사업 등록, 기술인력 배치, 하도급 제한, 행정처분', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설공사업법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 공사업 등록\n3. 기술인력 배치\n4. 하도급 제한\n5. 행정처분\n\n연습문제 2개도 만들어주세요.` },
      { id: 2, question: '다중이용업소법의 안전관리를 설명하시오.', answer: '안전시설, 영업장 내부구조, 비상구, 안전시설등 완비증명서', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 다중이용업소법의 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 업종\n2. 안전시설 기준\n3. 내부구조 기준\n4. 완비증명서\n5. 안전관리 의무\n\n연습문제 2개도 만들어주세요.` },
      { id: 3, question: '초고층 및 지하연계복합건축물 재난관리법을 설명하시오.', answer: '통합안전점검, 피난안전구역, 종합재난관리체계', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 초고층건축물법의 재난관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 통합안전점검\n3. 피난안전구역\n4. 종합방재실\n5. 재난관리체계\n\n연습문제 2개도 만들어주세요.` },
      { id: 4, question: '건축법상 방화구획과 방화구조를 설명하시오.', answer: '내화구조, 방화구획, 방화벽, 경계벽', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 건축법상 방화구획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방화구획 대상\n2. 구획 기준\n3. 내화구조\n4. 방화문 기준\n5. 관통부 처리\n\n연습문제 2개도 만들어주세요.` },
      { id: 5, question: '건축법상 피난시설 기준을 설명하시오.', answer: '직통계단, 피난계단, 특별피난계단, 피난안전구역', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 건축법상 피난시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직통계단 설치\n2. 피난계단 기준\n3. 특별피난계단\n4. 피난안전구역\n5. 보행거리 제한\n\n연습문제 2개도 만들어주세요.` },
      { id: 6, question: '제연설비 설치 대상을 설명하시오.', answer: '특별피난계단, 지하층, 무창층, 대규모 건축물', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 제연설비 설치 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상 건축물\n2. 설치 장소\n3. 제연방식\n4. 설계 기준\n5. 점검 기준\n\n연습문제 2개도 만들어주세요.` },
      { id: 7, question: '소방산업의 진흥에 관한 법률을 설명하시오.', answer: '소방산업 육성, 기술개발, 인력양성, 국제협력', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방산업진흥법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 소방산업 범위\n3. 기술개발 지원\n4. 인력양성\n5. 진흥 정책\n\n연습문제 2개도 만들어주세요.` },
      { id: 8, question: '소방공무원법과 소방조직을 설명하시오.', answer: '소방청, 소방본부, 소방서, 계급체계, 복무', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방조직과 소방공무원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방조직 체계\n2. 계급 구조\n3. 임용 및 교육\n4. 복무 규정\n5. 소방공제회\n\n연습문제 2개도 만들어주세요.` },
      { id: 9, question: '소방시설 설치기준 적용의 특례를 설명하시오.', answer: '기존건축물, 용도변경, 증축, 대수선 시 특례', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설 설치기준 특례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특례 적용 대상\n2. 기존건축물 특례\n3. 용도변경 특례\n4. 증축 특례\n5. 적용 범위\n\n연습문제 2개도 만들어주세요.` },
      { id: 10, question: '국가화재안전기준(NFSC)의 체계를 설명하시오.', answer: '소화설비, 경보설비, 피난설비별 NFSC 구성', prompt: `소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 국가화재안전기준(NFSC) 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. NFSC 개요\n2. 소화설비 기준\n3. 경보설비 기준\n4. 피난설비 기준\n5. 기준 적용\n\n연습문제 2개도 만들어주세요.` },
    ],
  },
];

export default function FireLawStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['fire-basic-law']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-mech-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-mech-law-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-indigo-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-indigo-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-indigo-600">소방설비기사(기계)</a>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">소방관계법규</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방관계법규</h1>
              <p className="text-indigo-100">소방설비기사(기계) 필기 - 소방기본법, 화재예방법, 소방시설법, 위험물법</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-indigo-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
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
                          ? 'bg-indigo-50 border-indigo-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-indigo-500 border-indigo-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-indigo-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-purple-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition"
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
