'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MajorSubjectPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teacher-major-subject-completed');
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
      localStorage.setItem('teacher-major-subject-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "교과교육론 기초",
      questions: [
        { id: 1, question: "교과교육의 정의와 구성 요소를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과교육의 정의와 구성 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과교육의 개념\n2. 교과내용학과 교과교육학의 관계\n3. 구성 요소(목표, 내용, 방법, 평가)\n4. 교과교육의 역할\n5. 연습문제 3개" },
        { id: 2, question: "교과교육과정의 성취기준 작성 원리를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과교육과정의 성취기준 작성 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성취기준의 정의\n2. 작성 원리(명확성, 실현가능성 등)\n3. 성취기준 진술 방법\n4. 교수학습 및 평가와의 연계\n5. 연습문제 3개" },
        { id: 3, question: "교과 역량의 개념과 교과별 핵심역량을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 역량의 개념과 교과별 핵심역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과 역량의 정의\n2. 총론 핵심역량과의 관계\n3. 교과별 역량 예시\n4. 역량 중심 수업 설계\n5. 연습문제 3개" },
        { id: 4, question: "교과 교육목표 진술 방법(메이거, 그론룬드)을 비교하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 교육목표 진술 방법(메이거, 그론룬드)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 메이거(Mager) 방식의 특징\n2. 그론룬드(Gronlund) 방식의 특징\n3. 행동목표와 포괄적 목표 비교\n4. 적합한 활용 상황\n5. 연습문제 3개" },
        { id: 5, question: "교과 내용 선정의 원리(타당성, 유용성, 흥미 등)를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 내용 선정의 원리(타당성, 유용성, 흥미 등)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 원리의 의미\n2. 내용 선정 시 고려사항\n3. 범위와 계열의 개념\n4. 학습자 수준 고려\n5. 연습문제 3개" },
        { id: 6, question: "교과 내용 조직의 원리(계열성, 계속성, 통합성)를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 내용 조직의 원리(계열성, 계속성, 통합성)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 원리의 정의\n2. 수직적 조직과 수평적 조직\n3. 나선형 교육과정과의 관계\n4. 조직 원리 적용 예시\n5. 연습문제 3개" },
        { id: 7, question: "교과서의 기능과 교과서 활용 수업 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과서의 기능과 교과서 활용 수업 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과서의 기능과 역할\n2. 교과서 중심 수업의 장단점\n3. 교과서 재구성 방법\n4. 디지털 교과서 활용\n5. 연습문제 3개" },
        { id: 8, question: "교과 통합 교육의 유형과 운영 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 통합 교육의 유형과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합의 필요성\n2. 통합의 유형(다학문, 간학문, 탈학문)\n3. 주제 중심 통합 설계\n4. 운영 시 유의점\n5. 연습문제 3개" },
        { id: 9, question: "교과 PCK(교수내용지식)의 개념과 구성요소를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 PCK(교수내용지식)의 개념과 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PCK의 정의(슐만)\n2. PCK의 구성요소\n3. PCK 발달 방법\n4. 교사 전문성과의 관계\n5. 연습문제 3개" },
        { id: 10, question: "2022 개정 교육과정에서 교과 교육의 변화를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 2022 개정 교육과정에서 교과 교육의 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개정의 주요 방향\n2. 교과 편제의 변화\n3. 성취기준 진술 방식 변화\n4. 평가 방향의 변화\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교수학습 방법",
      questions: [
        { id: 11, question: "직접교수법의 절차와 효과적 활용 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 직접교수법의 절차와 효과적 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접교수의 정의와 특징\n2. 수업 절차(설명-시범-연습-적용)\n3. 적합한 학습 내용\n4. 효과적 운영 방안\n5. 연습문제 3개" },
        { id: 12, question: "발견학습과 탐구학습의 차이점을 비교하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 발견학습과 탐구학습의 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 발견학습의 개념(브루너)\n2. 탐구학습의 개념\n3. 공통점과 차이점\n4. 교과별 적용 사례\n5. 연습문제 3개" },
        { id: 13, question: "문제중심학습(PBL)의 절차와 교사 역할을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 문제중심학습(PBL)의 절차와 교사 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PBL의 정의와 특징\n2. 문제 설계 원칙\n3. 수업 절차\n4. 교사의 촉진자 역할\n5. 연습문제 3개" },
        { id: 14, question: "협동학습 모형(Jigsaw, STAD, TGT)을 비교 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 협동학습 모형(Jigsaw, STAD, TGT)을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Jigsaw 모형의 절차\n2. STAD 모형의 절차\n3. TGT 모형의 절차\n4. 각 모형의 장단점\n5. 연습문제 3개" },
        { id: 15, question: "플립러닝(Flipped Learning)의 개념과 운영 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 플립러닝(Flipped Learning)의 개념과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플립러닝의 정의\n2. 사전학습-본시학습 설계\n3. 영상 제작 방법\n4. 효과적 운영 전략\n5. 연습문제 3개" },
        { id: 16, question: "하브루타 학습의 개념과 적용 방법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 하브루타 학습의 개념과 적용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하브루타의 정의\n2. 질문 만들기 전략\n3. 짝토론 운영 방법\n4. 교과별 적용 사례\n5. 연습문제 3개" },
        { id: 17, question: "개별화 수업의 유형(PSI, CAI, 적성처치 상호작용)을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 개별화 수업의 유형(PSI, CAI, 적성처치 상호작용)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PSI(켈러 플랜)의 특징\n2. CAI(컴퓨터 보조수업)\n3. ATI(적성처치 상호작용)\n4. 개별화의 교육적 의의\n5. 연습문제 3개" },
        { id: 18, question: "토의·토론 학습의 유형과 운영 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 토의·토론 학습의 유형과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토의와 토론의 차이\n2. 토론 유형(디베이트, 피라미드 등)\n3. 효과적 운영 방법\n4. 평가 방법\n5. 연습문제 3개" },
        { id: 19, question: "블렌디드 러닝의 개념과 설계 전략을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 블렌디드 러닝의 개념과 설계 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 블렌디드 러닝의 정의\n2. 온라인-오프라인 조합 방식\n3. 설계 시 고려사항\n4. 효과적 운영 사례\n5. 연습문제 3개" },
        { id: 20, question: "게이미피케이션의 개념과 수업 적용 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 게이미피케이션의 개념과 수업 적용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게이미피케이션의 정의\n2. 게임 요소(배지, 리더보드 등)\n3. 교과 수업 적용 사례\n4. 효과와 주의점\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교과 평가",
      questions: [
        { id: 21, question: "교과 평가의 목적과 원리를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 평가의 목적과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과 평가의 목적\n2. 평가의 기본 원리\n3. 교수학습과 평가의 연계\n4. 공정한 평가를 위한 조건\n5. 연습문제 3개" },
        { id: 22, question: "과정중심평가의 개념과 실천 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 과정중심평가의 개념과 실천 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과정중심평가의 정의\n2. 핵심 특징\n3. 구체적 실천 방법\n4. 피드백 제공 방안\n5. 연습문제 3개" },
        { id: 23, question: "수행평가의 유형과 채점 기준 개발 방법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수행평가의 유형과 채점 기준 개발 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행평가의 유형\n2. 루브릭의 종류(총체적, 분석적)\n3. 채점 기준 개발 절차\n4. 신뢰도 확보 방안\n5. 연습문제 3개" },
        { id: 24, question: "포트폴리오 평가의 설계와 활용 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 포트폴리오 평가의 설계와 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포트폴리오의 정의와 유형\n2. 설계 절차\n3. 평가 기준 설정\n4. 교과별 활용 사례\n5. 연습문제 3개" },
        { id: 25, question: "자기평가와 동료평가의 설계 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 자기평가와 동료평가의 설계 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기평가의 교육적 가치\n2. 동료평가의 운영 방법\n3. 신뢰도 확보 방안\n4. 유의사항\n5. 연습문제 3개" },
        { id: 26, question: "형성평가의 효과적 활용 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 형성평가의 효과적 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성평가의 정의와 목적\n2. 수업 중 형성평가 방법\n3. 즉각적 피드백 전략\n4. 학습 개선과의 연계\n5. 연습문제 3개" },
        { id: 27, question: "서술형·논술형 평가의 문항 개발과 채점 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 서술형·논술형 평가의 문항 개발과 채점 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서술형/논술형의 차이\n2. 문항 개발 원칙\n3. 채점 기준 설정\n4. 채점 신뢰도 확보\n5. 연습문제 3개" },
        { id: 28, question: "학습 피드백의 유형과 효과적 제공 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 학습 피드백의 유형과 효과적 제공 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피드백의 유형\n2. 효과적 피드백의 조건\n3. 피드백 제공 시기\n4. 학습 개선과의 연계\n5. 연습문제 3개" },
        { id: 29, question: "교과 평가 결과의 기록과 통지 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교과 평가 결과의 기록과 통지 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가 결과 기록 방법\n2. 학교생활기록부 기재\n3. 학생·학부모 통지 방법\n4. 개인정보 보호 고려\n5. 연습문제 3개" },
        { id: 30, question: "평가 문항의 질 관리(타당도, 신뢰도, 객관도)를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 평가 문항의 질 관리(타당도, 신뢰도, 객관도)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도 확보 방안\n2. 신뢰도 확보 방안\n3. 객관도 확보 방안\n4. 문항 검토 절차\n5. 연습문제 3개" },
      ]
    },
    {
      title: "수업 설계 및 운영",
      questions: [
        { id: 31, question: "교수학습 지도안 작성의 원리와 형식을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교수학습 지도안 작성의 원리와 형식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지도안의 구성 요소\n2. 세안과 약안의 차이\n3. 학습목표 진술 방법\n4. 도입-전개-정리 설계\n5. 연습문제 3개" },
        { id: 32, question: "학습목표 설정과 진술 방법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 학습목표 설정과 진술 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습목표의 중요성\n2. ABCD 진술 방식\n3. 인지적·정의적·심동적 목표\n4. 성취기준과의 연계\n5. 연습문제 3개" },
        { id: 33, question: "수업 도입 단계의 전략과 기법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수업 도입 단계의 전략과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도입의 목적과 역할\n2. 동기유발 전략\n3. 선수학습 확인\n4. 학습목표 제시 방법\n5. 연습문제 3개" },
        { id: 34, question: "수업 전개 단계의 교수 전략을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수업 전개 단계의 교수 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전개의 구성 원리\n2. 학습활동 설계\n3. 설명과 시범 기술\n4. 학습자 참여 유도\n5. 연습문제 3개" },
        { id: 35, question: "수업 정리 단계의 전략과 평가 활동을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수업 정리 단계의 전략과 평가 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정리의 목적\n2. 학습 내용 요약 방법\n3. 형성평가 활용\n4. 다음 차시 예고\n5. 연습문제 3개" },
        { id: 36, question: "효과적인 발문 기술과 유형을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 효과적인 발문 기술과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발문의 교육적 역할\n2. 발문의 유형(수렴적, 확산적)\n3. 블룸 수준별 발문\n4. 대기시간의 활용\n5. 연습문제 3개" },
        { id: 37, question: "판서 구성의 원리와 효과적 활용법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 판서 구성의 원리와 효과적 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판서의 교육적 기능\n2. 판서 구성 원리\n3. 시각화 전략\n4. 디지털 도구 활용\n5. 연습문제 3개" },
        { id: 38, question: "교실 내 학습 환경 구성 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교실 내 학습 환경 구성 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 환경 구성\n2. 심리적 환경 조성\n3. 좌석 배치 유형\n4. 학습 분위기 형성\n5. 연습문제 3개" },
        { id: 39, question: "학습자 중심 수업의 설계 원리를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 학습자 중심 수업의 설계 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습자 중심의 개념\n2. 교사 역할의 변화\n3. 설계 원리\n4. 구체적 실천 방안\n5. 연습문제 3개" },
        { id: 40, question: "수업 성찰과 개선 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수업 성찰과 개선 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수업 성찰의 의미\n2. 성찰적 실천의 방법\n3. 수업 분석 도구\n4. 지속적 개선 전략\n5. 연습문제 3개" },
      ]
    },
    {
      title: "학생 지도 및 교직 전문성",
      questions: [
        { id: 41, question: "학습부진 학생 지도 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 학습부진 학생 지도 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습부진의 원인\n2. 진단 방법\n3. 개별화 지도 전략\n4. 지원 시스템 활용\n5. 연습문제 3개" },
        { id: 42, question: "영재학생 지도 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 영재학생 지도 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영재의 특성\n2. 판별 방법\n3. 심화·속진 전략\n4. 사회·정서적 지도\n5. 연습문제 3개" },
        { id: 43, question: "특수교육대상 학생의 통합교육 지원 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 특수교육대상 학생의 통합교육 지원 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합교육의 의미\n2. 교육과정 수정 방법\n3. 보편적 학습설계(UDL)\n4. 협력교수 모형\n5. 연습문제 3개" },
        { id: 44, question: "다문화 학생 지도 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 다문화 학생 지도 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 학생의 특성\n2. 한국어 교육 지원\n3. 교과 학습 지원\n4. 문화 간 이해 교육\n5. 연습문제 3개" },
        { id: 45, question: "교사의 전문성 발달 단계와 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교사의 전문성 발달 단계와 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전문성 발달 단계\n2. 각 단계별 특징\n3. 전문성 신장 방안\n4. 학습공동체 참여\n5. 연습문제 3개" },
        { id: 46, question: "전문적 학습공동체의 개념과 운영 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 전문적 학습공동체의 개념과 운영 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습공동체의 정의\n2. 핵심 특성\n3. 운영 방법\n4. 효과와 과제\n5. 연습문제 3개" },
        { id: 47, question: "수업 컨설팅의 개념과 절차를 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 수업 컨설팅의 개념과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수업 컨설팅의 정의\n2. 절차(준비-실행-정리)\n3. 컨설턴트의 역할\n4. 효과적 운영 방안\n5. 연습문제 3개" },
        { id: 48, question: "교사 연구의 유형과 방법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교사 연구의 유형과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교사 연구의 필요성\n2. 실행연구의 개념\n3. 수업 연구 방법\n4. 연구 결과 공유\n5. 연습문제 3개" },
        { id: 49, question: "교육과정-수업-평가 일체화의 개념과 방안을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 교육과정-수업-평가 일체화의 개념과 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일체화의 개념\n2. 성취기준 중심 설계\n3. 백워드 설계와의 관계\n4. 실천 방안\n5. 연습문제 3개" },
        { id: 50, question: "디지털 리터러시 교육의 내용과 방법을 설명하시오.", prompt: "교원임용시험 전공 문제입니다.\n\n문제: 디지털 리터러시 교육의 내용과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 리터러시의 정의\n2. 구성 요소\n3. 교과 수업에서의 적용\n4. AI 시대 역량 교육\n5. 연습문제 3개" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/education/teacher-certificate" className="text-green-600 hover:text-green-800 mb-4 inline-block">
            ← 교원자격증으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전공과목</h1>
          <p className="text-gray-600">교원임용시험 1차 - 교과교육학 및 교과내용학</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-green-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
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
                    <span className="text-2xl">📖</span>
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
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions.includes(q.id) ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${completedQuestions.includes(q.id) ? 'border-green-500 bg-green-500' : 'border-gray-300 hover:border-green-400'}`}>
                            {completedQuestions.includes(q.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{q.id}. {q.question}</p>
                            <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition">
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
        <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 전공과목 학습 포인트</h3>
          <ul className="space-y-1 text-green-100">
            <li>• 교과교육학은 교육과정 문서를 반드시 숙지하세요</li>
            <li>• 교과내용학은 기본서를 3회독 이상 정독하세요</li>
            <li>• 기입형 문항은 정확한 용어 암기가 핵심입니다</li>
            <li>• 서술형 문항은 키워드 중심으로 답안을 구조화하세요</li>
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
