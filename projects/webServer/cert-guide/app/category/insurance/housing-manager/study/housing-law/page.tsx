'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function HousingLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('housing-law-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('housing-law-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '공동주택관리법 총칙',
      questions: [
        { id: 1, question: '공동주택관리법의 목적과 적용대상을 설명하시오.', answer: '공동주택을 투명·효율적으로 관리하여 주거생활 질 향상, 300세대 이상 또는 승강기설치 등 일정 기준 충족 공동주택 적용', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공동주택관리법의 목적과 적용대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 적용대상 기준\n3. 의무관리대상\n4. 제외대상\n5. 연습문제 3개' },
        { id: 2, question: '의무관리대상 공동주택의 기준을 설명하시오.', answer: '300세대 이상, 150세대 이상으로 승강기/중앙난방 설치, 주상복합 300세대 이상', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 의무관리대상 공동주택의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의무관리대상 요건\n2. 세대수 기준\n3. 설비 기준\n4. 주상복합 기준\n5. 연습문제 3개' },
        { id: 3, question: '관리주체의 종류와 업무를 설명하시오.', answer: '자치관리기구, 위탁관리업자, 관리사무소장이 관리주체', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리주체의 종류와 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리주체의 정의\n2. 자치관리\n3. 위탁관리\n4. 관리주체의 업무\n5. 연습문제 3개' },
        { id: 4, question: '공동주택의 관리방법 결정절차를 설명하시오.', answer: '사업주체→입주자대표회의 구성→관리방법 결정(자치/위탁)', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공동주택의 관리방법 결정절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초 관리방법\n2. 입주자대표회의 구성 후\n3. 관리방법 변경\n4. 의결 정족수\n5. 연습문제 3개' },
        { id: 5, question: '공동주택 용어의 정의를 설명하시오.', answer: '입주자, 사용자, 입주자등, 관리비, 사용료, 장기수선충당금 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공동주택 용어의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입주자와 사용자 구분\n2. 입주자등의 범위\n3. 관리비와 사용료\n4. 장기수선충당금\n5. 연습문제 3개' },
        { id: 6, question: '주택관리업의 등록요건을 설명하시오.', answer: '자본금, 기술인력, 사무실 등 요건 갖추어 시도지사에 등록', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 주택관리업의 등록요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록 요건\n2. 자본금 기준\n3. 기술인력 기준\n4. 등록절차\n5. 연습문제 3개' },
        { id: 7, question: '주택관리사(보)의 결격사유를 설명하시오.', answer: '피성년후견인, 파산선고 후 복권되지 않은 자, 금고 이상 형 집행 후 2년 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 주택관리사(보)의 결격사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결격사유 종류\n2. 피성년후견인\n3. 형사처벌 관련\n4. 자격취소 후 제한\n5. 연습문제 3개' },
        { id: 8, question: '관리사무소장의 자격과 배치기준을 설명하시오.', answer: '주택관리사(보) 자격자로 500세대 이상 의무배치', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리사무소장의 자격과 배치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리사무소장 자격\n2. 배치 기준\n3. 겸직 제한\n4. 신고 의무\n5. 연습문제 3개' },
        { id: 9, question: '주택관리사(보) 자격의 취소·정지 사유를 설명하시오.', answer: '거짓으로 자격취득, 부정행위, 타인에게 명의대여 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 주택관리사(보) 자격의 취소·정지 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취소 사유\n2. 정지 사유\n3. 청문 절차\n4. 재취득 제한\n5. 연습문제 3개' },
        { id: 10, question: '공동주택관리 분쟁조정위원회의 역할을 설명하시오.', answer: '관리 관련 분쟁을 조정, 시도지사 소속 분쟁조정위원회 설치', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공동주택관리 분쟁조정위원회의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분쟁조정위원회 구성\n2. 조정 대상\n3. 조정 절차\n4. 조정의 효력\n5. 연습문제 3개' }
      ]
    },
    {
      name: '입주자대표회의',
      questions: [
        { id: 11, question: '입주자대표회의의 구성과 운영을 설명하시오.', answer: '동별 대표자로 구성, 회장·이사·감사 선출, 정기회의 및 임시회의', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 입주자대표회의의 구성과 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성요건\n2. 동별 대표자 선출\n3. 임원 구성\n4. 회의 운영\n5. 연습문제 3개' },
        { id: 12, question: '동별 대표자의 자격과 선출방법을 설명하시오.', answer: '해당 동 입주자(소유자 또는 배우자) 중 선거, 임기 2년', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 동별 대표자의 자격과 선출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자격요건\n2. 결격사유\n3. 선출방법\n4. 임기와 연임\n5. 연습문제 3개' },
        { id: 13, question: '입주자대표회의의 의결사항을 설명하시오.', answer: '관리규약 개정, 관리비 예산, 관리방법 결정, 공사업자 선정 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 입주자대표회의의 의결사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의결사항 종류\n2. 의결정족수\n3. 서면결의\n4. 의결효력\n5. 연습문제 3개' },
        { id: 14, question: '입주자대표회의 회장의 권한과 의무를 설명하시오.', answer: '대표회의 대표, 회의 소집, 관리규약 준수 의무', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 입주자대표회의 회장의 권한과 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회장의 지위\n2. 권한\n3. 의무\n4. 해임 사유\n5. 연습문제 3개' },
        { id: 15, question: '감사의 역할과 권한을 설명하시오.', answer: '관리비 등 회계감사, 업무감사, 감사보고서 제출', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 감사의 역할과 권한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사의 자격\n2. 감사 권한\n3. 감사 의무\n4. 감사보고서\n5. 연습문제 3개' },
        { id: 16, question: '동별 대표자의 해임절차를 설명하시오.', answer: '해당 동 입주자등 과반수 서면동의로 해임', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 동별 대표자의 해임절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해임 사유\n2. 해임 절차\n3. 의결 정족수\n4. 궐위 시 조치\n5. 연습문제 3개' },
        { id: 17, question: '선거관리위원회의 구성과 역할을 설명하시오.', answer: '입주자대표회의 구성원 등 선거관리 위해 설치', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 선거관리위원회의 구성과 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 의무\n2. 위원 구성\n3. 업무 범위\n4. 운영 방법\n5. 연습문제 3개' },
        { id: 18, question: '입주자대표회의 의결의 하자를 설명하시오.', answer: '소집절차 위반, 정족수 미달, 이해충돌 등으로 무효·취소', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 입주자대표회의 의결의 하자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무효 사유\n2. 취소 사유\n3. 하자 주장 방법\n4. 관련 판례\n5. 연습문제 3개' },
        { id: 19, question: '관리규약의 준칙과 제정절차를 설명하시오.', answer: '국토부 표준관리규약 참고, 입주자등 과반수 서면동의로 제정', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리규약의 준칙과 제정절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준관리규약\n2. 제정 절차\n3. 필수 포함사항\n4. 개정 절차\n5. 연습문제 3개' },
        { id: 20, question: '입주자등의 권리와 의무를 설명하시오.', answer: '공동주택 사용권, 관리비 납부의무, 층간소음 방지의무 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 입주자등의 권리와 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입주자등의 권리\n2. 입주자등의 의무\n3. 위반 시 제재\n4. 분쟁해결\n5. 연습문제 3개' }
      ]
    },
    {
      name: '관리비와 회계',
      questions: [
        { id: 21, question: '관리비의 구성항목을 설명하시오.', answer: '일반관리비, 청소비, 경비비, 수선유지비, 승강기유지비, 공용전기료 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리비의 구성항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리비 항목\n2. 각 항목의 정의\n3. 부과 기준\n4. 공개 의무\n5. 연습문제 3개' },
        { id: 22, question: '사용료의 종류와 부과방법을 설명하시오.', answer: '전기료, 수도료, 가스료, 난방비, 급탕비 등 실사용량 기준 부과', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 사용료의 종류와 부과방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용료 항목\n2. 부과 기준\n3. 검침 방법\n4. 정산\n5. 연습문제 3개' },
        { id: 23, question: '장기수선충당금의 적립과 사용을 설명하시오.', answer: '장기수선계획에 따라 매월 적립, 계획수선에만 사용', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 장기수선충당금의 적립과 사용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적립 의무\n2. 적립 기준\n3. 사용 범위\n4. 정산과 승계\n5. 연습문제 3개' },
        { id: 24, question: '관리비 부과내역 공개의무를 설명하시오.', answer: '인터넷 홈페이지, 관리비고지서를 통해 항목별 공개', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리비 부과내역 공개의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공개 항목\n2. 공개 방법\n3. 공개 주기\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 25, question: '회계처리기준과 감사의무를 설명하시오.', answer: '공동주택회계처리기준에 따라 처리, 300세대 이상 외부회계감사', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 회계처리기준과 감사의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계처리기준\n2. 회계감사 대상\n3. 감사 주기\n4. 감사보고서 공개\n5. 연습문제 3개' },
        { id: 26, question: '잡수입의 종류와 처리방법을 설명하시오.', answer: '주차료, 광고수입, 부대복리시설 수입 등, 관리규약에 따라 처리', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 잡수입의 종류와 처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잡수입 종류\n2. 수입 기준\n3. 사용 용도\n4. 회계 처리\n5. 연습문제 3개' },
        { id: 27, question: '관리비 체납자에 대한 조치를 설명하시오.', answer: '독촉, 연체료 부과, 법적조치, 공용부분 사용제한 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리비 체납자에 대한 조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독촉 절차\n2. 연체료 기준\n3. 공용시설 사용제한\n4. 법적 조치\n5. 연습문제 3개' },
        { id: 28, question: '관리비 예치금의 관리를 설명하시오.', answer: '입주 시 납부, 관리비 담보 목적, 소유자 변경 시 승계', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 관리비 예치금의 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예치금의 목적\n2. 부과 기준\n3. 관리 방법\n4. 반환 절차\n5. 연습문제 3개' },
        { id: 29, question: '공동주택관리정보시스템(K-apt)의 기능을 설명하시오.', answer: '관리비 공개, 입찰정보, 하자보수 등 관리정보 통합 제공', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공동주택관리정보시스템(K-apt)의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. K-apt 개요\n2. 주요 기능\n3. 공개 정보\n4. 활용 방법\n5. 연습문제 3개' },
        { id: 30, question: '공사, 용역 입찰 절차를 설명하시오.', answer: '일정 금액 이상 전자입찰, 입찰공고→입찰→낙찰자선정→계약', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 공사, 용역 입찰 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입찰 의무대상\n2. 전자입찰 방법\n3. 낙찰자 선정기준\n4. 수의계약 요건\n5. 연습문제 3개' }
      ]
    },
    {
      name: '장기수선과 하자담보',
      questions: [
        { id: 31, question: '장기수선계획의 수립과 조정을 설명하시오.', answer: '사용검사 전 수립, 3년마다 검토·조정, 입주자대표회의 의결', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 장기수선계획의 수립과 조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수립 시기\n2. 포함 사항\n3. 검토·조정 주기\n4. 조정 절차\n5. 연습문제 3개' },
        { id: 32, question: '장기수선공사의 시행절차를 설명하시오.', answer: '계획검토→설계→입찰→시공→준공검사', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 장기수선공사의 시행절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공사 범위 결정\n2. 설계와 입찰\n3. 업체 선정\n4. 준공검사\n5. 연습문제 3개' },
        { id: 33, question: '하자담보책임의 범위와 기간을 설명하시오.', answer: '시설공사별로 2년~10년, 내력구조부 10년, 마감재 2년 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 하자담보책임의 범위와 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하자담보책임 의의\n2. 시설별 기간\n3. 책임 범위\n4. 기간 기산점\n5. 연습문제 3개' },
        { id: 34, question: '하자보수청구권의 행사방법을 설명하시오.', answer: '사업주체에 보수요구, 불응 시 하자심사분쟁조정위원회 분쟁조정', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 하자보수청구권의 행사방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청구권자\n2. 청구 절차\n3. 하자진단\n4. 분쟁해결\n5. 연습문제 3개' },
        { id: 35, question: '하자보수보증금의 예치와 사용을 설명하시오.', answer: '분양가의 3%를 보증금 예치, 하자보수 미이행 시 직접 사용', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 하자보수보증금의 예치와 사용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예치 비율\n2. 예치 방법\n3. 사용 요건\n4. 반환 시기\n5. 연습문제 3개' },
        { id: 36, question: '하자심사·분쟁조정위원회의 역할을 설명하시오.', answer: '하자 여부 판단, 보수범위 결정, 분쟁조정', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 하자심사·분쟁조정위원회의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위원회 구성\n2. 업무 범위\n3. 심사 절차\n4. 조정의 효력\n5. 연습문제 3개' },
        { id: 37, question: '안전점검의 종류와 실시기준을 설명하시오.', answer: '정기안전점검, 수시안전점검, 긴급안전점검', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 안전점검의 종류와 실시기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전점검 종류\n2. 실시 주기\n3. 점검자 자격\n4. 결과 조치\n5. 연습문제 3개' },
        { id: 38, question: '리모델링의 요건과 절차를 설명하시오.', answer: '입주자등 3분의 2 이상 동의, 시장군수 허가', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 리모델링의 요건과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리모델링 정의\n2. 동의 요건\n3. 허가 절차\n4. 수직증축 기준\n5. 연습문제 3개' },
        { id: 39, question: '행위허가 및 신고사항을 설명하시오.', answer: '공용부분 변경, 용도변경, 증축 등 시장군수 허가/신고 필요', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 행위허가 및 신고사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 대상\n2. 신고 대상\n3. 절차\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 40, question: '시설물의 안전관리에 관한 특별법의 주요 내용을 설명하시오.', answer: '시설물 등급분류, 정기점검, 정밀안전진단', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 시설물의 안전관리에 관한 특별법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 시설물 등급\n3. 점검 종류\n4. 안전진단\n5. 연습문제 3개' }
      ]
    },
    {
      name: '기타 관련법규',
      questions: [
        { id: 41, question: '주택법상 사업주체의 의무를 설명하시오.', answer: '시공품질, 하자보수, 장기수선계획 수립, 입주자 보호 등', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 주택법상 사업주체의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업주체 정의\n2. 시공 관련 의무\n3. 하자보수 의무\n4. 입주자보호 의무\n5. 연습문제 3개' },
        { id: 42, question: '건축법상 건축물 유지관리 의무를 설명하시오.', answer: '소유자·관리자가 건축물 안전·기능 유지 의무, 정기점검 실시', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 건축법상 건축물 유지관리 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유지관리 의무자\n2. 유지관리 내용\n3. 정기점검\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 43, question: '소방시설법상 자체점검 의무를 설명하시오.', answer: '관계인이 소방시설 작동기능점검(반기 1회), 종합정밀점검(연 1회)', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 소방시설법상 자체점검 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자체점검 의무자\n2. 점검 종류와 주기\n3. 점검자 자격\n4. 결과보고\n5. 연습문제 3개' },
        { id: 44, question: '승강기 안전관리법의 주요 내용을 설명하시오.', answer: '정기검사(1년), 안전관리자 선임, 자체점검', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 승강기 안전관리법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사\n2. 안전관리자\n3. 자체점검\n4. 사고보고\n5. 연습문제 3개' },
        { id: 45, question: '전기사업법상 전기안전관리를 설명하시오.', answer: '전기안전관리자 선임, 정기점검, 안전관리규정 작성', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 전기사업법상 전기안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기안전관리자 선임\n2. 점검 주기\n3. 안전관리규정\n4. 전기사고 신고\n5. 연습문제 3개' },
        { id: 46, question: '도시가스사업법상 안전관리를 설명하시오.', answer: '가스안전점검, 가스계량기 관리, 안전교육', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 도시가스사업법상 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사\n2. 안전점검\n3. 계량기 관리\n4. 가스누출 대응\n5. 연습문제 3개' },
        { id: 47, question: '수도법상 저수조 관리의무를 설명하시오.', answer: '저수조 청소(연 2회), 위생점검, 수질검사', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 수도법상 저수조 관리의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리의무자\n2. 청소 주기\n3. 수질검사\n4. 위생점검\n5. 연습문제 3개' },
        { id: 48, question: '주차장법상 주차장 관리기준을 설명하시오.', answer: '주차구획선, 장애인주차구역, 안전시설, 관리', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 주차장법상 주차장 관리기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주차구획 기준\n2. 장애인주차구역\n3. 안전시설\n4. 관리의무\n5. 연습문제 3개' },
        { id: 49, question: '층간소음 관련 규정을 설명하시오.', answer: '층간소음 기준(주간 43dB, 야간 38dB), 분쟁조정, 예방조치', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 층간소음 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 층간소음 기준\n2. 측정 방법\n3. 분쟁조정\n4. 예방 의무\n5. 연습문제 3개' },
        { id: 50, question: '개인정보보호법상 CCTV 관리규정을 설명하시오.', answer: '설치목적 고지, 영상정보 보관기간, 열람·삭제 요청권', prompt: '주택관리사 주택관리관계법규 문제입니다.\n\n문제: 개인정보보호법상 CCTV 관리규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 요건\n2. 안내판 설치\n3. 영상정보 관리\n4. 열람 절차\n5. 연습문제 3개' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">주택관리관계법규</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">⚖️ 주택관리관계법규</h1>
          <p className="text-gray-600">주택관리사(보) 2차 시험 - 주택관리관계법규 학습</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">학습 진행률</span>
            <span className="text-teal-600 font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev => prev.includes(topicIdx) ? prev.filter(t => t !== topicIdx) : [...prev, topicIdx])}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topicIdx + 1}</span>
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 rounded text-teal-600 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-2">{q.answer}</p>
                          <button
                            onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                          >
                            🤖 AI에게 자세히 묻기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/category/insurance/housing-manager" className="text-teal-600 hover:text-teal-700 font-medium">
            ← 주택관리사(보) 메인으로
          </Link>
        </div>
      </main>

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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
