'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function YouthLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-1-youth-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-1-youth-law-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '청소년기본법',
      icon: '📜',
      questions: [
        { id: 1, question: '청소년기본법의 목적과 기본이념을 설명하시오.', answer: '청소년의 권리 보장, 건전한 육성, 사회참여 촉진', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년기본법의 목적과 기본이념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 기본이념 5가지\n3. 청소년의 권리와 책임\n4. 다른 청소년 관련 법과의 관계\n5. 연습문제 3개' },
        { id: 2, question: '청소년기본법상 청소년의 연령 정의와 다른 법률과의 차이를 설명하시오.', answer: '9세 이상 24세 이하 (타법률과 연령 기준 상이)', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년기본법상 청소년의 연령 정의와 다른 법률과의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기본법의 연령 정의\n2. 청소년보호법의 연령 정의\n3. 아동복지법의 연령 정의\n4. 연령 정의 차이의 법적 의미\n5. 연습문제 3개' },
        { id: 3, question: '청소년기본법상 국가와 지방자치단체의 책임을 설명하시오.', answer: '청소년정책 수립, 청소년시설 설치, 예산 확보 등', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년기본법상 국가와 지방자치단체의 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국가의 책임\n2. 지방자치단체의 책임\n3. 청소년정책 수립 의무\n4. 예산 및 시설 확보\n5. 연습문제 3개' },
        { id: 4, question: '청소년기본계획의 수립과 시행에 대해 설명하시오.', answer: '5년마다 기본계획 수립, 매년 시행계획 수립', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년기본계획의 수립과 시행에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기본계획의 의의\n2. 수립 주기와 절차\n3. 기본계획의 포함 내용\n4. 시행계획과의 관계\n5. 연습문제 3개' },
        { id: 5, question: '청소년정책위원회의 구성과 기능을 설명하시오.', answer: '국무총리 소속, 청소년정책 심의·조정', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년정책위원회의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위원회의 법적 근거\n2. 구성과 위원\n3. 주요 기능과 역할\n4. 심의 사항\n5. 연습문제 3개' },
        { id: 6, question: '청소년의 달과 청소년주간의 의미와 활동을 설명하시오.', answer: '매년 5월 청소년의 달, 5월 넷째주 청소년주간', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년의 달과 청소년주간의 의미와 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년의 달 지정 배경\n2. 청소년주간의 의미\n3. 주요 행사와 활동\n4. 정책적 의의\n5. 연습문제 3개' }
      ]
    },
    {
      title: '청소년보호법',
      icon: '🛡️',
      questions: [
        { id: 7, question: '청소년보호법의 목적과 보호 대상을 설명하시오.', answer: '유해환경으로부터 청소년 보호, 19세 미만 대상', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년보호법의 목적과 보호 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 청소년의 정의 (연령)\n3. 보호 대상 청소년\n4. 다른 법률과의 관계\n5. 연습문제 3개' },
        { id: 8, question: '청소년유해매체물의 정의와 규제 방법을 설명하시오.', answer: '음란성, 폭력성 등으로 청소년에게 유해한 매체물 규제', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년유해매체물의 정의와 규제 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년유해매체물의 정의\n2. 심의기준과 절차\n3. 표시의무와 판매금지\n4. 인터넷 규제 방법\n5. 연습문제 3개' },
        { id: 9, question: '청소년유해약물과 청소년유해물건의 규제를 설명하시오.', answer: '주류, 담배, 마약 등 유해약물 및 유해물건 판매금지', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년유해약물과 청소년유해물건의 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년유해약물의 종류\n2. 청소년유해물건의 종류\n3. 규제 방법과 제재\n4. 판매자 의무\n5. 연습문제 3개' },
        { id: 10, question: '청소년유해업소의 종류와 규제를 설명하시오.', answer: '유흥주점, 노래연습장 등 청소년 출입·고용금지 업소', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년유해업소의 종류와 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 출입·고용금지업소\n2. 청소년 고용금지업소\n3. 업주의 의무\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 11, question: '청소년보호법상 인터넷게임 셧다운제를 설명하시오.', answer: '16세 미만 청소년의 심야시간 게임 제공 제한', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년보호법상 인터넷게임 셧다운제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 셧다운제의 정의\n2. 적용 대상과 시간\n3. 도입 배경과 효과\n4. 선택적 셧다운제와 비교\n5. 연습문제 3개' },
        { id: 12, question: '청소년보호위원회의 구성과 기능을 설명하시오.', answer: '청소년유해매체물·약물·업소 심의 및 청소년보호정책 심의', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년보호위원회의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위원회의 법적 근거\n2. 구성과 위원\n3. 주요 기능\n4. 심의·결정 사항\n5. 연습문제 3개' }
      ]
    },
    {
      title: '청소년복지지원법',
      icon: '🤝',
      questions: [
        { id: 13, question: '청소년복지지원법의 목적과 기본원칙을 설명하시오.', answer: '청소년 복지 향상, 사회참여 보장, 권익 증진', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년복지지원법의 목적과 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 복지지원의 기본원칙\n3. 국가와 지자체 책무\n4. 청소년기본법과의 관계\n5. 연습문제 3개' },
        { id: 14, question: '위기청소년의 정의와 지원체계를 설명하시오.', answer: '가출, 학업중단 등 위기상황 청소년에 대한 통합지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 위기청소년의 정의와 지원체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기청소년의 법적 정의\n2. 위기 유형과 특성\n3. 지원체계 (1388, 청소년쉼터 등)\n4. 통합지원체계의 구조\n5. 연습문제 3개' },
        { id: 15, question: '청소년쉼터의 종류와 운영에 대해 설명하시오.', answer: '일시, 단기, 중장기 쉼터로 구분, 위기청소년 보호', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년쉼터의 종류와 운영에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년쉼터의 정의\n2. 쉼터 유형별 특성\n3. 운영 기준과 서비스\n4. 이용 절차\n5. 연습문제 3개' },
        { id: 16, question: '청소년자립지원관의 설치와 운영을 설명하시오.', answer: '보호종료 청소년의 자립 지원을 위한 시설', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년자립지원관의 설치와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자립지원관의 설치 목적\n2. 대상 청소년\n3. 제공 서비스\n4. 타 지원체계와 연계\n5. 연습문제 3개' },
        { id: 17, question: '청소년복지시설의 종류와 기능을 설명하시오.', answer: '청소년쉼터, 자립지원관, 치료재활센터 등', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년복지시설의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복지시설의 유형\n2. 시설별 대상과 기능\n3. 설치·운영 기준\n4. 종사자 자격요건\n5. 연습문제 3개' },
        { id: 18, question: '청소년 특별지원 제도를 설명하시오.', answer: '위기청소년에게 생활·건강·학업·자립 등 지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년 특별지원 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별지원의 대상\n2. 지원 내용과 유형\n3. 신청 및 선정 절차\n4. 지원 기간과 금액\n5. 연습문제 3개' }
      ]
    },
    {
      title: '학교폭력예방 및 대책에 관한 법률',
      icon: '🏫',
      questions: [
        { id: 19, question: '학교폭력의 법적 정의와 유형을 설명하시오.', answer: '학생 간 폭력, 사이버폭력, 따돌림 등 포함', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력의 법적 정의와 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교폭력의 법적 정의\n2. 폭력 유형별 특성\n3. 사이버폭력의 범위\n4. 학교폭력과 일반 폭력의 차이\n5. 연습문제 3개' },
        { id: 20, question: '학교폭력대책심의위원회의 구성과 기능을 설명하시오.', answer: '교육지원청에 설치, 학교폭력 사안 심의·의결', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력대책심의위원회의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심의위원회의 설치 근거\n2. 구성과 위원\n3. 심의 대상 사안\n4. 심의 절차와 결정\n5. 연습문제 3개' },
        { id: 21, question: '학교폭력 가해학생에 대한 조치 종류를 설명하시오.', answer: '서면사과부터 퇴학처분까지 9가지 조치', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력 가해학생에 대한 조치 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 9가지 조치의 종류\n2. 조치별 내용과 수준\n3. 조치 결정 시 고려사항\n4. 조치에 대한 이의신청\n5. 연습문제 3개' },
        { id: 22, question: '학교폭력 피해학생 보호조치를 설명하시오.', answer: '심리상담, 일시보호, 치료, 학급교체 등', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력 피해학생 보호조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호조치의 종류\n2. 조치별 내용\n3. 보호조치 비용 부담\n4. 피해학생 지원체계\n5. 연습문제 3개' },
        { id: 23, question: '학교폭력 신고의무와 처리절차를 설명하시오.', answer: '교직원 신고의무, 전담기구 조사, 심의위원회 심의', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력 신고의무와 처리절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고의무자와 신고 방법\n2. 학교 전담기구의 역할\n3. 사안 조사 절차\n4. 심의위원회 회부 기준\n5. 연습문제 3개' },
        { id: 24, question: '학교폭력 예방교육의 실시 기준을 설명하시오.', answer: '학기별 1회 이상, 연간 4시간 이상 예방교육', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교폭력 예방교육의 실시 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예방교육의 법적 근거\n2. 실시 횟수와 시간\n3. 교육 내용\n4. 교직원·학부모 교육\n5. 연습문제 3개' }
      ]
    },
    {
      title: '아동복지법 및 아동학대',
      icon: '👶',
      questions: [
        { id: 25, question: '아동복지법상 아동학대의 정의와 유형을 설명하시오.', answer: '신체학대, 정서학대, 성학대, 방임의 4가지 유형', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 아동복지법상 아동학대의 정의와 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아동학대의 법적 정의\n2. 4가지 학대 유형\n3. 유형별 구체적 행위\n4. 학대와 훈육의 구분\n5. 연습문제 3개' },
        { id: 26, question: '아동학대 신고의무자와 신고 절차를 설명하시오.', answer: '교사, 의료인, 상담사 등 26개 직군 신고의무', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 아동학대 신고의무자와 신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고의무자의 범위\n2. 신고 방법과 절차\n3. 신고의무 불이행 시 제재\n4. 신고자 보호 조치\n5. 연습문제 3개' },
        { id: 27, question: '아동보호전문기관의 역할과 기능을 설명하시오.', answer: '아동학대 신고접수, 조사, 사례관리, 예방교육', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 아동보호전문기관의 역할과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기관의 설치 근거\n2. 주요 역할과 기능\n3. 사례관리 절차\n4. 유관기관 협력\n5. 연습문제 3개' },
        { id: 28, question: '피해아동 보호명령 제도를 설명하시오.', answer: '법원이 피해아동 보호를 위해 내리는 명령', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 피해아동 보호명령 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호명령의 정의\n2. 명령의 종류\n3. 청구 절차\n4. 위반 시 제재\n5. 연습문제 3개' }
      ]
    },
    {
      title: '청소년활동진흥법',
      icon: '🏃',
      questions: [
        { id: 29, question: '청소년활동진흥법의 목적과 주요 내용을 설명하시오.', answer: '청소년활동 지원, 활동시설 설치·운영 규정', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년활동진흥법의 목적과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 청소년활동의 정의\n3. 주요 규정 내용\n4. 다른 법률과의 관계\n5. 연습문제 3개' },
        { id: 30, question: '청소년수련시설의 종류와 기능을 설명하시오.', answer: '수련관, 수련원, 문화의집, 특화시설, 야영장', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년수련시설의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수련시설의 유형\n2. 시설별 기능과 역할\n3. 설치·운영 기준\n4. 안전관리 의무\n5. 연습문제 3개' },
        { id: 31, question: '청소년수련활동 인증제도를 설명하시오.', answer: '프로그램 품질 인증을 통한 안전하고 유익한 활동 보장', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년수련활동 인증제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인증제도의 목적\n2. 인증 기준과 절차\n3. 인증 효과\n4. 인증 취소 사유\n5. 연습문제 3개' },
        { id: 32, question: '청소년지도사의 자격과 배치기준을 설명하시오.', answer: '1급, 2급, 3급으로 구분, 시설별 배치기준 상이', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년지도사의 자격과 배치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년지도사 자격 등급\n2. 등급별 자격요건\n3. 시설별 배치기준\n4. 청소년상담사와의 차이\n5. 연습문제 3개' }
      ]
    },
    {
      title: '청소년상담복지 행정체계',
      icon: '🏛️',
      questions: [
        { id: 33, question: '여성가족부의 청소년정책 기능과 조직을 설명하시오.', answer: '청소년정책 총괄, 청소년가족정책실 운영', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 여성가족부의 청소년정책 기능과 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 여성가족부의 청소년정책 담당 조직\n2. 주요 정책 영역\n3. 산하기관과의 관계\n4. 타 부처와의 협력\n5. 연습문제 3개' },
        { id: 34, question: '한국청소년상담복지개발원의 역할과 기능을 설명하시오.', answer: '청소년상담복지 정책 연구, 전문인력 양성, 프로그램 개발', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 한국청소년상담복지개발원의 역할과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개발원의 설립 목적\n2. 주요 기능과 사업\n3. 청소년상담사 자격 관리\n4. 지역센터 지원 역할\n5. 연습문제 3개' },
        { id: 35, question: '청소년상담복지센터의 설치와 운영을 설명하시오.', answer: '시도 및 시군구 설치, 상담·긴급구조·자립지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년상담복지센터의 설치와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 센터의 설치 근거\n2. 시도·시군구 센터 구분\n3. 주요 사업 내용\n4. 운영 체계\n5. 연습문제 3개' },
        { id: 36, question: '청소년전화 1388의 운영과 기능을 설명하시오.', answer: '24시간 상담, 긴급구조, 사례연계', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년전화 1388의 운영과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1388의 설치 목적\n2. 운영 체계와 시간\n3. 제공 서비스\n4. 긴급구조 연계 절차\n5. 연습문제 3개' },
        { id: 37, question: '학교밖청소년지원센터(꿈드림)의 역할을 설명하시오.', answer: '학업중단 청소년 발굴, 상담, 학업·취업 지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교밖청소년지원센터(꿈드림)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 꿈드림센터의 설치 근거\n2. 주요 사업 내용\n3. 대상 청소년\n4. 지원 프로그램\n5. 연습문제 3개' },
        { id: 38, question: '지역사회 청소년통합지원체계(CYS-Net)를 설명하시오.', answer: '위기청소년 발굴·연계를 위한 지역사회 네트워크', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 지역사회 청소년통합지원체계(CYS-Net)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CYS-Net의 개념과 목적\n2. 운영 구조\n3. 참여 기관\n4. 사례관리 절차\n5. 연습문제 3개' }
      ]
    },
    {
      title: '기타 관련 법률 및 정책',
      icon: '📚',
      questions: [
        { id: 39, question: '소년법의 목적과 주요 내용을 설명하시오.', answer: '비행소년 환경조정, 선도·보호처분을 통한 건전 육성', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 소년법의 목적과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소년법의 목적\n2. 소년의 정의와 연령\n3. 보호처분의 종류\n4. 소년보호사건 절차\n5. 연습문제 3개' },
        { id: 40, question: '학교밖청소년 지원에 관한 법률의 주요 내용을 설명하시오.', answer: '학업중단 청소년 발굴, 상담·교육·취업 지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 학교밖청소년 지원에 관한 법률의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 학교밖청소년의 정의\n3. 지원 내용\n4. 꿈드림센터 근거\n5. 연습문제 3개' },
        { id: 41, question: '청소년성보호에관한법률의 주요 내용을 설명하시오.', answer: '청소년 대상 성범죄 처벌, 피해청소년 보호·지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년성보호에관한법률의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 청소년 대상 성범죄 유형\n3. 피해청소년 지원\n4. 가해자 취업제한\n5. 연습문제 3개' },
        { id: 42, question: '자살예방 및 생명존중문화 조성을 위한 법률의 청소년 관련 내용을 설명하시오.', answer: '자살예방교육, 위기상담, 사후관리 체계', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 자살예방 및 생명존중문화 조성을 위한 법률의 청소년 관련 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 청소년 자살예방 정책\n3. 교육기관의 의무\n4. 위기상담 체계\n5. 연습문제 3개' },
        { id: 43, question: '정신건강복지법의 청소년 관련 규정을 설명하시오.', answer: '아동청소년 정신건강증진, 조기발견 및 치료 지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 정신건강복지법의 청소년 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아동청소년 정신건강 증진\n2. 정신건강복지센터 역할\n3. 조기 발견 및 치료\n4. 학교와의 연계\n5. 연습문제 3개' },
        { id: 44, question: '다문화가족지원법의 청소년 관련 규정을 설명하시오.', answer: '다문화가정 자녀 교육·상담 지원', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 다문화가족지원법의 청소년 관련 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화가정 자녀 지원\n2. 교육 및 상담 서비스\n3. 다문화가족지원센터 역할\n4. 청소년정책과의 연계\n5. 연습문제 3개' },
        { id: 45, question: '청소년정책의 역사적 변천과정을 설명하시오.', answer: '1987년 청소년육성법 제정부터 현재까지의 발전', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년정책의 역사적 변천과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1980년대 정책 태동기\n2. 1990년대 제도화\n3. 2000년대 이후 발전\n4. 최근 정책 동향\n5. 연습문제 3개' },
        { id: 46, question: '청소년참여기구의 종류와 운영을 설명하시오.', answer: '청소년참여위원회, 청소년운영위원회, 청소년특별회의', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년참여기구의 종류와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참여기구의 법적 근거\n2. 기구별 구성과 역할\n3. 운영 방법\n4. 참여 성과와 한계\n5. 연습문제 3개' },
        { id: 47, question: '청소년 인권과 관련된 국제협약을 설명하시오.', answer: 'UN 아동권리협약, 청소년권리선언 등', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년 인권과 관련된 국제협약을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UN 아동권리협약 개요\n2. 4대 권리 영역\n3. 한국의 비준과 이행\n4. 국내법에 미친 영향\n5. 연습문제 3개' },
        { id: 48, question: '청소년 미디어 이용 관련 정책을 설명하시오.', answer: '미디어 리터러시 교육, 유해콘텐츠 차단, 과의존 예방', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년 미디어 이용 관련 정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미디어 리터러시 교육\n2. 유해콘텐츠 규제\n3. 인터넷·스마트폰 과의존 예방\n4. 관련 법률과 정책\n5. 연습문제 3개' },
        { id: 49, question: '청소년 노동권 보호 관련 법률을 설명하시오.', answer: '근로기준법상 연소자 보호규정, 최저임금, 근로시간 제한', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 청소년 노동권 보호 관련 법률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소자 고용 가능 연령\n2. 근로시간 제한\n3. 유해위험업무 금지\n4. 청소년 근로권익센터\n5. 연습문제 3개' },
        { id: 50, question: '최근 청소년정책 동향과 과제를 설명하시오.', answer: '디지털 시대 대응, 정신건강 강화, 사회참여 확대', prompt: '청소년상담사 1급 - 청소년 관련 법과 행정 문제입니다.\n\n문제: 최근 청소년정책 동향과 과제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제7차 청소년정책기본계획 방향\n2. 디지털 환경 대응 정책\n3. 정신건강 지원 강화\n4. 향후 정책 과제\n5. 연습문제 3개' }
      ]
    }
  ];

  const progress = Math.round((completedQuestions.length / 50) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare" className="hover:text-gray-700">복지·상담</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare/youth-counselor-1" className="hover:text-gray-700">청소년상담사 1급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">청소년 관련 법과 행정</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⚖️</span>
            <div>
              <h1 className="text-2xl font-bold">청소년 관련 법과 행정</h1>
              <p className="text-purple-100">필수과목 | 25문항</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedQuestions.length}/50 ({progress}%)</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-purple-600">
                    {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition ${expandedTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topicIndex) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border transition ${
                        completedQuestions.includes(q.id)
                          ? 'bg-purple-50 border-purple-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-purple-500 border-purple-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-purple-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium text-gray-700">핵심:</span> {q.answer}
                          </p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
                          >
                            🤖 AI에게 질문하기
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

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/welfare/youth-counselor-1/study/supervision"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 이전 과목
          </Link>
          <Link
            href="/category/welfare/youth-counselor-1/study/research-method"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            다음 과목 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
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
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">청소년상담사 1급 - 청소년 관련 법과 행정</p>
        </div>
      </footer>
    </div>
  );
}
