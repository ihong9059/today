'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'fire-basic-law',
    name: '소방기본법',
    color: 'from-orange-600 to-orange-500',
    questions: [
      { id: 1, question: '소방기본법의 목적과 주요 내용을 설명하시오.', answer: '화재 예방, 경계, 진압 및 구조/구급 활동을 통한 국민의 생명/신체/재산 보호', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방기본법의 목적과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '소방기본법상 "소방대상물"의 정의를 쓰시오.', answer: '건축물, 차량, 선박, 항공기, 산림 등 소방활동 대상이 되는 모든 것', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방기본법상 "소방대상물"의 정의를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방활동구역의 설정 및 출입제한에 관해 설명하시오.', answer: '소방대장은 화재현장에 소방활동구역을 정하여 출입 제한/금지 가능', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방활동구역의 설정 및 출입제한에 관해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '소방용수시설의 종류와 설치기준을 설명하시오.', answer: '소화전, 급수탑, 저수조 등 / 시/도지사가 설치 및 유지관리', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방용수시설의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '소방기본법상 화재조사의 목적과 권한을 설명하시오.', answer: '화재원인 및 피해조사, 소방청장/소방본부장/소방서장이 실시', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방기본법상 화재조사의 목적과 권한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'fire-prevention',
    name: '화재예방법',
    color: 'from-red-600 to-red-500',
    questions: [
      { id: 1, question: '화재의 예방 및 안전관리에 관한 법률의 목적을 쓰시오.', answer: '화재의 예방 및 안전관리에 관한 사항을 정하여 화재로부터 국민의 생명/신체/재산 보호', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 화재의 예방 및 안전관리에 관한 법률의 목적을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '화재안전조사의 정의와 실시 주체를 설명하시오.', answer: '소방시설/피난시설 등의 관리상태 점검, 소방관서장이 실시', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 화재안전조사의 정의와 실시 주체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방안전관리자 선임대상과 자격기준을 설명하시오.', answer: '특정소방대상물의 관계인, 소방설비기사/산업기사/기능사 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자 선임대상과 자격기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '화재안전조사 결과에 따른 조치명령의 종류를 쓰시오.', answer: '소방시설 보수/보강, 피난시설 개선, 위험물 제거 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 화재안전조사 결과에 따른 조치명령의 종류를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '소방특별조사의 실시 사유와 절차를 설명하시오.', answer: '화재예방을 위해 필요시, 관계인에게 7일 전 서면통지 후 실시', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방특별조사의 실시 사유와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'fire-facility-law',
    name: '소방시설법',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '소방시설 설치 및 관리에 관한 법률의 목적을 쓰시오.', answer: '화재/재난/재해로부터 국민의 생명/신체/재산 보호, 공공의 안전 확보', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설 설치 및 관리에 관한 법률의 목적을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '소방시설의 종류를 분류하여 설명하시오.', answer: '소화설비, 경보설비, 피난설비, 소화용수설비, 소화활동설비', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설의 종류를 분류하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방시설 자체점검의 종류와 실시시기를 설명하시오.', answer: '작동기능점검(반기1회), 종합정밀점검(연1회)', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설 자체점검의 종류와 실시시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '소방시설관리업의 등록요건과 업무범위를 설명하시오.', answer: '기술인력/장비 등 요건 충족, 점검/정비/유지관리 업무', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설관리업의 등록요건과 업무범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '소방시설의 내진설계 적용대상과 기준을 설명하시오.', answer: '옥내소화전, 스프링클러 등 주요 소방시설에 내진 설계 적용', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설의 내진설계 적용대상과 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'special-object',
    name: '특정소방대상물',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '특정소방대상물의 정의와 분류기준을 설명하시오.', answer: '소방시설 설치 대상 건축물 등, 용도별 30개 이상 분류', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 특정소방대상물의 정의와 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '근린생활시설의 범위와 소방시설 설치기준을 설명하시오.', answer: '일상생활 편의시설, 연면적/층수에 따라 소방시설 결정', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 근린생활시설의 범위와 소방시설 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '용도변경 시 소방시설 변경신고 절차를 설명하시오.', answer: '사전에 소방서에 신고, 변경된 용도에 맞는 소방시설 설치', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 용도변경 시 소방시설 변경신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '복합건축물의 소방시설 설치기준을 설명하시오.', answer: '각 용도별 소방시설 중 가장 강화된 기준 적용', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 복합건축물의 소방시설 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '지하층의 특정소방대상물 소방시설 설치기준을 설명하시오.', answer: '피난 유도등, 비상조명등, 제연설비 등 강화기준 적용', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 지하층의 특정소방대상물 소방시설 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'fire-construction',
    name: '소방시설공사업법',
    color: 'from-amber-600 to-amber-500',
    questions: [
      { id: 1, question: '소방시설공사업의 종류와 등록기준을 설명하시오.', answer: '전문/일반/전기/기계 공사업, 기술인력/자본금/장비 요건', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설공사업의 종류와 등록기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '소방공사 착공신고 및 완공검사 절차를 설명하시오.', answer: '착공 전 소방서 신고, 완공 후 현장확인 및 검사필증 교부', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방공사 착공신고 및 완공검사 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방공사 감리의 종류와 대상을 설명하시오.', answer: '상주감리/비상주감리, 일정 규모 이상 특정소방대상물 대상', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방공사 감리의 종류와 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '소방기술자의 자격과 등급을 설명하시오.', answer: '초급/중급/고급/특급, 학력/경력/자격에 따라 구분', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방기술자의 자격과 등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '소방공사 하도급의 제한사항을 설명하시오.', answer: '일괄하도급 금지, 재하도급 제한, 하도급 비율 규정', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방공사 하도급의 제한사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'hazmat-law',
    name: '위험물안전관리법',
    color: 'from-orange-700 to-orange-600',
    questions: [
      { id: 1, question: '위험물의 정의와 6개 유별 분류를 설명하시오.', answer: '인화성/산화성 물질 등, 1류(산화성고체)~6류(산화성액체)', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 위험물의 정의와 6개 유별 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '지정수량의 개념과 중요성을 설명하시오.', answer: '위험물 저장/취급 허가기준이 되는 수량, 품명별 규정', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 지정수량의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '위험물 제조소의 설치허가 절차를 설명하시오.', answer: '시/도지사에게 허가신청, 완공검사 후 사용', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 위험물 제조소의 설치허가 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '위험물안전관리자의 선임기준과 업무를 설명하시오.', answer: '위험물 취급자격자 선임, 안전관리/점검/기록유지', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 위험물안전관리자의 선임기준과 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '위험물 저장소의 종류와 시설기준을 설명하시오.', answer: '옥내/옥외저장소, 지하탱크저장소 등, 안전거리/보유공지 확보', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 위험물 저장소의 종류와 시설기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'multi-use-law',
    name: '다중이용업소법',
    color: 'from-red-700 to-red-600',
    questions: [
      { id: 1, question: '다중이용업소의 정의와 대상업종을 설명하시오.', answer: '불특정다수 이용 영업소, PC방/노래방/유흥주점 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 다중이용업소의 정의와 대상업종을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '다중이용업소의 안전시설 설치기준을 설명하시오.', answer: '소화설비, 피난설비, 경보설비, 영상음향차단장치 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 다중이용업소의 안전시설 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '다중이용업 영업허가 및 신고 절차를 설명하시오.', answer: '소방시설 완비증명 발급 후 영업신고/허가 가능', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 다중이용업 영업허가 및 신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '화재배상책임보험의 가입대상과 보상한도를 설명하시오.', answer: '다중이용업소 의무가입, 사망 1억5천만원/부상 5천만원', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 화재배상책임보험의 가입대상과 보상한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '다중이용업소 안전관리기본계획의 내용을 설명하시오.', answer: '5년 단위 기본계획 수립, 안전관리정책/교육/점검계획', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 다중이용업소 안전관리기본계획의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'safety-management',
    name: '소방안전관리',
    color: 'from-amber-500 to-yellow-500',
    questions: [
      { id: 1, question: '소방안전관리자의 선임 대상별 등급을 설명하시오.', answer: '특급/1급/2급/3급, 건물 규모와 용도에 따라 구분', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자의 선임 대상별 등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '소방안전관리자의 주요 업무를 5가지 이상 쓰시오.', answer: '소방계획서 작성, 자위소방대 편성, 소방훈련/교육, 시설점검, 소방서 협조', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자의 주요 업무를 5가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방안전관리자 실무교육의 주기와 내용을 설명하시오.', answer: '신규선임시 및 2년마다 실무교육, 법령/실무/점검기술', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자 실무교육의 주기와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '소방계획서의 작성내용과 보관의무를 설명하시오.', answer: '자위소방대 조직, 피난계획, 교육훈련계획 등 포함, 관계인 보관', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방계획서의 작성내용과 보관의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '자위소방대의 편성과 임무를 설명하시오.', answer: '대장, 부대장, 진압반, 구조구급반, 피난유도반 등 편성', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 자위소방대의 편성과 임무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'nfsc',
    name: '소방시설 설치기준',
    color: 'from-orange-600 to-red-500',
    questions: [
      { id: 1, question: 'NFSC(화재안전기준)의 체계와 적용원칙을 설명하시오.', answer: '소방시설별 설치기준, 신규건축물은 당시기준 적용', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: NFSC(화재안전기준)의 체계와 적용원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '자동화재탐지설비(NFSC 203)의 설치대상을 설명하시오.', answer: '연면적 600m2 이상 특정소방대상물 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 자동화재탐지설비(NFSC 203)의 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '비상방송설비(NFSC 202)의 설치대상과 기준을 설명하시오.', answer: '연면적 3,500m2 이상 또는 지하층 등, 음량/배선기준', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 비상방송설비(NFSC 202)의 설치대상과 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '유도등 및 유도표지(NFSC 303)의 종류를 설명하시오.', answer: '피난구유도등, 통로유도등, 객석유도등, 유도표지', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 유도등 및 유도표지(NFSC 303)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '비상콘센트설비(NFSC 504)의 설치대상을 설명하시오.', answer: '11층 이상 또는 지하 3층 이하 특정소방대상물', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 비상콘센트설비(NFSC 504)의 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
  {
    id: 'penalty',
    name: '벌칙 및 행정처분',
    color: 'from-red-600 to-rose-600',
    questions: [
      { id: 1, question: '소방시설 미설치에 대한 벌칙을 설명하시오.', answer: '3년 이하 징역 또는 3천만원 이하 벌금', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설 미설치에 대한 벌칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 2, question: '소방안전관리자 미선임에 대한 과태료를 쓰시오.', answer: '300만원 이하 과태료', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자 미선임에 대한 과태료를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 3, question: '소방시설공사업 등록취소 사유를 3가지 이상 쓰시오.', answer: '거짓 등록, 영업정지 중 영업, 등록기준 미달 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 소방시설공사업 등록취소 사유를 3가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 4, question: '다중이용업소 영업정지 처분 사유를 설명하시오.', answer: '안전시설 미비, 보험 미가입, 안전관리 위반 등', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 다중이용업소 영업정지 처분 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
      { id: 5, question: '위험물안전관리법상 벌칙의 종류와 기준을 설명하시오.', answer: '무허가 제조/저장: 5년이하 징역 또는 1억원이하 벌금', prompt: `소방설비기사(전기) 소방관계법규 문제입니다.\n\n문제: 위험물안전관리법상 벌칙의 종류와 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 적용 대상\n4. 위반시 벌칙\n5. 기출 포인트` },
    ],
  },
];

export default function FireLawPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['fire-basic-law']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('fire-elec-law-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('fire-elec-law-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">🚨</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-orange-600">홈</a><span className="text-gray-300">›</span><a href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</a><span className="text-gray-300">›</span><a href="/category/safety/fire-equipment-electrical" className="text-gray-600 hover:text-orange-600">소방설비기사(전기)</a><span className="text-gray-300">›</span><span className="text-orange-600 font-medium">소방관계법규</span></nav></div></header>

      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📜</span></div><div><h1 className="text-2xl font-bold">소방관계법규</h1><p className="text-orange-100">소방설비기사(전기) 필기 3과목 - 소방기본법, 화재예방법, 위험물안전관리법</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-orange-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-orange-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
