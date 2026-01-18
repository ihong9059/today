'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function YouthActivityStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-youth-activity-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-youth-activity-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]);
  };

  const topics = [
    {
      id: 'topic1',
      title: '청소년활동의 개념',
      icon: '🎯',
      questions: [
        { id: 1, question: '청소년활동의 정의(청소년활동진흥법)는?', answer: '청소년의 균형 있는 성장을 위한 수련활동, 교류활동, 문화활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동의 정의(청소년활동진흥법)는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법적 정의\n3. 활동 유형\n4. 학교교육과의 관계\n5. 연습문제 3개' },
        { id: 2, question: '청소년활동의 목적과 기능은?', answer: '전인적 성장, 사회성 발달, 자기개발, 시민의식 함양', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동의 목적과 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 목적\n3. 사회적 기능\n4. 개인적 기능\n5. 연습문제 3개' },
        { id: 3, question: '청소년활동의 원리 5가지는?', answer: '자발성, 자치성, 체험성, 연속성, 다양성', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동의 원리 5가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 원리의 의미\n3. 실제 적용\n4. 프로그램 설계 시 고려\n5. 연습문제 3개' },
        { id: 4, question: '청소년활동과 청소년육성의 관계는?', answer: '청소년육성은 상위개념, 활동은 육성의 핵심 수단', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동과 청소년육성의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 육성의 개념\n3. 활동의 위치\n4. 상호관계\n5. 연습문제 3개' },
        { id: 5, question: '청소년활동의 영역(수련, 교류, 문화)별 특성은?', answer: '수련-심신단련, 교류-소통협력, 문화-예술창작', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동의 영역별 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 수련활동 특성\n3. 교류활동 특성\n4. 문화활동 특성\n5. 연습문제 3개' },
        { id: 6, question: '청소년활동 정책의 발전 과정은?', answer: '1990년대 체계화, 2000년대 다양화, 2010년대 안전 강화', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년활동 정책의 발전 과정은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시기별 특성\n3. 주요 정책\n4. 향후 방향\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '수련활동',
      icon: '🏕️',
      questions: [
        { id: 7, question: '수련활동의 정의와 특성은?', answer: '심신을 단련하고 자질을 배양하는 체험활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 수련활동의 정의와 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법적 정의\n3. 활동 특성\n4. 유형과 예시\n5. 연습문제 3개' },
        { id: 8, question: '수련활동의 유형을 분류하시오.', answer: '야영활동, 모험활동, 환경활동, 봉사활동, 체험활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 수련활동의 유형을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형 설명\n3. 프로그램 예시\n4. 지도 방법\n5. 연습문제 3개' },
        { id: 9, question: '청소년수련활동 인증제의 목적과 절차는?', answer: '활동 질 보장, 신청→심사→인증→사후관리', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년수련활동 인증제의 목적과 절차는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 도입 배경\n3. 인증 절차\n4. 인증 기준\n5. 연습문제 3개' },
        { id: 10, question: '숙박형 수련활동 신고제의 내용은?', answer: '19세 미만 대상 숙박활동 사전 신고 의무', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 숙박형 수련활동 신고제의 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신고 대상\n3. 신고 절차\n4. 위반 시 처벌\n5. 연습문제 3개' },
        { id: 11, question: '모험활동(Adventure Activity)의 정의와 효과는?', answer: '도전과 위험을 수반한 활동, 자기효능감·문제해결력 향상', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 모험활동의 정의와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 활동 유형\n3. 교육적 효과\n4. 안전관리\n5. 연습문제 3개' },
        { id: 12, question: '야영활동의 교육적 가치는?', answer: '자연체험, 공동생활, 자립심, 사회성 발달', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 야영활동의 교육적 가치는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 야영의 유형\n3. 교육적 효과\n4. 프로그램 구성\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '교류활동',
      icon: '🤝',
      questions: [
        { id: 13, question: '교류활동의 정의와 목적은?', answer: '다른 지역·문화권 청소년과의 상호교류', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 교류활동의 정의와 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법적 정의\n3. 교류 유형\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 14, question: '국내 청소년교류 프로그램의 유형은?', answer: '지역간 교류, 도농 교류, 남북 교류', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 국내 청소년교류 프로그램의 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유형별 특성\n3. 프로그램 예시\n4. 운영 방법\n5. 연습문제 3개' },
        { id: 15, question: '국제청소년교류의 유형과 효과는?', answer: '방문교류, 홈스테이, 워크캠프, 글로벌역량 강화', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 국제청소년교류의 유형과 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 교류 유형\n3. 기대 효과\n4. 참여 방법\n5. 연습문제 3개' },
        { id: 16, question: '한-아세안 청소년교류 프로그램은?', answer: '정부 주도 국제교류, 문화체험 및 네트워킹', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 한-아세안 청소년교류 프로그램은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 프로그램 내용\n3. 참여 자격\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 17, question: '세계청소년축전(World Youth Festival)의 의의는?', answer: '청소년 국제교류 및 문화 축제', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 세계청소년축전의 의의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 행사 내용\n3. 참여 효과\n4. 한국 참가 현황\n5. 연습문제 3개' },
        { id: 18, question: '교류활동 운영 시 유의사항은?', answer: '문화 차이 이해, 안전관리, 사전 준비, 사후 활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 교류활동 운영 시 유의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 준비 단계\n3. 진행 중 유의점\n4. 사후 활동\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '문화활동',
      icon: '🎨',
      questions: [
        { id: 19, question: '문화활동의 정의와 범위는?', answer: '예술, 스포츠, 여가 등 문화적 역량 개발 활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 문화활동의 정의와 범위는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법적 정의\n3. 활동 영역\n4. 프로그램 예시\n5. 연습문제 3개' },
        { id: 20, question: '청소년 문화예술교육의 목표와 내용은?', answer: '창의성, 감수성, 표현력 개발', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년 문화예술교육의 목표와 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 교육 목표\n3. 내용 영역\n4. 프로그램 구성\n5. 연습문제 3개' },
        { id: 21, question: '청소년 동아리활동의 의의와 지원은?', answer: '자발적 모임, 공동 관심사 추구, 사회성 발달', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년 동아리활동의 의의와 지원은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 동아리 유형\n3. 교육적 효과\n4. 지원 정책\n5. 연습문제 3개' },
        { id: 22, question: '청소년어울림마당의 정의와 운영은?', answer: '청소년이 주도하는 문화·예술 축제', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년어울림마당의 정의와 운영은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 운영 목적\n3. 프로그램 구성\n4. 참여 효과\n5. 연습문제 3개' },
        { id: 23, question: '미디어 창작활동의 유형과 효과는?', answer: 'UCC, 팟캐스트, 웹툰 등 디지털 콘텐츠 제작', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 미디어 창작활동의 유형과 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 활동 유형\n3. 교육적 효과\n4. 지도 방법\n5. 연습문제 3개' },
        { id: 24, question: '청소년 스포츠활동 지원 정책은?', answer: '스포츠바우처, 학교체육, 방과후 체육', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년 스포츠활동 지원 정책은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 정책 유형\n3. 프로그램 현황\n4. 참여 효과\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '봉사활동',
      icon: '💝',
      questions: [
        { id: 25, question: '봉사활동의 정의와 특성은?', answer: '자발적, 무보수, 공익적, 지속적 활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 봉사활동의 정의와 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 핵심 특성\n3. 유형 분류\n4. 청소년 봉사 의미\n5. 연습문제 3개' },
        { id: 26, question: '청소년 봉사활동의 교육적 효과는?', answer: '시민의식, 공동체 의식, 자아존중감 향상', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년 봉사활동의 교육적 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 개인적 효과\n3. 사회적 효과\n4. 효과 측정\n5. 연습문제 3개' },
        { id: 27, question: '봉사학습(Service-Learning)의 개념과 특징은?', answer: '봉사와 학습의 통합, 반성적 학습 강조', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 봉사학습의 개념과 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 일반 봉사와 차이\n3. 핵심 요소\n4. 프로그램 설계\n5. 연습문제 3개' },
        { id: 28, question: '1365자원봉사포털의 기능은?', answer: '봉사활동 정보, 실적 관리, 인증', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 1365자원봉사포털의 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 기능\n3. 이용 방법\n4. 청소년 활용\n5. 연습문제 3개' },
        { id: 29, question: '청소년 봉사활동 운영의 문제점과 개선방안은?', answer: '실적 중심, 형식적 참여, 질적 관리 필요', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년 봉사활동 운영의 문제점과 개선방안은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 현행 문제점\n3. 개선 방안\n4. 바람직한 방향\n5. 연습문제 3개' },
        { id: 30, question: '재능기부형 봉사활동의 유형은?', answer: '교육봉사, 문화예술봉사, 전문기술봉사', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 재능기부형 봉사활동의 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유형별 예시\n3. 청소년 참여\n4. 운영 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic6',
      title: '청소년수련시설',
      icon: '🏛️',
      questions: [
        { id: 31, question: '청소년수련시설의 종류 5가지는?', answer: '수련관, 수련원, 문화의집, 특화시설, 야영장', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년수련시설의 종류 5가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 시설 정의\n3. 설치 기준\n4. 기능과 역할\n5. 연습문제 3개' },
        { id: 32, question: '청소년수련관의 정의와 역할은?', answer: '종합수련시설, 다양한 수련활동 제공', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년수련관의 정의와 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 설치 기준\n3. 주요 프로그램\n4. 운영 현황\n5. 연습문제 3개' },
        { id: 33, question: '청소년문화의집의 특성과 기능은?', answer: '소규모 근린시설, 일상적 문화활동 공간', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년문화의집의 특성과 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 설치 기준\n3. 주요 기능\n4. 수련관과 차이\n5. 연습문제 3개' },
        { id: 34, question: '청소년수련원의 특성과 프로그램은?', answer: '숙박형 종합시설, 집중 수련활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년수련원의 특성과 프로그램은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설 기준\n3. 프로그램 유형\n4. 운영 방식\n5. 연습문제 3개' },
        { id: 35, question: '청소년특화시설의 유형과 사례는?', answer: '해양, 우주, 예술, 역사 등 특화 분야', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년특화시설의 유형과 사례는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유형별 예시\n3. 프로그램 특성\n4. 이용 안내\n5. 연습문제 3개' },
        { id: 36, question: '청소년야영장의 정의와 운영은?', answer: '야외 야영활동 시설, 자연체험 중심', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년야영장의 정의와 운영은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 시설 기준\n3. 프로그램 구성\n4. 안전관리\n5. 연습문제 3개' },
        { id: 37, question: '청소년수련시설 종합평가의 목적과 내용은?', answer: '시설 운영 품질 관리, 3년 주기 평가', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년수련시설 종합평가의 목적과 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 평가 주기\n3. 평가 항목\n4. 결과 활용\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic7',
      title: '청소년동아리',
      icon: '🎪',
      questions: [
        { id: 38, question: '청소년동아리의 정의와 유형은?', answer: '청소년이 자발적으로 구성한 소모임', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 청소년동아리의 정의와 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 동아리 유형\n3. 구성 원리\n4. 활동 영역\n5. 연습문제 3개' },
        { id: 39, question: '동아리활동의 교육적 가치는?', answer: '자기주도성, 협동심, 리더십, 사회성 발달', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 동아리활동의 교육적 가치는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 개인 발달 효과\n3. 사회적 효과\n4. 활동 지도\n5. 연습문제 3개' },
        { id: 40, question: '동아리 지도자의 역할은?', answer: '조언자, 촉진자, 자원연결자, 멘토', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 동아리 지도자의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 역할별 내용\n3. 효과적 지도\n4. 자율성 존중\n5. 연습문제 3개' },
        { id: 41, question: '동아리 활성화를 위한 지원 방안은?', answer: '공간, 재정, 네트워킹, 역량강화', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 동아리 활성화를 위한 지원 방안은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 지원 유형\n3. 정책 현황\n4. 개선 방안\n5. 연습문제 3개' },
        { id: 42, question: '학교 밖 청소년동아리의 특성은?', answer: '자유로운 구성, 다양한 연령, 지역사회 연계', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 학교 밖 청소년동아리의 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 학교 동아리와 차이\n3. 운영 방식\n4. 지원 기관\n5. 연습문제 3개' },
        { id: 43, question: '온라인 동아리활동의 특성과 유의점은?', answer: '시공간 초월, 관심사 중심, 안전 관리 필요', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 온라인 동아리활동의 특성과 유의점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 장점과 단점\n3. 유의사항\n4. 지도 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic8',
      title: '국제청소년성취포상제',
      icon: '🏆',
      questions: [
        { id: 44, question: '국제청소년성취포상제의 정의와 목적은?', answer: '청소년 자기개발 및 성취 인증 프로그램', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 국제청소년성취포상제의 정의와 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 도입 배경\n3. 운영 목적\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 45, question: '포상제의 4대 활동영역은?', answer: '봉사활동, 자기개발활동, 신체단련활동, 탐험활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 포상제의 4대 활동영역은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 영역 내용\n3. 활동 기준\n4. 인정 활동\n5. 연습문제 3개' },
        { id: 46, question: '포상 단계(동장, 은장, 금장)별 기준은?', answer: '동장(6개월), 은장(12개월), 금장(18개월) 활동', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 포상 단계별 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 단계별 조건\n3. 연령 기준\n4. 달성 과정\n5. 연습문제 3개' },
        { id: 47, question: '합숙활동의 정의와 운영은?', answer: '금장 필수, 4박5일 공동생활 체험', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 합숙활동의 정의와 운영은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 활동 내용\n3. 운영 방법\n4. 교육적 의미\n5. 연습문제 3개' },
        { id: 48, question: '포상담당관의 역할은?', answer: '참여 청소년 지원, 활동 인증, 포상 추천', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 포상담당관의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 역할 내용\n3. 자격 요건\n4. 양성 과정\n5. 연습문제 3개' },
        { id: 49, question: '포상제의 국제적 현황은?', answer: '140개국 이상 운영, 에든버러공작상(DofE)', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 포상제의 국제적 현황은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 역사와 발전\n3. 국제 운영\n4. 한국 현황\n5. 연습문제 3개' },
        { id: 50, question: '포상제 참여를 통한 청소년 역량 변화는?', answer: '자기효능감, 목표달성 능력, 사회성 향상', prompt: '청소년지도사 2급 청소년활동 문제입니다.\n\n문제: 포상제 참여를 통한 청소년 역량 변화는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 역량 변화 영역\n3. 연구 결과\n4. 효과 측정\n5. 연습문제 3개' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const progress = (completedQuestions.length / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor-2" className="text-gray-500 hover:text-gray-700">청소년지도사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">청소년활동</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl"><span className="text-4xl">⚽</span></div>
            <div>
              <h1 className="text-2xl font-bold">청소년활동</h1>
              <p className="text-teal-100">체험활동, 봉사활동, 국제교류</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-teal-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.filter(q => completedQuestions.includes(q.id)).length} / {topic.questions.length} 완료</p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${completedQuestions.includes(q.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300 hover:border-teal-500'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{q.id}. {q.question}</p>
                          <p className="text-sm text-teal-600 mt-1">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition">🤖 AI에게 질문하기</button>
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

      <footer className="bg-gray-800 text-white py-8"><div className="max-w-4xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
