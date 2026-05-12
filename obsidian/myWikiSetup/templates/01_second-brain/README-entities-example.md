# entities/ — 첫 entity 예시 + 작성 가이드

본 폴더는 사람·조직·도구·프로젝트·고객 등 **단위 entity 페이지**를 모은다.

## entity 작성 기준

| 카테고리 | 예시 |
|---|---|
| 회사·조직 | 본인 회사, 협력사, 고객사, 경쟁사 |
| 사람 | 핵심 인물, 협업자, 외부 전문가 |
| 도구 | 사용 중인 핵심 도구 (Claude·Obsidian·Memory MCP 등) |
| 프로젝트 | 현재 진행 또는 의미 있는 과거 |
| 제품·기술 | 핵심 IP, 특허 기술, 자체 개발 솔루션 |
| 시장·영역 | 특정 산업 영역 (의료·교육·스마트팩토리 등) |

## 표준 frontmatter

```yaml
---
title: {entity 이름}
type: entity
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
links: [관련 페이지 파일명]
status: active | inactive | archive
---
```

## 본문 표준 구조 (회사·고객 예시)

```markdown
# {entity 이름}

## 한 줄 정의
(이 entity가 무엇인지 1줄)

## 핵심 정보
| 항목 | 값 |
|---|---|
| 정식명 | ... |
| 주소 / 연락처 | ... |
| 사업 영역 | ... |
| 거래 시작 | YYYY-MM-DD |

## UTTEC와의 관계
- 거래 이력 / 협업 시작 / 영업 단계
- 매출 (있다면)
- 매칭된 기술 자산 (skills.md 참조)

## 관련 thoughts·decisions
- [[2026-MM-DD_관련-thought]]
- [[ai-direction]] 판단 로그 §해당 항목

## 다음 단계
- 다음 액션 / 영업 단계

## 메타
| 항목 | 값 |
|---|---|
| 작성일 | YYYY-MM-DD |
| 마지막 거래·접촉 | YYYY-MM-DD |
```

## 첫 entity 예시 — `{{COMPANY_NAME}}.md`

본인 회사부터 시작 권장:

```markdown
---
title: {{COMPANY_NAME}}
type: entity
created: {{TODAY}}
updated: {{TODAY}}
tags: [company, self]
links: [me, skills, ai-direction]
status: active
---

# {{COMPANY_NAME}}

## 한 줄 정의
{본인 회사 한 줄 소개}

## 사업 영역
{현재 사업·계획 사업}

## 핵심 강점
{경쟁사 대비 차별화}

## 거래처 / 고객
{주요 고객 — 추후 entity로 분리 가능}

## 관련 페이지
- [[me]] — 운영자 정체성
- [[skills]] — 기술 스택
- [[ai-direction]] — 사업 방향
```

## entity lint 정책 (분기별)

- 6개월 이상 updated 안 됨 + 다른 페이지에서 참조 0회 → `entities-stale/`로 이동
- 그러나 참조 1회 이상 있으면 활성으로 간주 유지 (참조하는 컨텍스트에서 가치 있음)

상세: `CLAUDE.md § entities/ 정기 lint`
