'use client';

import { useState, useEffect } from 'react';

export default function PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<{[key: number]: {correct: number, wrong: number}}>({});
  const [showPrompt, setShowPrompt] = useState(false);

  const questions = [
    {
      q: '최근 클라우드 네이티브 환경에서 마이크로서비스 아키텍처(MSA)의 도입이 확산되고 있다. 다음에 대해 설명하시오.\n\n가. MSA의 개념과 모놀리식 대비 장단점\n나. Service Mesh의 구성요소와 역할\n다. MSA 도입 시 데이터 일관성 확보 전략',
      a: '가. MSA 개념과 비교\n• 정의: 단일 애플리케이션을 독립 배포 가능한 소규모 서비스로 분해\n• 장점: 독립 배포/확장, 기술 다양성, 장애 격리, 팀 자율성\n• 단점: 분산 시스템 복잡성, 네트워크 지연, 운영 오버헤드\n\n나. Service Mesh\n• Data Plane: Sidecar 프록시(Envoy), 트래픽 제어\n• Control Plane: 설정 관리, 서비스 디스커버리\n• 기능: 로드밸런싱, 서킷브레이커, mTLS, 분산 추적\n\n다. 데이터 일관성\n• Saga 패턴: 보상 트랜잭션으로 분산 트랜잭션 처리\n• CQRS: 명령/조회 분리\n• Event Sourcing: 이벤트 시퀀스로 상태 관리\n• Outbox 패턴: 트랜잭션과 메시지 발행 원자성 보장'
    },
    {
      q: 'Kubernetes 기반 컨테이너 오케스트레이션에 대해 다음을 설명하시오.\n\n가. Kubernetes 아키텍처의 핵심 구성요소\n나. Pod 스케줄링 메커니즘\n다. HPA, VPA, Cluster Autoscaler의 차이점과 활용',
      a: '가. K8s 아키텍처\n• Control Plane: API Server(통신 중심), etcd(상태 저장), Scheduler(배치), Controller Manager(상태 관리)\n• Node: kubelet(Pod 관리), kube-proxy(네트워크), Container Runtime\n\n나. 스케줄링\n• Filtering: 조건 불만족 노드 제외(리소스, nodeSelector, Taints)\n• Scoring: 점수 기반 최적 노드 선택\n• 요소: Affinity/Anti-affinity, PodTopologySpread\n\n다. 자동 확장\n• HPA: CPU/메모리/커스텀 메트릭 기반 Pod 수 조절\n• VPA: 리소스 요청/제한 자동 조정\n• CA: 노드 수 자동 조절(Pending Pod 기반)\n• KEDA: 이벤트 기반 확장(큐 길이 등)'
    },
    {
      q: '분산 시스템에서 합의(Consensus) 알고리즘에 대해 설명하시오.\n\n가. Paxos와 Raft 알고리즘의 동작 원리\n나. Byzantine Fault Tolerance(BFT)의 개념\n다. 실제 분산 시스템에서의 적용 사례',
      a: '가. Paxos/Raft\n• Paxos: Prepare-Promise-Accept-Accepted 단계, 과반수 합의\n• Raft: 이해 용이한 설계, Leader-Follower 구조, 로그 복제 기반\n• 공통: 과반수 노드 합의로 결정, 리더 선출 메커니즘\n\n나. BFT\n• Byzantine Fault: 악의적 노드가 다른 응답 전송\n• PBFT: 3f+1 노드로 f개 악의적 노드 허용\n• Pre-prepare→Prepare→Commit 단계\n\n다. 적용 사례\n• etcd, Consul: Raft 기반 분산 저장소\n• ZooKeeper: ZAB(Zookeeper Atomic Broadcast)\n• Tendermint: BFT 기반 블록체인 합의'
    },
    {
      q: 'CPU 캐시 시스템에 대해 다음을 설명하시오.\n\n가. 캐시 계층 구조(L1/L2/L3)와 각 특성\n나. 캐시 일관성(Cache Coherence) 프로토콜\n다. False Sharing 문제와 해결 방안',
      a: '가. 캐시 계층\n• L1: 코어당 전용, 32-64KB, 1-4 사이클, I/D 분리\n• L2: 코어당 전용, 256KB-1MB, 10-20 사이클\n• L3: 코어 공유(LLC), 수~수십MB, 30-50 사이클\n• 포함/비포함 정책, 캐시 라인 크기(64B)\n\n나. 일관성 프로토콜\n• MESI: Modified, Exclusive, Shared, Invalid\n• 스누핑: 버스 기반, 소규모 시스템\n• 디렉토리 기반: 대규모 NUMA 시스템\n\n다. False Sharing\n• 원인: 다른 데이터가 동일 캐시 라인에 위치\n• 증상: 불필요한 캐시 무효화로 성능 저하\n• 해결: 패딩으로 캐시 라인 분리, __cacheline_aligned'
    },
    {
      q: '운영체제 메모리 관리에 대해 설명하시오.\n\n가. 가상 메모리와 페이징 메커니즘\n나. Page Fault 처리 과정\n다. TLB(Translation Lookaside Buffer)의 역할과 최적화',
      a: '가. 가상 메모리/페이징\n• 가상 주소 공간: 프로세스별 독립 주소 공간\n• 페이징: 고정 크기(4KB) 블록으로 분할\n• 페이지 테이블: 가상→물리 주소 매핑\n• 다단계 페이지 테이블: 메모리 절약\n\n나. Page Fault 처리\n• Minor: 메모리에 있으나 매핑 없음(COW)\n• Major: 디스크에서 로드 필요(스왑)\n• 처리: 트랩→커널 핸들러→페이지 로드→테이블 갱신→재실행\n\n다. TLB\n• 역할: 주소 변환 캐시, 페이지 테이블 접근 최소화\n• 구조: ASID로 프로세스 구분, 다단계 TLB\n• 최적화: Huge Page(2MB, 1GB), TLB shootdown 최소화'
    },
    {
      q: '시스템 성능 분석 방법론에 대해 설명하시오.\n\n가. USE 방법론(Utilization, Saturation, Errors)\n나. RED 방법론(Rate, Errors, Duration)\n다. 두 방법론의 적용 영역과 상호 보완성',
      a: '가. USE 방법론\n• Utilization: 리소스 사용 시간 비율(CPU%, Memory%)\n• Saturation: 처리 못한 대기 작업(런큐 길이)\n• Errors: 오류 이벤트 수\n• 적용: 인프라 리소스(CPU, Memory, Network, Storage)\n\n나. RED 방법론\n• Rate: 초당 요청 수(요청 볼륨)\n• Errors: 실패한 요청 비율\n• Duration: 요청 처리 시간 분포(P50, P95, P99)\n• 적용: 서비스/API 수준 모니터링\n\n다. 상호 보완\n• USE: 인프라 관점, 리소스 병목 식별\n• RED: 서비스 관점, 사용자 경험 측정\n• 결합: 서비스 성능 저하→인프라 원인 추적'
    },
    {
      q: 'NoSQL 데이터베이스에 대해 설명하시오.\n\n가. NoSQL의 분류와 각 특성\n나. CAP/PACELC 정리와 NoSQL 선택 기준\n다. LSM-Tree 구조와 Write 최적화',
      a: '가. NoSQL 분류\n• Key-Value: Redis, DynamoDB - 단순 조회 최적화\n• Document: MongoDB, CouchDB - 유연한 스키마\n• Column-Family: Cassandra, HBase - 대용량 분석\n• Graph: Neo4j - 관계 탐색 최적화\n\n나. CAP/PACELC\n• CAP: Consistency, Availability, Partition tolerance 중 2가지\n• PACELC: 분할 시 A/C, 정상 시 L/C 트레이드오프\n• 선택: 일관성→HBase, 가용성→Cassandra, 성능→Redis\n\n다. LSM-Tree\n• 구조: MemTable(인메모리)→SSTable(디스크 정렬 파일)\n• Write: 순차 쓰기로 최적화, WAL로 내구성\n• Compaction: 주기적 병합으로 읽기 성능 유지\n• 사용: LevelDB, RocksDB, Cassandra'
    },
    {
      q: '분산 시스템의 장애 복원력(Resilience) 패턴에 대해 설명하시오.\n\n가. Circuit Breaker 패턴의 동작 원리\n나. Bulkhead 패턴과 격리 전략\n다. Retry와 Exponential Backoff 전략',
      a: '가. Circuit Breaker\n• 상태: Closed(정상)→Open(차단)→Half-Open(테스트)\n• 동작: 실패 임계치 초과 시 Open, 일정 시간 후 테스트\n• 효과: 장애 전파 방지, 빠른 실패 반환\n• 구현: Resilience4j, Hystrix\n\n나. Bulkhead\n• 원리: 선박 격벽처럼 장애 격리\n• 구현: 스레드 풀 분리, 커넥션 풀 분리, 세마포어\n• 설정: 풀 크기, 큐 크기, 거부 정책\n\n다. Retry/Backoff\n• Retry: 일시적 장애에 대한 재시도\n• Exponential Backoff: 재시도 간격 지수 증가(1s, 2s, 4s...)\n• Jitter: 랜덤 요소로 동시 재시도 방지\n• 설정: maxRetries, initialDelay, multiplier'
    },
    {
      q: 'SRE(Site Reliability Engineering)와 SLO 기반 운영에 대해 설명하시오.\n\n가. SLA, SLO, SLI의 개념과 관계\n나. 오류 예산(Error Budget)의 활용\n다. SLO 기반 알림(Alerting) 전략',
      a: '가. SLA/SLO/SLI\n• SLI: 측정 가능한 서비스 품질 지표(가용성, 지연시간)\n• SLO: SLI의 목표 값(99.9% 가용성, P99 < 200ms)\n• SLA: 고객과의 계약, SLO 미달 시 보상 포함\n• 관계: SLI 측정→SLO 평가→SLA 이행\n\n나. 오류 예산\n• 정의: 100% - SLO (예: 99.9% SLO면 0.1% 예산)\n• 활용: 배포 결정, 리스크 균형, 팀 협업\n• 정책: 예산 고갈 시 안정성 우선\n\n다. SLO 알림\n• Multi-window: 단기/장기 윈도우 조합\n• Burn rate: 오류 예산 소비 속도 기반\n• 원칙: 증상 기반 알림, 노이즈 감소'
    },
    {
      q: '프로세스 스케줄링 알고리즘에 대해 설명하시오.\n\n가. CFS(Completely Fair Scheduler)의 동작 원리\n나. 실시간 스케줄링(SCHED_FIFO, SCHED_RR)\n다. 멀티코어 환경에서의 로드 밸런싱',
      a: '가. CFS\n• 원리: vruntime 기반 공정 CPU 시간 분배\n• 구조: Red-Black Tree로 프로세스 관리\n• nice 값: -20~+19, 가중치 결정\n• 타임슬라이스: 동적 계산, 지연 시간 목표\n\n나. 실시간 스케줄링\n• SCHED_FIFO: 우선순위 기반, 선점 없이 실행\n• SCHED_RR: FIFO + 타임슬라이스 라운드로빈\n• SCHED_DEADLINE: EDF(Earliest Deadline First)\n• 특성: 일반 프로세스보다 높은 우선순위\n\n다. 멀티코어 로드 밸런싱\n• 주기적 리밸런싱: sched_domain 계층 구조\n• 워크 스틸링: 유휴 코어가 바쁜 코어에서 작업 가져옴\n• NUMA 인식: 노드 간 마이그레이션 비용 고려'
    },
    {
      q: '파일 시스템의 내부 구조와 최신 기술에 대해 설명하시오.\n\n가. 저널링 파일 시스템의 원리와 모드\n나. Copy-on-Write 파일 시스템(ZFS, Btrfs)\n다. 플래시 스토리지를 위한 파일 시스템 최적화',
      a: '가. 저널링\n• 원리: 변경사항을 저널에 먼저 기록 후 실제 적용\n• 모드: writeback(메타데이터), ordered(순서 보장), journal(전체)\n• 복구: 저널 리플레이로 일관성 복원\n• 예: ext4, XFS\n\n나. CoW 파일 시스템\n• 원리: 수정 시 새 위치에 기록, 원본 유지\n• 장점: 스냅샷, 데이터 무결성, 원자적 업데이트\n• ZFS: 128비트, 풀 기반, 압축, 중복제거\n• Btrfs: 서브볼륨, 온라인 크기 조정\n\n다. 플래시 최적화\n• F2FS: 로그 구조, 노드 기반 설계\n• TRIM/Discard: 미사용 블록 알림\n• 웨어 레벨링: FTL에서 수명 균등화'
    },
    {
      q: '병렬 처리 아키텍처에 대해 설명하시오.\n\n가. Flynn의 분류(SISD, SIMD, MIMD)와 특성\n나. GPU 병렬 처리 아키텍처(CUDA)\n다. 이기종 컴퓨팅(Heterogeneous Computing)',
      a: '가. Flynn 분류\n• SISD: 단일 명령-단일 데이터, 전통적 순차 처리\n• SIMD: 단일 명령-다중 데이터, 벡터 처리(AVX)\n• MIMD: 다중 명령-다중 데이터, 멀티코어\n• SIMT: GPU, 스레드 그룹 동일 명령\n\n나. GPU(CUDA)\n• 구조: SM(Streaming Multiprocessor), 수천 코어\n• 메모리: Global, Shared, Register 계층\n• 실행: Grid→Block→Thread 계층, Warp 단위\n• 활용: 딥러닝, 과학 계산, 이미지 처리\n\n다. 이기종 컴퓨팅\n• 개념: CPU+GPU+가속기 협업\n• 기술: OpenCL, SYCL, oneAPI\n• 고려: 데이터 전송 오버헤드, 작업 분배\n• 사례: Apple Silicon(CPU+GPU+NPU)'
    },
    {
      q: '분산 추적(Distributed Tracing)과 관측성(Observability)에 대해 설명하시오.\n\n가. 분산 추적의 구성요소(Trace, Span, Context)\n나. 관측성의 3가지 기둥(Metrics, Logs, Traces)\n다. OpenTelemetry 표준과 구현',
      a: '가. 분산 추적 구성\n• Trace: 전체 요청 여정, 고유 ID\n• Span: 개별 작업 단위, 부모-자식 관계\n• Context: 전파되는 메타데이터(traceparent)\n• 표준: W3C Trace Context\n\n나. 관측성 3기둥\n• Metrics: 집계 수치, 시계열(Prometheus)\n• Logs: 이벤트 기록, 구조화(JSON)\n• Traces: 요청 흐름 추적\n• 상관관계: TraceID로 연결\n\n다. OpenTelemetry\n• 통합 표준: 벤더 중립적 계측 API/SDK\n• 구성: API, SDK, Collector, Exporters\n• 자동 계측: 에이전트 기반\n• 백엔드: Jaeger, Zipkin, Grafana Tempo'
    },
    {
      q: 'NUMA(Non-Uniform Memory Access) 아키텍처에 대해 설명하시오.\n\n가. NUMA의 개념과 UMA 대비 특성\n나. NUMA 인식 메모리 할당 전략\n다. 애플리케이션 최적화 기법',
      a: '가. NUMA 개념\n• 정의: 메모리 접근 시간이 위치에 따라 다름\n• 구조: CPU-로컬메모리 노드, 인터커넥트 연결\n• UMA 대비: 확장성 우수, 접근 지연 불균일\n• 비율: 로컬 vs 원격 접근 시간 차이(1.5~2배)\n\n나. 메모리 할당\n• 정책: local(기본), bind, interleave, preferred\n• numactl: 정책 지정 실행\n• mbind(): 프로그래밍적 제어\n• 커널: 자동 NUMA 밸런싱(AutoNUMA)\n\n다. 최적화\n• 데이터 지역성: 스레드와 데이터 같은 노드\n• 메모리 바인딩: 프로세스-노드 고정\n• 인터리빙: 균등 분산(대역폭 중시)\n• 모니터링: numastat, perf numa'
    },
    {
      q: 'API Gateway와 인증/인가 아키텍처에 대해 설명하시오.\n\n가. API Gateway의 역할과 구현 패턴\n나. OAuth 2.0/OIDC 기반 인증 흐름\n다. Zero Trust 보안 모델',
      a: '가. API Gateway\n• 역할: 단일 진입점, 라우팅, 인증, 속도 제한, 캐싱\n• 패턴: 에지 게이트웨이, BFF(Backend for Frontend)\n• 구현: Kong, AWS API Gateway, Nginx\n• 고려: 단일 장애점 방지, 성능 병목\n\n나. OAuth 2.0/OIDC\n• OAuth 2.0: 인가 프레임워크, Access Token\n• OIDC: 인증 계층 추가, ID Token(JWT)\n• 흐름: Authorization Code + PKCE (모바일/SPA)\n• 토큰: 단기 Access + 장기 Refresh\n\n다. Zero Trust\n• 원칙: "Never trust, always verify"\n• 구현: 모든 요청 인증/인가, 최소 권한\n• 기술: mTLS, SPIFFE/SPIRE, BeyondCorp\n• 세그먼테이션: 마이크로 경계, 측면 이동 방지'
    },
    {
      q: 'GitOps와 현대적 CI/CD 파이프라인에 대해 설명하시오.\n\n가. GitOps의 원칙과 기존 CI/CD 대비 차이점\n나. ArgoCD와 Flux의 비교\n다. Progressive Delivery 전략',
      a: '가. GitOps 원칙\n• Git을 Single Source of Truth로 사용\n• 선언적 구성, 자동 동기화, 자가 치유\n• vs 기존: Push 기반→Pull 기반\n• 장점: 감사 추적, 롤백 용이, 일관성\n\n나. ArgoCD vs Flux\n• ArgoCD: UI 제공, Application CR, 멀티 클러스터\n• Flux: CNCF, GitOps Toolkit, 경량화\n• 공통: Kubernetes 네이티브, Helm/Kustomize 지원\n• 선택: UI 필요→ArgoCD, 경량→Flux\n\n다. Progressive Delivery\n• Canary: 일부 트래픽으로 테스트, 점진 확대\n• Blue-Green: 두 환경 준비, 트래픽 전환\n• Feature Flags: 코드 배포와 기능 릴리스 분리\n• 도구: Argo Rollouts, Flagger, Istio'
    },
    {
      q: '시스템 보안 강화에 대해 설명하시오.\n\n가. 커널 보안 메커니즘(SELinux, AppArmor)\n나. 컨테이너 보안과 격리 기술\n다. 공급망 보안(Supply Chain Security)',
      a: '가. 커널 보안\n• SELinux: MAC(강제 접근 제어), 정책 기반\n• AppArmor: 프로파일 기반, 경로 기반 제어\n• seccomp: 시스템 콜 필터링\n• Capabilities: root 권한 세분화\n\n나. 컨테이너 보안\n• 격리: namespaces, cgroups, seccomp\n• 이미지: 취약점 스캔(Trivy), 서명(Cosign)\n• 런타임: gVisor(사용자 공간 커널), Kata(VM)\n• 정책: OPA/Gatekeeper, Kyverno\n\n다. 공급망 보안\n• SBOM: 소프트웨어 구성 목록\n• SLSA: 빌드 무결성 프레임워크\n• Sigstore: 서명/검증 인프라\n• 대응: 의존성 검사, 빌드 재현성'
    },
    {
      q: '데이터베이스 복제와 고가용성에 대해 설명하시오.\n\n가. 동기/비동기/반동기 복제 방식 비교\n나. 자동 장애 조치(Failover) 메커니즘\n다. 멀티 마스터 복제와 충돌 해결',
      a: '가. 복제 방식\n• 동기: 모든 복제본 확인 후 응답, 강한 일관성, 높은 지연\n• 비동기: 즉시 응답, 백그라운드 복제, 데이터 손실 가능\n• 반동기: 일부(1개) 복제본 확인 후 응답\n• 선택: 금융→동기, 로그→비동기, 일반→반동기\n\n나. Failover\n• 감지: 하트비트, 헬스체크\n• 선출: 동기 복제본 우선, 최신 데이터\n• 전환: VIP 이동, DNS 갱신\n• 도구: Patroni(PostgreSQL), MHA(MySQL)\n\n다. 멀티 마스터\n• 장점: 쓰기 확장, 지역 분산\n• 충돌: Last-Write-Wins, 버전 벡터, CRDT\n• 예: Galera Cluster, CockroachDB\n• 고려: 충돌 해결 복잡성, 네트워크 지연'
    },
    {
      q: '메시지 큐와 이벤트 스트리밍에 대해 설명하시오.\n\n가. RabbitMQ와 Kafka의 아키텍처 차이\n나. Kafka의 파티셔닝과 컨슈머 그룹\n다. Exactly-Once 처리 보장 방법',
      a: '가. RabbitMQ vs Kafka\n• RabbitMQ: 브로커 중심, 메시지 라우팅, AMQP\n• Kafka: 로그 기반, 파티션 분산, 높은 처리량\n• 선택: 복잡한 라우팅→RabbitMQ, 스트리밍→Kafka\n• 모델: Push vs Pull 소비\n\n나. Kafka 파티셔닝\n• 파티션: 토픽 분할, 병렬 처리 단위\n• 키: 동일 키→동일 파티션(순서 보장)\n• 컨슈머 그룹: 파티션별 한 컨슈머 할당\n• 리밸런싱: 컨슈머 추가/제거 시 재분배\n\n다. Exactly-Once\n• 문제: at-least-once에서 중복 발생\n• Kafka: 트랜잭션 API, 멱등성 프로듀서\n• 컨슈머: 멱등성 처리, Outbox 패턴\n• 대안: 멱등성 설계로 중복 허용'
    },
    {
      q: '성능 테스트와 용량 계획에 대해 설명하시오.\n\n가. 부하 테스트의 종류와 수행 방법\n나. Little의 법칙을 활용한 용량 계획\n다. 클라우드 환경에서의 비용 최적화',
      a: '가. 부하 테스트\n• Load Test: 예상 부하 검증\n• Stress Test: 한계점 발견\n• Spike Test: 급격한 부하 증가\n• Soak Test: 장시간 안정성\n• 도구: k6, JMeter, Gatling, Locust\n\n나. Little의 법칙\n• 공식: L = λW (L: 시스템 내 요청, λ: 도착률, W: 체류 시간)\n• 활용: 동시 사용자 수 = TPS × 응답시간\n• 예: 1000 TPS, 0.1초 = 100 동시 요청\n• 스레드 풀, 커넥션 풀 크기 결정\n\n다. 클라우드 비용\n• 인스턴스: RI, Spot, Savings Plans\n• 오토스케일링: 수요 기반 확장/축소\n• 적정 크기: 리소스 사용률 분석\n• 관측: 비용 태깅, FinOps(Kubecost)'
    },
    {
      q: '락(Lock)과 동시성 제어에 대해 설명하시오.\n\n가. 락의 종류(Mutex, RWLock, Spinlock)\n나. 교착상태(Deadlock)의 조건과 방지\n다. Lock-free 자료구조와 CAS 연산',
      a: '가. 락 종류\n• Mutex: 상호 배제, 한 스레드만 접근\n• RWLock: 읽기 공유, 쓰기 배타\n• Spinlock: 대기 중 CPU 점유, 짧은 임계 영역\n• Semaphore: 카운팅 기반, N개 허용\n\n나. 교착상태\n• 조건: 상호배제, 점유대기, 비선점, 순환대기\n• 예방: 조건 하나 제거(순서화, 타임아웃)\n• 회피: 은행원 알고리즘, 자원 할당 그래프\n• 탐지: 주기적 검사, 타임아웃\n\n다. Lock-free\n• CAS: Compare-And-Swap 원자 연산\n• ABA 문제: 버전 태그로 해결\n• 자료구조: Lock-free Queue, Stack\n• 장점: 교착 없음, 높은 확장성\n• 구현: AtomicInteger, concurrent 패키지'
    },
    {
      q: '시스템 콜과 커널 인터페이스에 대해 설명하시오.\n\n가. 시스템 콜의 실행 과정\n나. io_uring의 동작 원리와 성능 이점\n다. eBPF의 개념과 활용 사례',
      a: '가. 시스템 콜\n• 과정: 사용자 코드→트랩→커널 모드→핸들러→복귀\n• 오버헤드: 컨텍스트 전환, 캐시 미스\n• 최적화: vDSO(가상 시스템 콜)\n• 예: read(), write(), open(), close()\n\n나. io_uring\n• 원리: 제출 큐(SQ)/완료 큐(CQ) 링 버퍼 공유\n• 장점: 시스템 콜 최소화, 배치 처리, 폴링 모드\n• 기능: 비동기 I/O, 파일/네트워크/타이머\n• 성능: epoll 대비 높은 처리량\n\n다. eBPF\n• 개념: 커널 내 안전한 프로그램 실행\n• 검증: Verifier로 안전성 검사\n• 활용: 네트워킹(XDP), 추적(bpftrace), 보안(Cilium)\n• 장점: 커널 수정 없이 기능 확장'
    },
    {
      q: '네트워크 프로토콜 최적화에 대해 설명하시오.\n\n가. TCP 혼잡 제어 알고리즘(CUBIC, BBR)\n나. HTTP/2와 HTTP/3(QUIC)의 특징\n다. 서비스 메시 네트워킹(Istio, Envoy)',
      a: '가. TCP 혼잡 제어\n• CUBIC: 손실 기반, 3차 함수 윈도우 증가\n• BBR: 대역폭 기반, 지연 측정, 버퍼 최소화\n• 차이: CUBIC(안정적), BBR(고대역폭, 저지연)\n• 선택: 일반→CUBIC, 고속 네트워크→BBR\n\n나. HTTP 발전\n• HTTP/2: 멀티플렉싱, 헤더 압축, 서버 푸시\n• QUIC/HTTP/3: UDP 기반, 0-RTT, 연결 마이그레이션\n• 장점: HoL 블로킹 해결, 빠른 연결\n• 적용: CDN, 모바일 환경\n\n다. 서비스 메시\n• Istio: Control Plane(istiod), Envoy sidecar\n• 기능: mTLS, 트래픽 제어, 관측성\n• Envoy: 고성능 프록시, xDS API\n• 대안: Linkerd(경량), Cilium(eBPF)'
    },
    {
      q: '인메모리 데이터베이스와 캐싱에 대해 설명하시오.\n\n가. Redis 아키텍처와 데이터 구조\n나. 캐시 전략(Look-aside, Write-through 등)\n다. 캐시 일관성과 무효화 전략',
      a: '가. Redis\n• 아키텍처: 싱글 스레드, 이벤트 루프, RDB/AOF 영속화\n• 데이터 구조: String, List, Set, Hash, Sorted Set\n• 클러스터: 16384 해시 슬롯 샤딩, 복제본\n• 활용: 캐시, 세션, 순위표, 발행-구독\n\n나. 캐시 전략\n• Cache-aside: 앱이 캐시 관리, 가장 일반적\n• Read-through: 캐시가 DB 조회 대행\n• Write-through: 캐시와 DB 동시 쓰기\n• Write-behind: 캐시 쓰기 후 비동기 DB 반영\n\n다. 일관성/무효화\n• TTL: 시간 기반 만료\n• 이벤트 기반: DB 변경 시 무효화\n• 버전 기반: 데이터 버전으로 검증\n• 주의: Cache stampede, 이중 삭제'
    },
    {
      q: '마이그레이션과 현대화 전략에 대해 설명하시오.\n\n가. Strangler Fig 패턴을 활용한 점진적 마이그레이션\n나. 데이터베이스 마이그레이션 전략\n다. 클라우드 마이그레이션 접근법(6R)',
      a: '가. Strangler Fig\n• 개념: 점진적으로 레거시 시스템 교체\n• 단계: 파사드→새 기능 신규 시스템→점진적 이전\n• 구현: API Gateway 라우팅 제어\n• 장점: 리스크 감소, 지속 운영, 학습 기회\n\n나. DB 마이그레이션\n• 전략: 빅뱅 vs 점진적 마이그레이션\n• 도구: AWS DMS, Debezium(CDC)\n• 검증: 데이터 일관성 검사, 성능 테스트\n• 롤백: 동기화 유지, 전환 후 관찰 기간\n\n다. 6R\n• Rehost: Lift and Shift\n• Replatform: 일부 최적화\n• Repurchase: SaaS 전환\n• Refactor: 클라우드 네이티브 재구축\n• Retire: 폐기\n• Retain: 유지'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-system-pro-practical-scores');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const saveScore = (correct: boolean) => {
    const newScores = { ...scores, [currentQuestion]: { correct: correct ? 1 : 0, wrong: correct ? 0 : 1 } };
    setScores(newScores);
    localStorage.setItem('computer-system-pro-practical-scores', JSON.stringify(newScores));
  };

  const currentQ = questions[currentQuestion];
  const answeredQuestions = Object.keys(scores).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">홈</a><span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-emerald-600">IT·정보통신</a><span className="text-gray-300">›</span>
            <a href="/category/it/computer-system-pro" className="text-gray-600 hover:text-emerald-600">컴퓨터시스템응용기술사</a><span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">실전 대비</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🎯</span></div>
            <div><h1 className="text-2xl font-bold">실전 대비 종합문제</h1><p className="text-emerald-100">컴퓨터시스템응용기술사 서술형 예상 문제 {questions.length}선</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">진행률: {answeredQuestions}/{questions.length} ({Math.round(answeredQuestions/questions.length*100)}%)</div>
            <button onClick={() => setShowPrompt(true)} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">🤖 AI 학습 도우미</button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-4">문제 목록</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => (
                  <button key={idx} onClick={() => { setCurrentQuestion(idx); setShowAnswer(false); }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${currentQuestion === idx ? 'bg-emerald-500 text-white' : scores[idx] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{idx + 1}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">서술형 문제 {currentQuestion + 1}</span>
                <span className="text-sm text-gray-500">예상 배점: 25점</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 whitespace-pre-line">{currentQ.q}</h3>
                {showAnswer ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-800 mb-2">모범 답안 구성</h4>
                    <p className="text-gray-700 whitespace-pre-line">{currentQ.a}</p>
                  </div>
                ) : (
                  <button onClick={() => setShowAnswer(true)} className="w-full py-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">답안 보기</button>
                )}
              </div>

              {showAnswer && (
                <div className="flex gap-4 mb-6">
                  <button onClick={() => { saveScore(true); if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setShowAnswer(false); } }}
                    className="flex-1 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">✓ 이해 완료</button>
                  <button onClick={() => { saveScore(false); if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setShowAnswer(false); } }}
                    className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">✗ 복습 필요</button>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setShowAnswer(false); } }}
                  disabled={currentQuestion === 0} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-50">← 이전</button>
                <button onClick={() => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setShowAnswer(false); } }}
                  disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50">다음 →</button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-gray-800 mb-4">📝 기술사 서술형 답안 작성 팁</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-emerald-600 mb-2">답안 구성</h4>
                  <ul className="space-y-1">
                    <li>• 서론-본론-결론 구조</li>
                    <li>• 핵심 개념 먼저 정의</li>
                    <li>• 도표와 다이어그램 활용</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-teal-600 mb-2">차별화 전략</h4>
                  <ul className="space-y-1">
                    <li>• 실무 경험 사례 제시</li>
                    <li>• 최신 기술 트렌드 언급</li>
                    <li>• 장단점과 트레이드오프 분석</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowPrompt(false)} className="text-gray-400 hover:text-gray-600">✕</button></div>
            <p className="text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude에게 질문하세요.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <code className="text-sm text-gray-800 whitespace-pre-wrap">컴퓨터시스템응용기술사 시험 대비로 다음 문제에 대한 모범 답안을 작성해주세요: {currentQ.q.substring(0, 200)}... 다음 형식으로 답안을 구성해주세요: 1. 서론 (개념 정의, 배경, 중요성) 2. 본론 (세부 내용, 비교 분석, 기술적 상세) 3. 결론 (요약, 발전 방향, 실무 적용) 도표나 다이어그램도 텍스트로 표현해주세요.</code>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`컴퓨터시스템응용기술사 시험 대비로 다음 문제에 대한 모범 답안을 작성해주세요:\n\n${currentQ.q}`); }}
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">📋 프롬프트 복사</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
