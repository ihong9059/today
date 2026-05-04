---
name: wiki-lint
description: myWiki second-brain 정원사 사이클의 lint 단계. 고아 페이지/오래된 정보/frontmatter 누락/모순을 자동 점검하여 보고서 생성. "위키 점검", "wiki lint", "정원사", "위키 청소" 요청 시 사용
---

# Wiki Lint Skill (Karpathy LLM Wiki 패턴)

myWiki/second-brain의 건강 상태를 자동 점검합니다. Karpathy의 LLM Wiki "정원사 사이클" 중 **lint** 단계를 담당.

## 점검 항목

| 항목 | 의미 | 심각도 |
|------|------|--------|
| `NO_FRONTMATTER` | YAML frontmatter 자체가 없음 | 🔴 High |
| `MISSING_title/type/created/updated` | 필수 필드 누락 | 🔴 High |
| `STALE_Nd` | updated 후 N일 경과 (기본 30일) | 🟡 Medium |
| `NO_internal_links` | 본문에 [[link]] 0개 (고아 페이지) | 🟡 Medium |
| `NO_links_field` | 본문에는 링크 있지만 frontmatter에 `links:` 미선언 | 🟢 Low |

**제외 파일**: `CLAUDE.md`, `MEMORY.md`, `raw/` 하위 전체

## 실행 절차

### 1. 진단 실행
```bash
powershell -ExecutionPolicy Bypass -File "C:\todo\today\myWiki\second-brain\.lint-script.ps1"
```

### 2. 결과 해석
출력은 두 섹션:
- 파일별 이슈 목록 (File | Issues | LinkCount)
- 오래된 파일 연령별 카운트

### 3. 사용자에게 보고
- 총 파일 수, 이슈 수, 심각도별 카운트
- High 이슈가 있으면 "⚠️ 즉시 수정 권장" 표시
- Medium/Low는 대시보드에 누적

### 4. 옵션: 자동 수정 (`--fix`)
사용자가 `/wiki-lint --fix` 요청 시:
- `NO_links_field`: 본문 [[link]]를 추출하여 frontmatter `links:` 필드에 자동 추가
- `STALE_Nd`: 사용자에게 "이 페이지 여전히 유효합니까?" 묻고 updated 갱신 여부 결정
- `NO_FRONTMATTER`: 사용자에게 type 묻고 기본 frontmatter 생성

## 정원사 사이클 통합

`/work-end` 실행 시 자동으로 wiki-lint를 호출하여 결과를 작업보고서에 첨부합니다 (silent run, 이슈 0이면 표시 생략).

## 점검 스크립트 위치
- 본체: `C:\todo\today\myWiki\second-brain\.lint-script.ps1`
- 수정 시 본 SKILL.md의 점검 항목 표도 함께 갱신

## 트리거 키워드
- "위키 점검", "위키 청소", "위키 상태"
- "wiki lint", "lint 위키"
- "정원사", "정원사 사이클"
- "second-brain 점검"
