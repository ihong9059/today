'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ComputerizedTax2VATStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['basic']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-2-vat-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-2-vat-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 부가세 기본개념 (1-5)
    { id: 1, topic: 'basic', question: '부가가치세의 의의와 특징을 설명하시오.', answer: '재화·용역 공급시 창출된 부가가치에 과세하는 간접세', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세의 의의와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부가가치세 정의\n2. 간접세 특성\n3. 전단계세액공제법\n4. 부가가치세 장단점\n5. 연습문제 3개' },
    { id: 2, topic: 'basic', question: '부가가치세 납세의무자를 설명하시오.', answer: '사업자(개인, 법인), 재화수입자', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 납세의무자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자 정의\n2. 사업자 범위\n3. 개인사업자와 법인\n4. 재화수입자\n5. 연습문제 3개' },
    { id: 3, topic: 'basic', question: '부가가치세 과세기간과 신고기한을 설명하시오.', answer: '1기(1-6월), 2기(7-12월), 각 과세기간 종료 후 25일 내', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 과세기간과 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간 구분\n2. 예정신고기간\n3. 확정신고기간\n4. 신고납부기한\n5. 연습문제 3개' },
    { id: 4, topic: 'basic', question: '부가가치세 세율과 계산구조를 설명하시오.', answer: '10% 단일세율, 매출세액 - 매입세액 = 납부세액', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 세율과 계산구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세율 체계\n2. 매출세액 계산\n3. 매입세액 공제\n4. 납부세액 계산\n5. 연습문제 3개' },
    { id: 5, topic: 'basic', question: '사업자등록 제도를 설명하시오.', answer: '사업개시일로부터 20일 이내 관할세무서에 신청', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 사업자등록 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록신청 시기\n2. 신청서류\n3. 미등록 불이익\n4. 휴폐업 신고\n5. 연습문제 3개' },

    // 과세대상 (6-10)
    { id: 6, topic: 'taxable', question: '재화의 공급을 설명하시오.', answer: '계약상 모든 원인에 의해 재화를 인도·양도하는 것', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 재화의 공급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 정의\n2. 공급의 범위\n3. 인도·양도 시기\n4. 공급의 특례\n5. 연습문제 3개' },
    { id: 7, topic: 'taxable', question: '용역의 공급을 설명하시오.', answer: '역무제공, 재화·시설물·권리의 사용', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 용역의 공급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용역의 정의\n2. 역무 제공\n3. 시설물 사용\n4. 권리 사용\n5. 연습문제 3개' },
    { id: 8, topic: 'taxable', question: '재화의 간주공급을 설명하시오.', answer: '자가공급, 개인적 공급, 사업상 증여, 폐업시 잔존재화', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 재화의 간주공급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자가공급\n2. 개인적 공급\n3. 사업상 증여\n4. 폐업시 잔존재화\n5. 연습문제 3개' },
    { id: 9, topic: 'taxable', question: '재화의 수입에 대해 설명하시오.', answer: '외국으로부터 국내로 반입되는 재화', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 재화의 수입에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수입재화 범위\n2. 과세표준\n3. 납세의무자\n4. 수입세금계산서\n5. 연습문제 3개' },
    { id: 10, topic: 'taxable', question: '공급시기에 대해 설명하시오.', answer: '재화 인도일, 용역 역무제공 완료일', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 공급시기에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화 공급시기\n2. 용역 공급시기\n3. 장기할부판매\n4. 공급시기 특례\n5. 연습문제 3개' },

    // 과세표준 (11-15)
    { id: 11, topic: 'taxbase', question: '과세표준의 원칙을 설명하시오.', answer: '해당 과세기간 공급가액의 합계액', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 과세표준의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 정의\n2. 공급가액 산정\n3. 부가세 포함여부\n4. 과세표준 계산\n5. 연습문제 3개' },
    { id: 12, topic: 'taxbase', question: '과세표준에 포함되는 항목을 설명하시오.', answer: '에누리·할인액 제외, 연체이자·대손금 포함', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 과세표준에 포함되는 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포함 항목\n2. 불포함 항목\n3. 에누리·할인 처리\n4. 부수재화·용역\n5. 연습문제 3개' },
    { id: 13, topic: 'taxbase', question: '부동산 임대용역의 과세표준을 설명하시오.', answer: '임대료 + 전세금·보증금 간주임대료', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부동산 임대용역의 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임대료 과세\n2. 간주임대료 계산\n3. 정기예금 이자율\n4. 계산사례\n5. 연습문제 3개' },
    { id: 14, topic: 'taxbase', question: '과세표준 계산의 특례를 설명하시오.', answer: '토지와 건물 일괄공급, 외화환산, 대물변제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 과세표준 계산의 특례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토지·건물 일괄공급\n2. 기준시가 안분\n3. 외화 환산\n4. 대물변제\n5. 연습문제 3개' },
    { id: 15, topic: 'taxbase', question: '재화 수입시 과세표준을 설명하시오.', answer: '관세과세가격 + 관세 + 개별소비세 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 재화 수입시 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관세과세가격\n2. 가산항목\n3. 수입부가세 계산\n4. 납부절차\n5. 연습문제 3개' },

    // 세금계산서 (16-20)
    { id: 16, topic: 'invoice', question: '세금계산서의 필수기재사항을 설명하시오.', answer: '공급자·공급받는자 등록번호, 공급가액, 세액, 작성일자', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 세금계산서의 필수기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급자 정보\n2. 공급받는자 정보\n3. 공급가액과 세액\n4. 기재사항 오류시\n5. 연습문제 3개' },
    { id: 17, topic: 'invoice', question: '세금계산서 발급시기를 설명하시오.', answer: '공급시기에 발급, 선발급·후발급 특례', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 발급시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원칙적 발급시기\n2. 선발급 특례\n3. 후발급 특례\n4. 지연발급 가산세\n5. 연습문제 3개' },
    { id: 18, topic: 'invoice', question: '전자세금계산서 제도를 설명하시오.', answer: '국세청 시스템 통해 발급, 법인 및 일정 개인사업자 의무', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발급의무자\n2. 발급방법\n3. 전송기한\n4. 세액공제\n5. 연습문제 3개' },
    { id: 19, topic: 'invoice', question: '수정세금계산서 발급사유를 설명하시오.', answer: '착오, 환입, 계약해제, 가격변동 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 수정세금계산서 발급사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기재사항 착오\n2. 환입\n3. 계약 해제\n4. 내국신용장 사후발급\n5. 연습문제 3개' },
    { id: 20, topic: 'invoice', question: '세금계산서 관련 가산세를 설명하시오.', answer: '미발급, 지연발급, 허위발급, 미전송 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미발급 가산세\n2. 지연발급 가산세\n3. 허위발급 가산세\n4. 미전송 가산세\n5. 연습문제 3개' },

    // 매입세액공제 (21-25)
    { id: 21, topic: 'deduction', question: '매입세액공제 요건을 설명하시오.', answer: '사업관련 매입, 적격증빙 수취, 신고기한 내 신고', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 매입세액공제 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업관련성\n2. 적격증빙\n3. 공제시기\n4. 경과조치\n5. 연습문제 3개' },
    { id: 22, topic: 'deduction', question: '의제매입세액공제를 설명하시오.', answer: '면세농산물 매입시 일정비율 공제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 의제매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 공제한도\n4. 증빙요건\n5. 연습문제 3개' },
    { id: 23, topic: 'deduction', question: '신용카드 매출전표 등에 의한 매입세액공제를 설명하시오.', answer: '일반과세자로부터 신용카드 결제시 매입세액 공제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 신용카드 매출전표 등에 의한 매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 적용대상 증빙\n3. 공제방법\n4. 불공제 항목\n5. 연습문제 3개' },
    { id: 24, topic: 'deduction', question: '대손세액공제를 설명하시오.', answer: '대손발생시 매출세액에서 공제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 대손세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손사유\n2. 공제시기\n3. 공제금액\n4. 대손회수\n5. 연습문제 3개' },
    { id: 25, topic: 'deduction', question: '재고매입세액 공제를 설명하시오.', answer: '간이과세자에서 일반과세자 전환시', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 재고매입세액 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 공제금액 계산\n3. 재고자산 범위\n4. 신고방법\n5. 연습문제 3개' },

    // 매입세액불공제 (26-30)
    { id: 26, topic: 'nondeduction', question: '매입세액 불공제 사유를 설명하시오.', answer: '비영업용 소형승용차, 접대비, 면세사업관련 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 매입세액 불공제 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 항목\n2. 비영업용 승용차\n3. 접대비 관련\n4. 면세사업 관련\n5. 연습문제 3개' },
    { id: 27, topic: 'nondeduction', question: '비영업용 소형승용차 관련 매입세액 불공제를 설명하시오.', answer: '1,000cc 이하 또는 배기량 관계없이 경차 제외', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 비영업용 소형승용차 관련 매입세액 불공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 대상 차량\n2. 영업용 판단기준\n3. 공제 가능 경우\n4. 유지비 처리\n5. 연습문제 3개' },
    { id: 28, topic: 'nondeduction', question: '공통매입세액 안분계산을 설명하시오.', answer: '과세·면세 공통사용시 과세분만 공제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 공통매입세액 안분계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안분계산 필요성\n2. 안분비율 계산\n3. 실지귀속 구분\n4. 정산\n5. 연습문제 3개' },
    { id: 29, topic: 'nondeduction', question: '사업과 직접 관련없는 매입세액을 설명하시오.', answer: '사업무관 지출, 비용 불인정 항목', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 사업과 직접 관련없는 매입세액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 판단기준\n2. 사업무관 지출\n3. 사적사용\n4. 사례\n5. 연습문제 3개' },
    { id: 30, topic: 'nondeduction', question: '세금계산서 미수취·부실기재시 불공제를 설명하시오.', answer: '적격증빙 없으면 매입세액 불공제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 세금계산서 미수취·부실기재시 불공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미수취 불공제\n2. 부실기재 범위\n3. 필수기재사항 착오\n4. 구제방법\n5. 연습문제 3개' },

    // 영세율 (31-35)
    { id: 31, topic: 'zerotax', question: '영세율의 의의와 효과를 설명하시오.', answer: '0% 세율 적용, 매입세액 전액 환급(완전면세)', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 영세율의 의의와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율 정의\n2. 적용효과\n3. 면세와 차이\n4. 환급\n5. 연습문제 3개' },
    { id: 32, topic: 'zerotax', question: '수출재화에 대한 영세율을 설명하시오.', answer: '직접수출, 위탁판매수출, 내국신용장 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 수출재화에 대한 영세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접수출\n2. 중계무역\n3. 위탁판매수출\n4. 내국신용장\n5. 연습문제 3개' },
    { id: 33, topic: 'zerotax', question: '국외제공용역의 영세율을 설명하시오.', answer: '국외에서 제공하는 용역', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 국외제공용역의 영세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 국외제공 판정\n3. 증빙서류\n4. 사례\n5. 연습문제 3개' },
    { id: 34, topic: 'zerotax', question: '외국항행용역의 영세율을 설명하시오.', answer: '선박·항공기 외국항행용역', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 외국항행용역의 영세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 외국항행 정의\n3. 선박·항공기 범위\n4. 증빙\n5. 연습문제 3개' },
    { id: 35, topic: 'zerotax', question: '영세율 첨부서류와 신고방법을 설명하시오.', answer: '영세율 매출명세서, 수출실적명세서 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 영세율 첨부서류와 신고방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 첨부서류\n2. 수출실적명세서\n3. 영세율매출명세서\n4. 미제출 불이익\n5. 연습문제 3개' },

    // 면세 (36-40)
    { id: 36, topic: 'exempt', question: '면세의 의의와 효과를 설명하시오.', answer: '부가세 면제, 매입세액 불공제(부분면세)', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 면세의 의의와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면세 정의\n2. 적용효과\n3. 영세율과 차이\n4. 누적효과\n5. 연습문제 3개' },
    { id: 37, topic: 'exempt', question: '기초생활필수품 면세를 설명하시오.', answer: '미가공식료품, 수돗물, 연탄, 여성용품 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 기초생활필수품 면세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미가공식료품\n2. 수돗물\n3. 연탄·무연탄\n4. 기타 생필품\n5. 연습문제 3개' },
    { id: 38, topic: 'exempt', question: '국민후생용역 면세를 설명하시오.', answer: '의료·교육·금융·보험용역 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 국민후생용역 면세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의료보건용역\n2. 교육용역\n3. 금융보험용역\n4. 기타 후생용역\n5. 연습문제 3개' },
    { id: 39, topic: 'exempt', question: '문화관련 재화·용역 면세를 설명하시오.', answer: '도서, 신문, 방송, 예술행사 등', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 문화관련 재화·용역 면세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서\n2. 신문·잡지\n3. 방송\n4. 예술행사\n5. 연습문제 3개' },
    { id: 40, topic: 'exempt', question: '면세 포기제도를 설명하시오.', answer: '영세율 적용시 면세포기 신청 가능', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 면세 포기제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포기사유\n2. 신청절차\n3. 효과\n4. 철회\n5. 연습문제 3개' },

    // 신고납부 (41-45)
    { id: 41, topic: 'filing', question: '예정신고와 확정신고를 설명하시오.', answer: '예정: 분기별 4/25, 10/25, 확정: 반기별 7/25, 1/25', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 예정신고와 확정신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예정신고 기한\n2. 확정신고 기한\n3. 납부세액 계산\n4. 신고서류\n5. 연습문제 3개' },
    { id: 42, topic: 'filing', question: '조기환급제도를 설명하시오.', answer: '영세율, 시설투자시 예정신고기간 환급', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 조기환급제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조기환급 사유\n2. 영세율 환급\n3. 시설투자 환급\n4. 환급절차\n5. 연습문제 3개' },
    { id: 43, topic: 'filing', question: '부가가치세 가산세를 설명하시오.', answer: '무신고, 과소신고, 납부지연, 세금계산서 관련', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고 가산세\n2. 과소신고 가산세\n3. 납부지연 가산세\n4. 세금계산서 가산세\n5. 연습문제 3개' },
    { id: 44, topic: 'filing', question: '수정신고와 경정청구를 설명하시오.', answer: '과소신고시 수정신고, 과대납부시 경정청구', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 수정신고와 경정청구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수정신고 요건\n2. 경정청구 요건\n3. 제출기한\n4. 효과\n5. 연습문제 3개' },
    { id: 45, topic: 'filing', question: '부가가치세 환급절차를 설명하시오.', answer: '일반환급(신고기한 후 30일), 조기환급(15일)', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 부가가치세 환급절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반환급\n2. 조기환급\n3. 환급금 결정\n4. 환급 지연시\n5. 연습문제 3개' },

    // 간이과세 (46-50)
    { id: 46, topic: 'simplified', question: '간이과세 적용대상을 설명하시오.', answer: '직전연도 공급대가 8,000만원 미만 개인사업자', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 간이과세 적용대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출기준\n2. 배제업종\n3. 신규사업자\n4. 적용시기\n5. 연습문제 3개' },
    { id: 47, topic: 'simplified', question: '간이과세자 세액계산방법을 설명하시오.', answer: '공급대가 x 업종별 부가가치율 x 10%', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 간이과세자 세액계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납부세액 계산\n2. 업종별 부가가치율\n3. 공제세액\n4. 계산사례\n5. 연습문제 3개' },
    { id: 48, topic: 'simplified', question: '간이과세자 납부의무면제를 설명하시오.', answer: '공급대가 4,800만원 미만시 납부면제', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 간이과세자 납부의무면제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면제기준\n2. 신고의무\n3. 세금계산서 발급\n4. 일반과세자 전환\n5. 연습문제 3개' },
    { id: 49, topic: 'simplified', question: '과세유형 전환을 설명하시오.', answer: '간이→일반, 일반→간이 전환 절차', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 과세유형 전환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간이→일반 전환\n2. 일반→간이 전환\n3. 재고납부세액\n4. 재고매입세액\n5. 연습문제 3개' },
    { id: 50, topic: 'simplified', question: '간이과세자 세금계산서 발급의무를 설명하시오.', answer: '공급대가 4,800만원 이상시 발급의무', prompt: '전산세무 2급 부가가치세 문제입니다.\n\n문제: 간이과세자 세금계산서 발급의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발급의무 기준\n2. 영수증 발급\n3. 신용카드 결제\n4. 미발급 불이익\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'basic', name: '부가세 기본개념', icon: '📚', count: 5 },
    { id: 'taxable', name: '과세대상', icon: '🎯', count: 5 },
    { id: 'taxbase', name: '과세표준', icon: '📊', count: 5 },
    { id: 'invoice', name: '세금계산서', icon: '🧾', count: 5 },
    { id: 'deduction', name: '매입세액공제', icon: '✅', count: 5 },
    { id: 'nondeduction', name: '매입세액불공제', icon: '❌', count: 5 },
    { id: 'zerotax', name: '영세율', icon: '0️⃣', count: 5 },
    { id: 'exempt', name: '면세', icon: '🆓', count: 5 },
    { id: 'filing', name: '신고납부', icon: '📝', count: 5 },
    { id: 'simplified', name: '간이과세', icon: '📉', count: 5 },
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
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-500 hover:text-gray-700">전산세무 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">부가가치세</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🧾</div>
            <div>
              <h1 className="text-2xl font-bold">부가가치세</h1>
              <p className="text-purple-100">전산세무 2급 | 50문항 | 10개 토픽</p>
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
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-white border border-gray-200 hover:border-purple-200'
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
                              ? 'bg-purple-500 border-purple-500 text-white'
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
                              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/computerized-tax-2" className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            전산세무 2급 홈으로 돌아가기
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 2급 부가가치세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
