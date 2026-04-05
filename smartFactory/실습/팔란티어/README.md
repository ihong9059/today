# Palantir AIP 학습 가이드

## Palantir Technologies 개요

- **설립:** 2003년, Peter Thiel, Alex Karp 등 공동 창립
- **본사:** 미국 콜로라도주 덴버
- **핵심 사업:** 빅데이터 분석 플랫폼 개발
- **상장:** 2020년 NYSE (티커: PLTR)

## 주요 제품

| 제품 | 대상 | 설명 |
|------|------|------|
| **Gotham** | 정부/국방/정보기관 | 대테러·정보분석용 데이터 분석 플랫폼 (CIA, FBI, NSA 등) |
| **Foundry** | 기업 (민간) | 데이터 통합·분석 플랫폼 (제조, 헬스케어, 금융 등) |
| **AIP** | 기업/정부 | LLM + 기업 데이터 + 실시간 의사결정 (2023년 출시) |

## 기술적 강점

- 이기종 데이터 소스 통합 (구조화/비구조화 데이터)
- 온톨로지(Ontology) 기반 데이터 모델링
- 보안 등급이 높은 환경 배포 경험 (에어갭 환경 포함)
- AIP: 생성형 AI + 운영 데이터 결합

---

## AIP 실습 방법

### 현실적인 제약

Palantir AIP는 **엔터프라이즈 전용 플랫폼**으로, 개인이 자유롭게 가입해서 쓸 수 있는 서비스가 아님.

### 접근 가능한 방법

#### 1. Palantir Developer Console
- developer.palantir.com 에서 제한적 체험 가능
- Foundry 기반 데이터 파이프라인, 온톨로지 모델링 경험

#### 2. AIP Bootcamp (공식)
- 기업/기관 대상 1~5일 워크숍
- 실제 AIP 환경에서 실습 (기업 단위 신청 필요)

#### 3. 공식 데모 영상/자료
- Palantir YouTube: "AIP in Action" 시리즈, AIP Bootcamp 녹화본
- Palantir Blog: 유스케이스별 상세 설명

#### 4. OSDK (Ontology SDK)
- Foundry 접근 권한 있을 경우 TypeScript/Python SDK로 연동 가능
- GitHub에 예제 코드 공개

---

## AIP 핵심 개념 — 직접 실습 대안

AIP의 핵심은 **"LLM + 기업 데이터 + 액션"** 결합. 이 패턴을 오픈소스로 직접 구현 가능.

| AIP 개념 | 직접 실습 대안 |
|-----------|---------------|
| LLM + 데이터 연결 | LangChain RAG — 문서 임베딩 후 LLM 질의 |
| 온톨로지 (데이터 모델) | Knowledge Graph — Neo4j + LLM 연동 |
| 액션 실행 | Function Calling — Claude/GPT Tool Use로 API 호출 |
| 워크플로우 자동화 | LangGraph / CrewAI — 에이전트 체인 구성 |

---

## 추천 학습 경로

1. YouTube에서 "Palantir AIP demo" 검색 → 개념 이해
2. LangChain RAG 튜토리얼 → 데이터+LLM 연동 실습
3. Claude Tool Use → 액션 실행 패턴 실습
4. developer.palantir.com 가입 → Foundry 체험

---

## 예제 코드

- [mini_aip_example.py](mini_aip_example.py) — AIP 패턴을 Claude Tool Use로 재현한 예제
