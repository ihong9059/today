'use client';

import { useState, useEffect } from 'react';

export default function StandardsStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = { name: '전기설비기술기준 및 법규', icon: '📜', description: 'KEC, 신재생에너지법, 전기사업법, 안전관리법 등 관련 법규' };

  const topics = [
    {
      id: 1, name: '한국전기설비규정(KEC)',
      questions: [
        { id: 1, question: 'KEC의 구성 체계와 주요 내용을 설명하시오.', answer: '총칙, 저압, 고압, 특수설비, 분산전원 등으로 구성', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 구성 체계와 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KEC 개요\n2. 구성 체계\n3. 주요 내용\n4. 적용 범위\n5. 예상 문제 3개' },
        { id: 2, question: 'KEC에서 태양광발전설비 관련 규정을 설명하시오.', answer: '512절 태양전지발전설비, 전선 규격, 접지, 보호장치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 태양광발전설비 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련 조항\n2. 주요 규정\n3. 설계 적용\n4. 주의사항\n5. 예상 문제 3개' },
        { id: 3, question: '분산형전원 계통연계 기술기준을 설명하시오.', answer: '전압범위, 주파수범위, 역률, 고조파, 보호장치 기준', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 분산형전원 계통연계 기술기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 범위\n2. 전압/주파수 기준\n3. 보호장치 기준\n4. 연계 조건\n5. 예상 문제 3개' },
        { id: 4, question: 'KEC의 접지시스템(TN, TT, IT) 규정을 설명하시오.', answer: '접지방식별 특성, 적용조건, 보호장치 선정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 접지시스템 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 방식\n2. 각 방식 특성\n3. 태양광 적용\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 5, question: 'KEC의 전선 굵기 선정 기준을 설명하시오.', answer: '허용전류, 전압강하, 단락전류 조건 충족', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 전선 굵기 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선정 조건\n2. 허용전류표\n3. 보정계수\n4. 계산 방법\n5. 예상 문제 3개' },
        { id: 6, question: 'KEC의 과전류보호장치 선정 기준을 설명하시오.', answer: '정격전류 ≥ 설계전류, 정격전류 ≤ 허용전류', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 과전류보호장치 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선정 조건\n2. 차단기 종류\n3. 협조 설계\n4. 적용 예\n5. 예상 문제 3개' },
        { id: 7, question: 'KEC의 피뢰설비 규정을 설명하시오.', answer: '피뢰등급, 수뢰부, 인하도선, 접지극', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 피뢰설비 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피뢰 등급\n2. 설비 구성\n3. 설치 기준\n4. 태양광 적용\n5. 예상 문제 3개' },
        { id: 8, question: 'KEC의 특고압 수전설비 규정을 설명하시오.', answer: '수전전압, 수전설비 구성, 보호장치, 계량장치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: KEC의 특고압 수전설비 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 범위\n2. 설비 구성\n3. 보호 기준\n4. 대규모 발전소 적용\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 2, name: '신재생에너지법',
      questions: [
        { id: 9, question: '신에너지 및 재생에너지법의 목적과 주요 내용을 설명하시오.', answer: '신재생에너지 보급 확대, 기술개발, 이용의무화, 지원제도', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 신재생에너지법의 목적과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법 목적\n2. 주요 내용\n3. 지원 제도\n4. 의무 규정\n5. 예상 문제 3개' },
        { id: 10, question: 'RPS(신재생에너지 공급의무화) 제도를 설명하시오.', answer: '발전사업자 의무공급비율, REC 거래, 이행방법', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: RPS 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RPS 정의\n2. 의무비율\n3. 이행 방법\n4. 벌칙 규정\n5. 예상 문제 3개' },
        { id: 11, question: 'REC(신재생에너지공급인증서) 제도를 설명하시오.', answer: '발전량 인증, 거래시장, 가중치, 정산', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: REC 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. REC 정의\n2. 발급 기준\n3. 가중치 체계\n4. 거래 방법\n5. 예상 문제 3개' },
        { id: 12, question: 'REC 가중치 산정 기준을 설명하시오.', answer: '설치유형, 용량, 입지조건에 따라 0.7-2.0 차등 적용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: REC 가중치 산정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가중치 개념\n2. 유형별 가중치\n3. 적용 조건\n4. 최신 기준\n5. 예상 문제 3개' },
        { id: 13, question: '발전차액지원제도(FIT)와 RPS의 차이를 설명하시오.', answer: 'FIT: 고정가격 매입, RPS: 시장거래, 의무할당', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: FIT와 RPS의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FIT 개념\n2. RPS 개념\n3. 차이점\n4. 장단점\n5. 예상 문제 3개' },
        { id: 14, question: '신재생에너지 설비인증제도를 설명하시오.', answer: '설비 성능인증, 의무화 대상, 인증기관, 유효기간', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 신재생에너지 설비인증제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인증 목적\n2. 대상 설비\n3. 인증 절차\n4. 혜택\n5. 예상 문제 3개' },
        { id: 15, question: '소규모 신재생발전 전력거래제도를 설명하시오.', answer: '100kW 이하, 고정가격계약, 한국에너지공단 중개', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 소규모 신재생발전 전력거래제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 거래 방식\n3. 가격 결정\n4. 참여 절차\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 3, name: '전기사업법',
      questions: [
        { id: 16, question: '전기사업법에서 정한 전기사업의 종류를 설명하시오.', answer: '발전, 송전, 배전, 전기판매, 구역전기사업', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기사업의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업 종류\n2. 각 사업 정의\n3. 허가 요건\n4. 태양광 해당 사업\n5. 예상 문제 3개' },
        { id: 17, question: '발전사업 허가 요건과 절차를 설명하시오.', answer: '용량기준, 기술기준, 재무능력, 허가절차', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 발전사업 허가 요건과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 요건\n2. 제출 서류\n3. 심사 절차\n4. 처리 기간\n5. 예상 문제 3개' },
        { id: 18, question: '자가용전기설비의 정의와 요건을 설명하시오.', answer: '자가소비 목적, 75kW 이상 시 신고, 전기안전관리자 선임', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 자가용전기설비의 정의와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정의\n2. 적용 범위\n3. 신고 요건\n4. 관리 의무\n5. 예상 문제 3개' },
        { id: 19, question: '전력시장 운영 구조를 설명하시오.', answer: '전력거래소, SMP, 용량요금, 정산', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전력시장 운영 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시장 구조\n2. 가격 결정\n3. 거래 방식\n4. 태양광 참여\n5. 예상 문제 3개' },
        { id: 20, question: 'SMP(계통한계가격) 결정 방법을 설명하시오.', answer: '시간대별 한계발전기 변동비, 전력거래소 결정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SMP 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SMP 정의\n2. 결정 원리\n3. 시간대별 변동\n4. 태양광 영향\n5. 예상 문제 3개' },
        { id: 21, question: '계통접속 기준과 절차를 설명하시오.', answer: '접속용량, 접속점 협의, 공사비 부담, 송변전설비', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통접속 기준과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접속 기준\n2. 협의 절차\n3. 공사비 부담\n4. 소요 기간\n5. 예상 문제 3개' },
        { id: 22, question: '전기품질 유지 의무를 설명하시오.', answer: '전압, 주파수, 역률 기준 유지, 고조파 제한', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기품질 유지 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 품질 항목\n2. 유지 기준\n3. 발전사업자 의무\n4. 위반 시 조치\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 4, name: '전기안전관리법',
      questions: [
        { id: 23, question: '전기안전관리법의 목적과 주요 내용을 설명하시오.', answer: '전기재해 예방, 안전관리, 검사제도, 기술기준 준수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기안전관리법의 목적과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법 목적\n2. 주요 내용\n3. 적용 대상\n4. 의무 규정\n5. 예상 문제 3개' },
        { id: 24, question: '전기안전관리자 선임 기준을 설명하시오.', answer: '용량별 선임기준, 자격요건, 대행제도', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기안전관리자 선임 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 기준\n2. 자격 요건\n3. 대행 제도\n4. 직무 범위\n5. 예상 문제 3개' },
        { id: 25, question: '정기검사 대상과 주기를 설명하시오.', answer: '자가용 1000kW 이상, 4년마다, 한국전기안전공사', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 정기검사 대상과 주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 대상\n2. 검사 주기\n3. 검사 기관\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 26, question: '사용전검사 절차와 검사항목을 설명하시오.', answer: '설치완료 후 한전 신청, 외관/절연/접지/보호장치 검사', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 사용전검사 절차와 검사항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신청 절차\n2. 검사 항목\n3. 판정 기준\n4. 불합격 시 조치\n5. 예상 문제 3개' },
        { id: 27, question: '전기설비 안전점검 의무를 설명하시오.', answer: '일상점검, 정기점검, 정밀점검, 기록유지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기설비 안전점검 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 종류\n2. 점검 주기\n3. 점검 항목\n4. 기록 보존\n5. 예상 문제 3개' },
        { id: 28, question: '전기재해 발생 시 보고 및 조치 의무를 설명하시오.', answer: '즉시 보고, 원인조사, 재발방지, 기록보존', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기재해 발생 시 조치 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보고 의무\n2. 조사 절차\n3. 재발 방지\n4. 기록 보존\n5. 예상 문제 3개' },
        { id: 29, question: '전기안전관리 대행 제도를 설명하시오.', answer: '전문기관 위탁, 대행범위, 책임한계, 비용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기안전관리 대행 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대행 제도\n2. 적용 대상\n3. 대행 범위\n4. 선정 기준\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 5, name: '환경 및 인허가',
      questions: [
        { id: 30, question: '태양광 발전사업 인허가 절차를 설명하시오.', answer: '개발행위허가→발전사업허가→공사계획신고→사용전검사→계통연계', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 발전사업 인허가 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인허가 절차\n2. 각 단계 내용\n3. 소요 기간\n4. 제출 서류\n5. 예상 문제 3개' },
        { id: 31, question: '개발행위허가 요건과 절차를 설명하시오.', answer: '토지이용계획, 환경성검토, 인근주민동의, 지자체 허가', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 개발행위허가 요건과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 요건\n2. 제출 서류\n3. 심사 항목\n4. 처리 기간\n5. 예상 문제 3개' },
        { id: 32, question: '환경영향평가 대상과 절차를 설명하시오.', answer: '10만㎡ 이상, 소규모는 간이평가, 협의절차', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 환경영향평가 대상과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가 대상\n2. 평가 항목\n3. 협의 절차\n4. 소요 기간\n5. 예상 문제 3개' },
        { id: 33, question: '농지전용허가 요건을 설명하시오.', answer: '농지보전부담금, 원상복구 조건, 영농형 특례', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 농지전용허가 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 요건\n2. 부담금\n3. 영농형 특례\n4. 복구 의무\n5. 예상 문제 3개' },
        { id: 34, question: '산지전용허가 요건을 설명하시오.', answer: '산지보전부담금, 복구비예치, 경사도 제한', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 산지전용허가 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 요건\n2. 경사도 제한\n3. 부담금\n4. 복구 의무\n5. 예상 문제 3개' },
        { id: 35, question: '공사계획 신고 절차를 설명하시오.', answer: '한전 신고, 설계도서 제출, 공사착수, 준공검사', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 공사계획 신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고 대상\n2. 제출 서류\n3. 처리 절차\n4. 변경 신고\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 6, name: '전력거래',
      questions: [
        { id: 36, question: '전력거래소의 역할을 설명하시오.', answer: '전력시장 운영, 계통운영, 가격결정, 정산', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전력거래소의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 역할\n2. 시장 운영\n3. 가격 결정\n4. 정산 업무\n5. 예상 문제 3개' },
        { id: 37, question: '신재생에너지 전력거래 방식을 설명하시오.', answer: 'REC 현물/계약시장, SMP 정산, 고정가격계약', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 신재생에너지 전력거래 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래 방식\n2. 시장 종류\n3. 정산 절차\n4. 수익 구조\n5. 예상 문제 3개' },
        { id: 38, question: 'PPA(전력구매계약) 제도를 설명하시오.', answer: '수요자 직접 계약, 장기고정가격, RE100 대응', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PPA 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PPA 정의\n2. 계약 방식\n3. 장단점\n4. RE100 연계\n5. 예상 문제 3개' },
        { id: 39, question: 'RE100 제도와 태양광 발전의 관계를 설명하시오.', answer: '기업 재생에너지 100% 목표, 녹색프리미엄, PPA', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: RE100과 태양광 발전의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RE100 개념\n2. 이행 방안\n3. 태양광 역할\n4. 인증 방법\n5. 예상 문제 3개' },
        { id: 40, question: '녹색프리미엄 제도를 설명하시오.', answer: '재생에너지 프리미엄 지불, RE100 이행수단', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 녹색프리미엄 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도 개요\n2. 참여 방법\n3. 가격 결정\n4. 인증 절차\n5. 예상 문제 3개' },
        { id: 41, question: '자가소비 잉여전력 거래제도를 설명하시오.', answer: '소비 후 잉여분 판매, 계량방식, 정산', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 자가소비 잉여전력 거래제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용 대상\n2. 거래 방식\n3. 계량 방법\n4. 정산 절차\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 7, name: '기타 관련 규정',
      questions: [
        { id: 42, question: '건축법상 태양광설비 관련 규정을 설명하시오.', answer: '건축면적 산입 제외, 일조권, 구조안전', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 건축법상 태양광설비 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련 조항\n2. 면적 산정\n3. 구조 기준\n4. 신고/허가\n5. 예상 문제 3개' },
        { id: 43, question: '소방법상 태양광설비 관련 규정을 설명하시오.', answer: '소방차 진입로, 화재 시 대응, ESS 안전기준', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 소방법상 태양광설비 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련 규정\n2. 진입로 확보\n3. 화재 대응\n4. ESS 기준\n5. 예상 문제 3개' },
        { id: 44, question: '산업안전보건법상 태양광 시공 관련 규정을 설명하시오.', answer: '추락방지, 전기작업안전, 안전교육, 보호구', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 산업안전보건법상 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전 규정\n2. 작업자 보호\n3. 교육 의무\n4. 위반 시 처벌\n5. 예상 문제 3개' },
        { id: 45, question: '폐기물관리법상 태양광 폐모듈 처리 규정을 설명하시오.', answer: '생산자책임재활용, 수거체계, 재활용기준', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 폐모듈 처리 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련 법규\n2. 처리 의무\n3. 재활용 방법\n4. 비용 부담\n5. 예상 문제 3개' },
        { id: 46, question: '국토계획법상 개발행위 제한을 설명하시오.', answer: '용도지역별 제한, 절대농지, 보전산지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 국토계획법상 개발행위 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용도지역\n2. 개발 제한\n3. 태양광 적용\n4. 예외 규정\n5. 예상 문제 3개' },
        { id: 47, question: '에너지이용합리화법 관련 규정을 설명하시오.', answer: '에너지효율등급, 신재생설비 의무설치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 에너지이용합리화법 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법 목적\n2. 의무 규정\n3. 신재생 연계\n4. 혜택\n5. 예상 문제 3개' },
        { id: 48, question: '전기용품안전관리법상 인증제도를 설명하시오.', answer: 'KC인증, 안전인증, 자율안전확인', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기용품안전관리법상 인증제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인증 종류\n2. 대상 제품\n3. 인증 절차\n4. 표시 방법\n5. 예상 문제 3개' },
        { id: 49, question: '탄소중립기본법의 주요 내용을 설명하시오.', answer: '2050 탄소중립, 재생에너지 확대, 기후위기 대응', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 탄소중립기본법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법 목적\n2. 주요 내용\n3. 태양광 역할\n4. 지원 정책\n5. 예상 문제 3개' },
        { id: 50, question: '전기공사업법상 태양광 시공 관련 규정을 설명하시오.', answer: '등록 요건, 시공 자격, 감리 의무', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기공사업법상 태양광 시공 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록 요건\n2. 시공 자격\n3. 감리 규정\n4. 하자 책임\n5. 예상 문제 3개' },
      ],
    },
  ];

  useEffect(() => { const saved = localStorage.getItem('solar-standards-completed'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleComplete = (id: number) => { const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id]; setCompletedQuestions(updated); localStorage.setItem('solar-standards-completed', JSON.stringify(updated)); };
  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-blue-600">홈</a><span className="text-gray-300">›</span><a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-blue-600">태양광발전설비기사</a><span className="text-gray-300">›</span><span className="text-blue-600 font-medium">{subject.name}</span></nav></div></header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4 mb-4"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-blue-100">{subject.description}</p></div></div><div className="bg-white/20 rounded-lg p-4"><div className="flex justify-between text-sm mb-2"><span>진행률</span><span>{completedQuestions.length}/{totalQuestions} ({progress}%)</span></div><div className="h-3 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }}></div></div></div></div></section>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic, tIdx) => (<div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden"><button onClick={() => setExpandedTopics(expandedTopics.includes(tIdx) ? expandedTopics.filter((t) => t !== tIdx) : [...expandedTopics, tIdx])} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span><span className="font-bold text-gray-800">{topic.name}</span><span className="text-sm text-gray-500">({topic.questions.length}문항)</span></div><span className={`transform transition ${expandedTopics.includes(tIdx) ? 'rotate-180' : ''}`}>▼</span></button>{expandedTopics.includes(tIdx) && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`border rounded-lg p-4 ${completedQuestions.includes(q.id) ? 'bg-green-50 border-green-300' : 'border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions.includes(q.id) && '✓'}</button><div className="flex-1"><p className="text-gray-800 font-medium">Q{q.id}. {q.question}</p><p className="text-sm text-blue-700 mt-2 bg-blue-50 p-2 rounded">💡 {q.answer}</p><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">🤖 AI에게 질문</button></div></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
