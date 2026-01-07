'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EducationTheoryPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teacher-education-theory-completed');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => {
      const newCompleted = prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id];
      localStorage.setItem('teacher-education-theory-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "교육심리학",
      questions: [
        { id: 1, question: "피아제(Piaget)의 인지발달 4단계를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 피아제(Piaget)의 인지발달 4단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피아제 이론의 핵심 개념 (도식, 동화, 조절, 평형화)\n2. 4단계별 특징과 연령대\n3. 각 단계의 교육적 시사점\n4. 비고츠키 이론과의 비교\n5. 관련 기출 예상 문제 3개" },
        { id: 2, question: "비고츠키(Vygotsky)의 근접발달영역(ZPD)과 비계설정(Scaffolding)을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 비고츠키(Vygotsky)의 근접발달영역(ZPD)과 비계설정(Scaffolding)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ZPD의 정의와 의미\n2. 비계설정의 개념과 방법\n3. 교실 수업에서의 적용 사례\n4. 피아제 이론과의 차이점\n5. 연습문제 3개" },
        { id: 3, question: "콜버그(Kohlberg)의 도덕성 발달 6단계를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 콜버그(Kohlberg)의 도덕성 발달 6단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3수준 6단계의 구조\n2. 각 단계별 특징과 예시\n3. 도덕 딜레마 활용법\n4. 길리건의 비판점\n5. 연습문제 3개" },
        { id: 4, question: "매슬로우(Maslow)의 욕구위계이론을 교육적 관점에서 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 매슬로우(Maslow)의 욕구위계이론을 교육적 관점에서 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계 욕구의 구조\n2. 결핍욕구와 성장욕구\n3. 자아실현의 특성\n4. 학교교육에의 적용\n5. 연습문제 3개" },
        { id: 5, question: "가드너(Gardner)의 다중지능이론 8가지 지능을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 가드너(Gardner)의 다중지능이론 8가지 지능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다중지능이론의 배경\n2. 8가지 지능의 특징\n3. 수업 설계에의 적용\n4. 스턴버그 삼원이론과 비교\n5. 연습문제 3개" },
        { id: 6, question: "행동주의 학습이론(파블로프, 스키너, 손다이크)을 비교 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 행동주의 학습이론(파블로프, 스키너, 손다이크)을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 학자의 핵심 개념\n2. 고전적 조건형성 vs 조작적 조건형성\n3. 강화와 벌의 유형\n4. 교육적 적용 사례\n5. 연습문제 3개" },
        { id: 7, question: "반두라(Bandura)의 사회학습이론과 자기효능감을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 반두라(Bandura)의 사회학습이론과 자기효능감을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관찰학습의 4단계\n2. 자기효능감의 원천 4가지\n3. 상호결정론의 의미\n4. 학교교육에의 적용\n5. 연습문제 3개" },
        { id: 8, question: "에릭슨(Erikson)의 심리사회적 발달 8단계를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 에릭슨(Erikson)의 심리사회적 발달 8단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 8단계의 구조와 특징\n2. 각 단계의 발달과업\n3. 청소년기 정체감 발달\n4. 프로이트와의 비교\n5. 연습문제 3개" },
        { id: 9, question: "켈러(Keller)의 ARCS 동기설계 모형을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 켈러(Keller)의 ARCS 동기설계 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ARCS 각 요소의 의미\n2. 각 요소별 전략\n3. 수업 설계에의 적용\n4. 다른 동기이론과의 연계\n5. 연습문제 3개" },
        { id: 10, question: "귀인이론(Weiner)과 학습된 무기력을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 귀인이론(Weiner)과 학습된 무기력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 귀인의 3차원 분류\n2. 성공/실패 귀인 패턴\n3. 학습된 무기력의 특징\n4. 교사의 지도 방안\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교육과정",
      questions: [
        { id: 11, question: "타일러(Tyler)의 교육과정 개발 모형을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 타일러(Tyler)의 교육과정 개발 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4가지 근본 질문\n2. 목표 설정의 원천 3가지\n3. 타당성 검증 절차\n4. 브루너, 워커 모형과 비교\n5. 연습문제 3개" },
        { id: 12, question: "브루너(Bruner)의 지식의 구조와 나선형 교육과정을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 브루너(Bruner)의 지식의 구조와 나선형 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지식의 구조 개념\n2. 나선형 교육과정의 원리\n3. 발견학습의 특징\n4. 학문중심 교육과정의 의의\n5. 연습문제 3개" },
        { id: 13, question: "잠재적 교육과정과 영 교육과정의 개념과 예시를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 잠재적 교육과정과 영 교육과정의 개념과 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잠재적 교육과정의 정의\n2. 영 교육과정의 정의\n3. 학교에서의 구체적 예시\n4. 교육적 시사점\n5. 연습문제 3개" },
        { id: 14, question: "2022 개정 교육과정의 주요 특징을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 2022 개정 교육과정의 주요 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개정의 배경과 방향\n2. 핵심역량의 구성\n3. 학교 자율시간 도입\n4. 2015 개정과의 비교\n5. 연습문제 3개" },
        { id: 15, question: "백워드 설계(Backward Design)의 3단계를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 백워드 설계(Backward Design)의 3단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이해중심 교육과정 개념\n2. 3단계 설계 과정\n3. WHERETO 요소\n4. 타일러 모형과의 비교\n5. 연습문제 3개" },
        { id: 16, question: "교육과정 재구성의 개념과 유형, 절차를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육과정 재구성의 개념과 유형, 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재구성의 필요성\n2. 재구성의 유형(통합, 증감 등)\n3. 재구성 절차\n4. 주의사항과 한계\n5. 연습문제 3개" },
        { id: 17, question: "역량기반 교육과정의 개념과 핵심역량을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 역량기반 교육과정의 개념과 핵심역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역량의 정의와 특징\n2. OECD DeSeCo 역량\n3. 한국 교육과정의 핵심역량\n4. 역량 평가 방법\n5. 연습문제 3개" },
        { id: 18, question: "통합교육과정의 유형과 장단점을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 통합교육과정의 유형과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합의 개념과 필요성\n2. 통합의 유형(다학문, 간학문, 탈학문)\n3. 장점과 단점\n4. 운영 시 고려사항\n5. 연습문제 3개" },
        { id: 19, question: "아이즈너(Eisner)의 교육과정 이론(예술적 비평)을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 아이즈너(Eisner)의 교육과정 이론(예술적 비평)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육적 감식안과 비평\n2. 표현적 결과의 개념\n3. 질적 탐구 방법\n4. 타일러 모형과의 차이\n5. 연습문제 3개" },
        { id: 20, question: "교육과정 실행의 관점(충실도, 상호적응, 생성)을 비교 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육과정 실행의 관점(충실도, 상호적응, 생성)을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충실도 관점의 특징\n2. 상호적응 관점의 특징\n3. 생성 관점의 특징\n4. 각 관점의 장단점\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교육평가",
      questions: [
        { id: 21, question: "진단평가, 형성평가, 총괄평가의 개념과 목적을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 진단평가, 형성평가, 총괄평가의 개념과 목적을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 각 평가의 정의\n2. 실시 시기와 목적\n3. 평가 결과의 활용\n4. 수업 설계에서의 위치\n5. 연습문제 3개" },
        { id: 22, question: "규준참조평가와 준거참조평가를 비교 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 규준참조평가와 준거참조평가를 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 평가의 개념\n2. 점수 해석 방식\n3. 적합한 활용 상황\n4. 장단점 비교\n5. 연습문제 3개" },
        { id: 23, question: "과정중심평가의 개념, 특징, 방법을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 과정중심평가의 개념, 특징, 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과정중심평가의 정의\n2. 결과중심평가와의 차이\n3. 수행평가와의 관계\n4. 구체적 실천 방법\n5. 연습문제 3개" },
        { id: 24, question: "수행평가의 개념, 유형, 설계 방법을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 수행평가의 개념, 유형, 설계 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행평가의 정의\n2. 유형(포트폴리오, 프로젝트 등)\n3. 루브릭 개발 방법\n4. 타당도와 신뢰도 확보\n5. 연습문제 3개" },
        { id: 25, question: "타당도의 유형(내용, 준거, 구인)을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 타당도의 유형(내용, 준거, 구인)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도의 정의\n2. 내용타당도의 확보 방법\n3. 준거타당도(예언, 공인)\n4. 구인타당도의 검증\n5. 연습문제 3개" },
        { id: 26, question: "신뢰도의 개념과 추정 방법을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 신뢰도의 개념과 추정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 정의\n2. 추정 방법(검사-재검사, 동형검사, 반분)\n3. 신뢰도 계수의 해석\n4. 신뢰도 향상 방법\n5. 연습문제 3개" },
        { id: 27, question: "문항분석의 요소(난이도, 변별도)를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 문항분석의 요소(난이도, 변별도)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 난이도의 계산과 해석\n2. 변별도의 계산과 해석\n3. 좋은 문항의 조건\n4. 문항 수정 방향\n5. 연습문제 3개" },
        { id: 28, question: "블룸(Bloom)의 교육목표분류학을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 블룸(Bloom)의 교육목표분류학을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인지적 영역의 6단계\n2. 정의적 영역의 5단계\n3. 심동적 영역의 특징\n4. 개정 분류학과의 비교\n5. 연습문제 3개" },
        { id: 29, question: "포트폴리오 평가의 개념, 유형, 활용 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 포트폴리오 평가의 개념, 유형, 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포트폴리오의 정의\n2. 유형(최선작품, 성장, 과정)\n3. 평가 기준 설정\n4. 장단점과 활용\n5. 연습문제 3개" },
        { id: 30, question: "자기평가와 동료평가의 개념과 활용 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 자기평가와 동료평가의 개념과 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 평가의 정의\n2. 교육적 효과\n3. 활용 시 유의점\n4. 구체적 적용 사례\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교육행정 및 교육사회학",
      questions: [
        { id: 31, question: "교육행정의 원리(민주성, 효율성, 합법성 등)를 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육행정의 원리(민주성, 효율성, 합법성 등)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육행정의 정의\n2. 주요 원리의 내용\n3. 원리 간 관계와 갈등\n4. 학교 운영에의 적용\n5. 연습문제 3개" },
        { id: 32, question: "장학의 유형(임상장학, 동료장학, 자기장학 등)을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 장학의 유형(임상장학, 동료장학, 자기장학 등)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 장학의 개념과 목적\n2. 각 유형의 특징\n3. 장단점 비교\n4. 학교 현장 적용\n5. 연습문제 3개" },
        { id: 33, question: "교육리더십의 유형(변혁적, 분산적, 서번트)을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육리더십의 유형(변혁적, 분산적, 서번트)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 리더십의 정의\n2. 주요 특징과 요소\n3. 학교 조직에의 적용\n4. 교사 리더십과의 관계\n5. 연습문제 3개" },
        { id: 34, question: "학습조직(Learning Organization)의 개념과 구축 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 학습조직(Learning Organization)의 개념과 구축 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습조직의 정의\n2. 센게(Senge)의 5가지 수련\n3. 학교의 학습조직화\n4. 전문적 학습공동체와 연계\n5. 연습문제 3개" },
        { id: 35, question: "교육의 기능론적 관점과 갈등론적 관점을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육의 기능론적 관점과 갈등론적 관점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기능론의 핵심 주장(뒤르켐, 파슨스)\n2. 갈등론의 핵심 주장(마르크스, 보울스와 진티스)\n3. 학교교육에 대한 해석 차이\n4. 비판점과 시사점\n5. 연습문제 3개" },
        { id: 36, question: "부르디외(Bourdieu)의 문화자본론을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 부르디외(Bourdieu)의 문화자본론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화자본의 개념\n2. 문화자본의 3가지 형태\n3. 아비투스와 장의 개념\n4. 교육 불평등과의 관계\n5. 연습문제 3개" },
        { id: 37, question: "번스타인(Bernstein)의 언어코드 이론을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 번스타인(Bernstein)의 언어코드 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제한코드와 정교코드\n2. 사회계층과 언어코드\n3. 학교교육과의 관계\n4. 교육적 시사점\n5. 연습문제 3개" },
        { id: 38, question: "학교효과 연구의 흐름과 효과적인 학교의 특징을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 학교효과 연구의 흐름과 효과적인 학교의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜먼 보고서의 영향\n2. 학교효과 연구의 발전\n3. 효과적인 학교의 특징\n4. 한국 상황에의 적용\n5. 연습문제 3개" },
        { id: 39, question: "학교자치의 개념과 운영 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 학교자치의 개념과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교자치의 정의\n2. 학교자치의 영역\n3. 학교자치 활성화 방안\n4. 한계와 과제\n5. 연습문제 3개" },
        { id: 40, question: "교원능력개발평가의 목적, 내용, 활용을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교원능력개발평가의 목적, 내용, 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가의 목적과 배경\n2. 평가 영역과 지표\n3. 평가 결과의 활용\n4. 문제점과 개선 방향\n5. 연습문제 3개" },
      ]
    },
    {
      title: "생활지도 및 교육철학",
      questions: [
        { id: 41, question: "생활지도의 원리와 영역을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 생활지도의 원리와 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생활지도의 정의와 목적\n2. 생활지도의 원리\n3. 5대 영역의 내용\n4. 학교급별 중점 영역\n5. 연습문제 3개" },
        { id: 42, question: "상담이론(인간중심, 합리정서행동, 현실치료)을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 상담이론(인간중심, 합리정서행동, 현실치료)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 인간중심상담(로저스)\n2. REBT(엘리스)\n3. 현실치료(글래서)\n4. 학교상담에의 적용\n5. 연습문제 3개" },
        { id: 43, question: "학교폭력 예방 및 대처 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 학교폭력 예방 및 대처 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교폭력의 유형\n2. 예방교육 방법\n3. 발생 시 대처 절차\n4. 법적 근거와 조치\n5. 연습문제 3개" },
        { id: 44, question: "진보주의와 항존주의 교육철학을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 진보주의와 항존주의 교육철학을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 진보주의의 핵심 주장(듀이)\n2. 항존주의의 핵심 주장(허친스)\n3. 교육 목표, 내용, 방법 비교\n4. 현대 교육에의 영향\n5. 연습문제 3개" },
        { id: 45, question: "본질주의와 재건주의 교육철학을 비교하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 본질주의와 재건주의 교육철학을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 본질주의의 핵심 주장\n2. 재건주의의 핵심 주장(브라멜드)\n3. 교육의 역할에 대한 관점\n4. 현대적 의의\n5. 연습문제 3개" },
        { id: 46, question: "피터스(Peters)의 교육 개념 분석을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 피터스(Peters)의 교육 개념 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육의 3가지 준거\n2. 각 준거의 의미\n3. 훈련, 교화와의 구별\n4. 비판점과 시사점\n5. 연습문제 3개" },
        { id: 47, question: "다문화교육의 목표, 내용, 방법을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 다문화교육의 목표, 내용, 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화교육의 필요성\n2. 목표와 내용\n3. 교수방법\n4. 한국 다문화교육의 과제\n5. 연습문제 3개" },
        { id: 48, question: "교육공학에서 ADDIE 모형을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 교육공학에서 ADDIE 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계의 의미\n2. 단계별 주요 활동\n3. 수업 설계에의 적용\n4. 다른 모형과의 비교\n5. 연습문제 3개" },
        { id: 49, question: "협동학습의 원리와 모형(Jigsaw, STAD)을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 협동학습의 원리와 모형(Jigsaw, STAD)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협동학습의 5가지 원리\n2. Jigsaw 모형의 절차\n3. STAD 모형의 절차\n4. 효과적 운영 방안\n5. 연습문제 3개" },
        { id: 50, question: "프로젝트 학습(PBL)의 개념과 운영 방안을 설명하시오.", prompt: "교원임용시험 교육학 문제입니다.\n\n문제: 프로젝트 학습(PBL)의 개념과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PBL의 정의와 특징\n2. 킬패트릭의 프로젝트법\n3. 운영 절차\n4. 평가 방법\n5. 연습문제 3개" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/education/teacher-certificate" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← 교원자격증으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">교육학</h1>
          <p className="text-gray-600">교원임용시험 1차 - 교육학 논술 대비</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-blue-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {totalQuestions} 문제 완료</p>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, index) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.includes(q.id)).length;
            const isOpen = openTopics.includes(index);

            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(index)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions.includes(q.id) ? 'border-blue-200 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${completedQuestions.includes(q.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                            {completedQuestions.includes(q.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{q.id}. {q.question}</p>
                            <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition">
                              🤖 AI에게 질문하기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 교육학 학습 포인트</h3>
          <ul className="space-y-1 text-blue-100">
            <li>• 주요 이론가 이름과 핵심 개념을 연결해서 암기하세요</li>
            <li>• 교육과정, 교육평가 영역의 용어를 정확히 구분하세요</li>
            <li>• 논술 답안은 서론-본론-결론 구조로 연습하세요</li>
            <li>• 2022 개정 교육과정 등 최신 정책을 숙지하세요</li>
          </ul>
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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
