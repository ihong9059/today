'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function PsychologyCounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-psychology-counseling-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-psychology-counseling-progress', JSON.stringify(completedQuestions));
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
      title: '청소년 발달이론',
      icon: '🌱',
      questions: [
        { id: 1, question: '에릭슨(Erikson)의 청소년기 발달과업은?', answer: '정체성 대 정체성 혼란 (Identity vs. Identity Confusion)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 에릭슨의 청소년기 발달과업은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 에릭슨 발달단계 전체\n3. 청소년기 특성\n4. 지도 시사점\n5. 연습문제 3개' },
        { id: 2, question: '마르시아(Marcia)의 정체성 지위 4유형은?', answer: '정체성 성취, 유예, 유실, 혼미', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 마르시아의 정체성 지위 4유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형의 특성\n3. 탐색과 수행의 관계\n4. 지도 방법\n5. 연습문제 3개' },
        { id: 3, question: '피아제(Piaget)의 형식적 조작기 특성은?', answer: '추상적 사고, 가설적 사고, 조합적 사고 가능', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 피아제의 형식적 조작기 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 인지발달 4단계\n3. 형식적 조작기 특성\n4. 교육적 시사점\n5. 연습문제 3개' },
        { id: 4, question: '콜버그(Kohlberg)의 도덕발달 3수준 6단계는?', answer: '전인습(1-2단계), 인습(3-4단계), 후인습(5-6단계)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 콜버그의 도덕발달 3수준 6단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계의 특성\n3. 청소년기 도덕발달\n4. 도덕교육 방법\n5. 연습문제 3개' },
        { id: 5, question: '브론펜브레너(Bronfenbrenner)의 생태학적 체계이론은?', answer: '미시, 중간, 외, 거시, 시간 체계', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 브론펜브레너의 생태학적 체계이론은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 체계의 내용\n3. 청소년 발달과의 관계\n4. 실천적 적용\n5. 연습문제 3개' },
        { id: 6, question: '반두라(Bandura)의 사회학습이론 핵심 개념은?', answer: '관찰학습, 모방, 자기효능감', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 반두라의 사회학습이론 핵심 개념은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 관찰학습 4단계\n3. 자기효능감의 원천\n4. 청소년 지도 적용\n5. 연습문제 3개' },
        { id: 7, question: '청소년기 자아중심성의 특성 2가지는?', answer: '상상적 청중, 개인적 우화', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년기 자아중심성의 특성 2가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 엘킨드의 이론\n3. 각 특성의 의미\n4. 지도 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '청소년기 발달 특성',
      icon: '🧬',
      questions: [
        { id: 8, question: '청소년기 신체발달의 주요 특징은?', answer: '급격한 성장, 2차 성징, 호르몬 변화', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년기 신체발달의 주요 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신체발달 양상\n3. 심리적 영향\n4. 지도 시 유의점\n5. 연습문제 3개' },
        { id: 9, question: '청소년기 정서발달의 특징은?', answer: '정서적 불안정, 감정 기복, 자의식 증가', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년기 정서발달의 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 정서발달 양상\n3. 정서조절 발달\n4. 지원 방법\n5. 연습문제 3개' },
        { id: 10, question: '또래관계가 청소년에게 미치는 영향은?', answer: '정서적 지지, 사회성 발달, 정체성 형성', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 또래관계가 청소년에게 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 긍정적 영향\n3. 부정적 영향\n4. 건강한 또래관계 지도\n5. 연습문제 3개' },
        { id: 11, question: '청소년기 부모-자녀 관계의 변화는?', answer: '자율성 추구, 갈등 증가, 재협상', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년기 부모-자녀 관계의 변화는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 관계 변화 양상\n3. 갈등 유형\n4. 바람직한 관계 형성\n5. 연습문제 3개' },
        { id: 12, question: '청소년기 자아존중감의 발달에 영향을 미치는 요인은?', answer: '부모 양육, 또래관계, 학업성취, 외모', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년기 자아존중감 발달에 영향을 미치는 요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요인의 영향\n3. 자아존중감 측정\n4. 향상 방법\n5. 연습문제 3개' },
        { id: 13, question: '성별에 따른 청소년 발달의 차이는?', answer: '사춘기 시작 시기, 신체발달 속도, 사회화 과정의 차이', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 성별에 따른 청소년 발달의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신체발달 차이\n3. 심리사회적 차이\n4. 성인지적 접근\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '상담이론과 기법',
      icon: '💬',
      questions: [
        { id: 14, question: '로저스(Rogers)의 인간중심상담의 3대 조건은?', answer: '무조건적 긍정적 존중, 공감적 이해, 진실성(일치성)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 로저스의 인간중심상담의 3대 조건은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 조건의 상세 설명\n3. 상담 기법\n4. 청소년 상담 적용\n5. 연습문제 3개' },
        { id: 15, question: '엘리스(Ellis)의 합리적정서행동치료(REBT)의 ABCDE 모델은?', answer: 'A(사건)-B(신념)-C(결과)-D(논박)-E(효과)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 엘리스의 REBT ABCDE 모델은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계 설명\n3. 비합리적 신념 유형\n4. 청소년 상담 적용\n5. 연습문제 3개' },
        { id: 16, question: '벡(Beck)의 인지치료에서 인지적 오류 유형은?', answer: '과잉일반화, 이분법적 사고, 선택적 추상화, 개인화', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 벡의 인지치료에서 인지적 오류 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 오류 유형 설명\n3. 인지 재구조화\n4. 청소년 적용\n5. 연습문제 3개' },
        { id: 17, question: '행동주의 상담의 주요 기법은?', answer: '체계적 둔감화, 토큰 강화, 모델링, 행동계약', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 행동주의 상담의 주요 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 기법 설명\n3. 적용 상황\n4. 청소년 문제행동 적용\n5. 연습문제 3개' },
        { id: 18, question: '해결중심 단기상담의 핵심 기법은?', answer: '기적질문, 예외질문, 척도질문, 대처질문', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 해결중심 단기상담의 핵심 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 질문 기법\n3. 상담 진행 방식\n4. 청소년 상담 적용\n5. 연습문제 3개' },
        { id: 19, question: '현실치료(Reality Therapy)의 WDEP 체계는?', answer: 'Wants(욕구), Doing(행동), Evaluation(평가), Planning(계획)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 현실치료의 WDEP 체계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요소 설명\n3. 선택이론과의 관계\n4. 청소년 적용\n5. 연습문제 3개' },
        { id: 20, question: '가족상담의 주요 접근법 3가지는?', answer: '구조적, 전략적, 경험적 가족치료', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 가족상담의 주요 접근법 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 접근법 특성\n3. 주요 기법\n4. 청소년 가족상담\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '상담 과정과 기술',
      icon: '🎯',
      questions: [
        { id: 21, question: '상담의 일반적 과정 3단계는?', answer: '초기(관계형성), 중기(탐색/이해), 종결(행동변화)', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 상담의 일반적 과정 3단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계 과제\n3. 단계별 기법\n4. 청소년 상담 적용\n5. 연습문제 3개' },
        { id: 22, question: '라포(Rapport) 형성의 중요성과 방법은?', answer: '신뢰관계 구축, 경청, 공감, 수용', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 라포 형성의 중요성과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 라포의 중요성\n3. 형성 방법\n4. 청소년과의 라포\n5. 연습문제 3개' },
        { id: 23, question: '반영(Reflection) 기법의 종류는?', answer: '내용 반영, 감정 반영, 의미 반영', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 반영 기법의 종류는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 반영 기법\n3. 활용 방법\n4. 연습 방법\n5. 연습문제 3개' },
        { id: 24, question: '질문 기법의 유형(개방형/폐쇄형)과 활용은?', answer: '개방형은 탐색, 폐쇄형은 확인/구체화', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 질문 기법의 유형과 활용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형 특성\n3. 상황별 활용\n4. 주의사항\n5. 연습문제 3개' },
        { id: 25, question: '직면(Confrontation) 기법의 적절한 사용은?', answer: '불일치 지적, 시기 선택, 지지적 분위기에서 사용', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 직면 기법의 적절한 사용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 직면의 유형\n3. 효과적인 직면\n4. 주의사항\n5. 연습문제 3개' },
        { id: 26, question: '상담 종결의 과정과 유의사항은?', answer: '종결 준비, 성과 정리, 추후 관리', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 상담 종결의 과정과 유의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 종결 시기\n3. 종결 과정\n4. 조기 종결 대처\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '청소년 문제행동',
      icon: '⚠️',
      questions: [
        { id: 27, question: '청소년 비행의 원인 이론 3가지는?', answer: '긴장이론, 사회학습이론, 낙인이론', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 비행의 원인 이론 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 이론 설명\n3. 개입 방안\n4. 예방 전략\n5. 연습문제 3개' },
        { id: 28, question: '학교폭력의 유형을 나열하시오.', answer: '신체, 언어, 금품갈취, 따돌림, 사이버폭력, 성폭력', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 학교폭력의 유형을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형 설명\n3. 가해자/피해자 특성\n4. 대응 방안\n5. 연습문제 3개' },
        { id: 29, question: '청소년 약물남용의 단계는?', answer: '실험적 사용 → 사회적 사용 → 도구적 사용 → 습관적 사용 → 강박적 사용', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 약물남용의 단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계 특성\n3. 위험요인과 보호요인\n4. 예방 및 개입\n5. 연습문제 3개' },
        { id: 30, question: '인터넷/게임 과의존의 진단 기준은?', answer: '조절실패, 현저성, 문제적 결과', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 인터넷/게임 과의존의 진단 기준은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 진단 기준\n3. 위험군 분류\n4. 상담 및 치료\n5. 연습문제 3개' },
        { id: 31, question: '청소년 가출의 유형과 원인은?', answer: '충동적/계획적 가출, 가정문제/또래요인', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 가출의 유형과 원인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 가출 유형\n3. 원인 분석\n4. 지원 방안\n5. 연습문제 3개' },
        { id: 32, question: '청소년 학교 부적응의 원인과 지원은?', answer: '학업, 또래관계, 교사관계 어려움', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 학교 부적응의 원인과 지원은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 원인 분석\n3. 징후 파악\n4. 지원 방안\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic6',
      title: '위기청소년 상담',
      icon: '🆘',
      questions: [
        { id: 33, question: '위기(Crisis)의 정의와 특성은?', answer: '일상적 대처로 해결이 어려운 상태', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 위기의 정의와 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 위기의 특성\n3. 위기의 유형\n4. 개입 원칙\n5. 연습문제 3개' },
        { id: 34, question: '위기개입의 6단계 모델은?', answer: '문제정의 → 안전확보 → 지지제공 → 대안탐색 → 계획수립 → 실천', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 위기개입의 6단계 모델은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계 내용\n3. 적용 방법\n4. 사례 적용\n5. 연습문제 3개' },
        { id: 35, question: '자살 위험 평가의 요소는?', answer: '자살사고, 계획, 수단, 시도력, 보호요인', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 자살 위험 평가의 요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 평가 요소\n3. 위험 신호\n4. 개입 방법\n5. 연습문제 3개' },
        { id: 36, question: '자해 청소년 상담 시 유의사항은?', answer: '비판 금지, 원인 탐색, 대안 행동 개발, 안전 계획', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 자해 청소년 상담 시 유의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 자해의 이해\n3. 상담 접근\n4. 부모 상담\n5. 연습문제 3개' },
        { id: 37, question: '학대 피해 청소년 상담 원칙은?', answer: '안전 확보, 신뢰 형성, 신고 의무, 트라우마 접근', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 학대 피해 청소년 상담 원칙은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 학대 유형\n3. 상담 원칙\n4. 신고 및 연계\n5. 연습문제 3개' },
        { id: 38, question: '청소년 우울증의 특징과 상담은?', answer: '성인과 다른 증상 양상, 행동화', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 우울증의 특징과 상담은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년 우울 특성\n3. 진단과 평가\n4. 상담 접근\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic7',
      title: '집단상담 프로그램',
      icon: '👥',
      questions: [
        { id: 39, question: '집단상담의 치료적 요인 11가지(얄롬)는?', answer: '희망, 보편성, 정보제공, 이타심, 가족재현, 사회화기술 등', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 집단상담의 치료적 요인 11가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 치료요인\n3. 청소년 집단에서의 적용\n4. 촉진 방법\n5. 연습문제 3개' },
        { id: 40, question: '집단상담의 유형을 분류하시오.', answer: '구조화/비구조화, 개방형/폐쇄형, 동질집단/이질집단', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 집단상담의 유형을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 분류 기준\n3. 각 유형 특성\n4. 청소년 집단 구성\n5. 연습문제 3개' },
        { id: 41, question: '집단상담자의 역할과 자질은?', answer: '촉진자, 모델, 관찰자, 교육자', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 집단상담자의 역할과 자질은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 역할\n3. 필요 자질\n4. 역량 개발\n5. 연습문제 3개' },
        { id: 42, question: '집단상담에서 침묵 대처 방법은?', answer: '침묵 수용, 반영, 구조화, 개입', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 집단상담에서 침묵 대처 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 침묵의 유형\n3. 대처 전략\n4. 청소년 집단 특성\n5. 연습문제 3개' },
        { id: 43, question: '집단상담 프로그램 구성의 원리는?', answer: '목표설정, 단계적 진행, 활동 선정, 평가', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 집단상담 프로그램 구성의 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성 단계\n3. 회기별 구성\n4. 활동 선정 기준\n5. 연습문제 3개' },
        { id: 44, question: '청소년 집단상담 운영 시 주의사항은?', answer: '비밀보장, 안전한 환경, 발달 수준 고려', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년 집단상담 운영 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 윤리적 고려\n3. 운영 유의점\n4. 문제 상황 대처\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic8',
      title: '심리검사와 평가',
      icon: '📋',
      questions: [
        { id: 45, question: '심리검사의 표준화 요건 3가지는?', answer: '신뢰도, 타당도, 규준', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 심리검사의 표준화 요건 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요건 설명\n3. 검사 선택 시 고려\n4. 검사 해석\n5. 연습문제 3개' },
        { id: 46, question: '청소년에게 많이 사용되는 성격검사는?', answer: 'MMPI-A, MBTI, 에니어그램, TCI', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 청소년에게 많이 사용되는 성격검사는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 검사 특징\n3. 활용 방법\n4. 주의사항\n5. 연습문제 3개' },
        { id: 47, question: '진로적성검사의 종류와 활용은?', answer: '홀랜드 검사, 적성검사, 흥미검사', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 진로적성검사의 종류와 활용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 주요 검사 설명\n3. 결과 해석\n4. 상담 연계\n5. 연습문제 3개' },
        { id: 48, question: '투사적 검사의 종류와 특징은?', answer: 'HTP, SCT, 로르샤흐', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 투사적 검사의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 검사 특성\n3. 청소년 적용\n4. 해석 시 유의점\n5. 연습문제 3개' },
        { id: 49, question: '심리검사 실시 시 윤리적 고려사항은?', answer: '검사 목적 설명, 동의, 비밀보장, 결과 피드백', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 심리검사 실시 시 윤리적 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 윤리 원칙\n3. 청소년 검사 시 유의점\n4. 결과 전달 방법\n5. 연습문제 3개' },
        { id: 50, question: '행동관찰법의 유형과 활용은?', answer: '자연관찰, 참여관찰, 체계적 관찰', prompt: '청소년지도사 2급 청소년심리및상담 문제입니다.\n\n문제: 행동관찰법의 유형과 활용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유형 특성\n3. 관찰 기록법\n4. 청소년 평가 활용\n5. 연습문제 3개' },
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
            <span className="text-purple-600 font-medium">청소년심리및상담</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl"><span className="text-4xl">🧠</span></div>
            <div>
              <h1 className="text-2xl font-bold">청소년심리및상담</h1>
              <p className="text-purple-100">발달심리, 상담이론, 문제행동 이해</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-purple-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
                        <button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${completedQuestions.includes(q.id) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300 hover:border-purple-500'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{q.id}. {q.question}</p>
                          <p className="text-sm text-purple-600 mt-1">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition">🤖 AI에게 질문하기</button>
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
