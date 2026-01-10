'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'methodology',
    name: '소프트웨어 개발 방법론',
    color: 'from-pink-600 to-pink-500',
    questions: [
      { id: 1, question: '소프트웨어 개발 생명주기(SDLC)의 주요 단계를 순서대로 쓰시오.', answer: '요구분석 → 설계 → 구현 → 테스트 → 유지보수', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 소프트웨어 개발 생명주기(SDLC)의 주요 단계를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '워터폴(Waterfall) 모델의 특징과 장단점을 설명하시오.', answer: '순차적 진행, 명확한 단계 구분 / 장점: 관리 용이 / 단점: 변경 대응 어려움', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 워터폴(Waterfall) 모델의 특징과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '애자일(Agile) 선언문의 4가지 핵심 가치를 쓰시오.', answer: '개인과 상호작용 > 프로세스와 도구, 작동하는 소프트웨어 > 문서, 고객 협력 > 계약 협상, 변화 대응 > 계획 따르기', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 애자일(Agile) 선언문의 4가지 핵심 가치를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '스크럼(Scrum)의 3가지 역할을 쓰고 각각의 책임을 설명하시오.', answer: 'Product Owner(백로그 관리), Scrum Master(프로세스 촉진), Development Team(개발)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 스크럼(Scrum)의 3가지 역할을 쓰고 각각의 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '스크럼에서 사용하는 이벤트(회의) 4가지를 쓰시오.', answer: '스프린트 계획, 일일 스크럼(데일리 스탠드업), 스프린트 리뷰, 스프린트 회고', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 스크럼에서 사용하는 이벤트(회의) 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '스프린트(Sprint)의 정의와 일반적인 기간을 설명하시오.', answer: '고정된 기간 동안 작동하는 소프트웨어를 개발하는 반복 주기, 보통 2-4주', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 스프린트(Sprint)의 정의와 일반적인 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'XP(eXtreme Programming)의 12가지 실천법 중 5가지를 쓰시오.', answer: '페어 프로그래밍, TDD, 지속적 통합, 리팩토링, 작은 릴리즈', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: XP(eXtreme Programming)의 12가지 실천법 중 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '페어 프로그래밍(Pair Programming)의 장점을 설명하시오.', answer: '코드 품질 향상, 지식 공유, 실시간 코드 리뷰, 버그 감소', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 페어 프로그래밍(Pair Programming)의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'TDD(Test-Driven Development)의 개발 사이클을 설명하시오.', answer: 'Red(실패하는 테스트 작성) → Green(테스트 통과 코드 작성) → Refactor(리팩토링)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: TDD(Test-Driven Development)의 개발 사이클을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '칸반(Kanban)의 핵심 원칙 3가지를 쓰시오.', answer: '작업 시각화, WIP(Work In Progress) 제한, 흐름 관리', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 칸반(Kanban)의 핵심 원칙 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '데브옵스(DevOps)의 정의와 목적을 설명하시오.', answer: '개발(Dev)과 운영(Ops)의 통합, 빠른 배포와 안정적 운영 목표', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 데브옵스(DevOps)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'CI/CD(Continuous Integration/Continuous Deployment)를 설명하시오.', answer: 'CI: 코드 통합 자동화, CD: 배포 자동화로 빠른 출시 가능', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: CI/CD(Continuous Integration/Continuous Deployment)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '프로토타입 모델의 특징과 적합한 프로젝트 유형을 설명하시오.', answer: '시제품 먼저 개발, 요구사항 불명확한 프로젝트에 적합', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 프로토타입 모델의 특징과 적합한 프로젝트 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '나선형(Spiral) 모델의 4가지 주요 활동을 쓰시오.', answer: '계획 수립, 위험 분석, 개발 및 검증, 고객 평가', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 나선형(Spiral) 모델의 4가지 주요 활동을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'RAD(Rapid Application Development)의 특징을 설명하시오.', answer: '빠른 개발, CASE 도구 활용, 사용자 참여 강조, 60-90일 내 완성 목표', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: RAD(Rapid Application Development)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '증분형(Incremental) 모델과 반복형(Iterative) 모델의 차이를 설명하시오.', answer: '증분형: 기능을 점진적 추가, 반복형: 전체 시스템을 반복 개선', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 증분형(Incremental) 모델과 반복형(Iterative) 모델의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'V-모델의 특징과 테스트 단계 매핑을 설명하시오.', answer: '개발 단계와 테스트 단계가 대응, 요구분석-인수테스트, 설계-통합테스트, 구현-단위테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: V-모델의 특징과 테스트 단계 매핑을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '린(Lean) 소프트웨어 개발의 7가지 원칙 중 4가지를 쓰시오.', answer: '낭비 제거, 품질 내재화, 지식 창출, 늦은 결정, 빠른 인도, 팀 존중, 전체 최적화', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 린(Lean) 소프트웨어 개발의 7가지 원칙 중 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '사용자 스토리(User Story)의 구성 요소와 작성법을 설명하시오.', answer: 'As a [역할], I want [기능], so that [이유] 형식으로 작성', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 사용자 스토리(User Story)의 구성 요소와 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '번다운 차트(Burndown Chart)의 용도와 구성 요소를 설명하시오.', answer: '스프린트 진행 상황 시각화, X축: 시간, Y축: 남은 작업량', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 번다운 차트(Burndown Chart)의 용도와 구성 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'project',
    name: 'IT 프로젝트 관리',
    color: 'from-rose-600 to-rose-500',
    questions: [
      { id: 1, question: 'WBS(Work Breakdown Structure)의 정의와 목적을 설명하시오.', answer: '프로젝트 작업을 계층적으로 분해한 구조, 범위 관리와 일정 산정 기초', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: WBS(Work Breakdown Structure)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '간트 차트(Gantt Chart)의 특징과 용도를 설명하시오.', answer: '막대 그래프로 일정 표시, 작업 기간과 진행 상황 시각화', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 간트 차트(Gantt Chart)의 특징과 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'PERT와 CPM의 차이점을 설명하시오.', answer: 'PERT: 확률적 시간 추정(낙관/최빈/비관), CPM: 결정적 시간 추정', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: PERT와 CPM의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '임계 경로(Critical Path)의 정의와 중요성을 설명하시오.', answer: '프로젝트 완료까지 가장 긴 경로, 일정 지연 시 전체 일정 영향', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 임계 경로(Critical Path)의 정의와 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '여유 시간(Slack/Float)의 개념을 설명하시오.', answer: '작업 지연이 허용되는 시간, 총 여유시간과 자유 여유시간', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 여유 시간(Slack/Float)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '프로젝트 위험관리 프로세스 4단계를 쓰시오.', answer: '위험 식별 → 위험 분석 → 위험 대응 계획 → 위험 모니터링/통제', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 프로젝트 위험관리 프로세스 4단계를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '위험 대응 전략 4가지를 쓰고 설명하시오.', answer: '회피(제거), 전가(보험/외주), 완화(가능성/영향 감소), 수용(감수)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 위험 대응 전략 4가지를 쓰고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'EVM(Earned Value Management)의 3가지 핵심 지표를 쓰시오.', answer: 'PV(계획 가치), EV(획득 가치), AC(실제 비용)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 'EVM(Earned Value Management)의 3가지 핵심 지표를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'CPI(Cost Performance Index)와 SPI(Schedule Performance Index)를 설명하시오.', answer: 'CPI=EV/AC (비용효율), SPI=EV/PV (일정효율), 1보다 크면 양호', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: CPI(Cost Performance Index)와 SPI(Schedule Performance Index)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'PMBOK의 5가지 프로세스 그룹을 쓰시오.', answer: '착수, 계획, 실행, 감시 및 통제, 종료', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: PMBOK의 5가지 프로세스 그룹을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'PMBOK의 10가지 지식 영역 중 5가지를 쓰시오.', answer: '범위, 일정, 비용, 품질, 자원, 의사소통, 위험, 조달, 이해관계자, 통합', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: PMBOK의 10가지 지식 영역 중 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '프로젝트 범위 관리의 주요 활동을 설명하시오.', answer: '범위 계획, 요구사항 수집, 범위 정의, WBS 작성, 범위 확인, 범위 통제', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 프로젝트 범위 관리의 주요 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '비용 산정 기법 3가지를 쓰고 설명하시오.', answer: '유사 산정(과거 유사 프로젝트), 모수 산정(수학적 모델), 상향식 산정(세부 작업 합계)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 비용 산정 기법 3가지를 쓰고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'COCOMO 모델의 3가지 유형을 쓰시오.', answer: 'Organic(단순), Semi-detached(중간), Embedded(내장형/복잡)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: COCOMO 모델의 3가지 유형을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '기능점수(Function Point) 산정 방법을 설명하시오.', answer: '소프트웨어 기능을 정량화, 입력/출력/조회/내부파일/외부파일 가중치 합산', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 기능점수(Function Point) 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '형상관리(Configuration Management)의 정의와 목적을 설명하시오.', answer: '소프트웨어 변경사항을 체계적으로 관리, 무결성과 추적성 확보', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 형상관리(Configuration Management)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '형상관리 활동 4가지를 쓰시오.', answer: '형상 식별, 형상 통제, 형상 감사, 형상 기록/보고', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 형상관리 활동 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '프로젝트 이해관계자 분석의 목적과 방법을 설명하시오.', answer: '영향력 있는 관계자 파악, 권력-관심 매트릭스 활용', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 프로젝트 이해관계자 분석의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '프로젝트 헌장(Project Charter)에 포함되는 내용을 설명하시오.', answer: '프로젝트 목적, 범위, 목표, 주요 이해관계자, PM 권한, 예산/일정 개요', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 프로젝트 헌장(Project Charter)에 포함되는 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '마일스톤(Milestone)의 정의와 활용을 설명하시오.', answer: '프로젝트의 중요한 시점이나 이벤트, 진행 상황 점검과 보고에 활용', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 마일스톤(Milestone)의 정의와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'quality',
    name: '소프트웨어 품질',
    color: 'from-fuchsia-600 to-fuchsia-500',
    questions: [
      { id: 1, question: 'ISO 25010 소프트웨어 품질 특성 8가지를 쓰시오.', answer: '기능 적합성, 성능 효율성, 호환성, 사용성, 신뢰성, 보안, 유지보수성, 이식성', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: ISO 25010 소프트웨어 품질 특성 8가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '소프트웨어 테스트의 기본 원칙 7가지 중 4가지를 쓰시오.', answer: '결함 존재 증명, 완벽한 테스트 불가, 조기 테스트, 결함 집중, 살충제 패러독스', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 소프트웨어 테스트의 기본 원칙 7가지 중 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '테스트 레벨 4단계를 순서대로 쓰시오.', answer: '단위 테스트 → 통합 테스트 → 시스템 테스트 → 인수 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 테스트 레벨 4단계를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '화이트박스 테스트와 블랙박스 테스트의 차이를 설명하시오.', answer: '화이트박스: 내부 구조 기반 테스트, 블랙박스: 기능/명세 기반 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 화이트박스 테스트와 블랙박스 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '화이트박스 테스트 기법 4가지를 쓰시오.', answer: '문장 커버리지, 분기 커버리지, 조건 커버리지, 경로 커버리지', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 화이트박스 테스트 기법 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '블랙박스 테스트 기법 5가지를 쓰시오.', answer: '동등 분할, 경계값 분석, 결정 테이블, 상태 전이, 유스케이스 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 블랙박스 테스트 기법 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '동등 분할(Equivalence Partitioning) 기법을 설명하시오.', answer: '입력값을 유사한 클래스로 분할, 각 클래스에서 대표값 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 동등 분할(Equivalence Partitioning) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '경계값 분석(Boundary Value Analysis) 기법을 설명하시오.', answer: '입력값 경계에서 오류 발생 가능성 높음, 경계값과 인접값 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 경계값 분석(Boundary Value Analysis) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '회귀 테스트(Regression Testing)의 목적을 설명하시오.', answer: '변경 후 기존 기능이 정상 동작하는지 확인, 부작용 검출', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 회귀 테스트(Regression Testing)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '알파 테스트와 베타 테스트의 차이를 설명하시오.', answer: '알파: 개발자 환경에서 사용자 테스트, 베타: 실제 환경에서 사용자 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 알파 테스트와 베타 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '정적 테스트와 동적 테스트의 차이를 설명하시오.', answer: '정적: 실행 없이 검토(리뷰, 정적분석), 동적: 실행하며 테스트', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 정적 테스트와 동적 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '코드 리뷰 기법 3가지를 쓰고 설명하시오.', answer: '인스펙션(공식적), 워크스루(작성자 주도), 피어 리뷰(동료 검토)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 코드 리뷰 기법 3가지를 쓰고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '결함 관리 프로세스 단계를 설명하시오.', answer: '결함 발견 → 결함 등록 → 결함 분석 → 결함 수정 → 결함 확인 → 결함 종료', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 결함 관리 프로세스 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'CMMI(Capability Maturity Model Integration)의 5단계를 쓰시오.', answer: 'Initial(초기) → Managed(관리) → Defined(정의) → Quantitatively Managed(정량적 관리) → Optimizing(최적화)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: CMMI(Capability Maturity Model Integration)의 5단계를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '맥케이브 순환 복잡도(Cyclomatic Complexity)를 설명하시오.', answer: 'V(G) = E - N + 2, 제어 흐름 그래프의 독립 경로 수, 테스트 케이스 수 기준', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 맥케이브 순환 복잡도(Cyclomatic Complexity)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'security',
    name: '정보보안',
    color: 'from-red-600 to-red-500',
    questions: [
      { id: 1, question: '정보보안의 3대 요소(CIA)를 설명하시오.', answer: '기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 정보보안의 3대 요소(CIA)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '대칭키 암호화와 비대칭키 암호화의 차이를 설명하시오.', answer: '대칭키: 동일한 키로 암복호화(AES, DES), 비대칭키: 공개키/개인키 쌍 사용(RSA)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 대칭키 암호화와 비대칭키 암호화의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'AES(Advanced Encryption Standard)의 특징을 설명하시오.', answer: '대칭키 블록 암호, 128/192/256비트 키 지원, DES 대체 표준', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: AES(Advanced Encryption Standard)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'RSA 알고리즘의 원리와 용도를 설명하시오.', answer: '큰 소수의 곱 인수분해 어려움 이용, 암호화/전자서명에 활용', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: RSA 알고리즘의 원리와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '해시 함수의 특징과 종류를 설명하시오.', answer: '일방향 함수, 고정 길이 출력, MD5, SHA-1, SHA-256 등', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 해시 함수의 특징과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '전자서명의 원리와 목적을 설명하시오.', answer: '개인키로 서명, 공개키로 검증, 인증/무결성/부인방지 보장', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 전자서명의 원리와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'PKI(Public Key Infrastructure)의 구성 요소를 설명하시오.', answer: 'CA(인증기관), RA(등록기관), 인증서, CRL(인증서 폐기목록)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: PKI(Public Key Infrastructure)의 구성 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'SSL/TLS의 역할과 동작 과정을 설명하시오.', answer: '전송 계층 보안, 핸드셰이크로 키 교환 후 암호화 통신', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: SSL/TLS의 역할과 동작 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '접근 제어 모델 3가지를 설명하시오.', answer: 'DAC(임의적), MAC(강제적), RBAC(역할기반)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 접근 제어 모델 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'RBAC(Role-Based Access Control)의 장점을 설명하시오.', answer: '역할 기반 권한 부여, 관리 편의성, 최소 권한 원칙 적용 용이', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: RBAC(Role-Based Access Control)의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '방화벽(Firewall)의 종류와 동작 방식을 설명하시오.', answer: '패킷 필터링, 상태 검사, 애플리케이션 게이트웨이, 차세대 방화벽', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 방화벽(Firewall)의 종류와 동작 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'IDS와 IPS의 차이를 설명하시오.', answer: 'IDS: 침입 탐지(탐지 후 알림), IPS: 침입 방지(탐지 및 차단)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: IDS와 IPS의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'VPN(Virtual Private Network)의 개념과 프로토콜을 설명하시오.', answer: '공용망에서 암호화된 터널 생성, IPSec, SSL VPN, PPTP, L2TP', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: VPN(Virtual Private Network)의 개념과 프로토콜을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'SQL Injection 공격의 원리와 방어 방법을 설명하시오.', answer: '입력값에 SQL 삽입하여 DB 조작, 파라미터 바인딩/입력값 검증으로 방어', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: SQL Injection 공격의 원리와 방어 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'XSS(Cross-Site Scripting) 공격의 유형과 방어 방법을 설명하시오.', answer: 'Stored/Reflected/DOM XSS, 출력 인코딩/입력 검증/CSP로 방어', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: XSS(Cross-Site Scripting) 공격의 유형과 방어 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: 'CSRF(Cross-Site Request Forgery) 공격을 설명하시오.', answer: '사용자 권한으로 의도하지 않은 요청 전송, CSRF 토큰/Referer 검증으로 방어', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: CSRF(Cross-Site Request Forgery) 공격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'DDoS(Distributed Denial of Service) 공격의 유형을 설명하시오.', answer: '대역폭 소진, 프로토콜 공격, 애플리케이션 공격 (SYN Flood, HTTP Flood 등)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: DDoS(Distributed Denial of Service) 공격의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '랜섬웨어(Ransomware)의 특징과 대응 방안을 설명하시오.', answer: '파일 암호화 후 금전 요구, 백업/최신 패치/보안 교육으로 예방', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 랜섬웨어(Ransomware)의 특징과 대응 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '사회공학(Social Engineering) 공격의 유형을 설명하시오.', answer: '피싱, 스피어 피싱, 프리텍스팅, 베이팅, 테일게이팅', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 사회공학(Social Engineering) 공격의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: 'APT(Advanced Persistent Threat) 공격의 특징을 설명하시오.', answer: '지능형 지속 위협, 특정 타겟 대상, 장기간 은밀하게 진행', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: APT(Advanced Persistent Threat) 공격의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 21, question: 'OWASP Top 10 중 5가지를 쓰시오.', answer: '인젝션, 취약한 인증, 민감정보 노출, XXE, 취약한 접근제어', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: OWASP Top 10 중 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 22, question: '보안 3요소 외 추가적인 보안 속성 3가지를 쓰시오.', answer: '인증(Authentication), 부인방지(Non-repudiation), 책임추적성(Accountability)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 보안 3요소 외 추가적인 보안 속성 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 23, question: '제로 트러스트(Zero Trust) 보안 모델을 설명하시오.', answer: '기본적으로 신뢰하지 않음, 항상 검증, 최소 권한 부여', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 제로 트러스트(Zero Trust) 보안 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 24, question: '멀웨어(Malware)의 종류 5가지를 쓰시오.', answer: '바이러스, 웜, 트로이목마, 스파이웨어, 랜섬웨어', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 멀웨어(Malware)의 종류 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 25, question: '개인정보 보호법의 개인정보 처리 원칙을 설명하시오.', answer: '목적 제한, 최소 수집, 정확성, 안전성, 투명성, 권리 보장', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 개인정보 보호법의 개인정보 처리 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'network',
    name: '네트워크 기초',
    color: 'from-orange-600 to-orange-500',
    questions: [
      { id: 1, question: 'OSI 7계층을 순서대로 쓰고 각 계층의 역할을 설명하시오.', answer: '물리-데이터링크-네트워크-전송-세션-표현-응용 계층', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: OSI 7계층을 순서대로 쓰고 각 계층의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'TCP/IP 4계층 모델을 설명하시오.', answer: '네트워크 액세스, 인터넷, 전송, 응용 계층', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: TCP/IP 4계층 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'TCP와 UDP의 차이점을 설명하시오.', answer: 'TCP: 연결형, 신뢰성, 순서보장 / UDP: 비연결형, 빠름, 순서 보장 안함', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: TCP와 UDP의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'TCP 3-way Handshake 과정을 설명하시오.', answer: 'SYN → SYN+ACK → ACK, 연결 설정 과정', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: TCP 3-way Handshake 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'IP 주소 클래스(A, B, C)의 범위를 쓰시오.', answer: 'A: 0-127, B: 128-191, C: 192-223 (첫 번째 옥텟 기준)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: IP 주소 클래스(A, B, C)의 범위를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '서브넷 마스크(Subnet Mask)의 역할을 설명하시오.', answer: '네트워크 부분과 호스트 부분을 구분, IP 주소 범위 결정', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 서브넷 마스크(Subnet Mask)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CIDR(Classless Inter-Domain Routing) 표기법을 설명하시오.', answer: 'IP주소/비트수 형태, 192.168.1.0/24는 네트워크 비트 24개', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: CIDR(Classless Inter-Domain Routing) 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'NAT(Network Address Translation)의 개념과 종류를 설명하시오.', answer: '사설IP↔공인IP 변환, Static NAT, Dynamic NAT, PAT', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: NAT(Network Address Translation)의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'DHCP(Dynamic Host Configuration Protocol)의 동작 과정을 설명하시오.', answer: 'Discover → Offer → Request → Acknowledge (DORA)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: DHCP(Dynamic Host Configuration Protocol)의 동작 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'DNS(Domain Name System)의 역할과 레코드 유형을 설명하시오.', answer: '도메인→IP 변환, A(IPv4), AAAA(IPv6), CNAME, MX, NS 등', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: DNS(Domain Name System)의 역할과 레코드 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'HTTP와 HTTPS의 차이를 설명하시오.', answer: 'HTTPS는 SSL/TLS로 암호화, 443 포트 사용, 보안 강화', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: HTTP와 HTTPS의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'HTTP 상태 코드의 분류를 설명하시오.', answer: '1xx: 정보, 2xx: 성공, 3xx: 리다이렉션, 4xx: 클라이언트 오류, 5xx: 서버 오류', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: HTTP 상태 코드의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '라우터(Router)와 스위치(Switch)의 차이를 설명하시오.', answer: '라우터: 3계층, IP 기반 라우팅 / 스위치: 2계층, MAC 기반 스위칭', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 라우터(Router)와 스위치(Switch)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '허브(Hub), 스위치(Switch), 라우터(Router)의 계층을 쓰시오.', answer: '허브: 1계층(물리), 스위치: 2계층(데이터링크), 라우터: 3계층(네트워크)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 허브(Hub), 스위치(Switch), 라우터(Router)의 계층을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'VLAN(Virtual LAN)의 개념과 장점을 설명하시오.', answer: '논리적 네트워크 분리, 보안 강화, 브로드캐스트 도메인 축소', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: VLAN(Virtual LAN)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '라우팅 프로토콜의 종류를 설명하시오.', answer: 'RIP(거리 벡터), OSPF(링크 상태), BGP(경로 벡터)', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 라우팅 프로토콜의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'ARP(Address Resolution Protocol)의 역할을 설명하시오.', answer: 'IP 주소를 MAC 주소로 변환', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: ARP(Address Resolution Protocol)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: 'ICMP(Internet Control Message Protocol)의 역할과 예시를 설명하시오.', answer: '네트워크 오류 보고 및 진단, ping과 traceroute에 사용', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: ICMP(Internet Control Message Protocol)의 역할과 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: 'IPv4와 IPv6의 차이점을 설명하시오.', answer: 'IPv4: 32비트, IPv6: 128비트, IPv6는 자동 설정/보안 기능 내장', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: IPv4와 IPv6의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '로드 밸런서(Load Balancer)의 역할과 알고리즘을 설명하시오.', answer: '트래픽 분산, 라운드 로빈, 최소 연결, IP 해시 등', prompt: `정보처리기사 정보시스템 구축관리 문제입니다.\n\n문제: 로드 밸런서(Load Balancer)의 역할과 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SystemManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('system-management-progress');
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
    localStorage.setItem('system-management-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-pink-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-pink-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">정보시스템 구축관리</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🏗️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">정보시스템 구축관리 학습</h1>
                <p className="text-pink-100">정보처리기사 필기 5과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-pink-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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

      {/* Content */}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
