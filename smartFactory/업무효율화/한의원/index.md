---
title: 한의원 업무효율화 대시보드
description: 전체 Wiki 현황 대시보드
version: 1.0
date: 2026-05-01
tags:
  - 대시보드
  - index
---

# 한의원 업무효율화 대시보드

## 전체 현황

### 처방 데이터베이스
```dataview
TABLE WITHOUT ID
  file.link AS "문서",
  length(file.outlinks) AS "링크 수",
  file.mtime AS "최종 수정"
FROM "처방"
SORT file.name ASC
```

### 약재 데이터베이스
```dataview
TABLE WITHOUT ID
  file.link AS "문서",
  length(file.outlinks) AS "링크 수",
  file.mtime AS "최종 수정"
FROM "약재"
SORT file.name ASC
```

### 경혈 데이터베이스
```dataview
TABLE WITHOUT ID
  file.link AS "문서",
  length(file.outlinks) AS "링크 수",
  file.mtime AS "최종 수정"
FROM "경혈"
SORT file.name ASC
```

---

## 빠른 접근

### 핵심 참조 문서
- [[처방/_처방_총괄|처방 총괄표]] — 주요 처방 20종 한눈에
- [[약재/_약재_총괄|약재 총괄표]] — 주요 약재 50종
- [[약재/상극_금기|십팔반/십구외/임부금기]] — 안전성 확인 필수
- [[경혈/_경혈_총괄|경혈 총괄표]] — 주요 경혈 30종
- [[체질/_체질_총괄|사상체질 비교]] — 4체질 상세 비교
- [[변증/_변증_가이드|변증 가이드]] — 진단 의사결정 트리

### 처방 분류
- [[처방/보기제|보기제]] — 기를 보하는 처방
- [[처방/보혈제|보혈제]] — 혈을 보하는 처방
- [[처방/해표제|해표제]] — 감기/표증 처방
- [[처방/이기제|이기제]] — 기를 소통시키는 처방

### 보험 및 행정
- [[보험/_보험_총괄|보험 청구 가이드]]

---

## 최근 임상 사례
```dataview
TABLE WITHOUT ID
  file.link AS "사례",
  tags AS "태그",
  file.mtime AS "최종 수정"
FROM "사례"
SORT file.mtime DESC
LIMIT 10
```

---

## AI 어시스턴트 명령어 요약

| 명령어 | 용도 | 예시 |
|--------|------|------|
| `/처방추천` | 증상+체질 기반 처방 추천 | `/처방추천 소화불량+소음인` |
| `/경혈추천` | 증상 기반 경혈 조합 추천 | `/경혈추천 두통` |
| `/약재확인` | 약재 상세정보+금기 확인 | `/약재확인 부자` |
| `/체질분석` | 특징 기반 체질 판별 | `/체질분석 마른체형+추위잘탐` |
| `/상극확인` | 두 약재 배합 금기 확인 | `/상극확인 반하+오두` |

상세 사용법: [[CLAUDE|AI 어시스턴트 설정]]

---

## FAQ 모음
- [[FAQ/한약-FAQ|한약 자주 묻는 질문]] (20문항)
- [[FAQ/침치료-FAQ|침 치료 자주 묻는 질문]] (15문항)

---

## 템플릿
- [[템플릿/진료기록_템플릿|진료기록 작성]]
- [[템플릿/처방전_템플릿|처방전 작성]]

---

## 전체 문서 목록
```dataview
TABLE WITHOUT ID
  file.link AS "문서명",
  file.folder AS "분류",
  file.size AS "크기(bytes)",
  file.mtime AS "최종 수정"
FROM ""
WHERE file.name != "index"
SORT file.folder ASC, file.name ASC
```
