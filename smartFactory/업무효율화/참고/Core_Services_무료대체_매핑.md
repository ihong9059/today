---
title: Core Services 무료 대체 매핑 — Foundry 1층 인프라를 오픈소스로 95% 커버
type: analysis
created: 2026-05-05
updated: 2026-05-05
tags: [palantir, core-services, infrastructure, 영업전략, 업무효율화, n8n, tailscale]
links: [Pipeline_Builder_적용_검토, n8n_실행_가이드, Obsidian_Claude_적합성_보완의견, 영업전략, 팔란티어_파운드리_5개레이어_아키텍처_상세]
source: 2026-05-05 Claude 대화 정리
---

# Core Services 무료 대체 매핑

> **한 줄 결론**: Palantir Foundry의 1층(Core Services) 10종 중 **8/10을 사용자가 이미 보유한 무료 도구로 커버**하고 있음. 남은 2종(API Gateway, 배포 파이프라인)도 n8n + GitHub Actions로 1주일 내 보강 가능.
> **영업 무기**: "Foundry급 Core Services를 무료 도구로 구축" — 견적서 차별화 카피.

---

## 1. Core Services란 무엇인가

영상이 정의한 Foundry 5층 아키텍처에서 **1층 (Core Services)** 은 위층(데이터·온톨로지·분석·앱) 전체를 떠받치는 **항상 돌아가야 하는 인프라 서비스 묶음**.

- 운영체제로 치면 **커널**
- 건물로 치면 **골조 + 전기 + 수도**
- "있어야 본전, 없으면 마이너스" 영역

영상이 3층 온톨로지를 "★ 가장 중요"라고 표시한 건 **사업적 차별화 포인트**라서. 1층은 **차별화는 아니어도 없으면 작동 자체가 안 됨**:
- IAM 없음 → 모든 사람이 모든 데이터 봄 (보안 사고)
- Storage 없음 → 데이터 어디다 둘지 결정 불가
- Audit 없음 → 의료·금융 규제 산업에서 도입 자체 불가
- Deployment 없음 → 버그 한 줄 고치는 데 1주일

---

## 2. Foundry Core Services 10종 구체 구성

| # | 서비스 | 역할 | 비유 |
|---|--------|------|------|
| 1 | **IAM (Identity & Access Management)** | 누가 누구인지·뭘 볼 수 있는지 관리. SSO, RBAC, SAML/OAuth | 건물 출입카드 시스템 |
| 2 | **Compute Engine** | 분산 컴퓨팅 (Spark/Flink), 작업 스케줄링, 자원 할당 | 발전소 |
| 3 | **Storage / Data Lake** | 모든 raw·중간·최종 데이터 저장 (S3/HDFS류) | 지하 창고 |
| 4 | **Security & Encryption** | 저장·전송 데이터 암호화, 키 관리 | 금고 |
| 5 | **Audit & Lineage** | 누가 언제 뭘 했나, 데이터 출처 추적 | CCTV + 출입 기록 |
| 6 | **Metadata Catalog** | 모든 데이터 자산의 인덱스 (어디 뭐 있나) | 도서관 카드 목록 |
| 7 | **API Gateway / Service Mesh** | 서비스 간 통신, 트래픽 제어 | 건물 내 인터폰망 |
| 8 | **Deployment Pipeline** | 코드/파이프라인 변경의 안전한 배포 (CI/CD) | 엘리베이터 |
| 9 | **Observability** | 로그·메트릭·트레이싱 (모니터링) | 화재 감지·전력 모니터 |
| 10 | **Collaboration Infra** | 댓글·알림·공유·승인 워크플로우 | 사내 메일 |

---

## 3. 사용자 도구 스택과 매핑 (현재 상태)

| Foundry Core Services | 사용자 보유 도구 | 커버리지 |
|----------------------|----------------|---------|
| 1. IAM | OS 사용자 권한 + Tailscale ACL + Notion 권한 | ✅ 90% |
| 2. Compute Engine | 로컬 Python + revita 서버 + 향후 AWS | ✅ 85% |
| 3. Storage | 로컬 디스크 + Git + Notion + Obsidian vault | ✅ 95% |
| 4. Security & Encryption | Tailscale (WireGuard 암호화), git-crypt 가능 | ✅ 90% |
| 5. Audit & Lineage | git log (커밋 이력), 작업보고서 일별 기록 | ✅ 85% |
| 6. Metadata Catalog | myWiki second-brain index.md, entities/, dashboard | ✅ 90% |
| 7. API Gateway | (없음) | ❌ 0% |
| 8. Deployment Pipeline | git push + 수동 배포 | ⚠️ 30% |
| 9. Observability | 부분적 (Slack 알림 정도) | ⚠️ 30% |
| 10. Collaboration | Notion + Slack + GitHub + Obsidian | ✅ 95% |

**총 평균 커버리지: ~70%** — 이미 절반 이상 갖춤.
**완전 보강 후 가능: ~95%** — n8n + GitHub Actions + Grafana 추가 시.

---

## 4. 결핍 영역 보강 계획 (3주 로드맵)

### Week 1 — API Gateway 보강
**도구**: n8n Webhook (이미 도입 예정)
**작업**:
- n8n에 들어오는 모든 외부 호출을 인증·로깅·라우팅 처리
- API 엔드포인트 표준화 (`https://n8n.uttec.local/webhook/<service>/<action>`)
- Rate limiting + 인증 토큰 검증

### Week 2 — Deployment Pipeline 보강
**도구**: GitHub Actions (무료, public repo) 또는 self-hosted runner
**작업**:
- 모든 push에 자동 lint + 테스트 실행
- main 브랜치 push 시 자동 배포 (revita 서버에 SSH로 git pull)
- 배포 실패 시 Slack 알림 (n8n으로 통합)

### Week 3 — Observability 보강
**옵션 A (가벼움)**: n8n 모니터링 워크플로우 + Slack 알림
**옵션 B (정식)**: Grafana + Prometheus (혼자 셋업 시 1~2일)
**작업**:
- 서버 CPU/메모리/디스크 모니터링
- 워크플로우 실행 성공/실패 카운트
- 일일 요약 리포트 (Slack에 자동 전송)

→ **3주 완료 시 Core Services 100% 자체 구축**, Foundry 대비 비용 0원.

---

## 5. 영업 활용 (3-Stage 패키지 차별화)

### 5-1. 영업 미팅 답변 스크립트
고객사가 "왜 비싼 Palantir 안 쓰고 우리한테?"라고 물을 때:

> "Palantir Foundry의 1층(Core Services)은 사실상 인프라 비용입니다. 이걸 **오픈소스 + Tailscale + Git + Obsidian + n8n** 조합으로 95% 대체 가능합니다. 우리는 2층 데이터 통합부터 5층 운영 앱까지에 집중해서 동일한 비즈니스 가치를 **1/100 가격**에 제공합니다."

### 5-2. 견적서 차별화 표 (Stage 2 부록)
견적서에 다음 표를 부록으로 첨부 → 가격 정당성 입증:

| Foundry Core Services | 우리 패키지에서 무엇으로 대체 | 추가 비용 |
|----------------------|--------------------------|-----------|
| IAM | Tailscale (100대 무료) + OS 권한 | 0원 |
| Compute | Python + 자체 서버 | 0원 |
| Storage | Git + Obsidian | 0원 |
| Security | WireGuard 암호화 (Tailscale 내장) | 0원 |
| Audit | git log + 작업보고서 자동화 | 0원 |
| Catalog | Obsidian Wiki + 자동 lint | 0원 |
| API Gateway | n8n Webhook | 0원 |
| Deployment | GitHub Actions | 0원 |
| Observability | Grafana + n8n 알림 | 0원 |
| Collaboration | Notion + Slack | 0원 |
| **합계** | **모두 오픈소스/Free Tier** | **0원** |

> "별도 인프라 비용 0원, 모든 Core Services는 오픈소스 또는 무료 서비스로 구성. Stage 2 가격(2,500만)에 모든 셋업 + 운영 매뉴얼 포함."

### 5-3. 대기업 보안 우려 대응
대기업이 "데이터 외부 유출 우려" 제기 시:
- "**모든 Core Services를 자체 서버에 호스팅**합니다"
- "Palantir는 클라우드 의존이지만 우리는 On-Premise/하이브리드 선택"
- "Tailscale은 WireGuard 기반 P2P, 트래픽이 외부 서버를 거치지 않음"

---

## 6. 보강 후 사업 모델 진화

### 현재 (3-Stage 패키지)
- Stage 1: 교육 (300만)
- Stage 2: 위키 + n8n 워크플로우 (2,500만)
- Stage 3: 운영 앱 (2,500만)
- **총 5,300만**

### Core Services 보강 후 (3.5-Stage 패키지)
- **Stage 0 신설: Core Services 인프라 셋업 (500만)**
  - Tailscale 도입 + Git 표준화 + Obsidian Vault 셋업 + n8n 설치 + 모니터링
  - 1주 작업, 운영 매뉴얼 포함
- Stage 1~3 기존 동일
- **총 5,800만 (가치 +500만, 진입장벽 -50%)**

→ Stage 0이 **첫 진입을 쉽게** 만듦 (500만은 결재 권한 낮은 부장급도 결재 가능). Stage 0 시범 후 만족도 측정 → Stage 1~3 본격 영업.

---

## 7. 다음 액션 체크리스트

### 인프라 보강
- [ ] **Day 1-3**: n8n 설치 + Webhook API Gateway 패턴 확립
- [ ] **Week 2**: GitHub Actions로 자동 배포 파이프라인 구축
- [ ] **Week 2-3**: Grafana + Prometheus 또는 n8n 모니터링 셋업
- [ ] **Week 3**: 모든 Core Services 매핑 검증 + 운영 매뉴얼 작성

### 영업 자료 제작
- [ ] **Week 3**: Stage 2 견적서에 Core Services 매핑 부록 추가
- [ ] **Week 3**: 영업 미팅 답변 스크립트 카드화 (한 페이지)
- [ ] **Week 4**: 5분 데모 영상에 Core Services 무료 대체 슬라이드 추가
- [ ] **Week 4**: Stage 0 (Core Services 셋업, 500만) 별도 견적서 신설

### 검증
- [ ] 태명과학 또는 한국기계에 Stage 0 시범 견적 발송
- [ ] 시범 고객 1곳에 실제 Core Services 셋업 → 만족도 + 자립도 측정
- [ ] 6개월 후 Stage 1~3 업셀 전환율 측정

---

## 8. 핵심 인사이트 (한 줄)

**Palantir의 진짜 비용은 1층(Core Services) 자체 구축에 들어간 수십 년 R&D**다. 우리는 그 R&D를 무료 오픈소스 도구가 이미 해놓은 자산으로 우회한다 — **Foundry 1층을 0원에 재현하고, 차별화 가치를 2~5층에 집중**하는 것이 우리 영업 전략의 핵심.

---

## 9. Stage 0 시범 패키지 (신규 제안)

### 명세
- **명칭**: UTTEC Core Services Starter Pack
- **가격**: 500만 (VAT 별도)
- **기간**: 1주 (셋업 5일 + 검증 2일)
- **장소**: 고객사 방문 + 원격

### 산출물
1. Tailscale 네트워크 구축 (고객사 PC 5~20대 메시 연결)
2. Git 저장소 + 표준 디렉토리 구조 (예: `data/`, `wiki/`, `apps/`)
3. Obsidian Vault 초기 셋업 + CLAUDE.md 스키마
4. n8n 자체 호스팅 1대 + 첫 워크플로우 1개 (고객 요청 기능)
5. Slack 또는 카카오워크 자동 알림 통합
6. 운영 매뉴얼 PDF (50페이지) + 1시간 영상 강의

### 타겟 고객
- 5~20인 중소기업 (데이터 분산 문제 인식)
- 의사결정자 결재 권한 1,000만 이하 (Stage 0가 진입 시점에 적합)
- 향후 Stage 1~3 업셀 가능성 있는 곳 (성장 의지)

### 차별화 메시지
> "5,000만 짜리 Foundry급 시스템의 1층을 1주에 500만으로 깔아드립니다. 만족하시면 Stage 1~3 업셀로 진행하시고, 아니면 1주 후 모든 자료 인계하고 떠납니다."

---

## 관련 문서

- [[Pipeline_Builder_적용_검토]] — 2~5층 (데이터 통합 + 온톨로지 + 분석 + 앱) 분석
- [[n8n_실행_가이드]] — Core Services 보강의 핵심 도구 (API Gateway 역할)
- [[Obsidian_Claude_적합성_보완의견]] — 3-Stage 패키지 모델
- [[영업전략]] — UTTEC 사업 전략
- 유투브/04_AI_이론/팔란티어_파운드리_5개레이어_아키텍처_상세.md — 원본 영상 학습 자료 (5층 아키텍처)
- 유투브/04_AI_이론/팔란티어_파운드리_3_OntologyManager_End-to-End_상세.md — 3층(온톨로지) 상세
