'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ConsumptionTaxStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['vat']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-consumption-tax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-consumption-tax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 부가가치세 (1-15)
    { id: 1, topic: 'vat', question: '부가가치세의 과세거래(재화의 공급, 용역의 공급, 재화의 수입)를 설명하시오.', answer: '재화·용역의 공급과 재화의 수입이 과세거래이며, 각각 공급시기와 과세표준이 다르다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 부가가치세의 과세거래(재화의 공급, 용역의 공급, 재화의 수입)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급\n2. 용역의 공급\n3. 재화의 수입\n4. 간주공급\n5. 연습문제 3개' },
    { id: 2, topic: 'vat', question: '수입재화의 부가가치세 과세표준을 계산하시오.', answer: '과세표준 = 관세과세가격 + 관세 + 개별소비세 + 주세 + 교육세 + 농어촌특별세이다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수입재화의 부가가치세 과세표준을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. CIF 가격\n2. 관세 가산\n3. 개별소비세 등 가산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 3, topic: 'vat', question: '영세율과 면세의 차이를 설명하시오.', answer: '영세율은 매입세액 환급 가능, 면세는 매입세액 공제 불가하며 세부담이 전가된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 영세율과 면세의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율의 의의와 대상\n2. 면세의 의의와 대상\n3. 매입세액 공제 차이\n4. 면세 포기\n5. 연습문제 3개' },
    { id: 4, topic: 'vat', question: '수출에 대한 영세율 적용 요건을 설명하시오.', answer: '내국물품을 외국으로 반출하는 경우 영세율이 적용되며, 수출신고필증 등이 필요하다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수출에 대한 영세율 적용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수출의 정의\n2. 영세율 적용 요건\n3. 증빙서류\n4. 관세 환급과의 관계\n5. 연습문제 3개' },
    { id: 5, topic: 'vat', question: '매입세액공제의 요건과 불공제 항목을 설명하시오.', answer: '사업 관련 매입세액은 공제하되, 접대비·비영업용 승용차 등은 불공제된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 매입세액공제의 요건과 불공제 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 요건\n2. 불공제 매입세액\n3. 공통매입세액 안분\n4. 의제매입세액공제\n5. 연습문제 3개' },
    { id: 6, topic: 'vat', question: '수입세금계산서의 발급과 매입세액공제를 설명하시오.', answer: '세관장이 수입세금계산서를 발급하며, 이를 근거로 매입세액 공제가 가능하다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수입세금계산서의 발급과 매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수입세금계산서 발급 시기\n2. 기재사항\n3. 매입세액 공제\n4. 수정수입세금계산서\n5. 연습문제 3개' },
    { id: 7, topic: 'vat', question: '부가가치세 신고·납부 절차를 설명하시오.', answer: '예정신고(분기), 확정신고(반기)를 하며, 신고 시 납부세액을 함께 납부한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 부가가치세 신고·납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간\n2. 예정신고와 확정신고\n3. 신고 기한\n4. 납부 방법\n5. 연습문제 3개' },
    { id: 8, topic: 'vat', question: '간이과세자 제도를 설명하시오.', answer: '연 매출 8천만원 미만 개인사업자에게 적용되며, 업종별 부가가치율로 세액을 계산한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 간이과세자 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 세액 계산\n3. 업종별 부가가치율\n4. 일반과세자 전환\n5. 연습문제 3개' },
    { id: 9, topic: 'vat', question: '전자세금계산서 발급 의무와 가산세를 설명하시오.', answer: '법인과 일정 규모 이상 개인사업자는 전자세금계산서를 의무 발급해야 한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 전자세금계산서 발급 의무와 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의무발급 대상\n2. 발급 시기\n3. 전송 기한\n4. 가산세\n5. 연습문제 3개' },
    { id: 10, topic: 'vat', question: '부가가치세 환급의 유형과 절차를 설명하시오.', answer: '일반환급과 조기환급이 있으며, 수출 등 영세율 매출이 많은 경우 환급이 발생한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 부가가치세 환급의 유형과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급 발생 사유\n2. 일반환급\n3. 조기환급\n4. 환급 결정 기한\n5. 연습문제 3개' },
    { id: 11, topic: 'vat', question: '대손세액공제 제도를 설명하시오.', answer: '공급받은 자의 파산 등으로 대금을 회수할 수 없는 경우 매출세액에서 공제한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 대손세액공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 요건\n2. 대손 사유\n3. 공제 시기\n4. 회수 시 처리\n5. 연습문제 3개' },
    { id: 12, topic: 'vat', question: '부가가치세 면세 대상을 열거하시오.', answer: '기초생활필수품, 교육·의료 서비스, 금융·보험 서비스 등이 면세 대상이다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 부가가치세 면세 대상을 열거하시오.\n\n다음 순서로 설명해주세요:\n1. 기초생활필수품\n2. 교육·의료 서비스\n3. 금융·보험\n4. 기타 면세\n5. 연습문제 3개' },
    { id: 13, topic: 'vat', question: '공통매입세액 안분계산 방법을 설명하시오.', answer: '과세·면세 공통사용 매입세액은 과세매출 비율로 안분하여 공제한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 공통매입세액 안분계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안분계산 필요성\n2. 안분 기준\n3. 정산 절차\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'vat', question: '사업자등록과 미등록 가산세를 설명하시오.', answer: '사업개시일로부터 20일 내 등록해야 하며, 미등록시 매출세액 1% 가산세가 있다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 사업자등록과 미등록 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록 의무\n2. 등록 기한\n3. 미등록 가산세\n4. 휴폐업 신고\n5. 연습문제 3개' },
    { id: 15, topic: 'vat', question: '재화의 수입에 대한 납세의무자와 납부절차를 설명하시오.', answer: '수입신고인이 납세의무자이며, 수입신고 수리 전 세관에 납부해야 한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 재화의 수입에 대한 납세의무자와 납부절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자\n2. 납부 시기\n3. 신용담보 납부\n4. 관세와의 관계\n5. 연습문제 3개' },

    // 개별소비세 (16-28)
    { id: 16, topic: 'special-consumption', question: '개별소비세의 과세대상을 설명하시오.', answer: '승용자동차, 석유류, 담배, 보석·귀금속, 고급 가구 등 특정 물품에 과세된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 개별소비세의 과세대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 물품 종류\n2. 과세 장소(유흥장소)\n3. 세율 구조\n4. 과세 목적\n5. 연습문제 3개' },
    { id: 17, topic: 'special-consumption', question: '수입물품에 대한 개별소비세 과세표준과 세율을 설명하시오.', answer: '과세표준은 관세과세가격 + 관세이며, 물품별 세율이 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수입물품에 대한 개별소비세 과세표준과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 계산\n2. 물품별 세율\n3. 탄력세율\n4. 세액 계산 예시\n5. 연습문제 3개' },
    { id: 18, topic: 'special-consumption', question: '개별소비세 면세 대상을 설명하시오.', answer: '외교관 물품, 수출용 물품, 군용물품, 장애인용 차량 등이 면세된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 개별소비세 면세 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외교관 면세\n2. 수출 면세\n3. 장애인용 차량\n4. 기타 면세\n5. 연습문제 3개' },
    { id: 19, topic: 'special-consumption', question: '미납세반출 제도를 설명하시오.', answer: '제조장에서 다른 제조장으로 반출 시 세금 납부 없이 반출할 수 있다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 미납세반출 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미납세반출의 의의\n2. 적용 요건\n3. 신고 절차\n4. 사후관리\n5. 연습문제 3개' },
    { id: 20, topic: 'special-consumption', question: '개별소비세 환급 제도를 설명하시오.', answer: '수출 시, 위약반품 시 등에 납부한 개별소비세를 환급받는다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 개별소비세 환급 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급 사유\n2. 수출 환급\n3. 환급 절차\n4. 환급 기한\n5. 연습문제 3개' },
    { id: 21, topic: 'special-consumption', question: '조건부면세와 용도세율을 설명하시오.', answer: '특정 용도로 사용을 조건으로 면세 또는 낮은 세율을 적용한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 조건부면세와 용도세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조건부면세 대상\n2. 용도세율 적용\n3. 용도외 사용 시 추징\n4. 사후관리\n5. 연습문제 3개' },
    { id: 22, topic: 'special-consumption', question: '승용자동차에 대한 개별소비세를 설명하시오.', answer: '배기량에 따라 5% 세율이 적용되며, 친환경차는 감면된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 승용자동차에 대한 개별소비세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 대상 차량\n2. 세율\n3. 친환경차 감면\n4. 과세표준\n5. 연습문제 3개' },
    { id: 23, topic: 'special-consumption', question: '석유류에 대한 개별소비세를 설명하시오.', answer: '휘발유, 경유, LPG 등 유종별로 종량세가 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 석유류에 대한 개별소비세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 대상 유종\n2. 종량세율\n3. 탄력세율 적용\n4. 면세유\n5. 연습문제 3개' },
    { id: 24, topic: 'special-consumption', question: '개별소비세 신고·납부 절차를 설명하시오.', answer: '제조자는 매월, 수입자는 수입신고 시 납부한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 개별소비세 신고·납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고 기한\n2. 납부 기한\n3. 수입 시 납부\n4. 가산세\n5. 연습문제 3개' },
    { id: 25, topic: 'special-consumption', question: '보석·귀금속에 대한 개별소비세를 설명하시오.', answer: '개당 500만원 초과 보석·귀금속에 20% 세율이 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 보석·귀금속에 대한 개별소비세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 기준\n2. 과세표준\n3. 세율\n4. 수입 시 과세\n5. 연습문제 3개' },
    { id: 26, topic: 'special-consumption', question: '담배에 대한 개별소비세와 제세금을 설명하시오.', answer: '담배에는 개별소비세, 담배소비세, 국민건강증진부담금 등이 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 담배에 대한 개별소비세와 제세금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별소비세\n2. 담배소비세\n3. 건강증진부담금\n4. 수입담배 과세\n5. 연습문제 3개' },
    { id: 27, topic: 'special-consumption', question: '유흥장소에 대한 개별소비세를 설명하시오.', answer: '카지노, 골프장, 경마장 등 특정 장소 입장에 과세된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 유흥장소에 대한 개별소비세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 장소\n2. 과세표준\n3. 세율\n4. 신고 납부\n5. 연습문제 3개' },
    { id: 28, topic: 'special-consumption', question: '개별소비세 관련 가산세를 설명하시오.', answer: '무신고, 과소신고, 납부불성실, 영수증 미발급 등에 가산세가 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 개별소비세 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고 가산세\n2. 과소신고 가산세\n3. 납부불성실 가산세\n4. 영수증 가산세\n5. 연습문제 3개' },

    // 주세 (29-38)
    { id: 29, topic: 'liquor-tax', question: '주세의 과세대상과 주류의 종류를 설명하시오.', answer: '탁주, 약주, 청주, 맥주, 과실주, 증류주, 리큐르 등이 과세된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주세의 과세대상과 주류의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주류의 정의\n2. 주류 분류\n3. 세율 구조\n4. 알코올도수 기준\n5. 연습문제 3개' },
    { id: 30, topic: 'liquor-tax', question: '수입주류에 대한 주세 과세표준과 세율을 설명하시오.', answer: '과세표준은 CIF + 관세이며, 주류 종류별 세율이 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수입주류에 대한 주세 과세표준과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 계산\n2. 주류별 세율\n3. 교육세 부가\n4. 세액 계산 예시\n5. 연습문제 3개' },
    { id: 31, topic: 'liquor-tax', question: '주세의 면세 대상을 설명하시오.', answer: '수출용, 외교관용, 군용, 제조용 알코올 등이 면세된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주세의 면세 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수출 면세\n2. 외교관 면세\n3. 제조용 면세\n4. 면세 절차\n5. 연습문제 3개' },
    { id: 32, topic: 'liquor-tax', question: '주류 제조면허와 판매면허를 설명하시오.', answer: '주류 제조·판매는 면허가 필요하며, 주종별 면허가 구분된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주류 제조면허와 판매면허를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조면허 종류\n2. 판매면허 종류\n3. 면허 요건\n4. 면허 취소\n5. 연습문제 3개' },
    { id: 33, topic: 'liquor-tax', question: '주세의 납세의무 성립시기와 신고·납부를 설명하시오.', answer: '국내제조는 출고 시, 수입은 수입신고 시 납세의무가 성립한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주세의 납세의무 성립시기와 신고·납부를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성립 시기\n2. 신고 기한\n3. 납부 기한\n4. 수입 시 납부\n5. 연습문제 3개' },
    { id: 34, topic: 'liquor-tax', question: '주류의 미납세반출과 면세반출을 설명하시오.', answer: '제조장 간 이동 시 미납세반출, 면세용도 반출 시 면세반출이 가능하다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주류의 미납세반출과 면세반출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미납세반출 요건\n2. 면세반출 요건\n3. 신고 절차\n4. 사후관리\n5. 연습문제 3개' },
    { id: 35, topic: 'liquor-tax', question: '주세 환급 제도를 설명하시오.', answer: '수출, 위약반품, 변질 등의 경우 주세를 환급받을 수 있다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주세 환급 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급 사유\n2. 환급 절차\n3. 환급 기한\n4. 증빙서류\n5. 연습문제 3개' },
    { id: 36, topic: 'liquor-tax', question: '맥주에 대한 주세를 상세히 설명하시오.', answer: '맥주는 출고가격 기준 72%의 종가세가 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 맥주에 대한 주세를 상세히 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 맥주의 정의\n2. 과세표준\n3. 세율\n4. 수입맥주 과세\n5. 연습문제 3개' },
    { id: 37, topic: 'liquor-tax', question: '증류주에 대한 주세를 설명하시오.', answer: '소주, 위스키, 브랜디 등 증류주에는 72%의 종가세가 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 증류주에 대한 주세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증류주의 정의\n2. 주류 종류\n3. 세율\n4. 수입 증류주 과세\n5. 연습문제 3개' },
    { id: 38, topic: 'liquor-tax', question: '주세 관련 가산세를 설명하시오.', answer: '무면허 제조·판매, 무신고, 과소신고 등에 가산세가 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 주세 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무면허 가산세\n2. 무신고 가산세\n3. 납부불성실 가산세\n4. 영수증 가산세\n5. 연습문제 3개' },

    // 교통에너지세 (39-50)
    { id: 39, topic: 'traffic-energy', question: '교통·에너지·환경세의 과세대상과 세율을 설명하시오.', answer: '휘발유, 경유에 대해 종량세가 부과되며, 도로·환경 투자재원이다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 교통·에너지·환경세의 과세대상과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 대상\n2. 세율 구조\n3. 탄력세율\n4. 용도\n5. 연습문제 3개' },
    { id: 40, topic: 'traffic-energy', question: '교통세의 납세의무자와 납부절차를 설명하시오.', answer: '석유제조업자와 수입자가 납세의무자이며, 제조장 반출 시 납부한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 교통세의 납세의무자와 납부절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자\n2. 성립 시기\n3. 신고·납부\n4. 수입 시 납부\n5. 연습문제 3개' },
    { id: 41, topic: 'traffic-energy', question: '교통세의 면세와 환급을 설명하시오.', answer: '수출용, 외교관용, 농어업용 등은 면세되며, 수출 시 환급된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 교통세의 면세와 환급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면세 대상\n2. 면세 절차\n3. 환급 사유\n4. 환급 절차\n5. 연습문제 3개' },
    { id: 42, topic: 'traffic-energy', question: '교육세의 부과대상과 세율을 설명하시오.', answer: '금융·보험업자, 주세 납부자, 개별소비세 납부자 등이 납부한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 교육세의 부과대상과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 대상\n2. 세율 구조\n3. 주세 부가 교육세\n4. 개소세 부가 교육세\n5. 연습문제 3개' },
    { id: 43, topic: 'traffic-energy', question: '농어촌특별세의 부과대상과 세율을 설명하시오.', answer: '조세감면액, 취득세, 레저세 등에 10~20%가 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 농어촌특별세의 부과대상과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부과 대상\n2. 세율\n3. 관세 감면과의 관계\n4. 납부 절차\n5. 연습문제 3개' },
    { id: 44, topic: 'traffic-energy', question: '수입 시 부과되는 내국세의 종류와 순서를 설명하시오.', answer: '관세 → 개별소비세/주세 → 교육세 → 부가가치세 순으로 계산한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 수입 시 부과되는 내국세의 종류와 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관세\n2. 개별소비세·주세\n3. 교육세\n4. 부가가치세\n5. 연습문제 3개' },
    { id: 45, topic: 'traffic-energy', question: '내국세 세액 계산 종합문제를 풀이하시오.', answer: 'CIF 가격을 기준으로 관세, 개소세, 교육세, 부가세를 순차 계산한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 다음 수입물품의 총 세액을 계산하시오.\n[자료] CIF: $10,000, 환율: 1,300원, 관세율 8%, 개소세율 5%, 교육세율 30%\n\n다음 순서로 풀이해주세요:\n1. 관세 계산\n2. 개별소비세 계산\n3. 교육세 계산\n4. 부가가치세 계산\n5. 총 세액' },
    { id: 46, topic: 'traffic-energy', question: '인지세의 과세문서와 세율을 설명하시오.', answer: '계약서, 어음, 수표 등 특정 문서 작성 시 인지세가 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 인지세의 과세문서와 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 문서\n2. 세율\n3. 납부 방법\n4. 면세 문서\n5. 연습문제 3개' },
    { id: 47, topic: 'traffic-energy', question: '증권거래세의 과세대상과 세율을 설명하시오.', answer: '주권 양도 시 양도가액에 0.23~0.35%의 세율이 적용된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 증권거래세의 과세대상과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 대상\n2. 납세의무자\n3. 세율\n4. 신고·납부\n5. 연습문제 3개' },
    { id: 48, topic: 'traffic-energy', question: '관세 감면 시 농어촌특별세 부과를 설명하시오.', answer: 'FTA 협정세율 적용으로 관세가 감면되면 농특세가 부과된다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 관세 감면 시 농어촌특별세 부과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부과 대상 감면\n2. 세율\n3. 제외 감면\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'traffic-energy', question: '탄력세율 제도를 설명하시오.', answer: '경제 상황에 따라 기본세율의 일정 범위 내에서 세율을 조정한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 탄력세율 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄력세율의 의의\n2. 적용 대상 세목\n3. 조정 범위\n4. 적용 절차\n5. 연습문제 3개' },
    { id: 50, topic: 'traffic-energy', question: '내국소비세법 종합 계산문제를 풀이하시오.', answer: '수입 시 관세와 내국세를 종합적으로 계산하고 세부담을 분석한다.', prompt: '관세사 내국소비세법 문제입니다.\n\n문제: 다음 수입주류의 총 세액을 계산하시오.\n[자료] 위스키, CIF: $5,000, 환율: 1,300원, 관세율 20%, 주세율 72%, 교육세율 30%\n\n다음 순서로 풀이해주세요:\n1. 관세 계산\n2. 주세 과세표준과 세액\n3. 교육세 계산\n4. 부가가치세 계산\n5. 총 세액과 세부담률' },
  ];

  const topics = [
    { id: 'vat', name: '부가가치세', count: 15 },
    { id: 'special-consumption', name: '개별소비세', count: 13 },
    { id: 'liquor-tax', name: '주세', count: 10 },
    { id: 'traffic-energy', name: '교통에너지세', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/customs-broker" className="text-gray-500 hover:text-gray-700">관세사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sky-600 font-medium">내국소비세법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 내국소비세법</h1>
          <p className="text-gray-600">관세사 1차 시험 | 40문항 | 60분</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-sky-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-600 to-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {questions.length} 문항 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedTopics.includes(topic.id) ? '📂' : '📁'}</span>
                  <span className="font-medium text-gray-900">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.count}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(topic.id) ? '▼' : '▶'}</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={completedQuestions.includes(q.id)} onChange={() => toggleQuestion(q.id)} className="mt-1 w-5 h-5 text-sky-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-sky-100 text-sky-600 rounded-lg text-sm hover:bg-sky-200 transition">🤖 AI</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/customs-broker/study/trade-english" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 무역영어</Link>
          <Link href="/category/accounting/customs-broker/study/accounting" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">다음: 회계학 →</Link>
        </div>
      </main>

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
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
