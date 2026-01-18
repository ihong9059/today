'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function YouthPolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-youth-policy-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-youth-policy-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  const topics = [
    {
      id: 'topic1',
      title: '청소년기본법',
      icon: '📋',
      questions: [
        { id: 1, question: '청소년기본법에서 정의하는 청소년의 연령 범위는?', answer: '9세 이상 24세 이하', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법에서 정의하는 청소년의 연령 범위는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 다른 법률과의 연령 비교\n3. 연령 설정의 의미\n4. 관련 정책 적용\n5. 연습문제 3개' },
        { id: 2, question: '청소년기본법의 기본이념 3가지를 설명하시오.', answer: '청소년의 권리 보장, 사회참여 촉진, 능동적 삶 영위 지원', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법의 기본이념 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 이념의 상세 설명\n3. 실제 정책 적용 사례\n4. 이념 간 연관성\n5. 연습문제 3개' },
        { id: 3, question: '청소년육성위원회의 위원장은 누구인가?', answer: '국무총리', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년육성위원회의 위원장은 누구인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 위원회의 구성과 역할\n3. 심의 사항\n4. 운영 방식\n5. 연습문제 3개' },
        { id: 4, question: '청소년기본법에서 규정하는 청소년정책 기본계획의 수립 주기는?', answer: '5년마다', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법에서 규정하는 청소년정책 기본계획의 수립 주기는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 기본계획의 내용\n3. 수립 절차\n4. 시행계획과의 관계\n5. 연습문제 3개' },
        { id: 5, question: '청소년의 달은 몇 월인가?', answer: '5월', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년의 달은 몇 월인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년의 달 행사\n3. 청소년 주간과 기념일\n4. 관련 정책과 프로그램\n5. 연습문제 3개' },
        { id: 6, question: '청소년기본법상 청소년지도사의 배치 기준 중 청소년수련관의 경우 1급 청소년지도사는 몇 명 이상인가?', answer: '1명 이상', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법상 청소년지도사의 배치 기준 중 청소년수련관의 경우 1급 청소년지도사는 몇 명 이상인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설별 배치 기준\n3. 급수별 역할 구분\n4. 배치 기준의 의미\n5. 연습문제 3개' },
        { id: 7, question: '청소년복지지원법과 청소년기본법의 관계를 설명하시오.', answer: '청소년기본법은 기본법, 청소년복지지원법은 개별법', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년복지지원법과 청소년기본법의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 기본법과 개별법의 관계\n3. 각 법률의 목적\n4. 적용 범위 비교\n5. 연습문제 3개' },
        { id: 8, question: '청소년기본법에서 청소년지도사 자격은 몇 급으로 구분되는가?', answer: '1급, 2급, 3급의 3개 급', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법에서 청소년지도사 자격은 몇 급으로 구분되는가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 급수별 응시자격\n3. 급수별 역할과 업무\n4. 자격 취득 절차\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '청소년활동진흥법',
      icon: '⚡',
      questions: [
        { id: 9, question: '청소년활동진흥법에서 정의하는 청소년활동의 3가지 영역은?', answer: '청소년수련활동, 청소년교류활동, 청소년문화활동', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년활동진흥법에서 정의하는 청소년활동의 3가지 영역은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 활동 영역의 정의\n3. 활동별 프로그램 예시\n4. 영역 간 연계\n5. 연습문제 3개' },
        { id: 10, question: '청소년수련시설의 종류 5가지를 나열하시오.', answer: '청소년수련관, 청소년수련원, 청소년문화의집, 청소년특화시설, 청소년야영장', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년수련시설의 종류 5가지를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 시설의 정의와 특성\n3. 설치 주체와 운영 방식\n4. 시설별 프로그램 특징\n5. 연습문제 3개' },
        { id: 11, question: '청소년수련활동 인증제의 목적은 무엇인가?', answer: '청소년활동 프로그램의 질적 수준 향상 및 참여자 보호', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년수련활동 인증제의 목적은 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 인증제 도입 배경\n3. 인증 절차와 기준\n4. 인증 프로그램의 혜택\n5. 연습문제 3개' },
        { id: 12, question: '국제청소년성취포상제(The Duke of Edinburgh Award)의 4대 활동영역은?', answer: '봉사활동, 자기개발활동, 신체단련활동, 탐험활동', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 국제청소년성취포상제의 4대 활동영역은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 활동영역의 내용\n3. 포상 단계(동장, 은장, 금장)\n4. 참여 효과와 의의\n5. 연습문제 3개' },
        { id: 13, question: '청소년활동진흥법상 수련활동 신고제의 신고 대상은?', answer: '19세 미만 청소년을 대상으로 하는 숙박형 수련활동', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년활동진흥법상 수련활동 신고제의 신고 대상은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신고 절차와 서류\n3. 신고제 도입 배경\n4. 미신고 시 처벌\n5. 연습문제 3개' },
        { id: 14, question: '청소년수련시설의 안전점검 주기는?', answer: '연 1회 이상 정기 안전점검', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년수련시설의 안전점검 주기는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 점검 항목과 기준\n3. 점검 결과 조치\n4. 안전관리 의무\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '청소년복지지원법',
      icon: '💝',
      questions: [
        { id: 15, question: '청소년복지지원법에서 규정하는 특별지원청소년의 정의는?', answer: '보호자가 없거나 보호자의 실질적 보호를 받지 못하는 청소년', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년복지지원법에서 규정하는 특별지원청소년의 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 특별지원 대상 유형\n3. 지원 내용과 절차\n4. 지원 신청 방법\n5. 연습문제 3개' },
        { id: 16, question: '청소년상담복지센터의 주요 기능 3가지는?', answer: '상담, 긴급구조, 자립지원', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년상담복지센터의 주요 기능 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 기능의 세부 내용\n3. 센터 운영 체계\n4. 연계 기관과 협력\n5. 연습문제 3개' },
        { id: 17, question: '학교 밖 청소년 지원에 관한 법률의 제정 연도는?', answer: '2014년', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 학교 밖 청소년 지원에 관한 법률의 제정 연도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법률의 주요 내용\n3. 학교밖청소년지원센터(꿈드림)\n4. 지원 프로그램 종류\n5. 연습문제 3개' },
        { id: 18, question: '청소년쉼터의 종류와 이용 기간은?', answer: '일시쉼터(24시간~7일), 단기쉼터(3개월), 중장기쉼터(2년~3년)', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년쉼터의 종류와 이용 기간은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 쉼터의 역할\n3. 입소 절차\n4. 제공 서비스\n5. 연습문제 3개' },
        { id: 19, question: '지역사회 청소년통합지원체계(CYS-Net)의 정의와 역할은?', answer: '위기청소년 조기 발견 및 통합 지원을 위한 지역사회 네트워크', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 지역사회 청소년통합지원체계(CYS-Net)의 정의와 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성 기관과 역할\n3. 운영 방식\n4. 주요 사업 내용\n5. 연습문제 3개' },
        { id: 20, question: '청소년전화 1388의 운영 시간과 주요 서비스는?', answer: '24시간 운영, 상담·긴급구조·정보제공', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년전화 1388의 운영 시간과 주요 서비스는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 서비스 종류\n3. 이용 방법\n4. 연계 지원 체계\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '청소년보호법',
      icon: '🛡️',
      questions: [
        { id: 21, question: '청소년보호법에서 규정하는 청소년의 연령 범위는?', answer: '만 19세 미만', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년보호법에서 규정하는 청소년의 연령 범위는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년기본법과의 비교\n3. 보호법 연령 설정 이유\n4. 적용 범위\n5. 연습문제 3개' },
        { id: 22, question: '청소년유해매체물의 정의와 예시를 설명하시오.', answer: '청소년에게 유해한 것으로 심의된 영상물, 간행물, 음반 등', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년유해매체물의 정의와 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유해매체물 심의 기준\n3. 표시 의무\n4. 위반 시 처벌\n5. 연습문제 3개' },
        { id: 23, question: '청소년출입·고용금지업소의 종류를 나열하시오.', answer: '유흥주점, 단란주점, 비디오물감상실, 노래연습장(청소년실 제외) 등', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년출입·고용금지업소의 종류를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 출입금지업소와 고용금지업소 구분\n3. 위반 시 처벌\n4. 업소 확인 방법\n5. 연습문제 3개' },
        { id: 24, question: '청소년보호위원회의 역할과 구성은?', answer: '청소년 유해환경 규제 및 심의, 여성가족부 소속', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년보호위원회의 역할과 구성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 위원회 구성\n3. 주요 심의 사항\n4. 운영 방식\n5. 연습문제 3개' },
        { id: 25, question: '청소년에게 주류·담배 판매 시 처벌 규정은?', answer: '2년 이하 징역 또는 2천만원 이하 벌금', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년에게 주류·담배 판매 시 처벌 규정은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 판매금지 물품 종류\n3. 나이 확인 의무\n4. 처벌 강화 추이\n5. 연습문제 3개' },
        { id: 26, question: '인터넷게임 셧다운제(강제적 게임시간 제한)의 내용은?', answer: '16세 미만 청소년에게 심야시간(0시~6시) 게임 제공 금지', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 인터넷게임 셧다운제의 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 도입 배경과 목적\n3. 적용 범위\n4. 선택적 셧다운제와 비교\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '청소년 정책의 역사',
      icon: '📜',
      questions: [
        { id: 27, question: '한국 최초의 청소년 관련 법률은?', answer: '1961년 미성년자보호법', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 한국 최초의 청소년 관련 법률은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법률의 주요 내용\n3. 이후 법률 발전 과정\n4. 현행 법률과의 관계\n5. 연습문제 3개' },
        { id: 28, question: '청소년기본법 제정 연도는?', answer: '1991년', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법 제정 연도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 제정 배경\n3. 주요 개정 연혁\n4. 법률의 의의\n5. 연습문제 3개' },
        { id: 29, question: '청소년 행정 주무부처의 변천 과정을 설명하시오.', answer: '문교부 → 체육청소년부 → 문화체육부 → 국가청소년위원회 → 보건복지가족부 → 여성가족부', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년 행정 주무부처의 변천 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 시기별 부처와 역할\n3. 변천의 의미\n4. 현재 조직 체계\n5. 연습문제 3개' },
        { id: 30, question: '청소년헌장이 처음 제정된 연도는?', answer: '1990년', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년헌장이 처음 제정된 연도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 헌장의 내용\n3. 제정 목적\n4. 개정 과정\n5. 연습문제 3개' },
        { id: 31, question: '제7차 청소년정책기본계획(2023~2027)의 비전은?', answer: '청소년, 스스로 성장하는 주체', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 제7차 청소년정책기본계획의 비전은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 정책 목표와 추진 전략\n3. 중점 과제\n4. 이전 계획과의 비교\n5. 연습문제 3개' },
        { id: 32, question: '1998년 설립된 청소년 전담 중앙행정기관은?', answer: '국가청소년위원회', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 1998년 설립된 청소년 전담 중앙행정기관은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 설립 배경과 목적\n3. 주요 업무\n4. 이후 변천\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic6',
      title: '청소년 행정체계',
      icon: '🏛️',
      questions: [
        { id: 33, question: '현재 청소년 정책 주무부처와 소관 부서는?', answer: '여성가족부 청소년정책관', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 현재 청소년 정책 주무부처와 소관 부서는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 조직 구조\n3. 주요 업무\n4. 관련 부처와 협력\n5. 연습문제 3개' },
        { id: 34, question: '한국청소년활동진흥원의 주요 기능은?', answer: '청소년활동 진흥, 수련활동 인증, 지도자 연수', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 한국청소년활동진흥원의 주요 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 설립 근거\n3. 주요 사업\n4. 지역 조직과 연계\n5. 연습문제 3개' },
        { id: 35, question: '한국청소년상담복지개발원의 역할은?', answer: '청소년상담, 복지정책 연구개발, 전문인력 양성', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 한국청소년상담복지개발원의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 설립 목적\n3. 주요 사업\n4. 지역센터와 연계\n5. 연습문제 3개' },
        { id: 36, question: '시·도 청소년활동진흥센터의 설치 근거와 역할은?', answer: '청소년활동진흥법, 지역 청소년활동 지원', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 시·도 청소년활동진흥센터의 설치 근거와 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 업무\n3. 운영 체계\n4. 중앙-지역 연계\n5. 연습문제 3개' },
        { id: 37, question: '청소년단체의 정의와 대표적인 청소년단체를 나열하시오.', answer: '청소년육성을 목적으로 하는 단체. 한국스카우트연맹, 대한적십자사 청소년적십자 등', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년단체의 정의와 대표적인 청소년단체를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 단체 유형 분류\n3. 주요 단체별 활동\n4. 단체 지원 정책\n5. 연습문제 3개' },
        { id: 38, question: '청소년육성전담공무원 제도의 도입 배경과 역할은?', answer: '지방자치단체 청소년 업무 전담, 현장 지원', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년육성전담공무원 제도의 도입 배경과 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 자격 요건\n3. 주요 업무\n4. 배치 현황\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic7',
      title: '국제 청소년 정책',
      icon: '🌍',
      questions: [
        { id: 39, question: 'UN 아동권리협약의 4대 기본권리는?', answer: '생존권, 보호권, 발달권, 참여권', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: UN 아동권리협약의 4대 기본권리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 권리의 내용\n3. 국내 이행 현황\n4. 관련 정책\n5. 연습문제 3개' },
        { id: 40, question: '한국의 UN 아동권리협약 비준 연도는?', answer: '1991년', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 한국의 UN 아동권리협약 비준 연도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 비준 과정\n3. 이행 보고\n4. 주요 권고 사항\n5. 연습문제 3개' },
        { id: 41, question: 'ILO 협약에서 규정하는 최저 취업연령은?', answer: '15세(위험 업무 18세)', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: ILO 협약에서 규정하는 최저 취업연령은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 협약 내용\n3. 국내 근로기준법과 비교\n4. 청소년 근로 보호\n5. 연습문제 3개' },
        { id: 42, question: '세계청소년기구(WAY)의 설립 목적과 활동은?', answer: '전 세계 청소년의 권익 증진 및 국제 교류', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 세계청소년기구(WAY)의 설립 목적과 활동은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 조직 구조\n3. 주요 활동\n4. 한국의 참여\n5. 연습문제 3개' },
        { id: 43, question: '국제청소년교류 프로그램의 종류와 효과는?', answer: '홈스테이, 워크캠프, 청소년 교류 방문 등', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 국제청소년교류 프로그램의 종류와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 프로그램 유형별 특성\n3. 참여 방법\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 44, question: '청소년 분야 SDGs(지속가능발전목표)와 관련된 목표는?', answer: '양질의 교육(4), 좋은 일자리(8), 불평등 감소(10) 등', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년 분야 SDGs와 관련된 목표는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 관련 목표별 내용\n3. 청소년 정책과의 연계\n4. 이행 현황\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic8',
      title: '청소년 관련 기관',
      icon: '🏢',
      questions: [
        { id: 45, question: '청소년수련관과 청소년문화의집의 차이점은?', answer: '수련관은 종합시설(1,500㎡ 이상), 문화의집은 소규모 근린시설(200㎡ 이상)', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년수련관과 청소년문화의집의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설 기준 비교\n3. 프로그램 차이\n4. 운영 방식\n5. 연습문제 3개' },
        { id: 46, question: '청소년복지시설의 종류를 나열하시오.', answer: '청소년쉼터, 청소년자립지원관, 청소년치료재활센터', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년복지시설의 종류를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 시설의 역할\n3. 이용 대상\n4. 설치 현황\n5. 연습문제 3개' },
        { id: 47, question: '학교밖청소년지원센터(꿈드림)의 주요 지원 내용은?', answer: '상담, 교육, 취업, 자립 지원', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 학교밖청소년지원센터(꿈드림)의 주요 지원 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 지원 프로그램\n3. 이용 절차\n4. 연계 서비스\n5. 연습문제 3개' },
        { id: 48, question: '청소년수련원과 청소년야영장의 차이점은?', answer: '수련원은 숙박형 종합시설, 야영장은 야외 야영 중심', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년수련원과 청소년야영장의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설 기준\n3. 프로그램 특성\n4. 이용 방법\n5. 연습문제 3개' },
        { id: 49, question: '청소년특화시설의 정의와 예시는?', answer: '특정 분야 전문 수련시설. 예: 청소년해양센터, 청소년우주센터', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년특화시설의 정의와 예시는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설 유형\n3. 주요 프로그램\n4. 이용 안내\n5. 연습문제 3개' },
        { id: 50, question: '청소년 활동 정보 포털 사이트(e청소년)의 기능은?', answer: '청소년활동 정보 제공, 프로그램 검색, 자원봉사 관리', prompt: '청소년지도사 2급 청소년육성제도론 문제입니다.\n\n문제: 청소년 활동 정보 포털 사이트(e청소년)의 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 제공 서비스\n3. 이용 방법\n4. 연계 시스템\n5. 연습문제 3개' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const progress = (completedQuestions.length / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor-2" className="text-gray-500 hover:text-gray-700">청소년지도사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년육성제도론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">청소년육성제도론</h1>
              <p className="text-green-100">청소년 관련 법령과 정책의 이해</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-green-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">
                      {topic.questions.filter(q => completedQuestions.includes(q.id)).length} / {topic.questions.length} 완료
                    </p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            {q.id}. {q.question}
                          </p>
                          <p className="text-sm text-green-600 mt-1">💡 {q.answer}</p>
                          <button
                            onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="mt-2 px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition"
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
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
    </div>
  );
}
