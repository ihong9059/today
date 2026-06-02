---
title: AI 시대 방향 판단
type: ai
created: 2026-04-19
updated: 2026-06-02 야간 (결정 29 도메인 권고 박제 패턴 정착 [ingest 외 사용자 도메인 질의 후속 박제 → log.md 별도 카테고리] / 결정 30 인증 5 범주 분리 + 셀 모델 우선 의사결정 [KC EMC/RF/배터리/충전기/UN38.3 직교 트랙, 배터리 인증 cost·duration impact 최대] / 결정 31 ESP32-P4 CNN 가속 영상 추론 신사업 carry [작물 상태/병해충 엣지 추론, LoRa 센서 노드 → 영상 노드 진화 옵션] — revita ingest #15 + 배터리 인증 흡수, 인증 매니지먼트 역량 단계 진입)
tags: [AI, 방향, 전략, 판단, 3계열매트릭스, 5계열매트릭스, ISA, instruction-set, vault-portability, uttec-vault, uttec-search, uttec-rag-local, onDevice-business, 5조건곱, 6조건곱, hybrid-embedding, 정체성D, PLC, Python-GUI, cross-platform-fork, ollama, local-LLM, mandate-v2.7, mandate-v2.8, mandate-v2.10-R38, Hybrid-SoC, application별-SoC, negative-finding-자산, ARM-A-NEON, vectorizer-정책, mobile-NEON-negative, STM32H745, Zephyr-cross-vendor, LAN-path, R37-정정사이클, 자가진단정정, 박제정확성SOP, vendor-광고-cross-check, 사용자-challenge-trigger, 3tier-메모리, SDRAM-penalty-zero, Phi-2-적재-실증, dts-upstream-기여, SFDP-실측]
links: [me, ai-landscape, skills, goals, strengths, gaps, vault-portability, uttec-vault, uttec-search, uttec-rag-local, onDevice-ai, search, ai-fanstick, uttec-stage-package, 위시캣활동, build-gotcha-inventory, stm32h745-disco, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix, 2026-05-28_본vault-영업카피-신뢰성-강화, 2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]
---

# AI 시대 방향 판단

## 판단 로그 (2026-06-02 야간) — revita ingest #15 + 배터리 인증 흡수: 인증 매니지먼트 역량 단계 진입 ⭐⭐⭐

**사건**: revita-claude 카드 #2026-06-02-003 흡수. 2건 통합 = ① ingest #15 (TC-21 후속 + Tower SBC 대체 보드 조사, 3 commits / 4 파일 / +387/-16) + ② 배터리 인증 양산 게이트 (사용자 도메인 질의 후속 — *"battery로 구동되는 제품인데, kc인증에서 배터리 관련사항은 test하지 않아도 되나요?"*). 갱신 entity 2건 (link-v2 / tower-sbc) + 신규 entity 1건 (battery-cert). RA 15 → 24. 결정 29~31 신규.

### 결정 29: ⭐⭐ 도메인 권고 박제 패턴 정착 — ingest 외 사용자 도메인 질의 후속 박제

revita-claude가 이번 카드에서 도입한 신규 패턴 = **ingest (코드/문서 변경 흡수) 외에 사용자 도메인 질의 후속 박제** 별도 카테고리. log.md 별도 분류 운용 시작.

> "코드/문서 변경 흡수만 자산화하면 도메인 권고 (인증·규제·시장) 누락. 사용자 질의 후속 박제로 정착."

**Why**: AI와 사용자 양방향 지식 정착 흐름 — 사용자가 던지는 도메인 질의 (인증 / 규제 / 시장 / 운영) 가 ingest 사이클에 들어오지 않으면 vault 자산화 누락. revita-claude 능동 박제 결단 → mywiki 흡수.

**How to apply**: myWiki도 동일 패턴 — 사용자 질의 후속 박제는 thoughts/ 또는 ai-direction 의 판단 로그 카테고리로 운용. 다른 vault (ondevice / wishket / lemonLabs / search / uttechome) 사용자 도메인 질의도 동일 박제 가치.

### 결정 30: ⭐⭐⭐ 인증 5 범주 분리 + 셀 모델 우선 의사결정 — 인증 매니지먼트 역량 단계 진입

KC 인증 5 범주 매트릭스 (EMC / RF / 62133 셀 안전 / 충전기 / UN38.3 운송) — **현 `entity-kc-cert` family (EMC/기능시험 중심) 와 직교 트랙**. 배터리 직접 시험 3개 (62133 + 충전기 + UN38.3) 양산 출하 전 별도 해소.

> "양산 캐파 산정 진입 시 셀 모델 확정이 우선 의사결정 항목. 다른 부품 (BLE/LoRa/MCU) 보다 인증 cost·duration impact 가장 큼."

**Why**:
- 셀/팩 외부 인증품 구매 → 완제품 측 시험 면제 (인증서 보관만)
- 자체 셀 조립 + PCM 직접 설계 → 자체 인증 필요 (KTL/KTC, 비용 수백~수천만원, 8~12주)
- 셀 모델이 인증 비용·기간·단가 모두 좌우 = 양산 BOM 결정의 의사결정 트리 최상위

**How to apply**: 다른 양산 진입 프로젝트 (한림용인CC sensor 노드 / shield AI 공장자동화 / AI FanStick) 도 동일 패턴 — 부품 모델 결정이 인증 트랙 결정. 의사결정 우선순위 트리 자산화. strengths §12 인증 매니지먼트 역량 신설.

### 결정 31: ⭐⭐ ESP32-P4 CNN 가속 영상 추론 신사업 carry — LoRa 센서 노드 → 영상 노드 진화

ingest #15-2 Tower SBC 대체 보드 조사 (Core3506 Linux $17 vs **ESP32-P4+C6 RTOS $14**) — **CNN 가속 내장** = 작물 상태/병해충 엣지 추론 가능성. 현 LoRa 센서 노드 (텍스트/숫자 metric) → 영상 추론 노드로 진화 옵션.

> "센서 노드의 CNN 가속 = AI + 농업 IoT / 시설농업 / 양식장 신사업 carry. AISG 측면 자산화 가치."

**Why**: 본 vault AISG (#155057 외주 분석 완료 후 carry) + 한림용인CC (시설 IoT) + onDevice_AI (Stage 4 영상 추론 트랙) 3개와 매칭. ESP32-P4 채택 결정 미정이지만 신사업 단서 박제 가치 ★★.

**How to apply**: AISG entity prepend (CNN 가속 신사업 carry) + 한림용인CC entity 미래 옵션 carry + onDevice_AI Stage 4 영상 추론 트랙과 cross-link.

### 의미 (6/2 야간 추가)

29. **도메인 권고 박제 패턴 정착** — ingest 외 사용자 도메인 질의 후속 박제 (AI ↔ 사용자 양방향 지식 정착)
30. **인증 5 범주 분리 + 셀 모델 우선 의사결정** — 인증 매니지먼트 역량 신설 (strengths §12). 양산 BOM 결정 트리 최상위 = 셀 모델
31. **ESP32-P4 CNN 가속 영상 추론 신사업 carry** — LoRa 센서 노드 진화 옵션, AISG/한림용인CC/onDevice Stage 4 cross-link

→ thought [[2026-06-02_certification-tracks-matrix]] (신규) + [[revita]] § 6/2 ingest #15 + [[strengths]] §12 인증 매니지먼트 + [[gaps]] § 양산 RA 15 → 24 + [[aisg]] § ESP32-P4 carry.

---

## 판단 로그 (2026-06-02) — revita ingest #14-A/B 흡수: 펌웨어 원본 품질 게이트 단계 진입 ⭐⭐⭐

**사건**: revita-claude 카드 #2026-06-02-001 흡수. ingest #14 (A+B) — link_v2 자체 시험 10/10 PASS + 원본 버그 4건 발견 + checklist 위키 정본 격상 + LTE 단일 게이트. BASE `8e6682a5` (#13-D, 6/1) → HEAD `87174e2a` (#14-C, 6/2), 6 commits / +11,794 / -905 / 103 파일. **신규 entity 0건, 갱신 5건** — 모두 깊이 확장. 결정 26~28 신규.

### 결정 26: ⭐⭐⭐ 사본 정책 (Copy + Verify, Then Decide) — 펌웨어 원본 품질 게이트

`link_v2_test/` (9K LOC) = `link_v2` 본체의 사본. PATCH + fix 검증 후 **원본 반영은 별도 결정** (양산 출하 게이트 통과 시점).

> "검증된 fix 의 원본 반영은 즉시 하지 않고 별도 결정. 양산 출하 게이트 전까지 사본·원본 병행 운영."

**Why**: 원본을 직접 수정하면 (a) 다른 시험에서 회귀 가능 (b) 원본의 stability 보장 무너짐. 사본에서 검증 → 원본 반영 시점은 양산 출하 게이트 통과 시점으로 정책화.

**How to apply**: link_v2 / kc_cert_link_v2 / 다른 펌웨어 시험에서도 동일 패턴. AI FanStick·shield·search vault 측 원본/사본 분리 디버깅 영역에도 적용 가능 (모델 fork → 검증 → merge / 강의안 사본 → 검증 → 원본 / 사업계획서 사본 → 검증 → 원본).

### 결정 27: ⭐⭐⭐ 위키 정본 동격 격상 (doc/ 트리 단일화)

`apps/system/tower/test/` (code 옆, 개발 자료) → `doc/revita_tower_firmware/checklist/` (정본 문서 옆, 인증·운영 자료) 통합.

> "시험 자료 = code 옆에서 doc/ 옆으로 격상. KC 인증 + 양산 IQC + 운영 매뉴얼 단일 doc/ 트리."

**Why**: KC 인증 자료 + 양산 라인 검사 자료 + 운영 매뉴얼이 분산되어 있으면 외부 (인증 기관, 양산 라인) 제공 시 부분 누락 위험. doc/ 트리 단일화로 자산화 1단계 완결.

**How to apply**: 다른 자체 시험 트랙 (kc_cert_link_v2-test, link_v2 자체 시험) 동일 정책. uttec 사업 자산화 운영 정책 — 외부 제공 시 단일 트리 export 가능 (KC 기관·양산 라인·영업 자료 공통).

### 결정 28: ⭐⭐ LTE 단일 게이트 (build → runtime → 실기)

`lte_build` (CMake/Kconfig/TODO) + `lte_runtime` (FSM 8 시나리오) 분리 + README §LTE 완료 기준 (단일 판정). 모듈 간 LTE 의존 항목 PASS 게이트 단일화.

> "모듈 간 의존 단일 게이트 = 분기 폭증 방지 + 책임 분리 (빌드 vs 런타임 vs 실기)."

**Why**: Security/Power/Lux/SBC 의 LTE 관련 항목이 각자 독립 판정하면 분기 폭증. 단일 게이트로 의존 가시화 + 부분 판정 명확화.

### 의미 (6/2 추가)

26. **사본 정책 (Copy + Verify, Then Decide)** — 펌웨어 원본 품질 게이트 신설 (양면 IQC 깊이 확장: 양산 IQC 자동화 → 양면 IQC → 펌웨어 원본 품질 게이트 3단계)
27. **doc/ 트리 단일화** — 인증·양산·운영·디버깅 사례 단일 트리 export, uttec 사업 자산화 운영 정책
28. **LTE 단일 게이트** — 모듈 간 의존 단일 판정 정책, 다른 모듈 간 의존 패턴에도 일반화 가능 (분기 폭증 방지 원칙)

→ thought [[2026-06-02_copy-verify-decide]] + [[revita]] § 6/2 ingest #14-A/B + [[strengths]] §11 펌웨어 원본 품질 게이트 + [[gaps]] § 양산 RA 6 → 15 확장.

---

## 판단 로그 (2026-06-01 megasession) — R44/R45/R46 verdict + BOM 3-path + search Phase 4.3 + revita Tower 모듈러 ⭐⭐⭐⭐⭐

**사건**: 6/1 _inbox 8장 흡수 megasession (ondevice 3 + search 2 + revita 1 + wishket 2). cross-vault feedback loop 첫 풀사이클 완결 — main vault → 각 vault 능동 카드 발송 → 각 vault 자율 진행 → ack 카드 회신 → mywiki 흡수. 결정 21~25 추가.

### 결정 21: ⭐⭐⭐ BOM Path B-2 영업 신설 — pca10056 단독 ~$16 K-POP 저가형 / OEM / 매스마켓

R44 verdict (Path A esp32s3 단독 $25 / Path B esp32s3+nRF52840 $31) + R46 finding으로 추가:

| Path | BOM | 영업 포지션 | 정량 근거 |
|:-:|---:|---|---|
| A | ~$25 | 양산 표준 | R44 esp32s3 build PASS (Flash 428KB) |
| B | ~$31 | Premium (BLE5 + AI 분리) | R44 verdict |
| **B-2** ⭐ NEW | **~$16** | **K-POP 저가형 / OEM / 매스마켓** | R46 CMSIS-NN 3.14× = esp32s3 plain C 동급 latency |

→ **"$15 M4F + CMSIS-NN 가속 = $5 LX7 plain C 동급"** 영업 본질 finding이 Path B-2 신설 근거. AI FanStick 가격대 다층화 → 시장 segment 확장.

### 결정 22: ⭐⭐⭐ CMSIS-NN port 표준 = `arm_nn_vec_mat_mult_t_s8` 채택

본 vault weights layout `[out × in]` row-major 일관 → `arm_fully_connected_s8` wrapper는 별도 transpose 필요 (R46-nrf1 filter_dims layout mismatch 함정). 향후 모든 CMSIS-NN port (R47+, 다른 모델) default = `vec_mat_mult_t_s8`. 영구 자산 — 미래 port 즉시 우회.

### 결정 23: ⭐⭐ 가속 가설 검증 framework — mandate Round 박제 시 H1/H2/H3 명시 + 결과 박제

R45 negative (CMSIS-DSP dot only 1.077×) → R46 검증 동기 부여 → CMSIS-NN full FC 3.14× = R18 carry 3.23× 재현 ✅. **가속 가설 검증 framework 일반화**:
- mandate Round 박제 시 가설 H1/H2/H3 명시 의무
- 가설 검증 결과 (적중 / 부분 / 미달) 본질 박제
- negative finding도 가치 (R45 → R46 동기)
- **API 단위 가속 본질 = fused operation vs separate** (dot/matmul 단독은 vectorizer 이미 잘 함)

### 결정 24: ⭐⭐⭐ 정체성 D (search-claude dogfooding-via-self) 검증 사례 — vault scope 결함 진단 cross-vault feedback loop

5/22 정체성 D 결단 ("1차 사용자 = 본인, 외부 deploy 시 turn-off 옵션") → 5/23 megasession 메모리·세션 인덱싱 패치 발송 → 6/1 search-claude 9 패치 일괄 적용 완결 (A·B·C·D today rescue + E·F·H·I·J answer source) → time-oriented query top-1 margin 0.11 → 1.7~1.8 (**15배 향상**) + 메모리 44 files 인덱싱 + 위시캣 마스킹 룰 검색 가능.

**일반화 원칙**: vault scope 결함 진단 시 main vault 능동 카드 발송 → 별도 vault 자율 진행 + ack 회신 → mywiki 흡수 풀사이클 = cross-vault feedback loop 정착. 다른 vault (uttechome / wishket / lemonLabs / revita / ondevice) 결함 발견 시 동일 패턴 적용.

**carry gap**: search 외부 deploy 전 `SEARCH_EXTERNAL_MODE=1` 환경변수 toggle 필수 (Phase 5/6). 위시캣 마스킹·세션 carry 누설 위험.

### 결정 25: ⭐⭐⭐ revita 양면 IQC (Link + Tower) 진입 — 5채널 영업 카피 양면화

ingest #13-A Tower 모듈러 재작성 풀세트 정착 (11 모듈 .c 약 8,900 LOC + 정본 .md 18건 + 자체 시험 7건). 5/29 §9 (Link 단면 IQC) → 6/1 §10 (양면 IQC) 진화:

| 측 | 양산 자산 | 캐파 |
|---|---|---|
| Link | kc_cert_link_v2/scenarios/ Python 자동화 4 모듈 + 17 PASS | 월 7,200대 (모드 A) |
| **Tower** ⭐ NEW | tower/test/ 7건 체크리스트 + west build PASS + Static Review (sbc 11 / security 12 / lux 8 PASS) | RM76 sourcing + 5 BLOCKED 해소 후 산정 |

→ uttechome 영업 / 위시캣 사례연구 / 한림용인CC IQC 확장 / shield-claude RPi 자동화 / n8n-claude 다중 path 모두 **양면 카피로 격상**. 양산 onboard 시간 단축 근거 결정타.

### 의미 (6/1 추가)

21. **BOM 3-path 영업 자산** — Path A/B/B-2 3층 가격대 차별화. R46 CMSIS-NN finding이 $16 매스마켓 path 신설 근거
22. **CMSIS-NN port 표준 = `arm_nn_vec_mat_mult_t_s8`** — vault weights layout 일관성 영구 자산
23. **가속 가설 검증 framework** — API 단위 가속 본질 = fused operation vs separate
24. **cross-vault feedback loop 정착** — main vault 능동 카드 → 각 vault 자율 → ack 회신 → mywiki 흡수 풀사이클
25. **revita 양면 IQC (Link + Tower)** — 5채널 영업 카피 양면화 단계 진입

→ thought [[2026-06-01_R44-3board-verdict-CMSIS-NN-fused]] + [[2026-06-01_search-Phase4.3-time-oriented-boost]] + [[2026-06-01_tower-modular-rewrite-iqc-stage2]] (3건 신규) + [[onDevice-ai]] § 6/1 + [[ai-fanstick]] § BOM 3-path + [[search]] § Phase 4.3 + [[revita]] § ingest #13-A.

---

## 판단 로그 (2026-05-28 cascade #2) — R38 SDRAM+QSPI 정량 실증 → 3-tier 메모리 영업 결정타 ⭐⭐⭐⭐

**사건**: ondevice-claude 카드 #2026-05-28-002 흡수. mywiki 5/28-003 통보 (STM32H745 AI test 4 우선순위) → 사용자 옵션 b 결단 → mandate v2.10 R38 진입 (5/28 14:00~18:30 단일 세션). mywiki 권장 #4 (SLM Phi-2 mini Q4 QSPI XIP) 부분 정량 실증 4 Phase 완료. QSPI 64MB → 128MB 박제 정정 + Phi-2 50MB 적재 boot 3.22s 정량 실증 + 3-tier 메모리 모델 + Phase D SDRAM weights MLP forward penalty 거의 zero finding + STM-16 신규 함정.

### 결정 19: ⭐⭐⭐ 3-tier 메모리 모델 정량 실증 → Cortex-M tier 영업 결정타 신설

옛 박제 "Cortex-M 단일 칩 SLM 50~60MB 적재 가능 가설" → ✅ **정량 실증**:
- DTCM 128KB (1.0×) + SDRAM 8MB (1.28× slow only) + QSPI 128MB (15.51 MB/s)
- D-cache 효과 SDRAM 4.19× / DTCM 2.82× (DTCM도 D-cache 효과 큼 — 본 vault 가정 "DTCM = single-cycle 미미" 반증)
- Phase D 결정타: 857K params MLP SDRAM 배치 forward = 10.1ms / latency ratio 18.14× < param ratio 20.29× → SDRAM penalty 거의 zero (11% 더 효율적)

→ Stage 4 시나리오 E "5 항목 우위" (4 → 5) 박제 + 영업 카피 신설 "SLM SDRAM 적재 = DTCM 적재와 거의 동등 효율". 다른 Cortex-M tier 보드 (H7Sx / H7Bx / 추후 진입할 family) measurement 시 동일 3-tier 메모리 정량 패턴 적용.

### 결정 20: ⭐⭐ dts upstream 정정 == upstream contribution 가치 박제

R38에서 발견: Zephyr upstream `boards/st/stm32h745i_disco/...dts` line 47-50 `DT_SIZE_M(64)` + ST UM2381 (MX25LM51245G 512Mbit) → **SFDP 실측 128 MiByte** (MX66LM1G45G 1Gbit 추정). upstream PR 기여 후보.

**일반화 원칙**: 본 vault measurement 사이클에서 vendor upstream 박제 오류 발견 시 → (1) 본 vault 정정 박제 + (2) upstream PR 기여 후보로 등재. governance 신뢰성 자산 외에 upstream community 기여로 확장 — R&D 시연 자산 + 회사 reputation 강화 path.

### 의미 (5/28 추가 #2)

19. **3-tier 메모리 모델 정량 실증** — Cortex-M tier 영업 결정타 (DTCM + SDRAM + QSPI XIP) 정량 박제. SLM SDRAM 적재 penalty zero finding이 Phi-2 50MB 적재 가능성 영업 결정타로 carry
20. **dts upstream 정정 == upstream contribution 가치** — measurement 사이클에서 vendor upstream 오류 발견 시 upstream PR 기여 후보 등재 (governance + community 기여 path)

→ thought [[2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]] + entity [[stm32h745-disco]] § R38 absorb + [[ai-fanstick]] § 시나리오 E 5 항목 우위 + [[uttec-stage-package]] § 시나리오 E 박제 정정 + [[build-gotcha-inventory]] § STM-16.

---

## 판단 로그 (2026-05-28 cascade) — R37/R36 baseline 정정 사이클 + 04_종합비교 영업카피 정정 ⭐⭐⭐

**사건**: ondevice-claude 카드 5장 (R37 M4 negative supersede + R37 correction + R36 paired-check + 04_종합_비교_해설 23§ 검토 + 영업카피 cascade) 일괄 megasession 흡수. 5/27 14:00 R37 "M4 clock-norm 0.27× 미달 / 7번째 negative finding" 박제 → 5/27 16:00 사용자 challenge "M4 속도가 지금 최선인가?" → 펌웨어 INFO emit 진단 4행 추가 → 실측 pca10056 R18 baseline 7,367μs 재확인 → 옛 추정값 ~1,798μs artifact 정정. R37 M4 positive (clock-norm 0.99×) + R36 M7 baseline IPC 1.76× 정정 + STM-15 새 함정 발견. negative finding 6건 유지 (R37 제외). 04_종합_비교_해설 49건 영업 카피 정정 (LiteRT rebrand + Jetson Super $249 + stm32h745 메모리 + Exynos 8nm).

### 결정 16: ⭐⭐⭐ 박제 정확성 SOP — baseline 단일 출처 (실측 CSV) 기반 의무화

본 vault 모든 baseline 박제는 **단일 출처 (실측 CSV 파일 경로) 명시** + 다른 박제와 비율 검증 시 같은 단일 출처 참조. 추정값 사용 금지. derivative 박제 모두 artifact 위험 (R36/R37 사이클 입증). carry-over: 다른 보드 measurement (Nordic / ESP32 / Linux PC / STM32 family) baseline 박제 시 동일.

### 결정 17: ⭐⭐⭐ vendor 광고 cross-check 5단계 정책 신설 — 영업 카피 신뢰성 강화

영업 카피 박제 시 5단계 cross-check 의무:
1. vendor 광고 신뢰 X → UTTEC 자체 측정 자산
2. 본 vault Round 1~37 누적 박제 cross-reference 필수
3. 모호 카피 ("AI 가속 가능") 금지 → 정량 박제 ("Round X: 변수 Y → ratio Z×")
4. vendor 광고 / wiki / 추정 출처 박제 시 vendor 공식 datasheet + web search + master 박제
5. 외부 추정 박제 시 † footnote 필수 ("본 vault 미측정, 외부 X 표준 자료 추정")

→ 옛 vendor 광고 stale (LiteRT rebrand 미반영 / Jetson Super 가격 인하 미반영 / 한국마사회 농업 무관 등) 정정 49건이 본 정책 근거. 다른 vault (uttechome / wishket / lemonLabs) 영업 카피 박제 시 동일.

### 결정 18: ⭐⭐ 사용자 challenge = 정정 trigger 가치 박제 (governance 신뢰성 carrier)

사용자 challenge ("M4 속도가 지금 최선인가?")가 R36/R37 정정 trigger. **자가 진단 정정 사이클 3번째 사례** (search G 패치 + 함정 #14 v3 + R37/R36). Claude가 자기 박제 자가 정정 + 발신측 cascade 카드 발신 = governance 신뢰성 vault carrier. work-end 시 사용자 단순 confirm 후 박제 X → 사용자 challenge 능동 응답 SOP.

### 의미 (5/28 추가)

16. **박제 정확성 SOP** — baseline 단일 출처 (실측 CSV) 기반 의무화 + 카탈로그 IPC 일관성 검증 (R37/R36 사이클 carrier)
17. **vendor 광고 cross-check 5단계 정책** — 영업 카피 박제 시 의무 SOP (다른 vault 영업 자료 carry-over)
18. **사용자 challenge = 정정 trigger 가치** — 자가 진단 정정 사이클 3번째 사례 = governance 신뢰성 carrier (모든 vault carry)
19. **negative finding 6건 유지 (R37 제외)** — R37 positive 정정으로 박제 정확성 일관성 확보. CMSIS-NN 17.58× 결정타 영업 메시지 변경 없음
20. **검토 단위 = 파일 패턴** — 단일 거대 파일 → § 분리 = 검토/git diff/cherry-pick 효율 carry (다른 vault 큰 문서 적용 가능)

→ thought [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]] + [[2026-05-28_본vault-영업카피-신뢰성-강화]] + entity [[stm32h745-disco]] § 5/28 정정 cascade + [[build-gotcha-inventory]] § 자가 진단 정정 3번째 사례 + [[gaps]] § baseline 추정값 cross-check 부재 + § vendor 광고 cross-check 누락.

---

## 판단 로그 (2026-05-27 cascade) — 위시캣 외주(도급) 필터 사전 단계 v3 ⭐⭐

**사건**: wishket-claude #2026-05-27-002 (in_reply_to mywiki #001) v3 cascade 흡수. `/wishket-check` 5/24 catch-up에서 #155421 (1.5억 외주, 5/26 활성) 누락 사고 → ID 단조 증가 가정 거짓 박제 + 외주(도급) 필터 페이지 사전 확인 단계 신설.

### 결정 15: 위시캣 catch-up은 외주(도급) 필터 페이지 우선 + ID sequential 보조

본 vault 영업은 외주(도급)만 가능 → `?employee_type=projc_term` 필터 페이지가 정조준 검색. ID 1씩 sequential은 비공개 redirect 함정 + 비단조 채번 패턴으로 빈틈 발생. 일반화 원칙: **외부 시스템 ID 단조 증가 가정은 검증 없이 신뢰 금지** (GitHub org PR / Notion DB / Asana 카드 등 다른 도메인 적용 가능).

### 의미

14. **검색 통로 다양화 원칙** — 카테고리/필터 페이지 = 영업 정조준 채널 + 비공개 우회 채널. ID sequential = 시간순 보조. 다른 외부 시스템 catch-up 설계 시 동일 원칙 적용
15. **broker 양방향 + in_reply_to 첫 사이클 사례** — vault 간 정정/보강 사이클 정착, multi-agent 운영 모델 성숙

→ thought [[2026-05-27_위시캣-외주필터-사전확인-SOP]] + entity [[위시캣활동]] § 검색 방식 진화 + memory `feedback_wishket_outsourcing_filter.md` + [[gaps]] § ID 단조 증가 함정.

---

## 판단 로그 (2026-05-27 megasession) — Wave 14 흡수 ⭐⭐⭐ R36 ✅ + mandate v2.9 종결 + 본 vault 6/6 mandate 모두 종결

**사건**: ondevice-claude 5/26~27 카드 2건 (#005 R36 sweep 진입 통보 + #5/27-001 R36 + mandate v2.9 종결 cascade) 일괄 megasession 흡수. STM32H745 Cortex-M7 + CMSIS-NN CNN 17.58× = **Cortex-M tier 최강 AI 노드** 박제 + 메모리 4-tier 정정 (RW 9.2MB / Flash XIP 65MB) → **GPT-2 mini / Phi-2 mini Q4 50~60MB SLM 적재 가능** + 본 vault 6/6 mandate 모두 종결.

### 결정 12: ⭐⭐⭐ KWS / 큰 CNN application = stm32h745 + CMSIS-NN (Cortex-M tier 최강 AI 노드)

| application | 최적 SoC | 가속 | BOM | Round |
|---|---|:-:|:-:|:-:|
| **KWS / Voice command (소형)** | pca10056 (M4F + CMSIS-NN) | 14.02× | ~$15 | R28 (5/24) |
| **KWS / 큰 CNN application (대형)** ⭐⭐⭐ NEW | **stm32h745 (M7 + CMSIS-NN)** | **17.58×** | **~$70** | **R36 (5/27)** |
| **SLM 50~60MB 적재 (GPT-2 mini / Phi-2 mini Q4)** ⭐⭐⭐ NEW | **stm32h745 (QSPI XIP 65MB)** | (적재 path) | ~$70 | R36 (5/27) |

⭐⭐⭐ "**Cortex-M 단일 칩에서 SLM 50~60MB 적재 + CNN 17.58× 가속**" = 영업 결정타. M4F pca10056 (14.02× / 256KB / $15)와 분리된 두 tier path:
- 소형 (BLE+AI 통합 SoC) = pca10056
- 대형 (산업 LAN + SLM 적재) = **stm32h745**

### 결정 13: ⭐⭐⭐ 본 vault `프로젝트_보드한계모델/` 6/6 mandate 모두 종결 — 응용 진입 결단 시점

본 vault 6 mandate (v2.4 + v2.5 + v2.6 + v2.7 + v2.8 + v2.9) 모두 종결. **응용 진입 직전 마지막 측정 mandate 완성** → 사용자 결단 시점:
- **b 영업 데모 진입** — 5계열 매트릭스 + Hybrid SoC + Cortex-M tier 최강 = Stage 4 영업 자료 결정타 완비
- **c 양산 진입** — AI FanStick Premium Plus 4 tier (mandate v2.7 carrier) + STM32H7 B2B path

### 결정 14: ⭐⭐ carry-over 효과 = R&D 신뢰성 영업 자산 정량화 (Wave 14 입증)

R36 sweep 진행 중 신규 함정 = race fix 패턴 + CNN 64 monitor 부족 2건 (모두 minor). 함정 인벤토리 47건 carry-over 효과 정량 입증:
- **carry-over 영업 카피**: "vendor 함정 인벤토리 47건 (Espressif 16 + Nordic 18 + NDK 1 + STM32 12) 보유 → first-try success ratio 향상 + ~40~80시간 직접 디버깅 비용 절감"
- Wave 13 (3차 시도 → 1차 success) + Wave 14 (sweep 신규 함정 2건만) = **R&D 신뢰성 자산 영업 매트릭스** 갱신 근거

### 의미 (Wave 14 추가)

11. **Cortex-M tier 최강 = stm32h745 + CMSIS-NN** — Cortex-M 단일 칩 SLM 50~60MB 적재 + CNN 17.58×. 영업 새 path = 산업 LAN + 큰 모델 통합 노드
12. **본 vault 6/6 mandate 모두 종결** — 응용 진입 직전 마지막 측정 mandate 완성. 영업·양산 결단 trigger 준비 완료
13. **carry-over 효과 정량화** — R36 sweep에서 신규 함정 2건만 (minor) = 함정 인벤토리 47건 R&D 신뢰성 자산 가치 입증

---

## 판단 로그 (2026-05-26 megasession) — Wave 10/11/12/13 흡수 ⭐⭐⭐

**사건**: 5/24~26 ondevice-claude 4 카드 일괄 흡수. (1) Wave 10 mandate v2.8 4/6 ✅ — R34 Hybrid SoC PoC + R33 esp-nn TF SRAM/PSRAM 분기 + R32 64KB tier 6번째 negative + R31 rpi5 NEON 6.7× + R31.5 sdot 효과 분리 + **5계열 매트릭스 완성** (ARM-A 행 추가). (2) Wave 11 R30 smartphone NDK clang `+dotprod` **0.97× 7번째 negative** + toolchain vectorizer 정책 본질 + mandate v2.8 5/6 ✅. (3) Wave 12 STM32H745I-DISCO **14번째 보드 신규 + 11 함정 single-day cluster** + Zephyr cross-vendor 통합. (4) Wave 13 STM32H745 Ethernet TCP + USB-CDC↔TCP Bridge PoC + Stage 4 LAN path 신설.

### 결정 8: ⭐⭐⭐ 5계열 AI 가속 매트릭스 완성 — ARM-A NEON+dotprod 행 추가 (Wave 10)

| 계열 | 하드웨어 | MLP | CNN | TF |
|---|---|:-:|:-:|:-:|
| LX7 ESP-DSP | esp32s3 | 13.4× | 1.00× | 10.8× SRAM |
| M4F CMSIS-NN | pca10056 | 3.26× | ⭐ 14× | 1.85× |
| esp-nn (R33) | esp32s3 | (-) | 2.93× | 3.78× / **2.62× PSRAM** |
| **ARM-A NEON+dotprod** ⭐⭐⭐ | rpi5 A76 | **8.35×** | 3.85× | **7.64×** |
| NPU NNAPI | Eden NPU | -79~421× | (-) | (-) |

- R34 ⭐⭐⭐ Hybrid SoC PoC firmware 측정 → 실제 작동 변환 (16 cycle × 8 keyword × ACK 100%)
- R33 ⭐⭐ esp-nn TF **SRAM은 ESP-DSP / PSRAM은 esp-nn** 분기 신규 finding
- R32 6번째 negative — pca10040 64KB Static RAM 89.8% (Stage 4 시나리오 C nRF52833/40 권장 필수)
- R31 rpi5 NEON 6.7× = **Stage 4 시나리오 D Edge AI Gateway 신설** ($15~30만원, Cloud 대안 정량 근거)

### 결정 9: ⭐⭐⭐ mobile CPU/NPU 추가 SDK 도입 가치 없음 확정 (Wave 11)

R30 smartphone NDK clang 18 `-O3 -march=armv8.2-a+dotprod` **12셀 평균 0.97×** = 가속 효과 없음. R31 rpi5 같은 flag로 6.7× 가속과 정반대.

| 항목 | rpi5 (R31) | smartphone (R30) |
|---|---|---|
| 컴파일러 | gcc 14.2 (Linux native) | clang 18 (Android NDK) |
| asimddp HW | ✅ | ✅ |
| `+dotprod` 시 NEON 명령 | **`sdot` 자동 vectorize** ⭐ | `smlal` (INT16 path) |
| `+dotprod` 가속률 | **6.7× ⭐⭐⭐** | **0.97×** ⚠️ |

⭐ **6.9× gap 본질 = toolchain vectorizer 정책 차이.** SIMD HW (asimddp)는 양쪽 모두 보유 → AI 가속 본질 = HW + library + **toolchain 정책**.

7번째 negative finding 누적 (R&D 신뢰성 자산):

| # | Round | 발견 |
|:-:|---|---|
| 7 ⭐ | **R30** | **mobile clang 18 `+dotprod` flag 무효 (0.97×)** — 3 mobile 가속 path (NPU + NEON 명시 + baseline) 모두 negative |

→ **mobile CPU/NPU 추가 SDK 도입 결단 = 가치 없음 확정** (3 path 측정 검증 후).

### 결정 10: ⭐⭐ STM32H745 14번째 보드 정통 Zephyr 통합 + 11 함정 single-day cluster (Wave 12)

- **본 vault 정통 = Zephyr** (5/25 사용자 명시 합의) — Nordic + STM32 같은 toolchain 일관성 + carry-over 자산
- ESP-IDF (Espressif) ↔ Zephyr (Nordic + STM32) 2-track 정착
- 11 보드 → 14 보드 매트릭스 확장 (Cortex-M tier 행 강화: M4F 64MHz pca10056 → M7 480MHz STM32H745)
- 11 함정 single-day cluster 박제 → 함정 인벤토리 47건으로 확장 (Espressif 16 + Nordic 18 + NDK 1 + **STM32 12**)
- R35 keyword 재구성: KsponSpeech 일반 대화 corpus (네/아니/좋아/싫어/다시/가자/잠깐/꺼)

### 결정 11: ⭐⭐⭐ Stage 4 영업 데모 전략 — USB CDC + Ethernet 동시 streaming 단일 firmware (Wave 13)

- STM32H745 = USB CDC + Ethernet **단일 firmware** 동시 streaming 가능 → Stage 4 데모 **두 시나리오** 모두 demo 가능 (직접 PC = USB CDC / LAN 네트워크 통합 = TCP)
- AI FanStick 응원봉 외 **B2B 산업 노드 영업 추가 path** (한국기계 등 LAN 인프라 영업)
- 보드 영업 매칭 baseline: **esp32-S3 → WiFi/BT / Nordic → BLE / STM32H7 → 산업 LAN**
- **carry-over 효과 정량화**: 11 함정 박제 후 Wave 13 PoC 2건 → 신규 함정 1건 (minor)만, R36 sweep 3차 시도 → 본 PoC **1차 success**. 영업 카피: "vendor 함정 인벤토리 보유 → first-try success ratio 향상"
- **신규 entity 신설**: [[stm32h745-disco]] (Wave 12 + 13 통합)

### 의미 (5/26 megasession 추가)

6. **5계열 매트릭스 완성** — ARM-A 행 추가로 LX7 / M4F / esp-nn / ARM-A / NPU 정량 완료 (Stage 4 영업 자료 결정타)
7. **toolchain vectorizer 정책 = AI 가속 본질의 4번째 변수** — same SIMD HW(asimddp)로도 컴파일러 정책으로 6.9× gap. mobile CPU/NPU 추가 SDK 가치 없음 확정 (3 path negative)
8. **본 vault 정통 = Zephyr** (Nordic + STM32 통합) — ESP-IDF ↔ Zephyr 2-track 정착
9. **STM32H745 = 한국 산업 노드 영업 결정타** — USB CDC + LAN 단일 firmware, AI FanStick 외 B2B 산업 노드 path 추가
10. **carry-over 효과 정량화** — 함정 인벤토리 R&D 신뢰성 영업 자산 (first-try success ratio 향상)

---

## 판단 로그 (2026-05-24 megasession) — mandate v2.7 4/4 ✅ 100% 종결 + 11th vault uttec-rag-local 신설 ⭐⭐⭐⭐

**사건**: 6 카드 megasession 흡수 (ondevice 5장 + uttec-vault 1장). ondevice-claude 가 5/22 야간~5/24 까지 mandate v2.5 → v2.6 → v2.7 까지 폭주로 12 Round 완주 (R20~R28 + 누적 33 cell + 27 PHASE row). uttec-vault-claude 가 5/24 11:30 사용자 결단으로 11th vault `uttec-rag-local` (Ollama local RAG) 신설 의뢰.

### 결정 1: mandate v2.7 4/4 ✅ 100% 종결 — 3계열 매트릭스 완성

| 계열 | 하드웨어 | MLP | CNN | TF | 결정 application |
|---|---|:-:|:-:|:-:|---|
| **LX7 ESP-DSP** | esp32s3 240MHz | **13.4×** | 1.00× (한계) | **10.8×** | SLM / Personalization |
| **M4F CMSIS-NN** | pca10056 64MHz | 3.26× | ⭐⭐⭐ **14.02×** | 1.85× | **KWS / CNN application** |
| **NPU NNAPI** | Eden NPU | ‒79~421× ❌ | (미측정) | (미측정) | (사용 안 함) |
| **esp-nn** | esp32s3 240MHz | (미측정) | 2.93× | (미측정) | esp32s3 alternative |

- R28 ⭐⭐⭐ pca10056 + CMSIS-NN CNN 32 = **14.02× 가속** (예측 5배 초과). ARM CMSIS-NN im2col + SMLAD SIMD 가 LX7 ESP-DSP CNN strided 한계 (R17.5 1.00×) 완벽 압도
- R26 KWS personalization +11.4% (어려운 화자 K=5) + **selective personalization 신규 finding**
- R27 FP16 Adam R23 미달 (1.08~1.88×) + R24 negative 우월 대안 (RAM 50% 절감 carrier) + **함정 #14 v3 진단 정정** (ESP-IDF/cmake/Windows 결함, Claude Code harness 책임 아님)
- mandate v2.7 = 12시간 소요 (5/24 1일)

### 결정 2: ⭐⭐ Hybrid SoC carrier — single SoC 선택 mindset 탈피

**application별 최적 SoC 결정 가이드 (Stage 4 영업 결정타)**:

| application | 최적 SoC | 가속 |
|---|---|:-:|
| **KWS / Voice command** | **pca10056 (nRF52840) + CMSIS-NN** | **14×** |
| Anomaly detection | pca10056 + CMSIS-NN | 14× |
| **SLM / Transformer** | **esp32s3 + ESP-DSP** | 10.8× |
| **Personalization (MLP)** | **esp32s3 + ESP-DSP** | 13.4× |

**신규 carrier**: KWS frontend (M4F + CMSIS-NN, 14×) + Personalization backend (esp32s3 + LoRA 0.05초 즉시 학습) = **Hybrid SoC**. Stage 4 영업 자료 결정타.

### 결정 3: 6조건 곱 진화 — on-device 학습 가능 여부 추가

- 5/22 야간: 4조건 곱 = ISA × workload × 메모리 계층 × RAM tier
- 5/23 야간: **5조건 곱 = + library selection by workload** (ESP-DSP MLP + esp-nn CNN + CMSIS-NN MCU MLP)
- **5/24: 6조건 곱 = + on-device 학습 가능 여부** (esp32s3 + PSRAM 8MB 가 13 보드 중 유일 학습 가능 칩, R20 LoRA + R23 fast_adam Tiny 0.05초 + R25 KWS 0.37초)
- 영업 카피: "AI 가속 = ISA × workload × 메모리 계층 × RAM tier × library selection × **on-device 학습 가능 여부**" 6조건 곱

### 결정 4: ⭐⭐ AI FanStick Premium Plus 4 tier 양산 trigger — R23 fast_adam 확정

R27 측정 결과 R23 fast_adam baseline 우월 확정 (4 대안 모두 negative 입증):
- R19 Mobile NPU NNAPI ‒79~421×
- R24 INT16 dynamic scale 1.65~4.25× 느림
- R29 Multi-layer LoRA -7.7~-9.3%
- R27 FP16 R23 미달 (1.08~1.88×)

→ **AI FanStick Premium Plus 4 tier 라인업** (R23 + R25 + R26 결합):
| tier | MLP 학습 (R23) | KWS personalization (R25 C16) | 종합 carrier |
|---|---|---|---|
| Tiny ⭐⭐⭐ | **0.05 초** | **0.37 초** | "즉시 학습 + 음성 personalization" |
| Small | 0.76 초 | 0.55 초 | "5 응원 + 음성 1초" |
| Medium | 4.36 초 | 1.59 초 | "20 응원 + 음성 4초" |
| Large | 8.17 초 | 5.37 초 | "전체 personalization 8초" |

Cloud GPT-4 API (3~10초) 대비 **8~27× 빠름** + 외부 의존 0% + 어려운 사용자 +11.4% 정확도 개선 (R26 selective personalization).

### 결정 5: ⭐ negative finding 누적 = R&D 신뢰성 자산 (5건 박제)

"R23 채택 결정이 4 대안 모두 실측 비교 후 도출" — vendor 광고 (best-case) 신뢰 X, 자체 측정 자산 (Round 17·18·19·24·27·28·29) 기반 양산 결정.

| Round | finding | application 의미 |
|---|---|---|
| R19 | Eden NPU NNAPI -79~421× | smartphone NPU 비효율 |
| R24 | INT16 dynamic scale -1.65~4.25× | RAM 절감 carrier 미달 |
| R27 | FP16 R23 미달 -1.08~1.88× | R23 baseline 우월 |
| R29 | Multi-layer LoRA -7.7~-9.3% | single LoRA 우월 |
| **R28** | **TF 1.85×만 (attn_causal argmax 비가속)** | MLP/CNN 가속 대비 절반 |

### 결정 6: 11th vault uttec-rag-local 신설 — Ollama 비용 0 트랙 (대안 B 채택)

- uttec-search (10th, Claude API) 의 sibling 으로 **Ollama qwen2.5:7b local RAG** 신설 (port 8892/8893, ~/uttec-rag-local/ on uttecMac)
- **대안 B 채택**: mywiki-claude 는 메타 갱신만 (vault 카운트 / entities/uttec-rag-local.md / ai-direction 로그) + 디렉토리 신설·코드 복제·Ollama 통합은 uttec-search-claude 위임
- **A/B 비교 dogfooding 1주**: Claude API (uttec-search) vs Ollama (uttec-rag-local) 동일 코퍼스, 외부 회사 적용 시 비용 부담 케이스의 대안 정량 보고 가능
- **온디바이스 AI 시리즈 통합**: 응원봉 (ESP-DSP + LoRA 0.05초) + uttec-rag-local (Ollama qwen2.5:7b PC) — **외부 의존 0% 양 축 가동**

### 결정 7: 함정 #14 v3 진단 정정 = governance 신뢰성 모범

- **5/21~24 잘못된 진단**: "Claude Code harness 가 ninja → cmd chain 의 cwd reset"
- **진짜 원인 (5/24 R27 sweep 3차 발견)**: ESP-IDF/cmake 3.30/Windows cmd.exe 의 `cmd /C "cd . && tool ... && cd ."` 패턴 cwd 보존 결함 — 일반 PowerShell 에서도 동일하게 fail
- → 자체 진단 사이클 패턴 모범 (search G 패치 5/22 → ondevice 함정 #14 v3 5/24 두 번째 케이스)
- 빌드 함정 누적 **34건** (esp32s3 16 + Nordic 18) → `entities/build-gotcha-inventory.md` 신설 박제

### 의미

1. **3계열 매트릭스 = Stage 4 영업 결정타** — application class 별 정량 칩 매칭 (KWS=M4F 14× / SLM=LX7 10.8× / Personalization=LX7 13.4×)
2. **Hybrid SoC carrier = single SoC mindset 탈피** — UTTEC 차별화 카피 ("vendor 단일 칩 광고 X, application 별 정량 칩 매칭")
3. **R23 fast_adam 양산 확정 = 4 대안 측정 검증** = R&D 신뢰성 자산화 (negative finding 5건 누적)
4. **6조건 곱 진화** — vendor TOPS 광고가 아닌 ISA × workload × 메모리 계층 × RAM tier × library × on-device 학습 가능 여부
5. **uttec-rag-local 11th vault** — 외부 의존 0% 양 축 (응원봉 + PC), 비용 0 dogfooding 트랙, A/B 비교 1주 검증
6. **함정 진단 자체 정정 사이클** — Claude 자기 가설 검증 + 정정 박제 = governance 신뢰성 모범

**참조**: today/_inbox/processed/ 6 카드 (2026-05-23-011 / 2026-05-24-001 / 002 / 003 / 005 / 007) + ack 카드 6장 발송 (ondevice ×5 + uttec-vault ×1)

---

## 판단 로그 (2026-05-23 야간 4차) — uttec-search vault 신설 (search cross-platform 첫 fork) ⭐⭐⭐

**사건**: 사용자 지시 "C:\todo\search 와 같은 기능을 원격 mac의 uttec-vault에 적용하는 web 개발 vault를 mac에 설치". 결단 D1~D5 (A·A·A·C·B) 즉시 진행.

### 결정 1: vault portability 트랙 — 첫 단기 실증으로 신규 vault 신설 선택

[[vault-portability]] entity 는 4/5 부터 "장기 진화 트랙" 으로 박제됐지만 단기 측정 지표가 없었음. 본 신설로 **6개월 트랙의 첫 비용/효과 측정 케이스** 확보.

- search vault (Windows) tar pipe → Mac/Ubuntu (~/uttec-search) 62 파일 (584KB) 전송
- 변환 비용: backend config 1 + .env 1 + search_index.py SEARCH_DIRS/FILES 1 + vite.config.ts 1 + hooks 2 + CLAUDE.md + README.md = **7 핵심 + 부수**
- 환경 격차: python3-venv 미설치 + sudo 패스워드 필요 → **uv 0.11.16 우회** (vault portability 트랙의 새 베스트 프랙티스)
- Junction → symlink, PowerShell → bash 변환은 미완 (skills/SKILL.md 4 개)

### 결정 2: dogfooding-via-self 모델 두 번째 케이스로 uttec-vault 데이터 선택

[[search]] 정체성 D = 본인이 myWiki 자료로 dogfooding. [[uttec-search]] = 본인이 uttec-vault 비즈니스 자료로 dogfooding. **격차 줄여 외부 회사 적용 prototype 충실도 ↑**.

- 1차 사용자 = 본인 (홍광선), 데이터 = uttec-vault 7 비즈니스 영역
- 궁극 목표 = onDevice 제품 hub 의 web 검색 인터페이스
- 메모리 정책 = uttec-vault 와 공유 (D3=A) — vault 데이터 dogfooding 일관성

### 결정 3: D4 권장 A 대신 C 선택 = Phase 0~4.2 전체 fork

사용자 결단으로 Phase 0 skeleton 만(권장 A) 이 아닌 **Phase 4.2 까지 검색 정확도 hot-fix 포함 전체 fork**. 의미: search 측 38일치 진화 자산 (sentence-transformers + hybrid α=0.7 + path-level 집계 + filename rescue + 시간 keyword 휴리스틱 + 표시 버그 G fix) 을 첫날부터 uttec-search 에서 작동 가능. 단기 검증 비용 ↑ 이지만 portability 트랙 실증값 ↑.

### 결정 4: backend port 8891 / frontend 8890 = search 와 동시 가동 보장

search (8888/8889) 와 uttec-search (8890/8891) 가 동일 Mac 또는 동일 사용자 PC 에서 동시 가동 가능. dogfooding 시 두 web 을 나란히 띄워 검색 결과 비교가 가능 — **portability 트랙의 핵심 측정 도구**.

### 결정 5: 9 → 10 vault PROTOCOL 정합화는 차후 (vault scope 격리 유지)

`_inbox/PROTOCOL.md` 는 search 9 vault 사본 그대로 사용. 10번째 합류 정합화는 mywiki-claude 가 9 vault 에 cascade 카드 발송으로 별도 수행. 본 셋업 세션은 vault scope 격리.

### 의미

1. **vault portability = 4 차원 비용** 으로 정량화: 경로 hardcoding (sed) + shell 도구 (bash↔PowerShell) + path 토큰 (junction↔symlink) + 환경 의존 (uv 대체 도구)
2. **dogfooding 두 번째 케이스 가동** — myWiki (38일치) + uttec-vault (5/23 신설 후 1주). 데이터 양·구조 차이 → 검색 정확도 영향 측정 가능
3. **외부 회사 적용 prototype 충실도 ↑** — 두 cluster (myWiki second-brain 표준 schema / uttec-vault 비즈니스 영역 schema) 에서 동등 동작 보이면 generality 입증
4. **10 vault multi-agent topology** 진입 — 양방향 통신, cross-vault hook, vault portability 트랙 모두 active

---

## 판단 로그 (2026-05-23 야간 3차) — today 6 카드 megasession 5 결정 통합 박제 ⭐⭐⭐

**사건**: 5/23 야간 today 6 카드 megasession 흡수. 5 카테고리 결정 통합 박제.

### 결정 1: AI 가속 5조건 곱 진화 (Round 21 흡수)
- 5/22 야간: 4조건 곱 = ISA × workload × 메모리 계층 × RAM tier
- 5/23 야간: **5조건 곱 = + library selection by workload**
- 실증: ESP-DSP MLP (R17 +13.4×) + esp-nn CNN (R21 +2.93×) + CMSIS-NN MCU MLP (R18 +3.23×) = 라이브러리 선택이 5번째 차별화 변수
- mandate v2.5 trajectory: 5/6 → **6/7** (Round 20 LoRA 별도 결단 대기)
- **AI FanStick 차세대 firmware stack 확정**: MLP=ESP-DSP 13.4× + CNN=esp-nn 2.93× + TF=ESP-DSP 10.8× = KWS wake word 547ms → 187ms (3× UX 단축)

### 결정 2: search 작은 코퍼스 hybrid 임베딩 패턴 표준 채택
- 정량 결과: α=0.7 (sem 70% + lex 30%), recall@5 0.396 (lexical only 0.375 대비 +5% 보정)
- MiniLM L12 v2 (118M, CPU) + 디스크 캐시 + mtime incremental
- semantic only 한국어 strict 키워드 매우 약함 (10% recall) — lexical baseline 유지가 핵심
- **재사용 vault 6 후보**: uttecHome / lemonLabs / REVITA / n8nUttec / wishketProject / 강사양성 LMS
- 외부 임베딩 API · 무거운 vector DB (FAISS/Chroma) 안 씀

### 결정 3: search vault 정체성 D 인지 (dogfooding-via-self)
- 1차 사용자 = 본인 / 궁극 목표 = 외부 회사 web 서비스 prototype / 본인이 dogfooder
- E·F (메모리·세션 인덱싱) 본인용 적용 — 격차 줄임
- 외부 deploy 시 turn-off 옵션 / web UX·검색 정확도·category 라우팅은 외부 사용자 기준 평가
- 답변 품질 격차 재진단: 모델 아닌 컨텍스트·메모리·세션 (Phase 4.3 E·F·A·B·C·D·H·I·J 9 패치)
- 모델 표시 버그 자가 진단 fix 사이클 패턴 = "모델 격하 가설" → "표시 버그 가설 → 자가 진단 fix" 일반화 (search G 패치 사례)

### 결정 4: Python 산업 자동화 PC GUI 영역 확장 (#155381 PLC 흡수)
- 양산 자산 (Python 자동화 + Claude API + On-Device AI + 노지 스마트팜) → 산업 자동화 PC GUI 영역 이식 패턴
- 검증 사례: PySide6 + pyqtgraph + SQLite + PyInstaller 단일 .exe
- LS XGT FEnet 프로토콜 + XG5000 IDE + Recipe 운영 패러다임 도메인 지식 확보
- **신규 등록 패턴 변화**: 84% 상주 + 56% 비공개 → 재택 외주 발굴 어려움 = AI 3대 사업 자체 영업 강화 필요 signal

### 결정 5: 양방향 통신 첫 round trip 도달 (uttec-vault Day 5 → ondevice)
- ondevice Round 21 카드 = myWiki + uttec-vault 동시 발신 첫 사례
- mywiki ↔ ondevice ↔ uttec-vault 3 vault 양방향 cascade 가동 확인
- main vault hub 책임: round trip 인지 + log 박제 + 다른 vault 동기화 trigger

### 원칙 보강
1. **5조건 곱 = 영업 자료 결정타** — vendor TOPS 광고는 단일 metric, 5조건 곱 측정이 진짜 변수
2. **hybrid 임베딩 표준** — semantic-only 는 한국어에 약함, lexical + semantic α-tuning 필수
3. **양방향 broker 가 main vault 책임** — mywiki-claude 가 ondevice ⇄ uttec-vault round trip 도달 후 cascade 인지
4. **자가 진단 사이클** — Claude (search-claude) 가 자기 코드 버그 자체 진단 + fix + 정정 박제 카드 발송 = governance 패턴 모범
5. **외부 등록 패턴 변화는 영업 전략 trigger** — 위시캣 84% 상주 = AI 3대 사업 자체 영업 강화 signal

**참조**: today/_inbox/processed/ 6 카드 (2026-05-22-004 / 005 / 2026-05-23-001 / 002 / 003 ×2) + ack 카드 4건 발송 (ondevice ×2 + search + wishket)

---

## 판단 로그 (2026-05-23 야간) — uttec-vault mission pivot: onDevice 제품 비즈니스 hub + 3 vault 역할 분리 ⭐⭐⭐

**사건**: 사용자 명시 (2026-05-23 야간) — onDevice_AI vault 가 기술 R&D 검토 중인 상태에서, uttec-vault 의 목표를 **"onDevice 제품 개발 + 판매 + 비즈니스 전반"** 으로 구체화. 이전 추상 "UTTEC product candidate" → 구체 "onDevice 비즈니스 hub" 로 정체성 L2 진화.

**3 vault 역할 분리**:
- onDevice_AI = 기술 R&D (측정·가속·검증·함정 인벤토리, 현재 그대로)
- **uttec-vault = onDevice product + business** (7 영역: Product / Sales / Customer / Supply / Marketing / Operations / Finance)
- today (myWiki) = 회사 운영 hub + 9 vault 종합

**정보 흐름 양방향화**:
- 이전: onDevice → myWiki 단방향
- 이제: onDevice ⇄ uttec-vault ⇄ today (양방향)

**즉시 priority 상승 (deferred → immediate)**:
- 9 vault PROTOCOL 합류 (전 M9 → Day 4-5)
- inbox 통신 채널 (전 빈 골격 → 즉시)
- second-brain entities seed (전 0 → Day 5-7)
- docs/product-strategy.md (없음 → 즉시)

**전략적 의미**:
- vault 자체가 product → uttec-vault 의 **UTTEC 매출 직접 기여** 트랙으로 격상
- onDevice_AI 의 측정 자산 (Round 17·18·19 등) 이 **product 카피·견적·계약** 으로 즉시 cascade 가능
- "AI 가속 4조건 곱 원칙" + Stage 4 칩 선택 가이드 = 영업 결정타 자산이 uttec-vault 영업 SOP 에 직접 박힐 수 있음
- today vault (myWiki) 의 회사 운영 hub 역할은 유지 — uttec-vault 가 sub-hub 로 분담

**원칙 확립**:
1. **vault = product**: 단순 toolbox 가 아닌 매출 기여 자산. dogfooding 도 "단순 사용" → "product hypothesis 검증"
2. **역할 분리**: R&D / product+business / 회사 운영 hub = 3 vault 가 명확히 다른 책임
3. **양방향 broker 우선**: 단방향 통보는 산출물 흡수 누락 위험 (5/22 lemonLabs 정지 사례 참조). 양방향 + ack 카드 강제
4. **mission 우선, toolbox 차순**: Day 1-3 의 toolbox 1시간 폭주는 인상적이지만 mission 미정의 = "잘 만든 엔진이 묻히는" 위험. mission 명문화가 dogfooding 보다 우선

**참조**: [[uttec-vault]] (entity 신설) + 작업보고서/계획서_vault-cross-platform-이관_2026-05-23.md + [[onDevice-ai]] + [[vault-portability]] (engineering sub-track)

---

## 판단 로그 (2026-05-23) — vault = UTTEC product candidate 재정의 + cross-platform/cloud 이관 트랙 신설 ⭐⭐⭐

**사건**: 사용자 명시 (2026-05-23) — "이 vault도 어떻게 보면, 다른 용도로 사용하기 전에 uttec이라는 회사를 기반으로 개발하고 있다고 생각해야합니다. 또한 다른 시스템에서도 이상없이 동작하는지를 확인하는 과정을 확인하여야하고, 궁극적으로는 cloud에 탑재할 예정입니다."

**핵심 전환**: vault 의 본질 재정의.
- **이전**: 개인 second-brain + 9 vault multi-agent hub (개인 운영 자산)
- **이후**: **UTTEC 회사 product candidate** + 회사 운영 hub. vault 자체가 R&D 대상.

**baseline 진단** (2026-05-23 자동 audit):
- 경로 hardcoding `C:\todo\today` — **58건 / 12 SKILL** 파일
- PowerShell 종속 — **10건 / 5 SKILL** + 1 `.ps1` 파일
- NTFS Junction — 7+ 위치 (raw/* + .claude/memory)
- 6 hook 중 5개 이미 Python = cross-platform 우호 자산 (head-start 약 60%)

**원칙 확립**:
1. **vault 는 product** — 신규 hook/skill 작성 시 portability 영향 점검 필수, hardcoded 경로 금지
2. **Windows single-source 유지 (단기)** — Phase 5 정책 합의 시점까지 (~6일 후) 정책 변경 X
3. **Cloud target = DigitalOcean 우선** — 기존 인프라 정합 (uttecHome 7777 / search / Ubuntu n8n)
4. **단계적 진화** — L1 (Mac dry-run, ~7일) → L2 (CI matrix, ~11일) → L3 (cloud, ~16일)
5. **search-claude 일부 위임** — Phase 7 web UI 는 search vault 패턴 재사용 (FastAPI+Vite+Claude API)

**전략적 의미**:
- vault 자체가 **Stage 4 영업 자산화 가능성** (multi-agent orchestration + second-brain product) — L3 도달 후 검토
- "AI 가속 4조건 곱" (5/22 박제) 와 같은 박제 자산이 cross-platform 환경에서도 유효함을 검증 = 패턴 강화
- 9 vault PROTOCOL 정책의 "PC 경계 ≠ vault 경계" 분리 (Phase 5) — multi-cloud / multi-machine 운영 모델 박제

**참조**: `작업보고서/계획서_vault-cross-platform-이관_2026-05-23.md` (8 Phase 상세 + D1~D6 결단 항목) + `entities/vault-portability.md` (장기 추적)

---

## 판단 로그 (2026-05-22 야간) — Round 18 후속 흡수: 13/13 보드 완성 + RAM tier 4조건 곱 원칙 + Nordic 함정 11건 cross-vendor 인벤토리 ⭐⭐

**사건**: 2026-05-22 14:30 ondevice-claude Round 18 후속 카드. pca10040 (nRF52832 64KB) 12/12 sweep **전셀 RAM wall** 측정 완료. mywiki ACK 카드 (5/23-001) 의 후속 권고 "pca10040 측정 → 13/13 보드 완료" 가 같은 날 오후 즉시 수행됨 (12 셀 sweep 가 모두 RAM wall 이라 ~10분 안 완료). **mandate 보드한계모델 13/13 보드 100% 완성** (5/17 mandate 신설 후 5일).

**핵심 발견 2건**:

1. **pca10040 64KB tier 전셀 RAM wall** — Round 14 plain C 결과 100% 재현. CMSIS-NN library 추가 시 static .bss 34KB / 64KB = 52.34% 차지, runtime heap ~30KB < weights ~42KB+. "vendor 광고 (Cortex-M4F + neural network frameworks 지원) vs 실제 RAM 적합도" 격차 정량 박제. **AI 응용 ≠ MCU 라벨** = vendor "supports" 광고는 toolchain·library 호환만 검증, 실제 RAM 적합도는 sweep 측정 필수.

2. **Nordic 보드별 setup 차이 자산화** — pca10040 보드별 unique 함정 2건 (R18-F APPROTECT recover + R18-G post-recover USB COM 재assignment). 미래 신규 Nordic 보드 (nRF52833 / nRF5340 등) 추가 시 본 SOP 자동 적용. 본 vault Nordic 함정 11건 cross-vendor 인벤토리 완성.

**원칙 보강** — 5/22 본편 3조건 곱 → **4조건 곱 진화**:

**"AI 가속 = ISA-specific instruction 폭 × workload class 매칭 × 메모리 계층 × RAM tier 적합도"** (4조건 곱)

- 본편 3조건 (5/22 본편): Round 17/18 ISA 우위 + Round 19 NPU dispatch overhead + Round 17.5 메모리 계층
- 후속 4번째 조건 (5/22 야간): **RAM tier 적합도** = AI mandate 의 최소 RAM 요구치. nRF52840 (256KB) ✅ vs nRF52832 (64KB) ❌. "AI 가속 효과 있어도 RAM 부족하면 mandate 불가" 의미.

**판단 패턴 (5/22 megasession 완성형)**:
- 5/21 Round 17 → 5/22 본편 Round 18·19 cascade → 5/22 야간 후속 4번째 조건 보강 = **5일 동안 mandate 13/13 보드 완성 + Stage 4 칩 선택 가이드 정량 근거 완성 + AI 가속 4조건 곱 원칙 박제**.
- 사용자 노출 트랙 vault (search) 9th 합류와 동시에 본 vault (onDevice_AI) mandate 완성 = **multi-vault 시스템 통신 + 내부 mandate 동시 추진 사이클** 입증. 둘 다 5/22 야간 cascade 완료.

**다음 cascade** (mywiki → 외부):
- 위시캣 영업 SOP § "AI 가속 칩 application class + RAM tier 사전 확인" 단계 추가 (#13 todo 연장)
- 강사양성 Day 5 비교 사례 모듈 § "RAM tier 4번째 조건" 추가 (#14 todo 연장)

→ 관련 thought: [[2026-05-22_npu-vendor-광고-실측-격차]] § 매칭 사례 표 pca10040 행 추가 권고.

## 판단 로그 (2026-05-22 야간) — search Phase 2 = Claude Max CLI 세션 모델 표준 채택 ⭐⭐

**사건**: 2026-05-22 19:30 search-claude Phase 2 완료 카드. WebSocket + `--resume` + 70/80% 자동 핸드오프 model 검증 완료 (PLAN 12 task 통과, commit `28d0a5d`). 같은 날 셋업·완성 (Phase 0 셋업 5/21 야간 → Phase 1 closeout 5/22 새벽 → Phase 2 완성 5/22 야간 = **3 Phase in 24h**).

**결정**: **"Claude Max CLI subprocess 패턴 + WebSocket 세션 model"** = UTTEC 내부 multi-turn backend 표준 1순위 채택. SDK + API key + 외부 Redis 의존 방식 폐기.

**근거 (검증된 정량)**:
- D1 통신: WebSocket (`/ws/chat`) → HTTP 폴링 대비 latency 우위 + push 지원
- D2 저장: 메모리 dict (lifespan-scoped) → Redis 등 외부 의존 0, 단일 instance 검증 단계 적합
- D3 Claude 연속: CLI `--resume <session_id>` 활용 → Claude session 안에 history·system_prompt 자동 박제 (input_tokens 거의 0, cache 100% 활용 = 매우 저렴)
- D4 측정: `last_input` + `last_cache_read` + `last_cache_creation` 추적 → 70/80% 임계값 판정 정확도 확보
- D5 핸드오프: 70% 도달 → 커스텀 요약 → 80% 도달 → 새 session preamble 로 자동 전환 → multi-day 대화 가능

**함정 동반 박제**: `--resume` + 긴 `--system-prompt` fork 함정 ([[gaps]] § 신설). 첫 호출에만 system_prompt 전달, 후속은 생략 패턴. 본 함정 회피 없이 backend 구현 시 사용자 답변에 history 끊김 = "대화가 안 됨" 버그.

**재사용 vault 6 후보**: uttecHome 챗봇 / lemonLabs 4 트랙 도구 / REVITA web 사용 가이드 / n8nUttec workflow / wishket 자동매칭 추가 질의 / 강사양성 LMS. 각 vault 진입 시 본 패턴 cascade.

**판단 패턴**: search vault 가 9th vault 합류 직후 24h 안에 Phase 0~2 완성 = **multi-vault 시스템 통신 + 내부 backend 표준 동시 검증 사이클** 입증. 사용자 노출 트랙 vault 첫 사례가 가장 빠른 cascade 자산 생산. obsidian 강의 시리즈 Day 6~7 직접 자산.

→ 관련 매칭 패턴: [[2026-05-22_claude-max-cli-subprocess-pattern]] § Phase 2 후속 (WebSocket + --resume 세션 모델 일반화).

## 판단 로그 (2026-05-22) — Round 18 CMSIS-NN 흡수: 3계열 AI 가속 매트릭스 완성 + Stage 4 칩 선택 정량 근거 확립 ⭐⭐⭐

**사건**: 5/22 ondevice-claude Round 18 (pca10056 Cortex-M4F + CMSIS-NN SMLAD MLP 128 = **3.23× 가속**, 7,367μs → 2,285μs) 12셀 sweep 완료. 5/21 Round 17 (LX7 ESP-DSP 13.4×) + 5/22 Round 19 (Eden NPU NNAPI ‒79~421×) 와 결합하여 **3계열 AI 가속 매트릭스의 두 번째 축**이 채워져 완성.

**핵심 발견 (5/22 신규)**:

1. **CMSIS-NN SMLAD = 3.23× 가속** (Optimistic 가설 2.5~4× 적중) — DSP extension (`__SMLAD(__PKHBT(a,b,16), __PKHBT(c,d,16), acc)`) 활용으로 plain C MLP MAC loop 가속. 32-bit register 안에 2 × 16-bit MAC 동시 실행.

2. **클럭 normalize LX7 5.64× M4F 우위** — MLP 128 LX7 25,920 cycles vs M4F 146,240 cycles. **AI 가속은 ISA-specific instruction 폭이 결정타** (LX7 128-bit AI vector `dsps_dp_s8_aes3` > M4F 32-bit SMLAD). clock speed / vendor TOPS 광고가 아니라 instruction set design이 진짜 변수.

3. **3계열 매트릭스 완성으로 Stage 4 칩 선택 가이드 정량 근거 확립**:
   - 응원봉 / wearable / small SLM → ESP32-S3 + ESP-DSP (LX7 +13.4×)
   - **B2B BLE+AI 통합 SoC (KWS / anomaly detection) → nRF52840 + CMSIS-NN (M4F +3.23×)** ⭐ Round 18 신규
   - Mobile T3 응용 → CPU plain `-O2` asimddp (NPU ‒79~421× 손해)
   - 표준 CV → Mobile NPU 적합 (드문 케이스)

**원칙 확립**: **"AI 가속 = ISA-specific instruction 폭 × workload class 매칭 × 메모리 계층"** 3조건 곱 — Round 17 (LX7 +13.4×) + Round 18 (M4F +3.23×) + Round 19 (NPU ‒79~421×) 종합. vendor TOPS 광고는 best-case 기준이고 실제 application class와 다르면 가속이 손해로 뒤집힘. 위시캣 클라이언트 "AI 가속 칩" 요청 시 application class 사전 확인 SOP 필수.

**판단 패턴**: 매 Round 추가 시 가설 1개 정제 + 영업 자산 cascade. Round 17·18·19 3회 cascade로 Stage 4 패키지 영업 카피가 일반론("MCU급 SLM 추론 1초 안") → 정량 매트릭스(application class별 3계열 선택)로 진화. W6 종료 6/29 자산화 이전에 이미 1차 영업 자산 확보.

**다음 cascade**: 위시캣 영업 SOP 갱신 (#13 todo) + 강사양성 Day 5 모듈 비교 사례 (#14 todo) — 본 결정타 데이터 직접 활용.

## 판단 로그 (2026-05-21) — uttechome-claude 8th multi-agent 합류 + 양방향 통신 확립 ⭐

**사건**: uttecHome vault 5/19 분리 후 Phase D `_inbox/` 미도입 상태로 5/15~5/20 동안 onDevice·wishket·lemonlabs 측 신기술·영업 자료 cascading 0건. 5/21 사용자 진단 → 옵션 A megasession.

**해소 정책**:
- uttechome-claude 5/21 8th 합류 (multi-agent 7 → 8 Claude 시스템). 영업 트랙 vault 첫 사례.
- CLAUDE.md send-only → 양방향 (송신 1~4 + 수신 5~8 + 자동 트리거)
- 새 vault 분리 시 `_inbox/` + 양방향 CLAUDE.md를 Phase A/B와 동시 도입 정책 박제 (memory `feedback_uttechome_inbox_required.md`)
- 외부 vault 카드 = 최우선 정책 (5/20) 효과 입증 — uttechome 8th 합류로 cascading 비대칭 해소

**판단 패턴**: vault 분리 시 통신 인프라(_inbox + check-inbox.py)와 정책(양방향 CLAUDE.md)을 동시 도입하지 않으면 N일 cascading 차단 위험. 5일치 5건 자료 미반영 사건 = 구조적 결함. 향후 새 vault 분리 시 본 패턴 반복 차단.

## 판단 로그 (2026-05-21) — Round 17·17.5 ESP-DSP 결정타 4건 ⭐⭐⭐

| # | decision | 근거 | 영향 |
|:-:|---|---|---|
| 1 | **AI FanStick 차세대 양산 방향 재전환 (5/8 잠금 폐기)** — C3 유지 → ESP32-S3-N16R8 + ESP-DSP + PSRAM SLM | Round 17: `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 24.8× | BOM C3 $1.5 → S3 $5~6 (3~4×), K-POP Premium 5~10만원 가격대 수용. 응답 ~150ms 자연스러움 보증 |
| 2 | **차세대 SLM sweet spot ≤ 500KB (SRAM 또는 작은 PSRAM)** | Round 17.5: TF 64 SRAM 10.8× vs TF 484 PSRAM 0.94× — PSRAM 가득 모델은 ESP-DSP 효과 무효 | Korean-Small 154K (~600KB) 적정. 1~5M params 적재는 PSRAM 큰 모델 가속 무효 영역 |
| 3 | **KWS wake word는 ESP-DSP 외 별도 가속 방안 (esp-nn 또는 TFLM esp-nn delegate)** | Round 17.5: CNN conv strided access는 dsps_dp_s8 직접 적용 불가 (im2col 필요) | AI FanStick KWS 트랙은 별도 라이브러리 검토 필요 |
| 4 | **C3 양산 보드에서 ESP-DSP 적용 = 손해, 칩 교체 (C3→S3) 동반 필수** | Round 17.5: esp32wroom 12셀 ansi fallback 1.54× 느림 검증. 함수 호출 + boundary check overhead | 양산 보드 펌웨어 ESP-DSP 적용 시 반드시 LX7 (S3) 동반 |

→ 매칭 패턴: [[2026-05-21_esp-dsp-3조건-매칭]] — LX7 AI Vector Instruction × 메모리 계층 × 접근 패턴 3조건 곱

## 사업 전환 선언 (2026-04-22)

> **기존 LED 조명제어 사업 → AI 3대 사업으로 전환**
> - 원인: 중국 저가 공세 + 국내 인프라 소멸 → 기존 사업 경쟁력 상실
> - 핵심 역량(무선 통신 + 임베디드 + 시스템 통합)은 보존, 적용 시장만 전환
> - 상세: [[2026-04-22_사업전환-AI시대]]

### AI 3대 사업 라인
| # | 사업 | 기존 자산 활용 | 핵심 차별점 |
|---|------|-------------|-----------|
| 1 | **AI 프로그래밍 교육** | 4 Track 커리큘럼, 사전빌드 272개, 영상 30편 | 하드웨어 연동 AI 교육 = 희소 |
| 2 | **AI 스마트팩토리** | 전시회 데모, 센서 웹, 85억 제안서 | 대기업 1/10 가격 + 정부보조금 |
| 3 | **AI 소형 제품** | FanStick 특허, BLE Mesh, 양산 5개 실적 | AI+HW 통합은 SW회사 불가 |

## 나의 현재 포지션

**AI 시대에 하드웨어와 소프트웨어를 연결하는 사업가**

- AI를 활용해 교육, 산업 시스템, 소형 제품을 만드는 회사(UTTEC) 대표
- 하드웨어(물리적 세계)와 소프트웨어(디지털 세계)의 연결점에 위치
- Claude Code를 일상 도구로 활용하여 1인 생산성 극대화
- 5개 양산 제품 운영 실적 + 일본 수출 3,800대 + KC/TELEC/CE 인증 보유

## 대체 위험 분석

### 높은 위험 (AI가 대체할 가능성)
| 영역 | 위험도 | 대응 |
|------|--------|------|
| 단순 웹/앱 개발 | 매우 높음 | Claude가 웹사이트를 거의 혼자 만듦. 하드웨어 연동 차별화 필수 |
| 코딩 문법 교육 | 높음 | "AI와 협업하는 교육"으로 전환 (Python Vibe) |
| 문서/보고서 작성 | 높음 | 이미 AI 활용 중 (위협이 아닌 도구) |
| 데모 사이트 제작 | 높음 | Three.js 3D 데모 25개를 AI가 만들 수 있음 |
| 제안서/지원서 작성 | 중간 | 도메인 전문성 + 양산 실적이 차별화 |

### 낮은 위험 (인간이 여전히 필요)
| 영역 | 이유 |
|------|------|
| 하드웨어 디버깅 | 물리적 제약, 실제 보드 조작, 오실로스코프 |
| 교육 현장 운영 | 학생과의 상호작용, 동기부여, 실시간 대응 |
| 시스템 통합 | 하드웨어 + 소프트웨어 + 네트워크 + 인프라 통합 판단 |
| 양산 품질 관리 | 실제 제품의 물리적 검증, 환경 테스트 |
| 고객 요구사항 파악 | 도메인 이해, 소통, 신뢰 관계 |
| KC/안전 인증 | 규제 대응, 실물 테스트 |

## 증폭 기회 (AI로 10배)

1. **사전빌드 시스템**: AI 프롬프트→펌웨어 코드→자동 빌드→OTA (이미 272개 구현)
2. **교육 콘텐츠 대량 생산**: Remotion+edge-tts로 영상 30편, 100개 예시 코드 하루 만에 완성
3. **프리랜서 생산성**: Claude Code로 제안서+코드+문서 동시 생산
4. **바이브 코딩 교육**: AI 시대의 새로운 교육 방식 선점
5. **영업 자료 자동화**: 데모 사이트 25개, 회사소개서 4종 빠르게 생산

## 유니크 가치 (AI가 대체 불가)

- **하드웨어 + 소프트웨어 수직 통합**: 회로 → 펌웨어 → 서버 → 앱 → 웹 전체 스택
- **5개 양산 제품 운영 실적**: 프로토타입이 아닌 실제 판매 중인 제품
- **교육 현장 경험**: 실제 학생에게 가르친 경험에서 오는 교육 설계 능력
- **도메인 통합력**: IoT + 교육 + AI를 하나의 제품으로 엮는 능력
- **38년 임베디드 경력**: 깊이와 폭에서 AI가 대체 불가

## 학습 우선순위

### 지금 배워야 하는 것
1. AI 에이전트 프레임워크 (Claude Agent SDK 등)
2. MCP 서버 개발 (AI 도구 연동)
3. 온디바이스 AI (Jetson, 엣지 추론)

### 나중에 배워도 되는 것
- 딥러닝 모델 학습/파인튜닝 (도구 활용으로 충분)
- 프론트엔드 프레임워크 최신 트렌드 (AI가 대신 작성)
- Rust (기존 C/C++ + Python으로 충분)

## 전략적 방향 (2026-04-22 재정의)

```
[과거] LED 무선 조명제어 시스템 (BLE Mesh → LoRa)
         ↓  ← 중국 저가 + 인프라 소멸로 전환
[현재] AI 3대 사업 기반 구축
         ↓
[중기] AI 교육 상용화 + 스마트팩토리 첫 고객 확보 + 소형 제품 MVP
         ↓
[장기] "AI + 하드웨어 통합 솔루션" 전문 기업
```

### 기술 진화 연속성
```
LED 무선 제어 (BLE Mesh, 2016~2023)
  → IoT 센서 제어 (LoRa, REVITA, 2024~)
    → AI 예측정비 (스마트팩토리, 2025~)
      → AI 교육 + AI 제품 (2026~)
```
**기술이 바뀐 게 아니라, 적용 시장이 바뀌는 것.**

## 판단 로그

| 날짜 | 판단 | 근거 | 결과 |
|------|------|------|------|
| 2025-12 | Next.js+AWS로 교육 플랫폼 시작 | 온라인 교육 수요 + 기술 역량 | 운영 중 ✅ |
| 2025-12 | Flutter 선택 (BLE 앱) | 크로스 플랫폼, flutter_blue_plus | 표준 정착 ✅ |
| 2026-01 | EasyOCR 표준 엔진 채택 | Tesseract(20%) 대비 90% 인식률 | 완료 ✅ |
| 2026-01 | RPi5 자체 호스팅 전환 | AWS EC2 MFA 문제, 비용 절감 | DO로 재전환 |
| 2026-02 | AI FanStick 블루오션 확인 | 시장에 AI 통합 응원봉 없음 | 특허 출원 ✅ |
| 2026-02 | Claude Code Skill 시스템 정립 | 반복 워크플로우 자동화 | 활용 중 ✅ |
| 2026-03 | Remotion 교육 영상 표준화 | edge-tts + 자동 렌더링 파이프라인 | 30편+ 제작 ✅ |
| 2026-03 | 위시캣 회사명 마스킹 필수 | 페널티 위험 | 적용 중 ✅ |
| 2026-04 | ESP-IDF→Arduino 전환 | 교육 적합성, AI 코드 생성 정확도 | 성공 ✅ |
| 2026-04 | Haiku→Sonnet 전환 | 1차 빌드 성공률 향상 | 성공 ✅ |
| 2026-04 | Kotlin→Flutter 단일화 | 하나의 코드베이스로 생산성 극대화 | 성공 ✅ |
| 2026-04 | 바이브 코딩 교육 시작 | AI가 코드 생성하는 시대, 문법보다 AI 활용 | 진행 중 |
| 2026-04 | 사전빌드 시스템 우선 | 교육 현장 즉시 체험 = 핵심 차별화 | 272개 완료 ✅ |
| 2026-04 | 사전빌드 DB 방식 | 빌드 시간 270초→18초 목표 | 진행 중 |
| 2026-04-19 | Claude Design 발견 | Figma+Claude Code 조합 불필요, Claude Design이 디자인 직접 생성 | 방향 전환 |
| 2026-04-19 | Figma MCP 학습 보류 | Claude Design이 더 간단하고 통합적, Figma는 필요 시에만 | 판단 완료 |
| 2026-04-22 | **LED 사업→AI 3대 사업 전환** | 중국 저가 공세+국내 인프라 소멸로 기존 경쟁력 상실. 핵심 역량은 보존, 시장만 전환 | 전환 선언 |
| 2026-04-22 | AI 교육을 1순위 사업으로 | 기존 자산(커리큘럼, 영상, 사전빌드) 활용 가능, 수익화까지 거리 짧음 | 진행 중 |
| 2026-04-22 | 스마트팩토리를 2순위로 | 영업 주기 길지만 단가 높음, 정부보조금 연계 가능 | 기반 구축 중 |
| 2026-04-22 | AI 소형 제품을 3순위로 | FanStick 특허 확보, 양산 경험 있지만 자금/시간 필요 | MVP 단계 |
| 2026-05-07 | 통신 프로토콜 포팅 사업 라인 가능성 발견 | OOK 두 응용 영역(공중파 + RF feeder in-band) + 4종 양산 통합 → 7종 직접 경험. 위시캣 #155057 [[aisg]] 분석에서 도출 | 검증 중 ([[2026-05-07_OOK-두-응용-영역]]) |
| 2026-05-07 | 위키 영업 자산 발견 워크플로우 시스템화 결정 | 1일 2건(#155057/#155091) 누락 자산 발견 패턴 재현, 다른 도메인에서도 일관 → 도메인-독립적 시스템 결함 입증. /wishket-apply 스킬에 myWiki 선검색 단계 추가 결정 | 시스템 개선 진행 |
| 2026-05-07 | obsidian 시리즈 첫 시범 미포함 결정 (옵션 D) | 시범 Day 4·5는 Track D+E로 8h씩 채워져 시간 충돌 + Track F 미포함 패턴(시나리오 C)과 일관성. 첫 시범은 13가이드 검증 우선. obsidian 시리즈는 별도 단기 모듈(2~3h)로 분리 → 호오컨설팅·인프런·디지털배움터 차별화로 다각 활용. 2차 차수 통합 검토 | 결정 ([[obsidian-시리즈-사업화]]) |
| 2026-05-07 | 3.5-Stage → 4.5-Stage 패키지 확장 (Stage 4 On-Device AI 신설) | 사용자 강점(임베디드 38년 + AI 통합) + 시장 트렌드(Hailo·Jetson·SLM) + microGPT 검증으로 타당성 입증. 단가 1,500만/4주, 매출 5,800만→7,300만(+26%). Stage 0 견적서 옵션 섹션 갱신. 첫 수주 후보: 한국기계 Hailo-8 예측정비 | 결정 ([[uttec-stage-package]]) |
| 2026-05-12 | **위키 ingest 누락 방지 3계층 자동화 패턴 채택** | revitaProject Claude의 SessionStart hook + work-start 강화 + `_remote-cache/`. "수동 절차의 자동 1차 방어선 + 정밀 분류 + 심층 분석 도구" 패턴 → Claude 협업 전반에 적용 가능. myWiki에도 multi-agent `_inbox/` + `check-inbox.py` 같은 패턴으로 확장 (사용자 broker 부담 0) | 가동 중 ([[revita]] / `myWiki/_inbox/PROTOCOL.md`) |
| 2026-05-12 | **원격 모니터링 풀스택 = 사업 라인 발견** | Solar Monitor (RAK4631 + INA219 + LoRa SF12 + Flask + Chart.js + systemd) ↔ [[한림용인cc-고가수조]] (1,000만원 시공 직전) 동일 아키텍처 확인. "센서→LoRa→RPi Flask Web UI→현장 운용"이 농업·양식·산업 시설로 확장 가능 | 실증 진행 중 ([[2026-05-12_원격모니터링-사업라인]]) |
| 2026-05-15 | **제품별 vault 통합 패턴 채택 (3-vault → 2-vault)** | onDevice_AI vault에 구 uttecBizWiki(비즈니스 전용 vault) 흡수 → 한 제품(AI FanStick + Stage 4)의 기술 검증과 비즈니스 운영을 같은 vault에서 일직선 추적. cross-link 비용 단순화. revita 패턴(별도 private repo + multi-agent)을 적용해 ondevice-claude 합류 (3 Claude 시스템). 통합 vault가 검증 모델 — 차후 다른 제품 라인에도 동일 패턴 적용 가능 | 가동 중 ([[onDevice-ai]] / `_inbox/PROTOCOL.md` 합의 이력 5/15) |
| 2026-05-15 | **n8n 표준 = Docker (npm install 비표준화)** | Ubuntu에 npm 글로벌 n8n 설치 시 Node 20 호환 마지막 버전(2.8.4)으로 silent downgrade 발견 → Docker 컨테이너(n8n 2.20.7-exp.0 / Node v24)로 마이그레이션. odroidc2(교육)와 Ubuntu(실전) 둘 다 Docker로 일관성 — 워크플로우 마이그레이션 호환 + Node 격리. 향후 n8n 신규 서버는 무조건 Docker 1순위 | 표준 정착 (`/todo/today/n8n/`, Tailscale 100.90.158.36:5678) |
| 2026-05-17 | **onDevice_AI 1차 mandate 전환 — Phase 1~4 → 보드한계모델 strand** | 옛 "AI FanStick + Stage 4 영업 4 Phase 12 실험"은 검증 자산 흩어짐. 새 "보드한계모델 21셀 측정 (5보드 → 13보드 확장 시 37셀)" 단일 strand로 통합 → 단일 출처 `0_마스터플랜.md v2.0`. 응용·영업은 W6 종료 후 C 단계 분리. Stage 4 영업 자산화 시점 6/29로 명확화 | 진행 중 ([[onDevice-ai]] 78% 진행) |
| 2026-05-17 | **vault scope 결정 — 추론 전용 + synthetic random weights** | 보드한계모델 mandate v2 확정 — weight 의미와 무관, 메모리·연산 envelope만 측정. 학습 0회. 이전 v1 "학습+포팅+추론"은 노이즈. 추론 전용으로 단순화 + 결과 비교 가능성 향상. 13보드 동일 schema 통일 (`pc/` 5+1 분할 양식) | 표준 정착 |
| 2026-05-18 | **응원봉 SLM 최종 권장 사양 확정 (INT8 + ESP-DSP + ~100K)** | 18 PC-only baseline 측정 결과: INT8(FP32 51% 사이즈) + 1s threshold + single-core + **ESP-DSP dotprod**(AVX2 1.8~2.0× 추정) + ~100K params. **Korean-Small 154K 적합 ✅**(esp32s3 SRAM 30%, ESP-DSP 활성 시 300ms). dual-core 효과 1.1× → SIMD 우선. → [[ai-fanstick]] 차세대 BOM 영향 0 (칩 변경 불필요) | 결정 ([[ai-fanstick]] 갱신) |
| 2026-05-19 | **Round 9 발견 — Xtensa LX7 plain C는 ARM 9~38× 느림** ⭐ | esp32s3 메인 타겟 측정 결과 의외 발견: MLP 1024 9~10×, CNN 32 12~25×, TF 484 6.9~38×. 원인: INT8 명시 SIMD intrinsics 미사용 mandate + PSRAM access overhead. 차세대 펌웨어는 ESP-DSP / ESP-DL dotprod 명시 필수. Stage 4 영업 자료에 "Xtensa SIMD 활성 시 N× 가속 보증" 카피 가치 | 결정 ([[onDevice-ai]] Round 9) |
| 2026-05-20 | **Round 10·11 발견 — RISC-V vs Xtensa 동급, PSRAM이 결정타** ⭐⭐ | esp32c6(RISC-V single 160MHz + PSRAM 없음) 측정으로 두 가설 확정: (1) RISC-V plain C는 Xtensa LX7과 클럭 normalize 시 동급(CNN 32 1.5× 우위), (2) **PSRAM 유무가 mandate RAM_safe 셀 결정타** (esp32c6 3 ↔ esp32s3 5 = 60% 격차). → 차세대 BOM 의사결정에서 PSRAM 포함은 모델 크기 한계 직결. AI FanStick + Stage 4 영업 카피 갱신 필요 | 결정 (W6 종합 비교 6/22~28 후 자산화) |
| 2026-05-20 | **inbox lifecycle 정책 박제 — strikethrough = 5단계 완료만 허용** | 5/17~19 onDevice 카드 6장 발송됐으나 mywiki-claude가 lifecycle 5단계 흡수를 한 번도 수행하지 않은 채 작업보고서에 ~~strikethrough~~ 표시만 한 사건 박제. 원인 3건: (1) megasession 4 트랙 동시 진행으로 후순위, (2) strikethrough 의미 혼용, (3) 자동 트리거 부재. 대응: memory `feedback_inbox_lifecycle.md` 신설 + work-start SKILL pending ≥ 5 강제 권고 + raw/ junction 정합성 hook 신설 | 정책 정착 (memory + work-start SKILL) |
| 2026-05-20 | **외부 vault 카드 = 최우선 정책 ⭐** | 사용자 5/20 명시 지시. 외부 vault에서 도착한 카드가 1장이라도 있으면 다음 prompt 디폴트 작업 = 흡수. memory `feedback_inbox_lifecycle.md` 규칙 2 강화 (5장 → 1장 임계치) + work-start SKILL § 1-C 표 갱신. Claude가 "다음 뭐 할까요?" 결정 prompt 시 외부 카드 흡수를 첫 옵션으로 제시 의무. | 정책 정착 (memory + SKILL) |
| 2026-05-20 | **myWiki/raw/ 19 junction 일괄 복구** | schema CLAUDE.md vs 실제 상태 큰 불일치 (raw/onDevice_AI만 존재, 나머지 18 부재). 위시캣·작업보고서·영업·cuda·doctor·smartFactory·tailscale·xerix·webServer·응원봉·notion·유투브·동영상·ffmpeg·skill·전시회·revitaProject·회사소개·multiCore 19개 New-Item Junction으로 일괄 복구. check-raw-junctions.py로 향후 검증. 본 부채는 vault 분리(uttecHome 5/19) + onDevice 5/15 위치 변경 때 누적된 것. | 정합성 복구 완료 |
| 2026-05-20 | **사업 트랙 vault 정립 — 제품·학습·자동화·사업·시험 5축** | wishket-claude(사업 트랙 vault 첫 사례, 5/16 합류) + lemonlabs-claude(창업 트랙, 5/19) 합류로 vault 분류 5축 정립: (1) **제품 트랙** = revita·onDevice·uttecHome, (2) **자동화 트랙** = n8n-uttec, (3) **사업 트랙** = wishket, (4) **창업 트랙** = lemonLabs, (5) **시험 트랙** = shield. 7 Claude multi-agent 시스템. myWikiSetup 시나리오 D 4 사례 누적 (분산 호스트 Windows × 4 + Linux × 2 + RPi × 1) | 7 vault 가동 중 |
| 2026-05-20 | **Tier 3 정부사업 단순화 안 표준 (Node-RED + 양산 BOM 매칭)** | 위시캣 #155360(2.4억·120일·17명 경쟁) 지원 준비에서 정립. 풀스택 외주 ~3,000만 절감 + 양산 5종 BOM = 정부 R&D 정산 양식 95% 일치(17명 경쟁 결정적 차별화) + 일본 BLE Mesh 3,800대 = IoT 인프라 매칭 자산(2회 활용). 향후 ≥5,000만 Tier 3 위시캣 지원 시 본 패턴 재사용. | 표준 정착 (영업전략.md + 건물통합관제플랫폼.md) |
| 2026-05-20 | **분기 정부지원 점검 SOP 신설 (5 채널)** | lemonLabs ingest로 입증된 1.5개월 지연 사업 2건 발견 (3/31 멤버십·3/26 예비창업패키지). 분기 1회 5 채널 sweep(bizinfo·K-Startup·서울시 창업허브·스타트업플러스·혁신의숲) → 활성 vault 4 트랙 매칭 식별 → 폴더 신설 → mywiki 발견 카드 발송. 다음 점검 = 2026-06-22 또는 Q3 시작 7/1. | SOP 정착 (영업전략.md) |
| 2026-05-20 | **shield × n8n 책임 분리 = 시공 자산화 사업 라인 1순위** | shield(RPi hardware 측정) ↔ n8n(자동화 허브) = "측정 책임 vs 통신·기록 책임" 분리 패턴. 한림용인CC 고가수조 8노드(I2C 수위 + LoRa) = UTTEC **턴키 사업 모델 1순위**(시공 + 운영 SLA). n8n MQTT Trigger → Notion DB + Gmail + 시공 D-day. | 사업 라인 확정 (shield + 한림용인CC + n8n-uttec entity) |
| 2026-05-21 | **위시캣 지원서 클라이언트 본문 표준 3개 룰 박제** ⭐ | wishket-claude #155517+#155539 작성 중 사용자 지적 cascade 3건 → 영구 룰화. (1) 클라이언트 본문만 / 내부 메타 표현 금지 (본 vault·wishket-claude·강 매칭·솔직 약점·박제 등 0건), (2) 위시캣·타 프로젝트 번호 마스킹, (3) 솔직 약점 명시 전 사용자 자산 확인. grep 자가 검증 SOP 제출 전 0 hit 필수. wishketProject memory 3건 신설 + myWiki 위시캣활동 entity 박제. | 표준 정착 (wishketProject memory 3건 + [[위시캣활동]] § 5/21 megasession) |
| 2026-05-21 | **본 vault 자산 인덱스 완전성 함정 박제** ⭐⭐ | 5/20 정부 R&D 1억 + 5/21 nRF52832 USB 시리얼 = 2건 연속 사용자 직접 지적으로 자산 누락 발견. 본 vault 자가 검증으로는 완전성 미보장 입증. 회피책: 룰 3 (약점 단정 전 사용자 confirm) + work-end 정기 자산 점검 SOP 신설 권장 + wishket-apply 스킬에 사용자 confirm 단계 검토. 강사양성·obsidian 시리즈 강의 직접 자산. | 함정 박제 ([[gaps]] § 자산 인덱스 완전성 + [[2026-05-21_자산-인덱스-완전성-함정]] thought) |
| 2026-05-21 | **search vault 9th Tier 3 분리 + Claude Max CLI subprocess 패턴** ⭐ | myWiki second-brain 위 prompt-driven 검색·정리·요약 web 서비스 vault 신설 (`C:/todo/search/`). **사용자 노출 트랙 vault 첫 사례** (제품 5 + 사업 1 + 창업 1 + 영업 1 + 노출 1 = 9 vault / 9 Claude). FastAPI + React + Vite + Tailwind. **Anthropic SDK API key 폐기 → `claude --print` subprocess (Max OAuth) 패턴** — 다른 vault backend 도 동일 패턴 재사용 가능. junction 루프 버그 → `.gitignore raw/` 차단 박제. | 9 vault 가동 ([[search]] + search/_inbox/PROTOCOL.md) |
| 2026-05-22 | **search ↔ today 메모리 공유 정책 예외** | 다른 4-vault 메모리 격리 정책과 다른 예외. `~/.claude/projects/C--todo-search/memory/` → `today/.claude/memory/` junction. 사용자 의도: search vault 가 today 와 거의 동일한 수준의 web service 로 운영되도록 비교 가능. 글로벌 룰 (사용자 본명·위시캣·5-vault·Notion 정책) 공유. search 측 `setup-memory-sync.py` (idempotent) + vault-start Step V0 자동 검증. | 정책 정착 ([[search]] § 메모리 공유) |
| 2026-05-22 | **Mobile NPU NNAPI 불사용 — Stage 4 칩 선택 결정타** ⭐⭐⭐ | Galaxy A51 5G Eden NPU 측정: plain INT8 MLP 128~16384 전 범위에서 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**. "Mobile NPU 항상 빠르다" 통념 정량 반증. Stage 4 패키지 mobile NPU 적극 제안 X — MCU 가속 (ESP-DSP / CMSIS-NN) 매트릭스로 영업 전개. 본 vault skeleton (mlp/cnn/transformer + batch=1 + plain INT8) application class 정의: ✅ MCU 가속 5~25× / ⚠️ Mobile NPU 손해 / ✅ CPU SIMD (NDK clang `-O2` asimddp). | 결정 ([[onDevice-ai]] / [[ai-fanstick]] / [[uttec-stage-package]] 영업 메시지 + [[2026-05-22_npu-vendor-광고-실측-격차]] thought) |
| 2026-05-22 | **Vendor 광고 vs 실측 격차 — 벤치마크 우선 원칙** | Round 19 NNAPI 79~421× 손해는 매칭 패턴 결정타 사례. Samsung Eden NPU 2.1 TOPS 광고 vs plain INT8 small dense layer 실측 손해. 일반화: vendor 광고 = best-case 기준 → application class 다르면 손해로 뒤집힘. 적용: 위시캣 영업 NPU 요청 시 application class 사전 확인 / 강사양성 Day 5 비교 사례 / REVITA 모바일 응용 검토. | 원칙 박제 ([[2026-05-22_npu-vendor-광고-실측-격차]] thought) |

## 위시캣 시장 인사이트

### 시장 현실
- 위시캣은 웹/앱/디자인/PM 프로젝트가 대다수
- 임베디드/IoT/펌웨어는 소수 (전체의 5% 미만 추정)
- 매칭 프로젝트 출현 빈도: 주 0~2건
- 2~4월간 328건+ 검토, 16건+ 지원

### 차별화 전략
- "38년 경력 + 5개 양산 제품" = 핵심 브랜딩
- HW+SW 통합 역량 (회로 25년 + 펌웨어 38년)
- 삼성전자/파나소닉 대기업 경력 → 신뢰성
- 라이브 포트폴리오 URL (uttec-sensor.duckdns.org)

### 지원서 진화
- 2월: 단순 스킬 매칭
- 3월: 시스템 아키텍처 다이어그램, 매칭률 테이블 도입
- 4월: 갭 분석 포함, 정직한 약점 인정 + 학습 계획

## 관련 페이지
- [[me]]: 나는 누구인가
- [[ai-landscape]]: AI 기술 지형도
- [[skills]]: 현재 보유 기술
- [[goals]]: 목표와 방향
- [[strengths]]: 강점 분석
- [[gaps]]: 부족한 부분
