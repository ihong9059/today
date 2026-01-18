'use client';

import { useState } from 'react';

export default function PlanningStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      name: '빅데이터의 이해',
      questions: [
        { id: 1, question: '빅데이터의 3V 특성에 해당하지 않는 것은?', answer: 'Validity (정확성) - 3V는 Volume, Velocity, Variety', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 빅데이터의 3V 특성에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 빅데이터 3V의 정의\n2. 각 V의 상세 설명 (Volume, Velocity, Variety)\n3. 확장된 4V, 5V 개념\n4. 실제 적용 예시\n5. 연습문제 3개' },
        { id: 2, question: '빅데이터 분석의 가치 창출 유형 중 "새로운 수익 모델 개발"에 해당하는 것은?', answer: '수익 창출 (Revenue Generation)', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 빅데이터 분석의 가치 창출 유형 중 "새로운 수익 모델 개발"에 해당하는 것은?\n\n다음 순서로 설명해주세요:\n1. 빅데이터 가치 창출 4가지 유형\n2. 각 유형별 상세 설명\n3. 수익 창출의 구체적 예시\n4. 기업 사례\n5. 연습문제 3개' },
        { id: 3, question: '데이터 사이언티스트에게 요구되는 역량으로 적절하지 않은 것은?', answer: 'Hard Skill만 요구됨 - Soft Skill(커뮤니케이션, 협업)도 중요', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 사이언티스트에게 요구되는 역량으로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 사이언티스트의 정의\n2. Hard Skill vs Soft Skill\n3. 필수 기술 역량 목록\n4. 커리어 패스\n5. 연습문제 3개' },
        { id: 4, question: '빅데이터 플랫폼의 구성 요소로 적절하지 않은 것은?', answer: '수동 데이터 입력 시스템 - 자동화된 수집/저장/처리가 핵심', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 빅데이터 플랫폼의 구성 요소로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 빅데이터 플랫폼 아키텍처\n2. 주요 구성 요소 (수집, 저장, 처리, 분석)\n3. Hadoop 에코시스템\n4. 클라우드 빅데이터 플랫폼\n5. 연습문제 3개' },
        { id: 5, question: '데이터 웨어하우스(DW)와 데이터 레이크(Data Lake)의 차이점 설명으로 올바른 것은?', answer: 'DW는 정형 데이터, Data Lake는 비정형 포함 원시 데이터 저장', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 웨어하우스(DW)와 데이터 레이크(Data Lake)의 차이점 설명으로 올바른 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 웨어하우스 개념과 특징\n2. 데이터 레이크 개념과 특징\n3. 상세 비교 (스키마, 처리방식, 사용자)\n4. 데이터 레이크하우스\n5. 연습문제 3개' },
        { id: 6, question: 'ETL과 ELT의 차이점에 대한 설명으로 옳은 것은?', answer: 'ETL은 변환 후 적재, ELT는 적재 후 변환', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: ETL과 ELT의 차이점에 대한 설명으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. ETL 프로세스 상세\n2. ELT 프로세스 상세\n3. 각 방식의 장단점\n4. 사용 시나리오\n5. 연습문제 3개' },
        { id: 7, question: '빅데이터 분석 방법론 중 CRISP-DM의 6단계에 해당하지 않는 것은?', answer: 'Data Collection - 6단계: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: CRISP-DM의 6단계에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. CRISP-DM 개요\n2. 6단계 상세 설명\n3. 각 단계별 주요 활동\n4. 다른 분석 방법론과 비교\n5. 연습문제 3개' },
        { id: 8, question: '분석 과제 도출 시 사용하는 하향식(Top-Down) 접근법의 특징은?', answer: '비즈니스 문제에서 출발하여 데이터 분석 방향 도출', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 과제 도출 시 사용하는 하향식(Top-Down) 접근법의 특징은?\n\n다음 순서로 설명해주세요:\n1. 하향식 접근법 정의\n2. 상향식 접근법과 비교\n3. 각 접근법의 장단점\n4. 실제 적용 사례\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분석 과제 정의',
      questions: [
        { id: 9, question: '분석 과제의 우선순위 결정 기준으로 적절하지 않은 것은?', answer: '담당자의 개인적 선호도 - 비즈니스 시급성, ROI, 기술 실현 가능성이 기준', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 과제의 우선순위 결정 기준으로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 분석 과제 우선순위 결정 요소\n2. 시급성과 난이도 매트릭스\n3. ROI 분석 방법\n4. 실제 우선순위 결정 사례\n5. 연습문제 3개' },
        { id: 10, question: 'KPI(Key Performance Indicator)에 대한 설명으로 옳은 것은?', answer: '조직의 목표 달성 여부를 측정하는 핵심 지표', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: KPI(Key Performance Indicator)에 대한 설명으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. KPI의 정의와 목적\n2. 좋은 KPI의 조건 (SMART)\n3. KPI vs KGI vs CSF\n4. 분야별 KPI 예시\n5. 연습문제 3개' },
        { id: 11, question: '분석 ROI(Return on Investment) 산정 시 고려해야 할 사항이 아닌 것은?', answer: '경쟁사 분석 비용 - 자사의 투자 대비 수익을 계산', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 ROI 산정 시 고려해야 할 사항이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. ROI의 정의와 공식\n2. 분석 프로젝트 비용 요소\n3. 분석 결과의 기대 효과\n4. ROI 산정 사례\n5. 연습문제 3개' },
        { id: 12, question: '분석 마스터 플랜 수립 시 포함되지 않는 요소는?', answer: '개발자 인사평가 기준 - 분석 과제, 일정, 조직, 인프라 계획이 포함', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 마스터 플랜 수립 시 포함되지 않는 요소는?\n\n다음 순서로 설명해주세요:\n1. 분석 마스터 플랜의 정의\n2. 마스터 플랜 구성 요소\n3. 로드맵 작성 방법\n4. 마스터 플랜 수립 사례\n5. 연습문제 3개' },
        { id: 13, question: '분석 과제 정의서에 포함되어야 할 필수 항목이 아닌 것은?', answer: '경쟁사 분석 현황 - 과제명, 목적, 범위, 산출물, 일정이 필수', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 과제 정의서에 포함되어야 할 필수 항목이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 분석 과제 정의서 목적\n2. 필수 포함 항목\n3. 작성 시 유의사항\n4. 과제 정의서 템플릿\n5. 연습문제 3개' },
        { id: 14, question: '분석 프로젝트 범위 정의 시 MECE 원칙의 의미는?', answer: 'Mutually Exclusive, Collectively Exhaustive - 상호 배타적이고 전체를 포괄', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: MECE 원칙의 의미는?\n\n다음 순서로 설명해주세요:\n1. MECE의 정의\n2. Mutually Exclusive 설명\n3. Collectively Exhaustive 설명\n4. MECE 적용 예시\n5. 연습문제 3개' },
        { id: 15, question: '분석 과제 발굴 방법 중 Quick-Win 과제의 특징은?', answer: '단기간에 가시적 성과를 낼 수 있는 과제', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: Quick-Win 과제의 특징은?\n\n다음 순서로 설명해주세요:\n1. Quick-Win의 정의\n2. Quick-Win 과제 선정 기준\n3. 장단점\n4. Quick-Win 사례\n5. 연습문제 3개' },
        { id: 16, question: '분석 기회 발굴 시 사용하는 4C 분석 프레임워크에 해당하지 않는 것은?', answer: 'Cost - 4C는 Customer, Company, Competitor, Channel(또는 Context)', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 4C 분석 프레임워크에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 4C 분석의 정의\n2. 각 C의 상세 설명\n3. 3C vs 4C 비교\n4. 분석 기회 발굴 사례\n5. 연습문제 3개' },
      ]
    },
    {
      name: '데이터 확보 계획',
      questions: [
        { id: 17, question: '데이터 품질 관리의 6가지 차원에 해당하지 않는 것은?', answer: 'Speed (속도) - 6차원: 정확성, 완전성, 일관성, 유효성, 적시성, 유일성', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 품질 관리의 6가지 차원에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 품질의 정의\n2. 6가지 품질 차원 상세\n3. 각 차원별 측정 방법\n4. 품질 개선 방안\n5. 연습문제 3개' },
        { id: 18, question: '내부 데이터와 외부 데이터를 구분하는 기준으로 옳은 것은?', answer: '조직 내에서 생성/보유 여부', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 내부 데이터와 외부 데이터를 구분하는 기준으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 내부 데이터의 정의와 예시\n2. 외부 데이터의 정의와 예시\n3. 데이터 확보 방법\n4. 통합 시 고려사항\n5. 연습문제 3개' },
        { id: 19, question: '공공데이터 포털에서 제공하는 데이터 형식이 아닌 것은?', answer: 'HWP - CSV, JSON, XML, XLS 등이 제공됨', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 공공데이터 포털에서 제공하는 데이터 형식이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 공공데이터 포털 개요\n2. 제공 데이터 형식\n3. API 활용 방법\n4. 주요 공공데이터 예시\n5. 연습문제 3개' },
        { id: 20, question: '개인정보 비식별화 기법 중 일반화(Generalization)의 특징은?', answer: '데이터의 범주를 넓혀서 특정 개인을 식별할 수 없게 함', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 일반화(Generalization)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 비식별화의 정의\n2. 일반화 기법 상세\n3. 다른 비식별화 기법 (마스킹, 가명화 등)\n4. 적용 사례\n5. 연습문제 3개' },
        { id: 21, question: '데이터 거버넌스의 핵심 구성 요소에 해당하지 않는 것은?', answer: '마케팅 전략 - 원칙, 조직, 프로세스, 기술이 핵심', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 거버넌스의 핵심 구성 요소에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 거버넌스 정의\n2. 4가지 핵심 구성 요소\n3. 거버넌스 체계 구축 방법\n4. 성숙도 모델\n5. 연습문제 3개' },
        { id: 22, question: '메타데이터(Metadata)의 유형 중 기술 메타데이터가 아닌 것은?', answer: '데이터 생성 부서 - 이는 비즈니스 메타데이터', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 기술 메타데이터가 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 메타데이터의 정의\n2. 기술 메타데이터 vs 비즈니스 메타데이터\n3. 운영 메타데이터\n4. 메타데이터 관리 방법\n5. 연습문제 3개' },
        { id: 23, question: '마스터 데이터 관리(MDM)의 목적으로 적절하지 않은 것은?', answer: '실시간 트랜잭션 처리 - MDM은 핵심 데이터의 일관성과 정확성 유지가 목적', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 마스터 데이터 관리(MDM)의 목적으로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. MDM의 정의\n2. 마스터 데이터 예시\n3. MDM 구축 효과\n4. MDM 아키텍처\n5. 연습문제 3개' },
        { id: 24, question: '데이터 수집 방법 중 크롤링(Crawling)과 스크래핑(Scraping)의 차이점은?', answer: '크롤링은 웹 탐색, 스크래핑은 데이터 추출에 초점', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 크롤링과 스크래핑의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 웹 크롤링의 정의\n2. 웹 스크래핑의 정의\n3. 차이점 비교\n4. Python 라이브러리 (requests, BeautifulSoup, Scrapy)\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분석 거버넌스 및 프로젝트 관리',
      questions: [
        { id: 25, question: '분석 조직의 유형 중 집중형 조직의 장점은?', answer: '분석 전문성 확보와 일관된 분석 품질 유지', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 집중형 조직의 장점은?\n\n다음 순서로 설명해주세요:\n1. 분석 조직 유형 (집중형, 분산형, 혼합형)\n2. 집중형 조직의 장단점\n3. 조직 유형 선택 기준\n4. 조직 구조 사례\n5. 연습문제 3개' },
        { id: 26, question: 'CoE(Center of Excellence)의 역할로 적절하지 않은 것은?', answer: '일상적인 운영 업무 수행 - CoE는 모범사례 전파와 역량 강화가 역할', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: CoE의 역할로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. CoE의 정의\n2. CoE의 주요 역할\n3. CoE 구축 방법\n4. CoE 성공 요인\n5. 연습문제 3개' },
        { id: 27, question: '애자일(Agile) 방법론의 특징이 아닌 것은?', answer: '상세한 문서화 우선 - 애자일은 작동하는 소프트웨어를 우선시', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 애자일(Agile) 방법론의 특징이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 애자일의 정의와 4가지 핵심 가치\n2. 12가지 원칙\n3. 스크럼 vs 칸반\n4. 분석 프로젝트에서의 애자일 적용\n5. 연습문제 3개' },
        { id: 28, question: '스크럼(Scrum)에서 스프린트(Sprint)의 일반적인 기간은?', answer: '2~4주', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 스프린트의 일반적인 기간은?\n\n다음 순서로 설명해주세요:\n1. 스크럼 프레임워크 개요\n2. 스프린트의 정의\n3. 스크럼 이벤트 (계획, 데일리, 리뷰, 회고)\n4. 스크럼 역할 (PO, SM, 팀)\n5. 연습문제 3개' },
        { id: 29, question: '분석 프로젝트 위험 관리에서 위험 대응 전략 중 "회피"의 의미는?', answer: '위험 원인을 제거하여 발생 가능성을 0으로 만듦', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 위험 대응 전략 중 회피의 의미는?\n\n다음 순서로 설명해주세요:\n1. 위험 관리 프로세스\n2. 4가지 대응 전략 (회피, 전가, 완화, 수용)\n3. 각 전략별 적용 상황\n4. 위험 관리 사례\n5. 연습문제 3개' },
        { id: 30, question: 'WBS(Work Breakdown Structure)의 목적은?', answer: '프로젝트 범위를 관리 가능한 작업 단위로 분해', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: WBS의 목적은?\n\n다음 순서로 설명해주세요:\n1. WBS의 정의\n2. WBS 작성 방법\n3. WBS 레벨 구조\n4. WBS 활용 사례\n5. 연습문제 3개' },
        { id: 31, question: '분석 프로젝트 일정 관리에서 간트 차트(Gantt Chart)의 용도는?', answer: '작업의 시작/종료 일정과 진행 상황을 시각적으로 표현', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 간트 차트의 용도는?\n\n다음 순서로 설명해주세요:\n1. 간트 차트의 정의\n2. 구성 요소\n3. 작성 방법\n4. PERT 차트와 비교\n5. 연습문제 3개' },
        { id: 32, question: '분석 프로젝트의 품질 관리 활동으로 적절하지 않은 것은?', answer: '마케팅 캠페인 실행 - 품질 계획, 품질 보증, 품질 통제가 주요 활동', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 프로젝트의 품질 관리 활동으로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. 품질 관리의 정의\n2. 품질 계획, 품질 보증, 품질 통제\n3. 분석 품질 지표\n4. 품질 개선 사례\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분석 인프라 및 기술 이해',
      questions: [
        { id: 33, question: 'Hadoop의 핵심 구성 요소에 해당하지 않는 것은?', answer: 'Oracle DB - Hadoop은 HDFS, MapReduce, YARN으로 구성', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: Hadoop의 핵심 구성 요소에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. Hadoop의 정의\n2. HDFS, MapReduce, YARN 설명\n3. Hadoop 에코시스템\n4. 클라우드 빅데이터 서비스\n5. 연습문제 3개' },
        { id: 34, question: 'HDFS(Hadoop Distributed File System)의 특징이 아닌 것은?', answer: '실시간 랜덤 접근에 최적화 - HDFS는 대용량 순차 읽기에 최적화', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: HDFS의 특징이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. HDFS의 정의와 아키텍처\n2. NameNode와 DataNode\n3. 블록 복제\n4. HDFS의 장단점\n5. 연습문제 3개' },
        { id: 35, question: 'Apache Spark의 특징으로 옳은 것은?', answer: '인메모리 처리로 MapReduce보다 빠른 성능 제공', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: Apache Spark의 특징으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. Spark의 정의\n2. RDD와 DataFrame\n3. Spark 컴포넌트 (SQL, MLlib, Streaming)\n4. MapReduce와 비교\n5. 연습문제 3개' },
        { id: 36, question: 'NoSQL 데이터베이스의 유형 중 문서형(Document) DB의 예시는?', answer: 'MongoDB', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 문서형(Document) DB의 예시는?\n\n다음 순서로 설명해주세요:\n1. NoSQL의 정의와 특징\n2. NoSQL 유형 (키-값, 문서형, 컬럼형, 그래프형)\n3. 각 유형별 대표 DB\n4. 사용 사례\n5. 연습문제 3개' },
        { id: 37, question: '클라우드 서비스 모델 중 IaaS의 특징은?', answer: '인프라(서버, 스토리지, 네트워크)를 서비스로 제공', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: IaaS의 특징은?\n\n다음 순서로 설명해주세요:\n1. 클라우드 서비스 모델 (IaaS, PaaS, SaaS)\n2. IaaS 상세 설명\n3. 각 모델 비교\n4. 주요 클라우드 벤더 서비스\n5. 연습문제 3개' },
        { id: 38, question: 'Apache Kafka의 주요 용도는?', answer: '실시간 데이터 스트리밍 및 메시지 큐', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: Apache Kafka의 주요 용도는?\n\n다음 순서로 설명해주세요:\n1. Kafka의 정의\n2. Kafka 아키텍처 (Producer, Broker, Consumer)\n3. 토픽과 파티션\n4. Kafka 사용 사례\n5. 연습문제 3개' },
        { id: 39, question: '데이터 마트(Data Mart)의 특징으로 옳은 것은?', answer: '특정 부서나 주제 영역에 초점을 맞춘 소규모 데이터 저장소', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 마트의 특징으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 마트의 정의\n2. DW vs Data Mart 비교\n3. 종속형 vs 독립형 마트\n4. 데이터 마트 구축 사례\n5. 연습문제 3개' },
        { id: 40, question: 'OLAP(Online Analytical Processing)의 특징이 아닌 것은?', answer: '단일 트랜잭션 처리에 최적화 - OLAP는 다차원 분석에 최적화', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: OLAP의 특징이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. OLAP의 정의\n2. OLAP vs OLTP 비교\n3. OLAP 연산 (Slice, Dice, Drill, Roll-up)\n4. OLAP 유형 (MOLAP, ROLAP, HOLAP)\n5. 연습문제 3개' },
      ]
    },
    {
      name: '분석 윤리 및 법규',
      questions: [
        { id: 41, question: '개인정보보호법에서 정의하는 개인정보의 범위에 해당하지 않는 것은?', answer: '공개된 법인 정보 - 개인정보는 살아있는 개인에 관한 정보', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 개인정보의 범위에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 개인정보의 정의\n2. 개인정보의 유형\n3. 민감정보와 고유식별정보\n4. 개인정보 처리 원칙\n5. 연습문제 3개' },
        { id: 42, question: '가명정보와 익명정보의 차이점으로 옳은 것은?', answer: '가명정보는 추가 정보와 결합 시 개인 식별 가능, 익명정보는 불가능', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 가명정보와 익명정보의 차이점으로 옳은 것은?\n\n다음 순서로 설명해주세요:\n1. 가명정보의 정의\n2. 익명정보의 정의\n3. 법적 처리 기준 차이\n4. 가명처리 방법\n5. 연습문제 3개' },
        { id: 43, question: '개인정보 처리 시 반드시 사전 동의가 필요한 경우는?', answer: '마케팅 목적의 개인정보 활용', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 반드시 사전 동의가 필요한 경우는?\n\n다음 순서로 설명해주세요:\n1. 개인정보 동의의 종류\n2. 동의 필요/불필요 사례\n3. 적법한 동의 요건\n4. 동의 철회 권리\n5. 연습문제 3개' },
        { id: 44, question: 'GDPR(General Data Protection Regulation)의 적용 범위는?', answer: 'EU 시민의 개인정보를 처리하는 모든 기업 (EU 외 기업 포함)', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: GDPR의 적용 범위는?\n\n다음 순서로 설명해주세요:\n1. GDPR의 정의와 배경\n2. 주요 원칙\n3. 정보주체의 권리\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 45, question: '알고리즘 편향(Bias)의 유형에 해당하지 않는 것은?', answer: '하드웨어 편향 - 데이터, 알고리즘, 사용자 편향이 주요 유형', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 알고리즘 편향의 유형에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 알고리즘 편향의 정의\n2. 편향 유형 (표본, 측정, 알고리즘)\n3. 편향 탐지 방법\n4. 공정성 확보 방안\n5. 연습문제 3개' },
        { id: 46, question: '설명 가능한 AI(XAI)의 필요성으로 적절하지 않은 것은?', answer: '계산 속도 향상 - XAI는 모델의 의사결정 과정 해석이 목적', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 설명 가능한 AI(XAI)의 필요성으로 적절하지 않은 것은?\n\n다음 순서로 설명해주세요:\n1. XAI의 정의\n2. XAI 필요성\n3. XAI 기법 (LIME, SHAP)\n4. 적용 분야\n5. 연습문제 3개' },
        { id: 47, question: '데이터 3법에 해당하지 않는 것은?', answer: '전자상거래법 - 데이터 3법: 개인정보보호법, 신용정보법, 정보통신망법', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 데이터 3법에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. 데이터 3법의 정의\n2. 각 법률의 주요 내용\n3. 개정 주요 사항\n4. 마이데이터 사업\n5. 연습문제 3개' },
        { id: 48, question: '정보보안의 3요소(CIA Triad)에 해당하지 않는 것은?', answer: 'Authenticity (진정성) - 3요소: Confidentiality, Integrity, Availability', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 정보보안의 3요소에 해당하지 않는 것은?\n\n다음 순서로 설명해주세요:\n1. CIA Triad 정의\n2. 기밀성, 무결성, 가용성 설명\n3. 각 요소별 보안 기술\n4. 확장된 보안 요소\n5. 연습문제 3개' },
        { id: 49, question: 'AI 윤리 원칙 중 "공정성"의 의미는?', answer: '특정 집단에 대한 차별 없이 공평하게 AI가 작동해야 함', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: AI 윤리 원칙 중 공정성의 의미는?\n\n다음 순서로 설명해주세요:\n1. AI 윤리 원칙 개요\n2. 공정성의 정의\n3. 공정성 측정 지표\n4. 공정한 AI 구현 방법\n5. 연습문제 3개' },
        { id: 50, question: '데이터 분석 결과의 오용을 방지하기 위한 방안이 아닌 것은?', answer: '분석 결과의 비공개 원칙 - 투명한 공개와 검증이 오용 방지에 효과적', prompt: '빅데이터분석기사 빅데이터 분석 기획 문제입니다.\n\n문제: 분석 결과의 오용을 방지하기 위한 방안이 아닌 것은?\n\n다음 순서로 설명해주세요:\n1. 분석 결과 오용 사례\n2. 오용 방지 방안\n3. 분석 윤리 가이드라인\n4. 책임있는 AI 개발\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);

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
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst" className="text-gray-600 hover:text-blue-600">빅데이터분석기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst/study" className="text-gray-600 hover:text-blue-600">학습하기</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">빅데이터 분석 기획</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터 분석 기획</h1>
              <p className="text-cyan-100">1과목 | {totalQuestions}문항 | 암기 위주</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center font-bold">
                    {topicIndex + 1}
                  </span>
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openTopics.includes(topicIndex) && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {q.id}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{q.question}</p>
                          <p className="text-sm text-cyan-600 bg-cyan-50 p-2 rounded">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition flex-shrink-0"
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

      {/* AI 선택 모달 */}
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
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
