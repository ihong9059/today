---
title: UTTEC 홈페이지 (uttecHome vault)
type: entity
created: 2026-04-19
updated: 2026-05-21 (uttechome-claude 8th 합류 + Phase D/E megasession 완료 — _inbox 통신 인프라 + 5/15 이후 cascading 차단 해소)
tags: [웹, 홈페이지, 회사, vault, Tier3, Obsidian, multi-agent, uttechome-claude, Phase-D-E]
links: [me, skills, 서버인프라, 영업전략, lemonLabs, onDevice-ai, ai-fanstick, uttec-stage-package, 정부R&D실증사업]
---

# UTTEC 홈페이지 (uttecHome vault)

## 한 줄 정의
UTTEC 회사 소개 웹사이트 — 2026-05-19 **Tier 3 vault** 분리 (`C:\todo\uttecHome\`) + **Obsidian second-brain 도입** + 2026-05-21 **uttechome-claude 8th multi-agent 합류 (Phase D/E)**. BLE Mesh + LoRa + AI 기술과 6개 사업 솔루션을 데이터 기반으로 노출.

## 위치 / Git
- **실제 위치**: `C:\todo\uttecHome\` (5/19 today 외부로 분리)
- **today junction**: `C:\todo\today\homepage` → `C:\todo\uttecHome` (호환성)
- **myWiki junction**: `myWiki/raw/회사소개/` → 이중 traversal로 자동 연결
- **GitHub**: `ihong9059/uttecHome` (private, 5/19 신설; 구 `uttecHome-backup`는 제거)
- **Multi-agent 식별자**: `uttechome-claude` (5/21 8th 합류)

## 기술 스택
- Next.js 14.2 + React 18 + TypeScript 5
- Tailwind CSS 3
- 컴포넌트 10개: Hero · About · Technology · Solutions · Partners · Global · Clients · History · Contact · Navbar/Footer
- **JSON 데이터 레이어** (`src/data/`) — Obsidian 노트(`second-brain/entities/`)에서 빌드 스크립트로 자동 추출
- 파티클 네트워크 애니메이션 + 사례연구 HTML 자동 생성
- DigitalOcean 포트 7777 배포 — **사용자 5/20 결정으로 보류** (local 정리 완료 후 적용)

## 회사 프로필 (5/19 정합성 갱신)
- **핵심 기술 4종**: BLE Mesh · **LoRa** (신규 강조) · 초저전력 · AI
- **사업 영역 6개**: 조명제어 · 주차장 · 스마트팜 · 스마트팩토리 · **AI FanStick(응원봉)** · AI 교육
- **정체성**: "BLE Mesh 네트워크 전문기업" → **"임베디드 + 교육 + AI 시대 전환"** 확장
- **협업 명시**: lemonLabs 4 트랙 (이진서×UTTEC) 별도 Partners 섹션
- **회사소개서**: 4종 PDF/HTML (web 컨텐츠 갱신 후 재생성 대기)
- **5/21 정체성 보강 후보** (Phase F web 결정 대기): 정부 R&D 실증 1억 직접 수행 + 기업부설연구소 C0442235 + 특허 10-2017-0138381 ([[정부R&D실증사업]])

## Vault 구조 (5/21 갱신 — Phase D/E 후)
```
uttecHome/
├── CLAUDE.md                         # vault schema + 양방향 흡수 정책 (5/21)
├── _inbox/                           # ⭐ NEW 5/21 (Phase D)
│   ├── pending/ processed/ outbox-staging/
│   └── PROTOCOL.md                   # 8 vault 사본
├── .claude/hooks/check-inbox.py      # SELF_ID="uttechome-claude" (5/21)
├── second-brain/
│   ├── CLAUDE.md / index.md / log.md / me.md
│   ├── entities/
│   │   ├── tech/{ble-mesh,lora,ai,저전력}.md (4) — ai.md 5/21 갱신 (onDevice 검증 누적 + 갭 #9)
│   │   ├── solutions/*.md (6→7) — ai-fanstick 5/21 갱신 + uttec-stage-package 5/21 신설 (Phase E)
│   │   ├── clients/*.md (19→20) — 정부R&D실증사업 5/21 신설 (Phase E)
│   │   └── partners/lemonLabs.md
│   └── thoughts/2026-Q2/
├── uttec-web/                        # Next.js 앱
│   ├── scripts/build-data.mjs        # 노트 → JSON 변환
│   └── src/data/*.json               # 5 JSON (identity/tech/solutions/clients/partners)
├── 회사소개/                          # PDF/HTML (4종)
└── 작업보고서/                        # _folder_work_template 적용 (work-start/work-end)
```

## Phase 진행 (5/21 갱신)

| Phase | 일자 | 상태 | 산출 |
|:-:|:-:|:-:|---|
| A | 5/19 | ✅ | vault 스켈레톤 |
| B | 5/19 | ✅ | 30 atomic notes |
| C-1~6 | 5/19 | ✅ | data layer + 6 컴포넌트 갱신 (갭 7건 web 반영) |
| **D** | **5/21** | ✅ | ⭐ multi-agent `_inbox/` 도입 (PROTOCOL + check-inbox.py + 양방향 CLAUDE.md) |
| **E** | **5/21** | ✅ | ⭐ 누락 신기술 megasession (5/15 이후 5일치 cascading 차단 해소) — ai-fanstick·tech/ai 갱신 + uttec-stage-package·정부R&D실증사업 신설 + 갭 7→9 |
| F | (다음) | ⏳ | Phase E 박제 갭 #6/#7/#8/#9 web 반영 의사결정 |

## 5/21 Phase D/E megasession 결과 (사용자 진단 후 옵션 A 진행)

**사용자 지적**: "왜 새로 진행되는 신기술이 web page에 적용되지 않도록 되어있나? 상대 vault는 myWiki에 영향 주는 작업 안 함이 원칙이라 이 vault에서 적극 반영해야 함."

**구조적 결함 3가지 해소**:
1. uttecHome `_inbox/` 미도입 (Phase D 미진행) → 카드 발송할 곳 없음 → **해소**
2. CLAUDE.md send-only → cascading 비대칭 → **양방향 흡수 정책으로 해소**
3. 5/19 이후 active session 0 → pull도 0 → **uttechome-claude 8th 합류 + work-start/end 진입**

**5/15 이후 누락 박제 완료**:
- Round 11/12/17/17.5 ESP-DSP 결정타 흡수
- AI FanStick 양산 방향 재전환 (C3→S3+DSP+PSRAM SLM)
- Stage 4 영업 자산 8건 표
- 정부 R&D 1억 직접 수행 자료

**회신 카드 5장 직접 발송**: mywiki / ondevice / wishket / lemonlabs / revita. 2장 staging: n8n / shield (SSH 불가).

## 갭 7→9건 진화 (uttecHome 측 박제)

| # | 영역 | 상태 |
|:-:|---|:-:|
| 1 | LoRa 라인 누락 | ✅ 5/19 노트 + Phase C |
| 2 | AI FanStick 사업 영역 | ✅ 5/19 노트 + Phase C |
| 3 | AI 교육 추상 | ✅ 5/19 노트 + Phase C |
| 4 | Smart Factory 차별화 + Technology.tsx AI 카드 4 응용 | ✅ 5/19 노트 + 5/21 tech/ai 갱신 |
| 5 | 정체성 표현 | ✅ 5/19 카피 |
| 6 ⭐ | 정부 R&D 실증 자산 미노출 | ✅ 5/21 노트 (Phase F 결정 대기) |
| 7 ⭐ | UTTEC 영업 패키지 4.5-Stage 미노출 | ✅ 5/21 노트 (Phase F 결정 대기) |
| 8 ⭐ | AI FanStick 차세대 양산 방향 (S3+DSP+PSRAM SLM) | ✅ 5/21 노트 (Phase F 결정 대기) |
| 9 ⭐ | onDevice AI 검증 결과·결정타 web 노출 | ✅ 5/21 노트 (Phase F 결정 대기) |

## 미완료

- **Phase F** — 갭 #6/#7/#8/#9 web 반영 의사결정 (사용자 confirm 필요)
- DigitalOcean 7777 재배포 (사용자 5/20 보류, local 정리 완료 후 적용)
- 회사소개서 PDF 갱신 (`convert_pdf.py`) — 정체성 보강 (정부 R&D + 기업부설연구소) 반영 후
- 5 신규 client 노출 결정 (REVITA · 한림용인CC · 한국기계 · 태명과학 · Xerix) — Phase C-6에서 일부 작업, Phase F 종합 결정

## 관련 페이지
- [[me]]: 회사 정체성 (정체성 확장의 source)
- [[영업전략]]: 마케팅 채널 + Tier 3 비용 압축 패턴 (5/21)
- [[skills]]: Next.js · Tailwind · Remotion
- [[서버인프라]]: DO 포트 7777 (보류)
- [[lemonLabs]]: Partners 섹션 source (5/22 옵션 결정 대기)
- [[onDevice-ai]]: AI FanStick 사업 영역 source (5/21 갱신 — Round 17/17.5)
- [[ai-fanstick]]: 솔루션 source (5/21 양산 방향 재전환)
- [[uttec-stage-package]]: 솔루션 source (5/21 ESP-DSP 24.8× 카피)
- [[정부R&D실증사업]]: 회사 정체성 보강 자산 (5/21 신설)
