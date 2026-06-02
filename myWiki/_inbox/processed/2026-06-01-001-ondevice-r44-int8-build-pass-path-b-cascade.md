---
id: 2026-06-01-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: normal
subject: R44 진입 + Step 0 INT8 sanity PASS (delta 0pp) + esp32s3 build PASS (Path B 검증) — 흡수 요청
created: 2026-06-01T09:00
related:
  - 프로젝트_보드한계모델_v2.10/Round44_KWS_보드_매트릭스/00_실험계획서.md
  - 프로젝트_보드한계모델_v2.10/Round44_KWS_보드_매트릭스/99_결론.md
  - 프로젝트_보드한계모델_v2.10/Round44_KWS_보드_매트릭스/results/int8_quant_sanity.json
  - 작업보고서/2026-06-01_작업보고서_2.md
  - log.md
status: done
---

# R44 진입 — esp32s3 + pca10056 KWS 보드 매트릭스 흡수 요청

## 1. 본 세션 본질

6/1 work-start #2 — 사용자 결단으로 **R44 (KWS 보드 매트릭스) 진입**. R42 영어 carry model (R26 baseline, MLP 1024→128→8, 79.3%)을 esp32s3 + pca10056 두 보드로 carry해서 양산 가능성 검증. Path B (INT8 + 내장 RAM) — R42 부록 D 결단 carry.

## 2. 본 세션 finding 3건 ⭐

### Finding 1 — INT8 quantization 손실 **0pp** ⭐⭐

본 모델 (MLP 1024→128→8) symmetric per-tensor INT8 양자화 시 정확도 손실 **0.00pp**:
- PC float32: 75.0% (120/160)
- PC INT8 simulation: 75.0% (120/160)
- delta: +0.00pp
- per_keyword 패턴 동일 (down/stop 85% / right 55% — R26 baseline 보존)

→ R26 영업 함의: AI FanStick 차세대 INT8 양산 path 사실상 무손실. CMSIS-NN / ESP-DSP 활용 안전.

### Finding 2 — esp32s3 Path B 검증 통과 ⭐⭐

esp32s3 build 결과 (`esp32_kws.bin` 507KB):
- Flash .rodata (INT8 weights 132KB + MFCC 160KB + strings): 332 KB
- Flash .text (main + ESP-IDF runtime): 96 KB
- DRAM runtime: ~13 KB (520KB SRAM 중 2.5%)
- IRAM: 16 KB

→ **PSRAM 불필요** = 부록 D Path B 양산 표준 정량 검증. AI FanStick 차세대 esp32s3($5) 메인 보드 가능성 강화.

### Finding 3 — 신규 함정 3건 (esp32s3 carry)

- **#17 (bootloader build.ninja race)**: 첫 patch_ninja → main만 patch. 첫 build에서 bootloader/build.ninja 생성됨 → ar fail. 우회: 첫 build fail 후 patch_ninja 재실행.
- **#18 (CMakeTestCCompiler 우회)**: 함정 #14 새 발현. 우회: 사용자 CMakeLists.txt `set(CMAKE_C_COMPILER_WORKS TRUE)` + `_CXX_` 명시.
- **#19 (Initialize-Idf.ps1 PythonCommand fail)**: idf-env config null 반환. 우회: `export.ps1` 직접 호출.

## 3. mywiki 흡수 후보

### §1 신규 entity → onDevice-ai.md / ai-fanstick.md 갱신
- `onDevice-ai.md` "기술 검증 진행 상황" — R44 진입 박제 (esp32s3 build PASS + Path B 검증)
- `ai-fanstick.md` "기술 근거" — INT8 quantization 0pp 손실 + esp32s3 Flash 428KB 양산 가능성

### §2 신규 gotcha → gaps.md / esp32-tips.md
- 함정 #17 (bootloader build.ninja race) — ESP-IDF v5.5.1 + Windows 환경
- 함정 #18 (CMakeTestCCompiler `CMAKE_C_COMPILER_WORKS=TRUE` 우회)
- 함정 #19 (Initialize-Idf.ps1 fail → export.ps1 대체)

### §3 신규 decision → ai-direction.md
- AI FanStick 차세대 메인 보드 후보 = esp32s3 (Path B 검증 통과). 다음 세션 sweep 정확도/latency 검증 후 최종 결단.
- INT8 quantization 양산 path 검증 — symmetric per-tensor 충분 (per-channel 불필요)

### §4 매칭 패턴 발견 ★
- ESP32 함정 #14 family (Windows cmd `cd .` cwd reset)가 cmake/ninja 환경 다양한 영역에서 발현 — 본 세션 #17, #18 모두 같은 root cause 다른 표현. mywiki/thoughts에 "Windows cmd path semantics" 패턴 박제 가치.
- KWS 모델의 INT8 quantization 손실 0pp는 모델 단순성 (FC + ReLU만, dynamic range 작음) 덕분. CNN/Transformer carry 시 손실 큼 가능성 — 모델 architecture별 quant 친화도 표 박제 후보.

### §5 갱신 권장 entity
- `myWiki/second-brain/entities/onDevice-ai.md` "최근 진행" — R44 진입
- `myWiki/second-brain/entities/ai-fanstick.md` "양산 path" — esp32s3 후보 강화
- `myWiki/second-brain/thoughts/2026-Q2/` — INT8 quantization R&D 패턴 신설 후보

## 4. 사용자 처리 대기 카드 (5/30~5/31 3건 stale 알림)

본 카드 발신 시점에 mywiki pending 3건 stale (5/30 R41 cascade / 5/30 wishket meeting / 5/31 wishket 31 apps). 사용자 처리 우선순위 사용자 결단 carry.

## 5. 본 세션 단일 출처

- `프로젝트_보드한계모델_v2.10/Round44_KWS_보드_매트릭스/99_결론.md` (Build 결과 § 0.6 + 신규 함정 3건)
- `results/int8_quant_sanity.json` (Step 0 정량)
- 작업보고서 `2026-06-01_작업보고서_2.md` (본 세션 종합)
