---
name: vault-start
description: onDevice_AI vault 작업 시작 시 사용. vault 진행 상태·log·다음 단계 확인. "vault 시작", "검증 진행해줘", "vault-start" 요청 시 사용
---

# vault 작업 시작 Skill (onDevice_AI 전용)

`C:\todo\today\onDevice_AI\` vault에서 검증 작업을 시작할 때 사용. today 전역의 `/work-start`와 별개로 vault 컨텍스트만 빠르게 복원한다.

## 적용 조건

현재 작업 디렉터리가 `C:\todo\today\onDevice_AI` 또는 그 하위일 때만 의미가 있다. 그 외에서는 `/work-start`를 사용한다.

## 실행 절차

### 1. vault 진행 상태 표 표시

`C:\todo\today\onDevice_AI\README.md` 의 "진행 상태" 섹션을 Read 도구로 읽어 그대로 표시한다.

대기(⬜) 항목 중 **첫 번째 항목**을 "다음 작업 후보"로 강조한다.

### 2. log.md 마지막 항목 확인

`C:\todo\today\onDevice_AI\log.md` 의 가장 최근 항목(마지막 `## [날짜] ...` 블록)을 읽어 표시:
- 마지막 작업 일자
- 마지막 작업 요약 1~2줄
- 그 항목의 "다음 액션" 목록

### 3. 검증 절차 파일 매핑

진행 상태에서 다음 작업이 다음 중 어디에 해당하는지 자동 식별:

| 진행 상태 항목 | 절차 파일 |
|---|---|
| microGPT 직접 실행 (PC) | `microGPT/01_검증절차.md` |
| ESP32-S3 hello_world | `aiFanStick_차세대/01_검증절차.md` Step 1 |
| microGPT 포팅 검증 | `aiFanStick_차세대/01_검증절차.md` Step 2~ |
| AI FanStick SLM 통합 결정 | `통합검증/01_SRAM_파라미터_매트릭스.md` |
| Stage 4 영업 자료 반영 | `통합검증/02_Stage4_영업매핑.md` |

다음 작업 절차 파일을 식별하면 경로와 함께 "이 파일의 Step X를 진행하시겠습니까?" 안내.

### 4. 외부 영업 자산 신선도 확인

검증 결과가 흘러가는 외부 파일의 최근 수정일을 확인:

| 파일 | 의미 |
|---|---|
| `C:\todo\today\영업\Stage4_OnDeviceAI_검토.md` | Stage 4 영업 매핑 |
| `C:\todo\today\myWiki\second-brain\entities\onDevice-ai.md` | myWiki entity |
| `C:\todo\today\uttecBizWiki\entities\AI_FanStick.md` | 비즈니스 관점 |

vault `log.md` 마지막 갱신일보다 오래된 외부 자산이 있으면 "이번 세션에서 검증 결과가 나오면 동기화 대상" 으로 메모.

### 5. 작업 모드 질문

사용자에게:
- "어떤 단계 진행할까요? (예: microGPT PC 실행 / ESP32-S3 / 통합검증)"
- 또는 "log 마지막 항목 이어서 진행?"

## 트리거 키워드

- "vault 시작"
- "검증 진행해줘" (CLAUDE.md 가이드 명시)
- "vault-start"
- "onDevice 시작"

## /work-start 와의 차이

| 항목 | /work-start | /vault-start |
|---|---|---|
| 범위 | today 전체 (세션·작업보고서·myWiki) | vault 안만 (README·log·검증 절차) |
| git pull | 실행 | **하지 않음** (today에서 이미 했다고 가정) |
| 세션 복원 | today/.claude/sessions | **사용 안 함** |
| 할일 표시 | 작업보고서 통합 테이블 | vault 진행 상태 표 |
| 외부 동기화 | myWiki log | Stage4 영업 자산 신선도 |

vault만 단독 작업할 때 `/vault-start` 단독 사용 가능. today 전체 세션도 복원하려면 `/work-start` → `/vault-start` 순으로 호출.
