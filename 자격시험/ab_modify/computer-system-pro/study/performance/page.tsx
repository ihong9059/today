'use client';

import { useState, useEffect } from 'react';

export default function PerformancePage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<{[key: string]: {correct: number, wrong: number}}>({});
  const [showPrompt, setShowPrompt] = useState(false);

  const topics = [
    {
      name: '성능 분석',
      icon: '📊',
      questions: [
        { q: '시스템 성능의 주요 지표(Metrics)와 측정 방법을 설명하시오.', a: '주요 지표: ① Throughput: 단위 시간당 처리량(TPS, RPS) ② Latency: 요청-응답 시간(P50, P95, P99) ③ Utilization: 리소스 사용률(CPU, Memory, I/O) ④ Error Rate: 오류 발생률 ⑤ Saturation: 대기 큐 길이. 측정: 애플리케이션 메트릭(APM), 시스템 메트릭(node_exporter), 네트워크 메트릭. 도구: Prometheus, Grafana, Datadog' },
        { q: 'Amdahl의 법칙과 Gustafson의 법칙을 비교 설명하시오.', a: 'Amdahl: 병렬화 가능 비율 P에서 N 프로세서의 속도 향상 = 1/((1-P) + P/N). 한계: 순차 부분이 병목, 프로세서 증가 효과 감소. Gustafson: 문제 크기 확장 관점, Speedup = N - (1-P)(N-1). 차이: Amdahl은 고정 문제 크기, Gustafson은 확장 문제 크기. 실무: 병렬화율 최대화, 순차 부분 최소화가 핵심' },
        { q: 'Little의 법칙과 시스템 용량 계획에의 적용을 설명하시오.', a: '공식: L = λW (L: 시스템 내 평균 요청 수, λ: 도착률, W: 평균 체류 시간). 적용: ① 동시 사용자 수 산정: 목표 응답시간과 TPS로 계산 ② 스레드 풀 크기 결정 ③ 큐 크기 설계. 예시: 1000 TPS, 응답시간 0.1초면 L = 1000 × 0.1 = 100 동시 요청. 용량 계획에서 버퍼 추가(안전 마진)' },
        { q: 'USE 방법론(Utilization, Saturation, Errors)을 설명하시오.', a: 'Brendan Gregg 제안 성능 분석 방법. Utilization: 리소스 사용 시간 비율(CPU%, Memory%). Saturation: 처리 못한 대기 작업(런큐 길이, 스왑 사용). Errors: 오류 이벤트 수. 적용: 모든 리소스(CPU, Memory, Network, Storage)에 USE 체크리스트 적용. 장점: 체계적 병목 식별, 누락 방지' },
        { q: 'RED 방법론(Rate, Errors, Duration)과 서비스 모니터링을 설명하시오.', a: 'Tom Wilkie 제안, 서비스 관점 모니터링. Rate: 초당 요청 수(요청 볼륨). Errors: 실패한 요청 비율. Duration: 요청 처리 시간(지연 분포). SLI 매핑: Rate→가용성, Errors→에러 예산, Duration→지연 SLO. 구현: Prometheus histogram/counter, Grafana 대시보드. USE는 인프라, RED는 서비스 관점' },
        { q: '성능 프로파일링 도구와 방법론을 설명하시오.', a: 'CPU 프로파일링: perf(Linux), Instruments(macOS), async-profiler(Java). 메모리 프로파일링: Valgrind, heaptrack, Memory Analyzer. 샘플링 vs 계측: 샘플링(낮은 오버헤드), 계측(정확도). Flame Graph: 호출 스택 시각화, 병목 함수 식별. 분산 프로파일링: Continuous Profiling(Pyroscope, Google Cloud Profiler)' },
        { q: '지연 시간(Latency) 분석에서 백분위수(Percentile)의 중요성을 설명하시오.', a: '평균의 한계: 이상치에 민감, 분포 숨김. 백분위수: P50(중앙값), P95(대부분 사용자 경험), P99(최악 사례). Long tail: 상위 1%가 전체 경험에 큰 영향. SLO 설정: P99 < 200ms 형태로 정의. 히스토그램 버킷: 적절한 구간 설정으로 분포 파악. Coordinated Omission: 측정 오류 주의' },
        { q: '시스템 병목(Bottleneck) 식별 기법을 설명하시오.', a: '방법: ① 가설 수립: 어디가 병목인지 예측 ② 계측: 관련 메트릭 수집 ③ 분석: 데이터 기반 확인 ④ 개선: 병목 해소 후 재측정. 도구: top/htop(CPU), iostat(Disk), netstat(Network), vmstat(Memory). 패턴: 리소스 포화(CPU 100%), 대기 시간 증가(Lock contention), 외부 의존성(DB, API)' },
        { q: '성능 베이스라인(Baseline)의 수립과 활용을 설명하시오.', a: '정의: 정상 상태 성능 특성 기록. 수립: ① 주요 메트릭 선정 ② 정상 부하에서 측정 ③ 시간대별 패턴 파악 ④ 문서화. 활용: 이상 탐지(baseline 대비 편차), 용량 계획(성장 추세), 변경 영향 평가. 갱신: 아키텍처 변경, 트래픽 패턴 변화 시. 도구: Prometheus recording rules, Grafana annotations' },
        { q: '부하 테스트(Load Testing)의 종류와 수행 방법을 설명하시오.', a: '종류: ① Load Test: 예상 부하 검증 ② Stress Test: 한계점 발견 ③ Spike Test: 급격한 부하 증가 ④ Soak Test: 장시간 안정성 ⑤ Breakpoint Test: 시스템 포화점. 도구: k6, JMeter, Gatling, Locust. 방법: 시나리오 설계→환경 준비→실행→분석. 주의: 프로덕션 격리, 점진적 증가, 메트릭 수집' }
      ]
    },
    {
      name: '튜닝 기법',
      icon: '⚙️',
      questions: [
        { q: 'CPU 바운드 애플리케이션의 성능 최적화 전략을 설명하시오.', a: '분석: CPU 사용률 확인, 프로파일링으로 핫스팟 식별. 최적화: ① 알고리즘 개선: 복잡도 감소(O(n²)→O(n log n)) ② 데이터 구조 최적화: 캐시 친화적 배열 ③ 벡터화: SIMD 명령어 활용 ④ 병렬화: 멀티스레드, 멀티프로세스. JIT 최적화: 핫 코드 식별. 컴파일러 최적화: -O2, -O3 플래그' },
        { q: 'I/O 바운드 애플리케이션의 성능 최적화 전략을 설명하시오.', a: '분석: iowait 확인, I/O 대기 시간 측정. 최적화: ① 비동기 I/O: async/await, io_uring ② 배치 처리: 여러 요청 묶어서 처리 ③ 버퍼링: 읽기/쓰기 버퍼 크기 조정 ④ 캐싱: 자주 접근 데이터 메모리 캐시. 스토리지: SSD 사용, RAID 구성. 네트워크 I/O: Connection pooling, Keep-alive' },
        { q: '메모리 바운드 애플리케이션의 최적화 전략을 설명하시오.', a: '분석: 메모리 사용량, 캐시 미스율, 페이지 폴트. 최적화: ① 데이터 지역성: 캐시 친화적 접근 패턴 ② 메모리 풀: 할당/해제 오버헤드 감소 ③ 객체 크기 최적화: 패딩 최소화 ④ 지연 로딩: 필요시 로드. GC 튜닝: 힙 크기, GC 알고리즘 선택. 대용량: 메모리 매핑, 스트리밍 처리' },
        { q: 'JVM 성능 튜닝 주요 파라미터와 전략을 설명하시오.', a: '힙 설정: -Xms(초기), -Xmx(최대), -Xmn(Young). GC 선택: G1GC(균형), ZGC(낮은 지연), Parallel GC(처리량). G1 튜닝: -XX:MaxGCPauseMillis, -XX:G1HeapRegionSize. JIT: -XX:+TieredCompilation. 모니터링: jstat, jmap, GC 로그 분석. 원칙: 측정→분석→튜닝→재측정, 한 번에 하나씩 변경' },
        { q: '데이터베이스 쿼리 최적화 기법을 설명하시오.', a: '인덱스: 적절한 인덱스 생성, 복합 인덱스 순서, 커버링 인덱스. 쿼리 최적화: 실행 계획 분석(EXPLAIN), 불필요한 컬럼 제거, 서브쿼리→조인 변환. 정규화/비정규화: 조회 패턴에 맞게 조정. 파티셔닝: 대용량 테이블 분할. 캐싱: 쿼리 캐시, 결과 캐시. 커넥션 풀: 적정 크기 설정, 타임아웃' },
        { q: '네트워크 성능 최적화 기법을 설명하시오.', a: 'TCP 튜닝: 버퍼 크기(tcp_rmem, tcp_wmem), 혼잡 제어 알고리즘(BBR). 연결 최적화: Keep-alive, Connection pooling, HTTP/2 멀티플렉싱. 지연 감소: CDN, Edge computing, DNS 최적화. 대역폭: 압축(gzip, brotli), 이미지 최적화. 프로토콜: QUIC/HTTP3, gRPC. 모니터링: 패킷 손실, RTT, 재전송률' },
        { q: '캐싱 전략과 캐시 무효화 방법을 설명하시오.', a: '캐싱 계층: ① 브라우저 캐시 ② CDN ③ 리버스 프록시 ④ 애플리케이션 캐시 ⑤ DB 캐시. 전략: Cache-aside, Write-through, Write-behind. 무효화: TTL 기반, 이벤트 기반, 버전 기반. 패턴: Look-aside, Read-through. 분산 캐시: Redis, Memcached. 주의: Cache stampede(thundering herd), 일관성' },
        { q: '커넥션 풀링(Connection Pooling)의 원리와 최적 크기를 설명하시오.', a: '원리: 연결 재사용으로 생성/종료 오버헤드 제거. 구성: 최소/최대 크기, 유휴 타임아웃, 검증 쿼리. 최적 크기 공식: connections = ((core_count * 2) + effective_spindle_count). 모니터링: 대기 시간, 활성 연결 수, 타임아웃 발생. 튜닝: HikariCP(Java), pgBouncer(PostgreSQL). 과다 설정 시: 리소스 낭비, DB 부하' },
        { q: '비동기 처리와 논블로킹 I/O의 성능 이점을 설명하시오.', a: '동기/블로킹: 스레드가 I/O 대기, 리소스 낭비. 비동기/논블로킹: 대기 없이 다른 작업 수행. 모델: ① 콜백 ② Promise/Future ③ async/await. 구현: epoll(Linux), kqueue(BSD), io_uring. 이점: 적은 스레드로 높은 동시성, 리소스 효율. 주의: 콜백 지옥, 디버깅 어려움, 컨텍스트 전환' },
        { q: '락(Lock) 경합 감소를 위한 동시성 최적화 기법을 설명하시오.', a: '문제: Lock contention으로 병렬 처리 효율 저하. 기법: ① Lock 범위 축소: 임계 영역 최소화 ② Lock 분할: 세밀한 락킹(StripedMap) ③ Read-Write Lock: 읽기 동시성 ④ Lock-free 자료구조: CAS 기반(AtomicInteger). 패턴: Thread-local 사용, Immutable 객체. 분석: Lock profiler, jstack, async-profiler' }
      ]
    },
    {
      name: '벤치마킹',
      icon: '📈',
      questions: [
        { q: '벤치마킹의 종류와 설계 원칙을 설명하시오.', a: '종류: ① Micro-benchmark: 함수/컴포넌트 수준 ② Macro-benchmark: 전체 시스템 ③ Synthetic: 인위적 워크로드 ④ Application: 실제 애플리케이션. 설계 원칙: 재현 가능성, 격리된 환경, 워밍업, 충분한 반복, 통계적 유의성. 주의: JIT 최적화, GC 영향, 캐시 효과. 도구: JMH(Java), Criterion(Rust)' },
        { q: '마이크로벤치마킹의 함정과 올바른 수행 방법을 설명하시오.', a: '함정: ① Dead code elimination: 사용하지 않는 결과 제거 ② Constant folding: 컴파일 시점 계산 ③ Loop unrolling: 루프 최적화 ④ JIT 워밍업 미고려. 올바른 방법: ① Blackhole 사용(결과 소비) ② 다양한 입력 ③ 충분한 워밍업 ④ 반복 측정 후 통계 분석. JMH 사용: @Benchmark, @Setup, @State' },
        { q: 'TPC 벤치마크 표준(TPC-C, TPC-H)을 설명하시오.', a: 'TPC-C: OLTP 벤치마크, 주문 처리 시뮬레이션, tpmC(분당 트랜잭션) 측정. TPC-H: 의사결정 지원(OLAP), 복잡한 쿼리 22개, QphH@Size(시간당 쿼리). TPC-DS: 빅데이터 분석, 현대적 데이터 웨어하우스. 활용: 시스템 비교, 용량 계획, 벤더 선정. 한계: 실제 워크로드와 차이, 비용(감사 비용)' },
        { q: '성능 테스트 환경 구성 시 고려사항을 설명하시오.', a: '환경: 프로덕션과 유사하게(하드웨어, 네트워크, 데이터). 격리: 외부 영향 제거, 전용 환경. 데이터: 실제 데이터 규모, 분포 반영. 모니터링: 테스트 중 메트릭 수집, 로그 기록. 재현성: 스크립트화, 버전 관리. 클라우드: 인스턴스 타입, 네트워크 대역폭, 노이즈 이웃 주의' },
        { q: '성능 회귀 테스트(Performance Regression Testing)를 설명하시오.', a: '목적: 코드 변경으로 인한 성능 저하 탐지. 구현: ① CI/CD 파이프라인에 통합 ② 베이스라인 대비 비교 ③ 임계치 기반 알림. 메트릭: 응답 시간, 처리량, 리소스 사용량. 도구: JMH + GitHub Actions, Gatling, k6. 주의: 환경 일관성, 통계적 유의성, 노이즈 허용 범위. 자동화가 핵심' },
        { q: '성능 테스트 결과 분석과 리포팅 방법을 설명하시오.', a: '분석: ① 목표 대비 달성도 ② 병목 지점 식별 ③ 리소스 사용 패턴 ④ 오류 분석 ⑤ 확장성 평가. 시각화: 시계열 그래프, 분포 히스토그램, 히트맵. 리포트: 테스트 조건, 결과 요약, 상세 데이터, 권장 사항. 공유: 이해관계자별 맞춤 리포트(기술팀 상세, 경영진 요약)' },
        { q: 'A/B 테스트에서 성능 측정 방법을 설명하시오.', a: '설계: 대조군(A)과 실험군(B) 동시 운영, 트래픽 분할. 측정: 응답 시간, 오류율, 전환율 등 KPI. 통계: 샘플 크기 결정, 유의성 검정(t-test), 신뢰 구간. 주의: Simpson\'s paradox, 외부 요인 통제. 도구: Optimizely, LaunchDarkly, 자체 구현. 성능: 실사용자 데이터(RUM)로 측정' },
        { q: 'Chaos Engineering과 성능 테스트의 관계를 설명하시오.', a: '정의: 시스템에 의도적 장애 주입하여 복원력 검증. 원칙: ① 정상 상태 정의 ② 가설 수립 ③ 장애 주입 ④ 결과 검증. 성능 관련: 장애 상황에서 성능 저하 정도 측정, 복구 시간, 장애 전파 범위. 도구: Chaos Monkey, Gremlin, Litmus. 주의: 프로덕션 실험 시 폭발 반경 제한, 롤백 준비' },
        { q: 'Real User Monitoring(RUM)과 Synthetic Monitoring을 비교하시오.', a: 'RUM: 실제 사용자 데이터 수집, 다양한 환경, 실사용 패턴. 구현: JavaScript agent, 브라우저 API. Synthetic: 스크립트 기반 모니터링, 일관된 조건, 24시간 감시. 구현: Playwright, Selenium, 전용 서비스. 장단점: RUM(현실적, 노이즈), Synthetic(제어 가능, 인위적). 상호 보완적 사용 권장' },
        { q: '성능 예산(Performance Budget)의 개념과 적용을 설명하시오.', a: '정의: 성능 지표의 허용 한계 설정. 유형: ① 수량 기반: JS 200KB 이하 ② 시간 기반: LCP 2.5초 이하 ③ 규칙 기반: Lighthouse 90점 이상. 적용: CI/CD에서 자동 검사, 초과 시 빌드 실패. 효과: 성능 퇴보 방지, 팀 인식 제고. 도구: Lighthouse CI, bundlesize, webpack-bundle-analyzer' }
      ]
    },
    {
      name: 'SLA/SLO',
      icon: '📋',
      questions: [
        { q: 'SLA, SLO, SLI의 개념과 관계를 설명하시오.', a: 'SLI(Service Level Indicator): 측정 가능한 서비스 품질 지표(가용성, 지연시간, 오류율). SLO(Service Level Objective): SLI의 목표 값(99.9% 가용성, P99 < 200ms). SLA(Service Level Agreement): 고객과의 계약, SLO 미달 시 보상 포함. 관계: SLI 측정→SLO 평가→SLA 이행. 설정: 사용자 경험 기반, 달성 가능한 목표' },
        { q: '오류 예산(Error Budget)의 개념과 활용을 설명하시오.', a: '정의: SLO 여유분(100% - SLO). 예: 99.9% SLO면 0.1% 오류 예산(월 43.8분). 활용: ① 배포 결정: 예산 소진 시 배포 중단 ② 리스크 균형: 안정성 vs 개발 속도 ③ 팀 협업: SRE-개발팀 공동 책임. 모니터링: 예산 소비율 추적, 알림 설정. 정책: 예산 고갈 시 대응 방안 사전 정의' },
        { q: '가용성(Availability) 계산과 9s(나인즈) 의미를 설명하시오.', a: '계산: 가용성 = (총 시간 - 다운타임) / 총 시간. 나인즈: 99% = 2나인(3.65일), 99.9% = 3나인(8.76시간), 99.99% = 4나인(52.56분), 99.999% = 5나인(5.26분). 연간 기준. 고려: 계획된 유지보수, 부분 장애 처리 방법. 직렬 시스템: A_total = A1 × A2. 병렬: 1 - (1-A)^n' },
        { q: 'SLO 기반 알림(Alerting) 전략을 설명하시오.', a: '원칙: 증상 기반 알림(원인 아닌 결과에 알림). 방법: ① Multi-window 알림: 단기/장기 윈도우 조합 ② Burn rate: 오류 예산 소비 속도 기반. 예: 1시간 내 10%+ 예산 소비 시 긴급 알림. 장점: 노이즈 감소, 실제 영향 기반. 구현: Prometheus alerting rules, SLO burn rate 계산' },
        { q: '분산 시스템에서 SLO 설정 시 고려사항을 설명하시오.', a: '의존성: 하위 서비스 SLO 합산, 버퍼 필요. 측정 위치: 클라이언트 관점 vs 서버 관점. 부분 장애: 기능별 차등 SLO. 지역 분산: 리전별 SLO, 글로벌 SLO. 버전: API 버전별 SLO. 고려: 현실적 목표, 측정 가능성, 이해관계자 합의. 반복: 주기적 검토 및 조정' },
        { q: 'Toil의 개념과 감소 전략을 설명하시오.', a: '정의: 수작업, 반복적, 자동화 가능한 운영 업무. 특징: 가치 창출 없음, 서비스 성장에 비례 증가, 인터럽트성. 감소 전략: ① 자동화: 반복 작업 스크립트화 ② Self-service: 개발팀 자율 처리 ③ 제거: 불필요한 작업 폐지 ④ 프로세스 개선. 목표: Toil 50% 이하 유지. 측정: 시간 추적, 작업 분류' },
        { q: 'SRE(Site Reliability Engineering)의 핵심 원칙을 설명하시오.', a: '원칙: ① 오류 예산: 안정성-속도 균형 ② Toil 감소: 자동화 투자 ③ 모니터링: 블랙박스+화이트박스 ④ 점진적 변경: 카나리, 점진적 롤아웃 ⑤ 자동화: 수동 개입 최소화. 조직: 개발팀과 협업, 50% 이하 운영 업무. 문화: 비난 없는 포스트모템, 지속적 개선' },
        { q: '포스트모템(Postmortem) 작성과 활용을 설명하시오.', a: '목적: 장애 원인 분석, 재발 방지, 조직 학습. 구성: ① 요약: 영향, 시간, 원인 ② 타임라인: 발생-탐지-완화-해결 ③ 근본 원인: 5 Whys 분석 ④ 조치 항목: 예방책, 탐지 개선. 원칙: Blameless(비난 없음), 사실 기반. 공유: 조직 전체 학습, 패턴 분석. 추적: 조치 항목 완료 관리' },
        { q: '용량 계획(Capacity Planning)의 방법론을 설명하시오.', a: '접근: ① 수요 예측: 과거 데이터, 성장률, 이벤트 ② 리소스 매핑: 트래픽→리소스 상관관계 ③ 버퍼: 피크 대비 여유(20-30%) ④ 리드 타임: 확장 소요 시간 고려. 방법: 선형 회귀, 시계열 분석, 시뮬레이션. 클라우드: 자동 확장으로 정확도 요구 감소. 리뷰: 분기별 검토 및 조정' },
        { q: 'On-Call 운영과 피로도 관리를 설명하시오.', a: '구조: 1차/2차 대응, 로테이션 주기, 에스컬레이션 경로. 도구: PagerDuty, OpsGenie, VictorOps. 피로도 관리: ① 알림 품질: 실제 조치 필요한 알림만 ② 자동화: 반복 대응 자동화 ③ 문서화: 런북, 플레이북 ④ 로테이션: 공정한 분배, 충분한 휴식. 메트릭: 알림 수, 대응 시간, 에스컬레이션 비율' }
      ]
    },
    {
      name: '용량 계획',
      icon: '📐',
      questions: [
        { q: '클라우드 환경에서의 비용 최적화 전략을 설명하시오.', a: '인스턴스: RI(Reserved), Spot/Preemptible, Savings Plans. 오토스케일링: 수요 기반 확장/축소, 스케줄 기반. 적정 크기: 리소스 사용률 분석, 다운사이징. 스토리지: 계층화(Hot/Cold), 라이프사이클 정책. 네트워크: 트래픽 최적화, 리전 선택. 관측: 비용 태깅, 예산 알림, FinOps 도구(Kubecost)' },
        { q: '자동 확장(Auto Scaling)의 정책과 설계를 설명하시오.', a: '정책: ① Target tracking: 목표 지표 유지(CPU 70%) ② Step scaling: 임계치별 단계적 확장 ③ Scheduled: 예측 가능한 패턴 ④ Predictive: ML 기반 예측. 설계: cooldown 기간, 최소/최대 인스턴스, 헬스체크. 지표: CPU, 메모리, 커스텀 메트릭(큐 길이, 응답시간). 주의: 확장 지연, 비용, thrashing 방지' },
        { q: '컨테이너 리소스 요청과 제한 설정 전략을 설명하시오.', a: 'Requests: 스케줄링 기준, 보장 리소스. Limits: 최대 사용량 제한. 설정: ① Requests ≤ 평균 사용량 ② Limits = Requests × 1.5~2. QoS 클래스: Guaranteed(동일), Burstable(다름), BestEffort(없음). 분석: VPA 권장값, Prometheus 메트릭. LimitRange: 네임스페이스 기본값. ResourceQuota: 네임스페이스 총량 제한' },
        { q: '데이터베이스 용량 계획과 샤딩 전략을 설명하시오.', a: '용량 계획: ① 데이터 증가율 예측 ② 쿼리 패턴 분석 ③ 인덱스 크기 고려 ④ 복제 오버헤드. 스케일 업: CPU, 메모리, 스토리지 증설. 스케일 아웃: 읽기 복제본, 샤딩. 샤딩 전략: Range(범위), Hash(균등), Directory(룩업). 고려: 핫스팟 방지, 리샤딩 계획, 조인 제약' },
        { q: '트래픽 예측 모델과 방법론을 설명하시오.', a: '방법: ① 시계열 분석: ARIMA, Prophet ② 성장 모델: 선형, 지수, S-curve ③ 이벤트 기반: 마케팅, 시즌, 출시 ④ 상관 분석: 비즈니스 지표와 연계. 데이터: 과거 트래픽, 사용자 성장, 기능 사용량. 시나리오: 최악/최선/기본 케이스. 검증: 실제 vs 예측 비교, 모델 개선. 버퍼: 예측 불확실성 반영' },
        { q: '글로벌 서비스의 용량 계획 고려사항을 설명하시오.', a: '지역 분포: 사용자 위치별 트래픽 분석. 시간대: 지역별 피크 시간 차이, 팔로우더선 패턴. 데이터 주권: 지역별 데이터 저장 요구사항. 지연시간: 리전 선택, CDN, Edge. 비용: 리전별 가격 차이, 데이터 전송 비용. 재해 복구: 멀티 리전 배포, 페일오버. DNS: GeoDNS, Latency 기반 라우팅' },
        { q: '서버리스 아키텍처의 성능과 용량 특성을 설명하시오.', a: '특성: 자동 확장, 사용량 기반 과금, 콜드 스타트. 성능: ① 콜드 스타트 지연: 언어별 차이, Provisioned Concurrency ② 동시성 한도: 계정/리전 제한 ③ 실행 시간 제한. 용량: 무제한처럼 보이나 숨은 제한 존재. 최적화: 패키지 크기, 연결 재사용, 워밍업. 비용: 실행 시간 × 메모리 × 호출 수' },
        { q: '캐시 크기 결정과 히트율 최적화를 설명하시오.', a: '크기 결정: 워킹셋 크기, 메모리 예산, 히트율 목표. 히트율 공식: Hit rate = Hits / (Hits + Misses). 분석: 접근 패턴(Zipf 분포), 캐시 워밍업 시간. 최적화: ① 적절한 만료 정책 ② 캐시 키 설계 ③ 핫 데이터 식별 ④ 프리페칭. 교체 정책: LRU, LFU, ARC. 모니터링: 히트율, 메모리 사용, 응답 시간' },
        { q: '메시지 큐 용량 계획을 설명하시오.', a: '고려 요소: ① 처리량: 초당 메시지 수, 메시지 크기 ② 지연: 대기 시간 요구사항 ③ 보존: 메시지 보존 기간 ④ 파티션: 병렬 처리 수준. Kafka: 파티션 수, 복제 팩터, 보존 기간×처리량. 설계: 컨슈머 랙 모니터링, 백프레셔 처리. 확장: 파티션 추가, 컨슈머 그룹 확장. 버퍼: 피크 대비 여유 용량' },
        { q: '성능 용량 모델링 기법을 설명하시오.', a: '기법: ① 큐잉 모델: M/M/c, 대기 시간 예측 ② 시뮬레이션: 복잡한 시스템 모델링 ③ 회귀 분석: 부하-응답시간 관계 ④ 벤치마크 기반: 실측 데이터 외삽. 파라미터: 도착률, 서비스율, 리소스 수. 검증: 실제 측정과 비교. 도구: JMT(Java Modelling Tools), SimPy. 활용: What-if 분석, 확장 계획' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-system-pro-performance-scores');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const saveScore = (correct: boolean) => {
    const key = `${currentTopic}-${currentQuestion}`;
    const newScores = { ...scores, [key]: { correct: correct ? 1 : 0, wrong: correct ? 0 : 1 } };
    setScores(newScores);
    localStorage.setItem('computer-system-pro-performance-scores', JSON.stringify(newScores));
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
            <span className="text-emerald-600 font-medium">성능 최적화</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚡</span></div>
            <div><h1 className="text-2xl font-bold">성능 최적화</h1><p className="text-blue-100">Performance Optimization - 성능 분석, 튜닝, 벤치마킹, 용량 계획</p></div>
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
                className={`w-full text-left p-4 rounded-xl transition ${currentTopic === idx ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3"><span className="text-2xl">{topic.icon}</span><div><div className="font-medium">{topic.name}</div><div className={`text-sm ${currentTopic === idx ? 'text-blue-100' : 'text-gray-500'}`}>{topic.questions.length}문제</div></div></div>
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
                      className={`w-8 h-8 rounded-full text-sm font-medium transition ${currentQuestion === idx ? 'bg-blue-500 text-white' : scores[`${currentTopic}-${idx}`] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{idx + 1}</button>
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

      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold">🤖 AI 학습 도우미</h3><button onClick={() => setShowPrompt(false)} className="text-gray-400 hover:text-gray-600">✕</button></div>
            <p className="text-gray-600 mb-4">아래 프롬프트를 복사하여 Claude에게 질문하세요.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <code className="text-sm text-gray-800 whitespace-pre-wrap">컴퓨터시스템응용기술사 성능 최적화 과목에서 다음 문제에 대해 더 자세히 설명해주세요: {currentQ.q} 다음 내용을 포함해서 설명해주세요: 1. 핵심 개념 정의와 측정 방법 2. 최적화 기법과 구현 방법 3. 실제 사례와 벤치마크 4. 도구 및 모니터링 방안 5. 기술사 시험 답안 작성 팁</code>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`컴퓨터시스템응용기술사 성능 최적화 과목에서 다음 문제에 대해 더 자세히 설명해주세요: ${currentQ.q}`); }}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">📋 프롬프트 복사</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
