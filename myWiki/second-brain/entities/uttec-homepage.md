---
title: UTTEC 홈페이지 (uttecHome vault)
type: entity
created: 2026-04-19
updated: 2026-05-19
tags: [웹, 홈페이지, 회사, vault, Tier3, Obsidian]
links: [me, skills, 서버인프라, 영업전략, lemonLabs, onDevice-ai]
---

# UTTEC 홈페이지 (uttecHome vault)

## 한 줄 정의
UTTEC 회사 소개 웹사이트 — 2026-05-19 **Tier 3 vault** 분리 (`C:\todo\uttecHome\`) + **Obsidian second-brain 도입**. BLE Mesh + LoRa + AI 기술과 6개 사업 솔루션을 데이터 기반으로 노출.

## 위치 / Git
- **실제 위치**: `C:\todo\uttecHome\` (5/19 today 외부로 분리)
- **today junction**: `C:\todo\today\homepage` → `C:\todo\uttecHome` (호환성)
- **myWiki junction**: `myWiki/raw/회사소개/` → 이중 traversal로 자동 연결
- **GitHub**: `ihong9059/uttecHome` (private, 5/19 신설; 구 `uttecHome-backup`는 제거)

## 기술 스택
- Next.js 14.2 + React 18 + TypeScript 5
- Tailwind CSS 3
- 컴포넌트 10개: Hero · About · Technology · Solutions · Partners · Global · Clients · History · Contact · Navbar/Footer
- **JSON 데이터 레이어** (`src/data/`) — Obsidian 노트(`second-brain/entities/`)에서 빌드 스크립트로 자동 추출
- 파티클 네트워크 애니메이션 + 사례연구 HTML 자동 생성
- DigitalOcean 포트 7777 배포 (5/19 기준 24일 정체 → 재배포 대기)

## 회사 프로필 (5/19 정합성 갱신)
- **핵심 기술 4종**: BLE Mesh · **LoRa** (신규 강조) · 초저전력 · AI
- **사업 영역 6개**: 조명제어 · 주차장 · 스마트팜 · 스마트팩토리 · **AI FanStick(응원봉)** · AI 교육
- **정체성**: "BLE Mesh 네트워크 전문기업" → **"임베디드 + 교육 + AI 시대 전환"** 확장
- **협업 명시**: lemonLabs 4 트랙 (이진서×UTTEC) 별도 Partners 섹션
- **회사소개서**: 4종 PDF/HTML (web 컨텐츠 갱신 후 재생성 대기)

## Vault 구조 (5/19 Obsidian 도입)
```
uttecHome/
├── CLAUDE.md                         # vault schema
├── second-brain/
│   ├── CLAUDE.md / index.md / log.md / me.md
│   ├── entities/
│   │   ├── tech/{ble-mesh,lora,ai,저전력}.md (4)
│   │   ├── solutions/*.md (6)
│   │   ├── clients/*.md (19 = 14 web + 5 신규)
│   │   └── partners/lemonLabs.md
│   └── thoughts/2026-Q2/
├── uttec-web/                        # Next.js 앱
│   ├── scripts/build-data.mjs        # 노트 → JSON 변환
│   └── src/data/*.json               # 5 JSON (identity/tech/solutions/clients/partners)
├── 회사소개/                          # PDF/HTML (4종)
└── 작업보고서/                        # _folder_work_template 적용 (work-start/work-end)
```

## 5/19 진행 (megasession)
- Phase A: vault 스켈레톤 (`345b57e`)
- Phase B: 30 atomic notes (`7106224`)
- Phase C-1~6: data layer + 6 컴포넌트 갱신 (`bd9e986` ~ `c7e3495`)
- 정합성 갭 7건 모두 web 반영 (LoRa 추가, AI FanStick 신설, 정체성 확장, Partners 신설 등)
- 로컬 dev `http://localhost:7777` 검증 OK

## 미완료
- DigitalOcean 7777 재배포 (Tailscale `100.94.160.121` 또는 직접 `178.128.90.37`)
- 회사소개서 PDF 갱신 (`convert_pdf.py`)
- 5 신규 client 노출 결정 (REVITA · 한림용인CC · 한국기계 · 태명과학 · Xerix)

## 관련 페이지
- [[me]]: 회사 정체성 (정체성 확장의 source)
- [[영업전략]]: 마케팅 채널
- [[skills]]: Next.js · Tailwind · Remotion
- [[서버인프라]]: DO 포트 7777
- [[lemonLabs]]: Partners 섹션 source
- [[onDevice-ai]]: AI FanStick 사업 영역 source
