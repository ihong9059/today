'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'concept',
    name: '지역사회보건의 개념',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '지역사회보건(Community Health)의 정의와 목적을 설명하시오.',
        answer: '지역사회 주민의 건강 향상을 위한 조직적 노력, 건강형평성 달성',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회보건(Community Health)의 정의와 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회보건의 정의
2. 지역사회의 범위와 유형
3. 지역사회보건의 목적
4. 공중보건과의 관계
5. 연습문제 3개`
      },
      {
        id: 2,
        question: '지역사회의 개념과 구성요소를 설명하시오.',
        answer: '지리적/기능적 지역사회, 구성요소: 인구, 장소, 사회체계',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회의 개념과 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회의 정의
2. 지리적 지역사회 vs 기능적 지역사회
3. 지역사회의 구성요소
4. 지역사회 역량의 개념
5. 연습문제 3개`
      },
      {
        id: 3,
        question: '일차보건의료(Primary Health Care)의 개념과 원칙을 설명하시오.',
        answer: '알마아타 선언(1978), 필수의료, 형평성, 지역사회 참여, 다부문 협력',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 일차보건의료(Primary Health Care)의 개념과 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 알마아타 선언의 배경
2. 일차보건의료의 정의
3. 4대 원칙
4. 8대 필수보건의료서비스
5. 연습문제 3개`
      },
      {
        id: 4,
        question: '건강형평성(Health Equity)의 개념과 건강불평등 요인을 설명하시오.',
        answer: '모든 사람의 건강 잠재력 실현 기회 보장, 사회경제적 결정요인',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강형평성(Health Equity)의 개념과 건강불평등 요인을 설명하시오.

다음 순서로 설명해주세요:
1. 건강형평성의 정의
2. 건강불평등과 건강격차의 차이
3. 건강불평등의 사회경제적 요인
4. 건강형평성 달성 전략
5. 연습문제 3개`
      },
      {
        id: 5,
        question: '건강의 사회적 결정요인(Social Determinants of Health)을 설명하시오.',
        answer: '소득, 교육, 고용, 주거, 사회적 지지 등 건강에 영향을 미치는 사회적 조건',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강의 사회적 결정요인(Social Determinants of Health)을 설명하시오.

다음 순서로 설명해주세요:
1. 건강의 사회적 결정요인 정의
2. 주요 결정요인 (소득, 교육, 고용 등)
3. 데일그렌-화이트헤드 모형
4. 사회적 결정요인 개선 전략
5. 연습문제 3개`
      },
      {
        id: 6,
        question: '지역사회보건 활동의 역사적 발전을 설명하시오.',
        answer: '19세기 위생운동→20세기 공중보건→현재 건강증진/지역사회 참여',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회보건 활동의 역사적 발전을 설명하시오.

다음 순서로 설명해주세요:
1. 19세기 위생운동 시대
2. 20세기 공중보건 발전
3. 알마아타 선언 이후
4. 한국 지역사회보건의 발전
5. 연습문제 3개`
      },
      {
        id: 7,
        question: '오타와 헌장(1986)의 건강증진 5대 활동 영역을 설명하시오.',
        answer: '건강한 공공정책, 지지적 환경, 지역사회 활동 강화, 개인기술 개발, 보건의료서비스 방향 재정립',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 오타와 헌장(1986)의 건강증진 5대 활동 영역을 설명하시오.

다음 순서로 설명해주세요:
1. 오타와 헌장의 배경과 의의
2. 건강한 공공정책 수립
3. 건강지지적 환경 조성
4. 지역사회 활동 강화
5. 개인의 건강기술 개발
6. 보건의료서비스 방향 재정립
7. 연습문제 3개`
      },
      {
        id: 8,
        question: '방콕헌장(2005)의 건강증진 전략을 설명하시오.',
        answer: '세계화 시대 건강증진, 건강 옹호, 투자, 역량강화, 규제, 파트너십',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 방콕헌장(2005)의 건강증진 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 방콕헌장의 배경 (세계화)
2. 건강 옹호(Advocacy)
3. 건강에 대한 투자
4. 역량 강화
5. 규제와 법제화
6. 연습문제 3개`
      },
      {
        id: 9,
        question: '지역사회보건사업의 원칙을 설명하시오.',
        answer: '요구 기반, 주민 참여, 형평성, 협력, 지속가능성',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회보건사업의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회 요구 기반 원칙
2. 주민 참여 원칙
3. 형평성 원칙
4. 다부문 협력 원칙
5. 지속가능성 원칙
6. 연습문제 3개`
      },
      {
        id: 10,
        question: '건강도시(Healthy City) 프로젝트의 개념과 특성을 설명하시오.',
        answer: 'WHO 주도, 도시 환경을 통한 건강증진, 다부문 협력, 주민 참여',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강도시(Healthy City) 프로젝트의 개념과 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 건강도시의 정의
2. 건강도시 프로젝트의 역사
3. 건강도시의 특성
4. 한국의 건강도시 현황
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'assessment',
    name: '지역사회 진단과 사정',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 11,
        question: '지역사회 건강사정(Community Health Assessment)의 목적과 과정을 설명하시오.',
        answer: '지역사회 건강문제 파악, 자원 확인, 우선순위 결정을 위한 체계적 조사',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강사정(Community Health Assessment)의 목적과 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회 건강사정의 정의
2. 건강사정의 목적
3. 사정 과정의 단계
4. 자료수집 방법
5. 연습문제 3개`
      },
      {
        id: 12,
        question: '지역사회 건강지표의 유형을 설명하시오.',
        answer: '인구학적, 건강수준(사망률/이환율), 건강결정요인, 자원/서비스 지표',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강지표의 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 인구학적 지표
2. 건강수준 지표 (사망률, 이환율)
3. 건강결정요인 지표
4. 자원 및 서비스 지표
5. 연습문제 3개`
      },
      {
        id: 13,
        question: '주요 사망지표(조사망률, 영아사망률, 모성사망비)를 설명하시오.',
        answer: '조사망률: 인구 1,000명당, 영아사망률: 출생 1,000명당, 모성사망비: 출생 100,000명당',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 주요 사망지표(조사망률, 영아사망률, 모성사망비)를 설명하시오.

다음 순서로 설명해주세요:
1. 조사망률(Crude Death Rate)
2. 영아사망률(Infant Mortality Rate)
3. 모성사망비(Maternal Mortality Ratio)
4. 각 지표의 의미와 활용
5. 연습문제 3개`
      },
      {
        id: 14,
        question: '주요 이환지표(유병률, 발생률)를 설명하시오.',
        answer: '유병률: 특정 시점의 환자 비율, 발생률: 특정 기간 신규 환자 비율',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 주요 이환지표(유병률, 발생률)를 설명하시오.

다음 순서로 설명해주세요:
1. 유병률(Prevalence)의 정의와 계산
2. 발생률(Incidence)의 정의와 계산
3. 유병률과 발생률의 관계
4. 각 지표의 활용
5. 연습문제 3개`
      },
      {
        id: 15,
        question: '지역사회 자료수집 방법(양적/질적)을 설명하시오.',
        answer: '양적: 설문조사, 통계자료 / 질적: 면접, 포커스그룹, 관찰',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 자료수집 방법(양적/질적)을 설명하시오.

다음 순서로 설명해주세요:
1. 양적 자료수집 방법
2. 질적 자료수집 방법
3. 1차 자료 vs 2차 자료
4. 자료수집 시 고려사항
5. 연습문제 3개`
      },
      {
        id: 16,
        question: '지역사회 진단 모형 중 PRECEDE 모형의 진단 과정을 설명하시오.',
        answer: '사회진단→역학진단→행동환경진단→교육조직진단→행정정책진단',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 진단 모형 중 PRECEDE 모형의 진단 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 사회적 진단 (Social Diagnosis)
2. 역학적 진단 (Epidemiological Diagnosis)
3. 행동환경 진단 (Behavioral & Environmental)
4. 교육조직 진단 (Educational & Organizational)
5. 행정정책 진단 (Administrative & Policy)
6. 연습문제 3개`
      },
      {
        id: 17,
        question: '건강문제 우선순위 결정 방법을 설명하시오.',
        answer: 'BPRS, PEARL, Hanlon 방법 등 다기준 의사결정',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강문제 우선순위 결정 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 우선순위 결정의 필요성
2. BPRS 방법 (크기, 심각성, 효과성, 적정성)
3. PEARL 기준
4. Hanlon 방법
5. 연습문제 3개`
      },
      {
        id: 18,
        question: '지역사회 자원(resources)의 유형과 파악 방법을 설명하시오.',
        answer: '인적, 물적, 조직적, 재정적 자원, 자원목록 작성과 매핑',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 자원(resources)의 유형과 파악 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회 자원의 유형
2. 인적 자원
3. 물적/조직적 자원
4. 자원 파악 방법 (매핑)
5. 연습문제 3개`
      },
      {
        id: 19,
        question: 'SWOT 분석의 개념과 지역사회보건 적용을 설명하시오.',
        answer: '강점, 약점, 기회, 위협 분석을 통한 전략 수립',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: SWOT 분석의 개념과 지역사회보건 적용을 설명하시오.

다음 순서로 설명해주세요:
1. SWOT 분석의 정의
2. 강점(S)과 약점(W) 분석
3. 기회(O)와 위협(T) 분석
4. 지역사회보건사업 기획에의 적용
5. 연습문제 3개`
      },
      {
        id: 20,
        question: '지역사회 건강프로파일(Community Health Profile)의 구성요소를 설명하시오.',
        answer: '인구특성, 건강수준, 건강결정요인, 보건의료자원, 주민 의견',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강프로파일(Community Health Profile)의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 건강프로파일의 정의와 목적
2. 인구학적 특성
3. 건강수준 및 결정요인
4. 보건의료자원 현황
5. 주민 건강요구
6. 연습문제 3개`
      },
    ],
  },
  {
    id: 'planning',
    name: '건강증진사업 기획과 실행',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 21,
        question: '지역사회 건강증진사업 기획의 단계를 설명하시오.',
        answer: '상황분석→목표설정→전략개발→실행계획→평가계획',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강증진사업 기획의 단계를 설명하시오.

다음 순서로 설명해주세요:
1. 상황분석 및 요구도 조사
2. 목표 설정 (SMART)
3. 전략 개발
4. 실행계획 수립
5. 평가계획 수립
6. 연습문제 3개`
      },
      {
        id: 22,
        question: '건강증진사업의 목표 설정 방법(SMART)을 설명하시오.',
        answer: 'Specific, Measurable, Achievable, Relevant, Time-bound',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업의 목표 설정 방법(SMART)을 설명하시오.

다음 순서로 설명해주세요:
1. SMART 원칙의 의미
2. 구체적(Specific) 목표
3. 측정가능(Measurable) 목표
4. 달성가능(Achievable) 목표
5. 관련성(Relevant)과 기한(Time-bound)
6. 연습문제 3개`
      },
      {
        id: 23,
        question: '건강증진사업의 전략 유형(개인/환경/정책)을 설명하시오.',
        answer: '개인수준: 교육/상담, 환경수준: 물리적/사회적 환경, 정책수준: 법/규제',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업의 전략 유형(개인/환경/정책)을 설명하시오.

다음 순서로 설명해주세요:
1. 개인수준 전략
2. 환경수준 전략
3. 정책수준 전략
4. 다수준 접근의 필요성
5. 연습문제 3개`
      },
      {
        id: 24,
        question: '지역사회 건강증진사업의 대상자 선정 방법을 설명하시오.',
        answer: '인구집단 접근 vs 고위험군 접근, 대상자 세분화',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강증진사업의 대상자 선정 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 인구집단 접근(Population Approach)
2. 고위험군 접근(High-risk Approach)
3. 두 접근의 장단점 비교
4. 대상자 세분화 전략
5. 연습문제 3개`
      },
      {
        id: 25,
        question: '지역사회 참여(Community Participation)의 단계와 방법을 설명하시오.',
        answer: '정보제공→협의→참여→파트너십→주민주도',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 참여(Community Participation)의 단계와 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회 참여의 정의와 중요성
2. 참여의 단계 (사다리 모형)
3. 참여 촉진 방법
4. 참여의 장애요인과 극복
5. 연습문제 3개`
      },
      {
        id: 26,
        question: '지역사회 역량강화(Community Empowerment)의 개념과 전략을 설명하시오.',
        answer: '지역사회가 스스로 건강문제를 해결하는 능력 개발',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 역량강화(Community Empowerment)의 개념과 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 역량강화의 정의
2. 개인/조직/지역사회 수준 역량
3. 역량강화 전략
4. 역량강화 평가
5. 연습문제 3개`
      },
      {
        id: 27,
        question: '건강증진사업의 파트너십 구축 방법을 설명하시오.',
        answer: '이해관계자 분석, 협력 체계 구축, 역할 분담, 의사소통',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업의 파트너십 구축 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 파트너십의 정의와 필요성
2. 이해관계자(Stakeholder) 분석
3. 협력 체계 구축 단계
4. 효과적인 파트너십 유지
5. 연습문제 3개`
      },
      {
        id: 28,
        question: '지역사회 건강증진사업의 예산 편성 방법을 설명하시오.',
        answer: '항목별 예산, 직접비/간접비, 비용-효과 분석',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회 건강증진사업의 예산 편성 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 예산 편성의 원칙
2. 예산 항목 구성
3. 직접비와 간접비
4. 비용-효과 분석
5. 연습문제 3개`
      },
      {
        id: 29,
        question: '사업 실행 시 모니터링의 목적과 방법을 설명하시오.',
        answer: '사업 진행 점검, 문제 조기 발견, 질 관리',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 사업 실행 시 모니터링의 목적과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 모니터링의 정의와 목적
2. 모니터링 지표 설정
3. 자료수집 방법
4. 모니터링 결과 활용
5. 연습문제 3개`
      },
      {
        id: 30,
        question: '건강증진사업의 지속가능성 확보 방안을 설명하시오.',
        answer: '제도화, 역량강화, 자원확보, 네트워크 구축',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업의 지속가능성 확보 방안을 설명하시오.

다음 순서로 설명해주세요:
1. 지속가능성의 개념
2. 제도화 전략
3. 지역사회 역량강화
4. 재원 확보 방안
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'program',
    name: '주요 건강증진사업',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 31,
        question: '국민건강증진종합계획(Health Plan)의 목표와 주요 영역을 설명하시오.',
        answer: '건강수명 연장, 건강형평성 제고, 6대 분야 중점과제',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 국민건강증진종합계획(Health Plan)의 목표와 주요 영역을 설명하시오.

다음 순서로 설명해주세요:
1. 국민건강증진종합계획의 법적 근거
2. 비전과 총괄 목표
3. 6대 분야와 중점과제
4. 계획 수립 과정
5. 연습문제 3개`
      },
      {
        id: 32,
        question: '금연 건강증진사업의 전략과 프로그램을 설명하시오.',
        answer: '금연정책(가격/규제), 금연교육, 금연클리닉, 금연상담전화',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 금연 건강증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 흡연의 건강 영향
2. 금연정책 (담배가격, 금연구역)
3. 금연클리닉 운영
4. 금연상담전화(1544-9030)
5. 연습문제 3개`
      },
      {
        id: 33,
        question: '절주 건강증진사업의 전략과 프로그램을 설명하시오.',
        answer: '절주문화 조성, 고위험음주자 관리, 알코올 정책',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 절주 건강증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 음주의 건강 영향
2. 고위험 음주 기준
3. 절주 교육 및 캠페인
4. 알코올 정책 (광고규제, 가격)
5. 연습문제 3개`
      },
      {
        id: 34,
        question: '신체활동 건강증진사업의 전략과 프로그램을 설명하시오.',
        answer: '신체활동 권장지침, 운동 프로그램, 물리적 환경 조성',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 신체활동 건강증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 신체활동의 건강 효과
2. 한국인을 위한 신체활동 지침
3. 지역사회 운동 프로그램
4. 걷기 좋은 환경 조성
5. 연습문제 3개`
      },
      {
        id: 35,
        question: '영양 건강증진사업의 전략과 프로그램을 설명하시오.',
        answer: '영양교육, 영양표시, 나트륨 저감화, 취약계층 영양지원',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 영양 건강증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 영양과 건강의 관계
2. 영양교육 프로그램
3. 영양표시제도
4. 나트륨 줄이기 사업
5. 연습문제 3개`
      },
      {
        id: 36,
        question: '비만예방 건강증진사업의 전략을 설명하시오.',
        answer: '건강체중 관리, 식생활+신체활동 통합 접근, 환경 조성',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 비만예방 건강증진사업의 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 비만의 건강 영향
2. 비만 현황과 추이
3. 개인수준 중재 (식이, 운동)
4. 환경/정책 수준 접근
5. 연습문제 3개`
      },
      {
        id: 37,
        question: '정신건강 증진사업의 전략과 프로그램을 설명하시오.',
        answer: '정신건강 인식 개선, 스트레스 관리, 자살예방, 정신건강복지센터',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 정신건강 증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 정신건강의 중요성
2. 정신건강복지센터 기능
3. 스트레스 관리 프로그램
4. 자살예방사업
5. 연습문제 3개`
      },
      {
        id: 38,
        question: '구강건강 증진사업의 전략과 프로그램을 설명하시오.',
        answer: '구강보건교육, 불소도포/실란트, 수돗물 불소화, 취약계층 사업',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 구강건강 증진사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 구강건강과 전신건강의 관계
2. 구강보건교육 내용
3. 예방서비스 (불소, 실란트)
4. 취약계층 구강보건사업
5. 연습문제 3개`
      },
      {
        id: 39,
        question: '만성질환 관리사업의 전략과 프로그램을 설명하시오.',
        answer: '예방-조기발견-관리의 연속체, 고혈압/당뇨 등록관리',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 만성질환 관리사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 만성질환의 부담
2. 만성질환 예방 전략
3. 고혈압/당뇨 등록관리사업
4. 만성질환 자기관리 지원
5. 연습문제 3개`
      },
      {
        id: 40,
        question: '감염병 예방사업의 전략과 프로그램을 설명하시오.',
        answer: '예방접종, 감시체계, 역학조사, 감염관리',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 감염병 예방사업의 전략과 프로그램을 설명하시오.

다음 순서로 설명해주세요:
1. 감염병의 역학적 특성
2. 예방접종사업
3. 감염병 감시체계
4. 감염병 대응 및 관리
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'evaluation',
    name: '사업 평가와 보건정책',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 41,
        question: '건강증진사업 평가의 유형(과정/영향/결과평가)을 설명하시오.',
        answer: '과정: 사업운영, 영향: 중간성과, 결과: 최종성과 평가',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업 평가의 유형(과정/영향/결과평가)을 설명하시오.

다음 순서로 설명해주세요:
1. 과정평가(Process Evaluation)
2. 영향평가(Impact Evaluation)
3. 결과평가(Outcome Evaluation)
4. 평가 지표 설정
5. 연습문제 3개`
      },
      {
        id: 42,
        question: 'RE-AIM 평가 프레임워크를 설명하시오.',
        answer: 'Reach(도달), Effectiveness(효과), Adoption(채택), Implementation(실행), Maintenance(유지)',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: RE-AIM 평가 프레임워크를 설명하시오.

다음 순서로 설명해주세요:
1. RE-AIM의 개요
2. Reach (도달/참여)
3. Effectiveness (효과성)
4. Adoption (채택)
5. Implementation (실행)
6. Maintenance (유지)
7. 연습문제 3개`
      },
      {
        id: 43,
        question: '건강증진사업의 비용-효과 분석 방법을 설명하시오.',
        answer: 'CEA(비용-효과분석), CBA(비용-편익분석), CUA(비용-효용분석)',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진사업의 비용-효과 분석 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 경제성 평가의 필요성
2. 비용-효과분석(CEA)
3. 비용-편익분석(CBA)
4. 비용-효용분석(CUA)
5. 연습문제 3개`
      },
      {
        id: 44,
        question: '보건의료체계의 구성요소를 설명하시오.',
        answer: '자원(인력/시설/재원), 조직, 관리, 서비스 제공, 재정',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 보건의료체계의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 보건의료체계의 정의
2. 보건의료자원
3. 보건의료조직
4. 보건의료서비스 제공
5. 보건의료재정
6. 연습문제 3개`
      },
      {
        id: 45,
        question: '보건소의 기능과 건강증진사업을 설명하시오.',
        answer: '기본 보건의료, 건강증진, 질병예방, 지역사회 건강관리',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 보건소의 기능과 건강증진사업을 설명하시오.

다음 순서로 설명해주세요:
1. 보건소의 법적 근거
2. 보건소의 주요 기능
3. 건강증진 관련 업무
4. 지역보건의료계획
5. 연습문제 3개`
      },
      {
        id: 46,
        question: '국민건강보험제도의 특성과 건강증진 기능을 설명하시오.',
        answer: '사회보험 방식, 전국민 의료보장, 건강검진, 건강증진기금',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 국민건강보험제도의 특성과 건강증진 기능을 설명하시오.

다음 순서로 설명해주세요:
1. 국민건강보험의 특성
2. 건강검진사업
3. 건강증진기금
4. 예방서비스 급여
5. 연습문제 3개`
      },
      {
        id: 47,
        question: '건강영향평가(Health Impact Assessment)의 개념과 절차를 설명하시오.',
        answer: '정책/사업의 건강 영향 사전 평가, 스크리닝-범위설정-평가-권고-모니터링',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강영향평가(Health Impact Assessment)의 개념과 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 건강영향평가의 정의
2. HIA의 목적과 원칙
3. HIA 수행 단계
4. 한국의 HIA 제도
5. 연습문제 3개`
      },
      {
        id: 48,
        question: '모든 정책에서의 건강(Health in All Policies)의 개념을 설명하시오.',
        answer: '모든 부문의 정책에서 건강을 고려하는 접근법',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 모든 정책에서의 건강(Health in All Policies)의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. HiAP의 정의와 배경
2. 다부문 협력의 필요성
3. HiAP 실행 전략
4. HiAP 사례
5. 연습문제 3개`
      },
      {
        id: 49,
        question: '건강증진 관련 법률(국민건강증진법 등)의 주요 내용을 설명하시오.',
        answer: '국민건강증진법, 지역보건법, 건강증진기금 조성 및 운용',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 건강증진 관련 법률(국민건강증진법 등)의 주요 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 국민건강증진법의 목적
2. 주요 규정 (금연, 절주, 영양 등)
3. 건강증진기금
4. 지역보건법
5. 연습문제 3개`
      },
      {
        id: 50,
        question: '지역사회보건사업의 윤리적 고려사항을 설명하시오.',
        answer: '자율성 존중, 공익과 개인권리 균형, 형평성, 투명성',
        prompt: `보건교육사 2급 지역사회보건 문제입니다.

문제: 지역사회보건사업의 윤리적 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 공중보건윤리의 원칙
2. 개인 자율성과 공익의 균형
3. 건강형평성과 사회정의
4. 투명성과 책무성
5. 연습문제 3개`
      },
    ],
  },
];

export default function CommunityHealthStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-2-community-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-2-community-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-orange-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-orange-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">지역사회보건</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🏘️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">지역사회보건 학습</h1>
                <p className="text-orange-100">보건교육사 2급 필기 4과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-orange-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <a
                                  href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  🧡 Claude
                                </a>
                                <a
                                  href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  💚 ChatGPT
                                </a>
                                <a
                                  href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  💙 Gemini
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
