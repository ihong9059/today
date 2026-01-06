'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'architecture',
    name: '시스템 아키텍처',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '모놀리식 vs 마이크로서비스 아키텍처를 비교하시오.', answer: '모놀리식: 단일 배포, 단순 / 마이크로서비스: 독립 배포, 확장성, 복잡성', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 모놀리식 vs 마이크로서비스 아키텍처를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '서비스 지향 아키텍처(SOA)의 원칙을 설명하시오.', answer: '서비스 재사용, 느슨한 결합, 자율성, 추상화, 구성 가능성', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 서비스 지향 아키텍처(SOA)의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '이벤트 기반 아키텍처(EDA)의 특징을 설명하시오.', answer: '이벤트 생산/소비, 비동기 처리, 느슨한 결합, 확장성', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 이벤트 기반 아키텍처(EDA)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'CQRS(Command Query Responsibility Segregation)를 설명하시오.', answer: '명령과 조회 분리, 읽기/쓰기 최적화, 이벤트 소싱과 결합', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: CQRS(Command Query Responsibility Segregation)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '헥사고날 아키텍처(Hexagonal Architecture)를 설명하시오.', answer: '포트와 어댑터, 도메인 중심, 외부 의존성 격리, 테스트 용이', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 헥사고날 아키텍처(Hexagonal Architecture)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '계층형 아키텍처(Layered Architecture)의 장단점을 설명하시오.', answer: '관심사 분리, 유지보수 용이 / 수직적 의존성, 성능 오버헤드', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 계층형 아키텍처(Layered Architecture)의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'API Gateway 패턴의 역할을 설명하시오.', answer: '단일 진입점, 인증/인가, 로드밸런싱, 요청 라우팅, 속도 제한', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: API Gateway 패턴의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'BFF(Backend for Frontend) 패턴을 설명하시오.', answer: '클라이언트별 전용 백엔드, 최적화된 API, 프론트엔드 요구 대응', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: BFF(Backend for Frontend) 패턴을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '서버리스 아키텍처의 설계 고려사항을 설명하시오.', answer: '콜드 스타트, 상태 관리, 타임아웃, 동시성 제한, 비용 모델', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 서버리스 아키텍처의 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Clean Architecture의 원칙을 설명하시오.', answer: '의존성 규칙, 동심원 구조, 엔티티/유스케이스 중심, 프레임워크 독립', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Clean Architecture의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'scalability',
    name: '확장성 설계',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '수평적 확장 vs 수직적 확장을 비교하시오.', answer: '수평: 서버 추가, 수직: 하드웨어 업그레이드 / 비용, 한계 차이', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 수평적 확장 vs 수직적 확장을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '로드 밸런싱 알고리즘의 종류를 설명하시오.', answer: 'Round Robin, Least Connection, IP Hash, Weighted, Least Response Time', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 로드 밸런싱 알고리즘의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '데이터베이스 샤딩(Sharding) 전략을 설명하시오.', answer: '수평 분할, 범위/해시/디렉토리 샤딩, 샤드 키 선택 중요', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 데이터베이스 샤딩(Sharding) 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '캐싱 전략(Cache-Aside, Write-Through, Write-Back)을 비교하시오.', answer: 'Aside: 애플리케이션 관리, Through: 동시 쓰기, Back: 지연 쓰기', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 캐싱 전략(Cache-Aside, Write-Through, Write-Back)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '읽기 복제(Read Replica)와 쓰기 분산을 설명하시오.', answer: '마스터-슬레이브 구조, 읽기 부하 분산, 복제 지연 고려', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 읽기 복제(Read Replica)와 쓰기 분산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'CAP 정리와 분산 시스템 설계를 설명하시오.', answer: 'Consistency, Availability, Partition tolerance - 2가지만 선택 가능', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: CAP 정리와 분산 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Consistent Hashing의 원리와 장점을 설명하시오.', answer: '링 구조, 노드 추가/제거 시 최소 재배치, 분산 캐시/DB에 활용', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Consistent Hashing의 원리와 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '메시지 큐를 이용한 비동기 처리 설계를 설명하시오.', answer: '프로듀서/컨슈머, 버퍼링, 디커플링, Kafka/RabbitMQ/SQS', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 메시지 큐를 이용한 비동기 처리 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Rate Limiting 구현 방법을 설명하시오.', answer: 'Token Bucket, Leaky Bucket, Fixed Window, Sliding Window', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Rate Limiting 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Connection Pooling의 개념과 설정을 설명하시오.', answer: '연결 재사용, 오버헤드 감소, 최소/최대 연결수, 타임아웃 설정', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Connection Pooling의 개념과 설정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'reliability',
    name: '가용성/안정성',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '고가용성(High Availability) 설계 원칙을 설명하시오.', answer: '중복성, 장애 격리, 자동 복구, 헬스체크, 무중단 배포', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 고가용성(High Availability) 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'Circuit Breaker 패턴의 동작 원리를 설명하시오.', answer: 'Closed→Open→Half-Open 상태 전이, 장애 전파 방지', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Circuit Breaker 패턴의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Retry 패턴과 Exponential Backoff를 설명하시오.', answer: '일시적 장애 대응, 지수 증가 대기시간, Jitter 추가', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Retry 패턴과 Exponential Backoff를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Bulkhead 패턴의 개념을 설명하시오.', answer: '자원 격리, 장애 전파 방지, 스레드풀/연결풀 분리', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Bulkhead 패턴의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '장애 복구 전략(Failover, Failback)을 설명하시오.', answer: 'Failover: 예비 시스템 전환, Failback: 원래 시스템 복귀', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 장애 복구 전략(Failover, Failback)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Active-Active vs Active-Passive 구성을 비교하시오.', answer: 'A-A: 모든 노드 활성, 부하분산 / A-P: 대기 노드 존재, 리소스 낭비', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Active-Active vs Active-Passive 구성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Graceful Degradation 전략을 설명하시오.', answer: '부분 장애 시 핵심 기능 유지, 비필수 기능 제한/비활성화', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Graceful Degradation 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Chaos Engineering의 원칙을 설명하시오.', answer: '의도적 장애 주입, 시스템 복원력 검증, Netflix Chaos Monkey', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: Chaos Engineering의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'RTO(복구 목표 시간)와 RPO(복구 목표 시점)를 설명하시오.', answer: 'RTO: 서비스 복구까지 시간, RPO: 허용 데이터 손실량', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: RTO(복구 목표 시간)와 RPO(복구 목표 시점)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '분산 트랜잭션과 Saga 패턴을 설명하시오.', answer: '마이크로서비스 간 트랜잭션, 보상 트랜잭션으로 롤백', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 분산 트랜잭션과 Saga 패턴을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'data-design',
    name: '데이터 시스템 설계',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'SQL vs NoSQL 데이터베이스 선택 기준을 설명하시오.', answer: 'SQL: ACID, 정형 / NoSQL: 확장성, 유연한 스키마, BASE', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: SQL vs NoSQL 데이터베이스 선택 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'NoSQL의 4가지 유형을 설명하시오.', answer: '키-값, 문서, 컬럼 패밀리, 그래프 데이터베이스', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: NoSQL의 4가지 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '데이터 웨어하우스 vs 데이터 레이크를 비교하시오.', answer: 'DW: 정형, 스키마 온 라이트 / DL: 원시, 스키마 온 리드', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 데이터 웨어하우스 vs 데이터 레이크를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '데이터 파이프라인 설계 원칙을 설명하시오.', answer: 'ETL/ELT, 배치/스트림, 멱등성, 데이터 품질 검증', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 데이터 파이프라인 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '실시간 데이터 처리 아키텍처(Lambda, Kappa)를 비교하시오.', answer: 'Lambda: 배치+스트림 이중, Kappa: 스트림 단일 경로', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 실시간 데이터 처리 아키텍처(Lambda, Kappa)를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '이벤트 소싱(Event Sourcing)의 개념을 설명하시오.', answer: '상태 대신 이벤트 저장, 이벤트 스토어, 재생 가능', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 이벤트 소싱(Event Sourcing)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '벡터 데이터베이스의 특징과 활용을 설명하시오.', answer: '임베딩 벡터 저장/검색, ANN 알고리즘, AI/ML, RAG 활용', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 벡터 데이터베이스의 특징과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '시계열 데이터베이스의 특징을 설명하시오.', answer: '타임스탬프 기반, 데이터 압축, 집계 최적화, 모니터링/IoT', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 시계열 데이터베이스의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '데이터 파티셔닝 전략을 설명하시오.', answer: '범위, 해시, 리스트, 복합 파티셔닝 / 쿼리 성능 최적화', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 데이터 파티셔닝 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '데이터 거버넌스의 핵심 요소를 설명하시오.', answer: '데이터 품질, 메타데이터 관리, 보안, 컴플라이언스, 생명주기', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 데이터 거버넌스의 핵심 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'case-study',
    name: '실전 설계 사례',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'URL 단축 서비스 설계를 설명하시오.', answer: '해시/인코딩, 키-값 저장, 리다이렉트, 캐싱, 분산 ID 생성', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: URL 단축 서비스 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '실시간 채팅 시스템 설계를 설명하시오.', answer: 'WebSocket, 메시지 큐, 프레즌스, 메시지 저장, 푸시 알림', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 실시간 채팅 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '뉴스 피드 시스템 설계를 설명하시오.', answer: '팬아웃(Push/Pull), 타임라인 생성, 캐싱, 페이지네이션', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 뉴스 피드 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '검색 자동완성 시스템 설계를 설명하시오.', answer: '트라이, 인기 검색어, 캐싱, 다국어, 개인화', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 검색 자동완성 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '분산 파일 시스템 설계를 설명하시오.', answer: '청킹, 복제, 메타데이터 서버, 일관성, 가비지 컬렉션', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 분산 파일 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '알림 시스템 설계를 설명하시오.', answer: '푸시/이메일/SMS, 템플릿, 우선순위, 속도 제한, 재시도', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 알림 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '결제 시스템 설계를 설명하시오.', answer: '멱등성, 분산 트랜잭션, 정산, 보안(PCI-DSS), 감사 로그', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 결제 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '위치 기반 서비스 설계를 설명하시오.', answer: 'Geohash, 쿼드트리, 공간 인덱스, 실시간 위치 추적', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 위치 기반 서비스 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '동영상 스트리밍 시스템 설계를 설명하시오.', answer: '인코딩, CDN, 적응형 비트레이트, 청크 전송, DRM', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 동영상 스트리밍 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '예약 시스템 설계를 설명하시오.', answer: '동시성 제어, 이중 예약 방지, 대기열, 취소/환불, 알림', prompt: `컴퓨터시스템응용기술사 시스템 설계 문제입니다.\n\n문제: 예약 시스템 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SystemDesignPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['architecture']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computer-system-pro-system-design-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computer-system-pro-system-design-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-indigo-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-indigo-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-system-pro" className="text-gray-600 hover:text-indigo-600">컴퓨터시스템응용기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">시스템 설계</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">시스템 설계</h1>
              <p className="text-indigo-100">컴퓨터시스템응용기술사 - 아키텍처, 확장성, 가용성, 데이터 설계</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-indigo-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
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
                            <span className="text-indigo-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition"
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
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 whitespace-pre-line">{currentPrompt}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                위 프롬프트를 복사하여 Claude AI에게 질문하세요.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
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
