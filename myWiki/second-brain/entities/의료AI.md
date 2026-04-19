---
title: 의료 AI / 영상의학 병원 인수
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, 의료, AI, SNOMED, 사업]
---

# 의료 AI / 영상의학 병원 인수

## 한 줄 정의
영상의학 병원을 인수하여 SNOMED CT + AI 자동 진단 시스템으로 **데이터 수익화** 가능한 디지털 병원으로 전환하는 프로젝트.

## 왜 중요한가
- 한국이 2020년 SNOMED International 가입 (무료 라이선스)
- 판독문 자동 SNOMED CT 코딩 = 국내 경쟁자 없음
- [[ai-direction|AI 방향]]에서 "AI + 도메인 전문성" 결합의 큰 기회

## 현재 상태
- 리서치 및 기획 단계 (2026-03~04)
- 종합 계획서 완성 (5단계, 18개월 로드맵)
- SNOMED CT 구조/코드 분석 완료
- X-ray AI 진단 기술 조사 완료
- RAG 파이프라인 최적화 가이드 완료
- Palantir 의료 AI 플랫폼 조사 완료
- **구현 미착수**

## 핵심 수치
| 항목 | 수치 |
|------|------|
| 예상 투자 | 20~35억원 |
| 기간 | 18개월 (5단계) |
| ICD-10 코딩 절감 | 연 600~900시간 |
| 보험 반려율 | 5~10% → 1~2% |
| 추천 AI 제품 | Lunit INSIGHT CXR (AUC 0.93, FDA/CE 승인) |

## 기술 스택
- SNOMED CT (의료 온톨로지)
- HL7 FHIR R4 (의료 데이터 표준)
- DICOM SR (영상 리포트)
- NLP/NER: KoBERT, SapBERT
- LLM RAG: GPT-4/Claude + FAISS
- PostgreSQL, ICD-10 크로스매핑

## 팔란티어 리서치
- Foundry, AIP, Ontology 시스템 분석
- 의료 AI 플랫폼으로서의 활용 가능성 조사

## 관련 페이지
- [[me]]: 사업가 + 기술자 정체성
- [[goals]]: 장기 사업 비전
- [[ai-direction]]: AI + 도메인 = 차별화
- [[skills]]: AI/ML, 서버 기술
- [[experience]]: AI 시스템 구축 경험
