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
  // 1. 회계의 기초개념 (5문항)
  {
    id: 1,
    topic: '회계의 기초개념',
    question: '회계(Accounting)의 정의와 목적을 설명해주세요.',
    answer: '회계는 기업의 경제적 활동을 기록, 분류, 요약하여 정보이용자에게 유용한 재무정보를 제공하는 과정입니다. 목적은 의사결정에 유용한 정보를 제공하는 것입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 회계(Accounting)의 정의와 목적을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 2,
    topic: '회계의 기초개념',
    question: '회계정보이용자는 크게 내부이용자와 외부이용자로 구분됩니다. 각각의 예시를 들어주세요.',
    answer: '내부이용자는 경영자, 관리자 등 기업 내부에서 의사결정을 하는 자이고, 외부이용자는 투자자, 채권자, 정부기관, 거래처 등 기업 외부에서 정보를 이용하는 자입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 회계정보이용자는 크게 내부이용자와 외부이용자로 구분됩니다. 각각의 예시를 들어주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 3,
    topic: '회계의 기초개념',
    question: '회계의 기본원리인 "복식부기"란 무엇인가요?',
    answer: '복식부기는 모든 거래를 차변과 대변에 동시에 기록하는 방법으로, 차변 합계와 대변 합계가 항상 일치하는 대차균형의 원리를 가집니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 회계의 기본원리인 "복식부기"란 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 4,
    topic: '회계의 기초개념',
    question: '"회계기간"이란 무엇이며, 일반적으로 어떻게 설정되나요?',
    answer: '회계기간은 재무제표를 작성하는 기간의 단위로, 일반적으로 1년(1월 1일~12월 31일)을 회계연도로 설정합니다. 정기 결산을 통해 경영성과를 파악합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: "회계기간"이란 무엇이며, 일반적으로 어떻게 설정되나요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 5,
    topic: '회계의 기초개념',
    question: '회계등식 "자산 = 부채 + 자본"의 의미를 설명해주세요.',
    answer: '회계등식은 기업이 보유한 자산의 원천을 나타냅니다. 자산은 부채(타인자본)와 자본(자기자본)의 합으로 조달되며, 이 등식은 항상 균형을 이루어야 합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 회계등식 "자산 = 부채 + 자본"의 의미를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 2. 재무제표의 구조 (5문항)
  {
    id: 6,
    topic: '재무제표의 구조',
    question: '재무상태표(Statement of Financial Position)의 구성요소와 작성 목적은 무엇인가요?',
    answer: '재무상태표는 특정 시점의 재무상태를 나타내며, 자산, 부채, 자본으로 구성됩니다. 기업의 재정 건전성과 유동성을 파악하는 데 활용됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 재무상태표(Statement of Financial Position)의 구성요소와 작성 목적은 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 7,
    topic: '재무제표의 구조',
    question: '손익계산서(Income Statement)의 구성요소와 작성 목적은 무엇인가요?',
    answer: '손익계산서는 일정 기간의 경영성과를 나타내며, 수익에서 비용을 차감하여 당기순이익(손실)을 계산합니다. 기업의 수익성을 평가하는 데 사용됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 손익계산서(Income Statement)의 구성요소와 작성 목적은 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 8,
    topic: '재무제표의 구조',
    question: '재무상태표에서 "유동"과 "비유동"의 구분 기준은 무엇인가요?',
    answer: '1년(또는 정상영업주기) 내에 현금화되거나 결제될 것이 예상되면 유동, 그 이상이면 비유동으로 분류합니다. 유동자산, 비유동자산, 유동부채, 비유동부채로 구분합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 재무상태표에서 "유동"과 "비유동"의 구분 기준은 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 9,
    topic: '재무제표의 구조',
    question: '손익계산서에서 "매출총이익", "영업이익", "당기순이익"의 관계를 설명해주세요.',
    answer: '매출총이익 = 매출액 - 매출원가, 영업이익 = 매출총이익 - 판매비와관리비, 당기순이익 = 영업이익 + 영업외수익 - 영업외비용 - 법인세비용으로 계산됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 손익계산서에서 "매출총이익", "영업이익", "당기순이익"의 관계를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 10,
    topic: '재무제표의 구조',
    question: '재무상태표와 손익계산서의 연결고리인 "당기순이익"의 흐름을 설명해주세요.',
    answer: '손익계산서에서 산출된 당기순이익은 재무상태표의 자본(이익잉여금)에 반영됩니다. 당기순이익이 증가하면 자본이 증가하고, 손실이 발생하면 자본이 감소합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 재무상태표와 손익계산서의 연결고리인 "당기순이익"의 흐름을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 3. 계정과목의 이해 (5문항)
  {
    id: 11,
    topic: '계정과목의 이해',
    question: '자산 계정과목의 종류와 예시를 들어주세요.',
    answer: '자산은 유동자산(현금, 매출채권, 재고자산 등)과 비유동자산(토지, 건물, 기계장치, 투자자산 등)으로 구분됩니다. 자산은 기업이 보유한 경제적 자원입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 자산 계정과목의 종류와 예시를 들어주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 12,
    topic: '계정과목의 이해',
    question: '부채 계정과목의 종류와 예시를 들어주세요.',
    answer: '부채는 유동부채(매입채무, 단기차입금, 미지급금 등)와 비유동부채(장기차입금, 사채, 퇴직급여충당부채 등)로 구분됩니다. 부채는 기업의 경제적 의무입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 부채 계정과목의 종류와 예시를 들어주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 13,
    topic: '계정과목의 이해',
    question: '자본 계정과목의 구성요소를 설명해주세요.',
    answer: '자본은 자본금(주주가 출자한 금액), 자본잉여금(주식발행초과금 등), 이익잉여금(당기순이익 누적액), 기타포괄손익누계액 등으로 구성됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 자본 계정과목의 구성요소를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 14,
    topic: '계정과목의 이해',
    question: '수익 계정과목의 종류와 예시를 들어주세요.',
    answer: '수익은 영업수익(매출액, 용역수익)과 영업외수익(이자수익, 배당금수익, 유형자산처분이익 등)으로 구분됩니다. 수익은 자본을 증가시킵니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 수익 계정과목의 종류와 예시를 들어주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 15,
    topic: '계정과목의 이해',
    question: '비용 계정과목의 종류와 예시를 들어주세요.',
    answer: '비용은 매출원가, 판매비와관리비(급여, 임차료, 감가상각비 등), 영업외비용(이자비용, 유형자산처분손실 등)으로 구분됩니다. 비용은 자본을 감소시킵니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 비용 계정과목의 종류와 예시를 들어주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 4. 분개와 전기 (5문항)
  {
    id: 16,
    topic: '분개와 전기',
    question: '거래의 8요소란 무엇인가요?',
    answer: '거래의 8요소는 자산의 증가/감소, 부채의 증가/감소, 자본의 증가/감소, 수익의 발생, 비용의 발생입니다. 모든 거래는 이 8요소의 조합으로 분개됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 거래의 8요소란 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 17,
    topic: '분개와 전기',
    question: '분개(Journal Entry)란 무엇이며, 기본 원칙을 설명해주세요.',
    answer: '분개는 거래를 차변과 대변으로 나누어 기록하는 것입니다. 차변(왼쪽)에는 자산증가, 부채감소, 자본감소, 비용발생을, 대변(오른쪽)에는 그 반대를 기록합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 분개(Journal Entry)란 무엇이며, 기본 원칙을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 18,
    topic: '분개와 전기',
    question: '현금 100만원을 은행에서 차입한 경우의 분개는?',
    answer: '(차) 현금 1,000,000 / (대) 단기차입금 1,000,000으로 분개합니다. 현금(자산) 증가는 차변, 차입금(부채) 증가는 대변에 기록합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 현금 100만원을 은행에서 차입한 경우의 분개는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 19,
    topic: '분개와 전기',
    question: '상품을 외상으로 매출하고 세금계산서를 발행한 경우의 분개는? (공급가액 100만원)',
    answer: '(차) 외상매출금 1,100,000 / (대) 매출 1,000,000, 부가세예수금 100,000으로 분개합니다. 부가가치세 10%를 포함하여 기록합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 상품을 외상으로 매출하고 세금계산서를 발행한 경우의 분개는? (공급가액 100만원)\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 20,
    topic: '분개와 전기',
    question: '전기(Posting)란 무엇이며, 분개와의 관계를 설명해주세요.',
    answer: '전기는 분개장에 기록된 내용을 각 계정과목별로 총계정원장에 옮겨 기록하는 과정입니다. 분개 → 전기 → 시산표 작성 순서로 회계처리가 진행됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 전기(Posting)란 무엇이며, 분개와의 관계를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 5. 유동자산 회계 (5문항)
  {
    id: 21,
    topic: '유동자산 회계',
    question: '현금및현금성자산의 범위와 관리 방법을 설명해주세요.',
    answer: '현금및현금성자산은 현금, 보통예금, 당좌예금, 3개월 이내 만기 금융상품 등을 포함합니다. 매일 현금출납장에 기록하고 실제 잔액과 대조합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 현금및현금성자산의 범위와 관리 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 22,
    topic: '유동자산 회계',
    question: '매출채권(외상매출금, 받을어음)의 회계처리 방법을 설명해주세요.',
    answer: '매출채권은 상품 판매 시 대변 매출과 함께 차변에 기록되며, 대금 회수 시 차변 현금/대변 매출채권으로 처리합니다. 기말에 대손충당금을 설정합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 매출채권(외상매출금, 받을어음)의 회계처리 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 23,
    topic: '유동자산 회계',
    question: '재고자산의 종류와 기초적인 회계처리 방법은?',
    answer: '재고자산은 상품, 제품, 재공품, 원재료 등을 포함합니다. 매입 시 차변에 기록하고, 기말에 실사를 통해 재고를 확정하여 매출원가를 계산합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 재고자산의 종류와 기초적인 회계처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 24,
    topic: '유동자산 회계',
    question: '선급금과 선급비용의 차이점을 설명해주세요.',
    answer: '선급금은 상품/서비스 구입 전 미리 지급한 금액이고, 선급비용은 차기에 비용화될 금액을 미리 지급한 것입니다. 예: 선급금(상품 계약금), 선급비용(선급보험료).',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 선급금과 선급비용의 차이점을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 25,
    topic: '유동자산 회계',
    question: '대손충당금이란 무엇이며, 왜 설정하나요?',
    answer: '대손충당금은 매출채권의 회수불능 예상액을 미리 차감하는 평가계정입니다. 보수주의 원칙에 따라 예상 손실을 미리 인식하여 자산을 적정하게 평가합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 대손충당금이란 무엇이며, 왜 설정하나요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 6. 비유동자산 회계 (5문항)
  {
    id: 26,
    topic: '비유동자산 회계',
    question: '유형자산의 종류와 취득원가 산정 방법을 설명해주세요.',
    answer: '유형자산은 토지, 건물, 기계장치, 차량운반구, 비품 등이 있습니다. 취득원가는 구입가격에 취득세, 운송비, 설치비 등 부대비용을 합산하여 산정합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 유형자산의 종류와 취득원가 산정 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 27,
    topic: '비유동자산 회계',
    question: '감가상각이란 무엇이며, 왜 필요한가요?',
    answer: '감가상각은 유형자산의 취득원가를 내용연수에 걸쳐 체계적으로 비용화하는 과정입니다. 자산의 경제적 효익이 소비되는 것을 반영하여 적정한 기간손익을 계산합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 감가상각이란 무엇이며, 왜 필요한가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 28,
    topic: '비유동자산 회계',
    question: '정액법에 의한 감가상각비 계산 방법과 분개를 설명해주세요.',
    answer: '정액법: (취득원가 - 잔존가치) / 내용연수. 분개: (차) 감가상각비 / (대) 감가상각누계액. 매년 동일한 금액을 비용으로 인식합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 정액법에 의한 감가상각비 계산 방법과 분개를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 29,
    topic: '비유동자산 회계',
    question: '무형자산의 종류와 상각 방법을 설명해주세요.',
    answer: '무형자산은 영업권, 특허권, 상표권, 소프트웨어 등 물리적 실체가 없는 자산입니다. 내용연수에 걸쳐 정액법으로 상각하거나 비한정 내용연수의 경우 손상검사를 합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 무형자산의 종류와 상각 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 30,
    topic: '비유동자산 회계',
    question: '유형자산을 처분했을 때의 회계처리 방법을 설명해주세요.',
    answer: '처분 시 자산 장부금액(취득원가 - 감가상각누계액)과 처분가액을 비교하여 차익 또는 차손을 인식합니다. (차) 현금, 감가상각누계액 / (대) 유형자산, 처분이익(또는 처분손실)',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 유형자산을 처분했을 때의 회계처리 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 7. 부채 회계 (5문항)
  {
    id: 31,
    topic: '부채 회계',
    question: '유동부채의 종류와 특징을 설명해주세요.',
    answer: '유동부채는 1년 내 결제될 채무로, 매입채무(외상매입금, 지급어음), 단기차입금, 미지급금, 미지급비용, 선수금, 예수금 등이 있습니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 유동부채의 종류와 특징을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 32,
    topic: '부채 회계',
    question: '매입채무(외상매입금, 지급어음)의 회계처리 방법을 설명해주세요.',
    answer: '상품 매입 시 (차) 상품(또는 매입) / (대) 외상매입금으로 기록하고, 대금 지급 시 (차) 외상매입금 / (대) 현금으로 처리합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 매입채무(외상매입금, 지급어음)의 회계처리 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 33,
    topic: '부채 회계',
    question: '미지급금과 미지급비용의 차이점을 설명해주세요.',
    answer: '미지급금은 비영업 거래(비품 구입 등)에서 발생한 채무이고, 미지급비용은 이미 발생했으나 아직 지급하지 않은 비용(미지급이자, 미지급급여 등)입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 미지급금과 미지급비용의 차이점을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 34,
    topic: '부채 회계',
    question: '비유동부채의 종류와 특징을 설명해주세요.',
    answer: '비유동부채는 1년 이후에 결제될 채무로, 장기차입금, 사채, 퇴직급여충당부채, 이연법인세부채 등이 있습니다. 장기적인 자금조달 수단입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 비유동부채의 종류와 특징을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 35,
    topic: '부채 회계',
    question: '선수금과 예수금의 차이점을 설명해주세요.',
    answer: '선수금은 상품/서비스 제공 전 미리 받은 대금(계약금 등)이고, 예수금은 제3자에게 지급할 금액을 일시적으로 보관하는 것(원천징수세금, 4대보험료 등)입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 선수금과 예수금의 차이점을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 8. 자본 회계 (5문항)
  {
    id: 36,
    topic: '자본 회계',
    question: '자본금이란 무엇이며, 어떻게 산정되나요?',
    answer: '자본금은 주주가 출자한 금액으로, 액면금액 x 발행주식수로 계산됩니다. 주식회사 설립 시 또는 유상증자 시 증가합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 자본금이란 무엇이며, 어떻게 산정되나요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 37,
    topic: '자본 회계',
    question: '주식발행초과금이란 무엇인가요?',
    answer: '주식발행초과금은 주식을 액면금액보다 높은 가격(할증발행)으로 발행했을 때 초과분입니다. 자본잉여금으로 분류되며, 배당에 사용할 수 없습니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 주식발행초과금이란 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 38,
    topic: '자본 회계',
    question: '이익잉여금의 종류와 역할을 설명해주세요.',
    answer: '이익잉여금은 이익준비금(법정적립금), 임의적립금, 미처분이익잉여금으로 구분됩니다. 당기순이익의 누적액으로 배당 재원이 되며, 사내 유보 자금입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 이익잉여금의 종류와 역할을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 39,
    topic: '자본 회계',
    question: '배당금 지급 시의 회계처리를 설명해주세요.',
    answer: '배당 결의 시: (차) 이익잉여금 / (대) 미지급배당금, 지급 시: (차) 미지급배당금 / (대) 현금. 배당금은 이익잉여금에서 차감됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 배당금 지급 시의 회계처리를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 40,
    topic: '자본 회계',
    question: '개인기업과 법인기업의 자본 회계 차이점은?',
    answer: '개인기업은 자본금, 인출금 계정을 사용하고, 법인기업은 자본금, 자본잉여금, 이익잉여금 등으로 세분화됩니다. 법인은 주주에 대한 책임이 명확히 구분됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 개인기업과 법인기업의 자본 회계 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 9. 결산 기초 (5문항)
  {
    id: 41,
    topic: '결산 기초',
    question: '결산이란 무엇이며, 그 목적은 무엇인가요?',
    answer: '결산은 회계기간 말에 장부를 마감하고 재무제표를 작성하는 과정입니다. 목적은 일정 기간의 경영성과와 특정 시점의 재무상태를 파악하는 것입니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 결산이란 무엇이며, 그 목적은 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 42,
    topic: '결산 기초',
    question: '결산정리사항(수정분개가 필요한 항목)의 종류를 설명해주세요.',
    answer: '결산정리사항은 감가상각비 계상, 대손충당금 설정, 재고자산 평가, 선급/미지급 비용 정리, 선수/미수 수익 정리, 소모품 정리 등이 있습니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 결산정리사항(수정분개가 필요한 항목)의 종류를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 43,
    topic: '결산 기초',
    question: '발생주의와 현금주의의 차이를 결산과 관련하여 설명해주세요.',
    answer: '발생주의는 현금 수수와 관계없이 수익/비용을 인식하고, 현금주의는 현금 수수 시점에 인식합니다. 결산 시 발생주의에 따라 미수/미지급, 선수/선급 항목을 조정합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 발생주의와 현금주의의 차이를 결산과 관련하여 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 44,
    topic: '결산 기초',
    question: '기말 재고자산 확정 후 매출원가 계산 방법을 설명해주세요.',
    answer: '매출원가 = 기초재고 + 당기매입 - 기말재고. 기말재고실사를 통해 수량을 확정하고, 단가를 적용하여 금액을 산출한 후 매출원가를 계산합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 기말 재고자산 확정 후 매출원가 계산 방법을 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 45,
    topic: '결산 기초',
    question: '결산 절차의 순서를 설명해주세요.',
    answer: '결산 절차: 수정전시산표 작성 → 결산정리분개 → 수정후시산표 작성 → 손익계정 대체 → 재무제표 작성 → 장부 마감 순서로 진행됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 결산 절차의 순서를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },

  // 10. 시산표와 정산표 (5문항)
  {
    id: 46,
    topic: '시산표와 정산표',
    question: '시산표(Trial Balance)란 무엇이며, 작성 목적은?',
    answer: '시산표는 총계정원장의 각 계정 잔액을 모아 차변과 대변의 합계가 일치하는지 검증하는 표입니다. 대차균형 검증과 재무제표 작성의 기초 자료로 활용됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 시산표(Trial Balance)란 무엇이며, 작성 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 47,
    topic: '시산표와 정산표',
    question: '합계시산표, 잔액시산표, 합계잔액시산표의 차이점은?',
    answer: '합계시산표는 각 계정의 차변/대변 합계를, 잔액시산표는 각 계정의 잔액을, 합계잔액시산표는 합계와 잔액을 모두 표시합니다. 합계잔액시산표가 가장 많이 사용됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 합계시산표, 잔액시산표, 합계잔액시산표의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 48,
    topic: '시산표와 정산표',
    question: '시산표에서 대차가 불일치할 때 오류를 찾는 방법은?',
    answer: '불일치 금액 확인 → 전기 누락/중복 확인 → 분개 오류 확인 → 계산 오류 확인 순으로 점검합니다. 불일치 금액이 9의 배수면 자릿수 오류를 의심합니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 시산표에서 대차가 불일치할 때 오류를 찾는 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 49,
    topic: '시산표와 정산표',
    question: '정산표(Work Sheet)란 무엇이며, 어떤 항목들로 구성되나요?',
    answer: '정산표는 수정전시산표 → 수정분개 → 수정후시산표 → 손익계산서 → 재무상태표를 한 표에 정리한 것입니다. 결산 과정을 체계적으로 수행하는 데 도움이 됩니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 정산표(Work Sheet)란 무엇이며, 어떤 항목들로 구성되나요?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  },
  {
    id: 50,
    topic: '시산표와 정산표',
    question: '정산표에서 손익계산서란과 재무상태표란의 당기순이익 위치를 설명해주세요.',
    answer: '손익계산서란에서는 대변(수익) 합계가 차변(비용) 합계보다 크면 차변에 당기순이익을 기재하고, 재무상태표란에서는 대변에 동일 금액을 기재하여 균형을 맞춥니다.',
    prompt: 'TAT 2급 회계원리 문제입니다.\n\n문제: 정산표에서 손익계산서란과 재무상태표란의 당기순이익 위치를 설명해주세요.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분개 예시\n4. 실무 적용\n5. 연습문제'
  }
];

const topics = [
  '회계의 기초개념',
  '재무제표의 구조',
  '계정과목의 이해',
  '분개와 전기',
  '유동자산 회계',
  '비유동자산 회계',
  '부채 회계',
  '자본 회계',
  '결산 기초',
  '시산표와 정산표'
];

export default function TAT2AccountingPrinciplesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat2-accounting-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tat2-accounting-progress', JSON.stringify(progress));
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
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleTopicSelect = (topic: string | null) => {
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

  const totalProgress = Object.keys(progress).filter(k => progress[Number(k)]).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-2" className="text-gray-500 hover:text-gray-700">TAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">회계원리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              📊
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">회계원리</h1>
              <p className="text-gray-600">회계 기초, 재무제표, 계정과목, 분개 기초</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-violet-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-violet-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-violet-100">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-violet-100 text-violet-700 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>전체 문항</span>
                    <span className="text-sm text-gray-500">{totalProgress}/{questions.length}</span>
                  </div>
                </button>
                {topics.map((topic) => {
                  const { completed, total } = getTopicProgress(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleTopicSelect(topic)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedTopic === topic
                          ? 'bg-violet-100 text-violet-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-violet-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-violet-500' : 'bg-violet-400'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-violet-100">
                <li>- 회계등식(자산=부채+자본) 암기</li>
                <li>- 분개의 차변/대변 원리 이해</li>
                <li>- 계정과목별 잔액방향 숙지</li>
                <li>- 거래 유형별 분개 연습</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-violet-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-violet-200 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                        완료
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                    {currentQ.question}
                  </h2>

                  {/* Answer Section */}
                  {!showAnswer ? (
                    <button
                      onClick={handleShowAnswer}
                      className="w-full py-4 bg-violet-50 hover:bg-violet-100 text-violet-700 font-medium rounded-xl border-2 border-dashed border-violet-300 transition"
                    >
                      정답 보기
                    </button>
                  ) : (
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-violet-800">정답 해설</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{currentQ.answer}</p>
                    </div>
                  )}

                  {/* Navigation & AI Help */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        이전
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentQuestion === filteredQuestions.length - 1}
                        className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        다음
                      </button>
                    </div>
                    <button
                      onClick={handleAIHelp}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition"
                    >
                      <span>🤖</span>
                      <span>AI에게 질문</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question Navigator */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-violet-100">
              <h3 className="font-medium text-gray-900 mb-3">문항 네비게이터</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      idx === currentQuestion
                        ? 'bg-violet-600 text-white'
                        : progress[q.id]
                        ? 'bg-violet-100 text-violet-700 hover:bg-violet-200'
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
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline ml-1">한국공인회계사회</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
