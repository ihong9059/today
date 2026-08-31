---
title: vault-registry — 전체 vault 레지스트리 (단일 출처)
type: entity
created: 2026-06-13
updated: 2026-09-01 2차 (수주 delivery 실행 vault 카테고리 신설 — livecow + **binschans-coffee**(#157726 계약 완료·착수) + **plc-retrofit**(#157744 carrier 골격·특허 UT-P-2026-001) + 전달용 kit **특허이관_UT-P-2026-001**(홍광삼·장민하) 등재 / 이전 2026-09-01 (수주 delivery 실행 vault 카테고리 신설 — livecow(#156763) + **binschans-coffee(#157726 원두 커피 머신 제어보드, 계약 완료·계약금 수령·개발 착수)** 등재. broker 미합류 경량 delivery, 양산 확정 시 승격 / 이전 2026-08-14 (전달용 독립형 kit 2종 등재 — jangminha-kit·livecow-cost-kit, broker 없는 standalone 카테고리 신설. 홍광선/홍광삼 인물 혼동 주의 박스) / 2026-06-13 2차 (옵시디언 열람 정책 3분류 박제 + A군 4 vault 보관함 등록 + workspace.json gitignore 정비 / 신설 — 18-vault 전수 확인 기반. n8n broker 누락 사건 교훈: vault 목록 단일 출처 부재가 silent 단절의 토양)
tags: [vault, multi-agent, registry, broker, 인프라, 단일출처]
links: [ai-direction, gaps, n8n-uttec, uttec-plc, 2026-06-13_tailscale-only-polling-표준-n8n-cascade]
---

# vault-registry — 전체 vault 레지스트리

## 한 줄 정의

**myWiki 연관 전체 vault의 단일 출처.** 신규 vault 합류·호스트 변경·broker 라우팅 변경 시 **본 페이지를 반드시 갱신**한다. (2026-08-22 기준 — myWiki hub 포함 23개 multi-agent vault / 4 호스트. 23rd = guksa 합류(국사 역학관계 교육, 첫 교양·인문 교육 콘텐츠 vault + 이식성 강조). 22nd = jangminha 합류(장민하 AI 프로젝트 학습·협업, 첫 인물-멘토링 vault), 21st = weflo(Weflo #157235 DAQ 실행), 20th = uttec-academy, 19th = lora. + **2026-08-14: 전달용 독립형 kit 2종**(jangminha-kit·livecow-cost-kit) 별도 등재 — broker 없는 standalone, 아래 § "전달용 독립형 kit" 참조)

> ⚠️ 신설 동기: n8nUttec broker 라우팅 누락으로 카드 5장이 한 달간 silent 정체 (2026-06-13 발견). vault 목록·라우팅의 단일 출처가 없어 "추후 추가 후보" 주석이 잊혔다. 본 레지스트리가 그 재발 방지 장치.

## Hub

| # | vault | agent | 위치 | 역할 |
|:-:|---|---|---|---|
| 1 | **myWiki** | mywiki-claude | `C:\todo\today\myWiki\` | **main hub** — 5단계 흡수·broker·cascade 주도 |

## Windows 본 PC (myhome-lenovo, `C:\todo\…`) — 15

| # | vault | agent | 합류 | 역할 | broker |
|:-:|---|---|:-:|---|:-:|
| 2 | revitaProject | revita-claude | ~5월 초 | REVITA 제품 (LoRa·KC·양산·ingest 사이클) | push✅ / pull: 직접 카드 |
| 3 | onDevice_AI | ondevice-claude | 5/15 | AI FanStick + Stage 4 제품 통합 (mac에 원격 사본) | 양방향✅ (`_outbox/`) |
| 4 | wishketProject | wishket-claude | 5월 중순 | 위시캣 외주 파이프라인 | push✅ |
| 5 | lemonLabs | lemonlabs-claude | 5/19 | 창업 트랙 | push✅ |
| 6 | uttecHome | uttechome-claude | 5월 | 회사 홈페이지 (DO 이관 보류) | push✅ |
| 7 | search (9th) | search-claude | 5/21 | AI 검색 web (FastAPI+React, Tier 3) | push✅ |
| 8 | weldRobot (14th) | weldrobot-claude | 6/6 | 용접 로봇 신사업 (carrier 2번째) | 양방향✅ |
| 9 | ponet (15th) | ponet-claude | 6/6 | Ponet 광주 협력 (조대홍, carrier 3번째) | 양방향✅ |
| 10 | factory (16th) | factory-claude | 6/10 | 공장 자동화 사업화 (분쇄·파쇄, carrier 4번째, **비-git** → /backup 의존) | 양방향✅ |
| 11 | tabM9 (17th) | tabm9-claude | 6/6 | Tab M9 모바일 노드 (dumb terminal, Termux) | 양방향✅ |
| 19 | **lora (19th)** | lora-claude | 6/13 | **LoRa 기술 전문 hub** — 한림·shield·revita·factory 응용에서 기술 근거 횡단 집약 → 사업방향 cascade (현장 hardware 작업 ❌, 기술 검토·SOP·근거만) | 양방향✅ (`outbox-staging/`→`sent-archived/`) |
| 20 | **uttec-academy (20th)** | uttec-academy-claude | 6/17 | **교육 운영·발전 hub** — UTTEC 자체 kit 기반 오프라인 실습 교육사업의 운영·행정·강사·차수 개선 단일 출처. 미래창의 아카데미 3차(7/15~) 자료. 기술 진실은 uttec-factory·lora·onDevice 참조 | 양방향✅ (`outbox-staging/`→`sent-archived/`) |
| 21 | **weflo (21st)** | weflo-claude | 8/4 | **Weflo #157235 고정밀 DAQ 실행 hub** — Weflo(한화 스핀오프·Gartner Physical AI) 향 STM32H745 듀얼코어 ADC/RPM 계측보드(3천만/10주) 수주→회로/PCB→펌웨어→검수 실행. wishket(영업)에서 졸업한 실행 vault. 홍광선+임호균 2인 R&R + 다중 협력사. 클라이언트 [[weflo]] entity 참조 | 양방향✅ (`outbox-staging/`→`sent-archived/`) |
| 22 | **jangminha (22nd)** | jangminha-claude | 8/9 | **장민하 AI 프로젝트 학습·협업 vault** — 홍광선 삼성 후배 장봉진 따님(건국대 토목·취준·AI 입문자)의 AI 프로젝트 진행 + 전문분야 개척 공간. 하이브리드 설계: 입문자 친화 한글 폴더(research-johyekyung 선례) + 허브 연결 `_inbox`(weflo 선례). 첫 인물-멘토링 협업 vault. [[project_jang_minha_intern]] · [[jangminha]] entity 참조 | 양방향✅ (`outbox-staging/`→`sent-archived/`) |
| 23 | **guksa (23rd)** | guksa-claude | 8/22 | **국사(한국사) 역학관계 교육 vault** — 역사를 암기가 아니라 "인과·역학관계의 과정"으로 재구성해 학습·강의준비. 방법론 심장 = 6-렌즈 프레임(전사→조건→발단→전개→역학→파급) + 삼국통일 시범모듈. **이식성 강조**(폴더째 복사 시 타 전문가 PC 동작, `.claude/` 포함). 첫 교양·인문 교육 콘텐츠 vault. jangminha 하이브리드 패턴 계승. [[project_guksa_history_edu]] · [[guksa]] entity 참조 | standalone 우선 (broker 미등록, `_inbox` 채널만 준비) |

## 수주 delivery 실행 vault (본 PC, broker 미합류·경량) ⭐

> 위시캣 등 **수주 후 개발/진단 실행**(또는 수주 전 기술·특허 골격)만 담당하는 독립 vault. multi-agent broker(`_inbox`)에 합류하지 않고(경량, SELF_ID 없음) 자체 `work-start`/`work-end` skill + git으로 운영. 영업 cycle은 `wishketProject`, 결과 마일스톤만 myWiki `위시캣활동`에 수동 cascade. **양산 반복·볼륨 팽창·수주 확정 시 Tier 승격 + broker 합류 재검토**. (weflo(21st)는 이 단계에서 졸업해 정식 합류한 사례.)

| vault | 위치 | 원 건 | 성격 | 생성 |
|---|---|---|---|:-:|
| **livecow** | `C:\todo\livecow` | 위시캣 #156763 (축산 LoRaWAN 수신율) | 진단·개선 delivery(경량). NDA=BNOW/CBNU | 7/17 |
| **binschans-coffee** | `C:\todo\binschans-coffee` | 위시캣 #157726 (원두 커피 머신 제어보드) | **제품 개발 delivery** Tier 2 — 회로+아트웍+STM32G0 펌웨어+PC 테스트툴+KC, 750만/10주. 발주사 빈스찬스(정수빈)=**양산 우선 장기 파트너**. client 기존 펌웨어·회로도 99MB immutable·gitignore(NDA) | **9/1** |
| **plc-retrofit** | `C:\todo\plc-retrofit` | 위시캣 #157744 (터널 천공 PLC 대체) | **노후 PLC 레트로핏 신사업 carrier**(Tier 3, carrier 5번째) — **수주 전 골격**(SELF_ID 미부여). scope = 사업정의·2-B 아키텍처·**특허**(UT-P-2026-001)·수주선결 PoC. 수주 확정 시 full 셋업·합류. uttec-plc는 기술 cross-link만 | **9/1** |

## uttecMac (`ssh mac`, Tailscale 100.90.158.36, Ubuntu 22.04) — 5

| # | vault | agent | 합류 | 역할 | broker |
|:-:|---|---|:-:|---|:-:|
| 12 | n8nUttec (`~/project/n8nUttec/`) | n8n-claude | 5/16 | n8n 자동화 학습·사업화 | 양방향✅ (6/13 등록, `pending_outbound/`→`sent/`) |
| 13 | uttec-vault (`~/uttec-vault/`) | uttec-vault-claude | 5/23 | 비즈니스 hub L2 (7영역 ERP/CRM lite) — git+CI | ❌ 미등록 (**todo #24**, `outbox/` 컨벤션 — underscore 없음) |
| 14 | uttec-search (10th, `~/uttec-search/`) | uttec-search-claude | 5/23 | 검색 web cross-platform fork (portability 1차 실증) | ❌ 미등록 (todo #24) |
| 15 | uttec-rag-local (11th, `~/uttec-rag-local/`) | uttec-rag-local-claude | 5/24 | 검색 로컬 LLM판 (Ollama, 비용 0) | ❌ 미등록 (todo #24) |
| 16 | **uttec-plc (18th, `~/uttec-plc/`)** | uttec-plc-claude | 6/13 | 동아정밀 #155220 + **PLC 개발 전문회사 기틀** | 양방향✅ (`outbox-staging/`→`sent-archived/`) |

## 원격 RPi 호스트 — 2

| # | vault | agent | 호스트 | 역할 | 상태 |
|:-:|---|---|---|---|---|
| 17 | uttec-factory (13th) | uttec-factory-claude | factory-rpi4 (100.109.84.79 / LAN 192.168.0.23) | UTTEC Shield 공장자동화 교육 + hardware 검증 | 양방향✅ (`_inbox/outbound/`) |
| 18 | shield | shield-claude | shield-rpi4 (100.110.51.14) | RPi shield 보드 응용 (LoRa·RS485·MESH) | ⚠️ **호스트 offline** (6/13 확인, n8n발 카드 1장 전달 보류) |

## 전달용 독립형 kit (standalone — broker 없음, 비-multi-agent) ⭐

> 특정 인물에게 **인도**하기 위한 자체완결 vault. multi-agent 통신(broker·_inbox)에 참여하지 않고, 폴더 안 `CLAUDE.md` + 로컬 `work-start`/`work-end` skill만으로 어느 PC에서든 독립 동작. 주고받기는 `_홍광선께_보낼것/`·`_홍광선께_받은것/` 폴더(오프라인). myWiki는 상태·결정만 인지(운영 디테일 불요).

| kit | 위치 | 인도 대상 | 짝 hub | 목적 | 생성 |
|---|---|---|:-:|---|:-:|
| **jangminha-adc-kit** | `C:\todo\jangminha-adc-kit` | 장민하 (토목·AI 입문자) | jangminha (22nd) | weflo 회로/PCB(ADC 보드) 프로젝트 완수 전용 — 구 jangminha-kit, 8/19 리네임 | 8/9 |
| **livecow-cost-kit** | `C:\todo\livecow-cost-kit` | **홍광삼 (UTTEC 관리팀장)** | 없음 (kit 단독) | **livecow(#156763) 차기모델 제조원가(PCB ASS'Y 판가) 산출** — EasyEDA·LCSC·JLCPCB. 방법론 6단계 + Cow-Ver70/통합IC BOM 이관. 자체 git repo(NDA: BNOW/CBNU, 공개 push 금지) | **8/14** |
| **특허이관_UT-P-2026-001** | `Downloads\특허이관_UT-P-2026-001_터널천공자동화` | 홍광삼·장민하 | [[plc-retrofit]] | **UT-P-2026-001**(터널 막장 정면영상 AI 천공위치 표시 + 티칭-재생 자동 천공) 특허 발명신고서·명세서 초안 이관. self-contained(README·CLAUDE·skill·git 86e1358). 🔴 **미출원·공개금지**(신규성 보호) | **9/1** |

> ⚠️ 인물 혼동 주의: **홍광선**=UTTEC 대표(본인) / **홍광삼**=UTTEC 관리팀장(별개 인물, Claude 어느정도 사용). [[user_name_hong_kwangsun]] 참조.

## broker 라우팅 단일 출처 (코드)

- **pull** (분산→myWiki): `today/.claude/hooks/pull-multi-agent-outbound.py` — REMOTE_VAULTS + LOCAL_VAULTS
- **push** (myWiki→분산): `today/.claude/hooks/push-multi-agent-pending.py` — REMOTE_VAULTS + LOCAL_VAULTS
- vault별 outbound 컨벤션이 **상이함** (위 표 괄호 참조): outbox-staging / pending_outbound / outbound / _outbox / outbox — 등록 시 실제 디렉토리 확인 필수

## 옵시디언 열람 정책 (2026-06-13 결정, 3분류) ⭐

> **원칙**: 기본은 ".obsidian 등록"이 아니라 **"옵시디언-호환 규약"** (markdown + YAML frontmatter + `[[링크]]`) — 이것만 지키면 Claude 협업은 옵시디언 없이 완전 동작한다. 옵시디언 등록은 **사람의 열람·검토 창구**가 필요한 vault에만 한다 (LLM Wiki 모델의 "사람=판단·편집" 절반을 살리는 장치 — 미등록 A군 = blind trust 위험).

| 군 | 기준 | vault | 보관함 등록 |
|:-:|---|---|:-:|
| **A** 사람-사유 | 사용자가 주기적으로 읽고 결단 | myWiki(필수) · onDevice_AI · factory · weldRobot · ponet · uttec-plc · lora · uttec-academy · **weflo** · revitaWiki(sub) · n8nUttec | ✅ (로컬 6/13 등록 완료, 원격 2는 sshfs. lora 6/13 · uttec-academy 6/17 · weflo 8/4 추가) |
| **B** 기계-운영 | Claude가 사실상 유일 reader | search · uttec-search · uttec-rag-local (코드베이스) · shield · uttec-factory · tabM9 · uttec-vault | ❌ 불필요 |
| **C** 산출물 보관 | 가끔 결과물 확인 | wishketProject · lemonLabs · uttecHome | 필요 시 그때 열기 |

- **Obsidian 보관함 등록부** = `%APPDATA%\obsidian\obsidian.json` (`/wiki-clean`으로 제거 가능). 6/13 등록: factory · weldRobot · ponet · onDevice_AI 추가 (백업: `obsidian.json.bak-20260613`)
- **원격 vault 열람** = Windows Obsidian + sshfs 패턴 (n8nUttec 5/18 실증). mac에 Obsidian 앱 미설치
- **git 노이즈 방지**: `.obsidian/workspace*.json`은 gitignore (열 때마다 변경됨). 나머지 `.obsidian/` 설정은 추적 허용
- ~~잔재 정리 후보: 보관함의 testWiki · uttecBizWiki(deprecated) · 태명과학~~ → ✅ 6/13 `/wiki-clean`으로 제거 완료 (사용자 승인, 폴더 보존). 현 보관함 8개 = myWiki·revitaWiki·uttecHome·search·factory·weldRobot·ponet·onDevice_AI

## 신규 vault 합류 체크리스트 ⭐ (셋업 완료의 정의)

1. vault 골격 (CLAUDE.md + _inbox PROTOCOL + log) + skill (work/vault-start/end)
2. check-inbox.py (SELF_ID) + settings.json SessionStart hook
3. **broker pull+push 라우팅 등록** (스크립트 2개) — "추후 추가" 주석 금지, 즉시 등록
4. **본 레지스트리에 행 추가** + `entities/{vault}.md` 신설 + index.md 등재
5. join 카드 발송 + push 도착 검증
6. myWiki log.md ingest 박제
7. **옵시디언 3분류 판정** — A군이면 보관함 등록 (+ `.obsidian/workspace*.json` gitignore), B/C군이면 skip

→ 1~7 전부 완료 = 셋업 완료. (uttec-plc 6/13이 첫 완전 적용 사례)

## vault가 아닌 연관 항목 (혼동 방지)

| 항목 | 정체 |
|---|---|
| 한림용인CC 고가수조 | Tier 2 sub-vault (today 내부, multi-agent 아님) |
| uttecBizWiki | 5/15 deprecated → onDevice_AI/business/ 흡수. ✅ 6/13 잔재 폴더 삭제 완료 (entity는 redirect anchor로 보존) |
| ~~testWiki~~ | 테스트 잔재 → ✅ 6/13 폴더 삭제 완료 |
| galaxy-a51-5g | 디바이스 노드 entity (tabM9 자매, vault 아님) |
| ubuntu .36 (192.168.0.36) | 신규 머신 — vault 미설치 (alias 결단 대기) |
| oldProject | 과거 프로젝트 아카이브 repo (vault 아님) |

## 관련 페이지

- [[2026-06-13_tailscale-only-polling-표준-n8n-cascade]] — 신설 동기 사건 (silent cascade 단절)
- [[ai-direction]] 결정 49·50 부수 — "라우팅 등록까지가 셋업 완료" 원칙
- `myWiki/_inbox/SYSTEM_GUIDE.md` — 카드 PROTOCOL·합의 이력 (통신 규약 측 단일 출처)
- 개별 vault entity: [[uttec-plc]] [[n8n-uttec]] [[uttec-search]] [[uttec-factory]] [[shield]] [[onDevice-ai]] [[weldRobot]] [[ponet]] [[factory]] [[tabM9]] 등
