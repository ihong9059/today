'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TAT1FinancialAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial-statements']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat1-financial-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tat1-financial-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 재무제표의 이해 (1-5)
    { id: 1, topic: 'financial-statements', question: '재무상태표의 구조와 구성요소를 설명하시오.', answer: '자산 = 부채 + 자본, 유동/비유동 분류', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재무상태표의 구조와 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 2, topic: 'financial-statements', question: '손익계산서의 구조와 영업이익 산출방법을 설명하시오.', answer: '매출액 - 매출원가 - 판관비 = 영업이익', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 손익계산서의 구조와 영업이익 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 3, topic: 'financial-statements', question: '현금흐름표의 3가지 활동별 분류를 설명하시오.', answer: '영업활동, 투자활동, 재무활동 현금흐름', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 현금흐름표의 3가지 활동별 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 4, topic: 'financial-statements', question: '자본변동표의 작성 목적과 구성항목을 설명하시오.', answer: '자본 각 항목의 변동내역 표시', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 자본변동표의 작성 목적과 구성항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 5, topic: 'financial-statements', question: '재무제표 간의 상호관계를 설명하시오.', answer: '당기순이익이 이익잉여금과 현금흐름에 연결', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재무제표 간의 상호관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 유동자산 회계 (6-10)
    { id: 6, topic: 'current-assets', question: '현금및현금성자산의 범위와 회계처리를 설명하시오.', answer: '현금, 요구불예금, 3개월 내 만기 금융상품', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 현금및현금성자산의 범위와 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 7, topic: 'current-assets', question: '매출채권의 인식과 대손충당금 설정방법을 설명하시오.', answer: '외상매출금, 받을어음 / 대손예상액 충당금 설정', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 매출채권의 인식과 대손충당금 설정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 8, topic: 'current-assets', question: '재고자산의 취득원가 결정과 평가방법을 설명하시오.', answer: '매입원가+부대비용, 선입선출법/평균법 등', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재고자산의 취득원가 결정과 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 9, topic: 'current-assets', question: '재고자산 저가법 평가와 평가손실 처리를 설명하시오.', answer: '취득원가와 순실현가능가치 중 낮은 금액 적용', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재고자산 저가법 평가와 평가손실 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 10, topic: 'current-assets', question: '선급금, 선급비용, 미수금의 차이를 설명하시오.', answer: '선급금: 재화대가 선지급 / 선급비용: 기간비용 선지급', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 선급금, 선급비용, 미수금의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 비유동자산 회계 (11-15)
    { id: 11, topic: 'non-current-assets', question: '유형자산의 취득원가 결정방법을 설명하시오.', answer: '구입가격+취득부대비용+설치비용', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 유형자산의 취득원가 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 12, topic: 'non-current-assets', question: '감가상각 방법(정액법, 정률법)의 계산과 비교를 설명하시오.', answer: '정액법: 균등상각 / 정률법: 체감상각', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 감가상각 방법(정액법, 정률법)의 계산과 비교를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 13, topic: 'non-current-assets', question: '무형자산의 정의와 상각방법을 설명하시오.', answer: '물리적 실체 없는 식별가능 자산, 내용연수 상각', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 무형자산의 정의와 상각방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 14, topic: 'non-current-assets', question: '자본적 지출과 수익적 지출의 구분기준을 설명하시오.', answer: '자산가치 증가 vs 현상유지 비용', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 자본적 지출과 수익적 지출의 구분기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 15, topic: 'non-current-assets', question: '유형자산 처분손익의 계산과 회계처리를 설명하시오.', answer: '처분대가 - 장부가액 = 처분손익', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 유형자산 처분손익의 계산과 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 부채 회계 (16-20)
    { id: 16, topic: 'liabilities', question: '유동부채의 종류와 분류기준을 설명하시오.', answer: '1년 내 상환의무: 매입채무, 단기차입금 등', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 유동부채의 종류와 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 17, topic: 'liabilities', question: '비유동부채의 종류와 유동성대체를 설명하시오.', answer: '장기차입금, 사채 / 1년내 만기시 유동부채 대체', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 비유동부채의 종류와 유동성대체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 18, topic: 'liabilities', question: '충당부채의 인식요건과 종류를 설명하시오.', answer: '현재의무, 자원유출가능성, 신뢰성있는 추정', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 충당부채의 인식요건과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 19, topic: 'liabilities', question: '사채의 발행(할인, 할증)과 이자비용 처리를 설명하시오.', answer: '할인발행: 사채할인발행차금 상각 / 할증발행: 할증액 상각', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 사채의 발행(할인, 할증)과 이자비용 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 20, topic: 'liabilities', question: '퇴직급여충당부채의 설정과 지급 처리를 설명하시오.', answer: '퇴직급여 추계액 충당금 설정, 지급시 상계', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 퇴직급여충당부채의 설정과 지급 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 자본 회계 (21-25)
    { id: 21, topic: 'equity', question: '자본금의 구성과 주식발행 회계처리를 설명하시오.', answer: '보통주자본금, 우선주자본금 / 액면초과액은 주발초', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 자본금의 구성과 주식발행 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 22, topic: 'equity', question: '자본잉여금의 종류와 사용제한을 설명하시오.', answer: '주식발행초과금, 감자차익 / 자본전입만 가능', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 자본잉여금의 종류와 사용제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 23, topic: 'equity', question: '이익잉여금의 구성과 처분절차를 설명하시오.', answer: '법정적립금, 임의적립금, 미처분이익잉여금', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 이익잉여금의 구성과 처분절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 24, topic: 'equity', question: '현금배당과 주식배당의 회계처리 차이를 설명하시오.', answer: '현금배당: 현금유출 / 주식배당: 자본내 대체', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 현금배당과 주식배당의 회계처리 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 25, topic: 'equity', question: '자기주식의 취득과 처분 회계처리를 설명하시오.', answer: '자기주식: 자본차감 / 처분이익은 자본잉여금', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 자기주식의 취득과 처분 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 수익 인식 (26-30)
    { id: 26, topic: 'revenue', question: '수익인식의 5단계 모형을 설명하시오.', answer: '계약식별-수행의무식별-거래가격산정-배분-인식', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 수익인식의 5단계 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 27, topic: 'revenue', question: '재화 판매 수익의 인식시점과 조건을 설명하시오.', answer: '통제 이전시점, 소유권 위험과 보상 이전', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재화 판매 수익의 인식시점과 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 28, topic: 'revenue', question: '용역 제공 수익의 진행기준 적용을 설명하시오.', answer: '진행률에 따라 수익과 비용 인식', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 용역 제공 수익의 진행기준 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 29, topic: 'revenue', question: '매출액과 매출에누리, 매출환입의 처리를 설명하시오.', answer: '매출에누리, 환입은 매출액에서 차감', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 매출액과 매출에누리, 매출환입의 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 30, topic: 'revenue', question: '영업수익과 영업외수익의 구분을 설명하시오.', answer: '주된 영업활동 수익 vs 부수적 수익', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 영업수익과 영업외수익의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 비용 인식 (31-35)
    { id: 31, topic: 'expense', question: '매출원가의 계산방법과 회계처리를 설명하시오.', answer: '기초재고+당기매입-기말재고=매출원가', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 매출원가의 계산방법과 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 32, topic: 'expense', question: '판매비와관리비의 주요 계정과목을 설명하시오.', answer: '급여, 복리후생비, 임차료, 감가상각비 등', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 판매비와관리비의 주요 계정과목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 33, topic: 'expense', question: '영업외비용의 종류와 회계처리를 설명하시오.', answer: '이자비용, 외환차손, 유형자산처분손실 등', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 영업외비용의 종류와 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 34, topic: 'expense', question: '발생주의와 수익비용대응의 원칙을 설명하시오.', answer: '현금흐름과 무관하게 경제적 사건 발생시 인식', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 발생주의와 수익비용대응의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 35, topic: 'expense', question: '기간비용과 제품원가의 구분을 설명하시오.', answer: '기간비용: 즉시 비용 / 제품원가: 재고자산 경유', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 기간비용과 제품원가의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 결산 절차 (36-40)
    { id: 36, topic: 'closing', question: '결산정리분개의 종류와 필요성을 설명하시오.', answer: '수정분개, 평가분개, 상각분개 등', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 결산정리분개의 종류와 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 37, topic: 'closing', question: '마감분개의 절차와 손익계정 대체를 설명하시오.', answer: '수익/비용 계정을 손익계정으로 마감', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 마감분개의 절차와 손익계정 대체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 38, topic: 'closing', question: '감가상각비 결산정리분개를 설명하시오.', answer: '(차) 감가상각비 (대) 감가상각누계액', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 감가상각비 결산정리분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 39, topic: 'closing', question: '대손상각비 결산정리분개를 설명하시오.', answer: '(차) 대손상각비 (대) 대손충당금', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 대손상각비 결산정리분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 40, topic: 'closing', question: '선급비용, 미지급비용의 결산정리분개를 설명하시오.', answer: '경과계정 조정으로 발생주의 적용', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 선급비용, 미지급비용의 결산정리분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 재무제표 분석 (41-45)
    { id: 41, topic: 'analysis', question: '유동비율과 당좌비율의 계산과 의미를 설명하시오.', answer: '유동자산/유동부채, 당좌자산/유동부채', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 유동비율과 당좌비율의 계산과 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 42, topic: 'analysis', question: '부채비율과 자기자본비율의 계산을 설명하시오.', answer: '부채/자본 x 100, 자본/총자산 x 100', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 부채비율과 자기자본비율의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 43, topic: 'analysis', question: 'ROA와 ROE의 계산과 분석을 설명하시오.', answer: '당기순이익/총자산, 당기순이익/자기자본', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: ROA와 ROE의 계산과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 44, topic: 'analysis', question: '매출총이익률과 영업이익률의 분석을 설명하시오.', answer: '매출총이익/매출액, 영업이익/매출액', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 매출총이익률과 영업이익률의 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 45, topic: 'analysis', question: '재고자산회전율과 매출채권회전율을 설명하시오.', answer: '매출원가/평균재고, 매출액/평균매출채권', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 재고자산회전율과 매출채권회전율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },

    // 연결재무제표 (46-50)
    { id: 46, topic: 'consolidated', question: '연결재무제표의 작성목적과 대상을 설명하시오.', answer: '지배기업과 종속기업을 하나의 경제적 실체로 표시', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 연결재무제표의 작성목적과 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 47, topic: 'consolidated', question: '종속기업의 정의와 지배력 판단기준을 설명하시오.', answer: '의결권 과반수 소유, 실질적 지배력 보유', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 종속기업의 정의와 지배력 판단기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 48, topic: 'consolidated', question: '연결범위와 연결제외 사유를 설명하시오.', answer: '모든 종속기업 연결, 중요성 낮으면 제외 가능', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 연결범위와 연결제외 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 49, topic: 'consolidated', question: '내부거래 제거와 미실현손익 조정을 설명하시오.', answer: '연결실체 내 거래와 채권채무 상계제거', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 내부거래 제거와 미실현손익 조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
    { id: 50, topic: 'consolidated', question: '비지배지분의 인식과 표시방법을 설명하시오.', answer: '종속기업 순자산 중 지배기업 외 지분', prompt: 'TAT 1급 재무회계 문제입니다.\n\n문제: 비지배지분의 인식과 표시방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 관련 규정\n5. 실무 적용' },
  ];

  const topics = [
    { id: 'financial-statements', name: '재무제표의 이해', icon: '📑', count: 5 },
    { id: 'current-assets', name: '유동자산 회계', icon: '💵', count: 5 },
    { id: 'non-current-assets', name: '비유동자산 회계', icon: '🏢', count: 5 },
    { id: 'liabilities', name: '부채 회계', icon: '📋', count: 5 },
    { id: 'equity', name: '자본 회계', icon: '🏛️', count: 5 },
    { id: 'revenue', name: '수익 인식', icon: '💰', count: 5 },
    { id: 'expense', name: '비용 인식', icon: '📊', count: 5 },
    { id: 'closing', name: '결산 절차', icon: '📝', count: 5 },
    { id: 'analysis', name: '재무제표 분석', icon: '📈', count: 5 },
    { id: 'consolidated', name: '연결재무제표', icon: '🔗', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-1" className="text-gray-500 hover:text-gray-700">TAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">재무회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-rose-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">재무회계</h1>
              <p className="text-rose-100">재무제표 작성, 자산·부채·자본·수익·비용 회계처리</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-rose-100 border-2 border-rose-300'
                    : 'bg-white border border-gray-200 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-rose-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-rose-500 border-rose-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition flex-shrink-0"
                            >
                              AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/tat-1" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← TAT 1급 메인
          </Link>
          <Link href="/category/accounting/tat-1/study/cost-accounting" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
            원가관리회계 →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. TAT 1급 재무회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
