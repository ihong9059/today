---
title: thoughts 분기별 sub-folder 정책
type: meta
created: 2026-05-12
updated: 2026-05-12
tags: [thoughts, policy, archive, quarter]
links: [CLAUDE]
---

# thoughts/ — 분기별 sub-folder 정책

본 폴더의 thought 파일은 **분기별 sub-folder**로 관리한다 (2026-05-12 도입).

## 폴더 구조

```
thoughts/
├── README.md       # 본 파일 (정책)
├── 2026-Q2/        # 2026-04 ~ 06 thought
│   └── 2026-MM-DD_*.md
├── 2026-Q3/        # 2026-07 ~ 09 thought
├── 2026-Q4/        # 2026-10 ~ 12 thought
└── ...
```

## 분기 매핑

| 분기 | 월 |
|:-:|---|
| Q1 | 01, 02, 03 |
| Q2 | 04, 05, 06 |
| Q3 | 07, 08, 09 |
| Q4 | 10, 11, 12 |

## Wikilink 동작

Obsidian wikilink `[[2026-05-12_revitaWiki-myWiki-비대칭]]`은 **파일명**으로 resolve.
sub-folder 경로 무관 — index.md, entities, log 등에서 기존 링크 그대로 작동.

## 신규 thought 작성 시

1. 현재 분기 sub-folder 진입 (없으면 생성)
2. `YYYY-MM-DD_제목.md` 파일 생성
3. `index.md`의 "생각 (Thoughts)" 테이블에 등재

## 분기 종료 시

자동 분리 안 필요 — 신규 파일은 이미 해당 분기 sub-folder에 작성됨.

다음 분기 시작 시 (예: 2026-07-01) `thoughts/2026-Q3/` 폴더만 새로 만들면 됨.

## 도입 배경

- 2026-05-12 진단([[2026-05-12_revitaWiki-myWiki-비대칭]]): "thought이 누적되면 검색 어려움" 우려
- 10개에서 20개 넘기 전에 분기 구분 도입 → 미래 검색·archive 용이

## 메타

| 항목 | 값 |
|---|---|
| 도입일 | 2026-05-12 |
| 이전 위치 (모두 Q2로 이동) | thoughts/*.md (10개) → thoughts/2026-Q2/*.md |
