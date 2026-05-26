---
title: uttec-rag-local — 11th vault, Ollama local RAG (uttec-search sibling)
type: entity
created: 2026-05-24
updated: 2026-05-24 (신설 — Card #002 흡수, mywiki-claude 결단 대안 B)
status: 신설 결정 완료 (5/24) — uttec-search-claude 가 디렉토리 신설 + Ollama 통합 진행 중
tags: [vault, multi-agent, ollama, qwen2.5, local-LLM, RAG, dogfooding, sibling, uttec-search-fork, 11th-vault, 비용0트랙, A/B비교]
links: [uttec-search, uttec-vault, search, vault-portability, onDevice-ai, ai-direction]
---

# uttec-rag-local — 11th vault, Ollama 기반 local RAG

## 한 줄 정의

uttec-search (10th, Claude API) 의 **sibling** 으로 uttecMac 에 신설된 11th vault. **Ollama qwen2.5:7b local LLM** 기반 RAG 검색·정리 web 서비스. **비용 0 + 외부 인터넷 0% dogfooding 트랙**.

## 위치 + 사양

| 항목 | 값 |
|---|---|
| **vault 명칭** | `uttec-rag-local` |
| **Claude 식별자** | `uttec-rag-local-claude` |
| **순번** | **11th vault** (5/24 합류) |
| **위치** | `~/uttec-rag-local/` on uttecMac (Ubuntu 22.04, Tailscale 100.90.158.36) |
| **base** | uttec-search 디렉토리 복제 (Phase 3 신설 = uttec-search-claude 담당) |
| **frontend port** | **8892** |
| **backend port** | **8893** |
| **LLM backend** | **Ollama qwen2.5:7b** (local, Metal 가속) |
| **인덱싱 대상** | uttec-search 와 동일 (uttec-vault second-brain/ 7 영역 + root .md) |
| **메모리 공유** | `~/.claude/projects/-home-uttec-uttec-vault/memory` (uttec-vault + uttec-search + uttec-rag-local 3 vault 공통) |

## 신설 배경 (Card #002 흡수, 5/24)

사용자 결단 (2026-05-24 11:30 KST): uttec-search 의 Claude API 트랙 옆에 **로컬 LLM 트랙 신설**. 비교 의도 = "Cloud API 답변 품질 vs Local LLM 답변 품질" 동일 코퍼스 측정.

본 vault = uttec-vault-claude → mywiki-claude **신규 vault 신설 의뢰** (Card #002, 2026-05-24 11:35 KST, uttec-search 5/23 신설 패턴 follow).

## mywiki-claude 결단 (대안 B 채택, 5/24 흡수 megasession)

본 vault 측 카드 § 3-5 에 제시된 두 대안 중:

- (대안 A) mywiki-claude 직접 신설 + 검증 (uttec-search 5/23 패턴)
- **(대안 B) ✅ mywiki-claude 는 메타 갱신만 (vault 카운트 / entities / ai-direction 로그) + 디렉토리 신설·코드 복제·Ollama 통합은 uttec-search-claude 위임** ← 본 vault 측 권고 채택

근거: uttec-search-claude 가 본 vault base 코드 + Ollama 통합 시 환경 친화도 ↑ (uttecMac 측 Ollama 설치 + qwen2.5:7b pull + Metal 가속 검증 모두 Mac 측 작업). myWiki 측 책임은 cross-vault topology + 사업 자산화에 집중.

## A/B 비교 dogfooding 의도 (1주 검증)

| 차원 | uttec-search (10th) | uttec-rag-local (11th) |
|---|---|---|
| LLM | Claude API (Sonnet 4.6) | Ollama qwen2.5:7b (local) |
| 비용 | 토큰 과금 | **0** (로컬 추론) |
| 외부 의존 | 인터넷 + API | **0% (offline)** |
| 답변 품질 | 한국어 강함 | qwen2.5 7B 한국어 보통 (A/B 측정 대상) |
| RAM peak | ~1GB | **~5~6GB** (qwen2.5:7b) |
| latency | API 왕복 ~2~5초 | local Metal ~10~30초 추정 |
| 인덱싱 | 동일 (uttec-vault 7 영역) | 동일 |

→ **사업 의미**: 외부 회사 적용 시 "Claude API 비용 부담" 케이스에서 local LLM 대안 정량 보고 가능. **on-device AI (응원봉 + Stage 4) ↔ local LLM PC (uttec-rag-local)** 통합 신뢰성 트랙 가동.

## 위험 / 미확정

| # | 위험 | 비고 |
|:-:|---|---|
| 1 | uttecMac 16GB RAM 빠듯 (qwen2.5:7b ~5~6GB peak) | `OLLAMA_KEEP_ALIVE=1m` 안전 장치 |
| 2 | uttec-search 와 동시 가동 시 RAM 침범 | 사용자 선택 (교대 가동 권고) |
| 3 | 한국어 답변 품질 Sonnet 보다 낮음 | A/B 비교 후 EXAONE 7.8B GGUF 검토 |
| 4 | uttec-vault second-brain 변경 시 cascade 2 vault 동시 발송 부담 | 동일 SEARCH_DIRS 정합 유지 |

## 사업 자산 연결

- [[uttec-vault]] — base second-brain (인덱싱 대상)
- [[uttec-search]] — 10th vault, sibling (Claude API 트랙)
- [[search]] — 9th vault (Windows myWiki 원본, 두 fork 의 부모)
- [[vault-portability]] — 4 차원 비용 측정 트랙 (5/23 첫 실증 → 5/24 두 번째 실증 = sibling fork)
- [[onDevice-ai]] — 외부 의존 0% 시리즈 (응원봉 ESP-DSP + uttec-rag-local Ollama 두 축)
- [[ai-direction]] — 5/24 판단 로그 (11th vault 신설 + Ollama 트랙)

## 메타

| 항목 | 값 |
|---|---|
| 신설 결정 | 2026-05-24 11:30 KST (사용자 결단) |
| 신설 카드 도착 | 2026-05-24 11:35 KST (Card #002, uttec-vault-claude → mywiki-claude) |
| myWiki 흡수 완료 | 2026-05-24 (megasession) |
| uttec-search-claude 위임 카드 | uttec-vault outbox/2026-05-24-003 (sibling) |
| Phase 5 → Phase 6 진입 | uttec-rag-local-claude 첫 ack 카드 시점 (대기) |
| A/B 비교 dogfooding 1주 시작 | uttec-rag-local Phase 6 진입 익일 |
| 다음 갱신 | A/B 비교 1주 결과 cascade 카드 도착 시 |
