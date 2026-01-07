'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ResearchMethodStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-1-research-method-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-1-research-method-progress', JSON.stringify(completedQuestions));
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
      title: '연구의 기초',
      icon: '📚',
      questions: [
        { id: 1, question: '상담연구의 목적과 중요성을 설명하시오.', answer: '상담 효과 검증, 이론 발전, 증거기반 실천 촉진', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 상담연구의 목적과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담연구의 정의\n2. 연구의 목적\n3. 상담실천에서의 중요성\n4. 증거기반 상담의 개념\n5. 연습문제 3개' },
        { id: 2, question: '과학적 연구의 특성과 원칙을 설명하시오.', answer: '객관성, 체계성, 재현가능성, 반증가능성', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 과학적 연구의 특성과 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과학적 연구의 정의\n2. 핵심 특성 4가지\n3. 과학적 방법의 단계\n4. 상담연구에의 적용\n5. 연습문제 3개' },
        { id: 3, question: '연구문제와 가설의 수립 방법을 설명하시오.', answer: '연구문제 도출, 변인 정의, 방향성 가설/비방향성 가설', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구문제와 가설의 수립 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구문제의 정의와 유형\n2. 가설의 정의와 특성\n3. 가설 수립 방법\n4. 방향성/비방향성 가설\n5. 연습문제 3개' },
        { id: 4, question: '변인의 종류(독립변인, 종속변인, 매개변인, 조절변인)를 설명하시오.', answer: '원인-결과 관계에서의 변인 역할 구분', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 변인의 종류(독립변인, 종속변인, 매개변인, 조절변인)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독립변인과 종속변인\n2. 매개변인의 역할\n3. 조절변인의 역할\n4. 상담연구에서의 예시\n5. 연습문제 3개' },
        { id: 5, question: '조작적 정의의 개념과 중요성을 설명하시오.', answer: '추상적 개념을 측정 가능한 형태로 정의', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 조작적 정의의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조작적 정의의 개념\n2. 구성개념과 조작적 정의\n3. 중요성\n4. 상담연구에서의 예시\n5. 연습문제 3개' },
        { id: 6, question: '문헌연구의 방법과 중요성을 설명하시오.', answer: '선행연구 검토를 통한 연구 방향 설정', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 문헌연구의 방법과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문헌연구의 목적\n2. 문헌 검색 방법\n3. 비판적 검토 방법\n4. 문헌고찰 작성법\n5. 연습문제 3개' }
      ]
    },
    {
      title: '연구설계',
      icon: '🎯',
      questions: [
        { id: 7, question: '실험설계의 유형(진실험, 준실험, 비실험)을 비교하시오.', answer: '무선할당, 통제집단 유무에 따른 설계 구분', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 실험설계의 유형(진실험, 준실험, 비실험)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 진실험설계의 특성\n2. 준실험설계의 특성\n3. 비실험설계의 특성\n4. 각 설계의 장단점 비교\n5. 연습문제 3개' },
        { id: 8, question: '내적 타당도와 외적 타당도를 설명하시오.', answer: '인과관계 추론의 정확성 vs 일반화 가능성', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 내적 타당도와 외적 타당도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내적 타당도의 정의\n2. 내적 타당도 저해요인\n3. 외적 타당도의 정의\n4. 두 타당도의 관계\n5. 연습문제 3개' },
        { id: 9, question: '단일사례연구설계의 유형과 특징을 설명하시오.', answer: 'AB설계, ABAB설계, 다중기저선설계 등', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 단일사례연구설계의 유형과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단일사례연구의 정의\n2. 주요 설계 유형\n3. 각 설계의 장단점\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 10, question: '통제집단 설계의 종류와 특징을 설명하시오.', answer: '사전사후통제집단, 솔로몬4집단 등', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 통제집단 설계의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통제집단의 필요성\n2. 주요 설계 유형\n3. 각 설계의 장단점\n4. 상담효과 연구에서의 활용\n5. 연습문제 3개' },
        { id: 11, question: '종단연구와 횡단연구를 비교하시오.', answer: '시간에 따른 변화 추적 vs 특정 시점 비교', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 종단연구와 횡단연구를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 종단연구의 정의와 특성\n2. 횡단연구의 정의와 특성\n3. 장단점 비교\n4. 상담연구에서의 적용\n5. 연습문제 3개' },
        { id: 12, question: '상관연구설계의 특징과 한계를 설명하시오.', answer: '변인 간 관계 파악, 인과관계 추론 불가', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 상관연구설계의 특징과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상관연구의 정의\n2. 설계 특징\n3. 장점과 활용\n4. 인과관계 추론의 한계\n5. 연습문제 3개' }
      ]
    },
    {
      title: '측정과 척도',
      icon: '📏',
      questions: [
        { id: 13, question: '측정의 4가지 수준(명목, 서열, 등간, 비율)을 설명하시오.', answer: '측정 수준에 따라 사용 가능한 통계 방법 결정', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 측정의 4가지 수준(명목, 서열, 등간, 비율)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명목척도의 특성\n2. 서열척도의 특성\n3. 등간척도의 특성\n4. 비율척도의 특성\n5. 연습문제 3개' },
        { id: 14, question: '신뢰도의 종류와 측정 방법을 설명하시오.', answer: '검사-재검사, 내적일치도, 반분신뢰도, 평가자간 신뢰도', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 신뢰도의 종류와 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 정의\n2. 신뢰도 유형별 측정 방법\n3. Cronbach α 해석\n4. 신뢰도 향상 방법\n5. 연습문제 3개' },
        { id: 15, question: '타당도의 종류(내용, 구인, 준거)를 설명하시오.', answer: '측정하고자 하는 것을 실제로 측정하는 정도', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 타당도의 종류(내용, 구인, 준거)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도의 정의\n2. 내용타당도\n3. 구인타당도 (수렴, 변별)\n4. 준거타당도 (동시, 예언)\n5. 연습문제 3개' },
        { id: 16, question: '심리검사 선정 시 고려사항을 설명하시오.', answer: '타당도, 신뢰도, 규준, 실용성 고려', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 심리검사 선정 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 목적과의 부합성\n2. 심리측정적 속성 검토\n3. 대상 집단 적합성\n4. 실용적 고려사항\n5. 연습문제 3개' },
        { id: 17, question: '요인분석의 목적과 방법을 설명하시오.', answer: '변인들의 잠재구조 파악, 탐색적/확인적 요인분석', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 요인분석의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 요인분석의 목적\n2. 탐색적 요인분석\n3. 확인적 요인분석\n4. 결과 해석 방법\n5. 연습문제 3개' }
      ]
    },
    {
      title: '표집과 자료수집',
      icon: '🎲',
      questions: [
        { id: 18, question: '확률표집과 비확률표집의 종류를 비교하시오.', answer: '무선표집 vs 편의표집, 목적표집 등', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 확률표집과 비확률표집의 종류를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 확률표집의 종류\n2. 비확률표집의 종류\n3. 각 방법의 장단점\n4. 상담연구에서의 선택\n5. 연습문제 3개' },
        { id: 19, question: '표본크기 결정 방법을 설명하시오.', answer: '검정력 분석, 효과크기, 유의수준 고려', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 표본크기 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표본크기의 중요성\n2. 검정력 분석\n3. 효과크기와 표본크기\n4. G*Power 활용\n5. 연습문제 3개' },
        { id: 20, question: '설문지 작성의 원칙과 주의사항을 설명하시오.', answer: '문항 명확성, 응답 편향 방지, 구성 순서', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 설문지 작성의 원칙과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문지 작성 원칙\n2. 문항 작성 시 주의사항\n3. 응답 편향 유형\n4. 사전검사의 중요성\n5. 연습문제 3개' },
        { id: 21, question: '면담법의 종류와 장단점을 설명하시오.', answer: '구조화, 반구조화, 비구조화 면담', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 면담법의 종류와 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면담법의 정의\n2. 구조화 정도에 따른 분류\n3. 각 유형의 장단점\n4. 상담연구에서의 활용\n5. 연습문제 3개' }
      ]
    },
    {
      title: '양적분석 방법',
      icon: '📊',
      questions: [
        { id: 22, question: '기술통계와 추론통계를 비교하시오.', answer: '자료 요약 vs 모집단 추정·가설검증', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 기술통계와 추론통계를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기술통계의 정의와 종류\n2. 추론통계의 정의와 목적\n3. 중심경향치와 산포도\n4. 통계적 유의성\n5. 연습문제 3개' },
        { id: 23, question: 't검정의 종류와 사용 조건을 설명하시오.', answer: '독립표본, 대응표본, 단일표본 t검정', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: t검정의 종류와 사용 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. t검정의 목적\n2. t검정 종류별 사용 상황\n3. 기본 가정\n4. 결과 해석 방법\n5. 연습문제 3개' },
        { id: 24, question: '분산분석(ANOVA)의 원리와 사후검정을 설명하시오.', answer: '집단 간 평균 차이 검정, Tukey, Scheffé 등 사후검정', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 분산분석(ANOVA)의 원리와 사후검정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ANOVA의 원리\n2. F값의 의미\n3. 사후검정의 필요성\n4. 주요 사후검정 방법\n5. 연습문제 3개' },
        { id: 25, question: '상관분석과 회귀분석을 비교하시오.', answer: '변인 간 관계 강도 vs 예측 및 설명', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 상관분석과 회귀분석을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 상관분석의 목적과 방법\n2. 회귀분석의 목적과 방법\n3. 두 분석의 관계\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 26, question: '다중회귀분석의 방법과 해석을 설명하시오.', answer: '여러 예측변인의 영향력 분석', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 다중회귀분석의 방법과 해석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다중회귀분석의 목적\n2. 회귀계수 해석\n3. 설명력(R²) 해석\n4. 다중공선성 문제\n5. 연습문제 3개' },
        { id: 27, question: '매개효과와 조절효과 분석 방법을 설명하시오.', answer: 'Baron & Kenny, Process Macro, 위계적 회귀', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 매개효과와 조절효과 분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매개효과의 개념과 분석\n2. 조절효과의 개념과 분석\n3. Baron & Kenny 절차\n4. 부트스트래핑 방법\n5. 연습문제 3개' },
        { id: 28, question: '구조방정식모형(SEM)의 기초를 설명하시오.', answer: '측정모형과 구조모형을 동시 분석', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 구조방정식모형(SEM)의 기초를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SEM의 정의와 특징\n2. 측정모형과 구조모형\n3. 적합도 지수\n4. 상담연구에서의 활용\n5. 연습문제 3개' }
      ]
    },
    {
      title: '질적연구 방법',
      icon: '🔍',
      questions: [
        { id: 29, question: '질적연구의 특성과 양적연구와의 차이를 설명하시오.', answer: '귀납적 접근, 맥락 중시, 심층적 이해', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 질적연구의 특성과 양적연구와의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질적연구의 정의\n2. 핵심 특성\n3. 양적연구와의 차이\n4. 적합한 연구 상황\n5. 연습문제 3개' },
        { id: 30, question: '현상학적 연구방법을 설명하시오.', answer: '체험의 본질 탐구, Moustakas, Giorgi 방법', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 현상학적 연구방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현상학의 철학적 배경\n2. 연구 절차\n3. 자료 분석 방법\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 31, question: '근거이론 연구방법을 설명하시오.', answer: '자료에서 이론 생성, 개방코딩-축코딩-선택코딩', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 근거이론 연구방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근거이론의 철학적 배경\n2. Strauss & Corbin 접근\n3. 코딩 절차\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 32, question: '합의적 질적연구(CQR)를 설명하시오.', answer: '연구팀 합의를 통한 질적 분석의 신뢰성 확보', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 합의적 질적연구(CQR)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CQR의 개념과 특징\n2. 연구팀 구성\n3. 분석 절차\n4. 상담연구에서의 장점\n5. 연습문제 3개' },
        { id: 33, question: '사례연구(Case Study)의 유형과 방법을 설명하시오.', answer: '단일/다중 사례, 심층적 맥락 분석', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 사례연구(Case Study)의 유형과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례연구의 정의\n2. 사례연구 유형\n3. 자료수집과 분석\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 34, question: '질적연구의 신뢰성과 타당성 확보 방법을 설명하시오.', answer: '삼각검증, 동료검토, 참여자 확인 등', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 질적연구의 신뢰성과 타당성 확보 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질적연구의 엄격성 기준\n2. 신뢰성 확보 전략\n3. 타당성 확보 전략\n4. Lincoln & Guba의 기준\n5. 연습문제 3개' }
      ]
    },
    {
      title: '혼합연구와 상담성과연구',
      icon: '🔬',
      questions: [
        { id: 35, question: '혼합연구방법의 유형과 특징을 설명하시오.', answer: '순차적/동시적, 양적우선/질적우선 설계', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 혼합연구방법의 유형과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 혼합연구의 정의\n2. 주요 설계 유형\n3. 각 유형의 장단점\n4. 상담연구에서의 활용\n5. 연습문제 3개' },
        { id: 36, question: '상담성과연구의 방법론적 쟁점을 설명하시오.', answer: 'RCT의 한계, 치료동맹 측정, 추수효과 검증', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 상담성과연구의 방법론적 쟁점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담성과연구의 정의\n2. 무선통제실험(RCT)의 쟁점\n3. 실제적 임상시험\n4. 치료요인 연구\n5. 연습문제 3개' },
        { id: 37, question: '효과크기(Effect Size)의 개념과 해석을 설명하시오.', answer: 'Cohen의 d, η², 효과 크기 해석 기준', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 효과크기(Effect Size)의 개념과 해석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과크기의 정의\n2. 주요 효과크기 지표\n3. Cohen의 해석 기준\n4. 상담연구에서의 중요성\n5. 연습문제 3개' },
        { id: 38, question: '메타분석의 목적과 방법을 설명하시오.', answer: '다수 연구결과의 통계적 통합', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 메타분석의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 메타분석의 정의\n2. 분석 절차\n3. 동질성 검정\n4. 결과 해석과 보고\n5. 연습문제 3개' },
        { id: 39, question: '상담과정연구의 방법을 설명하시오.', answer: '회기분석, 중요사건분석, 언어분석', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 상담과정연구의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과정연구의 정의\n2. 주요 연구 방법\n3. 분석 도구와 척도\n4. 성과연구와의 통합\n5. 연습문제 3개' }
      ]
    },
    {
      title: '연구윤리와 논문작성',
      icon: '✍️',
      questions: [
        { id: 40, question: '연구윤리의 원칙과 IRB 심의를 설명하시오.', answer: '자발적 동의, 비밀보장, 위해 최소화', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구윤리의 원칙과 IRB 심의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구윤리의 기본 원칙\n2. IRB의 역할과 기능\n3. 심의 절차\n4. 연구 참여자 보호\n5. 연습문제 3개' },
        { id: 41, question: '연구 참여자 동의와 비밀보장을 설명하시오.', answer: '충분한 정보 제공, 자발적 동의, 익명성 보장', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구 참여자 동의와 비밀보장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충분한 설명에 의한 동의\n2. 동의서 구성요소\n3. 비밀보장 방법\n4. 청소년 연구 시 고려사항\n5. 연습문제 3개' },
        { id: 42, question: '연구부정행위의 유형과 예방을 설명하시오.', answer: '위조, 변조, 표절, 부당저자 표시', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구부정행위의 유형과 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구부정행위의 정의\n2. 주요 유형\n3. 발생 원인\n4. 예방 방안\n5. 연습문제 3개' },
        { id: 43, question: '학술논문의 구성과 작성법을 설명하시오.', answer: '서론-방법-결과-논의 체계, APA 형식', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 학술논문의 구성과 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 논문의 기본 구조\n2. 각 섹션의 작성법\n3. APA 형식 기초\n4. 투고와 심사 과정\n5. 연습문제 3개' },
        { id: 44, question: 'APA 양식의 참고문헌 표기법을 설명하시오.', answer: '저자, 연도, 제목, 출처의 체계적 표기', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: APA 양식의 참고문헌 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. APA 양식의 기본 원칙\n2. 학술지 논문 표기\n3. 단행본 표기\n4. 인용과 참고문헌 연결\n5. 연습문제 3개' },
        { id: 45, question: '연구결과의 해석과 논의 작성법을 설명하시오.', answer: '결과 요약, 이론적 함의, 실천적 시사점, 제한점', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구결과의 해석과 논의 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결과 해석의 원칙\n2. 선행연구와의 비교\n3. 이론적·실천적 함의\n4. 제한점과 후속연구 제언\n5. 연습문제 3개' },
        { id: 46, question: '청소년 대상 연구의 윤리적 고려사항을 설명하시오.', answer: '보호자 동의, 아동 동의, 취약 집단 보호', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 청소년 대상 연구의 윤리적 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미성년자 연구의 특수성\n2. 보호자 동의와 아동 동의\n3. 취약 집단 보호\n4. 학교 기반 연구 고려사항\n5. 연습문제 3개' },
        { id: 47, question: '연구의 일반화 가능성과 한계를 설명하시오.', answer: '표본 대표성, 맥락 의존성, 시간적 한계', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구의 일반화 가능성과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반화의 개념\n2. 일반화 저해 요인\n3. 적절한 제한점 기술\n4. 후속연구 방향 제안\n5. 연습문제 3개' },
        { id: 48, question: '증거기반 실천(EBP)의 개념과 상담에서의 적용을 설명하시오.', answer: '연구증거, 임상전문성, 내담자 특성의 통합', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 증거기반 실천(EBP)의 개념과 상담에서의 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EBP의 정의\n2. 세 가지 구성요소\n3. 상담에서의 적용\n4. EBP의 한계와 비판\n5. 연습문제 3개' },
        { id: 49, question: '프로그램 평가연구의 방법을 설명하시오.', answer: '과정평가, 성과평가, 형성평가, 총괄평가', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 프로그램 평가연구의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 평가의 목적\n2. 평가 유형\n3. 평가 설계\n4. 청소년 프로그램 평가 사례\n5. 연습문제 3개' },
        { id: 50, question: '연구결과의 현장 적용과 지식 전환을 설명하시오.', answer: '연구-실천 격차 해소, 실천가 참여 연구', prompt: '청소년상담사 1급 - 상담연구방법론의 실제 문제입니다.\n\n문제: 연구결과의 현장 적용과 지식 전환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구-실천 격차\n2. 지식 전환의 개념\n3. 실천가-연구자 협력\n4. 현장 적용 촉진 전략\n5. 연습문제 3개' }
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
            <span className="text-gray-900">상담연구방법론의 실제</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📊</span>
            <div>
              <h1 className="text-2xl font-bold">상담연구방법론의 실제</h1>
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
            href="/category/welfare/youth-counselor-1/study/youth-law"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 이전 과목
          </Link>
          <Link
            href="/category/welfare/youth-counselor-1/study/crisis-counseling"
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
          <p className="text-gray-400">청소년상담사 1급 - 상담연구방법론의 실제</p>
        </div>
      </footer>
    </div>
  );
}
