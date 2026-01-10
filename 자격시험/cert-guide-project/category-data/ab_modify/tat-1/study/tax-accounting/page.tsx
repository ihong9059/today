'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TAT1TaxAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['vat-basic']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat1-tax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tat1-tax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 부가가치세 기초 (1-5)
    { id: 1, topic: 'vat-basic', question: '부가가치세의 과세대상을 설명하시오.', answer: '재화의 공급, 용역의 공급, 재화의 수입', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세의 과세대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 2, topic: 'vat-basic', question: '부가가치세 납세의무자의 범위를 설명하시오.', answer: '사업자(영리/비영리), 재화 수입자', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 납세의무자의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 3, topic: 'vat-basic', question: '부가가치세 과세기간과 신고기한을 설명하시오.', answer: '1기(1~6월), 2기(7~12월), 각 25일 이내 신고', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 과세기간과 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 4, topic: 'vat-basic', question: '영세율과 면세의 차이를 설명하시오.', answer: '영세율: 매입세액 공제 가능, 면세: 공제 불가', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 영세율과 면세의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 5, topic: 'vat-basic', question: '간이과세자의 적용 요건을 설명하시오.', answer: '연 매출액 8,000만원 미만 개인사업자', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 간이과세자의 적용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 부가가치세 계산 (6-10)
    { id: 6, topic: 'vat-calc', question: '매출세액의 계산 방법을 설명하시오.', answer: '공급가액 x 10% (세금계산서 기재)', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 매출세액의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 7, topic: 'vat-calc', question: '매입세액 공제 요건과 불공제 항목을 설명하시오.', answer: '사업관련 매입분 공제, 비영업용소형차 불공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 매입세액 공제 요건과 불공제 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 8, topic: 'vat-calc', question: '납부세액과 환급세액의 계산을 설명하시오.', answer: '매출세액 - 매입세액 = 납부(환급)세액', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 납부세액과 환급세액의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 9, topic: 'vat-calc', question: '의제매입세액공제를 설명하시오.', answer: '면세농산물 매입시 일정률 공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 의제매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 10, topic: 'vat-calc', question: '대손세액공제의 적용 요건을 설명하시오.', answer: '공급일로부터 5년 경과, 대손확정시 공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 대손세액공제의 적용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 세금계산서 (11-15)
    { id: 11, topic: 'tax-invoice', question: '세금계산서 발행의무자와 발행시기를 설명하시오.', answer: '재화/용역 공급자, 공급시기에 발행', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서 발행의무자와 발행시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 12, topic: 'tax-invoice', question: '수정세금계산서의 발급사유를 설명하시오.', answer: '착오, 환입, 계약해제, 내국신용장 사후개설', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 수정세금계산서의 발급사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 13, topic: 'tax-invoice', question: '전자세금계산서 의무발급 대상을 설명하시오.', answer: '법인사업자 및 직전연도 1억 이상 개인사업자', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 전자세금계산서 의무발급 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 14, topic: 'tax-invoice', question: '세금계산서 필수 기재사항을 설명하시오.', answer: '공급자/공급받는자 정보, 작성일자, 품목, 금액', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서 필수 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 15, topic: 'tax-invoice', question: '영수증 발급 대상 사업자를 설명하시오.', answer: '소매업, 음식점업, 숙박업 등 최종소비자 거래', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 영수증 발급 대상 사업자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 부가세 신고 (16-20)
    { id: 16, topic: 'vat-report', question: '부가가치세 확정신고 절차를 설명하시오.', answer: '과세기간 종료 후 25일 이내 신고납부', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 확정신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 17, topic: 'vat-report', question: '예정신고와 예정고지의 차이를 설명하시오.', answer: '예정신고: 자진신고, 예정고지: 세무서 고지', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 예정신고와 예정고지의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 18, topic: 'vat-report', question: '부가가치세 신고서 주요 항목을 설명하시오.', answer: '과세표준, 매출세액, 매입세액, 납부세액', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 신고서 주요 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 19, topic: 'vat-report', question: '조기환급 신고 대상을 설명하시오.', answer: '수출, 시설투자 등 매입세액 초과시', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 조기환급 신고 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 20, topic: 'vat-report', question: '부가가치세 신고 첨부서류를 설명하시오.', answer: '매출/매입처별세금계산서합계표, 신용카드매출전표 등', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 부가가치세 신고 첨부서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 소득세 기초 (21-25)
    { id: 21, topic: 'income-basic', question: '종합소득의 구성항목을 설명하시오.', answer: '이자, 배당, 사업, 근로, 연금, 기타소득', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 종합소득의 구성항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 22, topic: 'income-basic', question: '분류과세 소득의 종류를 설명하시오.', answer: '퇴직소득, 양도소득 (종합소득과 별도 과세)', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 분류과세 소득의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 23, topic: 'income-basic', question: '소득공제의 종류를 설명하시오.', answer: '인적공제, 연금보험료공제, 특별소득공제 등', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 소득공제의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 24, topic: 'income-basic', question: '종합소득세 세율 구조를 설명하시오.', answer: '6%~45% 8단계 초과누진세율', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 종합소득세 세율 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 25, topic: 'income-basic', question: '금융소득 종합과세 기준을 설명하시오.', answer: '이자+배당 연 2,000만원 초과시 종합과세', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 금융소득 종합과세 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 원천징수 (26-30)
    { id: 26, topic: 'withholding', question: '근로소득 원천징수 방법을 설명하시오.', answer: '간이세액표에 따라 매월 원천징수', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 근로소득 원천징수 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 27, topic: 'withholding', question: '사업소득 원천징수를 설명하시오.', answer: '의료/법률 등 전문직: 3%, 인적용역: 3.3%', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 사업소득 원천징수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 28, topic: 'withholding', question: '이자소득과 배당소득 원천징수를 설명하시오.', answer: '이자/배당소득 14% 원천징수', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 이자소득과 배당소득 원천징수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 29, topic: 'withholding', question: '원천징수 신고납부 기한을 설명하시오.', answer: '원천징수일이 속하는 달의 다음달 10일까지', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 원천징수 신고납부 기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 30, topic: 'withholding', question: '원천징수이행상황신고서 작성방법을 설명하시오.', answer: '소득종류별 인원, 총지급액, 원천징수세액 기재', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 원천징수이행상황신고서 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 연말정산 (31-35)
    { id: 31, topic: 'year-end', question: '인적공제의 종류와 요건을 설명하시오.', answer: '기본공제(본인,배우자,부양가족), 추가공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 인적공제의 종류와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 32, topic: 'year-end', question: '특별소득공제 항목을 설명하시오.', answer: '보험료, 주택자금, 기부금 공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 특별소득공제 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 33, topic: 'year-end', question: '세액공제의 종류를 설명하시오.', answer: '자녀세액공제, 연금계좌세액공제, 의료비/교육비 세액공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 세액공제의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 34, topic: 'year-end', question: '연말정산 일정과 절차를 설명하시오.', answer: '1월 급여 지급시 정산, 2월 10일까지 신고', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 연말정산 일정과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 35, topic: 'year-end', question: '근로소득 간이지급명세서 제출을 설명하시오.', answer: '매 반기 종료 후 익월 말일까지 제출', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 근로소득 간이지급명세서 제출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 법인세 기초 (36-40)
    { id: 36, topic: 'corporate-basic', question: '세무조정의 개념을 설명하시오.', answer: '기업회계와 세무회계의 차이 조정', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 세무조정의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 37, topic: 'corporate-basic', question: '익금과 익금불산입을 설명하시오.', answer: '익금: 순자산 증가, 익금불산입: 과세제외 항목', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 익금과 익금불산입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 38, topic: 'corporate-basic', question: '손금과 손금불산입을 설명하시오.', answer: '손금: 순자산 감소, 손금불산입: 비용부인 항목', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 손금과 손금불산입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 39, topic: 'corporate-basic', question: '접대비 손금한도액 계산을 설명하시오.', answer: '기본한도 + 수입금액별 한도 계산', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 접대비 손금한도액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 40, topic: 'corporate-basic', question: '법인세 세율 구조를 설명하시오.', answer: '과세표준 구간별 9%~24% 적용', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 법인세 세율 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 가산세 (41-45)
    { id: 41, topic: 'penalty', question: '신고불성실 가산세를 설명하시오.', answer: '무신고: 20%, 과소신고: 10%', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 신고불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 42, topic: 'penalty', question: '납부불성실 가산세를 설명하시오.', answer: '미납세액 x 미납일수 x 0.022%', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 납부불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 43, topic: 'penalty', question: '세금계산서 관련 가산세를 설명하시오.', answer: '미발급: 2%, 지연발급: 1%, 허위발급: 3%', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 세금계산서 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 44, topic: 'penalty', question: '원천징수납부불성실 가산세를 설명하시오.', answer: '미납세액의 3% 또는 10% 가산', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 원천징수납부불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 45, topic: 'penalty', question: '가산세 감면 규정을 설명하시오.', answer: '수정신고, 기한후신고시 일정률 감면', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 가산세 감면 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 조세특례제한법 (46-50)
    { id: 46, topic: 'tax-special', question: '중소기업 특별세액감면을 설명하시오.', answer: '업종/지역별 5%~30% 세액감면', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 중소기업 특별세액감면을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 47, topic: 'tax-special', question: '창업중소기업 세액감면을 설명하시오.', answer: '수도권 50%, 지방 100% 감면', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 창업중소기업 세액감면을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 48, topic: 'tax-special', question: '연구인력개발비 세액공제를 설명하시오.', answer: '당기분 또는 증가분 방식 선택 공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 연구인력개발비 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 49, topic: 'tax-special', question: '고용증대세액공제를 설명하시오.', answer: '청년/장애인 등 고용증가시 인당 공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 고용증대세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 50, topic: 'tax-special', question: '통합투자세액공제를 설명하시오.', answer: '사업용 자산 투자시 기본공제+추가공제', prompt: 'TAT 1급 세무회계 문제입니다.\n\n문제: 통합투자세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법 조항\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
  ];

  const topics = [
    { id: 'vat-basic', name: '부가가치세 기초', icon: '🧾', count: 5 },
    { id: 'vat-calc', name: '부가가치세 계산', icon: '🔢', count: 5 },
    { id: 'tax-invoice', name: '세금계산서', icon: '📄', count: 5 },
    { id: 'vat-report', name: '부가세 신고', icon: '📝', count: 5 },
    { id: 'income-basic', name: '소득세 기초', icon: '👤', count: 5 },
    { id: 'withholding', name: '원천징수', icon: '💰', count: 5 },
    { id: 'year-end', name: '연말정산', icon: '📅', count: 5 },
    { id: 'corporate-basic', name: '법인세 기초', icon: '🏢', count: 5 },
    { id: 'penalty', name: '가산세', icon: '⚠️', count: 5 },
    { id: 'tax-special', name: '조세특례제한법', icon: '📋', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-1" className="text-gray-500 hover:text-gray-700">TAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">세무회계</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📋</div>
            <div>
              <h1 className="text-2xl font-bold">세무회계</h1>
              <p className="text-rose-100">TAT 1급 이론시험 | 부가가치세, 소득세, 법인세 실무</p>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Topic Filter */}
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

        {/* Questions List */}
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
                    <div key={q.id} className="p-4 hover:bg-rose-50/50">
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

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/tat-1/study/cost-accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 원가관리회계
          </Link>
          <Link href="/category/accounting/tat-1/study/practical" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
            실무 연습 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. TAT 1급 세무회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
