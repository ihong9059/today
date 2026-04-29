---
title: "태명과학 장비 컨설팅 대시보드"
type: dashboard
---

# 태명과학 장비 컨설팅 대시보드

## 장비 목록
```dataview
TABLE category AS "분류", WITHOUT ID file.link AS "장비"
FROM "장비"
WHERE type = "equipment"
SORT category, file.name
```

## 재질 목록
```dataview
TABLE WITHOUT ID file.link AS "재질"
FROM "부속품/재질"
WHERE type = "material"
SORT file.name
```

## 시료 가이드 (산업별)
```dataview
TABLE industry AS "산업", WITHOUT ID file.link AS "가이드"
FROM "시료"
WHERE type = "sample-guide"
SORT industry
```

## 적용 사례
```dataview
TABLE industry AS "산업", client_type AS "고객유형", date AS "날짜", WITHOUT ID file.link AS "사례"
FROM "사례"
WHERE type = "case"
SORT date DESC
```

## 빠른 링크

### 핵심 참조
- [[_장비_총괄]] - FRITSCH 전 모델 비교표 + 선정 플로차트
- [[_부속품_호환_매트릭스]] - 장비x재질x용량 호환성 DB
- [[_재질_총괄_비교]] - 8종 재질 비교 + 의사결정 트리
- [[산업별_입도기준]] - 합격/불합격 판정 기준표

### 가이드
- [[_분쇄원리_가이드]] - 충격/전단/절단/압축 원리
- [[분쇄용기-볼밀]] - 용기 선택 가이드
- [[분쇄볼-가이드]] - 볼 직경별 적합 입도
- [[입도분석_기초]] - D10/D50/D90, Span 해설

### 템플릿
- [[견적서_템플릿]]
- [[시료테스트_리포트]]
- [[장비추천서_템플릿]]
