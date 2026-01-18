'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  topic: string;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 토픽 1: 회계의 기초 (5문항)
  {
    id: 1,
    topic: '회계의 기초',
    question: '회계의 정의와 목적에 대해 설명하시오.',
    answer: '회계란 기업의 경제적 활동을 화폐단위로 측정, 기록, 분류, 요약하여 정보이용자에게 보고하는 과정입니다. 목적은 투자자, 채권자 등 이해관계자가 합리적인 의사결정을 할 수 있도록 유용한 재무정보를 제공하는 것입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계의 정의와 목적에 대해 자세히 설명해주세요. 재무회계와 관리회계의 차이점, 회계정보 이용자의 종류도 함께 알려주세요.'
  },
  {
    id: 2,
    topic: '회계의 기초',
    question: '회계의 기본 가정 4가지를 나열하시오.',
    answer: '1) 기업실체의 가정 - 기업과 소유주를 분리 2) 계속기업의 가정 - 기업은 계속 영업활동 3) 기간별 보고의 가정 - 일정 기간 단위로 보고 4) 화폐단위의 가정 - 화폐로 측정 가능한 거래만 기록',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계의 기본 가정 4가지(기업실체, 계속기업, 기간별 보고, 화폐단위)에 대해 각각 자세히 설명해주세요.'
  },
  {
    id: 3,
    topic: '회계의 기초',
    question: '재무회계와 관리회계의 차이점을 설명하시오.',
    answer: '재무회계는 외부 정보이용자를 위한 것으로 일반기업회계기준에 따라 재무제표를 작성합니다. 관리회계는 내부 경영자를 위한 것으로 특별한 기준 없이 원가계산, 예산편성 등 의사결정에 필요한 정보를 제공합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 재무회계와 관리회계의 차이점을 목적, 이용자, 보고 형식, 법적 규제 측면에서 비교 설명해주세요.'
  },
  {
    id: 4,
    topic: '회계의 기초',
    question: '발생주의와 현금주의의 차이점을 설명하시오.',
    answer: '발생주의는 현금 수수와 관계없이 수익은 실현되었을 때, 비용은 발생하였을 때 인식합니다. 현금주의는 현금을 받을 때 수익, 지출할 때 비용을 인식합니다. 일반기업회계기준은 발생주의를 원칙으로 합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 발생주의와 현금주의 회계의 차이점을 예시와 함께 설명해주세요. 왜 기업회계에서 발생주의를 사용하는지도 알려주세요.'
  },
  {
    id: 5,
    topic: '회계의 기초',
    question: '회계정보의 질적특성 중 목적적합성과 신뢰성을 설명하시오.',
    answer: '목적적합성은 정보가 의사결정에 영향을 미칠 수 있어야 함을 의미하며, 예측가치와 확인가치가 있어야 합니다. 신뢰성은 정보가 나타내고자 하는 것을 충실히 표현하고 검증 가능해야 함을 의미합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계정보의 질적특성인 목적적합성과 신뢰성에 대해 하위 개념까지 포함하여 자세히 설명해주세요.'
  },

  // 토픽 2: 복식부기 (5문항)
  {
    id: 6,
    topic: '복식부기',
    question: '복식부기의 원리와 특징을 설명하시오.',
    answer: '복식부기는 모든 거래를 차변과 대변에 동시에 기록하는 방식입니다. 차변 합계와 대변 합계는 항상 일치(대차평균의 원리)하며, 거래의 이중성을 반영합니다. 오류 발견이 용이하고 재무상태와 경영성과를 파악할 수 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 복식부기의 원리와 특징을 단식부기와 비교하여 설명해주세요. 대차평균의 원리도 함께 알려주세요.'
  },
  {
    id: 7,
    topic: '복식부기',
    question: '거래의 8요소를 나열하고 차변/대변 위치를 설명하시오.',
    answer: '차변(왼쪽): 자산의 증가, 부채의 감소, 자본의 감소, 비용의 발생. 대변(오른쪽): 자산의 감소, 부채의 증가, 자본의 증가, 수익의 발생. 모든 거래는 이 8요소의 결합으로 이루어집니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 거래의 8요소를 차변과 대변으로 구분하여 설명하고, 각 요소의 실제 거래 예시도 함께 알려주세요.'
  },
  {
    id: 8,
    topic: '복식부기',
    question: '회계등식 "자산 = 부채 + 자본"의 의미를 설명하시오.',
    answer: '기업이 보유한 자산은 타인으로부터 조달한 부채(타인자본)와 소유주가 출자한 자본(자기자본)의 합계와 같다는 의미입니다. 이 등식은 재무상태표의 기본 구조이며, 모든 거래 후에도 항상 성립합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계등식 "자산 = 부채 + 자본"의 의미와 중요성을 설명해주세요. 거래가 이 등식에 미치는 영향도 예시로 보여주세요.'
  },
  {
    id: 9,
    topic: '복식부기',
    question: '차변과 대변의 의미와 기록 위치를 설명하시오.',
    answer: '차변(Debit)은 계정의 왼쪽, 대변(Credit)은 오른쪽을 의미합니다. 자산과 비용은 증가 시 차변, 감소 시 대변에 기록합니다. 부채, 자본, 수익은 증가 시 대변, 감소 시 차변에 기록합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 차변과 대변의 개념, 기록 위치, 각 계정과목별 증감 기록 방법을 자세히 설명해주세요.'
  },
  {
    id: 10,
    topic: '복식부기',
    question: '대차평균의 원리가 성립하는 이유를 설명하시오.',
    answer: '모든 거래는 원인과 결과의 이중성을 가지며, 차변과 대변에 동일한 금액으로 기록됩니다. 따라서 모든 계정의 차변 합계와 대변 합계는 항상 일치합니다. 이를 통해 기록의 정확성을 검증할 수 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 대차평균의 원리가 성립하는 이유와 이를 활용한 오류 검증 방법을 설명해주세요.'
  },

  // 토픽 3: 계정과목 (5문항)
  {
    id: 11,
    topic: '계정과목',
    question: '유동자산과 비유동자산의 분류 기준을 설명하시오.',
    answer: '유동자산은 1년 이내에 현금화되거나 소비될 것으로 예상되는 자산(현금, 매출채권, 재고자산 등)입니다. 비유동자산은 1년 이상 보유하는 자산(유형자산, 무형자산, 투자자산 등)입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 유동자산과 비유동자산의 분류 기준과 각각에 해당하는 주요 계정과목을 예시와 함께 설명해주세요.'
  },
  {
    id: 12,
    topic: '계정과목',
    question: '매출채권과 미수금의 차이점을 설명하시오.',
    answer: '매출채권은 주된 영업활동(상품, 제품 판매)에서 발생한 외상대금 청구권입니다. 미수금은 주된 영업활동 이외(유형자산 처분, 부수적 거래 등)에서 발생한 채권입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 매출채권과 미수금의 차이점을 발생 원인과 실제 사례를 들어 설명해주세요.'
  },
  {
    id: 13,
    topic: '계정과목',
    question: '유동부채와 비유동부채의 분류 기준을 설명하시오.',
    answer: '유동부채는 1년 이내에 상환해야 하는 부채(매입채무, 단기차입금, 미지급금 등)입니다. 비유동부채는 결제기한이 1년 이상인 부채(장기차입금, 사채, 퇴직급여충당부채 등)입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 유동부채와 비유동부채의 분류 기준과 주요 계정과목을 예시와 함께 설명해주세요.'
  },
  {
    id: 14,
    topic: '계정과목',
    question: '자본금, 자본잉여금, 이익잉여금의 차이를 설명하시오.',
    answer: '자본금은 주주가 출자한 액면금액의 총액입니다. 자본잉여금은 자본거래에서 발생한 잉여금(주식발행초과금 등)입니다. 이익잉여금은 영업활동으로 벌어들인 이익 중 배당하지 않고 사내에 유보한 금액입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 자본금, 자본잉여금, 이익잉여금의 개념과 차이점, 각각의 발생 원인을 설명해주세요.'
  },
  {
    id: 15,
    topic: '계정과목',
    question: '영업수익과 영업외수익의 분류 기준을 설명하시오.',
    answer: '영업수익은 주된 영업활동에서 발생한 수익(매출액, 서비스수익 등)입니다. 영업외수익은 주된 영업활동 이외에서 발생한 수익(이자수익, 배당금수익, 유형자산처분이익 등)입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 영업수익과 영업외수익의 분류 기준과 주요 계정과목을 손익계산서 구조와 함께 설명해주세요.'
  },

  // 토픽 4: 분개 (5문항)
  {
    id: 16,
    topic: '분개',
    question: '분개의 정의와 목적을 설명하시오.',
    answer: '분개란 거래가 발생했을 때 해당 거래를 차변과 대변으로 나누어 계정과목과 금액을 기록하는 것입니다. 목적은 거래를 체계적으로 기록하여 원장에 전기하기 위한 준비 과정입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 분개의 정의, 목적, 분개 절차를 단계별로 설명해주세요.'
  },
  {
    id: 17,
    topic: '분개',
    question: '상품 100,000원을 외상으로 매출한 경우의 분개를 하시오.',
    answer: '(차) 매출채권 100,000 / (대) 매출 100,000. 외상매출이므로 매출채권(자산)이 증가하고, 매출(수익)이 발생합니다. 자산 증가는 차변, 수익 발생은 대변에 기록합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 상품 외상매출 거래의 분개 방법과 관련된 계정과목의 특성을 설명해주세요.'
  },
  {
    id: 18,
    topic: '분개',
    question: '비품 500,000원을 현금으로 구입한 경우의 분개를 하시오.',
    answer: '(차) 비품 500,000 / (대) 현금 500,000. 비품(자산)이 증가하고 현금(자산)이 감소합니다. 자산 증가는 차변, 자산 감소는 대변에 기록합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 유형자산 현금 구입 거래의 분개 방법과 자산의 증감 표시 원칙을 설명해주세요.'
  },
  {
    id: 19,
    topic: '분개',
    question: '은행에서 1,000,000원을 차입한 경우의 분개를 하시오.',
    answer: '(차) 현금 1,000,000 / (대) 차입금 1,000,000. 현금(자산)이 증가하고 차입금(부채)이 증가합니다. 자산 증가는 차변, 부채 증가는 대변에 기록합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 차입금 거래의 분개 방법과 자산, 부채의 증감 표시 원칙을 설명해주세요.'
  },
  {
    id: 20,
    topic: '분개',
    question: '급여 800,000원을 현금으로 지급한 경우의 분개를 하시오.',
    answer: '(차) 급여 800,000 / (대) 현금 800,000. 급여(비용)가 발생하고 현금(자산)이 감소합니다. 비용 발생은 차변, 자산 감소는 대변에 기록합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 비용 지급 거래의 분개 방법과 비용의 발생 표시 원칙을 설명해주세요.'
  },

  // 토픽 5: 전기 (5문항)
  {
    id: 21,
    topic: '전기',
    question: '전기(posting)의 정의와 목적을 설명하시오.',
    answer: '전기란 분개장에 기록된 내용을 각 계정과목별로 원장(총계정원장)에 옮겨 적는 절차입니다. 목적은 계정과목별로 증감 내역을 집계하여 잔액을 파악하기 위함입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 전기의 정의, 목적, 전기 절차를 분개장과 원장의 관계와 함께 설명해주세요.'
  },
  {
    id: 22,
    topic: '전기',
    question: '총계정원장과 보조원장의 차이를 설명하시오.',
    answer: '총계정원장은 모든 계정과목의 증감과 잔액을 기록하는 주요 장부입니다. 보조원장은 특정 계정(매출채권, 매입채무 등)의 세부 내역을 거래처별로 관리하는 보조 장부입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 총계정원장과 보조원장의 역할과 차이점, 상호 관계를 설명해주세요.'
  },
  {
    id: 23,
    topic: '전기',
    question: 'T계정의 구조와 사용 방법을 설명하시오.',
    answer: 'T계정은 영문자 T 형태로 왼쪽이 차변, 오른쪽이 대변입니다. 계정과목명을 상단에 적고, 거래일자, 상대계정, 금액을 기록합니다. 각 계정의 증감을 한눈에 파악할 수 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. T계정의 구조, 기록 방법, 잔액 계산 방법을 예시와 함께 설명해주세요.'
  },
  {
    id: 24,
    topic: '전기',
    question: '전기 시 차변 잔액 계정과 대변 잔액 계정을 구분하시오.',
    answer: '차변 잔액 계정: 자산 계정, 비용 계정(차변 합계 > 대변 합계). 대변 잔액 계정: 부채 계정, 자본 계정, 수익 계정(대변 합계 > 차변 합계). 정상 잔액의 방향을 알면 오류 발견에 도움됩니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 각 계정과목의 정상 잔액 방향(차변/대변)과 이를 활용한 오류 검증 방법을 설명해주세요.'
  },
  {
    id: 25,
    topic: '전기',
    question: '분개장과 원장의 관계를 설명하시오.',
    answer: '분개장은 거래 발생 순서대로 기록하는 장부이고, 원장은 계정과목별로 분류하여 기록하는 장부입니다. 분개장의 내용을 원장에 전기함으로써 각 계정의 잔액을 파악할 수 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 분개장과 원장의 역할, 관계, 각각의 중요성을 회계순환 과정에서 설명해주세요.'
  },

  // 토픽 6: 시산표 (5문항)
  {
    id: 26,
    topic: '시산표',
    question: '시산표의 정의와 작성 목적을 설명하시오.',
    answer: '시산표는 일정 시점에 모든 계정의 잔액을 모아 차변과 대변으로 나열한 표입니다. 작성 목적은 대차평균의 원리를 이용하여 분개와 전기의 정확성을 검증하기 위함입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 시산표의 정의, 작성 목적, 구성 요소를 자세히 설명해주세요.'
  },
  {
    id: 27,
    topic: '시산표',
    question: '합계시산표와 잔액시산표의 차이를 설명하시오.',
    answer: '합계시산표는 각 계정의 차변 합계와 대변 합계를 기록합니다. 잔액시산표는 각 계정의 차변 잔액 또는 대변 잔액만 기록합니다. 합계잔액시산표는 둘을 함께 표시합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 합계시산표, 잔액시산표, 합계잔액시산표의 차이점과 각각의 용도를 설명해주세요.'
  },
  {
    id: 28,
    topic: '시산표',
    question: '시산표에서 발견할 수 없는 오류 유형을 설명하시오.',
    answer: '1) 거래 자체를 누락한 경우 2) 동일 금액을 차변·대변 모두 잘못 기록한 경우 3) 계정과목을 잘못 사용한 경우 4) 상계 오류. 이러한 오류는 차변·대변 합계가 일치하므로 시산표로 발견 불가합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 시산표로 발견할 수 있는 오류와 발견할 수 없는 오류 유형을 예시와 함께 설명해주세요.'
  },
  {
    id: 29,
    topic: '시산표',
    question: '시산표 작성 시점과 주기를 설명하시오.',
    answer: '시산표는 결산 전, 결산정리분개 후, 장부마감 후 등 필요에 따라 수시로 작성할 수 있습니다. 일반적으로 월말, 분기말, 결산기말에 작성하여 기록의 정확성을 검증합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 시산표의 작성 시점과 수정전시산표, 수정후시산표의 차이를 설명해주세요.'
  },
  {
    id: 30,
    topic: '시산표',
    question: '시산표 불일치 시 오류 수정 절차를 설명하시오.',
    answer: '1) 시산표 합계 계산 확인 2) 원장 잔액 전기 확인 3) 원장 합계 계산 확인 4) 분개장에서 원장으로의 전기 확인 5) 분개 차대 금액 일치 확인. 단계별로 오류를 추적합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 시산표 차대 불일치 시 오류를 찾는 절차와 방법을 단계별로 설명해주세요.'
  },

  // 토픽 7: 결산정리 (5문항)
  {
    id: 31,
    topic: '결산정리',
    question: '결산정리분개의 정의와 필요성을 설명하시오.',
    answer: '결산정리분개는 회계기간 말에 발생주의 원칙에 따라 수익과 비용을 적절히 인식하고, 자산과 부채의 장부금액을 수정하기 위해 수행하는 분개입니다. 정확한 재무제표 작성을 위해 필요합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 결산정리분개의 정의, 필요성, 주요 결산정리사항을 설명해주세요.'
  },
  {
    id: 32,
    topic: '결산정리',
    question: '감가상각의 의미와 분개 방법을 설명하시오.',
    answer: '감가상각은 유형자산의 취득원가를 내용연수에 걸쳐 비용으로 배분하는 것입니다. 분개: (차) 감가상각비 xxx / (대) 감가상각누계액 xxx. 감가상각누계액은 자산의 차감계정입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 감가상각의 의미, 목적, 분개 방법과 주요 상각방법(정액법, 정률법)을 설명해주세요.'
  },
  {
    id: 33,
    topic: '결산정리',
    question: '대손충당금 설정의 목적과 분개 방법을 설명하시오.',
    answer: '대손충당금은 매출채권 중 회수 불가능 예상액을 미리 비용으로 인식하기 위해 설정합니다. 분개: (차) 대손상각비 xxx / (대) 대손충당금 xxx. 대손충당금은 매출채권의 차감계정입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 대손충당금의 설정 목적, 추정 방법, 분개 방법을 설명해주세요.'
  },
  {
    id: 34,
    topic: '결산정리',
    question: '선급비용과 미지급비용의 결산정리분개를 설명하시오.',
    answer: '선급비용(자산): 미리 지급했으나 아직 비용 아닌 것. 분개: (차) 해당비용 / (대) 선급비용. 미지급비용(부채): 발생했으나 미지급인 것. 분개: (차) 해당비용 / (대) 미지급비용.',
    prompt: 'FAT 1급 회계원리 문제입니다. 선급비용과 미지급비용의 개념, 결산정리분개 방법을 예시와 함께 설명해주세요.'
  },
  {
    id: 35,
    topic: '결산정리',
    question: '미수수익과 선수수익의 결산정리분개를 설명하시오.',
    answer: '미수수익(자산): 발생했으나 미수령인 것. 분개: (차) 미수수익 / (대) 해당수익. 선수수익(부채): 미리 받았으나 아직 수익 아닌 것. 분개: (차) 선수수익 / (대) 해당수익.',
    prompt: 'FAT 1급 회계원리 문제입니다. 미수수익과 선수수익의 개념, 결산정리분개 방법을 예시와 함께 설명해주세요.'
  },

  // 토픽 8: 재무제표 기초 (5문항)
  {
    id: 36,
    topic: '재무제표 기초',
    question: '재무제표의 종류 5가지를 나열하시오.',
    answer: '1) 재무상태표 - 일정 시점의 자산, 부채, 자본 2) 손익계산서 - 일정 기간의 수익과 비용 3) 자본변동표 - 자본의 변동 4) 현금흐름표 - 현금의 유입과 유출 5) 주석 - 추가 설명 정보',
    prompt: 'FAT 1급 회계원리 문제입니다. 재무제표 5가지의 정의, 목적, 상호 관계를 설명해주세요.'
  },
  {
    id: 37,
    topic: '재무제표 기초',
    question: '재무상태표의 구조와 작성 원칙을 설명하시오.',
    answer: '재무상태표는 일정 시점의 자산, 부채, 자본을 표시합니다. 자산 = 부채 + 자본의 등식 구조를 가지며, 유동성배열법에 따라 유동항목을 먼저 표시합니다. 보고식 또는 계정식으로 작성합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 재무상태표의 구조, 배열 방법, 작성 형식(보고식/계정식)을 설명해주세요.'
  },
  {
    id: 38,
    topic: '재무제표 기초',
    question: '손익계산서의 구조와 이익의 단계별 계산을 설명하시오.',
    answer: '매출액 - 매출원가 = 매출총이익, 매출총이익 - 판관비 = 영업이익, 영업이익 +/- 영업외손익 = 법인세비용차감전순이익, - 법인세비용 = 당기순이익. 경영성과를 단계별로 표시합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 손익계산서의 구조와 매출총이익, 영업이익, 당기순이익의 계산 과정을 설명해주세요.'
  },
  {
    id: 39,
    topic: '재무제표 기초',
    question: '현금흐름표의 3가지 활동 구분을 설명하시오.',
    answer: '1) 영업활동 - 주된 수익창출활동으로 인한 현금흐름 2) 투자활동 - 유형자산 등 장기성 자산의 취득/처분 3) 재무활동 - 차입, 사채발행, 자본거래 등 자금조달활동.',
    prompt: 'FAT 1급 회계원리 문제입니다. 현금흐름표의 영업활동, 투자활동, 재무활동 현금흐름의 정의와 예시를 설명해주세요.'
  },
  {
    id: 40,
    topic: '재무제표 기초',
    question: '자본변동표에서 확인할 수 있는 정보를 설명하시오.',
    answer: '자본변동표는 자본금, 자본잉여금, 이익잉여금 등 자본 항목의 기초잔액, 증감 내역, 기말잔액을 표시합니다. 유상증자, 배당금 지급, 당기순이익 등 자본 변동 원인을 확인할 수 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 자본변동표의 구조, 표시 항목, 활용 방법을 설명해주세요.'
  },

  // 토픽 9: 회계순환 (5문항)
  {
    id: 41,
    topic: '회계순환',
    question: '회계순환과정의 단계를 순서대로 나열하시오.',
    answer: '1) 거래 발생 및 분석 2) 분개 3) 전기 4) 수정전시산표 작성 5) 결산정리분개 6) 수정후시산표 작성 7) 재무제표 작성 8) 장부마감 9) 이월시산표 작성. 이 과정이 매 회계기간 반복됩니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계순환과정의 각 단계를 순서대로 상세히 설명해주세요.'
  },
  {
    id: 42,
    topic: '회계순환',
    question: '장부마감의 의미와 절차를 설명하시오.',
    answer: '장부마감은 회계기간 종료 시 수익과 비용 계정을 마감하고 당기순손익을 이익잉여금으로 대체하는 절차입니다. 수익계정 마감 → 비용계정 마감 → 손익계정 마감 → 자산·부채·자본 이월 순으로 진행합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 장부마감의 의미, 마감분개 방법, 절차를 단계별로 설명해주세요.'
  },
  {
    id: 43,
    topic: '회계순환',
    question: '수익·비용 계정의 마감분개 방법을 설명하시오.',
    answer: '수익 마감: (차) 해당 수익계정 / (대) 손익. 비용 마감: (차) 손익 / (대) 해당 비용계정. 모든 수익과 비용을 손익계정으로 대체하여 당기순손익을 계산합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 수익과 비용 계정의 마감분개 방법을 구체적인 예시와 함께 설명해주세요.'
  },
  {
    id: 44,
    topic: '회계순환',
    question: '손익계정 마감과 이익잉여금 대체를 설명하시오.',
    answer: '손익계정 마감 시 수익 합계와 비용 합계의 차이(당기순이익 또는 당기순손실)를 이익잉여금으로 대체합니다. 당기순이익: (차) 손익 / (대) 이익잉여금. 당기순손실: (차) 이익잉여금 / (대) 손익.',
    prompt: 'FAT 1급 회계원리 문제입니다. 손익계정의 마감과 당기순이익(또는 손실)의 이익잉여금 대체 분개를 설명해주세요.'
  },
  {
    id: 45,
    topic: '회계순환',
    question: '이월시산표의 의미와 작성 목적을 설명하시오.',
    answer: '이월시산표는 장부마감 후 자산, 부채, 자본 계정의 기말잔액을 정리한 표입니다. 수익과 비용 계정은 마감되어 포함되지 않습니다. 다음 회계기간의 기초잔액이 되며, 재무상태표와 일치합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 이월시산표의 의미, 구성, 재무상태표와의 관계를 설명해주세요.'
  },

  // 토픽 10: 기타 회계원리 (5문항)
  {
    id: 46,
    topic: '기타 회계원리',
    question: '수익인식의 5단계 모형을 설명하시오.',
    answer: '1) 고객과의 계약 식별 2) 수행의무 식별 3) 거래가격 산정 4) 거래가격을 수행의무에 배분 5) 수행의무 이행 시 수익 인식. K-IFRS 1115호에 따른 수익인식 기준입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 수익인식의 5단계 모형을 각 단계별로 설명하고 실제 적용 사례를 들어주세요.'
  },
  {
    id: 47,
    topic: '기타 회계원리',
    question: '재고자산의 평가방법 3가지를 설명하시오.',
    answer: '1) 선입선출법(FIFO) - 먼저 매입한 것부터 판매 가정 2) 이동평균법 - 매입 시마다 평균단가 계산 3) 총평균법 - 기간 전체의 평균단가 사용. 각 방법에 따라 매출원가와 기말재고 금액이 달라집니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 재고자산 평가방법(선입선출법, 이동평균법, 총평균법)의 특징과 장단점을 비교 설명해주세요.'
  },
  {
    id: 48,
    topic: '기타 회계원리',
    question: '회계오류 수정 방법을 설명하시오.',
    answer: '당기 발견 당기 오류: 정정분개로 수정. 당기 발견 전기 오류: 중요하지 않으면 당기손익 수정, 중요하면 이익잉여금 수정(소급법). 분개장과 원장에 정정 사항을 명확히 기재합니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 회계오류의 유형과 발견 시기별 수정 방법을 구체적으로 설명해주세요.'
  },
  {
    id: 49,
    topic: '기타 회계원리',
    question: '보조부와 주요부의 구분을 설명하시오.',
    answer: '주요부(주요장부): 분개장과 원장(총계정원장)으로 모든 거래가 기록되는 필수 장부입니다. 보조부(보조장부): 현금출납장, 매출장, 매입장 등 특정 거래의 상세 내역을 기록하는 보조적 장부입니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 주요부와 보조부의 종류, 역할, 상호 관계를 설명해주세요.'
  },
  {
    id: 50,
    topic: '기타 회계원리',
    question: '정규 회계장부의 종류와 보존기간을 설명하시오.',
    answer: '회계장부: 분개장, 원장, 현금출납장 등(10년 보존). 재무제표: 재무상태표, 손익계산서 등(10년 보존). 증빙서류: 영수증, 세금계산서 등(5년 보존). 상법 및 법인세법에 따른 보존의무가 있습니다.',
    prompt: 'FAT 1급 회계원리 문제입니다. 정규 회계장부의 종류, 법적 보존기간, 중요성을 설명해주세요.'
  }
];

const topics = ['회계의 기초', '복식부기', '계정과목', '분개', '전기', '시산표', '결산정리', '재무제표 기초', '회계순환', '기타 회계원리'];

export default function FAT1AccountingPrincipleStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const STORAGE_KEY = 'fat-1-accounting-principle-progress';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-1" className="text-gray-500 hover:text-gray-700">FAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">회계원리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📊</span> 학습 진행률
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-bold text-emerald-600">{totalProgress}/50</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all"
                    style={{ width: `${(totalProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 토픽 선택
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-emerald-100 text-emerald-700 font-medium'
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
                          ? 'bg-emerald-100 text-emerald-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{completed}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
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
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">회계원리 학습</h1>
              <p className="text-emerald-100">
                {selectedTopic ? `${selectedTopic} - ${filteredQuestions.length}문항` : '전체 50문항'}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
              {/* Question Header */}
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
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
                  <div className="bg-emerald-50 rounded-lg p-5 mb-6 border border-emerald-200">
                    <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                      <span>💡</span> 모범답안
                    </h3>
                    <p className="text-emerald-700 leading-relaxed whitespace-pre-line">{currentQ.answer}</p>
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
                        className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
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
            <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100">
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
                        ? 'bg-emerald-600 text-white'
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
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-1">한국공인회계사회 AT자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
