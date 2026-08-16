---
title: 장민하 — AI 프로젝트 협업 (jangminha vault, 22nd)
type: entity
created: 2026-08-09
updated: 2026-08-17
tags: [사람, 협업, 교육, vault, 멘토링, 토목]
links: [vault-registry, uttec-academy, ai-direction, strengths, weflo]
---

# 장민하 — AI 프로젝트 협업 파트너

## 한 줄 정의

**홍광선의 삼성 직장후배 장봉진의 따님.** 건국대 토목공학과 졸업, 취업 준비 중, AI 완전 입문자.
2026-08-06 홍광선이 AI 프로젝트를 맡겨보기로 결정 → 2026-08-09 **전용 vault(`jangminha`, 22nd) 신설**로 본격 협업 개시.
**첫 프로젝트 확정 = [[weflo]] 계측보드 Sub PCB 회로/PCB (EasyEDA)** — 실전 수주건 #157235를 "교재"로. 2026-08-17 현재 전원부 설계 왕복 진행 중.

## 사람

| 항목 | 내용 |
|------|------|
| 관계 | 삼성 후배 **장봉진**의 따님 |
| 학력 | 건국대 **토목공학과** 졸업 |
| 현황 | 취업 준비 중 |
| AI 수준 | 완전 입문자 (교육 이수 후 첫 실전) |
| 강점 접점 | 토목 — 수위·물흐름·구조진동·도면·설비·측량 |

> ⚠️ 개인정보(전화·주소 등) 임의 생성 금지 — [[feedback_no_fabricated_user_data]].

## 교육 배경

- `C:\todo\today\aiStudy\커리큘럼\` — 4 Track (업무활용 2주 / 프로그래밍 4주 / 시스템구축 4주 / AI전문가 4주)
- `C:\todo\today\aiStudy\introductionAi\` — AI 입문
- 장민하 본인 제작 자료: `C:\todo\today\장민하\작품\2026-04-23\AI_교육과정_간단본.md` (친구 대상 8주 입문 커리큘럼 — 스스로 정리한 학습 결과물)
- 2026-08-06 프로젝트 소개자료: `C:\Users\lenovo\Downloads\UTTEC_AI프로젝트_소개_장민하님.html` (6개 vault 입문자 눈높이 소개 + 선택 양식)

## vault (jangminha, 22nd)

- 위치: `C:\todo\jangminha\` — SELF_ID=`jangminha-claude`
- **하이브리드 설계**: 입문자 친화 한글 폴더(`00_대시보드`~`04_질문_인박스`, [research-johyekyung](file:///c:/todo/research-johyekyung) 선례) + 허브 연결 `_inbox`/broker(weflo 선례)
- 허브(myWiki) ↔ jangminha 양방향 카드 통신 등록 (push/pull broker)
- 첫 **인물-멘토링 협업 vault** (기존 vault는 제품·사업·교육운영 트랙 — 특정 개인의 학습·성장 트랙은 처음)

### 3-vault 운영 구조 (2026-08-17 정리)

첫 프로젝트(weflo Sub PCB)가 실전 수주건과 얽히면서 **세 vault가 역할 분담**:

| vault | 위치 | 역할 |
|------|------|------|
| **jangminha** (22nd) | `C:\todo\jangminha` | 허브-연결 관리본 (myWiki `_inbox`/broker 자동통신) |
| **jangminha-kit** | `C:\todo\jangminha-kit` | 장민하에게 건네는 **독립 배포본** (오프라인, `_홍광선께_보낼것/받은것/` 폴더 왕복) |
| **portenta-lab** | `C:\todo\portenta-lab` | 홍광선 소유 **엔지니어링 원본(source of truth)** — BOM·NETLIST·설명서·펌웨어 |

> ⚠️ jangminha-kit은 장민하 **사본**이라 원본 수정 금지 — 정정은 반드시 portenta-lab에서. [[weflo]] vault(21st)는 사업 lifecycle 래퍼로 결정만 cascade.

## 현재 상태 (2026-08-17)

- **첫 프로젝트**: [[weflo]] #157235 계측보드 **Sub PCB 회로/PCB 설계** (EasyEDA, 8ch AD7606C-18) 진행 중.
- **최근 왕복**: 8/13 전원부 8건 답변 → 8/16 장민하 FB 저항/정정 카드 → 8/17 홍광선 회신(FB 조정형 확정 U4 560k/100k·U5 976k/100k, 원본 정정 반영, pinout/schematic 정본=portenta-lab 신판).
- **다음 게이트(장민하)**: ①HD 커넥터(80핀×2) 전핀 대조 → 1차 회로도 완성 시 EasyEDA project 홍광선 송부·확인 후 진행 ②전 부품 재고·납기 전수조사 → 전체 BOM 송부.

## 협업 방향

- **단기**: weflo Sub PCB 전원부 → 회로도 완성(HD 핀 확인 게이트) → PCB 레이아웃. AI로 모르는 분야(전자회로)를 끝까지 굴려내는 방법 체득이 진짜 목표.
- **장기**: 토목 전공 강점 × AI로 **전문분야 개척**. UTTEC 프로젝트(LoRa 수조·골프장 물관리·PLC·계측) 접점이 자연스러운 진입로
- 멘토링 원칙: 대신 해주지 않고 스스로 이해·결정하도록 (vault CLAUDE.md §5)

## 관련

- [[vault-registry]] — 22nd 등재
- [[project_jang_minha_intern]] (메모리) — 협업 후보 배경
- [[uttec-academy]] — 교육 커리큘럼 운영 hub (jangminha 교육 자산의 발전 트랙)
- cross-vault: `[[jangminha:README]]`
