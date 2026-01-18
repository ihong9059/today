'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'ea',
    name: 'EA/ISP',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'EA(Enterprise Architecture)의 정의와 목적을 설명하시오.', answer: '기업 전체 구조 표준화, 비즈니스-IT 정렬, 중복 제거, 상호운용성', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: EA(Enterprise Architecture)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'TOGAF의 ADM(Architecture Development Method) 단계를 설명하시오.', answer: '예비, 비전, 비즈니스/정보시스템/기술 아키텍처, 기회/솔루션, 이행계획, 구현거버넌스, 변경관리', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: TOGAF의 ADM(Architecture Development Method) 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Zachman Framework의 구조를 설명하시오.', answer: '6x6 매트릭스, 관점(플래너~사용자) x 초점(What/How/Where/Who/When/Why)', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: Zachman Framework의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ISP(Information Strategy Planning)의 절차를 설명하시오.', answer: '환경분석, 현황분석, 미래모델정의, 이행계획수립, 산출물작성', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: ISP(Information Strategy Planning)의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'EA의 4가지 아키텍처 영역을 설명하시오.', answer: '비즈니스(업무), 데이터(정보), 애플리케이션(응용), 기술(인프라)', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: EA의 4가지 아키텍처 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'BPR(Business Process Reengineering)의 원칙을 설명하시오.', answer: '프로세스 중심, 급진적 재설계, IT 활용, 고객 가치 중심', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: BPR(Business Process Reengineering)의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'IT 거버넌스의 정의와 프레임워크를 설명하시오.', answer: 'IT 의사결정 체계, COBIT, Val IT, Risk IT', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 거버넌스의 정의와 프레임워크를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'COBIT 2019의 구성요소를 설명하시오.', answer: '거버넌스/관리 목표, 컴포넌트, 설계 요소, 성과 관리', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: COBIT 2019의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'IT-비즈니스 정렬(Alignment)의 전략을 설명하시오.', answer: 'Henderson-Venkatraman 모델, 전략적 정렬 4가지 관점', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT-비즈니스 정렬(Alignment)의 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '정보화 성숙도 모델(CMM/CMMI)을 설명하시오.', answer: '5단계 성숙도(초기→관리→정의→정량→최적화), 프로세스 개선', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 정보화 성숙도 모델(CMM/CMMI)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'digital-transform',
    name: '디지털 전환',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '디지털 트랜스포메이션(DX)의 정의와 핵심 요소를 설명하시오.', answer: '디지털 기술로 비즈니스 모델/프로세스/문화 변혁, SMAC+AI', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 디지털 트랜스포메이션(DX)의 정의와 핵심 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '디지털 비즈니스 모델의 유형을 설명하시오.', answer: '플랫폼, 구독, 프리미엄, 공유경제, 온디맨드', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 디지털 비즈니스 모델의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '데이터 기반 의사결정(Data-Driven Decision)을 설명하시오.', answer: '데이터 수집/분석/시각화, BI/BA, 실시간 대시보드', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 데이터 기반 의사결정(Data-Driven Decision)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'API 경제(API Economy)의 개념을 설명하시오.', answer: 'API를 통한 비즈니스 가치 창출, 오픈 API, API 마켓플레이스', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: API 경제(API Economy)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '클라우드 전환 전략(Migration Strategy)을 설명하시오.', answer: '6R(Rehost, Replatform, Repurchase, Refactor, Retain, Retire)', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 클라우드 전환 전략(Migration Strategy)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '레거시 시스템 현대화 전략을 설명하시오.', answer: '유지/래핑/재개발/교체, 스트랭글러 패턴, 마이크로서비스 전환', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 레거시 시스템 현대화 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '디지털 성숙도 평가 모델을 설명하시오.', answer: 'MIT-Deloitte 모델, 초기→개발→성숙, 디지털 역량 평가', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 디지털 성숙도 평가 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '로우코드/노코드 플랫폼의 장단점을 설명하시오.', answer: '빠른 개발, 시민 개발자, 제한된 커스터마이징, 벤더 종속', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 로우코드/노코드 플랫폼의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'RPA(Robotic Process Automation)의 적용 전략을 설명하시오.', answer: '반복 업무 자동화, 규칙 기반, 구조화된 데이터, 도입 효과', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: RPA(Robotic Process Automation)의 적용 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '디지털 전환의 변화관리(Change Management)를 설명하시오.', answer: '이해관계자 참여, 교육/훈련, 저항 관리, 문화 변화', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 디지털 전환의 변화관리(Change Management)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'it-economics',
    name: 'IT 경제성',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: 'IT 투자 타당성 분석 방법을 설명하시오.', answer: 'ROI, NPV, IRR, Payback Period, TCO, CFTF', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 투자 타당성 분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'TCO(Total Cost of Ownership)의 구성요소를 설명하시오.', answer: '직접비(HW/SW/인건비), 간접비(교육/유지보수/다운타임)', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: TCO(Total Cost of Ownership)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'IT 포트폴리오 관리의 개념을 설명하시오.', answer: 'IT 투자 최적화, 위험-수익 균형, 전략적 정렬, 자원 배분', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 포트폴리오 관리의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'IT BSC(Balanced Scorecard)의 4가지 관점을 설명하시오.', answer: '재무, 고객, 내부프로세스, 학습성장 관점', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT BSC(Balanced Scorecard)의 4가지 관점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'IT 서비스 관리(ITSM)의 목적을 설명하시오.', answer: 'IT 서비스 품질 향상, 비즈니스 가치 제공, ITIL 프레임워크', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 서비스 관리(ITSM)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'ITIL 4의 서비스 가치 시스템(SVS)을 설명하시오.', answer: '거버넌스, 서비스 가치 체인, 실천, 원칙, 지속 개선', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: ITIL 4의 서비스 가치 시스템(SVS)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SLA(Service Level Agreement)의 구성요소를 설명하시오.', answer: '서비스 정의, 성능 지표, 가용성, 응답시간, 벌칙조항', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: SLA(Service Level Agreement)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'IT 아웃소싱 전략을 설명하시오.', answer: '완전/선택적/코소싱, 비용절감/핵심역량 집중, 위험/통제 이슈', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 아웃소싱 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'FinOps의 개념과 원칙을 설명하시오.', answer: '클라우드 재무 관리, 비용 최적화, 엔지니어링-재무-비즈니스 협업', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: FinOps의 개념과 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'IT 벤치마킹의 방법론을 설명하시오.', answer: '내부/경쟁/기능/일반 벤치마킹, 갭 분석, 개선 도출', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: IT 벤치마킹의 방법론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'compliance',
    name: 'IT 법규/컴플라이언스',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '개인정보보호법의 주요 내용을 설명하시오.', answer: '개인정보 수집/이용/제공 원칙, 정보주체 권리, 안전조치 의무', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 개인정보보호법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'GDPR의 핵심 원칙을 설명하시오.', answer: '합법성/투명성, 목적제한, 최소수집, 정확성, 보관제한, 무결성/기밀성', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: GDPR의 핵심 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '정보통신망법의 주요 규정을 설명하시오.', answer: '정보보호, 스팸 규제, 침해사고 대응, 개인정보 보호', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 정보통신망법의 주요 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '전자정부법과 정보화 사업 추진 절차를 설명하시오.', answer: '사업 기획/예산/발주/수행/감리/운영, EA 기반 정보화', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 전자정부법과 정보화 사업 추진 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'ISMS-P 인증의 요구사항을 설명하시오.', answer: '관리체계 수립/운영, 보호대책 요구사항, 개인정보처리 단계별 요구사항', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: ISMS-P 인증의 요구사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'SW산업 진흥법의 주요 내용을 설명하시오.', answer: 'SW사업 분리발주, 하도급 제한, 기술성 평가, 대가 기준', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: SW산업 진흥법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '클라우드컴퓨팅법의 규정을 설명하시오.', answer: '클라우드 발전 기반, 신뢰성 확보, 보안인증, 국외이전 규정', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 클라우드컴퓨팅법의 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '데이터 3법 개정의 핵심 내용을 설명하시오.', answer: '가명정보 도입, 데이터 결합, 마이데이터, 개인정보위원회', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 데이터 3법 개정의 핵심 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'AI 윤리 원칙과 규제 동향을 설명하시오.', answer: '투명성, 공정성, 책임성, 안전성, EU AI Act, 국내 가이드라인', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: AI 윤리 원칙과 규제 동향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '정보시스템 감리의 절차를 설명하시오.', answer: '착수/조사/분석/종료, 감리원 자격, 감리보고서, 시정조치', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 정보시스템 감리의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'security-strategy',
    name: '정보보안 전략',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '정보보안 거버넌스의 구성요소를 설명하시오.', answer: '전략적 정렬, 가치 전달, 위험 관리, 자원 관리, 성과 측정', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 정보보안 거버넌스의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'ISO 27001의 PDCA 사이클을 설명하시오.', answer: 'Plan(계획)-Do(실행)-Check(점검)-Act(조치), 지속적 개선', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: ISO 27001의 PDCA 사이클을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '정보보안 위험 관리 프로세스를 설명하시오.', answer: '자산식별, 위협분석, 취약점분석, 위험평가, 대응전략', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 정보보안 위험 관리 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Zero Trust 보안 모델의 원칙을 설명하시오.', answer: '신뢰하지 말고 검증, 최소 권한, 마이크로 세그멘테이션', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: Zero Trust 보안 모델의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '개인정보영향평가(PIA)의 절차를 설명하시오.', answer: '사전분석, 영향분석, 개선계획, 이행점검, 보고', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 개인정보영향평가(PIA)의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'BCP(Business Continuity Planning)의 수립 절차를 설명하시오.', answer: '범위정의, BIA, 전략수립, 계획개발, 테스트, 유지관리', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: BCP(Business Continuity Planning)의 수립 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'DR(Disaster Recovery) 전략의 유형을 설명하시오.', answer: 'Hot/Warm/Cold Site, Active-Active/Standby, RTO/RPO 기반', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: DR(Disaster Recovery) 전략의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'CSPM/CWPP의 개념을 설명하시오.', answer: 'CSPM: 클라우드 보안 형상 관리, CWPP: 워크로드 보호 플랫폼', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: CSPM/CWPP의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'DevSecOps의 개념과 도구를 설명하시오.', answer: '개발-보안-운영 통합, SAST/DAST/SCA, 시프트 레프트', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: DevSecOps의 개념과 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '보안 투자 효과 측정 방법을 설명하시오.', answer: 'ROSI, ALE, 정성적/정량적 평가, 보안 성숙도', prompt: `정보관리기술사 정보전략계획 문제입니다.\n\n문제: 보안 투자 효과 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function InformationStrategyPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['ea']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-mgmt-pro-information-strategy-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-mgmt-pro-information-strategy-progress', JSON.stringify(completedQuestions));
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
            <span className="text-purple-600 font-medium">정보전략계획</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보전략계획</h1>
              <p className="text-purple-100">정보관리기술사 - EA/ISP, 디지털전환, IT경제성, 컴플라이언스</p>
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
