# thoughts/ — 분기별 sub-folder 정책

본 폴더의 thought 파일은 **분기별 sub-folder**로 관리한다.

## 폴더 구조

```
thoughts/
├── README.md       # 본 파일 (정책)
├── 2026-Q2/        # 2026-04 ~ 06 thought
├── 2026-Q3/        # 2026-07 ~ 09 thought
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

Obsidian wikilink `[[2026-MM-DD_제목]]`은 **파일명**으로 resolve. sub-folder 경로 무관 — index.md, entities, log 등 기존 링크 그대로 작동.

## 신규 thought 작성 시

1. 현재 분기 sub-folder 진입 (없으면 생성)
2. `YYYY-MM-DD_제목.md` 파일 생성
3. frontmatter (title / type: thought / created / updated / tags / links)
4. `index.md`의 "생각 (Thoughts)" 테이블에 등재

## thought 작성 기준

다음 패턴이 발견되면 thought 작성 권장:

```
[사실 A] + [사실 B] → [새로운 판단 C] → [행동 변화 D]
```

예시:
- 두 프로젝트의 기술 공통점 발견 → 사업 라인 발견 가능성
- 새 entity가 기존 영업·고객 entity와 매칭 → 영업 자산 가능성
- 기술 결정 패턴 반복 → me.md 의사결정 패턴 갱신 가치

## 분기 종료 시

자동 분리 불필요 — 신규 파일은 이미 해당 분기 sub-folder에 작성됨.

다음 분기 시작 시 (예: 2026-07-01) `thoughts/2026-Q3/` 폴더만 새로 만들면 됨.

## 메타

| 항목 | 값 |
|---|---|
| 정책 도입 | 셋업 시점 |
| 분기 sub-folder 패턴 | 미래 검색·archive 용이 |
| 출처 | UTTEC myWiki second-brain v1.0 |
