---
title: "약국 복약지도 대시보드"
type: dashboard
---

# 약국 복약지도 대시보드

## 의약품 목록 (약효군별)
```dataview
TABLE category AS "약효군", classification AS "분류(ETC/OTC)", WITHOUT ID file.link AS "의약품"
FROM "의약품"
WHERE type = "drug-category"
SORT category
```

## 전문의약품(ETC) 목록
```dataview
TABLE category AS "약효군", generic_name AS "성분명", WITHOUT ID file.link AS "상품명"
FROM "의약품"
WHERE classification = "ETC"
SORT category, file.name
```

## 일반의약품(OTC) 목록
```dataview
TABLE category AS "약효군", generic_name AS "성분명", WITHOUT ID file.link AS "상품명"
FROM "의약품"
WHERE classification = "OTC"
SORT category, file.name
```

## 상호작용 주의 약물 쌍
```dataview
TABLE drug_a AS "약물A", drug_b AS "약물B", severity AS "위험등급", WITHOUT ID file.link AS "상세"
FROM "상호작용"
WHERE type = "interaction"
SORT severity DESC
```

## 질환별 가이드
```dataview
TABLE disease AS "질환", first_line AS "1차 약물", WITHOUT ID file.link AS "가이드"
FROM "질환"
WHERE type = "disease-guide"
SORT disease
```

## 복약지도 사례
```dataview
TABLE patient_type AS "환자유형", drugs AS "관련약물", date AS "날짜", WITHOUT ID file.link AS "사례"
FROM "사례"
WHERE type = "case"
SORT date DESC
```

## 빠른 링크

### 핵심 참조
- [[_의약품_총괄]] - 전체 의약품 비교표 (20+ 약물)
- [[해열진통제]] - 아세트아미노펜, NSAIDs 상세
- [[감기약]] - 종합감기약 성분 분석
- [[위장약]] - PPI/H2차단제/제산제

### 전문의약품(ETC)
- [[고혈압약]] - ARB/ACEi/CCB/이뇨제
- [[당뇨약]] - 메트포르민/설포닐우레아/DPP-4/SGLT2
- [[항생제]] - 페니실린/세팔로스포린/퀴놀론/마크로라이드

### 특수 환자군 참고
- 소아 복약지도 주의사항
- 임산부/수유부 안전 약물 목록
- 고령자 다제병용 체크리스트
- 간/신장 기능저하 환자 용량 조절 가이드

### 업무 도구
- 복약지도 체크리스트
- 약물 상호작용 빠른 조회
- 처방전 검토 워크플로
