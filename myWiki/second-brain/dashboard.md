---
title: 대시보드
type: index
created: 2026-04-22
updated: 2026-04-22
tags: [대시보드, dataview, 현황]
links: [index, projects, goals]
---

# Second Brain 대시보드

## 프로젝트 현황

```dataview
TABLE
  type AS "유형",
  updated AS "최종 업데이트",
  join(tags, ", ") AS "태그"
FROM "second-brain/entities"
SORT updated DESC
```

## 최근 업데이트 페이지 (전체)

```dataview
TABLE
  type AS "유형",
  updated AS "업데이트"
FROM "second-brain"
WHERE file.name != "CLAUDE"
SORT updated DESC
LIMIT 15
```

## 페이지 유형별 분포

```dataview
TABLE
  length(rows) AS "페이지 수"
FROM "second-brain"
WHERE type
GROUP BY type
SORT length(rows) DESC
```

## 생각 기록 타임라인

```dataview
TABLE
  title AS "제목",
  created AS "작성일"
FROM "second-brain/thoughts"
SORT created DESC
```

## 업데이트 필요 (7일 이상 경과)

```dataview
TABLE
  type AS "유형",
  updated AS "마지막 업데이트",
  date(today) - date(updated) AS "경과일"
FROM "second-brain"
WHERE type AND updated AND (date(today) - date(updated)).days > 7
SORT updated ASC
```

## 링크 네트워크 (연결 수)

```dataview
TABLE
  length(file.inlinks) AS "들어오는 링크",
  length(file.outlinks) AS "나가는 링크",
  length(file.inlinks) + length(file.outlinks) AS "총 연결"
FROM "second-brain"
WHERE type
SORT (length(file.inlinks) + length(file.outlinks)) DESC
LIMIT 15
```
