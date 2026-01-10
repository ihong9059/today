'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'national-planning-intro',
    name: '국토계획법 총론',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '광역도시계획의 정의와 수립권자를 설명하시오.', answer: '2개 이상 시·도에 걸친 광역계획권의 장기발전방향 제시, 국토교통부장관/시·도지사 수립', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 광역도시계획의 정의와 수립권자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '도시기본계획의 법적 성격과 수립 절차를 설명하시오.', answer: '장기 정책방향 제시 계획, 비구속적 행정계획, 기초조사→공청회→의회의견→승인', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시기본계획의 법적 성격과 수립 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '도시·군관리계획의 정의와 결정권자를 설명하시오.', answer: '용도지역·지구·구역 지정, 시·도지사 또는 대도시 시장이 결정', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시·군관리계획의 정의와 결정권자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '국토계획법상 도시지역과 비도시지역의 구분 기준을 설명하시오.', answer: '도시지역(주거·상업·공업·녹지), 비도시지역(관리·농림·자연환경보전)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 국토계획법상 도시지역과 비도시지역의 구분 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '지구단위계획의 정의와 종류를 설명하시오.', answer: '토지이용 합리화·도시환경 조성을 위한 상세계획, 제1종(토지이용)·제2종(개발사업)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 지구단위계획의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'land-use-zones',
    name: '용도지역/지구/구역',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '주거지역의 세분류 4가지를 쓰고 각각의 특징을 설명하시오.', answer: '전용(1종·2종), 일반(1종·2종·3종), 준주거지역으로 세분', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 주거지역의 세분류 4가지를 쓰고 각각의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '상업지역의 종류와 각각의 용적률 상한을 설명하시오.', answer: '중심(1500%), 일반(1300%), 근린(900%), 유통(1100%)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 상업지역의 종류와 각각의 용적률 상한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '공업지역의 종류와 각각의 건폐율·용적률을 설명하시오.', answer: '전용공업(70%/400%), 일반공업(70%/350%), 준공업(70%/400%)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 공업지역의 종류와 각각의 건폐율·용적률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '녹지지역의 종류와 행위제한을 설명하시오.', answer: '보전녹지(보전목적), 생산녹지(농업용), 자연녹지(불가피한 개발허용)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 녹지지역의 종류와 행위제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '용도지구와 용도구역의 차이점을 설명하시오.', answer: '용도지구: 용도지역 보완·강화, 용도구역: 시가지 무질서 방지·계획적 관리', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 용도지구와 용도구역의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'urban-facilities',
    name: '도시계획시설',
    color: 'from-teal-600 to-teal-500',
    questions: [
      { id: 1, question: '기반시설의 정의와 7가지 종류를 설명하시오.', answer: '교통시설, 공간시설, 유통공급시설, 공공문화체육시설, 방재시설, 보건위생시설, 환경기초시설', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 기반시설의 정의와 7가지 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '도시계획시설사업의 시행자를 설명하시오.', answer: '행정청(관할 특별시장·시장·군수), 민간시행자(토지소유자, 조합, 민간기업)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시계획시설사업의 시행자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '도시계획시설부지의 매수청구권을 설명하시오.', answer: '10년 이상 미집행 시설부지 소유자가 특별시장 등에게 매수 청구 가능', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시계획시설부지의 매수청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '장기미집행 도시계획시설의 실효제도를 설명하시오.', answer: '결정고시 후 20년 이내 미집행 시 효력 상실, 용도지역 환원', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 장기미집행 도시계획시설의 실효제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '도시계획시설채권의 발행요건을 설명하시오.', answer: '시설사업 비용 조달 위해 지방자치단체가 발행, 시설 설치 후 상환', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시계획시설채권의 발행요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'development-permit',
    name: '개발행위허가',
    color: 'from-cyan-600 to-cyan-500',
    questions: [
      { id: 1, question: '개발행위허가의 대상 5가지를 설명하시오.', answer: '건축물 건축, 공작물 설치, 토지형질변경, 토석채취, 토지분할, 물건적치', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발행위허가의 대상 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '개발행위허가의 기준과 규모제한을 설명하시오.', answer: '녹지·관리지역 30,000㎡ 미만, 농림지역 30,000㎡ 미만, 자연환경보전 5,000㎡ 미만', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발행위허가의 기준과 규모제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '개발행위허가의 이행담보 방법을 설명하시오.', answer: '이행보증금 예치, 이행보증보험증권, 은행의 지급보증서', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발행위허가의 이행담보 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '개발행위허가의 취소·변경 사유를 설명하시오.', answer: '허가조건 위반, 사업 미착수(2년), 공사중단(1년 이상), 거짓 신청', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발행위허가의 취소·변경 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '개발행위허가 제한지역의 지정요건을 설명하시오.', answer: '녹지지역·계획관리지역 난개발 우려, 시·도지사가 3년 이내 지정', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발행위허가 제한지역의 지정요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'urban-development-act',
    name: '도시개발법',
    color: 'from-teal-500 to-cyan-400',
    questions: [
      { id: 1, question: '도시개발구역의 지정권자와 지정대상을 설명하시오.', answer: '국토부장관·시도지사 지정, 주거·상업·공업·녹지·생산녹지·계획관리지역', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시개발구역의 지정권자와 지정대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '도시개발사업의 시행방식 3가지를 설명하시오.', answer: '수용·사용방식, 환지방식, 혼용방식', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시개발사업의 시행방식 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '환지방식의 절차와 환지계획을 설명하시오.', answer: '환지예정지 지정→사용수익개시→환지처분→등기', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 환지방식의 절차와 환지계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '도시개발사업 시행자의 종류를 설명하시오.', answer: '국가·지자체, 공공기관, 토지소유자, 조합, 건설업자·부동산신탁사', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 도시개발사업 시행자의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '개발계획의 수립 및 변경 절차를 설명하시오.', answer: '주민의견청취→관계기관협의→도시계획위원회심의→지정권자 승인', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 개발계획의 수립 및 변경 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'redevelopment-act',
    name: '정비사업법',
    color: 'from-cyan-500 to-teal-400',
    questions: [
      { id: 1, question: '재개발사업의 정의와 시행요건을 설명하시오.', answer: '정비기반시설 열악·노후불량건축물 밀집지역, 기반시설 정비+주거환경 개선', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 재개발사업의 정의와 시행요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '재건축사업의 정의와 시행요건을 설명하시오.', answer: '기반시설 양호·노후불량건축물 밀집지역, 주거환경 개선 위한 건축물 재건축', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 재건축사업의 정의와 시행요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '정비구역 지정 절차를 설명하시오.', answer: '기본계획수립→안전진단→정비계획입안→주민공람→지방의회의견→도계위심의→지정고시', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 정비구역 지정 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '조합설립인가 요건(동의율)을 설명하시오.', answer: '재개발: 토지등소유자 3/4 이상, 재건축: 주택단지 3/4 이상+각 동 1/2 이상', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 조합설립인가 요건(동의율)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '관리처분계획의 내용과 인가기준을 설명하시오.', answer: '분양설계, 종전자산평가, 분담금 산정 등 포함, 시장·군수 인가', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 관리처분계획의 내용과 인가기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'building-act',
    name: '건축법',
    color: 'from-teal-600 to-cyan-500',
    questions: [
      { id: 1, question: '건축허가와 건축신고의 차이를 설명하시오.', answer: '허가: 85㎡ 초과 등 대규모, 신고: 85㎡ 이하 소규모·용도변경', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 건축허가와 건축신고의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '건폐율의 정의와 용도지역별 상한을 설명하시오.', answer: '대지면적 대비 건축면적 비율, 주거지역 60%, 상업지역 90%, 공업지역 70%', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 건폐율의 정의와 용도지역별 상한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '용적률의 정의와 산정방법을 설명하시오.', answer: '대지면적 대비 연면적 비율, 지하층·주차용도 면적 제외', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 용적률의 정의와 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '건축물 높이제한의 종류를 설명하시오.', answer: '가로구역별 높이제한, 일조권 사선제한, 도로사선제한', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 건축물 높이제한의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '건축물 용도변경의 종류와 절차를 설명하시오.', answer: '허가(상위군→하위군), 신고(하위군→상위군), 건축물대장 기재변경', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 건축물 용도변경의 종류와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'housing-act',
    name: '주택법',
    color: 'from-cyan-600 to-teal-500',
    questions: [
      { id: 1, question: '사업계획승인의 대상과 승인권자를 설명하시오.', answer: '30세대 이상 주택건설, 시장·군수·구청장 승인(50세대 미만 신고)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 사업계획승인의 대상과 승인권자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '분양가상한제의 적용대상과 상한가격을 설명하시오.', answer: '투기과열지구·조정대상지역 공공택지 적용, 택지비+건축비+가산비', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 분양가상한제의 적용대상과 상한가격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '입주자모집 시기와 조건을 설명하시오.', answer: '착공 후 일정공정률 도달 시, 입주예정일 공고·분양보증서 발급', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 입주자모집 시기와 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '전매제한의 대상과 기간을 설명하시오.', answer: '투기과열지구 소유권이전등기 시까지, 조정대상지역 일정기간', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 전매제한의 대상과 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '주택조합의 종류와 설립요건을 설명하시오.', answer: '지역주택조합(무주택세대구성원), 직장주택조합(동일직장 근로자)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 주택조합의 종류와 설립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'farmland-act',
    name: '농지법',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '농지취득자격증명의 발급요건을 설명하시오.', answer: '자경목적 농업인, 주말체험영농(1,000㎡ 미만), 농업법인', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 농지취득자격증명의 발급요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '농지전용허가와 농지전용신고의 차이를 설명하시오.', answer: '허가: 660㎡ 초과 등, 신고: 농업시설·주말체험영농시설 등 소규모', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 농지전용허가와 농지전용신고의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '농지보전부담금의 부과대상과 금액을 설명하시오.', answer: '농지전용 시 부과, 개별공시지가의 30% 범위 내', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 농지보전부담금의 부과대상과 금액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '농업진흥지역의 지정목적과 행위제한을 설명하시오.', answer: '우량농지 보전, 농업진흥구역(농업 외 행위 엄격 제한)+농업보호구역', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 농업진흥지역의 지정목적과 행위제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '농지처분명령의 사유와 절차를 설명하시오.', answer: '취득 후 미자경(1년), 임대차(8년 초과), 6개월 내 처분 명령', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 농지처분명령의 사유와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
  {
    id: 'mountainous-act',
    name: '산지관리법',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '산지전용허가의 정의와 허가권자를 설명하시오.', answer: '산지를 다른 용도로 사용하기 위한 허가, 시장·군수·구청장(산림청장)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 산지전용허가의 정의와 허가권자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 2, question: '산지전용허가기준 중 입지기준을 설명하시오.', answer: '평균경사도 25도 이하, 표고 제한, 임목축적, 보전산지 여부', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 산지전용허가기준 중 입지기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 3, question: '복구의무와 복구비예치금을 설명하시오.', answer: '산지전용 후 원상복구 의무, 복구비 예치(보증보험증권 대체 가능)', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 복구의무와 복구비예치금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 4, question: '대체산림자원조성비의 부과대상과 금액을 설명하시오.', answer: '산지전용·일시사용 시 부과, 산림복구비용 산정기준 적용', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 대체산림자원조성비의 부과대상과 금액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
      { id: 5, question: '보전산지와 준보전산지의 차이를 설명하시오.', answer: '보전산지(임업용·공익용), 준보전산지(전용 상대적 허용), 행위제한 차등', prompt: `공인중개사 부동산공법 문제입니다.\n\n문제: 보전산지와 준보전산지의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 허가/신고 요건\n4. 위반시 제재\n5. 기출 포인트` },
    ],
  },
];

export default function PublicLawStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['national-planning-intro']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('realtor-public-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('realtor-public-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance/real-estate-agent" className="text-gray-600 hover:text-teal-600">공인중개사</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">부동산공법</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">부동산공법</h1>
              <p className="text-teal-100">공인중개사 2차 - 국토계획법, 건축법, 도시개발법, 농지법</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-teal-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all"
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
                            <span className="text-teal-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-cyan-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
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
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
