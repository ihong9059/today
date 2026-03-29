# 팔란티어(Palantir) 의료 AI 플랫폼 조사서

조사일: 2026-03-29

---

## 1. 회사 개요

### 1.1 기본 정보

| 항목 | 내용 |
|------|------|
| **회사명** | Palantir Technologies Inc. |
| **설립** | 2003년 |
| **본사** | 미국 플로리다주 마이애미 |
| **창업자** | Peter Thiel, Alex Karp(CEO), Stephen Cohen, Joe Lonsdale, Nathan Gettings |
| **상장** | NYSE: PLTR |
| **2025년 매출** | 44.75억 달러 (전년 대비 56.18% 성장) |
| **2025년 Q4 매출** | 14.07억 달러 (전년 대비 70% 성장) |
| **시가총액** | 약 3,530억 달러 (2026년 3월 기준) |
| **직원 수** | 약 4,430명 (2026년 3월 기준) |

### 1.2 사업 영역

팔란티어는 데이터 통합 및 분석 플랫폼을 개발하는 기업으로, 정부 기관, 군사 조직, 민간 기업이 다양한 소스의 데이터를 결합하고 분석할 수 있도록 지원한다. 원래 미국 정보기관 및 국방 분야에서 시작했으나, 현재는 의료, 제조, 금융, 에너지 등 민간 분야로 급속히 확장 중이다.

### 1.3 주요 제품 라인업

- **Palantir Gotham**: 정보기관 및 국방 분야용 데이터 분석 플랫폼
- **Palantir Foundry**: 상업/민간 부문 데이터 운영 플랫폼
- **Palantir AIP (Artificial Intelligence Platform)**: AI/LLM 기반 기업용 AI 플랫폼
- **Palantir Apollo**: 소프트웨어 배포 및 관리 플랫폼

---

## 2. 핵심 플랫폼

### 2.1 Palantir Foundry

#### 개요
Palantir Foundry는 팔란티어의 핵심 상업용 플랫폼으로, 조직의 모든 데이터를 통합하고 분석하여 운영 의사결정을 지원하는 **데이터 운영 시스템(Data Operating System)**이다.

#### 핵심 기능
- **데이터 통합(Data Integration)**: HL7, FHIR, CDISC, 유전체 파일 등 모든 형식의 데이터를 자동으로 통합
- **개방형 아키텍처**: EHR/EMR 시스템과의 양방향 API 연동
- **Foundry Archetypes**: 데이터 표준화 기간을 수년에서 수주로 단축
- **협업 분석**: R, Python, SQL을 지원하는 코드 워크북 및 RStudio 통합
- **모델 관리**: 중앙 집중식 모델 거버넌스 및 라이프사이클 추적

#### 의료 분야 적용
Foundry는 임상, 운영, 재무, 인력, 외부 데이터를 원활하게 통합하여, 예측 기반의 수요 모델링을 통해 병원의 수용력, 인력 배치, 자원 관리를 최적화한다. 복잡한 데이터를 의료진이 이해할 수 있는 형태로 변환하여 의사결정과 자원 배분을 지원한다.

### 2.2 Palantir AIP (AI Platform)

#### 개요
AIP는 2023년 출시된 팔란티어의 AI 플랫폼으로, 대규모 언어 모델(LLM) 및 멀티모달 모델을 기업 데이터와 안전하게 결합하여 운영 자동화를 실현한다.

#### 핵심 구성 요소
- **AIP Logic**: 비즈니스 로직을 LLM 기반 함수로 구현
- **AIP Agent Studio**: AI 에이전트 생성 및 관리 도구
- **AIP Assist**: 자연어 기반의 데이터 탐색 및 분석 도우미
- **평가 스위트(Evaluation Suite)**: AI 성능 측정 및 품질 관리

#### 의료 분야 활용
- 다양한 LLM 및 멀티모달 모델에 대한 거버넌스 기반 접근
- LLM 기반 함수 구축으로 임상 워크플로우 자동화
- 에이전트 생성 및 관리를 통한 병원 운영 효율화
- 기업 프로세스 전반에 걸친 자동화 정의 및 실행

### 2.3 온톨로지 시스템 (Ontology)

#### 개념
팔란티어 온톨로지는 조직의 **디지털 트윈(Digital Twin)**으로, 데이터셋과 모델 위에 존재하는 의미론적 계층(Semantic Layer)이다. 실세계 개체(환자, 장비, 병상 등)를 디지털 자산으로 매핑하여 조직 전체의 통합된 뷰를 제공한다.

#### 핵심 구성
| 구성 요소 | 설명 |
|-----------|------|
| **Object Type** | 조직 내 엔티티 또는 이벤트 정의 (예: 환자, 진료, 병상) |
| **Property** | 객체 유형의 특성 정의 (예: 환자명, 진단코드, 병상번호) |
| **Link Type** | 두 객체 유형 간의 관계 정의 (예: 환자-진료, 의사-수술) |
| **Action Type** | 객체 유형의 수정 방법 정의 (예: 입원 처리, 퇴원 처리) |

#### 의료 온톨로지 구조
의료 분야에서 온톨로지는 다음과 같이 모델링된다:

```
환자(Patient) → 내원(Encounter) → 진단(Diagnosis) → 처방(Medication)
         ↓              ↓              ↓
    간호사 일정    병상 배정      검사 결과
         ↓              ↓              ↓
    의료 물품      수술 스케줄    보험 청구
```

이 구조를 통해 병원 시스템은 환자, 간호사 일정, 의료 물품, 병상 수용력 등 실시간으로 변화하는 요소들을 통합적으로 관리하며, 엄격한 컴플라이언스를 유지하면서 AI 에이전트와 인간 사용자 모두가 데이터 기반 의사결정을 수행할 수 있다.

#### 아키텍처
- **Object Set Service (OSS)**: 온톨로지에서 데이터를 읽는 서비스로, 검색/필터링/집계/로딩 기능 제공
- **Object Data Funnel**: 온톨로지에 데이터를 쓰는 마이크로서비스
- **통합 도구**: Object Explorer, Quiver(분석), Workshop(앱 빌더) 등과 긴밀히 통합

---

## 3. 의료 분야 솔루션

### 3.1 병원 운영 최적화 (Palantir for Hospitals)

#### 개요
**Palantir for Hospitals**는 미국 의료 시스템의 **15% 이상**을 지원하는 AI 기반 병원 운영 시스템이다. 간호사 스케줄링, 인력 배치, 전원 센터 최적화, 퇴원 관리 등 핵심 워크플로우를 관리한다.

#### 3대 핵심 모듈

**1) 수용력 관리 (Capacity Management)**
- 실시간 환자 흐름 및 병상 배분 최적화
- 입원, 퇴원, 전원 예측
- AI 기반 환자 배치 권장

| 성과 사례 | 결과 |
|-----------|------|
| Mount Sinai | 재택치료 프로그램 입원 400% 증가 |
| Tampa General | PACU 대기 시간 28% 감소, 환자 배치 시간 83% 감소 |
| Cleveland Clinic | 일일 전원량 7.6% 증가, 응급실 대기시간 38분 단축 |

**2) 수익 주기 관리 (Revenue Cycle Management)**
- 청구 및 보험 처리 자동화
- 누락 청구 식별 및 거부 방지
- AI 기반 이의신청서 자동 생성

| 성과 사례 | 결과 |
|-----------|------|
| Mount Sinai | FTE 이의신청서 효율 100% 향상 |
| NYC 의료 시스템 | 1,800만 달러 환급 기회 식별, 연간 1,700만 달러 가치 |
| Nebraska Medicine | 이의 처리 시간 15분 → 3분으로 단축 |

**3) 인력 배치 및 스케줄링 (Staffing & Scheduling)**
- 지능형 인력 배분
- 자동 스케줄 생성 (직원 선호도 반영)
- 예측 기반 사전적 인력 권고

| 성과 사례 | 결과 |
|-----------|------|
| HCA Healthcare | 30,000명 활성 사용자, 간호 스케줄링 행정 부담 90% 제거 |
| 대형 병원 | 간호 비용 600만 달러 절감 |
| Cleveland Clinic | 미사용 수술실(OR) 시간 40% 감소 |

#### Virtual Command Center (가상 지휘 센터)
Cleveland Clinic과 공동 개발한 가상 지휘 센터는 병원의 **디지털 트윈**을 구현한다.

주요 모듈:
- **Hospital 360**: 실시간 환자 수 표시 및 시설별 수용력 예측
- **OR Stewardship**: 수술실 스케줄링 및 운영 최적화 (기존 엑셀/전화/메모 기반 → AI 기반)
- **Staffing Module**: 간호사 자동 스케줄 생성

> "이것은 Cleveland Clinic이 공동 개발한 최초의 상업적으로 실행 가능한 AI 제품입니다. 팔란티어와 함께 가장 복잡한 병원의 디지털 트윈을 만들었습니다." - Cleveland Clinic CEO

### 3.2 임상 의사결정 지원

#### 패혈증 조기 탐지 (Tampa General Hospital)
- **Sepsis Hub**: AI가 고위험 환자를 식별하고 조기 임상 개입을 촉진
- **성과**: 700명 이상의 생명 구출 (2025년 11월 기준)
- 500명 이상의 의사가 자동 임상 노트 작성용 앰비언트 리스닝 기술 활용
- 문서 작성 시간 50% 단축

#### MRI 영상 처리
- Tampa General에서 MRI 영상 턴어라운드 시간 30% 개선

#### 데이터 기반 진단 및 치료 계획
- AIP를 활용한 데이터 기반 진단 및 치료 계획 수립
- 임상 데이터와 운영 데이터의 통합을 통한 종합적 환자 뷰 제공

### 3.3 신약 개발 / 임상시험

#### 임상시험 데이터 통합
- **100개 이상의 면역 항암 임상시험** 데이터 통합 (25,000명 이상의 환자 포함)
- 역사적 임상시험 데이터를 조화(harmonize)하여 풀링 분석 생성
- 프로토콜 설계, 사이트 선정, 환자 모집 지원
- 적응증 확대 및 바이오마커 전략 가설 수립

#### Parexel 파트너십
- 세계적 CRO 기업 Parexel과 다년간 전략적 파트너십 체결
- Foundry 및 AIP를 활용하여 임상 데이터 플랫폼 강화
- 임상시험 효율성 향상과 안전성/규제 준수 유지
- 임상 데이터 전달 가속화

#### 신약 발견
- **1억 개 이상의 약물 반응 곡선** 분석을 통한 신약 발견 워크플로우 가속화
- 통합된 실험 데이터에서 새로운 약물 재목적화(repurposing) 기회 발굴
- 정밀 의학 이니셔티브 지원을 위한 대규모 유전체 데이터 통합 및 분석

#### 세포주 개발 및 바이오제조
- 클론 선정 과정 전반의 실험실 데이터 연결
- 제조 공정의 편차를 예측하는 자동 경보 및 예측 AI
- 운영 사일로를 극복하는 데이터 연결성 활용

### 3.4 인구 건강 관리 (Population Health)

#### Foundry for Population Health
- 분석과 운영을 통합하여 확장 가능한 인구 건강 관리 구현
- 이해관계자 전반에 걸친 이니셔티브를 위한 중앙 진실 소스 확립
- 시스템 간 상호운용성을 유지하면서 인사이트 접근 장벽 제거

#### CDC 파트너십
- CDC와 **10년간의 파트너십** 연장
- **DCIPHER 프로그램**: 질병 감시 및 유행 대응을 위한 데이터 통합, 분석, 운영 워크플로우
- 식품매개 질환, 에볼라, 호흡기 질환, 탄저병, 세균성 특수 병원체 대응에 활용
- **5년 4.43억 달러 계약**: 미래 유행병 및 공공보건 사건 대응 솔루션

#### Real World Evidence (RWE)
- OMOP 공통 데이터 모델로 데이터를 변환하는 사전 구성된 파이프라인
- 데이터 접근 및 연구 승인을 위한 거버넌스 프레임워크
- 비기술 사용자를 위한 신속한 코호트 도구

#### OneMedNet 파트너십 (2025)
- Real-World Data(RWD) 분석 시장 혁신을 위해 OneMedNet과 협력
- 실시간 AI 기반 의료 제공자 네트워크(iRWD) 인프라 구축

### 3.5 공급망 관리

#### Concordance Healthcare 파트너십
- **최초의 완전 통합 의료 공급망 생태계** 구축
- 제조사, 공급업체, 유통업체, 의료기관의 재고 및 공급망 데이터를 하나의 실시간 시스템으로 통합
- 생산부터 환자 치료 시점까지 각 단계의 공급망 정보에 대한 완전한 가시성 확보

#### Cardinal Health 파트너십
- Foundry에 통합된 Cardinal Health 솔루션
- AI/ML을 활용하여 진단 및 임상 데이터를 실시간 구매/소비 데이터와 결합
- 치료 활용도, 보험 환급 인사이트, 예측 기반 의약품 재고 관리

#### Option Care Health
- AIP를 활용한 간호사 스케줄링, 환자 온보딩, 구매 및 공급망 실행 최적화
- AI 및 LLM을 활용한 전사적 디지털 전환

#### 공급망 Control Tower
- 자동으로 공급 중단을 감지하고 알림
- 360도 계정 가시성과 수요 예측 모델 통합

---

## 4. 주요 고객 사례

### 4.1 NHS (영국 국민건강서비스)

#### COVID-19 대응 (2020-2022)

**배경**: 2020년 3월, NHS는 팔란티어, Microsoft, Google과 협력하여 COVID-19 대응 데이터 분석을 개시했다.

**NHS COVID-19 Data Store**:
- 안전한 클라우드 처리 환경에서 Foundry 플랫폼을 운영
- COVID-19 확산 추적 및 예측
- 공중보건 및 환자 대상 개입 조치 모델링
- 보건 및 지역사회 자원 최적화
- 전략적/운영적 의사결정을 위한 정확한 실시간 정보 제공

**계약 규모**:
- 최초 계약: 1파운드(명목 비용)
- 확대 계약: 2,300만 파운드 (2020년 12월~2022년 12월)

#### Federated Data Platform (FDP) 계약 (2023~)

**계약 규모**: 3억 3,000만 파운드 (2023년 11월 수주)

**현황 및 논란**:
- 2024년 말까지 영국 215개 병원 트러스트 중 **25% 미만**만 적극 사용
- NHS England가 586페이지 계약서의 대부분을 편집(redact)하여 공개, 투명성 논란
- Good Law Project가 과도한 편집에 대해 법적 소송 제기
- 팔란티어가 Good Law Project를 대상으로 비공개 인플루언서 캠페인 실행 → NHS England로부터 계약 위반 가능성 조사
- 여러 트러스트가 "FDP보다 이미 보유한 도구가 더 우수하다"고 평가
- Leeds Teaching Hospitals NHS Trust는 일부 도구 채택 시 "기능 상실"이 발생한다고 보고
- 개인 건강 데이터의 프라이버시 우려 및 팔란티어의 정보기관 관련 이력에 대한 불신

**긍정적 사례**:
- North Cumbria NHS Trust: 수술실 계획자가 주당 3시간 이상 절약, 수술 건수 10% 증가

### 4.2 Cleveland Clinic (미국)

**파트너십 시작**: 2023년 1월 (다년간 파트너십)

**Virtual Command Center 구축**:
- Foundry 기반의 병원 운영 가상 지휘 센터
- 환자 입원, 퇴원, 전원 예측
- 간병인 및 병상 가용성 평가

**성과**:
| 지표 | 결과 |
|------|------|
| 환자 전원(메인 캠퍼스) | +7.6% |
| 응급실 대기 시간 | -38분 |
| 정형외과 미사용 수술실 시간 | -40% |

### 4.3 Tampa General Hospital (미국)

**파트너십 시작**: 2021년 (Foundry 도입), 2024년 AIP 확대

**성과**:
| 지표 | 결과 |
|------|------|
| 패혈증 허브를 통한 생명 구출 | 700명 이상 (2025.11 기준) |
| MRI 영상 턴어라운드 시간 | 30% 개선 |
| 환자 배치 시간 | 83% 감소 |
| PACU 대기 시간 | 28% 감소 |
| 앰비언트 리스닝 활용 의사 | 500명 이상 |
| 문서 작성 시간 | 50% 단축 |

**수상**: Tampa Bay Business Journal 2026 Inno Award "올해의 파트너십" 수상

### 4.4 Mount Sinai Health System (미국)

**성과**:
- 환자 재원 기간 1.5일 단축
- 매달 평균 20개 병상을 신규 건설 없이 추가 확보
- 재택치료 프로그램 입원 400% 증가
- FTE 이의신청서 효율 100% 향상
- 한 부서/한 병원에서 연간 150만 달러 ROI 추적

### 4.5 HCA Healthcare (미국)

- 30,000명 활성 사용자 (전 직급)
- 간호사 스케줄 자동 생성 시스템 구축
- 간호 스케줄링 행정 부담 90% 제거
- 단계적 확대 중 (40개 병원 목표)

### 4.6 NIH / NCI (미국 국립보건원 / 국립암연구소)

**N3C (National COVID Cohort Collaborative)**:
- COVID-19 연구 지원을 위한 데이터 엔클레이브 운영
- 최초 3,600만 달러(1년) → 6,000만 달러(2년)로 확대

**NCI 연구 지원**:
- Foundry 기반 RNA-seq 워크플로우를 NCI 연구자에게 무료 제공
- 암 연구 가속화 및 PEPFAR(대통령 에이즈 구호 계획) 지원

### 4.7 기타 주요 파트너

| 기관/기업 | 내용 |
|-----------|------|
| **The Joint Commission** | 환자 안전 및 의료 표준 향상을 위한 전략적 파트너십 (2025.5) |
| **Cognizant** | TriZetto 의료 사업에 Foundry/AIP 통합 (2026.2) |
| **R1 RCM** | R37 AI 연구소 설립, 수익 주기 관리 AI 솔루션 개발 |
| **TeleTracking** | 병원 운영 최적화를 위한 파트너십 |
| **LifePoint Health** | AI 기반 환자 흐름 및 인력 배치 |
| **Nebraska Medicine** | 이의 처리 시간 15분 → 3분 단축 |
| **NYC Health + Hospitals** | 70개 이상 시설에 Foundry 배포, 400만 달러 계약 |
| **CDC** | 10년 파트너십, DCIPHER 프로그램, 5년 4.43억 달러 계약 |

---

## 5. AI 에이전트 기능

### 5.1 AIP Agent Studio

팔란티어의 AI 에이전트는 **AIP Agent Studio**를 통해 구축되며, 다음과 같은 특성을 갖는다:

#### 핵심 구성 요소
- **LLM(대규모 언어 모델)**: 에이전트의 추론 엔진
- **온톨로지(Ontology)**: 기업 데이터에 대한 구조화된 접근
- **문서(Documents)**: 기업 지식 기반
- **커스텀 도구(Custom Tools)**: 특정 작업 수행을 위한 도구

#### 에이전트 기능
- 동적(dynamic), 컨텍스트 인식(context-aware) 읽기/쓰기 워크플로우
- 작업 자동화 및 수동 애플리케이션 상호작용 감소
- 기업별 정보와 도구를 갖춘 대화형 어시스턴트
- 개발자부터 현장 사용자까지 전 조직원이 사용 가능

### 5.2 의료 AI 에이전트 활용 사례

#### 수술 스케줄링 에이전트
- OR Stewardship 모듈을 통한 수술실 스케줄링 자동화
- 과거 이력 기반 예측을 통한 성공적인 수술 이벤트 계획
- 기존의 엑셀, 메모, 전화, 이메일 기반 프로세스를 AI 기반으로 전환

#### 간호사 스케줄링 에이전트
- 자동 스케줄 생성 (직원 선호도 반영)
- 하류 영향(downstream impact)을 고려한 사전적 인력 권고
- HCA Healthcare에서 행정 부담 90% 제거

#### 환자 흐름 관리 에이전트
- 실시간 수용력 예측 및 환자 배치 권장
- AI 생성 문서화 및 자동 알림
- 패혈증 등 고위험 상태 조기 탐지

#### 수익 주기 에이전트 (R1 RCM 파트너십)
- AI 기반 에이전트형 RCM 솔루션
- 환급 비효율 해결
- 행정 비용 최소화 및 의료진 시간 확보

#### 앰비언트 리스닝 / 임상 노트 에이전트
- Tampa General에서 500명 이상의 의사가 활용
- 자동으로 임상 노트 초안 작성
- 문서 작성 시간 50% 단축

### 5.3 샌드박스 시뮬레이션

AIP의 온톨로지 기반 시뮬레이션 기능을 통해:
- 실제 데이터에 영향 없이 "what-if" 시나리오 테스트
- 새로운 운영 정책의 영향 사전 평가
- 인력 배치 변경의 효과 시뮬레이션

---

## 6. 데이터 거버넌스 및 보안

### 6.1 규제 준수 인증

| 인증/프레임워크 | 상태 |
|----------------|------|
| **HIPAA** | 준수 (의료 데이터 보호) |
| **FedRAMP Moderate** | 인증 |
| **DoD Impact Level 5** | 인증 |
| **ISO 27001/27017/27018** | 인증 |
| **ISO 9001** | 인증 |
| **SOC 2 Type 2** | 매년 감사 (보안, 기밀성, 가용성) |
| **NIST 800-53 / 800-171** | 정렬 |
| **GDPR** | 준수 |
| **GxP** | 준수 (의약품 관련) |
| **FISMA High** | 준수 |

### 6.2 데이터 보호 메커니즘

#### 암호화
- 전송 중(in transit) 및 저장 시(at rest) 모든 데이터의 필수 암호화
- 최신 강력 암호화 표준 적용

#### 접근 제어
- **목적 기반 접근 제어(Purpose-Based Access Control)**: 세분화된 정책 설정
- 데이터셋 수준의 세밀한 접근 제어 프레임워크
- 사용자 그룹별 발견(discover), 읽기(read), 수정(modify), 삭제(delete) 권한 개별 설정
- SSO(Single Sign-On) 및 다중 인증(MFA) 지원

#### 감사 추적 (Audit Trail)
- 모든 사용자 활동 캡처: 읽기, 쓰기, 삭제
- **누가, 언제, 어디서, 어떤 데이터에** 접근했는지 기록
- 잠재적 남용 탐지 및 조사를 위한 보안 감사 로깅

### 6.3 데이터 소유권

> "Palantir Foundry 내의 모든 데이터는 고객 소유이며, 팔란티어 소유가 아닙니다."

- 고객이 데이터의 완전한 소유권 보유
- 팔란티어는 데이터 처리자(processor)로서만 작동
- 데이터 무결성 및 투명성을 유지하기 위한 강력한 감사 기능

### 6.4 의료 데이터 특수 보호

- 가명화(pseudonymization) 처리를 통한 환자 데이터 보호
- NHS 사례: 가명화된 데이터만 NHS England 또는 DHSC 계약 직원에게 제공
- 연구용 데이터를 위한 비식별화(de-identification) 엔진
- 신뢰할 수 있는 연구 환경(Trusted Research Environment) 구축 지원

---

## 7. 경쟁사 비교

### 7.1 팔란티어의 포지셔닝

팔란티어는 **전통적인 EHR(전자건강기록) 시스템이 아닌**, 데이터 통합 및 AI 분석 플랫폼이다. EHR 위에 존재하는 "운영 지능(Operational Intelligence)" 계층으로 기능한다.

### 7.2 주요 경쟁사 비교

| 구분 | Palantir | Epic | Oracle Health (Cerner) |
|------|----------|------|----------------------|
| **유형** | 데이터 분석/AI 플랫폼 | EHR 시스템 | EHR 시스템 |
| **핵심 기능** | 데이터 통합, AI 분석, 운영 최적화 | 전자건강기록, 임상 워크플로우 | 전자건강기록, 인구건강 |
| **관계** | EHR과 **보완적** | 자체 완결형 | 자체 완결형 |
| **강점** | 이종 데이터 통합, AI/ML, 온톨로지 | 대형 의료 시스템, SmartTools | 정부 계약, 다양한 규모 지원 |
| **시장 점유** | 미국 의료 시스템 15%+ | 미국 급성기 병원 시장 1위 | 미국 급성기 병원 시장 2위 |
| **상호운용성** | 개방형 API, 모든 시스템과 연동 | Carequality 네트워크 | CommonWell Alliance |

### 7.3 데이터 분석 분야 경쟁사

| 경쟁사 | 의료 분야 특징 |
|--------|---------------|
| **Databricks** | 통합 데이터 레이크하우스, 생성형 AI, 의료 분야 적극 확장 |
| **IBM Watson** | Watson AI 및 Cloud Pak for Data, 의료/금융 분야 강점 |
| **SAS** | 엔터프라이즈급 분석, 도메인별 AI, 규제 산업 전문 |
| **Microsoft Azure** | Azure Synapse Analytics, Power BI, 클라우드 의료 솔루션 |
| **Google Cloud** | BigQuery, Looker, 의료 AI 연구 |
| **AWS** | 의료 데이터 레이크, 규제 준수 클라우드 |
| **Snowflake** | 의료 데이터 클라우드, 데이터 공유 |

### 7.4 팔란티어의 차별화 요소

1. **온톨로지 시스템**: 단순 데이터 분석을 넘어 조직의 디지털 트윈을 구현
2. **운영 통합**: 분석 결과를 실시간 운영 의사결정에 직접 연결
3. **정부/군사 경험**: 보안이 중요한 환경에서의 검증된 실적
4. **AIP 에이전트**: LLM 기반 에이전트를 기업 데이터와 안전하게 결합
5. **수직 통합**: 데이터 수집부터 AI 에이전트 배포까지 단일 플랫폼

---

## 8. 도입 모델 및 비용

### 8.1 배포 옵션

| 배포 방식 | 설명 |
|-----------|------|
| **클라우드** | AWS, Azure, GCP 등 퍼블릭 클라우드에 배포 |
| **온프레미스** | 고객 자체 데이터센터에 설치 |
| **하이브리드** | 클라우드와 온프레미스의 결합 |
| **AWS Marketplace** | AWS Marketplace를 통한 구독 |

### 8.2 가격 구조

팔란티어는 **공개 정가(list price)를 공표하지 않는다.** 가격은 다음 요소에 따라 결정된다:

- **라이선스 모델**: 사용자 수(per-seat), 사용량(capacity), 환경(per-environment) 기반
- **배포 방식**: 온프레미스 vs 클라우드 vs 하이브리드 및 관련 인프라 비용
- **전문 서비스**: 데이터 엔지니어링, 모델 개발, 교육, 지속 지원
- **계약 형태**: 대형 고객은 일반적으로 소프트웨어, 서비스, 데이터 통합을 포함하는 다년간 고정 요금 계약 체결

### 8.3 참고 계약 규모

| 고객 | 계약 규모 |
|------|-----------|
| NHS FDP | 3억 3,000만 파운드 (다년간) |
| CDC DCIPHER | 4억 4,300만 달러 (5년) |
| NIH/NCI | 6,000만 달러 (2년) |
| NYC Health + Hospitals | 400만 달러 |
| NHS COVID-19 | 2,300만 파운드 (2년) |
| 대형 기업/정부 | 1,000만~1억 달러+ (다년간) |

### 8.4 도입 프로세스

1. **PoC (Proof of Concept)**: 특정 사용 사례에 대한 개념 검증
2. **파일럿 프로젝트**: 제한된 범위에서의 실제 운영 테스트
3. **확대 배포**: 성공적인 파일럿 후 전 조직으로 확장
4. **지속적 확장**: 새로운 사용 사례 및 부서로 점진적 확대

### 8.5 Foundry 플랜 (공식 웹사이트 기준)

팔란티어는 Foundry에 대해 여러 플랜을 제공하며, AWS Marketplace를 통해서도 구독할 수 있다. 정확한 가격은 영업 팀과의 상담을 통해 결정된다.

---

## 9. 시사점 및 전망

### 9.1 강점

1. **검증된 실적**: 미국 의료 시스템 15% 이상 지원, Cleveland Clinic/Tampa General 등 실질적 성과 입증
2. **통합 플랫폼**: 데이터 통합에서 AI 에이전트까지 원스톱 솔루션
3. **온톨로지의 차별화**: 단순 데이터 분석이 아닌 조직의 디지털 트윈 구현
4. **폭발적 성장**: 2025년 매출 56% 성장, 의료 분야 계약 지속 확대
5. **파트너 생태계**: Cognizant, Parexel, R1 RCM, TeleTracking 등과의 전략적 파트너십

### 9.2 우려 사항

1. **개인정보 보호 논란**: NHS FDP 계약에서의 투명성 문제, 개인 건강 데이터 프라이버시 우려
2. **높은 비용**: 대형 계약 중심의 가격 구조로 중소 의료기관 접근 제한
3. **도입 저항**: NHS 사례에서 보듯 기존 시스템 대비 기능 부족 지적
4. **브랜드 이미지**: 정보기관/군사 분야 이력으로 인한 신뢰 문제
5. **벤더 종속(Lock-in)**: 플랫폼 의존도 증가에 따른 전환 비용 우려

### 9.3 향후 전망

1. **AI 에이전트 확산**: AIP Agent Studio를 통한 의료 AI 에이전트의 본격적인 상용화
2. **RCM 시장 확대**: R1 RCM 파트너십을 통한 수익 주기 관리 자동화
3. **글로벌 확장**: NHS 이후 유럽, 아시아 의료 시장 진출 가능성
4. **EHR 통합 심화**: Epic, Oracle Health 등 EHR 시스템과의 보완적 통합 확대
5. **정밀 의학**: 유전체 데이터 분석 및 맞춤형 치료 지원 강화
6. **Cognizant 파트너십 효과**: 의료 IT 시장에서의 영향력 대폭 확대 전망

### 9.4 한국 의료 시장에 대한 시사점

- 국내 대형 병원의 디지털 전환에 온톨로지 기반 접근법 적용 가능성
- 간호 인력 부족 문제 해결을 위한 AI 스케줄링 참고 모델
- 의료 데이터 통합 플랫폼 구축 시 Foundry 아키텍처 벤치마킹 가치
- K-의료 AI 솔루션 개발 시 경쟁 및 협력 대상으로 검토 필요
- 데이터 거버넌스 및 개인정보 보호 체계를 한국 규제(개인정보보호법, 의료법)에 맞게 적용하는 방안 연구 필요

---

## 10. 참고 자료 (URL 포함)

### 팔란티어 공식

| 출처 | URL |
|------|-----|
| Palantir for Hospitals | https://www.palantir.com/offerings/palantir-for-hospitals/ |
| Palantir Foundry | https://www.palantir.com/platforms/foundry/ |
| Palantir AIP | https://www.palantir.com/platforms/aip/ |
| Palantir Ontology | https://www.palantir.com/platforms/ontology/ |
| Palantir Health & Life Sciences | https://www.palantir.com/offerings/health/ |
| Palantir Life Sciences | https://www.palantir.com/offerings/life-sciences/ |
| Foundry Ontology 문서 | https://www.palantir.com/docs/foundry/ontology/overview |
| AIP Agent Studio 문서 | https://www.palantir.com/docs/foundry/agent-studio/overview |
| AIP Features 문서 | https://www.palantir.com/docs/foundry/aip/aip-features |
| Palantir 정보 보안 | https://www.palantir.com/information-security/ |
| Cleveland Clinic Impact | https://www.palantir.com/impact/cleveland-clinic/ |
| Tampa General Impact | https://www.palantir.com/impact/tampa-general-hospital/ |
| Foundry Plans (가격) | https://www.palantir.com/platforms/foundry/plans/ |

### 파트너십 및 뉴스

| 출처 | URL |
|------|-----|
| Cleveland Clinic-Palantir 파트너십 발표 | https://www.prnewswire.com/news-releases/cleveland-clinic-and-palantir-technologies-partner-to-improve-hospital-performance-through-virtual-command-center-301725481.html |
| Tampa General-Palantir 파트너십 | https://www.tgh.org/news/tgh-press-releases/2024/june/tgh-selects-palantir-ai-software-connected-care-coordination |
| Tampa General AI 성과 | https://www.healthcareitnews.com/news/tampa-generals-investment-ai-enabled-care-coordination-software-saves-nearly-600-lives |
| The Joint Commission 파트너십 | https://www.jointcommission.org/en/knowledge-library/news/2025-05-the-joint-commission-and-palantir-technologies |
| Cognizant-Palantir 파트너십 | https://news.cognizant.com/2026-02-05-Cognizant-partners-with-Palantir-to-Accelerate-AI-Driven-Modernization-in-Healthcare-and-Enterprise-Operations |
| OneMedNet-Palantir | https://investors.palantir.com/news-details/2025/OneMedNet-Selects-Palantir-to-Advance-Healthcare-AI-and-Data-Analytics/ |
| R1 RCM-Palantir R37 연구소 | https://www.r1rcm.com/news-and-press/r1-launches-r37-ai-lab-in-partnership-with-palantir/ |
| Parexel-Palantir 임상시험 협력 | https://newsroom.parexel.com/news-releases/news-release-details/parexel-and-palantir-expand-collaboration-accelerate-clinical |
| Cardinal Health-Palantir | https://newsroom.cardinalhealth.com/2023-01-26-Cardinal-Health-Teams-Up-with-Palantir-to-Deliver-a-Clinically-Integrated-Supply-Chain-Solution |
| Concordance-Palantir 공급망 | https://www.palantir.com/newsroom/press-releases/palantir-concordance-partner-to-power-first-fully-integrated-medical-supply-chain-ecosystem/ |
| Option Care Health-Palantir | https://www.fiercehealthcare.com/ai-and-machine-learning/jpm24-option-care-health-taps-palantirs-ai-nurse-scheduling-supply-chain |
| TeleTracking-Palantir | https://hitconsultant.net/2025/06/06/palantir-teletracking-partner-to-power-smarter-hospital-operations/ |
| NIH-Palantir 협력 | https://businesswire.com/news/home/20211004005350/en/NIH-Continues-Collaboration-With-Palantir-Technologies-to-Support-COVID-19-Research |

### NHS 관련

| 출처 | URL |
|------|-----|
| NHS COVID-19 Data Store | https://www.england.nhs.uk/contact-us/privacy-notice/how-we-use-your-information/covid-19-response/nhs-covid-19-data-store/ |
| Palantir NHS COVID 계약 (CNBC) | https://www.cnbc.com/2020/06/08/palantir-nhs-covid-19-data.html |
| Palantir NHS 23M 계약 | https://www.digitalhealth.net/2020/12/palantir-awarded-23m-deal-to-continue-work-on-nhs-covid-19-data-store/ |
| Palantir NHS FDP 계약 | https://www.computerweekly.com/news/366560657/Palantir-awarded-NHS-FDP-data-contract |
| FDP 채택률 문제 | https://www.theregister.com/2025/05/16/nhs_hospitals_palantir/ |
| FDP 논란 (Medact) | https://www.medact.org/2026/resources/reports/briefing-palantir-fdp/ |
| Good Law Project 소송 | https://www.digitalhealth.net/2024/02/good-law-project-sues-nhse-over-heavily-redacted-palantir-fdp-contract/ |

### 분석 기사

| 출처 | URL |
|------|-----|
| CNBC - Palantir 병원 운영 플랫폼 | https://www.cnbc.com/2023/06/17/palantir-hospital-operations-platform-accounts-for-10percent-of-revenue.html |
| Cleveland Clinic AI 활용 | https://consultqd.clevelandclinic.org/how-ai-assists-with-staffing-scheduling-and-once-tedious-tasks |
| Healthcare Dive - Cleveland Clinic AI | https://www.healthcaredive.com/news/Cleveland-Clinic-Palantir-AI-patient-flow/637937/ |
| HCA 간호사 스케줄링 | https://www.beckershospitalreview.com/healthcare-information-technology/innovation/how-hca-healthcare-palantir-use-data-to-generate-nurses-schedules/ |
| CDC 공중보건 분석 파트너십 | https://healthitanalytics.com/news/cdc-analytics-partnership-aims-to-advance-public-health-preparedness |
| Palantir 의료 분야 진출 가속 | https://fortuneshealth.com/latest-updates/palantir-accelerates-healthcare-push-with-ai-driven-hospital-solutions/ |

---

*본 보고서는 2026년 3월 29일 기준으로 공개적으로 이용 가능한 자료를 바탕으로 작성되었습니다.*
