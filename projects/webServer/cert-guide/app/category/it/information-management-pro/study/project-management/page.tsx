'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'pmbok',
    name: 'PMBOK 지식영역',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'PMBOK 7판의 주요 변경사항을 설명하시오.', answer: '프로세스→원칙 중심, 12원칙, 8성과영역, 테일러링 강조', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: PMBOK 7판의 주요 변경사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '프로젝트 통합관리의 프로세스를 설명하시오.', answer: '헌장개발, 계획개발, 실행지휘/관리, 지식관리, 변경통제, 종료', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 프로젝트 통합관리의 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '범위관리의 WBS(Work Breakdown Structure) 작성 원칙을 설명하시오.', answer: '100% 규칙, 상호배타성, 성과물 중심, 적절한 분해 수준', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 범위관리의 WBS(Work Breakdown Structure) 작성 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '일정관리의 CPM(Critical Path Method)을 설명하시오.', answer: '최장 경로, 여유시간 0, ES/EF/LS/LF 계산, 일정 단축', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 일정관리의 CPM(Critical Path Method)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '원가관리의 EVM(Earned Value Management)을 설명하시오.', answer: 'PV/EV/AC, CPI/SPI, CV/SV, EAC/ETC 계산', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 원가관리의 EVM(Earned Value Management)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '품질관리의 7가지 기본 도구를 설명하시오.', answer: '파레토, 히스토그램, 특성요인도, 체크시트, 산점도, 관리도, 흐름도', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 품질관리의 7가지 기본 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '자원관리의 RACI 매트릭스를 설명하시오.', answer: 'Responsible, Accountable, Consulted, Informed 역할 정의', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 자원관리의 RACI 매트릭스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '위험관리의 정성적/정량적 분석을 비교하시오.', answer: '정성적: 확률-영향 매트릭스, 정량적: 몬테카를로/민감도/EMV', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 위험관리의 정성적/정량적 분석을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '조달관리의 계약 유형을 설명하시오.', answer: '고정가(FFP/FPIF), 실비정산(CPFF/CPIF/CPAF), T&M', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 조달관리의 계약 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '이해관계자 관리의 영향력/관심도 매트릭스를 설명하시오.', answer: '4분면 분류, 긴밀관리/만족유지/정보제공/모니터링 전략', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 이해관계자 관리의 영향력/관심도 매트릭스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'agile',
    name: '애자일 방법론',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '애자일 선언문의 4가지 가치를 설명하시오.', answer: '개인과 상호작용, 작동SW, 고객협력, 변화대응 > 프로세스/도구/문서/계약/계획', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 애자일 선언문의 4가지 가치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '스크럼(Scrum)의 역할, 이벤트, 산출물을 설명하시오.', answer: 'PO/SM/팀, 스프린트/계획/데일리/리뷰/회고, 백로그/증분', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 스크럼(Scrum)의 역할, 이벤트, 산출물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '칸반(Kanban)의 핵심 원칙을 설명하시오.', answer: '시각화, WIP 제한, 흐름 관리, 명시적 정책, 피드백 루프, 개선', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 칸반(Kanban)의 핵심 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'XP(eXtreme Programming)의 실천법을 설명하시오.', answer: '페어프로그래밍, TDD, 지속적 통합, 리팩토링, 작은 릴리즈', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: XP(eXtreme Programming)의 실천법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'SAFe(Scaled Agile Framework)의 구조를 설명하시오.', answer: '팀/프로그램/대규모솔루션/포트폴리오 레벨, ART, PI Planning', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: SAFe(Scaled Agile Framework)의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '스프린트 플래닝과 백로그 관리를 설명하시오.', answer: '제품/스프린트 백로그, 스토리 포인트, 속도, 번다운 차트', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 스프린트 플래닝과 백로그 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '사용자 스토리 작성법을 설명하시오.', answer: 'As a [역할], I want [기능], So that [이유], INVEST 원칙', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 사용자 스토리 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '애자일 추정 기법(Planning Poker, T-shirt)을 설명하시오.', answer: '상대적 크기 추정, 피보나치 수열, 팀 합의, 빠른 추정', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 애자일 추정 기법(Planning Poker, T-shirt)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '애자일과 워터폴의 하이브리드 접근법을 설명하시오.', answer: '단계별 게이트 + 반복 개발, Water-Scrum-Fall, 선택적 적용', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 애자일과 워터폴의 하이브리드 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Definition of Done(DoD)의 중요성을 설명하시오.', answer: '완료 기준 명확화, 품질 보증, 팀 합의, 인수 조건', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: Definition of Done(DoD)의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps/CI-CD',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: 'DevOps의 CALMS 프레임워크를 설명하시오.', answer: 'Culture, Automation, Lean, Measurement, Sharing', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: DevOps의 CALMS 프레임워크를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'CI/CD 파이프라인의 구성요소를 설명하시오.', answer: '소스관리, 빌드, 테스트, 배포, 모니터링 단계 자동화', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: CI/CD 파이프라인의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'GitOps의 개념과 원칙을 설명하시오.', answer: 'Git을 단일 진실 소스, 선언적 구성, 자동 동기화, 풀 기반', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: GitOps의 개념과 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'IaC(Infrastructure as Code)의 장점을 설명하시오.', answer: '버전관리, 재현성, 자동화, 일관성, Terraform/Ansible/CloudFormation', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: IaC(Infrastructure as Code)의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '배포 전략(Blue-Green, Canary, Rolling)을 비교하시오.', answer: 'B-G: 전체 전환, Canary: 점진적, Rolling: 순차적 교체', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 배포 전략(Blue-Green, Canary, Rolling)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Feature Flag의 개념과 활용을 설명하시오.', answer: '기능 토글, 점진적 롤아웃, A/B 테스트, 킬 스위치', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: Feature Flag의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SRE(Site Reliability Engineering)의 핵심 개념을 설명하시오.', answer: 'SLI/SLO/SLA, 에러 버짓, 토일 제거, 자동화', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: SRE(Site Reliability Engineering)의 핵심 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Observability의 3가지 축을 설명하시오.', answer: 'Metrics, Logs, Traces / 시스템 상태 관찰 가능성', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: Observability의 3가지 축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'DORA 메트릭스의 4가지 지표를 설명하시오.', answer: '배포 빈도, 리드타임, 변경 실패율, MTTR', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: DORA 메트릭스의 4가지 지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Platform Engineering의 개념을 설명하시오.', answer: 'Internal Developer Platform, 셀프서비스, 표준화, 개발자 경험', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: Platform Engineering의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'sw-estimation',
    name: 'SW 규모/비용 산정',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'FP(Function Point) 산정 절차를 설명하시오.', answer: '기능유형 식별, 복잡도 평가, 조정계수 적용, UFP→AFP 산출', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: FP(Function Point) 산정 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'FP의 5가지 기능 유형을 설명하시오.', answer: 'ILF, EIF(데이터), EI, EO, EQ(트랜잭션)', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: FP의 5가지 기능 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'COCOMO II 모델을 설명하시오.', answer: '규모요소(KLOC), 비용승수, 척도요소, 노력/일정/비용 산출', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: COCOMO II 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'SW 사업 대가 산정 기준을 설명하시오.', answer: '기능점수 단가, 투입공수, 개발원가, 직접경비, 이윤', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: SW 사업 대가 산정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '유지보수 대가 산정 방법을 설명하시오.', answer: '기능점수 기반, 투입공수 기반, 고정비율 방식, 혼합 방식', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 유지보수 대가 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '3점 추정(PERT)의 계산 방법을 설명하시오.', answer: '기대값=(O+4M+P)/6, 표준편차=(P-O)/6, 베타분포 기반', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 3점 추정(PERT)의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '일정 단축 기법(Crashing, Fast Tracking)을 설명하시오.', answer: 'Crashing: 자원 추가/비용 증가, Fast Tracking: 병행 수행/위험 증가', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 일정 단축 기법(Crashing, Fast Tracking)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '리소스 레벨링(Resource Leveling)을 설명하시오.', answer: '자원 과부하 해소, 일정 조정, 비주요경로 활용, 평준화', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 리소스 레벨링(Resource Leveling)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Monte Carlo 시뮬레이션의 활용을 설명하시오.', answer: '확률적 일정/비용 분석, 다수 반복, 완료 확률 산출', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: Monte Carlo 시뮬레이션의 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '소프트웨어 생산성 측정 방법을 설명하시오.', answer: 'LOC/MM, FP/MM, 결함밀도, 속도(Velocity), 처리량', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 소프트웨어 생산성 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'quality',
    name: 'SW 품질관리',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'ISO 25010 소프트웨어 품질 모델을 설명하시오.', answer: '8가지 품질특성: 기능적합성, 성능효율성, 호환성, 사용성, 신뢰성, 보안성, 유지보수성, 이식성', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: ISO 25010 소프트웨어 품질 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '테스트 레벨(단위/통합/시스템/인수)을 설명하시오.', answer: '단위: 모듈, 통합: 인터페이스, 시스템: 전체, 인수: 사용자', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 테스트 레벨(단위/통합/시스템/인수)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '블랙박스/화이트박스 테스트 기법을 비교하시오.', answer: '블랙박스: 입출력 기반, 화이트박스: 코드 구조 기반', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 블랙박스/화이트박스 테스트 기법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '테스트 자동화의 피라미드를 설명하시오.', answer: '단위(70%)→통합(20%)→E2E(10%), 속도/비용/안정성 트레이드오프', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 테스트 자동화의 피라미드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'TDD(Test-Driven Development)의 사이클을 설명하시오.', answer: 'Red(실패 테스트) → Green(통과 코드) → Refactor(개선)', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: TDD(Test-Driven Development)의 사이클을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'BDD(Behavior-Driven Development)의 개념을 설명하시오.', answer: 'Given-When-Then 형식, 비즈니스 관점 테스트, Cucumber/Gherkin', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: BDD(Behavior-Driven Development)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '코드 커버리지 측정 기준을 설명하시오.', answer: '문장/분기/조건/경로 커버리지, MC/DC', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 코드 커버리지 측정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '정적 분석과 동적 분석의 차이를 설명하시오.', answer: '정적: 실행 없이 코드 분석, 동적: 실행하며 행위 분석', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 정적 분석과 동적 분석의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '성능 테스트의 유형을 설명하시오.', answer: '부하/스트레스/내구성/스파이크/확장성 테스트', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 성능 테스트의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '결함 관리 프로세스를 설명하시오.', answer: '발견→보고→분류→할당→해결→검증→종료, 결함밀도 분석', prompt: `정보관리기술사 프로젝트관리 문제입니다.\n\n문제: 결함 관리 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function ProjectManagementPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['pmbok']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-mgmt-pro-project-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-mgmt-pro-project-management-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-purple-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-purple-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-management-pro" className="text-gray-600 hover:text-purple-600">정보관리기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">프로젝트관리</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">프로젝트관리</h1>
              <p className="text-purple-100">정보관리기술사 - PMBOK, 애자일, DevOps, SW품질관리</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-purple-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-purple-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖, AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💑</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI AI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롼프트는!붍살되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롴프트 복살하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
