---
title: uttec-plc vault — PLC/SCADA 산업 자동화 트랙
type: entity
created: 2026-06-13
updated: 2026-06-13 3차 (첫 운영 세션 카드 흡수 — Tier 2 확정 + #155220 final 송부 완료 + 시스템 설명서·XG5000 초보자 시리즈 + XGF-PN4B 함정 / 2차: 155220 자료 이관 12MB + skill 4종 + broker 양방향 등록 — 풀 셋업)
tags: [vault, multi-agent, PLC, SCADA, 산업자동화, LS-XGT, uttecMac, EtherCAT, 동아정밀, 위시캣155220]
links: [uttec-search, 위시캣활동, 스마트팩토리, gaps, n8n-uttec]
---

# uttec-plc vault — PLC/SCADA 산업 자동화 트랙

## 한 줄 정의

**UTTEC PLC/SCADA 산업 자동화 트랙의 단일 출처 vault.** uttecMac (Ubuntu 22.04, Tailscale 100.90.158.36) `~/uttec-plc/`, **18th multi-agent** (`uttec-plc-claude`), 2026-06-13 신설 (사용자 직접 지시 — `ssh mac` 경유 skeleton 생성).

## 구조

- CLAUDE.md (정체성·운영 룰) + README.md + log.md
- `_inbox/` pending·processed·outbox-staging + PROTOCOL.md (uttec-search 본 정합화 사본, 양방향 정책 — uttecHome 사건 교훈 적용)
- `raw/` (PLC 매뉴얼·견적·도면) + `작업보고서/`
- git init + 초기 commit (b3f5847) 완료. `.obsidian/` 포함 — Obsidian vault로 즉시 open 가능

## 진입 배경 (기존 자산 연결)

- **위시캣 #155220** — PET 두께 측정기 2호기 PLC/SCADA (동아정밀). 영상·슬라이드·회사소개서 풀세트 기제작 ([[위시캣활동]])
- **위시캣 #155381** — Python 산업 자동화 PC GUI 확장 (PLC 흡수 패턴, [[ai-direction]] 결정 4)
- **LS XGT prefix 혼동 사건** ([[gaps]] 2026-06-10 ⭐⭐⭐) — PLC 견적 오류 재발 방지 박제의 수용처
- **정부 R&D PLC 4축 GMC** 직접 수행 이력 (2016~2017, 특허 10-2017-0138381)

## 2차 셋업 (2026-06-13 — 풀 가동 상태 도달)

- **주 목적 확정** (사용자): ① 동아정밀 #155220 완수 ② **PLC 관련 개발 전문회사의 기틀** 구축
- **자료 이관**: `raw/155220_동아정밀_미팅준비/` 12MB — final 송부 5건 (사양서 v3 EtherCAT 32,562,211원 / S3 권장 36,357,211원) + 빌드 스크립트 파이프라인 (*_생성.py, 차기 견적 재사용) + SCADA 데모 + PLC 프로그래밍 가이드 45K (교재 후보) + LS XGK 매뉴얼. wishketProject 원본 보존 (copy)
- **skill 4종**: work-start/work-end (uttec-search 표준) + vault-start/vault-end (155220 컨텍스트 + myWiki 카드 발송 4기준)
- **inbox hook**: check-inbox.py (SELF_ID=uttec-plc-claude) + settings.json SessionStart
- **broker 양방향 등록** ⭐: pull = `outbox-staging`→`sent-archived` / push = `pending`. **"라우팅 등록까지가 셋업 완료" 원칙의 첫 적용 사례** (n8n 정체 사건 당일 교훈 즉시 반영)
- 신설 문서: `progress/00_프로젝트현황_2026-06-13.md` + `entities/동아정밀.md` (모경덕 책임연구원)
- join 카드 발송: `2026-06-13-005-mywiki-uttec-plc-join` (첫 세션 가이드 포함)

## 3차 — 첫 운영 세션 (2026-06-13, uttec-plc-claude 카드 `2026-06-13-001`)

- **Tier 2 확정** (사용자 결단 2026-06-13) — 활성 영업(#155220 수주 대기) + 장기 트랙(PLC 회사 기틀)
- **#155220 final 5건 송부 완료** → 동아정밀 회신·수주 결정 대기 ([[위시캣활동]] § 2026-06-13)
- **시스템 구조 설명서** `docs/system-overview/index.html` (66KB 단일 HTML, 12 섹션) + **XG5000 초보자 시리즈 1회차** (Modbus TCP 슬레이브 13단계, §13~§20 회차 계획) — 차기 견적 부속 자료 재사용 + 교재 자산화 후보
- **함정 박제 ⭐⭐**: XGF-PN4B(EtherCAT 마스터)는 SCADA 통신 불가 → [[gaps]] 2026-06-13 (3차) 흡수
- GitHub `ihong9059/uttec-plc` private repo 생성 + http.server 8088 라이브 (`100.90.158.36:8088`)

## 미확정 (사용자 결단 대기)

- 같은 PC sibling (uttec-vault·uttec-search·uttec-rag-local) pull 라우팅 등록 (작업보고서 todo #24)

## 관련 페이지

- [[uttec-search]] — 같은 호스트 sibling vault (PROTOCOL 원본)
- [[스마트팩토리]] — 산업 자동화 데모 자산
- [[위시캣활동]] — PLC 외주 파이프라인
