'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SupervisionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-1-supervision-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-1-supervision-progress', JSON.stringify(completedQuestions));
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
      title: '슈퍼비전의 개념과 목적',
      icon: '📖',
      questions: [
        { id: 1, question: '슈퍼비전(Supervision)의 정의와 목적을 설명하시오.', answer: '슈퍼비전은 경험 있는 상담자가 초심상담자의 전문적 발달을 촉진하기 위해 제공하는 교육·평가·지지 과정', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전(Supervision)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슈퍼비전의 정의\n2. 슈퍼비전의 3가지 기능 (교육, 지지, 평가)\n3. 슈퍼비전의 목적\n4. 상담과 슈퍼비전의 차이점\n5. 연습문제 3개' },
        { id: 2, question: '슈퍼비전의 세 가지 주요 기능(교육, 지지, 평가)을 설명하시오.', answer: '교육적 기능(지식·기술 전달), 지지적 기능(정서적 지원), 평가적 기능(수행능력 평가)', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전의 세 가지 주요 기능(교육, 지지, 평가)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육적 기능의 내용과 방법\n2. 지지적 기능의 역할\n3. 평가적 기능과 피드백\n4. 세 기능의 균형 유지 방법\n5. 연습문제 3개' },
        { id: 3, question: '효과적인 슈퍼바이저의 특성과 역량을 제시하시오.', answer: '전문적 역량, 관계형성 능력, 윤리적 민감성, 다문화적 역량, 평가 능력', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 효과적인 슈퍼바이저의 특성과 역량을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 전문적 역량 (상담이론, 기법)\n2. 관계형성 능력\n3. 윤리적 민감성\n4. 다문화적 역량\n5. 연습문제 3개' },
        { id: 4, question: '슈퍼비전과 상담의 공통점과 차이점을 비교하시오.', answer: '공통점: 관계형성, 성장촉진 / 차이점: 목표, 평가기능, 권위관계', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전과 상담의 공통점과 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 공통점 분석\n2. 목표의 차이\n3. 관계의 차이\n4. 평가 기능의 차이\n5. 연습문제 3개' },
        { id: 5, question: '슈퍼비전 계약의 필수 요소와 중요성을 설명하시오.', answer: '목표, 역할, 시간, 평가방법, 비밀보장 범위 등을 명시하여 기대 명확화', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전 계약의 필수 요소와 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슈퍼비전 계약의 정의\n2. 필수 포함 요소\n3. 계약의 중요성\n4. 계약 작성 시 주의사항\n5. 연습문제 3개' },
        { id: 6, question: '슈퍼비전 관계에서 발생할 수 있는 권력 이슈를 설명하시오.', answer: '평가 권한으로 인한 권력 불균형, 의존성 문제, 착취 위험성', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전 관계에서 발생할 수 있는 권력 이슈를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권력 불균형의 원인\n2. 잠재적 문제 상황\n3. 건강한 권력 관계 유지 방법\n4. 슈퍼바이지 보호 방안\n5. 연습문제 3개' }
      ]
    },
    {
      title: '슈퍼비전 모델',
      icon: '🎯',
      questions: [
        { id: 7, question: 'Stoltenberg의 통합발달모델(IDM)의 상담자 발달 4단계를 설명하시오.', answer: '1단계(의존), 2단계(의존-자율 갈등), 3단계(조건적 의존), 3i단계(통합)', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: Stoltenberg의 통합발달모델(IDM)의 상담자 발달 4단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1단계 특성과 슈퍼비전 전략\n2. 2단계 특성과 슈퍼비전 전략\n3. 3단계 특성과 슈퍼비전 전략\n4. 3i단계(통합) 특성\n5. 연습문제 3개' },
        { id: 8, question: 'Bernard의 차별적 슈퍼비전 모델을 설명하시오.', answer: '역할(교사, 상담자, 자문가) × 초점(과정기술, 개념화, 개인화) 매트릭스', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: Bernard의 차별적 슈퍼비전 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세 가지 슈퍼바이저 역할\n2. 세 가지 초점 영역\n3. 9가지 조합 활용 방법\n4. 모델의 장단점\n5. 연습문제 3개' },
        { id: 9, question: '정신역동적 슈퍼비전 모델의 특징과 핵심 개념을 설명하시오.', answer: '전이, 역전이, 병행과정(parallel process) 분석에 초점', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 정신역동적 슈퍼비전 모델의 특징과 핵심 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정신역동 모델의 기본 가정\n2. 전이와 역전이 분석\n3. 병행과정의 개념\n4. 슈퍼비전 적용 방법\n5. 연습문제 3개' },
        { id: 10, question: '인지행동 슈퍼비전 모델의 특징과 기법을 설명하시오.', answer: '인지적 개념화 훈련, 역할연습, 과제 부여, 자동적 사고 점검', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 인지행동 슈퍼비전 모델의 특징과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CBT 슈퍼비전의 목표\n2. 주요 기법과 전략\n3. 구조화된 슈퍼비전 세션\n4. CBT 슈퍼비전의 장점\n5. 연습문제 3개' },
        { id: 11, question: '시스템 접근 슈퍼비전 모델의 특징을 설명하시오.', answer: '상담자-내담자-슈퍼바이저-기관의 시스템적 상호작용 강조', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 시스템 접근 슈퍼비전 모델의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 관점의 기본 원리\n2. 다층적 시스템 분석\n3. 기관 맥락 고려\n4. 슈퍼비전 적용 방법\n5. 연습문제 3개' },
        { id: 12, question: '통합적 슈퍼비전 모델의 개념과 적용 방법을 설명하시오.', answer: '다양한 이론과 모델을 상황에 맞게 통합하여 적용', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 통합적 슈퍼비전 모델의 개념과 적용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합 모델의 필요성\n2. 이론 통합의 원칙\n3. 슈퍼바이지 맞춤형 적용\n4. 통합 모델의 장단점\n5. 연습문제 3개' },
        { id: 13, question: 'Hawkins와 Shohet의 7눈 모델(Seven-eyed Model)을 설명하시오.', answer: '내담자, 상담자, 관계, 슈퍼바이저 반응, 병행과정, 맥락, 전체 시스템', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: Hawkins와 Shohet의 7눈 모델(Seven-eyed Model)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 7가지 관점(눈) 개요\n2. 각 관점의 초점과 질문\n3. 모델 활용 방법\n4. 모델의 장점과 한계\n5. 연습문제 3개' }
      ]
    },
    {
      title: '사례개념화',
      icon: '📋',
      questions: [
        { id: 14, question: '사례개념화(Case Conceptualization)의 정의와 목적을 설명하시오.', answer: '내담자 문제를 이론적 틀로 이해하고 개입 방향을 설정하는 과정', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 사례개념화(Case Conceptualization)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례개념화의 정의\n2. 사례개념화의 목적과 기능\n3. 사례개념화의 구성요소\n4. 좋은 사례개념화의 특징\n5. 연습문제 3개' },
        { id: 15, question: '인지행동치료(CBT) 관점의 사례개념화 요소를 설명하시오.', answer: '핵심신념, 중간신념, 자동적 사고, 촉발상황, 반응패턴', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 인지행동치료(CBT) 관점의 사례개념화 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CBT 사례개념화의 특징\n2. 핵심신념과 중간신념\n3. 자동적 사고와 인지왜곡\n4. 사례개념화 다이어그램 작성법\n5. 연습문제 3개' },
        { id: 16, question: '정신역동적 관점의 사례개념화 요소를 설명하시오.', answer: '방어기제, 대상관계, 발달사, 전이패턴, 핵심갈등', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 정신역동적 관점의 사례개념화 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정신역동 사례개념화의 특징\n2. 초기 경험과 발달사\n3. 방어기제 분석\n4. 핵심갈등관계주제(CCRT)\n5. 연습문제 3개' },
        { id: 17, question: '사례개념화에서 문화적 요인의 중요성과 고려사항을 설명하시오.', answer: '문화적 정체성, 가치관, 사회적 맥락이 문제 이해와 개입에 영향', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 사례개념화에서 문화적 요인의 중요성과 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화적 사례개념화의 필요성\n2. 문화적 정체성 탐색\n3. 문화 관련 스트레스 요인\n4. 문화적으로 적절한 개입\n5. 연습문제 3개' },
        { id: 18, question: '사례개념화를 슈퍼비전에서 활용하는 방법을 제시하시오.', answer: '사례개념화 훈련, 대안적 개념화 탐색, 개입 전략 논의', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 사례개념화를 슈퍼비전에서 활용하는 방법을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 사례개념화 훈련 방법\n2. 슈퍼비전에서 개념화 검토\n3. 대안적 개념화 탐색\n4. 개념화와 개입 연결\n5. 연습문제 3개' },
        { id: 19, question: '초심상담자의 사례개념화 오류 유형과 지도 방법을 설명하시오.', answer: '과잉일반화, 이론 편향, 맥락 간과 등의 오류에 대한 피드백', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 초심상담자의 사례개념화 오류 유형과 지도 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흔한 사례개념화 오류\n2. 오류 발생 원인\n3. 효과적인 피드백 방법\n4. 개념화 능력 향상 전략\n5. 연습문제 3개' }
      ]
    },
    {
      title: '슈퍼비전 기술과 방법',
      icon: '🛠️',
      questions: [
        { id: 20, question: '슈퍼비전에서 사용하는 주요 기술(질문, 피드백, 직면 등)을 설명하시오.', answer: '개방형 질문, 구체적 피드백, 지지적 직면, 자기개방', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서 사용하는 주요 기술(질문, 피드백, 직면 등)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과적인 질문 기법\n2. 건설적 피드백 제공법\n3. 지지적 직면의 활용\n4. 슈퍼바이저의 자기개방\n5. 연습문제 3개' },
        { id: 21, question: '라이브 슈퍼비전(Live Supervision)의 방법과 장단점을 설명하시오.', answer: '실시간 관찰·개입으로 즉각적 피드백 가능하나 내담자에게 부담 줄 수 있음', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 라이브 슈퍼비전(Live Supervision)의 방법과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라이브 슈퍼비전의 정의\n2. 실시 방법 (일방경, 버그인이어 등)\n3. 장점과 교육적 효과\n4. 단점과 고려사항\n5. 연습문제 3개' },
        { id: 22, question: '녹음/녹화 자료를 활용한 슈퍼비전 방법을 설명하시오.', answer: '실제 상담 과정 검토를 통한 구체적 피드백, 자기관찰 촉진', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 녹음/녹화 자료를 활용한 슈퍼비전 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 녹음/녹화 슈퍼비전의 장점\n2. 자료 검토 방법\n3. 효과적인 피드백 제공\n4. 윤리적 고려사항\n5. 연습문제 3개' },
        { id: 23, question: '역할연습(Role Play)을 슈퍼비전에서 활용하는 방법을 제시하시오.', answer: '상담기술 연습, 내담자 관점 이해, 새로운 개입 시도', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 역할연습(Role Play)을 슈퍼비전에서 활용하는 방법을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 역할연습의 목적\n2. 효과적인 역할연습 진행법\n3. 피드백과 디브리핑\n4. 역할연습의 유의점\n5. 연습문제 3개' },
        { id: 24, question: 'IPR(Interpersonal Process Recall) 기법을 설명하시오.', answer: '녹화 자료를 보며 상담 순간의 생각과 감정을 탐색하는 기법', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: IPR(Interpersonal Process Recall) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IPR의 정의와 개발 배경\n2. IPR 진행 절차\n3. 탐색 질문 예시\n4. IPR의 효과와 활용\n5. 연습문제 3개' },
        { id: 25, question: '슈퍼비전에서 저항이 나타날 때 다루는 방법을 설명하시오.', answer: '저항의 원인 탐색, 안전한 환경 조성, 비방어적 대화', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서 저항이 나타날 때 다루는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슈퍼비전 저항의 유형\n2. 저항의 원인 탐색\n3. 효과적인 대처 전략\n4. 저항을 학습 기회로 활용\n5. 연습문제 3개' },
        { id: 26, question: '반영팀(Reflecting Team) 기법을 슈퍼비전에 적용하는 방법을 설명하시오.', answer: '관찰팀이 상담에 대한 반영을 제공하고 상담자가 이를 듣는 구조', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 반영팀(Reflecting Team) 기법을 슈퍼비전에 적용하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 반영팀의 개념과 원리\n2. 진행 절차\n3. 반영팀의 장점\n4. 적용 시 유의사항\n5. 연습문제 3개' }
      ]
    },
    {
      title: '집단슈퍼비전과 동료슈퍼비전',
      icon: '👥',
      questions: [
        { id: 27, question: '집단슈퍼비전의 장점과 단점을 비교하시오.', answer: '장점: 다양한 관점, 효율성 / 단점: 개별 시간 부족, 집단역동 관리 필요', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 집단슈퍼비전의 장점과 단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 집단슈퍼비전의 정의\n2. 주요 장점\n3. 주요 단점과 한계\n4. 효과적인 운영 방안\n5. 연습문제 3개' },
        { id: 28, question: '집단슈퍼비전에서 집단역동을 활용하는 방법을 설명하시오.', answer: '응집력, 보편성, 이타주의 등 집단치료 요인을 슈퍼비전에 적용', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 집단슈퍼비전에서 집단역동을 활용하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단슈퍼비전의 집단역동\n2. 치료적 요인 활용\n3. 집단 과정 촉진 기술\n4. 역동 관리의 어려움과 대처\n5. 연습문제 3개' },
        { id: 29, question: '동료슈퍼비전(Peer Supervision)의 구조와 운영 방법을 설명하시오.', answer: '동등한 지위의 상담자들이 상호 지지와 피드백을 제공하는 형태', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 동료슈퍼비전(Peer Supervision)의 구조와 운영 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동료슈퍼비전의 정의와 특징\n2. 구조와 운영 방법\n3. 효과적인 동료슈퍼비전 조건\n4. 전통적 슈퍼비전과의 차이\n5. 연습문제 3개' },
        { id: 30, question: '온라인 슈퍼비전의 특징과 유의사항을 설명하시오.', answer: '접근성 향상, 기술적 문제, 비밀보장, 비언어적 단서 제한', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 온라인 슈퍼비전의 특징과 유의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 슈퍼비전의 장점\n2. 기술적 고려사항\n3. 윤리적 이슈 (비밀보장 등)\n4. 효과적인 온라인 슈퍼비전 전략\n5. 연습문제 3개' }
      ]
    },
    {
      title: '상담자 발달과 역량',
      icon: '📈',
      questions: [
        { id: 31, question: 'Skovholt와 Ronnestad의 상담자 발달단계를 설명하시오.', answer: '초심자, 고급학생, 초심전문가, 경험전문가, 수석전문가 단계', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: Skovholt와 Ronnestad의 상담자 발달단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발달단계 모델 개요\n2. 각 단계별 특성\n3. 단계별 발달 과업\n4. 슈퍼비전 함의\n5. 연습문제 3개' },
        { id: 32, question: '상담자 역량(competency) 모델과 핵심 역량 영역을 설명하시오.', answer: '상담기술, 사례개념화, 자기인식, 전문적 발달, 다문화역량', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 상담자 역량(competency) 모델과 핵심 역량 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역량기반 접근의 개념\n2. 핵심 역량 영역\n3. 역량 평가 방법\n4. 역량 개발 전략\n5. 연습문제 3개' },
        { id: 33, question: '상담자의 자기돌봄(Self-care)의 중요성과 방법을 설명하시오.', answer: '소진 예방, 전문적 효능감 유지를 위한 신체적·정서적·전문적 자기돌봄', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 상담자의 자기돌봄(Self-care)의 중요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기돌봄의 정의와 중요성\n2. 자기돌봄의 영역\n3. 실천 전략\n4. 슈퍼비전에서 자기돌봄 다루기\n5. 연습문제 3개' },
        { id: 34, question: '상담자 소진(Burnout)의 원인, 증상, 예방 방법을 설명하시오.', answer: '정서적 고갈, 비인간화, 성취감 저하 / 조직·개인 차원 예방', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 상담자 소진(Burnout)의 원인, 증상, 예방 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소진의 정의와 3요소\n2. 소진의 원인\n3. 증상과 단계\n4. 예방과 개입 전략\n5. 연습문제 3개' },
        { id: 35, question: '대리외상(Vicarious Trauma)과 공감피로(Compassion Fatigue)를 구분하여 설명하시오.', answer: '대리외상: 인지적 변화 / 공감피로: 정서적 소진과 이차외상 포함', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 대리외상(Vicarious Trauma)과 공감피로(Compassion Fatigue)를 구분하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대리외상의 정의와 특성\n2. 공감피로의 정의와 특성\n3. 두 개념의 공통점과 차이점\n4. 대처 전략\n5. 연습문제 3개' },
        { id: 36, question: '상담자의 전문적 정체성 발달 과정을 설명하시오.', answer: '학생→수련생→초보전문가→숙련전문가로 정체성 형성', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 상담자의 전문적 정체성 발달 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전문적 정체성의 개념\n2. 정체성 발달 단계\n3. 정체성 형성에 영향을 미치는 요인\n4. 슈퍼비전의 역할\n5. 연습문제 3개' }
      ]
    },
    {
      title: '슈퍼비전 평가',
      icon: '✅',
      questions: [
        { id: 37, question: '슈퍼비전에서 평가의 목적과 방법을 설명하시오.', answer: '형성평가(발달 촉진)와 총괄평가(자격 결정)의 균형', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서 평가의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가의 목적 (형성적, 총괄적)\n2. 평가 영역과 기준\n3. 평가 방법과 도구\n4. 피드백 제공 방법\n5. 연습문제 3개' },
        { id: 38, question: '슈퍼바이지 평가 시 발생할 수 있는 문제와 해결 방안을 제시하시오.', answer: '후광효과, 관대화 경향, 평가 불안 등에 대한 대처', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼바이지 평가 시 발생할 수 있는 문제와 해결 방안을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 평가 오류의 유형\n2. 평가 불안 다루기\n3. 공정한 평가를 위한 전략\n4. 평가 결과 전달 방법\n5. 연습문제 3개' },
        { id: 39, question: '수행 미달 슈퍼바이지를 다루는 방법과 절차를 설명하시오.', answer: '명확한 피드백, 개선 계획 수립, 문서화, 필요시 게이트키핑', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 수행 미달 슈퍼바이지를 다루는 방법과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행 미달의 정의와 유형\n2. 조기 발견과 개입\n3. 교정 계획 수립\n4. 게이트키핑 역할\n5. 연습문제 3개' },
        { id: 40, question: '슈퍼바이저 자기평가의 중요성과 방법을 설명하시오.', answer: '자기성찰, 슈퍼바이지 피드백, 동료 자문을 통한 역량 점검', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼바이저 자기평가의 중요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기평가의 필요성\n2. 자기평가 영역\n3. 평가 방법과 도구\n4. 지속적 전문성 개발\n5. 연습문제 3개' }
      ]
    },
    {
      title: '슈퍼비전 윤리',
      icon: '⚖️',
      questions: [
        { id: 41, question: '슈퍼비전에서의 이중관계와 경계 문제를 설명하시오.', answer: '성적 관계, 사적 관계, 다중 역할로 인한 이해충돌 예방', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서의 이중관계와 경계 문제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이중관계의 정의와 유형\n2. 경계 위반의 위험성\n3. 예방과 관리 전략\n4. 윤리적 의사결정 과정\n5. 연습문제 3개' },
        { id: 42, question: '슈퍼비전에서 비밀보장의 한계와 예외 상황을 설명하시오.', answer: '내담자 위험, 슈퍼바이저 책임, 법적 요구 등에 의한 예외', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서 비밀보장의 한계와 예외 상황을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슈퍼비전의 비밀보장 원칙\n2. 비밀보장의 한계\n3. 예외 상황과 대처\n4. 내담자 동의 확보\n5. 연습문제 3개' },
        { id: 43, question: '슈퍼바이저의 법적 책임(대위책임)을 설명하시오.', answer: '슈퍼바이지의 과실에 대한 슈퍼바이저의 법적 책임', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼바이저의 법적 책임(대위책임)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대위책임의 개념\n2. 책임이 인정되는 조건\n3. 위험 관리 전략\n4. 문서화의 중요성\n5. 연습문제 3개' },
        { id: 44, question: '슈퍼비전에서 윤리적 딜레마 상황과 대처 방안을 제시하시오.', answer: '가치 충돌, 역할 갈등 상황에서의 윤리적 의사결정 모델 적용', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전에서 윤리적 딜레마 상황과 대처 방안을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 흔한 윤리적 딜레마 유형\n2. 윤리적 의사결정 모델\n3. 자문과 협의의 중요성\n4. 실제 사례와 해결 과정\n5. 연습문제 3개' },
        { id: 45, question: '다문화 슈퍼비전에서의 윤리적 고려사항을 설명하시오.', answer: '문화적 편견 인식, 다양성 존중, 문화적으로 적절한 슈퍼비전', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 다문화 슈퍼비전에서의 윤리적 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 역량의 윤리적 의무\n2. 문화적 편견과 맹점 인식\n3. 권력과 특권 이슈\n4. 문화적으로 적절한 슈퍼비전\n5. 연습문제 3개' },
        { id: 46, question: '슈퍼비전 문서화의 중요성과 포함 내용을 설명하시오.', answer: '계약서, 진행기록, 평가기록 등 체계적 문서화', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 슈퍼비전 문서화의 중요성과 포함 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문서화의 목적과 중요성\n2. 필수 문서 유형\n3. 기록 내용과 형식\n4. 보관과 관리\n5. 연습문제 3개' }
      ]
    },
    {
      title: '청소년상담 슈퍼비전의 특수성',
      icon: '🎒',
      questions: [
        { id: 47, question: '청소년상담 슈퍼비전의 특수성과 고려사항을 설명하시오.', answer: '발달단계 특성, 비자발성, 학교·가족 맥락, 법적 이슈', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 청소년상담 슈퍼비전의 특수성과 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 내담자의 특성\n2. 맥락적 요인 (학교, 가족)\n3. 법적·윤리적 고려사항\n4. 슈퍼비전 초점 영역\n5. 연습문제 3개' },
        { id: 48, question: '위기청소년 사례에 대한 슈퍼비전 방법을 설명하시오.', answer: '위기평가 점검, 안전계획 검토, 연계체계 활용, 상담자 지지', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 위기청소년 사례에 대한 슈퍼비전 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기사례 슈퍼비전의 특성\n2. 위기평가 점검 사항\n3. 안전계획 검토\n4. 상담자 소진 예방\n5. 연습문제 3개' },
        { id: 49, question: '학교상담 맥락에서의 슈퍼비전 특성을 설명하시오.', answer: '교육현장 이해, 교사-상담자 역할 균형, 학교체계 활용', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 학교상담 맥락에서의 슈퍼비전 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교상담의 맥락적 특성\n2. 학교상담자의 다중 역할\n3. 학교 시스템과의 협력\n4. 슈퍼비전 주요 이슈\n5. 연습문제 3개' },
        { id: 50, question: '청소년상담에서 부모상담 슈퍼비전의 중요성과 방법을 설명하시오.', answer: '부모-청소년 관계 개선, 부모 양육역량 강화 슈퍼비전', prompt: '청소년상담사 1급 - 상담자 교육 및 사례지도 문제입니다.\n\n문제: 청소년상담에서 부모상담 슈퍼비전의 중요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부모상담의 중요성\n2. 부모상담 슈퍼비전 초점\n3. 부모-상담자 관계 이슈\n4. 가족체계적 접근\n5. 연습문제 3개' }
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
            <span className="text-gray-900">상담자 교육 및 사례지도</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">👨‍🏫</span>
            <div>
              <h1 className="text-2xl font-bold">상담자 교육 및 사례지도</h1>
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
            href="/category/welfare/youth-counselor-1"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 메인으로
          </Link>
          <Link
            href="/category/welfare/youth-counselor-1/study/youth-law"
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
          <p className="text-gray-400">청소년상담사 1급 - 상담자 교육 및 사례지도</p>
        </div>
      </footer>
    </div>
  );
}
