'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TAT2VATBasicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['overview']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat2-vat-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tat2-vat-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 부가가치세 개요 (1-5)
    { id: 1, topic: 'overview', question: '부가가치세의 정의와 성격을 설명하시오.', answer: '재화·용역 공급시 창출된 부가가치에 과세하는 간접세', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 부가가치세의 정의와 성격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 2, topic: 'overview', question: '부가가치세의 특징(전단계세액공제법)을 설명하시오.', answer: '매출세액에서 매입세액을 공제하여 이중과세 방지', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 부가가치세의 특징(전단계세액공제법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 3, topic: 'overview', question: '부가가치세 납세의무자를 설명하시오.', answer: '사업자(개인·법인), 재화수입자', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 납세의무자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 4, topic: 'overview', question: '사업자등록 제도를 설명하시오.', answer: '사업개시일로부터 20일 이내 관할세무서에 신청', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 사업자등록 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 5, topic: 'overview', question: '과세기간과 신고기한을 설명하시오.', answer: '1기(1-6월), 2기(7-12월), 각 과세기간 종료 후 25일 내', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 과세기간과 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 과세대상 (6-10)
    { id: 6, topic: 'taxable', question: '재화의 공급 범위를 설명하시오.', answer: '계약상 모든 원인에 의해 재화를 인도·양도하는 것', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 재화의 공급 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 7, topic: 'taxable', question: '용역의 공급 범위를 설명하시오.', answer: '역무제공, 재화·시설물·권리의 사용', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 용역의 공급 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 8, topic: 'taxable', question: '재화의 간주공급 유형을 설명하시오.', answer: '자가공급, 개인적 공급, 사업상 증여, 폐업시 잔존재화', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 재화의 간주공급 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 9, topic: 'taxable', question: '재화의 수입에 대해 설명하시오.', answer: '외국으로부터 국내로 반입되는 재화에 과세', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 재화의 수입에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 10, topic: 'taxable', question: '공급시기(세금계산서 발급시기)를 설명하시오.', answer: '재화 인도일, 용역 역무제공 완료일이 원칙', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 공급시기(세금계산서 발급시기)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 면세와 영세율 (11-15)
    { id: 11, topic: 'exempt-zero', question: '면세의 의의와 효과를 설명하시오.', answer: '부가세 면제, 매입세액 불공제(부분면세)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 면세의 의의와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 12, topic: 'exempt-zero', question: '면세대상 재화·용역을 열거하시오.', answer: '미가공식료품, 의료·교육·금융용역, 도서·신문 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 면세대상 재화·용역을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 13, topic: 'exempt-zero', question: '영세율의 의의와 효과를 설명하시오.', answer: '0% 세율 적용, 매입세액 전액 환급(완전면세)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 영세율의 의의와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 14, topic: 'exempt-zero', question: '영세율 적용대상을 열거하시오.', answer: '수출재화, 국외제공용역, 외국항행용역 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 영세율 적용대상을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 15, topic: 'exempt-zero', question: '면세와 영세율의 차이점을 비교하시오.', answer: '면세는 부분면세, 영세율은 완전면세로 환급 가능', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 면세와 영세율의 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 세금계산서 기초 (16-20)
    { id: 16, topic: 'invoice-basic', question: '세금계산서의 기능과 역할을 설명하시오.', answer: '거래증빙, 매입세액공제 근거, 세원관리 수단', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 세금계산서의 기능과 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 17, topic: 'invoice-basic', question: '세금계산서 필수기재사항을 열거하시오.', answer: '공급자·공급받는자 등록번호, 공급가액, 세액, 작성일자', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 필수기재사항을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 18, topic: 'invoice-basic', question: '세금계산서 발급시기를 설명하시오.', answer: '공급시기에 발급, 선발급·후발급 특례 존재', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 발급시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 19, topic: 'invoice-basic', question: '수정세금계산서 발급사유를 설명하시오.', answer: '착오, 환입, 계약해제, 가격변동 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 수정세금계산서 발급사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 20, topic: 'invoice-basic', question: '세금계산서 관련 가산세를 설명하시오.', answer: '미발급, 지연발급, 허위발급 등 가산세 부과', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 전자세금계산서 (21-25)
    { id: 21, topic: 'e-invoice', question: '전자세금계산서 의무발급 대상자를 설명하시오.', answer: '모든 법인, 직전연도 공급가액 1억원 이상 개인사업자', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 의무발급 대상자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 22, topic: 'e-invoice', question: '전자세금계산서 발급방법을 설명하시오.', answer: '국세청 홈택스, ASP 사업자, ERP 연동 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 발급방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 23, topic: 'e-invoice', question: '전자세금계산서 전송기한을 설명하시오.', answer: '발급일의 다음날까지 국세청에 전송', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 전송기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 24, topic: 'e-invoice', question: '전자세금계산서 미전송 가산세를 설명하시오.', answer: '공급가액의 0.3%(전송기한 경과 후 1%)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 미전송 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 25, topic: 'e-invoice', question: '전자세금계산서 발급 세액공제를 설명하시오.', answer: '직전연도 공급가액 3억원 미만 개인사업자 건당 200원', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 발급 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 매출세액 (26-30)
    { id: 26, topic: 'output-tax', question: '과세표준의 원칙을 설명하시오.', answer: '해당 과세기간 공급가액의 합계액', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 과세표준의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 27, topic: 'output-tax', question: '과세표준에 포함·불포함 항목을 설명하시오.', answer: '에누리·할인액 제외, 연체이자·대손금 포함', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 과세표준에 포함·불포함 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 28, topic: 'output-tax', question: '부가가치세 세율을 설명하시오.', answer: '10% 단일세율 적용', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 29, topic: 'output-tax', question: '매출세액 계산방법을 설명하시오.', answer: '과세표준(공급가액) x 10% = 매출세액', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 매출세액 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 30, topic: 'output-tax', question: '간주임대료 계산방법을 설명하시오.', answer: '보증금 x 정기예금이자율 x 기간/365', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 간주임대료 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 매입세액공제 (31-35)
    { id: 31, topic: 'input-tax', question: '매입세액공제 요건을 설명하시오.', answer: '사업관련 매입, 적격증빙 수취, 신고기한 내 신고', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 매입세액공제 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 32, topic: 'input-tax', question: '매입세액 불공제 항목을 열거하시오.', answer: '비영업용 승용차, 접대비, 면세사업관련, 미등록기간 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 매입세액 불공제 항목을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 33, topic: 'input-tax', question: '의제매입세액공제를 설명하시오.', answer: '면세농산물 매입시 일정비율(2/102 등) 공제', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 의제매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 34, topic: 'input-tax', question: '신용카드 매출전표 매입세액공제를 설명하시오.', answer: '일반과세자로부터 신용카드 결제시 매입세액 공제', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 신용카드 매출전표 매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 35, topic: 'input-tax', question: '공통매입세액 안분계산을 설명하시오.', answer: '과세·면세 공통사용시 과세분만 공제', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 공통매입세액 안분계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 납부세액 계산 (36-40)
    { id: 36, topic: 'payment', question: '납부세액 계산구조를 설명하시오.', answer: '매출세액 - 매입세액 = 납부세액(환급세액)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 납부세액 계산구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 37, topic: 'payment', question: '예정고지제도를 설명하시오.', answer: '직전과세기간 납부세액의 50%를 예정신고기간에 고지', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 예정고지제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 38, topic: 'payment', question: '대손세액공제를 설명하시오.', answer: '대손발생시 매출세액에서 공제(대손확정일 속한 과세기간)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 대손세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 39, topic: 'payment', question: '재고납부세액을 설명하시오.', answer: '일반과세자에서 간이과세자 전환시 재고분 부가세 납부', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 재고납부세액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 40, topic: 'payment', question: '재고매입세액 공제를 설명하시오.', answer: '간이과세자에서 일반과세자 전환시 재고분 공제', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 재고매입세액 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 신고와 납부 (41-45)
    { id: 41, topic: 'filing', question: '확정신고·납부 절차를 설명하시오.', answer: '과세기간 종료 후 25일 이내 신고·납부', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 확정신고·납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 42, topic: 'filing', question: '예정신고·납부 절차를 설명하시오.', answer: '법인: 분기별 신고, 개인: 예정고지 원칙', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 예정신고·납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 43, topic: 'filing', question: '신고기한별 일정을 설명하시오.', answer: '예정(4/25, 10/25), 확정(7/25, 1/25)', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 신고기한별 일정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 44, topic: 'filing', question: '조기환급제도를 설명하시오.', answer: '영세율, 시설투자시 예정신고기간에 환급 신청 가능', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 조기환급제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 45, topic: 'filing', question: '부가가치세 가산세 종류를 설명하시오.', answer: '무신고, 과소신고, 납부지연, 세금계산서 관련 가산세', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 가산세 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },

    // 간이과세자 (46-50)
    { id: 46, topic: 'simplified', question: '간이과세 적용대상을 설명하시오.', answer: '직전연도 공급대가 8,000만원 미만 개인사업자', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 간이과세 적용대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 47, topic: 'simplified', question: '간이과세자 세액계산방법을 설명하시오.', answer: '공급대가 x 업종별 부가가치율 x 10%', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 간이과세자 세액계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 48, topic: 'simplified', question: '업종별 부가가치율을 설명하시오.', answer: '제조업 20%, 소매업 10%, 음식숙박업 15% 등', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 업종별 부가가치율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 49, topic: 'simplified', question: '간이과세자 납부의무면제를 설명하시오.', answer: '공급대가 4,800만원 미만시 납부면제', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 간이과세자 납부의무면제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
    { id: 50, topic: 'simplified', question: '간이과세 포기제도를 설명하시오.', answer: '일반과세 적용받기 위해 간이과세 포기 신청 가능', prompt: 'TAT 2급 부가가치세 문제입니다.\n\n문제: 간이과세 포기제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 세법\n3. 계산 방법\n4. 실무 사례\n5. 주의사항' },
  ];

  const topics = [
    { id: 'overview', name: '부가가치세 개요', icon: '📚', count: 5 },
    { id: 'taxable', name: '과세대상', icon: '🎯', count: 5 },
    { id: 'exempt-zero', name: '면세와 영세율', icon: '🆓', count: 5 },
    { id: 'invoice-basic', name: '세금계산서 기초', icon: '🧾', count: 5 },
    { id: 'e-invoice', name: '전자세금계산서', icon: '💻', count: 5 },
    { id: 'output-tax', name: '매출세액', icon: '📈', count: 5 },
    { id: 'input-tax', name: '매입세액공제', icon: '✅', count: 5 },
    { id: 'payment', name: '납부세액 계산', icon: '🧮', count: 5 },
    { id: 'filing', name: '신고와 납부', icon: '📝', count: 5 },
    { id: 'simplified', name: '간이과세자', icon: '📉', count: 5 },
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
            <Link href="/category/accounting/tat-2" className="text-gray-500 hover:text-gray-700">TAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">부가가치세</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🧾</div>
            <div>
              <h1 className="text-2xl font-bold">부가가치세 기초</h1>
              <p className="text-violet-100">TAT 2급 | 50문항 | 10개 토픽</p>
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
                    ? 'bg-violet-100 border-2 border-violet-300'
                    : 'bg-white border border-gray-200 hover:border-violet-200'
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
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
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
                              ? 'bg-violet-500 border-violet-500 text-white'
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
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition flex-shrink-0"
                            >
                              🤖 AI
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

        <div className="mt-8 flex justify-center">
          <Link href="/category/accounting/tat-2" className="px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">
            TAT 2급 홈으로 돌아가기
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. TAT 2급 부가가치세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
