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
onDevice_AI_검증/
├── README.md                       ← 네비게이션 (이 파일)
├── CLAUDE.md                       ← Claude를 위한 schema
├── 0_검증계획.md                   ← 통합 검증 매트릭스 + 진행 흐름
├── log.md                          ← 시간순 작업 기록
│
├── microGPT/                       ← Karpathy 200줄 GPT 검증
│   └── 01_검증절차.md
│
├── aiFanStick_차세대/              ← AI FanStick + SLM 통합 검증
│   └── 01_검증절차.md
│
└── 통합검증/                       ← 두 검증의 교집합
    ├── 01_SRAM_파라미터_매트릭스.md
    └── 02_Stage4_영업매핑.md
```

## 진행 상태

| 항목 | 상태 |
|---|:-:|
| vault 골격 작성 (5/7) | ✅ 완료 |
| microGPT 직접 실행 (PC) | ⬜ 대기 (즉시 가능) |
| ESP32-S3 보드 입수 | ⬜ 대기 (사용자 직접) |
| ESP32-S3 hello_world | ⬜ 대기 (보드 도착 후) |
| microGPT 포팅 검증 | ⬜ 대기 |
| AI FanStick SLM 통합 결정 | ⬜ 대기 (검증 결과 후) |
| Stage 4 영업 자료 반영 | ⬜ 대기 (검증 완료 후) |

## 시작점

1. **검증 계획 확인**: `0_검증계획.md`
2. **PC 직접 실행 (보드 없이 가능)**: `microGPT/01_검증절차.md` Step 1~3
3. **보드 입수 후**: `aiFanStick_차세대/01_검증절차.md`

## 관련 vault (3-vault 구조)

| vault | 역할 | 본 vault와의 관계 |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구 통합 second-brain | entity로 추적 (`onDevice-ai-검증.md`) |
| **`uttecBizWiki/`** | **사업 운영 (영업·매출·고객)** | **본 vault 검증 결과를 비즈니스로 흐름** |
| `onDevice_AI_검증/` (본 vault) | 기술 검증 단기 프로젝트 | 검증 종료 후 archive |

### cross-link 흐름

```
[onDevice_AI_검증] (본 vault)
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
[onDevice_AI_검증] 다음 검증 사이클
```

## 관련 자료

- 6편 시리즈 — `obsidian/` (배경 지식)
- microGPT 초보자 가이드 — `작업보고서/temp/microGPT_초보자_가이드.md` (이미 작성, 11 섹션)
- Stage 4 검토 — `영업/Stage4_OnDeviceAI_검토.md` (영업 매핑)
- myWiki entity — `myWiki/second-brain/entities/onDevice-ai-검증.md`
- **uttecBizWiki AI FanStick** — `uttecBizWiki/entities/AI_FanStick.md` (비즈니스 관점)

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 통합 대상 | microGPT (Karpathy) + AI FanStick 차세대 + Stage 4 영업 |
| 핵심 가설 | ESP32-S3 SRAM 520KB ≥ 4K~10K 파라미터 모델 (검증 필요) |
| 영업 임팩트 | 검증 성공 시 Stage 4 패키지(1,500만) 기술 근거 확보 |
