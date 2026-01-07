'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 토픽 1: 회계기본개념 (10문항)
  {
    id: 1,
    topic: '회계기본개념',
    question: '회계란 무엇인가에 대한 설명으로 가장 적절한 것은?',
    options: [
      '기업의 돈을 계산하는 것',
      '기업의 경제활동을 기록하고 보고하는 것',
      '세금을 신고하는 것',
      '급여를 지급하는 것'
    ],
    answer: 1,
    explanation: '회계는 기업의 경제활동을 화폐 단위로 기록, 분류, 요약하여 이해관계자에게 보고하는 과정입니다.'
  },
  {
    id: 2,
    topic: '회계기본개념',
    question: '회계정보를 이용하는 사람이 아닌 것은?',
    options: [
      '투자자',
      '은행',
      '경쟁사 직원',
      '주주'
    ],
    answer: 2,
    explanation: '회계정보 이용자에는 투자자, 채권자(은행), 주주, 정부(세무당국) 등이 있습니다. 경쟁사 직원은 일반적인 회계정보 이용자가 아닙니다.'
  },
  {
    id: 3,
    topic: '회계기본개념',
    question: '회계의 목적으로 가장 적절한 것은?',
    options: [
      '돈을 많이 버는 것',
      '세금을 줄이는 것',
      '경제적 의사결정에 유용한 정보 제공',
      '직원 급여 계산'
    ],
    answer: 2,
    explanation: '회계의 주요 목적은 정보이용자들이 경제적 의사결정을 할 때 유용한 재무정보를 제공하는 것입니다.'
  },
  {
    id: 4,
    topic: '회계기본개념',
    question: '회계등식(회계의 기본 공식)으로 옳은 것은?',
    options: [
      '자산 = 부채 - 자본',
      '자산 = 부채 + 자본',
      '자산 + 부채 = 자본',
      '부채 = 자산 + 자본'
    ],
    answer: 1,
    explanation: '회계등식은 "자산 = 부채 + 자본"입니다. 이는 기업이 가진 자산이 어디서 왔는지(타인자본인 부채와 자기자본인 자본)를 보여줍니다.'
  },
  {
    id: 5,
    topic: '회계기본개념',
    question: '회계기간에 대한 설명으로 옳은 것은?',
    options: [
      '반드시 1월 1일부터 12월 31일까지이다',
      '기업의 경영활동을 일정 기간으로 나눈 것이다',
      '회계기간은 2년이다',
      '회계기간은 정할 수 없다'
    ],
    answer: 1,
    explanation: '회계기간은 기업의 계속적인 경영활동을 일정 기간으로 나누어 성과를 측정하기 위한 기간입니다. 보통 1년이지만, 분기나 반기도 가능합니다.'
  },
  {
    id: 6,
    topic: '회계기본개념',
    question: '재무제표를 작성하는 주된 이유는?',
    options: [
      '세금을 내기 위해서',
      '정보이용자에게 기업의 재무상태와 경영성과를 알리기 위해서',
      '은행에 제출하기 위해서',
      '경쟁사에 자랑하기 위해서'
    ],
    answer: 1,
    explanation: '재무제표는 기업의 재무상태와 경영성과를 이해관계자에게 알리기 위해 작성합니다.'
  },
  {
    id: 7,
    topic: '회계기본개념',
    question: '발생주의 회계에 대한 설명으로 옳은 것은?',
    options: [
      '현금을 받을 때 수익으로 인식한다',
      '현금을 지급할 때 비용으로 인식한다',
      '현금 수수와 관계없이 거래 발생 시점에 인식한다',
      '모든 거래를 현금으로만 처리한다'
    ],
    answer: 2,
    explanation: '발생주의 회계는 현금의 수수 여부와 관계없이 거래가 발생한 시점에 수익과 비용을 인식하는 방법입니다.'
  },
  {
    id: 8,
    topic: '회계기본개념',
    question: '기업실체의 개념에 대한 설명으로 옳은 것은?',
    options: [
      '기업과 사장님은 같은 존재이다',
      '기업은 사장님과 별개의 독립적인 존재이다',
      '가족의 생활비도 기업 비용으로 처리한다',
      '사장님 개인 돈과 기업의 돈을 같이 관리한다'
    ],
    answer: 1,
    explanation: '기업실체의 개념은 기업을 소유주와 분리된 독립적인 회계단위로 보는 것입니다. 따라서 사장님 개인의 거래와 기업의 거래는 구분해야 합니다.'
  },
  {
    id: 9,
    topic: '회계기본개념',
    question: '계속기업의 가정에 대한 설명으로 옳은 것은?',
    options: [
      '기업은 곧 문을 닫을 것이다',
      '기업은 예측 가능한 미래에 계속 영업할 것이다',
      '기업은 1년만 운영한다',
      '기업의 수명은 정해져 있다'
    ],
    answer: 1,
    explanation: '계속기업의 가정은 기업이 예측 가능한 미래에 청산되지 않고 계속해서 영업활동을 할 것이라고 가정하는 것입니다.'
  },
  {
    id: 10,
    topic: '회계기본개념',
    question: '화폐단위의 가정에 대한 설명으로 옳은 것은?',
    options: [
      '모든 거래를 개수로 기록한다',
      '모든 거래를 화폐(원)로 측정하여 기록한다',
      '거래를 무게로 기록한다',
      '기록하지 않아도 된다'
    ],
    answer: 1,
    explanation: '화폐단위의 가정은 기업의 모든 경제활동을 화폐라는 공통 단위로 측정하여 기록한다는 것입니다.'
  },

  // 토픽 2: 계정과목분류 (10문항)
  {
    id: 11,
    topic: '계정과목분류',
    question: '다음 중 자산에 해당하는 것은?',
    options: [
      '매입채무',
      '자본금',
      '현금',
      '매출'
    ],
    answer: 2,
    explanation: '자산은 기업이 소유하고 있는 경제적 자원입니다. 현금, 예금, 상품, 건물 등이 자산에 해당합니다.'
  },
  {
    id: 12,
    topic: '계정과목분류',
    question: '다음 중 부채에 해당하는 것은?',
    options: [
      '상품',
      '토지',
      '차입금',
      '이익잉여금'
    ],
    answer: 2,
    explanation: '부채는 기업이 갚아야 할 의무입니다. 차입금, 매입채무, 미지급금 등이 부채에 해당합니다.'
  },
  {
    id: 13,
    topic: '계정과목분류',
    question: '다음 중 자본에 해당하는 것은?',
    options: [
      '선수금',
      '미수금',
      '자본금',
      '급여'
    ],
    answer: 2,
    explanation: '자본은 자산에서 부채를 뺀 순자산으로, 소유주의 몫입니다. 자본금, 이익잉여금 등이 자본에 해당합니다.'
  },
  {
    id: 14,
    topic: '계정과목분류',
    question: '다음 중 수익에 해당하는 것은?',
    options: [
      '급여',
      '매출',
      '상품',
      '현금'
    ],
    answer: 1,
    explanation: '수익은 기업 활동으로 발생하는 이익의 원천입니다. 매출, 이자수익, 임대료수익 등이 수익에 해당합니다.'
  },
  {
    id: 15,
    topic: '계정과목분류',
    question: '다음 중 비용에 해당하는 것은?',
    options: [
      '자본금',
      '건물',
      '급여',
      '예금'
    ],
    answer: 2,
    explanation: '비용은 수익을 얻기 위해 사용된 경제적 자원입니다. 급여, 임차료, 광고비 등이 비용에 해당합니다.'
  },
  {
    id: 16,
    topic: '계정과목분류',
    question: '\'매출채권\'은 무엇을 의미하나요?',
    options: [
      '물건을 사고 아직 돈을 안 준 것',
      '물건을 팔고 아직 돈을 못 받은 것',
      '은행에 맡긴 돈',
      '빌린 돈'
    ],
    answer: 1,
    explanation: '매출채권은 상품이나 서비스를 외상으로 판매하고 아직 받지 못한 대금을 말합니다. 자산 계정입니다.'
  },
  {
    id: 17,
    topic: '계정과목분류',
    question: '\'매입채무\'는 무엇을 의미하나요?',
    options: [
      '물건을 팔고 아직 돈을 못 받은 것',
      '물건을 사고 아직 돈을 안 준 것',
      '은행에서 빌린 돈',
      '받을 이자'
    ],
    answer: 1,
    explanation: '매입채무는 상품이나 원재료를 외상으로 구입하고 아직 지급하지 않은 대금을 말합니다. 부채 계정입니다.'
  },
  {
    id: 18,
    topic: '계정과목분류',
    question: '유동자산에 해당하지 않는 것은?',
    options: [
      '현금',
      '상품',
      '매출채권',
      '건물'
    ],
    answer: 3,
    explanation: '유동자산은 1년 이내에 현금화되거나 사용되는 자산입니다. 건물은 장기간 사용하는 비유동자산(유형자산)입니다.'
  },
  {
    id: 19,
    topic: '계정과목분류',
    question: '\'선급금\'과 \'선수금\'의 차이점으로 옳은 것은?',
    options: [
      '둘 다 자산이다',
      '둘 다 부채이다',
      '선급금은 자산, 선수금은 부채이다',
      '선급금은 부채, 선수금은 자산이다'
    ],
    answer: 2,
    explanation: '선급금은 물건을 받기 전에 미리 지급한 돈으로 자산입니다. 선수금은 물건을 주기 전에 미리 받은 돈으로 부채입니다.'
  },
  {
    id: 20,
    topic: '계정과목분류',
    question: '자산, 부채, 자본을 표시하는 재무제표는?',
    options: [
      '손익계산서',
      '재무상태표',
      '현금흐름표',
      '자본변동표'
    ],
    answer: 1,
    explanation: '재무상태표(대차대조표)는 일정 시점의 기업의 자산, 부채, 자본 상태를 나타내는 재무제표입니다.'
  },

  // 토픽 3: 분개원리 (10문항)
  {
    id: 21,
    topic: '분개원리',
    question: '분개에서 차변(왼쪽)에 기록하는 것은?',
    options: [
      '부채의 증가',
      '자본의 증가',
      '자산의 증가',
      '수익의 발생'
    ],
    answer: 2,
    explanation: '차변(왼쪽)에는 자산의 증가, 부채의 감소, 자본의 감소, 비용의 발생을 기록합니다.'
  },
  {
    id: 22,
    topic: '분개원리',
    question: '분개에서 대변(오른쪽)에 기록하는 것은?',
    options: [
      '자산의 증가',
      '비용의 발생',
      '부채의 감소',
      '수익의 발생'
    ],
    answer: 3,
    explanation: '대변(오른쪽)에는 자산의 감소, 부채의 증가, 자본의 증가, 수익의 발생을 기록합니다.'
  },
  {
    id: 23,
    topic: '분개원리',
    question: '현금 100,000원으로 상품을 매입한 분개로 옳은 것은?',
    options: [
      '(차) 현금 100,000 / (대) 상품 100,000',
      '(차) 상품 100,000 / (대) 현금 100,000',
      '(차) 매입 100,000 / (대) 매출 100,000',
      '(차) 현금 100,000 / (대) 매입채무 100,000'
    ],
    answer: 1,
    explanation: '상품(자산)이 증가하여 차변에, 현금(자산)이 감소하여 대변에 기록합니다.'
  },
  {
    id: 24,
    topic: '분개원리',
    question: '상품 200,000원을 외상으로 판매한 분개로 옳은 것은?',
    options: [
      '(차) 현금 200,000 / (대) 매출 200,000',
      '(차) 매출채권 200,000 / (대) 매출 200,000',
      '(차) 매출 200,000 / (대) 매출채권 200,000',
      '(차) 상품 200,000 / (대) 매입채무 200,000'
    ],
    answer: 1,
    explanation: '외상 판매 시 매출채권(자산)이 증가하여 차변에, 매출(수익)이 발생하여 대변에 기록합니다.'
  },
  {
    id: 25,
    topic: '분개원리',
    question: '거래의 8요소 중 \'자산의 증가\'와 짝이 되는 것이 아닌 것은?',
    options: [
      '자산의 감소',
      '부채의 증가',
      '자본의 증가',
      '비용의 발생'
    ],
    answer: 3,
    explanation: '자산의 증가(차변)와 짝이 되는 대변 요소는 자산의 감소, 부채의 증가, 자본의 증가, 수익의 발생입니다. 비용의 발생은 차변 요소입니다.'
  },
  {
    id: 26,
    topic: '분개원리',
    question: '은행에서 현금 500,000원을 빌린 분개로 옳은 것은?',
    options: [
      '(차) 차입금 500,000 / (대) 현금 500,000',
      '(차) 현금 500,000 / (대) 차입금 500,000',
      '(차) 현금 500,000 / (대) 자본금 500,000',
      '(차) 예금 500,000 / (대) 차입금 500,000'
    ],
    answer: 1,
    explanation: '돈을 빌리면 현금(자산)이 증가하여 차변에, 차입금(부채)이 증가하여 대변에 기록합니다.'
  },
  {
    id: 27,
    topic: '분개원리',
    question: '급여 300,000원을 현금으로 지급한 분개로 옳은 것은?',
    options: [
      '(차) 현금 300,000 / (대) 급여 300,000',
      '(차) 급여 300,000 / (대) 현금 300,000',
      '(차) 미지급급여 300,000 / (대) 급여 300,000',
      '(차) 급여 300,000 / (대) 미지급급여 300,000'
    ],
    answer: 1,
    explanation: '급여 지급 시 급여(비용)가 발생하여 차변에, 현금(자산)이 감소하여 대변에 기록합니다.'
  },
  {
    id: 28,
    topic: '분개원리',
    question: '분개 시 차변 합계와 대변 합계는?',
    options: [
      '차변이 더 크다',
      '대변이 더 크다',
      '항상 같다',
      '거래에 따라 다르다'
    ],
    answer: 2,
    explanation: '복식부기의 원리에 따라 모든 분개에서 차변 합계와 대변 합계는 항상 일치해야 합니다. 이를 대차평균의 원리라고 합니다.'
  },
  {
    id: 29,
    topic: '분개원리',
    question: '매입채무 100,000원을 현금으로 갚은 분개로 옳은 것은?',
    options: [
      '(차) 현금 100,000 / (대) 매입채무 100,000',
      '(차) 매입채무 100,000 / (대) 현금 100,000',
      '(차) 매입채무 100,000 / (대) 상품 100,000',
      '(차) 상품 100,000 / (대) 현금 100,000'
    ],
    answer: 1,
    explanation: '채무 상환 시 매입채무(부채)가 감소하여 차변에, 현금(자산)이 감소하여 대변에 기록합니다.'
  },
  {
    id: 30,
    topic: '분개원리',
    question: '사장님이 현금 1,000,000원을 출자한 분개로 옳은 것은?',
    options: [
      '(차) 자본금 1,000,000 / (대) 현금 1,000,000',
      '(차) 현금 1,000,000 / (대) 차입금 1,000,000',
      '(차) 현금 1,000,000 / (대) 자본금 1,000,000',
      '(차) 현금 1,000,000 / (대) 매출 1,000,000'
    ],
    answer: 2,
    explanation: '소유주가 출자하면 현금(자산)이 증가하여 차변에, 자본금(자본)이 증가하여 대변에 기록합니다.'
  },

  // 토픽 4: 전표작성 (10문항)
  {
    id: 31,
    topic: '전표작성',
    question: '전표란 무엇인가요?',
    options: [
      '거래를 최초로 기록하는 문서',
      '세금을 계산하는 문서',
      '급여를 지급하는 문서',
      '계약을 체결하는 문서'
    ],
    answer: 0,
    explanation: '전표는 거래가 발생했을 때 이를 최초로 기록하는 회계 문서입니다. 분개장 대신 사용되기도 합니다.'
  },
  {
    id: 32,
    topic: '전표작성',
    question: '입금전표를 사용하는 경우는?',
    options: [
      '현금이 지출될 때',
      '현금이 수입될 때',
      '외상 거래를 할 때',
      '상품을 구입할 때'
    ],
    answer: 1,
    explanation: '입금전표는 현금이 들어오는(수입) 거래를 기록할 때 사용합니다.'
  },
  {
    id: 33,
    topic: '전표작성',
    question: '출금전표를 사용하는 경우는?',
    options: [
      '현금이 수입될 때',
      '현금이 지출될 때',
      '외상 매출을 할 때',
      '외상 매입을 할 때'
    ],
    answer: 1,
    explanation: '출금전표는 현금이 나가는(지출) 거래를 기록할 때 사용합니다.'
  },
  {
    id: 34,
    topic: '전표작성',
    question: '대체전표를 사용하는 경우는?',
    options: [
      '현금 거래만 있을 때',
      '현금의 수입만 있을 때',
      '현금의 지출만 있을 때',
      '현금 거래가 없거나 복합 거래일 때'
    ],
    answer: 3,
    explanation: '대체전표는 현금의 수입이나 지출이 없는 거래, 또는 현금의 수입과 지출이 동시에 발생하는 복합 거래에 사용합니다.'
  },
  {
    id: 35,
    topic: '전표작성',
    question: '3전표제에 포함되는 전표가 아닌 것은?',
    options: [
      '입금전표',
      '출금전표',
      '대체전표',
      '매출전표'
    ],
    answer: 3,
    explanation: '3전표제는 입금전표, 출금전표, 대체전표로 구성됩니다. 매출전표는 3전표제에 포함되지 않습니다.'
  },
  {
    id: 36,
    topic: '전표작성',
    question: '현금 매출 시 사용하는 전표는?',
    options: [
      '출금전표',
      '입금전표',
      '대체전표',
      '매입전표'
    ],
    answer: 1,
    explanation: '현금 매출은 현금이 들어오는 거래이므로 입금전표를 사용합니다.'
  },
  {
    id: 37,
    topic: '전표작성',
    question: '급여를 현금으로 지급할 때 사용하는 전표는?',
    options: [
      '입금전표',
      '출금전표',
      '대체전표',
      '급여전표'
    ],
    answer: 1,
    explanation: '급여를 현금으로 지급하면 현금이 나가는 거래이므로 출금전표를 사용합니다.'
  },
  {
    id: 38,
    topic: '전표작성',
    question: '외상 매출 거래 시 사용하는 전표는?',
    options: [
      '입금전표',
      '출금전표',
      '대체전표',
      '매출전표'
    ],
    answer: 2,
    explanation: '외상 매출은 현금의 수입이나 지출이 없으므로 대체전표를 사용합니다.'
  },
  {
    id: 39,
    topic: '전표작성',
    question: '전표에 기재하지 않는 항목은?',
    options: [
      '거래 일자',
      '계정과목',
      '금액',
      '거래처 전화번호'
    ],
    answer: 3,
    explanation: '전표에는 거래 일자, 계정과목, 금액, 적요(거래 내용) 등을 기재합니다. 거래처 전화번호는 필수 기재 항목이 아닙니다.'
  },
  {
    id: 40,
    topic: '전표작성',
    question: '입금전표의 차변 계정은 항상?',
    options: [
      '매출',
      '현금',
      '상품',
      '매입채무'
    ],
    answer: 1,
    explanation: '입금전표는 현금이 수입되는 거래를 기록하므로, 차변은 항상 현금(자산 증가)이 됩니다.'
  },

  // 토픽 5: 장부와재무제표 (10문항)
  {
    id: 41,
    topic: '장부와재무제표',
    question: '분개장의 역할은?',
    options: [
      '거래를 시간순으로 기록하는 장부',
      '계정과목별로 기록하는 장부',
      '현금만 기록하는 장부',
      '재무상태를 나타내는 보고서'
    ],
    answer: 0,
    explanation: '분개장은 거래가 발생한 순서대로 분개를 기록하는 장부입니다. 모든 거래를 시간순으로 기록합니다.'
  },
  {
    id: 42,
    topic: '장부와재무제표',
    question: '총계정원장의 역할은?',
    options: [
      '거래를 시간순으로 기록하는 장부',
      '각 계정과목별로 거래를 정리하는 장부',
      '현금 입출금만 기록하는 장부',
      '손익을 계산하는 장부'
    ],
    answer: 1,
    explanation: '총계정원장은 분개장의 내용을 계정과목별로 옮겨 적어 정리하는 장부입니다. 이 과정을 전기라고 합니다.'
  },
  {
    id: 43,
    topic: '장부와재무제표',
    question: '재무상태표에 표시되지 않는 항목은?',
    options: [
      '현금',
      '차입금',
      '자본금',
      '매출'
    ],
    answer: 3,
    explanation: '재무상태표는 자산, 부채, 자본을 표시합니다. 매출은 수익 항목으로 손익계산서에 표시됩니다.'
  },
  {
    id: 44,
    topic: '장부와재무제표',
    question: '손익계산서의 목적은?',
    options: [
      '재무상태를 보여주는 것',
      '일정 기간의 경영성과(이익 또는 손실)를 보여주는 것',
      '현금 흐름을 보여주는 것',
      '자본 변동을 보여주는 것'
    ],
    answer: 1,
    explanation: '손익계산서는 일정 기간 동안의 수익과 비용을 비교하여 경영성과(당기순이익 또는 당기순손실)를 나타내는 재무제표입니다.'
  },
  {
    id: 45,
    topic: '장부와재무제표',
    question: '손익계산서에서 매출총이익의 계산식은?',
    options: [
      '매출액 - 판매비',
      '매출액 - 매출원가',
      '매출액 - 급여',
      '매출액 - 이자비용'
    ],
    answer: 1,
    explanation: '매출총이익 = 매출액 - 매출원가입니다. 상품을 팔아서 얻은 총이익을 의미합니다.'
  },
  {
    id: 46,
    topic: '장부와재무제표',
    question: '시산표의 목적은?',
    options: [
      '세금을 계산하는 것',
      '분개와 전기의 정확성을 검증하는 것',
      '급여를 계산하는 것',
      '재고를 파악하는 것'
    ],
    answer: 1,
    explanation: '시산표는 모든 계정의 차변 합계와 대변 합계가 일치하는지 확인하여 분개와 전기의 정확성을 검증하는 표입니다.'
  },
  {
    id: 47,
    topic: '장부와재무제표',
    question: '재무상태표의 특징으로 옳은 것은?',
    options: [
      '일정 기간의 경영성과를 보여준다',
      '특정 시점의 재무상태를 보여준다',
      '현금 흐름만 보여준다',
      '수익과 비용을 보여준다'
    ],
    answer: 1,
    explanation: '재무상태표는 특정 시점(예: 12월 31일)의 자산, 부채, 자본 상태를 나타내는 정태적 재무제표입니다.'
  },
  {
    id: 48,
    topic: '장부와재무제표',
    question: '주요장부에 해당하지 않는 것은?',
    options: [
      '분개장',
      '총계정원장',
      '현금출납장',
      '매출장'
    ],
    answer: 2,
    explanation: '주요장부는 분개장과 총계정원장입니다. 현금출납장과 매출장은 보조장부에 해당합니다.'
  },
  {
    id: 49,
    topic: '장부와재무제표',
    question: '손익계산서에서 당기순이익의 계산식은?',
    options: [
      '매출액 - 매출원가',
      '영업이익 - 영업외비용',
      '총수익 - 총비용',
      '매출총이익 - 판매비'
    ],
    answer: 2,
    explanation: '당기순이익 = 총수익 - 총비용입니다. 회계기간 동안 발생한 모든 수익에서 모든 비용을 차감하여 계산합니다.'
  },
  {
    id: 50,
    topic: '장부와재무제표',
    question: '전기(posting)란?',
    options: [
      '분개장에 기록하는 것',
      '분개장의 내용을 원장에 옮겨 적는 것',
      '재무제표를 작성하는 것',
      '시산표를 작성하는 것'
    ],
    answer: 1,
    explanation: '전기란 분개장에 기록된 분개 내용을 총계정원장의 각 계정과목별로 옮겨 적는 절차입니다.'
  }
];

const topics = ['회계기본개념', '계정과목분류', '분개원리', '전표작성', '장부와재무제표'];

export default function AccountingBasicsStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const STORAGE_KEY = 'computerized-accounting-2-accounting-basics-progress';

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
    const prompt = `전산회계 2급 회계기초 학습 질문입니다.

문제: ${currentQ.question}

선택지:
${currentQ.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}

정답: ${currentQ.options[currentQ.answer]}

이 문제에 대해 회계 초보자도 이해할 수 있도록 쉽게 설명해주세요. 실생활 예시도 함께 알려주세요.`;

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
            <Link href="/category/accounting/computerized-accounting-2" className="text-gray-500 hover:text-gray-700">전산회계 2급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-2/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">회계기초</span>
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
                <span className="text-teal-500">📊</span> 학습 진행률
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-bold text-teal-600">{totalProgress}/50</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${(totalProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 토픽 선택
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-teal-100 text-teal-700 font-medium'
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
                          ? 'bg-teal-100 text-teal-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{completed}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-400 rounded-full"
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
            <div className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">회계기초 학습</h1>
              <p className="text-teal-100">
                {selectedTopic ? `${selectedTopic} - ${filteredQuestions.length}문항` : '전체 50문항'}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Question Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
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
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
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
                              ? 'bg-teal-500 text-white'
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
                  <div className="bg-teal-50 rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-teal-800 mb-2">해설</h3>
                    <p className="text-teal-700">{currentQ.explanation}</p>
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
                        className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                        ? 'bg-teal-600 text-white'
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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
