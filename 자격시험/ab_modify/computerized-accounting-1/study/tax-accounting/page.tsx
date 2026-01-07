'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'vat-overview',
    name: '부가세개요',
    color: 'from-pink-500 to-pink-400',
    questions: [
      { id: 1, question: '부가가치세의 납세의무자가 되는 사업자의 범위를 설명하시오.', answer: '영리 목적 유무와 관계없이 사업상 독립적으로 재화·용역을 공급하는 자', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부가가치세의 납세의무자가 되는 사업자의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '부가가치세 과세기간에 대해 설명하시오.', answer: '제1기: 1.1~6.30, 제2기: 7.1~12.31 / 각 기간별 예정·확정신고', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부가가치세 과세기간에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '일반과세자와 간이과세자의 차이점을 설명하시오.', answer: '일반과세자: 매출세액-매입세액, 간이과세자: 매출액×업종별 부가율(연 매출 8,000만원 미만)', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 일반과세자와 간이과세자의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '사업자등록 신청 시기와 필요 서류를 설명하시오.', answer: '사업 개시일부터 20일 이내, 사업자등록신청서·임대차계약서 등', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 사업자등록 신청 시기와 필요 서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '사업자등록 정정 사유와 신고기한을 설명하시오.', answer: '상호·사업장 소재지·사업 종류 변경 등, 변경 사유 발생일부터 20일 이내', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 사업자등록 정정 사유와 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '부가가치세의 특징(다단계, 전단계 세액공제)을 설명하시오.', answer: '거래 단계마다 과세, 전단계에서 납부한 세액을 공제하여 중복 과세 방지', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부가가치세의 특징(다단계, 전단계 세액공제)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '휴업·폐업 시 부가가치세 신고 의무를 설명하시오.', answer: '휴업·폐업일이 속하는 달의 다음 달 25일까지 확정신고', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 휴업·폐업 시 부가가치세 신고 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '사업자 단위 과세제도에 대해 설명하시오.', answer: '본점·지점이 있는 경우 본점에서 총괄하여 신고·납부', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 사업자 단위 과세제도에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '부가가치세 납세지에 대해 설명하시오.', answer: '원칙적으로 각 사업장 소재지, 주된 사업장 총괄납부 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부가가치세 납세지에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '부가가치세 세율(10%)의 적용 방법을 설명하시오.', answer: '공급가액 × 10% = 부가가치세, 공급대가 = 공급가액 + 부가가치세', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부가가치세 세율(10%)의 적용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'taxable-transactions',
    name: '과세거래',
    color: 'from-rose-500 to-rose-400',
    questions: [
      { id: 1, question: '재화의 공급 시기에 대해 설명하시오.', answer: '재화가 인도되거나 이용 가능하게 되는 때, 대가 수령 시점이 아님', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 재화의 공급 시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '용역의 공급 시기에 대해 설명하시오.', answer: '역무가 제공되거나 시설물·권리가 사용되는 때', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 용역의 공급 시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '재화의 수입에 대한 부가가치세 과세 방법을 설명하시오.', answer: '수입신고 시 세관장에게 납부, 관세과세가격+관세+개별소비세 등이 과세표준', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 재화의 수입에 대한 부가가치세 과세 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '영세율이 적용되는 재화·용역을 설명하시오.', answer: '수출 재화, 국외 제공 용역, 외화 획득 재화·용역 등 (세율 0%)', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 영세율이 적용되는 재화·용역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '면세가 적용되는 재화·용역을 설명하시오.', answer: '기초 생활 필수품, 의료·교육 용역, 금융·보험 용역 등', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 면세가 적용되는 재화·용역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '영세율과 면세의 차이점을 설명하시오.', answer: '영세율: 매입세액 환급 가능, 면세: 매입세액 불공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 영세율과 면세의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '재화의 간주공급(자가공급, 개인적 사용 등)에 대해 설명하시오.', answer: '사업자가 자기 재화를 개인적으로 사용하거나 증여 시 공급으로 간주', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 재화의 간주공급(자가공급, 개인적 사용 등)에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '부수 재화·용역의 과세 방법을 설명하시오.', answer: '주된 재화·용역에 부수되는 경우 주된 거래에 포함하여 과세', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 부수 재화·용역의 과세 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '과세표준에 포함되는 항목과 제외되는 항목을 설명하시오.', answer: '포함: 운송비·포장비 등, 제외: 에누리·환입, 대손금액', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 과세표준에 포함되는 항목과 제외되는 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '면세 포기 제도에 대해 설명하시오.', answer: '면세사업자가 관할 세무서장에게 신청하여 과세사업자로 전환 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 면세 포기 제도에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'tax-invoice',
    name: '세금계산서',
    color: 'from-fuchsia-500 to-fuchsia-400',
    questions: [
      { id: 1, question: '세금계산서 발급 의무자와 발급 시기를 설명하시오.', answer: '과세사업자가 재화·용역 공급 시 공급시기에 발급', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서 발급 의무자와 발급 시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '세금계산서의 필요적 기재사항 5가지를 쓰시오.', answer: '공급자 등록번호·성명, 공급받는 자 등록번호, 공급가액·세액, 작성일자', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서의 필요적 기재사항 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '전자세금계산서 발급 의무와 발급 기한을 설명하시오.', answer: '법인사업자 및 직전연도 공급가액 1억원 이상 개인사업자, 공급시기 다음 달 10일까지', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 전자세금계산서 발급 의무와 발급 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '수정세금계산서 발급 사유와 발급 방법을 설명하시오.', answer: '기재사항 착오, 환입, 계약 해제 등의 경우 수정 사유 구분에 따라 발급', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 수정세금계산서 발급 사유와 발급 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '영수증과 세금계산서의 차이점을 설명하시오.', answer: '영수증: 소비자 대상, 매입세액 공제 불가 / 세금계산서: 사업자 대상, 매입세액 공제 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 영수증과 세금계산서의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '세금계산서 합계표의 제출 의무와 제출 기한을 설명하시오.', answer: '매출·매입처별 세금계산서 합계표를 확정신고 시 제출', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서 합계표의 제출 의무와 제출 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '위수탁 세금계산서의 발급 방법을 설명하시오.', answer: '위탁자가 수탁자 명의로 발급하거나, 수탁자가 자기 명의로 발급', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 위수탁 세금계산서의 발급 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '세금계산서 발급 특례(선발급, 후발급)를 설명하시오.', answer: '선발급: 대가를 먼저 받고 발급, 후발급: 공급 후 월합계로 발급', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서 발급 특례(선발급, 후발급)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '신용카드 매출전표의 세금계산서 대용 요건을 설명하시오.', answer: '사업자등록번호 기재된 신용카드 매출전표는 세금계산서 기능 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 신용카드 매출전표의 세금계산서 대용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '세금계산서 미발급·부실기재 시 제재를 설명하시오.', answer: '공급가액의 1%~2% 가산세 부과, 매입세액 공제 거부', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서 미발급·부실기재 시 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'input-tax-credit',
    name: '매입세액공제',
    color: 'from-red-400 to-red-300',
    questions: [
      { id: 1, question: '매입세액 공제의 요건 3가지를 설명하시오.', answer: '세금계산서 수취, 사업 관련 지출, 공제 제외 항목 비해당', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 매입세액 공제의 요건 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '매입세액 불공제 항목 5가지를 쓰시오.', answer: '비영업용 소형승용차, 접대비, 면세사업 관련, 사업과 무관한 지출, 토지 관련', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 매입세액 불공제 항목 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '의제매입세액 공제 제도를 설명하시오.', answer: '면세 농산물 등을 원재료로 구입 시 일정 비율을 매입세액으로 공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 의제매입세액 공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '공통매입세액 안분계산 방법을 설명하시오.', answer: '과세·면세 겸업 시 과세매출 비율에 따라 매입세액 안분', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 공통매입세액 안분계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '대손세액 공제 요건과 공제 방법을 설명하시오.', answer: '거래처 파산 등으로 회수 불능 시 대손 확정일이 속하는 과세기간에 공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 대손세액 공제 요건과 공제 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '재고매입세액 공제 제도를 설명하시오.', answer: '간이과세자→일반과세자 전환 시 재고품에 대한 매입세액 공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 재고매입세액 공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '신용카드 매출전표 등 수령 시 매입세액 공제 방법을 설명하시오.', answer: '사업자등록증 제시 후 받은 신용카드 영수증으로 매입세액 공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 신용카드 매출전표 등 수령 시 매입세액 공제 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '비영업용 소형승용차의 매입세액 불공제 범위를 설명하시오.', answer: '배기량 1,000cc 이하 또는 정원 8인 이하 승용차(운수업 등 제외)', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 비영업용 소형승용차의 매입세액 불공제 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '과세사업 전환 시 감가상각자산의 매입세액 공제를 설명하시오.', answer: '면세→과세 전환 시 미경과 기간에 해당하는 매입세액 공제', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 과세사업 전환 시 감가상각자산의 매입세액 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '매입처별 세금계산서 합계표 미제출 시 제재를 설명하시오.', answer: '매입세액 불공제, 다만 일정 기한 내 제출 시 공제 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 매입처별 세금계산서 합계표 미제출 시 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'filing-payment',
    name: '신고납부',
    color: 'from-pink-400 to-pink-300',
    questions: [
      { id: 1, question: '예정신고·납부 제도를 설명하시오.', answer: '1기: 4.25까지, 2기: 10.25까지 예정신고, 직전 과세기간 세액의 50% 고지납부도 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 예정신고·납부 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '확정신고·납부 기한을 설명하시오.', answer: '1기: 7.25까지, 2기: 다음 해 1.25까지 확정신고·납부', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 확정신고·납부 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '영세율 적용에 따른 환급 절차를 설명하시오.', answer: '수출 등 영세율 매출로 납부세액이 음수인 경우 환급 신청', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 영세율 적용에 따른 환급 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '신고불성실 가산세의 종류와 세율을 설명하시오.', answer: '무신고: 20%(부정 40%), 과소신고: 10%(부정 40%)', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 신고불성실 가산세의 종류와 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '납부불성실 가산세의 계산 방법을 설명하시오.', answer: '미납세액 × 미납일수 × 0.022%(1일당)', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 납부불성실 가산세의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '세금계산서 관련 가산세 종류를 설명하시오.', answer: '미발급, 지연발급, 부실기재, 합계표 미제출·부실기재 등', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 세금계산서 관련 가산세 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '간이과세자의 신고·납부 방법을 설명하시오.', answer: '연 1회 확정신고(다음 해 1.25까지), 매출액×업종별 부가율×10%', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 간이과세자의 신고·납부 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '조기환급 제도를 설명하시오.', answer: '수출업자 등이 예정신고 기간에도 환급을 조기에 받을 수 있는 제도', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 조기환급 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '수정신고와 경정청구의 차이를 설명하시오.', answer: '수정신고: 세액 과소 신고 시 자진 수정, 경정청구: 세액 과다 납부 시 환급 청구', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 수정신고와 경정청구의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '사업자등록 전 매입세액의 공제 방법을 설명하시오.', answer: '사업자등록 신청일로부터 20일 이내에 등록 시 등록 전 매입세액도 공제 가능', prompt: `전산회계 1급 세무회계 문제입니다.\n\n문제: 사업자등록 전 매입세액의 공제 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function TaxAccountingPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['vat-overview']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-accounting-1-tax-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computerized-accounting-1-tax-accounting-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-pink-600">홈</a>
            <span className="text-gray-300">&gt;</span>
            <a href="/category/accounting" className="text-gray-600 hover:text-pink-600">회계·세무</a>
            <span className="text-gray-300">&gt;</span>
            <a href="/category/accounting/computerized-accounting-1" className="text-gray-600 hover:text-pink-600">전산회계 1급</a>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-600">학습</span>
            <span className="text-gray-300">&gt;</span>
            <span className="text-pink-600 font-medium">세무회계</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">세무회계</h1>
              <p className="text-pink-100">전산회계 1급 필기 - 부가가치세 실무</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-pink-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all"
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
                            <span className="text-pink-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm hover:bg-pink-200 transition"
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
