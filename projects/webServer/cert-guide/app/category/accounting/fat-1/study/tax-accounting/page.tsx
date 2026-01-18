'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'vat-basics',
    name: '부가세 기본',
    color: 'from-rose-500 to-rose-400',
    questions: [
      { id: 1, question: '부가가치세의 정의와 특징을 설명하시오.', answer: '재화·용역의 소비에 부과되는 간접세로 다단계 거래마다 과세, 전단계 세액공제 방식', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세의 정의와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '부가가치세 납세의무자의 범위를 설명하시오.', answer: '영리 목적 유무 불문, 사업상 독립적으로 재화·용역을 공급하는 자', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 납세의무자의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '일반과세자와 간이과세자의 구분 기준을 설명하시오.', answer: '연 매출액 8,000만원 미만: 간이과세자, 이상: 일반과세자', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 일반과세자와 간이과세자의 구분 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '부가가치세 과세기간에 대해 설명하시오.', answer: '제1기: 1.1~6.30, 제2기: 7.1~12.31 (각각 예정·확정신고)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 과세기간에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '사업자등록 신청 절차와 기한을 설명하시오.', answer: '사업개시일로부터 20일 이내 관할 세무서에 사업자등록 신청', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 사업자등록 신청 절차와 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'taxable-subject',
    name: '과세대상',
    color: 'from-pink-500 to-pink-400',
    questions: [
      { id: 1, question: '부가가치세 과세대상 거래의 범위를 설명하시오.', answer: '재화의 공급, 용역의 공급, 재화의 수입', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 과세대상 거래의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '재화의 공급 시기에 대해 설명하시오.', answer: '재화가 인도되는 때, 이용 가능하게 되는 때, 대가 청산 완료일 등', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 재화의 공급 시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '영세율이 적용되는 거래를 3가지 이상 쓰시오.', answer: '수출재화, 국외제공용역, 외화획득재화·용역, 외국항행용역 등', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 영세율이 적용되는 거래를 3가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '면세 재화·용역의 대표적 예시를 설명하시오.', answer: '가공되지 않은 농·축·수산물, 의료용역, 교육용역, 금융·보험용역', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 면세 재화·용역의 대표적 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '영세율과 면세의 차이점을 설명하시오.', answer: '영세율: 매입세액 환급가능(세율0%), 면세: 매입세액 불공제', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 영세율과 면세의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'tax-invoice',
    name: '세금계산서',
    color: 'from-red-400 to-red-300',
    questions: [
      { id: 1, question: '세금계산서의 필수 기재사항 5가지를 쓰시오.', answer: '공급자 등록번호, 공급자 성명, 공급받는자 등록번호, 공급가액, 작성일자', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서의 필수 기재사항 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '세금계산서 발급 시기에 대해 설명하시오.', answer: '재화·용역의 공급시기에 발급, 월합계 세금계산서는 다음달 10일까지', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서 발급 시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '전자세금계산서 의무발급 대상자를 설명하시오.', answer: '법인사업자 전부, 개인사업자 중 직전연도 공급가액 1억원 이상', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 전자세금계산서 의무발급 대상자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '수정세금계산서를 발급해야 하는 경우를 설명하시오.', answer: '기재사항 착오, 환입, 계약해제, 공급가액 변동 등', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 수정세금계산서를 발급해야 하는 경우를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '세금계산서와 영수증의 차이점을 설명하시오.', answer: '세금계산서: 사업자간 거래, 매입세액공제 가능 / 영수증: 소비자 대상, 불공제', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서와 영수증의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'input-tax-credit',
    name: '매입세액공제',
    color: 'from-pink-400 to-pink-300',
    questions: [
      { id: 1, question: '매입세액 공제의 요건을 설명하시오.', answer: '적격증빙(세금계산서 등) 수취, 사업관련 지출, 불공제 항목 비해당', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 매입세액 공제의 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '매입세액 불공제 항목을 4가지 이상 쓰시오.', answer: '비영업용 소형승용차, 접대비, 면세사업 관련, 사업무관 지출, 토지관련', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 매입세액 불공제 항목을 4가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '의제매입세액 공제 제도를 설명하시오.', answer: '면세 농산물 등을 원재료로 매입시 일정비율(업종별 2/102~8/108)을 공제', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 의제매입세액 공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '공통매입세액 안분 계산 방법을 설명하시오.', answer: '과세·면세 겸업시 총매입세액 × (과세매출/총매출)로 안분공제', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 공통매입세액 안분 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '신용카드 매출전표로 매입세액 공제받는 방법을 설명하시오.', answer: '사업자등록번호 기재된 신용카드영수증으로 매입세액 공제 가능', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 신용카드 매출전표로 매입세액 공제받는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'vat-filing',
    name: '부가세 신고',
    color: 'from-rose-400 to-rose-300',
    questions: [
      { id: 1, question: '예정신고·납부 기한에 대해 설명하시오.', answer: '1기 예정: 4월 25일, 2기 예정: 10월 25일까지', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 예정신고·납부 기한에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '확정신고·납부 기한에 대해 설명하시오.', answer: '1기 확정: 7월 25일, 2기 확정: 다음해 1월 25일까지', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 확정신고·납부 기한에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '부가가치세 납부세액 계산 구조를 설명하시오.', answer: '납부세액 = 매출세액 - 매입세액 (음수시 환급)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 납부세액 계산 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '간이과세자의 세액계산 방법을 설명하시오.', answer: '납부세액 = 매출액 × 업종별 부가가치율 × 10%', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 간이과세자의 세액계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '부가가치세 가산세의 종류를 3가지 이상 쓰시오.', answer: '무신고가산세(20%), 과소신고가산세(10%), 납부지연가산세(0.022%/일)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 가산세의 종류를 3가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'income-tax-basics',
    name: '소득세 기본',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '소득세의 특징과 과세원칙을 설명하시오.', answer: '개인의 소득에 부과되는 직접세, 종합과세와 분류과세 병행, 누진세율 적용', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 소득세의 특징과 과세원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '소득세 과세대상 소득 8가지를 쓰시오.', answer: '이자, 배당, 사업, 근로, 연금, 기타, 퇴직, 양도소득', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 소득세 과세대상 소득 8가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '종합소득세와 분리과세의 차이를 설명하시오.', answer: '종합과세: 합산하여 누진세율 적용, 분리과세: 원천징수로 납세의무 종결', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 종합소득세와 분리과세의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '소득세 납세의무자의 범위를 설명하시오.', answer: '거주자: 전세계소득 과세, 비거주자: 국내원천소득만 과세', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 소득세 납세의무자의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '소득세 과세기간에 대해 설명하시오.', answer: '매년 1월 1일부터 12월 31일까지 1년간', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 소득세 과세기간에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'earned-income',
    name: '근로소득',
    color: 'from-pink-500 to-pink-400',
    questions: [
      { id: 1, question: '근로소득의 범위에 대해 설명하시오.', answer: '고용관계에 의해 제공하는 근로의 대가로 받는 급여, 상여, 수당 등', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 근로소득의 범위에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '비과세 근로소득 항목을 4가지 이상 쓰시오.', answer: '식대(월 20만원), 자가운전보조금(월 20만원), 출산·보육수당, 야간근로수당(생산직)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 비과세 근로소득 항목을 4가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '근로소득공제 계산방법을 설명하시오.', answer: '총급여 구간별 공제율 적용(500만원까지 70%, 최대 2,000만원 한도)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 근로소득공제 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '근로소득 수입시기에 대해 설명하시오.', answer: '급여를 지급받거나 지급받기로 한 날', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 근로소득 수입시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '일용근로소득의 과세방법을 설명하시오.', answer: '일급에서 15만원 공제 후 6% 세율, 55% 세액공제하여 분리과세', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 일용근로소득의 과세방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'withholding-tax',
    name: '원천징수',
    color: 'from-rose-500 to-rose-400',
    questions: [
      { id: 1, question: '원천징수의 정의와 목적을 설명하시오.', answer: '소득 지급 시 지급자가 세금을 미리 징수·납부하는 제도, 세수 조기확보 목적', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 원천징수의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '원천징수 납부기한에 대해 설명하시오.', answer: '원천징수한 달의 다음달 10일까지 납부 (반기납부 특례 가능)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 원천징수 납부기한에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '근로소득 간이세액표의 적용방법을 설명하시오.', answer: '월급여와 부양가족수에 따라 간이세액표상 세액을 원천징수', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 근로소득 간이세액표의 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '원천징수 대상 소득과 세율을 3가지 이상 쓰시오.', answer: '이자소득(14%), 배당소득(14%), 기타소득(20%), 사업소득(3%)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 원천징수 대상 소득과 세율을 3가지 이상 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '연말정산의 의의와 절차를 설명하시오.', answer: '1년간 원천징수세액과 실제 부담세액 정산, 근무지에서 다음해 2월분 급여 지급시 수행', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 연말정산의 의의와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'comprehensive-income',
    name: '종합소득',
    color: 'from-red-400 to-red-300',
    questions: [
      { id: 1, question: '종합소득세 신고·납부 기한을 설명하시오.', answer: '다음해 5월 1일 ~ 5월 31일 (성실신고확인대상자는 6월 30일)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 종합소득세 신고·납부 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '종합소득세 기본공제 대상자 요건을 설명하시오.', answer: '본인, 배우자(연소득 100만원 이하), 부양가족(직계존비속, 형제자매 등 연령·소득요건 충족)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 종합소득세 기본공제 대상자 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '종합소득세 세율 체계(기본세율)를 설명하시오.', answer: '6%~45% 8단계 초과누진세율 (1,400만원 이하 6%, 5억 초과 45%)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 종합소득세 세율 체계(기본세율)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '소득공제와 세액공제의 차이를 설명하시오.', answer: '소득공제: 과세표준에서 차감, 세액공제: 산출세액에서 차감', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 소득공제와 세액공제의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '종합소득 산출세액 계산 구조를 설명하시오.', answer: '종합소득금액 - 소득공제 = 과세표준 × 세율 - 누진공제 = 산출세액', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 종합소득 산출세액 계산 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'tax-practice',
    name: '세무실무',
    color: 'from-pink-400 to-pink-300',
    questions: [
      { id: 1, question: '더존 Smart A에서 부가세 전표입력 순서를 설명하시오.', answer: '매입매출전표 → 세금계산서 등록 → 부가세신고서 작성 → 신고서 제출', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 더존 Smart A에서 부가세 전표입력 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '매입매출전표에서 유형코드(과세, 면세, 영세율)의 구분을 설명하시오.', answer: '11:과세매출, 12:영세매출, 21:면세매출, 51:과세매입, 52:영세매입, 61:면세매입', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 매입매출전표에서 유형코드(과세, 면세, 영세율)의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '급여대장 작성 시 필수 입력 항목을 설명하시오.', answer: '기본급, 제수당, 공제항목(국민연금, 건강보험, 고용보험, 소득세, 지방소득세)', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 급여대장 작성 시 필수 입력 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '원천징수이행상황신고서 작성 방법을 설명하시오.', answer: '귀속월·지급월 구분, 소득유형별 인원·지급액·세액 기재, 납부세액 계산', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 원천징수이행상황신고서 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '세무조정의 의의와 기본 개념을 설명하시오.', answer: '기업회계와 세무회계의 차이를 조정, 익금산입·손금불산입 등으로 과세표준 계산', prompt: `FAT 1급 세무회계 문제입니다.\n\n문제: 세무조정의 의의와 기본 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function FAT1TaxAccountingPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['vat-basics']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fat-1-tax-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fat-1-tax-accounting-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-rose-600">홈</a>
            <span className="text-gray-300">&gt;</span>
            <a href="/category/accounting" className="text-gray-600 hover:text-rose-600">회계·세무</a>
            <span className="text-gray-300">&gt;</span>
            <a href="/category/accounting/fat-1" className="text-gray-600 hover:text-rose-600">FAT 1급</a>
            <span className="text-gray-300">&gt;</span>
            <span className="text-rose-600 font-medium">세무회계</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">세무회계</h1>
              <p className="text-rose-100">FAT 1급 - 부가세·소득세 기초</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-rose-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all"
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
                            <span className="text-rose-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition"
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
