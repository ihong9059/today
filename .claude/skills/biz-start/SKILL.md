---
name: biz-start
description: uttecBizWiki vault 작업 시작 시 사용. 영업 진행 상태·log·검증 결과 흡수 체크. "비즈 시작", "영업 시작해줘", "biz-start", "AI FanStick 영업" 요청 시 사용
---

# 비즈 작업 시작 Skill (uttecBizWiki 전용)

`C:\todo\today\uttecBizWiki\` vault 에서 onDevice AI 제품(AI FanStick 차세대 + Stage 4 패키지)의 **비즈니스** 작업을 시작할 때 사용. today 전역의 `/work-start` 와 별개로 vault 컨텍스트만 빠르게 복원한다.

## 적용 조건

현재 작업 디렉터리가 `C:\todo\today\uttecBizWiki` 또는 그 하위일 때만 의미가 있다. 그 외에서는 `/work-start` 를 사용한다. onDevice 기술 검증은 `/vault-start` (onDevice_AI_검증 전용).

## 실행 절차

### 1. 영업 진행 상태 표 표시

본 vault의 영업 진행 상태는 entity 안에 산재한다. 다음 파일 중 존재하는 것의 "영업 진행 상태" 또는 "다음 액션" 표를 Read 도구로 읽어 표시:

| 파일 | 추출 섹션 |
|---|---|
| `entities/AI_FanStick.md` | "영업 진행 상태" 표 + "다음 액션" 표 |
| `entities/Stage4_패키지.md` (있으면) | 영업 사이클 / 수주 후보 |
| `entities/한국기계_Stage4.md` (있으면) | Stage 4 후보 진행 |
| `entities/K-POP_시장.md` (있으면) | 시장 진입 단계 |
| `entities/임베디드_스타트업.md` (있으면) | Stage 4 잠재 고객 |

대기(⬜) 항목 중 **첫 번째 항목**을 "다음 작업 후보"로 강조한다.

### 2. log.md 마지막 항목 확인

`C:\todo\today\uttecBizWiki\log.md` 의 가장 최근 항목(마지막 `## [날짜] ...` 블록)을 읽어 표시:
- 마지막 작업 일자
- 마지막 작업 요약 1~2줄
- 그 항목의 "다음 액션" 목록

### 3. 최근 영업 이벤트 (raw/) 확인

`C:\todo\today\uttecBizWiki\raw\` 폴더의 최근 파일 3개를 modification time 기준으로 나열:
- 파일명 (날짜 + 이벤트)
- 핵심 1줄 요약 (있으면)

raw/ 가 비어 있으면 "아직 영업 이벤트 기록 없음 — 첫 미팅·견적 시 raw/YYYY-MM-DD_*.md 생성" 안내.

### 4. onDevice 검증 결과 흡수 체크

본 vault는 onDevice_AI_검증 vault의 결과를 **흡수**해야 한다(역방향). 다음을 비교:

| 비교 대상 | 의미 |
|---|---|
| `C:\todo\today\onDevice_AI_검증\log.md` 마지막 항목 | 가장 최근 검증 결과 |
| `C:\todo\today\uttecBizWiki\entities\AI_FanStick.md` updated 필드 | 본 vault 마지막 흡수 시점 |

검증 log 가 더 최신이면 "흡수 대상 검증 결과 있음 — `entities/AI_FanStick.md` '기술 근거' 섹션 갱신 필요" 알림. 흡수 권고는 `/biz-end` 에서 실제 처리.

### 5. 외부 영업 자산 신선도 확인

본 vault 결과가 흘러가는 외부 파일의 최근 수정일 확인:

| 파일 | 의미 |
|---|---|
| `C:\todo\today\영업\Stage4_OnDeviceAI_검토.md` | Stage 4 1차 영업 자료 |
| `C:\todo\today\myWiki\second-brain\entities\ai-fanstick.md` | myWiki 제품 entity (기술·특허) |
| `C:\todo\today\myWiki\second-brain\entities\uttec-stage-package.md` | myWiki Stage 영업 모델 |

vault `log.md` 마지막 갱신일보다 오래된 외부 자산이 있으면 "이번 세션에서 영업 결과가 나오면 동기화 대상" 으로 메모.

### 6. 작업 모드 질문

사용자에게:
- "어떤 작업 진행할까요? (예: 영업 미팅 기록 / 검증 결과 흡수 / 시장 분석 / entity 신규)"
- 또는 "log 마지막 항목 이어서 진행?"
- scope 외 작업(위시캣 일반·강사양성·Stage 0 등) 요청 시 CLAUDE.md scope 표 안내 후 다른 vault/폴더로 라우팅

## 트리거 키워드

- "비즈 시작"
- "영업 시작해줘"
- "biz-start"
- "AI FanStick 영업"
- "Stage 4 영업 진행"
- "uttecBizWiki 시작"

## /work-start, /vault-start 와의 차이

| 항목 | /work-start | /vault-start (onDevice) | /biz-start (uttecBizWiki) |
|---|---|---|---|
| 범위 | today 전체 | onDevice_AI_검증 안만 | uttecBizWiki 안만 |
| git pull | 실행 | 안 함 | 안 함 |
| 세션 복원 | today/.claude/sessions | 안 함 | 안 함 |
| 진행 상태 출처 | 작업보고서 통합 테이블 | README 진행 상태 표 | entities/ "영업 진행 상태" 표 |
| 검증/제품 관계 | (관여 없음) | 검증 단계 진행 | 검증 결과 흡수 (역방향) |
| 외부 신선도 | myWiki log | Stage4 영업 자산 | 영업/, myWiki entity |

vault만 단독 작업할 때 `/biz-start` 단독 사용 가능. today 전체 세션도 복원하려면 `/work-start` → `/biz-start` 순으로 호출.

## 자주 함께 호출되는 흐름

- `/biz-start` → 영업 미팅 기록 → `/biz-end`
- `/vault-start` (검증) → 검증 결과 도출 → `/vault-end` → `/biz-start` (흡수) → `/biz-end`
- `/work-start` → `/biz-start` → ... → `/biz-end` → `/work-end` (종일 작업)
