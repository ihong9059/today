# SNOMED CT와 X-ray AI 진단 시스템 연동 가이드

## 부제: X-ray AI 결과의 국제 표준화를 위한 SNOMED CT 적용 방법

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| **작성일** | 2026-03-27 |
| **목적** | X-ray AI 진단 시스템에 SNOMED CT를 적용하여 국제 표준 상호운용성을 확보하는 방법 상세 기술 |
| **관련 문서** | X-ray_AI_진단_보고서.md (2026-03-26) |
| **대상 독자** | AI 의료 영상 시스템 기획/개발자, 의료정보 표준화 담당자 |

---

## 목차

1. [SNOMED CT 개요](#1-snomed-ct-개요)
2. [SNOMED CT의 구조와 체계](#2-snomed-ct의-구조와-체계)
3. [X-ray AI 진단에서 SNOMED CT가 필요한 이유](#3-x-ray-ai-진단에서-snomed-ct가-필요한-이유)
4. [X-ray 질환별 SNOMED CT 코드 매핑](#4-x-ray-질환별-snomed-ct-코드-매핑)
5. [AI 출력 → SNOMED CT 변환 파이프라인](#5-ai-출력--snomed-ct-변환-파이프라인)
6. [DICOM SR과 SNOMED CT 통합](#6-dicom-sr과-snomed-ct-통합)
7. [HL7 FHIR과 SNOMED CT 연동](#7-hl7-fhir과-snomed-ct-연동)
8. [관련 의료 표준 체계 종합](#8-관련-의료-표준-체계-종합)
9. [공개 데이터셋 라벨 ↔ SNOMED CT 매핑](#9-공개-데이터셋-라벨--snomed-ct-매핑)
10. [시스템 구축 시 SNOMED CT 적용 절차](#10-시스템-구축-시-snomed-ct-적용-절차)
11. [한국의 SNOMED CT 도입 현황](#11-한국의-snomed-ct-도입-현황)
12. [규제 및 인허가에서의 SNOMED CT](#12-규제-및-인허가에서의-snomed-ct)
13. [ICD-10/11과 SNOMED CT 크로스매핑](#13-icd-1011과-snomed-ct-크로스매핑)
14. [구현 코드 예시](#14-구현-코드-예시)
15. [도전 과제 및 권장 사항](#15-도전-과제-및-권장-사항)

---

## 1. SNOMED CT 개요

### 1.1 SNOMED CT란?

**SNOMED CT (Systematized Nomenclature of Medicine — Clinical Terms)**는 전 세계에서 가장 포괄적인 다국어 임상 의료 용어 체계입니다. 의료 현장에서 사용되는 모든 임상 개념(질환, 증상, 시술, 신체 부위, 약물, 검사 등)을 **고유한 코드**로 정의하여, 컴퓨터가 의료 정보를 정확하게 처리·교환·분석할 수 있도록 합니다.

```
일상 의료 표현:                    SNOMED CT 코드:

"환자가 폐렴입니다"       →      233604007 | Pneumonia
"왼쪽 아래 폐에 있습니다" →      41224006  | Structure of lower lobe of left lung
"X-ray로 확인했습니다"    →      399208008 | Plain chest X-ray
"중증입니다"              →      24484000  | Severe

→ 전 세계 어디서든 동일한 코드로 해석 가능
→ 한국어, 영어, 스페인어 등 관계없이 코드는 동일
```

### 1.2 기본 정보

| 항목 | 내용 |
|------|------|
| **관리 기관** | SNOMED International (비영리 국제기구, 본부 런던) |
| **설립** | 2007년 (SNOMED RT + Clinical Terms 통합) |
| **규모** | **35만+** 활성 개념, **150만+** 관계, **80만+** 동의어 |
| **릴리스 주기** | 국제판 연 2회 (1월, 7월), 각 국가 확장판 별도 |
| **라이선스** | 회원국 무료 사용, 비회원국 유료 |
| **회원국** | 40개국+ (한국 2020년 가입) |
| **지원 언어** | 영어, 스페인어, 스웨덴어 등 + 각국 번역 진행 중 |

### 1.3 다른 용어 체계와의 비교

| 용어 체계 | 목적 | 규모 | SNOMED CT와 관계 |
|----------|------|------|-----------------|
| **SNOMED CT** | 임상 기록의 정밀 코딩 | 35만+ 개념 | **기준 (Reference Terminology)** |
| **ICD-10/11** | 질병 분류, 보험 청구, 통계 | ~7만 코드 | SNOMED CT → ICD 자동 매핑 가능 |
| **LOINC** | 검사/관찰 항목 코딩 | ~10만 코드 | SNOMED CT와 보완 관계 |
| **RadLex** | 방사선학 전용 용어 | ~7만 용어 | SNOMED CT에 부분 포함, 영상 전문 |
| **CPT** | 시술/행위 코딩 (미국) | ~1만 코드 | 별도 체계 |

```
포괄성 비교:

SNOMED CT: ████████████████████████████████  (35만+ 개념, 최대)
ICD-10:    ██████████                         (~7만 코드)
RadLex:    ██████████                         (~7만 용어, 영상 특화)
LOINC:     ████████████                       (~10만, 검사 특화)

→ SNOMED CT가 가장 포괄적이며, 다른 체계들은 특정 목적에 특화
→ 실무에서는 SNOMED CT + ICD + LOINC를 조합하여 사용
```

### 1.4 왜 X-ray AI에 SNOMED CT가 중요한가?

AI가 X-ray를 분석하여 "폐렴"이라고 출력했을 때:

```
[SNOMED CT 없이]
  병원 A의 AI: "Pneumonia"
  병원 B의 AI: "폐렴"
  병원 C의 AI: "lung_infection_03"
  → 같은 질환인데 표현이 모두 다름 → 데이터 교환/통합 불가능

[SNOMED CT 적용 시]
  병원 A의 AI: 233604007
  병원 B의 AI: 233604007
  병원 C의 AI: 233604007
  → 전 세계 어디서든 동일한 의미 → 완전한 상호운용성
```

---

## 2. SNOMED CT의 구조와 체계

### 2.1 핵심 구성 요소

SNOMED CT는 3가지 핵심 요소로 구성됩니다:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SNOMED CT 핵심 구조                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. 개념 (Concepts)                                               │
│     └─ 고유 식별자(SCTID) + 의미                                 │
│        예: 233604007 = "Pneumonia"                                │
│                                                                   │
│  2. 서술 (Descriptions)                                           │
│     └─ 개념의 이름/동의어 (다국어)                                │
│        예: 233604007 → "Pneumonia", "폐렴", "肺炎"              │
│                                                                   │
│  3. 관계 (Relationships)                                          │
│     └─ 개념 간의 논리적 연결                                      │
│        예: "폐렴" IS-A "폐질환" IS-A "호흡기질환"                │
│        예: "폐렴" FINDING-SITE "폐 구조"                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 개념 식별자 (SCTID)

| 항목 | 설명 |
|------|------|
| **형식** | 6~18자리 숫자 (예: 233604007) |
| **고유성** | 전 세계에서 유일, 절대 재사용하지 않음 |
| **불변성** | 한번 부여되면 의미가 변하지 않음 |
| **의미 없음** | 숫자 자체에 의미 없음 (순서, 분류 아님) |

### 2.3 계층 구조 (Hierarchy)

SNOMED CT의 최상위 계층은 19개입니다. X-ray AI와 관련된 주요 계층:

```
SNOMED CT Root
├── Clinical Finding (임상 소견)          ← 질환, 증상
│   ├── Disease (질환)
│   │   ├── Respiratory disorder
│   │   │   ├── Pneumonia (233604007)
│   │   │   ├── Tuberculosis (154283005)
│   │   │   └── Pneumothorax (36118008)
│   │   ├── Cardiovascular disorder
│   │   │   └── Cardiomegaly (8186001)
│   │   └── Neoplasm
│   │       └── Lung cancer (254632001)
│   └── Finding (소견)
│       ├── Pulmonary opacity
│       └── Pleural effusion (60046008)
│
├── Body Structure (신체 구조)            ← 해부학적 위치
│   ├── Structure of lung (39607008)
│   │   ├── Right lung (3341006)
│   │   │   ├── Upper lobe of right lung (45653009)
│   │   │   ├── Middle lobe of right lung (72481006)
│   │   │   └── Lower lobe of right lung (266005)
│   │   └── Left lung (44029006)
│   │       ├── Upper lobe of left lung (44714003)
│   │       └── Lower lobe of left lung (41224006)
│   ├── Structure of heart (80891009)
│   └── Structure of pleura (3120008)
│
├── Procedure (시술/검사)                 ← 검사 방법
│   ├── Plain chest X-ray (399208008)
│   ├── CT of chest (169069000)
│   └── Mammography (71651007)
│
├── Observable Entity (관찰 가능 항목)    ← 측정값
│   ├── Cardiothoracic ratio
│   └── Lesion size
│
├── Qualifier Value (한정자)              ← 심각도, 확실성
│   ├── Severe (24484000)
│   ├── Moderate (6736007)
│   ├── Mild (255604002)
│   ├── Definite (410605003)
│   └── Suspected (415684004)
│
└── Situation with Explicit Context       ← 맥락 정보
    ├── Known present
    ├── Known absent
    └── Suspected
```

### 2.4 관계 유형 (Relationship Types)

SNOMED CT 개념들은 다양한 관계로 연결됩니다:

| 관계 | 의미 | 예시 |
|------|------|------|
| **IS-A** | ~의 하위 유형이다 | 폐렴 IS-A 폐감염 IS-A 호흡기질환 |
| **FINDING-SITE** | 소견의 위치 | 폐렴 FINDING-SITE 폐 구조 |
| **ASSOCIATED-MORPHOLOGY** | 관련 형태 | 폐렴 ASSOCIATED-MORPHOLOGY 염증 |
| **CAUSATIVE-AGENT** | 원인체 | 결핵 CAUSATIVE-AGENT 결핵균 |
| **SEVERITY** | 심각도 | 중증 폐렴 SEVERITY 중증 |
| **LATERALITY** | 좌/우 | 좌측 기흉 LATERALITY 좌측 |
| **METHOD** | 검사 방법 | X-ray 검사 METHOD 방사선 촬영 |

```
폐렴(233604007)의 SNOMED CT 관계 구조:

           ┌─── IS-A ───→ 폐감염 (53084003)
           │                   └── IS-A → 호흡기질환 → 질환 → 임상소견
           │
233604007 ─┼─── FINDING-SITE ──→ 폐 구조 (39607008)
(Pneumonia)│
           ├─── ASSOCIATED-MORPHOLOGY ──→ 염증 (23583003)
           │
           └─── CAUSATIVE-AGENT ──→ (세균/바이러스 등 하위 분류)
                                      ├── 세균성 폐렴 (bacterial)
                                      ├── 바이러스성 폐렴 (viral)
                                      └── COVID-19 폐렴 (840539006)
```

### 2.5 후조합 표현 (Post-coordination)

단일 코드로 표현할 수 없는 복합 개념을 **여러 코드를 조합**하여 표현합니다:

```
"좌하엽의 중증 세균성 폐렴"

= 233604007 | Pneumonia
  : 363698007 | Finding site = 41224006 | Lower lobe of left lung
  : 246112005 | Severity = 24484000 | Severe
  : 246075003 | Causative agent = 409822003 | Bacteria

→ 하나의 사전 정의된 코드가 없어도, 기존 코드를 조합하여 정밀 표현 가능
→ AI 진단 결과를 매우 상세하게 코딩할 수 있음
```

---

## 3. X-ray AI 진단에서 SNOMED CT가 필요한 이유

### 3.1 5가지 핵심 필요성

```
┌─────────────────────────────────────────────────────────────────┐
│            X-ray AI에 SNOMED CT가 필요한 5가지 이유               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ① 상호운용성 (Interoperability)                                  │
│     → 병원 A의 AI 결과를 병원 B에서 그대로 이해/활용             │
│     → 국내↔해외 의료 데이터 교환                                 │
│                                                                   │
│  ② 의미적 정밀성 (Semantic Precision)                             │
│     → "폐렴"과 "폐렴 의심"은 다름 → 코드로 구분                 │
│     → 위치, 심각도, 원인까지 구조화                               │
│                                                                   │
│  ③ 의사결정 지원 (Clinical Decision Support)                      │
│     → AI 결과가 SNOMED CT로 코딩되면 CDS 규칙과 자동 연동        │
│     → "기흉 감지 → 응급 프로토콜 자동 트리거"                    │
│                                                                   │
│  ④ 데이터 분석/연구 (Analytics & Research)                        │
│     → 대규모 AI 진단 결과를 일관되게 집계/분석                   │
│     → "전국 폐렴 AI 감지율" 같은 통계 산출 가능                  │
│                                                                   │
│  ⑤ 규제 준수 (Regulatory Compliance)                              │
│     → 식약처/FDA의 상호운용성 요구사항 충족                      │
│     → EU AI Act의 투명성 요건 대응                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 SNOMED CT 없이 발생하는 문제

| 문제 | 설명 | 실제 사례 |
|------|------|----------|
| **용어 불일치** | 같은 질환을 다르게 표현 | AI-A: "consolidation", AI-B: "경화", AI-C: "lung_opacity" |
| **의미 손실** | 자연어 전달 시 정보 누락 | "왼쪽 폐렴" → 어느 엽(lobe)인지 불명확 |
| **통합 불가** | 다기관 데이터 합산 불가 | 10개 병원 AI 결과를 모아도 기준이 달라 비교 불가 |
| **CDS 단절** | 의사결정 시스템과 연동 불가 | "기흉" 감지했지만 응급 알림이 트리거되지 않음 |
| **보험 청구 수작업** | AI 결과를 ICD 코드로 수동 변환 | 사무 인력 추가 필요, 오류 발생 |

### 3.3 SNOMED CT 적용 전후 비교

```
[적용 전 — AI 출력이 비표준]

X-ray AI → "Pneumonia, left lower, severe, prob=0.92"
                    ↓ (수동 해석)
의사: "아, 좌하엽 폐렴이구나" → 수기 입력
                    ↓ (수동 변환)
보험 청구: J18.9 (폐렴 상세불명) → 정보 손실
                    ↓
다른 병원: 결과 공유 불가

[적용 후 — SNOMED CT 코딩]

X-ray AI → {
  finding: 233604007 | Pneumonia,
  site: 41224006 | Lower lobe of left lung,
  severity: 24484000 | Severe,
  certainty: 410605003 | Definite,
  probability: 0.92
}
    ↓ (자동)
DICOM SR → 구조화 보고서 자동 생성
    ↓ (자동)
EHR/FHIR → 의사의 워크플로우에 자동 통합
    ↓ (자동 매핑)
ICD-10: J18.1 (대엽성 폐렴) → 정확한 청구
    ↓ (자동)
CDS: 항생제 처방 권고 자동 표시
    ↓ (자동)
다른 병원: SNOMED CT 코드로 즉시 이해
```

---

## 4. X-ray 질환별 SNOMED CT 코드 매핑

### 4.1 흉부 X-ray 질환 (14개 — NIH ChestX-ray14 기준)

| # | 질환 (영문) | 질환 (한글) | SNOMED CT Code | SNOMED CT FSN |
|:-:|------------|-----------|:--------------:|---------------|
| 1 | Atelectasis | 무기폐 | **46621007** | Atelectasis (disorder) |
| 2 | Cardiomegaly | 심비대 | **8186001** | Cardiomegaly (disorder) |
| 3 | Effusion | 흉막삼출 | **60046008** | Pleural effusion (disorder) |
| 4 | Infiltration | 침윤 | **129614006** | Infiltrate of lung (finding) |
| 5 | Mass | 종괴 | **309529002** | Mass of lung (finding) |
| 6 | Nodule | 결절 | **427359005** | Solitary nodule of lung (finding) |
| 7 | Pneumonia | 폐렴 | **233604007** | Pneumonia (disorder) |
| 8 | Pneumothorax | 기흉 | **36118008** | Pneumothorax (disorder) |
| 9 | Consolidation | 경화 | **60567007** | Pulmonary consolidation (finding) |
| 10 | Edema | 폐부종 | **19242006** | Pulmonary edema (disorder) |
| 11 | Emphysema | 폐기종 | **87433001** | Pulmonary emphysema (disorder) |
| 12 | Fibrosis | 섬유화 | **51615001** | Fibrosis of lung (disorder) |
| 13 | Pleural Thickening | 흉막비후 | **78381009** | Pleural thickening (finding) |
| 14 | Hernia | 탈장 | **414403008** | Hiatal hernia (disorder) |

### 4.2 추가 흉부 질환

| 질환 (한글) | SNOMED CT Code | SNOMED CT FSN |
|-----------|:--------------:|---------------|
| COVID-19 폐렴 | **840539006** | Disease caused by SARS-CoV-2 |
| 폐결핵 | **154283005** | Pulmonary tuberculosis (disorder) |
| 폐암 | **254632001** | Small cell carcinoma of lung (disorder) |
| 비소세포폐암 | **254637007** | Non-small cell lung cancer (disorder) |
| COPD | **13645005** | Chronic obstructive lung disease (disorder) |
| 폐색전증 | **59282003** | Pulmonary embolism (disorder) |
| 기관지확장증 | **12295008** | Bronchiectasis (disorder) |
| 사르코이드증 | **31541009** | Sarcoidosis (disorder) |

### 4.3 근골격계 X-ray 질환

| 질환 (한글) | SNOMED CT Code | SNOMED CT FSN |
|-----------|:--------------:|---------------|
| 골절 (일반) | **125605004** | Fracture of bone (disorder) |
| 대퇴경부 골절 | **5913000** | Fracture of neck of femur (disorder) |
| 요골 골절 | **302222001** | Fracture of radius (disorder) |
| 척추 압박골절 | **443165006** | Vertebral compression fracture (disorder) |
| 탈구 | **87642003** | Dislocation (disorder) |
| 골다공증 | **64859006** | Osteoporosis (disorder) |
| 관절염 | **3723001** | Arthritis (disorder) |

### 4.4 치과 X-ray 질환

| 질환 (한글) | SNOMED CT Code | SNOMED CT FSN |
|-----------|:--------------:|---------------|
| 충치 | **80967001** | Dental caries (disorder) |
| 치주질환 | **2556008** | Periodontal disease (disorder) |
| 치근단 농양 | **83412009** | Periapical abscess (disorder) |
| 매복치 | **109490004** | Impacted tooth (disorder) |

### 4.5 유방 X-ray (Mammography) 질환

| 질환 (한글) | SNOMED CT Code | SNOMED CT FSN |
|-----------|:--------------:|---------------|
| 유방암 | **254838004** | Carcinoma of breast (disorder) |
| 유방 석회화 | **129748002** | Breast calcification (finding) |
| 유방 종괴 | **290079001** | Breast lump (finding) |
| BI-RADS 분류 | **397138000** | Mammographic breast density (observable) |

### 4.6 해부학적 위치 코드 (Body Structure)

AI가 병변 위치를 보고할 때 사용하는 주요 해부학 코드:

| 위치 (한글) | SNOMED CT Code | SNOMED CT FSN |
|-----------|:--------------:|---------------|
| 폐 전체 | **39607008** | Lung structure |
| 우폐 | **3341006** | Structure of right lung |
| 좌폐 | **44029006** | Structure of left lung |
| 우상엽 | **45653009** | Upper lobe of right lung |
| 우중엽 | **72481006** | Middle lobe of right lung |
| 우하엽 | **266005** | Lower lobe of right lung |
| 좌상엽 | **44714003** | Upper lobe of left lung |
| 좌하엽 | **41224006** | Lower lobe of left lung |
| 심장 | **80891009** | Heart structure |
| 흉막 | **3120008** | Pleural structure |
| 종격동 | **72410000** | Mediastinal structure |
| 횡격막 | **5798000** | Diaphragm structure |
| 늑골 | **113197003** | Rib structure |
| 쇄골 | **51299004** | Clavicle structure |

### 4.7 한정자 코드 (Qualifier Values)

AI 판정의 확실성과 심각도를 코딩하는 한정자:

**심각도 (Severity):**

| 수준 | SNOMED CT Code | 설명 |
|------|:--------------:|------|
| 경증 | **255604002** | Mild |
| 중등도 | **6736007** | Moderate |
| 중증 | **24484000** | Severe |

**확실성 (Certainty):**

| 수준 | SNOMED CT Code | AI 확률 매핑 (권장) |
|------|:--------------:|:------------------:|
| 확정 (Definite) | **410605003** | ≥ 90% |
| 가능성 높음 (Probable) | **2931005** | 70~89% |
| 의심 (Suspected) | **415684004** | 50~69% |
| 가능성 있음 (Possible) | **60022001** | 30~49% |
| 배제 가능 (Unlikely) | **261665006** | < 30% |

**측면 (Laterality):**

| 측면 | SNOMED CT Code |
|------|:--------------:|
| 좌측 | **7771000** |
| 우측 | **24028007** |
| 양측 | **51440002** |

---

## 5. AI 출력 → SNOMED CT 변환 파이프라인

### 5.1 전체 흐름

```
┌─────────────────────────────────────────────────────────────────────────┐
│               AI 출력 → SNOMED CT 변환 파이프라인                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [Stage 1] AI 모델 Raw 출력                                             │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │ {                                                            │      │
│  │   "predictions": [                                           │      │
│  │     {"label": "Pneumonia", "probability": 0.92,              │      │
│  │      "bbox": [120, 200, 350, 450]},                          │      │
│  │     {"label": "Pleural_Effusion", "probability": 0.15}       │      │
│  │   ]                                                          │      │
│  │ }                                                            │      │
│  └──────────────────────────┬───────────────────────────────────┘      │
│                              │                                          │
│  [Stage 2] 라벨 → SNOMED CT 매핑                                       │
│  ┌──────────────────────────┴───────────────────────────────────┐      │
│  │ Mapping Table:                                               │      │
│  │   "Pneumonia"         → 233604007                            │      │
│  │   "Pleural_Effusion"  → 60046008                             │      │
│  │                                                              │      │
│  │ → 매핑 테이블은 사전 정의 (모델 학습 라벨 ↔ SNOMED CT)      │      │
│  └──────────────────────────┬───────────────────────────────────┘      │
│                              │                                          │
│  [Stage 3] 확실성/심각도 결정                                           │
│  ┌──────────────────────────┴───────────────────────────────────┐      │
│  │ probability 0.92 → 410605003 (Definite, ≥90%)               │      │
│  │ probability 0.15 → 261665006 (Unlikely, <30%)               │      │
│  │                                                              │      │
│  │ severity: bbox 크기 + 확률 기반 추정 (선택적)                │      │
│  └──────────────────────────┬───────────────────────────────────┘      │
│                              │                                          │
│  [Stage 4] 위치 정보 코딩                                               │
│  ┌──────────────────────────┴───────────────────────────────────┐      │
│  │ bbox [120, 200, 350, 450] → 영상 좌표를 해부학 영역으로 매핑│      │
│  │ → 좌하엽 영역에 해당 → 41224006 (Lower lobe of left lung)  │      │
│  │                                                              │      │
│  │ ※ Bbox→해부학 매핑은 별도 모듈 필요 (폐 분할 + 영역 매핑)  │      │
│  └──────────────────────────┬───────────────────────────────────┘      │
│                              │                                          │
│  [Stage 5] SNOMED CT 후조합 표현 생성                                   │
│  ┌──────────────────────────┴───────────────────────────────────┐      │
│  │ {                                                            │      │
│  │   "finding": {                                               │      │
│  │     "concept": "233604007",                                  │      │
│  │     "display": "Pneumonia"                                   │      │
│  │   },                                                         │      │
│  │   "bodySite": {                                              │      │
│  │     "concept": "41224006",                                   │      │
│  │     "display": "Structure of lower lobe of left lung"        │      │
│  │   },                                                         │      │
│  │   "certainty": {                                             │      │
│  │     "concept": "410605003",                                  │      │
│  │     "display": "Definite",                                   │      │
│  │     "probability": 0.92                                      │      │
│  │   }                                                          │      │
│  │ }                                                            │      │
│  └──────────────────────────┬───────────────────────────────────┘      │
│                              │                                          │
│  [Stage 6] 출력 포맷 변환                                               │
│  ┌──────────────────────────┴───────────────────────────────────┐      │
│  │ → DICOM SR (구조화 보고서)                                   │      │
│  │ → HL7 FHIR DiagnosticReport                                 │      │
│  │ → ICD-10 자동 매핑 (보험 청구용)                             │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Bbox → 해부학적 위치 매핑

AI가 Bounding Box(좌표)로 출력한 병변 위치를 SNOMED CT 해부학 코드로 변환하는 방법:

```
[방법 1] 규칙 기반 (Rule-based)
  → 흉부 X-ray 영상을 격자로 분할
  → 각 격자에 해부학 영역 사전 할당
  → bbox 중심점이 속하는 격자 → 해당 SNOMED CT 코드

  ┌──────────────────────────────┐
  │  우상엽      │    좌상엽     │
  │  45653009    │    44714003   │
  │──────────────┼──────────────│
  │  우중엽      │              │
  │  72481006    │    좌하엽     │
  │──────────────│    41224006   │
  │  우하엽      │              │
  │  266005      │              │
  └──────────────────────────────┘

[방법 2] AI 기반 (Segmentation + Mapping)
  → 별도의 폐 분할(Segmentation) 모델로 해부학 영역 추출
  → U-Net 등으로 폐엽 자동 분할
  → bbox가 겹치는 분할 영역 → SNOMED CT 코드
  → 더 정확하지만 추가 모델 필요
```

---

## 6. DICOM SR과 SNOMED CT 통합

### 6.1 DICOM SR이란?

| 항목 | 내용 |
|------|------|
| **정식명** | DICOM Structured Report |
| **역할** | 영상 판독 결과를 **구조화된 형태**로 저장/전송하는 DICOM 표준 |
| **특징** | 자유 텍스트가 아닌, 코드화된 개념으로 판독 내용 기록 |
| **코딩 체계** | **SNOMED CT**, LOINC, RadLex 등을 사용 |

### 6.2 AI 결과 → DICOM SR 매핑

DICOM에는 AI 결과를 위한 전용 템플릿이 정의되어 있습니다:

```
DICOM SR Template (TID 1500 — Measurement Report)
│
├── Patient Information (환자 정보)
│
├── Imaging Procedure
│   └── CID 100 — Imaging Procedure (SNOMED CT)
│       └── 399208008 | Plain chest X-ray
│
├── Findings (AI 소견)
│   ├── Finding #1
│   │   ├── Concept Name: CID 6096 — Finding (SNOMED CT)
│   │   │   └── 233604007 | Pneumonia
│   │   ├── Finding Site: CID 6100 — Body Site (SNOMED CT)
│   │   │   └── 41224006 | Lower lobe of left lung
│   │   ├── Certainty: CID 6059 — Certainty (SNOMED CT)
│   │   │   └── 410605003 | Definite
│   │   ├── Probability: NUM 0.92
│   │   ├── Severity: CID 6167 — Severity (SNOMED CT)
│   │   │   └── 24484000 | Severe
│   │   └── Spatial Coordinates (bbox/segmentation)
│   │       └── SCOORD: [120, 200, 350, 450]
│   │
│   └── Finding #2 (있는 경우)
│       └── ...
│
├── Algorithm Identification (AI 모델 정보)
│   ├── Algorithm Name: "ChestAI-DenseNet121"
│   ├── Algorithm Version: "2.1.0"
│   └── Algorithm Parameters: {...}
│
└── Recommendations (권고 사항, 선택)
    └── Follow-up CT recommended
```

### 6.3 DICOM SR에서 사용하는 SNOMED CT 코드 목록 (CID)

**CID (Context ID)**는 DICOM이 정의한 SNOMED CT 코드 부분집합입니다:

| CID | 용도 | 포함 코드 예시 |
|-----|------|--------------|
| **CID 6096** | 흉부 X-ray 소견 | 폐렴, 결절, 경화, 기흉 등 |
| **CID 6100** | 신체 부위 | 우상엽, 좌하엽, 심장, 흉막 등 |
| **CID 6059** | 확실성 | Definite, Probable, Suspected |
| **CID 6167** | 심각도 | Mild, Moderate, Severe |
| **CID 100** | 영상 검사 종류 | 흉부 X-ray, CT, MRI 등 |
| **CID 7021** | 측면 | Left, Right, Bilateral |

### 6.4 IHE AI Results (IHE-AIR) 프로파일

**IHE (Integrating the Healthcare Enterprise)**는 의료 정보 시스템 간 연동 표준을 정의하는 국제 기구입니다. AI 결과 전달을 위한 **AI Results (AIR)** 프로파일:

| 항목 | 내용 |
|------|------|
| **목적** | AI 분석 결과를 PACS/EHR에 전달하는 표준 워크플로우 |
| **기반** | DICOM SR + SNOMED CT + FHIR |
| **핵심** | AI 출력을 DICOM SR TID 1500으로 인코딩하여 PACS에 저장 |
| **워크플로우** | AI Engine → DICOM SR → PACS → 전문의 뷰어 |

---

## 7. HL7 FHIR과 SNOMED CT 연동

### 7.1 HL7 FHIR이란?

| 항목 | 내용 |
|------|------|
| **정식명** | Health Level 7 — Fast Healthcare Interoperability Resources |
| **역할** | 의료 데이터 교환을 위한 **현대적 웹 기반 API 표준** |
| **특징** | RESTful API, JSON/XML, OAuth 2.0 인증 |
| **비유** | 의료판 REST API 표준 (병원 시스템 간 데이터를 API로 교환) |
| **SNOMED CT** | **기본 코딩 체계로 채택** (Condition, Observation 등에 사용) |

### 7.2 AI 진단 결과의 FHIR 리소스 매핑

```
X-ray AI 진단 결과 → FHIR 리소스 매핑:

┌─────────────────┐     ┌──────────────────────────────────────┐
│ AI 결과 요소    │     │ FHIR 리소스                           │
├─────────────────┤     ├──────────────────────────────────────┤
│ 진단 보고서     │ ──→ │ DiagnosticReport                     │
│ 소견 (질환)     │ ──→ │ Observation (code = SNOMED CT)        │
│ 환자 상태       │ ──→ │ Condition (code = SNOMED CT)          │
│ 검사 종류       │ ──→ │ ImagingStudy (modality)               │
│ 영상 참조       │ ──→ │ ImagingStudy.series.instance          │
│ AI 모델 정보    │ ──→ │ Device (AI algorithm)                 │
│ 히트맵 이미지   │ ──→ │ Media (Grad-CAM attachment)           │
│ 보험 청구 코드  │ ──→ │ Condition.code (ICD-10 매핑)          │
└─────────────────┘     └──────────────────────────────────────┘
```

### 7.3 FHIR DiagnosticReport 예시 (JSON)

```json
{
  "resourceType": "DiagnosticReport",
  "id": "xray-ai-report-001",
  "status": "preliminary",
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
      "code": "RAD",
      "display": "Radiology"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "399208008",
      "display": "Plain chest X-ray"
    }]
  },
  "subject": {
    "reference": "Patient/patient-001"
  },
  "issued": "2026-03-27T10:30:00+09:00",
  "performer": [{
    "reference": "Device/chest-ai-densenet121",
    "display": "ChestAI DenseNet-121 v2.1.0"
  }],
  "result": [
    {"reference": "Observation/finding-pneumonia"},
    {"reference": "Observation/finding-effusion"}
  ],
  "conclusion": "AI detected pneumonia in left lower lobe with high confidence (92%).",
  "conclusionCode": [{
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "233604007",
      "display": "Pneumonia"
    }]
  }]
}
```

### 7.4 FHIR Observation (AI 소견) 예시

```json
{
  "resourceType": "Observation",
  "id": "finding-pneumonia",
  "status": "preliminary",
  "code": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "233604007",
      "display": "Pneumonia"
    }]
  },
  "bodySite": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "41224006",
      "display": "Structure of lower lobe of left lung"
    }]
  },
  "valueCodeableConcept": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "410605003",
      "display": "Definite"
    }]
  },
  "component": [
    {
      "code": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "246112005",
          "display": "Severity"
        }]
      },
      "valueCodeableConcept": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "24484000",
          "display": "Severe"
        }]
      }
    },
    {
      "code": {
        "text": "AI Confidence Score"
      },
      "valueQuantity": {
        "value": 0.92,
        "unit": "probability",
        "system": "http://unitsofmeasure.org",
        "code": "1"
      }
    }
  ],
  "device": {
    "reference": "Device/chest-ai-densenet121"
  },
  "interpretation": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
      "code": "A",
      "display": "Abnormal"
    }]
  }]
}
```

---

## 8. 관련 의료 표준 체계 종합

### 8.1 X-ray AI 시스템에 관련된 표준 전체 지도

```
┌─────────────────────────────────────────────────────────────────────────┐
│                X-ray AI 시스템 — 관련 표준 전체 지도                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [영상 표준]                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                             │
│  │ DICOM    │  │ DICOM SR │  │ IHE AIR  │                             │
│  │ 영상포맷 │  │ 구조보고서│  │ AI결과   │                             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                             │
│       │              │              │                                    │
│  [용어 표준]         │              │                                    │
│  ┌──────────┐  ┌────┴─────┐  ┌────┴─────┐  ┌──────────┐              │
│  │ SNOMED CT│  │ RadLex   │  │ LOINC    │  │ ICD-10/11│              │
│  │ 임상용어 │  │ 영상용어 │  │ 검사코딩 │  │ 질병분류 │              │
│  │ (핵심)   │  │ (보완)   │  │ (보완)   │  │ (청구)   │              │
│  └────┬─────┘  └──────────┘  └──────────┘  └────┬─────┘              │
│       │                                          │                      │
│  [교환 표준]                                     │                      │
│  ┌──────────┐  ┌──────────┐                     │                      │
│  │ HL7 FHIR │  │ HL7 CDA  │       SNOMED CT     │                      │
│  │ API 교환 │  │ 문서교환 │  ←→  → ICD 매핑 ──→│                      │
│  └────┬─────┘  └──────────┘                                            │
│       │                                                                 │
│  [보안/인증]                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                             │
│  │ IHE XDS  │  │ OAuth2   │  │ TLS/mTLS │                             │
│  │ 문서공유 │  │ API인증  │  │ 암호화   │                             │
│  └──────────┘  └──────────┘  └──────────┘                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 각 표준의 역할 상세

| 표준 | 전체 이름 | 역할 | X-ray AI에서의 용도 |
|------|----------|------|-------------------|
| **SNOMED CT** | Systematized Nomenclature of Medicine — Clinical Terms | 임상 개념의 정밀 코딩 | **AI 소견을 국제 표준 코드로 변환** |
| **ICD-10/11** | International Classification of Diseases | 질병 분류, 통계, 보험 청구 | AI 결과 → 보험 청구 코드 자동 변환 |
| **LOINC** | Logical Observation Identifiers Names and Codes | 검사/관찰 항목 코딩 | "흉부 X-ray 검사" 자체를 코딩 |
| **RadLex** | Radiology Lexicon | 방사선학 전문 용어 | 영상 특이적 소견 코딩 (SNOMED CT 보완) |
| **DICOM** | Digital Imaging and Communications in Medicine | 의료 영상 파일 포맷 | X-ray 영상 저장/전송 |
| **DICOM SR** | DICOM Structured Report | 구조화된 판독 보고서 | AI 결과를 SNOMED CT로 코딩하여 저장 |
| **HL7 FHIR** | Fast Healthcare Interoperability Resources | 의료 데이터 API 교환 | AI 결과를 EHR/외부 시스템에 전달 |
| **IHE** | Integrating the Healthcare Enterprise | 시스템 간 연동 프로파일 | AI → PACS 워크플로우 표준화 |

---

## 9. 공개 데이터셋 라벨 ↔ SNOMED CT 매핑

### 9.1 매핑이 필요한 이유

공개 데이터셋의 라벨은 SNOMED CT가 아닌 **자체 용어**를 사용합니다:

```
CheXpert 라벨: "Lung Opacity"     → SNOMED CT에 직접 대응 코드 없음
NIH 라벨:     "Infiltration"      → SNOMED CT 129614006 (부분 일치)
VinDr-CXR:    "Aortic enlargement" → SNOMED CT 정확한 매핑 필요

→ 학습 시 라벨과 배포 시 출력 코드가 다르면 변환 오류 발생 위험
→ 개발 초기부터 라벨 ↔ SNOMED CT 매핑 테이블을 확보해야 함
```

### 9.2 CheXpert (Stanford) — 14 라벨 매핑

| CheXpert 라벨 | SNOMED CT Code | SNOMED CT Display | 매핑 난이도 |
|--------------|:--------------:|-------------------|:----------:|
| No Finding | 17621005 | Normal (finding) | 쉬움 |
| Enlarged Cardiomediastinum | 274096000 | Mediastinal widening | 보통 |
| Cardiomegaly | 8186001 | Cardiomegaly | 쉬움 |
| Lung Opacity | 263930000 | Opacity of lung (finding) | 보통 |
| Lung Lesion | 309529002 | Mass of lung | 보통 |
| Edema | 19242006 | Pulmonary edema | 쉬움 |
| Consolidation | 60567007 | Pulmonary consolidation | 쉬움 |
| Pneumonia | 233604007 | Pneumonia | 쉬움 |
| Atelectasis | 46621007 | Atelectasis | 쉬움 |
| Pneumothorax | 36118008 | Pneumothorax | 쉬움 |
| Pleural Effusion | 60046008 | Pleural effusion | 쉬움 |
| Pleural Other | 128601007 | Pleural disorder | 어려움 |
| Fracture | 125605004 | Fracture of bone | 보통 |
| Support Devices | 360145006 | Medical device present | 보통 |

### 9.3 NIH ChestX-ray14 — 14 라벨 매핑

| NIH 라벨 | SNOMED CT Code | 비고 |
|---------|:--------------:|------|
| Atelectasis | 46621007 | 직접 매핑 |
| Cardiomegaly | 8186001 | 직접 매핑 |
| Effusion | 60046008 | Pleural effusion |
| Infiltration | 129614006 | Infiltrate of lung |
| Mass | 309529002 | Mass of lung |
| Nodule | 427359005 | Solitary nodule of lung |
| Pneumonia | 233604007 | 직접 매핑 |
| Pneumothorax | 36118008 | 직접 매핑 |
| Consolidation | 60567007 | 직접 매핑 |
| Edema | 19242006 | Pulmonary edema |
| Emphysema | 87433001 | Pulmonary emphysema |
| Fibrosis | 51615001 | Fibrosis of lung |
| Pleural Thickening | 78381009 | 직접 매핑 |
| Hernia | 414403008 | Hiatal hernia |

### 9.4 VinDr-CXR — 22 라벨 매핑 (주요)

| VinDr-CXR 라벨 | SNOMED CT Code | 비고 |
|---------------|:--------------:|------|
| Aortic enlargement | 274096000 | Aortic dilatation |
| Atelectasis | 46621007 | 직접 매핑 |
| Calcification | 129748002 | Calcification (참고: 부위별 세분화 필요) |
| Cardiomegaly | 8186001 | 직접 매핑 |
| Clavicle fracture | 58150001 | Fracture of clavicle |
| Consolidation | 60567007 | 직접 매핑 |
| ILD (Interstitial lung disease) | 233703007 | Interstitial lung disease |
| Infiltration | 129614006 | Infiltrate of lung |
| Lung Opacity | 263930000 | Opacity of lung |
| Nodule/Mass | 427359005 / 309529002 | 크기에 따라 분류 필요 |
| Pleural effusion | 60046008 | 직접 매핑 |
| Pleural thickening | 78381009 | 직접 매핑 |
| Pneumothorax | 36118008 | 직접 매핑 |
| Pulmonary fibrosis | 51615001 | 직접 매핑 |
| Rib fracture | 33737001 | Fracture of rib |

### 9.5 매핑 시 주의사항

| 이슈 | 설명 | 대응 |
|------|------|------|
| **1:N 매핑** | 하나의 데이터셋 라벨이 여러 SNOMED CT 코드에 대응 | 가장 일반적 코드 사용, 세분화는 AI 모델 능력에 따름 |
| **의미 불일치** | "Lung Opacity"는 소견이지 진단이 아님 | Finding vs Disorder 구분 주의 |
| **부위 정보 부재** | 데이터셋 라벨에 좌/우/엽 정보 없음 | Bbox/Segmentation으로 부위 추가 코딩 |
| **라벨 품질** | 약한 지도학습 라벨 (NLP 추출)은 부정확할 수 있음 | VinDr-CXR처럼 전문의 직접 라벨링된 데이터셋 우선 |
| **버전 관리** | SNOMED CT는 반기 업데이트 | 매핑 테이블도 SNOMED CT 릴리스에 맞춰 업데이트 |

---

## 10. 시스템 구축 시 SNOMED CT 적용 절차

### 10.1 기존 구축 흐름에 SNOMED CT 추가 단계

기존 보고서(X-ray_AI_진단_보고서.md)의 4단계 구축 흐름에 SNOMED CT를 추가:

```
┌─────────────────────────────────────────────────────────────────────────┐
│          X-ray AI 시스템 구축 — SNOMED CT 통합 버전                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Phase 1: 데이터 준비 (2~3개월)                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ① DICOM 데이터 수집                                            │   │
│  │ ② 전문의 라벨링                                                │   │
│  │ ③ ★ 라벨 ↔ SNOMED CT 매핑 테이블 작성 (신규)                 │   │
│  │    → 학습 라벨과 SNOMED CT 코드 간 1:1 매핑 확보              │   │
│  │    → 해부학 위치 코드도 사전 정의                              │   │
│  │ ④ 데이터 전처리 + 분할                                        │   │
│  │ ⑤ 데이터 증강                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Phase 2: 모델 개발 (2~4개월)                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ① 아키텍처 선택 (DenseNet-121 권장)                            │   │
│  │ ② Transfer Learning + Fine-tuning                              │   │
│  │ ③ Grad-CAM 히트맵                                              │   │
│  │ ④ ★ SNOMED CT 변환 모듈 개발 (신규)                           │   │
│  │    → AI 라벨 → SNOMED CT 코드 자동 변환                       │   │
│  │    → 확률 → 확실성(Certainty) 코드 매핑                       │   │
│  │    → Bbox → 해부학 위치 코드 매핑                              │   │
│  │ ⑤ ★ DICOM SR 생성 모듈 개발 (신규)                            │   │
│  │    → SNOMED CT 코딩된 결과를 DICOM SR로 인코딩                │   │
│  │ ⑥ ★ FHIR 출력 모듈 개발 (신규)                                │   │
│  │    → DiagnosticReport + Observation FHIR 리소스 생성           │   │
│  │ ⑦ 성능 평가                                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Phase 3: 임상 검증 (3~6개월)                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ① 후향적/전향적 검증                                          │   │
│  │ ② ★ SNOMED CT 코딩 정확도 검증 (신규)                         │   │
│  │    → AI 라벨 → SNOMED CT 변환이 임상적으로 올바른지 확인      │   │
│  │    → 전문의가 코딩 결과 리뷰                                   │   │
│  │ ③ ★ 상호운용성 테스트 (신규)                                   │   │
│  │    → DICOM SR이 PACS에 정상 표시되는지 확인                   │   │
│  │    → FHIR 리소스가 EHR에 정상 통합되는지 확인                 │   │
│  │ ④ 다기관 검증                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Phase 4: 배포 및 인허가 (6~12개월)                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ① ★ 상호운용성 인증 (신규)                                     │   │
│  │    → IHE Connectathon 참가 (선택)                              │   │
│  │    → SNOMED CT + FHIR 준수 증빙                                │   │
│  │ ② 인허가 신청 (식약처/FDA)                                     │   │
│  │ ③ PACS/EHR 연동 배포                                           │   │
│  │ ④ ★ SNOMED CT 버전 관리 체계 수립 (신규)                       │   │
│  │    → SNOMED CT 릴리스 업데이트 시 매핑 테이블 갱신 절차       │   │
│  │ ⑤ 사후 관리                                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

★ = SNOMED CT 관련 신규 추가 단계
```

### 10.2 필요 인력/도구

| 역할/도구 | 용도 | 비고 |
|----------|------|------|
| **의료정보 표준 전문가** | SNOMED CT 매핑 설계, FHIR 리소스 설계 | 핵심 인력 |
| **SNOMED CT Browser** | 코드 검색, 계층 탐색 | browser.ihtsdotools.org (무료) |
| **SNOMED CT RF2 파일** | 전체 용어 데이터베이스 | MLDS에서 다운로드 (회원국 무료) |
| **HAPI FHIR Server** | FHIR 서버 (오픈소스, Java) | 테스트 및 개발용 |
| **dcm4che / pydicom** | DICOM SR 생성 라이브러리 | 오픈소스 |
| **Ontoserver / Snowstorm** | SNOMED CT 용어 서버 | API로 코드 검색/검증 |

---

## 11. 한국의 SNOMED CT 도입 현황

### 11.1 가입 및 관리 현황

| 항목 | 내용 |
|------|------|
| **가입 시기** | 2020년 (SNOMED International 정회원) |
| **국내 관리** | 한국보건의료정보원 (KHIS) |
| **한글 번역** | 진행 중 (핵심 임상 용어 중심, 전체 번역 미완) |
| **NRC (National Release Center)** | KHIS가 한국판 확장 관리 |
| **사용 의무** | 아직 법적 의무 아님 (권고 단계) |

### 11.2 정부 정책과 SNOMED CT

| 정책/사업 | SNOMED CT 관련 내용 |
|----------|-------------------|
| **의료 마이데이터** | 개인 건강 데이터 표준화에 SNOMED CT 활용 검토 |
| **건강정보 고속도로** | 기관 간 의료 데이터 교환 표준으로 SNOMED CT 채택 추세 |
| **정밀의료 사업** | 유전체+임상 데이터 통합에 SNOMED CT 코딩 권장 |
| **디지털 헬스케어** | 보건복지부 디지털 헬스 활성화 계획에 용어 표준화 포함 |
| **K-Health 데이터** | 건강보험공단 데이터와 SNOMED CT 연계 시범 사업 |

### 11.3 한국 주요 기업의 SNOMED CT 대응

| 기업 | 현황 | 비고 |
|------|------|------|
| **루닛** | DICOM SR 출력 지원, 글로벌 시장 대응으로 SNOMED CT 부분 적용 | FDA/CE 인증 과정에서 표준 준수 |
| **뷰노** | FHIR 연동 지원 | 일부 제품에서 SNOMED CT 코딩 |
| **코어라인소프트** | FDA 11건 인증, 글로벌 표준 준수 | 다국가 배포 시 SNOMED CT 필수 |
| **JLK** | FDA 5건, 국제 표준 대응 중 | DICOM SR 기반 결과 전달 |

### 11.4 한국어 SNOMED CT의 과제

| 과제 | 설명 |
|------|------|
| **번역 범위** | 35만 개념 중 한글 번역이 완료된 것은 일부 (핵심 임상 용어 중심) |
| **한의학 용어** | 한국 특유의 한의학 용어는 SNOMED CT에 없음 → 한국판 확장 필요 |
| **동의어 다양성** | "폐렴"의 다양한 한국어 표현 (허파염, 폐염 등) 수록 필요 |
| **의료진 교육** | SNOMED CT 개념에 대한 의료진 인식/교육 부족 |

---

## 12. 규제 및 인허가에서의 SNOMED CT

### 12.1 각국 규제에서의 SNOMED CT 요구사항

| 국가/지역 | 규제 | SNOMED CT 관련 요구 |
|----------|------|-------------------|
| **한국** | 식약처 AI 의료기기 허가 | 상호운용성 권고 (아직 필수 아님), SNOMED CT 사용 시 가점 |
| **미국** | FDA 510(k) / De Novo | ONC 상호운용성 규칙에서 SNOMED CT 채택 (US Core Data for Interoperability) |
| **유럽** | EU MDR + AI Act | MDR 부속서 II에 상호운용성 요구, AI Act에 투명성 요구 → SNOMED CT 사용이 준수에 유리 |
| **영국** | NHS Digital | **SNOMED CT 사용 의무** (2020년부터 1차 진료 필수) |
| **호주** | TGA + ADHA | SNOMED CT-AU (호주판) 사용 권장 |
| **캐나다** | Health Canada | SNOMED CT 국가 표준으로 채택 |

### 12.2 식약처 AI 의료기기 허가와 SNOMED CT

```
식약처 AI 의료기기 허가 시 상호운용성 관련 평가 항목:

1. 데이터 입력 표준
   → DICOM 준수 여부 (거의 필수)

2. 결과 출력 표준
   → DICOM SR 출력 지원 여부
   → ★ 구조화된 코딩 체계 사용 여부 (SNOMED CT, ICD 등)

3. 시스템 연동
   → PACS 연동 표준 (IHE 프로파일) 준수
   → ★ HL7 FHIR 연동 지원 여부

4. 사후 관리
   → 모델 업데이트 절차
   → ★ 코딩 체계 버전 관리 절차

→ SNOMED CT를 적용하면 2, 3, 4 항목에서 우수한 평가 가능
→ 아직 "필수"는 아니지만, "권고" 수준이며 점차 강화 추세
```

### 12.3 EU AI Act와 SNOMED CT

2026년 1월 시행되는 EU AI Act에서 AI 의료기기는 **고위험(High-Risk)** 분류:

| EU AI Act 요구사항 | SNOMED CT 기여 |
|------------------|---------------|
| **투명성** | AI 결과를 표준 코드로 출력 → 해석 가능성 향상 |
| **추적성** | SNOMED CT 코드 기반 결과 기록 → 감사 추적 용이 |
| **정확성** | 표준 용어로 소견 기록 → 의미 오류 방지 |
| **견고성** | 코딩 체계 버전 관리 → 시스템 안정성 |
| **상호운용성** | 유럽 내 국가 간 데이터 교환 → SNOMED CT가 공통 언어 |

---

## 13. ICD-10/11과 SNOMED CT 크로스매핑

### 13.1 왜 크로스매핑이 필요한가?

```
SNOMED CT: 임상의 정밀 기록 (35만 개념)
   ↕ 크로스매핑
ICD-10/11: 보험 청구 + 통계 (7만 코드)

→ AI가 SNOMED CT로 진단 코딩 → 자동으로 ICD-10 코드 변환 → 보험 청구
→ 수작업 코드 변환 불필요 → 정확도 향상 + 시간 절약
```

### 13.2 주요 X-ray 질환의 크로스매핑

| SNOMED CT Code | SNOMED CT Display | ICD-10 Code | ICD-10 Display |
|:--------------:|-------------------|:-----------:|----------------|
| 233604007 | Pneumonia | **J18.9** | Pneumonia, unspecified |
| 233607000 | Bacterial pneumonia | **J15.9** | Bacterial pneumonia, unspecified |
| 840539006 | COVID-19 | **U07.1** | COVID-19, virus identified |
| 154283005 | Pulmonary tuberculosis | **A15.0** | TB of lung |
| 36118008 | Pneumothorax | **J93.9** | Pneumothorax, unspecified |
| 60046008 | Pleural effusion | **J90** | Pleural effusion |
| 8186001 | Cardiomegaly | **I51.7** | Cardiomegaly |
| 254632001 | Lung cancer | **C34.9** | Malignant neoplasm of bronchus/lung |
| 19242006 | Pulmonary edema | **J81.0** | Acute pulmonary edema |
| 46621007 | Atelectasis | **J98.1** | Pulmonary collapse |
| 87433001 | Pulmonary emphysema | **J43.9** | Emphysema, unspecified |
| 51615001 | Pulmonary fibrosis | **J84.1** | Interstitial pulmonary disease |
| 125605004 | Fracture of bone | **T14.2** | Fracture, unspecified |
| 80967001 | Dental caries | **K02.9** | Dental caries, unspecified |
| 254838004 | Breast carcinoma | **C50.9** | Malignant neoplasm of breast |

### 13.3 매핑 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| **1:1** | 정확히 대응 | 폐렴 → J18.9 |
| **1:N** | SNOMED CT 1개 → ICD 여러 후보 | 골절 → 부위에 따라 S42, S52, S72... |
| **N:1** | SNOMED CT 여러 개 → ICD 1개 | 세균성/바이러스성 폐렴 → J18.9 (상세불명) |
| **부분 매핑** | 완전히 대응하지 않음 | SNOMED CT의 세밀한 분류가 ICD에 없는 경우 |

### 13.4 자동 매핑 활용

SNOMED International은 공식 **SNOMED CT → ICD-10 매핑 파일**을 제공합니다:

```
파일: der2_iisssccRefset_ExtendedMapFull_INT_*.txt

내용:
  SNOMED CT Code | ICD-10 Code | Map Rule | Map Priority
  233604007      | J18.9       | TRUE     | 1
  233607000      | J15.9       | TRUE     | 1
  ...

→ AI 시스템에서 이 매핑 파일을 로드하여 자동 변환
→ 보험 청구 자동화 가능
```

---

## 14. 구현 코드 예시

### 14.1 SNOMED CT 매핑 모듈

```python
"""
X-ray AI 결과 → SNOMED CT 변환 모듈
"""

class SnomedCTMapper:
    """AI 모델 라벨 → SNOMED CT 코드 변환"""

    # 모델 라벨 → SNOMED CT 매핑 테이블
    FINDING_MAP = {
        # 흉부 14개 질환 (NIH ChestX-ray14 기준)
        'Atelectasis':       {'sctid': '46621007',  'display': 'Atelectasis'},
        'Cardiomegaly':      {'sctid': '8186001',   'display': 'Cardiomegaly'},
        'Effusion':          {'sctid': '60046008',  'display': 'Pleural effusion'},
        'Infiltration':      {'sctid': '129614006', 'display': 'Infiltrate of lung'},
        'Mass':              {'sctid': '309529002', 'display': 'Mass of lung'},
        'Nodule':            {'sctid': '427359005', 'display': 'Solitary nodule of lung'},
        'Pneumonia':         {'sctid': '233604007', 'display': 'Pneumonia'},
        'Pneumothorax':      {'sctid': '36118008',  'display': 'Pneumothorax'},
        'Consolidation':     {'sctid': '60567007',  'display': 'Pulmonary consolidation'},
        'Edema':             {'sctid': '19242006',  'display': 'Pulmonary edema'},
        'Emphysema':         {'sctid': '87433001',  'display': 'Pulmonary emphysema'},
        'Fibrosis':          {'sctid': '51615001',  'display': 'Fibrosis of lung'},
        'Pleural_Thickening':{'sctid': '78381009',  'display': 'Pleural thickening'},
        'Hernia':            {'sctid': '414403008', 'display': 'Hiatal hernia'},
        # 추가
        'COVID-19':          {'sctid': '840539006', 'display': 'COVID-19'},
        'Tuberculosis':      {'sctid': '154283005', 'display': 'Pulmonary tuberculosis'},
        'No_Finding':        {'sctid': '17621005',  'display': 'Normal'},
    }

    # 해부학 위치 매핑
    BODY_SITE_MAP = {
        'right_upper_lobe':  {'sctid': '45653009',  'display': 'Upper lobe of right lung'},
        'right_middle_lobe': {'sctid': '72481006',  'display': 'Middle lobe of right lung'},
        'right_lower_lobe':  {'sctid': '266005',    'display': 'Lower lobe of right lung'},
        'left_upper_lobe':   {'sctid': '44714003',  'display': 'Upper lobe of left lung'},
        'left_lower_lobe':   {'sctid': '41224006',  'display': 'Lower lobe of left lung'},
        'right_lung':        {'sctid': '3341006',   'display': 'Structure of right lung'},
        'left_lung':         {'sctid': '44029006',  'display': 'Structure of left lung'},
        'heart':             {'sctid': '80891009',  'display': 'Heart structure'},
        'mediastinum':       {'sctid': '72410000',  'display': 'Mediastinal structure'},
        'pleura':            {'sctid': '3120008',   'display': 'Pleural structure'},
    }

    # 확실성 매핑 (AI 확률 → SNOMED CT 확실성)
    CERTAINTY_THRESHOLDS = [
        (0.90, {'sctid': '410605003', 'display': 'Definite'}),
        (0.70, {'sctid': '2931005',   'display': 'Probable'}),
        (0.50, {'sctid': '415684004', 'display': 'Suspected'}),
        (0.30, {'sctid': '60022001',  'display': 'Possible'}),
        (0.00, {'sctid': '261665006', 'display': 'Unlikely'}),
    ]

    # 심각도 매핑
    SEVERITY_MAP = {
        'mild':     {'sctid': '255604002', 'display': 'Mild'},
        'moderate': {'sctid': '6736007',   'display': 'Moderate'},
        'severe':   {'sctid': '24484000',  'display': 'Severe'},
    }

    # SNOMED CT → ICD-10 크로스매핑
    ICD10_MAP = {
        '233604007': 'J18.9',   # Pneumonia
        '840539006': 'U07.1',   # COVID-19
        '154283005': 'A15.0',   # Pulmonary TB
        '36118008':  'J93.9',   # Pneumothorax
        '60046008':  'J90',     # Pleural effusion
        '8186001':   'I51.7',   # Cardiomegaly
        '19242006':  'J81.0',   # Pulmonary edema
        '46621007':  'J98.1',   # Atelectasis
        '87433001':  'J43.9',   # Emphysema
        '51615001':  'J84.1',   # Pulmonary fibrosis
        '78381009':  'J94.0',   # Pleural thickening (approximation)
        '414403008': 'K44.9',   # Hiatal hernia
        '129614006': 'R91.8',   # Infiltrate of lung
        '309529002': 'R91.1',   # Mass of lung
        '427359005': 'R91.1',   # Nodule of lung
        '60567007':  'J18.1',   # Consolidation → Lobar pneumonia
    }

    def map_finding(self, ai_label, probability, bbox=None, severity=None):
        """
        AI 라벨을 SNOMED CT 구조화 결과로 변환

        Args:
            ai_label: AI 모델 출력 라벨 (예: "Pneumonia")
            probability: 확률 (0.0~1.0)
            bbox: Bounding box [x1, y1, x2, y2] (선택)
            severity: 심각도 (선택)

        Returns:
            dict: SNOMED CT 구조화 결과
        """
        # 1. Finding 매핑
        finding = self.FINDING_MAP.get(ai_label)
        if not finding:
            return {'error': f'Unknown label: {ai_label}'}

        result = {
            'finding': {
                'system': 'http://snomed.info/sct',
                'code': finding['sctid'],
                'display': finding['display'],
            },
            'probability': probability,
        }

        # 2. 확실성 매핑
        for threshold, certainty in self.CERTAINTY_THRESHOLDS:
            if probability >= threshold:
                result['certainty'] = {
                    'system': 'http://snomed.info/sct',
                    'code': certainty['sctid'],
                    'display': certainty['display'],
                }
                break

        # 3. 위치 매핑 (bbox가 있는 경우)
        if bbox:
            body_site = self._bbox_to_body_site(bbox)
            if body_site:
                result['bodySite'] = {
                    'system': 'http://snomed.info/sct',
                    'code': body_site['sctid'],
                    'display': body_site['display'],
                }

        # 4. 심각도 매핑
        if severity and severity in self.SEVERITY_MAP:
            sev = self.SEVERITY_MAP[severity]
            result['severity'] = {
                'system': 'http://snomed.info/sct',
                'code': sev['sctid'],
                'display': sev['display'],
            }

        # 5. ICD-10 크로스매핑
        icd10 = self.ICD10_MAP.get(finding['sctid'])
        if icd10:
            result['icd10'] = {
                'system': 'http://hl7.org/fhir/sid/icd-10',
                'code': icd10,
            }

        return result

    def _bbox_to_body_site(self, bbox, image_width=512, image_height=512):
        """
        Bounding box 중심점 → 해부학적 영역 매핑 (규칙 기반)

        흉부 X-ray PA 기준:
        - 영상 좌측(환자 우측) = Right lung
        - 영상 우측(환자 좌측) = Left lung
        - 상부 1/3 = Upper lobe
        - 중부 1/3 = Middle lobe (우폐만) 또는 하부 = Lower lobe
        """
        cx = (bbox[0] + bbox[2]) / 2  # 중심 x
        cy = (bbox[1] + bbox[3]) / 2  # 중심 y

        # 좌우 판정 (PA 영상: 영상 왼쪽 = 환자 오른쪽)
        midpoint_x = image_width / 2
        is_right = cx < midpoint_x  # 영상 왼쪽 = 환자 우측

        # 상하 판정
        third = image_height / 3
        if cy < third:
            vertical = 'upper'
        elif cy < third * 2:
            vertical = 'middle'
        else:
            vertical = 'lower'

        # 매핑
        if is_right:
            if vertical == 'upper':
                return self.BODY_SITE_MAP['right_upper_lobe']
            elif vertical == 'middle':
                return self.BODY_SITE_MAP['right_middle_lobe']
            else:
                return self.BODY_SITE_MAP['right_lower_lobe']
        else:
            if vertical == 'upper':
                return self.BODY_SITE_MAP['left_upper_lobe']
            else:
                return self.BODY_SITE_MAP['left_lower_lobe']

    def map_batch(self, ai_predictions):
        """
        AI 모델의 배치 출력을 일괄 변환

        Args:
            ai_predictions: [{"label": str, "probability": float, "bbox": list}, ...]

        Returns:
            list: SNOMED CT 구조화 결과 리스트
        """
        results = []
        for pred in ai_predictions:
            if pred['probability'] >= 0.3:  # 30% 이상만 보고
                result = self.map_finding(
                    ai_label=pred['label'],
                    probability=pred['probability'],
                    bbox=pred.get('bbox'),
                    severity=pred.get('severity'),
                )
                results.append(result)
        return results
```

### 14.2 FHIR DiagnosticReport 생성

```python
"""
SNOMED CT 코딩된 AI 결과 → FHIR DiagnosticReport 생성
"""

import json
from datetime import datetime

class FHIRReportGenerator:
    """SNOMED CT 코딩 결과를 FHIR DiagnosticReport로 변환"""

    def generate_report(self, patient_id, snomed_findings, ai_model_info):
        """
        Args:
            patient_id: 환자 ID
            snomed_findings: SnomedCTMapper.map_batch() 출력
            ai_model_info: {"name": str, "version": str}

        Returns:
            dict: FHIR DiagnosticReport JSON
        """
        report_id = f"ai-report-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        observations = []

        # 각 소견을 FHIR Observation으로 변환
        for i, finding in enumerate(snomed_findings):
            obs_id = f"finding-{i+1}"
            observation = self._create_observation(obs_id, finding, patient_id, ai_model_info)
            observations.append(observation)

        # 주요 소견 (가장 높은 확률)
        primary = max(snomed_findings, key=lambda x: x.get('probability', 0))

        # DiagnosticReport 생성
        report = {
            "resourceType": "DiagnosticReport",
            "id": report_id,
            "status": "preliminary",
            "category": [{
                "coding": [{
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
                    "code": "RAD",
                    "display": "Radiology"
                }]
            }],
            "code": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": "399208008",
                    "display": "Plain chest X-ray"
                }]
            },
            "subject": {"reference": f"Patient/{patient_id}"},
            "issued": datetime.now().isoformat(),
            "performer": [{
                "reference": f"Device/{ai_model_info['name']}",
                "display": f"{ai_model_info['name']} v{ai_model_info['version']}"
            }],
            "result": [{"reference": f"Observation/{obs['id']}"} for obs in observations],
            "conclusion": self._generate_conclusion(snomed_findings),
            "conclusionCode": [{
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": primary['finding']['code'],
                    "display": primary['finding']['display']
                }]
            }],
        }

        return {
            "report": report,
            "observations": observations,
        }

    def _create_observation(self, obs_id, finding, patient_id, ai_model_info):
        """단일 소견 → FHIR Observation"""
        obs = {
            "resourceType": "Observation",
            "id": obs_id,
            "status": "preliminary",
            "code": {
                "coding": [{
                    "system": finding['finding']['system'],
                    "code": finding['finding']['code'],
                    "display": finding['finding']['display'],
                }]
            },
            "subject": {"reference": f"Patient/{patient_id}"},
            "device": {"reference": f"Device/{ai_model_info['name']}"},
            "component": [],
        }

        # 확실성
        if 'certainty' in finding:
            obs["valueCodeableConcept"] = {
                "coding": [{
                    "system": finding['certainty']['system'],
                    "code": finding['certainty']['code'],
                    "display": finding['certainty']['display'],
                }]
            }

        # 부위
        if 'bodySite' in finding:
            obs["bodySite"] = {
                "coding": [{
                    "system": finding['bodySite']['system'],
                    "code": finding['bodySite']['code'],
                    "display": finding['bodySite']['display'],
                }]
            }

        # 확률
        obs["component"].append({
            "code": {"text": "AI Confidence Score"},
            "valueQuantity": {
                "value": finding['probability'],
                "unit": "probability",
            }
        })

        # 심각도
        if 'severity' in finding:
            obs["component"].append({
                "code": {
                    "coding": [{
                        "system": "http://snomed.info/sct",
                        "code": "246112005",
                        "display": "Severity"
                    }]
                },
                "valueCodeableConcept": {
                    "coding": [{
                        "system": finding['severity']['system'],
                        "code": finding['severity']['code'],
                        "display": finding['severity']['display'],
                    }]
                }
            })

        return obs

    def _generate_conclusion(self, findings):
        """사람이 읽을 수 있는 요약문 생성"""
        significant = [f for f in findings if f.get('probability', 0) >= 0.5]
        if not significant:
            return "AI analysis: No significant findings detected."

        parts = []
        for f in sorted(significant, key=lambda x: -x['probability']):
            text = f"{f['finding']['display']} ({f['probability']:.0%})"
            if 'bodySite' in f:
                text += f" in {f['bodySite']['display']}"
            parts.append(text)

        return "AI analysis detected: " + "; ".join(parts) + "."
```

### 14.3 사용 예시

```python
# 1. AI 모델 추론 결과 (기존)
ai_predictions = [
    {"label": "Pneumonia", "probability": 0.92, "bbox": [300, 350, 450, 480]},
    {"label": "Pleural_Thickening", "probability": 0.35, "bbox": [280, 300, 480, 500]},
    {"label": "Cardiomegaly", "probability": 0.18},
]

# 2. SNOMED CT 매핑
mapper = SnomedCTMapper()
snomed_results = mapper.map_batch(ai_predictions)

# 3. FHIR 보고서 생성
generator = FHIRReportGenerator()
fhir_output = generator.generate_report(
    patient_id="patient-001",
    snomed_findings=snomed_results,
    ai_model_info={"name": "ChestAI-DenseNet121", "version": "2.1.0"}
)

# 4. 출력
print(json.dumps(fhir_output['report'], indent=2, ensure_ascii=False))
```

---

## 15. 도전 과제 및 권장 사항

### 15.1 도전 과제

| 과제 | 설명 | 난이도 |
|------|------|:------:|
| **매핑 정확성** | AI 라벨과 SNOMED CT 개념이 100% 일치하지 않는 경우 존재 | 중 |
| **세분화 수준** | AI 모델이 "폐렴"까지만 분류하지만, SNOMED CT는 세균성/바이러스성까지 구분 가능 | 중 |
| **위치 매핑** | Bbox → 해부학 영역 자동 변환의 정확도 한계 | 높음 |
| **한글 번역** | 한국어 SNOMED CT 번역이 완전하지 않아 국내 사용 시 추가 작업 필요 | 중 |
| **버전 관리** | SNOMED CT는 반기 업데이트 → 매핑 테이블도 동기 갱신 필요 | 낮음 |
| **성능 오버헤드** | SNOMED CT 매핑 + FHIR 생성의 추가 처리 시간 | 낮음 |
| **전문 인력** | SNOMED CT + FHIR + DICOM SR을 모두 이해하는 인력이 드묾 | 높음 |

### 15.2 단계별 권장 사항

```
[단계 1 — 즉시 적용 가능] 기간: 2주
  ✅ AI 라벨 ↔ SNOMED CT 매핑 테이블 작성
  ✅ 확률 → 확실성(Certainty) 코드 매핑 규칙 정의
  ✅ ICD-10 크로스매핑 테이블 확보

[단계 2 — 단기] 기간: 1~2개월
  ✅ SNOMED CT 매핑 모듈 개발 (Python)
  ✅ FHIR DiagnosticReport 생성 모듈 개발
  ✅ 기본 위치 매핑 (규칙 기반) 구현

[단계 3 — 중기] 기간: 3~6개월
  ✅ DICOM SR 출력 모듈 개발
  ✅ PACS 연동 테스트
  ✅ 폐 분할 모델을 이용한 정밀 위치 매핑

[단계 4 — 장기] 기간: 6~12개월
  ✅ IHE AIR 프로파일 준수 검증
  ✅ 상호운용성 인증 (IHE Connectathon)
  ✅ 식약처/FDA 허가 서류에 상호운용성 증빙 포함
  ✅ SNOMED CT 버전 자동 업데이트 체계 구축
```

### 15.3 핵심 요약

| 항목 | 내용 |
|------|------|
| **SNOMED CT의 역할** | AI 진단 결과를 **국제 표준 코드**로 변환하여 상호운용성 확보 |
| **최소 필요 작업** | 라벨↔SNOMED CT 매핑 테이블 + 확실성 코드 매핑 |
| **최적 구현** | SNOMED CT 코딩 + DICOM SR 출력 + FHIR 연동 + ICD-10 자동 매핑 |
| **한국 상황** | 2020년 회원국 가입, 점차 확산 중. 아직 의무는 아니지만 글로벌 진출 시 필수 |
| **핵심 가치** | 병원 간·국가 간 AI 결과 호환, 보험 청구 자동화, 규제 준수, 임상 연구 지원 |

---

## 참고 자료

### SNOMED CT 공식
- SNOMED International: www.snomed.org
- SNOMED CT Browser: browser.ihtsdotools.org
- SNOMED CT 한국 NRC: 한국보건의료정보원 (www.khis.or.kr)
- MLDS (Member Licensing and Distribution): mlds.ihtsdotools.org

### HL7 FHIR
- HL7 FHIR 공식: www.hl7.org/fhir
- FHIR DiagnosticReport: hl7.org/fhir/diagnosticreport.html
- FHIR + SNOMED CT 가이드: hl7.org/fhir/snomedct.html
- HAPI FHIR (오픈소스 서버): hapifhir.io

### DICOM
- DICOM SR: dicom.nema.org/medical/dicom/current/output/chtml/part16/
- IHE AI Results: wiki.ihe.net/index.php/AI_Results

### 한국 정책
- 건강정보 고속도로: 보건복지부
- 의료 마이데이터: 개인정보보호위원회
- 식약처 AI 의료기기 가이드라인: www.mfds.go.kr

---

*본 문서는 2026년 3월 27일 기준으로 작성되었으며, X-ray_AI_진단_보고서.md의 보완 자료입니다.*
