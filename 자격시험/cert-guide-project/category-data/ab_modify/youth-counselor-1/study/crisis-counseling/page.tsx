'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CrisisCounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-1-crisis-counseling-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-1-crisis-counseling-progress', JSON.stringify(completedQuestions));
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
      title: '위기의 이해',
      icon: '🆘',
      questions: [
        { id: 1, question: '위기(Crisis)의 정의와 특성을 설명하시오.', answer: '일시적 불균형 상태, 기존 대처방식 실패, 성장 기회', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기(Crisis)의 정의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기의 정의\n2. 위기의 특성\n3. 위기와 스트레스의 차이\n4. 위기의 양면성 (위험과 기회)\n5. 연습문제 3개' },
        { id: 2, question: 'Caplan의 위기이론을 설명하시오.', answer: '항상성 모델, 4단계 위기 발달 과정', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: Caplan의 위기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Caplan 이론의 배경\n2. 항상성(Homeostasis) 개념\n3. 위기 발달 4단계\n4. 이론의 상담적 함의\n5. 연습문제 3개' },
        { id: 3, question: '발달적 위기와 상황적 위기를 비교하시오.', answer: '예측 가능한 전환기 vs 예측 불가능한 외부 사건', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 발달적 위기와 상황적 위기를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 발달적 위기의 정의와 예시\n2. 상황적 위기의 정의와 예시\n3. 두 위기의 차이점\n4. 개입 방법의 차이\n5. 연습문제 3개' },
        { id: 4, question: '청소년기 발달과업과 관련된 위기를 설명하시오.', answer: '정체성 혼란, 또래관계, 학업, 진로 관련 위기', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 청소년기 발달과업과 관련된 위기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기 주요 발달과업\n2. 발달과업 관련 위기 유형\n3. 위기의 영향\n4. 발달적 관점의 개입\n5. 연습문제 3개' },
        { id: 5, question: '위기 반응의 인지적, 정서적, 행동적, 신체적 증상을 설명하시오.', answer: '혼란, 불안, 회피, 두통 등 다차원적 반응', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기 반응의 인지적, 정서적, 행동적, 신체적 증상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인지적 반응\n2. 정서적 반응\n3. 행동적 반응\n4. 신체적 반응\n5. 연습문제 3개' },
        { id: 6, question: '위기의 보호요인과 위험요인을 설명하시오.', answer: '사회적 지지, 대처능력 vs 과거 외상, 고립', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기의 보호요인과 위험요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호요인의 종류\n2. 위험요인의 종류\n3. 청소년 특유의 요인\n4. 평가 및 개입에의 적용\n5. 연습문제 3개' }
      ]
    },
    {
      title: '위기개입 모델',
      icon: '🎯',
      questions: [
        { id: 7, question: 'Roberts의 위기개입 7단계 모델을 설명하시오.', answer: '위기평가, 라포형성, 문제규명, 정서탐색, 대안탐색, 행동계획, 추수지도', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: Roberts의 위기개입 7단계 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모델의 개요\n2. 7단계 상세 설명\n3. 각 단계별 상담자 역할\n4. 청소년 적용 시 유의점\n5. 연습문제 3개' },
        { id: 8, question: 'Gilliland의 위기개입 6단계 모델을 설명하시오.', answer: '문제정의, 안전확보, 지지제공, 대안탐색, 계획수립, 실천동기', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: Gilliland의 위기개입 6단계 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모델의 특징\n2. 6단계 상세 설명\n3. 경청-행동 균형\n4. 실제 사례 적용\n5. 연습문제 3개' },
        { id: 9, question: '위기개입의 기본 원칙을 설명하시오.', answer: '즉시성, 단기성, 문제초점, 행동지향, 자원활용', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기개입의 기본 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 즉시성의 원칙\n2. 문제초점적 접근\n3. 행동지향적 개입\n4. 자원 연계와 활용\n5. 연습문제 3개' },
        { id: 10, question: '위기 정도 평가(Triage Assessment)를 설명하시오.', answer: '정서적, 인지적, 행동적 기능 수준 평가', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기 정도 평가(Triage Assessment)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트리아지의 개념\n2. 세 가지 평가 영역\n3. 심각도 점수화\n4. 개입 수준 결정\n5. 연습문제 3개' },
        { id: 11, question: '위기개입과 일반 상담의 차이를 설명하시오.', answer: '즉각적 개입, 단기집중, 지시적 접근, 안전 우선', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기개입과 일반 상담의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목표의 차이\n2. 시간틀의 차이\n3. 상담자 역할의 차이\n4. 기법의 차이\n5. 연습문제 3개' }
      ]
    },
    {
      title: '자살위기 개입',
      icon: '💔',
      questions: [
        { id: 12, question: '청소년 자살의 위험요인과 보호요인을 설명하시오.', answer: '정신건강문제, 가정문제 vs 사회적 지지, 문제해결능력', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 청소년 자살의 위험요인과 보호요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인적 위험요인\n2. 환경적 위험요인\n3. 보호요인\n4. 위험성 평가에의 적용\n5. 연습문제 3개' },
        { id: 13, question: '자살위험성 평가 방법과 도구를 설명하시오.', answer: 'SAD PERSONS, C-SSRS, 임상면담', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 자살위험성 평가 방법과 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자살위험성 평가의 중요성\n2. 주요 평가도구\n3. 임상면담 질문\n4. 위험수준별 개입\n5. 연습문제 3개' },
        { id: 14, question: 'QPR(Question, Persuade, Refer) 모델을 설명하시오.', answer: '자살위기 인식, 설득, 전문가 연계의 3단계 게이트키퍼 훈련', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: QPR(Question, Persuade, Refer) 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. QPR의 개념과 목적\n2. Question 단계\n3. Persuade 단계\n4. Refer 단계\n5. 연습문제 3개' },
        { id: 15, question: '자살 고위험 청소년에 대한 안전계획을 설명하시오.', answer: '경고신호 인식, 대처전략, 연락처, 환경 안전화', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 자살 고위험 청소년에 대한 안전계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전계획의 목적\n2. 안전계획 구성요소\n3. 작성 방법\n4. 추수관리\n5. 연습문제 3개' },
        { id: 16, question: '자살시도 후 개입(Postvention)을 설명하시오.', answer: '시도자 상담, 가족 지원, 학교 대응, 추수관리', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 자살시도 후 개입(Postvention)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자살시도 후 개입의 목적\n2. 시도자 상담\n3. 가족 및 또래 지원\n4. 재발 예방\n5. 연습문제 3개' },
        { id: 17, question: '자살 사망 후 유족 상담을 설명하시오.', answer: '애도반응 지원, 죄책감 다루기, 자살위험 평가', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 자살 사망 후 유족 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유족 상담의 특수성\n2. 애도 과정 지원\n3. 죄책감과 낙인 다루기\n4. 유족의 자살위험 관리\n5. 연습문제 3개' },
        { id: 18, question: '학교에서의 자살 사후대응 절차를 설명하시오.', answer: '위기대응팀 가동, 학생 선별, 심리지원, 언론 대응', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 학교에서의 자살 사후대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기대응팀 가동\n2. 고위험 학생 선별\n3. 전체 학생 심리지원\n4. 모방 자살 예방\n5. 연습문제 3개' }
      ]
    },
    {
      title: '트라우마와 외상 상담',
      icon: '🩹',
      questions: [
        { id: 19, question: '외상(Trauma)의 정의와 유형을 설명하시오.', answer: '단일 외상, 복합 외상, 발달 외상', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 외상(Trauma)의 정의와 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외상의 정의\n2. 외상 유형 분류\n3. 청소년기 외상의 특성\n4. 외상의 영향\n5. 연습문제 3개' },
        { id: 20, question: 'PTSD(외상후스트레스장애)의 진단기준과 증상을 설명하시오.', answer: '침습, 회피, 인지정서변화, 과각성의 4가지 증상군', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: PTSD(외상후스트레스장애)의 진단기준과 증상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DSM-5 진단기준\n2. 4가지 증상군 상세\n3. 청소년 PTSD 특성\n4. 복합 PTSD\n5. 연습문제 3개' },
        { id: 21, question: '외상 정보화 접근(Trauma-Informed Care)을 설명하시오.', answer: '외상 인식, 안전 우선, 선택권 존중, 협력적 관계', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 외상 정보화 접근(Trauma-Informed Care)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외상 정보화 접근의 개념\n2. 핵심 원칙\n3. 실천 방법\n4. 청소년 기관에서의 적용\n5. 연습문제 3개' },
        { id: 22, question: '외상 초점 인지행동치료(TF-CBT)를 설명하시오.', answer: 'PRACTICE 요소, 아동청소년과 보호자 병행 치료', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 외상 초점 인지행동치료(TF-CBT)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TF-CBT의 개요\n2. PRACTICE 구성요소\n3. 치료 단계\n4. 효과성 연구\n5. 연습문제 3개' },
        { id: 23, question: 'EMDR 치료의 원리와 절차를 설명하시오.', answer: '안구운동을 통한 외상기억 재처리', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: EMDR 치료의 원리와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EMDR의 기본 원리\n2. 8단계 프로토콜\n3. 청소년 적용 시 고려점\n4. 효과성과 한계\n5. 연습문제 3개' },
        { id: 24, question: '복합외상(Complex Trauma)과 발달외상장애를 설명하시오.', answer: '만성적, 반복적 외상으로 인한 광범위한 영향', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 복합외상(Complex Trauma)과 발달외상장애를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복합외상의 정의\n2. 발달외상장애 개념\n3. 증상과 영향\n4. 치료적 접근\n5. 연습문제 3개' }
      ]
    },
    {
      title: '학교폭력 위기개입',
      icon: '🏫',
      questions: [
        { id: 25, question: '학교폭력 피해 청소년의 심리적 특성과 상담을 설명하시오.', answer: '우울, 불안, PTSD, 자존감 저하에 대한 개입', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 학교폭력 피해 청소년의 심리적 특성과 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피해자의 심리적 반응\n2. 상담 목표\n3. 상담 기법\n4. 학교·가정 협력\n5. 연습문제 3개' },
        { id: 26, question: '학교폭력 가해 청소년 상담의 접근을 설명하시오.', answer: '가해 동기 탐색, 공감능력 향상, 분노조절', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 학교폭력 가해 청소년 상담의 접근을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가해자의 특성 이해\n2. 상담 목표\n3. 개입 전략\n4. 재발 예방\n5. 연습문제 3개' },
        { id: 27, question: '사이버폭력의 유형과 위기개입을 설명하시오.', answer: '사이버 따돌림, 성착취, 명예훼손 등에 대한 개입', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 사이버폭력의 유형과 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사이버폭력의 유형\n2. 피해자 지원\n3. 디지털 증거 보존\n4. 법적 대응 연계\n5. 연습문제 3개' },
        { id: 28, question: '학교폭력 사안 발생 시 위기대응 절차를 설명하시오.', answer: '신고접수, 피해자 보호, 사안조사, 심의위원회', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 학교폭력 사안 발생 시 위기대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 대응\n2. 피해자 보호조치\n3. 사안조사 절차\n4. 상담사의 역할\n5. 연습문제 3개' }
      ]
    },
    {
      title: '가정폭력과 학대',
      icon: '🏠',
      questions: [
        { id: 29, question: '가정폭력 피해 청소년의 특성과 상담을 설명하시오.', answer: '목격 외상, 안전 확보, 가족관계 재구조화', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 가정폭력 피해 청소년의 특성과 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가정폭력 노출의 영향\n2. 심리적 특성\n3. 상담 접근\n4. 안전 확보와 연계\n5. 연습문제 3개' },
        { id: 30, question: '아동학대 피해 청소년 상담의 접근을 설명하시오.', answer: '신고의무, 안전계획, 외상 치료, 가족 개입', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 아동학대 피해 청소년 상담의 접근을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학대 유형별 영향\n2. 신고의무와 절차\n3. 상담 개입\n4. 보호체계 연계\n5. 연습문제 3개' },
        { id: 31, question: '성폭력 피해 청소년의 위기개입을 설명하시오.', answer: '2차 피해 예방, 증거 보전, 전문기관 연계', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 성폭력 피해 청소년의 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 대응 원칙\n2. 2차 피해 예방\n3. 의료·법적 지원 연계\n4. 심리상담 접근\n5. 연습문제 3개' },
        { id: 32, question: '가정 밖 청소년(가출청소년)의 위기개입을 설명하시오.', answer: '즉각적 보호, 가출 원인 탐색, 가족 상담, 자립 지원', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 가정 밖 청소년(가출청소년)의 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가출 청소년의 위험\n2. 즉각적 보호\n3. 원인별 개입\n4. 쉼터 연계와 자립 지원\n5. 연습문제 3개' }
      ]
    },
    {
      title: '재난 심리지원',
      icon: '🌊',
      questions: [
        { id: 33, question: '재난의 유형과 심리적 영향을 설명하시오.', answer: '자연재난, 사회재난, 급성/만성 스트레스 반응', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 재난의 유형과 심리적 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재난의 정의와 유형\n2. 재난 단계별 심리 반응\n3. 청소년의 재난 반응 특성\n4. 장단기 영향\n5. 연습문제 3개' },
        { id: 34, question: '심리적 응급처치(PFA)의 원리와 절차를 설명하시오.', answer: '보기, 듣기, 연결하기의 3가지 핵심 원칙', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 심리적 응급처치(PFA)의 원리와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PFA의 정의와 목적\n2. 핵심 원칙\n3. 실행 단계\n4. 청소년 대상 적용\n5. 연습문제 3개' },
        { id: 35, question: '재난 후 학교 심리지원 체계를 설명하시오.', answer: '위기대응팀, 선별검사, 단계별 개입', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 재난 후 학교 심리지원 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교 위기대응팀 구성\n2. 단계별 심리지원\n3. 고위험군 선별\n4. 외부 자원 연계\n5. 연습문제 3개' },
        { id: 36, question: '재난 심리지원 인력의 자기돌봄을 설명하시오.', answer: '대리외상 예방, 소진 관리, 동료 지지', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 재난 심리지원 인력의 자기돌봄을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대리외상의 위험\n2. 소진 예방 전략\n3. 조직적 지원\n4. 개인 자기돌봄\n5. 연습문제 3개' }
      ]
    },
    {
      title: '위기상담 윤리와 실제',
      icon: '⚖️',
      questions: [
        { id: 37, question: '위기상담에서 비밀보장의 예외 상황을 설명하시오.', answer: '자해/타해 위험, 아동학대, 법적 요구', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담에서 비밀보장의 예외 상황을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비밀보장의 원칙\n2. 예외 상황의 유형\n3. 예외 적용 절차\n4. 청소년에게 설명하기\n5. 연습문제 3개' },
        { id: 38, question: '위기상담사의 법적 의무와 책임을 설명하시오.', answer: '신고의무, 주의의무, 문서화 의무', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담사의 법적 의무와 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고의무 관련 법률\n2. 주의의무(Duty to Warn)\n3. 기록과 문서화\n4. 법적 분쟁 예방\n5. 연습문제 3개' },
        { id: 39, question: '위기상담 기록 작성의 원칙과 방법을 설명하시오.', answer: '객관적 기술, 위험 평가 기록, 개입 내용 문서화', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담 기록 작성의 원칙과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기록의 중요성\n2. 기록 원칙\n3. 포함 내용\n4. 보관과 관리\n5. 연습문제 3개' },
        { id: 40, question: '위기상담에서의 다기관 협력 체계를 설명하시오.', answer: '경찰, 의료, 복지, 교육기관 간 연계', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담에서의 다기관 협력 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다기관 협력의 필요성\n2. 주요 협력 기관\n3. 정보 공유 절차\n4. 사례관리 회의\n5. 연습문제 3개' },
        { id: 41, question: '위기상담사의 소진 예방과 자기돌봄을 설명하시오.', answer: '공감피로 인식, 경계 설정, 슈퍼비전', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담사의 소진 예방과 자기돌봄을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기상담사의 소진 위험\n2. 공감피로와 대리외상\n3. 자기돌봄 전략\n4. 조직적 지원\n5. 연습문제 3개' },
        { id: 42, question: '전화 및 온라인 위기상담의 특성과 기법을 설명하시오.', answer: '비대면 라포 형성, 위험 평가, 연계 전략', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 전화 및 온라인 위기상담의 특성과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비대면 상담의 특성\n2. 라포 형성 기법\n3. 위험 평가 방법\n4. 긴급 대응 절차\n5. 연습문제 3개' },
        { id: 43, question: '위기청소년 아웃리치(Outreach)의 방법을 설명하시오.', answer: '거리상담, 사이버상담, 지역사회 발굴', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기청소년 아웃리치(Outreach)의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아웃리치의 개념\n2. 거리상담 방법\n3. 온라인 아웃리치\n4. 연계와 추수관리\n5. 연습문제 3개' },
        { id: 44, question: '위기개입 프로그램의 효과 평가 방법을 설명하시오.', answer: '과정평가, 성과평가, 추수 효과 측정', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기개입 프로그램의 효과 평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 평가의 목적\n2. 평가 유형과 방법\n3. 평가 도구 선정\n4. 결과 활용\n5. 연습문제 3개' },
        { id: 45, question: '청소년 자해 행동의 이해와 개입을 설명하시오.', answer: '비자살적 자해의 기능, 위험 평가, 대안 행동 개발', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 청소년 자해 행동의 이해와 개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비자살적 자해의 정의\n2. 자해의 기능\n3. 위험 평가\n4. 개입 전략\n5. 연습문제 3개' },
        { id: 46, question: '청소년 인터넷·스마트폰 과의존 위기개입을 설명하시오.', answer: '과의존 평가, 동기강화, 가족 개입', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 청소년 인터넷·스마트폰 과의존 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과의존의 정의와 진단\n2. 위기 수준 평가\n3. 개입 전략\n4. 가족 및 학교 협력\n5. 연습문제 3개' },
        { id: 47, question: '은둔형 외톨이 청소년의 위기개입을 설명하시오.', answer: '점진적 접근, 관계 형성, 사회 복귀 지원', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 은둔형 외톨이 청소년의 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 은둔형 외톨이의 정의\n2. 원인과 특성\n3. 개입 전략\n4. 단계별 사회 복귀 지원\n5. 연습문제 3개' },
        { id: 48, question: '다문화가정 청소년의 위기개입을 설명하시오.', answer: '문화적 민감성, 정체성 문제, 차별 경험 다루기', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 다문화가정 청소년의 위기개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 청소년의 위기 유형\n2. 문화적 고려사항\n3. 개입 전략\n4. 지역사회 자원 연계\n5. 연습문제 3개' },
        { id: 49, question: '위기상담에서 보호자 상담의 중요성과 방법을 설명하시오.', answer: '정보 제공, 정서 지지, 협력적 모니터링', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기상담에서 보호자 상담의 중요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호자 상담의 목적\n2. 정보 제공과 교육\n3. 정서적 지지\n4. 협력적 안전 관리\n5. 연습문제 3개' },
        { id: 50, question: '위기청소년 사례관리의 원칙과 절차를 설명하시오.', answer: '통합적 접근, 단계별 목표, 자원 조정, 추수관리', prompt: '청소년상담사 1급 - 위기상담 문제입니다.\n\n문제: 위기청소년 사례관리의 원칙과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례관리의 정의\n2. 핵심 원칙\n3. 단계별 절차\n4. 효과적인 사례관리 전략\n5. 연습문제 3개' }
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
            <span className="text-gray-900">위기상담</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🆘</span>
            <div>
              <h1 className="text-2xl font-bold">위기상담</h1>
              <p className="text-red-100">선택과목 | 25문항</p>
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
                  <span className="text-sm text-red-600">
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
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-red-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium text-gray-700">핵심:</span> {q.answer}
                          </p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
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
            href="/category/welfare/youth-counselor-1/study/research-method"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 이전 과목
          </Link>
          <Link
            href="/category/welfare/youth-counselor-1/study/delinquency-counseling"
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
          <p className="text-gray-400">청소년상담사 1급 - 위기상담 (선택과목)</p>
        </div>
      </footer>
    </div>
  );
}
