'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 토픽 1: 회계기본원리 (10문항)
  {
    id: 1,
    topic: '회계기본원리',
    question: '회계의 정의로 가장 적절한 것은?',
    options: [
      '기업의 재무정보를 기록, 분류, 요약하여 보고하는 과정',
      '기업의 세금을 계산하는 과정',
      '기업의 이익만을 계산하는 과정',
      '기업의 현금 흐름만을 기록하는 과정'
    ],
    answer: 0,
    explanation: '회계는 기업의 경제활동을 화폐단위로 측정하여 기록, 분류, 요약하고 그 결과를 해석하여 정보이용자에게 보고하는 일련의 과정입니다.'
  },
  {
    id: 2,
    topic: '회계기본원리',
    question: '회계정보의 질적특성 중 \'신뢰성\'과 관련 없는 것은?',
    options: [
      '표현의 충실성',
      '검증가능성',
      '비교가능성',
      '중립성'
    ],
    answer: 2,
    explanation: '비교가능성은 목적적합성의 하위 개념입니다. 신뢰성의 하위 개념은 표현의 충실성, 검증가능성, 중립성입니다.'
  },
  {
    id: 3,
    topic: '회계기본원리',
    question: '기업실체의 가정에 대한 설명으로 옳은 것은?',
    options: [
      '기업은 청산을 전제로 회계처리한다',
      '기업과 소유주는 동일한 회계단위이다',
      '기업과 소유주를 분리하여 회계처리한다',
      '기업의 모든 거래는 현금으로 측정한다'
    ],
    answer: 2,
    explanation: '기업실체의 가정이란 기업은 소유주와 분리된 독립적인 회계단위로서, 소유주의 개인적 거래와 기업의 거래를 구분하여 회계처리해야 한다는 것입니다.'
  },
  {
    id: 4,
    topic: '회계기본원리',
    question: '회계의 기본가정 중 계속기업의 가정에 대한 설명으로 옳은 것은?',
    options: [
      '기업은 예측 가능한 미래에 청산되지 않고 계속 영업활동을 할 것이라는 가정',
      '기업의 경제활동은 일정 기간 단위로 구분한다는 가정',
      '기업의 모든 거래는 화폐 단위로 측정한다는 가정',
      '기업과 소유주를 분리한다는 가정'
    ],
    answer: 0,
    explanation: '계속기업의 가정은 기업이 예측 가능한 미래에 청산되지 않고 계속하여 영업활동을 수행할 것이라고 가정하는 것입니다.'
  },
  {
    id: 5,
    topic: '회계기본원리',
    question: '다음 중 회계정보 이용자로 분류되지 않는 것은?',
    options: [
      '주주 및 투자자',
      '채권자',
      '경쟁기업',
      '세무당국'
    ],
    answer: 2,
    explanation: '회계정보 이용자에는 투자자, 채권자, 경영자, 종업원, 정부(세무당국), 고객 등이 포함됩니다. 경쟁기업은 일반적으로 회계정보의 적법한 이용자로 분류되지 않습니다.'
  },
  {
    id: 6,
    topic: '회계기본원리',
    question: '발생주의 회계의 특징으로 옳은 것은?',
    options: [
      '현금의 수입과 지출 시점에 수익과 비용을 인식한다',
      '수익은 실현되었을 때, 비용은 발생하였을 때 인식한다',
      '모든 거래를 현금 기준으로 기록한다',
      '결산 시에만 수익과 비용을 인식한다'
    ],
    answer: 1,
    explanation: '발생주의 회계는 현금의 수수 여부와 관계없이 수익은 실현되었을 때, 비용은 발생하였을 때 인식하는 방식입니다.'
  },
  {
    id: 7,
    topic: '회계기본원리',
    question: '회계의 기본 등식으로 옳은 것은?',
    options: [
      '자산 = 부채 - 자본',
      '자산 + 부채 = 자본',
      '자산 = 부채 + 자본',
      '자본 = 자산 + 부채'
    ],
    answer: 2,
    explanation: '회계등식은 "자산 = 부채 + 자본"입니다. 이는 기업이 보유한 자산은 타인으로부터 조달한 부채와 소유주가 출자한 자본의 합계와 같다는 것을 의미합니다.'
  },
  {
    id: 8,
    topic: '회계기본원리',
    question: '기간별 보고의 가정과 관련하여 회계기간에 대한 설명으로 옳은 것은?',
    options: [
      '회계기간은 반드시 1년이어야 한다',
      '회계기간은 임의로 정할 수 있으며, 분기나 반기 결산도 가능하다',
      '회계기간은 기업 설립일부터 청산일까지이다',
      '회계기간은 세법에서 정한 기간만 사용할 수 있다'
    ],
    answer: 1,
    explanation: '기간별 보고의 가정에 따르면 기업의 계속적인 경제활동을 인위적으로 일정 기간으로 구분하여 보고합니다. 일반적으로 1년을 회계기간으로 하나, 분기나 반기 결산도 가능합니다.'
  },
  {
    id: 9,
    topic: '회계기본원리',
    question: '재무회계의 주된 목적으로 가장 적절한 것은?',
    options: [
      '경영자의 의사결정에 필요한 정보 제공',
      '외부 정보이용자에게 유용한 재무정보 제공',
      '원가계산 및 원가관리',
      '세금 신고를 위한 자료 작성'
    ],
    answer: 1,
    explanation: '재무회계의 주된 목적은 투자자, 채권자 등 외부 정보이용자에게 경제적 의사결정에 유용한 재무정보를 제공하는 것입니다.'
  },
  {
    id: 10,
    topic: '회계기본원리',
    question: '화폐단위의 가정에 대한 설명으로 옳은 것은?',
    options: [
      '기업의 모든 활동은 물량 단위로 측정한다',
      '회계는 화폐로 측정 가능한 거래만을 기록 대상으로 한다',
      '외화 거래는 회계 기록 대상에서 제외한다',
      '화폐가치는 항상 변동하므로 물가변동을 반영해야 한다'
    ],
    answer: 1,
    explanation: '화폐단위의 가정은 기업의 경제활동을 화폐라는 공통의 측정단위로 측정하여 기록한다는 것입니다. 화폐로 측정할 수 없는 것(예: 종업원의 능력)은 회계 기록 대상이 아닙니다.'
  },

  // 토픽 2: 계정과목분류 (10문항)
  {
    id: 11,
    topic: '계정과목분류',
    question: '다음 중 유동자산에 해당하는 것은?',
    options: [
      '건물',
      '토지',
      '매출채권',
      '특허권'
    ],
    answer: 2,
    explanation: '유동자산은 1년 이내에 현금화되거나 소비되는 자산으로, 현금, 매출채권, 재고자산, 선급비용 등이 해당됩니다. 건물, 토지는 비유동자산, 특허권은 무형자산입니다.'
  },
  {
    id: 12,
    topic: '계정과목분류',
    question: '다음 중 비유동부채에 해당하는 것은?',
    options: [
      '매입채무',
      '미지급금',
      '선수금',
      '사채'
    ],
    answer: 3,
    explanation: '비유동부채는 결제기일이 1년 이상인 부채로, 사채, 장기차입금, 퇴직급여충당부채 등이 해당됩니다. 매입채무, 미지급금, 선수금은 유동부채입니다.'
  },
  {
    id: 13,
    topic: '계정과목분류',
    question: '자본에 해당하지 않는 것은?',
    options: [
      '자본금',
      '이익잉여금',
      '자본잉여금',
      '미지급배당금'
    ],
    answer: 3,
    explanation: '미지급배당금은 주주에게 지급해야 할 배당금으로 부채에 해당합니다. 자본금, 이익잉여금, 자본잉여금은 모두 자본 항목입니다.'
  },
  {
    id: 14,
    topic: '계정과목분류',
    question: '다음 중 영업외수익에 해당하는 것은?',
    options: [
      '매출액',
      '이자수익',
      '수수료수익',
      '임대료수익(영업목적인 경우)'
    ],
    answer: 1,
    explanation: '이자수익은 금융활동에서 발생하는 수익으로 영업외수익에 해당합니다. 매출액은 주된 영업활동에서 발생하는 수익이며, 수수료수익과 임대료수익(영업목적)은 영업수익입니다.'
  },
  {
    id: 15,
    topic: '계정과목분류',
    question: '판매비와관리비에 해당하지 않는 것은?',
    options: [
      '급여',
      '광고선전비',
      '매출원가',
      '감가상각비'
    ],
    answer: 2,
    explanation: '매출원가는 판매된 제품이나 상품의 원가로 별도의 항목으로 분류됩니다. 급여, 광고선전비, 감가상각비는 판매비와관리비에 해당합니다.'
  },
  {
    id: 16,
    topic: '계정과목분류',
    question: '다음 중 당좌자산에 해당하지 않는 것은?',
    options: [
      '현금및현금성자산',
      '단기금융상품',
      '재고자산',
      '미수금'
    ],
    answer: 2,
    explanation: '당좌자산은 판매과정을 거치지 않고 바로 현금화할 수 있는 자산입니다. 재고자산은 판매과정을 거쳐야 현금화되므로 당좌자산이 아닙니다.'
  },
  {
    id: 17,
    topic: '계정과목분류',
    question: '다음 중 유형자산에 해당하는 것은?',
    options: [
      '특허권',
      '영업권',
      '비품',
      '개발비'
    ],
    answer: 2,
    explanation: '유형자산은 물리적 형태가 있는 자산으로 토지, 건물, 기계장치, 비품, 차량운반구 등이 해당됩니다. 특허권, 영업권, 개발비는 무형자산입니다.'
  },
  {
    id: 18,
    topic: '계정과목분류',
    question: '\'선급금\'과 \'선급비용\'의 차이점으로 옳은 것은?',
    options: [
      '둘 다 동일한 계정과목이다',
      '선급금은 재화 구입 전 지급한 금액, 선급비용은 미래 비용의 선지급액이다',
      '선급금은 부채, 선급비용은 자산이다',
      '선급금은 비용, 선급비용은 자산이다'
    ],
    answer: 1,
    explanation: '선급금은 재화나 용역을 받기 전에 미리 지급한 계약금 등이고, 선급비용은 이미 지급하였으나 아직 비용으로 인식되지 않은 금액(예: 선급임차료, 선급보험료)입니다.'
  },
  {
    id: 19,
    topic: '계정과목분류',
    question: '자본잉여금에 해당하는 것은?',
    options: [
      '이익준비금',
      '주식발행초과금',
      '당기순이익',
      '미처분이익잉여금'
    ],
    answer: 1,
    explanation: '자본잉여금은 자본거래에서 발생한 잉여금으로, 주식발행초과금, 감자차익, 기타자본잉여금 등이 해당됩니다. 이익준비금, 미처분이익잉여금은 이익잉여금 항목입니다.'
  },
  {
    id: 20,
    topic: '계정과목분류',
    question: '\'미수금\'과 \'매출채권\'의 차이점으로 옳은 것은?',
    options: [
      '둘 다 주된 영업활동에서 발생한 채권이다',
      '미수금은 주된 영업활동 외에서 발생, 매출채권은 주된 영업활동에서 발생한다',
      '미수금은 부채, 매출채권은 자산이다',
      '미수금은 비유동자산, 매출채권은 유동자산이다'
    ],
    answer: 1,
    explanation: '매출채권은 주된 영업활동(상품, 제품 판매 등)에서 발생한 채권이고, 미수금은 영업활동 이외(유형자산 처분 등)에서 발생한 채권입니다.'
  },

  // 토픽 3: 분개와전기 (10문항)
  {
    id: 21,
    topic: '분개와전기',
    question: '거래의 8요소 중 자산의 증가는 어느 쪽에 기록하는가?',
    options: [
      '대변',
      '차변',
      '차변과 대변 모두',
      '기록하지 않음'
    ],
    answer: 1,
    explanation: '자산의 증가, 비용의 발생은 차변(왼쪽)에 기록하고, 자산의 감소, 부채와 자본의 증가, 수익의 발생은 대변(오른쪽)에 기록합니다.'
  },
  {
    id: 22,
    topic: '분개와전기',
    question: '상품 \\100,000을 외상으로 매출한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 현금 100,000 / (대) 매출 100,000',
      '(차) 매출채권 100,000 / (대) 매출 100,000',
      '(차) 매출 100,000 / (대) 매출채권 100,000',
      '(차) 매입채무 100,000 / (대) 매출 100,000'
    ],
    answer: 1,
    explanation: '외상매출은 매출채권(자산)이 증가하고 매출(수익)이 발생합니다. 자산 증가는 차변, 수익 발생은 대변에 기록합니다.'
  },
  {
    id: 23,
    topic: '분개와전기',
    question: '급여 \\500,000을 현금으로 지급한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 현금 500,000 / (대) 급여 500,000',
      '(차) 급여 500,000 / (대) 현금 500,000',
      '(차) 미지급급여 500,000 / (대) 현금 500,000',
      '(차) 급여 500,000 / (대) 미지급급여 500,000'
    ],
    answer: 1,
    explanation: '급여 지급은 비용(급여)이 발생하고 자산(현금)이 감소합니다. 비용 발생은 차변, 자산 감소는 대변에 기록합니다.'
  },
  {
    id: 24,
    topic: '분개와전기',
    question: '은행에서 현금 \\1,000,000을 차입한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 차입금 1,000,000 / (대) 현금 1,000,000',
      '(차) 현금 1,000,000 / (대) 차입금 1,000,000',
      '(차) 현금 1,000,000 / (대) 미지급금 1,000,000',
      '(차) 이자비용 1,000,000 / (대) 현금 1,000,000'
    ],
    answer: 1,
    explanation: '차입은 현금(자산)이 증가하고 차입금(부채)이 증가합니다. 자산 증가는 차변, 부채 증가는 대변에 기록합니다.'
  },
  {
    id: 25,
    topic: '분개와전기',
    question: '전기(posting)의 정의로 옳은 것은?',
    options: [
      '거래를 분개장에 기록하는 것',
      '분개장의 내용을 원장에 옮겨 적는 것',
      '시산표를 작성하는 것',
      '재무제표를 작성하는 것'
    ],
    answer: 1,
    explanation: '전기(posting)란 분개장에 기록된 분개 내용을 각 계정과목별 원장(총계정원장)에 옮겨 적는 절차를 말합니다.'
  },
  {
    id: 26,
    topic: '분개와전기',
    question: '비품 \\200,000을 현금으로 구입한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 소모품비 200,000 / (대) 현금 200,000',
      '(차) 비품 200,000 / (대) 현금 200,000',
      '(차) 현금 200,000 / (대) 비품 200,000',
      '(차) 비품 200,000 / (대) 미지급금 200,000'
    ],
    answer: 1,
    explanation: '비품 구입은 비품(자산)이 증가하고 현금(자산)이 감소합니다. 자산 증가는 차변, 자산 감소는 대변에 기록합니다.'
  },
  {
    id: 27,
    topic: '분개와전기',
    question: '매입채무 \\300,000을 현금으로 상환한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 매입채무 300,000 / (대) 현금 300,000',
      '(차) 현금 300,000 / (대) 매입채무 300,000',
      '(차) 매입 300,000 / (대) 현금 300,000',
      '(차) 매입채무 300,000 / (대) 매입 300,000'
    ],
    answer: 0,
    explanation: '매입채무 상환은 매입채무(부채)가 감소하고 현금(자산)이 감소합니다. 부채 감소는 차변, 자산 감소는 대변에 기록합니다.'
  },
  {
    id: 28,
    topic: '분개와전기',
    question: '수익의 발생은 어느 쪽에 기록하는가?',
    options: [
      '차변',
      '대변',
      '차변과 대변 모두',
      '기록하지 않음'
    ],
    answer: 1,
    explanation: '수익의 발생은 대변에 기록합니다. 수익은 자본을 증가시키는 항목이므로, 자본 증가와 같은 쪽인 대변에 기록합니다.'
  },
  {
    id: 29,
    topic: '분개와전기',
    question: '주주로부터 현금 \\5,000,000을 출자받은 거래의 분개로 옳은 것은?',
    options: [
      '(차) 현금 5,000,000 / (대) 차입금 5,000,000',
      '(차) 자본금 5,000,000 / (대) 현금 5,000,000',
      '(차) 현금 5,000,000 / (대) 자본금 5,000,000',
      '(차) 현금 5,000,000 / (대) 이익잉여금 5,000,000'
    ],
    answer: 2,
    explanation: '출자는 현금(자산)이 증가하고 자본금(자본)이 증가합니다. 자산 증가는 차변, 자본 증가는 대변에 기록합니다.'
  },
  {
    id: 30,
    topic: '분개와전기',
    question: '이자비용 \\50,000을 현금으로 지급한 거래의 분개로 옳은 것은?',
    options: [
      '(차) 현금 50,000 / (대) 이자비용 50,000',
      '(차) 이자수익 50,000 / (대) 현금 50,000',
      '(차) 이자비용 50,000 / (대) 현금 50,000',
      '(차) 이자비용 50,000 / (대) 미지급이자 50,000'
    ],
    answer: 2,
    explanation: '이자비용 지급은 이자비용(비용)이 발생하고 현금(자산)이 감소합니다. 비용 발생은 차변, 자산 감소는 대변에 기록합니다.'
  },

  // 토픽 4: 결산절차 (10문항)
  {
    id: 31,
    topic: '결산절차',
    question: '결산의 목적으로 가장 적절한 것은?',
    options: [
      '세금 납부',
      '일정 기간의 경영성과와 기말 재무상태 파악',
      '거래처 관리',
      '직원 급여 지급'
    ],
    answer: 1,
    explanation: '결산은 일정 회계기간 동안의 경영성과(손익)와 기말 현재의 재무상태(자산, 부채, 자본)를 파악하기 위해 수행합니다.'
  },
  {
    id: 32,
    topic: '결산절차',
    question: '결산정리분개의 목적으로 옳지 않은 것은?',
    options: [
      '발생주의에 따른 수익과 비용의 적절한 인식',
      '자산과 부채의 기말 잔액 수정',
      '현금 잔액의 확인',
      '기간귀속의 적정화'
    ],
    answer: 2,
    explanation: '결산정리분개는 발생주의 원칙에 따라 수익과 비용을 적절히 인식하고, 자산과 부채의 기말 잔액을 수정하기 위해 수행합니다. 현금 잔액 확인은 결산정리분개의 주요 목적이 아닙니다.'
  },
  {
    id: 33,
    topic: '결산절차',
    question: '감가상각비 \\100,000을 계상하는 결산정리분개로 옳은 것은?',
    options: [
      '(차) 건물 100,000 / (대) 현금 100,000',
      '(차) 감가상각비 100,000 / (대) 감가상각누계액 100,000',
      '(차) 감가상각누계액 100,000 / (대) 감가상각비 100,000',
      '(차) 감가상각비 100,000 / (대) 건물 100,000'
    ],
    answer: 1,
    explanation: '감가상각비 계상 시 감가상각비(비용)를 차변에, 감가상각누계액(자산의 차감계정)을 대변에 기록합니다.'
  },
  {
    id: 34,
    topic: '결산절차',
    question: '대손충당금을 설정하는 이유로 가장 적절한 것은?',
    options: [
      '매출을 증가시키기 위해',
      '회수 불가능한 채권에 대비하여 비용을 미리 인식하기 위해',
      '현금 유출을 방지하기 위해',
      '부채를 감소시키기 위해'
    ],
    answer: 1,
    explanation: '대손충당금은 매출채권 등 채권 중 회수가 불확실한 금액에 대비하여 미리 비용(대손상각비)을 인식하기 위해 설정합니다.'
  },
  {
    id: 35,
    topic: '결산절차',
    question: '선급비용 중 당기 비용으로 인식할 금액을 처리하는 분개는?',
    options: [
      '(차) 선급비용 xxx / (대) 현금 xxx',
      '(차) 해당 비용 xxx / (대) 선급비용 xxx',
      '(차) 선급비용 xxx / (대) 해당 비용 xxx',
      '(차) 현금 xxx / (대) 선급비용 xxx'
    ],
    answer: 1,
    explanation: '기초에 선급비용으로 처리한 금액 중 당기 비용으로 인식할 금액은 해당 비용계정을 차변에, 선급비용을 대변에 기록합니다.'
  },
  {
    id: 36,
    topic: '결산절차',
    question: '미지급비용을 계상하는 결산정리분개로 옳은 것은?',
    options: [
      '(차) 해당 비용 xxx / (대) 미지급비용 xxx',
      '(차) 미지급비용 xxx / (대) 해당 비용 xxx',
      '(차) 현금 xxx / (대) 미지급비용 xxx',
      '(차) 미지급비용 xxx / (대) 현금 xxx'
    ],
    answer: 0,
    explanation: '미지급비용은 당기에 발생하였으나 아직 지급하지 않은 비용입니다. 해당 비용(비용 발생)을 차변에, 미지급비용(부채 증가)을 대변에 기록합니다.'
  },
  {
    id: 37,
    topic: '결산절차',
    question: '미수수익을 계상하는 결산정리분개로 옳은 것은?',
    options: [
      '(차) 현금 xxx / (대) 미수수익 xxx',
      '(차) 해당 수익 xxx / (대) 미수수익 xxx',
      '(차) 미수수익 xxx / (대) 해당 수익 xxx',
      '(차) 미수수익 xxx / (대) 현금 xxx'
    ],
    answer: 2,
    explanation: '미수수익은 당기에 발생하였으나 아직 받지 못한 수익입니다. 미수수익(자산 증가)을 차변에, 해당 수익(수익 발생)을 대변에 기록합니다.'
  },
  {
    id: 38,
    topic: '결산절차',
    question: '결산 시 재고자산 평가에서 저가법을 적용하는 이유는?',
    options: [
      '재고자산의 가치를 높이기 위해',
      '보수주의 원칙에 따라 자산을 과대계상하지 않기 위해',
      '세금을 줄이기 위해',
      '매출원가를 낮추기 위해'
    ],
    answer: 1,
    explanation: '저가법은 취득원가와 순실현가능가치 중 낮은 금액으로 재고자산을 평가하는 방법으로, 보수주의 원칙에 따라 자산을 과대계상하지 않기 위해 적용합니다.'
  },
  {
    id: 39,
    topic: '결산절차',
    question: '손익계정 마감 시 당기순이익이 발생한 경우의 분개로 옳은 것은?',
    options: [
      '(차) 손익 xxx / (대) 이익잉여금 xxx',
      '(차) 이익잉여금 xxx / (대) 손익 xxx',
      '(차) 손익 xxx / (대) 자본금 xxx',
      '(차) 현금 xxx / (대) 손익 xxx'
    ],
    answer: 0,
    explanation: '당기순이익이 발생하면 손익계정의 대변 잔액(이익)을 이익잉여금으로 대체합니다. (차) 손익 / (대) 이익잉여금'
  },
  {
    id: 40,
    topic: '결산절차',
    question: '다음 중 결산정리사항에 해당하지 않는 것은?',
    options: [
      '감가상각비 계상',
      '대손충당금 설정',
      '일상적인 상품 매입',
      '선급비용의 비용 인식'
    ],
    answer: 2,
    explanation: '일상적인 상품 매입은 기중에 발생하는 일반거래이며, 결산정리사항이 아닙니다. 결산정리사항은 감가상각비 계상, 대손충당금 설정, 선급/미수/선수/미지급 항목 조정 등입니다.'
  },

  // 토픽 5: 재무제표 (10문항)
  {
    id: 41,
    topic: '재무제표',
    question: '재무상태표에 표시되는 항목이 아닌 것은?',
    options: [
      '자산',
      '부채',
      '매출액',
      '자본'
    ],
    answer: 2,
    explanation: '재무상태표는 일정 시점의 자산, 부채, 자본의 상태를 나타냅니다. 매출액은 손익계산서에 표시되는 항목입니다.'
  },
  {
    id: 42,
    topic: '재무제표',
    question: '손익계산서의 목적으로 가장 적절한 것은?',
    options: [
      '기업의 재무상태 표시',
      '일정 기간의 경영성과(수익과 비용) 표시',
      '현금 흐름의 표시',
      '자본의 변동 표시'
    ],
    answer: 1,
    explanation: '손익계산서는 일정 기간 동안 기업의 경영성과, 즉 수익과 비용을 표시하여 당기순이익(손실)을 보고하는 재무제표입니다.'
  },
  {
    id: 43,
    topic: '재무제표',
    question: '재무상태표의 작성 기준일은?',
    options: [
      '기초',
      '기말 현재',
      '일정 기간',
      '특정 거래일'
    ],
    answer: 1,
    explanation: '재무상태표는 기말 현재(특정 시점)의 자산, 부채, 자본의 상태를 나타내는 정태적 재무제표입니다.'
  },
  {
    id: 44,
    topic: '재무제표',
    question: '손익계산서에서 매출총이익의 계산 공식으로 옳은 것은?',
    options: [
      '매출액 - 판매비와관리비',
      '매출액 - 매출원가',
      '영업이익 - 영업외비용',
      '매출액 - 영업비용'
    ],
    answer: 1,
    explanation: '매출총이익 = 매출액 - 매출원가입니다. 매출총이익에서 판매비와관리비를 차감하면 영업이익이 됩니다.'
  },
  {
    id: 45,
    topic: '재무제표',
    question: '재무제표의 종류에 해당하지 않는 것은?',
    options: [
      '재무상태표',
      '손익계산서',
      '시산표',
      '자본변동표'
    ],
    answer: 2,
    explanation: '시산표는 회계기록의 정확성을 검증하기 위한 내부 보고서로, 재무제표가 아닙니다. 재무제표에는 재무상태표, 손익계산서, 자본변동표, 현금흐름표, 주석이 포함됩니다.'
  },
  {
    id: 46,
    topic: '재무제표',
    question: '영업이익의 계산 공식으로 옳은 것은?',
    options: [
      '매출액 - 매출원가',
      '매출총이익 - 판매비와관리비',
      '당기순이익 + 법인세비용',
      '매출액 - 영업외비용'
    ],
    answer: 1,
    explanation: '영업이익 = 매출총이익 - 판매비와관리비입니다. 매출총이익은 매출액에서 매출원가를 차감한 금액입니다.'
  },
  {
    id: 47,
    topic: '재무제표',
    question: '재무상태표의 자산 배열 방법 중 유동성배열법에 대한 설명으로 옳은 것은?',
    options: [
      '취득순서에 따라 배열한다',
      '금액이 큰 순서대로 배열한다',
      '현금화가 빠른 항목부터 배열한다',
      '고정성이 높은 항목부터 배열한다'
    ],
    answer: 2,
    explanation: '유동성배열법은 현금화가 빠른 항목(유동자산)부터 순서대로 배열하는 방법입니다. 대부분의 기업에서 이 방법을 사용합니다.'
  },
  {
    id: 48,
    topic: '재무제표',
    question: '다음 중 현금흐름표의 구성 항목이 아닌 것은?',
    options: [
      '영업활동 현금흐름',
      '투자활동 현금흐름',
      '재무활동 현금흐름',
      '판매활동 현금흐름'
    ],
    answer: 3,
    explanation: '현금흐름표는 영업활동, 투자활동, 재무활동으로 인한 현금흐름으로 구성됩니다. 판매활동 현금흐름이라는 항목은 없습니다.'
  },
  {
    id: 49,
    topic: '재무제표',
    question: '법인세비용차감전순이익에서 법인세비용을 차감하면?',
    options: [
      '영업이익',
      '매출총이익',
      '당기순이익',
      '매출액'
    ],
    answer: 2,
    explanation: '당기순이익 = 법인세비용차감전순이익 - 법인세비용입니다. 당기순이익은 손익계산서의 최종 항목입니다.'
  },
  {
    id: 50,
    topic: '재무제표',
    question: '자본변동표에서 확인할 수 있는 정보가 아닌 것은?',
    options: [
      '자본금의 변동',
      '이익잉여금의 변동',
      '매출채권의 변동',
      '자본잉여금의 변동'
    ],
    answer: 2,
    explanation: '자본변동표는 자본금, 자본잉여금, 이익잉여금 등 자본 항목의 변동을 표시합니다. 매출채권은 자산 항목으로 재무상태표에서 확인할 수 있습니다.'
  }
];

const topics = ['회계기본원리', '계정과목분류', '분개와전기', '결산절차', '재무제표'];

export default function AccountingPrincipleStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const STORAGE_KEY = 'computerized-accounting-1-accounting-principle-progress';

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

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    if (selectedAnswer === currentQ.answer) {
      setProgress(prev => ({ ...prev, [currentQ.id]: true }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAIHelp = () => {
    const prompt = `전산회계 1급 회계원리 학습 질문입니다.

문제: ${currentQ.question}

선택지:
${currentQ.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}

정답: ${currentQ.options[currentQ.answer]}

이 문제에 대해 더 자세히 설명해주세요. 관련 개념과 실무 적용 사례도 함께 알려주세요.`;

    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-1" className="text-gray-500 hover:text-gray-700">전산회계 1급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-1/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">회계원리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📊</span> 학습 진행률
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-bold text-indigo-600">{totalProgress}/50</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(totalProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📚</span> 토픽 선택
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
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
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{completed}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full"
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">회계원리 학습</h1>
              <p className="text-indigo-100">
                {selectedTopic ? `${selectedTopic} - ${filteredQuestions.length}문항` : '전체 50문항'}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Question Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
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

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        showExplanation
                          ? idx === currentQ.answer
                            ? 'border-green-500 bg-green-50'
                            : idx === selectedAnswer
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                          : selectedAnswer === idx
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          showExplanation
                            ? idx === currentQ.answer
                              ? 'bg-green-500 text-white'
                              : idx === selectedAnswer
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            : selectedAnswer === idx
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className={showExplanation && idx === currentQ.answer ? 'font-medium' : ''}>
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-indigo-800 mb-2">해설</h3>
                    <p className="text-indigo-700">{currentQ.explanation}</p>
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
                    {!showExplanation ? (
                      <button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        정답 확인
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
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">문항 바로가기</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setSelectedAnswer(null);
                      setShowExplanation(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      currentQuestion === idx
                        ? 'bg-indigo-600 text-white'
                        : progress[q.id]
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
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
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
