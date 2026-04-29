---
title: "한국기계 Wiki 대시보드"
type: index
created: 2026-04-29
updated: 2026-04-29
---

# 한국기계 AI 업무효율화 Wiki

## 제품 목록
```dataview
TABLE category AS "분류", tags AS "태그"
FROM "제품"
WHERE type = "product"
SORT file.name ASC
```

## 공정 목록
```dataview
TABLE industry AS "산업", tags AS "태그"
FROM "공정"
WHERE type = "process"
SORT file.name ASC
```

## 최근 납품 사례
```dataview
TABLE client_type AS "고객유형", industry AS "산업", date AS "납품일"
FROM "사례"
WHERE type = "case"
SORT date DESC
LIMIT 10
```

## 전체 페이지 수
```dataview
LIST length(rows) AS "총 페이지"
FROM ""
WHERE file.name != "index"
GROUP BY type
```
