'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function YouthCultureStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-youth-culture-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-youth-culture-progress', JSON.stringify(completedQuestions));
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
      title: '청소년문화의 개념',
      icon: '🎭',
      questions: [
        { id: 1, question: '문화의 일반적 정의는?', answer: '한 사회 구성원이 공유하는 생활양식, 가치관, 신념의 총체', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 문화의 일반적 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 문화의 특성\n3. 문화의 기능\n4. 청소년문화와의 연결\n5. 연습문제 3개' },
        { id: 2, question: '청소년문화의 정의와 특성은?', answer: '청소년 세대가 공유하는 독특한 생활양식과 가치관', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년문화의 정의와 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년문화의 특성\n3. 성인문화와의 차이\n4. 청소년문화의 기능\n5. 연습문제 3개' },
        { id: 3, question: '청소년문화에 대한 관점 3가지는?', answer: '미숙한 문화, 비행문화, 하위문화, 대항문화, 독자적 문화', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년문화에 대한 관점 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 관점의 내용\n3. 관점별 시사점\n4. 바람직한 이해\n5. 연습문제 3개' },
        { id: 4, question: '청소년문화의 양면성이란?', answer: '긍정적 측면(창의성, 역동성)과 부정적 측면(일탈, 퇴폐) 공존', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년문화의 양면성이란?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 측면\n3. 부정적 측면\n4. 균형 잡힌 이해\n5. 연습문제 3개' },
        { id: 5, question: '세대(Generation)의 개념과 세대 간 차이의 원인은?', answer: '비슷한 시기에 태어난 집단, 사회변화·기술발전·가치관 차이', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 세대의 개념과 세대 간 차이의 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 세대 구분\n3. 세대 갈등 원인\n4. 세대 소통 방안\n5. 연습문제 3개' },
        { id: 6, question: 'MZ세대(밀레니얼+Z세대)의 문화적 특성은?', answer: '디지털 네이티브, 개인주의, 공정성 중시, 워라밸', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: MZ세대의 문화적 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 세대 특성\n3. 문화 소비 패턴\n4. 청소년 지도 시사점\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '청소년 하위문화',
      icon: '🎨',
      questions: [
        { id: 7, question: '하위문화(Subculture)의 정의는?', answer: '주류 문화 내에 존재하는 특정 집단의 독특한 문화', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 하위문화의 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 하위문화의 특성\n3. 청소년 하위문화 유형\n4. 사회적 의미\n5. 연습문제 3개' },
        { id: 8, question: '청소년 하위문화의 유형을 나열하시오.', answer: '팬덤문화, 게임문화, 힙합문화, 스트릿패션', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 하위문화의 유형을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형의 특성\n3. 형성 배경\n4. 교육적 활용\n5. 연습문제 3개' },
        { id: 9, question: '팬덤(Fandom) 문화의 특성과 기능은?', answer: '특정 대상에 대한 열정적 지지, 정체성 형성·사회적 연대', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 팬덤 문화의 특성과 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 팬덤의 특성\n3. 긍정적/부정적 기능\n4. 건강한 팬덤 문화\n5. 연습문제 3개' },
        { id: 10, question: '청소년 패션문화의 특성과 의미는?', answer: '자기표현, 또래집단 소속감, 정체성 탐색', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 패션문화의 특성과 의미는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 패션의 사회적 의미\n3. 청소년 패션 트렌드\n4. 지도 시 유의점\n5. 연습문제 3개' },
        { id: 11, question: '언어문화(신조어, 줄임말)의 형성 배경과 특성은?', answer: '빠른 소통, 집단 정체성, 재미 추구', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 언어문화의 형성 배경과 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신조어 유형\n3. 형성 배경\n4. 언어문화 지도\n5. 연습문제 3개' },
        { id: 12, question: '대항문화(Counterculture)와 청소년의 관계는?', answer: '기존 질서에 대한 저항과 새로운 가치 추구', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 대항문화와 청소년의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 대항문화의 역사\n3. 현대 청소년 대항문화\n4. 사회적 의미\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '미디어와 청소년',
      icon: '📱',
      questions: [
        { id: 13, question: '미디어가 청소년에게 미치는 영향은?', answer: '정보획득, 사회화, 오락, 부정적 영향(폭력성, 선정성)', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 미디어가 청소년에게 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 영향\n3. 부정적 영향\n4. 미디어 교육\n5. 연습문제 3개' },
        { id: 14, question: '미디어 리터러시(Media Literacy)의 정의와 필요성은?', answer: '미디어를 비판적으로 이해하고 활용하는 능력', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 미디어 리터러시의 정의와 필요성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성 요소\n3. 필요성\n4. 교육 방법\n5. 연습문제 3개' },
        { id: 15, question: '소셜미디어(SNS)가 청소년에게 미치는 영향은?', answer: '소통 확대, 자기표현, 사이버불링, 비교문화', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 소셜미디어가 청소년에게 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 영향\n3. 부정적 영향\n4. 건강한 사용 지도\n5. 연습문제 3개' },
        { id: 16, question: '유튜브, 틱톡 등 영상 플랫폼이 청소년문화에 미치는 영향은?', answer: '콘텐츠 창작자로서의 청소년, 짧은 콘텐츠 선호', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 영상 플랫폼이 청소년문화에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년 이용 현황\n3. 문화적 영향\n4. 교육적 활용\n5. 연습문제 3개' },
        { id: 17, question: '가짜뉴스(Fake News)와 청소년의 관계는?', answer: '정보 판별력 부족, 확산 기여, 비판적 사고 필요', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 가짜뉴스와 청소년의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 가짜뉴스의 유형\n3. 청소년 영향\n4. 미디어 리터러시 교육\n5. 연습문제 3개' },
        { id: 18, question: '디지털 시민성(Digital Citizenship)의 개념과 요소는?', answer: '디지털 환경에서의 책임감 있는 시민 역할', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 디지털 시민성의 개념과 요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성 요소\n3. 교육 내용\n4. 실천 방안\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '인터넷·게임 문화',
      icon: '🎮',
      questions: [
        { id: 19, question: '청소년 인터넷 이용 현황과 특성은?', answer: '높은 이용률, 모바일 중심, 다양한 활동', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 인터넷 이용 현황과 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 이용 현황 통계\n3. 이용 목적\n4. 문제점과 대책\n5. 연습문제 3개' },
        { id: 20, question: '온라인 게임 문화의 특성과 영향은?', answer: '가상 세계 경험, 사회적 상호작용, 과몰입 위험', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 온라인 게임 문화의 특성과 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 측면\n3. 부정적 측면\n4. 건전한 게임 문화\n5. 연습문제 3개' },
        { id: 21, question: '게임 과몰입의 원인과 예방책은?', answer: '현실 도피, 보상 체계, 사회성 부족', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 게임 과몰입의 원인과 예방책은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 원인 분석\n3. 예방 전략\n4. 상담 접근\n5. 연습문제 3개' },
        { id: 22, question: '사이버불링(Cyberbullying)의 유형과 대처방안은?', answer: '악플, 따돌림, 개인정보 유출, 허위사실 유포', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 사이버불링의 유형과 대처방안은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유형별 특성\n3. 피해 영향\n4. 예방 및 대처\n5. 연습문제 3개' },
        { id: 23, question: '개인정보 보호와 청소년의 관계는?', answer: '개인정보 노출 위험, 보호 인식 부족', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 개인정보 보호와 청소년의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 위험 요인\n3. 보호 방법\n4. 교육 내용\n5. 연습문제 3개' },
        { id: 24, question: 'e스포츠가 청소년문화에 미치는 영향은?', answer: '새로운 직업군, 게임의 스포츠화, 과몰입 우려', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: e스포츠가 청소년문화에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. e스포츠 현황\n3. 청소년 참여\n4. 교육적 활용\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '또래 문화',
      icon: '👫',
      questions: [
        { id: 25, question: '또래집단(Peer Group)의 기능은?', answer: '정서적 지지, 사회화, 정체성 형성, 자율성 발달', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 또래집단의 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 기능\n3. 부정적 기능\n4. 건강한 또래관계 지도\n5. 연습문제 3개' },
        { id: 26, question: '또래동조(Peer Conformity)의 특성과 영향은?', answer: '또래 규범에 맞추려는 경향, 긍정적/부정적 영향', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 또래동조의 특성과 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 동조 요인\n3. 영향\n4. 지도 방안\n5. 연습문제 3개' },
        { id: 27, question: '또래압력(Peer Pressure)의 유형과 대처법은?', answer: '직접적/간접적 압력, 자기주장 훈련', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 또래압력의 유형과 대처법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 압력 유형\n3. 부정적 영향\n4. 대처 기술\n5. 연습문제 3개' },
        { id: 28, question: '청소년 우정의 발달 특성은?', answer: '친밀감 증가, 상호성, 충성심, 갈등 해결', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 우정의 발달 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 우정 발달 단계\n3. 성별 차이\n4. 건강한 우정 지도\n5. 연습문제 3개' },
        { id: 29, question: '청소년 연애문화의 특성과 지도 방안은?', answer: '정서적 친밀감 탐색, 정체성 발달', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 연애문화의 특성과 지도 방안은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 연애 특성\n3. 건강한 관계 지도\n4. 주의사항\n5. 연습문제 3개' },
        { id: 30, question: '온라인 또래관계의 특성과 영향은?', answer: 'SNS 기반, 익명성, 확장된 네트워크', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 온라인 또래관계의 특성과 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 온라인 관계 특성\n3. 긍정적/부정적 측면\n4. 균형 잡힌 관계 형성\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic6',
      title: '여가 문화',
      icon: '🎪',
      questions: [
        { id: 31, question: '여가(Leisure)의 정의와 기능은?', answer: '자유시간에 자발적으로 하는 활동, 재충전·성장·사회화', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 여가의 정의와 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 여가의 기능\n3. 청소년 여가 특성\n4. 여가 지도\n5. 연습문제 3개' },
        { id: 32, question: '청소년 여가활동의 유형은?', answer: '스포츠, 취미, 문화예술, 사회활동, 휴식', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 여가활동의 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형 특성\n3. 이용 현황\n4. 활성화 방안\n5. 연습문제 3개' },
        { id: 33, question: '청소년 여가 실태와 문제점은?', answer: '학업 중심 시간 부족, 수동적 여가, 상업화', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 여가 실태와 문제점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 여가 실태\n3. 문제점 분석\n4. 개선 방안\n5. 연습문제 3개' },
        { id: 34, question: '건전한 여가활동 육성 정책은?', answer: '청소년수련시설, 동아리 지원, 문화예술 프로그램', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 건전한 여가활동 육성 정책은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 정책 유형\n3. 프로그램 사례\n4. 발전 방향\n5. 연습문제 3개' },
        { id: 35, question: '여가교육의 필요성과 내용은?', answer: '여가 역량 개발, 균형 있는 삶', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 여가교육의 필요성과 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 필요성\n3. 교육 내용\n4. 프로그램 구성\n5. 연습문제 3개' },
        { id: 36, question: '청소년 스포츠활동의 효과는?', answer: '신체발달, 사회성, 스트레스 해소, 자기효능감', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 스포츠활동의 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신체적 효과\n3. 심리사회적 효과\n4. 활성화 방안\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic7',
      title: '소비 문화',
      icon: '🛍️',
      questions: [
        { id: 37, question: '청소년 소비문화의 특성은?', answer: '충동구매, 브랜드 선호, 또래 영향, 온라인 쇼핑', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 소비문화의 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 소비 특성\n3. 영향 요인\n4. 교육적 시사점\n5. 연습문제 3개' },
        { id: 38, question: '소비자 사회화(Consumer Socialization)의 개념과 영향요인은?', answer: '소비자 역할 학습, 가족·또래·미디어 영향', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 소비자 사회화의 개념과 영향요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 사회화 과정\n3. 영향 요인\n4. 교육 방안\n5. 연습문제 3개' },
        { id: 39, question: '윤리적 소비의 정의와 실천은?', answer: '환경·인권·공정무역 고려한 소비', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 윤리적 소비의 정의와 실천은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 윤리적 소비 유형\n3. 청소년 실천\n4. 교육 방안\n5. 연습문제 3개' },
        { id: 40, question: '합리적 소비를 위한 교육 내용은?', answer: '욕구와 필요 구분, 예산 관리, 광고 비판', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 합리적 소비를 위한 교육 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 교육 내용\n3. 지도 방법\n4. 프로그램 예시\n5. 연습문제 3개' },
        { id: 41, question: '청소년 용돈 관리 교육의 내용은?', answer: '예산 세우기, 저축, 지출 기록', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 청소년 용돈 관리 교육의 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 관리 기술\n3. 교육 방법\n4. 활동 예시\n5. 연습문제 3개' },
        { id: 42, question: '과시소비와 청소년의 관계는?', answer: '사회적 지위 표현, 또래 인정 욕구', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 과시소비와 청소년의 관계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 원인 분석\n3. 문제점\n4. 지도 방안\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic8',
      title: '다문화 청소년',
      icon: '🌍',
      questions: [
        { id: 43, question: '다문화 청소년의 정의와 유형은?', answer: '국제결혼가정, 외국인가정, 중도입국 청소년', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 다문화 청소년의 정의와 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 유형별 특성\n3. 현황 통계\n4. 지원 정책\n5. 연습문제 3개' },
        { id: 44, question: '다문화 청소년이 경험하는 어려움은?', answer: '언어, 문화 적응, 정체성 혼란, 차별 경험', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 다문화 청소년이 경험하는 어려움은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 어려움 유형\n3. 영향\n4. 지원 방안\n5. 연습문제 3개' },
        { id: 45, question: '다문화 감수성(Multicultural Sensitivity)의 개념과 발달은?', answer: '문화 차이 인식 및 존중 능력', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 다문화 감수성의 개념과 발달은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 발달 단계\n3. 교육 방법\n4. 프로그램 예시\n5. 연습문제 3개' },
        { id: 46, question: '다문화 청소년 지원 정책 및 프로그램은?', answer: '언어교육, 심리상담, 멘토링, 문화체험', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 다문화 청소년 지원 정책 및 프로그램은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 정책 현황\n3. 프로그램 유형\n4. 개선 방안\n5. 연습문제 3개' },
        { id: 47, question: '이중언어, 이중문화의 장점과 지원은?', answer: '인지적 유연성, 문화적 자원', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 이중언어, 이중문화의 장점과 지원은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 장점\n3. 정체성 형성\n4. 지원 방안\n5. 연습문제 3개' },
        { id: 48, question: '북한이탈청소년의 특성과 지원은?', answer: '적응 어려움, 교육격차, 심리적 어려움', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 북한이탈청소년의 특성과 지원은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 특성과 어려움\n3. 지원 기관\n4. 프로그램\n5. 연습문제 3개' },
        { id: 49, question: '문화다양성 교육의 목표와 내용은?', answer: '다양성 인정, 편견 감소, 공존 능력', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 문화다양성 교육의 목표와 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 교육 목표\n3. 내용 구성\n4. 활동 예시\n5. 연습문제 3개' },
        { id: 50, question: '글로벌 시민의식과 청소년의 역할은?', answer: '세계적 문제 인식, 연대, 참여', prompt: '청소년지도사 2급 청소년문화 문제입니다.\n\n문제: 글로벌 시민의식과 청소년의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성 요소\n3. 청소년 참여\n4. 교육 방안\n5. 연습문제 3개' },
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
            <span className="text-orange-600 font-medium">청소년문화</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl"><span className="text-4xl">🎭</span></div>
            <div>
              <h1 className="text-2xl font-bold">청소년문화</h1>
              <p className="text-orange-100">현대 청소년 문화현상, 미디어, 여가활동</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-orange-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
                        <button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${completedQuestions.includes(q.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 hover:border-orange-500'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{q.id}. {q.question}</p>
                          <p className="text-sm text-orange-600 mt-1">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition">🤖 AI에게 질문하기</button>
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
