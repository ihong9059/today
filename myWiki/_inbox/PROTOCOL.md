# `_inbox/` — Multi-Agent Claude 통신 프로토콜

wishket-claude ↔ mywiki-claude / revita-claude / ondevice-claude / n8n-claude / shield-claude 간 **비동기 메시지 통로**. 사용자가 broker 역할을 하지 않아도 6 Claude가 자동 협업하기 위한 표준.

**합의 일자**: 2026-05-12 (myWiki Claude 제안 + revitaProject Claude ACK). 5 Claude 확장: 2026-05-16. 6 Claude 확장 (wishket-claude): 2026-05-16.

## 구조

```
/home/uttec/project/shield/_inbox/  (또는 다른 vault 동일)
├── pending/          ← 수신측이 처리해야 할 카드
├── processed/        ← 처리 완료 (보존)
└── PROTOCOL.md       ← 본 파일 (6 vault 사본 유지)
```

같은 구조가 다른 5 Claude vault에도 존재. **카드는 수신측 inbox에 작성**한다. 예: wishket-claude가 mywiki-claude에게 보낼 카드 → `C:\todo\today\myWiki\_inbox\pending\...` 에 작성.

## 표준 카드 형식

파일명: `{YYYY-MM-DD}-{NNN}-{slug}.md`
예: `2026-05-16-001-wishket-claude-join.md`

```markdown
---
id: 2026-05-16-001
from: wishket-claude              # mywiki-claude | revita-claude | ondevice-claude | n8n-claude | shield-claude | wishket-claude
to: mywiki-claude
type: request                     # request | acknowledge | done | escalate
priority: normal                  # low | normal | high | urgent
subject: 한 줄 제목
created: 2026-05-16T22:00
expires: 2026-05-23               # 옵션 — 미처리 시 reminder
related:                          # 옵션 — 관련 파일/카드 ID
  - 관련 파일 경로
status: pending                   # pending | in_progress | done | rejected
---

# {subject}

## 컨텍스트
(왜 이 요청인지)

## 요청 / 정보
(상대가 할 일 또는 알아야 할 사실)

## 처리 후 응답 형식
(있다면) ACK 카드 형식 명시
```

## type별 의미

| type | 의미 | 응답 의무 |
|---|---|---|
| `request` | 처리 요청 | ✅ `acknowledge` 또는 `done` 카드로 응답 |
| `acknowledge` | 받음 + 처리 시작 | 처리 완료 시 `done` |
| `done` | 처리 완료 통보 | 응답 불요 (또는 `done` 받음 카드) |
| `escalate` | 한쪽이 처리 못 함 — 사용자 또는 다른 Claude로 위임 | 사용자가 broker |

## priority

| priority | 시점 |
|---|---|
| `low` | 시간 날 때 |
| `normal` | 다음 SessionStart |
| `high` | 즉시 처리 권장 |
| `urgent` | 사용자에게 escalation 고려 |

## 라이프사이클

```
1. 발신측 Claude → 수신측 _inbox/pending/ 에 카드 작성
2. 수신측 SessionStart hook → pending/ 확인 → 미처리 카드 컨텍스트 주입
3. 수신측 Claude 처리:
   - request 받음 → acknowledge 카드 즉시 발신 (옵션)
   - 처리 완료 → done 카드 발신측 inbox에 발신
   - 처리 못함 → escalate 카드 (사용자 broker)
4. 처리 완료 카드 → 수신측 processed/ 로 이동
5. log 기록 (각 vault의 log.md)
```

## 처리 명확화

- **`pending/` 에 있으면 미처리** — 수신측 Claude의 책임
- **`processed/` 에 있으면 처리 완료** — 보존 (감사/추적용)
- **삭제 금지** — 카드는 lifecycle 박제. 1년 후 archive 정책 가능 (추후)

## SessionStart hook 동작

`.claude/hooks/check-inbox.py` (각 Claude 측):
1. `_inbox/pending/*.md` 파일 확인
2. 카드 frontmatter `to:` 가 자기인 카드만 카운트 (보호 — 잘못된 카드 방지)
3. 미처리 카드 있으면 `additionalContext` 로 주입

## escalation 정책

수신측 Claude가 처리 못 하는 경우:
- 카드의 `type` 을 `escalate` 로 변경
- `escalation_reason` 필드 추가 (frontmatter)
- 발신측 inbox로 회신 카드 (또는 그대로 pending/ 유지)
- 사용자가 본문 확인 후 broker 결정

## 확장 — 새 위키/Claude 추가

새 Claude 추가 시:
- 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
- `.claude/hooks/check-inbox.py` 추가 (SELF_ID 변경)
- `.claude/settings.local.json` SessionStart hook 등록
- 카드 frontmatter `to:` 에 새 식별자 추가
- 본 § "합의 이력"에 합류 일자·식별자 등재
- 모든 기존 Claude의 PROTOCOL.md에도 동일 등재 (N Claude 동기화)

**현재 활성 Claude (13 시스템, 2026-05-26~)**:
- `mywiki-claude` — `today/myWiki/` (Windows) — 학습·도구·범 사업 허브
- `revita-claude` — `revitaProject/orgRevita/` (Windows) — REVITA 제품
- `ondevice-claude` — `/todo/onDevice_AI/` (Windows, 5/15 합류) — AI FanStick + Stage 4 제품 통합
- `n8n-claude` — `/home/uttec/project/n8nUttec/` (Ubuntu, 5/16 합류) — n8n 자동화 + UTTEC 영업·사업화 vault
- `shield-claude` — `/home/uttec/project/shield/` on shield-rpi4 (Tailscale 100.110.51.14, LAN 192.168.0.3, 5/16 합류) — RPi shield 응용 개발 (E32-433 LoRa + RS485/422/MESH)
- `wishket-claude` — `wishketProject/` (Windows, 5/16 합류) — 위시캣 영업 자산
- `lemonlabs-claude` — `/todo/lemonLabs/` (Windows, 5/19 합류) — 이진서 협업 신규 법인 (4 트랙)
- `uttechome-claude` — `/todo/uttecHome/` (Windows, 5/21 합류) — UTTEC 회사 홈페이지 + Obsidian second-brain
- `search-claude` — `/todo/search/` (Windows, 5/21 합류) — myWiki AI 검색·정리 web 서비스 (prompt-driven, FastAPI + React + Claude API)
- `uttec-vault-claude` — `~/uttec-vault/` on uttecMac (Ubuntu, 5/23 합류) — UTTEC 비즈니스 second-brain (cross-platform fork base)
- `uttec-search-claude` — `~/uttec-search/` on uttecMac (Ubuntu, 5/23 합류) — uttec-vault 비즈니스 자료 검색 web (search Windows fork) — 10th
- `uttec-rag-local-claude` — `~/uttec-rag-local/` on uttecMac (Ubuntu, 5/24 합류) — uttec-search sibling, Ollama qwen2.5:7b local RAG (port 8892/8893) — 11th
- **`uttec-factory-claude` — `/home/uttec/project/uttec-factory/` on factory-rpi4 (Tailscale 100.109.84.79, LAN 192.168.0.23, 5/26 합류) — UTTEC Shield AI 공장자동화 교육 vault (E22-900T30D LoRa + 9 컴포넌트 + 8일 교육 커리큘럼 + 영업 자산)** ⭐ **13th** (분산 호스트 4 사례 누적: Linux × 3 + 본 PC × 1)
- **`weldrobot-claude` — `C:/todo/weldRobot/` (Windows, 본 PC, 2026-06-06 합류) — UTTEC 용접 로봇 신사업 vault (Tier 3, Path 4 Vision seam tracking + AI 비드 검사 add-on box 우선 진입 + Path 3 AI 자율 path planning 장기 carry)** ⭐ **14th** (carrier 패턴 2번째 적용 사례)
- **`ponet-claude` — `C:/todo/ponet/` (Windows, 본 PC, 2026-06-06 합류) — Ponet 광주 협력 회사 vault (Tier 3, 조대홍 사장, 자체 SSH fact-finding 신설 패턴 첫 사례, PCB 설계 풀세트 + 더존 ERP + 자체 호스팅)** ⭐ **15th** (carrier 패턴 3번째 적용 사례 정착 확정, mywiki strengths §13)
- **`factory-claude` — `C:/todo/factory/` (Windows, 본 PC, 2026-06-10 합류) — UTTEC 공장 자동화 사업화 vault (Tier 3, 1차 진입 = 분쇄·파쇄 설비 도메인 (한국기계 베이스 → 동종 회사 확장), 확장 = 센서+제어 기반 공장 자동화 전반)** ⭐ **16th NEW** (carrier 패턴 4번째 적용 사례, 4국 deep search + 핵심 10사 entity + 한국기계 자산 + smartFactory 자산 이식)

## 합의 이력

- **2026-05-12 단계 1**: myWiki Claude 제안 (옵션 A 단순 메일박스, 외부 `_claude-bus` 중앙 위치 + 표준 카드 형식)
- **2026-05-12 단계 2**: revita Claude 응답 (옵션 A 채택, 위치는 **각 프로젝트 내부 `_inbox/`** 로 조정 — 권한·sync 단순화, self-contained, 향후 확장 동일 패턴)
- **2026-05-12 단계 3**: myWiki Claude 합의 완료 (`done` 카드 회신, 셋업 완료)
- **2026-05-15**: **ondevice-claude 합류** — onDevice_AI vault가 별도 repo 분리(`/todo/onDevice_AI/`, private) + uttecBizWiki 흡수 + multi-agent 합류. SELF_ID="ondevice-claude". 3 Claude 시스템으로 확장. 합류 카드: `revitaProject/_inbox/pending/2026-05-15-001-ondevice-claude-join.md`.
- **2026-05-16**: **n8n-claude 합류** — n8nUttec vault (`/home/uttec/project/n8nUttec/`, Ubuntu 호스트, 별도 git repo 예정) multi-agent 합류. UTTEC n8n 자동화 학습 + 영업·사업화 vault. SELF_ID="n8n-claude". **4 Claude 시스템으로 확장 + 분산 호스트 (Windows ↔ Linux) 검증** + myWikiSetup 시나리오 D 두 번째 적용 사례. 합류 카드: 각 vault `_inbox/pending/2026-05-16-001-n8n-claude-join.md`.
- **2026-05-16**: **shield-claude 합류** — shield vault (`/home/uttec/project/shield/`, RPi Linux, ihong9059/shield private repo) multi-agent 합류. RPi shield 보드 응용 개발. SELF_ID="shield-claude". **5 Claude 시스템으로 확장 + 분산 호스트 3 사례 (Windows × 1 + Linux × 2)** + myWikiSetup 시나리오 D 세 번째 적용 사례. 합류 카드: 각 vault `_inbox/pending/2026-05-16-NNN-shield-claude-join.md`.
- **2026-05-16**: **wishket-claude 합류** — wishketProject vault (`C:/todo/wishketProject/`, Windows, ihong9059/wishketProject private repo) multi-agent 합류. **사업 트랙 vault (영업 자산)** — 위시캣 수주 사이클 + 매출 트래킹. SELF_ID="wishket-claude". **6 Claude 시스템** + 사업 트랙 vault 첫 사례 (기존은 모두 제품 트랙) + 분리 lifecycle 3단계 진화 (분리 → 절대 경로화 → multi-agent 합류) 첫 완전 사례. 합류 카드: 각 vault `_inbox/pending/2026-05-16-NNN-wishket-claude-join.md`.
- **2026-05-19**: **lemonlabs-claude 합류** — lemonLabs vault (`C:/todo/lemonLabs/`, Windows, ihong9059/lemonLabs private repo) multi-agent 합류. **창업 트랙 vault 첫 사례** — 이진서 51% + UTTEC 49% 협업 신규 법인 (AI 응원봉/교육/Consulting/Studio 4 트랙). SELF_ID="lemonlabs-claude". **7 Claude 시스템**. 2027 Q1 법인 설립 + 자산 법적·재무적 분리 필요. 합류 카드: 각 vault `_inbox/pending/2026-05-19-NNN-lemonlabs-claude-join.md`.
- **2026-05-21 오전**: **uttechome-claude 합류** — uttecHome vault (`C:/todo/uttecHome/`, Windows, ihong9059/uttecHome private repo) multi-agent 합류. **영업 트랙 vault 첫 사례** — UTTEC 회사 홈페이지 + Obsidian second-brain (30 atomic notes + JSON data layer). SELF_ID="uttechome-claude". **8 Claude 시스템**. 5/19 vault 분리 후 5/15 이후 cascading 차단 사건 발견 → 양방향 통신 확립. 합류 카드: 각 vault `_inbox/pending/2026-05-21-NNN-uttechome-claude-join.md`.
- **2026-05-21 야간** ⭐: **search-claude 합류** — search vault (`C:/todo/search/`, Windows, ihong9059/search private repo) multi-agent 합류. **사용자 노출 트랙 vault 첫 사례** — myWiki second-brain 위에서 동작하는 prompt-driven 검색·정리·요약 web 서비스 (FastAPI + React + Claude Max CLI subprocess). SELF_ID="search-claude". **9 Claude 시스템**. myWiki 메모리 공유 정책 (5/22, 다른 vault 와 다른 예외 — today 와 거의 동일 수준 운영 위해). search 측 PROTOCOL.md 사본 동기화 + myWiki/raw/search · second-brain/raw/search 역방향 junction + entities/search.md 신설.
- **2026-05-23 야간** ⭐⭐: **uttec-vault-claude + uttec-search-claude 합류 (2 vault 동시)** — uttec-vault (`~/uttec-vault/` on uttecMac, Ubuntu 22.04, Tailscale 100.90.158.36) = UTTEC 비즈니스 second-brain (cross-platform fork base, 5/15 신설). uttec-search (`~/uttec-search/` on uttecMac, Ubuntu) = search Windows fork (10th vault, vault portability 트랙 첫 실증, 8890/8891 port). SELF_ID="uttec-vault-claude" + "uttec-search-claude". **10 Claude 시스템 도달**. cross-platform fork 4 차원 비용 (경로 hardcoding + shell 도구 + path 토큰 + 환경 의존) 정량화 + uv 0.11.16 venv 우회 best practice. broker = 사용자 (scp 또는 사본 path) — 격리 호스트 첫 사례.
- **2026-05-24** ⭐⭐⭐: **uttec-rag-local-claude 합류 (11th)** — uttec-rag-local (`~/uttec-rag-local/` on uttecMac, Ubuntu) = uttec-search sibling, **Ollama qwen2.5:7b local LLM 기반 RAG vault** (비용 0 + 외부 인터넷 0% dogfooding 트랙). port 8892 (frontend) / 8893 (backend). SELF_ID="uttec-rag-local-claude". **11 Claude 시스템 도달**. mywiki-claude 결단 **대안 B 채택** — myWiki 메타 갱신만 (vault 카운트 / entities/uttec-rag-local.md / ai-direction 로그), 디렉토리 신설 + 코드 복제 + Ollama 통합은 uttec-search-claude 위임 (uttec-vault outbox/2026-05-24-003 별도 발송). dogfooding 의도: Claude API (uttec-search) vs Ollama (uttec-rag-local) A/B 비교 1주.
- **2026-06-10** ⭐⭐⭐: **factory-claude 합류 (16th)** — factory (`C:/todo/factory/`, Windows, 본 PC, 2026-06-10 합류) = **UTTEC 공장 자동화 사업화 vault** (Tier 3, 1차 진입 = 분쇄·파쇄 설비 도메인 (한국기계 베이스 → 동종 회사 확장), 확장 = 센서+제어 기반 공장 자동화 전반). SELF_ID="factory-claude". **16 Claude 시스템 도달**. **carrier 패턴 4번째 적용 사례** (1=노지관리 6/4, 2=weldRobot 6/6낮, 3=ponet 6/6밤, 4=factory 6/10). mywiki strengths §13. 첫 시장 조사 = 4국 deep search (한국·일본·중국·독일) + 핵심 10사 entity 신설 (HKPS / ZATO / KURIMOTO / Meiji / ZENITH / Shanghai SANME / GEP ECOTECH / JEHMLICH / WEIMA / ZERMA) + 전체 30+ list raw 별도 보관. 핵심 발견 = WEIMA 한국 진출 검증 (독일 품질 + 한국 가격 narrative) + Shanghai SANME Sino-German JV 벤치마크 모델 + JEHMLICH 한국기계 1:1 대응 (벤치마크 1순위). 자산 이식 = today/smartFactory/업무효율화/한국기계/ 전체 카피 + shredder 도메인 + AI 교육 계획서. 본 vault 신설 사건 = 사용자 명시 결단 "한국기계 관련 비지니스를 다른 회사로 확장 + factory vault + ponet 패턴 동일 + 주요 목적은 센서 및 제어를 이용한 공장 자동화 분야 사업화". 합류 카드: 본 PROTOCOL 16th 등재 + mywiki entities/factory.md + 한국기계.md § 트랙 3 추가 + 결정 47 (vault 분리 carrier 패턴 4번째 사례).
- **2026-06-06 야간** ⭐⭐⭐: **ponet-claude 합류 (15th)** — ponet (`C:/todo/ponet/`, Windows, 본 PC, 2026-06-06 합류) = **Ponet 광주 협력 회사 vault** (Tier 3, 조대홍 사장, PCB 설계 풀세트 (Cadence + Altium + KiCad) + 더존 ERP + CoreB2B + 자체 호스팅 (IIS + C:\ponet\) + 한국 인증 (NPKI + GPKI + KED + KWIC)). SELF_ID="ponet-claude". **15 Claude 시스템 도달**. **carrier 패턴 3번째 적용 사례 정착 확정** (1번째 = 노지관리Wiki 2026-06-04, 2번째 = weldRobot 2026-06-06 낮, mywiki strengths §13). **자체 SSH fact-finding 신설 패턴 첫 사례** — 협력 파트너 측 자료 Posh-SSH + Tailscale + Windows OpenSSH 자동 수집 → 박제 (사용자 broker 0). 본 vault 신설 사건 = 사용자 명시 결단 "광주에서 사업을 하고있는데, 앞으로 사업을 협력하여 진행 + SSH로 C/D disk 내용 확인하여 ponet vault에 wiki화 + work-start/work-end skill 적용". 합류 카드: 본 PROTOCOL 15th 등재 + mywiki entities/ponet.md + 조대홍.md + 결정 46. 분산 호스트 4 사례 누적 (Linux × 3 + 본 PC × 2). 다음 carry: Ponet 사장 미팅 + D: 한글 깨짐 재조사 + C:\ponet\ deep dive + UTTEC × Ponet cross-매칭 가설 4축 검증.
- **2026-06-06** ⭐⭐⭐: **weldrobot-claude 합류 (14th)** — weldRobot (`C:/todo/weldRobot/`, Windows, 본 PC, 2026-06-06 합류 일자) = **UTTEC 용접 로봇 신사업 vault** (Tier 3, Path 4 Vision seam tracking + AI 비드 검사 add-on box 우선 진입 + Path 3 AI 자율 path planning 장기 carry). SELF_ID="weldrobot-claude". **14 Claude 시스템 도달**. **carrier 패턴 2번째 적용 사례 정착 검증** (1번째 = 노지관리Wiki 2026-06-04, mywiki strengths §13). mywiki-claude가 cross-vault 셋업 (vault 디렉토리 9 카테고리 + 23 sub + core 파일 28건 + multi-agent broker 라우팅 (push/pull) + raw junction). 분산 호스트 4 사례 누적 유지 (본 PC × 2: search·weldRobot, Linux × 3: shield·n8n·uttec-factory). 본 vault 신설 사건 = 사용자 명시 결단 "한국기계 용접공 운영 어려움 → 용접 로봇 신사업 검토 + 별도 vault" → mywiki §14·15·16 자산 이식률 90%+ 가설 도출 → 본격 진입. 합류 카드: 본 PROTOCOL.md 14th 등재 + mywiki entities/weldRobot.md + 결정 45 (vault 분리 carrier 패턴 2번째 사례).
- **2026-05-26** ⭐⭐⭐: **uttec-factory-claude 합류 (13th)** — uttec-factory (`/home/uttec/project/uttec-factory/` on factory-rpi4, Tailscale 100.109.84.79, LAN 192.168.0.23) = **UTTEC Shield AI 공장자동화 교육 vault** (E22-900T30D LoRa + 9 컴포넌트 (3 완료 / 6 잔여) + 회로도 V1.0 + 8일 교육 커리큘럼 + 영업 자산 9 문서). SELF_ID="uttec-factory-claude". **13 Claude 시스템 도달**. **hardware + 교육 + 영업 통합 트랙 첫 사례** (shield는 hardware-only, ondevice는 hardware+R&D, wishket/uttechome은 비즈니스 트랙). mywiki-claude가 cross-vault 셋업 (`aiHardStudy/중소기업교육/ai공장자동화/` source → factory-rpi4 deploy + .claude/skills/{work-start, work-end, vault-start, vault-end} shield 패턴 미러 + _inbox/{pending,processed,outbound} + check-inbox.py SELF_ID + PROTOCOL.md). 분산 호스트 4 사례 누적 (Linux × 3 + Windows × 1). ⭐ **broker 자동화 첫 진화** — outbound → mywiki pending sync 스크립트 (`today/.claude/hooks/pull-multi-agent-outbound.py`, 5/26 신설). 12th는 결번 (uttec-factory가 13th로 직접 등재).

- **2026-06-17** ⭐⭐: **uttec-academy-claude 합류 (20th)** — uttec-academy (`C:/todo/uttec-academy/`, Windows, 본 PC, ihong private repo) = **UTTEC 교육 운영·발전 hub** (Tier 3). 자체 제작 kit 기반 오프라인 실습 교육사업의 운영·행정·강사·차수 개선을 단일 출처로 관리 → 사업방향 = 교육 분야 전문성. SELF_ID="uttec-academy-claude". **20 Claude 시스템 도달**. 사용자 결단(A안): 교육 프로그램마다 vault 분리 ❌ → **단일 교육 hub에 프로그램·차수 폴더 누적** (lora hub 패턴 동형 = 응용이 아닌 도메인 기준 집약). 기존 uttec-edu(온라인 플랫폼)와 구분 위해 academy 명명. 신설 계기 = 미래창의 아카데미 'AI·IoT 스마트팩토리 실습' 3차(2026-07-15 개강). 기술 진실은 uttec-factory(kit hardware)·lora(무선)·onDevice(AI) 참조. 합류: 본 PROTOCOL 20th 등재 + vault-registry 20th(A군) + entities/uttec-academy.md + broker pull/push 등록 + raw junction. 19th = lora(6/13).

## 참고

- myWiki 흡수 정책: `C:\todo\today\myWiki\second-brain\CLAUDE.md` § "외부 위키 흡수 (Absorption)"
- 자동화 의도: 사업 의사결정 자산화
- myWikiSetup 패키지: `C:\todo\today\obsidian\myWikiSetup\` (시나리오 D 4 사례 누적 검증)
