# onDevice AI 검증 vault — log

본 vault의 시간순 작업 기록.

---

## [2026-05-07 17:30] start | vault 신설 — 작업보고서 #18·#23 + Notion #21 통합

- 통합 대상:
  - 작업보고서 #18 microGPT 직접 실행 테스트 (Karpathy 200줄 GPT, ESP32-S3 탑재)
  - Notion #21 AI FanStick 다음 버전 SLM 통합 검토 (ESP32-S3 + hello_world)
  - 작업보고서 #23 UTTEC 사업용 새 vault 시작 (3_soloBizWiki 템플릿)
- 산출:
  - vault 8 파일 (`onDevice_AI_검증/` 폴더)
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
  - 외부 영업 자산 동기화 4곳 (Stage4_OnDeviceAI_검토 / uttecBizWiki AI_FanStick / myWiki onDevice-ai-검증 / README)
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
