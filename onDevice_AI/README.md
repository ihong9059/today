# onDevice AI 검증 vault

## 한 줄 정의

**ESP32-S3 + On-Device AI 통합 검증 vault**. AI FanStick 차세대 + microGPT(Karpathy 200줄)를 같은 보드에서 검증하여 Stage 4 (On-Device AI 1,500만) 영업 패키지의 기술 근거 확보.

## 통합 의미

3개 작업 항목을 하나의 검증 사이클로 통합:

| 출처 | 본질 |
|---|---|
| 작업보고서 #18 microGPT 직접 실행 테스트 | **검증 1**: Karpathy 200줄 GPT를 ESP32-S3에 탑재 |
| Notion #21 AI FanStick 다음 버전 SLM 통합 | **검증 2**: AI FanStick에 SLM 4K~10K 파라미터 탑재 |
| 작업보고서 #23 UTTEC 사업용 새 vault | **운영 형태**: 본 vault 자체 |

→ "**microGPT가 ESP32-S3에 실제 탑재 가능 = AI FanStick 외부 인터넷 0% 카피 검증 가능**"
   (myWiki log.md 2026-05-06 인사이트)

## 폴더 구조

```
onDevice_AI/
├── README.md                       ← 네비게이션 (이 파일)
├── CLAUDE.md                       ← Claude를 위한 schema
├── 00_정의_OnDeviceAI.md           ← **본 vault 헌법** (정의 + 연구 5축 + 우선순위)
├── 00_검토순서.md                  ← 신규 협업자를 위한 reading order
├── 0_실험계획서.md                 ← ⭐ **Master Plan** (12 실험 + 4 Phase + 담당자 onboarding)
├── 0_인재상.md                     ← 담당자 채용·평가·자가진단 (페르소나 3종 + 체크리스트)
├── 0_검증계획.md                   ← (선행) microGPT + AI FanStick 한정 sub-plan
├── log.md                          ← 시간순 작업 기록
│
├── hardware/                       ← **보드별 spec·실측·한계** (5/15 신설, 1차 축)
│   ├── _README.md                  ← 7개 보드 한눈 비교 + schema 표준
│   ├── _matrix.md                  ← 보드 × 응용 cross-matrix (single source)
│   ├── pca10040/00_spec.md         ← Nordic nRF52832 DK (64KB)
│   ├── pca10056/00_spec.md         ← Nordic nRF52840 DK (256KB, BLE5/USB/NFC)
│   ├── esp32wroom/00_spec.md       ← ESP32 baseline (가속 없음 비교군)
│   ├── esp32c6/00_spec.md          ← RISC-V + WiFi6 + Matter
│   ├── esp32s3/00_spec.md          ← **메인 타겟** (AI SIMD + PSRAM 8MB)
│   ├── smartphone/00_spec.md       ← T3 reference (응용 발굴)
│   └── pc/00_spec.md               ← T4 학습·증류·시뮬레이션 환경
│
├── 시장조사/                       ← 산업 동향·시장 규모 분석 (5/10 통합, 구 aiOnDevice/)
│   ├── README.md                   ← On-Device AI 11섹션 종합 (모델·HW·시장)
│   ├── humanoid.md                 ← 휴머노이드 양산 진입 (NVIDIA/Hyundai/Tesla 등)
│   ├── sdv.md                      ← 차량 SDV ECU 통합 (Drive Thor / Snapdragon Ride)
│   └── federated-learning.md       ← Federated Learning 양산 진입 (Apple/Google/NVIDIA)
│
├── microGPT/                       ← Karpathy 200줄 GPT 검증 (실험 단위, hardware 축과 직교)
│   └── 01_검증절차.md
│
├── aiFanStick_차세대/              ← AI FanStick + SLM 통합 검증 (제품 단위, hardware 축과 직교)
│   ├── 01_검증절차.md
│   └── 학습설계/                   ← AI FanStick 용도별 학습 시나리오 (5/8 신설)
│       ├── 00_README.md
│       ├── 01_용도분석_갭.md
│       ├── 02_학습시나리오_4경로.md
│       ├── 03_데이터셋_설계.md
│       └── 04_권장_로드맵.md
│
└── 통합검증/                       ← 두 검증의 교집합 (hardware/_matrix.md로 일부 흡수 예정)
    ├── 01_SRAM_파라미터_매트릭스.md
    └── 02_Stage4_영업매핑.md
```

## 진행 상태

> **⚠️ 마케팅 정지선 (2026-05-08)**: 본 vault는 **PR·B2B 영업·강의 트랙 한정**. Phase 2 종료까지만 진행. Phase 3+ 양산 적용은 ⛔. 근거: `myWiki/.../thoughts/2026-05-08_응원봉-온디바이스AI-정지선.md`.

| 항목 | 상태 |
|---|:-:|
| vault 골격 작성 (5/7) | ✅ 완료 |
| microGPT 직접 실행 (PC) | ✅ 완료 (5/8, Loss 3.37→2.65, 4192 params) |
| microGPT 포팅 가능성 분석 | ✅ 완료 (5/8, FP32 16.4KB / INT8 4.1KB) |
| 모델 확장 시뮬레이션 (Korean-Small) | ✅ 완료 (5/8, 154K INT8 — 분석 한정) |
| AI FanStick 학습 시나리오 4 경로 검토 | ✅ 완료 (5/8, 학습설계/ 5 파일, 정지선 반영) |
| ESP32-S3 보드 입수 | ⬜ 대기 (사용자 직접) |
| ESP32-S3 hello_world | ⬜ 대기 (Phase 2, 보드 도착 후) |
| microGPT Tiny C++ 포팅 (PR 시연용) | ⬜ 대기 (Phase 2) |
| Stage 4 영업 자료 반영 | ✅ 1차 동기화 완료 (5/8) |
| ━━━━━━ Phase 2 종료 = 정지선 ━━━━━━ | |
| Korean-Small 양산 적용 | ⛔ 정지 |
| 양산 응원봉 칩 교체 (C3 → S3-N16R8) | ⛔ 정지 |
| 양산 펌웨어 SLM 통합 | ⛔ 정지 |

## 시작점

> **담당자 onboarding은 `0_실험계획서.md` §12 (첫 주 가이드) 한 곳에 통합됨.** 아래는 일반 검토 순서.

1. **정의**: `00_정의_OnDeviceAI.md` (본 vault 모든 검증의 출발점)
2. **실험계획서**: `0_실험계획서.md` (12 실험 + 4 Phase + 담당자 가이드) ⭐
3. **보드 능력 확인**: `hardware/_README.md` + `hardware/_matrix.md`
4. **메인 타겟**: `hardware/esp32s3/00_spec.md`
5. **PC 학습 (보드 없이)**: `microGPT/01_검증절차.md` Step 1~3
6. **(선행) 검증 계획**: `0_검증계획.md` (microGPT + AI FanStick 한정)
7. **제품 검증**: `aiFanStick_차세대/01_검증절차.md`

## 관련 vault (3-vault 구조)

| vault | 역할 | 본 vault와의 관계 |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구 통합 second-brain | entity로 추적 (`onDevice-ai.md`) |
| **`uttecBizWiki/`** | **사업 운영 (영업·매출·고객)** | **본 vault 검증 결과를 비즈니스로 흐름** |
| `onDevice_AI/` (본 vault) | 기술 검증 단기 프로젝트 | 검증 종료 후 archive |

### cross-link 흐름

```
[onDevice_AI] (본 vault)
  Phase 1·2·3 검증 완료
       ↓ 실측 데이터 (SRAM·시간·BOM)
       ↓
[uttecBizWiki/entities/AI_FanStick.md]
  비즈니스 갱신 (기술 근거 섹션)
       ↓
[Stage 4 영업 자료 갱신] (영업/Stage4_OnDeviceAI_검토.md)
       ↓
[첫 Stage 4 수주 시도] (한국기계 / 임베디드 스타트업)
       ↑ 영업 요구사항
       ↑
[onDevice_AI] 다음 검증 사이클
```

## 관련 자료

- 6편 시리즈 — `obsidian/` (배경 지식)
- microGPT 초보자 가이드 — `작업보고서/temp/microGPT_초보자_가이드.md` (이미 작성, 11 섹션)
- Stage 4 검토 — `영업/Stage4_OnDeviceAI_검토.md` (영업 매핑)
- myWiki entity — `myWiki/second-brain/entities/onDevice-ai.md`
- **uttecBizWiki AI FanStick** — `uttecBizWiki/entities/AI_FanStick.md` (비즈니스 관점)

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 통합 대상 | microGPT (Karpathy) + AI FanStick 차세대 + Stage 4 영업 |
| 핵심 가설 | ESP32-S3 SRAM 520KB ≥ 4K~10K 파라미터 모델 (검증 필요) |
| 영업 임팩트 | 검증 성공 시 Stage 4 패키지(1,500만) 기술 근거 확보 |
