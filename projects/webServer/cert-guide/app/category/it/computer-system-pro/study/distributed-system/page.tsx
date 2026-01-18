'use client';

import { useState, useEffect } from 'react';

export default function DistributedSystemPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<{[key: string]: {correct: number, wrong: number}}>({});
  const [showPrompt, setShowPrompt] = useState(false);

  const topics = [
    {
      name: '분산 아키텍처',
      icon: '🏛️',
      questions: [
        { q: '분산 시스템의 투명성(Transparency) 8가지를 설명하시오.', a: '① 접근 투명성: 로컬/원격 리소스 동일 접근 ② 위치 투명성: 물리적 위치 은닉 ③ 이주 투명성: 리소스 이동 인식 불필요 ④ 재배치 투명성: 사용 중 이동 가능 ⑤ 복제 투명성: 복제본 존재 은닉 ⑥ 동시성 투명성: 동시 접근 조율 ⑦ 장애 투명성: 장애 복구 은닉 ⑧ 영속성 투명성: 메모리/디스크 구분 불필요' },
        { q: 'CAP 정리(Theorem)의 3가지 속성과 한계를 설명하시오.', a: '① Consistency(일관성): 모든 노드가 동일 데이터 조회 ② Availability(가용성): 모든 요청에 응답 보장 ③ Partition Tolerance(분할 내성): 네트워크 분할에도 동작. 분산 시스템에서 3가지 동시 만족 불가, 네트워크 분할 상황에서 CP(일관성) 또는 AP(가용성) 중 선택 필요. PACELC로 확장: 분할 시 A/C, 정상 시 L(latency)/C 트레이드오프' },
        { q: 'PACELC 정리를 CAP과 비교하여 설명하시오.', a: 'CAP 확장 모델. Partition 상황: A(가용성) vs C(일관성), Else(정상): L(지연시간) vs C(일관성). 예시: PA/EL(Dynamo, Cassandra) - 가용성, 낮은 지연 우선, PC/EC(HBase, BigTable) - 일관성 우선, PA/EC(MongoDB) - 분할 시 가용성, 정상 시 일관성' },
        { q: '마이크로서비스 아키텍처(MSA)의 특징과 장단점을 설명하시오.', a: '특징: 독립 배포 가능한 소규모 서비스, 서비스별 DB 분리, API 기반 통신, 폴리글랏 프로그래밍. 장점: 독립적 확장/배포, 기술 다양성, 장애 격리, 팀 자율성. 단점: 분산 시스템 복잡성, 네트워크 지연, 데이터 일관성 어려움, 운영 오버헤드, 디버깅 어려움' },
        { q: '서비스 메시(Service Mesh)의 개념과 구성요소를 설명하시오.', a: '정의: 마이크로서비스 간 통신을 관리하는 인프라 계층. 구성: ① Data Plane: 사이드카 프록시(Envoy), 트래픽 제어 ② Control Plane: 설정 관리, 서비스 디스커버리. 기능: 로드밸런싱, 서킷 브레이커, mTLS, 분산 추적, 메트릭 수집. 대표: Istio, Linkerd, Consul Connect' },
        { q: 'API Gateway 패턴의 역할과 구현 시 고려사항을 설명하시오.', a: '역할: 클라이언트 단일 진입점, 라우팅, 인증/인가, 속도 제한, 로드밸런싱, 캐싱, 프로토콜 변환. 고려사항: 단일 장애점 방지(HA 구성), 성능 병목 방지, 적절한 타임아웃, 모니터링/로깅. 구현: Kong, AWS API Gateway, Nginx, Zuul' },
        { q: '이벤트 드리븐 아키텍처(EDA)의 패턴과 적용 사례를 설명하시오.', a: '패턴: ① 이벤트 알림: 상태 변경 알림만 ② 이벤트 캐리드 상태 전송: 데이터 포함 ③ 이벤트 소싱: 상태를 이벤트 시퀀스로 저장. 구성: Producer, Broker(Kafka, RabbitMQ), Consumer. 장점: 느슨한 결합, 확장성, 비동기 처리. 사례: 주문처리, 실시간 분석, IoT 데이터 수집' },
        { q: 'CQRS(Command Query Responsibility Segregation) 패턴을 설명하시오.', a: '정의: 명령(쓰기)과 조회(읽기) 모델 분리. 구성: Command Model(정규화, 트랜잭션), Query Model(비정규화, 읽기 최적화). 장점: 독립 확장, 최적화된 스키마, 복잡한 도메인 처리. 단점: 복잡성 증가, 데이터 동기화 지연. 이벤트 소싱과 함께 사용 시 시너지' },
        { q: 'Saga 패턴과 분산 트랜잭션 처리 방법을 설명하시오.', a: '정의: 로컬 트랜잭션 시퀀스로 분산 트랜잭션 구현. 종류: ① Choreography: 이벤트 기반, 서비스간 직접 통신 ② Orchestration: 중앙 조정자가 순서 제어. 보상 트랜잭션: 실패 시 이전 작업 롤백. 장점: 장기 실행 트랜잭션, 서비스 자율성. 단점: 최종 일관성, 복잡한 에러 처리' },
        { q: '서킷 브레이커(Circuit Breaker) 패턴의 동작 원리를 설명하시오.', a: '목적: 장애 전파 방지, 빠른 실패 반환. 상태: ① Closed: 정상 동작, 실패 카운트 ② Open: 임계치 초과 시, 즉시 실패 반환 ③ Half-Open: 일정 시간 후 테스트 요청. 설정: 실패 임계치, 타임아웃, 재시도 간격. 구현: Hystrix, Resilience4j. 함께 사용: Retry, Fallback, Bulkhead' }
      ]
    },
    {
      name: '합의 알고리즘',
      icon: '🤝',
      questions: [
        { q: 'Paxos 알고리즘의 동작 과정과 특징을 설명하시오.', a: '역할: Proposer(제안), Acceptor(수락), Learner(학습). 단계: ① Prepare: Proposer가 번호 n으로 prepare 요청 ② Promise: Acceptor가 n보다 작은 제안 거부 약속 ③ Accept: 과반수 promise 시 값 제안 ④ Accepted: 과반수 수락 시 합의 완료. 특징: 안전성 보장, 활동성은 보장 안 됨(리더 경쟁 시). Multi-Paxos로 성능 개선' },
        { q: 'Raft 알고리즘을 Paxos와 비교하여 설명하시오.', a: 'Raft: 이해하기 쉬운 합의 알고리즘. 구성: Leader, Follower, Candidate. 동작: ① Leader Election: 타임아웃 시 후보가 투표 요청 ② Log Replication: 리더가 로그 복제 ③ Safety: 커밋된 로그 보존. Paxos 대비: 리더 기반으로 단순화, 로그 연속성 보장, 구현 용이. etcd, Consul에서 사용' },
        { q: 'Byzantine Fault Tolerance(BFT)와 PBFT를 설명하시오.', a: 'Byzantine Fault: 악의적 노드가 다른 응답 전송. BFT: 3f+1 노드로 f개 악의적 노드 허용. PBFT 단계: ① Pre-prepare: 리더가 요청 전파 ② Prepare: 2f+1 노드 동의 ③ Commit: 2f+1 커밋 메시지로 실행. 특징: O(n²) 메시지 복잡도, 소규모 네트워크 적합. 블록체인: Tendermint에서 사용' },
        { q: '분산 시스템의 리더 선출(Leader Election) 알고리즘을 설명하시오.', a: '목적: 조율자 선출로 분산 작업 관리. 알고리즘: ① Bully: 가장 높은 ID가 리더, 실패 감지 시 재선출 ② Ring: 순환 구조에서 메시지 전달 ③ Raft 방식: 랜덤 타임아웃, 과반수 투표. 고려사항: Split-brain 방지, 선출 시간, 네트워크 분할 대응. ZooKeeper: ZAB(Zookeeper Atomic Broadcast) 사용' },
        { q: 'Quorum 기반 복제 시스템의 동작 원리를 설명하시오.', a: '정의: 읽기/쓰기에 필요한 최소 노드 수. 공식: W + R > N (N: 전체 복제본, W: 쓰기 쿼럼, R: 읽기 쿼럼). 예시: N=3, W=2, R=2 - 강한 일관성. 설정: W=N, R=1 - 쓰기 강조, W=1, R=N - 읽기 강조. 장점: 가용성과 일관성 트레이드오프 조절. Cassandra, Riak에서 사용' },
        { q: '벡터 클럭(Vector Clock)의 개념과 활용을 설명하시오.', a: '목적: 분산 시스템에서 이벤트 인과관계 파악. 구조: 각 노드마다 논리 클럭 배열 유지. 규칙: 로컬 이벤트 시 자신 클럭 증가, 메시지 수신 시 max 후 자신 증가. 비교: V1 < V2 (모든 원소가 작거나 같고 최소 하나가 작음), 동시 이벤트는 비교 불가. 활용: 충돌 감지, 인과적 일관성, Dynamo에서 버전 관리' },
        { q: 'Gossip 프로토콜의 동작 방식과 사용 사례를 설명하시오.', a: '원리: 노드가 랜덤 피어에게 주기적으로 상태 전파(역학적 전염 모델). 특징: 확장성, 장애 내성, 최종 일관성. 종류: ① Anti-entropy: 전체 상태 동기화 ② Rumor mongering: 새 정보만 전파. 사용: 멤버십 관리(Consul), 장애 감지(Cassandra), 상태 전파. 장점: 중앙 조율자 불필요, 네트워크 장애 내성' },
        { q: 'Crdt(Conflict-free Replicated Data Type)의 개념과 종류를 설명하시오.', a: '정의: 충돌 없이 복제 가능한 데이터 타입. 특성: 교환/결합/멱등 법칙 만족. 종류: ① G-Counter: 증가만 가능한 카운터 ② PN-Counter: 증가/감소 카운터 ③ G-Set: 추가만 가능한 집합 ④ OR-Set: 추가/제거 가능 ⑤ LWW-Register: Last-Writer-Wins. 장점: 동기화 없이 병합, 오프라인 지원. 사용: Redis, Riak' },
        { q: '2PC(Two-Phase Commit)의 문제점과 대안을 설명하시오.', a: '2PC 단계: ① Prepare: 코디네이터가 준비 요청 ② Commit/Abort: 전체 동의 시 커밋. 문제점: 블로킹(코디네이터 장애 시), 단일 장애점, 성능 저하. 대안: ① 3PC: 추가 단계로 블로킹 감소 ② Saga: 로컬 트랜잭션 시퀀스 ③ TCC(Try-Confirm-Cancel): 예약-확정-취소. 현대적 접근: 최종 일관성 + 보상 트랜잭션' },
        { q: 'Lamport 논리 클럭과 한계를 설명하시오.', a: '목적: 분산 시스템 이벤트 순서 결정. 규칙: ① 로컬 이벤트마다 클럭 증가 ② 메시지 전송 시 클럭 포함 ③ 수신 시 max(local, received)+1. 특성: a→b이면 C(a) < C(b), 역은 성립 안 함. 한계: 인과관계 파악 불가(C(a) < C(b)여도 동시 이벤트 가능). 해결: 벡터 클럭 사용' }
      ]
    },
    {
      name: '분산 스토리지',
      icon: '💾',
      questions: [
        { q: '분산 파일 시스템(HDFS)의 아키텍처를 설명하시오.', a: 'HDFS 구성: ① NameNode: 메타데이터 관리, 네임스페이스, 블록 위치 ② DataNode: 실제 데이터 저장, 블록 리포트 ③ Secondary NameNode: 체크포인트 생성. 특징: 대용량 파일 최적화(128MB 블록), Write-once-read-many, 랙 인식 복제(기본 3복제). 장애 대응: 하트비트, 블록 리포트, 자동 복제' },
        { q: 'Consistent Hashing의 원리와 가상 노드를 설명하시오.', a: '원리: 해시 링에 노드와 데이터 배치, 시계방향 첫 노드에 저장. 장점: 노드 추가/제거 시 K/N 데이터만 재배치. 가상 노드(VNode): 물리 노드당 여러 가상 노드 할당. 효과: 부하 분산 개선, 이기종 용량 지원, 장애 시 부하 분산. Dynamo, Cassandra, Redis Cluster에서 사용' },
        { q: 'NoSQL 데이터베이스의 분류와 특징을 설명하시오.', a: '분류: ① Key-Value: Redis, DynamoDB - 단순 조회 최적화 ② Document: MongoDB, CouchDB - 유연한 스키마 ③ Column-Family: Cassandra, HBase - 대용량 분석 ④ Graph: Neo4j, Neptune - 관계 탐색. 공통 특징: 수평 확장, 유연한 스키마, 최종 일관성 지원. 선택 기준: 데이터 모델, 일관성 요구, 확장성' },
        { q: 'LSM-Tree(Log-Structured Merge-Tree) 구조를 설명하시오.', a: '구조: ① MemTable: 인메모리 정렬 구조 ② WAL: 내구성 로그 ③ SSTable: 불변 정렬 파일. 동작: 쓰기→MemTable, 가득 차면 SSTable로 플러시, 주기적 Compaction. 장점: 순차 쓰기로 쓰기 최적화, SSD 친화적. 단점: 읽기 시 여러 레벨 검색, 쓰기 증폭. 사용: LevelDB, RocksDB, Cassandra' },
        { q: 'Sharding 전략과 리샤딩 문제를 설명하시오.', a: '전략: ① Range Sharding: 키 범위로 분할, 범위 쿼리 효율 ② Hash Sharding: 해시값으로 분할, 균등 분포 ③ Directory Sharding: 룩업 테이블 사용. 리샤딩 문제: 데이터 이동 비용, 서비스 중단, 불균형 발생. 해결: Consistent Hashing, 사전 파티셔닝, 온라인 리샤딩(MongoDB balancer)' },
        { q: '분산 캐시 시스템(Redis Cluster)의 동작을 설명하시오.', a: 'Redis Cluster: 16384개 해시 슬롯으로 샤딩. 구성: 마스터-복제본 구조, Gossip으로 클러스터 상태 공유. 동작: CRC16(key) % 16384로 슬롯 결정, MOVED/ASK 리다이렉션. 장애 조치: 마스터 장애 시 복제본 자동 승격. 한계: 멀티키 연산은 동일 슬롯만, 트랜잭션 제한' },
        { q: 'Object Storage와 Block Storage의 차이를 설명하시오.', a: 'Block Storage: 고정 크기 블록, iSCSI/FC, 파일시스템 필요, 낮은 지연, DB/VM에 적합. Object Storage: 가변 크기 객체+메타데이터, HTTP API, 플랫 네임스페이스, 높은 확장성, 비정형 데이터에 적합. 예시: Block - EBS, SAN / Object - S3, MinIO. 선택: 성능→Block, 확장성/비용→Object' },
        { q: '데이터 복제 방식(동기/비동기/반동기)을 비교하시오.', a: '동기 복제: 모든 복제본 확인 후 응답, 강한 일관성, 높은 지연. 비동기 복제: 즉시 응답, 백그라운드 복제, 데이터 손실 가능. 반동기 복제: 일부(예: 1개) 복제본 확인 후 응답, 균형. 선택: 금융→동기, 로그→비동기, 일반→반동기. MySQL: semi-sync replication 지원' },
        { q: 'Time-Series 데이터베이스의 특징과 최적화를 설명하시오.', a: '특징: 시간 기반 인덱싱, 대량 쓰기, 시간 범위 쿼리, 집계 함수. 최적화: ① 시간 기반 파티셔닝 ② 압축(Delta, Gorilla) ③ 다운샘플링 ④ TTL 기반 자동 삭제 ⑤ 배치 쓰기. 대표: InfluxDB, TimescaleDB, Prometheus. 사용: 모니터링, IoT, 금융 시계열' },
        { q: 'CDC(Change Data Capture)의 구현 방식을 설명하시오.', a: '정의: DB 변경사항 캡처 및 전파. 방식: ① 로그 기반: WAL/binlog 파싱, 낮은 오버헤드 ② 트리거 기반: 변경 시 트리거 실행 ③ 타임스탬프 기반: 변경 시간 컬럼 조회. 도구: Debezium, Maxwell, AWS DMS. 활용: 데이터 동기화, 이벤트 스트리밍, 캐시 무효화, 검색 인덱스 동기화' }
      ]
    },
    {
      name: '컨테이너 오케스트레이션',
      icon: '🐳',
      questions: [
        { q: 'Kubernetes 아키텍처의 핵심 구성요소를 설명하시오.', a: 'Control Plane: ① API Server: 모든 통신 중심 ② etcd: 클러스터 상태 저장 ③ Scheduler: Pod 배치 결정 ④ Controller Manager: 상태 관리. Node: ① kubelet: Pod 관리 에이전트 ② kube-proxy: 네트워크 프록시 ③ Container Runtime: containerd, CRI-O. 추가: CoreDNS, CNI 플러그인' },
        { q: 'Pod의 생명주기와 상태를 설명하시오.', a: '생명주기: Pending→Running→Succeeded/Failed. 상태: ① Pending: 스케줄링/이미지 풀 대기 ② Running: 컨테이너 실행 중 ③ Succeeded: 정상 종료 ④ Failed: 비정상 종료 ⑤ Unknown: 상태 확인 불가. 조건: PodScheduled, Initialized, ContainersReady, Ready. Probe: livenessProbe, readinessProbe, startupProbe' },
        { q: 'Kubernetes 네트워킹 모델과 Service 타입을 설명하시오.', a: '네트워크 모델: 모든 Pod 상호 통신, NAT 없는 플랫 네트워크. CNI: Calico, Flannel, Weave. Service 타입: ① ClusterIP: 클러스터 내부 접근 ② NodePort: 노드 포트로 외부 접근 ③ LoadBalancer: 클라우드 LB 연동 ④ ExternalName: 외부 DNS 매핑. Ingress: L7 라우팅, TLS 종료' },
        { q: 'Kubernetes 스케줄링 메커니즘을 설명하시오.', a: '단계: ① Filtering: 조건 불만족 노드 제외 ② Scoring: 점수 기반 최적 노드 선택. 요소: 리소스 요청/제한, nodeSelector, Affinity/Anti-affinity, Taints/Tolerations, PodTopologySpread. 우선순위: PriorityClass로 스케줄링 순서 결정. 커스텀: Scheduler Extender, 멀티 스케줄러' },
        { q: 'StatefulSet과 Deployment의 차이를 설명하시오.', a: 'Deployment: 무상태 앱, 임의 Pod 이름, 동시 업데이트, 공유 스토리지. StatefulSet: 상태 유지 앱, 순서 있는 이름(pod-0,1,2), 순차 생성/삭제, 개별 PVC. StatefulSet 특징: 안정적 네트워크 ID, 순서 보장, Headless Service로 개별 접근. 사용: DB, 캐시 클러스터, 메시지 큐' },
        { q: 'Kubernetes 스토리지(PV, PVC, StorageClass)를 설명하시오.', a: 'PersistentVolume(PV): 클러스터 스토리지 리소스. PersistentVolumeClaim(PVC): 스토리지 요청. StorageClass: 동적 프로비저닝 정의. 접근 모드: ReadWriteOnce, ReadOnlyMany, ReadWriteMany. Reclaim Policy: Retain, Delete, Recycle. CSI(Container Storage Interface): 표준 스토리지 인터페이스' },
        { q: 'Kubernetes 보안 메커니즘을 설명하시오.', a: '인증: X.509, 토큰, OIDC. 인가: RBAC(Role, ClusterRole, Binding). Admission Control: 요청 검증/변경. Pod 보안: SecurityContext, PodSecurityPolicy→PodSecurityStandard. 네트워크: NetworkPolicy로 트래픽 제어. 시크릿: etcd 암호화, External Secrets Operator. 서비스 계정: Pod별 권한 분리' },
        { q: 'Kubernetes 자동 확장(HPA, VPA, CA)을 설명하시오.', a: 'HPA(Horizontal Pod Autoscaler): CPU/메모리/커스텀 메트릭 기반 Pod 수 조절. VPA(Vertical Pod Autoscaler): 리소스 요청/제한 자동 조정. CA(Cluster Autoscaler): 노드 수 자동 조절. KEDA: 이벤트 기반 확장(큐 길이 등). 설정: minReplicas, maxReplicas, targetUtilization. 쿨다운: --horizontal-pod-autoscaler-downscale-stabilization' },
        { q: 'Kubernetes 배포 전략을 비교하시오.', a: 'Rolling Update: 점진적 교체, 무중단, 기본 전략. Recreate: 전체 종료 후 생성, 다운타임 발생. Blue-Green: 두 환경 준비, 트래픽 전환, 빠른 롤백. Canary: 일부 트래픽으로 테스트, 점진적 확대. A/B Testing: 특정 조건 사용자에게 배포. 도구: Argo Rollouts, Flagger, Istio' },
        { q: 'GitOps와 Kubernetes 배포 자동화를 설명하시오.', a: '정의: Git을 단일 진실 소스로 인프라/앱 관리. 원칙: 선언적 구성, Git 버전 관리, 자동 동기화, 자가 치유. 도구: ① ArgoCD: Pull 기반, UI 제공 ② Flux: CNCF 프로젝트, GitOps Toolkit ③ Jenkins X: CI/CD 통합. 장점: 감사 추적, 롤백 용이, 일관성, 협업 개선' }
      ]
    },
    {
      name: '분산 시스템 패턴',
      icon: '🔧',
      questions: [
        { q: 'Sidecar 패턴의 개념과 활용 사례를 설명하시오.', a: '정의: 메인 컨테이너와 함께 배포되는 보조 컨테이너. 특징: 동일 네트워크/스토리지 공유, 독립적 생명주기. 활용: ① 로깅 에이전트(Fluentd) ② 프록시(Envoy) ③ 설정 갱신 ④ 보안(인증서 관리). 장점: 관심사 분리, 재사용, 독립 업데이트. 서비스 메시의 핵심 패턴' },
        { q: 'Ambassador 패턴과 Adapter 패턴을 비교하시오.', a: 'Ambassador: 외부 서비스 연결 대행. 역할: 서킷 브레이커, 재시도, 로깅. 예: 원격 서비스 호출 래핑. Adapter: 출력 표준화. 역할: 다양한 형식을 통일된 인터페이스로 변환. 예: 로그 형식 변환, 메트릭 표준화. 공통점: 사이드카로 구현, 메인 앱 수정 없이 기능 추가' },
        { q: 'Bulkhead 패턴의 원리와 구현 방법을 설명하시오.', a: '원리: 선박 격벽처럼 장애 격리, 전체 시스템 보호. 구현: ① 스레드 풀 분리: 서비스별 독립 스레드 풀 ② 커넥션 풀 분리 ③ 프로세스 분리: 컨테이너/마이크로서비스 ④ 세마포어: 동시 호출 제한. 설정: 풀 크기, 큐 크기, 거부 정책. Resilience4j Bulkhead 모듈 활용' },
        { q: 'Strangler Fig 패턴을 활용한 레거시 마이그레이션을 설명하시오.', a: '개념: 점진적으로 레거시 시스템 교체(교살 무화과 비유). 단계: ① 파사드 계층 추가 ② 새 기능은 신규 시스템 ③ 기존 기능 점진적 이전 ④ 레거시 제거. 구현: API Gateway로 라우팅 제어, 기능별 전환. 장점: 리스크 감소, 지속 운영, 학습 기회. 주의: 두 시스템 동시 운영 복잡성' },
        { q: 'Outbox 패턴으로 메시지 발행 신뢰성을 확보하는 방법을 설명하시오.', a: '문제: DB 트랜잭션과 메시지 발행 원자성 불일치. 해결: ① 비즈니스 데이터와 Outbox 테이블 동일 트랜잭션으로 저장 ② 별도 프로세스가 Outbox 폴링하여 메시지 발행 ③ 발행 후 Outbox 레코드 삭제/마킹. 변형: CDC로 Outbox 변경 감지(Debezium). 장점: at-least-once 보장, 단순한 구현' },
        { q: 'Leader-Follower 패턴의 구현과 고려사항을 설명하시오.', a: '구현: ① 리더 선출: ZooKeeper, etcd, Redis ② 리더 작업 수행: 스케줄링, 조율 ③ 팔로워 대기: 리더 장애 시 승격. 고려사항: Split-brain 방지(펜싱, 쿼럼), 리더 부재 시간 최소화, 상태 동기화. 활용: 분산 스케줄러, 마스터 선출, 싱글톤 서비스. 예: Kafka Controller, Redis Sentinel' },
        { q: 'Competing Consumers 패턴을 설명하시오.', a: '정의: 여러 컨슈머가 같은 큐에서 메시지 경쟁적 소비. 특징: 자동 부하 분산, 수평 확장, 메시지별 단일 처리. 고려사항: ① 멱등성: 중복 처리 대비 ② 순서 보장: 필요시 파티셔닝 ③ 가시성 타임아웃: 처리 실패 대비. 구현: SQS, RabbitMQ(ack), Kafka Consumer Group. 활용: 작업 큐, 이벤트 처리' },
        { q: 'Retry와 Exponential Backoff 전략을 설명하시오.', a: 'Retry: 일시적 장애에 대한 재시도. Exponential Backoff: 재시도 간격을 지수적으로 증가(1s, 2s, 4s...). Jitter: 랜덤 요소 추가로 동시 재시도 방지. 설정: maxRetries, initialDelay, maxDelay, multiplier. 적용 대상: 네트워크 오류, 일시적 과부하. 부적합: 인증 실패, 잘못된 요청(4xx)' },
        { q: 'Health Check 패턴의 종류와 구현을 설명하시오.', a: '종류: ① Liveness: 프로세스 정상 여부, 실패 시 재시작 ② Readiness: 트래픽 수신 가능 여부, 실패 시 제외 ③ Startup: 초기화 완료 여부. 구현: HTTP 엔드포인트(/health, /ready), TCP 소켓, 명령 실행. 응답: 상태 코드, 의존성 상태, 버전 정보. 설정: 주기, 타임아웃, 임계치' },
        { q: 'Distributed Tracing의 구현 방식을 설명하시오.', a: '개념: 분산 시스템에서 요청 흐름 추적. 구성: ① Trace: 전체 요청 여정 ② Span: 개별 작업 단위 ③ Context: 전파되는 메타데이터. 표준: OpenTelemetry, W3C Trace Context. 전파: HTTP 헤더(traceparent), gRPC 메타데이터. 도구: Jaeger, Zipkin, AWS X-Ray. 시각화: 워터폴 뷰, 서비스 맵, 지연 분석' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-system-pro-distributed-system-scores');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const saveScore = (correct: boolean) => {
    const key = `${currentTopic}-${currentQuestion}`;
    const newScores = { ...scores, [key]: { correct: correct ? 1 : 0, wrong: correct ? 0 : 1 } };
    setScores(newScores);
    localStorage.setItem('computer-system-pro-distributed-system-scores', JSON.stringify(newScores));
  };

  const currentQ = topics[currentTopic].questions[currentQuestion];
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
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
            <span className="text-emerald-600 font-medium">분산 시스템</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🌐</span></div>
            <div><h1 className="text-2xl font-bold">분산 시스템</h1><p className="text-cyan-100">Distributed Systems - 분산 아키텍처, 합의 알고리즘, 컨테이너 오케스트레이션</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">진행률: {answeredQuestions}/{totalQuestions} ({Math.round(answeredQuestions/totalQuestions*100)}%)</div>
            <button onClick={() => setShowPrompt(true)} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">🤖 AI 학습 도우미</button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {topics.map((topic, idx) => (
              <button key={idx} onClick={() => { setCurrentTopic(idx); setCurrentQuestion(0); setShowAnswer(false); }}
                className={`w-full text-left p-4 rounded-xl transition ${currentTopic === idx ? 'bg-cyan-500 text-white' : 'bg-white hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div><div className="font-medium">{topic.name}</div><div className={`text-sm ${currentTopic === idx ? 'text-cyan-100' : 'text-gray-500'}`}>{topic.questions.length}문제</div></div></div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{topics[currentTopic].name} - 문제 {currentQuestion + 1}/{topics[currentTopic].questions.length}</span>
                <div className="flex gap-2">
                  {topics[currentTopic].questions.map((_, idx) => (
                    <button key={idx} onClick={() => { setCurrentQuestion(idx); setShowAnswer(false); }}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition ${currentQuestion === idx ? 'bg-cyan-500 text-white' : scores[`${currentTopic}-${idx}`] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{idx + 1}</button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Q. {currentQ.q}</h3>
                {showAnswer ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-800 mb-2">모범 답안</h4>
                    <p className="text-gray-700 whitespace-pre-line">{currentQ.a}</p>
                  </div>
                ) : (
                  <button onClick={() => setShowAnswer(true)} className="w-full py-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">답안 보기</button>
                )}
              </div>

              {showAnswer && (
                <div className="flex gap-4">
                  <button onClick={() => { saveScore(true); if (currentQuestion < topics[currentTopic].questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setShowAnswer(false); } }}
                    className="flex-1 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">✓ 알고 있음</button>
                  <button onClick={() => { saveScore(false); if (currentQuestion < topics[currentTopic].questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setShowAnswer(false); } }}
                    className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">✗ 복습 필요</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPrompt && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowPrompt(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(`컴퓨터시스템응용기술사 분산 시스템 과목에서 다음 문제에 대해 더 자세히 설명해주세요: ${currentQ.q}\n\n다음 내용을 포함해서 설명해주세요:\n1. 핵심 개념 정의와 배경\n2. 세부 기술 및 구현 방법\n3. 실제 시스템 적용 사례\n4. 최신 기술 트렌드\n5. 기술사 시험 답안 작성 팁`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(`컴퓨터시스템응용기술사 분산 시스템: ${currentQ.q}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(`컴퓨터시스템응용기술사 분산 시스템: ${currentQ.q}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(`컴퓨터시스템응용기술사 분산 시스템: ${currentQ.q}`); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
