'use client';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function DataArchitecturePage() {
  const [activeTopic, setActiveTopic] = useState<string>('modeling');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'modeling',
      name: '데이터 모델링',
      color: 'from-violet-500 to-violet-400',
      questions: [
        { id: 1, question: '정규화의 목적으로 올바르지 않은 것은?', options: ['데이터 중복 최소화', '갱신 이상 방지', '조회 성능 향상', '데이터 무결성 보장'], answer: 2, explanation: '정규화는 중복 제거와 이상 현상 방지가 목적이며, 조인 증가로 조회 성능은 오히려 저하될 수 있습니다.' },
        { id: 2, question: 'BCNF(Boyce-Codd Normal Form)의 조건은?', options: ['모든 결정자가 후보키', '이행적 종속 제거', '다치 종속 제거', '부분 종속 제거'], answer: 0, explanation: 'BCNF는 모든 결정자가 후보키여야 합니다. 3NF보다 강한 조건입니다.' },
        { id: 3, question: '반정규화를 적용하는 경우가 아닌 것은?', options: ['조회 성능 향상 필요', '조인 비용 감소', '데이터 무결성 강화', '집계 테이블 생성'], answer: 2, explanation: '반정규화는 성능 향상을 위해 중복을 허용하므로 무결성은 오히려 약화됩니다.' },
        { id: 4, question: 'ERD에서 다대다(M:N) 관계 해소 방법은?', options: ['외래키 추가', '교차 엔티티 생성', '속성 분리', '정규화'], answer: 1, explanation: 'M:N 관계는 중간에 교차(연결) 엔티티를 두어 1:N, N:1 관계로 분해합니다.' },
        { id: 5, question: '슈퍼타입/서브타입 모델의 물리 변환 전략이 아닌 것은?', options: ['Single Table', 'Table per Type', 'Table per Concrete', 'Normalized Table'], answer: 3, explanation: '상속 매핑 전략은 Single Table, Table per Type(Class), Table per Concrete Class입니다.' },
        { id: 6, question: '차원 모델링에서 팩트 테이블의 특징은?', options: ['주로 문자형 데이터', '측정값(Measure) 포함', '마스터 데이터 저장', '변경 이력 없음'], answer: 1, explanation: '팩트 테이블은 비즈니스 프로세스의 측정값(매출액, 수량 등)을 저장합니다.' },
        { id: 7, question: 'Slowly Changing Dimension(SCD) Type 2의 특징은?', options: ['덮어쓰기', '이력 관리', '별도 컬럼에 이전값 저장', '변경 불가'], answer: 1, explanation: 'SCD Type 2는 새 레코드를 추가하여 변경 이력을 관리합니다.' },
        { id: 8, question: '데이터 모델 품질 검증 기준이 아닌 것은?', options: ['완전성', '일관성', '성능', '유연성'], answer: 2, explanation: '데이터 모델 품질 기준은 완전성, 정확성, 일관성, 유연성, 이해성 등입니다. 성능은 물리 설계 영역입니다.' },
        { id: 9, question: '개념 모델링 단계의 산출물은?', options: ['물리 ERD', 'DDL 스크립트', '주제영역/핵심 엔티티', '인덱스 설계서'], answer: 2, explanation: '개념 모델링은 주제영역 정의와 핵심 엔티티 도출이 주요 산출물입니다.' },
        { id: 10, question: '식별 관계와 비식별 관계의 차이점은?', options: ['외래키 존재 여부', '부모 PK가 자식 PK에 포함되는지', '관계의 필수 여부', 'NULL 허용 여부'], answer: 1, explanation: '식별 관계는 부모의 PK가 자식의 PK 일부가 되고, 비식별은 일반 FK로만 참조합니다.' }
      ]
    },
    {
      id: 'database',
      name: '데이터베이스 설계',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: 'B-Tree 인덱스의 특징으로 올바르지 않은 것은?', options: ['범위 검색에 효율적', '정렬된 데이터 저장', '해시 검색보다 빠름', '균형 트리 구조'], answer: 2, explanation: '등가 검색에서는 해시 인덱스가 O(1)로 B-Tree O(log n)보다 빠릅니다.' },
        { id: 2, question: '파티셔닝 전략 중 Range Partition의 장점은?', options: ['균등 분산 보장', '시계열 데이터 관리 용이', '해시 충돌 없음', '조인 성능 향상'], answer: 1, explanation: 'Range Partition은 날짜 등 범위 기반 데이터 관리와 파티션 프루닝에 효과적입니다.' },
        { id: 3, question: 'MVCC(Multi-Version Concurrency Control)의 장점은?', options: ['저장 공간 절약', '읽기/쓰기 동시성 향상', '롤백 불필요', '잠금 비용 증가'], answer: 1, explanation: 'MVCC는 읽기 시 잠금 없이 스냅샷을 읽어 동시성을 높입니다.' },
        { id: 4, question: '샤딩(Sharding)의 주요 목적은?', options: ['데이터 백업', '수평적 확장', '트랜잭션 보장', '스키마 변경'], answer: 1, explanation: '샤딩은 데이터를 여러 노드에 분산하여 수평적 확장(Scale-out)을 가능하게 합니다.' },
        { id: 5, question: 'CAP 정리에서 P(Partition Tolerance)의 의미는?', options: ['성능 보장', '네트워크 분할 상황에서도 동작', '일관성 보장', '가용성 보장'], answer: 1, explanation: 'Partition Tolerance는 네트워크 분할 시에도 시스템이 계속 동작함을 의미합니다.' },
        { id: 6, question: '데이터베이스 복제 방식 중 동기식의 단점은?', options: ['데이터 불일치', '쓰기 지연 증가', '복제 누락', '네트워크 비용 감소'], answer: 1, explanation: '동기식 복제는 모든 복제본에 쓰기 완료를 기다려 지연이 발생합니다.' },
        { id: 7, question: 'Clustered Index의 특징은?', options: ['테이블당 여러 개 가능', '데이터가 인덱스 순서로 저장', '보조 인덱스보다 느림', '힙 테이블 필수'], answer: 1, explanation: 'Clustered Index는 테이블 데이터 자체를 인덱스 순서로 정렬하여 저장합니다.' },
        { id: 8, question: '커버링 인덱스(Covering Index)의 장점은?', options: ['인덱스 크기 감소', '테이블 액세스 없이 조회 가능', 'DML 성능 향상', '잠금 범위 증가'], answer: 1, explanation: '커버링 인덱스는 쿼리에 필요한 모든 컬럼을 포함하여 테이블 접근을 생략합니다.' },
        { id: 9, question: 'Database Connection Pool의 목적은?', options: ['보안 강화', '연결 재사용으로 성능 향상', '트랜잭션 격리', '쿼리 캐싱'], answer: 1, explanation: 'Connection Pool은 연결 생성 비용을 줄이고 재사용하여 성능을 향상시킵니다.' },
        { id: 10, question: 'Materialized View의 특징은?', options: ['실시간 데이터 반영', '쿼리 결과를 물리적으로 저장', '원본 테이블 삭제 시 유지', '저장 공간 불필요'], answer: 1, explanation: 'Materialized View는 쿼리 결과를 물리적으로 저장하여 조회 성능을 높입니다.' }
      ]
    },
    {
      id: 'bigdata',
      name: '빅데이터 아키텍처',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: 'Lambda Architecture의 구성 요소가 아닌 것은?', options: ['Batch Layer', 'Speed Layer', 'Serving Layer', 'Cache Layer'], answer: 3, explanation: 'Lambda Architecture는 Batch, Speed(Real-time), Serving Layer로 구성됩니다.' },
        { id: 2, question: 'Data Lake와 Data Warehouse의 차이점은?', options: ['Data Lake는 정형 데이터만', 'Data Warehouse는 스키마 온 리드', 'Data Lake는 원시 데이터 저장', 'Data Warehouse가 더 저렴'], answer: 2, explanation: 'Data Lake는 원시(Raw) 데이터를 그대로 저장하고, Schema on Read 방식입니다.' },
        { id: 3, question: 'Apache Kafka의 주요 특징은?', options: ['관계형 데이터베이스', '분산 스트리밍 플랫폼', '배치 처리 전용', 'SQL 쿼리 엔진'], answer: 1, explanation: 'Kafka는 고성능 분산 스트리밍 플랫폼으로 실시간 데이터 파이프라인에 사용됩니다.' },
        { id: 4, question: 'Hadoop HDFS의 기본 복제 계수(Replication Factor)는?', options: ['1', '2', '3', '5'], answer: 2, explanation: 'HDFS는 기본적으로 3개의 복제본을 유지하여 내결함성을 보장합니다.' },
        { id: 5, question: 'Apache Spark가 MapReduce보다 빠른 이유는?', options: ['디스크 기반 처리', '인메모리 처리', '단일 노드 실행', '동기식 처리'], answer: 1, explanation: 'Spark는 인메모리 처리로 중간 결과를 메모리에 유지하여 MapReduce보다 빠릅니다.' },
        { id: 6, question: 'ELT와 ETL의 차이점은?', options: ['처리 위치가 다름', 'ELT는 변환 없음', 'ETL이 더 최신 기술', '동일한 개념'], answer: 0, explanation: 'ETL은 추출 후 별도 시스템에서 변환, ELT는 데이터 레이크/웨어하우스 내에서 변환합니다.' },
        { id: 7, question: 'Data Mesh 아키텍처의 핵심 원칙이 아닌 것은?', options: ['도메인 소유권', '데이터를 제품으로', '중앙 집중식 관리', '셀프서비스 인프라'], answer: 2, explanation: 'Data Mesh는 분산된 도메인 중심 아키텍처로 중앙 집중이 아닌 연합 거버넌스를 강조합니다.' },
        { id: 8, question: 'Columnar Storage의 장점은?', options: ['OLTP에 최적화', '압축률 향상 및 분석 쿼리 성능', '행 단위 갱신 효율', '트랜잭션 처리 우수'], answer: 1, explanation: '열 기반 저장은 동일 타입 데이터 압축과 분석 쿼리(집계, 스캔)에 효과적입니다.' },
        { id: 9, question: 'CDC(Change Data Capture)의 용도는?', options: ['데이터 암호화', '변경 데이터 실시간 캡처', '스키마 검증', '접근 제어'], answer: 1, explanation: 'CDC는 소스 시스템의 데이터 변경을 실시간으로 캡처하여 다른 시스템에 전파합니다.' },
        { id: 10, question: 'Parquet 파일 포맷의 특징은?', options: ['행 기반 저장', '열 기반 + 스키마 내장', 'JSON 전용', '비압축'], answer: 1, explanation: 'Parquet은 열 기반 저장 포맷으로 스키마를 내장하고 고압축률을 제공합니다.' }
      ]
    },
    {
      id: 'quality',
      name: '데이터 품질/거버넌스',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: '데이터 품질 측정 차원이 아닌 것은?', options: ['정확성', '완전성', '처리 속도', '일관성'], answer: 2, explanation: '데이터 품질 차원은 정확성, 완전성, 일관성, 적시성, 유일성, 유효성 등입니다.' },
        { id: 2, question: '마스터 데이터 관리(MDM)의 목적은?', options: ['트랜잭션 처리', '핵심 데이터의 단일 버전 유지', '로그 분석', '백업 관리'], answer: 1, explanation: 'MDM은 고객, 제품 등 핵심 마스터 데이터의 일관된 단일 버전(Golden Record)을 유지합니다.' },
        { id: 3, question: '데이터 카탈로그의 기능이 아닌 것은?', options: ['메타데이터 관리', '데이터 검색', '데이터 복제', '데이터 계보 추적'], answer: 2, explanation: '데이터 카탈로그는 메타데이터 관리, 검색, 계보(Lineage) 추적 기능을 제공합니다.' },
        { id: 4, question: '데이터 계보(Data Lineage)의 용도는?', options: ['데이터 암호화', '데이터의 원천과 변환 추적', '접근 권한 관리', '백업 스케줄링'], answer: 1, explanation: '데이터 계보는 데이터의 출처, 변환 과정, 최종 사용처를 추적하여 영향 분석에 활용합니다.' },
        { id: 5, question: '데이터 거버넌스 조직에서 Data Steward의 역할은?', options: ['시스템 운영', '데이터 품질 관리 및 표준 적용', 'DBA 업무', '네트워크 관리'], answer: 1, explanation: 'Data Steward는 데이터 품질, 표준, 정책의 실무적 관리와 적용을 담당합니다.' },
        { id: 6, question: '데이터 프로파일링의 목적은?', options: ['데이터 암호화', '데이터 현황 분석 및 품질 측정', '스키마 변환', '백업 수행'], answer: 1, explanation: '프로파일링은 데이터의 패턴, 분포, 이상치 등을 분석하여 품질 현황을 파악합니다.' },
        { id: 7, question: 'GDPR에서 정보주체의 권리가 아닌 것은?', options: ['삭제권(잊힐 권리)', '이동권', '무제한 수집 요청권', '접근권'], answer: 2, explanation: 'GDPR은 정보주체에게 접근권, 정정권, 삭제권, 이동권 등을 보장하지만 무제한 수집은 아닙니다.' },
        { id: 8, question: '데이터 표준화의 효과가 아닌 것은?', options: ['시스템 간 통합 용이', '데이터 일관성 향상', '개발 생산성 향상', '저장 공간 감소'], answer: 3, explanation: '데이터 표준화는 통합성, 일관성, 생산성 향상이 목적이며 저장 공간과는 직접 관련 없습니다.' },
        { id: 9, question: '가명처리(Pseudonymization)와 익명처리의 차이는?', options: ['동일한 개념', '가명은 재식별 가능, 익명은 불가', '익명이 더 약한 보호', '가명만 GDPR 적용'], answer: 1, explanation: '가명처리는 추가 정보로 재식별 가능하고, 익명처리는 재식별이 불가능합니다.' },
        { id: 10, question: '데이터 품질 개선 프로세스의 올바른 순서는?', options: ['측정→분석→정의→개선', '정의→측정→분석→개선', '개선→측정→분석→정의', '분석→정의→측정→개선'], answer: 1, explanation: '품질 기준 정의 → 현황 측정 → 원인 분석 → 개선 활동 순서로 진행합니다.' }
      ]
    },
    {
      id: 'nosql',
      name: 'NoSQL/NewSQL',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'NoSQL의 BASE 특성이 아닌 것은?', options: ['Basically Available', 'Soft state', 'Eventually consistent', 'Atomic'], answer: 3, explanation: 'BASE는 Basically Available, Soft state, Eventually consistent입니다. Atomic은 ACID 특성입니다.' },
        { id: 2, question: 'Document DB의 대표적인 예시는?', options: ['Redis', 'MongoDB', 'Cassandra', 'Neo4j'], answer: 1, explanation: 'MongoDB는 대표적인 Document DB로 JSON 형태의 문서를 저장합니다.' },
        { id: 3, question: 'Graph DB가 적합한 용도는?', options: ['로그 분석', '소셜 네트워크 관계 분석', '시계열 데이터', '파일 저장'], answer: 1, explanation: 'Graph DB는 노드와 엣지로 관계를 표현하여 소셜 네트워크, 추천 시스템에 적합합니다.' },
        { id: 4, question: 'Wide-Column Store의 예시가 아닌 것은?', options: ['Cassandra', 'HBase', 'MongoDB', 'Bigtable'], answer: 2, explanation: 'MongoDB는 Document DB입니다. Cassandra, HBase, Bigtable이 Wide-Column Store입니다.' },
        { id: 5, question: 'Redis의 주요 용도가 아닌 것은?', options: ['캐싱', '세션 관리', '실시간 분석', '복잡한 트랜잭션'], answer: 3, explanation: 'Redis는 인메모리 Key-Value 저장소로 캐싱, 세션 관리에 적합하나 복잡한 트랜잭션은 부적합합니다.' },
        { id: 6, question: 'Cassandra의 데이터 분산 방식은?', options: ['Master-Slave', 'Consistent Hashing', 'Sharding Key', 'Random'], answer: 1, explanation: 'Cassandra는 Consistent Hashing으로 데이터를 링 구조의 노드들에 분산합니다.' },
        { id: 7, question: 'NewSQL의 특징은?', options: ['NoSQL과 동일', 'ACID + 수평 확장', 'BASE만 지원', '단일 노드 전용'], answer: 1, explanation: 'NewSQL은 RDBMS의 ACID 트랜잭션과 NoSQL의 수평 확장성을 결합합니다.' },
        { id: 8, question: 'CockroachDB, TiDB가 속하는 카테고리는?', options: ['Document DB', 'Graph DB', 'NewSQL', 'Key-Value'], answer: 2, explanation: 'CockroachDB, TiDB, Spanner 등은 분산 트랜잭션을 지원하는 NewSQL입니다.' },
        { id: 9, question: 'Time-Series DB의 예시는?', options: ['MongoDB', 'InfluxDB', 'Neo4j', 'Redis'], answer: 1, explanation: 'InfluxDB, TimescaleDB는 시계열 데이터에 최적화된 Time-Series DB입니다.' },
        { id: 10, question: '다중 모델 데이터베이스의 장점은?', options: ['단일 쿼리 언어만', '여러 데이터 모델 지원', '저장 공간 최소화', '트랜잭션 불가'], answer: 1, explanation: '다중 모델 DB(예: ArangoDB)는 Document, Graph, Key-Value 등 여러 모델을 하나의 시스템에서 지원합니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('imp-da-score'); if (saved) setScore(JSON.parse(saved)); }, []);

  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];

  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('imp-da-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { const prompt = `정보관리기술사 데이터 아키텍처 분야의 "${activeTpic.name}" 주제입니다:\n\n문제: ${question.question}\n\n선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${question.options[question.answer]}\n\n기술사 시험 답안 작성 관점에서 이 주제를 심층적으로 설명해주세요. 정의, 특징, 장단점, 적용 사례를 포함해주세요.`; setAiPrompt(prompt); setShowAIModal(true); };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-violet-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a><span className="text-gray-300">›</span><span className="text-violet-600 font-medium">데이터 아키텍처</span></nav></div></header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🗄️</span></div><div><h1 className="text-2xl font-bold">데이터 아키텍처</h1><p className="text-violet-100">Data Architecture - 모델링, 설계, 빅데이터, 품질</p></div></div><div className="mt-4 flex items-center gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span><span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span></div></div></section>

      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto"><div className="max-w-6xl mx-auto px-4"><div className="flex">{topics.map(topic => (<button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span></button>))}</div></div></div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4"><span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span><span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span></div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">{question.options.map((option, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'}`}><span className="font-medium mr-2">{idx + 1}.</span>{option}</button>))}</div>
          {showResult && (<div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}><p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>{selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}</p><p className="text-gray-600 mt-2 text-sm">{question.explanation}</p></div>)}
          <div className="flex justify-between mt-6"><button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition flex items-center gap-2">🤖 AI 해설</button><button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed">다음 문제 →</button></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6"><h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4><div className="space-y-3">{topics.map(topic => (<div key={topic.id}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{topic.name}</span><span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-300`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div></div></div>))}</div></div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div><p className="text-sm text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude나 ChatGPT에 붙여넣으세요.</p><div className="bg-gray-50 p-4 rounded-lg mb-4"><pre className="whitespace-pre-wrap text-sm text-gray-700">{aiPrompt}</pre></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('클립보드에 복사되었습니다!'); }} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">📋 프롬프트 복사하기</button></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
