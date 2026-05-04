---
name: wiki-query
description: myWiki second-brain 횡단 질의 도구. 위키 전체에서 키워드/주제로 페이지를 찾고 관련 콘텐츠를 종합하여 답변 생성. "위키 검색", "wiki query", "위키에서 찾아줘", "second-brain에서 X 알려줘" 요청 시 사용
---

# Wiki Query Skill (Karpathy LLM Wiki 패턴)

myWiki/second-brain 전체를 횡단 질의합니다. Karpathy의 LLM Wiki "정원사 사이클" 중 **query** 단계를 담당.

## 질의 유형

| 유형 | 예시 사용자 입력 | 처리 방법 |
|------|----------------|----------|
| **키워드 검색** | "위키에서 'Hyperauto' 찾아줘" | Grep으로 본문/frontmatter 검색 |
| **주제 종합** | "스마트팩토리 관련 모든 페이지 종합" | 관련 entities + thoughts + projects 모아서 합성 |
| **연결 탐색** | "claude-code와 연결된 페이지" | [[link]] 참조 그래프 추적 |
| **타임라인** | "지난주 추가된 것" | log.md 시간순 + frontmatter updated 정렬 |
| **판단 보조** | "온톨로지를 우리 사업에 어떻게 쓸까" | 관련 페이지 종합 + 인사이트 도출 |

## 실행 절차

### 1. 질의 분류
사용자 입력에서 위 5가지 유형 중 어느 것인지 판단.

### 2. 검색 범위
- **포함**: `myWiki/second-brain/*.md`, `entities/`, `thoughts/`
- **제외**: `raw/` 하위 (불변 영역), `CLAUDE.md`, `.lint-script.ps1`

### 3. 검색 도구
| 작업 | 도구 |
|------|------|
| 키워드 검색 | Grep (정규식 + glob `myWiki/second-brain/**/*.md`) |
| 파일 목록 | Glob |
| 내용 읽기 | Read (필요한 페이지만) |
| 그래프 탐색 | `[[페이지명]]` 패턴 grep으로 역참조 추적 |

### 4. 종합 답변
- 출처 페이지 명시 (`[[entities/스마트팩토리]]` 형식)
- 직접 인용은 `> "..."` 블록쿼트
- 종합 후 인사이트는 별도 섹션으로 분리

### 5. 새 인사이트 발견 시
Karpathy 패턴의 "복리 인사이트" 발견 시 사용자에게 thoughts/ 페이지 생성 제안:
```
[사실 A: 페이지X] + [사실 B: 페이지Y] → [새 판단 C]
→ thoughts/2026-MM-DD_제목.md 생성하시겠습니까?
```

## Query 로그 기록

중요 query는 log.md에 기록하여 정원사 사이클 활성화:
```
## [2026-05-04] use | 한줄 요약
- 참조: [[페이지A]], [[페이지B]]
- 판단: 무엇을 결정했는가
- 결과: (추후 기록)
```

## wiki-lint와의 관계
- wiki-query 실행 중 frontmatter 누락/stale 발견 시 wiki-lint 실행 권장 표시
- 사용자가 자주 query하는 주제는 lint 시 별도 마킹 (성장 중인 영역)

## 트리거 키워드
- "위키 검색", "위키에서 찾아"
- "wiki query", "second-brain에서"
- "위키 종합", "관련 페이지"
- "위키 타임라인", "최근 추가"
