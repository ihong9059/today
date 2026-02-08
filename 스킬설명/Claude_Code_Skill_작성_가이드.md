# Claude Code 커스텀 Skill 작성 가이드

## Skill이란?

재사용 가능한 명령 모음으로, 특정 작업을 자동화하는 맞춤형 기능입니다.
- `/skill-name` 형태로 수동 호출
- Claude가 상황에 맞게 자동 호출 가능

---

## 저장 경로

| 범위 | 경로 |
|------|------|
| **개인용** (모든 프로젝트) | `~/.claude/skills/<skill-name>/SKILL.md` |
| **프로젝트용** (현재 프로젝트만) | `.claude/skills/<skill-name>/SKILL.md` |

---

## 기본 디렉토리 구조

```
skill-name/
├── SKILL.md          (필수 - 메인 파일)
├── 추가파일.md       (선택 - 보조 문서)
└── scripts/          (선택 - 스크립트 폴더)
```

---

## SKILL.md 기본 형식

```yaml
---
name: skill-name
description: 이 skill이 하는 일과 언제 사용하는지 설명
---

여기에 Claude가 따를 지시사항을 작성합니다.
```

---

## 작성 예시

### 예시 1: 코드 리뷰 Skill

```yaml
---
name: code-review
description: 코드 리뷰를 요청할 때 사용
---

다음 항목을 검토하세요:
1. 코드 스타일: 명확하고 일관성 있는가?
2. 오류 처리: 예외 상황을 모두 처리했는가?
3. 성능: 최적화할 수 있는 부분이 있는가?
4. 보안: 보안 취약점이 없는가?

검토 대상: $ARGUMENTS
```

### 예시 2: 수동 호출 전용 Skill

```yaml
---
name: quick-format
description: 텍스트 포맷 변환
disable-model-invocation: true
---

입력된 텍스트를 다음 형식으로 정렬하세요:
- 각 항목을 불릿 포인트로
- 중복 제거
- 알파벳순 정렬

입력: $ARGUMENTS
```

### 예시 3: 동적 데이터 주입 Skill

```yaml
---
name: project-analysis
description: 현재 프로젝트 구조 분석
---

현재 프로젝트 구조:
!`find . -type f -name "*.md" | head -20`

위 파일들을 기반으로 프로젝트 구조를 분석하세요.
```

---

## 주요 설정 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `name` | skill 이름 (명령어 이름) | 필수 |
| `description` | skill 설명 (언제 사용할지) | 권장 |
| `disable-model-invocation: true` | 수동 호출만 가능 | false |
| `user-invocable: false` | Claude만 자동 호출 가능 | true |
| `allowed-tools` | 사용 가능한 도구 제한 | 제한 없음 |
| `argument-hint` | 자동완성 시 표시될 인자 설명 | 없음 |

---

## 동적 변수

| 변수 | 설명 |
|------|------|
| `$ARGUMENTS` | 사용자가 입력한 전체 인자 |
| `$0, $1, $2...` | 개별 인자 참조 |
| `` !`command` `` | 셸 명령 실행 결과 주입 |

---

## 사용 방법

- **수동 호출**: `/skill-name [인자]`
- **자동 호출**: Claude가 대화 상황에 맞게 자동 실행 (description 기반)
