'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BrokerLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['general']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('realtor-broker-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('realtor-broker-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 1. 공인중개사법 총칙 (1-5)
    { id: 1, topic: 'general', question: '공인중개사법의 목적을 설명하시오.', answer: '중개업의 건전한 육성, 부동산 거래질서 확립, 국민 재산권 보호', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 공인중개사법의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 2, topic: 'general', question: '공인중개사법상 중개의 정의를 설명하시오.', answer: '중개대상물에 대해 거래당사자간 매매·교환·임대차 등 알선하는 행위', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 공인중개사법상 중개의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 3, topic: 'general', question: '공인중개사, 중개인, 소속공인중개사의 차이를 설명하시오.', answer: '자격자/개업자/소속자 구분, 각각의 법적 지위 상이', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 공인중개사, 중개인, 소속공인중개사의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 4, topic: 'general', question: '공인중개사법의 적용범위를 설명하시오.', answer: '대한민국 영토 내 모든 중개행위에 적용', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 공인중개사법의 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 5, topic: 'general', question: '중개대상물의 범위를 설명하시오.', answer: '토지, 건축물, 입목, 광업권, 어업권 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개대상물의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 2. 중개사무소 개설등록 (6-10)
    { id: 6, topic: 'registration', question: '중개사무소 개설등록 요건을 설명하시오.', answer: '자격증, 실무교육 이수, 보증설정, 사무소 확보', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개사무소 개설등록 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 7, topic: 'registration', question: '개설등록 결격사유를 설명하시오.', answer: '미성년자, 피성년후견인, 금고 이상 실형, 등록취소 후 3년 미경과 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 개설등록 결격사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 8, topic: 'registration', question: '중개사무소 이전신고 및 휴폐업 신고를 설명하시오.', answer: '이전: 10일 이내 신고, 휴폐업: 30일 이내 신고', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개사무소 이전신고 및 휴폐업 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 9, topic: 'registration', question: '분사무소 설치 요건을 설명하시오.', answer: '주된 사무소와 동일 시·군·구, 소속공인중개사 책임자 배치', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 분사무소 설치 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 10, topic: 'registration', question: '중개법인의 설립 및 등록요건을 설명하시오.', answer: '자본금 5천만원 이상, 대표자·임원 자격요건, 사원 구성', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개법인의 설립 및 등록요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 3. 중개업무 (11-15)
    { id: 11, topic: 'business', question: '중개대상물의 종류와 범위를 설명하시오.', answer: '토지·건축물·입목·광업권·어업권 및 부동산 관련 권리', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개대상물의 종류와 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 12, topic: 'business', question: '중개행위의 범위와 한계를 설명하시오.', answer: '알선 및 대리 가능, 본인행위는 불가', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개행위의 범위와 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 13, topic: 'business', question: '겸업 가능 업무와 금지 업무를 설명하시오.', answer: '부동산 관련 상담·자문 가능, 부동산 투기조장 행위 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 겸업 가능 업무와 금지 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 14, topic: 'business', question: '인장등록 의무를 설명하시오.', answer: '중개행위에 사용할 인장 등록, 변경시 재등록', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 인장등록 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 15, topic: 'business', question: '중개사무소 명칭 사용 규정을 설명하시오.', answer: '부동산중개 또는 공인중개사사무소 명칭 사용, 유사명칭 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개사무소 명칭 사용 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 4. 중개보수 (16-20)
    { id: 16, topic: 'fee', question: '중개보수의 법정 한도를 설명하시오.', answer: '매매·교환: 0.4~0.9%, 임대차: 0.3~0.8% (거래금액별 차등)', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개보수의 법정 한도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 17, topic: 'fee', question: '중개보수 청구권 발생시기를 설명하시오.', answer: '거래계약 성립시 보수청구권 발생', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개보수 청구권 발생시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 18, topic: 'fee', question: '실비의 범위와 청구를 설명하시오.', answer: '현장안내비, 계약서 작성비 등 실제 소요비용', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 실비의 범위와 청구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 19, topic: 'fee', question: '초과보수 수령 금지 및 제재를 설명하시오.', answer: '한도초과 보수 수령시 500만원 이하 과태료', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 초과보수 수령 금지 및 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 20, topic: 'fee', question: '주택 거래금액별 보수요율을 설명하시오.', answer: '5천만원 미만 0.6%, 2억원 이상~9억원 미만 0.5% 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 주택 거래금액별 보수요율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 5. 금지행위 (21-25)
    { id: 21, topic: 'prohibition', question: '직거래 유도 금지를 설명하시오.', answer: '중개의뢰인과 직접 거래 또는 다른 개업공인중개사 배제 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 직거래 유도 금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 22, topic: 'prohibition', question: '쌍방대리 금지를 설명하시오.', answer: '동일 거래에서 매도인·매수인 양측 대리 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 쌍방대리 금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 23, topic: 'prohibition', question: '탈세 방조행위 금지를 설명하시오.', answer: '거래금액 거짓 기재, 이중계약서 작성 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 탈세 방조행위 금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 24, topic: 'prohibition', question: '시세 조작 금지행위를 설명하시오.', answer: '허위 매물 광고, 가격 담합 등 시세 교란행위 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 시세 조작 금지행위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 25, topic: 'prohibition', question: '중개대상물 표시·광고 규정을 설명하시오.', answer: '소재지·면적·가격 등 명시, 허위·과장광고 금지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개대상물 표시·광고 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 6. 손해배상책임 (26-30)
    { id: 26, topic: 'liability', question: '손해배상책임 보장제도를 설명하시오.', answer: '보증보험, 공제, 공탁 중 선택하여 손해배상 보장', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 손해배상책임 보장제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 27, topic: 'liability', question: '보증보험 가입의무를 설명하시오.', answer: '개인: 1억원, 법인: 2억원 이상 보증보험 가입', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 보증보험 가입의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 28, topic: 'liability', question: '공제제도의 내용을 설명하시오.', answer: '협회 공제사업 가입으로 보증보험 대체 가능', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 공제제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 29, topic: 'liability', question: '손해배상책임의 범위를 설명하시오.', answer: '중개행위로 인한 재산상 손해, 고의·과실 필요', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 손해배상책임의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 30, topic: 'liability', question: '중개법인의 손해배상책임을 설명하시오.', answer: '법인과 임원의 연대책임, 보증금액 2억원 이상', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개법인의 손해배상책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 7. 중개계약 (31-35)
    { id: 31, topic: 'contract', question: '일반중개계약의 특징을 설명하시오.', answer: '복수의 개업공인중개사에 동시 의뢰 가능', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 일반중개계약의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 32, topic: 'contract', question: '전속중개계약의 특징을 설명하시오.', answer: '단독 중개권 부여, 정보공개 의무, 유효기간 3개월', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 전속중개계약의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 33, topic: 'contract', question: '중개계약서의 기재사항을 설명하시오.', answer: '대상물 표시, 보수, 유효기간, 당사자 정보 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개계약서의 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 34, topic: 'contract', question: '중개의뢰인의 권리와 의무를 설명하시오.', answer: '정보제공 의무, 보수지급 의무, 확인설명 요구 권리', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개의뢰인의 권리와 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 35, topic: 'contract', question: '중개계약의 해제와 해지를 설명하시오.', answer: '합의해제, 법정해제, 유효기간 만료에 의한 종료', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개계약의 해제와 해지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 8. 부동산거래신고법 (36-40)
    { id: 36, topic: 'report', question: '부동산거래신고 의무를 설명하시오.', answer: '계약체결일로부터 30일 이내 신고, 공동신고 원칙', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 부동산거래신고 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 37, topic: 'report', question: '부동산거래신고 절차를 설명하시오.', answer: '관할 시·군·구청 신고, 온라인 신고 가능', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 부동산거래신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 38, topic: 'report', question: '외국인 부동산취득 신고를 설명하시오.', answer: '취득일로부터 60일 이내 신고, 허가구역 사전허가', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 외국인 부동산취득 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 39, topic: 'report', question: '토지거래허가제도를 설명하시오.', answer: '허가구역 내 일정규모 이상 토지거래시 허가 필요', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 토지거래허가제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 40, topic: 'report', question: '부동산거래신고 위반시 제재를 설명하시오.', answer: '미신고·허위신고시 500만원~3천만원 과태료', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 부동산거래신고 위반시 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 9. 행정처분 (41-45)
    { id: 41, topic: 'sanction', question: '자격취소 사유를 설명하시오.', answer: '부정행위 합격, 자격증 대여, 결격사유 발생 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 자격취소 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 42, topic: 'sanction', question: '등록취소 사유를 설명하시오.', answer: '결격사유, 이중등록, 업무정지 중 영업, 정당한 사유 없이 휴업 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 등록취소 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 43, topic: 'sanction', question: '업무정지 사유와 기간을 설명하시오.', answer: '금지행위, 의무 위반시 6개월 이내 업무정지', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 업무정지 사유와 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 44, topic: 'sanction', question: '과태료 부과 대상을 설명하시오.', answer: '신고의무 위반, 게시의무 위반, 서류보존 위반 등', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 과태료 부과 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 45, topic: 'sanction', question: '행정처분의 기준과 절차를 설명하시오.', answer: '위반 횟수·정도에 따라 가중·감경, 청문절차 필요', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 행정처분의 기준과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },

    // 10. 중개실무 (46-50)
    { id: 46, topic: 'practice', question: '중개대상물 확인·설명의무를 설명하시오.', answer: '권리관계, 이용제한, 공법상 제한 등 성실히 확인·설명', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개대상물 확인·설명의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 47, topic: 'practice', question: '확인·설명서 작성 및 교부의무를 설명하시오.', answer: '서면 작성, 서명·날인, 거래당사자에게 교부', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 확인·설명서 작성 및 교부의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 48, topic: 'practice', question: '거래계약서 작성요령을 설명하시오.', answer: '거래금액, 대상물 표시, 특약사항, 당사자 서명·날인', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 거래계약서 작성요령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 49, topic: 'practice', question: '거래대금 수수 실무를 설명하시오.', answer: '계약금-중도금-잔금 순서, 영수증 발급, 대금 예치', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 거래대금 수수 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
    { id: 50, topic: 'practice', question: '중개대장 작성 및 보존의무를 설명하시오.', answer: '거래내역 기록, 5년간 보존의무', prompt: '공인중개사 공인중개사법령 문제입니다.\n\n문제: 중개대장 작성 및 보존의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 실무 적용\n4. 위반시 제재\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'general', name: '공인중개사법 총칙', icon: '📜', count: 5 },
    { id: 'registration', name: '중개사무소 개설등록', icon: '🏢', count: 5 },
    { id: 'business', name: '중개업무', icon: '💼', count: 5 },
    { id: 'fee', name: '중개보수', icon: '💰', count: 5 },
    { id: 'prohibition', name: '금지행위', icon: '🚫', count: 5 },
    { id: 'liability', name: '손해배상책임', icon: '🛡️', count: 5 },
    { id: 'contract', name: '중개계약', icon: '📋', count: 5 },
    { id: 'report', name: '부동산거래신고법', icon: '📝', count: 5 },
    { id: 'sanction', name: '행정처분', icon: '⚖️', count: 5 },
    { id: 'practice', name: '중개실무', icon: '🖊️', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-500 hover:text-gray-700">공인중개사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">공인중개사법령</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">⚖️</div>
            <div>
              <h1 className="text-2xl font-bold">공인중개사법령</h1>
              <p className="text-teal-100">2차 시험 | 중개업법, 부동산거래신고, 중개실무</p>
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
                    ? 'bg-teal-100 border-2 border-teal-300'
                    : 'bg-white border border-gray-200 hover:border-teal-200'
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
                              ? 'bg-teal-500 border-teal-500 text-white'
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
                              className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0"
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
          <Link href="/category/finance/real-estate-agent" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 공인중개사 메인
          </Link>
          <Link href="/category/finance/real-estate-agent/study/public-law" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            부동산공법 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인중개사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
