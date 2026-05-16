# myWiki + Multi-Agent Claude 협업 시스템 — 셋업 패키지

> 회사·단체가 "**1인이 운영 가능한 Second Brain Wiki + 두 Claude 사이 비동기 협업 통로**"를 자기 환경에 도입할 수 있게 만든 reusable 패키지.
> UTTEC + REVITA 양쪽에서 검증된 실 사례 (2026-05-12 합의·가동) 기반.

## 한 줄 요약

> **사용자가 broker 역할을 하지 않아도, 두 Claude(다른 폴더에서 작업하는)가 메일박스로 자동 협업하면서 회사 지식을 영구 축적·진화시키는 시스템.**

## 어떤 문제를 해결하나

| Before (전형적 상태) | After (본 시스템 도입 후) |
|---|---|
| Claude 세션마다 컨텍스트 사라짐, 사용자가 매번 다시 설명 | 위키에 영구 박제, 새 세션도 즉시 합류 |
| 여러 프로젝트 폴더에서 Claude 작업 — 사이 정보 흐름 끊김 | 두 Claude가 `_inbox/`로 직접 통신, 사용자 broker 부담 0 |
| 기술 위키와 사업 위키가 따로 놀고 자료 흡수 안 됨 | "외부 위키 흡수 정책" 5단계로 사업 자산화 자동 |
| 시스템·정책이 시간 지나면 잊혀지고 깨짐 | work-start / work-end 스킬에 통합 + SessionStart hook 3중 방어선 |
| 새 Claude 세션은 매번 처음부터 학습 | SYSTEM_GUIDE.md만 읽으면 한 번에 파악 |

## 핵심 구성 요소 (4가지)

### 1. **Second Brain Wiki** (단일 위키)
회사·1인 사업자의 지식을 영구 축적. Obsidian wikilink + frontmatter 표준 + 정책 명문화.

- `CLAUDE.md` — 위키 schema·워크플로우·흡수 정책
- `index.md`, `log.md` — 시간순 활동 + 페이지 카탈로그
- `entities/` — 사람·조직·도구 단위
- `thoughts/` — 인사이트·매칭 패턴 (분기 sub-folder)
- 핵심 페이지 — me / skills / strengths / gaps / goals / ai-direction 등

### 2. **Multi-Agent `_inbox/` 통신 시스템**
두 Claude가 비동기로 메시지 카드 주고받음. 사용자가 broker 안 해도 됨.

- 표준 카드 frontmatter (id / from / to / type / priority / status)
- type 4종: `request` / `acknowledge` / `done` / `escalate`
- 라이프사이클: pending → in_progress → done → processed/
- 각 프로젝트 내부 `_inbox/` (외부 중앙 위치 X, self-contained)

### 3. **외부 위키 흡수 (Absorption) 정책**
다른 위키(예: 기술 위키)의 ingest 결과를 myWiki(사업 위키)로 자동 흡수.

- 트리거: 외부 위키 `log.md`에 새 ingest 항목 추가
- 5단계 체크: 신규 entity → skills / gotcha → gaps / decision → ai-direction / 매칭 패턴 → thoughts / revita entity 갱신

### 4. **work-start / work-end 스킬 통합**
시스템이 시간 지나도 잊혀지지 않게 매 세션 시작·종료 시 자동 점검.

- work-start § 1-C — `_inbox/pending/` 명시적 확인
- work-end § 5-E — 외부 위키 흡수 점검 (비대칭 방지)
- work-end § 5-F — multi-agent 인계 카드 작성
- work-end § 5-G — 시스템 자산 존재 검증

## 적용 대상

| 적합 | 부적합 |
|---|---|
| 1인 기업·소규모 팀 | 100명+ 대조직 (별도 KMS 필요) |
| 기술 + 사업이 한 사람에게 모이는 사업 | 기능별 완전 분리 조직 |
| Claude Code 또는 Claude.ai를 일상 도구로 쓰는 조직 | Claude 미사용 또는 단발 사용 |
| 지식 자산화 / 영업 자산화가 핵심 가치인 사업 | 단순 코드 자동화만 필요 |
| 여러 프로젝트·여러 폴더가 동시 진행 | 단일 프로젝트만 |

## 5분 빠른 시작 (요약)

```bash
# 1. myWiki 본 폴더 생성
mkdir -p <project>/myWiki/{entities,thoughts/2026-Q2,raw}
mkdir -p <project>/myWiki/_inbox/{pending,processed}
mkdir -p <project>/myWiki/.claude/hooks

# 2. templates/ 에서 필요한 파일 복사
cp myWikiSetup/templates/01_second-brain/CLAUDE.md     <project>/myWiki/CLAUDE.md
cp myWikiSetup/templates/01_second-brain/log.md         <project>/myWiki/log.md
cp myWikiSetup/templates/01_second-brain/index.md       <project>/myWiki/index.md
cp myWikiSetup/templates/02_inbox/PROTOCOL.md           <project>/myWiki/_inbox/PROTOCOL.md
cp myWikiSetup/templates/02_inbox/SYSTEM_GUIDE.md       <project>/myWiki/_inbox/SYSTEM_GUIDE.md
cp myWikiSetup/templates/03_hooks/check-inbox.py        <project>/myWiki/.claude/hooks/check-inbox.py
cp myWikiSetup/templates/03_hooks/settings.local.json   <project>/myWiki/.claude/settings.local.json

# 3. 각 파일에서 {{변수}} 치환 (회사명·Claude 식별자 등)
#    상세: GUIDE.md § "변수 치환" 참조

# 4. (선택) work-start / work-end 스킬에 통합
#    snippet 위치: templates/04_skills/

# 5. 셋업 검증
#    CHECKLIST.md 30개 항목 따라가기
```

## 패키지 구성

```
myWikiSetup/
├── README.md                       ← 본 파일 (개요)
├── GUIDE.md                        ← 상세 셋업 가이드 (Phase 1~5)
├── EXAMPLES.md                     ← UTTEC + REVITA 실 사례
├── CHECKLIST.md                    ← 셋업 후 검증 30개 항목
└── templates/
    ├── 01_second-brain/            ← 단일 위키 핵심 파일
    │   ├── CLAUDE.md               ← schema + 흡수 정책 포함
    │   ├── log.md                  ← 시작 템플릿
    │   ├── index.md                ← 시작 템플릿
    │   ├── README-thoughts.md      ← thoughts/ 분기 정책
    │   └── README-entities-example.md  ← entity 예시
    ├── 02_inbox/                   ← multi-agent 통신
    │   ├── PROTOCOL.md             ← 표준 카드 형식·라이프사이클
    │   └── SYSTEM_GUIDE.md         ← 새 Claude 진입 가이드
    ├── 03_hooks/                   ← SessionStart hook
    │   ├── check-inbox.py          ← SELF_ID 변수만 변경
    │   └── settings.local.json     ← hook 등록 예시
    └── 04_skills/                  ← work-start/end 통합 패치
        ├── work-start-snippet.md   ← § 1-C 추가 가이드
        └── work-end-snippet.md     ← § 5-E/5-F/5-G 추가 가이드
```

## 활용 시나리오

| 시나리오 | 접근 |
|---|---|
| **A. 1인 기업이 처음 도입** | README → GUIDE 따라 Phase 1~5 → CHECKLIST로 검증 |
| **B. 컨설팅으로 다른 회사에 도입** | 본 패키지를 컨설팅 deliverable로 전달 + EXAMPLES.md로 실 사례 시연 |
| **C. 교육 콘텐츠로 활용** | 호오컨설팅·인프런 강의 사례. obsidian 6편 시리즈와 결합 가능 |
| **D. 2번째 위키 추가** | 기존 myWiki에 새 Claude 인스턴스 합류. `templates/02_inbox/` + `03_hooks/` 만 추가 (위키 본문은 기존 유지) |

## 검증된 실 사례

| 사례 | 위치 | 결과 |
|---|---|---|
| **UTTEC myWiki** | `C:\todo\today\myWiki\second-brain\` | 44+ entity / 13+ thought / log 활성 / 외부 위키 흡수 정책 작동 |
| **REVITA revitaWiki** | `C:\todo\revitaProject\revitaWiki\` | 32 entity / 21 gotcha / ingest 사이클 #4~#8 정기 진행 |
| **첫 multi-agent 사이클** | 2026-05-12, 4 카드 정상 닫힘 | request → ACK → done → done (사용자 broker 단계 2 후 무인화) |
| **첫 흡수 사이클** | revitaWiki #8 → myWiki 6건 사업 자산 박제 | 사업 라인 발견 + 강의 자산 3건 + 차별화 카피 |
| **시나리오 D 첫 적용** (2026-05-15) | onDevice_AI vault 별도 repo 분리 + ondevice-claude 합류 | 3 Claude 시스템 + 제품별 vault 통합 패턴 검증 |
| **시나리오 D 두 번째 적용** ⭐ (2026-05-16) | n8nUttec vault 신설 (Ubuntu) + n8n-claude 합류 | 4 Claude 시스템 + **분산 호스트 (Windows ↔ Linux) 검증** + 패키지 메타 검증 |
| **시나리오 D 세 번째 적용** ⭐⭐ (2026-05-16) | shield vault 신설 (RPi Linux) + shield-claude 합류 + **work-end § 5-F always-send 강제 룰 커스텀** | 5 Claude 시스템 + **분산 호스트 3 사례 (Windows × 1 + Linux × 2)** + 도메인 다양성 (자동화 + 하드웨어 시험) + "myWiki 연결" 확실 보장 패턴 |
| **시나리오 D 네 번째 적용** ⭐⭐⭐ (2026-05-16) | wishketProject vault 신설 (위시캣 영업 자산 분리) + wishket-claude 합류 + **분리 lifecycle 3단계 진화 (분리 → 절대 경로화 → multi-agent 합류) 첫 완전 사례** | 6 Claude 시스템 + **사업 트랙 vault 첫 사례** (기존은 제품·학습·자동화 트랙) + 자매 시스템 분담 협업 (n8n-claude cron 09:00 자동검색 + wishket-claude 정밀 작성) + 패키지 도메인 다양성 (제품·자동화·하드웨어·영업 4 트랙 누적) |

상세:
- `EXAMPLES.md` — 첫 사례 (5/12 UTTEC + REVITA + 시나리오 D 첫 적용)
- `EXAMPLES_n8nUttec.md` — 두 번째 사례 (5/16 n8n-claude 합류, **사용자 prompt 원본 박제 포함**)
- `EXAMPLES_shield.md` — 세 번째 사례 (5/16 shield-claude 합류, **사용자 query "myWiki와 연결되나요?" 박제 + always-send 강제 룰 차별화 카피**)
- `EXAMPLES_wishket.md` — 네 번째 사례 (5/16 wishket-claude 합류, **분리 lifecycle 3단계 진화 + 사업 트랙 vault 첫 사례 + 자매 시스템 분담 협업 패턴**)

## 라이센스 / 출처

- 출처: UTTEC (㈜유티텍) + REVITA 협업 결과 산출물 (2026-05-12 합의)
- 활용: 사내 도입 / 컨설팅 deliverable / 교육 콘텐츠 자유 활용
- 추후: obsidian 시리즈 사업화 (`obsidian-시리즈-사업화.md`)와 통합 검토

## 다음 단계

1. **GUIDE.md** 읽기 — 셋업 절차 상세
2. **EXAMPLES.md** 읽기 — UTTEC + REVITA 실 사례
3. **templates/** 복사 + 변수 치환
4. **CHECKLIST.md** 따라가며 검증
