# onDevice AI 검증 vault — schema

이 vault는 **ESP32-S3 + On-Device AI 통합 검증 작업 공간**.

## 운영 규칙

### 폴더 명명
- `시장조사/` — 산업 동향·시장 규모·기술 트렌드 분석 (WebSearch 기반, 검증 배경 자료. 구 `aiOnDevice/`, 2026-05-10 통합 이동)
- `microGPT/` — Karpathy 200줄 GPT 관련 (PC 직접 실행 + ESP32-S3 포팅)
- `aiFanStick_차세대/` — AI FanStick 차세대 모델 검증
- `통합검증/` — 두 영역의 교집합 (매트릭스, Stage 4 매핑)

### 파일 명명
- 번호 prefix + 주제 (예: `01_검증절차.md`, `02_결과분석.md`)
- 진행 단계는 번호로 (작성 순서가 검증 진행 순서)

### 명세 작성 규칙
- 각 검증 파일은 다음 구조:
  1. **목표** (한 줄)
  2. **사전 조건** (보드·도구·환경)
  3. **단계** (Step 1, 2, 3...)
  4. **체크리스트** (실행 시 점검)
  5. **결과 기록 영역** (아직 비어있음, 실행 후 채움)
  6. **다음 단계** (이 파일 완료 후 무엇)

## Claude 작업 가이드

### 사용자가 "검증 진행해줘"라고 하면
1. 진행 상태 확인 (`README.md`의 진행 상태 표)
2. 다음 단계 파일 읽기
3. 사용자 직접 작업 vs Claude 작업 구분
4. Claude 작업이면 즉시 실행
5. 사용자 작업이면 절차 안내 + 결과 받을 준비

### 사용자가 "결과 기록해줘"라고 하면
1. 해당 단계 파일의 "결과 기록 영역"에 시간순 추가
2. log.md에 한 줄 ingest 로그 추가
3. README.md 진행 상태 표 갱신

### 사용자가 "다음 검증 추천해줘"라고 하면
1. 현재까지 결과 종합
2. 다음 검증 가설 1~2개 제시
3. 사용자 선택 후 새 파일 작성

## 외부 자료 참조

본 vault에서 참조하는 외부 자료 (myWiki와 별개):
- `작업보고서/temp/microGPT_초보자_가이드.md` (5/4 작성, 11 섹션)
- `myWiki/second-brain/entities/ai-fanstick.md` (AI FanStick 특허 정보)
- `myWiki/second-brain/entities/uttec-stage-package.md` (Stage 4 영업 매핑)
- `영업/Stage4_OnDeviceAI_검토.md` (Stage 4 검토 결과)

## 결과 → 외부 영업 자산 흐름

```
[onDevice_AI vault]
       ↓ 검증 완료 시
[영업/Stage4_OnDeviceAI_검토.md] 갱신 (실증 데이터 추가)
       ↓
[entities/uttec-stage-package.md] 갱신 (Stage 4 사례)
       ↓
[강사양성 / 호오컨설팅 / 인프런] 강의 사례로 활용
       ↓
[Stage 4 영업 수주] 한국기계 등
```

## 메타

본 vault는 **검증 작업 공간** (작업 진행 중).
완료 시 핵심 인사이트는 myWiki entity로 영구화 후 본 vault는 archive 가능.
