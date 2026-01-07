'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 토픽 1: 계정과목 (5문항)
  {
    id: 1,
    topic: '계정과목',
    question: '계정과목의 정의와 분류 체계를 설명하시오.',
    answer: '계정과목이란 기업의 거래를 동일한 성격별로 분류하여 기록하기 위한 항목명입니다. 크게 재무상태표 계정(자산, 부채, 자본)과 손익계산서 계정(수익, 비용)으로 분류됩니다. 자산은 유동/비유동, 부채도 유동/비유동으로 세분화됩니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 계정과목의 정의와 분류 체계(자산, 부채, 자본, 수익, 비용)에 대해 각각 예시를 들어 쉽게 설명해주세요.'
  },
  {
    id: 2,
    topic: '계정과목',
    question: '자산 계정과목의 종류를 5가지 이상 나열하시오.',
    answer: '자산 계정과목: 현금, 보통예금, 외상매출금(매출채권), 받을어음, 미수금, 선급금, 재고자산(상품, 제품), 건물, 비품, 차량운반구, 토지 등이 있습니다. 유동자산과 비유동자산으로 구분됩니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 자산 계정과목의 종류를 유동자산과 비유동자산으로 구분하여 각각 예시와 함께 설명해주세요.'
  },
  {
    id: 3,
    topic: '계정과목',
    question: '부채 계정과목의 종류를 5가지 이상 나열하시오.',
    answer: '부채 계정과목: 외상매입금(매입채무), 지급어음, 미지급금, 선수금, 예수금, 단기차입금, 장기차입금, 사채, 미지급비용 등이 있습니다. 1년 내 상환은 유동부채, 1년 이상은 비유동부채입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 부채 계정과목의 종류를 유동부채와 비유동부채로 구분하여 각각 예시와 함께 설명해주세요.'
  },
  {
    id: 4,
    topic: '계정과목',
    question: '수익과 비용 계정과목의 차이를 설명하시오.',
    answer: '수익은 기업 활동으로 인한 경제적 효익의 증가로 자본을 증가시킵니다. 예: 매출, 이자수익, 임대료수익. 비용은 경제적 효익의 감소로 자본을 감소시킵니다. 예: 급여, 임차료, 광고선전비, 감가상각비.',
    prompt: 'FAT 2급 부기입문 문제입니다. 수익과 비용 계정과목의 차이점을 정의, 예시, 손익계산서에서의 역할 측면에서 설명해주세요.'
  },
  {
    id: 5,
    topic: '계정과목',
    question: '자본 계정과목의 구성요소를 설명하시오.',
    answer: '자본은 자산에서 부채를 차감한 잔여지분입니다. 구성요소로는 자본금(출자금), 자본잉여금(주식발행초과금), 이익잉여금(이익준비금, 미처분이익잉여금), 자본조정 등이 있습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 자본 계정과목의 구성요소인 자본금, 자본잉여금, 이익잉여금에 대해 각각 설명해주세요.'
  },

  // 토픽 2: 차변과 대변 (5문항)
  {
    id: 6,
    topic: '차변과 대변',
    question: '차변과 대변의 의미를 설명하시오.',
    answer: '차변(Debit)은 계정의 왼쪽, 대변(Credit)은 오른쪽을 의미합니다. 자산과 비용의 증가는 차변, 감소는 대변에 기록합니다. 부채, 자본, 수익의 증가는 대변, 감소는 차변에 기록합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 차변과 대변의 의미와 각 계정과목별 증감 시 기록 위치를 쉬운 예시와 함께 설명해주세요.'
  },
  {
    id: 7,
    topic: '차변과 대변',
    question: '자산의 증가와 감소는 어느 쪽에 기록하는가?',
    answer: '자산의 증가는 차변(왼쪽)에 기록하고, 자산의 감소는 대변(오른쪽)에 기록합니다. 예를 들어 현금이 들어오면 차변에 현금을, 현금이 나가면 대변에 현금을 기록합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 자산의 증가와 감소를 차변/대변에 기록하는 방법을 현금 거래 예시로 설명해주세요.'
  },
  {
    id: 8,
    topic: '차변과 대변',
    question: '부채의 증가와 감소는 어느 쪽에 기록하는가?',
    answer: '부채의 증가는 대변(오른쪽)에 기록하고, 부채의 감소는 차변(왼쪽)에 기록합니다. 예를 들어 돈을 빌리면 대변에 차입금을, 상환하면 차변에 차입금을 기록합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 부채의 증가와 감소를 차변/대변에 기록하는 방법을 차입금 거래 예시로 설명해주세요.'
  },
  {
    id: 9,
    topic: '차변과 대변',
    question: '수익과 비용의 발생은 어느 쪽에 기록하는가?',
    answer: '수익의 발생은 대변(오른쪽)에 기록합니다. 예: 매출 발생 시 대변에 매출. 비용의 발생은 차변(왼쪽)에 기록합니다. 예: 급여 지급 시 차변에 급여. 수익은 자본 증가, 비용은 자본 감소 효과가 있기 때문입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 수익과 비용의 발생을 차변/대변에 기록하는 이유와 방법을 설명해주세요.'
  },
  {
    id: 10,
    topic: '차변과 대변',
    question: '거래의 8요소를 차변과 대변으로 구분하여 설명하시오.',
    answer: '차변 요소: 자산의 증가, 부채의 감소, 자본의 감소, 비용의 발생. 대변 요소: 자산의 감소, 부채의 증가, 자본의 증가, 수익의 발생. 모든 거래는 이 8요소의 결합으로 분개됩니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 거래의 8요소를 차변과 대변으로 구분하고, 각각의 실제 거래 예시를 들어주세요.'
  },

  // 토픽 3: 분개의 원리 (5문항)
  {
    id: 11,
    topic: '분개의 원리',
    question: '분개의 정의와 목적을 설명하시오.',
    answer: '분개란 발생한 거래를 차변과 대변으로 나누어 계정과목과 금액을 기록하는 것입니다. 목적은 거래를 체계적으로 기록하여 원장에 전기하기 위한 준비 과정이며, 복식부기의 기본입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 분개의 정의, 목적, 기본 형식을 쉬운 예시와 함께 설명해주세요.'
  },
  {
    id: 12,
    topic: '분개의 원리',
    question: '현금 500,000원으로 상품을 매입한 경우의 분개를 하시오.',
    answer: '(차) 상품 500,000 / (대) 현금 500,000. 상품(자산)이 증가하여 차변에, 현금(자산)이 감소하여 대변에 기록합니다. 이처럼 자산 간 교환 거래도 차변과 대변 합계가 일치합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 현금으로 상품을 매입하는 거래의 분개 과정을 단계별로 설명해주세요.'
  },
  {
    id: 13,
    topic: '분개의 원리',
    question: '외상으로 상품 300,000원을 매출한 경우의 분개를 하시오.',
    answer: '(차) 외상매출금 300,000 / (대) 매출 300,000. 외상매출금(자산)이 증가하여 차변에, 매출(수익)이 발생하여 대변에 기록합니다. 외상거래는 채권이 발생합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 외상으로 상품을 매출하는 거래의 분개 과정과 외상매출금의 의미를 설명해주세요.'
  },
  {
    id: 14,
    topic: '분개의 원리',
    question: '급여 200,000원을 현금으로 지급한 경우의 분개를 하시오.',
    answer: '(차) 급여 200,000 / (대) 현금 200,000. 급여(비용)가 발생하여 차변에, 현금(자산)이 감소하여 대변에 기록합니다. 비용 발생은 항상 차변에 기록합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 급여 지급 거래의 분개 과정과 비용 계정의 특성을 설명해주세요.'
  },
  {
    id: 15,
    topic: '분개의 원리',
    question: '은행에서 1,000,000원을 차입한 경우의 분개를 하시오.',
    answer: '(차) 현금 1,000,000 / (대) 차입금 1,000,000. 현금(자산)이 증가하여 차변에, 차입금(부채)이 증가하여 대변에 기록합니다. 자금 조달 거래입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 은행 차입 거래의 분개 과정과 부채 계정의 특성을 설명해주세요.'
  },

  // 토픽 4: 전기 (5문항)
  {
    id: 16,
    topic: '전기',
    question: '전기(posting)의 정의와 목적을 설명하시오.',
    answer: '전기란 분개장에 기록된 내용을 각 계정과목별로 원장(총계정원장)에 옮겨 적는 절차입니다. 목적은 계정과목별 증감 내역을 집계하여 잔액을 파악하기 위함입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 전기의 정의, 목적, 절차를 분개장과 원장의 관계와 함께 설명해주세요.'
  },
  {
    id: 17,
    topic: '전기',
    question: 'T계정의 구조와 기록 방법을 설명하시오.',
    answer: 'T계정은 영문자 T 형태로 왼쪽이 차변, 오른쪽이 대변입니다. 상단에 계정과목명을 적고, 거래일자와 금액을 기록합니다. 차변 합계와 대변 합계의 차이가 잔액입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. T계정의 구조, 기록 방법, 잔액 계산 방법을 예시와 함께 설명해주세요.'
  },
  {
    id: 18,
    topic: '전기',
    question: '분개장에서 원장으로의 전기 절차를 설명하시오.',
    answer: '1) 분개장에서 해당 거래의 계정과목 확인 2) 원장에서 해당 계정과목의 T계정 찾기 3) 차변 금액은 T계정 왼쪽에, 대변 금액은 오른쪽에 기록 4) 일자와 상대 계정과목 기록.',
    prompt: 'FAT 2급 부기입문 문제입니다. 분개장에서 원장으로의 전기 절차를 단계별로 예시와 함께 설명해주세요.'
  },
  {
    id: 19,
    topic: '전기',
    question: '차변 잔액 계정과 대변 잔액 계정을 구분하시오.',
    answer: '차변 잔액 계정: 자산, 비용 계정(차변 합계 > 대변 합계). 대변 잔액 계정: 부채, 자본, 수익 계정(대변 합계 > 차변 합계). 정상 잔액의 방향을 알면 오류 발견이 쉽습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 차변 잔액 계정과 대변 잔액 계정의 구분과 각각에 해당하는 계정과목을 설명해주세요.'
  },
  {
    id: 20,
    topic: '전기',
    question: '원장 기록 시 상대 계정과목을 적는 이유를 설명하시오.',
    answer: '상대 계정과목을 기록하면 거래의 원인과 결과를 한눈에 파악할 수 있습니다. 예를 들어 현금 계정에 "급여"가 상대 계정이면 급여 지급으로 현금이 감소했음을 알 수 있습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 원장에 상대 계정과목을 기록하는 이유와 효과를 예시와 함께 설명해주세요.'
  },

  // 토픽 5: 시산표 (5문항)
  {
    id: 21,
    topic: '시산표',
    question: '시산표의 정의와 작성 목적을 설명하시오.',
    answer: '시산표는 일정 시점에 모든 계정의 잔액을 모아 차변과 대변으로 나열한 표입니다. 목적은 대차평균의 원리를 이용하여 분개와 전기의 정확성을 검증하기 위함입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 시산표의 정의, 작성 목적, 구성 요소를 자세히 설명해주세요.'
  },
  {
    id: 22,
    topic: '시산표',
    question: '합계시산표와 잔액시산표의 차이를 설명하시오.',
    answer: '합계시산표는 각 계정의 차변 합계와 대변 합계를 모두 기록합니다. 잔액시산표는 각 계정의 차변 또는 대변 잔액만 기록합니다. 실무에서는 합계잔액시산표를 주로 사용합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 합계시산표, 잔액시산표, 합계잔액시산표의 차이점과 각각의 양식을 설명해주세요.'
  },
  {
    id: 23,
    topic: '시산표',
    question: '시산표에서 발견할 수 없는 오류를 3가지 이상 설명하시오.',
    answer: '1) 거래 자체를 누락한 경우 2) 차변, 대변 금액을 같은 금액으로 잘못 기록한 경우 3) 계정과목을 잘못 사용한 경우 4) 상계 오류. 차대 합계는 일치하지만 내용이 틀린 경우입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 시산표로 발견할 수 없는 오류 유형과 그 이유를 각각 예시와 함께 설명해주세요.'
  },
  {
    id: 24,
    topic: '시산표',
    question: '시산표의 차변 합계와 대변 합계가 일치하는 이유를 설명하시오.',
    answer: '복식부기에서 모든 거래는 차변과 대변에 동일한 금액으로 기록됩니다(대차평균의 원리). 따라서 모든 계정의 차변 합계와 대변 합계는 항상 일치해야 합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 시산표의 대차평균 원리와 차대 합계가 일치하는 이유를 설명해주세요.'
  },
  {
    id: 25,
    topic: '시산표',
    question: '시산표 불일치 시 오류를 찾는 방법을 설명하시오.',
    answer: '1) 시산표 합계 재계산 2) 원장에서 시산표로의 이기 확인 3) 원장 잔액 재계산 4) 분개장에서 원장으로의 전기 확인 5) 분개의 차대 금액 일치 확인. 역순으로 추적합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 시산표 차대 불일치 시 오류를 찾는 절차를 단계별로 설명해주세요.'
  },

  // 토픽 6: 총계정원장 (5문항)
  {
    id: 26,
    topic: '총계정원장',
    question: '총계정원장의 정의와 역할을 설명하시오.',
    answer: '총계정원장은 기업의 모든 계정과목별로 거래 내역과 잔액을 기록하는 주요 장부입니다. 분개장의 내용을 계정별로 분류하여 잔액을 파악하고 재무제표 작성의 기초 자료가 됩니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 총계정원장의 정의, 역할, 분개장과의 관계를 설명해주세요.'
  },
  {
    id: 27,
    topic: '총계정원장',
    question: '총계정원장의 기록 형식(표준식)을 설명하시오.',
    answer: '표준식 원장은 일자, 적요(상대계정), 차변 금액, 대변 금액, 잔액 열로 구성됩니다. 매 거래 후 잔액을 계산하여 기록하므로 언제든지 현재 잔액을 알 수 있습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 총계정원장의 표준식 기록 형식과 각 열의 의미를 예시와 함께 설명해주세요.'
  },
  {
    id: 28,
    topic: '총계정원장',
    question: '총계정원장과 보조원장의 관계를 설명하시오.',
    answer: '총계정원장은 모든 계정을 통합 관리하는 주요 장부이고, 보조원장은 특정 계정(외상매출금, 외상매입금 등)을 거래처별로 상세 관리하는 보조 장부입니다. 보조원장 합계는 총계정원장 잔액과 일치해야 합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 총계정원장과 보조원장의 관계, 역할 차이, 검증 방법을 설명해주세요.'
  },
  {
    id: 29,
    topic: '총계정원장',
    question: '원장의 마감 방법을 설명하시오.',
    answer: '결산 시 수익과 비용 계정은 손익계정으로 대체하여 마감합니다. 자산, 부채, 자본 계정은 차기이월(또는 전기이월)로 마감하고 다음 기 기초잔액으로 이월합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 원장의 마감 방법을 실적계정과 명목계정으로 구분하여 설명해주세요.'
  },
  {
    id: 30,
    topic: '총계정원장',
    question: '원장 기록 시 주의사항을 설명하시오.',
    answer: '1) 일자 순서대로 기록 2) 차변, 대변 금액 정확히 구분 3) 상대 계정과목 기재 4) 잔액 정확히 계산 5) 수정 시 붉은색 또는 수정선 사용. 정확한 기록이 재무제표 신뢰성의 기초입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 원장 기록 시 주의사항과 수정 방법을 설명해주세요.'
  },

  // 토픽 7: 보조장부 (5문항)
  {
    id: 31,
    topic: '보조장부',
    question: '보조장부의 종류와 역할을 설명하시오.',
    answer: '보조장부는 특정 거래의 상세 내역을 기록하는 장부입니다. 종류: 현금출납장, 당좌예금출납장, 매출장, 매입장, 외상매출금원장, 외상매입금원장, 어음기입장, 상품재고장 등이 있습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 보조장부의 종류와 각각의 역할, 기록 내용을 설명해주세요.'
  },
  {
    id: 32,
    topic: '보조장부',
    question: '현금출납장의 기록 내용과 형식을 설명하시오.',
    answer: '현금출납장은 현금의 입금과 출금을 일자별로 기록하는 보조장부입니다. 일자, 적요, 입금액, 출금액, 잔액으로 구성됩니다. 현금 계정의 보조 역할을 하며 잔액은 실제 현금과 일치해야 합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 현금출납장의 기록 형식, 작성 방법, 현금 관리에서의 역할을 설명해주세요.'
  },
  {
    id: 33,
    topic: '보조장부',
    question: '매출장과 매입장의 역할을 설명하시오.',
    answer: '매출장은 상품 판매(매출) 거래의 상세 내역을 기록합니다. 매입장은 상품 구매(매입) 거래의 상세 내역을 기록합니다. 거래일자, 거래처명, 상품명, 수량, 단가, 금액 등을 기록합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 매출장과 매입장의 기록 내용, 형식, 활용 방법을 비교 설명해주세요.'
  },
  {
    id: 34,
    topic: '보조장부',
    question: '거래처원장(보조원장)의 역할을 설명하시오.',
    answer: '거래처원장은 외상매출금, 외상매입금을 거래처별로 상세 관리하는 보조원장입니다. 각 거래처의 발생액, 회수(지급)액, 잔액을 파악할 수 있어 채권·채무 관리에 필수적입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 거래처원장의 역할, 기록 형식, 채권채무 관리에서의 중요성을 설명해주세요.'
  },
  {
    id: 35,
    topic: '보조장부',
    question: '주요부와 보조부의 차이점을 설명하시오.',
    answer: '주요부(분개장, 총계정원장)는 모든 거래가 기록되는 필수 장부입니다. 보조부(현금출납장, 매출장 등)는 특정 거래의 상세 내역을 보완적으로 기록하며, 필요에 따라 선택적으로 작성합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 주요부와 보조부의 차이점, 각각의 종류, 상호 관계를 설명해주세요.'
  },

  // 토픽 8: 결산 기초 (5문항)
  {
    id: 36,
    topic: '결산 기초',
    question: '결산의 정의와 목적을 설명하시오.',
    answer: '결산이란 회계기간 말에 장부를 마감하고 재무제표를 작성하는 절차입니다. 목적은 일정 기간의 경영성과(손익)와 일정 시점의 재무상태(자산, 부채, 자본)를 파악하여 이해관계자에게 보고하는 것입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 결산의 정의, 목적, 필요성을 재무제표와 연관지어 설명해주세요.'
  },
  {
    id: 37,
    topic: '결산 기초',
    question: '결산 절차를 순서대로 설명하시오.',
    answer: '1) 수정전시산표 작성 2) 결산정리사항 파악 3) 결산정리분개 4) 수정후시산표 작성 5) 장부 마감 6) 재무제표(재무상태표, 손익계산서) 작성 7) 이월시산표 작성.',
    prompt: 'FAT 2급 부기입문 문제입니다. 결산 절차를 단계별로 각 단계의 역할과 함께 설명해주세요.'
  },
  {
    id: 38,
    topic: '결산 기초',
    question: '결산정리분개가 필요한 이유를 설명하시오.',
    answer: '발생주의 원칙에 따라 수익과 비용을 해당 기간에 적절히 인식하기 위해 필요합니다. 선급비용, 미지급비용, 감가상각비, 대손충당금 설정 등 기중에 기록되지 않은 항목을 조정합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 결산정리분개의 필요성과 주요 결산정리사항을 예시와 함께 설명해주세요.'
  },
  {
    id: 39,
    topic: '결산 기초',
    question: '수익과 비용 계정의 마감 방법을 설명하시오.',
    answer: '수익 계정 마감: (차) 매출 등 / (대) 손익. 비용 계정 마감: (차) 손익 / (대) 급여 등. 모든 수익과 비용을 손익계정으로 대체하여 당기순손익을 계산한 후 이익잉여금으로 대체합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 수익과 비용 계정의 마감분개와 손익계정 처리 방법을 예시와 함께 설명해주세요.'
  },
  {
    id: 40,
    topic: '결산 기초',
    question: '재무상태표와 손익계산서의 작성 기준을 설명하시오.',
    answer: '재무상태표는 결산일 현재 자산, 부채, 자본의 잔액을 표시합니다(정태보고서). 손익계산서는 회계기간 동안의 수익, 비용, 당기순손익을 표시합니다(동태보고서). 시산표 잔액을 기초로 작성합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 재무상태표와 손익계산서의 차이점, 작성 기준, 상호 관계를 설명해주세요.'
  },

  // 토픽 9: 장부체계 (5문항)
  {
    id: 41,
    topic: '장부체계',
    question: '회계장부의 종류를 분류하여 설명하시오.',
    answer: '주요부: 분개장(거래 발생순 기록), 총계정원장(계정과목별 기록). 보조부: 보조기입장(현금출납장, 매출장 등), 보조원장(거래처원장 등). 주요부는 필수, 보조부는 선택적으로 작성합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계장부의 분류(주요부, 보조부)와 각각의 종류, 역할을 설명해주세요.'
  },
  {
    id: 42,
    topic: '장부체계',
    question: '분개장의 기록 형식과 내용을 설명하시오.',
    answer: '분개장은 거래 발생 순서대로 기록하는 장부입니다. 일자, 차변 계정과목과 금액, 대변 계정과목과 금액, 거래 내용(적요)을 기록합니다. 전기 여부를 표시하는 난도 있습니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 분개장의 기록 형식, 각 항목의 의미, 작성 예시를 설명해주세요.'
  },
  {
    id: 43,
    topic: '장부체계',
    question: '회계순환과정에서 장부의 역할을 설명하시오.',
    answer: '거래 발생 → 분개장 기록 → 총계정원장 전기 → 시산표 작성 → 결산정리 → 재무제표 작성. 각 장부는 회계정보가 체계적으로 처리되어 최종 재무제표로 산출되는 과정에서 역할을 담당합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계순환과정에서 분개장, 원장, 시산표의 역할과 연결 관계를 설명해주세요.'
  },
  {
    id: 44,
    topic: '장부체계',
    question: '장부의 보존기간과 중요성을 설명하시오.',
    answer: '상법에 따라 회계장부와 재무제표는 10년간 보존해야 합니다. 세법상 증빙서류는 5년간 보존합니다. 장부는 기업의 거래 내역을 증명하고 세무조사, 법적 분쟁 시 중요한 증거가 됩니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계장부의 법적 보존기간, 보존 방법, 중요성을 상법과 세법 측면에서 설명해주세요.'
  },
  {
    id: 45,
    topic: '장부체계',
    question: '전표제도의 의의와 종류를 설명하시오.',
    answer: '전표는 거래 발생 시 최초로 작성하는 증빙서류로 분개장 대용입니다. 종류: 입금전표(현금 수입), 출금전표(현금 지출), 대체전표(현금 없는 거래), 분개전표(모든 거래 기록). 실무에서 전표제도를 많이 사용합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 전표제도의 의의, 전표 종류(3전표제, 5전표제), 실무 활용을 설명해주세요.'
  },

  // 토픽 10: 기타 부기 (5문항)
  {
    id: 46,
    topic: '기타 부기',
    question: '복식부기와 단식부기의 차이점을 설명하시오.',
    answer: '복식부기는 모든 거래를 차변과 대변 양면으로 기록하며, 대차평균의 원리로 검증이 가능합니다. 단식부기는 현금의 수입·지출만 기록하며 재무상태 파악이 어렵습니다. 기업회계는 복식부기를 사용합니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 복식부기와 단식부기의 차이점을 기록 방법, 검증 가능성, 정보 산출 측면에서 비교 설명해주세요.'
  },
  {
    id: 47,
    topic: '기타 부기',
    question: '회계등식의 의미와 중요성을 설명하시오.',
    answer: '회계등식: 자산 = 부채 + 자본. 기업이 보유한 자산은 타인 자본(부채)과 자기 자본의 합과 같다는 의미입니다. 모든 거래 후에도 등식이 성립하며, 재무상태표의 기본 구조입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계등식의 의미, 거래 후 등식 유지 원리, 재무상태표와의 관계를 설명해주세요.'
  },
  {
    id: 48,
    topic: '기타 부기',
    question: '회계상 거래의 정의와 비거래 항목을 설명하시오.',
    answer: '회계상 거래는 자산, 부채, 자본, 수익, 비용에 변동을 가져오는 경제적 사건입니다. 계약 체결, 주문, 종업원 채용 등은 아직 자산·부채 변동이 없어 회계상 거래가 아닙니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계상 거래의 정의와 비거래 항목의 예시, 구분 기준을 설명해주세요.'
  },
  {
    id: 49,
    topic: '기타 부기',
    question: '회계정보의 질적 특성을 설명하시오.',
    answer: '목적적합성: 의사결정에 유용해야 함(예측가치, 확인가치). 신뢰성: 충실하게 표현하고 검증 가능해야 함. 비교가능성: 기업 간, 기간 간 비교 가능해야 함. 이해가능성: 이용자가 이해할 수 있어야 함.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계정보의 질적 특성(목적적합성, 신뢰성, 비교가능성, 이해가능성)을 각각 설명해주세요.'
  },
  {
    id: 50,
    topic: '기타 부기',
    question: '회계기간과 발생주의 원칙을 설명하시오.',
    answer: '회계기간은 기업 활동을 일정 기간 단위로 구분하여 보고하는 기간입니다. 일반적으로 1년(1/1~12/31). 발생주의는 현금 수수와 관계없이 수익은 실현 시, 비용은 발생 시 인식하는 원칙입니다.',
    prompt: 'FAT 2급 부기입문 문제입니다. 회계기간의 개념과 발생주의 원칙의 의미, 현금주의와의 차이를 설명해주세요.'
  }
];

const topics = ['계정과목', '차변과 대변', '분개의 원리', '전기', '시산표', '총계정원장', '보조장부', '결산 기초', '장부체계', '기타 부기'];

export default function FAT2BookkeepingStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const STORAGE_KEY = 'fat-2-bookkeeping-progress';

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const filteredQuestions = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const currentQ = filteredQuestions[currentQuestion];

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setProgress(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const handleAIHelp = () => {
    setCurrentPrompt(currentQ.prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-2" className="text-gray-500 hover:text-gray-700">FAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sky-600 font-medium">부기입문</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-sky-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-sky-500">📊</span> 학습 진행률
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-bold text-sky-600">{totalProgress}/50</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-all"
                    style={{ width: `${(totalProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-sky-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-sky-500">📚</span> 토픽 선택
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-sky-100 text-sky-700 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>전체 문항</span>
                    <span className="text-sm text-gray-500">50문항</span>
                  </div>
                </button>
                {topics.map((topic) => {
                  const { completed, total } = getTopicProgress(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleTopicChange(topic)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedTopic === topic
                          ? 'bg-sky-100 text-sky-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{completed}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-400 rounded-full"
                          style={{ width: `${(completed / total) * 100}%` }}
                        ></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm('학습 진행상황을 초기화하시겠습니까?')) {
                  setProgress({});
                  localStorage.removeItem(STORAGE_KEY);
                }
              }}
              className="w-full py-3 text-gray-500 hover:text-gray-700 text-sm transition"
            >
              진행상황 초기화
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-500 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">부기입문 학습</h1>
              <p className="text-sky-100">
                {selectedTopic ? `${selectedTopic} - ${filteredQuestions.length}문항` : '전체 50문항'}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
              {/* Question Header */}
              <div className="bg-sky-50 px-6 py-4 border-b border-sky-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                      {currentQ.topic}
                    </span>
                    <span className="text-gray-500 text-sm">
                      문항 {currentQuestion + 1} / {filteredQuestions.length}
                    </span>
                  </div>
                  {progress[currentQ.id] && (
                    <span className="text-green-500 text-sm font-medium">완료</span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Q{currentQ.id}. {currentQ.question}
                </h2>

                {/* Answer Section */}
                {showAnswer ? (
                  <div className="bg-sky-50 rounded-lg p-5 mb-6 border border-sky-200">
                    <h3 className="font-bold text-sky-800 mb-3 flex items-center gap-2">
                      <span>💡</span> 모범답안
                    </h3>
                    <p className="text-sky-700 leading-relaxed whitespace-pre-line">{currentQ.answer}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-5 mb-6 border border-gray-200">
                    <p className="text-gray-500 text-center">답안 확인 버튼을 눌러 정답을 확인하세요.</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      이전
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === filteredQuestions.length - 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      다음
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {!showAnswer ? (
                      <button
                        onClick={handleShowAnswer}
                        className="px-6 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
                      >
                        답안 확인
                      </button>
                    ) : (
                      <button
                        onClick={handleAIHelp}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium hover:from-orange-600 hover:to-pink-600 transition flex items-center gap-2"
                      >
                        <span>🤖</span> AI에게 질문
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-sky-100">
              <h3 className="font-bold mb-4">문항 바로가기</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      currentQuestion === idx
                        ? 'bg-sky-600 text-white'
                        : progress[q.id]
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
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
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline ml-1">한국공인회계사회 AT자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
