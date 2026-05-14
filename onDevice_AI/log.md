# onDevice AI 검증 vault — log

본 vault의 시간순 작업 기록.

---

## [2026-05-15] hiring | 0_인재상.md 신설 — 담당자 채용·평가·자가진단 단일 출처

- 신설: `0_인재상.md` v1.0 (~420줄, 12 섹션)
  - **§0 Executive Summary** — 핵심 한 줄: "임베디드↔ML 경계를 즐기는 미드레벨, 측정·문서·AI협업 규율"
  - **§1 역할 맥락** — 담당자가 하는 일(7건)·안 하는 일(4건)·협업 모델(Claude 매일·감독 주간)
  - **§2 3-Tier 기술 요건** — Tier 1 절대(C/C++·MCU 1종·Linux·Python·Git) / Tier 2 강력 권장(ML·양자화·SDK·AI도구) / Tier 3 nice-to-have(TFLM·CMSIS-NN·ESP-DL·llama.cpp 등)
  - **§3 페르소나 3종** — A 펌웨어 강점+ML 학습형 / B ML 강점+펌웨어 학습형 / C 풀스택. 우선순위 A≥B>C (가용성·정지선)
  - **§4 마인드셋 6** — 가설 기반·SSOT·정량 측정·**AI 협업 핵심**·정지선 존중·영업 가치 인식
  - **§5 Red flags 8** — 양산 욕구·문서 기피·AI 도구 거부·GUI만·"PoC 빠르게" 등
  - **§6 평가 체크리스트 80점** — 기술 면접 30 + 코딩 과제 30 + 가치 정합성 20. 합격선 ≥65/80.
  - **§7 onboarding 학습 곡선** — A/B/C 페르소나별 첫 주~Week 4+ 분기
  - **§8 운영 조건** — 원격 OK, 풀타임 권장, 5개월 계약, Stage 4 수주 인센티브 제안
  - **§9 모집 채널** — UTTEC 강사양성 출신 1순위, 위시캣·임베디드 커뮤니티 2순위
  - **§10 자가 진단 체크리스트 15항** — 후보자 본인 적합도 측정 (체크 ≥10 → 지원 검토)
- 동기: 사용자 요청 — "이 vault 진행에 적합한 인재의 기능 정리". 실험계획서 §11(책임 분담) "담당자"의 구체화.
- 핵심 발견 (vault 운영 관점):
  - **AI 협업이 차별 요소** — 후보자가 Claude/Copilot 일상 사용 여부가 본 vault 효율 50% 결정
  - **정지선 정합성 면담 필수** — 양산 욕구 강한 후보는 Phase 4 종료에 좌절. 사전 합의 필요.
  - **페르소나 A 우선** — 펌웨어 인재가 ML 학습하는 게, ML 인재가 펌웨어 학습하는 것보다 본 vault scope에 가까움 (E1~E7 비중)
- 활성 참조 갱신 3건:
  - `README.md` 폴더 구조에 0_인재상 추가
  - `00_검토순서.md` ⑤-b 신설 (채용·합류 시 정독), total 27→28
  - `0_실험계획서.md` §11 책임 분담에 인재상 link 추가
  - `log.md` 본 항목

---

## [2026-05-15] plan | 0_실험계획서.md (Master Plan) 신설 — 12 실험 + 4 Phase + 담당자 onboarding

- 신설: `0_실험계획서.md` v1.0 (~580줄, 15 섹션)
  - **§1~5** 배경·목적·가설(H1~H7)·범위·자원 — 왜 이걸 하는가
  - **§6 응용 카탈로그 10건** (A1~A10) — KWS·microGPT 4K/154K·AI FanStick SLM·센서·이상탐지·제스처·이미지·복합·미드폰 LLM
  - **§7 실험 12 단위 (E1~E12)** — 각 실험 8 항목(목적·가설·입력·절차·측정·성공기준·결과물·의존성·시간) 동일 schema
  - **§8 Phase 1~4 + 정지선** — Phase 5 양산은 ⛔ 유지
  - **§9 KPI** 정량(매트릭스 ✅ ≥12셀, demo ≥3건) + 정성(영업·강의·entity·수주 시도)
  - **§10 위험·완화 7건** — 분석≠실측 / 담당자 학습 / 양산 욕구 / 정확도 / 보드 결함 / 비용 / 시장변곡
  - **§11 책임 분담** — 담당자 / Claude / 감독(홍광선)
  - **§12 담당자 첫 주 가이드 (Day 1~7)** — onboarding 1주일 압축
  - **§13 결과 활용** — vault → 영업/Stage4 → entities → 강사양성 → 수주
- 동기: 사용자 요청 — "모든 application 감안한 실험계획서, 실제 담당자가 받아서 이해·진행 가능 수준". 정의·hardware·matrix 위에 실행층 추가.
- 기존 `0_검증계획.md` 와 관계: 본 문서가 master, 0_검증계획.md는 sub-plan (microGPT+AI FanStick 한정)으로 격하. scope 확장 흡수.
- 활성 참조 갱신 3건:
  - `README.md` 폴더 구조에 0_실험계획서 추가, 시작점 7단계 재정렬
  - `00_검토순서.md` ⑤를 0_실험계획서로 교체 (0_검증계획은 ⑤-prev로 보존), total 26→27
  - `log.md` 본 항목
- 다음 단계 (담당자 또는 본 세션에서):
  - (a) E9 환경 셋업 — Ubuntu에서 ESP-IDF + microGPT 학습 파이프라인
  - (b) E1 미니 실행 — esp32s3 hello_world + 가용 RAM 측정
  - (c) `applications/` 폴더 신설 — A1~A10 카탈로그 상세 (Phase 2 진입 시점)

---

## [2026-05-15] inventory | 7개 보드·디바이스 보유 ✅ 확인 + 실제 사양 반영

- 보드 5종 보유 확인 → 모든 `00_spec.md` 의 "사용자 보유" 항목 ✅ 갱신 (pca10040·pca10056·esp32wroom·esp32c6·esp32s3)
- **pc/00_spec.md 재작성** (실측 사양):
  - Machine A (Windows): Lenovo 21E7S31000, **i5-1235U** (10c/12t), 16GB RAM, Win11 Pro 26200, Iris Xe iGPU, NPU 없음
  - Machine B (Ubuntu, `ssh ubuntu`): **MacBookPro11,4** (2015 15" Mid), **i7-4770HQ** (4c/8t Haswell), 16GB RAM, **Ubuntu 22.04.5 LTS**, Iris Pro 5200, 2026-05-14 Mac→Ubuntu 컨버전
  - 결론: 둘 다 GPU 약함 → 큰 모델 학습은 외부 클라우드 위탁 필요. Ubuntu는 빌드·toolchain 표준 환경.
- **smartphone/00_spec.md 재작성** (USB 검출):
  - **Samsung Galaxy A51 5G (SM-A516)**, 2020 출시 **미드레인지**
  - SoC: Exynos 980 (8nm), **NPU 2.1 TOPS** (플래그십 30~80 TOPS의 1/15~1/40)
  - **RAM 6GB**, Android 10→13
  - 가능 응용: TinyLlama 1.1B Q4 borderline, 3B+ 불가, KWS·MobileNet OK
  - 의미: "현실 사용자 폰" 한계 검증의 가치 — 플래그십 가정 응용은 차단됨을 명시
- 활성 참조 갱신 3건:
  - `hardware/_README.md` 비교표에 "보유 ✅" 컬럼 추가 + smartphone/pc 사양 실제값으로 갱신
  - `hardware/_README.md` 시작점에 "모든 보드 보유, 즉시 실측 가능" + 5단계 우선순위
  - `hardware/_matrix.md` 갱신 로그에 inventory 확인 + smartphone 가정 → 실측 갱신
- 의미: vault가 **분석 단계 → 실측 단계로 전환 가능**. esp32s3 보드 + Ubuntu 빌드 환경 모두 준비됨.

---

## [2026-05-15] structure | hardware/ 폴더 신설 — 7개 보드 1차 축 운영 시작

- 신설 폴더: `hardware/` (9 파일, ~700줄)
  - `_README.md` — 7개 보드 한눈 비교표 + 폴더 schema 표준 (00_spec → 05_pitfalls + results/)
  - `_matrix.md` — 보드 × 응용 cross-matrix (단일 출처, ✅/⚙️/⬜/❓/❌/— 6 기호)
  - `pca10040/00_spec.md` — Cortex-M4F 64KB nRF52832 DK (이전 메시지 Cortex-M0 정보 정정)
  - `pca10056/00_spec.md` — Cortex-M4F 256KB nRF52840 DK + BLE5/USB/NFC
  - `esp32wroom/00_spec.md` — ESP32 baseline (가속 없음 비교군)
  - `esp32c6/00_spec.md` — RISC-V + WiFi 6 + Matter (차세대 IoT)
  - `esp32s3/00_spec.md` — **메인 타겟** (AI SIMD vector + PSRAM 8MB)
  - `smartphone/00_spec.md` — T3 reference (응용 발굴)
  - `pc/00_spec.md` — T4 학습·증류·시뮬레이션 환경
- 결정: hardware-first hybrid (1차 축=보드, 2차 축=응용, cross=matrix). 보드별 메모리 차수 6 (64KB~16GB)로 칩이 가능성을 결정하므로 자연스러운 단위.
- 운영 규칙: 보드 폴더에는 비교표 두지 말 것 → `_matrix.md` 1곳에만. microGPT·aiFanStick은 실험·제품 단위라 유지 (hardware 축과 직교).
- 활성 참조 갱신 3건:
  - `README.md` 폴더 구조 + 시작점 (2 hardware 항목 추가)
  - `00_검토순서.md` total_files 17→26, L1.5 Hardware Spec 레벨 신설 (⑤-a ⑤-b ⑤-c ⭐)
  - `log.md` 본 항목
- 다음 단계: 보드 입수 후 각 폴더에 01_baseline → 02_model_limits → 03_inference_bench 순차 채움.

---

## [2026-05-15] foundation | 00_정의_OnDeviceAI.md 신설 — vault 헌법 등록

- 신설: `00_정의_OnDeviceAI.md` (~150줄, 10 섹션)
  - 1 한 줄 정의 / 2 Cloud vs On-Device 대비 / 3 기술적 본질 (양자화·프루닝·증류·NPU) / 4 4대 가치 (Privacy·Latency·Offline·Cost)
  - 5 스펙트럼 T1~T4 (본 vault는 T1 MCU급에 집중) / 6 연구 5축 15 질문 / 7 우선순위 (현재 응용 Q7·모델 Q1·양자화 Q10)
  - 8 갱신 이력 / 9 정의가 흔들릴 조건 (가격·알고리즘·시장·법규) / 10 참조
- 동기: 사용자 요청 — "앞으로 onDevice 연구를 지속해야 하니 정의를 바탕으로 방향을 정리하자". 정의 없이 검증만 누적하면 가설이 산만해짐.
- 활성 참조 갱신 2건:
  - `README.md` 폴더 구조 + 시작점 1번 항목 (정의 먼저 → 검증 계획)
  - `00_검토순서.md` total_files 16→17, L0 4→5 파일, ⓪ 항목 신설 (헌법 마크 ⭐⭐)
- 결과: 본 vault 모든 신규 검증은 정의 Section 6의 5축 15 질문 중 어느 것에 답하는지 명시해야 함 (가설 추적성 확보).

---

## [2026-05-10] structure | aiOnDevice/ 4 파일 → 시장조사/ 통합 이동

- 이동: `today/aiOnDevice/` → `today/onDevice_AI/시장조사/` (4 파일, git mv로 이력 보존)
  - README.md (On-Device AI 11섹션 종합)
  - humanoid.md / sdv.md / federated-learning.md (응용 영역 분석 3종)
- 동기: 통합 관리. 5/5 시장 조사가 5/7 검증 vault의 트리거였으므로 한 우산 아래로 묶어야 cross-link이 깔끔해짐.
- 활성 참조 갱신 6건:
  - `시장조사/sdv.md`, `humanoid.md`, `federated-learning.md` frontmatter (links/parent)
  - `.claude/skills/wishket-check/SKILL.md` (line 234, On-Device 분석 자료 경로)
  - `aiStudy/introductionAi/14_On-Device_AI.md` (4 reference 링크)
  - `작업보고서/temp/microGPT_초보자_가이드.md` (UTTEC 내부 자료 경로)
- 보존(이력 정확성): `작업보고서/2026-05-05_작업보고서.md`, `myWiki/log.md` 5/5~5/6 entry, `유투브/` 요약 — 과거 시점 기록은 그대로.
- 폴더 schema 갱신: `README.md` 폴더 트리 + `CLAUDE.md` 폴더 명명 규칙

---

## [2026-05-07 17:30] start | vault 신설 — 작업보고서 #18·#23 + Notion #21 통합

- 통합 대상:
  - 작업보고서 #18 microGPT 직접 실행 테스트 (Karpathy 200줄 GPT, ESP32-S3 탑재)
  - Notion #21 AI FanStick 다음 버전 SLM 통합 검토 (ESP32-S3 + hello_world)
  - 작업보고서 #23 UTTEC 사업용 새 vault 시작 (3_soloBizWiki 템플릿)
- 산출:
  - vault 8 파일 (`onDevice_AI/` 폴더)
  - myWiki entity 신설 (예정)
  - 작업보고서 항목 통합 의미 갱신 (예정)
- 핵심 결론: **3 항목이 같은 ESP32-S3 + On-Device AI 검증 사이클이라는 깨달음.** microGPT 4,192 파라미터 = ESP32-S3 SRAM 520KB의 1% 미만 사용 → AI FanStick "외부 인터넷 0% 카피" 검증 가능 → Stage 4 (1,500만) 영업 패키지의 기술 근거 자료가 됨.
- 다음 액션:
  1. Phase 1A — microGPT PC 직접 실행 (즉시 가능, 1~2시간)
  2. ESP32-S3 보드 입수 (사용자 직접, 1~2주)
  3. Phase 2 — ESP32-S3 hello_world + 포팅 검증 (보드 도착 후)

---

## [2026-05-08 07:20~07:50] Phase 1A·1B 완료 + 시뮬레이션 매트릭스 + 외부 동기화

- 산출:
  - `microGPT/karpathy_원본/train.py` (Karpathy Gist 다운로드, 199줄, 9.3KB)
  - `microGPT/karpathy_원본/inference_bench.py` (PC 추론 시간 벤치마크)
  - `microGPT/01_검증절차.md` Step 1~5 결과 영역 모두 채움
  - `통합검증/01_SRAM_파라미터_매트릭스.md` Phase 1 결과 + 모델 확장 시뮬레이션 + 권장 모델 결정 갱신
  - 외부 영업 자산 동기화 4곳 (Stage4_OnDeviceAI_검토 / uttecBizWiki AI_FanStick / myWiki onDevice-ai / README)
- 핵심 측정 (Phase 1A: PC 직접 실행):
  - 의존성 0 검증 ✓ (os, math, random, urllib만)
  - 학습: 1000 step, Loss 3.37 → 2.65 (-21%, ~3~4분 Windows Python 3.13)
  - 추론: 20 영문 이름 샘플 (anna, lara, anton 등 — 영문 이름 패턴 학습)
  - 파라미터 실측: **4,192** (가이드 일치)
  - PC 추론 (랜덤 가중치 벤치): **token당 0.510 ms / sample(16t) 8.16 ms**
- 핵심 분석 (Phase 1B: 포팅 가능성):
  - 메모리: FP32 16.4KB / INT8 4.1KB / INT4 2.0KB → ESP32-S3 SRAM 520KB의 0.39~3.15%
  - 연산: token당 ~4,000 FLOPS → ESP32-S3 추정 0.5~5 ms (FP32) / 0.1~1 ms (INT8 SIMD)
  - C++ 변환: 약 500~700줄 (ESP-DSP dotprod 활용 시), 1~2주 1인 작업
  - 결론: **포팅 가능 (압도적 여유)**, Phase 2 즉시 진행 권장
- 모델 확장 시뮬레이션 (D):
  - 파라미터 공식: `(2·vocab + block) × n_embd + n_layer × 12 × n_embd²`
  - **Korean-Small 권장**: vocab=2000, block=64, n_embd=32, n_layer=2 → 154,624 params, INT8 155KB (SRAM 29.7%)
  - AI FanStick 차세대 = Korean-Small (한국어 짧은 응원 응답), 칩 변경 불필요
- 영업 임팩트:
  - Stage 4 패키지 시나리오 C (임베디드 신생기업) 실증 데이터 1건 확보
  - "다른 강사·외주는 보드 검증 없이 제안만 / UTTEC는 PC PoC 보유" 차별화 활용 가능
- 다음 액션:
  1. ESP32-S3-DevKit-C-1 보드 1~2개 구매 (1~2만원)
  2. 보드 도착 후 Phase 2: hello_world (5분) → microGPT C++ 포팅 (1~2주)
  3. Korean-Small 학습 (한국어 응원 도메인 데이터셋 수집 + fine-tune)
  4. 검증 완료 후: 강사양성 Day 5 사례 / 호오컨설팅 강연 / 첫 Stage 4 수주 시도

---

## [2026-05-08 08:20~08:50] AI FanStick 용도별 학습 시나리오 검토 (학습설계 폴더 신설)

- 트리거: 사용자 요청 — "AI FanStick 용도로 학습 검토, 응원봉 폴더 검토 후 적당한 폴더에 결과 추가"
- 입력 자료 검토:
  - `응원봉/newMvp/온디바이스_AI_검토서.md` (2026-02-27, 폰 Gemma 2B 가정)
  - `응원봉/시스템_전체_Flow_설명서.md` (2026-04-20, 클라우드 운영 중)
  - `응원봉/mic/AI_응원봉_킬러앱_제안서.md` (2026-02-12, 5 킬러 기능)
  - `응원봉/mvp_vs_newMvp_비교_설명서.md` (mvp 분리형 vs 통합형)
- 산출 (`aiFanStick_차세대/학습설계/` 신설, 5 파일):
  - `00_README.md` — 폴더 개요
  - `01_용도분석_갭.md` — 응원봉 5 카테고리 음성 명령 + 검증과의 갭 5개
  - `02_학습시나리오_4경로.md` — 경로 A·B·C·D 비교
  - `03_데이터셋_설계.md` — 한국어 콘서트 QA 데이터셋 명세 (500~2000쌍)
  - `04_권장_로드맵.md` — Phase 1~5 단계적 채택 권장
- 핵심 결론:
  - **경로 C (클라우드, 현재) 유지** + **경로 D (응원봉 자체 SLM, 154K params Korean-Small) 검증 진행** 권장
  - 경로 A (응원봉 단독 STT) 비현실적 → 비채택
  - 경로 B (폰 Gemma 2B + LoRA) 중기 (Phase 5, 6~12개월 후) 추가
  - Stage 4 영업 차별화 핵심 = 경로 D "외부 인터넷 0% 응원봉 GPT" 카피
  - 데이터셋 1,000쌍은 ChatGPT 합성 70% + 사용자 검수 30% (~1~2주)
- 다음 액션:
  1. ESP32-S3-DevKit-C-1 1~2개 구매 (1~2만원)
  2. 데이터셋 수집 시작 (Phase 2와 병렬 가능, ChatGPT 합성)
  3. Phase 2 시작 (보드 도착 후 hello_world + microGPT Tiny C++ 포팅)
  4. Phase 3 (Korean-Small 학습·탑재) → 1차 응원봉 SLM 검증

---

## [2026-05-08 09:00] vault-end | 정지선 인지 + 학습설계 정합성 갱신 + ESP32-S3 vs nRF52840 비교

- 트리거: 사용자 vault-end 호출. 사용자가 직접 작성한 myWiki thoughts 2건 인지:
  - `2026-05-08_응원봉-온디바이스AI-정지선.md` (Phase 2 종료 = 정지선)
  - `2026-05-08_onDevice-AI-확장영역.md` (확장 트랙: 응원봉 부분 통합 5종 + 외 분야 3개)
  - 1차 자료 `응원봉/마케팅검토/` 폴더 신설 (사용자 직접)
- 추가 산출:
  - `aiFanStick_차세대/학습설계/04_권장_로드맵.md` 정지선 반영 (Phase 3+ ⛔ 명시, 결론 한 페이지 갱신)
  - `README.md` 진행 상태 표 정지선 분리 표기
- 채팅 답변 (vault 비기록): ESP32-S3 vs nRF52840 성능 비교
  - ESP32-S3: 240MHz 듀얼 + 512KB SRAM + AI 가속, AI 통합·PoC 트랙 우위
  - nRF52840: 64MHz M4F + 256KB SRAM + 저전력·BLE LR + Matter, BLE 양산 우위
  - 결론: 본 vault (PR/B2B) = ESP32-S3 / 응원봉 양산 = nRF52840 검토 가치 있음
- 이번 세션 종합 (5/8 07:20 ~ 09:00, 약 1시간 40분):
  - Phase 1A·1B 검증 완료 (microGPT 4192 params, INT8 4.1KB, 추론 0.51ms PC)
  - 모델 확장 시뮬레이션 (Korean-Small 154K)
  - 학습설계 폴더 신설 5 파일 (4 경로 비교 + 데이터셋 + 로드맵)
  - 외부 자산 동기화 5곳 (사용자 직접 갱신과 합쳐 myWiki·uttecBizWiki·영업)
  - 정지선 반영 (사용자 의사결정에 vault 정렬)
- 다음 액션:
  1. ESP32-S3-DevKit-C-1 1~2개 구매 (Phase 2 시작 조건)
  2. Phase 2 = "보드 1대 hello_world + microGPT Tiny C++ 포팅 (1주, PR/시연용)" 만 진행
  3. PR 영상 1편 시나리오 작성 (정지선 후속 액션 체크리스트)
  4. 영업/Stage4_OnDeviceAI_검토.md 응원봉 사례 카드 1 섹션 추가 (사용자 동의 시)
  5. 변리사 미팅 트리거 (특허 보강 — On-Device AI 별건 청구항)

---

(이후 작업 진행 시 시간순 추가)
