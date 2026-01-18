'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CustomsLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['customs-general']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-customs-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-customs-law-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 관세법총칙 (1-12)
    { id: 1, topic: 'customs-general', question: '관세의 의의와 기능을 설명하시오.', answer: '관세는 수입물품에 부과되는 세금으로, 재정수입 확보와 국내산업 보호 기능을 한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세의 의의와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관세의 정의\n2. 재정수입 기능\n3. 국내산업 보호 기능\n4. 통상정책 수단\n5. 연습문제 3개' },
    { id: 2, topic: 'customs-general', question: '관세의 과세요건(납세의무자, 과세물건, 과세표준, 세율)을 설명하시오.', answer: '납세의무자는 수입신고인, 과세물건은 수입물품, 과세표준은 과세가격, 세율은 관세율표에 따른다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세의 과세요건(납세의무자, 과세물건, 과세표준, 세율)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자의 범위\n2. 과세물건의 확정\n3. 과세표준의 결정\n4. 세율의 적용\n5. 연습문제 3개' },
    { id: 3, topic: 'customs-general', question: '관세법의 적용범위와 효력을 설명하시오.', answer: '관세법은 우리나라에 수입되는 모든 물품에 적용되며, 영해와 배타적 경제수역에도 적용된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세법의 적용범위와 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장소적 적용범위\n2. 물적 적용범위\n3. 시간적 효력\n4. 조약과의 관계\n5. 연습문제 3개' },
    { id: 4, topic: 'customs-general', question: '관세율의 종류(기본세율, 탄력세율, 협정세율)를 비교하시오.', answer: '기본세율은 관세법 별표, 탄력세율은 국민경제 조절용, 협정세율은 조약에 따른 세율이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세율의 종류(기본세율, 탄력세율, 협정세율)를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기본세율의 의의\n2. 탄력세율의 종류와 목적\n3. 협정세율과 FTA\n4. 세율 적용 우선순위\n5. 연습문제 3개' },
    { id: 5, topic: 'customs-general', question: '납세의무의 성립과 확정시기를 설명하시오.', answer: '납세의무는 수입신고 수리시 성립하고, 신고납부 또는 부과고지에 의해 확정된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 납세의무의 성립과 확정시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무 성립시기\n2. 신고납부에 의한 확정\n3. 부과고지에 의한 확정\n4. 예외적 성립시기\n5. 연습문제 3개' },
    { id: 6, topic: 'customs-general', question: '세관장의 직권정정과 경정청구를 비교하시오.', answer: '직권정정은 세관장이 직권으로, 경정청구는 납세자가 신청하여 세액을 조정하는 제도이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 세관장의 직권정정과 경정청구를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 직권정정의 사유\n2. 경정청구의 요건\n3. 경정청구 기한\n4. 불복절차\n5. 연습문제 3개' },
    { id: 7, topic: 'customs-general', question: '관세의 부과제척기간과 징수권 소멸시효를 설명하시오.', answer: '부과제척기간은 5년(사기 등 7년), 징수권 소멸시효는 5년이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세의 부과제척기간과 징수권 소멸시효를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부과제척기간의 원칙\n2. 제척기간의 특례\n3. 징수권 소멸시효\n4. 시효의 중단과 정지\n5. 연습문제 3개' },
    { id: 8, topic: 'customs-general', question: '관세의 납부와 징수 절차를 설명하시오.', answer: '납세고지서에 따라 납부기한 내에 납부하며, 미납시 강제징수 절차를 진행한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세의 납부와 징수 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납부기한\n2. 분할납부와 납기연장\n3. 강제징수 절차\n4. 가산금과 중가산금\n5. 연습문제 3개' },
    { id: 9, topic: 'customs-general', question: '담보의 제공과 관세우선권을 설명하시오.', answer: '담보는 관세채권을 담보하며, 관세는 다른 채권에 우선하여 징수된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 담보의 제공과 관세우선권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 담보의 종류\n2. 담보 제공 사유\n3. 관세우선권의 범위\n4. 우선권의 예외\n5. 연습문제 3개' },
    { id: 10, topic: 'customs-general', question: '관세범 처벌규정의 종류를 설명하시오.', answer: '밀수입죄, 밀수출죄, 관세포탈죄, 부정수입죄 등이 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세범 처벌규정의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 밀수입죄\n2. 관세포탈죄\n3. 허위신고죄\n4. 양벌규정\n5. 연습문제 3개' },
    { id: 11, topic: 'customs-general', question: '관세불복제도(이의신청, 심사청구, 심판청구)를 설명하시오.', answer: '처분에 불복하는 경우 이의신청, 심사청구, 심판청구를 거쳐 행정소송을 제기할 수 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세불복제도(이의신청, 심사청구, 심판청구)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이의신청 절차\n2. 심사청구 절차\n3. 심판청구 절차\n4. 행정소송과의 관계\n5. 연습문제 3개' },
    { id: 12, topic: 'customs-general', question: '관세사의 업무범위와 자격요건을 설명하시오.', answer: '관세사는 수출입통관, 관세환급, 이의신청 대리 등의 업무를 수행하며, 자격시험에 합격해야 한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세사의 업무범위와 자격요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관세사의 업무범위\n2. 자격시험 제도\n3. 등록 및 결격사유\n4. 윤리의무\n5. 연습문제 3개' },

    // 수출입통관 (13-25)
    { id: 13, topic: 'import-export', question: '수입통관 절차를 순서대로 설명하시오.', answer: '물품반입 → 수입신고 → 신고심사 → 물품검사 → 신고수리 → 물품반출 순서이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수입통관 절차를 순서대로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물품반입과 보세구역\n2. 수입신고 방법\n3. 신고심사와 물품검사\n4. 신고수리와 물품반출\n5. 연습문제 3개' },
    { id: 14, topic: 'import-export', question: '수입신고의 시기와 방법을 설명하시오.', answer: '물품이 보세구역에 장치된 후 신고하며, 출항전 신고, 입항전 신고도 가능하다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수입신고의 시기와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원칙적 신고시기\n2. 출항전 수입신고\n3. 입항전 수입신고\n4. 보세구역 도착전 신고\n5. 연습문제 3개' },
    { id: 15, topic: 'import-export', question: '물품검사의 종류와 절차를 설명하시오.', answer: '서류심사, 물품검사(발췌검사, 전량검사), 현품확인 등이 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 물품검사의 종류와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서류심사\n2. 물품검사 대상 선정\n3. 검사 방법\n4. 검사생략\n5. 연습문제 3개' },
    { id: 16, topic: 'import-export', question: '수출통관 절차와 수출신고 방법을 설명하시오.', answer: '수출신고 후 신고수리를 받아 물품을 적재하며, 적재지 또는 생산지에서 신고 가능하다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수출통관 절차와 수출신고 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수출신고 시기\n2. 신고 장소\n3. 신고수리\n4. 적재기한\n5. 연습문제 3개' },
    { id: 17, topic: 'import-export', question: '보세운송의 의의와 절차를 설명하시오.', answer: '외국물품을 관세 납부 없이 국내 운송하는 것으로, 보세운송 신고가 필요하다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 보세운송의 의의와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보세운송의 의의\n2. 신고 및 승인\n3. 운송기간과 경로\n4. 담보 제공\n5. 연습문제 3개' },
    { id: 18, topic: 'import-export', question: '보세구역의 종류와 기능을 설명하시오.', answer: '지정보세구역, 특허보세구역, 종합보세구역이 있으며, 외국물품 장치와 보관 기능을 한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 보세구역의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지정보세구역\n2. 특허보세구역(보세창고, 보세공장 등)\n3. 종합보세구역\n4. 보세구역 외 장치\n5. 연습문제 3개' },
    { id: 19, topic: 'import-export', question: '보세공장의 기능과 운영절차를 설명하시오.', answer: '외국물품을 원재료로 하여 제조·가공할 수 있는 특허보세구역이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 보세공장의 기능과 운영절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보세공장의 의의\n2. 설치 요건\n3. 사용신고와 반입신고\n4. 제품 반출\n5. 연습문제 3개' },
    { id: 20, topic: 'import-export', question: '수입물품의 과세가격 결정방법을 설명하시오.', answer: '거래가격을 기본으로 하되, 적용이 불가한 경우 대체평가방법을 순차 적용한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수입물품의 과세가격 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1방법(거래가격)\n2. 가산요소와 공제요소\n3. 대체평가방법\n4. 잠정가격 신고\n5. 연습문제 3개' },
    { id: 21, topic: 'import-export', question: '품목분류(HS코드)의 체계와 해석원칙을 설명하시오.', answer: 'HS코드는 6단위 국제통일체계이며, 통칙에 따라 분류한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 품목분류(HS코드)의 체계와 해석원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HS협약과 구조\n2. 품목분류 통칙\n3. 류주와 호주\n4. 품목분류 사전심사\n5. 연습문제 3개' },
    { id: 22, topic: 'import-export', question: '수입신고 오류정정과 수정수입세금계산서 발급을 설명하시오.', answer: '신고수리 후 오류 발견 시 정정신청을 하고, 세액 변동 시 수정세금계산서를 발급한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수입신고 오류정정과 수정수입세금계산서 발급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정정신청 사유\n2. 정정 절차\n3. 수정세금계산서 발급\n4. 가산세 적용\n5. 연습문제 3개' },
    { id: 23, topic: 'import-export', question: '간이통관 제도의 적용대상과 절차를 설명하시오.', answer: '소액물품, 여행자휴대품 등에 간이한 절차를 적용하여 신속히 통관한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 간이통관 제도의 적용대상과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간이통관 대상\n2. 목록통관\n3. 간이수입신고\n4. 면세 한도\n5. 연습문제 3개' },
    { id: 24, topic: 'import-export', question: '특송물품의 통관특례를 설명하시오.', answer: '특송업체가 일괄하여 수입신고하고, 간이한 절차로 신속 통관된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 특송물품의 통관특례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특송업체 등록\n2. 목록통관과 신고통관\n3. 과세가격 결정\n4. 면세 범위\n5. 연습문제 3개' },
    { id: 25, topic: 'import-export', question: '통관보류와 수입금지 물품을 설명하시오.', answer: '법령 위반 우려 물품은 통관을 보류하고, 공공질서 해치는 물품은 수입이 금지된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 통관보류와 수입금지 물품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통관보류 사유\n2. 수입금지 물품\n3. 지식재산권 보호\n4. 이의제기 절차\n5. 연습문제 3개' },

    // 관세감면환급 (26-38)
    { id: 26, topic: 'exemption-refund', question: '관세감면의 종류와 요건을 설명하시오.', answer: '무조건 면세, 조건부 면세, 감세, 분할납부 등이 있으며 각각의 요건이 다르다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세감면의 종류와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무조건 면세(외교관 면세 등)\n2. 조건부 감면세\n3. 용도세율 적용\n4. 감면 사후관리\n5. 연습문제 3개' },
    { id: 27, topic: 'exemption-refund', question: '재수출 면세와 재수출 감세를 비교하시오.', answer: '재수출 면세는 전액 면제, 재수출 감세는 일정비율 감세하며 재수출 기간이 다르다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 재수출 면세와 재수출 감세를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 재수출 면세 대상\n2. 재수출 감세 대상\n3. 재수출 기간\n4. 담보 제공\n5. 연습문제 3개' },
    { id: 28, topic: 'exemption-refund', question: '학술연구용품 감면세 제도를 설명하시오.', answer: '학교, 연구기관 등이 수입하는 학술연구용품에 대해 관세를 감면한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 학술연구용품 감면세 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감면대상 기관\n2. 감면대상 물품\n3. 감면율\n4. 용도외 사용 시 추징\n5. 연습문제 3개' },
    { id: 29, topic: 'exemption-refund', question: '관세환급의 종류와 환급절차를 설명하시오.', answer: '개별환급, 간이정액환급, 기초원재료 납부세액증명 환급 등이 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 관세환급의 종류와 환급절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별환급 제도\n2. 간이정액환급\n3. 기초원재료 납부세액증명\n4. 환급 신청 기한\n5. 연습문제 3개' },
    { id: 30, topic: 'exemption-refund', question: '수출용원재료 관세환급 제도의 구조를 설명하시오.', answer: '수출물품 제조에 사용된 원재료의 관세를 환급하여 수출경쟁력을 지원한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수출용원재료 관세환급 제도의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급 대상\n2. 소요량 계산\n3. 환급금 산출\n4. 환급 제한\n5. 연습문제 3개' },
    { id: 31, topic: 'exemption-refund', question: '간이정액환급 제도의 적용대상과 계산방법을 설명하시오.', answer: '중소기업이 수출하는 경우 간이정액환급률표에 따라 환급한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 간이정액환급 제도의 적용대상과 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상 기업\n2. 환급률표 구조\n3. 환급금 계산\n4. 개별환급과의 선택\n5. 연습문제 3개' },
    { id: 32, topic: 'exemption-refund', question: '위약물품 관세 환급을 설명하시오.', answer: '계약과 다른 물품이 수입된 경우 수출 또는 폐기 시 관세를 환급받는다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 위약물품 관세 환급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위약물품의 정의\n2. 환급 요건\n3. 환급 절차\n4. 환급 기한\n5. 연습문제 3개' },
    { id: 33, topic: 'exemption-refund', question: '과오납금 환급 절차를 설명하시오.', answer: '착오 또는 오류로 과다 납부된 관세는 경정청구 또는 직권으로 환급된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 과오납금 환급 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과오납의 정의\n2. 환급 청구\n3. 환급 기한\n4. 환급가산금\n5. 연습문제 3개' },
    { id: 34, topic: 'exemption-refund', question: '수출이행 확인과 환급금 추징을 설명하시오.', answer: '환급받은 후 수출이행을 하지 않으면 환급금을 추징한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 수출이행 확인과 환급금 추징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수출이행 기간\n2. 이행 확인 방법\n3. 추징 사유\n4. 가산금 부과\n5. 연습문제 3개' },
    { id: 35, topic: 'exemption-refund', question: '감면물품의 용도외 사용 시 추징을 설명하시오.', answer: '조건부 감면받은 물품을 용도외 사용 시 감면세액을 추징한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 감면물품의 용도외 사용 시 추징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용도외 사용의 정의\n2. 추징 대상\n3. 추징세액 계산\n4. 사후관리 제도\n5. 연습문제 3개' },
    { id: 36, topic: 'exemption-refund', question: '외국인투자 관세감면을 설명하시오.', answer: '외국인투자기업이 수입하는 자본재에 대해 관세를 감면한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 외국인투자 관세감면을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감면 대상 기업\n2. 감면 대상 물품\n3. 감면 한도\n4. 사후관리\n5. 연습문제 3개' },
    { id: 37, topic: 'exemption-refund', question: '여행자 휴대품 면세 범위를 설명하시오.', answer: '기본면세 범위(800달러)와 주류, 담배, 향수의 별도 면세 한도가 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 여행자 휴대품 면세 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본 면세 한도\n2. 주류·담배 면세\n3. 향수 면세\n4. 자진신고 혜택\n5. 연습문제 3개' },
    { id: 38, topic: 'exemption-refund', question: '이사물품과 별송품의 면세 요건을 설명하시오.', answer: '해외체류 기간과 목적에 따라 이사물품 면세 혜택이 달라진다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 이사물품과 별송품의 면세 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사물품의 정의\n2. 면세 요건\n3. 별송품 신고\n4. 과세 물품\n5. 연습문제 3개' },

    // FTA특례법 (39-50)
    { id: 39, topic: 'fta-special', question: 'FTA의 의의와 종류를 설명하시오.', answer: 'FTA는 체약국 간 관세철폐 및 무역장벽 완화를 위한 협정으로, 양자·다자 FTA가 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: FTA의 의의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FTA의 정의\n2. 양자 FTA\n3. 다자 FTA(RCEP 등)\n4. 한국 발효 FTA 현황\n5. 연습문제 3개' },
    { id: 40, topic: 'fta-special', question: 'FTA 협정세율 적용 요건을 설명하시오.', answer: '원산지 기준 충족, 원산지증명서 구비, 직접운송 원칙 준수가 필요하다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: FTA 협정세율 적용 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원산지 기준\n2. 원산지증명서\n3. 직접운송 원칙\n4. 협정별 특례\n5. 연습문제 3개' },
    { id: 41, topic: 'fta-special', question: '원산지 결정기준(완전생산기준, 실질적변형기준)을 설명하시오.', answer: '완전생산기준은 체약국에서 전부 생산, 실질적변형기준은 세번변경 또는 부가가치 기준이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 원산지 결정기준(완전생산기준, 실질적변형기준)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완전생산기준\n2. 세번변경기준(CC, CTH, CTSH)\n3. 부가가치기준(RVC)\n4. 특정공정기준\n5. 연습문제 3개' },
    { id: 42, topic: 'fta-special', question: '원산지증명서의 종류와 발급절차를 설명하시오.', answer: '기관발급과 자율발급이 있으며, 협정별로 발급기관과 양식이 다르다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 원산지증명서의 종류와 발급절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기관발급 원산지증명서\n2. 자율발급(인증수출자)\n3. 발급기관\n4. 유효기간\n5. 연습문제 3개' },
    { id: 43, topic: 'fta-special', question: '인증수출자 제도를 설명하시오.', answer: '원산지관리능력을 인증받은 수출자가 직접 원산지증명서를 발급하는 제도이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 인증수출자 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인증수출자의 의의\n2. 업체별·품목별 인증\n3. 인증 요건\n4. 갱신과 취소\n5. 연습문제 3개' },
    { id: 44, topic: 'fta-special', question: '직접운송 원칙과 예외를 설명하시오.', answer: '원산지 물품은 체약국 간 직접 운송되어야 하며, 환적 시 예외가 적용된다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 직접운송 원칙과 예외를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접운송의 의의\n2. 예외 사유(환적, 일시장치)\n3. 입증서류\n4. 협정별 차이\n5. 연습문제 3개' },
    { id: 45, topic: 'fta-special', question: '원산지검증 절차와 대응방법을 설명하시오.', answer: '수입국이 원산지를 검증하며, 서면검증, 방문검증 등의 방법이 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 원산지검증 절차와 대응방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검증의 종류\n2. 간접검증과 직접검증\n3. 검증 대응\n4. 불이익 처분\n5. 연습문제 3개' },
    { id: 46, topic: 'fta-special', question: '원산지 사전심사 제도를 설명하시오.', answer: '수입 전에 원산지를 미리 심사받아 협정세율 적용 여부를 확인하는 제도이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 원산지 사전심사 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전심사의 의의\n2. 신청 절차\n3. 효력과 유효기간\n4. 변경과 취소\n5. 연습문제 3개' },
    { id: 47, topic: 'fta-special', question: '누적기준의 종류와 적용방법을 설명하시오.', answer: '양자누적, 완전누적, 교차누적이 있으며 협정별로 적용 범위가 다르다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 누적기준의 종류와 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양자누적\n2. 완전누적\n3. 교차누적\n4. 협정별 누적기준\n5. 연습문제 3개' },
    { id: 48, topic: 'fta-special', question: '미소기준(De Minimis)을 설명하시오.', answer: '비원산지 재료의 비중이 일정 비율 이하이면 원산지로 인정하는 기준이다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 미소기준(De Minimis)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미소기준의 의의\n2. 적용 비율\n3. 협정별 차이\n4. 섬유의 특례\n5. 연습문제 3개' },
    { id: 49, topic: 'fta-special', question: '원산지증빙서류 보관의무를 설명하시오.', answer: '수출입자는 원산지증명서류를 5년간 보관해야 하며, 검증 시 제출해야 한다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: 원산지증빙서류 보관의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보관의무 대상\n2. 보관 기간\n3. 보관 서류 종류\n4. 위반 시 제재\n5. 연습문제 3개' },
    { id: 50, topic: 'fta-special', question: 'FTA 특례법 위반 시 제재를 설명하시오.', answer: '허위 원산지증명 시 과태료, 형사처벌, 인증 취소 등의 제재가 있다.', prompt: '관세사 관세법개론 문제입니다.\n\n문제: FTA 특례법 위반 시 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과태료 부과\n2. 형사처벌\n3. 인증수출자 취소\n4. 관세 추징\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'customs-general', name: '관세법총칙', count: 12 },
    { id: 'import-export', name: '수출입통관', count: 13 },
    { id: 'exemption-refund', name: '관세감면환급', count: 13 },
    { id: 'fta-special', name: 'FTA특례법', count: 12 },
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
            <span className="text-sky-600 font-medium">관세법개론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📜 관세법개론</h1>
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
          <Link href="/category/accounting/customs-broker/exam" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 시험정보</Link>
          <Link href="/category/accounting/customs-broker/study/trade-english" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">다음: 무역영어 →</Link>
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
